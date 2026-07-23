import { AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, getTierBaseTickSpeedSeconds, GLOBAL_TICKSPEED_MILESTONE_STEP, GLOBAL_TICKSPEED_PRODUCTION_STEP, GOOGOL, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT, LAST_TIER_XP_TICKSPEED_STEP, MAX_OFFLINE_SECONDS, MONEY_ID, MONEY_STARTING_AMOUNT, OFFLINE_PROGRESS_SPEED_MULTIPLIER, PRESTIGE_POINT_SPEED_BONUS, PRESTIGE_SPEED_BONUS_UNLOCK_COST, PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE, PURCHASE_MILESTONE_MULTIPLIER_BASE, SMART_AUTOBUYER_COST_MULTIPLIER, SPEED_UP_MULTIPLIER_BASE, TICKSPEED_AUTOBUYER_COST, TICKSPEED_MULTIPLIER_BASE_EXPONENT, TICKSPEED_PRODUCTION_STEP, TIER_DEFINITIONS, TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER } from './layers'

// The last tier's own id, read structurally (not hardcoded) so this stays correct if
// TIER_DEFINITIONS ever grows a new final entry — used by the last-tier XP tickspeed mechanic
// (see isLastTierTickspeedXpUnlocked/getEffectiveTierTickSpeedSeconds/buyTickspeedMultiplier/
// consumeXpForLastTierTickspeed below).
const getLastTierId = () => TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id

const clampNonNegative = value => Math.max(0, Number.isFinite(value) ? value : 0)

// Tolerance nudge for tierProductionAccumulators' tickspeed-crossing check (see tickGame) —
// absorbs floating-point drift from repeatedly summing a fractional elapsedSeconds (e.g. the
// live 10Hz tick loop's 0.1-per-call). Far smaller than any real tick granularity, so it never
// affects actual timing.
const TICK_ACCUMULATION_EPSILON = 1e-9

// Floor for getEffectiveTierTickSpeedSeconds' returned period — a pure numerical-safety guard,
// not a balance constant. A sufficiently large tickspeed multiplier (in practice, only the last
// tier's XP-funded one, which compounds unboundedly since prestige.xp is never reset/capped —
// see getLastTierXpTickspeedMultiplier) can overflow to Infinity in double-precision float, which
// would divide the base period down to exactly 0. That 0 then feeds tickGame's
// `ticksElapsed = accumulated / tickSpeed` as Infinity, and `accumulated - ticksElapsed *
// tickSpeed` collapses to `Infinity * 0 = NaN`, permanently corrupting that tier's production
// accumulator (and, via clampNonNegative treating NaN as "not finite", silently zeroing the
// produced tier's owned/resources every tick from then on — not a one-off glitch, since the NaN
// accumulator never recovers on its own). Clamping the period to this floor instead keeps
// ticksElapsed a large-but-finite integer, which is safe.
const MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS = 1e-9

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
  // null = not yet unlocked (see buyAutobuyerUnlock — a permanent, PP-funded purchase); once
  // unlocked, `1` (a plain truthy flag — its value no longer means anything beyond "unlocked",
  // see tickspeedLevels below), and the tier's autobuyer buys tier units automatically every
  // tick. Buying/self-upgrading the tier's own tickspeed multiplier is entirely independent of
  // this flag — see tickspeedLevels/buyTickspeedMultiplier and tierTickspeedAutobuyer below.
  autobuyers: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: null,
  }), {}),
  // Per-tier level for that tier's own Money-funded tickspeed multiplier (see
  // getTickspeedProductionMultiplier/getEffectiveTierTickSpeedSeconds/buyTickspeedMultiplier) —
  // starts at 1 (baseline, no speed bonus) for every tier and is buyable from the moment the tier
  // itself is unlocked, with no PP prerequisite at all; whether that tier's unit-buying autobuyer
  // has ever been unlocked (see autobuyers above) has no bearing on it. Only the *automatic*
  // self-upgrading of this level is PP-gated — see tierTickspeedAutobuyer below. Resets to 1 for
  // every tier on Prestige and Speed Up, same as owned/purchased. Speeds up this tier's own
  // delivery frequency by 10% per level above baseline — it does not scale the amount delivered.
  tickspeedLevels: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 1,
  }), {}),
  // Fractional purchase-attempt budget per tier, accumulated each tick at a flat rate of 1 (the
  // tickspeed multiplier level no longer affects this — see "Tickspeed multiplier" in CLAUDE.md)
  // and drained by 1 per successful autobuyer purchase — see tickGame. Only meaningful for
  // unlocked (non-null) autobuyers; stays 0 while locked.
  autobuyerAttemptBudgets: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  // Permanent per-tier flag: whether Prestige Points have been spent to make this tier's
  // autobuyer "smart" — buys one unit at a time until 10 lifetime purchases, then switches to
  // the normal full-block batching from then on (see tickGame/buySmartAutobuyer) — never reset
  // by prestige.
  smartAutobuyer: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: false,
  }), {}),
  // Permanent per-tier flag: whether Prestige Points have been spent to make this tier's own
  // (Money-funded) tickspeed multiplier upgrade itself automatically — see
  // buyTierTickspeedAutobuyer/tickGame. Needs no other prerequisite (the manual purchase itself
  // is unlocked by default — see tickspeedLevels above); independent of smartAutobuyer and of
  // whether the tier's own autobuyer has ever been unlocked — never reset by prestige.
  tierTickspeedAutobuyer: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: false,
  }), {}),
  // Fractional seconds accumulated per tier toward its next production batch, since each tier
  // only delivers production once every getTierBaseTickSpeedSeconds(tier.id) seconds rather than
  // continuously every global tick — see tickGame. Each tier's base tickspeed increases down the
  // list (tier01=1s, matching the global tick, up through tier10=10s), banking any remainder below
  // that full period.
  tierProductionAccumulators: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  // Permanent global level (not per-tier — there's only one to buy), null = not yet bought: how
  // many times Prestige Points have been spent to make Prestige itself automatic and faster (see
  // buyAutoPrestige/getAutoPrestigeAttemptRate) — never reset by prestige.
  autoPrestige: null,
  // Run-scoped global level (not per-tier — there's only one to buy, mirroring autoPrestige
  // above), null = not yet bought: how many times Money has been spent on the global tickspeed
  // multiplier (unlocked once at least 1 of the second tier is owned — see
  // isGlobalTickspeedMultiplierUnlocked), which speeds up *every* tier's delivery frequency by
  // another 1% per level, not the amount delivered (see
  // getGlobalTickspeedProductionMultiplier/getEffectiveTierTickSpeedSeconds/
  // buyGlobalTickspeedMultiplier) — resets to null on both Prestige and Speed Up, same as
  // tickspeedLevels, since it's funded from the same Money balance both wipe.
  globalTickspeedMultiplier: null,
  // Fractional Auto-Prestige attempt budget, accumulated every tick (frozen or not) by
  // getAutoPrestigeAttemptRate(autoPrestige) once bought — see tickGame. Unlike the per-tier
  // autobuyerAttemptBudgets, this is a single global counter; resets to 0 on every prestige
  // (manual or automatic) same as they do.
  autoPrestigeAttemptBudget: 0,
  // Permanent global flag, false = not yet bought: whether the passive +1%-per-unspent-point
  // production speed bonus (getPrestigeProductionMultiplier) is active at all — see
  // buyPrestigeSpeedBonus. Never reset by prestige, like smartAutobuyer/
  // autoPrestige above.
  prestigeSpeedBonusUnlocked: false,
  // Permanent count of how many times Speed Up has been triggered (see speedUpGame) — drives
  // getSpeedUpMultiplier's unconditional production-speed multiplier. Never reset by Speed Up
  // itself (it's the thing being incremented) or by a real Prestige (see prestigeGame) — it's
  // meta-progression, like smartAutobuyer/autoPrestige/
  // prestigeSpeedBonusUnlocked above.
  speedUpCount: 0,
  // Permanent GLOBAL flag, false = not yet bought: whether Prestige Points have been spent to
  // make Speed Up trigger automatically (see buyAutoSpeedUp/tickGame) the instant it's eligible —
  // no manual click needed. Never reset by prestige or by Speed Up itself, like
  // smartAutobuyer/autoPrestige/prestigeSpeedBonusUnlocked above.
  autoSpeedUp: false,
  // Permanent GLOBAL flag, false = not yet bought: whether Prestige Points have been spent to
  // make the (Money-funded) global tickspeed multiplier upgrade itself automatically every tick
  // (see buyTickspeedAutobuyer/tickGame) — no manual click needed. Never reset by prestige or by
  // Speed Up, like autoSpeedUp above.
  autoGlobalTickspeed: false,
  // Permanent cumulative total of XP ever spent via consumeXpForLastTierTickspeed — each XP spent
  // compounds another 1% into the last tier's own delivery frequency (see
  // getLastTierXpTickspeedMultiplier), so this counter alone drives that bonus. Never reset by
  // prestige/Speed Up, or by consumeXpForLastTierTickspeed itself (it only ever grows).
  lastTierXpConsumed: 0,
  // Permanent per-tier flag: whether isTierUnlocked's live condition (own owned > 0, or the
  // previous tier's owned >= 10) has ever been satisfied for this tier — latched true forever the
  // moment that happens (see latchEverUnlockedTiers, called from buyTier and tickGame) and read by
  // isTierUnlocked as an additional, permanent way to stay unlocked. tier01 starts true (always
  // unlocked, see isTierUnlocked); every other tier starts false. Exists so a tier that's already
  // been reached doesn't disappear from the UI again if its own or its predecessor's `owned` count
  // is later reset by something narrower than a full Prestige/Speed Up (see
  // consumeXpForLastTierTickspeed) — unlike `owned` itself, this flag is never reset by anything,
  // including Prestige and Speed Up.
  everUnlockedTierIds: TIER_DEFINITIONS.reduce((acc, tier, index) => ({
    ...acc,
    [tier.id]: index === 0,
  }), {}),
  prestige: {
    xp: 0,
    // Spendable Prestige Point balance — earned via prestigeGame (see getPrestigePointsAwarded),
    // spent via buyAutobuyerUnlock/buyPrestigeSpeedBonus. Unspent points also drive
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
// (e.g. "6.5e13") for readability, shared by formatAmount and formatCurrency.
const EXPONENTIAL_NOTATION_THRESHOLD = 1_000_000

// Intl's scientific notation always renders an uppercase "E" exponent marker with no option to
// override it, so every exponential display in this app lowercases it after formatting.
const formatScientific = value => scientificNumberFormatter.format(value).replace('E', 'e')

export const formatAmount = value => {
  const safeValue = clampNonNegative(value)

  if (safeValue < EXPONENTIAL_NOTATION_THRESHOLD) return plainNumberFormatter.format(safeValue)
  return formatScientific(safeValue)
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
    : `$${formatScientific(safeValue)}`
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

// Per-tier base cost for the tickspeed multiplier ladder (see getTickspeedMultiplierCost below):
// 10^10 for the first tier (index 0), decreasing by a power of ten per subsequent tier — 10^9,
// 10^8, … 10^1 for the 10th/last tier (index 9). An out-of-range index is clamped to the valid
// range rather than throwing.
export const getTickspeedMultiplierBaseCost = tierIndex => {
  const clampedIndex = Math.min(TIER_DEFINITIONS.length - 1, Math.max(0, tierIndex))
  return 10 ** (TICKSPEED_MULTIPLIER_BASE_EXPONENT - clampedIndex)
}

// Resource cost to reach tickspeed multiplier level `targetLevel` on a tier, paid in that tier's
// own resource: the tier's base cost (see getTickspeedMultiplierBaseCost) raised to
// (targetLevel - 1) — level 1 (the free baseline every tier already starts at) costs base^0 = 1,
// never actually charged; the first real purchase (level 1 → 2) costs exactly the base cost
// itself (base^1); each level after that multiplies the cost by another factor of the base
// (base^2, base^3, …) — e.g. the 2nd tier's (index 1, base 10^9) level-4 cost is (10^9)^3 = 10^27.
export const getTickspeedMultiplierCost = (tierId, targetLevel) => {
  const tierIndex = Math.max(0, TIER_DEFINITIONS.findIndex(t => t.id === tierId))
  return getTickspeedMultiplierBaseCost(tierIndex) ** Math.max(0, clampNonNegative(targetLevel) - 1)
}

// PP cost to permanently unlock a tier's autobuyer (see buyAutobuyerUnlock) — a flat, small
// per-tier increment, independent of the (much steeper) Money-funded tickspeed multiplier ladder:
// 1 PP for the first tier, up through 10 PP for the 10th/last tier. There is no other way to get
// an autobuyer running on a tier — see "Autobuyer unlock" in CLAUDE.md.
export const getAutobuyerUnlockCost = tierId => {
  const tierIndex = Math.max(0, TIER_DEFINITIONS.findIndex(t => t.id === tierId))
  return AUTOBUYER_UNLOCK_BASE_COST * (tierIndex + 1)
}

// The speed multiplier from a tier's tickspeed multiplier level: level 1 (the free baseline every
// tier starts at) is ×1 — no bonus — and each level after that speeds up this tier's own delivery
// frequency by another TICKSPEED_PRODUCTION_STEP (10%): level 2 = ×1.1, level 3 = ×1.21, … Divided
// into getEffectiveTierTickSpeedSeconds's effective period rather than multiplied into a
// production credit, so it changes how *often* a batch lands, not how big one is (see "Tickspeed
// multiplier" in CLAUDE.md). This is the exact formula that used to drive autobuyer
// purchase-attempt frequency before that effect moved off autobuyers entirely — the tickspeed
// multiplier button has no effect on how often the autobuyer attempts a purchase (see the flat
// rate used in tickGame below). `null` (tier has no autobuyer at all — never unlocked) is treated
// as level 1 (no bonus), same defensive convention used elsewhere in this file.
export const getTickspeedProductionMultiplier = level =>
  (1 + TICKSPEED_PRODUCTION_STEP) ** clampNonNegative((level ?? 1) - 1)

// Money (Ones) cost to activate (null → 1) or upgrade (level N → N+1) the global tickspeed
// multiplier — a single global upgrade track, not per-tier (mirroring Auto-Prestige's null/level
// pattern): level 1 costs 10^1 = 10 Money, level 2 costs 10^2 = 100 Money, level 3 costs 10^3 =
// 1000 Money, and so on — the same "powers of ten" theme as everything else in this economy.
// `currentLevel` is the level *before* this purchase (null/not-yet-bought treated as 0).
export const getGlobalTickspeedMultiplierCost = currentLevel =>
  10 ** (clampNonNegative(currentLevel) + 1)

// Whether the global tickspeed multiplier can be bought/upgraded at all yet — gated on owning at
// least 1 of the second tier (TIER_DEFINITIONS[1]) rather than being available from the very start,
// so a player can't accidentally spend their only Money on this before they have a second income
// source; tier01's own cost/production resource is Money itself, so buying this too early could
// zero out the balance needed to keep buying tier01. Once the multiplier is already active (level
// non-null), it stays purchasable/upgradable even if tier02 is later reset to 0 by a Prestige/Speed
// Up — this only gates the *initial* activation; an already-active level is never revoked.
export const isGlobalTickspeedMultiplierUnlocked = state =>
  (state.owned[TIER_DEFINITIONS[1].id] ?? 0) >= 1 || (state.globalTickspeedMultiplier ?? null) !== null

// Counts how many milestone levels the global tickspeed multiplier has reached by `lvl`. Milestone
// spacing starts at 10 (levels 10, 20, …, 100 — 10 milestones by level 100) and multiplies by 10
// every time `lvl` crosses into the next power-of-ten range: spacing becomes 100 from level 100 to
// 1000 (milestones at 200, 300, …, 1000 — 9 more), then 1000 from 1000 to 10000 (9 more), and so on
// indefinitely — level 100 itself is only counted once (as the last milestone of the 10-spacing
// range), not again as the first of the 100-spacing range.
const countGlobalTickspeedMilestones = lvl => {
  if (lvl <= 0) return 0
  let count = 0
  let phaseStart = 0
  let phaseEnd = 100
  let spacing = 10
  // Bounded by roughly log10(lvl) iterations — cheap even for very large levels.
  while (true) {
    count += Math.floor((Math.min(lvl, phaseEnd) - phaseStart) / spacing)
    if (lvl <= phaseEnd) return count
    phaseStart = phaseEnd
    spacing *= 10
    phaseEnd *= 10
  }
}

// The speed multiplier every tier gets from the global tickspeed multiplier: unlike the per-tier
// tickspeed multiplier (where level 1 is a bonus-free baseline gated behind a separate PP unlock),
// buying this global track directly grants its effect — every level compounds
// GLOBAL_TICKSPEED_PRODUCTION_STEP (1%), except a milestone level (see
// countGlobalTickspeedMilestones above) compounds GLOBAL_TICKSPEED_MILESTONE_STEP (10%) instead,
// for that one level only — still fully multiplicative, not additive. `null` (never bought) is
// treated as level 0, i.e. no bonus at all (×1).
export const getGlobalTickspeedProductionMultiplier = level => {
  const lvl = clampNonNegative(level ?? 0)
  const milestoneLevels = countGlobalTickspeedMilestones(lvl)
  const regularLevels = lvl - milestoneLevels
  return (1 + GLOBAL_TICKSPEED_PRODUCTION_STEP) ** regularLevels * (1 + GLOBAL_TICKSPEED_MILESTONE_STEP) ** milestoneLevels
}

// Whether the last tier's Money-funded tickspeed multiplier is currently replaced by the
// XP-funded one (see getLastTierXpTickspeedMultiplier/consumeXpForLastTierTickspeed) — a live
// check against the last tier's current owned count, matching the ≥10 threshold every other
// tier's own unlock condition uses (see isTierUnlocked). Deliberately live, not a permanent
// latch: a Prestige/Speed Up resets the last tier's owned count back to 0 along with every other
// tier's, and this mechanic should revert to the Money-funded multiplier along with it rather
// than staying engaged on a tier the player no longer actually has 10 of — re-buying back up to
// 10 re-engages it, picking back up wherever lastTierXpConsumed left off.
export const isLastTierTickspeedXpUnlocked = state => (state.owned?.[getLastTierId()] ?? 0) >= 10

// The last tier's own tickspeed multiplier once XP-funded (see isLastTierTickspeedXpUnlocked) —
// compounds LAST_TIER_XP_TICKSPEED_STEP (1%) per cumulative XP ever consumed via
// consumeXpForLastTierTickspeed, matching the same multiplicative form every other tier's own
// (1 + TICKSPEED_PRODUCTION_STEP)^(level-1) tickspeed multiplier uses — e.g. 37 XP consumed =
// 1.01^37 ≈ ×1.446, not a flat +37%.
export const getLastTierXpTickspeedMultiplier = xpConsumed =>
  (1 + LAST_TIER_XP_TICKSPEED_STEP) ** clampNonNegative(xpConsumed)

// The minimum amount a single consumeXpForLastTierTickspeed call may spend: at least
// LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT (10%) of the XP already consumed this way, so
// each further investment must be a meaningfully larger commitment than the last one — floored at
// LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR (1) since the percentage term alone is 0 before any
// XP has ever been consumed this way.
export const getLastTierXpTickspeedMinConsumption = xpConsumed => Math.max(
  LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR,
  Math.ceil(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT * clampNonNegative(xpConsumed))
)

// The production-speed multiplier at a given unspent-point balance: a flat 1% per point, applied
// uniformly to every tier — replaces the old "prestige level doubles production" mechanic. This
// is a pure formula, not a gate — callers must check state.prestigeSpeedBonusUnlocked themselves
// (see buyPrestigeSpeedBonus/tickGame) before applying it, since the bonus is inert until that
// one-time PP cost is paid; before then, every caller uses a flat ×1 instead of calling this at
// all. Spending points (see buyAutobuyerUnlock) reduces the points available to this formula
// in exchange for permanent autobuyer automation.
export const getPrestigeProductionMultiplier = points =>
  1 + PRESTIGE_POINT_SPEED_BONUS * clampNonNegative(points)

// One-time PP cost to unlock getPrestigeProductionMultiplier's passive bonus (see
// PRESTIGE_SPEED_BONUS_UNLOCK_COST) — a no-op if already unlocked, if there aren't enough unspent
// points, or while production is frozen. Permanent once bought, like smartAutobuyer/
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

// PP cost to permanently make a tier's autobuyer "smart" (see buySmartAutobuyer) —
// SMART_AUTOBUYER_COST_MULTIPLIER times the cost of unlocking that same tier's autobuyer
// (getAutobuyerUnlockCost), since it's a separate, more powerful capability bought after unlock.
export const getSmartAutobuyerCost = tierId =>
  SMART_AUTOBUYER_COST_MULTIPLIER * getAutobuyerUnlockCost(tierId)

// PP cost to permanently make a tier's own tickspeed multiplier upgrade itself automatically (see
// buyTierTickspeedAutobuyer) — TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER times the cost of
// unlocking that same tier's autobuyer, deliberately cheaper than Smart's 10x multiplier since it
// only automates one additional purchase (the tickspeed level), not the tier's own buying cadence.
export const getTierTickspeedAutobuyerCost = tierId =>
  TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER * getAutobuyerUnlockCost(tierId)

// Production doubles every time a tier's lifetime purchase count crosses another block of 10 —
// the same boundary where getTierCost's Fibonacci-driven multiplier steps up, so buying into a
// fresh cost epoch always pays off with production alongside the steeper price. But every 10th
// such block (i.e. every 100th lifetime purchase) is a bigger milestone: that one block
// contributes PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE (10x) instead of the regular
// PURCHASE_MILESTONE_MULTIPLIER_BASE (2x), compounding into every other block's factor —
// blocks = floor(purchased/10); megaBlocks = floor(blocks/10); multiplier =
// PURCHASE_MILESTONE_MULTIPLIER_BASE^(blocks-megaBlocks) * PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE^megaBlocks.
// Applies to every tier uniformly, regardless of whether the purchases were manual or automatic.
export const getPurchaseMilestoneMultiplier = purchased => {
  const blocks = Math.floor(clampNonNegative(purchased) / 10)
  const megaBlocks = Math.floor(blocks / 10)
  const regularBlocks = blocks - megaBlocks
  return PURCHASE_MILESTONE_MULTIPLIER_BASE ** regularBlocks * PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE ** megaBlocks
}

// The unconditional production-speed multiplier from Speed Up activations (see speedUpGame):
// SPEED_UP_MULTIPLIER_BASE raised to speedUpCount, so each activation doubles it (1x, 2x, 4x,
// 8x, …). Unlike getPrestigeProductionMultiplier, this needs no unlock purchase — it applies
// automatically as soon as speedUpCount > 0.
export const getSpeedUpMultiplier = speedUpCount =>
  SPEED_UP_MULTIPLIER_BASE ** clampNonNegative(speedUpCount)

// How many lifetime purchases of the last tier the *next* Speed Up requires: one more full block
// of 10 than the last time — 10 for the first activation (speedUpCount 0), 20 for the second,
// 30 for the third, and so on (10 * (speedUpCount + 1)). Unlike the flat 10-per-cycle requirement
// this replaced, this keeps climbing indefinitely, so later cycles' last-tier purchases do cross
// into deeper Fibonacci-driven cost epochs (see getTierCost) — no longer dodging that escalation
// by resetting exactly at the epoch-0/epoch-1 boundary every time.
export const getSpeedUpRequirement = speedUpCount =>
  10 * (clampNonNegative(speedUpCount) + 1)

// PP cost to activate/upgrade Auto-Prestige from currentLevel to currentLevel+1 (null/not yet
// bought treated as currentLevel 0) — doubles each level: 100 PP to activate (level 0→1), 200 for
// the next, 400 after that, … (AUTO_PRESTIGE_COST * AUTO_PRESTIGE_COST_MULTIPLIER^currentLevel).
export const getAutoPrestigeCost = currentLevel =>
  AUTO_PRESTIGE_COST * (AUTO_PRESTIGE_COST_MULTIPLIER ** clampNonNegative(currentLevel))

// Level 1 is the baseline cadence — once activated, Auto-Prestige attempts to fire roughly every
// AUTO_PRESTIGE_BASE_INTERVAL_SECONDS (1000s); each level after that speeds this up by another
// 10%, compounding. Expressed as a per-tick budget
// increment (see tickGame's autoPrestigeAttemptBudget) rather than a raw interval, so the same
// "accumulate until it crosses 1" mechanism used for tier autobuyers applies here too. `null`
// (not yet bought) is never actually fed into this in tickGame — treated as level 1 here
// defensively, same defensive convention used elsewhere in this file.
export const getAutoPrestigeAttemptRate = autoPrestigeLevel =>
  (1.1 ** clampNonNegative((autoPrestigeLevel ?? 1) - 1)) / AUTO_PRESTIGE_BASE_INTERVAL_SECONDS

// Once Money reaches GOOGOL, all production and purchasing (manual and automatic) freezes —
// the only action left is to Prestige. Exported so the UI can drive the same gate (disabling
// every other control) that the engine itself enforces on tickGame/buyTier/buyAutobuyer below.
export const isProductionFrozen = state => clampNonNegative(state.resources[MONEY_ID]) >= GOOGOL

// First tier is always unlocked; each subsequent tier unlocks when you own ≥10 of the tier below.
// Already-owned tiers stay unlocked so older saves remain playable after rule changes; a tier
// that has ever satisfied this live condition also stays unlocked forever via the permanent
// everUnlockedTierIds flag (see latchEverUnlockedTiers), even if `owned` is later reset by
// something narrower than a full Prestige/Speed Up (see consumeXpForLastTierTickspeed).
export const isTierUnlocked = state => tier => {
  const tierIndex = TIER_DEFINITIONS.findIndex(t => t.id === tier.id)
  if (tierIndex === 0) return true
  if (state.everUnlockedTierIds?.[tier.id]) return true
  if ((state.owned[tier.id] ?? 0) > 0) return true
  const prevTier = TIER_DEFINITIONS[tierIndex - 1]
  return (state.owned[prevTier.id] ?? 0) >= 10
}

// Latches everUnlockedTierIds permanently true for any tier whose isTierUnlocked live condition
// (own owned > 0, or the previous tier's owned >= 10) is currently satisfied but not yet flagged —
// called from buyTier and tickGame right after `owned` changes, so the flag catches up the same
// tick/purchase a tier first becomes reachable. Returns the same state reference if nothing newly
// qualifies (the common case), matching every other engine function's no-op convention.
const latchEverUnlockedTiers = state => {
  const previous = state.everUnlockedTierIds ?? {}
  let changed = false
  const next = { ...previous }
  TIER_DEFINITIONS.forEach((tier, index) => {
    if (index === 0 || next[tier.id]) return
    const prevTier = TIER_DEFINITIONS[index - 1]
    if ((state.owned[tier.id] ?? 0) > 0 || (state.owned[prevTier.id] ?? 0) >= 10) {
      next[tier.id] = true
      changed = true
    }
  })
  return changed ? { ...state, everUnlockedTierIds: next } : state
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

// A tier's actual production period after both tickspeed multipliers shrink it (see "Tier
// production tickspeed" in CLAUDE.md) — the per-tier tickspeed level and the global tickspeed
// multiplier both speed up how *often* a tier delivers a batch, not how much lands each time (see
// "Tickspeed multiplier"/"The global tickspeed multiplier" below), so both divide the tier's own
// getTierBaseTickSpeedSeconds instead of multiplying its production. Always >= 1 in practice
// (both multipliers are always >= 1), so this only ever shrinks (never grows) the base period.
export const getEffectiveTierTickSpeedSeconds = (state, tierId) => {
  const tickspeedMultiplier = tierId === getLastTierId() && isLastTierTickspeedXpUnlocked(state)
    ? getLastTierXpTickspeedMultiplier(state.lastTierXpConsumed ?? 0)
    : getTickspeedProductionMultiplier(state.tickspeedLevels?.[tierId] ?? 1)
  const globalTickspeedMultiplier = getGlobalTickspeedProductionMultiplier(state.globalTickspeedMultiplier ?? null)
  const period = getTierBaseTickSpeedSeconds(tierId) / (tickspeedMultiplier * globalTickspeedMultiplier)
  // See MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS above — guards against a multiplier large enough to
  // overflow this division to a non-finite/zero period.
  return Number.isFinite(period) && period > 0 ? period : MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS
}

// How far a tier's production accumulator has filled toward its next delivered batch, as a
// whole percent — 0 right after a batch is delivered, 100 the instant it's about to fire (see
// tickGame's tierProductionAccumulators handling and "Tier production tickspeed" in CLAUDE.md).
// Pass the tier's *previous* banked accumulator (e.g. from a UI-side ref tracking the prior
// render, since state itself only stores the post-delivery wrapped remainder) to instead report
// 100 for the one render where a delivery just happened, rather than the wrapped-down remainder —
// that's previousAccumulator + elapsedSeconds >= this tier's own effective tickspeed, where
// elapsedSeconds defaults to 1 (matching a full real second, e.g. one offline-progress replay
// step) but callers driven by the live tick loop should pass the real per-tick value
// (TICK_RATE_MS / 1000). The UI then animates the *visual transition* between these once-per-tick
// values via a CSS custom-property transition (see TickProgressRing in MainPage), rather than
// this function trying to interpolate sub-tick progress itself.
export const getTierProductionProgressPercent = (state, tierId, previousAccumulator, elapsedSeconds = 1) => {
  const tickSpeed = getEffectiveTierTickSpeedSeconds(state, tierId)
  // Same TICK_ACCUMULATION_EPSILON tolerance tickGame's own crossing check uses (see there):
  // absorbs floating-point drift from repeatedly summing a fractional elapsedSeconds — e.g. ten
  // additions of 0.1 land on 0.9999999999999999 rather than exactly 1 — without this tolerance the
  // "just delivered" 100% flash would be silently skipped.
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
  // budget (see createInitialGameState) at a flat rate of 1 per real second — the tickspeed
  // multiplier level no longer affects this cadence (it drives production instead, see
  // getTickspeedProductionMultiplier below) — scaled by elapsedSeconds so the real-world attempt
  // cadence stays identical regardless of how often tickGame itself is called (see TICK_RATE_MS in
  // layers.js), then fire one purchase attempt per whole unit of budget, carrying any fractional
  // remainder into the next tick. If a batch can't be afforded, the loop stops WITHOUT spending the
  // budget already accumulated for this attempt — it stays banked so a stretch of being broke
  // doesn't cost any attempts, only delays them until funds catch up. buyTierQuantity re-validates
  // internally and returns the state unchanged when a purchase fails. Every tier is costed in the
  // same resource (Money), so autobuyers compete for the same pool — processed highest tier first
  // so a higher tier always gets first claim on limited funds.
  const stateAfterAutobuyers = [...TIER_DEFINITIONS].reverse().reduce((s, tier) => {
    const level = s.autobuyers[tier.id] ?? null
    if (level === null || !isTierUnlocked(s)(tier)) return s
    let result = s
    let budget = (s.autobuyerAttemptBudgets[tier.id] ?? 0) + elapsedSeconds
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

    // Each tier only delivers production once every getEffectiveTierTickSpeedSeconds(state,
    // tier.id) seconds, as a single batch — and each completed tick period delivers exactly one
    // "tick's worth" (owned × multipliers), not one tick's worth per elapsed second within it.
    // This means a slower tier's actual per-second throughput is reduced (divided by its own
    // effective tickspeed) compared to a tier that ticks every second — a real slowdown, not just
    // a delayed delivery of the same total (see tierProductionAccumulators above). The per-tier
    // tickspeed multiplier and the global tickspeed multiplier both shrink this effective period —
    // they speed up how *often* a batch lands, not how big it is (see "Tickspeed multiplier"/"The
    // global tickspeed multiplier" in CLAUDE.md). Any partial tick below a full period stays
    // banked for the next tick. TICK_ACCUMULATION_EPSILON absorbs the floating-point drift of
    // repeatedly summing a fractional elapsedSeconds (e.g. ten additions of 0.1 land on
    // 0.9999999999999999, not 1) so a delivery isn't delayed by a stray tick.
    const tickSpeed = getEffectiveTierTickSpeedSeconds(stateAfterAutobuyers, tier.id)
    const accumulated = (newAccumulators[tier.id] ?? 0) + elapsedSeconds
    const ticksElapsed = Math.floor((accumulated + TICK_ACCUMULATION_EPSILON) / tickSpeed)
    newAccumulators[tier.id] = accumulated - ticksElapsed * tickSpeed
    if (ticksElapsed <= 0) return

    // Floored so owned/resources stay integer-valued: owned, ticksElapsed, speedUpMultiplier
    // (always a power of 2), and tierMultiplier (always a product of powers of 2 and 10 — see
    // getPurchaseMilestoneMultiplier) are already integers, so only the fractional Prestige Point
    // production multiplier (getPrestigeProductionMultiplier, e.g. 50 unspent points → ×1.5) can
    // introduce a fraction here — always >= 1, so flooring never zeroes out production for a tier
    // with owned > 0. Neither tickspeed multiplier appears in this formula at all anymore —
    // they've already done their work by shrinking tickSpeed above, which is what grew
    // ticksElapsed.
    const tierMultiplier = getPurchaseMilestoneMultiplier(getTierPurchasedCount(stateAfterAutobuyers, tier.id))
    const production = Math.floor((stateAfterAutobuyers.owned[tier.id] ?? 0) * ticksElapsed * multiplier * speedUpMultiplier * tierMultiplier)

    newResources[tier.producesResourceId] = clampNonNegative((newResources[tier.producesResourceId] ?? 0) + production)
    // If the produced resource is also a tier (generator), add to owned count
    if (tier.producesResourceId !== MONEY_ID) {
      newOwned[tier.producesResourceId] = clampNonNegative((newOwned[tier.producesResourceId] ?? 0) + production)
    }
  })

  const producedState = latchEverUnlockedTiers({
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
  })

  // Only a tier whose tierTickspeedAutobuyer is bought (see buyTierTickspeedAutobuyer) self-upgrades
  // its own tickspeed multiplier level one step per tick whenever affordable — no manual click
  // needed. buyTickspeedMultiplier re-validates internally (affordability, frozen state, tier
  // itself unlocked) and returns the same state unchanged when a level isn't affordable yet. Unlike the
  // rate-accumulating budgets above, this is edge-triggered on affordability rather than a banked
  // rate, so it needs no elapsedSeconds scaling — calling tickGame more often (see TICK_RATE_MS)
  // only makes it react sooner after becoming affordable, not more often per real second.
  const stateAfterAutomation = TIER_DEFINITIONS.reduce((s, tier) => (
    s.tierTickspeedAutobuyer?.[tier.id] ? buyTickspeedMultiplier(tier.id)(s) : s
  ), producedState)

  // If the global tickspeed multiplier's autobuyer is bought (see buyTickspeedAutobuyer), upgrade
  // it automatically the instant it's affordable — no manual click needed. buyGlobalTickspeedMultiplier
  // re-validates eligibility internally (isGlobalTickspeedMultiplierUnlocked, enough Money, not
  // frozen), so this is the same plain edge-triggered convention as the per-tier tickspeed
  // self-upgrade loop above, not a rate-accumulating budget.
  const stateAfterGlobalTickspeedAutobuyer = stateAfterAutomation.autoGlobalTickspeed
    ? buyGlobalTickspeedMultiplier(stateAfterAutomation)
    : stateAfterAutomation

  // If Auto Speed Up is bought (see buyAutoSpeedUp), trigger a Speed Up automatically the instant
  // it's eligible — no manual click needed. speedUpGame re-validates eligibility internally (the
  // last tier must have reached 10 purchases, and production must not be frozen), so this is a
  // plain edge-triggered call, same convention as the autobuyer-automation loop above, not a
  // rate-accumulating budget — Speed Up has no cadence to throttle, unlike Auto-Prestige.
  return stateAfterGlobalTickspeedAutobuyer.autoSpeedUp
    ? speedUpGame(stateAfterGlobalTickspeedAutobuyer)
    : stateAfterGlobalTickspeedAutobuyer
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

  const newPurchased = purchased + 1

  const nextState = {
    ...state,
    resources: {
      ...state.resources,
      [tier.costResourceId]: clampNonNegative((state.resources[tier.costResourceId] ?? 0) - cost),
      [tierId]: (state.resources[tierId] ?? 0) + 1,
    },
    owned: { ...state.owned, ...ownedUpdates },
    purchased: {
      ...state.purchased,
      [tierId]: newPurchased,
    },
  }

  // A purchase can be the very first thing that satisfies a tier's (or its successor's) unlock
  // condition — latch that permanently too (see latchEverUnlockedTiers/isTierUnlocked).
  return latchEverUnlockedTiers(nextState)
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

// Permanently unlocks a tier's autobuyer — the only way to get it buying units automatically at
// all; there is no Money-funded activation path (see "Autobuyer unlock" in CLAUDE.md). Spends
// Prestige Points (getAutobuyerUnlockCost) from the shared prestige.points balance — this trades
// away some of the flat 1%-per-point production speed bonus in exchange for a permanent
// autobuyer (never reset by prestige/Speed Up). Sets autobuyers[tierId] to a plain truthy flag,
// which immediately makes the tier buy units automatically — it has no bearing on the tier's own
// (Money-funded) tickspeed multiplier at all, which is buyable by default regardless of this flag
// (see tickspeedLevels/buyTickspeedMultiplier). A no-op if already unlocked, if the tier itself
// isn't unlocked yet, or if there aren't enough unspent points.
export const buyAutobuyerUnlock = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state
  if (state.autobuyers[tierId] != null) return state

  const cost = getAutobuyerUnlockCost(tierId)
  if (clampNonNegative(state.prestige.points) < cost) return state

  return {
    ...state,
    autobuyers: { ...state.autobuyers, [tierId]: 1 },
    prestige: { ...state.prestige, points: state.prestige.points - cost },
  }
}

// Upgrades a tier's own tickspeed multiplier from level N to N+1, spending the tier's own
// resource — enabled by default (needs no PP prerequisite and no autobuyer unlock at all, see
// tickspeedLevels in createInitialGameState); only the *automatic* self-upgrading of this level
// is PP-gated (see buyTierTickspeedAutobuyer/tickGame). Cost is
// getTickspeedMultiplierCost(tierId, currentLevel + 1); each level speeds up that tier's own
// delivery frequency by another 10% (see getTickspeedProductionMultiplier/
// getEffectiveTierTickSpeedSeconds), without changing the amount delivered per batch or how
// often the autobuyer attempts a purchase (see the flat rate in tickGame). resources[tier.id] and
// owned[tier.id] move together, so requiring only `available >= cost` could drain a tier to
// exactly 0 generators — production for that tier (and everything cascading from it) would stop
// even though the purchase "succeeded". Require at least 1 generator left over instead.
export const buyTickspeedMultiplier = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state
  // The last tier's Money-funded tickspeed ladder is replaced by the XP-funded one while the
  // player currently owns >= 10 of that tier (see isLastTierTickspeedXpUnlocked/
  // consumeXpForLastTierTickspeed) — this button has nothing to do for that tier for as long as
  // that holds, reverting to normal once owned drops back below 10 (e.g. after a Prestige/Speed Up).
  if (tierId === getLastTierId() && isLastTierTickspeedXpUnlocked(state)) return state
  const currentLevel = state.tickspeedLevels?.[tierId] ?? 1

  const cost = getTickspeedMultiplierCost(tierId, currentLevel + 1)
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
    tickspeedLevels: {
      ...state.tickspeedLevels,
      [tierId]: currentLevel + 1,
    },
  }
}

// Permanently makes a tier's autobuyer "smart": in tickGame, that tier buys one unit at a time
// (rather than waiting for a full 10-unit block) until it reaches 10 lifetime purchases, then
// switches to the normal full-block batching from then on — fixes an otherwise-permanent stall
// where a tier with 0 owned generators (0 income) can never afford a full first block on its
// own. Costs SMART_AUTOBUYER_COST_MULTIPLIER times more PP than unlocking that tier's autobuyer
// (see getSmartAutobuyerCost) — and requires the autobuyer already be unlocked first. Smart and
// the tier tickspeed autobuyer (see buyTierTickspeedAutobuyer below) are independent, parallel
// purchases — both only require Unlock first, neither depends on the other — so the MainPage PP
// Upgrades page shows both controls at once once Unlock is bought, not one after the other. A
// no-op if not yet unlocked, already smart, or there aren't enough unspent points.
export const buySmartAutobuyer = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier) return state
  if (state.autobuyers[tierId] == null) return state
  if (state.smartAutobuyer?.[tierId]) return state

  const cost = getSmartAutobuyerCost(tierId)
  if (clampNonNegative(state.prestige.points) < cost) return state

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - cost },
    smartAutobuyer: { ...state.smartAutobuyer, [tierId]: true },
  }
}

// Permanently makes a tier's own (Money-funded) tickspeed multiplier upgrade itself
// automatically — the multiplier itself is buyable by default (see tickspeedLevels), so this is
// the only thing about it that's PP-gated. Costs TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER times
// more PP than unlocking that tier's (unrelated) unit-buying autobuyer would cost (see
// getTierTickspeedAutobuyerCost, used purely as a pricing benchmark) — no autobuyer-unlock
// prerequisite, independent of Smart (see buySmartAutobuyer above), which does still require
// that unlock. A no-op if the tier itself isn't unlocked yet (isTierUnlocked, same reachability
// gate buyTickspeedMultiplier itself uses), if already bought, or if there aren't enough unspent
// points.
export const buyTierTickspeedAutobuyer = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state
  if (state.tierTickspeedAutobuyer?.[tierId]) return state

  const cost = getTierTickspeedAutobuyerCost(tierId)
  if (clampNonNegative(state.prestige.points) < cost) return state

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - cost },
    tierTickspeedAutobuyer: { ...state.tierTickspeedAutobuyer, [tierId]: true },
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

// Activate (currentLevel null → 1) or upgrade (level N → N+1) the global tickspeed multiplier,
// always by spending Money (Ones) — activation is just the N=0 case of the same cost formula
// (getGlobalTickspeedMultiplierCost(0) = 10). A single global upgrade track, not per-tier — unlike
// the per-tier tickspeed multiplier (also Money-funded and also buyable with no PP prerequisite),
// this one requires owning at least 1 of the second tier first (see
// isGlobalTickspeedMultiplierUnlocked). A no-op if not yet unlocked, if Money is short, or while
// production is frozen.
export const buyGlobalTickspeedMultiplier = state => {
  if (isProductionFrozen(state)) return state
  if (!isGlobalTickspeedMultiplierUnlocked(state)) return state

  const currentLevel = state.globalTickspeedMultiplier ?? null
  const cost = getGlobalTickspeedMultiplierCost(currentLevel ?? 0)
  const available = state.resources[MONEY_ID] ?? 0
  if (available < cost) return state

  return {
    ...state,
    resources: { ...state.resources, [MONEY_ID]: available - cost },
    globalTickspeedMultiplier: (currentLevel ?? 0) + 1,
  }
}

// Reaching GOOGOL money awards Prestige Points (see getPrestigePointsAwarded) and resets all
// progress. XP is untouched by prestige — it's earned independently via money milestones, and
// prestige itself is gated on Money ≥ GOOGOL, not XP; the only thing XP funds is
// consumeXpForLastTierTickspeed, unaffected by this reset. Newly-awarded points add on top of any
// already-unspent balance (PP is a permanent, cumulative currency, unlike resources/owned/
// purchased). Autobuyer unlock is a permanent flag, carried over unchanged across prestige, while
// the run-funded tickspeed levels (now tracked independently of it — see tickspeedLevels) reset to
// their level-1 baseline along with everything else, same as owned/purchased — smartAutobuyer/
// tierTickspeedAutobuyer, by contrast, are permanent and carry over unchanged. globalTickspeedMultiplier
// (the Money-funded global tickspeed level) resets to not-yet-bought here too, same as speedUpGame —
// neither reset preserves it, since it's funded from the same Money balance prestige/Speed Up
// already wipe, same as tickspeedLevels. lastTierXpConsumed is permanent (like autobuyer unlock) —
// a prestige resets the last tier's own owned/purchased count to 0 like every other tier, which
// also (via isLastTierTickspeedXpUnlocked's live owned >= 10 check) disengages the XP-funded
// mechanic until the player buys back up to 10 — but all XP already invested in it carries over
// unchanged, so re-engaging picks back up at the same bonus. everUnlockedTierIds, by contrast, is
// NOT carried over — it resets to the fresh initial default same as owned/purchased, so a real
// Prestige still relocks every
// tier beyond the first exactly as it always has (see isTierUnlocked/latchEverUnlockedTiers) —
// this flag exists only to stop consumeXpForLastTierTickspeed's narrower reset from relocking
// tiers, not to change what Prestige/Speed Up themselves do.
export const prestigeGame = state => {
  if (clampNonNegative(state.resources[MONEY_ID]) < GOOGOL) return state

  const pointsAwarded = getPrestigePointsAwarded(state.resources[MONEY_ID])
  const initial = createInitialGameState()
  return {
    ...initial,
    autobuyers: state.autobuyers ?? initial.autobuyers,
    smartAutobuyer: state.smartAutobuyer ?? initial.smartAutobuyer,
    tierTickspeedAutobuyer: state.tierTickspeedAutobuyer ?? initial.tierTickspeedAutobuyer,
    autoPrestige: state.autoPrestige ?? initial.autoPrestige,
    prestigeSpeedBonusUnlocked: state.prestigeSpeedBonusUnlocked ?? initial.prestigeSpeedBonusUnlocked,
    speedUpCount: state.speedUpCount ?? initial.speedUpCount,
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoGlobalTickspeed: state.autoGlobalTickspeed ?? initial.autoGlobalTickspeed,
    lastTierXpConsumed: state.lastTierXpConsumed ?? initial.lastTierXpConsumed,
    // everUnlockedTierIds is deliberately NOT carried over here — unlike every permanent flag
    // above, it resets to the fresh initial default (only the first tier true) same as owned/
    // purchased, so a real Prestige/Speed Up still relocks every tier beyond the first exactly
    // like before this flag existed (see isTierUnlocked) — this flag only exists to stop
    // consumeXpForLastTierTickspeed's narrower owned-only reset from relocking tiers, not to
    // change what a full Prestige/Speed Up reset does.
    prestige: {
      ...initial.prestige,
      xp: state.prestige.xp,
      points: clampNonNegative(state.prestige.points) + pointsAwarded,
      count: state.prestige.count + 1,
    },
  }
}

// A more frequent soft-reset than real Prestige, available well before Money reaches GOOGOL:
// once the last tier reaches getSpeedUpRequirement(speedUpCount) lifetime purchases — 10 for the
// first activation, 20 for the second, 30 for the third, … — resets resources/owned/purchased
// (and every other per-run field, including every tier's own tickspeed level and the global
// tickspeed multiplier, both back to not-yet-bought — same reset prestigeGame now does) back to a
// fresh game exactly like createInitialGameState, but permanently doubles production speed (see
// getSpeedUpMultiplier). Autobuyer unlock/smartAutobuyer/tierTickspeedAutobuyer/autoPrestige/
// prestigeSpeedBonusUnlocked/autoSpeedUp/autoGlobalTickspeed (the *automation toggles*, as opposed
// to the global tickspeed multiplier's own level) carry over unchanged — so if the global
// tickspeed Autobuyer was already bought, tickGame simply starts re-buying the multiplier back up
// from scratch once Money allows. lastTierXpConsumed is likewise permanent — the last tier's own
// owned/purchased count resets to 0 like every other tier's, which disengages the XP-funded
// mechanic (see isLastTierTickspeedXpUnlocked's live owned >= 10 check) until it's bought back up
// to 10, but all XP already invested in it carries over unchanged.
// everUnlockedTierIds, by contrast, is NOT carried over here either (same as prestigeGame) — it
// resets to the fresh default, so Speed Up still relocks every tier beyond the first exactly as
// it always has. Unlike
// prestigeGame, `prestige` (xp/points/count/highestMilestone) is passed through completely
// untouched — Speed Up is unrelated to real Prestige or Prestige Points, and doesn't award or
// spend any. A no-op (returns the same state) while frozen (a frozen state is waiting on a real
// Prestige, not a Speed Up) or before the last tier has reached that cycle's requirement.
export const speedUpGame = state => {
  if (isProductionFrozen(state)) return state
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  if (getTierPurchasedCount(state, lastTier.id) < getSpeedUpRequirement(state.speedUpCount ?? 0)) return state

  const initial = createInitialGameState()
  return {
    ...initial,
    autobuyers: state.autobuyers ?? initial.autobuyers,
    smartAutobuyer: state.smartAutobuyer ?? initial.smartAutobuyer,
    tierTickspeedAutobuyer: state.tierTickspeedAutobuyer ?? initial.tierTickspeedAutobuyer,
    autoPrestige: state.autoPrestige ?? initial.autoPrestige,
    prestigeSpeedBonusUnlocked: state.prestigeSpeedBonusUnlocked ?? initial.prestigeSpeedBonusUnlocked,
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoGlobalTickspeed: state.autoGlobalTickspeed ?? initial.autoGlobalTickspeed,
    lastTierXpConsumed: state.lastTierXpConsumed ?? initial.lastTierXpConsumed,
    // everUnlockedTierIds is deliberately NOT carried over here — unlike every permanent flag
    // above, it resets to the fresh initial default (only the first tier true) same as owned/
    // purchased, so a real Prestige/Speed Up still relocks every tier beyond the first exactly
    // like before this flag existed (see isTierUnlocked) — this flag only exists to stop
    // consumeXpForLastTierTickspeed's narrower owned-only reset from relocking tiers, not to
    // change what a full Prestige/Speed Up reset does.
    prestige: state.prestige,
    speedUpCount: (state.speedUpCount ?? 0) + 1,
  }
}

// One-time PP cost to permanently automate Speed Up (see AUTO_SPEED_UP_COST) — once bought,
// tickGame calls speedUpGame automatically every tick, which re-validates eligibility internally
// (no-op unless the last tier has reached 10 purchases and production isn't frozen), so this just
// removes the need for a manual click once eligible. A no-op if already bought, if there aren't
// enough unspent points, or while production is frozen — same convention as
// buyPrestigeSpeedBonus/buyAutobuyerUnlock.
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

// One-time PP cost to permanently automate the (Money-funded) global tickspeed multiplier (see
// TICKSPEED_AUTOBUYER_COST) — once bought, tickGame calls buyGlobalTickspeedMultiplier
// automatically every tick, which re-validates its own eligibility internally (no-op unless
// isGlobalTickspeedMultiplierUnlocked and there's enough Money), so this just removes the need for
// a manual click once affordable. A no-op if already bought, if there aren't enough unspent
// points, or while production is frozen — same convention as buyAutoSpeedUp/buyPrestigeSpeedBonus.
export const buyTickspeedAutobuyer = state => {
  if (isProductionFrozen(state)) return state
  if (state.autoGlobalTickspeed) return state
  if (clampNonNegative(state.prestige.points) < TICKSPEED_AUTOBUYER_COST) return state

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - TICKSPEED_AUTOBUYER_COST },
    autoGlobalTickspeed: true,
  }
}

// Spends XP to permanently compound another LAST_TIER_XP_TICKSPEED_STEP (1%) into the last
// tier's own tickspeed multiplier per XP consumed (see getLastTierXpTickspeedMultiplier) — only
// available while isLastTierTickspeedXpUnlocked (the last tier currently owns >= 10), which is
// when it's currently replacing that tier's Money-funded tickspeed button (see
// buyTickspeedMultiplier). Every successful consumption, no
// matter how small, resets tier 1 through the second-to-last tier's `owned` (and, to keep them in
// sync, `resources`) counts back to 0 — the current *quantity* of each of those tiers, not their
// `purchased` lifetime count ("level"), which is left completely untouched everywhere — plus the
// Money balance (`resources[MONEY_ID]`) back to 0. The last tier's own `owned`/`resources`/
// `purchased` are all left untouched. This is the price of investing further into the last tier's
// own delivery frequency. A single consumption must be at least
// getLastTierXpTickspeedMinConsumption(xpConsumed so far) — see LAST_TIER_XP_TICKSPEED_MIN_
// CONSUMPTION_PERCENT in layers.js — so it can't trickle in one XP at a time forever. A no-op if
// not yet unlocked, if amount isn't a positive integer, if amount is below that minimum, if there
// isn't enough unspent XP, or while production is frozen.
export const consumeXpForLastTierTickspeed = amount => state => {
  if (isProductionFrozen(state)) return state
  if (!isLastTierTickspeedXpUnlocked(state)) return state

  const safeAmount = Math.floor(clampNonNegative(amount))
  if (safeAmount <= 0) return state

  const xpConsumedSoFar = state.lastTierXpConsumed ?? 0
  if (safeAmount < getLastTierXpTickspeedMinConsumption(xpConsumedSoFar)) return state

  const availableXp = clampNonNegative(state.prestige.xp)
  if (safeAmount > availableXp) return state

  const lastTierId = getLastTierId()
  const resetTierIds = TIER_DEFINITIONS
    .filter(tier => tier.id !== lastTierId)
    .map(tier => tier.id)

  return {
    ...state,
    prestige: { ...state.prestige, xp: availableXp - safeAmount },
    lastTierXpConsumed: xpConsumedSoFar + safeAmount,
    owned: {
      ...state.owned,
      ...resetTierIds.reduce((acc, tierId) => ({ ...acc, [tierId]: 0 }), {}),
    },
    resources: {
      ...state.resources,
      [MONEY_ID]: 0,
      ...resetTierIds.reduce((acc, tierId) => ({ ...acc, [tierId]: 0 }), {}),
    },
  }
}
