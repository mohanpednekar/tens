import Button, { ButtonContent, VisuallyHidden } from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import {
  canBuyComputeFlopsTier,
  formatAmount,
  formatComputeFlopsTotal,
  getComputeFlopsTierCost,
  getComputeFlopsTierProductionMultiplier,
  getComputeFlopsTotal,
  isComputeFlopsPageRevealed,
} from 'game/engine'
import {
  COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC,
  COMPUTE_FLOPS_REVEAL_PP,
  COMPUTE_FLOPS_TIER_DEFINITIONS,
  TIER_DEFINITIONS,
} from 'game/layers'
import { useState } from 'react'
import styled, { css, useTheme } from 'styled-components'

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
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

// Same row look as a Factory tier (MainPage's TierLine): left accent stripe, one line, fixed-width
// Buy track so every cost lines up as a column. Name/effect live in the symbol-toggled details.
const TierRow = styled(StatCard)`
  align-items: center;
  border-left: 3px solid ${props => props.$accent};
  column-gap: ${props => props.theme.space.sm};
  display: grid;
  grid-template-areas:
    'name boost buy'
    'details details details';
  grid-template-columns: minmax(0, 1fr) auto 9rem;
  padding: 3px ${props => props.theme.space.xs} 3px ${props => props.theme.space.md};
  row-gap: 0;

  @media (max-width: 40rem) {
    column-gap: 6px;
    grid-template-columns: minmax(0, 1fr) auto 7.9rem;
    padding: 3px 3px 3px ${props => props.theme.space.sm};
  }

  @media (max-width: 24.5rem) {
    grid-template-columns: minmax(0, 1fr) auto 7.3rem;
  }
`

const cell = css`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NameCell = styled.div`
  align-items: baseline;
  column-gap: ${props => props.theme.space.sm};
  display: flex;
  grid-area: name;
  min-width: 0;
`

// The only expand/collapse trigger for a row's details (Expand/collapse convention).
const TierSymbol = styled.span`
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.md.size};
  font-weight: 700;
  line-height: ${props => props.theme.type.scale.md.lineHeight};
  min-width: 2.2rem;

  &:focus-visible {
    border-radius: ${props => props.theme.radius.sm};
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

const OwnedText = styled.span`
  font-size: ${props => props.theme.type.scale.sm.size};
  font-weight: 500;
  ${cell}
`

const BoostText = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: ${props => props.theme.type.scale.xs.size};
  grid-area: boost;
  text-align: right;
  ${cell}
`

const BuyButton = styled(Button)`
  font-size: ${props => props.theme.type.scale.sm.size};
  font-weight: 700;
  grid-area: buy;
  min-height: 2rem;
  padding: 0 0.6em;
  width: 100%;
  ${cell}

  @media (max-width: 40rem) {
    font-size: ${props => props.theme.type.scale.xs.size};
    padding: 0 0.5em;
  }
`

const TierDetails = styled.div`
  border-top: 1px solid ${props => props.theme.color.border};
  color: ${props => props.theme.color.textMuted};
  font-size: ${props => props.theme.type.scale.xs.size};
  grid-area: details;
  margin-top: ${props => props.theme.space.xs};
  padding: ${props => props.theme.space.xs} 0 2px;
`

const tierById = Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, t]))

const ComputeFlopsPage = ({ game }) => {
  const { actions, state } = game
  const pp = state.purge?.points ?? 0
  const totalFlops = getComputeFlopsTotal(state)
  const revealed = isComputeFlopsPageRevealed(state)
  const theme = useTheme()
  const [openIds, setOpenIds] = useState(() => new Set())
  const toggle = id => setOpenIds(prev => {
    const next = new Set(prev)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })

  // Progressive reveal: every owned or affordable tier plus one more; higher tiers stay hidden.
  const lastRelevantIndex = COMPUTE_FLOPS_TIER_DEFINITIONS.reduce(
    (last, flopTier, index) => ((state.computeFlops?.owned?.[flopTier.id] ?? 0) > 0 || canBuyComputeFlopsTier(state, flopTier.id) ? index : last),
    -1,
  )
  const visibleTiers = COMPUTE_FLOPS_TIER_DEFINITIONS.slice(0, Math.max(1, lastRelevantIndex + 2))
  const hiddenTierCount = COMPUTE_FLOPS_TIER_DEFINITIONS.length - visibleTiers.length

  return (
    <RootDiv aria-label="compute flops screen">
      <Header>
        <h1>🖥 Compute</h1>
        <FlopsHero aria-label="cumulative flops boost">
          {formatComputeFlopsTotal(totalFlops)}
        </FlopsHero>
      </Header>


      {!revealed && (
        <Hint>Unlocks at {COMPUTE_FLOPS_REVEAL_PP} PP — you have {formatAmount(pp)} PP.</Hint>
      )}

      <TierList aria-label="compute flops tiers">
        {visibleTiers.map((flopTier, index) => {
          const owned = state.computeFlops?.owned?.[flopTier.id] ?? 0
          const liveMultiplier = getComputeFlopsTierProductionMultiplier(state, flopTier.boostsTierId)
          const cost = getComputeFlopsTierCost(flopTier, owned)
          const canBuy = canBuyComputeFlopsTier(state, flopTier.id)
          const factoryTier = tierById[flopTier.boostsTierId]
          const factoryName = factoryTier?.name ?? flopTier.boostsTierId
          const open = openIds.has(flopTier.id)
          const ratePercent = (COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC * 100).toFixed(2)

          return (
            <TierRow
              $accent={theme.tierAccents[index % theme.tierAccents.length]}
              aria-label={`${flopTier.name} · ${flopTier.outputLabel} compute tier`}
              key={flopTier.id}
            >
              <NameCell>
                <TierSymbol
                  aria-expanded={open}
                  aria-label={`${flopTier.name} (${flopTier.outputLabel}) details`}
                  onClick={() => toggle(flopTier.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggle(flopTier.id)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  title={`${flopTier.name} · ${flopTier.outputLabel}`}
                >
                  {flopTier.symbol}
                </TierSymbol>
                <OwnedText title="Owned"><VisuallyHidden>Owned: </VisuallyHidden>{formatAmount(owned)}</OwnedText>
              </NameCell>
              <BoostText title={`${factoryName} production multiplier`}>
                {factoryTier?.symbol ?? factoryName} ×{liveMultiplier.toFixed(2)}
              </BoostText>
              <BuyButton
                aria-label={`buy ${flopTier.name} (${flopTier.outputLabel}) for ${formatAmount(cost)} Purge Points`}
                disabled={!revealed || !canBuy}
                onClick={() => actions.buyComputeFlopsTier(flopTier.id)}
                title={
                  !revealed
                    ? `Reach ${COMPUTE_FLOPS_REVEAL_PP} PP to reveal Compute`
                    : !canBuy
                      ? `Costs ${formatAmount(cost)} PP — you have ${formatAmount(pp)} PP`
                      : `Spend ${formatAmount(cost)} PP for +${ratePercent}%/s on ${factoryName}`
                }
                type="button"
                variant="success"
              >
                <ButtonContent>{formatAmount(cost)} PP</ButtonContent>
              </BuyButton>
              {open && (
                <TierDetails>
                  {flopTier.name} · {flopTier.outputLabel} · +{ratePercent}%/s {factoryName} production each ·
                  {' '}{factoryName} ×{liveMultiplier.toFixed(4)}
                </TierDetails>
              )}
            </TierRow>
          )
        })}
      </TierList>
      {hiddenTierCount > 0 && <Hint aria-label={`${hiddenTierCount} more compute tiers locked`}>🔒 {hiddenTierCount} more</Hint>}
    </RootDiv>
  )
}

export default ComputeFlopsPage
