import styled, { css, keyframes } from 'styled-components'
import { formatOfflineDuration, getComputeBoostCoveredTierCount, getComputeBoostMultiplier } from 'game/engine'
import { COMPUTE_BOOST_PRESETS } from 'game/layers'

// Shared "this element is boosted" treatment for everything an active Compute Boost multiplies —
// the Data Stream (tickIntroProduction) and the first getComputeBoostCoveredTierCount Factory tiers
// (tickGame): a glow on the boosted element's own card via `boostGlow` (no badge — the glow is
// self-explanatory; the timer bar states what is boosted).

export const COMPUTE_BOOST_LABELS = { burst: 'Burst', standard: 'Standard', sustain: 'Sustain' }

// Mirrors the engine: an unknown preset or invalid funding tier applies ×1 to nothing.
const isBoostActive = intro => Boolean(intro?.computeBoostType && COMPUTE_BOOST_PRESETS[intro.computeBoostType]) && getComputeBoostCoveredTierCount(intro) > 0

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
