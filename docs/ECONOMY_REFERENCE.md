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
(`producesResourceId`), cascading production down to the base currency. `tier01` (`Kilobytes`) is the
special case where `costResourceId === producesResourceId === MONEY_ID`: it's the entry-level
generator, bought with Bits to produce more Bits (`RESOURCE_SYMBOL(MONEY_ID)` falls back to `b`,
lowercase — no tier owns a bare uppercase `B` symbol any more, since Bytes isn't a tier).

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
Up — is likewise expressed as a level target (`speedUpCount + 2`: level 2 for the first activation,
level 3 for the second, …) rather than a lifetime-purchased-count threshold, since how many purchases
a given level boundary corresponds to now depends on the current block size, while the level number
itself doesn't.

A save predating `purchaseLevels`/`purchaseLevelProgress` (from before this mechanic existed) is
migrated on load (`storage.js`) by deriving an equivalent level/progress from its legacy `purchased`
count using `DEFAULT_PURCHASE_BLOCK_SIZE` — a one-time interpretation of old data, not an ongoing
engine mechanism.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js` — needs a naming-agnostic `id` (next in the
`tier0N`/`tierNN` sequence), `name`, `symbol`, `baseCost`, `costResourceId: MONEY_ID`,
`producesResourceId` set to the previous tier's `id`, and `baseTickSpeedSeconds` set to the next integer
in the sequence (`tierIndex + 2` seconds — a hypothetical 11th tier would be `12`, since tier01 itself
is `2`, not `1`, following the Bytes-removal shift; see "Tier production tickspeed" below). No other
file should need changing.

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
`productionMilestoneTierClaims` — plus **Storage** (`storageBanks`/`storageAutoRedeemEnabled`, see
step 8 below) are **permanent**, carried over unchanged exactly like an unlocked autobuyer. So the
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
   starting rate is exactly 1 bit/sec.
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
4. Whenever Memory is **full** (`bits === capacity`), **Sacrifice for 10x Capacity**
   (`pickIntroCapacityMilestone`) becomes available: it drains the ENTIRE balance to 0 and multiplies
   `capacity` by `INTRO_CAPACITY_MULTIPLIER` (10) — 1 Byte → 10 Bytes → 100 Bytes → 1000 Bytes → ….
   Repeatable at every tier reached; doesn't touch `tickSpeedSeconds`/`productionMultiplier`.
5. **Invest for Double Production** (`pickIntroProductionMilestone`) runs on its own **independent
   cost ladder**, entirely decoupled from `capacity`/Sacrifice — a separate, permanent progression
   tracked by `productionMilestoneTier` (0-based). Tier `t`'s cost is
   `getIntroProductionMilestoneCost(t) = INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER ** t`
   (8, 80, 800, 8000, 80000, … bits — the same "×10 per step" shape the capacity ladder happens to
   share, but a completely separate counter; `ByteFoundryPage` shows this cost in Bytes,
   `cost / BITS_PER_BYTE`, on the button itself). Because the cost is independent of `capacity`, a
   claim only ever requires `bits >= cost` — **not** a full balance — which is frequently true well
   before Memory is full, once Sacrifice has grown capacity ahead of this ladder. Each tier grants
   `getIntroProductionMilestoneMaxClaims(t)` claims (2 for the three tiers whose cost is `<
   INTRO_AUTO_INVEST_THRESHOLD` — 1/10/100 Bytes — 1 for every tier from 1000 Bytes on), tracked by
   `productionMilestoneTierClaims`; a successful claim deducts exactly that tier's cost from `bits`
   and either stays at the same tier (incrementing `productionMilestoneTierClaims`) or, once the
   tier's claim limit is reached, advances to `productionMilestoneTier + 1` with a fresh claim count
   of 0. Every claim doubles the Byte's overall bits/sec rate (`getIntroProductionRate`) by
   `INTRO_PRODUCTION_MULTIPLIER_STEP` (2), speeding up delivery first (halves `tickSpeedSeconds`) —
   the same tickspeed-vs-production split `getEffectiveTierTickSpeedSeconds` uses for tiers — only
   once that would push `tickSpeedSeconds` below `INTRO_MIN_TICK_SPEED_SECONDS` (the live tick
   loop's own real-time resolution, `TICK_RATE_MS`) does it switch to multiplying
   `productionMultiplier` (growing the batch) instead, so growth never stalls once the tick loop's
   own granularity limit is reached. Never coupled to Sacrifice's own eligibility.
6. Once `capacity` reaches `INTRO_CONVERSION_UNLOCK_CAPACITY` (1000 — first true at the `capacity =
   8000` stage, since capacity only ever takes the discrete 8/80/800/8000/… values),
   `isIntroConversionUnlocked(state)` goes true: `ByteFoundryPage` shows a row of **transfer
   blocks** at the bottom of the screen — always all `getPurchaseBlockSize(state)` of them (see
   step 7), for the whole cycle; blocks never disappear once transferred, they just show as
   consumed. Only the leftmost not-yet-transferred (active) block is ever clickable; clicking it
   calls `convertIntroBitsToKilobytes` (spending 1000 bits from Memory for 1 free Kilobyte unit —
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
   spend straight out of `intro.bits`, `INTRO_BITS_PER_KILOBYTE_CONVERSION` (1000) bits per Kilobyte
   unit granted. **There is no per-cycle cap on how many conversions can happen.** (An earlier design
   capped a shared, running `bitsTransferredThisCycle` total at one `getIntroTransferBudget(state)`'s
   worth per real Prestige cycle — see `docs/DESIGN_HISTORY.md` for why that was wrong and removed.)
   `getIntroTransferBudget(state) = getPurchaseBlockSize(state) * INTRO_BITS_PER_KILOBYTE_CONVERSION`
   still exists, but purely as `tickIntroAutoInvest`'s own batch threshold below, not a cap — the
   same live, possibly-growing block size the main game's own `tier01` Buy button already reads (see
   "The (configurable) purchase block size and tier levels" below). `ByteFoundryPage` always renders
   exactly `getPurchaseBlockSize(state)` transfer blocks (step 6), deriving each one's
   consumed/active/upcoming state directly from `purchaseLevelProgress[tier01]`. This is the only
   place `ByteFoundryPage` shows this progress — the Storage section (step 8) used to show a
   redundant, separately-rendered copy of the identical value and no longer does. Because this is a
   genuine, uncapped tier-level progress counter rather than a cycle-scoped budget, the row
   automatically rolls over to a fresh, empty block set for
   the *next* level the instant one completes (`getPurchaseBlockSize(state)` blocks transferred),
   rather than ever sitting permanently "consumed." `convertIntroBitsToKilobytes` is a no-op only when
   `intro.bits < INTRO_BITS_PER_KILOBYTE_CONVERSION` — insufficient Memory, nothing else. Separately,
   whenever `bits` reaches a full `getIntroTransferBudget(state)` at once (e.g. a fast-production or
   offline-progress jump that skips past several individual block boundaries before the player could
   click through them one at a time), `tickIntroAutoInvest` (also called from `tickGame`, mirroring
   the existing autobuyer "wait until the whole batch is affordable, then fire once" convention)
   auto-transfers that whole batch in bulk — granting `getPurchaseBlockSize(state)` Kilobytes at once,
   advancing `purchaseLevelProgress[tier01]` by the same amount (rolling a level over exactly like a
   manual click sequence would) — and can fire again immediately once Memory refills past the
   threshold again, with no cooldown or cap. Both paths set `mainGameUnlocked: true` the first time
   they fire. Every real `prestigeGame` call resets Memory (`bits`/`productionAccumulator`) and the
   gate (`mainGameUnlocked: false`) back to fresh — see the intro above — along with tier01's
   `purchaseLevels`/`purchaseLevelProgress`, so the transfer row starts over too, purely as a side
   effect of that general per-tier reset. So a real Prestige sends the player back through the gate
   every cycle, but the generator itself (byteCreated/capacity/tickSpeedSeconds/productionMultiplier/
   productionMilestoneTier/productionMilestoneTierClaims) carries over, making every cycle after the
   first a fast pit-stop rather than a full replay. `speedUpGame`/`overclockGame` are intra-cycle
   soft resets, not new cycles, and still carry the whole `intro` object through completely
   untouched, Memory included. A full Reset also restarts the intro from true scratch (via
   `createInitialGameState()`'s fresh defaults for every field, generator included).
8. **Storage** (`storageBanks: { [capacityBits]: currentlyFullCount }`, `storageBanksBuiltTotal:
   { [capacityBits]: cumulativeBuiltCount }`, `storageAutoRedeemEnabled`, `storageAutoRedeemedSizes:
   { [capacityBits]: true }`) is a genuine storage **medium**, not a one-shot pre-paid item: a bank
   is a permanent, reusable container that Memory auto-fills over time and redeeming empties again.
   `getStorageBankSize(state)` walks `tier01`'s (Kilobytes') own per-unit **LEVEL COST sequence** —
   `getTierCost(TIER_DEFINITIONS[0], level)` for level 1, 2, 3, … — rather than a synthetic ×10
   progression, advancing to the next level's cost once `STORAGE_BANK_LADDER_CAP` (10) banks have
   *ever* been built at the current one, read from `storageBanksBuiltTotal` (a cumulative counter
   `redeemStorageBank` never decrements, so the ladder only ever advances; deliberately decoupled
   from `tier01`'s CURRENT level, unlike an earlier version of this feature — see
   `docs/DESIGN_HISTORY.md`). Because `getCostEpochExponent`'s triangular-number exponent sequence
   (1, 2, 4, 7, 11, …) skips values as `tier01` levels grow, this ladder skips sizes too: `tier01`
   level 3 costs 1,000,000 bits ("1 MB"), never 100,000 ("100 KB"), so a 100 KB bank can never exist.
   **Build Storage Bank** (`buildStorageBank`) spends `getStorageBankCost(size) = size *
   STORAGE_BUILD_COST_MULTIPLIER * BITS_PER_BYTE` — 10x the block's own face value **in bytes, not
   bits** (a 1000-bit/"1 KB" bank costs 10,000 bytes = 80,000 bits) — and only increments
   `storageBanksBuiltTotal`: this is a one-time construction fee for an EMPTY container, and does
   **not** touch `storageBanks` (the currently-full count) at all.

   `tickStorageAutoFill(state)` is what actually fills a bank: unconditionally (no toggle, no
   prerequisite), every tick, it cascades Memory into every currently-fillable empty bank in one
   pass, smallest size first — while some size has `storageBanksBuiltTotal[size] >
   storageBanks[size]` (an empty container exists) and `intro.bits >= size`, it moves exactly `size`
   bits out of Memory and into that bank (`storageBanks[size] += 1`), then repeats; since sizes are
   checked smallest-first and cost scales with size, once the smallest remaining empty size is
   unaffordable no larger one can be either, so the cascade always terminates in one call. Whatever
   Memory has left over once nothing more is fillable simply stays as its own ordinary balance.

   A currently-**full** bank is redeemable once its size is **at or below** tier01's *current*
   per-unit level cost (`isStorageBankRedeemable`, unchanged by this redesign) — not a one-tick-only
   exact match: tier01's own autobuyer can complete more than one level in a single tick (a banked
   attempt budget catching up after a broke/paused stretch), which can jump the level straight past
   the one a bank was sized for without ever equaling it exactly; an exact-match check would then
   strand that bank permanently unredeemable, breaking the "never lost" guarantee below. `<=` is safe
   since `getFirstTierCost` only ever grows with level within a cycle — it only drops back on a
   Prestige/Speed Up/Overclock reset, at which point a full bank correctly goes back to waiting for
   the price to climb back up to it, still full, not lost. `redeemStorageBank(capacityBits)` then
   empties one matching full bank (`storageBanks[capacityBits] -= 1` — NOT `storageBanksBuiltTotal`,
   which is untouched, so the emptied bank re-enters the fillable pool for `tickStorageAutoFill` to
   fill again later) and grants 1 free tier01 unit via the same `grantTierUnits` helper described
   below — bypassing `isProductionFrozen`/`isTierUnlocked`/cost entirely, and deliberately bypasses
   `convertIntroBitsToKilobytes`/`tickIntroAutoInvest` (step 7) entirely too: a bank's contents came
   from Memory via `tickStorageAutoFill` already, not a further bit-to-Kilobyte conversion at redeem
   time. Redeeming can be manual (a click) or automatic: `setStorageAutoRedeemEnabled(enabled)`
   toggles `storageAutoRedeemEnabled` unconditionally (no prerequisite purchase, unlike the PP-funded
   automations elsewhere in this game), and `tickStorageAutoRedeem` — called from every branch of
   `tickGame`, frozen or not (it bypasses the production freeze the same way `redeemStorageBank`
   itself does), right after `tickStorageAutoFill` each tick (so a bank filled THIS tick can also
   redeem the same tick) and after every other per-tick automation including a possible automatic
   Speed Up, so it always sees tier01's truly final level for the tick — auto-redeems the smallest
   eligible full bank each tick (redeeming can itself advance tier01's level/cost, so a further
   eligible bank just gets picked up on a later tick, imperceptibly fast at the tick loop's ~10Hz
   cadence). "Eligible" has two extra conditions on top of `isStorageBankRedeemable`: the smallest
   denomination (`INTRO_BITS_PER_KILOBYTE_CONVERSION`, "1 KB") is exempt from
   `storageAutoRedeemEnabled` entirely (it always attempts auto-redeem) while every larger size still
   needs the toggle enabled; and either way, a size auto-redeems at most **once per real Prestige
   cycle**, tracked in `storageAutoRedeemedSizes` (reset fresh every real Prestige, unlike every
   other Storage field here) — a bank that refills later the same cycle needs a manual click for the
   rest of it. Storage banks are **never lost**: nothing here ever expires, decays, or gets spent
   implicitly — only an explicit redeem (manual or auto-configured) ever empties one, and it's
   immediately eligible to be auto-filled again.
9. `ByteFoundryPage` doesn't disappear once `intro.mainGameUnlocked` is true — it becomes a
   permanent, voluntarily-revisitable screen instead, reachable at any time via MainPage's own
   "⚙️ Byte Foundry" link (`onOpenFoundry`). Nothing about it goes read-only when reached this way —
   Tap/Sacrifice/Invest/Storage stay just as interactive as on the mandatory gate, and the
   transfer-block row keeps working too — there's no per-cycle cap to exhaust (see
   docs/MAINPAGE_REFERENCE.md's "Byte Foundry page" section for the render-level detail).

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
small), then B/KB/MB/…/QB by 1000 each step once it does, reusing `TIER_DEFINITIONS`' own `KB`..`QB`
symbols (every capacity value in the Sacrifice ladder is evenly divisible by `BITS_PER_BYTE`, so this
never loses precision at the Byte boundary). Both numbers always render in the *same* unit (picked
off `capacity`, the larger of the two), so a balance never reads in a coarser unit than its own cap.
The unit conversion (`floorToDecimals`, 3 decimal places — matching `formatAmount`'s own default
max-fraction-digits) floors rather than rounds, the same never-overstate rationale as
`formatCurrency` in `engine.js`: an Intl-rounded 7999/8000 bits would otherwise read as "1 KB"
one tick before it's actually full. Once `byteCreated`, the tile also shows the current production
rate. The Tap button itself carries no `$progress`/hidden progressbar of its own — the Memory tile
above already shows the identical bits/capacity fill, so a second meter on the tap button would
just duplicate it.

Invest's own cost (`getIntroProductionMilestoneCost(tier)`) is shown on its button in **Bytes**
(`cost ÷ BITS_PER_BYTE`, always a clean whole number — every tier's cost is evenly divisible by 8),
independent of Memory's own unit-scaled display above. This is a display-only convention — internal
state always stores raw bit counts.

Storage's Build button, per-size full/empty/not-built squares rows, and auto-redeem toggle render inside their own labeled
section (`StorageSection`, a `styled(StatCard)`) rather than flat alongside Sacrifice/Invest — see
docs/MAINPAGE_REFERENCE.md's "Byte Foundry page" section for the render-level layout.

### Tier production tickspeed

Each tier has its own **independent base tickspeed** — a plain `baseTickSpeedSeconds` field directly on
its `TIER_DEFINITIONS` entry (read via `getTierBaseTickSpeedSeconds` in `layers.js`), not derived from
tier order or a shared formula, though the current values happen to follow one (`tierIndex + 2`). It's
how often, in seconds, that tier delivers a single batch of production rather than continuously every
global tick (the global tick fires every `TICK_RATE_MS` — 100ms/10Hz — much finer than any tier's own
tickspeed). **Each tier's cadence increases by 1s down the list** — tier01=2s up through tier10=11s —
so later tiers deliver batches less often by design, offset by the tickspeed multipliers below rather
than by a faster base cadence. This ladder was tried once before the tickspeed-multiplier system
existed and reverted to a uniform 1s because nothing could compensate for the slowdown; see
`docs/DESIGN_HISTORY.md` for both that original revert and this reintroduction (the ladder's own
starting point shifted from 1s to 2s later still, when Bytes — the old 1s tier01 — was pulled out of
this list entirely in favor of the Byte Foundry pre-game screen, see "Byte Foundry" below).
Nothing structurally prevents the per-tier values from diverging from the `tierIndex + 2` pattern in the
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

Time away from the game is simulated at **10% speed** (`OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1`) when
the page is reopened, capped at `MAX_OFFLINE_SECONDS` (24 hours) of real elapsed time before the
multiplier is applied. `getOfflineEffectiveSeconds`/`applyOfflineProgress` (`engine.js`) replay
`tickGame(1, autobuyerBatchSize)` once per *simulated* second — not one lump-sum call — so autobuyers
get the same one-purchase-attempt-per-tick cadence they'd have had live, just at 10% speed. This replay
granularity is independent of `TICK_RATE_MS` — `applyOfflineProgress` always passes `elapsedSeconds = 1`
regardless of live tick rate. `storage.js`'s `saveGameState` stamps a separate
`tens_last_save_timestamp` localStorage key with `Date.now()` on every save; `loadLastSaveTimestamp`
returns `null` if missing (no prior save, or predates this feature) — a `null` timestamp skips offline
progress entirely rather than guessing. `clearGameState` (via `resetGame`) removes this key too.

### Prestige Points, autobuyer unlock, and the tickspeed multiplier

Prestiging awards **Prestige Points (PP)**, a permanent, cumulative currency (`prestige.points`) that
never resets and stacks across every future prestige (see `docs/DESIGN_HISTORY.md` for why this
replaced direct production doubling). `getPrestigePointsAwarded(money) = floor(log10(money) /
log10(GOOGOL))` — always at least 1 (prestiging requires Money ≥ `PRESTIGE_THRESHOLD`, comfortably
above `GOOGOL` itself), only increasing once a
further full 100 orders of magnitude are reached. `prestigeGame` adds newly-awarded points on top of
any already-unspent balance.

Unspent PP has one passive effect (gated behind a one-time unlock) and five active uses. Tier
autobuyer unlock and the tier tickspeed autobuyer are **not** among them any more — they unlock
automatically at a prestige-count milestone instead (see "Tier autobuyer/tier-tickspeed-autobuyer
milestones" below), spending no PP at all.

- **Passive (gated):** `getPrestigeProductionMultiplier(points) = 1 + PRESTIGE_POINT_SPEED_BONUS *
  points` (`PRESTIGE_POINT_SPEED_BONUS = 0.01`) — +1% production speed per unspent point, applied
  uniformly to every tier in `tickGame`. A pure formula, not auto-applied — inert (every caller uses a
  flat ×1) until `state.prestigeSpeedBonusUnlocked` is true.
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
- **Active — Auto Speed Up:** `buyAutoSpeedUp(state)` permanently spends `AUTO_SPEED_UP_COST` PP (`100`
  — cheaper than `PRESTIGE_SPEED_BONUS_UNLOCK_COST`/`AUTO_PRESTIGE_COST` since Speed Up fires far more
  often, but pricier than `TICKSPEED_AUTOBUYER_COST` below, since the global tickspeed multiplier it
  automates is a much smaller, earlier-game upgrade than Speed Up) to set `autoSpeedUp = true`. Once
  bought, `tickGame` calls `speedUpGame` every tick (edge-triggered, re-validating eligibility
  internally) whenever `autoSpeedUpEnabled` is also true (see "Pause/resume for the three global
  automations" below). No-op if already bought, insufficient points, or frozen. Permanent — never reset.
- **Active — Tickspeed Autobuyer:** `buyTickspeedAutobuyer(state)` permanently spends
  `TICKSPEED_AUTOBUYER_COST` PP (`20` — the cheapest of all four global PP automation unlocks, since
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
  (budget ≥ 1) only actually calls `prestigeGame` once Money has *also* reached `PRESTIGE_THRESHOLD`
  (`isProductionFrozen`); until then it banks past 1 rather than losing the attempt. No-op if PP is
  short or already frozen. `state.autoPrestige` (the level) is permanent; `autoPrestigeAttemptBudget`
  resets to 0 on every prestige (manual or automatic), same as `autobuyerAttemptBudgets`.
- **Active — Auto-Prestige Autobuyer:** `buyAutoPrestigeAutobuyer(state)` permanently spends
  `AUTO_PRESTIGE_AUTOBUYER_COST` PP (`500` — a "meta-automation" that automates RE-LEVELING
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
  `prestige.count` only ever grows. Called from two places: `prestigeGame`, right after incrementing
  `count` (so the very prestige that crosses a milestone unlocks it immediately), and
  `storage.js`'s `migrateState` on load (so a save from before this feature existed retroactively
  receives whatever it's already earned, without needing another prestige to trigger it).
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
has no clean meaning distinct from "temporarily not being smart." `storage.js`'s `migrateState`
backfills both new fields to `true` for every tier on a save predating this feature (see below). See
"Unit autobuyer status (Game view, per tier)" above and the Tier Autobuyers category in "PP Upgrades
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
  countGlobalTickspeedMilestones(level)`, `regularLevels = level - milestoneLevels`, and
  `regularStep = getGlobalTickspeedRegularStep(overclockCount) = GLOBAL_TICKSPEED_PRODUCTION_STEP +
  overclockCount * OVERCLOCK_PRODUCTION_STEP`; returns `(1 + regularStep) ** regularLevels * (1 +
  GLOBAL_TICKSPEED_MILESTONE_STEP) ** milestoneLevels` (`GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01`,
  `GLOBAL_TICKSPEED_MILESTONE_STEP = 0.10`; `null`/never-bought treated as level 0, i.e. no bonus,
  ×1, regardless of `overclockCount`). `overclockCount` (see "Overclock" below) permanently raises
  `regularStep` above its 1% baseline — 1.1% after the first Overclock activation, 1.2% after the
  second, and so on — but never touches the milestone step, which stays fixed at 10%.
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

There used to also be a bottom `PrestigeCard` (Game view) mirroring the analogous informational
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
speedUpCount + 2`, a LEVEL target (level 2 for the first activation, level 3 for the second, …), compared
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

`MainPage` surfaces this as a `SpeedUpCard` (cyan accent; Game view only), rendered directly below
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
size), Lv.2 after two, and the first Speed Up requires reaching (displayed) level 1. The underlying
`purchaseLevels`/`getSpeedUpRequirement` values driving eligibility (`canSpeedUp`) are unchanged — only
the two numbers rendered to the player are shifted. The on-button `$progress` fill (`speedUpProgressPercent`)
is computed from these same displayed values, not the raw ones, so it reads 0% before any block is
completed rather than already partway filled. Enabled once the requirement is met and disabled
while frozen — no `window.confirm` guard, since this is beneficial not destructive. Once `!isFirstRun`
and `autoSpeedUp` bought, a static "⏩ Auto Speed Up active" note shows (the purchase button itself
lives on the PP Upgrades page).

### Overclock

A second, rarer soft-reset than Speed Up, sharing the same last-tier gate but a much higher (and
non-shrinking-relative-to-itself) requirement: `getOverclockRequirement(overclockCount) =
(overclockCount + 1) * OVERCLOCK_REQUIREMENT_STEP` (`OVERCLOCK_REQUIREMENT_STEP = 10`) — level 10 for
the first activation, level 20 for the second, level 30 for the third, … — again a LEVEL target compared
against `state.purchaseLevels[lastTier.id]`. Unlike `getSpeedUpRequirement`'s `speedUpCount + 2` (a step
that shrinks toward the requirement itself as `speedUpCount` grows), Overclock's step is a fixed +10
every time. `overclockGame` (`engine.js`) does everything `speedUpGame` does — full
resources/owned/purchased/tickspeedLevels/purchaseLevels/purchaseLevelProgress reset, `globalTickspeedMultiplier`
reset to `null`, `lastTierXpConsumed`/`prestige.xp`/`prestige.highestMilestone` reset, every automation
toggle (`smartAutobuyer`/`tierTickspeedAutobuyer`/`autoPrestige`/`prestigeSpeedBonusUnlocked`/
`autoSpeedUp`/`autoGlobalTickspeed`) carried over unchanged, `prestige.points`/`count` passed through
untouched — **plus two differences**: it resets `speedUpCount` back to 0 (wiping Speed Up's own stacking
multiplier back to its 1x baseline, not just refusing to grow it further) instead of leaving it alone,
and it increments `overclockCount` by 1 instead of leaving it untouched. Refuses while `isProductionFrozen`,
same as `speedUpGame`.

The reward is **not** a separate multiplier stacked alongside the (Money-funded) global tickspeed
multiplier — it permanently raises that multiplier's own per-level growth rate instead.
`getGlobalTickspeedRegularStep(overclockCount) = GLOBAL_TICKSPEED_PRODUCTION_STEP +
overclockCount * OVERCLOCK_PRODUCTION_STEP` (`OVERCLOCK_PRODUCTION_STEP = 0.001`) computes the
percentage every future REGULAR level of the global tickspeed multiplier compounds at: the baseline 1%
with no activations, 1.1% after the first, 1.2% after the second, and so on — each activation adds
another 0.1 percentage points directly onto the step, not a separate ×1.001 factor. This step feeds into
`getGlobalTickspeedProductionMultiplier(level, overclockCount)`, which now takes `overclockCount` as a
second parameter (defaulting to 0, so any caller that hasn't been updated to pass it still gets the
pre-Overclock baseline rather than throwing — but every real call site in this codebase passes it
explicitly): `(1 + getGlobalTickspeedRegularStep(overclockCount)) ** regularLevels * (1 +
GLOBAL_TICKSPEED_MILESTONE_STEP) ** milestoneLevels` — only the REGULAR-level step is affected; a
milestone level's own 10% step (`GLOBAL_TICKSPEED_MILESTONE_STEP`) is deliberately unchanged by
Overclock. Because the boosted step is folded directly into the *existing* global tickspeed multiplier,
`getEffectiveTierTickSpeedSeconds` needs no separate third factor for Overclock — it still divides by
just the per-tier/XP-funded multiplier and the global tickspeed multiplier, and the latter's own value
already reflects whatever Overclock has done to it. A direct consequence: Overclock has **no effect at
all** while the global tickspeed multiplier is still at level 0/not yet bought — there's no level for the
boosted step to compound over — and any level already bought before an Overclock activation
retroactively compounds at the new, higher rate from then on, exactly like every other level (the
boosted rate isn't scoped to "levels bought after this point").

`overclockCount` itself sits one rung above `speedUpCount` in the reset hierarchy (Prestige > Overclock >
Speed Up): it's run-scoped like `speedUpCount`, but **survives an ordinary Speed Up** (`speedUpGame`
explicitly carries it over unchanged — see `speedUpGame`'s own return object) rather than resetting on
every soft-reset the way `speedUpCount` does. It resets to 0 only on a real Prestige (`prestigeGame`
doesn't list it among its carried-over fields, so it falls through to `createInitialGameState()`'s
default, same mechanism `speedUpCount` itself uses there) or on its own activation (`overclockGame`
increments it, same as `speedUpGame` increments `speedUpCount`). There is no PP-funded "Auto Overclock"
automation (unlike Speed Up's `autoSpeedUp`) — Overclock is meant to be a deliberate, occasional player
decision given how much it costs the run (wiping Speed Up's bonus along with everything else).

`MainPage` surfaces this as an `OverclockCard` (orange accent; Game view only), rendered directly below
`TierList`, side by side with `SpeedUpCard` inside the shared `SpeedCardsRow` flex row (see "Speed Up"
above) — not grouped with `GlobalTickspeedCard`, which renders separately at the top of the Game view.
Gated on `overclockEverRevealed` (see docs/MAINPAGE_REFERENCE.md), the same
progressive-disclosure pattern as `speedUpEverRevealed`. The button (`OverclockButton`, sized to match
`SpeedUpButton`/the tier rows' own Buy/tickspeed buttons) shows `⚡ {nextStep}%/lvl · Lv.{level}/{requirement}`
— e.g. `⚡ 1.2%/lvl · Lv.12/20` — where `{nextStep}` is `getGlobalTickspeedRegularStep(overclockCount + 1)`
formatted as a percentage (reusing `formatGlobalTickspeedBonusPercent`'s trimmed-decimal formatting by
passing it `1 + step` as if it were a multiplier, since that function already computes `(multiplier - 1)
* 100`). Unlike Speed Up's own button, **this level/requirement pair is NOT given the -1 "completed
blocks" display offset** — `getOverclockRequirement`'s round numbers (10/20/30/…) are shown exactly as
`state.purchaseLevels[lastTier.id]` and the requirement itself already read, matching the same raw level
number the last tier's own Details disclosure shows, rather than introducing a second, differently-offset
"level" reading for the same underlying value. Enabled once the requirement is met and disabled while
frozen — no `window.confirm` guard, same rationale as Speed Up (beneficial, not destructive).

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

The "↺ Reset" button (`resetGame`, wipes the save and starts a fresh game) is always rendered.
`ResetButton` (`styled(Button)`, smaller) gates the actual `resetGame()` call behind a native
`window.confirm(...)` prompt. Cancelling leaves state untouched. On acceptance, alongside `resetGame()`,
the handler resets `MainPage`'s local view-state to `'game'` and clears the
`speedUpEverRevealed`/`globalTickspeedCardEverRevealed` flags (plain component state, not part of
engine state).

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
  overclockCount: 0,                                     // RUN-SCOPED (but Speed-Up-surviving) count of
                                                          // Overclock activations (see overclockGame/
                                                          // getGlobalTickspeedRegularStep below) — permanently
                                                          // raises the per-level step the global tickspeed
                                                          // multiplier's own REGULAR levels compound at
                                                          // (GLOBAL_TICKSPEED_PRODUCTION_STEP +
                                                          // overclockCount*OVERCLOCK_PRODUCTION_STEP) AND how
                                                          // many last-tier purchases the next activation
                                                          // requires (getOverclockRequirement). Never reset by
                                                          // Speed Up (speedUpGame explicitly carries it over
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
                                                          // disappear from the Game view just because a
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
                                                          // Byte); ×= 10 (INTRO_CAPACITY_MULTIPLIER) each
                                                          // "Sacrifice for 10x Capacity" pick
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
                                                          // productionMilestoneTier; resets to 0 whenever the
                                                          // tier advances
    mainGameUnlocked: false,                              // Resets to false every real Prestige: true the
                                                          // instant any bits are ever converted into
                                                          // Kilobytes this cycle (manual or auto) — drives
                                                          // App.jsx's page routing gate. NOT a freeze flag —
                                                          // the Byte Foundry stays fully interactive well
                                                          // past this point
    storageBanks: {},                                     // PERMANENT. { [capacityBits]: count } of
                                                          // currently-FULL Storage banks of that size — see
                                                          // tickStorageAutoFill/redeemStorageBank. A full
                                                          // bank's contents ride through a real Prestige
                                                          // untouched even though Memory itself resets
    storageBanksBuiltTotal: {},                           // PERMANENT. { [capacityBits]: cumulative count }
                                                          // of every bank ever built (constructed) at that
                                                          // size, full or empty — redeeming never decrements
                                                          // this; drives getStorageBankSize's one-way ladder
                                                          // advance. Empty count = builtTotal - storageBanks
    storageAutoRedeemEnabled: false,                      // PERMANENT. Plain preference, no prerequisite
                                                          // purchase — see setStorageAutoRedeemEnabled.
                                                          // Doesn't gate the 1 KB denomination at all
    storageAutoRedeemedSizes: {},                         // NOT permanent — resets to {} every real Prestige,
                                                          // unlike every other Storage field above.
                                                          // { [capacityBits]: true } once tickStorageAutoRedeem
                                                          // has auto-redeemed that size this cycle
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
| `getTierCost` | `(tier, level) → number` | Returns the fixed PER-UNIT price: `baseCost * 10^(getCostEpochExponent(epoch) - 1)`, epoch = `level - 1` — each level multiplies `baseCost` by 10 raised to (that level's cost-epoch exponent − 1): 1, 2, 4, 7, 11, … for epochs 0, 1, 2, 3, 4, … This price is independent of `blockSize` entirely — no division happens anywhere in it, so the result is always an exact integer. A level's TOTAL cost (every purchase within it, summed) is this per-unit price times whatever `blockSize` is in effect (see `getTierQuantityCost`) — the total that scales with block size, not the per-unit price. Takes the tier's current LEVEL directly (`state.purchaseLevels[tierId]`), not a lifetime purchased count. See `docs/DESIGN_HISTORY.md` for why this multiplier form (and its triangular-number sequence, superseding an earlier Fibonacci one) was adopted over a literal `baseCost^exponent`, and for the history of the per-unit/level-total split (an intermediate division-based version was replaced by this fixed-price-times-blockSize version). Deep epochs still eventually overflow to `Infinity`, which is safe — an infinite cost is simply never affordable |
| `getCostEpochExponent` | `epoch → number` | The exponent driving a cost epoch's multiplier in `getTierCost`: 1, 2, 4, 7, 11, 16, 22, … for epochs 0, 1, 2, 3, 4, 5, 6, … (`exponent(e) = 1 + e*(e+1)/2`, a "1 plus a triangular number" progression); a negative epoch is clamped to 0. Supersedes an earlier Fibonacci-based sequence — see `docs/DESIGN_HISTORY.md` |
| `getPurchaseBlockSize` | `state → number` | The purchase block size every tier's current level currently requires to complete — a single global value (not per-tier), read fresh from state rather than a hardcoded constant. Starts at `DEFAULT_PURCHASE_BLOCK_SIZE` and grows by `PURCHASE_BLOCK_SIZE_GROWTH_STEP` every `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS` the LAST tier completes (see "The (configurable) purchase block size and tier levels" above). Supersedes an earlier `getTierLevel(purchased)` accessor that derived a level via division against a fixed block size — see `docs/DESIGN_HISTORY.md` |
| `getTierBulkQuantity` | `(blockSize, levelProgress, requestedQuantity) → number` | Caps a bulk purchase at the units remaining to complete the current level (`blockSize - levelProgress`), so every unit bought is the same price |
| `getTierQuantityCost` | `(tier, level, blockSize, levelProgress, requestedQuantity) → number` | `getTierCost(...) * getTierBulkQuantity(...)` |
| `getTierAffordableQuantity` | `(tier, level, blockSize, levelProgress, spendable, requestedQuantity) → number` | Further caps `getTierBulkQuantity` by what `spendable` can actually pay for — what `buyTierQuantity` will actually purchase |
| `getTierSpendableAmount` | `(state, tier) → number` | Balance of `tier.costResourceId` (always `MONEY_ID`, `'base'`) |
| `getTierPurchasedCount` | `(state, tierId) → number` | Lifetime purchases — display/back-compat only; no longer used for cost scaling (see `state.purchaseLevels`/`purchaseLevelProgress`) |
| `isProductionFrozen` | `state → bool` | `Money >= PRESTIGE_THRESHOLD` — once true, `buyTier`/`buyTickspeedMultiplier`/`buySmartAutobuyer`/`buyAutoPrestige`/`buyGlobalTickspeedMultiplier` all become no-ops (return the same state unchanged); `tickGame` either stays frozen too or calls `prestigeGame` automatically once Auto-Prestige's banked attempt budget crosses 1 (see its own row below). The UI reads this same function to disable every other control (see Architecture) |
| `tickGame` | `(elapsedSeconds, autobuyerBatchSize = 1) → state → state` | Runs the Byte Foundry's `tickIntroProduction`/`tickIntroAutoInvest` first, unconditionally, before anything below (see "Byte Foundry" above) — `tickIntroProduction` short-circuits to a same-reference no-op before `byteCreated`, and `tickIntroAutoInvest` once `bits` can't cover another batch threshold; neither ever fully freezes, and neither is capped. If `isProductionFrozen`: when `autoPrestige` isn't bought OR `autoPrestigeEnabled` is false (paused — see "Pause/resume for the global automations" above), short-circuits (returns the same state, unchanged); otherwise accumulates `autoPrestigeAttemptBudget` by `getAutoPrestigeAttemptRate(autoPrestige) * elapsedSeconds` and, once that crosses 1 (with `TICK_ACCUMULATION_EPSILON` tolerance), calls `prestigeGame` immediately (prestigeGame's own reset zeroes the budget back out) — otherwise returns the state with just the updated budget. Otherwise (not frozen) runs autobuyers highest-tier-first (every tier costs the same resource, Money, so autobuyers compete for one shared pool — the higher tier gets first claim on limited funds), then produces resources for every unlocked tier — but only once its `tierProductionAccumulators[tier.id]` (incremented by `elapsedSeconds` this tick) crosses that tier's own `getEffectiveTierTickSpeedSeconds(state, tier.id)` — the tier's base tickspeed shrunk by both tickspeed multipliers (with the same epsilon tolerance); when it does, delivers `floor(owned × (whole effective periods elapsed) × multiplier × speedUpMultiplier × getPurchaseMilestoneMultiplier(level))` in one batch — note neither tickspeed multiplier appears in this credit formula, since they already did their work by shrinking the period the "whole effective periods elapsed" count is measured against — where `multiplier` is `getPrestigeProductionMultiplier(prestige.points)` if `prestigeSpeedBonusUnlocked` is true, or a flat `1` otherwise, and `speedUpMultiplier` is `getSpeedUpMultiplier(speedUpCount)` — always ≥ 1, unconditional, no unlock needed — and the result is floored so `owned`/`resources` stay integer-valued — and banks any leftover remainder for the next tick — then checks milestones, then — for every tier whose tier tickspeed autobuyer is bought (`tierTickspeedAutobuyer[tier.id]` — no dependency on `autobuyers[tier.id]` at all) and whose `tierTickspeedAutobuyerEnabled[tier.id] ?? true` is true (paused behaves exactly as if `tierTickspeedAutobuyer[tier.id]` were still false, see "Pause/resume for per-tier automations" in CLAUDE.md) — calls `buyTickspeedMultiplier(tier.id)` once more automatically, no-op if unaffordable (edge-triggered on affordability, not scaled by `elapsedSeconds`), **except for the last tier once `isLastTierTickspeedXpUnlocked` holds**, where the same bought flag instead calls `consumeXpForLastTierTickspeed(state.prestige.xp)` (spending the tier's entire current XP balance, same edge-triggered convention, no-op below the minimum consumption threshold — see "The last tier's XP-funded tickspeed" in CLAUDE.md), and — if `autoPrestige` is bought and `autoPrestigeEnabled` is true — accumulates `autoPrestigeAttemptBudget` here too, scaled by `elapsedSeconds` (the clock runs continuously regardless of frozen state, but can only ever fire from the frozen branch above). `globalTickspeedMultiplier` needs no per-tick accumulation of its own — unlike Auto-Prestige's attempt budget, it's just a permanent level read via `getGlobalTickspeedProductionMultiplier` inside `getEffectiveTierTickSpeedSeconds` each tick, changed only by the player's own `buyGlobalTickspeedMultiplier` clicks or — once `autoGlobalTickspeed` is bought (see `buyTickspeedAutobuyer`) and `autoGlobalTickspeedEnabled` is true — by `tickGame` calling `buyGlobalTickspeedMultiplier` automatically every tick right after the per-tier tickspeed self-upgrade step above, the same edge-triggered convention, re-validating its own eligibility internally each time. Next, if `autoPrestigeAutobuyer` is bought and `autoPrestigeAutobuyerEnabled` is true, calls `buyAutoPrestige` once more automatically (edge-triggered, re-validating its own eligibility internally — no rate-accumulating budget, unlike Auto-Prestige's own attempt budget above), the same convention as the tickspeed self-upgrade steps just before it. For each non-`null` (unlocked) autobuyer whose `autobuyersEnabled[tier.id] ?? true` is also true (a paused tier is treated exactly like "never unlocked" here, including skipping this budget accumulation — see "Pause/resume for per-tier automations" in CLAUDE.md), accumulates a fractional purchase-attempt budget (`autobuyerAttemptBudgets[tier.id] + elapsedSeconds` — a flat rate, independent of tickspeed level) and fires one purchase attempt (via `buyTierQuantity`) per whole unit of budget (with the same epsilon tolerance), carrying any fractional remainder into the next tick. If a purchase can't be afforded, the loop stops *without* spending the already-accumulated attempt — it stays banked. The effective per-iteration batch size is `autobuyerBatchSize`, except for a "smart" tier (`smartAutobuyer[tier.id]`) still on its very first level (`purchaseLevels[tier.id] === 1`), which uses 1 instead — above 1 (`Number.MAX_SAFE_INTEGER` in the running app, see `useIncrementalGame`'s `BUY_QUANTITY`) each attempt only buys once the tier can afford the *entire* current cost block up to that size. Finally, if `autoSpeedUp` is bought and `autoSpeedUpEnabled` is true, calls `speedUpGame` once more (edge-triggered, re-validates its own eligibility internally) |
| `getIntroProductionRate` | `intro → number` | Byte Foundry: current bits/sec, `(INTRO_BYTE_BASE_RATE * productionMultiplier) / tickSpeedSeconds` — always an exact integer, since both factors are always powers of `INTRO_PRODUCTION_MULTIPLIER_STEP`. Used by `tapIntroBit` and the passive-production display |
| `tapIntroBit` | `state → state` | Byte Foundry: adds `getIntroProductionRate(intro)` bits to `intro.bits` — "one second's worth" at the current rate, not a flat 1 — capped at `intro.capacity`. No-op once already full. Never freezes |
| `combineIntroByte` | `state → state` | Byte Foundry: one-time — consumes `INTRO_BYTE_COMBINE_COST` (8) bits, sets `intro.byteCreated = true`. No-op once already created or below cost |
| `pickIntroCapacityMilestone` | `state → state` | Byte Foundry "Sacrifice for 10x Capacity" — requires `intro.bits === intro.capacity`; drains the entire balance to 0, multiplies `capacity` by `INTRO_CAPACITY_MULTIPLIER`. Repeatable at every tier reached; doesn't touch `tickSpeedSeconds`/`productionMultiplier`. No-op otherwise. Never freezes |
| `getIntroProductionMilestoneCost` | `tier → number` | Byte Foundry: `INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER ** tier` — "Invest for Double Production"'s own independent cost ladder (8, 80, 800, 8000, 80000, … bits), unrelated to `intro.capacity` |
| `getIntroProductionMilestoneMaxClaims` | `tier → number` | Byte Foundry: `2` if `getIntroProductionMilestoneCost(tier) < INTRO_AUTO_INVEST_THRESHOLD` (the three tiers strictly below 1000 Bytes), else `1` (1000 Bytes on) |
| `pickIntroProductionMilestone` | `state → state` | Byte Foundry "Invest for Double Production" — reads `cost = getIntroProductionMilestoneCost(intro.productionMilestoneTier)`; requires `intro.bits >= cost` (NOT full capacity — cost is independent of `intro.capacity`) and `intro.productionMilestoneTierClaims < getIntroProductionMilestoneMaxClaims(tier)`; deducts exactly `cost` from `bits`, and either increments `productionMilestoneTierClaims` (same tier) or advances `productionMilestoneTier` with a fresh claim count of 0 once the tier's claim limit is reached. Doubles the overall rate: halves `tickSpeedSeconds` while that stays ≥ `INTRO_MIN_TICK_SPEED_SECONDS`, otherwise multiplies `productionMultiplier` by `INTRO_PRODUCTION_MULTIPLIER_STEP` instead. No-op below cost or once every claim at the current tier is already used. Never freezes |
| `isIntroConversionUnlocked` | `state → bool` | Byte Foundry predicate (not a reducer): `intro.capacity >= INTRO_CONVERSION_UNLOCK_CAPACITY` (1000) — drives whether `ByteFoundryPage` shows the transfer-block row at all |
| `getIntroTransferBudget` | `state → number` | Byte Foundry: `getPurchaseBlockSize(state) * INTRO_BITS_PER_KILOBYTE_CONVERSION` — `tickIntroAutoInvest`'s own batch threshold, dynamic (tied to the Kilobyte tier's own live purchase block size, not a fixed constant). 8000 at a fresh cycle's default block size. NOT a cap — see `convertIntroBitsToKilobytes`/`tickIntroAutoInvest` below |
| `convertIntroBitsToKilobytes` | `state → state` | Byte Foundry: spends `INTRO_BITS_PER_KILOBYTE_CONVERSION` (1000) bits from `intro.bits`, grants 1 free `TIER_DEFINITIONS[0]` (Kilobytes) unit via the internal `grantTierUnits` helper — bypasses `isTierUnlocked`/`isProductionFrozen` entirely (separate currency pool). No-op only below cost — **no per-cycle cap**. Sets `mainGameUnlocked: true` on success. Called once per transfer-block click in `ByteFoundryPage` |
| `tickIntroProduction` | `elapsedSeconds → state → state` | Byte Foundry: passive production for the Byte generator — no-op immediately before `intro.byteCreated`. Delivers one batch of `INTRO_BYTE_BASE_RATE * productionMultiplier` bits every `tickSpeedSeconds` of elapsed time (the same discrete "accumulate, deliver a whole period, bank the remainder" model `tickGame`'s own per-tier production uses — see there), crediting whole bits capped at `capacity`. Never freezes once `byteCreated` |
| `tickIntroAutoInvest` | `state → state` | Byte Foundry: bulk auto-convert convenience, mirroring the autobuyer "wait until the whole batch is affordable, then fire once" convention above — no-op below `getIntroTransferBudget(state)` (dynamic — see there). Transfers exactly `getIntroTransferBudget(state)` bits via `grantTierUnits`, granting `getPurchaseBlockSize(state)` Kilobytes at once; sets `mainGameUnlocked: true` on success. Can fire again immediately the next time `intro.bits` reaches the threshold again — **no per-cycle cap**, unlike an earlier design (see `docs/DESIGN_HISTORY.md`) |
| `getStorageBankSize` | `state → number` | Byte Foundry Storage: an independent ladder that walks tier01's own per-unit LEVEL COST sequence (`getTierCost(TIER_DEFINITIONS[0], level)` for level 1, 2, 3, …) rather than a synthetic ×10 progression, advancing to the next level's cost every time `STORAGE_BANK_LADDER_CAP` banks have ever been built at the current one (read from `intro.storageBanksBuiltTotal`, cumulative — never decremented by redeeming) — the size `buildStorageBank` currently builds at. Because `getCostEpochExponent`'s exponent sequence skips values, this skips sizes too (e.g. level 3 = 1,000,000, never 100,000). Deliberately decoupled from tier01's own CURRENT level cost; see `isStorageBankRedeemable` for the separate check on whether a built bank is spendable once full |
| `getStorageBankCost` | `capacityBits → number` | Byte Foundry Storage: `capacityBits * STORAGE_BUILD_COST_MULTIPLIER * BITS_PER_BYTE` — 10x the bank's own face value, in BYTES not bits (a 1000-bit bank costs 80,000 bits to build). Pays only for the empty container — not what fills it |
| `buildStorageBank` | `state → state` | Byte Foundry Storage: spends `getStorageBankCost(getStorageBankSize(state))` bits from `intro.bits`, adds one EMPTY bank of that size to `intro.storageBanksBuiltTotal` only (cumulative, drives the ladder) — deliberately does NOT touch `intro.storageBanks` (the currently-full count); a freshly built bank starts empty, filled later by `tickStorageAutoFill`. No-op below cost. Bypasses `isProductionFrozen` (separate currency pool, same posture as Combine/Sacrifice/Invest) |
| `tickStorageAutoFill` | `state → state` | Byte Foundry Storage: cascades Memory into every currently-fillable EMPTY bank in one pass, smallest size first — while some size has `storageBanksBuiltTotal[size] > storageBanks[size]` (an empty container) and `intro.bits >= size`, moves `size` bits from `intro.bits` into `intro.storageBanks[size]` (+1), then repeats; terminates because affordability is monotonic with size. Whatever's left over stays as Memory's own balance. Unconditional — no toggle, no prerequisite. Bypasses `isProductionFrozen`, same posture as every other Byte Foundry mechanic. Same-reference no-op when nothing is fillable |
| `isStorageBankRedeemable` | `(state, capacityBits) → bool` | Byte Foundry Storage: `capacityBits <= getTierCost(TIER_DEFINITIONS[0], purchaseLevels.tier01 ?? 1)` — at or below tier01's CURRENT per-unit level cost, not a one-tick-only exact match (an autobuyer burst can jump tier01's level, and hence its cost, straight past a bank's exact size in a single tick — see `getFirstTierCost`'s comment in `engine.js`). Unaffected by this redesign — still the only gate on whether a FULL bank is spendable |
| `redeemStorageBank` | `capacityBits → state → state` | Byte Foundry Storage: no-op if no bank of that size is currently full (`intro.storageBanks[capacityBits] <= 0`) or `isStorageBankRedeemable` is false; otherwise decrements `intro.storageBanks[capacityBits]` (removing the key entirely once it reaches 0 — `intro.storageBanksBuiltTotal[capacityBits]` is untouched, it never decrements, so the bank re-enters the fillable pool) and grants 1 free `TIER_DEFINITIONS[0]` unit via `grantTierUnits` — bypasses `isProductionFrozen`/`isTierUnlocked`/cost entirely, and deliberately bypasses `convertIntroBitsToKilobytes`/`tickIntroAutoInvest` entirely too (a bank's contents came from Memory via `tickStorageAutoFill`, not a further bit-to-Kilobyte conversion at redeem time) |
| `tickStorageAutoRedeem` | `state → state` | Byte Foundry Storage: no-op unless there's an eligible size. A size is eligible if a bank of it is currently FULL, `isStorageBankRedeemable`, not already in `intro.storageAutoRedeemedSizes` this cycle, AND (it's `INTRO_BITS_PER_KILOBYTE_CONVERSION`, "1 KB" — exempt from the toggle — OR `intro.storageAutoRedeemEnabled` is true). Redeems the smallest eligible size and marks it in `storageAutoRedeemedSizes`, capping auto-redeem at once per size per real Prestige cycle (`storageAutoRedeemedSizes` resets fresh every real Prestige — see `prestigeGame`). Called from every branch of `tickGame`, frozen or not (bypasses the production freeze, same as `redeemStorageBank` itself), immediately after `tickStorageAutoFill` (so a bank filled THIS tick can redeem the same tick) and after every other per-tick automation (including a possible automatic Speed Up), so it always reacts to tier01's truly final level for the tick |
| `setStorageAutoRedeemEnabled` | `enabled → state → state` | Byte Foundry Storage: unconditionally sets `intro.storageAutoRedeemEnabled` — a plain preference, no prerequisite purchase (unlike `setAutoSpeedUpEnabled`/etc., which no-op until their parent automation is bought). Doesn't gate the 1 KB denomination's auto-redeem at all — see `tickStorageAutoRedeem` |
| `buyTier` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`; otherwise validates unlock + affordability, deducts cost, increments `owned`/`purchased` by 1; used internally by `buyTierQuantity`, not called directly by the UI |
| `buyTierQuantity` | `(tierId, quantity) → state → state` | Buys up to `quantity` units (capped at the cost-block boundary via `getTierBulkQuantity`), stopping early if a unit becomes unaffordable; used both by the manual "Buy" button (always `quantity` `Number.MAX_SAFE_INTEGER`, see `useIncrementalGame`'s `BUY_QUANTITY`) and by `tickGame`'s autobuyer loop — the two purchase paths are identical, a tier's tickspeed multiplier level has no effect on how much a purchase costs or how many units it grants |
| `applyAutobuyerMilestones` | `state → state` | For every tier whose `getAutobuyerUnlockMilestone(tierId)`/`getTierTickspeedAutobuyerMilestone(tierId)` is met by `state.prestige.count` and isn't already unlocked, sets `autobuyers[tierId] = 1` and/or `tierTickspeedAutobuyer[tierId] = true` — no PP spent, no cost check at all. Never revokes anything already unlocked; returns the same state reference if nothing newly qualifies. Called from `prestigeGame` (right after incrementing `count`) and from `storage.js`'s `migrateState` on load |
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
| `getSpeedUpRequirement` | `speedUpCount → number` | `speedUpCount + 2` — the last tier's LEVEL the *next* Speed Up needs: level 2 for the first activation, level 3 for the second, level 4 for the third, … Expressed as a level target rather than a lifetime-purchased-count threshold since how many purchases a level boundary corresponds to now depends on the current (possibly grown) block size, while the level number itself doesn't |
| `getGlobalTickspeedRegularStep` | `overclockCount → number` | `GLOBAL_TICKSPEED_PRODUCTION_STEP + overclockCount * OVERCLOCK_PRODUCTION_STEP` — the per-level percentage every future REGULAR level of the global tickspeed multiplier compounds at, after folding in Overclock's permanent boost: 1% (0.01) with no activations, 1.1% after the first, 1.2% after the second, and so on. Feeds directly into `getGlobalTickspeedProductionMultiplier` below; a milestone level's own step is unaffected |
| `getOverclockRequirement` | `overclockCount → number` | `(overclockCount + 1) * OVERCLOCK_REQUIREMENT_STEP` (`OVERCLOCK_REQUIREMENT_STEP = 10`) — the last tier's LEVEL the *next* Overclock needs: level 10 for the first activation, level 20 for the second, level 30 for the third, … Unlike `getSpeedUpRequirement`'s `+2`/`+1`-per-cycle ladder (a step that shrinks relative to the requirement itself as it grows), this fixed +10 step never shrinks relative to itself |
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
| `getGlobalTickspeedProductionMultiplier` | `(level, overclockCount = 0) → number` | `milestoneLevels = countGlobalTickspeedMilestones(level)`, `regularLevels = level - milestoneLevels`, `regularStep = getGlobalTickspeedRegularStep(overclockCount)`; returns `(1 + regularStep) ** regularLevels * 1.10 ** milestoneLevels` (`GLOBAL_TICKSPEED_MILESTONE_STEP = 0.10`; `null`/never-bought treated as level 0, i.e. no bonus, ×1, regardless of `overclockCount`) — every level compounds, a regular level at `regularStep` (1% by default, permanently raised by Overclock), a milestone level at the fixed 10% instead. `overclockCount` defaults to 0 so pre-Overclock call sites don't need updating, but every real call site in this codebase passes it explicitly. `countGlobalTickspeedMilestones` (module-private) counts milestones with spacing 10 up to level 100 (10 milestones), spacing 100 from 100 to 1000 (9 more), spacing 1000 from 1000 to 10000 (9 more), and so on |
| `getPrestigePointsAwarded` | `money → number` | `floor(log10(money) / log10(GOOGOL))` — the log, base GOOGOL, of the money balance; always ≥ 1 (prestiging requires the exponent ≥ 100 already); only increases once a further full 100 orders of magnitude are reached (exponent 200 → 2, 300 → 3, …) |
| `getPrestigeProductionMultiplier` | `points → number` | `1 + PRESTIGE_POINT_SPEED_BONUS * points` — a flat +1% production speed per unspent Prestige Point. A pure formula, not auto-applied — callers must check `prestigeSpeedBonusUnlocked` first; before that's bought, every caller uses a flat `1` instead. Fractional whenever `points` isn't a multiple of 100; `tickGame` floors its production credit to absorb this |
| `prestigeGame` | `state → state` | Requires Money ≥ `PRESTIGE_THRESHOLD`; resets resources/owned/purchased, every tier's `tickspeedLevels`/`purchaseLevels`/`purchaseLevelProgress` entries back to their baseline (1/1/0 — no speed bonus, level 1, no progress; resetting `purchaseLevels` also resets `getPurchaseBlockSize` back to `DEFAULT_PURCHASE_BLOCK_SIZE`), `globalTickspeedMultiplier` back to `null` (not-yet-bought — same reset `speedUpGame` does), `speedUpCount` back to 0 (run-scoped — unlike every other flag/level listed next, the stacking Speed Up multiplier does NOT survive a real Prestige and must be rebuilt from scratch each cycle), `prestige.xp`/`lastTierXpConsumed` back to 0 (run-scoped, like resources/owned/purchased), and `everUnlockedTierIds` back to the fresh default (only the first tier true — so every tier beyond the first relocks exactly as it always has, same as owned/purchased), resets `intro.bits`/`intro.productionAccumulator` ("Memory") and `intro.mainGameUnlocked` (the gate) back to `createInitialGameState()`'s fresh defaults — the transfer-block row's own progress resets too, purely as a side effect of `purchaseLevels`/`purchaseLevelProgress` resetting for every tier above, tier01 included, while keeping `intro.capacity`/`intro.byteCreated`/`intro.tickSpeedSeconds`/`intro.productionMultiplier`/`intro.productionMilestoneTier`/`intro.productionMilestoneTierClaims` (the Byte generator and its upgrades) PERMANENT, carried over from `state` unchanged (see "Byte Foundry" below) — a real Prestige sends the player back through the gate every cycle, but not through a from-scratch replay of the generator itself, keeps autobuyer *unlock* flags, and `smartAutobuyer`/`tierTickspeedAutobuyer`/`autobuyersEnabled`/`tierTickspeedAutobuyerEnabled`/`autoPrestige`/`autoPrestigeAutobuyer`/`autoSpeedUp`/`autoGlobalTickspeed`/`autoSpeedUpEnabled`/`autoGlobalTickspeedEnabled`/`autoPrestigeAutobuyerEnabled`/`autoPrestigeEnabled` unchanged (permanent, including the Auto-Prestige *level*, the Auto-Prestige Autobuyer, and each automation's pause/resume preference, both global and per-tier; `autoSpeedUp` is the automation *toggle* only — it carries over even though the `speedUpCount` multiplier it drives resets), resets `autoPrestigeAttemptBudget` to 0 (like `autobuyerAttemptBudgets`), adds `getPrestigePointsAwarded(money)` on top of any already-unspent `prestige.points`, increments `prestige.count` by 1 (both permanent, unlike `xp`). Since `owned` resets, this also disengages the last tier's XP-funded tickspeed mechanic (`isLastTierTickspeedXpUnlocked` is a live check — see "The last tier's XP-funded tickspeed" in CLAUDE.md) — with nothing banked to re-engage with either, since `lastTierXpConsumed` was just wiped along with it. Called either by the player's manual click or automatically by `tickGame` when Auto-Prestige's attempt budget fires |
| `speedUpGame` | `state → state` | Requires `state.purchaseLevels[lastTier.id] >= getSpeedUpRequirement(speedUpCount)` and not `isProductionFrozen`; resets resources/owned/purchased/tierProductionAccumulators/autobuyerAttemptBudgets/autoPrestigeAttemptBudget/tickspeedLevels/purchaseLevels/purchaseLevelProgress (every tier back to baseline)/`globalTickspeedMultiplier` (back to `null`)/`prestige.xp`/`lastTierXpConsumed` (both back to 0, same as `prestigeGame`)/`everUnlockedTierIds` (back to the fresh default, same as `prestigeGame`) exactly like a fresh `createInitialGameState` — resetting `purchaseLevels` also resets `getPurchaseBlockSize` back to `DEFAULT_PURCHASE_BLOCK_SIZE`, undoing any in-run growth — unlike `prestigeGame`, keeps `intro` completely untouched (an intra-cycle soft reset, not a new cycle — see "Byte Foundry" below), autobuyer *unlock* flags, and `smartAutobuyer`/`tierTickspeedAutobuyer`/`autobuyersEnabled`/`tierTickspeedAutobuyerEnabled`/`autoPrestige`/`autoPrestigeAutobuyer`/`prestigeSpeedBonusUnlocked`/`autoSpeedUp`/`autoGlobalTickspeed`/`autoSpeedUpEnabled`/`autoGlobalTickspeedEnabled`/`autoPrestigeAutobuyerEnabled`/`autoPrestigeEnabled` unchanged (mirrors `prestigeGame`'s reset pattern, including now resetting `globalTickspeedMultiplier`/`prestige.xp`/`lastTierXpConsumed` the same way; see "The global tickspeed multiplier" above), **and now also `overclockCount`** (carried over unchanged — see "Overclock" below) — and — same as `prestigeGame` — disengages the last tier's live-checked XP-funded tickspeed mechanic with nothing banked to re-engage with — leaves `prestige.points`/`count`/`highestMilestone` untouched — unlike `prestigeGame`, it doesn't award or spend Prestige Points — and increments `speedUpCount` by 1. Called either by the player's manual click or automatically by `tickGame` when Auto Speed Up is bought |
| `overclockGame` | `state → state` | Requires `state.purchaseLevels[lastTier.id] >= getOverclockRequirement(overclockCount)` and not `isProductionFrozen`; resets everything `speedUpGame` resets, the same way, keeps the same permanent flags/levels `speedUpGame` keeps — **plus two differences**: resets `speedUpCount` back to 0 (wiping Speed Up's own stacking multiplier, not just leaving it alone) and increments `overclockCount` by 1 instead of leaving it untouched. Leaves `prestige.points`/`count`/`highestMilestone` untouched, same as `speedUpGame` — doesn't award or spend Prestige Points. See "Overclock" below |
| `isTierUnlocked` | `state → tier → bool` | First tier always unlocked; later tiers need `owned[tierId] > 0`, `purchaseLevels[prevTier] >= 3` (the tier below has fully purchased two levels), or the permanent `everUnlockedTierIds[tierId]` flag (see `latchEverUnlockedTiers`) |
| `latchEverUnlockedTiers` | `state → state` | Not exported — sets `everUnlockedTierIds[tierId] = true` for any tier whose live `isTierUnlocked` condition is met but not yet flagged; returns the same state reference if nothing newly qualifies. Called from `buyTier` and `tickGame`'s production step, the only two places `owned` can increase |
| `getMoneyExponent` | `money → number` | `floor(log10(money))`, floored to 0 below 1 — money's order of magnitude, also what `checkMilestones` tracks as XP milestones |
| `getPrestigeProgressPercent` | `money → number` | `getMoneyExponent(money) / log10(GOOGOL) * 100`, rounded and clamped to `[0, 100]` — GOOGOL is exponent 100, so this reads as a whole percent equal to the money exponent itself |
| `getEffectiveTierTickSpeedSeconds` | `(state, tierId) → number` | `getTierBaseTickSpeedSeconds(tierId) / (tickspeedMultiplier × getGlobalTickspeedProductionMultiplier(globalTickspeedMultiplier, overclockCount))` — a tier's actual production period once both tickspeed multipliers have shrunk it; always `<=` the base value, since both multipliers are always `>= 1`. `tickspeedMultiplier` is `getTickspeedProductionMultiplier(tickspeedLevels[tierId])` normally, or — for the last tier while `isLastTierTickspeedXpUnlocked` — `getLastTierXpTickspeedMultiplier(lastTierXpConsumed)` instead (see "The last tier's XP-funded tickspeed" in CLAUDE.md). Overclock has no separate third factor here — its effect is already folded into the global tickspeed multiplier itself via that function's own `overclockCount` parameter (see "Overclock" below). If the division result is non-finite or <= 0 (a sufficiently large multiplier overflowing to `Infinity` in double-precision float — reachable in principle within a single run before the next Prestige/Speed Up resets `lastTierXpConsumed` — would otherwise divide the period down to exactly 0), returns `MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS` (`1e-9`, module-private in `engine.js`) instead — a pure numerical-safety floor, not a balance constant; see "Multiplier overflow safety" below for why an unguarded 0 period corrupts state. Used by both `tickGame` and `getTierProductionProgressPercent` so the two never disagree about what "one period" means for a tier |
| `isLastTierTickspeedXpUnlocked` | `state → bool` | `owned[lastTierId] >= getPurchaseBlockSize(state)` — a live check against the last tier's current owned count reaching one full level's worth (not a stored/latched flag) — a lighter-weight threshold than `isTierUnlocked`'s own two-level requirement for the tier below it, since this gates an XP bonus rather than revealing a new tier; whether the last tier's Money-funded tickspeed multiplier is currently replaced by the XP-funded one. Turns back off the moment owned drops below that threshold (e.g. a Prestige/Speed Up reset), then back on again once bought back up to it |
| `getLastTierXpTickspeedMultiplier` | `xpConsumed → number` | `(1 + LAST_TIER_XP_TICKSPEED_STEP) ** xpConsumed` (`LAST_TIER_XP_TICKSPEED_STEP = 0.01`) — compounds 1% per cumulative XP ever consumed via `consumeXpForLastTierTickspeed`, the same multiplicative form every other tier's own tickspeed multiplier uses (37 XP consumed = `1.01^37` ≈ ×1.446, not a flat +37%) |
| `getLastTierXpTickspeedMinConsumption` | `xpConsumed → number` | `max(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, ceil(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT * xpConsumed))` (`LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT = 0.1`, floor `= 1`) — the minimum a single `consumeXpForLastTierTickspeed` call may spend, growing alongside the cumulative XP already consumed this way |
| `consumeXpForLastTierTickspeed` | `amount → state → state` | Returns the same state if `isProductionFrozen`, if not currently `isLastTierTickspeedXpUnlocked`, if `amount` isn't a positive integer, if it's below `getLastTierXpTickspeedMinConsumption(lastTierXpConsumed)`, or if there isn't enough unspent XP; otherwise spends `amount` from `prestige.xp`, adds it to `lastTierXpConsumed`, and resets every tier *except the last one*'s `owned` (and matching `resources`) count to 0 plus the Money balance (`resources[MONEY_ID]`) to 0 — `purchased` and the last tier's own `owned`/`resources` are untouched (see "The last tier's XP-funded tickspeed" in CLAUDE.md). Called both manually (the "🧬 {XP} XP" button, always passing the tier's entire current XP balance) and automatically by `tickGame`, once per tick, for a tier whose `tierTickspeedAutobuyer` flag is bought while `isLastTierTickspeedXpUnlocked` holds — same self-no-op behavior either way |
| `getTierProductionProgressPercent` | `(state, tierId, previousAccumulator?, elapsedSeconds = 1) → number` | `state.tierProductionAccumulators[tierId] / getEffectiveTierTickSpeedSeconds(state, tierId) * 100`, rounded and clamped to `[0, 100]` — how far that tier's accumulator has filled toward its next delivery. If the optional `previousAccumulator` crosses the tier's effective tickspeed once `elapsedSeconds` is added (with the same `TICK_ACCUMULATION_EPSILON` tolerance `tickGame` uses), returns 100 instead. `elapsedSeconds` defaults to `1`. Currently unused by `MainPage` |
| `formatAmount` | `value → string` | Locale-formatted integer below `EXPONENTIAL_NOTATION_THRESHOLD` (1,000,000); scientific notation at/above, exponent marker lowercased to `e` (e.g. `6.5e13` — `Intl.NumberFormat`'s scientific notation always renders an uppercase `E` with no formatting option to override it, so a shared `formatScientific` helper lowercases it after formatting) — used for non-money amounts (owned/purchased counts, and per-tier per-tick production amounts, except a tier producing the base currency which uses `formatCurrency` instead so the row stays consistent with every other Money display) |
| `formatCurrency` | `value → string` | Full comma-grouped string below `EXPONENTIAL_NOTATION_THRESHOLD`, suffixed with `RESOURCE_SYMBOL(MONEY_ID)` (`b`), floored (never rounds up); exponential notation at/above the same threshold, same lowercase-`e` exponent marker as `formatAmount` (e.g. `6.5e13 b`) — used for all Money amounts, wherever they appear |
| `getOfflineEffectiveSeconds` | `elapsedRealSeconds → number` | Caps `elapsedRealSeconds` at `MAX_OFFLINE_SECONDS`, scales by `OFFLINE_PROGRESS_SPEED_MULTIPLIER` (10%), floors — the number of simulated 1-second ticks `applyOfflineProgress` will replay |
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
- `OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1` — offline progress runs at 10% of normal speed
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
- `OVERCLOCK_PRODUCTION_STEP = 0.001` — per-activation boost to the global tickspeed multiplier's own per-level step for Overclock (see `getGlobalTickspeedRegularStep`/`overclockGame`, "Overclock" above) — 0.1 percentage points added directly onto `GLOBAL_TICKSPEED_PRODUCTION_STEP` per activation (1% → 1.1% → 1.2% → …), two orders of magnitude smaller than `GLOBAL_TICKSPEED_PRODUCTION_STEP`'s 1% itself (Overclock has no per-level Money cost gating it, unlike the global tickspeed multiplier); unconditional, no PP unlock needed
- `OVERCLOCK_REQUIREMENT_STEP = 10` — the fixed per-activation level jump for Overclock's own requirement ladder (see `getOverclockRequirement`) — level 10 for the first activation, 20 for the second, 30 for the third, … a fixed step that never shrinks relative to itself, unlike `getSpeedUpRequirement`'s `+1`-per-cycle ladder
- `AUTO_SPEED_UP_COST = 100` — one-time PP cost to permanently automate Speed Up (see `buyAutoSpeedUp`) — cheaper than `PRESTIGE_SPEED_BONUS_UNLOCK_COST`/`AUTO_PRESTIGE_COST` since Speed Up fires far more often, but pricier than `TICKSPEED_AUTOBUYER_COST` below, since the global tickspeed multiplier it automates is a much smaller, earlier-game upgrade than Speed Up
- `TICKSPEED_AUTOBUYER_COST = 20` — one-time PP cost to permanently automate the (Money-funded) global tickspeed multiplier (see `buyTickspeedAutobuyer`) — the cheapest of all four global PP automation unlocks, since the global tickspeed multiplier it automates is a much smaller, earlier-game upgrade (unlocked as soon as the second tier is owned) than what any of the other three automate
- `AUTO_PRESTIGE_AUTOBUYER_COST = 500` — one-time PP cost to permanently automate RE-LEVELING Auto-Prestige itself (see `buyAutoPrestigeAutobuyer`) — a "meta-automation" (it automates re-buying an already-PP-funded track, not a Money-funded one like the two costs above), only ever useful once Auto-Prestige has already been activated once, so priced below `AUTO_PRESTIGE_COST`'s own initial-activation cost (the clicks it saves are already rare, since each Auto-Prestige level doubles in cost) but well above `AUTO_SPEED_UP_COST`/`TICKSPEED_AUTOBUYER_COST` above, since this row is gated behind `allTiersFullyAutomated` — a genuinely late-game convenience, not an early one
- `LAST_TIER_XP_TICKSPEED_STEP = 0.01` — each XP consumed via `consumeXpForLastTierTickspeed` within the current run compounds another 1% into the last tier's own delivery frequency (see `getLastTierXpTickspeedMultiplier`) — the mechanic that replaces that tier's Money-funded tickspeed multiplier while it currently has >= `getPurchaseBlockSize(state)` owned; both the XP spent and the bonus it drives reset to 0 on Prestige/Speed Up (see "The last tier's XP-funded tickspeed" above)
- `LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT = 0.1` — a single `consumeXpForLastTierTickspeed` call must spend at least this fraction of the XP already consumed this way (see `getLastTierXpTickspeedMinConsumption`), so repeat consumptions can't trickle in one XP at a time forever
- `LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR = 1` — the practical minimum consumption before any XP has been consumed this way, since `LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT` alone computes 0 at that point

**Byte Foundry** (see its own section below for the full mechanic):
- `INTRO_STARTING_CAPACITY = 8` — starting/current cap on the intro's "Memory" bit balance (1 Byte)
- `INTRO_CAPACITY_MULTIPLIER = 10` — "Sacrifice for 10x Capacity" multiplies capacity by this each pick (8 → 80 → 800 → 8000 → …)
- `INTRO_STARTING_TICK_SPEED_SECONDS = 1` — the Byte generator's starting delivery period, in seconds — matches `TIER_DEFINITIONS`' own per-tier `baseTickSpeedSeconds` convention (a fixed period, not a continuous rate)
- `INTRO_MIN_TICK_SPEED_SECONDS = TICK_RATE_MS / 1000` (0.1) — floor for `tickSpeedSeconds`: the live tick loop's own real-time resolution. Once "Invest for Double Production" would halve `tickSpeedSeconds` below this, it multiplies `productionMultiplier` instead — see `pickIntroProductionMilestone`
- `INTRO_PRODUCTION_MULTIPLIER_STEP = 2` — "Invest for Double Production" multiplies by this each pick — either dividing `tickSpeedSeconds` or multiplying `productionMultiplier`, whichever `INTRO_MIN_TICK_SPEED_SECONDS` currently allows; net effect is the same either way, bits/sec doubles
- `INTRO_BYTE_BASE_RATE = 1` — the Byte generator's base batch size, in bits, delivered once every `tickSpeedSeconds`, before `productionMultiplier`
- `INTRO_BYTE_COMBINE_COST = INTRO_STARTING_CAPACITY` (8) — one-time cost, in bits, to combine the first 8 tapped bits into the Byte generator
- `INTRO_BITS_PER_KILOBYTE_CONVERSION = 1000` — manual conversion rate: this many intro bits become 1 Kilobyte unit in the main game — matches Kilobytes' own real `baseCost` (1E3 Bits) in `TIER_DEFINITIONS`
- `INTRO_AUTO_INVEST_THRESHOLD = 8000` — no longer the transfer-budget/auto-trigger threshold (that's dynamic now — see `getIntroTransferBudget` in `engine.js`, tied to `getPurchaseBlockSize`). Its only remaining role is the cost cutoff for `getIntroProductionMilestoneMaxClaims` (2 claims per Invest tier strictly below 1000 Bytes' worth — 1/10/100 Bytes — 1 claim per tier from 1000 Bytes on) — kept as a named constant since 8000 bits is still a meaningful, independent boundary for that unrelated mechanic, coincidentally matching the transfer budget's own historical default (`DEFAULT_PURCHASE_BLOCK_SIZE` × 1000)
- `INTRO_CONVERSION_UNLOCK_CAPACITY = INTRO_BITS_PER_KILOBYTE_CONVERSION` (1000) — capacity threshold at which the manual convert action becomes available
- `STORAGE_BUILD_COST_MULTIPLIER = 10` — Byte Foundry Storage: a bank's build cost is this many times its own face value in bits (see `getStorageBankCost`/`buildStorageBank`) — a 1000-bit bank costs 10,000 bits to build, a 10,000-bit bank costs 100,000, and so on
- `STORAGE_BANK_LADDER_CAP = 10` — Byte Foundry Storage: how many banks can ever be built at the buildable ladder's current size before it advances ×10 to the next size (see `getStorageBankSize`) — tracked via the cumulative, never-decremented `intro.storageBanksBuiltTotal`

