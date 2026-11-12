import Button from 'components/Button'
import ConfirmDialog from 'components/ConfirmDialog'
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

const Text = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const Rule = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
`

// Persistent Factory banner while a challenge is active: code, codename, rule, elapsed time, Exit.
// `children` is the slot for rule-specific readouts that later challenge slices fill.
const ChallengeBanner = ({ state, onExit, children }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const challenge = getActiveChallenge(state)
  if (!challenge) return null
  const elapsed = formatChallengeTime(state.challenges.activeSeconds)
  return (
    <Banner aria-label="active challenge banner">
      <Text>
        <strong>{challenge.id} · {challenge.codename}</strong>
        <Rule>{challenge.rule}</Rule>
        <Rule aria-label={`challenge elapsed time ${elapsed}`}>⏱ {elapsed} · goal {formatChallengeGoal(challenge.goal)}</Rule>
        {getChallengeReadouts(state).map(line => <Rule key={line} aria-label={`challenge status: ${line}`}>{line}</Rule>)}
        {children}
      </Text>
      <Button
        aria-label={`Exit challenge ${challenge.id} ${challenge.codename}`}
        onClick={() => setConfirmOpen(true)}
        title="Abandon this challenge and restart the Factory cycle with no reward"
        type="button"
        variant="prestige"
      >
        Exit
      </Button>
      <ConfirmDialog
        confirmLabel="Exit challenge"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          onExit()
        }}
        open={confirmOpen}
        title={`Exit ${challenge.id}?`}
      >
        <p>Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.</p>
      </ConfirmDialog>
    </Banner>
  )
}

export default ChallengeBanner
