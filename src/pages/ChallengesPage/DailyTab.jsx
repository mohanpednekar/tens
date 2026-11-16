import Button from 'components/Button'
import ConfirmDialog from 'components/ConfirmDialog'
import StatCard from 'components/StatCard'
import {
  DAILY_FORMATS,
  DAILY_MAX_CREDITS,
  canRestartDailyRun,
  getDailyCredits,
  getMsUntilNextUtcDay,
  getRunProgress,
  generateDailyChallenge,
  getUtcDateId,
} from 'game/dailyChallenges'
import { formatAmount } from 'game/engine'
import MainPage from 'pages/MainPage'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Heading = styled.h2`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

const Row = styled.div`
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

const Actions = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: flex-end;
`

const Bar = styled.div`
  background: ${props => props.theme.color.border};
  border-radius: 999px;
  height: 0.4rem;
  margin-top: 0.3rem;
  overflow: hidden;

  > span {
    background: ${props => props.theme.color.good};
    display: block;
    height: 100%;
    width: ${props => props.$percent}%;
  }
`

const BackBanner = styled.div`
  align-items: center;
  display: flex;
  gap: 0.6rem;
  justify-content: space-between;
`

export const formatDuration = seconds => {
  const total = Math.max(0, Math.ceil(seconds))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

// A definition's modified conditions, then its seeded start (balance, Scale Ups, Overclock), as one short line.
export const describeDailyChallenge = def => [
  ...(def.conditions ?? []),
  def.startBytes > 0 && `starts with ${formatAmount(def.startBytes)} B`,
  def.headStart?.scaleUps > 0 && `${def.headStart.scaleUps} Scale Up${def.headStart.scaleUps === 1 ? '' : 's'}`,
  def.headStart?.overclock > 0 && `Overclock ${def.headStart.overclock}`,
].filter(Boolean).join(' · ')

const OUTCOME_LABELS = { won: '✓ Won', completed: 'Completed (no win)', expired: 'Expired' }

// A run is played on the Factory page itself: the same component the main game uses, fed the run's own game state
// and actions that route to that run. Only the progress is separate.
const RunView = ({ format, run, actions, onBack }) => {
  const play = (name, arg) => actions.dailyPlay(format.id, name, arg)
  const percent = Math.round(getRunProgress(run) * 100)
  const objective = run.def.objective ?? { label: '', target: 0 }
  const reached = run.metrics?.[objective.key] ?? 0
  const runGame = {
    state: run.game,
    // The Factory page's pinned progress bar tracks the run's target instead of Purge.
    goal: { percent, label: `${percent}% · ${objective.label}`, ariaLabel: `progress toward the daily objective: ${objective.label}` },
    offlineProgress: null,
    buyMaxMode: false,
    actions: {
      buyTierQuantity: tierId => play('buyTier', tierId),
      buyTickspeedMultiplier: tierId => play('tierTickspeed', tierId),
      buyGlobalTickspeedMultiplier: () => play('clockSpeed'),
      scaleUp: () => play('scaleUp'),
      overclock: () => play('overclock'),
      consumeXpForLastTierTickspeed: amount => play('restage', amount),
      purge: () => {},
      exitChallenge: () => {},
    },
  }
  return (
    <>
      <StatCard aria-label={`daily run ${format.id}`}>
        <BackBanner>
          <Heading>Daily {format.label}</Heading>
          <Button aria-label="back to daily challenges" onClick={onBack} type="button" variant="prestige">Back</Button>
        </BackBanner>
        <Meta>
          {objective.label} · now {formatAmount(reached)} · {formatDuration(run.def.limitSeconds - run.simSeconds)} left
        </Meta>
        {describeDailyChallenge(run.def) && <Meta aria-label="daily run conditions">{describeDailyChallenge(run.def)}</Meta>}
        <Bar $percent={percent}><span /></Bar>
      </StatCard>
      <MainPage game={runGame} />
    </>
  )
}

// Firmware → Daily tab: today's three Factory challenges (10 min / 1 h / 10 h), played in parallel with the main game.
const DailyTab = ({ state, actions }) => {
  const [now, setNow] = useState(() => Date.now())
  const [openFormat, setOpenFormat] = useState(null)
  const [pending, setPending] = useState(null) // { kind: 'restart' | 'forfeit', formatId }
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const today = getUtcDateId(now)
  const credits = getDailyCredits(state, today)
  const openRun = openFormat ? state.daily.runs[openFormat] : null

  if (openRun) {
    return (
      <div aria-label="daily firmware page">
        <RunView actions={actions} format={DAILY_FORMATS.find(f => f.id === openFormat)} onBack={() => setOpenFormat(null)} run={openRun} />
      </div>
    )
  }

  return (
    <div aria-label="daily firmware page">
      <StatCard>
        <Heading>Daily challenges · {today}</Heading>
        <Meta aria-label="daily credits">
          Credits {credits.total}/{DAILY_MAX_CREDITS} · new in {formatDuration(getMsUntilNextUtcDay(now) / 1000)}
        </Meta>
        {DAILY_FORMATS.map(format => {
          const run = state.daily.runs[format.id]
          const result = state.daily.results[today]?.[format.id]
          const lastDay = run && run.def.dateId !== today
          const def = run ? run.def : generateDailyChallenge(today, format.id)
          return (
            <Row key={format.id} aria-label={`daily ${format.id}`}>
              <span>
                <strong>{format.label}</strong>
                                {run ? (
                  <Meta>
                    Running{lastDay ? ` (from ${run.def.dateId})` : ''} · {formatDuration(run.def.limitSeconds - run.simSeconds)} left · {Math.round(getRunProgress(run) * 100)}%
                  </Meta>
                ) : (
                  <Meta>
                    {def.objective.label}
                    {result ? ` · ${OUTCOME_LABELS[result.lastOutcome]}` : ' · Not started'}
                    {result?.bestSeconds != null && ` · personal best ${formatDuration(result.bestSeconds)}`}
                  </Meta>
                )}
                {describeDailyChallenge(def) && <Meta aria-label={`daily ${format.id} conditions`}>{describeDailyChallenge(def)}</Meta>}
              </span>
              <Actions>
                {run ? (
                  <>
                    <Button aria-label={`open daily ${format.id}`} onClick={() => setOpenFormat(format.id)} type="button" variant="prestige">Open</Button>
                    {!lastDay && <Button aria-label={`restart daily ${format.id}`} onClick={() => setPending({ kind: 'restart', formatId: format.id })} type="button">Restart</Button>}
                    <Button aria-label={`forfeit daily ${format.id}`} onClick={() => setPending({ kind: 'forfeit', formatId: format.id })} type="button">Forfeit</Button>
                  </>
                ) : (
                  <Button
                    aria-label={`${result ? 'replay' : 'start'} daily ${format.id}`}
                    onClick={() => { actions.dailyStart(format.id); setOpenFormat(format.id) }}
                    type="button"
                    variant="prestige"
                  >
                    {result ? 'Replay' : 'Start'}
                  </Button>
                )}
              </Actions>
            </Row>
          )
        })}
      </StatCard>
      <ConfirmDialog
        confirmLabel={pending?.kind === 'restart' ? 'Restart' : 'Forfeit'}
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending.kind === 'restart') {
            if (canRestartDailyRun(state, pending.formatId, Date.now())) actions.dailyRestart(pending.formatId)
          } else actions.dailyForfeit(pending.formatId)
          setPending(null)
        }}
        open={Boolean(pending)}
        title={pending?.kind === 'restart' ? 'Restart this challenge?' : 'Forfeit this challenge?'}
      >
        <p>This run's progress is lost{pending?.kind === 'restart' ? ' and a fresh run starts.' : '.'}</p>
      </ConfirmDialog>
    </div>
  )
}

export default DailyTab
