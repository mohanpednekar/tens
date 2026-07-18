import Button, { VisuallyHidden } from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency, formatOfflineDuration, getAutobuyerAttemptRate, getAutobuyerAutomationCost, getAutobuyerCost, getAutoPrestigeAttemptRate, getAutoPrestigeCost, getPrestigePointsAwarded, getPrestigeProductionMultiplier, getPrestigeProgressPercent, getPurchaseMilestoneMultiplier, getSmartAutobuyerCost, getSpeedUpMultiplier, getSpeedUpRequirement, getTierAffordableQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, isProductionFrozen, isTierUnlocked } from 'game/engine'
import { AUTO_SPEED_UP_COST, GOOGOL, MONEY_ID, PRESTIGE_SPEED_BONUS_UNLOCK_COST, RESOURCE_SYMBOL, TIER_DEFINITIONS } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

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
// Top line: name (+ compact autobuyer badge), the owned count, the production figure, and the
// PP-based Automate/Smart control ('automate' area) at the right edge. Bottom line: just the two
// buttons, each spanning two of the four tracks — the track pairs sum equally (col1+col2 =
// col3+col4) so Upgrade and Buy each take exactly half the row's width. Buy sits rightmost, not
// Upgrade — Buy is clicked constantly while Upgrade/Unlock is an occasional action, and the
// rightmost slot is the natural resting spot for a thumb/mouse that's about to click again.
const TierLine = styled(StatCard)`
  display: grid;
  grid-template-areas:
    'name owned production automate'
    'upgrade upgrade buy buy';
  grid-template-columns: 1.3fr 0.7fr 1.2fr 0.8fr;
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
    /* Same 2-row areas as desktop; only the column weights shift, still summing to equal
       halves for the buttons. */
    grid-template-columns: 1.25fr 0.75fr 1.3fr 0.7fr;
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
// TopPrestigeBar is showing ($belowBar), the stick position drops below it instead of
// underlapping it.
const StickyBalances = styled.div`
  background: #050505;
  display: flex;
  flex-direction: ${props => (props.$compressed ? 'row' : 'column')};
  gap: ${props => (props.$compressed ? '0.5rem' : '0.85rem')};
  position: sticky;
  top: ${props => (props.$belowBar ? '3.75rem' : '0')};
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

    ${Money} {
      font-size: 1em;
      padding: 0;
    }

    p {
      font-size: 0.85em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
// (and textContent-based tests) still resolve either way.
const InfoDetails = styled.details`
  summary {
    cursor: pointer;
    user-select: none;
    width: fit-content;
  }

  summary:hover {
    color: #d4d4d4;
  }

  summary h2 {
    display: inline;
    margin: 0;
  }

  p {
    margin-top: 0.4rem;
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
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.78em;
  }
`


const ProductionText = styled(MutedText)`
  grid-area: production;
  font-size: 0.85em;
  text-align: right;
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

// Sits at the right edge of the tier's name row (TierLine's 'automate' area) — holds exactly
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

// Deliberately small — Reset is not a prominent action, and its own confirm() prompt (see
// handleResetClick) is the real guard against an accidental click.
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
  // Reset is irreversible (wipes the whole save), so it's gated behind a native confirm() rather
  // than firing immediately on click — there's no modal/confirm component elsewhere in this app
  // to reuse, so window.confirm is the simplest fit.
  const handleResetClick = () => {
    if (window.confirm('Erase all progress and start over? This cannot be undone.')) {
      resetGame()
    }
  }
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

  // Speed Up: a more frequent soft-reset than Prestige, available well before Money reaches
  // GOOGOL (see speedUpGame in engine.js) — once the last tier reaches that cycle's requirement
  // (getSpeedUpRequirement(speedUpCount): 10 lifetime purchases for the first activation, 20 for
  // the second, 30 for the third, …), it resets tiers/resources but permanently doubles
  // production speed, stacking with every prior activation. Gated on the last tier being unlocked
  // at all, same progressive-disclosure principle as the first-run Prestige card gate above, so it
  // doesn't clutter the page before tier10 even exists.
  const lastTierUnlocked = isTierUnlocked(state)(lastTier)
  const speedUpCount = state.speedUpCount ?? 0
  const speedUpMultiplier = getSpeedUpMultiplier(speedUpCount)
  const nextSpeedUpMultiplier = getSpeedUpMultiplier(speedUpCount + 1)
  const speedUpRequirement = getSpeedUpRequirement(speedUpCount)
  const lastTierPurchased = getTierPurchasedCount(state, lastTier.id)
  const speedUpProgressPercent = Math.min(100, Math.round((lastTierPurchased / speedUpRequirement) * 100))
  const canSpeedUp = !isFrozen && lastTierPurchased >= speedUpRequirement
  // Automates Speed Up (see buyAutoSpeedUp in engine.js) — gated on !isFirstRun like every other
  // PP-spending control (see "Prestige info is hidden until first prestige"), but NOT on
  // allTiersSmart the way Auto-Prestige is: Speed Up is meant to help early/mid-game, well before
  // that endgame milestone.
  const isAutoSpeedUpActive = state.autoSpeedUp ?? false
  const canBuyAutoSpeedUp = !isFrozen && !isAutoSpeedUpActive && !isFirstRun && prestige.points >= AUTO_SPEED_UP_COST

  // One-time PP unlock for the passive production-speed bonus (see buyPrestigeSpeedBonus in
  // engine.js) — before this is bought, prestigeBonus above is a flat ×1 regardless of balance.
  const canBuySpeedBonus = !isFrozen && !state.prestigeSpeedBonusUnlocked && prestige.points >= PRESTIGE_SPEED_BONUS_UNLOCK_COST
  // PP upgrades reveal one by one, cheapest first: the 10000 PP Speed Bonus unlock (its button,
  // its "locked" teaser text, and its description sentence alike) stays hidden until the far
  // cheaper Auto Speed Up (100 PP) has been bought, so a fresh post-prestige page isn't fronting
  // a cost that's still thousands of points away. A save that already unlocked the bonus stays
  // revealed regardless. This is UI-only — buyPrestigeSpeedBonus in engine.js doesn't check it.
  const speedBonusRevealed = isAutoSpeedUpActive || state.prestigeSpeedBonusUnlocked

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
      {showTopPrestigeBar && (
        <>
          <TopPrestigeBar aria-label="prestige available banner">
            <MutedText>1 Googol Money reached — production has stopped.</MutedText>
            <Button
              aria-label={prestigeAriaLabel}
              color="#fbbf24"
              onClick={actions.prestige}
              title="Awards Prestige Points and resets your resources"
              type="button"
              $pulse
            >
              ✦ Prestige +{formatAmount(prestigeAwardPreview)} PP
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

      <BalancesSentinel ref={balancesSentinelRef} aria-hidden="true" />
      <StickyBalances $compressed={balancesCompressed} $belowBar={showTopPrestigeBar}>
        <CenteredCard aria-label="money display">
          <Money>{formatCurrency(state.resources[MONEY_ID])}</Money>
        </CenteredCard>

        {!isFirstRun && (
          <CenteredCard aria-label="prestige points display">
            <MutedText>
              <GoldText>{formatAmount(prestige.points)} PP</GoldText>
              {state.prestigeSpeedBonusUnlocked && ` · +${Math.round((prestigeBonus - 1) * 100)}% production speed`}
              {!state.prestigeSpeedBonusUnlocked && speedBonusRevealed && ' · production speed bonus locked'}
            </MutedText>
          </CenteredCard>
        )}
      </StickyBalances>

      {allTiersSmart && (
        <StatCard aria-label="full smart autobuyer notice">
          <InfoDetails>
            <summary>🧠 Every tier is fully smart</summary>
            <MutedText>
              Every tier's autobuyer is fully automated and smart — since there's nothing left to
              upgrade, this indicator won't be shown per tier anymore.
            </MutedText>
          </InfoDetails>
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
          // The first tier's Automate purchase is an exception: it activates its autobuyer (at
          // the baseline level) as part of the same 1 PP purchase if it isn't already active,
          // instead of requiring it be bought separately with Money first (see
          // buyAutobuyerAutomation in engine.js) — every other tier still needs its autobuyer
          // already active before Automate becomes available.
          const isFirstTier = tierIndex === 0
          const bootstrapsAutobuyer = isFirstTier && isAutobuyerLocked
          const canAutomate = !isFrozen && !isAutomated && (!isAutobuyerLocked || isFirstTier) && prestige.points >= automationCost
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
          // its cost steps up via getTierCost's Fibonacci-driven multiplier (see
          // getPurchaseMilestoneMultiplier/getTierCost). This is the raw amount
          // delivered in one lump batch once the tick-progress ring below fills — not a per-second
          // average — matching exactly what tickGame credits when tierProductionAccumulators
          // crosses this tier's own base tickspeed (see "Tier production tickspeed" in CLAUDE.md).
          // Floored to match tickGame's own floored production credit — prestigeBonus is the only
          // fractional factor here (getPurchaseMilestoneMultiplier and getSpeedUpMultiplier are
          // always powers of 2), so without flooring this preview could show a fraction that
          // never actually lands.
          const production = Math.floor(owned * prestigeBonus * speedUpMultiplier * getPurchaseMilestoneMultiplier(purchased))
          // Activating (null → 1) and upgrading (N → N+1) are the same paid action, always in
          // the tier's own resource — there's no separate XP-gated unlock step (see buyAutobuyer).
          const autobuyerCost = getAutobuyerCost(autobuyerLevel ?? 0)
          // Spends the tier's own resource (resources[tier.id] === owned[tier.id]), so the
          // button must stay disabled until at least 1 generator would remain afterward —
          // matching buyAutobuyer's own `available >= cost + 1` guard in engine.js.
          const canUpgradeAutobuyer = resources >= autobuyerCost + 1 && !isFrozen
          const buyLabel = `Buy${affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} for ${formatCurrency(displayCost)} (level ${formatAmount(purchased)})`
          const upgradeLabel = isAutobuyerLocked
            ? `Unlock for ${formatCost(autobuyerCost, tier.id)}`
            : `Upgrade (+10% purchase speed) for ${formatCost(autobuyerCost, tier.id)}`
          // Compact visible text: an icon in place of the "Buy"/"Upgrade"/"Unlock" word, and
          // the tier's short symbol (via formatCost) in place of its full name. The full
          // sentence stays in aria-label/title for assistive tech. The Upgrade state also gets
          // a "+10%" prefix so the speed-up is visible without needing to hover for the title.
          // Buy also carries the tier's level (lifetime purchase count — the figure the removed
          // "Level:" cell used to show), since Buy is the action that raises it.
          const buyVisibleLabel = `🛒 Lv.${formatAmount(purchased)}${affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} ${formatCurrency(displayCost)}`
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
                    ⚙ ×{formatRate(autobuyerAttemptRate)}
                  </GreenText>
                )}
              </TierName>
              <OwnedText title="Owned">
                <VisuallyHidden>Owned: </VisuallyHidden>
                {formatAmount(owned)}
              </OwnedText>
              <ProductionText>
                +{tier.producesResourceId === MONEY_ID
                  ? formatCurrency(production)
                  : `${formatAmount(production)} ${RESOURCE_SYMBOL(tier.producesResourceId)}`}
              </ProductionText>
              {!isFirstRun && (!isAutobuyerLocked || isFirstTier) && !allTiersSmart && (
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
                      $progress={ppProgressPercent(smartCost)}
                      $progressColor="#a78bfa"
                    >
                      🧠 {smartCost}
                      <VisuallyHidden
                        role="progressbar"
                        aria-label={`${tier.name} smart autobuyer Prestige Point progress`}
                        aria-valuenow={Math.min(prestige.points, smartCost)}
                        aria-valuemin={0}
                        aria-valuemax={smartCost}
                      />
                    </AutomationButton>
                  ) : (
                    <AutomationButton
                      aria-label={
                        bootstrapsAutobuyer
                          ? `Unlock and automate ${tier.name}'s autobuyer for ${automationCost} Prestige Point${automationCost === 1 ? '' : 's'}`
                          : `Automate ${tier.name} autobuyer upgrades for ${automationCost} Prestige Point${automationCost === 1 ? '' : 's'}`
                      }
                      color={canAutomate ? '#38bdf8' : 'darkgrey'}
                      disabled={!canAutomate}
                      onClick={() => actions.buyAutobuyerAutomation(tier.id)}
                      title={
                        bootstrapsAutobuyer
                          ? 'Spend Prestige Points to unlock and automate this tier\'s autobuyer forever, with no Money cost needed to activate it first'
                          : 'Spend Prestige Points to make this tier\'s autobuyer Upgrades happen automatically, forever'
                      }
                      type="button"
                      $progress={ppProgressPercent(automationCost)}
                      $progressColor="#38bdf8"
                    >
                      🤖 {automationCost}
                      <VisuallyHidden
                        role="progressbar"
                        aria-label={`${tier.name} automation Prestige Point progress`}
                        aria-valuenow={Math.min(prestige.points, automationCost)}
                        aria-valuemin={0}
                        aria-valuemax={automationCost}
                      />
                    </AutomationButton>
                  )}
                </AutomationCell>
              )}
              <UpgradeButton
                aria-label={upgradeLabel}
                color={canUpgradeAutobuyer ? '#4ade80' : 'darkgrey'}
                disabled={!canUpgradeAutobuyer}
                onClick={() => actions.buyAutobuyer(tier.id)}
                title={isAutobuyerLocked
                  ? 'Unlocks automatic buying for this tier'
                  : `Autobuyer level ${autobuyerLevel} (×${formatRate(autobuyerAttemptRate)} purchase speed) — the next level makes it 10% faster`}
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
            </TierLine>
          )
        })}
      </TierList>

      {lastTierUnlocked && (
        <SpeedUpCard aria-label="speed up panel">
          <InfoDetails>
            <summary><h2>Speed Up</h2></summary>
            <MutedText id="speed-up-description">
              Buy {speedUpRequirement} {lastTier.name} to trigger a Speed Up: resets your tiers and
              resources (keeps autobuyers, automations, and Prestige Points) and permanently
              doubles production speed. Each Speed Up needs a full block of 10 more than the last.
            </MutedText>
          </InfoDetails>
          <Button
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
            ⚡ ×{formatRate(nextSpeedUpMultiplier)}{' · '}{speedUpProgressPercent}%
            <VisuallyHidden
              role="progressbar"
              aria-label="Speed Up progress"
              aria-valuenow={speedUpProgressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Button>
          {!isFirstRun && (
            isAutoSpeedUpActive ? (
              <MutedText title="Speed Up now triggers automatically the instant it's eligible">
                🔁 Auto Speed Up active
              </MutedText>
            ) : (
              <Button
                aria-label={`Enable Auto Speed Up for ${AUTO_SPEED_UP_COST} Prestige Points`}
                color={canBuyAutoSpeedUp ? '#38bdf8' : 'darkgrey'}
                disabled={!canBuyAutoSpeedUp}
                onClick={actions.buyAutoSpeedUp}
                title="Spend Prestige Points so Speed Up happens automatically, forever, the instant it's eligible"
                type="button"
                $progress={ppProgressPercent(AUTO_SPEED_UP_COST)}
                $progressColor="#38bdf8"
              >
                🔁 Auto Speed Up for {AUTO_SPEED_UP_COST} PP
                <VisuallyHidden
                  role="progressbar"
                  aria-label="Auto Speed Up Prestige Point progress"
                  aria-valuenow={Math.min(prestige.points, AUTO_SPEED_UP_COST)}
                  aria-valuemin={0}
                  aria-valuemax={AUTO_SPEED_UP_COST}
                />
              </Button>
            )
          )}
        </SpeedUpCard>
      )}

      {showBottomPrestigeCard && (
        <PrestigeCard aria-label="prestige panel">
          <InfoDetails>
            <summary><h2>Prestige</h2></summary>
            <MutedText id="prestige-description">
              Reach 1 Googol Money to earn Prestige Points (more the further past Googol you get).
              {!isFirstRun && (speedBonusRevealed
                ? ` Spend ${PRESTIGE_SPEED_BONUS_UNLOCK_COST} points once to unlock +1% production speed per unspent point, or spend points to automate autobuyer Upgrades.`
                : ' Spend points to automate autobuyer Upgrades.')}
              {' '}Resets your resources when reached.
            </MutedText>
          </InfoDetails>
          <div>
            <GoldText>Prestiged {prestige.count} time{prestige.count === 1 ? '' : 's'}</GoldText>
            {!isFirstRun && (
              <MutedText>
                {formatAmount(prestige.points)} PP unspent
                {state.prestigeSpeedBonusUnlocked && ` · ×${formatRate(prestigeBonus)} production speed`}
                {!state.prestigeSpeedBonusUnlocked && speedBonusRevealed && ' · production speed bonus locked'}
              </MutedText>
            )}
          </div>
          {!isFirstRun && !state.prestigeSpeedBonusUnlocked && speedBonusRevealed && (
            <Button
              aria-label={`Unlock Prestige Point production speed bonus for ${PRESTIGE_SPEED_BONUS_UNLOCK_COST} Prestige Points`}
              color={canBuySpeedBonus ? '#38bdf8' : 'darkgrey'}
              disabled={!canBuySpeedBonus}
              onClick={actions.buyPrestigeSpeedBonus}
              title="Spend Prestige Points once to enable +1% production speed per unspent Prestige Point"
              type="button"
              $progress={ppProgressPercent(PRESTIGE_SPEED_BONUS_UNLOCK_COST)}
              $progressColor="#38bdf8"
            >
              🚀 Unlock Speed Bonus for {PRESTIGE_SPEED_BONUS_UNLOCK_COST} PP
              <VisuallyHidden
                role="progressbar"
                aria-label="Speed bonus unlock Prestige Point progress"
                aria-valuenow={Math.min(prestige.points, PRESTIGE_SPEED_BONUS_UNLOCK_COST)}
                aria-valuemin={0}
                aria-valuemax={PRESTIGE_SPEED_BONUS_UNLOCK_COST}
              />
            </Button>
          )}
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
            ✦ +{formatAmount(prestigeAwardPreview)} PP{' · '}{prestigeProgressPercent}%
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
                $progress={ppProgressPercent(autoPrestigeCost)}
                $progressColor="#38bdf8"
              >
                🔁 {isAutoPrestigeActive ? 'Upgrade' : 'Auto-Prestige'} for {autoPrestigeCost} PP
                <VisuallyHidden
                  role="progressbar"
                  aria-label="Auto-Prestige Prestige Point progress"
                  aria-valuenow={Math.min(prestige.points, autoPrestigeCost)}
                  aria-valuemin={0}
                  aria-valuemax={autoPrestigeCost}
                />
              </Button>
            </>
          )}
        </PrestigeCard>
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
        ↺ Reset
        <VisuallyHidden id="reset-description">Erases all progress and starts over</VisuallyHidden>
      </ResetButton>
    </RootDiv>
  )
}

export default MainPage
