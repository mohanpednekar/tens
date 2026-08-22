import Button, { ButtonContent } from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import {
  canBuyComputeFlopsTier,
  formatAmount,
  formatComputeFlopsBoost,
  formatComputeFlopsTotal,
  getComputeFlopsTierCost,
  getComputeFlopsTierProductionMultiplier,
  getComputeFlopsTotal,
  isComputeFlopsPageRevealed,
} from 'game/engine'
import {
  COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC,
  COMPUTE_FLOPS_FIRST_TIER_COST_PP,
  COMPUTE_FLOPS_REVEAL_PP,
  COMPUTE_FLOPS_TIER_DEFINITIONS,
  TIER_DEFINITIONS,
} from 'game/layers'
import styled from 'styled-components'

const RootDiv = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top)) 1rem calc(1.25rem + env(safe-area-inset-bottom));
  color: ${props => props.theme.color.text};
  font-variant-numeric: tabular-nums;
`

const Header = styled.header`
  text-align: center;
  width: 100%;

  h1 {
    font-family: ${props => props.theme.font.display};
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
  }
`

const FlopsHero = styled.p`
  color: ${props => props.theme.color.accent};
  font-family: ${props => props.theme.font.display};
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
`

const Hint = styled.p`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`

const TierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
`

const TierRow = styled(StatCard)`
  align-items: center;
  display: grid;
  gap: 0.35rem 0.5rem;
  grid-template-columns: 1fr auto;
  padding: 0.45rem 0.55rem;
`

const TierName = styled.span`
  font-weight: 600;
`

const TierMeta = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.75rem;
  grid-column: 1 / -1;
`

const tierNameById = Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, t.name]))

const ComputeFlopsPage = ({ game }) => {
  const { actions, state } = game
  const pp = state.prestige?.points ?? 0
  const totalFlops = getComputeFlopsTotal(state)
  const revealed = isComputeFlopsPageRevealed(state)

  return (
    <RootDiv aria-label="compute flops screen">
      <Header>
        <h1>🖥 Compute</h1>
        <FlopsHero aria-label="cumulative flops boost">
          {formatComputeFlopsTotal(totalFlops)}
        </FlopsHero>
      </Header>

      <Hint>
        Unlocks at {COMPUTE_FLOPS_REVEAL_PP} PP — you have {formatAmount(pp)} PP.
        {pp < COMPUTE_FLOPS_FIRST_TIER_COST_PP && (
          <> First tier costs {formatAmount(COMPUTE_FLOPS_FIRST_TIER_COST_PP)} PP.</>
        )}
        {' '}Each owned unit adds {(COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC * 100).toFixed(2)}% per
        second to the matching Ladder tier (linear in owned count). Per-unit PP cost rises every
        purchase on the same triangular power-of-ten curve as Ladder tiers (not every 8 buys).
        Boost resets each Prestige; owned units are permanent.
      </Hint>

      <TierList aria-label="compute flops tiers">
        {COMPUTE_FLOPS_TIER_DEFINITIONS.map(flopTier => {
          const owned = state.computeFlops?.owned?.[flopTier.id] ?? 0
          const tierBoost = (state.computeFlops?.cumulativeBoost?.[flopTier.boostsTierId] ?? 0)
          const liveMultiplier = getComputeFlopsTierProductionMultiplier(state, flopTier.boostsTierId)
          const cost = getComputeFlopsTierCost(flopTier, owned)
          const canBuy = canBuyComputeFlopsTier(state, flopTier.id)
          const factoryTier = tierNameById[flopTier.boostsTierId] ?? flopTier.boostsTierId

          return (
            <TierRow key={flopTier.id} aria-label={`${flopTier.name} compute tier`}>
              <TierName>
                {flopTier.symbol} {flopTier.name}
              </TierName>
              <Button
                aria-label={`buy ${flopTier.name} for ${formatAmount(cost)} Prestige Points`}
                disabled={!revealed || !canBuy}
                onClick={() => actions.buyComputeFlopsTier(flopTier.id)}
                title={
                  !revealed
                    ? `Reach ${COMPUTE_FLOPS_REVEAL_PP} PP to reveal Compute`
                    : !canBuy
                      ? `Costs ${formatAmount(cost)} PP — you have ${formatAmount(pp)} PP`
                      : `Spend ${formatAmount(cost)} PP for +${(COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC * 100).toFixed(2)}%/s on ${factoryTier}`
                }
                type="button"
              >
                <ButtonContent>
                  <Money>{formatAmount(cost)} PP</Money>
                </ButtonContent>
              </Button>
              <TierMeta>
                Owned {owned} · boosts {factoryTier} ·{' '}
                {formatComputeFlopsBoost(tierBoost)} this cycle · ×{liveMultiplier.toFixed(4)} live
              </TierMeta>
            </TierRow>
          )
        })}
      </TierList>
    </RootDiv>
  )
}

export default ComputeFlopsPage
