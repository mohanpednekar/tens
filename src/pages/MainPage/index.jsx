import Button, { VisuallyHidden } from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency, formatOfflineDuration, getAutobuyerAttemptRate, getAutobuyerAutomationCost, getAutobuyerCost, getAutoPrestigeAttemptRate, getAutoPrestigeCost, getPrestigePointsAwarded, getPrestigeProductionMultiplier, getPrestigeProgressPercent, getPurchaseMilestoneMultiplier, getSmartAutobuyerCost, getTierAffordableQuantity, getTierProductionProgressPercent, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, isProductionFrozen, isTierUnlocked } from 'game/engine'
import { GOOGOL, MONEY_ID, RESOURCE_SYMBOL, TIER_DEFINITIONS } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components'

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
`

const TopRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
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
// Buy sits rightmost, not Upgrade — Buy is clicked constantly while Upgrade/Unlock is an
// occasional action, and the rightmost slot is the natural resting spot for a thumb/mouse
// that's about to click again.
// Name spans the full row width as its own top line at both breakpoints, rather than sharing a
// narrow column with everything else — the autobuyer badge nested inside TierName (see below)
// needs real horizontal room to render in full at a fixed position, which a slim shared column
// can't provide regardless of how it's split internally.
// The 'automate' column only ever holds content once a tier's autobuyer is active — a single
// small control at a time (Automate → Smart → the "Smart" badge, see AutomationCell), never both
// Automate and Smart together — a narrower fraction than the other columns since it's a rare,
// glanceable control rather than something clicked constantly like Buy.
const TierLine = styled(StatCard)`
  display: grid;
  grid-template-areas:
    'name name name name name name'
    'owned purchased production upgrade automate buy';
  grid-template-columns: 0.7fr 0.75fr 0.85fr 0.95fr 0.55fr 1fr;
  align-items: center;
  column-gap: 0.5rem;
  row-gap: 0.3rem;
  padding: 0.4rem 0.7rem;
  border-left: 3px solid ${props => props.$accent};
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
    grid-template-areas:
      'name name name name name name'
      'owned owned purchased purchased production production'
      'upgrade upgrade automate buy buy buy';
    grid-template-columns: repeat(6, 1fr);
    row-gap: 0.3rem;
    column-gap: 0.35rem;
    padding: 0.4rem 0.55rem;
  }
`

const PrestigeCard = styled(StatCard)`
  border-color: #854d0e;
`

const MoneyCard = styled(StatCard)`
  align-items: center;
  text-align: center;
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
// Header underneath it.
const TopPrestigeBarSpacer = styled.div`
  height: 3.75rem;
`

const MutedText = styled.p`
  color: #a3a3a3;
  margin: 0;
`

const GoldText = styled.b`
  color: #fbbf24;
  font-size: 1.1em;
`

const GreenText = styled.span`
  color: #4ade80;
  font-size: 0.85em;
  ${gridCell}
`

// A two-column grid rather than plain inline text flow, so the autobuyer badge always starts at
// the same horizontal position regardless of how wide tier.name happens to render — the same
// fixed-track technique TierLine itself uses for the rest of the row (see its own comment above).
const TierName = styled.h3`
  align-items: baseline;
  column-gap: 0.4rem;
  display: grid;
  font-size: 1em;
  grid-area: name;
  grid-template-columns: 7rem 1fr;
  margin: 0;

  @media (max-width: 40rem) {
    font-size: 0.95em;
    grid-template-columns: 6.25rem 1fr;
  }
`

const TierNameLabel = styled.span`
  ${gridCell}
`

const OwnedText = styled(MutedText)`
  grid-area: owned;
  font-size: 0.85em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

const PurchasedText = styled(MutedText)`
  grid-area: purchased;
  font-size: 0.85em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

// justify-content: flex-end right-justifies the text+ring pair as a unit against the (fixed-width)
// production column's right edge, rather than sitting immediately after the "+X" text at a
// position that would otherwise vary with the text's own rendered width — the same "identical
// position on every tier" goal as TierName's fixed-width label column above, just achieved by
// right-justifying against the column's own fixed track width instead. Keeping the text right next
// to the ring (rather than space-between, which would push it all the way to the column's left
// edge) reads as one cohesive "amount + how-soon" unit instead of two disconnected pieces.
const ProductionCell = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.35rem;
  grid-area: production;
  justify-content: flex-end;
  min-width: 0;
`

const ProductionText = styled(MutedText)`
  font-size: 0.85em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`

// Registers --tick-percent as an animatable custom property (a plain <percentage>, not inherited)
// so the browser can smoothly transition it on its own compositor — including inside a
// conic-gradient() background, which isn't natively transitionable otherwise. Rendered once,
// globally; @property must be a top-level rule, not nested inside a selector.
const TickPercentProperty = createGlobalStyle`
  @property --tick-percent {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }
`

// Compact circular "watch face" — a conic-gradient sweep (green fill against the same #262626
// track color the old bar used) with a punched-out center matching TierLine's own background
// (StatCard's #171717), so it reads as a thin filling ring rather than a solid pie wedge. Fixed
// diameter (not width: 100%) since it doesn't need to track the fractional grid column width to
// stay layout-safe at both breakpoints. Fills over the tier's own base tickspeed (see
// getTierProductionProgressPercent) and resets once the batch fires — a direct visualization of
// tierProductionAccumulators. state (and thus $percent) only updates once per real game tick, but
// the browser smoothly animates --tick-percent between each of those once-a-second values via
// `transition`, rather than snapping instantly — continuous-looking motion with no JS polling
// timer at all. $instant suppresses that transition for exactly one update: the tick right after a
// delivery, where the value drops from 100% back down to the new cycle's small remainder and
// should snap immediately rather than visibly "rewinding" (see the isRingInstant tracking in
// MainPage, driven by wasFullRef/currentlyFullRef).
const TickProgressRing = styled.div`
  --tick-percent: ${props => props.$percent}%;
  background: conic-gradient(#4ade80 var(--tick-percent), #262626 0);
  border-radius: 50%;
  flex-shrink: 0;
  height: 1.15rem;
  position: relative;
  transition: --tick-percent ${props => (props.$instant ? '0s' : '1s')} linear;
  width: 1.15rem;

  &::after {
    background: #171717;
    border-radius: 50%;
    content: '';
    inset: 0.2rem;
    position: absolute;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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

// Its own narrow grid column (see TierLine), not stacked under the Upgrade button — holds exactly
// one small control at a time, progressing Automate → Smart → the "Smart" badge (Smart requires
// Auto-upgrade automation to already be bought, so the two are never both shown for the same
// tier). Nothing renders here at all before the tier's autobuyer is active, and the whole thing
// disappears everywhere once every tier is smart (see MainPage's allTiersSmart).
const AutomationCell = styled.div`
  display: flex;
  grid-area: automate;
  min-width: 0;
`

const AutomationButton = styled(Button)`
  width: 100%;
  font-size: 0.72em;
  padding: 0.3em 0.3em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.68em;
    padding: 0.28em 0.25em;
  }
`

const AutomationBadge = styled.span`
  align-items: center;
  color: ${props => props.$color};
  display: flex;
  font-size: 0.72em;
  justify-content: center;
  ${gridCell}
`

// Deliberately small — Reset is a dev-only convenience, not a prominent action, and its own
// confirm() prompt (see handleResetClick) is the real guard against an accidental click.
const ResetButton = styled(Button)`
  font-size: 0.72em;
  padding: 0.3em 0.55em;
`

const formatCost = (amount, resourceId) =>
  resourceId === MONEY_ID
    ? formatCurrency(amount)
    : `${formatAmount(amount)} ${RESOURCE_SYMBOL(resourceId)}`

// "1.1" / "1.21" / "1" — rounds to 2 decimal places and trims a trailing ".00"/trailing zero,
// used only for the autobuyer's purchase-speed multiplier (getAutobuyerAttemptRate).
const formatRate = value => (Math.round(value * 100) / 100).toFixed(2).replace(/\.?0+$/, '')

const MainPage = () => {
  const { actions, dismissOfflineProgress, offlineProgress, resetGame, state } = useIncrementalGame()
  const { prestige } = state
  const canPrestige = state.resources[MONEY_ID] >= GOOGOL
  const prestigeBonus = getPrestigeProductionMultiplier(prestige.points)
  const prestigePointsPreview = getPrestigePointsAwarded(state.resources[MONEY_ID])
  const prestigeProgressPercent = getPrestigeProgressPercent(state.resources[MONEY_ID])
  const prestigeLabel = 'Prestige (requires 1 Googol Money)'
  // Reset is irreversible (wipes the whole save), so it's gated behind a native confirm() rather
  // than firing immediately on click — there's no modal/confirm component elsewhere in this app
  // to reuse, and this is a single dev-only button, so window.confirm is the simplest fit.
  const handleResetClick = () => {
    if (window.confirm('Erase all progress and start over? This cannot be undone.')) {
      resetGame()
    }
  }
  // Tracks each tier's tierProductionAccumulators value from the last render where it actually
  // changed (a tick or a prestige — see the effect below), so getTierProductionProgressPercent can
  // tell "just delivered" (about to wrap to a small remainder) apart from "genuinely empty" (see
  // "Per-tier tick-progress ring" in CLAUDE.md). Starts empty, so the very first render (including
  // right after loading a save with a mid-cycle accumulator) shows the raw resumed value truthfully.
  const previousAccumulatorsRef = useRef({})
  // Whether each tier's ring showed a full 100% as of the last real tick — if so, this tick's drop
  // back down to the new cycle's small remainder should apply instantly (no CSS transition), since
  // animating that drop would visibly look like the ring "rewinding" instead of resetting.
  // wasFullRef is only ever written from the effect below (after a real tick commits, never
  // mid-render), so it can't go stale/inconsistent under StrictMode's double-render checks;
  // currentlyFullRef is the render-phase scratch space the effect promotes into wasFullRef once a
  // tick actually lands — writing it during render is safe since, unlike reading-then-overwriting
  // the same ref in one pass, it's a plain function of this render's own (already-stable) inputs,
  // so re-invoking the same render twice just assigns it the same value both times.
  const wasFullRef = useRef({})
  const currentlyFullRef = useRef({})
  useEffect(() => {
    previousAccumulatorsRef.current = state.tierProductionAccumulators
    wasFullRef.current = currentlyFullRef.current
  }, [state.tierProductionAccumulators])
  // Snapshot of which tiers were already unlocked as of this page load (captured once, via a
  // lazy initializer, from whatever loadGameState() returned) — a tier unlocked before this
  // load never plays the reveal animation, even though every unlocked row technically "mounts"
  // fresh on every load; only a tier unlocking during this session (not in the snapshot) does.
  const [initialUnlockedIds] = useState(() =>
    new Set(TIER_DEFINITIONS.filter(tier => isTierUnlocked(state)(tier)).map(tier => tier.id))
  )
  // Smart requires Auto-upgrade automation to already be bought (see buySmartAutobuyer), so being
  // smart implies being automated too — once every tier is smart, there's nothing left in this
  // whole progression for any tier, so the per-tier indicator disappears everywhere and a
  // one-line notice explains why, rather than leaving a permanent badge on all 10 rows forever.
  const allTiersSmart = TIER_DEFINITIONS.every(tier => state.smartAutobuyer?.[tier.id])

  // All production and purchasing freezes the instant Money reaches GOOGOL (see
  // isProductionFrozen in engine.js) — Prestige is the only remaining action. The first time
  // this ever happens (before the player has prestiged even once) it's a mandatory full-screen
  // takeover; every time after that, it's a compact banner pinned to the top of the page instead,
  // since the player already knows what Prestige does.
  const isFrozen = isProductionFrozen(state)
  const isFirstRun = prestige.count === 0
  const showFullScreenPrompt = isFrozen && isFirstRun
  const showTopPrestigeBar = isFrozen && !isFirstRun
  // During the first run only, the normal Prestige card stays hidden until the player has
  // bought 10 of the very last tier — once they've prestiged at least once, it's always shown
  // (in its usual spot) whenever production isn't frozen.
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  const showBottomPrestigeCard = !isFrozen && (!isFirstRun || getTierPurchasedCount(state, lastTier.id) >= 10)

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

  // Auto-focus the full-screen prompt's Prestige button when it appears — it's the only
  // interactive element on screen while it's showing (no close/dismiss control by design).
  const fullScreenPrestigeButtonRef = useRef(null)
  useEffect(() => {
    if (showFullScreenPrompt) fullScreenPrestigeButtonRef.current?.focus()
  }, [showFullScreenPrompt])

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
              speed, or spend them to automate autobuyer Upgrades
            </li>
            <li>Keeps your autobuyers, automations, and Prestige Points</li>
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
            ✦ Prestige Now
          </Button>
        </FullScreenCard>
      </FullScreenOverlay>
    )
  }

  return (
    <RootDiv>
      <TickPercentProperty />
      {showTopPrestigeBar && (
        <>
          <TopPrestigeBar aria-label="prestige available banner">
            <MutedText>1 Googol Money reached — production has stopped.</MutedText>
            <Button
              aria-label={prestigeLabel}
              color="#fbbf24"
              onClick={actions.prestige}
              title="Awards Prestige Points and resets your resources"
              type="button"
              $pulse
            >
              ✦ Prestige
            </Button>
          </TopPrestigeBar>
          <TopPrestigeBarSpacer />
        </>
      )}

      <Header>
        <h1>Tens</h1>
        <MutedText>Build by powers of ten. Prestige for Prestige Points.</MutedText>
      </Header>

      {offlineProgress && (
        <StatCard aria-label="offline progress notice">
          <TopRow>
            <MutedText>
              Welcome back! You were away for {formatOfflineDuration(offlineProgress.elapsedRealSeconds)}
              {' — simulated '}{formatOfflineDuration(offlineProgress.effectiveSeconds)} of progress at 10% speed.
            </MutedText>
            <Button
              aria-label="Dismiss offline progress notice"
              color="darkgrey"
              onClick={dismissOfflineProgress}
              title="Dismiss this notice"
              type="button"
            >
              Dismiss
            </Button>
          </TopRow>
        </StatCard>
      )}

      <MoneyCard aria-label="money display">
        <Money>{formatCurrency(state.resources[MONEY_ID])}</Money>
      </MoneyCard>

      {!isFirstRun && (
        <StatCard aria-label="prestige points display">
          <MutedText>
            <GoldText>{formatAmount(prestige.points)} PP</GoldText>
            {' · '}+{Math.round((prestigeBonus - 1) * 100)}% production speed
          </MutedText>
        </StatCard>
      )}

      {allTiersSmart && (
        <StatCard aria-label="full smart autobuyer notice">
          <MutedText>
            🧠 Every tier's autobuyer is fully automated and smart — since there's nothing left to
            upgrade, this indicator won't be shown per tier anymore.
          </MutedText>
        </StatCard>
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
          const autobuyerLevel = state.autobuyers[tier.id] ?? null
          const isAutobuyerLocked = autobuyerLevel === null
          const autobuyerAttemptRate = getAutobuyerAttemptRate(autobuyerLevel)
          const isAutomated = state.autobuyerAutomation?.[tier.id] ?? false
          const automationCost = getAutobuyerAutomationCost(tier.id)
          const canAutomate = !isFrozen && !isAutomated && !isAutobuyerLocked && prestige.points >= automationCost
          // "Smart" buys this tier one at a time until 10 lifetime purchases, then switches to
          // the normal full-block batching. It requires Auto-upgrade automation to already be
          // bought (see buySmartAutobuyer) — it's the next purchase in the same progression, not
          // a parallel one, so the tier's automate slot only ever shows a single control at a
          // time: Automate → (once bought) Smart → (once bought) the "Smart" badge. Once every
          // tier is smart (which implies every tier is also automated), the whole slot disappears
          // (see allTiersSmart above).
          const isSmart = state.smartAutobuyer?.[tier.id] ?? false
          const smartCost = getSmartAutobuyerCost(tier.id)
          const canBuySmart = !isFrozen && !isSmart && isAutomated && prestige.points >= smartCost
          // Production no longer depends on the autobuyer at all — every 10 lifetime purchases
          // of a tier (manual or automatic) doubles its own production, the same boundary where
          // its cost jumps 10x (see getPurchaseMilestoneMultiplier). This is the raw amount
          // delivered in one lump batch once the tick-progress ring below fills — not a per-second
          // average — matching exactly what tickGame credits when tierProductionAccumulators
          // crosses this tier's own base tickspeed (see "Tier production tickspeed" in CLAUDE.md).
          const production = owned * prestigeBonus * getPurchaseMilestoneMultiplier(purchased)
          const rawTickProgressPercent = getTierProductionProgressPercent(
            state, tier.id, previousAccumulatorsRef.current[tier.id]
          )
          const isRingInstant = wasFullRef.current[tier.id] ?? false
          currentlyFullRef.current[tier.id] = rawTickProgressPercent === 100
          // The tick right after a delivery already has some of its new cycle's own time banked
          // (e.g. a 2s tier is already back up to a raw 50% one real tick later), which would make
          // the ring's instant post-delivery snap land part-way full instead of empty. Forcing it
          // to 0 here (only when the raw value isn't ALSO 100 — see tier01's always-100 case below)
          // means the next tick's normal, non-instant transition animates a full, clean climb from
          // empty back up to that tick's real value, rather than a shorter climb starting mid-way.
          // This visual-only value deliberately isn't what's reported via aria-valuenow below —
          // several App.test.jsx tests using userEvent hung/timed out in this jsdom+Vitest
          // environment whenever the *accessible* value diverged from the plain
          // getTierProductionProgressPercent computation (root cause not fully identified; the
          // same divergence in the CSS-only $percent value below was fine). Keeping aria-valuenow
          // tied to the unmodified raw value sidesteps that entirely, and arguably reports the
          // more accurate number anyway — the forced-to-0 value is a display nicety, not the true
          // accumulator state.
          const tickProgressPercent = (isRingInstant && rawTickProgressPercent !== 100) ? 0 : rawTickProgressPercent
          // Activating (null → 1) and upgrading (N → N+1) are the same paid action, always in
          // the tier's own resource — there's no separate XP-gated unlock step (see buyAutobuyer).
          const autobuyerCost = getAutobuyerCost(autobuyerLevel ?? 0)
          // Spends the tier's own resource (resources[tier.id] === owned[tier.id]), so the
          // button must stay disabled until at least 1 generator would remain afterward —
          // matching buyAutobuyer's own `available >= cost + 1` guard in engine.js.
          const canUpgradeAutobuyer = resources >= autobuyerCost + 1 && !isFrozen
          const buyLabel = `Buy${affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} for ${formatCurrency(displayCost)}`
          const upgradeLabel = isAutobuyerLocked
            ? `Unlock for ${formatCost(autobuyerCost, tier.id)}`
            : `Upgrade (+10% purchase speed) for ${formatCost(autobuyerCost, tier.id)}`
          // Compact visible text: an icon in place of the "Buy"/"Upgrade"/"Unlock" word, and
          // the tier's short symbol (via formatCost) in place of its full name. The full
          // sentence stays in aria-label/title for assistive tech. The Upgrade state also gets
          // a "+10%" prefix so the speed-up is visible without needing to hover for the title.
          const buyVisibleLabel = `🛒${affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} ${formatCurrency(displayCost)}`
          const upgradeVisibleLabel = isAutobuyerLocked
            ? `🔓 ${formatCost(autobuyerCost, tier.id)}`
            : `⚙ +10% ${formatCost(autobuyerCost, tier.id)}`
          // Live "how close am I" meter for the Upgrade/Unlock button, even while disabled.
          const autobuyerProgressPercent = Math.min(100, Math.round(
            (resources / (autobuyerCost + 1)) * 100
          ))
          const accent = TIER_ACCENT_COLORS[tierIndex % TIER_ACCENT_COLORS.length]

          return (
            <TierLine
              key={tier.id}
              aria-label={`${tier.name} layer`}
              $accent={accent}
              $animateReveal={!initialUnlockedIds.has(tier.id)}
            >
              <TierName>
                <TierNameLabel>{tier.name}</TierNameLabel>
                {autobuyerLevel > 0 && (
                  <GreenText title={`Autobuyer level ${autobuyerLevel} — purchases ×${formatRate(autobuyerAttemptRate)} as often`}>
                    ⚙ Lv.{autobuyerLevel} (×{formatRate(autobuyerAttemptRate)} speed)
                  </GreenText>
                )}
              </TierName>
              <OwnedText>Owned: {formatAmount(owned)}</OwnedText>
              <PurchasedText>Purchased: {formatAmount(purchased)}</PurchasedText>
              <ProductionCell>
                <ProductionText>
                  +{tier.producesResourceId === MONEY_ID
                    ? formatCurrency(production)
                    : `${formatAmount(production)} ${RESOURCE_SYMBOL(tier.producesResourceId)}`}
                </ProductionText>
                <TickProgressRing $percent={tickProgressPercent} $instant={isRingInstant}>
                  <VisuallyHidden
                    role="progressbar"
                    aria-label={`${tier.name} production tick progress`}
                    aria-valuenow={rawTickProgressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </TickProgressRing>
              </ProductionCell>
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
                {buyVisibleLabel}
                <VisuallyHidden
                  role="progressbar"
                  aria-label={`${tier.name} cost-block progress`}
                  aria-valuenow={doneInBlock}
                  aria-valuemin={0}
                  aria-valuemax={10}
                />
              </BuyButton>
              <UpgradeButton
                aria-label={upgradeLabel}
                color={canUpgradeAutobuyer ? '#4ade80' : 'darkgrey'}
                disabled={!canUpgradeAutobuyer}
                onClick={() => actions.buyAutobuyer(tier.id)}
                title={isAutobuyerLocked ? 'Unlocks automatic buying for this tier' : 'Makes this autobuyer 10% faster'}
                $progress={autobuyerProgressPercent}
                $pulse={canUpgradeAutobuyer}
              >
                {upgradeVisibleLabel}
                <VisuallyHidden
                  role="progressbar"
                  aria-label={`${tier.name} autobuyer progress`}
                  aria-valuenow={autobuyerProgressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </UpgradeButton>
              {!isFirstRun && !isAutobuyerLocked && !allTiersSmart && (
                <AutomationCell>
                  {isSmart ? (
                    <AutomationBadge $color="#a78bfa" title="This tier buys one at a time until 10 purchases, then in blocks of 10, automatically">
                      🧠 Smart
                    </AutomationBadge>
                  ) : isAutomated ? (
                    <AutomationButton
                      aria-label={`Make ${tier.name}'s autobuyer smart (buy singly until 10 purchases, then in blocks of 10) for ${smartCost} Prestige Point${smartCost === 1 ? '' : 's'}`}
                      color={canBuySmart ? '#a78bfa' : 'darkgrey'}
                      disabled={!canBuySmart}
                      onClick={() => actions.buySmartAutobuyer(tier.id)}
                      title="Spend Prestige Points so this tier buys one at a time until 10 purchases, then in blocks of 10 — fixes an early-game stall where a full 10-unit block isn't affordable yet"
                      type="button"
                    >
                      🧠 {smartCost}
                    </AutomationButton>
                  ) : (
                    <AutomationButton
                      aria-label={`Automate ${tier.name} autobuyer upgrades for ${automationCost} Prestige Point${automationCost === 1 ? '' : 's'}`}
                      color={canAutomate ? '#38bdf8' : 'darkgrey'}
                      disabled={!canAutomate}
                      onClick={() => actions.buyAutobuyerAutomation(tier.id)}
                      title="Spend Prestige Points to make this tier's autobuyer Upgrades happen automatically, forever"
                      type="button"
                    >
                      🤖 {automationCost}
                    </AutomationButton>
                  )}
                </AutomationCell>
              )}
            </TierLine>
          )
        })}
      </TierList>

      {showBottomPrestigeCard && (
        <PrestigeCard aria-label="prestige panel">
          <div>
            <h2>Prestige</h2>
            <MutedText id="prestige-description">
              Reach 1 Googol Money to earn Prestige Points (more the further past Googol you get).
              {!isFirstRun && ' Each unspent point adds +1% production speed, or spend points to automate autobuyer Upgrades.'}
              {' '}Resets your resources when reached.
            </MutedText>
          </div>
          <div>
            <GoldText>Prestiged {prestige.count} time{prestige.count === 1 ? '' : 's'}</GoldText>
            {!isFirstRun && (
              <MutedText>{formatAmount(prestige.points)} PP unspent{' · '}×{formatRate(prestigeBonus)} production speed</MutedText>
            )}
            <MutedText>
              {formatCurrency(state.resources[MONEY_ID])} / 1 Googol Money{' · '}{prestigeProgressPercent}%
            </MutedText>
          </div>
          <Button
            aria-describedby="prestige-description"
            aria-label={prestigeLabel}
            color={canPrestige ? '#fbbf24' : 'darkgrey'}
            disabled={!canPrestige}
            onClick={actions.prestige}
            title="Awards Prestige Points and resets your resources"
            type="button"
            $progress={prestigeProgressPercent}
            $progressColor="#fbbf24"
            $pulse={canPrestige}
          >
            ✦ Prestige
            <VisuallyHidden
              role="progressbar"
              aria-label="Prestige progress"
              aria-valuenow={prestigeProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Button>
          {allTiersSmart && (
            <>
              {isAutoPrestigeActive && (
                <MutedText title={`Auto-Prestige fires roughly every ${autoPrestigeIntervalSeconds}s once Money reaches 1 Googol`}>
                  🔁 Auto-Prestige Lv.{autoPrestigeLevel} (every ~{autoPrestigeIntervalSeconds}s)
                </MutedText>
              )}
              <Button
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
              >
                🔁 {isAutoPrestigeActive ? 'Upgrade' : 'Auto-Prestige'} for {autoPrestigeCost} PP
              </Button>
            </>
          )}
        </PrestigeCard>
      )}

      {import.meta.env.DEV && (
        <ResetButton
          aria-describedby="reset-description"
          aria-label="Reset game"
          color={isFrozen ? 'darkgrey' : '#a3a3a3'}
          disabled={isFrozen}
          type="button"
          onClick={handleResetClick}
          title={isFrozen ? 'Prestige first — production is frozen at 1 Googol Money' : 'Erases all progress and starts over (asks for confirmation)'}
        >
          ↺ Reset
          <VisuallyHidden id="reset-description">Erases all progress and starts over</VisuallyHidden>
        </ResetButton>
      )}
    </RootDiv>
  )
}

export default MainPage
