import Button from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency, getAutobuyerCost, getAutobuyerUnlockXPCost, getTierAffordableQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, isTierUnlocked, productionMultiplier } from 'game/engine'
import { GOOGOL, MONEY_ID, RESOURCE_SYMBOL, TIER_DEFINITIONS } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
import styled, { css } from 'styled-components'

const RootDiv = styled.main`
  width: min(960px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 0;
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
  gap: 0.5rem;
`

// Fixed grid areas (rather than flex flow) so each field always renders in the same slot —
// the row's shape depends only on the viewport width, never on how many digits a value has.
const TierLine = styled(StatCard)`
  display: grid;
  grid-template-areas: 'name owned purchased production buy upgrade';
  grid-template-columns: 1.3fr 0.9fr 0.9fr 1.1fr 1.3fr 1.4fr;
  align-items: center;
  column-gap: 1rem;
  padding: 0.5rem 1rem;

  @media (max-width: 40rem) {
    grid-template-areas:
      'name name'
      'owned purchased'
      'production production'
      'buy buy'
      'upgrade upgrade';
    grid-template-columns: 1fr 1fr;
    row-gap: 0.5rem;
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
`

const OwnedText = styled(MutedText)`
  grid-area: owned;
  ${gridCell}
`

const PurchasedText = styled(MutedText)`
  grid-area: purchased;
  ${gridCell}
`

const ProductionText = styled(MutedText)`
  grid-area: production;
  ${gridCell}
`

const BuyButton = styled(Button)`
  grid-area: buy;
  width: 100%;
  ${gridCell}
`

const UpgradeButton = styled(Button)`
  grid-area: upgrade;
  width: 100%;
  ${gridCell}
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
          <QuantityToggle role="group" aria-label="Autobuyer batch size">
            <MutedText>Autobuyer:</MutedText>
            <Button
              aria-pressed={quantity === 1}
              color={quantity === 1 ? 'white' : 'darkgrey'}
              onClick={() => setQuantity(1)}
              type="button"
            >
              ×1
            </Button>
            <Button
              aria-pressed={quantity === 10}
              color={quantity === 10 ? 'white' : 'darkgrey'}
              onClick={() => setQuantity(10)}
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
          // Manual buy always grabs as many units as are currently affordable, capped at the
          // 10-unit cost block boundary (the same block getTierCost prices flat within).
          const affordableQuantity = getTierAffordableQuantity(tier, purchased, costResource, 10)
          const unitCost = getTierQuantityCost(tier, purchased, 1)
          const displayCost = affordableQuantity > 0 ? getTierQuantityCost(tier, purchased, affordableQuantity) : unitCost
          const canAfford = affordableQuantity > 0
          const production = owned * prestigeBonus
          const autobuyerLevel = state.autobuyers[tier.id] ?? null
          const isAutobuyerLocked = autobuyerLevel === null
          const autobuyerUnlockXPCost = getAutobuyerUnlockXPCost(tierIndex)
          const autobuyerUpgradeCost = getAutobuyerCost(autobuyerLevel)
          const canUpgradeAutobuyer = isAutobuyerLocked
            ? prestige.xp >= autobuyerUnlockXPCost
            : resources >= autobuyerUpgradeCost

          return (
            <TierLine key={tier.id} aria-label={`${tier.name} layer`}>
              <TierName>{tier.name}{autobuyerLevel > 0 && <GreenText> ⚙ Auto (Lv.{autobuyerLevel})</GreenText>}</TierName>
              <OwnedText>Owned: {formatAmount(owned)}</OwnedText>
              <PurchasedText>Purchased: {formatAmount(purchased)}</PurchasedText>
              <ProductionText>+{formatAmount(production)} {RESOURCE_SYMBOL(tier.producesResourceId)}/sec</ProductionText>
              <BuyButton
                color={canAfford ? 'white' : 'darkgrey'}
                disabled={!canAfford}
                onClick={() => actions.buyTierQuantity(tier.id, 10)}
              >
                Buy{affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} for {formatCurrency(displayCost)}
              </BuyButton>
              <UpgradeButton
                color={canUpgradeAutobuyer ? '#4ade80' : 'darkgrey'}
                disabled={!canUpgradeAutobuyer}
                onClick={() => actions.buyAutobuyer(tier.id)}
              >
                {isAutobuyerLocked
                  ? `Unlock for ${autobuyerUnlockXPCost} XP`
                  : `Upgrade for ${formatCost(autobuyerUpgradeCost, tier.id)}`}
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
            {formatCurrency(state.resources[MONEY_ID])} / 1 Googol Money
          </MutedText>
        </div>
        <Button
          color={canPrestige ? '#fbbf24' : 'darkgrey'}
          disabled={!canPrestige}
          onClick={actions.prestige}
          type="button"
        >
          Prestige (requires 1 Googol Money)
        </Button>
      </PrestigeCard>

      <Button type="button" onClick={resetGame}>Reset game</Button>
    </RootDiv>
  )
}

export default MainPage
