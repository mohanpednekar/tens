import Button from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, getAutobuyerCost, getAutobuyerUnlockPPCost, getTierCost, getTierPurchasedCount, getTierSpendableAmount, isTierUnlocked, productionMultiplier } from 'game/engine'
import { MONEY_ID, PRESTIGE_PP_COST, RESOURCE_SYMBOL, TIER_DEFINITIONS } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
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

const TierGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`

const TierRow = styled.div`
  align-items: center;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr auto;
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
    ? `$${formatAmount(amount)}`
    : `${formatAmount(amount)} ${RESOURCE_NAME_BY_ID[resourceId]}`

const MainPage = () => {
  const { actions, resetGame, state } = useIncrementalGame()
  const { prestige } = state
  const canPrestige = prestige.pp >= PRESTIGE_PP_COST
  const prestigeBonus = productionMultiplier(prestige.level)

  return (
    <RootDiv>
      <Header>
        <h1>Tens</h1>
        <MutedText>Build by powers of ten. Prestige to multiply your progress.</MutedText>
      </Header>

      <StatCard aria-label="money display">
        <div>
          <Money>{formatAmount(state.resources[MONEY_ID])} Money</Money>
          <MutedText>
            +{formatAmount(
              TIER_DEFINITIONS
                .filter(t => t.producesResourceId === MONEY_ID)
                .reduce((sum, t) => sum + (state.owned[t.id] ?? 0), 0) * prestigeBonus
            )} Money/sec
          </MutedText>
        </div>
      </StatCard>

      <TierGrid>
        {TIER_DEFINITIONS.map((tier, tierIndex) => {
          const unlocked = isTierUnlocked(state)(tier)
          if (!unlocked) return null

          const owned = state.owned[tier.id] ?? 0
          const purchased = getTierPurchasedCount(state, tier.id)
          const cost = getTierCost(tier, purchased)
          const costResource = getTierSpendableAmount(state, tier)
          const producesResource = getTierSpendableAmount(state, tier)
          const canAfford = costResource >= cost
          const production = owned * prestigeBonus
          const autobuyerLevel = state.autobuyers[tier.id] ?? null
          const isAutobuyerLocked = autobuyerLevel === null
          const autobuyerUnlockPPCost = getAutobuyerUnlockPPCost(tierIndex)
          const autobuyerUpgradeCost = getAutobuyerCost(autobuyerLevel)
          const canUpgradeAutobuyer = isAutobuyerLocked
            ? prestige.pp >= autobuyerUnlockPPCost
            : owned >= autobuyerUpgradeCost

          return (
            <StatCard key={tier.id} aria-label={`${tier.name} layer`}>
              <div>
                <h2>{tier.name}{autobuyerLevel > 0 && <GreenText> ⚙ Auto (Lv.{autobuyerLevel})</GreenText>}</h2>
                <MutedText>
                  Produces 1 {RESOURCE_SYMBOL[tier.producesResourceId]}/sec · costs{' '}
                  {RESOURCE_SYMBOL[tier.costResourceId]}
                </MutedText>
              </div>

              <div>
                <Money>
                  {formatAmount(costResource)}{' '}
                  {RESOURCE_SYMBOL[tier.costResourceId]}
                </Money>
                <MutedText>+{formatAmount(production)} {RESOURCE_SYMBOL[tier.producesResourceId]}/sec</MutedText>
              </div>

              <TierRow>
                <MutedText>Owned: {owned}</MutedText>
                <Button
                  color={canAfford ? 'white' : 'darkgrey'}
                  disabled={!canAfford}
                  onClick={() => actions.buyTier(tier.id)}
                >
                  Buy for {formatCost(cost, tier.costResourceId)}
                </Button>
              </TierRow>

              <TierRow>
                <MutedText>Autobuyer Lv.{autobuyerLevel ?? 'Locked'}</MutedText>
                <Button
                  color={canUpgradeAutobuyer ? '#4ade80' : 'darkgrey'}
                  disabled={!canUpgradeAutobuyer}
                  onClick={() => actions.buyAutobuyer(tier.id)}
                >
                  {isAutobuyerLocked
                    ? `Unlock for ${autobuyerUnlockPPCost} PP`
                    : `Upgrade for ${formatCost(autobuyerUpgradeCost, tier.id)}`}
                </Button>
              </TierRow>
            </StatCard>
          )
        })}
      </TierGrid>

      <PrestigeCard aria-label="prestige panel">
        <div>
          <h2>Prestige</h2>
          <MutedText>
            Reset all progress. Every 10 PP spent grants 1 Prestige Level, doubling all production.
          </MutedText>
        </div>
        <div>
          <GoldText>{prestige.pp} PP</GoldText>
          {' · '}
          <GoldText>Level {prestige.level}</GoldText>
          {prestige.level > 0 && (
            <MutedText>×{prestigeBonus} production bonus</MutedText>
          )}
          <MutedText>
            Next PP at {formatAmount(10 ** (prestige.highestMilestone + 1))} Money
          </MutedText>
        </div>
        <Button
          color={canPrestige ? '#fbbf24' : 'darkgrey'}
          disabled={!canPrestige}
          onClick={actions.prestige}
          type="button"
        >
          Prestige (costs {PRESTIGE_PP_COST} PP)
        </Button>
      </PrestigeCard>

      <Button type="button" onClick={resetGame}>Reset game</Button>
    </RootDiv>
  )
}

export default MainPage
