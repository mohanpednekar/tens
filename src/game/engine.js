import { AUTOBUYER_AUTOMATION_BASE_COST, GOOGOL, MAX_OFFLINE_SECONDS, MONEY_ID, MONEY_STARTING_AMOUNT, OFFLINE_PROGRESS_SPEED_MULTIPLIER, PRESTIGE_POINT_SPEED_BONUS, SMART_AUTOBUYER_COST_MULTIPLIER, TIER_DEFINITIONS } from './layers'

const clampNonNegative = value => Math.max(0, Number.isFinite(value) ? value : 0)

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
  prestige: {
    xp: 0,
    // Spendable Prestige Point balance — earned via prestigeGame (see getPrestigePointsAwarded),
    // spent via buyAutobuyerAutomation. Unspent points also drive production speed (see
    // getPrestigeProductionMultiplier).
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

// Cost is flat across each block of 10 purchases, jumping 10x at every block boundary.
// epoch = floor(purchased / 10); cost = baseCost * 10^epoch
export const getTierCost = (tier, purchased) => {
  const epoch = Math.floor(clampNonNegative(purchased) / 10)
  return tier.baseCost * (10 ** epoch)
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

// Each unspent Prestige Point adds a flat 1% production-speed bonus, applied uniformly to every
// tier — replaces the old "prestige level doubles production" mechanic. Spending points (see
// buyAutobuyerAutomation) reduces this bonus in exchange for permanent autobuyer automation.
export const getPrestigeProductionMultiplier = points =>
  1 + PRESTIGE_POINT_SPEED_BONUS * clampNonNegative(points)

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
// the same boundary where getTierCost's cost jumps 10x, so buying into a fresh cost epoch always
// pays off with cheaper-relative production. epoch = floor(purchased/10); multiplier = 2^epoch.
// Applies to every tier uniformly, regardless of whether the purchases were manual or automatic.
export const getPurchaseMilestoneMultiplier = purchased =>
  2 ** Math.floor(clampNonNegative(purchased) / 10)

// Level 1 is the baseline rate (1x, already active as soon as the autobuyer is activated — see
// tickGame/buyAutobuyer); each level after that makes that tier's autobuyer 10% faster on
// average, compounding: level 2 = 1.1x, level 3 = 1.21x, … This is a purchase-cadence multiplier
// only; it has no effect on the tier's production (see getPurchaseMilestoneMultiplier) or on
// manual Buy. `null` (not yet activated) is never actually fed into this in tickGame — treated
// as level 1 here defensively.
export const getAutobuyerAttemptRate = autobuyerLevel =>
  1.1 ** clampNonNegative((autobuyerLevel ?? 1) - 1)

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

// How many Prestige Points a prestige action awards: always at least 1 (prestiging requires
// money >= GOOGOL, i.e. exponent >= googolExponent, in the first place), plus 1 more for every
// extra order of magnitude the money exponent reached before production froze — the tick that
// crosses GOOGOL can overshoot substantially in one step (see isProductionFrozen), so a higher
// production rate before prestiging pays off in extra points.
export const getPrestigePointsAwarded = money => {
  const googolExponent = Math.floor(Math.log10(GOOGOL))
  return getMoneyExponent(money) - googolExponent + 1
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
  // Once at/above GOOGOL, everything freezes — no passive production, no autobuyer purchases —
  // until the player prestiges. Returning the same reference (rather than an equivalent copy)
  // lets React's setState bail out of re-rendering while frozen, same as any other no-op action.
  if (isProductionFrozen(state)) return state

  const multiplier = getPrestigeProductionMultiplier(state.prestige.points)

  // Apply autobuyers: for each unlocked (non-null) tier, accumulate a fractional purchase-attempt
  // budget (see createInitialGameState) by getAutobuyerAttemptRate(level) this tick, then fire one
  // purchase attempt per whole unit of budget, carrying any fractional remainder into the next
  // tick. Level 1 (just activated) already accumulates at the baseline rate (1/tick), so
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
    let budget = (s.autobuyerAttemptBudgets[tier.id] ?? 0) + getAutobuyerAttemptRate(level)
    while (budget >= 1) {
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

  TIER_DEFINITIONS.forEach(tier => {
    if (!isTierUnlocked(stateAfterAutobuyers)(tier)) return
    const tierMultiplier = getPurchaseMilestoneMultiplier(getTierPurchasedCount(stateAfterAutobuyers, tier.id))
    const production = (stateAfterAutobuyers.owned[tier.id] ?? 0) * elapsedSeconds * multiplier * tierMultiplier

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
    prestige: checkMilestones(newResources, stateAfterAutobuyers.prestige),
  }

  // Tiers with automated autobuyer-upgrade purchasing (bought with Prestige Points, see
  // buyAutobuyerAutomation) self-upgrade one level per tick whenever affordable — no manual
  // Upgrade click needed. buyAutobuyer re-validates internally (affordability, frozen state)
  // and returns the same state unchanged when a level isn't affordable yet.
  return TIER_DEFINITIONS.reduce((s, tier) => (
    s.autobuyerAutomation?.[tier.id] ? buyAutobuyer(tier.id)(s) : s
  ), producedState)
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
// reset). Requires the tier's autobuyer to already be active (nothing to automate otherwise);
// a no-op if already automated or if there aren't enough unspent points.
export const buyAutobuyerAutomation = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier) return state
  if (state.autobuyers[tierId] == null) return state
  if (state.autobuyerAutomation?.[tierId]) return state

  const cost = getAutobuyerAutomationCost(tierId)
  if (clampNonNegative(state.prestige.points) < cost) return state

  return {
    ...state,
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
    prestige: {
      ...initial.prestige,
      xp: state.prestige.xp,
      points: clampNonNegative(state.prestige.points) + pointsAwarded,
      count: state.prestige.count + 1,
    },
  }
}
