import StatCard from 'components/StatCard'
import {
  isEraEligible,
  isOverflowModeUnlocked,
} from 'game/engine'
import { ERA_ELIGIBILITY_PP } from 'game/layers'
import styled, { useTheme } from 'styled-components'

// Standalone Releases screen (page id 'milestones') — story Releases (formerly Chapters) and Reboot
// status (autobuyer unlock milestones live once, on Firmware → Automation); reachable from every screen via AppNav → More without requiring the main game to be unlocked
// first (Releases in particular is useful during the Foundry gate).

const RootDiv = styled.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`

const Header = styled.header`
  color: ${props => props.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${props => props.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`

const Category = styled(StatCard)`
  gap: 0.4rem;
`

const CategoryHeading = styled.h2`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }
`

const Subtitle = styled.span`
  color: ${props => props.theme.color.textMuted};
`

const Badge = styled.span`
  color: ${props => props.$color ?? props.theme.color.textMuted};
  font-size: 0.82em;
  opacity: ${props => (props.$dimmed ? 0.75 : 1)};
`

const MilestonesPage = ({ game }) => {
  const { state } = game
  const theme = useTheme()
  const { purge } = state
  const eraCount = state.era?.count ?? 0
  const eonsBalance = state.eons?.balance ?? 0
  const eraEligible = isEraEligible(state)
  const chapters = [
    { version: 'v1.0', label: 'The first Kilobyte', reached: !!state.intro?.mainGameUnlocked },
    { version: 'v2.0', label: 'Go Googol', reached: (purge.count ?? 0) > 0 },
    { version: 'v3.0', label: 'Open Compute', reached: !!state.computeFlops?.pageUnlocked },
    { version: 'v4.0', label: 'DeGoogoled', reached: isOverflowModeUnlocked(state) },
    { version: 'v5.0', label: 'First Reboot', reached: eraCount > 0 },
  ]

  return (
    <RootDiv>
      <Header>
        <h1>Releases</h1>
      </Header>

      <List aria-label="releases page">
        <Category aria-label="releases category">
          <CategoryHeading>Releases</CategoryHeading>
          {chapters.map(chapter => (
            <Row key={chapter.label} aria-label={`${chapter.version} ${chapter.label} release`}>
              <span>
                <strong>{chapter.version}</strong> <Subtitle>{chapter.label}</Subtitle>
              </span>
              <Badge
                $color={chapter.reached ? theme.color.good : theme.color.disabled}
                $dimmed={!chapter.reached}
                aria-label={`${chapter.version} ${chapter.label} release ${chapter.reached ? 'complete' : 'not yet complete'}`}
              >
                {chapter.reached ? '✅' : '🔒'}
              </Badge>
            </Row>
          ))}
        </Category>

        <Category aria-label="reboot category">
          <CategoryHeading>Reboot</CategoryHeading>
          <Row aria-label="reboots status">
            <span>Reboots</span>
            <Badge $color={theme.color.good} aria-label={`${eraCount} reboots`}>
              {eraCount}
            </Badge>
          </Row>
          <Row aria-label="kernels balance status">
            <span>Kernels</span>
            <Badge $color={theme.color.good} aria-label={`${eonsBalance} kernels held`}>
              {eonsBalance}
            </Badge>
          </Row>
          <Row aria-label="reboot eligibility">
            <span>Reboot when ready</span>
            {eraEligible ? (
              <Badge $color={theme.color.good} aria-label="reboot eligible now">
                ✅ Eligible
              </Badge>
            ) : (
              <Badge
                $color={theme.color.disabled}
                $dimmed
                aria-label={`reboot locked — requires ${ERA_ELIGIBILITY_PP.toExponential(0).replace('+', '')} unspent Purge Points`}
              >
                🔒 1 Googol PP
              </Badge>
            )}
          </Row>
        </Category>

      </List>
    </RootDiv>
  )
}

export default MilestonesPage
