// Every tier is bought directly with the base currency (Bits); production cascades down
// through `producesResourceId` into the tier below's owned/resource count.
// `id` is a naming-agnostic key (tier01…tier10), decoupled from `name`/`symbol`
// so a future re-theme never has to touch state keys, tests, or save data.
// 'tier01' is bought with Bits but produces Bytes (see BYTES_ID below) — the Factory's
// byte-scale output currency for Clock Speed. `tickGame` also mirrors each Byte into Bits at
// `BITS_PER_BYTE` so MoneyHero / Prestige / Buys (still Bits-denominated) keep moving. Bytes
// themselves are still not a purchasable tier here; the Byte Foundry pre-game screen (see the
// "Byte Foundry" constants section and `intro` state below) hands the player their first
// Kilobytes directly once its own bit economy crosses a threshold, replacing the old cheap
// self-producing tier01 as the game's actual bootstrap. See docs/DESIGN_HISTORY.md for why
// Bytes was pulled out of this ladder.
// `baseTickSpeedSeconds` is each tier's own independent base production cadence, in seconds (see
// getTierBaseTickSpeedSeconds/tickGame in engine.js) — a plain per-tier field, not derived from
// tier order, so any single tier's cadence can be tuned or upgraded directly without touching a
// shared formula or any other tier. Each tier's cadence increases by 1s down the list — tier01=1s
// up through tier10=10s — since a slower cadence divides that tier's real throughput (see
// getTierBaseTickSpeedSeconds below) by up to 10x for the last tier, on top of the already-steep
// cost curve (see getTierCost/getCostEpochExponent in engine.js). This ladder was tried once before
// the tickspeed-multiplier system existed and reverted to a uniform 1s because nothing could offset
// the slowdown; now that both the per-tier (tickspeedLevels) and global (globalTickspeedMultiplier)
// tickspeed multipliers exist to shrink getEffectiveTierTickSpeedSeconds back down, later tiers are
// meant to be sped back up by investing in those rather than being structurally unable to keep pace
// — see docs/DESIGN_HISTORY.md for both the original revert and this reintroduction.
export const TIER_DEFINITIONS = [
  { id: 'tier01', name: 'Kilobytes',   symbol: 'KB', baseCost: 1E3,  costResourceId: 'base', producesResourceId: 'bytes', baseTickSpeedSeconds: 1  },
  { id: 'tier02', name: 'Megabytes',   symbol: 'MB', baseCost: 1E6,  costResourceId: 'base', producesResourceId: 'tier01', baseTickSpeedSeconds: 2  },
  { id: 'tier03', name: 'Gigabytes',   symbol: 'GB', baseCost: 1E9,  costResourceId: 'base', producesResourceId: 'tier02', baseTickSpeedSeconds: 3  },
  { id: 'tier04', name: 'Terabytes',   symbol: 'TB', baseCost: 1E12, costResourceId: 'base', producesResourceId: 'tier03', baseTickSpeedSeconds: 4  },
  { id: 'tier05', name: 'Petabytes',   symbol: 'PB', baseCost: 1E15, costResourceId: 'base', producesResourceId: 'tier04', baseTickSpeedSeconds: 5  },
  { id: 'tier06', name: 'Exabytes',    symbol: 'EB', baseCost: 1E18, costResourceId: 'base', producesResourceId: 'tier05', baseTickSpeedSeconds: 6  },
  { id: 'tier07', name: 'Zettabytes',  symbol: 'ZB', baseCost: 1E21, costResourceId: 'base', producesResourceId: 'tier06', baseTickSpeedSeconds: 7  },
  { id: 'tier08', name: 'Yottabytes',  symbol: 'YB', baseCost: 1E24, costResourceId: 'base', producesResourceId: 'tier07', baseTickSpeedSeconds: 8  },
  { id: 'tier09', name: 'Ronnabytes',  symbol: 'RB', baseCost: 1E27, costResourceId: 'base', producesResourceId: 'tier08', baseTickSpeedSeconds: 9  },
  { id: 'tier10', name: 'Quettabytes', symbol: 'QB', baseCost: 1E30, costResourceId: 'base', producesResourceId: 'tier09', baseTickSpeedSeconds: 10 },
]


// Precompute dictionaries for O(1) lookups rather than O(N) Array.find calls.
// Keys are tier ids ('tier01', etc).
// Null-prototype so ids that collide with Object.prototype members ('toString', 'constructor')
// miss instead of resolving to an inherited value.
export const TIER_BY_ID = Object.assign(Object.create(null), Object.fromEntries(
  TIER_DEFINITIONS.map(t => [t.id, t])
))
export const TIER_INDEX_BY_ID = Object.assign(Object.create(null), Object.fromEntries(
  TIER_DEFINITIONS.map((t, index) => [t.id, index])
))

const TIER_SYMBOLS = Object.fromEntries(
  TIER_DEFINITIONS.map(t => [t.id, t.symbol])
)
const TIER_TICK_SPEEDS = Object.fromEntries(
  TIER_DEFINITIONS.map(t => [t.id, t.baseTickSpeedSeconds])
)

// Falls back to 'b' (lowercase — a bit) for MONEY_ID/an unrecognized resource id.
export const BYTES_ID = 'bytes'
export const RESOURCE_SYMBOL = resourceId => {
  if (resourceId === BYTES_ID) return 'B'
  return TIER_SYMBOLS[resourceId] || 'b'
}

// How often (in seconds) a tier's production is delivered as a single batch rather than
// continuously every global tick (see engine.js's tickGame / tierProductionAccumulators) —
// simply reads that tier's own independent baseTickSpeedSeconds field above. Not balance-neutral:
// a tier's real per-second throughput is divided by its own tickspeed (see tickGame in
// engine.js), which is why later tiers' 1s-10s ladder above leans on the tickspeed-multiplier
// system (getEffectiveTierTickSpeedSeconds) to be offset back down. An unrecognized tier id falls
// back to 1s rather than throwing.
export const getTierBaseTickSpeedSeconds = tierId =>
  TIER_TICK_SPEEDS[tierId] ?? 1

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
// After this many lifetime prestiges, Money may exceed PRESTIGE_THRESHOLD without freezing
// production — the player keeps earning and may Prestige voluntarily to claim accumulated PP.
export const PRESTIGE_UNBOUNDED_MIN_COUNT = 100
// Base PP earning rate beyond Googol: 1 PP per this many additional money-exponent "powers"
// (orders of magnitude above GOOGOL's own 10^100 exponent). Each Double PP upgrade halves this
// until 1 power per PP, then doubles PP per power instead (see getPrestigePowersPerPp/
// getPrestigePpPerPower in engine.js).
export const PRESTIGE_POWERS_PER_PP_BASE = 64
// Each Double PP upgrade costs 100^(level+1) PP — 100, 10_000, 1_000_000, …
export const PRESTIGE_DOUBLE_PP_UPGRADE_COST_BASE = 100
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
// Step between adjacent levels on the shared binary Capacity ladder (1 Byte → 2 → 4 → …). Used to
// describe the common level table pools draw start/end bounds from — not a player-facing Sacrifice
// multiplier anymore (#506 / Revision 2 of #456). Kept so docs/tests can name the ladder spacing.
export const INTRO_CAPACITY_DOUBLING_STEP = 2
// Shared binary-unit ladder step for Data Stream Buffer display ONLY — 1 KiB = 1024 Bytes (vs. a
// Disk's own SI 1 KB = 1000 Bytes; see MEMORY_BINARY_UNIT_SYMBOLS/getMemoryUnit in engine.js). The
// Data Stream card's own balance/Buffer figure stays binary-denominated — this step governs that
// display rounding only. It no longer governs where a pool's own Capacity end bound actually
// lands (see POOL_CAPACITY_SI_STEP below) — Storage pools use SI units for all purposes.
export const MEMORY_BINARY_UNIT_STEP = 1024
// Per-pool Memory Capacity end bounds land on clean SI powers of 1000 Bytes (1 MB, 1 GB, 1 TB, …),
// not the binary powers of 1024 a raw Capacity-×2 doubling ladder would naturally produce (1 MiB,
// 1 GiB, …) — Storage pools use SI units for all purposes, including their own Capacity ceiling,
// so the underlying value itself must land on an SI-round number, not merely its display. A pure
// binary doubling sequence (1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, …) can be corrected onto
// an SI-round endpoint with a single deviation per decade of 10 doublings: instead of doubling from
// 64 to 128, the 10th doubling of a decade steps from 64 to 125 (×1.953125, not ×2) and then
// resumes ordinary doubling (125 → 250 → 500 → 1000) — landing exactly on 1000 (not 1024) after
// every 10 doublings, and on 1000^d after every 10d doublings. Every pool boundary below sits at a
// whole multiple of 10 doublings from the 1-Byte floor, so this reduces to a plain power of this
// constant rather than needing the full per-step mantissa sequence — see
// docs/DESIGN_HISTORY.md for the derivation and the reasoning for exactly this switchover point.
export const POOL_CAPACITY_SI_STEP = 1000
// Pool 1 (Kilobyte pool) Memory Capacity end bound, in bits — exactly 1 MB (SI, 1,000,000 Bytes),
// which happens to exactly equal the pool's largest Disk build cost (100 KB ×
// DISK_BUILD_COST_MULTIPLIER = 8,000,000 bits) — the buffer must reach completely full to fund
// that last disk, not merely "at least" it with margin, as the old binary 1 MiB (8,388,608-bit)
// bound gave. See getStoragePoolMemoryBounds / docs/DESIGN_HISTORY.md. Alias of pool 1's
// endBits so existing call sites stay stable.
export const INTRO_CAPACITY_CAP_BITS = BITS_PER_BYTE * POOL_CAPACITY_SI_STEP ** 2
// Per-pool Memory Capacity window (#506, corrected to SI — see POOL_CAPACITY_SI_STEP above).
// startBits is always the common 1-Byte floor; endBits is exactly 1000^(poolIndex+1) Bytes (pool 1
// → 1 MB, pool 2 → 1 GB, pool 3 → 1 TB, …). Pools do not use Sacrifice doubling — Capacity is
// delimited by these bounds directly. poolIndex is 1-based.
export const getStoragePoolMemoryBounds = (poolIndex = 1) => {
  const index = Math.max(1, Math.floor(Number(poolIndex) || 1))
  return {
    startBits: INTRO_STARTING_CAPACITY,
    endBits: BITS_PER_BYTE * (POOL_CAPACITY_SI_STEP ** (index + 1)),
  }
}
// "Speed ×2" (was Bandwidth / Invest) cost ladder steps ×4 per tier — see
// getIntroProductionMilestoneCost in engine.js. Independent of the Capacity level ladder above.
export const INTRO_BANDWIDTH_COST_MULTIPLIER = 4
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
// convertIntroBitsToKilobytes in engine.js) — equal to BITS_PER_BYTE (8) × Kilobytes' own real
// baseCost (1E3 Bits) in TIER_DEFINITIONS above (see getIntroKilobyteConversionCost's own
// BITS_PER_BYTE multiplication in engine.js), so this starting rate lines up with tier01's actual
// starting per-unit cost once expressed in bits.
export const INTRO_BITS_PER_KILOBYTE_CONVERSION = 8000
// Buffer / pool Memory Capacity threshold at which the manual "convert bits to a Kilobyte" action
// becomes available (see isIntroConversionUnlocked in engine.js). Capacity reaches this threshold
// through the full-Buffer Capacity ×2 ladder rather than snapping on Combine / normalize /
// Era-with-byteCreated. Historically also equal to the first
// conversion's starting balance cost at INTRO_BITS_PER_KILOBYTE_CONVERSION.
export const INTRO_CONVERSION_UNLOCK_CAPACITY = INTRO_BITS_PER_KILOBYTE_CONVERSION

// --- Byte Foundry Storage (Disks) --- see provisionDisk/tickProvisionDisk/tickDiskAutoFill/
// redeemDisk/tickDiskAutoRedeem/getDiskSize in engine.js and intro.disks/disksBuiltTotal/
// diskCache/diskBuild/diskAutoRedeemedSizes in createInitialGameState. Disks are a genuine
// storage MEDIUM, not a one-shot pre-paid item: building one only constructs a permanent, EMPTY
// container (after a real build TIME — see below); Data Stream (intro.bits) then keeps each array's
// Cache full (whole-block transfers — see the cache comment / tickDiskAutoFill) and flushes a full
// read cache into an empty disk over one cache-block production duration when no tier claim
// blocks that size — leftover Data Stream stays as its own balance. Redeeming a
// FULL disk grants 1 free tier01 unit once tier01's own current per-unit level cost actually
// reaches that size, and empties the disk again — reusable, not single-use. Distinct from ordinary
// bit-to-Kilobyte conversion (see convertIntroBitsToKilobytes/tickIntroAutoInvest in engine.js): a
// disk's contents came from Data Stream via the read-cache flush, not a further transfer out of it at redeem time.
// Disks (and their arrays' cache) are themselves PERMANENT, like the Byte generator itself (see
// prestigeGame) — "never lost," and a full disk's contents ride through a real Prestige untouched
// even though Data Stream itself resets, letting banked-up Storage give a fresh cycle a head start.
// The whole Storage section stays hidden on ByteFoundryPage (see isStorageUnlocked in engine.js)
// until Buffer / pool Memory Capacity reaches this many bits — 80,000 bits, "9.765 KiB" in binary
// display scale (getMemoryUnit in engine.js) — NOT the same scale Disk sizes render in
// (getDiskSize/formatDiskSize stay SI; see the "Byte-denominated display units" section further
// down). Well under pool 1's INTRO_CAPACITY_CAP_BITS end bound. Storage reveals once the Capacity ×2
// ladder reaches this threshold; it is not forced to the pool end on Combine. Historically this was
// a later-game reveal once the player had grown capacity past the Kilobyte-transfer row via
// Capacity doublings.
export const INTRO_DISK_UNLOCK_CAPACITY = 80000
// A disk of `capacity` bits costs `capacity * DISK_BUILD_COST_MULTIPLIER` bits to build — a real
// 1 KB (8000-bit) disk costs 80,000 bits ("10 KB"), a real 10 KB (80,000-bit) disk costs 800,000
// bits ("100 KB"), and so on; see getDiskCost in engine.js. This cost only ever pays for the empty
// container — it is NOT what fills it. `capacity` here is already Byte-accurate (see getDiskSize's
// own BITS_PER_BYTE factor in engine.js — a past version of this ladder priced Disks in
// "kilobits" instead of real Kilobytes; see docs/DESIGN_HISTORY.md for that bug and its fix), so no
// further unit conversion is needed here the way an older version of this constant once required.
export const DISK_BUILD_COST_MULTIPLIER = 10
// Smallest buildable Disk size, in bits — 1 KB Byte-accurate (same face value tier01's own level-1
// unit cost × BITS_PER_BYTE). See getDiskLadderSizeBits / getDiskSize in engine.js.
export const DISK_LADDER_BASE_SIZE_BITS = BITS_PER_BYTE * 1000
// Each ladder step multiplies the previous size by this — the pure formula covers every
// Byte-scale power-of-ten size with no gaps (1 KB → 10 KB → 100 KB → 1 MB → 10 MB → …, issue #368,
// fixing an earlier ladder that walked tier01's level-cost sequence instead and skipped sizes
// whenever cost-epoch exponents jumped — 100 KB → 10 MB, never 1 MB). `getDiskSize` (engine.js)
// only actually WALKS this formula up to getMaxActiveDiskLadderStep(state) in engine.js — three
// sizes per currently-unlocked storage pool, with each newly unlocked pool extending the active
// ladder by another 1/10/100 × tier of disk sizes.
export const DISK_LADDER_SIZE_MULTIPLIER = 10
// How many disks must ever be built at the current ladder size before getDiskSize advances to the
// next (×DISK_LADDER_SIZE_MULTIPLIER) size. Driven by intro.disksBuiltTotal — cumulative, never
// decremented by redeeming — so the ladder only ever advances. Deliberately decoupled from any
// tier's CURRENT purchase level (a player can build ahead of or fall behind redeemability;
// isDiskRedeemable is the only gate on whether a built disk is spendable yet).
export const DISK_ARRAY_LADDER_CAP = 10
// A disk array's cache — a permanent always-full reserve Memory tops up in whole-block transfers
// (see tickDiskAutoFill in engine.js). Split into this many equal blocks, each holding
// `size / DISK_CACHE_BLOCK_COUNT` bits (a real 1 KB/8000-bit array → 8 × 1000 bits/"1 Kb"; a 1 MB
// array → 8 × 1 Mb — lowercase 'b' bit-scale via formatCacheSize, distinct from Disks' uppercase
// Byte-scale). Cache funds matching main-game tier level blocks via manual release
// (releaseDiskCacheBlock, only while this size's own fixed corresponding tier currently sits at
// its required level and no full redeemable disk exists). When full, it also flushes into an empty disk over one block's
// production duration (getDiskReadCacheFlushSeconds). Steady state is full; gaps only right after
// a release, a completed flush, or when a size is newly unlocked/built.
export const DISK_CACHE_BLOCK_COUNT = 8

// --- Disk/Cache fill bandwidth --- every timed Byte Foundry storage transfer (disk build,
// read-cache refill/flush, write-cache collect/flush) is paced as a multiple of the Byte Foundry's
// own current production rate (getIntroProductionRate in engine.js — "Memory bandwidth"), not a
// flat/hardcoded rate, so it always tracks Invest/Compute Boost like every other timed mechanic
// here. Building a fresh disk (an empty container, not yet fed by any cache) takes exactly the
// time to fill it at 1x Memory bandwidth — no multiplier constant of its own, since 1x is bandwidth
// itself.
//
// A DISK filling FROM a cache (read-cache → disk, write-cache → disk) moves faster than Memory's
// own live production, since the cache itself is a pre-staged buffer, not a live trickle.
export const DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER = 2
// A CACHE filling FROM Memory (read-cache refill) can drain a banked Memory balance faster still —
// even a large surplus balance still only drains into the cache at this multiple of the CURRENT
// production rate, not instantly.
export const CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER = 10
// A CACHE filling FROM Disks (write-cache collecting from the source size's full disks) — slower
// than filling from Memory directly, since it's moving already-built Disk contents rather than the
// live generator output.
export const CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER = 2

// --- Byte Foundry Compute Cores/Nodes --- see isComputeCoreConversionUnlocked in engine.js and
// intro.computeCores/computeNodes in createInitialGameState. Earlier versions of this mechanic
// costed a Compute Core at a fixed 10 MB of Memory (gated on every Disk size being built and full),
// then at a dynamic, capacity-tied Memory flush ("Claim Core") — both superseded by
// startBoosterTransfer in engine.js, which spends the matching Data Lake's deposited Disk stock
// first, then a live timed transfer off the raw Disk inventory for any remaining cost (see
// "Data Lake Booster transfers" below), and has no relationship to Memory/Storage at all; see
// docs/DESIGN_HISTORY.md for why.
//
// Capacity threshold at which Boosters / ComputePage reveal — historically a later gate than
// Storage's own reveal (INTRO_DISK_UNLOCK_CAPACITY, 80,000 bits), matching the same
// "capacity-magnitude reveal" convention every other Byte Foundry section uses. Was a flat
// 8,000,000 bits (~1 MB) under the old ×10-forever capacity ladder; retuned to half of pool 1's
// Memory Capacity end bound (INTRO_CAPACITY_CAP_BITS, now a clean SI 1 MB — see
// POOL_CAPACITY_SI_STEP) — i.e. 4,000,000 bits (500 KB); one Capacity doubling-step short of that
// hard cap. This unlocks when the Capacity doubling ladder reaches the threshold, not by snapping
// on Combine. Preserves the original's "last/highest of the two
// capacity-gated reveals" relative ordering of the threshold constants themselves (conversion <
// storage < compute); see
// docs/DESIGN_HISTORY.md.
export const INTRO_COMPUTE_CORE_UNLOCK_CAPACITY = INTRO_CAPACITY_CAP_BITS / INTRO_CAPACITY_DOUBLING_STEP
// How many Compute Cores the separate, unrelated lifetime-counter latch
// (computeCoresEverEarned/computeMergePageUnlocked — see latchComputeMergePageIfNeeded in
// engine.js) uses as its own threshold — NOT the Core -> Node merge boundary itself, which reuses
// the same ratio via COMPUTE_MERGE_RATIO below instead (see issue #321). Both intro.computeCores
// and intro.computeNodes are permanent counters, carried over every real
// Prestige exactly like the Byte generator/Disks themselves — see prestigeGame.
export const COMPUTE_CORES_PER_NODE = 8
// Maximum permanent balance of ANY compute-ladder entity a player can hold at once — Core, Node,
// Cluster, Network, Grid, Fabric, Cloud, Datacenter, Supercomputer, Megacomputer alike. Once an
// entity is at this cap, further production into it pauses entirely (see every mergeCompute*Into*/
// the reserve-timer system below) rather than overflowing past it or silently discarding progress —
// the input entity itself (for every manual merge) simply stays put, waiting for the player to
// spend the capped entity down via a future spending mechanic, the same "waits, doesn't lose
// progress" posture Disks already have when nothing can consume them yet.
export const COMPUTE_ENTITY_CAP = 10
// 8 of one compute-ladder entity merges into 1 of the next tier up — the full ten-tier progression
// is Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter → Supercomputer →
// Megacomputer, ALL nine boundaries (Core → Node included, as an ordinary boundary of its own —
// see issue #321) merged the same way: see mergeComputeCoresIntoNode/mergeComputeNodesIntoCluster/
// mergeComputeClustersIntoNetwork/mergeComputeNetworksIntoGrid/mergeComputeGridsIntoFabric/
// mergeComputeFabricsIntoCloud/mergeComputeCloudsIntoDatacenter/mergeComputeDatacentersIntoSupercomputer/
// mergeComputeSupercomputersIntoMegacomputer in engine.js — each player-triggered (a button click),
// never automatic on tick UNLESS that boundary's auto-merge has been unlocked (below). Nothing
// spends a Megacomputer yet — it's the top of the chain today (see issue #280's "Out of scope").
// Each of the 9 manual merges above can also be permanently automated (see issues #316/#321,
// enableAutoMergeCoresIntoNode/enableAutoMergeNodesIntoCluster etc. in engine.js) by sacrificing
// ALL COMPUTE_ENTITY_CAP (10) currently-held units of that merge's own output entity — once
// unlocked, that boundary's merging (both manual and automatic) fully transitions to a timed
// RESERVE-POOL system instead of firing instantly (see COMPUTE_MERGE_RESERVE_CAP /
// getComputeMergeDurationSeconds below).
export const COMPUTE_MERGE_RATIO = 8

// --- Byte Foundry Compute reserve-merge timers --- see issue #321 / #377. Every one of the 9 tier
// boundaries (Core→Node through Supercomputer→Megacomputer) now merges through a timed RESERVE
// pool once that boundary's auto-merge is unlocked (see intro.autoMergeCoresIntoNode/
// autoMergeNodesIntoCluster/… below) — a same-sized second pool of COMPUTE_MERGE_RESERVE_CAP (8,
// same value as COMPUTE_MERGE_RATIO — a merge always consumes exactly one full group) slots
// alongside the entity's own COMPUTE_ENTITY_CAP (10) normal slots, "18 slots" total. The reserve
// only ever holds tokens already committed to an in-progress merge — filling it (always in one
// instant, all-8-at-once move, never gradually) and starting its timer are the same action,
// whether triggered automatically (input entity completely full, 10 held) or manually (player
// click, needs only COMPUTE_MERGE_RATIO, 8, held — see startComputeCoresMerge/
// startComputeNodesMerge/… in engine.js). At most one merge is ever in flight per boundary at a
// time — the reserve is binary in practice (0 or a full COMPUTE_MERGE_RESERVE_CAP), tracked by a
// single countdown field (e.g. intro.computeCoresMergeRemainingSeconds) rather than a separate
// fill-count, since nothing else can partially fill it. Before a boundary's auto-merge is
// unlocked, merging that tier is still the old-style instant, untimed action (see
// mergeComputeCoresIntoNode/mergeComputeNodesIntoCluster/… — each becomes a same-reference no-op
// once its own auto-merge flag flips true, since merging fully transitions to the timed reserve
// system from then on).
export const COMPUTE_MERGE_RESERVE_CAP = 8
// Timed reserve-merge durations are NOT a fixed second table — they derive from live Core earn
// time (Memory capacity ÷ Byte generator bits/sec, before Compute Boost). Core→Node starts at
// COMPUTE_MERGE_CORE_EARN_MULTIPLIER × that earn time; each next boundary multiplies the previous
// duration by COMPUTE_MERGE_STEP_MULTIPLIER (10), or COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED (5)
// once that boundary’s sequential duration upgrade is claimed. See getComputeMergeDurationSeconds.
export const COMPUTE_MERGE_CORE_EARN_MULTIPLIER = 10
export const COMPUTE_MERGE_STEP_MULTIPLIER = 10
export const COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED = 5
// Nine boundaries (Core→Node … Supercomputer→Megacomputer); one sequential upgrade each.
export const COMPUTE_MERGE_DURATION_UPGRADE_COUNT = 9
// Metadata per merge boundary (lowest first) for duration lookup / upgrades — sacrifice
// COMPUTE_ENTITY_CAP of `inputField` once that boundary’s auto-merge is unlocked.
export const COMPUTE_MERGE_BOUNDARIES = [
  { inputField: 'computeCores', outputField: 'computeNodes', autoFlagField: 'autoMergeCoresIntoNode', timerField: 'computeCoresMergeRemainingSeconds', label: 'Cores→Nodes' },
  { inputField: 'computeNodes', outputField: 'computeClusters', autoFlagField: 'autoMergeNodesIntoCluster', timerField: 'computeNodesMergeRemainingSeconds', label: 'Nodes→Clusters' },
  { inputField: 'computeClusters', outputField: 'computeNetworks', autoFlagField: 'autoMergeClustersIntoNetwork', timerField: 'computeClustersMergeRemainingSeconds', label: 'Clusters→Networks' },
  { inputField: 'computeNetworks', outputField: 'computeGrids', autoFlagField: 'autoMergeNetworksIntoGrid', timerField: 'computeNetworksMergeRemainingSeconds', label: 'Networks→Grids' },
  { inputField: 'computeGrids', outputField: 'computeFabrics', autoFlagField: 'autoMergeGridsIntoFabric', timerField: 'computeGridsMergeRemainingSeconds', label: 'Grids→Fabrics' },
  { inputField: 'computeFabrics', outputField: 'computeClouds', autoFlagField: 'autoMergeFabricsIntoCloud', timerField: 'computeFabricsMergeRemainingSeconds', label: 'Fabrics→Clouds' },
  { inputField: 'computeClouds', outputField: 'computeDatacenters', autoFlagField: 'autoMergeCloudsIntoDatacenter', timerField: 'computeCloudsMergeRemainingSeconds', label: 'Clouds→Datacenters' },
  { inputField: 'computeDatacenters', outputField: 'computeSupercomputers', autoFlagField: 'autoMergeDatacentersIntoSupercomputer', timerField: 'computeDatacentersMergeRemainingSeconds', label: 'Datacenters→Supercomputers' },
  { inputField: 'computeSupercomputers', outputField: 'computeMegacomputers', autoFlagField: 'autoMergeSupercomputersIntoMegacomputer', timerField: 'computeSupercomputersMergeRemainingSeconds', label: 'Supercomputers→Megacomputers' },
]

// --- Byte Foundry Compute Boost --- see getComputeBoostMultiplier/activateComputeBoost/
// tickComputeBoost in engine.js and intro.computeBoostType/computeBoostTierIndex/computeBoostStacks/
// computeBoostRemainingSeconds in createInitialGameState. Activating a boost now spends exactly 1
// token of whichever compute-ladder tier the player selects (see issue #326) — Core through
// Megacomputer — rather than always a Compute Core: the values below are the BASE (tier 1 = Core)
// preset strength/duration; multiplier scales via COMPUTE_BOOST_TIER_POWER_STEP and duration via
// COMPUTE_BOOST_TIER_DURATION_STEP below (duration doubles each merge tier — restored after #363
// had flattened it; see docs/DESIGN_HISTORY.md).
// Grants a temporary production-speed multiplier applied to Memory's own passive production (Byte
// Foundry) and tier01's/Kilobytes' production (the main game) simultaneously — "the base
// production tier of each screen." Keyed by preset name; `multiplier` compounds nothing else in
// (applied as a flat extra factor), `durationSeconds` is how long one activation lasts before
// decaying back to inactive (see tickComputeBoost).
// Total extra production (multiplier - 1) × durationSeconds increases Burst → Standard → Sustain
// by design (190 / 240 / 600 at tier 1) — the earlier 32×/60s, 8×/600s, 2×/3600s values violated
// this (70 for Standard vs. only 60 for Sustain, i.e. Sustain gave LESS extra output than
// Standard despite its longer commitment); see docs/DESIGN_HISTORY.md.
export const COMPUTE_BOOST_PRESETS = {
  burst: { multiplier: 20, durationSeconds: 600 },
  standard: { multiplier: 5, durationSeconds: 3600 },
  sustain: { multiplier: 2, durationSeconds: 36000 },
}
// Issue #326 / #363: each compute-ladder tier past the first multiplies a preset's own BASE
// `multiplier` (above, tier 1 = Core) by this much per tier step — e.g. tier 5 (Grid) is
// COMPUTE_BOOST_TIER_POWER_STEP^4 as powerful as tier 1's own base multiplier.
export const COMPUTE_BOOST_TIER_POWER_STEP = 4
// Duration scales independently: each tier past Core multiplies the preset's base durationSeconds
// by this step (×2 per tier — "effect time doubles after merge"). Tier N lasts
// `durationSeconds * COMPUTE_BOOST_TIER_DURATION_STEP^(N-1)`.
export const COMPUTE_BOOST_TIER_DURATION_STEP = 2
// Plural labels for COMPUTE_BOOST_TIER_FIELDS (same order), for Foundry Bandwidth-via-compute copy.
export const COMPUTE_TIER_LABELS = [
  'Cores', 'Nodes', 'Clusters', 'Networks', 'Grids',
  'Fabrics', 'Clouds', 'Datacenters', 'Supercomputers', 'Megacomputers',
]
// One entry per compute-ladder entity a Compute Boost can be funded from, lowest tier first (index
// 0 = Core / tier 1, … index 9 = Megacomputer / tier 10) — the intro state field a Boost
// activation/stack at that tier spends, and reclaimComputeBoost refunds into. The only place
// Megacomputers (otherwise the unspent top of the merge chain — see issue #280's "Out of scope")
// have any use at all.
export const COMPUTE_BOOST_TIER_FIELDS = [
  'computeCores', 'computeNodes', 'computeClusters', 'computeNetworks', 'computeGrids',
  'computeFabrics', 'computeClouds', 'computeDatacenters', 'computeSupercomputers', 'computeMegacomputers',
]
// Only one PRESET TYPE (and tier) can be active at a time — activating a NEW boost is blocked
// entirely while one is already running (see activateComputeBoost); a separate stackComputeBoost
// action extends the CURRENTLY ACTIVE boost's own tier/type instead, up to this many times, adding
// that tier's own duration each time rather than resetting it — the multiplier itself never
// compounds from stacking.
export const COMPUTE_BOOST_MAX_STACKS = 10

// --- Data Lakes (Foundry Storage ↔ Booster funding) --- see depositDiskToDataLake/
// startBoosterTransfer in engine.js. Each of the 10 storage denominations (KB … QB) has a Data
// Lake that can hold up to getDataLakeCapacity() units of PREPAID deposits, filled automatically
// (`tickDiskAutoDeposit`, no manual action) by depositing built Disks (up to DISK_ARRAY_LADDER_CAP
// (10) each of that tier's ×1/×10/×100 denominations — 10 each, 1110 total) — a convenience
// stockpile, not the lake's only source of Boosters (see "Data Lake Booster transfers" below).
// Starting a Booster at tier N spends units genuinely OUT of lake N's own current deposits FIRST
// (not against a separate ledger, real capacity that only returns once more Disks get deposited),
// then sources any remaining cost live from the raw built Disk inventory via a timed transfer. The
// nth Booster ever started (completed or still in flight) at a tier costs n units — see
// getBoosterPurchaseCost in engine.js, which now also counts in-flight transfers so starting
// several concurrently (see DATA_LAKE_TRANSFER_CAPACITY_MAX below) still charges the correct
// escalating cost rather than letting concurrency dodge it.
//
// Each sub-slot's own PHYSICAL ceiling is DISK_ARRAY_LADDER_CAP — a lake can never be asked to hold
// more of a denomination than a single array of that size could ever physically produce. On top of
// that physical ceiling, a lake's own actual capacity is a smaller, purchasable ladder (see
// getDataLakeCapacity/doubleDataLakeCapacity in engine.js): starting at 1 unit (level 0, "1 KB" for
// the KB lake), doubling per purchase EXCEPT once — level 6→7 (64→125, not 128) — an SI switchover
// unique to this ladder (unlike pool Capacity, which reverted to plain binary doubling — see
// docs/DESIGN_HISTORY.md — since its own value also drives the Data Stream tile's binary display;
// a lake's capacity is never shown via any binary unit, so this switchover has no such conflict
// here), so this ladder lands on a clean SI 1,000 units at its DATA_LAKE_CAPACITY_MAX_LEVEL
// (level 10) hard cap, not a binary 1,024. Values are read from DATA_LAKE_CAPACITY_BY_LEVEL
// directly (an explicit, already-integer level index, so this needs no float-precision handling).
// An earlier version instead made the cap fixed at the physical ceiling with no purchasable lever
// at all — see docs/DESIGN_HISTORY.md for why a smaller, doublable, explicitly-capped ladder
// replaced that, and for the SI-switchover correction.
export const DATA_LAKE_TIER_COUNT = 10
export const DATA_LAKE_SUB_SIZES = [1, 10, 100]
export const DATA_LAKE_TIER_LABELS = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'RB', 'QB']
export const DATA_LAKE_MAX_DISK_LADDER_STEP = DATA_LAKE_TIER_COUNT * DATA_LAKE_SUB_SIZES.length
export const DATA_LAKE_CAPACITY_MAX_LEVEL = 10
// Index i = capacity at capacityLevel i. Plain doubling (1, 2, 4, 8, 16, 32, 64) except the level
// 6->7 step, which goes to 125 instead of 128 — see the comment above.
export const DATA_LAKE_CAPACITY_BY_LEVEL = [1, 2, 4, 8, 16, 32, 64, 125, 250, 500, 1000]

// --- Data Lake Booster transfers --- see getBoosterTransferPlan/startBoosterTransfer/
// tickDataLakeTransfers in engine.js. A lake's own deposited stock (above) is spent FIRST and
// instantly when a Booster is started — it's already "at the lake." Any cost still remaining
// beyond what's deposited is instead sourced live from built, undeposited Disks and transferred
// into the lake over time, at DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER (10x) the Byte Foundry's
// current bits/sec production rate (getIntroProductionRate) — (bits transferred) / (10 x rate)
// seconds — only converting into 1 Booster once that transfer completes. The Data Lake itself
// never banks a second spendable reserve beyond what's already deposited; past that, it's a
// throughput pipe onto the live disk inventory, not a stockpile. A lake can run up to
// DATA_LAKE_TRANSFER_CAPACITY_MAX (3) of these live transfers at once, one concurrency slot
// unlocked per completed sub-size disk array (×1/×10/×100 — the same staged gate the deposited-
// capacity progression above already uses).
export const DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER = 10
export const DATA_LAKE_TRANSFER_CAPACITY_MAX = DATA_LAKE_SUB_SIZES.length

// Progress accrued while the game wasn't open (see engine.js's applyOfflineProgress) is
// simulated at 50% of normal speed, for the entire game (main game tiers and the Byte Foundry
// alike — tickGame unconditionally drives both, see applyOfflineProgress) — a courtesy for short
// absences, not a way to make the autobuyer loop outrun active play. This multiplier only kicks in
// once the absence exceeds OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS below — a shorter absence
// is simulated at 100% speed instead, as if the screen had been on the whole time.
export const OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.5
// Real-world elapsed time at or below this threshold is simulated at 100% speed (no reduction)
// and never surfaces the offline-progress notice — short enough that the player wouldn't notice
// the absence anyway. Only once elapsed time exceeds this does OFFLINE_PROGRESS_SPEED_MULTIPLIER
// apply (to the entire elapsed duration, not just the portion past the threshold) and the notice
// appear. See getOfflineEffectiveSeconds in engine.js.
export const OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS = 10 * 60
// Real-world elapsed time is capped at 24 hours before the speed multiplier is applied, so a
// very long absence can't turn into an unbounded simulation loop on load.
export const MAX_OFFLINE_SECONDS = 24 * 60 * 60

// Supporter Prestige museum (meta QoL — no economy effect). Every prestige appends one history
// entry; pinned entries are a player-curated subset. Caps keep localStorage bounded.
export const MUSEUM_HISTORY_CAP = 20
export const MUSEUM_PIN_CAP = 10
// Ops dashboard in-session sparkline sample cap (hook-owned ring buffer, not persisted).
export const OPS_SAMPLE_CAP = 60
export const OPS_SAMPLE_INTERVAL_MS = 2000

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
// Clock Speed (the global tickspeed multiplier — see engine.js's
// getGlobalTickspeedProductionMultiplier/buyGlobalTickspeedMultiplier) speeds up *every* tier's
// production at once — unlike the per-tier tickspeed multiplier, this is a single global upgrade
// track (mirroring Auto-Prestige's null/level pattern), not something bought separately per tier.
// Funded from the Bytes pool (see BYTES_ID), not Bits. Every level compounds this rate
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
// Per-level growth factor for Overclock's own reward — see engine.js's
// getOverclockMultiplier/getGlobalTickspeedProductionMultiplier/overclockGame — a second, steeper
// Speed-Up-style soft reset. Each claimed Overclock level multiplies BOTH the (Money-funded) global
// tickspeed multiplier's regular and milestone per-level steps by a further (1 +
// OVERCLOCK_MULTIPLIER_STEP) factor (×1.1 per level) — folded directly into that existing track's
// own step rather than a separate multiplier stacked alongside it (see docs/DESIGN_HISTORY.md for
// the history of this mechanic moving between a standalone factor and a folded-in step). A direct
// consequence: Overclock has no effect at all while the global tickspeed multiplier is still at
// level 0/not yet bought, same as before Overclock existed. state.overclockCount is never reset by
// an ordinary Speed Up, unlike globalTickspeedMultiplier itself — see speedUpGame.
export const OVERCLOCK_MULTIPLIER_STEP = 0.1
// The per-cycle escalation step for how many more levels the last tier must reach before the next
// Overclock level can be claimed (see engine.js's getOverclockRequirement, which also adds a fixed
// +2 floor on top so a completely untouched last tier — starting at level 1 by default — can never
// make the first claim of a cycle free) — the same +1-per-cycle shape Speed Up's own requirement
// uses (see getSpeedUpRequirement), just without its display offset. There's no artificial ladder
// beyond that floor; the last tier's already-steep cost curve is what makes reaching each
// successive level meaningfully harder. A claim jumps straight to the last tier's current level
// (see overclockGame), so falling behind never requires claiming every intermediate level one at a
// time.
export const OVERCLOCK_REQUIREMENT_STEP = 1
// One-time PP cost to permanently automate Speed Up (see engine.js's buyAutoSpeedUp) — once
// bought, tickGame triggers speedUpGame automatically the instant it's eligible, with no manual
// click needed. Cheaper than PRESTIGE_SPEED_BONUS_UNLOCK_COST/AUTO_PRESTIGE_COST since Speed Up
// itself fires far more often than either of those two over a run — but pricier than
// TICKSPEED_AUTOBUYER_COST below, since the global tickspeed multiplier it automates is a much
// smaller, earlier-game upgrade than Speed Up.
export const AUTO_SPEED_UP_COST = 20
// One-time PP cost to permanently unlock Compute auto-Boost (see engine.js's
// buyComputeAutoBoost / tickAutoComputeBoost): while a reserve merge is in flight and any
// compute-ladder tier is at COMPUTE_ENTITY_CAP, automatically activate (or stack) the player's
// preferred Boost preset (default Standard). Priced just above AUTO_SPEED_UP_COST — a mid-early
// automation that only matters once Compute merges are timed — and well below AUTO_PRESTIGE_COST.
export const COMPUTE_AUTO_BOOST_UNLOCK_COST = 30
// One-time PP cost to automate the (Money-funded) global tickspeed multiplier — once bought,
// tickGame calls buyGlobalTickspeedMultiplier automatically every tick, re-validating its own
// eligibility internally (see engine.js's buyTickspeedAutobuyer/tickGame). The cheapest of all
// four global PP automation unlocks (see PRESTIGE_SPEED_BONUS_UNLOCK_COST/AUTO_SPEED_UP_COST
// above and AUTO_PRESTIGE_COST below), since the global tickspeed multiplier it automates is a
// much smaller, earlier-game upgrade (unlocked as soon as the second tier is owned) than any of
// the actions those other three automate.
export const TICKSPEED_AUTOBUYER_COST = 10
// One-time PP cost to permanently automate RE-LEVELING Auto-Prestige itself (see engine.js's
// buyAutoPrestigeAutobuyer) — once bought, tickGame calls buyAutoPrestige automatically every
// tick once affordable, so a level-up beyond the first no longer needs a manual click. This is a
// "meta-automation" (it automates re-buying an already-PP-funded track, not a Money-funded one
// like the other two autobuyer toggles above), and only ever does anything once Auto-Prestige has
// already been activated once — so it's priced below AUTO_PRESTIGE_COST's own initial-activation
// cost (the clicks it saves are already rare, since each Auto-Prestige level doubles in cost) but
// well above the two cheaper Money-funded autobuyer toggles above, since this row is gated behind
// allTiersFullyAutomated — a genuinely late-game convenience, not an early one.
export const AUTO_PRESTIGE_AUTOBUYER_COST = 100
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

// --- PP Compute (Flops) screen — see docs/ECONOMY_REFERENCE.md "PP Compute (Flops)" ---
// Revealed once spendable PP balance first reaches COMPUTE_FLOPS_REVEAL_PP; first tier costs
// COMPUTE_FLOPS_FIRST_TIER_COST_PP so the screen is visible but unusable until then.
export const COMPUTE_FLOPS_REVEAL_PP = 100
export const COMPUTE_FLOPS_FIRST_TIER_COST_PP = 1E3
export const COMPUTE_FLOPS_LAST_TIER_COST_PP = 1E30
// Each owned unit of a Flops tier adds this fraction per real second to that tier's cumulative
// boost on the matching main-game tier (0.01% = 0.0001). Production uses (1 + cumulativeBoost).
// The hero total E = k + 10M + 100G + … + 10^9Q weights each tier's cumulativeBoost by 10^index.
export const COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC = 0.0001
// Ten Flops tiers (KFlops → QFlops), 1:1 with main-game tiers. Each tier's base PP cost matches
// TIER_DEFINITIONS' baseCost ladder (1000 PP … 10^30 PP); per-unit price then scales on every
// purchase via the same linear-increment 10-power epoch as Factory tiers (getCostEpochExponent),
// not Factory's 8-purchase level blocks.
export const COMPUTE_FLOPS_TIER_DEFINITIONS = [
  { id: 'flop01', name: 'KFlops', symbol: 'KF', baseCostPP: 1E3,  boostsTierId: 'tier01' },
  { id: 'flop02', name: 'MFlops', symbol: 'MF', baseCostPP: 1E6,  boostsTierId: 'tier02' },
  { id: 'flop03', name: 'GFlops', symbol: 'GF', baseCostPP: 1E9,  boostsTierId: 'tier03' },
  { id: 'flop04', name: 'TFlops', symbol: 'TF', baseCostPP: 1E12, boostsTierId: 'tier04' },
  { id: 'flop05', name: 'PFlops', symbol: 'PF', baseCostPP: 1E15, boostsTierId: 'tier05' },
  { id: 'flop06', name: 'EFlops', symbol: 'EF', baseCostPP: 1E18, boostsTierId: 'tier06' },
  { id: 'flop07', name: 'ZFlops', symbol: 'ZF', baseCostPP: 1E21, boostsTierId: 'tier07' },
  { id: 'flop08', name: 'YFlops', symbol: 'YF', baseCostPP: 1E24, boostsTierId: 'tier08' },
  { id: 'flop09', name: 'RFlops', symbol: 'RF', baseCostPP: 1E27, boostsTierId: 'tier09' },
  { id: 'flop10', name: 'QFlops', symbol: 'QF', baseCostPP: 1E30, boostsTierId: 'tier10' },
]
export const COMPUTE_FLOPS_TIER_BY_ID = Object.assign(Object.create(null), Object.fromEntries(
  COMPUTE_FLOPS_TIER_DEFINITIONS.map(t => [t.id, t])
))
export const COMPUTE_FLOPS_TIER_INDEX_BY_ID = Object.assign(Object.create(null), Object.fromEntries(
  COMPUTE_FLOPS_TIER_DEFINITIONS.map((t, index) => [t.id, index])
))

// --- Era / Eons meta layer (#407) — see docs/ECONOMY_REFERENCE.md "Era ascension" ---
// Era ascension requires this many unspent Prestige Points (1 Googol PP).
export const ERA_ELIGIBILITY_PP = GOOGOL
// Flops autobuyer milestone: Era N unlocks the Nth Flops tier's autobuyer (KFlops at Era 1, …).
export const FLOPS_AUTOBUYER_ERA_START = 1
export const FLOPS_AUTOBUYER_ERA_STEP = 1
// Hyperscaler generator costs in Eons: 1, 10, 100, … (×10 per purchase).
export const HYPERSCALER_EON_COST_BASE = 1
export const HYPERSCALER_EON_COST_MULTIPLIER = 10
// Each Hyperscaler Efficiency level adds this much extra rate per hyperscaler (+0.001%/s at 0.00001).
export const HYPERSCALER_EFFICIENCY_RATE_BONUS_PER_LEVEL = 0.00001
// Each Eon Amplifier level adds this many extra Eons awarded per Era ascension.
export const EON_AMPLIFIER_AWARD_PER_LEVEL = 1
