import Button from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency, getAutobuyerCost, getAutobuyerUnlockXPCost, getTierBulkQuantity, getTierPurchasedCount, getTierQuantityCost, getTierSpendableAmount, isTierUnlocked, productionMultiplier } from 'game/engine'
import { GOOGOL, MONEY_ID, RESOURCE_SYMBOL, TIER_DEFINITIONS } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { useState } from 'react'
import styled from 'styled-components'

const RootDiv = styled.main`
  width: min(960px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 0;
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

const TierLine = styled(StatCard)`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  padding: 0.5rem 1rem;
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

const RESOURCE_NAME_BY_ID = Object.fromEntries(
  TIER_DEFINITIONS.map(tier => [tier.id, tier.name])
)

const formatCost = (amount, resourceId) =>
  resourceId === MONEY_ID
    ? formatCurrency(amount)
    : `${formatAmount(amount)} ${RESOURCE_NAME_BY_ID[resourceId]}`

const MainPage = () => {
  const { actions, resetGame, state } = useIncrementalGame()
  const { prestige } = state
  const [quantity, setQuantity] = useState(1)
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
          <QuantityToggle>
            <MutedText>Buy:</MutedText>
            <Button color={quantity === 1 ? 'white' : 'darkgrey'} onClick={() => setQuantity(1)} type="button">×1</Button>
            <Button color={quantity === 10 ? 'white' : 'darkgrey'} onClick={() => setQuantity(10)} type="button">×10</Button>
          </QuantityToggle>
        </TopRow>
      </StatCard>

      <StatCard aria-label="exponent points display">
        <MutedText>
          <GoldText>{prestige.xp} XP</GoldText>
          {' · '}Next XP at {formatAmount(10 ** (prestige.highestMilestone + 1))} Money
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
          const bulkQuantity = getTierBulkQuantity(tier, purchased, quantity)
          const bulkCost = getTierQuantityCost(tier, purchased, quantity)
          const canAfford = bulkQuantity > 0 && costResource >= bulkCost
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
              <b>{tier.name}{autobuyerLevel > 0 && <GreenText> ⚙ Auto (Lv.{autobuyerLevel})</GreenText>}</b>
              <MutedText>Owned: {owned}</MutedText>
              <MutedText>+{formatAmount(production)} {RESOURCE_SYMBOL(tier.producesResourceId)}/sec</MutedText>
              <Button
                color={canAfford ? 'white' : 'darkgrey'}
                disabled={!canAfford}
                onClick={() => actions.buyTierQuantity(tier.id, quantity)}
              >
                Buy{bulkQuantity > 1 ? ` ×${bulkQuantity}` : ''} for {formatCurrency(bulkCost)}
              </Button>
              <Button
                color={canUpgradeAutobuyer ? '#4ade80' : 'darkgrey'}
                disabled={!canUpgradeAutobuyer}
                onClick={() => actions.buyAutobuyer(tier.id)}
              >
                {isAutobuyerLocked
                  ? `Unlock for ${autobuyerUnlockXPCost} XP`
                  : `Upgrade for ${formatCost(autobuyerUpgradeCost, tier.id)}`}
              </Button>
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
