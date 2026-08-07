# MainPage reference

Referenced from `CLAUDE.md`'s Architecture section. Read this before touching
`src/pages/MainPage/index.jsx` or its styled sub-components/layout — it's the full field-by-field
reference for the compact tier-row grid, the sticky HUD balances, the Game/PP-Upgrades view
toggle, and every disclosure/badge/accessibility convention `MainPage` follows.


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
  actually available (`canPrestige`, i.e. Money `>= GOOGOL`), the PP display card itself doubles as a
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
- **HUD-scoped muted/accent text.** `Header`'s tagline, the offline notice's body text, and the PP
  header line's "N PP" figure render via `HudMutedText`/`HudGoldText` — a fork of the app-wide
  `MutedText` (still hardcoded `#a3a3a3`, still used by `TierList`/`XpTickspeedCard`/`GlobalTickspeedCard`/
  `TopPrestigeBar`/`FullScreenCard`) — token-driven
  (`theme.color.textMuted`/`theme.color.warn`) so this HUD region's own AA audit is meaningful without
  migrating those other regions out of turn (their own token migration is later sub-issues #138/#139).
  `HudGoldText` is sized at `1.25em`, not `1.1em`: `theme.color.warn` against the light theme's white
  surface measures roughly 3.6:1 — below the 4.5:1 AA floor for normal text — but a `styled.b` renders
  bold by default, and WCAG's bold-text AA floor drops to 3:1 once the text is also >=14pt (18.66px);
  1.1em (17.6px against the 16px root) fell just short of that threshold, so it's sized up to clear it
  with margin. `Header`'s own text color and the offline notice's Dismiss button (`variant="neutral"`,
  replacing the deprecated `color="darkgrey"` prop) are also token-driven as part of this same pass.
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
  `!isFirstRun`), Speed Up, and Tickspeed — each gated on the same
  reveal/`everRevealed` flag its own card already uses (so a not-yet-relevant multiplier doesn't appear
  here before its own card would show it either), reading either its live effect (e.g. "+50% production
  speed from 50 unspent PP", "×4 production speed from 2 activations", "+1% faster ticks on every tier
  (Lv.1)") or a "not yet unlocked/activated/active" status line when revealed but not yet bought. The
  per-tier purchase milestone multiplier (`getPurchaseMilestoneMultiplier`) is deliberately not listed
  here — it's per-tier, not global, and already shown in each tier row's own Details disclosure. The
  list is suppressed entirely (not merely restyled) while `StickyBalances` is in its compressed
  side-by-side form (`showGlobalMultipliers && !balancesCompressed`), since a multi-line breakdown
  would overflow that compact bar; the card itself and its toggle state stay unaffected — expanding
  again once scrolled back to the uncompressed layout shows it immediately with no re-click needed.
- **Description prose** (Speed Up/Prestige cards' full explanations, the full-smart-autobuyer notice,
  the Tier Autobuyers category's shared "How these controls work" panel, the page's own tagline under
  the `Header`'s `<h1>`) lives inside an `InfoDetails` (`styled.details`)
  click-to-expand disclosure, with the card's own heading — `<h1>Tens</h1>` for the page header,
  `<h2>` for every card — as the clickable `<summary>`. The Prestige card's status lines (prestiged
  count · unspent PP · speed bonus) live inside the disclosure too — collapsed, the card is nothing
  but its heading and buttons. The disclosure marker is hidden via CSS. `InfoDetails`' `summary` is
  styled `width: fit-content` so the click target hugs just the heading text rather than spanning the
  full row; the page header additionally centers that fit-content `summary` with `margin: 0 auto`
  since it sits in an otherwise `text-align: center` block (a block-level element ignores its
  parent's `text-align`, which only centers inline content).
- **Version display.** A `VersionText` (`styled(MutedText).attrs({ as: 'span' })` — rendered as a
  `<span>` rather than `MutedText`'s default `<p>`, since `<summary>` only permits phrasing content)
  shows the app's current version (`v{version}`, e.g. `v0.5.0`) directly beside the `<h1>Tens</h1>`
  inside the same `<summary>` — always visible on load, unlike the tagline in `InfoDetails`' collapsed
  body below it. Sourced from `package.json`'s `"version"` field via a build-time JSON import
  (`import { version } from '../../../package.json'`) — the single source of truth; no separate
  constant duplicates it.
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
toggle is just which JSX block renders. A `ViewNav` tab trio (`role="tablist"`) only appears once
`!isFirstRun`. The Upgrades tab's visible label is the shorter "Upgrades" (not "PP Upgrades" — kept out
of the tab bar to save space, since every purchase on that page already costs Prestige Points, so
spelling that out on the tab itself is redundant); "PP Upgrades" remains the term used throughout this
doc/the codebase's own comments for the view/page as a concept. That tab shows a `NavDot`
(`aria-label="PP upgrade available"`) whenever `hasAffordablePpUpgrade` is true — since a tier's
autobuyer unlock and its tier tickspeed autobuyer are both free milestone unlocks now (see "Tier
Autobuyers" below), this only checks tier Smart purchases plus the global automations' PP costs, not
the two free unlocks (the Money-funded global tickspeed multiplier *itself* doesn't factor in either,
since it's not a PP purchase — only its automation toggle, Tickspeed Autobuyer, does). The Milestones
tab carries no `NavDot` — it's a read-only status page, nothing on it is ever "affordable". Money/PP
balances stay visible across all three views; `GlobalTickspeedCard`, `TierList`, `XpTickspeedCard`, and
the Reset button are Game-view-only; every PP-spending control lives on the Upgrades view; the
Milestones view is its own standalone read-only page (see "Milestones view" below). Speed Up itself has
no top-level card any more — its only trigger lives inline in the last tier's own row (see "The last
tier's XP-funded tickspeed" below).

**Global Tickspeed card (Game view).** Unlike every other automation upgrade, this one is
Money-funded (not PP-funded) and lives on the Game view as its own `GlobalTickspeedCard`, rendered at
the very top of the Game view — above `TierList`/tier 1, before anything else — since it's relevant
from the very start of a run, well before the last tier's XP Tickspeed card or Prestige are, or even
the tier list itself. `XpTickspeedCard` (see "The last tier's XP-funded tickspeed" below) renders
alongside it, both above `TierList`, inside a shared `TopSpeedCardsRow`
flex row — the two speed-related controls sit side by side at the top of the page (each sharing the
row equally, `flex: 1 1 14rem`). Below a combined width of roughly 28rem (two 14rem floors plus the
row's own gap) they wrap to stacked, one per line — a pure `flex-wrap` reflow with no separate
mobile-specific markup. The row renders (empty, zero height) even before either card's own reveal
condition is true, and works unchanged if only one of the two is currently showing — the lone card
just fills the row; unlike `GlobalTickspeedCard`, `XpTickspeedCard` has no `everRevealed` latch (see
below), so this row's second slot can wink in and out of existence as the last tier's owned count
crosses the full-level threshold, not just grow empty once and stay filled. See "The global tickspeed
multiplier" below for the underlying `engine.js`
mechanics. The heading itself is
plain (`Tickspeed`, no level/percent readout — shortened first from `Global Tickspeed Multiplier` to
`Global Tickspeed`, then to just `Tickspeed` once this card started sharing a row with a second
two-word-headed card and the `Global` prefix stopped earning its width; no
behavior change either time — the `GlobalTickspeedCard` component/prop names are unaffected, this is
purely the rendered heading text), inside the card's `InfoDetails`
`<summary>`. The current level and its cumulative speed bonus (`Currently Lv.N — +N% faster ticks on
every tier.`) show **only** inside the expanded description — never on the heading or the button — so
the compact collapsed view never changes shape as the level climbs; the description stays in the DOM
(and reachable by `aria-describedby`/text-content queries) even while the `<details>` itself is
collapsed. The `+N%` figure is rendered via `formatGlobalTickspeedBonusPercent` (`MainPage/index.jsx`),
not the whole-number `formatBonusPercent` used for the per-tier `⚙ +N%` badge — the global
multiplier's regular 1%-per-level compounding (see `GLOBAL_TICKSPEED_PRODUCTION_STEP`/"The global
tickspeed multiplier" below) lands on fractional values, so it shows up to 2 decimal places
(trimming a trailing `.00`/trailing zero, same style as `formatRate`) while the cumulative bonus is
still under 100%, then rounds to a whole percent once it reaches/crosses 100% (×2.00), matching
every other multiplier badge in the app once the numbers get large. The button carries `$progress`
(Money ÷ cost) the same way Buy does, reading `🌐 Enable for {cost}` before the first purchase or
`🌐 Upgrade for {cost}` after — its `aria-label` alone still spells out the current cumulative bonus
(same `formatGlobalTickspeedBonusPercent` formatting) for assistive tech, independent of the
collapsed/expanded visual state. A `globalTickspeedCardEverRevealed` flag (seeded from/latched to
`isGlobalTickspeedMultiplierUnlocked(state)`) — once tier02 has ever been owned (or the multiplier is
already active), the card stays visible rather than disappearing if tier02's owned count is later
reset by a Prestige/Speed Up; Reset clears the flag. It
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
icon (matching the badge below and the tier tickspeed autobuyer's icon-only status badge on the PP
Upgrades page) identifies the button as the tickspeed control; no separate icon marks the marginal
effect, since it's always exactly `TICKSPEED_PRODUCTION_STEP` (every level adds the same fixed 10%
step) and implied by the button itself — `aria-label`/`title` still spell out the full "+10% faster
ticks" sentence for assistive tech. A compact badge beside the tier name (gated on tickspeed
multiplier > 1) shows `⚙ +N%`/`⚙ 2x` (see "Percentages vs. multipliers" above) — the cumulative speed
bonus (faster deliveries, and genuinely level-dependent unlike the button's fixed marginal step), not a
production-amount bonus.

Whenever the **last tier**'s currently-owned count is >= `getPurchaseBlockSize(state)` (a full
level, see docs/ECONOMY_REFERENCE.md; `isLastTierTickspeedXpUnlocked`, see "The last tier's XP-funded
tickspeed" below), this Money-funded `UpgradeButton` is replaced — in the same
grid slot — by a quick-access **Speed Up** button instead (`⏩ ×{next}`, `actions.speedUp`, with a
distinct `${tier.name}'s row: …` aria-label prefix so it doesn't collide with `XpTickspeedCard`'s own
button under `getByRole('button', { name })` in tests) — reaching a full last-tier level is also
exactly when Speed Up tends to become available, so this reuses the slot for that quick-access
trigger rather than the tier's own (now top-level) XP-consume control. This is a live check, not a
one-time unlock, and independent of `XpTickspeedCard`'s own visibility below: a Prestige/Speed Up
resets the last tier's owned count to 0 along with every other tier's (and, for a real Prestige,
relocks the tier entirely — see docs/ECONOMY_REFERENCE.md's "Prestige and the Googol freeze"), which
reverts this slot back to the normal Money-funded button until the player buys back up to a full
level — see "The last tier's XP-funded tickspeed" below for why. Once bought, `autoSpeedUp`'s
active/paused status shows as a small `⏩` `PpUpgradeBadge` in this row's own `TierName` badge
cluster (alongside the `⚙ +N%` tickspeed badge and the unit-autobuyer's `🤖` badge — see "Unit
autobuyer status" below), gated on `isLastTier && !isFirstRun && isAutoSpeedUpActive` — the same
status this badge showed on the earlier top-level Speed Up card, just relocated since Speed Up no
longer has one.

The manual XP-consume trigger for this same tickspeed ladder (`🧬 {current unspent XP} XP`,
`actions.consumeXpForLastTierTickspeed`) lives at the top of the page instead, as its own
`XpTickspeedCard` — see "The last tier's XP-funded tickspeed" below. The `⚙ +N%` badge and Details
disclosure keep working unchanged for the last tier regardless of which control is currently in this
grid slot, still reading the XP-funded multiplier instead of the Money-funded one whenever
`isLastTierTickspeedXpUnlocked` holds.

**Unit autobuyer status (Game view, per tier).** Once a tier's unit-buying autobuyer is unlocked (see
`autobuyers`/`applyAutobuyerMilestones` — a free, prestige-count-milestone-triggered unlock, not a PP
purchase), its row shows an always-visible, read-only `PpUpgradeBadge` sharing
the `name` grid area with `TierName` (no separate grid row for it — see "Tier row visuals" below for why
that row was removed) — a single 🤖 glyph, not the word "Active"/"Paused": active renders at full
opacity, paused at a dimmed `$dimmed` opacity (both still colored green/amber via the existing `$color`
convention), so status reads from a subtle icon variation rather than written text (this same
icon-instead-of-text convention applies to every other automation status badge in the app — the tier
tickspeed/global tickspeed/Auto Speed Up/Auto-Prestige Autobuyer badges on the PP Upgrades page, and the
Auto-Prestige/Auto Speed Up status lines — see their own sections below). The full "active"/"paused"
sentence lives in the badge's `aria-label`/`title` for assistive tech and hover, scoped by tier name
(`` `${tier.name}'s autobuyer active` ``) to stay unambiguous across tiers. Before this existed, an
unlocked unit autobuyer had no visible indicator at all once the Unlock button disappeared; this is that
indicator. It carries no pause/resume control of its own — the Game view is meant to stay uncluttered,
so the actual `PauseToggleButton` for this same `autobuyersEnabled`/`setAutobuyerEnabled` state lives on
the PP Upgrades page instead (in the Tier Autobuyers category, alongside the tier tickspeed autobuyer's
own pause toggle — see "PP Upgrades view" below); toggling it there updates this badge immediately.

**PP Upgrades view.** A `UpgradesList` groups every purchase into a small number of labeled
**categories** rather than one flat list — each category is a single `UpgradeCategory`
(`styled(StatCard)`, one `CategoryHeading` plus its rows) and each row inside it (`UpgradeRow`) is a
lean, unboxed flex row (no border/padding/background of its own — just a thin `border-top` divider
between consecutive rows), rather than the older one-`StatCard`-per-row layout: a category of *N*
purchases costs one card's worth of chrome, not *N*. Three categories, in order:
1. **Tier Autobuyers** — a single shared `InfoDetails` panel ("ℹ️ How these controls work", wired
   through its own `useAutoCollapseDetails()` ref like every other `InfoDetails` on this page) sits
   right under the `CategoryHeading`, in both the per-tier-list and `allTiersFullyAutomated` branches
   below, and explains unlock timing, pause/resume, and what Smart does once for the whole category —
   individual badges/buttons no longer carry their own explanatory `title` text (only `aria-label`,
   for assistive tech) now that this is covered in one place. Below it, per unlocked tier
   (`isTierUnlocked`, the usual owned-count gate — see docs/ECONOMY_REFERENCE.md; there's no
   next-tier preview any more, since there's nothing left to preview a cost for), up to three
   independent controls. **Autobuyer unlock** and the **tier tickspeed autobuyer** are no longer PP
   purchases at all — both unlock automatically once `prestige.count` reaches their own milestone
   (`getAutobuyerUnlockMilestone`/`getTierTickspeedAutobuyerMilestone`, see
   `applyAutobuyerMilestones` in docs/ECONOMY_REFERENCE.md). While locked, each renders as a dimmed,
   non-interactive `PpUpgradeBadge` reading `🔒 Prestige {milestone}` — deliberately terse, avoiding
   restating what the badge already shows: `aria-label` adds only the tier name and milestone number
   (needed for assistive tech, since the visible glyph alone doesn't name the tier) — rather than a
   Buy button, since there's nothing to click. Each row's controls now appear in the same order as
   the tier's Game-view row's own badges (⚙ before 🤖 — see "Unit autobuyer status" above), so the two
   views correlate directly: the **tier tickspeed autobuyer** cluster comes first (icon-only ⚙,
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
   automates (🌐 Global Tickspeed card, ⏩ the last tier row's inline Speed Up button, ✦ Prestige
   card/button) — except the
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

**Milestones view.** A third, read-only view (`view === 'milestones'`, gated on `!isFirstRun` the same
way as the Upgrades view) tracking both prestige-count-milestone-triggered unlocks in full —
independent of whether a given tier is currently reachable in this run (unlike the Upgrades view's
"Tier Autobuyers" category, which only shows a tier once `isTierUnlocked`). Reuses the same
`UpgradesList`/`UpgradeCategory`/`CategoryHeading`/`UpgradeRow`/`PpUpgradeBadge`/`TierNameLabel` styled
components the Upgrades view itself uses — structurally this is the same "categorized list of rows"
shape, just with every row read-only — rather than introducing a parallel set of near-identical styled
components. Two categories, each listing all ten tiers via `getAutobuyerUnlockMilestone`/
`getTierTickspeedAutobuyerMilestone` (docs/ECONOMY_REFERENCE.md):
1. **Tier Autobuyer Unlocks** — a green `✅ Prestige {milestone}` badge once
   `autobuyers[tier.id] != null` (no `title` — the visible text already says everything there is to
   say), otherwise a dimmed `🔒 Prestige {milestone}` badge whose `title` adds only the one piece of
   information the badge itself doesn't show (`You're at Prestige {prestige.count}`, not a restatement
   of the milestone) and whose `aria-label` spells out both the tier name and the milestone/current-count
   pair for assistive tech, plus a `VisuallyHidden role="progressbar"` (`aria-valuenow = min(prestige.count,
   milestone)`, `aria-valuemax = milestone`).
2. **Tier Tickspeed Autobuyers** — identical shape, keyed off `tierTickspeedAutobuyer[tier.id]`/
   `getTierTickspeedAutobuyerMilestone` instead.

Each category's heading doubles as an `InfoDetails`/`useAutoCollapseDetails` disclosure trigger (the
same collapsed-by-default, auto-collapses-on-scroll convention every other card description in this
file uses — see "Auto-collapsing expanded disclosures on scroll" below), with a single terse sentence
as its body (e.g. "Unlocks one tier per prestige.") — deliberately short, since the row list right below
it is where the actual per-tier detail already lives; the category description exists only to name the
mechanic, not re-explain it. Text throughout this view (and the matching locked badges on the Upgrades
view's "Tier Autobuyers" category) avoids calling the unlock "free"/"no PP cost" — since nothing on
either milestone track was ever PP-funded to begin with, saying so would only invite the question "as
opposed to what."

Unlike the Upgrades view's Tier Autobuyers category, nothing on this page is ever a button — every row
is purely informational, so there's no `hasAffordablePpUpgrade`-style `NavDot` on this tab either.

**Speed Up has no top-level card, and XpTickspeedCard uses a live check, not an everRevealed latch.**
An earlier version of this pairing gave Speed Up its own top-of-page card (mirroring
`GlobalTickspeedCard`'s `everRevealed`-latched, "stays shown once revealed" pattern); Speed Up's
manual trigger has since moved to living solely inline in the last tier's own row (see "The last
tier's XP-funded tickspeed" above), so that card — and its `speedUpEverRevealed`-driven
render/disabled-once-shown behavior — no longer exists. `speedUpEverRevealed` itself is still around
(seeded from/latched to `lastTierUnlocked`, same as before), just narrowed to gating the one place
that still needs "has Speed Up ever been reachable" as a persistent flag: the "Speed Up: …" line in
the money balance's click-to-expand global-multipliers breakdown (see "Money balance click-to-expand
global multipliers" above), so that line doesn't disappear again once shown even if the last tier's
own owned count later drops. `XpTickspeedCard`, the card that took over this row slot from Speed Up,
deliberately does **not** get an equivalent `everRevealed` latch of its own — see "The last tier's
XP-funded tickspeed" above for why a live check matches this card's "exact functionality" requirement
more closely than the latched pattern its sibling cards use. There is no equivalent card for
Prestige either — the bottom Prestige panel that used to mirror this pattern (via a
`prestigeCardEverRevealed` flag) was removed as purely informational and redundant with the
`TopPrestigeBar`/`FullScreenOverlay`/PP-display-as-button ways to trigger Prestige (see "Prestige and
the Googol freeze" below).

**Accessibility.** Each PP-spending button nests a `VisuallyHidden` `role="progressbar"` span, so the
explicit `aria-label` on the button itself is required (accessible-name computation would otherwise
recurse into the nested node). Buy/Prestige/Reset carry a `title` tooltip; Prestige and Reset
additionally wire `aria-describedby` to a description (the app's only irreversible actions).

**Tier row visuals.** Each `TierLine` gets a thin `border-left` accent cycled from `theme.tierAccents`
(the per-mode 8-hue set in `theme/tokens.js`, replacing the old hardcoded `TIER_ACCENT_COLORS` array)
by `tierIndex % theme.tierAccents.length` (cosmetic only, kept off text/button colors to avoid
colliding with affordability semantics — those now resolve from `theme.color.good`/`warn`/`violet`/
`disabled`/`text`/`textMuted`/`borderStrong` rather than raw hex: `GreenText`, `TierDetailsContent`'s
`ul`, `OwnedText`/`ProductionText` (each overriding the color `MutedText` — still hardcoded, #139
scope — would otherwise pass down), the tier row's `PpUpgradeBadge` autobuyer-status `$color`, and the
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
Grid with fixed `grid-template-areas`/`grid-template-columns` at every viewport width: name (+ compact
`⚙ +N%`/`⚙ 2x` tickspeed badge — see "Percentages vs. multipliers" below for the threshold — and, once
the tier's unit-buying autobuyer is unlocked, its icon-only status badge, both sharing this area with
`TierName`), then the production figure and the owned count — in that order, production first — on the
top line, then the tickspeed multiplier button and Buy (each spanning two of four equal-width tracks) on
the middle line, then a third `details`-area line spanning all four tracks. There is no separate
`autobuyer` grid row/line — an earlier version gave the autobuyer status badge its own row, but folding
it into the icon-only badge described in "Unit autobuyer status" above freed that vertical space, since
a single glyph needs no row of its own. `ProductionText` sits in the wider (1.3fr) track and `OwnedText`
in the narrower (0.7fr) one, matching their typical content length, with `text-align: right` on
whichever one is currently rightmost (`OwnedText`) so it hugs the row's edge. Below `40rem`, only
fonts/spacing shrink. The owned cell's "Owned: " label is a `VisuallyHidden` span (plus `title="Owned"`)
— assert via `toHaveTextContent`, not `getByText`. Grid cells use a shared `gridCell` mixin (`min-width:
0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`). `RootDiv` sets
`font-variant-numeric: tabular-nums`. Each row is also registered (via a stable per-tier ref callback,
`registerTierRowRef`) with a single shared `IntersectionObserver` in `MainPage` that auto-collapses that
tier's Details disclosure the instant the row scrolls fully out of the viewport — see "Auto-collapsing
expanded disclosures on scroll" below.

**Tier row type scale.** `TierName`, `GreenText`/`OwnedText`/`ProductionText`, `BuyButton`/
`UpgradeButton`, and `TierDetailsContent` all resolve their `font-size` from `theme.type.scale`
(`theme/tokens.js`) rather than hand-tuned `em` values — `TierName` steps from `lg` (desktop) to `md`
(below `40rem`), the muted production/owned/tickspeed-badge text steps from `sm` to `xs`, the two
buttons from `sm` to `xs`, and the details disclosure body sits at `xs`. This gives the row two clear
type steps (name, then everything else) instead of a single flat size, and `BuyButton` additionally
sets an explicit `font-weight: 700` (`UpgradeButton` stays at `Button`'s own default `600`) so Buy —
already the rightmost, affordability-fill-colored control — reads as the visually heavier of the two,
per its "stays the visually dominant control" requirement. Layout (grid areas/columns, gaps, padding)
is unchanged; only these components' own `font-size`/`font-weight` moved.

**Tier row details disclosure.** Unlike `XpTickspeedCard`/`GlobalTickspeedCard`/the page
`Header` (which each show a visible `<summary>` line of their own inside a native `InfoDetails`, see
"Description prose" above), a tier row has **no separate visible trigger at all**: `TierName` itself,
wrapped in `TierNameTrigger` (`grid-area: name`, `role="button"`, `tabIndex={0}`, `aria-expanded`,
`aria-controls`), is the trigger, sitting in its normal spot rather than a redundant "Details" label
elsewhere in the row. This is a **plain React-controlled disclosure**, not native `<details>`/
`<summary>` — a `display: contents`-based version (matching every other `InfoDetails` disclosure) was
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
XP-funded tickspeed" below), and the tier's cost/produces resource symbols. This is the only place in
`MainPage` that surfaces a tier's base/effective tickspeed numbers directly — added once per-tier base
tickspeed started diverging again (see "Tier production tickspeed" above) — everywhere else it only
shows up indirectly via the `⚙ +N%`/`⚙ 2x` badge and the tickspeed button's own tooltip.

**Percentages vs. multipliers.** Every bonus derived from a multiplier (the tier tickspeed badge, the
last tier's XP-funded tickspeed, the Global Tickspeed card/breakdown, the Prestige production
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

**Auto-collapsing expanded disclosures on scroll.** Every expandable disclosure in `MainPage` — a tier
row's Details (`TierDetailsContent`/`openTierDetailIds`) and every native `<details>`-based `InfoDetails`
(the page `Header`, `GlobalTickspeedCard`, `XpTickspeedCard`, and the PP Upgrades page's Tier Autobuyers
category "How these controls work" panel and "full smart autobuyer" notice) — automatically collapses
once it scrolls fully out of the viewport in either
direction, so an expanded panel doesn't stay open (and out of context) as the player keeps scrolling.
For the four-plus native `<details>` elements, a small `useAutoCollapseDetails()` hook (module-scoped,
above `MainPage`) attaches an `IntersectionObserver` to a ref on the element and sets its `.open` property
to `false` directly once `isIntersecting` goes false — safe because none of these `<details>` are
React-controlled (no `open` prop is ever passed), so a direct DOM mutation isn't fought by a future
re-render. For tier rows, which mount/unmount as tiers unlock/lock across Prestige/Speed Up, a single
shared `IntersectionObserver` (created once, not per row) is used instead, with each currently-rendered
`TierLine` registered/unregistered via a stable per-tier ref callback (`registerTierRowRef`, cached in a
`Map` keyed by tier id so the callback's identity doesn't change across re-renders — a fresh callback
identity every render would make React re-invoke it with `null` then the element again on every 100ms
tick, needlessly churning `observe`/`unobserve`); losing intersection removes that tier's id from
`openTierDetailIds` the same way `toggleTierDetails` would. Both mechanisms use the default
`IntersectionObserver` threshold (`0`), so a disclosure only collapses once its owning element has zero
overlap with the viewport — "scrolled beyond screen," not merely partially cut off — and both are
guarded for environments without `IntersectionObserver` (e.g. jsdom in tests), where a disclosure simply
stays open once expanded, same as before this feature existed.

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

**Offline notice.** When the hook reports a non-null `offlineProgress`, a dismissible
`OfflineNoticeCard` ("Welcome back! …", via `formatOfflineDuration`) renders inside a fixed,
viewport-centered `OfflineNoticeOverlay` — a true overlay/dialog presentation (centered regardless of
scroll position) rather than an inline card pushed into the page's normal document flow; never
reappears once dismissed or state is reset. `OfflineNoticeOverlay` sets `pointer-events: none` (with
`pointer-events: auto` restored on the card itself) so the rest of the page stays clickable through
the overlay's own surrounding space. The card has no click handler or `title` of its own — only the
Dismiss button is interactive, keeping the whole-tile-is-clickable-and-also-has-a-tooltip pattern out
of this component (see `docs/DESIGN_HISTORY.md` for why the earlier click-to-extend behavior was
dropped) — and its content (description + centered Dismiss button) stacks in `StatCard`'s own
flex-column, centered via `align-items`/`text-align: center` on the card. Self-dismisses via a
countdown (`OFFLINE_NOTICE_AUTO_DISMISS_MS`, 10s) driving the Dismiss button's `$progress` fill, then
an opacity fade (`OFFLINE_NOTICE_FADE_MS`, 400ms) before `dismissOfflineProgress` removes it.

Once `isProductionFrozen(state)` is true, every control except Prestige disables — see "Prestige and
the Googol freeze" below.

