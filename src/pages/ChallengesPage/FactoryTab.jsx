import Button from 'components/Button'
import ChallengeExitButton from 'components/ChallengeExitButton'
import ConfirmDialog from 'components/ConfirmDialog'
import StatCard from 'components/StatCard'
import { formatChallengeGoal, formatChallengeTime, getChallengeTitle, getChallengeUnlockCondition } from 'game/challengeUi'
import { getActiveChallenge, getChallengeUnlockPurges, isChallengeCompleted, isChallengeUnlocked } from 'game/engine'
import { CHALLENGE_DEFINITIONS, LIVE_CHALLENGE_IDS, TIER_DEFINITIONS } from 'game/layers'
import { useState } from 'react'
import styled, { css } from 'styled-components'

const Heading = styled.h2`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

const Legend = styled.p`
  color: ${props => props.theme.color.textMuted};
  display: flex;
  font-size: ${props => props.theme.type.scale.xs.size};
  gap: ${props => props.theme.space.md};
  justify-content: center;
  margin: ${props => props.theme.space.xs} 0 ${props => props.theme.space.sm};
`

// Five tiles per row: F1–F10 (tier autobuyers), F11–F20 (tier tickspeed), F21–F25 (global).
const TileGrid = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`

const tileTone = {
  completed: css`
    background: color-mix(in srgb, ${props => props.theme.color.good} 14%, ${props => props.theme.color.surface});
    border-color: ${props => props.theme.color.good};
  `,
  available: css`
    border-color: ${props => props.theme.color.warn};
  `,
  active: css`
    background: color-mix(in srgb, ${props => props.theme.color.warn} 18%, ${props => props.theme.color.surface});
    border-color: ${props => props.theme.color.warn};
    border-width: 2px;
  `,
  locked: css``,
}

const statusColor = (theme, status) =>
  status === 'completed' ? theme.color.good : status === 'locked' ? theme.color.textFaint : theme.color.warn

const Tile = styled.button`
  align-items: center;
  aspect-ratio: 1.25;
  background: ${props => props.theme.color.surface};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.md};
  color: ${props => props.theme.color.text};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font: inherit;
  gap: 1px;
  justify-content: center;
  min-width: 0;
  padding: 2px;
  ${props => tileTone[props.$status]}
  ${props => props.$selected && css`
    outline: 2px solid ${props.theme.color.text};
    outline-offset: 1px;
  `}

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

const TileId = styled.span`
  color: ${props => (props.$status === 'locked' ? props.theme.color.textFaint : props.theme.color.text)};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.md.size};
  font-weight: 700;
  line-height: 1.1;
`

const TileStatus = styled.span`
  color: ${props => statusColor(props.theme, props.$status)};
  font-size: 0.68rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// One detail panel under the grid for the selected (or active / first ready) challenge.
const Panel = styled.div`
  align-items: center;
  border-top: 1px solid ${props => props.theme.color.border};
  column-gap: ${props => props.theme.space.sm};
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-top: ${props => props.theme.space.sm};
  padding-top: ${props => props.theme.space.sm};
  row-gap: 2px;
`

const Meta = styled.span`
  color: ${props => props.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
`

const tierSymbolByName = Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.name, tier.symbol]))
const GLOBAL_GLYPH = { speedUp: '🌐', scaleUp: '⏩', restage: '🧬', overclock: '🚀', purge: '✦' }

// Short tile tag: tier symbol (⚙-prefixed for tickspeed challenges) or the automation's glyph.
export const getChallengeTag = def => {
  if (def.automation?.kind === 'global') return GLOBAL_GLYPH[def.automation.key] ?? def.target
  const tickspeed = def.target.startsWith('⚙ ')
  const name = tickspeed ? def.target.slice(2) : def.target
  return `${tickspeed ? '⚙' : ''}${tierSymbolByName[name] ?? name}`
}

const STATUS_WORD = { active: 'active', completed: 'completed', available: 'ready', locked: 'locked' }

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
      <p>{def.rule}</p>
      <p>Goal: {formatChallengeGoal(def.goal)}, then Purge.</p>
      <p>Your current Factory cycle is lost and awards no PP.{repeat ? ' Repeats award no PP.' : ''}</p>
    </ConfirmDialog>
  )
}

// Challenges → Factory tab: a 5-column tile grid of every live challenge (registry order) plus one
// detail panel for the selected tile — rule text and the Start / Repeat / Exit control live there.
const ChallengesTab = ({ state, onStart, onExit }) => {
  const active = getActiveChallenge(state)
  const live = CHALLENGE_DEFINITIONS.filter(def => LIVE_CHALLENGE_IDS.has(def.id))
  const entries = live.map(def => {
    const unlocked = isChallengeUnlocked(state, def.id)
    return { def, unlocked, status: unlocked ? getChallengeStatus(state, def) : 'locked' }
  })
  const [selectedId, setSelectedId] = useState(null)
  const fallback = entries.find(entry => entry.status === 'active') ?? entries.find(entry => entry.status === 'available')
  const selected = entries.find(entry => entry.def.id === selectedId) ?? fallback
  const counts = entries.reduce((acc, entry) => ({ ...acc, [entry.status]: (acc[entry.status] ?? 0) + 1 }), {})

  const tileStatusText = ({ def, unlocked, status }) => {
    if (!unlocked) return `🔒 P${getChallengeUnlockPurges(def)}`
    if (status === 'active') return 'active'
    const best = state.challenges?.bestSeconds?.[def.id]
    if (status === 'completed') return best !== undefined ? `✓${formatChallengeTime(best).replace(' ', '')}` : '✓'
    return getChallengeTag(def)
  }

  return (
    <div aria-label="challenges firmware page">
      <StatCard>
        <Heading>Factory challenges</Heading>
        <Legend aria-label="challenge counts">
          <TileStatus $status="completed">● done {counts.completed ?? 0}</TileStatus>
          <TileStatus $status="available">● ready {(counts.available ?? 0) + (counts.active ?? 0)}</TileStatus>
          <TileStatus $status="locked">● locked {counts.locked ?? 0}</TileStatus>
        </Legend>
        <TileGrid role="group" aria-label="factory challenge tiles">
          {entries.map(entry => {
            const { def, unlocked, status } = entry
            return (
              <Tile
                $selected={selected?.def.id === def.id}
                $status={status}
                aria-label={`${def.id}${unlocked ? ` ${def.codename}` : ''}, ${STATUS_WORD[status]}`}
                aria-pressed={selected?.def.id === def.id}
                key={def.id}
                onClick={() => setSelectedId(def.id)}
                title={unlocked ? getChallengeTitle(def) : `${def.id} · ${def.target} · ${getChallengeUnlockCondition(def)}`}
                type="button"
              >
                <TileId $status={status}>{def.id}</TileId>
                <TileStatus $status={status}>{tileStatusText(entry)}</TileStatus>
              </Tile>
            )
          })}
        </TileGrid>
        {selected && (
          <Panel aria-label={`challenge ${selected.def.id}`}>
            <span>
              {selected.unlocked
                ? <strong>{getChallengeTitle(selected.def)}</strong>
                : <strong>{selected.def.id} · {selected.def.target}</strong>}
              {selected.unlocked ? <Meta>{selected.def.rule}</Meta> : <Meta>🔒 {getChallengeUnlockCondition(selected.def)}</Meta>}
            </span>
            {selected.unlocked && selected.status === 'active' && onExit && (
              <ChallengeExitButton challenge={selected.def} onExit={onExit} />
            )}
            {selected.unlocked && selected.status !== 'active' && (
              <Button
                aria-label={`${selected.status === 'completed' ? 'Repeat' : 'Start'} challenge ${getChallengeTitle(selected.def)}${active ? ' (disabled: another challenge is active)' : ''}`}
                disabled={Boolean(active)}
                onClick={() => onStart(selected.def.id)}
                title={active ? `Finish or exit ${active.id} first` : 'Start this challenge'}
                type="button"
                variant="prestige"
              >
                {selected.status === 'completed' ? '↻ Repeat' : '🏁 Start'}
              </Button>
            )}
          </Panel>
        )}
      </StatCard>
    </div>
  )
}

export default ChallengesTab
