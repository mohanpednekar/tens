import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ThemeProvider } from 'styled-components'
import AppMenu from 'components/AppMenu'
import { createInitialGameState } from 'game/engine'
import { ACHIEVEMENTS_FEATURE, ACHIEVEMENT_DEFINITIONS } from 'game/layers'
import { buildTheme } from 'theme/tokens'
import AchievementsPage from '.'

const renderWithTheme = ui => render(<ThemeProvider theme={buildTheme('dark')}>{ui}</ThemeProvider>)
const openGroup = name => fireEvent.click(screen.getByLabelText(`${name} group toggle`))
const gameWith = earned => ({ state: { ...createInitialGameState(), achievements: { earned, counters: { pings: 0 } } } })

beforeEach(() => { ACHIEVEMENTS_FEATURE.enabled = true })
afterEach(() => { ACHIEVEMENTS_FEATURE.enabled = false })

describe('AchievementsPage', () => {
  it('lists groups with earned counts and marks earned vs unearned', () => {
    renderWithTheme(<AchievementsPage game={gameWith({ helloWorld: true })} />)
    expect(screen.getByLabelText('First session 1 of 4 earned')).toBeTruthy()
    expect(screen.queryByLabelText('Hello, World achievement earned')).toBeNull()
    openGroup('First session')
    expect(screen.getByLabelText('Ping achievement level 1 of 2')).toBeTruthy()
    fireEvent.click(screen.getByLabelText('Ping details'))
    expect(screen.getByLabelText('Ping level 1 earned')).toBeTruthy()
    expect(screen.getByLabelText('Ping level 2 not yet earned')).toBeTruthy()
  })

  it('shows total stars with a bonus for fully completed groups', () => {
    const first = ACHIEVEMENT_DEFINITIONS.filter(def => def.group === 'firstSession')
    const earned = Object.fromEntries(first.map(def => [def.id, true]))
    renderWithTheme(<AchievementsPage game={gameWith({ ...earned, levelPower1: true })} />)
    // 4 first-session stars + 1 completion bonus (10%, rounded up) + 1 level power star
    expect(screen.getByLabelText(/^total stars 6 of /)).toBeTruthy()
    expect(screen.getByText(/⭐ 5\/5/)).toBeTruthy()
  })

  it('collapses the tier purchases into one leveled row', () => {
    renderWithTheme(<AchievementsPage game={gameWith({ tier01Bought: true, tier02Bought: true, tier03Bought: true })} />)
    openGroup('Tier ladder')
    expect(screen.getByLabelText('First purchase achievement level 3 of 10')).toBeTruthy()
    expect(screen.getByLabelText('Spent QB achievement not yet earned')).toBeTruthy()
  })

  it('collapses ordered steps into one leveled row', () => {
    renderWithTheme(<AchievementsPage game={gameWith({ levelPower1: true, levelPower2: true, overclockStep1: true })} />)
    openGroup('Level power')
    expect(screen.getAllByLabelText(/achievement level/)).toHaveLength(1)
    expect(screen.getByLabelText('Level power achievement level 2 of 10')).toBeTruthy()
    openGroup('Overclock step')
    expect(screen.getByLabelText('Overclock step achievement level 1 of 3')).toBeTruthy()
  })

  it('masks secret achievements until earned and hides platform-dependent ones', () => {
    const original = [...ACHIEVEMENT_DEFINITIONS]
    ACHIEVEMENT_DEFINITIONS.push(
      { id: 'testSecret', name: 'Hidden Name', group: 'firstSession', trigger: 'Hidden trigger', secret: true, platformDependent: false, bonus: null, condition: { kind: 'none' } },
      { id: 'testPlatform', name: 'Platform Name', group: 'firstSession', trigger: 'Platform trigger', secret: false, platformDependent: true, bonus: null, condition: { kind: 'none' } },
    )
    try {
      const { unmount } = renderWithTheme(<AchievementsPage game={gameWith({})} />)
      openGroup('First session')
      expect(screen.getByLabelText('??? achievement not yet earned')).toBeTruthy()
      expect(screen.queryByText('Hidden trigger')).toBeNull()
      expect(screen.queryByText('Platform Name')).toBeNull()
      expect(screen.queryByLabelText('Platform Name details')).toBeNull()
      unmount()
      renderWithTheme(<AchievementsPage game={gameWith({ testSecret: true })} />)
      openGroup('First session')
      expect(screen.getByLabelText('Hidden Name achievement earned')).toBeTruthy()
      fireEvent.click(screen.getByLabelText('Hidden Name details'))
      expect(screen.getByText('Hidden trigger')).toBeTruthy()
    } finally {
      ACHIEVEMENT_DEFINITIONS.length = 0
      ACHIEVEMENT_DEFINITIONS.push(...original)
    }
  })
})

describe('AppMenu achievements entry', () => {
  it('is shown only while the feature is on', () => {
    const { unmount } = renderWithTheme(<AppMenu onClose={() => {}} onNavigate={() => {}} open />)
    expect(screen.getByLabelText('open achievements')).toBeTruthy()
    unmount()
    ACHIEVEMENTS_FEATURE.enabled = false
    renderWithTheme(<AppMenu onClose={() => {}} onNavigate={() => {}} open />)
    expect(screen.queryByLabelText('open achievements')).toBeNull()
  })

  it('shows requirement progress, and only real rewards, before and after earning', () => {
    const state = { ...createInitialGameState(), achievements: { earned: { helloWorld: true }, counters: { pings: 100 } } }
    renderWithTheme(<AchievementsPage game={{ state }} />)
    openGroup('First session')
    expect(screen.getByText(/Next: Ping 256 times \(100\/256\)/)).toBeTruthy()
    fireEvent.click(screen.getByLabelText('Ping details'))
    // No bonus => no reward line (stars are score, not a reward)
    expect(screen.queryByLabelText(/Ping level \d reward/)).toBeNull()
    expect(screen.queryByText(/⭐ 1 star/)).toBeNull()
    // Binary achievement: no lock/status badge until earned
    expect(screen.getByLabelText('Kibi, not Kilo achievement not yet earned').textContent).toContain('0%')
    expect(screen.getByLabelText('It compiles, ship it achievement not yet earned').textContent).not.toMatch(/🔒|✅/)
  })

  it('shows the real bonus reward before and after earning', () => {
    const { unmount } = renderWithTheme(<AchievementsPage game={gameWith({})} />)
    openGroup('Foundry')
    fireEvent.click(screen.getByLabelText('KB Reclamation details'))
    expect(screen.getByLabelText('KB Reclamation level 1 reward pending').textContent).toMatch(/^Reward: The first disk-size exponent step/)
    unmount()
    renderWithTheme(<AchievementsPage game={gameWith({ pool01ResetI: true })} />)
    openGroup('Foundry')
    fireEvent.click(screen.getByLabelText('KB Reclamation details'))
    expect(screen.getByLabelText('KB Reclamation level 1 reward earned').textContent).toMatch(/^Reward earned: The first disk-size exponent step/)
  })

  it('states a bonus shared by every level once', () => {
    renderWithTheme(<AchievementsPage game={gameWith({})} />)
    openGroup('Level power')
    fireEvent.click(screen.getByLabelText('Level power details'))
    expect(screen.getByText(/Reward each level: The per-level production multiplier/)).toBeTruthy()
    expect(screen.queryByLabelText(/Level power level 1 reward/)).toBeNull()
  })
})
