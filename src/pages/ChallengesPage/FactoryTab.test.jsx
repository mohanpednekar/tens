import { fireEvent, render, screen, within } from '@testing-library/react'
import { ThemeProvider } from 'theme'
import { describe, expect, it, vi } from 'vitest'
import ChallengeBanner from 'components/ChallengeBanner'
import { createInitialGameState, enterChallenge } from 'game/engine'
import { CHALLENGE_DEFINITIONS, TIER_DEFINITIONS } from 'game/layers'
import ChallengesPage from './index'
import PerksPage from 'pages/PerksPage'

const owned = () => ({
  ...createInitialGameState(),
  autoGlobalTickspeed: true,
  autoScaleUp: true,
  autoXpTickspeed: true,
  autoOverclock: true,
  autoPurge: 1,
  purge: { ...createInitialGameState().purge, points: 1e9, count: 1000 },
  autobuyers: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, 1])),
  tierTickspeedAutobuyer: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, true])),
})
const wrap = ui => render(<ThemeProvider mode="dark">{ui}</ThemeProvider>)
const makeGame = state => ({ state, actions: new Proxy({}, { get: (target, key) => target[key] ?? (target[key] = vi.fn()) }) })

describe('Firmware Challenges tab', () => {
  it.each(CHALLENGE_DEFINITIONS.map(def => [def.id, def]))('%s lists code, target and codename once unlocked', (id, def) => {
    wrap(<ChallengesPage game={makeGame(owned())} />)
    fireEvent.click(screen.getByRole('button', { name: `${id} ${def.codename}, ready` }))
    const row = screen.getByLabelText(`challenge ${id}`)
    expect(row.textContent).toContain(`${id} · ${def.target} · ${def.codename}`)
    expect(row.textContent).toContain(def.rule)
  })

  it('hides codename and rule while locked and shows the unlock condition', () => {
    wrap(<ChallengesPage game={makeGame(createInitialGameState())} />)
    const tile = screen.getByRole('button', { name: 'F21, locked' })
    expect(tile.textContent).toBe('F21🔒 P40')
    fireEvent.click(tile)
    const row = screen.getByLabelText('challenge F21')
    expect(row.textContent).toContain('Unlocks at Purge 40')
    expect(row.textContent).not.toContain('Base Clock')
  })

  it('starts a challenge only after confirming', () => {
    const game = makeGame(owned())
    wrap(<ChallengesPage game={game} />)
    fireEvent.click(screen.getByRole('button', { name: 'F21 Base Clock, ready' }))
    fireEvent.click(screen.getByRole('button', { name: /^Start challenge F21/ }))
    expect(game.actions.enterChallenge).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Start challenge' }))
    expect(game.actions.enterChallenge).toHaveBeenCalledWith('F21')
  })

  it('disables other start controls while a challenge is active', () => {
    wrap(<ChallengesPage game={makeGame(enterChallenge('F21')(owned()))} />)
    expect(screen.getByRole('button', { name: 'F21 Base Clock, active' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'F22 Scale Out, ready' }))
    expect(screen.getByRole('button', { name: /^Start challenge F22/ })).toBeDisabled()
  })
})

describe('Factory challenge banner', () => {
  it('hides Exit until the banner title is tapped, then it is confirm-guarded', () => {
    const { container } = wrap(<ChallengeBanner onExit={vi.fn()} state={owned()} />)
    expect(container.textContent).toBe('')
    const onExit = vi.fn()
    wrap(<ChallengeBanner onExit={onExit} state={enterChallenge('F25')(owned())} />)
    expect(screen.getByLabelText('active challenge banner').textContent).toContain('F25 · Scope Creep')
    expect(screen.queryByRole('button', { name: /^Exit challenge F25/ })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /^F25 Scope Creep, show exit/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Exit challenge F25/ }))
    expect(onExit).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Exit challenge' }))
    expect(onExit).toHaveBeenCalledTimes(1)
  })
})

describe('Challenges → Factory tab Exit', () => {
  it('opens the active challenge in the detail panel with a confirm-guarded Exit', () => {
    const game = makeGame(enterChallenge('F25')(owned()))
    wrap(<ChallengesPage game={game} />)
    expect(screen.queryByLabelText('challenge F24')).toBeNull()
    fireEvent.click(within(screen.getByLabelText('challenge F25')).getByRole('button', { name: /^Exit challenge F25/ }))
    expect(game.actions.exitChallenge).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Exit challenge' }))
    expect(game.actions.exitChallenge).toHaveBeenCalledTimes(1)
  })
})

describe('Firmware challenge gate', () => {
  it('shows a disabled lock (no codename) while the automation is owned but the challenge is not unlocked', () => {
    const state = { ...owned(), purge: { ...owned().purge, count: 39 } }
    wrap(<PerksPage game={makeGame(state)} />)
    const lock = screen.getByRole('button', { name: 'Challenge F21 unlocks at purge 40' })
    expect(lock).toBeDisabled()
    expect(screen.queryByRole('button', { name: /^Start challenge F21/ })).toBeNull()
    expect(document.body.textContent).not.toContain('Base Clock')
  })
})
