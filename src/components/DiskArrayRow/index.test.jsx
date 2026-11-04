import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DiskArrayRow from 'components/DiskArrayRow'
import { createInitialGameState, expediteDiskFill, getTierCost } from 'game/engine'
import { BITS_PER_BYTE, TIER_DEFINITIONS } from 'game/layers'
import { ThemeProvider } from 'theme'

const FIRST_DISK_SIZE = getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE
const SECOND_DISK_SIZE = FIRST_DISK_SIZE * 10

const withDisks = intro => {
  const state = createInitialGameState()
  return { ...state, intro: { ...state.intro, ...intro } }
}

const renderRow = (state, size, actions = {}) => render(
  <ThemeProvider>
    <DiskArrayRow actions={actions} size={size} state={state} />
  </ThemeProvider>,
)

describe('DiskArrayRow expedite click', () => {
  it('clicking an empty disk of a write-cache size queues it via actions.expediteDiskFill', async () => {
    const expedite = vi.fn()
    const state = withDisks({ disksBuiltTotal: { [SECOND_DISK_SIZE]: 2 }, disks: { [SECOND_DISK_SIZE]: 1 } })
    renderRow(state, SECOND_DISK_SIZE, { expediteDiskFill: expedite })
    await userEvent.click(screen.getByRole('button', { name: /empty 10 kb disk/i }))
    expect(expedite).toHaveBeenCalledWith(SECOND_DISK_SIZE)
  })

  it('shows an expedited disk as queued and no longer clickable', () => {
    const base = withDisks({ disksBuiltTotal: { [SECOND_DISK_SIZE]: 1 }, disks: {} })
    renderRow(expediteDiskFill(SECOND_DISK_SIZE)(base), SECOND_DISK_SIZE, { expediteDiskFill: vi.fn() })
    expect(screen.getByLabelText(/empty 10 kb disk queued for filling/i)).toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('never makes the pool\'s smallest (read-cache) size clickable', () => {
    const state = withDisks({ disksBuiltTotal: { [FIRST_DISK_SIZE]: 2 }, disks: { [FIRST_DISK_SIZE]: 1 } })
    renderRow(state, FIRST_DISK_SIZE, { expediteDiskFill: vi.fn() })
    expect(screen.queryByRole('button')).toBeNull()
  })
})
