# Shared components reference

Referenced from `CLAUDE.md`'s Repo layout section. Read this before touching
`src/components/Button`, `src/components/Money`, `src/components/StatCard`, or
`src/components/AppNav` — the full prop/styling contract for each, including the token-migration
state each is currently in.

## `AppNav/index.jsx`

Fixed bottom navigation bar (`.jsx`) in progression order: **Foundry** (`open byte foundry`) →
**Compute** (`open compute`, once revealed) → **Tiers** (`open tiers`, page id `'game'`, only once
`mainGameUnlocked`) → **Guide** (`open guide`, always) → **More** (`open more menu`, always —
opens `AppMenu`). Storage is **not** a top-level item — it lives under Foundry as Memory | Disks.
Active item uses `aria-current="page"` plus accent/surface styling from theme tokens. Exports
`APP_NAV_BOTTOM_PAD` so `App.jsx`'s `PageShell` can reserve the same clearance the fixed bar
occupies (including `env(safe-area-inset-bottom)`). Takes `{ currentPage, onNavigate, onOpenMore,
showTiers, showCompute, moreOpen, attention }`. `attention` is a map of page id → `'high'` |
`'normal'` | false from `game/navAttention.getNavAttention` (Storage cues fold into `foundry`;
high = larger pulsing green dot).

## `AppMenu/index.jsx`

Bottom sheet / dialog (`.jsx`) opened from AppNav's More item. Always-available utilities that
must not depend on unlocking Tiers: **Milestones** and **Settings**. Destructive **Reset** lives
only under Settings → Danger zone (not duplicated in this sheet or on MainPage). Closes on backdrop
click, Escape, or any action. Takes `{ open, onClose, onNavigate }`.

## `Button/index.jsx`

styled button (`.jsx`, not `.js` — see `ButtonContent` below, which needs JSX); accepts a semantic `variant` prop (`primary`/`success`/ `prestige`/`info`/`smart`/`neutral`/`ghost`/`danger`/`plain`) resolved against `theme.color` tokens (`accent`/`good`/`warn`/`info`/`violet`/`textMuted`/ `textMuted`/`danger`/`text` respectively — `prestige` deliberately maps to `warn`, the token whose own palette comment already documents it as "prestige gold"; `plain` maps to plain body `text`, for a control whose enabled state should read as ordinary text rather than an accent color, e.g. the tier row's Buy button) via a small internal `VARIANT_TOKEN` map, so a variant automatically renders correctly in both dark and light mode. `variant` is consumed purely internally to resolve a color and is filtered from the rendered DOM node via `styled.button.withConfig({ shouldForwardProp })` — it is not a real HTML attribute, so it must never leak onto the underlying `<button>` (unlike the raw `color` prop below, which happens to also be a valid, if obsolete, HTML attribute name and so was never flagged by styled-components' own unknown-prop filtering). A `variant` combined with `disabled` automatically resolves to `theme.color.disabled` instead of its normal token — so a caller expressing an affordability-style toggle (enabled → semantic color, disabled → muted) only passes `variant` + `disabled`, it doesn't also need to hand-ternary between the variant's token and `theme.color.disabled` (see the tier row's Buy/tickspeed-multiplier/XP-consume buttons in `MainPage/index.jsx`, migrated onto this in #138). The older raw `color` prop (a literal hex/CSS-color string) is **deprecated but still fully supported** for call sites that haven't migrated to a `variant` yet — `resolveColor` prefers `variant` when both are given, and falls back to `color` when no `variant` is passed; a raw-`color` caller gets no automatic disabled-color override and keeps full manual control of its own disabled-state color, exactly as before (no defaultProps — React 19 dropped defaultProps support for function components, so it's a silent no-op there). The button's own background is `theme.color.surfaceSunken` (previously a hardcoded `#262626`). The `$pulse` glow's CSS custom property (`--glow-rgb`) is derived generically via a small `hexToRgb` helper from whatever color `resolveColor` resolves to (variant-token hex or a literal hex `color`), with a tiny `NAMED_GLOW_RGB` fallback table only for the handful of non-hex CSS keyword colors legacy callers still pass (e.g. `white`) — this replaced the old hardcoded-per-literal-color `GLOW_RGB` map, so the glow now works for every variant/token color in both themes without enumerating each one. Optional progress-fill props (`$progress`, `$secondaryProgress`, `$progressColor`, `$secondaryProgressColor`, `$pulse`) still render as an on-button gradient fill (reduced alpha when `disabled`; the fill's own default colors are `theme.color.good`/`theme.color.warn` when a caller passes neither `$progressColor` nor `$secondaryProgressColor`), a `:focus-visible` outline colored from the button's resolved color, no opacity-based disabled dimming (color + cursor signal disabled state instead), and `display: flex` with `align-items`/`justify-content: center` so plain (icon-less) button text still centers normally. Also exports `ButtonIcon` (a `flex: 0 0 auto` span, pinned to a fixed-width slot on the left) and `ButtonLabel` (`flex: 1 1 auto; text-align: center`, filling the remaining space) — together they keep a button's leading icon at a stable left position regardless of the label's length, while the label itself still reads as centered in the space after the icon, rather than the old behavior of the whole icon+label string sliding left/right together as one centered block. `ButtonLabel` also carries its own `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` (needed even when the outer `Button` already clips overflow, since a flex child's own text doesn't inherit an ancestor's ellipsis truncation — without this a label too wide for its shrunk flex share renders as a silent hard cut mid-character instead of a visible `…`). `ButtonContent` is a small helper component that splits a pre-formatted "🛒 Lv.10 $100"-style string (every such label in this app follows the icon-then-word convention) into `ButtonIcon`/`ButtonLabel` at the first space. Accepts either a single string child *or* a caller mixing literal text with an embedded `{expression}` (e.g. `<ButtonContent>Cost ({formatAmount(x)} B)</ButtonContent>`) — JSX gives such mixed content to `children` as an **array** of text/expression segments, not one string, so `ButtonContent` joins an array with `''` before splitting (fixed after a real bug: joining with plain `String(children)` instead invoked `Array.prototype.toString()`, which joins with a bare comma — silently splicing a "," into the rendered label at every interpolation boundary, e.g. `"Invest for Double Production (,1, B)"`). Callers can still reach for `<ButtonIcon>`/`<ButtonLabel>` directly if they want more control over icon/label boundaries than the first-space heuristic gives. Also exports `VisuallyHidden`, a clip-hidden node used both for a nested `role="progressbar"` and for supplementary `aria-describedby` text

## `DiskArrayRow/index.jsx`

styled (`.jsx` — needs JSX) one Disk array's full interactive detail for a single size: a
`DISK_CACHE_BLOCK_COUNT`-block cache row, captioned `"Cache — <block size> each (tap full → Tiers
Bits)"` with one cache block's own size (`size / DISK_CACHE_BLOCK_COUNT`) in `formatCacheSize`'s
bit-scale `Kb`/`Mb`/… unit (each block itself also shown in that unit, clickable/releasable via
`actions.releaseDiskCacheBlock` once full and `isDiskCacheBlockReleasable` — manual transfer to
Tiers Bits only; never auto), followed immediately by a fixed `DISK_ARRAY_LADDER_CAP`-square disk
row of the same size, captioned `"Disks — <size> each (<full> full, <built>/10 built)"` with the
disk size in `formatDiskSize`'s Byte-scale `KB`/`MB`/… unit (dropping the built clause for
`"Disks — <size> each (<n>/10 full)"` instead once `builtCapped` reaches `DISK_ARRAY_LADDER_CAP`,
since that clause is then permanently stuck at "10/10"; full/empty/not-yet-built states). Full
disks distinguish **auto-redeem** (`isDiskAutoRedeemEligible` — info/blue fill, aria
`"auto-redeem …"`, hint `"Auto-redeem → <tier> (autobuyer on)"`) from **manual redeem**
(`isDiskManualRedeemAvailable` — good/green pulsing fill, aria `"redeem … for <tier>"`, hint
`"Tap a full disk → 1 free <tier>"`) via `actions.redeemDisk` once full and `isDiskRedeemable` — or,
while `intro.diskBuild?.size` matches this size, a plain "Array rebuilding — Ns left" status line
in place of both interactive rows (and their captions). Disks render as circles, cache blocks as
squares, and neither row's caption uses `text-transform: uppercase` — deliberately, so the size
text's own lowercase `b` (bits, Cache) never visually collapses into uppercase `B` (Bytes, Disks);
see CLAUDE.md's "Economy model" for the `Kb`/`KB` distinction this exists to preserve.
Takes `{ actions, size, state }` (a slice of the `game` object each caller already has) rather than
the whole `game` prop, since it renders per-size and both call sites map over multiple sizes.
Extracted so both `ByteFoundryPage` (every currently-relevant size from
`getRelevantDiskSizesForFoundry`, ascending) and `StoragePage` / Foundry Disks tab (every size ever
reached, via `getDiskSizesToShow`) render this detail identically. Every action here is unaffected
by the Byte Foundry's forced priority order (Disk Fill ranks highest — see `isDiskFillAvailable` in
`engine.js`), so nothing is ever disabled by anything elsewhere in that chain — only by this
specific size's own array being mid-build.

## `ConfirmDialog/index.jsx`

styled (`.jsx`) in-game confirm overlay — theme `StatCard` + Cancel/Confirm `Button`s, fixed
dimmed backdrop, Escape / backdrop-click cancel. Replaces native `window.confirm` for irreversible
Foundry actions so the prompt matches the rest of the UI. Takes `{ open, title, children,
confirmLabel, cancelLabel, confirmVariant, onConfirm, onCancel, ariaLabel }`. Used by
`ByteFoundryPage` for Sacrifice for 10x Capacity (Core-cost warning in `children` only when Compute
is unlocked).

## `Money/index.js`

styled money/amount display; color from `theme.color.text`, with its own `font-variant-numeric: tabular-nums` (belt-and-suspenders alongside `RootDiv`'s page-wide rule, so the display reads correctly even if ever rendered outside `RootDiv`). No `defaultProps` — React 19 dropped defaultProps support for function components, and `styled.b` doesn't need it either; the old `Money.defaultProps = {}` was already a dead no-op, removed

## `OfflineProgressNotice/index.jsx`

styled (`.jsx` — needs JSX) "Welcome back! ... simulated N of progress at 50% speed" notice,
extracted out of `MainPage` so both `MainPage` and `ByteFoundryPage` can render it — offline progress
(computed at mount by `useIncrementalGame.js`'s `computeInitialGame`, and again at any point
mid-session that its live tick loop detects a real-world gap since its own last tick — see
`docs/ECONOMY_REFERENCE.md`'s "Offline progress" section) already applies to the Byte Foundry
mechanically regardless of which page renders it (`tickGame` runs `tickIntroProduction`/
`tickIntroAutoInvest` unconditionally, every tick, so `applyOfflineProgress` already catches the Byte
generator's passive production and auto-transfers up while the game was away), but the notice itself
used to only ever render inside `MainPage` — a player landing on (or still gated to)
`ByteFoundryPage` after being away got no acknowledgment of it. Takes `{ offlineProgress,
dismissOfflineProgress }` (the same two fields `useIncrementalGame()` returns) as props and renders
`null` when `offlineProgress` is `null` — which includes a short absence at or below
`OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS` (10 minutes): progress still applies (at 100% speed),
but `useIncrementalGame.js`'s `computeOfflineCatchUp` deliberately withholds the summary object so this
notice never renders for it (see `docs/ECONOMY_REFERENCE.md`'s "Offline progress" section) — the "at
50% speed" wording below is therefore always accurate whenever the notice does render, since that only
happens once the reduced-speed path is the one that ran. `offlineProgress` is not a one-shot value — a mid-session
gap detection can produce a fresh object any number of times in one mount — so the countdown/fade/
auto-dismiss state (`OFFLINE_NOTICE_AUTO_DISMISS_MS` = 10s, `OFFLINE_NOTICE_FADE_MS` = 400ms,
`OFFLINE_NOTICE_PROGRESS_INTERVAL_MS` = 100ms) is (re)armed by an effect keyed on the
`offlineProgress` object reference, not a one-time lazy initializer, so a later event restarts the
countdown instead of inheriting an earlier (possibly already-elapsed or -dismissed) one's timing.
Renders as a fixed, centered overlay (`aria-label="offline progress notice"`
on the card) with a "Dismiss" button (`aria-label="Dismiss offline progress notice"`, its own hidden
`role="progressbar"` counting down to auto-dismiss). Used by both `MainPage` (right after `Header`)
and `ByteFoundryPage` (right after the page title), each supplying its own slice of the `game` prop
they already receive.

## `StatCard/index.js`

styled card container used for every panel; background/border/text/ `border-radius`/elevation all resolve from theme tokens (`theme.color.surface`/`surfaceRaised` per `$raised`, `theme.color.border`, `theme.color.text`, `theme.radius.md`, `theme.shadow.sm`) rather than hardcoded hex — see "Theming" below. `$raised` is a boolean prop switching the base `surface` fill for the lighter `surfaceRaised` panel tone (dark mode) / relying on `shadow.sm` for depth (light mode, where both surface tokens are white) — unused by any call site yet, added as the minimal elevation seam later hero/elevated-panel work (e.g. the top-HUD/prestige redesign issues) can consume without another StatCard change. Every `styled(StatCard)` caller in `MainPage` (tier rows, Speed Up/Global Tickspeed cards, the sticky balance cards, PP Upgrades categories) still layers its own hardcoded accent overrides (e.g. `SpeedUpCard`'s `border-color: #0e7490`) on top — migrating those call sites onto tokens is later token-migration sub-issue work, not done here
