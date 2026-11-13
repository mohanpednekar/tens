import Button, { ButtonContent } from 'components/Button'
import { canForfeitComputeBoost, canReclaimComputeBoost, formatOfflineDuration, getComputeBoostLanes, getComputeBoostTierDurationSeconds, getComputeBoostTierMultiplier, isStackComputeBoostTurnAvailable } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, TIER_DEFINITIONS } from 'game/layers'
import styled from 'styled-components'

// The active Compute Boost timer bars, one per running multiplier, shared by the Power screen and the Byte
// Factory header: Pop (refund the last queued boost, no confirm) — or Forfeit (confirmed) once nothing is
// queued — on the left, the bar (fill = remaining time over the lane's total queued duration, effect text
// on top) in the middle, Stack (queue another) on the right. Renders nothing while no boost is active.

// A small leading icon + display label per COMPUTE_BOOST_PRESETS key.
export const COMPUTE_BOOST_DISPLAY = {
  burst: { icon: '💥', label: 'Turbo' },
  standard: { icon: '⏱️', label: 'Balanced' },
  sustain: { icon: '🔋', label: 'Eco' },
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
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
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

const TimerCount = styled.span`
  color: ${props => props.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`

const TimerEffect = styled.span`
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
`

const TimerRemaining = styled.span`
  color: ${props => props.theme.color.textMuted};
  text-align: right;
  white-space: nowrap;
`

const BoostTimerStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

// One row per running multiplier lane — see engine.js "Compute Boosts".
const BoostLaneRow = ({ lane, state, actions }) => {
  const { type, queue, remainingSeconds } = lane
  const tierIndex = queue[0]
  const display = COMPUTE_BOOST_DISPLAY[type] ?? { icon: '⚡', label: type }
  const multiplier = getComputeBoostTierMultiplier(type, tierIndex)
  const duration = getComputeBoostTierDurationSeconds(type, tierIndex)
  const totalSeconds = queue.length * duration
  const remaining = remainingSeconds + (queue.length - 1) * duration
  const fillPercent = totalSeconds > 0 ? Math.min(100, (remaining / totalSeconds) * 100) : 0
  const queued = queue.length > 1
  return (
    <BoostTimerRow role="group" aria-label={`${display.label} boost controls`}>
      {canReclaimComputeBoost(state, type)
        ? (
          <TimerSideButton
            aria-label={`pop one queued ${display.label} compute boost`}
            onClick={() => actions.reclaimComputeBoost(type)}
            title="Pop: refund the last queued boost"
            type="button"
            variant="neutral"
          >
            <ButtonContent>↩</ButtonContent>
          </TimerSideButton>
          )
        : (
          <TimerSideButton
            aria-label={`forfeit the ${display.label} compute boost with no refund`}
            disabled={!canForfeitComputeBoost(state, type)}
            onClick={() => {
              if (!window.confirm(`Forfeit the ${display.label} boost with no refund?`)) return
              actions.forfeitComputeBoost(type)
            }}
            title="Forfeit: end the boost now with no refund — asks for confirmation"
            type="button"
            variant="danger"
          >
            <ButtonContent>✕</ButtonContent>
          </TimerSideButton>
          )}
      <TimerBar
        aria-label={`active ${display.label} compute boost`}
        $fill={fillPercent}
        title={`${display.label} boost active: ×${multiplier} production on ${describeCoveredTiers(tierIndex, 'name')}, ${formatOfflineDuration(remaining)} left${queued ? `, ${queue.length - 1} queued (strongest first)` : ''}`}
      >
        <TimerCount>{`${queue.length}x`}</TimerCount>
        <TimerEffect>{`${describeCoveredTiers(tierIndex)} ${display.icon} ×${multiplier}`}</TimerEffect>
        <TimerRemaining>{formatOfflineDuration(remaining)}</TimerRemaining>
      </TimerBar>
      <TimerSideButton
        aria-label={`stack the ${display.label} compute boost`}
        disabled={!isStackComputeBoostTurnAvailable(state, type)}
        onClick={() => actions.stackComputeBoost(type)}
        title={`Queue another ${formatPresetDuration(duration)} ${display.label} boost — up to ${COMPUTE_BOOST_MAX_STACKS}x`}
        type="button"
        variant="prestige"
      >
        <ButtonContent>+</ButtonContent>
      </TimerSideButton>
    </BoostTimerRow>
  )
}

const BoostTimerBar = ({ state, actions }) => {
  const lanes = getComputeBoostLanes(state.intro ?? {})
  if (lanes.length === 0) return null
  return (
    <BoostTimerStack role="group" aria-label="active boost controls">
      {lanes.map(lane => <BoostLaneRow key={lane.type} lane={lane} state={state} actions={actions} />)}
    </BoostTimerStack>
  )
}

export default BoostTimerBar
