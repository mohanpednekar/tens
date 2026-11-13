import Button, { ButtonContent } from 'components/Button'
import { canForfeitComputeBoost, canReclaimComputeBoost, formatOfflineDuration, getComputeBoostLanes, getComputeBoostTierDurationSeconds, getComputeBoostTierMultiplier, isStackComputeBoostTurnAvailable } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, TIER_DEFINITIONS } from 'game/layers'
import styled from 'styled-components'

// The active Compute Boost timer bars, shared by the Power screen and the Byte Factory header: one lane per
// running multiplier, one row per group of same-tier boosts (see BoostLaneRow). Each bar shows the boost
// count, covered tiers + preset, and time left, its fill being the group's remaining time over `count ×
// duration`. Pop (refund the last queued boost, no confirm) — or Forfeit (confirmed) once nothing is queued —
// sits on the lane's last row, Stack (queue another) on its first. Renders nothing while no boost is active.

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

// Pop, Forfeit and Stack share one fixed width (and the spacer reserves it on rows that carry no button),
// so every bar lines up whichever control a row shows.
const SIDE_WIDTH = '2.8em'

const TimerSideButton = styled(CompactButton)`
  flex: 0 0 ${SIDE_WIDTH};
  width: ${SIDE_WIDTH};
  min-width: 0;
  padding-left: 0;
  padding-right: 0;
`

const SideSpacer = styled.span`
  font-size: 0.78em; /* same em as CompactButton, so the widths match */
  flex: 0 0 ${SIDE_WIDTH};
  width: ${SIDE_WIDTH};
`

const BoostLane = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

const TimerBar = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(max-content, 1fr) minmax(0, auto) minmax(max-content, 1fr);
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
  opacity: ${props => (props.$waiting ? 0.7 : 1)};
`

const TimerCount = styled.span`
  color: ${props => props.theme.color.textMuted};
  text-align: left;
  white-space: nowrap;
`

const TimerEffect = styled.span`
  font-weight: 700;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
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

// Consecutive queue entries funded by the same tier form one group (the waiting entries are sorted
// strongest-tier first; the running head can be weaker), so boosts covering a different set of Factory tiers
// get their own row.
const groupQueue = queue => {
  const groups = []
  for (const tierIndex of queue) {
    const last = groups[groups.length - 1]
    if (last && last.tierIndex === tierIndex) last.count += 1
    else groups.push({ tierIndex, count: 1 })
  }
  return groups
}

// One lane (one multiplier) — see engine.js "Compute Boosts". The first row is the running group (Stack on its
// right — a stacked boost may land on a later row, since it queues in strength order); each further row is a
// waiting group of another tier span. Pop / Forfeit sit on the LAST row, since Pop
// refunds the weakest waiting boost.
const BoostLaneRow = ({ lane, state, actions }) => {
  const { type, queue, remainingSeconds } = lane
  const display = COMPUTE_BOOST_DISPLAY[type] ?? { icon: '⚡', label: type }
  const duration = getComputeBoostTierDurationSeconds(type, queue[0])
  const multiplier = getComputeBoostTierMultiplier(type, queue[0])
  const groups = groupQueue(queue)
  const lastIndex = groups.length - 1
  return (
    <BoostLane role="group" aria-label={`${display.label} boost controls`}>
      {groups.map((group, index) => {
        const waiting = index > 0
        const total = group.count * duration
        const remaining = waiting ? total : remainingSeconds + (group.count - 1) * duration
        const fillPercent = total > 0 ? Math.min(100, (remaining / total) * 100) : 0
        const covered = describeCoveredTiers(group.tierIndex)
        return (
          <BoostTimerRow key={`${group.tierIndex}-${index}`}>
            {index === lastIndex
              ? (canReclaimComputeBoost(state, type)
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
                    ))
              : <SideSpacer aria-hidden="true" />}
            <TimerBar
              aria-label={waiting ? `queued ${display.label} compute boost ${covered}` : `active ${display.label} compute boost`}
              $fill={fillPercent}
              $waiting={waiting}
              title={`${display.label} boost ${waiting ? 'queued' : 'active'}: ×${multiplier} production on ${describeCoveredTiers(group.tierIndex, 'name')}, ${formatOfflineDuration(remaining)}${waiting ? ' once it starts' : ' left'}`}
            >
              <TimerCount>{`${group.count}x`}</TimerCount>
              <TimerEffect>{`${covered} ${display.icon} ×${multiplier}`}</TimerEffect>
              <TimerRemaining>{formatOfflineDuration(remaining)}</TimerRemaining>
            </TimerBar>
            {index === 0
              ? (
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
                )
              : <SideSpacer aria-hidden="true" />}
          </BoostTimerRow>
        )
      })}
    </BoostLane>
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
