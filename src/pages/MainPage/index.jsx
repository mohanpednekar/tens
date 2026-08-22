import Button, { ButtonContent, ButtonIcon, ButtonLabel, VisuallyHidden } from 'components/Button'
import Money from 'components/Money'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, formatBytes, formatCurrency, formatMoneyBalance, formatOfflineDuration, getAutobuyerUnlockMilestone, getAutoPrestigeAttemptRate, getAutoPrestigeCost, getEffectiveTierTickSpeedSeconds, getGlobalTickspeedMultiplierCost, getGlobalTickspeedProductionMultiplier, getLastTierXpTickspeedMinConsumption, getLastTierXpTickspeedMultiplier, getNextBytePowerProgressFraction, getOverclockMultiplier, getOverclockRequirement, getPrestigeDoublePpUpgradeCost, getPrestigePointsAwarded, getPrestigePpEarnProgressPercent, getPrestigePpPerPower, getPrestigePowersPerPp, getPrestigeProductionMultiplier, getPrestigeProgressPercent, getPurchaseBlockSize, getPurchaseMilestoneMultiplier, getSmartAutobuyerCost, getSpeedUpMultiplier, getSpeedUpRequirement, getTickspeedMultiplierCost, getTickspeedProductionMultiplier, getTierAffordableQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, getTierTickspeedAutobuyerMilestone, isGlobalTickspeedMultiplierUnlocked, isLastTierTickspeedXpUnlocked, isProductionFrozen, isTierUnlocked, isUnboundedPrestigeUnlocked } from 'game/engine'
import { AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_SPEED_UP_COST, BITS_PER_BYTE, BYTES_ID, COMPUTE_BOOST_PRESETS, getTierBaseTickSpeedSeconds, GLOBAL_TICKSPEED_PRODUCTION_STEP, MONEY_ID, PRESTIGE_SPEED_BONUS_UNLOCK_COST, PRESTIGE_THRESHOLD, PRESTIGE_UNBOUNDED_MIN_COUNT, RESOURCE_SYMBOL, TICKSPEED_AUTOBUYER_COST, TIER_DEFINITIONS, TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP } from 'game/layers'
import { hasAffordablePpUpgrade } from 'game/navAttention'
import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes, useTheme } from 'styled-components'

// index.html sets viewport-fit=cover so the installed-on-homescreen iOS app (black-translucent
// status bar, see docs/PWA_REFERENCE.md) draws edge-to-edge; without this padding the bottom-most
// tier row's Buy button ends up under the home-indicator safe area, where iOS won't let the page
// scroll far enough for it to become reachable at all (not just visually clipped).
const RootDiv = styled.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
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
`


const TierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
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
// Top line: tier symbol on the left of the left half; owned count on the same line but
// right-aligned to the row center (end of the left half via margin-left: auto); production
// on the right. Button row: tickspeed
// and Buy each take exactly half the row (equal column halves) — Buy stays rightmost as the
// constantly-clicked control. Bottom line: a single 'details' area spanning both columns,
// holding the per-tier click-to-expand disclosure's content (see TierDetailsContent below) —
// only rendered at all while expanded, so a collapsed row contributes zero height there. There
// is no separate visible trigger for it (no "Details" label): TierName itself (wrapped in
// TierNameTrigger, in the 'name' area) is the trigger, and clicking anywhere else on the tile
// that isn't a button also toggles it (see the row's own onClick below) — a React-controlled
// disclosure rather than native <details>/<summary>, see openTierDetailIds in MainPage for why.
// cursor: pointer signals the whole tile is clickable; Button's own cursor rule overrides it
// for the two buttons. There used to be a dedicated 'autobuyer' grid row for the per-tier
// autobuyer status badge; it's folded into the 'name' row instead now that the badge is a
// single icon rather than a written "Active"/"Paused" line (see MainPage), so the row no longer
// needs the extra vertical space for it.
const TierLine = styled(StatCard)`
  display: grid;
  grid-template-areas:
    'name production'
    'upgrade buy'
    'details details';
  grid-template-columns: 1fr 1fr;
  align-items: center;
  column-gap: ${props => props.theme.space.sm};
  row-gap: ${props => props.theme.space.xs};
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border-left: 3px solid ${props => props.$accent};
  cursor: pointer;
  transition: border-color ${props => props.theme.motion.duration.base} ${props => props.theme.motion.easing.standard};
  animation: ${props => (props.$animateReveal ? css`${reveal} 0.4s ease-out` : 'none')};

  &:hover {
    border-color: ${props => props.theme.color.borderStrong};
    border-left-color: ${props => props.$accent};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 40rem) {
    /* Same areas as desktop; equal halves keep the two buttons matched. */
    column-gap: ${props => props.theme.space.xs};
    padding: ${props => props.theme.space.sm} ${props => props.theme.space.sm};
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

const OverclockCard = styled(StatCard)`
  border-color: #c2410c;
`

// Matches SpeedUpButton's own font-size override, same rationale (stays visually consistent with
// the tier list's Buy/tickspeed buttons rather than the larger standalone-card default).
const OverclockButton = styled(Button)`
  font-size: 0.82em;

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

// Lays SpeedUpCard and OverclockCard side by side, below the tier list — both are compact "one
// button" soft-reset cards, so sharing a row reads as a single cluster instead of stacked
// full-width blocks. GlobalTickspeedCard renders separately, alone at the very top of the Game
// view (see its own render site above) rather than sharing this row — it's the one control
// relevant from the very start of a run, before the last tier (and so Speed Up/Overclock) is even
// reachable. Each card grows to share the row equally (flex: 1) with a low floor width (8rem)
// on wider viewports. Below 40rem (the same mobile breakpoint every other component in this file
// uses), the row switches to a single column instead — Speed Up above Overclock, matching their
// JSX order — rather than staying side by side down to phone width: on a narrow screen, two soft
// resets sharing a cramped row read as harder to tell apart at a glance than a clear top-to-bottom
// stack, even though the pair still technically fits side by side down to ~360px (an earlier
// version optimized for exactly that fit; see docs/DESIGN_HISTORY.md for the reasoning that was
// superseded here). `flex: 1 1 auto` in the column case lets each card's height come from its own
// content instead of the row layout's 8rem basis (which would otherwise set every card's *height*
// once the main axis rotates to vertical); `align-items: stretch`, flexbox's own default, is what
// makes each stacked card fill the row's full width without an explicit `width: 100%`. Works
// unchanged if only one of the two is currently revealed (the lone card just fills the row/column)
// or neither (the empty wrapper renders with zero height).
const SpeedCardsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  > * {
    flex: 1 1 8rem;
    min-width: 0;
  }

  @media (max-width: 40rem) {
    flex-direction: column;

    > * {
      flex: 1 1 auto;
    }
  }
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
// call site) 8-segment progress toward the next power-of-ten Bytes, living under MoneyHero.
// Each segment is 12.5% (1/BITS_PER_BYTE); the active segment fills progressively.
const BytePowerSegments = styled.div`
  display: flex;
  gap: 3px;
  margin-top: 0.5rem;
  width: 100%;
`

const BytePowerSegment = styled.span`
  background: ${props => props.theme.color.surfaceSunken};
  border-radius: 2px;
  flex: 1;
  height: 0.4rem;
  min-width: 0;
  overflow: hidden;
`

const BytePowerSegmentFill = styled.span`
  background: ${props => props.theme.color.accent};
  display: block;
  height: 100%;
  transition: width ${props => props.theme.motion.duration.slow} ${props => props.theme.motion.easing.out};
  width: ${props => props.$fraction * 100}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

// Prestige progress as its own top-of-screen element (moved out of the money hero card).
const PrestigeProgressTop = styled.div`
  margin: 0 0 0.75rem;
  width: 100%;
`

const PrestigeProgressTrack = styled.div`
  background: ${props => props.theme.color.surfaceSunken};
  border-radius: ${props => props.theme.radius.pill};
  height: 0.4rem;
  overflow: hidden;
  width: 100%;
`

const PrestigeProgressFill = styled.div`
  background: ${props => props.theme.color.accent};
  height: 100%;
  transition: width ${props => props.theme.motion.duration.slow} ${props => props.theme.motion.easing.out};
  width: ${props => props.$percent}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const PrestigeProgressLabel = styled(HudMutedText)`
  font-size: ${props => props.theme.type.scale.xs.size};
  margin-top: 0.3rem;
  text-align: center;
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
  top: ${props => (props.$belowBar ? `${props.$belowBarHeight}px` : 'env(safe-area-inset-top)')};
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

// Per-tier click-to-expand disclosure surfacing numbers that don't fit the row's compact layout —
// most notably each tier's own base/effective tickspeed, now that base tickspeed diverges per
// tier again (see "Tier production tickspeed" in CLAUDE.md). No separate visible "Details" label:
// TierName itself is the trigger. This is a plain React-controlled disclosure (openTierDetailIds,
// see MainPage), not native <details>/<summary> — a display:contents-based version was tried
// first, but hit a real Chromium limitation where a display:contents ancestor breaks a promoted
// grid child's ability to
// span multiple grid-template-areas cells, collapsing TierDetailsContent below to a single
// column's width instead of the full row (confirmed with a minimal repro, independent of whether
// the span was expressed via a named area or explicit grid-column line numbers). TierNameTrigger
// carries the interactive role/keyboard handling that native <summary> would otherwise provide
// for free; TierName (the h3 inside it) keeps its own heading semantics, since applying role via
// ARIA only overrides an element's OWN implicit role, never a nested descendant's.
const TierNameTrigger = styled.div`
  align-items: baseline;
  column-gap: ${props => props.theme.space.sm};
  cursor: pointer;
  display: flex;
  grid-area: name;
  min-width: 0;
  width: 100%;
`

// Holds the disclosure's actual content, occupying the 'details' grid area — only rendered at all
// while its tier is in openTierDetailIds (see MainPage), so a collapsed row contributes zero
// height there, same footprint as before this disclosure existed.
const TierDetailsContent = styled.div`
  grid-area: details;
  font-size: ${props => props.theme.type.scale.xs.size};
  line-height: ${props => props.theme.type.scale.xs.lineHeight};
  margin-top: ${props => props.theme.space.xs};
  padding-top: ${props => props.theme.space.xs};
  border-top: 1px solid ${props => props.theme.color.border};

  ul {
    color: ${props => props.theme.color.textMuted};
    margin: ${props => props.theme.space.xs} 0 0;
    padding-left: 1.1rem;
  }

  li {
    margin: 0.15rem 0;
  }
`

// Mandatory full-screen takeover shown only the very first time Money reaches PRESTIGE_THRESHOLD (before the
// player has ever prestiged) — covers the whole viewport so the frozen, disabled page underneath
// is never visible/reachable; there's deliberately no close/dismiss control (see PrestigeButton
// below, the only thing left clickable while frozen).
const FullScreenOverlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.92);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: calc(${props => props.theme.space['2xl']} + env(safe-area-inset-top))
    calc(${props => props.theme.space.lg} + env(safe-area-inset-right))
    calc(${props => props.theme.space['2xl']} + env(safe-area-inset-bottom))
    calc(${props => props.theme.space.lg} + env(safe-area-inset-left));
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`

const FullScreenCard = styled.div`
  background: ${props => props.theme.color.surfaceRaised};
  border: 1px solid ${props => props.theme.color.borderStrong};
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadow.md};
  color: ${props => props.theme.color.text};
  max-width: 28rem;
  padding: ${props => props.theme.space.xl} ${props => props.theme.space.lg};
  text-align: center;
  width: 100%;

  h2 {
    color: ${props => props.theme.color.warn};
    font-family: ${props => props.theme.font.display};
    font-size: ${props => props.theme.type.scale.xl.size};
    font-weight: 700;
    line-height: ${props => props.theme.type.scale.xl.lineHeight};
    margin: 0 0 ${props => props.theme.space.md};
  }

  ul {
    color: ${props => props.theme.color.textMuted};
    font-size: ${props => props.theme.type.scale.sm.size};
    line-height: ${props => props.theme.type.scale.sm.lineHeight};
    margin: ${props => props.theme.space.lg} 0 ${props => props.theme.space.xl};
    padding-left: 1.25rem;
    text-align: left;
  }

  li {
    margin: 0.3rem 0;
  }
`

// From the 2nd prestige onward, reaching PRESTIGE_THRESHOLD again shows a compact banner pinned to the top
// of the viewport instead of the full-screen takeover — the player already knows what Prestige
// does, so a persistent-but-unobtrusive reminder is enough.
const TopPrestigeBar = styled.div`
  align-items: center;
  background: ${props => props.theme.color.surfaceRaised};
  border-bottom: 2px solid ${props => props.theme.color.warn};
  box-shadow: ${props => props.theme.shadow.sm};
  color: ${props => props.theme.color.text};
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.md};
  justify-content: center;
  left: 0;
  padding: calc(${props => props.theme.space.sm} + env(safe-area-inset-top))
    calc(${props => props.theme.space.lg} + env(safe-area-inset-right))
    ${props => props.theme.space.sm}
    calc(${props => props.theme.space.lg} + env(safe-area-inset-left));
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

// Prestige-surface copy only — forked from the app-wide MutedText (still hardcoded elsewhere) so
// this region's AA audit stays meaningful without migrating TierList/SpeedUpCard in #138's scope.
const PrestigeMutedText = styled.p`
  color: ${props => props.theme.color.textMuted};
  font-size: ${props => props.theme.type.scale.sm.size};
  line-height: ${props => props.theme.type.scale.sm.lineHeight};
  margin: 0;
`

const MutedText = styled.p`
  color: #a3a3a3;
  margin: 0;
`

// Display labels for COMPUTE_BOOST_PRESETS' own keys (layers.js), same map ByteFoundryPage's own
// activation buttons use — not shared as a module since the two pages don't otherwise import from
// each other.
const COMPUTE_BOOST_LABELS = { burst: 'Burst', standard: 'Standard', sustain: 'Sustain' }


// Occupies the top line's first track. Used to also share this line with a compact tickspeed
// bonus badge and an autobuyer status icon — both removed to keep the row down to just the tier
// name plus live production/owned figures and the two action buttons; the tickspeed bonus is
// still visible in the row's own Details disclosure below, and autobuyer status still shows on
// the PP Upgrades page.
const TierName = styled.h3`
  align-items: baseline;
  column-gap: ${props => props.theme.space.sm};
  display: flex;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.lg.size};
  line-height: ${props => props.theme.type.scale.lg.lineHeight};
  font-weight: 700;
  margin: 0;
  min-width: 0;

  @media (max-width: 40rem) {
    font-size: ${props => props.theme.type.scale.md.size};
    line-height: ${props => props.theme.type.scale.md.lineHeight};
  }
`

const TierNameLabel = styled.span`
  flex-shrink: 0;
`

// A native click-to-expand disclosure for a genuinely live number that would otherwise need its
// own permanently-visible line (see GlobalTickspeedCard/OverclockCard/the Tier Tickspeed
// Autobuyers milestone category below) — collapsed by default, the card/category's own heading
// (wrapped in <summary>) is the only way to open it, no separate visible "expand" affordance.
// Native <details>/<summary> keeps this keyboard/screen-reader accessible with no JS state; the
// marker (▸) is hidden deliberately, matching every other disclosure in this app.
const Disclosure = styled.details`
  summary {
    cursor: pointer;
    list-style: none;
    user-select: none;
    width: fit-content;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary h2 {
    display: inline;
    margin: 0;
  }

  p {
    margin-top: 0.3rem;
  }
`

// Clicking <summary> already natively toggles a <details> element open/closed; clicking
// anywhere else inside it (e.g. the revealed status line itself) doesn't, by default, so this
// force-closes it instead — mirroring the tier row's own "click anywhere on the tile also
// toggles its details" convention (see TierLine's onClick below), just scoped to collapsing only
// (opening still requires the summary specifically, per Disclosure's own contract above). Safe to
// mutate `.open` directly since every Disclosure here is uncontrolled (no `open` prop is ever
// passed by React).
const collapseDisclosure = event => {
  if (event.target.closest('summary')) return
  event.currentTarget.open = false
}

// Owned count lives on the first line, right-aligned to the row center (pushed to the end of
// the left half with margin-left: auto). Sibling of TierName inside TierNameTrigger — not nested
// in the h3 (nesting would pollute the heading's accessible name).
const OwnedText = styled.span`
  color: ${props => props.theme.color.textMuted};
  flex-shrink: 0;
  font-size: ${props => props.theme.type.scale.sm.size};
  line-height: ${props => props.theme.type.scale.sm.lineHeight};
  font-weight: 400;
  margin: 0;
  margin-left: auto;
  text-align: right;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: ${props => props.theme.type.scale.xs.size};
    line-height: ${props => props.theme.type.scale.xs.lineHeight};
  }
`

// Production reads slightly stronger than owned — the live output figure on the stats line.
const ProductionText = styled.span`
  grid-area: production;
  color: ${props => props.theme.color.text};
  font-size: ${props => props.theme.type.scale.sm.size};
  line-height: ${props => props.theme.type.scale.sm.lineHeight};
  font-weight: 500;
  margin: 0;
  text-align: right;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: ${props => props.theme.type.scale.xs.size};
    line-height: ${props => props.theme.type.scale.xs.lineHeight};
  }
`

// The fill (green = already bought this cost block, amber = affordable but not yet bought)
// renders directly on the button via $progress/$secondaryProgress instead of a separate bar.
const BuyButton = styled(Button)`
  grid-area: buy;
  width: 100%;
  font-size: ${props => props.theme.type.scale.sm.size};
  font-weight: 700;
  margin-top: ${props => props.theme.space.xs};
  padding: 0.4em 0.45em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: ${props => props.theme.type.scale.xs.size};
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
  font-size: ${props => props.theme.type.scale.sm.size};
  margin-top: ${props => props.theme.space.xs};
  padding: 0.4em 0.45em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: ${props => props.theme.type.scale.xs.size};
    padding: 0.38em 0.4em;
  }
`

// Second-level tabs on Byte Factory: Data | Upgrades (peer tabs — no back chrome). Milestones lives
// under AppNav → More. Shown only after a first Prestige (!isFirstRun). Reset lives only under
// Settings → Danger zone (AppNav → More → Settings), not on this page.
const ViewNav = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ViewTabButton = styled(Button)`
  flex: 1;
  position: relative;
`

// Affordability cue on the Upgrades tab — same green as AppNav attention dots.
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
// TierLine grid. In the Tier Autobuyers category, a row's badge order (tickspeed-autobuyer cluster,
// then unit-autobuyer cluster) mirrors the Game view's own TierName badge order (⚙ before 🤖), and
// Smart is nested inside the same UpgradeRowControls as the unit-autobuyer badge/toggle since it
// specifically modifies that autobuyer's behavior, rather than trailing as an unrelated fourth item.
// No border/background of its own — the enclosing UpgradeCategory provides that — just a thin top
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
    : resourceId === BYTES_ID
      ? formatBytes(amount)
      : `${formatAmount(amount)} ${RESOURCE_SYMBOL(resourceId)}`

// Live "how close am I" fill percent for a progress meter (PP/tickspeed/Speed Up buttons, XP
// consumption) — how much of `denominator` the current `numerator` already covers, capped at 100.
const progressPercent = (numerator, denominator) => Math.min(100, Math.round((numerator / denominator) * 100))

// "1.1" / "1.21" / "1" — rounds to 2 decimal places and trims a trailing ".00"/trailing zero, used
// for multiplier displays (Speed Up's next multiplier, the PP production speed bonus, the tier row's
// "Effective tickspeed" breakdown). Overclock's own boost is folded into the Tickspeed upgrade's
// per-level rate and displayed as a percentage via formatGlobalTickspeedBonusPercent instead — see
// "Overclock" below — not through this helper.
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

const MainPage = ({ game, focusNonce = 0 }) => {
  const { actions, dismissOfflineProgress, offlineProgress, state } = game
  const theme = useTheme()
  const { prestige } = state
  // Live "how close am I" fill for every PP-spending button, mirroring the tier buttons'
  // on-button progress treatment: how much of a given PP cost the current unspent balance
  // already covers.
  const ppProgressPercent = cost => progressPercent(prestige.points, cost)
  const canPrestige = state.resources[MONEY_ID] >= PRESTIGE_THRESHOLD
  const isUnbounded = isUnboundedPrestigeUnlocked(state)
  const doublePpLevel = state.prestigeDoublePpLevel ?? 0
  const doublePpCost = getPrestigeDoublePpUpgradeCost(doublePpLevel)
  const powersPerPp = getPrestigePowersPerPp(doublePpLevel)
  const ppPerPower = getPrestigePpPerPower(doublePpLevel)
  // The passive PP production-speed bonus is inert until unlocked (see buyPrestigeSpeedBonus in
  // engine.js) — before that, it's a flat ×1 regardless of unspent PP balance.
  const prestigeBonus = state.prestigeSpeedBonusUnlocked
    ? getPrestigeProductionMultiplier(prestige.points)
    : 1
  const prestigePointsPreview = getPrestigePointsAwarded(state.resources[MONEY_ID], doublePpLevel)
  const prestigeProgressPercent = isUnbounded && canPrestige
    ? getPrestigePpEarnProgressPercent(state.resources[MONEY_ID], doublePpLevel)
    : getPrestigeProgressPercent(state.resources[MONEY_ID])
  const bytePowerProgressFraction = getNextBytePowerProgressFraction(state.resources[MONEY_ID])
  const bytePowerProgressPercent = Math.round(bytePowerProgressFraction * 100)
  // What a Prestige would award — shown on the Prestige button itself (Buy-button style: the
  // effect lives on the control, not in a separate text line). Below Googol the formula reads 0,
  // but the award on reaching it is always at least 1, so that's the effect worth advertising.
  const prestigeAwardPreview = Math.max(1, prestigePointsPreview)
  const prestigeLabel = isUnbounded && canPrestige
    ? 'Prestige (optional — claim accumulated PP)'
    : 'Prestige (requires 1 Googol Bytes)'
  const prestigeAriaLabel = `${prestigeLabel} — awards +${formatAmount(prestigeAwardPreview)} Prestige Point${prestigeAwardPreview === 1 ? '' : 's'}`
  // Data vs PP Upgrades — local toggle only (not AppNav). Game/Milestones tabs were removed:
  // the ladder is the default Byte Factory screen, and Milestones lives under AppNav → More. Upgrades
  // stays here because it's the only PP-purchase surface and isn't elsewhere in AppNav/More.
  const [view, setView] = useState('game')
  useEffect(() => {
    setView('game')
  }, [focusNonce])
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
  // Auto-collapses a tier's Details disclosure once its row scrolls fully out of the viewport
  // (native <details> can't be used here — see TierDetailsContent's own comment for why). A single shared
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

  // All production and purchasing freezes the instant Money reaches PRESTIGE_THRESHOLD (see
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
  // PRESTIGE_THRESHOLD (see speedUpGame in engine.js) — once the last tier reaches that cycle's requirement
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

  // Overclock: a second, rarer soft-reset than Speed Up, claimable once the last tier's own level
  // passes the next Overclock level — one more than the last claimed level (see
  // getOverclockRequirement/overclockGame in engine.js); no artificial ladder beyond that. Unlike
  // Speed Up, claiming it also wipes Speed Up's own stacking bonus back to zero (its speedUpCount
  // resets to 0) in exchange for permanently multiplying BOTH the (Money-funded) global Tickspeed
  // upgrade's regular and milestone per-level steps by getOverclockMultiplier(overclockCount)
  // (×1.1 per level) — folded into that existing track's own compounding rate, not a separate
  // multiplier stacked alongside it, so it has no effect until at least one Tickspeed level is
  // bought. A claim jumps straight to the last tier's current level, so falling behind never
  // requires claiming every intermediate level one at a time. Gated on the same lastTierUnlocked
  // flag and progressive-disclosure pattern as Speed Up above.
  const [overclockEverRevealed, setOverclockEverRevealed] = useState(lastTierUnlocked)
  useEffect(() => {
    if (lastTierUnlocked) setOverclockEverRevealed(true)
  }, [lastTierUnlocked])
  const overclockCount = state.overclockCount ?? 0
  const overclockRequirement = getOverclockRequirement(overclockCount)
  // The current/next per-level step the global Tickspeed upgrade's own REGULAR levels compound at,
  // expressed as a "multiplier" (1 + step) purely so formatGlobalTickspeedBonusPercent's existing
  // (multiplier - 1) * 100 formatting can be reused directly — these are never applied as
  // standalone multipliers anywhere, only fed into getGlobalTickspeedProductionMultiplier below.
  // The "next" value previews what claiming right now would jump the rate to — the last tier's own
  // current level, per overclockGame's catch-up behavior, not just the minimum requirement.
  const currentGlobalTickspeedStepDisplay = 1 + GLOBAL_TICKSPEED_PRODUCTION_STEP * getOverclockMultiplier(overclockCount)
  const nextGlobalTickspeedStepDisplay = 1 + GLOBAL_TICKSPEED_PRODUCTION_STEP * getOverclockMultiplier(Math.max(lastTierLevel, overclockRequirement))
  // Unlike speedUpRequirementDisplay above, this is NOT given the -1 "completed blocks" display
  // offset — see getOverclockRequirement's own comment in engine.js: it's expressed as a raw level
  // target so the number shown here matches the same raw purchaseLevels number the last tier's own
  // Details disclosure already shows, rather than introducing a second, differently-offset "level"
  // reading for the same underlying value.
  const overclockProgressPercent = progressPercent(lastTierLevel, overclockRequirement)
  const canOverclock = !isFrozen && lastTierLevel >= overclockRequirement

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
  const canBuyDoublePp = !isFirstRun && prestige.points >= doublePpCost
  const doublePpUpgradeSummary = ppPerPower > 1
    ? `${formatAmount(ppPerPower)} PP per power`
    : `1 PP per ${formatAmount(powersPerPp)} power${powersPerPp === 1 ? '' : 's'}`
  const canBuySpeedBonus = !isFrozen && !state.prestigeSpeedBonusUnlocked && prestige.points >= PRESTIGE_SPEED_BONUS_UNLOCK_COST

  // Auto-Prestige is a single global (not per-tier) leveled upgrade, mirroring the tier autobuyer
  // Lv./Upgrade pattern — once activated (level 1), it fires roughly every
  // AUTO_PRESTIGE_BASE_INTERVAL_SECONDS once Money is at/above PRESTIGE_THRESHOLD; each further level speeds
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
  // Auto-Prestige's null/level pattern — each REGULAR level speeds up *every* tier's delivery
  // frequency by another getGlobalTickspeedProductionMultiplier's own regular step (1% by default,
  // permanently raised by Overclock — see above), not the amount delivered (see
  // getGlobalTickspeedProductionMultiplier/buyGlobalTickspeedMultiplier). Unlike every other
  // automation upgrade on this page, it's Bytes-funded (not PP) and lives on the Game view instead
  // of the PP Upgrades page — see isGlobalTickspeedMultiplierUnlocked in engine.js: it only becomes
  // purchasable once at least 1 of the second tier is owned, so a player can't spend their Bytes
  // on it before Kilobytes are producing any. The level itself resets to not-yet-bought on both
  // Up (see prestigeGame/speedUpGame in engine.js), same as tier02's owned count, so re-unlocking
  // always requires owning tier02 again after either reset. overclockCount, by contrast, is NOT
  // reset by Speed Up — its boost to the per-level step survives across a re-unlock within the
  // same Prestige cycle.
  const globalTickspeedLevel = state.globalTickspeedMultiplier ?? null
  const isGlobalTickspeedActive = globalTickspeedLevel !== null
  const globalTickspeedMultiplier = getGlobalTickspeedProductionMultiplier(globalTickspeedLevel, overclockCount)
  const globalTickspeedCost = getGlobalTickspeedMultiplierCost(globalTickspeedLevel ?? 0)
  const globalTickspeedUnlocked = isGlobalTickspeedMultiplierUnlocked(state)
  const canBuyGlobalTickspeed = !isFrozen && globalTickspeedUnlocked && (state.resources[BYTES_ID] ?? 0) >= globalTickspeedCost
  const globalTickspeedProgressPercent = progressPercent(state.resources[BYTES_ID] ?? 0, globalTickspeedCost)
  // Progressive disclosure, same pattern as speedUpEverRevealed above:
  // once the card has ever been relevant (tier02 owned, or the multiplier already active from a
  // prior run), it stays visible — in a disabled state — rather than disappearing again the
  // moment a Prestige/Speed Up resets tier02's owned count back to 0.
  const [globalTickspeedCardEverRevealed, setGlobalTickspeedCardEverRevealed] = useState(globalTickspeedUnlocked)
  useEffect(() => {
    if (globalTickspeedUnlocked) setGlobalTickspeedCardEverRevealed(true)
  }, [globalTickspeedUnlocked])

  // Lights the Upgrades control whenever unspent PP can afford at least one purchase — see
  // hasAffordablePpUpgrade in game/navAttention.js (shared with AppNav's Factory attention level).
  const showPpUpgradeAttention = hasAffordablePpUpgrade(state)

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

  if (showFullScreenPrompt) {
    return (
      <FullScreenOverlay role="dialog" aria-modal="true" aria-label="Prestige required">
        <FullScreenCard>
          <h2>✦ Prestige Available!</h2>
          <PrestigeMutedText>
            You've reached {formatCurrency(state.resources[MONEY_ID])} — 1 Googol Bytes. All
            production has stopped.
          </PrestigeMutedText>
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
            variant="prestige"
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
            <PrestigeMutedText>1 Googol Bytes reached — production has stopped.</PrestigeMutedText>
            <Button
              aria-label={prestigeAriaLabel}
              variant="prestige"
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
        <h1>Ladder</h1>
      </Header>

      <PrestigeProgressTop aria-label="prestige progress">
        <PrestigeProgressTrack aria-hidden="true">
          <PrestigeProgressFill $percent={prestigeProgressPercent} />
        </PrestigeProgressTrack>
        <VisuallyHidden
          role="progressbar"
          aria-label="progress toward 1 Googol Bytes, when Prestige becomes available"
          aria-valuenow={prestigeProgressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <PrestigeProgressLabel>
          {isUnbounded && canPrestige
            ? `${prestigeProgressPercent}% to next PP (${doublePpUpgradeSummary})`
            : isUnbounded
              ? `${prestigeProgressPercent}% to Prestige`
              : `${prestigeProgressPercent}% to Prestige${!isUnbounded && (prestige.count ?? 0) < PRESTIGE_UNBOUNDED_MIN_COUNT ? ` (unlocks at Prestige ${PRESTIGE_UNBOUNDED_MIN_COUNT})` : ''}`}
        </PrestigeProgressLabel>
      </PrestigeProgressTop>

      {state.intro?.computeBoostType && COMPUTE_BOOST_PRESETS[state.intro.computeBoostType] && (
        <MutedText aria-label="active compute boost">
          {`${COMPUTE_BOOST_LABELS[state.intro.computeBoostType] ?? state.intro.computeBoostType} Compute Boost active: ×${COMPUTE_BOOST_PRESETS[state.intro.computeBoostType].multiplier} production, ${formatOfflineDuration(state.intro.computeBoostRemainingSeconds)} left`}
        </MutedText>
      )}

      <OfflineProgressNotice offlineProgress={offlineProgress} dismissOfflineProgress={dismissOfflineProgress} />

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
          <MoneyHero>{formatMoneyBalance(state.resources[MONEY_ID])}</MoneyHero>
          {!balancesCompressed && (
            <>
              <BytePowerSegments aria-hidden="true">
                {Array.from({ length: BITS_PER_BYTE }, (_, segmentIndex) => {
                  const segmentStart = segmentIndex / BITS_PER_BYTE
                  const segmentSize = 1 / BITS_PER_BYTE
                  const fillFraction = Math.min(
                    1,
                    Math.max(0, (bytePowerProgressFraction - segmentStart) / segmentSize),
                  )
                  return (
                    <BytePowerSegment key={segmentIndex}>
                      <BytePowerSegmentFill $fraction={fillFraction} />
                    </BytePowerSegment>
                  )
                })}
              </BytePowerSegments>
              <VisuallyHidden
                role="progressbar"
                aria-label="progress toward the next power of ten Bytes"
                aria-valuenow={bytePowerProgressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
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
                  Clock Speed: {isGlobalTickspeedActive
                    ? `${formatBonusOrMultiplier(globalTickspeedMultiplier, { precise: true })} faster ticks on every tier (Lv.${globalTickspeedLevel})`
                    : 'not yet active'}
                </li>
              )}
              {overclockEverRevealed && (
                <li>
                  Overclock: {overclockCount > 0
                    ? `Clock Speed's per-level rate is now ${formatGlobalTickspeedBonusPercent(currentGlobalTickspeedStepDisplay)}% (was 1%) from level ${overclockCount}`
                    : `not yet claimed (reach level ${formatAmount(overclockRequirement)} on ${lastTier.name})`}
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

      {/* Second-level Byte Factory tabs: Data | Upgrades (no back button). Milestones is under More.
          Upgrades gated on !isFirstRun — PP upgrades don't exist before a first Prestige. */}
      {!isFirstRun && (
        <ViewNav role="tablist" aria-label="ladder view">
          <ViewTabButton
            aria-selected={view === 'game'}
            color={view === 'game' ? 'white' : 'darkgrey'}
            onClick={() => setView('game')}
            role="tab"
            type="button"
          >
            Ladder
          </ViewTabButton>
          <ViewTabButton
            aria-label="open upgrades"
            aria-selected={view === 'upgrades'}
            color={view === 'upgrades' ? 'white' : 'darkgrey'}
            onClick={() => setView('upgrades')}
            role="tab"
            type="button"
          >
            Upgrades{showPpUpgradeAttention && <NavDot aria-label="PP upgrade available" />}
          </ViewTabButton>
        </ViewNav>
      )}

      {view === 'game' && (<>

      {globalTickspeedCardEverRevealed && (
        <GlobalTickspeedCard aria-label="global clock speed panel">
          <Disclosure onClick={collapseDisclosure}>
            <summary><h2>Clock Speed</h2></summary>
            {isGlobalTickspeedActive && (
              <MutedText>
                Lv.{globalTickspeedLevel} — {formatBonusOrMultiplier(globalTickspeedMultiplier, { precise: true })} faster ticks on every tier.
              </MutedText>
            )}
          </Disclosure>
          <Button
            aria-label={
              isGlobalTickspeedActive
                ? `Upgrade Clock Speed for ${formatBytes(globalTickspeedCost)} (currently ${formatBonusOrMultiplier(globalTickspeedMultiplier, { precise: true })} faster ticks on every tier)`
                : `Enable Clock Speed for ${formatBytes(globalTickspeedCost)}`
            }
            color={canBuyGlobalTickspeed ? '#3b82f6' : 'darkgrey'}
            disabled={!canBuyGlobalTickspeed}
            onClick={actions.buyGlobalTickspeedMultiplier}
            title="Spend Bytes to permanently speed up every tier's production ticks by another 1% at once (more frequent deliveries, not bigger ones) — each level costs another power of ten"
            type="button"
            $progress={globalTickspeedProgressPercent}
            $progressColor="#3b82f6"
            $pulse={canBuyGlobalTickspeed}
          >
            <ButtonIcon>🌐 </ButtonIcon>
            <ButtonLabel>{isGlobalTickspeedActive ? 'Upgrade' : 'Enable'} for {formatBytes(globalTickspeedCost)}</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Clock Speed progress"
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
                </TierName>
                  <OwnedText title="Owned">
                    <VisuallyHidden>Owned: </VisuallyHidden>
                    {formatAmount(owned)}
                  </OwnedText>
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
                        XP Tickspeed — unspent XP: {formatAmount(lastTierXpBalance)}
                        {' '}(next auto-consumption needs at least {formatAmount(lastTierXpMinConsumption)})
                      </li>
                    )}
                    <li>Costs {RESOURCE_SYMBOL(tier.costResourceId)}, produces {RESOURCE_SYMBOL(tier.producesResourceId)}</li>
                  </ul>
                </TierDetailsContent>
              )}
              <ProductionText>
                +{tier.producesResourceId === MONEY_ID
                  ? formatCurrency(production)
                  : tier.producesResourceId === BYTES_ID
                    ? formatBytes(production)
                    : `${formatAmount(production)} ${RESOURCE_SYMBOL(tier.producesResourceId)}`}
              </ProductionText>
              {isLastTierXpUnlocked ? (
                <UpgradeButton
                  aria-label={lastTierXpConsumeLabel}
                  variant="smart"
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
                  variant="success"
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
                variant="plain"
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

      <SpeedCardsRow>
      {speedUpEverRevealed && (
        <SpeedUpCard aria-label="speed up panel">
          <h2>Speed Up</h2>
          <SpeedUpButton
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

      {overclockEverRevealed && (
        <OverclockCard aria-label="overclock panel">
          <Disclosure onClick={collapseDisclosure}>
            <summary><h2>Overclock</h2></summary>
            {overclockCount > 0 && (
              <MutedText>
                Clock Speed's per-level rate is now {formatGlobalTickspeedBonusPercent(currentGlobalTickspeedStepDisplay)}% (was 1%) from level {overclockCount}.
              </MutedText>
            )}
          </Disclosure>
          <OverclockButton
            aria-label={`Overclock (requires ${lastTier.name} level ${overclockRequirement}) — resets Speed Up's bonus and raises Clock Speed's per-level rate to ${formatGlobalTickspeedBonusPercent(nextGlobalTickspeedStepDisplay)}%`}
            color={canOverclock ? '#fb923c' : 'darkgrey'}
            disabled={!canOverclock}
            onClick={actions.overclock}
            title={`Resets tiers (and Speed Up's bonus) and raises Clock Speed's per-level rate to ${formatGlobalTickspeedBonusPercent(nextGlobalTickspeedStepDisplay)}%`}
            type="button"
            $progress={overclockProgressPercent}
            $progressColor="#fb923c"
            $pulse={canOverclock}
          >
            <ButtonIcon>⚡ </ButtonIcon>
            <ButtonLabel>{formatGlobalTickspeedBonusPercent(nextGlobalTickspeedStepDisplay)}%/lvl{' · '}Lv.{formatAmount(lastTierLevel)}/{formatAmount(overclockRequirement)}</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Overclock progress"
              aria-valuenow={overclockProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </OverclockButton>
        </OverclockCard>
      )}
      </SpeedCardsRow>

      </>)}

      {view === 'upgrades' && !isFirstRun && (
        <UpgradesList aria-label="PP upgrades page">
          <UpgradeCategory aria-label="tier autobuyers category">
            <CategoryHeading>Tier Autobuyers</CategoryHeading>
            {allTiersFullyAutomated ? (
              <div aria-label="full smart autobuyer notice">
                <MutedText>🧠 Every tier is fully smart — nothing left to automate here.</MutedText>
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
                    {isTierTickspeedAutobuyerActive ? (
                      <UpgradeRowControls>
                        <PpUpgradeBadge
                          $color={tierTickspeedAutobuyerEnabled ? '#4ade80' : '#facc15'}
                          $dimmed={!tierTickspeedAutobuyerEnabled}
                          aria-label={tierTickspeedAutobuyerEnabled ? `${tier.name}'s tickspeed autobuyer active` : `${tier.name}'s tickspeed autobuyer paused`}
                        >
                          ⚙
                        </PpUpgradeBadge>
                        <PauseToggleButton
                          aria-pressed={tierTickspeedAutobuyerEnabled}
                          aria-label={tierTickspeedAutobuyerEnabled ? `Pause ${tier.name}'s tickspeed autobuyer` : `Resume ${tier.name}'s tickspeed autobuyer`}
                          onClick={() => actions.setTierTickspeedAutobuyerEnabled(tier.id, !tierTickspeedAutobuyerEnabled)}
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
                        aria-label={`${tier.name}'s tickspeed autobuyer unlocks at Prestige ${tierTickspeedAutobuyerMilestone}`}
                      >
                        🔒 Prestige {tierTickspeedAutobuyerMilestone}
                      </PpUpgradeBadge>
                    )}
                    <UpgradeRowControls>
                      {isAutobuyerLocked && (
                        <PpUpgradeBadge
                          $color="darkgrey"
                          $dimmed
                          aria-label={`${tier.name}'s autobuyer unlocks at Prestige ${autobuyerMilestone}`}
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
                          >
                            🤖
                          </PpUpgradeBadge>
                          <PauseToggleButton
                            aria-pressed={autobuyerEnabled}
                            aria-label={autobuyerEnabled ? `Pause ${tier.name}'s autobuyer` : `Resume ${tier.name}'s autobuyer`}
                            onClick={() => actions.setAutobuyerEnabled(tier.id, !autobuyerEnabled)}
                            type="button"
                            variant="ghost"
                          >
                            {autobuyerEnabled ? '⏸' : '▶'}
                          </PauseToggleButton>
                        </UpgradeRowControls>
                      )}
                      {!isAutobuyerLocked && (
                        isSmart ? (
                          <PpUpgradeBadge $color="#a78bfa">
                            🧠 Smart
                          </PpUpgradeBadge>
                        ) : (
                          <PpUpgradeButton
                            aria-label={`Make ${tier.name}'s autobuyer smart (buy singly until ${purchaseBlockSize} purchases, then in blocks of ${purchaseBlockSize}) for ${formatAmount(smartCost)} Prestige Point${smartCost === 1 ? '' : 's'}`}
                            color={canBuySmart ? '#a78bfa' : 'darkgrey'}
                            disabled={!canBuySmart}
                            onClick={() => actions.buySmartAutobuyer(tier.id)}
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
                    </UpgradeRowControls>
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
                    <MutedText title={`Auto-Prestige fires roughly every ${autoPrestigeIntervalSeconds}s once Bits reaches 1 Googol Bytes`}>
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
                    title="Spend Prestige Points so Prestige happens automatically once Bits reaches 1 Googol Bytes — each level makes it fire 10% sooner, at double the cost"
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

          <UpgradeCategory aria-label="prestige upgrades category">
            <CategoryHeading>Prestige</CategoryHeading>
            <UpgradeRow aria-label="double PP upgrade">
              <TierNameLabel>
                Double PP
                {doublePpLevel > 0 && ` (Lv.${doublePpLevel})`}
              </TierNameLabel>
              <MutedText>{doublePpUpgradeSummary}</MutedText>
              <PpUpgradeButton
                aria-label={`Buy Double PP level ${doublePpLevel + 1} for ${formatAmount(doublePpCost)} Prestige Points — ${doublePpLevel < 6 ? 'halves powers needed per PP' : 'doubles PP per power'}`}
                color={canBuyDoublePp ? '#fbbf24' : 'darkgrey'}
                disabled={!canBuyDoublePp}
                onClick={actions.buyPrestigeDoublePp}
                title={doublePpLevel < 6
                  ? 'Halves how many money-exponent powers are needed per Prestige Point (claimable once you reach 1 Googol Bytes)'
                  : 'Doubles how many Prestige Points each power earns (claimable once you reach 1 Googol Bytes)'}
                type="button"
                $progress={ppProgressPercent(doublePpCost)}
                $progressColor="#fbbf24"
              >
                <ButtonIcon>✦ </ButtonIcon>
                <ButtonLabel>Upgrade for {formatAmount(doublePpCost)} PP</ButtonLabel>
                <VisuallyHidden
                  role="progressbar"
                  aria-label="Double PP upgrade Prestige Point progress"
                  aria-valuenow={Math.min(prestige.points, doublePpCost)}
                  aria-valuemin={0}
                  aria-valuemax={doublePpCost}
                />
              </PpUpgradeButton>
            </UpgradeRow>
            {isUnbounded ? (
              <MutedText>
                Unbounded Prestige unlocked — production continues past 1 Googol Bytes; Prestige when you choose to claim accumulated PP.
              </MutedText>
            ) : (
              <MutedText>
                Unlocks at Prestige {PRESTIGE_UNBOUNDED_MIN_COUNT}: earn past 1 Googol Bytes without freezing; Prestige voluntarily to claim PP.
              </MutedText>
            )}
          </UpgradeCategory>
        </UpgradesList>
      )}
    </RootDiv>
  )
}

export default MainPage
