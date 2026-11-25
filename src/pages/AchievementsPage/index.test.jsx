import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ThemeProvider } from 'styled-components'
import AppMenu from 'components/AppMenu'
import { createInitialGameState } from 'game/engine'
import { ACHIEVEMENTS_FEATURE, ACHIEVEMENT_DEFINITIONS, ACHIEVEMENT_STAR_PRODUCTION_BONUS } from 'game/layers'
import InfoPage from 'pages/InfoPage'
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
    // Section shows only its completion bonus once complete (no per-section star counts)
    expect(screen.getByText(/4\/4 · ⭐ \+1/)).toBeTruthy()
    expect(screen.queryByText(/⭐ \d+\/\d+/, { selector: 'span' })).toBeNull()
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
    expect(screen.getByText(/Next: Ping ×256 \(100\/256\)/)).toBeTruthy()
    fireEvent.click(screen.getByLabelText('Ping details'))
    // No bonus => no reward line (stars are score, not a reward)
    expect(screen.queryByLabelText(/Ping level \d reward/)).toBeNull()
    expect(screen.queryByText(/⭐ 1 star/)).toBeNull()
    // Binary achievement: lock until earned
    expect(screen.getByLabelText('Kibi, not Kilo achievement not yet earned').textContent).toContain('0/10')
    expect(screen.getByLabelText('It compiles, ship it achievement not yet earned').textContent).toContain('🔒')
  })

  it('shows the real bonus reward before and after earning (full text for short series)', () => {
    const { unmount } = renderWithTheme(<AchievementsPage game={gameWith({})} />)
    openGroup('Overclock step')
    fireEvent.click(screen.getByLabelText('Overclock step details'))
    expect(screen.getByLabelText('Overclock step level 1 reward pending').textContent).toMatch(/^Reward: Each later Overclock needs 1 fewer/)
    unmount()
    renderWithTheme(<AchievementsPage game={gameWith({ overclockStep1: true })} />)
    openGroup('Overclock step')
    fireEvent.click(screen.getByLabelText('Overclock step details'))
    expect(screen.getByLabelText('Overclock step level 1 reward earned').textContent).toMatch(/^Reward earned: Each later Overclock needs 1 fewer/)
  })

  it('long series list one short line per level', () => {
    renderWithTheme(<AchievementsPage game={gameWith({ tier01Bought: true })} />)
    openGroup('Tier ladder')
    fireEvent.click(screen.getByLabelText('First purchase details'))
    expect(screen.getByLabelText('First purchase level 1 earned').textContent).toMatch(/^✅ 1\. Buy /)
    expect(screen.getByLabelText('First purchase level 2 not yet earned').textContent).toMatch(/^🔒 2\. Buy /)
  })

  it('Reclamation is a five-level series by pools compacted, each level listing its own short reward', () => {
    renderWithTheme(<AchievementsPage game={gameWith({ reclaim1: true })} />)
    openGroup('Foundry')
    fireEvent.click(screen.getByLabelText('Reclamation details'))
    expect(screen.getByLabelText('Reclamation level 1 earned').textContent).toBe('✅ 1. Flush a pool · Disk step 2%')
    expect(screen.getByLabelText('Reclamation level 2 not yet earned').textContent).toBe('🔒 2. Flush 3 pools (0/3) · Disk step 3%')
    expect(screen.getByLabelText('Reclamation level 5 not yet earned').textContent).toBe('🔒 5. Flush every pool (0/10) · One Upgrade does both')
    expect(screen.getByLabelText('Reclamation achievement level 1 of 5')).toBeTruthy()
    expect(screen.getByText(/^Disk step 2%: Disk-size steps without a Flush Pool upgrade close 2% of the gap/)).toBeTruthy()
    expect(screen.getByText("Lake speed +5%: Every Data Lake fills at +5% more of its pool's Bandwidth")).toBeTruthy()
    expect(screen.getByText(/^One Upgrade does both: Bitrate always matches Capacity/)).toBeTruthy()
  })

  it('collapsed series show the next requirement and reward until every level is done', () => {
    const { unmount } = renderWithTheme(<AchievementsPage game={gameWith({ reclaim1: true })} />)
    openGroup('Foundry')
    expect(screen.getByText('Next: Flush 3 pools (0/3)')).toBeTruthy()
    expect(screen.getByLabelText('Reclamation next reward').textContent).toBe('Reward: Disk step 3%')
    unmount()
    const all = Object.fromEntries(ACHIEVEMENT_DEFINITIONS.filter(def => def.group === 'foundry').map(def => [def.id, true]))
    renderWithTheme(<AchievementsPage game={gameWith(all)} />)
    openGroup('Foundry')
    expect(screen.getByLabelText('Reclamation achievement level 5 of 5')).toBeTruthy()
    expect(screen.queryByText(/^Next:/)).toBeNull()
    expect(screen.queryByLabelText('Reclamation next reward')).toBeNull()
  })

  it('states a bonus shared by every level once', () => {
    renderWithTheme(<AchievementsPage game={gameWith({})} />)
    openGroup('Level power')
    fireEvent.click(screen.getByLabelText('Level power details'))
    expect(screen.getByText(/Reward each level: The per-level production multiplier/)).toBeTruthy()
    expect(screen.queryByLabelText(/Level power level 1 reward/)).toBeNull()
  })

  it('clamps progress to the target while the achievement is still unearned', () => {
    const state = { ...createInitialGameState(), achievements: { earned: { helloWorld: true }, counters: { pings: 300 } } }
    renderWithTheme(<AchievementsPage game={{ state }} />)
    openGroup('First session')
    expect(screen.getByText(/Next: Ping ×256 \(256\/256\)/)).toBeTruthy()
  })

  it('shows a lock on series with no level reached and on unearned levels', () => {
    renderWithTheme(<AchievementsPage game={gameWith({})} />)
    openGroup('Level power')
    expect(screen.getByLabelText('Level power achievement level 0 of 10').textContent).toContain('🔒')
    expect(screen.getByText(/Next: KB level 5/)).toBeTruthy()
    expect(screen.getByLabelText('Level power next reward').textContent).toBe('Reward: +0.05 per-level multiplier')
  })

  it('shows no (0/1) on level-1 one-shot steps', () => {
    renderWithTheme(<AchievementsPage game={gameWith({})} />)
    openGroup('Foundry')
    expect(screen.getByText('Next: Flush a pool')).toBeTruthy()
    openGroup('Early Factory')
    expect(screen.getByText('Next: Accelerate 1')).toBeTruthy()
  })

  it('a compact series with no rewards shows no reward explanations', () => {
    renderWithTheme(<AchievementsPage game={gameWith({})} />)
    openGroup('Tier ladder')
    fireEvent.click(screen.getByLabelText('First purchase details'))
    expect(screen.queryByText(/↑:/)).toBeNull()
  })
})

describe('Manual achievements section', () => {
  it('explains stars, bonuses, secrets and resets with constant-derived numbers', () => {
    renderWithTheme(<InfoPage />)
    const section = screen.getByLabelText('achievements section')
    expect(section.textContent).toContain(`${ACHIEVEMENT_STAR_PRODUCTION_BONUS * 100}% production`)
    expect(section.textContent).toContain('Some achievements and completed groups give bonuses')
    expect(section.textContent).toContain('???')
    expect(section.textContent).toContain('full Reset')
  })
})
