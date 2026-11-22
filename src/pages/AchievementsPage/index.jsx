import { useState } from 'react'
import StatCard from 'components/StatCard'
import { getAchievementGroupStars, getAchievementProgress, getAchievementReward, getAchievementShortRequirement, getAchievementShortReward, getAchievementStars, getCompletedAchievementGroups, isAchievementEarned } from 'game/engine'
import { ACHIEVEMENT_DEFINITIONS, ACHIEVEMENT_GROUPS, ACHIEVEMENT_SERIES_BY_MEMBER } from 'game/layers'
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

const TotalStars = styled.div`
  color: ${props => props.theme.color.text};
  font-size: 1.1rem;
  margin-top: 0.25rem;
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

// Only the name toggles a disclosure (convention); no link styling.
const NameButton = styled.button`
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  padding: 0;
  text-align: left;
  text-transform: inherit;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
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

const Level = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`

const Badge = styled.span`
  color: ${props => props.$color};
  font-size: 0.82em;
  white-space: nowrap;
`

// "x/y" for an unearned achievement's requirement; full once earned; null for one-shot events.
const formatProgress = (state, def, earned) => {
  const progress = getAchievementProgress(state, def.condition)
  if (!progress) return null
  const current = earned ? progress.target : Math.min(Math.floor(progress.current), progress.target)
  return `${current}/${progress.target}`
}

// Collapses ordered steps of one series into a single entry (at the position of its first step).
const buildEntries = members => {
  const entries = []
  const bySeries = {}
  members.forEach(def => {
    const series = ACHIEVEMENT_SERIES_BY_MEMBER[def.id]
    if (!series) { entries.push({ key: def.id, def }); return }
    if (!bySeries[series.id]) {
      bySeries[series.id] = { key: series.id, name: series.name, levels: [] }
      entries.push(bySeries[series.id])
    }
    bySeries[series.id].levels.push(def)
  })
  return entries
}

const AchievementsPage = ({ game }) => {
  const { state } = game
  // Groups start collapsed; each row's description is its own disclosure.
  const [openGroups, setOpenGroups] = useState({})
  const [openRows, setOpenRows] = useState({})
  const toggle = (setter, id) => setter(prev => ({ ...prev, [id]: !prev[id] }))
  const theme = useTheme()
  const completed = new Set(getCompletedAchievementGroups(state))
  const groups = ACHIEVEMENT_GROUPS.map(group => ({
    ...group,
    // Platform-dependent achievements are hidden — no platform can earn them yet.
    members: ACHIEVEMENT_DEFINITIONS.filter(def => def.group === group.id && !def.platformDependent),
  })).filter(group => group.members.length > 0)

  const totalStars = getAchievementStars(state)
  const bonusStars = groups.reduce((sum, group) => sum + getAchievementGroupStars(state, group.id).bonus, 0)
  const maxStars = groups.reduce((sum, group) => sum + getAchievementGroupStars(state, group.id).total, 0)

  return (
    <RootDiv>
      <Header>
        <h1>Achievements</h1>
        <TotalStars aria-label={`total stars ${totalStars} of ${maxStars}`}>⭐ {totalStars}/{maxStars}{bonusStars > 0 ? ` (incl. ${bonusStars} bonus)` : ''}</TotalStars>
      </Header>

      <List aria-label="achievements page">
        {groups.map(group => {
          const earnedCount = group.members.filter(def => isAchievementEarned(state, def.id)).length
          const isComplete = completed.has(group.id)
          const stars = getAchievementGroupStars(state, group.id)
          return (
            <Group aria-label={`${group.name} achievement group`} key={group.id}>
              <GroupHeading>
                <NameButton
                  aria-expanded={!!openGroups[group.id]}
                  aria-label={`${group.name} group toggle`}
                  onClick={() => toggle(setOpenGroups, group.id)}
                  type="button"
                >
                  {openGroups[group.id] ? '▾' : '▸'} {group.name}
                </NameButton>
                <Badge
                  $color={isComplete ? theme.color.good : theme.color.textMuted}
                  aria-label={`${group.name} ${earnedCount} of ${group.members.length} earned${isComplete ? ', group complete' : ''}`}
                >
                  {isComplete ? '✅ ' : ''}{earnedCount}/{group.members.length} · ⭐ {stars.earned + stars.bonus}/{stars.total}{stars.bonus > 0 ? ` (+${stars.bonus} bonus)` : ''}
                </Badge>
              </GroupHeading>
              {openGroups[group.id] && buildEntries(group.members).map(entry => {
                if (entry.levels) {
                  const reached = entry.levels.filter(def => isAchievementEarned(state, def.id)).length
                  const total = entry.levels.length
                  const done = reached === total
                  const next = entry.levels.find(def => !isAchievementEarned(state, def.id))
                  // One identical bonus on every level (e.g. Level power) is stated once, not per level.
                  const sharedBonus = entry.levels.every(def => def.bonus === entry.levels[0].bonus) ? entry.levels[0].bonus : null
                  return (
                    <Row aria-label={`${entry.name} achievement level ${reached} of ${total}`} key={entry.key} style={{ alignItems: 'flex-start' }}>
                      <Text $earned={reached > 0}>
                        <NameButton
                          aria-expanded={!!openRows[entry.key]}
                          aria-label={`${entry.name} details`}
                          onClick={() => toggle(setOpenRows, entry.key)}
                          type="button"
                        >
                          <strong>{entry.name}</strong>
                        </NameButton>
                        {!openRows[entry.key] && next && <Detail>Next: {getAchievementShortRequirement(next)}{formatProgress(state, next, false) ? ` (${formatProgress(state, next, false)})` : ''}</Detail>}
                        {!openRows[entry.key] && next && getAchievementShortReward(next) && <Detail aria-label={`${entry.name} next reward`}>Reward: {getAchievementShortReward(next)}</Detail>}
                        {openRows[entry.key] && sharedBonus && <Detail>Reward each level: {sharedBonus}</Detail>}
                        {openRows[entry.key] && entry.levels.map((def, i) => {
                          const lvlEarned = isAchievementEarned(state, def.id)
                          const lvlProgress = formatProgress(state, def, lvlEarned)
                          return (
                            <Level key={def.id}>
                              <Detail aria-label={`${entry.name} level ${i + 1} ${lvlEarned ? 'earned' : 'not yet earned'}`}>
                                {lvlEarned ? '✅' : '🔒'} {i + 1}. {def.trigger}{lvlProgress && !lvlEarned ? ` (${lvlProgress})` : ''}
                              </Detail>
                              {!sharedBonus && getAchievementReward(def) && (
                                <Detail aria-label={`${entry.name} level ${i + 1} reward ${lvlEarned ? 'earned' : 'pending'}`}>
                                  {lvlEarned ? 'Reward earned' : 'Reward'}: {getAchievementReward(def)}
                                </Detail>
                              )}
                            </Level>
                          )
                        })}
                      </Text>
                      <Badge $color={done ? theme.color.good : theme.color.textMuted}>{done ? '✅ ' : reached === 0 ? '🔒 ' : ''}Lv {reached}/{total}</Badge>
                    </Row>
                  )
                }
                const { def } = entry
                const earned = isAchievementEarned(state, def.id)
                const masked = def.secret && !earned
                const progressText = masked ? null : formatProgress(state, def, earned)
                const label = masked ? '???' : def.name
                return (
                  <Row aria-label={`${label} achievement ${earned ? 'earned' : 'not yet earned'}`} key={def.id}>
                    <Text $earned={earned}>
                      {masked ? (
                        <strong>{label}</strong>
                      ) : (
                        <NameButton
                          aria-expanded={!!openRows[def.id]}
                          aria-label={`${def.name} details`}
                          onClick={() => toggle(setOpenRows, def.id)}
                          type="button"
                        >
                          <strong>{label}</strong>
                        </NameButton>
                      )}
                      {!masked && openRows[def.id] && <Detail>{def.trigger}</Detail>}
                      {!masked && openRows[def.id] && getAchievementReward(def) && (
                        <Detail aria-label={`${def.name} reward ${earned ? 'earned' : 'pending'}`}>
                          {earned ? 'Reward earned' : 'Reward'}: {getAchievementReward(def)}
                        </Detail>
                      )}
                    </Text>
                    <Badge $color={earned ? theme.color.good : theme.color.disabled}>{progressText && !earned ? `${progressText} ` : ''}{earned ? '✅' : '🔒'}</Badge>
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
