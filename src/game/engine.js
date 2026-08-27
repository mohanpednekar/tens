import { AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, BITS_PER_BYTE, BYTES_ID, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_BOOST_TIER_FIELDS, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_FLOPS_TIER_DEFINITIONS, COMPUTE_TIER_LABELS, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_BOUNDARIES, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_DURATION_UPGRADE_COUNT, COMPUTE_MERGE_RATIO, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, DATA_LAKE_CAPACITY_MAX_LEVEL, DATA_LAKE_MAX_DISK_LADDER_STEP, DATA_LAKE_SUB_SIZES, DATA_LAKE_TIER_COUNT, DATA_LAKE_TIER_LABELS, DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER, DATA_LAKE_TRANSFER_CAPACITY_MAX, DEFAULT_PURCHASE_BLOCK_SIZE, DISK_ARRAY_LADDER_CAP, DISK_BUILD_COST_MULTIPLIER, DISK_CACHE_BLOCK_COUNT, DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER, DISK_LADDER_BASE_SIZE_BITS, DISK_LADDER_SIZE_MULTIPLIER, EON_AMPLIFIER_AWARD_PER_LEVEL, ERA_ELIGIBILITY_PP, FLOPS_AUTOBUYER_ERA_START, FLOPS_AUTOBUYER_ERA_STEP, getTierBaseTickSpeedSeconds, GLOBAL_TICKSPEED_MILESTONE_STEP, GLOBAL_TICKSPEED_PRODUCTION_STEP, GOOGOL, HYPERSCALER_EFFICIENCY_RATE_BONUS_PER_LEVEL, HYPERSCALER_EON_COST_BASE, HYPERSCALER_EON_COST_MULTIPLIER, INTRO_BANDWIDTH_COST_MULTIPLIER, INTRO_BYTE_BASE_RATE, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_CAP_BITS, INTRO_CAPACITY_DOUBLING_STEP, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, INTRO_CONVERSION_UNLOCK_CAPACITY, INTRO_DISK_UNLOCK_CAPACITY, INTRO_MIN_TICK_SPEED_SECONDS, INTRO_PRODUCTION_MULTIPLIER_STEP, INTRO_STARTING_CAPACITY, INTRO_STARTING_TICK_SPEED_SECONDS, MEMORY_BINARY_UNIT_STEP, MUSEUM_HISTORY_CAP, MUSEUM_PIN_CAP, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT, LAST_TIER_XP_TICKSPEED_STEP, MAX_OFFLINE_SECONDS, MONEY_ID, MONEY_STARTING_AMOUNT, OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS, OFFLINE_PROGRESS_SPEED_MULTIPLIER, OVERCLOCK_MULTIPLIER_STEP, OVERCLOCK_REQUIREMENT_STEP, PRESTIGE_DOUBLE_PP_UPGRADE_COST_BASE, PRESTIGE_POINT_SPEED_BONUS, PRESTIGE_POWERS_PER_PP_BASE, PRESTIGE_SPEED_BONUS_UNLOCK_COST, PRESTIGE_THRESHOLD, PRESTIGE_UNBOUNDED_MIN_COUNT, PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS, PURCHASE_BLOCK_SIZE_GROWTH_STEP, PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE, PURCHASE_MILESTONE_MULTIPLIER_BASE, RESOURCE_SYMBOL, SMART_AUTOBUYER_COST_MULTIPLIER, SPEED_UP_MULTIPLIER_BASE, TICKSPEED_AUTOBUYER_COST, TICKSPEED_MULTIPLIER_BASE_EXPONENT, TICKSPEED_PRODUCTION_STEP, TIER_DEFINITIONS, TIER_TICKSPEED_AUTOBUYER_MILESTONE_START, TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP } from './layers'

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
// tier's XP-funded one, which compounds — see getLastTierXpTickspeedMultiplier) can overflow to
// Infinity in double-precision float, which would divide the base period down to exactly 0. That
// 0 then feeds tickGame's `ticksElapsed = accumulated / tickSpeed` as Infinity, and `accumulated -
// ticksElapsed * tickSpeed` collapses to `Infinity * 0 = NaN`, permanently corrupting that tier's
// production accumulator (and, via clampNonNegative treating NaN as "not finite", silently
// zeroing the produced tier's owned/resources every tick from then on — not a one-off glitch,
// since the NaN accumulator never recovers on its own). lastTierXpConsumed/prestige.xp reset to 0
// on every Prestige/Speed Up (see prestigeGame/speedUpGame), which makes this overflow far less
// reachable in practice than when this guard was first added, but this floor is kept regardless as
// defense in depth — a single long enough run before the next reset could still in principle drive
// it there. Clamping the period to this floor instead keeps ticksElapsed a large-but-finite
// integer, which is safe.
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

const createEmptyDataLakeTier = () => ({
  deposits: { 1: 0, 10: 0, 100: 0 },
  purchased: 0,
  // In-flight Booster transfers sourced live from raw built Disks (see getBoosterTransferPlan/
  // startBoosterTransfer/tickDataLakeTransfers) — each entry `{ remainingSeconds }`. Length never
  // exceeds getDataLakeTransferCapacity(state, tierIndex). NOT a spendable stockpile like
  // `deposits` above — just a countdown until the already-consumed Disks finish arriving and
  // convert into a Booster.
  transfers: [],
  // How many times this lake's own deposit capacity has been doubled — see getDataLakeCapacity
  // below. 0 = the starting 1-unit capacity; DATA_LAKE_CAPACITY_MAX_LEVEL is a permanent hard cap.
  capacityLevel: 0,
})

export const createEmptyDataLakes = () => {
  const lakes = {}
  for (let tier = 1; tier <= DATA_LAKE_TIER_COUNT; tier += 1) {
    lakes[tier] = createEmptyDataLakeTier()
  }
  return lakes
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
  // Current level per tier (1-indexed) — level 1 is the starting level; completing it (buying
  // getPurchaseBlockSize(state) pieces of it, see below) advances to level 2, and so on. Tracked
  // directly, incremented purchase-by-purchase in buyTier, rather than derived from `purchased` via
  // division — the block size a level requires can change over the course of a run (see
  // getPurchaseBlockSize), so there's no fixed divisor to derive a level from after the fact.
  // Resets to 1 for every tier on Prestige and Speed Up, same as owned/purchased.
  purchaseLevels: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 1,
  }), {}),
  // How many of the current level's pieces are already bought — 0 up to (but not including)
  // whatever getPurchaseBlockSize(state) currently is; reaching that value completes the level,
  // resetting this back to 0 and advancing purchaseLevels[tier.id] by 1 (see buyTier). Tracked
  // directly alongside purchaseLevels for the same reason — not derived via a modulo. Resets to 0
  // for every tier on Prestige and Speed Up.
  purchaseLevelProgress: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  // null = not yet unlocked (see applyAutobuyerMilestones — a permanent, prestige-count-milestone
  // triggered unlock, no PP cost); once unlocked, `1` (a plain truthy flag — its value no longer means anything beyond "unlocked",
  // see tickspeedLevels below), and the tier's autobuyer buys tier units automatically every
  // tick. Buying/self-upgrading the tier's own tickspeed multiplier is entirely independent of
  // this flag — see tickspeedLevels/buyTickspeedMultiplier and tierTickspeedAutobuyer below.
  autobuyers: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: null,
  }), {}),
  // Permanent per-tier flag, default true: whether this tier's unit-buying autobuyer (once
  // unlocked — see autobuyers above) currently acts — split "unlocked" (autobuyers, permanent,
  // unaffected) from "enabled" (this field, also permanent — pausing is a standing preference, not
  // run-scoped state), same convention as the global automations' own *Enabled fields below (see
  // setAutobuyerEnabled/tickGame). Meaningless (and a no-op to toggle) while autobuyers[tierId] is
  // still null. The manual Buy button is unaffected either way.
  autobuyersEnabled: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: true,
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
  // autobuyer "smart" — buys one unit at a time until it completes its first level, then
  // switches to the normal full-block batching from then on (see tickGame/buySmartAutobuyer) —
  // never reset by prestige.
  smartAutobuyer: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: false,
  }), {}),
  // Permanent per-tier flag: whether this tier's own (Money-funded) tickspeed multiplier upgrades
  // itself automatically — see applyAutobuyerMilestones/tickGame; unlocked automatically at a
  // prestige-count milestone, no PP cost. Needs no other prerequisite (the manual purchase itself
  // is unlocked by default — see tickspeedLevels above); independent of smartAutobuyer and of
  // whether the tier's own autobuyer has ever been unlocked — never reset by prestige.
  tierTickspeedAutobuyer: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: false,
  }), {}),
  // Permanent per-tier flag, default true: whether this tier's tier tickspeed autobuyer (once
  // bought — see tierTickspeedAutobuyer above) currently acts — split "unlocked" from "enabled" the
  // same way autobuyersEnabled splits from autobuyers above (see
  // setTierTickspeedAutobuyerEnabled/tickGame). Meaningless (and a no-op to toggle) while
  // tierTickspeedAutobuyer[tierId] is still false. The manual tickspeed-multiplier button is
  // unaffected either way.
  tierTickspeedAutobuyerEnabled: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: true,
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
  // Permanent GLOBAL flag, default true: whether Auto-Prestige (once bought — see autoPrestige
  // above) currently acts, independent of whether it's been bought at all. Split "unlocked" (the
  // autoPrestige level above, permanent, unaffected) from "enabled" (this field, also permanent —
  // pausing is a standing preference, not run-scoped state) so a player can temporarily stop
  // Auto-Prestige from firing without losing the level/PP already invested — see
  // setAutoPrestigeEnabled/tickGame. Meaningless while autoPrestige is null; toggling it then is a
  // no-op (see setAutoPrestigeEnabled).
  autoPrestigeEnabled: true,
  // Permanent GLOBAL flag, default false: whether Prestige Points have been spent to make
  // Auto-Prestige keep RE-LEVELING itself automatically once affordable (see
  // buyAutoPrestigeAutobuyer/tickGame) — a "meta-automation" companion to autoPrestige above,
  // distinct from activating Auto-Prestige in the first place. Only meaningful once autoPrestige is
  // already non-null (buyAutoPrestigeAutobuyer is a no-op before that) — never reset by
  // prestige/Speed Up, like every other automation-unlock flag in this state.
  autoPrestigeAutobuyer: false,
  // Permanent GLOBAL flag, default true: whether the Auto-Prestige Autobuyer (once bought — see
  // autoPrestigeAutobuyer above) currently acts — split from "unlocked" the same way
  // autoPrestigeEnabled/autoSpeedUpEnabled/autoGlobalTickspeedEnabled split from their own parent
  // flags. Never reset by prestige or Speed Up. Meaningless (and a no-op to toggle, see
  // setAutoPrestigeAutobuyerEnabled) while autoPrestigeAutobuyer is false.
  autoPrestigeAutobuyerEnabled: true,
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
  // Permanent count of Double PP upgrades bought (see buyPrestigeDoublePp) — never reset by
  // Prestige or Speed Up. Each level halves powers-per-PP until 1, then doubles PP-per-power.
  prestigeDoublePpLevel: 0,
  // RUN-SCOPED count of how many times Speed Up has been triggered (see speedUpGame) — drives
  // getSpeedUpMultiplier's unconditional production-speed multiplier. Never reset by Speed Up
  // itself (it's the thing being incremented), but IS reset to 0 by a real Prestige (see
  // prestigeGame) — unlike the automation toggles/levels around it (smartAutobuyer/autoPrestige/
  // prestigeSpeedBonusUnlocked/autoSpeedUp), the Speed Up multiplier itself doesn't survive a real
  // Prestige and has to be rebuilt from scratch each Prestige cycle.
  speedUpCount: 0,
  // RUN-SCOPED level reached by Overclock (see overclockGame) — a second, steeper Speed-Up-style
  // soft reset, claimable once the last tier's own level passes getOverclockRequirement(overclockCount)
  // (one more than the last claimed level; a claim jumps straight to the last tier's current level,
  // so falling behind doesn't require claiming every intermediate level). Permanently multiplies the
  // (Money-funded) global tickspeed multiplier's own regular AND milestone per-level steps by
  // getOverclockMultiplier(overclockCount) — see getGlobalTickspeedProductionMultiplier — compounding
  // OVERCLOCK_MULTIPLIER_STEP (10%, i.e. ×1.1) per level, not a separate multiplier stacked
  // alongside it. Unlike speedUpCount just above, this is NOT reset by an ordinary Speed Up
  // (speedUpGame explicitly carries it through unchanged) — only by a real Prestige (same reasoning
  // as speedUpCount: an unbounded permanent compounding bonus across every future Prestige forever
  // would trivialize the Prestige cost curve) or by Overclock's own claim resetting *speedUpCount*
  // (never itself — see overclockGame).
  overclockCount: 0,
  // Permanent GLOBAL flag, false = not yet bought: whether Prestige Points have been spent to
  // make Speed Up trigger automatically (see buyAutoSpeedUp/tickGame) the instant it's eligible —
  // no manual click needed. Never reset by prestige or by Speed Up itself, like
  // smartAutobuyer/autoPrestige/prestigeSpeedBonusUnlocked above.
  autoSpeedUp: false,
  // Permanent GLOBAL flag, false = not yet bought: whether the 30 PP Compute auto-Boost unlock
  // has been purchased (see COMPUTE_AUTO_BOOST_UNLOCK_COST / buyComputeAutoBoost /
  // tickAutoComputeBoost). Never reset by Prestige or Speed Up — same permanence class as
  // autoSpeedUp above. Preferred preset lives on intro.computeAutoBoostType (default 'standard').
  computeAutoBoostUnlocked: false,
  // Permanent GLOBAL flag, default true: whether Auto Speed Up (once bought — see autoSpeedUp
  // above) currently acts — split from "unlocked" the same way autoPrestigeEnabled splits from
  // autoPrestige (see its own comment above). Never reset by prestige or Speed Up. Meaningless
  // (and a no-op to toggle, see setAutoSpeedUpEnabled) while autoSpeedUp is false.
  autoSpeedUpEnabled: true,
  // Permanent GLOBAL flag, false = not yet bought: whether Prestige Points have been spent to
  // make the (Money-funded) global tickspeed multiplier upgrade itself automatically every tick
  // (see buyTickspeedAutobuyer/tickGame) — no manual click needed. Never reset by prestige or by
  // Speed Up, like autoSpeedUp above.
  autoGlobalTickspeed: false,
  // Permanent GLOBAL flag, default true: whether the global Tickspeed Autobuyer (once bought —
  // see autoGlobalTickspeed above) currently acts — split from "unlocked" the same way
  // autoPrestigeEnabled/autoSpeedUpEnabled split from their own parent flags above. Never reset by
  // prestige or Speed Up. Meaningless (and a no-op to toggle, see
  // setAutoGlobalTickspeedEnabled) while autoGlobalTickspeed is false.
  autoGlobalTickspeedEnabled: true,
  // Run-scoped cumulative total of XP ever spent via consumeXpForLastTierTickspeed — each XP spent
  // compounds another 1% into the last tier's own delivery frequency (see
  // getLastTierXpTickspeedMultiplier), so this counter alone drives that bonus. Reset to 0 by both
  // prestigeGame and speedUpGame (same as prestige.xp, the currency that funds it) — never reset by
  // consumeXpForLastTierTickspeed itself, though (it only ever grows within a run).
  lastTierXpConsumed: 0,
  // Permanent per-tier flag: whether isTierUnlocked's live condition (own owned > 0, or the
  // previous tier's owned >= getPurchaseBlockSize(state)) has ever been satisfied for this tier — latched true forever the
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
    // spent via buySmartAutobuyer/buyPrestigeSpeedBonus/etc. (tier autobuyer unlock itself no
    // longer spends PP — see applyAutobuyerMilestones). Unspent points also drive
    // production speed (see getPrestigeProductionMultiplier), but only once
    // prestigeSpeedBonusUnlocked is true.
    points: 0,
    // Number of times ever prestiged — drives only the first-run-vs-repeat UI presentation
    // (MainPage), not production or cost. Renamed from the old `level` field now that prestige
    // grants points instead of directly doubling production.
    count: 0,
    highestMilestone: Math.floor(Math.log10(MONEY_STARTING_AMOUNT)),
    // Permanent latch: once true (first prestige.count >= PRESTIGE_UNBOUNDED_MIN_COUNT, or carried
    // through Era ascension), production never freezes at PRESTIGE_THRESHOLD again — see
    // isUnboundedPrestigeUnlocked. Full save Reset only.
    unboundedUnlocked: false,
  },
  // Era ascension count — meta layer above Prestige (#407). Never reset except full save Reset.
  era: {
    count: 0,
  },
  // Eons — meta currency from Era ascension; spent on hyperscalers and Eon upgrades (#407/#414).
  eons: {
    balance: 0,
  },
  // Permanent hyperscaler generators bought with Eons — each adds +0.01%/s (before efficiency).
  hyperscalerCount: 0,
  eonsUpgrades: {
    autoHyperscalerUnlocked: false,
    autoHyperscalerEnabled: true,
    eonAmplifierLevel: 0,
    hyperscalerEfficiencyLevel: 0,
  },
  // Flops autobuyers unlocked free at Era milestones (see getFlopsAutobuyerUnlockEra) — null = locked.
  computeFlopsAutobuyers: COMPUTE_FLOPS_TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: null }), {}),
  computeFlopsAutobuyersEnabled: COMPUTE_FLOPS_TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: true }), {}),
  computeFlopsAutobuyerAttemptBudgets: COMPUTE_FLOPS_TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: 0 }), {}),
  // Prestige museum — permanent per save slot. Every real Prestige appends one history entry
  // (see prestigeGame); players may pin a subset for the Supporter museum UI. Meta QoL only —
  // never affects production, costs, or unlocks.
  prestigeMuseum: {
    history: [],
    pinnedIds: [],
  },
  // PP-funded Flops Compute screen (nav "Compute") — owned counts are permanent; cumulativeBoost
  // per main-game tier resets each Prestige cycle. pageUnlocked latches true once PP >= reveal.
  computeFlops: {
    pageUnlocked: false,
    owned: COMPUTE_FLOPS_TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: 0 }), {}),
    cumulativeBoost: TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: 0 }), {}),
  },
  // The Byte Foundry pre-game intro's own state — a currency pool entirely separate from
  // resources.base (see the "Byte Foundry" constants in layers.js) until the manual/auto
  // conversions into owned Kilobytes (see convertIntroBitsToKilobytes/tickIntroAutoInvest below).
  // Field naming ('intro') is deliberately decoupled from the page's own themed name ("Byte
  // Foundry"), same id/name decoupling convention TIER_DEFINITIONS' own `id` vs `name` uses.
  //
  // Three distinct groups, per prestigeGame (see there): "Memory" (bits/productionAccumulator/
  // mainGameUnlocked) reset to fresh every real Prestige — a new cycle always starts this screen's
  // balance from 0 and re-shows it before MainPage. The Byte generator itself and every upgrade to
  // it (byteCreated/capacity/tickSpeedSeconds/productionMultiplier/productionMilestoneTier/
  // productionMilestoneTierClaims) are PERMANENT, carried over unchanged exactly like an unlocked
  // autobuyer — so each cycle's gate reopens with whatever production strength was already built,
  // not from scratch. speedUpGame/overclockGame carry the whole object through untouched either
  // way (see there) — they're intra-cycle soft resets, not new cycles.
  //
  // Nothing here ever fully "freezes" (there is no completed-style flag, and converting bits into
  // Kilobytes has no cap or budget of its own either — see convertIntroBitsToKilobytes/
  // tickIntroAutoInvest below) — Tap/Combine/Sacrifice/Invest/Convert all keep working
  // indefinitely, every cycle, for as long as Memory covers the cost.
  intro: {
    bits: 0,                   // "Memory" — always an integer, the tappable/producible balance. Resets on Prestige.
    productionAccumulator: 0,  // fractional sub-bit accumulator, same pattern as tierProductionAccumulators. Resets on Prestige.
    capacity: INTRO_STARTING_CAPACITY,        // PERMANENT — Memory's ceiling, grown by "Sacrifice for 2x Capacity"
    byteCreated: false,        // PERMANENT — one persistent Byte generator, a flag not a counter
    tickSpeedSeconds: INTRO_STARTING_TICK_SPEED_SECONDS, // PERMANENT — the delivery period a batch lands every, see getIntroProductionRate
    productionMultiplier: 1,   // PERMANENT — see getIntroProductionRate/pickIntroProductionMilestone
    // PERMANENT — 0-based index into "Invest for Double Production"'s own independent cost ladder
    // (see getIntroProductionMilestoneCost below) — entirely decoupled from `capacity` above; it
    // only ever advances (via pickIntroProductionMilestone), never tied to Sacrifice.
    productionMilestoneTier: 0,
    // PERMANENT — claims made at the current productionMilestoneTier (0 up to but not including
    // getIntroProductionMilestoneMaxClaims(productionMilestoneTier)); resets to 0 whenever the tier
    // advances — see pickIntroProductionMilestone.
    productionMilestoneTierClaims: 0,
    // PERMANENT until Sacrifice rolls it back (#323/#324): how many Bandwidth ×2 claims were
    // funded by sacrificing COMPUTE_ENTITY_CAP tokens of a compute tier (when the bit cost
    // exceeded Memory capacity). Sacrifice rewinds exactly this many Invest steps.
    computeFundedBandwidthClaims: 0,
    // PERMANENT until Sacrifice rolls it back: next COMPUTE_BOOST_TIER_FIELDS index (0 = Cores …
    // 9 = Megacomputers) for the sequential Bandwidth-via-compute sacrifice, wrapping back to 0
    // after Megacomputers rather than terminating (see getEffectiveComputeBandwidthSacrificeIndex)
    // — so this stays a renewable funding source even once Sacrifice itself is capped and can no
    // longer reset it early. Resets to 0 when Sacrifice does roll back compute-funded Bandwidth.
    computeBandwidthSacrificeIndex: 0,
    // Set by resetByteFoundry: high-water marks for Convenience auto-replay (Combine, Invest /
    // Bandwidth, Disk Build, and Capacity/Sacrifice) after a Foundry wipe. null when inactive.
    // Survives Prestige like other permanent intro fields; cleared only by a full save Reset.
    foundryResetCaps: null,
    // Resets to false every real Prestige. True the instant any bits are ever converted into
    // Kilobytes this cycle (manual or auto — see convertIntroBitsToKilobytes/tickIntroAutoInvest);
    // drives App.jsx's page-routing gate away from this screen and into MainPage. Not a "frozen"
    // flag at all — converting keeps working indefinitely afterward too, with no cap.
    mainGameUnlocked: false,
    // Resets every real Prestige. When true, the next time Memory is full (and Disk Fill /
    // Bandwidth / Disk Build are not available), tickQueuedCapacityUpgrade / the queued fire path
    // erases all held Compute tokens (ladder balances + active boost + in-flight merge timers)
    // and performs Sacrifice for 2x Capacity — bypassing the normal "Compute blocks Capacity"
    // forced-priority gate so Capacity can be committed before the bar is full and not starved
    // by Core claims / Boosts. See queueIntroCapacityUpgrade/eraseAllComputeTokens.
    capacityUpgradeQueued: false,
    // PERMANENT — { [capacityBits]: count } of currently-FULL Disks of that size (see
    // tickDiskAutoFill/redeemDisk below) — "never lost," survives Prestige/Speed Up/Overclock
    // exactly like the Byte generator itself (a full disk's contents ride through a real Prestige
    // untouched even though Memory itself resets, since a disk is a separate store, not part of
    // Memory). Empty object, not per-denomination zeros, since the set of denominations ever built
    // is open-ended. The number of currently EMPTY disks of a size is always
    // disksBuiltTotal[size] - disks[size].
    disks: {},
    // PERMANENT — { [capacityBits]: cumulative count } of every disk ever built (constructed) at
    // that size, full or empty, including ones since redeemed — unlike disks above, redeemDisk
    // never decrements this. Drives getDiskSize's one-way ladder advance past
    // DISK_ARRAY_LADDER_CAP; see the "Byte Foundry Storage" comment in layers.js.
    disksBuiltTotal: {},
    // PERMANENT — { [capacityBits]: bits currently held } in that size array's own cache. Steady
    // state is FULL (size bits); dips only right after a manual block release, after a completed
    // read-cache → disk flush, or when a size is newly unlocked/built. Split into
    // DISK_CACHE_BLOCK_COUNT equal blocks (e.g. a 1 MB array → 8 × 1 Mb) for display /
    // releaseDiskCacheBlock. When full and no tier claim blocks ladder use, the cache flushes into
    // an empty disk over getDiskReadCacheFlushSeconds (one block at the current production rate) —
    // see tickDiskAutoFill. Rides through Prestige untouched, same as disks/disksBuiltTotal above.
    diskCache: {},
    // NOT permanent — in-flight read-cache → disk flushes: { [sizeBits]: { remainingSeconds,
    // totalSeconds } }. Empty at rest. Duration at start is one cache block at the current Byte
    // Foundry production rate (see getDiskReadCacheFlushSeconds). Resets every real Prestige —
    // operational, not banked progress (same posture as diskWriteCache).
    diskReadCacheFlush: {},
    // NOT permanent — in-flight upward merges (write cache): { [targetSizeBits]: { sourceSize,
    // segmentsCollected, segmentRemainingSeconds, segmentTotalSeconds, flushRemainingSeconds,
    // flushTotalSeconds } }. Empty at rest; collect (10 segments from source) then flush (solid
    // drain) into one target disk. Resets every real Prestige — operational, not banked progress.
    diskWriteCache: {},
    // PERMANENT — null when no array is currently mid-build, otherwise
    // { size, remainingSeconds, totalSeconds } for the one disk array build in progress (see
    // startDiskBuild/tickDiskBuild below). Only one
    // size is ever buildable at a time (getDiskSize's own single-size ladder), so a single field
    // suffices rather than a per-size map. While set, every IO operation (auto-fill, auto-redeem,
    // manual cache release, manual redeem) against `size`'s own array is disallowed — "the array
    // rebuild" — until the build completes and disksBuiltTotal[size] increments.
    diskBuild: null,
    // NOT permanent — resets to {} on every real Prestige (see prestigeGame), unlike every other
    // Storage field above. { [capacityBits]: true } once tickDiskAutoRedeem has auto-redeemed that
    // size this cycle, capping auto-redeem at one disk per size per cycle — further eligible disks
    // of an already-auto-redeemed size need a manual click for the rest of the cycle.
    diskAutoRedeemedSizes: {},
    // PERMANENT — one Data Lake per storage denomination (KB … QB), each holding up to
    // getDataLakeCapacity() units deposited from Disks (a prepaid convenience stockpile) plus up to
    // DATA_LAKE_TRANSFER_CAPACITY_MAX live transfers pulling any remaining Booster cost straight
    // off the raw Disk inventory (see depositDiskToDataLake/startBoosterTransfer below).
    dataLakes: createEmptyDataLakes(),
    // PERMANENT — like the Byte generator/Disks above, carried over every real Prestige
    // (see prestigeGame). Granted by startBoosterTransfer (tier 1) below — spending deposited
    // Kilobyte-size Disk stock from that tier's Data Lake first, then a live timed transfer off
    // the raw Disk inventory for any remaining cost — and spent 1 at a time by
    // activateComputeBoost — see the "Byte Foundry Compute Boost" section of layers.js.
    computeCores: 0,
    // PERMANENT — a monotonically-increasing lifetime counter, incremented by
    // latchComputeMergePageIfNeeded (via startBoosterTransfer/tickDataLakeTransfers) alongside computeCores itself
    // but NEVER decremented by spending (activateComputeBoost) or merging
    // (mergeComputeCoresIntoNode/startComputeCoresMerge) — the actual "CUMULATIVE total of Compute
    // Cores ever earned" computeMergePageUnlocked below needs. computeCores alone can't serve this
    // purpose: a player who spends a Boost before ever holding 8 Cores at once would otherwise
    // never trip the latch, even after having earned well past 8 in total.
    computeCoresEverEarned: 0,
    // PERMANENT — incremented by mergeComputeCoresIntoNode (pre-unlock, instant) or by a completed
    // Core->Node reserve merge (post-unlock — see startComputeCoresMerge/
    // tickAutoMergeCoresIntoNode and issue #321), 8 Cores -> 1 Node either way. Also the input to
    // mergeComputeNodesIntoCluster below.
    computeNodes: 0,
    // PERMANENT, same posture as computeCores/computeNodes above — incremented by
    // mergeComputeNodesIntoCluster (8 Nodes → 1 Cluster), and itself the input to
    // mergeComputeClustersIntoNetwork below. Capped at COMPUTE_ENTITY_CAP like every other
    // compute-ladder entity.
    computeClusters: 0,
    // PERMANENT — incremented by mergeComputeClustersIntoNetwork (8 Clusters → 1 Network), and
    // itself the input to mergeComputeNetworksIntoGrid below.
    computeNetworks: 0,
    // PERMANENT — incremented by mergeComputeNetworksIntoGrid (8 Networks → 1 Grid), and itself the
    // input to mergeComputeGridsIntoFabric below.
    computeGrids: 0,
    // PERMANENT — incremented by mergeComputeGridsIntoFabric (8 Grids → 1 Fabric), and itself the
    // input to mergeComputeFabricsIntoCloud below.
    computeFabrics: 0,
    // PERMANENT — incremented by mergeComputeFabricsIntoCloud (8 Fabrics → 1 Cloud), and itself the
    // input to mergeComputeCloudsIntoDatacenter below.
    computeClouds: 0,
    // PERMANENT — incremented by mergeComputeCloudsIntoDatacenter (8 Clouds → 1 Datacenter), and
    // itself the input to mergeComputeDatacentersIntoSupercomputer below.
    computeDatacenters: 0,
    // PERMANENT — incremented by mergeComputeDatacentersIntoSupercomputer (8 Datacenters → 1
    // Supercomputer), and itself the input to mergeComputeSupercomputersIntoMegacomputer below.
    computeSupercomputers: 0,
    // PERMANENT — incremented by mergeComputeSupercomputersIntoMegacomputer (8 Supercomputers → 1
    // Megacomputer). The top of the merge chain today; nothing consumes a Megacomputer yet (see
    // issue #280's "Out of scope").
    computeMegacomputers: 0,
    // PERMANENT, one-time reveal latch for ComputePage — analogous in spirit to
    // intro.mainGameUnlocked's own "first time" latch, but never re-checked once true (see
    // latchComputeMergePageIfNeeded, the only place this ever flips). Gated on
    // computeCoresEverEarned (above) reaching COMPUTE_CORES_PER_NODE (8), not the current live
    // computeCores balance — merging Nodes back down, or spending Cores on a Boost (even before
    // ever holding 8 at once), must never prevent or re-hide the page once earned.
    computeMergePageUnlocked: false,
    // PERMANENT — each flips true (via enableAutoMergeNodesIntoCluster etc.) once, by sacrificing
    // ALL COMPUTE_ENTITY_CAP (10) currently-held units of the merge's OWN output entity — e.g.
    // sacrifice 10 Clusters to enable auto-merging Nodes into Clusters. Once set, tickGame also
    // auto-fires that specific 8-for-1 merge whenever its input entity is completely full (10, not
    // the manual button's own 8 — automation only ever mops up an entity the player let cap out,
    // never preempting a more efficient manual merge at 8). The manual merge button stays available
    // either way. See tickAutoMerge/enableAutoMerge further down this file.
    autoMergeCoresIntoNode: false,
    autoMergeNodesIntoCluster: false,
    autoMergeClustersIntoNetwork: false,
    autoMergeNetworksIntoGrid: false,
    autoMergeGridsIntoFabric: false,
    autoMergeFabricsIntoCloud: false,
    autoMergeCloudsIntoDatacenter: false,
    autoMergeDatacentersIntoSupercomputer: false,
    autoMergeSupercomputersIntoMegacomputer: false,
    // PERMANENT — how many sequential merge-duration step upgrades have been unlocked (0..
    // COMPUTE_MERGE_DURATION_UPGRADE_COUNT). Each step sacrifices COMPUTE_ENTITY_CAP of that
    // boundary's input layer so that boundary is ×5 (not ×10) vs Core earn / the previous layer
    // (see getComputeMergeDurationSeconds / upgradeComputeMergeDuration — issues #367/#377/#380).
    // Must claim in order (Core→Node first, …); each boundary only once. Later boundaries
    // rescale whenever an earlier upgrade changes the chain.
    computeMergeDurationUpgrades: 0,
    // PERMANENT — one countdown field per tier boundary (Core→Node through
    // Supercomputer→Megacomputer), 0 while idle, counting down from that boundary's duration
    // (snapshotted from getComputeMergeDurationSeconds at merge start — live Core earn ×10
    // chain, possibly step-upgraded) while a reserve merge is in flight (see issue #321 /
    // #377 — "Byte Foundry Compute reserve-merge timers" in layers.js). Only ever non-zero once
    // that boundary's own autoMerge* flag above is true — merging stays the old-style instant
    // action until then. Carried through a real Prestige unchanged, same permanence class as the
    // entity counts these merges spend/produce — an in-progress merge simply keeps counting down
    // seamlessly across the cycle boundary rather than losing its already-committed tokens.
    computeCoresMergeRemainingSeconds: 0,
    computeNodesMergeRemainingSeconds: 0,
    computeClustersMergeRemainingSeconds: 0,
    computeNetworksMergeRemainingSeconds: 0,
    computeGridsMergeRemainingSeconds: 0,
    computeFabricsMergeRemainingSeconds: 0,
    computeCloudsMergeRemainingSeconds: 0,
    computeDatacentersMergeRemainingSeconds: 0,
    computeSupercomputersMergeRemainingSeconds: 0,
    // PERMANENT — preferred Compute Boost preset for auto-activation (issue #380): when a reserve
    // merge is in flight and any compute-ladder tier is at COMPUTE_ENTITY_CAP, tickAutoComputeBoost
    // spends from that full tier using this preset (or stacks the active boost if its funding tier
    // is full). One of COMPUTE_BOOST_PRESETS' keys; defaults to 'standard'. Player-selectable on
    // ComputePage; carried through Prestige like other Compute QoL prefs.
    computeAutoBoostType: 'standard',
    // NOT permanent — resets to null/null/0/0 on every real Prestige (unlike computeCores/
    // computeNodes themselves), but carried through untouched by Speed Up/Overclock, same as the
    // rest of intro. Which COMPUTE_BOOST_PRESETS key is currently active, or null if none is. See
    // activateComputeBoost/tickComputeBoost/getComputeBoostMultiplier below.
    computeBoostType: null,
    // NOT permanent, same reset posture as computeBoostType. Which compute-ladder tier (1 =
    // Core, … 10 = Megacomputer — see COMPUTE_BOOST_TIER_FIELDS in layers.js) funded the currently
    // active boost, null while inactive — issue #326. Determines both the refund field
    // (reclaimComputeBoost) and the multiplier/duration scale (getComputeBoostTierMultiplier/
    // getComputeBoostTierDurationSeconds) for as long as this boost stays active.
    computeBoostTierIndex: null,
    // How many times the active boost has been stacked (see stackComputeBoost) — 0 while
    // computeBoostType is null. Purely informational; only computeBoostRemainingSeconds drives
    // the actual multiplier's expiry.
    computeBoostStacks: 0,
    // Counts down every tick (see tickComputeBoost), frozen or not, clearing computeBoostType back
    // to null once it reaches 0.
    computeBoostRemainingSeconds: 0,
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
// non-integer tick shows as "1 b", not a misleading "2 b"). Suffixed with the base currency's own
// symbol (RESOURCE_SYMBOL(MONEY_ID), "b") rather than a hardcoded "$" prefix.
export const formatCurrency = value => {
  const safeValue = Math.floor(clampNonNegative(value))
  const symbol = RESOURCE_SYMBOL(MONEY_ID)
  return safeValue < EXPONENTIAL_NOTATION_THRESHOLD
    ? `${currencyNumberFormatter.format(safeValue)} ${symbol}`
    : `${formatScientific(safeValue)} ${symbol}`
}

// Whole-Byte amounts (Factory Bytes pool — see BYTES_ID) — same rounding/exponential rules as
// formatCurrency, suffixed with uppercase "B" via RESOURCE_SYMBOL(BYTES_ID).
export const formatBytes = value => {
  const safeValue = Math.floor(clampNonNegative(value))
  const symbol = RESOURCE_SYMBOL(BYTES_ID)
  return safeValue < EXPONENTIAL_NOTATION_THRESHOLD
    ? `${currencyNumberFormatter.format(safeValue)} ${symbol}`
    : `${formatScientific(safeValue)} ${symbol}`
}

// Money (Bits) balance below which this switches out to formatCurrency's raw Bits display — 8000
// bits, exactly 1000 Bytes (BITS_PER_BYTE), the same real-Byte threshold Disks' own SI B/KB/MB/…
// scale considers "1 KB" (see getSiByteUnit). Below this a Bytes reading would round to 0 or read
// as an unhelpfully tiny fraction, so Bits stays the more legible unit until there's at least a
// full Byte's worth of KB to show.
const MONEY_BYTES_DISPLAY_THRESHOLD = 8000

// MainPage's own main balance readout (MoneyHero) only — every other formatCurrency call (costs,
// production rates, the Prestige-threshold overlay) keeps showing Bits, its actual priced/spent
// denomination. Once the balance itself reaches MONEY_BYTES_DISPLAY_THRESHOLD, the headline number
// reads more naturally converted into whole Bytes (÷ BITS_PER_BYTE, floored — same "never overstate"
// rounding formatCurrency itself uses) than as an ever-growing raw bit count.
export const formatMoneyBalance = value => {
  const safeValue = Math.floor(clampNonNegative(value))
  if (safeValue < MONEY_BYTES_DISPLAY_THRESHOLD) return formatCurrency(safeValue)
  const bytes = Math.floor(safeValue / BITS_PER_BYTE)
  return bytes < EXPONENTIAL_NOTATION_THRESHOLD
    ? `${currencyNumberFormatter.format(bytes)} B`
    : `${formatScientific(bytes)} B`
}

// The exponent driving a cost epoch's multiplier (see getTierCost): 1, 2, 3, 5, 8, 13, 21, …
// for epochs 0, 1, 2, 3, 4, 5, 6, … — the classic Fibonacci sequence (exponent(e) = fib(e+2) in
// the canonical 0-indexed fib(0)=0, fib(1)=1 numbering), computed iteratively rather than via a
// closed form (Fibonacci has no simple integer one) or naive recursion (which is exponential-time
// for larger epochs — see docs/DESIGN_HISTORY.md for the regression that came from getting this
// wrong). A negative epoch is clamped to 0 rather than throwing, and getTierCost below separately
// clamps level 0/negative levels to level 1 (epoch 0) before this is ever called, so this function
// itself never needs to handle a negative epoch from that caller.
export const getCostEpochExponent = epoch => {
  const e = clampNonNegative(epoch)
  let a = 1 // exponent at epoch 0
  let b = 2 // exponent at epoch 1
  for (let i = 0; i < e; i++) {
    const next = a + b
    a = b
    b = next
  }
  return a
}

// The purchase block size every tier's current level currently requires to complete — a single
// global value shared by every tier (not per-tier), read fresh from state rather than a hardcoded
// constant, so it can grow over the course of a run instead of staying fixed forever. Starts at
// DEFAULT_PURCHASE_BLOCK_SIZE and grows by PURCHASE_BLOCK_SIZE_GROWTH_STEP every
// PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS the LAST tier completes — the same "flagship" tier
// getSpeedUpRequirement/isLastTierTickspeedXpUnlocked/prestigeCardEverRevealed already key off.
// Tying growth to the last tier specifically (rather than any other tier, or a global total) means
// a later increase never retroactively changes an already-unlocked tier's own unlock threshold:
// every earlier tier must already be unlocked (and hence latched via everUnlockedTierIds) by the
// time the last tier is reachable at all, so growth only ever affects whatever level a tier
// currently happens to be working toward, not tiers already past that point.
export const getPurchaseBlockSize = state => {
  const lastTierLevel = state.purchaseLevels?.[getLastTierId()] ?? 1
  const levelsCompleted = Math.max(0, lastTierLevel - 1)
  return DEFAULT_PURCHASE_BLOCK_SIZE + PURCHASE_BLOCK_SIZE_GROWTH_STEP * Math.floor(levelsCompleted / PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS)
}

// The PER-UNIT price of a single purchase — fixed for a given tier+level, independent of the
// current block size: baseCost * 10^(getCostEpochExponent(epoch) - 1); each level multiplies
// baseCost by 10 raised to (that level's cost-epoch exponent − 1). epoch = level - 1 — e.g. a
// baseCost-10 tier's 4th level (epoch 3, exponent 5) costs 10^5 per unit. Every tier scales gently
// relative to its own baseCost (the exponent is added to baseCost's own power of ten, not
// compounded into it), so high tiers don't become permanently out of reach within a handful of
// levels. Deep epochs still eventually overflow to Infinity, which is safe: an infinite cost is
// simply never affordable. Takes the tier's current LEVEL directly (see state.purchaseLevels)
// rather than a lifetime purchased count — level is tracked directly in state, purchase by
// purchase, not derived via division (see getPurchaseBlockSize above for why: the block size a
// level requires can change mid-run, so there's no fixed divisor to derive a level from after the
// fact).
//
// `baseCost` itself is this per-unit price at level 1 (epoch 0) — a fixed constant (see
// TIER_DEFINITIONS in layers.js), not a level-total. A level's TOTAL cost (every purchase within
// it, summed) is this per-unit price times the current `blockSize` (see getTierQuantityCost below)
// — the total that scales with block size, not the per-unit price, so a full level costs more
// once `blockSize` has grown (see getPurchaseBlockSize), even though each individual unit's price
// hasn't changed. No division is involved anywhere in this, so the result is always an exact
// integer — no rounding needed.
export const getTierCost = (tier, level) => {
  const epoch = Math.max(0, clampNonNegative(level) - 1)
  return tier.baseCost * (10 ** (getCostEpochExponent(epoch) - 1))
}

// How many units a bulk purchase actually buys: capped by the requested quantity and by the units
// remaining to complete the current level (blockSize - levelProgress, both read directly from
// state rather than derived), so every unit bought is at the same price.
export const getTierBulkQuantity = (blockSize, levelProgress, requestedQuantity) => {
  const remaining = Math.max(0, clampNonNegative(blockSize) - clampNonNegative(levelProgress))
  return Math.max(0, Math.min(clampNonNegative(requestedQuantity), remaining))
}

// Total cost of a bulk purchase: the fixed per-unit price (see getTierCost, independent of
// blockSize) times however many units the purchase is capped to (see getTierBulkQuantity) — so
// buying an entire level (requestedQuantity >= blockSize) costs per-unit price * blockSize, the
// level's total price at the block size in effect right now.
export const getTierQuantityCost = (tier, level, blockSize, levelProgress, requestedQuantity) =>
  getTierCost(tier, level) * getTierBulkQuantity(blockSize, levelProgress, requestedQuantity)

// How many units are actually affordable: capped by the level boundary (getTierBulkQuantity)
// and further capped by what `spendable` can pay for at the flat per-unit price. This is what
// buyTierQuantity will actually purchase (it stops as soon as a unit becomes unaffordable), so
// UI previews should use this rather than getTierBulkQuantity alone.
export const getTierAffordableQuantity = (tier, level, blockSize, levelProgress, spendable, requestedQuantity) => {
  const blockCapped = getTierBulkQuantity(blockSize, levelProgress, requestedQuantity)
  const unitCost = getTierCost(tier, level)
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

// Historical PP-cost formula — a tier's autobuyer no longer costs PP to unlock at all; it unlocks
// automatically at a prestige-count milestone instead (see getAutobuyerUnlockMilestone/
// applyAutobuyerMilestones below and "Autobuyer unlock" in CLAUDE.md). Kept only as the pricing
// benchmark getSmartAutobuyerCost multiplies — unchanged formula/values so Smart's own cost didn't
// shift when Unlock itself was made free: 1 PP-equivalent for the first tier, up through 10 for
// the 10th/last tier.
export const getAutobuyerUnlockCost = tierId => {
  const tierIndex = Math.max(0, TIER_DEFINITIONS.findIndex(t => t.id === tierId))
  return AUTOBUYER_UNLOCK_BASE_COST * (tierIndex + 1)
}

// Number of prestiges required before a tier's unit-buying autobuyer unlocks automatically (see
// applyAutobuyerMilestones) — no PP cost at all: tier01 unlocks after the 1st prestige, tier02
// after the 2nd, … tier10 after the 10th.
export const getAutobuyerUnlockMilestone = tierId => {
  const tierIndex = Math.max(0, TIER_DEFINITIONS.findIndex(t => t.id === tierId))
  return AUTOBUYER_UNLOCK_MILESTONE_START + tierIndex * AUTOBUYER_UNLOCK_MILESTONE_STEP
}

// Number of prestiges required before a tier's own tickspeed autobuyer unlocks automatically (see
// applyAutobuyerMilestones) — starts at TIER_TICKSPEED_AUTOBUYER_MILESTONE_START (prestige 12 for
// tier01) and adds TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP (2) per tier after that, up through
// prestige 30 for tier10. Also no PP cost.
export const getTierTickspeedAutobuyerMilestone = tierId => {
  const tierIndex = Math.max(0, TIER_DEFINITIONS.findIndex(t => t.id === tierId))
  return TIER_TICKSPEED_AUTOBUYER_MILESTONE_START + tierIndex * TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP
}

// Auto-unlocks every tier's autobuyer/tier-tickspeed-autobuyer whose milestone (see
// getAutobuyerUnlockMilestone/getTierTickspeedAutobuyerMilestone) is met by state.prestige.count —
// called from prestigeGame right after count is incremented. Never revokes an
// already-unlocked tier and returns the same state reference if nothing newly qualifies, matching
// every other engine function's no-op convention — safe to call as often as needed since
// prestige.count only ever grows.
export const applyAutobuyerMilestones = state => {
  const count = clampNonNegative(state.prestige?.count ?? 0)
  let changed = false
  const nextAutobuyers = { ...state.autobuyers }
  const nextTierTickspeedAutobuyer = { ...state.tierTickspeedAutobuyer }
  TIER_DEFINITIONS.forEach(tier => {
    if ((nextAutobuyers[tier.id] ?? null) === null && count >= getAutobuyerUnlockMilestone(tier.id)) {
      nextAutobuyers[tier.id] = 1
      changed = true
    }
    if (!nextTierTickspeedAutobuyer[tier.id] && count >= getTierTickspeedAutobuyerMilestone(tier.id)) {
      nextTierTickspeedAutobuyer[tier.id] = true
      changed = true
    }
  })
  if (!changed) return state
  return { ...state, autobuyers: nextAutobuyers, tierTickspeedAutobuyer: nextTierTickspeedAutobuyer }
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

// Money (Bits) cost to activate (null → 1) or upgrade (level N → N+1) the global tickspeed
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
// buying this global track directly grants its effect — every REGULAR level compounds
// GLOBAL_TICKSPEED_PRODUCTION_STEP (1%), except a milestone level (see countGlobalTickspeedMilestones
// above) compounds GLOBAL_TICKSPEED_MILESTONE_STEP (10%) instead, for that one level only — still
// fully multiplicative, not additive. `null` (never bought) is treated as level 0, i.e. no bonus at
// all (×1), regardless of overclockCount — there's no level for a boosted step to compound over yet.
// `overclockCount` (see getOverclockMultiplier/"Overclock" in docs/ECONOMY_REFERENCE.md) permanently
// raises BOTH the regular and milestone steps here, multiplicatively — each claimed Overclock level
// multiplies both steps by getOverclockMultiplier's own (1 + OVERCLOCK_MULTIPLIER_STEP) factor, so a
// level already bought before a claim retroactively compounds at the new, higher rate from then on,
// same as every other level. Defaults to 0 so existing callers that haven't been updated to pass it
// still get the pre-Overclock baseline rate rather than throwing — but every real call site in this
// codebase passes it explicitly.
export const getGlobalTickspeedProductionMultiplier = (level, overclockCount = 0) => {
  const lvl = clampNonNegative(level ?? 0)
  const milestoneLevels = countGlobalTickspeedMilestones(lvl)
  const regularLevels = lvl - milestoneLevels
  const overclockFactor = getOverclockMultiplier(overclockCount)
  const regularStep = GLOBAL_TICKSPEED_PRODUCTION_STEP * overclockFactor
  const milestoneStep = GLOBAL_TICKSPEED_MILESTONE_STEP * overclockFactor
  return (1 + regularStep) ** regularLevels * (1 + milestoneStep) ** milestoneLevels
}

// Whether the last tier's Money-funded tickspeed multiplier is currently replaced by the
// XP-funded one (see getLastTierXpTickspeedMultiplier/consumeXpForLastTierTickspeed) — a live
// check against the last tier's current owned count reaching one full level's worth
// (getPurchaseBlockSize(state)) — a lighter-weight threshold than isTierUnlocked's own two-level
// requirement for the tier below it, since this gates an XP bonus rather than revealing a new
// tier. Deliberately live, not a permanent latch: a Prestige/Speed Up resets the last tier's owned count back to 0 along
// with every other tier's (and also resets lastTierXpConsumed/prestige.xp to 0 — see prestigeGame/
// speedUpGame), and this mechanic should revert to the Money-funded multiplier along with it
// rather than staying engaged on a tier the player no longer actually has a full level of —
// re-buying back up to a full level re-engages it, from the fresh (0) lastTierXpConsumed
// baseline a Prestige/Speed Up left behind.
export const isLastTierTickspeedXpUnlocked = state => (state.owned?.[getLastTierId()] ?? 0) >= getPurchaseBlockSize(state)

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
// all. Spending points (see buySmartAutobuyer/buyAutoPrestige/etc.) reduces the points available
// to this formula in exchange for permanent automation.
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

  const latched = latchComputeFlopsPageUnlocked(state)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - PRESTIGE_SPEED_BONUS_UNLOCK_COST },
    prestigeSpeedBonusUnlocked: true,
  }
}

// --- PP Compute (Flops) screen --- see COMPUTE_FLOPS_* in layers.js

export const isComputeFlopsPageRevealed = state =>
  Boolean(state.computeFlops?.pageUnlocked)
  || clampNonNegative(state.prestige?.points ?? 0) >= COMPUTE_FLOPS_REVEAL_PP

export const latchComputeFlopsPageUnlocked = state => {
  if (state.computeFlops?.pageUnlocked) return state
  if (clampNonNegative(state.prestige?.points ?? 0) < COMPUTE_FLOPS_REVEAL_PP) return state
  return {
    ...state,
    computeFlops: { ...state.computeFlops, pageUnlocked: true },
  }
}

export const getComputeFlopsTierCost = (flopTier, ownedCount = 0) => {
  const level = clampNonNegative(ownedCount) + 1
  return getTierCost({ baseCost: flopTier.baseCostPP }, level)
}

export const canBuyComputeFlopsTier = (state, flopId) => {
  const flopTier = COMPUTE_FLOPS_TIER_DEFINITIONS.find(t => t.id === flopId)
  if (!flopTier) return false
  const owned = clampNonNegative(state.computeFlops?.owned?.[flopId] ?? 0)
  const cost = getComputeFlopsTierCost(flopTier, owned)
  return clampNonNegative(state.prestige?.points ?? 0) >= cost
}

export const buyComputeFlopsTier = flopId => state => {
  const flopTier = COMPUTE_FLOPS_TIER_DEFINITIONS.find(t => t.id === flopId)
  if (!flopTier) return state
  if (!canBuyComputeFlopsTier(state, flopId)) return state
  const latched = latchComputeFlopsPageUnlocked(state)
  const owned = clampNonNegative(latched.computeFlops?.owned?.[flopId] ?? 0)
  const cost = getComputeFlopsTierCost(flopTier, owned)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - cost },
    computeFlops: {
      ...latched.computeFlops,
      owned: {
        ...latched.computeFlops.owned,
        [flopId]: clampNonNegative((latched.computeFlops.owned[flopId] ?? 0) + 1),
      },
    },
  }
}

export const getComputeFlopsTierWeight = tierIndex => 10 ** clampNonNegative(tierIndex)

// Cumulative Flops display: E = k + 10M + 100G + 1000T + … + 10^9Q — each tier's
// cumulativeBoost on its matching Ladder tier, weighted by 10^tierIndex (K=10^0 … Q=10^9).
export const getComputeFlopsTotal = state =>
  COMPUTE_FLOPS_TIER_DEFINITIONS.reduce((sum, flopTier, tierIndex) => {
    const boost = clampNonNegative(state.computeFlops?.cumulativeBoost?.[flopTier.boostsTierId] ?? 0)
    return sum + boost * getComputeFlopsTierWeight(tierIndex)
  }, 0)

// Permanent hyperscaler Flops boost rate (0.01%/s each at base; +efficiency levels) — never resets
// on ordinary Prestige; persists across Era ascension. Added to every Ladder tier's Flops multiplier.
export const getHyperscalerFlopsBoostRate = state => {
  const count = clampNonNegative(state.hyperscalerCount ?? 0)
  if (count <= 0) return 0
  const efficiencyLevel = clampNonNegative(state.eonsUpgrades?.hyperscalerEfficiencyLevel ?? 0)
  const ratePerHyperscaler = COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC
    + efficiencyLevel * HYPERSCALER_EFFICIENCY_RATE_BONUS_PER_LEVEL
  return count * ratePerHyperscaler
}

export const getComputeFlopsTierProductionMultiplier = (state, tierId) =>
  1 + clampNonNegative(state.computeFlops?.cumulativeBoost?.[tierId] ?? 0) + getHyperscalerFlopsBoostRate(state)

export const formatComputeFlopsBoost = value => {
  const safe = clampNonNegative(value)
  if (safe === 0) return '0 Flops'
  const pct = safe * 100
  if (pct >= 100) return `${formatAmount(safe)} Flops (+${formatAmount(pct)}%)`
  if (pct >= 0.01) return `${formatAmount(safe)} Flops (+${pct.toFixed(2)}%)`
  return `${formatAmount(safe)} Flops (+${pct.toExponential(2)}%)`
}

export const formatComputeFlopsTotal = value => {
  const safe = clampNonNegative(value)
  if (safe === 0) return '0 Flops'
  return `${formatAmount(safe)} Flops`
}

export const tickComputeFlops = elapsedSeconds => state => {
  if (elapsedSeconds <= 0) return latchComputeFlopsPageUnlocked(state)
  const latched = latchComputeFlopsPageUnlocked(state)
  const owned = latched.computeFlops?.owned ?? {}
  let changed = false
  const cumulativeBoost = { ...latched.computeFlops.cumulativeBoost }
  COMPUTE_FLOPS_TIER_DEFINITIONS.forEach(flopTier => {
    const count = clampNonNegative(owned[flopTier.id] ?? 0)
    if (count <= 0) return
    const delta = count * COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC * elapsedSeconds
    if (delta <= 0) return
    const tierId = flopTier.boostsTierId
    cumulativeBoost[tierId] = clampNonNegative((cumulativeBoost[tierId] ?? 0) + delta)
    changed = true
  })
  if (!changed) return latched
  return {
    ...latched,
    computeFlops: { ...latched.computeFlops, cumulativeBoost },
  }
}

// --- Era / Eons meta layer (#407) ---

export const isEraEligible = state =>
  clampNonNegative(state.prestige?.points ?? 0) >= ERA_ELIGIBILITY_PP

export const getEonsAwarded = state => {
  const amplifierLevel = clampNonNegative(state.eonsUpgrades?.eonAmplifierLevel ?? 0)
  return 1 + amplifierLevel * EON_AMPLIFIER_AWARD_PER_LEVEL
}

export const getHyperscalerEonCost = ownedCount =>
  HYPERSCALER_EON_COST_BASE * (HYPERSCALER_EON_COST_MULTIPLIER ** clampNonNegative(ownedCount))

export const canBuyHyperscaler = state =>
  clampNonNegative(state.eons?.balance ?? 0) >= getHyperscalerEonCost(state.hyperscalerCount ?? 0)

export const buyHyperscaler = state => {
  if (!canBuyHyperscaler(state)) return state
  const cost = getHyperscalerEonCost(state.hyperscalerCount ?? 0)
  return {
    ...state,
    eons: { ...state.eons, balance: clampNonNegative(state.eons.balance) - cost },
    hyperscalerCount: clampNonNegative(state.hyperscalerCount ?? 0) + 1,
  }
}

export const getFlopsAutobuyerUnlockEra = flopId => {
  const tierIndex = Math.max(0, COMPUTE_FLOPS_TIER_DEFINITIONS.findIndex(t => t.id === flopId))
  return FLOPS_AUTOBUYER_ERA_START + tierIndex * FLOPS_AUTOBUYER_ERA_STEP
}

export const applyFlopsAutobuyerMilestones = state => {
  const eraCount = clampNonNegative(state.era?.count ?? 0)
  let changed = false
  const nextAutobuyers = { ...state.computeFlopsAutobuyers }
  COMPUTE_FLOPS_TIER_DEFINITIONS.forEach(flopTier => {
    if ((nextAutobuyers[flopTier.id] ?? null) === null && eraCount >= getFlopsAutobuyerUnlockEra(flopTier.id)) {
      nextAutobuyers[flopTier.id] = 1
      changed = true
    }
  })
  if (!changed) return state
  return { ...state, computeFlopsAutobuyers: nextAutobuyers }
}

export const setComputeFlopsAutobuyerEnabled = (flopId, enabled) => state => {
  if (!COMPUTE_FLOPS_TIER_DEFINITIONS.some(t => t.id === flopId)) return state
  if ((state.computeFlopsAutobuyers?.[flopId] ?? null) === null) return state
  return {
    ...state,
    computeFlopsAutobuyersEnabled: {
      ...state.computeFlopsAutobuyersEnabled,
      [flopId]: enabled,
    },
  }
}

const tickComputeFlopsAutobuyers = elapsedSeconds => state => {
  if (elapsedSeconds <= 0) return state
  let result = state
  COMPUTE_FLOPS_TIER_DEFINITIONS.forEach(flopTier => {
    if ((result.computeFlopsAutobuyers?.[flopTier.id] ?? null) === null) return
    if (!(result.computeFlopsAutobuyersEnabled?.[flopTier.id] ?? true)) return
    let budget = (result.computeFlopsAutobuyerAttemptBudgets?.[flopTier.id] ?? 0) + elapsedSeconds
    while (budget >= 1 - TICK_ACCUMULATION_EPSILON) {
      if (!canBuyComputeFlopsTier(result, flopTier.id)) break
      const next = buyComputeFlopsTier(flopTier.id)(result)
      if (next === result) break
      result = next
      budget -= 1
    }
    result = {
      ...result,
      computeFlopsAutobuyerAttemptBudgets: {
        ...result.computeFlopsAutobuyerAttemptBudgets,
        [flopTier.id]: budget,
      },
    }
  })
  return result
}

const buildEraIntroReset = (state, initial) => ({
  ...initial.intro,
  byteCreated: Boolean(state.intro?.byteCreated),
  bits: 0,
  productionAccumulator: 0,
  mainGameUnlocked: false,
  foundryResetCaps: {},
  autoMergeCoresIntoNode: state.intro?.autoMergeCoresIntoNode ?? initial.intro.autoMergeCoresIntoNode,
  autoMergeNodesIntoCluster: state.intro?.autoMergeNodesIntoCluster ?? initial.intro.autoMergeNodesIntoCluster,
  autoMergeClustersIntoNetwork: state.intro?.autoMergeClustersIntoNetwork ?? initial.intro.autoMergeClustersIntoNetwork,
  autoMergeNetworksIntoGrid: state.intro?.autoMergeNetworksIntoGrid ?? initial.intro.autoMergeNetworksIntoGrid,
  autoMergeGridsIntoFabric: state.intro?.autoMergeGridsIntoFabric ?? initial.intro.autoMergeGridsIntoFabric,
  autoMergeFabricsIntoCloud: state.intro?.autoMergeFabricsIntoCloud ?? initial.intro.autoMergeFabricsIntoCloud,
  autoMergeCloudsIntoDatacenter: state.intro?.autoMergeCloudsIntoDatacenter ?? initial.intro.autoMergeCloudsIntoDatacenter,
  autoMergeDatacentersIntoSupercomputer: state.intro?.autoMergeDatacentersIntoSupercomputer ?? initial.intro.autoMergeDatacentersIntoSupercomputer,
  autoMergeSupercomputersIntoMegacomputer: state.intro?.autoMergeSupercomputersIntoMegacomputer ?? initial.intro.autoMergeSupercomputersIntoMegacomputer,
  computeMergeDurationUpgrades: state.intro?.computeMergeDurationUpgrades ?? initial.intro.computeMergeDurationUpgrades,
  computeMergePageUnlocked: state.intro?.computeMergePageUnlocked ?? initial.intro.computeMergePageUnlocked,
  computeAutoBoostType: state.intro?.computeAutoBoostType ?? initial.intro.computeAutoBoostType,
})

export const eraGame = state => {
  if (!isEraEligible(state)) return state

  const initial = createInitialGameState()
  const eonsAwarded = getEonsAwarded(state)
  const nextEraCount = clampNonNegative(state.era?.count ?? 0) + 1
  const unboundedUnlocked = Boolean(state.prestige?.unboundedUnlocked)
    || clampNonNegative(state.prestige?.count ?? 0) >= PRESTIGE_UNBOUNDED_MIN_COUNT

  const base = {
    ...initial,
    prestigeMuseum: state.prestigeMuseum ?? initial.prestigeMuseum,
    intro: buildEraIntroReset(state, initial),
    autobuyers: state.autobuyers ?? initial.autobuyers,
    autobuyersEnabled: state.autobuyersEnabled ?? initial.autobuyersEnabled,
    smartAutobuyer: state.smartAutobuyer ?? initial.smartAutobuyer,
    tierTickspeedAutobuyer: state.tierTickspeedAutobuyer ?? initial.tierTickspeedAutobuyer,
    tierTickspeedAutobuyerEnabled: state.tierTickspeedAutobuyerEnabled ?? initial.tierTickspeedAutobuyerEnabled,
    autoPrestige: state.autoPrestige ?? initial.autoPrestige,
    autoPrestigeEnabled: state.autoPrestigeEnabled ?? initial.autoPrestigeEnabled,
    autoPrestigeAutobuyer: state.autoPrestigeAutobuyer ?? initial.autoPrestigeAutobuyer,
    autoPrestigeAutobuyerEnabled: state.autoPrestigeAutobuyerEnabled ?? initial.autoPrestigeAutobuyerEnabled,
    prestigeSpeedBonusUnlocked: state.prestigeSpeedBonusUnlocked ?? initial.prestigeSpeedBonusUnlocked,
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoSpeedUpEnabled: state.autoSpeedUpEnabled ?? initial.autoSpeedUpEnabled,
    computeAutoBoostUnlocked: state.computeAutoBoostUnlocked ?? initial.computeAutoBoostUnlocked,
    autoGlobalTickspeed: state.autoGlobalTickspeed ?? initial.autoGlobalTickspeed,
    autoGlobalTickspeedEnabled: state.autoGlobalTickspeedEnabled ?? initial.autoGlobalTickspeedEnabled,
    computeFlops: {
      pageUnlocked: Boolean(state.computeFlops?.pageUnlocked),
      owned: initial.computeFlops.owned,
      cumulativeBoost: initial.computeFlops.cumulativeBoost,
    },
    computeFlopsAutobuyers: state.computeFlopsAutobuyers ?? initial.computeFlopsAutobuyers,
    computeFlopsAutobuyersEnabled: state.computeFlopsAutobuyersEnabled ?? initial.computeFlopsAutobuyersEnabled,
    computeFlopsAutobuyerAttemptBudgets: initial.computeFlopsAutobuyerAttemptBudgets,
    era: { count: nextEraCount },
    eons: { balance: clampNonNegative(state.eons?.balance ?? 0) + eonsAwarded },
    hyperscalerCount: clampNonNegative(state.hyperscalerCount ?? 0),
    eonsUpgrades: state.eonsUpgrades ?? initial.eonsUpgrades,
    prestige: {
      ...initial.prestige,
      unboundedUnlocked,
      points: 0,
      count: 0,
    },
    prestigeDoublePpLevel: initial.prestigeDoublePpLevel,
  }

  return applyFlopsAutobuyerMilestones(base)
}

// Leveled PP upgrade: each purchase halves powers-per-PP until 1, then doubles PP-per-power
// (see getPrestigePowersPerPp/getPrestigePpPerPower). Cost is 100^(level+1) PP. Not blocked by
// production freeze — buying before an optional Prestige is the point. Permanent once bought.
export const buyPrestigeDoublePp = state => {
  const currentLevel = state.prestigeDoublePpLevel ?? 0
  const cost = getPrestigeDoublePpUpgradeCost(currentLevel)
  if (clampNonNegative(state.prestige.points) < cost) return state

  const latched = latchComputeFlopsPageUnlocked(state)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - cost },
    prestigeDoublePpLevel: currentLevel + 1,
  }
}

// PP cost to permanently make a tier's autobuyer "smart" (see buySmartAutobuyer) —
// SMART_AUTOBUYER_COST_MULTIPLIER times the cost of unlocking that same tier's autobuyer
// (getAutobuyerUnlockCost), since it's a separate, more powerful capability bought after unlock.
export const getSmartAutobuyerCost = tierId =>
  SMART_AUTOBUYER_COST_MULTIPLIER * getAutobuyerUnlockCost(tierId)

// Production doubles every time a tier completes another level — the same boundary where
// getTierCost's cost-epoch exponent steps up, so completing a fresh level always pays off with
// production alongside the steeper price. But every 10th level is a bigger milestone: that one
// level contributes PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE (10x) instead of the regular
// PURCHASE_MILESTONE_MULTIPLIER_BASE (2x), compounding into every other level's factor —
// levelsCompleted = level - 1; megaBlocks = floor(levelsCompleted/10); multiplier =
// PURCHASE_MILESTONE_MULTIPLIER_BASE^(levelsCompleted-megaBlocks) *
// PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE^megaBlocks. This "every 10th level" mega cadence is
// independent of the (now variable) block size — it stays a fixed 10, regardless of how many
// purchases make up one level. Applies to every tier uniformly, regardless of whether the
// purchases were manual or automatic. Takes the tier's current LEVEL directly (see
// state.purchaseLevels), not a lifetime purchased count.
export const getPurchaseMilestoneMultiplier = level => {
  const levelsCompleted = Math.max(0, clampNonNegative(level) - 1)
  const megaBlocks = Math.floor(levelsCompleted / 10)
  const regularBlocks = levelsCompleted - megaBlocks
  return PURCHASE_MILESTONE_MULTIPLIER_BASE ** regularBlocks * PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE ** megaBlocks
}

// The unconditional production-speed multiplier from Speed Up activations (see speedUpGame):
// SPEED_UP_MULTIPLIER_BASE raised to speedUpCount, so each activation doubles it (1x, 2x, 4x,
// 8x, …). Unlike getPrestigeProductionMultiplier, this needs no unlock purchase — it applies
// automatically as soon as speedUpCount > 0.
export const getSpeedUpMultiplier = speedUpCount =>
  SPEED_UP_MULTIPLIER_BASE ** clampNonNegative(speedUpCount)

// The last tier's LEVEL the *next* Speed Up requires: one more level than the last time — level 6
// (displayed level 5, see MainPage's -1 display offset) for the first activation (speedUpCount 0),
// level 7 (displayed 6) for the second, and so on (speedUpCount + 6). Expressed as a level target
// rather than a lifetime-purchased-count threshold (as it was before block size became variable —
// see docs/DESIGN_HISTORY.md): how many purchases a given level boundary corresponds to now depends
// on the current (possibly grown) block size (see getPurchaseBlockSize), while the level number
// itself doesn't, so a level target stays meaningful regardless of how block size has grown.
export const getSpeedUpRequirement = speedUpCount =>
  clampNonNegative(speedUpCount) + 6

// The last tier's LEVEL the *next* Overclock level requires: level 2 for the first claim
// (overclockCount 0), level 3 for the second, and so on — overclockCount * OVERCLOCK_REQUIREMENT_STEP
// + 2, with OVERCLOCK_REQUIREMENT_STEP = 1. The +2 floor (not +1/+0) is deliberate: every tier's
// purchaseLevels starts at 1 (the tier's own un-purchased default — see createInitialGameState), so
// a requirement of exactly 1 would already be satisfied by a completely untouched last tier, making
// the first Overclock claim of every cycle free. Requiring level 2 means the last tier's own already-
// steep cost curve has to demand at least one real level of progress before Overclock is claimable —
// the same reasoning getSpeedUpRequirement's own floor bump above just applied to Speed Up. Beyond
// that floor, each further claim needs one more level than the last, same +1-per-cycle shape as
// getSpeedUpRequirement, just without its display offset. Expressed as a level target against
// state.purchaseLevels[lastTierId] directly (no "completed blocks" display offset the way Speed
// Up's own requirement gets — see docs/MAINPAGE_REFERENCE.md), so the number shown to the player
// matches the same raw level number the last tier's own Details disclosure already shows.
export const getOverclockRequirement = overclockCount =>
  clampNonNegative(overclockCount) * OVERCLOCK_REQUIREMENT_STEP + 2

// Overclock's own growth factor: compounds OVERCLOCK_MULTIPLIER_STEP (10%, i.e. ×1.1) per claimed
// level. Folded directly into getGlobalTickspeedProductionMultiplier above — it multiplies BOTH the
// (Money-funded) global tickspeed multiplier's regular and milestone per-level steps, so Overclock
// still has zero effect while that track itself is at level 0/not yet bought (there's no level for
// the boosted step to compound over yet), same as before Overclock existed.
export const getOverclockMultiplier = overclockCount =>
  (1 + OVERCLOCK_MULTIPLIER_STEP) ** clampNonNegative(overclockCount)

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

// Once Money reaches PRESTIGE_THRESHOLD ("1 Googol Bytes," expressed in Bits — see layers.js), all
// production and purchasing (manual and automatic) freezes — the only action left is to Prestige —
// unless the player has prestiged at least PRESTIGE_UNBOUNDED_MIN_COUNT times, in which case
// production continues and Prestige is optional (see isUnboundedPrestigeUnlocked). Exported so the
// UI can drive the same gate (disabling every other control) that the engine itself enforces on
// tickGame/buyTier/buyAutobuyer below.
export const isUnboundedPrestigeUnlocked = state =>
  Boolean(state.prestige?.unboundedUnlocked)
  || clampNonNegative(state.prestige?.count ?? 0) >= PRESTIGE_UNBOUNDED_MIN_COUNT

export const isProductionFrozen = state =>
  !isUnboundedPrestigeUnlocked(state) && clampNonNegative(state.resources[MONEY_ID]) >= PRESTIGE_THRESHOLD

// The previous tier's LEVEL that "two fully purchased levels" corresponds to: completing level 1
// advances purchaseLevels from 1 to 2, and completing level 2 advances it from 2 to 3 — so a tier
// below at level >= 3 has fully purchased two levels. Expressed as a level target (like
// getSpeedUpRequirement/getOverclockRequirement) rather than an owned-count threshold, so it stays
// exact even in the rare case the (state-global) purchase block size grows between the previous
// tier's level 1 and level 2 completions.
const TIER_UNLOCK_PREV_LEVEL_REQUIREMENT = 3

// First tier is always unlocked; each subsequent tier unlocks once the tier below has fully
// purchased two levels (reached purchaseLevels >= TIER_UNLOCK_PREV_LEVEL_REQUIREMENT — see above).
// Already-owned tiers stay unlocked so older saves remain playable after rule changes; a tier that
// has ever satisfied this live condition also stays unlocked forever via the permanent
// everUnlockedTierIds flag (see latchEverUnlockedTiers), even if `owned`/`purchaseLevels` is later
// reset by something narrower than a full Prestige/Speed Up (see consumeXpForLastTierTickspeed).
export const isTierUnlocked = state => tier => {
  const tierIndex = TIER_DEFINITIONS.findIndex(t => t.id === tier.id)
  if (tierIndex === 0) return true
  if (state.everUnlockedTierIds?.[tier.id]) return true
  if ((state.owned[tier.id] ?? 0) > 0) return true
  const prevTier = TIER_DEFINITIONS[tierIndex - 1]
  return (state.purchaseLevels?.[prevTier.id] ?? 1) >= TIER_UNLOCK_PREV_LEVEL_REQUIREMENT
}

// Latches everUnlockedTierIds permanently true for any tier whose isTierUnlocked live condition
// (own owned > 0, or the previous tier having fully purchased two levels) is currently satisfied
// but not yet flagged — called from buyTier and tickGame right after `owned`/`purchaseLevels`
// changes, so the flag catches up the same tick/purchase a tier first becomes reachable. Returns
// the same state reference if nothing newly qualifies (the common case), matching every other
// engine function's no-op convention.
const latchEverUnlockedTiers = state => {
  const previous = state.everUnlockedTierIds ?? {}
  let changed = false
  const next = { ...previous }
  TIER_DEFINITIONS.forEach((tier, index) => {
    if (index === 0 || next[tier.id]) return
    const prevTier = TIER_DEFINITIONS[index - 1]
    if ((state.owned[tier.id] ?? 0) > 0 || (state.purchaseLevels?.[prevTier.id] ?? 1) >= TIER_UNLOCK_PREV_LEVEL_REQUIREMENT) {
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

// Progress (0–1) toward the next power-of-ten Bytes threshold, measured in Bits.
// Money is stored in Bits; dividing by BITS_PER_BYTE yields whole Bytes, then the next 10^n
// Bytes ceiling is the target. Equivalent to (currentBits) / (nextPowerBytes * BITS_PER_BYTE).
// MainPage renders this as BITS_PER_BYTE (8) visual segments of 12.5% each — e.g. 5e7 Bytes
// (= 4e8 Bits) → next 1e8 Bytes (= 8e8 Bits) → 0.5 → four of eight segments filled.
export const getNextBytePowerProgressFraction = moneyBits => {
  const safeBits = clampNonNegative(moneyBits)
  if (safeBits <= 0) return 0
  const bytes = safeBits / BITS_PER_BYTE
  const nextPowerBytes = 10 ** (Math.floor(Math.log10(bytes)) + 1)
  if (!Number.isFinite(nextPowerBytes) || nextPowerBytes <= 0) return 0
  return Math.min(1, bytes / nextPowerBytes)
}

// A tier's actual production period after both tickspeed multipliers shrink it (see "Tier
// production tickspeed" in CLAUDE.md) — the per-tier tickspeed level and the global tickspeed
// multiplier both speed up how *often* a tier delivers a batch, not how much lands each time (see
// "Tickspeed multiplier"/"The global tickspeed multiplier" below), so both divide the tier's own
// getTierBaseTickSpeedSeconds instead of multiplying its production. Overclock has no separate
// third factor here — its effect is already folded into globalTickspeedMultiplier itself, via
// getGlobalTickspeedProductionMultiplier's own overclockCount parameter (see "Overclock" below).
// Always >= 1 in practice (both multipliers here are always >= 1), so this only ever shrinks
// (never grows) the base period.
export const getEffectiveTierTickSpeedSeconds = (state, tierId) => {
  const tickspeedMultiplier = tierId === getLastTierId() && isLastTierTickspeedXpUnlocked(state)
    ? getLastTierXpTickspeedMultiplier(state.lastTierXpConsumed ?? 0)
    : getTickspeedProductionMultiplier(state.tickspeedLevels?.[tierId] ?? 1)
  const globalTickspeedMultiplier = getGlobalTickspeedProductionMultiplier(state.globalTickspeedMultiplier ?? null, state.overclockCount ?? 0)
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
// (TICK_RATE_MS / 1000). Not currently called from MainPage — the per-tier tick-progress ring
// that once consumed this was removed (every tier's tickspeed being unified at 1s made all ten
// rings sweep in unison and carry no information); kept here with its own unit tests for a future
// consumer that needs sub-tick production progress.
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

// How many Prestige Points a prestige action awards at the current money balance, given how many
// Double PP upgrades have been bought. Requires at least PRESTIGE_THRESHOLD money (1 Googol
// Bytes) — below that, returns 0. At exactly Googol-scale money the award is always at least 1 PP
// (× getPrestigePpPerPower when past the halving phase). Beyond Googol, each additional block of
// getPrestigePowersPerPp money-exponent "powers" adds another PP unit, scaled by getPrestigePpPerPower.
export const getPrestigeDoublePpHalvingLevels = () => Math.log2(PRESTIGE_POWERS_PER_PP_BASE)

export const getPrestigePowersPerPp = (doublePpLevel = 0) => {
  const level = clampNonNegative(doublePpLevel)
  const halvingLevels = Math.min(level, getPrestigeDoublePpHalvingLevels())
  return PRESTIGE_POWERS_PER_PP_BASE / (2 ** halvingLevels)
}

export const getPrestigePpPerPower = (doublePpLevel = 0) => {
  const level = clampNonNegative(doublePpLevel)
  const halvingCap = getPrestigeDoublePpHalvingLevels()
  return level > halvingCap ? 2 ** (level - halvingCap) : 1
}

export const getPrestigeDoublePpUpgradeCost = (currentLevel = 0) =>
  PRESTIGE_DOUBLE_PP_UPGRADE_COST_BASE ** (clampNonNegative(currentLevel) + 1)

export const getPrestigePointsAwarded = (money, doublePpLevel = 0) => {
  const safeMoney = clampNonNegative(money)
  if (safeMoney < PRESTIGE_THRESHOLD) return 0

  const googolExponent = Math.floor(Math.log10(GOOGOL))
  const excessPowers = Math.max(0, getMoneyExponent(safeMoney) - googolExponent)
  const powersPerPp = getPrestigePowersPerPp(doublePpLevel)
  const ppPerPower = getPrestigePpPerPower(doublePpLevel)
  const units = 1 + Math.floor(excessPowers / powersPerPp)
  return units * ppPerPower
}

// Progress (0–100) toward the next PP-earning step once Googol-scale money is reached — within
// the current powers-per-PP block. Below Googol, falls back to getPrestigeProgressPercent.
export const getPrestigePpEarnProgressPercent = (money, doublePpLevel = 0) => {
  const safeMoney = clampNonNegative(money)
  const googolExponent = Math.floor(Math.log10(GOOGOL))
  const moneyExponent = getMoneyExponent(safeMoney)
  if (moneyExponent < googolExponent) return getPrestigeProgressPercent(safeMoney)

  const excessPowers = moneyExponent - googolExponent
  const powersPerPp = getPrestigePowersPerPp(doublePpLevel)
  const remainder = excessPowers % powersPerPp
  return Math.round((remainder / powersPerPp) * 100)
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
// this with an effective batch size of 1 while still on its very first level (tier level === 1) —
// otherwise a tier that's never been manually bought can never afford autobuyerBatchSize's full
// first level (0 owned generators produce $0 income, and the starting balance only ever covers
// 1 unit) and stalls forever — then reverts to the normal autobuyerBatchSize from its second
// level onward.
export const tickGame = (elapsedSeconds, autobuyerBatchSize = 1) => state => {
  // The Byte Foundry intro runs first, every tick: passive production, then any in-progress disk
  // array build counts down (tickDiskBuild — unconditional, bypasses nothing), then Storage's own
  // auto-fill (Memory -> each array's cache -> empty disks) gets first claim on the resulting
  // Memory balance, ahead of tickIntroAutoInvest's own direct bit-to-Kilobyte conversion —
  // otherwise a disk the player has already built and is waiting to fill would be starved by fresh
  // Memory being auto-converted out from under it before it ever reached the disk. Auto-fill
  // doesn't depend on tier01's level at all (unlike auto-redeem below), so running it this early
  // costs nothing.
  //
  // Core -> Node is no longer automatic/unconditional (see issue #321) — it's just the first
  // boundary in AUTO_MERGE_TICKERS below, same as every other tier boundary. Compute Cores
  // themselves are no longer minted from Memory at all — they're bought with Data Lake deposits
  // and live Disk transfers (see startBoosterTransfer/tickDataLakeTransfers, called earlier this
  // same tick), unrelated to Storage or this tick pipeline entirely.
  // tickIntroAutoInvest then converts whatever Memory is left over. tickIntroProduction short-circuits to the
  // same-reference no-op once !byteCreated, and tickIntroAutoInvest once bits can't cover even one
  // more unit (their own first-line guards); none of these ever fully freeze, matching the "return
  // the same reference so React can bail out" convention every other no-op path in this function
  // already follows.
  const stateAfterDiskBuild = tickDiskBuild(elapsedSeconds)(tickIntroProduction(elapsedSeconds)(state))
  // Queued Capacity fires as soon as Memory is full (after production/build countdown), before
  // Disk auto-fill can spend that full bar — see tickQueuedCapacityUpgrade.
  const stateAfterQueuedCapacity = tickQueuedCapacityUpgrade(stateAfterDiskBuild)
  // First pass advances in-flight read-cache flushes (and may complete them) so write-cache
  // collect can claim newly emptied source slots same tick. Second pass uses 0 elapsed so
  // flush countdowns are not applied twice per tickGame — it only refills / starts new flushes
  // after write-cache ripple.
  const stateAfterReadCache = tickDiskAutoFill(elapsedSeconds)(stateAfterQueuedCapacity)
  const stateAfterWriteCache = tickDiskWriteCache(elapsedSeconds)(stateAfterReadCache)
  const stateAfterStorage = tickDiskAutoFill(0)(stateAfterWriteCache)
  // After a Foundry reset, auto-press Combine / Invest / Disk Build / Capacity (Sacrifice) up to
  // foundryResetCaps.
  const stateAfterFoundryConvenience = tickFoundryResetConvenience(stateAfterStorage)
  // Counts down any in-flight Data Lake Booster transfers (see startBoosterTransfer/
  // tickDataLakeTransfers), granting Compute Cores/Nodes/… as they complete — ahead of
  // AUTO_MERGE_TICKERS below so a Core a transfer completes this very tick can still cascade
  // upward through an already-unlocked auto-merge chain in the same tick.
  const stateAfterDataLakeTransfers = tickDataLakeTransfers(elapsedSeconds)(stateAfterFoundryConvenience)
  // Every tier boundary (Core->Node through Supercomputer->Megacomputer) fires here, lowest tier
  // first so a single tick can cascade upward through every unlocked step in a row — see
  // AUTO_MERGE_TICKERS and issue #321. Each ticker both auto-starts a reserve merge (once that
  // boundary's input is completely full) and counts down any merge already in flight.
  const stateAfterAutoMerges = AUTO_MERGE_TICKERS.reduce((tickState, tick) => tick(elapsedSeconds)(tickState), stateAfterDataLakeTransfers)
  // Counts an active Compute Boost's remaining duration down, then optionally auto-activates or
  // stacks from a full compute-ladder tier while a reserve merge is in flight (see
  // tickAutoComputeBoost) — countdown first so an expired boost can be replaced the same tick.
  const stateAfterComputeBoost = tickAutoComputeBoost(tickComputeBoost(elapsedSeconds)(stateAfterAutoMerges))
  const stateAfterIntro = tickIntroAutoInvest(stateAfterComputeBoost)
  const stateAfterFlops = tickComputeFlopsAutobuyers(elapsedSeconds)(
    tickComputeFlops(elapsedSeconds)(stateAfterIntro),
  )

  const autoPrestigeLevel = stateAfterFlops.autoPrestige ?? null
  // Paused (see setAutoPrestigeEnabled/CLAUDE.md's "pause/resume" bullet) is treated exactly like
  // "never bought" for every automation purpose below — the level and any PP already spent stay
  // untouched, and the manual Prestige button keeps working regardless, but tickGame itself
  // neither accumulates the attempt budget nor fires prestigeGame automatically while paused.
  const autoPrestigeActive = autoPrestigeLevel !== null && (stateAfterFlops.autoPrestigeEnabled ?? true)

  // Storage's own auto-redeem (full disks -> each one's own fixed corresponding tier, once it's at
  // the required level — see getMatchingTierForDiskSize) runs last, through every branch below,
  // against this tick's FINAL tier levels (post autobuyer/Speed Up) — isDiskRedeemable depends on
  // them, so a disk whose size only just became redeemable once its tier leveled up THIS tick still redeems the
  // same tick. Auto-fill already ran above (see stateAfterStorage / the storage pipeline), ahead of
  // tickIntroAutoInvest, since it has no such dependency on any tier's level. A same-reference
  // no-op when nothing qualifies (including whenever the matching tier's own autobuyer isn't
  // currently active — see tickDiskAutoRedeem), so calling it costs nothing when Storage isn't in
  // play at all.
  // When auto-redeem actually empties a disk, re-run tickDiskAutoFill so that size's cache can
  // start topping up ASAP the same tick (smallest→largest) — scoped to a real redeem change so a
  // no-op auto-redeem pass does not pull leftover Memory into caches ahead of Bandwidth/Invest.
  // tickDiskAutoDeposit runs right after auto-redeem: a full disk auto-feeds its pool's Data Lake
  // only once it's no longer redeemable for the main game (disks always win — see
  // tickDiskAutoDeposit's own doc comment), so redemption always gets first claim on it.
  // tickDiskAutoReleaseCache runs after that: a Smart tier's autobuyer may release cache
  // blocks into Bits only when no full redeemable disk of that size exists (disks always win).
  // Manual redeemDisk deliberately does NOT sync-fill: Forced Priority expects clearing the last
  // full disk to free Memory for Bandwidth before any further Disk Fill claim (see
  // docs/DESIGN_HISTORY.md).
  const tickStorage = state => {
    const afterRedeem = tickDiskAutoRedeem(state)
    const afterDeposit = tickDiskAutoDeposit(afterRedeem)
    const afterCache = tickDiskAutoReleaseCache(afterDeposit)
    // 0 elapsed: start any newly eligible read-cache flushes after a redeem emptied a slot;
    // countdown continues on the next ordinary tickGame pass.
    return afterCache === state ? state : tickDiskAutoFill(0)(afterCache)
  }

  // Once at/above PRESTIGE_THRESHOLD, everything freezes — no passive production, no autobuyer
  // purchases — until the player prestiges. Returning the same reference (rather than an
  // equivalent copy) lets React's setState bail out of re-rendering while frozen, same as any
  // other no-op action; that optimization only applies when Auto-Prestige isn't bought (or is
  // currently paused) at all, since its attempt budget (see below) needs to keep accumulating
  // even while otherwise frozen. Storage's own auto-fill/auto-redeem still run through every
  // branch here — like redeemDisk/convertIntroBitsToKilobytes, they pay from a separate currency
  // pool and deliberately bypass this freeze entirely, so a player who's crossed the Prestige
  // threshold but hasn't manually prestiged yet doesn't have to wait for that click to
  // fill/redeem a disk.
  if (isProductionFrozen(stateAfterFlops)) {
    if (!autoPrestigeActive) return tickStorage(stateAfterFlops)
    const nextBudget = (stateAfterFlops.autoPrestigeAttemptBudget ?? 0) + getAutoPrestigeAttemptRate(autoPrestigeLevel) * elapsedSeconds
    // A completed attempt (budget >= 1, with a small epsilon tolerance for the same repeated-
    // fractional-elapsedSeconds floating-point drift described on TICK_ACCUMULATION_EPSILON)
    // only actually prestiges once Money has reached PRESTIGE_THRESHOLD — which it already has,
    // here, by definition of this branch — so it always fires as soon as the budget crosses 1.
    // prestigeGame's own reset zeroes the budget back out; no need to pass the incremented value
    // in, it would just be discarded.
    if (nextBudget >= 1 - TICK_ACCUMULATION_EPSILON) return tickStorage(prestigeGame(stateAfterFlops))
    return tickStorage({ ...stateAfterFlops, autoPrestigeAttemptBudget: nextBudget })
  }

  // The passive PP production-speed bonus is inert until unlocked (see buyPrestigeSpeedBonus) —
  // before that, every tier produces at the flat ×1 baseline regardless of unspent PP balance.
  const multiplier = stateAfterFlops.prestigeSpeedBonusUnlocked
    ? getPrestigeProductionMultiplier(stateAfterFlops.prestige.points)
    : 1
  // Speed Up's multiplier, unlike the PP bonus above, needs no unlock step — it applies as soon
  // as speedUpCount > 0 (see getSpeedUpMultiplier/speedUpGame).
  const speedUpMultiplier = getSpeedUpMultiplier(stateAfterFlops.speedUpCount ?? 0)

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
    // Paused (see setAutobuyerEnabled) is treated exactly like "never unlocked" here — the
    // attempt-budget accumulation below is skipped entirely too, so a paused stretch banks no
    // attempts, same as tickGame's other paused automations.
    if (level === null || !isTierUnlocked(s)(tier) || !(s.autobuyersEnabled?.[tier.id] ?? true)) return s
    let result = s
    let budget = (s.autobuyerAttemptBudgets[tier.id] ?? 0) + elapsedSeconds
    // The epsilon tolerance absorbs the same repeated-fractional-elapsedSeconds floating-point
    // drift as tierProductionAccumulators (see TICK_ACCUMULATION_EPSILON) — without it, ten
    // 0.1-elapsedSeconds calls at the baseline rate sum to 0.9999999999999999, one shy of
    // triggering a purchase that should fire exactly on schedule.
    while (budget >= 1 - TICK_ACCUMULATION_EPSILON) {
      const tierLevel = result.purchaseLevels?.[tier.id] ?? 1
      const levelProgress = result.purchaseLevelProgress?.[tier.id] ?? 0
      const blockSize = getPurchaseBlockSize(result)
      const effectiveBatchSize = result.smartAutobuyer?.[tier.id] && tierLevel === 1 ? 1 : autobuyerBatchSize
      const blockMax = getTierBulkQuantity(blockSize, levelProgress, effectiveBatchSize)
      const affordable = getTierAffordableQuantity(tier, tierLevel, blockSize, levelProgress, getTierSpendableAmount(result, tier), effectiveBatchSize)
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
  }, stateAfterFlops)

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
    // (always a power of 2), tierMultiplier (always a product of powers of 2 and 10 — see
    // getPurchaseMilestoneMultiplier), and computeBoostMultiplier (always one of
    // COMPUTE_BOOST_PRESETS' own integer multipliers, or 1) are already integers, so only the
    // fractional Prestige Point production multiplier (getPrestigeProductionMultiplier, e.g. 50
    // unspent points → ×1.5) can introduce a fraction here — always >= 1, so flooring never zeroes
    // out production for a tier with owned > 0. Neither tickspeed multiplier appears in this
    // formula at all anymore — they've already done their work by shrinking tickSpeed above, which
    // is what grew ticksElapsed.
    const tierMultiplier = getPurchaseMilestoneMultiplier(stateAfterAutobuyers.purchaseLevels?.[tier.id] ?? 1)
    // A Compute Boost (see getComputeBoostMultiplier/activateComputeBoost above) only ever applies
    // to tier01 specifically — "the base production tier of each screen," Memory being the other
    // (see tickIntroProduction) — every other tier's own multiplier stays 1 regardless.
    const computeBoostMultiplier = tier.id === TIER_DEFINITIONS[0].id ? getComputeBoostMultiplier(stateAfterAutobuyers.intro) : 1
    const flopsBoostMultiplier = getComputeFlopsTierProductionMultiplier(stateAfterAutobuyers, tier.id)
    const production = Math.floor((stateAfterAutobuyers.owned[tier.id] ?? 0) * ticksElapsed * multiplier * speedUpMultiplier * tierMultiplier * computeBoostMultiplier * flopsBoostMultiplier)

    newResources[tier.producesResourceId] = clampNonNegative((newResources[tier.producesResourceId] ?? 0) + production)
    // Factory Bytes (BYTES_ID) are Clock Speed fuel and the tier-row "+N B" unit — but MoneyHero,
    // Prestige, and tier Buys still key off Bits (MONEY_ID). Mirror each Byte produced into Bits
    // at BITS_PER_BYTE so the headline balance and Prestige progress track Byte output (otherwise
    // Money freezes after #430 redirected tier01 off `base`). Disk-cache releases still add Bits
    // separately; Clock Speed still spends only the Bytes pool.
    if (tier.producesResourceId === BYTES_ID && production > 0) {
      newResources[MONEY_ID] = clampNonNegative(
        (newResources[MONEY_ID] ?? 0) + production * BITS_PER_BYTE,
      )
    }
    // If the produced resource is also a tier (generator), add to owned count — not for the
    // separate Factory Bytes pool (BYTES_ID) or other non-tier resources.
    if (TIER_DEFINITIONS.some(t => t.id === tier.producesResourceId)) {
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
    // start counting once Money first reaches PRESTIGE_THRESHOLD — but it can only ever actually fire from
    // the frozen branch above once Money has actually gotten there, or from the unbounded branch below
    // when prestige.count >= PRESTIGE_UNBOUNDED_MIN_COUNT. Paused (autoPrestigeActive
    // false) stops this accumulation too, same as the frozen branch above.
    ...(autoPrestigeActive ? {
      autoPrestigeAttemptBudget: (stateAfterAutobuyers.autoPrestigeAttemptBudget ?? 0) + getAutoPrestigeAttemptRate(autoPrestigeLevel) * elapsedSeconds,
    } : {}),
  })

  // Only a tier whose tierTickspeedAutobuyer is unlocked (see applyAutobuyerMilestones)
  // self-upgrades its own tickspeed multiplier level one step per tick whenever affordable — no
  // manual click needed. buyTickspeedMultiplier re-validates internally (affordability, frozen state, tier
  // itself unlocked) and returns the same state unchanged when a level isn't affordable yet. Unlike the
  // rate-accumulating budgets above, this is edge-triggered on affordability rather than a banked
  // rate, so it needs no elapsedSeconds scaling — calling tickGame more often (see TICK_RATE_MS)
  // only makes it react sooner after becoming affordable, not more often per real second.
  // For the last tier specifically, once isLastTierTickspeedXpUnlocked holds, its own
  // buyTickspeedMultiplier call becomes a permanent no-op (see "The last tier's XP-funded
  // tickspeed" in CLAUDE.md) — this same bought flag is repurposed to drive
  // consumeXpForLastTierTickspeed automatically instead, spending the tier's entire current XP
  // balance each tick it's eligible, same as the manual "🧬 {XP} XP" button always does.
  const stateAfterAutomation = TIER_DEFINITIONS.reduce((s, tier) => {
    // Gated on tierTickspeedAutobuyerEnabled (see setTierTickspeedAutobuyerEnabled) — paused
    // behaves exactly as if tierTickspeedAutobuyer were still false, for automation purposes only.
    if (!s.tierTickspeedAutobuyer?.[tier.id] || !(s.tierTickspeedAutobuyerEnabled?.[tier.id] ?? true)) return s
    if (tier.id === getLastTierId() && isLastTierTickspeedXpUnlocked(s)) {
      return consumeXpForLastTierTickspeed(s.prestige.xp)(s)
    }
    return buyTickspeedMultiplier(tier.id)(s)
  }, producedState)

  // If the global tickspeed multiplier's autobuyer is bought (see buyTickspeedAutobuyer), upgrade
  // it automatically the instant it's affordable — no manual click needed. buyGlobalTickspeedMultiplier
  // re-validates eligibility internally (isGlobalTickspeedMultiplierUnlocked, enough Money, not
  // frozen), so this is the same plain edge-triggered convention as the per-tier tickspeed
  // self-upgrade loop above, not a rate-accumulating budget. Gated on autoGlobalTickspeedEnabled
  // (see setAutoGlobalTickspeedEnabled) — paused behaves exactly as if autoGlobalTickspeed were
  // still false, for automation purposes only.
  const stateAfterGlobalTickspeedAutobuyer = stateAfterAutomation.autoGlobalTickspeed && (stateAfterAutomation.autoGlobalTickspeedEnabled ?? true)
    ? buyGlobalTickspeedMultiplier(stateAfterAutomation)
    : stateAfterAutomation

  // If the Auto-Prestige Autobuyer is bought (see buyAutoPrestigeAutobuyer), keep re-leveling
  // Auto-Prestige itself automatically the instant it's affordable — no manual click needed.
  // buyAutoPrestige re-validates its own eligibility internally (enough PP, not frozen), so this is
  // the same plain edge-triggered convention as the per-tier/global tickspeed self-upgrade steps
  // above, not a rate-accumulating budget. Gated on autoPrestigeAutobuyerEnabled (see
  // setAutoPrestigeAutobuyerEnabled) — paused behaves exactly as if autoPrestigeAutobuyer were still
  // false, for automation purposes only; the manual Auto-Prestige upgrade button is unaffected.
  const stateAfterAutoPrestigeAutobuyer = stateAfterGlobalTickspeedAutobuyer.autoPrestigeAutobuyer && (stateAfterGlobalTickspeedAutobuyer.autoPrestigeAutobuyerEnabled ?? true)
    ? buyAutoPrestige(stateAfterGlobalTickspeedAutobuyer)
    : stateAfterGlobalTickspeedAutobuyer

  // If Auto Speed Up is bought (see buyAutoSpeedUp), trigger a Speed Up automatically the instant
  // it's eligible — no manual click needed. speedUpGame re-validates eligibility internally (the
  // last tier must have reached 10 purchases, and production must not be frozen), so this is a
  // plain edge-triggered call, same convention as the autobuyer-automation loop above, not a
  // rate-accumulating budget — Speed Up has no cadence to throttle, unlike Auto-Prestige. Gated on
  // autoSpeedUpEnabled (see setAutoSpeedUpEnabled) — paused behaves exactly as if autoSpeedUp were
  // still false, for automation purposes only; the manual Speed Up button is unaffected.
  const stateAfterSpeedUp = stateAfterAutoPrestigeAutobuyer.autoSpeedUp && (stateAfterAutoPrestigeAutobuyer.autoSpeedUpEnabled ?? true)
    ? speedUpGame(stateAfterAutoPrestigeAutobuyer)
    : stateAfterAutoPrestigeAutobuyer

  // Runs last, against this tick's final tier01 level (post autobuyer/Speed Up), so a Disk
  // sized for a level tier01 only just reached THIS tick can still redeem the same tick — see
  // tickStorage above (auto-fill itself already ran earlier, as part of stateAfterIntro).
  let stateBeforeStorage = stateAfterSpeedUp

  // Unbounded Prestige (PRESTIGE_UNBOUNDED_MIN_COUNT+ lifetime prestiges): Auto-Prestige fires
  // here while production keeps running — the frozen branch above is skipped entirely.
  if (
    isUnboundedPrestigeUnlocked(stateBeforeStorage)
    && autoPrestigeActive
    && clampNonNegative(stateBeforeStorage.resources[MONEY_ID]) >= PRESTIGE_THRESHOLD
  ) {
    const budget = stateBeforeStorage.autoPrestigeAttemptBudget ?? 0
    if (budget >= 1 - TICK_ACCUMULATION_EPSILON) {
      stateBeforeStorage = prestigeGame(stateBeforeStorage)
    }
  }

  return tickStorage(stateBeforeStorage)
}

// Real elapsed seconds away, capped at MAX_OFFLINE_SECONDS. At or below
// OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS, simulated at 100% speed (no reduction); beyond
// it, the entire (capped) duration is scaled down by OFFLINE_PROGRESS_SPEED_MULTIPLIER instead —
// then floored either way to give the number of 1-second ticks applyOfflineProgress will simulate.
export const getOfflineEffectiveSeconds = elapsedRealSeconds => {
  const cappedSeconds = Math.min(clampNonNegative(elapsedRealSeconds), MAX_OFFLINE_SECONDS)
  const speedMultiplier = cappedSeconds > OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS
    ? OFFLINE_PROGRESS_SPEED_MULTIPLIER
    : 1
  return Math.floor(cappedSeconds * speedMultiplier)
}

// Catches a save up on the time it was closed/backgrounded by replaying tickGame one simulated
// second at a time (rather than a single call with a large elapsedSeconds) so autobuyers get the
// same one-purchase-attempt-per-second cadence they'd have had if the game had stayed open — at
// full speed for a short absence, 50% speed beyond OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS
// (see getOfflineEffectiveSeconds above), and capped to MAX_OFFLINE_SECONDS of real time either
// way. tickGame unconditionally drives both the main-game tiers and the Byte Foundry
// (tickIntroProduction/tickIntroAutoInvest/tickStorage*), so this same speed and cadence apply to
// the entire game, not just tiers.
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

  const level = state.purchaseLevels?.[tierId] ?? 1
  const blockSize = getPurchaseBlockSize(state)
  const cost = getTierCost(tier, level)

  if (getTierSpendableAmount(state, tier) < cost) return state

  const newPurchased = getTierPurchasedCount(state, tierId) + 1

  // Advance level/progress directly rather than deriving them from newPurchased after the fact —
  // completing the current level (progress reaching the block size in effect right now, computed
  // from the state *before* this purchase) resets progress to 0 and moves to the next level;
  // otherwise this purchase just increments progress.
  const newProgress = (state.purchaseLevelProgress?.[tierId] ?? 0) + 1
  const completesLevel = newProgress >= blockSize

  const nextState = {
    ...state,
    resources: {
      ...state.resources,
      [tier.costResourceId]: clampNonNegative((state.resources[tier.costResourceId] ?? 0) - cost),
      [tierId]: (state.resources[tierId] ?? 0) + 1,
    },
    owned: { ...state.owned, [tierId]: (state.owned[tierId] ?? 0) + 1 },
    purchased: {
      ...state.purchased,
      [tierId]: newPurchased,
    },
    purchaseLevels: {
      ...state.purchaseLevels,
      [tierId]: completesLevel ? level + 1 : level,
    },
    purchaseLevelProgress: {
      ...state.purchaseLevelProgress,
      [tierId]: completesLevel ? 0 : newProgress,
    },
  }

  // A purchase can be the very first thing that satisfies a tier's (or its successor's) unlock
  // condition — latch that permanently too (see latchEverUnlockedTiers/isTierUnlocked).
  return latchEverUnlockedTiers(nextState)
}

// Buys up to `quantity` units of a tier, capped at the current level's boundary so every unit
// purchased is at the same price. Stops early if a purchase becomes unaffordable.
export const buyTierQuantity = (tierId, quantity) => state => {
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const levelProgress = state.purchaseLevelProgress?.[tierId] ?? 0
  const blockSize = getPurchaseBlockSize(state)
  const cappedQuantity = getTierBulkQuantity(blockSize, levelProgress, quantity)

  let result = state
  for (let i = 0; i < cappedQuantity; i++) {
    const next = buyTier(tierId)(result)
    if (next === result) break // can no longer afford
    result = next
  }
  return result
}

// --- Byte Foundry (pre-game intro) --- state lives in state.intro (see createInitialGameState
// above); INTRO_* constants live in layers.js. A currency pool entirely separate from Money
// (resources.base) until the manual/auto conversions into owned Kilobytes below. Nothing here ever
// fully freezes — Tap/Combine/Sacrifice/Invest/Convert all stay live indefinitely, every cycle,
// with no cap or per-cycle budget on converting bits into Kilobytes.

// Grants `quantity` free units of a tier, mirroring buyTier's owned/resources/purchased/
// purchaseLevels/purchaseLevelProgress bookkeeping exactly (so a granted unit advances level/
// block-progress and counts toward getPurchaseMilestoneMultiplier identically to a manual
// purchase) but skips the cost check/deduction entirely — used by convertIntroBitsToKilobytes and
// tickIntroAutoInvest below, both of which pay from the separate intro bit pool, not the tier's
// own costResourceId.
const grantTierUnits = (tierId, quantity) => state => {
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || quantity <= 0) return state

  let result = state
  for (let i = 0; i < quantity; i++) {
    const level = result.purchaseLevels?.[tierId] ?? 1
    const blockSize = getPurchaseBlockSize(result)
    const newProgress = (result.purchaseLevelProgress?.[tierId] ?? 0) + 1
    const completesLevel = newProgress >= blockSize

    result = {
      ...result,
      resources: { ...result.resources, [tierId]: (result.resources[tierId] ?? 0) + 1 },
      owned: { ...result.owned, [tierId]: (result.owned[tierId] ?? 0) + 1 },
      purchased: { ...result.purchased, [tierId]: getTierPurchasedCount(result, tierId) + 1 },
      purchaseLevels: { ...result.purchaseLevels, [tierId]: completesLevel ? level + 1 : level },
      purchaseLevelProgress: { ...result.purchaseLevelProgress, [tierId]: completesLevel ? 0 : newProgress },
    }
  }
  return latchEverUnlockedTiers(result)
}

// The Byte generator's current bits/sec, whether or not it's been built yet: how much
// (INTRO_BYTE_BASE_RATE * productionMultiplier) is delivered per batch, divided by how often
// (tickSpeedSeconds) — see tickIntroProduction below. At the starting values (1 bit, every 1s)
// this is exactly 1 bit/sec; "Invest for Double Production" doubles it either by halving
// tickSpeedSeconds or multiplying productionMultiplier (see pickIntroProductionMilestone), and
// either path keeps this rate an exact integer at every step (both factors are always powers of
// INTRO_PRODUCTION_MULTIPLIER_STEP, so the division never leaves a fraction). Used both to size a
// manual tap (see tapIntroBit below) and to display the passive-production rate.
export const getIntroProductionRate = intro =>
  (INTRO_BYTE_BASE_RATE * intro.productionMultiplier) / intro.tickSpeedSeconds

// Manual tap — credits "one second's worth" at the Byte generator's current rate (see
// getIntroProductionRate), capped at capacity. Before the Byte exists (or at the starting rate),
// this is the same flat 1 bit it's always been; once "Invest for Double Production" has grown the
// rate, a tap scales right along with passive production instead of staying stuck at 1. Never
// freezes (no completed-style flag — see createInitialGameState) — the only no-op condition is
// already being full.
export const tapIntroBit = state => {
  if (state.intro.bits >= state.intro.capacity) return state
  // Math.max(1, …) is a defensive floor (rate is always >= 1 by construction — productionMultiplier
  // only ever grows and tickSpeedSeconds only ever shrinks from their starting 1/1 — but guards
  // against a corrupted/hand-edited save where that invariant doesn't hold) — the same posture as
  // clampNonNegative elsewhere in this file.
  const tapAmount = Math.max(1, Math.floor(getIntroProductionRate(state.intro)))
  return { ...state, intro: { ...state.intro, bits: Math.min(state.intro.capacity, state.intro.bits + tapAmount) } }
}

// One-time "combine into a Byte": consumes INTRO_BYTE_COMBINE_COST (8) bits, creates the single
// persistent Byte generator that then passively produces bits every tick (see
// tickIntroProduction below). No-op once already created or below cost.
export const combineIntroByte = state => {
  if (state.intro.byteCreated) return state
  if (state.intro.bits < INTRO_BYTE_COMBINE_COST) return state
  return {
    ...state,
    intro: { ...state.intro, bits: state.intro.bits - INTRO_BYTE_COMBINE_COST, byteCreated: true },
  }
}

// Predicate, not a reducer: whether "Sacrifice for 2x Capacity" can actually fire right now.
// Forced priority order for the Byte Foundry's five recurring "upgrade" actions — Disk Fill >
// Bandwidth > Disk Build > Compute > Memory (see CLAUDE.md's "Byte Foundry" section). Each base
// predicate below is that action's own plain availability check; whenever a higher-ranked one is
// currently available, every lower-ranked action is disabled regardless of its own cost, forcing
// the player to take the higher-priority upgrade first rather than letting several compete for the
// same Memory balance at once — the "turn"-suffixed composites further down this file (colocated
// with each action's own reducer) fold that ordering in. Combine into a Byte (a one-off bootstrap
// step) sits outside this forced order entirely and keeps its own simple gate, checked directly
// below.

// "Disk Fill" (highest priority) — true whenever ANY built disk, of any size, is both currently
// FULL and redeemable right now (see isDiskRedeemable, defined further down this file — safe, not
// called until this function itself is): a disk sitting full and redeemable is value already
// earned, just waiting on a click, so nothing else is ever offered ahead of it.
export const isDiskFillAvailable = state =>
  Object.keys(state.intro?.disks ?? {})
    .map(Number)
    .some(size => (state.intro.disks[size] ?? 0) > 0 && isDiskRedeemable(state, size))

// "Bandwidth" ("Invest for Double Production") — true whenever a claim can fire right now: either
// the bit-cost path (affordable and claims remain) or the compute-token overflow path (#323 —
// bit cost exceeds capacity, sacrifice COMPUTE_ENTITY_CAP of the next compute tier).
export const isBandwidthAvailable = state =>
  isBitFundedBandwidthAvailable(state) || isComputeFundedBandwidthAvailable(state)

export const isBitFundedBandwidthAvailable = state => {
  const cost = getIntroProductionMilestoneCost(state.intro.productionMilestoneTier)
  const claimsUsedUp = state.intro.productionMilestoneTierClaims >= getIntroProductionMilestoneMaxClaims(state.intro.productionMilestoneTier)
  return state.intro.bits >= cost && !claimsUsedUp
}

// Issue #323: Bandwidth ×2 funded by sacrificing COMPUTE_ENTITY_CAP of the next compute-ladder
// tier (Cores → … → Megacomputers, once each in order, then wrapping back to Cores — see below) —
// only when the normal bit cost exceeds Memory capacity (bit payment impossible). Separate from
// auto-merge's own 10-token sinks.
//
// The sacrifice index wraps modulo COMPUTE_BOOST_TIER_FIELDS.length rather than terminating once
// it reaches the end of the list. Before pool 1's capacity cap (see INTRO_CAPACITY_CAP_BITS in
// layers.js), this overflow valve only ever needed a full lap of the 10 compute tiers before a
// Sacrifice was required to reset it — fine when Sacrifice was always eventually available again.
// Once Sacrifice can permanently exhaust at the cap, that same "walk the list once, then wait for a
// Sacrifice reset" behavior would make Bandwidth a permanent, unrecoverable no-op for any run that
// reaches both limits — a real violation of "nothing here ever fully freezes." Wrapping keeps
// Bandwidth progressing indefinitely off compute-ladder tokens, which stay earnable forever via
// startBoosterTransfer (spending deposited/live-transferred Disk stock from a Data Lake — entirely
// unrelated to Memory/capacity), even after Sacrifice itself is capped.
// getEffectiveComputeBandwidthSacrificeIndex also normalizes any out-of-range persisted index
// (e.g. an old save saved mid-cycle before this fix existed) the same way, rather than leaving it
// permanently stuck at the old terminal value. See docs/DESIGN_HISTORY.md.
const getEffectiveComputeBandwidthSacrificeIndex = intro => {
  const index = intro?.computeBandwidthSacrificeIndex ?? 0
  const length = COMPUTE_BOOST_TIER_FIELDS.length
  return ((index % length) + length) % length
}

export const isComputeFundedBandwidthAvailable = state => {
  const intro = state.intro ?? {}
  const index = getEffectiveComputeBandwidthSacrificeIndex(intro)
  const tier = intro.productionMilestoneTier ?? 0
  const claimsUsedUp = (intro.productionMilestoneTierClaims ?? 0) >= getIntroProductionMilestoneMaxClaims(tier)
  if (claimsUsedUp) return false
  const cost = getIntroProductionMilestoneCost(tier)
  if (cost <= (intro.capacity ?? 0)) return false
  const field = COMPUTE_BOOST_TIER_FIELDS[index]
  return (intro[field] ?? 0) >= COMPUTE_ENTITY_CAP
}

export const getComputeBandwidthSacrificeField = state => {
  const index = getEffectiveComputeBandwidthSacrificeIndex(state.intro)
  return COMPUTE_BOOST_TIER_FIELDS[index] ?? null
}

export const getComputeBandwidthSacrificeLabel = state => {
  const index = getEffectiveComputeBandwidthSacrificeIndex(state.intro)
  return COMPUTE_TIER_LABELS[index] ?? null
}

// "Disk Build" — true whenever no array is already mid-build (intro.diskBuild — only one build
// slot exists at a time, since only one size is ever buildable) and the current ladder size's
// build cost is affordable (see getDiskSize/getDiskCost, defined further down this file) — matches
// startDiskBuild's own actual gate, which (like every other Byte Foundry reducer) has never itself
// required isStorageUnlocked; that threshold only governs the button's own UI reveal. Also false
// once isDiskLadderExhaustedForActivePools — nothing left pool 1's generator could ever fund, so
// there's no cost to become newly affordable towards; that's a distinct, permanent state from
// "not affordable yet" (see ByteFoundryPage, which renders the two differently).
export const isDiskBuildAvailable = state =>
  !state.intro.diskBuild &&
  !isDiskLadderExhaustedForActivePools(state) &&
  state.intro.bits >= getDiskCost(getDiskSize(state))

// "Compute" — true once Compute Core conversion is unlocked and either a brand new boost is
// mechanically activatable from some compute-ladder tier, or the currently active boost (if any)
// can be stacked further (see canActivateComputeBoost/canStackComputeBoost, defined further down
// this file — issue #326).
export const isComputeUpgradeAvailable = state =>
  isComputeCoreConversionUnlocked(state) &&
  (canStackComputeBoost(state) ||
    COMPUTE_BOOST_TIER_FIELDS.some((field, index) =>
      Object.keys(COMPUTE_BOOST_PRESETS).some(boostType => canActivateComputeBoost(state, boostType, index + 1))
    ))

// "Memory" (lowest priority) — Memory must be full (bits === capacity) AND every action ranked
// above it — Combine into a Byte, Disk Fill, Bandwidth, Disk Build, Compute — must currently be
// unavailable. Capacity growth is offered only once nothing else productive can be done with a
// full balance, so a player never skips past a cheaper, immediately available upgrade just because
// Memory happens to be full at the same moment. Used by pickIntroCapacityMilestone's own guard
// below and directly by ByteFoundryPage to disable/hide the button the same way — the same "engine
// re-validates, UI just mirrors it" convention every other action in this file already follows
// (see "Security notes" in CLAUDE.md).
// Pool 1's generator can never grow past its own hard ceiling (INTRO_CAPACITY_CAP_BITS — see
// layers.js) — Sacrifice halts for good once the NEXT doubling would meet or exceed it, rather than
// clamping to a partial step. Exported so ByteFoundryPage can show the cap as a distinct disabled
// state instead of inferring it from isMemoryCapacityUpgradeAvailable alone.
export const isMemoryCapacityAtCap = state => (state.intro?.capacity ?? 0) * INTRO_CAPACITY_DOUBLING_STEP > INTRO_CAPACITY_CAP_BITS

export const isMemoryCapacityUpgradeAvailable = state => {
  if (state.intro.bits < state.intro.capacity) return false
  if (!state.intro.byteCreated && state.intro.bits >= INTRO_BYTE_COMBINE_COST) return false
  if (isMemoryCapacityAtCap(state)) return false
  if (isDiskFillAvailable(state)) return false
  if (isBandwidthAvailable(state)) return false
  if (isDiskBuildAvailable(state)) return false
  if (isComputeUpgradeAvailable(state)) return false
  return true
}

// Rewind one Bandwidth ×2 claim (inverse of applyIntroProductionDoublingToIntro) — used when
// Sacrifice rolls back compute-funded Invest steps (#324).
const rewindOneIntroProductionClaim = intro => {
  let tier = intro.productionMilestoneTier ?? 0
  let claims = intro.productionMilestoneTierClaims ?? 0
  let { tickSpeedSeconds, productionMultiplier } = intro

  if (claims > 0) {
    claims -= 1
  } else if (tier > 0) {
    tier -= 1
    claims = getIntroProductionMilestoneMaxClaims(tier) - 1
  }

  if (productionMultiplier > 1) {
    productionMultiplier = productionMultiplier / INTRO_PRODUCTION_MULTIPLIER_STEP
  } else {
    tickSpeedSeconds = tickSpeedSeconds * INTRO_PRODUCTION_MULTIPLIER_STEP
  }

  return {
    ...intro,
    productionMilestoneTier: tier,
    productionMilestoneTierClaims: claims,
    tickSpeedSeconds,
    productionMultiplier,
  }
}

// Issue #324: undo exactly computeFundedBandwidthClaims Invest doubles and reset the sequential
// compute-sacrifice index. Same-reference no-op when nothing compute-funded is outstanding.
export const rollbackComputeFundedBandwidth = state => {
  const funded = state.intro?.computeFundedBandwidthClaims ?? 0
  const index = state.intro?.computeBandwidthSacrificeIndex ?? 0
  if (funded <= 0 && index === 0) return state

  let intro = { ...state.intro }
  for (let i = 0; i < funded; i++) {
    intro = rewindOneIntroProductionClaim(intro)
  }
  intro.computeFundedBandwidthClaims = 0
  intro.computeBandwidthSacrificeIndex = 0
  return { ...state, intro }
}

// "Sacrifice for 2x Capacity" — see isMemoryCapacityUpgradeAvailable above for the full
// availability gate (Memory full AND no other currently-possible action left to take first).
// Drains the ENTIRE balance to 0 and multiplies capacity by INTRO_CAPACITY_DOUBLING_STEP. Once
// Compute is unlocked, also erases all compute tokens/timers and rolls back compute-funded
// Bandwidth progress (#324). Clears capacityUpgradeQueued on success.
export const pickIntroCapacityMilestone = state => {
  if (!isMemoryCapacityUpgradeAvailable(state)) return state
  const afterWipe = isComputeCoreConversionUnlocked(state)
    ? rollbackComputeFundedBandwidth(eraseAllComputeTokens(state))
    : state
  return {
    ...afterWipe,
    intro: {
      ...afterWipe.intro,
      bits: 0,
      capacity: afterWipe.intro.capacity * INTRO_CAPACITY_DOUBLING_STEP,
      capacityUpgradeQueued: false,
    },
  }
}

// Commit to the next Sacrifice before Memory is full — prevents Compute (Core claim / Boosts)
// from starving Capacity once the bar fills. Idempotent while already queued. Cleared on Prestige
// (fresh intro default), on a successful Sacrifice (manual or queued), or via
// clearIntroCapacityUpgradeQueue.
export const queueIntroCapacityUpgrade = state => {
  if (state.intro?.capacityUpgradeQueued) return state
  if (isMemoryCapacityAtCap(state)) return state
  return { ...state, intro: { ...state.intro, capacityUpgradeQueued: true } }
}

export const clearIntroCapacityUpgradeQueue = state => {
  if (!(state.intro?.capacityUpgradeQueued ?? false)) return state
  return { ...state, intro: { ...state.intro, capacityUpgradeQueued: false } }
}

const COMPUTE_MERGE_TIMER_FIELDS = [
  'computeCoresMergeRemainingSeconds',
  'computeNodesMergeRemainingSeconds',
  'computeClustersMergeRemainingSeconds',
  'computeNetworksMergeRemainingSeconds',
  'computeGridsMergeRemainingSeconds',
  'computeFabricsMergeRemainingSeconds',
  'computeCloudsMergeRemainingSeconds',
  'computeDatacentersMergeRemainingSeconds',
  'computeSupercomputersMergeRemainingSeconds',
]

// Wipes every held Compute ladder token, any active Boost, and any in-flight reserve-merge timers.
// Does NOT touch permanent unlock flags (autoMerge*) or lifetime counters
// (computeCoresEverEarned / computeMergePageUnlocked). Same-reference no-op when nothing to wipe.
export const eraseAllComputeTokens = state => {
  const intro = state.intro ?? {}
  let changed = false
  const next = { ...intro }
  for (const field of COMPUTE_BOOST_TIER_FIELDS) {
    if ((next[field] ?? 0) !== 0) {
      next[field] = 0
      changed = true
    }
  }
  for (const field of COMPUTE_MERGE_TIMER_FIELDS) {
    if ((next[field] ?? 0) !== 0) {
      next[field] = 0
      changed = true
    }
  }
  if ((next.computeBoostType ?? null) !== null) {
    next.computeBoostType = null
    next.computeBoostTierIndex = null
    next.computeBoostStacks = 0
    next.computeBoostRemainingSeconds = 0
    changed = true
  } else if ((next.computeBoostStacks ?? 0) !== 0 || (next.computeBoostRemainingSeconds ?? 0) !== 0) {
    next.computeBoostTierIndex = null
    next.computeBoostStacks = 0
    next.computeBoostRemainingSeconds = 0
    changed = true
  }
  if (!changed) return state
  return { ...state, intro: next }
}

// Fires a queued Capacity upgrade the instant Memory is full and nothing ranked above Capacity
// except Compute is available (Disk Fill / Bandwidth / Disk Build still win). Erases all Compute
// tokens and rolls back compute-funded Bandwidth (#324), then Sacrifices — bypassing
// isComputeUpgradeAvailable so Boost eligibility cannot starve a committed Capacity upgrade.
// Called from tickGame after intro production. Same-reference no-op otherwise.
export const tickQueuedCapacityUpgrade = state => {
  if (!(state.intro?.capacityUpgradeQueued ?? false)) return state
  if ((state.intro?.bits ?? 0) < (state.intro?.capacity ?? 0)) return state
  if (!state.intro.byteCreated && state.intro.bits >= INTRO_BYTE_COMBINE_COST) return state
  if (isMemoryCapacityAtCap(state)) return state
  if (isDiskFillAvailable(state)) return state
  if (isBandwidthAvailable(state)) return state
  if (isDiskBuildAvailable(state)) return state

  const wiped = isComputeCoreConversionUnlocked(state)
    ? rollbackComputeFundedBandwidth(eraseAllComputeTokens(state))
    : eraseAllComputeTokens(state)
  return {
    ...wiped,
    intro: {
      ...wiped.intro,
      bits: 0,
      capacity: wiped.intro.capacity * INTRO_CAPACITY_DOUBLING_STEP,
      capacityUpgradeQueued: false,
    },
  }
}

// "Invest for Double Production"'s own cost ladder — entirely independent of `capacity`/Sacrifice
// (a separate, permanent progression, keyed off productionMilestoneTier — see
// createInitialGameState): tier 0 costs INTRO_STARTING_CAPACITY (1 Byte), each tier after that
// costs INTRO_BANDWIDTH_COST_MULTIPLIER times the last (4, 16, 64, 256 Bytes, …) — was ×10 per step
// (the same shape the capacity ladder once shared) until this and INTRO_CAPACITY_DOUBLING_STEP
// split into independent multipliers; see docs/DESIGN_HISTORY.md.
export const getIntroProductionMilestoneCost = tier =>
  INTRO_STARTING_CAPACITY * (INTRO_BANDWIDTH_COST_MULTIPLIER ** clampNonNegative(tier))

// How many claims a given productionMilestoneTier grants before advancing to the next: 2 for the
// three cheapest tiers (0/1/2, i.e. 1/4/16 Bytes), 1 for every tier from there on — unlike
// "Sacrifice for 2x Capacity"'s own flat one-attempt-per-cost posture, the earliest, cheapest
// Invest tiers get a second attempt each before advancing. A previous iteration simplified this to
// a flat 1 across the board; see docs/DESIGN_HISTORY.md for both that change and this reinstatement.
export const getIntroProductionMilestoneMaxClaims = tier => tier > 2 ? 1 : 2

// "Invest for Double Production" — an ordinary cost-gated purchase: costs
// getIntroProductionMilestoneCost(productionMilestoneTier), NOT tied to the current `capacity` at
// all, so a claim never requires a full Memory balance — only enough bits to cover this tier's
// cost, which is frequently far below capacity once Sacrifice has grown it ahead of this ladder.
// Deducts exactly that cost and doubles the Byte generator's overall bits/sec rate (see
// getIntroProductionRate) by INTRO_PRODUCTION_MULTIPLIER_STEP. Independently callable — no
// coupling to pickIntroCapacityMilestone's own state. No-op below cost or once
// getIntroProductionMilestoneMaxClaims(productionMilestoneTier) claims have already been made at
// the current tier; a successful claim either stays at the same tier (incrementing
// productionMilestoneTierClaims) or, once the tier's claim limit is reached, advances to the next
// tier with a fresh claim count of 0.
//
// Doubling the rate speeds up delivery (halves tickSpeedSeconds) first, same as the main game's
// own tickspeed-vs-production split (see getEffectiveTierTickSpeedSeconds/CLAUDE.md's "Tier
// production tickspeed") — only once that would push tickSpeedSeconds below
// INTRO_MIN_TICK_SPEED_SECONDS (the live tick loop's own real-time resolution, TICK_RATE_MS) does
// it switch to multiplying productionMultiplier (growing the batch) instead, so growth never
// stalls once the tick loop's own granularity limit is reached.

// Apply one Bandwidth ×2 to intro (rate doubling + milestone counter advance) without charging.
const applyIntroProductionDoublingToIntro = intro => {
  const tier = intro.productionMilestoneTier
  const claims = intro.productionMilestoneTierClaims
  const maxClaims = getIntroProductionMilestoneMaxClaims(tier)
  const fasterTickSpeed = intro.tickSpeedSeconds / INTRO_PRODUCTION_MULTIPLIER_STEP
  const canSpeedUp = fasterTickSpeed >= INTRO_MIN_TICK_SPEED_SECONDS
  const tierComplete = claims + 1 >= maxClaims

  return {
    ...intro,
    productionMilestoneTier: tierComplete ? tier + 1 : tier,
    productionMilestoneTierClaims: tierComplete ? 0 : claims + 1,
    ...(canSpeedUp
      ? { tickSpeedSeconds: fasterTickSpeed }
      : { productionMultiplier: intro.productionMultiplier * INTRO_PRODUCTION_MULTIPLIER_STEP }),
  }
}

// "Bandwidth"'s own forced-priority turn (see the priority-order block above
// isMemoryCapacityUpgradeAvailable): available AND nothing ranked above it (Disk Fill) currently
// is. Used by pickIntroProductionMilestone's own guard below and directly by ByteFoundryPage to
// disable the button the same way.
export const isBandwidthTurnAvailable = state =>
  isBandwidthAvailable(state) && !isDiskFillAvailable(state)

// Bit-funded Invest when affordable; otherwise compute-funded overflow path (#323) when the bit
// cost exceeds capacity. Prefer bits whenever isBitFundedBandwidthAvailable so normal play is
// unchanged.
export const pickIntroProductionMilestone = state => {
  if (!isBandwidthTurnAvailable(state)) return state

  if (isBitFundedBandwidthAvailable(state)) {
    const cost = getIntroProductionMilestoneCost(state.intro.productionMilestoneTier)
    return {
      ...state,
      intro: {
        ...applyIntroProductionDoublingToIntro(state.intro),
        bits: clampNonNegative(state.intro.bits - cost),
      },
    }
  }

  if (isComputeFundedBandwidthAvailable(state)) {
    const index = getEffectiveComputeBandwidthSacrificeIndex(state.intro)
    const field = COMPUTE_BOOST_TIER_FIELDS[index]
    return {
      ...state,
      intro: {
        ...applyIntroProductionDoublingToIntro(state.intro),
        [field]: clampNonNegative((state.intro[field] ?? 0) - COMPUTE_ENTITY_CAP),
        computeBandwidthSacrificeIndex: (index + 1) % COMPUTE_BOOST_TIER_FIELDS.length,
        computeFundedBandwidthClaims: (state.intro.computeFundedBandwidthClaims ?? 0) + 1,
      },
    }
  }

  return state
}

// Predicate, not a reducer: whether the manual "convert bits to a Kilobyte" action and the "next
// phase" reveal indicator should be shown — true once capacity has grown enough to ever hold
// INTRO_CONVERSION_UNLOCK_CAPACITY (1000) bits at once.
export const isIntroConversionUnlocked = state => (state.intro?.capacity ?? 0) >= INTRO_CONVERSION_UNLOCK_CAPACITY

// Predicate, not a reducer: whether ByteFoundryPage's whole Storage section (Build button, disk
// squares rows) should be shown at all — true once capacity has grown enough to ever hold
// INTRO_DISK_UNLOCK_CAPACITY (80,000 bits, "9.765 KiB" in Memory's own binary display scale) at
// once. A later, more deliberate reveal than isIntroConversionUnlocked's own 1000-bit gate above —
// see layers.js.
export const isStorageUnlocked = state => (state.intro?.capacity ?? 0) >= INTRO_DISK_UNLOCK_CAPACITY

// Byte-scale (SI) unit ladder — B/KB/MB/… scaling by 1000 each step, reusing TIER_DEFINITIONS' own
// tier symbols. Storage (Disk sizes — see formatDiskSize below) stays on this SI scale; Memory
// Capacity/balance itself moved to the binary ladder further down (see getMemoryUnit) — see
// CLAUDE.md's "Economy model".
const SI_BYTE_UNIT_SYMBOLS = ['B', ...TIER_DEFINITIONS.map(tier => tier.symbol)]
const SI_BYTE_UNIT_SCALE = 1000

// A parallel, BIT-scale unit ladder for Disk Cache blocks specifically — lowercase 'b'/'Kb'/'Mb'/…
// (vs. Disks' own uppercase 'B'/'KB'/'MB'/… above), scaling by SI_BYTE_UNIT_SCALE directly off the
// raw bit count with no BITS_PER_BYTE divisor (unlike getSiByteUnit) — a cache block's own bit
// count already IS the value to denominate, e.g. a 1 KB (8000-bit) disk's cache block is 1000
// bits = "1 Kb", not "125 B". See formatCacheSize below. Cache stays SI, same as Disks.
const BIT_UNIT_SYMBOLS = ['b', ...SI_BYTE_UNIT_SYMBOLS.slice(1).map(symbol => symbol.replace(/B$/, 'b'))]

const getBitUnit = bits => {
  let divisor = 1
  let unitIndex = 0
  while (bits / divisor >= SI_BYTE_UNIT_SCALE && unitIndex < BIT_UNIT_SYMBOLS.length - 1) {
    divisor *= SI_BYTE_UNIT_SCALE
    unitIndex += 1
  }
  return { symbol: BIT_UNIT_SYMBOLS[unitIndex], divisor }
}

// SI unit picker — used only by formatDiskSize below (Storage/Disk sizes stay SI-denominated; see
// getMemoryUnit further down for Memory Capacity's own, now-binary, unit picker).
const getSiByteUnit = bits => {
  let divisor = BITS_PER_BYTE
  let unitIndex = 0
  while (bits / divisor >= SI_BYTE_UNIT_SCALE && unitIndex < SI_BYTE_UNIT_SYMBOLS.length - 1) {
    divisor *= SI_BYTE_UNIT_SCALE
    unitIndex += 1
  }
  return { symbol: SI_BYTE_UNIT_SYMBOLS[unitIndex], divisor }
}

// Memory Capacity's own binary (IEC-style) unit ladder — B/KiB/MiB/… scaling by
// MEMORY_BINARY_UNIT_STEP (1024) each step, extending TIER_DEFINITIONS' own tier symbols the same
// "i" way IEC extends SI (KB -> KiB, MB -> MiB, …). 1 KiB = 1024 Bytes = 1.024 KB — distinct from,
// and deliberately NOT interchangeable with, SI_BYTE_UNIT_SYMBOLS/getSiByteUnit above, which Disk
// sizes/Data Lake/caches keep using unchanged. See docs/DESIGN_HISTORY.md.
const MEMORY_BINARY_UNIT_SYMBOLS = ['B', ...TIER_DEFINITIONS.map(tier => tier.symbol.replace(/B$/, 'iB'))]

// The single unit a bits/capacity pair should both render in, sized off `capacityBits` (always the
// larger of the two, when comparing a balance against its own capacity) so a balance never shows
// in a coarser unit than its own capacity — e.g. never "512 B / 1 KiB". `byteCreated` gates whether
// there's anything to denominate in yet at all: before the Byte generator exists, capacity is
// always exactly INTRO_STARTING_CAPACITY (8 bits = 1 Byte — capacity can only grow via Sacrifice,
// itself only reachable once byteCreated), so a capacity-magnitude check alone can never catch
// this phase. Without this gate, tapping through that very first 0-8 bit range would render as
// fractional Bytes ("0.125 B", "0.25 B", …) — a less readable unit than the raw bit count for a
// range this small.
export const getMemoryUnit = (capacityBits, byteCreated) => {
  if (!byteCreated) return null // nothing to denominate in yet — render as raw bits
  let divisor = BITS_PER_BYTE
  let unitIndex = 0
  while (capacityBits / divisor >= MEMORY_BINARY_UNIT_STEP && unitIndex < MEMORY_BINARY_UNIT_SYMBOLS.length - 1) {
    divisor *= MEMORY_BINARY_UNIT_STEP
    unitIndex += 1
  }
  return { symbol: MEMORY_BINARY_UNIT_SYMBOLS[unitIndex], divisor }
}

// Floors rather than rounds, same "never overstate" rationale as formatCurrency above — an
// Intl-rounded 999.9/1000 bits would otherwise read as "1 KB / 1 KB" one tick before it's actually
// full.
const floorToDecimals = (value, decimals) => Math.floor(value * 10 ** decimals) / 10 ** decimals

export const formatMemoryAmount = (bits, unit) =>
  unit
    ? `${formatAmount(floorToDecimals(bits / unit.divisor, 3))} ${unit.symbol}`
    : `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`

// Any Memory-denominated amount (capacity, balance, Invest cost, transfer-block cost, the
// Sacrifice confirm line — NOT Disk build cost, which renders via formatDiskSize/SI instead, since
// it's a fixed multiple of the Disk's own SI-scaled size) reads in whatever binary B/KiB/MiB/…
// unit best fits that specific amount. `getMemoryUnit(bits, true)` picks the unit that fits `bits`
// itself when called this way; the `true` is always safe here since every caller of this helper
// only renders once `byteCreated`.
export const formatBitsInNearestUnit = bits => formatMemoryAmount(bits, getMemoryUnit(bits, true))

// SI counterpart of formatBitsInNearestUnit above, used only by formatDiskSize below — Disk sizes
// stay SI-denominated (KB/MB/…) even though Memory Capacity itself now reads in binary units.
const formatBitsInNearestSiUnit = bits => formatMemoryAmount(bits, getSiByteUnit(bits))

// The cost, in bits, of converting Memory into 1 Kilobyte unit right now — tier01's own CURRENT
// per-unit level cost (see the Storage section below for how a disk's SIZE maps to a fixed tier and
// level instead — a positional match, not a price one) — not a fixed rate. At a fresh cycle's starting level this is
// exactly INTRO_BITS_PER_KILOBYTE_CONVERSION (8000 bits, BITS_PER_BYTE × tier01's own baseCost), but it grows in
// lockstep with tier01's own price from then on (10,000 once tier01 reaches level 2, and so on), so
// a transfer block's real value never falls behind what tier01 itself currently costs. An earlier
// version stayed flat at INTRO_BITS_PER_KILOBYTE_CONVERSION forever, which undervalued a transfer
// once tier01's price grew past it — see docs/DESIGN_HISTORY.md.
export const getIntroKilobyteConversionCost = state =>
  getTierCost(TIER_DEFINITIONS[0], state.purchaseLevels?.[TIER_DEFINITIONS[0].id] ?? 1) * BITS_PER_BYTE

// Manual "convert Memory into 1 Kilobyte": spends getIntroKilobyteConversionCost(state) bits from
// the intro's own pool and grants 1 free unit of the main game's first tier via grantTierUnits —
// bypasses isTierUnlocked/isProductionFrozen entirely, since this pays from a separate currency
// pool, not resources.base. No-op below cost — otherwise always available, every cycle, with no
// separate budget or cap of its own (tier01's own purchaseLevelProgress/getPurchaseBlockSize is
// what the transfer-block row on screen actually tracks, and that already rolls over into the
// next level's blocks on its own once one completes — see ByteFoundryPage). The first successful
// call ever this cycle also flips mainGameUnlocked, opening the App.jsx routing gate into
// MainPage — set unconditionally (harmless once already true), so this is the earliest of the two
// transfer paths (this or the auto-invest below) to actually fire that does the unlocking.
export const convertIntroBitsToKilobytes = state => {
  const cost = getIntroKilobyteConversionCost(state)
  if (state.intro.bits < cost) return state
  const firstTierId = TIER_DEFINITIONS[0].id
  return grantTierUnits(firstTierId, 1)({
    ...state,
    intro: {
      ...state.intro,
      bits: state.intro.bits - cost,
      mainGameUnlocked: true,
    },
  })
}

// Tick-time passive production for the Byte generator — no-op immediately before byteCreated (a
// player who hasn't built their Byte yet costs/gains nothing here). Delivers one batch of
// INTRO_BYTE_BASE_RATE * productionMultiplier bits every tickSpeedSeconds — the exact same
// "accumulate elapsed real time, deliver a whole batch once a full period has passed, bank the
// remainder" model TIER_DEFINITIONS' own per-tier production uses (see tickGame's
// tierProductionAccumulators handling and "Tier production tickspeed" in CLAUDE.md), just against
// the intro's own tickSpeedSeconds/productionMultiplier instead of a tier's. Bits are capped at
// capacity — any batch amount a capacity cap actually clips is simply not banked forward, same
// rule tapIntroBit follows. Never freezes — keeps producing every cycle, even well past
// mainGameUnlocked.
export const tickIntroProduction = elapsedSeconds => state => {
  if (!state.intro.byteCreated) return state

  const tickSpeed = state.intro.tickSpeedSeconds
  const accumulated = state.intro.productionAccumulator + elapsedSeconds
  const ticksElapsed = Math.floor((accumulated + TICK_ACCUMULATION_EPSILON) / tickSpeed)

  if (ticksElapsed <= 0) {
    return accumulated === state.intro.productionAccumulator
      ? state
      : { ...state, intro: { ...state.intro, productionAccumulator: accumulated } }
  }

  const bitsToAdd = INTRO_BYTE_BASE_RATE * state.intro.productionMultiplier * ticksElapsed * getComputeBoostMultiplier(state.intro)

  return {
    ...state,
    intro: {
      ...state.intro,
      bits: Math.min(state.intro.capacity, state.intro.bits + bitsToAdd),
      productionAccumulator: accumulated - ticksElapsed * tickSpeed,
    },
  }
}

// Auto-convert convenience — fires every tick, converting one unit at a time (at
// getIntroKilobyteConversionCost(state), tier01's own current per-unit cost — not a fixed rate) via
// convertIntroBitsToKilobytes itself (so it flips mainGameUnlocked on first success and behaves
// identically to a manual click), for as long as bits still affords another unit. Used to wait for
// a whole getPurchaseBlockSize(state)-sized batch before firing even once — which meant the
// transfer-block row's active block visually sat pinned at 100% (bits clamped past the per-unit
// cost) for the entire time bits climbed toward that full batch, looking frozen, with
// blocks 2+ never activating until the batch completed and the whole level reset in the same tick
// (see docs/DESIGN_HISTORY.md). Converting one unit at a time instead makes the row advance live,
// block by block, exactly like a manual click would. Capped at getTierBulkQuantity's own "at most
// one level's worth per call" bound — the same safety cap buyTierQuantity's own autobuyer path
// uses — so an enormous bits balance (e.g. after a long-Sacrificed capacity) can't loop this an
// unbounded number of times in a single tick; a jump spanning more than one level's worth of units
// completes the rest on the following ticks instead, same as any other autobuyer catching up.
export const tickIntroAutoInvest = state => {
  const firstTierId = TIER_DEFINITIONS[0].id
  const levelProgress = state.purchaseLevelProgress?.[firstTierId] ?? 0
  const blockSize = getPurchaseBlockSize(state)
  const maxUnitsThisCall = getTierBulkQuantity(blockSize, levelProgress, Number.MAX_SAFE_INTEGER)

  let result = state
  for (let i = 0; i < maxUnitsThisCall; i++) {
    const next = convertIntroBitsToKilobytes(result)
    if (next === result) break // no longer affordable
    result = next
  }
  return result
}

// --- Byte Foundry Storage (Disks) --- see the "Byte Foundry Storage" comment in layers.js and
// intro.disks/disksBuiltTotal/diskCache/diskBuild/diskAutoRedeemedSizes in createInitialGameState
// above. Disks are a genuine storage MEDIUM, not a one-shot pre-paid item: building one
// (startDiskBuild) takes real TIME (see tickDiskBuild) and, once complete, only constructs a
// permanent, EMPTY container of a given size — Memory (intro.bits) then keeps each array's Cache
// full (whole-block transfers) and flushes a full read cache into an empty disk over one
// cache-block production duration when no tier claim blocks that size (see tickDiskAutoFill),
// smallest size first. `intro.disks[size]` counts how many disks of that size
// are currently FULL (this is
// what redeemDisk spends); `intro.disksBuiltTotal[size]` is the permanent, never-decremented total
// ever built — the number of currently EMPTY disks of a size is always
// `disksBuiltTotal[size] - disks[size]`. Consuming (redeeming) a full disk empties it again,
// returning it to the fillable pool — disks are reusable, not single-use.

// Disk ladder step `n` (1-indexed): DISK_LADDER_BASE_SIZE_BITS × DISK_LADDER_SIZE_MULTIPLIER^(n-1)
// — 1 KB, 10 KB, 100 KB, 1 MB, 10 MB, … with no gaps (issue #368). Exported for tests/docs.
export const getDiskLadderSizeBits = step => {
  const safeStep = Math.max(1, Number.isFinite(step) ? Math.floor(step) : 1)
  return DISK_LADDER_BASE_SIZE_BITS * (DISK_LADDER_SIZE_MULTIPLIER ** (safeStep - 1))
}

// How many disk-ladder steps (sizes) pool 1's own generator can ever fund — 1/10/100 KB, the same
// 3-step grouping DATA_LAKE_SUB_SIZES already uses to carve the ladder into per-pool tiers (see
// getDataLakeTierIndex below). Only pool 1 has a Byte generator today (INTRO_CAPACITY_CAP_BITS is
// sized specifically to afford this step's own build cost — see layers.js), so this is a flat
// constant for now; a future per-pool generator (epic #456) will make it depend on how many pools
// are unlocked instead of always stopping after the first.
const MAX_ACTIVE_DISK_LADDER_STEP = DATA_LAKE_SUB_SIZES.length

// Whether every disk size pool 1's generator can ever fund has already been fully built
// (DISK_ARRAY_LADDER_CAP disks at MAX_ACTIVE_DISK_LADDER_STEP) — i.e. there is genuinely nothing
// left for startDiskBuild to offer until a future pool's own generator arrives. Distinct from
// "can't currently afford it": this is permanent until epic #456 ships pool 2+.
export const isDiskLadderExhaustedForActivePools = state => {
  const builtTotal = state.intro?.disksBuiltTotal ?? {}
  const lastActiveSize = getDiskLadderSizeBits(MAX_ACTIVE_DISK_LADDER_STEP)
  return (builtTotal[lastActiveSize] ?? 0) >= DISK_ARRAY_LADDER_CAP
}

// The size (in bits) startDiskBuild currently builds: walks the gapless Byte power-of-ten ladder
// (see getDiskLadderSizeBits), advancing once DISK_ARRAY_LADDER_CAP disks have ever been built at
// the current size (disksBuiltTotal — cumulative, never decremented by redeeming). Deliberately
// decoupled from any tier's CURRENT purchase level — see layers.js / docs/DESIGN_HISTORY.md. A
// freshly offered size isn't necessarily redeemable yet — isDiskRedeemable is the separate gate.
// Never advances past MAX_ACTIVE_DISK_LADDER_STEP — once that size's array is fully built, this
// keeps returning it rather than reaching a size no currently-unlocked pool could ever afford (see
// isDiskLadderExhaustedForActivePools, the actual "nothing left to build" gate for startDiskBuild).
// Replaced an earlier ladder that walked tier01's level-cost sequence and skipped sizes whenever
// cost-epoch exponents jumped (100 KB → 10 MB, never 1 MB — issue #368).
export const getDiskSize = state => {
  const builtTotal = state.intro?.disksBuiltTotal ?? {}
  let step = 1
  let size = getDiskLadderSizeBits(step)
  while (step < MAX_ACTIVE_DISK_LADDER_STEP && (builtTotal[size] ?? 0) >= DISK_ARRAY_LADDER_CAP) {
    step += 1
    size = getDiskLadderSizeBits(step)
  }
  return size
}

// A disk's one-time build (construction) cost — DISK_BUILD_COST_MULTIPLIER (10) times its own
// face value: a real 1 KB (8000-bit) disk costs 80,000 bits ("10 KB"), not the 10,000-bit figure
// an earlier "kilobit"-scaled version of this ladder produced (see docs/DESIGN_HISTORY.md). No
// further BITS_PER_BYTE conversion is needed here — capacityBits (from getDiskSize) is already
// Byte-accurate. This cost only ever pays for the empty container itself — it is NOT what fills it
// (see tickDiskAutoFill).
export const getDiskCost = capacityBits => capacityBits * DISK_BUILD_COST_MULTIPLIER

// The base build TIME, in seconds, for the FIRST disk ever built at a given size — exactly the
// time to fill an empty container that size at 1x Memory bandwidth (getIntroProductionRate), i.e.
// the same rate Memory itself is currently produced at — snapshotted once when the build starts
// (see startDiskBuild; totalSeconds itself is fixed thereafter, only remainingSeconds ticks down).
// An earlier version used a flat, hardcoded "1 second per real KB of size" rate instead — see
// docs/DESIGN_HISTORY.md.
const getDiskBuildBaseSeconds = (state, capacityBits) => {
  const rate = getIntroProductionRate(state.intro ?? {})
  return capacityBits / Math.max(rate, Number.MIN_VALUE)
}

// Building the Nth disk of a given size (N = 1 for the array's very first disk, 2 for its second,
// …) takes N × that size's own base build time — "adding another disk to the array takes [the]
// same additional time" again, so at a given production rate a 1 KB array's 6th disk (its 5
// predecessors already built) takes 6× as long as its 1st, a 10 KB array's 6th disk also takes 6×
// its own base time, and so on. N is read from disksBuiltTotal (the permanent, cumulative count) at
// the moment the build STARTS, not the ladder's own current level.
const getDiskBuildSeconds = (state, capacityBits) => {
  const ordinal = (state.intro.disksBuiltTotal?.[capacityBits] ?? 0) + 1
  return getDiskBuildBaseSeconds(state, capacityBits) * ordinal
}

// Disk sizes are real, Byte-accurate bit counts (see getDiskSize above), rendered in the SI B/KB/
// MB/… scale — Storage stays SI even though Memory Capacity's own balance/capacity display moved
// to binary units (see formatBitsInNearestSiUnit/formatBitsInNearestUnit above, and
// docs/DESIGN_HISTORY.md for the pre-binary-split history, including the "kilobit" formatting bug
// this same SI scale originally fixed). A thin, semantically-named alias, kept so call sites read
// "format this disk's size" rather than reaching for the SI helper directly.
export const formatDiskSize = formatBitsInNearestSiUnit

// Formats a raw bit count (a Disk Cache block, or a whole cache) in its own dedicated bit-scale
// unit (Kb/Mb/Gb/… — see BIT_UNIT_SYMBOLS/getBitUnit above) rather than formatDiskSize's
// Byte-scale one — StoragePage uses this for cache amounts specifically, keeping formatDiskSize
// for the disks themselves.
export const formatCacheSize = bits => formatMemoryAmount(bits, getBitUnit(bits))

// Every Disk size worth showing (ByteFoundryPage's own brief per-size summary, StoragePage's full
// per-size squares rows): every size ever built, any size still held (a save/seed could hold disks
// without a matching disksBuiltTotal entry — e.g. a migrated pre-ladder save), plus whatever's
// currently offered (even at 0 built, so its row/goal is visible before the first one is built) —
// ascending, so rows read smallest-to-largest.
export const getDiskSizesToShow = state => {
  const disksBuiltTotal = state.intro?.disksBuiltTotal ?? {}
  const disks = state.intro?.disks ?? {}
  const currentSize = getDiskSize(state)
  return [
    ...new Set([
      ...Object.keys(disksBuiltTotal).map(Number),
      ...Object.keys(disks).map(Number),
      currentSize,
    ]),
  ]
    .filter(size => (disksBuiltTotal[size] ?? 0) > 0 || (disks[size] ?? 0) > 0 || size === currentSize)
    .sort((a, b) => a - b)
}

// "Disk Build"'s own forced-priority turn: available AND nothing ranked above it (Disk Fill,
// Bandwidth) currently is. Used by startDiskBuild's own guard below and directly by
// ByteFoundryPage/StoragePage to disable the button the same way.
export const isDiskBuildTurnAvailable = state =>
  isDiskBuildAvailable(state) && !isDiskFillAvailable(state) && !isBandwidthAvailable(state)

// Starts building one EMPTY disk sized to getDiskSize(state): spends getDiskCost(that size) bits
// from Memory immediately (the intro's own separate currency pool — same "bypasses
// isProductionFrozen entirely" posture as Combine/Sacrifice/Invest, since none of this touches
// resources.base) and sets intro.diskBuild to a { size, remainingSeconds, totalSeconds } countdown
// (see getDiskBuildSeconds above/tickDiskBuild below) — the array itself only actually gains the
// new container, and starts accepting IO again, once that countdown finishes. `totalSeconds` is
// fixed at the build's own starting duration (tickDiskBuild only ever updates remainingSeconds),
// kept alongside remainingSeconds purely so the UI can render a "% built" progress fill without
// having to recompute getDiskBuildSeconds itself (which depends on disksBuiltTotal at the moment
// the build started, not the moment it's being rendered). No-op below cost, or if an array is
// already mid-build (isDiskBuildAvailable). Only ever queues ONE build at a time — only one size
// is ever offered on the ladder, so there's nothing to parallelize.
export const startDiskBuild = state => {
  if (!isDiskBuildTurnAvailable(state)) return state

  const size = getDiskSize(state)
  const cost = getDiskCost(size)
  const totalSeconds = getDiskBuildSeconds(state, size)

  return {
    ...state,
    intro: {
      ...state.intro,
      bits: state.intro.bits - cost,
      diskBuild: { size, remainingSeconds: totalSeconds, totalSeconds },
    },
  }
}

// Counts down intro.diskBuild's remainingSeconds every tick — a no-op when no build is in
// progress. Once the countdown reaches (or crosses) zero, the array's rebuild is complete:
// disksBuiltTotal[size] increments (the container itself now exists, empty, ready for
// read-cache / write-cache fill) and diskBuild clears, re-enabling every IO operation against
// that size's array.
export const tickDiskBuild = elapsedSeconds => state => {
  const build = state.intro.diskBuild
  if (!build) return state

  const remainingSeconds = build.remainingSeconds - elapsedSeconds
  if (remainingSeconds > TICK_ACCUMULATION_EPSILON) {
    return { ...state, intro: { ...state.intro, diskBuild: { ...build, remainingSeconds } } }
  }

  return {
    ...state,
    intro: {
      ...state.intro,
      diskBuild: null,
      disksBuiltTotal: {
        ...state.intro.disksBuiltTotal,
        [build.size]: (state.intro.disksBuiltTotal?.[build.size] ?? 0) + 1,
      },
    },
  }
}

export const getNextDiskLadderSize = sourceSize => sourceSize * DISK_LADDER_SIZE_MULTIPLIER

export const getDiskWriteCacheMerge = (state, targetSize) =>
  state.intro?.diskWriteCache?.[targetSize] ?? null

export const getDiskWriteCacheSegmentFill = merge => {
  if (!merge || merge.segmentsCollected >= DISK_ARRAY_LADDER_CAP) return 0
  if (merge.segmentTotalSeconds <= 0) return 0
  return 1 - merge.segmentRemainingSeconds / merge.segmentTotalSeconds
}

export const getDiskWriteCacheFlushFill = merge => {
  if (!merge || merge.segmentsCollected < DISK_ARRAY_LADDER_CAP) return 0
  if (merge.flushTotalSeconds <= 0) return 0
  return 1 - merge.flushRemainingSeconds / merge.flushTotalSeconds
}

export const isDiskWriteCacheCollectPaused = (state, targetSize) => {
  const merge = getDiskWriteCacheMerge(state, targetSize)
  if (!merge || merge.segmentsCollected >= DISK_ARRAY_LADDER_CAP) return false
  return isDiskRedeemable(state, merge.sourceSize)
}

const canStartDiskWriteCacheMerge = (state, sourceSize, targetSize) => {
  if (state.intro.diskBuild?.size === sourceSize || state.intro.diskBuild?.size === targetSize) return false
  if (state.intro.diskWriteCache?.[targetSize]) return false
  if ((state.intro.disks?.[sourceSize] ?? 0) < DISK_ARRAY_LADDER_CAP) return false
  if ((state.intro.disksBuiltTotal?.[targetSize] ?? 0) <= 0) return false
  return (state.intro.disksBuiltTotal[targetSize] ?? 0) > (state.intro.disks?.[targetSize] ?? 0)
}

const decrementFullDiskCount = (disks, size) => {
  const full = disks[size] ?? 0
  if (full <= 1) {
    const { [size]: _removed, ...rest } = disks
    return rest
  }
  return { ...disks, [size]: full - 1 }
}

// The write-cache flush into the target's own empty container is a DISK filling FROM a cache — the
// same DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER rate a read-cache flush uses — sized to the
// target's own full capacity. Unlike a fresh build (getDiskBuildSeconds), this isn't scaled by
// ordinal: refilling an already-built empty container from cache is a pure bandwidth-limited
// transfer, not a build.
const getDiskWriteCacheFlushSeconds = (state, targetSize) => {
  const rate = getIntroProductionRate(state.intro ?? {}) * DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER
  return targetSize / Math.max(rate, Number.MIN_VALUE)
}

// Each of the 10 collect segments is a CACHE filling FROM Disks — one full source disk's worth of
// bits, at CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER times the current production rate. 10 segments
// of one source disk each sum to exactly one target disk's own size (source × DISK_LADDER_SIZE_MULTIPLIER
// = target), so with DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER and CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER
// currently equal, the full collect phase happens to take the same total time as the flush phase
// below — coincidental, not structural: the two phases pace conceptually distinct fills (cache-from-
// disk vs. disk-from-cache) and would diverge if either multiplier changed independently.
const getDiskWriteCacheSegmentSeconds = (state, sourceSize) => {
  const rate = getIntroProductionRate(state.intro ?? {}) * CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER
  return sourceSize / Math.max(rate, Number.MIN_VALUE)
}

// Upward ladder merges via per-target write cache — collect 10 segments from the source size
// (timed; pauses while that source size has an active tier claim), then flush into one target
// disk (timed independently — see getDiskWriteCacheFlushSeconds/getDiskWriteCacheSegmentSeconds
// above; never pauses). Empty at rest. Smallest source sizes first.
export const tickDiskWriteCache = elapsedSeconds => state => {
  let intro = state.intro
  let disks = intro.disks ?? {}
  let diskWriteCache = { ...(intro.diskWriteCache ?? {}) }
  let changed = false

  const builtSizes = Object.keys(intro.disksBuiltTotal ?? {})
    .map(Number)
    .sort((a, b) => a - b)

  for (const sourceSize of builtSizes) {
    const targetSize = getNextDiskLadderSize(sourceSize)
    if (!canStartDiskWriteCacheMerge({ ...state, intro: { ...intro, disks, diskWriteCache } }, sourceSize, targetSize)) {
      continue
    }
    const mergeState = { ...state, intro: { ...intro, disks, diskWriteCache } }
    const flushTotalSeconds = getDiskWriteCacheFlushSeconds(mergeState, targetSize)
    const segmentTotalSeconds = getDiskWriteCacheSegmentSeconds(mergeState, sourceSize)
    diskWriteCache[targetSize] = {
      sourceSize,
      segmentsCollected: 0,
      segmentRemainingSeconds: segmentTotalSeconds,
      segmentTotalSeconds,
      flushRemainingSeconds: flushTotalSeconds,
      flushTotalSeconds,
    }
    changed = true
  }

  for (const targetSize of Object.keys(diskWriteCache).map(Number).sort((a, b) => a - b)) {
    const merge = diskWriteCache[targetSize]
    if (!merge) continue

    if (merge.segmentsCollected < DISK_ARRAY_LADDER_CAP) {
      if (isDiskRedeemable({ ...state, intro: { ...intro, disks, diskWriteCache } }, merge.sourceSize)) {
        continue
      }

      let segmentRemainingSeconds = merge.segmentRemainingSeconds - elapsedSeconds
      if (segmentRemainingSeconds > TICK_ACCUMULATION_EPSILON) {
        diskWriteCache[targetSize] = { ...merge, segmentRemainingSeconds }
        changed = true
        continue
      }

      const sourceFull = disks[merge.sourceSize] ?? 0
      if (sourceFull <= 0) {
        diskWriteCache[targetSize] = { ...merge, segmentRemainingSeconds: 0 }
        changed = true
        continue
      }

      disks = decrementFullDiskCount(disks, merge.sourceSize)
      const segmentsCollected = merge.segmentsCollected + 1
      if (segmentsCollected >= DISK_ARRAY_LADDER_CAP) {
        diskWriteCache[targetSize] = {
          ...merge,
          segmentsCollected,
          flushRemainingSeconds: merge.flushTotalSeconds,
        }
      } else {
        diskWriteCache[targetSize] = {
          ...merge,
          segmentsCollected,
          segmentRemainingSeconds: merge.segmentTotalSeconds,
        }
      }
      changed = true
      continue
    }

    let flushRemainingSeconds = merge.flushRemainingSeconds - elapsedSeconds
    if (flushRemainingSeconds > TICK_ACCUMULATION_EPSILON) {
      diskWriteCache[targetSize] = { ...merge, flushRemainingSeconds }
      changed = true
      continue
    }

    const builtTotalAtTarget = intro.disksBuiltTotal?.[targetSize] ?? 0
    const fullAtTarget = disks[targetSize] ?? 0
    if (builtTotalAtTarget > fullAtTarget) {
      disks = { ...disks, [targetSize]: fullAtTarget + 1 }
    }
    const { [targetSize]: _removed, ...remainingWriteCache } = diskWriteCache
    diskWriteCache = remainingWriteCache
    changed = true
  }

  if (!changed) return state
  return { ...state, intro: { ...intro, disks, diskWriteCache } }
}

// Memory claim for read caches, then timed read-cache → disk flush when no tier claim blocks
// ladder use (tier match keeps first claim on disks/cache for Factory funding). Flush duration is
// the time to fill one read-cache block — a DISK filling FROM a cache — at
// DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER times the current Byte Foundry production rate (see
// getDiskReadCacheFlushSeconds). Disks above the smallest ladder size also fill via write-cache
// flush from the size below — see tickDiskWriteCache. Unconditional, bypasses isProductionFrozen.
// Same-reference no-op when nothing changed. `elapsedSeconds` advances in-flight flushes (0 is
// valid — start newly eligible flushes without counting time down).
export const getDiskReadCacheFlush = (state, size) =>
  state.intro?.diskReadCacheFlush?.[size] ?? null

export const getDiskReadCacheFlushSeconds = (state, size) => {
  const blockBits = size / DISK_CACHE_BLOCK_COUNT
  const rate = getIntroProductionRate(state.intro ?? {}) * DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER
  // Rate is >= 1 by construction once intro fields are valid; guard corrupted/partial saves.
  return blockBits / Math.max(rate, Number.MIN_VALUE)
}

export const getDiskReadCacheFlushFill = flush => {
  if (!flush || flush.totalSeconds <= 0) return 0
  return 1 - flush.remainingSeconds / flush.totalSeconds
}

export const isDiskReadCacheFlushPaused = (state, size) => {
  const flush = getDiskReadCacheFlush(state, size)
  if (!flush) return false
  return isDiskRedeemable(state, size)
}

// Only the pool's own smallest disk size — the one whose sub-slot is DATA_LAKE_SUB_SIZES[0] — ever
// keeps a read cache drawing straight from Memory; every larger size in the same pool fills
// exclusively via write-cache ripple from the size below (see tickDiskWriteCache, which never
// touches diskCache/diskReadCacheFlush at all). Running both fill paths on every size was pure
// redundancy — two mechanisms pouring into the same container. A size with no Data Lake tier
// mapping at all (getDataLakeSubSize returns null — no pool exists yet past DATA_LAKE_MAX_DISK_LADDER_STEP)
// is excluded by construction, same as everything else keyed off that helper.
export const isDiskReadCacheEligible = size => getDataLakeSubSize(size) === DATA_LAKE_SUB_SIZES[0]

export const tickDiskAutoFill = (elapsedSeconds = 0) => state => {
  const builtTotal = state.intro?.disksBuiltTotal ?? {}
  const buildingSize = state.intro.diskBuild?.size
  const capacity = state.intro?.capacity ?? 0
  let bits = state.intro.bits
  let disks = state.intro.disks ?? {}
  let diskCache = state.intro.diskCache ?? {}
  let diskReadCacheFlush = { ...(state.intro.diskReadCacheFlush ?? {}) }
  let changed = false

  // Self-heal a save carrying leftover diskCache/diskReadCacheFlush for a size that no longer
  // keeps a read cache (see isDiskReadCacheEligible above) — refund whatever's cached back into
  // Memory rather than stranding it where nothing will ever fill or flush it again. A
  // same-reference no-op (aside from the loop itself) once nothing is stranded.
  for (const sizeStr in diskCache) {
    const size = Number(sizeStr)
    if (isDiskReadCacheEligible(size)) continue
    bits += diskCache[size]
    const { [size]: _removedCache, ...restCache } = diskCache
    diskCache = restCache
    changed = true
  }
  for (const sizeStr in diskReadCacheFlush) {
    const size = Number(sizeStr)
    if (isDiskReadCacheEligible(size)) continue
    const { [size]: _removedFlush, ...restFlush } = diskReadCacheFlush
    diskReadCacheFlush = restFlush
    changed = true
  }

  const sizes = Object.keys(builtTotal)
    .map(Number)
    .filter(size => size !== buildingSize) // that array's IO is disallowed while it rebuilds
    .filter(isDiskReadCacheEligible)
    .sort((a, b) => a - b)

  // Drop flushes for sizes that can no longer complete (mid-build, or no empty container left).
  for (const sizeStr in diskReadCacheFlush) {
    const size = Number(sizeStr)
    if (size === buildingSize || (builtTotal[size] ?? 0) <= (disks[size] ?? 0)) {
      const { [size]: _removed, ...rest } = diskReadCacheFlush
      diskReadCacheFlush = rest
      changed = true
    }
  }

  // Pass 1 — refill caches toward full in whole-block quanta (Memory progress stays visible),
  // capped at CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER times the current Byte Foundry production
  // rate — a CACHE filling FROM Memory can drain a big banked balance faster than live production,
  // but never instantly, no matter how much has piled up while blocked. One shared budget across
  // every eligible size this call, since it's all drawn from the same Memory bandwidth. Skip sizes
  // mid-flush: their cache is locked full until the pour completes or cancels.
  let memoryToCacheBudget = CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER * getIntroProductionRate(state.intro ?? {}) * elapsedSeconds
  for (const size of sizes) {
    if (diskReadCacheFlush[size]) continue
    const blockBits = size / DISK_CACHE_BLOCK_COUNT
    for (;;) {
      const cached = diskCache[size] ?? 0
      if (cached >= size || bits <= 0 || memoryToCacheBudget <= 0) break

      const need = size - cached
      const transferUnit = Math.min(blockBits, need, memoryToCacheBudget)
      if (bits >= transferUnit) {
        bits -= transferUnit
        diskCache = { ...diskCache, [size]: cached + transferUnit }
        memoryToCacheBudget -= transferUnit
        changed = true
        continue
      }
      // Memory is full but capacity itself is smaller than one block on this size — dump the
      // full balance rather than stalling the refill forever on a large array.
      if (capacity > 0 && capacity < transferUnit && bits >= capacity) {
        const add = Math.min(need, bits, memoryToCacheBudget)
        bits -= add
        diskCache = { ...diskCache, [size]: cached + add }
        memoryToCacheBudget -= add
        changed = true
        continue
      }
      break
    }
  }

  // Pass 2 — start timed read-cache → empty disk flushes when tier isn't reserving this size for
  // Factory funding. Skip sizes with an active write-cache merge so read-cache flush cannot race
  // write-cache flush. Duration = time to fill one read-cache block at current production rate.
  for (const size of sizes) {
    if (diskReadCacheFlush[size]) continue
    if (getDiskWriteCacheMerge(state, size)) continue
    const hasEmptyContainer = (builtTotal[size] ?? 0) > (disks[size] ?? 0)
    const cached = diskCache[size] ?? 0
    if (!hasEmptyContainer || cached < size) continue
    if (isDiskRedeemable(state, size)) continue
    const totalSeconds = getDiskReadCacheFlushSeconds(state, size)
    diskReadCacheFlush[size] = { remainingSeconds: totalSeconds, totalSeconds }
    changed = true
  }

  // Pass 3 — count down in-flight flushes; pause while tier match claims this size. Completing
  // empties the full read cache into one disk (same net effect as the former instant pour).
  const flushSizes = []
  for (const sizeStr in diskReadCacheFlush) {
    flushSizes.push(Number(sizeStr))
  }
  flushSizes.sort((a, b) => a - b)
  for (const size of flushSizes) {
    const flush = diskReadCacheFlush[size]
    if (!flush) continue
    if (isDiskRedeemable({ ...state, intro: { ...state.intro, bits, disks, diskCache, diskReadCacheFlush } }, size)) {
      continue
    }

    let remainingSeconds = flush.remainingSeconds - elapsedSeconds
    if (remainingSeconds > TICK_ACCUMULATION_EPSILON) {
      if (remainingSeconds !== flush.remainingSeconds) {
        diskReadCacheFlush[size] = { ...flush, remainingSeconds }
        changed = true
      }
      continue
    }

    const hasEmptyContainer = (builtTotal[size] ?? 0) > (disks[size] ?? 0)
    const cached = diskCache[size] ?? 0
    if (hasEmptyContainer && cached >= size) {
      diskCache = { ...diskCache, [size]: cached - size }
      disks = { ...disks, [size]: (disks[size] ?? 0) + 1 }
    }
    const { [size]: _removed, ...rest } = diskReadCacheFlush
    diskReadCacheFlush = rest
    changed = true
  }

  if (!changed) return state
  return { ...state, intro: { ...state.intro, bits, disks, diskCache, diskReadCacheFlush } }
}

// True when a size currently has at least one FULL disk that could redeem right now — Cache is
// always blocked while this holds (disks take priority over cache for matching level costs).
const hasFullRedeemableDiskAtSize = (state, capacityBits) =>
  (state.intro?.disks?.[capacityBits] ?? 0) > 0 &&
  state.intro?.diskBuild?.size !== capacityBits &&
  isDiskRedeemable(state, capacityBits)

// Whether a size's cache currently has at least one full, releasable block (see
// DISK_CACHE_BLOCK_COUNT in layers.js) — false while that size's array is mid-build (IO disallowed
// — see tickDiskBuild), while capacityBits' own fixed corresponding tier isn't currently at the
// required level (see isDiskRedeemable below — a released block is only ever spendable toward an
// eligible tier's own level, so with none eligible there's nothing for it to fund), OR while a full
// redeemable disk of that same size exists (disks always take priority — cache is fallback only).
export const isDiskCacheBlockReleasable = (state, capacityBits) =>
  state.intro.diskBuild?.size !== capacityBits &&
  !getDiskReadCacheFlush(state, capacityBits) &&
  isDiskRedeemable(state, capacityBits) &&
  !hasFullRedeemableDiskAtSize(state, capacityBits) &&
  (state.intro.diskCache?.[capacityBits] ?? 0) >= capacityBits / DISK_CACHE_BLOCK_COUNT

// Manually releases one full cache block (capacityBits / DISK_CACHE_BLOCK_COUNT bits) of a size's
// array into resources.base (Bits) — Cache's only player-facing use: funding the matching
// main-game tier's current level-block purchases while isDiskRedeemable holds for this size.
// Disks fill from a timed read-cache flush (see tickDiskAutoFill), so releasing a cache block
// never races a cache→disk pour while that size is mid-flush (isDiskCacheBlockReleasable is false
// then); tickDiskAutoFill refills the gap in whole-block transfers once Memory has enough again.
// No-op if nothing releasable (see isDiskCacheBlockReleasable).
export const releaseDiskCacheBlock = capacityBits => state => {
  if (!isDiskCacheBlockReleasable(state, capacityBits)) return state

  const blockBits = capacityBits / DISK_CACHE_BLOCK_COUNT
  const cached = state.intro.diskCache?.[capacityBits] ?? 0

  return {
    ...state,
    resources: {
      ...state.resources,
      [MONEY_ID]: (state.resources[MONEY_ID] ?? 0) + blockBits,
    },
    intro: {
      ...state.intro,
      diskCache: { ...state.intro.diskCache, [capacityBits]: cached - blockBits },
    },
  }
}

// A Disk's size fixes, once and for all, exactly ONE (tier, level) pair it can ever redeem into —
// a permanent "nice one to one mapping" rather than a dynamic price coincidence. The tier is
// whichever main-game tier shares this size's Data Lake grouping (getDataLakeTierIndex — disk
// steps 1-3/1 KB-100 KB → tier01/Kilobytes, steps 4-6/1 MB-100 MB → tier02/Megabytes, and so on,
// the same KB/MB/GB/… naming both TIER_DEFINITIONS and DATA_LAKE_TIER_LABELS already share); the
// level is this size's own POSITION within that tier's 3-step group (getDataLakeSubSize's
// position — 1st/2nd/3rd, i.e. level 1/2/3) — so every tier's own first three levels each get
// exactly one corresponding disk size, permanently, regardless of how that tier's price ever
// moves. This replaced an earlier design where a disk redeemed into "whichever tier's CURRENT
// per-unit cost happens to exactly match its size right now" — a coincidence that could
// permanently strand a disk if a tier's autobuyer jumped its price straight past that exact value
// in one tick (a banked attempt budget catching up after a broke/paused stretch), needed a
// tie-break rule for when more than one tier's price coincided, and made "is this disk useful
// right now" unpredictable from the player's own perspective. See docs/DESIGN_HISTORY.md.
const getDiskRequiredTierLevel = capacityBits => {
  const subSize = getDataLakeSubSize(capacityBits)
  if (!subSize) return null
  return DATA_LAKE_SUB_SIZES.indexOf(subSize) + 1
}

// Which tier, if any, a Disk of `capacityBits` can redeem into RIGHT NOW — its one fixed
// corresponding tier (see getDiskRequiredTierLevel above), but only while that tier is CURRENTLY
// sitting at EXACTLY its required level (not yet there, or already past it, both mean this size is
// not redeemable this cycle — the past-it case is what tickDiskAutoDeposit picks up instead, see
// its own doc comment). undefined when no corresponding tier exists (a size beyond
// DATA_LAKE_MAX_DISK_LADDER_STEP) or the current level doesn't match.
const getMatchingTierForDiskSize = (state, capacityBits) => {
  const tierIndex = getDataLakeTierIndex(capacityBits)
  const requiredLevel = getDiskRequiredTierLevel(capacityBits)
  if (!tierIndex || !requiredLevel) return undefined
  const tier = TIER_DEFINITIONS[tierIndex - 1]
  if (!tier) return undefined
  return (state.purchaseLevels?.[tier.id] ?? 1) === requiredLevel ? tier : undefined
}

export const isDiskRedeemable = (state, capacityBits) =>
  getMatchingTierForDiskSize(state, capacityBits) !== undefined

// Byte Foundry pages call this directly (rather than getMatchingTierForDiskSize, kept internal) to
// name which tier a disk would actually redeem into right now, or null if none currently matches —
// e.g. "Redeems 1 10 KB disk for 1 free Megabyte."
export const getDiskRedeemTierName = (state, capacityBits) =>
  getMatchingTierForDiskSize(state, capacityBits)?.name ?? null

// Redeems one currently-FULL disk of `capacityBits`, completing its corresponding tier's CURRENT
// level in one shot — grants exactly enough free units to finish out the level's own purchase
// block (getPurchaseBlockSize minus whatever progress already exists, manually bought or not),
// rolling that tier straight into its next level, via grantTierUnits — same "pays from a separate
// currency pool, bypasses isProductionFrozen/isTierUnlocked/cost entirely" rationale as
// convertIntroBitsToKilobytes — a disk's contents came from Memory via tickDiskAutoFill already,
// not from a further transfer. "Fills one level" is deliberately a full level-completion, not a
// single unit like a manual/autobuyer purchase — a disk's fixed one-to-one level correspondence
// (see getMatchingTierForDiskSize) would otherwise take many redemptions of a size the ladder has
// already moved past to finish that one level. The disk itself is NOT lost — it becomes
// empty again (disksBuiltTotal is untouched), re-entering the fillable pool for tickDiskAutoFill to
// fill again later (next tick, or same tick via tickGame's post-auto-redeem ASAP pass — never
// sync-filled here, so clearing the last full disk can hand Memory to Bandwidth under Forced
// Priority). No-op if no disk of that size is currently full, if that size's array is
// currently mid-build (IO disallowed — see tickDiskBuild), or if its corresponding tier isn't
// currently at exactly this size's required level (see isDiskRedeemable).
export const redeemDisk = capacityBits => state => {
  const full = state.intro.disks?.[capacityBits] ?? 0
  if (full <= 0) return state
  if (state.intro.diskBuild?.size === capacityBits) return state
  const tier = getMatchingTierForDiskSize(state, capacityBits)
  if (!tier) return state

  const { [capacityBits]: _removed, ...remainingDisks } = state.intro.disks
  const nextDisks = full > 1 ? { ...state.intro.disks, [capacityBits]: full - 1 } : remainingDisks

  // getPurchaseBlockSize(state) is read once here, from the state BEFORE any units are granted, then
  // passed as a fixed quantity into grantTierUnits' own loop below — which recomputes
  // getPurchaseBlockSize fresh on every iteration off its own mutating state. That's only safe
  // because the disk-ladder currently never reaches tier.id === getLastTierId() (disks are
  // capped at MAX_ACTIVE_DISK_LADDER_STEP, tier01's own first 3 levels — see DISK_ARRAY_LADDER_CAP
  // above), so the loop can never cross a PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS boundary of
  // THIS tier mid-grant and have the block size grow out from under remainingInLevel. Once a future
  // storage pool (epic #456) lets disks reach the last tier, this fixed snapshot would need
  // recomputing inside the loop instead — see docs/DESIGN_HISTORY.md.
  const remainingInLevel = getPurchaseBlockSize(state) - (state.purchaseLevelProgress?.[tier.id] ?? 0)

  return grantTierUnits(tier.id, remainingInLevel)({
    ...state,
    intro: { ...state.intro, disks: nextDisks },
  })
}

// Whether tierId's own unit-buying autobuyer is currently actually running — unlocked (purchased,
// autobuyers[tierId] non-null) AND not paused (autobuyersEnabled[tierId], defaulting true) — the
// same two-part check tickGame's own autobuyer loop applies inline. Used below to gate a Disk's
// auto-redeem on whichever tier it would currently redeem into.
const isTierAutobuyerActive = (state, tierId) =>
  (state.autobuyers?.[tierId] ?? null) !== null && (state.autobuyersEnabled?.[tierId] ?? true)

// True when a full disk of `capacityBits` will auto-redeem on the next tickDiskAutoRedeem /
// tickGame pass: currently full, not mid-build, not already auto-redeemed this Prestige cycle,
// and the matching tier's unit-buying autobuyer is unlocked and unpaused. DiskArrayRow uses this
// to visually distinguish "will auto-redeem" from "tap to redeem" (manual — matching tier has no
// active autobuyer, or this size already used its one auto-redeem this cycle). Cache blocks auto-
// transfer only via tickDiskAutoReleaseCache when the matching tier's Smart autobuyer is active
// and no full redeemable disk of that size exists (see isDiskCacheBlockAutoReleaseEligible).
export const isDiskAutoRedeemEligible = (state, capacityBits) => {
  if ((state.intro?.disks?.[capacityBits] ?? 0) <= 0) return false
  if (state.intro?.diskBuild?.size === capacityBits) return false
  if (state.intro?.diskAutoRedeemedSizes?.[capacityBits]) return false
  const tier = getMatchingTierForDiskSize(state, capacityBits)
  return tier !== undefined && isTierAutobuyerActive(state, tier.id)
}

// True when a full disk of `capacityBits` is redeemable right now but will NOT auto-redeem — the
// player must click (see redeemDisk). Complementary to isDiskAutoRedeemEligible for UI affordances.
export const isDiskManualRedeemAvailable = (state, capacityBits) =>
  (state.intro?.disks?.[capacityBits] ?? 0) > 0 &&
  state.intro?.diskBuild?.size !== capacityBits &&
  isDiskRedeemable(state, capacityBits) &&
  !isDiskAutoRedeemEligible(state, capacityBits)

// True when a cache block of `capacityBits` will auto-release on the next tickDiskAutoReleaseCache
// / tickGame pass: releasable right now (no full redeemable disk of that size), and the matching
// tier's unit autobuyer is active AND Smart. DiskArrayRow uses this to distinguish auto cache
// release from manual-only release (non-Smart tiers, or Smart with a disk still available).
export const isDiskCacheBlockAutoReleaseEligible = (state, capacityBits) => {
  if (!isDiskCacheBlockReleasable(state, capacityBits)) return false
  const tier = getMatchingTierForDiskSize(state, capacityBits)
  return tier !== undefined &&
    isTierAutobuyerActive(state, tier.id) &&
    Boolean(state.smartAutobuyer?.[tier.id])
}

// True when a cache block is releasable right now but will NOT auto-release — the player must
// click (see releaseDiskCacheBlock). Complementary to isDiskCacheBlockAutoReleaseEligible.
export const isDiskCacheBlockManualReleaseAvailable = (state, capacityBits) =>
  isDiskCacheBlockReleasable(state, capacityBits) &&
  !isDiskCacheBlockAutoReleaseEligible(state, capacityBits)

// Every Disk size currently "relevant" for a matching-tier Foundry subset: any size from
// getDiskSizesToShow whose own fixed corresponding tier is currently at that size's required level
// right now (cache releasable / disk redeemable toward that tier), PLUS always the highest size in
// that list — even when it does not currently match (usually the ladder's current / incomplete
// array). Ascending. The live Foundry UI lists every getDiskSizesToShow size as continuous sections instead; this helper remains for
// the narrower matching subset (issue #389).
export const getRelevantDiskSizesForFoundry = state => {
  const shown = getDiskSizesToShow(state)
  if (shown.length === 0) return []
  const matching = shown.filter(size => getDiskRedeemTierName(state, size) !== null)
  const highest = shown[shown.length - 1]
  if (matching.includes(highest)) return matching
  return [...matching, highest]
}

// Auto-redeem convenience — a no-op for any size whose currently-matching tier (see
// getMatchingTierForDiskSize above) doesn't have its own unit-buying autobuyer currently active
// (see isTierAutobuyerActive above), or that matches no tier at all right now: "whenever there is
// a level whose cost equals a Disk, it shall be redeemed to fulfill it if [the] autobuyer is
// enable[d] for the corresponding tier." With no active autobuyer for the matching tier, a
// full/redeemable disk simply waits for a manual click (see redeemDisk) instead. A given size
// auto-redeems at most ONCE per real Prestige cycle (see diskAutoRedeemedSizes, which resets fresh
// every real Prestige — prestigeGame) — a disk that refills later the same cycle (see
// tickDiskAutoFill) needs a manual click for the rest of it. Redeems only the smallest eligible
// size per call — redeeming can itself grant a whole level's worth of units and advance that
// tier's level (via grantTierUnits), which can in turn change whether OTHER sizes' own fixed tier
// is now sitting at ITS required level, so redeeming more than one size correctly needs everything
// recomputed in between; rather than looping that here,
// this piggybacks on tickGame's own ~10Hz cadence (see TICK_RATE_MS) to work through multiple
// eligible disks over the next several ticks — imperceptibly fast in practice. Called from every
// branch of tickGame, frozen or not (see there), so it always reacts to every tier's truly final
// level for the tick, not a stale mid-tick one. tickGame re-runs tickDiskAutoFill only when this
// actually changes state, so the emptied container's cache can top up ASAP the same tick when
// Memory allows — without a trailing fill on every no-op pass.
export const tickDiskAutoRedeem = state => {
  const alreadyRedeemedThisCycle = state.intro?.diskAutoRedeemedSizes ?? {}
  const buildingSize = state.intro.diskBuild?.size
  const eligibleSize = Object.keys(state.intro.disks ?? {})
    .map(Number)
    .filter(size => (state.intro.disks[size] ?? 0) > 0)
    .filter(size => size !== buildingSize)
    .filter(size => !alreadyRedeemedThisCycle[size])
    .filter(size => {
      const tier = getMatchingTierForDiskSize(state, size)
      return tier !== undefined && isTierAutobuyerActive(state, tier.id)
    })
    .sort((a, b) => a - b)[0]
  if (eligibleSize === undefined) return state

  const redeemed = redeemDisk(eligibleSize)(state)
  return {
    ...redeemed,
    intro: {
      ...redeemed.intro,
      diskAutoRedeemedSizes: { ...redeemed.intro.diskAutoRedeemedSizes, [eligibleSize]: true },
    },
  }
}

// Auto-release convenience for Smart autobuyers — a no-op unless there's an eligible size whose
// cache holds at least one full block, no full redeemable disk of that size exists, and the
// currently-matching tier's own unit-buying autobuyer is active AND Smart. Non-Smart tiers (or
// Smart tiers while a matching disk is still full) leave cache for manual release only. Releases
// the smallest eligible size per call — same cadence as tickDiskAutoRedeem. Called from every
// branch of tickGame via tickStorage, frozen or not.
export const tickDiskAutoReleaseCache = state => {
  const buildingSize = state.intro?.diskBuild?.size
  const eligibleSize = Object.keys(state.intro.diskCache ?? {})
    .map(Number)
    .filter(size => size !== buildingSize)
    .filter(size => isDiskCacheBlockAutoReleaseEligible(state, size))
    .sort((a, b) => a - b)[0]
  if (eligibleSize === undefined) return state
  return releaseDiskCacheBlock(eligibleSize)(state)
}

// --- Data Lakes --- see DATA_LAKE_* constants in layers.js. Disks deposit into the lake for
// their storage denomination; Booster purchases at the matching compute tier spend lake capacity.

export const getDiskLadderStep = sizeBits => {
  if (!(sizeBits > 0) || !Number.isFinite(sizeBits)) return null
  const ratio = sizeBits / DISK_LADDER_BASE_SIZE_BITS
  if (ratio < 1) return null
  const step = Math.round(Math.log10(ratio)) + 1
  if (step < 1 || getDiskLadderSizeBits(step) !== sizeBits) return null
  return step
}

export const getDataLakeTierIndex = sizeBits => {
  const step = getDiskLadderStep(sizeBits)
  if (!step || step > DATA_LAKE_MAX_DISK_LADDER_STEP) return null
  return Math.floor((step - 1) / DATA_LAKE_SUB_SIZES.length) + 1
}

export const getDataLakeSubSize = sizeBits => {
  const step = getDiskLadderStep(sizeBits)
  if (!step || step > DATA_LAKE_MAX_DISK_LADDER_STEP) return null
  return DATA_LAKE_SUB_SIZES[(step - 1) % DATA_LAKE_SUB_SIZES.length]
}

export const getDataLakeTierLabel = tierIndex =>
  DATA_LAKE_TIER_LABELS[tierIndex - 1] ?? null

export const getDataLakeTier = (state, tierIndex) => {
  if (tierIndex < 1 || tierIndex > DATA_LAKE_TIER_COUNT) return null
  return state.intro?.dataLakes?.[tierIndex] ?? createEmptyDataLakeTier()
}

export const getDataLakeDepositedUnits = tierIndex => state => {
  const lake = getDataLakeTier(state, tierIndex)
  if (!lake) return 0
  const { deposits } = lake
  return DATA_LAKE_SUB_SIZES.reduce(
    (sum, sub) => sum + (deposits[sub] ?? 0) * sub,
    0,
  )
}

// Sum of one unit at each sub-size (1 + 10 + 100 = 111) — used below only for the
// decomposeDataLakeDeposits correctness argument. NOT an explicit design cap: a sub-slot's own
// count naturally never exceeds DISK_ARRAY_LADDER_CAP (10, since only 10 disks of a given size can
// ever be built — see isDiskArrayFullyBuilt), so the resulting 1,110-unit sum a lake could
// theoretically ever bank is just an incidental consequence of that limit, not a separately
// designed or enforced ceiling — the real, explicit, intentional cap is the doubling ladder below,
// which sits far under it (1,024 max) and is the one that actually binds in practice.
const DATA_LAKE_SUB_SIZE_TOTAL = DATA_LAKE_SUB_SIZES.reduce((sum, subSize) => sum + subSize, 0)

// A lake's own deposit capacity is THE explicit, purchasable, doubling ladder a player actually
// interacts with: starts at 1 unit (level 0) and doubles per doubleDataLakeCapacity purchase below,
// permanently hard-capped at DATA_LAKE_CAPACITY_MAX_LEVEL (1,024 units at level 10).
export const getDataLakeCapacityLevel = (state, tierIndex) =>
  getDataLakeTier(state, tierIndex)?.capacityLevel ?? 0

export const isDataLakeCapacityMaxed = (state, tierIndex) =>
  getDataLakeCapacityLevel(state, tierIndex) >= DATA_LAKE_CAPACITY_MAX_LEVEL

export const getDataLakeCapacity = (state, tierIndex) =>
  2 ** getDataLakeCapacityLevel(state, tierIndex)

// A lake's `deposits` (sub-slot counts, each 0..DISK_ARRAY_LADDER_CAP) are exactly the
// base-(DISK_ARRAY_LADDER_CAP+1) hundreds/tens/ones digit decomposition of its own deposited
// total, since the total is always 0..1,110 (in practice bounded far under that by
// getDataLakeCapacity's own 1,024 hard cap) and each digit place caps at DISK_ARRAY_LADDER_CAP. The
// greedy top-down cap-at-DISK_ARRAY_LADDER_CAP decomposition is exact because DISK_ARRAY_LADDER_CAP
// (10) is at least DATA_LAKE_SUB_SIZE_TOTAL / DATA_LAKE_SUB_SIZES[1] (111 / 10 = 11.1 rounded down
// to the nearest whole unit each place can actually hold) — below that threshold a capped-off
// remainder at a larger place isn't always absorbable by the smaller places' own combined capacity;
// DISK_ARRAY_LADDER_CAP is a fixed constant, so this holds for the whole game with no further
// reasoning needed about it ever changing at runtime. Starting a Booster spends however much of
// `cost` deposits can cover by re-deriving this decomposition from (deposited - fromDeposits) — see
// startBoosterTransfer below, which also reuses this same decomposition to work out which raw Disks
// fund any remaining cost — rather than tracking spend against a separate ledger, so "available" is
// always just however much is CURRENTLY deposited (see getDataLakeAvailableUnits): spent capacity
// is genuinely gone, not merely earmarked, and only comes back the same way it got there in the
// first place — depositDiskToDataLake, once that array rebuilds a replacement disk through the
// ordinary build/fill pipeline (see docs/DESIGN_HISTORY.md).
const decomposeDataLakeDeposits = total => {
  const deposits = {}
  let remainder = Math.max(0, total)
  for (const subSize of [...DATA_LAKE_SUB_SIZES].sort((a, b) => b - a)) {
    deposits[subSize] = Math.min(DISK_ARRAY_LADDER_CAP, Math.floor(remainder / subSize))
    remainder -= deposits[subSize] * subSize
  }
  return deposits
}

// Simply the lake's own currently-deposited total — there is no separate "used" ledger (see
// decomposeDataLakeDeposits above): a Booster purchase spends real deposited capacity, so
// "available" and "deposited" are the same number until more disks get deposited to replace what a
// purchase spent.
export const getDataLakeAvailableUnits = tierIndex => state =>
  getDataLakeDepositedUnits(tierIndex)(state)

// The nth Booster ever STARTED at a tier (completed or still in flight — see
// getDataLakeTransferCapacity/startBoosterTransfer below) costs n units. Counting in-flight
// transfers (not just `purchased`) matters once a lake can run more than one transfer at once:
// without it, starting several transfers back-to-back before any completes would charge them all
// the same cost, letting concurrency dodge the escalating curve.
export const getBoosterPurchaseCost = tierIndex => state => {
  const lake = getDataLakeTier(state, tierIndex)
  if (!lake) return 0
  return (lake.purchased ?? 0) + (lake.transfers?.length ?? 0) + 1
}

// A size's disk array must be COMPLETELY built out — every DISK_ARRAY_LADDER_CAP (10) disk ever
// built at that size — before any of its disks can be deposited to a Data Lake at all. This check
// is permanent/monotonic (disksBuiltTotal never decreases), unlike the "at least one currently full
// disk" check below, which fluctuates as disks are deposited and rebuilt. The per-sub-slot check
// below it (lake.deposits[subSize] >= DISK_ARRAY_LADDER_CAP) is a backstop, not a second design
// cap: it just keeps the deposits counter from exceeding how many disks of that size could ever
// exist — the real, intentional limit a player actually experiences is the lake's own doubling
// capacity (getDataLakeCapacity below), which sits far under it and is what actually gates deposits
// in practice.
const isDiskArrayFullyBuilt = (state, sizeBits) =>
  (state.intro?.disksBuiltTotal?.[sizeBits] ?? 0) >= DISK_ARRAY_LADDER_CAP

export const canDepositDiskToDataLake = (state, sizeBits) => {
  const tierIndex = getDataLakeTierIndex(sizeBits)
  const subSize = getDataLakeSubSize(sizeBits)
  if (!tierIndex || !subSize) return false
  if (!isDiskArrayFullyBuilt(state, sizeBits)) return false
  if ((state.intro.disks?.[sizeBits] ?? 0) < 1) return false
  if (state.intro.diskBuild?.size === sizeBits) return false
  const lake = getDataLakeTier(state, tierIndex)
  if ((lake.deposits[subSize] ?? 0) >= DISK_ARRAY_LADDER_CAP) return false
  const nextDeposited = getDataLakeDepositedUnits(tierIndex)(state) + subSize
  return nextDeposited <= getDataLakeCapacity(state, tierIndex)
}

export const depositDiskToDataLake = sizeBits => state => {
  if (!canDepositDiskToDataLake(state, sizeBits)) return state

  const tierIndex = getDataLakeTierIndex(sizeBits)
  const subSize = getDataLakeSubSize(sizeBits)
  const lake = getDataLakeTier(state, tierIndex)
  const nextDiskCount = (state.intro.disks[sizeBits] ?? 0) - 1
  const nextDisks = { ...state.intro.disks }
  if (nextDiskCount > 0) {
    nextDisks[sizeBits] = nextDiskCount
  } else {
    delete nextDisks[sizeBits]
  }

  return {
    ...state,
    intro: {
      ...state.intro,
      disks: nextDisks,
      dataLakes: {
        ...state.intro.dataLakes,
        [tierIndex]: {
          ...lake,
          deposits: {
            ...lake.deposits,
            [subSize]: (lake.deposits[subSize] ?? 0) + 1,
          },
        },
      },
    },
  }
}

// Auto-feeds a pool's single Data Lake — no manual click needed. Same eligibility as a manual
// depositDiskToDataLake (array fully built, a full disk on hand, an open sub-slot, room under the
// lake cap), PLUS deferring entirely to a disk that's currently redeemable for the main game
// (isDiskRedeemable): same "disks always take priority for matching level costs" rule read cache
// release already follows (see isDiskCacheBlockReleasable) — a disk whose own fixed corresponding
// tier is currently at the required level stays available for a manual/auto redeem instead of being
// swept into the lake out from under it. Deposits the smallest eligible size per call — same cadence
// as tickDiskAutoReleaseCache/tickDiskAutoRedeem.
export const tickDiskAutoDeposit = state => {
  const buildingSize = state.intro?.diskBuild?.size
  const eligibleSize = Object.keys(state.intro.disks ?? {})
    .map(Number)
    .filter(size => size !== buildingSize)
    .filter(size => !isDiskRedeemable(state, size))
    .filter(size => canDepositDiskToDataLake(state, size))
    .sort((a, b) => a - b)[0]
  if (eligibleSize === undefined) return state
  return depositDiskToDataLake(eligibleSize)(state)
}

const latchComputeMergePageIfNeeded = (intro, tierIndex, field) => {
  const nextCount = (intro[field] ?? 0) + 1
  const updates = { [field]: nextCount }
  if (tierIndex === 1) {
    updates.computeCoresEverEarned = Math.max(intro.computeCoresEverEarned ?? 0, nextCount)
    updates.computeMergePageUnlocked =
      (intro.computeMergePageUnlocked ?? false) || updates.computeCoresEverEarned >= COMPUTE_CORES_PER_NODE
  }
  return updates
}

// The disk-ladder step (see getDiskLadderSizeBits) for lake `tierIndex`'s own `subSize` (1/10/100)
// sub-size — the inverse of getDataLakeTierIndex/getDataLakeSubSize above.
const getDataLakeSubSizeStep = (tierIndex, subSize) =>
  (tierIndex - 1) * DATA_LAKE_SUB_SIZES.length + DATA_LAKE_SUB_SIZES.indexOf(subSize) + 1

// The bit size of ONE deposit-unit for lake `tierIndex` — exactly its own ×1 sub-size Disk's real
// face value (getDiskLadderSizeBits at that tier's first step). Since sub-sizes 1/10/100 scale
// linearly with disk-ladder steps, `unitCount * getDataLakeUnitBits(tierIndex)` always equals the
// real bit total those units represent, regardless of which sub-sizes they came from — used to
// display deposited/capacity/cost figures in the same Byte-scale currency Disks themselves use
// (formatDiskSize) rather than a bare unitless number.
export const getDataLakeUnitBits = tierIndex =>
  getDiskLadderSizeBits(getDataLakeSubSizeStep(tierIndex, DATA_LAKE_SUB_SIZES[0]))

// Doubling a lake's own capacity (see getDataLakeCapacity above) costs its CURRENT capacity,
// converted from an abstract unit count into real bits via getDataLakeUnitBits — the same "spend
// the current value to double it" shape Memory's own Sacrifice uses, and the same currency Disks
// themselves are priced/sized in (see docs/DESIGN_HISTORY.md), not a bare unit count.
export const getDataLakeCapacityDoublingCost = (state, tierIndex) =>
  getDataLakeCapacity(state, tierIndex) * getDataLakeUnitBits(tierIndex)

export const isDataLakeCapacityDoublingAvailable = (state, tierIndex) => {
  if (tierIndex < 1 || tierIndex > DATA_LAKE_TIER_COUNT) return false
  if (isDataLakeCapacityMaxed(state, tierIndex)) return false
  return (state.intro?.bits ?? 0) >= getDataLakeCapacityDoublingCost(state, tierIndex)
}

// Gated by the same forced priority order every other Byte Foundry milestone action follows —
// available only once nothing ranked above it (Disk Fill, Bandwidth, Disk Build, Compute)
// currently is, same rank as Memory's own Sacrifice (isMemoryCapacityUpgradeAvailable) — the two
// sit at the same bottom rank rather than competing with each other.
export const isDataLakeCapacityDoublingTurnAvailable = (state, tierIndex) =>
  isDataLakeCapacityDoublingAvailable(state, tierIndex) &&
  !isDiskFillAvailable(state) &&
  !isBandwidthAvailable(state) &&
  !isDiskBuildAvailable(state) &&
  !isComputeUpgradeAvailable(state)

export const doubleDataLakeCapacity = tierIndex => state => {
  if (!isDataLakeCapacityDoublingTurnAvailable(state, tierIndex)) return state
  const cost = getDataLakeCapacityDoublingCost(state, tierIndex)
  const lake = getDataLakeTier(state, tierIndex)
  return {
    ...state,
    intro: {
      ...state.intro,
      bits: state.intro.bits - cost,
      dataLakes: {
        ...state.intro.dataLakes,
        [tierIndex]: {
          ...lake,
          capacityLevel: getDataLakeCapacityLevel(state, tierIndex) + 1,
        },
      },
    },
  }
}

// How many live Booster transfers (see startBoosterTransfer/tickDataLakeTransfers) tier
// `tierIndex`'s lake can run at once — one concurrency slot per completed sub-size Disk array
// (×1/×10/×100, checked smallest first), the same staged gate depositDiskToDataLake's own
// deposited-capacity progression already uses (see DATA_LAKE_TRANSFER_CAPACITY_MAX in layers.js).
// 0 until the ×1 array first completes.
export const getDataLakeTransferCapacity = (state, tierIndex) => {
  if (tierIndex < 1 || tierIndex > DATA_LAKE_TIER_COUNT) return 0
  let capacity = 0
  for (const subSize of DATA_LAKE_SUB_SIZES) {
    const sizeBits = getDiskLadderSizeBits(getDataLakeSubSizeStep(tierIndex, subSize))
    if (!isDiskArrayFullyBuilt(state, sizeBits)) break
    capacity += 1
  }
  return capacity
}

// Seconds to live-transfer `units` (in the lake's own sub-size scale — see DATA_LAKE_SUB_SIZES)
// worth of Disk bits into tier `tierIndex`'s lake, at DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER
// times the Byte Foundry's current bits/sec (getIntroProductionRate) — deliberately NOT including
// an active Compute Boost, same posture as getCoreEarnTimeSeconds. One "unit" is exactly the bit
// size of that lake's own ×1 sub-size Disk (getDiskLadderSizeBits at the tier's first step); since
// sub-sizes 1/10/100 scale linearly with disk-ladder steps, `units x unitBits` always equals the
// real bit total of whatever Disks the transfer is sourced from, regardless of which sizes.
const getDataLakeTransferDurationSeconds = (state, tierIndex, units) => {
  if (!(units > 0)) return 0
  const rate = getIntroProductionRate(state.intro ?? {})
  if (!(rate > 0) || !Number.isFinite(rate)) return 0
  return (units * getDataLakeUnitBits(tierIndex)) / (DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER * rate)
}

// Works out which held, undeposited Disks (by sub-size) can fund `unitsNeeded` units of live
// transfer for `tierIndex`, or returns null if the held Disks can't reach that total exactly.
// Deliberately NOT the same digit-decomposition `decomposeDataLakeDeposits` uses for deposits —
// that assumes each sub-size's count is a hypothetical up-to-DISK_ARRAY_LADDER_CAP breakdown of an
// abstract total, whereas raw held Disks are the REAL current per-size count, which can be
// anywhere from 0 to DISK_ARRAY_LADDER_CAP (10) — a player isn't required to hold the maximum, so
// this can't just re-run the same greedy cap against a fixed ceiling.
// Instead this greedily uses as many of the largest sub-size as are actually held (capped at what
// the remaining need can use), then cascades whatever's left to the next sub-size down, ending at
// the finest (×1) — since each sub-size is an exact ×10 multiple of the next, using fewer of a
// larger sub-size than this greedy pass does can only ever increase what's needed lower down, never
// help, so this is a correct feasibility check, not just a heuristic.
const planLiveDiskFunding = (state, tierIndex, unitsNeeded) => {
  if (!(unitsNeeded > 0)) return {}
  let remaining = unitsNeeded
  const disksToConsume = {}
  for (const subSize of [...DATA_LAKE_SUB_SIZES].sort((a, b) => b - a)) {
    const sizeBits = getDiskLadderSizeBits(getDataLakeSubSizeStep(tierIndex, subSize))
    const held = state.intro.disks?.[sizeBits] ?? 0
    const used = Math.min(held, Math.floor(remaining / subSize))
    disksToConsume[subSize] = used
    remaining -= used * subSize
  }
  return remaining === 0 ? disksToConsume : null
}

// Plans (but does not apply) how the next Booster at `tierIndex` would be funded: its cost is
// spent out of the lake's own deposits FIRST — those Disks are already at the lake, so that
// portion is instant — and whatever remains is sourced live from raw, undeposited built Disks
// (see planLiveDiskFunding above) for a timed transfer. Returns null when the cost can't be funded
// at all right now — not enough deposited + held Disks combined, or (when a live transfer would be
// needed) the tier's transfer concurrency is already full. Only the OVERALL held count per sub-size
// is checked here, not whether that specific sub-size's own array is completely built (unlike
// canDepositDiskToDataLake) — getDataLakeTransferCapacity already gates the coarse "can this lake
// run a live transfer at all" question, and gating per-size on top would only ever matter for the
// largest sub-size a player is still actively building out (by construction, a size only ever has
// held Disks once every smaller size's array is already complete — see the disk ladder in
// startDiskBuild).
const getBoosterTransferPlan = (state, tierIndex) => {
  if (tierIndex < 1 || tierIndex > DATA_LAKE_TIER_COUNT) return null
  const field = COMPUTE_BOOST_TIER_FIELDS[tierIndex - 1]
  if (!field) return null
  const cost = getBoosterPurchaseCost(tierIndex)(state)
  if (cost <= 0) return null

  const lake = getDataLakeTier(state, tierIndex)
  const deposited = getDataLakeDepositedUnits(tierIndex)(state)
  const fromDeposits = Math.min(deposited, cost)
  const fromDisksNeeded = cost - fromDeposits

  if (fromDisksNeeded === 0) return { cost, fromDeposits, fromDisksNeeded, disksToConsume: {} }

  if ((lake.transfers?.length ?? 0) >= getDataLakeTransferCapacity(state, tierIndex)) return null

  const disksToConsume = planLiveDiskFunding(state, tierIndex, fromDisksNeeded)
  if (!disksToConsume) return null

  return { cost, fromDeposits, fromDisksNeeded, disksToConsume }
}

export const canStartBoosterTransfer = (state, tierIndex) => getBoosterTransferPlan(state, tierIndex) !== null

// Starts funding the next Booster at `tierIndex` per getBoosterTransferPlan above: spends
// deposits instantly, and — if that alone doesn't cover the cost — also consumes the needed raw
// Disks right away and queues a timed transfer (see tickDataLakeTransfers) that grants the
// Booster once it completes. When deposits alone cover the full cost, there's nothing left to
// transfer, so the Booster grants immediately (same as the old instant-purchase path). A
// same-reference no-op when the plan can't be funded (see getBoosterTransferPlan).
export const startBoosterTransfer = tierIndex => state => {
  const plan = getBoosterTransferPlan(state, tierIndex)
  if (!plan) return state

  const field = COMPUTE_BOOST_TIER_FIELDS[tierIndex - 1]
  const lake = getDataLakeTier(state, tierIndex)
  const remainingDeposited = getDataLakeDepositedUnits(tierIndex)(state) - plan.fromDeposits
  const nextDeposits = decomposeDataLakeDeposits(remainingDeposited)

  if (plan.fromDisksNeeded === 0) {
    const purchased = (lake.purchased ?? 0) + 1
    const boosterUpdates = latchComputeMergePageIfNeeded(state.intro, tierIndex, field)
    return {
      ...state,
      intro: {
        ...state.intro,
        ...boosterUpdates,
        dataLakes: {
          ...state.intro.dataLakes,
          [tierIndex]: { ...lake, deposits: nextDeposits, purchased },
        },
      },
    }
  }

  const nextDisks = { ...state.intro.disks }
  for (const subSize of DATA_LAKE_SUB_SIZES) {
    const needed = plan.disksToConsume[subSize] ?? 0
    if (needed === 0) continue
    const sizeBits = getDiskLadderSizeBits(getDataLakeSubSizeStep(tierIndex, subSize))
    const nextCount = (nextDisks[sizeBits] ?? 0) - needed
    if (nextCount > 0) {
      nextDisks[sizeBits] = nextCount
    } else {
      delete nextDisks[sizeBits]
    }
  }

  const durationSeconds = getDataLakeTransferDurationSeconds(state, tierIndex, plan.fromDisksNeeded)
  const nextTransfers = [...(lake.transfers ?? []), { remainingSeconds: durationSeconds }]

  return {
    ...state,
    intro: {
      ...state.intro,
      disks: nextDisks,
      dataLakes: {
        ...state.intro.dataLakes,
        [tierIndex]: { ...lake, deposits: nextDeposits, transfers: nextTransfers },
      },
    },
  }
}

// Counts every in-flight Booster transfer (across all DATA_LAKE_TIER_COUNT lakes) down by
// elapsedSeconds, frozen or not (same posture as every other Byte Foundry mechanic) — a
// same-reference no-op while none are in flight. On completion (remaining <= 0), grants 1 Booster
// of that lake's compute-ladder tier (see latchComputeMergePageIfNeeded — uncapped, same as the
// old instant-purchase path: Data Lake capacity gates Boosters, not COMPUTE_ENTITY_CAP) and
// removes the transfer from the queue, freeing its slot for the next startBoosterTransfer.
export const tickDataLakeTransfers = elapsedSeconds => state => {
  let changed = false
  const nextDataLakes = { ...state.intro.dataLakes }
  let introExtras = {}

  for (let tierIndex = 1; tierIndex <= DATA_LAKE_TIER_COUNT; tierIndex += 1) {
    const lake = getDataLakeTier(state, tierIndex)
    const transfers = lake.transfers ?? []
    if (transfers.length === 0) continue

    let purchased = lake.purchased ?? 0
    const remainingTransfers = []
    for (const transfer of transfers) {
      const nextRemaining = (transfer.remainingSeconds ?? 0) - elapsedSeconds
      // Same TICK_ACCUMULATION_EPSILON tolerance tickDiskBuild's own countdown uses — absorbs
      // floating-point drift from repeatedly summing a fractional elapsedSeconds so a transfer
      // that should complete this tick doesn't linger one extra tick on a near-zero residual.
      if (nextRemaining > TICK_ACCUMULATION_EPSILON) {
        remainingTransfers.push({ remainingSeconds: nextRemaining })
        continue
      }
      purchased += 1
      const field = COMPUTE_BOOST_TIER_FIELDS[tierIndex - 1]
      introExtras = { ...introExtras, ...latchComputeMergePageIfNeeded({ ...state.intro, ...introExtras }, tierIndex, field) }
    }

    // Reached only when this tier had at least one in-flight transfer, so its remainingSeconds
    // (or, on completion, its transfers array/purchased count) always needs writing back — not
    // just when a transfer actually finished this tick.
    changed = true
    nextDataLakes[tierIndex] = { ...lake, transfers: remainingTransfers, purchased }
  }

  if (!changed) return state

  return {
    ...state,
    intro: {
      ...state.intro,
      ...introExtras,
      dataLakes: nextDataLakes,
    },
  }
}

// --- Byte Foundry Compute Cores/Nodes --- see intro.computeCores/computeNodes in
// createInitialGameState and INTRO_COMPUTE_CORE_UNLOCK_CAPACITY/COMPUTE_CORES_PER_NODE in
// layers.js. Earlier versions minted a Compute Core either at a fixed 10 MB of Memory (gated on
// every Disk size being built and full) or automatically/manually from a full Memory balance once
// capacity reached this threshold (the "Claim Core" mechanic) — both superseded (see
// docs/DESIGN_HISTORY.md) in favor of startBoosterTransfer above, which spends deposited and
// live-transferred Disk stock from the matching Data Lake instead and is unrelated to
// Memory/capacity entirely.

// Predicate, not a reducer: whether ByteFoundryPage's/ComputePage's "Compute" section should be
// active at all. True once capacity has grown enough to ever hold INTRO_COMPUTE_CORE_UNLOCK_CAPACITY
// (4,194,304 bits, "512 KiB" in Memory's own binary display scale) at once — the same
// "capacity-magnitude reveal gate" convention isIntroConversionUnlocked/isStorageUnlocked already
// use, one Sacrifice stage later than Storage's own reveal.
export const isComputeCoreConversionUnlocked = state => (state.intro?.capacity ?? 0) >= INTRO_COMPUTE_CORE_UNLOCK_CAPACITY

// Shared shape for the 9-boundary Core → Node → Cluster → Network → Grid → Fabric → Cloud →
// Datacenter → Supercomputer → Megacomputer merge chain below (see ComputePage and issues
// #280/#321) — before that boundary's own auto-merge is unlocked (autoFlagField below), this is
// the ONLY way that boundary's tokens ever move: an explicit player click, converting every
// complete group of COMPUTE_MERGE_RATIO (8) of the input entity into 1 of the output entity in a
// single, instant call, capped at whatever room remains under COMPUTE_ENTITY_CAP on the output —
// the same "batch, but cap-bounded, surplus left unconverted" shape every tick-based conversion in
// this file uses. A same-reference no-op below one full group of 8 of the input, once the output
// is already at cap, OR — the key change from issue #321 — once autoFlagField has ever flipped
// true: merging that boundary then fully transitions to the timed reserve system below
// (startComputeMergeReserve/tickComputeMergeReserveTimer), and this plain instant path retires
// permanently for it (an engine-level guard, not just a UI one — see "Security notes" in
// CLAUDE.md).
const mergeComputeEntities = (inputField, outputField, autoFlagField) => state => {
  if (state.intro?.[autoFlagField]) return state
  const input = state.intro?.[inputField] ?? 0
  const output = state.intro?.[outputField] ?? 0
  const roomForOutput = Math.max(0, COMPUTE_ENTITY_CAP - output)
  const outputGained = Math.min(roomForOutput, Math.floor(input / COMPUTE_MERGE_RATIO))
  if (outputGained <= 0) return state

  return {
    ...state,
    intro: {
      ...state.intro,
      [inputField]: input - outputGained * COMPUTE_MERGE_RATIO,
      [outputField]: output + outputGained,
    },
  }
}

// 8 Compute Cores → 1 Compute Node. Player-triggered (ComputePage's own merge button) while
// auto-merge for this boundary isn't yet unlocked — the player decides whether to merge Cores
// upward or keep spending/holding them (see activateComputeBoost). Formerly always-automatic
// every tick (tickComputeNodeConversion, since removed — see issue #321); Core → Node is now just
// the first of the 9 uniformly-shaped merge boundaries below.
export const mergeComputeCoresIntoNode = mergeComputeEntities('computeCores', 'computeNodes', 'autoMergeCoresIntoNode')
// 8 Compute Nodes → 1 Compute Cluster. Same posture as mergeComputeCoresIntoNode above.
export const mergeComputeNodesIntoCluster = mergeComputeEntities('computeNodes', 'computeClusters', 'autoMergeNodesIntoCluster')
// 8 Compute Clusters → 1 Compute Network. Same posture as the merges above.
export const mergeComputeClustersIntoNetwork = mergeComputeEntities('computeClusters', 'computeNetworks', 'autoMergeClustersIntoNetwork')
// 8 Compute Networks → 1 Compute Grid. Same posture as the merges above.
export const mergeComputeNetworksIntoGrid = mergeComputeEntities('computeNetworks', 'computeGrids', 'autoMergeNetworksIntoGrid')
// 8 Compute Grids → 1 Compute Fabric. Same posture as the merges above.
export const mergeComputeGridsIntoFabric = mergeComputeEntities('computeGrids', 'computeFabrics', 'autoMergeGridsIntoFabric')
// 8 Compute Fabrics → 1 Compute Cloud. Same posture as the merges above.
export const mergeComputeFabricsIntoCloud = mergeComputeEntities('computeFabrics', 'computeClouds', 'autoMergeFabricsIntoCloud')
// 8 Compute Clouds → 1 Compute Datacenter. Same posture as the merges above.
export const mergeComputeCloudsIntoDatacenter = mergeComputeEntities('computeClouds', 'computeDatacenters', 'autoMergeCloudsIntoDatacenter')
// 8 Compute Datacenters → 1 Compute Supercomputer. Same posture as the merges above.
export const mergeComputeDatacentersIntoSupercomputer = mergeComputeEntities('computeDatacenters', 'computeSupercomputers', 'autoMergeDatacentersIntoSupercomputer')
// 8 Compute Supercomputers → 1 Compute Megacomputer — the top of the merge chain today (see issue
// #280's "Out of scope": nothing spends a Megacomputer yet). Same posture as the merges above.
export const mergeComputeSupercomputersIntoMegacomputer = mergeComputeEntities('computeSupercomputers', 'computeMegacomputers', 'autoMergeSupercomputersIntoMegacomputer')

// --- Compute auto-merge automation & reserve-merge timers --- see issues #316/#321/#377. Each of
// the 9 manual merges above can be permanently automated, one tier boundary at a time, by
// sacrificing ALL COMPUTE_ENTITY_CAP (10) currently-held units of that merge's own OUTPUT entity —
// e.g. enableAutoMergeNodesIntoCluster spends 10 Clusters to flip autoMergeNodesIntoCluster on.
// Once enabled, merging that boundary — auto or manual alike — transitions entirely to a timed
// RESERVE pool (see COMPUTE_MERGE_RESERVE_CAP / getComputeMergeDurationSeconds in layers.js /
// below): starting a merge instantly moves COMPUTE_MERGE_RATIO (8) tokens out of the input
// entity's own normal COMPUTE_ENTITY_CAP (10) slots into the boundary's reserve, then counts down
// that boundary's duration (live Core earn ×10 chain, or ×5 after a duration upgrade — snapshotted
// at start so an in-flight timer does not rescale mid-merge) before granting 1 of the output
// entity (cap-checked) and clearing the reserve — at most one merge in flight per boundary at a
// time. Auto-triggers only once the input is COMPLETELY full (10, not 8) — a stricter bar than a
// manual start's own COMPUTE_MERGE_RATIO (8), so automation only ever mops up an entity the player
// has let cap out, never preempting a more efficient manual start at 8.

// Shared by both the auto-trigger (threshold COMPUTE_ENTITY_CAP) and the manual click-to-start
// action (threshold COMPUTE_MERGE_RATIO) below — a same-reference no-op while auto-merge isn't
// unlocked for this boundary, a merge is already in flight (timerField > 0), input is below
// `threshold`, or output is already at COMPUTE_ENTITY_CAP. Otherwise moves exactly
// COMPUTE_MERGE_RATIO out of the input entity and starts the timer at `durationSeconds`.
const startComputeMergeReserve = (inputField, outputField, autoFlagField, timerField, durationSeconds, threshold) => state => {
  if (!(state.intro?.[autoFlagField] ?? false)) return state
  if ((state.intro?.[timerField] ?? 0) > 0) return state
  if ((state.intro?.[inputField] ?? 0) < threshold) return state
  if ((state.intro?.[outputField] ?? 0) >= COMPUTE_ENTITY_CAP) return state
  if (!(durationSeconds > 0)) return state
  return {
    ...state,
    intro: {
      ...state.intro,
      [inputField]: (state.intro?.[inputField] ?? 0) - COMPUTE_MERGE_RATIO,
      [timerField]: durationSeconds,
    },
  }
}

// Counts an in-flight reserve merge's remaining duration down by `elapsedSeconds`, frozen or not
// (same posture as every other Byte Foundry mechanic) — a same-reference no-op while no merge is
// in flight (timerField === 0). On completion (remaining <= 0), grants 1 of the output entity
// (capped at COMPUTE_ENTITY_CAP, defensively — the start-time guard above already checked this,
// but nothing prevents the output from having filled some other way in the meantime) and clears
// the timer back to 0, freeing the reserve for the next merge.
const tickComputeMergeReserveTimer = (elapsedSeconds, timerField, outputField) => state => {
  const remaining = state.intro?.[timerField] ?? 0
  if (remaining <= 0) return state

  const nextRemaining = remaining - elapsedSeconds
  if (nextRemaining > 0) {
    return { ...state, intro: { ...state.intro, [timerField]: nextRemaining } }
  }

  return {
    ...state,
    intro: {
      ...state.intro,
      [timerField]: 0,
      [outputField]: Math.min(COMPUTE_ENTITY_CAP, (state.intro?.[outputField] ?? 0) + 1),
    },
  }
}

// Combines one boundary's auto-trigger (threshold COMPUTE_ENTITY_CAP) with its timer countdown —
// the single per-boundary function tickGame's own AUTO_MERGE_TICKERS pipeline calls every tick
// (see further down this file). Duration is read live from state at auto-start so a duration-step
// upgrade (or a changed Core earn rate) applies to newly started merges immediately; an already
// in-flight timer keeps whatever value was snapshotted at its start.
const tickComputeMergeBoundary = (elapsedSeconds, inputField, outputField, autoFlagField, timerField, boundaryIndex) => state => {
  const durationSeconds = getComputeMergeDurationSeconds(state, boundaryIndex)
  const afterAutoStart = startComputeMergeReserve(inputField, outputField, autoFlagField, timerField, durationSeconds, COMPUTE_ENTITY_CAP)(state)
  return tickComputeMergeReserveTimer(elapsedSeconds, timerField, outputField)(afterAutoStart)
}

// Seconds to fill Memory once at the current Byte generator rate (capacity ÷ bits/sec). Uses
// getIntroProductionRate — deliberately NOT including an active Compute Boost — so merge pacing
// tracks permanent Invest/Sacrifice progress, not temporary boost windows. This is "Core earn
// time": claiming a Core flushes the full capacity once Memory is full.
export const getCoreEarnTimeSeconds = state => {
  const intro = state.intro
  if (!intro) return 0
  const capacity = intro.capacity ?? 0
  const rate = getIntroProductionRate(intro)
  if (!(capacity > 0) || !(rate > 0) || !Number.isFinite(rate)) return 0
  return capacity / rate
}

// Effective timed-merge duration for boundaryIndex (0 = Core→Node, …). Live chain from Core earn
// time: Core→Node = COMPUTE_MERGE_CORE_EARN_MULTIPLIER × earn time (or
// COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED × once upgraded); each later boundary multiplies the
// previous by STEP (10) or STEP_UPGRADED (5) once intro.computeMergeDurationUpgrades > that step.
export const getComputeMergeDurationSeconds = (state, boundaryIndex) => {
  if (!Number.isInteger(boundaryIndex) || boundaryIndex < 0 || boundaryIndex >= COMPUTE_MERGE_DURATION_UPGRADE_COUNT) return 0
  const upgrades = state.intro?.computeMergeDurationUpgrades ?? 0
  let duration = getCoreEarnTimeSeconds(state)
  if (!(duration > 0)) return 0
  for (let step = 0; step <= boundaryIndex; step += 1) {
    const multiplier = step < upgrades
      ? COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED
      : (step === 0 ? COMPUTE_MERGE_CORE_EARN_MULTIPLIER : COMPUTE_MERGE_STEP_MULTIPLIER)
    duration *= multiplier
  }
  return duration
}

// Next sequential duration upgrade is available when: not all claimed yet, that boundary's
// auto-merge is already unlocked (duration only matters for timed merges), and the player holds
// COMPUTE_ENTITY_CAP of that boundary's input layer.
export const isUpgradeComputeMergeDurationAvailable = state => {
  const nextIndex = state.intro?.computeMergeDurationUpgrades ?? 0
  if (nextIndex < 0 || nextIndex >= COMPUTE_MERGE_DURATION_UPGRADE_COUNT) return false
  const boundary = COMPUTE_MERGE_BOUNDARIES[nextIndex]
  if (!(state.intro?.[boundary.autoFlagField] ?? false)) return false
  return (state.intro?.[boundary.inputField] ?? 0) >= COMPUTE_ENTITY_CAP
}

// Which boundary index would be claimed next (0..8), or null if every boundary is already upgraded.
// Does not check affordability / auto-merge unlock — UI uses this to label the next step, and
// isUpgradeComputeMergeDurationAvailable for the actual enable gate.
export const getNextComputeMergeDurationUpgradeIndex = state => {
  const nextIndex = state.intro?.computeMergeDurationUpgrades ?? 0
  if (nextIndex < 0 || nextIndex >= COMPUTE_MERGE_DURATION_UPGRADE_COUNT) return null
  return nextIndex
}

// Sacrifices ALL COMPUTE_ENTITY_CAP of the next sequential boundary's input layer so that
// boundary becomes ×5 (not ×10) vs Core earn / the previous layer — later boundaries rescale from
// the new chain. Same-reference no-op below isUpgradeComputeMergeDurationAvailable.
export const upgradeComputeMergeDuration = state => {
  if (!isUpgradeComputeMergeDurationAvailable(state)) return state
  const nextIndex = state.intro.computeMergeDurationUpgrades ?? 0
  const boundary = COMPUTE_MERGE_BOUNDARIES[nextIndex]
  return {
    ...state,
    intro: {
      ...state.intro,
      [boundary.inputField]: 0,
      computeMergeDurationUpgrades: nextIndex + 1,
    },
  }
}

// UI mirror of enableAutoMerge's own gate — whether sacrificing the output entity right now would
// actually unlock automation for this tier boundary.
const isAutoMergeUnlockAvailable = (state, outputField, autoFlagField) =>
  !(state.intro?.[autoFlagField] ?? false) && (state.intro?.[outputField] ?? 0) >= COMPUTE_ENTITY_CAP

// A same-reference no-op below isAutoMergeUnlockAvailable's own gate (already enabled, or fewer
// than COMPUTE_ENTITY_CAP of the output entity currently held).
const enableAutoMerge = (outputField, autoFlagField) => state => {
  if (!isAutoMergeUnlockAvailable(state, outputField, autoFlagField)) return state
  return { ...state, intro: { ...state.intro, [outputField]: 0, [autoFlagField]: true } }
}

// UI mirror of startComputeMergeReserve's own manual-click gate (threshold COMPUTE_MERGE_RATIO,
// 8) — whether clicking this boundary's reserve-slot row right now ("the button is enabled only
// when there are at least 8 tokens available across all the 18 slots" — issue #321) would start a
// new merge: auto-merge unlocked, no merge already in flight, at least COMPUTE_MERGE_RATIO of the
// input held, and the output isn't already at COMPUTE_ENTITY_CAP.
const isComputeMergeReserveStartAvailable = (state, inputField, outputField, autoFlagField, timerField) =>
  (state.intro?.[autoFlagField] ?? false) &&
  (state.intro?.[timerField] ?? 0) === 0 &&
  (state.intro?.[inputField] ?? 0) >= COMPUTE_MERGE_RATIO &&
  (state.intro?.[outputField] ?? 0) < COMPUTE_ENTITY_CAP

// Manual start that reads the live (possibly step-upgraded) duration from state and snapshots it
// onto the timer field.
const startComputeMergeReserveAtBoundary = (boundaryIndex, threshold) => state => {
  const boundary = COMPUTE_MERGE_BOUNDARIES[boundaryIndex]
  const durationSeconds = getComputeMergeDurationSeconds(state, boundaryIndex)
  return startComputeMergeReserve(
    boundary.inputField,
    boundary.outputField,
    boundary.autoFlagField,
    boundary.timerField,
    durationSeconds,
    threshold,
  )(state)
}

// One block per tier boundary, lowest first — every export below (tickAutoMerge*/enableAutoMerge*/
// isAutoMerge*UnlockAvailable/startCompute*Merge/isCompute*MergeStartAvailable) follows the exact
// same 5-export shape, differing only in which intro fields/boundary index it closes over, so the
// 9 boundaries stay uniform even though ES module exports must be individually named.

export const tickAutoMergeCoresIntoNode = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeCores', 'computeNodes', 'autoMergeCoresIntoNode', 'computeCoresMergeRemainingSeconds', 0)
export const enableAutoMergeCoresIntoNode = enableAutoMerge('computeNodes', 'autoMergeCoresIntoNode')
export const isAutoMergeCoresIntoNodeUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeNodes', 'autoMergeCoresIntoNode')
export const startComputeCoresMerge = startComputeMergeReserveAtBoundary(0, COMPUTE_MERGE_RATIO)
export const isComputeCoresMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeCores', 'computeNodes', 'autoMergeCoresIntoNode', 'computeCoresMergeRemainingSeconds')

export const tickAutoMergeNodesIntoCluster = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeNodes', 'computeClusters', 'autoMergeNodesIntoCluster', 'computeNodesMergeRemainingSeconds', 1)
export const enableAutoMergeNodesIntoCluster = enableAutoMerge('computeClusters', 'autoMergeNodesIntoCluster')
export const isAutoMergeNodesIntoClusterUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeClusters', 'autoMergeNodesIntoCluster')
export const startComputeNodesMerge = startComputeMergeReserveAtBoundary(1, COMPUTE_MERGE_RATIO)
export const isComputeNodesMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeNodes', 'computeClusters', 'autoMergeNodesIntoCluster', 'computeNodesMergeRemainingSeconds')

export const tickAutoMergeClustersIntoNetwork = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeClusters', 'computeNetworks', 'autoMergeClustersIntoNetwork', 'computeClustersMergeRemainingSeconds', 2)
export const enableAutoMergeClustersIntoNetwork = enableAutoMerge('computeNetworks', 'autoMergeClustersIntoNetwork')
export const isAutoMergeClustersIntoNetworkUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeNetworks', 'autoMergeClustersIntoNetwork')
export const startComputeClustersMerge = startComputeMergeReserveAtBoundary(2, COMPUTE_MERGE_RATIO)
export const isComputeClustersMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeClusters', 'computeNetworks', 'autoMergeClustersIntoNetwork', 'computeClustersMergeRemainingSeconds')

export const tickAutoMergeNetworksIntoGrid = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeNetworks', 'computeGrids', 'autoMergeNetworksIntoGrid', 'computeNetworksMergeRemainingSeconds', 3)
export const enableAutoMergeNetworksIntoGrid = enableAutoMerge('computeGrids', 'autoMergeNetworksIntoGrid')
export const isAutoMergeNetworksIntoGridUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeGrids', 'autoMergeNetworksIntoGrid')
export const startComputeNetworksMerge = startComputeMergeReserveAtBoundary(3, COMPUTE_MERGE_RATIO)
export const isComputeNetworksMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeNetworks', 'computeGrids', 'autoMergeNetworksIntoGrid', 'computeNetworksMergeRemainingSeconds')

export const tickAutoMergeGridsIntoFabric = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeGrids', 'computeFabrics', 'autoMergeGridsIntoFabric', 'computeGridsMergeRemainingSeconds', 4)
export const enableAutoMergeGridsIntoFabric = enableAutoMerge('computeFabrics', 'autoMergeGridsIntoFabric')
export const isAutoMergeGridsIntoFabricUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeFabrics', 'autoMergeGridsIntoFabric')
export const startComputeGridsMerge = startComputeMergeReserveAtBoundary(4, COMPUTE_MERGE_RATIO)
export const isComputeGridsMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeGrids', 'computeFabrics', 'autoMergeGridsIntoFabric', 'computeGridsMergeRemainingSeconds')

export const tickAutoMergeFabricsIntoCloud = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeFabrics', 'computeClouds', 'autoMergeFabricsIntoCloud', 'computeFabricsMergeRemainingSeconds', 5)
export const enableAutoMergeFabricsIntoCloud = enableAutoMerge('computeClouds', 'autoMergeFabricsIntoCloud')
export const isAutoMergeFabricsIntoCloudUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeClouds', 'autoMergeFabricsIntoCloud')
export const startComputeFabricsMerge = startComputeMergeReserveAtBoundary(5, COMPUTE_MERGE_RATIO)
export const isComputeFabricsMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeFabrics', 'computeClouds', 'autoMergeFabricsIntoCloud', 'computeFabricsMergeRemainingSeconds')

export const tickAutoMergeCloudsIntoDatacenter = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeClouds', 'computeDatacenters', 'autoMergeCloudsIntoDatacenter', 'computeCloudsMergeRemainingSeconds', 6)
export const enableAutoMergeCloudsIntoDatacenter = enableAutoMerge('computeDatacenters', 'autoMergeCloudsIntoDatacenter')
export const isAutoMergeCloudsIntoDatacenterUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeDatacenters', 'autoMergeCloudsIntoDatacenter')
export const startComputeCloudsMerge = startComputeMergeReserveAtBoundary(6, COMPUTE_MERGE_RATIO)
export const isComputeCloudsMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeClouds', 'computeDatacenters', 'autoMergeCloudsIntoDatacenter', 'computeCloudsMergeRemainingSeconds')

export const tickAutoMergeDatacentersIntoSupercomputer = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeDatacenters', 'computeSupercomputers', 'autoMergeDatacentersIntoSupercomputer', 'computeDatacentersMergeRemainingSeconds', 7)
export const enableAutoMergeDatacentersIntoSupercomputer = enableAutoMerge('computeSupercomputers', 'autoMergeDatacentersIntoSupercomputer')
export const isAutoMergeDatacentersIntoSupercomputerUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeSupercomputers', 'autoMergeDatacentersIntoSupercomputer')
export const startComputeDatacentersMerge = startComputeMergeReserveAtBoundary(7, COMPUTE_MERGE_RATIO)
export const isComputeDatacentersMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeDatacenters', 'computeSupercomputers', 'autoMergeDatacentersIntoSupercomputer', 'computeDatacentersMergeRemainingSeconds')

export const tickAutoMergeSupercomputersIntoMegacomputer = elapsedSeconds => tickComputeMergeBoundary(elapsedSeconds, 'computeSupercomputers', 'computeMegacomputers', 'autoMergeSupercomputersIntoMegacomputer', 'computeSupercomputersMergeRemainingSeconds', 8)
export const enableAutoMergeSupercomputersIntoMegacomputer = enableAutoMerge('computeMegacomputers', 'autoMergeSupercomputersIntoMegacomputer')
export const isAutoMergeSupercomputersIntoMegacomputerUnlockAvailable = state => isAutoMergeUnlockAvailable(state, 'computeMegacomputers', 'autoMergeSupercomputersIntoMegacomputer')
export const startComputeSupercomputersMerge = startComputeMergeReserveAtBoundary(8, COMPUTE_MERGE_RATIO)
export const isComputeSupercomputersMergeStartAvailable = state => isComputeMergeReserveStartAvailable(state, 'computeSupercomputers', 'computeMegacomputers', 'autoMergeSupercomputersIntoMegacomputer', 'computeSupercomputersMergeRemainingSeconds')

// Every tickAutoMerge* above, lowest tier first — tickGame reduces state through this array,
// each called with the tick's own elapsedSeconds, in order so a single tick can cascade both
// auto-triggering AND completion all the way up the chain (e.g. Cores capping out and starting a
// merge into a Node, whose own reserve might simultaneously complete and immediately auto-trigger
// the next boundary, and so on) whenever the player has unlocked auto-merge at every step in a row.
const AUTO_MERGE_TICKERS = [
  tickAutoMergeCoresIntoNode,
  tickAutoMergeNodesIntoCluster,
  tickAutoMergeClustersIntoNetwork,
  tickAutoMergeNetworksIntoGrid,
  tickAutoMergeGridsIntoFabric,
  tickAutoMergeFabricsIntoCloud,
  tickAutoMergeCloudsIntoDatacenter,
  tickAutoMergeDatacentersIntoSupercomputer,
  tickAutoMergeSupercomputersIntoMegacomputer,
]

// --- Compute Boost tier scaling --- issues #326/#363 (effect) + restored duration doubling:
// a boost activated from compute-ladder tier `tierIndex` (1 = Core, …
// COMPUTE_BOOST_TIER_FIELDS.length = Megacomputer) is COMPUTE_BOOST_TIER_POWER_STEP^(tierIndex - 1)
// times as powerful as that preset's own BASE (tier 1) multiplier, and lasts
// COMPUTE_BOOST_TIER_DURATION_STEP^(tierIndex - 1) times the preset's base durationSeconds
// ("effect time doubles after merge"). Both return 0 for an invalid boostType/tierIndex, which
// every caller below treats the same as "not activatable."
const isValidComputeBoostTier = tierIndex => Number.isInteger(tierIndex) && tierIndex >= 1 && tierIndex <= COMPUTE_BOOST_TIER_FIELDS.length

export const getComputeBoostTierField = tierIndex =>
  isValidComputeBoostTier(tierIndex) ? COMPUTE_BOOST_TIER_FIELDS[tierIndex - 1] : null

export const getComputeBoostTierMultiplier = (boostType, tierIndex) => {
  const preset = COMPUTE_BOOST_PRESETS[boostType]
  if (!preset || !isValidComputeBoostTier(tierIndex)) return 0
  return preset.multiplier * COMPUTE_BOOST_TIER_POWER_STEP ** (tierIndex - 1)
}

export const getComputeBoostTierDurationSeconds = (boostType, tierIndex) => {
  const preset = COMPUTE_BOOST_PRESETS[boostType]
  if (!preset || !isValidComputeBoostTier(tierIndex)) return 0
  return preset.durationSeconds * COMPUTE_BOOST_TIER_DURATION_STEP ** (tierIndex - 1)
}

// The current production-speed multiplier a Compute Boost is contributing — 1 (no effect) while
// no boost is active. Applied to Memory's own passive production (tickIntroProduction) and
// tier01's production specifically (see tickGame) — "the base production tier of each screen."
// Stacking (see stackComputeBoost) only ever extends computeBoostRemainingSeconds, never
// compounds the multiplier itself. `intro.computeBoostTierIndex ?? 1` defensively falls back to
// tier 1 (Core) for a save from before issue #326 existed (computeBoostType already set, no
// tierIndex field yet) — Cores was the only funding source before this feature, so that's the
// correct reading of such a save, not an error case.
export const getComputeBoostMultiplier = intro =>
  intro?.computeBoostType ? (getComputeBoostTierMultiplier(intro.computeBoostType, intro.computeBoostTierIndex ?? 1) || 1) : 1

// Whether boostType can be activated right now FROM tierIndex: a valid preset, a valid tier with
// at least 1 of that tier's own token held. Starting a brand-new boost while none is active needs
// no extra flag. Replacing an already-running boost forfeits the current one with NO refund — that
// path is only allowed when `forfeitConfirmed` is true (UI must get an explicit confirm first) and
// the new type/tier differs from the active one (same type+tier while active is Stack's job, not
// a forfeit-restart). The actual gate activateComputeBoost itself enforces, not just a UI-only
// disabled state — see "Security notes" in CLAUDE.md.
export const canActivateComputeBoost = (state, boostType, tierIndex, forfeitConfirmed = false) => {
  if (!COMPUTE_BOOST_PRESETS[boostType]) return false
  const field = getComputeBoostTierField(tierIndex)
  if (!field) return false
  if ((state.intro[field] ?? 0) < 1) return false

  const activeType = state.intro.computeBoostType ?? null
  if (activeType === null) return true

  // Same type + same funding tier while active → use stackComputeBoost, not forfeit-restart.
  if (activeType === boostType && (state.intro.computeBoostTierIndex ?? 1) === tierIndex) return false
  // Different boost while one is running only with an explicit forfeit confirmation from the UI.
  return forfeitConfirmed === true
}

// A specific (boostType, tierIndex) activation's own forced-priority turn: mechanically
// activatable (see canActivateComputeBoost above) AND nothing ranked above Compute (Disk Fill,
// Bandwidth, Disk Build) currently is. Pass forfeitConfirmed=true only after the player has
// explicitly confirmed forfeiting an active boost (no refund).
export const isComputeBoostTurnAvailable = (state, boostType, tierIndex, forfeitConfirmed = false) =>
  canActivateComputeBoost(state, boostType, tierIndex, forfeitConfirmed) &&
  !isDiskFillAvailable(state) && !isBandwidthAvailable(state) && !isDiskBuildAvailable(state)

// Whether stackComputeBoost below would do anything right now: a boost IS currently active, it
// hasn't already hit COMPUTE_BOOST_MAX_STACKS, and at least 1 more token of the ACTIVE boost's OWN
// funding tier (intro.computeBoostTierIndex) is held — Stack always extends whichever boost is
// currently running, regardless of any tier a player might have since selected in the UI (issue
// #326).
export const canStackComputeBoost = state => {
  const boostType = state.intro.computeBoostType ?? null
  if (boostType === null) return false
  if ((state.intro.computeBoostStacks ?? 0) >= COMPUTE_BOOST_MAX_STACKS) return false
  const field = getComputeBoostTierField(state.intro.computeBoostTierIndex)
  if (!field) return false
  return (state.intro[field] ?? 0) >= 1
}

// Stack's own forced-priority turn — same shape as isComputeBoostTurnAvailable above.
export const isStackComputeBoostTurnAvailable = state =>
  canStackComputeBoost(state) &&
  !isDiskFillAvailable(state) && !isBandwidthAvailable(state) && !isDiskBuildAvailable(state)

// Whether ANY Compute Boost action currently has its turn — either starting a brand new boost from
// some tier (canActivateComputeBoost, only possible while none is active — forfeit-replace is a
// deliberate confirm path, not an automatic "turn"), or stacking the one already running
// (canStackComputeBoost) — the Compute-level analogue of the other four forced-priority "turn"
// predicates above. NOT used to gate ComputePage's own nav button on ByteFoundryPage, which stays
// enabled once revealed regardless of turn (see "Byte Foundry" in CLAUDE.md for why) — only the
// individual preset/Stack buttons inside ComputePage gate on
// isComputeBoostTurnAvailable/isStackComputeBoostTurnAvailable directly.
export const isComputeUpgradeTurnAvailable = state =>
  isStackComputeBoostTurnAvailable(state) ||
  COMPUTE_BOOST_TIER_FIELDS.some((field, index) =>
    Object.keys(COMPUTE_BOOST_PRESETS).some(boostType => isComputeBoostTurnAvailable(state, boostType, index + 1, false))
  )

// Cancels the active Compute Boost with NO token refund and NO duration credit — pure forfeit.
// Same-reference no-op while no boost is active. Distinct from reclaimComputeBoost (which refunds).
// UI must confirm before calling when the player is abandoning remaining stacks on purpose.
export const canForfeitComputeBoost = state => (state.intro.computeBoostType ?? null) !== null

export const forfeitComputeBoost = state => {
  if (!canForfeitComputeBoost(state)) return state
  return {
    ...state,
    intro: {
      ...state.intro,
      computeBoostType: null,
      computeBoostTierIndex: null,
      computeBoostStacks: 0,
      computeBoostRemainingSeconds: 0,
    },
  }
}

// Starts a boost of boostType, funded by tierIndex — spends exactly 1 token of that tier's own
// field (getComputeBoostTierField), sets computeBoostStacks to 1, and
// computeBoostRemainingSeconds to that tier's own getComputeBoostTierDurationSeconds.
// When a boost is already active, pass forfeitConfirmed=true (after an explicit UI confirm) to
// forfeit the current boost with no refund and replace it; without that flag, a same-reference
// no-op while any boost is running (see stackComputeBoost to extend, or forfeitComputeBoost alone
// to cancel). Same-type+same-tier while active is always a no-op here — use Stack.
export const activateComputeBoost = (boostType, tierIndex, forfeitConfirmed = false) => state => {
  if (!isComputeBoostTurnAvailable(state, boostType, tierIndex, forfeitConfirmed)) return state

  const field = getComputeBoostTierField(tierIndex)

  return {
    ...state,
    intro: {
      ...state.intro,
      [field]: (state.intro[field] ?? 0) - 1,
      computeBoostType: boostType,
      computeBoostTierIndex: tierIndex,
      computeBoostStacks: 1,
      computeBoostRemainingSeconds: getComputeBoostTierDurationSeconds(boostType, tierIndex),
    },
  }
}

// Extends the CURRENTLY ACTIVE boost by one more stack — spends 1 more token of that boost's own
// funding tier (intro.computeBoostTierIndex, NOT whatever tier a player might have selected in the
// UI since activating), increments computeBoostStacks, and adds that same tier's own
// getComputeBoostTierDurationSeconds onto computeBoostRemainingSeconds (extending the remaining
// time, not resetting it). No-op (same-reference) below isStackComputeBoostTurnAvailable's guard
// above.
export const stackComputeBoost = state => {
  if (!isStackComputeBoostTurnAvailable(state)) return state

  const boostType = state.intro.computeBoostType
  const tierIndex = state.intro.computeBoostTierIndex
  const field = getComputeBoostTierField(tierIndex)

  return {
    ...state,
    intro: {
      ...state.intro,
      [field]: (state.intro[field] ?? 0) - 1,
      computeBoostStacks: (state.intro.computeBoostStacks ?? 0) + 1,
      computeBoostRemainingSeconds: (state.intro.computeBoostRemainingSeconds ?? 0) + getComputeBoostTierDurationSeconds(boostType, tierIndex),
    },
  }
}

// Counts the active boost's remaining duration down every tick, frozen or not (same posture as
// every other Byte Foundry mechanic) — clears back to inactive (type/tierIndex null,
// stacks/remaining 0) once it reaches 0. A same-reference no-op while no boost is active.
export const tickComputeBoost = elapsedSeconds => state => {
  if ((state.intro.computeBoostType ?? null) === null) return state

  const remaining = (state.intro.computeBoostRemainingSeconds ?? 0) - elapsedSeconds
  if (remaining > 0) {
    return { ...state, intro: { ...state.intro, computeBoostRemainingSeconds: remaining } }
  }

  return {
    ...state,
    intro: {
      ...state.intro,
      computeBoostType: null,
      computeBoostTierIndex: null,
      computeBoostStacks: 0,
      computeBoostRemainingSeconds: 0,
    },
  }
}

// True while any reserve-merge countdown is still running (Core→Node … Supercomputer→Megacomputer).
export const isAnyComputeMergeInFlight = state =>
  COMPUTE_MERGE_BOUNDARIES.some(boundary => (state.intro?.[boundary.timerField] ?? 0) > 0)

// Highest compute-ladder tier (1 = Core … 9 = Supercomputer) that is at COMPUTE_ENTITY_CAP while
// THAT tier's own outbound reserve merge is in flight — i.e. tokens sitting full, waiting for the
// merge timer to finish before another merge can start. Megacomputer has no outbound merge, so it
// never qualifies. Returns null when nothing is waiting.
export const getBiggestComputeTierWaitingOnMerge = state => {
  let biggest = null
  for (let i = 0; i < COMPUTE_MERGE_BOUNDARIES.length; i += 1) {
    const boundary = COMPUTE_MERGE_BOUNDARIES[i]
    if ((state.intro?.[boundary.timerField] ?? 0) <= 0) continue
    if ((state.intro?.[boundary.inputField] ?? 0) < COMPUTE_ENTITY_CAP) continue
    biggest = i + 1 // COMPUTE_BOOST_TIER_FIELDS index; boundary i's input is tier i+1
  }
  return biggest
}

// Player-facing preference for tickAutoComputeBoost — one of COMPUTE_BOOST_PRESETS' keys.
// Same-reference no-op for an unknown key. Permanent across Prestige (see prestigeGame).
export const setComputeAutoBoostType = boostType => state => {
  if (!COMPUTE_BOOST_PRESETS[boostType]) return state
  if ((state.intro?.computeAutoBoostType ?? 'standard') === boostType) return state
  return { ...state, intro: { ...state.intro, computeAutoBoostType: boostType } }
}

// While the biggest compute-ladder tier that is full AND waiting on its own in-flight reserve
// merge sits at CAP, automatically spend those tokens via Boost: stack the active boost when it
// is already funded by that same tier, otherwise start the preferred preset
// (intro.computeAutoBoostType, default 'standard') from that tier. Never forfeits a different
// active boost. Inert until computeAutoBoostUnlocked (see buyComputeAutoBoost,
// COMPUTE_AUTO_BOOST_UNLOCK_COST = 30 PP). Respects the same forced-priority turn gates as manual
// activate/stack. At most one activate-or-stack per call (one per tick from tickGame).
export const tickAutoComputeBoost = state => {
  if (!(state.computeAutoBoostUnlocked ?? false)) return state
  const waitingTierIndex = getBiggestComputeTierWaitingOnMerge(state)
  if (waitingTierIndex === null) return state

  if ((state.intro.computeBoostType ?? null) !== null) {
    if ((state.intro.computeBoostTierIndex ?? 1) !== waitingTierIndex) return state
    if (!isStackComputeBoostTurnAvailable(state)) return state
    return stackComputeBoost(state)
  }

  const preference = COMPUTE_BOOST_PRESETS[state.intro?.computeAutoBoostType]
    ? state.intro.computeAutoBoostType
    : 'standard'

  if (!isComputeBoostTurnAvailable(state, preference, waitingTierIndex)) return state
  return activateComputeBoost(preference, waitingTierIndex)(state)
}

// Whether reclaimComputeBoost below would do anything right now — any boost currently active at
// all. Only the UNUSED quantity is ever reclaimable — a stack whose time has already fully ticked
// away no longer exists (tickComputeBoost clears type/tierIndex/stacks/remaining back to inactive
// the instant remaining hits 0), so "any boost active" and "something reclaimable" are the same
// check.
export const canReclaimComputeBoost = state => (state.intro.computeBoostType ?? null) !== null

// Reclaims the most recently added, still-unused stack of the active Compute Boost — one at a
// time — the exact inverse of one activateComputeBoost/stackComputeBoost call: refunds 1 token of
// the active boost's own funding tier (capped at COMPUTE_ENTITY_CAP, in case more were earned
// while the boost was running) and subtracts that tier's own getComputeBoostTierDurationSeconds
// back out of computeBoostRemainingSeconds (floored at 0), decrementing computeBoostStacks by 1.
// Clears the boost fully back to inactive (type/tierIndex null, stacks/remaining 0) once the last
// stack is reclaimed, rather than leaving a 0-stack "active" boost around. A same-reference no-op
// while no boost is active (canReclaimComputeBoost's own gate).
export const reclaimComputeBoost = state => {
  if (!canReclaimComputeBoost(state)) return state

  const boostType = state.intro.computeBoostType
  const tierIndex = state.intro.computeBoostTierIndex
  const field = getComputeBoostTierField(tierIndex)
  const nextStacks = (state.intro.computeBoostStacks ?? 0) - 1
  const refunded = Math.min(COMPUTE_ENTITY_CAP, (state.intro[field] ?? 0) + 1)

  if (nextStacks <= 0) {
    return {
      ...state,
      intro: {
        ...state.intro,
        [field]: refunded,
        computeBoostType: null,
        computeBoostTierIndex: null,
        computeBoostStacks: 0,
        computeBoostRemainingSeconds: 0,
      },
    }
  }

  return {
    ...state,
    intro: {
      ...state.intro,
      [field]: refunded,
      computeBoostStacks: nextStacks,
      computeBoostRemainingSeconds: Math.max(0, (state.intro.computeBoostRemainingSeconds ?? 0) - getComputeBoostTierDurationSeconds(boostType, tierIndex)),
    },
  }
}

// Toggles whether a tier's unit-buying autobuyer currently acts (see autobuyersEnabled/tickGame) —
// a plain preference, not a purchase: unconditional, not gated by isProductionFrozen (pausing
// should always be possible), and independently permanent from the autobuyer's own unlock (never
// reset by Prestige/Speed Up — see prestigeGame/speedUpGame). A no-op if this tier's autobuyer
// hasn't been unlocked at all yet (autobuyers[tierId] is still null) — nothing to enable/disable
// before that. The player can always still manually Buy regardless of this flag.
export const setAutobuyerEnabled = (tierId, enabled) => state => {
  if ((state.autobuyers[tierId] ?? null) === null) return state
  return { ...state, autobuyersEnabled: { ...state.autobuyersEnabled, [tierId]: !!enabled } }
}

// Upgrades a tier's own tickspeed multiplier from level N to N+1, spending the tier's own
// resource — enabled by default (needs no PP prerequisite and no autobuyer unlock at all, see
// tickspeedLevels in createInitialGameState); only the *automatic* self-upgrading of this level
// is gated behind its own prestige-count milestone (see applyAutobuyerMilestones/tickGame). Cost is
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
// (rather than waiting for a full level) until it completes its first level, then switches to the
// normal full-block batching from then on — fixes an otherwise-permanent
// stall where a tier with 0 owned generators (0 income) can never afford a full first level on its
// own. Costs a PP amount set by getSmartAutobuyerCost (still a real PP purchase, unlike the
// autobuyer unlock prerequisite itself, which is now free — see applyAutobuyerMilestones) — and
// requires the autobuyer already be unlocked first. Smart and the tier tickspeed autobuyer (also
// milestone-unlocked, independently) require that same prerequisite but not each other — so the
// MainPage PP Upgrades page can show Smart's button and the tier tickspeed autobuyer's status at
// the same time once the autobuyer itself is unlocked. A no-op if not yet unlocked, already smart,
// or there aren't enough unspent points.
export const buySmartAutobuyer = tierId => state => {
  if (isProductionFrozen(state)) return state
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier) return state
  if (state.autobuyers[tierId] == null) return state
  if (state.smartAutobuyer?.[tierId]) return state

  const cost = getSmartAutobuyerCost(tierId)
  if (clampNonNegative(state.prestige.points) < cost) return state

  const latched = latchComputeFlopsPageUnlocked(state)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - cost },
    smartAutobuyer: { ...latched.smartAutobuyer, [tierId]: true },
  }
}

// Toggles whether a tier's own tickspeed multiplier currently self-upgrades automatically (see
// tierTickspeedAutobuyerEnabled/tickGame) — same unconditional, permanent-preference convention as
// setAutobuyerEnabled above. A no-op if this tier's tier tickspeed autobuyer hasn't been bought at
// all yet. The manual tickspeed-multiplier button is unaffected either way.
export const setTierTickspeedAutobuyerEnabled = (tierId, enabled) => state => {
  if (!state.tierTickspeedAutobuyer?.[tierId]) return state
  return { ...state, tierTickspeedAutobuyerEnabled: { ...state.tierTickspeedAutobuyerEnabled, [tierId]: !!enabled } }
}

// Activate (currentLevel null → 1) or upgrade (level N → N+1) Auto-Prestige, always by spending
// Prestige Points — activation is just the N=0 case of the same cost formula
// (getAutoPrestigeCost(0) = AUTO_PRESTIGE_COST). Once bought, tickGame accumulates an attempt
// budget every tick at getAutoPrestigeAttemptRate(level) and calls prestigeGame automatically the
// first time that budget crosses 1 *while* Money is at/above PRESTIGE_THRESHOLD — the player never needs to
// see the full-screen prompt or top banner again. A single global upgrade track, not per-tier —
// there's only one to buy/upgrade. A no-op if there aren't enough unspent points, or while
// already frozen (buy/upgrade it ahead of the next Googol, not to retroactively affect the one
// already in progress).
export const buyAutoPrestige = state => {
  if (isProductionFrozen(state)) return state

  const currentLevel = state.autoPrestige ?? null
  const cost = getAutoPrestigeCost(currentLevel ?? 0)
  if (clampNonNegative(state.prestige.points) < cost) return state

  const latched = latchComputeFlopsPageUnlocked(state)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - cost },
    autoPrestige: (currentLevel ?? 0) + 1,
  }
}

// Toggles whether Auto-Prestige currently acts (see autoPrestigeEnabled/tickGame) — a plain
// preference, not a purchase: unconditional, not gated by isProductionFrozen (pausing should
// always be possible), and independently permanent from autoPrestige itself (never reset by
// Prestige/Speed Up — see prestigeGame/speedUpGame). A no-op if Auto-Prestige hasn't been bought
// at all yet (autoPrestige is null) — nothing to enable/disable before that.
export const setAutoPrestigeEnabled = enabled => state => {
  if ((state.autoPrestige ?? null) === null) return state
  return { ...state, autoPrestigeEnabled: !!enabled }
}

// One-time PP cost to permanently automate RE-LEVELING Auto-Prestige itself (see
// AUTO_PRESTIGE_AUTOBUYER_COST) — once bought, tickGame calls buyAutoPrestige automatically every
// tick, which re-validates its own eligibility internally (no-op unless there's enough PP for the
// next level and production isn't frozen), so a level-up beyond the first no longer needs a manual
// click. This automates RE-leveling only, not the initial activation — a no-op if Auto-Prestige
// hasn't been activated at all yet (state.autoPrestige is null), already bought, if there aren't
// enough unspent points, or while production is frozen — same convention as
// buyTickspeedAutobuyer/buyAutoSpeedUp.
export const buyAutoPrestigeAutobuyer = state => {
  if (isProductionFrozen(state)) return state
  if ((state.autoPrestige ?? null) === null) return state
  if (state.autoPrestigeAutobuyer) return state
  if (clampNonNegative(state.prestige.points) < AUTO_PRESTIGE_AUTOBUYER_COST) return state

  const latched = latchComputeFlopsPageUnlocked(state)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - AUTO_PRESTIGE_AUTOBUYER_COST },
    autoPrestigeAutobuyer: true,
  }
}

// Toggles whether the Auto-Prestige Autobuyer currently acts (see
// autoPrestigeAutobuyerEnabled/tickGame) — same unconditional, permanent-preference convention as
// setAutoPrestigeEnabled/setAutoSpeedUpEnabled/setAutoGlobalTickspeedEnabled above. A no-op if it
// hasn't been bought yet.
export const setAutoPrestigeAutobuyerEnabled = enabled => state => {
  if (!state.autoPrestigeAutobuyer) return state
  return { ...state, autoPrestigeAutobuyerEnabled: !!enabled }
}

// Activate (currentLevel null → 1) or upgrade (level N → N+1) Clock Speed (the global tickspeed
// multiplier), always by spending Factory Bytes (see BYTES_ID) — activation is just the N=0 case
// of the same cost formula (getGlobalTickspeedMultiplierCost(0) = 10 Bytes). A single global upgrade
// track, not per-tier — unlike the per-tier tickspeed multiplier (funded from each tier's own
// resource), this one requires owning at least 1 of the second tier first (see
// isGlobalTickspeedMultiplierUnlocked). A no-op if not yet unlocked, if Bytes are short, or while
// production is frozen.
export const buyGlobalTickspeedMultiplier = state => {
  if (isProductionFrozen(state)) return state
  if (!isGlobalTickspeedMultiplierUnlocked(state)) return state

  const currentLevel = state.globalTickspeedMultiplier ?? null
  const cost = getGlobalTickspeedMultiplierCost(currentLevel ?? 0)
  const available = state.resources[BYTES_ID] ?? 0
  if (available < cost) return state

  return {
    ...state,
    resources: { ...state.resources, [BYTES_ID]: available - cost },
    globalTickspeedMultiplier: (currentLevel ?? 0) + 1,
  }
}

// Reaching PRESTIGE_THRESHOLD money awards Prestige Points (see getPrestigePointsAwarded) and resets all
// progress. XP (prestige.xp) and lastTierXpConsumed — the cumulative counter the last tier's
// XP-funded tickspeed multiplier is funded from (see "The last tier's XP-funded tickspeed" in
// CLAUDE.md) — both reset to 0 on prestige, same as resources/owned/purchased: XP is a run-scoped
// currency, not a permanent one like Prestige Points, and nothing invested via
// consumeXpForLastTierTickspeed survives either. highestMilestone (the money-exponent watermark
// checkMilestones grants further XP against) also resets to the fresh initial value here — as it
// already did before this change, unrelated to it — consistent with Money itself resetting to the
// starting amount. Newly-awarded points add on top of
// any already-unspent balance (PP is a permanent, cumulative currency, unlike resources/owned/
// purchased/XP). Autobuyer unlock is a permanent flag, carried over unchanged across prestige (and
// this same call is what applies applyAutobuyerMilestones — see below — auto-unlocking the next
// tier(s) whose milestone this prestige's incremented count now meets), while
// the run-funded tickspeed levels (now tracked independently of it — see tickspeedLevels) reset to
// their level-1 baseline along with everything else, same as owned/purchased — as do every tier's
// own purchaseLevels/purchaseLevelProgress (see createInitialGameState), which also resets
// getPurchaseBlockSize back down to DEFAULT_PURCHASE_BLOCK_SIZE for every tier, undoing any in-run
// growth — smartAutobuyer/
// tierTickspeedAutobuyer, by contrast, are permanent and carry over unchanged. globalTickspeedMultiplier
// (the Money-funded global tickspeed level) resets to not-yet-bought here too, same as speedUpGame —
// neither reset preserves it, since it's funded from the same Money balance prestige/Speed Up
// already wipe, same as tickspeedLevels. speedUpCount (the stacking 2^speedUpCount production
// multiplier Speed Up builds up) ALSO resets to 0 here — unlike every other automation flag/level
// in this function, which are all permanent, this one doesn't survive a real Prestige, so a fresh
// post-Prestige run has to rebuild its Speed Up multiplier from scratch; autoSpeedUp (the
// automation toggle) is unaffected and still carries over permanently, so it simply starts
// re-accumulating speedUpCount on its own. everUnlockedTierIds, by contrast, is
// NOT carried over — it resets to the fresh initial default same as owned/purchased, so a real
// Prestige still relocks every
// tier beyond the first exactly as it always has (see isTierUnlocked/latchEverUnlockedTiers) —
// this flag exists only to stop consumeXpForLastTierTickspeed's narrower reset from relocking
// tiers, not to change what Prestige/Speed Up themselves do.

// Snapshot of Foundry upgrade progress used as a high-water cap for resetByteFoundry's
// convenience auto-replay (see tickFoundryResetConvenience) — Capacity/Sacrifice included, same
// as every other tracked axis.
export const captureFoundryUpgradeCaps = intro => {
  const disksBuiltTotal = intro?.disksBuiltTotal ?? {}
  const diskCaps = {}
  for (const [sizeKey, count] of Object.entries(disksBuiltTotal)) {
    const n = Math.max(0, Math.floor(clampNonNegative(count)))
    if (n > 0) diskCaps[sizeKey] = n
  }
  return {
    byteCreated: intro?.byteCreated === true,
    productionMilestoneTier: Math.max(0, Math.floor(clampNonNegative(intro?.productionMilestoneTier ?? 0))),
    productionMilestoneTierClaims: Math.max(0, Math.floor(clampNonNegative(intro?.productionMilestoneTierClaims ?? 0))),
    disksBuiltTotal: diskCaps,
    capacity: Math.max(INTRO_STARTING_CAPACITY, clampNonNegative(intro?.capacity ?? INTRO_STARTING_CAPACITY)),
  }
}

// Merge two cap snapshots, taking the max progress on each axis (Invest lexicographic; per-size
// disk build counts; Capacity itself). null/undefined sides are treated as empty.
export const mergeFoundryUpgradeCaps = (a, b) => {
  const left = a ?? captureFoundryUpgradeCaps(null)
  const right = b ?? captureFoundryUpgradeCaps(null)
  const leftAhead =
    left.productionMilestoneTier > right.productionMilestoneTier
    || (left.productionMilestoneTier === right.productionMilestoneTier
      && left.productionMilestoneTierClaims >= right.productionMilestoneTierClaims)
  const invest = leftAhead
    ? {
      productionMilestoneTier: left.productionMilestoneTier,
      productionMilestoneTierClaims: left.productionMilestoneTierClaims,
    }
    : {
      productionMilestoneTier: right.productionMilestoneTier,
      productionMilestoneTierClaims: right.productionMilestoneTierClaims,
    }
  const diskCaps = { ...left.disksBuiltTotal }
  for (const [sizeKey, count] of Object.entries(right.disksBuiltTotal ?? {})) {
    diskCaps[sizeKey] = Math.max(diskCaps[sizeKey] ?? 0, count)
  }
  return {
    byteCreated: left.byteCreated || right.byteCreated,
    ...invest,
    disksBuiltTotal: diskCaps,
    capacity: Math.max(left.capacity ?? INTRO_STARTING_CAPACITY, right.capacity ?? INTRO_STARTING_CAPACITY),
  }
}

const isInvestProgressBelowCap = (intro, caps) => {
  const tier = intro?.productionMilestoneTier ?? 0
  const claims = intro?.productionMilestoneTierClaims ?? 0
  const capTier = caps.productionMilestoneTier ?? 0
  const capClaims = caps.productionMilestoneTierClaims ?? 0
  if (tier < capTier) return true
  if (tier > capTier) return false
  return claims < capClaims
}

const isDiskBuildBelowCap = (state, caps) => {
  const size = getDiskSize(state)
  const built = state.intro?.disksBuiltTotal?.[size] ?? 0
  const cap = caps.disksBuiltTotal?.[String(size)] ?? caps.disksBuiltTotal?.[size] ?? 0
  return built < cap
}

const isCapacityBelowCap = (intro, caps) =>
  (intro?.capacity ?? INTRO_STARTING_CAPACITY) < (caps.capacity ?? INTRO_STARTING_CAPACITY)

// Safety bound: one tick should not infinite-loop if a reducer keeps succeeding unexpectedly.
const FOUNDRY_RESET_CONVENIENCE_MAX_STEPS = 64

// Convenience auto-clicker after resetByteFoundry: while foundryResetCaps is set, press Combine,
// bit-funded Invest / Bandwidth, Disk Build, and Sacrifice (Capacity) whenever their normal turn
// gates allow — capped at the pre-reset highs. Sacrifice fires through the same
// isMemoryCapacityUpgradeAvailable gate a manual click uses (Memory full, nothing higher-ranked
// available), so it only actually advances once Memory naturally refills to the current capacity,
// same as the other steps above waiting on their own costs — this just presses the button instead
// of requiring a manual click. Same-reference no-op when caps are inactive or nothing is eligible.
// Called from tickGame after Disk auto-fill.
export const tickFoundryResetConvenience = state => {
  const caps = state.intro?.foundryResetCaps
  if (!caps) return state

  let next = state
  let changed = false

  if (caps.byteCreated && !next.intro.byteCreated) {
    const combined = combineIntroByte(next)
    if (combined !== next) {
      next = combined
      changed = true
    }
  }

  for (let step = 0; step < FOUNDRY_RESET_CONVENIENCE_MAX_STEPS; step += 1) {
    if (!isInvestProgressBelowCap(next.intro, caps)) break
    const invested = pickIntroProductionMilestone(next)
    if (invested === next) break
    next = invested
    changed = true
  }

  if (isDiskBuildBelowCap(next, caps)) {
    const built = startDiskBuild(next)
    if (built !== next) {
      next = built
      changed = true
    }
  }

  if (isCapacityBelowCap(next.intro, caps)) {
    const sacrificed = pickIntroCapacityMilestone(next)
    if (sacrificed !== next) {
      next = sacrificed
      changed = true
    }
  }

  return changed ? next : state
}

// Settings → Danger zone "Reset Byte Foundry" — for when Capacity (and the Storage/Compute that
// came with it) was pushed too far. Wipes Memory, Capacity, Disks/Storage, Compute, and every
// Foundry upgrade (Combine / Invest / Bandwidth multipliers restart from scratch). Records
// high-water caps in intro.foundryResetCaps so tickFoundryResetConvenience can auto-press those
// upgrade/build/Sacrifice buttons again up to the prior highs. Preserves mainGameUnlocked when
// already true. Leaves every non-intro field untouched.
export const resetByteFoundry = state => {
  const initialIntro = createInitialGameState().intro
  const prev = state.intro ?? {}
  const keepMainUnlocked = prev.mainGameUnlocked === true
  const foundryResetCaps = mergeFoundryUpgradeCaps(prev.foundryResetCaps, captureFoundryUpgradeCaps(prev))

  return {
    ...state,
    intro: {
      ...initialIntro,
      mainGameUnlocked: keepMainUnlocked,
      foundryResetCaps,
    },
  }
}

export const prestigeGame = state => {
  if (clampNonNegative(state.resources[MONEY_ID]) < PRESTIGE_THRESHOLD) return state

  const doublePpLevel = state.prestigeDoublePpLevel ?? 0
  const pointsAwarded = getPrestigePointsAwarded(state.resources[MONEY_ID], doublePpLevel)
  const initial = createInitialGameState()
  const nextPrestigeNumber = state.prestige.count + 1
  const unboundedUnlocked = Boolean(state.prestige?.unboundedUnlocked)
    || nextPrestigeNumber >= PRESTIGE_UNBOUNDED_MIN_COUNT
  const museumEntry = {
    id: `p${nextPrestigeNumber}-${Date.now()}`,
    at: Date.now(),
    prestigeNumber: nextPrestigeNumber,
    pointsAwarded,
    moneyBits: clampNonNegative(state.resources[MONEY_ID]),
  }
  const previousMuseum = state.prestigeMuseum ?? initial.prestigeMuseum
  const nextHistory = [museumEntry, ...(previousMuseum.history ?? [])].slice(0, MUSEUM_HISTORY_CAP)
  const nextHistoryIds = new Set(nextHistory.map(entry => entry.id))
  const nextPinnedIds = (previousMuseum.pinnedIds ?? []).filter(id => nextHistoryIds.has(id))
  // applyAutobuyerMilestones runs last, against the freshly-incremented prestige.count below —
  // it's what actually unlocks the next tier's autobuyer/tier-tickspeed-autobuyer the instant this
  // prestige crosses their milestone (see getAutobuyerUnlockMilestone/
  // getTierTickspeedAutobuyerMilestone), on top of whatever autobuyers/tierTickspeedAutobuyer were
  // already carried over unchanged below.
  return applyAutobuyerMilestones({
    ...initial,
    prestigeMuseum: {
      history: nextHistory,
      pinnedIds: nextPinnedIds,
    },
    // "Memory" (bits/productionAccumulator/mainGameUnlocked) resets to
    // fresh on every real Prestige, in the same atomic reset as resources/owned above — a new
    // cycle always starts this screen's balance from 0 and re-shows it before MainPage. The Byte
    // generator itself and every upgrade to it — capacity/byteCreated/tickSpeedSeconds/
    // productionMultiplier/productionMilestoneTier/productionMilestoneTierClaims — are PERMANENT
    // and carried over from state, exactly like an unlocked autobuyer, so each cycle's gate
    // reopens with whatever production strength was already built rather than from scratch.
    // speedUpGame/overclockGame (below) are intra-cycle soft resets, not new cycles, and still
    // carry the whole intro object through untouched either way.
    intro: {
      ...initial.intro,
      // Falls back to initial.intro's own fresh values (rather than throwing) for a state that
      // predates the intro field entirely — same defensive posture as autobuyers/smartAutobuyer/etc. below.
      capacity: state.intro?.capacity ?? initial.intro.capacity,
      byteCreated: state.intro?.byteCreated ?? initial.intro.byteCreated,
      tickSpeedSeconds: state.intro?.tickSpeedSeconds ?? initial.intro.tickSpeedSeconds,
      productionMultiplier: state.intro?.productionMultiplier ?? initial.intro.productionMultiplier,
      productionMilestoneTier: state.intro?.productionMilestoneTier ?? initial.intro.productionMilestoneTier,
      productionMilestoneTierClaims: state.intro?.productionMilestoneTierClaims ?? initial.intro.productionMilestoneTierClaims,
      computeFundedBandwidthClaims: state.intro?.computeFundedBandwidthClaims ?? initial.intro.computeFundedBandwidthClaims,
      computeBandwidthSacrificeIndex: state.intro?.computeBandwidthSacrificeIndex ?? initial.intro.computeBandwidthSacrificeIndex,
      // Convenience caps from resetByteFoundry — permanent across Prestige so auto-replay keeps
      // working after a real Prestige cycle; cleared only by a full save Reset.
      foundryResetCaps: state.intro?.foundryResetCaps ?? initial.intro.foundryResetCaps,
      // Disks (full or empty), each array's own cache, any in-progress build, and the cumulative
      // build ladder are just as permanent as the Byte generator itself above — "never lost," not
      // part of this cycle's Memory reset. A disk already FULL when Prestige fires stays full, its
      // contents intact even though Memory itself resets to 0 — this is what lets banked-up
      // Storage give a new cycle a head start: the smallest size's own fixed corresponding tier is
      // tier01, whose fresh post-Prestige level 1 is exactly that size's required level, so it's
      // immediately redeemable again. diskAutoRedeemedSizes is deliberately NOT carried over here — it falls
      // through to initial.intro's fresh {} default below, since "once per run" resets every real
      // Prestige (see tickDiskAutoRedeem).
      disks: state.intro?.disks ?? initial.intro.disks,
      disksBuiltTotal: state.intro?.disksBuiltTotal ?? initial.intro.disksBuiltTotal,
      diskCache: state.intro?.diskCache ?? initial.intro.diskCache,
      diskBuild: state.intro?.diskBuild ?? initial.intro.diskBuild,
      diskReadCacheFlush: initial.intro.diskReadCacheFlush,
      diskWriteCache: initial.intro.diskWriteCache,
      // Data Lakes (deposits / purchased Boosters / in-flight transfers / capacityLevel) are just
      // as permanent as Disks above — prepaid lake stock and capacity doublings survive a real
      // Prestige so a new cycle keeps its Booster funding path. Era ascension still resets them
      // with the rest of the Foundry (see buildEraIntroReset).
      dataLakes: state.intro?.dataLakes ?? initial.intro.dataLakes,
      // Every compute-ladder entity (Core through Megacomputer), and the ComputePage reveal latch,
      // are just as permanent as the Byte generator/Storage above — carried over unchanged, never
      // wiped by a real Prestige along with Memory itself.
      computeCores: state.intro?.computeCores ?? initial.intro.computeCores,
      computeCoresEverEarned: state.intro?.computeCoresEverEarned ?? initial.intro.computeCoresEverEarned,
      computeNodes: state.intro?.computeNodes ?? initial.intro.computeNodes,
      computeClusters: state.intro?.computeClusters ?? initial.intro.computeClusters,
      computeNetworks: state.intro?.computeNetworks ?? initial.intro.computeNetworks,
      computeGrids: state.intro?.computeGrids ?? initial.intro.computeGrids,
      computeFabrics: state.intro?.computeFabrics ?? initial.intro.computeFabrics,
      computeClouds: state.intro?.computeClouds ?? initial.intro.computeClouds,
      computeDatacenters: state.intro?.computeDatacenters ?? initial.intro.computeDatacenters,
      computeSupercomputers: state.intro?.computeSupercomputers ?? initial.intro.computeSupercomputers,
      computeMegacomputers: state.intro?.computeMegacomputers ?? initial.intro.computeMegacomputers,
      computeMergePageUnlocked: state.intro?.computeMergePageUnlocked ?? initial.intro.computeMergePageUnlocked,
      // The auto-merge unlock flags (see issue #316) are one-time, irreversible purchases just
      // like the compute-ladder entities and reveal latch above — carried through a real Prestige
      // unchanged, never re-locked.
      autoMergeCoresIntoNode: state.intro?.autoMergeCoresIntoNode ?? initial.intro.autoMergeCoresIntoNode,
      autoMergeNodesIntoCluster: state.intro?.autoMergeNodesIntoCluster ?? initial.intro.autoMergeNodesIntoCluster,
      autoMergeClustersIntoNetwork: state.intro?.autoMergeClustersIntoNetwork ?? initial.intro.autoMergeClustersIntoNetwork,
      autoMergeNetworksIntoGrid: state.intro?.autoMergeNetworksIntoGrid ?? initial.intro.autoMergeNetworksIntoGrid,
      autoMergeGridsIntoFabric: state.intro?.autoMergeGridsIntoFabric ?? initial.intro.autoMergeGridsIntoFabric,
      autoMergeFabricsIntoCloud: state.intro?.autoMergeFabricsIntoCloud ?? initial.intro.autoMergeFabricsIntoCloud,
      autoMergeCloudsIntoDatacenter: state.intro?.autoMergeCloudsIntoDatacenter ?? initial.intro.autoMergeCloudsIntoDatacenter,
      autoMergeDatacentersIntoSupercomputer: state.intro?.autoMergeDatacentersIntoSupercomputer ?? initial.intro.autoMergeDatacentersIntoSupercomputer,
      autoMergeSupercomputersIntoMegacomputer: state.intro?.autoMergeSupercomputersIntoMegacomputer ?? initial.intro.autoMergeSupercomputersIntoMegacomputer,
      // Merge-duration step upgrades are one-time permanent purchases (see issue #377) — carried
      // through a real Prestige unchanged, same as the auto-merge flags above.
      computeMergeDurationUpgrades: state.intro?.computeMergeDurationUpgrades ?? initial.intro.computeMergeDurationUpgrades,
      // Auto-boost preset preference is permanent Compute QoL (see tickAutoComputeBoost) — carried
      // through Prestige unchanged. Active boost fields below still reset every cycle.
      computeAutoBoostType: state.intro?.computeAutoBoostType ?? initial.intro.computeAutoBoostType,
      // Any reserve merge already in flight when Prestige fires (see issue #321) represents tokens
      // already committed/spent out of the normal slots — carried through PERMANENT, same as the
      // compute-ladder entities/auto-merge flags above, so it just keeps counting down seamlessly
      // across the cycle boundary instead of losing the committed tokens. Deliberately NOT
      // run-scoped like computeBoostRemainingSeconds below.
      computeCoresMergeRemainingSeconds: state.intro?.computeCoresMergeRemainingSeconds ?? initial.intro.computeCoresMergeRemainingSeconds,
      computeNodesMergeRemainingSeconds: state.intro?.computeNodesMergeRemainingSeconds ?? initial.intro.computeNodesMergeRemainingSeconds,
      computeClustersMergeRemainingSeconds: state.intro?.computeClustersMergeRemainingSeconds ?? initial.intro.computeClustersMergeRemainingSeconds,
      computeNetworksMergeRemainingSeconds: state.intro?.computeNetworksMergeRemainingSeconds ?? initial.intro.computeNetworksMergeRemainingSeconds,
      computeGridsMergeRemainingSeconds: state.intro?.computeGridsMergeRemainingSeconds ?? initial.intro.computeGridsMergeRemainingSeconds,
      computeFabricsMergeRemainingSeconds: state.intro?.computeFabricsMergeRemainingSeconds ?? initial.intro.computeFabricsMergeRemainingSeconds,
      computeCloudsMergeRemainingSeconds: state.intro?.computeCloudsMergeRemainingSeconds ?? initial.intro.computeCloudsMergeRemainingSeconds,
      computeDatacentersMergeRemainingSeconds: state.intro?.computeDatacentersMergeRemainingSeconds ?? initial.intro.computeDatacentersMergeRemainingSeconds,
      computeSupercomputersMergeRemainingSeconds: state.intro?.computeSupercomputersMergeRemainingSeconds ?? initial.intro.computeSupercomputersMergeRemainingSeconds,
      // computeBoostType/computeBoostTierIndex/computeBoostStacks/computeBoostRemainingSeconds are
      // deliberately NOT listed here — they fall through to initial.intro's fresh
      // null/null/0/0 defaults above, since an active boost is run-scoped and resets every real
      // Prestige, unlike the Cores/Nodes/etc. it's
      // spent from.
    },
    autobuyers: state.autobuyers ?? initial.autobuyers,
    // Same permanence as the four global automations' own "enabled" flags below — a paused
    // preference should survive a Prestige exactly like the autobuyer unlock itself does (see
    // setAutobuyerEnabled/setTierTickspeedAutobuyerEnabled).
    autobuyersEnabled: state.autobuyersEnabled ?? initial.autobuyersEnabled,
    smartAutobuyer: state.smartAutobuyer ?? initial.smartAutobuyer,
    tierTickspeedAutobuyer: state.tierTickspeedAutobuyer ?? initial.tierTickspeedAutobuyer,
    tierTickspeedAutobuyerEnabled: state.tierTickspeedAutobuyerEnabled ?? initial.tierTickspeedAutobuyerEnabled,
    autoPrestige: state.autoPrestige ?? initial.autoPrestige,
    // The four automations' "enabled" (pause/resume) flags are just as permanent as their parent
    // "unlocked" flags above — a paused preference should survive a Prestige exactly like the
    // purchase itself does (see setAutoPrestigeEnabled/setAutoSpeedUpEnabled/
    // setAutoGlobalTickspeedEnabled/setAutoPrestigeAutobuyerEnabled).
    autoPrestigeEnabled: state.autoPrestigeEnabled ?? initial.autoPrestigeEnabled,
    autoPrestigeAutobuyer: state.autoPrestigeAutobuyer ?? initial.autoPrestigeAutobuyer,
    autoPrestigeAutobuyerEnabled: state.autoPrestigeAutobuyerEnabled ?? initial.autoPrestigeAutobuyerEnabled,
    prestigeSpeedBonusUnlocked: state.prestigeSpeedBonusUnlocked ?? initial.prestigeSpeedBonusUnlocked,
    prestigeDoublePpLevel: state.prestigeDoublePpLevel ?? initial.prestigeDoublePpLevel,
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoSpeedUpEnabled: state.autoSpeedUpEnabled ?? initial.autoSpeedUpEnabled,
    computeAutoBoostUnlocked: state.computeAutoBoostUnlocked ?? initial.computeAutoBoostUnlocked,
    autoGlobalTickspeed: state.autoGlobalTickspeed ?? initial.autoGlobalTickspeed,
    autoGlobalTickspeedEnabled: state.autoGlobalTickspeedEnabled ?? initial.autoGlobalTickspeedEnabled,
    // speedUpCount is NOT carried over here — it resets to 0 (initial.speedUpCount) same as
    // globalTickspeedMultiplier above, so the stacking 2^speedUpCount production multiplier from
    // Speed Up doesn't survive a real Prestige (a real Prestige is the bigger, rarer reset; Speed
    // Up's multiplier is meant to be rebuilt within a single Prestige cycle, not to keep
    // compounding across them). autoSpeedUp (the automation toggle) is unaffected by this — it
    // still carries over permanently above, so a player who already bought Auto Speed Up doesn't
    // need to re-buy it; it simply starts re-accumulating speedUpCount from 0 on the next cycle.
    // overclockCount is likewise NOT carried over — same reasoning as speedUpCount above, just one
    // reset tier higher: unlike an ordinary Speed Up (which speedUpGame explicitly carries
    // overclockCount through unchanged — see there), a real Prestige is bigger than Overclock too,
    // so its own permanent bonus also has to be rebuilt from scratch each Prestige cycle rather
    // than compounding forever across every future Prestige.
    // lastTierXpConsumed is NOT carried over — it resets to 0 (initial.lastTierXpConsumed) along
    // with prestige.xp below, since it's funded by spending XP, a run-scoped currency now.
    // everUnlockedTierIds is deliberately NOT carried over here either — unlike every permanent
    // flag above, it resets to the fresh initial default (only the first tier true) same as
    // owned/purchased, so a real Prestige/Speed Up still relocks every tier beyond the first
    // exactly like before this flag existed (see isTierUnlocked) — this flag only exists to stop
    // consumeXpForLastTierTickspeed's narrower owned-only reset from relocking tiers, not to
    // change what a full Prestige/Speed Up reset does.
    computeFlops: {
      pageUnlocked: Boolean(state.computeFlops?.pageUnlocked)
        || clampNonNegative(state.prestige.points) + pointsAwarded >= COMPUTE_FLOPS_REVEAL_PP,
      owned: state.computeFlops?.owned ?? initial.computeFlops.owned,
      cumulativeBoost: initial.computeFlops.cumulativeBoost,
    },
    prestige: {
      ...initial.prestige,
      points: clampNonNegative(state.prestige.points) + pointsAwarded,
      count: nextPrestigeNumber,
      unboundedUnlocked,
    },
  })
}

// Pin a Prestige museum history entry (Supporter UI). No-op if missing, already pinned, or at cap.
export const pinMuseumEntry = entryId => state => {
  const museum = state.prestigeMuseum ?? { history: [], pinnedIds: [] }
  if (!(museum.history ?? []).some(entry => entry.id === entryId)) return state
  if ((museum.pinnedIds ?? []).includes(entryId)) return state
  if ((museum.pinnedIds ?? []).length >= MUSEUM_PIN_CAP) return state
  return {
    ...state,
    prestigeMuseum: {
      history: museum.history ?? [],
      pinnedIds: [...(museum.pinnedIds ?? []), entryId],
    },
  }
}

export const unpinMuseumEntry = entryId => state => {
  const museum = state.prestigeMuseum ?? { history: [], pinnedIds: [] }
  if (!(museum.pinnedIds ?? []).includes(entryId)) return state
  return {
    ...state,
    prestigeMuseum: {
      history: museum.history ?? [],
      pinnedIds: (museum.pinnedIds ?? []).filter(id => id !== entryId),
    },
  }
}

// A more frequent soft-reset than real Prestige, available well before Money reaches PRESTIGE_THRESHOLD:
// once the last tier reaches getSpeedUpRequirement(speedUpCount)'s target LEVEL — level 2 for the
// first activation, level 3 for the second, level 4 for the third, … — resets resources/owned/purchased
// (and every other per-run field, including every tier's own tickspeed level, purchase level/
// progress, and the global
// tickspeed multiplier, both back to not-yet-bought — same reset prestigeGame now does) back to a
// fresh game exactly like createInitialGameState, but permanently doubles production speed (see
// getSpeedUpMultiplier). Autobuyer unlock/smartAutobuyer/tierTickspeedAutobuyer/autoPrestige/
// prestigeSpeedBonusUnlocked/autoSpeedUp/autoGlobalTickspeed (the *automation toggles*, as opposed
// to the global tickspeed multiplier's own level) carry over unchanged — so if the global
// tickspeed Autobuyer was already bought, tickGame simply starts re-buying the multiplier back up
// from scratch once Money allows. lastTierXpConsumed resets to 0 here too, same as prestigeGame —
// the last tier's own owned/purchased count also resets to 0 like every other tier's, so the
// XP-funded mechanic (see isLastTierTickspeedXpUnlocked's live owned-vs-block-size check) is
// doubly disengaged: not just inactive until owned is bought back up to a full level, but with
// nothing banked to re-engage with even then, since Speed Up wipes the XP investment along with
// everything else XP-funded. Resetting the last tier's level back to 1 also resets
// getPurchaseBlockSize back down to DEFAULT_PURCHASE_BLOCK_SIZE for every tier, undoing any
// in-run growth.
// everUnlockedTierIds, by contrast, is NOT carried over here either (same as prestigeGame) — it
// resets to the fresh default, so Speed Up still relocks every tier beyond the first exactly as
// it always has. Unlike
// prestigeGame, `prestige.points`/`count` are passed through completely untouched — Speed Up is
// unrelated to real Prestige or Prestige Points, and doesn't award or spend any — but
// `prestige.xp` resets to 0, same as lastTierXpConsumed, since XP is a run-scoped currency now.
// `prestige.highestMilestone` (the money-exponent watermark checkMilestones grants further XP
// against) resets to the fresh initial value here too, same as prestigeGame already did — it must
// track the reset resources, not the previous run's peak, or a fresh run would earn no XP at all
// until money climbs back past wherever the last run left off (previously an asymmetry between the
// two reset paths — see docs/DESIGN_HISTORY.md). A no-op (returns the same state) while frozen (a
// frozen state is waiting on a real Prestige, not a Speed Up) or before the last tier has reached
// that cycle's requirement.
export const speedUpGame = state => {
  if (isProductionFrozen(state)) return state
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  const lastTierLevel = state.purchaseLevels?.[lastTier.id] ?? 1
  if (lastTierLevel < getSpeedUpRequirement(state.speedUpCount ?? 0)) return state

  const initial = createInitialGameState()
  return {
    ...initial,
    // Unlike prestigeGame (which resets Memory/the gate every cycle but keeps the generator itself
    // permanent — see there), this is an intra-cycle soft reset and carries the whole intro object
    // through completely untouched, Memory included.
    intro: state.intro ?? initial.intro,
    autobuyers: state.autobuyers ?? initial.autobuyers,
    // Same permanence as prestigeGame gives these two "enabled" flags — see there.
    autobuyersEnabled: state.autobuyersEnabled ?? initial.autobuyersEnabled,
    smartAutobuyer: state.smartAutobuyer ?? initial.smartAutobuyer,
    tierTickspeedAutobuyer: state.tierTickspeedAutobuyer ?? initial.tierTickspeedAutobuyer,
    tierTickspeedAutobuyerEnabled: state.tierTickspeedAutobuyerEnabled ?? initial.tierTickspeedAutobuyerEnabled,
    autoPrestige: state.autoPrestige ?? initial.autoPrestige,
    // Same permanence as prestigeGame gives these four "enabled" flags above — see there.
    autoPrestigeEnabled: state.autoPrestigeEnabled ?? initial.autoPrestigeEnabled,
    autoPrestigeAutobuyer: state.autoPrestigeAutobuyer ?? initial.autoPrestigeAutobuyer,
    autoPrestigeAutobuyerEnabled: state.autoPrestigeAutobuyerEnabled ?? initial.autoPrestigeAutobuyerEnabled,
    prestigeSpeedBonusUnlocked: state.prestigeSpeedBonusUnlocked ?? initial.prestigeSpeedBonusUnlocked,
    prestigeDoublePpLevel: state.prestigeDoublePpLevel ?? initial.prestigeDoublePpLevel,
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoSpeedUpEnabled: state.autoSpeedUpEnabled ?? initial.autoSpeedUpEnabled,
    computeAutoBoostUnlocked: state.computeAutoBoostUnlocked ?? initial.computeAutoBoostUnlocked,
    autoGlobalTickspeed: state.autoGlobalTickspeed ?? initial.autoGlobalTickspeed,
    autoGlobalTickspeedEnabled: state.autoGlobalTickspeedEnabled ?? initial.autoGlobalTickspeedEnabled,
    // lastTierXpConsumed is NOT carried over — it resets to 0 (initial.lastTierXpConsumed) along
    // with prestige.xp below.
    // everUnlockedTierIds is deliberately NOT carried over here — unlike every permanent flag
    // above, it resets to the fresh initial default (only the first tier true) same as owned/
    // purchased, so a real Prestige/Speed Up still relocks every tier beyond the first exactly
    // like before this flag existed (see isTierUnlocked) — this flag only exists to stop
    // consumeXpForLastTierTickspeed's narrower owned-only reset from relocking tiers, not to
    // change what a full Prestige/Speed Up reset does.
    // Museum is permanent per save — Speed Up must not wipe prestige history/pins.
    prestigeMuseum: state.prestigeMuseum ?? initial.prestigeMuseum,
    // Flops Compute owned counts + page unlock are permanent; per-cycle boost resets like Prestige.
    computeFlops: {
      pageUnlocked: Boolean(state.computeFlops?.pageUnlocked),
      owned: state.computeFlops?.owned ?? initial.computeFlops.owned,
      cumulativeBoost: initial.computeFlops.cumulativeBoost,
    },
    prestige: { ...state.prestige, xp: initial.prestige.xp, highestMilestone: initial.prestige.highestMilestone },
    speedUpCount: (state.speedUpCount ?? 0) + 1,
    // overclockCount is carried over unchanged (NOT incremented, NOT reset) — an ordinary Speed Up
    // is a smaller reset than Overclock and must not touch its permanent bonus either way; only
    // overclockGame itself increments it, and only prestigeGame/overclockGame's own reset of
    // speedUpCount ever wipe anything Overclock-related.
    overclockCount: state.overclockCount ?? initial.overclockCount,
  }
}

// A second, steeper soft-reset than Speed Up (see speedUpGame above), gated behind the last tier's
// LEVEL reaching getOverclockRequirement(overclockCount) — one more than the last claimed level.
// Resets everything speedUpGame does (every per-run field back to a fresh game, permanent
// automation toggles/flags carried over unchanged) — but where speedUpGame increments speedUpCount,
// overclockGame resets it to 0 (initial.speedUpCount) instead, wiping Speed Up's own stacking
// 2^speedUpCount production multiplier along with the rest of the reset. Unlike speedUpGame's own
// +1 self-increment, overclockCount jumps directly to the last tier's *current* level rather than
// just the minimum required +1 — since that level is only ever checked against, never consumed, a
// player who claims late (last claimed at level 5, last tier now at level 8) catches up to level 8
// in one claim instead of needing three separate ones. This is always at least a +1 gain, since the
// eligibility check above already guarantees lastTierLevel > overclockCount. Overclock's reward
// (getOverclockMultiplier — folded into getGlobalTickspeedProductionMultiplier's own regular and
// milestone steps, see getEffectiveTierTickSpeedSeconds) is keyed off this same overclockCount.
// `autoSpeedUp` (the automation toggle deciding whether Speed Up
// fires automatically) is unaffected by wiping speedUpCount — it's still carried over permanently
// below, so it simply starts re-accumulating speedUpCount from 0 on the next cycle, same as after a
// real Prestige. A no-op (returns the same state) while frozen or before the last tier has reached
// that cycle's requirement — same guards as speedUpGame.
export const overclockGame = state => {
  if (isProductionFrozen(state)) return state
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  const lastTierLevel = state.purchaseLevels?.[lastTier.id] ?? 1
  if (lastTierLevel < getOverclockRequirement(state.overclockCount ?? 0)) return state

  const initial = createInitialGameState()
  return {
    ...initial,
    // Unlike prestigeGame (which resets Memory/the gate every cycle but keeps the generator itself
    // permanent — see there), this is an intra-cycle soft reset and carries the whole intro object
    // through completely untouched, same as speedUpGame.
    intro: state.intro ?? initial.intro,
    autobuyers: state.autobuyers ?? initial.autobuyers,
    // Same permanence as speedUpGame/prestigeGame give these two "enabled" flags — see there.
    autobuyersEnabled: state.autobuyersEnabled ?? initial.autobuyersEnabled,
    smartAutobuyer: state.smartAutobuyer ?? initial.smartAutobuyer,
    tierTickspeedAutobuyer: state.tierTickspeedAutobuyer ?? initial.tierTickspeedAutobuyer,
    tierTickspeedAutobuyerEnabled: state.tierTickspeedAutobuyerEnabled ?? initial.tierTickspeedAutobuyerEnabled,
    autoPrestige: state.autoPrestige ?? initial.autoPrestige,
    // Same permanence as speedUpGame/prestigeGame give these four "enabled" flags above — see there.
    autoPrestigeEnabled: state.autoPrestigeEnabled ?? initial.autoPrestigeEnabled,
    autoPrestigeAutobuyer: state.autoPrestigeAutobuyer ?? initial.autoPrestigeAutobuyer,
    autoPrestigeAutobuyerEnabled: state.autoPrestigeAutobuyerEnabled ?? initial.autoPrestigeAutobuyerEnabled,
    prestigeSpeedBonusUnlocked: state.prestigeSpeedBonusUnlocked ?? initial.prestigeSpeedBonusUnlocked,
    prestigeDoublePpLevel: state.prestigeDoublePpLevel ?? initial.prestigeDoublePpLevel,
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoSpeedUpEnabled: state.autoSpeedUpEnabled ?? initial.autoSpeedUpEnabled,
    computeAutoBoostUnlocked: state.computeAutoBoostUnlocked ?? initial.computeAutoBoostUnlocked,
    autoGlobalTickspeed: state.autoGlobalTickspeed ?? initial.autoGlobalTickspeed,
    autoGlobalTickspeedEnabled: state.autoGlobalTickspeedEnabled ?? initial.autoGlobalTickspeedEnabled,
    // lastTierXpConsumed/everUnlockedTierIds are NOT carried over — same reasoning as speedUpGame,
    // see there.
    // Museum is permanent per save — Overclock must not wipe prestige history/pins.
    prestigeMuseum: state.prestigeMuseum ?? initial.prestigeMuseum,
    // Flops Compute owned counts + page unlock are permanent; per-cycle boost resets like Prestige.
    computeFlops: {
      pageUnlocked: Boolean(state.computeFlops?.pageUnlocked),
      owned: state.computeFlops?.owned ?? initial.computeFlops.owned,
      cumulativeBoost: initial.computeFlops.cumulativeBoost,
    },
    prestige: { ...state.prestige, xp: initial.prestige.xp, highestMilestone: initial.prestige.highestMilestone },
    // speedUpCount is deliberately NOT carried over (unlike speedUpGame's own self-increment) —
    // resets to 0 (initial.speedUpCount), wiping Speed Up's own stacking bonus. This is Overclock's
    // defining trade: a steeper reset, in exchange for a permanent, much smaller, but
    // never-touched-by-an-ordinary-Speed-Up global tickspeed bonus instead.
    speedUpCount: initial.speedUpCount,
    overclockCount: lastTierLevel,
  }
}

// One-time PP cost to permanently automate Speed Up (see AUTO_SPEED_UP_COST) — once bought,
// tickGame calls speedUpGame automatically every tick, which re-validates eligibility internally
// (no-op unless the last tier has reached 10 purchases and production isn't frozen), so this just
// removes the need for a manual click once eligible. A no-op if already bought, if there aren't
// enough unspent points, or while production is frozen — same convention as
// buyPrestigeSpeedBonus/buySmartAutobuyer.
export const buyAutoSpeedUp = state => {
  if (isProductionFrozen(state)) return state
  if (state.autoSpeedUp) return state
  if (clampNonNegative(state.prestige.points) < AUTO_SPEED_UP_COST) return state

  const latched = latchComputeFlopsPageUnlocked(state)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - AUTO_SPEED_UP_COST },
    autoSpeedUp: true,
  }
}

// One-time PP cost to permanently unlock Compute auto-Boost (see COMPUTE_AUTO_BOOST_UNLOCK_COST =
// 30). Once bought, tickAutoComputeBoost may activate/stack the preferred preset while a reserve
// merge is in flight and a compute-ladder tier is at CAP. A no-op if already unlocked, if there
// aren't enough unspent points, or while production is frozen — same convention as buyAutoSpeedUp.
export const buyComputeAutoBoost = state => {
  if (isProductionFrozen(state)) return state
  if (state.computeAutoBoostUnlocked) return state
  if (clampNonNegative(state.prestige.points) < COMPUTE_AUTO_BOOST_UNLOCK_COST) return state

  const latched = latchComputeFlopsPageUnlocked(state)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - COMPUTE_AUTO_BOOST_UNLOCK_COST },
    computeAutoBoostUnlocked: true,
  }
}

// Toggles whether Auto Speed Up currently acts (see autoSpeedUpEnabled/tickGame) — same
// unconditional, permanent-preference convention as setAutoPrestigeEnabled above. A no-op if
// Auto Speed Up hasn't been bought yet.
export const setAutoSpeedUpEnabled = enabled => state => {
  if (!state.autoSpeedUp) return state
  return { ...state, autoSpeedUpEnabled: !!enabled }
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

  const latched = latchComputeFlopsPageUnlocked(state)
  return {
    ...latched,
    prestige: { ...latched.prestige, points: latched.prestige.points - TICKSPEED_AUTOBUYER_COST },
    autoGlobalTickspeed: true,
  }
}

// Toggles whether the global Tickspeed Autobuyer currently acts (see
// autoGlobalTickspeedEnabled/tickGame) — same unconditional, permanent-preference convention as
// setAutoPrestigeEnabled/setAutoSpeedUpEnabled above. A no-op if it hasn't been bought yet.
export const setAutoGlobalTickspeedEnabled = enabled => state => {
  if (!state.autoGlobalTickspeed) return state
  return { ...state, autoGlobalTickspeedEnabled: !!enabled }
}

// Spends XP to compound another LAST_TIER_XP_TICKSPEED_STEP (1%) into the last tier's own
// tickspeed multiplier per XP consumed (see getLastTierXpTickspeedMultiplier) — durable within the
// current run (never decays or reverts on its own), but reset to 0 by prestigeGame/speedUpGame
// along with prestige.xp itself, same as every other run-scoped field. Only
// available while isLastTierTickspeedXpUnlocked (the last tier currently owns >=
// getPurchaseBlockSize(state)), which is when it's currently replacing that tier's Money-funded
// tickspeed button (see buyTickspeedMultiplier). Every successful consumption, no
// matter how small, resets tier 1 through the second-to-last tier's `owned` (and, to keep them in
// sync, `resources`) counts back to 0 — the current *quantity* of each of those tiers, not their
// `purchased` lifetime count or their purchaseLevels/purchaseLevelProgress (cost/level progress is
// left completely untouched everywhere), plus the
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
