import Button, { ButtonContent, VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import { isProductionFrozen } from 'game/engine'
import { version } from '../../../package.json'
import styled from 'styled-components'

// Always-reachable Settings screen (via AppNav → More). Holds app meta and destructive Reset —
// utilities that must not depend on unlocking Tiers or any other progress gate.

const RootDiv = styled.main`
  width: min(520px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`

const Header = styled.header`
  color: ${props => props.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${props => props.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`

const VersionText = styled.p`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.75rem;
  margin: 0;
`

const Section = styled(StatCard)`
  gap: 0.5rem;

  h2 {
    font-size: ${props => props.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${props => props.theme.color.textMuted};
    margin: 0;
  }
`

const SettingsPage = ({ game, onReset }) => {
  const frozen = isProductionFrozen(game.state)

  return (
    <RootDiv>
      <Header>
        <h1>Settings</h1>
        <VersionText>v{version}</VersionText>
      </Header>

      <Section aria-label="about section">
        <h2>About</h2>
        <p>Tens — an incremental game themed around powers of ten.</p>
      </Section>

      <Section aria-label="appearance section">
        <h2>Appearance</h2>
        <p>Dark theme (system preference + light-mode toggle coming later).</p>
      </Section>

      <Section aria-label="danger zone">
        <h2>Danger zone</h2>
        <p>Erase this save and start from the Byte Foundry gate.</p>
        <Button
          aria-describedby="settings-reset-description"
          aria-label="Reset game"
          disabled={frozen}
          onClick={onReset}
          title={
            frozen
              ? 'Prestige first — production is frozen at 1 Googol Bytes'
              : 'Erases all progress and starts over (asks for confirmation)'
          }
          type="button"
          variant="danger"
        >
          <ButtonContent>↺ Reset save…</ButtonContent>
          <VisuallyHidden id="settings-reset-description">Erases all progress and starts over</VisuallyHidden>
        </Button>
      </Section>
    </RootDiv>
  )
}

export default SettingsPage
