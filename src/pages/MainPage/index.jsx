import Button, { VisuallyHidden } from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency, formatOfflineDuration, getAutobuyerAttemptRate, getAutobuyerCost, getPrestigeProgressPercent, getPurchaseMilestoneMultiplier, getTierAffordableQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, isProductionFrozen, isTierUnlocked, productionMultiplier } from 'game/engine'
import { GOOGOL, MONEY_ID, RESOURCE_SYMBOL, TIER_DEFINITIONS } from 'game/layers'
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
// Buy sits rightmost, not Upgrade — Buy is clicked constantly while Upgrade/Unlock is an
// occasional action, and the rightmost slot is the natural resting spot for a thumb/mouse
// that's about to click again.
const TierLine = styled(StatCard)`
  display: grid;
  grid-template-areas: 'name owned purchased production upgrade buy';
  grid-template-columns: 1fr 0.75fr 0.8fr 0.9fr 1.05fr 1.05fr;
  align-items: center;
  column-gap: 0.5rem;
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
      'upgrade upgrade upgrade buy buy buy';
    grid-template-columns: repeat(6, 1fr);
    row-gap: 0.3rem;
    column-gap: 0.35rem;
    padding: 0.4rem 0.55rem;
  }
`

const QuantityToggle = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`

const PrestigeCard = styled(StatCard)`
  border-color: #854d0e;
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
`

const TierName = styled.h3`
  font-size: 1em;
  margin: 0;
  grid-area: name;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.95em;
  }
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

const formatCost = (amount, resourceId) =>
  resourceId === MONEY_ID
    ? formatCurrency(amount)
    : `${formatAmount(amount)} ${RESOURCE_SYMBOL(resourceId)}`

// "1.1" / "1.21" / "1" — rounds to 2 decimal places and trims a trailing ".00"/trailing zero,
// used only for the autobuyer's purchase-speed multiplier (getAutobuyerAttemptRate).
const formatRate = value => (Math.round(value * 100) / 100).toFixed(2).replace(/\.?0+$/, '')

const MainPage = () => {
  const { actions, dismissOfflineProgress, offlineProgress, quantity, resetGame, setQuantity, state } = useIncrementalGame()
  const { prestige } = state
  const canPrestige = state.resources[MONEY_ID] >= GOOGOL
  const prestigeBonus = productionMultiplier(prestige.level)
  const prestigeProgressPercent = getPrestigeProgressPercent(state.resources[MONEY_ID])
  const prestigeLabel = 'Prestige (requires 1 Googol Money)'
  // Snapshot of which tiers were already unlocked as of this page load (captured once, via a
  // lazy initializer, from whatever loadGameState() returned) — a tier unlocked before this
  // load never plays the reveal animation, even though every unlocked row technically "mounts"
  // fresh on every load; only a tier unlocking during this session (not in the snapshot) does.
  const [initialUnlockedIds] = useState(() =>
    new Set(TIER_DEFINITIONS.filter(tier => isTierUnlocked(state)(tier)).map(tier => tier.id))
  )
  const moneyPerSec = TIER_DEFINITIONS
    .filter(t => t.producesResourceId === MONEY_ID)
    .reduce((sum, t) => sum + (state.owned[t.id] ?? 0), 0) * prestigeBonus

  // All production and purchasing freezes the instant Money reaches GOOGOL (see
  // isProductionFrozen in engine.js) — Prestige is the only remaining action. The first time
  // this ever happens (before the player has prestiged even once) it's a mandatory full-screen
  // takeover; every time after that, it's a compact banner pinned to the top of the page instead,
  // since the player already knows what Prestige does.
  const isFrozen = isProductionFrozen(state)
  const isFirstRun = prestige.level === 0
  const showFullScreenPrompt = isFrozen && isFirstRun
  const showTopPrestigeBar = isFrozen && !isFirstRun
  // During the first run only, the normal Prestige card stays hidden until the player has
  // bought 10 of the very last tier — once they've prestiged at least once, it's always shown
  // (in its usual spot) whenever production isn't frozen.
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  const showBottomPrestigeCard = !isFrozen && (!isFirstRun || getTierPurchasedCount(state, lastTier.id) >= 10)

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
            <li>Doubles all future production, permanently</li>
            <li>Keeps your unlocked autobuyers and XP</li>
          </ul>
          <Button
            ref={fullScreenPrestigeButtonRef}
            aria-label="Prestige now"
            color="#fbbf24"
            onClick={actions.prestige}
            title="Resets resources and doubles all future production permanently"
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
              aria-label={prestigeLabel}
              color="#fbbf24"
              onClick={actions.prestige}
              title="Resets resources and doubles all future production permanently"
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
        <MutedText>Build by powers of ten. Prestige to multiply your progress.</MutedText>
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

      <StatCard aria-label="money display">
        <TopRow>
          <div>
            <Money>{formatCurrency(state.resources[MONEY_ID])}</Money>
            <MutedText>+{formatCurrency(moneyPerSec)}/sec</MutedText>
          </div>
          <QuantityToggle role="group" aria-label="Bulk batch size">
            <MutedText>Bulk:</MutedText>
            <Button
              aria-pressed={quantity === 1}
              color={!isFrozen && quantity === 1 ? 'white' : 'darkgrey'}
              disabled={isFrozen}
              onClick={() => setQuantity(1)}
              title="Buy one unit per click"
              type="button"
            >
              ×1
            </Button>
            <Button
              aria-pressed={quantity === 10}
              color={!isFrozen && quantity === 10 ? 'white' : 'darkgrey'}
              disabled={isFrozen}
              onClick={() => setQuantity(10)}
              title="Buy up to a full 10-unit price block per click"
              type="button"
            >
              ×10
            </Button>
          </QuantityToggle>
        </TopRow>
      </StatCard>

      <StatCard aria-label="exponent points display">
        <MutedText>
          <GoldText>{prestige.xp} XP</GoldText>
          {' · '}Next XP at {formatCurrency(10 ** (prestige.highestMilestone + 1))}
        </MutedText>
      </StatCard>

      <TierList>
        {TIER_DEFINITIONS.map((tier, tierIndex) => {
          const unlocked = isTierUnlocked(state)(tier)
          if (!unlocked) return null
          const resources = state.resources[tier.id] ?? 0
          const owned = state.owned[tier.id] ?? 0
          const purchased = getTierPurchasedCount(state, tier.id)
          const costResource = getTierSpendableAmount(state, tier)
          // Manual buy grabs as many units as are currently affordable, capped at the Bulk
          // toggle's quantity (which itself never exceeds the 10-unit cost block boundary).
          const affordableQuantity = getTierAffordableQuantity(tier, purchased, costResource, quantity)
          const unitCost = getTierQuantityCost(tier, purchased, 1)
          const displayCost = affordableQuantity > 0 ? getTierQuantityCost(tier, purchased, affordableQuantity) : unitCost
          const canAfford = affordableQuantity > 0 && !isFrozen
          // The cost-block progress fill always previews the full 10-unit block, independent of
          // the Bulk toggle — it shows how much runway is left before the next 10x cost jump.
          const doneInBlock = purchased % 10
          const availableInBlock = getTierAffordableQuantity(tier, purchased, costResource, 10)
          const donePercent = (doneInBlock / 10) * 100
          const availablePercent = (availableInBlock / 10) * 100
          const autobuyerLevel = state.autobuyers[tier.id] ?? null
          const isAutobuyerLocked = autobuyerLevel === null
          const autobuyerAttemptRate = getAutobuyerAttemptRate(autobuyerLevel)
          // Production no longer depends on the autobuyer at all — every 10 lifetime purchases
          // of a tier (manual or automatic) doubles its own production, the same boundary where
          // its cost jumps 10x (see getPurchaseMilestoneMultiplier).
          const production = owned * prestigeBonus * getPurchaseMilestoneMultiplier(purchased)
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
                {tier.name}
                {autobuyerLevel > 0 && (
                  <GreenText title={`Autobuyer level ${autobuyerLevel} — purchases ×${formatRate(autobuyerAttemptRate)} as often`}>
                    {' '}⚙ Lv.{autobuyerLevel} (×{formatRate(autobuyerAttemptRate)} speed)
                  </GreenText>
                )}
              </TierName>
              <OwnedText>Owned: {formatAmount(owned)}</OwnedText>
              <PurchasedText>Purchased: {formatAmount(purchased)}</PurchasedText>
              <ProductionText>
                +{tier.producesResourceId === MONEY_ID
                  ? formatCurrency(production)
                  : `${formatAmount(production)} ${RESOURCE_SYMBOL(tier.producesResourceId)}`}/sec
              </ProductionText>
              <BuyButton
                aria-label={buyLabel}
                color={canAfford ? 'white' : 'darkgrey'}
                disabled={!canAfford}
                onClick={() => actions.buyTierQuantity(tier.id, quantity)}
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
            </TierLine>
          )
        })}
      </TierList>

      {showBottomPrestigeCard && (
        <PrestigeCard aria-label="prestige panel">
          <div>
            <h2>Prestige</h2>
            <MutedText id="prestige-description">
              Reach 1 Googol Money to gain 1 Prestige Level, doubling all production. Resets your
              resources when reached.
            </MutedText>
          </div>
          <div>
            <GoldText>Level {prestige.level}</GoldText>
            {prestige.level > 0 && (
              <MutedText>×{prestigeBonus} production bonus</MutedText>
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
            title="Resets resources and doubles all future production permanently"
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
        </PrestigeCard>
      )}

      <Button
        aria-describedby="reset-description"
        aria-label="Reset game"
        color={isFrozen ? 'darkgrey' : '#a3a3a3'}
        disabled={isFrozen}
        type="button"
        onClick={resetGame}
        title={isFrozen ? 'Prestige first — production is frozen at 1 Googol Money' : 'Erases all progress and starts over'}
      >
        ↺ Reset
        <VisuallyHidden id="reset-description">Erases all progress and starts over</VisuallyHidden>
      </Button>
    </RootDiv>
  )
}

export default MainPage
