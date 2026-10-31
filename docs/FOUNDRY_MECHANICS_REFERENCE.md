# Foundry Mechanics Reference

Full prose reference for the Byte Foundry / Storage / Data Lake / Boosters mechanics and the
`ByteFoundryPage` / `ComputePage` architecture entries. **Moved verbatim out of `CLAUDE.md`** (which
keeps a terse summary plus the hard rules) to cut per-session context cost; this file is the detailed
current-behavior source for those areas. Formula/field detail also lives in `ECONOMY_REFERENCE.md`;
UI layout in `MAINPAGE_REFERENCE.md`; rationale in `DESIGN_HISTORY.md`. Update this file in the same
commit as any change to the mechanics it describes.

## Architecture 4 — `ByteFoundryPage/index.jsx`

4. **`ByteFoundryPage/index.jsx`** — the tap screen (see "Economy model"), a pure renderer taking
   `{ game, focusNonce }`; how a save's first Prestige cycle earns its first Kilobytes (rationale:
   `docs/DESIGN_HISTORY.md`'s "Why Bytes was pulled out of the tier ladder in favor of the Byte Foundry
   intro"). A mandatory gate whenever `intro.mainGameUnlocked` is false (AppNav omits Factory during it;
   Guide and More stay), permanently latched true the instant Storage's capacity threshold is crossed
   (`latchMainGameUnlocked`/`isStorageUnlocked` in `engine.js`) — the SAME "1 KiB" threshold that
   reveals pool 1's card and switches the tap into fill-multiplier-bonus mode. One-time-ever; never
   resets (see `App.jsx`'s repo-layout entry). Once latched, the standalone Tap button is gone and the
   Data Stream tile itself is the tap target (a stretched `PoolTapButton` inside `DataStreamTile`, calling
   `actions.tapIntroBit`; see "Fill-based Speed/Bandwidth multiplier"). Compute lives on its own screen
   (4b); Storage's every-size detail (4a) is continuous sections on this Foundry screen (and the reusable
   `StoragePage` wrapper), not a separate AppNav item or tab. Data Stream owns the shared
   Combine/Speed/Capacity actions and the common Provision Disk control; Storage pools 1–10 are derived
   views over the one Data Stream, each with its own Bandwidth (`getStoragePoolBandwidth`, hard-capped at
   that pool's Capacity in Bytes ^ `getDataStreamSpeedExponent(intro)` — the same rising exponent as the Data Stream's own cap) and local buffer
   (`intro.poolBuffers[poolIndex]`, `getPoolBufferBits`/`getPoolBufferCapacity`) that every bit-costing
   Storage action for that pool — Provision Disk's build cost, the read-cache fill — spends from
   exclusively (`tickPoolBufferFill` tops it up from `intro.bits`, pool 1 first, after tier01's
   bootstrap conversion and Queued Capacity each tick; `getPoolBufferCapacity` equals the pool's
   Capacity, so a full buffer can always fund one `provisionDisk` pass of even its largest disk). One
   `PoolCard` renders per VISIBLE pool (`getVisibleStoragePoolCount` — PURE Capacity-based:
   `intro.capacity` reaching a pool's `getPoolCapacityUnlockThresholdBits`, pool 1 always counted, NO
   disk-build dependency — deliberately independent of `isStoragePoolUnlocked`/
   `getUnlockedStoragePoolCount`, which stay disk-build-only and drive the disk ladder's progression);
   see "Pool liveness is Capacity-only" and `docs/DESIGN_HISTORY.md`'s "Pool cards gated on a capacity
   threshold too" for why folding the two into one primitive was tried and reverted. Only the largest
   card is expanded by default. `components/DataLakePanel` (`bare`, `tierIndex={poolIndex}`) is embedded
   per pool below that pool's `components/DiskArrayRow`s (cache above disks) in the same disclosure
   (`docs/DESIGN_HISTORY.md`: "Pool titles simplified to `<symbol>` Pool; each pool's Data Lake moved
   inside its own card"). Disk Fill is fully automatic every tick (`DiskArrayRow` is a pure status
   display). Provision Disk is a single shared control (one disk ladder spans every pool) rendered in
   its own standalone "Provision Disk" card directly below the Data Stream card (hidden while the offer's pool is
   rebuilding); Upgrade Capacity / Speed preview their post-upgrade value
   (`docs/DESIGN_HISTORY.md`: "Provision Disk moved into the Data Stream card"). Each disk
   array shows every size from `getDiskSizesToShow`, all `DISK_ARRAY_LADDER_CAP` (9) slots in one row.
   The "queue next build" pin-icon toggle was removed from the UI, but the auto-arming queue stays wired
   and live (see "Disks"; `docs/MAINPAGE_REFERENCE.md`'s Provision Disk button section);
   `queueDiskBuild`/`clearDiskBuildQueue` remain implemented/tested but unexposed (unlike Capacity's
   `queueIntroCapacityUpgrade`, which the Upgrade Capacity button drives). Every action here or on
   either dedicated screen is gated by the forced priority order (see "Economy model") — Data Lake
   Booster purchases, its capacity Upgrade, and Upgrade Capacity / Speed are the three exceptions, each
   arbitrated on its own eligibility. Full UI layout: `docs/MAINPAGE_REFERENCE.md`; mechanic/formula
   detail (Bandwidth cap, buffer capacity, fill multiplier, disk ladder/build-pass):
   `docs/ECONOMY_REFERENCE.md`; component contracts (`DiskArrayRow`, `DataLakePanel`):
   `docs/COMPONENTS_REFERENCE.md`.

## Architecture 4b — `ComputePage/index.jsx`

4b. **`ComputePage/index.jsx`** — Foundry **Boosters** screen (page id `'boosters'`), taking `{ game }`.
   Reached via AppNav once `isComputeCoreConversionUnlocked`. Also hosts the nine-boundary merge chain
   (Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter → Supercomputer → Megacomputer —
   see "Economy model", issues #280/#316/#321), behind its own later, one-time
   `intro.computeMergePageUnlocked` reveal. "Compute" names the page/feature only — entities drop the word
   (`Core`/`Node`/…) in every player-visible label. Deliberately terse — icon-only controls, full sentence
   in `title`/`aria-label`; mechanic prose lives in the Guide (`InfoPage`). Render order: a top card with the
   active Boost's timer bar — Pop (refund newest unused stack, no confirm) or, once none is unused,
   Forfeit (confirmed) on the left, Stack on the right (`canReclaimComputeBoost`/`canForfeitComputeBoost`
   enforce the same split in the engine) — or "No boost running"; while a boost runs, the matching
   preset stacks and any other preset is a confirmed switch that refunds unused stacks), THEN each merge-boundary tier's two rows (issues #321/#326/#363): row 1 is the
   `COMPUTE_ENTITY_CAP` (10) normal-slot squares (never above 10/10, even once auto-merge is unlocked and
   the entity has grown into its reserve) plus a `TierSelectButton` selecting that tier — only the ONE selected tier block shows
   `ArmedStatusText` + the 3 Burst/Standard/Sustain presets inline, at that tier's own boost (same multiplier/duration for every tier; a tier-N boost covers the first N Factory tiers, `getComputeBoostCoveredTierCount`); row 2 is, before auto-merge unlocks, Merge (`COMPUTE_MERGE_RATIO`, 8) + Unlock
   Auto-merge `TierActionButton`s (the latter with a live progress fill toward its
   `COMPUTE_ENTITY_CAP`-unit cost), or, once unlocked, the `COMPUTE_MERGE_RESERVE_CAP` (8) reserve-slot
   squares (gradually filled, `getComputeReserveHeld`), labelled "🤖 Auto-merge", clickable as an instant
   8→1 manual merge (only the automatic merge is timed); the selected tier's presets render below this row — Megacomputer has no
   row 2. Cores come from buying Boosters from the matching Data Lake on Foundry's `DataLakePanel`, not
   minted from Memory. Full button/gate/aria-label detail: `docs/MAINPAGE_REFERENCE.md`; render-order and
   Stack/Pop/Forfeit rationale: `docs/DESIGN_HISTORY.md`.

## Economy model — Byte Foundry (full text)

Bytes are no longer a purchasable tier — they're produced entirely by the **Byte Foundry**
(`ByteFoundryPage`, see "Architecture"), a tap-to-earn screen every fresh save must pass through once
before the main game (`tier01`/Kilobytes onward) is reachable — a ONE-TIME-EVER gate (see
`latchMainGameUnlocked`/`intro.mainGameUnlocked`): once Storage's capacity threshold is reached, the gate
is permanently gone, across every future real Prestige and Era ascension. Tapping accumulates bits into
the **Data Stream** (a Buffer-capped balance) that combines into a permanent, passively producing Byte
generator. Combine creates the generator without snapping Capacity; save load via
`normalizePoolMemoryCapacity` preserves current Capacity and only clamps when necessary. Era ascension
keeps the generator (`byteCreated`) and the `mainGameUnlocked` latch but resets Capacity to
`INTRO_STARTING_CAPACITY` with the rest of the Foundry (`buildEraIntroReset`) — Capacity is rebuilt each
Era, Factory access never goes away again once earned. Production and storage grow via two **Upgrade Capacity** / **Upgrade Speed** actions, one at a time (`queueIntroSpeedUpgrade`; detail: `docs/ECONOMY_REFERENCE.md`'s "Upgrade Speed"): a click starts it (`isMemoryCapacityUpgradeArmable`, `intro.capacityUpgradeQueued`),
and from then on `tickCapacityUpgradeDrain` pulls from the Buffer at the base Speed
(like a pool pulling at its Bandwidth, at a constant 1× Speed — no fill multiplier) into `intro.capacityUpgradeProgress`, ahead of
every other consumer — nothing is paused or raced; when the bar
reaches the current Capacity (the cost) `intro.capacity` doubles. The run survives load and Prestige. While
running, the same button becomes an inert progress bar (no cancel; the tile is unchanged). Displayed Speed is *derived* from the Speed basis
(`getDataStreamSpeedBytesPerSecond`): it's `basisBytes ** e` B/s, capped at `Capacity^e`, where `e = getDataStreamSpeedExponent(intro)` = `DATA_STREAM_SPEED_EXPONENT_BASE` (0.5) + `DATA_STREAM_SPEED_EXPONENT_STEP` (0.01) per unlocked Disk size beyond the first (`intro.unlockedDiskSteps`, default 1). Provisioning a size beyond the unlocked ones needs a **Foundry reset** (`unlockNextDiskSizeByFoundryReset`/`isDiskSizeUnlockAvailable`; `resetByteFoundry` + one more step, convenience replay rebuilds prior highs); steps survive Prestige/Reset Byte Foundry, reset on Era ascension, and old saves are grandfathered in `normalizePoolMemoryCapacity`. Detail: `docs/ECONOMY_REFERENCE.md`. Later, Disks (`StoragePage`) and Compute Cores/Nodes/Compute Boost (`ComputePage`,
nav **Boosters**) unlock; a separate **PP Compute (Flops)** screen (`ComputeFlopsPage`, nav **Compute**)
unlocks at 100 PP — see Architecture 4c. Recurring "upgrade" actions are ranked in a fixed **forced
priority order** — Disk Fill > Provision Disk > Compute Boost — so a lower-ranked action is disabled (in **Boost pool bonus:** a boost also scales the buffer-fill speed of the Storage pools matching the Factory tiers it covers (pool N ↔ tier N) by `1 + poolBonusPercent/100` (`COMPUTE_BOOST_PRESETS`: +200% / +50% / +10%; `getComputeBoostPoolMultiplier`, applied in `getPoolEffectMultiplier` on top of the capped fill percent); covered pool cards glow.
the UI and in the engine reducer) whenever a higher one is available. **Upgrade Capacity / Speed themselves sit
OUTSIDE this order** (`isMemoryCapacityUpgradeAvailable`) — its growth never waits on Storage or Compute;
a deliberate reversal of an earlier version that ranked it lowest — see `docs/DESIGN_HISTORY.md`. An
always-on auto-convert (`convertIntroBitsToKilobytes`/`tickIntroAutoInvest`) turns Data Stream bits into
free `tier01` units at tier01's current per-unit cost every tick, with no manual trigger and no per-cycle
cap; neither function touches `mainGameUnlocked`. `ByteFoundryPage` no longer renders a manual
transfer-block row (removed — see `docs/DESIGN_HISTORY.md`): once Storage Pool cards appear, Disk pulls
(below) are the automatic path to tier units; before that (a save's first, still-gated cycle),
auto-convert alone carries the player through the gate. `convertIntroBitsToKilobytes` is still
exported/tested — only its one UI caller was removed. The generator, Disks, Data Lakes
(`depositedUnits`/`fillBits` / purchased Boosters / `autoConvertActive` / `capacityLevel`), and every
compute-ladder entity — Core, Node, Cluster, Network, Grid, Fabric, Cloud, Datacenter, Supercomputer,
Megacomputer (every tier past Node mergeable manually, 8:1 per tier, once unlocked — "Compute" names the
page/feature only, not any entity) — are all permanent across every real Prestige, as is the
main-game-unlock gate once latched; only Data Stream balance and tier01's purchase-block progress reset
each cycle. Nothing here ever fully freezes — every action stays live indefinitely, every cycle.

**Fill-based Speed/Bandwidth multiplier** (`FILL_MULTIPLIER_*` in `layers.js`; `getFillMultiplierPercent`/
`getDataStreamEffectMultiplier`/`getPoolEffectMultiplier`/`tickFillMultiplierDecay`/`tapPoolBuffer` in
`engine.js`) — the displayed Speed/Bandwidth never change; a separate fill-dependent multiplier (1000%
empty → 100% at 50% full → 10% at full buffer, log-linear) scales only the real per-tick amount delivered into the
buffer, boosted temporarily by tapping (+5%, decaying 1%/sec, multiplicative, ×(1 + bonus%), hard-capped at 2000% total).
`ByteFoundryPage` no longer draws a multiplier bar: the Data Stream's Speed and each pool's Bandwidth
show the EFFECTIVE value (base × multiplier, 3 significant digits, `formatSpeedText`), tinted
red (10%) → blue (100%) → green (1000%) by `getSpeedColor`; each tile also gets a `CapacityBonusRow` (📦 Capacity under the name, a narrow tap-bonus bar, and "+x% 👆" under the speed — or, while no bonus is active, "⏳ time to full" (`getBufferSecondsToFull`: (capacity/rate)·e^(−a)·(e^b − e^(b·fill))/b with a = ln(MAX/100), b = ln(MAX/MIN), the integral of the log-linear fill-multiplier curve, assuming nothing else draws from the buffer); bar and bonus text auto-hide at 0).
A collapsed pool card also shows its Data Lake title/action row (`DataLakePanel section="header"`; an
expanded pool renders the full lake). Tap-bonus headroom clamping: `docs/ECONOMY_REFERENCE.md`, `docs/MAINPAGE_REFERENCE.md`.

**Data Stream Buffer / pool Memory Capacity** — **standing rule: non-binary (SI-clean or decade-power)
transforms are for storage-pool-scoped values only; `intro.capacity` itself keeps doubling plainly in
binary** (IEC `KiB`/`MiB`/…, step 1024), since it's also the Data Stream tile's own balance figure —
two earlier attempts shared one raw value between both displays and got this wrong (see
`docs/DESIGN_HISTORY.md`). Each pool derives its OWN Capacity (`getStoragePoolCapacity`) from the same
doubling count via a DECADE-POWER-OF-10 ladder (1 KB, 10 KB, 100 KB, …, `getDecadePowerEquivalentBits`)
that holds flat within a decade and clamps to that pool's own bound; each decade step is sized to
exactly fund that step's own disk-build cost. Bandwidth follows a finer SI-clean switchover sequence
(`getSiCleanEquivalentBits` — 125 instead of 128 past 64 B/s, repeating every decade). The Data Lake
capacity ladder uses the same decade-power shape independently. `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY`
sits at half of pool 1's end bound. Full formulas and constants: `docs/ECONOMY_REFERENCE.md`. Timed
compute merges (`getComputeMergeDurationSeconds`) take 8 fills of the input tier's own pool's smallest
disk at that pool's Bandwidth; there is no merge-duration upgrade.

**Pool liveness is Capacity-only, independent of disk-build progress.** A pool becomes live — visible,
with an active buffer/Bandwidth and usable read cache — the instant `intro.capacity` reaches its
`getPoolCapacityUnlockThresholdBits` (1024^N Bytes), via `getVisibleStoragePoolCount`, regardless of
earlier pools' build state. This is entirely separate from `isStoragePoolUnlocked`/
`getUnlockedStoragePoolCount` (disk-build-only — pool 1 always reachable, pool N+1 only once pool N's
three ladder sizes are ALL fully built), which still drives the disk ladder's progression (which size
Provision Disk offers): "to provision a disk, all possible disks of all smaller sizes must already be
provisioned — the disk prerequisites are pool to pool; the pool prerequisite is just the Data Stream
Capacity threshold." Folding the two into one shared primitive was tried once already and reverted
(a much wider blast radius than intended); see `docs/DESIGN_HISTORY.md`.

**Disks** (`intro.disks`/`disksBuiltTotal`/`diskCache`/`diskWriteCache`/`diskBuild`/
`diskProvisionPasses`/`diskBuildQueued`, `getDiskSize`/`getDiskCost`/`getDiskProvisionPassesCollected`/
`provisionDisk`/`tickDiskAutoFill`/`isDiskPullEligible`/`tickDiskPull`/`tickDiskLevelOneCachePull` in
`engine.js`) are a real storage medium, not tier01-only: a size's ladder (1 KB → 10 KB → 100 KB, …,
`DISK_LADDER_SIZE_MULTIPLIER`) advances every `DISK_ARRAY_LADDER_CAP` (9 — the array's always-full cache
substitutes for a 10th disk) disks built at that size, up to the highest size any unlocked pool can fund.
`provisionDisk` collects the cost in `getDiskProvisionPassesCollected`/`getDiskProvisionPassesRequired`
passes of the disk's own face-value size — N for the array's Nth disk (1…9; `DISK_BUILD_COST_MULTIPLIER`'s
10 is no longer reached) — so a pool's buffer only ever needs to hold one pass at a time, and completes the
instant the final pass lands, with no separate build-time delay (see `docs/DESIGN_HISTORY.md`).
`diskBuild`/`tickProvisionDisk` and every "IO blocked mid-build" guard remain solely to finish a countdown
an older save may still carry — a new build never creates one. A manual click that doesn't finish the
build in one call auto-arms the **queue** (`diskBuildQueued`/`queueDiskBuild`/`tickQueuedDiskBuild`,
unconditionally wired into `tickGame`) so remaining passes fire as the buffer refills; only starting a
NEW disk's build needs a click. `queueDiskBuild` also arms the queue directly when the first pass isn't
affordable yet (or a higher-priority action outranks it) — the button's `disabled` prop requires only
that no build is in flight and the ladder isn't exhausted (see `docs/DESIGN_HISTORY.md` for the gap this
closed). The smallest size per pool has an always-full **read cache** (8 blocks) with first claim on that
pool's buffer over Provision Disk funding (`getPoolCacheReservationBits`, used by both
`isProvisionDiskAvailable` and `provisionDisk`), so it keeps filling while a build is queued (see
`docs/DESIGN_HISTORY.md`); every larger size fills via **write cache** — both at their own
bandwidth-multiplier rates. Byte Foundry funds Byte Factory **pull-based**, with no proactive knowledge
of tier state: every tick `tickDiskPull` pulls one FULL, clean-slate (zero purchase-level progress) disk
into its fixed (tier, level) correspondence (`getDataLakeTierIndex` grouping) whenever that tier sits at
exactly the disk's required level, completing the tier's whole current purchase block in one shot;
`tickDiskLevelOneCachePull` then covers every tier still at its own level 1 with no fresh disk pull this
tick, spending its pool's smallest-size read cache directly (bulk units, capped at the level's remaining
requirement) — never past level 1, never atop a level with existing progress. Both are fully automatic,
with no player click and no autobuyer-unlock gate; the manual Redeem button and the old
cache-release-to-Bits control are gone (see `docs/DESIGN_HISTORY.md`). Disks, caches, and build state are
all PERMANENT across every real Prestige. Full cost/timing formulas and pull-eligibility rule:
`docs/ECONOMY_REFERENCE.md`.

**Data Lakes** (`intro.dataLakes`, `DATA_LAKE_*` in `layers.js`, `fillDataLakeDisks`/`buyBooster`/
`tickDataLakeAutoConvert` in `engine.js`) — ten permanent lakes (KB…QB), decoupled from Disk builds, gated
on the pool having built at least one real disk (`isDataLakePoolReady`; before that `DataLakePanel`'s fill
tile reads a static "Locked"). Its **Booster-conversion control fills MANUALLY, capped at just enough for
its next Booster, until its matching pool is entirely COMPLETE (`isStoragePoolFullyBuilt` — all three
ladder sizes fully built); only then does full-buffer OVERFLOW also fill it AUTOMATICALLY** from that
pool's buffer (`tickPoolBufferFill`'s overflow branch, same gate). Separately, the lake draws directly
from its pool's buffer at the pool's Bandwidth (`tickDataLakePoolDrain`, right after
`tickPoolBufferFill`) under a fixed pool-buffer priority: disk filling > provisioning in progress > lake
filling — only while every BUILT disk is full and no build is in progress in that pool, the lake has
room, and the buffer holds more than the read cache's reservation (`isDataLakePoolDrainAvailable`; while
it applies, full-buffer overflow yields to it so a tick isn't credited twice; unprovisioned slots don't
block it, even before the pool is complete). It's independent of the Data Stream, so lakes keep filling while a running Upgrade Data Stream
pulls from the Data Stream. Manual fill (`fillDataLakeManually`/`isDataLakeManualFillAvailable`) spends
directly from that pool's buffer up to what the next Booster still needs, outside the forced priority
order, same as Buy. Not a standalone UI action: `DataLakePanel` has a single "🏷️ `<cost>`" control that
buys immediately (already affordable) or arms `intro.dataLakes[tier].autoConvertActive`;
`tickDataLakeAutoConvert` then drives `fillDataLakeManually` one step per tick until affordable, buys
exactly 1, and clears the flag — "one click, one full fill-then-buy conversion, then stop," never a
persistent auto-buy loop (see `docs/DESIGN_HISTORY.md` for the reversal this replaces). While converting
the control is an inert label; starting is refused (`isDataLakeAutoConvertStartAvailable`) once the
matching compute-ladder entity is at its cap. Overflow fills the lake's ×1/×10/×100 disks smallest-first,
one at a time, at the plain available rate — no artificial slowdown (an earlier tapered version was
removed, see `docs/DESIGN_HISTORY.md`). Each sub-size is capped at `DATA_LAKE_SUB_SIZE_DISK_CAPS` (9/9/9,
not 10/10/10 — mirroring `DISK_ARRAY_LADDER_CAP`'s 9), one unit short of each level's capacity
(1/10/100/1,000); the level's last unit fills through the lake's retained fill buffer, like a Storage
array's cache standing in for its 10th disk (`getDataLakeNextFillSubSize`/
`getDataLakeSlotRepresentableUnits`); a mixed-radix decomposition (`decomposeDataLakeUnits`) keeps the
disk-square breakdown exact with no leftover. Capacity is a purchasable decade-power ladder
(1/10/100/1,000 units, capped at level 3), advancing only once the CORRESPONDING Storage array size is
fully built. **Buying Boosters** (`buyBooster`) spends only banked lake units — outside the forced
priority order, available the instant affordable — at a `purchased + 1` cost (capped once capacity-maxed)
and instantly grants 1 compute-ladder entity, up to its effective cap (`COMPUTE_ENTITY_CAP`, 10 — or
`COMPUTE_ENTITY_AUTO_MERGE_CAP`, 18, once that tier's outbound merge boundary has auto-merge unlocked, see
Architecture 4b); a same-reference no-op at cap. **Stranded disks are never destroyed, and they DO still
feed the write cache — even when the target is stranded too.** A disk whose tier already moved past its
required level sits full and un-pullable for the rest of the cycle; nothing sweeps it into Bits (an
earlier "idle disk liquidation" mechanic was removed per the maintainer's explicit instruction).
`tickDiskWriteCache`/`canStartDiskWriteCacheMerge`/`isDiskWriteCacheCollectPaused` never gate on stranded
status, source or target — folding it into the next size up is its one remaining productive use
(`disks`/`disksBuiltTotal`/`diskWriteCache` are Prestige-permanent, so nothing is wasted). **Pool
isolation:** no pool ever consumes anything from another — a merge never crosses a pool boundary
(`canStartDiskWriteCacheMerge` compares `getPoolIndexForDiskSize`; `canDiskSizeFeedWriteCache(size)` is
false for each pool's largest size and gates `DiskArrayRow`'s stranded-disk tooltip;
`tickDiskWriteCache` cancels a legacy in-flight cross-pool merge still collecting, returning collected
disks to the source array and any excess as clamped bits to the source pool's buffer; one already
flushing completes), so each pool's largest size ends its chain and the next pool's smallest size fills
only via its own read cache. The only thing that still pauses a merge is an ACTIVE tier claim on the
source (Factory gets first crack at a disk it could pull this exact tick); see
`docs/DESIGN_HISTORY.md` for the two rounds of over-restriction this reverts. A stranded disk otherwise
waits for the next real Prestige to reopen its pull window. Full overflow-segment math, the
disk-breakdown mixed-radix proof, and every gating predicate: `docs/ECONOMY_REFERENCE.md`.

**Booster auto latch & lake replay.** `dataLakes[n].boosterAuto` latches (in `tickDataLakeAutoConvert`) the first time the pool is fully built (9/9/9); the lake then auto-buys every affordable Booster for the whole Era, through pool resets, `resetByteFoundry` (carried into the fresh lakes) and Prestige; only Era ascension clears it. `foundryResetCaps.lakes[n] = { capacityLevel, purchased }` records lake highs, and `tickFoundryResetConvenience` replays capacity upgrades and Booster buys up to them.

**Display conventions.** A Disk's in-square size label is a bare number (`formatDiskSizeBare`;
aria-labels/tooltips keep unit-suffixed `formatDiskSize`). A pool's/Data Lake's CAPACITY (and a lake's
balance) always renders in its own fixed unit (`formatDiskSizeInPoolUnit`) — a maxed KB lake reads
"1000 KB", never "1 MB". A pool's buffer BALANCE (`PoolBalanceText`) self-sizes below that unit
(`formatPoolBalance`/`formatPoolBalanceStable`, e.g. "398.3 KB / 1 MB"). Details:
`docs/ECONOMY_REFERENCE.md`.

**Smaller sizes after a Foundry reset (free auto-provisioning).** `getPresentedDiskSize` is the newest unlocked size (`getDiskLadderSizeBits(intro.unlockedDiskSteps)`, shown immediately even before its pool is reachable); `isLowerDiskSizePending` is true while `getDiskSize` (the smallest incomplete array) is smaller than it. In that state `tickAutoProvisionLowerDiskSizes` (in `tickStorage`, before `tickQueuedDiskBuild`) adds one EMPTY disk to the smallest incomplete array for free, then waits until every built disk of that size is full (ordinary read/write-cache fill) before adding the next — the `tickPoolResetReprovision` shape; it skips while that pool (or an earlier one) is rebuilding, during a legacy `diskBuild`, or before the Byte exists. While pending, `isProvisionDiskAvailable`/`queueDiskBuild` (hence `provisionDisk`, `tickQueuedDiskBuild`) are no-ops and `tickFoundryResetConvenience` skips its paid Provision Disk branch, so nothing is ever paid twice. `ByteFoundryPage` presents only the newest size, disabled with a "Rebuilding <size> first" note.

**Replay order.** After a Foundry reset `tickFoundryResetConvenience` replays Capacity and Speed upgrades up to their prior highs in order of increasing cost (Capacity costs the current Capacity, Speed its current basis; Speed is prioritised while armable, so it reaches the "needs Capacity" state before a Capacity upgrade is chosen): when no upgrade is running, the next pending, armable one is started through the ordinary progress-bar queue (`queueIntroCapacityUpgrade`/`queueIntroSpeedUpgrade`), so it is paid from the Data Stream by the usual drain; one at a time.
