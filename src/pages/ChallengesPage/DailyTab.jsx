import Button from 'components/Button'
import ConfirmDialog from 'components/ConfirmDialog'
import StatCard from 'components/StatCard'
import {
  DAILY_AUTOMATIONS,
  DAILY_FORMATS,
  DAILY_MAX_CREDITS,
  canRestartDailyRun,
  getDailyCredits,
  getMsUntilNextUtcDay,
  getRunProgress,
  generateDailyChallenge,
  getUtcDateId,
  isDailyAutomationOn,
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

const DailyHeader = styled.p`
  color: ${props => props.theme.color.textMuted};
  font-size: ${props => props.theme.type.scale.xs.size};
  margin: 0.1rem 0 0.5rem;
  text-align: center;
`

const FORMAT_ACCENT = { '10m': 'good', '1h': 'info', '10h': 'violet' }

// One line per format in the Factory tier-row look: format label (the details toggle), objective +
// status, and the main action in a fixed track. Conditions and Restart/Forfeit live in the details.
const Row = styled(StatCard)`
  align-items: center;
  border-left: 3px solid ${props => props.theme.color[FORMAT_ACCENT[props.$formatId]] ?? props.theme.color.accent};
  column-gap: ${props => props.theme.space.sm};
  display: grid;
  grid-template-areas:
    'label text action'
    'bar bar bar'
    'details details details';
  grid-template-columns: 2.6rem minmax(0, 1fr) 6.5rem;
  padding: 3px 3px 3px ${props => props.theme.space.sm};
  row-gap: 0;
`

const RowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.xs};
`

const FormatLabel = styled.span`
  cursor: pointer;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.md.size};
  font-weight: 700;
  grid-area: label;

  &:focus-visible {
    border-radius: ${props => props.theme.radius.sm};
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

const RowText = styled.span`
  font-size: ${props => props.theme.type.scale.sm.size};
  grid-area: text;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  > span {
    color: ${props => props.theme.color.textMuted};
    font-size: ${props => props.theme.type.scale.xs.size};
  }
`

const ActionButton = styled(Button)`
  font-size: ${props => props.theme.type.scale.xs.size};
  grid-area: action;
  min-height: 2rem;
  padding: 0 0.5em;
  width: 100%;
`

const RowBar = styled.div`
  background: ${props => props.theme.color.border};
  border-radius: 999px;
  grid-area: bar;
  height: 4px;
  margin: 3px 0 2px;
  overflow: hidden;

  > span {
    background: ${props => props.theme.color[FORMAT_ACCENT[props.$formatId]] ?? props.theme.color.good};
    display: block;
    height: 100%;
    width: ${props => props.$percent}%;
  }
`

const RowDetails = styled.div`
  border-top: 1px solid ${props => props.theme.color.border};
  grid-area: details;
  margin-top: ${props => props.theme.space.xs};
  padding: ${props => props.theme.space.xs} 0 2px;
`

const DetailActions = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
  margin-top: 0.3rem;
`

const Meta = styled.span`
  color: ${props => props.theme.color.textMuted};
  display: block;
  font-size: 0.85rem;
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

const AUTOMATION_GROUPS = [
  { id: 'buy', title: 'Auto-buy', manual: labels => `${labels.join(' ')} buying` },
  { id: 'tickspeed', title: 'Auto-tickspeed', manual: () => 'tickspeed' },
  { id: 'global', title: 'Auto', manual: labels => labels.join(', ') },
]

// What the player has to do by hand in this run: every automation the run does not have, grouped. '' when it has all.
export const describeManual = def => {
  if (!def.automations) return ''
  const has = new Set(def.automations)
  const parts = AUTOMATION_GROUPS
    .map(group => ({ group, missing: DAILY_AUTOMATIONS.filter(automation => automation.group === group.id && !has.has(automation.key)) }))
    .filter(({ missing }) => missing.length > 0)
    .map(({ group, missing }) => group.manual(missing.map(automation => automation.label)))
  return parts.length > 0 ? `Manual: ${parts.join(', ')}` : ''
}

const SwitchRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
`

const Chip = styled.button`
  background: ${props => (props.$on ? props.theme.color.good : 'transparent')};
  border: 1px solid ${props => (props.$on ? props.theme.color.good : props.theme.color.border)};
  border-radius: 999px;
  color: ${props => (props.$on ? props.theme.color.surface : props.theme.color.textMuted)};
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  min-height: 1.75rem;
  padding: 0.1rem 0.6rem;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

// One switch per automation the run has: tap to pause or resume it.
const AutomationSwitches = ({ run, onToggle }) => {
  const has = new Set(run.def.automations ?? [])
  return AUTOMATION_GROUPS.map(group => {
    const automations = DAILY_AUTOMATIONS.filter(automation => automation.group === group.id && has.has(automation.key))
    if (automations.length === 0) return null
    return (
      <SwitchRow key={group.id} aria-label={`${group.title} switches`} role="group">
        <Meta as="span">{group.title}</Meta>
        {automations.map(automation => {
          const on = isDailyAutomationOn(run.game, automation.key)
          const name = `${group.title} ${automation.label}`
          return (
            <Chip
              key={automation.key}
              aria-label={`${name}: ${on ? 'on' : 'paused'}`}
              aria-pressed={on}
              onClick={() => onToggle(automation.key, !on)}
              title={`${name} is ${on ? 'on — tap to pause' : 'paused — tap to resume'}`}
              type="button"
              $on={on}
            >
              {automation.label}
            </Chip>
          )
        })}
      </SwitchRow>
    )
  })
}

// A definition's modified conditions, then its seeded start (balance, Scale Ups, Overclock), as one short line.
export const describeDailyChallenge = def => [
  ...(def.conditions ?? []),
  def.startBytes > 0 && `starts with ${formatAmount(def.startBytes)} B`,
  def.headStart?.scaleUps > 0 && `${def.headStart.scaleUps} Scale Up${def.headStart.scaleUps === 1 ? '' : 's'}`,
  def.headStart?.overclock > 0 && `Overclock ${def.headStart.overclock}`,
  describeManual(def),
].filter(Boolean).join(' · ')

const OUTCOME_LABELS = { won: '✓ Won', completed: 'Attempted (no win)', expired: 'Expired' }

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
        {objective.attemptLabel && <Meta aria-label="daily run attempt mark">Counts as attempted from: {objective.attemptLabel}</Meta>}
        {describeDailyChallenge(run.def) && <Meta aria-label="daily run conditions">{describeDailyChallenge(run.def)}</Meta>}
        <Bar $percent={percent}><span /></Bar>
        <AutomationSwitches onToggle={(key, enabled) => play('automation', { key, enabled })} run={run} />
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
  const [openDetails, setOpenDetails] = useState(() => new Set())
  const toggleDetails = id => setOpenDetails(prev => {
    const next = new Set(prev)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })
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
      <DailyHeader>
        {today} · <span aria-label="daily credits">Credits {credits.total}/{DAILY_MAX_CREDITS} · new in {formatDuration(getMsUntilNextUtcDay(now) / 1000)}</span>
      </DailyHeader>
      <RowList>
        {DAILY_FORMATS.map(format => {
          const run = state.daily.runs[format.id]
          const result = state.daily.results[today]?.[format.id]
          const lastDay = run && run.def.dateId !== today
          const def = run ? run.def : generateDailyChallenge(today, format.id)
          const open = openDetails.has(format.id)
          const conditions = describeDailyChallenge(def)
          const status = run
            ? `${lastDay ? `from ${run.def.dateId} · ` : ''}${formatDuration(run.def.limitSeconds - run.simSeconds)} left`
            : [
                result && OUTCOME_LABELS[result.lastOutcome],
                result?.bestSeconds != null && `best ${formatDuration(result.bestSeconds)}`,
              ].filter(Boolean).join(' · ')
          return (
            <Row $formatId={format.id} key={format.id} aria-label={`daily ${format.id}`}>
              <FormatLabel
                aria-expanded={open}
                aria-label={`${format.label} details`}
                onClick={() => toggleDetails(format.id)}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    toggleDetails(format.id)
                  }
                }}
                role="button"
                tabIndex={0}
                title={format.label}
              >
                {format.id}
              </FormatLabel>
              <RowText title={`${def.objective.label} · ${status}`}>
                <strong>{def.objective.label}</strong>{status && <span> · {status}</span>}
              </RowText>
              {run ? (
                <ActionButton aria-label={`open daily ${format.id}`} onClick={() => setOpenFormat(format.id)} type="button" variant="primary">
                  ▶ Resume
                </ActionButton>
              ) : (
                <ActionButton
                  aria-label={`${result ? 'replay' : 'start'} daily ${format.id}`}
                  onClick={() => { actions.dailyStart(format.id); setOpenFormat(format.id) }}
                  type="button"
                  variant="prestige"
                >
                  {result ? '↻ Replay' : '🏁 Start'}
                </ActionButton>
              )}
              {run && <RowBar $formatId={format.id} $percent={Math.round(getRunProgress(run) * 100)}><span /></RowBar>}
              {open && (
                <RowDetails>
                  {conditions && <Meta aria-label={`daily ${format.id} conditions`}>{conditions}</Meta>}
                  {run && (
                    <DetailActions>
                      {!lastDay && <Button aria-label={`restart daily ${format.id}`} onClick={() => setPending({ kind: 'restart', formatId: format.id })} type="button">Restart</Button>}
                      <Button aria-label={`forfeit daily ${format.id}`} onClick={() => setPending({ kind: 'forfeit', formatId: format.id })} type="button" variant="danger">Forfeit</Button>
                    </DetailActions>
                  )}
                </RowDetails>
              )}
            </Row>
          )
        })}
      </RowList>
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
