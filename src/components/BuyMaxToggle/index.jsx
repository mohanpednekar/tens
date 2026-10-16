import Button from 'components/Button'
import { isBuyMaxUnlocked } from 'game/engine'

// Buy max mode toggle (see isBuyMaxUnlocked/buyTierMaxLevels in engine.js and useIncrementalGame's
// buyMaxMode). Renders nothing until the save has completed its first Prestige. Lives on Perks →
// Toggles; one per-device preference covering every page with leveled purchases.
const BuyMaxToggle = ({ game }) => {
  if (!isBuyMaxUnlocked(game.state)) return null
  const enabled = Boolean(game.buyMaxMode)
  return (
    <Button
      aria-label="Toggle buy max mode"
      aria-pressed={enabled}
      onClick={() => game.setBuyMaxMode(!enabled)}
      title={enabled
        ? 'Buy max is on: each purchase buys as many levels as you can afford (Factory tiers buy full levels only — a partial level takes its own click). Click to turn off.'
        : 'Buy max is off: each purchase buys one level. Click to buy as many levels as you can afford instead.'}
      type="button"
      variant={enabled ? 'primary' : 'neutral'}
    >
      Buy max: {enabled ? 'On' : 'Off'}
    </Button>
  )
}

export default BuyMaxToggle
