import { AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, AUTOBUYER_AUTOMATION_BASE_COST, getTierBaseTickSpeedSeconds, GOOGOL, MAX_OFFLINE_SECONDS, MONEY_ID, MONEY_STARTING_AMOUNT, OFFLINE_PROGRESS_SPEED_MULTIPLIER, PRESTIGE_POINT_SPEED_BONUS, PRESTIGE_SPEED_BONUS_UNLOCK_COST, SMART_AUTOBUYER_COST_MULTIPLIER, SPEED_UP_MULTIPLIER_BASE, TIER_DEFINITIONS } from './layers'

const clampNonNegative = value => Math.max(0, Number.isFinite(value) ? value : 0)

// Tolerance nudge for tierProductionAccumulators' tickspeed-crossing check (see tickGame) —
// absorbs floating-point drift from repeatedly summing a fractional elapsedSeconds (e.g. the
// live 10Hz tick loop's 0.1-per-call). Far smaller than any real tick granularity, so it never
// affects actual timing.
const TICK_ACCUMULATION_EPSILON = 1e-9

// Collect all unique resource IDs referenced by the tier definitions
const allResourceIds = () => {
  const ids = new Set([MONEY_ID])
  TIER_DEFINITIONS.forEach(t => {
    ids.add(t.costResourceId)
    ids.add(t.producesResourceId)
  })
  return [...ids]
}

export const createInitialGameState = () => ({
  resources: allResourceIds().reduce((acc, id) => ({
    ...acc,
    [id]: id === MONEY_ID ? MONEY_STARTING_AMOUNT : 0,
  }), {}),
  owned: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  purchased: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  autobuyers: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: null,
  }), {}),
  // Fractional purchase-attempt budget per tier, accumulated each tick by
  // getAutobuyerAttemptRate(level) and drained by 1 per successful autobuyer purchase — see
  // tickGame. Only meaningful for unlocked (non-null) autobuyers; stays 0 while locked.
  autobuyerAttemptBudgets: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  // Permanent per-tier flag: whether Prestige Points have been spent to make this tier's
  // autobuyer self-upgrade every tick (see buyAutobuyerAutomation) — never reset by prestige.
  autobuyerAutomation: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: false,
  }), {}),
  // Permanent per-tier flag: whether Prestige Points have been spent to make this tier's
  // autobuyer "smart" — buys one unit at a time until 10 lifetime purchases, then switches to
  // the normal full-block batching from then on (see tickGame/buySmartAutobuyer) — never reset
  // by prestige.
  smartAutobuyer: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: false,
  }), {}),
  // Fractional seconds accumulated per tier toward its next production batch, since each tier
  // only delivers production once every getTierBaseTickSpeedSeconds(tier.id) seconds rather than
  // continuously every global tick — see tickGame. Every tier currently shares the same 1s
  // tickspeed (matching the global tick), banking any remainder below that full second.
  tierProductionAccumulators: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  // Permanent global level (not per-tier — there's only one to buy), null = not yet bought: how
  // many times Prestige Points have been spent to make Prestige itself automatic and faster (see
  // buyAutoPrestige/getAutoPrestigeAttemptRate) — never reset by prestige.
  autoPrestige: null,
  // Fractional Auto-Prestige attempt budget, accumulated every tick (frozen or not) by
  // getAutoPrestigeAttemptRate(autoPrestige) once bought — see tickGame. Unlike the per-tier
  // autobuyerAttemptBudgets, this is a single global counter; resets to 0 on every prestige
  // (manual or automatic) same as they do.
  autoPrestigeAttemptBudget: 0,
  // Permanent global flag, false = not yet bought: whether the passive +1%-per-unspent-point
  // production speed bonus (getPrestigeProductionMultiplier) is active at all — see
  // buyPrestigeSpeedBonus. Never reset by prestige, like autobuyerAutomation/smartAutobuyer/
  // autoPrestige above.
  prestigeSpeedBonusUnlocked: false,
  // Permanent count of how many times Speed Up has been triggered (see speedUpGame) — drives
  // getSpeedUpMultiplier's unconditional production-speed multiplier. Never reset by Speed Up
  // itself (it's the thing being incremented) or by a real Prestige (see prestigeGame) — it's
  // meta-progression, like autobuyerAutomation/smartAutobuyer/autoPrestige/
  // prestigeSpeedBonusUnlocked above.
  speedUpCount: 0,
  // Permanent GLOBAL flag, false = not yet bought: whether Prestige Points have been spent to
  // make Speed Up trigger automatically (see buyAutoSpeedUp/tickGame) the instant it's eligible —
  // no manual click needed. Never reset by prestige or by Speed Up itself, like
  // autobuyerAutomation/smartAutobuyer/autoPrestige/prestigeSpeedBonusUnlocked above.
  autoSpeedUp: false,
  prestige: {
    xp: 0,
    // Spendable Prestige Point balance — earned via prestigeGame (see getPrestigePointsAwarded),
    // spent via buyAutobuyerAutomation/buyPrestigeSpeedBonus. Unspent points also drive
    // production speed (see getPrestigeProductionMultiplier), but only once
    // prestigeSpeedBonusUnlocked is true.
    points: 0,
    // Number of times ever prestiged — drives only the first-run-vs-repeat UI presentation
    // (MainPage), not production or cost. Renamed from the old `level` field now that prestige
    // grants points instead of directly doubling production.
    count: 0,
    highestMilestone: Math.floor(Math.log10(MONEY_STARTING_AMOUNT)),
  },
})

// Cached at module scope — Intl.NumberFormat construction is relatively expensive and these
// run many times per render/tick.
const plainNumberFormatter = new Intl.NumberFormat('en-US')
const scientificNumberFormatter = new Intl.NumberFormat('en-US', { notation: 'scientific' })
const currencyNumberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

// Values at/above this switch from plain comma-grouped digits to exponential notation
// (e.g. "6.5E13") for readability, shared by formatAmount and formatCurrency.
const EXPONENTIAL_NOTATION_THRESHOLD = 1_000_000

export const formatAmount = value => {
  const safeValue = clampNonNegative(value)

  if (safeValue < EXPONENTIAL_NOTATION_THRESHOLD) return plainNumberFormatter.format(safeValue)
  return scientificNumberFormatter.format(safeValue)
}

// Comma-grouped currency string below the threshold, exponential above it (same threshold and
// notation as formatAmount) — money can reach 100+ digit balances near the Googol prestige
// requirement, so it can't stay full-digit forever. Floors rather than rounds so a displayed
// amount never overstates the actual spendable balance (e.g. a fractional 1.6 balance from a
// non-integer tick shows as $1, not a misleading $2).
export const formatCurrency = value => {
  const safeValue = Math.floor(clampNonNegative(value))
  return safeValue < EXPONENTIAL_NOTATION_THRESHOLD
    ? `$${currencyNumberFormatter.format(safeValue)}`
    : `$${scientificNumberFormatter.format(safeValue)}`
}

// The Fibonacci number driving a cost epoch's multiplier (see getTierCost): 1, 2, 3, 5, 8,
// 13, … for epochs 0, 1, 2, 3, 4, 5, … A negative epoch is clamped to 0 rather than throwing.
export const getCostEpochExponent = epoch => {
  let current = 1
  let next = 2
  for (let i = 0; i < clampNonNegative(epoch); i += 1) {
    [current, next] = [next, current + next]
  }
  return current
}

// Cost is flat across each block of 10 purchases; each block multiplies baseCost by 10 raised
// to (that epoch's Fibonacci number − 1). epoch = floor(purchased / 10);
// cost = baseCost * 10^(fib(epoch) - 1), fib = 1, 2, 3, 5, 8, … — e.g. a baseCost-10 tier's 4th
// block (purchases 30–39) costs 10^5 per unit, same as a literal baseCost^fib reading would give
// for baseCost 10, but every other tier scales far more gently relative to its own baseCost
// (e.g. a baseCost-1000 tier's blocks cost 1e3, 1e4, 1e5, 1e7, 1e10, …) rather than compounding
// baseCost itself into the exponent, which would put high tiers permanently out of reach within
// a handful of blocks. Deep epochs still eventually overflow to Infinity, which is safe: an
// infinite cost is simply never affordable.
export const getTierCost = (tier, purchased) => {
  const epoch = Math.floor(clampNonNegative(purchased) / 10)
  return tier.baseCost * (10 ** (getCostEpochExponent(epoch) - 1))
}

// How many units a bulk purchase actually buys: capped by the requested quantity and by the
// units remaining in the current cost block (so every unit bought is at the same price).
export const getTierBulkQuantity = (tier, purchased, requestedQuantity) => {
  const within = clampNonNegative(purchased) % 10
  return Math.max(0, Math.min(clampNonNegative(requestedQuantity), 10 - within))
}

export const getTierQuantityCost = (tier, purchased, requestedQuantity) =>
  getTierCost(tier, purchased) * getTierBulkQuantity(tier, purchased, requestedQuantity)

// How many units are actually affordable: capped by the block boundary (getTierBulkQuantity)
// and further capped by what `spendable` can pay for at the flat per-unit price. This is what
// buyTierQuantity will actually purchase (it stops as soon as a unit becomes unaffordable), so
// UI previews should use this rather than getTierBulkQuantity alone.
export const getTierAffordableQuantity = (tier, purchased, spendable, requestedQuantity) => {
  const blockCapped = getTierBulkQuantity(tier, purchased, requestedQuantity)
  const unitCost = getTierCost(tier, purchased)
  if (unitCost <= 0) return blockCapped
  return Math.min(blockCapped, Math.floor(clampNonNegative(spendable) / unitCost))
}

// Resource cost to activate/upgrade an autobuyer from currentLevel to currentLevel+1 (null/no
// autobuyer yet treated as currentLevel 0). Level 0→1 (activation) costs 1000, level 1→2 costs
// 1,000,000, level 2→3 costs 1,000,000,000, …  (1000^(level+1))
export const getAutobuyerCost = currentLevel =>
  1000 ** (clampNonNegative(currentLevel) + 1)

// The production-speed multiplier at a given unspent-point balance: a flat 1% per point, applied
// uniformly to every tier — replaces the old "prestige level doubles production" mechanic. This
// is a pure formula, not a gate — callers must check state.prestigeSpeedBonusUnlocked themselves
// (see buyPrestigeSpeedBonus/tickGame) before applying it, since the bonus is inert until that
// one-time PP cost is paid; before then, every caller uses a flat ×1 instead of calling this at
// all. Spending points (see buyAutobuyerAutomation) reduces the points available to this formula
// in exchange for permanent autobuyer automation.
export const getPrestigeProductionMultiplier = points =>
  1 + PRESTIGE_POINT_SPEED_BONUS * clampNonNegative(points)

// One-time PP cost to unlock getPrestigeProductionMultiplier's passive bonus (see
// PRESTIGE_SPEED_BONUS_UNLOCK_COST) — a no-op if already unlocked, if there aren't enough unspent
// points, or while production is frozen. Permanent once bought, like autobuyerAutomation/
// smartAutobuyer/autoPrestige.
export const buyPrestigeSpeedBonus = state => {
  if (isProductionFrozen(state)) return state
  if (state.prestigeSpeedBonusUnlocked) return state
  if (clampNonNegative(state.prestige.points) < PRESTIGE_SPEED_BONUS_UNLOCK_COST) return state

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - PRESTIGE_SPEED_BONUS_UNLOCK_COST },
    prestigeSpeedBonusUnlocked: true,
  }
}

// PP cost to permanently automate a tier's autobuyer Upgrades (see buyAutobuyerAutomation): 1 PP
// for the first tier, doubling for each subsequent one (2, 4, 8, … 512 for the 10th/last tier).
// An unrecognized tier id is treated as index 0 (the cheapest tier) rather than throwing.
export const getAutobuyerAutomationCost = tierId => {
  const tierIndex = Math.max(0, TIER_DEFINITIONS.findIndex(t => t.id === tierId))
  return AUTOBUYER_AUTOMATION_BASE_COST * (2 ** tierIndex)
}

// PP cost to permanently make a tier's autobuyer "smart" (see buySmartAutobuyer) —
// SMART_AUTOBUYER_COST_MULTIPLIER times the cost of automating that same tier's autobuyer
// Upgrades (getAutobuyerAutomationCost), since it's a separate, more powerful capability.
export const getSmartAutobuyerCost = tierId =>
  SMART_AUTOBUYER_COST_MULTIPLIER * getAutobuyerAutomationCost(tierId)

// Production doubles every time a tier's lifetime purchase count crosses another block of 10 —
// the same boundary where getTierCost's Fibonacci-driven multiplier steps up, so buying into a
// fresh cost epoch always pays off with production alongside the steeper price.
// epoch = floor(purchased/10); multiplier = 2^epoch.
// Applies to every tier uniformly, regardless of whether the purchases were manual or automatic.
export const getPurchaseMilestoneMultiplier = purchased =>
  2 ** Math.floor(clampNonNegative(purchased) / 10)

// The unconditional production-speed multiplier from Speed Up activations (see speedUpGame):
// SPEED_UP_MULTIPLIER_BASE raised to speedUpCount, so each activation doubles it (1x, 2x, 4x,
// 8x, …). Unlike getPrestigeProductionMultiplier, this needs no unlock purchase — it applies
// automatically as soon as speedUpCount > 0.
export const getSpeedUpMultiplier = speedUpCount =>
  SPEED_UP_MULTIPLIER_BASE ** clampNonNegative(speedUpCount)

// Level 1 is the baseline rate (1x, already active as soon as the autobuyer is activated — see
// tickGame/buyAutobuyer); each level after that makes that tier's autobuyer 10% faster on
// average, compounding: level 2 = 1.1x, level 3 = 1.21x, … This is a purchase-cadence multiplier
// only; it has no effect on the tier's production (see getPurchaseMilestoneMultiplier) or on
// manual Buy. `null` (not yet activated) is never actually fed into this in tickGame — treated
// as level 1 here defensively.
export const getAutobuyerAttemptRate = autobuyerLevel =>
  1.1 ** clampNonNegative((autobuyerLevel ?? 1) - 1)

// PP cost to activate/upgrade Auto-Prestige from currentLevel to currentLevel+1 (null/not yet
// bought treated as currentLevel 0) — doubles each level: 100 PP to activate (level 0→1), 200 for
// the next, 400 after that, … (AUTO_PRESTIGE_COST * AUTO_PRESTIGE_COST_MULTIPLIER^currentLevel).
export const getAutoPrestigeCost = currentLevel =>
  AUTO_PRESTIGE_COST * (AUTO_PRESTIGE_COST_MULTIPLIER ** clampNonNegative(currentLevel))

// Level 1 is the baseline cadence — once activated, Auto-Prestige attempts to fire roughly every
// AUTO_PRESTIGE_BASE_INTERVAL_SECONDS (1000s); each level after that speeds this up by another
// 10%, compounding, exactly like getAutobuyerAttemptRate. Expressed as a per-tick budget
// increment (see tickGame's autoPrestigeAttemptBudget) rather than a raw interval, so the same
// "accumulate until it crosses 1" mechanism used for tier autobuyers applies here too. `null`
// (not yet bought) is never actually fed into this in tickGame — treated as level 1 here
// defensively, same convention as getAutobuyerAttemptRate.
export const getAutoPrestigeAttemptRate = autoPrestigeLevel =>
  (1.1 ** clampNonNegative((autoPrestigeLevel ?? 1) - 1)) / AUTO_PRESTIGE_BASE_INTERVAL_SECONDS

// Once Money reaches GOOGOL, all production and purchasing (manual and automatic) freezes —
// the only action left is to Prestige. Exported so the UI can drive the same gate (disabling
// every other control) that the engine itself enforces on tickGame/buyTier/buyAutobuyer below.
export const isProductionFrozen = state => clampNonNegative(state.resources[MONEY_ID]) >= GOOGOL

// First tier is always unlocked; each subsequent tier unlocks when you own ≥10 of the tier below.
// Already-owned tiers stay unlocked so older saves remain playable after rule changes.
export const isTierUnlocked = state => tier => {
  const tierIndex = TIER_DEFINITIONS.findIndex(t => t.id === tier.id)
  if (tierIndex === 0) return true
  if ((state.owned[tier.id] ?? 0) > 0) return true
  const prevTier = TIER_DEFINITIONS[tierIndex - 1]
  return (state.owned[prevTier.id] ?? 0) >= 10
}

// Money's order of magnitude, floored (money < 1 has no positive exponent, so reads as 0).
export const getMoneyExponent = money => {
  const safeMoney = clampNonNegative(money)
  return safeMoney < 1 ? 0 : Math.floor(Math.log10(safeMoney))
}

// How far the current money exponent is toward GOOGOL's exponent (100), as a whole percent.
export const getPrestigeProgressPercent = money => {
  const googolExponent = Math.floor(Math.log10(GOOGOL))
  const percent = (getMoneyExponent(money) / googolExponent) * 100
  return Math.min(100, Math.max(0, Math.round(percent)))
}

// How far a tier's production accumulator has filled toward its next delivered batch, as a
// whole percent — 0 right after a batch is delivered, 100 the instant it's about to fire (see
// tickGame's tierProductionAccumulators handling and "Tier production tickspeed" in CLAUDE.md).
// Pass the tier's *previous* banked accumulator (e.g. from a UI-side ref tracking the prior
// render, since state itself only stores the post-delivery wrapped remainder) to instead report
// 100 for the one render where a delivery just happened, rather than the wrapped-down remainder —
// that's previousAccumulator + elapsedSeconds >= this tier's own tickspeed, where elapsedSeconds
// defaults to 1 (matching a full real second, e.g. one offline-progress replay step) but callers
// driven by the live tick loop should pass the real per-tick value (TICK_RATE_MS / 1000). The UI
// then animates the *visual transition* between these once-per-tick values via a CSS
// custom-property transition (see TickProgressRing in MainPage), rather than this function
// trying to interpolate sub-tick progress itself.
export const getTierProductionProgressPercent = (state, tierId, previousAccumulator, elapsedSeconds = 1) => {
  const tickSpeed = getTierBaseTickSpeedSeconds(tierId)
  // Same TICK_ACCUMULATION_EPSILON tolerance tickGame's own crossing check uses (see there):
  // absorbs floating-point drift from repeatedly summing a fractional elapsedSeconds. Every tier
  // now shares a 1s tickspeed, where ten additions of 0.1 land on 0.9999999999999999 rather than
  // exactly 1 — without this tolerance the "just delivered" 100% flash would be silently skipped.
  if (previousAccumulator != null && previousAccumulator + elapsedSeconds >= tickSpeed - TICK_ACCUMULATION_EPSILON) return 100
  const accumulated = state.tierProductionAccumulators?.[tierId] ?? 0
  return Math.min(100, Math.max(0, Math.round((accumulated / tickSpeed) * 100)))
}

// How many Prestige Points a prestige action awards: the log, base GOOGOL, of the money balance
// reached before production froze, rounded down — always at least 1, since prestiging requires
// money >= GOOGOL in the first place. The tick that crosses GOOGOL can overshoot substantially in
// one step (see isProductionFrozen), so waiting for a much higher production rate before
// prestiging can still pay off in extra points, just at a much larger scale (every further
// GOOGOL-exponent's-worth of orders of magnitude) than a flat per-order-of-magnitude bonus would.
export const getPrestigePointsAwarded = money => {
  const safeMoney = clampNonNegative(money)
  return safeMoney < 1 ? 0 : Math.floor(Math.log10(safeMoney) / Math.log10(GOOGOL))
}

const checkMilestones = (resources, prestige) => {
  const money = clampNonNegative(resources[MONEY_ID])
  if (money < 10) return prestige

  const currentMilestone = getMoneyExponent(money)
  if (currentMilestone <= prestige.highestMilestone) return prestige

  return {
    ...prestige,
    xp: prestige.xp + (currentMilestone - prestige.highestMilestone),
    highestMilestone: currentMilestone,
  }
}

// autobuyerBatchSize mirrors the manual ×1/×10 toggle, but only governs autobuyer purchases
// (the manual Buy button always buys 1 — see buyTier). At 1 (default), each attempt buys a
// single unit as soon as it's affordable, same as always. Above 1, each attempt only buys once
// the tier can afford the *entire* current cost block up to that size — it holds and waits
// rather than trickling in a partial purchase. A "smart" tier (see buySmartAutobuyer) overrides
// this with an effective batch size of 1 for its very first cost block (purchased < 10) —
// otherwise a tier that's never been manually bought can never afford autobuyerBatchSize's full
// first block (0 owned generators produce $0 income, and the starting balance only ever covers
// 1 unit) and stalls forever — then reverts to the normal autobuyerBatchSize from its second
// block onward.
export const tickGame = (elapsedSeconds, autobuyerBatchSize = 1) => state => {
  const autoPrestigeLevel = state.autoPrestige ?? null

  // Once at/above GOOGOL, everything freezes — no passive production, no autobuyer purchases —
  // until the player prestiges. Returning the same reference (rather than an equivalent copy)
  // lets React's setState bail out of re-rendering while frozen, same as any other no-op action;
  // that optimization only applies when Auto-Prestige isn't bought at all, since its attempt
  // budget (see below) needs to keep accumulating even while otherwise frozen.
  if (isProductionFrozen(state)) {
    if (autoPrestigeLevel === null) return state
    const nextBudget = (state.autoPrestigeAttemptBudget ?? 0) + getAutoPrestigeAttemptRate(autoPrestigeLevel) * elapsedSeconds
    // A completed attempt (budget >= 1, with a small epsilon tolerance for the same repeated-
    // fractional-elapsedSeconds floating-point drift described on TICK_ACCUMULATION_EPSILON)
    // only actually prestiges once Money has reached GOOGOL — which it already has, here, by
    // definition of this branch — so it always fires as soon as the budget crosses 1.
    // prestigeGame's own reset zeroes the budget back out; no need to pass the incremented value
    // in, it would just be discarded.
    if (nextBudget >= 1 - TICK_ACCUMULATION_EPSILON) return prestigeGame(state)
    return { ...state, autoPrestigeAttemptBudget: nextBudget }
  }

  // The passive PP production-speed bonus is inert until unlocked (see buyPrestigeSpeedBonus) —
  // before that, every tier produces at the flat ×1 baseline regardless of unspent PP balance.
  const multiplier = state.prestigeSpeedBonusUnlocked
    ? getPrestigeProductionMultiplier(state.prestige.points)
    : 1
  // Speed Up's multiplier, unlike the PP bonus above, needs no unlock step — it applies as soon
  // as speedUpCount > 0 (see getSpeedUpMultiplier/speedUpGame).
  const speedUpMultiplier = getSpeedUpMultiplier(state.speedUpCount ?? 0)

  // Apply autobuyers: for each unlocked (non-null) tier, accumulate a fractional purchase-attempt
  // budget (see createInitialGameState) by getAutobuyerAttemptRate(level) * elapsedSeconds this
  // tick — scaled by elapsedSeconds so the real-world attempt cadence stays identical regardless
  // of how often tickGame itself is called (see TICK_RATE_MS in layers.js) — then fire one
  // purchase attempt per whole unit of budget, carrying any fractional remainder into the next
  // tick. Level 1 (just activated) already accumulates at the baseline rate (1/real second), so
  // activating alone makes an autobuyer active; each further Upgrade level compounds that rate by
  // another 10%. If a batch can't be afforded, the loop stops WITHOUT spending the budget already
  // accumulated for this attempt — it stays banked so a stretch of being broke doesn't cost any attempts, only
  // delays them until funds catch up. buyTierQuantity re-validates internally and returns the
  // state unchanged when a purchase fails. Every tier is costed in the same resource (Money), so
  // autobuyers compete for the same pool — processed highest tier first so a higher tier always
  // gets first claim on limited funds.
  const stateAfterAutobuyers = [...TIER_DEFINITIONS].reverse().reduce((s, tier) => {
    const level = s.autobuyers[tier.id] ?? null
    if (level === null || !isTierUnlocked(s)(tier)) return s
    let result = s
    let budget = (s.autobuyerAttemptBudgets[tier.id] ?? 0) + getAutobuyerAttemptRate(level) * elapsedSeconds
    // The epsilon tolerance absorbs the same repeated-fractional-elapsedSeconds floating-point
    // drift as tierProductionAccumulators (see TICK_ACCUMULATION_EPSILON) — without it, ten
    // 0.1-elapsedSeconds calls at the baseline rate sum to 0.9999999999999999, one shy of
    // triggering a purchase that should fire exactly on schedule.
    while (budget >= 1 - TICK_ACCUMULATION_EPSILON) {
      const purchased = getTierPurchasedCount(result, tier.id)
      const effectiveBatchSize = result.smartAutobuyer?.[tier.id] && purchased < 10 ? 1 : autobuyerBatchSize
      const blockMax = getTierBulkQuantity(tier, purchased, effectiveBatchSize)
      const affordable = getTierAffordableQuantity(tier, purchased, getTierSpendableAmount(result, tier), effectiveBatchSize)
      if (affordable < blockMax) break // can't afford the full current-cost batch yet — hold, bank the attempt
      const next = buyTierQuantity(tier.id, blockMax)(result)
      if (next === result) break
      result = next
      budget -= 1
    }
    return {
      ...result,
      autobuyerAttemptBudgets: { ...result.autobuyerAttemptBudgets, [tier.id]: budget },
    }
  }, state)

  const newResources = { ...stateAfterAutobuyers.resources }
  const newOwned = { ...stateAfterAutobuyers.owned }
  const newAccumulators = { ...stateAfterAutobuyers.tierProductionAccumulators }

  TIER_DEFINITIONS.forEach(tier => {
    if (!isTierUnlocked(stateAfterAutobuyers)(tier)) return

    // Each tier only delivers production once every getTierBaseTickSpeedSeconds(tier.id) seconds,
    // as a single batch — and each completed tick period delivers exactly one "tick's worth"
    // (owned × multipliers), not one tick's worth per elapsed second within it. This means a
    // slower tier's actual per-second throughput is reduced (divided by its own tickspeed)
    // compared to a tier that ticks every second — a real slowdown, not just a delayed delivery
    // of the same total (see tierProductionAccumulators above). Any partial tick below a full
    // tickspeed's worth stays banked for the next tick. TICK_ACCUMULATION_EPSILON absorbs the
    // floating-point drift of repeatedly summing a fractional elapsedSeconds (e.g. ten additions
    // of 0.1 land on 0.9999999999999999, not 1) so a delivery isn't delayed by a stray tick.
    const tickSpeed = getTierBaseTickSpeedSeconds(tier.id)
    const accumulated = (newAccumulators[tier.id] ?? 0) + elapsedSeconds
    const ticksElapsed = Math.floor((accumulated + TICK_ACCUMULATION_EPSILON) / tickSpeed)
    newAccumulators[tier.id] = accumulated - ticksElapsed * tickSpeed
    if (ticksElapsed <= 0) return

    // Floored so owned/resources stay integer-valued: owned, ticksElapsed, tierMultiplier, and
    // speedUpMultiplier (both always powers of 2) are already integers, so only a fractional
    // Prestige Point production multiplier (getPrestigeProductionMultiplier, e.g. 50 unspent
    // points → ×1.5) can introduce a fraction here. multiplier is always >= 1, so flooring never
    // zeroes out production for a tier with owned > 0.
    const tierMultiplier = getPurchaseMilestoneMultiplier(getTierPurchasedCount(stateAfterAutobuyers, tier.id))
    const production = Math.floor((stateAfterAutobuyers.owned[tier.id] ?? 0) * ticksElapsed * multiplier * speedUpMultiplier * tierMultiplier)

    newResources[tier.producesResourceId] = clampNonNegative((newResources[tier.producesResourceId] ?? 0) + production)
    // If the produced resource is also a tier (generator), add to owned count
    if (tier.producesResourceId !== MONEY_ID) {
      newOwned[tier.producesResourceId] = clampNonNegative((newOwned[tier.producesResourceId] ?? 0) + production)
    }
  })

  const producedState = {
    ...stateAfterAutobuyers,
    resources: newResources,
    owned: newOwned,
    tierProductionAccumulators: newAccumulators,
    prestige: checkMilestones(newResources, stateAfterAutobuyers.prestige),
    // Auto-Prestige's attempt budget keeps accumulating during ordinary (non-frozen) play too —
    // "every 1000 seconds once unlocked" runs continuously in the background, it doesn't only
    // start counting once Money first reaches GOOGOL — but it can only ever actually fire from
    // the frozen branch above, once Money has actually gotten there.
    ...(autoPrestigeLevel === null ? {} : {
      autoPrestigeAttemptBudget: (stateAfterAutobuyers.autoPrestigeAttemptBudget ?? 0) + getAutoPrestigeAttemptRate(autoPrestigeLevel) * elapsedSeconds,
    }),
  }

  // Tiers with automated autobuyer-upgrade purchasing (bought with Prestige Points, see
  // buyAutobuyerAutomation) self-upgrade one level per tick whenever affordable — no manual
  // Upgrade click needed. buyAutobuyer re-validates internally (affordability, frozen state)
  // and returns the same state unchanged when a level isn't affordable yet. Unlike the
  // rate-accumulating budgets above, this is edge-triggered on affordability rather than a
  // banked rate, so it needs no elapsedSeconds scaling — calling tickGame more often (see
  // TICK_RATE_MS) only makes it react sooner after becoming affordable, not more often per
  // real second.
  const stateAfterAutomation = TIER_DEFINITIONS.reduce((s, tier) => (
    s.autobuyerAutomation?.[tier.id] ? buyAutobuyer(tier.id)(s) : s
  ), producedState)

  // If Auto Speed Up is bought (see buyAutoSpeedUp), trigger a Speed Up automatically the instant
  // it's eligible — no manual click needed. speedUpGame re-validates eligibility internally (the
  // last tier must have reached 10 purchases, and production must not be frozen), so this is a
  // plain edge-triggered call, same convention as the autobuyer-automation loop above, not a
  // rate-accumulating budget — Speed Up has no cadence to throttle, unlike Auto-Prestige.
  return stateAfterAutomation.autoSpeedUp ? speedUpGame(stateAfterAutomation) : stateAfterAutomation
}

// Real elapsed seconds away, capped at MAX_OFFLINE_SECONDS, then scaled down by
// OFFLINE_PROGRESS_SPEED_MULTIPLIER and floored — the number of 1-second ticks
// applyOfflineProgress will simulate.
export const getOfflineEffectiveSeconds = elapsedRealSeconds =>
  Math.floor(Math.min(clampNonNegative(elapsedRealSeconds), MAX_OFFLINE_SECONDS) * OFFLINE_PROGRESS_SPEED_MULTIPLIER)

// Catches a save up on the time it was closed/backgrounded by replaying tickGame one simulated
// second at a time (rather than a single call with a large elapsedSeconds) so autobuyers get the
// same one-purchase-attempt-per-second cadence they'd have had if the game had stayed open —
// only at 10% speed, and capped to MAX_OFFLINE_SECONDS of real time.
export const applyOfflineProgress = (elapsedRealSeconds, autobuyerBatchSize = 1) => state => {
  const effectiveSeconds = getOfflineEffectiveSeconds(elapsedRealSeconds)
  let result = state
  for (let i = 0; i < effectiveSeconds; i++) {
    result = tickGame(1, autobuyerBatchSize)(result)
  }
  return result
}

// "1h 15m" / "15m 30s" / "45s" — used only to summarize the elapsed/simulated duration in the
// offline-progress notice; only ever needs to read up to MAX_OFFLINE_SECONDS (24h), so it has no
// need to express days.
export const formatOfflineDuration = totalSeconds => {
  const seconds = Math.max(0, Math.floor(clampNonNegative(totalSeconds)))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${secs}s`
  return `${secs}s`
}

export const getTierSpendableAmount = (state, tier) =>
  state.resources[tier.costResourceId] ?? 0

export const getTierPurchasedCount = (state, tierId) =>
  state.purchased?.[tierId] ?? 0

export const buyTier = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const purchased = getTierPurchasedCount(state, tierId)
  const cost = getTierCost(tier, purchased)

  if (getTierSpendableAmount(state, tier) < cost) return state

  const costResourceOwnedCount = state.owned[tier.costResourceId]
  const ownedUpdates = {
    [tierId]: (state.owned[tierId] ?? 0) + 1,
  }

  if (costResourceOwnedCount !== undefined) {
    ownedUpdates[tier.costResourceId] = clampNonNegative(costResourceOwnedCount - cost)
  }

  return {
    ...state,
    resources: {
      ...state.resources,
      [tier.costResourceId]: clampNonNegative((state.resources[tier.costResourceId] ?? 0) - cost),
      [tierId]: (state.resources[tierId] ?? 0) + 1,
    },
    owned: { ...state.owned, ...ownedUpdates },
    purchased: {
      ...state.purchased,
      [tierId]: purchased + 1,
    },
  }
}

// Buys up to `quantity` units of a tier, capped at the current cost-block boundary so every
// unit purchased is at the same price. Stops early if a purchase becomes unaffordable.
export const buyTierQuantity = (tierId, quantity) => state => {
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const purchased = getTierPurchasedCount(state, tierId)
  const cappedQuantity = getTierBulkQuantity(tier, purchased, quantity)

  let result = state
  for (let i = 0; i < cappedQuantity; i++) {
    const next = buyTier(tierId)(result)
    if (next === result) break // can no longer afford
    result = next
  }
  return result
}

// Activate (currentLevel null → 1) or upgrade (level N → N+1) an autobuyer, always by spending
// the tier's own resource — there's no separate XP-gated unlock step; activation is just the
// N=0 case of the same cost formula (getAutobuyerCost(0) = 1000). resources[tier.id] and
// owned[tier.id] move together, so requiring only `available >= cost` could drain a tier to
// exactly 0 generators — production for that tier (and everything cascading from it) would stop
// even though the purchase "succeeded". Require at least 1 generator left over instead.
export const buyAutobuyer = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const currentLevel = state.autobuyers[tierId] ?? null
  const cost = getAutobuyerCost(currentLevel ?? 0)
  const available = state.resources[tier.id] ?? 0
  if (available < cost + 1) return state

  return {
    ...state,
    resources: {
      ...state.resources,
      [tier.id]: clampNonNegative(available - cost),
    },
    owned: {
      ...state.owned,
      [tier.id]: clampNonNegative(available - cost),
    },
    autobuyers: {
      ...state.autobuyers,
      [tierId]: (currentLevel ?? 0) + 1,
    },
  }
}

// Permanently automates a tier's autobuyer Upgrades — once bought, tickGame calls buyAutobuyer
// for this tier automatically once per tick whenever affordable, with no manual click needed.
// Costs Prestige Points (see getAutobuyerAutomationCost), spent from the shared prestige.points
// balance — this trades away some of the flat 1%-per-point production speed bonus in exchange
// for permanent automation (see prestigeGame: automation, unlike autobuyer levels, is never
// reset). Requires the tier's autobuyer to already be active (nothing to automate otherwise) —
// EXCEPT for the first tier (tier01), whose 1 PP cost (the cheapest of all ten) instead
// activates its autobuyer (at the level-1 baseline) as part of this same purchase if it isn't
// already active, rather than requiring it be bought separately with Money first. An already-
// active tier01 (at any level) is left untouched — this only ever sets the baseline level when
// bootstrapping from locked. A no-op if already automated or if there aren't enough unspent
// points.
export const buyAutobuyerAutomation = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier) return state
  const isFirstTier = TIER_DEFINITIONS[0].id === tierId
  const autobuyerActive = state.autobuyers[tierId] != null
  if (!isFirstTier && !autobuyerActive) return state
  if (state.autobuyerAutomation?.[tierId]) return state

  const cost = getAutobuyerAutomationCost(tierId)
  if (clampNonNegative(state.prestige.points) < cost) return state

  return {
    ...state,
    autobuyers: isFirstTier && !autobuyerActive
      ? { ...state.autobuyers, [tierId]: 1 }
      : state.autobuyers,
    prestige: { ...state.prestige, points: state.prestige.points - cost },
    autobuyerAutomation: { ...state.autobuyerAutomation, [tierId]: true },
  }
}

// Permanently makes a tier's autobuyer "smart": in tickGame, that tier buys one unit at a time
// (rather than waiting for a full 10-unit block) until it reaches 10 lifetime purchases, then
// switches to the normal full-block batching from then on — fixes an otherwise-permanent stall
// where a tier with 0 owned generators (0 income) can never afford a full first block on its
// own. Costs SMART_AUTOBUYER_COST_MULTIPLIER times more PP than automating that tier's autobuyer
// Upgrades (see getSmartAutobuyerCost) — and requires that Auto-upgrade automation
// (autobuyerAutomation[tierId]) already be bought first: Smart is presented as the next purchase
// after Auto-upgrade, not a parallel/independent one, so the MainPage automate slot only ever
// shows one control per tier at a time (Automate → Smart → bought), never both together. A no-op
// if automation isn't bought yet, already smart, or there aren't enough unspent points.
export const buySmartAutobuyer = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier) return state
  if (!state.autobuyerAutomation?.[tierId]) return state
  if (state.smartAutobuyer?.[tierId]) return state

  const cost = getSmartAutobuyerCost(tierId)
  if (clampNonNegative(state.prestige.points) < cost) return state

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - cost },
    smartAutobuyer: { ...state.smartAutobuyer, [tierId]: true },
  }
}

// Activate (currentLevel null → 1) or upgrade (level N → N+1) Auto-Prestige, always by spending
// Prestige Points — activation is just the N=0 case of the same cost formula
// (getAutoPrestigeCost(0) = AUTO_PRESTIGE_COST). Once bought, tickGame accumulates an attempt
// budget every tick at getAutoPrestigeAttemptRate(level) and calls prestigeGame automatically the
// first time that budget crosses 1 *while* Money is at/above GOOGOL — the player never needs to
// see the full-screen prompt or top banner again. A single global upgrade track, not per-tier —
// there's only one to buy/upgrade. A no-op if there aren't enough unspent points, or while
// already frozen (buy/upgrade it ahead of the next Googol, not to retroactively affect the one
// already in progress).
export const buyAutoPrestige = state => {
  if (isProductionFrozen(state)) return state

  const currentLevel = state.autoPrestige ?? null
  const cost = getAutoPrestigeCost(currentLevel ?? 0)
  if (clampNonNegative(state.prestige.points) < cost) return state

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - cost },
    autoPrestige: (currentLevel ?? 0) + 1,
  }
}

// Reaching GOOGOL money awards Prestige Points (see getPrestigePointsAwarded) and resets all
// progress. XP is untouched by prestige — it's earned independently via money milestones and
// doesn't fund anything in particular; prestige itself is gated on Money ≥ GOOGOL, not XP.
// Newly-awarded points add on top of any already-unspent balance (PP is a permanent, cumulative
// currency, unlike resources/owned/purchased). Autobuyer activation is permanent across prestige
// (non-null stays active at level 1, the baseline rate), while run-funded Upgrade levels above
// that reset — autobuyer automation (see buyAutobuyerAutomation), by contrast, is permanent and
// carries over unchanged.
export const prestigeGame = state => {
  if (clampNonNegative(state.resources[MONEY_ID]) < GOOGOL) return state

  const pointsAwarded = getPrestigePointsAwarded(state.resources[MONEY_ID])
  const initial = createInitialGameState()
  const resetAutobuyers = Object.fromEntries(
    Object.entries(initial.autobuyers).map(([tierId]) => {
      const level = state.autobuyers[tierId] ?? null
      return [tierId, level === null ? null : 1]
    })
  )
  return {
    ...initial,
    autobuyers: resetAutobuyers,
    autobuyerAutomation: state.autobuyerAutomation ?? initial.autobuyerAutomation,
    smartAutobuyer: state.smartAutobuyer ?? initial.smartAutobuyer,
    autoPrestige: state.autoPrestige ?? initial.autoPrestige,
    prestigeSpeedBonusUnlocked: state.prestigeSpeedBonusUnlocked ?? initial.prestigeSpeedBonusUnlocked,
    speedUpCount: state.speedUpCount ?? initial.speedUpCount,
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    prestige: {
      ...initial.prestige,
      xp: state.prestige.xp,
      points: clampNonNegative(state.prestige.points) + pointsAwarded,
      count: state.prestige.count + 1,
    },
  }
}

// A more frequent soft-reset than real Prestige, available well before Money reaches GOOGOL:
// once the last tier reaches 10 lifetime purchases, resets resources/owned/purchased (and every
// other per-run field) back to a fresh game exactly like createInitialGameState, but permanently
// doubles production speed (see getSpeedUpMultiplier) and — like prestigeGame — collapses any
// already-active autobuyer to its level-1 baseline rather than deactivating it, while
// autobuyerAutomation/smartAutobuyer/autoPrestige/prestigeSpeedBonusUnlocked/autoSpeedUp carry
// over unchanged. Unlike prestigeGame, `prestige` (xp/points/count/highestMilestone) is passed
// through completely untouched — Speed Up is unrelated to real Prestige or Prestige Points, and
// doesn't award or spend any. A no-op (returns the same state) while frozen (a frozen state is
// waiting on a real Prestige, not a Speed Up) or before the last tier has reached 10 purchases.
export const speedUpGame = state => {
  if (isProductionFrozen(state)) return state
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  if (getTierPurchasedCount(state, lastTier.id) < 10) return state

  const initial = createInitialGameState()
  const resetAutobuyers = Object.fromEntries(
    Object.entries(initial.autobuyers).map(([tierId]) => {
      const level = state.autobuyers[tierId] ?? null
      return [tierId, level === null ? null : 1]
    })
  )
  return {
    ...initial,
    autobuyers: resetAutobuyers,
    autobuyerAutomation: state.autobuyerAutomation ?? initial.autobuyerAutomation,
    smartAutobuyer: state.smartAutobuyer ?? initial.smartAutobuyer,
    autoPrestige: state.autoPrestige ?? initial.autoPrestige,
    prestigeSpeedBonusUnlocked: state.prestigeSpeedBonusUnlocked ?? initial.prestigeSpeedBonusUnlocked,
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    prestige: state.prestige,
    speedUpCount: (state.speedUpCount ?? 0) + 1,
  }
}

// One-time PP cost to permanently automate Speed Up (see AUTO_SPEED_UP_COST) — once bought,
// tickGame calls speedUpGame automatically every tick, which re-validates eligibility internally
// (no-op unless the last tier has reached 10 purchases and production isn't frozen), so this just
// removes the need for a manual click once eligible. A no-op if already bought, if there aren't
// enough unspent points, or while production is frozen — same convention as
// buyPrestigeSpeedBonus/buyAutobuyerAutomation.
export const buyAutoSpeedUp = state => {
  if (isProductionFrozen(state)) return state
  if (state.autoSpeedUp) return state
  if (clampNonNegative(state.prestige.points) < AUTO_SPEED_UP_COST) return state

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - AUTO_SPEED_UP_COST },
    autoSpeedUp: true,
  }
}
