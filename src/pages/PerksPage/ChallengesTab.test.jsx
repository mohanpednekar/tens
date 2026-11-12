import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theme'
import { describe, expect, it, vi } from 'vitest'
import ChallengeBanner from 'components/ChallengeBanner'
import { createInitialGameState, enterChallenge } from 'game/engine'
import { CHALLENGE_DEFINITIONS, TIER_DEFINITIONS } from 'game/layers'
import PerksPage from './index'

const owned = () => ({
  ...createInitialGameState(),
  autoGlobalTickspeed: true,
  autoScaleUp: true,
  autoXpTickspeed: true,
  autoOverclock: true,
  autoPurge: 1,
  purge: { ...createInitialGameState().purge, points: 1e9, count: 5 },
  autobuyers: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, 1])),
  tierTickspeedAutobuyer: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, true])),
})
const wrap = ui => render(<ThemeProvider mode="dark">{ui}</ThemeProvider>)
const makeGame = state => ({ state, actions: new Proxy({}, { get: (target, key) => target[key] ?? (target[key] = vi.fn()) }) })

describe('Firmware Challenges tab', () => {
  it.each(CHALLENGE_DEFINITIONS.map(def => [def.id, def]))('%s lists code, target and codename once unlocked', (id, def) => {
    wrap(<PerksPage game={makeGame(owned())} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open challenges' }))
    const row = screen.getByLabelText(`challenge ${id}`)
    expect(row.textContent).toContain(`${id} · ${def.target} · ${def.codename}`)
    expect(row.textContent).toContain(def.rule)
  })

  it('hides codename and rule while locked and shows the unlock condition', () => {
    wrap(<PerksPage game={makeGame(createInitialGameState())} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open challenges' }))
    const row = screen.getByLabelText('challenge F21')
    expect(row.textContent).toContain('Unlocks when you buy Auto Clock Speed')
    expect(row.textContent).not.toContain('Base Clock')
  })

  it('starts a challenge only after confirming', () => {
    const game = makeGame(owned())
    wrap(<PerksPage game={game} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open challenges' }))
    fireEvent.click(screen.getByRole('button', { name: /^Start challenge F21/ }))
    expect(game.actions.enterChallenge).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Start challenge' }))
    expect(game.actions.enterChallenge).toHaveBeenCalledWith('F21')
  })

  it('disables other start controls while a challenge is active', () => {
    wrap(<PerksPage game={makeGame(enterChallenge('F21')(owned()))} />)
    fireEvent.click(screen.getByRole('tab', { name: 'open challenges' }))
    expect(screen.getByRole('button', { name: /^Start challenge F22/ })).toBeDisabled()
  })
})

describe('Factory challenge banner', () => {
  it('shows nothing outside a challenge, and Exit is confirm-guarded inside one', () => {
    const { container } = wrap(<ChallengeBanner onExit={vi.fn()} state={owned()} />)
    expect(container.textContent).toBe('')
    const onExit = vi.fn()
    wrap(<ChallengeBanner onExit={onExit} state={enterChallenge('F25')(owned())} />)
    expect(screen.getByLabelText('active challenge banner').textContent).toContain('F25 · Scope Creep')
    fireEvent.click(screen.getByRole('button', { name: /^Exit challenge F25/ }))
    expect(onExit).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Exit challenge' }))
    expect(onExit).toHaveBeenCalledTimes(1)
  })
})
