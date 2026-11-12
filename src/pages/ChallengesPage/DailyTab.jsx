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
import {
  buyGlobalTickspeedMultiplier,
  buyTierQuantity,
  formatAmount,
  formatCurrency,
  isGlobalTickspeedMultiplierUnlocked,
  isTierUnlocked,
  overclockGame,
  scaleUpGame,
} from 'game/engine'
import { MONEY_ID, TIER_DEFINITIONS } from 'game/layers'
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

const OUTCOME_LABELS = { won: '✓ Won', completed: 'Completed (no win)', expired: 'Expired' }
const BIG = Number.MAX_SAFE_INTEGER

const RunView = ({ format, run, actions, onBack }) => {
  const game = run.game
  const can = fn => fn(game) !== game
  const bytes = run.earnedBits / 8
  return (
    <StatCard aria-label={`daily run ${format.id}`}>
      <BackBanner>
        <Heading>Daily {format.label} — Factory run</Heading>
        <Button aria-label="back to daily challenges" onClick={onBack} type="button" variant="prestige">Back</Button>
      </BackBanner>
      <Meta>
        Earn {formatAmount(10 ** run.def.targetExponent)} B · earned {formatAmount(bytes)} B · {formatDuration(run.def.limitSeconds - run.simSeconds)} left
      </Meta>
      <Bar $percent={Math.round(getRunProgress(run) * 100)}><span /></Bar>
      <Meta aria-label="daily run balance">Balance {formatCurrency(game.resources[MONEY_ID] ?? 0)}</Meta>
      {TIER_DEFINITIONS.filter(tier => isTierUnlocked(game)(tier)).map(tier => (
        <Row key={tier.id}>
          <span><strong>{tier.name}</strong><Meta>owned {formatAmount(game.owned[tier.id] ?? 0)}</Meta></span>
          <Button
            aria-label={`buy ${tier.name} in daily ${format.id}`}
            disabled={!can(buyTierQuantity(tier.id, BIG))}
            onClick={() => actions.dailyBuyTier(format.id, tier.id)}
            type="button"
          >
            Buy
          </Button>
        </Row>
      ))}
      <Row>
        <span><strong>Run upgrades</strong><Meta>{game.globalTickspeedMultiplier ? `Clock Speed level ${game.globalTickspeedMultiplier} · ` : ''}Scale Up / Overclock restore the starting balance</Meta></span>
        <Actions>
          {isGlobalTickspeedMultiplierUnlocked(game) && (
            <Button aria-label={`buy Clock Speed in daily ${format.id}`} disabled={!can(buyGlobalTickspeedMultiplier)} onClick={() => actions.dailyClockSpeed(format.id)} type="button">Clock</Button>
          )}
          <Button aria-label={`Scale Up daily ${format.id}`} disabled={!can(scaleUpGame)} onClick={() => actions.dailyScaleUp(format.id)} type="button" variant="prestige">Scale Up</Button>
          <Button aria-label={`Overclock daily ${format.id}`} disabled={!can(overclockGame)} onClick={() => actions.dailyOverclock(format.id)} type="button" variant="prestige">Overclock</Button>
        </Actions>
      </Row>
    </StatCard>
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
          Credits today {credits.total}/{DAILY_MAX_CREDITS} (wins {credits.wins}/3 + participation {credits.participation}/1) · new challenges in {formatDuration(getMsUntilNextUtcDay(now) / 1000)}
        </Meta>
        {DAILY_FORMATS.map(format => {
          const run = state.daily.runs[format.id]
          const result = state.daily.results[today]?.[format.id]
          const lastDay = run && run.def.dateId !== today
          return (
            <Row key={format.id} aria-label={`daily ${format.id}`}>
              <span>
                <strong>{format.label}</strong>
                <Meta>{format.style}</Meta>
                {run ? (
                  <Meta>
                    Running{lastDay ? ` (from ${run.def.dateId})` : ''} · {formatDuration(run.def.limitSeconds - run.simSeconds)} left · {Math.round(getRunProgress(run) * 100)}%
                  </Meta>
                ) : (
                  <Meta>
                    Earn {formatAmount(10 ** generateDailyChallenge(today, format.id).targetExponent)} B
                    {result ? ` · ${OUTCOME_LABELS[result.lastOutcome]}` : ' · Not started'}
                    {result?.bestSeconds != null && ` · personal best ${formatDuration(result.bestSeconds)}`}
                  </Meta>
                )}
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
        <Meta>Replays can improve your personal best (local to this device) but never earn more credits.</Meta>
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
        <p>This run's progress is lost{pending?.kind === 'restart' ? ' and a fresh run starts. Restart is only possible until UTC midnight.' : ' and earns nothing.'}</p>
      </ConfirmDialog>
    </div>
  )
}

export default DailyTab
