import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
import StatCard from 'components/StatCard'
import {
  FOUNDRY_HANDOFF_EARLY_FRACTION, FOUNDRY_HANDOFF_EARLY_SECONDS, FOUNDRY_HANDOFF_TOTAL_SECONDS,
  FOUNDRY_SPEED_STEP, FOUNDRY_SPRINT_FILL_FRACTION, canSpendFoundrySprintData, formatOfflineDuration, getFoundrySpeedCooldownSeconds,
  getFoundrySpeedRemainingSeconds, getFoundrySpeedTrialOffer,
} from 'game/engine'
import { TIER_DEFINITIONS } from 'game/layers'

const Card = styled(StatCard)`
  width: 100%;
  font-size: ${props => props.theme.type.scale.sm.size};

  h2, p { margin: 0; }
  h2 { font-size: ${props => props.theme.type.scale.md.size}; }
  label { display: block; }
  input { display: block; margin: 0.25rem 0 0; }
  input, progress { width: 100%; accent-color: ${props => props.theme.color.accent}; }
`

const Pairs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  font-variant-numeric: tabular-nums;
`

const Trial = styled.div`
  display: grid;
  gap: 0.45rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${props => props.theme.color.border};
`

const pair = speed => `${speed}× / ${Number((1 / speed).toFixed(3))}×`
const trialActions = {
  sprint: 'Start Sprint and Spend', benchmark: 'Record maximum-speed fill', baseline: 'Run 1× comparison',
  handoff: 'Start Perfect Handoff',
}
const trialTitle = kind => kind === 'sprint' ? 'Sprint and Spend' : kind === 'handoff' ? 'Perfect Handoff' : 'Slow Wins'

export default function FoundrySpeed({ actions, state, speed, maximum }) {
  const [selection, setSelection] = useState(speed)
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const remaining = getFoundrySpeedRemainingSeconds(state, now)
  const offer = getFoundrySpeedTrialOffer(state, now)
  const trial = state.intro.foundrySpeedTrial
  const running = trial && trial.result == null
  const pool = TIER_DEFINITIONS[maximum - 1]?.symbol
  const trialPool = trial ? TIER_DEFINITIONS[trial.pool - 1]?.symbol : pool
  const trialPercent = trial ? Math.floor(100 * trial.bits / trial.capacity) : 0
  const canStart = offer && !running
  const kind = running ? trial.kind : offer?.kind ?? trial?.kind
  const sprintTarget = 100 * FOUNDRY_SPRINT_FILL_FRACTION

  return (
    <Card aria-labelledby="foundry-speed-title">
      <h2 id="foundry-speed-title">Foundry speed</h2>
      <p id="foundry-speed-help">
        Higher settings deliver data faster at the start and slow it sharply near full.
        Go higher for quick partial fills or lower to fill up sooner.
      </p>
      <Pairs>
        <span>Active <strong>{pair(speed)}</strong></span>
        <span>Pending <strong>{pair(selection)}</strong></span>
      </Pairs>
      <label>
        Start speed
        <input type="range" min={1} max={maximum} step={FOUNDRY_SPEED_STEP} value={selection}
          aria-valuetext={pair(selection)} aria-describedby="foundry-speed-help"
          disabled={remaining > 0}
          onChange={event => setSelection(Number(event.target.value))} />
      </label>
      <Button variant="primary" onClick={() => actions.saveFoundrySpeed(selection)} disabled={selection === speed || remaining > 0}>Save</Button>
      <p>{remaining > 0
        ? `Changes unlock in ${formatOfflineDuration(Math.ceil(remaining))}.`
        : `Saving locks changes for ${formatOfflineDuration(getFoundrySpeedCooldownSeconds(state))}.`}
      </p>
      {(offer || trial) && (
        <Trial>
          <strong>{trialTitle(kind)}</strong>
          {kind === 'sprint' && <p>Reach {sprintTarget}% in the test buffer at maximum, then fund the test disk
            before the buffer reaches 50%.</p>}
          {kind === 'handoff' && <p>Reach {100 * FOUNDRY_HANDOFF_EARLY_FRACTION}% by {FOUNDRY_HANDOFF_EARLY_SECONDS}s at maximum.
            Near halfway, save 1× and finish by {FOUNDRY_HANDOFF_TOTAL_SECONDS}s.</p>}
          {(kind === 'benchmark' || kind === 'baseline') && <p>
            Fill the {pool} test buffer at maximum. Set 1× and fill it again to beat your time.
          </p>}
          {trial && (
            <>
              <progress aria-label={`${trialPool} test buffer`} value={trialPercent} max={100} />
              <p>{trialPercent}% · {trial.seconds.toFixed(1)}s
                {trial.result === 'passed' ? ` · ${trialTitle(trial.kind)} earned` : trial.result === 'missed' ? ' · Target missed' :
                  trial.result === 'recorded' ? ' · Time recorded' : ''}</p>
            </>
          )}
          {running && kind === 'sprint' && (
            <Button variant="primary" disabled={!canSpendFoundrySprintData(state)} onClick={actions.spendFoundrySprintData}>
              Fund test disk
            </Button>
          )}
          {running && <Button variant="neutral" onClick={actions.cancelFoundrySpeedTrial}>Cancel test</Button>}
          {canStart && <Button variant="primary" disabled={!offer.ready} onClick={actions.startFoundrySpeedTrial}>{trialActions[offer.kind]}</Button>}
          {canStart && !offer.ready && <p>
            {offer.kind === 'handoff' ? 'Set maximum speed and wait until Save is available.' : 'Set maximum speed to start the test.'}
          </p>}
        </Trial>
      )}
    </Card>
  )
}
