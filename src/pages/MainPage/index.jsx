import Button from 'components/Button'
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

// Fixed grid areas (rather than flex flow) so each field always renders in the same slot —
// the row's shape depends only on the viewport width, never on how many digits a value has.
const TierLine = styled(StatCard)`
  display: grid;
  grid-template-areas: 'name owned purchased production buy upgrade';
  grid-template-columns: 1fr 0.75fr 0.8fr 0.9fr 1.5fr 1.6fr;
  align-items: center;
  column-gap: 0.6rem;
  padding: 0.5rem 0.85rem;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #444;
  }

  @media (max-width: 40rem) {
    grid-template-areas:
      'name name'
      'owned purchased'
      'production production'
      'buy buy'
      'upgrade upgrade';
    grid-template-columns: 1fr 1fr;
    row-gap: 0.4rem;
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
  font-size: 0.85em;
  ${gridCell}
`

const PurchasedText = styled(MutedText)`
  grid-area: purchased;
  font-size: 0.85em;
  ${gridCell}
`

const ProductionText = styled(MutedText)`
  grid-area: production;
  font-size: 0.85em;
  ${gridCell}
`

const BuyCell = styled.div`
  grid-area: buy;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`

const BuyButton = styled(Button)`
  width: 100%;
  font-size: 0.85em;
  padding: 0.5em 0.6em;
  ${gridCell}
`

// Shows how many of the current cost-block's 10 same-price units are already bought (done,
// green) vs currently affordable but not yet bought (available, amber) — the rest of the
// block's price stays flat, so this is a preview of how much runway is left before the next
// 10x cost jump.
const BlockProgressTrack = styled.div`
  height: 0.3rem;
  border-radius: 999px;
  background: #2a2a2a;
  overflow: hidden;
  display: flex;
`

const BlockProgressDone = styled.div`
  width: ${props => props.$percent}%;
  background: #4ade80;
`

const BlockProgressAvailable = styled.div`
  width: ${props => props.$percent}%;
  background: #fbbf24;
`

const UpgradeButton = styled(Button)`
  grid-area: upgrade;
  width: 100%;
  font-size: 0.85em;
  padding: 0.5em 0.6em;
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
  const prestigeProgressPercent = getPrestigeProgressPercent(state.resources[MONEY_ID])
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
          // Manual buy grabs as many units as are currently affordable, capped at the Bulk
          // toggle's quantity (which itself never exceeds the 10-unit cost block boundary).
          const affordableQuantity = getTierAffordableQuantity(tier, purchased, costResource, quantity)
          const unitCost = getTierQuantityCost(tier, purchased, 1)
          const displayCost = affordableQuantity > 0 ? getTierQuantityCost(tier, purchased, affordableQuantity) : unitCost
          const canAfford = affordableQuantity > 0
          // The cost-block progress bar always previews the full 10-unit block, independent of
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

          return (
            <TierLine key={tier.id} aria-label={`${tier.name} layer`}>
              <TierName>{tier.name}{autobuyerLevel > 0 && <GreenText> ⚙ Lv.{autobuyerLevel} (×{autobuyerYieldMultiplier}/buy)</GreenText>}</TierName>
              <OwnedText>Owned: {formatAmount(owned)}</OwnedText>
              <PurchasedText>Purchased: {formatAmount(purchased)}</PurchasedText>
              <ProductionText>
                +{tier.producesResourceId === MONEY_ID
                  ? formatCurrency(production)
                  : `${formatAmount(production)} ${RESOURCE_SYMBOL(tier.producesResourceId)}`}/sec
              </ProductionText>
              <BuyCell>
                <BuyButton
                  color={canAfford ? 'white' : 'darkgrey'}
                  disabled={!canAfford}
                  onClick={() => actions.buyTierQuantity(tier.id, quantity)}
                >
                  Buy{affordableQuantity > 1 ? ` ×${affordableQuantity}` : ''} for {formatCurrency(displayCost)}
                </BuyButton>
                <BlockProgressTrack
                  role="progressbar"
                  aria-label={`${tier.name} cost-block progress`}
                  aria-valuenow={doneInBlock}
                  aria-valuemin={0}
                  aria-valuemax={10}
                >
                  <BlockProgressDone $percent={donePercent} />
                  <BlockProgressAvailable $percent={availablePercent} />
                </BlockProgressTrack>
              </BuyCell>
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
            {formatCurrency(state.resources[MONEY_ID])} / 1 Googol Money{' · '}{prestigeProgressPercent}%
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
