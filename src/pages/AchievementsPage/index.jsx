import StatCard from 'components/StatCard'
import { getCompletedAchievementGroups, isAchievementEarned } from 'game/engine'
import { ACHIEVEMENT_DEFINITIONS, ACHIEVEMENT_GROUPS } from 'game/layers'
import styled, { useTheme } from 'styled-components'

// Achievements screen (page id 'achievements') — a pure renderer of the registry in `game/layers`
// plus the earned set in state. Reachable from AppNav → More while ACHIEVEMENTS_FEATURE is on,
// including during the Foundry gate. Secret achievements read "???" until earned; platform-dependent
// ones this platform cannot earn are hidden (none registered yet — no platform probe exists, so the
// flag is honoured by hiding them all).

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
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`

const Group = styled(StatCard)`
  gap: 0.4rem;
`

const GroupHeading = styled.h2`
  align-items: center;
  color: ${props => props.theme.color.textMuted};
  display: flex;
  font-size: 0.85rem;
  gap: 0.5rem;
  justify-content: space-between;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }
`

const Text = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  opacity: ${props => (props.$earned ? 1 : 0.8)};
`

const Detail = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.82em;
`

const Badge = styled.span`
  color: ${props => props.$color};
  font-size: 0.82em;
  white-space: nowrap;
`

const AchievementsPage = ({ game }) => {
  const { state } = game
  const theme = useTheme()
  const completed = new Set(getCompletedAchievementGroups(state))
  const groups = ACHIEVEMENT_GROUPS.map(group => ({
    ...group,
    // Platform-dependent achievements are hidden — no platform can earn them yet.
    members: ACHIEVEMENT_DEFINITIONS.filter(def => def.group === group.id && !def.platformDependent),
  })).filter(group => group.members.length > 0)

  return (
    <RootDiv>
      <Header>
        <h1>Achievements</h1>
      </Header>

      <List aria-label="achievements page">
        {groups.map(group => {
          const earnedCount = group.members.filter(def => isAchievementEarned(state, def.id)).length
          const isComplete = completed.has(group.id)
          return (
            <Group aria-label={`${group.name} achievement group`} key={group.id}>
              <GroupHeading>
                <span>{group.name}</span>
                <Badge
                  $color={isComplete ? theme.color.good : theme.color.textMuted}
                  aria-label={`${group.name} ${earnedCount} of ${group.members.length} earned${isComplete ? ', group complete' : ''}`}
                >
                  {isComplete ? '✅ ' : ''}{earnedCount}/{group.members.length}
                </Badge>
              </GroupHeading>
              {group.members.map(def => {
                const earned = isAchievementEarned(state, def.id)
                const masked = def.secret && !earned
                const label = masked ? '???' : def.name
                return (
                  <Row aria-label={`${label} achievement ${earned ? 'earned' : 'not yet earned'}`} key={def.id}>
                    <Text $earned={earned}>
                      <strong>{label}</strong>
                      {!masked && <Detail>{def.trigger}{def.bonus ? ` — ${def.bonus}` : ''}</Detail>}
                    </Text>
                    <Badge $color={earned ? theme.color.good : theme.color.disabled}>{earned ? '✅' : '🔒'}</Badge>
                  </Row>
                )
              })}
            </Group>
          )
        })}
      </List>
    </RootDiv>
  )
}

export default AchievementsPage
