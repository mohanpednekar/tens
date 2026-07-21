import Button, { ButtonContent, ButtonIcon, ButtonLabel, VisuallyHidden } from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency, formatOfflineDuration, getAutobuyerUnlockCost, getAutoPrestigeAttemptRate, getAutoPrestigeCost, getEffectiveTierTickSpeedSeconds, getGlobalTickspeedMultiplierCost, getGlobalTickspeedProductionMultiplier, getPrestigePointsAwarded, getPrestigeProductionMultiplier, getPrestigeProgressPercent, getPurchaseMilestoneMultiplier, getSmartAutobuyerCost, getSpeedUpMultiplier, getSpeedUpRequirement, getTickspeedMultiplierCost, getTickspeedProductionMultiplier, getTierAffordableQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, getTierTickspeedAutobuyerCost, isGlobalTickspeedMultiplierUnlocked, isProductionFrozen, isTierUnlocked } from 'game/engine'
import { AUTO_SPEED_UP_COST, getTierBaseTickSpeedSeconds, GOOGOL, MONEY_ID, PRESTIGE_SPEED_BONUS_UNLOCK_COST, RESOURCE_SYMBOL, TICKSPEED_AUTOBUYER_COST, TIER_DEFINITIONS } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

// Offline-progress notice auto-dismiss timing (UI chrome only — not a game/economy constant, so
// it lives here rather than in layers.js). Clicking the notice itself (not the Dismiss button)
// extends the deadline to the longer duration — see handleOfflineNoticeClick in MainPage.
const OFFLINE_NOTICE_AUTO_DISMISS_MS = 10_000
const OFFLINE_NOTICE_EXTENDED_DISMISS_MS = 60_000
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
  color: white;
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-size: 1.75rem;
    letter-spacing: 0.02em;
  }

  /* InfoDetails' summary is a fit-content block (so its click target hugs the text rather than
     spanning the row) — center that block itself, since text-align only centers inline content,
     not a block-level child, and the fit-content width is what makes auto margins work here. */
  details summary {
    margin: 0 auto;
  }
`

const TopRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`

// Fades out (rather than disappearing abruptly) once the auto-dismiss countdown reaches zero —
// see the offline-notice timing state in MainPage. Clickable to extend the countdown, hence the
// pointer cursor; $fading drives the opacity transition, not a remount, so the fade is visible
// before the notice is actually removed from the DOM by dismissOfflineProgress.
const OfflineNoticeCard = styled(StatCard)`
  cursor: pointer;
  opacity: ${props => (props.$fading ? 0 : 1)};
  transition: opacity ${OFFLINE_NOTICE_FADE_MS}ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const TierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

// One accent hue per tier (cycled by index), applied as a thin left-edge stripe on the row —
// purely cosmetic scanability, kept off text/buttons so it never collides with the semantic
// white/green/gold/darkgrey coloring used for affordability elsewhere in the row.
const TIER_ACCENT_COLORS = ['#60a5fa', '#f472b6', '#a78bfa', '#fb923c', '#22d3ee', '#38bdf8', '#f87171', '#818cf8']

// One-shot entrance for a tier row that unlocks during the current session (see
// $animateReveal below) — never replays on ordinary re-renders since it's a mount-time
// CSS animation, not a transition tied to any prop.
const reveal = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`

// Fixed grid areas (rather than flex flow) so each field always renders in the same slot —
// the row's shape depends only on the viewport width, never on how many digits a value has.
// Top line: name (+ compact tickspeed multiplier badge, spanning the first two tracks — the
// width the PP-based Automate control used to occupy before it moved to the PP Upgrades page,
// see MainPage), the production figure, then the owned count — production sits left of owned
// (not the other way around) so the row reads "what it makes" before "how many you have"; the
// wider track (1.3fr) follows production's spot since that figure tends to run longer (e.g.
// currency strings) and the narrower one (0.7fr) follows owned's. Middle line: just the two
// buttons, each spanning two of the four tracks — the track pairs sum equally
// (col1+col2 = col3+col4) so the tickspeed multiplier button and Buy each take exactly half the
// row's width, unaffected by how the top row's own two tracks are split between them. Buy sits
// rightmost, not the tickspeed button — Buy is clicked constantly while a tickspeed level-up is
// an occasional action, and the rightmost slot is the natural resting spot for a thumb/mouse
// that's about to click again. Bottom line: a single 'details' area spanning all four tracks,
// holding the per-tier click-to-expand disclosure's content (see TierDetails below) — there is
// no separate visible trigger for it at all (no "Details" label): the disclosure's <summary> is
// TierName itself (the row's heading, in the 'name' area), and clicking anywhere else on the
// tile that isn't a button also toggles it (see the row's own onClick below) — collapsed by
// default, contributing zero height to the 'details' row until expanded, so the row's collapsed
// footprint is unchanged from before this was added. cursor: pointer signals the whole tile is
// clickable; Button's own cursor rule overrides it for the two buttons.
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
    border-color: #444;
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

const PrestigeCard = styled(StatCard)`
  border-color: #854d0e;
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
// Header that are centered rather than left-aligned.
const CenteredCard = styled(StatCard)`
  align-items: center;
  text-align: center;
`

// Keeps both balances visible at all times: the Money + PP pair sticks to the top of the viewport
// once the page scrolls past their normal position, and compresses into a compact side-by-side
// bar while stuck ($compressed — tracked via an IntersectionObserver on the sentinel rendered
// just above, since CSS alone can't detect "currently stuck"). The solid page-background fill
// stops scrolled tier rows showing through the gap between the two cards, and when the fixed
// TopPrestigeBar is showing ($belowBar), the stick position drops below it by $belowBarHeight
// (measured live, see topPrestigeBarHeight below) instead of underlapping it.
const StickyBalances = styled.div`
  background: #050505;
  display: flex;
  flex-direction: ${props => (props.$compressed ? 'row' : 'column')};
  gap: ${props => (props.$compressed ? '0.5rem' : '0.85rem')};
  position: sticky;
  top: ${props => (props.$belowBar ? `${props.$belowBarHeight}px` : '0')};
  z-index: 100;

  ${props => props.$compressed && css`
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.6);
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

// Per-tier click-to-expand disclosure (reusing InfoDetails above, the same pattern SpeedUpCard/
// PrestigeCard/GlobalTickspeedCard use elsewhere in this file) surfacing numbers that don't fit
// the row's compact layout — most notably each tier's own base/effective tickspeed, now that
// base tickspeed diverges per tier again (see "Tier production tickspeed" in CLAUDE.md). No
// separate visible summary/label of its own: `display: contents` on both <details> and <summary>
// removes their own boxes from the grid entirely, so TierName — nested inside <summary> in the
// JSX below — becomes the disclosure's real (and only) visible trigger, sitting in its normal
// 'name' grid slot rather than a redundant "Details" label elsewhere in the row. Native
// click-to-toggle behavior on <summary> is unaffected by display: contents — it's event-bubbling
// based, not tied to the summary having its own rendered box (verified: a click anywhere inside
// it, including on a nested display:contents-wrapped heading, still toggles the disclosure).
const TierDetails = styled(InfoDetails)`
  display: contents;

  summary {
    display: contents;
  }
`

// Holds the disclosure's actual content — a plain div (not part of <details> at all structurally
// besides being TierDetails' non-summary child) so it can occupy the 'details' grid area on its
// own, independent of TierName's 'name' area above.
const TierDetailsContent = styled.div`
  grid-area: details;
  font-size: 0.8em;

  ul {
    color: #a3a3a3;
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

const GoldText = styled.b`
  color: #fbbf24;
  font-size: 1.1em;
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
  grid-area: name;
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
  color: #4ade80;
  font-size: 0.85em;
  ${gridCell}
`

const OwnedText = styled(MutedText)`
  grid-area: owned;
  font-size: 0.85em;
  text-align: right;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`


const ProductionText = styled(MutedText)`
  grid-area: production;
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

const PpUpgradeBadge = styled.span`
  color: ${props => props.$color};
`

const formatCost = (amount, resourceId) =>
  resourceId === MONEY_ID
    ? formatCurrency(amount)
    : `${formatAmount(amount)} ${RESOURCE_SYMBOL(resourceId)}`

// "1.1" / "1.21" / "1" — rounds to 2 decimal places and trims a trailing ".00"/trailing zero,
// used for multiplier displays (Speed Up's next multiplier, the PP production speed bonus).
const formatRate = value => (Math.round(value * 100) / 100).toFixed(2).replace(/\.?0+$/, '')

// Whole-percent bonus a multiplier represents above baseline (×1.21 → 21) — used for the
// tickspeed multiplier badge/labels, which show the cumulative delivery-frequency bonus as "+N%"
// rather than the earlier "×N" purchase-speed multiplier it replaced (see "Tickspeed multiplier"
// in CLAUDE.md).
const formatBonusPercent = multiplier => Math.round((multiplier - 1) * 100)

const MainPage = () => {
  const { actions, dismissOfflineProgress, offlineProgress, resetGame, state } = useIncrementalGame()
  const { prestige } = state
  // Live "how close am I" fill for every PP-spending button, mirroring the tier buttons'
  // on-button progress treatment: how much of a given PP cost the current unspent balance
  // already covers.
  const ppProgressPercent = cost => Math.min(100, Math.round((prestige.points / cost) * 100))
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
  const prestigeLabel = 'Prestige (requires 1 Googol Money)'
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
      setPrestigeCardEverRevealed(false)
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
  // Smart requires the tier's autobuyer to already be unlocked (see buySmartAutobuyer); the tier
  // tickspeed autobuyer needs no such prerequisite (see buyTierTickspeedAutobuyer) — but since
  // Smart being bought already implies the autobuyer is unlocked, "both bought" below still means
  // every purchase available for that tier is done. Once every tier has bought both
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
  const showFullScreenPrompt = isFrozen && isFirstRun
  const showTopPrestigeBar = isFrozen && !isFirstRun
  // During the first run only, the normal Prestige card is only worth showing once the player has
  // bought 10 of the very last tier — once they've prestiged at least once, it's always relevant.
  // Once *either* condition has ever been true, the card stays visible (in a disabled state once
  // no longer immediately relevant, e.g. the moment after prestiging, or after a Speed Up wipes
  // tier10's purchase count back down during the first run) rather than disappearing again — see
  // the prestigeCardEverRevealed effect below.
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  const prestigeCardRelevant = !isFirstRun || getTierPurchasedCount(state, lastTier.id) >= 10
  const [prestigeCardEverRevealed, setPrestigeCardEverRevealed] = useState(prestigeCardRelevant)
  useEffect(() => {
    if (prestigeCardRelevant) setPrestigeCardEverRevealed(true)
  }, [prestigeCardRelevant])
  const showBottomPrestigeCard = !isFrozen && prestigeCardEverRevealed

  // Speed Up: a more frequent soft-reset than Prestige, available well before Money reaches
  // GOOGOL (see speedUpGame in engine.js) — once the last tier reaches that cycle's requirement
  // (getSpeedUpRequirement(speedUpCount): 10 lifetime purchases for the first activation, 20 for
  // the second, 30 for the third, …), it resets tiers/resources but permanently doubles
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
  const lastTierPurchased = getTierPurchasedCount(state, lastTier.id)
  const speedUpProgressPercent = Math.min(100, Math.round((lastTierPurchased / speedUpRequirement) * 100))
  const canSpeedUp = !isFrozen && lastTierPurchased >= speedUpRequirement
  // Automates Speed Up (see buyAutoSpeedUp in engine.js) — gated on !isFirstRun like every other
  // PP-spending control (see "Prestige info is hidden until first prestige"), but NOT on
  // allTiersFullyAutomated the way Auto-Prestige is: Speed Up is meant to help early/mid-game, well before
  // that endgame milestone.
  const isAutoSpeedUpActive = state.autoSpeedUp ?? false
  const canBuyAutoSpeedUp = !isFrozen && !isAutoSpeedUpActive && !isFirstRun && prestige.points >= AUTO_SPEED_UP_COST

  // Automates the (Money-funded) global tickspeed multiplier (see buyTickspeedAutobuyer in
  // engine.js) — once bought, tickGame upgrades it automatically whenever affordable, mirroring
  // Auto Speed Up's one-time-unlock pattern rather than Auto-Prestige's leveled one, since there's
  // no cadence to speed up here either.
  const isTickspeedAutobuyerActive = state.autoGlobalTickspeed ?? false
  const canBuyTickspeedAutobuyer = !isFrozen && !isTickspeedAutobuyerActive && !isFirstRun && prestige.points >= TICKSPEED_AUTOBUYER_COST

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
  const globalTickspeedProgressPercent = Math.min(100, Math.round(
    (state.resources[MONEY_ID] / globalTickspeedCost) * 100
  ))
  // Progressive disclosure, same pattern as speedUpEverRevealed/prestigeCardEverRevealed above:
  // once the card has ever been relevant (tier02 owned, or the multiplier already active from a
  // prior run), it stays visible — in a disabled state — rather than disappearing again the
  // moment a Prestige/Speed Up resets tier02's owned count back to 0.
  const [globalTickspeedCardEverRevealed, setGlobalTickspeedCardEverRevealed] = useState(globalTickspeedUnlocked)
  useEffect(() => {
    if (globalTickspeedUnlocked) setGlobalTickspeedCardEverRevealed(true)
  }, [globalTickspeedUnlocked])

  // Lights the PP Upgrades tab's dot whenever unspent PP can afford at least one purchase over
  // there — any tier's Unlock/Smart/tier-tickspeed-autobuyer, the speed bonus unlock, Auto Speed
  // Up, the (global) Tickspeed Autobuyer, or Auto-Prestige (once revealed via
  // allTiersFullyAutomated) — so the player knows to check in without opening the page on spec
  // every time. The global tickspeed multiplier *itself* is Money-funded and lives on the Game
  // view instead, so it doesn't factor in here — only its PP-funded automation toggle does.
  const hasAffordablePpUpgrade = !isFrozen && !isFirstRun && (
    TIER_DEFINITIONS.some(tier => {
      if (!isTierUnlocked(state)(tier)) return false
      const isLocked = (state.autobuyers[tier.id] ?? null) === null
      // Unlock (while locked) and Smart (once unlocked) are mutually exclusive checks, same as
      // before — but the tier tickspeed autobuyer is buyable regardless of lock status (see
      // buyTierTickspeedAutobuyer in engine.js), so it's checked unconditionally below.
      if (isLocked && prestige.points >= getAutobuyerUnlockCost(tier.id)) return true
      if (!isLocked && !state.smartAutobuyer?.[tier.id] && prestige.points >= getSmartAutobuyerCost(tier.id)) return true
      if (!state.tierTickspeedAutobuyer?.[tier.id] && prestige.points >= getTierTickspeedAutobuyerCost(tier.id)) return true
      return false
    }) ||
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
    const observer = new IntersectionObserver(([entry]) => {
      setBalancesCompressed(!entry.isIntersecting)
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
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

  // Offline-progress notice: auto-dismisses after OFFLINE_NOTICE_AUTO_DISMISS_MS unless the
  // player clicks the notice itself, which extends the deadline to
  // OFFLINE_NOTICE_EXTENDED_DISMISS_MS from that click (not merely +60s on top of whatever
  // remained). offlineProgress is a one-shot value fixed at mount (see useIncrementalGame — it
  // only ever transitions non-null → null via dismissOfflineProgress, never null → non-null after
  // mount), so a lazy initializer capturing its start/end timestamps at mount time is enough;
  // no effect is needed to (re)initialize it later.
  const [offlineNoticeTiming, setOfflineNoticeTiming] = useState(() => {
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
  const handleOfflineNoticeClick = () => {
    if (offlineNoticeFading) return
    const now = Date.now()
    setOfflineNoticeTiming({ start: now, end: now + OFFLINE_NOTICE_EXTENDED_DISMISS_MS })
  }
  // Dismiss is an explicit, immediate action — it skips the fade and stops the click from also
  // bubbling up to handleOfflineNoticeClick (which would otherwise re-extend a notice that's
  // about to be dismissed anyway).
  const handleOfflineNoticeDismissClick = event => {
    event.stopPropagation()
    dismissOfflineProgress()
  }

  if (showFullScreenPrompt) {
    return (
      <FullScreenOverlay role="dialog" aria-modal="true" aria-label="Prestige required">
        <FullScreenCard>
          <h2>✦ Prestige Available!</h2>
          <MutedText>
            You've reached {formatCurrency(state.resources[MONEY_ID])} — 1 Googol Money. All
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
            <MutedText>1 Googol Money reached — production has stopped.</MutedText>
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
        <InfoDetails>
          <summary><h1>Tens</h1></summary>
          <MutedText>Build by powers of ten. Prestige for Prestige Points.</MutedText>
        </InfoDetails>
      </Header>

      {offlineProgress && (
        <OfflineNoticeCard
          aria-label="offline progress notice"
          onClick={handleOfflineNoticeClick}
          title="Click to keep this notice a little longer"
          $fading={offlineNoticeFading}
        >
          <TopRow>
            <MutedText>
              Welcome back! You were away for {formatOfflineDuration(offlineProgress.elapsedRealSeconds)}
              {' — simulated '}{formatOfflineDuration(offlineProgress.effectiveSeconds)} of progress at 10% speed.
            </MutedText>
            <Button
              aria-label="Dismiss offline progress notice"
              color="darkgrey"
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
          </TopRow>
        </OfflineNoticeCard>
      )}

      <BalancesSentinel ref={balancesSentinelRef} aria-hidden="true" />
      <StickyBalances
        $compressed={balancesCompressed}
        $belowBar={showTopPrestigeBar}
        $belowBarHeight={topPrestigeBarHeight}
      >
        <CenteredCard aria-label="money display">
          <Money>{formatCurrency(state.resources[MONEY_ID])}</Money>
        </CenteredCard>

        {!isFirstRun && (
          <CenteredCard aria-label="prestige points display">
            <MutedText>
              <GoldText>{formatAmount(prestige.points)} PP</GoldText>
              {state.prestigeSpeedBonusUnlocked && ` · +${Math.round((prestigeBonus - 1) * 100)}% production speed`}
              {!state.prestigeSpeedBonusUnlocked && ' · production speed bonus locked'}
            </MutedText>
          </CenteredCard>
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
            PP Upgrades{hasAffordablePpUpgrade && <NavDot aria-label="PP upgrade available" />}
          </ViewTabButton>
        </ViewNav>
      )}

      {view === 'game' && (<>

      {globalTickspeedCardEverRevealed && (
        <GlobalTickspeedCard aria-label="global tickspeed panel">
          <InfoDetails>
            <summary><h2>Global Tickspeed Multiplier</h2></summary>
            <MutedText id="global-tickspeed-description">
              Spend Money to permanently speed up every tier's production ticks by another 1% at
              once — more frequent deliveries, not bigger ones. Each level costs another power of
              ten. Unlocks once you own {TIER_DEFINITIONS[1].name}.
              {isGlobalTickspeedActive && ` Currently Lv.${globalTickspeedLevel} — +${formatBonusPercent(globalTickspeedMultiplier)}% faster ticks on every tier.`}
            </MutedText>
          </InfoDetails>
          <Button
            aria-describedby="global-tickspeed-description"
            aria-label={
              isGlobalTickspeedActive
                ? `Upgrade global tickspeed multiplier for ${formatCurrency(globalTickspeedCost)} (currently +${formatBonusPercent(globalTickspeedMultiplier)}% faster ticks on every tier)`
                : `Enable global tickspeed multiplier for ${formatCurrency(globalTickspeedCost)}`
            }
            color={canBuyGlobalTickspeed ? '#3b82f6' : 'darkgrey'}
            disabled={!canBuyGlobalTickspeed}
            onClick={actions.buyGlobalTickspeedMultiplier}
            title="Spend Money to permanently speed up every tier's production ticks by another 1% at once (more frequent deliveries, not bigger ones) — each level costs another power of ten"
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
          // Manual Buy always grabs as many units as are currently affordable, up to the
          // 10-unit cost block boundary (the former ×1/×10 "Bulk" toggle's default, now the only
          // behavior — see useIncrementalGame's BUY_QUANTITY).
          const affordableQuantity = getTierAffordableQuantity(tier, purchased, costResource, 10)
          const unitCost = getTierQuantityCost(tier, purchased, 1)
          const displayCost = affordableQuantity > 0 ? getTierQuantityCost(tier, purchased, affordableQuantity) : unitCost
          const canAfford = affordableQuantity > 0 && !isFrozen
          const doneInBlock = purchased % 10
          const donePercent = (doneInBlock / 10) * 100
          const availablePercent = (affordableQuantity / 10) * 100
          // The tier's own Money-funded tickspeed level — enabled by default (no autobuyer unlock
          // or PP prerequisite at all, see tickspeedLevels/buyTickspeedMultiplier in engine.js);
          // level 1 is the baseline ×1, no bonus yet, each further level speeds up this tier's own
          // delivery frequency by another 10% (see getEffectiveTierTickSpeedSeconds in engine.js) —
          // it does NOT change how much lands per delivery, only how often one arrives.
          const tickspeedLevel = state.tickspeedLevels?.[tier.id] ?? 1
          const tickspeedMultiplier = getTickspeedProductionMultiplier(tickspeedLevel)
          const tickspeedBonusPercent = formatBonusPercent(tickspeedMultiplier)
          // Production no longer depends on autobuyer purchase frequency at all — every 10
          // lifetime purchases of a tier (manual or automatic) doubles its own production (see
          // getPurchaseMilestoneMultiplier/getTierCost). This is the raw amount delivered in one
          // lump batch once this tier's own (tickspeed-shrunk) period completes — not a per-second
          // average — matching exactly what tickGame credits (see "Tier production tickspeed" in
          // CLAUDE.md); neither tickspeed multiplier appears here since both now speed up
          // *delivery frequency* instead of inflating the per-delivery amount. Floored to match
          // tickGame's own floored production credit — prestigeBonus is the only fractional factor
          // left here (getPurchaseMilestoneMultiplier and getSpeedUpMultiplier are always powers of
          // 2), so without flooring this preview could show a fraction that never actually lands.
          const milestoneMultiplier = getPurchaseMilestoneMultiplier(purchased)
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
          const buyLabel = `Buy${affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} for ${formatCurrency(displayCost)} (level ${formatAmount(purchased)})`
          const tickspeedLabel = `Tickspeed multiplier (+10% faster ticks) for ${formatCost(tickspeedCost, tier.id)}`
          // Compact visible text: an icon in place of the "Buy"/tickspeed word, and the tier's
          // short symbol (via formatCost) in place of its full name. The full sentence stays in
          // aria-label/title for assistive tech. The level+quantity ("40+3" — current lifetime
          // purchase count plus the quantity this purchase adds) sits inside ButtonIcon alongside
          // the 🛒 glyph rather than the centered ButtonLabel, so it's pinned immediately next to
          // the icon and lines up in a column across tier rows regardless of the cost string's
          // length; the quantity is omitted (just the level shows) once nothing is affordable.
          const buyLevelQuantityText = `${formatAmount(purchased)}${affordableQuantity > 0 ? `+${affordableQuantity}` : ''}`
          // A single ⚙ (the same icon used on the cumulative "⚙ +N%" badge and the tier
          // tickspeed autobuyer's "⚙ Active" badge) identifies this as the tickspeed control —
          // no separate icon for "+10%" is needed, since that step is fixed
          // (TICKSPEED_PRODUCTION_STEP) and implied by the button itself; the full "+10% faster
          // ticks" sentence still lives in tickspeedLabel/title above for assistive tech and
          // anyone who expands the tooltip.
          const tickspeedVisibleLabel = `⚙ ${formatCost(tickspeedCost, tier.id)}`
          // Live "how close am I" meter for the tickspeed button, even while disabled.
          const tickspeedProgressPercent = Math.min(100, Math.round(
            (resources / (tickspeedCost + 1)) * 100
          ))
          const accent = TIER_ACCENT_COLORS[tierIndex % TIER_ACCENT_COLORS.length]
          // Captured by TierDetails' ref callback below so the row's own onClick (further down)
          // can toggle it programmatically for clicks anywhere on the tile that aren't already
          // handled natively by the summary (TierName) or swallowed by a button. Fresh per
          // render, same as the tier-scoped consts above — safe since both the ref callback and
          // the onClick reading it come from this same render's closure.
          let detailsEl = null

          return (
            <TierLine
              key={tier.id}
              aria-label={`${tier.name} layer`}
              $accent={accent}
              $animateReveal={!initialUnlockedIds.has(tier.id)}
              onClick={event => {
                if (event.target.closest('summary') || event.target.closest('button')) return
                if (detailsEl) detailsEl.open = !detailsEl.open
              }}
            >
              <TierDetails ref={el => { detailsEl = el }}>
                <summary>
                  <TierName>
                    <TierNameLabel title={tier.name}>
                      <VisuallyHidden>{tier.name}</VisuallyHidden>
                      <span aria-hidden="true">{tier.symbol}</span>
                    </TierNameLabel>
                    {tickspeedBonusPercent > 0 && (
                      <GreenText title={`Tickspeed multiplier level ${tickspeedLevel} — +${tickspeedBonusPercent}% faster ticks`}>
                        ⚙ +{tickspeedBonusPercent}%
                      </GreenText>
                    )}
                  </TierName>
                </summary>
                <TierDetailsContent>
                  <ul>
                    <li>Base tickspeed: delivers every {formatRate(baseTickSpeed)}s</li>
                    <li>
                      Effective tickspeed: every {formatRate(effectiveTickSpeed)}s (tier ×{formatRate(tickspeedMultiplier)}, global ×{formatRate(globalTickspeedMultiplier)})
                    </li>
                    <li>Purchase milestone bonus: ×{formatRate(milestoneMultiplier)} from {formatAmount(purchased)} lifetime purchases</li>
                    {speedUpCount > 0 && <li>Speed Up bonus: ×{formatRate(speedUpMultiplier)}</li>}
                    <li>Costs {RESOURCE_SYMBOL(tier.costResourceId)}, produces {RESOURCE_SYMBOL(tier.producesResourceId)}</li>
                  </ul>
                </TierDetailsContent>
              </TierDetails>
              <OwnedText title="Owned">
                <VisuallyHidden>Owned: </VisuallyHidden>
                {formatAmount(owned)}
              </OwnedText>
              <ProductionText>
                +{tier.producesResourceId === MONEY_ID
                  ? formatCurrency(production)
                  : `${formatAmount(production)} ${RESOURCE_SYMBOL(tier.producesResourceId)}`}
              </ProductionText>
              <UpgradeButton
                aria-label={tickspeedLabel}
                color={canUpgradeTickspeed ? '#4ade80' : 'darkgrey'}
                disabled={!canUpgradeTickspeed}
                onClick={() => actions.buyTickspeedMultiplier(tier.id)}
                title={`Tickspeed multiplier level ${tickspeedLevel} (+${tickspeedBonusPercent}% faster ticks) — the next level makes it 10% more`}
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
                color={canAfford ? 'white' : 'darkgrey'}
                disabled={!canAfford}
                onClick={() => actions.buyTierQuantity(tier.id)}
                title={`Buy ${tier.name} to increase your ${RESOURCE_SYMBOL(tier.producesResourceId)} production — every 10 purchases also doubles it`}
                $progress={donePercent}
                $secondaryProgress={availablePercent}
                $pulse={canAfford}
              >
                <ButtonIcon>🛒 {buyLevelQuantityText} </ButtonIcon>
                <ButtonLabel>{formatCurrency(displayCost)}</ButtonLabel>
                <VisuallyHidden
                  role="progressbar"
                  aria-label={`${tier.name} cost-block progress`}
                  aria-valuenow={doneInBlock}
                  aria-valuemin={0}
                  aria-valuemax={10}
                />
              </BuyButton>
            </TierLine>
          )
        })}
      </TierList>

      {speedUpEverRevealed && (
        <SpeedUpCard aria-label="speed up panel">
          <InfoDetails>
            <summary><h2>Speed Up</h2></summary>
            <MutedText id="speed-up-description">
              Buy {speedUpRequirement} {lastTier.name} to trigger a Speed Up: resets your tiers and
              resources (keeps unlocked autobuyers and Prestige Points) and permanently doubles
              production speed. Each Speed Up needs a full block of 10 more than the last.
            </MutedText>
          </InfoDetails>
          <SpeedUpButton
            aria-describedby="speed-up-description"
            aria-label={`Speed Up (requires ${speedUpRequirement} ${lastTier.name}) — doubles production speed to ×${formatRate(nextSpeedUpMultiplier)}`}
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
            <ButtonLabel>×{formatRate(nextSpeedUpMultiplier)}{' · '}{formatAmount(lastTierPurchased)}/{formatAmount(speedUpRequirement)}</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Speed Up progress"
              aria-valuenow={speedUpProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </SpeedUpButton>
          {!isFirstRun && isAutoSpeedUpActive && (
            <MutedText title="Speed Up now triggers automatically the instant it's eligible">
              ⏩ Auto Speed Up active
            </MutedText>
          )}
        </SpeedUpCard>
      )}

      {showBottomPrestigeCard && (
        <PrestigeCard aria-label="prestige panel">
          <InfoDetails>
            <summary><h2>Prestige</h2></summary>
            <MutedText id="prestige-description">
              Reach 1 Googol Money to earn Prestige Points (more the further past Googol you get).
              {!isFirstRun && ' Spend points on the PP Upgrades page to unlock autobuyers and other bonuses.'}
              {' '}Resets your resources when reached.
            </MutedText>
            <div>
              <GoldText>Prestiged {prestige.count} time{prestige.count === 1 ? '' : 's'}</GoldText>
              {!isFirstRun && (
                <MutedText>
                  {formatAmount(prestige.points)} PP unspent
                  {state.prestigeSpeedBonusUnlocked && ` · ×${formatRate(prestigeBonus)} production speed`}
                  {!state.prestigeSpeedBonusUnlocked && ' · production speed bonus locked'}
                </MutedText>
              )}
            </div>
          </InfoDetails>
          <Button
            aria-describedby="prestige-description"
            aria-label={prestigeAriaLabel}
            color={canPrestige ? '#fbbf24' : 'darkgrey'}
            disabled={!canPrestige}
            onClick={actions.prestige}
            title="Awards Prestige Points and resets your resources"
            type="button"
            $progress={prestigeProgressPercent}
            $progressColor="#fbbf24"
            $pulse={canPrestige}
          >
            <ButtonIcon>✦ </ButtonIcon>
            <ButtonLabel>+{formatAmount(prestigeAwardPreview)} PP{' · '}{prestigeProgressPercent}%</ButtonLabel>
            <VisuallyHidden
              role="progressbar"
              aria-label="Prestige progress"
              aria-valuenow={prestigeProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Button>
          {allTiersFullyAutomated && isAutoPrestigeActive && (
            <MutedText title={`Auto-Prestige fires roughly every ${autoPrestigeIntervalSeconds}s once Money reaches 1 Googol`}>
              ✦ Auto-Prestige Lv.{autoPrestigeLevel} (every ~{autoPrestigeIntervalSeconds}s)
            </MutedText>
          )}
        </PrestigeCard>
      )}

      </>)}

      {view === 'upgrades' && !isFirstRun && (
        <UpgradesList aria-label="PP upgrades page">
          <UpgradeCategory aria-label="tier autobuyers category">
            <CategoryHeading>Tier Autobuyers</CategoryHeading>
            {allTiersFullyAutomated ? (
              <div aria-label="full smart autobuyer notice">
                <InfoDetails>
                  <summary>🧠 Every tier is fully smart</summary>
                  <MutedText>
                    Every tier's autobuyer is fully unlocked, smart, and tickspeed-automated — since
                    there's nothing left to buy, this list won't be shown per tier anymore.
                  </MutedText>
                </InfoDetails>
              </div>
            ) : (
              TIER_DEFINITIONS.map(tier => {
                if (!isTierUnlocked(state)(tier)) return null
                const isAutobuyerLocked = (state.autobuyers[tier.id] ?? null) === null
                const isSmart = state.smartAutobuyer?.[tier.id] ?? false
                const isTierTickspeedAutobuyerActive = state.tierTickspeedAutobuyer?.[tier.id] ?? false
                if (isSmart && isTierTickspeedAutobuyerActive) return null
                const unlockCost = getAutobuyerUnlockCost(tier.id)
                const canUnlock = !isFrozen && prestige.points >= unlockCost
                const tierTickspeedAutobuyerCost = getTierTickspeedAutobuyerCost(tier.id)
                const canBuyTierTickspeedAutobuyer = !isFrozen && prestige.points >= tierTickspeedAutobuyerCost
                const smartCost = getSmartAutobuyerCost(tier.id)
                const canBuySmart = !isFrozen && !isAutobuyerLocked && prestige.points >= smartCost

                return (
                  <UpgradeRow key={tier.id} aria-label={`${tier.name} PP upgrades`}>
                    <TierNameLabel title={tier.name}>
                      <VisuallyHidden>{tier.name}</VisuallyHidden>
                      <span aria-hidden="true">{tier.symbol}</span>
                    </TierNameLabel>
                    {isAutobuyerLocked && (
                      <PpUpgradeButton
                        aria-label={`Unlock ${tier.name}'s autobuyer for ${formatAmount(unlockCost)} Prestige Point${unlockCost === 1 ? '' : 's'}`}
                        color={canUnlock ? '#38bdf8' : 'darkgrey'}
                        disabled={!canUnlock}
                        onClick={() => actions.buyAutobuyerUnlock(tier.id)}
                        title="Spend Prestige Points to permanently unlock this tier's autobuyer — it then buys units automatically, forever"
                        type="button"
                        $progress={ppProgressPercent(unlockCost)}
                        $progressColor="#38bdf8"
                      >
                        <ButtonIcon>🤖 </ButtonIcon>
                        <ButtonLabel>Unlock for {formatAmount(unlockCost)} PP</ButtonLabel>
                        <VisuallyHidden
                          role="progressbar"
                          aria-label={`${tier.name} autobuyer unlock Prestige Point progress`}
                          aria-valuenow={Math.min(prestige.points, unlockCost)}
                          aria-valuemin={0}
                          aria-valuemax={unlockCost}
                        />
                      </PpUpgradeButton>
                    )}
                    {isTierTickspeedAutobuyerActive ? (
                      <PpUpgradeBadge $color="#4ade80" title="This tier's tickspeed multiplier now upgrades itself automatically whenever affordable">
                        ⚙ Active
                      </PpUpgradeBadge>
                    ) : (
                      <PpUpgradeButton
                        aria-label={`Make ${tier.name}'s tickspeed multiplier upgrade itself automatically for ${formatAmount(tierTickspeedAutobuyerCost)} Prestige Point${tierTickspeedAutobuyerCost === 1 ? '' : 's'}`}
                        color={canBuyTierTickspeedAutobuyer ? '#38bdf8' : 'darkgrey'}
                        disabled={!canBuyTierTickspeedAutobuyer}
                        onClick={() => actions.buyTierTickspeedAutobuyer(tier.id)}
                        title="Spend Prestige Points so this tier's own (already-enabled-by-default) tickspeed multiplier upgrades itself automatically, forever, whenever affordable — no autobuyer unlock needed"
                        type="button"
                        $progress={ppProgressPercent(tierTickspeedAutobuyerCost)}
                        $progressColor="#38bdf8"
                      >
                        <ButtonIcon>⚙ </ButtonIcon>
                        <ButtonLabel>Auto for {formatAmount(tierTickspeedAutobuyerCost)} PP</ButtonLabel>
                        <VisuallyHidden
                          role="progressbar"
                          aria-label={`${tier.name} tickspeed autobuyer Prestige Point progress`}
                          aria-valuenow={Math.min(prestige.points, tierTickspeedAutobuyerCost)}
                          aria-valuemin={0}
                          aria-valuemax={tierTickspeedAutobuyerCost}
                        />
                      </PpUpgradeButton>
                    )}
                    {!isAutobuyerLocked && (
                      isSmart ? (
                        <PpUpgradeBadge $color="#a78bfa" title="This tier buys one at a time until 10 purchases, then in blocks of 10">
                          🧠 Smart
                        </PpUpgradeBadge>
                      ) : (
                        <PpUpgradeButton
                          aria-label={`Make ${tier.name}'s autobuyer smart (buy singly until 10 purchases, then in blocks of 10) for ${formatAmount(smartCost)} Prestige Point${smartCost === 1 ? '' : 's'}`}
                          color={canBuySmart ? '#a78bfa' : 'darkgrey'}
                          disabled={!canBuySmart}
                          onClick={() => actions.buySmartAutobuyer(tier.id)}
                          title="Spend Prestige Points so this tier buys one at a time until 10 purchases, then in blocks of 10 — fixes an early-game stall where a full 10-unit block isn't affordable yet"
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
                <PpUpgradeBadge $color="#4ade80" title="The global tickspeed multiplier now upgrades itself automatically whenever affordable">
                  🌐 Active
                </PpUpgradeBadge>
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
                <PpUpgradeBadge $color="#4ade80" title="Speed Up now triggers automatically the instant it's eligible">
                  ⏩ Active
                </PpUpgradeBadge>
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

            {allTiersFullyAutomated && (
              <UpgradeRow aria-label="auto-prestige upgrade">
                <TierNameLabel>
                  Auto-Prestige
                  {isAutoPrestigeActive && (
                    <MutedText title={`Auto-Prestige fires roughly every ${autoPrestigeIntervalSeconds}s once Money reaches 1 Googol`}>
                      Lv.{autoPrestigeLevel} (every ~{autoPrestigeIntervalSeconds}s)
                    </MutedText>
                  )}
                </TierNameLabel>
                <PpUpgradeButton
                  aria-label={
                    isAutoPrestigeActive
                      ? `Upgrade Auto-Prestige for ${autoPrestigeCost} Prestige Points`
                      : `Enable Auto-Prestige for ${autoPrestigeCost} Prestige Points`
                  }
                  color={canBuyAutoPrestige ? '#38bdf8' : 'darkgrey'}
                  disabled={!canBuyAutoPrestige}
                  onClick={actions.buyAutoPrestige}
                  title="Spend Prestige Points so Prestige happens automatically once Money reaches 1 Googol — each level makes it fire 10% sooner, at double the cost"
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

      <ResetButton
        aria-describedby="reset-description"
        aria-label="Reset game"
        color={isFrozen ? 'darkgrey' : '#a3a3a3'}
        disabled={isFrozen}
        type="button"
        onClick={handleResetClick}
        title={isFrozen ? 'Prestige first — production is frozen at 1 Googol Money' : 'Erases all progress and starts over (asks for confirmation)'}
      >
        <ButtonContent>↺ Reset</ButtonContent>
        <VisuallyHidden id="reset-description">Erases all progress and starts over</VisuallyHidden>
      </ResetButton>
    </RootDiv>
  )
}

export default MainPage
