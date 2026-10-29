import Button, { ButtonContent } from 'components/Button'
import { canForfeitComputeBoost, canReclaimComputeBoost, formatOfflineDuration, getComputeBoostTierDurationSeconds, getComputeBoostTierMultiplier, isStackComputeBoostTurnAvailable } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, TIER_DEFINITIONS } from 'game/layers'
import styled from 'styled-components'

// The active Compute Boost's timer bar, shared by the Boosters screen and the Byte Factory header:
// Pop (refund the newest unused stack, no confirm) — or Forfeit (confirmed) once no unused stack
// remains — on the left, the bar itself (fill = remaining time over the total stacked duration,
// effect text on top) in the middle, Stack on the right. Renders nothing while no boost is active.

// A small leading icon + display label per COMPUTE_BOOST_PRESETS key.
export const COMPUTE_BOOST_DISPLAY = {
  burst: { icon: '💥', label: 'Burst' },
  standard: { icon: '⏱️', label: 'Standard' },
  sustain: { icon: '🔋', label: 'Sustain' },
}

// Drops zero-valued trailing units ("10m 0s" → "10m"); countdowns keep formatOfflineDuration as-is.
export const formatPresetDuration = seconds => formatOfflineDuration(seconds).replace(/ 0[ms]$/, '')

// "KB" for 1 covered Factory tier, "KB–MB" for 2, … — which Factory tiers a boost funded from
// compute-ladder tier `tierIndex` applies to. `field` picks the short `symbol` or the full `name`.
export const describeCoveredTiers = (tierIndex, field = 'symbol') =>
  tierIndex <= 1
    ? TIER_DEFINITIONS[0][field]
    : `${TIER_DEFINITIONS[0][field]}–${TIER_DEFINITIONS[Math.min(tierIndex, TIER_DEFINITIONS.length) - 1][field]}`

const CompactButton = styled(Button)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`

const BoostTimerRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

const TimerSideButton = styled(CompactButton)`
  flex: 0 0 auto;
  min-width: 2.4em;
`

const TimerBar = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.space.sm};
  padding: 0.45em 0.75em;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.color.warn};
  background: linear-gradient(
    to right,
    color-mix(in srgb, ${props => props.theme.color.warn} 28%, transparent) ${props => props.$fill}%,
    ${props => props.theme.color.surfaceRaised} ${props => props.$fill}%
  );
  color: ${props => props.theme.color.text};
  font-size: 0.85em;
  font-variant-numeric: tabular-nums;
`

const TimerEffect = styled.span`
  font-weight: 700;
  white-space: nowrap;
`

const TimerTargets = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TimerRemaining = styled.span`
  color: ${props => props.theme.color.textMuted};
  white-space: nowrap;
`

const BoostTimerBar = ({ state, actions }) => {
  const intro = state.intro ?? {}
  const activeType = intro.computeBoostType
  if (!activeType || !COMPUTE_BOOST_PRESETS[activeType]) return null
  const activeTierIndex = intro.computeBoostTierIndex ?? 1
  const activeDisplay = COMPUTE_BOOST_DISPLAY[activeType] ?? { icon: '⚡', label: activeType }
  const activeMultiplier = getComputeBoostTierMultiplier(activeType, activeTierIndex)
  const remaining = intro.computeBoostRemainingSeconds ?? 0
  const totalSeconds = (intro.computeBoostStacks ?? 1) * getComputeBoostTierDurationSeconds(activeType, activeTierIndex)
  const fillPercent = totalSeconds > 0 ? Math.min(100, (remaining / totalSeconds) * 100) : 0
  return (
    <BoostTimerRow role="group" aria-label="active boost controls">
      {canReclaimComputeBoost(state)
        ? (
          <TimerSideButton
            aria-label="pop one stack of the active compute boost"
            onClick={actions.reclaimComputeBoost}
            title={`Pop: refund the most recent unused stack`}
            type="button"
            variant="neutral"
          >
            <ButtonContent>↩</ButtonContent>
          </TimerSideButton>
          )
        : (
          <TimerSideButton
            aria-label="forfeit the active compute boost with no refund"
            disabled={!canForfeitComputeBoost(state)}
            onClick={() => {
              if (!window.confirm('Forfeit the active boost with no refund?')) return
              actions.forfeitComputeBoost()
            }}
            title="Forfeit: end the boost now with no refund — asks for confirmation"
            type="button"
            variant="danger"
          >
            <ButtonContent>✕</ButtonContent>
          </TimerSideButton>
          )}
      <TimerBar
        aria-label="active compute boost"
        $fill={fillPercent}
        title={`${activeDisplay.label} boost active: ×${activeMultiplier} production on ${describeCoveredTiers(activeTierIndex, 'name')}, ${formatOfflineDuration(remaining)} left, ${intro.computeBoostStacks ?? 1}x stacked`}
      >
        <TimerEffect>{`${activeDisplay.icon} ×${activeMultiplier}`}</TimerEffect>
        <TimerTargets>{`Boosting ${describeCoveredTiers(activeTierIndex)}`}</TimerTargets>
        <TimerRemaining>
          {formatOfflineDuration(remaining)}
          {intro.computeBoostStacks > 1 ? ` · ${intro.computeBoostStacks}x` : ''}
        </TimerRemaining>
      </TimerBar>
      <TimerSideButton
        aria-label="stack the active compute boost"
        disabled={!isStackComputeBoostTurnAvailable(state)}
        onClick={actions.stackComputeBoost}
        title={`Stack: add another ${formatPresetDuration(getComputeBoostTierDurationSeconds(activeType, activeTierIndex))} — up to ${COMPUTE_BOOST_MAX_STACKS}x`}
        type="button"
        variant="prestige"
      >
        <ButtonContent>+</ButtonContent>
      </TimerSideButton>
    </BoostTimerRow>
  )
}

export default BoostTimerBar
