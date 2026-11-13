import Button from 'components/Button'
import { isDailyChallengesAvailable } from 'game/dailyChallenges'
import { CHALLENGE_DEFINITIONS } from 'game/layers'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import DailyTab from './DailyTab'
import FactoryTab, { ChallengeStartDialog } from './FactoryTab'

// Challenges — its own AppNav destination (page id 'challenges'), one top tab per kind of challenge:
// 🏁 Factory (permanent nerfed-run challenges that unlock automation speed upgrades) and
// 📅 Daily (three timed Factory runs every UTC day; available after the first Purge).

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

const TabBar = styled.div`
  display: flex;
  gap: 0.5rem;
`

const TabButton = styled(Button)`
  flex: 1;
  font-size: 0.95rem;
  gap: 0.4rem;
`

export const CHALLENGE_TABS = [
  { id: 'factory', icon: '🏁', label: 'Factory', ariaLabel: 'open factory challenges', title: 'Factory — beat a nerfed run to unlock each automation\'s speed upgrades' },
  { id: 'daily', icon: '📅', label: 'Daily', ariaLabel: 'open daily challenges', title: 'Daily — three timed Factory challenges every UTC day' },
]

const ChallengesPage = ({ game, focusNonce = 0 }) => {
  const { state, actions } = game
  const theme = useTheme()
  const [tab, setTab] = useState('factory')
  const [pendingChallengeId, setPendingChallengeId] = useState(null)
  useEffect(() => {
    setTab('factory')
  }, [focusNonce])

  const dailyAvailable = isDailyChallengesAvailable(state)
  const activeTab = tab === 'daily' && !dailyAvailable ? 'factory' : tab

  return (
    <RootDiv>
      <Header>
        <h1>Challenges</h1>
      </Header>
      <TabBar role="tablist" aria-label="challenge types">
        {CHALLENGE_TABS.filter(item => item.id !== 'daily' || dailyAvailable).map(item => (
          <TabButton
            key={item.id}
            aria-label={item.ariaLabel}
            aria-selected={activeTab === item.id}
            color={activeTab === item.id ? theme.color.text : theme.color.textMuted}
            onClick={() => setTab(item.id)}
            role="tab"
            title={item.title}
            type="button"
          >
            <span aria-hidden="true">{item.icon}</span> {item.label}
          </TabButton>
        ))}
      </TabBar>
      {activeTab === 'factory' && <FactoryTab onStart={setPendingChallengeId} state={state} />}
      {activeTab === 'daily' && <DailyTab actions={actions} state={state} />}
      <ChallengeStartDialog
        def={pendingChallengeId ? CHALLENGE_DEFINITIONS.find(def => def.id === pendingChallengeId) : null}
        onCancel={() => setPendingChallengeId(null)}
        onConfirm={() => {
          actions.enterChallenge(pendingChallengeId)
          setPendingChallengeId(null)
        }}
        state={state}
      />
    </RootDiv>
  )
}

export default ChallengesPage
