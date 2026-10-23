import { render, screen } from '@testing-library/react'
import DiskArrayRow from 'components/DiskArrayRow'
import { BITS_PER_BYTE, DISK_CACHE_BLOCK_COUNT, TIER_DEFINITIONS } from 'game/layers'
import { createInitialGameState, getTierCost } from 'game/engine'
import { ThemeProvider } from 'theme'

const FIRST_DISK_SIZE = getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE
const blockBits = FIRST_DISK_SIZE / DISK_CACHE_BLOCK_COUNT

const renderRow = ({ cached = 0, buffer = 0 } = {}) => {
  const initial = createInitialGameState()
  const state = {
    ...initial,
    intro: {
      ...initial.intro,
      capacity: 80_000,
      diskCache: { [FIRST_DISK_SIZE]: cached },
      poolBuffers: { ...initial.intro.poolBuffers, 1: buffer },
    },
  }
  render(<ThemeProvider mode="dark"><DiskArrayRow size={FIRST_DISK_SIZE} state={state} /></ThemeProvider>)
}

describe('DiskArrayRow read cache', () => {
  it('shows the pool buffer\'s progress in the first empty cache block as a gradual fill', () => {
    renderRow({ cached: blockBits * 2, buffer: blockBits / 4 })
    expect(screen.getByLabelText(/cache block 3$/i)).toHaveAttribute('title', 'Filling from Memory (25%)')
    expect(screen.getByLabelText(/cache block 4$/i)).toHaveAttribute('title', 'Filling from Memory')
  })

  it('shows no in-progress block once the cache is full', () => {
    renderRow({ cached: FIRST_DISK_SIZE, buffer: blockBits / 2 })
    expect(screen.getByLabelText(/cache block 8$/i)).not.toHaveAttribute('title', expect.stringContaining('%'))
  })
})
