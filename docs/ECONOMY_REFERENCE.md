# Economy model reference

Referenced from `CLAUDE.md`'s Economy model section. Read this before touching
`src/game/engine.js`, `src/game/layers.js`, `TIER_DEFINITIONS`, or any economy/prestige/tickspeed
constant or formula — it's the full mechanic reference (cost/production formulas, the purchase
block size and level system, Prestige Points, the per-tier and global tickspeed multipliers, the
last tier's XP-funded tickspeed, Speed Up, Overclock, Reset, the complete game state shape, and the
engine function/constants tables).


There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Kilobytes` through `Quettabytes` (a byte-scale/computing theme — `Kilobytes`,
`Megabytes`, `Gigabytes`, `Terabytes`, `Petabytes`, `Exabytes`, `Zettabytes`, `Yottabytes`,
`Ronnabytes`, `Quettabytes`). `id` is a naming-agnostic key, fully decoupled from `name`/`symbol` — a
future re-theme only needs to touch `name`/`symbol`, never state keys, tests, or save data. **Bytes
are not a tier here at all** — they're produced entirely within the separate Byte Foundry pre-game
screen (see "Byte Foundry" below), which is what now hands a fresh save its first Kilobytes.
**Every tier is bought directly with the base currency, displayed as "Bits"** — `costResourceId` is
`MONEY_ID` (`'base'`) for all of them. Once owned, a tier produces the tier immediately below it
(`producesResourceId`), cascading production down the ladder. `tier01` (`Kilobytes`) costs Bits
but produces Factory Bytes (`BYTES_ID = 'bytes'`, symbol `B`) for Clock Speed funding, and
`tickGame` mirrors each Byte produced into Bits at `production × BITS_PER_BYTE` so MoneyHero,
Prestige, and tier Buys (still Bits-denominated) keep advancing. Higher tiers still produce the
tier below into both `resources` and `owned`.

Each tier's `baseCost` is a fixed PER-UNIT price, independent of block size: `1000^n` for `tier0n`
(one exponent higher than the tier's own 1-indexed position, since Bytes' old `1000^0 = 1` slot was
pulled out of this ladder) — `1E3` for `tier01` (Kilobytes), `1E6` for `tier02` (Megabytes), up through
`1E30` for `tier10` (Quettabytes). A clean ×1000 jump between every consecutive tier.

`baseCost` (and the epoch-scaled cost at higher levels, see `getTierCost`) is what a single purchase
costs — it does not depend on `blockSize` at all. A level's TOTAL cost (every purchase within it,
summed) is that fixed per-unit price times the CURRENT block size (`getTierQuantityCost`, see the
function table below) — so completing a level costs more once `blockSize` has grown (see "The
(configurable) purchase block size" below), even though the per-unit price itself never changes. At
the default block size (8), a tier's level-1 total is 8× its `baseCost` (8,000 for tier01/Kilobytes,
8,000,000 for tier02/Megabytes, … 8×10³⁰ for tier10/Quettabytes).

A tier unlocks once the tier below it has **fully purchased two levels** — `purchaseLevels[prevTierId]
>= 3` (level 1 completing advances it to 2, level 2 completing advances it to 3 — see `isTierUnlocked`).
Expressed as a level target rather than an owned-count threshold so it stays exact even if the
(state-global) purchase block size grows between the two levels' completions. Already-owned tiers
stay unlocked even if the rule changes later, so old saves stay playable. Beyond that live check,
`state.everUnlockedTierIds[tierId]` latches a tier's unlocked status the moment it's first reached (see
`latchEverUnlockedTiers`, called from `buyTier` and `tickGame`) so a narrower reset than a full
Prestige/Speed Up can't hide/relock it — specifically, this is what keeps `consumeXpForLastTierTickspeed`'s
owned-quantity reset (see "The last tier's XP-funded tickspeed" below) from relocking every tier it
resets. This flag is **not** permanent across a real Prestige or Speed Up, though — both still reset it
to the fresh default (only the first tier true) exactly like `owned`/`purchased`, so those two resets
keep relocking every tier beyond the first exactly as they always have; only `consumeXpForLastTierTickspeed`'s
narrower reset is guarded against relocking.

### The (configurable) purchase block size and tier levels

A tier's **level** (1-indexed, `state.purchaseLevels[tierId]`) is what drives its cost (`getTierCost`)
and its purchase-milestone production doubling (`getPurchaseMilestoneMultiplier`) — completing a
level means buying `getPurchaseBlockSize(state)` pieces of it, tracked directly alongside it in
`state.purchaseLevelProgress[tierId]` (0 up to, but not including, the current block size). Both
fields are incremented purchase-by-purchase in `buyTier`, **not** derived by dividing the tier's
lifetime `purchased` count by a fixed block size — the block size itself isn't fixed (see below), so
there's no single divisor that could reconstruct a level from a purchased count after the fact. This
supersedes an earlier design (`getTierLevel(purchased)`) that did derive level via division against a
hardcoded `PURCHASE_BLOCK_SIZE = 8` constant — see `docs/DESIGN_HISTORY.md`. `purchased` itself is
unaffected by this — it's still incremented on every purchase and still shown in the tier row's
Details disclosure as a lifetime-purchases figure, it just no longer drives cost/production scaling.

`getPurchaseBlockSize(state)` (`engine.js`) is the single global block size every tier's current level
requires — not a hardcoded constant, so it can grow over the course of a run instead of staying fixed
forever. It starts at `DEFAULT_PURCHASE_BLOCK_SIZE` (`layers.js`, `8`) and grows by
`PURCHASE_BLOCK_SIZE_GROWTH_STEP` (`1`) every `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS` (`100`)
levels the **last tier** (not any other tier, and not a global total) completes — the same
"flagship" progress marker `getSpeedUpRequirement`/`isLastTierTickspeedXpUnlocked` already key off.
Because every earlier tier must already be unlocked (and
hence permanently latched via `everUnlockedTierIds`) by the time the last tier is reachable at all, a
later block-size increase never retroactively changes an already-unlocked tier's own unlock
threshold — it only affects whatever level a tier currently happens to be working toward. Both
`purchaseLevels` and `purchaseLevelProgress` reset to their fresh defaults (level 1, progress 0) for
every tier on Prestige and Speed Up, same as `owned`/`purchased` — which also resets
`getPurchaseBlockSize` back down to `DEFAULT_PURCHASE_BLOCK_SIZE`, since it's derived from the last
tier's own (now-reset) level.

`getTierBulkQuantity`/`getTierQuantityCost`/`getTierAffordableQuantity` all take a tier's level,
the current block size, and its level progress as explicit parameters (rather than a tier and a
purchased count) — see the function table below. `getPurchaseMilestoneMultiplier` takes a level
directly too. The "every 10th level is a bigger 10x milestone instead of 2x" mega-cadence in
`getPurchaseMilestoneMultiplier` is **independent** of the block size — it always spans 10 levels,
regardless of how many purchases make up any one of them.

`getSpeedUpRequirement(speedUpCount)` — how many levels the last tier must reach for the *next* Speed
Up — is likewise expressed as a level target (`speedUpCount + 6`: level 6/displayed 5 for the first
activation, level 7/displayed 6 for the second, …) rather than a lifetime-purchased-count threshold, since how many purchases
a given level boundary corresponds to now depends on the current block size, while the level number
itself doesn't.

Saves must already carry `purchaseLevels`/`purchaseLevelProgress` in the current schema —
`storage.js`'s `mergeState` only fills missing fields from fresh defaults and does not derive levels
from legacy `purchased` counts.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js` — needs a naming-agnostic `id` (next in the
`tier0N`/`tierNN` sequence), `name`, `symbol`, `baseCost`, `costResourceId: MONEY_ID`,
`producesResourceId` set to the previous tier's `id`, and `baseTickSpeedSeconds` set to the next integer
in the sequence (`tierIndex + 1` seconds — a hypothetical 11th tier would be `11`, since tier01 itself
is `1`; see "Tier production tickspeed" below). No other file should need changing.

### Byte Foundry

The tap-to-earn screen (`ByteFoundryPage`) every fresh save — and every real Prestige cycle after
that — must pass through before the main game (`tier01`/Kilobytes onward) is reachable. State lives
in `state.intro` (see "Game state shape" below); constants live in `layers.js`'s `INTRO_*` block
(see "Constants" below). Its bit balance ("Memory")/capacity/tickspeed/production multiplier are an
entirely separate currency pool from Money (`resources.base`) until the manual/auto conversions into
`owned` Kilobytes described below — nothing here touches the main game's economy directly.

**Two halves, permanence-wise (see step 7 and `prestigeGame`'s table row below):** "Memory"
(`bits`/`productionAccumulator`) and the main-game-unlock gate (`mainGameUnlocked`) reset to fresh
every real Prestige — along with tier01's own `purchaseLevels`/`purchaseLevelProgress`, reset like
every other tier's own purchase progress (see `prestigeGame`'s table row below); since the
transfer-block row in step 7 is just a live mirror of that value, it effectively starts over each
cycle too, purely as a side effect of that general reset rather than any transfer-specific field of
its own. The Byte generator itself and every upgrade to it —
`byteCreated`/`capacity`/`tickSpeedSeconds`/`productionMultiplier`/`productionMilestoneTier`/
`productionMilestoneTierClaims` — plus **Disks** (`disks`/`disksBuiltTotal`/`diskCache`/`diskBuild`,
see step 8 below) and **Compute Cores/Nodes** (`computeCores`/`computeNodes`, see step 9 below) are
**permanent**, carried over unchanged exactly like an unlocked autobuyer. So the
very first cycle plays out the full loop below from scratch; every cycle after that reopens the gate
with whatever capacity/speed/rate/banked Storage was already built, refilling Memory far faster than
the first time.

Nothing here ever fully "freezes" — there is no `completed`-style flag, and no cap either.
Tap/Combine/Sacrifice/Invest/Convert all stay live indefinitely, every cycle.

**The loop:**
1. **Tap** (`tapIntroBit`) adds `getIntroProductionRate(intro)` bits — "one second's worth" at the
   Byte's *current* rate, not a flat 1 — to `state.intro.bits` ("Memory"), capped at
   `state.intro.capacity` (`INTRO_STARTING_CAPACITY`, 8 bits = 1 Byte, initially). Before the Byte
   exists (or at the starting rate) this is still the same flat 1 bit it's always been, since the
   starting rate is exactly 1 bit/sec. The tap TARGET changes once `intro.mainGameUnlocked`: the
   standalone Tap button (`ByteFoundryPage`'s `TapArea`) is removed entirely, and Memory's own tile
   (`FillableStatCard`, rendered `as="button"` in that state) becomes clickable instead, calling the
   identical `tapIntroBit` action — one control instead of two, once the main loop no longer needs
   tapping to be the primary action.
2. Once `bits` reaches `INTRO_BYTE_COMBINE_COST` (8) and `byteCreated` is still false, **Combine into a
   Byte** (`combineIntroByte`) is a one-time action: consumes those 8 bits and sets
   `byteCreated: true`, creating the single persistent Byte generator (a flag, not a counter — there
   is only ever one, and it's permanent — see above).
3. Once `byteCreated`, the Byte passively produces bits (`tickIntroProduction`, called from `tickGame`
   before anything else): one batch of `INTRO_BYTE_BASE_RATE * productionMultiplier` bits delivered
   every `tickSpeedSeconds` of real elapsed time — the exact same "accumulate elapsed time, deliver a
   whole batch once a full period has passed, bank the remainder" model `TIER_DEFINITIONS`' own
   per-tier production uses (see "Tier production tickspeed" below), just against the intro's own
   `tickSpeedSeconds`/`productionMultiplier` instead of a tier's. `tickSpeedSeconds` starts at
   `INTRO_STARTING_TICK_SPEED_SECONDS` (1 second), so at the starting values this is exactly 1
   bit/sec. Bits are capped at `capacity`; any batch amount a capacity cap actually clips is not
   banked forward, same rule tapping follows.
4. Whenever Memory is **full** (`bits === capacity`) **and** no other currently-possible action is
   left to take first, **Sacrifice for 2x Capacity** (`pickIntroCapacityMilestone`) becomes
   available: it drains the ENTIRE balance to 0 and multiplies `capacity` by
   `INTRO_CAPACITY_DOUBLING_STEP` (2) — 1 Byte → 2 Bytes → 4 Bytes → 8 Bytes → …, hard-capped at
   `INTRO_CAPACITY_CAP_BITS` (exactly 1 MiB / 8,388,608 bits for this generator — large enough to
   cover `getDiskCost` for pool 1's own largest, 100 KB, buildable Disk) — once at the cap, Sacrifice is permanently unavailable
   (`isMemoryCapacityAtCap`, checked before the rest of the priority chain). Capacity/balance are
   displayed in **binary units** (`B`/`KiB`/`MiB`/…, step 1024 via `MEMORY_BINARY_UNIT_STEP` —
   `getMemoryUnit`/`formatBitsInNearestUnit`), distinct from Disks/Data Lake/caches, which stay SI
   (step 1000, unchanged — see "Byte-denominated display units" further down).
   Repeatable at every tier reached below the cap; doesn't touch `tickSpeedSeconds`/`productionMultiplier`.
   `isMemoryCapacityUpgradeAvailable(state)` is the real gate (enforced inside
   `pickIntroCapacityMilestone` itself, not just a disabled UI button — same "engine re-validates"
   posture every other action in this game has): besides being full and below the cap, it also
   requires that Combine into a Byte (`!byteCreated`, affordable), a currently-redeemable Disk Fill
   (any built disk both FULL and redeemable — see step 8), the current Invest tier/Bandwidth (step 5
   below, affordable and unclaimed), any currently-buildable Disk array (step 8 below), and an
   activatable Compute Boost (step 9 below, once unlocked) are all NOT currently possible — see
   "Forced priority order" below for the full five-item ranking this composes.
   `ByteFoundryPage`'s own button fires `pickIntroCapacityMilestone` immediately on click — no
   confirm prompt (see `docs/DESIGN_HISTORY.md`'s "Sacrifice confirm" section for why the earlier
   `ConfirmDialog` step was removed). The engine-level gate above is what actually protects against
   an accidental/premature Sacrifice; nothing UI-level sits on top of it any more.
   **Queued Capacity** (`queueIntroCapacityUpgrade` / `tickQueuedCapacityUpgrade`): Capacity may be
   queued before Memory is full — but not once already at the cap, since there's nothing left to
   commit to. Once queued, the next time Memory is full and Disk Fill / Bandwidth /
   Disk Build are unavailable (and the cap hasn't since been reached), the queued fire path
   **erases all held Compute tokens** (ladder
   balances, active Boost, in-flight merge timers — not permanent auto-claim/auto-merge unlocks or
   `computeCoresEverEarned`) and performs the ×2 Sacrifice, bypassing the normal "Compute blocks
   Capacity" gate so an activatable Compute Boost cannot starve a committed Capacity upgrade.
   Clears on Prestige, on successful manual Sacrifice, or via `clearIntroCapacityUpgradeQueue`.
   `tickGame` runs `tickQueuedCapacityUpgrade` right after intro production / disk-build countdown,
   before Disk auto-fill claims Memory (Cores are no longer minted from Memory at all — see
   "Compute Cores/Nodes" below).
5. **Invest for Double Production** (`pickIntroProductionMilestone`) runs on its own **independent
   cost ladder**, entirely decoupled from `capacity`/Sacrifice — a separate, permanent progression
   tracked by `productionMilestoneTier` (0-based). Tier `t`'s cost is
   `getIntroProductionMilestoneCost(t) = INTRO_STARTING_CAPACITY * INTRO_BANDWIDTH_COST_MULTIPLIER ** t`
   (8, 32, 128, 512, 2048, … bits — stepped ×4 per tier, its own independent multiplier since this
   split from Sacrifice's capacity ladder, which now steps ×2; `ByteFoundryPage` shows this cost in
   binary Memory units on the button itself). Because the cost is independent of `capacity`, a
   claim only ever requires `bits >= cost` — **not** a full balance — which is frequently true well
   before Memory is full, once Sacrifice has grown capacity ahead of this ladder. Each tier grants
   `getIntroProductionMilestoneMaxClaims(t)` claims: **2** for the three cheapest tiers (t = 0, 1, 2 —
   1/4/16 Bytes), **1** for every tier from there on (an intermediate iteration tightened this to a
   flat 1 across the board, matching Sacrifice's own single-shot posture, before the three-cheapest-
   tiers exception was reinstated — see `docs/DESIGN_HISTORY.md`), tracked by
   `productionMilestoneTierClaims`; a successful claim deducts exactly that tier's cost from `bits`
   and immediately advances to `productionMilestoneTier + 1` with a fresh claim count of 0 (the
   claims-per-tier plumbing itself is unchanged and still generic — a future tier-dependent claim
   count could return without touching `pickIntroProductionMilestone`). Every claim doubles the
   Byte's overall bits/sec rate (`getIntroProductionRate`) by
   `INTRO_PRODUCTION_MULTIPLIER_STEP` (2), speeding up delivery first (halves `tickSpeedSeconds`) —
   the same tickspeed-vs-production split `getEffectiveTierTickSpeedSeconds` uses for tiers — only
   once that would push `tickSpeedSeconds` below `INTRO_MIN_TICK_SPEED_SECONDS` (the live tick
   loop's own real-time resolution, `TICK_RATE_MS`) does it switch to multiplying
   `productionMultiplier` (growing the batch) instead, so growth never stalls once the tick loop's
   own granularity limit is reached. Ranked second in the forced priority order (below Disk
   Fill, above Disk Build/Compute/Memory — see "Forced priority order" below):
   `isBandwidthTurnAvailable(state)` is `pickIntroProductionMilestone`'s own actual gate, a no-op
   whenever a redeemable Disk Fill is currently available even if this tier's own cost is
   affordable.
6. Once `capacity` reaches `INTRO_CONVERSION_UNLOCK_CAPACITY` (8000 bits — first true at the
   `capacity = 8000` stage, since capacity only ever takes the discrete 8/80/800/8000/… values;
   8000 bits = 1000 Bytes in Memory's own display scale),
   `isIntroConversionUnlocked(state)` goes true: `ByteFoundryPage` shows a row of **transfer
   blocks** at the bottom of the screen — always all `getPurchaseBlockSize(state)` of them (see
   step 7), for the whole cycle; blocks never disappear once transferred, they just show as
   consumed. Only the leftmost not-yet-transferred (active) block is ever clickable; clicking it
   calls `convertIntroBitsToKilobytes` (spending `getIntroKilobyteConversionCost(state)` bits — tier01's
   own CURRENT per-unit level cost, not a flat rate (see step 7) — from Memory for 1 free Kilobyte unit —
   bypassing `isTierUnlocked`/`isProductionFrozen` entirely, since this pays from the separate intro
   pool, not `resources.base`) and reveals the next block as active (any Memory surplus left over
   after the transfer carries straight into it, so a large enough balance lets a player click
   through several blocks in a row without waiting for more production) — the block just spent
   stays rendered too, now permanently disabled and shown filled/greyed to mark it consumed.
   **The very first successful transfer this cycle — a block click, or via the bulk auto-convenience
   in step 7 — sets `mainGameUnlocked: true`**, opening `App.jsx`'s routing gate into MainPage
   immediately; the player no longer has to wait for a full balance the way the old one-shot
   auto-invest required.
7. All conversions — block clicks (`convertIntroBitsToKilobytes`) and the auto-convenience below —
   spend straight out of `intro.bits`, `getIntroKilobyteConversionCost(state)` bits per Kilobyte unit
   granted — **tier01's own CURRENT per-unit level cost** (`getTierCost(TIER_DEFINITIONS[0],
   state.purchaseLevels?.[tier01] ?? 1)`), the exact same value `getDiskSize`/
   `isDiskRedeemable` already key off (step 8), not the fixed `INTRO_BITS_PER_KILOBYTE_CONVERSION`
   (8000) rate directly — `getIntroKilobyteConversionCost` is `BITS_PER_BYTE × getTierCost(...)`. At a
   fresh cycle's starting level this works out to exactly 8000 bits (`BITS_PER_BYTE` × tier01's own
   `baseCost` of 1000, matching `INTRO_BITS_PER_KILOBYTE_CONVERSION`), but it grows in lockstep with
   tier01's own price from then on — 80,000 once tier01 reaches level 2, and so on — so a transfer's
   real value never falls behind what tier01 itself currently costs. (An
   earlier version stayed flat at `INTRO_BITS_PER_KILOBYTE_CONVERSION` forever, undervaluing a
   transfer once tier01's price had grown past it — see `docs/DESIGN_HISTORY.md`.)
   **There is no per-cycle cap on how many conversions can happen.** (An earlier design
   capped a shared, running `bitsTransferredThisCycle` total at one `getPurchaseBlockSize(state) *
   INTRO_BITS_PER_KILOBYTE_CONVERSION`'s worth per real Prestige cycle — see `docs/DESIGN_HISTORY.md`
   for why that was wrong and removed.) `ByteFoundryPage` always renders exactly
   `getPurchaseBlockSize(state)` transfer blocks (step 6), deriving each one's consumed/active/
   upcoming state directly from `purchaseLevelProgress[tier01]`. This is the only place
   `ByteFoundryPage` shows this progress — the Storage section (step 8) used to show a redundant,
   separately-rendered copy of the identical value and no longer does. Because this is a genuine,
   uncapped tier-level progress counter rather than a cycle-scoped budget, the row automatically
   rolls over to a fresh, empty block set for the *next* level the instant one completes
   (`getPurchaseBlockSize(state)` blocks transferred), rather than ever sitting permanently
   "consumed." `convertIntroBitsToKilobytes` is a no-op only when `intro.bits <
   getIntroKilobyteConversionCost(state)` — insufficient Memory, nothing else.
   Separately, `tickIntroAutoInvest` (called from `tickGame`, every tick) converts one
   `getIntroKilobyteConversionCost(state)`-bit unit **as soon as it's affordable** — live, block by
   block, exactly like a manual click, not just once a whole `getPurchaseBlockSize(state)`-sized
   batch accumulates at once. (An earlier version waited for that whole batch before converting
   anything at all, mirroring the autobuyer "wait until affordable, then fire once" convention — but
   since this runs every tick regardless of whether a full batch is available, in practice it just
   made the transfer-block row look permanently stuck on block 1 — pinned at 100% since `bits` kept
   climbing past 1000 — for the entire time Memory climbed toward the full batch, with blocks 2+
   never activating until the batch completed and the whole level rolled over invisibly within that
   same tick; see `docs/DESIGN_HISTORY.md`.) Each call converts every complete unit the current
   balance affords, capped at `getTierBulkQuantity`'s own "at most one level's worth per call" bound
   — the same safety cap the tier autobuyers themselves use — so a jump spanning more than one
   level's worth of units (e.g. a big offline-progress catch-up second) completes the rest on a later
   tick instead of looping unboundedly in one call. `tickDiskAutoFill` (step 8) runs first, ahead
   of `tickIntroAutoInvest`, within `tickGame` — see the `tickGame` table row below — so a Disk
   array the player has already built and is waiting to fill gets first claim on fresh Memory, rather
   than being starved by it being auto-converted directly into Kilobytes first. Both conversion paths
   set `mainGameUnlocked: true` the first time they fire. Every real `prestigeGame` call resets
   Memory (`bits`/`productionAccumulator`) and the
   gate (`mainGameUnlocked: false`) back to fresh — see the intro above — along with tier01's
   `purchaseLevels`/`purchaseLevelProgress`, so the transfer row starts over too, purely as a side
   effect of that general per-tier reset. So a real Prestige sends the player back through the gate
   every cycle, but the generator itself (byteCreated/capacity/tickSpeedSeconds/productionMultiplier/
   productionMilestoneTier/productionMilestoneTierClaims) carries over, making every cycle after the
   first a fast pit-stop rather than a full replay. `speedUpGame`/`overclockGame` are intra-cycle
   soft resets, not new cycles, and still carry the whole `intro` object through completely
   untouched, Memory included. A full Reset also restarts the intro from true scratch (via
   `createInitialGameState()`'s fresh defaults for every field, generator included).
8. **Disks** (`disks: { [capacityBits]: currentlyFullCount }`, `disksBuiltTotal:
   { [capacityBits]: cumulativeBuiltCount }`, `diskCache: { [capacityBits]: bitsStaged }`,
   `diskBuild: null | { size, remainingSeconds, totalSeconds }`, `diskAutoRedeemedSizes:
   { [capacityBits]: true }`) live as continuous sections on `ByteFoundryPage` once
   `isStorageUnlocked(state)`, i.e. `intro.capacity >= INTRO_DISK_UNLOCK_CAPACITY` (80,000 bits,
   "9.765 KiB" in Memory's own binary display scale — a deliberately later, more advanced-game
   reveal than step 6's own 8000-bit `isIntroConversionUnlocked` gate). Build Disk and every shown
   size's DiskArrayRow
   appear on that same Foundry screen (no second-level Storage tab; the thin `StoragePage` wrapper
   remains for reuse/tests). A Disk is a genuine storage **medium**, not a
   one-shot pre-paid item: building one only constructs a permanent, EMPTY container (after a real
   build TIME — see below); Memory then auto-fills any empty container as it accumulates — via that
   array's own cache first (see below), smallest size first — and redeeming a full disk empties it
   again, returning it to the fillable pool — disks are reusable, not single-use.

   `getDiskSize(state)` walks a gapless Byte power-of-ten ladder —
   `DISK_LADDER_BASE_SIZE_BITS * DISK_LADDER_SIZE_MULTIPLIER^(n-1)` for step 1, 2, 3, … (real,
   Byte-accurate bits — a real "1 KB" disk is 8000 bits; then 10 KB, 100 KB — see
   `getDiskLadderSizeBits` / issue #368), advancing to the next size once `DISK_ARRAY_LADDER_CAP`
   (10) disks have *ever* been built at the current one, read from `disksBuiltTotal` (a cumulative
   counter `redeemDisk` never decrements, so the ladder only ever advances; deliberately decoupled
   from `tier01`'s CURRENT level — see `docs/DESIGN_HISTORY.md`). An earlier ladder walked
   `tier01`'s level-cost sequence and skipped sizes whenever cost-epoch exponents jumped (100 KB →
   10 MB, never 1 MB); that blocked the intended "10 MB Memory → build 1 MB disks → redeem Tier02
   L1" path. `getDiskSize` never advances past `MAX_ACTIVE_DISK_LADDER_STEP` (today, pool 1's own
   3 sizes: 1/10/100 KB) — a 1 MB disk's own build cost (8,000,000 bits) would permanently exceed
   `INTRO_CAPACITY_CAP_BITS` with no pool 2 generator yet to fund it, so the "10 MB Memory → build
   1 MB disks" path above is presently unreachable via pool 1 alone; Tier02+ still redeems the
   ordinary way (the ladder's own Buy button) in the meantime. Once the 100 KB array is fully built,
   `isDiskLadderExhaustedForActivePools` goes permanently true and Build shows a distinct
   "Pool complete" state (see `isDiskBuildAvailable`) rather than an ever-unaffordable cost, until a
   future pool's own generator (epic #456) raises the ceiling.

   **Start Disk Build** (`startDiskBuild`) spends `getDiskCost(size) = size *
   DISK_BUILD_COST_MULTIPLIER` bits **immediately** — 10x the array's own face value, already **in
   bits** (`size`, from `getDiskSize`, is already Byte-accurate, so no further `BITS_PER_BYTE`
   conversion is needed here — an earlier "kilobit"-scaled version of this ladder needed one, and
   priced a real 1 KB array's build cost wrong as a result — see `docs/DESIGN_HISTORY.md`): a real 1
   KB (8000-bit) array costs 80,000 bits ("10 KB") to build, a real 10 KB (80,000-bit) array costs
   800,000 bits ("100 KB"), and so on — but does **not** grant the container instantly any more.
   Instead it sets `intro.diskBuild = { size, remainingSeconds, totalSeconds }`, a real TIMED
   construction (an earlier version completed instantly — see `docs/DESIGN_HISTORY.md`).
   `totalSeconds = getDiskBuildBaseSeconds(size) * ordinal`, where `getDiskBuildBaseSeconds(size) =
   size / (getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE)` — 1 second per real "KB" of size
   (the smallest disk size, level 1, always takes exactly 1 second; "10 KB arrays start at 10
   seconds, 100 KB at 100 seconds," and so on) — and `ordinal = disksBuiltTotal[size] + 1` at the
   moment the build STARTS (the permanent, cumulative count, not the ladder's own current level), so
   building the Nth disk of a given size takes N × that size's own base build time: a 1 KB array's
   6th disk (its 5 predecessors already built) takes 6 × 1s = 6 seconds, a 10 KB array's 6th disk
   takes 6 × 10s = 60 seconds. `tickDiskBuild(elapsedSeconds)` — called from `tickGame` right after
   `tickIntroProduction` and before `tickDiskAutoFill`, unconditionally — counts `remainingSeconds`
   down every tick; once it crosses (or reaches) 0, `disksBuiltTotal[size]` increments (the
   container itself now exists, empty, ready for `tickDiskAutoFill`) and `diskBuild` clears back to
   `null`, re-enabling every IO operation against that size's array. Only one array is ever mid-build
   at a time (only one size is ever offered on the ladder), and **while it is, every IO operation
   against that size's own array is disallowed** — "the array rebuild": `tickDiskAutoFill` skips it
   (other sizes still fill normally), `tickDiskAutoRedeem` skips it, `redeemDisk` no-ops,
   `isDiskCacheBlockReleasable` is false, `releaseDiskCacheBlock` no-ops for it. Ranked third in the
   forced priority order (below Disk Fill and Bandwidth, above Compute/Memory — see "Forced priority
   order" below): `isDiskBuildTurnAvailable(state)` is `startDiskBuild`'s own actual gate, a no-op
   whenever a redeemable Disk Fill or an affordable Bandwidth claim is currently available even if
   this size's own build cost is affordable. Unlike the `isStorageUnlocked` reveal gate above,
   `startDiskBuild` itself has never required that threshold — only the nav button's own reveal does
   — so `isDiskBuildAvailable` (the base predicate, ignoring priority) checks only `!diskBuild &&
   affordable`.

   **The read cache.** Only the pool's own smallest disk size — the one whose `getDataLakeSubSize`
   sub-slot is `DATA_LAKE_SUB_SIZES[0]` (×1), the rung that actually touches Memory directly — ever
   keeps a `diskCache[size]` (0..size bits) at all (see `isDiskReadCacheEligible`); every larger size
   in the same pool fills exclusively via the write cache below, which never reads or writes
   `diskCache`/`diskReadCacheFlush`. Running both mechanisms on every size used to be pure
   redundancy — two fill paths pouring into the same container — so `tickDiskAutoFill` now scopes
   its own three passes (below) to eligible sizes only, and self-heals a save still carrying a stale
   `diskCache`/`diskReadCacheFlush` entry for a now-ineligible size by refunding it straight back
   into `intro.bits` the next time it runs. Where it applies, the cache is a permanent always-full
   reserve — split into `DISK_CACHE_BLOCK_COUNT` (8) equal blocks, each holding
   `size / DISK_CACHE_BLOCK_COUNT` bits (e.g. a 1 MB array → 8 × 1 Mb), totaling one disk's own
   capacity. Steady state is full; gaps appear only right after a manual block release, a completed
   read-cache→disk flush, or when the size is newly unlocked/built. When all 8 blocks are full and no
   tier claim blocks ladder use at that size (`isDiskRedeemable` is false), `tickDiskAutoFill`
   starts a timed flush into one empty disk — duration
   `getDiskReadCacheFlushSeconds` = one block ÷ `getIntroProductionRate` (fixed for that flush in
   `intro.diskReadCacheFlush[size]`). Flush **pauses** while a tier claim matches; cancels if the
   array goes mid-build or no empty container remains. On completion the full cache empties into
   the disk. Its player-facing funding use (when no full redeemable disk exists and not mid-flush)
   is manual tier block funding via `releaseDiskCacheBlock` / Smart auto-release.
   `tickDiskAutoFill(elapsedSeconds)(state)` runs three ascending passes every tick over
   read-cache-eligible sizes only (unconditional, no toggle, skipping mid-build sizes): (1) refill
   the eligible size's read cache toward full in
   **whole-block** transfers only when Memory holds at least one block (so Memory visibly fills
   between transfers; if capacity itself is smaller than one block and Memory is full, dump the
   balance so large arrays can still progress) — skips it while mid-flush; (2) start a flush when
   `diskCache[size] >= size`, an empty container exists, no write-cache merge is active, and
   `isDiskRedeemable` is false; (3) count down an in-flight flush (pause on tier match) and complete
   into one disk. Leftover Memory stays as its ordinary balance. `isDiskCacheBlockReleasable(state,
   capacityBits)` is true once that size's cache holds at least one full block
   (`diskCache[capacityBits] >= capacityBits / DISK_CACHE_BLOCK_COUNT`), that size isn't mid-build
   or mid-flush, no full redeemable disk exists at that size, **and** some tier's current per-unit
   cost exactly matches `capacityBits` right now (`isDiskRedeemable`);
   `releaseDiskCacheBlock(capacityBits)` manually moves exactly one block's worth of bits into
   `resources.base` (the shared Bits currency any unlocked tier is bought with) — **not** back into
   Memory. `tickDiskAutoFill` refills the gap in whole-block transfers once Memory has enough again.

   **The write cache (upward ladder merge).** When 10 full disks exist at size N and size N+1
   (`getNextDiskLadderSize`) has an empty container, `tickDiskWriteCache(elapsedSeconds)` starts
   collecting into `intro.diskWriteCache[N+1]` — empty at rest. Collect runs 10 timed segments
   (each segment's duration = one target build duration ÷ 10); each completed segment empties one
   full source disk at N into the write cache. Collect **pauses** while `isDiskRedeemable` is true
   at the source size (tier match); **flush never pauses**. Once 10 segments are collected, flush
   runs for one full target build duration (`getDiskBuildSeconds` at N+1), then credits one full
   disk at N+1 and clears the write cache. `tickGame`'s storage pipeline runs
   `tickDiskAutoFill` → `tickDiskWriteCache` → `tickDiskAutoFill` so source slots can ripple-refill
   from read cache the same tick a segment completes. The second `tickDiskAutoFill` uses
   `elapsedSeconds = 0` so in-flight read-cache flush countdowns are not applied twice per
   `tickGame` tick (first pass advances them; second only refills / starts new flushes).

   **Redemption is a fixed, permanent one-to-one mapping — one tier+level per disk size.** Each
   disk-ladder step corresponds, forever, to exactly one (tier, level) pair: the tier is whichever
   main-game tier shares that step's Data Lake grouping (`getDataLakeTierIndex` — steps 1–3
   (1 KB/10 KB/100 KB) → tier01/Kilobytes, steps 4–6 (1 MB/10 MB/100 MB) → tier02/Megabytes, and so
   on — the same KB/MB/GB/… naming both `TIER_DEFINITIONS` and `DATA_LAKE_TIER_LABELS` already
   share), and the level is that step's own POSITION (1st/2nd/3rd) within that tier's 3-step group
   (`getDataLakeSubSize`'s position — the internal `getDiskRequiredTierLevel` helper). The internal
   `getMatchingTierForDiskSize` helper looks up that fixed tier for `capacityBits` and returns it
   only while `purchaseLevels[tier.id]` CURRENTLY equals exactly that required level — not yet
   there, or already past it, and it returns `undefined` either way.
   `isDiskRedeemable(state, capacityBits)` is true whenever it returns a tier;
   `getDiskRedeemTierName(state, capacityBits)` exposes that tier's display `name` (or `null`) for
   the UI, e.g. "Redeems 1 10 KB disk for 1 free Megabyte." This replaced an earlier design where a
   disk redeemed into "whichever tier's CURRENT per-unit cost happened to exactly match its size
   right now" (an earlier, tier01-only version even used `<=`, letting an old, smaller disk redeem
   long after that tier's real price had grown past it) — reading `TIER_DEFINITIONS` live by price
   coincidence needed its own tie-break rule for when more than one tier's cost happened to match,
   and could permanently strand a disk if a matching tier's own autobuyer completed more than one
   level in a single tick (a banked attempt budget catching up after a broke/paused stretch),
   jumping its price straight past a disk's exact size without it ever exactly matching mid-tick.
   The fixed mapping has no coincidence to jump past: a disk whose tier has already moved beyond its
   required level simply stays full and unredeemable for the rest of the cycle (not lost — if that
   size's own array is already completely built, `tickDiskAutoDeposit` claims it into the pool's
   Data Lake on the next tick instead, see "Data Lakes" below) rather than waiting for a price to
   cycle back through an exact value. See `docs/DESIGN_HISTORY.md`.

   `redeemDisk(capacityBits)` then empties one matching full disk (`disks[capacityBits] -= 1` — NOT
   `disksBuiltTotal`, which is untouched, so the emptied disk re-enters the fillable pool for
   `tickDiskAutoFill` to fill again later) and completes that tier's CURRENT level in one shot —
   granting exactly enough free units (`getPurchaseBlockSize(state)` minus whatever progress already
   exists) to finish the level's own purchase block and roll straight into the next level, via the
   same `grantTierUnits` helper described below — bypassing `isProductionFrozen`/`isTierUnlocked`/cost
   entirely, and deliberately bypasses `convertIntroBitsToKilobytes`/`tickIntroAutoInvest` (step 7)
   entirely too: a disk's contents came from Memory via `tickDiskAutoFill` already, not a further
   bit-to-Kilobyte conversion at redeem time. "Fills one level" is a deliberate full-level
   completion, not a single unit like a manual/autobuyer purchase — since a disk's own
   correspondence is now fixed to one specific level, granting only 1 unit per redemption would take
   many redemptions of a size the ladder has already moved past to ever finish that level. No-op if
   no disk of that size is currently full, if that size's array is currently mid-build (IO
   disallowed — see `tickDiskBuild`), or if its corresponding tier isn't currently at exactly its
   required level (see `isDiskRedeemable`). A redeem click itself is unaffected by the forced
   priority order — Disk Fill is ranked highest, so it's never blocked by anything else.

   **Auto-redeem is now gated per-matched-tier's own autobuyer, not a global toggle.** There is no
   more `storageAutoRedeemEnabled`-style field at all — `setStorageAutoRedeemEnabled` was removed
   with no replacement export. `tickDiskAutoRedeem` — called from every branch of `tickGame`, frozen
   or not (it bypasses the production freeze, same as `redeemDisk` itself does), right after
   `tickDiskAutoFill` each tick (so a disk filled THIS tick can also redeem the same tick) and after
   every other per-tick automation including a possible automatic Speed Up, so it always sees every
   tier's truly final level for the tick — auto-redeems the smallest eligible full disk each tick
   (redeeming can itself advance a tier's level/cost, which can in turn change which tier OTHER
   sizes now match, so a further eligible disk just gets picked up on a later tick, imperceptibly
   fast at the tick loop's ~10Hz cadence). Immediately after a successful auto-redeem,
   `tickDiskAutoFill` runs again so emptied containers can refill from read cache (and Memory can
   top up any read-cache gap) the same tick when tier does not block ladder use (scoped to a real
   redeem change — a no-op auto-redeem pass does not pull leftover Memory into caches). Manual
   `redeemDisk` does not sync-fill, so clearing the
   last full disk can hand Memory to Bandwidth under Forced Priority. A size is "eligible" if a disk of it is currently FULL and
   `isDiskRedeemable`, its array isn't currently mid-build, it isn't already in
   `diskAutoRedeemedSizes` this cycle (reset fresh every real Prestige, unlike every other Disk field
   above — a disk that refills later the same cycle needs a manual click for the rest of it), **AND**
   the currently-matching tier's own unit-buying autobuyer is currently actually running — unlocked
   (`autobuyers[tier.id]` non-null) **and** not paused (`autobuyersEnabled[tier.id] ?? true`, via
   the internal `isTierAutobuyerActive` helper): "whenever there is a level whose cost equals a
   Disk, it shall be redeemed to fulfill it if [the] autobuyer is enable[d] for the corresponding
   tier." There is no more "smallest denomination always auto-redeems regardless" carve-out — with
   no active autobuyer for the matching tier, a full/redeemable disk simply waits for a manual click
   instead. Disks are **never lost**: nothing here ever expires, decays, or gets spent implicitly —
   only an explicit redeem (manual or auto) ever empties one, and it's immediately eligible to be
   auto-filled again. UI helpers `isDiskAutoRedeemEligible` / `isDiskManualRedeemAvailable` /
   `getDiskSizesToShow` drive Foundry’s continuous DiskArrayRow list (every size ever reached plus
   the current offer). `getRelevantDiskSizesForFoundry` remains available for the narrower
   matching-size subset (plus always the highest shown size — issue #389). Disk circles always
   render all `DISK_ARRAY_LADDER_CAP` slots in one row.

   `disks`/`disksBuiltTotal`/`diskCache`/`diskBuild` are all **PERMANENT**, carried through
   `prestigeGame` unchanged exactly like the Byte generator itself — a disk already FULL when
   Prestige fires stays full, its contents intact even though Memory itself resets to 0, letting
   banked-up Disks give a fresh cycle a head start. `diskWriteCache` and `diskReadCacheFlush` reset
   to `{}` each Prestige
   (in-flight ladder merges do not survive). `diskAutoRedeemedSizes` is the one exception,
   resetting to `{}` every real Prestige.
9. **Compute Cores/Nodes** (`intro.computeCores`/`intro.computeCoresEverEarned`/`intro.computeNodes`,
   all PERMANENT, carried over every real Prestige exactly like the Byte generator/Disks above) —
   earlier versions of this mechanic gated conversion on every Disk array size being built and full
   at a fixed 10 MB cost, then on a dynamic, capacity-tied Memory flush ("Claim Core" — manual by
   default, or automated by sacrificing 10 Nodes); both superseded (see `docs/DESIGN_HISTORY.md`) by
   `startBoosterTransfer`, which spends a matching Data Lake's own deposited Disk stock first
   (instantly), then live-transfers any remaining cost off the raw Disk inventory over time (see
   "Starting a Booster" further down), unrelated to Memory/capacity entirely. Depositing into a Data
   Lake (`depositDiskToDataLake`, gated by `canDepositDiskToDataLake`) is fully automatic — there is
   no player-facing deposit action any more. `tickDiskAutoDeposit`, called from `tickGame`'s own
   `tickStorage` right after `tickDiskAutoRedeem`, deposits the smallest eligible size each tick
   (same one-per-call cadence as `tickDiskAutoRedeem`/`tickDiskAutoReleaseCache`) whenever
   `canDepositDiskToDataLake` holds **and** the size is currently NOT redeemable
   (`!isDiskRedeemable`) — the same "disks always take priority for matching level costs" rule the
   read cache already follows, so a disk whose size still matches some tier's cost stays available
   for a manual/auto redeem instead of being swept into the lake out from under it.
   `canDepositDiskToDataLake` itself requires not just a currently-full disk but that size's disk
   array to be COMPLETELY built — `disksBuiltTotal[sizeBits] >= DISK_ARRAY_LADDER_CAP` (all 10 disks
   ever built at that size, checked by the internal `isDiskArrayFullyBuilt` helper) — before ANY of
   that size's disks can be deposited. Each lake's 3 sub-slots (`DATA_LAKE_SUB_SIZES = [1, 10, 100]`,
   each capped at that lake's own `getDataLakeSlotMax(state, tierIndex)` — `DATA_LAKE_SLOT_MAX` (9)
   to start) map to 3 successive disk sizes — all 3 feeding the SAME lake, one per pool — so this
   array-completion gate naturally STAGES a lake's deposit cap rather than needing a separate field
   for it: **9** once only the smallest (×1) size's array is complete, **99** once the ×10 size's
   array is also complete, and the full **999** (`getDataLakeCapacity`, at the starting slotMax) once
   the ×100 size's array is complete too — see `docs/DESIGN_HISTORY.md`.

   **Capacity doubling** (`doubleDataLakeCapacity(tierIndex)`) — a lake's own `slotMax` can also be
   doubled directly (`DATA_LAKE_CAPACITY_DOUBLING_STEP` = 2×), spending
   `getDataLakeCapacityDoublingCost` in Memory Bits — the same "spend the current value to double
   it" shape `pickIntroCapacityMilestone` (Memory Sacrifice) already uses. The cost is the lake's
   own current `getDataLakeCapacity` (an abstract unit count — `slotMax × DATA_LAKE_SUB_SIZE_TOTAL`)
   converted into real bits via `getDataLakeUnitBits(tierIndex)` — one deposit-unit's own bit face
   value, exactly its lake's ×1 sub-size Disk's size (e.g. 8,000 bits for the KB lake, since
   `getDataLakeSubSizeStep(tierIndex, 1)` always lands on that lake's own first disk-ladder step) —
   so the actual amount spent is the lake's capacity expressed in the same currency Disks
   themselves are priced/sized in, per "Data lake uses the same currency as disks" (see
   `docs/DESIGN_HISTORY.md`), not a bare unit count. This stacks on top of the staged
   array-completion progression above rather than replacing it: a sub-slot still can't accept ANY
   deposit until its own disk array is complete, regardless of `slotMax` — doubling only raises how
   much that already-open sub-slot can hold. Gated by the same forced priority chain as every other
   Byte Foundry milestone action (`isDataLakeCapacityDoublingTurnAvailable` — available only once
   Disk Fill, Bandwidth, Disk Build, and Compute are all currently unavailable, same rank as
   Sacrifice). Raising `slotMax` past its base value required generalizing
   `decomposeDataLakeDeposits` (previously a hardcoded base-10/digit-place assumption tied to
   `DATA_LAKE_SLOT_MAX` = 9): it now caps each sub-size's own place at the lake's live `slotMax`
   (`Math.min(slotMax, Math.floor(remainder / subSize))`) rather than assuming a true decimal
   digit. This greedy cap is exact only once `slotMax` is at least `DATA_LAKE_SUB_SIZE_TOTAL /
   DATA_LAKE_SUB_SIZES[1]` (111 / 10 = 11.1, so `slotMax >= 9` already clears it) — below that
   floor a capped-off remainder at a larger place isn't always absorbable by the smaller places'
   own combined capacity. Since `slotMax` only ever *doubles* from its starting value (never
   shrinks — no halving/reset path exists), every reachable value (9, 18, 36, …) stays comfortably
   above that floor, so this holds for the whole game — it is not "correct for any `slotMax`" in
   the abstract, it depends on 9 being a large enough starting point relative to the ×10 gap
   between sub-sizes. `DataLakePanel` displays every lake figure — deposited, capacity, and the
   next Booster's own unit cost (`getBoosterPurchaseCost`) — converted through this same
   `getDataLakeUnitBits` helper and formatted with `formatDiskSize` (Byte-scale, KB/MB/GB/…)
   instead of a bare number, so the on-screen currency always matches Disks'.

   **Starting a Booster** (`startBoosterTransfer(tierIndex)`, `getBoosterTransferPlan` internally) —
   a lake never itself banks a spendable reserve beyond its own deposits above; past that, it's a
   throughput pipe onto the live Disk inventory, not a second stockpile. The nth Booster ever
   STARTED at a tier (completed or still in flight) costs n units of that tier's own denomination
   (`getBoosterPurchaseCost` — counts in-flight transfers alongside `purchased` so starting several
   concurrently still escalates correctly, not just completed ones). That cost is spent out of the
   lake's own deposits FIRST — instant, since those Disks are already at the lake — and whatever
   remains is sourced live from raw, undeposited built Disks via the internal
   `planLiveDiskFunding`: a greedy pass from the largest sub-size (×100) down to the smallest (×1),
   using as many of each sub-size as are actually held (never more than that — deliberately NOT the
   same digit decomposition deposits use, since a held Disk count can reach `DISK_ARRAY_LADDER_CAP`
   (10), past the deposited buffer's own `DATA_LAKE_SLOT_MAX` (9) cap), cascading any shortfall down
   to the next sub-size — provably correct for feasibility here since each sub-size is an exact ×10
   multiple of the next, so using fewer of a larger one than this greedy's own max can only ever
   increase what's needed lower down. Returns null (nothing to fund) only when the total held Disks,
   respecting each sub-size's own count, genuinely can't reach the needed total. That live-sourced
   portion is transferred at `DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER` (10×) the Byte Foundry's current
   bits/sec production rate (`getIntroProductionRate`, deliberately excluding an active Compute
   Boost, same posture as `getCoreEarnTimeSeconds`) — `(bits transferred) / (10 × rate)` seconds —
   tracked as `{ remainingSeconds }` entries in `intro.dataLakes[tierIndex].transfers`. When
   deposits alone cover the full cost there's nothing left to transfer, so the Booster grants
   immediately (same as the pre-transfer instant-purchase behavior this superseded). Otherwise the
   Booster only grants once `tickDataLakeTransfers` (called every tick from `tickGame`, frozen or
   not, ahead of `AUTO_MERGE_TICKERS` so a Core a transfer completes this tick can still cascade
   upward through an already-unlocked auto-merge chain the same tick) counts that transfer's
   `remainingSeconds` down to 0. A lake can run up to `DATA_LAKE_TRANSFER_CAPACITY_MAX` (3, from
   `getDataLakeTransferCapacity`) of these live transfers at once — one concurrency slot unlocked
   per completed sub-size Disk array (×1/×10/×100, checked smallest first — the same staged gate the
   deposit cap above uses), so `canStartBoosterTransfer` (equivalently, `getBoosterTransferPlan`
   returning non-null) is false whenever a live transfer would be needed but the tier's transfer
   concurrency is already full — this throughput cap bounds live transfers only, not a tier's
   lifetime Booster total (deposits plus repeated live transfers can fund a lake indefinitely).

   `ComputePage` (page
   id `'boosters'`) reveals once `capacity` reaches `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY` (4,194,304
   bits, "512 KiB" in Memory's own binary display scale — half of `INTRO_CAPACITY_CAP_BITS`, one
   Sacrifice doubling short of pool 1's hard cap — `isComputeCoreConversionUnlocked`). Every
   successful tier-1 Booster (instant or completed transfer) also increments
   `intro.computeCoresEverEarned`, a lifetime
   counter tracked alongside `computeCores` but never decremented by spending
   (`activateComputeBoost`) or merging (`mergeComputeCoresIntoNode`/`startComputeCoresMerge` and the
   other merges below) — see the reveal-latch paragraph further down for why this exists as a
   separate field from `computeCores` itself.

   Both `computeCores` and `computeNodes` are capped at `COMPUTE_ENTITY_CAP` (10), the same as every
   other compute-ladder entity (Clusters through Megacomputers, see below) — EXCEPT on the Data Lake
   Booster path itself (`startBoosterTransfer`, any of the ten tiers, not just
   Cores), which is Data-Lake-limited rather than inventory-capped and can push a tier's held count
   past `COMPUTE_ENTITY_CAP` (see "Starting a Booster" above). Every merge function below (Core → Node
   included) caps its own output gain at whatever room remains under the cap, leaving surplus input
   unconverted rather than letting the output exceed it. Nothing is ever lost while capped; it
   simply waits for
   the player to spend an entity down via a future spending mechanic.

   Compute has its own dedicated screen, `ComputePage` — reached via a "⚡ Compute" nav button on
   `ByteFoundryPage`, which stays hidden until `isComputeCoreConversionUnlocked(state)`; like the
   Storage nav button above, it's always enabled once revealed (same permanent, voluntarily-
   revisitable posture). `ComputePage` shows both counts (as `N/10`); Compute Boost below is the
   first mechanic that actually spends Compute Cores.

   **Merging Cores upward** (`intro.computeNodes`/`computeClusters`/`computeNetworks`/`computeGrids`/
   `computeFabrics`/`computeClouds`/`computeDatacenters`/`computeSupercomputers`/
   `computeMegacomputers`, all PERMANENT like `computeCores` above; see issues #280/#321) extends the
   ladder nine tiers: 8 Cores → 1 Node, 8 Nodes → 1 Cluster, 8 Clusters → 1 Network, 8 Networks → 1
   Grid, 8 Grids → 1 Fabric, 8 Fabrics → 1 Cloud, 8 Clouds → 1 Datacenter, 8 Datacenters → 1
   Supercomputer, 8 Supercomputers → 1 Megacomputer (`COMPUTE_MERGE_RATIO = 8`, the same ratio as
   `COMPUTE_CORES_PER_NODE` above, but a separate constant since this chain is conceptually
   distinct). "Compute" is the page/feature name only — every individual entity's display name drops
   it (`Core`/`Node`/`Cluster`/…, never "Compute Core"/"Compute Node"/…); the `compute`-prefixed
   field/function names above are internal identifiers, unrelated to what the player sees.
   Core → Node is an ordinary boundary in this chain, same shape as the other eight — obtaining
   Cores themselves (via `startBoosterTransfer`, described above) is entirely separate from
   merging them.

   **Before a boundary's auto-merge is unlocked** (below), merging it is a manual, player-clicked,
   INSTANT action — `mergeComputeCoresIntoNode`/`mergeComputeNodesIntoCluster`/
   `mergeComputeClustersIntoNetwork`/`mergeComputeNetworksIntoGrid`/`mergeComputeGridsIntoFabric`/
   `mergeComputeFabricsIntoCloud`/`mergeComputeCloudsIntoDatacenter`/
   `mergeComputeDatacentersIntoSupercomputer`/`mergeComputeSupercomputersIntoMegacomputer` in
   `engine.js`, all built off the same `mergeComputeEntities(inputField, outputField, autoFlagField)`
   factory — converting every complete group of `COMPUTE_MERGE_RATIO` of the input entity into 1 of
   the output entity in a single call, capped at whatever room remains under `COMPUTE_ENTITY_CAP`
   (10) on the output, leaving surplus input unconverted — a same-reference no-op below one full
   group of 8, or once the output is already at cap. Nothing yet spends a Megacomputer — it's the top
   of the chain today (see issue #280's "Out of scope").

   **Once a boundary's auto-merge is unlocked, merging it fully transitions to a timed RESERVE POOL**
   (issue #321) — for BOTH manual and automatic triggering — and the instant function above becomes
   a permanent same-reference no-op for that boundary (`mergeComputeEntities`'s own first-line guard:
   `if (state.intro?.[autoFlagField]) return state`), an engine-level guard, not just a UI one (see
   "Security notes" in CLAUDE.md). Each boundary gets a same-sized second pool of
   `COMPUTE_MERGE_RESERVE_CAP` (8, same value as `COMPUTE_MERGE_RATIO` — a merge always consumes
   exactly one full group) slots alongside the entity's own `COMPUTE_ENTITY_CAP` (10) normal slots —
   "18 slots" total per boundary. The reserve pool is modeled without a separate count field: since it
   always fills atomically (all 8 at once, never gradually) and only one merge can be in flight per
   boundary at a time, a single countdown-timer field per boundary
   (`intro.computeCoresMergeRemainingSeconds`/`computeNodesMergeRemainingSeconds`/… — 0 = idle, > 0 =
   merging, all PERMANENT, carried through a real Prestige unchanged rather than being cancelled,
   since an in-flight merge represents already-committed tokens) fully captures the state. Starting a
   merge (`startComputeCoresMerge`/`startComputeNodesMerge`/…, built off a shared
   `startComputeMergeReserve` factory) instantly moves `COMPUTE_MERGE_RATIO` (8) tokens out of the
   input entity's normal slots and starts the timer at that boundary's live duration from
   `getComputeMergeDurationSeconds` (Core→Node = 10× live Core earn time — capacity ÷ bits/sec
   before Boost; each next boundary ×10 the previous, or ×5 after that boundary’s sequential
   duration upgrade — snapshotted at merge start so in-flight timers do not rescale mid-merge).
   `tickComputeMergeReserveTimer` counts an in-flight merge's remaining duration down every
   tick (frozen or not, same posture as every other Byte Foundry mechanic) and, on completion, grants
   1 of the output entity (capped defensively at `COMPUTE_ENTITY_CAP`) and clears the timer, freeing
   the reserve for the next merge. There are two ways to start a merge, sharing the same underlying
   `startComputeMergeReserve` call but at different thresholds: the AUTO-trigger
   (`tickAutoMergeCoresIntoNode`/…, called every tick from `tickGame`'s `AUTO_MERGE_TICKERS`
   pipeline, lowest tier first) only fires once the input is COMPLETELY full (`COMPUTE_ENTITY_CAP`,
   10) — a deliberately stricter bar so automation only ever mops up an entity the player has let cap
   out; the MANUAL trigger (`isComputeCoresMergeStartAvailable`/… gating the same `startCompute*Merge`
   action, now player-clickable once unlocked) fires at the lower `COMPUTE_MERGE_RATIO` (8) threshold
   — "the button is enabled only when there are at least 8 tokens available across all the 18 slots."
   Both are same-reference no-ops while a merge is already in flight for that boundary, or once the
   output is already at `COMPUTE_ENTITY_CAP`.

   **Auto-merge automation** (see issues #316/#321): each of the 9 manual merges above can be
   permanently automated, one tier boundary at a time. `enableAutoMergeCoresIntoNode`/
   `enableAutoMergeNodesIntoCluster`/`enableAutoMergeClustersIntoNetwork`/
   `enableAutoMergeNetworksIntoGrid`/`enableAutoMergeGridsIntoFabric`/`enableAutoMergeFabricsIntoCloud`/
   `enableAutoMergeCloudsIntoDatacenter`/`enableAutoMergeDatacentersIntoSupercomputer`/
   `enableAutoMergeSupercomputersIntoMegacomputer` (each built off a shared `enableAutoMerge`
   factory, gated by the matching `isAutoMerge*UnlockAvailable` predicate) sacrifice ALL
   `COMPUTE_ENTITY_CAP` (10) currently-held units of that merge's own OUTPUT entity — e.g.
   `enableAutoMergeCoresIntoNode` spends 10 Nodes, `enableAutoMergeNodesIntoCluster` spends 10
   Clusters — to permanently flip a matching boolean flag (`intro.autoMergeCoresIntoNode`/
   `autoMergeNodesIntoCluster`/…, all PERMANENT, defaulting `false`, carried over every real Prestige
   like every other compute-ladder field). This is what actually switches that boundary over to the
   timed reserve system described above, for both triggers.

   **`ComputePage` shows two rows per tier** (issue #321): row 1 is the tier's name/symbol plus
   `COMPUTE_ENTITY_CAP` (10) normal-slot squares; row 2 is, before that boundary's auto-merge is
   unlocked, an instant Merge button (disabled below `COMPUTE_MERGE_RATIO` held) plus an Unlock
   Auto-merge button (disabled below `COMPUTE_ENTITY_CAP` of the output entity held) — or, once
   unlocked, the `COMPUTE_MERGE_RESERVE_CAP` (8) reserve-slot squares themselves, with no separate
   button: clicking that row IS what manually starts a merge ("slots are the button"), showing a
   countdown while one is in flight. Cores' own row 2 follows the identical merge-boundary shape as
   every other tier (Core → Node) — obtaining Cores themselves happens on row 1, via the Data Lake
   Booster purchase button, not a merge-shaped control. Megacomputer (the last tier) has no row 2 at
   all — nothing to merge into or automate past it.

   A new, permanent, one-time reveal latch, `intro.computeMergePageUnlocked` (defaults `false`,
   never re-clears once set, carried over unchanged by every real Prestige exactly like the
   counters themselves), gates the merge-chain section of `ComputePage` itself (every counter past
   Nodes + the eight merge buttons) — the page as a whole already reveals earlier, via
   `isComputeCoreConversionUnlocked` above, so this is a second, later latch nested inside the same
   page rather than a separate page/nav link: before it flips, `ComputePage` shows only the
   Cores/Nodes counts and Compute Boost, exactly as it did before this merge chain existed. The
   latch flips true (inside `latchComputeMergePageIfNeeded`, called from `startBoosterTransfer`'s
   instant-grant path or `tickDataLakeTransfers`' transfer-completion path — the only two places it
   ever changes) the instant `intro.computeCoresEverEarned` — the lifetime
   counter above — reaches `COMPUTE_CORES_PER_NODE` (8) for the first time. This is deliberately a
   **separate field** from the live `computeCores` balance, not just a post-increment check on it:
   `computeCores` is spent by
   `activateComputeBoost` and drained by merging into a Node (`mergeComputeCoresIntoNode`/
   `startComputeCoresMerge`), so a player who spends a
   Boost before ever holding 8 Cores at once (earn 3, spend 3, earn 5 more — never above 3 live at
   any moment, but 8 total earned) would never trip a check against the live balance at all, even
   though they've obviously earned enough. `computeCoresEverEarned` only ever increases, so merging
   Nodes back down, spending a Core on a Boost, or hitting `COMPUTE_ENTITY_CAP` with no room left to
   convert into can never re-hide or prevent the merge section once it's genuinely been earned.
   Saves must already include `intro.computeCoresEverEarned` in the current schema — `mergeState`
   does not backfill it from live balances on load.
10. **Compute Boost** (`intro.computeBoostType`/`computeBoostTierIndex`/`computeBoostStacks`/
   `computeBoostRemainingSeconds`, all run-scoped — reset to inactive on every real Prestige, unlike
   `computeCores`/`computeNodes`/etc. themselves, but carried through untouched by Speed Up/Overclock
   same as the rest of `intro`) — the first mechanic that actually spends compute-ladder tokens.
   **Tier-funded** (issue #326): activating a boost spends 1 token of whichever compute-ladder tier
   the player selects on `ComputePage` — Core through Megacomputer (`COMPUTE_BOOST_TIER_FIELDS` in
   `layers.js`), the only place a Megacomputer has any use at all — rather than always a Compute
   Core. `COMPUTE_BOOST_PRESETS` in `layers.js` (`burst` ×20/10 minutes, `standard` ×5/1 hour,
   `sustain` ×2/10 hours — chosen so each preset's own total extra production, `(multiplier - 1) *
   durationSeconds`, strictly increases Burst → Standard → Sustain: 190/240/600 minutes-worth; see
   docs/DESIGN_HISTORY.md for the earlier ×32/1 min, ×8/10 min, ×2/1 hour values this replaced,
   which broke that ordering) are each preset's BASE values, at tier 1 (Core); a higher tier scales the
   multiplier EXPONENTIALLY (`getComputeBoostTierMultiplier(boostType, tierIndex)` =
   `preset.multiplier * COMPUTE_BOOST_TIER_POWER_STEP ** (tierIndex - 1)`, `COMPUTE_BOOST_TIER_POWER_STEP`
   = 4) and multiplies duration by `COMPUTE_BOOST_TIER_DURATION_STEP` (2) per tier
   (`getComputeBoostTierDurationSeconds` = `preset.durationSeconds * 2^(tierIndex-1)`)
   — e.g. tier 5 (Grid) is the same length and `4^4` (256×) as powerful as tier 1's own base values,
   tier 3 (Cluster) is the same length and `4^2` (16×) as powerful. Selecting a
   tier is free (no cost) — `ComputePage`'s own local UI state, not persisted game state — clicking
   any compute-ladder row's own `TierSelectButton` (row 1) arms the 3 preset buttons at that tier's
   own scaled power; before `intro.computeMergePageUnlocked`, Core is armed implicitly (the only
   tier that can ever hold a balance that early). `getComputeBoostMultiplier(intro)` applies the
   ACTIVE boost's own tier-scaled multiplier (falling back to tier 1/Core for
   `intro.computeBoostTierIndex ?? 1`, a defensive migration path for a save from before this field
   existed) to "the base production tier of each screen" simultaneously — Memory's own passive
   production (`tickIntroProduction`, folded into `bitsToAdd`) and `tier01`'s production specifically
   (`tickGame`'s per-tier loop, where every other tier's own `computeBoostMultiplier` stays 1).

   `activateComputeBoost(boostType, tierIndex)`, gated by `canActivateComputeBoost(state, boostType,
   tierIndex)` (a valid preset, a valid tier with ≥1 token held, AND — issue #326's key change from
   before — **no boost of ANY kind currently active**, even the same type/tier), spends 1 token of
   that tier's own field and starts a fresh boost at `computeBoostStacks: 1`. **Same-type restacking
   no longer happens through the preset buttons** — a separate `stackComputeBoost()` action, gated by
   `canStackComputeBoost(state)`/`isStackComputeBoostTurnAvailable(state)`, extends the CURRENTLY
   ACTIVE boost instead: it always spends another token of the active boost's OWN funding tier
   (`intro.computeBoostTierIndex`), regardless of which tier a player might have since selected in
   the UI, incrementing `computeBoostStacks` (capped at `COMPUTE_BOOST_MAX_STACKS`, 10) and adding
   that same tier's own `getComputeBoostTierDurationSeconds` onto `computeBoostRemainingSeconds` — the
   multiplier itself never compounds from stacking. `tickComputeBoost(elapsedSeconds)` counts the
   remaining duration down every tick, frozen or not, clearing the boost back to inactive (`type:
   null, tierIndex: null, stacks: 0, remaining: 0`) once it reaches 0. Only the UNUSED quantity is
   ever reclaimable, one at a time: `reclaimComputeBoost` (gated by `canReclaimComputeBoost`, true
   whenever any boost is active) is the exact inverse of one `activateComputeBoost`/`stackComputeBoost`
   call — refunds 1 token of the active boost's own funding tier (capped at `COMPUTE_ENTITY_CAP`, in
   case more were earned meanwhile) and subtracts that tier's own base preset `durationSeconds` back out of
   `computeBoostRemainingSeconds` (floored at 0), decrementing `computeBoostStacks` by 1 — clearing
   the boost fully back to inactive once the last stack is reclaimed, rather than leaving a 0-stack
   "active" boost around.

   On `ComputePage`, render order top to bottom: the active-boost status itself (effect, countdown,
   stack count — no longer a Reclaim control, moved below, see next) renders at the very TOP of the
   page, right after the header, so it stays visible regardless of what else is on screen; `MainPage`
   shows a matching read-only status line while a boost is active, since its effect reaches `tier01`
   there too. Right below that is the Boost EFFECTS section itself ("the effects section is at the
   top of the Compute page, not at the bottom"): an armed-tier status line names the currently armed
   tier and how many tokens it holds, then the 3 small icon preset buttons — disabled entirely until
   a tier is armed, and (per the "no boost of any kind currently active" gate above) disabled again
   the instant any boost starts, regardless of type/tier. Only while a boost IS active, a Stack +
   Reclaim row appears right below the presets ("Stack and reclaim buttons shall be shown on the next
   row"). THEN, below the whole effects section, come the tier rows themselves — clicking one arms
   the presets above it. Ranked fourth in the forced priority order
   (below Disk Fill/Bandwidth/Disk Build, above Memory — see "Forced priority order" below):
   `isComputeBoostTurnAvailable(state, boostType, tierIndex)`/`isStackComputeBoostTurnAvailable(state)`
   are `activateComputeBoost`/`stackComputeBoost`'s own actual gates, a no-op whenever something
   ranked above Compute is currently available even if the mechanical (`canActivateComputeBoost`/
   `canStackComputeBoost`) check alone would allow the click.
11. `ByteFoundryPage` doesn't disappear once `intro.mainGameUnlocked` is true — it becomes a
   permanent, voluntarily-revisitable screen instead, reachable at any time via MainPage's own
   "⚙️ Byte Foundry" link (`onOpenFoundry`). Nothing about it goes read-only when reached this way —
   Tap/Sacrifice/Invest/Storage stay just as interactive as on the mandatory gate, and the
   transfer-block row keeps working too — there's no per-cycle cap to exhaust (see
   docs/MAINPAGE_REFERENCE.md's "Byte Foundry page" section for the render-level detail).

**Forced priority order.** The five recurring "upgrade" actions above — Disk Fill (step 8) >
Bandwidth (step 5) > Disk Build (step 8) > Compute (step 10) > Memory (step 4) — are ranked
in a fixed order: whenever ANY action ranked above a given one is currently available, that lower one
is disabled, both in the UI (its button shows disabled, with a tooltip) and in the engine reducer
itself (a defensive no-op — same "engine re-validates" posture as every other action). Each action's
own plain base predicate — `isDiskFillAvailable`, `isBandwidthAvailable`,
`isDiskBuildAvailable`, `isComputeUpgradeAvailable` (all `state → bool`, see the function
table below) — is composed into a "turn"-suffixed predicate
(`isBandwidthTurnAvailable`/`isDiskBuildTurnAvailable`/`isComputeBoostTurnAvailable`/
`isComputeUpgradeTurnAvailable`) that folds the priority order in on top; those turn predicates are
what the actual reducers (`pickIntroProductionMilestone`/`startDiskBuild`/`activateComputeBoost`)
gate on, and what `ByteFoundryPage`/`StoragePage`/`ComputePage` mirror for each button's `disabled`
prop. Combine into a Byte (a one-off bootstrap step) sits outside this forced order entirely, and so
does the ten-tier merge chain (Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter
→ Supercomputer → Megacomputer) — every `mergeCompute*Into*` function gates only on `canMerge`
(enough of the input entity, room under `COMPUTE_ENTITY_CAP` on the output), never on whether a
higher-ranked action is currently available.
`isMemoryCapacityUpgradeAvailable` (Memory's own gate) directly composes all four base predicates
above it (plus Combine) rather than a separate "turn" wrapper, since it's the lowest-ranked action —
nothing ranks below it to compose against. Disk Fill itself (`isDiskFillAvailable`,
and the `redeemDisk`/`tickDiskAutoRedeem` reducers it gates) is never blocked by anything —
top priority, unaffected by the other four.

Both `convertIntroBitsToKilobytes` and `tickIntroAutoInvest` grant free tier units via an internal
`grantTierUnits(tierId, quantity)` helper (not exported) — it mirrors `buyTier`'s
`owned`/`resources`/`purchased`/`purchaseLevels`/`purchaseLevelProgress` bookkeeping exactly (so a
granted unit advances level/block-progress and counts toward `getPurchaseMilestoneMultiplier`
identically to a manual purchase) but skips the cost check/deduction entirely, since these two callers
pay from the intro's own bit pool, not `tier01`'s `costResourceId`.

`ByteFoundryPage` renders a single **Memory** tile, filling toward its own capacity the same
gradient way every button on this page already does (`progressFill`, reused directly on the tile
itself via a `FillableStatCard = styled(StatCard)` wrapper): `bits / capacity`, both scaled into the
largest unit that comfortably fits `capacity` — raw bits before the Byte generator exists
(`byteCreated`; before that, capacity is always exactly 8 bits/1 Byte, so there's nothing to
meaningfully denominate in yet — a fractional Byte reads worse than the raw count for a range this
small), then B/KiB/MiB/…/QiB by 1024 each step once it does, extending `TIER_DEFINITIONS`' own
`KB`..`QB` symbols with an "i" (every capacity value in the Sacrifice ladder is evenly divisible by
`BITS_PER_BYTE`, so this never loses precision at the Byte boundary). Both numbers always render in
the *same* unit (picked off `capacity`, the larger of the two), so a balance never reads in a
coarser unit than its own cap. Memory's own balance/capacity render in **binary** units — `B`/`KiB`/`MiB`/…/`QiB`, step 1024
(`getMemoryUnit`/`MEMORY_BINARY_UNIT_STEP`) — so `1 KiB = 1024 Bytes = 1.024 KB`, distinct from
Disks/Data Lake/caches, which stay on the original SI (step 1000) scale (see below). The unit
conversion (`floorToDecimals`, 3 decimal places — matching `formatAmount`'s own default
max-fraction-digits) floors rather than rounds, the same never-overstate rationale as
`formatCurrency` in `engine.js`: an Intl-rounded 8191/8192 bits would otherwise read as "1 KiB"
one tick before it's actually full. Once `byteCreated`, the tile also shows the current production
rate. The Tap button itself carries no `$progress`/hidden progressbar of its own — the Memory tile
above already shows the identical bits/capacity fill, so a second meter on the tap button would
just duplicate it.

Every Memory-denominated cost shown anywhere across ByteFoundryPage/StoragePage — Sacrifice's cost
(`intro.capacity` itself, since a Sacrifice always drains the current balance in full), Invest's own
cost (`getIntroProductionMilestoneCost(tier)`), and a Disk array's build cost (`getDiskCost`) —
renders in whichever binary `B`/`KiB`/`MiB`/…/`QiB` unit best fits that specific amount
(`formatBitsInNearestUnit`, an `engine.js` export — shared by both pages — reusing
`getMemoryUnit`/`formatMemoryAmount` directly, also both `engine.js` exports: `getMemoryUnit(bits,
true)` picks the unit that fits `bits` itself when called this way), the same binary scale Memory's
own balance uses, rather than a fixed unit that stops scaling once a cost crosses 1024 of it — e.g.
Invest's tier-5 cost (8,192 bits) reads "1 KiB", not "1,024 B", and a 1 KB Disk array's 80,000-bit
build cost reads "9.765 KiB", not a raw unitless "80,000". A Disk's own *size*, in contrast, renders
through the separate, unchanged **SI** scale (`formatDiskSize`, backed by an internal
`formatBitsInNearestSiUnit` helper — no longer the same function as `formatBitsInNearestUnit` now
that Memory moved to binary units; see `docs/DESIGN_HISTORY.md` for the earlier "kilobit" formatting
bug this SI scale originally fixed, back when both scales were still identical). Sacrifice and Invest each
render their own cost on a second line below the button's
symbol/label/multiplier (`MilestoneButtonContent`/`MilestoneCostLine`, a local two-line layout — not
`components/Button`'s single-row `ButtonContent`), in smaller/muted text, rather than crammed inline
in parentheses; a Disk array's build cost stays parenthesized inline in its own label instead, since
that button's label already names the array's *size* separately (see `formatDiskSize` above) and the
cost is the only other number on it. This is a display-only convention — internal state always
stores raw bit counts.

Disks' Start Build button and every shown size's full DiskArrayRow stay on ByteFoundryPage itself as
continuous sections; the thin `StoragePage` wrapper remains for reuse/tests (see "Architecture" in
`CLAUDE.md`) — see docs/MAINPAGE_REFERENCE.md's "Byte Foundry page" and "Storage page" sections for
the render-level layout. Auto-redeem has no standalone pause/resume control of
its own any more — it's gated per-matched-tier's own autobuyer instead, see the "Auto-redeem"
paragraph above.

### Tier production tickspeed

Each tier has its own **independent base tickspeed** — a plain `baseTickSpeedSeconds` field directly on
its `TIER_DEFINITIONS` entry (read via `getTierBaseTickSpeedSeconds` in `layers.js`), not derived from
tier order or a shared formula, though the current values happen to follow one (`tierIndex + 1`). It's
how often, in seconds, that tier delivers a single batch of production rather than continuously every
global tick (the global tick fires every `TICK_RATE_MS` — 100ms/10Hz — much finer than any tier's own
tickspeed). **Each tier's cadence increases by 1s down the list** — tier01=1s up through tier10=10s —
so later tiers deliver batches less often by design, offset by the tickspeed multipliers below rather
than by a faster base cadence. This ladder was tried once before the tickspeed-multiplier system
existed and reverted to a uniform 1s because nothing could compensate for the slowdown; see
`docs/DESIGN_HISTORY.md` for both that original revert and this reintroduction (`baseTickSpeedSeconds
= tierIndex + 1`, matching a fresh, empirically-validated `tierIndex`-relative 1s-10s ladder, not the
1s-11s range Bytes' since-removed presence as tier01 would imply).
Nothing structurally prevents the per-tier values from diverging from the `tierIndex + 1` pattern in the
future; it's a balance choice, not a constraint the field enforces. `MainPage` doesn't show this as an
averaged `/sec` rate — see "Production figure" below, and shows the base/effective values explicitly in
each tier row's collapsed-by-default Details disclosure — see docs/MAINPAGE_REFERENCE.md.

This base period is then shrunk by both tickspeed multipliers — the tier's own
(`getTickspeedProductionMultiplier`, from `tickspeedLevels[tierId]`) and the global one
(`getGlobalTickspeedProductionMultiplier`, from `globalTickspeedMultiplier`) — via
`getEffectiveTierTickSpeedSeconds(state, tierId) = getTierBaseTickSpeedSeconds(tierId) /
(tickspeedMultiplier × globalTickspeedMultiplier)`. **Both multipliers speed up how *often* a tier
delivers a batch, not how much lands in it** — see "Tickspeed multiplier"/"The global tickspeed
multiplier" below for the full mechanics (`docs/DESIGN_HISTORY.md` covers why this replaced an earlier
design that scaled the delivered amount instead).

The mechanism lives entirely in `tickGame` (`engine.js`): `state.tierProductionAccumulators` banks
fractional seconds per tier, incremented by `elapsedSeconds` every tick. Once a tier's accumulator
reaches its own effective tickspeed (`getEffectiveTierTickSpeedSeconds`), `tickGame` delivers `floor(owned
× (whole effective periods elapsed) × getPrestigeProductionMultiplier(points) ×
getPurchaseMilestoneMultiplier(purchased))` — multiplying by the *count* of completed periods, not
elapsed seconds, and with **neither tickspeed multiplier appearing in this credit formula at all** (they
already did their work by shrinking the period, which is what grows the completed-period count) — and
banks any leftover remainder. In the running app, `elapsedSeconds` is `TICK_RATE_MS / 1000` (0.1) per
live tick; during offline-progress replay, `applyOfflineProgress` calls `tickGame(1, …)` once per
simulated second instead. A tier with effective tickspeed *N* accumulates without producing until *N*
seconds' worth of `elapsedSeconds` have banked, then delivers exactly one tick's worth — a slowdown vs.
producing every second at the un-shrunk base value, or a speedup once tickspeed multipliers shrink *N*
below 1s. Because ticks arrive in fractional (0.1s) increments, `tickGame` nudges threshold comparisons
by a `TICK_ACCUMULATION_EPSILON` (`1e-9`) constant to absorb IEEE-754 drift; the same epsilon applies to
the autobuyer and Auto-Prestige attempt-budget threshold checks.

#### Multiplier outcomes are floored

`owned` and `resources` are integer-valued by construction, so a production credit must itself always
be an integer. Of the factors in a tier's production credit (`owned × ticksElapsed × multiplier ×
speedUpMultiplier × getPurchaseMilestoneMultiplier(purchased)`, where `multiplier` is
`getPrestigeProductionMultiplier(points)` once `prestigeSpeedBonusUnlocked` is true, else a flat `1`),
`owned`/`ticksElapsed` are already integers, `getSpeedUpMultiplier` is always a power of 2, and
`getPurchaseMilestoneMultiplier` is always a product of powers of 2 and 10 (see its own row above) —
the only fractional factor is `getPrestigeProductionMultiplier` (`1 + 0.01 ×
points`). **Neither tickspeed multiplier appears in this formula** — `getTickspeedProductionMultiplier`
(`1.1^(level - 1)`) and `getGlobalTickspeedProductionMultiplier` (compounding, with a milestone level
using a bigger step — see its own row above) are instead divided into
the *period* `ticksElapsed` counts against (see `getEffectiveTierTickSpeedSeconds`/"Tier production
tickspeed" above), so their effect on the eventual total is unchanged but arrives via more completed
periods rather than a bigger per-period credit. `tickGame` wraps the whole product in `Math.floor(...)`
before crediting it — never zeroes out production for `owned > 0` since `getPrestigeProductionMultiplier`
is always ≥ 1. `MainPage`'s displayed `+X` production preview mirrors this same `Math.floor(...)`.
Rate-accumulator constants (`getAutoPrestigeAttemptRate`, and cost-scaling values like
`getAutobuyerUnlockCost`/`getSmartAutobuyerCost`/`getAutoPrestigeCost`/`getGlobalTickspeedMultiplierCost`/
`getTickspeedMultiplierCost`) are unaffected — cost values are always already integers, and attempt-rate
multipliers are process bookkeeping (an intentionally-banked fractional budget), not a resource total
shown to the player.

#### Production figure (tick-progress ring removed)

Each tier row's `+X` production figure is the raw per-delivery credit (`owned ×
getPrestigeProductionMultiplier(points) × getPurchaseMilestoneMultiplier(purchased)`, **not** divided by
tickspeed, and **not** multiplied by either tickspeed multiplier — see "Multiplier outcomes are floored"
above) — "how much lands each time the tier's (tickspeed-shrunk) period completes," not a per-second
average. A tier's tickspeed level and the global tickspeed multiplier change how *often* this figure
lands, never its value — the tier row's `⚙ +N%` badge and the Global Tickspeed card are where
that speed bonus is actually surfaced (see "Tickspeed multiplier"/docs/MAINPAGE_REFERENCE.md).
`getTierProductionProgressPercent`/`getEffectiveTierTickSpeedSeconds` (and the former's
`previousAccumulator`/`elapsedSeconds` "just delivered" detection) remain in `engine.js` with unit tests
as read-only accessors, currently unused by `MainPage` (see `docs/DESIGN_HISTORY.md` for why the ring UI
`getTierProductionProgressPercent` used to drive was removed).

### Offline progress

Time away from the game is simulated when the page is reopened, capped at `MAX_OFFLINE_SECONDS` (24
hours) of real elapsed time before any speed reduction is applied. A short absence — at or below
`OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS` (10 minutes) — is simulated at **100% speed**, as if
the screen had been on the whole time, and never surfaces the "Welcome back!" notice (there's nothing
notable to report). Only once the (capped) elapsed duration exceeds that threshold does the entire
duration get scaled down to **50% speed** (`OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.5`) and the notice
appear — see `getOfflineEffectiveSeconds` in `engine.js`. `getOfflineEffectiveSeconds`/
`applyOfflineProgress` (`engine.js`) replay `tickGame(1, autobuyerBatchSize)` once per *simulated*
second — not one lump-sum call — so autobuyers get the same one-purchase-attempt-per-tick cadence
they'd have had live, at whichever speed applies. Since `tickGame` unconditionally drives
`tickIntroProduction`/`tickDiskBuild`/`tickIntroAutoInvest`/`tickDiskAutoFill`/`tickDiskAutoRedeem`
(the Byte Foundry) alongside the main-game tiers on every call, the same speed and threshold apply to
the entire game — Byte Foundry and main game alike — with no separate wiring needed. This replay
granularity is independent of `TICK_RATE_MS` — `applyOfflineProgress` always passes `elapsedSeconds = 1`
regardless of live tick rate. `storage.js`'s `saveGameState` stamps a separate `tens_last_save_timestamp`
localStorage key with `Date.now()` on every save; `loadLastSaveTimestamp` returns `null` if missing (no
prior save, or predates this feature) — a `null` timestamp skips offline progress entirely rather than
guessing. `clearGameState` (via `resetGame`) removes this key too.

`useIncrementalGame.js`'s `computeOfflineCatchUp` is the single place that decides whether to surface
the notice: it always folds the simulated progress into `state` once `getOfflineEffectiveSeconds`
clears a single tick, but only builds an `offlineProgress` summary object (which
`OfflineProgressNotice` renders) when `elapsedRealSeconds` exceeds the full-speed threshold — otherwise
it returns `offlineProgress: null`, so a short gap updates the game state silently.

Offline progress is detected two ways, both in `useIncrementalGame.js`, both replaying through the
identical `computeOfflineCatchUp`/`applyOfflineProgress` path above:

- **Mount-time (`computeInitialGame`).** Runs once, before the first render, comparing `Date.now()`
  against `loadLastSaveTimestamp()`. This is the only path that can ever run when there was no prior
  React tree at all — a real page load or PWA cold start (the app was actually closed/killed).
- **Live tick loop (mid-session).** The `setInterval` tick effect tracks the real wall-clock time of
  its own most recently processed tick in a local closure variable. On every firing — whether the
  `setInterval` itself, or a `visibilitychange` listener that runs the identical check immediately
  when `document.visibilityState` becomes `'visible'` (so a resume doesn't have to wait for the
  interval's own next scheduled firing) — it compares `Date.now()` against that stored time. A gap
  bigger than `BACKGROUND_TICK_GAP_THRESHOLD_SECONDS` (2 seconds — comfortably past ordinary
  `setInterval` scheduling jitter, which stays within tens of ms) is replayed via
  `computeOfflineCatchUp` instead of an ordinary `tickGame(TICK_RATE_MS / 1000, …)` call; anything
  smaller runs the ordinary tick, unchanged from before. Both the interval and the visibilitychange
  listener call the exact same function, and the tracked time is only ever restamped *after* that
  call's own tick/catch-up work finishes, never at entry — a large catch-up replays
  `applyOfflineProgress` one simulated second at a time (up to `MAX_OFFLINE_SECONDS` worth), which can
  itself take real wall-clock time to compute on a slow device, and stamping at entry would let a
  slow replay's own processing time be mistaken for a further background gap by whichever call runs
  next. Safe specifically because this function is synchronous and JS is single-threaded — two calls
  can never overlap, so the next one only ever starts after the previous one has fully returned and
  already restamped the tracked time.

  This second path exists because mobile browsers and installed-PWA hosts routinely throttle or fully
  suspend a backgrounded tab's `setInterval` timer without ever tearing the page down (unlike a true
  close/kill) — so the one-shot mount-time check above silently misses that entire gap: the app just
  resumes ticking forward from wherever it left off once foregrounded again, with no catch-up and no
  notice. This was a real, user-reported bug (offline progress "not working" despite being away for
  hours) before this second detection path existed. Because of it, `offlineProgress` is **not**
  actually one-shot per app lifetime — a single mount can produce a fresh `offlineProgress` object
  (and re-show the "Welcome back!" notice) any number of times across a session, once per detected
  gap; `components/OfflineProgressNotice` re-arms its own countdown/fade timing via an effect keyed
  on the   `offlineProgress` object reference (not a one-time lazy initializer) to handle this.

### PP Compute (Flops)

A separate top-level screen (nav **Compute**, page id `'compute'`, `ComputeFlopsPage`) from the
Foundry **Boosters** screen (nav **Boosters**, page id `'boosters'`, `ComputePage` — Cores/merge/Boost).
Ten PP-funded tiers **KFlops → QFlops** (`COMPUTE_FLOPS_TIER_DEFINITIONS` in `layers.js`, ids
`flop01`…`flop10`), each 1:1 with a Ladder tier via `boostsTierId`. Constants:

- `COMPUTE_FLOPS_REVEAL_PP = 100` — nav item appears once spendable PP first reaches this (latched in
  `computeFlops.pageUnlocked` via `latchComputeFlopsPageUnlocked` / `isComputeFlopsPageRevealed`).
- `COMPUTE_FLOPS_FIRST_TIER_COST_PP = 1E3` … `COMPUTE_FLOPS_LAST_TIER_COST_PP = 1E30` — same 10³
  triangular ladder as `TIER_DEFINITIONS` `baseCost`.
- `COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC = 0.0001` — each owned unit adds 0.01%/real-second to
  that tier's cumulative boost on the matching Ladder tier (linear in owned count).

**Buying:** `buyComputeFlopsTier(flopId)` spends PP from `prestige.points` at the tier's current
per-unit price. Unlike Ladder tiers (same `getTierCost` / `getCostEpochExponent` formula but
level advances only after each 8-purchase block), Flops uses **one cost epoch per owned unit** —
the price for the next purchase is `getComputeFlopsTierCost(flopTier, owned)` =
`getTierCost({ baseCost: flopTier.baseCostPP }, owned + 1)`. No-op if unaffordable. Owned counts
live in `computeFlops.owned` and are **permanent across Prestige** (carried by `prestigeGame`).

**Ticking:** `tickComputeFlops(elapsedSeconds)` runs inside `tickGame` (after intro/disk/compute-core
ticks, before autobuyers). For each Flops tier with owned &gt; 0, adds
`owned × COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC × elapsedSeconds` to
`computeFlops.cumulativeBoost[boostsTierId]`. Also latches page unlock when PP threshold is met.

**Production:** `getComputeFlopsTierProductionMultiplier(state, tierId)` returns
`1 + cumulativeBoost[tierId] + getHyperscalerFlopsBoostRate(state)`, multiplied into each tier's
production batch in `tickGame`.

**Display:** `getComputeFlopsTotal(state)` computes the weighted hero total
**E = k + 10M + 100G + 1000T + … + 10⁹Q** — each Flops tier's `cumulativeBoost` on its matching
Ladder tier multiplied by `10^tierIndex` (KFlops = 10⁰ … QFlops = 10⁹). `formatComputeFlopsTotal`
renders the hero line; per-tier rows still use `formatComputeFlopsBoost` on the unweighted boost.
Production multipliers remain `(1 + cumulativeBoost[tierId])` with no tier weighting.

**Prestige:** `prestigeGame` keeps `computeFlops.owned` and `pageUnlocked`; resets
`cumulativeBoost` to fresh zeros (same as Memory — per-cycle boost, permanent ownership).

Gate-exempt alongside Boosters/Guide/More (`GATE_EXEMPT_PAGES` includes `'compute'`).

### Prestige Points, autobuyer unlock, and the tickspeed multiplier

Prestiging awards **Prestige Points (PP)**, a permanent, cumulative currency (`prestige.points`) that
never resets and stacks across every future prestige (see `docs/DESIGN_HISTORY.md` for why this
replaced direct production doubling). `getPrestigePointsAwarded(money, doublePpLevel)` requires Money ≥
`PRESTIGE_THRESHOLD` (1 Googol Bytes in Bits); below that it returns 0. At threshold it awards at
least 1 PP, then 1 PP per `PRESTIGE_POWERS_PER_PP_BASE` (64) additional money-exponent powers beyond
Googol's own 10^100 exponent — scaled by permanent Double PP upgrades (`prestigeDoublePpLevel`: each
level halves powers-per-PP until 1, then doubles PP-per-power; cost `100^(level+1)` PP via
`buyPrestigeDoublePp`). `prestigeGame` adds newly-awarded points on top of any already-unspent balance.

Before `prestige.count` reaches `PRESTIGE_UNBOUNDED_MIN_COUNT` (100), reaching `PRESTIGE_THRESHOLD`
freezes production until Prestige (`isProductionFrozen`). At/after 100 lifetime prestiges,
`isUnboundedPrestigeUnlocked` — production continues past 1 Googol Bytes and Prestige is voluntary to
claim accumulated PP. The latch is stored permanently on `prestige.unboundedUnlocked` (set by
`prestigeGame` the first time `prestige.count` crosses 100, never cleared by Era ascension — full
save Reset only).

### Era ascension and Eons (#407)

**Era** is the meta-prestige layer above ordinary Prestige. **Eons** are the meta currency (display
"1 Eon", "2 Eons"). Era ascension is **voluntary** — no production freeze at the threshold.

**Eligibility:** `isEraEligible(state)` when unspent `prestige.points >= ERA_ELIGIBILITY_PP`
(`GOOGOL` — 1 Googol PP balance, not lifetime earned).

**Award:** `getEonsAwarded(state)` returns `1 + eonAmplifierLevel * EON_AMPLIFIER_AWARD_PER_LEVEL`
(Eon Amplifier shop upgrade deferred to #414).

**On `eraGame` — resets:** full Foundry (generator upgrades, Memory/gate, Disks, compute ladder
entities, `intro.foundryResetCaps`), ordinary Ladder cycle (same fields as `prestigeGame`),
`prestige.points`/`count`/`prestigeDoublePpLevel` → 0, `computeFlops.owned` → 0,
`computeFlops.cumulativeBoost` fresh. Keeps `intro.byteCreated` if already combined.

**On `eraGame` — persists:** automation unlocks + pause flags (except Double PP level, which resets),
tier/tickspeed autobuyer milestone objects, `prestige.unboundedUnlocked`, museum, `era.count` (+1),
Eons balance (+ award), hyperscalers, Eon upgrade levels, Flops autobuyer unlock flags,
`computeFlops.pageUnlocked`.

**Flops autobuyer milestones:** Era *N* free-unlocks the *N*th Flops tier's autobuyer
(`getFlopsAutobuyerUnlockEra`, applied in `eraGame` via `applyFlopsAutobuyerMilestones`).
`tickComputeFlopsAutobuyers` runs inside `tickGame` after `tickComputeFlops`.

**Hyperscalers:** `buyHyperscaler` spends escalating Eons (`HYPERSCALER_EON_COST_BASE` ×
`HYPERSCALER_EON_COST_MULTIPLIER^owned`). Each adds permanent rate via
`getHyperscalerFlopsBoostRate`, folded into `getComputeFlopsTierProductionMultiplier` alongside
per-cycle `cumulativeBoost`. Hyperscaler Efficiency levels add
`HYPERSCALER_EFFICIENCY_RATE_BONUS_PER_LEVEL` per hyperscaler (shop deferred to #414).

**Hook:** `actions.eraAscend()` / `actions.buyHyperscaler()` / `setComputeFlopsAutobuyerEnabled`
in `useIncrementalGame.js`. UI trigger deferred to #411. `mergeState` also calls
`applyFlopsAutobuyerMilestones` on load so `era.count` backfills Flops autobuyer unlocks.

Unspent PP has one passive effect (gated behind a one-time unlock) and five active uses. Tier
autobuyer unlock and the tier tickspeed autobuyer are **not** among them any more — they unlock
automatically at a prestige-count milestone instead (see "Tier autobuyer/tier-tickspeed-autobuyer
milestones" below), spending no PP at all.

- **Passive (gated):** `getPrestigeProductionMultiplier(points) = 1 + PRESTIGE_POINT_SPEED_BONUS *
  points` (`PRESTIGE_POINT_SPEED_BONUS = 0.01`) — +1% production speed per unspent point, applied
  uniformly to every tier in `tickGame`. A pure formula, not auto-applied — inert (every caller uses a
  flat ×1) until `state.prestigeSpeedBonusUnlocked` is true.
- **Active — Double PP:** `buyPrestigeDoublePp(state)` permanently spends `getPrestigeDoublePpUpgradeCost(level)`
  PP (`100^(level+1)` — 100, 10_000, 1_000_000, …) to increment `prestigeDoublePpLevel`. Not blocked
  by production freeze. Halves powers-per-PP through level 6, then doubles PP-per-power.
- **Active — unlock the speed bonus:** `buyPrestigeSpeedBonus(state)` permanently spends
  `PRESTIGE_SPEED_BONUS_UNLOCK_COST` PP (`10000` — the priciest of the four global PP automation
  unlocks, since it's passive/always-on) to set `prestigeSpeedBonusUnlocked = true`. No-op if already
  unlocked, insufficient points, or frozen.
- **Active — Smart:** `buySmartAutobuyer(tierId)` permanently spends PP to make a tier's autobuyer buy
  singly until 10 lifetime purchases (then revert to normal full-block batching) — **requires the
  autobuyer already unlocked** (enforced in the engine), since it specifically optimizes unit-buying
  behavior. Cost `getSmartAutobuyerCost(tierId) = SMART_AUTOBUYER_COST_MULTIPLIER *
  getAutobuyerUnlockCost(tierId)` (`SMART_AUTOBUYER_COST_MULTIPLIER = 10` — 10 PP through 100 PP across
  the ten tiers, still a real PP cost even though `getAutobuyerUnlockCost` itself is now only a
  historical pricing benchmark — see below). `state.smartAutobuyer[tierId]` is permanent across
  prestige (unlike `purchased`, which resets each run and re-triggers the one-at-a-time bootstrap each
  time). Independent of the tier tickspeed autobuyer, which is milestone-unlocked separately (below).
- **Active — Auto Speed Up:** `buyAutoSpeedUp(state)` permanently spends `AUTO_SPEED_UP_COST` PP (`20`
  — cheaper than `PRESTIGE_SPEED_BONUS_UNLOCK_COST`/`AUTO_PRESTIGE_COST` since Speed Up fires far more
  often, but pricier than `TICKSPEED_AUTOBUYER_COST` below, since the global tickspeed multiplier it
  automates is a much smaller, earlier-game upgrade than Speed Up) to set `autoSpeedUp = true`. Once
  bought, `tickGame` calls `speedUpGame` every tick (edge-triggered, re-validating eligibility
  internally) whenever `autoSpeedUpEnabled` is also true (see "Pause/resume for the three global
  automations" below). No-op if already bought, insufficient points, or frozen. Permanent — never reset.
- **Active — Tickspeed Autobuyer:** `buyTickspeedAutobuyer(state)` permanently spends
  `TICKSPEED_AUTOBUYER_COST` PP (`10` — the cheapest of all four global PP automation unlocks, since
  the global tickspeed multiplier it automates is a much smaller, earlier-game upgrade — unlocked as
  soon as the second tier is owned — than what any of the other three automate) to set
  `autoGlobalTickspeed = true`. Same one-time-unlock pattern as Auto Speed Up rather than Auto-Prestige's
  leveled one, since there's no cadence to speed up here either: once bought, `tickGame` calls
  `buyGlobalTickspeedMultiplier` every tick (edge-triggered, re-validating its own eligibility
  internally — a no-op unless `isGlobalTickspeedMultiplierUnlocked` and there's enough Money) whenever
  `autoGlobalTickspeedEnabled` is also true. This only
  automates the *clicking* — it doesn't change what currency the multiplier costs or its unlock
  prerequisite. No-op if already bought, insufficient points, or frozen. Permanent — never reset.
- **Active — Auto-Prestige:** `buyAutoPrestige(state)` activates (`null` → 1) or upgrades (N → N+1) a
  single global track. Cost doubles each level — `getAutoPrestigeCost(currentLevel) = AUTO_PRESTIGE_COST
  * AUTO_PRESTIGE_COST_MULTIPLIER^currentLevel` (`AUTO_PRESTIGE_COST = 1000`,
  `AUTO_PRESTIGE_COST_MULTIPLIER = 2`). Once active and `autoPrestigeEnabled` is also true, `tickGame`
  accumulates a global
  `autoPrestigeAttemptBudget` every tick (frozen or not) by `getAutoPrestigeAttemptRate(level) *
  elapsedSeconds` (`getAutoPrestigeAttemptRate(level) = 1.1^(level - 1) /
  AUTO_PRESTIGE_BASE_INTERVAL_SECONDS`, `AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000` — level 1 fires
  roughly every 1000 real seconds, each level 10% sooner, compounding) — but the completed attempt
  (budget ≥ 1) only actually calls `prestigeGame` once Money has *also* reached `PRESTIGE_THRESHOLD`.
  While production is frozen (`isProductionFrozen`), the attempt banks past 1 rather than losing it.
  At/after 100 lifetime prestiges (`isUnboundedPrestigeUnlocked`), a separate end-of-tick branch
  fires Auto-Prestige while production keeps running. No-op if PP is short or already frozen. `state.autoPrestige` (the level) is permanent; `autoPrestigeAttemptBudget`
  resets to 0 on every prestige (manual or automatic), same as `autobuyerAttemptBudgets`.
- **Active — Auto-Prestige Autobuyer:** `buyAutoPrestigeAutobuyer(state)` permanently spends
  `AUTO_PRESTIGE_AUTOBUYER_COST` PP (`100` — a "meta-automation" that automates RE-LEVELING
  Auto-Prestige itself, distinct from activating it in the first place; priced below
  `AUTO_PRESTIGE_COST`'s own initial-activation cost since the clicks it saves are already rare — each
  Auto-Prestige level doubles in cost — but above the two cheaper Money-funded autobuyer toggles above,
  since it's gated behind `allTiersFullyAutomated`, a genuinely late-game convenience) to set
  `autoPrestigeAutobuyer = true`. No-op if Auto-Prestige hasn't been activated at all yet
  (`state.autoPrestige` is still `null` — this automates RE-leveling only, not the initial activation),
  if already bought, insufficient points, or frozen. Once bought and `autoPrestigeAutobuyerEnabled` is
  also true, `tickGame` calls `buyAutoPrestige` once per tick, edge-triggered, re-validating its own
  eligibility internally (no rate-accumulating budget, unlike Auto-Prestige's own attempt budget above)
  — the same convention as the per-tier/global tickspeed self-upgrade steps. No-op if already bought,
  insufficient points, or frozen. Permanent — never reset.

The global tickspeed multiplier itself (`buyGlobalTickspeedMultiplier`, see below) is *not* one of
these PP-spent active uses, despite superficially mirroring Auto-Prestige's null/level pattern — it's
Money-funded instead, with its own unlock prerequisite (owning the second tier) unrelated to Prestige
Points at all. Only its *automation toggle*, Tickspeed Autobuyer (`buyTickspeedAutobuyer`, one of the
five bullets above), is PP-funded.

#### Tier autobuyer/tier-tickspeed-autobuyer milestones

Unlike every other automation above, a tier's unit-buying autobuyer and its own tickspeed autobuyer
are **not PP purchases at all** — they unlock automatically once `prestige.count` reaches a
per-tier milestone, no PP spent, no button to click:

- `getAutobuyerUnlockMilestone(tierId) = AUTOBUYER_UNLOCK_MILESTONE_START + tierIndex *
  AUTOBUYER_UNLOCK_MILESTONE_STEP` (`1`, `1`) — tier01 unlocks its autobuyer after the very first
  prestige, tier02 after the second, … tier10 after the tenth. An unrecognized tier id is treated
  as index 0.
- `getTierTickspeedAutobuyerMilestone(tierId) = TIER_TICKSPEED_AUTOBUYER_MILESTONE_START + tierIndex
  * TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP` (`12`, `2`) — tier01's own tickspeed autobuyer unlocks
  at prestige 12, tier02 at 14, … tier10 at 30 — later and slower-spaced than the unit-buying
  autobuyer above, reflecting that it's a further-out convenience layered on top.
- `applyAutobuyerMilestones(state)` is the pure function that actually does the unlocking: for every
  tier whose milestone is met by `state.prestige.count` and isn't already unlocked, it sets
  `autobuyers[tierId] = 1` and/or `tierTickspeedAutobuyer[tierId] = true`. Never revokes anything
  already unlocked (by this or the historical PP-cost path some saves may still carry), and returns
  the same state reference if nothing newly qualifies — safe to call repeatedly since
  `prestige.count` only ever grows. Called from `prestigeGame` right after incrementing `count` (so
  the very prestige that crosses a milestone unlocks it immediately).
- `getAutobuyerUnlockCost(tierId)` still exists (`AUTOBUYER_UNLOCK_BASE_COST * (tierIndex + 1)`,
  `AUTOBUYER_UNLOCK_BASE_COST = 1` — 1 PP-equivalent for the first tier, up through 10 for the
  10th/last) but is no longer an actual purchase cost — it's kept purely as the pricing benchmark
  `getSmartAutobuyerCost` multiplies, unchanged so Smart's own cost didn't shift when Unlock itself
  became free. `getTierTickspeedAutobuyerCost` and `TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER` were
  removed entirely — nothing else needed that formula once the tier tickspeed autobuyer itself
  stopped costing PP.
- `MainPage` surfaces this on two surfaces: a locked tier's row on the PP Upgrades page's "Tier
  Autobuyers" category shows a dimmed `🔒 Prestige {milestone}` badge in place of what used to be a
  Buy button (Smart, still PP-funded, is unaffected and renders alongside once the autobuyer itself
  is unlocked); the dedicated **Milestones** view (`view === 'milestones'`, a third `ViewNav` tab
  alongside Game/Upgrades, gated on `!isFirstRun` the same way) lists every tier's status for both
  tracks in full — a green `✅ Prestige {milestone}` badge once reached, or a dimmed `🔒` badge plus a
  `role="progressbar"` (`aria-valuenow = min(prestige.count, milestone)`) while still pending.

#### Pause/resume for the global automations

Each of the four automations above (Auto Speed Up, the global Tickspeed Autobuyer, the Auto-Prestige
Autobuyer, Auto-Prestige) splits "has this ever been bought" (the permanent fields documented above —
`autoSpeedUp`/`autoGlobalTickspeed`/`autoPrestigeAutobuyer`/`autoPrestige`, all unaffected by this
feature) from a separate, independently toggleable "is this currently allowed to act" bit:
`autoSpeedUpEnabled`/`autoGlobalTickspeedEnabled`/`autoPrestigeAutobuyerEnabled`/`autoPrestigeEnabled`
(`layers.js`/`engine.js`), each defaulting to `true` the moment its parent automation is bought and
**itself also permanent** — never reset by Prestige or Speed Up, since pausing is a standing player
preference, not run-scoped state (`prestigeGame`/`speedUpGame` carry all four through unchanged, the
same way they already carry `autoSpeedUp`/`autoGlobalTickspeed`/`autoPrestigeAutobuyer`/`autoPrestige`
through). `setAutoSpeedUpEnabled(enabled)`/`setAutoGlobalTickspeedEnabled(enabled)`/
`setAutoPrestigeAutobuyerEnabled(enabled)`/`setAutoPrestigeEnabled(enabled)` (all `state → state`) are
unconditional — **not** gated by `isProductionFrozen`, since toggling a preference isn't a purchase and
should always be possible — and each is a no-op (returns the same state) if its automation hasn't been
bought yet (nothing to enable/disable before that). `tickGame` gates each automation's existing per-tick
behavior on its `...Enabled` flag in addition to the existing unlock check (`?? true` for a save
predating this feature — see `storage.js` below): a paused automation behaves exactly as if it had
never been bought, for automation purposes only — the level/PP already spent are untouched, and (for
Auto-Prestige) the manual Prestige button keeps working regardless. Pausing Auto-Prestige stops both its
per-tick `autoPrestigeAttemptBudget` accumulation and its automatic `prestigeGame` firing, not just the
firing. `MainPage`'s PP Upgrades page renders a small secondary pause/resume toggle button
(`aria-pressed`-driven, `PauseToggleButton`) beside each of the four icon-only status badges/levels in
the Global Automation category once that automation is bought — see "PP Upgrades view" above.

#### Pause/resume for per-tier automations

The same "unlocked vs. enabled" split above applies independently to the two **per-tier** automations
— the unit-buying autobuyer (`autobuyers[tierId]`) and the tier tickspeed autobuyer
(`tierTickspeedAutobuyer[tierId]`) — via two new permanent per-tier state fields,
`autobuyersEnabled`/`tierTickspeedAutobuyerEnabled` (`engine.js`'s `createInitialGameState`, both
defaulting to `true` for every tier). `setAutobuyerEnabled(tierId, enabled)`/
`setTierTickspeedAutobuyerEnabled(tierId, enabled)` (both `state → state`) follow the exact same
convention as the four global setters above: unconditional (not gated by `isProductionFrozen`), and a
no-op if that tier's corresponding automation hasn't been unlocked/bought yet (`autobuyers[tierId] ==
null` / `!tierTickspeedAutobuyer[tierId]`). `tickGame` gates the per-tier unit-autobuyer
purchase-attempt loop on `autobuyersEnabled[tier.id] ?? true` in addition to its existing
`autobuyers[tier.id] != null` check — while paused, the whole per-tier reduce step is skipped, so the
attempt budget (`autobuyerAttemptBudgets[tier.id]`) stops accumulating too, exactly like the global
automations' own paused behavior; manual Buy is unaffected. The tier tickspeed self-upgrade loop is
gated the same way on `tierTickspeedAutobuyerEnabled[tier.id] ?? true`, alongside its existing
`tierTickspeedAutobuyer[tier.id]` check — this also covers the last tier's XP-funded branch (see "The
last tier's XP-funded tickspeed" below), since that branch is reached through the same gated reduce
step; manual `buyTickspeedMultiplier`/the "🧬 XP" button are unaffected either way.
`prestigeGame`/`speedUpGame` carry both fields through unchanged, same permanence as
`autobuyers`/`tierTickspeedAutobuyer` themselves. **Smart (`smartAutobuyer[tierId]`) has no pause
toggle** — it's a batch-size behavior modifier for the unit autobuyer (buy singly until a level
completes, then in full blocks), not something that independently "acts" each tick, so "pausing" it
has no clean meaning distinct from "temporarily not being smart." `mergeState` merges missing
`autobuyersEnabled`/`tierTickspeedAutobuyerEnabled` keys from fresh defaults (`true` for every tier)
but does not transform legacy save formats. See "Unit autobuyer status (Ladder view, per tier)" above and the Tier Autobuyers category in "PP Upgrades
view" above for where each toggle renders.

XP (`prestige.xp`) has otherwise been removed from the UI — see `docs/DESIGN_HISTORY.md`; the
underlying earning mechanic (`checkMilestones`) is untouched in `engine.js`. Its one exception is
"The last tier's XP-funded tickspeed" below, where it's spent directly.

#### Tickspeed multiplier

Not to be confused with "Tier production tickspeed" above (though the two now compose directly — see
there) — the **tickspeed multiplier** is a Money-funded, per-tier level where each level speeds up how
*often* that tier delivers a production batch by another 10%, with no effect on the size of any single
batch and no effect on autobuyer purchase-attempt frequency (see `docs/DESIGN_HISTORY.md` for why
frequency and production were decoupled, and why this factor now shrinks the delivery period instead of
scaling the delivered amount). It's tracked in its own `state.tickspeedLevels[tierId]` field (default 1,
the baseline no-bonus level, for every tier — see "Game state shape" below), buyable by default from the
moment the tier itself unlocks — no autobuyer unlock or PP prerequisite of any kind; only the
*automatic* self-upgrading of this level is PP-gated (see `tierTickspeedAutobuyer` above).

- `getTickspeedMultiplierBaseCost(tierIndex) = 10 ** (TICKSPEED_MULTIPLIER_BASE_EXPONENT - tierIndex)`
  (`TICKSPEED_MULTIPLIER_BASE_EXPONENT = 10`) — 10^10 for tier index 0, down to 10^1 for index 9.
- `getTickspeedMultiplierCost(tierId, targetLevel) = getTickspeedMultiplierBaseCost(tierIndex) **
  (targetLevel - 1)` — the resource cost, in that tier's own resource, to reach `targetLevel`: level 1
  (the free baseline) costs nothing, the first real purchase (level 1 → 2) costs exactly the tier's base
  cost itself, and each level after that multiplies by another factor of the base. Money-funded only —
  `getAutobuyerUnlockCost` (above) no longer reuses this ladder; it has its own much smaller, independent
  PP formula.
- `getTickspeedProductionMultiplier(level) = (1 + TICKSPEED_PRODUCTION_STEP) ** (level - 1)`
  (`TICKSPEED_PRODUCTION_STEP = 0.1`) — level 1 is baseline ×1; `null`/level ≤ 1 also treated as ×1. Despite
  its name, this factor is no longer multiplied directly into a production credit — see
  `getEffectiveTierTickSpeedSeconds` below, which divides it into the tier's base tickspeed instead.
- `buyTickspeedMultiplier(tierId)` spends the tier's own resource to raise `tickspeedLevels[tierId]` by
  1 — requires only that the tier itself be unlocked and `available >= cost + 1` (not just `>= cost`,
  since paying the exact cost would zero out the tier's own generator count). Called both manually and
  — for every tier whose tier tickspeed autobuyer is bought (`tierTickspeedAutobuyer[tier.id]`) —
  automatically by `tickGame`, once per tick, whenever affordable.

#### The global tickspeed multiplier

A **Money-funded** (not PP-funded) global counterpart to the per-tier tickspeed multiplier above —
instead of speeding up one tier's delivery frequency, it speeds up *every* tier's delivery frequency
at once (again with no effect on the size of any single delivery). Every level compounds
`GLOBAL_TICKSPEED_PRODUCTION_STEP` (1%, the same regular per-level growth the per-tier multiplier's
own step is themed on), **except** a milestone level, which compounds
`GLOBAL_TICKSPEED_MILESTONE_STEP` (10%) instead of the regular 1% for that one level — still fully
multiplicative, not additive. The milestone *spacing* itself widens by a factor of ten every time
the level crosses another power-of-ten range: every 10th level up to 100 (10, 20, …, 100 — 10
milestone levels), then every 100th level from 100 to 1000 (200, 300, …, 1000 — 9 more milestone
levels), then every 1000th level from 1000 to 10000, and so on indefinitely. A single leveled
upgrade track (not per-tier), mirroring Auto-Prestige's `null`/level pattern, and lives on the Game
view as its own `GlobalTickspeedCard` (see docs/MAINPAGE_REFERENCE.md) rather than on the PP
Upgrades page or any individual tier row — it has nothing to do with Prestige Points or having ever
prestiged.

- `isGlobalTickspeedMultiplierUnlocked(state) = owned[TIER_DEFINITIONS[1].id] >= 1 ||
  globalTickspeedMultiplier != null` — gates the *initial* activation on owning at least 1 of the
  second tier (so Money can't be spent on this before `tier01`'s own cost/production resource has a
  second income source backing it); once active this stays true even if `tier02`'s owned count is
  later reset to 0 by a Prestige/Speed Up — the check never revokes an already-active level.
- `getGlobalTickspeedMultiplierCost(currentLevel) = 10 ** (currentLevel + 1)` — `currentLevel` is the
  level *before* the purchase (`null`/not-yet-bought treated as 0): 10 Money to activate (level 0 → 1),
  100 Money for the next level, 1000 after that, and so on — spent from the same base-currency balance
  as buying tiers themselves (`resources[MONEY_ID]`), with no "leave 1 behind" reserve, since Money isn't
  itself an "owned" generator count (same as `buyTier`).
- `getGlobalTickspeedProductionMultiplier(level, overclockCount = 0)`: let `milestoneLevels =
  countGlobalTickspeedMilestones(level)`, `regularLevels = level - milestoneLevels`,
  `overclockFactor = getOverclockMultiplier(overclockCount)`, `regularStep =
  GLOBAL_TICKSPEED_PRODUCTION_STEP * overclockFactor`, `milestoneStep =
  GLOBAL_TICKSPEED_MILESTONE_STEP * overclockFactor`; returns `(1 + regularStep) ** regularLevels *
  (1 + milestoneStep) ** milestoneLevels` (`GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01`,
  `GLOBAL_TICKSPEED_MILESTONE_STEP = 0.10`; `null`/never-bought treated as level 0, i.e. no bonus,
  ×1, regardless of `overclockCount`). `overclockCount` (see "Overclock" below) permanently raises
  both `regularStep` and `milestoneStep` above their defaults, multiplicatively — ×1.1 per claimed
  level, compounding.
  `countGlobalTickspeedMilestones` (a module-private helper in `engine.js`) counts how many of the
  levels up to `level` are milestone levels: spacing starts at 10 (levels 10, 20, …, 100 — 10
  milestones by level 100), then widens to 100 once past level 100 (200, 300, …, 1000 — 9 more
  milestones by level 1000), then to 1000 past level 1000, and so on — each range contributes one
  milestone per multiple of its spacing, and the boundary level itself (100, 1000, …) is only ever
  counted once, as the last milestone of the *narrower* spacing, not again as the first of the wider
  one. Every level compounds *something* — a regular level compounds `regularStep`, a milestone
  level compounds the 10% step instead — so unlike a purely milestone-gated design, the bonus keeps
  growing (fractionally) between milestones too, and a milestone is a *bigger* compounding step at
  that level rather than an isolated bonus. Divided directly into `getEffectiveTierTickSpeedSeconds`
  for every tier alongside that tier's own tickspeed multiplier (see "Tier production tickspeed"
  above) — not multiplied into the production credit itself.
- `buyGlobalTickspeedMultiplier(state)` spends Money to raise the level by 1 — a no-op if
  `isProductionFrozen`, if `isGlobalTickspeedMultiplierUnlocked` is false, or if there isn't enough
  Money. `state.globalTickspeedMultiplier` (the level) **resets to `null` (not-yet-bought) on both a
  real Prestige (`prestigeGame`) and Speed Up (`speedUpGame`)** — the same run-scoped reset the
  per-tier `tickspeedLevels` gets, since both are funded from the same Money balance prestige/Speed Up
  already wipe; unlike every other automation toggle/level in this section, which both leave
  untouched; see "Speed Up" below. The `autoGlobalTickspeed` automation toggle itself still carries over
  unchanged, so a Prestige or Speed Up with Tickspeed Autobuyer already bought just starts re-buying
  the level back up from scratch once Money allows.
- Clicking is optional: once `buyTickspeedAutobuyer` is bought (PP-funded, see "Prestige Points,
  autobuyer unlock, and the tickspeed multiplier" above), `tickGame` calls
  `buyGlobalTickspeedMultiplier` automatically every tick, so the level climbs on its own whenever
  Money allows — the manual button still works identically either way, since
  `buyGlobalTickspeedMultiplier` itself doesn't know or care whether it was called by a click or by
  `tickGame`.

#### The last tier's XP-funded tickspeed

Whenever the **last tier** (`TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]` — read structurally, not
hardcoded to `tier10`, so this stays correct if a future tier is ever appended) currently has **>=
`getPurchaseBlockSize(state)` owned** (a full level), its own Money-funded tickspeed multiplier (see
"Tickspeed multiplier" above) is replaced by an XP-funded one instead — the last tier has no
`buyTickspeedMultiplier` button of its own for as long as that holds. XP (`prestige.xp`) is otherwise
absent from the UI (see "Prestige Points, autobuyer unlock, and the tickspeed multiplier" below) — this
is its one purpose.

- `isLastTierTickspeedXpUnlocked(state) = owned[lastTierId] >= getPurchaseBlockSize(state)` — a
  **live** check against the last tier's current owned count, matching the same threshold every
  other tier's own unlock condition uses (see `isTierUnlocked`), deliberately not a permanent latch: a
  Prestige/Speed Up resets the last tier's `owned` count to 0 along with every other tier's (see
  `prestigeGame`/`speedUpGame` below), and this mechanic disengages right along with it — reverting
  the last tier's row back to the normal Money-funded tickspeed button — until the player buys back
  up to a full level, which re-engages it. There is no separate stored "ever unlocked" flag for this
  (unlike, say, `everUnlockedTierIds`) — the whole point is that it *should* turn back off when the
  player no longer actually has a full level of the tier.
- `state.lastTierXpConsumed` (run-scoped global counter, default `0`) is the cumulative total XP ever
  spent via `consumeXpForLastTierTickspeed` within the current run. Reset to 0 by both Prestige and
  Speed Up (same as `prestige.xp`, the currency that funds it — see `prestigeGame`/`speedUpGame`
  below) — never reset by `consumeXpForLastTierTickspeed` itself (it only ever grows within a run) —
  so the bonus it drives survives the mechanic being temporarily disengaged (owned dropping below a
  full level) and later re-engaged within the same run, but not a Prestige/Speed Up.
- `getLastTierXpTickspeedMultiplier(xpConsumed) = (1 + LAST_TIER_XP_TICKSPEED_STEP) ** xpConsumed`
  (`LAST_TIER_XP_TICKSPEED_STEP = 0.01`) — the same multiplicative, compounding form every other
  tier's own `(1 + TICKSPEED_PRODUCTION_STEP) ** (level - 1)` tickspeed multiplier uses, just keyed
  off cumulative XP consumed instead of a level: 37 XP consumed = `1.01^37` ≈ ×1.446, not a flat
  +37%. While
  `isLastTierTickspeedXpUnlocked`, `getEffectiveTierTickSpeedSeconds` uses this multiplier for the
  last tier in place of `getTickspeedProductionMultiplier(tickspeedLevels[lastTierId])` — the global
  tickspeed multiplier still applies on top exactly as it does for every other tier.
- `getLastTierXpTickspeedMinConsumption(xpConsumed) = max(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR,
  ceil(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT * xpConsumed))`
  (`LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT = 0.1`, `LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR
  = 1`) — a single `consumeXpForLastTierTickspeed` call must spend at least 10% of the cumulative XP
  already consumed this way (floored at 1 XP, since the percentage term alone is 0 before any XP has
  ever been consumed) — so repeat consumptions can't trickle in one XP at a time forever; the required
  minimum grows alongside however much has already been invested, mirroring the game's other
  escalating-cost patterns (`getTierCost`'s epoch multiplier, `getSpeedUpRequirement`).
- `consumeXpForLastTierTickspeed(amount)` spends `amount` XP from `prestige.xp`, adds it to
  `lastTierXpConsumed`, and — **every time, no matter how small the amount** — **resets the `owned`
  (and, to keep them in sync, `resources`) count of every tier *except* the last tier back to 0,
  plus the Money balance (`resources[MONEY_ID]`) back to 0** — i.e. tier 1 through the
  second-to-last tier's current *quantity* and the shared currency, not their `purchased` lifetime
  count ("level"). `purchased` is left completely untouched everywhere, including on the last tier
  itself — cost epochs and `getPurchaseMilestoneMultiplier` production bonuses are unaffected; the
  last tier's own `owned`/`resources` are untouched too. A no-op if not yet unlocked, if `amount`
  isn't a positive integer, if `amount` is below `getLastTierXpTickspeedMinConsumption`, if there
  isn't enough unspent XP, or while production is frozen.
- `buyTickspeedMultiplier(lastTierId)` is a no-op for as long as `isLastTierTickspeedXpUnlocked` holds
  — there's nothing for that button to do for the last tier while it does. It resumes working normally
  the moment owned drops back below a full level (e.g. after a Prestige/Speed Up).
- **Automation:** `tickGame`'s per-tier tickspeed self-upgrade loop (see `tierTickspeedAutobuyer`)
  repurposes the last tier's bought `tierTickspeedAutobuyer` flag once `isLastTierTickspeedXpUnlocked`
  is true — instead of calling the now-inert `buyTickspeedMultiplier(lastTierId)`, it calls
  `consumeXpForLastTierTickspeed(state.prestige.xp)` each tick, spending the tier's entire current XP
  balance — this automation is now the *only* way this mechanic ever fires; see "MainPage" below for
  why there's no manual trigger for it any more. This means a
  `tierTickspeedAutobuyer` flag bought *before* reaching XP-unlock — originally for its non-destructive
  Money-funded purpose — starts triggering automatic, periodic resets of every other tier's `owned`/
  `resources` and the Money balance the moment the last tier crosses the XP-unlock threshold; this
  trade-off is deliberate (no separate opt-in/confirmation for the automated path). Before
  `isLastTierTickspeedXpUnlocked`, the flag drives the ordinary `buyTickspeedMultiplier` auto-upgrade
  exactly as it does for every other tier — this only changes behavior once the threshold is crossed,
  and reverts the moment owned drops back below a full level.
- **MainPage**: while `isLastTierTickspeedXpUnlocked(state)`, the last tier's row swaps its normal
  `⚙ {cost} {symbol}` Money-funded tickspeed button for a quick-access **Speed Up** button
  (`⏩ ×{next}`, `actions.speedUp`) in the same grid slot — not a manual XP-consume control any more (an
  earlier version showed `🧬 {current unspent XP} XP` here, spending the player's entire current XP
  balance on click; that manual trigger was removed in favor of surfacing Speed Up in this slot instead,
  since reaching a full last-tier level is also exactly when Speed Up tends to become available). The
  underlying mechanic still fires — but now *only* via the tier tickspeed autobuyer (see "Automation"
  above), which spends the player's entire current XP balance each tick the same way the old manual
  button used to on click. `actions.consumeXpForLastTierTickspeed` remains a valid hook action (still
  callable, still fully engine-tested) — `MainPage` just no longer wires a button to it. The row's
  existing `⚙ +N%` badge and Details disclosure both still automatically reflect the XP-funded
  multiplier while engaged (they read `tickspeedMultiplier`, which the row computes from
  `getLastTierXpTickspeedMultiplier` instead of `getTickspeedProductionMultiplier` in this case); the
  Details disclosure additionally lists the current unspent XP balance and the minimum the next
  (automatic) consumption needs, under an "XP Tickspeed" line.

#### Multiplier overflow safety

`getLastTierXpTickspeedMultiplier` compounds `(1 + LAST_TIER_XP_TICKSPEED_STEP) ** xpConsumed` (see
above) against `lastTierXpConsumed`. `1.01 ** xpConsumed` overflows to `Infinity` around `xpConsumed ≈
71,333`; `lastTierXpConsumed` now resets to 0 on every Prestige/Speed Up (see `prestigeGame`/
`speedUpGame` above), which makes reaching that magnitude far less likely than when this guard was first
added (it would need a single run, between resets, to earn and spend that much XP), but the guard is
kept regardless as defense in depth — a sufficiently long single run could still in principle drive it
there. Dividing `getEffectiveTierTickSpeedSeconds`'s period by an `Infinity` multiplier would
give exactly `0`, and an unguarded `0` period corrupts `tickGame`'s accumulator math: `ticksElapsed =
accumulated / 0` becomes `Infinity`, and `accumulated - ticksElapsed * tickSpeed` becomes `Infinity * 0 =
NaN` — which, via `clampNonNegative` treating any non-finite value as `0`, permanently zeroes the
produced tier's `owned`/`resources` on every subsequent tick (not a one-off glitch; the `NaN` accumulator
never recovers on its own). `getEffectiveTierTickSpeedSeconds` guards against this by falling back to
`MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS` (`1e-9`) whenever the computed period is non-finite or `<= 0` —
see its own row in the function table below.

### Prestige and the Googol freeze

Reaching Money ≥ `PRESTIGE_THRESHOLD` (`layers.js`, `= GOOGOL * BITS_PER_BYTE` = 8e100 — "1 Googol
Bytes," expressed in Bits since `resources[MONEY_ID]` is Bits-denominated and a Byte is `BITS_PER_BYTE`
(8) Bits) freezes the entire economy. `GOOGOL` (1e100) itself is unchanged and still exported —
`getPrestigePointsAwarded`/`getMoneyExponent`/`getPrestigeProgressPercent` deliberately keep keying off
its own clean exponent rather than `PRESTIGE_THRESHOLD`'s messier one (an 8x constant factor is
negligible at this scale — see `docs/DESIGN_HISTORY.md`); only the actual freeze/Prestige *trigger*
uses `PRESTIGE_THRESHOLD`. `isProductionFrozen(state)` (`engine.js`) is the
single source of truth: once true, `tickGame` returns the same state unchanged *unless* Auto-Prestige is
bought, in which case it keeps accumulating `autoPrestigeAttemptBudget` and calls `prestigeGame` the
instant that budget crosses 1. Either way,
`buyTier`/`buyTickspeedMultiplier`/`buySmartAutobuyer`/`buyAutoPrestige`/`buyGlobalTickspeedMultiplier`/`consumeXpForLastTierTickspeed`
all no-op while frozen for manual purchases; `prestigeGame` is the only action able to change state.
`MainPage` reads `isProductionFrozen` to disable every other control while frozen.

How the Prestige control is presented depends on `prestige.count` (times ever prestiged), not
`prestige.points`:

- **First time ever** (`prestige.count === 0`): a mandatory `FullScreenOverlay`
  (`role="dialog" aria-modal="true"`) replaces the entire page, explaining what Prestige does, with a
  single auto-focused Prestige button and no dismiss control.
- **From the 2nd time onward**: a `TopPrestigeBar` (`position: fixed`, with a `TopPrestigeBarSpacer`
  reserving the same height so it never overlaps the `Header` underneath) shows a compact reminder +
  Prestige button over the disabled page. The bar's `flex-wrap: wrap` lets its reminder sentence wrap
  to two lines on narrow viewports, so the spacer's height (and `StickyBalances`' stuck offset when
  scrolled, see "Balances" above) is measured live off the bar's own `offsetHeight` via a
  `ResizeObserver` (`topPrestigeBarHeight` state) rather than assumed as a fixed single-line constant —
  a hardcoded height would silently let a wrapped two-line bar overlap the content below it. Falls back
  to a single-line default (60px, i.e. the old `3.75rem` constant) in environments without
  `ResizeObserver` (e.g. jsdom in tests).

There used to also be a bottom `PrestigeCard` (Ladder view) mirroring the analogous informational
`SpeedUpCard` below — it carried no Prestige button of its own (the PP header display, `PpHeaderCard`,
see "Balances (top HUD)" above, already doubles as the Prestige button once `canPrestige`), so it was
purely informational: prestige progress/award preview, prestiged count, unspent PP, and Auto-Prestige
status. It has been removed entirely as redundant with the `TopPrestigeBar`/`FullScreenOverlay`/
PP-header-as-button ways to trigger and observe Prestige — none of that information had anywhere else to
go for it to lose. Auto-Prestige's status line (`"Lv.{level} (every ~{interval}s)"`, `interval =
Math.round(1 / getAutoPrestigeAttemptRate(level))`, gated on `allTiersFullyAutomated &&
isAutoPrestigeActive`, prefixed with the dimmable `✦` `PpUpgradeBadge`) still shows on the PP Upgrades
page's Auto-Prestige row (see "PP Upgrades view" above) — Auto-Prestige's *control* lives there too,
gated on `allTiersFullyAutomated` — UI-only, `buyAutoPrestige`/`tickGame` don't check it.

### Speed Up

A more frequent, cheaper soft-reset than real Prestige, available well before Money reaches
`PRESTIGE_THRESHOLD`: once
the last tier (`tier10`) reaches that cycle's requirement — `getSpeedUpRequirement(speedUpCount) =
speedUpCount + 6`, a LEVEL target (raw level 6 — displayed level 5, see the display-offset paragraph
below — for the first activation, level 7/displayed 6 for the second, …), compared
against `state.purchaseLevels[lastTier.id]` — `speedUpGame` (`engine.js`) resets resources/owned/purchased (everything a fresh
`createInitialGameState()` would have) but permanently multiplies production speed by
`SPEED_UP_MULTIPLIER_BASE` (2) raised to `state.speedUpCount`, unconditional (no PP unlock needed), read
via `getSpeedUpMultiplier`. Each activation increments `speedUpCount` by 1, so the multiplier stacks: 1x
→ 2x → 4x → 8x → …, always doubling. See `docs/DESIGN_HISTORY.md` for why this mechanic and its
escalating requirement exist (empirically-confirmed stall + cost-curve dodge otherwise).

`speedUpGame`'s reset pattern otherwise mirrors `prestigeGame`'s, with one deliberate asymmetry:
`state.intro` (the Byte Foundry screen's own state — see "Byte Foundry" below) is carried over
completely untouched by Speed Up (and Overclock, below), Memory included — an intra-cycle soft
reset, not a new cycle — while a real Prestige resets Memory (`bits`/`productionAccumulator`) and
the completion gate every time, sending the player back through the gate, while still keeping the
Byte generator and its upgrades permanent (see "Byte Foundry" below and `prestigeGame`'s row in the
function table). An already-unlocked autobuyer stays permanently
active (its flag is untouched) and every tier's `tickspeedLevels`/`purchaseLevels`/
`purchaseLevelProgress` entries reset to their baseline (1/1/0 respectively), same
as `owned`/`purchased` — resetting `purchaseLevels` also resets `getPurchaseBlockSize` back down to
`DEFAULT_PURCHASE_BLOCK_SIZE`, since it's derived from the last tier's own level. `smartAutobuyer`/`tierTickspeedAutobuyer`/`autoPrestige`/
`prestigeSpeedBonusUnlocked`/`autoSpeedUp`/`autoGlobalTickspeed` (the automation toggles) all carry over
unchanged — but **`globalTickspeedMultiplier` (the level itself) resets to `null`**, same as its own
behavior across a real Prestige (see "The global tickspeed multiplier" above) — so neither a
repeatedly-Speed-Up'd nor a repeatedly-Prestiged run can keep stacking it for free.
`lastTierXpConsumed`/`prestige.xp` reset to 0 the same way (see "The last tier's XP-funded tickspeed"
above) — everything XP-related is run-scoped, not permanent meta-progression. `prestige.highestMilestone`
(the money-exponent watermark `checkMilestones` grants further XP against) resets to the fresh initial
value here too, same as `prestigeGame` — otherwise a fresh run (money reset to `MONEY_STARTING_AMOUNT`)
would earn no XP at all until money climbed back past wherever the previous run's peak left off. Unlike
`prestigeGame`: `prestige.points`/`count` are passed through completely untouched (Speed Up doesn't
award/spend PP), and the gate condition is `getTierPurchasedCount(lastTier) >=
getSpeedUpRequirement(speedUpCount)`, not `Money >= PRESTIGE_THRESHOLD` — also refuses while `isProductionFrozen`.
`speedUpCount` itself is run-scoped, NOT permanent: `speedUpGame` increments it by 1 on every
activation (stacking within a run), but **`prestigeGame` resets it back to 0** — a real Prestige is
the bigger, rarer reset, and Speed Up's stacking multiplier is meant to be rebuilt from scratch each
Prestige cycle rather than carried forward forever. `autoSpeedUp` (the automation toggle deciding
*whether* Speed Up fires automatically) is unaffected by this and still carries over permanently, so a
player who already bought it doesn't need to re-buy it after a Prestige — it just starts
re-accumulating `speedUpCount` from 0 on the next cycle. Can fire without a manual click once Auto
Speed Up is bought.

`MainPage` surfaces this as a `SpeedUpCard` (cyan accent; Ladder view only), rendered directly below
`TierList`, side by side with `OverclockCard` (inside a shared `SpeedCardsRow` flex row, wrapping to
stacked on narrow viewports) — `GlobalTickspeedCard` renders separately, alone at the top of the Game
view, since it's the one control relevant before the last tier is even reachable (see "Global Tickspeed
card" in docs/MAINPAGE_REFERENCE.md). Gated on `speedUpEverRevealed` (see docs/MAINPAGE_REFERENCE.md). A
quick-access copy of the same button also appears inline in the last tier's own row once that tier is
full — see "The last tier's XP-funded tickspeed" above. The button
(`SpeedUpButton`, sized to match the tier rows' own Buy/tickspeed button font size rather than the
larger default `Button` size) shows `⏩ ×{next} · Lv.{level}/{requirement}` — not a percentage, so the
player sees concretely what's still needed. `state.purchaseLevels[lastTier.id]` and
`getSpeedUpRequirement(speedUpCount)` are both internally 1-indexed so that "level 1" means "no
completed block yet" (see "The (configurable) purchase block size and tier levels" above); displayed
raw, that reads as an off-by-one to the player, so `MainPage` subtracts 1 from both
(`lastTierLevelDisplay`/`speedUpRequirementDisplay`) before rendering — the visible "Lv." and the
requirement sentence/`aria-label` ("Reach level N…"/"requires … level N") instead count completed
blocks directly: Lv.1 once the last tier finishes its first block (8 purchases at the default block
size), Lv.2 after two, and the first Speed Up requires reaching (displayed) level 5. The underlying
`purchaseLevels`/`getSpeedUpRequirement` values driving eligibility (`canSpeedUp`) are unchanged — only
the two numbers rendered to the player are shifted. The on-button `$progress` fill (`speedUpProgressPercent`)
is computed from these same displayed values, not the raw ones, so it reads 0% before any block is
completed rather than already partway filled. Enabled once the requirement is met and disabled
while frozen — no `window.confirm` guard, since this is beneficial not destructive. Once `!isFirstRun`
and `autoSpeedUp` bought, a static "⏩ Auto Speed Up active" note shows (the purchase button itself
lives on the PP Upgrades page).

### Overclock

A second, rarer soft-reset than Speed Up, sharing the same last-tier gate but with no fixed-step
ladder beyond a small floor: `getOverclockRequirement(overclockCount) = overclockCount *
OVERCLOCK_REQUIREMENT_STEP + 2` (`OVERCLOCK_REQUIREMENT_STEP = 1`) — level 2 for the first claim, level
3 for the second, level 4 for the third, … — the same +1-per-cycle shape `getSpeedUpRequirement` uses,
just without Speed Up's own display offset (see below). The `+2` floor (not `+1`/`+0`) is deliberate:
every tier's `purchaseLevels` starts at 1 (the tier's own un-purchased default), so a requirement of
exactly 1 would already be satisfied by a completely untouched last tier, making the first Overclock
claim of every cycle free — requiring level 2 means at least one real level of last-tier progress is
always needed first. A claim is gated on `state.purchaseLevels[lastTier.id]` reaching that
requirement, but **jumps straight to the last tier's current level rather than just the minimum
required** — see `overclockGame` below — so there's no fixed ladder to climb beyond that floor and
whatever the last tier's own (already steep) cost curve demands from there.
`overclockGame` (`engine.js`) does everything `speedUpGame` does — full
resources/owned/purchased/tickspeedLevels/purchaseLevels/purchaseLevelProgress reset, `globalTickspeedMultiplier`
reset to `null`, `lastTierXpConsumed`/`prestige.xp`/`prestige.highestMilestone` reset, every automation
toggle (`smartAutobuyer`/`tierTickspeedAutobuyer`/`autoPrestige`/`prestigeSpeedBonusUnlocked`/
`autoSpeedUp`/`autoGlobalTickspeed`) carried over unchanged, `prestige.points`/`count` passed through
untouched — **plus two differences**: it resets `speedUpCount` back to 0 (wiping Speed Up's own stacking
multiplier back to its 1x baseline, not just refusing to grow it further) instead of leaving it alone,
and it sets `overclockCount` to `state.purchaseLevels[lastTier.id]` (the last tier's level *at the
moment of the claim*) instead of leaving it untouched or merely incrementing it by 1 — since the
eligibility check already guarantees that level is `>= overclockCount + 1`, this is always at least a
+1 gain, and lets a player who claims late (e.g. last claimed at level 5, but the last tier has since
reached level 8) catch all the way up to level 8 in a single claim rather than needing three separate
ones. Refuses while `isProductionFrozen`, same as `speedUpGame`.

The reward is **not** a separate multiplier stacked alongside the (Money-funded) global tickspeed
multiplier — it permanently raises that multiplier's own per-level growth rate instead, and it does so
*multiplicatively*, compounding with every level claimed.
`getOverclockMultiplier(overclockCount) = (1 + OVERCLOCK_MULTIPLIER_STEP) ** overclockCount`
(`OVERCLOCK_MULTIPLIER_STEP = 0.1`) is the growth factor: ×1 with no claims, ×1.1 after the first,
×1.21 after the second, and so on. `getGlobalTickspeedProductionMultiplier(level, overclockCount = 0)`
multiplies **both** the regular step and the milestone step by this factor —
`regularStep = GLOBAL_TICKSPEED_PRODUCTION_STEP * getOverclockMultiplier(overclockCount)`,
`milestoneStep = GLOBAL_TICKSPEED_MILESTONE_STEP * getOverclockMultiplier(overclockCount)` — then
returns `(1 + regularStep) ** regularLevels * (1 + milestoneStep) ** milestoneLevels`. Because the
boosted rate is folded directly into the *existing* global tickspeed multiplier,
`getEffectiveTierTickSpeedSeconds` needs no separate third factor for Overclock — it still divides by
just the per-tier/XP-funded multiplier and the global tickspeed multiplier, and the latter's own value
already reflects whatever Overclock has done to it. A direct consequence: **Overclock has no effect at
all** while the global tickspeed multiplier is still at level 0/not yet bought — there's no level for the
boosted step to compound over — and any level already bought before an Overclock claim retroactively
compounds at the new, higher rate from then on, exactly like every other level (the boosted rate isn't
scoped to "levels bought after this point").

Two things distinguish this from the very first version of this mechanic, which also folded Overclock
into the global tickspeed track's own step (see `docs/DESIGN_HISTORY.md` for the full back-and-forth,
including a standalone-multiplier detour that was tried and then reverted back to folding): the step
now grows **multiplicatively** (×1.1 per level, compounding: 1% → 1.1% → 1.21% → …) rather than
additively (a flat percentage point added per activation), and the boost now applies to the
**milestone step too**, not just regular levels.

`overclockCount` itself sits one rung above `speedUpCount` in the reset hierarchy (Prestige > Overclock >
Speed Up): it's run-scoped like `speedUpCount`, but **survives an ordinary Speed Up** (`speedUpGame`
explicitly carries it over unchanged — see `speedUpGame`'s own return object) rather than resetting on
every soft-reset the way `speedUpCount` does. It resets to 0 only on a real Prestige (`prestigeGame`
doesn't list it among its carried-over fields, so it falls through to `createInitialGameState()`'s
default, same mechanism `speedUpCount` itself uses there) or on its own claim (`overclockGame` sets it
to the last tier's current level, same event that resets `speedUpCount`). There is no PP-funded "Auto
Overclock" automation (unlike Speed Up's `autoSpeedUp`) — Overclock is meant to be a deliberate,
occasional player decision given how much it costs the run (wiping Speed Up's bonus along with
everything else).

`MainPage` surfaces this as an `OverclockCard` (orange accent; Ladder view only), rendered directly below
`TierList`, side by side with `SpeedUpCard` inside the shared `SpeedCardsRow` flex row (see "Speed Up"
above) — not grouped with `GlobalTickspeedCard`, which renders separately at the top of the Ladder view.
Gated on `overclockEverRevealed` (see docs/MAINPAGE_REFERENCE.md), the same
progressive-disclosure pattern as `speedUpEverRevealed`. The button (`OverclockButton`, sized to match
`SpeedUpButton`/the tier rows' own Buy/tickspeed buttons) shows `⚡ {nextStep}%/lvl · Lv.{level}/{requirement}`
— e.g. `⚡ 2.14%/lvl · Lv.8/7` — where `{nextStep}` is the regular-step percentage that would result
from claiming right now (`1 + GLOBAL_TICKSPEED_PRODUCTION_STEP * getOverclockMultiplier(Math.max(lastTierLevel,
overclockRequirement))`, accounting for a catch-up jump past the bare minimum requirement, not just
`overclockCount + 1`), formatted as a percentage by reusing `formatGlobalTickspeedBonusPercent`'s
trimmed-decimal formatting (passing it `1 + step` as if it were a multiplier, since that function
already computes `(multiplier - 1) * 100`). Unlike Speed Up's own button, **this level/requirement
pair is NOT given the -1 "completed blocks" display offset** — `getOverclockRequirement`'s numbers are
shown exactly as `state.purchaseLevels[lastTier.id]` and the requirement itself already read, matching
the same raw level number the last tier's own Details disclosure shows, rather than introducing a
second, differently-offset "level" reading for the same underlying value. Enabled once the requirement
is met and disabled while frozen — no `window.confirm` guard, same rationale as Speed Up (beneficial,
not destructive).

### Prestige info is hidden until first prestige

Prestige Points don't exist as a concept for the player until `isFirstRun` (`prestige.count === 0`) is
false, so `MainPage` keeps every PP-related display/control out of the page during the first run:

- The top-level PP display `StatCard` and the PP Upgrades tab itself don't render until `!isFirstRun`.
- Once that page is reachable, every purchase on it shows immediately — no separate "reveal one by
  one" teaser gate. The only exceptions are real prerequisites: Auto-Prestige (1000 PP) stays behind
  `allTiersFullyAutomated` (a deliberate endgame gate, not a cost-ordering one), and per-tier
  Unlock/Smart/tier-tickspeed-autobuyer rows reveal per tier as each tier itself is reachable.
- The sticky PP header display (`PpHeaderCard`, unspent PP + production-speed suffix once
  `state.prestigeSpeedBonusUnlocked`) only renders once `!isFirstRun`.

The one exception is the first-ever `FullScreenOverlay` (shown the moment Money first reaches
`PRESTIGE_THRESHOLD`),
whose body text does explain what PP are — the introduction of the mechanic at exactly the moment it
becomes relevant. This is a `MainPage`-only presentation choice — `engine.js` computes/stores PP
identically regardless of `prestige.count`.

### Reset

The "↺ Reset active save…" button (`resetGame`, wipes the active save and starts a fresh game) is
always rendered in Settings → Danger zone. It gates the actual `resetGame()` call behind a native
`window.confirm(...)` prompt (`buildResetActiveSlotConfirmMessage`). Cancelling leaves state
untouched. On acceptance, alongside `resetGame()`, the App handler navigates back toward the default
page (`'game'`, which the Foundry gate then overrides until `mainGameUnlocked`).

A second Danger-zone control, **"↺ Reset Byte Foundry…"**, calls `resetByteFoundry` (also behind
`window.confirm` via `buildResetByteFoundryConfirmMessage`). It replaces `state.intro` with a fresh
`createInitialGameState().intro` — Memory → 0, Capacity → `INTRO_STARTING_CAPACITY`, Combine /
Invest / Bandwidth multipliers and Disks/Storage and every Compute ladder entity / boost /
auto-claim / auto-merge unlock / reveal latch wiped — so Foundry progress genuinely restarts from
scratch. It records high-water marks in `intro.foundryResetCaps` (Combine, Invest ladder progress,
per-size `disksBuiltTotal`, and Capacity itself). `tickFoundryResetConvenience` (from `tickGame`,
after Disk auto-fill) then auto-presses Combine, bit-funded Invest / Bandwidth, Disk Build, and
Capacity (Sacrifice) whenever their normal turn gates allow, capped at those highs — a convenience
so the player does not have to click every upgrade/build/Sacrifice button again. `intro.mainGameUnlocked`
is preserved when already true. Every non-`intro` field (Tiers, Prestige, automations, …) is left
unchanged. Unlike full Reset, it does not clear the save slot. Both Danger-zone actions stay
disabled while production is frozen at the Prestige threshold.

### Game state shape

```js
{
  resources:  { base: 10, tier01: 0, … },        // amount owned per resource id (keyed by costResourceId/MONEY_ID;
                                                  // 'base' is MONEY_ID, displayed as "Bits")
  owned:      { tier01: 0, tier02: 0, … },       // generator count per tier id (drives production)
  purchased:  { tier01: 0, tier02: 0, … },       // lifetime purchase count per tier id — display/back-compat
                                                  // only now; no longer drives cost scaling or production
                                                  // doubling (see purchaseLevels/purchaseLevelProgress below)
  purchaseLevels: { tier01: 1, tier02: 1, … },   // current level per tier id (1-indexed) — drives cost
                                                  // (getTierCost) and the purchase-milestone production
                                                  // doubling (getPurchaseMilestoneMultiplier). Tracked
                                                  // directly, incremented purchase-by-purchase in buyTier,
                                                  // NOT derived from `purchased` via division — the block
                                                  // size a level requires can change over a run (see
                                                  // getPurchaseBlockSize), so there's no fixed divisor to
                                                  // derive a level from after the fact. Resets to 1 for
                                                  // every tier on Prestige and Speed Up, same as owned/purchased
  purchaseLevelProgress: { tier01: 0, tier02: 0, … }, // how many of the current level's pieces are already
                                                  // bought — 0 up to (but not including) whatever
                                                  // getPurchaseBlockSize(state) currently is; reaching that
                                                  // value completes the level (see buyTier), resetting this
                                                  // back to 0 and advancing purchaseLevels[tierId] by 1.
                                                  // Resets to 0 for every tier on Prestige and Speed Up
  autobuyers: { tier01: null, tier02: null, … }, // null = not yet unlocked (see
                                                  // applyAutobuyerMilestones — a free, permanent,
                                                  // prestige-count-milestone-triggered unlock, no PP
                                                  // cost and no Money-funded activation path); once
                                                  // unlocked, a plain truthy flag —
                                                  // its value no longer means anything beyond "unlocked"
                                                  // (see tickspeedLevels below for the actual tickspeed
                                                  // level, tracked independently). An unlocked tier
                                                  // self-buys units automatically every tick; never reset
                                                  // by prestige/Speed Up
  autobuyersEnabled: { tier01: true, tier02: true, … }, // permanent per-tier flag, default true: whether
                                                  // this tier's unit-buying autobuyer (once unlocked, see
                                                  // autobuyers above) currently acts — split "unlocked"
                                                  // from "enabled" the same way the global automations'
                                                  // own *Enabled fields do (see "Pause/resume for
                                                  // per-tier automations" below). Meaningless (a no-op to
                                                  // toggle, see setAutobuyerEnabled) while
                                                  // autobuyers[tierId] is still null. Never reset by
                                                  // prestige/Speed Up
  tickspeedLevels: { tier01: 1, tier02: 1, … },  // per-tier level for that tier's own
                                                  // Money-funded tickspeed multiplier (see
                                                  // getTickspeedProductionMultiplier/buyTickspeedMultiplier
                                                  // — speeds up delivery frequency, not the amount
                                                  // delivered) — starts at 1 (baseline, no speed bonus) and
                                                  // is buyable from the moment the tier itself is unlocked,
                                                  // with no PP prerequisite and no bearing from autobuyers
                                                  // above. Resets to 1 for every tier on Prestige and Speed
                                                  // Up, same as owned/purchased
  autobuyerAttemptBudgets: { tier01: 0, tier02: 0, … }, // fractional purchase-attempt budget per tier accumulated
                                                          // each tick at a flat rate of 1 (independent of
                                                          // tickspeed level) and drained
                                                          // by 1 per successful autobuyer purchase — see tickGame
  smartAutobuyer: { tier01: false, tier02: false, … },   // permanent per-tier flag: PP spent to make this
                                                          // tier buy singly until 10 purchases then in blocks
                                                          // of 10 (see buySmartAutobuyer) — never reset by prestige
  tierTickspeedAutobuyer: { tier01: false, tier02: false, … }, // permanent per-tier flag: whether this
                                                          // tier's own tickspeed multiplier upgrades
                                                          // itself automatically — unlocked automatically
                                                          // at its own (later) prestige-count milestone
                                                          // (see applyAutobuyerMilestones/tickGame), no PP
                                                          // cost, no autobuyer-unlock prerequisite,
                                                          // independent of smartAutobuyer above; never
                                                          // reset by prestige
  tierTickspeedAutobuyerEnabled: { tier01: true, tier02: true, … }, // permanent per-tier flag, default
                                                          // true: whether this tier's tier tickspeed
                                                          // autobuyer (once bought, see
                                                          // tierTickspeedAutobuyer above) currently acts —
                                                          // split "unlocked" from "enabled" the same way
                                                          // autobuyersEnabled splits from autobuyers above
                                                          // (see setTierTickspeedAutobuyerEnabled). Never
                                                          // reset by prestige/Speed Up
  tierProductionAccumulators: { tier01: 0, tier02: 0, … }, // fractional seconds banked per tier toward its next
                                                          // production batch, incremented every tick by
                                                          // elapsedSeconds and drained once it crosses that
                                                          // tier's getTierBaseTickSpeedSeconds — see "Tier
                                                          // production tickspeed" above. Resets to 0 on every
                                                          // prestige, same as autobuyerAttemptBudgets
  autoPrestige: null,                                    // permanent GLOBAL level (not per-tier — only one to
                                                          // buy/upgrade), null = not yet bought: how many times
                                                          // PP have been spent to make Prestige automatic and
                                                          // faster (see buyAutoPrestige/tickGame) — never reset
  autoPrestigeEnabled: true,                             // permanent GLOBAL flag, default true: whether
                                                          // Auto-Prestige (once bought — see autoPrestige above)
                                                          // currently acts — split "unlocked" from "enabled" so
                                                          // pausing doesn't lose the level/PP invested (see
                                                          // setAutoPrestigeEnabled/tickGame, "Pause/resume for
                                                          // the global automations" above). Meaningless
                                                          // (a no-op to toggle) while autoPrestige is null; never
                                                          // reset by Prestige/Speed Up, same permanence as
                                                          // autoPrestige itself
  globalTickspeedMultiplier: null,                       // RUN-SCOPED GLOBAL level (not per-tier — only
                                                          // one to buy/upgrade, mirroring autoPrestige
                                                          // above), null = not yet bought: how many times
                                                          // Money (not PP) has been spent on the global
                                                          // tickspeed multiplier, speeding up EVERY tier's
                                                          // delivery frequency by another 1% per level, not
                                                          // the amount delivered (see
                                                          // getGlobalTickspeedProductionMultiplier/
                                                          // buyGlobalTickspeedMultiplier) — reset to null by
                                                          // both a real Prestige and Speed Up (see
                                                          // prestigeGame/speedUpGame/"Speed Up" above), same
                                                          // as tickspeedLevels — unlike every other
                                                          // permanent automation toggle/level in this state
                                                          // shape, which both leave untouched
  autoPrestigeAttemptBudget: 0,                          // fractional Auto-Prestige attempt budget, accumulated
                                                          // every tick (frozen or not) by
                                                          // getAutoPrestigeAttemptRate(autoPrestige) once bought
                                                          // — see tickGame. Resets to 0 on every prestige, same
                                                          // as autobuyerAttemptBudgets
  prestigeSpeedBonusUnlocked: false,                     // permanent GLOBAL flag: whether the passive
                                                          // +1%-per-unspent-point production speed bonus
                                                          // (getPrestigeProductionMultiplier) is active at all —
                                                          // see buyPrestigeSpeedBonus. Never reset by prestige
  speedUpCount: 0,                                       // RUN-SCOPED count of Speed Up activations (see
                                                          // speedUpGame/getSpeedUpMultiplier below) — drives an
                                                          // unconditional, stacking production-speed multiplier
                                                          // (2^speedUpCount) AND how many last-tier purchases the
                                                          // next activation requires (getSpeedUpRequirement).
                                                          // Never reset by Speed Up itself (it's the thing being
                                                          // incremented), but IS reset to 0 by a real Prestige,
                                                          // unlike every permanent flag/level around it — see
                                                          // "Speed Up" below
  overclockCount: 0,                                     // RUN-SCOPED (but Speed-Up-surviving) level reached
                                                          // by Overclock (see overclockGame/
                                                          // getGlobalTickspeedProductionMultiplier below) —
                                                          // permanently multiplies BOTH the global tickspeed
                                                          // multiplier's regular and milestone per-level steps
                                                          // by (1 + OVERCLOCK_MULTIPLIER_STEP) ** overclockCount
                                                          // (getOverclockMultiplier), folded into that existing
                                                          // multiplier rather than a separate factor. A claim
                                                          // jumps this straight to the last tier's current level
                                                          // (not just +1) once that level passes
                                                          // getOverclockRequirement(overclockCount). Never reset
                                                          // by Speed Up (speedUpGame explicitly carries it over
                                                          // unchanged, unlike speedUpCount) — only by a real
                                                          // Prestige or by Overclock itself resetting speedUpCount
                                                          // (not overclockCount) — see "Overclock" below
  autoSpeedUp: false,                                    // permanent GLOBAL flag: PP spent to make Speed Up
                                                          // trigger automatically every tick once eligible (see
                                                          // buyAutoSpeedUp) — never reset by Speed Up or prestige
  autoSpeedUpEnabled: true,                              // permanent GLOBAL flag, default true: whether Auto
                                                          // Speed Up (once bought) currently acts — split from
                                                          // autoSpeedUp the same way autoPrestigeEnabled splits
                                                          // from autoPrestige above (see setAutoSpeedUpEnabled/
                                                          // tickGame). Never reset by Speed Up or prestige
  autoGlobalTickspeed: false,                            // permanent GLOBAL flag: PP spent to make the
                                                          // (Money-funded) global tickspeed multiplier upgrade
                                                          // itself automatically every tick once affordable (see
                                                          // buyTickspeedAutobuyer) — never reset by Speed Up or
                                                          // prestige
  autoGlobalTickspeedEnabled: true,                      // permanent GLOBAL flag, default true: whether the
                                                          // global Tickspeed Autobuyer (once bought) currently
                                                          // acts — split from autoGlobalTickspeed the same way
                                                          // autoPrestigeEnabled/autoSpeedUpEnabled split from
                                                          // their own parent flags above (see
                                                          // setAutoGlobalTickspeedEnabled/tickGame). Never reset
                                                          // by Speed Up or prestige
  autoPrestigeAutobuyer: false,                          // permanent GLOBAL flag: PP spent to make Auto-Prestige
                                                          // keep RE-LEVELING itself automatically once affordable
                                                          // (see buyAutoPrestigeAutobuyer/tickGame) — a
                                                          // "meta-automation" companion to autoPrestige above,
                                                          // distinct from activating Auto-Prestige in the first
                                                          // place; only meaningful once autoPrestige is already
                                                          // non-null. Never reset by Speed Up or prestige
  autoPrestigeAutobuyerEnabled: true,                    // permanent GLOBAL flag, default true: whether the
                                                          // Auto-Prestige Autobuyer (once bought) currently acts —
                                                          // split from autoPrestigeAutobuyer the same way
                                                          // autoPrestigeEnabled/autoSpeedUpEnabled/
                                                          // autoGlobalTickspeedEnabled split from their own parent
                                                          // flags above (see setAutoPrestigeAutobuyerEnabled/
                                                          // tickGame). Never reset by Speed Up or prestige
  lastTierXpConsumed: 0,                                 // RUN-SCOPED GLOBAL counter: cumulative total XP
                                                          // spent via consumeXpForLastTierTickspeed within the
                                                          // current run — each XP spent compounds another 1%
                                                          // into the last tier's own delivery frequency (see
                                                          // getLastTierXpTickspeedMultiplier). Reset to 0 by
                                                          // both Prestige and Speed Up (see prestigeGame/
                                                          // speedUpGame), same as prestige.xp below — never
                                                          // reset by consumeXpForLastTierTickspeed itself
                                                          // (only grows within a run)
  everUnlockedTierIds: { tier01: true, tier02: false, … }, // RUN-SCOPED per-tier flag: latched true
                                                          // (see latchEverUnlockedTiers, called from buyTier
                                                          // and tickGame) the moment isTierUnlocked's live
                                                          // condition is first satisfied for that tier — tier01
                                                          // starts true (always unlocked), every other tier
                                                          // starts false. Read by isTierUnlocked as an
                                                          // additional way to stay unlocked, so a tier that's
                                                          // ever been reached within the current run doesn't
                                                          // disappear from the Ladder view just because a
                                                          // narrower reset than a full Prestige/Speed Up zeroed
                                                          // its `owned` count — specifically
                                                          // consumeXpForLastTierTickspeed (see "The last
                                                          // tier's XP-funded tickspeed" below). NOT permanent
                                                          // like the flags above it, though: prestigeGame and
                                                          // speedUpGame both reset this back to the fresh
                                                          // default, same as owned/purchased, so a real
                                                          // Prestige/Speed Up still relocks every tier beyond
                                                          // the first exactly as it always has
  prestige:   { xp: 0, points: 0, count: 0, highestMilestone: 1 }, // xp is earned via money milestones (see
                                                          // checkMilestones); its one use is funding
                                                          // consumeXpForLastTierTickspeed (see "The last
                                                          // tier's XP-funded tickspeed" above) — otherwise
                                                          // still absent from the rest of the UI. RUN-SCOPED,
                                                          // unlike points/count below — both prestigeGame and
                                                          // speedUpGame reset it to 0, same as
                                                          // lastTierXpConsumed;
                                                          // points is the spendable Prestige Point balance
                                                          // (earned via prestigeGame, spent via
                                                          // buySmartAutobuyer/buyPrestigeSpeedBonus/etc.,
                                                          // also drives production speed once unlocked —
                                                          // see "Prestige Points, autobuyer unlock, and the
                                                          // tickspeed multiplier") — permanent, never reset by
                                                          // Speed Up, only added to by prestigeGame;
                                                          // count is the number of times ever prestiged (renamed
                                                          // from the old `level` field), driving only the
                                                          // first-run-vs-repeat UI presentation; prestige itself
                                                          // is gated on Money ≥ PRESTIGE_THRESHOLD, not xp or points.
                                                          // highestMilestone (the money-exponent watermark
                                                          // checkMilestones grants further xp against) resets
                                                          // to the fresh default on prestigeGame (consistent
                                                          // with Money itself resetting) but is left untouched
                                                          // by speedUpGame — a pre-existing asymmetry, unrelated
                                                          // to xp's own reset above
  computeFlops: {                                         // PP Compute (Flops) screen — see "PP Compute (Flops)"
                                                          // above. pageUnlocked latches true once PP >= reveal;
                                                          // owned counts permanent across Prestige; cumulativeBoost
                                                          // per Ladder tierId resets each Prestige cycle
    pageUnlocked: false,
    owned:      { flop01: 0, … flop10: 0 },
    cumulativeBoost: { tier01: 0, … tier10: 0 },
  },
  intro: {                                                // the Byte Foundry screen's own state — see "Byte
                                                          // Foundry" below. A currency pool entirely separate
                                                          // from resources.base until the manual/auto
                                                          // conversions into owned Kilobytes. TWO GROUPS:
                                                          // "Memory" (bits/productionAccumulator/
                                                          // mainGameUnlocked) resets to fresh EVERY REAL
                                                          // PRESTIGE (in the same object as resources/owned —
                                                          // see prestigeGame); the Byte generator itself and
                                                          // every upgrade to it (byteCreated/capacity/
                                                          // tickSpeedSeconds/productionMultiplier/
                                                          // productionMilestoneTier/
                                                          // productionMilestoneTierClaims) are PERMANENT,
                                                          // carried over unchanged like an unlocked autobuyer.
                                                          // The transfer-block row shown on this screen has no
                                                          // state of its own — it's a live mirror of tier01's
                                                          // own purchaseLevels/purchaseLevelProgress (see
                                                          // "purchaseLevelProgress" below), which reset like
                                                          // every other tier's on prestige, so the row starts
                                                          // over too as a side effect, not via any field here.
                                                          // speedUpGame/overclockGame carry the whole object
                                                          // through completely untouched either way
                                                          // (intra-cycle soft resets, not new cycles). A full
                                                          // Reset restarts everything, generator included
                                                          // (createInitialGameState called directly, nothing
                                                          // carried over). Nothing here ever fully "freezes" —
                                                          // there is no completed-style flag, and no cap either.
    bits: 0,                                              // "Memory" — tappable/producible balance, always an
                                                          // integer, capped at capacity. Resets on Prestige.
    productionAccumulator: 0,                             // fractional sub-bit accumulator, same
                                                          // epsilon-tolerant whole-unit-crossing pattern as
                                                          // tierProductionAccumulators above. Resets on Prestige.
    capacity: 8,                                          // PERMANENT. INTRO_STARTING_CAPACITY default (1
                                                          // Byte); ×= 2 (INTRO_CAPACITY_DOUBLING_STEP) each
                                                          // "Sacrifice for 2x Capacity" pick, hard-capped at
                                                          // INTRO_CAPACITY_CAP_BITS (1 MiB). Displayed in
                                                          // binary units (B/KiB/MiB/…), not SI
    byteCreated: false,                                   // PERMANENT. One persistent Byte generator — a
                                                          // flag, not a counter (only ever one)
    tickSpeedSeconds: 1,                                  // PERMANENT. INTRO_STARTING_TICK_SPEED_SECONDS
                                                          // default; ÷= 2 (INTRO_PRODUCTION_MULTIPLIER_STEP)
                                                          // each "Invest for Double Production" pick, until
                                                          // that would breach INTRO_MIN_TICK_SPEED_SECONDS —
                                                          // see getIntroProductionRate
    productionMultiplier: 1,                              // PERMANENT. ×= 2 (INTRO_PRODUCTION_MULTIPLIER_STEP)
                                                          // instead, once tickSpeedSeconds is floored — see above
    productionMilestoneTier: 0,                           // PERMANENT. 0-based index into "Invest for Double
                                                          // Production"'s own independent cost ladder (see
                                                          // getIntroProductionMilestoneCost) — entirely
                                                          // decoupled from capacity above; only ever advances
    productionMilestoneTierClaims: 0,                     // PERMANENT. Claims made at the current
                                                          // productionMilestoneTier; resets to 0 whenever
                                                          // the tier advances
    computeFundedBandwidthClaims: 0,                      // PERMANENT until Sacrifice rollback (#323/#324)
    computeBandwidthSacrificeIndex: 0,                    // PERMANENT until Sacrifice rollback — next
                                                          // COMPUTE_BOOST_TIER_FIELDS index for Bandwidth-via-compute
    mainGameUnlocked: false,                              // Resets to false every real Prestige: true the
                                                          // instant any bits are ever converted into
                                                          // Kilobytes this cycle (manual or auto) — drives
                                                          // App.jsx's page routing gate. NOT a freeze flag —
                                                          // the Byte Foundry stays fully interactive well
                                                          // past this point
    capacityUpgradeQueued: false,                         // Resets every real Prestige. When true, the next
                                                          // full-Memory tick (Disk Fill / Bandwidth / Disk
                                                          // Build unavailable) erases all Compute tokens and
                                                          // Sacrifices ×2 capacity — see
                                                          // queueIntroCapacityUpgrade/tickQueuedCapacityUpgrade
    disks: {},                                            // PERMANENT. { [capacityBits]: count } of
                                                          // currently-FULL Disks of that size — see
                                                          // tickDiskAutoFill/redeemDisk. A full disk's
                                                          // contents ride through a real Prestige
                                                          // untouched even though Memory itself resets
    disksBuiltTotal: {},                                  // PERMANENT. { [capacityBits]: cumulative count }
                                                          // of every disk ever built (constructed) at that
                                                          // size, full or empty — redeeming never decrements
                                                          // this; drives getDiskSize's one-way ladder
                                                          // advance. Empty count = builtTotal - disks
    diskCache: {},                                        // PERMANENT. { [capacityBits]: bits currently
                                                          // held } in that size array's always-full
                                                          // cache. Steady full; empties on completed
                                                          // read-cache → disk flush or manual block
                                                          // release. See tickDiskAutoFill.
                                                          // 0..size, conceptually split into
                                                          // DISK_CACHE_BLOCK_COUNT (8) equal blocks for
                                                          // manual release — see releaseDiskCacheBlock
    diskReadCacheFlush: {},                               // NOT permanent — resets every real Prestige.
                                                          // { [sizeBits]: { remainingSeconds, totalSeconds } }
                                                          // while a read-cache → disk flush is in flight.
                                                          // Duration at start = one block ÷ production rate.
    diskBuild: null,                                      // PERMANENT. null when no array is currently
                                                          // mid-build, otherwise { size, remainingSeconds,
                                                          // totalSeconds } for the one disk array build in
                                                          // progress — see startDiskBuild/tickDiskBuild.
                                                          // Only one size is ever buildable at a time.
                                                          // While set, every IO operation against that
                                                          // size's array is disallowed ("the array rebuild")
    diskWriteCache: {},                                   // NOT permanent — resets every real Prestige.
                                                          // In-flight upward merges; empty at rest.
                                                          // See tickDiskWriteCache.
    diskAutoRedeemedSizes: {},                            // NOT permanent — resets to {} every real Prestige,
                                                          // unlike every other Disk field above.
                                                          // { [capacityBits]: true } once tickDiskAutoRedeem
                                                          // has auto-redeemed that size this cycle
    computeCores: 0,                                      // PERMANENT, normally capped at COMPUTE_ENTITY_CAP (10)
                                                          // but startBoosterTransfer can push it past that
                                                          // (Data-Lake-limited, not inventory-capped). Granted by
                                                          // startBoosterTransfer (tier 1) — spending that tier's
                                                          // Data Lake deposits first, then a live timed transfer
                                                          // off the raw Disk inventory. Spent 1 at a time by
                                                          // activateComputeBoost below
    computeCoresEverEarned: 0,                            // PERMANENT, UNCAPPED lifetime counter — incremented
                                                          // alongside computeCores by every successful tier-1
                                                          // Booster (instant or completed transfer), but never
                                                          // decremented by spending/merging.
                                                          // computeMergePageUnlocked below gates on this, not the
                                                          // live computeCores balance
    computeNodes: 0,                                      // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by mergeComputeCoresIntoNode (pre-unlock,
                                                          // instant, 8 computeCores -> 1) or by a completed Core ->
                                                          // Node reserve merge post-unlock (see issue #321). Also
                                                          // the input to mergeComputeNodesIntoCluster below
    computeClusters: 0,                                   // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by mergeComputeNodesIntoCluster (8
                                                          // computeNodes -> 1), itself the input to
                                                          // mergeComputeClustersIntoNetwork below
    computeNetworks: 0,                                   // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by mergeComputeClustersIntoNetwork (8
                                                          // computeClusters -> 1), itself the input to
                                                          // mergeComputeNetworksIntoGrid below
    computeGrids: 0,                                      // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by mergeComputeNetworksIntoGrid (8
                                                          // computeNetworks -> 1), itself the input to
                                                          // mergeComputeGridsIntoFabric below
    computeFabrics: 0,                                    // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by mergeComputeGridsIntoFabric (8
                                                          // computeGrids -> 1), itself the input to
                                                          // mergeComputeFabricsIntoCloud below
    computeClouds: 0,                                     // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by mergeComputeFabricsIntoCloud (8
                                                          // computeFabrics -> 1), itself the input to
                                                          // mergeComputeCloudsIntoDatacenter below
    computeDatacenters: 0,                                // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by mergeComputeCloudsIntoDatacenter (8
                                                          // computeClouds -> 1), itself the input to
                                                          // mergeComputeDatacentersIntoSupercomputer below
    computeSupercomputers: 0,                             // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by mergeComputeDatacentersIntoSupercomputer
                                                          // (8 computeDatacenters -> 1), itself the input to
                                                          // mergeComputeSupercomputersIntoMegacomputer below
    computeMegacomputers: 0,                              // PERMANENT, capped at COMPUTE_ENTITY_CAP (10).
                                                          // Incremented by
                                                          // mergeComputeSupercomputersIntoMegacomputer (8
                                                          // computeSupercomputers -> 1). Top of the merge chain
                                                          // today — nothing spends a Megacomputer yet (see #280)
    computeMergePageUnlocked: false,                      // PERMANENT, one-time reveal latch for ComputePage —
                                                          // never re-clears once true. Flips inside
                                                          // latchComputeMergePageIfNeeded (called from
                                                          // startBoosterTransfer or tickDataLakeTransfers) the
                                                          // instant computeCoresEverEarned (above, not the live
                                                          // computeCores balance) first reaches
                                                          // COMPUTE_CORES_PER_NODE (8)
    autoMergeCoresIntoNode: false,                        // PERMANENT — each flipped once by the matching
    autoMergeNodesIntoCluster: false,                     // enableAutoMerge* action (sacrifices ALL 10 held units
    autoMergeClustersIntoNetwork: false,                  // of that merge's OWN output entity), permanently
    autoMergeNetworksIntoGrid: false,                     // switching that boundary's merging (both manual and
    autoMergeGridsIntoFabric: false,                      // automatic) over to the timed reserve-pool system below
    autoMergeFabricsIntoCloud: false,                     // — see issues #316/#321. The OLD instant merge function
    autoMergeCloudsIntoDatacenter: false,                 // becomes a permanent no-op for that boundary once its
    autoMergeDatacentersIntoSupercomputer: false,         // flag flips true
    autoMergeSupercomputersIntoMegacomputer: false,
    computeCoresMergeRemainingSeconds: 0,                 // PERMANENT — carried through a real Prestige unchanged
    computeNodesMergeRemainingSeconds: 0,                 // (not run-scoped like computeBoostRemainingSeconds
    computeClustersMergeRemainingSeconds: 0,              // below), since an in-flight merge represents already-
    computeNetworksMergeRemainingSeconds: 0,              // committed tokens that shouldn't be lost to a Prestige
    computeGridsMergeRemainingSeconds: 0,                 // transition — it just keeps counting down seamlessly.
    computeFabricsMergeRemainingSeconds: 0,               // 0 = idle, > 0 = a reserve merge in flight for that
    computeCloudsMergeRemainingSeconds: 0,                // boundary — see startComputeMergeReserve/
    computeDatacentersMergeRemainingSeconds: 0,           // tickComputeMergeReserveTimer and issue #321
    computeSupercomputersMergeRemainingSeconds: 0,
    computeBoostType: null,                               // NOT permanent — resets to null on every real Prestige,
                                                          // carried through untouched by Speed Up/Overclock.
                                                          // Which COMPUTE_BOOST_PRESETS key is active, if any —
                                                          // see activateComputeBoost/tickComputeBoost
    computeBoostStacks: 0,                                // NOT permanent, same reset posture as computeBoostType.
                                                          // How many times the active preset has been stacked
    computeBoostRemainingSeconds: 0,                      // NOT permanent, same reset posture as computeBoostType.
                                                          // Counts down every tick (frozen or not) — see
                                                          // tickComputeBoost
  },
}
```

`owned[tierId]` and `resources[tierId]` for the same tier id always move together — buying a tier, producing
it via the tier above's tick, an autobuyer's automatic purchase, and spending it on that tier's own autobuyer
upgrade all update both by the same amount. They represent "how many generators you have" and "how much of
that tier's resource you can spend" respectively, which happen to be the same number by design. `purchased`
is separate: still incremented on every purchase, but no longer used to scale cost or drive
production doubling directly (see "The (configurable) purchase block size and tier levels" above) —
`state.purchaseLevels[tierId]`/`state.purchaseLevelProgress[tierId]` do that now, tracked directly
rather than derived from `purchased`. Production still doubles every time a tier completes another
level (`getPurchaseMilestoneMultiplier` — every 10th such level is a bigger ×10 milestone instead) —
the same boundary where `getTierCost`'s cost-epoch exponent steps up, regardless of whether those
purchases were manual or automatic.

### Key engine functions (`src/game/engine.js`)

| Function | Signature | Purpose |
|----------|-----------|---------|
| `createInitialGameState` | `() → state` | Fresh state derived from `TIER_DEFINITIONS`; `resources` is pre-populated with every `costResourceId`/`producesResourceId`, not just money |
| `getTierCost` | `(tier, level) → number` | Returns the fixed PER-UNIT price: `baseCost * 10^(getCostEpochExponent(epoch) - 1)`, epoch = `level - 1` — each level multiplies `baseCost` by 10 raised to (that level's cost-epoch exponent − 1): 1, 2, 3, 5, 8, … for epochs 0, 1, 2, 3, 4, … This price is independent of `blockSize` entirely — no division happens anywhere in it, so the result is always an exact integer. A level's TOTAL cost (every purchase within it, summed) is this per-unit price times whatever `blockSize` is in effect (see `getTierQuantityCost`) — the total that scales with block size, not the per-unit price. Takes the tier's current LEVEL directly (`state.purchaseLevels[tierId]`), not a lifetime purchased count. See `docs/DESIGN_HISTORY.md` for the multiplier-form-vs-`baseCost^exponent` and per-unit/level-total design history, and for the Fibonacci-vs-triangular exponent-sequence history (a triangular-number sequence was tried in between, then this Fibonacci sequence was reinstated). Deep epochs still eventually overflow to `Infinity`, which is safe — an infinite cost is simply never affordable |
| `getCostEpochExponent` | `epoch → number` | The exponent driving a cost epoch's multiplier in `getTierCost`: 1, 2, 3, 5, 8, 13, 21, … for epochs 0, 1, 2, 3, 4, 5, 6, … — the classic Fibonacci sequence, computed iteratively; a negative epoch is clamped to 0. A triangular-number sequence (`1 + e*(e+1)/2`) was tried in between, then this Fibonacci sequence was reinstated — see `docs/DESIGN_HISTORY.md` |
| `getPurchaseBlockSize` | `state → number` | The purchase block size every tier's current level currently requires to complete — a single global value (not per-tier), read fresh from state rather than a hardcoded constant. Starts at `DEFAULT_PURCHASE_BLOCK_SIZE` and grows by `PURCHASE_BLOCK_SIZE_GROWTH_STEP` every `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS` the LAST tier completes (see "The (configurable) purchase block size and tier levels" above). Supersedes an earlier `getTierLevel(purchased)` accessor that derived a level via division against a fixed block size — see `docs/DESIGN_HISTORY.md` |
| `getTierBulkQuantity` | `(blockSize, levelProgress, requestedQuantity) → number` | Caps a bulk purchase at the units remaining to complete the current level (`blockSize - levelProgress`), so every unit bought is the same price |
| `getTierQuantityCost` | `(tier, level, blockSize, levelProgress, requestedQuantity) → number` | `getTierCost(...) * getTierBulkQuantity(...)` |
| `getTierAffordableQuantity` | `(tier, level, blockSize, levelProgress, spendable, requestedQuantity) → number` | Further caps `getTierBulkQuantity` by what `spendable` can actually pay for — what `buyTierQuantity` will actually purchase |
| `getTierSpendableAmount` | `(state, tier) → number` | Balance of `tier.costResourceId` (always `MONEY_ID`, `'base'`) |
| `getTierPurchasedCount` | `(state, tierId) → number` | Lifetime purchases — display/back-compat only; no longer used for cost scaling (see `state.purchaseLevels`/`purchaseLevelProgress`) |
| `isProductionFrozen` | `state → bool` | `Money >= PRESTIGE_THRESHOLD` AND `prestige.count < PRESTIGE_UNBOUNDED_MIN_COUNT` (100) — once true, `buyTier`/`buyTickspeedMultiplier`/most PP purchases become no-ops; `tickGame` either stays frozen or calls `prestigeGame` automatically once Auto-Prestige's banked attempt budget crosses 1. At/after 100 lifetime prestiges, `isUnboundedPrestigeUnlocked` — production continues and Prestige is optional |
| `tickGame` | `(elapsedSeconds, autobuyerBatchSize = 1) → state → state` | Runs the Byte Foundry's `tickIntroProduction`, then `tickDiskBuild`, then `tickDiskAutoFill`, then every `tickAutoMerge*(elapsedSeconds)` (issues #316/#321 — lowest tier first including Core → Node, see `AUTO_MERGE_TICKERS` — each both auto-starts a reserve merge and counts down any merge already in flight), then `tickComputeBoost(elapsedSeconds)` (counting an active Compute Boost's remaining duration down, unconditionally, alongside the rest of this pipeline), then `tickIntroAutoInvest`, in that order, unconditionally, before anything below (see "Byte Foundry" above) — `tickDiskBuild` counts down any in-progress disk array build (unconditional, bypasses nothing); `tickDiskAutoFill` then gets first claim on the Memory `tickIntroProduction` just delivered, ahead of `tickIntroAutoInvest`'s own direct bit-to-Kilobyte conversion — a Disk array the player has already built isn't starved of Memory it's waiting to be filled with; `tickDiskAutoFill` has no dependency on tier01's level so running it this early costs nothing (unlike `tickDiskAutoRedeem`, which still runs last — see its own table row below). Compute Cores are no longer minted from Memory at all — they're bought with Data Lake deposits/live transfers via `startBoosterTransfer`; `tickDataLakeTransfers(elapsedSeconds)` (frozen or not) runs right after `tickFoundryResetConvenience` and before `AUTO_MERGE_TICKERS`, counting down in-flight Booster transfers and granting Compute Cores/etc. as they complete, so a Core a transfer completes this tick can still cascade upward through an already-unlocked auto-merge chain the same tick. `tickIntroProduction` short-circuits to a same-reference no-op before `byteCreated`, and `tickIntroAutoInvest` once `bits` can't cover even one more `getIntroKilobyteConversionCost(state)` unit; neither ever fully freezes, and neither is capped (`tickIntroAutoInvest` is capped per-call at one tier01 level's worth, not overall — see its own table row). If `isProductionFrozen`: when `autoPrestige` isn't bought OR `autoPrestigeEnabled` is false (paused — see "Pause/resume for the global automations" above), short-circuits (returns the same state, unchanged); otherwise accumulates `autoPrestigeAttemptBudget` by `getAutoPrestigeAttemptRate(autoPrestige) * elapsedSeconds` and, once that crosses 1 (with `TICK_ACCUMULATION_EPSILON` tolerance), calls `prestigeGame` immediately (prestigeGame's own reset zeroes the budget back out) — otherwise returns the state with just the updated budget. Otherwise (not frozen) runs autobuyers highest-tier-first (every tier costs the same resource, Money, so autobuyers compete for one shared pool — the higher tier gets first claim on limited funds), then produces resources for every unlocked tier — but only once its `tierProductionAccumulators[tier.id]` (incremented by `elapsedSeconds` this tick) crosses that tier's own `getEffectiveTierTickSpeedSeconds(state, tier.id)` — the tier's base tickspeed shrunk by both tickspeed multipliers (with the same epsilon tolerance); when it does, delivers `floor(owned × (whole effective periods elapsed) × multiplier × speedUpMultiplier × getPurchaseMilestoneMultiplier(level) × computeBoostMultiplier)` in one batch — `computeBoostMultiplier` is `getComputeBoostMultiplier(intro)` for tier01 specifically and `1` for every other tier (see "Compute Boost" above) — note neither tickspeed multiplier appears in this credit formula, since they already did their work by shrinking the period the "whole effective periods elapsed" count is measured against — where `multiplier` is `getPrestigeProductionMultiplier(prestige.points)` if `prestigeSpeedBonusUnlocked` is true, or a flat `1` otherwise, and `speedUpMultiplier` is `getSpeedUpMultiplier(speedUpCount)` — always ≥ 1, unconditional, no unlock needed — and the result is floored so `owned`/`resources` stay integer-valued — and banks any leftover remainder for the next tick — then checks milestones, then — for every tier whose tier tickspeed autobuyer is bought (`tierTickspeedAutobuyer[tier.id]` — no dependency on `autobuyers[tier.id]` at all) and whose `tierTickspeedAutobuyerEnabled[tier.id] ?? true` is true (paused behaves exactly as if `tierTickspeedAutobuyer[tier.id]` were still false, see "Pause/resume for per-tier automations" in CLAUDE.md) — calls `buyTickspeedMultiplier(tier.id)` once more automatically, no-op if unaffordable (edge-triggered on affordability, not scaled by `elapsedSeconds`), **except for the last tier once `isLastTierTickspeedXpUnlocked` holds**, where the same bought flag instead calls `consumeXpForLastTierTickspeed(state.prestige.xp)` (spending the tier's entire current XP balance, same edge-triggered convention, no-op below the minimum consumption threshold — see "The last tier's XP-funded tickspeed" in CLAUDE.md), and — if `autoPrestige` is bought and `autoPrestigeEnabled` is true — accumulates `autoPrestigeAttemptBudget` here too, scaled by `elapsedSeconds` (the clock runs continuously regardless of frozen state, but can only ever fire from the frozen branch above). `globalTickspeedMultiplier` needs no per-tick accumulation of its own — unlike Auto-Prestige's attempt budget, it's just a permanent level read via `getGlobalTickspeedProductionMultiplier` inside `getEffectiveTierTickSpeedSeconds` each tick, changed only by the player's own `buyGlobalTickspeedMultiplier` clicks or — once `autoGlobalTickspeed` is bought (see `buyTickspeedAutobuyer`) and `autoGlobalTickspeedEnabled` is true — by `tickGame` calling `buyGlobalTickspeedMultiplier` automatically every tick right after the per-tier tickspeed self-upgrade step above, the same edge-triggered convention, re-validating its own eligibility internally each time. Next, if `autoPrestigeAutobuyer` is bought and `autoPrestigeAutobuyerEnabled` is true, calls `buyAutoPrestige` once more automatically (edge-triggered, re-validating its own eligibility internally — no rate-accumulating budget, unlike Auto-Prestige's own attempt budget above), the same convention as the tickspeed self-upgrade steps just before it. For each non-`null` (unlocked) autobuyer whose `autobuyersEnabled[tier.id] ?? true` is also true (a paused tier is treated exactly like "never unlocked" here, including skipping this budget accumulation — see "Pause/resume for per-tier automations" in CLAUDE.md), accumulates a fractional purchase-attempt budget (`autobuyerAttemptBudgets[tier.id] + elapsedSeconds` — a flat rate, independent of tickspeed level) and fires one purchase attempt (via `buyTierQuantity`) per whole unit of budget (with the same epsilon tolerance), carrying any fractional remainder into the next tick. If a purchase can't be afforded, the loop stops *without* spending the already-accumulated attempt — it stays banked. The effective per-iteration batch size is `autobuyerBatchSize`, except for a "smart" tier (`smartAutobuyer[tier.id]`) still on its very first level (`purchaseLevels[tier.id] === 1`), which uses 1 instead — above 1 (`Number.MAX_SAFE_INTEGER` in the running app, see `useIncrementalGame`'s `BUY_QUANTITY`) each attempt only buys once the tier can afford the *entire* current cost block up to that size. Finally, if `autoSpeedUp` is bought and `autoSpeedUpEnabled` is true, calls `speedUpGame` once more (edge-triggered, re-validates its own eligibility internally) |
| `getIntroProductionRate` | `intro → number` | Byte Foundry: current bits/sec, `(INTRO_BYTE_BASE_RATE * productionMultiplier) / tickSpeedSeconds` — always an exact integer, since both factors are always powers of `INTRO_PRODUCTION_MULTIPLIER_STEP`. Used by `tapIntroBit` and the passive-production display |
| `tapIntroBit` | `state → state` | Byte Foundry: adds `getIntroProductionRate(intro)` bits to `intro.bits` — "one second's worth" at the current rate, not a flat 1 — capped at `intro.capacity`. No-op once already full. Never freezes |
| `combineIntroByte` | `state → state` | Byte Foundry: one-time — consumes `INTRO_BYTE_COMBINE_COST` (8) bits, sets `intro.byteCreated = true`. No-op once already created or below cost |
| `isDiskFillAvailable` | `state → bool` | Byte Foundry forced-priority base predicate (not a reducer), ranked HIGHEST: true whenever any built Disk, of any size, is both currently FULL and redeemable right now (`isDiskRedeemable`). Never itself blocked by anything below it in the order |
| `isBandwidthAvailable` | `state → bool` | Byte Foundry forced-priority base predicate: `isBitFundedBandwidthAvailable \|\| isComputeFundedBandwidthAvailable` |
| `isBitFundedBandwidthAvailable` | `state → bool` | Bit-cost Invest affordable and claims remain |
| `isComputeFundedBandwidthAvailable` | `state → bool` | Issue #323: Invest bit cost exceeds `capacity`, next compute tier holds ≥ `COMPUTE_ENTITY_CAP`, sequential index in range |
| `isBandwidthTurnAvailable` | `state → bool` | Byte Foundry forced-priority composite (not a reducer): `isBandwidthAvailable(state) && !isDiskFillAvailable(state)` — `pickIntroProductionMilestone`'s own actual gate |
| `isDiskBuildAvailable` | `state → bool` | Byte Foundry forced-priority base predicate (not a reducer): `!state.intro.diskBuild && !isDiskLadderExhaustedForActivePools(state) && intro.bits >= getDiskCost(getDiskSize(state))` — matches `startDiskBuild`'s own actual gate (also requiring no build already in progress and the ladder not yet exhausted for every currently-active pool), which has never itself required `isStorageUnlocked` (that only governs when Foundry shows Build + DiskArrayRows) |
| `isDiskBuildTurnAvailable` | `state → bool` | Byte Foundry forced-priority composite (not a reducer): `isDiskBuildAvailable(state) && !isDiskFillAvailable(state) && !isBandwidthAvailable(state)` — `startDiskBuild`'s own actual gate |
| `isComputeUpgradeAvailable` | `state → bool` | Byte Foundry forced-priority base predicate (not a reducer): `isComputeCoreConversionUnlocked(state)` AND (`canStackComputeBoost(state)` OR — while no boost is active — some `(boostType, tierIndex)` combo across all `COMPUTE_BOOST_TIER_FIELDS` is currently activatable via `canActivateComputeBoost`) — issue #326 |
| `isComputeBoostTurnAvailable` | `(state, boostType, tierIndex) → bool` | Byte Foundry forced-priority composite (not a reducer): `canActivateComputeBoost(state, boostType, tierIndex) && !isDiskFillAvailable(state) && !isBandwidthAvailable(state) && !isDiskBuildAvailable(state)` — `activateComputeBoost`'s own actual gate |
| `isStackComputeBoostTurnAvailable` | `state → bool` | Byte Foundry forced-priority composite (not a reducer): `canStackComputeBoost(state) && !isDiskFillAvailable(state) && !isBandwidthAvailable(state) && !isDiskBuildAvailable(state)` — `stackComputeBoost`'s own actual gate |
| `isComputeUpgradeTurnAvailable` | `state → bool` | Byte Foundry forced-priority composite (not a reducer): true if `isStackComputeBoostTurnAvailable(state)`, or `isComputeBoostTurnAvailable(state, boostType, tierIndex)` for any preset/tier combo — used to gate ComputePage's own nav entry point |
| `isMemoryCapacityUpgradeAvailable` | `state → bool` | Byte Foundry predicate (not a reducer): whether "Sacrifice for 2x Capacity" can actually fire right now — `intro.bits === intro.capacity`, **not** already at the cap (`!isMemoryCapacityAtCap(state)`), **and** none of Combine into a Byte (`!byteCreated`, affordable), `isDiskFillAvailable`, `isBandwidthAvailable` (the current Invest tier affordable/unclaimed), `isDiskBuildAvailable` (a currently-buildable Disk array), or `isComputeUpgradeAvailable` is still possible with that same balance — see "Forced priority order" above, the lowest-ranked action, composing all five base predicates above it. Used by `pickIntroCapacityMilestone`'s own guard below and directly by `ByteFoundryPage` to disable/hide the button the same way |
| `isMemoryCapacityAtCap` | `state → bool` | Byte Foundry predicate: whether pool 1's generator capacity has reached (or the next `INTRO_CAPACITY_DOUBLING_STEP` doubling would cross) `INTRO_CAPACITY_CAP_BITS` — a pure function of `capacity` alone, independent of `bits`/balance. Checked first inside `isMemoryCapacityUpgradeAvailable` and `queueIntroCapacityUpgrade`/`tickQueuedCapacityUpgrade`, so Sacrifice becomes permanently unavailable from the cap onward |
| `pickIntroCapacityMilestone` | `state → state` | Byte Foundry "Sacrifice for 2x Capacity" — requires `isMemoryCapacityUpgradeAvailable(state)` (see its own row above); drains the entire balance to 0, multiplies `capacity` by `INTRO_CAPACITY_DOUBLING_STEP`, clears `capacityUpgradeQueued`. Repeatable at every tier reached below the cap; doesn't touch `tickSpeedSeconds`/`productionMultiplier`. No-op otherwise (including at the cap). Never freezes |
| `queueIntroCapacityUpgrade` | `state → state` | Sets `intro.capacityUpgradeQueued = true` (idempotent). May be called before Memory is full — commits the next full-bar spend to Capacity so Compute cannot starve it |
| `clearIntroCapacityUpgradeQueue` | `state → state` | Clears `capacityUpgradeQueued` without Sacrificing. Same-reference no-op when already false |
| `eraseAllComputeTokens` | `state → state` | Zeros every `COMPUTE_BOOST_TIER_FIELDS` balance, clears active Boost fields, and zeros in-flight merge timers. Does **not** touch permanent auto-claim/auto-merge unlocks or `computeCoresEverEarned`/`computeMergePageUnlocked` |
| `resetByteFoundry` | `state → state` | Settings → Danger zone: fresh `intro` (Memory/Capacity/upgrades/Disks/Compute wiped to scratch), records `foundryResetCaps` high-water marks. Preserves `mainGameUnlocked` when already true. Leaves every non-`intro` field untouched |
| `tickFoundryResetConvenience` | `state → state` | While `foundryResetCaps` is set: auto-press Combine, bit-funded Invest / Bandwidth, Disk Build, and Capacity (Sacrifice) up to those caps when their normal turn gates allow. Same-reference no-op when inactive |
| `tickQueuedCapacityUpgrade` | `state → state` | If queued, Memory full, not already at the cap (`!isMemoryCapacityAtCap(state)`), and Disk Fill/Bandwidth/Disk Build unavailable: `eraseAllComputeTokens` then Sacrifice ×2 (`INTRO_CAPACITY_DOUBLING_STEP`) and clear the queue (bypasses `isComputeUpgradeAvailable`). Called from `tickGame` after intro production / disk-build countdown, before Disk auto-fill. Same-reference no-op otherwise (including once at the cap) |
| `getIntroProductionMilestoneCost` | `tier → number` | Byte Foundry: `INTRO_STARTING_CAPACITY * INTRO_BANDWIDTH_COST_MULTIPLIER ** tier` — "Invest for Double Production"'s own independent cost ladder (8, 32, 128, 512, 2048, … bits), unrelated to `intro.capacity` |
| `getIntroProductionMilestoneMaxClaims` | `tier → number` | Byte Foundry: `2` for the three cheapest tiers (`tier <= 2`, i.e. 1/4/16 Bytes), `1` for every tier from there on (`tier > 2 ? 1 : 2`) — an intermediate iteration returned a flat `1` for every tier before this tier-dependent split was reinstated — see `docs/DESIGN_HISTORY.md` |
| `pickIntroProductionMilestone` | `state → state` | Byte Foundry Bandwidth ×2 — requires `isBandwidthTurnAvailable`. Prefers bit-funded Invest when affordable; otherwise compute-funded overflow (#323): spends `COMPUTE_ENTITY_CAP` of the next `COMPUTE_BOOST_TIER_FIELDS` tier, advances `computeBandwidthSacrificeIndex`, increments `computeFundedBandwidthClaims`, and applies the same rate doubling as bit Invest. No-op while Disk Fill ranks higher |
| `rollbackComputeFundedBandwidth` | `state → state` | Issue #324: rewinds exactly `computeFundedBandwidthClaims` Invest doubles and resets sacrifice index to 0 |
| `isIntroConversionUnlocked` | `state → bool` | Byte Foundry predicate (not a reducer): `intro.capacity >= INTRO_CONVERSION_UNLOCK_CAPACITY` (8000) — drives whether `ByteFoundryPage` shows the transfer-block row at all |
| `isStorageUnlocked` | `state → bool` | Byte Foundry predicate (not a reducer): `intro.capacity >= INTRO_DISK_UNLOCK_CAPACITY` (80,000 bits, "9.765 KiB" in Memory's own binary display scale) — reveals Foundry's Build Disk control and continuous DiskArrayRow sections |
| `getMemoryUnit` | `(capacityBits, byteCreated) → { symbol, divisor } \| null` | Byte Foundry Memory Capacity's own **binary** unit ladder (`engine.js`, shared by ByteFoundryPage/StoragePage): the single B/KiB/MiB/…/QiB unit (step `MEMORY_BINARY_UNIT_STEP`, 1024) a `bits`/`capacity` pair should both render in, sized off `capacityBits`; `null` before `byteCreated` (nothing to denominate in yet — render raw bits). Distinct from `getSiByteUnit` (internal, SI/step-1000, backs `formatDiskSize`) |
| `formatMemoryAmount` | `(bits, unit) → string` | Byte Foundry (`engine.js`): formats `bits` in `unit` (from `getMemoryUnit` or `getSiByteUnit`), floored to 3 decimals; falls back to a raw `"N bit(s)"` string when `unit` is `null` |
| `formatBitsInNearestUnit` | `bits → string` | Byte Foundry (`engine.js`): `formatMemoryAmount(bits, getMemoryUnit(bits, true))` — any Memory-denominated cost (Sacrifice/Invest/Disk build) in whichever **binary** unit best fits that specific amount |
| `getIntroKilobyteConversionCost` | `state → number` | Byte Foundry: `BITS_PER_BYTE * getTierCost(TIER_DEFINITIONS[0], purchaseLevels.tier01 ?? 1)` — `BITS_PER_BYTE` times tier01's own CURRENT per-unit level cost, the exact same underlying value `getDiskSize`/`isDiskRedeemable` key off (before the `BITS_PER_BYTE` scaling). Exactly `INTRO_BITS_PER_KILOBYTE_CONVERSION` (8000) at a fresh cycle's level 1, growing in lockstep with tier01's own price from then on. An earlier version stayed flat at `INTRO_BITS_PER_KILOBYTE_CONVERSION` forever — see `docs/DESIGN_HISTORY.md` |
| `convertIntroBitsToKilobytes` | `state → state` | Byte Foundry: spends `getIntroKilobyteConversionCost(state)` bits (tier01's own CURRENT per-unit level cost, not the fixed `INTRO_BITS_PER_KILOBYTE_CONVERSION` rate) from `intro.bits`, grants 1 free `TIER_DEFINITIONS[0]` (Kilobytes) unit via the internal `grantTierUnits` helper — bypasses `isTierUnlocked`/`isProductionFrozen` entirely (separate currency pool). No-op only below cost — **no per-cycle cap**. Sets `mainGameUnlocked: true` on success. Called once per transfer-block click in `ByteFoundryPage`, and once per unit by `tickIntroAutoInvest` below |
| `tickIntroProduction` | `elapsedSeconds → state → state` | Byte Foundry: passive production for the Byte generator — no-op immediately before `intro.byteCreated`. Delivers one batch of `INTRO_BYTE_BASE_RATE * productionMultiplier` bits every `tickSpeedSeconds` of elapsed time (the same discrete "accumulate, deliver a whole period, bank the remainder" model `tickGame`'s own per-tier production uses — see there), crediting whole bits capped at `capacity`. Never freezes once `byteCreated` |
| `tickIntroAutoInvest` | `state → state` | Byte Foundry: auto-convert convenience — loops `convertIntroBitsToKilobytes` (so it flips `mainGameUnlocked` and behaves identically to a manual click), converting one `getIntroKilobyteConversionCost(state)`-bit unit at a time (tier01's own CURRENT per-unit cost, re-read every iteration since a completed unit can itself advance tier01's level mid-call — not the fixed `INTRO_BITS_PER_KILOBYTE_CONVERSION` rate) as soon as it's affordable, live rather than waiting for a whole `getPurchaseBlockSize(state)`-sized batch (an earlier version did the latter — see `docs/DESIGN_HISTORY.md`). Capped per call at `getTierBulkQuantity(getPurchaseBlockSize(state), purchaseLevelProgress[tier01], Number.MAX_SAFE_INTEGER)` — at most one tier01 level's worth of units — the same safety bound the tier autobuyers themselves use, so an extreme balance can't loop unboundedly in one call; a bigger jump finishes on a later tick. **No per-cycle cap**, unlike an earlier design |
| `getDiskSize` | `state → number` | Byte Foundry Disks: walks the gapless Byte power-of-ten ladder (`DISK_LADDER_BASE_SIZE_BITS` × `DISK_LADDER_SIZE_MULTIPLIER^(n-1)` — 1 KB, 10 KB, 100 KB, …; see `getDiskLadderSizeBits`) rather than tier01's level-cost sequence, advancing every time `DISK_ARRAY_LADDER_CAP` disks have ever been built at the current size (read from `intro.disksBuiltTotal`, cumulative — never decremented by redeeming) — the size `startDiskBuild` currently builds at. Issue #368 replaced the tier01-cost walk, which skipped sizes whenever cost-epoch exponents jumped (100 KB → 10 MB, never 1 MB). Never advances past `MAX_ACTIVE_DISK_LADDER_STEP` (today, pool 1's own 3 sizes — 1/10/100 KB) — once that size is fully built, keeps returning it rather than reaching a size no currently-unlocked pool's generator could ever fund (see `isDiskLadderExhaustedForActivePools` below; `docs/DESIGN_HISTORY.md`). Deliberately decoupled from tier01's own CURRENT level cost. |
| `isDiskLadderExhaustedForActivePools` | `state → bool` | Byte Foundry Disks predicate (not a reducer): true once `DISK_ARRAY_LADDER_CAP` disks have ever been built at `MAX_ACTIVE_DISK_LADDER_STEP`'s own size (100 KB today) — i.e. every size any currently-unlocked pool's generator can ever fund is fully built, so there is genuinely nothing left for `startDiskBuild` to offer until a future pool's own generator (epic #456) raises the ceiling. Distinct from "not affordable yet" — this is permanent. Gates `isDiskBuildAvailable` below |
| `getDiskCost` | `capacityBits → number` | Byte Foundry Disks: `capacityBits * DISK_BUILD_COST_MULTIPLIER` — 10x the array's own face value, already in bits (`capacityBits`, from `getDiskSize`, is already Byte-accurate — no further `BITS_PER_BYTE` conversion needed, unlike an earlier "kilobit"-scaled version of this ladder — see `docs/DESIGN_HISTORY.md`): a real 1 KB (8000-bit) array costs 80,000 bits to build. Pays only for the empty container — not what fills it |
| `formatDiskSize` | `bits → string` | Byte Foundry Disks: an alias for the internal SI-only `formatBitsInNearestSiUnit` helper (**not** `formatBitsInNearestUnit`, which is binary-unit — Storage stays SI even though Memory Capacity moved to binary; see `docs/DESIGN_HISTORY.md`). Disk sizes are real, Byte-accurate bit counts, rendered on the same B/KB/MB/…/QB SI scale disks have always used — no separate "kilobit" formatting scale (see `docs/DESIGN_HISTORY.md` for that earlier bug and its fix) |
| `getDiskSizesToShow` | `state → number[]` | Byte Foundry Disks: every size worth showing, ascending — every size ever built (`intro.disksBuiltTotal`), any size still held (`intro.disks`, covers a save/seed missing a matching built-total entry), plus whatever `getDiskSize` currently offers (even at 0 built, so its row/goal is visible before the first one is built). Shared by Foundry's continuous DiskArrayRow sections and the thin `StoragePage` wrapper |
| `getRelevantDiskSizesForFoundry` | `state → number[]` | Helper: every size from `getDiskSizesToShow` whose tier cost currently matches, plus always the highest shown size even when unmatched (issue #389), ascending. Foundry UI now lists every `getDiskSizesToShow` size as continuous sections; this helper remains for callers that want the narrower matching subset |
| `startDiskBuild` | `state → state` | Byte Foundry Disks: requires `isDiskBuildTurnAvailable(state)` (see its own row above); spends `getDiskCost(getDiskSize(state))` bits from `intro.bits` immediately and sets `intro.diskBuild = { size, remainingSeconds, totalSeconds }` — a real TIMED construction rather than an instant grant (an earlier version completed instantly — see `docs/DESIGN_HISTORY.md`). `totalSeconds = getDiskBuildBaseSeconds(size) * ordinal`, where `getDiskBuildBaseSeconds(size) = size / (getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE)` (1 second per real "KB" of size) and `ordinal = disksBuiltTotal[size] + 1` at the moment the build starts (so a size's Nth disk takes N times its own base build time). The array itself only gains the new EMPTY container, and starts accepting IO again, once `tickDiskBuild` finishes the countdown. No-op below cost, or if an array is already mid-build. Only ever queues ONE build at a time |
| `tickDiskBuild` | `elapsedSeconds → state → state` | Byte Foundry Disks: same-reference no-op when no build is in progress (`intro.diskBuild` is `null`); otherwise counts `remainingSeconds` down by `elapsedSeconds`. Once it crosses (or reaches) 0, increments `intro.disksBuiltTotal[size]` (the container now exists, empty, ready for `tickDiskAutoFill`) and clears `diskBuild` back to `null`, re-enabling every IO operation against that size's array. Called from `tickGame` right after `tickIntroProduction` and before `tickDiskAutoFill` — unconditional, bypasses nothing |
| `tickDiskAutoFill` | `(elapsedSeconds = 0) → state → state` | Byte Foundry Disks: three ascending passes over every known size (skipping mid-build — `intro.diskBuild?.size`): (1) refill each size's **read cache** toward full in whole-block transfers only when Memory holds ≥ one block (or dump a full-but-sub-block balance when capacity itself is &lt; one block) — skips sizes mid-flush; (2) start a timed flush into one empty disk when `diskCache[size] >= size`, no write-cache merge, and `isDiskRedeemable` is false — duration `getDiskReadCacheFlushSeconds` (one block ÷ production rate); (3) count down `intro.diskReadCacheFlush` (pause on tier match) and complete into one disk. Same-reference no-op when nothing changed. Called from `tickGame` before `tickDiskWriteCache` with real elapsed (advances flushes) and after it with `0` elapsed (refill/start only — avoids double-countdown), and again after a successful `tickDiskAutoRedeem` with 0 elapsed — unconditional, bypasses `isProductionFrozen` |
| `getDiskReadCacheFlushSeconds` | `(state, size) → number` | Duration for a new read-cache → disk flush: `(size / DISK_CACHE_BLOCK_COUNT) / getIntroProductionRate(intro)` |
| `getDiskReadCacheFlush` / `getDiskReadCacheFlushFill` / `isDiskReadCacheFlushPaused` | helpers | In-flight flush lookup, 0..1 progress fill, and whether tier match is currently pausing the countdown |
| `tickDiskWriteCache` | `elapsedSeconds → state → state` | Byte Foundry Disks upward ladder: when 10 full disks exist at source size N and target N+1 has an empty container, collects 10 timed segments into `intro.diskWriteCache[N+1]` (pausing collect while source size has an active tier claim), then flushes for one target build duration into one disk at N+1. Empty at rest. Called from `tickGame` between the two `tickDiskAutoFill` passes |
| `isDiskCacheBlockReleasable` | `(state, capacityBits) → bool` | Byte Foundry Disks: whether that size's cache currently holds at least one full, releasable block — `diskCache[capacityBits] >= capacityBits / DISK_CACHE_BLOCK_COUNT` — that size isn't currently mid-build, **and** `isDiskRedeemable(state, capacityBits)` (some tier's current per-unit cost matches this size) |
| `releaseDiskCacheBlock` | `capacityBits → state → state` | Byte Foundry Disks: no-op unless `isDiskCacheBlockReleasable`; otherwise moves exactly one block's worth of bits (`capacityBits / DISK_CACHE_BLOCK_COUNT`) out of `diskCache[capacityBits]` into `resources.base` (Bits) — **not** Memory — Cache's only player-facing use (manual funding of the matching tier's level blocks). `tickDiskAutoFill` refills the gap in whole-block transfers once Memory has enough again |
| `isDiskRedeemable` | `(state, capacityBits) → bool` | Byte Foundry Disks: true whenever ANY tier in `TIER_DEFINITIONS` (not just tier01) has `getTierCost(tier, purchaseLevels[tier.id] ?? 1) * BITS_PER_BYTE === capacityBits` right now — a genuine one-tick-only EXACT match (an earlier, tier01-only version used `<=`, "at or below," which let a disk redeem at a price higher than its own size — see `docs/DESIGN_HISTORY.md`). Every tier shares the same `costResourceId` ('base'/Bits), so a Disk's face value is a Byte Foundry currency amount, not a tier-specific one. An autobuyer burst can still jump a tier's level, and hence its cost, straight past a disk's exact size in a single tick — such a disk just waits, still full, until a later reset regrows the price back through that value — the only gate on whether a FULL disk is spendable |
| `getDiskRedeemTierName` | `(state, capacityBits) → string \| null` | Byte Foundry Disks: names which tier a disk of `capacityBits` would actually redeem into right now — the matched tier's display `name` (via the internal `getMatchingTierForDiskSize` helper — the FIRST tier in `TIER_DEFINITIONS` array order whose current per-unit cost exactly matches), or `null` if none currently matches. `ByteFoundryPage`/`StoragePage` call this directly (rather than reimplementing the match) to render e.g. "Redeems 1 10 KB disk for 1 free Megabyte" |
| `redeemDisk` | `capacityBits → state → state` | Byte Foundry Disks: no-op if no disk of that size is currently full (`intro.disks[capacityBits] <= 0`), if that size's array is currently mid-build (`intro.diskBuild?.size === capacityBits` — IO disallowed), or if no tier currently matches its size (`isDiskRedeemable`); otherwise decrements `intro.disks[capacityBits]` (removing the key entirely once it reaches 0 — `intro.disksBuiltTotal[capacityBits]` is untouched, so the disk re-enters the fillable pool) and grants 1 free unit of whichever tier currently matches via `grantTierUnits` — bypasses `isProductionFrozen`/`isTierUnlocked`/cost entirely, and deliberately bypasses `convertIntroBitsToKilobytes`/`tickIntroAutoInvest` too (a disk's contents came from Memory via `tickDiskAutoFill`, not a further bit-to-Kilobyte conversion at redeem time) |
| `tickDiskAutoRedeem` | `state → state` | Byte Foundry Disks: no-op unless there's an eligible size. A size is eligible if a disk of it is currently FULL, `isDiskRedeemable`, its array isn't currently mid-build, it isn't already in `intro.diskAutoRedeemedSizes` this cycle, AND the currently-matching tier's own unit-buying autobuyer is currently actually running — unlocked (`autobuyers[tier.id]` non-null) and not paused (`autobuyersEnabled[tier.id] ?? true`, via the internal `isTierAutobuyerActive` helper). No more "smallest denomination always auto-redeems regardless" carve-out, and no global enable/disable toggle at all — with no active autobuyer for the matching tier, a full/redeemable disk simply waits for a manual click (`redeemDisk`) instead. Redeems the smallest eligible size and marks it in `diskAutoRedeemedSizes`, capping auto-redeem at once per size per real Prestige cycle (reset fresh every real Prestige — see `prestigeGame`). Called from every branch of `tickGame`, frozen or not (bypasses the production freeze, same as `redeemDisk` itself), at the very end, after every other per-tick automation (including `tickDiskAutoFill`, which runs much earlier, right after `tickDiskBuild` — see the `tickGame` row above — and a possible automatic Speed Up), so it always reacts to every tier's truly final level for the tick — a disk filled earlier the same tick can still redeem the same tick |
| `isComputeCoreConversionUnlocked` | `state → bool` | Byte Foundry Compute Cores predicate (not a reducer): `intro.capacity >= INTRO_COMPUTE_CORE_UNLOCK_CAPACITY` (4,194,304 — 512 KiB in Memory's own binary scale) — drives whether `ByteFoundryPage` shows the "⚡ Compute" nav button to `ComputePage` at all. Unrelated to Disks entirely (earlier versions gated on Disk array fullness, then on a dynamic Memory flush — see `docs/DESIGN_HISTORY.md`) |
| `mergeComputeCoresIntoNode` / `mergeComputeNodesIntoCluster` / `mergeComputeClustersIntoNetwork` / `mergeComputeNetworksIntoGrid` / `mergeComputeGridsIntoFabric` / `mergeComputeFabricsIntoCloud` / `mergeComputeCloudsIntoDatacenter` / `mergeComputeDatacentersIntoSupercomputer` / `mergeComputeSupercomputersIntoMegacomputer` | `state → state` | ComputePage merge chain (issues #280/#321), each built off a shared `mergeComputeEntities(inputField, outputField, autoFlagField)` factory: player-triggered only, never called from `tickGame`. A permanent same-reference no-op once that boundary's own `autoFlagField` has ever flipped true (merging then fully transitions to the timed reserve system below — see `startComputeMergeReserve`); otherwise same-reference no-op below one full group of `COMPUTE_MERGE_RATIO` (8) of the input, or once the output is already at `COMPUTE_ENTITY_CAP` (10); otherwise converts every complete group into the output, capped at remaining room, leaving surplus input unconverted |
| `startComputeCoresMerge` / `startComputeNodesMerge` / `startComputeClustersMerge` / `startComputeNetworksMerge` / `startComputeGridsMerge` / `startComputeFabricsMerge` / `startComputeCloudsMerge` / `startComputeDatacentersMerge` / `startComputeSupercomputersMerge` | `state → state` | Reserve-merge timer system (issue #321), each built off a shared `startComputeMergeReserve(inputField, outputField, autoFlagField, timerField, durationSeconds, threshold)` factory — the manual, player-clicked ("slots are the button") counterpart to the auto-trigger inside `tickAutoMerge*` below, using `COMPUTE_MERGE_RATIO` (8) as its own threshold rather than `tickAutoMerge*`'s stricter `COMPUTE_ENTITY_CAP` (10). Same-reference no-op while that boundary's auto-merge isn't unlocked, a merge is already in flight (`timerField > 0`), the input is below `threshold`, or the output is already at `COMPUTE_ENTITY_CAP`; otherwise moves exactly `COMPUTE_MERGE_RATIO` out of the input and starts the timer at that boundary's own `COMPUTE_MERGE_DURATIONS_SECONDS` entry. `isComputeCoresMergeStartAvailable`/`isComputeNodesMergeStartAvailable`/… are each a plain UI mirror of the same gate |
| `tickAutoMergeCoresIntoNode` / `tickAutoMergeNodesIntoCluster` / `tickAutoMergeClustersIntoNetwork` / `tickAutoMergeNetworksIntoGrid` / `tickAutoMergeGridsIntoFabric` / `tickAutoMergeFabricsIntoCloud` / `tickAutoMergeCloudsIntoDatacenter` / `tickAutoMergeDatacentersIntoSupercomputer` / `tickAutoMergeSupercomputersIntoMegacomputer` | `elapsedSeconds → state → state` | Auto-merge + reserve-timer automation (issues #316/#321), each built off a shared `tickComputeMergeBoundary(elapsedSeconds, inputField, outputField, autoFlagField, timerField, durationSeconds)` factory combining two steps: (1) auto-starts a reserve merge (`startComputeMergeReserve`, same as `startCompute*Merge` above but at the stricter `COMPUTE_ENTITY_CAP` (10) auto-trigger threshold, not the manual `COMPUTE_MERGE_RATIO` (8)) if the matching `intro.autoMerge*` flag is set and the input is completely full; (2) counts an in-flight merge's timer down by `elapsedSeconds` (`tickComputeMergeReserveTimer`), granting 1 of the output entity and clearing the timer on completion. Called from `tickGame`'s `AUTO_MERGE_TICKERS.reduce`, each invoked as `tick(elapsedSeconds)(state)`, lowest tier first (Core → Node included), so one tick can cascade both auto-triggering and completion up multiple tiers in a row |
| `enableAutoMergeCoresIntoNode` / `enableAutoMergeNodesIntoCluster` / `enableAutoMergeClustersIntoNetwork` / `enableAutoMergeNetworksIntoGrid` / `enableAutoMergeGridsIntoFabric` / `enableAutoMergeFabricsIntoCloud` / `enableAutoMergeCloudsIntoDatacenter` / `enableAutoMergeDatacentersIntoSupercomputer` / `enableAutoMergeSupercomputersIntoMegacomputer` | `state → state` | Auto-merge automation (issues #316/#321), each built off a shared `enableAutoMerge(outputField, autoFlagField)` factory: no-op below the matching `isAutoMerge*UnlockAvailable` gate; otherwise sacrifices ALL `COMPUTE_ENTITY_CAP` (10) currently-held units of that merge's own OUTPUT entity and permanently sets the matching `intro.autoMerge*` flag true — which is what actually switches that boundary over to the timed reserve-merge system (see `startComputeMergeReserve` further down this table) |
| `isAutoMergeCoresIntoNodeUnlockAvailable` / `isAutoMergeNodesIntoClusterUnlockAvailable` / `isAutoMergeClustersIntoNetworkUnlockAvailable` / `isAutoMergeNetworksIntoGridUnlockAvailable` / `isAutoMergeGridsIntoFabricUnlockAvailable` / `isAutoMergeFabricsIntoCloudUnlockAvailable` / `isAutoMergeCloudsIntoDatacenterUnlockAvailable` / `isAutoMergeDatacentersIntoSupercomputerUnlockAvailable` / `isAutoMergeSupercomputersIntoMegacomputerUnlockAvailable` | `state → bool` | Whether the matching `enableAutoMerge*` action would do anything: `COMPUTE_ENTITY_CAP` (10) of the OUTPUT entity held AND the matching `autoMerge*` flag isn't already true |
| `getComputeBoostTierMultiplier` | `(boostType, tierIndex) → number` | Byte Foundry Compute Boost (issue #326): `preset.multiplier * COMPUTE_BOOST_TIER_POWER_STEP ** (tierIndex - 1)` — 0 for an invalid `boostType` or an out-of-range `tierIndex` (not 1-`COMPUTE_BOOST_TIER_FIELDS.length`) |
| `getComputeBoostTierDurationSeconds` | `(boostType, tierIndex) → number` | Byte Foundry Compute Boost: `preset.durationSeconds * COMPUTE_BOOST_TIER_DURATION_STEP ** (tierIndex - 1)` (duration doubles each merge tier). 0 for invalid inputs |
| `getComputeBoostMultiplier` | `intro → number` | Byte Foundry Compute Boost: `getComputeBoostTierMultiplier(intro.computeBoostType, intro.computeBoostTierIndex ?? 1) \|\| 1` — 1 (no effect) while no boost is active; `?? 1` defensively falls back to tier 1 (Core) for a save from before `computeBoostTierIndex` existed. Applied to Memory's own passive production (`tickIntroProduction`) and `tier01`'s production specifically (`tickGame`) |
| `canActivateComputeBoost` | `(state, boostType, tierIndex) → bool` | Byte Foundry Compute Boost predicate (not a reducer): `boostType` must be a real `COMPUTE_BOOST_PRESETS` key, `tierIndex` must be valid with ≥1 token of that tier's own field (`COMPUTE_BOOST_TIER_FIELDS[tierIndex - 1]`) held, AND no boost of ANY kind is currently active (issue #326 — activating a NEW boost, even the same type/tier, is blocked entirely while one is running; see `canStackComputeBoost` for extending the active one instead). The actual gate `activateComputeBoost` itself enforces, not just a UI-only disabled state |
| `canStackComputeBoost` | `state → bool` | Byte Foundry Compute Boost predicate (issue #326): a boost IS currently active, `computeBoostStacks < COMPUTE_BOOST_MAX_STACKS`, and ≥1 more token of the ACTIVE boost's OWN funding tier (`intro.computeBoostTierIndex`) is held — NOT whatever tier a player might have since selected in the UI |
| `activateComputeBoost` | `(boostType, tierIndex) → state → state` | Byte Foundry Compute Boost (issue #326): requires `isComputeBoostTurnAvailable(state, boostType, tierIndex)` (see its own row above); otherwise spends exactly 1 token of `tierIndex`'s own field and starts a fresh boost: `computeBoostType: boostType`, `computeBoostTierIndex: tierIndex`, `computeBoostStacks: 1`, `computeBoostRemainingSeconds: getComputeBoostTierDurationSeconds(boostType, tierIndex)` |
| `stackComputeBoost` | `state → state` | Byte Foundry Compute Boost (issue #326): requires `isStackComputeBoostTurnAvailable(state)`; otherwise spends 1 more token of the ACTIVE boost's own funding tier, increments `computeBoostStacks`, and adds that same tier's own `getComputeBoostTierDurationSeconds` onto `computeBoostRemainingSeconds` (extending, not resetting, the remaining time) — the multiplier itself never compounds. The replacement for same-type restacking through the preset buttons, which `activateComputeBoost` no longer permits |
| `tickComputeBoost` | `elapsedSeconds → state → state` | Byte Foundry Compute Boost: same-reference no-op while no boost is active; otherwise decrements `computeBoostRemainingSeconds` by `elapsedSeconds`, clearing back to inactive (`type: null`, `tierIndex: null`, `stacks: 0`, `remaining: 0`) once it reaches 0. Runs every tick, frozen or not — called from `tickGame` alongside the other Byte Foundry intro ticks |
| `canReclaimComputeBoost` | `state → bool` | Whether `reclaimComputeBoost` below would do anything: any boost currently active (`computeBoostType !== null`) |
| `reclaimComputeBoost` | `state → state` | Byte Foundry Compute Boost (issues #316/#326/#363): no-op below `canReclaimComputeBoost`'s own gate; otherwise the exact inverse of one `activateComputeBoost`/`stackComputeBoost` call — refunds 1 token into the ACTIVE boost's own funding tier field (capped at `COMPUTE_ENTITY_CAP`, in case more were earned while the boost was running) and subtracts that tier's own base preset `durationSeconds` back out of `computeBoostRemainingSeconds` (floored at 0), decrementing `computeBoostStacks` by 1; clears the boost fully back to inactive (`type: null`, `tierIndex: null`, `stacks: 0`, `remaining: 0`) once the last stack is reclaimed rather than leaving a 0-stack "active" boost around |
| `buyTier` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`; otherwise validates unlock + affordability, deducts cost, increments `owned`/`purchased` by 1; used internally by `buyTierQuantity`, not called directly by the UI |
| `buyTierQuantity` | `(tierId, quantity) → state → state` | Buys up to `quantity` units (capped at the cost-block boundary via `getTierBulkQuantity`), stopping early if a unit becomes unaffordable; used both by the manual "Buy" button (always `quantity` `Number.MAX_SAFE_INTEGER`, see `useIncrementalGame`'s `BUY_QUANTITY`) and by `tickGame`'s autobuyer loop — the two purchase paths are identical, a tier's tickspeed multiplier level has no effect on how much a purchase costs or how many units it grants |
| `applyAutobuyerMilestones` | `state → state` | For every tier whose `getAutobuyerUnlockMilestone(tierId)`/`getTierTickspeedAutobuyerMilestone(tierId)` is met by `state.prestige.count` and isn't already unlocked, sets `autobuyers[tierId] = 1` and/or `tierTickspeedAutobuyer[tierId] = true` — no PP spent, no cost check at all. Never revokes anything already unlocked; returns the same state reference if nothing newly qualifies. Called from `prestigeGame` (right after incrementing `count`) |
| `buyTickspeedMultiplier` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen` or if the tier itself isn't unlocked yet (`isTierUnlocked`) — no autobuyer-unlock prerequisite at all; otherwise upgrades `tickspeedLevels[tierId]` from N to N+1 — always by spending the tier's own resource via `getTickspeedMultiplierCost(tierId, N + 1)`. Each level speeds up that tier's own delivery frequency by another 10% (via `getTickspeedProductionMultiplier`, divided into `getEffectiveTierTickSpeedSeconds` — see "Tier production tickspeed" in CLAUDE.md), without changing the amount delivered per batch, how often the autobuyer attempts a purchase, how each individual purchase is paid for/batched, or manual Buy. Since `resources[tierId]` and `owned[tierId]` move together, a call requires `available >= cost + 1`, not just `available >= cost` — paying the exact cost would zero out the tier's own generator count (and its production), so the last unit is reserved and the call is a no-op until at least 1 would remain afterward; the MainPage tickspeed button's `disabled` state mirrors this same `+ 1` threshold. Also called automatically by `tickGame` for every tier whose tier tickspeed autobuyer is unlocked (`tierTickspeedAutobuyer[tier.id]`, via `applyAutobuyerMilestones`) — **except the last tier once `isLastTierTickspeedXpUnlocked` holds**, where `tickGame` calls `consumeXpForLastTierTickspeed` instead of this function (see "The last tier's XP-funded tickspeed" in CLAUDE.md); manually clicking this button for the last tier while that holds is still simply a no-op, resuming once owned drops back below a full level |
| `buyPrestigeSpeedBonus` | `state → state` | Returns the same state if `isProductionFrozen`, if `prestigeSpeedBonusUnlocked` is already true, or if there aren't enough unspent Prestige Points; otherwise spends `PRESTIGE_SPEED_BONUS_UNLOCK_COST` PP and permanently sets `prestigeSpeedBonusUnlocked = true`, activating `getPrestigeProductionMultiplier`'s passive bonus in `tickGame` |
| `buySmartAutobuyer` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`, if the tier's autobuyer isn't unlocked yet (`autobuyers[tierId] == null`), if already smart, or if there aren't enough unspent Prestige Points; otherwise spends `getSmartAutobuyerCost(tierId)` PP and permanently sets `smartAutobuyer[tierId] = true` |
| `buyAutoPrestige` | `state → state` | Returns the same state if `isProductionFrozen` or if there aren't enough unspent Prestige Points for the next level; otherwise activates (`null` → 1) or upgrades (level N → N+1) via `getAutoPrestigeCost(currentLevel)` — a single global upgrade track, not per-tier |
| `buyAutoPrestigeAutobuyer` | `state → state` | Returns the same state if `isProductionFrozen`, if Auto-Prestige hasn't been activated yet (`state.autoPrestige` is still `null` — this automates RE-leveling only, not the initial activation), if already bought, or if there aren't enough unspent Prestige Points; otherwise spends `AUTO_PRESTIGE_AUTOBUYER_COST` PP and permanently sets `autoPrestigeAutobuyer = true`, making `tickGame` call `buyAutoPrestige` automatically every tick |
| `isGlobalTickspeedMultiplierUnlocked` | `state → bool` | `owned[TIER_DEFINITIONS[1].id] >= 1 \|\| globalTickspeedMultiplier != null` — gates the global tickspeed multiplier's *initial* activation on owning at least 1 of the second tier; once active it stays true regardless of tier02's current owned count |
| `buyGlobalTickspeedMultiplier` | `state → state` | Returns the same state if `isProductionFrozen`, if `isGlobalTickspeedMultiplierUnlocked` is false, or if there isn't enough Money; otherwise activates (`null` → 1) or upgrades (level N → N+1) via `getGlobalTickspeedMultiplierCost(currentLevel)`, spending `resources[MONEY_ID]` directly (no PP involved) — a single global upgrade track, not per-tier, compounding every tier's production by another 1% per level |
| `buyAutoSpeedUp` | `state → state` | Returns the same state if `isProductionFrozen`, if `autoSpeedUp` is already true, or if there aren't enough unspent Prestige Points; otherwise spends `AUTO_SPEED_UP_COST` PP and permanently sets `autoSpeedUp = true`, making `tickGame` call `speedUpGame` automatically every tick |
| `buyTickspeedAutobuyer` | `state → state` | Returns the same state if `isProductionFrozen`, if `autoGlobalTickspeed` is already true, or if there aren't enough unspent Prestige Points; otherwise spends `TICKSPEED_AUTOBUYER_COST` PP and permanently sets `autoGlobalTickspeed = true`, making `tickGame` call `buyGlobalTickspeedMultiplier` automatically every tick |
| `setAutoSpeedUpEnabled` | `enabled → state → state` | Unconditional (not gated by `isProductionFrozen`) and a no-op if `autoSpeedUp` is still falsy; otherwise sets `autoSpeedUpEnabled` to `!!enabled`, pausing/resuming `tickGame`'s automatic `speedUpGame` call without touching `autoSpeedUp` itself — see "Pause/resume for the global automations" above |
| `setAutoGlobalTickspeedEnabled` | `enabled → state → state` | Same convention as `setAutoSpeedUpEnabled`, gating `autoGlobalTickspeed` instead — a no-op if `autoGlobalTickspeed` is still falsy |
| `setAutoPrestigeEnabled` | `enabled → state → state` | Same convention as `setAutoSpeedUpEnabled`, gating `autoPrestige` instead — a no-op if `autoPrestige` is still `null` |
| `setAutoPrestigeAutobuyerEnabled` | `enabled → state → state` | Same convention as `setAutoSpeedUpEnabled`, gating `autoPrestigeAutobuyer` instead — a no-op if `autoPrestigeAutobuyer` is still falsy |
| `setAutobuyerEnabled` | `(tierId, enabled) → state → state` | Same convention as `setAutoSpeedUpEnabled`, gating that tier's `autobuyersEnabled[tierId]` instead — unconditional, not gated by `isProductionFrozen`, and a no-op if `autobuyers[tierId]` is still `null` (not yet unlocked). `tickGame` treats a paused tier's autobuyer exactly like "never unlocked" for automation purposes, including its attempt-budget accumulation — see "Pause/resume for per-tier automations" in CLAUDE.md |
| `setTierTickspeedAutobuyerEnabled` | `(tierId, enabled) → state → state` | Same convention as `setAutobuyerEnabled`, gating that tier's `tierTickspeedAutobuyerEnabled[tierId]` instead — a no-op if `tierTickspeedAutobuyer[tierId]` is still falsy |
| `getPurchaseMilestoneMultiplier` | `level → number` | `levelsCompleted = level - 1`, `megaBlocks = floor(levelsCompleted/10)`, `regularBlocks = levelsCompleted - megaBlocks`; returns `PURCHASE_MILESTONE_MULTIPLIER_BASE ** regularBlocks * PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE ** megaBlocks` (`2`, `10`) — doubles a tier's own passive production at every completed level, the same boundary where `getTierCost`'s cost-epoch exponent steps up, **except** every 10th such level contributes a 10x factor instead of the regular 2x for that one level, compounding into the rest (e.g. level 81 → `2^9 * 10^1` = 5120, not `2^10` = 1024) — this "every 10th level" mega cadence is independent of the (now variable) block size and stays a fixed 10 regardless of level size. Takes the tier's current LEVEL directly, not a lifetime purchased count. Applies uniformly regardless of whether those purchases were manual or via an autobuyer |
| `getSpeedUpMultiplier` | `speedUpCount → number` | `SPEED_UP_MULTIPLIER_BASE ** speedUpCount` (2^speedUpCount) — the unconditional, stacking production-speed multiplier from Speed Up activations; no unlock purchase needed, unlike `getPrestigeProductionMultiplier` |
| `getSpeedUpRequirement` | `speedUpCount → number` | `speedUpCount + 6` — the last tier's LEVEL the *next* Speed Up needs: level 6 (displayed level 5) for the first activation, level 7 (displayed 6) for the second, level 8 (displayed 7) for the third, … Expressed as a level target rather than a lifetime-purchased-count threshold since how many purchases a level boundary corresponds to now depends on the current (possibly grown) block size, while the level number itself doesn't |
| `getOverclockRequirement` | `overclockCount → number` | `overclockCount * OVERCLOCK_REQUIREMENT_STEP + 2` (`OVERCLOCK_REQUIREMENT_STEP = 1`) — the last tier's LEVEL the *next* Overclock claim needs: level 2 for the first claim, level 3 for the second, level 4 for the third, … Same `+1`-per-cycle shape as `getSpeedUpRequirement`, just without its display offset; the `+2` floor (not `+1`) stops a completely untouched last tier (which starts at level 1 by default) from making the first claim of a cycle free |
| `getOverclockMultiplier` | `overclockCount → number` | `(1 + OVERCLOCK_MULTIPLIER_STEP) ** overclockCount` (`OVERCLOCK_MULTIPLIER_STEP = 0.1`) — Overclock's own growth factor: ×1 with no claims, ×1.1 after the first claimed level, ×1.21 after the second, and so on. Folded into `getGlobalTickspeedProductionMultiplier` below (multiplies both its regular and milestone steps) — not a standalone factor |
| `getTickspeedMultiplierBaseCost` | `tierIndex → number` | `10 ** (TICKSPEED_MULTIPLIER_BASE_EXPONENT - tierIndex)` — 10^10 for the first tier (index 0), decreasing by a power of ten per subsequent tier, down to 10^1 for the 10th/last tier (index 9); an out-of-range index is clamped into range rather than throwing |
| `getTickspeedMultiplierCost` | `(tierId, targetLevel) → number` | `getTickspeedMultiplierBaseCost(tierIndex) ** (targetLevel - 1)` — the resource cost, in that tier's own resource, to reach `targetLevel`: level 1 costs `base^0 = 1` (the free baseline, never actually charged), level 2 costs exactly the tier's base cost (`base^1`), level 3 costs `base^2`, and so on. Money-funded only — unrelated to `getAutobuyerUnlockCost` (below) |
| `getAutobuyerUnlockCost` | `tierId → number` | `AUTOBUYER_UNLOCK_BASE_COST * (tierIndex + 1)` — no longer an actual PP cost (a tier's autobuyer unlocks for free at a prestige-count milestone instead, see `getAutobuyerUnlockMilestone`/`applyAutobuyerMilestones` below); kept only as the pricing benchmark `getSmartAutobuyerCost` multiplies: 1 through 10 across the ten tiers; an unrecognized tier id is treated as index 0 |
| `getAutobuyerUnlockMilestone` | `tierId → number` | `AUTOBUYER_UNLOCK_MILESTONE_START + tierIndex * AUTOBUYER_UNLOCK_MILESTONE_STEP` (`1`, `1`) — the number of prestiges required before a tier's unit-buying autobuyer unlocks automatically: 1 for the first tier, up through 10 for the 10th/last; an unrecognized tier id is treated as index 0 |
| `getTierTickspeedAutobuyerMilestone` | `tierId → number` | `TIER_TICKSPEED_AUTOBUYER_MILESTONE_START + tierIndex * TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP` (`12`, `2`) — the number of prestiges required before a tier's own tickspeed autobuyer unlocks automatically: 12 for the first tier, up through 30 for the 10th/last |
| `getTickspeedProductionMultiplier` | `level → number` | `1.1 ** (level - 1)` (`TICKSPEED_PRODUCTION_STEP = 0.1`; `null`/never-unlocked and level ≤ 1 all treated as the baseline ×1, no bonus); despite the name, this factor is no longer multiplied into a production credit directly — `getEffectiveTierTickSpeedSeconds` divides it into the tier's base tickspeed instead, so it speeds up delivery frequency rather than delivery size |
| `getSmartAutobuyerCost` | `tierId → number` | `SMART_AUTOBUYER_COST_MULTIPLIER * getAutobuyerUnlockCost(tierId)` — 10x that tier's pricing-benchmark value (10 PP through 100 PP across the ten tiers) — still a real PP cost, unlike the benchmark itself |
| `getAutoPrestigeCost` | `currentLevel → number` | `AUTO_PRESTIGE_COST * AUTO_PRESTIGE_COST_MULTIPLIER^currentLevel` — 1000 PP to activate (level 0→1), doubling each level after (2000, 4000, …) |
| `getAutoPrestigeAttemptRate` | `autoPrestigeLevel → number` | `1.1 ** (level - 1) / AUTO_PRESTIGE_BASE_INTERVAL_SECONDS` (`null` treated as level 1 defensively); the per-tick Auto-Prestige attempt-budget increment; level 1 fires roughly every 1000 seconds, each level after that 10% sooner, compounding |
| `getGlobalTickspeedMultiplierCost` | `currentLevel → number` | `10 ** (currentLevel + 1)` — the Money cost to activate (level 0→1, costing 10 Money) or upgrade (level N→N+1) the global tickspeed multiplier; doubles the exponent each level (100, 1000, …) |
| `getGlobalTickspeedProductionMultiplier` | `(level, overclockCount = 0) → number` | `milestoneLevels = countGlobalTickspeedMilestones(level)`, `regularLevels = level - milestoneLevels`, `overclockFactor = getOverclockMultiplier(overclockCount)`, `regularStep = GLOBAL_TICKSPEED_PRODUCTION_STEP * overclockFactor`, `milestoneStep = GLOBAL_TICKSPEED_MILESTONE_STEP * overclockFactor`; returns `(1 + regularStep) ** regularLevels * (1 + milestoneStep) ** milestoneLevels` (`GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01`, `GLOBAL_TICKSPEED_MILESTONE_STEP = 0.10`; `null`/never-bought treated as level 0, i.e. no bonus, ×1, regardless of `overclockCount`) — every level compounds, a regular level at `regularStep` (1% by default, permanently raised by Overclock), a milestone level at `milestoneStep` (10% by default, also raised by Overclock). `overclockCount` defaults to 0 so pre-Overclock call sites don't need updating, but every real call site in this codebase passes it explicitly. `countGlobalTickspeedMilestones` (module-private) counts milestones with spacing 10 up to level 100 (10 milestones), spacing 100 from 100 to 1000 (9 more), spacing 1000 from 1000 to 10000 (9 more), and so on |
| `getPrestigePointsAwarded` | `(money, doublePpLevel = 0) → number` | 0 below `PRESTIGE_THRESHOLD`; otherwise `(1 + floor(excessPowers / getPrestigePowersPerPp(doublePpLevel))) * getPrestigePpPerPower(doublePpLevel)` where `excessPowers = max(0, getMoneyExponent(money) - floor(log10(GOOGOL)))` — 1 base PP at 1 Googol Bytes, +1 PP unit per 64 excess powers (halved by each Double PP upgrade through level 6, then PP-per-power doubles) |
| `getPrestigePowersPerPp` | `doublePpLevel → number` | `PRESTIGE_POWERS_PER_PP_BASE / 2^min(level, log2(64))` — 64 down to 1 |
| `getPrestigePpPerPower` | `doublePpLevel → number` | `2^max(0, level - log2(64))` — 1 until level 7, then 2, 4, … |
| `getPrestigeDoublePpUpgradeCost` | `currentLevel → number` | `100^(currentLevel + 1)` PP |
| `buyPrestigeDoublePp` | `state → state` | Spends `getPrestigeDoublePpUpgradeCost(prestigeDoublePpLevel)` PP and increments `prestigeDoublePpLevel`; not blocked by production freeze |
| `isUnboundedPrestigeUnlocked` | `state → boolean` | `prestige.unboundedUnlocked` OR `prestige.count >= PRESTIGE_UNBOUNDED_MIN_COUNT` (100) |
| `isEraEligible` | `state → boolean` | `prestige.points >= ERA_ELIGIBILITY_PP` (1 Googol PP balance) |
| `getEonsAwarded` | `state → number` | `1 + eonAmplifierLevel * EON_AMPLIFIER_AWARD_PER_LEVEL` Eons awarded on Era ascension |
| `eraGame` | `state → state` | Requires `isEraEligible`; meta-prestige reset/carry per "Era ascension and Eons" above; same-reference no-op when ineligible |
| `getHyperscalerFlopsBoostRate` | `state → number` | Permanent hyperscaler Flops rate (0.01%/s each at base, +efficiency levels) |
| `buyHyperscaler` | `state → state` | Spends escalating Eons; increments `hyperscalerCount`; no-op if unaffordable |
| `applyFlopsAutobuyerMilestones` | `state → state` | Unlocks Flops autobuyers free at Era milestones; called from `eraGame` |
| `setComputeFlopsAutobuyerEnabled` | `(flopId, enabled) → state → state` | Pause/resume a unlocked Flops autobuyer |
| `getPrestigeProductionMultiplier` | `points → number` | `1 + PRESTIGE_POINT_SPEED_BONUS * points` — a flat +1% production speed per unspent Prestige Point. A pure formula, not auto-applied — callers must check `prestigeSpeedBonusUnlocked` first; before that's bought, every caller uses a flat `1` instead. Fractional whenever `points` isn't a multiple of 100; `tickGame` floors its production credit to absorb this |
| `prestigeGame` | `state → state` | Requires Money ≥ `PRESTIGE_THRESHOLD`; resets resources/owned/purchased, every tier's `tickspeedLevels`/`purchaseLevels`/`purchaseLevelProgress` entries back to their baseline (1/1/0 — no speed bonus, level 1, no progress; resetting `purchaseLevels` also resets `getPurchaseBlockSize` back to `DEFAULT_PURCHASE_BLOCK_SIZE`), `globalTickspeedMultiplier` back to `null` (not-yet-bought — same reset `speedUpGame` does), `speedUpCount` back to 0 (run-scoped — unlike every other flag/level listed next, the stacking Speed Up multiplier does NOT survive a real Prestige and must be rebuilt from scratch each cycle), `prestige.xp`/`lastTierXpConsumed` back to 0 (run-scoped, like resources/owned/purchased), and `everUnlockedTierIds` back to the fresh default (only the first tier true — so every tier beyond the first relocks exactly as it always has, same as owned/purchased), resets `intro.bits`/`intro.productionAccumulator` ("Memory") and `intro.mainGameUnlocked` (the gate) back to `createInitialGameState()`'s fresh defaults — the transfer-block row's own progress resets too, purely as a side effect of `purchaseLevels`/`purchaseLevelProgress` resetting for every tier above, tier01 included, while keeping `intro.capacity`/`intro.byteCreated`/`intro.tickSpeedSeconds`/`intro.productionMultiplier`/`intro.productionMilestoneTier`/`intro.productionMilestoneTierClaims` (the Byte generator and its upgrades) and `intro.computeCores`/`intro.computeCoresEverEarned`/`intro.computeNodes`/`intro.computeClusters`/`intro.computeNetworks`/`intro.computeGrids`/`intro.computeFabrics`/`intro.computeClouds`/`intro.computeDatacenters`/`intro.computeSupercomputers`/`intro.computeMegacomputers`/`intro.computeMergePageUnlocked`/`intro.autoMergeCoresIntoNode`/`intro.autoMergeNodesIntoCluster`/`intro.autoMergeClustersIntoNetwork`/`intro.autoMergeNetworksIntoGrid`/`intro.autoMergeGridsIntoFabric`/`intro.autoMergeFabricsIntoCloud`/`intro.autoMergeCloudsIntoDatacenter`/`intro.autoMergeDatacentersIntoSupercomputer`/`intro.autoMergeSupercomputersIntoMegacomputer`/`intro.computeCoresMergeRemainingSeconds`/`intro.computeNodesMergeRemainingSeconds`/`intro.computeClustersMergeRemainingSeconds`/`intro.computeNetworksMergeRemainingSeconds`/`intro.computeGridsMergeRemainingSeconds`/`intro.computeFabricsMergeRemainingSeconds`/`intro.computeCloudsMergeRemainingSeconds`/`intro.computeDatacentersMergeRemainingSeconds`/`intro.computeSupercomputersMergeRemainingSeconds` (issue #321 — an in-flight reserve merge's timer is PERMANENT too, carried through unchanged rather than cancelled, since it represents already-committed tokens) PERMANENT, carried over from `state` unchanged (see "Byte Foundry" below) — a real Prestige sends the player back through the gate every cycle, but not through a from-scratch replay of the generator itself, keeps autobuyer *unlock* flags, and `smartAutobuyer`/`tierTickspeedAutobuyer`/`autobuyersEnabled`/`tierTickspeedAutobuyerEnabled`/`autoPrestige`/`autoPrestigeAutobuyer`/`autoSpeedUp`/`autoGlobalTickspeed`/`autoSpeedUpEnabled`/`autoGlobalTickspeedEnabled`/`autoPrestigeAutobuyerEnabled`/`autoPrestigeEnabled` unchanged (permanent, including the Auto-Prestige *level*, the Auto-Prestige Autobuyer, and each automation's pause/resume preference, both global and per-tier; `autoSpeedUp` is the automation *toggle* only — it carries over even though the `speedUpCount` multiplier it drives resets), resets `autoPrestigeAttemptBudget` to 0 (like `autobuyerAttemptBudgets`), adds `getPrestigePointsAwarded(money)` on top of any already-unspent `prestige.points`, increments `prestige.count` by 1 (both permanent, unlike `xp`). Since `owned` resets, this also disengages the last tier's XP-funded tickspeed mechanic (`isLastTierTickspeedXpUnlocked` is a live check — see "The last tier's XP-funded tickspeed" in CLAUDE.md) — with nothing banked to re-engage with either, since `lastTierXpConsumed` was just wiped along with it. Called either by the player's manual click or automatically by `tickGame` when Auto-Prestige's attempt budget fires |
| `speedUpGame` | `state → state` | Requires `state.purchaseLevels[lastTier.id] >= getSpeedUpRequirement(speedUpCount)` and not `isProductionFrozen`; resets resources/owned/purchased/tierProductionAccumulators/autobuyerAttemptBudgets/autoPrestigeAttemptBudget/tickspeedLevels/purchaseLevels/purchaseLevelProgress (every tier back to baseline)/`globalTickspeedMultiplier` (back to `null`)/`prestige.xp`/`lastTierXpConsumed` (both back to 0, same as `prestigeGame`)/`everUnlockedTierIds` (back to the fresh default, same as `prestigeGame`) exactly like a fresh `createInitialGameState` — resetting `purchaseLevels` also resets `getPurchaseBlockSize` back to `DEFAULT_PURCHASE_BLOCK_SIZE`, undoing any in-run growth — unlike `prestigeGame`, keeps `intro` completely untouched (an intra-cycle soft reset, not a new cycle — see "Byte Foundry" below), autobuyer *unlock* flags, and `smartAutobuyer`/`tierTickspeedAutobuyer`/`autobuyersEnabled`/`tierTickspeedAutobuyerEnabled`/`autoPrestige`/`autoPrestigeAutobuyer`/`prestigeSpeedBonusUnlocked`/`autoSpeedUp`/`autoGlobalTickspeed`/`autoSpeedUpEnabled`/`autoGlobalTickspeedEnabled`/`autoPrestigeAutobuyerEnabled`/`autoPrestigeEnabled` unchanged (mirrors `prestigeGame`'s reset pattern, including now resetting `globalTickspeedMultiplier`/`prestige.xp`/`lastTierXpConsumed` the same way; see "The global tickspeed multiplier" above), **and now also `overclockCount`** (carried over unchanged — see "Overclock" below) — and — same as `prestigeGame` — disengages the last tier's live-checked XP-funded tickspeed mechanic with nothing banked to re-engage with — leaves `prestige.points`/`count`/`highestMilestone` untouched — unlike `prestigeGame`, it doesn't award or spend Prestige Points — and increments `speedUpCount` by 1. Called either by the player's manual click or automatically by `tickGame` when Auto Speed Up is bought |
| `overclockGame` | `state → state` | Requires `state.purchaseLevels[lastTier.id] >= getOverclockRequirement(overclockCount)` and not `isProductionFrozen`; resets everything `speedUpGame` resets, the same way, keeps the same permanent flags/levels `speedUpGame` keeps — **plus two differences**: resets `speedUpCount` back to 0 (wiping Speed Up's own stacking multiplier, not just leaving it alone) and sets `overclockCount` to `state.purchaseLevels[lastTier.id]` (the last tier's level at claim time — always at least +1 above the previous `overclockCount`, and a catch-up jump past that when the player is ahead of the bare minimum) instead of leaving it untouched. Leaves `prestige.points`/`count`/`highestMilestone` untouched, same as `speedUpGame` — doesn't award or spend Prestige Points. See "Overclock" below |
| `isTierUnlocked` | `state → tier → bool` | First tier always unlocked; later tiers need `owned[tierId] > 0`, `purchaseLevels[prevTier] >= 3` (the tier below has fully purchased two levels), or the permanent `everUnlockedTierIds[tierId]` flag (see `latchEverUnlockedTiers`) |
| `latchEverUnlockedTiers` | `state → state` | Not exported — sets `everUnlockedTierIds[tierId] = true` for any tier whose live `isTierUnlocked` condition is met but not yet flagged; returns the same state reference if nothing newly qualifies. Called from `buyTier` and `tickGame`'s production step, the only two places `owned` can increase |
| `getMoneyExponent` | `money → number` | `floor(log10(money))`, floored to 0 below 1 — money's order of magnitude, also what `checkMilestones` tracks as XP milestones |
| `getPrestigeProgressPercent` | `money → number` | `getMoneyExponent(money) / log10(GOOGOL) * 100`, rounded and clamped to `[0, 100]` — GOOGOL is exponent 100, so this reads as a whole percent equal to the money exponent itself |
| `getNextBytePowerProgressFraction` | `moneyBits → number` | Progress `0–1` toward the next power-of-ten Bytes: `(moneyBits / BITS_PER_BYTE) / 10^(floor(log10(bytes))+1)`, clamped to `[0, 1]` — MainPage's 8-segment bar under MoneyHero (each segment = 12.5%) |
| `getEffectiveTierTickSpeedSeconds` | `(state, tierId) → number` | `getTierBaseTickSpeedSeconds(tierId) / (tickspeedMultiplier × getGlobalTickspeedProductionMultiplier(globalTickspeedMultiplier, overclockCount))` — a tier's actual production period once both tickspeed multipliers have shrunk it; always `<=` the base value, since both multipliers are always `>= 1`. `tickspeedMultiplier` is `getTickspeedProductionMultiplier(tickspeedLevels[tierId])` normally, or — for the last tier while `isLastTierTickspeedXpUnlocked` — `getLastTierXpTickspeedMultiplier(lastTierXpConsumed)` instead (see "The last tier's XP-funded tickspeed" in CLAUDE.md). Overclock has no separate third factor here — its effect is already folded into the global tickspeed multiplier itself via that function's own `overclockCount` parameter (see "Overclock" below). If the division result is non-finite or <= 0 (a sufficiently large multiplier overflowing to `Infinity` in double-precision float — reachable in principle within a single run before the next Prestige/Speed Up resets `lastTierXpConsumed` — would otherwise divide the period down to exactly 0), returns `MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS` (`1e-9`, module-private in `engine.js`) instead — a pure numerical-safety floor, not a balance constant; see "Multiplier overflow safety" below for why an unguarded 0 period corrupts state. Used by both `tickGame` and `getTierProductionProgressPercent` so the two never disagree about what "one period" means for a tier |
| `isLastTierTickspeedXpUnlocked` | `state → bool` | `owned[lastTierId] >= getPurchaseBlockSize(state)` — a live check against the last tier's current owned count reaching one full level's worth (not a stored/latched flag) — a lighter-weight threshold than `isTierUnlocked`'s own two-level requirement for the tier below it, since this gates an XP bonus rather than revealing a new tier; whether the last tier's Money-funded tickspeed multiplier is currently replaced by the XP-funded one. Turns back off the moment owned drops below that threshold (e.g. a Prestige/Speed Up reset), then back on again once bought back up to it |
| `getLastTierXpTickspeedMultiplier` | `xpConsumed → number` | `(1 + LAST_TIER_XP_TICKSPEED_STEP) ** xpConsumed` (`LAST_TIER_XP_TICKSPEED_STEP = 0.01`) — compounds 1% per cumulative XP ever consumed via `consumeXpForLastTierTickspeed`, the same multiplicative form every other tier's own tickspeed multiplier uses (37 XP consumed = `1.01^37` ≈ ×1.446, not a flat +37%) |
| `getLastTierXpTickspeedMinConsumption` | `xpConsumed → number` | `max(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, ceil(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT * xpConsumed))` (`LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT = 0.1`, floor `= 1`) — the minimum a single `consumeXpForLastTierTickspeed` call may spend, growing alongside the cumulative XP already consumed this way |
| `consumeXpForLastTierTickspeed` | `amount → state → state` | Returns the same state if `isProductionFrozen`, if not currently `isLastTierTickspeedXpUnlocked`, if `amount` isn't a positive integer, if it's below `getLastTierXpTickspeedMinConsumption(lastTierXpConsumed)`, or if there isn't enough unspent XP; otherwise spends `amount` from `prestige.xp`, adds it to `lastTierXpConsumed`, and resets every tier *except the last one*'s `owned` (and matching `resources`) count to 0 plus the Money balance (`resources[MONEY_ID]`) to 0 — `purchased` and the last tier's own `owned`/`resources` are untouched (see "The last tier's XP-funded tickspeed" in CLAUDE.md). Called both manually (the "🧬 {XP} XP" button, always passing the tier's entire current XP balance) and automatically by `tickGame`, once per tick, for a tier whose `tierTickspeedAutobuyer` flag is bought while `isLastTierTickspeedXpUnlocked` holds — same self-no-op behavior either way |
| `getTierProductionProgressPercent` | `(state, tierId, previousAccumulator?, elapsedSeconds = 1) → number` | `state.tierProductionAccumulators[tierId] / getEffectiveTierTickSpeedSeconds(state, tierId) * 100`, rounded and clamped to `[0, 100]` — how far that tier's accumulator has filled toward its next delivery. If the optional `previousAccumulator` crosses the tier's effective tickspeed once `elapsedSeconds` is added (with the same `TICK_ACCUMULATION_EPSILON` tolerance `tickGame` uses), returns 100 instead. `elapsedSeconds` defaults to `1`. Currently unused by `MainPage` |
| `formatAmount` | `value → string` | Locale-formatted integer below `EXPONENTIAL_NOTATION_THRESHOLD` (1,000,000); scientific notation at/above, exponent marker lowercased to `e` (e.g. `6.5e13` — `Intl.NumberFormat`'s scientific notation always renders an uppercase `E` with no formatting option to override it, so a shared `formatScientific` helper lowercases it after formatting) — used for non-money amounts (owned/purchased counts, and per-tier per-tick production amounts, except a tier producing the base currency which uses `formatCurrency` instead so the row stays consistent with every other Money display) |
| `formatCurrency` | `value → string` | Full comma-grouped string below `EXPONENTIAL_NOTATION_THRESHOLD`, suffixed with `RESOURCE_SYMBOL(MONEY_ID)` (`b`), floored (never rounds up); exponential notation at/above the same threshold, same lowercase-`e` exponent marker as `formatAmount` (e.g. `6.5e13 b`) — used for every Money amount (costs, production rates, the Prestige-threshold overlay), except `MainPage`'s own headline balance readout once it grows large enough — see `formatMoneyBalance` below |
| `formatMoneyBalance` | `value → string` | `MainPage`'s `MoneyHero` headline balance only: below `MONEY_BYTES_DISPLAY_THRESHOLD` (8000 bits — module-scoped in `engine.js`, not exported; exactly 1000 Bytes, the same Byte-scale threshold `formatDiskSize`'s SI scale considers "1 KB") renders identically to `formatCurrency`; at/above it, converts into whole Bytes (`÷ BITS_PER_BYTE`, floored, same never-overstate rounding `formatCurrency` itself uses) and renders with a trailing `B` instead of `b`, exponential notation at/above the same `EXPONENTIAL_NOTATION_THRESHOLD` (applied to the converted Byte count). Below the threshold a Bytes reading would round to 0 or read as an unhelpfully tiny fraction, so Bits stays the more legible unit until there's at least a full Byte's worth of KB to show. Every other Money display in the app keeps using `formatCurrency` unchanged |
| `getOfflineEffectiveSeconds` | `elapsedRealSeconds → number` | Caps `elapsedRealSeconds` at `MAX_OFFLINE_SECONDS`, then floors it as-is (100% speed) if at or below `OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS`, otherwise scales the entire capped duration by `OFFLINE_PROGRESS_SPEED_MULTIPLIER` (50%) before flooring — the number of simulated 1-second ticks `applyOfflineProgress` will replay |
| `applyOfflineProgress` | `(elapsedRealSeconds, autobuyerBatchSize = 1) → state → state` | Replays `tickGame(1, autobuyerBatchSize)` once per simulated second from `getOfflineEffectiveSeconds` |
| `formatOfflineDuration` | `totalSeconds → string` | `"1h 2m"` / `"1m 30s"` / `"45s"` (hours+minutes only above an hour, minutes+seconds only above a minute) — used to summarize the offline-progress notice's elapsed/simulated durations |
| `RESOURCE_SYMBOL` (`layers.js`) | `resourceId → string` | Returns the matching tier's `symbol`, `'b'` (lowercase — the base currency's "Bits" symbol) fallback for `MONEY_ID`/unknown ids |
| `getTierBaseTickSpeedSeconds` (`layers.js`) | `tierId → number` | Reads that tier's own independent `baseTickSpeedSeconds` field (1s for tier01, increasing by 1s per tier up to 10s for tier10) — how often (in seconds) `tickGame` batches that tier's production instead of delivering it continuously every tick. An unrecognized tier id falls back to 1s |

### Constants (`src/game/layers.js`)

- `MONEY_ID = 'base'` — naming-agnostic id of the base/root resource, fully decoupled from its display
  name/symbol ("Bits" / `b`), same rationale as each tier's own `id`
- `MONEY_STARTING_AMOUNT = 1` — a fresh save starts with 1 Bit. Also seeds `prestige.highestMilestone`
  (`Math.floor(Math.log10(MONEY_STARTING_AMOUNT))`, `checkMilestones`' XP-earning watermark) at `0`
  rather than `1` — the first XP point is now earned the moment Money first reaches 10 (exponent 1 >
  the fresh watermark of 0), instead of needing to reach 100
- `GOOGOL = 1e100` — kept as a clean exponent for the exponent-based formulas
  (`getPrestigePointsAwarded`/`getMoneyExponent`/`getPrestigeProgressPercent`) to key off; no longer
  the live prestige/freeze trigger itself (see `PRESTIGE_THRESHOLD` below)
- `BITS_PER_BYTE = 8` — the Byte Foundry intro's own bits-per-Byte conversion rate (see "Byte Foundry"
  below)
- `PRESTIGE_THRESHOLD = GOOGOL * BITS_PER_BYTE` (8e100) — the actual money balance required to
  prestige/freeze — "1 Googol Bytes," expressed in Bits since `resources[MONEY_ID]` is
  Bits-denominated. An 8x constant factor is negligible at `GOOGOL`'s scale, which is why the
  exponent-based formulas above deliberately keep keying off `GOOGOL` itself rather than this
  messier value — see `docs/DESIGN_HISTORY.md`
- `TICK_RATE_MS = 100` — the global tick fires every 100ms (10Hz); `elapsedSeconds` per live tick is
  `TICK_RATE_MS / 1000 = 0.1`. Every real-world-time-based rate (autobuyer/Auto-Prestige attempt budgets)
  is explicitly scaled by `elapsedSeconds` in `tickGame` so real-world cadence is unaffected by this
  value — changing it only changes update granularity/animation smoothness, not game speed.
  `TICK_ACCUMULATION_EPSILON = 1e-9` (module-scoped in `engine.js`, not exported) is a related tolerance
  constant absorbing floating-point drift from repeatedly summing a fractional `elapsedSeconds`
- `OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.5` — offline progress past the full-speed threshold below runs at 50% of normal speed, for the entire game (both the main-game tiers and the Byte Foundry — see "Offline progress" above)
- `OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS = 600` (10 minutes) — real elapsed time at or below this runs offline progress at 100% speed with no notice shown; only beyond it does `OFFLINE_PROGRESS_SPEED_MULTIPLIER` apply
- `MAX_OFFLINE_SECONDS = 86400` (24 hours) — cap on real elapsed time counted toward offline progress
- `PRESTIGE_POINT_SPEED_BONUS = 0.01` — +1% production speed per unspent Prestige Point, once unlocked (see next)
- `PRESTIGE_SPEED_BONUS_UNLOCK_COST = 10000` — one-time PP cost to unlock the passive production speed bonus above (see `buyPrestigeSpeedBonus`) — inert until bought, regardless of PP balance. The priciest of the four global PP automation unlocks (see `AUTO_SPEED_UP_COST`/`TICKSPEED_AUTOBUYER_COST`/`AUTO_PRESTIGE_COST` below), since it's passive and always-on rather than a one-shot action
- `TICKSPEED_MULTIPLIER_BASE_EXPONENT = 10` — exponent driving the (Money-funded) tickspeed multiplier's per-tier base cost (see `getTickspeedMultiplierBaseCost`): 10^10 for the first tier, down to 10^1 for the 10th/last tier
- `TICKSPEED_PRODUCTION_STEP = 0.1` — each tickspeed multiplier level speeds up a tier's delivery frequency by another 10%, not the amount delivered (see `getTickspeedProductionMultiplier`/`getEffectiveTierTickSpeedSeconds`)
- `AUTOBUYER_UNLOCK_BASE_COST = 1` — no longer an actual PP cost (see `getAutobuyerUnlockCost`'s doc above) — kept only as the pricing benchmark `SMART_AUTOBUYER_COST_MULTIPLIER` below multiplies: 1 through 10 across the ten tiers
- `SMART_AUTOBUYER_COST_MULTIPLIER = 10` — the "smart" autobuyer costs this many times more PP than that benchmark (10 PP through 100 PP across the ten tiers) — still a real PP cost
- `AUTOBUYER_UNLOCK_MILESTONE_START = 1` / `AUTOBUYER_UNLOCK_MILESTONE_STEP = 1` — how many prestiges a tier's unit-buying autobuyer requires before it unlocks automatically (see `getAutobuyerUnlockMilestone`): 1 for the first tier, up through 10 for the 10th/last, one tier per prestige across the first 10
- `TIER_TICKSPEED_AUTOBUYER_MILESTONE_START = 12` / `TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP = 2` — how many prestiges a tier's own tickspeed autobuyer requires before it unlocks automatically (see `getTierTickspeedAutobuyerMilestone`): 12 for the first tier, spacing out by 2 more per tier after that, up through 30 for the 10th/last — later and slower-spaced than the unit-buying autobuyer above, since it's a further-out convenience
- `GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01` — the regular per-level compounding rate for the global tickspeed multiplier (see `getGlobalTickspeedProductionMultiplier`) — every level compounds this rate, except a milestone level, which compounds `GLOBAL_TICKSPEED_MILESTONE_STEP` instead of this. The global tickspeed multiplier's *cost* (`getGlobalTickspeedMultiplierCost`, see the engine functions table above) is Money-funded, not PP-funded — it has no dedicated cost constant here, using an inline `10 ** (level + 1)` formula against `resources[MONEY_ID]` instead
- `GLOBAL_TICKSPEED_MILESTONE_STEP = 0.10` — the compounding rate a *milestone* level of the global tickspeed multiplier uses in place of `GLOBAL_TICKSPEED_PRODUCTION_STEP` for that one level (see `getGlobalTickspeedProductionMultiplier`) — still multiplicative, not a flat bonus. Milestone spacing itself starts at every 10 levels (up to level 100), then widens to every 100 levels (100 to 1000), then every 1000 (1000 to 10000), and so on — see "The global tickspeed multiplier" above
- `DEFAULT_PURCHASE_BLOCK_SIZE = 8` — the purchase block size a tier's level 1 (the very start of a run) requires to complete — only the *default/starting* value, not a fixed constant used throughout the game; the effective, current block size is computed at runtime by `getPurchaseBlockSize(state)` and can grow over a run (see the two constants below). Supersedes an old fixed `PURCHASE_BLOCK_SIZE = 8` constant that every level-dependent formula used directly — see `docs/DESIGN_HISTORY.md`
- `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS = 100` — every this many levels the LAST tier completes, the (global, shared-by-every-tier) purchase block size grows by `PURCHASE_BLOCK_SIZE_GROWTH_STEP` (see `getPurchaseBlockSize`)
- `PURCHASE_BLOCK_SIZE_GROWTH_STEP = 1` — the amount the block size grows by every `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS`
- `PURCHASE_MILESTONE_MULTIPLIER_BASE = 2` — the regular per-level production-doubling factor for a tier's own lifetime purchase count (see `getPurchaseMilestoneMultiplier`)
- `PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE = 10` — every 10th level uses this larger factor instead of `PURCHASE_MILESTONE_MULTIPLIER_BASE` for that one level, compounding into the rest (see `getPurchaseMilestoneMultiplier`) — this "every 10th level" cadence is independent of the (now variable) purchase block size and stays fixed at 10
- `AUTO_PRESTIGE_COST = 1000` — PP cost to activate Auto-Prestige (level 1); a single global upgrade track, not per-tier. Priced above `AUTO_SPEED_UP_COST` since Auto-Prestige only ever fires once per run at most, versus Speed Up's much higher activation frequency
- `AUTO_PRESTIGE_COST_MULTIPLIER = 2` — Auto-Prestige's cost doubles with each level purchased
- `AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000` — Auto-Prestige's base check cadence at level 1, in real seconds (independent of `TICK_RATE_MS`); each level speeds this up 10%
- `SPEED_UP_MULTIPLIER_BASE = 2` — per-activation production-speed multiplier base for Speed Up (see `getSpeedUpMultiplier`/`speedUpGame`, "Speed Up" above) — unconditional, no PP unlock needed, unlike `PRESTIGE_POINT_SPEED_BONUS`
- `OVERCLOCK_MULTIPLIER_STEP = 0.1` — per-level growth factor for Overclock's own reward (see `getOverclockMultiplier`/`getGlobalTickspeedProductionMultiplier`/`overclockGame`, "Overclock" above) — each claimed level multiplies both the global tickspeed multiplier's regular and milestone per-level steps by a further ×1.1, folded directly into that existing track's own step rather than a separate multiplier stacked alongside it; unconditional, no PP unlock needed
- `OVERCLOCK_REQUIREMENT_STEP = 1` — the per-cycle escalation step for Overclock's own requirement (see `getOverclockRequirement`, which adds a fixed `+2` floor on top: level 2 for the first claim, 3 for the second, 4 for the third, …) — the same `+1`-per-cycle shape as `getSpeedUpRequirement`'s own ladder, just without its display offset; a claim jumps straight to the last tier's current level (see `overclockGame`), not just one step, so there's no fixed ladder to climb beyond that floor and the last tier's own cost curve
- `AUTO_SPEED_UP_COST = 20` — one-time PP cost to permanently automate Speed Up (see `buyAutoSpeedUp`) — cheaper than `PRESTIGE_SPEED_BONUS_UNLOCK_COST`/`AUTO_PRESTIGE_COST` since Speed Up fires far more often, but pricier than `TICKSPEED_AUTOBUYER_COST` below, since the global tickspeed multiplier it automates is a much smaller, earlier-game upgrade than Speed Up
- `TICKSPEED_AUTOBUYER_COST = 10` — one-time PP cost to permanently automate the (Money-funded) global tickspeed multiplier (see `buyTickspeedAutobuyer`) — the cheapest of all four global PP automation unlocks, since the global tickspeed multiplier it automates is a much smaller, earlier-game upgrade (unlocked as soon as the second tier is owned) than what any of the other three automate
- `AUTO_PRESTIGE_AUTOBUYER_COST = 100` — one-time PP cost to permanently automate RE-LEVELING Auto-Prestige itself (see `buyAutoPrestigeAutobuyer`) — a "meta-automation" (it automates re-buying an already-PP-funded track, not a Money-funded one like the two costs above), only ever useful once Auto-Prestige has already been activated once, so priced below `AUTO_PRESTIGE_COST`'s own initial-activation cost (the clicks it saves are already rare, since each Auto-Prestige level doubles in cost) but well above `AUTO_SPEED_UP_COST`/`TICKSPEED_AUTOBUYER_COST` above, since this row is gated behind `allTiersFullyAutomated` — a genuinely late-game convenience, not an early one
- `LAST_TIER_XP_TICKSPEED_STEP = 0.01` — each XP consumed via `consumeXpForLastTierTickspeed` within the current run compounds another 1% into the last tier's own delivery frequency (see `getLastTierXpTickspeedMultiplier`) — the mechanic that replaces that tier's Money-funded tickspeed multiplier while it currently has >= `getPurchaseBlockSize(state)` owned; both the XP spent and the bonus it drives reset to 0 on Prestige/Speed Up (see "The last tier's XP-funded tickspeed" above)
- `LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT = 0.1` — a single `consumeXpForLastTierTickspeed` call must spend at least this fraction of the XP already consumed this way (see `getLastTierXpTickspeedMinConsumption`), so repeat consumptions can't trickle in one XP at a time forever
- `LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR = 1` — the practical minimum consumption before any XP has been consumed this way, since `LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT` alone computes 0 at that point

**Byte Foundry** (see its own section below for the full mechanic):
- `INTRO_STARTING_CAPACITY = 8` — starting/current cap on the intro's "Memory" bit balance (1 Byte)
- `INTRO_CAPACITY_DOUBLING_STEP = 2` — "Sacrifice for 2x Capacity" multiplies capacity by this each pick (8 → 16 → 32 → 64 → …), hard-capped at `INTRO_CAPACITY_CAP_BITS`
- `INTRO_CAPACITY_CAP_BITS = 8,388,608` (exactly 1 MiB) — pool 1's generator capacity ceiling, large enough to afford `getDiskCost` for the pool's own largest (100 KB) buildable Disk (8,000,000 bits); `isMemoryCapacityUpgradeAvailable` returns `false` from here on
- `INTRO_BANDWIDTH_COST_MULTIPLIER = 4` — "Invest for Double Production"'s own cost ladder steps by this per tier (was 10 before this and `INTRO_CAPACITY_DOUBLING_STEP` split into independent multipliers)
- `MEMORY_BINARY_UNIT_STEP = 1024` — Memory Capacity's own binary (IEC-style) display-unit ladder step (`getMemoryUnit`) — `1 KiB = 1024 Bytes`; Disks/Data Lake/caches stay on the unchanged SI (1000-based) scale
- `INTRO_STARTING_TICK_SPEED_SECONDS = 1` — the Byte generator's starting delivery period, in seconds — matches `TIER_DEFINITIONS`' own per-tier `baseTickSpeedSeconds` convention (a fixed period, not a continuous rate)
- `INTRO_MIN_TICK_SPEED_SECONDS = TICK_RATE_MS / 1000` (0.1) — floor for `tickSpeedSeconds`: the live tick loop's own real-time resolution. Once "Invest for Double Production" would halve `tickSpeedSeconds` below this, it multiplies `productionMultiplier` instead — see `pickIntroProductionMilestone`
- `INTRO_PRODUCTION_MULTIPLIER_STEP = 2` — "Invest for Double Production" multiplies by this each pick — either dividing `tickSpeedSeconds` or multiplying `productionMultiplier`, whichever `INTRO_MIN_TICK_SPEED_SECONDS` currently allows; net effect is the same either way, bits/sec doubles
- `INTRO_BYTE_BASE_RATE = 1` — the Byte generator's base batch size, in bits, delivered once every `tickSpeedSeconds`, before `productionMultiplier`
- `INTRO_BYTE_COMBINE_COST = INTRO_STARTING_CAPACITY` (8) — one-time cost, in bits, to combine the first 8 tapped bits into the Byte generator
- `INTRO_BITS_PER_KILOBYTE_CONVERSION = 8000` — `BITS_PER_BYTE` times Kilobytes' own real `baseCost` (1E3 Bits) in `TIER_DEFINITIONS`; the actual live conversion cost is `getIntroKilobyteConversionCost(state)` (`BITS_PER_BYTE` times tier01's CURRENT per-unit level cost, which equals this constant only at a fresh cycle's level 1 and grows from there) — this constant itself is now only used as the (fixed) `INTRO_CONVERSION_UNLOCK_CAPACITY` threshold below and as a test fixture
- `INTRO_CONVERSION_UNLOCK_CAPACITY = INTRO_BITS_PER_KILOBYTE_CONVERSION` (8000) — capacity threshold at which the manual convert action becomes available
- `INTRO_DISK_UNLOCK_CAPACITY = 80000` — capacity threshold ("9.765 KiB" in Memory's own binary display scale — `getMemoryUnit`, distinct from a Disk's own SI-scaled size, `getDiskSize`) at which `ByteFoundryPage`'s whole Storage section becomes visible — a deliberately later reveal than `INTRO_CONVERSION_UNLOCK_CAPACITY`'s own
- `DISK_BUILD_COST_MULTIPLIER = 10` — Byte Foundry Disks: an array's build cost is this many times its own face value, already in bits (see `getDiskCost`/`startDiskBuild` — `capacityBits`, from `getDiskSize`, is already Byte-accurate, so no further `BITS_PER_BYTE` conversion is needed here, unlike an earlier "kilobit"-scaled version of this constant — see `docs/DESIGN_HISTORY.md`) — a real 1 KB (8000-bit) array costs 80,000 bits to build, a real 10 KB (80,000-bit) array costs 800,000 bits, and so on
- `DISK_ARRAY_LADDER_CAP = 10` — Byte Foundry Disks: how many disks can ever be built at the buildable ladder's current size before it advances to the next size (see `getDiskSize`) — tracked via the cumulative, never-decremented `intro.disksBuiltTotal`
- `DISK_CACHE_BLOCK_COUNT = 8` — Byte Foundry Disks: a disk array's own cache (`intro.diskCache`, see `tickDiskAutoFill`) is split into this many equal blocks, each holding `size / DISK_CACHE_BLOCK_COUNT` bits — a full block can be manually released into `resources.base` (Bits) while some tier's current cost matches that size (see `releaseDiskCacheBlock` / `isDiskCacheBlockReleasable`)
- `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY = INTRO_CAPACITY_CAP_BITS / INTRO_CAPACITY_DOUBLING_STEP = 4_194_304` — Byte Foundry Compute Cores: capacity threshold (512 KiB in Memory's own binary scale, half of pool 1's hard cap — one Sacrifice doubling short of it) at which `ByteFoundryPage`'s "Compute" section/`ComputePage` becomes visible — retuned from a flat `8_000_000` under the old ×10-forever capacity ladder, since that value happened to coincide with the cap under an earlier revision and would otherwise sit oddly close to it; unrelated to Disks (see `isComputeCoreConversionUnlocked`)
- `COMPUTE_CORES_PER_NODE = 8` — Byte Foundry Compute Cores: how many Compute Cores 1 Compute Node costs via the separate, unrelated `latchComputeMergePageIfNeeded`/`computeCoresEverEarned` lifetime-counter bookkeeping (NOT the Core → Node merge boundary below, which reuses the same ratio via `COMPUTE_MERGE_RATIO` instead)
- `COMPUTE_ENTITY_CAP = 10` — Byte Foundry Compute Cores: maximum permanent balance of any compute-ladder entity (`computeCores`/`computeNodes`/`computeClusters`/`computeNetworks`/`computeGrids`/`computeFabrics`/`computeClouds`/`computeDatacenters`/`computeSupercomputers`/`computeMegacomputers`) — see every `mergeCompute*Into*` function/the reserve-timer system below. Also the auto-trigger threshold for starting a reserve merge (`tickAutoMerge*`), stricter than the manual `COMPUTE_MERGE_RATIO`
- `COMPUTE_MERGE_RATIO = 8` — ComputePage merge chain (issues #280/#321): how many of one compute-ladder entity merge into 1 of the next tier up (Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter → Supercomputer → Megacomputer) — the manual-trigger threshold either for the old instant merge (pre-unlock) or for starting a reserve merge (post-unlock, via `startCompute*Merge`) — see every `mergeCompute*Into*` function and `startComputeMergeReserve`
- `COMPUTE_MERGE_RESERVE_CAP = 8` — issue #321: size of the 8-slot reserve pool a boundary gains once its auto-merge is unlocked, alongside the entity's own `COMPUTE_ENTITY_CAP` (10) normal slots — "18 slots" total per boundary. Same value as `COMPUTE_MERGE_RATIO` (a merge always consumes exactly one full group) but a separate constant since it denotes the reserve pool's own capacity, not a conversion ratio
- `COMPUTE_MERGE_CORE_EARN_MULTIPLIER = 10` — Core→Node timed-merge duration is this × live Core earn time (`capacity / getIntroProductionRate`, before Boost); see `getComputeMergeDurationSeconds`
- `COMPUTE_MERGE_STEP_MULTIPLIER = 10` / `COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED = 5` — each next boundary multiplies the previous duration by 10, or by 5 once that boundary’s sequential duration upgrade is claimed (`intro.computeMergeDurationUpgrades`)
- `COMPUTE_MERGE_DURATION_UPGRADE_COUNT = 9` — one sequential upgrade per merge boundary
- `COMPUTE_MERGE_BOUNDARIES` — per-boundary metadata (`inputField` / `outputField` / `autoFlagField` / `timerField` / `label`) for duration lookup and upgrades
- `COMPUTE_AUTO_BOOST_UNLOCK_COST = 30` — one-time PP cost for Compute auto-Boost (`buyComputeAutoBoost` / `tickAutoComputeBoost`)
- `COMPUTE_BOOST_PRESETS = { burst: { multiplier: 32, durationSeconds: 60 }, standard: { multiplier: 8, durationSeconds: 600 }, sustain: { multiplier: 2, durationSeconds: 3600 } }` — Byte Foundry Compute Boost: base (tier 1 / Core) strength/duration tradeoffs; activating spends 1 token of whichever compute-ladder tier the player arms (Core through Megacomputer — see `COMPUTE_BOOST_TIER_FIELDS` / issue #326), not always a Core — higher tiers scale multiplier by `COMPUTE_BOOST_TIER_POWER_STEP` (4) per step; duration stays at the base preset (issue #363) — see `activateComputeBoost`/`getComputeBoostTierMultiplier`/`getComputeBoostMultiplier`
- `COMPUTE_BOOST_TIER_POWER_STEP = 4` — each compute-ladder tier past Core multiplies a Boost preset's base multiplier by this much (`4^(tierIndex - 1)`); duration is unaffected
- `COMPUTE_BOOST_MAX_STACKS = 10` — Byte Foundry Compute Boost: how many times `stackComputeBoost` can extend the currently active boost's remaining duration by spending another token of that boost's own funding tier (the multiplier itself never compounds; replacing an active boost with a different preset/tier requires an explicit forfeit confirmation — see `forfeitComputeBoost` / `activateComputeBoost(..., forfeitConfirmed)`) — see `stackComputeBoost`/`canStackComputeBoost`/`activateComputeBoost`

