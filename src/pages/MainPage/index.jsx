import Button, { ButtonContent, ButtonIcon, ButtonLabel, VisuallyHidden } from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency, formatOfflineDuration, getAutobuyerUnlockMilestone, getAutoPrestigeAttemptRate, getAutoPrestigeCost, getEffectiveTierTickSpeedSeconds, getGlobalTickspeedMultiplierCost, getGlobalTickspeedProductionMultiplier, getLastTierXpTickspeedMinConsumption, getLastTierXpTickspeedMultiplier, getPrestigePointsAwarded, getPrestigeProductionMultiplier, getPrestigeProgressPercent, getPurchaseBlockSize, getPurchaseMilestoneMultiplier, getSmartAutobuyerCost, getSpeedUpMultiplier, getSpeedUpRequirement, getTickspeedMultiplierCost, getTickspeedProductionMultiplier, getTierAffordableQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, getTierTickspeedAutobuyerMilestone, isGlobalTickspeedMultiplierUnlocked, isLastTierTickspeedXpUnlocked, isProductionFrozen, isTierUnlocked } from 'game/engine'
import { AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_SPEED_UP_COST, getTierBaseTickSpeedSeconds, GOOGOL, MONEY_ID, PRESTIGE_SPEED_BONUS_UNLOCK_COST, RESOURCE_SYMBOL, TICKSPEED_AUTOBUYER_COST, TIER_DEFINITIONS, TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { version } from '../../../package.json'
import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes, useTheme } from 'styled-components'

// Offline-progress notice auto-dismiss timing (UI chrome only — not a game/economy constant, so
// it lives here rather than in layers.js).
const OFFLINE_NOTICE_AUTO_DISMISS_MS = 10_000
const OFFLINE_NOTICE_FADE_MS = 400
const OFFLINE_NOTICE_PROGRESS_INTERVAL_MS = 100

const RootDiv = styled.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.25rem 0;
  font-variant-numeric: tabular-nums;
`

// Grid cells must never grow to fit their content — that's what lets a Buy button's or a stat's
// on-screen position stay fixed as the underlying number's digit count changes.
const gridCell = css`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Header = styled.header`
  color: ${props => props.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${props => props.theme.font.display};
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  /* InfoDetails' summary is a fit-content block (so its click target hugs the text rather than
     spanning the row) — center that block itself, since text-align only centers inline content,
     not a block-level child, and the fit-content width is what makes auto margins work here. */
  details summary {
    margin: 0 auto;
  }
`

// Centers the offline notice as a fixed overlay in the middle of the screen, above the page
// content, rather than an inline card pushed into the normal document flow. `pointer-events: none`
// on the overlay (re-enabled on the card itself, below) keeps the rest of the page clickable
// through the overlay's own padding/whitespace.
const OfflineNoticeOverlay = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 1.5rem 1rem;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 900;
`

// Fades out (rather than disappearing abruptly) once the auto-dismiss countdown reaches zero —
// see the offline-notice timing state in MainPage. $fading drives the opacity transition, not a
// remount, so the fade is visible before the notice is actually removed from the DOM by
// dismissOfflineProgress.
const OfflineNoticeCard = styled(StatCard)`
  align-items: center;
  max-width: 26rem;
  opacity: ${props => (props.$fading ? 0 : 1)};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${OFFLINE_NOTICE_FADE_MS}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const TierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

// One accent hue per tier (cycled by index, via theme.tierAccents — see theme/tokens.js),
// applied as a thin left-edge stripe on the row — purely cosmetic scanability, kept off
// text/buttons so it never collides with the semantic good/warn/violet/disabled coloring used
// for affordability elsewhere in the row.

// One-shot entrance for a tier row that unlocks during the current session (see
// $animateReveal below) — never replays on ordinary re-renders since it's a mount-time
// CSS animation, not a transition tied to any prop.
const reveal = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`

// Fixed grid areas (rather than flex flow) so each field always renders in the same slot —
// the row's shape depends only on the viewport width, never on how many digits a value has.
// Top line: name (+ compact tickspeed multiplier badge and, once unlocked, the icon-only
// autobuyer status indicator — see MainPage — both sharing the first two tracks, the width the
// PP-based Automate control used to occupy before it moved to the PP Upgrades page), the
// production figure, then the owned count — production sits left of owned (not the other way
// around) so the row reads "what it makes" before "how many you have"; the wider track (1.3fr)
// follows production's spot since that figure tends to run longer (e.g. currency strings) and the
// narrower one (0.7fr) follows owned's. Middle line: just the two buttons, each spanning two of
// the four tracks — the track pairs sum equally (col1+col2 = col3+col4) so the tickspeed
// multiplier button and Buy each take exactly half the row's width, unaffected by how the top
// row's own two tracks are split between them. Buy sits rightmost, not the tickspeed button — Buy
// is clicked constantly while a tickspeed level-up is an occasional action, and the rightmost slot
// is the natural resting spot for a thumb/mouse that's about to click again. Bottom line: a single
// 'details' area spanning all four tracks, holding the per-tier click-to-expand disclosure's
// content (see TierDetailsContent below) — only rendered at all while expanded, so a collapsed row
// contributes zero height there. There is no separate visible trigger for it (no "Details" label):
// TierName itself (wrapped in TierNameTrigger, in the 'name' area) is the trigger, and clicking
// anywhere else on the tile that isn't a button also toggles it (see the row's own onClick below)
// — a React-controlled disclosure rather than native <details>/<summary>, see openTierDetailIds in
// MainPage for why. cursor: pointer signals the whole tile is clickable; Button's own cursor rule
// overrides it for the two buttons. There used to be a dedicated 'autobuyer' grid row for the
// per-tier autobuyer status badge; it's folded into the 'name' row instead now that the badge is a
// single icon rather than a written "Active"/"Paused" line (see MainPage), so the row no longer
// needs the extra vertical space for it.
const TierLine = styled(StatCard)`
  display: grid;
  grid-template-areas:
    'name name production owned'
    'upgrade upgrade buy buy'
    'details details details details';
  grid-template-columns: 1.4fr 0.6fr 1.3fr 0.7fr;
  align-items: center;
  column-gap: 0.5rem;
  row-gap: 0.3rem;
  padding: 0.4rem 0.7rem;
  border-left: 3px solid ${props => props.$accent};
  cursor: pointer;
  transition: border-color 0.15s ease;
  animation: ${props => (props.$animateReveal ? css`${reveal} 0.4s ease-out` : 'none')};

  &:hover {
    border-color: ${props => props.theme.color.borderStrong};
    border-left-color: ${props => props.$accent};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 40rem) {
    /* Same row areas as desktop; only the column weights shift, still summing to equal
       halves for the buttons. */
    grid-template-columns: 1.35fr 0.65fr 1.25fr 0.75fr;
    row-gap: 0.3rem;
    column-gap: 0.35rem;
    padding: 0.4rem 0.55rem;
  }
`

const SpeedUpCard = styled(StatCard)`
  border-color: #0e7490;
`

// Matches the tier rows' own Buy/tickspeed button font size (see BuyButton/UpgradeButton) rather
// than the larger default Button size every other standalone card button uses — keeps this
// button visually consistent with the tier list just above it.
const SpeedUpButton = styled(Button)`
  font-size: 0.82em;

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

const GlobalTickspeedCard = styled(StatCard)`
  border-color: #1d4ed8;
`

// Shared by the Money and Prestige Point balance displays — the only top-of-page blocks besides
// Header that are centered rather than left-aligned. $actionable (used only by the PP display,
// once Prestige is available) makes the whole card double as the Prestige button, matching the
// tier rows' own whole-tile-clickable-plus-title pattern (see TierNameTrigger) rather than the
// "don't combine those on a passive tile" call made for the offline notice card.
const CenteredCard = styled(StatCard)`
  align-items: center;
  text-align: center;

  ${props => (props.$actionable || props.$expandable) && css`
    cursor: pointer;

    &:hover {
      filter: brightness(1.15);
    }
  `}

  ${props => props.$actionable && css`
    &:focus-visible {
      outline: 2px solid ${props.theme.color.warn};
      outline-offset: 2px;
    }
  `}

  ${props => props.$expandable && css`
    &:focus-visible {
      outline: 2px solid ${props.theme.color.accent};
      outline-offset: 2px;
    }
  `}
`

// Muted/accent text scoped to this HUD region only — a deliberate fork of the app-wide
// MutedText (still hardcoded, still used by TierList/SpeedUpCard/GlobalTickspeedCard) rather
// than migrating those shared components here: they're each other
// sub-issues' own scope (#138/#139), chained to avoid touching MainPage's shared components out
// of turn. Token-driving just these two keeps this region's own AA audit meaningful (MutedText's
// hardcoded #a3a3a3 fails contrast against the light theme's white surface) without reaching into
// those other regions' still-unmigrated styling.
const HudMutedText = styled.p`
  color: ${props => props.theme.color.textMuted};
  margin: 0;
`

// 1.25em (20px against the 16px root) is deliberate, not decorative: theme.color.warn against a
// white light-theme surface measures ~3.6:1 — below the 4.5:1 AA floor for normal text, but a
// styled.b is bold by default, and WCAG's bold-text AA floor drops to 3:1 once the text is also
// >=14pt (18.66px); 1.1em (17.6px) fell just short of that, so this is sized up to clear it with
// margin rather than picked for visual weight alone.
const HudGoldText = styled.b`
  color: ${props => props.theme.color.warn};
  font-size: 1.25em;
`

// The money hero figure — Money's own default size stays a smaller, general-purpose default (it's
// only used here today, but isn't renamed/moved so a future non-hero usage isn't forced into hero
// sizing); this wrapper is what actually renders at the HUD's largest, most prominent scale. Money
// keeps rendering its own generated class alongside MoneyHero's, so StickyBalances' existing
// `${Money} { ... }` compressed-layout override below still matches this element too.
const MoneyHero = styled(Money)`
  font-family: ${props => props.theme.font.body};
  font-size: ${props => props.theme.type.scale.hero.size};
  line-height: ${props => props.theme.type.scale.hero.lineHeight};
  padding: 0;
`

// Visual (not accessible-name-bearing — see the sibling VisuallyHidden role="progressbar" at the
// call site) progress-to-Prestige bar living inside the money hero card. Reuses
// getPrestigeProgressPercent's already-computed value (see MainPage) rather than recomputing it.
const GoogolProgressTrack = styled.div`
  background: ${props => props.theme.color.surfaceSunken};
  border-radius: ${props => props.theme.radius.pill};
  height: 0.4rem;
  margin-top: 0.5rem;
  overflow: hidden;
  width: 100%;
`

const GoogolProgressFill = styled.div`
  background: ${props => props.theme.color.accent};
  height: 100%;
  transition: width ${props => props.theme.motion.duration.slow} ${props => props.theme.motion.easing.out};
  width: ${props => props.$percent}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const GoogolProgressLabel = styled(HudMutedText)`
  font-size: ${props => props.theme.type.scale.xs.size};
  margin-top: 0.3rem;
`

// Prestige Points as a secondary header line beneath the money hero — same CenteredCard base
// (so it keeps $actionable's Prestige-button behavior once canPrestige), just flattened (no
// shadow, tighter padding) so it visually reads as subordinate to the money hero above it rather
// than a second card of equal visual weight.
const PpHeaderCard = styled(CenteredCard)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`

// The Money balance card's click-to-expand breakdown of every global (not per-tier) production
// multiplier currently in effect — Prestige's passive speed bonus, Speed Up, and the Global
// Tickspeed Multiplier (see "The global tickspeed multiplier"/"Speed Up"/"Prestige Points,
// autobuyer unlock, and the tickspeed multiplier" in CLAUDE.md). Left-aligned (overriding
// CenteredCard's own text-align: center) for list readability, same technique FullScreenCard's own
// ul already uses.
const GlobalMultipliersList = styled.ul`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.8em;
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  text-align: left;

  li {
    margin: 0.15rem 0;
  }
`

// Keeps both balances visible at all times: the Money + PP pair sticks to the top of the viewport
// once the page scrolls past their normal position, and compresses into a compact side-by-side
// bar while stuck ($compressed — tracked via an IntersectionObserver on the sentinel rendered
// just above, since CSS alone can't detect "currently stuck"). The solid page-background fill
// stops scrolled tier rows showing through the gap between the two cards, and when the fixed
// TopPrestigeBar is showing ($belowBar), the stick position drops below it by $belowBarHeight
// (measured live, see topPrestigeBarHeight below) instead of underlapping it.
const StickyBalances = styled.div`
  background: ${props => props.theme.color.page};
  display: flex;
  flex-direction: ${props => (props.$compressed ? 'row' : 'column')};
  gap: ${props => (props.$compressed ? '0.5rem' : '0.6rem')};
  position: sticky;
  top: ${props => (props.$belowBar ? `${props.$belowBarHeight}px` : '0')};
  z-index: 100;
  /* Promotes this sticky element to its own compositor layer so Chromium repaints it via GPU
     compositing while scrolling instead of repainting from scratch each frame — without this, a
     sticky element with a background fill (needed here so scrolled tier rows don't show through
     the gap between the two cards) can visibly flicker/flash during scroll. */
  will-change: transform;

  ${props => props.$compressed && css`
    box-shadow: ${props.theme.shadow.md};
    padding: 0.25rem 0;

    ${CenteredCard} {
      flex: 1;
      gap: 0.2rem;
      justify-content: center;
      min-width: 0;
      padding: 0.3rem 0.6rem;
    }

    /* CenteredCard's align-items: center (needed to center these cards' content when expanded)
       otherwise lets a flex-column child shrink-wrap to its own full content width instead of the
       card's allotted share — silently defeating the overflow/ellipsis rules below and letting a
       long balance or PP status string visually spill into the neighboring card. An explicit
       width pins each child to the card's actual width so truncation has something to truncate
       against. */
    ${Money} {
      font-size: 1em;
      overflow: hidden;
      padding: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    p {
      font-size: 0.85em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
  `}
`

// Zero-impact scroll marker for StickyBalances' "am I stuck?" detection — the negative margin
// cancels the extra RootDiv flex-gap slot this element would otherwise add, so the page's
// spacing is unchanged by its presence.
const BalancesSentinel = styled.div`
  height: 1px;
  margin-top: calc(-0.85rem - 1px);
`

// A native click-to-expand disclosure replacing always-visible description prose — the summary
// line (a card's own heading, or a one-line notice) stays minimal, and clicking it reveals the
// full explanation. Native <details>/<summary> keeps this keyboard/screen-reader accessible with
// no JS state; the collapsed content stays in the DOM, so aria-describedby references into it
// (and textContent-based tests) still resolve either way. The disclosure marker (▸) is hidden
// deliberately: no inherent visual clue that the heading expands — players discover it by
// clicking (screen readers still announce the summary as collapsed/expanded regardless).
const InfoDetails = styled.details`
  summary {
    cursor: pointer;
    list-style: none;
    user-select: none;
    width: fit-content;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:hover {
    color: #d4d4d4;
  }

  summary h1,
  summary h2 {
    display: inline;
    margin: 0;
  }

  p {
    margin-top: 0.4rem;
  }
`

// Per-tier click-to-expand disclosure surfacing numbers that don't fit the row's compact layout —
// most notably each tier's own base/effective tickspeed, now that base tickspeed diverges per
// tier again (see "Tier production tickspeed" in CLAUDE.md). No separate visible "Details" label:
// TierName itself is the trigger. This is a plain React-controlled disclosure (openTierDetailIds,
// see MainPage), not native <details>/<summary> — a display:contents-based version (matching the
// pattern every other InfoDetails disclosure in this file uses) was tried first, but hit a real
// Chromium limitation where a display:contents ancestor breaks a promoted grid child's ability to
// span multiple grid-template-areas cells, collapsing TierDetailsContent below to a single
// column's width instead of the full row (confirmed with a minimal repro, independent of whether
// the span was expressed via a named area or explicit grid-column line numbers). TierNameTrigger
// carries the interactive role/keyboard handling that native <summary> would otherwise provide
// for free; TierName (the h3 inside it) keeps its own heading semantics, since applying role via
// ARIA only overrides an element's OWN implicit role, never a nested descendant's.
const TierNameTrigger = styled.div`
  grid-area: name;
  min-width: 0;
  cursor: pointer;
`

// Holds the disclosure's actual content, occupying the 'details' grid area — only rendered at all
// while its tier is in openTierDetailIds (see MainPage), so a collapsed row contributes zero
// height there, same footprint as before this disclosure existed.
const TierDetailsContent = styled.div`
  grid-area: details;
  font-size: 0.8em;

  ul {
    color: ${props => props.theme.color.textMuted};
    margin: 0.3rem 0 0;
    padding-left: 1.1rem;
  }

  li {
    margin: 0.15rem 0;
  }
`

// Mandatory full-screen takeover shown only the very first time Money reaches GOOGOL (before the
// player has ever prestiged) — covers the whole viewport so the frozen, disabled page underneath
// is never visible/reachable; there's deliberately no close/dismiss control (see PrestigeButton
// below, the only thing left clickable while frozen).
const FullScreenOverlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.96);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 2rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`

const FullScreenCard = styled.div`
  color: white;
  max-width: 28rem;
  text-align: center;
  width: 100%;

  h2 {
    color: #fbbf24;
    font-size: 1.6rem;
    margin: 0 0 0.75rem;
  }

  ul {
    color: #d4d4d4;
    margin: 1rem 0 1.5rem;
    padding-left: 1.25rem;
    text-align: left;
  }

  li {
    margin: 0.3rem 0;
  }
`

// From the 2nd prestige onward, reaching GOOGOL again shows a compact banner pinned to the top
// of the viewport instead of the full-screen takeover — the player already knows what Prestige
// does, so a persistent-but-unobtrusive reminder is enough.
const TopPrestigeBar = styled.div`
  align-items: center;
  background: #1c1206;
  border-bottom: 2px solid #854d0e;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  left: 0;
  padding: 0.6rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 900;
`

// Reserves space at the top of the page so TopPrestigeBar (position: fixed) never overlaps the
// Header underneath it. $height is measured live from the bar itself (see topPrestigeBarHeight)
// rather than a fixed constant — TopPrestigeBar's flex-wrap lets its content wrap to two lines on
// narrow viewports (the reminder sentence is long enough to wrap well before 40rem), and a
// hardcoded single-line height would silently let the taller bar overlap the Header below it.
const TopPrestigeBarSpacer = styled.div`
  height: ${props => props.$height}px;
`

const MutedText = styled.p`
  color: #a3a3a3;
  margin: 0;
`

// The app version, always visible beside the page title (no interaction/expansion needed) —
// unlike the tagline in InfoDetails' collapsed body below it. Reuses MutedText's muted-text
// convention rather than a one-off color, rendered `as` a span since `<summary>` only allows
// phrasing content, not MutedText's default block-level `<p>`.
const VersionText = styled(MutedText).attrs({ as: 'span' })`
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`

// Name + compact autobuyer speed badge sharing the top line's first track. The badge shows only
// the multiplier (⚙ ×1.1) — the autobuyer's level is deliberately not shown here, since a "Lv."
// on this row would read as a duplicate of the Buy button's purchase level; the level lives in
// the badge's (and Upgrade button's) title tooltip instead. The name never shrinks
// (flex-shrink: 0); the badge ellipsizes first if the track runs out.
const TierName = styled.h3`
  align-items: baseline;
  column-gap: 0.4rem;
  display: flex;
  font-size: 1em;
  margin: 0;
  min-width: 0;

  @media (max-width: 40rem) {
    font-size: 0.95em;
  }
`

const TierNameLabel = styled.span`
  flex-shrink: 0;
`

const GreenText = styled.span`
  color: ${props => props.theme.color.good};
  font-size: 0.85em;
  ${gridCell}
`

// A deliberate per-component override of the color MutedText's own (still-hardcoded, #139 scope
// — see the HudMutedText comment above) definition would otherwise inherit, so the tier row's own
// two grid cells read from theme.color.textMuted without migrating MutedText itself.
const OwnedText = styled(MutedText)`
  grid-area: owned;
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85em;
  text-align: right;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

const ProductionText = styled(MutedText)`
  grid-area: production;
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

// The fill (green = already bought this cost block, amber = affordable but not yet bought)
// renders directly on the button via $progress/$secondaryProgress instead of a separate bar.
const BuyButton = styled(Button)`
  grid-area: buy;
  width: 100%;
  font-size: 0.82em;
  padding: 0.4em 0.45em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
    padding: 0.38em 0.4em;
  }
`

// Scoped to the tier row's Buy button cost label only — not the shared Button component used
// elsewhere in the app (Prestige, Reset, PP Upgrades, …), which keep ButtonIcon/ButtonLabel's
// default fixed-icon/centered-label layout unchanged. Here, the icon+level slot and the cost label
// each take a fixed half of the button's width, and the cost label is left-aligned (rather than
// centered) from that halfway point — so every tier row's cost figure starts at the same x
// position (the button's horizontal center) regardless of how many digits the level/progress or
// cost strings have, instead of drifting as those change. `padding-right` reserves a real gap
// before the cost label — a trailing space character in the JSX content isn't reliable here, since
// browsers trim trailing whitespace at a flex item's own box edge (border-box sizing, set globally
// in GlobalStyle.js, keeps this box exactly 50% wide including the padding). `min-width: 0` +
// overflow/ellipsis clip a level/progress string too long to fit its half (e.g. once the block size
// has grown, or at a high level number) instead of letting it spill into the cost label's box —
// without min-width: 0, a flex item's default min-width: auto prevents overflow: hidden from
// engaging at all.
const BuyButtonIcon = styled(ButtonIcon)`
  flex: 0 0 50%;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.35em;
`

const BuyButtonCostLabel = styled(ButtonLabel)`
  flex: 0 0 50%;
  text-align: left;
`

const UpgradeButton = styled(Button)`
  grid-area: upgrade;
  width: 100%;
  font-size: 0.82em;
  padding: 0.4em 0.45em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
    padding: 0.38em 0.4em;
  }
`

// Deliberately small — Reset is not a prominent action, and its own confirm() prompt (see
// handleResetClick) is the real guard against an accidental click.
const ResetButton = styled(Button)`
  font-size: 0.72em;
  padding: 0.3em 0.55em;
`

// Tab pair switching MainPage between the Game view and the PP Upgrades view — a local view-state
// toggle, not real routing (this stays a single-page app, see CLAUDE.md). Only rendered once
// !isFirstRun, since Prestige Points don't exist as a concept for the player before their first
// prestige — same gate every other PP surface already uses.
const ViewNav = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ViewTabButton = styled(Button)`
  flex: 1;
  position: relative;
`

// Small affordability indicator on the PP Upgrades tab — lit whenever unspent PP can afford at
// least one purchase on that page, so the player knows to check in without having to open it on
// spec every time.
const NavDot = styled.span`
  background: #4ade80;
  border-radius: 50%;
  display: inline-block;
  height: 0.5em;
  margin-left: 0.4em;
  width: 0.5em;
`

// PP Upgrades page: grouped into a handful of labeled categories (Tier Autobuyers, Global
// Automation, Production Bonuses) rather than one flat list — each category is a single
// StatCard, with rows inside it (UpgradeRow) as lean, unboxed flex rows separated by a thin
// divider, instead of the old one-StatCard-per-row layout. This keeps the page compact: N
// upgrades within a category cost one card's worth of border/padding chrome, not N.
const UpgradesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`

const UpgradeCategory = styled(StatCard)`
  gap: 0.4rem;
`

const CategoryHeading = styled.h2`
  color: #a3a3a3;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

// One row per tier/upgrade within a category — a simpler flex layout than the Game view's
// TierLine grid, since each row holds at most one button (Unlock → Smart → the "Smart" badge, the
// same single-control-at-a-time progression the Game view's tier rows used to show inline). No
// border/background of its own — the enclosing UpgradeCategory provides that — just a thin top
// divider between consecutive rows so a whole category still reads as a distinct list.
const UpgradeRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid #262626;
  }
`

const PpUpgradeButton = styled(Button)`
  font-size: 0.82em;
  min-width: 8.5rem;
  padding: 0.4em 0.6em;
`

// $dimmed is the "paused" signal — a subtle opacity reduction on the same icon rather than a
// separate written "Paused" word (see MainPage): the badge's visible content is icon-only, with
// the active/paused state conveyed by this dimming (plus the existing $color green/amber split)
// and spelled out in aria-label/title for assistive tech.
const PpUpgradeBadge = styled.span`
  color: ${props => props.$color};
  opacity: ${props => (props.$dimmed ? 0.5 : 1)};
`

// Groups an active/paused status badge with its pause/resume toggle as a single flex item, so an
// UpgradeRow's existing two-child (label, control) `justify-content: space-between` layout still
// holds once a bought global automation gets a second, smaller control alongside its badge.
const UpgradeRowControls = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`

// Small secondary control, visually subordinate to the badge/level text it sits beside (see #171)
// — a plain icon toggle rather than a costed action button.
const PauseToggleButton = styled(Button)`
  font-size: 0.75em;
  min-width: 0;
  padding: 0.3em 0.5em;
`

const formatCost = (amount, resourceId) =>
  resourceId === MONEY_ID
    ? formatCurrency(amount)
    : `${formatAmount(amount)} ${RESOURCE_SYMBOL(resourceId)}`

// Live "how close am I" fill percent for a progress meter (PP/tickspeed/Speed Up buttons, XP
// consumption) — how much of `denominator` the current `numerator` already covers, capped at 100.
const progressPercent = (numerator, denominator) => Math.min(100, Math.round((numerator / denominator) * 100))

// "1.1" / "1.21" / "1" — rounds to 2 decimal places and trims a trailing ".00"/trailing zero,
// used for multiplier displays (Speed Up's next multiplier, the PP production speed bonus).
const formatRate = value => (Math.round(value * 100) / 100).toFixed(2).replace(/\.?0+$/, '')

// Whole-percent bonus a multiplier represents above baseline (×1.21 → 21) — used below +100% for
// the tickspeed multiplier badge/labels; see formatBonusOrMultiplier below for +100% and beyond.
const formatBonusPercent = multiplier => Math.round((multiplier - 1) * 100)

// The global tickspeed multiplier's bonus percent, shown with up to 2 decimal places (trimming a
// trailing ".00"/trailing zero, same style as formatRate) — its regular 1%-per-level compounding
// (see GLOBAL_TICKSPEED_PRODUCTION_STEP/getGlobalTickspeedProductionMultiplier in engine.js) lands
// on fractional values a whole-percent rounding would otherwise obscure. Always called below
// +100% — formatBonusOrMultiplier below switches to the ×N multiplier form at/above that, where
// this fractional precision no longer matters.
const formatGlobalTickspeedBonusPercent = multiplier =>
  (Math.round((multiplier - 1) * 100 * 100) / 100).toFixed(2).replace(/\.?0+$/, '')

// A bonus multiplier reads as a percentage below +100% ("+21%"), and as a Speed-Up-style "Nx"
// multiplier at/above it ("2x", "5.5x") — a percentage gets unwieldy once it doubles the baseline,
// and "Nx" is already this app's convention for large stacking bonuses (Speed Up's own ×N). Pass
// `precise: true` to use the global tickspeed multiplier's fractional-percent formatting for the
// below-100% case instead of the whole-number one.
const formatBonusOrMultiplier = (multiplier, { precise = false } = {}) =>
  multiplier >= 2
    ? `${formatRate(multiplier)}x`
    : `+${precise ? formatGlobalTickspeedBonusPercent(multiplier) : formatBonusPercent(multiplier)}%`

// Auto-collapses a native <details> disclosure once it scrolls fully out of the viewport (either
// direction) — every InfoDetails instance in this file is uncontrolled (no `open` prop passed by
// React), so setting the DOM node's `.open` property directly here is safe and won't be fought by
// a re-render. isIntersecting only flips false once the element has zero overlap with the
// viewport (the default threshold: 0), i.e. "scrolled beyond screen" rather than merely partially
// cut off. Returns a ref to attach to the <details> element; a no-op in environments without
// IntersectionObserver (e.g. jsdom in tests), where a disclosure simply stays open once expanded.
const useAutoCollapseDetails = () => {
  const detailsRef = useRef(null)
  useEffect(() => {
    const details = detailsRef.current
    if (!details || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && details.open) details.open = false
    })
    observer.observe(details)
    return () => observer.disconnect()
  }, [])
  return detailsRef
}

const MainPage = () => {
  const { actions, dismissOfflineProgress, offlineProgress, resetGame, state } = useIncrementalGame()
  const theme = useTheme()
  const { prestige } = state
  // Live "how close am I" fill for every PP-spending button, mirroring the tier buttons'
  // on-button progress treatment: how much of a given PP cost the current unspent balance
  // already covers.
  const ppProgressPercent = cost => progressPercent(prestige.points, cost)
  const canPrestige = state.resources[MONEY_ID] >= GOOGOL
  // The passive PP production-speed bonus is inert until unlocked (see buyPrestigeSpeedBonus in
  // engine.js) — before that, it's a flat ×1 regardless of unspent PP balance.
  const prestigeBonus = state.prestigeSpeedBonusUnlocked
    ? getPrestigeProductionMultiplier(prestige.points)
    : 1
  const prestigePointsPreview = getPrestigePointsAwarded(state.resources[MONEY_ID])
  const prestigeProgressPercent = getPrestigeProgressPercent(state.resources[MONEY_ID])
  // What a Prestige would award — shown on the Prestige button itself (Buy-button style: the
  // effect lives on the control, not in a separate text line). Below Googol the formula reads 0,
  // but the award on reaching it is always at least 1, so that's the effect worth advertising.
  const prestigeAwardPreview = Math.max(1, prestigePointsPreview)
  const prestigeLabel = 'Prestige (requires 1 Googol Bits)'
  const prestigeAriaLabel = `${prestigeLabel} — awards +${formatAmount(prestigeAwardPreview)} Prestige Point${prestigeAwardPreview === 1 ? '' : 's'}`
  // Which top-level view is showing — a local toggle, not real routing (see ViewNav above). Reset
  // back to 'game' on a full Reset, alongside the reveal flags below.
  const [view, setView] = useState('game')
  // Reset is irreversible (wipes the whole save), so it's gated behind a native confirm() rather
  // than firing immediately on click — there's no modal/confirm component elsewhere in this app
  // to reuse, so window.confirm is the simplest fit.
  const handleResetClick = () => {
    if (window.confirm('Erase all progress and start over? This cannot be undone.')) {
      resetGame()
      setView('game')
      setSpeedUpEverRevealed(false)
      setGlobalTickspeedCardEverRevealed(false)
    }
  }
  // Snapshot of which tiers were already unlocked as of this page load (captured once, via a
  // lazy initializer, from whatever loadGameState() returned) — a tier unlocked before this
  // load never plays the reveal animation, even though every unlocked row technically "mounts"
  // fresh on every load; only a tier unlocking during this session (not in the snapshot) does.
  const [initialUnlockedIds] = useState(() =>
    new Set(TIER_DEFINITIONS.filter(tier => isTierUnlocked(state)(tier)).map(tier => tier.id))
  )
  // Which tier rows currently have their details disclosure expanded — a plain React-controlled
  // set rather than native <details>/<summary>, because the natural approach (TierName nested
  // inside a display:contents <summary>/<details> pair, so it can sit in its usual 'name' grid
  // slot with no separate visible trigger) hits a real Chromium limitation: a display:contents
  // ancestor breaks a promoted grid child's ability to span multiple grid-template-areas cells —
  // confirmed with a minimal repro (the details content collapsed to a single column's width
  // instead of the full row) regardless of whether the span is expressed via a named area or
  // explicit grid-column line numbers. This keeps TierName as the visible trigger and the
  // details content spanning the full row width, at the cost of reimplementing the
  // expand/collapse and keyboard behavior manually (see TierNameTrigger below) instead of getting
  // it for free from native <details>.
  const [openTierDetailIds, setOpenTierDetailIds] = useState(() => new Set())
  const toggleTierDetails = tierId => setOpenTierDetailIds(previous => {
    const next = new Set(previous)
    if (next.has(tierId)) next.delete(tierId)
    else next.add(tierId)
    return next
  })
  // Auto-collapses a tier's Details disclosure once its row scrolls fully out of the viewport, the
  // React-controlled-disclosure equivalent of useAutoCollapseDetails above (native <details> can't
  // be used here — see TierDetailsContent's own comment for why). A single shared
  // IntersectionObserver watches every currently-rendered tier row (registered/unregistered via a
  // stable per-tier ref callback, cached in tierRowRefCallbacksRef so its identity doesn't change
  // across re-renders — a fresh callback identity every render would make React re-invoke it with
  // null then the element again on every tick, needlessly churning observe/unobserve) rather than
  // one observer per row, since rows come and go as tiers unlock/lock across Prestige/Speed Up.
  const tierRowObserverRef = useRef(null)
  const tierRowElementsRef = useRef(new Map())
  const tierRowRefCallbacksRef = useRef(new Map())
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) return
        const tierId = entry.target.dataset.tierId
        setOpenTierDetailIds(previous => {
          if (!previous.has(tierId)) return previous
          const next = new Set(previous)
          next.delete(tierId)
          return next
        })
      })
    })
    tierRowObserverRef.current = observer
    return () => observer.disconnect()
  }, [])
  const registerTierRowRef = tierId => {
    if (!tierRowRefCallbacksRef.current.has(tierId)) {
      tierRowRefCallbacksRef.current.set(tierId, element => {
        const observer = tierRowObserverRef.current
        const previousElement = tierRowElementsRef.current.get(tierId)
        if (observer && previousElement && previousElement !== element) observer.unobserve(previousElement)
        if (element) {
          tierRowElementsRef.current.set(tierId, element)
          if (observer) observer.observe(element)
        } else {
          tierRowElementsRef.current.delete(tierId)
        }
      })
    }
    return tierRowRefCallbacksRef.current.get(tierId)
  }
  // Native <details> disclosures (see useAutoCollapseDetails above) get the same treatment, one
  // ref per fixed card — there's no list/remount churn to worry about for these, unlike the tier
  // rows above, so a plain per-instance hook call is simpler than a shared-observer registry.
  const headerDetailsRef = useAutoCollapseDetails()
  const globalTickspeedDetailsRef = useAutoCollapseDetails()
  const speedUpDetailsRef = useAutoCollapseDetails()
  const fullSmartAutobuyerDetailsRef = useAutoCollapseDetails()
  // Whether the Money balance card's global-multipliers breakdown is expanded — a plain UI toggle
  // (not reset by handleResetClick, same as openTierDetailIds above) rather than a native
  // <details>/<summary> disclosure, since the disclosure's content is suppressed entirely while
  // the sticky balances bar is compressed (see its render site below) rather than merely styled
  // smaller, which a CSS-only native disclosure couldn't express as cleanly.
  const [showGlobalMultipliers, setShowGlobalMultipliers] = useState(false)
  const toggleGlobalMultipliers = () => setShowGlobalMultipliers(previous => !previous)
  // Smart requires the tier's autobuyer to already be unlocked (see buySmartAutobuyer); the tier
  // tickspeed autobuyer needs no such prerequisite — it unlocks on its own milestone (see
  // applyAutobuyerMilestones in engine.js) — but since Smart being bought already implies the
  // autobuyer is unlocked, "both bought" below still means every automation available for that
  // tier is in place. Once every tier has both
  // (`allTiersFullyAutomated`), there's nothing left in this whole progression for any tier, so the
  // per-tier PP Upgrades row disappears everywhere and a one-line notice explains why, rather than
  // leaving a permanent "done" row for all 10 tiers forever.
  const allTiersFullyAutomated = TIER_DEFINITIONS.every(tier =>
    state.smartAutobuyer?.[tier.id] && state.tierTickspeedAutobuyer?.[tier.id]
  )

  // All production and purchasing freezes the instant Money reaches GOOGOL (see
  // isProductionFrozen in engine.js) — Prestige is the only remaining action. The first time
  // this ever happens (before the player has prestiged even once) it's a mandatory full-screen
  // takeover; every time after that, it's a compact banner pinned to the top of the page instead,
  // since the player already knows what Prestige does.
  const isFrozen = isProductionFrozen(state)
  const isFirstRun = prestige.count === 0
  // The purchase block size every tier's current level currently requires to complete — a single
  // global value (see getPurchaseBlockSize in engine.js), starting at DEFAULT_PURCHASE_BLOCK_SIZE
  // and growing over the course of a run; computed once here rather than per-tier below, since
  // every tier shares the same value.
  const purchaseBlockSize = getPurchaseBlockSize(state)
  const showFullScreenPrompt = isFrozen && isFirstRun
  const showTopPrestigeBar = isFrozen && !isFirstRun
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  const lastTierLevel = state.purchaseLevels?.[lastTier.id] ?? 1

  // Speed Up: a more frequent soft-reset than Prestige, available well before Money reaches
  // GOOGOL (see speedUpGame in engine.js) — once the last tier reaches that cycle's requirement
  // (getSpeedUpRequirement(speedUpCount): level 2 for the first activation, level 3 for the
  // second, level 4 for the third, …), it resets tiers/resources but permanently doubles
  // production speed, stacking with every prior activation. Gated on the last tier having ever
  // been unlocked, same progressive-disclosure principle as the Prestige card gate above, so it
  // doesn't clutter the page before tier10 first exists — but once shown, stays shown (in a
  // disabled state once not immediately actionable) rather than disappearing again the moment a
  // successful Speed Up wipes tier10 back below the unlock threshold; see the
  // speedUpEverRevealed effect below.
  const lastTierUnlocked = isTierUnlocked(state)(lastTier)
  const [speedUpEverRevealed, setSpeedUpEverRevealed] = useState(lastTierUnlocked)
  useEffect(() => {
    if (lastTierUnlocked) setSpeedUpEverRevealed(true)
  }, [lastTierUnlocked])
  const speedUpCount = state.speedUpCount ?? 0
  const speedUpMultiplier = getSpeedUpMultiplier(speedUpCount)
  const nextSpeedUpMultiplier = getSpeedUpMultiplier(speedUpCount + 1)
  const speedUpRequirement = getSpeedUpRequirement(speedUpCount)
  // purchaseLevels/getSpeedUpRequirement are internally 1-indexed so that "level 1" means "no
  // completed block yet" (see CLAUDE.md's "purchase block size and tier levels"). Displayed to the
  // player, that reads as an off-by-one — this subtracts 1 so the visible "Lv." instead counts
  // completed blocks directly: Lv.1 after the first 8 purchases, Lv.2 after 16, etc.
  const lastTierLevelDisplay = lastTierLevel - 1
  const speedUpRequirementDisplay = speedUpRequirement - 1
  const speedUpProgressPercent = progressPercent(lastTierLevelDisplay, speedUpRequirementDisplay)
  const canSpeedUp = !isFrozen && lastTierLevel >= speedUpRequirement
  // Automates Speed Up (see buyAutoSpeedUp in engine.js) — gated on !isFirstRun like every other
  // PP-spending control (see "Prestige info is hidden until first prestige"), but NOT on
  // allTiersFullyAutomated the way Auto-Prestige is: Speed Up is meant to help early/mid-game, well before
  // that endgame milestone.
  const isAutoSpeedUpActive = state.autoSpeedUp ?? false
  const canBuyAutoSpeedUp = !isFrozen && !isAutoSpeedUpActive && !isFirstRun && prestige.points >= AUTO_SPEED_UP_COST
  // Whether Auto Speed Up currently acts, independent of whether it's been bought (see
  // setAutoSpeedUpEnabled/tickGame in engine.js) — a pause/resume preference, not a purchase.
  const autoSpeedUpEnabled = state.autoSpeedUpEnabled ?? true

  // Automates the (Money-funded) global tickspeed multiplier (see buyTickspeedAutobuyer in
  // engine.js) — once bought, tickGame upgrades it automatically whenever affordable, mirroring
  // Auto Speed Up's one-time-unlock pattern rather than Auto-Prestige's leveled one, since there's
  // no cadence to speed up here either.
  const isTickspeedAutobuyerActive = state.autoGlobalTickspeed ?? false
  const canBuyTickspeedAutobuyer = !isFrozen && !isTickspeedAutobuyerActive && !isFirstRun && prestige.points >= TICKSPEED_AUTOBUYER_COST
  // Whether the global Tickspeed Autobuyer currently acts, independent of whether it's been
  // bought (see setAutoGlobalTickspeedEnabled/tickGame in engine.js).
  const tickspeedAutobuyerEnabled = state.autoGlobalTickspeedEnabled ?? true

  // One-time PP unlock for the passive production-speed bonus (see buyPrestigeSpeedBonus in
  // engine.js) — before this is bought, prestigeBonus above is a flat ×1 regardless of balance.
  // Shown as soon as the PP Upgrades page itself is reachable (!isFirstRun) — no separate
  // "revealed one by one" teaser gate on top of that.
  const canBuySpeedBonus = !isFrozen && !state.prestigeSpeedBonusUnlocked && prestige.points >= PRESTIGE_SPEED_BONUS_UNLOCK_COST

  // Auto-Prestige is a single global (not per-tier) leveled upgrade, mirroring the tier autobuyer
  // Lv./Upgrade pattern — once activated (level 1), it fires roughly every
  // AUTO_PRESTIGE_BASE_INTERVAL_SECONDS once Money is at/above GOOGOL; each further level speeds
  // that up by 10% at double the previous level's cost (see getAutoPrestigeAttemptRate/
  // getAutoPrestigeCost).
  const autoPrestigeLevel = state.autoPrestige ?? null
  const isAutoPrestigeActive = autoPrestigeLevel !== null
  const autoPrestigeCost = getAutoPrestigeCost(autoPrestigeLevel ?? 0)
  const canBuyAutoPrestige = !isFrozen && prestige.points >= autoPrestigeCost
  const autoPrestigeIntervalSeconds = isAutoPrestigeActive
    ? Math.round(1 / getAutoPrestigeAttemptRate(autoPrestigeLevel))
    : null
  // Whether Auto-Prestige currently acts, independent of whether it's been bought (see
  // setAutoPrestigeEnabled/tickGame in engine.js).
  const autoPrestigeEnabled = state.autoPrestigeEnabled ?? true

  // Automates RE-LEVELING Auto-Prestige itself (see buyAutoPrestigeAutobuyer in engine.js) — a
  // "meta-automation" companion to Auto-Prestige, distinct from activating it in the first place;
  // only buyable once Auto-Prestige is already active (isAutoPrestigeActive).
  const isAutoPrestigeAutobuyerActive = state.autoPrestigeAutobuyer ?? false
  const canBuyAutoPrestigeAutobuyer = !isFrozen && isAutoPrestigeActive && !isAutoPrestigeAutobuyerActive && prestige.points >= AUTO_PRESTIGE_AUTOBUYER_COST
  // Whether the Auto-Prestige Autobuyer currently acts, independent of whether it's been bought
  // (see setAutoPrestigeAutobuyerEnabled/tickGame in engine.js).
  const autoPrestigeAutobuyerEnabled = state.autoPrestigeAutobuyerEnabled ?? true

  // The global tickspeed multiplier is a single global (not per-tier) leveled upgrade, mirroring
  // Auto-Prestige's null/level pattern — each level speeds up *every* tier's delivery frequency by
  // another 1% at once, not the amount delivered (see
  // getGlobalTickspeedProductionMultiplier/buyGlobalTickspeedMultiplier). Unlike
  // every other automation upgrade on this page, it's Money-funded (not PP) and lives on the Game
  // view instead of the PP Upgrades page — see isGlobalTickspeedMultiplierUnlocked in engine.js:
  // it only becomes purchasable once at least 1 of the second tier is owned, so a player can't
  // accidentally spend their only Money on it before they have a second income source (tier01's
  // own cost/production resource is Money itself). The level itself resets to not-yet-bought on
  // both Prestige and Speed Up (see prestigeGame/speedUpGame in engine.js), same as tier02's
  // owned count, so re-unlocking always requires owning tier02 again after either reset.
  const globalTickspeedLevel = state.globalTickspeedMultiplier ?? null
  const isGlobalTickspeedActive = globalTickspeedLevel !== null
  const globalTickspeedMultiplier = getGlobalTickspeedProductionMultiplier(globalTickspeedLevel)
  const globalTickspeedCost = getGlobalTickspeedMultiplierCost(globalTickspeedLevel ?? 0)
  const globalTickspeedUnlocked = isGlobalTickspeedMultiplierUnlocked(state)
  const canBuyGlobalTickspeed = !isFrozen && globalTickspeedUnlocked && state.resources[MONEY_ID] >= globalTickspeedCost
  const globalTickspeedProgressPercent = progressPercent(state.resources[MONEY_ID], globalTickspeedCost)
  // Progressive disclosure, same pattern as speedUpEverRevealed above:
  // once the card has ever been relevant (tier02 owned, or the multiplier already active from a
  // prior run), it stays visible — in a disabled state — rather than disappearing again the
  // moment a Prestige/Speed Up resets tier02's owned count back to 0.
  const [globalTickspeedCardEverRevealed, setGlobalTickspeedCardEverRevealed] = useState(globalTickspeedUnlocked)
  useEffect(() => {
    if (globalTickspeedUnlocked) setGlobalTickspeedCardEverRevealed(true)
  }, [globalTickspeedUnlocked])

  // Lights the PP Upgrades tab's dot whenever unspent PP can afford at least one purchase over
  // there — any tier's Smart (the only remaining PP-funded per-tier purchase; autobuyer unlock and
  // the tier tickspeed autobuyer are both free, prestige-count-milestone unlocks now — see
  // applyAutobuyerMilestones in engine.js, and the Milestones page they're tracked on instead), the
  // speed bonus unlock, Auto Speed Up, the (global) Tickspeed Autobuyer, or Auto-Prestige (once
  // revealed via allTiersFullyAutomated) — so the player knows to check in without opening the page
  // on spec every time. The global tickspeed multiplier *itself* is Money-funded and lives on the
  // Game view instead, so it doesn't factor in here — only its PP-funded automation toggle does.
  const hasAffordablePpUpgrade = !isFrozen && !isFirstRun && (
    TIER_DEFINITIONS.some(tier =>
      isTierUnlocked(state)(tier) &&
      (state.autobuyers[tier.id] ?? null) !== null &&
      !state.smartAutobuyer?.[tier.id] &&
      prestige.points >= getSmartAutobuyerCost(tier.id)
    ) ||
    canBuySpeedBonus ||
    canBuyAutoSpeedUp ||
    canBuyTickspeedAutobuyer ||
    (allTiersFullyAutomated && canBuyAutoPrestige)
  )

  // Auto-focus the full-screen prompt's Prestige button when it appears — it's the only
  // interactive element on screen while it's showing (no close/dismiss control by design).
  const fullScreenPrestigeButtonRef = useRef(null)
  useEffect(() => {
    if (showFullScreenPrompt) fullScreenPrestigeButtonRef.current?.focus()
  }, [showFullScreenPrompt])

  // Compress the sticky balance bar once its normal position scrolls out of view: the sentinel
  // sits just above StickyBalances, so it leaving the viewport means the pair is now pinned.
  // Guarded for environments without IntersectionObserver (jsdom in tests), where the balances
  // simply stay in their expanded form; keyed on showFullScreenPrompt since the sentinel doesn't
  // exist while the first-prestige takeover replaces the whole page.
  const balancesSentinelRef = useRef(null)
  const [balancesCompressed, setBalancesCompressed] = useState(false)
  useEffect(() => {
    const sentinel = balancesSentinelRef.current
    if (!sentinel || typeof IntersectionObserver === 'undefined') return undefined
    // The expanded/compressed layouts differ enough (flex direction, padding, box-shadow, extra
    // progress-bar/breakdown content) that flipping between them right at the sentinel's boundary
    // pixel — which momentum/trackpad scrolling can hover over for several frames — visibly
    // flickers. A short debounce absorbs that rapid back-and-forth into a single, settled update;
    // 60ms is well under human perception of a deliberate scroll pause but long enough to smooth
    // out the crossing itself.
    let debounceTimer = null
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => setBalancesCompressed(!entry.isIntersecting), 60)
    })
    observer.observe(sentinel)
    return () => {
      clearTimeout(debounceTimer)
      observer.disconnect()
    }
  }, [showFullScreenPrompt])

  // TopPrestigeBar's own rendered height, measured live rather than assumed — its flex-wrap lets
  // the reminder sentence wrap to two lines on narrow viewports, and both TopPrestigeBarSpacer
  // (below) and StickyBalances' stuck offset need the bar's *actual* height to avoid the fixed bar
  // overlapping the Header/balances underneath it. 60 (3.75rem at the default 16px root) is the
  // single-line fallback used before this was measured, kept as the initial/no-ResizeObserver
  // value so behavior is unchanged in environments without ResizeObserver (e.g. jsdom in tests).
  const topPrestigeBarRef = useRef(null)
  const [topPrestigeBarHeight, setTopPrestigeBarHeight] = useState(60)
  useEffect(() => {
    const bar = topPrestigeBarRef.current
    if (!bar || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => setTopPrestigeBarHeight(bar.offsetHeight))
    observer.observe(bar)
    return () => observer.disconnect()
  }, [showTopPrestigeBar])

  // Offline-progress notice: auto-dismisses after OFFLINE_NOTICE_AUTO_DISMISS_MS. offlineProgress
  // is a one-shot value fixed at mount (see useIncrementalGame — it only ever transitions
  // non-null → null via dismissOfflineProgress, never null → non-null after mount), so a lazy
  // initializer capturing its start/end timestamps at mount time is enough; no effect is needed to
  // (re)initialize it later, and the timing itself never changes afterward.
  const [offlineNoticeTiming] = useState(() => {
    if (!offlineProgress) return null
    const now = Date.now()
    return { start: now, end: now + OFFLINE_NOTICE_AUTO_DISMISS_MS }
  })
  const [offlineNoticeFading, setOfflineNoticeFading] = useState(false)
  const [offlineNoticeRemainingPercent, setOfflineNoticeRemainingPercent] = useState(100)
  useEffect(() => {
    // Guarded on offlineProgress (not just offlineNoticeTiming) so this effect re-runs — and its
    // interval cleanup fires — the instant the notice is dismissed (manually or via the fade
    // below), rather than leaving a 100ms interval running forever in the background.
    if (!offlineProgress || !offlineNoticeTiming || offlineNoticeFading) return undefined
    const { start, end } = offlineNoticeTiming
    const total = end - start
    const tick = () => {
      const remaining = end - Date.now()
      if (remaining <= 0) {
        setOfflineNoticeRemainingPercent(0)
        setOfflineNoticeFading(true)
        return
      }
      setOfflineNoticeRemainingPercent(Math.round((remaining / total) * 100))
    }
    tick()
    const interval = setInterval(tick, OFFLINE_NOTICE_PROGRESS_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [offlineProgress, offlineNoticeTiming, offlineNoticeFading])
  useEffect(() => {
    if (!offlineNoticeFading) return undefined
    const timeout = setTimeout(dismissOfflineProgress, OFFLINE_NOTICE_FADE_MS)
    return () => clearTimeout(timeout)
  }, [offlineNoticeFading, dismissOfflineProgress])
  const handleOfflineNoticeDismissClick = () => dismissOfflineProgress()

  if (showFullScreenPrompt) {
    return (
      <FullScreenOverlay role="dialog" aria-modal="true" aria-label="Prestige required">
        <FullScreenCard>
          <h2>✦ Prestige Available!</h2>
          <MutedText>
            You've reached {formatCurrency(state.resources[MONEY_ID])} — 1 Googol Bits. All
            production has stopped.
          </MutedText>
          <ul>
            <li>Resets your resources, owned tiers, and purchases</li>
            <li>
              Awards {formatAmount(prestigePointsPreview)} Prestige Point
              {prestigePointsPreview === 1 ? '' : 's'} — each unspent point adds +1% production
              speed, or spend them on the PP Upgrades page to unlock autobuyers
            </li>
            <li>Keeps your unlocked autobuyers and Prestige Points</li>
          </ul>
          <Button
            ref={fullScreenPrestigeButtonRef}
            aria-label="Prestige now"
            color="#fbbf24"
            onClick={actions.prestige}
            title="Awards Prestige Points and resets your resources"
            type="button"
            $pulse
          >
            <ButtonContent>✦ Prestige Now</ButtonContent>
          </Button>
        </FullScreenCard>
      </FullScreenOverlay>
    )
  }

  return (
    <RootDiv>
      {showTopPrestigeBar && (
        <>
          <TopPrestigeBar ref={topPrestigeBarRef} aria-label="prestige available banner">
            <MutedText>1 Googol Bits reached — production has stopped.</MutedText>
            <Button
              aria-label={prestigeAriaLabel}
              color="#fbbf24"
              onClick={actions.prestige}
              title="Awards Prestige Points and resets your resources"
              type="button"
              $pulse
            >
              <ButtonIcon>✦ </ButtonIcon>
              <ButtonLabel>Prestige +{formatAmount(prestigeAwardPreview)} PP</ButtonLabel>
            </Button>
          </TopPrestigeBar>
          <TopPrestigeBarSpacer $height={topPrestigeBarHeight} />
        </>
      )}

      <Header>
        <InfoDetails ref={headerDetailsRef}>
          <summary>
            <h1>Tens</h1>
            <VersionText>v{version}</VersionText>
          </summary>
          <HudMutedText>Build by powers of ten. Prestige for Prestige Points.</HudMutedText>
        </InfoDetails>
      </Header>

      {offlineProgress && (
        <OfflineNoticeOverlay>
          <OfflineNoticeCard
            aria-label="offline progress notice"
            $fading={offlineNoticeFading}
          >
            <HudMutedText>
              Welcome back! You were away for {formatOfflineDuration(offlineProgress.elapsedRealSeconds)}
              {' — simulated '}{formatOfflineDuration(offlineProgress.effectiveSeconds)} of progress at 10% speed.
            </HudMutedText>
            <Button
              aria-label="Dismiss offline progress notice"
              variant="neutral"
              onClick={handleOfflineNoticeDismissClick}
              title="Dismiss this notice"
              type="button"
              $progress={offlineNoticeRemainingPercent}
              $progressColor="#525252"
            >
              Dismiss
              <VisuallyHidden
                role="progressbar"
                aria-label="Time until this notice auto-dismisses"
                aria-valuenow={offlineNoticeRemainingPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </Button>
          </OfflineNoticeCard>
        </OfflineNoticeOverlay>
      )}

      <BalancesSentinel ref={balancesSentinelRef} aria-hidden="true" />
      <StickyBalances
        $compressed={balancesCompressed}
        $belowBar={showTopPrestigeBar}
        $belowBarHeight={topPrestigeBarHeight}
      >
        <CenteredCard
          aria-controls="global-multipliers-details"
          aria-expanded={showGlobalMultipliers}
          aria-label="money display"
          $expandable
          $raised
          onClick={toggleGlobalMultipliers}
          onKeyDown={event => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            toggleGlobalMultipliers()
          }}
          role="button"
          tabIndex={0}
          title="Show or hide the global production multipliers currently in effect"
        >
          <MoneyHero>{formatCurrency(state.resources[MONEY_ID])}</MoneyHero>
          {!balancesCompressed && (
            <>
              <GoogolProgressTrack aria-hidden="true">
                <GoogolProgressFill $percent={prestigeProgressPercent} />
              </GoogolProgressTrack>
              <VisuallyHidden
                role="progressbar"
                aria-label="progress toward 1 Googol Bits, when Prestige becomes available"
                aria-valuenow={prestigeProgressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <GoogolProgressLabel>{prestigeProgressPercent}% to Prestige</GoogolProgressLabel>
            </>
          )}
          {showGlobalMultipliers && !balancesCompressed && (
            <GlobalMultipliersList id="global-multipliers-details" aria-label="global production multipliers">
              {!isFirstRun && (
                <li>
                  Prestige speed bonus: {state.prestigeSpeedBonusUnlocked
                    ? `${formatBonusOrMultiplier(prestigeBonus)} production speed from ${formatAmount(prestige.points)} unspent PP`
                    : `not yet unlocked (${formatAmount(PRESTIGE_SPEED_BONUS_UNLOCK_COST)} PP on the Upgrades page)`}
                </li>
              )}
              {speedUpEverRevealed && (
                <li>
                  Speed Up: {speedUpCount > 0
                    ? `×${formatRate(speedUpMultiplier)} production speed from ${speedUpCount} activation${speedUpCount === 1 ? '' : 's'}`
                    : `not yet activated (reach level ${formatAmount(speedUpRequirementDisplay)} on ${lastTier.name})`}
                </li>
              )}
              {globalTickspeedCardEverRevealed && (
                <li>
                  Global Tickspeed Multiplier: {isGlobalTickspeedActive
                    ? `${formatBonusOrMultiplier(globalTickspeedMultiplier, { precise: true })} faster ticks on every tier (Lv.${globalTickspeedLevel})`
                    : 'not yet active'}
                </li>
              )}
            </GlobalMultipliersList>
          )}
        </CenteredCard>

        {!isFirstRun && (
          <PpHeaderCard
            aria-label="prestige points display"
            $actionable={canPrestige}
            onClick={canPrestige ? actions.prestige : undefined}
            onKeyDown={event => {
              if (!canPrestige || (event.key !== 'Enter' && event.key !== ' ')) return
              event.preventDefault()
              actions.prestige()
            }}
            role={canPrestige ? 'button' : undefined}
            tabIndex={canPrestige ? 0 : undefined}
            title={canPrestige ? 'Awards Prestige Points and resets your resources' : undefined}
          >
            <HudMutedText>
              <HudGoldText>{formatAmount(prestige.points)} PP</HudGoldText>
              {state.prestigeSpeedBonusUnlocked && ` · ${formatBonusOrMultiplier(prestigeBonus)} production speed`}
            </HudMutedText>
          </PpHeaderCard>
        )}
      </StickyBalances>

      {!isFirstRun && (
        <ViewNav role="tablist" aria-label="page view">
          <ViewTabButton
            aria-selected={view === 'game'}
            color={view === 'game' ? 'white' : 'darkgrey'}
            onClick={() => setView('game')}
            role="tab"
            type="button"
          >
            Game
          </ViewTabButton>
          <ViewTabButton
            aria-selected={view === 'upgrades'}
            color={view === 'upgrades' ? 'white' : 'darkgrey'}
            onClick={() => setView('upgrades')}
            role="tab"
            type="button"
          >
            Upgrades{hasAffordablePpUpgrade && <NavDot aria-label="PP upgrade available" />}
          </ViewTabButton>
          <ViewTabButton
            aria-selected={view === 'milestones'}
            color={view === 'milestones' ? 'white' : 'darkgrey'}
            onClick={() => setView('milestones')}
            role="tab"
            type="button"
          >
            Milestones
          </ViewTabButton>
        </ViewNav>
      )}

      {view === 'game' && (<>

      {globalTickspeedCardEverRevealed && (
        <GlobalTickspeedCard aria-label="global tickspeed panel">
          <InfoDetails ref={globalTickspeedDetailsRef}>
            <summary><h2>Global Tickspeed Multiplier</h2></summary>
            <MutedText id="global-tickspeed-description">
              Spend Bits to permanently speed up every tier's production ticks by another 1% at
              once — more frequent deliveries, not bigger ones. Each level costs another power of
              ten. Unlocks once you own {TIER_DEFINITIONS[1].name}.
              {isGlobalTickspeedActive && ` Currently Lv.${globalTickspeedLevel} — ${formatBonusOrMultiplier(globalTickspeedMultiplier, { precise: true })} faster ticks on every tier.`}
            </MutedText>
          </InfoDetails>
          <Button
            aria-describedby="global-tickspeed-description"
            aria-label={
              isGlobalTickspeedActive
                ? `Upgrade global tickspeed multiplier for ${formatCurrency(globalTickspeedCost)} (currently ${formatBonusOrMultiplier(globalTickspeedMultiplier, { precise: true })} faster ticks on every tier)`
                : `Enable global tickspeed multiplier for ${formatCurrency(globalTickspeedCost)}`
            }
            color={canBuyGlobalTickspeed ? '#3b82f6' : 'darkgrey'}
            disabled={!canBuyGlobalTickspeed}
            onClick={actions.buyGlobalTickspeedMultiplier}
            title="Spend Bits to permanently speed up every tier's production ticks by another 1% at once (more frequent deliveries, not bigger ones) — each level costs another power of ten"
            type="button"
            $progress={globalTickspeedProgressPercent}
            $progressColor="#3b82f6"
            $pulse={canBuyGlobalTickspeed}
          >
            <ButtonIcon>🌐 </ButtonIcon>
            <ButtonLabel>{isGlobalTickspeedActive ? 'Upgrade' : 'Enable'} for {formatCurrency(globalTickspeedCost)}</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Global tickspeed multiplier progress"
              aria-valuenow={globalTickspeedProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Button>
        </GlobalTickspeedCard>
      )}

      <TierList>
        {TIER_DEFINITIONS.map((tier, tierIndex) => {
          const unlocked = isTierUnlocked(state)(tier)
          if (!unlocked) return null
          const resources = state.resources[tier.id] ?? 0
          const owned = state.owned[tier.id] ?? 0
          const purchased = getTierPurchasedCount(state, tier.id)
          const costResource = getTierSpendableAmount(state, tier)
          // The tier's current level and how many of this level's pieces are already bought are
          // tracked directly in state (see engine.js's createInitialGameState/buyTier) rather than
          // derived from `purchased` via division — the block size a level requires can grow over
          // a run (see getPurchaseBlockSize below), so there's no fixed divisor to derive a level
          // from after the fact. Drives both the Buy button's compact "Lv.N (x/8)" text and the
          // cost-block progress fill.
          const tierLevel = state.purchaseLevels?.[tier.id] ?? 1
          const doneInBlock = state.purchaseLevelProgress?.[tier.id] ?? 0
          // Manual Buy always grabs as many units as are currently affordable, up to the current
          // level's cost block boundary (the former ×1/×10 "Bulk" toggle's default, now the only
          // behavior — see useIncrementalGame's BUY_QUANTITY).
          const affordableQuantity = getTierAffordableQuantity(tier, tierLevel, purchaseBlockSize, doneInBlock, costResource, Number.MAX_SAFE_INTEGER)
          const unitCost = getTierQuantityCost(tier, tierLevel, purchaseBlockSize, doneInBlock, 1)
          const displayCost = affordableQuantity > 0 ? getTierQuantityCost(tier, tierLevel, purchaseBlockSize, doneInBlock, affordableQuantity) : unitCost
          const canAfford = affordableQuantity > 0 && !isFrozen
          const donePercent = (doneInBlock / purchaseBlockSize) * 100
          const availablePercent = (affordableQuantity / purchaseBlockSize) * 100
          // The tier's own Money-funded tickspeed level — enabled by default (no autobuyer unlock
          // or PP prerequisite at all, see tickspeedLevels/buyTickspeedMultiplier in engine.js);
          // level 1 is the baseline ×1, no bonus yet, each further level speeds up this tier's own
          // delivery frequency by another 10% (see getEffectiveTierTickSpeedSeconds in engine.js) —
          // it does NOT change how much lands per delivery, only how often one arrives. Whenever
          // the last tier's currently-owned count is >= the current block size (a full level, see
          // getPurchaseBlockSize), this Money-funded ladder is instead replaced by an XP-funded one (see
          // isLastTierTickspeedXpUnlocked/getLastTierXpTickspeedMultiplier in engine.js and the
          // last-tier-only controls below) — it reverts back to this Money-funded button if owned
          // later drops below that (e.g. after a Prestige/Speed Up).
          const isLastTier = tier.id === lastTier.id
          const isLastTierXpUnlocked = isLastTier && isLastTierTickspeedXpUnlocked(state)
          const tickspeedLevel = state.tickspeedLevels?.[tier.id] ?? 1
          const lastTierXpConsumed = state.lastTierXpConsumed ?? 0
          const tickspeedMultiplier = isLastTierXpUnlocked
            ? getLastTierXpTickspeedMultiplier(lastTierXpConsumed)
            : getTickspeedProductionMultiplier(tickspeedLevel)
          const tickspeedBonusLabel = formatBonusOrMultiplier(tickspeedMultiplier)
          // Consuming XP for the last tier's tickspeed always spends the player's entire current
          // XP balance in one action (rather than a fixed minimum) — since every consumption,
          // however small, resets every other tier's owned quantity (not their lifetime
          // purchased/"level" count) plus the Money balance to 0, spending it all at once
          // minimizes how often that side effect is paid for the same total investment.
          const lastTierXpBalance = Math.floor(state.prestige.xp ?? 0)
          const lastTierXpMinConsumption = getLastTierXpTickspeedMinConsumption(lastTierXpConsumed)
          const lastTierXpProgressPercent = progressPercent(lastTierXpBalance, lastTierXpMinConsumption)
          const canConsumeLastTierXp = isLastTierXpUnlocked && !isFrozen && lastTierXpBalance >= lastTierXpMinConsumption
          const lastTierXpConsumeVisibleLabel = `🧬 ${formatAmount(lastTierXpBalance)} XP`
          // getLastTierXpTickspeedMultiplier compounds, so the marginal speedup this consumption
          // contributes is a ratio (new multiplier ÷ old), not the spent amount itself — and
          // because it's multiplicative, that ratio is independent of how much XP was already
          // consumed (the prior multiplier cancels out), so it's exactly
          // getLastTierXpTickspeedMultiplier(amount) regardless of lastTierXpConsumed so far.
          const lastTierXpConsumeBonusLabel = formatBonusOrMultiplier(getLastTierXpTickspeedMultiplier(lastTierXpBalance))
          const lastTierXpConsumeLabel = `Consume ${formatAmount(lastTierXpBalance)} XP for ${lastTierXpConsumeBonusLabel} ${tier.name} tickspeed (resets every other tier's owned quantity and Bits to 0)`
          const handleConsumeLastTierXp = () => {
            if (!canConsumeLastTierXp) return
            if (window.confirm(`Consume ${formatAmount(lastTierXpBalance)} XP for ${lastTierXpConsumeBonusLabel} faster ${tier.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.`)) {
              actions.consumeXpForLastTierTickspeed(lastTierXpBalance)
            }
          }
          // Production no longer depends on autobuyer purchase frequency at all — completing
          // every level (manual or automatic) doubles a tier's own production (see
          // getPurchaseMilestoneMultiplier/getTierCost). This is the raw amount delivered in one
          // lump batch once this tier's own (tickspeed-shrunk) period completes — not a per-second
          // average — matching exactly what tickGame credits (see "Tier production tickspeed" in
          // CLAUDE.md); neither tickspeed multiplier appears here since both now speed up
          // *delivery frequency* instead of inflating the per-delivery amount. Floored to match
          // tickGame's own floored production credit — prestigeBonus is the only fractional factor
          // left here (getPurchaseMilestoneMultiplier and getSpeedUpMultiplier are always powers of
          // 2), so without flooring this preview could show a fraction that never actually lands.
          const milestoneMultiplier = getPurchaseMilestoneMultiplier(tierLevel)
          const production = Math.floor(owned * prestigeBonus * speedUpMultiplier * milestoneMultiplier)
          // Surfaced only in the row's collapsed-by-default TierDetails disclosure below — the
          // base value is otherwise invisible to players now that it diverges per tier again
          // (see "Tier production tickspeed" in CLAUDE.md), and the effective value shows how
          // much of that is currently offset by this tier's own and the global tickspeed
          // multiplier.
          const baseTickSpeed = getTierBaseTickSpeedSeconds(tier.id)
          const effectiveTickSpeed = getEffectiveTierTickSpeedSeconds(state, tier.id)
          const tickspeedCost = getTickspeedMultiplierCost(tier.id, tickspeedLevel + 1)
          // Spends the tier's own resource (resources[tier.id] === owned[tier.id]), so the
          // button must stay disabled until at least 1 generator would remain afterward —
          // matching buyTickspeedMultiplier's own `available >= cost + 1` guard in engine.js.
          const canUpgradeTickspeed = resources >= tickspeedCost + 1 && !isFrozen
          const buyLabel = `Buy${affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} for ${formatCurrency(displayCost)} (level ${formatAmount(tierLevel)}, ${formatAmount(doneInBlock)} of ${purchaseBlockSize} purchased)`
          const tickspeedLabel = `Tickspeed multiplier (+10% faster ticks) for ${formatCost(tickspeedCost, tier.id)}`
          // Compact visible text: an icon in place of the "Buy" word, and the tier's short symbol
          // (via formatCost) in place of its full name. The full sentence stays in aria-label/
          // title for assistive tech. The block progress ("5+3/8" — how many of the current
          // level's pieces are already bought, plus how many more are affordable right now, over
          // the block size — mirroring the pre-level design's `purchased+affordable` convention,
          // see docs/DESIGN_HISTORY.md) sits inside ButtonIcon alongside the 🛒 glyph rather than
          // the centered ButtonLabel, so it's pinned immediately next to the icon and lines up in
          // a column across tier rows regardless of the cost string's length. The level number
          // itself isn't shown here (still available via aria-label and the row's Details
          // disclosure) — this is purely "how close is the current level."
          const buyLevelQuantityText = `${formatAmount(doneInBlock)}${affordableQuantity > 0 ? `+${formatAmount(affordableQuantity)}` : ''}/${formatAmount(purchaseBlockSize)}`
          // A single ⚙ (the same icon used on the cumulative "⚙ +N%" badge and the tier
          // tickspeed autobuyer's "⚙ Active" badge) identifies this as the tickspeed control —
          // no separate icon for "+10%" is needed, since that step is fixed
          // (TICKSPEED_PRODUCTION_STEP) and implied by the button itself; the full "+10% faster
          // ticks" sentence still lives in tickspeedLabel/title above for assistive tech and
          // anyone who expands the tooltip.
          const tickspeedVisibleLabel = `⚙ ${formatCost(tickspeedCost, tier.id)}`
          // Live "how close am I" meter for the tickspeed button, even while disabled.
          const tickspeedProgressPercent = progressPercent(resources, tickspeedCost + 1)
          const accent = theme.tierAccents[tierIndex % theme.tierAccents.length]
          const isDetailsOpen = openTierDetailIds.has(tier.id)
          const detailsId = `${tier.id}-details`
          // Whether this tier's unit-buying autobuyer has ever been unlocked (see
          // applyAutobuyerMilestones in engine.js) — the new on/paused indicator below only shows
          // once that's true, same gate the PP Upgrades page's own per-tier controls use.
          const isAutobuyerUnlocked = (state.autobuyers[tier.id] ?? null) !== null
          const autobuyerEnabled = state.autobuyersEnabled?.[tier.id] ?? true

          return (
            <TierLine
              key={tier.id}
              ref={registerTierRowRef(tier.id)}
              data-tier-id={tier.id}
              aria-label={`${tier.name} layer`}
              $accent={accent}
              $animateReveal={!initialUnlockedIds.has(tier.id)}
              onClick={event => {
                // TierNameTrigger's own click handler (below) stops propagation before a click
                // reaches here, so only a click elsewhere on the tile arrives — still skip a
                // button, so Buy/tickspeed purchases never also toggle the disclosure.
                if (event.target.closest('button')) return
                toggleTierDetails(tier.id)
              }}
            >
              <TierNameTrigger
                role="button"
                tabIndex={0}
                aria-expanded={isDetailsOpen}
                aria-controls={detailsId}
                onClick={event => {
                  event.stopPropagation()
                  toggleTierDetails(tier.id)
                }}
                onKeyDown={event => {
                  if (event.key !== 'Enter' && event.key !== ' ') return
                  event.preventDefault()
                  toggleTierDetails(tier.id)
                }}
              >
                <TierName>
                  <TierNameLabel title={tier.name}>
                    <VisuallyHidden>{tier.name}</VisuallyHidden>
                    <span aria-hidden="true">{tier.symbol}</span>
                  </TierNameLabel>
                  {tickspeedMultiplier > 1 && (
                    <GreenText title={
                      isLastTierXpUnlocked
                        ? `${formatAmount(lastTierXpConsumed)} XP consumed — ${tickspeedBonusLabel} faster ticks`
                        : `Tickspeed multiplier level ${tickspeedLevel} — ${tickspeedBonusLabel} faster ticks`
                    }>
                      ⚙ {tickspeedBonusLabel}
                    </GreenText>
                  )}
                  {isAutobuyerUnlocked && (
                    <PpUpgradeBadge
                      $color={autobuyerEnabled ? theme.color.good : theme.color.warn}
                      $dimmed={!autobuyerEnabled}
                      aria-label={autobuyerEnabled ? `${tier.name}'s autobuyer active` : `${tier.name}'s autobuyer paused`}
                      title={
                        autobuyerEnabled
                          ? "This tier's autobuyer is buying units automatically"
                          : "This tier's autobuyer is currently paused — it will not buy units until resumed"
                      }
                    >
                      🤖
                    </PpUpgradeBadge>
                  )}
                </TierName>
              </TierNameTrigger>
              {isDetailsOpen && (
                <TierDetailsContent id={detailsId}>
                  <ul>
                    <li>Base tickspeed: delivers every {formatRate(baseTickSpeed)}s</li>
                    <li>
                      Effective tickspeed: every {formatRate(effectiveTickSpeed)}s (tier ×{formatRate(tickspeedMultiplier)}, global ×{formatRate(globalTickspeedMultiplier)})
                    </li>
                    <li>
                      Level {formatAmount(tierLevel)} ({formatAmount(doneInBlock)}/{purchaseBlockSize} purchased) — purchase
                      milestone bonus: ×{formatRate(milestoneMultiplier)} from {formatAmount(purchased)} lifetime purchases
                    </li>
                    {speedUpCount > 0 && <li>Speed Up bonus: ×{formatRate(speedUpMultiplier)}</li>}
                    {isLastTierXpUnlocked && (
                      <li>
                        Tickspeed funded by consumed XP — unspent XP: {formatAmount(lastTierXpBalance)}
                        {' '}(next consumption needs at least {formatAmount(lastTierXpMinConsumption)})
                      </li>
                    )}
                    <li>Costs {RESOURCE_SYMBOL(tier.costResourceId)}, produces {RESOURCE_SYMBOL(tier.producesResourceId)}</li>
                  </ul>
                </TierDetailsContent>
              )}
              <OwnedText title="Owned">
                <VisuallyHidden>Owned: </VisuallyHidden>
                {formatAmount(owned)}
              </OwnedText>
              <ProductionText>
                +{tier.producesResourceId === MONEY_ID
                  ? formatCurrency(production)
                  : `${formatAmount(production)} ${RESOURCE_SYMBOL(tier.producesResourceId)}`}
              </ProductionText>
              {isLastTierXpUnlocked ? (
                <UpgradeButton
                  aria-label={lastTierXpConsumeLabel}
                  color={canConsumeLastTierXp ? theme.color.violet : theme.color.disabled}
                  disabled={!canConsumeLastTierXp}
                  onClick={handleConsumeLastTierXp}
                  title={`Consume XP for a compounding +1% ${tier.name} tickspeed per XP (min ${formatAmount(lastTierXpMinConsumption)} XP right now) — resets every other tier's owned quantity and Bits to 0`}
                  $progress={lastTierXpProgressPercent}
                  $pulse={canConsumeLastTierXp}
                >
                  <ButtonContent>{lastTierXpConsumeVisibleLabel}</ButtonContent>
                  <VisuallyHidden
                    role="progressbar"
                    aria-label={`${tier.name} XP tickspeed progress`}
                    aria-valuenow={lastTierXpProgressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </UpgradeButton>
              ) : (
                <UpgradeButton
                  aria-label={tickspeedLabel}
                  color={canUpgradeTickspeed ? theme.color.good : theme.color.disabled}
                  disabled={!canUpgradeTickspeed}
                  onClick={() => actions.buyTickspeedMultiplier(tier.id)}
                  title={`Tickspeed multiplier level ${tickspeedLevel} (${tickspeedBonusLabel} faster ticks) — the next level makes it 10% more`}
                  $progress={tickspeedProgressPercent}
                  $pulse={canUpgradeTickspeed}
                >
                  <ButtonContent>{tickspeedVisibleLabel}</ButtonContent>
                  <VisuallyHidden
                    role="progressbar"
                    aria-label={`${tier.name} tickspeed multiplier progress`}
                    aria-valuenow={tickspeedProgressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </UpgradeButton>
              )}
              <BuyButton
                aria-label={buyLabel}
                color={canAfford ? theme.color.text : theme.color.disabled}
                disabled={!canAfford}
                onClick={() => actions.buyTierQuantity(tier.id)}
                title={`Buy ${tier.name} to increase your ${RESOURCE_SYMBOL(tier.producesResourceId)} production — completing every level (${purchaseBlockSize} purchases) also doubles it`}
                $progress={donePercent}
                $secondaryProgress={availablePercent}
                $pulse={canAfford}
              >
                <BuyButtonIcon>🛒 {buyLevelQuantityText} </BuyButtonIcon>
                <BuyButtonCostLabel>{formatCurrency(displayCost)}</BuyButtonCostLabel>
                <VisuallyHidden
                  role="progressbar"
                  aria-label={`${tier.name} cost-block progress`}
                  aria-valuenow={doneInBlock}
                  aria-valuemin={0}
                  aria-valuemax={purchaseBlockSize}
                />
              </BuyButton>
            </TierLine>
          )
        })}
      </TierList>

      {speedUpEverRevealed && (
        <SpeedUpCard aria-label="speed up panel">
          <InfoDetails ref={speedUpDetailsRef}>
            <summary><h2>Speed Up</h2></summary>
            <MutedText id="speed-up-description">
              Reach level {speedUpRequirementDisplay} on {lastTier.name} to trigger a Speed Up: resets your
              tiers and resources (keeps unlocked autobuyers and Prestige Points) and permanently
              doubles production speed. Each Speed Up needs one more level than the last.
            </MutedText>
          </InfoDetails>
          <SpeedUpButton
            aria-describedby="speed-up-description"
            aria-label={`Speed Up (requires ${lastTier.name} level ${speedUpRequirementDisplay}) — doubles production speed to ×${formatRate(nextSpeedUpMultiplier)}`}
            color={canSpeedUp ? '#22d3ee' : 'darkgrey'}
            disabled={!canSpeedUp}
            onClick={actions.speedUp}
            title={`Resets tiers and speeds up production to ×${formatRate(nextSpeedUpMultiplier)}`}
            type="button"
            $progress={speedUpProgressPercent}
            $progressColor="#22d3ee"
            $pulse={canSpeedUp}
          >
            <ButtonIcon>⏩ </ButtonIcon>
            <ButtonLabel>×{formatRate(nextSpeedUpMultiplier)}{' · '}Lv.{formatAmount(lastTierLevelDisplay)}/{formatAmount(speedUpRequirementDisplay)}</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Speed Up progress"
              aria-valuenow={speedUpProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </SpeedUpButton>
          {!isFirstRun && isAutoSpeedUpActive && (
            <MutedText title={
              autoSpeedUpEnabled
                ? "Speed Up now triggers automatically the instant it's eligible"
                : 'Auto Speed Up is currently paused — it will not trigger until resumed'
            }>
              <PpUpgradeBadge $dimmed={!autoSpeedUpEnabled} aria-label={autoSpeedUpEnabled ? 'Auto Speed Up active' : 'Auto Speed Up paused'}>⏩</PpUpgradeBadge>
            </MutedText>
          )}
        </SpeedUpCard>
      )}

      </>)}

      {view === 'upgrades' && !isFirstRun && (
        <UpgradesList aria-label="PP upgrades page">
          <UpgradeCategory aria-label="tier autobuyers category">
            <CategoryHeading>Tier Autobuyers</CategoryHeading>
            {allTiersFullyAutomated ? (
              <div aria-label="full smart autobuyer notice">
                <InfoDetails ref={fullSmartAutobuyerDetailsRef}>
                  <summary>🧠 Every tier is fully smart</summary>
                  <MutedText>
                    Every tier's autobuyer is fully unlocked, smart, and tickspeed-automated — since
                    there's nothing left to buy, this list won't be shown per tier anymore.
                  </MutedText>
                </InfoDetails>
              </div>
            ) : (
              TIER_DEFINITIONS.map(tier => {
                const unlocked = isTierUnlocked(state)(tier)
                if (!unlocked) return null
                const isAutobuyerLocked = (state.autobuyers[tier.id] ?? null) === null
                const autobuyerEnabled = state.autobuyersEnabled?.[tier.id] ?? true
                const isSmart = state.smartAutobuyer?.[tier.id] ?? false
                const isTierTickspeedAutobuyerActive = state.tierTickspeedAutobuyer?.[tier.id] ?? false
                const tierTickspeedAutobuyerEnabled = state.tierTickspeedAutobuyerEnabled?.[tier.id] ?? true
                if (isSmart && isTierTickspeedAutobuyerActive) return null
                // Autobuyer unlock/tier tickspeed autobuyer are no longer PP purchases at all — see
                // applyAutobuyerMilestones in engine.js. A locked one just reports the prestige
                // count it auto-unlocks at (also tracked in full on the Milestones page); Smart
                // remains the only PP-funded control on this row.
                const autobuyerMilestone = getAutobuyerUnlockMilestone(tier.id)
                const tierTickspeedAutobuyerMilestone = getTierTickspeedAutobuyerMilestone(tier.id)
                const smartCost = getSmartAutobuyerCost(tier.id)
                const canBuySmart = unlocked && !isFrozen && !isAutobuyerLocked && prestige.points >= smartCost

                return (
                  <UpgradeRow key={tier.id} aria-label={`${tier.name} PP upgrades`}>
                    <TierNameLabel title={tier.name}>
                      <VisuallyHidden>{tier.name}</VisuallyHidden>
                      <span aria-hidden="true">{tier.symbol}</span>
                    </TierNameLabel>
                    {isAutobuyerLocked && (
                      <PpUpgradeBadge
                        $color="darkgrey"
                        $dimmed
                        aria-label={`${tier.name}'s autobuyer unlocks automatically at Prestige ${autobuyerMilestone}`}
                        title={`Unlocks automatically once you've prestiged ${autobuyerMilestone} time${autobuyerMilestone === 1 ? '' : 's'} — no PP cost, see the Milestones page`}
                      >
                        🔒 Prestige {autobuyerMilestone}
                      </PpUpgradeBadge>
                    )}
                    {!isAutobuyerLocked && (
                      <UpgradeRowControls>
                        <PpUpgradeBadge
                          $color={autobuyerEnabled ? '#4ade80' : '#facc15'}
                          $dimmed={!autobuyerEnabled}
                          aria-label={autobuyerEnabled ? `${tier.name}'s autobuyer active` : `${tier.name}'s autobuyer paused`}
                          title={
                            autobuyerEnabled
                              ? "This tier's autobuyer is buying units automatically"
                              : "This tier's autobuyer is currently paused — it will not buy units until resumed"
                          }
                        >
                          🤖
                        </PpUpgradeBadge>
                        <PauseToggleButton
                          aria-pressed={autobuyerEnabled}
                          aria-label={autobuyerEnabled ? `Pause ${tier.name}'s autobuyer` : `Resume ${tier.name}'s autobuyer`}
                          onClick={() => actions.setAutobuyerEnabled(tier.id, !autobuyerEnabled)}
                          title={autobuyerEnabled ? `Pause ${tier.name}'s autobuyer` : `Resume ${tier.name}'s autobuyer`}
                          type="button"
                          variant="ghost"
                        >
                          {autobuyerEnabled ? '⏸' : '▶'}
                        </PauseToggleButton>
                      </UpgradeRowControls>
                    )}
                    {isTierTickspeedAutobuyerActive ? (
                      <UpgradeRowControls>
                        <PpUpgradeBadge
                          $color={tierTickspeedAutobuyerEnabled ? '#4ade80' : '#facc15'}
                          $dimmed={!tierTickspeedAutobuyerEnabled}
                          aria-label={tierTickspeedAutobuyerEnabled ? `${tier.name}'s tickspeed autobuyer active` : `${tier.name}'s tickspeed autobuyer paused`}
                          title={
                            tierTickspeedAutobuyerEnabled
                              ? "This tier's tickspeed multiplier now upgrades itself automatically whenever affordable"
                              : "This tier's tickspeed autobuyer is currently paused — it will not upgrade until resumed"
                          }
                        >
                          ⚙
                        </PpUpgradeBadge>
                        <PauseToggleButton
                          aria-pressed={tierTickspeedAutobuyerEnabled}
                          aria-label={tierTickspeedAutobuyerEnabled ? `Pause ${tier.name}'s tickspeed autobuyer` : `Resume ${tier.name}'s tickspeed autobuyer`}
                          onClick={() => actions.setTierTickspeedAutobuyerEnabled(tier.id, !tierTickspeedAutobuyerEnabled)}
                          title={tierTickspeedAutobuyerEnabled ? `Pause ${tier.name}'s tickspeed autobuyer` : `Resume ${tier.name}'s tickspeed autobuyer`}
                          type="button"
                          variant="ghost"
                        >
                          {tierTickspeedAutobuyerEnabled ? '⏸' : '▶'}
                        </PauseToggleButton>
                      </UpgradeRowControls>
                    ) : (
                      <PpUpgradeBadge
                        $color="darkgrey"
                        $dimmed
                        aria-label={`${tier.name}'s tickspeed autobuyer unlocks automatically at Prestige ${tierTickspeedAutobuyerMilestone}`}
                        title={`Unlocks automatically once you've prestiged ${tierTickspeedAutobuyerMilestone} times — no PP cost, see the Milestones page`}
                      >
                        🔒 Prestige {tierTickspeedAutobuyerMilestone}
                      </PpUpgradeBadge>
                    )}
                    {!isAutobuyerLocked && (
                      isSmart ? (
                        <PpUpgradeBadge $color="#a78bfa" title={`This tier buys one at a time until ${purchaseBlockSize} purchases, then in blocks of ${purchaseBlockSize}`}>
                          🧠 Smart
                        </PpUpgradeBadge>
                      ) : (
                        <PpUpgradeButton
                          aria-label={`Make ${tier.name}'s autobuyer smart (buy singly until ${purchaseBlockSize} purchases, then in blocks of ${purchaseBlockSize}) for ${formatAmount(smartCost)} Prestige Point${smartCost === 1 ? '' : 's'}`}
                          color={canBuySmart ? '#a78bfa' : 'darkgrey'}
                          disabled={!canBuySmart}
                          onClick={() => actions.buySmartAutobuyer(tier.id)}
                          title={`Spend Prestige Points so this tier buys one at a time until ${purchaseBlockSize} purchases, then in blocks of ${purchaseBlockSize} — fixes an early-game stall where a full level isn't affordable yet`}
                          type="button"
                          $progress={ppProgressPercent(smartCost)}
                          $progressColor="#a78bfa"
                        >
                          <ButtonIcon>🧠 </ButtonIcon>
                          <ButtonLabel>Smart for {formatAmount(smartCost)} PP</ButtonLabel>
                          <VisuallyHidden
                            role="progressbar"
                            aria-label={`${tier.name} smart autobuyer Prestige Point progress`}
                            aria-valuenow={Math.min(prestige.points, smartCost)}
                            aria-valuemin={0}
                            aria-valuemax={smartCost}
                          />
                        </PpUpgradeButton>
                      )
                    )}
                  </UpgradeRow>
                )
              })
            )}
          </UpgradeCategory>

          <UpgradeCategory aria-label="global automation category">
            <CategoryHeading>Global Automation</CategoryHeading>

            <UpgradeRow aria-label="tickspeed autobuyer upgrade">
              <TierNameLabel>Tickspeed Autobuyer</TierNameLabel>
              {isTickspeedAutobuyerActive ? (
                <UpgradeRowControls>
                  <PpUpgradeBadge
                    $color={tickspeedAutobuyerEnabled ? '#4ade80' : '#facc15'}
                    $dimmed={!tickspeedAutobuyerEnabled}
                    aria-label={tickspeedAutobuyerEnabled ? 'Tickspeed Autobuyer active' : 'Tickspeed Autobuyer paused'}
                    title={
                      tickspeedAutobuyerEnabled
                        ? 'The global tickspeed multiplier now upgrades itself automatically whenever affordable'
                        : 'The global tickspeed multiplier is currently paused — it will not upgrade itself until resumed'
                    }
                  >
                    🌐
                  </PpUpgradeBadge>
                  <PauseToggleButton
                    aria-pressed={tickspeedAutobuyerEnabled}
                    aria-label={tickspeedAutobuyerEnabled ? 'Pause Tickspeed Autobuyer automation' : 'Resume Tickspeed Autobuyer automation'}
                    onClick={() => actions.setAutoGlobalTickspeedEnabled(!tickspeedAutobuyerEnabled)}
                    title={tickspeedAutobuyerEnabled ? 'Pause Tickspeed Autobuyer automation' : 'Resume Tickspeed Autobuyer automation'}
                    type="button"
                    variant="ghost"
                  >
                    {tickspeedAutobuyerEnabled ? '⏸' : '▶'}
                  </PauseToggleButton>
                </UpgradeRowControls>
              ) : (
                <PpUpgradeButton
                  aria-label={`Enable Tickspeed Autobuyer for ${TICKSPEED_AUTOBUYER_COST} Prestige Points`}
                  color={canBuyTickspeedAutobuyer ? '#38bdf8' : 'darkgrey'}
                  disabled={!canBuyTickspeedAutobuyer}
                  onClick={actions.buyTickspeedAutobuyer}
                  title="Spend Prestige Points so the global tickspeed multiplier upgrades itself automatically, forever, whenever affordable"
                  type="button"
                  $progress={ppProgressPercent(TICKSPEED_AUTOBUYER_COST)}
                  $progressColor="#38bdf8"
                >
                  <ButtonIcon>🌐 </ButtonIcon>
                  <ButtonLabel>Unlock for {TICKSPEED_AUTOBUYER_COST} PP</ButtonLabel>
                  <VisuallyHidden
                    role="progressbar"
                    aria-label="Tickspeed Autobuyer Prestige Point progress"
                    aria-valuenow={Math.min(prestige.points, TICKSPEED_AUTOBUYER_COST)}
                    aria-valuemin={0}
                    aria-valuemax={TICKSPEED_AUTOBUYER_COST}
                  />
                </PpUpgradeButton>
              )}
            </UpgradeRow>

            <UpgradeRow aria-label="auto speed up upgrade">
              <TierNameLabel>Auto Speed Up</TierNameLabel>
              {isAutoSpeedUpActive ? (
                <UpgradeRowControls>
                  <PpUpgradeBadge
                    $color={autoSpeedUpEnabled ? '#4ade80' : '#facc15'}
                    $dimmed={!autoSpeedUpEnabled}
                    aria-label={autoSpeedUpEnabled ? 'Auto Speed Up active' : 'Auto Speed Up paused'}
                    title={
                      autoSpeedUpEnabled
                        ? "Speed Up now triggers automatically the instant it's eligible"
                        : 'Auto Speed Up is currently paused — it will not trigger until resumed'
                    }
                  >
                    ⏩
                  </PpUpgradeBadge>
                  <PauseToggleButton
                    aria-pressed={autoSpeedUpEnabled}
                    aria-label={autoSpeedUpEnabled ? 'Pause Auto Speed Up automation' : 'Resume Auto Speed Up automation'}
                    onClick={() => actions.setAutoSpeedUpEnabled(!autoSpeedUpEnabled)}
                    title={autoSpeedUpEnabled ? 'Pause Auto Speed Up automation' : 'Resume Auto Speed Up automation'}
                    type="button"
                    variant="ghost"
                  >
                    {autoSpeedUpEnabled ? '⏸' : '▶'}
                  </PauseToggleButton>
                </UpgradeRowControls>
              ) : (
                <PpUpgradeButton
                  aria-label={`Enable Auto Speed Up for ${AUTO_SPEED_UP_COST} Prestige Points`}
                  color={canBuyAutoSpeedUp ? '#38bdf8' : 'darkgrey'}
                  disabled={!canBuyAutoSpeedUp}
                  onClick={actions.buyAutoSpeedUp}
                  title="Spend Prestige Points so Speed Up happens automatically, forever, the instant it's eligible"
                  type="button"
                  $progress={ppProgressPercent(AUTO_SPEED_UP_COST)}
                  $progressColor="#38bdf8"
                >
                  <ButtonIcon>⏩ </ButtonIcon>
                  <ButtonLabel>Unlock for {AUTO_SPEED_UP_COST} PP</ButtonLabel>
                  <VisuallyHidden
                    role="progressbar"
                    aria-label="Auto Speed Up Prestige Point progress"
                    aria-valuenow={Math.min(prestige.points, AUTO_SPEED_UP_COST)}
                    aria-valuemin={0}
                    aria-valuemax={AUTO_SPEED_UP_COST}
                  />
                </PpUpgradeButton>
              )}
            </UpgradeRow>

            {allTiersFullyAutomated && isAutoPrestigeActive && (
              <UpgradeRow aria-label="auto-prestige autobuyer upgrade">
                <TierNameLabel>Auto-Prestige Autobuyer</TierNameLabel>
                {isAutoPrestigeAutobuyerActive ? (
                  <UpgradeRowControls>
                    <PpUpgradeBadge
                      $color={autoPrestigeAutobuyerEnabled ? '#4ade80' : '#facc15'}
                      $dimmed={!autoPrestigeAutobuyerEnabled}
                      aria-label={autoPrestigeAutobuyerEnabled ? 'Auto-Prestige Autobuyer active' : 'Auto-Prestige Autobuyer paused'}
                      title={
                        autoPrestigeAutobuyerEnabled
                          ? 'Auto-Prestige now re-levels itself automatically whenever affordable'
                          : 'The Auto-Prestige Autobuyer is currently paused — it will not re-level Auto-Prestige until resumed'
                      }
                    >
                      🔁
                    </PpUpgradeBadge>
                    <PauseToggleButton
                      aria-pressed={autoPrestigeAutobuyerEnabled}
                      aria-label={autoPrestigeAutobuyerEnabled ? 'Pause Auto-Prestige Autobuyer automation' : 'Resume Auto-Prestige Autobuyer automation'}
                      onClick={() => actions.setAutoPrestigeAutobuyerEnabled(!autoPrestigeAutobuyerEnabled)}
                      title={autoPrestigeAutobuyerEnabled ? 'Pause Auto-Prestige Autobuyer automation' : 'Resume Auto-Prestige Autobuyer automation'}
                      type="button"
                      variant="ghost"
                    >
                      {autoPrestigeAutobuyerEnabled ? '⏸' : '▶'}
                    </PauseToggleButton>
                  </UpgradeRowControls>
                ) : (
                  <PpUpgradeButton
                    aria-label={`Enable Auto-Prestige Autobuyer for ${AUTO_PRESTIGE_AUTOBUYER_COST} Prestige Points`}
                    color={canBuyAutoPrestigeAutobuyer ? '#38bdf8' : 'darkgrey'}
                    disabled={!canBuyAutoPrestigeAutobuyer}
                    onClick={actions.buyAutoPrestigeAutobuyer}
                    title="Spend Prestige Points so Auto-Prestige keeps re-leveling itself automatically, forever, whenever affordable"
                    type="button"
                    $progress={ppProgressPercent(AUTO_PRESTIGE_AUTOBUYER_COST)}
                    $progressColor="#38bdf8"
                  >
                    <ButtonIcon>🔁 </ButtonIcon>
                    <ButtonLabel>Unlock for {AUTO_PRESTIGE_AUTOBUYER_COST} PP</ButtonLabel>
                    <VisuallyHidden
                      role="progressbar"
                      aria-label="Auto-Prestige Autobuyer Prestige Point progress"
                      aria-valuenow={Math.min(prestige.points, AUTO_PRESTIGE_AUTOBUYER_COST)}
                      aria-valuemin={0}
                      aria-valuemax={AUTO_PRESTIGE_AUTOBUYER_COST}
                    />
                  </PpUpgradeButton>
                )}
              </UpgradeRow>
            )}

            {allTiersFullyAutomated && (
              <UpgradeRow aria-label="auto-prestige upgrade">
                <TierNameLabel>
                  Auto-Prestige
                  {isAutoPrestigeActive && (
                    <MutedText title={`Auto-Prestige fires roughly every ${autoPrestigeIntervalSeconds}s once Bits reaches 1 Googol`}>
                      <PpUpgradeBadge $dimmed={!autoPrestigeEnabled} aria-label={autoPrestigeEnabled ? 'Auto-Prestige active' : 'Auto-Prestige paused'}>✦</PpUpgradeBadge>
                      {' '}Lv.{autoPrestigeLevel} (every ~{autoPrestigeIntervalSeconds}s)
                    </MutedText>
                  )}
                </TierNameLabel>
                <UpgradeRowControls>
                  <PpUpgradeButton
                    aria-label={
                      isAutoPrestigeActive
                        ? `Upgrade Auto-Prestige for ${autoPrestigeCost} Prestige Points`
                        : `Enable Auto-Prestige for ${autoPrestigeCost} Prestige Points`
                    }
                    color={canBuyAutoPrestige ? '#38bdf8' : 'darkgrey'}
                    disabled={!canBuyAutoPrestige}
                    onClick={actions.buyAutoPrestige}
                    title="Spend Prestige Points so Prestige happens automatically once Bits reaches 1 Googol — each level makes it fire 10% sooner, at double the cost"
                    type="button"
                    $progress={ppProgressPercent(autoPrestigeCost)}
                    $progressColor="#38bdf8"
                  >
                    <ButtonIcon>✦ </ButtonIcon>
                    <ButtonLabel>{isAutoPrestigeActive ? 'Upgrade' : 'Auto-Prestige'} for {autoPrestigeCost} PP</ButtonLabel>
                    <VisuallyHidden
                      role="progressbar"
                      aria-label="Auto-Prestige Prestige Point progress"
                      aria-valuenow={Math.min(prestige.points, autoPrestigeCost)}
                      aria-valuemin={0}
                      aria-valuemax={autoPrestigeCost}
                    />
                  </PpUpgradeButton>
                  {isAutoPrestigeActive && (
                    <PauseToggleButton
                      aria-pressed={autoPrestigeEnabled}
                      aria-label={autoPrestigeEnabled ? 'Pause Auto-Prestige automation' : 'Resume Auto-Prestige automation'}
                      onClick={() => actions.setAutoPrestigeEnabled(!autoPrestigeEnabled)}
                      title={autoPrestigeEnabled ? 'Pause Auto-Prestige automation' : 'Resume Auto-Prestige automation'}
                      type="button"
                      variant="ghost"
                    >
                      {autoPrestigeEnabled ? '⏸' : '▶'}
                    </PauseToggleButton>
                  )}
                </UpgradeRowControls>
              </UpgradeRow>
            )}
          </UpgradeCategory>

          {!state.prestigeSpeedBonusUnlocked && (
            <UpgradeCategory aria-label="production bonuses category">
              <CategoryHeading>Production Bonuses</CategoryHeading>
              <UpgradeRow aria-label="production speed bonus upgrade">
                <TierNameLabel>Production speed bonus</TierNameLabel>
                <PpUpgradeButton
                  aria-label={`Unlock Prestige Point production speed bonus for ${PRESTIGE_SPEED_BONUS_UNLOCK_COST} Prestige Points`}
                  color={canBuySpeedBonus ? '#38bdf8' : 'darkgrey'}
                  disabled={!canBuySpeedBonus}
                  onClick={actions.buyPrestigeSpeedBonus}
                  title="Spend Prestige Points once to enable +1% production speed per unspent Prestige Point"
                  type="button"
                  $progress={ppProgressPercent(PRESTIGE_SPEED_BONUS_UNLOCK_COST)}
                  $progressColor="#38bdf8"
                >
                  <ButtonIcon>🚀 </ButtonIcon>
                  <ButtonLabel>Unlock for {PRESTIGE_SPEED_BONUS_UNLOCK_COST} PP</ButtonLabel>
                  <VisuallyHidden
                    role="progressbar"
                    aria-label="Speed bonus unlock Prestige Point progress"
                    aria-valuenow={Math.min(prestige.points, PRESTIGE_SPEED_BONUS_UNLOCK_COST)}
                    aria-valuemin={0}
                    aria-valuemax={PRESTIGE_SPEED_BONUS_UNLOCK_COST}
                  />
                </PpUpgradeButton>
              </UpgradeRow>
            </UpgradeCategory>
          )}
        </UpgradesList>
      )}

      {view === 'milestones' && !isFirstRun && (
        <UpgradesList aria-label="milestones page">
          <UpgradeCategory aria-label="tier autobuyer unlock milestones category">
            <CategoryHeading>Tier Autobuyer Unlocks</CategoryHeading>
            <MutedText>
              Each tier's unit-buying autobuyer unlocks on its own, for free, once you've prestiged
              this many times — no PP needed.
            </MutedText>
            {TIER_DEFINITIONS.map(tier => {
              const milestone = getAutobuyerUnlockMilestone(tier.id)
              const reached = (state.autobuyers[tier.id] ?? null) !== null
              return (
                <UpgradeRow key={tier.id} aria-label={`${tier.name} autobuyer unlock milestone`}>
                  <TierNameLabel title={tier.name}>
                    <VisuallyHidden>{tier.name}</VisuallyHidden>
                    <span aria-hidden="true">{tier.symbol}</span>
                  </TierNameLabel>
                  {reached ? (
                    <PpUpgradeBadge
                      $color="#4ade80"
                      aria-label={`${tier.name}'s autobuyer unlocked at Prestige ${milestone}`}
                      title={`Unlocked automatically at Prestige ${milestone}`}
                    >
                      ✅ Prestige {milestone}
                    </PpUpgradeBadge>
                  ) : (
                    <UpgradeRowControls>
                      <PpUpgradeBadge
                        $color="darkgrey"
                        $dimmed
                        aria-label={`${tier.name}'s autobuyer unlocks at Prestige ${milestone}, currently at Prestige ${prestige.count}`}
                        title={`Unlocks automatically once you've prestiged ${milestone} time${milestone === 1 ? '' : 's'} — you're at ${prestige.count} now`}
                      >
                        🔒 Prestige {milestone}
                      </PpUpgradeBadge>
                      <VisuallyHidden
                        role="progressbar"
                        aria-label={`${tier.name} autobuyer unlock milestone progress`}
                        aria-valuenow={Math.min(prestige.count, milestone)}
                        aria-valuemin={0}
                        aria-valuemax={milestone}
                      />
                    </UpgradeRowControls>
                  )}
                </UpgradeRow>
              )
            })}
          </UpgradeCategory>

          <UpgradeCategory aria-label="tier tickspeed autobuyer milestones category">
            <CategoryHeading>Tier Tickspeed Autobuyers</CategoryHeading>
            <MutedText>
              Each tier's own tickspeed autobuyer unlocks later, starting at Prestige{' '}
              {getTierTickspeedAutobuyerMilestone(TIER_DEFINITIONS[0].id)} and every{' '}
              {TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP} prestiges after that — also free.
            </MutedText>
            {TIER_DEFINITIONS.map(tier => {
              const milestone = getTierTickspeedAutobuyerMilestone(tier.id)
              const reached = state.tierTickspeedAutobuyer?.[tier.id] ?? false
              return (
                <UpgradeRow key={tier.id} aria-label={`${tier.name} tickspeed autobuyer milestone`}>
                  <TierNameLabel title={tier.name}>
                    <VisuallyHidden>{tier.name}</VisuallyHidden>
                    <span aria-hidden="true">{tier.symbol}</span>
                  </TierNameLabel>
                  {reached ? (
                    <PpUpgradeBadge
                      $color="#4ade80"
                      aria-label={`${tier.name}'s tickspeed autobuyer unlocked at Prestige ${milestone}`}
                      title={`Unlocked automatically at Prestige ${milestone}`}
                    >
                      ✅ Prestige {milestone}
                    </PpUpgradeBadge>
                  ) : (
                    <UpgradeRowControls>
                      <PpUpgradeBadge
                        $color="darkgrey"
                        $dimmed
                        aria-label={`${tier.name}'s tickspeed autobuyer unlocks at Prestige ${milestone}, currently at Prestige ${prestige.count}`}
                        title={`Unlocks automatically once you've prestiged ${milestone} times — you're at ${prestige.count} now`}
                      >
                        🔒 Prestige {milestone}
                      </PpUpgradeBadge>
                      <VisuallyHidden
                        role="progressbar"
                        aria-label={`${tier.name} tickspeed autobuyer milestone progress`}
                        aria-valuenow={Math.min(prestige.count, milestone)}
                        aria-valuemin={0}
                        aria-valuemax={milestone}
                      />
                    </UpgradeRowControls>
                  )}
                </UpgradeRow>
              )
            })}
          </UpgradeCategory>
        </UpgradesList>
      )}

      <ResetButton
        aria-describedby="reset-description"
        aria-label="Reset game"
        color={isFrozen ? 'darkgrey' : '#a3a3a3'}
        disabled={isFrozen}
        type="button"
        onClick={handleResetClick}
        title={isFrozen ? 'Prestige first — production is frozen at 1 Googol Bits' : 'Erases all progress and starts over (asks for confirmation)'}
      >
        <ButtonContent>↺ Reset</ButtonContent>
        <VisuallyHidden id="reset-description">Erases all progress and starts over</VisuallyHidden>
      </ResetButton>
    </RootDiv>
  )
}

export default MainPage
