// Every tier is bought directly with the base currency (Bits); production cascades down
// through `producesResourceId` into the tier below's owned/resource count.
// `id` is a naming-agnostic key (tier01…tier10), decoupled from `name`/`symbol`
// so a future re-theme never has to touch state keys, tests, or save data.
// 'tier01' intentionally has costResourceId === producesResourceId: it is the
// entry-level money generator, bought with Bits to produce more Bits. Bytes themselves are no
// longer a purchasable tier here — they're produced entirely within the Byte Foundry pre-game
// screen (see the "Byte Foundry" constants section and `intro` state below), which hands the
// player their first Kilobytes directly once its own bit economy crosses a threshold, replacing
// the old cheap self-producing tier01 as the game's actual bootstrap. See docs/DESIGN_HISTORY.md
// for why Bytes was pulled out of this ladder.
// `baseTickSpeedSeconds` is each tier's own independent base production cadence, in seconds (see
// getTierBaseTickSpeedSeconds/tickGame in engine.js) — a plain per-tier field, not derived from
// tier order, so any single tier's cadence can be tuned or upgraded directly without touching a
// shared formula or any other tier. Each tier's cadence increases by 1s down the list — tier01=2s
// up through tier10=11s — since a slower cadence divides that tier's real throughput (see
// getTierBaseTickSpeedSeconds below) by up to 11x for the last tier, on top of the already-steep
// cost curve (see getTierCost/getCostEpochExponent in engine.js). This ladder was tried once before
// the tickspeed-multiplier system existed and reverted to a uniform 1s because nothing could offset
// the slowdown; now that both the per-tier (tickspeedLevels) and global (globalTickspeedMultiplier)
// tickspeed multipliers exist to shrink getEffectiveTierTickSpeedSeconds back down, later tiers are
// meant to be sped back up by investing in those rather than being structurally unable to keep pace
// — see docs/DESIGN_HISTORY.md for both the original revert and this reintroduction.
export const TIER_DEFINITIONS = [
  { id: 'tier01', name: 'Kilobytes',   symbol: 'KB', baseCost: 1E3,  costResourceId: 'base', producesResourceId: 'base',   baseTickSpeedSeconds: 2  },
  { id: 'tier02', name: 'Megabytes',   symbol: 'MB', baseCost: 1E6,  costResourceId: 'base', producesResourceId: 'tier01', baseTickSpeedSeconds: 3  },
  { id: 'tier03', name: 'Gigabytes',   symbol: 'GB', baseCost: 1E9,  costResourceId: 'base', producesResourceId: 'tier02', baseTickSpeedSeconds: 4  },
  { id: 'tier04', name: 'Terabytes',   symbol: 'TB', baseCost: 1E12, costResourceId: 'base', producesResourceId: 'tier03', baseTickSpeedSeconds: 5  },
  { id: 'tier05', name: 'Petabytes',   symbol: 'PB', baseCost: 1E15, costResourceId: 'base', producesResourceId: 'tier04', baseTickSpeedSeconds: 6  },
  { id: 'tier06', name: 'Exabytes',    symbol: 'EB', baseCost: 1E18, costResourceId: 'base', producesResourceId: 'tier05', baseTickSpeedSeconds: 7  },
  { id: 'tier07', name: 'Zettabytes',  symbol: 'ZB', baseCost: 1E21, costResourceId: 'base', producesResourceId: 'tier06', baseTickSpeedSeconds: 8  },
  { id: 'tier08', name: 'Yottabytes',  symbol: 'YB', baseCost: 1E24, costResourceId: 'base', producesResourceId: 'tier07', baseTickSpeedSeconds: 9  },
  { id: 'tier09', name: 'Ronnabytes',  symbol: 'RB', baseCost: 1E27, costResourceId: 'base', producesResourceId: 'tier08', baseTickSpeedSeconds: 10 },
  { id: 'tier10', name: 'Quettabytes', symbol: 'QB', baseCost: 1E30, costResourceId: 'base', producesResourceId: 'tier09', baseTickSpeedSeconds: 11 },
]


// Falls back to 'b' (lowercase — a bit) for MONEY_ID/an unrecognized resource id. No tier owns a
// bare 'B' (Byte) symbol any more — Bytes live only in the Byte Foundry intro, not this list.
export const RESOURCE_SYMBOL = tierId => TIER_DEFINITIONS.find(t => t.id === tierId)?.symbol || 'b'

// How often (in seconds) a tier's production is delivered as a single batch rather than
// continuously every global tick (see engine.js's tickGame / tierProductionAccumulators) —
// simply reads that tier's own independent baseTickSpeedSeconds field above. Not balance-neutral:
// a tier's real per-second throughput is divided by its own tickspeed (see tickGame in
// engine.js), which is why later tiers' 1s-10s ladder above leans on the tickspeed-multiplier
// system (getEffectiveTierTickSpeedSeconds) to be offset back down. An unrecognized tier id falls
// back to 1s rather than throwing.
export const getTierBaseTickSpeedSeconds = tierId =>
  TIER_DEFINITIONS.find(t => t.id === tierId)?.baseTickSpeedSeconds ?? 1

// A naming-agnostic key, fully decoupled from the "Bits" display name/symbol — same rationale as
// each tier's own `id` above.
export const MONEY_ID = 'base'
export const MONEY_STARTING_AMOUNT = 1
export const GOOGOL = 1e100
// A Byte is 8 bits — the Byte Foundry intro's own currency-conversion rate (see the "Byte Foundry"
// constants below and convertIntroBitsToKilobytes/tickIntroAutoInvest in engine.js).
export const BITS_PER_BYTE = 8
// Money (Bits) balance required to Prestige — "1 Googol Bytes," expressed in Bits since
// resources[MONEY_ID] is Bits-denominated, not Bytes (Bytes aren't even a purchasable tier any
// more — see TIER_DEFINITIONS above). This is the threshold isProductionFrozen/prestigeGame
// actually gate on. GOOGOL itself stays unchanged/exported — the exponent-based formulas
// (getPrestigePointsAwarded/getMoneyExponent/getPrestigeProgressPercent in engine.js) deliberately
// keep keying off GOOGOL's own clean 10^100 rather than this messier ~10^100.9 value, since an 8x
// constant factor is negligible at that scale — see docs/DESIGN_HISTORY.md.
export const PRESTIGE_THRESHOLD = GOOGOL * BITS_PER_BYTE
// The global tick fires 10x a second (a sub-second granularity, not "one tick = one real
// second") — engine.js's tickGame receives elapsedSeconds = TICK_RATE_MS / 1000 = 0.1 per call,
// and every real-world-time-based rate (autobuyer/Auto-Prestige attempt budgets) is explicitly
// scaled by elapsedSeconds so real-world cadence stays identical to a slower tick rate; only the
// update granularity (and animation smoothness) increases.
export const TICK_RATE_MS = 100

// --- Byte Foundry (pre-game intro) --- see docs/ECONOMY_REFERENCE.md's "Byte Foundry" section and
// createInitialGameState's `intro` field in engine.js. Its bit balance/capacity/production
// multiplier are a currency pool entirely separate from Money (resources.base) until the
// manual/auto conversions into owned Kilobytes described below.
// Starting/current cap on the intro's bit balance — both tapping and passive production stop
// crediting bits once the balance reaches this (see tapIntroBit/tickIntroProduction in engine.js).
export const INTRO_STARTING_CAPACITY = 8
// "Sacrifice for 10x Capacity" multiplies capacity by this each time it's taken: 8 → 80 → 800 →
// 8000 → … (see pickIntroCapacityMilestone in engine.js).
export const INTRO_CAPACITY_MULTIPLIER = 10
// The Byte generator's starting delivery period, in seconds — matches TIER_DEFINITIONS' own
// per-tier `baseTickSpeedSeconds` convention (a fixed period a batch is delivered every, not a
// continuous rate). "Invest for Double Production" halves this (see
// INTRO_MIN_TICK_SPEED_SECONDS/pickIntroProductionMilestone in engine.js) each time it's taken,
// until the tick loop's own real-time resolution can't usefully go any faster.
export const INTRO_STARTING_TICK_SPEED_SECONDS = 1
// Floor for the Byte generator's tickSpeedSeconds — halving the period below the live tick loop's
// own granularity (TICK_RATE_MS, i.e. 10 ticks/sec) wouldn't actually deliver bits any faster, only
// make tickIntroProduction's per-call math finer-grained for no observable effect. Once
// "Invest for Double Production" would halve tickSpeedSeconds below this, it multiplies
// productionMultiplier instead — the same "speed up delivery, then scale the batch" split
// TIER_DEFINITIONS' own tickspeed-vs-production-multiplier distinction already uses (see
// getEffectiveTierTickSpeedSeconds in engine.js) — so growth never stalls once the tick loop's
// own resolution limit is reached. See pickIntroProductionMilestone in engine.js.
export const INTRO_MIN_TICK_SPEED_SECONDS = TICK_RATE_MS / 1000
// "Invest for Double Production" multiplies by this each time it's taken — either dividing
// tickSpeedSeconds (speeding up delivery) or multiplying productionMultiplier (growing the batch
// size), whichever INTRO_MIN_TICK_SPEED_SECONDS above currently allows (see
// pickIntroProductionMilestone in engine.js). Net effect is the same either way: bits/sec doubles.
export const INTRO_PRODUCTION_MULTIPLIER_STEP = 2
// The Byte generator's base batch size, in bits, delivered once every tickSpeedSeconds — before
// productionMultiplier is applied (see tickIntroProduction/getIntroProductionRate in engine.js).
// At the starting tickSpeedSeconds (1s) and productionMultiplier (1x) this is exactly 1 bit/sec,
// matching a manual tap's own base amount (see tapIntroBit/getIntroProductionRate in engine.js).
export const INTRO_BYTE_BASE_RATE = 1
// One-time cost, in bits, to combine your first 8 tapped bits into the Byte generator (see
// combineIntroByte in engine.js) — equal to the starting capacity, since that's exactly how many
// bits tapping alone can hold before the Byte exists to start producing more.
export const INTRO_BYTE_COMBINE_COST = INTRO_STARTING_CAPACITY
// Manual conversion rate: this many intro bits become 1 Kilobyte unit in the main game (see
// convertIntroBitsToKilobytes in engine.js) — matches Kilobytes' own real baseCost (1E3 Bits) in
// TIER_DEFINITIONS above, so the intro's bit pool and the main game's Bits share the same
// underlying "cost of a Kilobyte" even though they're tracked as separate balances.
export const INTRO_BITS_PER_KILOBYTE_CONVERSION = 1000
// Capacity threshold at which the manual "convert bits to a Kilobyte" action becomes available and
// the intro page can start showing a "next phase" reveal indicator (see
// isIntroConversionUnlocked in engine.js) — the first capacity stage that can ever hold this many
// bits at once (capacity must reach 8000 before balance can reach 1000, given the 8/80/800/8000…
// ladder above).
export const INTRO_CONVERSION_UNLOCK_CAPACITY = INTRO_BITS_PER_KILOBYTE_CONVERSION

// --- Byte Foundry Storage (bank blocks) --- see buildStorageBank/tickStorageAutoFill/
// redeemStorageBank/tickStorageAutoRedeem/getStorageBankSize in engine.js and intro.storageBanks/
// storageBanksBuiltTotal/storageAutoRedeemEnabled/storageAutoRedeemedSizes in
// createInitialGameState. Banks are a genuine storage MEDIUM, not a one-shot pre-paid item:
// building one only constructs a permanent, EMPTY container; Memory (intro.bits) then auto-fills
// any empty container as it accumulates, smallest size first, and whatever's left over simply
// stays as Memory's own balance. Redeeming a FULL bank grants 1 free tier01 unit once tier01's own
// current per-unit level cost actually reaches that size, and empties the bank again — reusable,
// not single-use. Distinct from ordinary bit-to-Kilobyte conversion (see
// convertIntroBitsToKilobytes/tickIntroAutoInvest in engine.js): a bank's contents came from
// Memory via auto-fill, not a further transfer out of it at redeem time.
// Storage banks are themselves PERMANENT, like the Byte generator itself (see prestigeGame) —
// "never lost," and a full bank's contents ride through a real Prestige untouched even though
// Memory itself resets, letting banked-up Storage give a fresh cycle a head start.
// The whole Storage section stays hidden on ByteFoundryPage (see isStorageUnlocked in engine.js)
// until Memory's own capacity reaches 10 KB in its OWN B/KB/MB/… scale (BITS_PER_BYTE (8) × 1000
// per step — see ByteFoundryPage's getMemoryUnit — not the 1000-bits-per-"KB" scale the bank-size
// ladder above uses) — 80,000 bits, the 5th capacity stage (8 → 80 → 800 → 8000 → 80000 via
// Sacrifice). A deliberate pacing gate: Storage is a later-game mechanic, revealed only once the
// player has grown capacity a bit past the Kilobyte-transfer row's own, earlier 1000-bit reveal.
export const INTRO_STORAGE_UNLOCK_CAPACITY = 80000
// A bank of `capacity` bits costs `capacity * STORAGE_BUILD_COST_MULTIPLIER` bytes (NOT bits) to
// build — a 1 KiloBit/1000-bit bank costs 10,000 bytes (80,000 bits), a 1,000,000-bit ("1 MB")
// bank costs 10,000,000 bytes, and so on; see getStorageBankCost in engine.js for the bits
// conversion. This cost only ever pays for the empty container — it is NOT what fills it.
export const STORAGE_BUILD_COST_MULTIPLIER = 10
// The buildable size ladder walks tier01's own per-unit LEVEL COST sequence (getTierCost(tier01,
// level) for level 1, 2, 3, …) rather than a synthetic ×10 progression — offers tier01's level-1
// cost (1000 bits, "1 KB") until STORAGE_BANK_LADDER_CAP of them have ever been built, then
// tier01's level-2 cost (10,000 bits, "10 KB") until another STORAGE_BANK_LADDER_CAP, and so on
// (see getStorageBankSize in engine.js). Because getCostEpochExponent's triangular-number exponent
// sequence (1, 2, 4, 7, 11, …) skips values as levels increase, this ladder skips sizes too — e.g.
// tier01's level 3 costs 1,000,000 bits ("1 MB"), not 100,000 ("100 KB"), so a 100 KB bank can
// never exist. An independent progression, deliberately decoupled from tier01's CURRENT level
// (unlike an earlier version of this feature, see docs/DESIGN_HISTORY.md): a player can build
// ahead of or fall behind tier01's actual price, with isStorageBankRedeemable the only gate on
// whether a built bank is spendable yet. The ladder only ever advances — it's driven by
// intro.storageBanksBuiltTotal, a cumulative count that redeeming a bank never decrements.
export const STORAGE_BANK_LADDER_CAP = 10

// --- Byte Foundry Compute Cores/Nodes --- see isComputeCoreConversionUnlocked/
// tickComputeCoreConversion/tickComputeNodeConversion in engine.js and
// intro.computeCores/computeNodes in createInitialGameState. An earlier version of this mechanic
// costed a Compute Core at a fixed 10 MB of Memory, gated on every Storage bank size being built
// and full first — superseded by the dynamic model below, which has no relationship to Storage at
// all; see docs/DESIGN_HISTORY.md for why.
//
// Capacity threshold at which Compute Cores reveal on ByteFoundryPage and the automatic conversion
// below activates — 100 KB in Memory's own B/KB/MB/… display scale (BITS_PER_BYTE (8) × 1000² per
// step — see getMemoryUnit in ByteFoundryPage), 800,000 bits: one Sacrifice stage past Storage's
// own reveal (INTRO_STORAGE_UNLOCK_CAPACITY, 10 KB) — a later, more advanced-game gate, matching
// the same "capacity-magnitude reveal" convention every other Byte Foundry section uses.
export const INTRO_COMPUTE_CORE_UNLOCK_CAPACITY = 800_000
// 1 Compute Node costs this many Compute Cores (see tickComputeNodeConversion in engine.js). Both
// intro.computeCores and intro.computeNodes are permanent counters, carried over every real
// Prestige exactly like the Byte generator/Storage banks themselves — see prestigeGame.
export const COMPUTE_CORES_PER_NODE = 8

// Progress accrued while the game wasn't open (see engine.js's applyOfflineProgress) is
// simulated at 50% of normal speed, for the entire game (main game tiers and the Byte Foundry
// alike — tickGame unconditionally drives both, see applyOfflineProgress) — a courtesy for short
// absences, not a way to make the autobuyer loop outrun active play.
export const OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.5
// Real-world elapsed time is capped at 24 hours before the speed multiplier is applied, so a
// very long absence can't turn into an unbounded simulation loop on load.
export const MAX_OFFLINE_SECONDS = 24 * 60 * 60

// The purchase block size a tier's level 1 (the very start of a run) requires to complete: buying
// this many pieces of it advances a tier from level 1 to level 2. This is only the *default/
// starting* value, not a fixed constant used throughout the game — the effective, current block
// size is computed at runtime by engine.js's getPurchaseBlockSize(state) and can grow over the
// course of a run (see PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS/PURCHASE_BLOCK_SIZE_GROWTH_STEP
// below), so nothing in the game should treat this value as fixed forever. A tier's current level
// and its progress toward completing that level are tracked directly in state
// (purchaseLevels/purchaseLevelProgress, see engine.js's createInitialGameState) rather than
// derived by dividing a lifetime purchase count by a block size — see docs/DESIGN_HISTORY.md for
// why (the block size isn't fixed, so there's no single divisor to derive a level from after the
// fact).
export const DEFAULT_PURCHASE_BLOCK_SIZE = 8

// Every this many levels the LAST tier completes, the (global, shared-by-every-tier) purchase
// block size grows by PURCHASE_BLOCK_SIZE_GROWTH_STEP (see engine.js's getPurchaseBlockSize) — ties
// growth to the same "flagship" progress marker getSpeedUpRequirement/isLastTierTickspeedXpUnlocked/
// prestigeCardEverRevealed already key off, rather than any other tier or a global total.
export const PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS = 100
// The amount the block size grows by every PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS.
export const PURCHASE_BLOCK_SIZE_GROWTH_STEP = 1

// A tier's production doubles at every level milestone (see engine.js's
// getPurchaseMilestoneMultiplier) — the per-level multiplier normally applied.
export const PURCHASE_MILESTONE_MULTIPLIER_BASE = 2
// Every 10th level uses this larger multiplier instead of PURCHASE_MILESTONE_MULTIPLIER_BASE for
// that one level — a bigger milestone every 10 levels on top of the regular one every level (see
// engine.js's getPurchaseMilestoneMultiplier). This "every 10th level" cadence is independent of
// the (now variable) purchase block size — it stays a fixed 10, regardless of how many purchases
// make up one level.
export const PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE = 10

// Each unspent Prestige Point adds a flat 1% production-speed bonus, uniformly across every
// tier (see engine.js's getPrestigeProductionMultiplier) — replaces the old "prestige level
// doubles production" mechanic. Spending points on autobuyer automation trades this bonus away.
// This bonus is inert until unlocked (see PRESTIGE_SPEED_BONUS_UNLOCK_COST below) — it no longer
// applies automatically just from holding points.
export const PRESTIGE_POINT_SPEED_BONUS = 0.01
// One-time PP cost to unlock the passive production-speed bonus above (see engine.js's
// buyPrestigeSpeedBonus) — before this is bought, unspent Prestige Points grant no production
// bonus at all, regardless of balance. Permanent once bought, like autobuyer automation/Smart/
// Auto-Prestige. The priciest of the four global PP automation unlocks (see AUTO_SPEED_UP_COST/
// TICKSPEED_AUTOBUYER_COST/AUTO_PRESTIGE_COST below), since it's a passive, always-on bonus rather
// than a one-shot action.
export const PRESTIGE_SPEED_BONUS_UNLOCK_COST = 10000
// Per-tier base cost for the tickspeed multiplier ladder (see engine.js's
// getTickspeedMultiplierBaseCost/getTickspeedMultiplierCost) — 10^10 for the first tier (index 0),
// decreasing by a power of ten per subsequent tier (10^9, 10^8, … 10^1 for the 10th/last tier).
// Reaching level L on a tier costs this base raised to L. This ladder is Money-funded only (see
// buyTickspeedMultiplier) — the separate PP-funded autobuyer unlock (see
// AUTOBUYER_UNLOCK_BASE_COST below) no longer reuses it.
export const TICKSPEED_MULTIPLIER_BASE_EXPONENT = 10
// Each tickspeed multiplier level compounds a tier's
// production by another 10% (see engine.js's getTickspeedProductionMultiplier) — the same 1.1x
// compounding rate that used to drive autobuyer purchase-attempt frequency before that effect was
// moved to production instead (see "Tickspeed multiplier" in CLAUDE.md).
export const TICKSPEED_PRODUCTION_STEP = 0.1
// Historical per-tier PP-cost formula (see engine.js's getAutobuyerUnlockCost) — no longer an
// actual purchase (a tier's autobuyer now unlocks automatically at a prestige-count milestone
// instead, see AUTOBUYER_UNLOCK_MILESTONE_START below), kept only as the pricing benchmark
// SMART_AUTOBUYER_COST_MULTIPLIER below multiplies: 1 "PP-equivalent" for the first tier, up
// through 10 for the 10th/last tier.
export const AUTOBUYER_UNLOCK_BASE_COST = 1
// The "smart" autobuyer (see engine.js's getSmartAutobuyerCost/buySmartAutobuyer) costs this many
// times more PP than AUTOBUYER_UNLOCK_BASE_COST's benchmark above — 10 PP through 100 PP across
// the ten tiers. Still a genuine PP purchase, unlike autobuyer unlock itself.
export const SMART_AUTOBUYER_COST_MULTIPLIER = 10
// How many times the player must have prestiged before a tier's unit-buying autobuyer unlocks
// automatically (see engine.js's getAutobuyerUnlockMilestone/applyAutobuyerMilestones) — replaces
// the old PP-cost-funded unlock entirely: no purchase, no PP spent, just a milestone reached by
// prestige count. tier01 unlocks after the very first prestige, tier02 after the second, … tier10
// after the tenth (AUTOBUYER_UNLOCK_MILESTONE_START + tierIndex * AUTOBUYER_UNLOCK_MILESTONE_STEP).
export const AUTOBUYER_UNLOCK_MILESTONE_START = 1
export const AUTOBUYER_UNLOCK_MILESTONE_STEP = 1
// Same milestone-based automatic-unlock mechanism as the autobuyer unlock above, but for a tier's
// own tickspeed-multiplier autobuyer (see engine.js's getTierTickspeedAutobuyerMilestone) — starts
// later (prestige 12 for tier01) and spaces out twice as slowly (every 2 prestiges: 12, 14, 16, …
// 30 for tier10), reflecting that it's a later-game convenience layered on top of the (now free)
// unit-buying autobuyer above. Also no longer PP-funded.
export const TIER_TICKSPEED_AUTOBUYER_MILESTONE_START = 12
export const TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP = 2
// The global tickspeed multiplier (see engine.js's getGlobalTickspeedProductionMultiplier/
// buyGlobalTickspeedMultiplier) speeds up *every* tier's production at once — unlike the per-tier
// tickspeed multiplier, this is a single global upgrade track (mirroring Auto-Prestige's
// null/level pattern), not something bought separately per tier. Every level compounds this rate
// (1%) — the same ×1.01-per-level growth the design always had — except a milestone level (see
// GLOBAL_TICKSPEED_MILESTONE_STEP below) compounds by that larger rate instead, for that one level
// only.
export const GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01
// The compounding rate a *milestone* level of the global tickspeed multiplier uses in place of
// GLOBAL_TICKSPEED_PRODUCTION_STEP above (10% instead of the regular 1%, still multiplicative —
// see getGlobalTickspeedProductionMultiplier). Milestone *spacing* widens by a factor of ten every
// time the level crosses another power-of-ten range: every 10th level up to 100 (10, 20, …, 100),
// then every 100th level up to 1000 (200, 300, …, 1000), then every 1000th level up to 10000, and
// so on indefinitely (see getGlobalTickspeedProductionMultiplier's countGlobalTickspeedMilestones
// helper).
export const GLOBAL_TICKSPEED_MILESTONE_STEP = 0.10
// Base PP cost of Auto-Prestige's first level (see engine.js's getAutoPrestigeCost/
// buyAutoPrestige) — a single global upgrade track, not per-tier, so unlike the tier costs above
// it scales by level rather than by tier index; AUTO_PRESTIGE_COST_MULTIPLIER below doubles it
// each level. Priced above AUTO_SPEED_UP_COST (see below) since Auto-Prestige only ever fires
// once per run at most, versus Speed Up's much higher activation frequency.
export const AUTO_PRESTIGE_COST = 1000
// Auto-Prestige's cost doubles with each level purchased (see engine.js's getAutoPrestigeCost).
export const AUTO_PRESTIGE_COST_MULTIPLIER = 2
// Auto-Prestige's base check cadence at level 1: once unlocked, it attempts to prestige roughly
// this often (see engine.js's getAutoPrestigeAttemptRate) — only actually firing once Money has
// reached GOOGOL. Each level beyond the first speeds this up by 10%, compounding.
export const AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000
// Per-activation production-speed multiplier base for Speed Up (see engine.js's
// getSpeedUpMultiplier/speedUpGame) — production is multiplied by SPEED_UP_MULTIPLIER_BASE raised
// to state.speedUpCount, so each activation doubles it (1x, 2x, 4x, 8x, …). Unlike the Prestige
// Point speed bonus above, this is unconditional — no PP-spent unlock step, it applies as soon as
// speedUpCount > 0.
export const SPEED_UP_MULTIPLIER_BASE = 2
// Per-activation boost to the (Money-funded) global tickspeed multiplier's own per-level step —
// see engine.js's getGlobalTickspeedRegularStep/getGlobalTickspeedProductionMultiplier/
// overclockGame — a second, much steeper Speed-Up-style soft reset. Each Overclock activation adds
// another OVERCLOCK_PRODUCTION_STEP (0.1 percentage points) directly onto
// GLOBAL_TICKSPEED_PRODUCTION_STEP (1%), permanently raising the rate every *future* regular level
// of the global tickspeed multiplier compounds at — 1% per level with no activations, 1.1% after
// the first, 1.2% after the second, and so on (a milestone level's own 10% step,
// GLOBAL_TICKSPEED_MILESTONE_STEP, is unaffected). This is deliberately NOT a separate multiplier
// stacked on top the way Speed Up's own production multiplier is — it reshapes the existing global
// tickspeed track's own growth curve instead, so a level already bought before an Overclock
// activation retroactively compounds at the new, higher rate from then on, same as every other
// level. Deliberately two orders of magnitude smaller a step than GLOBAL_TICKSPEED_PRODUCTION_STEP
// itself — Overclock's value is in how permanent and stackable it is (state.overclockCount is
// never reset by an ordinary Speed Up, unlike globalTickspeedMultiplier itself — see speedUpGame),
// not in the size of any single activation.
export const OVERCLOCK_PRODUCTION_STEP = 0.001
// How many more levels the last tier must reach before Overclock can activate again: a fixed
// 10-level jump per activation (10, 20, 30, … — see engine.js's getOverclockRequirement), a much
// steeper, non-escalating-by-a-smaller-step ladder than Speed Up's own +1-per-cycle requirement
// (see getSpeedUpRequirement) — reflecting that Overclock resets everything Speed Up does *and*
// wipes Speed Up's own stacking bonus (state.speedUpCount) on top, so it needs to be substantially
// more expensive to reach each time.
export const OVERCLOCK_REQUIREMENT_STEP = 10
// One-time PP cost to permanently automate Speed Up (see engine.js's buyAutoSpeedUp) — once
// bought, tickGame triggers speedUpGame automatically the instant it's eligible, with no manual
// click needed. Cheaper than PRESTIGE_SPEED_BONUS_UNLOCK_COST/AUTO_PRESTIGE_COST since Speed Up
// itself fires far more often than either of those two over a run — but pricier than
// TICKSPEED_AUTOBUYER_COST below, since the global tickspeed multiplier it automates is a much
// smaller, earlier-game upgrade than Speed Up.
export const AUTO_SPEED_UP_COST = 100
// One-time PP cost to automate the (Money-funded) global tickspeed multiplier — once bought,
// tickGame calls buyGlobalTickspeedMultiplier automatically every tick, re-validating its own
// eligibility internally (see engine.js's buyTickspeedAutobuyer/tickGame). The cheapest of all
// four global PP automation unlocks (see PRESTIGE_SPEED_BONUS_UNLOCK_COST/AUTO_SPEED_UP_COST
// above and AUTO_PRESTIGE_COST below), since the global tickspeed multiplier it automates is a
// much smaller, earlier-game upgrade (unlocked as soon as the second tier is owned) than any of
// the actions those other three automate.
export const TICKSPEED_AUTOBUYER_COST = 20
// One-time PP cost to permanently automate RE-LEVELING Auto-Prestige itself (see engine.js's
// buyAutoPrestigeAutobuyer) — once bought, tickGame calls buyAutoPrestige automatically every
// tick once affordable, so a level-up beyond the first no longer needs a manual click. This is a
// "meta-automation" (it automates re-buying an already-PP-funded track, not a Money-funded one
// like the other two autobuyer toggles above), and only ever does anything once Auto-Prestige has
// already been activated once — so it's priced below AUTO_PRESTIGE_COST's own initial-activation
// cost (the clicks it saves are already rare, since each Auto-Prestige level doubles in cost) but
// well above the two cheaper Money-funded autobuyer toggles above, since this row is gated behind
// allTiersFullyAutomated — a genuinely late-game convenience, not an early one.
export const AUTO_PRESTIGE_AUTOBUYER_COST = 500
// Whenever the last tier's currently-owned count is >= 10, its Money-funded tickspeed multiplier
// (see TICKSPEED_MULTIPLIER_BASE_EXPONENT/buyTickspeedMultiplier above) is replaced by an
// XP-funded one instead (see engine.js's isLastTierTickspeedXpUnlocked/
// getLastTierXpTickspeedMultiplier/consumeXpForLastTierTickspeed) — each XP ever consumed this way
// compounds another LAST_TIER_XP_TICKSPEED_STEP (1%) into the last tier's own delivery frequency,
// permanently (this accumulated bonus is never lost, even while owned dips below 10 and the
// mechanic is temporarily disengaged). "Last tier" (not a hardcoded tier id) so this stays correct
// if TIER_DEFINITIONS ever grows a new final entry.
export const LAST_TIER_XP_TICKSPEED_STEP = 0.01
// Each single XP-consumption action must be at least this fraction of the cumulative XP already
// consumed this way (see engine.js's getLastTierXpTickspeedMinConsumption) — so repeat
// consumptions can't trickle in one XP at a time forever; the required minimum grows alongside
// however much has already been invested, mirroring the game's other escalating-cost patterns
// (getTierCost's epoch multiplier, getSpeedUpRequirement).
export const LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT = 0.1
// The very first consumption has cumulative XP consumed = 0, so
// LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT alone would compute a minimum of 0 — this floor
// gives that first action (and any other case the percentage still rounds to 0) a real minimum of
// 1 XP instead.
export const LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR = 1
