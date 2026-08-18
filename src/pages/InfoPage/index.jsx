import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import {
  getAutobuyerUnlockMilestone,
  getOverclockRequirement,
  getSpeedUpRequirement,
  getTierTickspeedAutobuyerMilestone,
} from 'game/engine'
import { TIER_DEFINITIONS, TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP } from 'game/layers'
import { version } from '../../../package.json'
import styled from 'styled-components'

// Everything on this page is static, evergreen prose about how the game's mechanics work — no
// game state is read here. It exists so MainPage (the actual game) doesn't have to carry this
// explanatory text inline; see CLAUDE.md's Architecture section for the split. The handful of
// numbers below (milestone/requirement thresholds) are derived from the same engine.js/layers.js
// constants the game itself uses rather than hardcoded, so they can't drift out of sync with the
// real rules if those constants ever change.
const RootDiv = styled.main`
  width: min(720px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`

const Header = styled.header`
  align-items: center;
  color: ${props => props.theme.color.text};
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;

  h1 {
    font-family: ${props => props.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`

const VersionText = styled.span`
  color: ${props => props.theme.color.textMuted};
  display: block;
  font-size: 0.7rem;
  margin-top: 0.15rem;
`

const Section = styled(StatCard)`
  h2 {
    font-size: ${props => props.theme.type.scale.lg.size};
    margin: 0 0 0.4rem;
  }

  p {
    color: ${props => props.theme.color.textMuted};
    margin: 0 0 0.5rem;
  }

  p:last-child {
    margin-bottom: 0;
  }
`

const InfoPage = ({ onBack }) => {
  const firstTierAutobuyerMilestone = getAutobuyerUnlockMilestone(TIER_DEFINITIONS[0].id)
  const lastTierAutobuyerMilestone = getAutobuyerUnlockMilestone(TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id)
  const firstTierTickspeedAutobuyerMilestone = getTierTickspeedAutobuyerMilestone(TIER_DEFINITIONS[0].id)
  const speedUpFirstRequirement = getSpeedUpRequirement(0) - 1
  const overclockFirstRequirement = getOverclockRequirement(0)

  return (
    <RootDiv>
      <Header>
        <div>
          <h1>Tens — Guide</h1>
          <VersionText>v{version}</VersionText>
        </div>
        <Button aria-label="Back to game" onClick={onBack} title="Back to game" type="button" variant="neutral">
          <ButtonContent>← Back to game</ButtonContent>
        </Button>
      </Header>

      <Section aria-label="overview section">
        <h2>Overview</h2>
        <p>Build by powers of ten. Prestige for Prestige Points.</p>
        <p>
          Every tier is bought directly with Bits, the base currency, and once owned, produces the
          tier immediately below it — production cascades all the way down to Bits. Reaching
          1 Googol Bytes (8×10^100 Bits) freezes production except for Prestige.
        </p>
      </Section>

      <Section aria-label="tickspeed section">
        <h2>Tickspeed</h2>
        <p>
          Spend Bits to permanently speed up every tier's production ticks by another 1% at once —
          more frequent deliveries, not bigger ones. Each level costs another power of ten. Unlocks
          once you own {TIER_DEFINITIONS[1].name}.
        </p>
      </Section>

      <Section aria-label="speed up section">
        <h2>Speed Up</h2>
        <p>
          Reach the required level on {TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name} to
          trigger a Speed Up: resets your tiers and resources (keeps unlocked autobuyers and
          Prestige Points) and permanently doubles production speed. The first Speed Up needs
          level {speedUpFirstRequirement}; each one after that needs one more level than the last.
        </p>
      </Section>

      <Section aria-label="overclock section">
        <h2>Overclock</h2>
        <p>
          Reach the required level on {TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name} to
          claim an Overclock level: resets your tiers and resources just like Speed Up (keeps
          unlocked autobuyers and Prestige Points) but also wipes Speed Up's own stacking bonus
          back to zero — in exchange, it grants a standalone ×1.001 multiplier per level, stacking
          on top of the Tickspeed upgrade rather than boosting it directly. The first level needs
          level {overclockFirstRequirement}; each one after that needs one more level than the
          last. Falling behind doesn't cost you progress — claiming jumps straight to whatever
          level {TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name} has already reached, so you
          never have to claim every intermediate level one at a time.
        </p>
      </Section>

      <Section aria-label="tier autobuyers section">
        <h2>Tier Autobuyers</h2>
        <p>
          Each tier's unit-buying autobuyer and its tickspeed autobuyer unlock automatically as you
          prestige more — see the Milestones section below for exactly when. Once unlocked, the
          ⏸/▶ button next to each pauses or resumes it without losing the unlock. Smart is a
          one-time Prestige Point purchase that makes a tier's unit-buying autobuyer buy one at a
          time until a full level is affordable, then in blocks after that — fixing an early-game
          stall where a full level isn't affordable yet.
        </p>
      </Section>

      <Section aria-label="milestones section">
        <h2>Milestones</h2>
        <p>
          Tier Autobuyer Unlocks: unlocks one tier per prestige, starting at Prestige{' '}
          {firstTierAutobuyerMilestone} for {TIER_DEFINITIONS[0].name}, up through
          Prestige {lastTierAutobuyerMilestone} for {TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name}.
        </p>
        <p>
          Tier Tickspeed Autobuyers: unlocks later — starting at
          Prestige {firstTierTickspeedAutobuyerMilestone}, every{' '}
          {TIER_TICKSPEED_AUTOBUYER_MILESTONE_STEP} prestiges after that.
        </p>
      </Section>
    </RootDiv>
  )
}

export default InfoPage
