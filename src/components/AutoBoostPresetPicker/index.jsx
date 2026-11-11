import Button from 'components/Button'
import { COMPUTE_BOOST_DISPLAY } from 'components/BoostTimerBar'
import { COMPUTE_BOOST_PRESETS } from 'game/layers'
import styled, { css } from 'styled-components'

// A segmented choice: full width, one equal-width labeled button per preset (Turbo / Balanced / Eco).
const Row = styled.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  width: 100%;
`

// The selected option is identified by styling alone (tinted fill + bold + thicker border), no tick.
const PresetButton = styled(Button)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${props => props.$selected && css`
    background: color-mix(in srgb, ${props.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`

// Auto Boost's preferred preset picker. Lives on Firmware → Automation; Power shows it too while Firmware
// is still locked (before the first Prestige).
const AutoBoostPresetPicker = ({ value, onChange }) => (
  <Row role="group" aria-label="auto boost preference">
    {Object.keys(COMPUTE_BOOST_PRESETS).map(boostType => {
      const display = COMPUTE_BOOST_DISPLAY[boostType]
      const selected = value === boostType
      return (
        <PresetButton
          key={`auto-${boostType}`}
          aria-label={`set auto boost preference to ${display.label.toLowerCase()}`}
          aria-pressed={selected}
          onClick={() => onChange(boostType)}
          title={`Auto Boost preference: ${display.label}${selected ? ' (selected)' : ''}`}
          type="button"
          variant={selected ? 'prestige' : 'neutral'}
          $selected={selected}
        >
          {`${display.icon} ${display.label}`}
        </PresetButton>
      )
    })}
  </Row>
)

export default AutoBoostPresetPicker
