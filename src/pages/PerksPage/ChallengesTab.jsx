import Button from 'components/Button'
import ConfirmDialog from 'components/ConfirmDialog'
import StatCard from 'components/StatCard'
import { formatChallengeGoal, formatChallengeTime, getChallengeTitle, getChallengeUnlockCondition } from 'game/challengeUi'
import { getActiveChallenge, isChallengeCompleted, isChallengeUnlocked } from 'game/engine'
import { CHALLENGE_DEFINITIONS, LIVE_CHALLENGE_IDS } from 'game/layers'
import styled from 'styled-components'

const Heading = styled.h2`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

const ChallengeRow = styled.div`
  align-items: center;
  column-gap: 0.6rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  padding: 0.5rem 0;

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }
`

const Meta = styled.span`
  color: ${props => props.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`

export const getChallengeStatus = (state, def) => {
  if (getActiveChallenge(state)?.id === def.id) return 'active'
  if (isChallengeCompleted(state, def.id)) return 'completed'
  return 'available'
}

// Start/repeat confirm; the caller owns which challenge is pending.
export const ChallengeStartDialog = ({ def, state, onCancel, onConfirm }) => {
  if (!def) return null
  const repeat = isChallengeCompleted(state, def.id)
  return (
    <ConfirmDialog
      confirmLabel={repeat ? 'Start repeat' : 'Start challenge'}
      onCancel={onCancel}
      onConfirm={onConfirm}
      open
      title={`Start ${getChallengeTitle(def)}?`}
    >
      <p><strong>Rule:</strong> {def.rule}</p>
      <p><strong>Goal:</strong> reach {formatChallengeGoal(def.goal)} and Purge.</p>
      <p>Starts a fresh Factory cycle now — the current one is lost and awards no PP. The Foundry is untouched.</p>
      {repeat && <p>You have already completed this challenge: a repeat only improves your best time and awards no PP.</p>}
    </ConfirmDialog>
  )
}

// Firmware → Challenges tab: every live challenge, in registry order.
const ChallengesTab = ({ state, onStart }) => {
  const active = getActiveChallenge(state)
  const live = CHALLENGE_DEFINITIONS.filter(def => LIVE_CHALLENGE_IDS.has(def.id))
  return (
    <div aria-label="challenges firmware page">
      <StatCard>
        <Heading>Factory challenges</Heading>
        {live.map(def => {
          const unlocked = isChallengeUnlocked(state, def.id)
          const status = getChallengeStatus(state, def)
          const best = state.challenges?.bestSeconds?.[def.id]
          return (
            <ChallengeRow key={def.id} aria-label={`challenge ${def.id}`}>
              <span>
                {unlocked ? <strong>{getChallengeTitle(def)}</strong> : <strong>{def.id} · {def.target}</strong>}
                {unlocked ? (
                  <>
                    <Meta>{def.rule}</Meta>
                    <Meta>
                      {status === 'active' ? 'Active' : status === 'completed' ? '✓ Completed' : 'Available'}
                      {best !== undefined && ` · best ${formatChallengeTime(best)}`}
                    </Meta>
                  </>
                ) : (
                  <Meta>🔒 {getChallengeUnlockCondition(def)}</Meta>
                )}
              </span>
              {unlocked && status !== 'active' && (
                <Button
                  aria-label={`${status === 'completed' ? 'Repeat' : 'Start'} challenge ${getChallengeTitle(def)}${active ? ' (disabled: another challenge is active)' : ''}`}
                  disabled={Boolean(active)}
                  onClick={() => onStart(def.id)}
                  title={active ? `Finish or exit ${active.id} first` : 'Start this challenge'}
                  type="button"
                  variant="prestige"
                >
                  {status === 'completed' ? 'Repeat' : 'Start'}
                </Button>
              )}
            </ChallengeRow>
          )
        })}
      </StatCard>
    </div>
  )
}

export default ChallengesTab
