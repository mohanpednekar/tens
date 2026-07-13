import Button, { VisuallyHiddenProgress } from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency, getAutobuyerCost, getAutobuyerUnlockXPCost, getAutobuyerYieldMultiplier, getPrestigeProgressPercent, getTierAffordableQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, isTierUnlocked, productionMultiplier } from 'game/engine'
import { GOOGOL, MONEY_ID, RESOURCE_SYMBOL, TIER_DEFINITIONS } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
import styled, { css } from 'styled-components'

const RootDiv = styled.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 0;
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
  gap: 0.4rem;
`

// One accent hue per tier (cycled by index), applied as a thin left-edge stripe on the row —
// purely cosmetic scanability, kept off text/buttons so it never collides with the semantic
// white/green/gold/darkgrey coloring used for affordability elsewhere in the row.
const TIER_ACCENT_COLORS = ['#60a5fa', '#f472b6', '#a78bfa', '#fb923c', '#22d3ee', '#38bdf8', '#f87171', '#818cf8']

// Fixed grid areas (rather than flex flow) so each field always renders in the same slot —
// the row's shape depends only on the viewport width, never on how many digits a value has.
const TierLine = styled(StatCard)`
  display: grid;
  grid-template-areas: 'name owned purchased production buy upgrade';
  grid-template-columns: 1fr 0.75fr 0.8fr 0.9fr 1.5fr 1.6fr;
  align-items: center;
  column-gap: 0.6rem;
  padding: 0.5rem 0.85rem;
  border-left: 3px solid ${props => props.$accent};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #444;
    border-left-color: ${props => props.$accent};
  }

  @media (max-width: 40rem) {
    grid-template-areas:
      'name name name name name name'
      'owned owned purchased purchased production production'
      'buy buy buy upgrade upgrade upgrade';
    grid-template-columns: repeat(6, 1fr);
    row-gap: 0.35rem;
    column-gap: 0.4rem;
    padding: 0.5rem 0.65rem;
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
  font-size: 0.85em;
  padding: 0.5em 0.6em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.8em;
    padding: 0.45em 0.5em;
  }
`

const UpgradeButton = styled(Button)`
  grid-area: upgrade;
  width: 100%;
  font-size: 0.85em;
  padding: 0.5em 0.6em;
  ${gridCell}

  @media (max-width: 40rem) {
    font-size: 0.8em;
    padding: 0.45em 0.5em;
  }
`

const RESOURCE_NAME_BY_ID = Object.fromEntries(
  TIER_DEFINITIONS.map(tier => [tier.id, tier.name])
)

const formatCost = (amount, resourceId) =>
  resourceId === MONEY_ID
    ? formatCurrency(amount)
    : `${formatAmount(amount)} ${RESOURCE_NAME_BY_ID[resourceId]}`

const MainPage = () => {
  const { actions, quantity, resetGame, setQuantity, state } = useIncrementalGame()
  const { prestige } = state
  const canPrestige = state.resources[MONEY_ID] >= GOOGOL
  const prestigeBonus = productionMultiplier(prestige.level)
  const prestigeProgressPercent = getPrestigeProgressPercent(state.resources[MONEY_ID])
  const prestigeLabel = 'Prestige (requires 1 Googol Money)'
  const moneyPerSec = TIER_DEFINITIONS
    .filter(t => t.producesResourceId === MONEY_ID)
    .reduce((sum, t) => sum + (state.owned[t.id] ?? 0), 0) * prestigeBonus

  return (
    <RootDiv>
      <Header>
        <h1>Tens</h1>
        <MutedText>Build by powers of ten. Prestige to multiply your progress.</MutedText>
      </Header>

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
              color={quantity === 1 ? 'white' : 'darkgrey'}
              onClick={() => setQuantity(1)}
              title="Buy one unit per click"
              type="button"
            >
              ×1
            </Button>
            <Button
              aria-pressed={quantity === 10}
              color={quantity === 10 ? 'white' : 'darkgrey'}
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
          const canAfford = affordableQuantity > 0
          // The cost-block progress fill always previews the full 10-unit block, independent of
          // the Bulk toggle — it shows how much runway is left before the next 10x cost jump.
          const doneInBlock = purchased % 10
          const availableInBlock = getTierAffordableQuantity(tier, purchased, costResource, 10)
          const donePercent = (doneInBlock / 10) * 100
          const availablePercent = (availableInBlock / 10) * 100
          const autobuyerLevel = state.autobuyers[tier.id] ?? null
          const isAutobuyerLocked = autobuyerLevel === null
          const autobuyerYieldMultiplier = getAutobuyerYieldMultiplier(autobuyerLevel)
          const production = owned * prestigeBonus
          const autobuyerUnlockXPCost = getAutobuyerUnlockXPCost(tierIndex)
          const autobuyerUpgradeCost = getAutobuyerCost(autobuyerLevel)
          const canUpgradeAutobuyer = isAutobuyerLocked
            ? prestige.xp >= autobuyerUnlockXPCost
            : resources >= autobuyerUpgradeCost
          const buyLabel = `Buy${affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} for ${formatCurrency(displayCost)}`
          const upgradeLabel = isAutobuyerLocked
            ? `Unlock for ${autobuyerUnlockXPCost} XP`
            : `Upgrade for ${formatCost(autobuyerUpgradeCost, tier.id)}`
          // Live "how close am I" meter for the Upgrade/Unlock button, even while disabled.
          const autobuyerProgressPercent = Math.min(100, Math.round(
            (isAutobuyerLocked ? prestige.xp / autobuyerUnlockXPCost : resources / autobuyerUpgradeCost) * 100
          ))
          const accent = TIER_ACCENT_COLORS[tierIndex % TIER_ACCENT_COLORS.length]

          return (
            <TierLine key={tier.id} aria-label={`${tier.name} layer`} $accent={accent}>
              <TierName>
                {tier.name}
                {autobuyerLevel > 0 && (
                  <GreenText title={`Autobuyer level ${autobuyerLevel} — automatic purchases yield ×${autobuyerYieldMultiplier} units per buy`}>
                    {' '}⚙ Lv.{autobuyerLevel} (×{autobuyerYieldMultiplier}/buy)
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
                title={`Buy ${tier.name} to increase your ${RESOURCE_SYMBOL(tier.producesResourceId)} production`}
                $progress={donePercent}
                $secondaryProgress={availablePercent}
                $pulse={canAfford}
              >
                {buyLabel}
                <VisuallyHiddenProgress
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
                title={isAutobuyerLocked ? 'Unlocks automatic buying for this tier' : "Doubles this autobuyer's purchase yield"}
                $progress={autobuyerProgressPercent}
                $pulse={canUpgradeAutobuyer}
              >
                {upgradeLabel}
                <VisuallyHiddenProgress
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

      <PrestigeCard aria-label="prestige panel">
        <div>
          <h2>Prestige</h2>
          <MutedText>
            Reach 1 Googol Money to gain 1 Prestige Level, doubling all production.
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
          {prestigeLabel}
          <VisuallyHiddenProgress
            role="progressbar"
            aria-label="Prestige progress"
            aria-valuenow={prestigeProgressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </Button>
      </PrestigeCard>

      <Button type="button" onClick={resetGame} title="Erases all progress and starts over">Reset game</Button>
    </RootDiv>
  )
}

export default MainPage
