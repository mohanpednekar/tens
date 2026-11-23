import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theme'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { generateDailyChallenge, getUtcDateId, startDailyRun } from 'game/dailyChallenges'
import { createInitialGameState } from 'game/engine'
import { DAILY_CHALLENGES_FEATURE } from 'game/layers'
import { describeDailyChallenge, describeManual } from './DailyTab'
import ChallengesPage from './index'

const base = () => ({
  ...createInitialGameState(),
  purge: { ...createInitialGameState().purge, points: 1, count: 1 },
})
const wrap = ui => render(<ThemeProvider mode="dark">{ui}</ThemeProvider>)
const makeGame = state => ({ state, actions: new Proxy({}, { get: (target, key) => target[key] ?? (target[key] = vi.fn()) }) })

// Pin the clock: the run definitions are generated per UTC date, and a date whose 10h definition falls back to the
// fixed (automation-free) definition would otherwise break these tests on that day.
beforeEach(() => {
  DAILY_CHALLENGES_FEATURE.enabled = true
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-11-14T12:00:00Z'))
})
afterEach(() => {
  DAILY_CHALLENGES_FEATURE.enabled = false
  vi.useRealTimers()
})

describe('Firmware Daily tab', () => {
  it('is hidden before the first Purge and when the switch is off', () => {
    wrap(<ChallengesPage game={makeGame({ ...base(), purge: { ...base().purge, count: 0 } })} />)
    expect(screen.queryByRole('tab', { name: 'open daily challenges' })).toBeNull()
    DAILY_CHALLENGES_FEATURE.enabled = false
    wrap(<ChallengesPage game={makeGame(base())} />)
    expect(screen.queryByRole('tab', { name: 'open daily challenges' })).toBeNull()
  })

  it('lists three cards and starts a run through the action', () => {
    const game = makeGame(base())
    wrap(<ChallengesPage game={game} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open daily challenges' }))
    for (const id of ['10m', '1h', '10h']) expect(screen.getByLabelText(`daily ${id}`)).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'start daily 1h' }))
    expect(game.actions.dailyStart).toHaveBeenCalledWith('1h')
  })

  it('shows each challenge\'s modified conditions, on the card and inside the run', () => {
    const def = generateDailyChallenge(getUtcDateId(Date.now()), '10m')
    expect(def.conditions.length).toBeGreaterThan(0)
    wrap(<ChallengesPage game={makeGame(startDailyRun('1h', Date.now())(base()))} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open daily challenges' }))
    expect(screen.queryByLabelText('daily 10m conditions')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: '10m 10 minutes details' }))
    expect(screen.getByLabelText('daily 10m conditions').textContent).toBe(describeDailyChallenge(def))
    expect(screen.getByLabelText('daily 10m conditions').textContent).toContain(def.conditions[0])
    fireEvent.click(screen.getByRole('button', { name: 'open daily 1h' }))
    expect(screen.getByLabelText('daily run conditions')).toBeTruthy()
  })

  it('describes the head start in words', () => {
    expect(describeDailyChallenge({ conditions: ['Costs ×5'], startBytes: 5000, headStart: { scaleUps: 1, overclock: 5 } })).toBe('Costs ×5 · starts with 5,000 B · 1 Scale Up · Overclock 5')
    expect(describeDailyChallenge({ conditions: [], startBytes: 20000, headStart: { scaleUps: 0, overclock: 0 } })).toBe('starts with 2e4 B')
    expect(describeDailyChallenge({ conditions: [], automations: generateDailyChallenge('2026-11-12', '10h').automations })).toBe('')
  })

  it('lists what stays manual, and offers a switch per automation the run has', () => {
    expect(describeManual({ automations: generateDailyChallenge('2026-11-12', '1h').automations })).toBe('Manual: tickspeed, Scale Up, Restage, Overclock')
    const game = makeGame(startDailyRun('10h', Date.now())(base()))
    wrap(<ChallengesPage game={game} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open daily challenges' }))
    fireEvent.click(screen.getByRole('button', { name: 'open daily 10h' }))
    expect(screen.getByRole('group', { name: 'Auto-buy switches' })).toBeTruthy()
    // The reset automations start paused in the 10-hour run: releasing them is the player's call.
    fireEvent.click(screen.getByRole('button', { name: 'Auto Overclock: paused' }))
    expect(game.actions.dailyPlay).toHaveBeenCalledWith('10h', 'automation', { key: 'overclock', enabled: true })
    fireEvent.click(screen.getByRole('button', { name: 'Auto Accelerate: on' }))
    expect(game.actions.dailyPlay).toHaveBeenCalledWith('10h', 'automation', { key: 'speedUp', enabled: false })
    expect(screen.getByLabelText('daily run attempt mark').textContent).toContain('Counts as attempted from:')
  })

  it('shows a running row with Resume, Restart / Forfeit behind its label, and confirm-guards Forfeit', () => {
    const started = startDailyRun('10m', Date.now())(base())
    // Fund the run's game (below the Purge threshold) so the first Buy button is enabled whatever the day's seeded head start is.
    const run = started.daily.runs['10m']
    const state = { ...started, daily: { ...started.daily, runs: { ...started.daily.runs, '10m': { ...run, game: { ...run.game, resources: { ...run.game.resources, base: 1e80 } } } } } }
    const game = makeGame(state)
    wrap(<ChallengesPage game={game} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open daily challenges' }))
    expect(screen.queryByRole('button', { name: 'forfeit daily 10m' })).toBeNull()
    expect(screen.getByRole('progressbar', { name: 'daily 10m progress' })).toHaveAttribute('aria-valuenow')
    expect(screen.getByLabelText('daily 10m').textContent).toMatch(/left · \d+%/)
    fireEvent.click(screen.getByRole('button', { name: '10m 10 minutes details' }))
    expect(screen.getByRole('button', { name: 'restart daily 10m' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'forfeit daily 10m' }))
    expect(game.actions.dailyForfeit).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Forfeit' }))
    expect(game.actions.dailyForfeit).toHaveBeenCalledWith('10m')
    fireEvent.click(screen.getByRole('button', { name: 'open daily 10m' }))
    expect(screen.getByLabelText('daily run 10m')).toBeTruthy()
    // The run is played on the Factory page itself, with its actions routed to the run and its pinned bar on the run's target.
    expect(screen.getByLabelText('goal progress').textContent).toContain(state.daily.runs['10m'].def.objective.label)
    expect(screen.queryByLabelText('purge progress')).toBeNull()
    fireEvent.click(screen.getAllByRole('button', { name: /^Buy.* for .*completed levels/ })[0])
    expect(game.actions.dailyPlay).toHaveBeenCalledWith('10m', 'buyTier', 'tier01')
  })
})
