# MainPage reference

Referenced from `CLAUDE.md`'s Architecture section. Read this before touching
`src/pages/MainPage/index.jsx` or its styled sub-components/layout — it's the full field-by-field
reference for the compact tier-row grid, the sticky HUD balances, the Factory view, the Firmware page
toggle, and every disclosure/badge/accessibility convention `MainPage` follows. Also covers
`ByteFoundryPage` and the two dedicated screens split out of it, `StoragePage`/`ComputePage` (see
below), since all four pages are tightly coupled around the same `game` prop and Byte Foundry
mechanic. `MainPage` is
deliberately purely game — live controls, numbers, and status text only. Every mechanic's
evergreen *explanation* (what used to live inline here as click-to-expand `InfoDetails` prose)
now lives on the separate `src/pages/InfoPage/index.jsx` ("Manual"), reachable via AppNav's Manual
item; see CLAUDE.md's Architecture section for the split. Top-level page switching lives in
`App.jsx`'s shared `components/AppNav` (Foundry → Power → Compute → Factory → Firmware → More; Manual / Releases / Settings in More) — pages
themselves take `{ game }` only and carry no Back / open-* navigation props. Storage is not a
top-level AppNav item (continuous Foundry sections). `MainPage` is only
ever rendered while the Byte Foundry gate isn't active — i.e. `state.intro.mainGameUnlocked` is
true and the player hasn't voluntarily navigated to `ByteFoundryPage` via AppNav's Foundry item —
see "Byte Foundry page" below and docs/ECONOMY_REFERENCE.md's "Byte Foundry" section.

**Byte Foundry page** (`src/pages/ByteFoundryPage/index.jsx`). The tap screen — a separate, much
simpler page from `MainPage`, sharing the same `game` prop shape (`{ state, actions, ... }` from
`useIncrementalGame`, lifted into `App.jsx` — see CLAUDE.md's Architecture section) but with no
view-tab system of its own. Unlike the old design, nothing here ever goes read-only — the page
renders identically whether reached as the mandatory gate or voluntarily; AppNav
omits Factory during the gate so there is still no escape hatch via the production screen
(More — Manual / Releases / Settings — stays reachable).

Sections, top to bottom: the shared `components/OfflineProgressNotice` (see
`docs/COMPONENTS_REFERENCE.md`), rendered right after the page title whenever the hook reports a
non-null `offlineProgress` — the Byte generator's passive production and auto-transfers already
catch up correctly during offline progress regardless of which page is active, so this page shows
the same "Resumed from sleep" notice `MainPage` does, not just a silent balance jump; a centered
`Header` with the page title (top-level navigation lives in AppNav, not here); **no** second-level
Memory | Storage tabs. Data Stream and Storage are separate, independently-boxed `StatCard`s, not
one continuous card sharing a single `Divider`: a single `DataStreamCard` (`styled(StatCard)`) holds
Data Stream's own controls, and each VISIBLE Storage pool gets its own separate `PoolCard` (also
`styled(StatCard)`) below it — see "Storage pools render as their own PoolCards" further down for
that structure.

`DataStreamCard` holds a single `FillableStatCard`
— deliberately a plain `styled.div`, not `styled(StatCard)` (nesting a second card inside
`DataStreamCard` would double-box the same region) — containing everything for that section (title,
Speed, combined balance/capacity, and bars) as one control, so the whole thing reads (and, once
interactive, taps) as one piece rather than a separate header sitting above a boxed balance tile.
Its first line is a `TitleRow`: a "Data Stream" `SectionTitle` at top-left, the combined balance in the
middle, and live Speed at top-right (the row wraps, Speed dropping to its own right-aligned line, when
a long balance leaves no room on a narrow phone). Disk status/count is not shown. An earlier
iteration rendered this header row as a separate element ABOVE the `FillableStatCard` instead of
inside it — merged together per player feedback that the two read as disconnected pieces. The tile
applies `components/Button`'s own
`progressFill` gradient directly via its `$progress` prop (`= bits / capacity`), so the tile fills
toward Capacity the same visual way every button on this page already does, and shows balance and
capacity together in the middle, centered `BalanceText` (`balance / capacity-unit`, using
`formatMemoryBalanceValue`; see "Numbers are formatted"
below — `useTrimBalanceWhenSettled` switches it to the ordinary trimmed form once its padded text is an
integer and has been unchanged for `SETTLED_BALANCE_TRIM_DELAY_MS`, 5 real seconds) — scaled into the same binary unit `capacity` picks (raw bits before the Byte generator
exists, since before that the Buffer is always exactly 8 bits/1 Byte with nothing meaningful to
denominate in yet, then B/KiB/MiB/…/QiB by 1024 each step once it does, extending
`TIER_DEFINITIONS`' own tier symbols with an "i") — plus a hidden `role="progressbar"`
(`aria-label="data stream bit balance"`). Its second line is a `CapacityBonusRow` (📦 Capacity left, a narrow tap-bonus bar centered, "+x% 👆" right — or, while no bonus is active, "⏳ time to full" (`getBufferSecondsToFull`: (capacity/rate)·e^(−a)·(e^b − e^(b·fill))/b with a = ln(MAX/100), b = ln(MAX/MIN), the integral of the log-linear fill-multiplier curve, assuming nothing else draws from the buffer) — bar and text only while a bonus is active; the fill multiplier itself is the tinted ⚡ Speed figure, see "Fill-based Speed/Bandwidth multiplier" in CLAUDE.md), — replacing an earlier corner needle-speedometer that
took too much vertical space. The production rate, shown as its EFFECTIVE value (base × fill multiplier, 3 significant digits, tinted red→blue→green) — `` `⚡ ${formatSpeedText(formatBitsInNearestUnit(rate × multiplier))}/s` `` (e.g. "⚡ 4
bits/s" below 1 Byte/sec, "⚡ 1 B/s" at/above it, "⚡ 2 KiB/s" once the rate itself crosses the next
binary-unit threshold — the SAME binary B/KiB/MiB/… ladder the balance line above it renders in) —
appears in the title row rather than a footer; Capacity appears in the row below the title (the balance line shows the balance only). There
is no segmented block-bar rate meter any more (an earlier 8-block segmented `role="progressbar"` version was replaced once the bar
itself started carrying the fill-multiplier reading). There is no separate Cache tile — the same
progress the old Cache tile showed (progress toward the next convertible Data Stream→Kilobyte unit) is
implicit in the Data Stream balance itself — there's no separate manual transfer UI any more (see
below). Before `intro.mainGameUnlocked` the tile is a plain, non-interactive `<section>`,
`aria-label="data stream balance"`; once unlocked it becomes the tap target itself, built like a pool
tile: a `DataStreamTile` div with a stretched `PoolTapButton` behind its readouts
(`onClick={actions.tapIntroBit}`, `disabled={dataStreamMultiplierCapped}` — a full Buffer stays tappable, the bonus speeds consumers,
`aria-label="ping to generate a bit"`), so the ⚡ speed can be its own button opening
`SpeedDetailsPopover` without nesting interactive elements.

A large, always-full-width tap button (`aria-label="ping to generate a bit"`, `disabled={isFull ||
dataStreamMultiplierCapped}`) calling `actions.tapIntroBit` — renders LAST on the page, after
`DataStreamCard` and every pool's `PoolCard`, since once `byteCreated`
passive production is the primary loop and tapping is a secondary/backup action; it stays exactly
as clickable either way, and never shrinks or changes size — but is removed entirely, not merely
hidden, once `intro.mainGameUnlocked` (the Data Stream tile above takes over as the tap target
instead, see above), rather than the two controls coexisting once tapping is no longer the primary
loop at all. Deliberately carries no `$progress` fill
or hidden progressbar of its own — Data Stream's own tile above already shows the identical bits/Buffer
fill, so a second meter on the tap button would just duplicate it; its `background` is set explicitly
(`theme.color.surfaceSunken`) since it doesn't get that from `progressFill`'s own gradient (which
used to double as the button's base fill). A "Compile into a
Byte" button (`aria-label="compile 8 bits into a Byte"`, calling `actions.combineIntroByte`,
`$progress` toward `INTRO_BYTE_COMBINE_COST`) shown only while `!byteCreated && bits >=
INTRO_BYTE_COMBINE_COST`. Once `byteCreated`, a single **"Upgrade Data Stream"** button
(`aria-label="upgrade data stream"`, no icon; not rendered while an upgrade is armed) consolidates the former paired Speed ×2 (Invest) and
Capacity ×2 actions into one purchase: **Capacity is the only bought progression variable** — the
button costs exactly the current capacity (a full Buffer, drained on purchase) and doubles
`intro.capacity` (`INTRO_CAPACITY_DOUBLING_STEP`). The displayed Speed is *derived* from the Speed basis (`intro.speedCapacity`, falling back to Capacity),
never purchased directly — `getDataStreamSpeedBytesPerSecond(basisBits)` returns `basisBytes ** e` B/s (`e` = `getDataStreamSpeedExponent`, 0.5 + 0.01 per unlocked Disk size beyond the first), ×2^e per Speed upgrade; once the unlocked Disk array is full the Provision Disk button is replaced by a confirm-guarded `foundry reset to unlock disk size` button (`isDiskSizeUnlockAvailable` → `actions.unlockNextDiskSize`); the separate Upgrade Speed button doubles the basis (cost = the basis) while the doubled basis fits within Capacity. The current Capacity and
derived Speed stay visible above the button on the Data Stream tile's own footer row; there is no
after-upgrade preview. `disabled={!capacityUpgradeClickable}` where `capacityUpgradeClickable =
isMemoryCapacityUpgradeArmable(state)`: a click at any fill (byte combined, not at cap, not already
running) starts the upgrade (`intro.capacityUpgradeQueued`); `tickCapacityUpgradeDrain` then pulls 100% of
base Speed from the Buffer into `intro.capacityUpgradeProgress`. While running, an inert
`UpgradeStatusTile` ("⏫ Upgrading…") sits under the Data Stream tile with a thin progress bar
(same `ThinProgressBar` as a collapsed Data Lake header; fill = progress/Capacity) plus a hidden
`progressbar` (`aria-label="data stream upgrade progress"`); there is no cancel. Upgrade Data Stream sits outside the forced priority order (see
docs/ECONOMY_REFERENCE.md).

Compute lives entirely on its own dedicated screen (`ComputePage` — see below), reached via AppNav
once revealed (`computeCoreRevealed`, `isComputeCoreConversionUnlocked(state)` — `capacity >=
INTRO_COMPUTE_CORE_UNLOCK_CAPACITY`). Cells (`computeCores`) themselves are obtained via `buyBooster`, bought
instantly from the matching Data Lake's own banked units on that pool's own `PoolCard`
(a click either buys immediately if already affordable or arms a one-shot auto-convert that finishes
the purchase automatically over subsequent ticks — see "Storage pools render as their own
PoolCards" below) — not minted
from Data Stream, and no longer via any Storage Disk deposit or live transfer (an earlier
Disk-deposit-funded Booster mechanic, and before that a manual "Claim Core" button/auto-claim
mechanic, were both superseded — see docs/ECONOMY_REFERENCE.md's "Data Lakes" section).

**Storage pools render as their own `PoolCard`s.** Each VISIBLE Storage pool
(`getVisibleStoragePoolCount(state)` — PURE Capacity-based: how many pools' own capacity-unlock
threshold the Data Stream's raw Capacity has reached, with NO disk-build dependency — see "Pool
liveness is Capacity-only" in CLAUDE.md and docs/ECONOMY_REFERENCE.md's "Byte Foundry" section)
renders its own separate `PoolCard`
(`styled(StatCard)`, `aria-label="pool {n}"`), stacked below `DataStreamCard` in ascending order —
NOT one continuous card shared across pools or with Data Stream. A pool's own title/Speed,
balance/capacity, and bars all render in ONE `PoolTile` (a `FillableStatCard` div) whose tap target is a
transparent stretched `PoolTapButton` (`aria-label="ping pool {n} staging"`, calling
`actions.tapPoolBuffer(poolIndex)`, never disabled) behind
the `PoolTileContent` readouts (`pointer-events: none`) — a `TitleRow` is the content's first line:
title "`<symbol>` Pool" (e.g. "KB Pool" — `TIER_DEFINITIONS[poolIndex - 1].symbol`, no index number
or tier name in the visible text) on the left, the
Memory buffer balance and Capacity (`balance / capacity-unit`) in a centered `BalanceText` in the middle, and Bandwidth on the right
(same as Data Stream's own tile above, including the narrow-phone wrap). Its second line is the same `CapacityBonusRow` (pool Capacity, tap bonus). While `isDataLakePoolDrainAvailable` the lake drains the buffer directly; the tile stays tappable (the tap bonus is granted regardless). The lake's title/action row also shows on a collapsed pool (`DataLakePanel section="header"`),
with a thin bar toward the next disk under the filled amount. Only ONE pool is expanded at a time by default — the
largest currently visible one (`expandedPoolIndex` local state: `null` follows the largest unlocked
pool, an explicit `0` means "all collapsed", any other value pins one specific pool) — toggled by a
`PoolTitleToggle` — the "<symbol> Pool" title alone (`aria-expanded`,
`aria-label="expand/collapse pool {n}"`), a real `<button>` that is a sibling of the stretched `PoolTapButton` (tap target) rather than nested in it, so a disabled tap never blocks it. An earlier iteration had the header in its own
separate `PoolSummaryButton` (toggling expand/collapse) ABOVE the balance tile instead of merged
into it — folded together per player feedback that the two looked like disconnected pieces rather
than one control. A still-earlier iteration also rendered a second, always-visible, non-interactive
tile here showing that pool's Data Lake fill level as "`<symbol>` Lake · NN%" — removed as redundant
with the equivalent live fill level `components/DataLakePanel`'s own `LakePoolTile` already shows
once the card is expanded (see below); the standalone copy only duplicated it a second time above
the fold. Only once expanded does the card also render that pool's own `components/DiskArrayRow`s
and its own `components/DataLakePanel` (`bare` mode) — see both below.

Storage is continuous on this same page: **Provision Disk** — the common disk-build operation —
hidden until `storageRevealed` (`isStorageUnlocked(state)` — Buffer has reached `INTRO_DISK_UNLOCK_CAPACITY`, 8,192 bits — "1 KiB" in Memory's own binary
scale, deliberately equal to pool 1's own `getPoolCapacityUnlockThresholdBits(1)` so Storage and
pool 1's card reveal simultaneously — a later gate than `revealed`'s own 8000-bit ("1,000 B") one above).
Presents only the newest unlocked size (`getPresentedDiskSize`); smaller incomplete sizes (after a Reformat) rebuild by themselves (`tickAutoProvisionLowerDiskSizes`) while the button is disabled — Storage-revealed rebuilds with a pool fill rate use the same speed/time tile as a queued build (`Rebuilding`, `{current} → {largest}`, percent of smaller-size disks done (`getLowerRebuildSummary`), ⚡ the pool's BASE Bandwidth, ⏳ the total rebuild time at that speed — for a pool not live yet the Bandwidth the pool will have once live stands in (`getProjectedPoolBandwidth`), so the time is never unknown); otherwise (Storage not revealed, or Data Stream Speed 0) the `Rebuilding {size} first · <state>` status line, where `<state>` mirrors `tickAutoProvisionLowerDiskSizes`' stall conditions — `waiting for build` (legacy `intro.diskBuild`), `waiting for earlier pool` (`isLaterPoolProvisioningLocked`), `waiting for pool` (Bandwidth 0), `waiting for buffer` (buffer ≤ `getPoolCacheReservationBits`), else `automatic` — this status (with its suffix) is always the Provision Disk button's `aria-description`, even while the speed/time tile is shown; the ⏳ is toned down (italic, prefixed `~`) whenever any remaining size's pool isn't live yet (`getLowerRebuildSummary().projected`), and so is the ⚡ (title "Projected speed" when the current size's pool isn't live). Renders as soon as the Byte exists (`intro.byteCreated`, no Storage-reveal gate — a click before pool 1 can fund a pass simply queues the build) in its own standalone `ProvisionCard` (`aria-label="Provision Disk"`, no padding — the button fills the card flush), directly below the Data Stream card (one
location regardless of which pool the offer belongs to — no per-pool copy, no fallback slot), hidden
only while `isStoragePoolRebuilding(state, diskPoolIndex)`. Upgrade Data Stream itself shows only
relative gains (current values are on the tile): `🏷️ <current Capacity (= cost)> · 📦 ×2 · ⚡ ×<speed
ratio>` (🏷️ is the game's cost icon — `COST_ICON` in `components/icons.js`, shared with Data Lake Boosters and Provision Disk) (Capacity button: `🏷️ <Capacity (= cost)> · 📦 ×2`; Speed button: `🏷️ <Speed basis (= cost)> · ⚡ ×<ratio>`, ratio = `getIntroProductionRate` at the doubled basis ÷ now ≈ ×1.68),
`📦 Max capacity` at the cap; its `aria-description` carries the cost and absolute next Capacity and Speed, and
the armed status line shows them too. Its
visible label always tracks
`getDiskSize(state)` — an independent gapless Byte power-of-ten ladder (`DISK_LADDER_BASE_SIZE_BITS` ×
`10^(n-1)`): 8000 bits/"1
KB" at level 1, then 80,000/"10 KB", then 800,000/"100 KB", then 80,000,000/"10 MB" — skipping
8,000,000/"1 MB", since `tier01`'s own cost-epoch exponent sequence skips it too — and only advances
once `DISK_ARRAY_LADDER_CAP` (9 — the array's own cache substitutes for what would have been a
10th disk) disks have ever been built at the current size (`disksBuiltTotal`,
a cumulative, never-decremented count), decoupled from tier01's own CURRENT price. The build cost
(`getDiskCost(state, capacityBits)`) is `capacityBits * getDiskProvisionPassesRequired(state,
capacityBits)` — N for the array's Nth disk (1 for its first, up to 9 for its last;
`DISK_BUILD_COST_MULTIPLIER`'s defensive 10 no longer reached), not a flat count for every disk
regardless of ordinal: a real 1 KB/8000-bit array's first disk costs 8,000 bits ("1 KB"), its last
(9th) costs 72,000 bits ("9 KB") — not the flat figure every disk in the array used to cost (see
docs/DESIGN_HISTORY.md). No separate
`BITS_PER_BYTE` factor is needed here now that `capacityBits` is already Byte-accurate (an earlier,
buggy "kilobit"-scaled version of this ladder needed one — see docs/DESIGN_HISTORY.md).

Below Build, every size from `getDiskSizesToShow(state)` renders a full interactive
`components/DiskArrayRow` (cache + disks, ascending) as continuous sections on this same screen —
not behind a Storage tab. Each disk strip always shows all `DISK_ARRAY_LADDER_CAP` (9) slots in one unbroken row.

Provisioning a disk's cost is no longer paid in one lump sum —
`provisionDisk` (`actions.provisionDisk`) ARMS the build; its cost is `getDiskProvisionPassesRequired(state, size)` PASSES of the
disk's own face-value size (`intro.diskProvisionPasses[size]`, fractional), drawn each tick from the pool buffer at the pool's
base Bandwidth × pool tap bonus (`tickQueuedDiskBuild`) — an empty buffer pauses it, progress is never lost. When the final pass is
drawn the disk completes (empty container) and the queue disarms, so only starting a NEW disk's build needs a click.

The pin-icon `QueueToggleButton` that used to sit beside the Provision Disk button
(`ProvisionDiskRow` wrapping the pair) has been removed from the page — `provisionDiskButton` now
renders the plain `Button` directly, with no wrapper. Its click handler (`handleProvisionDiskClick`) only ARMS the build: `actions.provisionDisk()` when it can start now, else `actions.queueDiskBuild()`. An armed build then draws bits from the pool buffer every tick at the pool's base Bandwidth × pool tap bonus (`tickQueuedDiskBuild`), with no further clicks. `disabled` drops affordability/priority checks — the button refuses input only while a legacy `intro.diskBuild` is in flight, the ladder is exhausted for active pools, or a lower-size rebuild is pending; clicking while already armed is an idempotent no-op. Variant/icon reflect the live state: `'smart'`/⏳ whenever queued (checked first),
else `'info'`/🏦 while turn-available (a click arms it), else `'neutral'`/🏦 (clickable to arm); `aria-label` stays anchored on "provision disk" in every one of them
so the control's identity never changes out from under assistive tech or a `getByRole` query.
`actions.clearDiskBuildQueue` remains implemented/tested with no UI control of its own — the same
posture Capacity's own `queueIntroCapacityUpgrade` still has. See docs/ECONOMY_REFERENCE.md's
"Disks" section for the full queue mechanic, and docs/DESIGN_HISTORY.md for why the first pass
replaced per-pass firing with the fixed-speed draw.

Below its own disk-array rows, each pool card renders `components/DataLakePanel` with both `bare`
and `tierIndex={poolIndex}` set (`<DataLakePanel actions={actions} state={state} bare
tierIndex={poolIndex} />` — `actions` is needed for the capacity-upgrade button, see below) — that
pool's own single Lake, not a page-wide list of every lake (an earlier layout rendered one shared
`DataLakePanel` with no `tierIndex` at the bottom of the whole page instead; each Lake now lives
inside its own pool's card, directly below that pool's disks). Instead of its own default `StatCard`
wrapper, `bare` mode renders a `BareDivider` (`hr`, `border-top` only — mirroring the visual break a
non-`bare` `DataLakePanel` gets for free from its own `StatCard` outer border) followed
directly by the lake's own block, so it reads as the last sub-section of that same `PoolCard` rather
than a second card stacked below it — a `tierIndex`-scoped lake always renders regardless of
activity (it's a permanent part of that pool now), unlike the omitted-`tierIndex` list mode (still
supported, retained for reuse/tests — no current caller uses it), which only shows a lake once it
has a nonzero deposit, at least one Booster already purchased, or its own capacity already grown
past the starting level (`getVisibleLakeTierIndexes`).

A lake's own block deliberately mirrors `PoolCard`'s own title-row-plus-disk-array shape rather than
a labelled table row — "less labels, more actual numbers," matching the rest of the page: a header
row pairs the lake's title, "`<symbol>` Lake" (e.g. "KB Lake" — the size unit is always part of the
visible name, per the fuller `"{label} Data Lake — funds {boosterLabel}"` phrase tucked into a
`title` attribute instead of crowding the compact header), with a single control in place of the old
lifetime-purchased-count text — see below for what it shows. Below that, one `LakeSizeRow` of round
`LakeSquare`s per non-empty sub-size (×1/×10/×100, smallest first) — the same disk-array visual
language `DiskArrayRow` uses for Storage's own Disks — showing every completed disk filled, plus a
live left-to-right fill (`LakeSquareFill`, driven by `getDataLakeCurrentFillSubSize`/
`getDataLakeFillBits`) on whichever ONE slot is actively filling right now; a hidden
`role="progressbar"` (`aria-label="… lake deposits"`) still exposes the lake's overall
deposited-units/capacity fraction for a11y. A dedicated `LakePoolTile` sits right below the header
row, ALWAYS visible whenever an open slot exists, reading "`<fillBits>` / `<open slot size>`" once
`isDataLakePoolReady` or a static "Locked · 0 / `<size>`" before that (deliberately keyed off
`isDataLakePoolReady`, not the lake's `isDataLakeBoosterUnlocked`/unlock state, which can diverge
for an old save — see `docs/DESIGN_HISTORY.md`), so the section never goes from entirely absent to
already-mid-fill with no feedback in between.

**The header row's control is a single "`🏷️ <next Booster cost>`" element, no bottom action row at
all** (the old separate 💧 Fill / Buy / 🔁 Auto-Manual three-control row, and the lifetime
"`<N>×  <Booster>`" counter text, are both gone — see `docs/DESIGN_HISTORY.md`'s "one-shot
Data Lake conversion" entry). The cost figure alone is self-explanatory, so no separate counter is
needed. It renders as one of four things, in priority order: (1) while
`isDataLakeAutoConvertActive` (`converting`), an inert `StatusText` label reading the same
`🏷️ <cost>` text — no longer clickable, mid-automation; (2) once the matching compute-ladder entity
is already at its own effective cap (`entityAtCap`, `!canBuy && isBoosterEntityAtCap`), the same
`🏷️ <cost>` text as a `StatusText` explaining the entity is full; (3) whenever genuinely affordable
right now (`canBuy`, `isBoosterPurchaseAvailable`) — even with Scale Out also available (e.g. right
after the buffer just filled) — a clickable `🏷️ <cost>` `ActionButton` (`aria-label="buy 1 <Booster>
from the <label> Data Lake"`) that calls `actions.startDataLakeAutoConvert(tierIndex)`, buying
immediately since the cost is already banked; (4) otherwise, IF the corresponding Storage array for
the lake's current capacity level is fully built (`upgradeAvailable`, level 0→1 needs the pool's
smallest ×1 array done, 1→2 the middle ×10 array, 2→3 the largest ×100 array), "⚡ Scale Out"
(`actions.doubleDataLakeCapacity`) claims the same slot instead — the capacity ladder itself is a
plain decade-power-of-10 step per level, not a literal doubling; the action/function name still says
"double" (unrelated to the button's own "Scale Out" label) since only the ladder's VALUES changed,
see docs/ECONOMY_REFERENCE.md's "Data Lakes" section — hidden (not merely disabled) unless that array
is actually complete, and hidden once the lake's own 1,000-unit hard cap is reached
(`isDataLakeCapacityMaxed`); (5) once unlocked (`isDataLakeBoosterUnlocked` — the matching Storage
pool has built at least one real disk) but not yet affordable, a clickable `🏷️ <cost>` `ActionButton`
(`aria-label="start converting toward 1 <Booster> from the <label> Data Lake"`) that also calls
`actions.startDataLakeAutoConvert(tierIndex)` — this time arming the one-shot `autoConvertActive`
flag rather than buying immediately, since `tickDataLakeAutoConvert` (engine.js) then automatically
draws from this pool's own buffer every tick until the cost is banked, buys exactly 1, and clears the
flag (the control flips back to state (1)'s inert label for the whole duration — "Once automated, it
will change from button to label," per the request this implements); or (6) before the lake is even
unlocked, the same `🏷️ <cost>` text as a non-interactive `StatusText`. Neither Scale Out nor the cost
control is arbitrated against the other via the forced priority order at all (removed — see
`docs/DESIGN_HISTORY.md`; array completion is Scale Out's own gate, same as the cost control's own
affordability/unlock checks). Starting a conversion is refused outright
(`isDataLakeAutoConvertStartAvailable`) once the entity is already at its own effective cap — "should
not be allowed to start if the booster slots are already full," per the request. See
docs/ECONOMY_REFERENCE.md's "Data Lakes" section (including its "One-shot auto-convert" subsection)
for the underlying mechanic, and `docs/COMPONENTS_REFERENCE.md` for `DataLakePanel`'s full contract.

There is no manual transfer-block UI any more (removed — see `docs/DESIGN_HISTORY.md`;
`isIntroConversionUnlocked`/`getIntroKilobyteConversionCost` still exist as pure, tested exports but
no longer gate or price anything rendered here). The `tickIntroAutoInvest` auto-convenience — firing
inside the shared tick loop the instant a single unit is affordable, live, unit by unit, not just
once a whole batch accumulates, capped at completing one tier01 level per call — is now the sole
path advancing `purchaseLevelProgress[tier01]` from this screen. It no longer sets
`mainGameUnlocked` itself — see `latchMainGameUnlocked` (`docs/ECONOMY_REFERENCE.md`), which flips
it the instant Storage's own capacity threshold is crossed instead. `App.jsx`'s own `showingFoundry`
render check reveals whatever page the player was last on (typically `'game'`) the instant that
flips — no button or handler needed for that transition.

Numbers are formatted via `formatMemoryBalanceValue`/`formatMemoryCapacityValue`
(`ByteFoundryPage`-local helpers, calling into `engine.js`'s own
`getMemoryUnit`/`formatMemoryAmountStable`/`formatMemoryAmount` exports): raw
bits below 1 Byte, then B/KiB/MiB/…/QiB by **1024** each step once above it (`getMemoryUnit`,
extending `TIER_DEFINITIONS`' own tier symbols with an "i" — `1 KiB = 1024 Bytes = 1.024 KB`),
floored (not rounded) at exactly 3 decimal places once converted into a binary unit — same
never-overstate rationale as `formatCurrency` in `engine.js`, so a balance never reads as a complete
unit ("1 KiB") one tick before it actually is — a display-only convention, internal state always
stores raw bits. The balance specifically renders via `formatMemoryAmountStable`/`formatDiskSizeStable`
(a pool's own buffer balance) rather than the ordinary `formatMemoryAmount`/`formatDiskSize` every
other memory-scaled reading on the page uses: the ordinary pair trims a trailing zero via
`Intl.NumberFormat`'s own default fraction-digit handling ("5.6", not "5.600"), which is fine for a
mostly-round, slow-changing figure (Capacity, Bandwidth, a Disk's own size) but would make a
BALANCE — changing nearly every tick — visibly change display width from one tick to the next purely
because a digit happened to land on zero. The stable variant always shows exactly 3 decimal places
once ≥ 1 in its unit (a true zero still renders bare, "0 <unit>") so "3.578" and "5.600" read as the
same precision instead of "3.578" and "5.6" reading like a bigger jump than actually occurred — see
`docs/DESIGN_HISTORY.md`. That stability stops mattering once a balance has settled (nothing
left to jitter against), so `useTrimBalanceWhenSettled` (`ByteFoundryPage`, one hook instance per
balance — a shared per-pool `PoolBalanceText` subcomponent for pool buffers, since a hook can't be
called a variable number of times in one render) switches BOTH the Data Stream and every pool's own
balance over to the ordinary trimmed formatter (1–2 digits) once its padded text is an integer
(all-zero decimals) and has been unchanged for `SETTLED_BALANCE_TRIM_DELAY_MS` (5 real seconds,
wall-clock — independent of the game's own tick rate), reverting instantly on any text change or any
pointer/key press. The hold-off is deliberate: a transiently integer balance never flickers into the
trimmed form. Capacity always renders in its own unit; the balance shares it unless that
would floor the balance below 1 (a bare "0.xyz" fraction), in which case the balance self-sizes into
its own finer unit instead (e.g. "30.031 KiB" alongside a "1 MiB" capacity) — only a genuinely
sub-Byte balance still falls back to a raw bit count, since neither unit ladder defines anything
smaller than a whole Byte. See `docs/ECONOMY_REFERENCE.md` and `docs/DESIGN_HISTORY.md` for the full
three-way breakdown. Every
standalone Memory-denominated cost (Sacrifice, Invest, tier01's own dynamic conversion cost)
reuses this exact binary scale via `engine.js`'s own
`formatBitsInNearestUnit = bits => formatMemoryAmount(bits, getMemoryUnit(bits, true))` — calling
`getMemoryUnit` with the cost itself (rather than a capacity paired with a balance) picks whichever
unit fits that specific amount, so a cost keeps scaling into KiB/MiB/… as it grows instead of
stopping at a fixed unit. `engine.js`'s own `formatDiskSize` export (shared by ByteFoundryPage and
StoragePage, used to name a disk's own *size* — "Build 1 KB Disk", the per-size summary chips,
StoragePage's own size labels) is a **separate, SI (1000-based)** formatter — an alias for the
internal `formatBitsInNearestSiUnit` helper, deliberately **not** the same function as
`formatBitsInNearestUnit` any more, so a disk's size never renders in Ki/Mi units even though Memory
Capacity itself now does (see docs/DESIGN_HISTORY.md for the earlier "kilobit" formatting bug this
SI scale originally fixed, back when both scales were still identical and `formatDiskSize` really
was a direct alias of `formatBitsInNearestUnit`). A disk's *size* AND its own build cost both render
through `formatDiskSize` (SI, since the cost is itself a fixed multiple of that same SI size); any
bit amount actually spent out of Memory's own binary-scaled balance renders through
`formatBitsInNearestUnit` (binary) instead.
A real Prestige resets Memory (`bits`/`productionAccumulator`) back to fresh — along with tier01's
own `purchaseLevels`/`purchaseLevelProgress` (see `purgeGame` in docs/ECONOMY_REFERENCE.md) — but
NOT the main-game-unlock gate (`mainGameUnlocked`) any more: that's now a PERMANENT, one-time-ever
latch (`latchMainGameUnlocked`), never reset by a real Prestige or a Reboot. So this page's
gate only ever reappears once, on a save's very first cycle — every cycle after that starts with
Factory already reachable, no gate replay at all. The
Byte generator itself (byteCreated/capacity/tickSpeedSeconds/productionMultiplier/
productionMilestoneTier/productionMilestoneTierClaims) and Storage (`disks`/`disksBuiltTotal`/
`diskCache`/`diskBuild`) are all permanent and carry over regardless — a disk already FULL when
Prestige fires stays full, giving the next cycle a head start.
Disk pulling (`tickDiskPull`/`tickDiskLevelOneCachePull`) is fully automatic and unconditional,
every tick, with no autobuyer gate and no persisted per-cycle toggle at all — Byte Foundry has no
proactive knowledge of Byte Factory state; it simply pulls a full, clean-slate (zero
purchase-level-progress) matching disk (or, at a tier's own level 1 with no such disk this tick,
spends that tier's pool cache directly) whenever a tier level is ready. Once unlocked, the page also
persists as a screen the player can return to at any time via AppNav's Foundry item rather than
disappearing for the rest of the cycle — and stays just as live there as on the gate itself.

**Storage page** (`src/pages/StoragePage/index.jsx`). Thin reusable every-size DiskArrayRow wrapper
kept for reuse/tests — the **primary** UI path is Foundry's continuous Memory + Disk sections
(see "Byte Foundry" section above). Not a top-level AppNav destination. Takes `{ game }`. A
  centered title `🏦 Storage` is all the page-chrome it has — **no Provision Disk button and no Memory balance
readout here**: building the next disk stays on ByteFoundryPage itself (see above).

For every size in `getDiskSizesToShow(state)` (every size ever built or currently held, plus
whatever's currently offered even at 0 built, so its goal is visible before the first one is banked —
ascending, smallest first), a `DiskSizeRow` paints size identity **inside** each cell — bit-scale
`formatCacheSize` on cache squares (e.g. `1 Kb`), Byte-scale `formatDiskSize` on disk circles
(e.g. `1 KB`). No external array header and no `"Cache"` / `"Disks"` row titles; built/full
tallies stay visual on the strips. The row branches on whether that size's array is mid-build
(`rebuilding = intro.diskBuild?.size === size`): while rebuilding, a single centered
`RebuildingText` line replaces the cache strip — `"Rebuilding <size> x <N> array - Ready in
<ceil(remainingSeconds)>s"` (`<size>` via `formatDiskSize` e.g. `1 KB`; `<N>` =
`(disksBuiltTotal[size] ?? 0) + 1`, the disk under construction) — since every IO operation against
that size (a fresh disk pull, the level-1 cache pull) is disallowed for the build's duration;
otherwise, two strips render — neither one is ever clickable, since Byte Foundry funds Byte Factory
automatically now (`tickDiskPull`/`tickDiskLevelOneCachePull`), not through a player action here:

- A `CacheBlocksRow` (`role="group"`, `aria-label="<size> read cache"`) of exactly
  `DISK_CACHE_BLOCK_COUNT` (8) `CacheBlock`s, each worth `size / DISK_CACHE_BLOCK_COUNT` bits — the
  array's always-full reserve (e.g. 1 MB → 8 × 1 Mb). Staging refills it continuously at 5× the pool's Bandwidth after a
  level-1 cache pull or new unlock (`tickDiskAutoFill`; a partly filled block shows its real fill); a full cache flushes to an empty disk over
  one cache-block production duration when no tier claim blocks. Each block shows its bit-scale
  size as an in-cell label and its own fill fraction only — a block reads **full** (`$full` — a
  raised fill) once its own share of `intro.diskCache[size]` is filled, or shows a partial/flushing
  fill while a read-cache-to-disk flush is draining it. `aria-label` is the plain `"<size> cache
  block N"` (or `"… flushing to disk"` mid-flush); `title` explains the fill/flush state only.
- A `SquaresRow` (`role="group"`, `aria-label="<size> disks"`) of exactly `DISK_ARRAY_LADDER_CAP`
  (9) `DiskSquare`s — each labeled inside with a BARE number, no unit (`formatDiskSizeBare` — the
  surrounding pool card already establishes the scale; `aria-label`/`title` keep the full
  unit-suffixed `formatDiskSize` form) — a fixed-length
  strip that **always** keeps all 9 circles on one unbroken row (circles flex-shrink; never wraps
  on mobile); in-cell labels use `0.65rem` font:
  **full** (leftmost), split into a full disk about to be auto-pulled THIS TICK
  (`isDiskPullEligible` — matching its tier's current level at zero progress) rendering
  `$pullEligible` (good/green, pulsing, `aria-label="<size> disk pulling into <tier>"`), vs any
  other full disk (blocked by partial tier progress, "too early" ahead of the tier's current level,
  or stranded past it — see `isDiskStrandedByAdvancedTier`) rendering as a plain full circle,
  `aria-label="full <size> disk"` — never blocked by the forced priority order itself (Disk Fill
  ranks highest) — **empty** (built but not yet auto-filled — a dim muted-bordered fill,
  `aria-label="empty <size> disk"`) — **not-yet-built** (rightmost, outline-only placeholder,
  `aria-label="not yet built <size> disk"`). A full square's `title` names the pull into the
  matching tier when pull-eligible, or explains why not (stranded past its tier / too early / has
  partial tier progress already) otherwise; an empty square's
  `title` is `"Built, waiting for Memory to fill it"`; a not-yet-built square's is
  `"Not yet built"`; while rebuilding (this branch doesn't render, but the
  squares' own `title` logic still accounts for it) it would read `"This array is offline while it
  rebuilds"`. A pull doesn't remove the disk or leave it permanently spent — it becomes
  empty again, re-entering the fillable pool. No under-strip ActionHint — color + `title`/`aria`
  carry pull state.

There is no pause/resume control for Disk Fill on this page, and no
`storageAutoRedeemEnabled`-style toggle (or any autobuyer gate at all) exists in state — pulling is
unconditional: `tickDiskPull` and `tickDiskLevelOneCachePull` run every tick regardless of any
tier's own autobuyer state. Filling itself (`tickDiskAutoFill`) has no UI control at all
either — it's fully automatic, every tick, no toggle: Memory first keeps every array's Cache full
(a timed 5× transfer), then flushes a full read cache into an empty disk over one cache-block
production duration when no tier claim blocks that size, smallest size first, whenever that size
isn't mid-build. This page does not show tier01's own current purchase-block progress — nothing on
either page renders it any more, now that ByteFoundryPage's manual transfer-block row (which used to
be the one place it was shown) is gone (see `docs/DESIGN_HISTORY.md`); `purchaseLevelProgress[tier01]`
is still tracked internally and still drives the disk pull/auto-convert eligibility exactly as
before, just with no dedicated progress display.

**Power page** (`src/pages/ComputePage/index.jsx`, page id `'boosters'`). Power's own dedicated
screen, split out of ByteFoundryPage — reached via AppNav once Power is revealed. Takes `{ game }`.
A centered title `⚡ Power` is the page chrome (top-level navigation lives in AppNav).

The whole page is deliberately terse — every string beyond a single-word entity label lives in a
`title`/`aria-label` instead of visible text, and every compute-ladder tier fits its own row in one
line (see issue #316's "fit every compute tier in one line ... clever symbols ... intuitive with no
or single word labels" ask). The full prose explanation of every mechanic here lives in the Manual
(`InfoPage`'s "Power" section) — this page shows live state and controls only, not descriptions.

Render order top to bottom (a top `BoostCard` with the current effect, then tier rows; the presets
live inside the selected tier):

1. Right after the header, deliberately at the TOP of the page, a `BoostTimerStack`
   (`role="group"`, `aria-label="active boost controls"`) holds one `BoostLane` per running multiplier lane
   (`getComputeBoostLanes`; Turbo / Balanced / Eco order, `aria-label="<Label> boost controls"`), each holding one
   `BoostTimerRow` per same-tier group:
   - A lane renders one row per **group** of consecutive queue entries funded by the same tier (the waiting
     entries are strongest-tier-first; the running head can be weaker), so boosts covering a different set of Factory tiers than the running one are shown
     separately: the first row is the running group, further rows are waiting groups (dimmed, time = their full
     duration). All three side controls share one fixed width and rows without a button carry a same-width spacer,
     so every bar lines up.
   - Left (LAST row of the lane): **Pop** (`aria-label="pop one queued <Label> compute boost"`, `↩`, no
     confirmation, `actions.reclaimComputeBoost(type)`) while `canReclaimComputeBoost(state, type)` (a boost waits
     behind the running one); otherwise **Forfeit** (`aria-label="forfeit the <Label> compute boost with no refund"`,
     `✕`, `window.confirm` first, `actions.forfeitComputeBoost(type)`).
   - Middle: a `TimerBar` (`aria-label="active <Label> compute boost"` — `queued <Label> compute boost <tiers>` on waiting rows —, a 3-column grid so the centre stays
     centred) whose fill is the group's remaining time over `count × duration` (a waiting group is full): left the boost count (`<N>x`, always shown), centre
     `"<covered Factory tiers> <icon> ×<multiplier>"` (e.g. `KB–GB 💥 ×20`), right the countdown; the full
     sentence lives in its `title`.
   - Right (FIRST row only): **Stack** (`aria-label="stack the <Label> compute boost"`, `+`,
     `disabled={!isStackComputeBoostTurnAvailable(state, type)}`, `actions.stackComputeBoost(type)`).
   `MainPage`'s tier details show a read-only line (`getComputeBoostDescription(intro, tierIndex)`) with that
   tier's own summed multiplier and only the lanes covering it.
   With no boost active, the card instead shows "No boost running" (no prompt: one tier is ALWAYS selected).
2. The Boost presets (`boostPresets`: `ArmedStatusText` + `BoostRow`) render INSIDE the one selected
   tier block (3), BELOW that tier's merge / charge row — only one tier shows them at a time. The selection can be
   switched by clicking another tier but never cleared (no re-click collapse, no outside-click deselect); on arrival
   it is the highest tier whose charge is automated, else the active boost's own tier, else Cells. The 3 preset buttons share the row equally
   (`flex: 1 1 0`).
   Before `intro.computeMergePageUnlocked` (no tier rows yet) they render in the top card for Cells:
   The timer bar / idle status line live above the (pre-merge-chain) `BoostCard`. Auto Boost has no purchase: it is automatic per tier (`autoBoostFromTier`) once any tier's charge is automated, and Power pre-selects the highest automated tier on arrival; its on/off Switch (`intro.computeAutoBoostEnabled`, `setComputeAutoBoostEnabled`) and its full-width preset picker (`aria-label="auto boost preference"`) live on Firmware → Automation → Power Automation. Firmware reveals (`isPerksPageRevealed`) on the first Prestige OR as soon as any Auto-charge boundary is bought, so these controls are never unreachable; Power carries none of them.
   (a `<section aria-label="boost">`, no visible heading); the tier list below it has none either.
   a. An `ArmedStatusText` line (`"1 <symbol> → <KB–Last Factory tier symbol>"` — no held count, the tier's slot dots already show it; full sentence in its `title`) naming whichever compute-ladder tier is currently armed —
      local component state (`selectedBoostTierIndex`, set by clicking a tier row — see 3),
      initialized on arrival to the first running lane's head tier, else none; always Cells (tier 1) before `intro.computeMergePageUnlocked`, since it's the only
      tier that can hold a balance that early. Clicking a different tier mid-boost arms a
      new boost (it queues or runs in parallel); each timer bar's Stack and Pop describe its own lane, not the armed tier. The row
      highlight (`aria-pressed`) tracks `armedTierIndex`.
   b. A `BoostRow` (`role="group"`, `aria-label="compute boost"`) of the 3 Compute Boost preset
      buttons, each a small `CompactButton` (`variant="prestige"`,
      `aria-label="activate <type> compute boost"`, visible label `"<icon> ×<multiplier> · <duration>"` computed
      for the CURRENTLY ARMED tier via `getComputeBoostTierMultiplier(boostType, armedTierIndex)` —
      e.g. `"💥 ×20 · 10m"` for Turbo (`formatPresetDuration` drops a zero trailing unit) — the preset
      name itself lives only in `title`). A preset whose multiplier already runs becomes a **queue** button
      (`aria-label="queue <type> compute boost"`, label unchanged); otherwise it is
      `aria-label="activate <type> compute boost"`. Either way it calls
      `actions.activateComputeBoost(boostType, armedTierIndex)` with no confirmation (a different multiplier runs
      in parallel and adds up; the same one queues behind the running boost, strongest tier first).
      Every preset
      also folds in the forced priority order (disabled while Disk Fill / Provision Disk outranks
      Compute, `title` naming which to take first).
3. THEN, below the `BoostCard`, the page branches on `intro.computeMergePageUnlocked` (a
   permanent, one-time reveal latch — see `docs/ECONOMY_REFERENCE.md`'s "Byte Foundry" step 9 —
   that flips the first time `intro.computeCoresEverEarned`, a lifetime counter never decremented by
   spending or merging, ever reaches 8):

   - **Before unlocked:** just a `StatusText` line with the current `intro.computeCores`/
     `intro.computeNodes` counts as two symbol-prefixed fractions (`"⬡ N/10 · 🔗 N/10"`).
   - **Once unlocked:** TWO rows per compute-ladder entity Cell through Fusion (issues
     #321/#326), each pair wrapped in a `TierBlock` inside a `TierBlocksGroup`
     (`aria-label="compute entities"`), driven off an `ENTITY_ROWS` array (10 entries, in the same
     Cell-through-Fusion order `COMPUTE_BOOST_TIER_FIELDS` in `layers.js` uses, so a row's
     array index + 1 IS its Boost `tierIndex`).
     - **Row 1** (`TierHeaderRow`): a `TierSelectButton` (its own clickable `<button>`) wrapping the
       tier's symbol (`TierSymbol`, decorative, `aria-hidden`) + label (`TierLabel`, e.g. `"Clusters"`; the
       `n/10` count is a `VisuallyHidden` span, the dots carry it visually) + a leading `SelectMarker`
       (filled dot while armed) + a `SlotsRow` (`role="group"`, `aria-label="<Label> slots"`) of `COMPUTE_ENTITY_CAP`
       (10) `NormalSlot` squares — both the label and the slots read off `primaryHeld =
       min(count, COMPUTE_ENTITY_CAP)`, not the raw entity count, so this row always reads
       `min(held, 10)/10` and never overflows past "10/10" once auto-merge is unlocked and the
       entity has grown into its own reserve (the "extra" shows up in row 2's `ReserveSlotsRow`
       instead — see below) — the same discrete-square convention `StoragePage`'s own `DiskSquare`
       uses, just non-interactive (a plain status square, not a button). Clicking `TierSelectButton`
       toggles
       `selectedBoostTierIndex` (local component state) to select/collapse that tier — the selected
       block hosts the presets (2); the selected and active-boost tiers always render even if
       otherwise locked — highlighted
       (`$selected`/`aria-pressed`, plus a highlighted `TierBlock` border) while armed.
     - **Row 2** (`TierMergeRow`) is progressively disclosed (`showDetail`): rendered only for the
       armed tier, or when that tier is merging, a merge is startable/possible, reserve slots hold
       tokens, or (pre-auto) Auto-charge unlock progress is above 0 — otherwise the tier is one line.
       For every tier except the last (Fusion, no row 2 at all —
       see issue #280's "Out of scope" — though its row 1 is still Boost-selectable, the only place
       a Fusion has any use at all):
       - **Before that boundary's auto-charge is unlocked:** an instant Charge up button (`TierActionButton`,
         `flex: 1 1 0; width: 100%` — fills exactly half the row, the same "two equal-width buttons"
         look `MainPage`'s own tier-row Buy/Upgrade pair uses, rather than a small icon-only square —
         `variant="prestige"`, visible content "<input symbol> 8→1 <output symbol>" (e.g. ⬡ 8→1 🔗), `aria-label` spelling out the full action
         e.g. "charge up 8 batteries into 1 pack") — enabled once `COMPUTE_MERGE_RATIO` (8) of the
         tier is held and the produced tier is under its effective cap (`getComputeFieldEffectiveCap` — 18
         once that tier's own auto-charge is unlocked), calling the matching
         `game.actions.mergeCompute*Into*` action — plus an Unlock Auto-charge button filling the
         other half (`TierActionButton`, `variant="info"`, `$progress` set to the live percentage
         toward its own unlock cost — the same `Button` `progressFill` mechanic Factory's own Buy
         buttons use for cost-block progress — visible content `` "🤖 <held>/<COMPUTE_ENTITY_CAP>" ``
         instead of a bare "🤖 Auto", so the button is self-explanatory the same way a Factory Buy
         button is; `aria-label="unlock the Charger for <…> into <…>"`) — enabled once
         `COMPUTE_ENTITY_CAP` (10) of the produced tier is held, calling the matching
         `game.actions.enableAutoMerge*` action.
       - **Once unlocked:** a `ReserveSlotsRow` — a single `<button>` wrapping `COMPUTE_MERGE_RESERVE_CAP`
         (8) `ReserveSlot` squares — reading `getComputeReserveHeld(state, tierIndex)` (0..8), NOT an
         atomic empty/full toggle: a squares fills in one at a time as the entity's own held count
         keeps growing past its primary 10 (via continued Booster purchases or a lower-tier charge),
         up to `COMPUTE_ENTITY_AUTO_MERGE_CAP` (18) total held; while a charge is actually in flight
         the reserve instead reads as fully committed regardless of the live count (which has by then
         dropped back toward 10 and may be accumulating the next batch) —
The row is display-only: an explicit **⚡ Charge** button beside it
         (`aria-label` "charge <tier>: move units down one per second, then merge 8 into 1 <output>",
         label `⚡ Charge`, `⏳ n/8` (Charger fill) while running) calls `actions.startComputeCharge(boundaryIndex)`;
         enabled per `isComputeChargeAvailable` (Auto-charge bought, ≥ `COMPUTE_MERGE_RATIO` (8) held, no
         timed merge or charge running, output has room). While charging the top row dims one slot per
         transferred unit and the bottom row fills. `aria-label`: "<Tier> charger, auto-charge in progress, <time> left"
         while an automatic charge runs, else "<Tier> charger, N/8 filled" (the bottom row is called the **Charger**). While an automatic charge is in
         flight, a `MergeCountdown` span (`formatOfflineDuration` of the remaining seconds) renders
         inline with the filled slots; `aria-label`/`title` both spell out the remaining time and the
         live `<reserveHeld>/COMPUTE_MERGE_RESERVE_CAP` filled count. There is
         no merge-duration upgrade button (removed, #755).

     Nothing spends a Megacomputer beyond funding a Boost — see issue #280's "Out of scope".
     "Compute" names the page/feature only — no entity label carries a "Compute" prefix.

- **Owned vs. level.** `Owned` (current amount, drives production) is its own figure. `Purchased`
  (lifetime buy count, still incremented on every purchase for display/back-compat purposes, but no
  longer used to derive cost/production scaling — see docs/ECONOMY_REFERENCE.md) has no separate cell.
  A tier's current-level cursor and its progress toward completing it are tracked directly in state
  (`state.purchaseLevels[tierId]`, 1-indexed, and `state.purchaseLevelProgress[tierId]`, see
  docs/ECONOMY_REFERENCE.md) rather than derived from `purchased` via division — completing a level means
  buying `getPurchaseBlockSize(state)` pieces of it (a value that can grow over a run, see "Economy
  model"). Cost-block progress is no longer a `+n/8` string on the Buy button — it lives on the
  button as the dual-tone fill (`$progress` / `$secondaryProgress`) plus a `VisuallyHidden`
  `role="progressbar"` and the Buy `aria-label` (`N of {blockSize} purchased toward the next`).
  Buy max mode is the exception: while a click would buy N full levels the icon slot shows `+N`
  (see "Buy button" below). The cost label itself (`BuyButtonCostLabel`, a `styled(ButtonLabel)`) is
  left-aligned rather than centered, and both it and the icon slot (`BuyButtonIcon`) are pinned to a
  fixed half of the button's width — so every tier row's cost figure starts at the same x position
  (the button's horizontal center) regardless of digit count, instead of drifting as the cost
  string's length changes. This scoped pair lives only in `MainPage/index.jsx` and doesn't affect
  the shared `Button`/`ButtonIcon`/`ButtonLabel` components used elsewhere in the app (Prestige,
  Reset, Firmware, …), which keep their default fixed-icon/centered-label layout.
- **Tier name display.** The tier row heading (`TierName`, a `styled.h3`) and the Firmware page's
  per-tier row label both render `tier.symbol` (e.g. `B`, `KB`) as the visible text, not the full
  `tier.name` — a decluttering choice, since the compact symbol already appears throughout the row
  (cost/production strings via `RESOURCE_SYMBOL`) and the full name would be redundant clutter at this
  density. The full name isn't dropped: `TierNameLabel` wraps a `<VisuallyHidden>{tier.name}</VisuallyHidden>`
  ahead of an `aria-hidden="true"` span holding the visible symbol, so the heading's accessible name is
  still the tier's full name (unchanged for screen-reader heading navigation) even though sighted users
  only see the glyph; a `title={tier.name}` on the same element gives sighted mouse users an equivalent
  hover tooltip. Every other `tier.name` usage in this file (row `aria-label`s, button `aria-label`s/
  `title`s, disclosure prose) is unaffected — it's only these two visible-label render sites that switch
  to the symbol.
- **Balances (top HUD).** Money (rendered via `MoneyHero` — see "Money hero + byte-power / Prestige progress"
  below for its own `formatMoneyBalance` formatting, distinct from every other Money figure on this
  page) and (once `!isFirstRun`) the Prestige Point balance are the only top-of-page blocks besides
  `Header` that use a centered `CenteredCard`
  (`styled(StatCard)`). Both are wrapped in a sticky `StickyBalances` container (background
  `theme.color.page`, matching the page ground so scrolled tier rows never show through the gap
  between the two cards): once scrolled past their normal position they pin to the viewport top and
  compress into a compact side-by-side bar, detected via an IntersectionObserver on a zero-height
  `BalancesSentinel` (falls back to always-expanded when IntersectionObserver is unavailable, e.g.
  jsdom); the stick position drops below `TopPurgeBar` when it's showing, by that bar's own
  live-measured height (`topPurgeBarHeight`, see below) rather than a guessed constant, to avoid
  underlap. There is no aggregate `+X/sec` line — each tier row's own `+X` figure is the per-tier
  replacement. In the compressed side-by-side layout, `CenteredCard`'s `align-items: center` (needed
  so its content centers when expanded) would otherwise let a flex-column child shrink-wrap to its own
  full content width instead of the card's allotted half-share — silently defeating the `overflow:
  hidden`/`text-overflow: ellipsis` truncation meant to keep a long balance or PP status string from
  visually spilling into the neighboring card. `Money` and the status `<p>` are both given an explicit
  `width: 100%` in the compressed styles specifically to pin them to the card's actual width so that
  truncation has something to truncate against (this selector matches `MoneyHero` too, below, since it
  extends `Money` and so still carries `Money`'s own generated class on the same DOM node). This
  compact PP display shows the production speed bonus once unlocked (10 Purges) (`formatBonusOrMultiplier` — a
  percentage below +100%, an `"Nx"` multiplier at/above it, see "Percentages vs. multipliers" below),
  but — being always-visible, sticky chrome rather than an expandable disclosure — omits the "unlocks at
  10 Purges" caveat before the threshold; that fuller wording used to also show in the bottom
  `PrestigeCard`'s expandable description before that whole card was removed (see "Prestige and the
  Googol freeze" below) as purely informational and redundant with this button. Once Prestige is
  actually available (`canPurge`, i.e. Money `>= PURGE_THRESHOLD`), the PP display card itself doubles as a
  Prestige button — the whole card gets `role="button"`, `tabIndex={0}`, an Enter/Space `onKeyDown`
  handler, `onClick={actions.purge}`, and a `title` ("Awards Prestige Points and resets your
  resources", the same wording used on every other Prestige button), driven by a `$actionable` prop on
  `CenteredCard` (cursor/hover/focus-visible styling only — its outline color is `theme.color.warn`, the
  same "prestige gold" token `Button`'s own `prestige` variant resolves to — no visible border/color
  change otherwise, since the disabled/enabled convention used elsewhere in the app relies on button
  `color`, which this plain `<section>` doesn't have). It's an additional, optional way to trigger
  Prestige alongside the `TopPurgeBar`/`FullScreenOverlay` buttons. Before `canPurge`, none of
  these props are set, so the card stays a plain, non-interactive display exactly as before. The Money
  display card never gets `$actionable` — only the PP display can trigger Prestige.
- **Money hero + byte-power / Prestige progress.** The Money `CenteredCard` renders a `MoneyHero`
  (`styled(Money)`, sized at `theme.type.scale.hero`) rather than plain `Money`, and carries `$raised`
  (the `surfaceRaised` elevation tier `StatCard` already supports) so it reads as the HUD's dominant,
  elevated element — Prestige Points, by contrast, render in a `PpHeaderCard` (`styled(CenteredCard)`
  with `box-shadow: none` and tighter padding), a deliberately flattened, visually subordinate "header
  line" beneath it rather than a second card of equal weight; the two sit in `StickyBalances`'
  now-tighter `0.6rem` uncompressed gap (was `0.85rem`) so they read as one connected HUD block rather
  than two separate cards. `MoneyHero`'s `font-family` is `theme.font.body` (Inter), not
  `theme.font.display` (Space Grotesk, used for the page wordmark/headings) — an earlier version used
  the display font here, but its more stylized, geometric letterforms read worse for a large numeric
  balance than Inter's tabular figures; the hero treatment is about size/elevation, not typeface.
  `MoneyHero`'s own content is `formatMoneyBalance(state.resources[MONEY_ID])` (`engine.js`), NOT
  `formatCurrency` — the only *headline* balance readout on this page that differs: below
  `MONEY_BYTES_DISPLAY_THRESHOLD` (8000 Bits, exactly 1000 Bytes) it's byte-for-byte identical to
  `formatCurrency`'s own Bits display, but at/above that threshold it floors the balance, divides by
  `BITS_PER_BYTE`, and renders the result as whole Bytes with a trailing `" B"` (reusing
  `formatCurrency`'s own exponential-notation threshold once converted) — a more natural headline
  figure than an ever-growing raw bit count once there's at least a full Byte's worth to show. Once
  those two strings differ, a small `BitsBalance` line (`aria-label="balance in bits: …"`,
  `theme.color.textMuted`, `theme.type.scale.sm`, `line-height: 1`) shows the exact Bits via
  `formatCurrency` — absolutely positioned in the existing gap between the hero and the segment
  bar (`MoneyHeroGroup` is `position: relative`; `BitsBalance` is `top: 100%` with `margin-top:
  0.1rem` and `pointer-events: none`), so it adds no Factory header height — not `role="status"`,
  which would live-announce every tick — suppressed while `balancesCompressed`, and omitted below
  the threshold so it isn't a duplicate of the Bits headline. Visibility is
  `formatMoneyBalance !== formatCurrency`, not a hardcoded 8000, so it stays in lockstep with the
  headline switch. Every other `formatCurrency` call on this page —
  tier costs/production, the global tickspeed cost, the `FullScreenOverlay`'s "You've reached…"
  line, the Buy button's cost label — is unaffected and still shows raw Bits, its actual
  priced/spent denomination. Beneath the hero (`BytePowerSegments` `margin-top: 0.5rem`; the Bits
  overlay sits in that gap plus StatCard's uncompressed `0.6rem` gap and does not push the bar
  down; suppressed while `balancesCompressed`, since the compact sticky bar has no room for it),
  an 8-segment
  `BytePowerSegments` bar shows progress toward the next power-of-ten
  Bytes via `getNextBytePowerProgressFraction` (Bits toward `nextPowerBytes × BITS_PER_BYTE`; each
  segment is 12.5% and fills progressively within that band — e.g. 5e7 Bytes → 4/8 filled). Paired
  with a `VisuallyHidden role="progressbar"` (`aria-label="progress toward the next power of ten
  Bytes"`). Prestige progress no longer lives in this card: a separate `PurgeProgressBar` is
  pinned via `position: fixed` just above `AppNav` (`bottom: APP_NAV_BOTTOM_PAD`, imported from
  `components/AppNav`), always visible regardless of scroll position — `RootDiv`'s own bottom
  padding reserves a fixed `PURGE_PROGRESS_BAR_HEIGHT` (2.5rem, single-line, never wraps) so
  page content never scrolls out from underneath it. Its `PurgeProgressTrack` renders the
  `"N% to Purge"` label (`PurgeProgressLabel`) INSIDE the bar itself, centered over a
  `progressFill` gradient (imported from `components/Button`, `$progressColor:
  theme.color.accent`) — the same low-alpha progress-fill convention the Buy/Upgrade buttons use
  for their own cost-progress fills, already contrast-validated for `theme.color.text` on top of
  it (see `tokens.contrast.test.js`) — rather than a separate label rendered below a solid fill
  bar. Its own `VisuallyHidden role="progressbar"` reuses `getPurgePercent`.
- **HUD-scoped muted/accent text.** The PP header line's "N PP" figure renders via `HudMutedText`/
  `HudGoldText` — a fork of the app-wide `MutedText` (still hardcoded `#a3a3a3`, still used by
  `TierList`/`ScaleUpCard`/`GlobalTickspeedCard`) — token-driven
  (`theme.color.textMuted`/`theme.color.warn`) so this HUD region's own AA audit is meaningful without
  migrating those other regions out of turn (tier rows in #138; prestige surfaces below in #139).
  `HudGoldText` is sized at `1.25em`, not `1.1em`: `theme.color.warn` against the light theme's white
  surface measures roughly 3.6:1 — below the 4.5:1 AA floor for normal text — but a `styled.b` renders
  bold by default, and WCAG's bold-text AA floor drops to 3:1 once the text is also >=14pt (18.66px);
  1.1em (17.6px against the 16px root) fell just short of that threshold, so it's sized up to clear it
  with margin. `Header`'s own text color is also token-driven as part of this same pass. The offline
  notice's own body text/Dismiss button styling now lives in `components/OfflineProgressNotice` (see
  below and `docs/COMPONENTS_REFERENCE.md`), not in this file — it uses its own token-driven
  `NoticeText` rather than `HudMutedText`, since it's shared with `ByteFoundryPage` too.
- **Money balance click-to-expand global multipliers.** The Money `CenteredCard` (`aria-label="money
  display"`) is always clickable — `role="button"`, `tabIndex={0}`, an Enter/Space `onKeyDown` handler,
  and `onClick` toggling a local `showGlobalMultipliers` boolean (plain `useState`, not persisted/reset
  by `handleResetClick`, same convention as `openTierDetailIds`) — via `MoneyHeroToggle` (wrapping only the balance figure; carries `aria-label="money display"`, cursor/hover and a
  `theme.color.accent` focus-visible outline) — the rest of the card is not a trigger. Expanding it renders a `GlobalMultipliersList` (`<ul>`, left-aligned to override
  `CenteredCard`'s own `text-align: center`, same technique `FullScreenCard`'s own `ul` already uses;
  text color `theme.color.textMuted`) listing every *global*
  (not per-tier) production multiplier and its current effect: the Prestige speed bonus (once
  `!isFirstRun`), Scale Up, Tickspeed, and Overclock — each gated on the same
  reveal/`everRevealed` flag its own card already uses (so a not-yet-relevant multiplier doesn't appear
  here before its own card would show it either), reading either its live effect (e.g. "2x production
  speed from 100 Purges", "2 activations; multiplier varies by tier", "+1% faster ticks on every tier", "Tickspeed upgrade's per-level rate is now 1.21% (was 1%) from level 2") or a "not yet
  unlocked/activated/active" status line when revealed but not yet active (Prestige speed bonus:
  "unlocks at 10 Purges (N so far)"). The
  per-tier purchase milestone multiplier (`getPurchaseMilestoneMultiplier`) is deliberately not listed
  here — it's per-tier, not global, and already shown in each tier row's own Details disclosure. The
  list is suppressed entirely (not merely restyled) while `StickyBalances` is in its compressed
  side-by-side form (`showGlobalMultipliers && !balancesCompressed`), since a multi-line breakdown
  would overflow that compact bar; the card itself and its toggle state stay unaffected — expanding
  again once scrolled back to the uncompressed layout shows it immediately with no re-click needed.
- **No description prose on this page.** Every mechanic's evergreen explanation (what used to live
  inline as `InfoDetails` disclosure bodies) moved to `InfoPage` (see the file header note above).
  Headings with nothing left to show (the page `Header`'s `<h1>`, the Tier
  Autobuyers category's old shared "How these controls work" panel, Firmware → Automation's Tier
  Autobuyer Unlocks category) are now plain, non-interactive text — there's no click target because
  there's nothing to reveal. Each Factory feature card (`GlobalTickspeedCard` / Restage / `ScaleUpCard` /
  `OverclockCard`) wraps its `<h2>` in a `Disclosure` (`styled.details`/`<summary>`, collapsed by default,
  the heading itself the only way to *open* it — no separate visible "expand" affordance). The body is
  always present (an unclaimed/inactive line before first use, then the live status): Clock Speed's
  `+N% faster ticks on every tier.` (or "Not active yet…"), Restage's XP multiplier, Scale Up's reset
  + doubling line, Overclock's current per-level rate (or "Not claimed yet…") — see "Scale Up and
  Overclock cards" above. Each starts collapsed until the player clicks that heading.
  Only the heading (native `<summary>` toggle) opens or closes it — clicking the revealed status line does nothing. Each card's own
  action button sits *outside* its `Disclosure` as a sibling, so clicking Buy/Upgrade/Overclock
  never touches the disclosure. None of these is prose about *how* the mechanic works, only
  *what its current numbers are*.
- **Page title.** The MainPage header is `<h1>Byte Factory</h1>` (screen name; AppNav short label **Factory** — not the game name
  “Tens”). Top-level destinations (Foundry → Power → Compute → Factory → Firmware → More) live in
  `App.jsx`'s shared `AppNav`, not as header buttons here.
- **Buy button.** Manual Buy always grabs as many units as are currently affordable up to the current
  level's cost-block boundary (`getTierAffordableQuantity`/`buyTierQuantity`, capped against
  `getPurchaseBlockSize(state)`). The one player-facing control over this is **Buy max mode**
  (`components/BuyMaxToggle`, rendered only on Firmware → ✦ Prestige once `isBuyMaxUnlocked`): while on, a click that can afford at least one FULL level
  from zero progress buys every such level (`buyTierMaxLevels`) and the button previews it as
  `+N` with the summed cost (`getTierMaxLevelsPreview`; aria-label `Buy N full level(s) for …`);
  otherwise the button keeps the normal single-level text and behavior below. Clock Speed, tier tickspeed,
  Compression, Auto Purge and Flops buttons keep their single-level cost text but buy every
  affordable level per click in that mode (`repeatPurchaseMax`). Renders its cost-block progress as an
  on-button gradient fill via `Button`'s `$progress`/`$secondaryProgress` props (green = units already
  bought this level, amber = units affordable now but not yet bought). Prestige gets the same single-tone fill
  treatment (spendable ÷ cost, or `purgeProgressPercent`), and both pulse (`$pulse`) when
  actionable. Every PP-spending button (per-tier speed upgrades, Auto Scale Up, Unlock Speed Bonus,
  Auto Purge — all on the Firmware page) carries the same single-tone fill (unspent PP ÷ that
  button's cost, `ppProgressPercent`), each nesting a `VisuallyHidden` `role="progressbar"`
  (`aria-valuenow` = PP balance capped at cost, `aria-valuemax` = cost).
- **Compact labels.** Buy/Prestige/Reset render compact visible text — an icon in place of the action
  word (🛒 Buy, ✦ Prestige, ↺ Reset) plus the cost, and (via `formatCost`) the paying tier's short
  `RESOURCE_SYMBOL` (e.g. `Ks`) instead of its full name — while each button's `aria-label` carries the
  full descriptive sentence (`"Buy ×10 for $100"`, `"Prestige (requires 1 Googol Money)"`, `"Reset
  game"`, …) used by assistive tech and `getByRole('button', { name })` tests. Buy's icon slot is
  otherwise empty except in Buy max mode, where it carries `+N` full levels (see "Owned vs. level"
  above); ordinary cost-block progress is the fill + hidden progressbar, not `+n/8` text.

**Factory view (no second-level tabs).** `MainPage` renders only the tier ladder and its cards
(`GlobalTickspeedCard`, `TierList`, `ScaleUpCard`, `OverclockCard`) — it no longer has a tab bar or any
PP-spending control. Its sticky Money/PP balances stay; the speed-bonus breakdown points at "Firmware →
Prestige" while the bonus is locked. Every PP purchase, every free autobuyer milestone, Buy max, and every
automation pause toggle live on the separate **Firmware** page (below). Releases / Reboot status live on
`MilestonesPage` (AppNav → More). Full-save Reset lives only under More → Settings → Danger zone.

**Firmware page (`pages/PerksPage`).** Its own AppNav destination (page id `'perks'`, item `open firmware`, 🔧,
between Factory and More), shown once `isPerksPageRevealed` (= `isBuyMaxUnlocked`: first Prestige or
Reboot) and lit by `getNavAttention().perks` (`hasAffordablePpUpgrade` — no longer part of Factory's
attention). Header shows the spendable PP (`aria-label="purge points display"`). Two **icon-only**
tabs (`role="tablist"`, `aria-label="perks view"`; visible text is just the glyph, the full name is in
`aria-label`/`title`), defaulting to Automation and reset to it by `focusNonce` on each AppNav visit.
Rows are grouped **by feature, not by purchase kind** — an automation's unlock, pause toggle and speed
chain are one row (they used to be split across Unlocks / Upgrades / Toggles tabs; see
`docs/DESIGN_HISTORY.md`):
- 🤖 **Automation** (`open automation`, `aria-label="automation perks page"`) — every automation as one
  compact `AutomationRow` **cell** in a `CellGrid`, laid out for the capped end state: a maxed
  automation is a single line, label + Switch, nothing else (its interval moves to the cell's `title`).
  Before the cap the head also carries a terse inline interval (`InlineMeta`, `formatIntervalShort`:
  `64s`, `2.9s`, `212ms`; a tier autobuyer at the 10 ms floor shows only its bulk `×N`, up to 1024) —
  never its own line — and (tier / Flops cells) the cell grows one line downward for a full-width ⏫ speed upgrade (visible text is the cost only — the
  doubling to `M/buy` is in its `aria-label`/`title`; every tier autobuyer / tier tickspeed autobuyer
  chain starts at 100 PP). Locked: a 🔒
  `MilestoneBadge` in the head (`"<subject> unlocks at <unit> N"` + hidden progressbar) or a 🔓 PP unlock button (full-width below the head in narrow cells, inline for global ones) (`"Enable <name> for N Purge Points"`). The Switch (`aria-pressed`, `aria-label`
  e.g. `"Auto Scale Up automation"`, `"<tier>'s autobuyer"`) sits at the head's right; the status is
  `"<name> active|paused"` (`role="img"`). Tier autobuyers: one `TierPair` card per tier (`aria-label="<tier> automation"`, the tier's Factory
  accent stripe, grid `1.9rem | 1fr | 1fr`) = tier symbol, then the ⚙ tickspeed autobuyer half (left — where the
  Factory row's tickspeed button sits) and the 🤖 autobuyer half (right — where Buy sits); each half is a
  `bare` `$narrow` `AutomationRow`, so with both capped a tier is one line. Flops cells are `$narrow`
  (`minmax(4.75rem, 1fr)` → three-up at 320px; label = tier **symbol** `KB`/`MF`, full name hidden +
  `title`; 0.88em font, Switch `zoom: 0.85`, button glyph hidden and the cost wraps instead of ellipsizing); global cells are
  `minmax(15rem, 1fr)` (one per row on a phone, two-up wider) and pass `inlineAction`, so their
  upgrade/unlock button (glyph hidden, colour-coded) ends the head line — one line whenever it fits; the
  head wraps (`CellHead $wrap`) so a very long cost drops the button to its own line rather than
  ellipsizing the name. Categories: *Global Automation* (cells
  `"<name> row"`, Auto Clock Speed → Auto Restage → Auto Scale Up → Auto Overclock → Auto Purge; Restage
  and Scale Up both need Clock Speed, Overclock needs both, Purge needs Overclock — engine-enforced),
  *Tier Autobuyers* (all ten tiers always listed; halves
  `"<tier> tickspeed autobuyer"` / `"<tier> autobuyer"`), *Power Automation* (once any tier's Auto-charge is bought on Power: an `auto-charge row` pause Switch — `computeAutoChargeEnabled` — plus an `auto boost row` Switch and the full-width Boost preset picker), *Compute Autobuyers* (Era milestones, once the Flops page is unlocked; no speed chain).
  Each milestone appears only here — `MilestonesPage` doesn't repeat them.
- ✦ **Prestige** (`open prestige`, `aria-label="prestige perks page"`) — perks that stand alone:
  *Purge Points* (Compression leveled upgrade; Overflow mode, locked until Auto Purge's interval ≤
  `OVERFLOW_MODE_MAX_INTERVAL_SECONDS`) and *Purchasing* (Buy max, `components/BuyMaxToggle`).
Firmware never shows level numbers (only intervals, `N/buy` and costs). Global-automation and Prestige
labels are `<RowIcon>` (fixed-width icon cell) + name; each `TierPair` card shows the tier symbol
once, its halves a ⚙/🤖 icon; Flops cells show the tier symbol (their category heading names the kind). Every automation is named
`Auto <feature>` (no hyphen) in every accessible name; on Firmware the *visible* global/Booster label drops
the redundant `Auto` (`Speed Up`, `Restage`, …, `Boost`) since the category heading already says it. Factory's Clock Speed / Scale Up / Overclock cards share
`featureCard(accent)` (neutral border + 3px left accent stripe, 1rem heading); Factory carries no
"Auto" labels — automation status and toggles live only on Firmware.
Tab dots: Automation `automation perk available` (`hasAffordableAutomationPerk`: an automation unlock
or Auto Purge speed level), Prestige `prestige perk available` (`hasAffordablePrestigePerk`:
Compression). Every PP button keeps the shared live
progress fill + hidden `role="progressbar"` (`PpPurchaseButton`); see "Accessibility" below.

**Global Tickspeed card (Factory view).** Unlike every other automation upgrade, this one is
Money-funded (not PP-funded) and lives on the Factory view as its own `GlobalTickspeedCard`, rendered
at the very top of the Factory view (alone in its own `SpeedCardsRow`; Restage now sits left of Scale Up below the tier list) — above `TierList`/tier 1, before anything else — since it's
relevant from the very start of a run, well before Overclock or Prestige are, or even the tier list
itself — `ScaleUpCard` is likewise always shown (unlike `OverclockCard`, still gated on the last
tier having ever been unlocked — see below), but stays down in its own row below `TierList` rather
than joining this card, since its own target walks through the tier ladder one tier at a time (see
"Scale Up" in docs/ECONOMY_REFERENCE.md) and reads more naturally beside the tier list it's advancing
through. Below `TierList`: `RestageCard` (once revealed), `ScaleUpCard` and `OverclockCard` each get their own full-width `SpeedCardsRow` (no side-by-side pairs). Clock Speed shows the base `🏭 ×1.01/lvl` (the Overclock-scaled live step stays in Overclock's disclosure) and Restage `<lastTier.symbol> ×1.01/XP` as `CardEffect` beside their names (same pattern as Scale Up/Overclock). `CardTitleGroup` wraps the name/effect onto a second line when a half-width card is too narrow (phone widths around 320px).
(Earlier iterations tried grouping all three speed-related cards together at the top; this
was reverted to the current split — Clock Speed alone at top, Restage + Scale Up then Overclock below the tier list —
per direct player feedback.) See "The global tickspeed multiplier"/"Overclock" below for the underlying
`engine.js` mechanics. The heading text itself never changes
(`Tickspeed`, no level/percent readout — shortened first from `Global Tickspeed Multiplier` to
`Global Tickspeed`, then to just `Tickspeed` once this card started sharing a row with `ScaleUpCard`
during that earlier iteration and the `Global` prefix stopped earning its width against `ScaleUpCard`'s
own two-word heading; no behavior change, and the shortened heading stuck even after the two cards
split back apart — the `GlobalTickspeedCard` component/prop names are unaffected either way, this is
purely the rendered heading text), but it lives inside a `Disclosure`'s `<summary>` (see "No
description prose on this page" above) — collapsed by default, clicking it is the only way to reveal
the cumulative speed bonus line (`+N% faster ticks on every tier.` — no level number) once
`isGlobalTickspeedActive`, or "Not active yet — spend Bytes…" before the first purchase — the
card's shape stays the same either way (the line always exists, starts collapsed). The `+N%` figure is rendered via `formatGlobalTickspeedBonusPercent` (`MainPage/index.jsx`),
called with `precise: true` through `formatBonusOrMultiplier` (see "Percentages vs. multipliers"
below), not the plain whole-number `formatBonusPercent` — the global
multiplier's regular 1%-per-level compounding (see `GLOBAL_TICKSPEED_PRODUCTION_STEP`/"The global
tickspeed multiplier" below) lands on fractional values, so it shows up to 2 decimal places
(trimming a trailing `.00`/trailing zero, same style as `formatRate`) while the cumulative bonus is
still under 100%, then rounds to a whole percent once it reaches/crosses 100% (×2.00), matching
every other multiplier badge in the app once the numbers get large. The button carries `$progress`
(Money ÷ cost) the same way Buy does, reading just `🌐 {cost}` (the
Enable/Upgrade wording lives in `aria-label`) — its `aria-label` alone still spells out the current cumulative bonus
(same `formatGlobalTickspeedBonusPercent` formatting) for assistive tech, independent of the
collapsed/expanded visual state. A `globalTickspeedCardEverRevealed` flag (seeded from/latched to
`isGlobalTickspeedMultiplierUnlocked(state)`) follows the same `everRevealed` pattern as
`OverclockCard` (see below) — once tier02 has ever been owned (or the multiplier is already active),
the card stays visible rather than disappearing if tier02's owned count is later reset by a
Prestige/Scale Up; Reset clears the flag alongside `overclockEverRevealed`. It
needs no `!isFirstRun` gate — unlike the Firmware page, it has nothing to do with Prestige Points, so
it's available (once tier02 is owned) even during a player's very first run. Clicking is optional: once
`buyTickspeedAutobuyer` is bought (PP-funded, see "Prestige Points, autobuyer unlock, and the tickspeed
multiplier" below), `tickGame` calls `buyGlobalTickspeedMultiplier` automatically every tick, so the
level climbs on its own whenever Money allows — the manual button works identically either way.

**Tickspeed multiplier (Factory view, per tier).** Every unlocked tier's row carries a Money-funded
`UpgradeButton` in the grid slot the old Upgrade/Unlock button used to occupy — enabled by default from
the moment the tier itself is unlocked, with **no** autobuyer-unlock or PP prerequisite at all (see
"Prestige Points, autobuyer unlock, and the tickspeed multiplier" below). Clicking it spends
`getTickspeedMultiplierCost(tierId, currentLevel + 1)` of the tier's own resource via
`actions.buyTickspeedMultiplier`, raising that tier's tickspeed level by 1 — each level speeds up that
tier's own delivery frequency by another 10% (`getTickspeedProductionMultiplier`, divided into the
tier's effective period rather than multiplied into its production credit — see "Tier production
tickspeed" below); it changes **neither** the amount delivered per batch **nor** autobuyer
purchase-attempt frequency (that rate is flat). Visible text is `⚙ {cost} {symbol}` — a single ⚙
icon (matching the tier tickspeed autobuyer's own icon-only status icon on Firmware → Automation)
identifies the button as the tickspeed control; no separate icon marks the marginal effect, since
it's always exactly `TICKSPEED_PRODUCTION_STEP` (every level adds the same fixed 10% step) and
implied by the button itself — `aria-label`/`title` still spell out the full "+10% faster ticks"
sentence for assistive tech; the button's `title` is the only place on this page the cumulative
speed bonus (as opposed to the fixed marginal step) is shown at all — an earlier version also
carried a compact `⚙ +N%`/`⚙ 2x` badge beside the tier name, removed as one automation icon too
many for a row already carrying the tier's autobuyer state (see "Unit autobuyer status" below); the
cumulative figure is still in the row's own Details disclosure (see "Tier row details disclosure"
below).

The **last tier's** button stays the ordinary resource-funded tickspeed button for the whole cycle,
but its requirement and spend differ: it needs `getTickspeedMultiplierRequirement` owned (e.g. 100 for
the 2nd upgrade) and spends only `getTickspeedMultiplierSpend` (10% — e.g. 10); the visible label shows
the spend, the aria-label/progress bar the requirement. Its XP-funded tickspeed is a **separate**
**Restage** card left of the Scale Up card (same `SpeedCardsRow`, below the tier list) (`aria-label="restage panel"`, shown once
`isLastTierTickspeedXpUnlocked`) with a `🧬 {XP} XP` button — see docs/ECONOMY_REFERENCE.md's
"The last tier's XP-funded tickspeed". The row's Details "tier ×N" multiplier includes the XP bonus.

**No per-tier automation icon on the Factory view row.** A tier row's `name` grid area (shared by
`TierNameTrigger` / `TierName`) holds the tier's symbol on the left and the owned count on the
same first line, right-aligned to the row center — no tickspeed-bonus badge (see "Tickspeed multiplier"
above) and no autobuyer status icon. An earlier version showed an always-visible, read-only
`PpUpgradeBadge` here (a single 🤖 glyph, full opacity while active / dimmed `$dimmed` while paused,
via the same icon-instead-of-text convention every other automation status badge in the app still
uses — the tier tickspeed/global tickspeed/Auto Scale Up statuses on Firmware →
Automation, and the Auto Purge/Auto Scale Up status lines — see their own sections below) once
a tier's unit-buying autobuyer was unlocked (`autobuyers`/`applyAutobuyerMilestones` — a free,
prestige-count-milestone-triggered unlock, not a PP purchase). Both removed to keep the Factory view
row down to just the tier name plus live production/owned figures and the two action buttons —
autobuyer active/paused status is still visible (and, unlike the old read-only Game-view badge,
directly toggleable) on Firmware → 🤖 Automation's Tier Autobuyers category, via the same
`autobuyersEnabled`/`setAutobuyerEnabled` state (see "Firmware page" above).

**PP purchase rationale.** The global automations, Auto Purge and Compression mechanics are
unchanged by the move to Firmware — see `docs/ECONOMY_REFERENCE.md` for costs/effects and
`docs/DESIGN_HISTORY.md` ("PP Upgrades tab split…") for why the page is split three ways.

**Scale Up and Overclock cards, below the tier list.** Restage (once revealed) + `ScaleUpCard` share
one `SpeedCardsRow` placed directly below `TierList`; `OverclockCard` gets the next full-width row
when revealed — not above it alongside `GlobalTickspeedCard` (see "Global Tickspeed card" above for why Clock Speed
stays on top while these sit below the tier list). Restage + Scale Up stay side by side at every width (`flex: 1 1 0`, `min-width: 0`, no wrap); `CardTitleGroup` wraps the effect under the heading (`min-width: 0`, `flex-wrap`) so a paired card at ~320px doesn't overflow into its neighbor. The earlier
below-40rem single-column stack was dropped at the maintainer's request (see `docs/DESIGN_HISTORY.md`). `ScaleUpCard` always renders (see below);
`OverclockCard` is gated and, when revealed, sits in the next row rather than beside Scale Up.
Both soft-reset cards (and Clock Speed) share `featureCard(accent)`: compact `0.6rem 0.75rem`
padding, a `0.4rem` internal gap and a 3px left accent stripe; their headings have no default margin, their
buttons use reduced vertical/horizontal padding, and the row gap is `0.4rem`. `ScaleUpCard`'s heading
is a `Disclosure` like the others (collapsed by default): the body states the reset + doubling and
the completed-level requirement.

Unlike every other soft/hard reset control on this page, `ScaleUpCard` carries no `everRevealed`
progressive-disclosure gate at all — it's unconditionally rendered, since Scale Up is relevant from
the very first cycle (its own target walks through the tier ladder one tier at a time, starting at
the first tier — see "Scale Up" in docs/ECONOMY_REFERENCE.md — rather than sitting only on the last
tier the way it used to). `getScaleUpTargetTier(state)` (`engine.js`) determines which tier's name/
level the card's button currently reads against; `getScaleUpRequirement(state)` determines the
level it requires. There is no equivalent card for Prestige — the bottom Prestige panel that used to
mirror this pattern (via a `purgeCardEverRevealed` flag) was removed as purely informational and
redundant with the `TopPurgeBar`/`FullScreenOverlay`/PP-display-as-button ways to trigger Prestige
(see "Prestige and the Googol freeze" below).

Player-facing purchase levels on both reset cards are zero-indexed **completed-level** counts: the
UI subtracts one from the engine's one-based current-level cursor, and both requirements are
expressed in completed levels — Scale Up requires 3 levels for each tier's first claim, then 6, 9,
12, … on repeated final-tier claims; Overclock requires the final tier's completed levels to reach the dynamic
`getOverclockRequirement` (5 first, then last-claimed + 3).

`OverclockCard` — same orange-accented `StatCard` shape as `ScaleUpCard`'s cyan — is gated on
`lastTierUnlocked` (the last tier having ever been unlocked), via its own `overclockEverRevealed`
`everRevealed`-flag, latched permanently true and reset only on a full Reset — unlike `ScaleUpCard`,
which carries no such gate at all (see above); Overclock's own gate is unaffected by Scale Up's
redesign, still sitting purely on the last tier reaching a level. `OverclockButton` (sized to
match `ScaleUpButton`/the tier rows' own Buy/tickspeed buttons) reads `⚡ {lastTier.symbol} {completed}/{required}` only; the effect `🌐 ×1.1/lvl` (🌐 = Clock Speed, the thing multiplied) sits beside the card's name (`CardEffect`) — the fixed per-level effect (`1 + OVERCLOCK_MULTIPLIER_STEP`) and the final tier's completed levels vs. this cycle's requirement — with an `aria-label` of `Overclock (requires {required} completed {lastTier.name}
levels) — …`. `ScaleUpButton` similarly reads `⏩ {targetTier.symbol} {completed}/{required}`; its effect `🏭 ×2` (🏭 = tier production), plus `· 🔓 TB` when the successor is Terabytes, sits beside the card's name, with
`aria-label` `Scale Up (requires {required} completed {targetTier.name} levels) — doubles production
for tiers unlocked so far[ and unlocks TB]`
— `actions.overclock` on click. Overclock's reward is folded into the Tickspeed upgrade's own per-level rate, not a separate multiplier — see
`getOverclockMultiplier`/`getGlobalTickspeedProductionMultiplier` in engine.js.
Like `ScaleUpButton`'s `Lv.{scaleUpTargetTierLevelDisplay}/{scaleUpRequirementDisplay}`, this pair
uses the completed-level display offset while eligibility continues to use the raw engine values;
see `getOverclockRequirement`'s own comment in `engine.js` and "Overclock" in
docs/ECONOMY_REFERENCE.md. There is no per-tier-row quick-access Overclock button — Overclock is meant
to be a deliberate, occasional decision reached via this card, not a frequent one-tap action.

`OverclockCard`'s `<h2>` also wraps a `Disclosure` (see "No description prose on this page" above)
whose summary is a `CardTitleGroup` of the heading plus `CardEffect` (`🌐 +10%/lvl`; its click is
stopped so only the "Overclock" name toggles), so expanding never squeezes the body into a
title-row column. The body is always present (collapsed by default): clicking "Overclock" reveals a `MutedText` line, `Clock Speed's per-level rate is now {currentStep}% (was 1%)` once claimed, or `Not claimed yet — reach {required} completed {lastTier.name} levels…` before the first claim.
`{currentStep}` is `formatGlobalTickspeedBonusPercent(currentGlobalTickspeedStepDisplay)`, the rate
(`OverclockButton` shows only `{symbol} {completed}/{required}`; the +10%/lvl effect sits beside the card name — see above); this is the one Overclock-specific number not otherwise visible
anywhere on the Factory view. Beyond that one figure, Overclock has no visible effect of its own to
display separately from the Tickspeed card above it — raising the global tickspeed multiplier's own
per-level step, rather than stacking a second multiplier alongside it, means the Tickspeed card's own
`+N% faster ticks on every tier.` status line (see "Global Tickspeed card" above) already
reflects Overclock's cumulative contribution once any levels are bought, with no separate "Overclock
bonus" figure needed anywhere else in the UI besides the money-balance breakdown's own summary line
(see `GlobalMultipliersList` above).

**Accessibility.** Each PP-spending button nests a `VisuallyHidden` `role="progressbar"` span, so the
explicit `aria-label` on the button itself is required (accessible-name computation would otherwise
recurse into the nested node). Buy/Prestige/Reset carry a `title` tooltip; Reset additionally wires
`aria-describedby` to a `VisuallyHidden` description (`reset-description` — the app's only
irreversible action). The Tickspeed/Scale Up/Overclock buttons used to wire `aria-describedby` to their
now-removed `InfoDetails` prose too; that's gone along with the prose itself (see "No description prose
on this page" above) — each button's own `title`/`aria-label` already carries the mechanic's short
explanation, so nothing about the accessible name/description regressed.

**Tier row visuals.** Each `TierLine` gets a thin `border-left` accent cycled from `theme.tierAccents`
(the per-mode 8-hue set in `theme/tokens.js`, replacing the old hardcoded `TIER_ACCENT_COLORS` array)
by `tierIndex % theme.tierAccents.length` (cosmetic only, kept off text/button colors to avoid
colliding with affordability semantics — those now resolve from `theme.color.good`/`warn`/`violet`/
`disabled`/`text`/`textMuted`/`borderStrong` rather than raw hex: `TierDetailsContent`'s
`ul`, `OwnedText`/`ProductionText` (token-native spans — `textMuted` for owned, `text`/`font-weight: 500`
for production), and the
Buy/tickspeed/XP-consume buttons all migrated in the same pass; the Firmware page's
own instances of these same shared components are a separate surface and weren't touched), and plays
a one-shot CSS reveal animation when a tier unlocks *during the
current session* (tracked via a mount-time `Set` snapshot of already-unlocked tier ids, not live mount
timing, since locked tiers render `null` and would otherwise "mount" on every load).

The Buy (`variant="plain"`), tickspeed-multiplier (`variant="success"`), and XP-consume
(`variant="smart"`) buttons each pass `Button`'s semantic `variant` prop instead of a raw `color`
ternary — `Button`'s `resolveColor` auto-swaps a `variant` to `theme.color.disabled` whenever
`disabled` is true, so each of these three affordability-gated buttons only needs `variant` +
`disabled`, not a hand-written `color={canX ? tokenA : theme.color.disabled}` (see
`docs/COMPONENTS_REFERENCE.md`'s `Button/index.jsx` entry for the general mechanism).

Each row is a CSS
Grid with fixed `grid-template-areas`/`grid-template-columns` at every viewport width: a two-column
layout where the top line is the tier symbol on the left and the owned count on the same line
right-aligned to the row center (`OwnedText` uses `margin-left: auto` at the end of the left half
inside `TierNameTrigger`'s full-width flex row — see "No per-tier automation icon on the Factory view
row" above for the two badges that used to also share this area) and the production figure on the
right (`ProductionText`, `text-align: right`). Below that, the
tickspeed multiplier button and Buy each take one equal half, then a `details`-area line spanning
both columns. There is no separate `autobuyer` grid row/line — an earlier version gave the
autobuyer status badge its own row, then later folded it into the icon-only badge sharing the
`name` area (freeing that vertical space, since a single glyph needs no row of its own) before
removing the badge from this view entirely. Below `40rem`, only fonts/spacing shrink. The owned
cell's "Owned: " label is a `VisuallyHidden` span (plus `title="Owned"`) — assert via
`toHaveTextContent`, not `getByText`. Grid cells use a shared `gridCell` mixin (`min-width: 0;
overflow: hidden; text-overflow: ellipsis; white-space: nowrap`). `RootDiv` sets
`font-variant-numeric: tabular-nums`. Each row is also registered (via a stable per-tier ref
callback, `registerTierRowRef`) with a single shared `IntersectionObserver` in `MainPage` that
auto-collapses that tier's Details disclosure the instant the row scrolls fully out of the
viewport — see "Auto-collapsing expanded disclosures on scroll" below.

**Tier row type scale.** `TierName` uses `font.display` and steps from `lg` (desktop) to `md`
(below `40rem`); `OwnedText`/`ProductionText`, `BuyButton`/
`UpgradeButton`, and `TierDetailsContent` all resolve their `font-size`/`line-height` from
`theme.type.scale`
(`theme/tokens.js`) rather than hand-tuned `em` values — owned count stays at `textMuted`/`sm→xs`,
production reads stronger at `text`/`font-weight: 500`, the two
buttons from `sm` to `xs`, and the details disclosure body sits at `xs` with a `border-top` divider
when expanded. This gives the row three clear type/weight steps (name, production, owned/metrics)
instead of a single flat size, and `BuyButton` additionally
sets an explicit `font-weight: 700` (`UpgradeButton` stays at `Button`'s own default `600`) so Buy —
already the rightmost, affordability-fill-colored control — reads as the visually heavier of the two,
per its "stays the visually dominant control" requirement. Gaps/padding resolve from `theme.space`;
the upgrade/Buy row separates from the stats line via `margin-top`. Layout (grid areas/columns) is
unchanged; only typography, spacing, and the details divider moved.

**Tier row details disclosure.** Unlike the native `<details>`-based `Disclosure` a few other
cards/categories use (see "No description prose on this page" above), a tier row has **no separate
visible trigger at all**: `TierName` itself,
wrapped in `TierNameTrigger` (`grid-area: name`, a plain layout div), is the trigger via its inner `TierNameLabel` (`role="button"`, `tabIndex={0}`, `aria-expanded`,
`aria-controls`), sitting in its normal spot rather than a redundant "Details" label
elsewhere in the row. This is a **plain React-controlled disclosure**, not native `<details>`/
`<summary>` — a `display: contents`-based version was
tried first, but hit a real Chromium limitation: a `display: contents` ancestor breaks a promoted grid
child's ability to span multiple `grid-template-areas` cells, so the details content collapsed to a
single column's width instead of the full row (confirmed with a minimal repro, independent of whether
the span was expressed via a named area or explicit `grid-column` line numbers). `openTierDetailIds`
(a `Set` of expanded tier ids, in `MainPage`) tracks which rows are expanded;
`TierNameLabel`'s `onClick` toggles it, and its `onKeyDown`
handles Enter/Space so keyboard operability doesn't regress from what native `<summary>` would give
for free. `TierNameLabel` sits inside the `<h3>` `TierName`, so the heading stays in the heading-navigation outline. The disclosure's content (a small `<ul>`,
see below) is `TierDetailsContent`, a plain `grid-area: details` div rendered *only* while its tier id
is in `openTierDetailIds` — collapsed, nothing renders there at all, so the row's `details` grid line
contributes zero height, an even more compact collapsed footprint than a visible "Details" line would
give, and (being a normal, non-`display: contents`-promoted grid item) correctly spans the full row
width when expanded.

Only the name toggles — the rest of the tile (and the Owned count) is inert, so Buy/tickspeed clicks can never also toggle it. Expanding it lists,
in the `<ul>`: the tier's base tickspeed (`getTierBaseTickSpeedSeconds`, from `layers.js`) and effective
tickspeed (`getEffectiveTierTickSpeedSeconds`, with the contributing tier/global tickspeed multipliers
named inline), the purchase milestone multiplier and the lifetime purchase count driving it
(`getPurchaseMilestoneMultiplier`), the Scale Up multiplier (only shown once `scaleUpCount > 0`), for
and the tier's cost/produces resource symbols. This — plus the
tickspeed button's own `title` tooltip — is now the only place `MainPage` surfaces a tier's
base/effective tickspeed numbers at all, now that the compact per-tier badge that used to show the
cumulative bonus at a glance is gone (see "No per-tier automation icon on the Factory view row" above).

**Percentages vs. multipliers.** Every bonus derived from a multiplier (the last tier's XP-funded
tickspeed, the Global Tickspeed card/breakdown, the Prestige production
speed bonus in the HUD/money-balance breakdown) is rendered through a shared
`formatBonusOrMultiplier(multiplier, { precise })` helper in `MainPage/index.jsx`: below +100% it reads
as a percentage (`+21%`, or `+N.NN%` with `precise: true` for the global tickspeed multiplier's
sub-1%-per-level compounding — see `formatGlobalTickspeedBonusPercent`), and at/above +100% (multiplier
`>= 2`) it switches to a Scale-Up-style `"Nx"` multiplier (`2x`, `5.5x`, via `formatRate`) instead — a
percentage reads awkwardly once it doubles the baseline, and `"Nx"` is already this app's convention for
large stacking bonuses (Scale Up's own `×N`, though that one keeps its pre-existing `×`-prefix styling
rather than switching to this helper's `N`-suffix style, since Scale Up's multiplier was never expressed
as a percentage to begin with). This is purely a display-layer convention — no economy formula changed;
only the rendered text shifts at the +100% threshold. Every call site that used to hardcode `+N%` now
goes through this helper instead of `formatBonusPercent`/`formatGlobalTickspeedBonusPercent` directly
(both still exist, now only as `formatBonusOrMultiplier`'s own below-100% branches).

**Auto-collapsing expanded disclosures on scroll.** The tier row Details disclosure
(`TierDetailsContent`/`openTierDetailIds`) automatically collapses once its row scrolls fully out of
the viewport in either direction, so an expanded row doesn't stay open (and out of context) as the
player keeps scrolling. Since tier rows mount/unmount as tiers unlock/lock across Prestige/Overclock,
a single shared `IntersectionObserver` (created once, not per row) watches every currently-rendered
row, with each `TierLine` registered/unregistered via a stable per-tier ref callback
(`registerTierRowRef`, cached in a `Map` keyed by tier id so the callback's identity doesn't change
across re-renders — a fresh callback identity every render would make React re-invoke it with `null`
then the element again on every 100ms tick, needlessly churning `observe`/`unobserve`); losing
intersection removes that tier's id from `openTierDetailIds` the same way `toggleTierDetails` would.
Uses the default `IntersectionObserver` threshold (`0`), so a row only collapses once it has zero
overlap with the viewport — "scrolled beyond screen," not merely partially cut off — and is guarded
for environments without `IntersectionObserver` (e.g. jsdom in tests), where a disclosure simply
stays open once expanded. The native `<details>`-based `Disclosure` instances elsewhere on this page
(`GlobalTickspeedCard`/`OverclockCard`/Firmware → Automation's tier milestone badges — see
"No description prose on this page" above) do **not** auto-collapse on scroll — there's no
`useAutoCollapseDetails()`-style hook wired to them; each stays open until the player clicks its
heading again, which is enough for a short one-line body that isn't competing with the rest of the
page for scroll-driven attention the way the taller tier-row disclosure is.

**Eliminating sticky-balances scroll flicker.** `StickyBalances`' compressed/expanded layouts differ
enough (flex direction, padding, box-shadow, extra progress-bar/breakdown content) that flipping between
them exactly at the `BalancesSentinel`'s boundary pixel — which momentum/trackpad scrolling can hover
over for several frames — visibly flickered. The `IntersectionObserver` callback driving
`balancesCompressed` now debounces its `setBalancesCompressed` call by 60ms (clearing/rescheduling a
`setTimeout` on every callback invocation) so a rapid run of boundary-crossing entries collapses into a
single, settled update instead of repeatedly toggling the layout; 60ms is far under the threshold of a
deliberate scroll pause but long enough to smooth over the crossing itself. `StickyBalances` also gets a
`will-change: transform` hint so Chromium composites it on its own GPU layer while scrolling instead of
repainting it from scratch every frame (a secondary contributor to the same flicker, given its solid
`theme.color.page` background fill).

**Offline notice.** When the hook reports a non-null `offlineProgress`, MainPage renders the shared
`components/OfflineProgressNotice` component (see `docs/COMPONENTS_REFERENCE.md`), passing
`offlineProgress`/`dismissOfflineProgress` straight through — this component (and all the behavior
described below) used to live inline in this file, but was extracted so `ByteFoundryPage` can render
the exact same notice too (offline progress already applies to the Byte Foundry mechanically
regardless of which page is active; only the notice itself was previously MainPage-exclusive). A
dismissible `OfflineNoticeCard` ("Resumed from sleep …", via `formatOfflineDuration`) renders inside a
fixed, viewport-centered `OfflineNoticeOverlay` — a true overlay/dialog presentation (centered
regardless of scroll position) rather than an inline card pushed into the page's normal document
flow; never reappears once dismissed or state is reset. `OfflineNoticeOverlay` sets
`pointer-events: none` (with `pointer-events: auto` restored on the card itself) so the rest of the
page stays clickable through the overlay's own surrounding space. The card has no click handler or
`title` of its own — only the Dismiss button is interactive, keeping the whole-tile-is-clickable-and-
also-has-a-tooltip pattern out of this component (see `docs/DESIGN_HISTORY.md` for why the earlier
click-to-extend behavior was dropped) — and its content (description + centered Dismiss button)
stacks in `StatCard`'s own flex-column, centered via `align-items`/`text-align: center` on the card.
Self-dismisses via a countdown (`OFFLINE_NOTICE_AUTO_DISMISS_MS`, 10s) driving the Dismiss button's
`$progress` fill, then an opacity fade (`OFFLINE_NOTICE_FADE_MS`, 400ms) before
`dismissOfflineProgress` removes it.

**Prestige surfaces (#139).** The first-run freeze uses `FullScreenOverlay` (`role="dialog"`
`aria-modal="true"` `aria-label="Purge required"`) with a dark scrim (`rgba(0,0,0,0.92)`) and a
token-driven `FullScreenCard` (`surfaceRaised` panel, `warn` heading via `font.display`/`type.scale.xl`,
`PurgeMutedText` body, `textMuted` bullet list). Repeat-run reminders use `TopPurgeBar`
(`surfaceRaised` + `warn` bottom border + `shadow.sm`) with the same `PurgeMutedText` + a
`variant="prestige"` `$pulse` button. Both prestige buttons keep their existing `aria-label`s; the
full-screen button still auto-focuses on mount. Presentation gates (`showFullScreenPrompt` /
`showTopPurgeBar`) are unchanged.

Once `isProductionFrozen(state)` is true, every control except Prestige disables — see "Prestige and
the Googol freeze" below.

## App.jsx routing and the Foundry gate

`App.jsx` switches screens via a local `page` `useState` (`'game'`/`'info'`/`'foundry'`/`'boosters'`/
`'compute'`/`'perks'`/`'milestones'`/`'settings'`/`'dev'`, default `'game'`) — not a routing library —
plus a shared fixed bottom `AppNav` (Foundry → Power → Compute → Factory → Firmware → More; Manual is in More) and
`AppMenu` (More sheet → Manual / Releases / Settings / Dev Mode in dev builds). Legacy `page === 'storage'`
rewrites to `'foundry'`. Which screen renders is derived, not `page` directly:
`showingFoundry = !GATE_EXEMPT_PAGES.has(page) && (!intro.mainGameUnlocked || page === 'foundry')`.
`GATE_EXEMPT_PAGES` = `'info'`/`'boosters'`/`'compute'`/`'milestones'`/`'settings'`/`'dev'`, so those
stay reachable during the gate — Power only once capacity reveals it, Compute only once 100 PP
(Architecture 4b/4c). ByteFoundryPage is both a *mandatory gate* (while `intro.mainGameUnlocked` is
false) and, once unlocked, a permanent revisitable screen (`page = 'foundry'`). `intro.mainGameUnlocked`
is PERMANENT (`latchMainGameUnlocked` in `engine.js`; never reset by a real Prestige or Reboot),
so `!intro.mainGameUnlocked` is true only on a save's very first cycle. `page` is independent of it, so
no syncing effect is needed: the gate resolving just reveals whatever `page` already was (typically
`'game'`).
