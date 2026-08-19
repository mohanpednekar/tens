import { AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, getTierBaseTickSpeedSeconds, GLOBAL_TICKSPEED_MILESTONE_STEP, GLOBAL_TICKSPEED_PRODUCTION_STEP, GOOGOL, INTRO_BYTE_BASE_RATE, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_MULTIPLIER, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, INTRO_CONVERSION_UNLOCK_CAPACITY, INTRO_MIN_TICK_SPEED_SECONDS, INTRO_PRODUCTION_MULTIPLIER_STEP, INTRO_STARTING_CAPACITY, INTRO_STARTING_TICK_SPEED_SECONDS, INTRO_STORAGE_UNLOCK_CAPACITY, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT, LAST_TIER_XP_TICKSPEED_STEP, MAX_OFFLINE_SECONDS, MONEY_ID, MONEY_STARTING_AMOUNT, OFFLINE_PROGRESS_SPEED_MULTIPLIER, OVERCLOCK_MULTIPLIER_STEP, OVERCLOCK_REQUIREMENT_STEP, PRESTIGE_POINT_SPEED_BONUS, PRESTIGE_SPEED_BONUS_UNLOCK_COST, PRESTIGE_THRESHOLD, PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS, PURCHASE_BLOCK_SIZE_GROWTH_STEP, PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE, PURCHASE_MILESTONE_MULTIPLIER_BASE, RESOURCE_SYMBOL, SMART_AUTOBUYER_COST_MULTIPLIER, SPEED_UP_MULTIPLIER_BASE, STORAGE_BANK_LADDER_CAP, STORAGE_BUILD_COST_MULTIPLIER, TICKSPEED_AUTOBUYER_COST, TICKSPEED_MULTIPLIER_BASE_EXPONENT, TICKSPEED_PRODUCTION_STEP, TIER_DEFINITIONS, TIER_TICKSPEED_AUTOBUYER_MILESTONE_START, TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP } from './layers'

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
    capacity: INTRO_STARTING_CAPACITY,        // PERMANENT — Memory's ceiling, grown by "Sacrifice for 10x Capacity"
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
    // Resets to false every real Prestige. True the instant any bits are ever converted into
    // Kilobytes this cycle (manual or auto — see convertIntroBitsToKilobytes/tickIntroAutoInvest);
    // drives App.jsx's page-routing gate away from this screen and into MainPage. Not a "frozen"
    // flag at all — converting keeps working indefinitely afterward too, with no cap.
    mainGameUnlocked: false,
    // PERMANENT — { [capacityBits]: count } of currently-FULL Storage banks of that size (see
    // tickStorageAutoFill/redeemStorageBank below) — "never lost," survives Prestige/Speed Up/
    // Overclock exactly like the Byte generator itself (a full bank's contents ride through a real
    // Prestige untouched even though Memory itself resets, since a bank is a separate store, not
    // part of Memory). Empty object, not per-denomination zeros, since the set of denominations
    // ever built is open-ended. The number of currently EMPTY banks of a size is always
    // storageBanksBuiltTotal[size] - storageBanks[size].
    storageBanks: {},
    // PERMANENT — { [capacityBits]: cumulative count } of every bank ever built (constructed) at
    // that size, full or empty, including ones since redeemed — unlike storageBanks above,
    // redeemStorageBank never decrements this. Drives getStorageBankSize's one-way ladder advance
    // past STORAGE_BANK_LADDER_CAP; see the "Byte Foundry Storage" comment in layers.js.
    storageBanksBuiltTotal: {},
    // PERMANENT — whether tickGame auto-redeems a matching Storage bank every tick (see
    // tickStorageAutoRedeem) instead of requiring a manual click. A plain preference, not a
    // purchase — defaults ON for every size (no pause toggle is currently rendered — see
    // ByteFoundryPage — so there's no in-UI way to turn it off yet; the field and
    // setStorageAutoRedeemEnabled/tickStorageAutoRedeem plumbing all still exist for when that
    // toggle returns). Doesn't gate the smallest (1 KB) denomination at all either way — see
    // tickStorageAutoRedeem.
    storageAutoRedeemEnabled: true,
    // NOT permanent — resets to {} on every real Prestige (see prestigeGame), unlike every other
    // Storage field above. { [capacityBits]: true } once tickStorageAutoRedeem has auto-redeemed
    // that size this cycle, capping auto-redeem at one bank per size per cycle — further eligible
    // banks of an already-auto-redeemed size need a manual click for the rest of the cycle.
    storageAutoRedeemedSizes: {},
    // PERMANENT — like the Byte generator/Storage banks above, carried over every real Prestige
    // (see prestigeGame). Automatically incremented by tickComputeCoreConversion every time Memory
    // is full, once capacity has reached INTRO_COMPUTE_CORE_UNLOCK_CAPACITY — each conversion
    // flushes the CURRENT capacity (not a fixed cost) for exactly 1 Core, so a higher capacity
    // makes each future Core more expensive. Spent 1 at a time by activateComputeBoost below —
    // see the "Byte Foundry Compute Boost" section of layers.js.
    computeCores: 0,
    // PERMANENT — a monotonically-increasing lifetime counter, incremented by
    // tickComputeCoreConversion alongside computeCores itself but NEVER decremented by spending
    // (activateComputeBoost) or merging (tickComputeNodeConversion) — the actual "CUMULATIVE total
    // of Compute Cores ever earned" computeMergePageUnlocked below needs. computeCores alone can't
    // serve this purpose: a player who spends a Boost before ever holding 8 Cores at once would
    // otherwise never trip the latch, even after having earned well past 8 in total.
    computeCoresEverEarned: 0,
    // PERMANENT — automatically incremented by tickComputeNodeConversion every time computeCores
    // reaches COMPUTE_CORES_PER_NODE (8), which are then spent (computeCores -= 8). Also the input
    // to mergeComputeNodesIntoCluster below — unlike Core→Node, merging Nodes upward is a manual,
    // player-triggered action, not automatic on tick.
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
    // tickComputeCoreConversion, the only place this ever flips). Gated on computeCoresEverEarned
    // (above) reaching COMPUTE_CORES_PER_NODE (8), not the current live computeCores balance —
    // merging Nodes back down, or spending Cores on a Boost (even before ever holding 8 at once),
    // must never prevent or re-hide the page once earned.
    computeMergePageUnlocked: false,
    // NOT permanent — resets to null/0/0 on every real Prestige (unlike computeCores/computeNodes
    // themselves), but carried through untouched by Speed Up/Overclock, same as the rest of intro.
    // Which COMPUTE_BOOST_PRESETS key is currently active, or null if none is. See
    // activateComputeBoost/tickComputeBoost/getComputeBoostMultiplier below.
    computeBoostType: null,
    // How many times the active preset has been stacked (see activateComputeBoost) — 0 while
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
// called from prestigeGame right after count is incremented, and also from storage.js's
// migrateState on load (so a save from before this feature existed retroactively receives whatever
// it's already earned, without needing another prestige to trigger it). Never revokes an
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
// production and purchasing (manual and automatic) freezes — the only action left is to Prestige.
// Exported so the UI can drive the same gate (disabling every other control) that the engine
// itself enforces on tickGame/buyTier/buyAutobuyer below.
export const isProductionFrozen = state => clampNonNegative(state.resources[MONEY_ID]) >= PRESTIGE_THRESHOLD

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
// this with an effective batch size of 1 while still on its very first level (tier level === 1) —
// otherwise a tier that's never been manually bought can never afford autobuyerBatchSize's full
// first level (0 owned generators produce $0 income, and the starting balance only ever covers
// 1 unit) and stalls forever — then reverts to the normal autobuyerBatchSize from its second
// level onward.
export const tickGame = (elapsedSeconds, autobuyerBatchSize = 1) => state => {
  // The Byte Foundry intro runs first, every tick: passive production, then Storage's own
  // auto-fill (Memory -> empty banks) gets first claim on the resulting Memory balance, ahead of
  // tickIntroAutoInvest's own direct bit-to-Kilobyte conversion — otherwise a bank the player has
  // already built and is waiting to fill would be starved by fresh Memory being auto-converted out
  // from under it before it ever reached the bank. Auto-fill doesn't depend on tier01's level at
  // all (unlike auto-redeem below), so running it this early costs nothing.
  //
  // Compute Core conversion (tickComputeCoreConversion, then tickComputeNodeConversion) runs next,
  // right after auto-fill and before tickIntroAutoInvest — the same "first claim" priority
  // auto-fill itself has over ordinary Kilobyte conversion: once capacity has reached
  // INTRO_COMPUTE_CORE_UNLOCK_CAPACITY and Memory is full (isComputeCoreConversionUnlocked),
  // Memory converts into Compute Cores before any of it can be converted into Kilobytes instead —
  // unrelated to Storage state entirely. tickIntroAutoInvest then converts whatever Memory is left
  // over (in practice usually nothing, once Compute Core conversion is active, since it flushes
  // the full balance). tickIntroProduction short-circuits to the
  // same-reference no-op once !byteCreated, and tickIntroAutoInvest once bits can't cover even one
  // more unit (their own first-line guards); none of these ever fully freeze, matching the "return
  // the same reference so React can bail out" convention every other no-op path in this function
  // already follows.
  const stateAfterStorage = tickStorageAutoFill(tickIntroProduction(elapsedSeconds)(state))
  const stateAfterComputeCores = tickComputeNodeConversion(tickComputeCoreConversion(stateAfterStorage))
  // Counts an active Compute Boost's remaining duration down, unconditionally, alongside the rest
  // of the Byte Foundry intro ticks above — see tickComputeBoost.
  const stateAfterComputeBoost = tickComputeBoost(elapsedSeconds)(stateAfterComputeCores)
  const stateAfterIntro = tickIntroAutoInvest(stateAfterComputeBoost)

  const autoPrestigeLevel = stateAfterIntro.autoPrestige ?? null
  // Paused (see setAutoPrestigeEnabled/CLAUDE.md's "pause/resume" bullet) is treated exactly like
  // "never bought" for every automation purpose below — the level and any PP already spent stay
  // untouched, and the manual Prestige button keeps working regardless, but tickGame itself
  // neither accumulates the attempt budget nor fires prestigeGame automatically while paused.
  const autoPrestigeActive = autoPrestigeLevel !== null && (stateAfterIntro.autoPrestigeEnabled ?? true)

  // Storage's own auto-redeem (full banks -> tier01 units) runs last, through every branch below,
  // against this tick's FINAL tier01 level (post autobuyer/Speed Up) — isStorageBankRedeemable
  // depends on it, so a bank whose size only just became redeemable once tier01 leveled up THIS
  // tick still redeems the same tick. Auto-fill already ran above (see stateAfterIntro), ahead of
  // tickIntroAutoInvest, since it has no such dependency on tier01's level. A same-reference no-op
  // when nothing qualifies, so calling it costs nothing when Storage isn't in play at all.
  const tickStorage = tickStorageAutoRedeem

  // Once at/above PRESTIGE_THRESHOLD, everything freezes — no passive production, no autobuyer
  // purchases — until the player prestiges. Returning the same reference (rather than an
  // equivalent copy) lets React's setState bail out of re-rendering while frozen, same as any
  // other no-op action; that optimization only applies when Auto-Prestige isn't bought (or is
  // currently paused) at all, since its attempt budget (see below) needs to keep accumulating
  // even while otherwise frozen. Storage's own auto-fill/auto-redeem still run through every
  // branch here — like redeemStorageBank/convertIntroBitsToKilobytes, they pay from a separate
  // currency pool and deliberately bypass this freeze entirely, so a player who's crossed the
  // Prestige threshold but hasn't manually prestiged yet doesn't have to wait for that click to
  // fill/redeem a bank.
  if (isProductionFrozen(stateAfterIntro)) {
    if (!autoPrestigeActive) return tickStorage(stateAfterIntro)
    const nextBudget = (stateAfterIntro.autoPrestigeAttemptBudget ?? 0) + getAutoPrestigeAttemptRate(autoPrestigeLevel) * elapsedSeconds
    // A completed attempt (budget >= 1, with a small epsilon tolerance for the same repeated-
    // fractional-elapsedSeconds floating-point drift described on TICK_ACCUMULATION_EPSILON)
    // only actually prestiges once Money has reached PRESTIGE_THRESHOLD — which it already has,
    // here, by definition of this branch — so it always fires as soon as the budget crosses 1.
    // prestigeGame's own reset zeroes the budget back out; no need to pass the incremented value
    // in, it would just be discarded.
    if (nextBudget >= 1 - TICK_ACCUMULATION_EPSILON) return tickStorage(prestigeGame(stateAfterIntro))
    return tickStorage({ ...stateAfterIntro, autoPrestigeAttemptBudget: nextBudget })
  }

  // The passive PP production-speed bonus is inert until unlocked (see buyPrestigeSpeedBonus) —
  // before that, every tier produces at the flat ×1 baseline regardless of unspent PP balance.
  const multiplier = stateAfterIntro.prestigeSpeedBonusUnlocked
    ? getPrestigeProductionMultiplier(stateAfterIntro.prestige.points)
    : 1
  // Speed Up's multiplier, unlike the PP bonus above, needs no unlock step — it applies as soon
  // as speedUpCount > 0 (see getSpeedUpMultiplier/speedUpGame).
  const speedUpMultiplier = getSpeedUpMultiplier(stateAfterIntro.speedUpCount ?? 0)

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
  }, stateAfterIntro)

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
    const production = Math.floor((stateAfterAutobuyers.owned[tier.id] ?? 0) * ticksElapsed * multiplier * speedUpMultiplier * tierMultiplier * computeBoostMultiplier)

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
    // start counting once Money first reaches PRESTIGE_THRESHOLD — but it can only ever actually fire from
    // the frozen branch above, once Money has actually gotten there. Paused (autoPrestigeActive
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

  // Runs last, against this tick's final tier01 level (post autobuyer/Speed Up), so a Storage bank
  // sized for a level tier01 only just reached THIS tick can still redeem the same tick — see
  // tickStorage above (auto-fill itself already ran earlier, as part of stateAfterIntro).
  return tickStorage(stateAfterSpeedUp)
}

// Real elapsed seconds away, capped at MAX_OFFLINE_SECONDS, then scaled down by
// OFFLINE_PROGRESS_SPEED_MULTIPLIER and floored — the number of 1-second ticks
// applyOfflineProgress will simulate.
export const getOfflineEffectiveSeconds = elapsedRealSeconds =>
  Math.floor(Math.min(clampNonNegative(elapsedRealSeconds), MAX_OFFLINE_SECONDS) * OFFLINE_PROGRESS_SPEED_MULTIPLIER)

// Catches a save up on the time it was closed/backgrounded by replaying tickGame one simulated
// second at a time (rather than a single call with a large elapsedSeconds) so autobuyers get the
// same one-purchase-attempt-per-second cadence they'd have had if the game had stayed open —
// only at 50% speed, and capped to MAX_OFFLINE_SECONDS of real time. tickGame unconditionally
// drives both the main-game tiers and the Byte Foundry (tickIntroProduction/tickIntroAutoInvest/
// tickStorage*), so this same 50% speed and cadence apply to the entire game, not just tiers.
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

// Predicate, not a reducer: whether "Sacrifice for 10x Capacity" can actually fire right now.
// Forced priority order for the Byte Foundry's five recurring "upgrade" actions — Storage Bank
// Fill > Bandwidth > Storage Bank Build > Compute > Memory (see CLAUDE.md's "Byte Foundry"
// section). Each base predicate below is that action's own plain availability check; whenever a
// higher-ranked one is currently available, every lower-ranked action is disabled regardless of
// its own cost, forcing the player to take the higher-priority upgrade first rather than letting
// several compete for the same Memory balance at once — the "turn"-suffixed composites further
// down this file (colocated with each action's own reducer) fold that ordering in. Combine into a
// Byte (a one-off bootstrap step) sits outside this forced order entirely and keeps its own simple
// gate, checked directly below.

// "Storage Bank Fill" (highest priority) — true whenever ANY built bank, of any size, is both
// currently FULL and redeemable right now (see isStorageBankRedeemable, defined further down this
// file — safe, not called until this function itself is): a bank sitting full and redeemable is
// value already earned, just waiting on a click, so nothing else is ever offered ahead of it.
export const isStorageBankFillAvailable = state =>
  Object.keys(state.intro?.storageBanks ?? {})
    .map(Number)
    .some(size => (state.intro.storageBanks[size] ?? 0) > 0 && isStorageBankRedeemable(state, size))

// "Bandwidth" ("Invest for Double Production") — true whenever the current
// productionMilestoneTier's own cost is affordable and hasn't already used up its claims.
export const isBandwidthAvailable = state => {
  const cost = getIntroProductionMilestoneCost(state.intro.productionMilestoneTier)
  const claimsUsedUp = state.intro.productionMilestoneTierClaims >= getIntroProductionMilestoneMaxClaims(state.intro.productionMilestoneTier)
  return state.intro.bits >= cost && !claimsUsedUp
}

// "Storage Bank Build" — true whenever the current ladder size's build cost is affordable (see
// getStorageBankSize/getStorageBankCost, defined further down this file) — matches
// buildStorageBank's own actual gate, which (like every other Byte Foundry reducer) has never
// itself required isStorageUnlocked; that threshold only governs the button's own UI reveal.
export const isStorageBankBuildAvailable = state =>
  state.intro.bits >= getStorageBankCost(getStorageBankSize(state))

// "Compute" — true once Compute Core conversion is unlocked and at least one boost preset is
// mechanically activatable right now (see canActivateComputeBoost, defined further down this
// file).
export const isComputeUpgradeAvailable = state =>
  isComputeCoreConversionUnlocked(state) &&
  Object.keys(COMPUTE_BOOST_PRESETS).some(boostType => canActivateComputeBoost(state, boostType))

// "Memory" (lowest priority) — Memory must be full (bits === capacity) AND every action ranked
// above it — Combine into a Byte, Storage Bank Fill, Bandwidth, Storage Bank Build, Compute — must
// currently be unavailable. Capacity growth is offered only once nothing else productive can be
// done with a full balance, so a player never skips past a cheaper, immediately available upgrade
// just because Memory happens to be full at the same moment. Used by pickIntroCapacityMilestone's
// own guard below and directly by ByteFoundryPage to disable/hide the button the same way — the
// same "engine re-validates, UI just mirrors it" convention every other action in this file
// already follows (see "Security notes" in CLAUDE.md).
export const isMemoryCapacityUpgradeAvailable = state => {
  if (state.intro.bits < state.intro.capacity) return false
  if (!state.intro.byteCreated && state.intro.bits >= INTRO_BYTE_COMBINE_COST) return false
  if (isStorageBankFillAvailable(state)) return false
  if (isBandwidthAvailable(state)) return false
  if (isStorageBankBuildAvailable(state)) return false
  if (isComputeUpgradeAvailable(state)) return false
  return true
}

// "Sacrifice for 10x Capacity" — see isMemoryCapacityUpgradeAvailable above for the full
// availability gate (Memory full AND no other currently-possible action left to take first).
// Drains the ENTIRE balance to 0 and multiplies capacity by INTRO_CAPACITY_MULTIPLIER. No-op
// otherwise.
export const pickIntroCapacityMilestone = state => {
  if (!isMemoryCapacityUpgradeAvailable(state)) return state
  return {
    ...state,
    intro: { ...state.intro, bits: 0, capacity: state.intro.capacity * INTRO_CAPACITY_MULTIPLIER },
  }
}

// "Invest for Double Production"'s own cost ladder — entirely independent of `capacity`/Sacrifice
// (a separate, permanent progression, keyed off productionMilestoneTier — see
// createInitialGameState): tier 0 costs INTRO_STARTING_CAPACITY (1 Byte), each tier after that
// costs INTRO_CAPACITY_MULTIPLIER times the last (10 Bytes, 100 Bytes, 1000 Bytes, …) — the same
// "×10 per step" shape the capacity ladder happens to share, tracked completely separately.
export const getIntroProductionMilestoneCost = tier =>
  INTRO_STARTING_CAPACITY * (INTRO_CAPACITY_MULTIPLIER ** clampNonNegative(tier))

// How many claims a given productionMilestoneTier grants before advancing to the next: 2 for the
// three cheapest tiers (0/1/2, i.e. 1/10/100 Bytes), 1 for every tier from there on — unlike
// "Sacrifice for 10x Capacity"'s own flat one-attempt-per-cost posture, the earliest, cheapest
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

// "Bandwidth"'s own forced-priority turn (see the priority-order block above
// isMemoryCapacityUpgradeAvailable): available AND nothing ranked above it (Storage Bank Fill)
// currently is. Used by pickIntroProductionMilestone's own guard below and directly by
// ByteFoundryPage to disable the button the same way.
export const isBandwidthTurnAvailable = state =>
  isBandwidthAvailable(state) && !isStorageBankFillAvailable(state)

export const pickIntroProductionMilestone = state => {
  if (!isBandwidthTurnAvailable(state)) return state

  const tier = state.intro.productionMilestoneTier
  const cost = getIntroProductionMilestoneCost(tier)
  const claims = state.intro.productionMilestoneTierClaims
  const maxClaims = getIntroProductionMilestoneMaxClaims(tier)

  const fasterTickSpeed = state.intro.tickSpeedSeconds / INTRO_PRODUCTION_MULTIPLIER_STEP
  const canSpeedUp = fasterTickSpeed >= INTRO_MIN_TICK_SPEED_SECONDS
  const tierComplete = claims + 1 >= maxClaims

  return {
    ...state,
    intro: {
      ...state.intro,
      bits: clampNonNegative(state.intro.bits - cost),
      productionMilestoneTier: tierComplete ? tier + 1 : tier,
      productionMilestoneTierClaims: tierComplete ? 0 : claims + 1,
      ...(canSpeedUp
        ? { tickSpeedSeconds: fasterTickSpeed }
        : { productionMultiplier: state.intro.productionMultiplier * INTRO_PRODUCTION_MULTIPLIER_STEP }),
    },
  }
}

// Predicate, not a reducer: whether the manual "convert bits to a Kilobyte" action and the "next
// phase" reveal indicator should be shown — true once capacity has grown enough to ever hold
// INTRO_CONVERSION_UNLOCK_CAPACITY (1000) bits at once.
export const isIntroConversionUnlocked = state => (state.intro?.capacity ?? 0) >= INTRO_CONVERSION_UNLOCK_CAPACITY

// Predicate, not a reducer: whether ByteFoundryPage's whole Storage section (Build button, bank
// squares rows) should be shown at all — true once capacity has grown enough to ever hold
// INTRO_STORAGE_UNLOCK_CAPACITY (10 KB in Memory's own scale, 80,000 bits) at once. A later, more
// deliberate reveal than isIntroConversionUnlocked's own 1000-bit gate above — see layers.js.
export const isStorageUnlocked = state => (state.intro?.capacity ?? 0) >= INTRO_STORAGE_UNLOCK_CAPACITY

// Byte Foundry "Memory" unit ladder shared by ByteFoundryPage/StoragePage — raw bits below 1 Byte,
// then B/KB/MB/… scaling by 1000 each step, reusing TIER_DEFINITIONS' own tier symbols since
// Memory is byte-scale themed identically to the main game's tiers.
const MEMORY_UNIT_SYMBOLS = ['B', ...TIER_DEFINITIONS.map(tier => tier.symbol)]
const MEMORY_UNIT_SCALE = 1000

// The single unit a bits/capacity pair should both render in, sized off `capacityBits` (always the
// larger of the two, when comparing a balance against its own capacity) so a balance never shows
// in a coarser unit than its own capacity — e.g. never "512 B / 1 KB". `byteCreated` gates whether
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
  while (capacityBits / divisor >= MEMORY_UNIT_SCALE && unitIndex < MEMORY_UNIT_SYMBOLS.length - 1) {
    divisor *= MEMORY_UNIT_SCALE
    unitIndex += 1
  }
  return { symbol: MEMORY_UNIT_SYMBOLS[unitIndex], divisor }
}

// Floors rather than rounds, same "never overstate" rationale as formatCurrency above — an
// Intl-rounded 999.9/1000 bits would otherwise read as "1 KB / 1 KB" one tick before it's actually
// full.
const floorToDecimals = (value, decimals) => Math.floor(value * 10 ** decimals) / 10 ** decimals

export const formatMemoryAmount = (bits, unit) =>
  unit
    ? `${formatAmount(floorToDecimals(bits / unit.divisor, 3))} ${unit.symbol}`
    : `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`

// Any Memory-denominated cost (Invest, Storage build) reads in whatever B/KB/MB/…/QB unit best
// fits that specific amount — the same scale Memory's own balance uses. `getMemoryUnit(bits,
// true)` picks the unit that fits `bits` itself when called this way; the `true` is always safe
// here since every caller of this helper only renders once `byteCreated`.
export const formatBitsInNearestUnit = bits => formatMemoryAmount(bits, getMemoryUnit(bits, true))

// The cost, in bits, of converting Memory into 1 Kilobyte unit right now — tier01's own CURRENT
// per-unit level cost, the exact same value getStorageBankSize/isStorageBankRedeemable already key
// off (see the Storage section below) — not a fixed rate. At a fresh cycle's starting level this is
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

// --- Byte Foundry Storage (bank blocks) --- see the "Byte Foundry Storage" comment in layers.js
// and intro.storageBanks/storageBanksBuiltTotal/storageAutoRedeemEnabled/storageAutoRedeemedSizes
// in createInitialGameState above. Banks are a genuine storage MEDIUM, not a one-shot pre-paid
// item: building one (buildStorageBank) only constructs a permanent, EMPTY container of a given
// size — Memory (intro.bits) then auto-fills any empty container as it accumulates (see
// tickStorageAutoFill), smallest size first. `intro.storageBanks[size]` counts how many banks of
// that size are currently FULL (this is what redeemStorageBank spends); `intro.storageBanksBuiltTotal[size]`
// is the permanent, never-decremented total ever built — the number of currently EMPTY banks of a
// size is always `storageBanksBuiltTotal[size] - storageBanks[size]`. Consuming (redeeming) a full
// bank empties it again, returning it to the fillable pool — banks are reusable, not single-use.

// tier01's own per-unit level cost skips values as it grows (getCostEpochExponent's Fibonacci
// exponent sequence jumps 1, 2, 3, 5, 8, … — e.g. level 4 is 10,000,000, not 1,000,000), so every
// size a bank is ever built or redeemed at is one of tier01's own actual per-unit level costs,
// never an arbitrary round number in between (a 1,000,000-bit/"1 MB" bank can never exist, since
// no tier01 level ever costs that).
const getFirstTierCost = level => getTierCost(TIER_DEFINITIONS[0], level)

// The size (in bits) buildStorageBank currently builds: an independent ladder that walks tier01's
// own level-cost sequence (level 1, 2, 3, … via getFirstTierCost) rather than tier01's CURRENT
// level directly, advancing to the next level's cost once STORAGE_BANK_LADDER_CAP banks have ever
// been built at the current one — read from storageBanksBuiltTotal, a cumulative counter that
// redeeming never decrements, so the ladder only ever advances (see the "Byte Foundry Storage"
// comment in layers.js for why this is deliberately decoupled from tier01's own CURRENT level —
// docs/DESIGN_HISTORY.md). A freshly offered size isn't necessarily redeemable yet — see
// isStorageBankRedeemable below for the separate, tier01-price-driven gate on that. Uncapped —
// keeps walking tier01's level-cost sequence indefinitely (an earlier version of the Compute Core
// mechanic capped this ladder at 1,000,000/"1 MB" so its own readiness check could enumerate a
// finite set of sizes; that whole approach was superseded — Compute Cores no longer depend on
// Storage state at all, so the cap was reverted — see docs/DESIGN_HISTORY.md).
export const getStorageBankSize = state => {
  const builtTotal = state.intro?.storageBanksBuiltTotal ?? {}
  let level = 1
  let size = getFirstTierCost(level)
  while ((builtTotal[size] ?? 0) >= STORAGE_BANK_LADDER_CAP) {
    level += 1
    size = getFirstTierCost(level)
  }
  return size
}

// A bank's one-time build (construction) cost — STORAGE_BUILD_COST_MULTIPLIER (10) times its own
// face value, expressed in BYTES rather than bits: a 1000-bit ("1 KB") bank costs 10 KB*BYTES*
// (10,000 bytes = 80,000 bits), not 10,000 bits. This cost only ever pays for the empty container
// itself — it is NOT what fills it (see tickStorageAutoFill).
export const getStorageBankCost = capacityBits => capacityBits * STORAGE_BUILD_COST_MULTIPLIER * BITS_PER_BYTE

// Storage bank sizes AND the Byte Foundry's transfer block's own dynamic cost
// (getIntroKilobyteConversionCost above) are both tier01's own per-unit level costs (see
// getStorageBankSize above), so they share this one formatting scale — a completely separate
// scale from Memory's Byte-based one (see formatBitsInNearestUnit above): 1000 bits is "1 KB"
// here ("KiloBits", not 1000 Bytes/8000 bits). Reuses TIER_DEFINITIONS' KB..QB symbols for the
// same "byte-scale themed" reason Memory's own ladder does. Every value passed in is already an
// exact power of ten by construction (getTierCost), so this always lands on a clean, whole-number
// label. Shared by ByteFoundryPage (Build button/summary) and StoragePage (per-size bank labels).
const STORAGE_UNIT_SYMBOLS = TIER_DEFINITIONS.map(tier => tier.symbol)
export const formatStorageSize = bits => {
  if (bits < 1000) return `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`
  let value = bits / 1000
  let unitIndex = 0
  while (value >= 1000 && unitIndex < STORAGE_UNIT_SYMBOLS.length - 1) {
    value /= 1000
    unitIndex += 1
  }
  return `${formatAmount(value)} ${STORAGE_UNIT_SYMBOLS[unitIndex]}`
}

// Every Storage bank size worth showing (ByteFoundryPage's own brief per-size summary,
// StoragePage's full per-size squares rows): every size ever built, any size still held (a
// save/seed could hold banks without a matching storageBanksBuiltTotal entry — e.g. a migrated
// pre-ladder save), plus whatever's currently offered (even at 0 built, so its row/goal is
// visible before the first one is banked) — ascending, so rows read smallest-to-largest.
export const getStorageSizesToShow = state => {
  const storageBanksBuiltTotal = state.intro?.storageBanksBuiltTotal ?? {}
  const storageBanks = state.intro?.storageBanks ?? {}
  const currentSize = getStorageBankSize(state)
  return [
    ...new Set([
      ...Object.keys(storageBanksBuiltTotal).map(Number),
      ...Object.keys(storageBanks).map(Number),
      currentSize,
    ]),
  ]
    .filter(size => (storageBanksBuiltTotal[size] ?? 0) > 0 || (storageBanks[size] ?? 0) > 0 || size === currentSize)
    .sort((a, b) => a - b)
}

// Builds one EMPTY Storage bank sized to getStorageBankSize(state), spending
// getStorageBankCost(that size) bits from Memory (the intro's own separate currency pool — same
// "bypasses isProductionFrozen entirely" posture as Combine/Sacrifice/Invest, since none of this
// touches resources.base). No-op below cost. Only advances storageBanksBuiltTotal (the permanent,
// cumulative build ladder) — deliberately does NOT touch storageBanks (the currently-FULL count):
// a freshly built bank starts empty and has to be filled by Memory like any other, via
// tickStorageAutoFill. Building the same size more than once (before the ladder advances to the
// next size) simply accumulates storageBanksBuiltTotal further.

// "Storage Bank Build"'s own forced-priority turn: available AND nothing ranked above it (Storage
// Bank Fill, Bandwidth) currently is. Used by buildStorageBank's own guard below and directly by
// ByteFoundryPage/StoragePage to disable the button the same way.
export const isStorageBankBuildTurnAvailable = state =>
  isStorageBankBuildAvailable(state) && !isStorageBankFillAvailable(state) && !isBandwidthAvailable(state)

export const buildStorageBank = state => {
  if (!isStorageBankBuildTurnAvailable(state)) return state

  const size = getStorageBankSize(state)
  const cost = getStorageBankCost(size)

  return {
    ...state,
    intro: {
      ...state.intro,
      bits: state.intro.bits - cost,
      storageBanksBuiltTotal: {
        ...state.intro.storageBanksBuiltTotal,
        [size]: (state.intro.storageBanksBuiltTotal?.[size] ?? 0) + 1,
      },
    },
  }
}

// Cascades Memory into every currently-fillable EMPTY bank in one pass, smallest size first: while
// there's a size with at least one empty container (storageBanksBuiltTotal[size] >
// storageBanks[size]) that intro.bits can fully cover, moves exactly `size` bits out of Memory and
// into that bank (storageBanks[size] += 1), then repeats — since sizes are checked smallest-first
// and cost scales with size, once the smallest remaining empty size is unaffordable no larger one
// can be either, so the loop always terminates. Whatever's left over when nothing more can be
// filled simply stays as Memory's own ordinary balance — auto-filling is otherwise unconditional
// (no toggle, no prerequisite, unlike auto-redeem below) and bypasses isProductionFrozen, the same
// "separate currency pool" posture every other Byte Foundry mechanic already has. A same-reference
// no-op when nothing is fillable.
export const tickStorageAutoFill = state => {
  const builtTotal = state.intro?.storageBanksBuiltTotal ?? {}
  let bits = state.intro.bits
  let storageBanks = state.intro.storageBanks ?? {}
  let filledAny = false

  for (;;) {
    const fillableSize = Object.keys(builtTotal)
      .map(Number)
      .filter(size => (builtTotal[size] ?? 0) > (storageBanks[size] ?? 0))
      .filter(size => bits >= size)
      .sort((a, b) => a - b)[0]
    if (fillableSize === undefined) break

    bits -= fillableSize
    storageBanks = { ...storageBanks, [fillableSize]: (storageBanks[fillableSize] ?? 0) + 1 }
    filledAny = true
  }

  if (!filledAny) return state
  return { ...state, intro: { ...state.intro, bits, storageBanks } }
}

// A bank becomes redeemable only once tier01's CURRENT per-unit level cost EXACTLY matches its own
// face value — a full 10 KB bank redeems only while tier01's own current cost is exactly 10 KB, not
// merely once that cost has reached or passed it (an earlier version used `<=`, letting an old,
// smaller bank redeem for a full unit long after tier01's real price had grown past it — see
// docs/DESIGN_HISTORY.md). Because `getFirstTierCost` only ever grows with level within a cycle,
// tier01's own autobuyer completing more than one level in a single tick (a banked attempt budget
// catching up after a broke/paused stretch — see tickGame's autobuyer loop) can jump the price
// straight past a bank's size without it ever exactly matching mid-tick; such a bank simply waits,
// still full and not lost, until the next Speed Up/Overclock/Prestige resets tier01's level back
// down and its price grows back up through that exact value again.
export const isStorageBankRedeemable = (state, capacityBits) =>
  capacityBits === getFirstTierCost(state.purchaseLevels?.[TIER_DEFINITIONS[0].id] ?? 1)

// Redeems one currently-FULL bank of `capacityBits`, granting 1 free tier01 unit via
// grantTierUnits — same "pays from a separate currency pool, bypasses
// isProductionFrozen/isTierUnlocked/cost entirely" rationale as convertIntroBitsToKilobytes — a
// bank's contents came from Memory via tickStorageAutoFill already, not from a further transfer.
// The bank itself is NOT lost — it becomes empty again (storageBanksBuiltTotal is untouched),
// re-entering the fillable pool for tickStorageAutoFill to fill again later. No-op if no bank of
// that size is currently full, or if it isn't yet redeemable (see isStorageBankRedeemable).
export const redeemStorageBank = capacityBits => state => {
  const full = state.intro.storageBanks?.[capacityBits] ?? 0
  if (full <= 0) return state
  if (!isStorageBankRedeemable(state, capacityBits)) return state

  const { [capacityBits]: _removed, ...remainingBanks } = state.intro.storageBanks
  const nextBanks = full > 1 ? { ...state.intro.storageBanks, [capacityBits]: full - 1 } : remainingBanks

  const firstTierId = TIER_DEFINITIONS[0].id
  return grantTierUnits(firstTierId, 1)({
    ...state,
    intro: { ...state.intro, storageBanks: nextBanks },
  })
}

// Auto-redeem convenience (see intro.storageAutoRedeemEnabled/setStorageAutoRedeemEnabled and
// intro.storageAutoRedeemedSizes below) — a no-op unless there's an eligible size. The smallest
// denomination (tier01's own level-1 cost, "1 KB" — the first size getStorageBankSize ever offers)
// always attempts auto-redeem regardless of storageAutoRedeemEnabled — a small always-on
// convenience; every larger size still checks the
// toggle, which currently defaults true (see createInitialGameState) with no in-UI way to turn it
// off yet, so in practice every size auto-redeems today. Either way, a given size auto-redeems at
// most ONCE per real Prestige cycle (see
// storageAutoRedeemedSizes, which resets fresh every real Prestige — prestigeGame) — a bank that
// refills later the same cycle (see tickStorageAutoFill) needs a manual click for the rest of it.
// Redeems only the smallest eligible size per call — redeeming can itself grant a tier01 unit and
// advance its level/cost (via grantTierUnits), so redeeming more than one size correctly needs the
// cost recomputed in between; rather than looping that here, this piggybacks on tickGame's own
// ~10Hz cadence (see TICK_RATE_MS) to work through multiple eligible banks over the next several
// ticks — imperceptibly fast in practice. Called from every branch of tickGame, frozen or not (see
// there), so it always reacts to tier01's truly final level for the tick, not a stale mid-tick one.
export const tickStorageAutoRedeem = state => {
  const alreadyRedeemedThisCycle = state.intro?.storageAutoRedeemedSizes ?? {}
  const eligibleSize = Object.keys(state.intro.storageBanks ?? {})
    .map(Number)
    .filter(size => (state.intro.storageBanks[size] ?? 0) > 0)
    .filter(size => !alreadyRedeemedThisCycle[size])
    .filter(size => size === getFirstTierCost(1) || state.intro.storageAutoRedeemEnabled)
    .filter(size => isStorageBankRedeemable(state, size))
    .sort((a, b) => a - b)[0]
  if (eligibleSize === undefined) return state

  const redeemed = redeemStorageBank(eligibleSize)(state)
  return {
    ...redeemed,
    intro: {
      ...redeemed.intro,
      storageAutoRedeemedSizes: { ...redeemed.intro.storageAutoRedeemedSizes, [eligibleSize]: true },
    },
  }
}

// Toggles whether tickStorageAutoRedeem currently acts — a plain, unconditional preference, not a
// purchase (unlike setAutoSpeedUpEnabled/setAutoGlobalTickspeedEnabled below, there's no
// prerequisite "bought" flag to gate this on; Storage itself has no unlock step).
export const setStorageAutoRedeemEnabled = enabled => state => ({
  ...state,
  intro: { ...state.intro, storageAutoRedeemEnabled: !!enabled },
})

// --- Byte Foundry Compute Cores/Nodes --- see intro.computeCores/computeNodes in
// createInitialGameState and INTRO_COMPUTE_CORE_UNLOCK_CAPACITY/COMPUTE_CORES_PER_NODE in
// layers.js. An earlier version costed a Compute Core at a fixed 10 MB of Memory, gated on every
// Storage bank size being built and full — superseded (see docs/DESIGN_HISTORY.md) in favor of the
// dynamic, capacity-tied cost below, which is unrelated to Storage entirely.

// Predicate, not a reducer: whether ByteFoundryPage's "Compute" section — and the automatic
// conversion below — should be active at all. True once capacity has grown enough to ever hold
// INTRO_COMPUTE_CORE_UNLOCK_CAPACITY (800,000 bits, "100 KB" in Memory's own B/KB/MB scale) at
// once — the same "capacity-magnitude reveal gate" convention isIntroConversionUnlocked/
// isStorageUnlocked already use, one Sacrifice stage later than Storage's own reveal.
export const isComputeCoreConversionUnlocked = state => (state.intro?.capacity ?? 0) >= INTRO_COMPUTE_CORE_UNLOCK_CAPACITY

// Once isComputeCoreConversionUnlocked, Memory automatically converts into 1 Compute Core every
// time it's full — a same-reference no-op once nothing about the state would change: Memory isn't
// yet full, or intro.computeCores is already at COMPUTE_ENTITY_CAP (10 — see layers.js; in
// practice Cores rarely reach this on their own, since tickComputeNodeConversion drains them into
// a Node at 8 — this guard mainly matters once Nodes themselves are capped and stop accepting
// more, letting Cores pile up behind that). While capped, Memory simply stays full rather than
// flushing for nothing — no progress is lost, it just waits for the player to spend a Core/Node
// down. The cost is always the CURRENT capacity itself (not a fixed amount): converting flushes
// the entire balance to 0, exactly like Sacrifice for 10x Capacity's own "drains the ENTIRE
// balance" behavior, and always mints exactly 1 Core per flush (bits can never exceed capacity, so
// there's never a multi-Core batch in one event). This is deliberate, not incidental: since
// capacity only ever grows via the player's own Sacrifice clicks, a higher capacity makes each
// future Core cost more (a bigger flush) without changing what a Core actually grants — the player
// decides how far to keep Sacrificing before letting this automatic conversion take over instead,
// trading a smaller-but-more-frequent Core rate against a larger-but-slower one. Called from
// tickGame right after tickStorageAutoFill and before tickIntroAutoInvest, so it claims Memory
// ahead of ordinary Kilobyte conversion once unlocked and full — the same "first claim" priority
// tickStorageAutoFill itself has over tickIntroAutoInvest. Bypasses isProductionFrozen, same
// posture as every other Byte Foundry mechanic (a separate currency pool, not resources.base).
// Also the only place intro.computeCoresEverEarned/intro.computeMergePageUnlocked ever change.
// computeCoresEverEarned increments by 1 every time a conversion actually mints a Core — a true
// lifetime counter, never decremented by spending (activateComputeBoost) or merging
// (tickComputeNodeConversion) — unlike the live computeCores balance, which both of those do
// drain. computeMergePageUnlocked flips true the instant that counter reaches
// COMPUTE_CORES_PER_NODE (8) for the first time; checking the *lifetime* counter rather than the
// live balance is what makes this genuinely track "ever earned" — a player who spends a Boost
// before ever holding 8 Cores at once, or whose Cores/Nodes were already capped from before this
// latch existed, still trips it correctly. The latch check is deliberately evaluated independently
// of whether a conversion happens THIS tick: a save whose computeCoresEverEarned is already >= 8
// (from any past tick) but whose computeCores happens to be at COMPUTE_ENTITY_CAP right now (no
// room left to convert into) would otherwise never re-enter this function's success path at all —
// permanently hiding the merge chain from a player who has obviously already earned it.
export const tickComputeCoreConversion = state => {
  if (!isComputeCoreConversionUnlocked(state)) return state

  const currentCores = state.intro.computeCores ?? 0
  const currentEverEarned = state.intro.computeCoresEverEarned ?? 0
  const latchAlreadySet = state.intro.computeMergePageUnlocked ?? false
  const canConvert = state.intro.bits >= state.intro.capacity && currentCores < COMPUTE_ENTITY_CAP
  const computeCores = canConvert ? currentCores + 1 : currentCores
  const computeCoresEverEarned = canConvert ? currentEverEarned + 1 : currentEverEarned
  const computeMergePageUnlocked = latchAlreadySet || computeCoresEverEarned >= COMPUTE_CORES_PER_NODE

  if (!canConvert && computeMergePageUnlocked === latchAlreadySet) return state

  return {
    ...state,
    intro: {
      ...state.intro,
      bits: canConvert ? 0 : state.intro.bits,
      computeCores,
      computeCoresEverEarned,
      computeMergePageUnlocked,
    },
  }
}

// Converts every complete group of COMPUTE_CORES_PER_NODE (8) Compute Cores into 1 Compute Node —
// a same-reference no-op below that threshold, or once intro.computeNodes is already at
// COMPUTE_ENTITY_CAP (10 — see layers.js). Capped at however many Nodes there's still room for
// (roomForNodes below), so a Core surplus beyond what fits is simply left unconverted in
// computeCores instead of overflowing computeNodes past the cap — those leftover Cores then count
// against tickComputeCoreConversion's own COMPUTE_ENTITY_CAP guard above, eventually pausing
// Memory-to-Core conversion too once both are maxed. Called from tickGame right after
// tickComputeCoreConversion, so freshly-minted Cores convert the same tick they're earned.
export const tickComputeNodeConversion = state => {
  const cores = state.intro?.computeCores ?? 0
  const nodes = state.intro?.computeNodes ?? 0
  const roomForNodes = Math.max(0, COMPUTE_ENTITY_CAP - nodes)
  const nodesGained = Math.min(roomForNodes, Math.floor(cores / COMPUTE_CORES_PER_NODE))
  if (nodesGained <= 0) return state

  return {
    ...state,
    intro: {
      ...state.intro,
      computeCores: cores - nodesGained * COMPUTE_CORES_PER_NODE,
      computeNodes: nodes + nodesGained,
    },
  }
}

// Shared shape for the manual Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter →
// Supercomputer → Megacomputer merge chain below (see ComputePage and issue #280) — unlike
// tickComputeNodeConversion above (automatic every tick),
// each of these only ever fires on an explicit player click, converting every complete group of
// COMPUTE_MERGE_RATIO (8) of the input entity into 1 of the output entity, capped at whatever room
// remains under COMPUTE_ENTITY_CAP on the output — the same "batch, but cap-bounded, surplus left
// unconverted" shape tickComputeNodeConversion already uses for Core → Node. A same-reference
// no-op below one full group of 8 of the input, or once the output is already at cap.
const mergeComputeEntities = (inputField, outputField) => state => {
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

// 8 Compute Nodes → 1 Compute Cluster. Player-triggered (ComputePage's own merge button) — the
// player decides whether to merge Nodes upward or keep spending/holding them, unlike the automatic
// Core → Node conversion above.
export const mergeComputeNodesIntoCluster = mergeComputeEntities('computeNodes', 'computeClusters')
// 8 Compute Clusters → 1 Compute Network. Same posture as mergeComputeNodesIntoCluster above.
export const mergeComputeClustersIntoNetwork = mergeComputeEntities('computeClusters', 'computeNetworks')
// 8 Compute Networks → 1 Compute Grid. Same posture as the merges above.
export const mergeComputeNetworksIntoGrid = mergeComputeEntities('computeNetworks', 'computeGrids')
// 8 Compute Grids → 1 Compute Fabric. Same posture as the merges above.
export const mergeComputeGridsIntoFabric = mergeComputeEntities('computeGrids', 'computeFabrics')
// 8 Compute Fabrics → 1 Compute Cloud. Same posture as the merges above.
export const mergeComputeFabricsIntoCloud = mergeComputeEntities('computeFabrics', 'computeClouds')
// 8 Compute Clouds → 1 Compute Datacenter. Same posture as the merges above.
export const mergeComputeCloudsIntoDatacenter = mergeComputeEntities('computeClouds', 'computeDatacenters')
// 8 Compute Datacenters → 1 Compute Supercomputer. Same posture as the merges above.
export const mergeComputeDatacentersIntoSupercomputer = mergeComputeEntities('computeDatacenters', 'computeSupercomputers')
// 8 Compute Supercomputers → 1 Compute Megacomputer — the top of the merge chain today (see issue
// #280's "Out of scope": nothing spends a Megacomputer yet). Same posture as the merges above.
export const mergeComputeSupercomputersIntoMegacomputer = mergeComputeEntities('computeSupercomputers', 'computeMegacomputers')

// The current production-speed multiplier a Compute Boost is contributing — 1 (no effect) while
// no boost is active. Applied to Memory's own passive production (tickIntroProduction) and
// tier01's production specifically (see tickGame) — "the base production tier of each screen."
// Stacking (see activateComputeBoost) only ever extends computeBoostRemainingSeconds, never
// compounds the multiplier itself.
export const getComputeBoostMultiplier = intro =>
  COMPUTE_BOOST_PRESETS[intro?.computeBoostType]?.multiplier ?? 1

// Whether boostType can be activated right now: at least 1 Compute Core available, and either no
// boost is currently active, the same type is (so it can stack), or the active type is already at
// COMPUTE_BOOST_MAX_STACKS (blocking even a same-type restack once maxed). The actual gate
// activateComputeBoost itself enforces, not just a UI-only disabled state — see "Security notes"
// in CLAUDE.md.
export const canActivateComputeBoost = (state, boostType) => {
  if (!COMPUTE_BOOST_PRESETS[boostType]) return false
  if ((state.intro.computeCores ?? 0) < 1) return false
  const currentType = state.intro.computeBoostType ?? null
  if (currentType !== null && currentType !== boostType) return false
  const currentStacks = state.intro.computeBoostStacks ?? 0
  return !(currentType === boostType && currentStacks >= COMPUTE_BOOST_MAX_STACKS)
}

// A specific Compute Boost preset's own forced-priority turn: mechanically activatable (see
// canActivateComputeBoost above) AND nothing ranked above Compute (Storage Bank Fill, Bandwidth,
// Storage Bank Build) currently is.
export const isComputeBoostTurnAvailable = (state, boostType) =>
  canActivateComputeBoost(state, boostType) &&
  !isStorageBankFillAvailable(state) && !isBandwidthAvailable(state) && !isStorageBankBuildAvailable(state)

// Whether ANY Compute Boost preset currently has its turn — the Compute-level analogue of the
// other four forced-priority "turn" predicates above. NOT used to gate ComputePage's own nav
// button on ByteFoundryPage, which stays enabled once revealed regardless of turn (see "Byte
// Foundry" in CLAUDE.md for why) — only the individual preset buttons inside ComputePage gate on
// isComputeBoostTurnAvailable directly, per preset.
export const isComputeUpgradeTurnAvailable = state =>
  Object.keys(COMPUTE_BOOST_PRESETS).some(boostType => isComputeBoostTurnAvailable(state, boostType))

// Spends exactly 1 Compute Core (regardless of preset — see COMPUTE_BOOST_PRESETS in layers.js)
// and either starts a fresh boost of boostType, or — if the same type is already active — stacks
// it: computeBoostStacks += 1 and computeBoostRemainingSeconds += the preset's own durationSeconds
// (extending the remaining time, not resetting it). No-op (same-reference) below
// isComputeBoostTurnAvailable's guard above.
export const activateComputeBoost = boostType => state => {
  if (!isComputeBoostTurnAvailable(state, boostType)) return state

  const preset = COMPUTE_BOOST_PRESETS[boostType]
  const alreadyActive = (state.intro.computeBoostType ?? null) === boostType

  return {
    ...state,
    intro: {
      ...state.intro,
      computeCores: (state.intro.computeCores ?? 0) - 1,
      computeBoostType: boostType,
      computeBoostStacks: alreadyActive ? (state.intro.computeBoostStacks ?? 0) + 1 : 1,
      computeBoostRemainingSeconds: alreadyActive
        ? (state.intro.computeBoostRemainingSeconds ?? 0) + preset.durationSeconds
        : preset.durationSeconds,
    },
  }
}

// Counts the active boost's remaining duration down every tick, frozen or not (same posture as
// every other Byte Foundry mechanic) — clears back to inactive (type null, stacks/remaining 0)
// once it reaches 0. A same-reference no-op while no boost is active.
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
      computeBoostStacks: 0,
      computeBoostRemainingSeconds: 0,
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

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - cost },
    smartAutobuyer: { ...state.smartAutobuyer, [tierId]: true },
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

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - cost },
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

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - AUTO_PRESTIGE_AUTOBUYER_COST },
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

// Activate (currentLevel null → 1) or upgrade (level N → N+1) the global tickspeed multiplier,
// always by spending Money (Bits) — activation is just the N=0 case of the same cost formula
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
export const prestigeGame = state => {
  if (clampNonNegative(state.resources[MONEY_ID]) < PRESTIGE_THRESHOLD) return state

  const pointsAwarded = getPrestigePointsAwarded(state.resources[MONEY_ID])
  const initial = createInitialGameState()
  // applyAutobuyerMilestones runs last, against the freshly-incremented prestige.count below —
  // it's what actually unlocks the next tier's autobuyer/tier-tickspeed-autobuyer the instant this
  // prestige crosses their milestone (see getAutobuyerUnlockMilestone/
  // getTierTickspeedAutobuyerMilestone), on top of whatever autobuyers/tierTickspeedAutobuyer were
  // already carried over unchanged below.
  return applyAutobuyerMilestones({
    ...initial,
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
      // Storage banks (full or empty), the cumulative build ladder, and the auto-redeem preference
      // are just as permanent as the Byte generator itself above — "never lost," not part of this
      // cycle's Memory reset. A bank already FULL when Prestige fires stays full, its contents
      // intact even though Memory itself resets to 0 — this is what lets banked-up Storage give a
      // new cycle a head start, redeemable immediately once tier01's fresh level 1 cost matches.
      // storageAutoRedeemedSizes is deliberately NOT carried over here — it falls through to
      // initial.intro's fresh {} default below, since "once per run" resets every real Prestige
      // (see tickStorageAutoRedeem).
      storageBanks: state.intro?.storageBanks ?? initial.intro.storageBanks,
      storageBanksBuiltTotal: state.intro?.storageBanksBuiltTotal ?? initial.intro.storageBanksBuiltTotal,
      storageAutoRedeemEnabled: state.intro?.storageAutoRedeemEnabled ?? initial.intro.storageAutoRedeemEnabled,
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
      // computeBoostType/computeBoostStacks/computeBoostRemainingSeconds are deliberately NOT
      // listed here — they fall through to initial.intro's fresh null/0/0 defaults above, since an
      // active boost is run-scoped and resets every real Prestige, unlike the Cores/Nodes it's
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
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoSpeedUpEnabled: state.autoSpeedUpEnabled ?? initial.autoSpeedUpEnabled,
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
    prestige: {
      ...initial.prestige,
      points: clampNonNegative(state.prestige.points) + pointsAwarded,
      count: state.prestige.count + 1,
    },
  })
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
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoSpeedUpEnabled: state.autoSpeedUpEnabled ?? initial.autoSpeedUpEnabled,
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
    autoSpeedUp: state.autoSpeedUp ?? initial.autoSpeedUp,
    autoSpeedUpEnabled: state.autoSpeedUpEnabled ?? initial.autoSpeedUpEnabled,
    autoGlobalTickspeed: state.autoGlobalTickspeed ?? initial.autoGlobalTickspeed,
    autoGlobalTickspeedEnabled: state.autoGlobalTickspeedEnabled ?? initial.autoGlobalTickspeedEnabled,
    // lastTierXpConsumed/everUnlockedTierIds are NOT carried over — same reasoning as speedUpGame,
    // see there.
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

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - AUTO_SPEED_UP_COST },
    autoSpeedUp: true,
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

  return {
    ...state,
    prestige: { ...state.prestige, points: state.prestige.points - TICKSPEED_AUTOBUYER_COST },
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
