import styled, { css, keyframes } from 'styled-components'
import { formatOfflineDuration, getComputeBoostCoveredTierCount, getComputeBoostLanes, getComputeBoostMultiplier } from 'game/engine'
import { COMPUTE_BOOST_PRESETS } from 'game/layers'

// Shared "this element is boosted" treatment for everything an active Compute Boost multiplies —
// the Data Stream (tickIntroProduction) and the first getComputeBoostCoveredTierCount Factory tiers
// (tickGame): a glow on the boosted element's own card via `boostGlow` (no badge — the glow is
// self-explanatory; the timer bar states what is boosted).

export const COMPUTE_BOOST_LABELS = { burst: 'Turbo', standard: 'Balanced', sustain: 'Eco' }

const isBoostActive = intro => getComputeBoostCoveredTierCount(intro) > 0

export const isDataStreamBoosted = intro => isBoostActive(intro)

// tierIndex is the Factory tier's 0-based ladder index (tier01 = 0).
export const isFactoryTierBoosted = (intro, tierIndex) => tierIndex < getComputeBoostCoveredTierCount(intro)

// 1-based Storage pool index (pool N ↔ Factory tier N).
export const isPoolBoosted = (intro, poolIndex) => poolIndex <= getComputeBoostCoveredTierCount(intro)

// Full sentence describing the running boosts, or null while none is active.
export const getComputeBoostDescription = intro => {
  const lanes = getComputeBoostLanes(intro)
  if (lanes.length === 0) return null
  const parts = lanes.map(lane => {
    const queued = lane.queue.length > 1 ? `, ${lane.queue.length} queued` : ''
    return `${COMPUTE_BOOST_LABELS[lane.type] ?? lane.type} ×${COMPUTE_BOOST_PRESETS[lane.type].multiplier} (${formatOfflineDuration(lane.remainingSeconds)} left${queued})`
  })
  return `Boosted ×${getComputeBoostMultiplier(intro)} production by Compute Boosts — ${parts.join(' + ')}`
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
