import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { createInitialGameState } from 'game/engine'
import { COMPUTE_FLOPS_TIER_DEFINITIONS } from 'game/layers'
import { buildTheme } from 'theme/tokens'
import ComputeFlopsPage from 'pages/ComputeFlopsPage'
import MilestonesPage from 'pages/MilestonesPage'

const renderPage = (Page, state) => render(<ThemeProvider theme={buildTheme('dark')}><Page game={{ state, actions: {} }} /></ThemeProvider>)

describe('progressive reveal', () => {
  test('Milestones shows reached milestones plus the next one; the Reboot line waits for the late game', () => {
    const initial = createInitialGameState()
    renderPage(MilestonesPage, { ...initial, intro: { ...initial.intro, mainGameUnlocked: true } })
    expect(screen.getByLabelText('The first Kilobyte milestone reached')).toBeInTheDocument()
    expect(screen.getByLabelText('Go Googol milestone not yet reached')).toBeInTheDocument()
    expect(screen.queryByLabelText(/^First Reboot milestone/)).not.toBeInTheDocument()
    expect(screen.queryByText(/more/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText('reboot status')).not.toBeInTheDocument()
  })

  test('a Reboot keeps First Reboot listed even though Purges reset', () => {
    const initial = createInitialGameState()
    renderPage(MilestonesPage, { ...initial, intro: { ...initial.intro, mainGameUnlocked: true }, computeFlops: { ...initial.computeFlops, pageUnlocked: true }, era: { count: 1 } })
    expect(screen.getByLabelText('First Reboot milestone reached')).toBeInTheDocument()
    expect(screen.getByLabelText('reboot status')).toBeInTheDocument()
  })

  test('Compute (Flops) lists owned or affordable tiers plus one more', () => {
    const initial = createInitialGameState()
    const first = COMPUTE_FLOPS_TIER_DEFINITIONS[0]
    renderPage(ComputeFlopsPage, { ...initial, purge: { ...initial.purge, points: 0 }, computeFlops: { ...initial.computeFlops, pageUnlocked: true, owned: { [first.id]: 1 } } })
    expect(screen.getByLabelText(`${first.name} · ${first.outputLabel} compute tier`)).toBeInTheDocument()
    const second = COMPUTE_FLOPS_TIER_DEFINITIONS[1]
    expect(screen.getByLabelText(`${second.name} · ${second.outputLabel} compute tier`)).toBeInTheDocument()
    const third = COMPUTE_FLOPS_TIER_DEFINITIONS[2]
    expect(screen.queryByLabelText(`${third.name} · ${third.outputLabel} compute tier`)).not.toBeInTheDocument()
    expect(screen.queryByText(/🔒 \d+ more/)).not.toBeInTheDocument()
  })
})
