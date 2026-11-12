import { APP_NAV_BOTTOM_PAD } from 'components/AppNav'
import { boostGlow, getComputeBoostDescription, isFactoryTierBoosted } from 'components/BoostBadge'
import BoostTimerBar from 'components/BoostTimerBar'
import ChallengeBanner from 'components/ChallengeBanner'
import { formatChallengeGoal } from 'game/challengeUi'
import Button, { ButtonContent, ButtonIcon, ButtonLabel, progressFill, VisuallyHidden } from 'components/Button'
import Money from 'components/Money'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, formatBytes, formatCurrency, formatMoneyBalance, getEffectiveTierTickSpeedSeconds, getGlobalTickspeedMultiplierCost, getGlobalTickspeedMultiplierCostBits, getGlobalTickspeedProductionMultiplier, isGlobalTickspeedAffordable, getLastTierXpTickspeedMinConsumption, getLastTierXpTickspeedMultiplier, getNextBytePowerProgressFraction, getOverclockLevel, getOverclockMultiplier, getOverclockRequirement, getPrestigePointsAwarded, getPurgeGoalBits, getActiveChallenge, getChallengeTier, isTierTickspeedBlockedByChallenge, getEffectiveLastTier, isChallengeCompleted, getPlaytimeProductionMultiplier, getPrestigeProductionMultiplier, isPrestigeSpeedBonusUnlocked, getPurgePercent, getPurchaseBlockSize, getPurchaseMilestoneMultiplier, getScaleUpRequirement, getScaleUpTargetTier, getTierScaleUpMultiplier, getTierTickspeedRequirement, getTierTickspeedSpend, getTickspeedProductionMultiplier, getTierAffordableQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, getTierMaxLevelsPreview, isBuyMaxUnlocked, isGlobalTickspeedMultiplierUnlocked, isLastTierTickspeedXpUnlocked, isProductionFrozen, isTierUnlocked, isOverflowModeUnlocked } from 'game/engine'
import { BITS_PER_BYTE, BYTES_ID, getTierBaseTickSpeedSeconds, GLOBAL_TICKSPEED_PRODUCTION_STEP, MONEY_ID, OVERCLOCK_MULTIPLIER_STEP, PLAYTIME_BONUS_UNLOCK_COST, PRESTIGE_SPEED_BONUS_UNLOCK_PURGES, PURGE_THRESHOLD, PURCHASE_MILESTONE_MULTIPLIER_BASE, RESOURCE_SYMBOL, TIER_DEFINITIONS } from 'game/layers'
import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes, useTheme } from 'styled-components'

// index.html sets viewport-fit=cover so the installed-on-homescreen iOS app (black-translucent
// status bar, see docs/PWA_REFERENCE.md) draws edge-to-edge; without this padding the bottom-most
// tier row's Buy button ends up under the home-indicator safe area, where iOS won't let the page
// scroll far enough for it to become reachable at all (not just visually clipped).
// Fixed height of the pinned prestige-progress bar (see PurgeProgressBar below) — single-line,
// never wraps, so unlike TopPurgeBarSpacer this doesn't need a live ResizeObserver measurement.
// Reused by RootDiv's own bottom padding so page content never scrolls out from under the bar.
const PURGE_PROGRESS_BAR_HEIGHT = '2.5rem'

const RootDiv = styled.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom) + ${PURGE_PROGRESS_BAR_HEIGHT});
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
// TierNameTrigger, in the 'name' area) is the only trigger (no whole-tile click) — a React-controlled
// disclosure rather than native <details>/<summary>, see openTierDetailIds in MainPage for why.
// There used to be a dedicated 'autobuyer' grid row for the per-tier
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
  transition: border-color ${props => props.theme.motion.duration.base} ${props => props.theme.motion.easing.standard};
  animation: ${props => (props.$animateReveal ? css`${reveal} 0.4s ease-out` : 'none')};
  ${props => props.$boosted && boostGlow}

  &:hover {
    border-color: ${props => props.theme.color.borderStrong};
    border-left-color: ${props => props.$accent};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.$accent};
    outline-offset: 2px;
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

// Feature cards share one shape: neutral border, a 3px left accent stripe (same treatment as the
// tier rows' stripe), compact padding and a 1rem heading — previously each card had its own
// full-border hue and Clock Speed had a much larger heading/padding than its siblings.
const featureCard = accent => css`
  border-left: 3px solid ${accent};
  gap: 0.4rem;
  padding: 0.6rem 0.75rem;

  h2 {
    font-family: ${props => props.theme.font.display};
    font-size: 1rem;
    line-height: 1.2;
    margin: 0;
  }
`

// What a feature card's action multiplies, shown beside the card's name (the button itself carries
// only the cost/progress).
const CardEffect = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`

// Card name on the left, its effect (CardEffect) right-justified.
const CardTitleGroup = styled.div`
  align-items: baseline;
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
  max-width: 100%;
  min-width: 0;

  h2 {
    white-space: nowrap;
  }
`

const ScaleUpCard = styled(StatCard)`
  ${featureCard('#0e7490')}
`

// Matches the tier rows' own Buy/tickspeed button font size (see BuyButton/UpgradeButton) rather
// than the larger default Button size every other standalone card button uses — keeps this
// button visually consistent with the tier list just above it.
const ScaleUpButton = styled(Button)`
  font-size: 0.82em;
  padding: 0.35em 0.6em;

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

const GlobalTickspeedCard = styled(StatCard)`
  ${featureCard('#1d4ed8')}
`

const OverclockCard = styled(StatCard)`
  ${featureCard('#c2410c')}
`

// Matches ScaleUpButton's own font-size override, same rationale (stays visually consistent with
// the tier list's Buy/tickspeed buttons rather than the larger standalone-card default).
const OverclockButton = styled(Button)`
  font-size: 0.82em;
  padding: 0.35em 0.6em;

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

// Every feature card (Clock Speed above the tier list; Restage, Scale Up, Overclock below it) gets its
// own full-width SpeedCardsRow, so their title + effect chips line up consistently. Supersedes the
// earlier side-by-side pairs — see docs/DESIGN_HISTORY.md.
const SpeedCardsRow = styled.div`
  display: flex;
  gap: 0.4rem;

  > * {
    flex: 1 1 0;
    min-width: 0;
  }
`

// Shared by the Money and Purge Point balance displays — the only top-of-page blocks besides
// Header that are centered rather than left-aligned. $actionable (used only by the PP display,
// once Prestige is available) makes the whole card double as the Prestige button, rather than the
// "don't combine those on a passive tile" call made for the offline notice card.
const CenteredCard = styled(StatCard)`
  align-items: center;
  text-align: center;

  ${props => props.$actionable && css`
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

`

// Expand/collapse trigger for the global-multipliers breakdown: just the balance figure, not the
// whole card (app-wide convention: only the name/label of a disclosure toggles it).
const MoneyHeroToggle = styled.div`
  cursor: pointer;
  border-radius: ${props => props.theme.radius.sm};

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

// Muted/accent text scoped to this HUD region only — a deliberate fork of the app-wide
// MutedText (still hardcoded, still used by TierList/GlobalTickspeedCard) rather
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

// Small exact-Bits readout under the hero balance (shown once the hero switches to Bytes,
// so it isn't a duplicate of the headline). Token-driven muted color rather than opacity, so
// the pair stays on the same AA audit as other HUD muted text (textMuted on surfaceRaised).
// Not role=status: Bits change every tick, and status is a live region.
const BitsBalance = styled(HudMutedText)`
  text-align: center;
  font-size: ${props => props.theme.type.scale.sm.size};
  line-height: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.1rem;
  pointer-events: none;
`

// Wraps the hero toggle so BitsBalance can sit absolutely in the gap that already separates the
// hero from the segment bar below it — the Bits line adds no layout height.
const MoneyHeroGroup = styled.div`
  position: relative;
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

// Prestige progress, pinned just above AppNav (position: fixed, bottom: APP_NAV_BOTTOM_PAD) so
// it's always visible regardless of scroll position, rather than scrolling away with the rest of
// the page content near the top. RootDiv's own bottom padding reserves PURGE_PROGRESS_BAR_HEIGHT
// so page content never ends up hidden underneath it.
const PurgeProgressBar = styled.div`
  background: ${props => props.theme.color.surfaceRaised};
  border-top: 1px solid ${props => props.theme.color.border};
  bottom: ${APP_NAV_BOTTOM_PAD};
  left: 0;
  padding: 0.5rem calc(0.75rem + env(safe-area-inset-left)) 0.5rem calc(0.75rem + env(safe-area-inset-right));
  position: fixed;
  right: 0;
  z-index: 39;
`

// The "N% to Prestige" label renders INSIDE this track (PurgeProgressLabel below), via the
// same low-alpha progressFill gradient the Buy/Upgrade buttons use for their own cost-progress
// fills (see components/Button) — already contrast-validated for `theme.color.text` on top of it
// (see tokens.contrast.test.js), rather than a separate label rendered below a solid fill bar.
const PurgeProgressTrack = styled.div`
  ${props => progressFill({ $progress: props.$percent, $progressColor: props.theme.color.accent, theme: props.theme })}
  align-items: center;
  border-radius: ${props => props.theme.radius.pill};
  display: flex;
  height: 1.5rem;
  justify-content: center;
  margin: 0 auto;
  max-width: min(880px, calc(100vw - 2rem));
  width: 100%;
`

const PurgeProgressLabel = styled.span`
  color: ${props => props.theme.color.text};
  font-size: ${props => props.theme.type.scale.xs.size};
  font-weight: 600;
`


// Purge Points as a secondary header line beneath the money hero — same CenteredCard base
// (so it keeps $actionable's Prestige-button behavior once canPurge), just flattened (no
// shadow, tighter padding) so it visually reads as subordinate to the money hero above it rather
// than a second card of equal visual weight.
const PpHeaderCard = styled(CenteredCard)`
  box-shadow: none;
  padding: 0.5rem 1rem;
`

// The Money balance card's click-to-expand breakdown of every global (not per-tier) production
// multiplier currently in effect — Prestige's passive speed bonus, Scale Up, and the Global
// Tickspeed Multiplier (see "The global tickspeed multiplier"/"Scale Up"/"Purge Points,
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
// TopPurgeBar is showing ($belowBar), the stick position drops below it by $belowBarHeight
// (measured live, see topPurgeBarHeight below) instead of underlapping it.
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

// Mandatory full-screen takeover shown only the very first time Money reaches PURGE_THRESHOLD (before the
// player has ever purged) — covers the whole viewport so the frozen, disabled page underneath
// is never visible/reachable; there's deliberately no close/dismiss control (see PurgeButton
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

// From the 2nd prestige onward, reaching PURGE_THRESHOLD again shows a compact banner pinned to the top
// of the viewport instead of the full-screen takeover — the player already knows what Prestige
// does, so a persistent-but-unobtrusive reminder is enough.
const TopPurgeBar = styled.div`
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

// Reserves space at the top of the page so TopPurgeBar (position: fixed) never overlaps the
// Header underneath it. $height is measured live from the bar itself (see topPurgeBarHeight)
// rather than a fixed constant — TopPurgeBar's flex-wrap lets its content wrap to two lines on
// narrow viewports (the reminder sentence is long enough to wrap well before 40rem), and a
// hardcoded single-line height would silently let the taller bar overlap the Header below it.
const TopPurgeBarSpacer = styled.div`
  height: ${props => props.$height}px;
`

// Prestige-surface copy only — forked from the app-wide MutedText (still hardcoded elsewhere) so
// this region's AA audit stays meaningful without migrating TierList/ScaleUpCard in #138's scope.
const PurgeMutedText = styled.p`
  color: ${props => props.theme.color.textMuted};
  font-size: ${props => props.theme.type.scale.sm.size};
  line-height: ${props => props.theme.type.scale.sm.lineHeight};
  margin: 0;
`

const MutedText = styled.p`
  color: ${props => props.theme.color.textMuted};
  margin: 0;
`


// Occupies the top line's first track. Used to also share this line with a compact tickspeed
// bonus badge and an autobuyer status icon — both removed to keep the row down to just the tier
// name plus live production/owned figures and the two action buttons; the tickspeed bonus is
// still visible in the row's own Details disclosure below, and autobuyer status still shows on
// the Firmware page.
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

// The only expand/collapse trigger for a tier row's details (role="button" set at the call site).
const TierNameLabel = styled.span`
  cursor: pointer;
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${props => props.theme.radius.sm};
  }
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
    max-width: 100%;
    border-radius: ${props => props.theme.radius.sm};
  }

  summary:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary h2 {
    display: inline;
    margin: 0;
  }

  /* A summary holding a CardTitleGroup spans the card so its effect can sit at the right edge; only
     the name itself stays clickable (the empty gap must not toggle the disclosure). */
  summary:has(${CardTitleGroup}) {
    pointer-events: none;
    width: 100%;
  }

  summary:has(${CardTitleGroup}) h2 {
    pointer-events: auto;
  }

  p {
    margin-top: 0.3rem;
  }
`

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

const formatCost = (amount, resourceId) =>
  resourceId === MONEY_ID
    ? formatCurrency(amount)
    : resourceId === BYTES_ID
      ? formatBytes(amount)
      : `${formatAmount(amount)} ${RESOURCE_SYMBOL(resourceId)}`

// Live "how close am I" fill percent for a progress meter (PP/tickspeed/Scale Up buttons, XP
// consumption) — how much of `denominator` the current `numerator` already covers, capped at 100.
const progressPercent = (numerator, denominator) => Math.min(100, Math.round((numerator / denominator) * 100))

// "1.1" / "1.21" / "1" — rounds to 2 decimal places and trims a trailing ".00"/trailing zero, used
// for multiplier displays (Scale Up's next multiplier, the Purge-count production speed bonus, the tier row's
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

// A bonus multiplier reads as a percentage below +100% ("+21%"), and as a Scale-Up-style "Nx"
// multiplier at/above it ("2x", "5.5x") — a percentage gets unwieldy once it doubles the baseline,
// and "Nx" is already this app's convention for large stacking bonuses (Scale Up's own ×N). Pass
// `precise: true` to use the global tickspeed multiplier's fractional-percent formatting for the
// below-100% case instead of the whole-number one.
const formatBonusOrMultiplier = (multiplier, { precise = false } = {}) =>
  multiplier >= 2
    ? `${formatRate(multiplier)}x`
    : `+${precise ? formatGlobalTickspeedBonusPercent(multiplier) : formatBonusPercent(multiplier)}%`

const MainPage = ({ game }) => {
  const { actions, claimOfflineAdReward, dismissOfflineProgress, offlineProgress, state } = game
  const theme = useTheme()
  const { purge } = state
  const canPurge = state.resources[MONEY_ID] >= getPurgeGoalBits(state)
  const isUnbounded = isOverflowModeUnlocked(state)
  const doublePpLevel = state.prestigeDoublePpLevel ?? 0
  // Passive Purge-count production-speed bonus: flat ×1 until 10 Purges (see engine.js).
  const prestigeBonus = getPrestigeProductionMultiplier(purge.count)
  const prestigeBonusUnlocked = isPrestigeSpeedBonusUnlocked(state)
  const prestigePointsPreview = getPrestigePointsAwarded(state.resources[MONEY_ID], doublePpLevel)
  const purgeProgressPercent = getPurgePercent(state.resources[MONEY_ID], getPurgeGoalBits(state))
  const bytePowerProgressFraction = getNextBytePowerProgressFraction(state.resources[MONEY_ID])
  const bytePowerProgressPercent = Math.round(bytePowerProgressFraction * 100)
  const moneyBits = state.resources[MONEY_ID]
  const moneyHeroText = formatMoneyBalance(moneyBits)
  const moneyBitsText = formatCurrency(moneyBits)
  // What a Prestige would award — shown on the Prestige button itself (Buy-button style: the
  // effect lives on the control, not in a separate text line). Below Googol the formula reads 0,
  // but the award on reaching it is always at least 1, so that's the effect worth advertising.
  // A repeat challenge completion resets the cycle but awards no PP (engine: purgeGame).
  const isRepeatChallengeCompletion = Boolean(getActiveChallenge(state)) && isChallengeCompleted(state, getActiveChallenge(state).id)
  const purgeGoalText = formatChallengeGoal(getPurgeGoalBits(state))
  const purgeAwardPreview = isRepeatChallengeCompletion ? 0 : Math.max(1, prestigePointsPreview)
  const purgeLabel = isUnbounded && canPurge
    ? 'Purge (optional — claim accumulated PP)'
    : `Purge (requires ${purgeGoalText})`
  const purgeAriaLabel = isRepeatChallengeCompletion
    ? `${purgeLabel} — completes the challenge repeat, awards no Purge Points`
    : `${purgeLabel} — awards +${formatAmount(purgeAwardPreview)} Purge Point${purgeAwardPreview === 1 ? '' : 's'}`
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
  // expand/collapse and keyboard behavior manually (see TierNameLabel below) instead of getting
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
  // one observer per row, since rows come and go as tiers unlock/lock across Prestige/Scale Up.
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

  // All production and purchasing freezes the instant Money reaches PURGE_THRESHOLD (see
  // isProductionFrozen in engine.js) — Prestige is the only remaining action. The first time
  // this ever happens (before the player has purged even once) it's a mandatory full-screen
  // takeover; every time after that, it's a compact banner pinned to the top of the page instead,
  // since the player already knows what Prestige does.
  const isFrozen = isProductionFrozen(state)
  const activeChallenge = getActiveChallenge(state)
  const challengeDisabled = effect => activeChallenge?.effect === effect
  const challengeNote = activeChallenge ? ` — disabled by challenge ${activeChallenge.id} ${activeChallenge.codename}` : ''
  const isFirstRun = purge.count === 0
  const buyMaxActive = Boolean(game.buyMaxMode) && isBuyMaxUnlocked(state)
  // The purchase block size every tier's current level currently requires to complete — a single
  // global value (see getPurchaseBlockSize in engine.js), starting at DEFAULT_PURCHASE_BLOCK_SIZE
  // and growing over the course of a run; computed once here rather than per-tier below, since
  // every tier shares the same value.
  const purchaseBlockSize = getPurchaseBlockSize(state)
  const showFullScreenPrompt = isFrozen && isFirstRun
  const showTopPurgeBar = isFrozen && !isFirstRun
  const lastTier = getEffectiveLastTier(state)
  const lastTierLevel = state.purchaseLevels?.[lastTier.id] ?? 1
  const lastTierUnlocked = isTierUnlocked(state)(lastTier)

  // Scale Up requires 3 completed levels on each tier's first claim, then final-tier requirements
  // advance by 3 after all tiers have received one.
  // counting every claim this cycle (see getScaleUpRequirement in engine.js) — recording the
  // successor only when the claim succeeds. Recorded tiers re-reveal at 2 completed predecessor
  // levels after a reset (see isTierUnlocked in engine.js).
  const scaleUpTargetTier = getScaleUpTargetTier(state)
  const scaleUpTargetTierLevel = state.purchaseLevels?.[scaleUpTargetTier.id] ?? 1
  const scaleUpCount = state.scaleUpCount ?? 0
  const scaleUpRequirement = getScaleUpRequirement(state)
  // Purchase levels are player-facing counts of completed levels, so display the engine's
  // one-based current-level cursor as a zero-based completed-level count. Scale Up's and
  // Overclock's requirements are already expressed in completed levels — no -1 adjustment there.
  const lastTierLevelDisplay = Math.max(0, lastTierLevel - 1)
  const scaleUpTargetTierLevelDisplay = Math.max(0, scaleUpTargetTierLevel - 1)
  const scaleUpRequirementDisplay = scaleUpRequirement
  const scaleUpProgressPercent = progressPercent(scaleUpTargetTierLevelDisplay, scaleUpRequirementDisplay)
  const canScaleUp = !isFrozen && scaleUpTargetTierLevelDisplay >= scaleUpRequirement
  // The successor tier a successful claim records/reveals (targetIndex + 1) — "Unlock TB" shows
  // when the claim would reveal the Terabytes tier (see scaleUpGame in engine.js).
  const scaleUpSuccessorTier = TIER_DEFINITIONS[TIER_DEFINITIONS.indexOf(scaleUpTargetTier) + 1] ?? null
  const scaleUpUnlocksTB = scaleUpSuccessorTier?.symbol === 'TB'

  // Overclock: a second, rarer soft-reset than Scale Up, claimable once the last tier's own
  // COMPLETED-level count reaches the next Overclock requirement — 5 initially (a minimum only;
  // the player may keep climbing first), then three more than the completed-level count the
  // previous claim was actually taken at (see getOverclockRequirement/overclockGame in engine.js).
  // Unlike Scale Up, claiming it also
  // wipes Scale Up's per-tier bonuses back to ×1 (scaleUpTierCounts resets) in exchange for
  // permanently multiplying BOTH the (Money-funded) global Tickspeed
  // upgrade's single per-level step by getOverclockMultiplier(overclockLevel)
  // (×1.1 per Overclock level) — folded into that existing track's own compounding rate,
  // not a separate
  // multiplier stacked alongside it, so it has no effect until at least one Tickspeed level is
  // bought. A claim sets the Overclock level to the last tier's current completed-level count
  // (it replaces the previous level — nothing is banked).
  // Gated on the last tier having ever
  // been unlocked (unlike Scale Up above, which is always shown), so it doesn't clutter the page
  // before tier10 first exists — but once shown, stays shown (in a disabled state once not
  // immediately actionable) rather than disappearing again the moment a successful Overclock claim
  // wipes tier10 back below the unlock threshold.
  const [overclockEverRevealed, setOverclockEverRevealed] = useState(lastTierUnlocked)
  useEffect(() => {
    if (lastTierUnlocked) setOverclockEverRevealed(true)
  }, [lastTierUnlocked])
  const overclockLevel = getOverclockLevel(state) ?? 0
  const overclockRequirement = getOverclockRequirement(state)
  const overclockRequirementDisplay = overclockRequirement
  // The current/next per-level step the global Tickspeed upgrade's own REGULAR levels compound at,
  // expressed as a "multiplier" (1 + step) purely so formatGlobalTickspeedBonusPercent's existing
  // (multiplier - 1) * 100 formatting can be reused directly — these are never applied as
  // standalone multipliers anywhere, only fed into getGlobalTickspeedProductionMultiplier below.
  const currentGlobalTickspeedStepDisplay = 1 + GLOBAL_TICKSPEED_PRODUCTION_STEP * getOverclockMultiplier(overclockLevel)
  // Each completed final-tier level multiplies Clock Speed's per-level rate by this (a constant).
  const overclockLevelEffectDisplay = 1 + OVERCLOCK_MULTIPLIER_STEP
  const overclockProgressPercent = progressPercent(lastTierLevelDisplay, overclockRequirementDisplay)
  const canOverclock = !isFrozen && !challengeDisabled('overclockDisabled') && lastTierLevelDisplay >= overclockRequirement

  // PP-funded unlocks/upgrades/toggles live on the Firmware page (pages/PerksPage).

  // The global tickspeed multiplier is a single global (not per-tier) leveled upgrade, mirroring
  // Auto-Prestige's null/level pattern — each REGULAR level speeds up *every* tier's delivery
  // frequency by another getGlobalTickspeedProductionMultiplier's own regular step (1% by default,
  // permanently raised by Overclock — see above), not the amount delivered (see
  // getGlobalTickspeedProductionMultiplier/buyGlobalTickspeedMultiplier). Unlike every other
  // automation upgrade on this page, it's Bytes-funded (not PP) and lives on the Factory view instead
  // of the Firmware page — see isGlobalTickspeedMultiplierUnlocked in engine.js: it only becomes
  // purchasable once at least 1 of the second tier is owned, so a player can't spend their Bytes
  // on it before Kilobytes are producing any. The level itself resets to not-yet-bought on both
  // Up (see purgeGame/scaleUpGame in engine.js), same as tier02's owned count, so re-unlocking
  // always requires owning tier02 again after either reset. The Overclock level, by contrast, is NOT
  // reset by Scale Up — its boost to the per-level step survives across a re-unlock within the
  // same Prestige cycle.
  const globalTickspeedLevel = state.globalTickspeedMultiplier ?? null
  const isGlobalTickspeedActive = globalTickspeedLevel !== null
  const globalTickspeedMultiplier = getGlobalTickspeedProductionMultiplier(globalTickspeedLevel, overclockLevel)
  const globalTickspeedCost = getGlobalTickspeedMultiplierCost(globalTickspeedLevel ?? 0)
  const globalTickspeedUnlocked = isGlobalTickspeedMultiplierUnlocked(state)
  const canBuyGlobalTickspeed = !isFrozen && !challengeDisabled('clockSpeedDisabled') && globalTickspeedUnlocked && isGlobalTickspeedAffordable(state)
  // The last tier's XP-funded tickspeed — a separate upgrade shown left of Scale Up once the last tier
  // has been a Scale Up target this cycle (isLastTierTickspeedXpUnlocked). Always spends the entire
  // XP balance in one action, since every consumption resets every other tier's owned quantity and
  // Bits; disabled while the last tier owns nothing (nothing to speed up — see
  // consumeXpForLastTierTickspeed's matching guard). The compounding bonus of spending N XP is
  // getLastTierXpTickspeedMultiplier(N) regardless of XP already consumed.
  const isLastTierXpUnlocked = isLastTierTickspeedXpUnlocked(state)
  const lastTierOwned = state.owned[lastTier.id] ?? 0
  const lastTierXpConsumed = state.lastTierXpConsumed ?? 0
  const lastTierXpBalance = Math.floor(state.purge.xp ?? 0)
  const lastTierXpMinConsumption = getLastTierXpTickspeedMinConsumption(lastTierXpConsumed)
  const lastTierXpProgressPercent = progressPercent(lastTierXpBalance, lastTierXpMinConsumption)
  const canConsumeLastTierXp = isLastTierXpUnlocked && !isFrozen && !challengeDisabled('restageDisabled') && lastTierOwned > 0 && lastTierXpBalance >= lastTierXpMinConsumption
  const lastTierXpConsumeBonusLabel = formatBonusOrMultiplier(getLastTierXpTickspeedMultiplier(lastTierXpBalance))
  const handleConsumeLastTierXp = () => {
    if (!canConsumeLastTierXp) return
    if (window.confirm(`Restage: consume ${formatAmount(lastTierXpBalance)} XP for ${lastTierXpConsumeBonusLabel} faster ${lastTier.name} ticks? This resets every other tier's owned quantity (not their level) and your Bits balance back to 0.`)) {
      actions.consumeXpForLastTierTickspeed(lastTierXpBalance)
    }
  }
  const globalTickspeedProgressPercent = progressPercent(state.resources[MONEY_ID] ?? 0, getGlobalTickspeedMultiplierCostBits(globalTickspeedLevel ?? 0))
  // Progressive disclosure, same pattern as overclockEverRevealed above:
  // once the card has ever been relevant (tier02 owned, or the multiplier already active from a
  // prior run), it stays visible — in a disabled state — rather than disappearing again the
  // moment a Prestige/Scale Up resets tier02's owned count back to 0.
  const [globalTickspeedCardEverRevealed, setGlobalTickspeedCardEverRevealed] = useState(globalTickspeedUnlocked)
  useEffect(() => {
    if (globalTickspeedUnlocked) setGlobalTickspeedCardEverRevealed(true)
  }, [globalTickspeedUnlocked])


  // Auto-focus the full-screen prompt's Prestige button when it appears — it's the only
  // interactive element on screen while it's showing (no close/dismiss control by design).
  const fullScreenPurgeButtonRef = useRef(null)
  useEffect(() => {
    if (showFullScreenPrompt) fullScreenPurgeButtonRef.current?.focus()
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

  // TopPurgeBar's own rendered height, measured live rather than assumed — its flex-wrap lets
  // the reminder sentence wrap to two lines on narrow viewports, and both TopPurgeBarSpacer
  // (below) and StickyBalances' stuck offset need the bar's *actual* height to avoid the fixed bar
  // overlapping the Header/balances underneath it. 60 (3.75rem at the default 16px root) is the
  // single-line fallback used before this was measured, kept as the initial/no-ResizeObserver
  // value so behavior is unchanged in environments without ResizeObserver (e.g. jsdom in tests).
  const topPurgeBarRef = useRef(null)
  const [topPurgeBarHeight, setTopPurgeBarHeight] = useState(60)
  useEffect(() => {
    const bar = topPurgeBarRef.current
    if (!bar || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => setTopPurgeBarHeight(bar.offsetHeight))
    observer.observe(bar)
    return () => observer.disconnect()
  }, [showTopPurgeBar])

  if (showFullScreenPrompt) {
    return (
      <FullScreenOverlay role="dialog" aria-modal="true" aria-label="Purge required">
        <FullScreenCard>
          <h2>💾 Disk full</h2>
          <PurgeMutedText>
            You've reached {formatCurrency(state.resources[MONEY_ID])} — 1 Googol Bytes. All
            production has stopped.
          </PurgeMutedText>
          <ul>
            <li>Resets your resources, owned tiers, and purchases</li>
            <li>
              Awards {formatAmount(prestigePointsPreview)} Purge Point
              {prestigePointsPreview === 1 ? '' : 's'} — spend them on the Firmware page for
              automation and production bonuses
            </li>
            <li>Keeps your unlocked autobuyers and Purge Points</li>
          </ul>
          <Button
            ref={fullScreenPurgeButtonRef}
            aria-label="Purge now"
            variant="prestige"
            onClick={actions.purge}
            title="Awards Purge Points and resets your resources"
            type="button"
            $pulse
          >
            <ButtonContent>✦ Purge Now</ButtonContent>
          </Button>
        </FullScreenCard>
      </FullScreenOverlay>
    )
  }

  return (
    <RootDiv>
      <ChallengeBanner onExit={actions.exitChallenge} state={state} />
      {showTopPurgeBar && (
        <>
          <TopPurgeBar ref={topPurgeBarRef} aria-label="purge available banner">
            <PurgeMutedText>{purgeGoalText} reached — production has stopped.</PurgeMutedText>
            <Button
              aria-label={purgeAriaLabel}
              variant="prestige"
              onClick={actions.purge}
              title="Awards Purge Points and resets your resources"
              type="button"
              $pulse
            >
              <ButtonIcon>✦ </ButtonIcon>
              <ButtonLabel>{isRepeatChallengeCompletion ? 'Complete challenge' : `Purge +${formatAmount(purgeAwardPreview)} PP`}</ButtonLabel>
            </Button>
          </TopPurgeBar>
          <TopPurgeBarSpacer $height={topPurgeBarHeight} />
        </>
      )}

      <PurgeProgressBar aria-label="purge progress">
        <PurgeProgressTrack $percent={purgeProgressPercent}>
          <VisuallyHidden
            role="progressbar"
            aria-label={`progress toward ${purgeGoalText}, when Purge becomes available`}
            aria-valuenow={purgeProgressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <PurgeProgressLabel>
            {`${purgeProgressPercent}% to Purge`}
          </PurgeProgressLabel>
        </PurgeProgressTrack>
      </PurgeProgressBar>

      <Header>
        <h1>Byte Factory</h1>
      </Header>

      <BoostTimerBar actions={actions} state={state} />

      <OfflineProgressNotice claimOfflineAdReward={claimOfflineAdReward} dismissOfflineProgress={dismissOfflineProgress} offlineProgress={offlineProgress} />

      <BalancesSentinel ref={balancesSentinelRef} aria-hidden="true" />
      <StickyBalances
        $compressed={balancesCompressed}
        $belowBar={showTopPurgeBar}
        $belowBarHeight={topPurgeBarHeight}
      >
        <CenteredCard $raised>
          <MoneyHeroGroup>
          <MoneyHeroToggle
            aria-controls="global-multipliers-details"
            aria-expanded={showGlobalMultipliers}
            aria-label="money display"
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
            <MoneyHero>{moneyHeroText}</MoneyHero>
          </MoneyHeroToggle>
          {!balancesCompressed && moneyHeroText !== moneyBitsText && (
            <BitsBalance aria-label={`balance in bits: ${moneyBitsText}`}>
              {moneyBitsText}
            </BitsBalance>
          )}
          </MoneyHeroGroup>
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
                  Playtime bonus: {state.playtimeBonusUnlocked
                    ? `${formatBonusOrMultiplier(getPlaytimeProductionMultiplier(state))} production speed from ${formatAmount(Math.floor((state.activePlaySeconds ?? 0) / 3600))}h active play`
                    : `not yet unlocked (${formatAmount(PLAYTIME_BONUS_UNLOCK_COST)} PP on Firmware → Prestige)`}
                </li>
              )}
              {!isFirstRun && (
                <li>
                  Prestige speed bonus: {prestigeBonusUnlocked
                    ? `${formatBonusOrMultiplier(prestigeBonus)} production speed from ${formatAmount(purge.count)} Purges`
                    : `unlocks at ${PRESTIGE_SPEED_BONUS_UNLOCK_PURGES} Purges (${formatAmount(purge.count)} so far)`}
                </li>
              )}
              <li>
                Scale Up: {scaleUpCount > 0
                  ? `${scaleUpCount} activation${scaleUpCount === 1 ? '' : 's'}; multiplier varies by tier`
                  : `not yet activated (reach ${formatAmount(scaleUpRequirementDisplay)} completed levels on ${scaleUpTargetTier.name})`}
              </li>
              {globalTickspeedCardEverRevealed && (
                <li>
                  Clock Speed: {isGlobalTickspeedActive
                    ? `${formatBonusOrMultiplier(globalTickspeedMultiplier, { precise: true })} faster ticks on every tier`
                    : 'not yet active'}
                </li>
              )}
              {overclockEverRevealed && (
                <li>
                  Overclock: {overclockLevel > 0
                    ? `Clock Speed's per-level rate is now ${formatGlobalTickspeedBonusPercent(currentGlobalTickspeedStepDisplay)}% (was 1%)`
                    : `not yet claimed (reach ${formatAmount(overclockRequirementDisplay)} completed levels on ${lastTier.name})`}
                </li>
              )}
            </GlobalMultipliersList>
          )}
        </CenteredCard>

        {!isFirstRun && (
          <PpHeaderCard
            aria-label="purge points display"
            $actionable={canPurge}
            onClick={canPurge ? actions.purge : undefined}
            onKeyDown={event => {
              if (!canPurge || (event.key !== 'Enter' && event.key !== ' ')) return
              event.preventDefault()
              actions.purge()
            }}
            role={canPurge ? 'button' : undefined}
            tabIndex={canPurge ? 0 : undefined}
            title={canPurge ? 'Awards Purge Points and resets your resources' : undefined}
          >
            <HudMutedText>
              <HudGoldText>{formatAmount(purge.points)} PP</HudGoldText>
              {prestigeBonusUnlocked && ` · ${formatBonusOrMultiplier(prestigeBonus)} production speed`}
            </HudMutedText>
          </PpHeaderCard>
        )}
      </StickyBalances>


      {globalTickspeedCardEverRevealed && (
      <SpeedCardsRow>
        <GlobalTickspeedCard aria-label="global clock speed panel">
          <Disclosure>
            <summary>
              <CardTitleGroup>
                <h2>Clock Speed</h2>
                <CardEffect
                  title="Each Clock Speed level makes every tier's production ticks faster by this factor (Overclock raises that step; the live rate is on Overclock's disclosure)"
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                >
                  🏭 +{formatRate(GLOBAL_TICKSPEED_PRODUCTION_STEP * 100)}%/lvl
                </CardEffect>
              </CardTitleGroup>
            </summary>
            <MutedText>
              {isGlobalTickspeedActive
                ? `${formatBonusOrMultiplier(globalTickspeedMultiplier, { precise: true })} faster ticks on every tier.`
                : 'Not active yet — spend Bytes to make every tier\'s production ticks faster, one level at a time.'}
            </MutedText>
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
            title={`Spend Bytes to make every tier's production ticks faster (more frequent deliveries, not bigger ones) — each level costs the next power of ten${challengeDisabled('clockSpeedDisabled') ? challengeNote : ''}`}
            type="button"
            $progress={globalTickspeedProgressPercent}
            $progressColor="#3b82f6"
            $pulse={canBuyGlobalTickspeed}
          >
            <ButtonIcon>🌐 </ButtonIcon>
            <ButtonLabel>{formatBytes(globalTickspeedCost)}</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Clock Speed progress"
              aria-valuenow={globalTickspeedProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Button>
        </GlobalTickspeedCard>
      </SpeedCardsRow>
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
          // from after the fact. The completed-level count appears in accessible/detail text,
          // while the compact Buy button shows cost-block progress.
          const tierLevel = state.purchaseLevels?.[tier.id] ?? 1
          const completedLevels = Math.max(0, tierLevel - 1)
          const doneInBlock = state.purchaseLevelProgress?.[tier.id] ?? 0
          // Manual Buy always grabs as many units as are currently affordable, up to the current
          // level's cost block boundary (the former ×1/×10 "Bulk" toggle's default, now the only
          // behavior — see useIncrementalGame's BUY_QUANTITY).
          // F4 Premium Tier: price the tier as the engine will charge it.
          const pricedTier = getChallengeTier(state, tier.id) ?? tier
          const affordableQuantity = getTierAffordableQuantity(pricedTier, tierLevel, purchaseBlockSize, doneInBlock, costResource, Number.MAX_SAFE_INTEGER)
          const unitCost = getTierQuantityCost(pricedTier, tierLevel, purchaseBlockSize, doneInBlock, 1)
          const displayCost = affordableQuantity > 0 ? getTierQuantityCost(pricedTier, tierLevel, purchaseBlockSize, doneInBlock, affordableQuantity) : unitCost
          const canAfford = affordableQuantity > 0 && !isFrozen
          const donePercent = (doneInBlock / purchaseBlockSize) * 100
          const availablePercent = (affordableQuantity / purchaseBlockSize) * 100
          // The tier's own Money-funded tickspeed level — enabled by default (no autobuyer unlock
          // or PP prerequisite at all, see tickspeedLevels/buyTickspeedMultiplier in engine.js);
          // level 1 is the baseline ×1, no bonus yet, each further level speeds up this tier's own
          // delivery frequency by another 10% (see getEffectiveTierTickSpeedSeconds in engine.js) —
          // it does NOT change how much lands per delivery, only how often one arrives. The last
          // tier's separate XP-funded upgrade (left of Scale Up) multiplies on top of this.
          const tickspeedLevel = state.tickspeedLevels?.[tier.id] ?? 1
          const tickspeedMultiplier = getTickspeedProductionMultiplier(tickspeedLevel)
            * (tier.id === lastTier.id ? getLastTierXpTickspeedMultiplier(state.lastTierXpConsumed ?? 0) : 1)
          const tickspeedBonusLabel = formatBonusOrMultiplier(tickspeedMultiplier)
          // Production no longer depends on autobuyer purchase frequency at all — completing
          // every level (manual or automatic) doubles a tier's own production (see
          // getPurchaseMilestoneMultiplier/getTierCost). This is the raw amount delivered in one
          // lump batch once this tier's own (tickspeed-shrunk) period completes — not a per-second
          // average — matching exactly what tickGame credits (see "Tier production tickspeed" in
          // CLAUDE.md); neither tickspeed multiplier appears here since both now speed up
          // *delivery frequency* instead of inflating the per-delivery amount. Floored to match
          // tickGame's own floored production credit — prestigeBonus is the only fractional factor
          // left here (getPurchaseMilestoneMultiplier and getTierScaleUpMultiplier are always powers of
          // 2), so without flooring this preview could show a fraction that never actually lands.
          const milestoneMultiplier = getPurchaseMilestoneMultiplier(tierLevel)
          const tierScaleUpMultiplier = getTierScaleUpMultiplier(state, tier.id)
          const production = Math.floor(owned * prestigeBonus * tierScaleUpMultiplier * milestoneMultiplier)
          // Surfaced only in the row's collapsed-by-default TierDetails disclosure below — the
          // base value is otherwise invisible to players now that it diverges per tier again
          // (see "Tier production tickspeed" in CLAUDE.md), and the effective value shows how
          // much of that is currently offset by this tier's own and the global tickspeed
          // multiplier.
          const baseTickSpeed = getTierBaseTickSpeedSeconds(tier.id)
          const effectiveTickSpeed = getEffectiveTierTickSpeedSeconds(state, tier.id)
          // Spends the tier's own resource (resources[tier.id] === owned[tier.id]); the last tier
          // spends only 10% of its requirement. Mirrors buyTickspeedMultiplier's guard in engine.js.
          const tickspeedCost = getTierTickspeedSpend(state, tier.id, tickspeedLevel + 1)
          const tickspeedRequirement = getTierTickspeedRequirement(state, tier.id, tickspeedLevel + 1)
          const canUpgradeTickspeed = resources >= tickspeedRequirement && !isFrozen && !isTierTickspeedBlockedByChallenge(state, tier.id)
          // Buy max mode (see BuyMaxToggle/buyTierMaxLevels): when a click would buy one or more
          // FULL levels, preview those instead of the single-level fill below.
          const maxLevelsPreview = buyMaxActive ? getTierMaxLevelsPreview(state, tier.id) : { levels: 0, cost: 0, lastLevelCost: 0, partialQuantity: 0, partialCost: 0 }
          const buyLabel = maxLevelsPreview.levels > 0
            ? `Buy ${formatAmount(maxLevelsPreview.levels)} full level${maxLevelsPreview.levels === 1 ? '' : 's'} for ${formatCurrency(maxLevelsPreview.cost)} total; highest level costs ${formatCurrency(maxLevelsPreview.partialQuantity > 0 ? maxLevelsPreview.partialCost : maxLevelsPreview.lastLevelCost)}${maxLevelsPreview.partialQuantity > 0 ? ` (${maxLevelsPreview.partialQuantity} of ${purchaseBlockSize} purchases toward the next level)` : ''} (${formatAmount(completedLevels)} completed levels)`
            : `Buy${affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} for ${formatCurrency(displayCost)} (${formatAmount(completedLevels)} completed levels, ${formatAmount(doneInBlock)} of ${purchaseBlockSize} purchased toward the next)`
          const tickspeedLabel = `Tickspeed multiplier (+10% faster ticks) for ${formatCost(tickspeedCost, tier.id)}${tickspeedRequirement > tickspeedCost + 1 ? ` (requires ${formatCost(tickspeedRequirement, tier.id)} owned)` : ''}`
          // Compact visible text: an icon in place of the "Buy" word, and the tier's short symbol
          // (via formatCost) in place of its full name. The full sentence stays in aria-label/
          // title for assistive tech. Cost-block progress lives on the button as the dual-tone
          // fill plus a VisuallyHidden progressbar (and in the aria-label) — not as `+n/8` text
          // next to the cart icon. Buy-max mode is the exception: "+<levels>" full levels sit
          // beside the icon so the click still previews how many levels it will buy.
          const buyLevelQuantityText = maxLevelsPreview.levels > 0 ? `+${formatAmount(maxLevelsPreview.levels)}` : ''
          // A single ⚙ (the same icon used on the cumulative "⚙ +N%" badge and the tier
          // tickspeed autobuyer's "⚙ Active" badge) identifies this as the tickspeed control —
          // no separate icon for "+10%" is needed, since that step is fixed
          // (TICKSPEED_PRODUCTION_STEP) and implied by the button itself; the full "+10% faster
          // ticks" sentence still lives in tickspeedLabel/title above for assistive tech and
          // anyone who expands the tooltip.
          const tickspeedVisibleLabel = `⚙ ${formatCost(tickspeedCost, tier.id)}`
          // Live "how close am I" meter for the tickspeed button, even while disabled.
          const tickspeedProgressPercent = progressPercent(resources, tickspeedRequirement)
          const accent = theme.tierAccents[tierIndex % theme.tierAccents.length]
          const isDetailsOpen = openTierDetailIds.has(tier.id)
          const detailsId = `${tier.id}-details`
          const isBoosted = isFactoryTierBoosted(state.intro, tierIndex)

          return (
            <TierLine
              key={tier.id}
              ref={registerTierRowRef(tier.id)}
              data-tier-id={tier.id}
              aria-label={`${tier.name} layer`}
              $accent={accent}
              $animateReveal={!initialUnlockedIds.has(tier.id)}
              $boosted={isBoosted}
            >
              <TierNameTrigger>
                <TierName>
                  <TierNameLabel
                    title={tier.name}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isDetailsOpen}
                    aria-controls={detailsId}
                    onClick={() => toggleTierDetails(tier.id)}
                    onKeyDown={event => {
                      if (event.key !== 'Enter' && event.key !== ' ') return
                      event.preventDefault()
                      toggleTierDetails(tier.id)
                    }}
                  >
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
                      Completed levels: {formatAmount(completedLevels)} ({formatAmount(doneInBlock)}/{purchaseBlockSize} purchased toward the next) — purchase
                      milestone bonus: ×{formatRate(milestoneMultiplier)} from {formatAmount(purchased)} lifetime purchases
                    </li>
                    {tierScaleUpMultiplier > 1 && <li>Scale Up bonus: ×{formatRate(tierScaleUpMultiplier)}</li>}
                    {isBoosted && <li>{getComputeBoostDescription(state.intro)}</li>}
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
              <BuyButton
                aria-label={buyLabel}
                variant="plain"
                disabled={!canAfford}
                onClick={() => actions.buyTierQuantity(tier.id)}
                title={`Buy ${tier.name} to increase your ${RESOURCE_SYMBOL(tier.producesResourceId)} production — completing every level (${purchaseBlockSize} purchases) also multiplies it by ×${PURCHASE_MILESTONE_MULTIPLIER_BASE}`}
                $progress={donePercent}
                $secondaryProgress={availablePercent}
                $pulse={canAfford}
              >
                <BuyButtonIcon>🛒{buyLevelQuantityText && ` ${buyLevelQuantityText}`} </BuyButtonIcon>
                <BuyButtonCostLabel>{formatCurrency(maxLevelsPreview.levels > 0 ? (maxLevelsPreview.partialQuantity > 0 ? maxLevelsPreview.partialCost : maxLevelsPreview.lastLevelCost) : displayCost)}</BuyButtonCostLabel>
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

      {isLastTierXpUnlocked && (
      <SpeedCardsRow>
        <GlobalTickspeedCard aria-label="restage panel">
          <Disclosure>
            <summary>
              <CardTitleGroup>
                <h2>Restage</h2>
                <CardEffect
                  title={`Each XP consumed makes ${lastTier.name} ticks faster by this factor (compounding)`}
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                >
                  {lastTier.symbol} +{formatBonusPercent(getLastTierXpTickspeedMultiplier(1))}%/XP
                </CardEffect>
              </CardTitleGroup>
            </summary>
            <MutedText>
              {formatBonusOrMultiplier(getLastTierXpTickspeedMultiplier(lastTierXpConsumed), { precise: true })} faster {lastTier.name} ticks
              {' '}from {formatAmount(lastTierXpConsumed)} XP consumed. Next consumption needs at least {formatAmount(lastTierXpMinConsumption)} XP.
            </MutedText>
          </Disclosure>
          <Button
            aria-label={`Restage: consume ${formatAmount(lastTierXpBalance)} XP for ${lastTierXpConsumeBonusLabel} ${lastTier.name} tickspeed (resets every other tier's owned quantity and Bits to 0)${challengeDisabled('restageDisabled') ? challengeNote : ''}`}
            variant="smart"
            disabled={!canConsumeLastTierXp}
            onClick={handleConsumeLastTierXp}
            title={lastTierOwned > 0
              ? `Consume XP for a compounding +1% ${lastTier.name} tickspeed per XP (min ${formatAmount(lastTierXpMinConsumption)} XP right now) — resets every other tier's owned quantity and Bits to 0`
              : `No ${lastTier.name} owned right now — nothing to speed up, so this stays disabled until you own at least one again`}
            type="button"
            $progress={lastTierXpProgressPercent}
            $pulse={canConsumeLastTierXp}
          >
            <ButtonIcon>🧬 </ButtonIcon>
            <ButtonLabel>{formatAmount(lastTierXpBalance)} XP</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label={`${lastTier.name} Restage progress`}
              aria-valuenow={lastTierXpProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Button>
        </GlobalTickspeedCard>
      </SpeedCardsRow>
      )}

      <SpeedCardsRow>
        <ScaleUpCard aria-label="scale up panel">
          <Disclosure>
            <summary>
              <CardTitleGroup>
                <h2>Scale Up</h2>
                <CardEffect
                  title="Doubles production for tiers unlocked so far"
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                >
                  🏭 ×2{scaleUpUnlocksTB ? ' · 🔓 TB' : ''}
                </CardEffect>
              </CardTitleGroup>
            </summary>
            <MutedText>
              Resets tiers and doubles production of every tier unlocked so far
              {scaleUpSuccessorTier ? `, and unlocks ${scaleUpSuccessorTier.name}` : ''}. Needs {formatAmount(scaleUpRequirementDisplay)} completed {scaleUpTargetTier.name} levels.
            </MutedText>
          </Disclosure>
          <ScaleUpButton
            aria-label={`Scale Up (requires ${scaleUpRequirementDisplay} completed ${scaleUpTargetTier.name} levels) — doubles production for tiers unlocked so far${scaleUpUnlocksTB ? ' and unlocks TB' : ''}`}
            color={canScaleUp ? '#22d3ee' : 'darkgrey'}
            disabled={!canScaleUp}
            onClick={actions.scaleUp}
            title={`Resets tiers, doubles production for tiers unlocked so far${scaleUpSuccessorTier ? `, and unlocks ${scaleUpSuccessorTier.name}` : ''} — requires ${scaleUpRequirementDisplay} completed ${scaleUpTargetTier.name} levels`}
            type="button"
            $progress={scaleUpProgressPercent}
            $progressColor="#22d3ee"
            $pulse={canScaleUp}
          >
            <ButtonIcon>⏩ </ButtonIcon>
            <ButtonLabel>{scaleUpTargetTier.symbol}{' '}{formatAmount(scaleUpTargetTierLevelDisplay)}/{formatAmount(scaleUpRequirementDisplay)}</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Scale Up progress"
              aria-valuenow={scaleUpProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </ScaleUpButton>
        </ScaleUpCard>

      </SpeedCardsRow>

      {overclockEverRevealed && (
      <SpeedCardsRow>
        <OverclockCard aria-label="overclock panel">
          <Disclosure>
            <summary>
              <CardTitleGroup>
                <h2>Overclock</h2>
                <CardEffect
                  title="Each completed level multiplies Clock Speed's per-level rate"
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                >
                  🌐 +{formatRate(OVERCLOCK_MULTIPLIER_STEP * 100)}%/lvl
                </CardEffect>
              </CardTitleGroup>
            </summary>
            <MutedText>
              {overclockLevel > 0
                ? `Clock Speed's per-level rate is now ${formatGlobalTickspeedBonusPercent(currentGlobalTickspeedStepDisplay)}% (was 1%).`
                : `Not claimed yet — reach ${formatAmount(overclockRequirementDisplay)} completed ${lastTier.name} levels. Each completed level then multiplies Clock Speed's per-level rate by ×${overclockLevelEffectDisplay}.`}
            </MutedText>
          </Disclosure>
          <OverclockButton
            aria-label={`Overclock (requires ${overclockRequirementDisplay} completed ${lastTier.name} levels) — resets Scale Up's bonus; each completed ${lastTier.name} level (${formatAmount(lastTierLevelDisplay)} now) multiplies Clock Speed's per-level rate by ×${overclockLevelEffectDisplay}`}
            color={canOverclock ? '#fb923c' : 'darkgrey'}
            disabled={!canOverclock}
            onClick={actions.overclock}
            title={`Resets tiers (and Scale Up's bonus); each completed ${lastTier.name} level multiplies Clock Speed's per-level rate by ×${overclockLevelEffectDisplay} — requires ${overclockRequirementDisplay} completed levels${challengeDisabled('overclockDisabled') ? challengeNote : ''}`}
            type="button"
            $progress={overclockProgressPercent}
            $progressColor="#fb923c"
            $pulse={canOverclock}
          >
            <ButtonIcon>⚡ </ButtonIcon>
            <ButtonLabel>{lastTier.symbol}{' '}{formatAmount(lastTierLevelDisplay)}/{formatAmount(overclockRequirementDisplay)}</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Overclock progress"
              aria-valuenow={overclockProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </OverclockButton>
        </OverclockCard>
      </SpeedCardsRow>
      )}

    </RootDiv>
  )
}

export default MainPage
