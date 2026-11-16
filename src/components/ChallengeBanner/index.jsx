import ChallengeExitButton from 'components/ChallengeExitButton'
import { getActiveChallenge } from 'game/engine'
import { formatChallengeGoal, formatChallengeTime, getChallengeReadouts } from 'game/challengeUi'
import { useState } from 'react'
import styled from 'styled-components'

const Banner = styled.section`
  align-items: center;
  background: ${props => props.theme.color.surfaceRaised};
  border: 1px solid ${props => props.theme.color.warn};
  border-radius: ${props => props.theme.radius.md};
  color: ${props => props.theme.color.text};
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  justify-content: space-between;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
`

// The code · codename line is the disclosure toggle (only a disclosure's name toggles it — never the whole banner).
const Title = styled.button`
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  padding: 0;
  text-align: left;
  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.warn};
    outline-offset: 2px;
  }
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const Rule = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
`

// Persistent Factory banner while a challenge is active: code, codename, rule, elapsed time. Exit is hidden until the
// title is tapped (it is also always available on Challenges → Factory), so it cannot be hit by accident.
// `children` is the slot for rule-specific readouts that later challenge slices fill.
const ChallengeBanner = ({ state, onExit, children }) => {
  const [expanded, setExpanded] = useState(false)
  const challenge = getActiveChallenge(state)
  if (!challenge) return null
  const elapsed = formatChallengeTime(state.challenges.activeSeconds)
  return (
    <Banner aria-label="active challenge banner">
      <Text>
        <Title aria-expanded={expanded} aria-label={`${challenge.id} ${challenge.codename}, ${expanded ? 'hide' : 'show'} exit`} onClick={() => setExpanded(open => !open)} type="button">
          {challenge.id} · {challenge.codename} <span aria-hidden="true">{expanded ? '▴' : '▾'}</span>
        </Title>
        <Rule>{challenge.rule}</Rule>
        <Rule aria-label={`challenge elapsed time ${elapsed}`}>⏱ {elapsed} · goal {formatChallengeGoal(challenge.goal)}</Rule>
        {getChallengeReadouts(state).map(line => <Rule key={line} aria-label={`challenge status: ${line}`}>{line}</Rule>)}
        {children}
      </Text>
      {expanded && <ChallengeExitButton challenge={challenge} onExit={onExit} />}
    </Banner>
  )
}

export default ChallengeBanner
