import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button, { VisuallyHidden } from 'components/Button'
import { FOUNDRY_SPEED_STEP, formatOfflineDuration, getFoundrySpeedRemainingSeconds } from 'game/engine'

const Settings = styled.section`
  display: grid;
  gap: ${props => props.theme.space.xs};
  border-top: 1px solid ${props => props.theme.color.border};
  color: ${props => props.theme.color.textMuted};
  padding: 0.6rem 0.75rem;
  font-size: ${props => props.theme.type.scale.sm.size};

  label { color: ${props => props.theme.color.text}; font-weight: 600; }
  input { width: 100%; margin: 0; accent-color: ${props => props.theme.color.accent}; }
  button {
    background-color: color-mix(in srgb, ${props => props.theme.color.surfaceSunken} 45%, ${props => props.theme.color.surface});
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  font-variant-numeric: tabular-nums;
`

const pair = speed => `${speed}× / ${Number((1 / speed).toFixed(3))}×`
const fillTradeoff = 'Higher settings fill faster at the start and slower near full. Lower settings fill up sooner.'

export default function FoundrySpeed({ actions, state, speed, maximum }) {
  const [selection, setSelection] = useState(speed)
  const [now, setNow] = useState(Date.now)
  const remaining = getFoundrySpeedRemainingSeconds(state, now)
  const pending = selection !== speed
  const locked = remaining > 0

  useEffect(() => {
    if (!locked) return undefined
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [locked])

  return (
    <Settings aria-label="Foundry speed">
      <SettingRow>
        <label htmlFor="foundry-speed">Foundry speed</label>
        <span>Active {pair(speed)}</span>
      </SettingRow>
      <VisuallyHidden id="foundry-speed-help">{fillTradeoff}</VisuallyHidden>
      <input id="foundry-speed" type="range" min={1} max={maximum} step={FOUNDRY_SPEED_STEP} value={selection}
        aria-valuetext={pair(selection)} aria-describedby="foundry-speed-help"
        title={fillTradeoff} disabled={locked}
        onChange={event => setSelection(Number(event.target.value))} />
      {pending && (
        <SettingRow>
          <span>Pending {pair(selection)}</span>
          <Button variant="primary" onClick={() => actions.saveFoundrySpeed(selection)}>Save</Button>
        </SettingRow>
      )}
      {locked && <span>Changes unlock in {formatOfflineDuration(Math.ceil(remaining))}.</span>}
    </Settings>
  )
}
