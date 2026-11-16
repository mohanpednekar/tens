import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theme'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { generateDailyChallenge, getUtcDateId, startDailyRun } from 'game/dailyChallenges'
import { createInitialGameState } from 'game/engine'
import { DAILY_CHALLENGES_FEATURE } from 'game/layers'
import { describeDailyChallenge } from './DailyTab'
import ChallengesPage from './index'

const base = () => ({
  ...createInitialGameState(),
  purge: { ...createInitialGameState().purge, points: 1, count: 1 },
})
const wrap = ui => render(<ThemeProvider mode="dark">{ui}</ThemeProvider>)
const makeGame = state => ({ state, actions: new Proxy({}, { get: (target, key) => target[key] ?? (target[key] = vi.fn()) }) })

beforeEach(() => { DAILY_CHALLENGES_FEATURE.enabled = true })
afterEach(() => { DAILY_CHALLENGES_FEATURE.enabled = false })

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
    expect(screen.getByLabelText('daily 10m conditions').textContent).toBe(describeDailyChallenge(def))
    expect(screen.getByLabelText('daily 10m conditions').textContent).toContain(def.conditions[0])
    fireEvent.click(screen.getByRole('button', { name: 'open daily 1h' }))
    expect(screen.getByLabelText('daily run conditions')).toBeTruthy()
  })

  it('describes the head start in words', () => {
    expect(describeDailyChallenge({ conditions: ['Costs ×5'], headStart: { scaleUps: 1, overclock: 5 } })).toBe('Costs ×5 · starts with 1 Scale Up · starts at Overclock 5')
    expect(describeDailyChallenge({ conditions: [], headStart: { scaleUps: 0, overclock: 0 } })).toBe('')
  })

  it('shows a running card with Open / Restart / Forfeit and confirm-guards Forfeit', () => {
    const state = startDailyRun('10m', Date.now())(base())
    const game = makeGame(state)
    wrap(<ChallengesPage game={game} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open daily challenges' }))
    fireEvent.click(screen.getByRole('button', { name: 'forfeit daily 10m' }))
    expect(game.actions.dailyForfeit).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Forfeit' }))
    expect(game.actions.dailyForfeit).toHaveBeenCalledWith('10m')
    fireEvent.click(screen.getByRole('button', { name: 'open daily 10m' }))
    expect(screen.getByLabelText('daily run 10m')).toBeTruthy()
    // The run is played on the Factory page itself, with its actions routed to the run.
    fireEvent.click(screen.getAllByRole('button', { name: /^Buy.* for .*completed levels/ })[0])
    expect(game.actions.dailyPlay).toHaveBeenCalledWith('10m', 'buyTier', 'tier01')
  })
})
