# MainPage reference

Referenced from `CLAUDE.md`'s Architecture section. Read this before touching
`src/pages/MainPage/index.jsx` or its styled sub-components/layout — it's the full field-by-field
reference for the compact tier-row grid, the sticky HUD balances, the Game/PP-Upgrades view
toggle, and every disclosure/badge/accessibility convention `MainPage` follows. `MainPage` is
deliberately purely game — live controls, numbers, and status text only. Every mechanic's
evergreen *explanation* (what used to live inline here as click-to-expand `InfoDetails` prose)
now lives on the separate `src/pages/InfoPage/index.jsx` ("Guide"), reachable via the `ℹ️ Guide`
link beside the page title; see CLAUDE.md's Architecture section for the split and
`onOpenInfo`/`onBack` wiring. `MainPage` is only ever rendered while the Byte Foundry gate isn't
active — i.e. `state.intro.mainGameUnlocked` is true and the player hasn't voluntarily navigated to
`ByteFoundryPage` via its own "⚙️ Byte Foundry" link (`onOpenFoundry` prop) — see "Byte Foundry
page" below and docs/ECONOMY_REFERENCE.md's "Byte Foundry" section.

**Byte Foundry page** (`src/pages/ByteFoundryPage/index.jsx`). The tap screen — a separate, much
simpler page from `MainPage`, sharing the same `game` prop shape (`{ state, actions, ... }` from
`useIncrementalGame`, lifted into `App.jsx` — see CLAUDE.md's Architecture section) but with no
view-tab system of its own. Unlike the old design, nothing here ever goes read-only — the page
renders identically whether reached as the mandatory gate or voluntarily; `onBack` (present only
once `state.intro.mainGameUnlocked` is true) is the only thing that differs.

Sections, top to bottom: the shared `components/OfflineProgressNotice` (see
`docs/COMPONENTS_REFERENCE.md`), rendered right after the page title whenever the hook reports a
non-null `offlineProgress` — the Byte generator's passive production and auto-transfers already
catch up correctly during offline progress regardless of which page is active, so this page shows
the same "Welcome back!" notice `MainPage` does, not just a silent balance jump; a `Header` row
(`display: flex`, `justify-content: space-between`, the same title/nav-link placement convention
`MainPage`'s own `<Header>` and `InfoPage`'s own `<Header>` already use) pairing the page title with
a "← Back to game" button (`aria-label="Back to game"`, same convention as `InfoPage`'s own back
button, calling `onBack`) — shown only once `onBack` is passed, i.e. only when reached voluntarily
post-`mainGameUnlocked`, since the mandatory gate has no way out — rather than the exit sitting alone
at the bottom of the page; a one-line status explainer below that (two variants — pre-unlock
instructions, or a post-unlock acknowledgment that transfers keep working indefinitely, with no
per-cycle cap to run into); a `TilesRow` (flex row) holding a single `FillableStatCard`
— a `styled(StatCard)` wrapper that applies `components/Button`'s own `progressFill` gradient
directly to the card via its `$progress` prop, so the tile fills toward its own capacity the same
visual way every button on this page already does. `aria-label="byte foundry balance"` (`$progress`
= `bits / capacity`), has a "Memory" label above `{bits} / {capacity}` — both numbers scaled into
the same unit, picked off `capacity` (raw bits before the Byte generator exists, since before that
capacity is always exactly 8 bits/1 Byte with nothing meaningful to denominate in yet, then
B/KB/MB/…/QB by 1000 each step once it does, reusing `TIER_DEFINITIONS`' own tier symbols — see
"Numbers are formatted" below) — plus a hidden `role="progressbar"` (`aria-label="byte foundry bit
balance"`) — followed by the production-rate readout: below `BITS_PER_BYTE` (8) bits/sec, a "+N bits/sec" line
paired with a visible 8-block segmented `role="progressbar"` (`aria-label="byte foundry production
rate"`, one block per whole bit/sec, filled left to right) showing rate progress toward 1 Byte/sec;
at/above that, the block bar is replaced by a single "+N Byte(s)/sec" line instead
(`getIntroProductionRate(intro) / BITS_PER_BYTE`). There is no separate Cache tile — the same
progress the old Cache 1KB tile showed (progress toward the next convertible 1000-bit chunk) is now
read directly off the active transfer block's own fill (see below).

A large, always-full-width tap button (`aria-label="tap to generate a bit"`, disabled once `bits >=
capacity`) calling `actions.tapIntroBit` — renders LAST on the page, after every other section
(Actions/Storage/transfer blocks), rather than up near the Memory tile, since once `byteCreated`
passive production is the primary loop and tapping is a secondary/backup action; it stays exactly
as clickable either way, and never shrinks or changes size. Deliberately carries no `$progress` fill
or hidden progressbar of its own — Memory's own tile above already shows the identical bits/capacity
fill, so a second meter on the tap button would just duplicate it; its `background` is set explicitly
(`theme.color.surfaceSunken`) since it doesn't get that from `progressFill`'s own gradient (which
used to double as the button's base fill). A "Combine into a
Byte" button (`aria-label="combine 8 bits into a Byte"`, calling `actions.combineIntroByte`,
`$progress` toward `INTRO_BYTE_COMBINE_COST`) shown only while `!byteCreated && bits >=
INTRO_BYTE_COMBINE_COST`; once `byteCreated`, the two independently-gated milestone buttons — placed
side by side in their own `MilestonesRow` (`display: flex`, each button `flex: 1`) rather than
stacked, since they're a paired choice, not a list. Each renders its own two-line
`MilestoneButtonContent` (`display: flex; flex-direction: column`, a plain local wrapper — NOT
`components/Button`'s own `ButtonContent`, which only ever lays out a single icon+label row) instead
of a single inline label: a short symbol/label/multiplier line on top, and its own cost — what
activating it actually spends — on a second `MilestoneCostLine` below, in smaller/muted text, rather
than crammed inline in parentheses. "Sacrifice for 10x Capacity" (top line `💥 Memory ×10` — "Memory"
matching the same term the balance tile above already uses for `capacity`, so the button's purpose
reads at a glance even compressed; cost line `formatBitsInNearestUnit(intro.capacity)`, since a
Sacrifice always drains the full current capacity — `aria-label="sacrifice all bits for 10x
capacity"` still carries the full description for assistive tech, disabled unless `bits ===
capacity`, calling `actions.pickIntroCapacityMilestone`, `$progress` toward `capacity`) and "Invest
for Double Production" (top line `⚡ Bandwidth ×2` — "Bandwidth" naming the bits/sec production rate
this multiplies; cost line `formatBitsInNearestUnit(investCost)`, live/dynamic information worth
keeping visible even in the shortened label; `aria-label="invest bits for double production"`
carries the full description — cost `getIntroProductionMilestoneCost(intro.productionMilestoneTier)`
— disabled unless `bits >=` the (bits-denominated) cost **and** `intro.productionMilestoneTierClaims
< getIntroProductionMilestoneMaxClaims(tier)`; this cost is entirely independent of `capacity`, so
the button is frequently enabled well before Memory is full — see docs/ECONOMY_REFERENCE.md's "Byte
Foundry") — rendered as ordinary, independent buttons with no coupling between their enabled states;
each pairs with its own hidden `role="progressbar"` (`aria-label="byte foundry sacrifice
progress"`/`"byte foundry invest progress"`, the latter's max set to the Invest cost in bits, not
`capacity`), matching `MainPage`'s own Buy/Upgrade button convention below.

Once `isStorageUnlocked(state)` — Memory's own capacity has reached `INTRO_STORAGE_UNLOCK_CAPACITY`
(10 KB in Memory's own scale, 80,000 bits; see `game/layers.js`), a later, more deliberate reveal
than `revealed`'s own 1000-bit gate above (`storageRevealed` locally) — a separate labeled
**Storage** section (`StorageSection`, a `styled(StatCard)`, `aria-label="byte foundry storage"`) —
kept out of the plain button stack above so it reads as its own grouped mechanic rather than one
more item in the same list as Sacrifice/Invest. Inside it: a "Build Storage Bank" button
(`aria-label="build storage bank"`, calling
`actions.buildStorageBank`, `$progress` toward `getStorageBankCost(getStorageBankSize(state))`)
whose visible label always tracks `getStorageBankSize(state)` — an independent ladder that
walks tier01's own per-unit level-cost sequence (1000 bits/"1 KB", then 10,000/"10 KB", then
1,000,000/"1 MB" — skipping 100,000/"100 KB", since `tier01`'s own cost-epoch exponent sequence
skips it too) and only advances once `STORAGE_BANK_LADDER_CAP` (10) banks have ever been built at
the current size, decoupled from tier01's own CURRENT price; disabled below that cost. The build
cost itself (parenthesized in the label, and in the button's `title`) renders via
`formatBitsInNearestUnit` — the nearest fitting B/KB/MB/…/QB unit for that specific bit amount, same
as Invest's cost above — rather than a raw unitless bit count. Building only ever constructs an
EMPTY container — it does not fill it (see below).

For every size ever built (plus whatever's currently offered, even at 0 built, so its goal is
visible before the first one is banked — ascending, smallest first), a `StorageSizeRow` renders a
`StorageSizeLabel` (`"<size> banks (<full> full, <built>/<STORAGE_BANK_LADDER_CAP> built)"`) above a
`StorageBankSquaresRow` (`role="group"`, `aria-label="<size> storage banks"`) of exactly
`STORAGE_BANK_LADDER_CAP` `StorageBankSquare`s — a fixed-length strip read together as one progress
bar, filling left-to-right: **full** (leftmost, holding Memory's bits — accent border,
`aria-label="redeem <size> storage bank"`, calling `actions.redeemStorageBank(size)`,
clickable/highlighted only once `isStorageBankRedeemable(state, size)`, otherwise disabled with a
duller fill) — **empty** (built but not yet auto-filled — a dim muted-bordered fill,
`aria-label="empty <size> bank"`, always disabled) — **not-yet-built** (rightmost, outline-only
placeholder, `aria-label="not yet built <size> bank"`, always disabled). Redeeming a full bank
doesn't remove it or leave it permanently spent — it becomes empty again, re-entering the fillable
pool. `isStorageBankRedeemable`'s own gate is a genuine one-tick-only EXACT match against
tier01's *current* per-unit level cost (an earlier version used "at or below" — see
docs/DESIGN_HISTORY.md for why that undervalued a bank; see docs/ECONOMY_REFERENCE.md's "Byte
Foundry" section for the full behavior). No pause/resume control for auto-redeem
currently renders below the size rows — removed for now, with a UI to reintroduce it planned for
later (see `docs/DESIGN_HISTORY.md`); `intro.storageAutoRedeemEnabled` still exists and now defaults
`true` for every size (previously `false`), and `actions.setStorageAutoRedeemEnabled` stays fully
wired for whenever that control returns — unlike every other automation toggle on this page, no
prerequisite purchase gates it, and it doesn't even gate the smallest (1 KB) denomination's own
auto-redeem at all (see docs/ECONOMY_REFERENCE.md's `tickStorageAutoRedeem` row). Filling itself
(`tickStorageAutoFill`) has no UI control at all — it's fully automatic, every tick, no toggle:
Memory cascades into every currently-fillable empty bank, smallest size first, whenever there's
enough of it.

The section used to close with its own live progress row mirroring tier01's current purchase-block
progress (a `SectionLabel` + `RateBlocksRow` pair) — removed as redundant once the transfer-block row
below started reading that exact same value directly, making the two rows show identical information
side by side; the transfer-block row is now the only place this progress is shown.

Below the Storage section, once `isIntroConversionUnlocked(state)`, a **transfer-block row**
(`role="group"`, `aria-label="byte foundry kilobyte transfer blocks"`), preceded by a small
`SectionLabel` ("Transfer to Kilobytes (N left)"). Always renders exactly
`getPurchaseBlockSize(state)` blocks (`purchaseBlockSize`) — one per unit of tier01's (Kilobytes')
own current purchase block (see docs/ECONOMY_REFERENCE.md's "Byte Foundry" step 7). Each block's index is compared against
`blocksTransferred = tier01PurchaseProgress` (i.e. `purchaseLevelProgress[tier01]` — the same live
value, not a separately-tracked field) to pick one of three states: **consumed**
(`index < blocksTransferred`) — `aria-label="transferred block N"`, permanently disabled,
`title="Already transferred"`, rendered with a solid muted `background` (`$consumed`,
`theme.color.surfaceSunken`) instead of a `progressFill` gradient, reading as "done"; **active**
(`index === blocksTransferred`, at most one at a time) — `aria-label="convert <cost> into 1
Kilobyte"` where `<cost>` is `formatStorageSize(transferBlockCost)` and `transferBlockCost =
getIntroKilobyteConversionCost(state)` (tier01's own CURRENT per-unit level cost, not the fixed
`INTRO_BITS_PER_KILOBYTE_CONVERSION` rate — "1 KB" at a fresh cycle's level 1, "10 KB" once tier01
reaches level 2, and so on), `$progress` = the bits-toward-`transferBlockCost` fill,
`onClick={actions.convertIntroBitsToKilobytes}`, disabled only when `bits < transferBlockCost` —
**there is no per-cycle cap to run into** — paired with a hidden `role="progressbar"`
(`aria-label="byte foundry convert progress"`, `aria-valuemax={transferBlockCost}`);
**upcoming** (every later index) — `aria-label="locked transfer block N"`, always disabled,
`title="Transfer the block to your left first"`, empty (`background: transparent`). Read
left-to-right, consumed (filled)/active (partially filled)/upcoming (empty) blocks together look
like one continuous progress bar rather than a shrinking list. Because the row is a live mirror of
tier01's own purchase-block progress rather than a cycle-scoped budget, once
`blocksTransferred` reaches `purchaseBlockSize` (tier01's level completes), `purchaseLevelProgress`
itself resets to 0 for the next level, and the row rolls over to a fresh all-upcoming set for that
next level automatically — it never gets stuck fully `$consumed`. The very first successful transfer
(clicking the active block, or the `tickIntroAutoInvest` auto-convenience firing inside the shared
tick loop the instant a single unit is affordable — live, block by block, not just once a whole
batch accumulates at once — which advances `purchaseLevelProgress` by one unit per call, capped at
completing one tier01 level per call) sets `mainGameUnlocked: true`, and `App.jsx`'s own
`showingFoundry` render check reveals whatever page the
player was last on (typically `'game'`) the instant that flips — no button or handler needed here
for that transition itself.

Numbers are formatted via `formatMemoryBalance` (Memory — local helper in this file): raw
bits below 1 Byte, then B/KB/MB/…/QB by 1000 each step once above it (`getMemoryUnit`, reusing
`TIER_DEFINITIONS`' own tier symbols), floored (not rounded) at up to 3 decimal places
(`floorToDecimals`) once converted into a Byte-scale unit — same never-overstate rationale as
`formatCurrency` in `engine.js`, so a balance never reads as a complete unit ("1 KB") one tick
before it actually is — a display-only convention, internal state always stores raw
bits. Every standalone Memory-denominated cost (Sacrifice, Invest, Storage build) reuses this exact scale via a
further local helper, `formatBitsInNearestUnit = bits => formatMemoryAmount(bits, getMemoryUnit(bits,
true))` — calling `getMemoryUnit` with the cost itself (rather than a capacity paired with a balance)
picks whichever unit fits that specific amount, so a cost keeps scaling into KB/MB/… as it grows
instead of stopping at a fixed unit. A separate `formatStorageSize` helper uses a different,
Storage-*size*-specific scale (see "Storage" above and docs/ECONOMY_REFERENCE.md's "Byte Foundry"
section: 1000 bits is "1 KB" there, matching tier01's own cost ladder, not 1000 Bytes) — used both for
naming a bank's own *size* ("Build 1 KB Bank") and for the transfer block's own dynamic cost (the
active block's `aria-label`/`title`, since `getIntroKilobyteConversionCost` is the same underlying
value/scale as a bank size) — never for the bits actually spent to build a bank, which
always renders via `formatBitsInNearestUnit` instead. This page's gate reappears every time a real Prestige resets Memory
(`bits`/`productionAccumulator`) and the main-game-unlock gate (`mainGameUnlocked`) back to fresh —
along with tier01's own `purchaseLevels`/`purchaseLevelProgress` (see `prestigeGame` in
docs/ECONOMY_REFERENCE.md), which the transfer-block row above mirrors, so it starts over too — it's
not a one-time-ever gate, it sets the pace for every run — but the
Byte generator itself (byteCreated/capacity/tickSpeedSeconds/productionMultiplier/
productionMilestoneTier/productionMilestoneTierClaims) and Storage (`storageBanks`/
`storageBanksBuiltTotal`/`storageAutoRedeemEnabled` — but NOT `storageAutoRedeemedSizes`, which
resets every real Prestige) are both permanent and carry over — a bank already FULL when Prestige
fires stays full, giving the next cycle a head start — so the gate is a fast pit-stop after the
first cycle, not a full replay. Once unlocked, the page also persists as a screen the player can
return to at any time (via `onOpenFoundry`) rather than disappearing for the rest of the cycle — and
stays just as interactive there as on the gate itself.


- **Owned vs. level.** `Owned` (current amount, drives production) is its own figure. `Purchased`
  (lifetime buy count, still incremented on every purchase for display/back-compat purposes, but no
  longer used to derive cost/production scaling — see docs/ECONOMY_REFERENCE.md) has no separate cell.
  A tier's **level** and its progress toward completing it are tracked directly in state
  (`state.purchaseLevels[tierId]`, 1-indexed, and `state.purchaseLevelProgress[tierId]`, see
  docs/ECONOMY_REFERENCE.md) rather than derived from `purchased` via division — completing a level means
  buying `getPurchaseBlockSize(state)` pieces of it (a value that can grow over a run, see "Economy
  model"). This shows on the Buy button's visible text as `{progress}+{affordable}/{blockSize}` (e.g.
  `5+3/8` — how many of the current level's pieces are already bought, plus how many more are
  affordable right now, over the block size; the `+{affordable}` segment is omitted once nothing is
  currently affordable) inside `ButtonIcon` alongside the 🛒 glyph, pinned immediately next to the icon
  rather than centered — this keeps the progress text starting at the same x position across every
  tier row regardless of the cost string's length. This deliberately doesn't show the level number
  itself (unlike an earlier `Lv.{level} ({progress}/{blockSize})` version) — level is still available
  via the `aria-label` (a `(level N, X of Y purchased)` suffix in words) and the row's Details
  disclosure; the button text is purely "how close is the current level," echoing the even earlier
  pre-level-system `{purchased}+{affordable}` convention (see `docs/DESIGN_HISTORY.md`) now expressed
  as a fraction of the current block size instead of a raw lifetime count. The cost label itself
  (`BuyButtonCostLabel`, a `styled(ButtonLabel)`) is left-aligned rather than centered, and both it and
  the icon+progress slot (`BuyButtonIcon`) are pinned to a fixed half of the button's width — so every
  tier row's cost figure starts at the same x position (the button's horizontal center) regardless of
  digit count, instead of drifting as the progress or cost strings change length. This scoped pair
  lives only in `MainPage/index.jsx` and doesn't affect the shared `Button`/`ButtonIcon`/`ButtonLabel`
  components used elsewhere in the app (Prestige, Reset, PP Upgrades, …), which keep their default
  fixed-icon/centered-label layout.
- **Tier name display.** The tier row heading (`TierName`, a `styled.h3`) and the PP Upgrades page's
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
- **Balances (top HUD).** Money via `formatCurrency` and (once `!isFirstRun`) the Prestige Point
  balance are the only top-of-page blocks besides `Header` that use a centered `CenteredCard`
  (`styled(StatCard)`). Both are wrapped in a sticky `StickyBalances` container (background
  `theme.color.page`, matching the page ground so scrolled tier rows never show through the gap
  between the two cards): once scrolled past their normal position they pin to the viewport top and
  compress into a compact side-by-side bar, detected via an IntersectionObserver on a zero-height
  `BalancesSentinel` (falls back to always-expanded when IntersectionObserver is unavailable, e.g.
  jsdom); the stick position drops below `TopPrestigeBar` when it's showing, by that bar's own
  live-measured height (`topPrestigeBarHeight`, see below) rather than a guessed constant, to avoid
  underlap. There is no aggregate `+X/sec` line — each tier row's own `+X` figure is the per-tier
  replacement. In the compressed side-by-side layout, `CenteredCard`'s `align-items: center` (needed
  so its content centers when expanded) would otherwise let a flex-column child shrink-wrap to its own
  full content width instead of the card's allotted half-share — silently defeating the `overflow:
  hidden`/`text-overflow: ellipsis` truncation meant to keep a long balance or PP status string from
  visually spilling into the neighboring card. `Money` and the status `<p>` are both given an explicit
  `width: 100%` in the compressed styles specifically to pin them to the card's actual width so that
  truncation has something to truncate against (this selector matches `MoneyHero` too, below, since it
  extends `Money` and so still carries `Money`'s own generated class on the same DOM node). This
  compact PP display shows the production speed bonus once unlocked (`formatBonusOrMultiplier` — a
  percentage below +100%, an `"Nx"` multiplier at/above it, see "Percentages vs. multipliers" below),
  but — being always-visible, sticky chrome rather than an expandable disclosure — omits the "production
  speed bonus locked" caveat before it's bought; that fuller wording used to also show in the bottom
  `PrestigeCard`'s expandable description before that whole card was removed (see "Prestige and the
  Googol freeze" below) as purely informational and redundant with this button. Once Prestige is
  actually available (`canPrestige`, i.e. Money `>= PRESTIGE_THRESHOLD`), the PP display card itself doubles as a
  Prestige button — the whole card gets `role="button"`, `tabIndex={0}`, an Enter/Space `onKeyDown`
  handler, `onClick={actions.prestige}`, and a `title` ("Awards Prestige Points and resets your
  resources", the same wording used on every other Prestige button), driven by a `$actionable` prop on
  `CenteredCard` (cursor/hover/focus-visible styling only — its outline color is `theme.color.warn`, the
  same "prestige gold" token `Button`'s own `prestige` variant resolves to — no visible border/color
  change otherwise, since the disabled/enabled convention used elsewhere in the app relies on button
  `color`, which this plain `<section>` doesn't have). It's an additional, optional way to trigger
  Prestige alongside the `TopPrestigeBar`/`FullScreenOverlay` buttons. Before `canPrestige`, none of
  these props are set, so the card stays a plain, non-interactive display exactly as before. The Money
  display card never gets `$actionable` — only the PP display can trigger Prestige.
- **Money hero + Googol progress bar.** The Money `CenteredCard` renders a `MoneyHero`
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
  Directly beneath the hero figure (suppressed
  while `balancesCompressed`, since the compact sticky bar has no room for it), a `GoogolProgressTrack`/
  `GoogolProgressFill` bar shows progress toward Prestige becoming available, reusing the same
  `prestigeProgressPercent` (`getPrestigeProgressPercent(state.resources[MONEY_ID])`) — no separate
  economy calculation — paired with a `VisuallyHidden
  role="progressbar"` (`aria-valuenow`/`aria-valuemin`/`aria-valuemax`) for assistive tech and a small
  visible `GoogolProgressLabel` ("N% to Prestige") underneath.
- **HUD-scoped muted/accent text.** The PP header line's "N PP" figure renders via `HudMutedText`/
  `HudGoldText` — a fork of the app-wide `MutedText` (still hardcoded `#a3a3a3`, still used by
  `TierList`/`SpeedUpCard`/`GlobalTickspeedCard`/`TopPrestigeBar`/`FullScreenCard`) — token-driven
  (`theme.color.textMuted`/`theme.color.warn`) so this HUD region's own AA audit is meaningful without
  migrating those other regions out of turn (their own token migration is later sub-issues #138/#139).
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
  by `handleResetClick`, same convention as `openTierDetailIds`) — via a new `$expandable` `CenteredCard`
  prop (cursor/hover styling shared with `$actionable`, but its own `theme.color.accent` focus-visible
  outline rather than `$actionable`'s gold one, since this toggle has nothing to do with triggering
  Prestige). Expanding it renders a `GlobalMultipliersList` (`<ul>`, left-aligned to override
  `CenteredCard`'s own `text-align: center`, same technique `FullScreenCard`'s own `ul` already uses;
  text color `theme.color.textMuted`) listing every *global*
  (not per-tier) production multiplier and its current effect: the Prestige speed bonus (once
  `!isFirstRun`), Speed Up, Tickspeed, and Overclock — each gated on the same
  reveal/`everRevealed` flag its own card already uses (so a not-yet-relevant multiplier doesn't appear
  here before its own card would show it either), reading either its live effect (e.g. "+50% production
  speed from 50 unspent PP", "×4 production speed from 2 activations", "+1% faster ticks on every tier
  (Lv.1)", "Tickspeed upgrade's per-level rate is now 1.2% (was 1%) from 2 activations") or a "not yet
  unlocked/activated/active" status line when revealed but not yet bought. The
  per-tier purchase milestone multiplier (`getPurchaseMilestoneMultiplier`) is deliberately not listed
  here — it's per-tier, not global, and already shown in each tier row's own Details disclosure. The
  list is suppressed entirely (not merely restyled) while `StickyBalances` is in its compressed
  side-by-side form (`showGlobalMultipliers && !balancesCompressed`), since a multi-line breakdown
  would overflow that compact bar; the card itself and its toggle state stay unaffected — expanding
  again once scrolled back to the uncompressed layout shows it immediately with no re-click needed.
- **No description prose on this page.** Every mechanic's evergreen explanation (what used to live
  inline as `InfoDetails` disclosure bodies) moved to `InfoPage` (see the file header note above).
  Headings with nothing left to show (`SpeedUpCard`'s `<h2>`, the page `Header`'s `<h1>`, the Tier
  Autobuyers category's old shared "How these controls work" panel, the Milestones view's Tier
  Autobuyer Unlocks category) are now plain, non-interactive text — there's no click target because
  there's nothing to reveal. `GlobalTickspeedCard`/`OverclockCard`'s own `<h2>` and the Milestones
  view's Tier Tickspeed Autobuyers `CategoryHeading` still wrap a `Disclosure`
  (`styled.details`/`<summary>`, collapsed by default, the heading itself the only way to *open*
  it — no separate visible "expand" affordance) — but only when there's a genuinely *live game
  status* number to reveal (not a description of how the mechanic works): `GlobalTickspeedCard`'s
  `Lv.N — +N% faster ticks on every tier.`, `OverclockCard`'s current per-level rate, and the
  Milestones view's Tier Tickspeed Autobuyers start-Prestige/step pattern (see "Speed Up and
  Overclock cards"/"Milestones view" below) — each collapsed until the player clicks that heading.
  *Closing* it back is more permissive: clicking the heading again (native `<summary>` toggle) or
  clicking the revealed status line itself both work, via a shared `collapseDisclosure` click
  handler on the `Disclosure` element (`event.target.closest('summary')` short-circuits so the
  native toggle isn't fought, otherwise force-sets `.open = false` directly — safe since none of
  these `<details>` are React-controlled) — mirroring the tier row's own "click anywhere on the
  tile also toggles its Details" convention (see "Tier row details disclosure" below), scoped to
  collapsing only here since opening still requires the heading specifically. Each card's own
  action button sits *outside* its `Disclosure` as a sibling, so clicking Buy/Upgrade/Overclock
  never touches this handler at all. None of these is prose about *how* the mechanic works, only
  *what its current numbers are*.
- **Version display.** A `VersionText` (`styled(MutedText).attrs({ as: 'span' })`) shows the app's
  current version (`v{version}`, e.g. `v0.5.0`) inside a `HeaderMeta` row directly beneath the
  `<h1>Tens</h1>`, beside the "⚙️ Byte Foundry" link (a plain `GuideLink`-styled button calling the
  `onOpenFoundry` prop) and the `ℹ️ Guide` link (calling `onOpenInfo`) — all three always visible,
  no disclosure involved. Sourced from `package.json`'s `"version"` field via a build-time JSON
  import (`import { version } from '../../../package.json'`) — the single source of truth; no
  separate constant duplicates it.
- **Buy button.** Manual Buy always grabs as many units as are currently affordable up to the current
  level's cost-block boundary (`getTierAffordableQuantity`/`buyTierQuantity`, capped against
  `getPurchaseBlockSize(state)`) — no player-facing batch-size control. Renders its cost-block progress as an
  on-button gradient fill via `Button`'s `$progress`/`$secondaryProgress` props (green = units already
  bought this level, amber = units affordable now but not yet bought). Prestige gets the same single-tone fill
  treatment (spendable ÷ cost, or `prestigeProgressPercent`), and both pulse (`$pulse`) when
  actionable. Every PP-spending button (per-tier Unlock/Smart, Auto Speed Up, Unlock Speed Bonus,
  Auto-Prestige — all on the PP Upgrades page) carries the same single-tone fill (unspent PP ÷ that
  button's cost, `ppProgressPercent`), each nesting a `VisuallyHidden` `role="progressbar"`
  (`aria-valuenow` = PP balance capped at cost, `aria-valuemax` = cost).
- **Compact labels.** Buy/Prestige/Reset render compact visible text — an icon in place of the action
  word (🛒 Buy, ✦ Prestige, ↺ Reset) plus the cost, and (via `formatCost`) the paying tier's short
  `RESOURCE_SYMBOL` (e.g. `Ks`) instead of its full name — while each button's `aria-label` carries the
  full descriptive sentence (`"Buy ×10 for $100"`, `"Prestige (requires 1 Googol Money)"`, `"Reset
  game"`, …) used by assistive tech and `getByRole('button', { name })` tests. Buy's icon slot also
  carries the level+progress text (see "Owned vs. level" above) — see there for why it's pinned next
  to the icon rather than folded into the centered cost label.

**Game view vs. PP Upgrades view vs. Milestones view.** `MainPage` renders one of three views, toggled
by a local `useState('game' | 'upgrades' | 'milestones')` — still a single-page app with no router; the
toggle is just which JSX block renders. The `ViewNav` tab bar (`role="tablist"`) itself is now always
rendered (`MainPage` is only ever reached once the Byte Foundry's main-game gate is unlocked, see
"Byte Foundry page" below) — but its **Upgrades** tab specifically stays gated on `!isFirstRun`, since PP upgrades
genuinely don't exist before a first Prestige. **Game** and **Milestones** are both reachable before a
first Prestige now (a change from the previous "the whole tab bar waits for `!isFirstRun`" rule) — see
"Milestones view" below for why (the Chapters category needed this to be a real fix, not cosmetic). The
Upgrades tab's visible label is the shorter "Upgrades" (not "PP Upgrades" — kept out
of the tab bar to save space, since every purchase on that page already costs Prestige Points, so
spelling that out on the tab itself is redundant); "PP Upgrades" remains the term used throughout this
doc/the codebase's own comments for the view/page as a concept. That tab shows a `NavDot`
(`aria-label="PP upgrade available"`) whenever `hasAffordablePpUpgrade` is true — since a tier's
autobuyer unlock and its tier tickspeed autobuyer are both free milestone unlocks now (see "Tier
Autobuyers" below), this only checks tier Smart purchases plus the global automations' PP costs, not
the two free unlocks (the Money-funded global tickspeed multiplier *itself* doesn't factor in either,
since it's not a PP purchase — only its automation toggle, Tickspeed Autobuyer, does). The Milestones
tab carries no `NavDot` — it's a read-only status page, nothing on it is ever "affordable". Money/PP
balances stay visible across all three views; `GlobalTickspeedCard`, `TierList`, `SpeedUpCard`,
`OverclockCard`, and the Reset button are Game-view-only; every PP-spending control lives on the
Upgrades view; the Milestones view is its own standalone read-only page (see "Milestones view" below).

**Global Tickspeed card (Game view).** Unlike every other automation upgrade, this one is
Money-funded (not PP-funded) and lives on the Game view as its own `GlobalTickspeedCard`, rendered
alone at the very top of the Game view — above `TierList`/tier 1, before anything else — since it's
relevant from the very start of a run, well before Speed Up, Overclock, or Prestige are, or even the
tier list itself. `SpeedUpCard` and `OverclockCard` (see below) render together instead, in their own
row *below* `TierList` — the two soft-reset controls, which share the same last-tier prerequisite,
form their own cluster there rather than sharing this card's row at the top; `GlobalTickspeedCard`
deliberately doesn't join them, since it's the one control relevant before the last tier is even
reachable. (Earlier iterations tried grouping all three speed-related cards together at the top; this
was reverted to the current split — Tickspeed alone at top, Speed Up/Overclock below the tier list —
per direct player feedback.) See "The global tickspeed multiplier"/"Overclock" below for the underlying
`engine.js` mechanics. The heading text itself never changes
(`Tickspeed`, no level/percent readout — shortened first from `Global Tickspeed Multiplier` to
`Global Tickspeed`, then to just `Tickspeed` once this card started sharing a row with `SpeedUpCard`
during that earlier iteration and the `Global` prefix stopped earning its width against `SpeedUpCard`'s
own two-word heading; no behavior change, and the shortened heading stuck even after the two cards
split back apart — the `GlobalTickspeedCard` component/prop names are unaffected either way, this is
purely the rendered heading text), but it lives inside a `Disclosure`'s `<summary>` (see "No
description prose on this page" above) — collapsed by default, clicking it is the only way to reveal
the current level and cumulative speed bonus line (`Lv.N — +N% faster ticks on every tier.`), which
renders **only** once `isGlobalTickspeedActive` in the first place — so the card's shape stays the
same both before the multiplier is ever bought (the line doesn't exist at all) and after (the line
exists but starts collapsed). The `+N%` figure is rendered via `formatGlobalTickspeedBonusPercent` (`MainPage/index.jsx`),
called with `precise: true` through `formatBonusOrMultiplier` (see "Percentages vs. multipliers"
below), not the plain whole-number `formatBonusPercent` — the global
multiplier's regular 1%-per-level compounding (see `GLOBAL_TICKSPEED_PRODUCTION_STEP`/"The global
tickspeed multiplier" below) lands on fractional values, so it shows up to 2 decimal places
(trimming a trailing `.00`/trailing zero, same style as `formatRate`) while the cumulative bonus is
still under 100%, then rounds to a whole percent once it reaches/crosses 100% (×2.00), matching
every other multiplier badge in the app once the numbers get large. The button carries `$progress`
(Money ÷ cost) the same way Buy does, reading `🌐 Enable for {cost}` before the first purchase or
`🌐 Upgrade for {cost}` after — its `aria-label` alone still spells out the current cumulative bonus
(same `formatGlobalTickspeedBonusPercent` formatting) for assistive tech, independent of the
collapsed/expanded visual state. A `globalTickspeedCardEverRevealed` flag (seeded from/latched to
`isGlobalTickspeedMultiplierUnlocked(state)`) follows the same `everRevealed` pattern as
`SpeedUpCard` — once tier02 has ever been owned (or the multiplier is already active),
the card stays visible rather than disappearing if tier02's owned count is later reset by a
Prestige/Speed Up; Reset clears the flag alongside `speedUpEverRevealed`. It
needs no `!isFirstRun` gate — unlike the PP Upgrades page, it has nothing to do with Prestige Points, so
it's available (once tier02 is owned) even during a player's very first run. Clicking is optional: once
`buyTickspeedAutobuyer` is bought (PP-funded, see "Prestige Points, autobuyer unlock, and the tickspeed
multiplier" below), `tickGame` calls `buyGlobalTickspeedMultiplier` automatically every tick, so the
level climbs on its own whenever Money allows — the manual button works identically either way.

**Tickspeed multiplier (Game view, per tier).** Every unlocked tier's row carries a Money-funded
`UpgradeButton` in the grid slot the old Upgrade/Unlock button used to occupy — enabled by default from
the moment the tier itself is unlocked, with **no** autobuyer-unlock or PP prerequisite at all (see
"Prestige Points, autobuyer unlock, and the tickspeed multiplier" below). Clicking it spends
`getTickspeedMultiplierCost(tierId, currentLevel + 1)` of the tier's own resource via
`actions.buyTickspeedMultiplier`, raising that tier's tickspeed level by 1 — each level speeds up that
tier's own delivery frequency by another 10% (`getTickspeedProductionMultiplier`, divided into the
tier's effective period rather than multiplied into its production credit — see "Tier production
tickspeed" below); it changes **neither** the amount delivered per batch **nor** autobuyer
purchase-attempt frequency (that rate is flat). Visible text is `⚙ {cost} {symbol}` — a single ⚙
icon (matching the tier tickspeed autobuyer's own icon-only status badge on the PP Upgrades page)
identifies the button as the tickspeed control; no separate icon marks the marginal effect, since
it's always exactly `TICKSPEED_PRODUCTION_STEP` (every level adds the same fixed 10% step) and
implied by the button itself — `aria-label`/`title` still spell out the full "+10% faster ticks"
sentence for assistive tech; the button's `title` is the only place on this page the cumulative
speed bonus (as opposed to the fixed marginal step) is shown at all — an earlier version also
carried a compact `⚙ +N%`/`⚙ 2x` badge beside the tier name, removed as one automation icon too
many for a row already carrying the tier's autobuyer state (see "Unit autobuyer status" below); the
cumulative figure is still in the row's own Details disclosure (see "Tier row details disclosure"
below).

Whenever the **last tier**'s currently-owned count is >= `getPurchaseBlockSize(state)` (a full
level, see docs/ECONOMY_REFERENCE.md; `isLastTierTickspeedXpUnlocked`, see "The last tier's XP-funded
tickspeed" below), this Money-funded `UpgradeButton` is replaced — in the same
grid slot — by a quick-access **Speed Up** button instead (`⏩ ×{next}`, `actions.speedUp` — the same
action `SpeedUpCard`'s own button triggers, with a distinct `${tier.name}'s row: …` aria-label prefix so
the two same-purpose buttons don't collide under `getByRole('button', { name })` in tests), rather than
the manual XP-consume button (`🧬 {current unspent XP} XP`, `actions.consumeXpForLastTierTickspeed`)
this slot used to show — reaching a full last-tier level is also exactly when Speed Up tends to be
close, so this reuses the slot for the more actionable control. The underlying XP-funded tickspeed
mechanic keeps running unattended: it's still spent automatically once per tick by the tier tickspeed
autobuyer (see "Automation" in docs/ECONOMY_REFERENCE.md's "The last tier's XP-funded tickspeed"), and
its current unspent-XP balance/next-consumption minimum still show in the row's Details disclosure (as
an "XP Tickspeed" line) — there's simply no manual consume button for it any more. The Details
disclosure keeps working unchanged for the last tier otherwise, still reading the XP-funded
multiplier instead of the Money-funded one. This is a live check, not a one-time unlock: a
Prestige/Speed Up resets the last tier's owned count to 0 along with every other tier's, which reverts
this slot back to the normal Money-funded button until the player buys back up to a full level — see
"The last tier's XP-funded tickspeed" below for why.

**No per-tier automation icon on the Game view row.** A tier row's `name` grid area (shared by
`TierName`) holds only the tier's symbol now — no tickspeed-bonus badge (see "Tickspeed multiplier"
above) and no autobuyer status icon. An earlier version showed an always-visible, read-only
`PpUpgradeBadge` here (a single 🤖 glyph, full opacity while active / dimmed `$dimmed` while paused,
via the same icon-instead-of-text convention every other automation status badge in the app still
uses — the tier tickspeed/global tickspeed/Auto Speed Up/Auto-Prestige Autobuyer badges on the PP
Upgrades page, and the Auto-Prestige/Auto Speed Up status lines — see their own sections below) once
a tier's unit-buying autobuyer was unlocked (`autobuyers`/`applyAutobuyerMilestones` — a free,
prestige-count-milestone-triggered unlock, not a PP purchase). Both removed to keep the Game view
row down to just the tier name plus live production/owned figures and the two action buttons —
autobuyer active/paused status is still visible (and, unlike the old read-only Game-view badge,
directly toggleable) on the PP Upgrades page's Tier Autobuyers category, via the same
`PpUpgradeBadge`/`PauseToggleButton`/`autobuyersEnabled`/`setAutobuyerEnabled` state (see "PP
Upgrades view" below).

**PP Upgrades view.** A `UpgradesList` groups every purchase into a small number of labeled
**categories** rather than one flat list — each category is a single `UpgradeCategory`
(`styled(StatCard)`, one `CategoryHeading` plus its rows) and each row inside it (`UpgradeRow`) is a
lean, unboxed flex row (no border/padding/background of its own — just a thin `border-top` divider
between consecutive rows), rather than the older one-`StatCard`-per-row layout: a category of *N*
purchases costs one card's worth of chrome, not *N*. Three categories, in order:
1. **Tier Autobuyers** — the `CategoryHeading` is a plain heading now (the shared "ℹ️ How these
   controls work" `InfoDetails` panel that used to explain unlock timing, pause/resume, and what
   Smart does moved to `InfoPage`'s own "Tier Autobuyers" section — see the file header note above);
   individual badges/buttons still carry no explanatory `title` text (only `aria-label`, for
   assistive tech), since that explanation lives on the Guide page instead. Per unlocked tier
   (`isTierUnlocked`, the usual gate — see docs/ECONOMY_REFERENCE.md; there's no
   next-tier preview any more, since there's nothing left to preview a cost for), up to three
   independent controls. **Autobuyer unlock** and the **tier tickspeed autobuyer** are no longer PP
   purchases at all — both unlock automatically once `prestige.count` reaches their own milestone
   (`getAutobuyerUnlockMilestone`/`getTierTickspeedAutobuyerMilestone`, see
   `applyAutobuyerMilestones` in docs/ECONOMY_REFERENCE.md). While locked, each renders as a dimmed,
   non-interactive `PpUpgradeBadge` reading `🔒 Prestige {milestone}` — deliberately terse, avoiding
   restating what the badge already shows: `aria-label` adds only the tier name and milestone number
   (needed for assistive tech, since the visible glyph alone doesn't name the tier) — rather than a
   Buy button, since there's nothing to click. Each row's controls are ordered tickspeed-autobuyer
   cluster before unit-buying-autobuyer cluster (an ordering that used to mirror the Game-view row's
   own now-removed ⚙-before-🤖 badge order — see "No per-tier automation icon on the Game view row"
   above — kept unchanged here since it's still a sensible reading order on its own): the
   **tier tickspeed autobuyer** cluster comes first (icon-only ⚙,
   dimmed while paused, same convention as the unit-buying autobuyer's below) with a secondary
   `PauseToggleButton` (`variant="ghost"`, `aria-pressed`-driven, same convention as the Global
   Automation category's own toggles below); see "Pause/resume for per-tier automations" below for
   the underlying `tierTickspeedAutobuyerEnabled`/`setTierTickspeedAutobuyerEnabled`. Second, nested
   together inside one shared `UpgradeRowControls` since Smart specifically modifies the unit-buying
   autobuyer's behavior, are the **unit-buying autobuyer** (persistent icon-only `PpUpgradeBadge` 🤖,
   dimmed via `$dimmed` while paused — see "Unit autobuyer status" above for the icon-instead-of-text
   convention shared by every automation status badge in the app — plus a secondary
   `PauseToggleButton`, `aria-pressed`-driven, for `autobuyersEnabled`/`setAutobuyerEnabled` — this is
   the only control for that state; the matching badge on the tier's Game-view row is read-only) and
   **Smart** (🧠, `actions.buySmartAutobuyer`, cost `getSmartAutobuyerCost` — still a genuine PP
   purchase), which only appears once the unit-buying autobuyer is unlocked; it shows as a button
   until bought, then a persistent plain "🧠 Smart" text badge (see below for why it has no
   active/paused state to iconify) — no pause toggle of its own (see that section for why). The row
   disappears only once Smart and the tier tickspeed autobuyer are *both* unlocked (which implies the
   unit-buying autobuyer is unlocked too, since Smart requires it). Once every tier has both
   (`allTiersFullyAutomated`), the per-tier list inside this category is replaced by a single "full smart
   autobuyer notice". The full unlock/pending status for every tier on both milestone tracks is also
   tracked in one place on the dedicated **Milestones** view (see below), independent of whether a tier
   is currently reachable in this run.
2. **Global Automation** — rows ordered by ascending PP cost: **Tickspeed Autobuyer** (🌐, automates the
   Money-funded *global* tickspeed multiplier, which itself lives on the Game view, not here — distinct
   from the per-tier tickspeed autobuyer in category 1 above), **Auto Speed Up** (⏩, an icon-only badge
   once bought, otherwise a button), both gated only on `!isFirstRun`; **Auto-Prestige Autobuyer** (🔁,
   only once `allTiersFullyAutomated && isAutoPrestigeActive` — i.e. Auto-Prestige must already be
   revealed *and* bought at least once — automates RE-LEVELING Auto-Prestige itself, distinct from
   activating it in the first place); and **Auto-Prestige** (✦, only once `allTiersFullyAutomated`;
   shows its current level inline when active). The Auto-Prestige Autobuyer's cost
   (`AUTO_PRESTIGE_AUTOBUYER_COST`, 500 PP) sits between Auto Speed Up's (100) and Auto-Prestige's own
   initial-activation cost (1000), which is why it's ordered directly before the Auto-Prestige row
   despite being a "meta-automation" of it. Each row's icon matches the icon of the feature it
   automates (🌐 Global Tickspeed card, ⏩ Speed Up card, ✦ Prestige card/button) — except the
   Auto-Prestige Autobuyer, which automates a PP-funded track (Auto-Prestige's own leveling) rather
   than a Money-funded feature, so it gets its own distinct icon (🔁) instead of reusing ✦ — so every
   row stays visually distinct from each other and from the per-tier automation icons in category 1
   above (🤖 Unlock, ⚙ tier tickspeed autobuyer, 🧠 Smart). Once bought, each of the four carries a
   small secondary `PauseToggleButton` (`variant="ghost"`, `aria-pressed`-driven) beside its badge/level
   text — Tickspeed Autobuyer's, Auto Speed Up's, and the Auto-Prestige Autobuyer's badge is the same
   icon-only, `$dimmed`-while-paused `PpUpgradeBadge` convention as category 1 above (no written
   "Active"/"Paused" anywhere), and Auto-Prestige's `Lv.N (every ~Xs)` line gets its own `✦`
   `PpUpgradeBadge` prefix, dimmed the same way while paused, in place of the text it used to append —
   see "Pause/resume for the global automations" above for the underlying `...Enabled` fields/setters.
3. **Production Bonuses** — currently just **Production speed bonus**; the whole category is omitted
   once it's bought, since there's nothing left to show there (unlike Auto Speed Up/Tickspeed
   Autobuyer, it has no persistent status badge — its effect is already visible in the PP balance
   display).

No item on this page uses the old "reveal one by one, cheapest first" teaser gating anymore — once the
page itself is reachable (`!isFirstRun`), every purchase shows immediately, subject only to a real
prerequisite (Smart requiring that tier's autobuyer already unlocked — the tier tickspeed autobuyer has
no such prerequisite, only its own milestone) or a deliberate progression gate (Auto-Prestige's
`allTiersFullyAutomated`, an intentional endgame gate, not a cost-ordering teaser).

The global tickspeed multiplier is *not* one of these PP rows — it's Money-funded and lives on the Game
view instead (see "Global Tickspeed card" above / "The global tickspeed multiplier" below);
only its automation toggle (Tickspeed Autobuyer) is PP-funded and lives here.

**Milestones view.** A third, read-only view (`view === 'milestones'`) tracking both
prestige-count-milestone-triggered unlocks in full — independent of whether a given tier is currently
reachable in this run (unlike the Upgrades view's "Tier Autobuyers" category, which only shows a tier
once `isTierUnlocked`). Reuses the same
`UpgradesList`/`UpgradeCategory`/`CategoryHeading`/`UpgradeRow`/`PpUpgradeBadge`/`TierNameLabel` styled
components the Upgrades view itself uses — structurally this is the same "categorized list of rows"
shape, just with every row read-only — rather than introducing a parallel set of near-identical styled
components.

**Chapters category** (`aria-label="chapters category"`) is the first category on this view, and —
unlike the two tier-milestone categories below it — **always renders**, with no `!isFirstRun` gate at
all. This was a deliberate fix, not an oversight: the Milestones tab itself used to be entirely hidden
until `!isFirstRun`, which meant a Chapters list living there would only ever become visible *after*
the very milestone ("Go Googol," a first Prestige) it was meant to track — permanently pre-checked, not
a real tracker. Lifting the whole `ViewNav` tab bar's Game/Milestones tabs out of that gate (see "Game
view vs. PP Upgrades view vs. Milestones view" above) fixes this for "Go Googol" specifically: it can
now genuinely be seen 🔒 before a first Prestige. Three static rows, no `role="progressbar"` on any of
them (booleans, not counts — nothing to show numeric progress toward):
1. **"The first KiloByte"** (`aria-label="The first KiloByte chapter"`) — ✅ once `state.intro.mainGameUnlocked`
   is true. Because `MainPage` (and this tab) is only reachable *after* `intro.mainGameUnlocked` in the
   first place, this row will always show ✅ the instant a player can see it at all — Chapter 1's
   completion is a precondition for reaching this page, not something observable in-progress here.
   Fixing that too would mean also surfacing a Chapters indicator on `ByteFoundryPage` itself (see
   below); that's an acknowledged, deliberate scope boundary, not an oversight.
2. **"Go Googol"** (`aria-label="Go Googol chapter"`) — ✅ once `state.prestige.count > 0`. The row this
   whole visibility fix was for — genuinely observable as 🔒 now.
3. **"Coming soon…"** (`aria-label="Coming soon… chapter"`) — permanently 🔒, no unlock condition, a
   placeholder for future chapters.

Each row shows a `PpUpgradeBadge` with `✅`/`🔒` plus the label; the `aria-label` on the badge itself
spells out `"{label} chapter complete"`/`"{label} chapter not yet complete"` for assistive tech. Zero
new `engine.js` logic backs this category — it reads `state.intro.mainGameUnlocked` and the existing
`state.prestige.count` only.

Below Chapters, two more categories, each listing all ten tiers via `getAutobuyerUnlockMilestone`/
`getTierTickspeedAutobuyerMilestone` (docs/ECONOMY_REFERENCE.md) — these two (unlike Chapters) **do**
stay gated on `!isFirstRun`, since both are keyed entirely off Prestige count, a meaningless concept
before a first Prestige:
1. **Tier Autobuyer Unlocks** — a green `✅ Prestige {milestone}` badge once
   `autobuyers[tier.id] != null` (no `title` — the visible text already says everything there is to
   say), otherwise a dimmed `🔒 Prestige {milestone}` badge whose `title` adds only the one piece of
   information the badge itself doesn't show (`You're at Prestige {prestige.count}`, not a restatement
   of the milestone) and whose `aria-label` spells out both the tier name and the milestone/current-count
   pair for assistive tech, plus a `VisuallyHidden role="progressbar"` (`aria-valuenow = min(prestige.count,
   milestone)`, `aria-valuemax = milestone`).
2. **Tier Tickspeed Autobuyers** — identical shape, keyed off `tierTickspeedAutobuyer[tier.id]`/
   `getTierTickspeedAutobuyerMilestone` instead.

The Tier Autobuyer Unlocks category's heading is a plain, non-interactive `CategoryHeading` — its
old one-sentence body ("Unlocks one tier per prestige.") carried no number the row list below it
didn't already show, so it moved to `InfoPage`'s "Milestones" section outright (see the file header
note above) with nothing left behind here. The Tier Tickspeed Autobuyers category's old body did
carry a number worth keeping in-game — its start/step pattern — so that `CategoryHeading` instead
wraps a `Disclosure` (see "No description prose on this page" above): collapsed by default,
clicking it reveals a `MutedText` line, `Starts at Prestige {N}, +{step} per tier after that.`,
computed from the same `getTierTickspeedAutobuyerMilestone`/
`TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP` constants `InfoPage`'s fuller prose version also uses,
rather than duplicated as a hardcoded string; the row list right below is still where the actual
per-tier detail lives. Text throughout this view (and the
matching locked badges on the Upgrades view's "Tier Autobuyers" category) avoids calling the unlock
"free"/"no PP cost" — since nothing on either milestone track was ever PP-funded to begin with, saying
so would only invite the question "as opposed to what."

Unlike the Upgrades view's Tier Autobuyers category, nothing on this page is ever a button — every row
is purely informational, so there's no `hasAffordablePpUpgrade`-style `NavDot` on this tab either.

**Speed Up and Overclock cards, below the tier list.** `SpeedUpCard` and `OverclockCard` render
together, in that order, inside a shared `SpeedCardsRow` flex row placed directly below `TierList` —
not above it alongside `GlobalTickspeedCard` (see "Global Tickspeed card" above for why the three
speed-related cards are split into a top card plus this separate bottom pair rather than one shared
row). Above the 40rem mobile breakpoint, `SpeedCardsRow` uses the same layout mechanics the old top
row did: each card shares the row equally (`flex: 1 1 8rem`). Below 40rem it switches to a single
column instead (`flex-direction: column`) — Speed Up above Overclock, matching their JSX/render
order — rather than staying side by side down to phone width (an earlier version's floor width was
tuned specifically to keep the pair side by side down to ~360-430px, e.g. an iPhone 14's 393px; see
`SpeedCardsRow`'s own comment for why that was superseded). The row renders (empty, zero height) even
before either card's own reveal flag is true, and works unchanged if only one of the two is currently
revealed — the lone card just fills the row/column.

A `speedUpEverRevealed` boolean (seeded from, and latched permanently true the first time,
`lastTierUnlocked`) drives `SpeedUpCard`'s render condition instead of a live check — once shown, it
stays shown, with its button simply going disabled rather than the card vanishing. It resets only on a
full Reset (`handleResetClick`), never on an ordinary Speed Up or Prestige. There is no equivalent card
for Prestige — the bottom Prestige panel that used to mirror this pattern (via a
`prestigeCardEverRevealed` flag) was removed as purely informational and redundant with the
`TopPrestigeBar`/`FullScreenOverlay`/PP-display-as-button ways to trigger Prestige (see "Prestige and
the Googol freeze" below).

`OverclockCard` — same orange-accented `StatCard` shape as `SpeedUpCard`'s cyan — is gated on the same
`lastTierUnlocked` condition (reusing the exact same `everRevealed`-flag pattern, its own
`overclockEverRevealed` boolean, latched permanently true and reset only on a full Reset alongside
`speedUpEverRevealed`) since both share the same last-tier prerequisite. `OverclockButton` (sized to
match `SpeedUpButton`/the tier rows' own Buy/tickspeed buttons) reads `⚡ {nextStep}%/lvl · Lv.{level}/{requirement}`
— e.g. `⚡ 1.2%/lvl · Lv.12/20` — `actions.overclock` on click, where `{nextStep}` is
`getGlobalTickspeedRegularStep(overclockCount + 1)` (engine.js) as a percentage — the per-level rate the
(Money-funded) Tickspeed upgrade's own regular levels would compound at *after* this activation, reusing
`formatGlobalTickspeedBonusPercent`'s trimmed-decimal formatting by passing it `1 + step` as if it were a
multiplier. Unlike `SpeedUpButton`'s `Lv.{lastTierLevelDisplay}/{speedUpRequirementDisplay}`, this
level/requirement pair is rendered from the *raw* `state.purchaseLevels[lastTier.id]`/
`getOverclockRequirement(overclockCount)` values directly — no -1 "completed blocks" display offset —
so the round numbers Overclock's own requirement ladder produces (10/20/30/…) show exactly as
`engine.js` computes them, matching the same raw level number the last tier's own Details disclosure
already shows, rather than introducing a second, differently-offset "level" reading for the same
underlying value; see `getOverclockRequirement`'s own comment in `engine.js` and "Overclock" in
docs/ECONOMY_REFERENCE.md. There is no per-tier-row quick-access Overclock button the way Speed Up gets
one on the last tier's own row once full (see "Tickspeed multiplier" above) — Overclock is meant to be a
deliberate, occasional decision reached via this card, not a frequent one-tap action.

`OverclockCard`'s `<h2>` also wraps a `Disclosure` (see "No description prose on this page" above)
whose body renders once `overclockCount > 0`: collapsed by default, clicking "Overclock" reveals a
`MutedText` line, `Tickspeed upgrade's per-level rate is now {currentStep}% (was 1%) from {N}
activation(s).`. `{currentStep}` is
`formatGlobalTickspeedBonusPercent(currentGlobalTickspeedStepDisplay)`, the rate *before* the next
Overclock (as opposed to `OverclockButton`'s own label, which always shows the *next* rate — see
above); this is the one Overclock-specific number not otherwise visible anywhere on the Game view.
Beyond that one figure, Overclock has no visible effect of its own to display
separately from the Tickspeed card above it — raising the global tickspeed multiplier's own
per-level step, rather than stacking a second multiplier alongside it, means the Tickspeed card's own
`Lv.N — +N% faster ticks on every tier.` status line (see "Global Tickspeed card" above) already
reflects Overclock's cumulative contribution once any levels are bought, with no separate "Overclock
bonus" figure needed anywhere else in the UI besides the money-balance breakdown's own summary line
(see below).

**Accessibility.** Each PP-spending button nests a `VisuallyHidden` `role="progressbar"` span, so the
explicit `aria-label` on the button itself is required (accessible-name computation would otherwise
recurse into the nested node). Buy/Prestige/Reset carry a `title` tooltip; Reset additionally wires
`aria-describedby` to a `VisuallyHidden` description (`reset-description` — the app's only
irreversible action). The Tickspeed/Speed Up/Overclock buttons used to wire `aria-describedby` to their
now-removed `InfoDetails` prose too; that's gone along with the prose itself (see "No description prose
on this page" above) — each button's own `title`/`aria-label` already carries the mechanic's short
explanation, so nothing about the accessible name/description regressed.

**Tier row visuals.** Each `TierLine` gets a thin `border-left` accent cycled from `theme.tierAccents`
(the per-mode 8-hue set in `theme/tokens.js`, replacing the old hardcoded `TIER_ACCENT_COLORS` array)
by `tierIndex % theme.tierAccents.length` (cosmetic only, kept off text/button colors to avoid
colliding with affordability semantics — those now resolve from `theme.color.good`/`warn`/`violet`/
`disabled`/`text`/`textMuted`/`borderStrong` rather than raw hex: `TierDetailsContent`'s
`ul`, `OwnedText`/`ProductionText` (each overriding the color `MutedText` — still hardcoded, #139
scope — would otherwise pass down), and the
Buy/tickspeed/XP-consume buttons all migrated in the same pass; the PP Upgrades page's
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
Grid with fixed `grid-template-areas`/`grid-template-columns` at every viewport width: name (just
`TierName`'s tier symbol now — see "No per-tier automation icon on the Game view row" above for the
two badges that used to also share this area), then the production figure and the owned count — in
that order, production first — on the
top line, then the tickspeed multiplier button and Buy (each spanning two of four equal-width tracks) on
the middle line, then a third `details`-area line spanning all four tracks. There is no separate
`autobuyer` grid row/line — an earlier version gave the autobuyer status badge its own row, then later
folded it into the icon-only badge sharing the `name` area (freeing that vertical space, since a
single glyph needs no row of its own) before removing the badge from this view entirely.
`ProductionText` sits in the wider (1.3fr) track and `OwnedText`
in the narrower (0.7fr) one, matching their typical content length, with `text-align: right` on
whichever one is currently rightmost (`OwnedText`) so it hugs the row's edge. Below `40rem`, only
fonts/spacing shrink. The owned cell's "Owned: " label is a `VisuallyHidden` span (plus `title="Owned"`)
— assert via `toHaveTextContent`, not `getByText`. Grid cells use a shared `gridCell` mixin (`min-width:
0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`). `RootDiv` sets
`font-variant-numeric: tabular-nums`. Each row is also registered (via a stable per-tier ref callback,
`registerTierRowRef`) with a single shared `IntersectionObserver` in `MainPage` that auto-collapses that
tier's Details disclosure the instant the row scrolls fully out of the viewport — see "Auto-collapsing
expanded disclosures on scroll" below.

**Tier row type scale.** `TierName`, `OwnedText`/`ProductionText`, `BuyButton`/
`UpgradeButton`, and `TierDetailsContent` all resolve their `font-size` from `theme.type.scale`
(`theme/tokens.js`) rather than hand-tuned `em` values — `TierName` steps from `lg` (desktop) to `md`
(below `40rem`), the muted production/owned text steps from `sm` to `xs`, the two
buttons from `sm` to `xs`, and the details disclosure body sits at `xs`. This gives the row two clear
type steps (name, then everything else) instead of a single flat size, and `BuyButton` additionally
sets an explicit `font-weight: 700` (`UpgradeButton` stays at `Button`'s own default `600`) so Buy —
already the rightmost, affordability-fill-colored control — reads as the visually heavier of the two,
per its "stays the visually dominant control" requirement. Layout (grid areas/columns, gaps, padding)
is unchanged; only these components' own `font-size`/`font-weight` moved.

**Tier row details disclosure.** Unlike the native `<details>`-based `Disclosure` a few other
cards/categories use (see "No description prose on this page" above), a tier row has **no separate
visible trigger at all**: `TierName` itself,
wrapped in `TierNameTrigger` (`grid-area: name`, `role="button"`, `tabIndex={0}`, `aria-expanded`,
`aria-controls`), is the trigger, sitting in its normal spot rather than a redundant "Details" label
elsewhere in the row. This is a **plain React-controlled disclosure**, not native `<details>`/
`<summary>` — a `display: contents`-based version was
tried first, but hit a real Chromium limitation: a `display: contents` ancestor breaks a promoted grid
child's ability to span multiple `grid-template-areas` cells, so the details content collapsed to a
single column's width instead of the full row (confirmed with a minimal repro, independent of whether
the span was expressed via a named area or explicit `grid-column` line numbers). `openTierDetailIds`
(a `Set` of expanded tier ids, in `MainPage`) tracks which rows are expanded;
`TierNameTrigger`'s `onClick` toggles it and calls `event.stopPropagation()`, and its `onKeyDown`
handles Enter/Space so keyboard operability doesn't regress from what native `<summary>` would give
for free. Applying `role="button"` to `TierNameTrigger` doesn't affect `TierName`'s own heading
semantics — ARIA role only overrides an element's *own* implicit role, never a nested descendant's, so
the `<h3>` inside it stays in the heading-navigation outline. The disclosure's content (a small `<ul>`,
see below) is `TierDetailsContent`, a plain `grid-area: details` div rendered *only* while its tier id
is in `openTierDetailIds` — collapsed, nothing renders there at all, so the row's `details` grid line
contributes zero height, an even more compact collapsed footprint than a visible "Details" line would
give, and (being a normal, non-`display: contents`-promoted grid item) correctly spans the full row
width when expanded.

Clicking the tier name isn't the only way in: `TierLine` itself carries an `onClick` that also toggles
`openTierDetailIds` for a click anywhere else on the tile — skipped when the click originated inside a
`<button>` (so Buy/tickspeed clicks never also toggle the disclosure); a click inside
`TierNameTrigger` never reaches this handler at all, since its own `onClick` already stopped
propagation. `TierLine` sets `cursor: pointer` accordingly, inherited by everything in the row except
the two buttons, which override it via their own `disabled`-dependent cursor rule. Expanding it lists,
in the `<ul>`: the tier's base tickspeed (`getTierBaseTickSpeedSeconds`, from `layers.js`) and effective
tickspeed (`getEffectiveTierTickSpeedSeconds`, with the contributing tier/global tickspeed multipliers
named inline), the purchase milestone multiplier and the lifetime purchase count driving it
(`getPurchaseMilestoneMultiplier`), the Speed Up multiplier (only shown once `speedUpCount > 0`), for
the last tier once `isLastTierTickspeedXpUnlocked` an extra line with its current unspent XP balance
and the minimum needed for the next `consumeXpForLastTierTickspeed` call (see "The last tier's
XP-funded tickspeed" below), and the tier's cost/produces resource symbols. This — plus the
tickspeed button's own `title` tooltip — is now the only place `MainPage` surfaces a tier's
base/effective tickspeed numbers at all, now that the compact per-tier badge that used to show the
cumulative bonus at a glance is gone (see "No per-tier automation icon on the Game view row" above).

**Percentages vs. multipliers.** Every bonus derived from a multiplier (the last tier's XP-funded
tickspeed, the Global Tickspeed card/breakdown, the Prestige production
speed bonus in the HUD/money-balance breakdown) is rendered through a shared
`formatBonusOrMultiplier(multiplier, { precise })` helper in `MainPage/index.jsx`: below +100% it reads
as a percentage (`+21%`, or `+N.NN%` with `precise: true` for the global tickspeed multiplier's
sub-1%-per-level compounding — see `formatGlobalTickspeedBonusPercent`), and at/above +100% (multiplier
`>= 2`) it switches to a Speed-Up-style `"Nx"` multiplier (`2x`, `5.5x`, via `formatRate`) instead — a
percentage reads awkwardly once it doubles the baseline, and `"Nx"` is already this app's convention for
large stacking bonuses (Speed Up's own `×N`, though that one keeps its pre-existing `×`-prefix styling
rather than switching to this helper's `N`-suffix style, since Speed Up's multiplier was never expressed
as a percentage to begin with). This is purely a display-layer convention — no economy formula changed;
only the rendered text shifts at the +100% threshold. Every call site that used to hardcode `+N%` now
goes through this helper instead of `formatBonusPercent`/`formatGlobalTickspeedBonusPercent` directly
(both still exist, now only as `formatBonusOrMultiplier`'s own below-100% branches).

**Auto-collapsing expanded disclosures on scroll.** The tier row Details disclosure
(`TierDetailsContent`/`openTierDetailIds`) automatically collapses once its row scrolls fully out of
the viewport in either direction, so an expanded row doesn't stay open (and out of context) as the
player keeps scrolling. Since tier rows mount/unmount as tiers unlock/lock across Prestige/Speed Up,
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
(`GlobalTickspeedCard`/`OverclockCard`/the Milestones view's Tier Tickspeed Autobuyers category — see
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
dismissible `OfflineNoticeCard` ("Welcome back! …", via `formatOfflineDuration`) renders inside a
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

Once `isProductionFrozen(state)` is true, every control except Prestige disables — see "Prestige and
the Googol freeze" below.

