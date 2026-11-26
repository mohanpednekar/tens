import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from 'styled-components'
import AppMenu from 'components/AppMenu'
import { createInitialGameState } from 'game/engine'
import { buildTheme } from 'theme/tokens'
import StatsPage from '.'

const renderWithTheme = ui => render(<ThemeProvider theme={buildTheme('dark')}>{ui}</ThemeProvider>)

describe('StatsPage', () => {
  it('renders the overview tiles and open sections', () => {
    const base = createInitialGameState()
    renderWithTheme(<StatsPage game={{ state: { ...base, activePlaySeconds: 3725 } }} />)
    expect(screen.getByLabelText('Play time 1h 2m')).toBeTruthy()
    expect(screen.getByLabelText('Foundry stats')).toBeTruthy()
    expect(screen.getByLabelText('Active play 1h 2m')).toBeTruthy()
    expect(screen.queryByLabelText('Factory stats')).toBeNull()
  })

  it('collapses a section from its name only', () => {
    renderWithTheme(<StatsPage game={{ state: createInitialGameState() }} />)
    const toggle = screen.getByLabelText('Time stats toggle')
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByLabelText('Active play 0s')).toBeNull()
  })

  it('is reachable from the More menu', () => {
    const calls = []
    renderWithTheme(<AppMenu onClose={() => {}} onNavigate={id => calls.push(id)} open />)
    fireEvent.click(screen.getByRole('button', { name: /open stats/i }))
    expect(calls).toEqual(['stats'])
  })
})
