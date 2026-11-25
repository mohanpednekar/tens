import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from 'styled-components'
import { ACHIEVEMENT_STAR_PRODUCTION_BONUS } from 'game/layers'
import { buildTheme } from 'theme/tokens'
import InfoPage from '.'

describe('InfoPage achievements section', () => {
  it('explains stars, bonuses, secrets and resets with constant-derived numbers', () => {
    render(<ThemeProvider theme={buildTheme('dark')}><InfoPage /></ThemeProvider>)
    const section = screen.getByLabelText('achievements section')
    expect(section.textContent).toContain(`${ACHIEVEMENT_STAR_PRODUCTION_BONUS * 100}% production`)
    expect(section.textContent).toContain('Some achievements and completed groups give bonuses')
    expect(section.textContent).toContain('???')
    expect(section.textContent).toContain('full Reset')
  })
})
