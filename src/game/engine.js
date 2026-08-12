import { AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, BITS_PER_BYTE, DEFAULT_PURCHASE_BLOCK_SIZE, getTierBaseTickSpeedSeconds, GLOBAL_TICKSPEED_MILESTONE_STEP, GLOBAL_TICKSPEED_PRODUCTION_STEP, GOOGOL, INTRO_AUTO_INVEST_THRESHOLD, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_BASE_RATE, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_MULTIPLIER, INTRO_CONVERSION_UNLOCK_CAPACITY, INTRO_MIN_TICK_SPEED_SECONDS, INTRO_PRODUCTION_MULTIPLIER_STEP, INTRO_STARTING_CAPACITY, INTRO_STARTING_TICK_SPEED_SECONDS, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT, LAST_TIER_XP_TICKSPEED_STEP, MAX_OFFLINE_SECONDS, MONEY_ID, MONEY_STARTING_AMOUNT, OFFLINE_PROGRESS_SPEED_MULTIPLIER, OVERCLOCK_PRODUCTION_STEP, OVERCLOCK_REQUIREMENT_STEP, PRESTIGE_POINT_SPEED_BONUS, PRESTIGE_SPEED_BONUS_UNLOCK_COST, PRESTIGE_THRESHOLD, PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS, PURCHASE_BLOCK_SIZE_GROWTH_STEP, PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE, PURCHASE_MILESTONE_MULTIPLIER_BASE, RESOURCE_SYMBOL, SMART_AUTOBUYER_COST_MULTIPLIER, SPEED_UP_MULTIPLIER_BASE, STORAGE_BANK_LADDER_CAP, STORAGE_BUILD_COST_MULTIPLIER, TICKSPEED_AUTOBUYER_COST, TICKSPEED_MULTIPLIER_BASE_EXPONENT, TICKSPEED_PRODUCTION_STEP, TIER_DEFINITIONS, TIER_TICKSPEED_AUTOBUYER_MILESTONE_START, TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP } from './layers'

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
  // RUN-SCOPED count of how many times Overclock has been triggered (see overclockGame) — a
  // second, steeper Speed-Up-style soft reset (last tier level must reach a 10-level-per-activation
  // ladder, see getOverclockRequirement) that permanently raises the per-level step the (Money-
  // funded) global tickspeed multiplier's own REGULAR levels compound at — see
  // getGlobalTickspeedRegularStep/getGlobalTickspeedProductionMultiplier — by OVERCLOCK_PRODUCTION_STEP
  // (0.1 percentage points) per activation (1% → 1.1% → 1.2% → …), not a separate multiplier
  // stacked alongside it. Unlike speedUpCount just above, this is NOT reset by an ordinary Speed Up
  // (speedUpGame explicitly carries it through unchanged) — only by a real Prestige (same reasoning
  // as speedUpCount: an unbounded permanent compounding bonus across every future Prestige forever
  // would trivialize the Prestige cost curve) or by Overclock's own activation resetting
  // *speedUpCount* (never itself — see overclockGame).
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

// The exponent driving a cost epoch's multiplier (see getTierCost): 1, 2, 4, 7, 11, 16, 22, …
// for epochs 0, 1, 2, 3, 4, 5, 6, … — each epoch adds one more than the last epoch's increment (a
// "1 plus a triangular number" progression: exponent(e) = 1 + e*(e+1)/2). A negative epoch is
// clamped to 0 rather than throwing. Supersedes an earlier Fibonacci-based version — see
// docs/DESIGN_HISTORY.md.
export const getCostEpochExponent = epoch => {
  const e = clampNonNegative(epoch)
  return 1 + (e * (e + 1)) / 2
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
// baseCost-10 tier's 4th level (epoch 3, exponent 7) costs 10^7 per unit. Every tier scales gently
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

// The per-level percentage step every REGULAR level of the global tickspeed multiplier currently
// compounds at, after folding in Overclock's own permanent boost (see overclockGame/"Overclock" in
// docs/ECONOMY_REFERENCE.md): GLOBAL_TICKSPEED_PRODUCTION_STEP (1%) plus OVERCLOCK_PRODUCTION_STEP
// (0.1 percentage points) per Overclock activation — 1% with no activations, 1.1% after the first,
// 1.2% after the second, and so on. A milestone level's own step (GLOBAL_TICKSPEED_MILESTONE_STEP,
// 10%) is deliberately unaffected by Overclock — see getGlobalTickspeedProductionMultiplier below.
export const getGlobalTickspeedRegularStep = overclockCount =>
  GLOBAL_TICKSPEED_PRODUCTION_STEP + clampNonNegative(overclockCount) * OVERCLOCK_PRODUCTION_STEP

// The speed multiplier every tier gets from the global tickspeed multiplier: unlike the per-tier
// tickspeed multiplier (where level 1 is a bonus-free baseline gated behind a separate PP unlock),
// buying this global track directly grants its effect — every REGULAR level compounds
// getGlobalTickspeedRegularStep(overclockCount) (1% normally, permanently raised by Overclock — see
// above), except a milestone level (see countGlobalTickspeedMilestones above) compounds
// GLOBAL_TICKSPEED_MILESTONE_STEP (10%) instead, for that one level only, unaffected by Overclock —
// still fully multiplicative, not additive. `null` (never bought) is treated as level 0, i.e. no
// bonus at all (×1), regardless of overclockCount. `overclockCount` defaults to 0 so existing
// callers that haven't been updated to pass it still get the pre-Overclock baseline rate rather
// than throwing — but every real call site in this codebase passes it explicitly.
export const getGlobalTickspeedProductionMultiplier = (level, overclockCount = 0) => {
  const lvl = clampNonNegative(level ?? 0)
  const milestoneLevels = countGlobalTickspeedMilestones(lvl)
  const regularLevels = lvl - milestoneLevels
  const regularStep = getGlobalTickspeedRegularStep(overclockCount)
  return (1 + regularStep) ** regularLevels * (1 + GLOBAL_TICKSPEED_MILESTONE_STEP) ** milestoneLevels
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

// The last tier's LEVEL the *next* Speed Up requires: one more level than the last time — level 2
// (i.e. completing 1 level) for the first activation (speedUpCount 0), level 3 for the second,
// level 4 for the third, and so on (speedUpCount + 2). Expressed as a level target rather than a
// lifetime-purchased-count threshold (as it was before block size became variable — see
// docs/DESIGN_HISTORY.md): how many purchases a given level boundary corresponds to now depends on
// the current (possibly grown) block size (see getPurchaseBlockSize), while the level number
// itself doesn't, so a level target stays meaningful regardless of how block size has grown.
export const getSpeedUpRequirement = speedUpCount =>
  clampNonNegative(speedUpCount) + 2

// The last tier's LEVEL the *next* Overclock requires: a fixed OVERCLOCK_REQUIREMENT_STEP-level
// (10) jump per activation — level 10 for the first activation (overclockCount 0), level 20 for
// the second, level 30 for the third, and so on ((overclockCount + 1) * OVERCLOCK_REQUIREMENT_STEP)
// — unlike getSpeedUpRequirement's +1-per-cycle ladder, this step size never shrinks relative to
// the requirement itself. Expressed as a level target against state.purchaseLevels[lastTierId]
// directly (no "completed blocks" display offset the way Speed Up's own requirement gets — see
// docs/MAINPAGE_REFERENCE.md), so the number shown to the player matches the same raw level number
// the last tier's own Details disclosure already shows.
export const getOverclockRequirement = overclockCount =>
  (clampNonNegative(overclockCount) + 1) * OVERCLOCK_REQUIREMENT_STEP

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
  // The Byte Foundry intro runs first, every tick — tickIntroProduction short-circuits to the
  // same-reference no-op once !byteCreated, and tickIntroAutoInvest once bits/the shared transfer
  // budget can't cover a transfer (their own first-line guards); neither ever fully freezes,
  // matching the "return the same reference so React can bail out" convention every other no-op
  // path in this function already follows.
  const stateAfterIntro = tickIntroAutoInvest(tickIntroProduction(elapsedSeconds)(state))

  const autoPrestigeLevel = stateAfterIntro.autoPrestige ?? null
  // Paused (see setAutoPrestigeEnabled/CLAUDE.md's "pause/resume" bullet) is treated exactly like
  // "never bought" for every automation purpose below — the level and any PP already spent stay
  // untouched, and the manual Prestige button keeps working regardless, but tickGame itself
  // neither accumulates the attempt budget nor fires prestigeGame automatically while paused.
  const autoPrestigeActive = autoPrestigeLevel !== null && (stateAfterIntro.autoPrestigeEnabled ?? true)

  // Storage's own auto-fill (Memory -> empty banks) then auto-redeem (full banks -> tier01 units)
  // run together, in that order, through every branch below — a bank that fills this very tick can
  // also redeem the same tick if already eligible. Both are same-reference no-ops when nothing
  // qualifies, so composing them costs nothing when Storage isn't in play at all.
  const tickStorage = state => tickStorageAutoRedeem(tickStorageAutoFill(state))

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
    // (always a power of 2), and tierMultiplier (always a product of powers of 2 and 10 — see
    // getPurchaseMilestoneMultiplier) are already integers, so only the fractional Prestige Point
    // production multiplier (getPrestigeProductionMultiplier, e.g. 50 unspent points → ×1.5) can
    // introduce a fraction here — always >= 1, so flooring never zeroes out production for a tier
    // with owned > 0. Neither tickspeed multiplier appears in this formula at all anymore —
    // they've already done their work by shrinking tickSpeed above, which is what grew
    // ticksElapsed.
    const tierMultiplier = getPurchaseMilestoneMultiplier(stateAfterAutobuyers.purchaseLevels?.[tier.id] ?? 1)
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
  // filled and/or sized for a level tier01 only just reached THIS tick can fill/redeem the same
  // tick — see tickStorage above.
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

// "Sacrifice for 10x Capacity" — requires the bit balance to be full (bits === capacity); drains
// the ENTIRE balance to 0 and multiplies capacity by INTRO_CAPACITY_MULTIPLIER. No-op otherwise.
export const pickIntroCapacityMilestone = state => {
  if (state.intro.bits < state.intro.capacity) return state
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

// How many claims a given productionMilestoneTier grants: 2 for the three tiers below where
// Kilobyte transfers unlock (1/10/100 Bytes — cost < INTRO_AUTO_INVEST_THRESHOLD), 1 for every
// tier from 1000 Bytes on (cost >= INTRO_AUTO_INVEST_THRESHOLD).
export const getIntroProductionMilestoneMaxClaims = tier =>
  getIntroProductionMilestoneCost(tier) < INTRO_AUTO_INVEST_THRESHOLD ? 2 : 1

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
export const pickIntroProductionMilestone = state => {
  const tier = state.intro.productionMilestoneTier
  const cost = getIntroProductionMilestoneCost(tier)
  if (state.intro.bits < cost) return state

  const claims = state.intro.productionMilestoneTierClaims
  const maxClaims = getIntroProductionMilestoneMaxClaims(tier)
  if (claims >= maxClaims) return state

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

// The size, in bits, of one "batch" transfer from Memory into Kilobytes — how much
// tickIntroAutoInvest waits for before auto-firing (see below). Dynamic, not a fixed constant:
// exactly enough to grant getPurchaseBlockSize(state) Kilobyte units (the SAME live,
// possibly-growing block size the main game's own Buy button already reads for tier01) —
// INTRO_BITS_PER_KILOBYTE_CONVERSION per unit. At a fresh cycle's default block size
// (DEFAULT_PURCHASE_BLOCK_SIZE, 8), this is 8000; it only grows later in a run, once the last
// tier's own level count crosses PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS (see
// getPurchaseBlockSize). Converting bits into Kilobytes has no cycle-wide cap or budget at all —
// this is purely a batching threshold for the *automatic* path; the manual path
// (convertIntroBitsToKilobytes) has no threshold of its own beyond the single 1000-bit unit cost.
export const getIntroTransferBudget = state =>
  getPurchaseBlockSize(state) * INTRO_BITS_PER_KILOBYTE_CONVERSION

// Manual "convert 1000 bits into 1 Kilobyte": spends INTRO_BITS_PER_KILOBYTE_CONVERSION bits from
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
  if (state.intro.bits < INTRO_BITS_PER_KILOBYTE_CONVERSION) return state
  const firstTierId = TIER_DEFINITIONS[0].id
  return grantTierUnits(firstTierId, 1)({
    ...state,
    intro: {
      ...state.intro,
      bits: state.intro.bits - INTRO_BITS_PER_KILOBYTE_CONVERSION,
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

  const bitsToAdd = INTRO_BYTE_BASE_RATE * state.intro.productionMultiplier * ticksElapsed

  return {
    ...state,
    intro: {
      ...state.intro,
      bits: Math.min(state.intro.capacity, state.intro.bits + bitsToAdd),
      productionAccumulator: accumulated - ticksElapsed * tickSpeed,
    },
  }
}

// Auto-convert convenience, mirroring tickGame's own autobuyer "wait until the whole batch is
// affordable, then fire once" convention (see tickGame below), just keyed on a bit-balance
// threshold instead of a Money cost: once bits reaches getIntroTransferBudget(state) — a whole
// batch available at once, e.g. a fast-production or offline-catch-up jump that skips past
// several individual 1000-bit blocks before the player could click through them one at a time —
// it auto-transfers one whole batch without needing manual convertIntroBitsToKilobytes clicks. No
// cap, no cycle-wide budget: this can fire repeatedly, tick after tick, for as long as Memory
// keeps reaching another full batch — each fire grants getPurchaseBlockSize(state) Kilobytes
// (using whatever the block size is AT FIRE TIME, so a level-up that changes it mid-run is picked
// up on the very next fire). Also flips mainGameUnlocked on its first success, same as the manual
// path.
export const tickIntroAutoInvest = state => {
  const transferBudget = getIntroTransferBudget(state)
  if (state.intro.bits < transferBudget) return state

  const kilobytesGranted = transferBudget / INTRO_BITS_PER_KILOBYTE_CONVERSION

  const firstTierId = TIER_DEFINITIONS[0].id
  return grantTierUnits(firstTierId, kilobytesGranted)({
    ...state,
    intro: {
      ...state.intro,
      bits: state.intro.bits - transferBudget,
      mainGameUnlocked: true,
    },
  })
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

// tier01's own per-unit level cost skips values as it grows (getCostEpochExponent's triangular-
// number exponent sequence jumps 1, 2, 4, 7, 11, … — e.g. level 3 is 1,000,000, not 100,000), so
// every size a bank is ever built or redeemed at is one of tier01's own actual per-unit level
// costs, never an arbitrary round number in between (a 100,000-bit/"100 KB" bank can never exist,
// since no tier01 level ever costs that).
const getFirstTierCost = level => getTierCost(TIER_DEFINITIONS[0], level)

// The size (in bits) buildStorageBank currently builds: an independent ladder that walks tier01's
// own level-cost sequence (level 1, 2, 3, … via getFirstTierCost) rather than tier01's CURRENT
// level directly, advancing to the next level's cost once STORAGE_BANK_LADDER_CAP banks have ever
// been built at the current one — read from storageBanksBuiltTotal, a cumulative counter that
// redeeming never decrements, so the ladder only ever advances (see the "Byte Foundry Storage"
// comment in layers.js for why this is deliberately decoupled from tier01's own CURRENT level —
// docs/DESIGN_HISTORY.md). A freshly offered size isn't necessarily redeemable yet — see
// isStorageBankRedeemable below for the separate, tier01-price-driven gate on that.
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

// Builds one EMPTY Storage bank sized to getStorageBankSize(state), spending
// getStorageBankCost(that size) bits from Memory (the intro's own separate currency pool — same
// "bypasses isProductionFrozen entirely" posture as Combine/Sacrifice/Invest, since none of this
// touches resources.base). No-op below cost. Only advances storageBanksBuiltTotal (the permanent,
// cumulative build ladder) — deliberately does NOT touch storageBanks (the currently-FULL count):
// a freshly built bank starts empty and has to be filled by Memory like any other, via
// tickStorageAutoFill. Building the same size more than once (before the ladder advances to the
// next size) simply accumulates storageBanksBuiltTotal further.
export const buildStorageBank = state => {
  const size = getStorageBankSize(state)
  const cost = getStorageBankCost(size)
  if (state.intro.bits < cost) return state

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

// A bank becomes redeemable once tier01's CURRENT per-unit level cost reaches (or has passed) its
// own face value — not a one-tick-only exact match. tier01's own autobuyer can complete more than
// one level in a single tick (a banked attempt budget catching up after a broke/paused stretch —
// see tickGame's autobuyer loop), which can jump the level straight past the one a bank was built
// for without ever equaling it exactly; an exact-match check would then strand that bank
// permanently unredeemable, breaking the "never lost" guarantee. `<=` is safe here because
// getFirstTierCost only ever grows with level within a cycle (it only drops back on a
// Prestige/Speed Up/Overclock reset, at which point a bank correctly goes back to waiting for the
// price to climb back up to it, still held, not lost).
export const isStorageBankRedeemable = (state, capacityBits) =>
  capacityBits <= getFirstTierCost(state.purchaseLevels?.[TIER_DEFINITIONS[0].id] ?? 1)

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
// denomination (INTRO_BITS_PER_KILOBYTE_CONVERSION, "1 KB") always attempts auto-redeem regardless
// of storageAutoRedeemEnabled — a small always-on convenience; every larger size still checks the
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
    .filter(size => size === INTRO_BITS_PER_KILOBYTE_CONVERSION || state.intro.storageAutoRedeemEnabled)
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

// A second, steeper soft-reset than Speed Up (see speedUpGame above), gated behind a much higher,
// non-shrinking-relative-to-itself ladder: the last tier's LEVEL must reach
// getOverclockRequirement(overclockCount) — level 10 for the first activation, 20 for the second,
// 30 for the third, and so on. Resets everything speedUpGame does (every per-run field back to a
// fresh game, permanent automation toggles/flags carried over unchanged) — but where speedUpGame
// increments speedUpCount, overclockGame resets it to 0 (initial.speedUpCount) instead, wiping
// Speed Up's own stacking 2^speedUpCount production multiplier along with the rest of the reset,
// and increments overclockCount (permanently raising the per-level step every future REGULAR level
// of the global tickspeed multiplier compounds at by another OVERCLOCK_PRODUCTION_STEP — see
// getGlobalTickspeedRegularStep/getGlobalTickspeedProductionMultiplier) instead of leaving it
// untouched. `autoSpeedUp` (the automation toggle deciding whether Speed Up fires automatically) is
// unaffected by wiping speedUpCount — it's still carried over permanently below, so it simply
// starts re-accumulating speedUpCount from 0 on the next cycle, same as after a real Prestige.
// A no-op (returns the same state) while frozen or before the last tier has reached that cycle's
// requirement — same guards as speedUpGame.
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
    overclockCount: (state.overclockCount ?? 0) + 1,
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
