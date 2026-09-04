# Design history & rationale

### Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04

Player feedback on the just-shipped Reclaim/Forfeit mechanics (previous entries) pointed out that
the two controls should never both be relevant at once: **Reclaim and Forfeit are mutually
exclusive, Forfeit needs confirmation, Reclaim is instant, and Forfeit should only show once the
boost is down to its last remaining stack and still active.**

Previously `ComputePage`'s `StackReclaimRow` rendered BOTH Reclaim and Forfeit unconditionally
whenever any boost was active, each independently disabled by its own gate
(`canReclaimComputeBoost`/`canForfeitComputeBoost`). This meant a multi-stack boost showed a live,
clickable Forfeit button right next to Reclaim the whole time — a player could accidentally forfeit
several stacks' worth of tokens outright (no refund) via a control that was always sitting there,
rather than being nudged toward Reclaim's incremental, refundable path first. Reclaim itself was
never hidden either — at exactly 1 stack it just sat visibly disabled, which read as confusing next
to an enabled Forfeit doing conceptually the same "end the boost" job.

Fixed by conditionally rendering exactly one of the two based on `intro.computeBoostStacks`, not
disabling one while leaving both visible: Reclaim renders (still subject to its own
`canReclaimComputeBoost` gate, including the pooled-time floor) only while `computeBoostStacks > 1`;
Forfeit renders only once `computeBoostStacks === 1` — the last remaining, still-active stack, where
letting it run out is the only other way to end it early. Stack itself is unaffected by this
change — it renders regardless of stack count, since it's not part of the Reclaim/Forfeit
exclusivity. Neither control's own underlying gate function changed; this was purely a rendering
condition added around each `CompactButton` in `src/pages/ComputePage/index.jsx`.

**Follow-up (same day): the standalone Forfeit button wasn't the only way to discard multiple
stacks.** Devin Review on the resulting PR pointed out a second path to the exact outcome the fix
above was meant to prevent: `ComputePage`'s preset buttons already offer a "forfeit-and-replace"
flow — clicking a DIFFERENT preset/tier while a boost is active confirm-guards then calls
`activateComputeBoost(boostType, tierIndex, forfeitConfirmed=true)`, which cancels whatever's
currently running (ALL its stacks, no refund) and starts the new one. This flow was untouched by
the rendering-condition fix above (it's a different button, `canActivateComputeBoost`'s own gate,
not `canForfeitComputeBoost`'s), so a player could still discard several stacks' worth of tokens
outright — just through a different control than the one just restricted. Fixed at the engine
level, not just the UI: `canActivateComputeBoost`'s forfeit-replace branch now also requires
`computeBoostStacks <= 1`, the identical restriction the standalone Forfeit button uses, so
switching to a genuinely different boost is only ever possible once Reclaim has whittled the active
one down to its last stack (matching `activateComputeBoost` itself enforcing this — not just a
UI-only disabled state, per this repo's existing "Security notes" convention). Existing tests
exercising `computeBoostStacks: 2` forfeit-replace scenarios (which had demonstrated exactly the
now-closed gap) were updated to `1`; new tests cover the blocked-at-multiple-stacks case at both
the engine (`canActivateComputeBoost`/`activateComputeBoost`) and component (`App.test.jsx`) levels.

**Second follow-up (same day): `canForfeitComputeBoost` itself still had no stack restriction at
all.** A further Devin Review round on the same PR pointed out the first follow-up above only
closed the preset-replace path — `canForfeitComputeBoost`/`forfeitComputeBoost` (the standalone
Forfeit action's own engine-level gate) still unconditionally allowed forfeiting a boost at ANY
stack count, contradicting the same repo convention just applied to
`canActivateComputeBoost`: the engine itself should enforce an invariant, not rely on the UI only
ever rendering the button under the right condition. In the shipped UI this specific gap wasn't
directly reachable by a normal player any more (the standalone Forfeit button had already stopped
rendering above 1 stack in the very first fix in this entry), but the underlying API itself still
disagreed with its own documented contract, and any other caller (present or future) would have
silently reopened the exact gap the whole day's work was closing. Fixed by adding the same
`computeBoostStacks <= 1` requirement to `canForfeitComputeBoost` directly, matching
`canActivateComputeBoost`'s own restriction — `forfeitComputeBoost` now becomes a same-reference
no-op whenever called on a boost still holding more than 1 stack, so all three surfaces (standalone
Forfeit button, preset forfeit-and-replace, and the raw action itself) now agree: forfeiting
anything is only ever possible once Reclaim has brought the boost down to its last stack.

The same review round also flagged, and this session investigated and declined, a claim that a
legacy save could have an active boost with `computeBoostStacks` missing/zero, leaving neither
Reclaim nor Forfeit rendered. `computeBoostType` and `computeBoostStacks` were introduced together
in the same commit (`9a71df4`, "Add Compute Boost activation and a Sacrifice confirmation") — there
is no earlier schema where one existed without the other — and every mutating code path
(`activateComputeBoost`/`stackComputeBoost`/`reclaimComputeBoost`/`forfeitComputeBoost`/
`tickComputeBoost`) keeps them in lockstep, always setting `computeBoostStacks >= 1` whenever
`computeBoostType` is non-null. No `save-migration/` entry references either field. This scenario
isn't reachable through any real player save or any engine-driven code path.

A later adversarial review of this same PR (re-reviewing after the `canForfeitComputeBoost` fix
above) noted one narrow exception outside that guarantee: Dev Mode's raw-JSON editor
(`DevModePage`, `applyDevGameStateJson` → `mergeStateForDevWrite`) deep-merges a caller-supplied
partial object onto the live dev-save state, so a deliberately crafted partial edit (e.g. just
`{ "intro": { "computeBoostType": "burst" } }` while `computeBoostStacks` still sits at its
existing `0`) CAN desync the pair — `storage.js`'s `mergeState` only shallow-overlays `intro` by
top-level key on load, it doesn't re-derive `computeBoostStacks` from `computeBoostType`. This is
accepted as-is rather than fixed: Dev Mode is a dev-build-only debug sandbox (never shipped to
players — see "Dev Mode" in `CLAUDE.md`) whose whole raw-JSON-editor feature is explicitly designed
to let a developer write arbitrary partial state for testing; guarding against every
internally-inconsistent state it could produce would defeat that purpose. The "unreachable through
any real save" claim above still holds for every player-facing and engine-driven path — only this
one deliberately-freeform dev tool is excluded.

### CLAUDE.md Economy model duplication trim — 2026-09-03

`CLAUDE.md`'s "Economy model" section had grown to 572 lines of formula/UI-rendering detail
already fully duplicated in `docs/ECONOMY_REFERENCE.md` (the Fill-based Speed/Bandwidth multiplier,
Data Stream Buffer/pool Memory Capacity, Disks, and Data Lakes subsections) — well past the 282
lines that motivated two earlier attempts at this same trim (#536, #542), both of which went stale
(merge-conflicted / fell behind `main`) before landing, as later feature PRs kept re-expanding the
section faster than the trims could merge. PR #566 verified every constant/function name being cut
was still present (and non-contradictory) in `docs/ECONOMY_REFERENCE.md`, and that
incident-specific rationale (e.g. the unfloored Data Lake overflow taper getting permanently stuck,
see this file's own entry below) was already covered here, before condensing each subsection to an
orientation paragraph with a pointer to the reference doc. Net: `CLAUDE.md` 1729 → 1333 lines
(-396, ~23%), with a new standing rule added to `CLAUDE.md`'s own "Documentation" section (keep
future additions terse and reference-doc-first) since a one-time trim alone doesn't fix the
recurring cause — see issue #537, which tracks the remaining "Architecture" section slice (blocked
on `docs/MAINPAGE_REFERENCE.md` staleness, tracked separately as #567).

Two file-tree entries in `CLAUDE.md`'s "Repo layout" carried embedded design-rationale prose (why a
component was made a shared standalone file) rather than a bare current-behavior fact — relocated
here in the same PR, per `CLAUDE.md`'s own header rule that rationale belongs in this file, not
inline in the file tree.

**`components/DiskArrayRow`** — extracted so both `ByteFoundryPage` and `StoragePage` can render
identical, fully interactive disk detail — read cache blocks, disk squares, releasing, redeeming —
from one shared component instead of duplicating that logic per page. (Note: the original CLAUDE.md
sentence being relocated here claimed `ByteFoundryPage` only ever showed "the single currently-
active/buildable size," which was already stale before this relocation — both pages in fact render
every size from the shared `getDiskSizesToShow(state)` helper, ascending; corrected here rather than
propagated.)

**`public/`'s old create-react-app-era files** — `index.html`/`manifest.json`/`logo192.png`/
`logo512.png` were unused dead weight (this is a Vite app — Vite's own root `index.html` is what's
actually served) and were removed rather than left in place to confuse the newer PWA manifest
(`docs/PWA_REFERENCE.md`) sitting alongside them.

### Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03

Follow-up player feedback on the just-shipped Provision Disk queue toggle (previous entry) surfaced
a real UI bug and asked for several Data Lake mechanic changes, plus an unrelated Compute Boost
change, all landed together on the same PR/branch.

**1. Giant-circle CSS bug.** At a lake's fresh capacity level (0 — "1 unit"), only ONE `LakeSquare`
renders in its `LakeSizeRow` (`display: flex; flex-wrap: nowrap`). `LakeSquare`'s own `flex: 1 1
1.2rem` (`flex-grow: 1`) meant a lone square stretched to fill the ENTIRE row width — combined with
`border-radius: 50%`/`aspect-ratio: 1`, a single circle several times its intended size. Fixed with
a simple `max-width: 2.5rem` cap — preserves the existing "grow to fill nicely" behavior for a
fuller row (9-10 items) while bounding a near-empty row's item size sanely.

**2. Data Lake unlock (`isDataLakePoolReady`) now requires a real Storage disk.** Previously, a
lake's OWN progress was entirely self-contained: `tickPoolBufferFill`'s overflow branch fed it the
moment a pool's Memory buffer was completely full, regardless of whether the player had ever built
a single physical disk for that pool, and Boosters unlocked (`boostersUnlocked`, latched
permanently) the moment the LAKE's own first disk completed — a lake could unlock Boosters before
any real Storage progress existed at all. New `isDataLakePoolReady(state, tierIndex)` —
`disksBuiltTotal[that pool's own ×1 size] > 0` — now gates BOTH: `tickPoolBufferFill`'s overflow
branch won't feed a lake until a disk exists for that pool (the reserved production simply stays as
ordinary Bits that tick, same "nowhere to put it, don't destroy it" posture the lake-maxed case
already had), and `isDataLakeBoosterUnlocked` now follows the SAME condition instead of the lake's
own `boostersUnlocked` latch. The old stored `boostersUnlocked` field is kept and still read as a
fallback OR (`isDataLakeBoosterUnlocked = storedFlag || isDataLakePoolReady(...)`) purely for
old-save compatibility — `disksBuiltTotal` is itself permanent and monotonic, so the new condition
needed no separate latch/state field of its own, and `fillDataLakeDisks`' own redundant `boostersUnlocked
= true` write on the lake's first completed disk was left in place harmlessly (under the new
overflow gate it can now only ever fire after `isDataLakePoolReady` is already true anyway).

**3. Data Lake capacity upgrades now tied to Storage array completion, not the lake's own cost
curve.** `isDataLakeCapacityDoublingAvailable` previously fired once a lake's own escalating next
Booster cost (`purchased + 1`) exceeded its current capacity — a condition entirely internal to the
lake's own economy, disconnected from real Storage progress (superseding an even earlier "the lake
is full" condition). New rule: level 0→1 (to reach capacity 10) requires the pool's smallest (×1)
disk array fully built (all `DISK_ARRAY_LADDER_CAP` = 10); level 1→2 (100) the middle (×10) array;
level 2→3 (1,000, maxed) the largest (×100) array — one array per capacity step, matching
`DATA_LAKE_SUB_SIZES`' own 3-entry shape exactly. New private helper
`getDataLakeCapacityUnlockArraySize(tierIndex, level)` resolves the required disk-ladder size via
the existing `getDataLakeSubSizeStep`/`getDiskLadderSizeBits` primitives — no new state, no new
constants. This BREAKS the old "mutually exclusive with buying a Booster by construction" guarantee
(cost ≤ capacity buy-side vs. cost > capacity upgrade-side, structurally impossible to overlap under
the old rule) — under the new rule a lake CAN simultaneously afford its next Booster and have its
next array already complete. `DataLakePanel`'s single-button-slot repurposing (Upgrade vs. Buy)
still works unchanged (the same `upgradeAvailable ? Upgrade : unlocked ? Buy : locked-text` ternary),
now simply preferring Upgrade whenever both apply — advancing capacity unblocks every future Booster
too, so it's the more valuable of the two once available. This also means "do not show the Upgrade
button unless eligible" (an explicit ask) falls out for free from the same ternary — no separate
hide/disable logic was needed, only the underlying predicate changed.

**4. New `LakePoolTile` — always visible, not gated behind unlock.** A player reported watching a
lake's Data Lake section eventually "start filling up after some time" with "no idea what it did in
between" — traced to the FIRST version of this new tile (a small `FillableStatCard`-style element
surfacing the same `fillBits`/`getDataLakeCurrentDiskFillFraction` progress the per-square fill
overlay already tracked, added specifically so this progress reads as its own explicit element
rather than only a sliver on one small square) being gated on `unlocked` (the pool-readiness
condition from #2) — before that, the section showed NOTHING at all, so the tile's first appearance
was already mid-progress with no visible history. Fixed by decoupling the tile's OWN visibility from
unlock state entirely: it now renders whenever an open slot exists at all
(`currentFillSubSize !== null`, true almost always until a level is fully maxed), reading a static
"Locked · 0 / `<size>`" before `isDataLakePoolReady`, and the real "`<fillBits>` / `<size>`" fill
reading once unlocked — continuous feedback throughout, not a sudden appearance.

**5. Compute Boost reclaim can no longer cancel a started effect outright.** `canReclaimComputeBoost`
previously required only "any boost currently active," letting a player reclaim a boost's OWN LAST
stack — the one actively producing its effect — clearing it back to fully inactive, functionally
canceling a running boost via Reclaim (a separate `forfeitComputeBoost` action already exists for
"cancel with no refund"; this let Reclaim do the same thing WITH a refund, which wasn't the intended
distinction between the two actions). New gate: `computeBoostStacks > 1` — reclaiming now always
leaves at least 1 stack behind, so an active boost's own effect can never be pulled back below
"running," only quantity held IN ADDITION to that floor. `reclaimComputeBoost` itself simplified
accordingly: the `nextStacks <= 0` branch (which used to clear the boost fully) became dead code
under the new gate (a call is now only ever reachable with `stacks > 1`, so `nextStacks =
stacks - 1` is always `>= 1`) and was removed. The exact-inverse relationship this action documents
shifted too — reclaim is now the inverse of `stackComputeBoost` specifically, not of
`activateComputeBoost` (a freshly-activated 1-stack boost can no longer be reclaimed at all).

**6. PoolCard vertical spacing tightened** (a player screenshot flagged "too much wasted space"
below a pool's own title/gauge/rate header row) — `PoolCard`'s own `gap` reduced from
`theme.space.md` (0.6rem) to `theme.space.sm` (0.4rem), and `PoolSummaryButton`'s own padding made
asymmetric (`theme.space.sm` on top/left/right, `0.15rem` on the bottom specifically) rather than
uniform on all four sides — the button's own bottom padding was compounding with the card's `gap`
right where the header row meets the Memory buffer tile below it, visibly wider than the rest of the
card's own spacing rhythm.

**7. Two follow-up bugs in #4 and #5 above, both caught by Devin Review on the same PR before merge.**

- **Reclaim's `stacks > 1` gate (#5) wasn't actually sufficient.** `computeBoostRemainingSeconds` is
  a single POOLED timer shared across every stack the boost holds, not N independent per-stack
  timers — `stackComputeBoost` just adds one flat duration chunk onto it each time. That means a
  multi-stack boost late in its own countdown can hold LESS pooled time remaining than even one
  stack's own base duration, so `stacks > 1` alone could still let a reclaim subtract a full stack's
  duration and floor the pool straight to 0 via `reclaimComputeBoost`'s own `Math.max(0, …)` clamp —
  ending the boost's real running effect exactly as if its last stack had been reclaimed, the precise
  outcome #5 set out to prevent. Fixed by adding a second condition to `canReclaimComputeBoost`:
  `computeBoostRemainingSeconds - stackDuration > 0`. The `Math.max(0, …)` inside
  `reclaimComputeBoost` itself is now purely defensive — the new gate guarantees it never actually
  clamps in practice.
- **`LakePoolTile` (#4) read the wrong predicate for its pre-fill "Locked" placeholder.** It decided
  whether to show real fill progress using `isDataLakeBoosterUnlocked` (`unlocked` in
  `DataLakePanel`), but that predicate's own old-save-compatibility OR fallback
  (`storedFlag || isDataLakePoolReady(...)`, from #2 above) means it can read true on an old save
  whose legacy `boostersUnlocked` flag is already set even though the matching Storage pool has never
  built a real disk — correct for the Buy button (Boosters should stay purchasable there), but wrong
  for this tile: `tickPoolBufferFill`'s overflow branch — the only thing that ever actually advances
  `fillBits` — is gated on `isDataLakePoolReady` ALONE, with no such fallback, so the tile would
  display real (permanently frozen) fill data as if it were actively progressing. Fixed by
  introducing a separate `poolReady = isDataLakePoolReady(state, tierIndex)` value and keying the
  tile's fill fraction/title/label on that instead of `unlocked`, leaving `unlocked` itself unchanged
  for the Buy/Auto-buy button logic.

**8. The `LakePoolTile` fix in #7 above was itself incomplete — the SAME misrepresentation survived
on two other, more prominent surfaces reading the identical underlying fill data**, caught by the
adversarial `code-reviewer` subagent on a re-review of the same PR. `ByteFoundryPage`'s own pool
gauge and standalone "Data Lake" bar, plus `DataLakePanel`'s per-square `LakeSquare` fill overlay,
all read `getDataLakeCurrentDiskFillFraction`/`getDataLakeOverflowRatePercent`/`currentFillSubSize`
directly with no `isDataLakePoolReady` check anywhere — only `tickPoolBufferFill`'s WRITE side (the
overflow branch that actually credits a lake) had been gated by #2/#7 above; nothing gated these
READ side consumers. Concretely: the gauge switched to `mode="lake"` purely on `poolBufferFull`
(`ByteFoundryPage`), so ANY pool whose local Memory buffer fills before its first disk is
built — pool 1 in particular, visible and fillable from the very start of Storage, with no
dependency the other way — would show a constant `DATA_LAKE_OVERFLOW_MAX_PERCENT` (50%) "incoming
rate" that can never actually turn into progress, since the overflow branch that would credit it
never fires while `isDataLakePoolReady` is false. This wasn't a hypothetical: a **pre-existing,
unmodified-by-that-PR test** (`App.test.jsx`'s pool-gauge-transition test) seeded exactly that state
(a full buffer, no `disksBuiltTotal`) and asserted the 50% reading as *correct* behavior — the
repo's own test suite had locked in the bug. `DataLakePanel`'s `LakeSquare` overlay had the matching
gap on old-save `fillBits` specifically (the same legacy scenario #7 fixed for `LakePoolTile`).
Fixed by threading the same `isDataLakePoolReady` check through all three: the gauge now only
switches to lake mode (`showLakeMode = poolBufferFull && poolReady`) once the lake can actually
receive it, staying in ordinary multiplier mode otherwise (which reads a real, accurate
`FILL_MULTIPLIER_MIN_PERCENT` at a full-but-not-ready buffer, not a fabricated value); the
standalone Data Lake bar reads a flat 0% before `isDataLakePoolReady` rather than any residual
`fillBits` a legacy save might already hold; `LakeSquare`'s `isFillingThisSize` is now
`poolReady && currentFillSubSize === subSize`. The pre-existing test was updated to seed a built
disk (keeping its original "clean transition" assertion meaningful) and a new sibling test asserts
the not-ready case explicitly. This is the second time in the same PR the same fix pattern needed
applying to more than one consumer of shared derived data — a reminder that gating a WRITE path
(the engine tick) doesn't automatically gate every READ path (every UI surface) deriving from the
same underlying fields; each consumer needs its own explicit check.

**9. `canReclaimComputeBoost`/`reclaimComputeBoost`/`canStackComputeBoost`/`stackComputeBoost` were
missing the `?? 1` legacy-tierIndex fallback `getComputeBoostMultiplier` already used**, caught by
Devin Review on a later round of the same PR. `intro.computeBoostTierIndex` didn't always exist —
`getComputeBoostMultiplier`'s own comment already documented that a save from before that field
existed can have an active boost with it missing (reading as `null` after `mergeState` fills it from
`createInitialGameState`'s own default). `getComputeBoostTierDurationSeconds`/`getComputeBoostTierField`
both treat an invalid (non-integer) `tierIndex` as 0/`null` respectively — so, for such a save, the
new pooled-time gate in #7 above computed `stackDuration = 0`, which made `canReclaimComputeBoost`
ALWAYS pass (any positive remaining time clears `- 0 > 0`), and `reclaimComputeBoost` would then
resolve a bogus `"null"`-keyed field via `getComputeBoostTierField(null)` instead of refunding a
real token, while `computeBoostRemainingSeconds` stayed untouched (subtracting a duration of 0) —
real state corruption, not just a display bug. `canStackComputeBoost`'s own version of the same gap
was milder: `getComputeBoostTierField(null)` returning `null` made it always return `false`, simply
disabling Stack outright for such a save rather than corrupting anything. Fixed by applying the
same `?? 1` fallback at every read site (`canReclaimComputeBoost`, `reclaimComputeBoost`,
`canStackComputeBoost`, `stackComputeBoost`) — `activateComputeBoost`/`tickComputeBoost` don't need
it: the former's `tierIndex` is always a fresh, valid, caller-provided value (never read from stored
state), and the latter never calls either tier-keyed helper at all.

**10. A disabled-but-available Data Lake Upgrade button could hide an immediately-clickable Buy
button**, caught by the adversarial `code-reviewer` subagent on yet another re-review round of the
same PR. This is a direct consequence of #3 above (Data Lake capacity upgrades tied to real Storage
array completion): that change explicitly "BREAKS the old 'mutually exclusive with buying a Booster
by construction' guarantee," creating a real window where `isDataLakeCapacityDoublingAvailable`
(`upgradeAvailable`) is true but `isDataLakeCapacityDoublingTurnAvailable` (`canUpgrade`) is false —
Upgrade blocked by the forced priority chain — while `isBoosterPurchaseAvailable` (`canBuy`) is
simultaneously true. `DataLakePanel`'s action-slot ternary claimed the slot for Upgrade purely on
`upgradeAvailable`, so in that window it rendered a dead, disabled Upgrade button while an
affordable, immediately-clickable Buy sat entirely hidden — `buyBooster` is explicitly NOT part of
the forced priority chain and documented as "always available the instant it's affordable," so a
player had no action to take even though one genuinely existed. Fixed by changing the slot's own
claim condition to `upgradeAvailable && (canUpgrade || !canBuy)` — Upgrade only claims the slot when
it's actually clickable, or when Buy isn't an option either (nothing else to do, so showing the
pending Upgrade goal is still the more informative choice); otherwise Buy takes the slot, matching
its own documented "isn't part of the forced priority order at all" status.

### Provision Disk gets a "queue next build" toggle — closing a real automation gap — 2026-09-03

A player reported the write-cache/read-cache path (fixed in the immediately preceding PR #562)
still looked "starved" for 10 KB disks specifically: "cache blocks get filled and emptied without
actually doing anything." Investigation with real engine calls (a throwaway Vitest scratch file,
deleted before concluding, per this repo's usual empirical-verification method) ruled out a bug in
`tickDiskWriteCache` itself — an isolated test with 10 pre-filled source disks and a pre-built
target container completed the merge correctly. The actual cause: `getDiskSize` only advances the
disk ladder from 1 KB to 10 KB once `disksBuiltTotal[1KB]` reaches `DISK_ARRAY_LADDER_CAP` (10) —
and `disksBuiltTotal` only ever increments via `provisionDisk`, which had **zero automation
anywhere in `tickGame`**: `tickProvisionDisk` only counts down a build already in progress; nothing
ever auto-STARTS one. Every other Foundry step already runs itself once its own gate clears — cache
fill (`tickDiskAutoFill`), the write-cache ripple (`tickDiskWriteCache`), disk redeem
(`tickDiskAutoRedeem`, opt-in via the matching tier's autobuyer) — and Capacity ×2 even has its own
"arm it before the buffer is full" queue (`queueIntroCapacityUpgrade`/`capacityUpgradeQueued`) for
exactly this kind of missed-instant problem. Provision Disk had none of that, so a player who wasn't
proactively re-clicking it 10 separate times per size (once per disk, before the ladder even offers
the next size) would watch the cache faithfully refill/redeem the same 1–2 disks forever without
ever seeing new sizes appear — matching both of the player's own observations exactly.

Two clarifying rounds with the player (via `AskUserQuestion`) confirmed the diagnosis before any
fix was written: (1) they had never seen a single 10 KB container provisioned, and (2) Compute/
Boosters activity was minimal in their save (ruling out the *other* plausible blocker — Capacity ×2
also requires Compute unavailable, and a save with perpetual Compute activity could stall Capacity
growth by an entirely separate path). A third question asked directly how to close the gap: fully
automatic firing (matching cache-fill/redeem's own unconditional automation), a queue/arm toggle
matching Capacity's own precedent, or leaving it manual and only improving in-game guidance. The
player chose the queue approach — the smaller, more conservative change of the three, since full
automation would remove manual clicking from the core loop entirely (a real pacing decision, not a
clear-cut bug fix) while "leave it manual" doesn't actually solve the reported problem.

**Implementation notes.** `intro.diskBuildQueued` (new state field) is armed via `queueDiskBuild`
and disarmed via `clearDiskBuildQueue`, mirroring `queueIntroCapacityUpgrade`'s exact shape
(same-reference no-op while already armed, while a build is already in flight, or while nothing is
left to ever build — `isDiskLadderExhaustedForActivePools`). `tickQueuedDiskBuild` fires
`provisionDisk` itself once affordable (deferring to `provisionDisk`'s own
`isProvisionDiskTurnAvailable` guard rather than duplicating it), and is wired into `tickGame`'s
`tickStorage` right after redeem/cache-release and before idle-disk liquidation — the same rank an
ordinary manual Provision Disk click already holds in the forced priority order. `provisionDisk`
itself unconditionally clears `diskBuildQueued` the moment ANY build starts, whether that start came
from the queue firing or an ordinary manual click, so a stale queue can never double-fire against
the next build.

**Two deliberate departures from the Capacity queue's own precedent**, both because this one is
actually meant to be used, not just retained for legacy save compatibility (`capacityUpgradeQueued`'s
own comment: "retained for save compatibility with the historical Sacrifice flow" — it is
unconditionally cleared on every save load by `normalizePoolMemoryCapacity` and, more importantly,
**was never wired to any UI control at all** — `queueIntroCapacityUpgrade`/`clearIntroCapacityUpgradeQueue`
exist only in `engine.js` and its tests, with no button anywhere calling them, so in live gameplay
today it can only ever be set via Dev Mode or a legacy save and is otherwise dead from the player's
perspective):
1. **`diskBuildQueued` is NOT cleared on save load.** The entire point is a persistent "keep
   building for me" intent; clearing it on every reload would force re-arming every session,
   defeating the purpose for a page players may not revisit often. `mergeState`'s ordinary
   fill-missing-fields-from-`createInitialGameState()` behavior already gives old saves a correct
   default of `false`, so no dedicated load-time handling was needed at all.
2. **`diskBuildQueued` IS wired to an actual UI control** — a small pin-icon `QueueToggleButton`
   (styled after MainPage's own `PauseToggleButton` — a plain icon toggle subordinate to the
   primary action beside it, see #171) inside a new `ProvisionDiskRow` wrapper, right next to the
   Provision Disk button on `ByteFoundryPage`. Verified end-to-end in a real browser (Playwright
   against `yarn dev`, scratch script deleted afterward): seeding an unaffordable pool buffer, arming
   the toggle, confirming Provision Disk stays disabled and the toggle shows its armed/cancel state,
   then — with zero further clicks — watching the pool buffer's live production fill it and the
   build actually start on its own once affordable.

`diskBuildQueued` is PERMANENT across a real Prestige (carried forward in `prestigeGame`, same as
`diskBuild`/`disks`/`poolBuffers`) since Storage itself never resets with an ordinary Prestige, but
resets to `false` on Era ascension and a full Reset like the rest of the Foundry, since neither
carries `diskBuildQueued` forward in their own intro-rebuild (`buildEraIntroReset`/
`createInitialGameState()`).

### Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02

Follow-up requests on the corner-speedometer-gauge PR (#555, itself following #552's fill-based
Speed/Bandwidth multiplier) asked for three changes to that same mechanic:

**1. The Byte Foundry gate is no longer replayed every real Prestige.** Previously,
`intro.mainGameUnlocked` reset to `false` on every real Prestige and Era ascension
(`prestigeGame`/`buildEraIntroReset`), so each cycle briefly re-showed the Byte Foundry as a
mandatory gate again until the always-on auto-convert (`tickIntroAutoInvest`) or a manual transfer
crossed `tier01`'s own starting per-unit cost — a "fast pit-stop," not a full replay, but still a
real per-cycle detour. The maintainer explicitly asked to make this permanent: "Tap button in
Foundry should be removed on reaching 1KiB and simultaneously main game shall be revealed. Once
revealed, the main game should always be reachable and never gated behind anything." Clarified via
two confirmed decisions: (a) unify the reveal trigger with the SAME "1 KiB" Storage-capacity
threshold that already reveals Storage pools and switches the Data Stream tap into
fill-multiplier-bonus mode (`isStorageUnlocked`), rather than the earlier, smaller, slightly-earlier
threshold auto-convert happened to fire at — so the two now trigger simultaneously; (b) make the
latch PERMANENT — never reset by a real Prestige or an Era ascension again once it has ever fired.

New exported `latchMainGameUnlocked` (`engine.js`) is now the sole place `intro.mainGameUnlocked`
is ever set `true`: a same-reference no-op both below the threshold and once already latched.
`convertIntroBitsToKilobytes`/`tickIntroAutoInvest` had their own `mainGameUnlocked: true` side
effects removed entirely — they still fund `tier01` purchases every cycle, forever, but no longer
touch the flag. `latchMainGameUnlocked` is called unconditionally as the very first step of
`tickGame` (ahead of `tickFillMultiplierDecay`) for the ordinary case, and ALSO synchronously
inside `upgradePoolCapacity`'s own return value, so a manual Capacity ×2 purchase (or a queued
upgrade firing) reveals Factory within the same state transition rather than waiting up to one tick
— the same "instant reveal, don't wait for the next tick" precedent `computeMergePageUnlocked`
already set for a different one-time-ever reveal. `prestigeGame` and `buildEraIntroReset` both
changed from unconditionally resetting `mainGameUnlocked` (via the `...initial.intro` spread with
no override) to `state.intro?.mainGameUnlocked ?? initial.intro.mainGameUnlocked` — carrying it
forward once set, same shape the Byte generator/Disks/Compute entities already used for their own
permanence. The ONE place this flag still resets to `false` is a full Reset
(`createInitialGameState()` called fresh) — a genuinely new save, not a new cycle.

This is a deliberate, hard-to-reverse change to the core Prestige loop, confirmed directly with the
maintainer before implementing (not inferred) — a later session re-introducing a per-cycle reset
here would be reverting an explicit, considered decision, not fixing a bug. The underlying economy
is UNCHANGED: resources/owned tiers/purchase-block progress still reset every cycle exactly as
before, and a player still needs Foundry-earned currency to actually afford anything — only
Factory's *reachability* became permanent, not the numbers behind it. `App.jsx`'s
`showingFoundry`/`GATE_EXEMPT_PAGES` routing logic needed no code change at all, since it already
derived off `intro.mainGameUnlocked` rather than assuming it resets — the gate resolving just
reveals whatever `page` already was.

**2. Fill-multiplier effect beyond the 200% cap is now lost instantly, not banked.** The existing
tap-bonus mechanic (#552) already clamped each individual tap to the cap's remaining headroom, but
a bonus already at/near the cap could still sit banked in `dataStreamTapBonusPercent`/
`poolTapBonusPercents` as dead weight if the BASE (fill-based) value later dropped — e.g. a tap
landed while the buffer was nearly full (a low base, wide headroom), then the buffer drained,
raising the base back toward the cap and leaving no real room for the bonus that was already there.
The maintainer's direct instruction: "Effect beyond 200% should always be lost instantly. 200% is
the hard cap for total effect." `tickFillMultiplierDecay` now also truncates whatever bonus remains
down to the cap's CURRENT headroom every tick, independent of its own elapsed-time-scaled decay —
discarding excess immediately rather than letting it decay away or resurface as a "real" boost once
the base later dropped. Same-reference no-op preserved when stored bonuses are already within
headroom, so this doesn't disturb the engine's "same reference = no purchase/tick happened"
convention autobuyer/tick loops depend on.

**3. The gauge moved from a corner overlay to living inside the tile itself.** The initial
gauge-swap PR positioned `MultiplierGauge` as a `position: absolute` sibling layered over the outer
`DataStreamCard`/`PoolCard`. Per "Use identical component layout for data stream and pool memory.
The speedometer should be inside that component," the gauge now renders as a child of the shared
`FillableStatCard` tile itself (`position: relative` moved from the outer card onto
`FillableStatCard`) — identically for the Data Stream and every pool's own Memory buffer tile, since
both already reuse that one component. A pool's gauge is specifically a child of its Memory tile
(the tap `<button>`), not of `PoolCard` or a sibling of `PoolSummaryButton` — an early doc pass
mis-described it as "a sibling of both, a direct child of PoolCard," caught and fixed by a review
pass partway through.

**yarn test**: 1683/1683 green (new coverage: a dedicated `latchMainGameUnlocked` describe block;
three new `tickFillMultiplierDecay` tests for the instant-truncation behavior; `prestigeGame`/
`eraGame`/`convertIntroBitsToKilobytes`/`tickIntroAutoInvest` tests rewritten for the new permanent
semantics; `App.test.jsx` and `storage.test.js` tests updated to match). `yarn build` succeeds.
`e2e/prestige.e2e.js`/`e2e/meta-prestige.e2e.js` updated to assert the gate stays permanently
unlocked across Prestige/Era ascension rather than resetting.

### Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31

#431 (closing #399) had renamed this screen from "Factory"/"Byte Factory" to "Ladder" specifically
to avoid colliding with Compute/Flops "tier" terminology. Six days later the maintainer explicitly
asked to rename it back to **Byte Factory** (short nav label **Factory**) — the AppNav item, the
MainPage `<h1>`, the Factory | Upgrades peer tabs, `DiskArrayRow`'s cache-transfer copy ("to Factory
Bits"), Settings danger-zone / confirm-dialog copy, the Guide, and the DevModePage quick-seed preset
all reverted. Flagged the direct conflict with #399's own stated rationale before making the change;
the maintainer confirmed they wanted to proceed anyway.

This is a pure naming reversal with no mechanical difference — internal identifiers
(`page === 'game'`, `showTiers`, `hasTiersAttention`/`hasTiersGameAttention`) and the pre-existing,
unrelated **Factory Bytes** resource pool (`BYTES_ID` — the Byte Foundry's own Bytes currency,
already called "Factory Bytes" even during the "Ladder" era per #399's own out-of-scope note) were
untouched by either rename. If this screen's name is revisited again, note that it has now thrashed
between "Factory" and "Ladder" twice — check with the maintainer rather than re-guessing, since
#399's Compute/Flops-tier-collision concern still applies to whichever name is *not* current.

### Storage pools derive from one Data Stream; Capacity ladder restored (#456) — 2026-08-27

The reviewed storage-pool model keeps exactly one Data Stream generator. Pools 1–10 are derived
views: every unlocked pool paces at the shared Data Stream's Bandwidth, while each pool's Capacity
is the shared Memory ceiling clamped into its own chained bounds. Completing all three disk arrays
in a pool derives the next pool, extends the disk ladder, and moves the shared Capacity ceiling to
that pool's end bound.

This reverses #506's snap-to-end behavior. Combine, load normalization, and Era no longer force
Capacity to a pool endpoint; Capacity ×2 is again a full-Buffer doubling ladder, draining the Buffer
and stopping at the active ceiling. The reversal preserves gradual progression while allowing the
ceiling to expand as storage pools unlock. Player-facing and engine operation terminology now says
**Provision Disk**, but the persisted `intro.diskBuild` key remains unchanged for save compatibility.

### Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27

Maintainer revised epic #456's naming before pools 2–10 ship. Today's Foundry "Memory" conflated
the tap/production intake with the per-pool generator. Split:

- Foundry intake → **Data Stream** (capacity = **Buffer**; **Bandwidth** name kept for the
  global rate concept; pool rate UI is **Speed ×2**)
- Each storage pool → **Memory** with **Capacity** start/end from the shared binary ladder
  (`getStoragePoolMemoryBounds`) — no Sacrifice doubling button, because pools are delimited
  directly by those bounds

This interim behavior was later reversed by the reviewed #456 implementation: Capacity ×2 and its
full-Buffer doubling ladder returned, with a moving ceiling as storage pools unlock. Speed/Invest
upgrades stay. Alternatives considered for Data Stream: Bit Stream, Intake, Channel, Pipeline.

Tracked as interactive issue #506 (revises #456).

### Sacrifice confirm: in-game dialog; Core warning only when unlocked

Sacrifice for 10x Capacity used a native `window.confirm` that always warned about future Cores
costing more — even before Compute existed. Replaced with `components/ConfirmDialog` (theme
StatCard overlay). The Core-cost warning line only appears once
`isComputeCoreConversionUnlocked` is true.

**Superseded (see "Removing Claim Core" below):** the "every future Core will cost more" line
itself was removed once Cores stopped being minted from a Memory flush at all — the
`isComputeCoreConversionUnlocked`-gated warning in the dialog now only covers the still-accurate
"this wipes all held Compute tokens" line.

**Superseded again — 2026-08-25:** the confirm dialog itself was removed at the maintainer's
request. Clicking "Memory ×2" now fires `pickIntroCapacityMilestone` immediately, with no prompt —
same as every other Byte Foundry action (Combine, Invest, Disk Build, Disk Fill/redeem all fire
directly on click already). `components/ConfirmDialog` remains in use elsewhere (SettingsPage's Era
ascension) — this only removed its one Sacrifice call site.

This file holds the **why** behind decisions in `CLAUDE.md`: incident write-ups, empirical simulation
results, superseded designs, and the reasoning for choices that aren't self-evident from current
behavior alone. `CLAUDE.md` states what the system currently does and is what loads into every
session automatically; this file is for when you need to know *why* it does that — before changing a
formula, workflow, or UI mechanic that a past iteration already tried and rejected for a specific
reason, check here first so you don't re-discover the same dead end. Sections mirror `CLAUDE.md`'s
structure so you can jump to the matching topic.

## Automation workflows

### Stale `blocked` labels after Workflows: write landed — 2026-08-20

`GH_AUTOMATION_PAT` missing `Workflows: write` was a real Phase A killer through mid-July 2026:
any push whose reachable history touched `.github/workflows/**` was rejected, so a large
`claude-task` chain (#35–#37, #51–#52, #53/#55/…, #75, …) got the `blocked` label. A 2026-07-29
re-test after a claimed grant still failed (see #69), #69 was landed interactively (#209), and
the dependent issues kept their labels. By 2026-08-20 the maintainer confirmed the scope is on
the PAT, but Phase A was still empty of implementable work: the guard excludes `blocked`-labeled
issues, and the three remaining unlabeled candidates (#52/#139/#140) soft-skip on open
`Blocked by #N` parents (#51 still `blocked`; #138 `blocked` for a separate subjective UI
judgment). Clearing the PAT-era labels (keeping #138) and fixing the docs that still said the
PAT lacked the scope is what unsticks the backlog — not another settings-page change.

### Schedule retune (Cursor IST slots + Claude twice-daily) — 2026-08-20

Cursor's maintenance twin originally ran on a UTC cron offset ~2.5h from Claude's every-5-hours
`0 */5 * * *` (`30 2,7,12,17,22 * * *`). That kept the two engines from colliding but tied both
cadences to UTC arithmetic rather than the maintainer's IST wall clock, and treated every Cursor
wake identically (Phase 0/A/B).

The retune (issue #339):

- **Cursor** — five fixed IST slots: 6:30am / 11:30am / 4:30pm / 9:30pm for development, plus a
  dedicated **1:30am housekeeping** run. Housekeeping is meta only (conflicted PRs, backlog
  planning, process improvement) and deliberately does **not** skip for the 5-PR ceiling — a full
  ceiling is when unblocking conflicted auto-merge PRs matters most. The two crons stay separate
  so `github.event.schedule` can select the mode; folding them into one expression would silently
  drop the split.
- **Claude** — cut from every 5 hours to **twice daily** at 9:00am / 9:00pm IST (`30 3,15 * * *`
  UTC). Exact clock times were a judgment call (the request specified count only); 9am/9pm IST sit
  clear of every Cursor slot so the engines still never wake together.

IST = UTC+5:30, so IST `:30` maps to UTC `:00` for Cursor and IST `:00` maps to UTC `:30` for
Claude — do not "simplify" the minute fields without re-checking that mapping.

### Why a PAT instead of the default `GITHUB_TOKEN`

All three workflows authenticate with `GH_AUTOMATION_PAT` instead of `GITHUB_TOKEN`. This isn't
optional: GitHub does not let commits, pushes, or merges authored by the default `GITHUB_TOKEN`
trigger other workflows (an anti-recursion safeguard). With the default token, `ci.yml` would
silently stop re-running on the bot's own pushed fixes, and `deploy.yml` would silently stop firing
when the bot's PRs get merged to `main`. A PAT for these specific operations avoids that gap without
any workaround.

### Permission block reasoning

`autonomous-maintenance.yml` and `autonomous-pr-followup.yml` need `id-token: write` because
`claude-code-action`'s `claude_code_oauth_token` auth path requests a GitHub Actions OIDC token as
part of its setup; without that permission the step fails immediately with "Could not fetch an OIDC
token" before ever reaching the actual task. `pr-auto-merge.yml` doesn't invoke Claude, so it doesn't
need this. `autonomous-maintenance.yml` additionally needs `issues: write` — an explicit
`permissions:` block zeroes out everything unlisted, and without the issues permission the guard
step's `gh issue list --label claude-task` (which runs with the default `GITHUB_TOKEN`) silently
returns an empty backlog, so every run skips Phase A and falls through to the Phase B menu.

### Turn-budget history

`--max-turns` is a best-effort proxy for cost, not a hard programmatic budget cutoff — every tool
call counts as a turn, and a real implement-test-PR run needs 30–50 of them.
`autonomous-maintenance.yml`'s cap started at 25 and was raised in two steps after two separate live
failures: the first run under the new Phase A/B prompt hit `error_max_turns` at only 26 turns / ~$0.79
of cost (25→40 — not enough headroom for the fuller read-CLAUDE.md → choose → implement → test →
commit → push → open-PR round trip), and a subsequent Phase A smoke-test run (task issue #33) failed
the same way even at 40 (40→50) — confirming every tool call, not just each higher-level step, counts
against the cap. `autonomous-pr-followup.yml` was raised 20→30 for the same reason. Watch actual usage
against your plan's weekly quota and tighten `--max-turns` (or pin a cheaper model via `claude_args`)
further if runs consistently use too much, but not below what a real task run needs (~30–50 turns), or
every run will fail with `error_max_turns` before finishing.

This `25→40→50` retuning history is now historical for `autonomous-maintenance.yml` specifically: issue
#49 removed its fixed `--max-turns` cap entirely in favor of a self-estimated, soft ~50%-of-window
budget recalculated fresh every run (see `CLAUDE.md`'s "Cost implications"/"Budget discipline"), because
a number picked in advance couldn't adapt to how large a given task turned out to be or to how much
quota headroom actually remained going into a run — the mechanism this history describes tuning no
longer exists for that workflow. The lesson generalizes, though, and still applies as-is to
`autonomous-pr-followup.yml`, which keeps its own fixed `--max-turns 30` cap unchanged.

### Orchestration model — background

The maintainer orchestrates; the scheduled workflow develops. Interactive Claude Code sessions are
primarily for strategy discussion and for turning that strategy into a backlog of well-defined,
run-sized tasks — GitHub issues labeled `claude-task`, created via the issue-form template at
`.github/ISSUE_TEMPLATE/claude-task.yml` (Goal / Context / Spec & acceptance criteria / Files likely
touched / Out of scope / Verification / Explicit authorizations / Dependencies). The scheduled
maintenance workflow then implements those tasks unattended, one per run, and the follow-up +
auto-merge workflows carry each PR to merge. Write each issue so an unattended 50-turn run can
complete it without asking questions: one issue = one PR = one run. Split anything bigger into a
sequence of issues ordered with "Blocked by #N" lines in the Dependencies section. An issue's optional
"Explicit authorizations" section is the maintainer's written sign-off for changes the workflow
otherwise hard-bans (e.g. adding a tier to `TIER_DEFINITIONS`); security constraints (no
`--no-verify`, no editing other workflow files, never push to main, never self-merge) can never be
authorized away.

**Milestones vs. the Project's `Track` field.** These are complementary grouping axes, not
duplicates. A GitHub Milestone targets a specific planned release and gets GitHub's native due-date
and automatic X/Y-closed progress tracking for free; a `Track` (the Project's grouping field — see
#53) groups issues by theme or dependency chain (e.g. "Byte-scale rename"), and can span multiple
releases. A `Track` can outlive any single Milestone; a Milestone pulls together whichever issues —
possibly from several Tracks — are actually planned for one release. Assign a player-facing
feature/economy issue to the milestone representing its next planned release when one exists; pure
process/infrastructure/automation issues typically don't need a milestone. Milestone creation and
issue assignment are GitHub metadata operations (`gh api repos/<owner>/<repo>/milestones`, `gh issue
edit --milestone`), not file changes.

### Automation design principles

Three conventions have guided this repo's automation design so far, mostly discoverable only by
reading old issues/PRs until now:

1. **Determinism-first.** Prefer a plain deterministic script over a Claude invocation whenever no
   genuine judgment is needed — a script is cheaper, faster, and can't drift in interpretation
   between runs. See `pr-auto-merge.yml`: its low-risk auto-merge path is a plain shell script with
   no Claude invocation at all, precisely because "is this diff small/safe enough to auto-merge" is
   a mechanical check, not a judgment call.
2. **Judgment-call transparency.** When a genuine judgment call is made on something the spec or the
   user didn't pin down, state the reasoning explicitly rather than deciding silently. A run that
   scopes down or skips a task because of its own turn-budget estimate is required to note that
   reasoning in the PR description/issue comment, not just silently do less than the full spec.
3. **Conflict-avoidance sequencing.** When splitting a large body of work into a sequence of issues,
   chain them with a `Blocked by #N` line whenever two issues would edit the same lines/files — even
   without a strict *functional* dependency between them — purely to avoid two concurrently-open PRs
   conflicting over the same region. See e.g. issue #69's dependency on #49 (both edit the same
   Phase A selection-logic prose).

### Scheduled maintenance (`autonomous-maintenance.yml`) — job status reconciliation

The action step's exit code alone misreports both directions, so two follow-up steps re-align the
job's red/green with reality by inspecting the action's execution-output JSON
(`$RUNNER_TEMP/claude-execution-output.json`):

- *Green that should be red:* the action exits 0 whenever the agent runs to completion — including
  a run that completed by giving up. This happened for real: three consecutive green runs each
  picked task #78, had every `Write` into `.claude/skills/`/`.claude/agents/` refused by the
  harness's unattended-session guardrail (creating new skill/agent files needs an interactive
  approval no one is present to grant), and ended having only left an issue comment — each burning
  a full run's quota, every 5 hours, indefinitely. The "Fail on denied file modifications" step
  now fails the job whenever the final result's `permission_denials` include a `Write`/`Edit`/
  `NotebookEdit` denial (a file the run wanted to change and couldn't); Bash denials stay
  non-fatal since allowlist misses are routine and worked around. To stop the every-5-hours retry
  loop itself, a run that hits an environment/permission blocker on a task issue also labels it
  `blocked` (created idempotently), and the guard step excludes `blocked`-labeled issues from the
  Phase A backlog — a human removes the label after unblocking (e.g. by creating the `.claude/`
  file interactively, where the approval prompt can actually be granted).

  This was later relaxed once it produced its own false positive: a run picked task #79 (add a
  SessionStart hook, needing `.claude/settings.json`), hit the identical `.claude/` write refusal,
  and — exactly per the Phase A guidance above — commented on the issue with the specifics and
  labeled it `blocked`. That's the intended graceful-degradation path, not the silent #78 failure
  mode this step exists to catch, yet the job still went red for a run that did precisely what it
  was told to do. The step now only fails the job if the denial *wasn't* followed by the run
  itself labeling the affected issue `blocked` (detected by scanning the execution output for a
  `gh issue edit ... --add-label blocked` command) — a run that leaves that comment-plus-label
  trail has already handed the blocker to a human as a durable, actionable signal on the issue
  itself, so an additional red workflow badge on top adds no further action a human would take
  differently, while a run that hits a denial and gives up *without* that hand-off still fails the
  job exactly as before (the original #78 case).
- *Red that should be green:* because `CLAUDE_CODE_OAUTH_TOKEN` is subscription-quota-based, a
  scheduled run can die on turn 1 with HTTP 429 ("You've hit your session limit") whenever the
  quota happens to be exhausted at fire time — purely transient, no work attempted, and the next
  5-hourly run retries by itself. The Claude step therefore runs with `continue-on-error: true`,
  and the "Classify Claude step failure" step downgrades a final result with `is_error: true` and
  `api_error_status: 429` to a `::warning::` (job stays green), while any other failure —
  including `error_max_turns`, a real budget signal worth keeping red — re-fails the job as
  before.

**Reliability: cron dormancy.** GitHub Actions automatically disables a workflow's `schedule` (cron)
trigger after 60 days with no repository activity — if the `claude-task` backlog ever fully drained
and nothing filed new work for an extended stretch, `autonomous-maintenance.yml`'s cron trigger could
go dormant with no error or notification anywhere; GitHub just silently stops firing it. In practice
this is unlikely while the backlog stays active, since the automation's own merged PRs already count
as repository activity (resetting the dormancy clock), and Phase B menu item 6 (gap analysis) exists
specifically to keep proposing new work when the backlog thins. The actual backstop is external to
GitHub Actions entirely: a periodic check running on separate infrastructure — not subject to GitHub's
cron-dormancy rule, since manual/API `workflow_dispatch` always works regardless of whether the
`schedule` trigger is currently disabled — that notices if `autonomous-maintenance.yml` has gone quiet
longer than expected and manually re-kicks it via `workflow_dispatch`. This note documents the risk and
the mitigation that's actually in place; the watchdog mechanism itself lives outside this repo/issue
system and isn't something a `claude-task` PR implements.

### Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit

Confirmed live on 2026-08-10: every run of `autonomous-maintenance.yml` (scheduled and
`workflow_dispatch` alike) started failing instantly, with zero jobs scheduled and the run's display
name falling back to the workflow's file path instead of its `name:` — both signs of a workflow file
GitHub couldn't parse, not a job that ran and then failed. The run's annotation read "Exceeded max
expression length 21000" at the line where the `claude-code-action` step's `with.prompt:` block began.
GitHub Actions compiles a YAML scalar that mixes literal text with `${{ }}` expressions into one
combined expression internally (turning the literal segments into string-literal pieces around the
expression parts), and caps that *combined* length — literal text plus expressions together — at
21,000 characters. The main prompt's literal text (Phase 0/A/B instructions, hard constraints, PR
body/branch-naming conventions) had grown past that on its own well before counting its 9 embedded
`${{ steps.guard.outputs.* }}` interpolations; nothing about the size or count of the individual
expressions themselves was the problem. This had presumably been growing for a while (the prompt
documents its own Phase B item 5 self-improvement path, which edits this same file), but only actually
broke once the combined length finally crossed 21,000 sometime between a 2026-08-10 15:55 UTC green
scheduled run and a 17:41 UTC run.

The fix (see `CLAUDE.md`'s "Automation workflows" and the `Compose prompt` step in
`autonomous-maintenance.yml`) moves prompt assembly into its own step, ahead of the `claude-code-action`
step: the static prompt text is written to a file via a quoted bash heredoc (so it's pure literal text,
no GitHub expression syntax inside it at all — quoting the heredoc delimiter also protects the
backticks the prompt uses for inline code spans from bash's own command-substitution, since an
*unquoted* heredoc would try to execute them), the handful of dynamic values (open PR/task/alert lists,
CI status) are substituted in via bash's own `${var//pattern/replacement}` parameter expansion rather
than a GitHub expression, and the result is exposed as a single step output. The `claude-code-action`
step's `prompt:` field then becomes a single pure expression — `${{ steps.compose-prompt.outputs.prompt
}}` — with no literal text mixed in, so GitHub never compiles it into the oversized combined form and
the 21,000 limit doesn't apply regardless of how long the underlying prompt text grows. `envsubst` (the
more obvious substitution tool) was deliberately not used — it isn't confirmed present on GitHub's
hosted `ubuntu-latest` runner image (the existence of several third-party "envsubst-action" Marketplace
wrappers whose sole purpose is supplying it is itself evidence it isn't reliably preinstalled), so
depending on it would trade one outage cause for a subtler one. This pattern (assemble in a prior step,
reference the result as a lone expression) is the standard workaround for any workflow step whose
literal instructional text is inherently large and expected to keep growing — worth reapplying to
`claude_args`/`settings:` here or to `autonomous-pr-followup.yml`'s own prompt if either ever approaches
the same limit, rather than trimming content to stay under it.

A parser-level failure like this is invisible to the job-status reconciliation steps described above
(`Classify Claude step failure`, `Fail on denied file modifications`) — those inspect the action's own
execution-output JSON, which is never produced when the workflow file itself fails to parse before any
job is scheduled. The dormancy watchdog above (external, `workflow_dispatch`-based) would eventually
have re-kicked the workflow, but every kick would have hit the identical parse error until a human or
an interactive session edited the file — this class of failure needed exactly the kind of out-of-band
detection this session used (checking the Actions run history and the run's own annotation directly)
rather than anything the workflow's own internal reconciliation logic could self-heal.

### PR follow-up (`autonomous-pr-followup.yml`) — security reasoning

Because it's triggered by events that can fire on any PR (including one opened from a fork), it
resolves the target branch via `gh pr view --json headRefName,isCrossRepository` rather than trusting
`github.event.*` fields directly, and refuses to check out anything where `isCrossRepository` is true
— a fork branch can be named anything, including something that merely looks like `claude/auto-*`.
All untrusted event fields are passed through `env:` rather than interpolated straight into the shell
script, to avoid script injection via a crafted branch/comment. On top of that, the job itself has a
native `if:` gate requiring the triggering `issue_comment`/`pull_request_review` author to have write
access (`author_association` in `OWNER`/`COLLABORATOR`/`MEMBER`) before checkout ever runs — on a
public repo, anyone can comment on or review a PR without write access, which is the standard "pwn
request" surface for privileged workflows on these trigger types; a runtime bash check alone isn't
visible to CodeQL's static analysis, so this authorization check needs to live in the workflow YAML's
`if:` to actually register as a mitigation. Checkout is pinned to the exact commit SHA (`headRefOid`)
resolved at the same time as the authorization check, not the branch name — the branch is mutable, so
re-resolving "the current tip" at checkout time would reopen a TOCTOU window between authorization and
execution; a SHA is immutable. Since that leaves a detached HEAD, the prompt has Claude run
`git checkout -B <branch>` before committing so it can push back normally.

### Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire

`gh pr merge --auto` doesn't merge immediately, it only enables auto-merge, which still waits on the
real required `test` check from branch protection either way. The workflow-file exclusion is enforced
entirely by the script's own `if` logic, so it's backed by a second, structural layer independent of
the script staying correct: a `.github/CODEOWNERS` entry maps `.github/workflows/**` to the repo
owner, and once branch protection requires Code Owner review, GitHub itself blocks any workflow-file
PR from merging without that review — defense in depth, not a replacement for the script-level check.

### Auto-merge merge method must match the Main ruleset (2026-08-20)

The repository ruleset **Main** (`allowed_merge_methods: merge + rebase` only — squash disabled as
of its 2026-08-15 update) rejects `gh pr merge --auto --squash`. That made every PR look
unmergeable to anything that defaults to squash (Cursor’s merge UI; the old `pr-auto-merge.yml`
flag), even when the same PR was clean and merged fine from the GitHub app via “Create a merge
commit.” Fix: switch automation to `--merge`, document the alignment in `docs/AUTOMATION.md`, and
optionally re-enable Squash in the ruleset if Cursor’s UI should keep using squash (tracking #343).

## Architecture / MainPage UI decisions

The following records *why* specific MainPage/component behaviors were built the way they were —
`CLAUDE.md`'s Architecture section states the current behavior; this is the reasoning trail.

- **`Lv.N` on the Buy button instead of a separate Purchased cell.** Buy is the action that raises
  `purchased`, so folding the level into the Buy button's own label (plus a `(level N)` `aria-label`
  suffix) avoids a redundant grid cell. The player-facing term is "level" (it only ever increases and
  gates both cost and production milestones); underlying state/function names (`state.purchased`,
  `getTierPurchasedCount`, `getPurchaseMilestoneMultiplier`) were left unchanged to avoid an
  unnecessary rename across engine/tests.
- **Sticky balances via IntersectionObserver, not CSS alone.** CSS can't detect "currently stuck", so
  a zero-height `BalancesSentinel` rendered just above the balance pair drives an IntersectionObserver
  that toggles the compact/expanded presentation; its negative margin cancels the extra `RootDiv`
  flex-gap slot it would otherwise add. The observer effect guards for environments without
  IntersectionObserver (jsdom in tests), where the balances simply stay expanded.
- **`InfoDetails` disclosure for description prose.** Native `<details>`/`<summary>` needs no JS
  state, and collapsed content stays in the DOM, so `aria-describedby` references into it (and
  `toHaveTextContent`-based tests) resolve whether or not the section is expanded — this is why a
  disclosure was chosen over conditionally rendering the prose. The marker (▸) is hidden deliberately
  (`list-style: none` + `::-webkit-details-marker`), leaving no visual clue that the heading expands —
  players discover it by clicking; screen readers still announce collapsed/expanded state.
- **No aggregate `+X/sec` line.** Previously summed `owned` across every money-producing tier; removed
  once each tier row got its own `+X` production figure (the per-tier replacement), since an
  aggregate no longer added information once tickspeeds diverged in principle (even though they're
  currently uniform — see "Tier production tickspeed" in `docs/ECONOMY_REFERENCE.md`).
- **On-button gradient fill instead of a separate progress bar.** Buy/Prestige/Speed Up/PP-spending
  buttons all render `$progress`/`$secondaryProgress` fills rather than a bar below them, to avoid a
  second visual element per row; green = units already bought in the current cost block, amber = units
  affordable but not yet bought.
- **Compact icon + `aria-label` split.** Buy/Prestige/Reset render compact visible text (an icon in
  place of the action word, e.g. 🛒 Buy, plus the cost and the tier's short symbol) to keep rows
  narrow, while the full descriptive sentence lives in `aria-label` for assistive tech and
  `getByRole('button', { name })` tests. Because each PP-spending button also nests a `VisuallyHidden`
  `role="progressbar"` span, the explicit `aria-label` on the button itself is required regardless of
  the visible/accessible-name split — without it, the accessible-name computation would recurse into
  the nested node and pick up its label too.
- **Game view vs. PP Upgrades view — why a second view instead of more grid columns.** Every
  PP-spending control used to compete for space in the tier row's grid; moving all of it to a
  dedicated PP Upgrades view is the "redistribution" that reclaimed the tier row's old `automate`
  grid column. The tab pair only appears once `!isFirstRun` since there's nothing to switch to before
  the player's first prestige (every PP Upgrades control spends Prestige Points, which don't exist as
  a concept until then). The `NavDot` affordable-upgrade indicator exists so the player knows to check
  in without opening the page on spec every time.
- **Tickspeed multiplier badge: "+N%" over "×N".** The badge used to read `⚙ ×1.1` when it represented
  a purchase-*frequency* multiplier under the old Upgrade mechanic. Once the mechanic was repurposed
  to a straight production multiplier (see "Tickspeed multiplier" in CLAUDE.md), "+N%" was chosen
  specifically because the badge no longer represents a purchase-frequency multiplier at all — the old
  "×N" phrasing would have implied the wrong mechanic to a returning player.
- **Unlock has no first-tier special-case (unlike the old Automate button).** The predecessor
  "Automate" button had a bypass for the first tier's Money-funded activation step; that step no
  longer exists (autobuyer unlock is PP-funded uniformly across all tiers now), so the special-casing
  was simply removed rather than ported forward.
- **Speed Up card stays visible once revealed.** `SpeedUpCard` used to disappear again the
  moment a successful Speed Up reset `owned` and re-locked the last tier. It no longer does — the
  `speedUpEverRevealed` flag replaced a live `lastTierUnlocked` check specifically to avoid the
  disappear/reappear churn every Speed Up cycle would otherwise cause, which was jarring in practice.
  The bottom `PrestigeCard` got the identical treatment for the same reason when it existed, before
  being removed entirely — see "Bottom Prestige panel removed" below.
- **`aria-describedby` only on Prestige and Reset.** These two are the app's only irreversible
  actions, and their most important fact (resources get wiped) previously lived only in a mouse-hover
  `title` — undiscoverable to keyboard/screen-reader users. Every other button's `title` genuinely just
  restates what's already visible/in the `aria-label`, so those were left as-is rather than adding
  `aria-describedby` everywhere for consistency's sake.
- **Tier row reveal animation keyed off a mount-time snapshot, not live mount timing.** Since locked
  tiers render `null`, every unlocked row technically "mounts" on every page load — a naive
  mount-triggered animation would replay for tiers unlocked long ago. A `useState(() => new
  Set(...))` baseline snapshot of which tier ids were already unlocked at mount time (captured once,
  from whatever `loadGameState()` returned) is compared against on each row instead, so only tiers
  that unlock *during the current session* animate.
- **Grid layout: fixed `grid-template-areas` at every width, not flexbox content-sizing.** A field's
  on-screen position needs to depend only on viewport width, never on how many digits a value has (or
  on whether the tickspeed multiplier button currently has anything to render — it stays reserved even
  when empty). This was a deliberate reaction to a layout that previously shifted around based on
  content length.
- **Buy sits to the right of the tickspeed multiplier button.** Buy is clicked constantly, the
  tickspeed button only occasionally, so the more-clicked control gets the rightmost
  (thumb/cursor-resting) position — a small ergonomics call, not an arbitrary ordering.
- **Offline notice self-dismiss timing.** Uses a plain `setInterval` computing `remaining/total` from
  two `Date.now()`-based timestamps, not a CSS transition — matching the codebase's established
  on-button-fill convention rather than reintroducing the removed tick-progress ring's animation
  machinery. The countdown interval effect is keyed on `offlineProgress` itself (not just the timing
  state) specifically to avoid a real regression that was caught during development: without that
  guard, a timer could leak and run forever in the background once the card was dismissed by the
  auto-fade path rather than a manual click.
- **Offline notice: click-to-extend removed; card became a centered overlay.** The card used to carry
  both a whole-tile `onClick` (re-seeding the auto-dismiss deadline to a longer duration from that
  click) and a `title` explaining that click behavior — "extend from now" was more intuitive than
  adding +60s on top of whatever remained, at the time. That combination was flagged specifically for
  *this* card: the card had no other indication it was interactive (no `role="button"`, no cursor
  affordance beyond CSS `cursor: pointer`, no visible control), so a hover-only tooltip was the *only*
  way to discover the whole-tile click at all — undiscoverable to touch/keyboard users, and easy to
  trigger by accident while merely reading the notice. The click-to-extend behavior and its `title`
  were removed; only the explicit Dismiss button remains interactive. Separately, the card moved from
  an inline block (pushed into the normal document flow, above the money display) into a fixed,
  viewport-centered `OfflineNoticeOverlay` — presenting it as a true centered overlay/dialog instead of
  content that shifts the page underneath it, with `pointer-events` scoped so only the card itself (not
  the overlay's surrounding space) intercepts clicks. Note this is *not* a blanket rule against ever
  pairing a whole-tile click with a `title` — see the next entry and the tier rows' own
  `TierNameTrigger` (CLAUDE.md's "Tier row details disclosure"), both of which combine the two
  properly: `role="button"` (or an equivalent semantic cue) plus a supplementary tooltip, rather than
  the tooltip being the sole explanation of an otherwise-invisible affordance.
- **Sticky PP display doubles as a Prestige button.** Once Prestige is actually available
  (`canPrestige`), clicking the sticky "prestige points display" card triggers Prestige directly,
  alongside the existing `TopPrestigeBar`/`FullScreenOverlay` buttons — a convenience shortcut, since
  the PP balance is already visible at the top of the page in exactly the state where Prestige becomes
  available. Unlike the offline notice above, this card is properly marked interactive (`role="button"`,
  `tabIndex`, keyboard support) whenever it's clickable, and reverts to a plain non-interactive display
  before `canPrestige` — so the same click+title combination that was removed from the offline notice is
  reintroduced here deliberately, now paired with real button semantics instead of being the only cue.
- **Bottom Prestige panel removed.** The bottom `PrestigeCard` (Game view) used to have its own
  "Prestige Now" button; that button was removed as redundant with the sticky PP display's
  click-to-prestige behavior above, leaving the card purely informational (progress/award preview,
  prestiged count, unspent PP, Auto-Prestige status). With no button and nothing else consuming that
  screen space for a purpose the other Prestige surfaces didn't already cover, the informational-only
  card itself was judged not worth its own footprint and removed entirely — `PrestigeCard`, the
  `prestigeCardEverRevealed`/`prestigeCardRelevant` reveal-tracking state, and the now-unused
  `GoldText` styled component (only ever used inside this panel) were all deleted together. Any
  information a player might want (prestige count, unspent PP, production speed bonus, Auto-Prestige
  status) remains visible via the sticky PP header display and the PP Upgrades page.
- **Offline notice extracted into `components/OfflineProgressNotice` so ByteFoundryPage can show it
  too.** A request to "enable offline progress for the Byte Foundry" turned out, on investigation, to
  already be satisfied at the engine level: `applyOfflineProgress` replays `tickGame` once per
  simulated second, and `tickGame` unconditionally runs `tickIntroProduction`/`tickIntroAutoInvest`
  first, every tick, regardless of `intro.mainGameUnlocked` — the Byte generator's passive production
  and its auto-transfer-into-Kilobytes convenience both already caught up correctly while the game was
  closed, with no code change needed there. The actual gap was that the "Welcome back! ... simulated N
  of progress at 10% speed" notice itself only ever rendered inside `MainPage` — `App.jsx` already
  passed the full `game` object (including `offlineProgress`/`dismissOfflineProgress`) to
  `ByteFoundryPage` too, but that page never read those two fields, so a player who returned after
  being away and landed on (or was still gated to) the Byte Foundry screen got no acknowledgment that
  time had passed, even though their Memory/generator genuinely had progressed. Rather than
  duplicating the notice's state/effects/styling into `ByteFoundryPage`, the whole thing (timing
  constants, the countdown/fade/auto-dismiss state and effects, and the JSX) was extracted verbatim
  out of `MainPage` into a new shared `components/OfflineProgressNotice`, taking
  `{ offlineProgress, dismissOfflineProgress }` as props — the same two fields `useIncrementalGame()`
  already returns — and both pages now render it identically near their own top (`MainPage` after its
  `Header`, `ByteFoundryPage` after its `Title`). `HudMutedText` (used elsewhere in `MainPage` beyond
  just this notice) was deliberately left in place rather than moved; the extracted component defines
  its own equivalent `NoticeText` instead, so the move doesn't couple `ByteFoundryPage` to a
  MainPage-only styled component.
- **Cache tile removed; transfer blocks become persistent instead of shrinking; Tap loses its
  progress fill; Storage gets its own labeled section.** Four related `ByteFoundryPage` requests in
  one round, all pure UI (no `engine.js`/`layers.js` change needed for any of them):
  1. The Cache 1KB tile (added alongside the Memory/Storage redesign in the previous entry) was
     removed — once the transfer-block row itself always renders every block for the whole cycle
     (see point 2), the active block's own partial fill already shows the same "progress toward the
     next convertible 1000-bit chunk" the Cache tile existed to surface, making the second tile
     redundant.
  2. Transfer blocks used to be rendered via `Array.from({ length: blocksRemaining })` — only the
     not-yet-transferred ones, so a click simply removed that block from the array and the row
     visibly shrank. The player wanted spent blocks to stay in place, greyed out, so the full history
     of a cycle's transfers stays visible rather than disappearing. The fix renders
     `Array.from({ length: blockCount })` (the fixed total, `getIntroTransferBudget(state) /
     INTRO_BITS_PER_KILOBYTE_CONVERSION`) always, deriving each block's consumed/active/upcoming state
     from comparing its index to `blocksTransferred` — no block is ever removed from the array, only
     re-styled. The consumed look intentionally bypasses `progressFill` entirely (only the active
     block ever gets a `$progress` prop) in favor of a plain solid `background:
     theme.color.surfaceSunken` behind a new `$consumed` prop — tried first via `progressFill`'s own
     disabled-alpha dimming (`$progress={100}`), but that blends to a barely-there tint at the
     existing low disabled alpha, not the clearly "done, filled-in" look actually wanted; a direct
     solid fill reads unambiguously as spent, and the row overall — solid/partial/empty segments left
     to right — was requested to read as "one long progress bar," which the direct-fill approach
     achieves more legibly than a faint gradient would have.
  3. The Tap button's own `$progress` fill/hidden progressbar were removed — Memory's own tile
     already shows the identical bits/capacity fill, so the tap button's copy was pure duplication.
     Removing `${progressFill}` from `TapArea` incidentally also removed the button's own background
     (progressFill's gradient always painted over `theme.color.surfaceSunken` as its base — the one
     place that base color was coming from), leaving default browser button styling (a stark white
     button) until caught by a Playwright screenshot check and fixed with an explicit `background:
     theme.color.surfaceSunken` rule on `TapArea` — worth remembering if `progressFill` is ever
     removed from another component that relied on it for more than just the fill itself.
  4. Storage's "Build Storage Bank" button and one full-width "Redeem ⟨size⟩ Bank (×N)" button per
     held denomination used to sit flat in the same `ActionsRow` list as Sacrifice/Invest, growing by
     one more full-width button every time a new bank size was built. Storage now gets its own
     labeled `StorageSection` (a `styled(StatCard)`, matching the page's existing tile/section visual
     language), and the one-button-per-size list became a compact, wrapping row of small chips
     (`StorageChip = styled(Button)`, same `aria-label`/`variant` semantics as before, just shrunk to
     `flex: 0 0 auto` with tighter padding and a shorter `<size> ×<count>` label) — scales far better
     than a growing button stack as more denominations accumulate over a long run.
- **Storage's buildable size drops from "one level ahead" to tier01's current level; the Memory
  tile's transfer-block tracker gets a stronger-contrast style.** Two follow-up reports on the round
  above:
  1. "I don't see a way to build 1KB Storage bank" — correct: `getNextStorageBankSize` (the previous
     entry) always targeted tier01's NEXT level cost (10,000 bits at a fresh save, since tier01
     starts at level 1), specifically so a freshly built bank was never immediately redeemable. Asked
     directly whether Storage should expose every ladder size at once (1KB/10KB/100KB/… simultaneously
     buildable) or just start the single buildable size lower, the answer was the latter: renamed to
     `getStorageBankSize` and changed to target tier01's CURRENT level cost
     (`getTierCost(TIER_DEFINITIONS[0], purchaseLevels.tier01 ?? 1)`, no `+ 1`) — starts at 1000 bits
     ("1 KB") on a fresh save, and still only ever offers one buildable size at a time, advancing as
     tier01 levels up, same as before. The natural consequence — a freshly built bank now matches
     tier01's price exactly, so `isStorageBankRedeemable`'s existing `<=` check makes it redeemable
     immediately rather than only after a future level-up — was kept rather than special-cased around,
     since `getFirstTierCost` only ever grows within a cycle (documented in the entry above): a bank
     built at today's price never becomes *un*redeemable later, so "immediately redeemable" isn't a
     bug, it's what "current level" implies. This still leaves a genuine use for banking rather than
     just buying directly: queuing several banks ahead of an autobuyer catch-up burst (or a run of
     manual buys) at today's price, then redeeming them whenever convenient, rather than the price
     climbing between each individual purchase.
  2. The Memory tile's "X / Y bits this cycle" transfer-budget tracker was reported as rendering but
     easy to miss — it shared `StatusText`'s plain muted color/regular weight with the
     passive-production readout right below it, so nothing set it apart as live, meaningful progress
     info versus incidental text. A new `TrackerText = styled(StatusText)` (full-strength
     `theme.color.text`, `font-weight: 600`) is used for this one line only, giving it enough contrast
     to actually stand out against its neighbors.
- **Storage's buildable size becomes an independent build-up-to-10-then-advance ladder, decoupled
  from tier01's price; auto-redeem gets a per-size once-per-run cap (except the smallest
  denomination, which always fires); the held-bank chips become a squares grid; a new visible
  purchase-block-progress row is added.** A follow-up redesign request specified: "Offer 1KB storage
  banks for 10KB each until user has 10 of them. Then offer 10KB storage banks for 100KB each until
  user has 10 of them. And so on." — a materially different rule from the entry above's
  `getStorageBankSize`, which tracks tier01's CURRENT level cost directly with no cap on how many can
  ever be built at that size. Rather than guess, three genuinely ambiguous points were confirmed
  directly before implementing (each had a plausible reading that would have produced very different
  code): (1) whether the ladder should be an independent progression gated purely on a cumulative
  built-count cap, or should keep tracking tier01's live cost with just a build cap layered on top —
  confirmed **independent**, so `getStorageBankSize` no longer reads tier01's level at all; (2)
  whether "grey out blocks already purchased, irrespective of main game or Byte Foundry" described
  the pre-existing Memory→Kilobyte transfer-block row (already both of those things) or asked for a
  *new* visual — confirmed **new**: a live, non-hidden squares row for tier01's own current
  purchase-block progress, added to the Storage section; (3) whether "1KB storage banks are always
  auto consumed... only one auto consumption per run for each size" meant capping auto-redeem at once
  per size per run (needing new state to track it) or just making 1KB mandatory-on with everything
  else unlimited as before — confirmed **capped at once per size per run**, for every size, with 1KB
  additionally exempt from the enable/disable toggle entirely (it always attempts its once-per-run
  redeem regardless).

  Implementation: `intro.storageBanksBuiltTotal` (new, permanent, cumulative — `redeemStorageBank`
  never decrements it, only `buildStorageBank` increments it) drives `getStorageBankSize`'s ladder —
  starting at `INTRO_BITS_PER_KILOBYTE_CONVERSION` and multiplying by 10 every
  `STORAGE_BANK_LADDER_CAP` (10) banks ever built at the current size. This is a genuine decoupling,
  not just a rename: a player can now build ahead of or fall behind tier01's actual price, with
  `isStorageBankRedeemable` (unchanged) as the sole remaining gate on whether a built bank is
  spendable. `intro.storageAutoRedeemedSizes` (new — resets to `{}` every real Prestige, unlike every
  other Storage field, which are all permanent) tracks which sizes have already auto-redeemed this
  cycle; `tickStorageAutoRedeem` now requires a size to be both un-redeemed-this-cycle AND (exactly
  `INTRO_BITS_PER_KILOBYTE_CONVERSION` OR `storageAutoRedeemEnabled`) before acting. On the UI side,
  the flat `StorageChipsRow`/`StorageChip` text-chip list (previous entry) was replaced with one
  `StorageSizeRow` per size ever built (or currently offered) — a fixed `STORAGE_BANK_LADDER_CAP`-
  long strip of `StorageBankSquare`s per row, reusing the same three-state (consumed/held/upcoming)
  visual language the transfer-block row already established, so "filled smallest to largest" reads
  the same way across both mechanics rather than introducing a second convention. The new
  purchase-block-progress row reuses the existing `RateBlocksRow`/`RateBlock` pair directly (no new
  styled components needed) since `state.purchaseLevelProgress[tier01.id]`/`getPurchaseBlockSize`
  already update identically regardless of whether a unit came from the main game's Buy button or
  from `redeemStorageBank` here — the "irrespective of main game or Byte Foundry" requirement was
  already true of the underlying state; the row just needed to be rendered, not hidden.
- **The transfer-block row's mobile wrap bug is fixed; the Storage build/auto-redeem button labels
  are shortened.** Two follow-up reports after the redesign above shipped: (1) "the bottom blocks
  are incorrect and one of them are incorrectly aligned" — reproduced at a 320px viewport:
  `TransferBlocksRow`'s `flex-wrap: wrap` let `blockCount` growable (`flex: 1 1 2.5rem`) blocks spill
  onto a second row once they no longer fit on one line, where the leftover blocks then grow to fill
  *that* row's leftover space instead — visibly much wider than the blocks above, reading as a
  broken, misaligned grid. This predates the ladder redesign (the row's own styling wasn't touched by
  it), but showed up now because Storage's build/auto-redeem controls sit directly above it and drew
  attention downward. Fixed by switching to `flex-wrap: nowrap` (plus `min-width: 0` on the block
  itself, so `flex-shrink` can actually narrow it below its content size) — the row now always stays
  a single, evenly-sized strip, shrinking together at narrow widths and growing together at wide ones,
  instead of ever wrapping unevenly. (2) "Storage bank costs 10x its capacity. The current costs are
  incorrect." — investigated rather than assumed: `getStorageBankCost`/`getStorageBankSize` were
  already exactly 10x at every ladder size, confirmed by scripted engine-level and UI-level checks
  through several ladder transitions. The actual defect was `ButtonLabel`'s standard, deliberate
  `white-space: nowrap; text-overflow: ellipsis` truncation (see `components/Button`) clipping the
  unusually long "Build ⟨size⟩ Storage Bank (⟨cost⟩ bits)" label at narrow widths — worst case at the
  "10 KB" ladder step, where the cost (100,000, the largest value `formatAmount` ever renders in
  plain comma-grouped digits before switching to scientific notation at the 1,000,000 threshold)
  pushed the whole label past the button's available width, truncating the visible cost and reading
  as if it were wrong or missing rather than merely cut off. Rather than loosening `ButtonLabel`'s
  truncation for every button in the app, the fix stayed scoped to this one label: dropped the
  redundant "Storage" (already the section's own heading) and " bits" suffix (context-implied) from
  both this button and the auto-redeem toggle's "Storage Auto-Redeem" label, confirmed to fit at
  320px through the same worst-case cost value.
- **Storage becomes a genuine storage medium — banks auto-fill from Memory and are reusable, not
  single-use; the build ladder is corrected to tier01's real (sparse) level-cost sequence; the
  build cost is corrected to bytes, not bits.** A further round of clarification on the independent-
  ladder redesign (two entries above) corrected three things at once:
  1. **Banks were pre-paid at build time** — `buildStorageBank` spent the full build cost and
     immediately marked the bank held/redeemable in the same call, so "build" and "fill" were the
     same action. The clarification: "The cost of storage banks is only to build the storage banks
     permanently. They are still empty once built... They get auto filled as memory fills up. They
     also get freed up to be filled up again once consumed" — banks are a genuine storage *medium*:
     building only ever constructs a permanent, EMPTY container (`buildStorageBank` now touches only
     `storageBanksBuiltTotal`, never `storageBanks`); a new `tickStorageAutoFill` — unconditional, no
     toggle, run every tick — cascades Memory into every currently-fillable empty bank in one pass,
     smallest size first ("whenever memory has enough... it fills it... starting from smallest to
     largest, and at the end, memory fills itself"), moving `size` bits out of Memory and into
     `storageBanks[size]` for each one it can afford, until nothing more is fillable. Redeeming a
     full bank (`redeemStorageBank`, unchanged) now explicitly empties it again rather than spending
     it forever — `storageBanksBuiltTotal` was never touched by redeeming even before this change, so
     the "reusable, not single-use" behavior was really just a matter of `tickStorageAutoFill`
     existing to refill what redeeming freed up.
  2. **The build ladder's sizes were a synthetic ×10 sequence** — 1 KB, 10 KB, 100 KB, 1 MB, …,
     independent of what `tier01` (Kilobytes) could actually cost. Called out directly: "100 KB
     banks cannot exist as KB tier doesn't have them. We directly jump to 1MB banks after 10 KB" —
     `tier01`'s own cost-epoch exponent sequence (`getCostEpochExponent`: 1, 2, 4, 7, 11, …, a "1 plus
     a triangular number" progression) skips values as levels increase, so `tier01`'s real per-unit
     level costs are 1,000 / 10,000 / 1,000,000 / 1,000,000,000 / … — level 3 jumps straight from
     10,000 to 1,000,000, skipping 100,000 entirely. `getStorageBankSize` was rewritten to walk
     `getTierCost(TIER_DEFINITIONS[0], level)` for level 1, 2, 3, … (still advancing to the next level
     once `STORAGE_BANK_LADDER_CAP` banks have been built at the current one) rather than repeatedly
     multiplying by 10 — the ladder now can only ever offer a size `tier01` itself could actually cost,
     matching the "consumed amount must match the corresponding block or level cost of the KB tier"
     requirement exactly, and reproducing the skip automatically as a side effect of reusing the same
     cost function rather than needing to special-case which round numbers to skip.
  3. **The build cost's "10x" was computed in bits, not bytes** — `getStorageBankCost` multiplied a
     bank's own bit-denominated size by `STORAGE_BUILD_COST_MULTIPLIER` directly, so a 1,000-bit
     ("1 KB") bank cost 10,000 bits. Corrected explicitly: "By 10x, I meant 1KB Bank should cost
     10KBytes, not 10Kbits" — `getStorageBankCost` now multiplies by `BITS_PER_BYTE` (8) as well,
     so a 1,000-bit bank costs `1000 * 10 * 8` = 80,000 bits (10,000 bytes), an 8x increase across
     every size the ladder ever offers.

  On the UI side, the squares row's three states were renamed to match: **full** (replacing "held" —
  currently holding Memory's bits, redeemable once `tier01`'s price matches) and **empty** (a new
  state — built but not yet auto-filled, a dim muted-bordered fill distinct from the plain
  not-yet-built placeholder) replace the old **held**/**consumed** pair, since a redeemed bank no
  longer reads as permanently "consumed" — it becomes **empty** again, the same visual state a
  freshly built, not-yet-filled bank already uses. No new state fields were needed: `storageBanks`
  already meant "how many of this size are currently spendable," which is exactly "currently full"
  under the corrected model — only what populates it changed (auto-fill instead of build-time
  pre-payment).
- **The "bits this cycle" tracker is removed entirely; the Memory tile's Bytes-unit balance now
  floors instead of rounds.** Two follow-up requests on the tracker/formatting added in the round
  above:
  1. The `TrackerText` line just added (previous entry) was asked to be removed outright rather than
     restyled further — the player didn't find the raw-bits "X / Y bits this cycle" figure useful
     once it had enough contrast to actually read. Nothing else consumed `intro.bits % transferBudget`,
     so this was a pure deletion (JSX block, the now-unused `TrackerText` styled component, and its
     explanatory comment) with no state/logic follow-on.
  2. The Bytes-unit conversion (`formatMemoryAmount`'s `bits / unit.divisor` branch) went through
     `formatAmount`, which rounds to the nearest of up to 3 decimal places (Intl's default) — so a
     balance could read as, e.g., "1 KB / 1 KB" one tick before it actually reached 1000 bits. This is
     the exact overstatement problem `formatCurrency` (`engine.js`) already solved for the money
     display ("floors rather than rounds so a displayed amount never overstates the actual spendable
     balance") — the same fix (floor, not round) was applied here via a small local
     `floorToDecimals(value, decimals)` helper, floored at the same 3 decimal places `formatAmount`
     already shows rather than to a whole unit, since existing fractional display (e.g. "0.5 KB") was
     still wanted — only the rounding *direction* needed to change, not the precision.

## Economy model

### Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25

`resetByteFoundry`'s convenience auto-replay (`tickFoundryResetConvenience`) originally covered
Combine, bit-funded Invest, and Disk Build, but deliberately left Capacity/Sacrifice out —
`captureFoundryUpgradeCaps`'s own comment used to read "Capacity is deliberately omitted," and
`resetByteFoundry`'s doc comment said "Capacity stays manual." No historical incident forced that
choice; it wasn't previously documented beyond the code comments themselves. Changed at the
maintainer's request so Sacrifice auto-replays up to its own pre-reset high-water mark exactly like
Combine/Invest/Disk Build already did — `captureFoundryUpgradeCaps`/`mergeFoundryUpgradeCaps` now
also track/merge a `capacity` field, and `tickFoundryResetConvenience` presses Sacrifice
(`pickIntroCapacityMilestone`) through its own normal `isMemoryCapacityUpgradeAvailable` gate once
Memory naturally refills to the current capacity, same waiting behavior the other convenience steps
already have.

### Why Bytes was pulled out of the tier ladder in favor of the Byte Foundry intro

Bytes (`tier01`, cost 1 Bit, self-producing) was the game's entire bootstrap: a fresh save started
with `MONEY_STARTING_AMOUNT` (1 Bit), affordable Bytes at cost 1, and everything else cascaded from
there. Requested as a deliberate redesign: rather than starting the player directly inside the
Money-driven tier economy, a separate tap-to-earn pre-game screen (the "Byte Foundry") now stands in
front of it — tap for bits, combine 8 into a Byte generator, grow capacity/production through two
escalating tracks, then convert (manually or via a one-time 8000-bit auto-invest) into the main game's
starting Kilobytes. This intentionally slows down and re-frames the opening of a run as its own small
game rather than an instant drop into the tier list, and reuses Kilobytes (previously `tier02`) as the
new bootstrap tier instead — every other tier shifted down one slot to fill the vacated position, and a
new Quettabytes tier was appended at the top to keep the ladder at 10 tiers.

This is a genuine, permanent removal, not a rename: Bytes' `id`/`name`/`symbol` don't exist anywhere in
`TIER_DEFINITIONS` any more. A save from before this shipped has its per-tier data shifted down to
match (old `tier02`'s Kilobytes data → new `tier01`, …, old `tier01`'s Bytes data has nowhere to go and
is dropped) — see `storage.js`'s `shiftOldTierIds`/`isPreByteFoundrySave`. That gate specifically
matters for correctness: `migrateState` runs on *every* load, not just once, so the shift itself is
gated on the same one-time `saved.intro === undefined` signal used to backfill `intro.completed` for a
pre-existing save — without that gate, a save already on the *current* (post-shift) scheme would have
no way to signal "don't shift me again," and would silently lose its real `tier01` data on its next
load. Reusing the `intro` field's own existence as that marker (rather than inventing a separate schema
version field) works because both changes shipped in the same feature and are permanently coupled — a
save either predates both or postdates both.

### The Byte Foundry becomes a per-Prestige-cycle mechanic, not a one-time gate

The entry above describes the Byte Foundry as shipped: a permanent, one-time bootstrap gating a
fresh save's very first Kilobytes, with `intro.completed` carried through unchanged by
`prestigeGame`/`speedUpGame`/`overclockGame` — only a full Reset restarted it. That was true at the
time, but a player who'd already played through it once (and reported being unable to see it again
on a returning-save load — working as designed, per the pre-existing-save migration described
above) pointed out that the Byte Foundry "sets the pace for every run," not just the very first one.

Requested as a follow-up redesign: `prestigeGame` now resets `intro` back to
`createInitialGameState()`'s fresh defaults (`completed: false` included) in the same atomic reset as
`resources`/`owned`, so a real Prestige sends the player back through the Byte Foundry before every
new cycle — tap out a fresh Byte generator, regrow capacity/production, convert back into the run's
starting Kilobytes, same as the very first time. `App.jsx`'s page-routing effect became bidirectional
to match (previously it only ever moved `'intro'` → `'game'`, never back), with one deliberate
exception: it stays a no-op while the player is on the static Guide page (`'info'`), so a background
Auto-Prestige firing while they're reading it doesn't yank them off it — the sync catches up the
moment they click back to `'game'`.

`speedUpGame`/`overclockGame` were deliberately left unchanged — they're intra-cycle soft resets, not
new cycles, so they still carry `intro` through completely untouched, same as before. The load-time
migration backfill (`isPreByteFoundrySave`/`storage.js`'s `intro.completed: true` for a save that
predates the `intro` field entirely) is also unaffected — it remains a one-time, load-time decision
for saves this old, orthogonal to what a real Prestige now does going forward for every save.

### The Byte generator becomes permanent — only "Memory" and the gate reset each Prestige

The entry above made the Byte Foundry reset back to `createInitialGameState()`'s fresh defaults on
every real Prestige, generator included — a full replay each cycle: re-tap to 8, re-combine into a
Byte, regrow capacity and production rate from scratch. That was the explicit request at the time,
but immediately playing it out revealed it read as needless busywork once a player already had a
maxed-out generator from previous cycles — rebuilding the exact same capacity/rate ladder by hand
every single Prestige, with no way to skip ahead.

Corrected: `prestigeGame` now resets only two things inside `intro` — `bits`/`productionAccumulator`
("Memory," the tappable/producible balance) and `completed` (the gate) — back to fresh. Every other
field (`capacity`, `byteCreated`, `tickSpeedSeconds`, `productionMultiplier`,
`productionMilestoneClaimedAtCapacity`) is now carried over from `state` unchanged, exactly like an
unlocked autobuyer. The mandatory gate itself is unaffected by this change and still reopens every
real Prestige (confirmed explicitly, rather than assumed, before implementing) — only what's already
built *inside* it when it reopens changes. In practice this means the very first cycle plays out the
full bootstrap loop, and every cycle after that is a fast pit-stop: Memory refills using whatever
capacity/rate was already earned, typically crossing the 8000-bit auto-invest threshold in a handful
of ticks rather than a full replay. `speedUpGame`/`overclockGame` needed no change — they already
carried the whole `intro` object through untouched, Memory included, and that stays correct.

This also prompted a related fix to the underlying production model, requested in the same round: a
manual tap had always credited a flat `+1` bit regardless of the Byte's actual rate, and passive
production ran on an implicit continuous bits/sec rate rather than an explicit tickspeed — unlike
every tier in the main game, which has a real `baseTickSpeedSeconds` and delivers production in
discrete periodic batches (see "Tier production tickspeed" in `docs/ECONOMY_REFERENCE.md`). Both
were brought in line: `intro.tickSpeedSeconds` (starting at 1 second, mirroring a tier's own base
period) plus a new `getIntroProductionRate(intro)` helper now drive both a tap (which credits "one
second's worth" at the current rate, not a flat 1) and `tickIntroProduction` (which delivers one
discrete batch every `tickSpeedSeconds`, exactly like `tickGame`'s own per-tier production). "Invest
for Double Production" doubles this rate by first halving `tickSpeedSeconds` — the same
tickspeed-vs-production split tiers already use — until that would breach
`INTRO_MIN_TICK_SPEED_SECONDS` (the live tick loop's own real-time resolution, `TICK_RATE_MS`), at
which point it switches to multiplying `productionMultiplier` (the batch size) instead, so growth
never stalls once the tick loop's own granularity limit is reached. A related balance concern
surfaced in the same round — "Invest for Double Production" could previously be picked over and over
at the same capacity tier by simply refilling Memory and re-clicking, with no cap — addressed by a
new `productionMilestoneClaimedAtCapacity` field gating it to once per capacity tier reached (a fresh
Sacrifice, which always grows `capacity` to a strictly higher value, re-opens it for exactly one more
claim).

### Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number

Once Bytes stopped being a tier and the main game's base currency stayed denominated in Bits, framing
the Prestige/freeze trigger as "1 Googol Bytes" (matching the Byte Foundry's own Bytes-flavored
framing) meant the actual Bits-denominated threshold needed to be 8x `GOOGOL`, not `GOOGOL` itself — a
Byte is `BITS_PER_BYTE` (8) Bits. Rather than picking a round replacement number (e.g. just bumping
`GOOGOL` itself to `8e100`, or introducing an unrelated new round threshold), the actual trigger became
`PRESTIGE_THRESHOLD = GOOGOL * BITS_PER_BYTE`, keeping `GOOGOL` itself unchanged at its clean `1e100`.
This was a deliberate split: `GOOGOL`'s own exponent (100) is what the log-scale formulas
(`getPrestigePointsAwarded`, `getMoneyExponent`, `getPrestigeProgressPercent`) key off, and an 8x
constant factor shifts that exponent by less than 1 (`log10(8) ≈ 0.903`) — negligible at `GOOGOL`'s
scale, and not worth threading a second exponent through every one of those formulas for no visible
difference in their output. Only the actual live freeze/Prestige *trigger* (`isProductionFrozen`/
`prestigeGame`'s own guard) reads `PRESTIGE_THRESHOLD`; everything exponent-based still reads `GOOGOL`.
The progress bar (`getPrestigeProgressPercent`) is a known, accepted minor consequence of this split: it
reads 100% once Money's exponent reaches 100, which happens slightly before the real threshold
(exponent ≈100.9) is actually crossed — an intentionally accepted cosmetic imprecision rather than
complicating the percent formula for a sub-1%-of-a-magnitude difference.

### Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder

The two entries above left the Byte Foundry with a single `intro.completed` flag doing three jobs at
once: gating `App.jsx`'s routing into MainPage, freezing every intro action function to a permanent
no-op, and driving `ByteFoundryPage`'s own read-only "voluntary revisit" view. A further round of
player feedback asked for three related changes that this combined flag couldn't cleanly express:
(1) main-game access should no longer wait for a full 8000-bit balance — the first manual 1000-bit
conversion should unlock it immediately; (2) further conversions should keep working after that,
shared across a running per-cycle budget capped at the same 8000 bits, whether done manually or via
the existing auto-convert convenience; (3) Tap/Sacrifice/Invest should never freeze at all, matching
the "Byte foundry never resets, it keeps running" philosophy the previous entry already established
for the generator itself.

Resolved by splitting the one flag into two, and removing the freeze concept entirely:
`intro.mainGameUnlocked` (Memory-scoped, resets every real Prestige) now drives routing alone, set
true the instant any bits are ever converted into Kilobytes this cycle — manual
`convertIntroBitsToKilobytes` click or the `tickIntroAutoInvest` auto-convenience, whichever fires
first. A new `intro.bitsTransferredThisCycle` counter (also Memory-scoped) tracks the running total
converted this cycle, shared by both conversion paths and capped at `INTRO_AUTO_INVEST_THRESHOLD`
(reusing the existing 8000 constant as the shared budget rather than adding a new one) — once
exhausted, neither path fires again until the next Prestige reopens a fresh budget.
`intro.completed` itself was removed outright: nothing needs a full-freeze flag once Tap/Sacrifice/
Invest are permanently live and Convert is governed by the budget instead. `ByteFoundryPage`'s old
"read-only voluntary review" rendering branch was removed for the same reason — the page now renders
identically whether reached via the mandatory gate or the voluntary "⚙️ Byte Foundry" nav link;
`onBack`'s only remaining effect is whether the "← Back to game" button shows.

The same round also corrected a misreading of "Invest for Double Production"'s intended cost model.
The previous entry's `productionMilestoneClaimedAtCapacity` field tied Invest's cost directly to the
current `capacity` (always requiring a full balance to claim, since cost == capacity and Memory is
hard-capped at capacity). The actual ask was for Invest to run on its **own independent cost ladder**
— explicitly "nothing to do with capacity" — sharing only the same "×10 per step" shape (1 Byte, 10
Bytes, 100 Bytes, 1000 Bytes, 10000 Bytes, …) the capacity ladder happens to use, tracked by a new,
separate, permanent `productionMilestoneTier` (0-based index) plus `productionMilestoneTierClaims`.
`getIntroProductionMilestoneCost(tier) = INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER ** tier`
computes each tier's cost independent of `capacity` entirely, so a claim only ever needs `bits >=
cost` — frequently satisfiable well before Memory is full, once Sacrifice has grown capacity ahead of
this ladder, which is what "do not require full capacity" actually meant. Each of the four tiers up
to `INTRO_AUTO_INVEST_THRESHOLD` (1/10/100/1000 Bytes) now grants **two** claims instead of one
(`getIntroProductionMilestoneMaxClaims`), advancing to the next tier — with a fresh claim count —
only once both are used; every tier after that keeps the original one-claim-per-tier behavior. The
old `productionMilestoneClaimedAtCapacity` marker has no equivalent under the new model (it tracked a
capacity value, not a tier index) — a save carrying it simply falls back to a fresh tier 0 on load,
an accepted one-time reset of Invest progress for a feature that was still unreleased and being
actively tuned at the time.

Finally, the balance card gained a second, always-visible tracker (`bits % INTRO_AUTO_INVEST_THRESHOLD`,
in raw bits) shown alongside the existing Bytes-denominated balance once `byteCreated` — a rolling
view of progress within the current 8000-bit block, independent of the transfer-budget mechanics
above (confirmed via the request's own worked example, `9000 % 8000 = 1000`, which the primary
Bytes figure — `9000 ÷ 8 = 1125`, not the `1128`/`128` figures in the original request — doesn't
otherwise convey).

### The transfer budget becomes dynamic (tied to the Kilobyte tier's own block size); a real ButtonContent bug fixed along the way

The entry above capped the Byte Foundry's per-cycle bit-to-Kilobyte transfer budget at a fixed
`INTRO_AUTO_INVEST_THRESHOLD` (8000 bits). A follow-up request offered two designs for surfacing
that budget as a row of clickable "transfer blocks" instead of a single repeatable button: a fixed 8
blocks of 1000 bits each, or blocks sized to the Kilobyte tier's own current purchase block size
(`getPurchaseBlockSize`, the same live, possibly-growing value the main game's own Buy button
already reads) and explicitly "usable at any point in the whole game" — offered as a deliberately
tentative alternative ("usually not worth it, but just possible"). The tentative option was chosen
over the simpler default.

Implemented as `getIntroTransferBudget(state) = getPurchaseBlockSize(state) *
INTRO_BITS_PER_KILOBYTE_CONVERSION`, replacing the fixed constant everywhere it previously gated the
budget (`getIntroRemainingTransferBudget`, `tickIntroAutoInvest`'s bulk-transfer trigger/amount).
Since `getPurchaseBlockSize` starts at `DEFAULT_PURCHASE_BLOCK_SIZE` (8) and only grows later in a
run (once the last tier's own level count crosses `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS`),
this is numerically identical to the old fixed 8000 at a fresh cycle — no regression at the common
case, just no longer hardcoded. `INTRO_AUTO_INVEST_THRESHOLD` itself wasn't removed — it still names
the unrelated 2-claims-per-Invest-tier cutoff (`getIntroProductionMilestoneMaxClaims`), which was
never part of this change and happens to share the same 8000 value by coincidence, not by shared
meaning anymore. `ByteFoundryPage`'s single "Transfer 1 KiloBits" button was replaced by a
`TransferBlocksRow` of `blockCount - blocksTransferred` blocks (one per remaining
`INTRO_BITS_PER_KILOBYTE_CONVERSION`-bit transfer), with only the leftmost ever clickable/interactive
— confirmed block semantics: a block's fill is simply a visual read of the existing `bits`-vs-1000
progress (no new state needed), so any Memory surplus left over after a click carries straight into
the newly-active next block, letting a large-enough balance be clicked through several blocks in a
row. The existing `tickIntroAutoInvest` auto-convenience became the "once every remaining block is
simultaneously available at once — e.g. a big offline-progress jump — auto-transfer them all in
bulk and empty the row" edge case the request also asked for, needing no new logic beyond swapping
in the dynamic budget it already used.

The same round asked for Invest's cost to display in Bytes rather than bits (always exact —
`getIntroProductionMilestoneCost` only ever returns multiples of `BITS_PER_BYTE`) and reported a "UI
bug on Invest for double production with quotes shown as commas." Investigating that bug (rather
than guessing at a fix) traced it to `components/Button/index.jsx`'s `ButtonContent`, not to
anything in `ByteFoundryPage` itself: `ButtonContent` did `String(children)`, which works for a
caller passing one plain string, but the Invest button's label mixes literal text with an embedded
`{formatAmount(cost)}` expression — JSX hands such mixed content to `children` as an **array** of
text/expression segments, not one string, and `String()` on an array invokes
`Array.prototype.toString()`, which joins with a bare comma. The rendered label read literally as
`"Invest for Double Production (,1, B)"` — a real, reproducible bug (confirmed via a failing
`getByText` assertion whose DOM dump showed the stray commas), not a rendering-artifact false alarm.
Fixed at the root — `Array.isArray(children) ? children.join('') : String(children)` — rather than
only patching the one call site, since `docs/COMPONENTS_REFERENCE.md` had actually documented the
old, narrower contract ("`ButtonContent` only accepts a single string child; callers with multiple
JSX expressions should use `ButtonIcon`/`ButtonLabel` directly instead") — the Invest button's own
call site had unknowingly violated that documented constraint. Given the fix makes `ButtonContent`
robust to exactly this pattern, the doc was updated to describe the new, more permissive contract
instead of re-asserting the old footgun.

### The per-cycle transfer budget cap was removed — the transfer row mirrors tier01's own purchase-block progress instead

The entry above made the transfer budget dynamic but kept it a genuine per-cycle cap: a shared
`intro.bitsTransferredThisCycle` counter, reset to 0 only by the next real Prestige, that both
`convertIntroBitsToKilobytes` and `tickIntroAutoInvest` refused to exceed. In practice this produced
a confusing coincidence at a fresh cycle's default block size (8): completing the *very first*
tier01 purchase block (`purchaseLevelProgress[tier01]` wrapping from 8 back to 0) landed on exactly
the same tick as the transfer budget being fully spent (`bitsTransferredThisCycle` hitting
`getIntroTransferBudget`), since both were sized off the same `DEFAULT_PURCHASE_BLOCK_SIZE`. A
screenshot showing "Kilobytes' current block (0/8)" and "Transfer to Kilobytes (0 left)" both reading
empty at once was reported as broken. Explaining it as an expected coincidence of the two counters
lining up was rejected: the actual design intent was for the transfer row to keep tracking tier01's
next level's blocks indefinitely, the same way it tracked the first level — not to run out and wait
for a Prestige to refill it. In other words, the "budget" framing itself was the bug, not any
particular number.

Resolved by deleting the cap entirely rather than patching its edge cases. `intro.bitsTransferredThisCycle`
and `getIntroRemainingTransferBudget` are gone; `convertIntroBitsToKilobytes` is now a no-op only when
`intro.bits < INTRO_BITS_PER_KILOBYTE_CONVERSION`, and `tickIntroAutoInvest` fires every time `bits`
reaches `getIntroTransferBudget(state)` again, with no cooldown. `getIntroTransferBudget` itself
survives unchanged in shape (`getPurchaseBlockSize(state) * INTRO_BITS_PER_KILOBYTE_CONVERSION`), but
its role changed from "the cap" to just `tickIntroAutoInvest`'s own batch-size threshold. The
`ByteFoundryPage` transfer row no longer derives its consumed/active/upcoming states from a
cycle-scoped counter at all — it reads `purchaseLevelProgress[tier01]` directly, the exact value the
adjacent "Kilobytes' current block" tracker already displayed (both trackers were always describing
the same underlying progress; only one of them was wired to the wrong state). Since
`purchaseLevelProgress` is a genuine, unbounded tier-level counter that naturally wraps to 0 the
instant a level completes (see `grantTierUnits`), the row now rolls over to a fresh block set for the
next level automatically, forever — with no special-casing needed for "what happens when the budget
runs out," because there is no longer a budget to run out. The apparent per-cycle reset behavior
survives anyway, as a side effect: a real Prestige still resets every tier's
`purchaseLevels`/`purchaseLevelProgress` (tier01 included) back to a fresh level 1, so the row does
still restart each cycle in practice — it's just no longer driven by transfer-specific state.

Removing the field also simplified `storage.js`'s save migration: the two backward-compat branches
that used to backfill a synthetic "fully-spent" `bitsTransferredThisCycle` value for a save predating
`mainGameUnlocked` now only need to backfill `mainGameUnlocked` itself, since there's no companion
budget field left to keep consistent with it.

### Storage auto-redeem toggle button removed for now, default flipped to always-on

The Storage section shipped with a pause/resume button (`⏸ Pause Auto-Redeem`/`▶ Resume
Auto-Redeem`) for `intro.storageAutoRedeemEnabled`, defaulting `false` — a player had to discover and
click it before any size above 1 KB would auto-redeem. A request came in to make auto-redeem the
default behavior for every size, deferring an actual pause/resume UI to a later, separate pass rather
than trying to design it now.

Resolved by flipping `createInitialGameState`'s default to `true` and deleting the button from
`ByteFoundryPage` (along with the `fullStorageBankSizes` local variable that existed solely to gate
its visibility) — but leaving every piece of underlying plumbing untouched: the
`storageAutoRedeemEnabled` field, `setStorageAutoRedeemEnabled`, and `tickStorageAutoRedeem`'s own
check against it all still exist exactly as before, just with no way to flip the preference from the
UI today. `storage.js`'s save migration needed no changes — a save that never explicitly set this
field already falls through to `fresh.intro`'s default via the generic `{...fresh.intro,
...saved.intro}` merge, so existing saves pick up the new `true` default automatically, same as any
new save. When the pause/resume UI returns, it can just re-add a button calling the same
`actions.setStorageAutoRedeemEnabled` used before — nothing about the underlying mechanism needs
revisiting, only where it renders.

### The transfer-block row looked permanently stuck — `tickIntroAutoInvest` waited for a whole batch instead of converting live

A bug report: "the 8 blocks at the bottom are not showing progress. Only the first one is getting
filled and nothing happens after that." Reproduced live (seeding a high production rate, no manual
clicks) rather than guessing at a fix: `intro.bits` climbed steadily from 0 toward 8000 (a fresh
cycle's full `getPurchaseBlockSize(state) * INTRO_BITS_PER_KILOBYTE_CONVERSION` batch) while
`purchaseLevelProgress[tier01]` stayed at exactly 0 the entire time, only to jump straight back to 0
again once the batch completed (having briefly touched 8 and immediately rolled the level over
within the very same tick). From the player's side this read as block 1 sitting pinned at 100% fill
(`intro.bits` clamped past 1000 in the progress calculation) for as long as it took Memory to climb
the rest of the way to the full batch, with blocks 2-8 never visibly doing anything — because
`tickIntroAutoInvest` (see the entry above, "Implemented as `getIntroTransferBudget(state)`...")
had always required the *entire* batch to be affordable before converting anything at all, a design
that made sense for its original purpose (catching up in bulk after a big offline-progress jump) but
ran every tick regardless, so it was also the only thing driving ordinary live play — and ordinary
live play accumulates *toward* that threshold gradually, which is exactly the case the "wait for the
whole batch" design didn't handle.

Resolved by making `tickIntroAutoInvest` convert one `INTRO_BITS_PER_KILOBYTE_CONVERSION`-bit unit
at a time, live, via a loop over `convertIntroBitsToKilobytes` itself (so it inherits the identical
`mainGameUnlocked`-flipping behavior a manual click already has, rather than duplicating it) — capped
per call at `getTierBulkQuantity(getPurchaseBlockSize(state), purchaseLevelProgress[tier01],
Number.MAX_SAFE_INTEGER)`, the same "at most one level's worth per call" safety bound the tier
autobuyers themselves already use via `buyTierQuantity`, so an extreme Memory balance (e.g. after a
long-Sacrificed capacity) can't loop this an unbounded number of times in a single tick — a jump
spanning more than one level's worth of units simply finishes on the next tick instead, exactly like
an autobuyer catching up after a broke stretch. `getIntroTransferBudget` itself is now dead code (its
only remaining caller was the removed one-shot-batch check) and was deleted rather than left unused,
along with `INTRO_AUTO_INVEST_THRESHOLD` once `getIntroProductionMilestoneMaxClaims`'s own reliance on
it was separately removed in the same round (see below).

Converting per-unit immediately surfaced a second, previously-latent conflict: `tickGame` ran
`tickIntroAutoInvest` *before* `tickStorageAutoFill`/`tickStorageAutoRedeem`, so once auto-invest
could fire on every single affordable unit rather than only a rare full-batch jump, it started
winning the race for fresh Memory against a Storage bank the player had already built and was
waiting to fill — a regression caught by an existing test (seeding exactly enough Memory to fill one
empty 1 KB bank) that started failing with the page having already navigated away to `MainPage`
before the test's own assertions ran, since auto-invest's own `mainGameUnlocked: true` fired first.
Resolved by reordering `tickGame`'s intro/storage handling: `tickStorageAutoFill` now runs
immediately after `tickIntroProduction`, *ahead of* `tickIntroAutoInvest`, so a built bank gets first
claim on fresh Memory; `tickIntroAutoInvest` then converts whatever's left over. This is safe because
`tickStorageAutoFill` has no dependency on tier01's level at all (only `intro.bits`/`storageBanks`/
`storageBanksBuiltTotal`) — unlike `tickStorageAutoRedeem`, which still has to run last, after
autobuyers/Speed Up, so it always checks `isStorageBankRedeemable` against the tick's truly final
tier01 level; only the fill half of the old combined `tickStorage` helper needed to move.

The same round also tightened "Invest for Double Production" to a single claim per tier across the
board (an explicit request — "give only one attempt per cost for bandwidth as well," matching
Sacrifice for 10x Capacity's own one-shot posture) by simplifying `getIntroProductionMilestoneMaxClaims`
to always return `1`, superseding the two-tier `INTRO_AUTO_INVEST_THRESHOLD` cutoff from "The
1000-Byte Invest tier drops from two claims to one" above. The `productionMilestoneTierClaims`
tracking field and `pickIntroProductionMilestone`'s own generic claim-counting logic were left in
place rather than ripped out, since they cost nothing to keep and stay ready for a future
tier-dependent claim count without any further code changes.

### Transfer-block/Storage-bank cost stops being pinned to tier01's fresh-level-1 price

Both the Kilobyte-transfer blocks and Storage bank redemption originally priced themselves off a
flat rate: `convertIntroBitsToKilobytes` always spent exactly `INTRO_BITS_PER_KILOBYTE_CONVERSION`
(1000) bits per unit, and `isStorageBankRedeemable` accepted any bank whose size was `<=` tier01's
*current* per-unit level cost. Both were literally true only at a fresh cycle's starting level, where
tier01's level-1 cost happens to equal that same 1000-bit constant. Once tier01 leveled past 1 within
a cycle — its real per-unit cost climbing to 10,000, then 100,000, and so on — a transfer block kept
converting at the stale 1000-bit rate, and a small, already-built bank (e.g. a 1 KB bank) stayed
"redeemable" under the `<=` check even though tier01's real Kilobyte price had grown far past it: a
report that "Only the actual cost of a full level of tier01 should be auto redeemed (from bank or
memory). Currently the level 1 cost is being redeemed without checking real cost" identified this as
a bug, not a deliberate design choice that happened to look that way (both mechanisms were originally
*intended* to track tier01's real cost, per their own doc comments predating this fix; the flat
1000-bit reference and the `<=` inequality were the actual defects, not something to work around).

Two designs were considered before implementing. The first, more literal reading of the bug report —
"only tier01's own real, current per-unit cost should ever be spent, from either source, and nothing
else on the Byte Foundry page should be usable outside of that" — would have disabled Tap, Combine,
Sacrifice, and Invest entirely, turning the whole page into a single spend-at-current-price action.
Asked directly, the reporter confirmed a narrower scope: fix the cost dynamics only ("Close, but
Tap/Sacrifice/Invest should stay usable") — those mechanisms are deliberately-designed, independent
Byte Foundry actions (see "Economy model" in `CLAUDE.md`) with no bug report against them, and nothing
about the flat-rate/`<=` defects implicated their own behavior.

The fix: a new `getIntroKilobyteConversionCost(state)` (`getTierCost(TIER_DEFINITIONS[0],
purchaseLevels.tier01 ?? 1)`) replaced the flat constant everywhere a conversion actually spends bits
(`convertIntroBitsToKilobytes`, and transitively `tickIntroAutoInvest`'s per-unit loop) — the exact
same value `getStorageBankSize`/`isStorageBankRedeemable` already computed, so a transfer block and a
Storage bank of the same size now cost/redeem identically. `isStorageBankRedeemable` switched from
`<=` to `===`: a bank is redeemable only when its size *exactly* equals tier01's current per-unit
cost, not merely at or below it. This reopens a question the original `<=` design was explicitly
built to avoid (see "Storage's buildable size drops from 'one level ahead' to tier01's current level"
above): an autobuyer burst completing more than one tier01 level in a single tick can jump the price
straight past a bank's exact size without it ever equaling that size mid-tick, leaving the bank
un-redeemable for the rest of that stretch. This is accepted as a temporary-wait, not a "never lost"
regression: `getFirstTierCost` only ever grows with level *within* a cycle, so the next Speed
Up/Overclock/Prestige resets tier01's level back down, and its price regrows through that exact value
again on the way back up — a full bank simply waits, unredeemable, until the next reset cycle reaches
its size again, rather than losing its contents. `INTRO_BITS_PER_KILOBYTE_CONVERSION` itself was kept
(not deleted) since it's still true and useful as `INTRO_CONVERSION_UNLOCK_CAPACITY`'s fixed threshold
value and as a fresh-cycle-level-1 test fixture — only its use as an actual ongoing conversion price
was wrong and removed.

### Why `getTierCost` uses a multiplier form, not a literal power

An earlier version of `getTierCost` read as a literal `baseCost^fib`. This put high tiers permanently
out of reach within a handful of blocks — e.g. Octillions' 4th block cost 10^135, past `GOOGOL` —
stalling the whole economy well before a full run could reach Googol even at extreme Prestige-Point
speed bonuses. The current form (`baseCost * 10^(fib - 1)`) was adopted once that was caught: every
tier still scales by the same Fibonacci-driven exponent progression, but relative to its own
`baseCost` rather than compounding `baseCost` itself into the exponent, so a baseCost-1000 tier's
blocks cost 1e3, 1e4, 1e5, 1e7, 1e10, … instead of exploding immediately.

### Repricing tiers to real-world bit values

Every tier's `baseCost` originally followed an arbitrary `10^n` sequence (`10`, `1E3`, `1E6`, …) —
a leftover from before the byte-scale tier rename (`Bytes`→`Ronnabytes`, see the tier `name`/`symbol`
values in `layers.js`) and the base currency's rename to "Bits". Once tiers were named for real
byte-scale units and the currency was named "Bits", pricing them at an unrelated round number read as
inconsistent with the theme — a real Kilobyte *is* 8,000 bits, so that's what it now costs
(`baseCost = 8 * 1000^(n-1)`, decimal/SI scale, matching the SI-prefix rationale already used to name
`tier10` `Ronnabytes` rather than the informal `Brontobytes`). This also regularizes the previous
sequence's irregular first jump (`10`→`1E3` was ×100, every later jump was ×1000) into a clean ×1000
step between every consecutive tier including `tier01`→`tier02`. Purely a data change — `getTierCost`'s
scaling formula, `getTierBulkQuantity`, and every other cost-scaling mechanic are unaffected, since they
all scale relative to whatever `baseCost` is rather than assuming its value.

### Why every tier's tickspeed is uniform at 1s

An earlier design had `tier02` = 2s, `tier03` = 3s, … `tier10` = 10s (each subsequent tier producing
more slowly). This was **not** balance-neutral: dividing later tiers' throughput by up to 10x, stacked
on top of the Fibonacci-driven cost curve, made a full run unable to reach `GOOGOL` within any
practical amount of time — confirmed empirically with the `simulate-run-times` skill, which showed
every tested starting Prestige Point balance (0–5000, i.e. up to +5000% production speed) still
hitting the simulator's safety cap without reaching Googol. All tiers were set to the same 1s value
instead. `baseTickSpeedSeconds` remains a plain explicit per-tier field rather than a computed one, so
nothing prevents a future tier or upgrade from diverging again — the uniform-1s state is a balance
choice, not a structural constraint the field itself enforces.

### Reintroducing the 1s-10s tickspeed ladder

The uniform-1s state above held until the tickspeed-multiplier system (`tickspeedLevels`,
`globalTickspeedMultiplier`, see "Tickspeed multiplier"/"The global tickspeed multiplier" in
`CLAUDE.md`) was added — a mechanism that didn't exist when the original 1s-10s ladder was tried and
reverted, and that specifically shrinks `getEffectiveTierTickSpeedSeconds` back down per tier or
globally. Once that system existed, the original 1s-10s values (`baseTickSpeedSeconds = tierIndex + 1`)
were restored on the theory that players could now offset later tiers' slower base cadence by investing
in tickspeed multipliers, rather than the game being structurally unable to reach Googol as before.

This was re-verified empirically with the `simulate-run-times` skill before merging, using the same
starting-PP values as the original test (0, 100, 500, 1000, 5000, plus the skill's wider default range).
Unlike the original attempt — where every one of those values hit the simulator's safety cap without
reaching Googol — every run now completes, in ~4 days 21 hours of simulated time for the lower PP
values (0-10000, where the bot's PP gets spent on autobuyer unlocks before it can afford the
10,000-PP passive speed bonus) down to under an hour for 25,000+ PP (once the passive bonus affords
unlocking). The tickspeed-multiplier system is enough to compensate this time — confirming the
original revert's caveat (no compensating mechanism existed yet) was the actual root cause, not
something inherent to an increasing per-tier tickspeed itself.

### Why the tick-progress ring was removed

A circular per-tier tick-progress ring (`TickProgressRing`, a conic-gradient "watch face" fed by
`getTierProductionProgressPercent`) used to render beside each tier's production figure, visualizing
`tierProductionAccumulators` filling toward each delivery. It was removed once every tier's tickspeed
was unified at 1s: with all ten rings sweeping the same constant 1-second cycle in unison, the ring
carried no per-tier information and was pure motion noise. `getTierProductionProgressPercent` (and its
unit tests) remains in `engine.js` as a read-only accessor — it would be the starting point if any
future design re-surfaces per-tier tickspeed divergence. When per-tier tickspeed divergence was in fact
reintroduced (see "Reintroducing the 1s-10s tickspeed ladder" above), the ring itself wasn't restored —
instead each tier row gained a collapsed-by-default `Details` disclosure (`TierDetails` in `MainPage`)
that surfaces the base/effective tickspeed numbers as text on demand, which doesn't add the ring's
always-on animation cost/clutter to the compact row layout.

### Why Speed Up exists, and why its requirement escalates

Even with the Fibonacci-driven cost curve and every tier sharing a uniform 1s tickspeed, a single
unbroken run's cost still eventually outpaces any *constant*-factor production speedup — confirmed
empirically via the `simulate-run-times` skill, where every tested starting Prestige Point balance
still hit the simulator's 5,000,000-tick safety cap without ever reaching Googol. Speed Up restarts
the cost curve from block 0 every time while permanently doubling production, so each cycle is faster
than the last — the compounding multiplier outruns the compounding cost, rather than losing to it the
way a flat bonus eventually does.

The escalating requirement (`getSpeedUpRequirement`) exists because a flat "always 10 more" trigger
lets the last tier dodge the Fibonacci cost curve entirely, forever: since the requirement would
otherwise sit exactly at the epoch-0/epoch-1 boundary, every cycle's 10 units would be bought at the
same flat `baseCost` no matter how many cycles had already happened — the last tier's cost would never
actually escalate. Scaling the requirement up by a full block of 10 each cycle means later cycles'
purchases *do* cross into deeper cost epochs, so the mechanic can't be spammed for cost-free
compounding indefinitely.

Re-running the `simulate-run-times` bot (updated to always accept Speed Up the instant each cycle's
requirement is met) confirmed the run still completes at every tested starting PP balance, just with
far fewer, more consequential cycles: **9 Speed Ups** over **~94,900 simulated ticks** (about 1
simulated day) instead of the flat-requirement version's 333 cycles over ~3,900 ticks (~1 hour) —
slower overall, but the mechanic no longer sidesteps the cost curve that everything else in this
economy is built around.

`speedUpGame`'s reset pattern deliberately mirrors `prestigeGame`'s, matching the original framing for
this feature: "similar to starting the first run but with automations retained and 2x the speed."

**Follow-up: starting requirement raised from level 1 to level 5.** `getSpeedUpRequirement` changed
from `speedUpCount + 2` to `speedUpCount + 6` (raw; displayed level 1 → displayed level 5 for the
first activation), keeping the same `+1`-per-cycle escalation step — only the floor moved. This
session attempted to re-run the `simulate-run-times` bot to get updated pacing figures the way the
original tuning above did, but the skill's `run-simulation.mjs` bot script is currently broken
against the live engine — it imports a `buyAutobuyerUnlock` export from `engine.js` that no longer
exists (autobuyer unlocking moved to automatic prestige-count milestones a while back; see this
file's own tier-autobuyer-milestone entries), so it fails before simulating anything, independent of
this change. That's a pre-existing skill/engine drift, not something this session introduced. A
future session updating that skill script (or re-validating pacing another way) should fold real
numbers in here; until then, treat the +4-level shift as untested against the "no run hits the
5,000,000-tick safety cap" bar the original tuning above was held to, though the same `+1`-per-cycle
escalation reasoning that made the original level-1 floor work continues to apply at a level-5 floor.

### Why `speedUpCount` now resets on Prestige, reversing the original design

For most of this mechanic's life, `speedUpCount` (and the `2^speedUpCount` multiplier it drives) was
explicitly permanent — `prestigeGame` carried it through unchanged, on the theory that Speed Up's whole
point (per the "Why Speed Up exists" analysis above) was to keep compounding a production multiplier
that outruns the cost curve, and stripping that on Prestige would undermine it. The maintainer asked
for this reversed: Prestige is the bigger, much rarer reset (Money must reach `GOOGOL`, vs. Speed Up's
comparatively frequent per-cycle level requirement), and letting `speedUpCount` also survive it meant a
long-lived save could accumulate an unbounded, ever-compounding production multiplier across every
future Prestige forever, with no analogous escalating requirement of the kind that keeps Speed Up's
*own* cost-curve dodge in check (see above) — nothing similarly re-prices a Prestige cycle as
`speedUpCount` climbs. Resetting it to 0 on `prestigeGame` (kept unbounded within a single Prestige
cycle, same as before) makes each Prestige cycle rebuild its Speed Up progression from scratch, mirroring
how `globalTickspeedMultiplier` already resets on both Prestige and Speed Up (see "The global tickspeed
multiplier" in `CLAUDE.md`). `autoSpeedUp` (the
automation toggle deciding whether Speed Up fires automatically) was deliberately left permanent — the
player doesn't need to re-buy that PP unlock every Prestige, only rebuild the multiplier it happens to
be driving at the time.

### Why autobuyer unlock is PP-funded only, with no first-tier bypass

There used to be a separate Money-funded activation path with a first-tier special case (bypassing the
activation cost for `tier01` only). That path no longer exists — for a long stretch, `buyAutobuyerUnlock`
was the *only* way to get a tier's autobuyer running, funded entirely by Prestige Points, uniformly
across every tier including the first. That PP-cost mechanism has since been superseded again — see
"Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks" below —
but the "uniform across every tier, no first-tier special case" principle it established still holds
under the milestone system that replaced it.

### Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks

Both a tier's unit-buying autobuyer unlock (`buyAutobuyerUnlock`) and its own tier tickspeed autobuyer
(`buyTierTickspeedAutobuyer`) used to be ordinary PP purchases, priced off `getAutobuyerUnlockCost`
(1–10 PP-equivalent across the ten tiers) directly or via a multiplier on it. A maintainer request asked for these two specifically to become automatic instead: each tier's autobuyer now unlocks
for free the moment `prestige.count` reaches that tier's own milestone
(`getAutobuyerUnlockMilestone` — prestige 1 through 10, one tier per prestige), and its tier tickspeed
autobuyer similarly at a later, more slowly-spaced milestone (`getTierTickspeedAutobuyerMilestone` —
prestige 12 through 30, every 2 prestiges). `applyAutobuyerMilestones` is the pure function that
performs the actual unlocking, called from `prestigeGame` (so the very prestige that crosses a
milestone unlocks it immediately) and from `storage.js`'s `migrateState` on load (so an existing save
that had already prestiged past a milestone before this feature existed receives it retroactively,
without needing to prestige again). `getAutobuyerUnlockCost` itself was deliberately kept, unchanged,
rather than deleted — `getSmartAutobuyerCost` still multiplies it as a pricing benchmark, and Smart
remains a genuine PP purchase (the maintainer request only asked to make Unlock and the tier tickspeed
autobuyer automatic, "all other upgrades still cost PP as before"). `getTierTickspeedAutobuyerCost`/
`TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER`, by contrast, had no other caller once the tier tickspeed
autobuyer itself stopped costing PP, so those were removed outright rather than kept as unused dead
code. A new **Milestones** view (a third `MainPage` tab, alongside Game/Upgrades) was added specifically
to track progress on both tracks in one place, since neither one costs anything to check in on and the
Upgrades page's own "Tier Autobuyers" category only shows a locked tier once it's reachable in the
current run — the Milestones view shows every tier's status for both tracks regardless.

### Why "Smart" autobuyers exist

`tickGame`'s autobuyer purchase loop normally requires affording an *entire* `autobuyerBatchSize`-unit
block before buying anything. A freshly-unlocked tier with 0 owned generators earns $0/tick, so at the
app's fixed batch size of 10 it can never afford the first 10-unit block on its own and stalls at
whatever balance it started with, forever, every run. "Smart" (`buySmartAutobuyer`, a separate PP
purchase 10x the unlock cost) fixes this real stall by buying one unit at a time until the tier
reaches 10 lifetime purchases, then reverting to normal full-block batching.

### Why the tickspeed multiplier no longer affects purchase frequency

The mechanic now called "tickspeed multiplier" is the renamed, re-purposed replacement for what used
to be a tier's autobuyer "Upgrade": a Money-funded, per-tier level that used to compound
purchase-attempt *frequency* by 10% per level. It no longer does that at all — autobuyer
purchase-attempt frequency is now a flat, level-independent rate; each tickspeed multiplier level
instead affects that tier's own **production** by another 10% (originally by scaling the amount
delivered per batch — see the next entry for why that changed to scaling delivery frequency instead).
This is a deliberate decoupling: the old design conflated "how fast this tier buys itself" with "how
much/how often this tier produces," which made balancing either independently impossible.

### Why tickspeed multipliers shrink the delivery period instead of scaling production

The tickspeed multiplier (per-tier and global) originally worked by multiplying directly into a tier's
production credit each time it delivered — i.e. a higher level meant *bigger* batches at the same
cadence, not more frequent ones. This was changed so both multipliers instead divide into
`getEffectiveTierTickSpeedSeconds`'s effective period (see "Tier production tickspeed" in CLAUDE.md),
making a higher level mean *more frequent, same-sized* deliveries instead. The aggregate output over
any fixed time window is mathematically identical either way (multiplying the amount by ×1.21 and
dividing the period by ×1.21 both scale total throughput by the same factor), but the change makes the
mechanic honest about its own name: a "tickspeed" multiplier now actually speeds up the tick, rather
than being a production multiplier wearing a tickspeed-flavored label. It also keeps a tier's `+X`
production preview meaningful as "what one delivery is worth" — under the old scheme that figure
changed with tickspeed level even though the player never *saw* individual deliveries speed up or slow
down, only a bigger number that had nothing to do with the "tickspeed" name on the button that produced
it.

### Prestige history: why PP replaced direct production doubling

Prestiging no longer doubles production directly — it now awards **Prestige Points (PP)**, a
permanent, cumulative currency that never resets. This is the direct replacement for the old "prestige
level doubles production" mechanic, chosen so that Prestige could fund an explicit menu of upgrades
(autobuyer unlocks, Smart, the passive speed bonus, Auto Speed Up, Auto-Prestige) rather than a single
undifferentiated multiplier.

### Why Prestige/PP info is hidden until first prestige

Prestige Points don't exist as a concept for the player until they've prestiged at least once, so
`MainPage` keeps every PP-related display and control out of the page entirely during the first run,
rather than showing a premature "0 PP" or a button costing points the player has never earned. PP
upgrades additionally reveal one by one, cheapest first — e.g. the 10000 PP Speed Bonus unlock stays
hidden until the far cheaper Auto Speed Up (100 PP) has been bought, so a fresh post-prestige page
isn't fronting a cost that's still thousands of points away.

### Reset button history

An earlier version of the Reset feature restricted it to `yarn dev`/`yarn test` builds only
(dead-code-eliminated from production); that gate was removed after a player on the deployed site had
no way to reach it. It's now always rendered, gated only by a native `window.confirm(...)` prompt
(chosen over a custom two-step UI since there's no existing modal/confirm component elsewhere in the
app to reuse for a single irreversible action).

### XP status

XP (`prestige.xp`, earned via money milestones — see `checkMilestones`) has been removed from the UI;
the underlying mechanic (accumulation, `highestMilestone` tracking) is untouched in `engine.js`, just
no longer displayed, pending being repurposed for something else later.

### Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check

`isLastTierTickspeedXpUnlocked` originally read a stored `state.lastTierTickspeedXpUnlocked` flag,
latched permanently true by `buyTier` the first time the last tier's lifetime `purchased` count ever
reached 10, and never cleared again — not even by a Prestige or Speed Up, both of which reset the last
tier's own `owned`/`purchased` back to 0 like every other tier's. The explicit reasoning at the time was
that a live `purchased >= 10` check "would hide the mechanic again" once a reset dropped the count back
below 10, which read as a regression for a player who'd already earned it once.

In practice this meant a player could Prestige or Speed Up, immediately own 0 of the last tier, and
still see the XP-funded tickspeed button/bonus presented as active on a tier they no longer meaningfully
had — the mechanic never actually reverted to reflect the reset it was supposed to respect. This was
changed so `isLastTierTickspeedXpUnlocked` is a live check (`owned[lastTierId] >= 10`) instead, with the
stored latch flag removed entirely — matching the same live `>= 10` threshold `isTierUnlocked` already
uses for ordinary tier unlocking, and reverting the last tier's row to its normal Money-funded tickspeed
button whenever owned drops back below 10. `lastTierXpConsumed` (the ever-growing total XP invested) was
deliberately kept as a separate counter from the unlock check itself — the accumulated bonus it drives
is never lost across a *narrower* reset than a full Prestige/Speed Up, only not *applied* while the live
check is unsatisfied; buying back up to 10 re-engages it at the same cumulative bonus rather than
starting over. (`lastTierXpConsumed` was permanent — surviving Prestige/Speed Up too — at the time this
entry was written; a later change made it run-scoped instead, resetting on both. See "XP and everything
it funds became run-scoped, not permanent" below.)

### Last tier's XP-funded tickspeed: from additive to multiplicative

`getLastTierXpTickspeedMultiplier` originally computed `1 + LAST_TIER_XP_TICKSPEED_STEP * xpConsumed`
— a flat, linear +1% per cumulative XP ever consumed (37 XP consumed = exactly +37%, ×1.37). This was a
deliberate departure at the time from every other tickspeed multiplier in the game (the per-tier
Money-funded ladder and the global multiplier both compound: `(1 + step) ** level`), chosen so the
displayed bonus would "directly match the amount invested" — spend 37 XP, see +37%, no mental math.

This was changed to the same multiplicative, compounding form every other tickspeed multiplier uses:
`(1 + LAST_TIER_XP_TICKSPEED_STEP) ** xpConsumed`. The additive version meant the last tier's own
mechanic was the only tickspeed multiplier in the game that didn't compound, an inconsistency with no
strong gameplay justification once weighed against consistency — and it made the last tier's own
ceiling different in kind from every other tier's (linear growth is bounded in a way exponential growth
isn't, which matters for a resource meant to scale toward Prestige-level numbers). The MainPage
XP-consume button's `+N%` label was updated alongside this to report the actual marginal speedup a given
consumption contributes (`getLastTierXpTickspeedMultiplier(amount)`, i.e. the ratio of the new multiplier
to the old one) rather than echoing the raw XP amount spent — under compounding those two numbers
diverge quickly (100 XP consumed compounds to ×2.70, not ×2.00).

### Multiplier overflow safety: the switch to compounding needed a floor

Switching `getLastTierXpTickspeedMultiplier` to compound (previous entry) introduced a real overflow
path that a code review caught before merge: `lastTierXpConsumed` is a permanent counter, never reset or
capped, and `1.01 ** xpConsumed` overflows double-precision float to `Infinity` around `xpConsumed ≈
71,333` — a magnitude that's astronomical but not actually unreachable over a long enough
heavily-automated save, since nothing in the economy bounds `prestige.xp`/`lastTierXpConsumed` the way
`GOOGOL` implicitly bounds every Money-funded multiplier. `getEffectiveTierTickSpeedSeconds` used to
divide the tier's base period by this multiplier with no guard; once the multiplier overflowed, the
division gave exactly `0`. That `0` period wasn't a safe "instant delivery" — it corrupted
`tickGame`'s accumulator math: `ticksElapsed = accumulated / 0` became `Infinity`, and `accumulated -
ticksElapsed * tickSpeed` collapsed to `Infinity * 0 = NaN`. Because `clampNonNegative` treats any
non-finite value as `0`, the produced (second-to-last) tier's `owned`/`resources` got silently zeroed on
every tick from that point on — a permanent corruption, not a one-tick glitch, since the `NaN`
accumulator never recovered on its own.

This is a materially different failure mode than the already-documented, already-accepted overflow in
`getTierCost` (see "Why `getTierCost` uses a multiplier form" above) — a cost overflowing to `Infinity`
is harmless because an infinite cost is simply never affordable, a clean no-op. Here the overflowing
value was a *divisor* feeding a stateful accumulator, so the failure didn't fail safely. The fix adds a
floor, `MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS` (`1e-9`, module-private in `engine.js`, deliberately not a
tunable/exported constant since it's a pure numerical-safety guard rather than a balance value):
`getEffectiveTierTickSpeedSeconds` now falls back to it whenever the computed period is non-finite or
`<= 0`. A `1e-9`-second floor still lets `ticksElapsed` grow into a very large but always-finite integer
(effectively "deliver many times per real tick"), which is safe — only the literal zero/non-finite case
needed guarding against.

### XP and everything it funds became run-scoped, not permanent

`prestige.xp` and `lastTierXpConsumed` were both permanent up to this point — carried through unchanged
by both `prestigeGame` and `speedUpGame`, the same treatment given to genuinely permanent
meta-progression like `speedUpCount` or an unlocked autobuyer. The maintainer asked for this to change:
XP, and the last tier's XP-funded tickspeed bonus it funds, should reset to 0 on both Prestige and Speed
Up, the same as resources/owned/purchased — a run-scoped currency, not a permanent one like Prestige
Points.

`prestigeGame` and `speedUpGame` both now reset `prestige.xp` and `lastTierXpConsumed` to 0 (`0` is
already `createInitialGameState`'s default for both, so this is simply *not* explicitly carrying them
over — the same pattern `everUnlockedTierIds` already used for a run-scoped-not-permanent field).
`prestige.points`/`count`/`highestMilestone` are unaffected — this only touches the two fields
XP-consumption actually funds. One pre-existing asymmetry was deliberately left alone rather than
"fixed" as part of this change: `prestigeGame` already reset `highestMilestone` (the money-exponent
watermark `checkMilestones` grants further XP against) to the fresh default before this change, simply
by never explicitly carrying it over, while `speedUpGame` left it untouched (full `prestige` passthrough)
— an inconsistency between the two reset paths that predates this change and wasn't part of what was
asked, so it was left as-is rather than second-guessed.

This also happens to make the overflow scenario the previous entry's floor guards against far less
reachable in practice — `lastTierXpConsumed` resetting every Prestige/Speed Up means the ~71,333-XP
overflow threshold would need to be earned and spent within a single run between resets, rather than
accumulating indefinitely across an entire save's lifetime. The `MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS`
floor was kept regardless, as defense in depth — a single long enough run could still in principle reach
it, and the guard costs nothing when unused.

### `speedUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry

The previous entry's "left as-is rather than second-guessed" call on `speedUpGame` carrying
`prestige.highestMilestone` through untouched turned out to be wrong in practice, not just
inconsistent. A player who had already Speed Up'd at least once reported their post-Speed-Up run
showing far less unspent XP than expected — e.g. Money back at `1.319e30` (exponent 30) with 0 XP
ever spent this run, but only 1 XP available instead of the expected 30.

The cause: `checkMilestones` only awards XP for the delta between the current money exponent and
`prestige.highestMilestone` (`xp: prestige.xp + (currentMilestone - prestige.highestMilestone)`).
Money itself resets to `MONEY_STARTING_AMOUNT` on Speed Up, but `highestMilestone` — left fully
passed through — stayed at the previous run's peak (e.g. 29). The new run then had to silently
re-climb past that old watermark before any XP resumed accruing, so by the time money reached
exponent 30 again, only the 1-exponent delta above the stale watermark (30 − 29) had actually been
credited, not the full 30 a fresh run's watermark of 0 would have earned.

Fixed by having `speedUpGame` reset `prestige.highestMilestone` to `createInitialGameState()`'s
value (`0`, since `MONEY_STARTING_AMOUNT = 1`) exactly like `prestigeGame` already did, while still
leaving `prestige.points`/`count` untouched — those two remain genuinely permanent meta-progression
that Speed Up doesn't touch, unlike the milestone watermark which only exists to gate a run-scoped
currency and must track that same run's money, not a stale higher-water-mark from before the reset.

### Purchase level resized from 10 to 8, and the cost-epoch sequence changed from Fibonacci to triangular

The maintainer asked for the tier purchase-level mechanic to be redefined: a "level" should mean one
cost step, and completing a level should require buying 8 pieces of it (not 10), with production still
doubling every completed level. This was a deliberate pacing/terminology change, not a bug fix.

Before this change, "level" was purely a UI label for a tier's raw lifetime `purchased` count — the Buy
button showed `{purchased}+{quantity}` (e.g. `30+10`), and the underlying cost/production-doubling
cadence was a bare block-of-10 computed independently in three places (`getTierCost`'s
`floor(purchased/10)` epoch, `getTierBulkQuantity`'s `purchased % 10` bulk cap, and
`getPurchaseMilestoneMultiplier`'s `floor(purchased/10)` block count), plus a fourth independent literal
10 for the manual/autobuyer batch size (`BUY_QUANTITY`) and a fifth for the "smart" autobuyer's
bootstrap threshold (`purchased < 10`). Several conceptually related but separately-hardcoded `10`s also
existed: `isTierUnlocked`/`isLastTierTickspeedXpUnlocked`'s owned-count thresholds, and
`getSpeedUpRequirement`'s per-cycle step (`10 * (speedUpCount + 1)`) — the last of these was already
documented as deliberately tracking the same block size as the cost-epoch mechanic, just without an
actual shared symbol enforcing that.

Rather than mechanically substituting `10` → `8` at each of these sites independently (repeating the
original duplication with a new number), a single shared `PURCHASE_BLOCK_SIZE = 8` constant was
introduced in `layers.js`, and a new canonical `getTierLevel(purchased)` function in `engine.js` — 1-
indexed, `Math.floor(purchased / PURCHASE_BLOCK_SIZE) + 1` — became the one place that decides "which
level is this." `getTierCost`, `getTierBulkQuantity`, and `getPurchaseMilestoneMultiplier` now all derive
their epoch/block-position/completed-levels figures from `getTierLevel` instead of independently
recomputing `purchased / 8`. `isTierUnlocked`/`isLastTierTickspeedXpUnlocked`'s owned-count thresholds
and `getSpeedUpRequirement`'s per-cycle step were moved to read `PURCHASE_BLOCK_SIZE` directly (they
gate on `owned`, a different field from `purchased`, so they don't go through `getTierLevel` itself, but
they now share the same sizing constant rather than an independently-hardcoded copy of it).

One nesting was deliberately **left unchanged**: `getPurchaseMilestoneMultiplier`'s "every 10th level
gets a bigger 10x jump instead of the regular 2x" mega-milestone cadence still divides by a fixed 10,
not `PURCHASE_BLOCK_SIZE` — so that mega-milestone now lands at the 80th lifetime purchase (10 levels of
8) rather than the 100th (10 levels of 10), since levels themselves got smaller, but the "every 10
levels" spacing of the mega-jump itself is untouched. Conflating the two would have been an easy mistake
(same numeral, different mechanic) — this is the same distinction already drawn between
`PURCHASE_BLOCK_SIZE` and `GLOBAL_TICKSPEED_MILESTONE_STEP`'s unrelated 10/100/1000 spacing.

The cost-epoch exponent sequence itself was also changed, independent of the block-size resize: the old
Fibonacci sequence (1, 2, 3, 5, 8, 13, … for epochs 0-5) was replaced with a simpler triangular-number
progression (1, 2, 4, 7, 11, 16, 22, …, `exponent(e) = 1 + e*(e+1)/2`) at the maintainer's explicit
request. Epochs 0 and 1 happen to still read 1 and 2 under both sequences — the two only diverge from
epoch 2 onward (old gave 3, new gives 4) — so any test fixture or worked example anchored to the first
cost jump (level 1 → 2) reads identically either way, but anything referencing a deeper epoch needs
recomputing against the new sequence, not just the new block size, if it's ever cross-checked against
this history.

Since the cost curve's *shape* changed (not just its epoch cadence), this touches overall run pacing —
see the `simulate-run-times` skill for re-validating that a full run to Googol still completes in a
comparable simulated time after this change, since unit tests alone only validate formula correctness,
not run-length balance.

The Buy button's player-facing "level" text was also redefined to match: it now shows the tier's actual
level number and progress toward completing it (`getTierLevel(purchased)` and how many of that level's
`PURCHASE_BLOCK_SIZE` pieces are bought, e.g. `Lv.4 (5/8)`) instead of the raw lifetime `purchased` count
it used to display under the same "level" label — a genuine meaning change to the term, not just a
resize, since "level" previously meant "how many you've bought total" and now means "which cost step
you're on."

### Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking

The entry above ("Purchase level resized from 10 to 8...") introduced `PURCHASE_BLOCK_SIZE` as a
shared *constant* and `getTierLevel(purchased) = Math.floor(purchased / PURCHASE_BLOCK_SIZE) + 1` as
a *derived* accessor — level was still computed on demand from a lifetime purchased count and a fixed
divisor. The maintainer asked for this to change on the very same day: block size should not be
hardcoded at all (8 is only the starting/default value for early game) and should not be computed via
division — a tier's level and its progress toward completing it should be tracked directly, citing
Clicker Heroes as the reference for the kind of explicit per-entity level/progress tracking intended.

**Why division had to go.** Once block size can change mid-run, there is no longer a single divisor
that can reconstruct "which level is this" from a lifetime purchased count after the fact — a tier's
purchases before a block-size increase and after it don't correspond to the same-size levels, so
`purchased / blockSize` stops meaning anything coherent partway through a run. The fix: `purchased`
stays as a simple, ever-incrementing lifetime counter (kept for display and backwards compatibility),
but a tier's current level and its progress within that level become their own state fields —
`state.purchaseLevels[tierId]` (1-indexed) and `state.purchaseLevelProgress[tierId]` (0 up to the
current block size) — incremented directly, purchase by purchase, inside `buyTier`. The old
`getTierLevel(purchased)` accessor was deleted entirely rather than kept alongside the new fields, to
avoid two competing sources of truth for the same concept. `getTierCost`, `getTierBulkQuantity`,
`getTierQuantityCost`, `getTierAffordableQuantity`, and `getPurchaseMilestoneMultiplier` all changed
signature accordingly — from `(tier, purchased, ...)` to explicit `(tier, level, ...)` /
`(blockSize, levelProgress, ...)` parameters — rather than reaching into `state` themselves, keeping
them pure and testable against explicit inputs; call sites (`buyTier`, `tickGame`'s autobuyer loop,
`MainPage`) now read `state.purchaseLevels`/`state.purchaseLevelProgress` directly and pass them in.

**The growth rule.** `getPurchaseBlockSize(state)` (`engine.js`) is a single global value — one
number shared by every tier, not per-tier, per an explicit maintainer decision weighing simplicity
("simplest mental model, matches how the mechanic works today") against the alternative of letting
tiers diverge independently. It starts at `DEFAULT_PURCHASE_BLOCK_SIZE` (`8`, renamed from the old
`PURCHASE_BLOCK_SIZE` to make clear it's only a starting value) and grows by
`PURCHASE_BLOCK_SIZE_GROWTH_STEP` (`1`) every `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS` (`100`)
levels the **last tier** completes. The maintainer specified this trigger directly ("every 100
levels") after a round of back-and-forth about which progress marker should drive it; the last tier
was chosen (by the implementer, as the most consistent option) because it's the same "flagship"
marker `getSpeedUpRequirement`/`isLastTierTickspeedXpUnlocked`/`prestigeCardEverRevealed` already key
off, rather than introducing a new kind of progress signal. A deliberately-considered consequence:
because every earlier tier must already be unlocked (and permanently latched via
`everUnlockedTierIds`) by the time the last tier can reach level 100+, a block-size increase can
never retroactively raise an *already-unlocked* tier's own unlock threshold — it only makes whatever
level a tier is currently mid-way through require more purchases than it did when that level started.
`isTierUnlocked`/`isLastTierTickspeedXpUnlocked`'s owned-count thresholds and
`getSpeedUpRequirement`'s per-cycle step all now read `getPurchaseBlockSize(state)` instead of the
old fixed constant. `getSpeedUpRequirement` itself changed from a purchased-count threshold
(`PURCHASE_BLOCK_SIZE * (speedUpCount + 1)`) to a **level target** (`speedUpCount + 2`), since a
purchased-count requirement stops being a stable comparison point once block size can grow mid-run,
while a level number stays meaningful regardless. `MainPage`'s Speed Up card/button display changed
to match (showing the last tier's level and level-based requirement instead of a raw purchase count).
Both `purchaseLevels` and `purchaseLevelProgress` reset to their fresh defaults on Prestige and Speed
Up, same as `owned`/`purchased` — which, as a side effect, also resets `getPurchaseBlockSize` back
down to `DEFAULT_PURCHASE_BLOCK_SIZE` for every tier, since it's derived from the last tier's own
(now-reset) level; growth is a within-a-run phenomenon only.

**A real bug caught during this change.** The first implementation used `Infinity` as the "buy as
many as fit this level" sentinel quantity passed to `buyTierQuantity`/`tickGame` (replacing the old
fixed `BUY_QUANTITY = PURCHASE_BLOCK_SIZE`, which no longer makes sense once block size varies).
`engine.js`'s `clampNonNegative` helper (`Math.max(0, Number.isFinite(value) ? value : 0)`) treats any
non-finite value — including `Infinity` — as invalid and clamps it to `0`, so `getTierBulkQuantity`
silently returned `0` for every purchase, both manual Buy and every autobuyer, a complete (silent)
soft-lock of the entire economy. Caught by a scratch sanity script exercising the real functions
before handing off test-file work, rather than by an early test run. Fixed by using
`Number.MAX_SAFE_INTEGER` instead of `Infinity` as the sentinel everywhere it's needed
(`useIncrementalGame.js`'s `BUY_QUANTITY`, `MainPage`'s affordable-quantity preview) — finite, so it
passes through `clampNonNegative` unchanged, while still being large enough that `Math.min` against
the real remaining-in-level count always yields the real count. `clampNonNegative` itself was left
unchanged rather than special-cased to allow `Infinity` through, since its non-finite-rejection
behavior is a deliberate guard against `NaN`/`Infinity` propagating from corrupted state elsewhere in
the app, and loosening it for this one caller would have widened that guard's blast radius for every
other caller instead of just fixing the one broken call site.

A save from before `purchaseLevels`/`purchaseLevelProgress` existed is migrated on load (`storage.js`)
by deriving an equivalent level/progress from its legacy `purchased` count against
`DEFAULT_PURCHASE_BLOCK_SIZE` — the only block size that could ever have applied to such a save, since
the growth mechanic didn't exist yet when it was written. This is explicitly a one-time interpretation
of old data on load, not a reintroduction of division into the ongoing engine logic.

### `getTierCost` split into per-unit price vs. level-total price

Every purchase within a level was priced at the *level's full flat cost* — `getTierCost(tier, level)`
returned that flat value, and every one of the `blockSize` purchases needed to complete a level was
charged that same amount. This meant completing an entire level actually cost `blockSize ×
getTierCost(...)` — e.g. tier01's level 1 (`baseCost` 8) charged $8 for *each* of the 8 units needed
to complete it, $64 in total.

The maintainer's request — "the cost of each purchase within a level is 1en (`1 × 10ⁿ`); 8en is the
cost of the entire level" (n = the cost-epoch exponent driving `getCostEpochExponent`) — asked for the
opposite: `getTierCost`'s existing formula output should represent the level's *total* cost, with each
individual purchase costing an even `1/blockSize` share of it. `getTierCost` now takes `blockSize` as
a third argument and returns `Math.ceil(levelTotalCost / blockSize)`, where `levelTotalCost` is exactly
the formula's old return value (`baseCost * 10^(getCostEpochExponent(epoch) - 1)`) — unchanged. Its 3
call sites (`getTierQuantityCost`, `getTierAffordableQuantity`, `buyTier`) were updated to thread
`blockSize` through; no other call site existed (`MainPage` already only calls the blockSize-aware
wrapper functions).

**A real bug caught by review, before merging.** The first implementation returned the plain division
(`levelTotalCost / blockSize`) with no rounding. Since every real tier's `baseCost` is a multiple of
`DEFAULT_PURCHASE_BLOCK_SIZE` (8), this happened to divide evenly at the default block size — every
test in the initial diff used `blockSize=8` and passed cleanly, masking the problem. But
`getPurchaseBlockSize` (see above) grows past 8 once the last tier completes level 101, 201, … — a
state a long-running idle game is explicitly designed to reach — at which point the division stops
being exact for tiers whose own level total hasn't grown to keep pace, producing a fractional Money
balance (a direct violation of this codebase's integer-resource invariant) after every purchase from
then on. A `code-reviewer` subagent pass caught this before merge by reproducing it directly:
`getTierCost({baseCost: 8}, 1, 9)` returned `0.888…`, not `1`. Worse, in principle: a plain `Math.floor`
"fix" would have rounded a small `levelTotalCost` all the way down to `0` once `blockSize` grew large
enough relative to it — an infinite-free-purchase exploit, not just a display glitch. `Math.ceil` was
used instead of `Math.floor` specifically to rule out this failure mode: the per-unit cost is always
at least 1 whenever `levelTotalCost` is positive, and the only cost is a small, safe overcharge (up to
`blockSize - 1` extra) when a block doesn't divide evenly — never an underpayment or a free purchase.

**Net effect**: completing an entire level now costs exactly what the raw formula computes (tier01
level 1: $8, not $64) — an intentional ~`blockSize`x reduction in the total price of finishing a
level, split more granularly across individual purchases. This surfaced a real, structural side
effect during the test rewrite: a non-`smartAutobuyer` tier with a full-block batch size used to
stall forever on tier01's very first level, since `MONEY_STARTING_AMOUNT` (10) couldn't afford the
old $64 full-block price — this is the entire reason `smartAutobuyer`/`buySmartAutobuyer` exists (buy
singly until the first level completes, then revert to normal batching). Under the new $8 full-block
price, the (then-current) $10 starting balance would have afforded it outright, so at the time this
change was reviewed the bootstrap stall no longer applied to tier01 specifically — confirmed
acceptable by the maintainer rather than adjusting `MONEY_STARTING_AMOUNT` to preserve the old stall.
**This was superseded almost immediately** by the unrelated starting-money change below
(`MONEY_STARTING_AMOUNT` 10 → 1): at $1, tier01's $8 full-block price is unaffordable again, so the
stall is back in practice for every tier including tier01 — not because anyone reverted or tuned
anything to restore it, but as a side effect of a separate, independently-requested change landing
right after. `smartAutobuyer` remains meaningful either way — see `engine.test.js`'s `tickGame`
describe block for the current (stalls-again) tier01 case and the always-stalls bigger-tier case.

### Starting Money reduced from 10 to 1

`MONEY_STARTING_AMOUNT` (`layers.js`) changed from 10 to 1 — a fresh save now starts with 1 Bit
instead of 10. This is a standalone request, made independently of (and shortly after) the
`getTierCost` per-unit/level-total split above; the two happened to interact (see the note above)
but neither was chosen to compensate for the other.

One knock-on effect worth recording: `createInitialGameState`'s `prestige.highestMilestone` seeds
from `Math.floor(Math.log10(MONEY_STARTING_AMOUNT))` — this is `0` at the new starting amount, versus
`1` at the old one. `checkMilestones` awards XP once `getMoneyExponent(money) > highestMilestone`, so
the first-ever XP point now arrives as soon as Money first reaches 10 (exponent 1, clearing the fresh
watermark of 0) rather than needing to reach 100 (exponent 2, the threshold needed to clear the old
watermark of 1). This is a direct, intended mathematical consequence of the formula already in place
(not a new formula), not a separate design decision — XP itself is otherwise inert in the UI outside
the last tier's XP-funded tickspeed mechanic (see "XP status" above), so this mainly matters for
players relying on that mechanic early.

### `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model

The two entries just above this one describe an intermediate design: `getTierCost(tier, level,
blockSize)` divided a level's total cost (the raw `baseCost * 10^(epochExponent-1)` formula output)
evenly across `blockSize` purchases, rounding up to stay integer-safe. That version shipped and was
reviewed, but a further maintainer clarification revealed it had the relationship backwards: "when a
level requires X purchases, its total cost should be X×eN — every purchase is still 1×eN" (eN = the
epoch-scaled value `10^n`). Worked through concretely against Kilobytes (tier02): at the default
block size (8), both the division model and this corrected model produce the same numbers (per-unit
1,000, level-total 8,000) — but they diverge the moment block size changes. The maintainer confirmed:
if block size were ever 13, Kilobytes' level-1 total should become 13,000 (per-unit price fixed at
1,000, level total scaling *up* with block size) — not the division model's roughly-unchanged total
with a *shrinking* per-unit price.

This means `baseCost` itself needed to change, not just how the formula uses it: `baseCost` is now
the tier's fixed per-unit price (`1000^(n-1)` for `tier0n` — 1, 1,000, 1e6, … 1e27), one-eighth of the
values it held before (8, 8,000, 8e6, … 8e27) — exactly undoing the `÷8` the division model used to
apply at runtime, now baked into the stored constant instead. `getTierCost(tier, level)` dropped the
`blockSize` parameter entirely and reverted to the simple, non-divided formula (`baseCost *
10^(epochExponent-1)`) — a level's total cost is this fixed per-unit price *times* the current
`blockSize` (`getTierQuantityCost`), which grows if `blockSize` grows, rather than dividing a fixed
total across a growing `blockSize`. This also makes the `Math.ceil` rounding from the previous entry
entirely unnecessary — there's no division left anywhere in the cost path, so results are always
exact integers by construction, not by a safety-net rounding rule.

Net effect at the default block size (8, true for the vast majority of any run): identical numbers to
both the very first (pre-any-of-this-arc) behavior and the intermediate division model — a
coincidence of `baseCost`'s new values being exactly the old ones ÷ 8, and blockSize defaulting to
exactly 8. The only place this design actually differs in practice is once `getPurchaseBlockSize`
grows past its default (see above) — level totals now grow (proportionally to the larger block),
whereas the division model would have shrunk the per-unit price instead while leaving the total
roughly flat.

### Overclock: from a standalone multiplier to a Tickspeed-upgrade step boost

Overclock's first implementation (merged, then corrected one PR later — see engine.js's
`getGlobalTickspeedProductionMultiplier`/`getGlobalTickspeedRegularStep`) applied its 0.1%-per-activation
bonus as its own independently-compounding multiplier — `getOverclockMultiplier(overclockCount) =
(1.001)^overclockCount` — stacked as a third factor alongside the per-tier and (Money-funded) global
tickspeed multipliers inside `getEffectiveTierTickSpeedSeconds`. That version was reviewed, tested, and
shipped exactly as originally requested ("improves global tickspeed multiplier by 0.1%"), but the
maintainer's own request turned out to have a more specific intended mechanic than either the initial
prose or the follow-up clarifying questions surfaced: "it takes the global tickspeed upgrade from 1% to
1.1% in the first upgrade... which effectively means tickspeed multiplier becomes 1.011 from 1.01 after
first upgrade then 1.012 and so on." That's not a separate multiplier at all — it's a permanent boost to
the *existing* global tickspeed multiplier's own per-level growth rate, applied only to REGULAR levels
(the milestone step stays fixed at 10%).

The fix folded `overclockCount` directly into `getGlobalTickspeedProductionMultiplier` as a second
parameter, via a new `getGlobalTickspeedRegularStep(overclockCount) =
GLOBAL_TICKSPEED_PRODUCTION_STEP + overclockCount * OVERCLOCK_PRODUCTION_STEP`, and removed the
standalone `getOverclockMultiplier`/third-factor entirely — `getEffectiveTierTickSpeedSeconds` went back
to dividing by just two multipliers, with Overclock's contribution already baked into the global one. A
non-obvious behavioral consequence worth remembering if this is ever revisited: because the boost lives
inside the *existing* global tickspeed multiplier rather than a separate factor, Overclock now has zero
effect while the global tickspeed multiplier itself is still at level 0/not yet bought — there's no
level for the boosted step to compound over — and any level already bought before an Overclock
activation retroactively compounds at the new, higher rate from then on (not just future purchases).
This also incidentally fixed a real display bug in the first version: a tier row's "Effective tickspeed"
Details breakdown text only ever showed two of the three active multipliers, silently disagreeing with
the actual (three-multiplier) computation once `overclockCount > 0` — folding Overclock into the
existing global-multiplier factor removed the hidden third factor the display text had no branch for,
rather than requiring a separate display fix. **Don't reintroduce a standalone Overclock multiplier** —
if a future request sounds like "Overclock should add its own bonus," re-confirm against this file
first, since that reading was already tried, shipped, and specifically walked back.

### Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework

The entry above explicitly warns against reintroducing a standalone Overclock multiplier. This entry
records the case where that warning was shown to the maintainer directly during planning, and they
confirmed — after two rounds of clarification — that they wanted it back anyway, alongside a broader
rework of how Overclock is claimed. **This is not the earlier mistake repeated; it's a deliberate,
informed reversal.** A future session should treat this entry, not the one above, as the current
guidance for Overclock's reward shape — the entry above stays only as the historical record of *why*
the fold-in design was chosen the first time.

Three changes shipped together:

1. **Reward**: back to a standalone `getOverclockMultiplier(overclockCount) = (1 +
   OVERCLOCK_MULTIPLIER_STEP) ** overclockCount` (`OVERCLOCK_MULTIPLIER_STEP = 0.001`), a genuine third
   factor in `getEffectiveTierTickSpeedSeconds` alongside the per-tier and global tickspeed
   multipliers — exactly the shape the entry above reverted away from.
   `getGlobalTickspeedProductionMultiplier` drops its `overclockCount` parameter entirely and goes
   back to a plain function of `level`. The direct behavioral consequence the entry above called out
   (Overclock has zero effect while the global tickspeed multiplier is still at level 0) is gone as a
   side effect — Overclock's own factor now applies unconditionally, regardless of that other track's
   state. The display bug the original revert fixed (a tier row's "Effective tickspeed" breakdown only
   showing two of three active multipliers) had to be avoided again on this reintroduction —
   `MainPage`'s breakdown line now explicitly lists all three factors (`tier ×N, global ×N, overclock
   ×N`) rather than reusing the two-factor text unchanged.
2. **Requirement**: `getOverclockRequirement` collapses from `(overclockCount + 1) *
   OVERCLOCK_REQUIREMENT_STEP` (the old fixed 10-per-activation ladder: level 10, 20, 30, …) to
   `overclockCount * OVERCLOCK_REQUIREMENT_STEP + 2` with `OVERCLOCK_REQUIREMENT_STEP = 1` — level 2
   for the first claim, level 3 for the second, level 4 for the third, … the same `+1`-per-cycle shape
   `getSpeedUpRequirement` already uses, just without Speed Up's own display offset. The maintainer's
   framing was "no levels concept at all" beyond the last tier's own level — the intent being that the
   last tier's own (already steep) cost curve should be what gates Overclock, not an additional
   artificial multiplier stacked on top of it.

   **The `+2` floor (not `+1`) is the result of a caught review bug, not the original design.** The
   first version of this rework used `(overclockCount + 1) * OVERCLOCK_REQUIREMENT_STEP` unchanged
   (i.e. a `+1` floor, requirement 1 for the first claim) — but every tier's `purchaseLevels` starts at
   1 by default (the tier's own un-purchased state, not 0), so a requirement of exactly 1 was already
   satisfied by a completely untouched last tier. That made the first Overclock claim of *every* cycle
   free — click it the instant its panel appears, every time, for a permanent bonus at zero cost —
   directly contradicting both the "last tier's own cost curve should gate this" intent above and this
   same rework's own parallel fix to `getSpeedUpRequirement` (raising Speed Up's floor from level 1 to
   level 5 specifically so its first activation isn't free either — see the entry on that above). A
   `code-reviewer` pass caught this before merge by tracing the exact `purchaseLevels` default through
   `overclockGame`'s eligibility check, not by manual testing — worth remembering if this formula is
   ever touched again: **a `+N` floor here must always be checked against `purchaseLevels`' own
   1-indexed starting value, not just against 0.**
3. **Claim behavior — genuinely new, not a revert of anything**: `overclockGame` used to increment
   `overclockCount` by exactly 1 per activation. It now sets `overclockCount` to
   `state.purchaseLevels[lastTier.id]` directly — the last tier's level *at the moment of the claim*.
   Combined with the requirement's `+1`-per-cycle ladder, this means a player who falls behind (last
   claimed at level 5, but the last tier has since reached level 8, e.g. from letting an autobuyer run
   unattended) catches all the way up to level 8 in a single claim rather than needing three separate
   ones. The eligibility check still guarantees the jump is always at least a +1 gain over the previous
   `overclockCount`, so this can never move Overclock backwards.

A related display issue caught in the same review pass: Overclock's multiplier compounds in steps of
just 0.1% (`OVERCLOCK_MULTIPLIER_STEP`), but `MainPage`'s existing `formatRate` helper rounds to 2
decimal places — which rounds `×1.001` through `×1.004` (the first 4 claimed levels) all down to a
bare `×1`, indistinguishable from no bonus at all, on the `OverclockButton` and the tier row's
"Effective tickspeed" breakdown (the money-balance breakdown's own Overclock line was unaffected,
since it already used a separate, more precise percent formatter). Fixed with a new `formatPreciseRate`
helper (3 decimal places, same trimming convention as `formatRate`) used everywhere Overclock's own
multiplier is displayed.

Everything else about `overclockGame` (the full soft-reset shape, which permanent flags/levels carry
over, wiping `speedUpCount` back to 0) is unchanged from the original design and from the entry above
— only the reward formula, the requirement formula, and the claim's target value changed.

### Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too

A direct, same-session follow-up to the entry above ("Overclock, again"), and — importantly — this
entry supersedes that one specifically on the standalone-vs-folded question, before that PR ever
merged. The sequence within this one session: the maintainer first confirmed (twice, across two
rounds of clarification) that they wanted a standalone multiplier reintroduced, explicitly overriding
the original entry's "don't reintroduce" warning — that shipped and merged. Immediately after, as a
follow-up, they asked to raise the per-level step from `0.1%` to `1.1x`; while implementing *that* as
a second, still-unmerged PR, the maintainer clarified: "I meant for the tickspeed multiplier which
starts at 1%" — i.e. the `1.1x` was always meant to apply to the *existing* `GLOBAL_TICKSPEED_PRODUCTION_STEP`
(1%) track, not a new standalone factor unrelated to it. That reopens the exact standalone-vs-folded
question the entry above had just resolved in favor of standalone — this time resolved the other way,
before the standalone-multiplier PR's own follow-up ever reached `main`. **The original entry's
"don't reintroduce a standalone Overclock multiplier" warning turns out to be the durable guidance
after all** — a future session should default to the folded design described here unless explicitly
told otherwise, and should re-confirm carefully (as this session eventually did) before reintroducing
a standalone factor again.

What actually changed from the entry above:

1. **Reward folds back into `getGlobalTickspeedProductionMultiplier`**, reverting that function's
   signature back to `(level, overclockCount = 0)` and removing the standalone third factor from
   `getEffectiveTierTickSpeedSeconds` (back to the original two-factor division: tier × global).
   `getOverclockMultiplier(overclockCount) = (1 + OVERCLOCK_MULTIPLIER_STEP) ** overclockCount`
   (`OVERCLOCK_MULTIPLIER_STEP = 0.1`, i.e. ×1.1 per level — the value requested in the same
   follow-up) is now the growth factor multiplied into that function's own regular *and* milestone
   steps: `regularStep = GLOBAL_TICKSPEED_PRODUCTION_STEP * getOverclockMultiplier(overclockCount)`,
   `milestoneStep = GLOBAL_TICKSPEED_MILESTONE_STEP * getOverclockMultiplier(overclockCount)`. A
   direct consequence, same as before the entry above: Overclock has zero effect while the global
   tickspeed multiplier itself is still at level 0/not yet bought.
2. **Multiplicative, not additive** — this is the one deliberate difference from the very original
   pre-"Overclock, again" folded design (see the top-of-section entry), which added a flat
   percentage-point step per activation (`GLOBAL_TICKSPEED_PRODUCTION_STEP + overclockCount *
   OVERCLOCK_PRODUCTION_STEP`). Here the step *compounds*: 1% → 1.1% → 1.21% → 1.331% → … per
   claimed level, matching the maintainer's original "multiplicative per level instead of additive"
   framing from the very start of this whole thread of requests.
3. **Applies to milestone levels too** — a genuinely new twist neither prior folded design had. The
   original pre-"Overclock, again" design left `GLOBAL_TICKSPEED_MILESTONE_STEP` (10%, every 10th
   level) untouched by Overclock; this one multiplies it by the same `getOverclockMultiplier` factor
   as the regular step, per explicit maintainer choice when asked directly whether milestones should
   be included.
4. **`formatPreciseRate` (added, then simplified away, in the entry above) never mattered here** —
   `MainPage`'s Overclock displays go back to the pre-"Overclock, again" percentage-rate framing
   (`⚡ N%/lvl · Lv.X/Y`, "Tickspeed upgrade's per-level rate is now N% (was 1%) from level X")
   instead of a `×N` standalone-multiplier framing, so the precision problem that helper existed for
   doesn't arise in this design at all.

**Unchanged from the entry above** (these were never in question): `getOverclockRequirement`'s `+2`
floor (a completely untouched last tier can never make the first claim of a cycle free) and its
`+1`-per-cycle escalation beyond that floor; `overclockGame`'s catch-up claim (`overclockCount` jumps
straight to the last tier's current level, not just `+1`); the full soft-reset shape and which
permanent flags/levels survive it; wiping `speedUpCount` to 0 on claim.

### The 1000-Byte Invest tier drops from two claims to one

An earlier entry ("The same round also corrected a misreading of 'Invest for Double Production'…",
above) gave the four Invest cost-ladder tiers up to and including `INTRO_AUTO_INVEST_THRESHOLD`
(1/10/100/1000 Bytes) two claims each, via `getIntroProductionMilestoneMaxClaims(tier) =>
getIntroProductionMilestoneCost(tier) <= INTRO_AUTO_INVEST_THRESHOLD ? 2 : 1`. A follow-up request
("Single claim at 1000B. Not two claims.") narrowed that: only the three tiers strictly *below*
`INTRO_AUTO_INVEST_THRESHOLD` (1/10/100 Bytes) still get two claims — the 1000-Byte tier itself now
gets one, same as every tier after it. The fix is a one-character boundary change (`<=` → `<`) in
`getIntroProductionMilestoneMaxClaims`; nothing else about the independent cost-ladder model from the
entry above changed.

### Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature

Requested as "once all storages are built and full and memory is also full, convert the entire
memory into Compute Cores. 1 Compute Core costs 10 MB memory; 1 Compute Node costs 8 Compute Cores."
Several things in that one-line request needed pinning down before implementation, confirmed with
the maintainer rather than guessed:

- **Trigger**: automatic every tick (`tickComputeCoreConversion`, called from `tickGame`), not a
  manual button — the same posture every other Byte Foundry automation (`tickStorageAutoFill`/
  `tickIntroAutoInvest`) already has.
- **"All storages built and full" needs a finite set to check.** Before this feature, the Storage
  bank ladder (`getStorageBankSize`) was open-ended — it walks `tier01`'s own level-cost sequence
  forever, advancing to the next size every `STORAGE_BANK_LADDER_CAP` banks built. An open-ended
  ladder can never be exhaustively "all built and full" for long (the next size always appears once
  the current one caps out). The maintainer's own clarification ("Banks only go up to 1 MB") became
  a new constant, `STORAGE_BANK_LADDER_MAX_SIZE = 1_000_000` — `getStorageBankSize` now stops
  advancing once it reaches that size, so `getComputeCoreStorageSizes()` can enumerate a small, fixed
  3-size set (1 KB, 10 KB, 1 MB) for `isComputeCoreConversionReady` to check exhaustively.
- **Permanence**: `intro.computeCores`/`intro.computeNodes` are permanent, carried over every real
  Prestige exactly like the Byte generator/Storage banks (`prestigeGame`) — confirmed explicitly
  rather than assumed, since Memory itself (the currency they're converted from) resets every cycle.
- **Payoff**: pure counters for now, no gameplay effect — explicitly deferred rather than invented
  (an unrequested "what should Compute Nodes unlock" design would have been scope creep on a
  one-line feature request).

**Two different "MB" conventions collided, and had to be kept apart rather than unified.** This
codebase already had two incompatible meanings for "1 MB" before this feature: Memory's own display
scale (`getMemoryUnit` in `ByteFoundryPage`, `BITS_PER_BYTE × 1000²` = 8,000,000 bits per "MB",
matching what the player actually sees the Memory tile denominated in) and the Storage bank
ladder's own informal naming (`tier01`'s level-3 per-unit cost, 1,000,000 bits, called "1 MB" in
existing comments purely because it numerically matches `tier02`'s `baseCost` — see the "Byte
Foundry Storage" comment in `layers.js`, predating this feature). `STORAGE_BANK_LADDER_MAX_SIZE`
(1,000,000) deliberately reuses the Storage ladder's own convention, since it caps that exact
ladder. `COMPUTE_CORE_MEMORY_COST` ("10 MB memory" per the request) deliberately uses the OTHER
convention instead (80,000,000 bits) — Compute Cores are costed in whatever the player actually
sees Memory's own balance in, not the Storage-ladder/`tier01`-cost scale a Compute Core has no
direct relationship to. This wasn't an arbitrary tie-breaker: 80,000,000 bits is exactly the 8th
step of the Sacrifice capacity ladder (8 × 10⁷, one of `capacity`'s own actual reachable values), so
a cycle that's Sacrificed capacity up that far converts a genuinely full Memory balance into whole
Compute Cores with zero remainder — the Storage-ladder convention's 1,000,000 has no such alignment
with the capacity ladder. If this is ever revisited, don't silently unify the two "MB" meanings —
they're deliberately different constants for deliberately different reasons, and conflating them
would either break the capacity-ladder alignment above or break the Storage ladder's own cap.

**This entire design was superseded almost immediately** — see the next entry below. Kept here
verbatim as a record of the reasoning that produced it (and because the Storage-ladder-vs-Memory-
display "two different MBs" distinction it documents is still true and still relevant, independent
of the Compute Core mechanic built on top of it), not because any of it still describes current
behavior.

### Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate

The entry above shipped, then was immediately walked back in the same session before merging, once
the maintainer thought through the mechanic further in a follow-up message: "make Compute Cores 10x
less powerful than I mentioned and build up from there... A Compute Core shall always cost full
memory capacity flushed but memory capacity upgrades will still be possible indefinitely but banks
will be available only for tier 01 cost steps only. So increasing capacity will essentially make
Compute Core effectively costly but user has to decide where to stop for best efficiency. Reveal
Compute Cores once user has 100KB Memory capacity."

This replaces the entire trigger/cost/reveal model from the previous entry:

- **Cost**: no longer a fixed `COMPUTE_CORE_MEMORY_COST` (80,000,000 bits) — a Compute Core now
  costs the CURRENT `intro.capacity`, flushing it entirely to 0 (`tickComputeCoreConversion`),
  exactly mirroring `pickIntroCapacityMilestone`/Sacrifice's own "drains the ENTIRE balance"
  behavior. Since `capacity` only grows via Sacrifice (never shrinks), this makes the strategic
  trade explicit: Sacrifice further for a bigger-but-slower-to-refill flush (fewer, larger Cores
  over time), or stop Sacrificing at a lower capacity for a smaller-but-faster one (more, smaller
  Cores over time) — "user has to decide where to stop for best efficiency," in the maintainer's own
  words. A player can, in principle, still click Sacrifice after Compute Cores are active (the
  automatic conversion doesn't disable the button) — but since both act on the identical "Memory is
  full" moment and the automatic conversion fires every tick (~10Hz), in practice continuing to
  grow capacity past this point means deliberately choosing not to let a full-Memory tick auto-fire
  a conversion, which only really works if the player has stopped relying on automatic conversion
  firing at all yet. This tension was accepted as-is rather than engineered around (e.g. by making
  Sacrifice and Compute Core conversion a paired manual choice) — the maintainer was offered that
  alternative explicitly (a manual "choose Sacrifice or Convert each time Memory fills" framing) and
  chose the automatic one instead.
- **Gate**: `isComputeCoreConversionReady`'s Storage-bank-fullness check is gone entirely, replaced
  by `isComputeCoreConversionUnlocked` — a pure capacity-magnitude predicate
  (`capacity >= INTRO_COMPUTE_CORE_UNLOCK_CAPACITY`, 800,000 bits/"100 KB" in Memory's own display
  scale, one Sacrifice stage past Storage's own reveal), the same convention
  `isIntroConversionUnlocked`/`isStorageUnlocked` already use. Compute Cores are now completely
  unrelated to Storage — a save with zero Storage banks ever built converts Memory into Cores just
  as readily as one with a maxed-out Storage section.
- **The Storage ladder cap is reverted.** `STORAGE_BANK_LADDER_MAX_SIZE` existed for exactly one
  reason — so the old Storage-fullness-based readiness check had a finite set of sizes
  (`getComputeCoreStorageSizes`) to check exhaustively. With that check gone, the cap serves no
  purpose; `getStorageBankSize` goes back to advancing indefinitely through `tier01`'s level-cost
  sequence forever, as it did before this whole feature existed. ("Banks will be available only for
  tier01 cost steps only" in the maintainer's message turned out to just be restating this original,
  uncapped behavior — not requesting a change from it.)
- **This is Phase 1 only.** The maintainer's full vision for these resources is considerably larger:
  spending Compute Cores (or higher, merged tiers) activates a temporary game-speed multiplier via
  one of several duration/cost presets ("16-Core Burst for 10 min," "4-Core Standard for 1 hour,"
  "2-Core Sustain for 10 hours" — the exact multiplier numbers given, 16×/4×/2×, were confirmed as
  applying specifically at the Compute NODE tier, with Cores themselves "10x less powerful" than
  that), and Cores merge upward through a whole ladder (8 Cores → 1 Node → 1 Cluster → 1 Network → 1
  Grid, each merge worth another 10x), with its own dedicated page reachable once 8 Cores are held.
  None of that shipped here — only the cost/reveal/trigger rework above, `intro.computeCores`/
  `computeNodes` remaining pure counters with no gameplay effect yet. The maintainer explicitly chose
  to phase this (rather than build the whole thing in one pass) given how much of the activation
  system's own numbers were still being worked out live in conversation; the deferred scope is
  tracked as a follow-up `claude-task` issue rather than guessed at here.

### Sacrifice for 10x Capacity gated behind every other currently-possible action

Requested tersely: "Offer memory capacity upgrade only after all other possible upgrades are done."
"Memory capacity upgrade" is Sacrifice for 10x Capacity (the only action that grows `intro.capacity`
at all); "all other possible upgrades" resolved to the two other Byte Foundry milestone-style
actions available at the same moment — Combine into a Byte (before `byteCreated`) and Invest for
Double Production — plus building a Storage bank once Storage is revealed. Compute Core conversion
was deliberately excluded: it doesn't touch `capacity` at all (it spends Memory, not grows the cap),
so it isn't a "capacity upgrade" and this gate doesn't apply to it — the pre-existing tension between
automatic Compute Core conversion and manual Sacrifice both firing on the same "Memory is full"
moment (see the "Compute Cores reworked" entry above) is unaffected by this change.

The gate (`isMemoryCapacityUpgradeAvailable`) is enforced inside `pickIntroCapacityMilestone` itself,
not just a disabled UI button, matching this codebase's standing "engine re-validates, UI just
mirrors it" convention (see CLAUDE.md's "Security notes"). A non-obvious consequence worth
remembering if this is ever revisited: Invest's own cost ladder (`getIntroProductionMilestoneCost`)
starts at the exact same `INTRO_STARTING_CAPACITY` value and grows by the exact same
`INTRO_CAPACITY_MULTIPLIER` `capacity` itself does — the two ladders are numerically identical unless
the player has claimed a different number of Invest tiers than Sacrifice picks. In practice this
means the current Invest tier is almost always simultaneously affordable the instant Memory becomes
full, so claiming it becomes a de facto prerequisite click before every single Sacrifice, not an
occasional one — this was accepted as the natural, intended consequence of the request rather than
something to engineer around (e.g. by decoupling the two ladders or exempting Invest from the gate),
since it's exactly what "offer capacity upgrade only after all other upgrades are done" means in
practice once the two ladders are that closely coupled by construction.

**Update:** the pool 1 byte generator change (#457, see "Pool 1 byte generator" further down this
section) later did split the two ladders into independent multipliers (`INTRO_CAPACITY_DOUBLING_STEP`
= 2 for capacity, `INTRO_BANDWIDTH_COST_MULTIPLIER` = 4 for Invest's own cost) — not to "engineer
around" the coupling described above, but as a side effect of the maintainer's own explicit new spec
for both ladders independently. They're no longer numerically identical even at tier 0 by
construction; the "claiming Invest becomes a de facto prerequisite" behavior above may or may not
still hold in practice under the new numbers and hasn't been re-verified.

This broke several existing tests that had previously (correctly, before this change) asserted
Sacrifice and Invest were fully independent and simultaneously available from a fresh starting
balance — those tests were updated to explicitly clear the Invest-claimed gate
(`productionMilestoneTierClaims` already at max) wherever the test's actual point was Sacrifice's
own behavior, and to assert the new "blocked while Invest is still claimable" state directly where
that's what the test was checking instead (`engine.test.js`'s `isMemoryCapacityUpgradeAvailable`/
`pickIntroCapacityMilestone` suites, `App.test.jsx`'s Sacrifice/Invest integration tests).

### Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately

A string of "Update engine.js"/"Update layers.js" commits, made directly through GitHub's web editor
rather than through Claude Code, landed on `main` over a few days without going through the PR
review/test loop this repo otherwise relies on (see "Pull requests"/economy-change-review skill in
CLAUDE.md). Most were genuine, if informally-made, balance tweaks (see below), but two of them
silently resurfaced designs this file already recorded as deliberately superseded:

1. **`getTierCost`'s cost-epoch exponent sequence reverted from triangular back to Fibonacci.** Three
   rapid, self-correcting edits (a naive O(2^n) recursive `fib`, then a memoized-but-still-Fibonacci
   rewrite) replaced the triangular-number formula documented in "Purchase level resized from 10 to
   8, and the cost-epoch sequence changed from Fibonacci to triangular" above — the exact sequence
   that entry says was replaced "at the maintainer's explicit request." The reintroduced version also
   had a live bug: `getTierCost(tier, 0)` / negative levels returned `undefined` instead of clamping
   to level 1 (the memoized array had no entry at a negative index), whereas the triangular formula's
   `Math.max(0, clampNonNegative(level) - 1)` epoch clamp handled that case correctly.
2. **`getIntroProductionMilestoneMaxClaims` reverted from a flat `1` back to `tier > 2 ? 1 : 2`.** This
   undoes "The same round also tightened 'Invest for Double Production' to a single claim per tier
   across the board (an explicit request...)" above almost exactly (a different hardcoded condition
   than the removed `INTRO_AUTO_INVEST_THRESHOLD` cutoff, but the same "first few tiers get 2 claims"
   shape).

Both were first reverted back to the documented (triangular / flat-1-claim) designs in a same-day
follow-up PR, on the reasoning that an un-reviewed direct commit landing on a design this file already
records as explicitly rejected was much more likely an accident than a considered decision — this file's
own "check `docs/DESIGN_HISTORY.md` before changing a formula a past iteration already tried and
rejected" instruction is exactly what a from-scratch review of the diff would have triggered, and a
direct web-UI edit has no such review step at all.

The maintainer then explicitly asked to keep both changes going forward — both are the maintainer's own
deliberate, direct instruction, not a repeat of the un-reviewed-commit gap above; this entry itself is
that instruction being followed. Both were reinstated a second time, with the Fibonacci sequence
implemented cleanly this time: `getCostEpochExponent` computes the sequence via a straightforward
iterative loop (no module-level mutable cache, no recursion), and `getTierCost`'s own existing
`Math.max(0, clampNonNegative(level) - 1)` epoch clamp (unchanged throughout all of this) means the
level ≤ 0 bug the original buggy commit had is not present in the reinstated version — clamping happens
in `getTierCost` itself before `getCostEpochExponent` is ever called, so the exponent function never
sees a level-derived negative epoch to mishandle. `getIntroProductionMilestoneMaxClaims` is back to
`tier > 2 ? 1 : 2` (2 claims for the three cheapest Invest tiers, 1 for every tier after).

Because the Fibonacci exponent sequence (1, 2, 3, 5, 8, 13, … for epochs 0-5) diverges from the
triangular one (1, 2, 4, 7, 11, 16, …) starting at epoch 2 (level 3), every piece of documentation
describing tier01's cost-skip pattern for the Storage bank ladder changed too: under Fibonacci, level 3
(100,000 bits, "100 KB") is NOT skipped — level 4 is the first skip, jumping straight to 10,000,000
bits ("10 MB") and skipping 1,000,000 ("1 MB") instead. Every reference to the old "100,000 is skipped,
a 100 KB bank can never exist" narrative (`CLAUDE.md`, `docs/ECONOMY_REFERENCE.md`, comments in
`layers.js`/`engine.js`) was rewritten to the new "1,000,000 is skipped, a 1 MB bank can never exist"
one, and every test asserting a specific `getTierCost`/`getStorageBankSize` value at level ≥ 3 was
recomputed against the Fibonacci sequence.

The remaining constant tweaks in the same commit
run (`OVERCLOCK_PRODUCTION_STEP` 0.001→0.01, `AUTO_SPEED_UP_COST` 100→20, `TICKSPEED_AUTOBUYER_COST`
20→10, `AUTO_PRESTIGE_AUTOBUYER_COST` 500→100, `INTRO_BITS_PER_KILOBYTE_CONVERSION` 1000→8000,
`INTRO_COMPUTE_CORE_UNLOCK_CAPACITY` 800,000→8,000,000) don't match any previously-rejected design
recorded here, so they were kept as genuine (if informal) balance changes — comments/tests/docs across
`layers.js`/`engine.js`/`ByteFoundryPage`/`ECONOMY_REFERENCE.md`/`MAINPAGE_REFERENCE.md`/`CLAUDE.md`
were brought back in sync with them rather than reverted. One of the same commits also corrected a
real, pre-existing drift: `TIER_DEFINITIONS`' `baseTickSpeedSeconds` ladder had read tier01=2s through
tier10=11s since Bytes was removed from the tier list, even though "Reintroducing the 1s-10s
tickspeed ladder" above (and its own empirical `simulate-run-times` validation) specifically
documents a `tierIndex + 1` (1s-10s) ladder — the commit's 2s-11s → 1s-10s edit brought the code back
in line with that already-validated, already-documented design, so it was kept rather than treated as
a third regression.

Two ByteFoundryPage formatting call sites were also fixed in the same pass — not directly caused by
this commit run's constant changes, but exposed by the accompanying `formatStorageSize` →
`formatBitsInNearestUnit` rename sweep across two of these same commits, which correctly migrated most
call sites (Storage bank redeem/empty/not-built squares, their aria-labels/tooltips) but missed the
Build button's own size label (left it on the old function) and one transfer-block fallback tooltip
(left it on the *new* function, inconsistent with its own sibling branch one line above using the
other). `formatStorageSize` itself also picked up a real bug mid-rename: its internal number
formatting was switched from `formatAmount` to `formatBitsInNearestUnit`, which expects a raw bit
count and produces garbage (e.g. "0.125 B KB") when fed the already-KiloBit-scaled `value` the
function computes internally. All three were fixed together: `formatStorageSize` restored to
`formatAmount` internally (keeping the rename's own correct part — a hardcoded `1000` divisor/
threshold decoupled from `INTRO_BITS_PER_KILOBYTE_CONVERSION`, so this KiloBit-denominated display
scale doesn't silently drift if that unrelated constant changes again), and every size-denominated
call site (Build button label, Storage bank squares) consistently uses `formatStorageSize`, while
every genuine Byte-denominated cost (Storage build cost, transfer-block cost, Invest cost, Memory
capacity) consistently uses `formatBitsInNearestUnit`. The `size === INTRO_BITS_PER_KILOBYTE_CONVERSION`
"smallest bank exempt from the auto-redeem toggle" check in `tickStorageAutoRedeem` had the same class
of bug — it happened to equal the smallest Storage bank size (1000) only because
`INTRO_BITS_PER_KILOBYTE_CONVERSION` used to also be 1000; once that constant became 8000 (a
different scale, per above) the comparison silently stopped matching the actual smallest bank size,
so it was changed to compare against `getFirstTierCost(1)` (tier01's own real level-1 cost) directly.

### Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation

Every earlier Compute Cores/Nodes entry above ends the same way: "pure counters today, no gameplay
effect yet." This entry is the first mechanic that actually spends them, requested in the same
terse, iterative style as the mechanic's own earlier design ("Burst is 16x for 1 min / Standard is
4x for 10 mins / Sustain is 2x for an hour... Use as temporary production multipliers for the base
production tier of each screen... User can stack upto 10 of these for extended duration but only of
same types"), with one live clarifying round: the maintainer initially described each preset as
costing a matching number of Cores ("16-Core Burst," "4-Core Standard," "2-Core Sustain"), which
directly contradicts `COMPUTE_ENTITY_CAP` (10) — a Core balance can never reach 16. Asked directly,
the maintainer clarified: "16x, 4x, 2x are not costs. Those are the choices for effect for 10s, 1
min and 10mins respectively" — i.e. those numbers are the MULTIPLIER strength only; the actual cost
is a flat 1 Compute Core per activation regardless of which preset is chosen, matching the original
framing ("Each usage of a Compute Core gives 3 choices"). **If this is ever revisited, don't
reintroduce a per-preset Core cost** — that reading was already tried, contradicted the entity cap,
and was explicitly corrected.

Durations moved during the same conversation before landing on the final numbers implemented here:
`COMPUTE_BOOST_PRESETS` in `layers.js` — Burst 10s, Standard 60s, Sustain 600s.

### Compute Boost tier scaling: 4× effect only, no duration enhancement (#363)

Issue #326 originally scaled higher merge tiers with `COMPUTE_BOOST_TIER_POWER_STEP = 8` (exponential
power) plus linear duration (`preset.durationSeconds * tierIndex`). That over-rewarded merging:
normal slots per tier are capped (`COMPUTE_ENTITY_CAP`), so leaving tokens unmerged is already pure
wastage, and auto-merge already adds a dedicated reserve pool (`COMPUTE_MERGE_RESERVE_CAP`) for
merging. The maintainer therefore cut the step to **4× effect only** and removed duration scaling
entirely — `getComputeBoostTierDurationSeconds` returns the base preset duration for every valid
tier.

**Later revisit:** duration doubling was restored (`COMPUTE_BOOST_TIER_DURATION_STEP = 2`, i.e.
`durationSeconds * 2^(tierIndex-1)`) while keeping **4× effect**. Rationale: reward merging with
longer Boost uptime (“effect time doubles after merge”) without returning to the old linear
`× tierIndex` formula or the steeper 8× power step. Achievement-based multipliers remain a
separate, later lever. **If flattening duration again, document why slot-cap incentives alone are
enough.**

### Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380)

Fixed second tables (60s doubling, then 1s×10^n experiments in #370/#371/#372) drifted from Foundry
Invest pacing. The locked rule: **no hardcoded absolute seconds** — Core→Node = 10×
`capacity / getIntroProductionRate` (unboosted); each next boundary ×10 the previous, or ×5 after a
sequential duration upgrade. Snapshot at merge start so mid-merge Invest/Boost changes do not
rescale in-flight timers.

Auto-Boost (30 PP) covers the stuck case where a reserve merge is already in flight and that
tier's normal slots refill to cap — spend via preferred preset (default Standard) from the
**biggest** such waiting tier. It never forfeits an active boost to switch presets (that would
surprise). Switching presets while one is active requires an **explicit forfeit confirmation**
(same `window.confirm` posture as Reset — Sacrifice itself dropped its own confirm step later, see
this file's "Sacrifice confirm" entry near the top) — Stack remains the non-destructive extend
path for the same type+tier.

"The base production tier of each screen... memory for Foundry, tier01 for main game" was
interpreted as: a SINGLE boost effect (one Core spend, one active preset) that multiplies BOTH
Memory's own passive production (Byte Foundry) and `tier01`'s (Kilobytes') production (main game)
*simultaneously* whenever active — not two independent, separately-targetable boosts. This reading
was chosen (not confirmed) because introducing two independent boost-target selections would have
doubled the state/UI surface for a request that gave no signal such a choice was wanted. If this
turns out wrong, the fix is additive: a `computeBoostTarget` field and a per-target multiplier
check, rather than removing anything already shipped.

Also implemented alongside this: a confirmation before Sacrifice for 10x Capacity actually fired
(`window.confirm` originally — later replaced by an in-game `ConfirmDialog`, with the “future Cores
cost more” warning shown only once Compute is unlocked). Same permanence caveat as Settings →
Danger zone Reset. **Superseded 2026-08-25:** the confirm dialog was removed entirely — see this
file's own top "Sacrifice confirm" entry and `handleSacrificeClick` in `ByteFoundryPage`, which now
fires immediately.

### Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens

Requested directly: force an explicit priority order across the Byte Foundry's five recurring
"upgrade" actions, disabling every lower-ranked one whenever a higher-ranked one is currently
available — generalizing a pattern that already existed for exactly one pair (Sacrifice was already
gated behind Combine/Invest/a buildable Storage bank, see "Sacrifice for 10x Capacity gated behind
every other currently-possible action" above) into a full five-item chain, and adding two brand-new
blocking conditions to that chain (a redeemable Storage Bank Fill, an activatable Compute Boost) that
didn't participate in the gate at all before. Implemented as base predicates
(`isStorageBankFillAvailable`/`isBandwidthAvailable`/`isStorageBankBuildAvailable`/
`isComputeUpgradeAvailable`) composed into "turn"-suffixed predicates that fold the ranking in
(`isBandwidthTurnAvailable`/`isStorageBankBuildTurnAvailable`/`isComputeBoostTurnAvailable`), each
enforced inside its own reducer (not just a UI-disabled state) — the same "engine re-validates"
posture the codebase already applies everywhere else. One correction made mid-implementation:
`isStorageBankBuildAvailable` was initially written wrapped in an `isStorageUnlocked` check, mirroring
the OLD `isMemoryCapacityUpgradeAvailable`'s own inline logic — but `buildStorageBank` itself has
never required that threshold (only the UI reveal does), and wrapping it broke an existing
`buildStorageBank` unit test that builds a bank below the Storage-reveal capacity. The wrapper was
dropped; in practice this changes nothing observable through the UI, since a bank can never be
buildable before `isStorageUnlocked` is true anyway (their thresholds coincide by construction — see
`INTRO_STORAGE_UNLOCK_CAPACITY`'s own comment in `layers.js`).

Requested alongside this: move Storage and Compute off ByteFoundryPage onto their own freshly
designed screens (`StoragePage`/`ComputePage`), each reached via a nav button shown once revealed,
worded as "reveal the dedicated screen on clicking that button once it is affordable." Read
literally, this would gate the NAV BUTTON itself on the same priority chain as the actions inside
it — but implementing that literally and testing it end-to-end surfaced a real problem: with the nav
button disabled whenever nothing on that screen is currently actionable, a player can never open
Storage to check on an already-built-but-not-yet-affordable-to-redeem bank, or open Compute to see
banked Cores/Nodes, since "nothing currently actionable" is a common, ordinary state, not an edge
case. That's a materially worse experience than the rest of the app's own established convention —
MainPage's "⚙️ Byte Foundry" link is always enabled once unlocked, a permanent, voluntarily-
revisitable screen regardless of what's currently affordable on it. The nav buttons were changed to
follow that same always-enabled-once-revealed convention instead: `onOpenStorage`/`onOpenCompute` are
plain, unconditional handlers, and only the actions INSIDE `StoragePage`/`ComputePage` (Build,
Redeem, activate a Boost) stay gated by the priority chain. If a stricter, affordability-gated nav
button is what was actually wanted, that's a one-line change at each nav button's own `disabled`
prop (`disabled={!(isStorageBankFillAvailable(state) || isStorageBankBuildTurnAvailable(state))}` for
Storage, `disabled={!isComputeUpgradeTurnAvailable(state)}` for Compute) — nothing else in the engine
layer would need to change.

This also meant fixing `App.jsx`'s own gate-override logic: `showingFoundry` previously forced
`ByteFoundryPage` back onto the screen whenever `!intro.mainGameUnlocked`, *regardless* of `page`,
with only `'info'` exempted (a deliberate courtesy so Auto-Prestige firing while reading the Guide
page doesn't yank the player off it). Since `'storage'`/`'compute'` are reached only via a button ON
`ByteFoundryPage` itself, and Storage/Compute's own reveal thresholds sit far above
`mainGameUnlocked`'s own much-earlier flip point, the unmodified override made those two pages
**permanently unreachable during the mandatory gate phase** — caught by an App-level test
(`fireEvent.click` on the nav button silently landing back on the ByteFoundryPage heading instead of
navigating). `'storage'`/`'compute'` were added to the same exclusion `'info'` already had.

### Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix

Requested directly: rename "Storage Bank(s)" to "Disk(s)" throughout, and layer several genuinely
new mechanics on top — building now costs real time (not just Bits) and temporarily takes the whole
array offline while it happens; each array gets a small staging cache that must fill before any disk
in it can; and a fix to a bug the request called out explicitly: a "1 KB" disk was sized/costed in
raw bits (1000), not real Kilobytes (1000 Bytes = 8000 bits) — "Kilobytes, Not Kilobits." A later
message in the same thread widened the scope further: a Disk should be able to redeem into ANY
main-game tier whose current price happens to match its size, not just tier01/Kilobytes, with ties
broken by the main game's own tier order — "if order is later changed, it should automatically
follow that as well."

**The bug and its fix.** `getStorageBankSize` (the buildable-size ladder) and `getStorageBankCost`
both operated on `tier01`'s raw per-unit level cost (1000, 10000, …) with no `BITS_PER_BYTE`
conversion — so a "1 KB" bank actually needed only 1000 Byte-Foundry bits to fill, while everything
else in the Byte Foundry (`getIntroKilobyteConversionCost`, Memory's own B/KB/MB display scale) had
always treated "1 KB" as 8000 bits (`BITS_PER_BYTE × 1000`), the real definition of a Kilobyte. A
code comment on the old `formatStorageSize` even flagged this explicitly at the time ("1000 bits is
'1 KB' here ('KiloBits', not 1000 Bytes/8000 bits)") without anyone having connected it to a
player-facing bug yet. The fix: `getDiskSize` now multiplies by `BITS_PER_BYTE` at every ladder step,
exactly like `getIntroKilobyteConversionCost` already does — which, as a direct consequence, made the
two functions compute an *identical* value at tier01's current level, so `isDiskRedeemable` could be
rewritten to just reuse `getIntroKilobyteConversionCost(state)` instead of a parallel
`getFirstTierCost(level) * BITS_PER_BYTE` call (later generalized further — see below).
`getDiskCost` dropped its own now-redundant `* BITS_PER_BYTE` factor, since `capacityBits` is already
Byte-accurate by the time it's called; the "10x" build-cost multiple itself was never actually wrong,
only what it was ten times *of*. `formatStorageSize`'s whole separate "kilobit" formatting scale
(`STORAGE_UNIT_SYMBOLS`, dividing by 1000 with no Byte conversion) was deleted outright —
`formatDiskSize` is now simply an alias for `formatBitsInNearestUnit`, the exact scale Memory's own
balance already renders in, so there is no longer a second, inconsistent "KB" definition anywhere in
the Byte Foundry.

**Timed builds and the array-wide lockout.** Three points here were confirmed directly before
implementing, each because a plausible alternative reading would have produced very different code:
(1) the build-time formula — "adding a 6th disk to a 5 disk array will take 6 seconds" against a
1-second-per-KB base reads as either a flat per-disk time (contradicting the example) or a
position-scaled one; confirmed **position × base** (`getDiskBuildBaseSeconds(size) * ordinal`, where
`ordinal` is `disksBuiltTotal[size] + 1` at the moment the build starts) — a 1 KB array's 6th disk
takes 6×1s, a 10 KB array's 6th disk takes 6×10s; (2) what the per-array "cache" actually does beyond
being a visual subdivision — confirmed a genuine staging pool (`intro.diskCache[size]`, `size` bits,
`DISK_CACHE_BLOCK_COUNT` (8) equal blocks) that Memory must fill completely before `tickDiskAutoFill`
pours it into an empty container, with a full block manually releasable back into Memory
(`releaseDiskCacheBlock`) to redirect those bits elsewhere instead — which also resolves, by ordinary
bookkeeping rather than a special-cased guard, the request's own "transferring a disk to the same
level cannot be possible if cache was used since it will exceed the required amount": bits a player
manually released out of the cache are simply gone from it, so they can never *also* complete (and
later redeem) that same disk — no double-spend is possible by construction; (3) auto-redeem's gating
— confirmed it should key on the redeeming tier's own unit-buying autobuyer being active
(`autobuyers[tier.id]` unlocked AND `autobuyersEnabled[tier.id]` not paused), fully REPLACING the old
standalone, never-exposed-in-UI `storageAutoRedeemEnabled` flag (deleted, along with
`setStorageAutoRedeemEnabled` and its dead "smallest denomination always auto-redeems regardless"
carve-out) rather than adding a second condition alongside it.

A build now spends its cost immediately (`startDiskBuild`) but only sets a countdown
(`intro.diskBuild = { size, remainingSeconds, totalSeconds }`) — `disksBuiltTotal[size]` doesn't
actually increment until `tickDiskBuild` counts `remainingSeconds` down to zero, wired into
`tickGame` right alongside `tickIntroProduction`. "Temporarily disables all disks in the array …
all IO operations to those Disks are disallowed" is enforced everywhere that size's data is touched
during that window — `tickDiskAutoFill`/`tickDiskAutoRedeem` skip it entirely (other sizes are
unaffected), and `redeemDisk`/`isDiskCacheBlockReleasable`/`releaseDiskCacheBlock` all no-op against
it — rather than only disabling the UI's own buttons, the same "engine re-validates, UI just mirrors
it" posture every other Byte Foundry mechanic already follows.

**Redemption against any tier, with a live tie-break.** The follow-up widening this to every
main-game tier turned out to fall out of the existing cost model almost for free: every tier shares
`costResourceId: 'base'` (Bits — see `TIER_DEFINITIONS` in `layers.js`), so "a tier's current
per-unit cost, converted to Byte-Foundry bits via `× BITS_PER_BYTE`" was never actually
tier01-specific, just written that way. A new internal `getMatchingTierForDiskSize(state,
capacityBits)` walks `TIER_DEFINITIONS` **in its own array order** and returns the first tier whose
current cost matches — both "any tier can be fulfilled" and "ties break toward the main game's own
priority order" fall out of that single `Array.prototype.find` call, and because it reads
`TIER_DEFINITIONS` live rather than a hardcoded tier index, a future reordering of that array changes
both behaviors automatically, exactly as requested ("if order is later changed, it should
automatically follow that as well") with no further code change anywhere in this file.
`isDiskRedeemable`/`redeemDisk`/`tickDiskAutoRedeem` were all rewritten in terms of this helper;
`getDiskRedeemTierName` exposes the matched tier's display name to `StoragePage`/`ByteFoundryPage` so
their copy ("Redeems 1 10 KB disk for 1 free Megabyte") never hardcodes "Kilobyte" again. The
disk-*size* ladder itself (`getDiskSize`, still walking tier01's own level-cost sequence) was
deliberately left untouched by this widening — the request's "conflict due to same cost for multiple
tiers" language is about redemption eligibility, not about which sizes ever get offered to build, so
generalizing the build ladder itself was out of scope.

**Migration.** `intro.storageBanks`/`storageBanksBuiltTotal`/`storageAutoRedeemedSizes` are forwarded
to their renamed `disks`/`disksBuiltTotal`/`diskAutoRedeemedSizes` fields explicitly in
`storage.js`'s `migrateState` (same "old name → new name" shape as the `Ones → base` MONEY_ID
forwarding) — `diskCache`/`diskBuild` are brand-new fields with no legacy equivalent, so they simply
fall through to `createInitialGameState`'s fresh defaults on an old save. The removed
`storageAutoRedeemEnabled` field is left unread wherever a legacy save's `saved.intro` still gets
spread in — the same "harmless once nothing reads it" posture every other superseded field in that
function already has.

**Unrelated aside landing in the same change**: MainPage's headline balance (`MoneyHero`) now
switches from Bits to whole Bytes once the balance reaches 8000 Bits (`formatMoneyBalance`,
`MONEY_BYTES_DISPLAY_THRESHOLD`) — a separate, much smaller request bundled into the same PR. Every
other `formatCurrency` call site (costs, production numbers, the Prestige-threshold overlay) was
deliberately left alone, since those represent an actual priced/spent Bits amount rather than a
headline balance meant to stay readable as it grows.

### `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size

Requested directly ("Cache should be refilled ASAP upon use — that is the purpose of cache"),
prompting a closer look at `tickDiskAutoFill` rather than a UI change. The original loop picked one
global "smallest still-fillable size" each iteration and re-evaluated fresh next iteration — so if
that smallest size's cache wasn't yet full and Memory ran out of bits, the loop broke immediately,
`if (bits <= 0) break`, without ever revisiting a *larger* size whose cache had already been fully
staged (from an earlier tick) and was just waiting to pour into its own empty container. Pouring a
complete cache costs no further bits at all — only topping up an incomplete one does — but the
smallest-size-first re-selection never gave that larger size another turn once a smaller one had
first claim on this tick's Memory and couldn't finish. A fully-staged cache could sit converted-but-
unpoured indefinitely, purely because of contention from an unrelated, smaller array, directly
undermining the cache's whole purpose: converting to a disk (and becoming refillable again) the
instant it's ready, not "whenever the smallest size in the ladder happens to also be satisfied."

The fix processes every size in one ascending pass instead, each to its own local fixed point
before moving on: for a given size, first check whether its cache is already full (`cached >= size`)
— if so, pour when an empty container exists, otherwise stop touching that size for this tick; only
once genuinely below `size` does the bits-availability check even apply, and only when an empty
container exists at all (never pre-staging bits for a container that doesn't exist, which is what
the original code already got right and this fix preserves — see the "cascades smallest to largest…
leaving the remainder in Memory" test, which pins exactly this). A regression test seeds a smaller
size with an empty cache that can never finish this tick (not enough bits) alongside a larger size
whose cache is already fully staged, and asserts the larger one still pours — this failed under the
old code (the larger size's `disks` count stayed at 0) and passes under the fix.

A later follow-up (#360) extended the same ASAP idea past auto-redeem: `tickGame`'s post-
`tickDiskAutoRedeem` pass re-runs `tickDiskAutoFill` only when auto-redeem actually changed
state, so an emptied container's cache can start topping up the same tick when Memory allows —
without a trailing fill on every no-op pass, and without sync-filling inside manual `redeemDisk`
(that would steal Memory Forced Priority just freed for Bandwidth). Foundry Memory lists every
currently transferable size via `getRelevantDiskSizesForFoundry` (not only the ladder's current
build size), and always keeps the highest shown size even when unmatched (issue #389), with
DiskArrayRow making Cache → Tiers Bits (manual-only) and Disks auto vs manual
redeem visually distinct (auto-eligible disks are not clickable).

### Foundry Memory always keeps the highest Disk row (issue #389)

Earlier Foundry Memory hid every `DiskArrayRow` once no shown size matched a tier cost
(`getRelevantDiskSizesForFoundry` returned `[]`). That removed the most useful row: the highest
ladder size, which is usually the incomplete array the player is still filling. Now the helper
always appends the largest size from `getDiskSizesToShow` when it is not already in the matching
set — matching sizes stay ascending; Disks tab / StoragePage remain the full-history view.

### ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight

Requested directly, in three related lines: "Storage need not be shown in Foundry if main game
costs of all tiers already exceed its capacity"; "Only the transferrable size should be shown or
none"; "Transfer to main is redundant section." Two genuinely different UI elements, each with a
real risk of over-hiding something load-bearing, so both were confirmed via follow-up questions
before touching code.

**The Disk/Cache detail row.** The obvious reading — hide the whole Storage section, Build button
included, whenever the current size isn't currently redeemable — would have broken a documented,
intentional strategy: "a player can build ahead of or fall behind tier01's actual price" (see
"Economy model"). Confirmed narrower: only `components/DiskArrayRow`'s own cache-blocks/disk-
squares detail for non-matching sizes hid (later relaxed by #389 to always keep the highest shown
size); the Build button stays
visible and usable regardless, since building ahead of the curve is still exactly the point. The
row's full history remains reviewable on StoragePage either way, so nothing is actually lost by
hiding older unmatched detail on the Foundry screen itself.

**The Transfer-to-Main-Game row.** "Transfer to main is redundant section" reads, taken literally,
as removing the ONLY guaranteed way a fresh cycle ever unlocks the main game — `redeemDisk` never
sets `intro.mainGameUnlocked`, only `convertIntroBitsToKilobytes`/`tickIntroAutoInvest` do, and the
always-on auto-convert has no manual UI of its own to fall back on if this row simply vanished.
Confirmed the condition directly: hide the row once Storage unlocks (`isStorageUnlocked`), since
Disk redemption becomes an alternative path to tier units at that point. But Storage's own reveal
threshold (`INTRO_DISK_UNLOCK_CAPACITY`, reached purely via capacity, itself grown only by repeated
Sacrifice) is completely independent of ever having transferred at all — so a player could in
principle reach it without ever unlocking the main game. Rather than implement the literal
condition and strand that edge case behind a permanently-hidden-but-still-mandatory gate, the final
gate is `isStorageUnlocked(state) && intro.mainGameUnlocked` — identical player-visible behavior in
every ordinary run (the main game is almost always unlocked well before Storage's much higher
threshold), but the row never disappears while it's still the only way out of the mandatory gate.
The always-on auto-convert (`tickIntroAutoInvest`) is completely unaffected either way — it never
depended on the manual row being rendered, so once auto-convert and Disk redemption are both doing
the job, the manual row really is the redundant piece being described.

### Era ascension and Eons — meta-prestige above Unbounded (#407 / #405)

> **2026-09-02 update:** the "reuses the Byte Foundry gate as a familiar rhythm" framing below, and
> the "Skip the Foundry gate after Era — rejected" call, both describe the ORIGINAL design and no
> longer hold — see the "Byte Foundry gate made permanent, one-time-ever" entry at the top of this
> file. `intro.mainGameUnlocked` is now a permanent one-time-ever latch; Era ascension (like
> ordinary Prestige) no longer sends the player back through the Byte Foundry gate, though it still
> resets Foundry Capacity and everything else this entry describes as wiped.

After **Unbounded Prestige** (#405) removed the production freeze at 100 lifetime prestiges, the
endgame needed a deeper reset layer that still felt voluntary rather than another hard wall.
**Era ascension** is that layer: when unspent Prestige Points reach **1 Googol PP**
(`ERA_ELIGIBILITY_PP = GOOGOL`), the player may voluntarily ascend from Settings, earn **Eons**
(meta currency), and take a Foundry/Factory wipe far deeper than ordinary Prestige — without
re-freezing production at the threshold.

**Motivation.** Unbounded Prestige solved “stuck at 1 Googol Bytes until you Prestige” but left no
long-horizon sink once PP accumulation itself became the grind. Era ascension reuses the Byte Foundry
gate as a familiar rhythm (every ascend sends you back through Foundry before Factory) while wiping
holdings that ordinary Prestige deliberately kept permanent — generator upgrades, Disks, compute
ladder entities, owned Compute (Flops) units, Double PP level — so each Era feels like a genuine
ascension, not a cosmetic counter.

**Why balance threshold, not lifetime earned or prestige count.** Eligibility keys off **unspent
`prestige.points >= GOOGOL`**, not `prestige.count` or lifetime PP earned:
- **Count** would fire immediately for anyone who already passed Unbounded’s 100-prestige latch,
  skipping the intended “hold a Googol PP bank” moment.
- **Lifetime earned** is not tracked as a first-class field and would conflate spending (Double PP,
  Flops buys, automation unlocks) with readiness — a player who *spent* down after earning Googol PP
  would still read “eligible” under a lifetime metric, or vice versa, depending on implementation.
- **Balance** matches the player-visible “I am holding Googol PP right now” decision and mirrors how
  other PP gates (Compute reveal at 100 PP) already work.

**Why voluntary, not a freeze.** Unbounded Prestige’s whole point is that production continues past
1 Googol Bytes; adding a second hard freeze at Googol PP would undo that UX. Era ascension is
opt-in from Settings (with confirmation) — same posture as Prestige after Unbounded unlocks.

**Why `byteCreated` persists but Sacrifice/Invest/Disks/Compute/Flops holdings wipe.** The Byte
generator’s *existence* (`intro.byteCreated`) is the permanent “you’ve combined once” marker; wiping
it would force re-tapping through the very first combine on every Era, which reads as a tutorial
replay rather than a meta reset. Everything *built on top* of that generator — capacity/production
tracks, Disk arrays, compute entities, Flops owned counts, `foundryResetCaps` convenience state — is
cycle-scoped progress that Era is meant to clear. Ordinary Prestige already reset Memory each cycle
while keeping those Foundry assets (see 2026-09-02 update above re: the main-game gate); Era extends
that wipe to the assets Prestige had made permanent.

**What persists vs. resets (shipped in #410 / UI in #411).** Automation unlock flags and pause
states, tier/tickspeed autobuyer milestone objects, `prestige.unboundedUnlocked`, museum,
`computeFlops.pageUnlocked`, hyperscalers, Eon upgrade levels, Flops autobuyer unlock flags, and
Eons balance (+ award) carry through. Factory resources/owned, `prestige.points`/`count`,
`prestigeDoublePpLevel`, `computeFlops.owned`/`cumulativeBoost`, in-flight `diskBuild`, and full
Foundry upgrade state reset. Era *N* free-unlocks the *N*th Compute tier’s autobuyer via
`applyFlopsAutobuyerMilestones` — a permanent unlock track that survives the wipe.

**Rejected alternatives.**
- **Skip the Foundry gate after Era** — rejected at the time (the gate was still the pacing rhythm
  every Prestige cycle used); later reversed for BOTH Prestige and Era ascension by the 2026-09-02
  permanent-gate change noted above, on explicit maintainer instruction, not a revival of this
  rejection.
- **Keep unspent PP balance across Era** — rejected; Googol PP is the eligibility key; carrying the
  bank forward would collapse Era into a label with no economic reset.
- **Reset `prestige.count` without latching Unbounded** — rejected; `prestige.unboundedUnlocked` is
  latched from count ≥ 100 (or the flag itself) *before* count zeroes so Unbounded production never
  re-locks after an Era.
- **Reset automation unlocks** — rejected; players already earned those milestones across many
  prestiges; wiping them would punish long saves without adding a new decision.
- **Eon spend tree in the same PR** — deferred to #414 (`blocked` until spend design lands); engine
  ships hyperscaler/`buyHyperscaler` hooks but shop UI waits.

See `docs/ECONOMY_REFERENCE.md` “Era ascension and Eons” for the live constant table; issues #407
(parent epic), #405 (Unbounded), #410 (engine), #411 (UI).

### Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456)

Requested directly by the maintainer as the first slice of a larger redesign: eventually, each of
the 10 storage pools (KB…QB, matching the existing Disk-ladder/Tier denominations) gets its own
independent Byte generator with a hard-capped, binary-unit capacity ladder — but that full 10-pool
system (new generator instances, an unlock cascade keyed off the previous pool's Disk arrays all
being complete, and a compacted UI fitting each pool into ~3 lines) is real follow-up work, tracked
under epic #456. This entry covers only what #457 actually shipped: converting the existing single
Byte Foundry generator into what will become "pool 1" (the Kilobyte pool) under the new mechanics.

**Binary vs. SI — why split the unit scale at all.** Memory Capacity answers "how much can this
generator hold," which is a *count* concept the maintainer wanted expressed in the same binary
(IEC-style) units real memory/RAM specs use — KiB/MiB/…, 1 KiB = 1024 Bytes. Disk *sizes* answer
"how big is this storage container," a concept the game had already settled on SI units for (see
the "Disk ladder offers every Byte power-of-ten size" entry below) — SI stayed unchanged rather than
also moving to binary, since Storage's own ladder (1 KB → 10 KB → 100 KB → …) is fundamentally a
decimal progression that binary units would only make less readable. Mechanically this meant
splitting `getMemoryUnit`/`formatBitsInNearestUnit` (now binary-only, backing Memory's own
capacity/balance/cost displays) from a new internal SI-only pair (`getSiByteUnit`/
`formatBitsInNearestSiUnit`, backing `formatDiskSize`) — before this change the two were literally
the same function (`formatDiskSize` was `export const formatDiskSize = formatBitsInNearestUnit`),
a coupling that only worked because both scales used to be identical.

**Why capacity doubles-and-caps instead of growing ×10 forever.** The old ladder
(`INTRO_CAPACITY_MULTIPLIER = 10`, unbounded) grew capacity by the same factor forever; the
maintainer's spec instead wanted "Memory Capacity doubles on each upgrade" with a hard ceiling per
generator — "a byte generator['s] memory capacity is capped in a way that it cannot go to the next
capacity tier," worked from the one given example ("MB byte generator shall not reach 1GiB
capacity," starting at 1 Byte). Generalizing that single example: pool *N*'s generator capacity
caps at the largest power of two strictly below `1024^(N+1)` bytes — pool 1 (this generator) caps
below 1 MiB (512 KiB, `INTRO_CAPACITY_CAP_BITS`); pool 2 (MB, not yet built) would cap below 1 GiB,
matching the example exactly; pool 3 (GB) below 1 TiB; and so on. `INTRO_CAPACITY_MULTIPLIER` split
into two independent constants — `INTRO_CAPACITY_DOUBLING_STEP` (2, capacity growth) and
`INTRO_BANDWIDTH_COST_MULTIPLIER` (4, Bandwidth's own cost ladder, see below) — since they'd
previously shared one constant only because both ladders happened to use the same ×10 step, not
because they're conceptually linked.

**Why `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY` moved.** The old flat threshold (8,000,000 bits, ~1 MB)
predates this change and sat *above* pool 1's new 512 KiB hard cap — under the new capped-doubling
model that threshold would have become permanently unreachable, silently locking Compute Cores out
of the game for anyone who only ever plays pool 1. Retuned to half the new cap (2,097,152 bits, one
doubling-step short of it), preserving the original's relative position as the last/highest of the
three capacity-gated Byte Foundry reveals (conversion < storage < compute-core).

**Why Bandwidth's cost ladder moved to ×4 (not ×2, and not left at ×10).** The maintainer's spec
said Bandwidth "also doubles on each upgrade" (already true — Invest's production-doubling *effect*
was already ×2 via `INTRO_PRODUCTION_MULTIPLIER_STEP`, unrelated to the old ×10 constant) "but
offered for every power of 4 instead of 10." Read against the actual code, "offered" maps to the
cost ladder's own step multiplier (`getIntroProductionMilestoneCost`), not a new gate layered on
top of the existing bit-affordability check — so this shipped as a straight ×10 → ×4 swap for that
one constant, keeping claims-per-tier structurally unchanged. The pre-existing compute-funded
overflow path for when the bit cost exceeds capacity (#323) did need one real change — see below.

**The capacity cap turned a pre-existing overflow valve into a permanent dead-end — caught by
adversarial review, not by the original design pass.** Issue #323's compute-funded Bandwidth path
(sacrifice `COMPUTE_ENTITY_CAP` of a compute-ladder tier, Cores through Megacomputers in order, when
the bit cost exceeds capacity) only ever reset its own walk-through-the-list index via a successful
Sacrifice — fine when Sacrifice grew capacity unboundedly, since the player could always eventually
Sacrifice their way back to affordability. Once Sacrifice terminates at `INTRO_CAPACITY_CAP_BITS`,
that same design permanently dead-ends: once Bandwidth's ever-growing bit cost (×4/tier, unbounded)
exceeds the now-fixed capacity ceiling **and** all 10 compute-ladder tiers have been spent once each,
`pickIntroProductionMilestone` becomes a same-reference no-op forever — the only reset path
(`rollbackComputeFundedBandwidth`, only ever called from a successful Sacrifice) is itself
permanently blocked by the same cap. Violates this codebase's own "nothing here ever fully freezes"
invariant. Fixed by wrapping `computeBandwidthSacrificeIndex` modulo `COMPUTE_BOOST_TIER_FIELDS.length`
instead of letting it terminate at the end of the list (`getEffectiveComputeBandwidthSacrificeIndex`
in `engine.js`) — Bandwidth can keep progressing indefinitely off compute-ladder tokens, which stay
earnable forever via `purchaseBoosterFromDataLake` (spending deposited Disk stock, unrelated to
Memory/capacity), even after Sacrifice itself is permanently exhausted. Also normalizes any
out-of-range persisted index from a save written before this fix, rather than leaving it stuck at
the old terminal value. This is the kind of interaction the mandatory adversarial `code-reviewer`
pass exists to catch (see `CLAUDE.md`'s "Pull requests") — it wasn't visible from the diff of either
change in isolation (the cap and the overflow valve were both pre-existing, unrelated designs; only
their combination broke).

**No save migration.** Existing saves' `intro.capacity` values, grown under the old ×10 ladder, can
already exceed the new 512 KiB cap (e.g. a save that Sacrificed past 800,000 bits). Rather than
writing a migration to remap those values onto the new doubling sequence, the cap check
(`isMemoryCapacityAtCap`) is a plain forward-looking `capacity`-vs-`INTRO_CAPACITY_CAP_BITS`
comparison: a save already past the cap simply can't Sacrifice further from load onward — no crash,
no data loss, no special-cased migration function. Covered by an explicit test
(`engine.test.js`, "does not crash on a save whose capacity already exceeds the new cap").

**Update: the cap was wrong — 512 KiB couldn't afford the pool's own largest Disk.** The original cap
derivation above (largest power of two strictly below the next binary tier — 512 KiB for pool 1)
matched the maintainer's literal framing ("shall not reach 1GiB capacity" for the MB-pool example)
but didn't check the number against the pool's own mechanics: pool 1's largest buildable Disk is the
100 KB rung (the third and last size before `getDiskSize` would advance into pool 2), and
`startDiskBuild` spends `getDiskCost` — `DISK_BUILD_COST_MULTIPLIER` (10) times that Disk's own
800,000-bit face value, 8,000,000 bits — from Memory in one shot. Since Memory's balance can never
exceed `capacity`, a 512 KiB cap (4,194,304 bits) made that Disk permanently unbuildable — the player
could Sacrifice all the way to the cap and still never afford it. Caught by the maintainer directly,
with a worked example ("if KB Data lake is AT capacity 64 KB, we can only do KB to Core conversion
only 64 times unless we upgrade it" for Data Lakes, generalized to "the max memory capacity of MB
pool should be 1 GiB. So that we can build 100 MB disks" for capacity) — not caught by any of the
four adversarial review rounds this PR went through, since none of them cross-checked the cap against
`getDiskCost` for the pool's own ladder. Fixed by changing `INTRO_CAPACITY_CAP_BITS` from `BITS_PER_BYTE
* (MEMORY_BINARY_UNIT_STEP ** 2 / INTRO_CAPACITY_DOUBLING_STEP)` (512 KiB) to `BITS_PER_BYTE *
MEMORY_BINARY_UNIT_STEP ** 2` (exactly 1 MiB, 8,388,608 bits) — the smallest value in the doubling
sequence (`8 * 2^n`) that covers the 8,000,000-bit build cost, which happens to land exactly on the
next full binary-unit boundary. This generalizes cleanly to the deferred multi-pool system: each
pool's cap is "one full binary tier" (1 MiB for the KB pool, 1 GiB for the MB pool, matching the
maintainer's own corrected example, and so on), not "just under" it.
`INTRO_COMPUTE_CORE_UNLOCK_CAPACITY` (still half the cap) moved in lockstep, from 2,097,152 to
4,194,304 bits (512 KiB) — coincidentally the exact value the *old*, pre-this-PR cap used to be. Every
doc/test numeric reference to the old 512 KiB/256 KiB values was swept and updated to match.

**Update: Disk build cost now renders in SI, not binary.** Raised in the same round of maintainer
feedback: `ByteFoundryPage`'s "Build Disk" button and its `title` showed the build cost
(`getDiskCost`) through `formatBitsInNearestUnit` — Memory's own binary scale — even though that
cost is `DISK_BUILD_COST_MULTIPLIER` (10) times the Disk's own SI-scaled face value ("Because they
are exactly 10x of their own capacity which is measured in SI units," in the maintainer's words),
so it read as e.g. "9.765 KiB" beside the disk's own "1 KB" size label — two different unit systems
in the same sentence for two numbers that are a fixed multiple of each other. Switched to
`formatDiskSize` (SI) so the cost renders as "10 KB" instead, matching the Disk's own size scale.
Memory's own balance/capacity, Sacrifice's cost, and Invest's cost are unaffected — they stay on the
binary scale, since those are genuinely Memory-denominated (capacity-relative) amounts, not
Disk-denominated ones.

**Update: fixing the cap only moved the same reachability wall one rung further out — found by
adversarial review, not by the maintainer.** The cap fix above made pool 1's 100 KB Disk buildable,
but `getDiskSize` is a single, uncapped, global ladder — nothing in the code actually stops it at a
"pool boundary"; that's purely a documentation/planning concept until pools 2-10 exist. So once a
player builds all 10 disks at 100 KB (itself only reachable *because* of the cap fix),
`getDiskSize` advanced to the next rung, 1 MB, whose own build cost (`getDiskCost` =
`DISK_BUILD_COST_MULTIPLIER` × 8,000,000 face value = 80,000,000 bits) permanently exceeds
`INTRO_CAPACITY_CAP_BITS` (8,388,608 bits) — with no pool 2 generator yet to fund it, and unlike
Bandwidth's own compute-funded overflow valve (#323, fixed in round 2 of this same PR's review),
Disk Build had no alternate-currency fallback at all. This reproduces, one rung later, the exact
same "nothing here ever fully freezes" violation the 100 KB fix was meant to close — caught by the
fifth adversarial review round on this PR, after four prior rounds (including the one that
confirmed the 100 KB fix itself) all missed it.

Rather than giving Disk Build an overflow valve (which would let pool 1 fund arbitrarily large
disks with no real pool 2 behind them — semantically wrong, since a "1 MB disk" is supposed to
belong to the MB pool's own future generator), the fix instead makes the pool boundary a REAL ladder
limit: `getDiskSize` now stops advancing at `MAX_ACTIVE_DISK_LADDER_STEP` (`DATA_LAKE_SUB_SIZES.length`
— 3, reusing the exact grouping the Data Lake system already uses to carve the disk ladder into
per-pool tiers via `getDataLakeTierIndex`, rather than inventing a second, competing "3 sizes per
pool" constant) — today, pool 1's own 1/10/100 KB sizes — and a new `isDiskLadderExhaustedForActivePools`
predicate (true once the array at that boundary size is fully built) gates `isDiskBuildAvailable`
permanently false from that point on. `ByteFoundryPage` shows a distinct "🏦 Pool complete" state
(disabled, `$progress` pinned to 100, a title explaining more pools are coming) instead of an
ever-climbing-but-never-affordable idle button. This is a genuine, if narrower, scope tightening:
Disk-based tier redemption for Megabytes and beyond is not reachable via pool 1 alone until a
future pool's own generator exists (epic #456) — the ordinary Buy button remains the primary path
for every tier regardless, as it always has been; Disk redemption was always a bonus path, not the
only one.

**Deferred to #456's follow-up epic**: the actual per-storage-pool multi-generator system (pools
2–10, each an independent instance of the mechanics above), the unlock cascade keyed off the
previous pool's Disk arrays all being complete, and the full 10-pool compact UI. Rebuilding those
against pool 1's now-shipped mechanics, rather than guessing ahead, was a deliberate scoping choice
— see file-task-issue's "specs go stale" guidance for why an unbuilt multi-instance state shape is
better designed after playing with the single-instance version first.

## Save persistence

### Migration in `src/save-migration/`, runs on every load — 2026-08-22

Through mid-2026, `storage.js` carried a large `migrateState` path inline on **every** load (tier-id
remaps, `resources.Ones` → `base`, `intro.completed` → `mainGameUnlocked`, Storage bank renames,
boolean→numeric autobuyers, purchase-level derivation, autobuyer-milestone backfill, disk-ladder gap
fill, …). That kept old saves playable, but mixed persistence, schema evolution, and game logic in
one file — hard to reason about and impossible to test migration in isolation.

**PR #403 split.** Legacy inline migration was removed. Saves that still carry pre-schema markers
and have no implemented step yet are **discarded on load** with `IncompatibleSaveNotice` (**Start
fresh**). Current-schema saves (including unstamped partial saves that already match today's shape)
load via `mergeState` forward-fill only.

**Going forward: dedicated `src/save-migration/` assistant.** The game **offloads** every on-disk
payload to this folder on load — it does not implement schema transforms itself. The assistant's
only job is: raw parsed JSON in → **current-schema-compatible game state out** (or `{ ok: false,
reason }` when no version-chain step can get there). Called from `storage.js`'s `loadGameState` and
`discardIncompatibleActiveSaveIfNeeded` before `mergeState`. Persistence (`storage.js`) reads/writes
localStorage, stamps `saveSchemaVersion`, forwards to the assistant, then merges missing fields from
`createInitialGameState()`. Engine, pages, and hooks never import legacy shapes.

When the shape changes again:

1. Bump `SAVE_SCHEMA_VERSION` in `save-migration/constants.js`.
2. Add `save-migration/steps/migrateVnToVnPlus1.js` and wire it into the version chain in
   `save-migration/index.js`.
3. Teach `mergeState` any new defaults — forward-fill only, never legacy transforms.

Until a step exists for a legacy marker, migration returns `{ ok: false, reason }` and the slot is
cleared — same player-visible behavior as today. Restoring v0→v1 means reimplementing the deleted
`migrateState` logic inside `save-migration/steps/`, not re-inlining it into `storage.js`.

Historical sections elsewhere in this file that mention `migrateState`, `shiftOldTierIds`, or inline
on-load backfills describe **removed** behavior kept for incident context only.

## Distribution

### Why a PWA instead of Capacitor/native app-store distribution

The maintainer originally asked for Android/iOS "native app" support. Two native routes were
considered and rejected: Capacitor-wrapped app-store publishing needs an Apple Developer account, a
Google Play Console account, code-signing secrets, and a human-gated store-review process the
automation can never fully own end-to-end; a full React Native rewrite is a much larger, indefinitely
dual-maintained codebase sharing only the DOM-free `engine.js` layer with the web app. A PWA (via
`vite-plugin-pwa`) was chosen instead specifically because it stays 100% within what this repo's
existing fully-automated PR/CI/deploy pipeline can build and ship end-to-end, with zero new accounts,
secrets, or ongoing manual review — at the cost of no real app-store listing. If app-store presence
becomes a real requirement later, Capacitor is the natural next step (it can wrap the same built
`dist/` output), but that's a deliberate, human-initiated escalation, not something this repo's
automation should reach for on its own.

## Documentation

### Why semver/changelog started at v0.5.0, not v0.1.0-from-inception

`package.json`'s `"version"` sat at the placeholder `"0.1.0"` unchanged since the project's very
first commit — nothing ever read or bumped it, and there were no git tags. Rather than either leaving
it meaningless forever or trying to carve the entire pre-changelog commit history into a long, finely
granular version sequence after the fact, the retroactive `CHANGELOG.md` groups that history into five
versions (`v0.1.0`–`v0.5.0`) at natural thematic/chronological boundaries in the real commit log —
coarser than "one version per notable commit," but enough to give the project a real, taggable
version history instead of an eternal `0.1.0` stub. `v0.5.0` (this change) is where the convention
actually starts being *maintained* going forward — every subsequent PR is expected to add its own
`Unreleased` entry, which the retroactive history obviously couldn't have done for itself.

## Testing

The unmount-before-`vi.useRealTimers()` ordering requirement (see CLAUDE.md's Testing section) isn't
merely a style preference — it's a real regression that was caught while raising `TICK_RATE_MS` to
10Hz: unmounting while fake timers are still active lets the effect cleanup's `clearInterval` cancel
the pending periodic callback against the same (fake) timer implementation that scheduled it;
unmounting afterward calls the *real* `clearInterval` with a stale fake-timer id, which silently fails
to cancel it, leaving a live interval running that starves subsequent `userEvent`-based tests into
timing out.

`yarn test`'s 356 tests all assert against the current tier/resource id scheme (`MONEY_ID = 'Ones'`,
tier ids `tier01`/`tier02`/… with display names `Tens`/`Thousands`/…) — don't reintroduce the older
lowercase scheme (`'money'`, `'ones'`, `'hundreds'`) that a previous, unfinished rename left behind in
the tests; that mismatch has been reconciled in favor of the current `layers.js`/`engine.js` source.


### Disk ladder offers every Byte power-of-ten size (issue #368)

The build ladder previously walked tier01's level-cost sequence (×`BITS_PER_BYTE`), which skipped
sizes whenever cost-epoch exponents jumped — notably **100 KB → 10 MB**, never **1 MB**. That made
the intended "10 MB Memory capacity → build 1 MB disks → redeem into Tier02/Megabytes at level 1"
path impossible (1 MB disk face value = Tier02 L1 × 8 bits/byte; build cost = 10× = 10 MB Memory).

Replaced with an explicit ×10 Byte ladder (`DISK_LADDER_BASE_SIZE_BITS` / `DISK_LADDER_SIZE_MULTIPLIER`):
1 KB → 10 KB → 100 KB → 1 MB → 10 MB → …. Redeem matching is unchanged. Saves that already own a
larger disk size get every smaller new-ladder size marked fully built on load so the offer does not
Rewind.

### Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382)

Reported that Memory showed no progress while Cache was filling — `tickDiskAutoFill` drained
Memory into the cache bit-by-bit. Clarified intent: Cache should stay full as its steady state
(except right after a block is consumed or a size is newly unlocked); Memory should fill visibly
and transfer only when sufficient for a whole cache block; Cache's only use is manually funding
matching main-game tier level blocks (e.g. a 1 MB array → 8 × 1 Mb).

Supersedes the earlier "staging buffer that must fill before pouring into an empty disk"
model: emptying Cache into disks constantly fought the "always full" steady state. Empty disks
now fill **directly from Memory** (spend `size` bits per container). Cache refill is a separate
first pass that keeps every known size full in whole-block quanta (with a capacity&lt;block dump
so large arrays can still progress when Memory capacity cannot hold one block). The earlier
"fully-staged cache must still pour even when a smaller size is bit-starved" fix is obsolete —
there is no pour step anymore; Cache simply stays full while disks compete for Memory on their
own pass.


### Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442)

#430 redirected `tier01` onto `BYTES_ID` so Clock Speed could spend a dedicated Bytes pool, and
updated the Kilobyte row to show `+N B`. MoneyHero, Prestige, and tier Buys still read
`resources.base` (Bits). With no Bits income from Factory production, the headline balance sat
frozen and Prestige was unreachable from the ladder alone — reported from mobile as "Byte Factory
balance is stuck."

Fix (#442): keep crediting the Bytes pool for Clock Speed, and mirror each Byte into Bits at
`production × BITS_PER_BYTE` inside `tickGame`. That restores MoneyHero/`formatMoneyBalance` and
the existing Bits-denominated Prestige threshold without moving Prestige onto the Bytes pool (a
larger follow-up). Disk-cache releases still add Bits separately; Clock Speed still spends only
Bytes.


### Timed read-cache → disk flush (#445)

#434's read-cache → disk pour was instant once the cache was full and no tier claim blocked ladder
use. That made the pour hard to see beside write-cache's timed flush, and out of step with how long
Memory takes to stage one cache block at the current Byte Foundry rate.

Flush duration is now `(size / DISK_CACHE_BLOCK_COUNT) / getIntroProductionRate` — one cache block
at production rate — stored in `intro.diskReadCacheFlush[size]` for the in-flight countdown.
Flush pauses while `isDiskRedeemable` is true at that size (tier funding wins), and cancels if the
array goes mid-build or loses its empty container. UI drains the read-cache row during the pour.
Write-cache collect/flush timing is unchanged.

### Compute Boost base presets: fixing a total-extra-production ordering bug

Requested directly, alongside a detailed Booster/Data Lake spec (most of which — `DATA_LAKE_CAPACITY`
999, the 9×1/9×10/9×100 sub-slot structure, the triangular `n(n+1)/2` cumulative Booster cost with
no hardcoded cap, and reusing the existing 8:1 compute-ladder merge for Boosters — the codebase
already matched exactly by the time this was checked, having evolved through #361/#383/#434/#445-446
independently). One real bug remained: the base (tier 1/Core) `COMPUTE_BOOST_PRESETS` values —
`burst` ×32/1 minute, `standard` ×8/10 minutes, `sustain` ×2/1 hour — violated the intended design
invariant that a preset's own total extra production, `(multiplier - 1) * durationSeconds`, should
strictly increase Burst → Standard → Sustain (a longer commitment should always net more total
output, or there's no reason to ever pick it over Burst). The old values gave Standard 70
multiplier-minutes of extra output but Sustain only 60 — Sustain was strictly worse than Standard
despite committing 6x longer. Replaced with `burst` ×20/10 minutes, `standard` ×5/1 hour, `sustain`
×2/10 hours — 190/240/600 multiplier-minutes respectively, strictly increasing as intended (see
`layers.test.js`'s dedicated ordering test). `COMPUTE_BOOST_TIER_POWER_STEP`/
`COMPUTE_BOOST_TIER_DURATION_STEP` (the per-Booster-tier scaling above these base values) were left
untouched — the request's own tier-breadth idea (a higher Booster tier applying the effect to more
resource tiers at once, rather than scaling multiplier/duration further) is a separate, larger
question still being scoped given `COMPUTE_BOOST_TIER_DURATION_STEP`'s duration-doubling was itself
a deliberate restoration after #363 had flattened it (see that entry above).

### Data Lake Boosters: spending real deposits, not a separate "used" ledger

A follow-up correction to the same request above: "Data Lake is refillable, in fact refilled soon
after consumption of cost of each booster. So there is a limit of 999 boosters of each size because
the 1000th booster costs more than the capacity of the corresponding data lake." The original
`purchaseBoosterFromDataLake` tracked spend against a separate `lake.used` counter that only ever
grew, subtracted from the (separately capped-at-999) `deposited` total — so a full lake's
n×(n+1)/2 ≤ 999 triangular sum naturally capped purchases around 44, permanently, with no way to
ever buy more from that lake again even after depositing further Disks (`used` never decreased).
That's not what was actually wanted: a Booster purchase should spend real, currently-deposited
capacity — capacity that comes back the same way it arrived, by depositing more Disks once that
array rebuilds a replacement through the ordinary build/fill pipeline (confirmed directly: "using
same process as array disk refill," i.e. no new bespoke refill timer — reuse `depositDiskToDataLake`
and the existing disk build/cache/redeem loop as-is).

Fix: `lake.used` is gone. `getDataLakeAvailableUnits` is now simply `getDataLakeDepositedUnits` (no
subtraction) — spent capacity is genuinely removed from `deposits`, decomposed back down into the
100s/10s/1s sub-slot digits via a new `decomposeDataLakeDeposits` helper (valid because a deposited
total 0..999, with each digit place capped at `DATA_LAKE_SLOT_MAX`/9, is always exactly its own
base-10 hundreds/tens/ones decomposition). This makes `getMaxBoosterPurchasesForCapacity`'s existing
triangular-sum result (44 for a full lake) a "burst from one full tank" number rather than the
tier's lifetime cap — a patient player who keeps redepositing between purchases can push the cost
arbitrarily higher, all the way up to the true ceiling: since a lake can never hold more than
`DATA_LAKE_CAPACITY` (999) at once, the 1,000th purchase (costing 1,000) can never be funded no
matter how much gets redeposited, so the real lifetime cap is exactly 999 Boosters per tier — see
`engine.test.js`'s dedicated test walking a lake from purchase 998 through 999 and confirming 1,000
is permanently unaffordable.

### Removing Claim Core: superseded by Data Lake Boosters

A third follow-up correction to the same Booster/Data Lake request: "Remove the claim core logic
when memory is full. It is superseded by this change and also remove the button. Also remove the
warning." The manual "Claim Core" button on `ByteFoundryPage` (`claimComputeCore`, gated by
`isComputeCoreClaimAvailable`) and its automatic counterpart (`tickComputeCoreConversion`, gated by
the permanent `intro.autoClaimCoreEnabled` flag, unlockable via `enableAutoClaimCore` by sacrificing
10 Nodes) minted a Compute Core by flushing the player's ENTIRE current Memory capacity to 0 — the
second of two now-superseded Core-minting mechanics (see the `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY`
comment in `layers.js` for the first, a fixed-10-MB/Disk-fullness-gated version predating this one).
Now that `purchaseBoosterFromDataLake` (added earlier in this same request chain) is the only way to
obtain a Core — spending deposited Disk stock from the tier-1 Data Lake instead of Memory — the
Memory-flush path was pure redundancy: worse, even, since Boosters can push `computeCores` past
`COMPUTE_ENTITY_CAP` while a Memory-flush Core could not.

Removed entirely from `engine.js`: `mintComputeCoreIfReady`, `tickComputeCoreConversion`,
`claimComputeCore`, `isComputeCoreClaimAvailable`, `isAutoClaimCoreUnlockAvailable`,
`enableAutoClaimCore`, and the `intro.autoClaimCoreEnabled` state field itself (dropped from
`createInitialGameState`, `buildEraIntroReset`, and `prestigeGame`'s carry-over list — an old save's
stray `autoClaimCoreEnabled: true` from before this change is simply ignored, since `mergeState`
only fills in *missing* fields). `isComputeCoreConversionUnlocked` (the capacity-threshold predicate
gating `ComputePage`'s reveal and Sacrifice's Compute-token wipe) stays — it was always the broader
"Compute is unlocked" check, not specific to the Claim Core mechanic. The
`computeCoresEverEarned`/`computeMergePageUnlocked` reveal-latch bookkeeping (previously done inside
`mintComputeCoreIfReady`) already had an equivalent path in `latchComputeMergePageIfNeeded` (added
alongside `purchaseBoosterFromDataLake` itself), so no coverage was lost by deleting the old path —
confirmed by the pre-existing "tier-1 purchases latch computeMergePageUnlocked via
computeCoresEverEarned" test in `engine.test.js`.

On `ByteFoundryPage`: the Claim Core button, its `showManualClaimCore`/`canClaimComputeCore`
variables, and the "Every future Core will cost more" warning line inside the Sacrifice confirm
dialog (see the entry above) are all gone. Removing Claim Core also removed the *reason* Memory ×10
(Sacrifice) and Claim Core used to swap positions in the milestones row once Boosts unlocked — with
only one of the two left, Sacrifice now always renders in the milestones row beside Bandwidth,
regardless of whether Compute is unlocked, rather than moving below the disk section. On
`ComputePage`: the small 🤖 auto-claim badge/button on Cores' row 1 (`autoClaimFlagField`/
`enableAutoClaimAction`/`AutoBadge` and friends) is gone — Cores' row 2 already carries the "buy 1
Core from the Data Lake" button, so nothing replaces the removed control; it simply wasn't needed.

This also genuinely fixed one of the two flaky `App.test.jsx` tests flagged in the same request
("Sacrifice confirm warns that future Cores cost more...", timing out or landing on the wrong page
under the full suite): that test seeded Memory exactly at `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY`
(8,000,000 bits) and used `userEvent` (real timers) to click Sacrifice — but the tick loop's
always-on Memory → Kilobyte auto-convert (`tickIntroAutoInvest`) isn't gated by the forced priority
order guarding Sacrifice, so a real tick landing between render and the click could drain Memory and
flip `intro.mainGameUnlocked` on its first successful conversion, navigating away from
`ByteFoundryPage` (and the dialog under test) entirely before the assertion ran — reproducible even
in isolation, not just under the full suite, confirming it was a genuine race rather than ordinary
cross-test pollution. `main` independently landed the identical root-cause fix and diagnosis
(switching to `vi.useFakeTimers()` + `fireEvent`, closing #449) while this branch was mid-flight on
the same test for the warning-removal above; the two were reconciled via a merge rather than
duplicated. The second flagged flaky test (`theme preference in Settings switches mode and persists
across remount`) was a genuine `main` fix too, unrelated to Claim Core: two full `<App/>`
mount/unmount cycles in one test can legitimately exceed Vitest's 5s default under a loaded/sandboxed
test environment, so its timeout was bumped to 15s rather than the test being restructured.

### Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion

A fourth request in the same chain, delivered alongside the Claim Core removal above: "Data lake is
refilled only if all the disks in main storage array are all built and full. Data lake capacity is 9
when built then increases to 99 after adding the next size array and then to 999 using similar
progression." The prior implementation let a player deposit into a Data Lake sub-slot the moment a
single full disk of the matching size existed — with the full `DATA_LAKE_CAPACITY` (999) reachable
from the very first disk built at the smallest sub-size, since nothing checked how far along that
size's array actually was.

Interpretation: requiring literally ALL `DISK_ARRAY_LADDER_CAP` (10) disks of a size to be
*simultaneously* full at the moment of deposit would be self-defeating — `depositDiskToDataLake`
consumes exactly one full disk per call, so the very first deposit would immediately break that
condition, permanently blocking every further deposit at that size until the whole array somehow
refilled to 10/10 again (a state the normal build/fill/redeem loop has no way to reach, since
building a NEW disk at a size whose ladder has already advanced isn't how the ladder works). The
sensible reading — and the one implemented — is that "built and full" describes the array's
COMPLETION state, not an instantaneous snapshot: a size's array must have been fully built out at
least once (`disksBuiltTotal[size] >= DISK_ARRAY_LADDER_CAP`, a permanent, monotonically-increasing
condition, unlike the live `disks[size]` full-count which naturally fluctuates) before ANY of that
size's disks become deposit-eligible at all — the existing "at least one currently full disk" check
stays too, as the actual per-deposit condition.

This single gate change turns out to ALSO implement the staged-capacity half of the request for
free, without any new state field: each Data Lake tier's 3 sub-slots (`DATA_LAKE_SUB_SIZES = [1, 10,
100]`, `DATA_LAKE_SLOT_MAX` = 9 each) already map to 3 successive disk sizes (e.g. tier 1/KB ← the
1 KB, 10 KB, and 100 KB disk arrays). Gating each sub-slot's deposits on its own size's array
completion means a lake's deposits literally cannot exceed 9 (the ×1 sub-slot's own cap) until the
×1 array completes and the ×10 array's sub-slot ALSO opens up — pushing the reachable total to 99 —
and cannot exceed 99 until the ×100 array completes too, unlocking the final climb to 999. No
separate "current capacity stage" field was needed; the existing digit-decomposition deposit model
(see the Data Lake Boosters entry above) already produces exactly this staging as an emergent
property of the sub-slot structure once each slot's own gate is added.

Implementation: `isDiskArrayFullyBuilt(state, sizeBits)` (a private helper in `engine.js`) checks
`disksBuiltTotal[sizeBits] >= DISK_ARRAY_LADDER_CAP`; `canDepositDiskToDataLake` calls it first,
before the existing full-disk/slot-max/lake-cap checks. See `engine.test.js`'s "staged Data Lake
capacity" test for the full 9 → 99 → 999 walkthrough.

### Data Lake Boosters, take two: from a spendable balance to a live transfer pipe

The request: "Data Lake does not hold anything. Its capacity is upgraded to allow Booster
conversion only. When boosters is to be created, the corresponding amount of disks are transferred
to it at 10x the pool bandwidth and then converted into Booster." Read literally, this asks to
remove the standing deposited balance the two entries above this one built — a real reversal, not
an extension — so before implementing it, four clarifying questions nailed down the parts the
one-liner left ambiguous:

1. **Does depositing (`depositDiskToDataLake`) go away entirely**, or stay as a lesser mechanic?
   Answer: keep it, but it should no longer be the thing a Booster purchase is REQUIRED to draw
   from — i.e. it stops being the only source of Booster funding.
2. **What does "capacity" mean now** that the lake isn't a spendable balance? Answer: a throughput
   cap — max concurrent/in-flight transfers — not a lifetime purchase total.
3. **"10x the pool bandwidth"** — 10× what, precisely? Answer: 10× the Byte Foundry's own current
   bits/sec production rate (`getIntroProductionRate`), the same rate `getCoreEarnTimeSeconds`/merge
   pacing already use elsewhere.
4. Implement now, end-to-end, rather than filing a spec issue first.

Taking answers 1 and the literal request at face value looked contradictory at first: "keep
depositing" vs. "the lake holds nothing." The reconciliation implemented here treats deposits as a
**prepaid convenience buffer** rather than the lake's only funding source: `depositDiskToDataLake`
is completely unchanged (same staged 9 → 99 → 999 cap from the entry above), but a lake never again
holds a *second*, larger reserve beyond that buffer. Starting a Booster
(`startBoosterTransfer`, replacing the old instant `purchaseBoosterFromDataLake`) spends whatever
of the next cost the deposited buffer can cover FIRST — instantly, since those Disks are already
"at the lake," which is also why a deposit-covered purchase still grants immediately, unchanged from
before this entry — and sources any cost still remaining live, straight off the raw built Disk
inventory (`intro.disks`, decomposed into a Disk count the same greedy hundreds/tens/ones way
deposits already are), over a timed transfer at `DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER` (10×) the
Byte Foundry's production rate. Only once that transfer's countdown reaches 0
(`tickDataLakeTransfers`, wired into `tickGame` right before `AUTO_MERGE_TICKERS` so a Core earned
this tick can still cascade upward the same tick) does the Booster actually grant. This is the sense
in which "the Data Lake does not hold anything": past the prepaid buffer, nothing sits idle waiting
to be spent — a transfer either hasn't started, or is actively counting down toward becoming exactly
one Booster, never a larger banked stockpile.

Answer 2's throughput-cap reading became `getDataLakeTransferCapacity`: unlike the *deposit* cap
(9 → 99 → 999, a magnitude), the *transfer* cap is a small concurrency number (0 → 1 → 2 → 3,
`DATA_LAKE_TRANSFER_CAPACITY_MAX`), unlocked one slot at a time by the exact same staged gate
(`isDiskArrayFullyBuilt` per sub-size, smallest first) the deposit progression already uses — no new
unlock mechanic, just a second thing that gate now controls. A lake's `transfers` field (an array of
`{ remainingSeconds }`, capped at that concurrency) tracks in-flight live transfers; a
`startBoosterTransfer` call that would need a live transfer but finds the concurrency already full
is a same-reference no-op, same posture as every other capacity-gated action in this file.

One balance detail that had to be preserved deliberately: with concurrent transfers now possible,
`getBoosterPurchaseCost` (the nth-ever-started Booster at a tier costs n units) had to start
counting **in-flight transfers alongside completed purchases** (`purchased + transfers.length + 1`),
not just `purchased + 1` as before — otherwise starting several transfers back-to-back before any of
them completed would charge them all the same cost, letting concurrency dodge the escalating curve
the two Data Lake entries above this one specifically built.

`getMaxBoosterPurchasesForCapacity` (the old "how many purchases can one full 999-unit deposit fund
in a single uninterrupted burst" helper from the first Data Lake Boosters entry above) was removed
rather than adapted: its whole premise — that a lake's only funding source was its deposited balance
— no longer holds once live transfers can also fund a Booster regardless of deposits, so the number
it computed stopped meaning anything a player could act on. `DataLakePanel` and `ComputePage` were
updated to show deposited stock, next cost, and in-flight-transfer count/soonest-completion instead.
Once that helper's own only caller was gone, its sibling `getBoosterPurchaseTotalCost` (the
triangular-sum helper) also lost its last production use and was deleted alongside it, one review
pass later — see below.

**Adversarial review caught a real funding bug before merge.** The first implementation reused
`decomposeDataLakeDeposits` — the deposited buffer's own digit-decomposition helper, which assumes
each sub-size's count tops out at `DATA_LAKE_SLOT_MAX` (9, the deposited buffer's cap) — to work out
which held, undeposited Disks a live transfer should consume. That assumption doesn't hold for raw
held Disks: a size's array holds up to `DISK_ARRAY_LADDER_CAP` (10) slots, and nothing stops a
player from holding all 10 of a size undeposited at once (e.g. having fully built the ×1 array
without ever clicking Deposit). Concretely: holding 10 ×1 Disks and needing exactly 10 live-transfer
units, the old logic decomposed 10 as "1 ×10-size Disk" and rejected the transfer for lacking one —
even though the player's 10 held ×1 Disks are worth the identical 10 units. Fixed by replacing the
fixed decomposition with `planLiveDiskFunding`: a greedy pass from the largest sub-size down, capped
at what's actually held at each step (not a fixed digit range), cascading any shortfall to the next
sub-size down. Because each sub-size is an exact ×10 multiple of the next, using fewer of a larger
sub-size than this greedy's own max can only ever increase what's needed lower down — never help —
so greedy-then-cascade is a correct feasibility check here, not just a heuristic; it returns null
(genuinely unfundable) only when the total held value, respecting each sub-size's own held count,
truly can't reach the needed total. The same review also flagged the in-game Guide
(`InfoPage`) as the one doc surface this feature missed updating — every other reference doc had
been updated, but `InfoPage` deliberately reads no live game state specifically so its numbers can't
drift (see CLAUDE.md's Architecture item 5), and this mechanic's bullets there still described the
old instant-purchase-from-deposits-only behavior. Both were fixed, along with adding the mixed
deposits+live-transfer funding and same-tick multi-transfer-completion test coverage the review
noted was missing, before this PR left draft.

### Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping

Requested directly, in the same terse shorthand the maintainer's other Storage Pool requests in
this chain used: "Every size disk only fills one level of the corresponding Tier in the ladder.
There is a nice one to one mapping." Read together with two follow-up clarifying rounds (see
below), this replaced the entire "a disk redeems into whichever tier's current per-unit cost
happens to exactly match its size right now" design — itself the subject of an earlier
`getMatchingTierForDiskSize` entry in this file establishing the `<=`→`===` fix and the "any tier,
not just tier01" generalization — with a fixed, permanent mapping that needs no price coincidence,
no tie-break rule, and can't be permanently stranded by an autobuyer burst jumping a tier's price
past a disk's exact value mid-tick.

**Why a clarifying round before touching the code.** The request's own wording ("nice one to one
mapping," "fills one level") was genuinely compatible with several different concrete designs — did
it mean the tier itself becomes fixed (not price-matched), or only the level-completion behavior
changes? Did "fills one level" mean granting exactly one unit at a fixed level, or completing the
whole level's purchase block in one redemption? This touches `isDiskRedeemable`,
`getMatchingTierForDiskSize`, `redeemDisk`, every cache-release/auto-redeem eligibility predicate
built on top of them, `tickDiskAutoDeposit`'s own redeemability gate, and dozens of existing tests —
getting the exact semantics wrong would have meant redoing all of it. Two rounds of
`AskUserQuestion` confirmed: (1) disk-ladder step N maps permanently to level N of its one
corresponding tier — the tier sharing that step's existing Data Lake grouping
(`getDataLakeTierIndex`, already using the same KB/MB/GB/… naming `TIER_DEFINITIONS` does) — 
redeemable only while that tier sits at exactly that level; (2) redeeming completes the WHOLE
current level in one shot (the tier's entire purchase block), not a single unit.

**The mapping was already implicit in existing constants.** `getDataLakeTierIndex` groups every 3
disk-ladder steps into one Data Lake tier (`DATA_LAKE_SUB_SIZES.length` = 3), and those 10 Data Lake
tiers already share the exact same KB/MB/GB/…/QB naming as the 10 main-game tiers
(`DATA_LAKE_TIER_LABELS` vs. `TIER_DEFINITIONS`' own `symbol`s) — not a coincidence, but infrastructure
already built for a different feature (Data Lake Boosters) that turned out to define this mapping
for free. A disk step's own position within its tier's 3-step group (1st/2nd/3rd,
`getDataLakeSubSize`'s index) became the new `getDiskRequiredTierLevel` — the fixed level that
step corresponds to. `getMatchingTierForDiskSize` (kept as the same internal name/signature so
every downstream caller — `isDiskRedeemable`, `isDiskAutoRedeemEligible`,
`isDiskCacheBlockAutoReleaseEligible`, `tickDiskAutoRedeem`, `tickDiskAutoDeposit`'s own
redeemability gate — needed zero changes of their own) now does a direct index lookup into
`TIER_DEFINITIONS` plus one equality check against the tier's current `purchaseLevels` entry,
replacing a `TIER_DEFINITIONS.find(...)` price-coincidence search and its own tie-break-toward-
earliest-tier logic entirely — a net simplification, not just a behavior change.

**A subtle test-construction trap: tier costs and disk sizes only coincide through level 3.**
Because tier01's own cost-epoch formula (`getCostEpochExponent`, a Fibonacci-like sequence: exponent
1, 2, 3, 5, 8, 13, … per level) matches a flat ×10-per-level growth only through epoch 2 (level 3) —
diverging sharply from level 4 onward (level 4's exponent is 5, not 4, an extra 10× jump) — several
existing tests that constructed a disk size via `getTierCost(tensTier, N) * BITS_PER_BYTE` for N > 3
to simulate a "tied price" scenario silently broke: the resulting size no longer matched the real
disk ladder's step-N face value (`getDiskLadderSizeBits(N)`) at all once N exceeded 3. This is
exactly why `MAX_ACTIVE_DISK_LADDER_STEP` (3) and `DATA_LAKE_SUB_SIZES.length` (3) were already the
right bound for pool 1's disks: the "nice one to one mapping" was only ever going to hold for a
tier's first 3 levels in the first place, matching the disk ladder's own real ceiling — the
position-based `getDiskRequiredTierLevel` mapping this entry adds is unaffected by this divergence
(it never reads any tier's cost at all), but a test asserting a manufactured "tie" between two
tiers' costs at level 4+ needs the real `getDiskLadderSizeBits` value, not a cost-derived one, once
the divergence kicks in.

**Redeeming a disk now completes a whole level, not one unit** — `redeemDisk` grants
`getPurchaseBlockSize(state) - purchaseLevelProgress[tier.id]` free units via the existing
`grantTierUnits` loop (unchanged itself) rather than a flat `1`, rolling the tier straight into its
next level regardless of how much manual/autobuyer progress already existed toward the current one.
Every existing test asserting `owned[tier.id] === 1` after a redeem needed updating to the real
default block size (`DEFAULT_PURCHASE_BLOCK_SIZE`, 8) instead — including one integration test
whose downstream assertion (the ByteFoundryPage transfer-block row showing "1 transferred block")
also had to flip to "0 transferred blocks," since completing a level resets `purchaseLevelProgress`
back to 0 in a fresh level rather than leaving a partial 1-of-8 behind.

**A latent, currently-unreachable edge case in the block-size snapshot** (caught by a 4th
adversarial review pass): `redeemDisk` computes `remainingInLevel = getPurchaseBlockSize(state) -
progress` ONCE, from the state before any units are granted, then hands that fixed number to
`grantTierUnits`' own loop — which recomputes `getPurchaseBlockSize` fresh on every iteration off
its own mutating state. If a disk's fixed corresponding tier were ever `getLastTierId()` (the tier
whose purchase-block size keeps growing every `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS`), and a
grant loop happened to cross that growth boundary mid-loop, the recomputed (larger) block size could
leave `purchaseLevelProgress` short of the new threshold even after granting the originally-intended
"whole level," silently failing to reset progress to 0. This can't happen today —
`MAX_ACTIVE_DISK_LADDER_STEP` caps every buildable disk at tier01's own first 3 levels, and tier01 is
never the last tier — so no fix shipped with this change; a code comment at the `remainingInLevel`
call site flags the invariant so a future storage pool (epic #456, which would let disks reach later
tiers) doesn't resurrect this silently.

**The Data Lake's own currency/threshold display** (a third request in the same message: "Data lake
uses the same currency as disks. It replaces 9,99,999") was scoped separately — see the maintainer's
own answer that the deposited/capacity numbers should keep their current internal values but display in the
same Byte-scale (KB/MB/GB) formatting disks themselves use, rather than bare unitless numbers.

**`simulate-run-times` re-publish blocked by a pre-existing, already-tracked bug.** `redeemDisk`
granting a whole purchase level per disk (instead of 1 unit) is exactly the kind of change
CLAUDE.md's "Also re-run and publish [simulate-run-times]" rule exists for, but running
`node .claude/skills/simulate-run-times/simulate.mjs` fails immediately with `SyntaxError: The
requested module '.../src/game/engine.js' does not provide an export named 'claimComputeCore'` —
`run-simulation.mjs`'s bot strategy still imports the "Claim Core" mechanic removed by an earlier,
unrelated PR (superseded by Data Lake Boosters). This exact breakage is already tracked in issue
#471 ("simulate-run-times tool broken: run-simulation.mjs imports removed claimComputeCore"), filed
before this round of changes and unrelated to the disk-redemption/Data-Lake-currency work here —
fixing the bot's whole Compute-acquisition strategy is out of this PR's scope. The pacing impact of
granting a full level per redemption (rather than 1 unit) is real and worth capturing once #471
lands, but couldn't be measured in this PR.

### Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display

Implementing the Byte-scale display change above (`DataLakePanel` converting every lake figure
through a new `getDataLakeUnitBits(tierIndex)` helper before formatting with `formatDiskSize`,
rather than the bare `formatAmount` it used before) surfaced a real economy bug in
`getDataLakeCapacityDoublingCost`, not just a display gap: it returned the lake's own
`getDataLakeCapacity` value directly — an abstract unit count (999 at the starting `slotMax`) — and
`doubleDataLakeCapacity` spent that number straight out of `state.intro.bits`. Real Memory bits and
the lake's internal unit count are wildly different scales (one deposit-unit is worth 8,000 bits at
the KB lake), so this made doubling a lake's capacity cost roughly 8,000× cheaper than intended —
effectively free relative to every other Byte Foundry milestone action it's supposed to sit at the
same forced-priority rank as (Memory's own Sacrifice). None of the three prior adversarial reviews
of this PR caught it, because none of them specifically checked whether the "abstract unit count"
and "real bits" scales were being conflated at this call site — the fix only became visible once the
UI work required converting between the two scales explicitly.

The fix: `getDataLakeCapacityDoublingCost` now multiplies the unit-count capacity by
`getDataLakeUnitBits(tierIndex)` before returning it, so the cost is expressed in the same real-bit
currency `doubleDataLakeCapacity` actually spends from — for the base-`slotMax` KB lake, this moves
the cost from 999 (bits) to 999 × 8,000 = 7,992,000 bits. `getDataLakeUnitBits` itself (`= getDiskLadderSizeBits(getDataLakeSubSizeStep(tierIndex,
DATA_LAKE_SUB_SIZES[0]))`) reuses the same disk-ladder sizing function the display conversion needs
anyway, so both the cost and the on-screen numbers derive from one shared source of truth rather
than two independently-computed scale factors that could drift apart again.

Fixing the cost had a knock-on effect on every capacity-doubling test in `engine.test.js`: seeding
`bits: 999` to exactly afford one doubling under the old (buggy) cost now left the state 7,991,001
bits short. Bumping those seeds to the real cost (`999 * 8000`) surfaced a second, unrelated issue
in the *test* fixtures themselves — a Memory balance large enough to afford the real cost is also
easily large enough to afford building the pool's next Disk array (`isDiskBuildAvailable`'s own bit
cost is far smaller), which outranks Data Lake capacity doubling in the forced priority order. Tests
that previously relied on a tiny 999-bit balance being too small for anything else to compete now
needed to explicitly exhaust the Disk ladder (`disksBuiltTotal` maxed at every active pool size) to
keep isolating the behavior actually under test, rather than incidentally relying on being too poor
to afford a Disk Build.

### Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever

The capacity-doubling mechanic above (`doubleDataLakeCapacity`, `DATA_LAKE_SLOT_MAX` = 9,
`DATA_LAKE_CAPACITY_DOUBLING_STEP` = 2×) was removed at the maintainer's explicit request: "Data
lake can only accept what is in Disk array so automatically the cap becomes 10 disks of each size
instead of artificially mentioning a specific cap like we tried 9 before." The observation is
correct and, in hindsight, was already implied by the mechanic's own array-completion gate: a lake's
sub-slot can never hold more of a denomination than the corresponding Disk array has ever produced,
and that array permanently stops growing at exactly `DISK_ARRAY_LADDER_CAP` (10) disks
(`isDiskArrayFullyBuilt`). Introducing a *separate*, smaller, purchasable cap (`DATA_LAKE_SLOT_MAX` =
9) on top of that physical ceiling added a whole standalone economy lever — its own cost formula, its
own forced-priority-order rank (tied with Memory's Sacrifice), its own UI button, its own doubling
sequence (9, 18, 36, …) — to defend against a limit that the Disk array itself already enforced more
tightly. Note this genuinely lowers the achievable deposit ceiling relative to the doubling design it
replaces — doubling let a lake's *banked balance* (built up over time via repeated redeposits into
the same physical array, not a single snapshot of it) grow arbitrarily far past 10 per sub-slot, so
removing it isn't simply deleting a no-op lever. That headroom was never released to players (the
doubling mechanic was added and removed within the same still-`Unreleased` `CHANGELOG.md` window),
and the maintainer's request above explicitly asks for exactly this ceiling, so this is an intentional
economy change, not an oversight: raising the deposit cap past what a single completed array can
physically hold no longer has any purpose once the array itself, not an independent purchasable
lever, is what actually gates a sub-slot's contents.

The fix deletes the entire mechanic rather than reworking it: `doubleDataLakeCapacity`,
`getDataLakeCapacityDoublingCost`, `isDataLakeCapacityDoublingAvailable`,
`isDataLakeCapacityDoublingTurnAvailable`, `DATA_LAKE_SLOT_MAX`, and
`DATA_LAKE_CAPACITY_DOUBLING_STEP` are all gone; `getDataLakeSlotMax(state, tierIndex)` (a per-lake,
possibly-doubled value) is replaced by `getDataLakeCapacity()` taking **no arguments at all** — every
lake's cap is now the same fixed `DISK_ARRAY_LADDER_CAP × DATA_LAKE_SUB_SIZE_TOTAL` (10 × 111 =
1,110), since there is no more per-lake state to vary it. The staged 9 → 99 → 999 progression as each
sub-size array completes becomes 10 → 110 → 1,110 — same shape, values simply reflect the real
per-array cap instead of an arbitrary smaller one. `decomposeDataLakeDeposits`'s greedy
largest-denomination-first digit decomposition (used to re-derive a lake's per-sub-size breakdown
after a spend) still needs its cap to be `>= 9` to stay exact for every total, per the correctness
argument in the prior entry ("Data Lake refill gating") — 10 clears that floor as comfortably as 9
did, verified by brute-force testing every reconstructable total in `[0, 1110]` before landing this
change, so no new decomposition bug was introduced by simply raising the constant.

**The `DataLakePanel` UI was rewritten in the same change**, prompted by separate but related
feedback: "nicely do the formatting and alignment for Data lake related component. Looks like an
afterthought." The prior layout was one flex row per lake concatenating every stat into a single
string, wrapping unpredictably as the lake count and figures grew. The rewrite uses a CSS Grid
(`grid-template-columns: minmax(0,1fr) auto auto auto`) with an explicit header row (Lake /
Deposited / Bought / Next) so columns align across every lake row — the same `display: grid`
convention `MainPage`'s `TierLine` already established elsewhere in the codebase. Each lake's cells
are wrapped in a `styled.div\`display: contents;\`` row component so they become direct children of
the grid (and therefore share its column tracks) without adding an extra wrapping box of their own —
the same relationship a `<tr>` has to a `<table>`, reimplemented in CSS Grid since this isn't a real
`<table>`. This also dropped the panel's `actions` prop (now unused, since the doubling button it
existed for is gone) — `DataLakePanel` takes just `{ state, bare }`. The long "`${label} Data Lake →
${boosterLabel}`" phrase moved from the row's visible text (now the terser "`${label} →
${boosterLabel}`", e.g. "KB → Cores") into a `title` attribute on the lake name, so a screen-reader
user or anyone hovering still gets the full sentence without it crowding the compact grid row.

### Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap

The removal above lasted one PR cycle. The maintainer's follow-up request, verbatim: "Capacity
still doubles starting from 1KB to 1024 KB for kb lake" — i.e. bring the doubling lever back, but
not in its original shape (start at a smaller, round `999`-unit-adjacent value, uncapped doubling).
Instead: **level 0 = 1 unit** ("1 KB" for the KB lake, in that lake's own Byte-scale denomination),
doubling per purchase, **permanently hard-capped at level 10 = 1,024 units** ("1024 KB"). This
mirrors an even earlier proposal from the same session (superseded at the time in favor of the
now-also-superseded fixed-cap design) — "Data Lake Lvl 0 is 1 KB for KB Lake... Highest level would
be 1024 KB" — which had itself been set aside pending the "auto-derive the cap from the Disk array"
simplification; that simplification is what got reverted here, restoring the level-based design that
predated it.

The key clarification this reversal settled: the `DISK_ARRAY_LADDER_CAP`-derived 10 → 110 → 1,110
figure the previous PR's removal had leaned on was never itself an explicit design cap the
maintainer asked for — it's just the incidental sum of how many disks of each size can ever exist
(`isDiskArrayFullyBuilt`'s own per-sub-slot backstop, DISK_ARRAY_LADDER_CAP = 10, applied at 3
different weights). The ONE explicit, intentional cap a player actually experiences is the doubling
ladder (1 unit → 1,024 units). The two aren't competing designs to choose between, since they answer
different questions — "how many disks of that size could physically ever exist" (a backstop with no
design intent behind its resulting sum) vs. "how much has the player actually paid to bank" (the
real cap) — so `canDepositDiskToDataLake` enforces both, and since 1,024 sits below the incidental
1,110 backstop, the doubling ladder is always what actually binds in practice. A fully built pool
(all three sub-arrays complete) at max level can still never deposit a 10th ×100 disk — 10 (×1) +
100 (×10) + 900 (9×100) = 1,010 already leaves only 14 units of headroom under the 1,024 cap, one
short of the 100 a 10th ×100 disk would need. This is not a bug: 1,024 is a deliberate, round,
binary ceiling the maintainer explicitly asked for, independent of wherever the backstop's own
incidental sum happens to land — the same instinct Memory's own capacity cap
(`INTRO_CAPACITY_CAP_BITS`, exactly 1 MiB) already follows elsewhere in this codebase, a clean
power-of-two rather than whatever number falls out of an unrelated mechanic's own math.

The cost formula keeps the same shape as the original (now-removed) `doubleDataLakeCapacity`: spend
the lake's own CURRENT capacity, converted from an abstract unit count into real bits via
`getDataLakeUnitBits`, to double it — the "spend the current value to double it" pattern Memory's
own Sacrifice also uses. Because the starting capacity is now much smaller (1 unit vs. the old
design's much larger starting value), the first doubling purchase is proportionately cheap (8,000
bits for the KB lake, vs. what would previously have been a much larger number) — intentional, since
a level-0 lake would otherwise be nearly useless (a single deposited disk already fills it).

`DataLakePanel`'s CSS Grid (introduced in the removal PR two cycles ago, kept here) gained a 5th
column, "Capacity," stacking the current capacity figure over a compact "⚡ ×2"
`DoubleCapacityButton` — hidden entirely once `isDataLakeCapacityMaxed` (rather than shown-but-
disabled), matching how Memory's own Sacrifice control disappears at its hard cap rather than
sitting permanently greyed out. The panel's `actions` prop, dropped in the removal PR as unused,
came back for this same reason — it wires the button's `doubleDataLakeCapacity(tierIndex)` call.

### Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates

Requested directly: "Disk fills work at twice the memory bandwidth when filling from cache. Cache
fills work at 10x the memory bandwidth when filling from memory and 2x when filling from Disks...
Building a disk takes the same time as time to fill it at memory bandwidth speed." This replaced
two previously-independent, rate-*unaware* timing formulas with a single unifying framework: every
timed Byte Foundry storage transfer now paces itself as an explicit multiple of
`getIntroProductionRate` ("Memory bandwidth") — new `DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER` (2),
`CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER` (10), and `CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER`
(2) constants in `layers.js` — rather than a flat "1 second per KB" build rate and an unbounded,
effectively-instant read-cache refill from Memory.

**Fresh disk builds went from a flat rate to a Memory-bandwidth-relative one.**
`getDiskBuildBaseSeconds` previously divided a disk's size by the hard-coded
`DISK_LADDER_BASE_SIZE_BITS` (8000, "1 second per real KB of size") — completely decoupled from the
player's actual production rate, so Invest/Compute Boost never sped up a fresh build at all. It now
divides by `getIntroProductionRate(state.intro)` instead (still snapshotted once at build start, per
the existing `totalSeconds`-is-fixed convention — see `startDiskBuild`), making a build exactly "the
time to fill this size at 1x bandwidth." At the DEFAULT starting rate (1 bit/sec) this is a much
*slower* first build than before (8000 seconds for a fresh 1 KB disk, vs. the old flat 1 second) —
a deliberate, explicit trade for tying every Byte Foundry mechanic to the same bandwidth concept,
not an oversight; a player who has grown their rate via Invest before reaching Storage sees a
correspondingly faster build, same as every other rate-relative mechanic here (Boosters, read-cache
flush, Compute merge timers).

**Read-cache → disk flush** (`getDiskReadCacheFlushSeconds`) already divided by
`getIntroProductionRate` before this change (see the "Timed read-cache → disk flush" entry above) —
this round only added the `DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER` (2x) factor, since a DISK
filling FROM a pre-staged cache buffer is faster than Memory's own live trickle, per the explicit
"twice the memory bandwidth" instruction.

**Read-cache refill FROM Memory gained an explicit bandwidth cap it never had.** Before this change,
`tickDiskAutoFill`'s Pass 1 transferred whole blocks out of `intro.bits` with no time cost
whatsoever, limited only by how many bits happened to be banked at the moment it ran — a stalled
refill (blocked by an active tier claim, or simply because the cache is scoped to the pool's
smallest size only) could unblock and drain an arbitrarily large banked balance into the cache in a
single tick, in effect at infinite bandwidth for that one call. The new
`CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER` (10x) cap bounds this explicitly: at most
`10 × rate × elapsedSeconds` bits move per call, shared across every eligible size (today, always at
most one). Because `tickDiskAutoFill` runs a real-elapsed pass and then a **0-elapsed** pass later in
the same `tickGame` tick (to start newly-eligible flushes without double-counting time — see its own
doc comment), the 0-elapsed pass now contributes exactly zero additional refill, whereas previously
it could drain an entire freshly-emptied cache a second time in the same tick if enough Memory
happened to be sitting banked. This is why the transfer had to become a genuinely *continuous*
per-tick amount (`Math.min(blockBits, need, budget)`) rather than only-ever-whole-block, unlike
Pass 1's original design: a budget smaller than one block must still visibly progress bit-by-bit
across many ticks rather than stalling until a whole block's worth of budget accumulates, the same
way Memory's own production already progresses continuously rather than in discrete jumps.

**Write-cache collect/flush stopped reusing `getDiskBuildSeconds`.** The write cache's own collect
(10 segments from the source size) and flush (into the target's fresh container) phases previously
borrowed a fresh-BUILD's own duration formula wholesale (`flushTotalSeconds =
getDiskBuildSeconds(state, targetSize)`, `segmentTotalSeconds = flushTotalSeconds / 10`) — which
meant a write-cache flush was scaled by build `ordinal` (N× for the Nth container ever built),
despite refilling an *already-built* empty container rather than constructing a new one. New,
dedicated `getDiskWriteCacheFlushSeconds` (target size ÷ (rate × `DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER`))
and `getDiskWriteCacheSegmentSeconds` (source size ÷ (rate × `CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER`))
replace it — collect is a CACHE filling FROM Disks (2x), flush is a DISK filling FROM a cache (2x,
same rate class the read-cache flush uses), and neither is ordinal-scaled any more. Because 10
source-disk segments always sum to exactly one target's own size (the disk ladder's own ×10 step),
and both multipliers currently happen to equal 2, the collect phase's total duration still coincides
numerically with the flush phase's — documented explicitly in both the code comments and
`docs/ECONOMY_REFERENCE.md` as coincidental (a shared multiplier *value*, not a shared *constant* or
formula), so a future change to either multiplier alone won't silently break an assumption that they
must match.

**Test fallout.** Every test asserting an exact `startDiskBuild`/`getDiskReadCacheFlushSeconds`
duration needed updating to the new formulas (straightforward substitution, since
`createInitialGameState()`'s default 1 bit/sec rate makes the new numbers numerically equal to the
disk's own raw size in bits). Two `App.test.jsx` integration tests needed a real behavioral update,
not just a number swap: one seeded a huge `productionMultiplier` specifically so an empty disk's
read-cache flush would complete "within a single tick," and additionally (under the OLD unbounded
Pass 1) relied on the cache refilling to FULL a second time in the very same tick once the flush
emptied it — that second refill no longer happens within a single tick under the new bandwidth cap
(a 0-elapsed pass contributes no budget), so the test now asserts the disk fills but the cache stays
empty after tick 1, then advances a second real tick to see the cache refill to full. New dedicated
tests cover the bandwidth cap itself (a huge banked balance still only moves the per-call budget
amount, and exactly one block moves once elapsed time covers that block's own bandwidth-capped
duration) and the write-cache formula's rate-scaling, mirroring the existing read-cache-flush
rate-scaling test's own style.

### Per-pool Bandwidth capped at sqrt(Capacity); Data Lake capacity doubling funded by draining the lake; idle output liquidates into Bits

Four related requests landed together, all about a pool's Bandwidth staying credible relative to
its own (much smaller) Memory Capacity window, and Data Lake capacity growth costing the lake's own
banked output rather than the Data Stream: (1) "Bandwidth per second for each pool should be capped
at a value that is square root of capacity," (2) enhance the pool summary card's layout to match the
rest of the app, (3) "Lake capacity upgrade cost shall be funded via the lake itself, by essentially
emptying it," and (4) "The last disk array of a pool can fund first disk of next pool iff there is
nothing else to do and also no capacity left to buy booster as well."

**Bandwidth cap.** `getStoragePoolBandwidth` previously returned the raw, uncapped Byte Foundry
production rate for every unlocked pool (see the "keeps lower-pool bandwidth... fixed" entry above —
that fix removed a division-by-higher-pools bug but left the rate itself uncapped). It now returns
`Math.min(rate, Math.sqrt(getStoragePoolCapacity(state, poolIndex)))`. Because pool 1's own Capacity
ceiling is architecturally fixed at `INTRO_CAPACITY_CAP_BITS` (1 MiB in bits — see "moves the Data
Stream Capacity ceiling forward" further up) regardless of how high `intro.capacity` is ever pushed,
pool 1's Bandwidth is now permanently hard-ceilinged at `sqrt(8,388,608) ≈ 2,896.3` bits/sec no
matter how far Speed ×2 grows the raw rate — later pools have a far higher ceiling (`sqrt` of their
own, much larger, end bound), so this mostly bites pool 1 specifically once a run's rate has grown
past a few thousand bits/sec. This is a deliberate, if blunt, balance lever: every disk/cache fill
formula already read `getStoragePoolBandwidth`, not the raw rate, directly (`getProvisionDiskBaseSeconds`,
`getDiskWriteCacheFlushSeconds`/`SegmentSeconds`, `getDiskReadCacheFlushSeconds`, `tickDiskAutoFill`'s
Memory→cache budget, and `getDataLakeTransferDurationSeconds`'s Booster live-transfer pacing), so
capping it there automatically re-paces every one of those mechanics without touching their own
formulas.

**Test fallout was the bulk of this change.** Several `engine.test.js`/`App.test.jsx` fixtures had
relied on an arbitrarily high `productionMultiplier` to make a disk/cache fill "instant" for a
different, unrelated assertion — those needed an explicit `capacity` large enough (but for pool 1,
never *too* large — it clamps to the fixed 1 MiB ceiling regardless) that `sqrt(capacity)` still
comfortably exceeds the rate under test, so the cap isn't what's actually being exercised there. One
`App.test.jsx` integration test (cache fill → flush → refill, spanning real advanced-timer ticks)
could no longer complete within a single 100ms tick at all once pool 1's rate was capped below the
8,000-bit KB disk's own cache size — no `capacity` seed can raise it high enough, since pool 1's
ceiling is fixed. That test was rewritten around a clean, deliberately chosen cap (`capacity:
4_000_000` → `sqrt` = a round 2,000 bits/sec) and real computed millisecond windows (600ms to fill +
flush, then 400ms more to refill) instead of a single-tick assumption. It also surfaced a subtlety
worth noting for future timing-sensitive tests: the Byte Foundry's own passive income
(`tickIntroProduction`) delivers in discrete BATCHES every `tickSpeedSeconds` real seconds (not a
continuous per-tick trickle — see `INTRO_STARTING_TICK_SPEED_SECONDS`'s own doc comment), so a test
advancing real time by more than one such batch period will see `intro.bits` jump by a whole batch
mid-window unless `tickSpeedSeconds` is deliberately set far outside the test's own elapsed window
(this test sets `tickSpeedSeconds: 1_000` for exactly that reason, with `productionMultiplier`
scaled up to match so the *rate* stays comfortably above the Bandwidth cap despite the huge
`tickSpeedSeconds` denominator).

**Data Lake capacity funded by draining the lake, not Bits.** `doubleDataLakeCapacity`/
`getDataLakeCapacityDoublingCost`/`isDataLakeCapacityDoublingAvailable` previously spent the lake's
current-capacity value (converted to real bits) out of `intro.bits` to double it (see "Data Lake
capacity-doubling cost" and "reinstated" further up) — the same "spend the current value to double
it" shape Memory's own Capacity ×2 uses, but paid from a different pool (Data Stream Buffer bits
rather than the lake's own deposits). The new behavior instead requires the lake to be completely
full (`getDataLakeAvailableUnits(tierIndex)(state) >= getDataLakeCapacity(state, tierIndex)`) and
drains every deposit back to `{ 1: 0, 10: 0, 100: 0 }` on purchase — genuinely mirroring Memory's own
"requires a full Buffer, drains it" Capacity ×2 shape now, just scoped to the lake's own banked Disks
instead. `getDataLakeCapacityDoublingCost` is kept as a display-only helper (the real-bit face value
of what gets drained, for the button's tooltip) since nothing computationally requires removing it,
but no code path spends it from `intro.bits` any more. Every existing capacity-doubling test needed
rewriting around a `withFullLake` helper (sets `deposits` directly to a brimful `{1:10, 10:10,
100:10}` — 1,110 units, safely above the 1,024 hard cap at every level) rather than seeding `bits`.

**Idle disk liquidation.** A genuinely new mechanic, not a rework: once a pool's Lake is maxed
(`isDataLakeCapacityMaxed`), `tickDiskAutoDeposit` can no longer absorb any further completed disk
at that pool's own LAST (largest, ×100) size — those disks would otherwise just accumulate, full and
unredeemable (past their own tier's required level) and undepositable (lake full), forever. The
literal request ("last disk array of a pool can fund first disk of next pool iff there is nothing
else to do and also no capacity left to buy booster") left two things ambiguous enough to ask about
rather than guess: *how* the funding actually happens, and what "no capacity left to buy booster"
gates on precisely. Two clarifying answers: (1) auto-liquidate the idle disk straight into Bits
(the same currency Provision Disk already spends from) rather than tracking a separate
"pre-funded toward next pool's first disk" balance — since Bits is the one currency Provision Disk
draws from regardless of which pool, crediting it generically automatically funds whatever
Provision Disk needs next, with no new cross-pool bookkeeping required; and (2) "no capacity left to
buy booster" means that pool's own Lake sitting at `isDataLakeCapacityMaxed` (level 10), not merely
"can't afford to double it right now" or a separate Booster-transfer-concurrency check. The new
`isIdleDiskLiquidationAvailable`/`isIdleDiskLiquidationTurnAvailable`/`tickIdleDiskLiquidation` slot
in as the lowest rank of the whole forced priority chain — below even Lake Capacity doubling, and
checked against EVERY tier's own doubling availability (`isAnyDataLakeCapacityDoublingAvailable`),
not just the liquidating pool's own — so liquidation only ever fires once the entire Foundry would
otherwise sit completely idle. Wired into `tickStorage` as the last step, after
`tickDiskAutoReleaseCache`.

**Pool summary layout.** The pool disclosure's summary line (`ByteFoundryPage`'s `PoolCard`) was a
single plain-text sentence ("Pool 1 · Kilobytes · Arrays complete · Bandwidth 8 KiB/sec · Capacity 1
MiB") inside a bare `<button>` — flagged as not matching the rest of the app's styled-component
conventions. Rebuilt around the same patterns already established elsewhere: a `PoolTitle` heading
(tier symbol + name, mirroring `MainPage`'s `TierName`/`TierNameLabel`), a text-only
`PoolStatusBadge` colored by state (`theme.color.good` vs `textMuted`, the same plain-text-badge
convention `MilestonesPage`'s own `Badge` already uses rather than a new pill/chip shape), and a
`PoolStatsRow` of labeled Bandwidth/Capacity stat blocks (label above value, muted-then-prominent
color pairing, matching `MainPage`'s `OwnedText`/`ProductionText` and `DataLakePanel`'s grid-cell
convention). One `App.test.jsx` assertion had asserted the OLD single-string sentence
(`toHaveTextContent('Bandwidth 8 KiB/sec')`) — since the label and value now render as separate
sibling elements with no literal space between them in the DOM (JSX drops purely-whitespace text
between elements on separate lines), that assertion was split into two separate
`toHaveTextContent` checks (one for the label text, one for the formatted value) rather than forcing
an artificial space back into the markup purely to keep one test's string concatenation intact.

### Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending

The request, verbatim: "Each pool has its own small visual of memory buffer. The pool shall always
be funded from this memory. This memory itself is funded by the main data stream at the pool's
bandwidth or leftover speed, whichever is lower." Read literally this asks for a genuinely new piece
of state — not another formula layered on the existing shared `intro.bits` — so before implementing,
three clarifying questions nailed down what the one-liner left open:

1. **Scope** — does EVERY pool-scoped spend (Provision Disk's build cost, the read-cache
   fill-from-Memory pass) route through this new buffer, or only the passive fill mechanics?
   Answer: everything a pool spends — `intro.bits` no longer funds Storage directly at all, only
   tops up the buffer.
2. **Buffer capacity** — a small fixed size shared by every pool, or a fraction of that pool's own
   Capacity? Answer: a fraction of Capacity (see below for why the fraction chosen matters far more
   than it first appears).
3. **"Leftover speed"** — leftover after what, and in what order across pools? Answer: the Data
   Stream's raw production rate, allocated to pools ascending (pool 1 first) — each pool reserves
   fill-rate up to its own Bandwidth cap off the top, and whatever's left goes to the next pool.

**New state**: `intro.poolBuffers = { [poolIndex]: bits }`, permanent across ordinary Prestige (added
alongside `disks`/`disksBuiltTotal`/`diskBuild` in `prestigeGame`'s carry-over list) but wiped fresh
on Era ascension and Reset Byte Foundry (both already spread a fresh `initial.intro`, so no explicit
carry-over means an automatic reset — no code change needed there). `getPoolBufferBits`/
`getPoolBufferCapacity` are the read-side helpers; `tickPoolBufferFill(elapsedSeconds)` is the new
tick function that performs the actual bandwidth-limited transfer out of `intro.bits`.

**The buffer-capacity fraction very nearly shipped broken.** The first implementation picked
`capacity / MEMORY_BINARY_UNIT_STEP` (i.e. 1/1024) reasoning that it would land in the same
ballpark as a pool's own smallest disk denomination — for pool 1 (KB-scale), `INTRO_CAPACITY_CAP_BITS
/ 1024 = 8192` looked plausibly close to a 1 KB disk's 8000-bit face value. That reasoning didn't
check what the buffer actually needs to fund: `getDiskCost`, not a disk's face value.
`DISK_BUILD_COST_MULTIPLIER` (10) alone already makes even the smallest disk's build cost 10×
its face value (80,000 bits for a 1 KB disk, not 8,000) — and a pool's LARGEST disk (three
`DISK_LADDER_SIZE_MULTIPLIER` (10) steps up the ladder from its smallest) costs another 1000× that.
Deriving the exact ratio: a pool `N`'s largest disk costs `DISK_LADDER_BASE_SIZE_BITS ×
DISK_LADDER_SIZE_MULTIPLIER^(3N-1) × DISK_BUILD_COST_MULTIPLIER`, while that pool's own Capacity
ceiling is `BITS_PER_BYTE × MEMORY_BINARY_UNIT_STEP^(N+1)` — working through the algebra, the ratio
of the two is `(DISK_LADDER_SIZE_MULTIPLIER^3 / MEMORY_BINARY_UNIT_STEP)^N × (a constant close to
1)`, and `DISK_LADDER_SIZE_MULTIPLIER^3 = 1000` sits close to `MEMORY_BINARY_UNIT_STEP = 1024` *by
design* (the same near-alignment `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY` and other Foundry constants
already lean on elsewhere) — so that ratio stays close to 1 for every pool, not shrinking or growing
much as `N` increases. Concretely: pool 1's own largest disk (100 KB) costs 8,000,000 bits against a
1 MiB (8,388,608-bit) Capacity ceiling — **95% of the whole pool's Capacity**, not roughly 1/1024 of
it. A buffer capped at 1/1024 of Capacity (8,192 bits) could *never* hold enough to build even that
pool's SMALLEST disk (80,000 bits needed), permanently — not a pacing slowdown, an unconditional,
un-fixable block on ever provisioning a single disk in pool 1 or any pool after it. This was caught
before merge by hand-deriving the ratio and writing a dedicated test
(`provisionDisk/isProvisionDiskAvailable read from the pool buffer that tickPoolBufferFill actually
fills`) that exercises the real, non-trivial cost (`getDiskCost(FIRST_DISK_SIZE)` = 80,000) rather
than an arbitrary round seed value — the test failed immediately, which is what surfaced the bug
before it reached players.

**The fix**: `getPoolBufferCapacity(state, poolIndex)` now simply returns
`getStoragePoolCapacity(state, poolIndex)` — the fraction is 1, not a reduction at all. This still
honors "a fraction of the pool's own Capacity" (the user's own chosen framing) while being the
*smallest* fraction that keeps every disk in every pool permanently buildable, since a pool's own
largest disk cost sits so close to its own Capacity ceiling that no meaningfully smaller ceiling
would work. The design reads sensibly once reframed: "Capacity" is a pool's potential ceiling (a
purchasable, permanent value); the buffer is how much of that potential is actually banked and
spendable *right now*, filled gradually at the pool's own Bandwidth rather than available all at
once — a genuinely different axis from Capacity, not a redundant mirror of it, even though the two
numbers now share a ceiling. The "small visual" the request asked for describes the UI widget's
size (a slim bar, `PoolBufferMeter`, reusing the same `progressFill` gradient every other meter on
`ByteFoundryPage` already uses), not the underlying bit value's magnitude relative to Capacity.

**Tick ordering also needed a real fix, not just a formula one.** The first working version called
`tickPoolBufferFill` immediately after production/build countdown, ahead of `tickQueuedCapacityUpgrade`
and `tickIntroAutoInvest` (tier01's own bootstrap conversion) — reasoning that "the pool shall
always be funded" implied first claim on fresh bits. In practice this let Storage's own background
funding silently compete with, and starve, the two things a fresh bit balance is actually MOST
needed for: crossing the transfer-block threshold that unlocks the main game, and completing a
Capacity doubling already in progress. An `App.test.jsx` regression made this concrete — a large
catch-up jump that should auto-convert a full 8-unit tier01 purchase block in one tick instead
granted only 7, because `tickPoolBufferFill` had already skimmed a few bits off the top before
`tickIntroAutoInvest` got its turn. The fix moves `tickPoolBufferFill` to run AFTER
`tickIntroAutoInvest` and Queued Capacity instead — pool buffers now fill from genuine leftover
throughput only, at the cost of a one-tick (100ms) lag before a freshly topped-up buffer is visible
to that same tick's own cache fill (`tickDiskAutoFill`, which runs earlier in the pipeline) —
imperceptible at the game's own tick rate.

**Real-timer test fallout, a familiar pattern by now.** Several `App.test.jsx` tests that use real
(not fake) timers had seeded `capacity: INTRO_CAPACITY_CAP_BITS` purely for headroom on an assertion
unrelated to Storage — once Storage-unlocked capacity makes `tickPoolBufferFill` live, a real
`setInterval` tick landing between render and an assertion could siphon a fractional bit out of
`intro.bits` before the test read it, producing values like `0.9` instead of an exact `1`. Fixed the
same two ways used earlier in this same session for the sqrt-Bandwidth-cap fallout: tests genuinely
unrelated to Storage got their capacity lowered below `INTRO_DISK_UNLOCK_CAPACITY` so
`tickPoolBufferFill` never engages; one test that specifically needed the large capacity value (to
assert `aria-valuemax`) switched from `userEvent`+`await` to fake timers +
`fireEvent.click`, closing the real-time window entirely rather than trying to out-guess it.

**Test fixtures needed a broad, mechanical sweep.** Every existing `provisionDisk`/
`isProvisionDiskAvailable`/`tickDiskAutoFill` test that seeded `bits: X` to fund a build or cache
fill needed to seed `poolBuffers: { 1: X }` instead (a new `withPoolBuffer` test helper), and every
assertion reading `after.intro.bits` after such an action needed to read
`after.intro.poolBuffers[1]` instead — mechanical but pervasive, matching the same rewrite shape
the sqrt-Bandwidth-cap change needed on its own test suite in the entry above. A few tests
incidentally relied on Bandwidth (Speed/Invest) — which still spends `intro.bits` directly, since
it's a Data-Stream-level action, not pool-scoped — outranking Provision Disk in the forced priority
order; those needed `bits` seeded *alongside* the pool buffer for that higher-priority block to
still genuinely apply, rather than accidentally passing because the pool buffer alone was already
insufficient.

### Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display

The sqrt-Bandwidth-cap entry above (`Math.min(rate, Math.sqrt(getStoragePoolCapacity(state,
poolIndex)))`) computed the square root directly on the pool's Capacity as stored — a raw BIT count.
The request that introduced the cap was later corrected, twice, to specify the sqrt should operate
on Capacity converted to BYTES instead, with worked examples pinning the exact intended scale: "KB
Pool Capacity 1MB, Bandwidth 1KB/s / MB Pool 1GB, 32KB/s / GB Pool 1TB, 1MB/s… Storage pools use SI
units for all purposes." A bit-based sqrt cannot land on these figures — `sqrt(1MB in bits)` is not
`1KB/s` under any consistent unit reading — so this was a genuine formula defect, not just a display
mismatch: pool 1's Bandwidth had been hard-ceilinged at `sqrt(8,388,608 bits) ≈ 2,896.3` bits/sec
(see above), whereas the corrected formula, `Math.sqrt(capacityBits / BITS_PER_BYTE) *
BITS_PER_BYTE`, ceilings it at a clean `8,192` bits/sec (`sqrt(1,048,576 Bytes) = 1,024 Bytes/sec =
1 KiB/sec` — pool 1's Capacity is architecturally fixed at `INTRO_CAPACITY_CAP_BITS`, 1 MiB, not a
round 1 MB, so the numbers are clean in binary rather than exactly matching the user's own SI
KB-pool worked example; later pools, whose Capacity bound is itself SI-round, land on the user's
figures exactly — see `getStoragePoolBandwidth`'s own doc comment). The function's return value
stays in bits/sec either way — only the cap's own derivation changed — so every downstream
consumer (`getProvisionDiskBaseSeconds`, `getDiskReadCacheFlushSeconds`,
`getDiskWriteCacheFlushSeconds`/`SegmentSeconds`, `getDataLakeTransferDurationSeconds`,
`tickPoolBufferFill`'s own rate cap) needed no changes at all — they all just consume "the pool's
current Bandwidth in bits/sec," whatever that figure happens to be.

**Display followed the same correction.** "Storage pools use SI units for all purposes" is broader
than just the Bandwidth formula — it also means the pool card's own Bandwidth/Capacity/Memory-buffer
stat values (`ByteFoundryPage`'s `PoolCard`) should render in the SI B/KB/MB/… scale (`formatDiskSize`
— already used for Disk sizes/costs) rather than the binary B/KiB/MiB/… scale
(`formatBitsInNearestUnit`) those three stats had inherited from Memory Capacity's own binary
display. This is a deliberate split within the same pool card: the underlying shared Data Stream
Capacity ladder stays binary internally (unchanged — see the "Pool 1 byte generator: binary units"
entry elsewhere in this file), and the Data Stream card itself (balance/Buffer) still displays that
binary figure; only the pool-card-specific Bandwidth/Capacity/Memory stats switched to SI, matching
every other Storage-adjacent figure (Disks, Data Lake, caches) that was already SI. `formatDiskSize`
needed no changes — it already converts a raw bit count into SI Bytes (`formatBitsInNearestSiUnit`,
dividing by `BITS_PER_BYTE` first) — this was purely a call-site swap in `ByteFoundryPage`.

**Test fallout picked clean numbers deliberately, not just any capacity.** Several `engine.test.js`
fixtures had chosen a `capacity` value specifically so the OLD bit-based `sqrt` landed on a round
number (e.g. `capacity: 4_000_000` → `sqrt = 2,000`). Under the corrected Bytes-based formula the
same seeded values no longer produce round results (`sqrt(4,000,000 bits / 8 = 500,000 Bytes) ≈
707.1 Bytes/sec = 5,656.85... bits/sec`), so each fixture was re-derived rather than left to assert
an ugly float: pool 1's own Capacity is architecturally clamped to `INTRO_CAPACITY_CAP_BITS`
regardless of how large a `capacity` a test seeds (a pre-existing clamp, not new — see "keeps lower-
pool bandwidth... fixed" further up), so seeding any value at or above that clamp reliably produces
the same clean `8,192` bits/sec cap; tests exercising a *specific* below-clamp cap value instead
derived their seeded `capacity` backwards from the desired cap
(`capacityBits = (desiredCapBits / BITS_PER_BYTE) ** 2 * BITS_PER_BYTE`) rather than guessing at a
bit count and hoping the sqrt happened to be clean.

**Superseded by the entry below: `INTRO_CAPACITY_CAP_BITS` is no longer 8,388,608 (1 MiB) — every
"8,192 bits/sec" / "1 MiB" figure in this entry describes the PRE-correction binary-aligned cap.
See "Pool Capacity end bounds corrected to SI powers of 1000" immediately below for the current
values (8,000,000 bits, 1 MB SI, 8,000 bits/sec).**

### Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024

The sqrt-Bandwidth-cap-in-Bytes correction (entry above) fixed the CAP FORMULA but left a residual
gap the entry itself flagged: pool 1's Capacity end bound (`INTRO_CAPACITY_CAP_BITS`) was still
architecturally `BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP ** 2` — a binary `1024^2` Bytes (1 MiB,
8,388,608 bits) — not the clean SI `1,000,000` Bytes (1 MB) the worked examples specified ("KB Pool
Capacity 1MB, Bandwidth 1KB/s"). Feeding that binary cap through the (now-correct) Bytes-based sqrt
still produced a non-round `8,192` bits/sec, not the intended `8,000`. The gap wasn't the sqrt
formula any more — it was that the value being square-rooted was itself binary-shaped underneath a
newly SI-shaped formula.

The user's own correction supplied the exact mechanism: **"The switchover while doubling happens at
64 to 125, to ensure 1000 as end result."** Read as a derivation: a pure binary-doubling sequence
(1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, …) can be bent onto a clean SI endpoint with a single
deviation per "decade" of 10 doublings — instead of doubling the 7th step from 64 to 128, step to
125 instead (×1.953125, not ×2) and resume ordinary doubling from there (125 → 250 → 500 → 1000).
The result crosses 1000 (not 1024) after exactly 10 doublings from a 1-unit floor, and 1000^d after
every 10*d doublings — a general technique for aligning any binary-doubling ladder onto SI decade
marks with the minimum possible deviation from pure doubling (only 1 non-×2 step per 10).

**Scope: which ladder did this apply to?** Two candidates existed in the code, and the fix only
applies to one of them — asked the user directly (`AskUserQuestion`) rather than guessing, since a
wrong guess would mean either a wasted implementation or, worse, silently shipping a wrong economy
formula:
- **Data Lake capacity doubling** (`getDataLakeCapacity = (state, tierIndex) => 2 ** getDataLakeCapacityLevel(...)`,
  hard-capped at `DATA_LAKE_CAPACITY_MAX_LEVEL` = 10, landing on `2^10 = 1,024` units) — a strong
  surface match: it already tracks a discrete level 0–10 (exactly one "decade"), and 1,024 units is
  visibly non-round next to Disk sizes' own clean SI 1 KB/10 KB/100 KB/… in the same UI.
- **Memory/Pool Capacity ladder** (`getStoragePoolMemoryBounds`, `INTRO_CAPACITY_CAP_BITS`,
  `intro.capacity`'s own raw-doubling growth) — no explicit level counter (a raw bit value
  multiplied by `INTRO_CAPACITY_DOUBLING_STEP` each purchase, clamped to the pool's end bound), but
  its END BOUNDS are exactly what "KB Pool Capacity 1MB / MB Pool 1GB / GB Pool 1TB" describes, and
  each pool boundary sits at a whole multiple of 10 doublings from the 1-Byte floor (pool `n`'s
  bound is `1024^(n+1)` Bytes = `2^(10*(n+1))` Bytes under the old formula) — so "ensure 1000 as end
  result" (singular target, one clean value per boundary) fits this ladder's actual worked examples
  more precisely than the Data Lake's single fixed 1,024-unit cap does.

The user confirmed **Memory/Pool Capacity ladder**.

**Implementation: fix the boundary CONSTANTS, not the doubling MECHANIC.** Every pool boundary
sits at a whole multiple of 10 doublings from the floor, so the full per-step mantissa sequence
(`[1,2,4,8,16,32,64,125,250,500]` repeating ×1000 per decade) is unnecessary — at any multiple-of-10
step count the decade formula collapses to a plain power: `value = 1000^d` where `d` is the number
of complete decades. So the fix is a one-constant change: `getStoragePoolMemoryBounds(poolIndex).endBits`
went from `BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP ** (poolIndex + 1)` (base 1024) to
`BITS_PER_BYTE * POOL_CAPACITY_SI_STEP ** (poolIndex + 1)` (base 1000, a new named constant —
deliberately NOT reusing `MEMORY_BINARY_UNIT_STEP`, which stays 1024 and keeps governing the Data
Stream card's own binary display rounding, an unrelated concern). `INTRO_CAPACITY_CAP_BITS` (pool
1's alias) followed the same substitution. The actual per-purchase Capacity ×2 MECHANIC
(`upgradePoolCapacity`'s `Math.min(capacity * INTRO_CAPACITY_DOUBLING_STEP, endBits)`) was **not**
touched — it still doubles by a plain ×2 every purchase; only the boundary it clamps against
changed. This works because the boundary was always reached via a clamp anyway: a raw double from
just under the new SI boundary already overshoots past it (2× any value below 1,000,000 Bytes that's
above 500,000 lands above 1,000,000), so `Math.min(doubled, newEndBits)` naturally lands exactly on
the new SI figure on the final purchase, the same clamp shape the ladder already used before this
change — no state-shape change, no level counter, no float-precision "reverse-engineer my position
in a decade" logic required.

**A pleasing coincidence confirmed the target was right.** `INTRO_CAPACITY_CAP_BITS`'s own doc
comment (written *before* this correction) already said pool 1's Capacity "must hold at least the
pool's largest Disk build cost (100 KB × `DISK_BUILD_COST_MULTIPLIER` = 8,000,000 bits)" — the
binary cap (8,388,608) satisfied that with headroom; the new SI cap (8,000,000) satisfies it
*exactly*, with zero margin. The buffer must reach completely full to fund that last disk now,
rather than "at least" with slack — not a problem (a full buffer is always achievable), and strong
independent confirmation that 8,000,000 was the number the mechanic was always implicitly built
around, not an arbitrary new target.

**Downstream effects, all automatic.** `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY = INTRO_CAPACITY_CAP_BITS
/ INTRO_CAPACITY_DOUBLING_STEP` is a formula, not a literal, so it followed the constant change with
no edit of its own (4,194,304 → 4,000,000). `getStoragePoolBandwidth`'s sqrt-in-Bytes formula
(previous entry) needed no changes at all — it already converts to Bytes and back, so feeding it a
now-SI-round Capacity value just makes its OWN output round too: pool 1's Bandwidth cap moved from
`8,192` to a clean `8,000` bits/sec (`sqrt(1,000,000 Bytes) = 1,000 Bytes/sec`), finally matching
the "KB Pool Capacity 1MB, Bandwidth 1KB/s" worked example exactly rather than approximately.

**The Data Stream card's own binary display is the one deliberate casualty.** Its balance/Buffer
figure stays binary-denominated by design (unchanged convention — Storage pools moved to SI, Memory
Capacity's raw display did not). Before this fix, pool 1's cap (8,388,608 bits) was ALSO a clean
binary round number, so the Data Stream card happened to show a tidy "1 MiB" at pool 1's ceiling.
After this fix, the same card shows "976.562 KiB" at that same (now SI-clean, not binary-clean)
ceiling — an accepted, understood side effect: the underlying value's true magnitude is now
SI-round, and only ONE of its two display surfaces (the Storage pool cards) actually renders in that
matching unit system; the other (Data Stream card) inherited a now-slightly-odd-looking binary
figure. This was a deliberate trade — matching the explicit "Storage pools use SI units for all
purposes" instruction takes priority over keeping the Data Stream card's own cosmetic binary
roundness, and the Data Stream card was never specified to need round numbers in the first place
(only Storage pools were).

**Test fallout: three categories.** (1) `engine.test.js`'s two Bandwidth-cap tests from the previous
entry needed their expected values updated again (`8,192` → `8,000`), since they read the real
`INTRO_CAPACITY_CAP_BITS` constant rather than a synthetic value. (2) `layers.test.js`'s constants
tests asserting the old binary figures (`8,388,608`, `4,194,304`, `getStoragePoolMemoryBounds(2).endBits`
via `MEMORY_BINARY_UNIT_STEP ** 3`) were updated to the new SI figures and formula. (3)
`App.test.jsx` and `engine.test.js`'s `formatBitsInNearestUnit` tests that had asserted a clean
"1 MiB" / "512 KiB" rendering FROM the real economy constants (`INTRO_CAPACITY_CAP_BITS`,
`INTRO_COMPUTE_CORE_UNLOCK_CAPACITY`) could no longer do so, since those constants are no longer
binary-round — these were switched to synthetic, deliberately-clean binary fixtures (e.g.
`BITS_PER_BYTE * 1024 * 1024`) to keep testing the binary formatter's own unit-picking/flooring
logic in isolation from the (now intentionally non-binary-round) economy constants it happens to be
called on elsewhere. One of these, the "floors rather than rounds" test, needed a bigger seeded
deficit than the original "cap minus 1 bit": at the new cap's smaller KiB-range magnitude
(976.562 KiB, versus the old cap's MiB-range magnitude), a 1-bit gap floors to the *same* 3-decimal
text as the full capacity (their absolute difference is below the display's decimal resolution at
that scale) — the property the test verifies (a nearly-full balance never *reads* complete) still
holds for any gap large enough to actually move the 3rd decimal place, so the test uses a deliberately
larger (still small) deficit instead of a single bit.

### Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps

The entry above ("Pool Capacity end bounds corrected to SI powers of 1000") fixed each pool's own
*end* boundary to a clean SI figure (1 MB, 1 GB, 1 TB, …) but deliberately left the per-purchase
`upgradePoolCapacity` mechanic as plain binary `×2`, reasoning that a `Math.min(doubled, endBits)`
clamp already lands exactly on the SI boundary on the *final* purchase regardless of what the
intermediate steps look like. That reasoning holds for the boundary value itself, but it left a
real, visible gap: every Capacity value *before* that final purchase is still a pure binary power
(1, 2, 4, …, 64, 128, 256, …, 131,072, … Bytes), and the Storage pool card displays Capacity (and
therefore Bandwidth, `sqrt(Capacity in Bytes)`) in SI units — so mid-progression, the card showed
figures like "131.072 KB" Capacity / "362.038 B/sec" Bandwidth, which read as broken even though
they were arithmetically correct outputs of a binary sequence rendered through an SI formatter. A
screenshot of exactly this ("KB Pool 1 · Kilobytes", Capacity 131.072 KB, Bandwidth 362.038 B/sec)
is what surfaced the gap.

An external agent (Jules, PR #533) independently identified the same underlying idea documented in
the entry above — deviate the doubling sequence from 64 to 125 once per decade of 10 doublings, the
same technique already used to derive the SI end-boundary constants — but applied it as a **new
helper called inside the doubling mechanic itself** rather than only in the boundary-constant
derivation, and got two things wrong in the process: (1) the switchover check compared the raw bit
value against a mantissa of `64`, but `intro.capacity` is stored in *bits* while the switchover
point ("64 Bytes → 125 Bytes") is defined in *Bytes* — so the deviation could never actually fire at
the intended point; (2) it additionally applied the same treatment to the Data Lake capacity ladder
(`getDataLakeCapacity`), changing its hard cap from 1,024 to 1,000 units — but the Data Lake ladder
was the *other* candidate this same design decision explicitly considered and rejected earlier (see
"Scope: which ladder did this apply to?" in the entry above — the user confirmed Memory/Pool
Capacity only), so re-applying it there was an unauthorized, out-of-scope economy change (no linked
issue, silently nerfing a value players actually see and rely on) rather than a bug fix. PR #533 was
closed rather than merged for these reasons, and this entry documents the corrected, narrower fix
that replaced it.

**The corrected fix:** `getNextSiDoubledValue(val)` (in `engine.js`, `val` in bits) converts to
Bytes first, then walks the value down by whole factors of 1000 to find its current "decade"
mantissa; if that mantissa is exactly `64`, the next value is `125 * (that decade's power of 1000)`
Bytes — otherwise it's a plain `bytes * 2` — converted back to bits before returning.
`upgradePoolCapacity` calls this instead of `capacity * INTRO_CAPACITY_DOUBLING_STEP`, still passed
through the same `Math.min(…, endBits)` clamp as before, so the boundary-landing behavior from the
entry above is unchanged — only the *shape* of the steps leading up to it changed. `getDataLakeCapacity`
was left exactly as it was (`2 ** getDataLakeCapacityLevel(...)`, cap 1,024) — this fix's scope is
the Memory/Pool Capacity ladder only, matching the original, still-standing scope decision.

**Precision at extreme scale.** `getNextSiDoubledValue`'s decade-mantissa detection relies on exact
integer division/modulo, which loses exactness once a pool's magnitude exceeds `Number`'s ~2^53
safe-integer range — empirically around pool 8 and beyond (confirmed by tracing the real function
through the full pool 1–10 progression: decade-boundary detection stays exact through pool 7's
1e24-Byte magnitude and only starts silently reverting to plain doubling partway into pool 8, at
`bytes = 6.4e25`, where `6.4e25 % 1000 !== 0` due to float rounding despite being mathematically an
exact multiple). Past that point the helper silently falls back to plain doubling rather than risking
a wrong mantissa match. This wasn't treated as a blocking bug: the game already represents astronomically
large figures (`GOOGOL` = 1e100, `PRESTIGE_THRESHOLD` = 8e100, and pool Capacity/Data Lake values at
the higher pools already exceed safe-integer range under the *existing*, pre-this-fix formulas too)
as plain JS `Number`s throughout, accepting the same float-precision ceiling everywhere else — adding
exact-precision handling (BigInt or a decimal library) solely for this one helper would be
inconsistent with how the rest of the economy already works, and the cosmetic payoff (SI-clean
*intermediate* display) matters most in the early-to-mid pools a player actually watches tick by
tick, not the deep pools whose numbers already read as "big and approximate" regardless.

**An explicit step-counter was considered and rejected.** Precisely tracking "which decade doubling
we're on" would be trivial with a new persisted counter field (mirroring how Data Lake tracks
`capacityLevel`), sidestepping the precision question entirely. This was rejected as disproportionate
to the fix: it would require a new `intro` state field, `createInitialGameState`/`mergeState`
defaults, and reasoning through Era-ascension reset and save-migration interactions for a field whose
entire purpose is cosmetic (making a displayed number look rounder at high pools where the game
already tolerates approximation) — the deriving-from-current-value approach above is stateless, needs
no migration, and is exact in the range that actually matters.

**Test/doc fallout.** `engine.test.js` gained a `getNextSiDoubledValue` unit-test suite (the
below-64 case, the 64→125 deviation, resumed doubling through a full decade, the deviation repeating
at the next decade, the bits-vs-Bytes distinction, and a 17-step replay from the 1-Byte floor landing
on a clean 125,000 Bytes where pure binary doubling would land on 131,072) plus one
`pickIntroCapacityMilestone` integration test pinning the 64→125 Bytes step through the real action.
`CLAUDE.md`/`AGENTS.md`'s Economy model sections were updated to describe `upgradePoolCapacity`'s
step-shape change (previously documented as "plain ×2, unchanged").

### Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card

The entry above deliberately excluded the Data Lake capacity ladder from the SI-switchover
treatment, citing an earlier, explicit design decision (see "Pool Capacity end bounds corrected to
SI powers of 1000") where the maintainer was asked which of the two candidate ladders — Memory/Pool
Capacity or Data Lake capacity — should get it, and confirmed only the Memory/Pool ladder. That
same PR closed #533 partly *because* it applied the treatment to the Data Lake ladder without that
authorization.

Shortly after #539 merged, the maintainer explicitly asked to include the Data Lake ladder in "the
same logic" after all — a direct, in-conversation instruction, which is exactly the authorization
that was missing from #533. This entry documents implementing that request correctly, plus a
companion UI request from the same conversation.

**Data Lake capacity: `DATA_LAKE_CAPACITY_BY_LEVEL` lookup table, not a derived helper.** Unlike
`intro.capacity` (a raw bit value doubled repeatedly, with no explicit step counter — see
`getNextSiDoubledValue` above), a Data Lake's own capacity level is already an explicit small
integer (`capacityLevel`, 0–`DATA_LAKE_CAPACITY_MAX_LEVEL`/10) tracked directly in state. This makes
a plain lookup table strictly better than reusing `getNextSiDoubledValue`'s derive-from-value
approach: `DATA_LAKE_CAPACITY_BY_LEVEL = [1, 2, 4, 8, 16, 32, 64, 125, 250, 500, 1000]` (`layers.js`)
needs no float-precision handling at all, at any level, since every entry is a small hardcoded
integer rather than something computed from a potentially-imprecise accumulated value.
`getDataLakeCapacity` (`engine.js`) changed from `2 ** getDataLakeCapacityLevel(state, tierIndex)` to
`DATA_LAKE_CAPACITY_BY_LEVEL[getDataLakeCapacityLevel(state, tierIndex)]` — a one-line change.
`DATA_LAKE_CAPACITY_MAX_LEVEL` itself stays 10 (11 table entries, levels 0–10); only the VALUE at
the max level changed, from a binary 1,024 units to a clean SI 1,000. This is, functionally, exactly
PR #533's original `getDataLakeCapacity` change — it was correct in isolation the first time; only
its scope was wrong, and now the scope is authorized.

Downstream: `getDataLakeCapacityDoublingCost`/`isDataLakeCapacityMaxed`/`canDepositDiskToDataLake`
all read `getDataLakeCapacity`'s return value already, so needed no changes of their own — only their
own doc comments citing "1,024" were updated to "1,000." The Guide (`InfoPage`) previously hardcoded
`2 ** DATA_LAKE_CAPACITY_MAX_LEVEL` to describe the max cap in prose; since that's no longer the
correct formula, it now reads `DATA_LAKE_CAPACITY_BY_LEVEL[DATA_LAKE_CAPACITY_BY_LEVEL.length - 1]`
instead — still a pure derivation from the same exported constant table the engine uses, keeping the
Guide's "reads no live state, only pure constants/formulas" property (see "Architecture" in
`CLAUDE.md`) intact rather than hardcoding the literal `1000`.

**Test fallout.** The two `engine.test.js` tests pinning the old 1,024 max (`doubleDataLakeCapacity`
hard-cap; the "1,024 hard-caps the total below 1,110" deposit test) were updated to 1,000, with the
deposit test's own worked-example arithmetic corrected: at a 1,000 cap, filling the ×1 and ×10
sub-slots first (10 + 100 = 110 units) leaves room for exactly 8 full ×100 deposits (800 units,
total 910) before a 9th would push the total to 1,010 > 1,000 and get blocked — two ×100 disks stay
undeposited, not one (the 1,024-cap version left room for 9). A new test walks the full level 0→10
progression through the real `doubleDataLakeCapacity` action, asserting the sequence matches
`[1, 2, 4, 8, 16, 32, 64, 125, 250, 500, 1000]` exactly — mirroring the equivalent step-by-step
coverage `getNextSiDoubledValue`'s own test suite already has for the Memory ladder.

**Pool Memory UI: reuse the Data Stream card's own block, not a bespoke bar.** Separately, a
screenshot-driven request: the pool card's "Bandwidth / Capacity / Memory" three-column stat row
(each a labelled `PoolStatLabel`/`PoolStatValue` pair, Memory alone carrying a thin
`PoolBufferMeter` fill bar) read as visually inconsistent with the Data Stream card immediately
above it on the same screen, which shows its own balance as one full-width fillable block
(`FillableStatCard` — a gradient fill background sized to the current percentage, with a bold
balance line and a muted status line, no visible label). The fix was to reuse that same block
verbatim for the pool's own Memory/Capacity/Bandwidth display, rather than inventing a second,
parallel meter convention: `PoolStatsRow`/`PoolStat`/`PoolStatLabel`/`PoolStatValue`/
`PoolBufferMeter` were deleted from `ByteFoundryPage/index.jsx` entirely, replaced by one
`FillableStatCard` (the exact same styled component the Data Stream card already used) per pool,
containing a `BalanceText` line reading `<buffer bits> / <buffer capacity>` (the pool's own small
local buffer over its own Capacity — which `getPoolBufferCapacity` already equals exactly, per
"Per-pool Memory buffers" further up this file, so no new value needed fetching) above a
`StatusText` line reading `<bandwidth>/sec` below — both unlabelled, matching the Data Stream
card's own convention of conveying the figure's meaning through position and styling rather than a
caption. The fill percentage (`poolBufferPercent`, unchanged) drives the block's background exactly
as it drove the old `PoolBufferMeter`'s. `getStoragePoolCapacity` was dropped from this file
entirely — it was fetched solely to render the old, separate "Capacity" stat, which the new fraction
already covers via the equal `poolBufferCapacity` value.

`App.test.jsx`'s pool-advance test, which previously asserted on the literal strings `'Bandwidth'`
and `'Capacity'` as separate labelled elements, was updated to assert on the actual rendered
text — the bandwidth figure and the buffer/capacity fraction — computed via `getPoolBufferBits`/
`getPoolBufferCapacity` (newly imported into the test file) rather than the no-longer-rendered
`getStoragePoolCapacity`. Verified visually via a real Playwright/Chromium screenshot against
`yarn dev` (seeded to the exact 125,000-Byte/67,382-Byte scenario from the reported screenshot)
before considering the change done, per this repo's own "test UI changes in a browser" convention.

### Pool titles simplified to "<symbol> Pool"; each pool's Data Lake moved inside its own card

Two more follow-up UI requests in the same conversation as the entry above, both scoped purely to
`ByteFoundryPage`/`DataLakePanel` presentation — no economy logic changed.

**Pool title.** Each `PoolCard`'s title previously read "`<symbol>` Pool `<n>` · `<Tier name>`" (e.g.
"KB Pool 1 · Kilobytes"), left-aligned. Requested: rename to just "`<symbol>` Pool" (e.g. "KB Pool")
and center it. The reasoning holds up on inspection — the symbol (KB/MB/GB/…) already uniquely
identifies which pool this is among the ten, so both the numeric index and the spelled-out tier name
were redundant with it. `PoolTitleName` (the styled span holding "Pool `<n>` · `<Tier name>`") was
deleted; `PoolTitle` now renders just the symbol plus a plain "Pool" span, and `PoolHeaderRow`/
`PoolTitle` both switched from left/`space-between` alignment to `justify-content: center`. The
`aria-label`s that actually distinguish pools for accessibility/tests (`"pool <n>"` on the card,
`"expand/collapse pool <n>"` on the summary button) are untouched — they never displayed to sighted
users in the first place, so dropping the index from the *visible* title doesn't remove it from
anywhere assistive tech or tests actually read it from.

**Data Lake relocated into its own pool's card.** Previously `DataLakePanel` rendered once, after
every `PoolCard`, showing every lake with any activity (deposits, a purchase, capacity growth) as a
row in one shared grid — a design explicitly separate from any one pool's own card. Requested: move
each lake's own row inside its corresponding pool's card, positioned below that pool's disk-array
rows. This is, notably, exactly what `DataLakePanel`'s own pre-existing doc comment already
described ("`bare` skips the own StatCard wrapper... used when a caller (e.g. ByteFoundryPage's
single pool card) already provides that chrome") — the component was seemingly designed with this
embedding in mind from early on, but the actual call site had never been wired that way; the global,
un-scoped `<DataLakePanel actions={actions} state={state} />` after the pool-card loop was the only
caller before this change.

**Implementation.** `DataLakePanel` gained an optional `tierIndex` prop: when set, `visibleTiers`
becomes the single-element `[tierIndex]` instead of `getVisibleLakeTierIndexes(state)`'s
activity-filtered list — meaning a lake embedded this way is **always** shown once its pool is
unlocked and expanded, not conditionally hidden until it has activity, since it's now a permanent
structural part of that pool's own card rather than an entry in a rarity-filtered global list. The
existing multi-tier (`tierIndex` omitted) code path was left completely intact for API
compatibility/potential reuse, even though no caller currently exercises it — the component's own
doc comment already flagged this as a deliberately-reusable shape. `ByteFoundryPage` moved the
`<DataLakePanel .../>` call from after the whole pool-card `.map()` loop to inside each pool's own
`isExpanded` block, right after that pool's `DiskArrayRow` list, passing `bare` (skip the outer
StatCard — the surrounding `PoolCard` already supplies that chrome) and `tierIndex={poolIndex}`.

**Test fallout.** `App.test.jsx`'s "Data Lake renders bare" test previously asserted a global
`aria-label="Data Lakes"` region existed; that region no longer renders anywhere (there's no more
un-scoped multi-lake caller), so the test now asserts the opposite (`queryByLabelText` returns
nothing) and instead checks the lake's own text renders `within` its specific pool's own
`aria-label="pool 1"` region. Two disk-array-detail tests (`'ByteFoundryPage renders the current
size's full interactive Disk array detail inline...'` and `'cache squares and disk circles carry
bit-scale vs Byte-scale size labels...'`) previously counted every `'1 KB'` text node on the whole
page to assert exactly `DISK_ARRAY_LADDER_CAP` (10) disk circles — now that the pool's own embedded
Lake row can ALSO show a `'1 KB'` figure (its own Capacity or next-Booster-cost, both plausible at a
fresh lake's starting values), the raw counts inflated to 12. Both were narrowed to query `within`
the specific `role="group"` disk/cache elements instead of the whole document, which both fixes the
count and is arguably the more correct scope for what each test is actually about (this size's own
rendered cells, not incidental same-text matches elsewhere on the page). The pool-advance test's
`'Kilobytes'`/`'Megabytes'` text assertions (checking the now-removed tier name) were replaced with
checks for the pool's own symbol immediately followed by "Pool" (`` `${TIER_DEFINITIONS[n].symbol}Pool` ``
— no literal space in the DOM text between the two spans, only CSS `gap`).

A small, unrelated accessibility nit surfaced by the same review round was folded in here too: the
pool's own `FillableStatCard` block (the memory/capacity/Bandwidth bar from the entry above) carried
an `aria-label` on a plain `<div>`, which per the accessible-name computation spec is inert without an
explicit ARIA role. Added `role="group"` so the label actually attaches; the Data Stream card's own
`FillableStatCard` instance was unaffected since it already renders `as="button"`/`as="section"`
(both roled elements) once `intro.byteCreated`.

Verified visually via Playwright/Chromium against `yarn dev` for both changes together — a fresh
pool card reads "KB Pool" / "MB Pool" (centered) with the KB lake's own row appearing directly below
its disk squares once expanded, matching the request.

### "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display

A follow-up rule from the same conversation: never render a number as "0.xyz" — a fraction below 1
with a bare "0" in front of the decimal reads as noise rather than a magnitude, and there's almost
always a smaller unit (down to the raw bit count, the finest unit this game has) that would show the
same underlying value with at least one meaningful significant digit before the decimal instead.

**Where this actually occurs.** Every Byte/bit-scale display in the game ultimately routes through
`formatMemoryAmount(bits, unit)`, which divides `bits` by `unit.divisor` and floors to 3 decimal
places. The two unit ladders it's fed (`getSiByteUnit` for Disks/Data Lake/Bandwidth — SI, step
1000; `getMemoryUnit` for the Data Stream Buffer/pool Memory Capacity — binary, step 1024) both
bottom out at whole Bytes ("B", divisor `BITS_PER_BYTE` = 8) — neither defines any unit smaller than
a Byte. A self-sized call (each ladder picks its OWN unit off the value it's about to display) can
therefore only ever produce a sub-1 fraction at that one bottom rung — e.g. `formatDiskSize(4)`
(4 bits = half a Byte) previously rendered `"0.5 B"`, and the reported live-game symptom,
`getStoragePoolBandwidth` returning a sub-1-Byte-per-second rate, rendered `"0.125 B/sec"` on the
Storage pool card. A second, less obvious source: `formatMemoryBalance` (`ByteFoundryPage`'s own
local helper backing the Data Stream tile) deliberately sizes ONE shared unit off `capacity` (the
larger of a bits/capacity pair) so both numbers read in the same unit — but the smaller `bits` value,
shown through that SAME (capacity-sized) unit, can land anywhere below 1 whenever it's a small
fraction of capacity — not just at the ladder's bottom rung. A balance of 500 bits shown through a
capacity-derived KiB unit (divisor 1024) floors to `0.488`, a clear "0.xyz" violation despite the
unit itself being nowhere near the bottom of the ladder.

**The fix: catch this at render time, in the one shared function both ladders funnel through** —
not at unit-selection time, and not by adding a third, sub-Byte unit rung to either ladder (there
isn't a sensible name for one; a Byte is already this game's smallest *named* unit). After computing
the floored `scaled = bits / unit.divisor`, `formatMemoryAmount` now checks `scaled > 0 && scaled < 1`
— a genuine nonzero fraction below one whole unit — and if so, falls back to the exact same raw
`"N bit(s)"` string the function already renders when `unit` itself is `null` (the pre-`byteCreated`
case; see the `getMemoryUnit` doc comment for that earlier, narrower instance of the same underlying
principle — "a fractional Byte reads worse than the raw count for a range this small"). A `scaled`
that floors to exactly `0` is deliberately left alone (renders `"0 <unit>"`, e.g. `"0 MiB"`) — there's
no fraction to hide since nothing after the decimal point would ever show.

**Why render-time, not unit-selection-time.** Fixing this inside `getSiByteUnit`/`getMemoryUnit`
themselves (e.g. having them return `null` whenever the INPUT value is below `BITS_PER_BYTE`, mirroring
`getMemoryUnit`'s existing `byteCreated` gate) would correctly handle every SELF-sized call, but not
the `formatMemoryBalance` shared-unit case above — there the unit is sized off `capacity` (always well
above the ladder's bottom rung once `byteCreated`), while the problem value is the DIFFERENT, smaller
`bits` argument sharing that same unit. Only a check at the point where a specific value is actually
being rendered through whatever unit it was given catches both shapes with one change, regardless of
which value (or whose reasoning) picked that unit.

**Why the `formatMemoryBalance` pairing rule was knowingly relaxed, not preserved.** The existing,
documented convention for that helper is "both numbers always render in the same unit... so a balance
never reads in a coarser unit than its own Buffer" — explicitly to avoid a *different* kind of
confusing mismatch (e.g. "512 B / 1 KiB"). This fix can now produce exactly the kind of mismatch that
rule was written to prevent — e.g. "500 bits / 1 KiB" — whenever the balance alone would otherwise
show a bare fraction. This was a deliberate trade-off, not an oversight: the newer, explicit,
unconditional "never 0.xyz" instruction is more specific and postdates the original same-unit
convention, and a divergent-but-legible pair ("500 bits / 1 KiB") reads more clearly than a
same-unit-but-fractional one ("0.488 KiB / 1 KiB") — especially since the divergence is rare and
self-correcting: it only ever triggers while the balance is a genuinely tiny fraction of a much
larger capacity (e.g. right after a Capacity ×2 purchase drains it to near-zero), and resolves back
to a shared unit as soon as the balance climbs high enough to floor to a value at least 1 in that
unit. `getMemoryUnit`'s own pre-`byteCreated` gate was deliberately left untouched rather than
removed as now-redundant: removing it would let a fresh cycle's tap-phase balance/capacity pair
diverge into e.g. "3 bits / 1 B" (via this same fallback) instead of the current, still-preferred
"3 bits / 8 bits" — keeping both sides in raw bits together reads better than a divergent pair for
that specific, very-small-magnitude window, so the gate's pre-existing behavior stands on its own
merits independent of this more general fix.

**Test fallout.** `engine.test.js`'s `formatDiskSize` test suite had a test literally titled "renders
a fractional Byte below the 1-Byte (8-bit) threshold," pinning the exact `"0.5 B"` output this fix
eliminates — retitled and updated to assert the new `"4 bits"`/`"1 bit"` fallback instead. Two new
`formatMemoryAmount` tests were added: one confirming the fallback fires for a value sharing a
capacity-sized unit (not just a self-sized bottom-rung one), and one confirming a true zero is
unaffected. Verified visually against the exact reported scenario (a pool Bandwidth of `1 bit/sec`,
previously `"0.125 B/sec"`) via Playwright/Chromium against `yarn dev`.

**Follow-up, found by adversarial review before merge: the raw-bits fallback itself assumed `bits`
was always a whole number.** The fallback above renders `` `${formatAmount(bits)} bit${bits === 1 ?
'' : 's'}` `` — reusing `bits` exactly as given. That's the game's true bit count for every ordinary
caller, but not for the ones actually feeding the two live displays this fix targets:
`tickPoolBufferFill`'s own transfer amount (`Math.min(fillRate * elapsedSeconds, room, bits)`) is
never floored before being added to a pool buffer or subtracted from `intro.bits`, and neither are
the analogous cache-fill transfers — both real numbers, not integers, since `fillRate` and
`elapsedSeconds` (a tick's fractional-second duration) rarely multiply to a whole number. So while a
pool's buffer (or the Data Stream balance itself) fills up from near-zero — a fresh pool unlock, or
right after a Capacity-doubling/lake-doubling purchase drains it to 0 — `bits` can genuinely sit at,
say, `0.3` for a tick, and the fallback would render `"0.3 bits"`: the identical "0.xyz" pattern this
whole fix exists to eliminate, just relabeled from a Byte-scale unit onto the bit count itself. No
test added alongside the original fix exercised a fractional `bits` input (all used integers), so
nothing caught it before review.

Fixed by flooring `bits` immediately before building the `"N bit(s)"` string (a new
`flooredBitsLabel` helper used by both the `unit === null` branch and the below-1-in-its-unit
fallback), rather than floor it further upstream in `tickPoolBufferFill`/the cache-fill transfers
themselves — flooring the accumulators would change actual game-state precision (fill amounts,
timing) for what is fundamentally a display-only defect; flooring only at the point of rendering
keeps the fix scoped to formatting, matching the rest of this entry's own "catch this at render
time" reasoning. `0.3`/`0.9` bits now floor to a clean `"0 bits"`; `1.9` floors to `"1 bit"` — same
"never overstate" rounding direction every other amount in this file already uses. Three new test
cases cover the null-unit branch and the fallback branch (via a `divisor: 1` unit, the bit-scale
ladder's own bottom rung, so `scaled` equals `bits` itself and a fractional input reliably lands in
the fallback path being tested).

### Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation

A follow-up in the same conversation as the "0.xyz" entry above, but at the opposite end of the
number line: MainPage tier Buy buttons price everything in Bits (`MONEY_ID = 'base'`), and once a
level cost crosses `EXPONENTIAL_NOTATION_THRESHOLD` (1,000,000), `formatCurrency` switches to
scientific notation — e.g. Megabytes' own full-block cost (8,000,000 bits) read `"8e6 b"`. The
report: this specific figure is not an arbitrary bit count at all — it's exactly 1,000,000 Bytes
(a Byte being 8 bits), and should read `"1e6 B"` to make that explicit.

**Why this is common, not a one-off.** A scientific-notation mantissa of exactly `BITS_PER_BYTE`
(8) turns up regularly in this game's cost ladders because so many of them are built on
Byte-denominated real-world quantities multiplied by 8 to get their Bits price — Kilobytes' whole
tier concept, and `PRESTIGE_THRESHOLD` itself (`GOOGOL * BITS_PER_BYTE` = `8e100`, already
documented elsewhere as "1 Googol Bytes, expressed in Bits since a Byte is 8 Bits" — see the
`PRESTIGE_THRESHOLD` history entry). The Prestige-threshold overlay was, before this fix, silently
inconsistent with its own documented meaning: displaying `"8e100 b"` while every comment describing
the constant already called it "1 Googol Bytes."

**The fix, and why it's narrower than "always divide by 8."** `formatCurrency` now checks, in the
exponential range only, whether the value's scientific-notation mantissa is exactly 8 (computed as
`value / 10 ** Math.floor(Math.log10(value))`, compared against `BITS_PER_BYTE` within a small
float-tolerance epsilon) — not merely whether the value is evenly divisible by 8. Divisibility alone
isn't sufficient: an arbitrary divisible value like `2.4e41` (`24 × 10^40`, divisible by 8) would
convert to `3e40`, a mantissa unrelated to the original's own "shape" and no more illuminating than
the bits figure was. Only an EXACT mantissa of 8 guarantees the Bytes conversion produces an
equally-clean round number (mantissa exactly 1) with zero information lost — the narrow, literal
case the request actually described (`"8eN b"` → `"1eN B"`), not a broader unit-conversion policy
applied speculatively to every divisible value.

**Scope: `formatCurrency`, not just the tier-cost UI element the report mentioned.** The same
mantissa-8 pattern is a property of the NUMBER, not of which button happens to display it —
`formatCurrency` is the single shared formatter behind every Bits-denominated display in the game
(tier costs, tickspeed/autobuyer costs, the Prestige-threshold overlay), so fixing it there applies
the rule everywhere consistently rather than special-casing just the Buy button. `formatMoneyBalance`
(MainPage's own `MoneyHero` headline) is unaffected — it already does its own independent Bytes
conversion at a much lower threshold (`MONEY_BYTES_DISPLAY_THRESHOLD` = 8000 bits, far below the
1,000,000 exponential threshold) via a separate code path that never calls `formatCurrency` in the
exponential range, so there's no double-conversion or interaction between the two.

**Test fallout.** `App.test.jsx`'s Megabytes-tier test had directly pinned the old `"8e6 b"` button
text (with a comment explaining the exponential-threshold math) — updated to `"1e6 B"` with the
Bytes-conversion reasoning added. Two new `formatCurrency` tests were added: one confirming the
conversion fires correctly across several magnitudes (`8e6`, `8e21`, and `8e100` — the last matching
`PRESTIGE_THRESHOLD` exactly), and one confirming other mantissas (`2e6`, `4e6`, `1.6e6`) are left
in Bits, proving the fix doesn't over-trigger on merely-divisible-by-8 values.

### App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid

A third, independent follow-up: propose a distinctive icon for the game and put it in place across
every icon surface (favicon, PWA install icons, apple-touch-icon). The existing icon
(`scripts/generate-pwa-icons.mjs`, since the app's original PWA setup) was a centered serif "10"
glyph in the brand accent color on the dark page background — functional but generic, reading as a
placeholder rather than a mark specific to this game.

**Concept.** An 8-cell grid (4 columns × 2 rows) of rounded squares, each filled with a diagonal
gradient sweeping through three of the app's own existing semantic color tokens (`accent` indigo →
`violet` → `good` green — the same hues already used throughout the real UI, `src/theme/tokens.js`)
on the same dark `page` background the old icon used. This was chosen over other candidates
(an ascending-bar "growth chart" glyph; a redrawn, more graphic "10" logomark) specifically because
it ties directly to the one mechanic every player encounters first and universally, regardless of
how far a run progresses: the Byte Foundry's own tap-to-earn loop, where exactly 8 tapped bits
combine into 1 Byte. A generic "10" numeral describes the game's *name*; the byte grid describes
what a player actually *does* in it. The gradient itself doubles as a nod to the game's other
throughline — exponential growth across powers of ten — without needing literal digits at all.

**Small-size legibility required a second, simplified variant.** Rendering the full 8-cell grid down
to a true 16×16 favicon (checked by rasterizing at 16px and inspecting a nearest-neighbor upscale
for review, not just eyeballing the 512px source) produced an illegible plaid — the cell gaps and
rounded corners blur together at that resolution, a well-known failure mode for detailed marks at
favicon sizes. Rather than simplify the ONE shared design for every consumer (losing the byte-count
specificity at every larger size too, where 8 cells render perfectly clearly), `gridSvg` was
parameterized by `cols`/`rows`: the 512px/192px/180px PWA and apple-touch icons keep the full
4×2/8-cell grid, while `favicon.ico`'s three embedded frames (16/32/48px) use a simplified 2×2/
4-cell version of the identical gradient/style — confirmed legible at true 16×16 via the same
render-and-upscale check. This is the same "coarser glyph at small sizes" pattern many established
app icons use (a simplified mark at favicon scale, the full mark everywhere larger), not a
compromise unique to this game.

**`favicon.ico` didn't exist as a build output before this change** — the repo's checked-in
`favicon.ico` predated `scripts/generate-pwa-icons.mjs` entirely (the script only ever wrote the
PWA/apple-touch PNGs) and was presumably hand-produced once, out of band, and never regenerated
since. Bringing it into the same generation script (rather than hand-editing a binary `.ico` file,
which isn't practically possible in an editing session) required constructing one from scratch:
`sharp` can rasterize the SVG to PNG frames but has no ICO writer, so a minimal ICO container
(6-byte header + one 16-byte directory entry per frame + the raw PNG bytes themselves) is
hand-assembled directly in the script — deliberately using the modern "PNG-frame" ICO variant
(supported since Windows Vista, and what every current browser expects) rather than the legacy
BMP+AND-mask encoding, which needs uncompressed pixel data and a separate transparency mask per
frame — avoiding a new dependency for what's a one-off, infrequently-run script (this repo already
treats `sharp` itself as acceptable exactly because icon generation is dev-tooling, not part of the
production build).

**No test changes** — icon files aren't exercised by the Vitest suite (no snapshot/pixel tests
cover `public/*.png`/`favicon.ico`), so this was verified purely visually: rendering each generated
size directly, and specifically the 16×16 favicon frame upscaled with nearest-neighbor sampling
(to inspect true-resolution legibility rather than a browser's own smoothed preview) before and
after the 2×2 simplification.

### Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display

A direct follow-up correction, reported via screenshot: after the "Pool Capacity doubling mechanic
itself corrected to land on SI-clean intermediate steps" entry above shipped, the Data Stream
tile's own balance/capacity line started showing figures like "6,176 bits / 1.953 KiB" — a value
that no longer lands on a clean binary figure the way it always had. The instruction: "Data stream
should not use switchover to decimal. It should continue doubling normally."

**Root cause: one value, two unit systems, one mechanic can't serve both.** `intro.capacity` is a
single number that backs TWO independent displays: the Storage pool card's own Capacity/Bandwidth
stats, rendered in **SI** units (`formatDiskSize`), and the Data Stream tile's own balance/capacity
line, rendered in **binary** units (`formatBitsInNearestUnit`/`getMemoryUnit`) — a distinction this
file documents repeatedly and treats as a firm convention (see "Bandwidth cap corrected to
sqrt(Capacity in Bytes); Storage pools switched to SI display" and "Pool Capacity end bounds
corrected to SI powers of 1000" above). The `getNextSiDoubledValue` mechanic made `intro.capacity`'s
own intermediate values land cleanly in SI terms (1, 2, 4, …, 64, 125, 250, 500, 1,000, 2,000, …
Bytes) — which is exactly what a value shown in BINARY units does NOT want: 2,000 Bytes is
"1.953 KiB," not a round binary figure, whereas the plain-binary-doubling predecessor (…, 512, 1024,
2048, … Bytes) always landed on a clean "1 KiB"/"2 KiB"/etc. Fixing the SI (pool-card) side
necessarily un-fixed the binary (Data-Stream-tile) side, since both read off the identical number —
there was no version of the mechanic that could satisfy both unit systems' idea of "round" at once.

**Resolution: revert to plain binary doubling for pool Capacity, keep the SI-clean mechanic for
Data Lake capacity only.** `upgradePoolCapacity` goes back to `capacity * INTRO_CAPACITY_DOUBLING_STEP`
(exactly its pre-`getNextSiDoubledValue` form) — `intro.capacity` doubles cleanly in binary terms
again, restoring the Data Stream tile's own clean "N KiB"/"N MiB" progression. `getNextSiDoubledValue`
itself is deleted from `engine.js` entirely (dead code once its only caller reverts) rather than
kept unused. This deliberately reopens the ORIGINAL complaint the SI-clean mechanic was written to
fix — the Storage pool card's own Capacity/Bandwidth stats can again show non-round intermediate SI
figures (e.g. "131.072 KB") while progressing toward a pool's own clean SI end boundary — but that
trade was judged the right one on reflection: the Data Stream tile's own binary cleanliness is the
one that actually matters here, not the pool card's SI cleanliness at every intermediate step (only
each pool's own END boundary, which the pre-existing `POOL_CAPACITY_SI_STEP` boundary-constant fix
already guarantees lands SI-round regardless of the doubling mechanic — see the earlier entry — was
ever the load-bearing guarantee).

**Why the Data Lake capacity ladder keeps its own SI-clean switchover, unaffected.** A Data Lake's
own capacity (`DATA_LAKE_CAPACITY_BY_LEVEL`) is NEVER rendered through any binary unit anywhere in
the app — `DataLakePanel` is SI-only, full stop — so there is no second display for its SI-clean
intermediate values to conflict with. The scope split that closed out the earlier "Data Lake
capacity ladder brought under the same SI-clean sequence" entry (bringing the Data Lake ladder INTO
the SI-clean treatment, on top of an initial design decision that had excluded it) still stands;
only pool Capacity's OWN mechanic — the one thing this entry reverts — turned out to have a
same-value/different-unit-system conflict the Data Lake ladder was never exposed to.

**Test fallout.** The `getNextSiDoubledValue` describe block and the `pickIntroCapacityMilestone`
64→125 deviation test (both added by the entry above) are removed entirely; the surviving
`pickIntroCapacityMilestone` tests (doubling from a fresh state, no-op at the pool end bound) needed
no changes since they already exercised values in ranges the SI-clean deviation never touched,
except the specific 64-Bytes test, which now asserts a plain doubling to 128 Bytes instead of the
now-removed 125-Byte deviation. `CLAUDE.md`/`AGENTS.md`/`docs/ECONOMY_REFERENCE.md`'s prose was
updated throughout to describe `upgradePoolCapacity` as plain binary doubling again, while keeping
the Data Lake capacity ladder's own SI-clean description (and its now-standalone, no-longer-cross-
referencing-`getNextSiDoubledValue` phrasing) intact.

### Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it

A third round on the same feature. After the previous entry's revert shipped (plain binary doubling
for `intro.capacity`, no SI-clean mechanic anywhere in the Storage pool path), the player reported —
via screenshot of a "KB Pool" card reading "6.964 KB / 16.384 KB" and "128 B/sec" — that the pool
card itself should show clean SI figures again: "Speed should have been 125. Capacity should have
been 16 KB." A follow-up standing rule then clarified the general principle rather than re-litigating
case by case: **"The switchover is applicable only in the storage pools. Everything that switches
over, uses SI units. Everything that doubles normally, uses binary units."**

**The previous two attempts both made the same category error: one raw value serving two displays
with incompatible "roundness."** Attempt 1 (`getNextSiDoubledValue` growing `intro.capacity` itself)
fixed the pool card's SI cleanliness by breaking the Data Stream tile's binary cleanliness. Attempt 2
(the prior entry, reverting to plain binary doubling entirely) fixed the Data Stream tile's binary
cleanliness by breaking the pool card's SI cleanliness right back. Neither attempt tried decoupling
the two displays onto genuinely separate values — each treated `intro.capacity` as the single source
of truth for both, when the fix that actually satisfies the standing rule requires the pool's own
Capacity to be computed independently of `intro.capacity`, not merely formatted differently from it.

**The arithmetic obstacle that blocked a naive "just apply the switchover to the pool card's number"
fix:** the pool card shows two numbers, Capacity and Bandwidth, where Bandwidth is `sqrt(Capacity in
Bytes)`. If Capacity is set to a clean SI switchover term (e.g. 16,000 Bytes, "16 KB"), its square
root is ~126.49 — not the clean 125 the player expected. If instead Bandwidth is defined as the clean
switchover term (125) and Capacity is defined as its square (15,625, "15.625 KB"), Capacity itself
stops being clean. The two numbers can't both land on their own clean switchover value under a single
shared `sqrt` formula — this was surfaced to the player directly (via `AskUserQuestion`, with the
exact numbers above) rather than guessing a third time, given the first two attempts had already
each cost a revert. The player picked "both independently snap to clean values": Capacity follows
its own switchover sequence, and Bandwidth is separately snapped down to the nearest clean value at
or below the raw `sqrt(Capacity)`, rather than requiring an exact algebraic relationship between them.

**Resolution — decoupled derivation, not a shared value:**

- `intro.capacity` (the Data Stream tile's own binary balance/capacity figure) keeps doubling
  plainly via `INTRO_CAPACITY_DOUBLING_STEP` — `INTRO_STARTING_CAPACITY * 2^N` for N purchases — but
  `upgradePoolCapacity` no longer clamps it to any pool's `endBits` ceiling. Previously this clamp
  was necessary because the SAME value was directly read by the pool card; now that the pool derives
  its own separate figure, clamping the raw value would just make it non-power-of-two (breaking its
  own binary cleanliness) for no remaining reason. It can and does grow past a pool's SI ceiling once
  reached; further purchases keep doubling it in the background until a higher pool unlocks.
- Each Storage pool derives its OWN Capacity (`getStoragePoolCapacity`) by walking the restored
  `getNextSiDoubledValue` helper (identical logic to attempt 1, unchanged: doubles normally except
  once per decade of ten doublings, where a value's mantissa — after stripping factors of 1000 —
  hits exactly 64, going to 125 instead of 128) the SAME number of times N as `intro.capacity` has
  doubled, via a private `getSiCleanCapacityBits` helper that walks both sequences in lockstep until
  the plain-binary side reaches `intro.capacity`, then returns the SI-clean side's value at that
  step. This is the key structural difference from attempt 1: N is *read off* `intro.capacity`'s
  doubling count, but the pool's own Capacity is a *separate computed value*, not `intro.capacity`
  itself — the two numbers only ever share a step count, never a representation. The pool boundaries
  (`getStoragePoolMemoryBounds`) sit at whole multiples of 10 doublings from the 1-Byte floor, which
  is exactly where `getNextSiDoubledValue`'s own sequence lands on a clean `1000^d` figure by
  construction — so a pool's derived Capacity reaches its ceiling at precisely the N a raw binary
  doubling would have crossed an equivalent milestone at too; there's no drift between the two
  sequences specifically at a pool boundary, even though they diverge everywhere in between.
- Each pool's Bandwidth (`getStoragePoolBandwidth`) keeps its existing `sqrt(Capacity in Bytes)` cap
  formula, but the result is now additionally snapped DOWN to the nearest `getNextSiDoubledValue`
  term at or below it (a private `getSiCleanValueAtMostBytes` helper: walks the sequence from 1 Byte
  until a term exceeds the target, returning the previous one) — implementing the "both independently
  snap to clean values" choice: Capacity and Bandwidth are each independently clean, without an exact
  algebraic relationship holding between them (a 16 KB-capacity pool caps Bandwidth at a clean
  125 B/s, not the raw ~126.49 B/s `sqrt(16,000)` would give).
- `isMemoryCapacityAtCap` — the predicate that actually gates `isMemoryCapacityUpgradeAvailable` and
  therefore `upgradePoolCapacity` — now compares the highest unlocked pool's own derived Capacity
  (`getStoragePoolCapacity`) against that pool's `endBits`, not raw `intro.capacity`. This had to
  change in lockstep with removing the raw clamp above: since `intro.capacity` no longer self-limits
  at a pool's ceiling, something else has to stop the player from buying past it, and that something
  is now the pool's own derived value reaching its ceiling — exactly mirroring what the player
  actually sees on the pool card, rather than an internal number they never see directly.
  `normalizePoolMemoryCapacity` (save-load) lost its matching clamp-to-ceiling step for the same
  reason — it now only sanitizes a missing/negative value to a floor of 0.

**Why this isn't the same mistake a third time.** The load-bearing difference from both earlier
attempts is that `intro.capacity` and `getStoragePoolCapacity(state, poolIndex)` are now two
genuinely different numbers with two genuinely different growth sequences (plain ×2 vs. the 64→125
switchover), connected only by sharing a purchase-count N — never by literally being the same stored
value read through different formatters. Attempt 1's bug was using one number for both jobs and
optimizing its growth for the SI side; attempt 2's bug was using one number for both jobs and
optimizing its growth for the binary side. This entry stops trying to find a single growth sequence
that's clean in both unit systems at once — because none exists — and instead computes two.

**Verification.** Seeded `intro.capacity` at exactly 16,384 Bytes (14 doublings from 1 Byte — the
same magnitude as the original bug report) and screenshotted both the Data Stream tile and the KB
Pool card side by side: the Data Stream tile reads "8.077 KiB / 16 KiB" (clean binary — `16,384
Bytes = 16 KiB` exactly), while the KB Pool card reads "100 B / 16 KB" and "125 B/sec" (clean SI —
matching the player's exact expected figures from the bug report). `yarn test` is green at 1619
(+8 over the prior entry's 1611): a restored `getNextSiDoubledValue` describe block (5 tests, one
fewer than attempt 1's original 6 — the "operates on bits vs Bytes" distinction collapsed into the
"converts internally" test since there's no longer a second caller needing that boundary spelled out
separately), plus 3 new tests directly exercising the decoupled derivation — a pool's Capacity
differing from raw `intro.capacity`'s own binary value, Bandwidth's snap-down behavior, and
`upgradePoolCapacity` no longer clamping the raw value while `getStoragePoolCapacity` still clamps
its own derived one at the ceiling. `CLAUDE.md`/`AGENTS.md`/`docs/ECONOMY_REFERENCE.md` were rewritten
throughout to describe the decoupled mechanic, stating the standing rule directly: the SI-clean
switchover sequence is for storage-pool-scoped values only, never for a value that also has a binary
display.

### Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity)

A direct follow-up correction on the same feature (see the previous entry). After the decoupled
Capacity/Bandwidth mechanic shipped, the player clarified the Bandwidth half specifically was still
wrong: "In pool only. Others are now correct[.] Bandwidth as square root was only a guideline for
understanding the lower and upper bounds. The actual bandwidth upgrade simply follows the data
stream speed upgrades but in SI instead of binary. So it matches till 64 bytes/sec and then starts
diverging as 125 instead of 128 and continues this pattern for every unit[.] Example, if data
stream speed is 256 MiB/s then the largest pool bandwidth will be 250 MB/s[.] Use rounding to
nearest value to prevent glitches due to javascript floating errors as seen in your screenshots."

**What was wrong.** The previous entry's `getStoragePoolBandwidth` computed `sqrt(Capacity in
Bytes)`, then snapped that sqrt result DOWN to the nearest SI-clean switchover term via a
search-based helper (`getSiCleanValueAtMostBytes`, walking the sequence from 1 Byte until a term
exceeded the target). Two things were wrong with this: (1) `sqrt(Capacity)` was never the intended
FORMULA for Bandwidth's value — it was only ever meant as a rough description of the bounds
Bandwidth should stay within (a small pool's throughput shouldn't run far ahead of its own tiny
Memory window) — the actual number should track the Data Stream's own raw Speed/production-rate
doublings directly, converted through the SAME SI-clean transform Capacity uses, not a derived
sqrt-of-a-different-quantity; (2) the search-based snap-down, while mathematically sound, walked a
sequence of floating-point multiplications and comparisons that could misclassify a value sitting
very close to (but not exactly on) a doubling boundary — the kind of drift that accumulates from
chained multiplications across many purchases, Compute Boosts, and prestige bonuses — landing one
step off from where the value "should" have been.

**Worked example that pinned the fix.** The player's own example is exact and directly verifiable:
a raw Data Stream rate of 256 (any Bytes-scale unit — the relationship is scale-invariant) is 8
doublings from 1 Byte (`2^8 = 256`). Walking the SI-clean switchover sequence 8 steps from 1 Byte —
1, 2, 4, 8, 16, 32, 64, 125, **250** — lands exactly on 250, matching "256 MiB/s → 250 MB/s"
precisely. This confirmed Bandwidth should be `getSiCleanEquivalentBits` applied DIRECTLY to the
raw production rate, the same way Capacity already applies it to `intro.capacity`'s doubling count
— not a value derived from Capacity via `sqrt` at all.

**Resolution.**

- The two search-based helpers (`getSiCleanCapacityBits`, used for Capacity; `getSiCleanValueAtMostBytes`,
  used for Bandwidth's snap-down) are replaced with a single, shared, rounding-based helper:
  `getSiCleanEquivalentBits(rawBits)` finds `N = round(log2(rawBits / BITS_PER_BYTE))` — how many
  doublings-from-1-Byte the raw value sits at — then walks `getNextSiDoubledValue` N times from
  1 Byte. A ROUNDED log2 rather than a discrete doubling-comparison search directly addresses "use
  rounding to nearest value to prevent glitches": a raw value carrying tiny floating-point noise
  (from many chained multiplications/divisions) still rounds to the doubling step it was
  mathematically meant to be, rather than a comparison-based search misclassifying it one step off
  right at a boundary. Values below 1 Byte pass through unchanged (the "SI-clean vs. binary"
  distinction doesn't apply meaningfully at bit-scale, and the game's own bit-scale displays never
  make that distinction either).
- `getStoragePoolCapacity` now calls `getSiCleanEquivalentBits(intro.capacity)` directly — since
  `intro.capacity` is always an exact power of two from `INTRO_STARTING_CAPACITY` (never clamped to
  a non-power-of-two boundary — see the previous entry), `round(log2(...))` lands on the exact same
  integer step count a discrete search would have found, so this is a behavior-preserving
  refactor for Capacity specifically.
- `getStoragePoolBandwidth` now computes `Math.min(rawRateBytes, sqrtCapBytes)` in RAW (unrounded)
  terms first — `sqrt(Capacity)` still acts as the real throughput ceiling once a pool's own fixed,
  maxed-out Capacity can't keep up with an ever-growing rate, satisfying "only a guideline for
  understanding the lower and upper bounds" — then applies `getSiCleanEquivalentBits` ONCE to
  whichever of the two bounded the result. Since the transform is monotonic (a strictly increasing
  sequence), transforming the min of two raw values gives the identical result as transforming each
  separately and taking the min of the transformed values — so this doesn't change which case
  (rate-bound vs. capacity-bound) is chosen, only how the final displayed number is derived from it.

**A second, real issue surfaced by adversarial review of the previous commit before this one
landed.** The reviewer flagged that `getCoreEarnTimeSeconds` (Compute merge/Boost preset duration
pacing — "seconds to fill Memory once at the current rate") reads raw `intro.capacity` directly,
and since that value is no longer clamped to a pool ceiling (per the previous entry), it now
permanently runs ~2.4% larger per full decade of doublings past a pool boundary within the same
Era than it would have under the old clamped regime — silently lengthening every Compute merge
timer and Boost preset duration derived from it. Two directions were possible: reroute the formula
through a pool's own bounded `getStoragePoolCapacity` (eliminating the drift, but introducing a
NEW, unrequested economy-balance change beyond the display-only scope this whole feature was about
— and picking WHICH pool to reference is itself ambiguous before any pool is unlocked), or keep
reading the raw value (preserving the property that Core-earn-time describes the REAL Buffer's own
refill time — the same value `tapIntroBit`/`tickIntroProduction` cap `bits` at — rather than a
pool-card display figure) and acknowledge the resulting pacing drift explicitly. The second was
chosen: it avoids scope-creeping an unrequested balance change into a pure display fix, and the
effect is small (a few percent, only within a single Era, reset by Era ascension) rather than
something that needed a design decision from the player. `getCoreEarnTimeSeconds`'s own doc comment
and `CLAUDE.md`/`docs/ECONOMY_REFERENCE.md`/`CHANGELOG.md` now state this explicitly, and a
regression test pins the raw-capacity-reading behavior at a pool-boundary-crossing capacity value
so it can't silently drift further without a test failure flagging it.

**A concurrent-agent hazard recurred, twice, mid-session.** The adversarial review agent spawned
against the prior commit ran with Bash access in the same shared working directory this session
was actively editing in. Partway through its own analysis it encountered this session's
in-progress, uncommitted Bandwidth-formula edits, mistook them for unrelated stray contamination,
and ran `git checkout -- .` to get a "clean" view for its own diff — discarding those uncommitted
edits from the working tree. This happened twice before the review agent finished (each time, per
its own final report, it re-verified against `git log` showing the last real commit before
continuing its own review — so the review's own findings were never contaminated by the discarded
content, only this session's local progress was lost). The mitigation adopted after the first two
such incidents earlier in this session — commit soon after editing — wasn't sufficient on its own
here, since a ~110-second full `yarn test` run sat between the edit and the commit, giving the
concurrent agent's own tool calls a wide window to interleave. The edits were re-applied and,
starting with this round, each file's edit was followed immediately by a fast, narrowly-scoped test
run (or none at all when confidence was already high) and an immediate commit + push, rather than
batching a full `yarn test` run before committing.

### Precision loss at large magnitudes in the SI-clean transform — fixed with a closed-form computation

A third round of adversarial review (against the Bandwidth formula fix above) found a genuine
correctness bug in `getSiCleanEquivalentBits`'s implementation, independent of the formula
questions the two earlier rounds settled. The reviewer computed it directly rather than merely
inspecting the code: walking `getNextSiDoubledValue` iteratively past roughly step 86 (a magnitude
around 6.4e25, well beyond `Number.MAX_SAFE_INTEGER` ≈ 9.007e15) silently picks the wrong decade
multiplier — `getNextSiDoubledValue`'s own once-per-decade deviation detection
(`mantissa % 1000 === 0`, checked after repeatedly dividing by 1000) relies on floating-point
values being exactly divisible by 1000 at that magnitude, which IEEE-754 doubles can no longer
represent reliably once the number's own precision (~15–17 significant decimal digits) is spent on
digits above the ones-place. Concretely: at 90 doublings (pool 8's own Capacity boundary, reachable
within a single Era — `intro.capacity` is no longer clamped to a pool ceiling, per the first entry
in this chain, so it can and does keep growing toward pool 10's own N≈110 boundary), the buggy
iterative walk landed on 8.192e27 bits instead of the correct 8e27 — a full extra undetected binary
decade (ratio 1.024), directly falsifying the "no drift between the two sequences at a pool
boundary" claim this whole mechanic's docs asserted in three places (`CLAUDE.md`,
`docs/ECONOMY_REFERENCE.md`, and the previous entry in this file).

Notably, this specific bug PRE-DATES this round's `getSiCleanEquivalentBits` refactor — `getNextSiDoubledValue`'s
own body is unchanged since it was first written for the very first (`getNextSiDoubledValue`,
PR #539) attempt at this feature, and both the old search-based helpers (`getSiCleanCapacityBits`/
`getSiCleanValueAtMostBytes`, walking the same function) and this round's rounding-based
`getSiCleanEquivalentBits` inherited it identically by iterating the same buggy primitive. It went
undetected through every earlier round because none of the worked examples used to verify each
attempt (2000 Bytes, 16,000 Bytes, 256→250, etc.) came anywhere near the ~1e17+ magnitude where the
bug first manifests — it took an adversarial reviewer independently computing the function at scale
to surface it, not inspection or the existing test suite (whose largest capacity value before this
fix was `8 * 2 ** 21` ≈ 1.6e7, nowhere close).

**Resolution: replace the iterative walk with an exact closed-form computation.** The switchover
sequence has a clean mathematical structure that makes iteration unnecessary in the first place:
every block of 10 doublings compounds to EXACTLY ×1000 (nine plain doublings and one ×(125/64)
deviation: `2^9 × 125/64 = 512 × 1.953125 = 1000`), and the deviation always lands at the same
local position (7) within every decade, because the decade-relative mantissa always restarts at 1
after each `/1000` strip. This means the sequence factors exactly as
`SI_CLEAN_LOCAL_SEQUENCE[N % 10] * 1000 ** floor(N / 10)`, where
`SI_CLEAN_LOCAL_SEQUENCE = [1, 2, 4, 8, 16, 32, 64, 125, 250, 500]` — a single array lookup and one
`Math.pow` call, computed directly from N rather than accumulated step by step. This has no
detection logic to go wrong at any magnitude: there's nothing to misclassify, since the decade and
local-position are derived directly from `N`'s own integer arithmetic (`% 10` / `Math.floor(N/10)`,
both exact for any N representable at all), not from inspecting a large intermediate VALUE's own
digits. The remaining imprecision at extreme magnitudes (`1000 ** floor(N/10)` itself loses exact
integer representation past the same ~15–17 significant-digit limit) is the same ordinary
floating-point fuzziness every other huge number in this codebase already carries (`GOOGOL = 1e100`
and its arithmetic, for instance) — an accepted, pre-existing category, not a new LOGIC bug that
picks an entirely wrong decade multiplier.

As a side effect, this also eliminated a second, lower-severity finding from the same review round:
the iterative `for` loop would hang forever on a `steps` value of `Infinity` (reachable in
principle if `rawBits` were ever `Infinity` — the reviewer traced the two live Dev Mode injection
paths and found both already self-heal before reaching this function, so this was "should-fix
defensive insurance" rather than a proven live bug). The closed-form version has no loop to hang in
at all; an explicit `Number.isFinite` guard at the top now returns `0` for non-finite input rather
than relying on the loop's absence to save it.

`getNextSiDoubledValue` itself is left unchanged and still exported/tested — it remains a correct,
simple, directly-verifiable "next term" reference definition of the sequence for documentation and
small-scale direct use (nothing else in the runtime path calls it iteratively any more), and
rewriting its own detection logic to be large-N-safe would have meant re-deriving and re-verifying
a well-established, already-reviewed function for no remaining caller that needs that robustness.

**Verification.** Independently re-derived and ran the closed form against every previously
hand-verified case (256→250 at N=8, 16,000 Bytes at N=14, the pool-1 ceiling at N=20) plus the
reviewer's own three flagged large-N cases (N=90/100/110, matching pool 8/9/10's own SI-round
ceilings exactly: 1e27/1e30/1e33 Bytes) and the edge cases (`NaN`, `Infinity`, `0`, a value below
1 Byte) — all correct, none hang. A new regression test constructs a save with pools 1–8 fully
unlocked (all 21 of their disk sizes fully built) and pins `getStoragePoolCapacity(state, 8)` at
exactly pool 8's own SI-clean ceiling for a raw `intro.capacity` of `8 * 2 ** 90` — the same
magnitude the review's finding was computed at — so a regression back toward the iterative approach
would fail this test rather than silently reappearing. `yarn test`: 1622/1622 green (+1 over the
prior entry's 1621).

### Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title

A follow-up to "'0.xyz \<unit\>' fractions eliminated" above, prompted directly by a player looking
at the rendered result: `formatMemoryBalance` (the `ByteFoundryPage`-local helper backing the Data
Stream tile) shares ONE unit between the balance and capacity, sized off capacity — so a balance
that's a small fraction of a much larger capacity (right after a Capacity ×2 purchase, or early in
a fresh cycle) fell all the way back to a raw bit count, e.g. `"246,016 bits / 1 MiB"`. That fallback
was itself the deliberate fix from the earlier entry — chosen specifically because a same-unit
fraction (`"0.235 MiB / 1 MiB"`) was judged to read worse than a divergent-but-legible pair. In
practice, though, a large raw bit count sitting directly beside a named unit ("bits" next to "MiB")
reads as two different KINDS of number, not just two different magnitudes, and was reported as
confusing on exactly that ground.

**The fix keeps the "no 0.xyz" rule intact but narrows what counts as "no finer option."** Instead
of falling straight to raw bits the instant the shared (capacity-sized) unit would floor the
balance below 1, `formatMemoryBalance` first tries a unit sized off the BALANCE's own magnitude
(the same `getMemoryUnit(bits, byteCreated)` self-sizing `formatBitsInNearestUnit` already uses
elsewhere) — a finer-or-equal unit relative to capacity's own, since the balance is smaller or
equal. In the overwhelming majority of cases this really is strictly finer (e.g. `"246,016 bits /
1 MiB"` becomes `"30.031 KiB / 1 MiB"`: both sides read as real named magnitudes, and the balance
never floors to a same-unit fraction since it's now sized specifically so it won't) — but at the
very floor of the ladder the two CAN coincide: right after `combineIntroByte`, `intro.capacity` is
still `INTRO_STARTING_CAPACITY` (8 bits/1 Byte), so `getMemoryUnit` for both capacity and a small
balance bottoms out at the same `{symbol: 'B', divisor: 8}` — no functional bug (the existing
`scaled < 1` check inside `formatMemoryAmount` still catches this and falls back to raw bits
exactly as before), just a reminder that "strictly finer" isn't literally guaranteed by the unit
ladder's own floor. Only when the self-sized unit ALSO floors below 1 — meaning the balance is
genuinely sub-Byte, the one case with no named unit smaller than a Byte to fall back to — does it
drop to the raw `"N bit(s)"` string, unchanged from before (e.g. `"4 bits / 1 MiB"`). This is a
strict narrowing of when the fallback fires, not a reversal of the earlier fix: the balance still
never renders a same-unit "0.xyz" fraction, it just reaches for a smaller *named* unit before
giving up on one entirely.

**Layout, corrected mid-session.** The player's report also asked to move "the bandwidth" onto the
same line as its card's title, alongside a screenshot of the Data Stream tile. The first
implementation read this as the Data Stream tile's own production-rate line and moved it beside the
"Data Stream" label (a new `TitleRow` flex wrapper) — plausible from the screenshot alone, since
that's exactly what the screenshot showed, but wrong: the player clarified they meant each Storage
**Pool card's** own Bandwidth line (`PoolCard`/`PoolHeaderRow`/`PoolTitle` — the "`<symbol>` Pool"
cards below the Data Stream tile), not the Data Stream tile's production rate. The Data Stream
tile's layout was reverted to its original three-line structure (label, balance, rate) — only the
unit-formatting fix above stuck there — and instead each Pool card's Bandwidth (`StatusText`,
previously the second line inside its `FillableStatCard` buffer block) now renders beside its
"`<symbol>` Pool" title in the existing `PoolHeaderRow` flex container, e.g. "KB Pool +20 B/sec" on
one line, with the `FillableStatCard` below it showing only the buffer/capacity fraction. Worth
noting for future report-driven UI changes: a screenshot pins the FORMATTING issue precisely (it's
the rendered pixels), but a layout instruction phrased about "the bandwidth"/"the title" is
ambiguous across multiple similarly-styled cards on the same page — confirm which card before
implementing, or be ready to redo it once corrected, as happened here.

**Verification.** Two new `App.test.jsx` cases pin the unit-formatting fix directly: a balance of
246,016 bits against a 1 MiB capacity now renders `"30.031 KiB / 1 MiB"` (previously `"246,016
bits / 1 MiB"`), and a genuinely sub-Byte balance of 4 bits against the same capacity still renders
`"4 bits / 1 MiB"` — confirming the bottom-rung fallback from the earlier entry survives unchanged.
A third case pins the Pool card's Bandwidth text sharing a DOM parent with its `<h3>` title,
guarding the corrected layout change. Verified visually against `yarn dev` via real
Playwright/Chromium screenshots — both for the initial (wrong-card) attempt and the corrected one,
at the reported scenario's own values. `yarn test`: 1625/1625 green (+3 over the prior entry's
1622). An adversarial review round against the first (Data-Stream-targeted) commit also caught
`docs/ECONOMY_REFERENCE.md` and `docs/MAINPAGE_REFERENCE.md` describing the pre-fix two-branch
`formatMemoryBalance` fallback and stale DOM-order prose; both were updated in the same PR to match
the corrected three-branch behavior and the final Pool-card layout.

### Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed

Three related requests from the same conversation, landed in the same PR as the two entries above:
Storage Pool cards should require the Data Stream's raw Capacity to reach a power-of-1024 threshold
(1 KiB for pool 1, 1 MiB for pool 2, and so on) before they appear, in addition to their existing
disk-build condition; a pool's read cache should start filling from Memory the instant that pool
unlocks rather than waiting for a disk of that size to actually be built; and the manual
transfer-block row on the Byte Foundry screen — redundant now that both changes make the Disk path
to the first tier01 units fast and automatic — should be removed.

**The capacity-threshold request: first attempt folded it into the wrong primitive, with a much
wider blast radius than intended.** The first implementation added the capacity check directly
inside `isStoragePoolUnlocked` (removing its old unconditional `poolIndex === 1` return and adding
`if (capacity < threshold) return false` up front). This looked like the obviously correct insertion
point — `isStoragePoolUnlocked`/`getUnlockedStoragePoolCount` are THE shared primitive answering "is
pool N unlocked" everywhere in the codebase — but that breadth turned out to be exactly the problem:
`getMaxActiveDiskLadderStep` (`getUnlockedStoragePoolCount(state) * DATA_LAKE_SUB_SIZES.length`)
drives the entire disk-build ladder's own progression (which size `provisionDisk` currently offers),
and `getStoragePoolBandwidth`/`getStoragePoolCapacity`/Data Lake idle-disk-liquidation
eligibility/Booster transfer pacing all key off the same function too. Since pool 1 had always been
unconditionally unlocked before this change, dozens of existing tests across `engine.test.js` and
`storage.test.js` — none of them about pool visibility at all, just ordinary disk-build/cache/Data
Lake mechanics — had never needed to seed a Data Stream Capacity high enough to satisfy a threshold
that didn't previously exist, and broke: `provisionDisk` timings went to `Infinity` (dividing by a
now-zero locked-pool bandwidth), `getDiskSize`/`isDiskLadderExhaustedForActivePools`/
`getDiskSizesToShow` all misbehaved since `getMaxActiveDiskLadderStep` collapsed toward 0, and one
existing test (a pool buffer capacity deliberately seeded below one cache block, to test a "dump the
remainder" edge case) became mathematically unreachable, since a pool's own derived buffer capacity
at exactly its new unlock threshold is provably always at least one whole cache block. 28 test
failures on the first full run, most of them not even visible in the initial tail of the output
(only a fraction of them fit in the terminal scrollback actually reviewed at first), and after fixing
what was visible, re-running surfaced 20 MORE previously-unseen failures in core disk-ladder tests —
a strong signal the approach itself, not just the fixes, needed reconsidering.

**Resolution: keep the capacity threshold entirely separate from `isStoragePoolUnlocked`.**
`isStoragePoolUnlocked`/`getUnlockedStoragePoolCount` were reverted to their exact original,
disk-build-only form (pool 1 always true; pool N+1 requires pool N's three sizes fully built) — this
alone fixed every one of the 28+20 test failures with no further changes needed to any of them. A new,
separate function, `getPoolCapacityUnlockThresholdBits(poolIndex) = BITS_PER_BYTE *
(MEMORY_BINARY_UNIT_STEP ** poolIndex)`, computes the 1024^N-Bytes threshold, and a new
`getVisibleStoragePoolCount(state)` combines it with the unchanged `getUnlockedStoragePoolCount`
(the smaller of the two counts) — this is the ONLY function `ByteFoundryPage` now calls to decide how
many pool cards to render. Every other consumer of pool-unlock status (the disk ladder, read cache,
Data Lake idle liquidation, Booster transfer pacing) is completely unaffected by the new capacity
rule, exactly as before this change. The general lesson: a widely-shared "is X unlocked" primitive is
not automatically the right insertion point for a NEW, UI-scoped gate just because it's the most
obvious place to add a condition — check every consumer first, not just the one you're trying to
change.

**The cache-instant-fill request was more straightforward.** `tickDiskAutoFill`'s `sizes` list
(which sizes it tries to top up from Memory) was keyed off `Object.keys(state.intro.disksBuiltTotal)`
— a size only became cache-eligible once at least one disk of that size had ever been built (or
attempted). It's now built from `getUnlockedStoragePoolCount(state)` directly: every currently
unlocked pool's own smallest (read-cache-eligible) size, via the existing `getDataLakeUnitBits`
helper, regardless of whether `disksBuiltTotal` has an entry for it yet. Passes 2/3 (which actually
flush a full cache into an empty disk) already guarded on `hasEmptyContainer =
builtTotal[size] > disks[size]`, so this required no further change — a size with zero disks built
simply accumulates cache and waits, ready to flush the instant the player's first disk of that size
finishes provisioning, rather than starting the fill from scratch only after.

**Removing the manual transfer-block UI was the most mechanically simple of the three, but touched
the most test surface** — roughly a dozen `App.test.jsx` tests existed solely to exercise the
removed row (clicking blocks, checking block count/labels/visibility-toggling), and were deleted
outright rather than patched, since the UI they tested no longer exists; two more tests had a single
trailing assertion about the row bolted onto an otherwise-still-valid test (Disk redemption, AppNav
navigation) and were trimmed rather than deleted wholesale. `convertIntroBitsToKilobytes` itself —
the actual conversion reducer — was deliberately left untouched in `engine.js`/`useIncrementalGame.js`
and its own dedicated `engine.test.js` describe block: it's still called by `tickIntroAutoInvest`
every tick, just with no UI trigger of its own any more. `isIntroConversionUnlocked`/
`INTRO_CONVERSION_UNLOCK_CAPACITY` were left in place too (still exported, still tested) even though
nothing calls them any more — deleting a still-correct, still-tested pure predicate whose only sin is
having lost its one caller was judged not worth the extra diff for this PR; a future cleanup pass can
remove them if they're still unused then. One genuinely flaky test surfaced as a side effect of the
cache-instant-fill change: a real-timer test tapping the Data Stream tile could have a real tick land
between the click and the assertion, and — now that pool 1's cache-fill runs unconditionally instead
of only after a disk has been built — that tick had a new path to siphon a fractional bit out of
`intro.bits` before the assertion read it. Fixed by switching that one test to fake timers, the same
remedy this codebase already uses for the analogous `tickPoolBufferFill` fragility elsewhere.

**Verification.** All three changes landed together since they were requested together and are
functionally related (all touch what "reaching a pool" means for the player). `yarn test`: 1618/1618
green (down from 1625 — net removal of ~7 now-meaningless UI tests, offset by no new tests needed for
the capacity gate itself beyond the reverted primitive already being covered). `yarn build` succeeds.
Verified visually via `yarn dev` + a real Playwright/Chromium screenshot: a pool with its disk-build
condition satisfied but capacity below its own threshold correctly stays hidden (a "GB Pool" that
would otherwise show, given fully-built KB+MB pools, stays absent below the 1 GiB threshold), and the
manual transfer-block row is confirmed gone from every state that used to show it.

### Provision Disk moved back inside its pool card; pool Capacity switched from SI-clean to a plain decade-of-10 ladder

Two more requests from the same conversation as the three entries above, landed together since both
touch the same pool-card region: the shared Provision Disk button — pulled out of the pool cards
during the earlier restyle above ("Byte Foundry pool cards restyled to match the Data Stream card")
and left standalone in the Data Stream section — should move back inside the pool it actually builds
into; and a pool's own Capacity value should climb in plain, coarse decade-of-10 steps (1 KB → 10 KB
→ 100 KB → 1000 KB for pool 1) rather than the finer SI-clean sequence it shared with Bandwidth,
jumping to the next step the instant the Data Stream's raw Capacity crosses that threshold.

**Provision Disk relocation.** The button (`provisionDiskButton`, a JSX value now built once ahead of
the component's `return`) renders inside the `PoolCard` whose `poolIndex` matches
`diskPoolIndex = getPoolIndexForDiskSize(getDiskSize(state))` — the pool the ladder's CURRENT offer
actually belongs to — right after that pool's summary/title row, so it sits with the disk arrays it
funds instead of a separate section elsewhere on the page. This reintroduced a real edge case:
pool-card VISIBILITY is capacity-threshold-gated (`getVisibleStoragePoolCount`, from the entry above)
while the disk ladder's own progression is disk-build-only (`getUnlockedStoragePoolCount`), so the
ladder can advance to a pool whose card isn't visible yet — the button would otherwise vanish
entirely until that pool's card caught up. A fallback copy of the same button renders just below the
Data Stream card, gated on `diskPoolIndex > unlockedPoolCount` (the visible count), so it stays
reachable in that gap rather than disappearing.

**Pool Capacity's decade-of-10 ladder.** `getStoragePoolCapacity` previously derived a pool's own
Capacity from the shared Data Stream doubling count via the same SI-clean switchover sequence
Bandwidth uses (`getSiCleanEquivalentBits` — 1, 2, 4, 8, …, 64, 125, 250, 500, 1000 × 1000^decade).
The request asked for something deliberately coarser: flat within a decade, jumping straight from one
power of 10 to the next the moment the raw Capacity crosses it — no intermediate SI-clean steps in
between. A new closed-form helper, `getDecadePowerEquivalentBits`, reuses the exact same robust
`N = round(log2(rawBits / BITS_PER_BYTE))` doubling-step calculation `getSiCleanEquivalentBits`
already computes (for the same reason: a discrete iterative search would be vulnerable to the same
large-N floating-point misclassification the precision-loss entry above fixed), then takes
`10 ** Math.floor(N * Math.log10(2))` Bytes. Flooring rather than rounding is safe here specifically
BECAUSE `log10(2)` is irrational — unlike the SI-clean sequence, which was deliberately constructed
so certain doubling counts land EXACTLY on a decade boundary (needing `round` to avoid misclassifying
which side of that boundary floating-point error put it on), `N * log10(2)` is never exactly an
integer for `N > 0`, so there's no equivalent boundary-straddling case for `floor` to get wrong.

Only `getStoragePoolCapacity` (and, through it, `getPoolBufferCapacity`, a direct alias) switched to
the new helper. `getStoragePoolBandwidth` deliberately stays on `getSiCleanEquivalentBits` — the
request was specifically about the Capacity FIGURE a pool card displays and gates its next Disk
purchase on, not the finer-grained throughput number; conflating the two would have made Bandwidth
jump in the same coarse decade steps too, which nothing asked for and would have made a pool's
throughput look artificially chunky. This is a deliberate divergence between two values that used to
share one formula, mirrored in code by two now-distinct closed-form helpers rather than one
parameterized by a "clean or decade" flag — the two sequences have different mathematical shapes
(one factors into `1000 ** floor(N/10)` times a 10-term local lookup, the other into a single
`10 ** exponent` with no lookup at all), so a shared parameterization would have bought no real code
reuse, just an extra branch neither caller needs.

**A property the request didn't explicitly ask for, but that falls out of the formula and is worth
noting:** each decade step exactly funds the disk-build cost one step *behind* it. Crossing into
"10 KB" Capacity (10^4 Bytes = 80,000 bits) exactly equals `getDiskCost` for a 1 KB disk
(`DISK_BUILD_COST_MULTIPLIER × 8000 bits`); crossing into "100 KB" exactly funds the 10 KB disk's own
cost, and so on. Under the old SI-clean sequence this alignment was only approximate (the SI-clean
steps and the disk-cost ladder don't share a common mathematical structure); under the decade ladder
it's exact, since `getPoolBufferCapacity` is a direct alias of `getStoragePoolCapacity` and disk costs
are themselves `DISK_BUILD_COST_MULTIPLIER (10) × size`, i.e. also decade-scaled. This means a pool's
buffer is now always exactly far enough ahead to afford its own very next disk the instant the
threshold is crossed — never a moment early, never left short.

**Verification.** 6 existing `engine.test.js`/`App.test.jsx` assertions that pinned specific
SI-clean-derived Capacity/buffer values were recalculated by hand and updated to their new
decade-power equivalents (e.g. a Capacity previously expected at `4,000,000` bits now lands on the
decade step `800,000`). 2 new tests pin the decade ladder itself directly (Capacity holding flat
across several doubling counts within a decade, then jumping exactly at the crossing point) and the
exact disk-cost-alignment property above. `yarn test`: 1624/1624 green. Verified visually via
`yarn dev` + Playwright/Chromium screenshots: Provision Disk renders inside the active pool's card,
and the fallback copy appears/disappears correctly as the ladder outruns and is caught up by pool
visibility.

### Load-time migration clamps for the decade-power Capacity change; Data Lake capacity ladder moved onto the same shape

Shipped in two parts, both following directly from the entry above (moving pool Capacity from an
SI-clean sequence to a decade-power-of-10 one): an automated review pass caught two migration gaps
the PR that shipped that change had left open, and the maintainer separately asked for the Data
Lake capacity ladder to follow the same decade-power shape pool Capacity now uses.

**The migration gaps.** A `Devin Review` pass against the just-merged PR flagged, correctly, that
lowering `getStoragePoolCapacity`'s output (the decade-power ladder is generally LOWER than the old
SI-clean one at every point except exact decade boundaries, where both coincide) meant an EXISTING
save's `intro.poolBuffers[poolIndex]` — filled and persisted under the old, higher ceiling — could
now sit above the new one. Nothing had ever validated that value against the live Capacity formula
before spending it: `tickPoolBufferFill`'s own `room = Math.max(0, capacity - current)` only ever
stops TOPPING UP an over-capacity buffer (clamped to 0, never negative), it never brings existing
excess back down, and `provisionDisk`'s own affordability check is a plain `buffer >= cost`
comparison with no upper bound at all. The practical effect: a real player's save, untouched by
anything they did, could suddenly hold more spendable Storage currency than the new formula would
ever let a fresh buffer accumulate — not a crash, but a real, unintended one-time advantage handed
out by a formula change the player never asked for. Confirmed by reproducing it directly: even this
session's OWN `App.test.jsx` test suite had a test (`'starting a build spends the cost from its own
pool buffer immediately...'`) that seeded `poolBuffers: { 1: currentBankCost }` alongside
`capacity: currentBankCost` — a pairing that was only ever valid before this exact PR's own
decade-power change, since seeding the raw Data Stream capacity equal to the disk cost no longer
derives a pool Capacity of that same size (it derives one decade LOWER instead, per the "one decade
behind" cost-alignment property the previous entry documents). That test was silently relying on
the exact latent gap Devin flagged and needed its own seed corrected (`capacity: BITS_PER_BYTE * (2
** 14)`, the smallest doubling count whose derived Capacity actually covers `currentBankCost`) once
the new migration clamp started (correctly) enforcing the invariant even against test fixtures.

The second finding was more severe in kind, if narrower in likely reach: the SAME review, reading
`getStoragePoolCapacity`'s own decade-power derivation, is what prompted asking whether the Data
Lake capacity ladder (a structurally similar "purchasable level → array lookup" mechanic,
`DATA_LAKE_CAPACITY_BY_LEVEL[getDataLakeCapacityLevel(state, tierIndex)]`) had an equivalent gap —
and it did, worse: narrowing that array's length (see below) meant a save with a `capacityLevel`
from the old, longer ladder could index straight past the new array's end and get back `undefined`,
which would then poison every downstream comparison against it (`canDepositDiskToDataLake`,
`isDataLakeCapacityDoublingAvailable`, idle-disk liquidation eligibility) — a real correctness bug,
not just a minor economy quirk, the first time any of those paths ran against an affected save.

**Resolution: two defensive clamps in `normalizePoolMemoryCapacity`**, the same "runs on every
load, sanitizes state a stale formula could leave inconsistent" function that already handled
`intro.capacity` itself. Extending it rather than adding a second, separately-called normalizer kept
every "fix up state a formula change left invalid" concern in one place a future session would
naturally think to check first. Both clamps are pure floor/ceiling operations, no attempt at a
"fair" recomputation of what the player would have had under the new formula the whole time — that
would need reconstructing a plausible history the save doesn't record, for a one-time transitional
edge case that's fundamentally about preventing a crash/over-cap-spend, not about being generous or
stingy to a save from before the change:
- Each currently-unlocked pool's `poolBuffers[poolIndex]` is clamped down to
  `getPoolBufferCapacity(state, poolIndex)` (the SAME value `getStoragePoolCapacity` now derives)
  whenever it's found above it.
- Each Data Lake's `capacityLevel` is clamped down to `DATA_LAKE_CAPACITY_MAX_LEVEL` whenever it's
  found above it — this is the one that actually matters for correctness (prevents the `undefined`
  read), not just fairness; a level clamped this way can, for some old levels, land HIGHER than
  before (e.g. old level 5 → new level 3, whose capacity 1,000 exceeds old level 5's capacity 32) —
  judged an acceptable, harmless side effect of a hard array-bounds fix in a solo hobby project with
  no real economic stakes, not worth a more elaborate "closest equivalent old value" remap.

**The Data Lake capacity ladder request.** Separately, the maintainer asked for the Data Lake
capacity ladder itself to follow the exact shape pool Capacity now uses: 1 KB when unlocked, then
10 KB (cost 1 KB), 100 KB (cost 10 KB), 1,000 KB (cost 100 KB) — a plain decade-power-of-10 step per
level, each level's own upgrade cost exactly the level below it. This mapped directly onto the
existing mechanic with almost no logic change at all: `getDataLakeCapacity` was already a bare array
lookup (`DATA_LAKE_CAPACITY_BY_LEVEL[level]`), `doubleDataLakeCapacity` was already funded by
draining the lake itself back to zero on advance (never Bits) — the "cost = current capacity" shape
the request describes was already exactly how it worked, just with a different (SI-clean,
11-level) VALUE sequence behind it. The entire change was two constants in `layers.js`:
`DATA_LAKE_CAPACITY_BY_LEVEL` from `[1, 2, 4, 8, 16, 32, 64, 125, 250, 500, 1000]` (11 levels) to
`[1, 10, 100, 1000]` (4 levels), and `DATA_LAKE_CAPACITY_MAX_LEVEL` from `10` to `3` to match. The
absolute ceiling is unchanged (both sequences top out at exactly 1,000 units) — only the
intermediate levels got coarser, mirroring the same "fewer, bigger jumps" shape pool Capacity's own
decade-power change introduced. This is also why the migration clamp above (added moments earlier
in the same session, for the pool Capacity change) turned out to matter again here: narrowing an
array from 11 entries to 4 is exactly the kind of change that needs the same defensive clamp, and
having just built it for pool buffers made adding the Data Lake one immediate rather than a second
investigation.

**UI copy fallout.** The capacity-ladder button (`components/DataLakePanel`) had hardcoded "×2"
language throughout — visible label `⚡ ×2`, `aria-label="double the … Data Lake's capacity"`, and a
tooltip computing the next value as `capacity * 2` — all accurate only under the OLD sequence's
literal doubling. Under the new ladder every step is a flat ×10, so all three were corrected: label
`⚡ ×10`, `aria-label="increase the … Data Lake's capacity ×10"`, and the tooltip now reads the next
value directly off `DATA_LAKE_CAPACITY_BY_LEVEL[level + 1]` rather than computing it, since a
"current value × N" formula has no single correct N once the ladder isn't a pure geometric doubling
in the first place (it happens to be here, but reading the array directly needs no such assumption
and stays correct if the shape ever changes again). The underlying `doubleDataLakeCapacity`/
`isDataLakeCapacityDoubling*` function and predicate names were deliberately LEFT as "doubling" —
renaming every call site for a value-only change was judged not worth the diff; only user-facing
copy needed to be accurate. A parallel, pre-existing staleness was caught and fixed in the same
pass while touching this exact area: `docs/MAINPAGE_REFERENCE.md` and `InfoPage`'s own Guide prose
both still described the Data Lake capacity mechanic as spending "Data Stream Bits" and referenced a
"1,024-unit hard cap" — both wrong since an EARLIER correction (see the "Data Lake capacity ladder
brought under the same SI-clean sequence" entry above) had already moved this mechanic to
draining-the-lake-itself and a 1,000-unit cap; neither doc had been updated at the time.

**Verification.** `yarn test`: 1628/1628 green (+4 over the prior entry's 1624 — 2 new
`normalizePoolMemoryCapacity` clamp tests for the pool-buffer case, 2 for the Data-Lake-level case).
3 pre-existing tests hardcoding old Data Lake capacity values (`layers.test.js`'s constants tests,
one `engine.test.js` assertion) were updated to the new decade-power sequence; the one App.test.jsx
seed-data inconsistency described above was corrected rather than papered over. `yarn build`
succeeds.

### Storage's own reveal threshold lowered to pool 1's own capacity gate; Data Lake panel redesigned; Dev Mode's raw state-updater gap closed

Three more requests from the same conversation as the entries above, landed together in the same
PR (#546): the whole Storage section should reveal the instant the Data Stream's raw Capacity
crosses 1 KiB, at which point pool 1 should already show a clean "1 KB" Capacity and its read cache
should already be filling; the Data Lake panel should be redesigned around fewer labels and bigger
numbers, matching the rest of the page's visual language; and each lake's visible name should
include its own size unit ("KB Lake," not just "KB").

**Storage's reveal threshold.** `isStorageUnlocked`'s own `INTRO_DISK_UNLOCK_CAPACITY` had sat at
80,000 bits ("9.765 KiB") since Storage was introduced — a value with no particular mathematical
significance, just an early "later, more advanced-game reveal" choice. Meanwhile pool 1's own CARD
visibility gate (`getPoolCapacityUnlockThresholdBits(1)`, from the "Pool cards gated on a capacity
threshold" entry above) sits at exactly 1 KiB (8,192 bits) — a comment on that function even noted
"pool 1's own 1 KiB threshold is already satisfied by the time Storage reveals at all," since
80,000 bits is strictly past it. The practical effect: by the time a player ever SAW Storage at all,
pool 1's own decade-power Capacity (see the "decade-of-10 ladder" entries above) had already advanced
past its own "1 KB" starting figure to "10 KB" — the player's very first look at Storage skipped the
smallest, cleanest state of the mechanic entirely.

**Resolution: set `INTRO_DISK_UNLOCK_CAPACITY` equal to pool 1's own threshold.**
`INTRO_DISK_UNLOCK_CAPACITY = BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP` (8,192 bits) replaces the
bare `80000` literal — expressing it via the same two constants `getPoolCapacityUnlockThresholdBits`
itself multiplies, rather than a second, independently-chosen number that happens to differ, closes
the gap between the two gates by construction instead of by coincidence. Verified by hand and by a
new test: at exactly this raw capacity, `getDecadePowerEquivalentBits` computes `steps = round(log2(1024)) = 10`,
`decadeExponent = floor(10 * log10(2)) = 3`, landing on `10^3 = 1,000` Bytes — pool 1's Capacity
reads a clean "1 KB" the very instant Storage (and pool 1's card) becomes visible, not a value
already mid-decade. The read-cache-pre-fill mechanic from the "Pool cards gated..." entry above
needed NO further change: it was already keyed off `getUnlockedStoragePoolCount` (pool 1 always
structurally unlocked) rather than `isStorageUnlocked`, but the actual BITS a pool's cache can draw
on come from `tickPoolBufferFill`, which itself IS gated on `isStorageUnlocked` — so lowering that
gate automatically moves cache-filling's own effective start point earlier in lockstep, with no
separate mechanism to touch. Confirmed by re-reading the full call chain rather than assuming it,
given this was exactly the kind of easy-to-get-wrong indirect dependency the "Pool cards gated..."
entry above had already been burned by once (folding a capacity check into the wrong shared
primitive, 48 broken tests) — this time reading first paid off: no code change was needed, only
verification that none was.

One nuance surfaced while checking a maintainer-stated expectation that a freshly-revealed pool 1
should show "32 bytes/sec" Bandwidth alongside "1 KB" Capacity: `sqrt(1,000 Bytes) ≈ 31.62`, which
`getStoragePoolBandwidth`'s own SI-clean rounding legitimately resolves to exactly 32 — so 32 B/s
IS the real, load-bearing ceiling a pool at "1 KB" Capacity can ever show, not a made-up number. But
it is a CEILING, not a floor: Bandwidth is `min(rawProductionRate, that ceiling)`, so a genuinely
fresh save (no Speed purchases yet) shows whatever the actual, much lower production rate is
instead — confirmed by a real Playwright screenshot of a from-scratch state at exactly 1 KiB
Capacity, which reads "+1 bit/sec," not "32 B/s". No code change was warranted here: the formula is
correct and already produces 32 B/s once raw production actually reaches 256 bits/sec (which an
attentive player prioritizing Speed — always ranked above Capacity in the forced priority order —
plausibly has done well before their 10th Capacity doubling); hardcoding a floor would have meant
lying about the pool's actual current throughput, the opposite of what every other number on this
page is for.

**A second nuance, surfaced by an adversarial review round against this exact commit and worth
stating explicitly rather than leaving implicit: Storage now reveals before its own first disk is
affordable.** Before this change, `INTRO_DISK_UNLOCK_CAPACITY` (80,000 bits) happened to coincide
almost exactly with the point pool 1's own buffer ceiling first reached "10 KB" (80,000 bits) — the
exact cost of the FIRST Disk (`getDiskCost` = `DISK_BUILD_COST_MULTIPLIER` (10) × the base 8,000-bit
size) — so by the time a player ever saw Storage/Provision Disk at all, that first disk was already
buildable. Moving the threshold to pool 1's own 1 KiB gate breaks that coincidence: at reveal, pool
1's buffer ceiling is only "1 KB" (8,000 bits) — one full decade short of the 80,000-bit first-disk
cost — so Provision Disk now renders visible but genuinely unaffordable for a real stretch of play
(4 more Capacity ×2 purchases, `N`=10→14, before the buffer ceiling itself reaches "10 KB").

This is judged an acceptable, even correct, trade-off rather than a bug to route around, for two
reasons. First, it's the direct, unavoidable consequence of exactly what was asked: revealing pool
1 the instant it shows a clean "1 KB" rather than waiting until it's already grown past that to
"10 KB" necessarily means SOME reveal happens before the first disk is affordable — there is no
threshold that satisfies both "reveals at a clean 1 KB" and "reveals only once the 80,000-bit first
disk is already buildable," since those are two different capacity values by construction. Second,
this is not a novel category of UI state for this page: Speed ×2, Capacity ×2, and every other
milestone-style button here already renders visible-but-disabled with a partial `$progress` fill
the instant its OWN section reveals, well before it's affordable — Provision Disk doing the same
(confirmed via the same Playwright screenshot referenced above, which shows exactly this: a
grayed-out "🏦 Provision 1 KB Disk (10 KB)" button, not a hidden one) is consistent with that
existing convention, not a deviation from it. The alternative — keeping Storage's reveal pinned to
"whichever raw capacity makes the first disk immediately affordable" — was the OLD design, and is
exactly the design the "storage reveals mid-decade instead of at a clean magnitude" complaint this
entry opened with was about.

**Data Lake panel redesign.** The panel had shipped, several entries back, as a dense CSS-grid
table — an explicit Lake/Deposited/Capacity/Bought/Next header row, one grid row per lake, small
compact cells — modeled on a spreadsheet rather than on this game's own established visual
language (`FillableStatCard` + `BalanceText`/`StatusText`, the shape the Data Stream card and every
pool's own Memory buffer block already use). Rebuilt as one self-contained block per lake instead:
a header row pairing the lake's title with a `StatusText` line showing how many of its funded
Booster it has produced (e.g. "3× Cores" — this also communicates the lake's fixed Booster
destination, previously a separate "→ Cores" arrow, with no dedicated space for it any more); a
`FillableStatCard` showing `{deposited} / {capacity}` as the one big number, filling toward capacity
the same visual way every other Byte Foundry balance already does; and an actions row pairing the
"⚡ ×10" capacity-upgrade button with a `🎯 <cost>` `StatusText` for the next Booster's own price
(informational — Boosters are started from `ComputePage`, not this panel). Column headers are gone
entirely: every remaining number reads in context (a unit suffix, an icon, a multiplier symbol)
rather than needing a labelled column to explain it — "less labels, more actual numbers," matching
the instruction directly. The underlying styled components (`FillableStatCard`, `StatusText`,
`BalanceText`) are duplicated locally in `DataLakePanel/index.jsx` rather than imported from
`ByteFoundryPage`, which doesn't export them — matching how `ByteFoundryPage` itself already
duplicates near-identical `PoolCard`/`DataStreamCard` wrappers side by side rather than sharing one;
extracting a new shared component was judged more diff than this redesign needed. As a side effect
of rebuilding around one block per lake, the always-true `maxed ? capacity : …` dead-code ternary an
earlier adversarial review flagged as a nit (see the entry above) went away on its own — the
replacement `!maxed && DATA_LAKE_CAPACITY_BY_LEVEL[level + 1]` is only ever evaluated where it's
actually used, inside the same `!maxed` JSX guard.

**Lake naming.** Each lake's visible title changed from the bare unit symbol ("KB") to "`<symbol>`
Lake" ("KB Lake") — the size unit was already load-bearing information (it's literally what
denominates that lake's own currency), but a bare two-letter symbol read as an abbreviation in need
of a caption rather than a name. `getDataLakeTierLabel` itself (returning `DATA_LAKE_TIER_LABELS[n]`,
already the short SI symbol) needed no change — only the JSX composing it with the literal word
"Lake" next to it.

**Dev Mode's own gap.** A same-session adversarial review round (against the PR's first commit,
covering the decade-power-ladder-narrowing migration clamps described in the entry above) surfaced
one more: `useIncrementalGame.js`'s `setDevState` — the direct state-updater escape hatch backing
`DevModePage`'s Variables-tree "Set" editor — writes straight to React state with `setState(prev =>
updater(prev))`, bypassing `storage.js`'s `mergeState`/`normalizePoolMemoryCapacity` pipeline
entirely (that pipeline only runs inside `loadGameState`, which the OTHER two Dev Mode write paths —
`toggleDevMode` and the raw-JSON editor's `applyDevGameStateJson` — both round-trip through, but
`setDevState` does not). Concretely: a player one keystroke away from typing "10" into
`intro.dataLakes.1.capacityLevel`'s Variables-tree input (a value that was valid before the ladder
narrowed to 4 levels, and remains a plausible thing to type from muscle memory or curiosity) would
silently break `getDataLakeCapacity` for that lake — returning `undefined` — for the rest of the Dev
Mode session, with no error and no visible sign anything was wrong until deposits mysteriously
stopped working. **Resolution:** `setDevState` now wraps its result in `normalizePoolMemoryCapacity`
before committing — `setState(prev => normalizePoolMemoryCapacity(updater(prev)))` — applying the
exact same defensive clamp a real save load already gets, without pulling in the rest of
`mergeState`'s own default-filling behavior (inappropriate here: the live state is already a
complete, valid shape; only the same narrow class of formula-drift field needs sanitizing). Severity
was low (dev-build-only, requires a specific manual edit) but the fix was small enough that fixing
it immediately, rather than filing a follow-up, was the better use of the finding.

**Verification.** A new `App.test.jsx` test drives the actual Variables tree UI — expand `intro` →
`dataLakes` → `1`, type "10" into the `capacityLevel` input, click Set — and asserts the persisted
dev save clamps back to `3`, the same way a real save load would; this exercises `setDevState`
specifically (not `applyDevStateJson`, which was already correct) since that's the one path the
review found unguarded. A new `isStorageUnlocked` test pins the simultaneous-reveal property
directly: at `INTRO_DISK_UNLOCK_CAPACITY`, `getVisibleStoragePoolCount` is already 1 and
`getStoragePoolCapacity(state, 1)` already reads `8000` bits ("1 KB"). Only one pre-existing test
needed a genuine behavioral update (a DOM-structure assertion checking for a single continuous "KB …
Cores" text run, no longer valid once the name and Booster-destination stat moved into separate
elements) — everything else that referenced `INTRO_DISK_UNLOCK_CAPACITY` symbolically continued
passing unchanged, since the redesign preserved every `aria-label` an existing test queried by.
`yarn test`: 1630/1630 green. `yarn build` succeeds. Verified visually via `yarn dev` + a real
Playwright/Chromium screenshot of a from-scratch save seeded at exactly 1 KiB Capacity: Storage and
the KB Pool card both visible immediately, the pool reading "0 bits / 1 KB," and the redesigned KB
Lake block showing "1 KB / 1 KB" deposited/capacity alongside its "⚡ ×10" button and "🎯 4 KB" next-cost
figure.

### Two more migration/logic gaps found by a Devin review pass on this same PR: unbounded-below capacityLevel edits, and idle liquidation confusing "maxed" with "full"

A `Devin Review` pass against the PR that shipped the two entries directly above (Storage's reveal
threshold, the Data Lake panel redesign, the Dev Mode `setDevState` clamp) found two more issues in
that exact area — one a narrower version of a gap already being fixed, the other a genuine,
previously-undiscovered logic bug unrelated to anything this session had touched until now.

**Gap 1: `normalizePoolMemoryCapacity`'s Data Lake `capacityLevel` clamp only checked the UPPER
bound.** The clamp added two entries back (`if (level > DATA_LAKE_CAPACITY_MAX_LEVEL) { … }`)
correctly stops a saved level from indexing `DATA_LAKE_CAPACITY_BY_LEVEL` past its own end, but a
JavaScript array read at a negative or non-integer index ALSO returns `undefined` — the exact same
failure mode from the other direction. Since Dev Mode's Variables-tree number input is a free-text
field with no min/step validation, typing `-1` or `1.7` into `capacityLevel` was one keystroke away
from reproducing the identical bug the upper-bound clamp exists to prevent. **Resolution:** the
clamp now floors, truncates to an integer, and ceils in one expression —
`Math.min(Math.max(Math.trunc(rawLevel) || 0, 0), DATA_LAKE_CAPACITY_MAX_LEVEL)` — the `|| 0` catches
`NaN` (`Math.trunc(NaN)` is itself `NaN`, and `NaN || 0` is `0`) alongside the ordinary negative/
fractional cases. The pool-buffer clamp got the same defensive floor (`Math.max(current, 0)`) for
consistency, even though a negative buffer doesn't cause the same class of crash (it's read in
ordinary numeric comparisons, not used as an array index) — just a nonsensical value with no
legitimate way to arise outside Dev Mode.

**Gap 2 (the real find): idle disk liquidation gated on `isDataLakeCapacityMaxed`, which is NOT the
same thing as "this lake can't accept another deposit."** `doubleDataLakeCapacity` empties a lake's
deposits back to zero every time it advances a level — including the FINAL advance to
`DATA_LAKE_CAPACITY_MAX_LEVEL`. So immediately after a player upgrades a lake to its hard-cap level,
that lake sits at 0/1,000 deposited — maxed in the sense that it can never grow its capacity
further, but with its full 1,000 units of room still completely empty. `isIdleDiskLiquidationAvailable`
checked only `isDataLakeCapacityMaxed(state, poolIndex)` to decide whether a pool's largest idle
disk should be liquidated straight into Bits instead of deposited — meaning a disk sitting ready
the tick after that upgrade could get destroyed by liquidation even though the lake it belonged to
had 1,000 units of empty room waiting for exactly that deposit. This bug's ROOT CAUSE predates this
session entirely (`doubleDataLakeCapacity` has always emptied deposits on every level advance, not
just the final one), but the decade-power ladder's own narrowing from 11 levels to 4 (two entries
back) made the max level dramatically easier to reach in ordinary play, turning a theoretical edge
case into one worth fixing now rather than filing as a someday-follow-up.

**Resolution: check `canDepositDiskToDataLake` directly instead of `isDataLakeCapacityMaxed`.**
`canDepositDiskToDataLake` already encodes the real "can this specific disk still be banked right
now" condition — disk array fully built, a disk on hand, not mid-rebuild, the sub-slot's own
physical backstop not hit, AND `deposited + thisDisk's own unit value <= capacity` — so
`isIdleDiskLiquidationAvailable` now returns `!canDepositDiskToDataLake(state, size)` instead. This
correctly stays `false` (no liquidation) for a freshly-maxed-but-empty lake, since the disk really
can still be deposited, while still returning `true` once the lake is GENUINELY full (either at a
non-max level with capacity exhausted, or at the max level after 1,000 units really have
accumulated). No change was needed to the surrounding forced-priority gate
(`isIdleDiskLiquidationTurnAvailable`'s own `!isAnyDataLakeCapacityDoublingAvailable(state)` check)
— that already independently defers to a capacity-doubling opportunity on ANY lake before liquidation
ever fires, which continues to work exactly as before.

**Verification.** The existing `idle disk liquidation` describe block's own fixture,
`maxedLakePool1`, turned out to BE the exact bug — it seeded `deposits: { 1: 0, 10: 0, 100: 0 }`
(completely empty) alongside `capacityLevel: DATA_LAKE_CAPACITY_MAX_LEVEL`, and its existing
assertions expected liquidation to fire in that state. That expectation was itself wrong under
correct behavior, so the fixture was corrected to a genuinely full lake
(`deposits: { 1: 0, 10: 0, 100: 10 }`, exactly 1,000 units, matching the physical backstop for
that one sub-slot too) rather than the fix being weakened to match the old, incorrect expectation.
A new, dedicated test pins the previously-buggy case directly: a lake at
`DATA_LAKE_CAPACITY_MAX_LEVEL` with all-zero deposits does NOT trigger
`isIdleDiskLiquidationAvailable`, and `tickIdleDiskLiquidation` is a same-reference no-op against
it. Two new `normalizePoolMemoryCapacity` tests cover the lower-bound fix (negative, fractional,
and `NaN` `capacityLevel` values all land on a valid integer in range) and one covers the pool-buffer
floor. `yarn test`: 1633/1633 green (+3 over the prior entry's 1630 — one existing test's fixture
corrected, four new tests added, net +3 after accounting for the corrected fixture not itself adding
a test). `yarn build` succeeds.
### Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one

`getTierCost`'s per-level pricing (see "Purchase level resized from 10 to 8, and the cost-epoch
sequence changed from Fibonacci to triangular" and "Fibonacci cost curve... reinstated" above) had
settled on the Fibonacci-driven exponent sequence — `1, 2, 3, 5, 8, 13, 21, …` for epochs
`0, 1, 2, 3, 4, 5, 6, …`, i.e. each epoch's exponent grows over the previous one by
`1, 1, 2, 3, 5, 8, 13, …` — with the maintainer's explicit instruction (recorded above) to keep it
going forward rather than let it drift back to the triangular sequence again.

This session, the maintainer explicitly asked to change it a third time: initially to increments of
`1, 1, 2, 4, 7, 11, 16, 22, 29, …` (a quadratic, "central-polygonal-number" progression diverging
from Fibonacci at epoch 4), then — mid-session, after being shown the resulting exponent curve and
asked for something slower-growing that still opened with the same first three increases (`1, 1,
2`) — settled on plain **linear increments**: `1` at epoch 0, and the epoch number itself
(`n`) from epoch 1 on, i.e. `1, 1, 2, 3, 4, 5, 6, 7, 8, …`. Cumulatively, this gives:

| epoch (e) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| Fibonacci exponent (previous) | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 |
| linear-increment exponent (current) | 1 | 2 | 3 | 5 | 8 | 12 | 17 | 23 | 30 |

The two sequences are identical through epoch 4 (level 5) — coincidentally the same divergence
point the earlier Fibonacci-vs-triangular swap had — and diverge from epoch 5 (level 6) on, with
the new sequence growing quadratically in the epoch (`~e²/2`) rather than Fibonacci's exponential
growth, so late-game tier levels get noticeably cheaper/faster to reach than before. Because
`getTierCost`'s and `App.test.jsx`'s own existing assertions only ever exercised levels 1-5, none
of their expected VALUES needed to change — only `getCostEpochExponent`'s own test
(`engine.test.js`) was extended out to epoch 7 to actually pin the new, now-different behavior past
the point where the two sequences used to agree. `docs/ECONOMY_REFERENCE.md`'s function-reference
table entry was updated to the new sequence and history note.

As with the earlier swap, this is the maintainer's own deliberate, direct instruction — recorded
here specifically so a later automated session doesn't read the still-present Fibonacci-vs-
triangular history above and "helpfully" revert this one too.

### Idle disk liquidation could destroy a disk from a still-mid-build array, not just a genuinely full lake

The prior entry above ("`isIdleDiskLiquidationAvailable` mistakenly checked `isDataLakeCapacityMaxed`
instead of the real deposit condition") fixed liquidation to gate on
`!canDepositDiskToDataLake(state, size)` instead of the weaker maxed check. A Devin bot review pass
on that same PR (after it had already merged, following this repo's merged-PR branch-restart
convention) found a second, distinct gap in that fix: `canDepositDiskToDataLake` itself returns
`false` for TWO unrelated reasons — either the lake genuinely has no room (the case the fix above
was written for), or the disk's own array simply isn't finished being built yet
(`isDiskArrayFullyBuilt` internally gates it). `!canDepositDiskToDataLake` alone can't tell those two
apart, so a pool whose LAST (largest, ×100) size was still mid-build — say 3 of the eventual 10
disks built, one of them currently idle and on hand — would read as "can't deposit" and become
liquidation-eligible, even though the array had a real destination once it finished (redemption, or
its own eventual deposit) and nothing was actually wrong with the lake's capacity at all. In
practice this only fires past the full forced-priority gate (Disk Fill/Speed/Provision
Disk/Compute/every lake's Capacity doubling all unavailable first) — but Provision Disk being
UNAFFORDABLE for a moment mid-array is exactly the kind of transient state that gate doesn't rule
out, so the bug was real and reachable, not merely theoretical.

**Fix**: added `isDiskArrayFullyBuilt(state, size)` as its own explicit, separate check in
`isIdleDiskLiquidationAvailable`, ahead of the `canDepositDiskToDataLake` check — liquidation now
requires BOTH "the array is actually finished" and "the lake genuinely can't take another one," never
inferring the first from the second's `false` result. A new regression test seeds
`disksBuiltTotal[kb100]` at 3 (mid-build) against the same maxed-lake fixture the earlier fix's own
tests use, confirms `canDepositDiskToDataLake` is `false` for the array-not-finished reason, and
pins that `isIdleDiskLiquidationAvailable` stays `false` regardless (rather than reading that
`false` as "lake is full"). `yarn test`: 1634/1634 green (+1). `yarn build` succeeds.

### Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers

A `Devin Review` pass on the PR that replaced the Storage-Disk-deposit Data Lake mechanic with the
current pool-overflow feed (see the "Data Lakes" entries further up — the rework's own PR, not yet
merged when this pass ran) found three genuine issues, the first of which was severe enough to make
the whole feature non-functional under ordinary play.

**Finding 1 (severe): `getDataLakeOverflowRatePercent`'s own 50%→0% taper is a pure exponential
decay toward the remaining gap, which mathematically never reaches it.** The rate feeding a lake's
currently-open disk was computed live from that SAME disk's own current fill fraction — `50 -
fraction * 50`, hitting exactly 0% only once the disk is already complete. Every tick's own
overflow-bits increment was proportional to that live rate, applied to the SAME fraction it was
just derived from — a self-referential feedback loop with no forcing term. Solving the continuous
ODE this recurrence approximates (`d(gap)/dt = -k * gap`) confirms this isn't a discretization
artifact: even in exact real-number arithmetic, the gap shrinks toward zero forever without ever
crossing it. In floating point it's worse — the recurrence gets PERMANENTLY stuck once the
increment rounds to nothing relative to the accumulated `fillBits`. Simulated directly against the
real `tickPoolBufferFill` (a fresh KB lake, starting Byte Foundry production rate, 1-second ticks):
`fillBits` climbed to `7999.999999992724` out of an 8,000-bit slot and then never moved again, for
over 440,000 consecutive ticks — Boosters, and the entire Data Lake feature, would never actually
unlock through ordinary play. **Fix:** `getDataLakeOverflowRatePercent` now floors its returned
value at a new `DATA_LAKE_OVERFLOW_COMPLETION_FLOOR_PERCENT` (5) constant in `layers.js` — the
taper still reads as "approaching zero" at ordinary (whole-percent) display precision, but the real
per-tick increment never shrinks below a small, constant, nonzero floor, so a disk always finishes
in a bounded number of ticks instead of asymptoting. A regression test seeds `fillBits` a tiny
0.08-bit gap short of a slot's own full size, confirms the rate reads exactly at the floor (not the
near-zero unfloored value), and confirms a single ordinary tick actually completes the disk. The
pre-existing "fully maxed lake" test's own expectation (`getDataLakeOverflowRatePercent` returning
the raw `MIN_PERCENT`) was updated to expect the floor instead — harmless either way in practice,
since `fillDataLakeDisks` itself already no-ops once a lake has no open slot regardless of what rate
this function returns for that case.

**Finding 2 (real, narrower): `computeCoresEverEarned` was computed as `max(previous, live
balance)`, not a true running total.** `latchComputeMergePageIfNeeded` (the internal helper
`buyBooster` calls on every tier-1 purchase) set this lifetime-earned counter to whichever was
larger — its own previous value, or the Cores balance right after this purchase. Since Cores get
spent (Compute Boost activations, 8:1 merging into Nodes), that live balance routinely drops back
down between purchases — meaning `max()` re-derives "lifetime earned" from a number that isn't
monotonic, silently forgetting everything earned before the most recent spend. Concretely: earn 3,
spend all 3, then earn 5 more — `max(3, 5) = 5`, not the true lifetime total of 8 — which could leave
the Compute merge chain's own unlock (`computeMergePageUnlocked`, gated at `COMPUTE_CORES_PER_NODE`
lifetime Cores) permanently one Core short of true for a player who happened to spend Cores early.
**Fix:** increments `computeCoresEverEarned` by exactly 1 per successful tier-1 Booster instead —
`(intro.computeCoresEverEarned ?? 0) + 1` — a genuine running total, immune to how the live balance
moves in between. A regression test earns 3, spends them (directly, simulating a merge/Boost), earns
5 more, and confirms the counter reads 8, not 5.

**Finding 3 (real, narrower): migrating a legacy (pre-rework) Data Lake tier silently dropped any
in-flight `transfers`.** The migration added for the rework itself (two entries up) correctly
translated `deposits`/`purchased`/`capacityLevel` into the new shape, but simply discarded the old
`transfers` array (`{ remainingSeconds }` entries — a live Booster funding pipe under the since-
removed mechanic) with no equivalent under the new instant-buy model. Each entry represented a
Booster that had ALREADY been fully paid for — its source Disks were consumed the instant the
transfer was queued, not when it completed — so a player with an in-flight transfer at the moment
this PR shipped would have silently lost that compute-ladder entity outright, with nothing to show
for the Disks they'd already spent. **Fix:** `mergeDataLakes` now also returns a
`pendingComputeGrants` map (tierIndex → in-flight transfer count) alongside the migrated
`dataLakes`, which a new `applyPendingComputeGrants` helper folds into `mergeState`'s `intro` —
granting the matching compute-ladder entity (`COMPUTE_BOOST_TIER_FIELDS[tierIndex - 1]`) per pending
transfer, exactly as a real `buyBooster` call would have, including (for tier 1) the same
`computeCoresEverEarned`/`computeMergePageUnlocked` bookkeeping `latchComputeMergePageIfNeeded`
applies. The migrated tier's own `purchased` count also absorbs the pending-transfer count, so the
NEXT Booster's escalating cost (`purchased + 1`) picks up where the old save actually was rather
than reading as cheaper than it should. The existing migration regression test
(`storage.test.js`) was extended to seed 2 in-flight tier-1 transfers and assert both the granted
Cores and the bumped lifetime-earned/`purchased` counts.

`yarn test`: 1686/1686 green (+3 net: two new regression tests, one existing test's expectation
corrected to match the intentional floor). `yarn build` succeeds.

### A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them

After the three fixes above (`2c59c97`) came back APPROVE from a fresh adversarial review, a Devin
follow-up comment self-corrected one of its own earlier "info, no bug" notes into a genuine finding
on `decomposeDataLakeUnits` — the helper that turns a lake's own scalar `depositedUnits` total into
×1/×10/×100 disk-square counts for display. Independently confirmed by direct simulation before
trusting the claim.

**The bug.** `decomposeDataLakeUnits` (unchanged since the pool-overflow rework) processed
denominations smallest-first, greedily assigning `min(cap, floor(remainder / subSize))` at each
step. This is correct for any total reached via the lake's own NATURAL growth path (overflow always
completes the smallest still-open disk first, so `depositedUnits` only ever takes "lattice" values —
0,1,…,10,20,…,100,200,…,1000). But `buyBooster` spends an ARBITRARY cost (the nth Booster at a lake
costs n units, not a whole-disk multiple), so `depositedUnits` can land on any integer in
`[0, capacity]`, not just lattice points. For an off-lattice total, the naive greedy can leave a
leftover no larger denomination can ever absorb: `total = 85` at `capacityLevel 1` (caps
`{1: 10, 10: 9}`) naively decomposed to `{1: 10, 10: 7}` with 5 units completely unrepresented by
any disk square — real, correctly-tracked, fully spendable currency (Booster purchases read the raw
`depositedUnits` scalar directly, unaffected) that the disk-square UI simply never showed. Worse,
continued natural overflow-filling from that drifted state could let `depositedUnits` climb PAST
the lake's own declared capacity before the decomposition ever recognized the lake as full (traced
by hand and confirmed by simulation: `depositedUnits` reached 105 against a declared capacity of
100), which would have shown as `aria-valuenow` exceeding its own declared `aria-valuemax` on the
lake's progress bar — an accessibility contract violation on top of the display bug.

**Why a target-oriented "largest-first" swap doesn't work.** The obvious-looking fix — decompose
largest-denomination-first instead, like ordinary place-value expansion — was tried by hand first
and rejected: it exactly reproduces the correct total but with the WRONG disk-square breakdown for
the common (never-spent) case. E.g. a natural `depositedUnits = 50` (10 ones filled and capped,
4 tens completed, matching the real fill history) decomposes largest-first to `{1: 0, 10: 5}` —
mathematically valid as a sum, but flatly contradicts what actually happened (no ones were ever
skipped) and, more importantly, changes which sub-size `getDataLakeOpenSubSize` reports as
currently-filling, corrupting the "ones must complete before tens, tens before hundreds" progression
the whole capacity-level/pool-unlock design depends on. It would also make a `capacityLevel 2`
lake's `slotCounts` decomposition of its own capacity value (100) come out as `{100: 1}` — implying
a ×100 slot is available a full level early. Largest-first is simply the wrong algorithm, not a
smaller-scoped version of the right one.

**The actual fix: a mixed-radix decomposition that stays smallest-first except where a cap is
genuinely binding.** Since each `DATA_LAKE_SUB_SIZES` step is exactly ×10 the previous one, whatever
remains after assigning a denomination MUST be an exact multiple of the next denomination's own
size for a larger denomination to ever finish the job — pinning that denomination's own count to a
single residue class modulo that ratio once its cap is actually the binding constraint (i.e. once
`wholeUnits > cap` — when `wholeUnits ≤ cap` no capping is happening at all, and the original naive
formula is already exactly correct, so this branch must NOT fire there — an off-by-one in this
guard was caught immediately by the very next test run: `decomposeDataLakeUnits(0)` came back
`{1: 10, …}` instead of `{1: 0, …}`, since 10 is congruent to 0 mod 10 too, and the fix had to add
the `wholeUnits > cap` gate to stop the modular-adjustment branch from ever firing when nothing
needed adjusting). Within that binding-cap case, the LARGEST count within the cap that still lands
in the correct residue class (`cap - ((cap - forced) % ratio)`, where `forced = wholeUnits % ratio`)
is picked — provably: (a) reduces to the exact original naive formula for every lattice value (no
behavior change for natural growth — verified against all six pre-existing
`getDataLakeDiskCounts`/`getDataLakeDiskSlotCounts` test cases by hand before writing the fix), and
(b) guarantees zero leftover for every total up to the level's own capacity, including the specific
85 and 905 (a 3-denomination case needing tens to yield entirely so hundreds can reach its own
natural value) cases hand-verified during development. The LAST (largest) denomination has no
"next" size to satisfy, so it keeps the original plain cap-limited floor division unconditionally.

**Verification.** Hand-derived the exact math for every existing test fixture (0, 5, 10, 70, 400,
1000 at various capacity levels, plus the four `getDataLakeDiskSlotCounts` boundary values) before
touching the code, confirming zero behavior change for the natural-growth path. Two new regression
tests: one exercises `decomposeDataLakeUnits` (via `getDataLakeDiskCounts`) directly against the 85
and 905 off-lattice cases plus a swept sample of every value from 0 to each level's own capacity,
asserting `sum(count × size) === total` (zero leftover) throughout; the other drives the SAME bug
through the real `buyBooster` path (five escalating-cost purchases draining a maxed level-2 lake
from 100 to 85) rather than only the decomposition helper in isolation, matching how the bug would
actually be reached in play. `yarn test`: 1688/1688 green (+2). `yarn build` succeeds.

### A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed

Devin's own follow-up review round (the one that produced the `decomposeDataLakeUnits` finding
above) also flagged two more issues in `tickPoolBufferFill`/`fillDataLakeDisks`. The first was a
real, if narrow, pacing gap; fixing it exposed a second, more serious PRE-EXISTING bug that no
previous test had ever exercised.

**Finding 5: a pool's buffer completing mid-tick dropped that tick's own leftover reserved
production instead of routing it to the lake.** `tickPoolBufferFill`'s buffer-fill branch computed
`transfer = min(fillRate * elapsedSeconds * multiplier, room, bits)` and, whenever `room` was the
binding constraint (the buffer had SOME space but not enough for the full `elapsedSeconds`
interval), simply `continue`d after topping the buffer out to `room` — the unused remainder of that
tick's own reserved production (`rawTransfer - room`) was neither refunded anywhere nor forwarded
to the overflow branch (which only ever ran when `room` was ALREADY 0 at the START of the tick). It
just silently stayed as ordinary `intro.bits` instead of feeding the lake, for exactly the one tick
where the transition happened — self-correcting on the very next tick, since the buffer would then
already read as full. Live play (`TICK_RATE_MS`-cadence ticks) makes this negligible, but
`applyOfflineProgress` explicitly supports large real-world absences, and while it replays offline
time as many 1-second `tickGame` calls rather than one giant tick (so the "missing" amount per
transition is capped at roughly one second's worth of production, not hours'), any tick where a
buffer happens to complete mid-interval still loses that slice of intended lake progress to
ordinary Bits instead. **Fix:** track `overflowSeconds` — how much of `elapsedSeconds` is left over
once the buffer-fill (if any) has taken what it needed. If the buffer was already full at the
tick's start, this is the full interval (unchanged prior behavior); if it just became full
mid-tick, it's derived by converting the multiplier-scaled amount the buffer-fill actually consumed
back into a plain elapsedSeconds fraction (`usedSeconds = transfer / (fillRate * multiplier)`, then
`overflowSeconds = elapsedSeconds - usedSeconds`) — deliberately reconstructing an UNmultiplied time
value, since the overflow formula itself is (by design, see the "two separate dials" comment on
this same function) never multiplier-scaled, unlike the buffer-fill amount it was derived from. If
the buffer never actually reached capacity this tick (bits ran out first, or the interval simply
wasn't long enough), `overflowSeconds` stays 0 and behavior is unchanged.

**Finding 6 (found via testing Finding 5's own fix, not from Devin directly): `fillDataLakeDisks`
could destroy real currency once a lake maxed out mid-call.** Making Finding 5's fix actually reach
the overflow branch for a large existing test (`elapsedSeconds = 1e6` against a fresh, 1-unit-
capacity lake) immediately failed an assertion in a way that traced back to a bug that predates this
whole finding: `fillDataLakeDisks` accumulates `overflowBits` into `fillBits`, completes whatever
whole disks fit, and — once the lake is fully maxed at its current level — discards any leftover
`fillBits` outright (`fillBits = 0`, "nowhere left to go"). But its caller, `tickPoolBufferFill`,
unconditionally subtracted the FULL `overflowBits` from `intro.bits`, regardless of how much
`fillDataLakeDisks` actually placed anywhere. Whenever a single call's `overflowBits` was large
enough to complete a lake's remaining capacity AND leave real overshoot (small/fresh lake + a big
elapsedSeconds tick, exactly what Finding 5's fix started producing for the first time in that
existing test), that overshoot was spent from `intro.bits` and then silently discarded by
`fillDataLakeDisks` — bits genuinely destroyed, not just misallocated. This bug existed since the
very first version of the pool-overflow Data Lake mechanic; no earlier test had ever combined "large
enough overflow to matter" with "small enough remaining lake capacity to overshoot it" in the SAME
call, so it stayed dormant until Finding 5's fix started reaching the overflow branch from a new
code path. **Fix:** `fillDataLakeDisks` now also returns `unconsumedBits` (whatever `fillBits`
remained right before being discarded, when it maxes out mid-call), and the caller subtracts only
`overflowBits - unconsumedBits` from `intro.bits` — the unconsumed portion survives as ordinary
Bits instead of vanishing.

**Verification.** The existing `tickPoolBufferFill stops at the pool's own buffer room…` test
(originally written to assert the now-recognized-as-buggy "leftover just sits in intro.bits, never
reaching the lake" behavior) was updated to assert the corrected behavior instead — the lake
(a fresh, 1-unit-capacity one in that fixture) receives exactly what it can hold, and the true
remainder (buffer capacity + that one unit's worth) is what's actually missing from `intro.bits`,
not the full naive `1,000,000 - bufferCapacity`. Two new regression tests: one seeds a buffer with a
small amount of room left and confirms the SAME tick that tops it off already shows real lake
progress (Finding 5, an invariant-only check rather than hand-derived exact figures, robust to the
pool fill-multiplier's own exact value); the other seeds a fresh lake against a deliberately huge
`overflowBits` and confirms `intro.bits` drops by exactly the one unit the lake could hold — no
more, no less (Finding 6, pinning that overshoot is preserved, not destroyed). `yarn test`:
1690/1690 green (+2). `yarn build` succeeds.

### A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake

The next Devin review pass (against `9b9680e`/`7022e1b`) confirmed all six findings above as fixed,
plus one more real (if purely cosmetic) issue: `getDataLakeOverflowRatePercent` still returned
`DATA_LAKE_OVERFLOW_COMPLETION_FLOOR_PERCENT` (5%) for a lake with no open slot left at its current
capacity level — the completion floor added for Finding 1 above (a rate literally reaching 0%
never actually reaches full) applied unconditionally, without checking whether there was anything
left to fill at all. This function's own doc comment claimed the case was unreachable in practice
("tickPoolBufferFill's caller only ever calls this while there's an open slot to fill") — WRONG:
`ByteFoundryPage`'s pool gauge reads this same function directly, for every pool, to render its own
"N% incoming" display label, entirely independent of whether `tickPoolBufferFill` happens to reach
the overflow branch that tick. A maxed lake would therefore show a live "5%" reading even though it
can accept nothing — misleading, though harmless mechanically (`fillDataLakeDisks` already no-ops
on a maxed lake regardless of what rate is passed in, so no currency or progress was ever actually
at stake). **Fix:** `getDataLakeOverflowRatePercent` now checks
`getDataLakeCurrentFillSubSize(state, tierIndex) === null` FIRST and returns the raw
`DATA_LAKE_OVERFLOW_MIN_PERCENT` (0) in that case, bypassing the completion floor entirely — the
floor only ever matters while there's a genuinely open slot to make progress on. The pre-existing
"once maxed at the current level" test (which had asserted the floor value, on the mistaken
"unreachable" premise) was corrected to assert `MIN_PERCENT` instead. The same review pass also
surfaced two leftover stale passages in `CLAUDE.md` from before the pool-overflow rework — a
"Booster transfer pacing" phrase (no more literal transfers exist) and a `deposits`/`purchased
Boosters`/`in-flight transfers`/`capacityLevel` field list in the Data-Lakes-permanent-across-
Prestige sentence (the actual current fields are `depositedUnits`/`fillBits`/`purchased`/
`boostersUnlocked`/`autoBuyEnabled`/`capacityLevel`) — both corrected in the same commit. `yarn
test`: 1690/1690 green (one existing assertion corrected, no net new test count change). `yarn
build` succeeds.

### An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest

The same Devin review pass (against `7022e1b`) also flagged that `tickPoolBufferFill`'s overflow
branch computed a single `overflowBits = fillRate * overflowSeconds * (ratePercent / 100)` for the
WHOLE `overflowSeconds` interval, using `getDataLakeOverflowRatePercent` evaluated once, at the
START of that interval. `getDataLakeOverflowRatePercent` tapers per-disk (50% while a disk is empty,
down toward the completion floor as it nears full, then straight back up to 50% the instant it
completes and the next disk opens — see Finding 1/7 above) — so a rate captured before the interval
began is only valid until whichever comes first: the interval ends, or the currently-open disk
completes. A single `overflowSeconds` large enough to complete MORE than one disk (the same
`applyOfflineProgress`-catch-up scenario Finding 5 above was about — offline time is replayed as many
1-second `tickGame` calls, not one giant tick, but even a single second can still span multiple lake
disk completions once production is fast enough) kept applying the FIRST disk's rate to every disk it
went on to complete in that same call, even though each of those later disks actually opened empty
(entitled to the fresh 50% MAX rate, not whatever stale, possibly-near-floor rate the first disk was
finishing at). This under- or over-credits lake progress for that tick depending on whether the stale
rate happened to be above or below what the later disk(s) should have gotten — silent pacing drift,
not a currency bug (no bits are created or destroyed; `fillDataLakeDisks`'s own accounting stays
sound). **Fix:** replaced the single flat-rate computation with `applyDataLakeOverflow`, which walks
`overflowSeconds` in bounded segments — capped at `DATA_LAKE_OVERFLOW_SEGMENT_LIMIT`
(`DATA_LAKE_SUB_SIZE_DISK_CAPS` summed, i.e. the most disk slots a lake could ever hold at its current
level, so the loop is provably bounded rather than open-ended) — re-evaluating
`getDataLakeOverflowRatePercent` at the START of each segment against a synthetic view of the lake's
state as of that point (`{ ...state, intro: { ...state.intro, dataLakes: { ...state.intro.dataLakes,
[tierIndex]: lake } } }`, since the real `state` passed in is still the tick's ORIGINAL, pre-mutation
snapshot). Each segment computes how many seconds/bits are needed to close out the currently-open
disk, takes the smaller of that and what's left of the interval, applies `fillDataLakeDisks` for just
that slice, and loops — so a disk that completes partway through `overflowSeconds` correctly hands
the remaining time to the NEXT disk at ITS OWN fresh rate, rather than smearing one rate across a
multi-disk span. Terminates early once a segment produces no rate (`ratePercent <= 0`), no open slot
(`getDataLakeCurrentFillSubSize` returns `null`, i.e. now maxed), no bits (`segmentBits <= 0`), or
the lake maxes out mid-segment (`unconsumedBits > 0`, mirroring Finding 6's own overshoot-preservation
contract — folded into the helper's own `remainingBits` return rather than re-litigated at the call
site). **Verification.** Hand-derived the expected result for the regression test that already
exercised a near-complete-disk scenario (Finding 1's own "floors the overflow rate…" test, whose
`elapsedSeconds` was large enough that, once close, its now-100%-elapsed tick also opens and starts
filling a SECOND disk): segment 1 closes the ~0.08-bit gap on the first (near-full, low-rate) disk
in a tiny fraction of a second; segment 2 then correctly applies the fresh `DATA_LAKE_OVERFLOW_MAX_PERCENT`
(50%) rate — since the newly-opened second disk starts empty — to the remaining ~0.9998s of the tick,
yielding `fillBits ≈ 8,000 bits/sec × 0.9998s × 0.5 ≈ 3999.2` on the second disk, versus the
old (buggy) flat-rate calculation's `≈399.92` (which wrongly kept applying the first disk's ~5%
floor rate to that same remaining time). The test's assertion was updated to the correct,
segment-derived value. No other test in the `Data Lakes` describe block changed behavior. `yarn
test`: 1690/1690 green (one existing assertion corrected to the newly-correct value, no net new test
count change). `yarn build` succeeds.

### A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever

The same review round also flagged that `getBoosterPurchaseCost`'s escalation (`purchased + 1`, no
upper bound) and the lake's own capacity ladder (`DATA_LAKE_CAPACITY_BY_LEVEL`, permanently
hard-capped at `DATA_LAKE_CAPACITY_MAX_LEVEL` — 1,000 units) were never reconciled. Once a lake
reached `purchased = 1000` (the 1,000th Booster ever bought at that tier), the 1,001st would cost
1,001 units — but `depositedUnits` can never exceed the lake's own capacity, and that capacity was
already maxed and could never grow further. `isBoosterPurchaseAvailable` (needs `depositedUnits >=
cost`) and `isDataLakeCapacityDoublingAvailable` (short-circuits false once `isDataLakeCapacityMaxed`)
were therefore BOTH permanently false from that point on — the lake could never buy another Booster
again, contradicting the mechanic's own intent (Boosters are meant to be an indefinite, ever-repeatable
purchase; only the CAPACITY ladder is meant to have a hard ceiling, not the Booster supply itself).
This is a genuinely late-game-only bug (1,000 Boosters at one tier is a lot of play), but a real
permanent dead-end once reached, not a display nit. **Fix:** `getBoosterPurchaseCost` now checks
`isDataLakeCapacityMaxed` first; below max level, behavior is completely unchanged (`purchased + 1`,
uncapped, exactly as before — this only ever activates AT the max level). Once maxed, the returned
cost is `Math.min(purchased + 1, getDataLakeCapacity(state, tierIndex))` — pinned at the lake's own
(now permanently fixed) capacity rather than left to keep climbing past it, so a fully-refilled maxed
lake can always afford its next Booster, forever, at a flat cost equal to its own capacity. This
preserves the pre-existing "buying and capacity-upgrading are mutually exclusive by construction"
invariant (`isDataLakeCapacityDoublingAvailable` needs `cost > capacity`, which can now never be true
once maxed, exactly matching `isDataLakeCapacityMaxed` already forcing that function false — no
double-guard needed, just consistent). **Verification.** New regression test: seeds a lake at the
max capacity level with `purchased: 1000` (so the pre-fix cost would have been 1,001, permanently
unaffordable) and a full 1,000-unit deposit; asserts the cost now reads 1,000 (not 1,001), that
`isBoosterPurchaseAvailable` is true and `isDataLakeCapacityDoublingAvailable` stays false, that
`buyBooster` succeeds and drains the deposit to 0, and that the NEXT cost (after `purchased` is now
1,001) still reads 1,000, not 1,002 — confirming the cap holds indefinitely, not just for one
purchase. A second assertion confirms a NOT-yet-maxed lake's cost is completely unaffected (still the
plain `purchased + 1`). `yarn test`: 1691/1691 green (+1). `yarn build` succeeds.

### A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks

A later Devin pass (against `b0ed228`) flagged that size-agnostic idle-disk liquidation (see the
ninth finding's own section above, and the earlier "size-agnostic" rework predating this PR) never
accounted for write-cache (`tickDiskWriteCache`) as an alternative destination for a stranded
size's full disks. `getIdleDiskLiquidationSizes`'s own reasoning — "a stranded size's disks have
nowhere left to go, since Data Lakes no longer accept Disk deposits at all" — forgot that write-cache
IS exactly such a destination: a source size whose own tier has moved past its redeem level can
still feed the NEXT ladder size up via write-cache, which itself may still need — or be actively
mid-collect on — full disks from that exact source. Two concrete failure modes: (1) liquidation
could repeatedly skim a stranded source's full disks down to nothing BEFORE they ever simultaneously
reach `DISK_ARRAY_LADDER_CAP` (10), the count `canStartDiskWriteCacheMerge` needs to ever start a
NEW merge — permanently preventing one from starting; (2) if a merge already has an ACTIVE, in-flight
collect running against that source, liquidation could steal disks it was mid-way through
collecting. Both cases permanently starve a higher, still-currently-redeemable size of the refill it
needs (its tier could be sitting EXACTLY at its own required level right now, with 0 currently-full
disks, desperately needing a write-cache-delivered disk to ever redeem again) — a real,
gameplay-blocking loss, not a display nit. **Fix:** a new `isDiskSizeReservedForWriteCache(state,
size)` predicate excludes a stranded size from `getIdleDiskLiquidationSizes` whenever its own next
ladder size (`getNextDiskLadderSize`) still has a real, current use for its disks — an empty,
ever-built target slot waiting to be topped up (`disksBuiltTotal[targetSize] > disks[targetSize]`,
the EXACT same condition `canStartDiskWriteCacheMerge` itself checks, which also transparently
covers an active in-flight collect/flush, since a target slot mid-merge stays counted as not-full
the whole time it's in progress) — AND that target size isn't ALSO already permanently stranded
itself (`isDiskSizeStrandedByAdvancedTier(state, targetSize)`): once the target's own tier has
already moved past ITS required level too, filling it with even more disks could never redeem
either, so there's genuinely nothing left to protect and the liquidation chain cascades upward
exactly as it did before this fix. This second condition is what keeps the existing
"liquidates the smallest eligible size" test passing unchanged — in that fixture BOTH the source
and its own next size are already stranded, so the new protection correctly doesn't apply there;
protection only ever activates for a target that's genuinely still redeemable (at, or not yet at,
its own required level). **Verification.** Two new regression tests: one seeds a source (kb10,
stranded) whose next size (kb100) is fully built but NOT stranded (sitting exactly at its own
required level, currently holding 0 full disks — genuinely needing a write-cache refill) and
confirms liquidation is unavailable/a no-op despite kb10 otherwise qualifying; a companion test
advances the tier one more level (making kb100 stranded too) and confirms the protection lifts,
with kb10 liquidating exactly as the pre-existing cascade test already expected. `yarn test`:
1693/1693 green (+2, from the 1691 baseline before this finding). `yarn build` succeeds.

### An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split

The same Devin pass also flagged that `applyDataLakeOverflow`'s per-disk segment loop (added for
the eighth finding above, to stop reusing one disk's rate across a tick that spans MULTIPLE disk
completions) still had a narrower version of the exact same bug WITHIN a single disk's own partial
fill: each segment sampled `getDataLakeOverflowRatePercent` ONCE, at the segment's own start, and
applied that one rate flatly for the segment's entire duration — correct only when the segment
happens to land exactly on a disk-completion boundary, not for the (far more common) case where a
segment consumes only PART of a disk's remaining gap without completing it. The true rate keeps
decreasing continuously as `fillBits` rises within that same disk (the whole point of the taper),
so holding it flat at the segment-start value over-credits the lake relative to a properly
integrated result. Concretely: `tickPoolBufferFill(2)` (one 2-second tick) and
`tickPoolBufferFill(1)` called twice in a row (two 1-second ticks) could disagree on the resulting
`fillBits`/`depositedUnits` for the exact same total elapsed time — a non-associative tick function,
meaning live small-tick play and offline-progress's own 1-second-increment replay (see
`applyOfflineProgress` in `CLAUDE.md`'s Architecture section) were not guaranteed to reach the same
state for the same real elapsed time. **Fix:** rather than further subdividing into smaller and
smaller discrete slices (which only shrinks, never eliminates, the same class of error, and adds an
arbitrary new granularity constant to tune), the taper's own shape makes an EXACT fix possible: since
`getDataLakeOverflowRatePercent` is exactly linear in fill fraction, a single disk's own fill obeys
`dx/dt = fillRate * rateFraction(x/L)` — an ordinary first-order linear ODE with a closed-form
solution. Below the completion floor's own threshold fraction (90% fill, where the un-floored taper
would cross `DATA_LAKE_OVERFLOW_COMPLETION_FLOOR_PERCENT`), the solution is exponential decay toward
an equilibrium that coincides with `L` itself (since `DATA_LAKE_OVERFLOW_MIN_PERCENT` is 0 — the
same "asymptotically approaches but never reaches 100%" property Finding 1 already required a floor
for); at or above that threshold, the rate is pinned at the floor, so fill is plain constant-rate
linear. Two new solver functions — `solveDataLakeDiskFillAfterSeconds` (seconds→fill) and
`solveDataLakeDiskSecondsForBits` (fill→seconds, needed only when `applyDataLakeOverflow`'s own
available-Bits budget binds before its time budget does) — implement both regimes exactly, sharing
`getDataLakeOverflowTaperShape`'s threshold/equilibrium/decay-rate constants so the two can never
disagree about where one regime ends and the other begins. `applyDataLakeOverflow`'s own per-disk
segment loop is unchanged in shape (still re-evaluates which disk is open every time one completes,
still bounded by `DATA_LAKE_OVERFLOW_SEGMENT_LIMIT`) — only what happens INSIDE one disk's own
segment changed, from "sample once, apply flat" to "solve exactly." This makes a single disk's own
fill mathematically exact and genuinely tick-size-independent, not just closer. **Verification.**
Derived the closed-form solution's parameters by hand (equilibrium `x* = MAX*L/(MAX-MIN) = L` when
`MIN=0`; decay rate `fillRate*(MAX-MIN)/L`) and validated it two ways before touching `engine.js`: a
scratch script comparing the closed form against a fine-grained (0.0001s-step) numerical integration
of the same ODE (agreement to within the numerical integrator's own step-size error, ~0.005 bits out
of thousands) and an associativity check (splitting one 20-second fill into 2,000 steps of 0.01s
each reproduced the one-shot 20-second result to 6 decimal places). Two pre-existing tests whose
expected values had been hand-derived under the OLD (flat-rate-per-segment) approximation needed
correcting to the new, exact values: the "feeds the matching Data Lake ... at DATA_LAKE_OVERFLOW_MAX_PERCENT"
test's 1-second fill from empty changed from a flat `8000*50%=4,000` bits estimate to the true
`8000*(1-exp(-0.5))≈3,147.75` bits (a large, not rounding-scale, difference — confirming this was a
real error, not a cosmetic one); the "completes the lake's first disk" test's assumed flat
completion time (2s) was replaced with the disk's own true closed-form completion time (~6.6s: ~4.6s
in the exponential regime to reach the 90%-fill threshold, then 2s more at the floored constant
rate), using a safely-overshot elapsed value so floating-point precision at the exact boundary can't
leave a residual (harmless regardless, since a level-0 lake's capacity is exactly 1 unit — completing
that one disk maxes the whole lake no matter how much leftover time remains in the tick). A new
regression test directly pins the associativity property itself: one `tickPoolBufferFill(2)` call
versus twenty `tickPoolBufferFill(0.1)` calls in a row, from the same fresh state, now produce
`fillBits` matching to 6 decimal places (previously they diverged meaningfully) — this fixture stays
within the exponential regime the whole 2 seconds (well short of a disk completing), so it isolates
exactly the WITHIN-one-disk precision this fix targets, distinct from the eighth finding's own
cross-disk-boundary regression test. `yarn test`: 1694/1694 green (+3 total across the tenth and
eleventh findings — 1691 → 1694). `yarn build` succeeds.

### The read-cache pre-fill design was never reconciled with the later decade-of-10 Capacity ladder, starving a freshly-unlocked pool's buffer

A player-reported bug: a fresh pool 1 (the KB pool) could not accumulate even 1 KB of Memory buffer
— its balance appeared to be "consumed too fast," with no visible destination for the missing bits.
This traced to two earlier, independently-reasonable design decisions that were never checked
against each other once the second one landed. The first ("Pool cards gated on a capacity threshold
too; read cache pre-fills on pool unlock" above) made a pool's smallest size's read cache
(`diskCache`, `DISK_CACHE_BLOCK_COUNT` (8) blocks totaling one disk's worth of bits — 8,000 bits for
a 1 KB pool) start filling from that pool's own buffer the instant the pool unlocked, regardless of
whether a disk of that size had ever been built, specifically so the cache would already be full (or
filling) by the time the player's first disk finished provisioning. The second, much later ("Provision
Disk moved back inside its pool card; pool Capacity switched from SI-clean to a plain decade-of-10
ladder" above) deliberately made a pool's own decade-power Capacity climb one decade step AHEAD of
that size's own face value — a 1 KB disk's `getDiskCost` (`DISK_BUILD_COST_MULTIPLIER` (10) × size =
80,000 bits) is only affordable once the pool's Capacity has reached "10 KB," not "1 KB." Neither
change touched the other's own logic, but together they meant a pool's smallest size's read cache
(8,000 bits — coincidentally exactly the pool's own STARTING buffer capacity at capacityLevel 0) was
eligible to fill the moment the pool unlocked, while that same size's disk build was providably
unaffordable for an entire Capacity level (until the pool grew ten-fold, to 80,000 bits). Every bit
`tickPoolBufferFill` funneled into the buffer, `tickDiskAutoFill`'s cache-fill pass immediately
diverted right back out into `diskCache` — not destroyed, but invisible to the player (no UI surface
shows cache contents until a disk of that size exists to receive them) and unusable (the cache can
only flush into a disk that can't yet be built), so the pool's own visible buffer balance, and any
Data Lake overflow riding on that buffer ever reaching full, could stall indefinitely at low
production. **Diagnosis.** Traced the tick pipeline order in `tickGame`
(`tickIntroAutoInvest` → `tickPoolBufferFill` → `tickDataLakeAutoBuy`, with `tickDiskAutoFill` run
earlier in the same tick), ruled out tier01's own auto-convert priority as the mechanism via a
throwaway scratch simulation (bits were fully conserved end to end, just relocated), then confirmed
via a second scratch script logging `diskCache`/`poolBuffers` across ticks from a fresh save that the
buffer's own inflow was being drained into the cache every tick it grew, and that
`getDiskCost(FIRST_DISK_SIZE)` (80,000) exceeds `getPoolBufferCapacity` at capacityLevel 0 (8,000) by
exactly 10×. **Fix (final).** A first attempt kept the original eager pre-fill-on-unlock behavior
alive via an affordability OR-clause (`everBuilt || getPoolBufferCapacity(state, poolIndex) >=
getDiskCost(unitBits)`), matching the original design's own "have the cache ready before the disk
finishes" intent for whichever pool level actually reaches affordability. On review, that intent was
rejected outright: the cache should never drain the buffer without an existing reason to — a disk of
that size must already exist to receive it. The fix landed as a single, unconditional requirement in
`tickDiskAutoFill`'s `readCacheEligibleSizes`: a size is only cache-eligible once
`disksBuiltTotal[unitBits] > 0` — no capacity/affordability branch at all, and no eager pre-fill on
pool unlock. This supersedes the original "pool cards gated on a capacity threshold too; read cache
pre-fills on pool unlock" design entirely, not just patches around its interaction with the later
decade-of-10 ladder: the cache now always starts empty and only ever fills once the player has built
something for it to feed. **Verification.** Two regression tests: one confirms a same-reference
no-op when a pool's capacity is easily affordable but no disk of that size has ever been built
(matching the reported bug — no eager pre-fill regardless of capacity); the other confirms the cache
DOES start filling the moment a disk exists, even at the pool's own starting (unaffordable-looking)
capacity, so genuine use of the cache is unaffected. `yarn test`: 1696/1696 green. `yarn build`
succeeds.

### Pool gauge's separate bottom-half Data Lake arc replaced with one dial that switches meaning once the buffer is full

Player feedback on the pool `MultiplierGauge`'s two-semicircle design (top half: fill-based Speed/
Bandwidth multiplier; bottom half: that pool's own Data Lake overflow rate, added when Data Lakes
were reworked to feed directly off pool overflow — see "Pool cards gated on a capacity threshold too;
read cache pre-fills on pool unlock" above for the mechanic, and the "Fill-based Speed/Bandwidth
multiplier" section this dial visualizes): "by downwards, I meant the same existing speedometer shall
continue instead of a separate speedometer... the Data lake shall have its own bar which takes in the
overflow from the pool bar. The existing arc will represent the data lake multiplier once pool memory
is full. There is clean transition at 50%." Two distinct asks: (1) the two readings should share ONE
dial, not two visually separate gauges glued together, and (2) the Data Lake's own accumulated LEVEL
(as opposed to the rate the arc shows) needed its own separate visual, fed by the buffer's overflow.

**Why 50% is the natural switch point.** `FILL_MULTIPLIER_MIN_PERCENT` (the fill-based multiplier's
own floor, reached exactly once the relevant buffer is 100% full) and `DATA_LAKE_OVERFLOW_MAX_PERCENT`
(the lake reading's own ceiling, at its highest right as that same buffer transitions to full and
overflow begins) are BOTH 50 — not a coincidence being newly exploited here, but a property already
latent in the two constants (`layers.js`) since the Data Lake overflow mechanic was designed to pick
up exactly where the fill-based multiplier bottoms out. Plotting both readings on the SAME
0..`FILL_MULTIPLIER_TAP_CAP_PERCENT` (200%) angle scale — rather than the overflow rate's own native
0-50% range mapped onto a separately-scaled bottom semicircle, as the previous design did — means the
needle is already sitting at the exact angle the lake reading picks up from the instant the switch
happens: no jump, no discontinuity, "the same speedometer continues."

**Fix.** `MultiplierGauge` drops the `lake` prop and its dedicated `GAUGE_BOTTOM_MIN_ANGLE`/
`GAUGE_BOTTOM_MAX_ANGLE`/`fractionToBottomAngle` bottom-half machinery entirely, replaced with a
`mode` prop (`'multiplier'` default, or `'lake'`). In `mode="lake"` the component draws a single
`theme.color.info` arc from 0 to `totalPercent` on the ORDINARY top-half angle mapping
(`percentToGaugeAngle`, unchanged) — no `basePercent`/bonus-arc split, since there's no "tap bonus"
concept for a lake reading. `ByteFoundryPage`'s pool-card loop picks the mode per pool from
`poolBufferFull` (already computed for the buffer tile's own disabled state): `mode="multiplier"`
feeding `poolBaseMultiplierPercent`/`poolMultiplierPercent` while the buffer has room, `mode="lake"`
feeding `0`/`getDataLakeOverflowRatePercent(state, poolIndex)` once it's full. The `aria-label` swaps
correspondingly ("pool N fill-based bandwidth multiplier" vs. "pool N data lake overflow rate") but
the `role="progressbar"`/`aria-valuemin`/`aria-valuemax` contract stays IDENTICAL in both modes
(always `0`/`FILL_MULTIPLIER_TAP_CAP_PERCENT`), since both quantities now share that one scale — no
second hidden progressbar is needed the way the old bottom-half reading required. Separately, a new
Data Lake LEVEL bar — a second `FillableStatCard` (the same reusable fill-gradient tile the Memory
buffer itself uses) rendered directly below the buffer tile, always visible rather than gated behind
the pool card's `isExpanded` disclosure — shows `getDataLakeCurrentDiskFillFraction` as a 0-100% fill,
colored via `$progressColor={theme.color.info}` to visually match the gauge's own lake-mode arc. This
is a genuinely different quantity from the gauge's lake-mode reading (a RATE, tapering as the current
disk fills) even though both derive from the same underlying disk-fill state — the bar shows how full
the currently-open disk actually is, the gauge shows how fast bits are currently arriving into it.
**Verification.** A new `App.test.jsx` test seeds pool 1's buffer at its own full derived capacity and
confirms: the old "fill-based bandwidth multiplier" labeled progressbar is gone, a "data lake overflow
rate" progressbar exists in its place with the same `aria-valuemax` and a value of exactly
`DATA_LAKE_OVERFLOW_MAX_PERCENT` (matching `FILL_MULTIPLIER_MIN_PERCENT`, confirming the clean
transition), and the new "data lake current disk fill" bar reads 0% for an untouched lake. The three
pre-existing gauge tests (asserting the multiplier reading on an EMPTY buffer, where the pool stays in
`mode="multiplier"`) needed no changes — they exercise a state this redesign leaves untouched.
`yarn test`: 1697/1697 green (+1). `yarn build` succeeds.

### The built-only read-cache gate stranded bits a legacy save's cache had already staged under the reverted eager-pre-fill design

Devin review on PR #562 caught a real migration gap in the "built-only" cache-eligibility fix above:
`tickDiskAutoFill` already had a self-heal loop that refunds any `diskCache`/`diskReadCacheFlush`
entry for a size that's no longer cache-eligible back into that size's own pool buffer — but its
condition only checked `isDiskReadCacheEligible(size)` (whether the size is even the pool's OWN
smallest denomination at all), not the newer, stricter `disksBuiltTotal[size] > 0` requirement the
built-only fix introduced. The eager-pre-fill-on-unlock design this PR reverts had already shipped to
the live GitHub Pages deployment (this repo auto-deploys `dist/` on every push to `main`, independent
of any version tag — see "Automation workflows"/`deploy.yml`) before being caught and reverted within
this same PR, so a real player's save, not just a hypothetical one, could already be sitting on
`diskCache[unitBits]` bits for a size with zero disks built — bits that would become permanently
unreachable the instant this fix landed: excluded from `readCacheEligibleSizes` (so never flushed into
a disk), and not caught by the self-heal loop either (since `isDiskReadCacheEligible` alone still
said "yes" for that size). **Fix.** The self-heal loop's condition became `isDiskReadCacheEligible(size)
&& (builtTotal[size] ?? 0) > 0` — refund whenever EITHER half fails, not just the size-shape one — so
a legacy save's stranded cache is refunded into its own pool buffer on the very next tick after
upgrading, using the exact same refund mechanism (and lack of any pool-capacity clamp — this is a
currency-preservation guarantee, not a display concern) the original self-heal case already relied on.
`diskReadCacheFlush` needed no equivalent change: a flush can only ever start once an empty disk of
that size already exists, so `disksBuiltTotal[size] > 0` is already guaranteed for any in-flight
flush — no legacy save could have a stale flush entry for an unbuilt size. **Verification.** A new
regression test seeds `diskCache[FIRST_DISK_SIZE]` with no matching `disksBuiltTotal` entry
(reproducing exactly the state a save from before this PR's fix could be in) and confirms the cache is
refunded into `poolBuffers[1]` on the next tick rather than sitting stranded. `yarn test`: 1698/1698
green (+1). `yarn build` succeeds.

### A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim

A third Devin finding on PR #562, against the gauge redesign above: the "clean transition at 50%"
claim assumed the fill-based multiplier reads exactly `FILL_MULTIPLIER_MIN_PERCENT` (50) the instant
a pool's buffer becomes full, since that's the BASE value's own floor — but `getPoolMultiplierPercent`
(what the gauge's needle actually follows pre-switch) is base PLUS any live, still-decaying tap bonus
(`poolTapBonusPercents[poolIndex]`), which is not forced to 0 just because the buffer is full —
`tapPoolBuffer` blocks NEW taps once full, but a bonus banked moments earlier decays only at the
ordinary `FILL_MULTIPLIER_TAP_DECAY_PERCENT_PER_SECOND` (1) rate. A player who tapped repeatedly while
the buffer was nearly full (wide headroom for the bonus to grow into) could still be sitting on a
sizeable bonus the instant it crosses to full — the gauge would then switch to `mode="lake"`, whose
reading is hard-capped at `DATA_LAKE_OVERFLOW_MAX_PERCENT` (50), so the needle would visibly DROP
rather than continue smoothly. **Fix.** `tickFillMultiplierDecay` now forces a pool's own tap bonus to
exactly 0, instantly, once `getPoolBufferFillFraction(state, poolIndex) >= 1` — not merely
decayed/headroom-truncated at the ordinary rate the way an over-cap bonus already was (see the
Data Stream's own equivalent truncation, which this pool-side logic sits right beside). This is
semantically consistent too, not just a visual patch: once a pool's buffer is full, the fill-based
reading it was boosting is itself retired (the gauge no longer shows it), so a bonus riding on top of
a retired reading has nothing left to represent. The one acknowledged gap: `tickFillMultiplierDecay`
runs BEFORE `tickPoolBufferFill` in the tick pipeline (see `tickGame`), so a bonus present at the
EXACT tick a buffer transitions from not-full to full is zeroed on the FOLLOWING tick, not that same
one — a sub-100ms residual at the live ~10Hz tick rate, and typically much smaller still since
`tapPoolBuffer` already refuses new taps well before that point. **Verification.** The existing test
asserting a pool's over-cap bonus gets headroom-truncated to 150 (not zeroed) at a full buffer was
WRONG under the new rule and updated to expect exactly 0, plus a check that
`getPoolMultiplierPercent` reads precisely `FILL_MULTIPLIER_MIN_PERCENT` afterward; a second new test
confirms a pool with room left in its buffer is unaffected (bonus untouched). `yarn test`: 1699/1699
green (+1, net — one existing test's assertions changed, one new test added). `yarn build` succeeds.
