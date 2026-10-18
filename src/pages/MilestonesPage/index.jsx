import StatCard from 'components/StatCard'
import {
  isEraEligible,
  isUnboundedPrestigeUnlocked,
} from 'game/engine'
import { ERA_ELIGIBILITY_PP } from 'game/layers'
import styled, { useTheme } from 'styled-components'

// Standalone Milestones screen — Chapters and Era ascension status (autobuyer unlock milestones live
// once, on Perks → Unlocks); reachable from every screen via AppNav → More without requiring the main game to be unlocked
// first (Chapters in particular is useful during the Foundry gate).

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

const Badge = styled.span`
  color: ${props => props.$color ?? props.theme.color.textMuted};
  font-size: 0.82em;
  opacity: ${props => (props.$dimmed ? 0.75 : 1)};
`

const MilestonesPage = ({ game }) => {
  const { state } = game
  const theme = useTheme()
  const { prestige } = state
  const eraCount = state.era?.count ?? 0
  const eonsBalance = state.eons?.balance ?? 0
  const eraEligible = isEraEligible(state)
  const chapters = [
    { label: 'The first KiloByte', reached: !!state.intro?.mainGameUnlocked },
    { label: 'Go Googol', reached: (prestige.count ?? 0) > 0 },
    { label: 'Open Compute', reached: !!state.computeFlops?.pageUnlocked },
    { label: 'Go Unbounded', reached: isUnboundedPrestigeUnlocked(state) },
    { label: 'Ascend an Era', reached: eraCount > 0 },
  ]

  return (
    <RootDiv>
      <Header>
        <h1>Milestones</h1>
      </Header>

      <List aria-label="milestones page">
        <Category aria-label="chapters category">
          <CategoryHeading>Chapters</CategoryHeading>
          {chapters.map(chapter => (
            <Row key={chapter.label} aria-label={`${chapter.label} chapter`}>
              <span>{chapter.label}</span>
              <Badge
                $color={chapter.reached ? theme.color.good : theme.color.disabled}
                $dimmed={!chapter.reached}
                aria-label={`${chapter.label} chapter ${chapter.reached ? 'complete' : 'not yet complete'}`}
              >
                {chapter.reached ? '✅' : '🔒'}
              </Badge>
            </Row>
          ))}
        </Category>

        <Category aria-label="era ascension category">
          <CategoryHeading>Era ascension</CategoryHeading>
          <Row aria-label="eras ascended status">
            <span>Eras ascended</span>
            <Badge $color={theme.color.good} aria-label={`${eraCount} eras ascended`}>
              {eraCount}
            </Badge>
          </Row>
          <Row aria-label="eons balance status">
            <span>Eons</span>
            <Badge $color={theme.color.good} aria-label={`${eonsBalance} eons held`}>
              {eonsBalance}
            </Badge>
          </Row>
          <Row aria-label="era ascension eligibility">
            <span>Ascend when ready</span>
            {eraEligible ? (
              <Badge $color={theme.color.good} aria-label="era ascension eligible now">
                ✅ Eligible
              </Badge>
            ) : (
              <Badge
                $color={theme.color.disabled}
                $dimmed
                aria-label={`era ascension locked — requires ${ERA_ELIGIBILITY_PP.toExponential(0).replace('+', '')} unspent Prestige Points`}
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
