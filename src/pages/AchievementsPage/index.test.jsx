import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ThemeProvider } from 'styled-components'
import AppMenu from 'components/AppMenu'
import { createInitialGameState } from 'game/engine'
import { ACHIEVEMENTS_FEATURE, ACHIEVEMENT_DEFINITIONS } from 'game/layers'
import { buildTheme } from 'theme/tokens'
import AchievementsPage from '.'

const renderWithTheme = ui => render(<ThemeProvider theme={buildTheme('dark')}>{ui}</ThemeProvider>)
const gameWith = earned => ({ state: { ...createInitialGameState(), achievements: { earned, counters: { pings: 0 } } } })

beforeEach(() => { ACHIEVEMENTS_FEATURE.enabled = true })
afterEach(() => { ACHIEVEMENTS_FEATURE.enabled = false })

describe('AchievementsPage', () => {
  it('lists groups with earned counts and marks earned vs unearned', () => {
    renderWithTheme(<AchievementsPage game={gameWith({ helloWorld: true })} />)
    expect(screen.getByLabelText('First session 1 of 4 earned')).toBeTruthy()
    expect(screen.getByLabelText('Hello, World achievement earned')).toBeTruthy()
    expect(screen.getByLabelText('Ping of Death achievement not yet earned')).toBeTruthy()
    expect(screen.getByText('Ping 256 times')).toBeTruthy()
  })

  it('masks secret achievements until earned and hides platform-dependent ones', () => {
    const original = [...ACHIEVEMENT_DEFINITIONS]
    ACHIEVEMENT_DEFINITIONS.push(
      { id: 'testSecret', name: 'Hidden Name', group: 'firstSession', trigger: 'Hidden trigger', secret: true, platformDependent: false, bonus: null, condition: { kind: 'none' } },
      { id: 'testPlatform', name: 'Platform Name', group: 'firstSession', trigger: 'Platform trigger', secret: false, platformDependent: true, bonus: null, condition: { kind: 'none' } },
    )
    try {
      const { unmount } = renderWithTheme(<AchievementsPage game={gameWith({})} />)
      expect(screen.getByLabelText('??? achievement not yet earned')).toBeTruthy()
      expect(screen.queryByText('Hidden trigger')).toBeNull()
      expect(screen.queryByText('Platform Name')).toBeNull()
      unmount()
      renderWithTheme(<AchievementsPage game={gameWith({ testSecret: true })} />)
      expect(screen.getByLabelText('Hidden Name achievement earned')).toBeTruthy()
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
})
