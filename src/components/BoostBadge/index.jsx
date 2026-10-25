import styled, { css, keyframes } from 'styled-components'
import { BOOST_ICON } from 'components/icons'
import { formatOfflineDuration, getComputeBoostCoveredTierCount, getComputeBoostMultiplier } from 'game/engine'
import { COMPUTE_BOOST_PRESETS } from 'game/layers'

// Shared "this element is boosted" treatment for everything an active Compute Boost multiplies —
// the Data Stream (tickIntroProduction) and the first getComputeBoostCoveredTierCount Factory tiers
// (tickGame): a BOOST_ICON badge in the UI, the full detail in its title/aria-label, and a glow on
// the boosted element's own card via `boostGlow`.

export const COMPUTE_BOOST_LABELS = { burst: 'Burst', standard: 'Standard', sustain: 'Sustain' }

const isBoostActive = intro => Boolean(intro?.computeBoostType && COMPUTE_BOOST_PRESETS[intro.computeBoostType])

export const isDataStreamBoosted = intro => isBoostActive(intro)

// tierIndex is the Factory tier's 0-based ladder index (tier01 = 0).
export const isFactoryTierBoosted = (intro, tierIndex) =>
  isBoostActive(intro) && tierIndex < getComputeBoostCoveredTierCount(intro)

// Full sentence describing the active boost, or null while none is active.
export const getComputeBoostDescription = intro => {
  if (!isBoostActive(intro)) return null
  const label = COMPUTE_BOOST_LABELS[intro.computeBoostType] ?? intro.computeBoostType
  const stacks = intro.computeBoostStacks ?? 1
  return `Boosted ×${getComputeBoostMultiplier(intro)} production by the ${label} Compute Boost — ${formatOfflineDuration(intro.computeBoostRemainingSeconds ?? 0)} left${stacks > 1 ? `, ${stacks} stacked` : ''}`
}

const boostPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 6px 0 var(--boost-glow); }
  50% { box-shadow: 0 0 0 1px var(--boost-glow), 0 0 14px 2px var(--boost-glow); }
`

// Mix into a styled card: `${props => props.$boosted && boostGlow}`.
export const boostGlow = css`
  --boost-glow: ${props => props.theme.color.warn};
  box-shadow: 0 0 0 1px var(--boost-glow), 0 0 10px 1px var(--boost-glow);
  animation: ${boostPulse} 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Badge = styled.span`
  color: ${props => props.theme.color.warn};
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  white-space: nowrap;
  text-shadow: 0 0 6px ${props => props.theme.color.warn};
`

// Renders nothing while no boost is active (or `boosted` is false).
const BoostBadge = ({ intro, boosted = true, className }) => {
  const description = boosted ? getComputeBoostDescription(intro) : null
  if (!description) return null
  return (
    <Badge className={className} role="img" aria-label={description} title={description}>
      {`${BOOST_ICON}×${getComputeBoostMultiplier(intro)}`}
    </Badge>
  )
}

export default BoostBadge
