import Button from 'components/Button'
import styled, { css } from 'styled-components'

// Segmented choice (full width, equal-width labeled buttons) for how a manual Factory Buy sizes a purchase:
// Bytes (default, id 'level' — fills up to the level boundary) or Bits (id 'single' — one unit per click). Per-device preference
// (useIncrementalGame's buyUnitMode); sits beside Buy max on Firmware → Prestige.
const Row = styled.div`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
`

const ChoiceButton = styled(Button)`
  min-width: 0;
  white-space: nowrap;
  width: 100%;

  ${props => props.$selected && css`
    background: color-mix(in srgb, ${props.theme.color.warn} 22%, transparent);
    border-width: 2px;
    font-weight: 700;
  `}
`

const OPTIONS = [
  { id: 'level', unit: false, icon: '📶', label: 'Bytes', title: 'Buy Bytes: each Buy fills as many units as you can afford, up to the end of the current level.' },
  { id: 'single', unit: true, icon: '1️⃣', label: 'Bits', title: 'Buy Bits: each Buy — and each autobuyer attempt, at the same interval — purchases exactly one unit, so autobuying is much slower (bulk-level upgrades are suspended).' },
]

const BuyModeToggle = ({ game }) => (
  <Row role="group" aria-label="buy mode">
    {OPTIONS.map(option => {
      const selected = Boolean(game.buyUnitMode) === option.unit
      return (
        <ChoiceButton
          key={option.id}
          aria-label={`buy ${option.id} mode`}
          aria-pressed={selected}
          onClick={() => game.setBuyUnitMode(option.unit)}
          title={`${option.title}${selected ? ' (selected)' : ''}`}
          type="button"
          variant={selected ? 'prestige' : 'neutral'}
          $selected={selected}
        >
          {`${option.icon} ${option.label}`}
        </ChoiceButton>
      )
    })}
  </Row>
)

export default BuyModeToggle
