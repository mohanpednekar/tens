import { fireEvent, render, screen, within } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { createInitialGameState } from 'game/engine'
import { buildTheme } from 'theme/tokens'
import InfoPage, { MANUAL_SECTION_REVEALS } from '.'

const renderManual = state => render(<ThemeProvider theme={buildTheme('dark')}><InfoPage game={{ state }} /></ThemeProvider>)
const topic = name => screen.getByRole('button', { name: new RegExp(`^${name} topic$`, 'i') })

// A save that has reached every layer, so every Manual topic is revealed.
const lateGame = () => {
  const initial = createInitialGameState()
  return {
    ...initial,
    intro: { ...initial.intro, mainGameUnlocked: true, computeMergePageUnlocked: true },
    purchased: { tier01: 1, tier10: 1 },
    purge: { ...initial.purge, count: 3, points: 0 },
    computeFlops: { ...initial.computeFlops, pageUnlocked: true },
    era: { count: 1 },
  }
}

describe('InfoPage (Manual) progressive reveal', () => {
  test('a fresh save lists only the start-of-game topics, collapsed, with a locked-topics count', () => {
    renderManual(createInitialGameState())
    for (const name of ['Overview', 'Byte Foundry', 'Milestones', 'Sleep mode']) {
      expect(topic(name)).toHaveAttribute('aria-expanded', 'false')
    }
    for (const label of ['storage section', 'power section', 'compute flops section', 'prestige section', 'reboot section']) {
      expect(screen.queryByLabelText(label)).not.toBeInTheDocument()
    }
    const lockedCount = Object.values(MANUAL_SECTION_REVEALS).filter(Boolean).length
    expect(screen.getByLabelText('locked manual topics')).toHaveTextContent(`🔒 ${lockedCount} more topics unlock as you play`)
    // Collapsed: no body text until the heading is clicked.
    expect(screen.getByLabelText('byte foundry section')).not.toHaveTextContent(/forced priority/i)
  })

  test('every topic is revealed once its layer is reached, and only the heading toggles it', () => {
    renderManual(lateGame())
    expect(screen.queryByLabelText('locked manual topics')).not.toBeInTheDocument()
    for (const label of Object.keys(MANUAL_SECTION_REVEALS)) {
      expect(screen.getByLabelText(label)).toBeInTheDocument()
    }
    fireEvent.click(topic('Prestige ladder'))
    expect(screen.getByLabelText('prestige ladder section')).toHaveTextContent(/Purge/)
    expect(screen.getByLabelText('prestige ladder section')).not.toHaveTextContent(/the Production speed bonus/i)
    fireEvent.click(topic('Compute'))
    expect(screen.getByLabelText('compute flops section')).toHaveTextContent(/kflops/i)
    fireEvent.click(topic('Compute'))
    expect(screen.getByLabelText('compute flops section')).not.toHaveTextContent(/kflops/i)
  })

  test('long topics split into collapsed sub-topics', () => {
    renderManual(lateGame())
    fireEvent.click(topic('Storage'))
    const storage = screen.getByLabelText('storage section')
    const sub = within(storage).getByRole('button', { name: /^provisioning disks subtopic$/i })
    expect(sub).toHaveAttribute('aria-expanded', 'false')
    expect(storage).not.toHaveTextContent(/clean-slate disk/i)
    fireEvent.click(sub)
    fireEvent.click(within(storage).getByRole('button', { name: /^cache and automatic pulling subtopic$/i }))
    fireEvent.click(within(storage).getByRole('button', { name: /^data lakes subtopic$/i }))
    fireEvent.click(within(storage).getByRole('button', { name: /^flushing subtopic$/i }))
    expect(storage).toHaveTextContent(/clean-slate disk/i)
    fireEvent.click(topic('Power'))
    fireEvent.click(within(screen.getByLabelText('power section')).getByRole('button', { name: /^compute boost subtopic$/i }))
    expect(screen.getByLabelText('power section')).toHaveTextContent(/queue/i)
  })
})
