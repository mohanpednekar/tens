import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, vi } from 'vitest'
import { version } from '../package.json'
import { ThemeProvider } from 'theme'
import { themes } from 'theme/tokens'
import { applyAutobuyerMilestones, createInitialGameState, getAutobuyerIntervalMaxLevel, getAutobuyerSpeedUpgradeMaxLevel, getAutomationIntervalMaxLevel, getTierTickspeedIntervalMaxLevel, formatBitsInNearestUnit, formatDiskSize, formatDiskSizeInPoolUnit, formatDiskSizeStable, formatOfflineDuration, expediteDiskFill, getIntroProductionRate, getPoolBufferBits, getPoolBufferCapacity, getPoolAvailableFillRate, getStoragePoolBandwidth, getTierCost } from 'game/engine'
import {
  BITS_PER_BYTE,
  COMPUTE_BOOST_MAX_STACKS,
  COMPUTE_BOOST_PRESETS,
  COMPUTE_CORES_PER_NODE,
  COMPUTE_ENTITY_CAP,
  COMPUTE_ENTITY_AUTO_MERGE_CAP,
  COMPUTE_FLOPS_REVEAL_PP,
  COMPUTE_MERGE_RATIO,
  DATA_LAKE_CAPACITY_BY_LEVEL,
  DATA_LAKE_CAPACITY_MAX_LEVEL,
  DATA_LAKE_OVERFLOW_MAX_PERCENT,
  DATA_LAKE_OVERFLOW_MIN_PERCENT,
  DEFAULT_PURCHASE_BLOCK_SIZE,
  DISK_ARRAY_LADDER_CAP,
  DISK_CACHE_BLOCK_COUNT,
  DISK_BUILD_COST_MULTIPLIER,
  ERA_ELIGIBILITY_PP,
  FILL_MULTIPLIER_TAP_BONUS_PERCENT,
  FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT,
  INTRO_BITS_PER_KILOBYTE_CONVERSION,
  INTRO_BYTE_COMBINE_COST,
  INTRO_CAPACITY_CAP_BITS,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  INTRO_DISK_UNLOCK_CAPACITY,
  INTRO_STARTING_CAPACITY,
  INTRO_STARTING_TICK_SPEED_SECONDS,
  PURGE_THRESHOLD,
  TICK_RATE_MS,
  TIER_DEFINITIONS,
  DISK_LADDER_BASE_SIZE_BITS,
  DATA_STREAM_SPEED_EXPONENT_BASE as DATA_STREAM_SPEED_EXPONENT,
} from 'game/layers'
import { COST_ICON } from 'components/icons'
import { isDevModeActive } from 'game/storage'
import App from './App'
import DiskArrayRow from 'components/DiskArrayRow'
import ByteFoundryPage, { formatBitsTransition, getBufferSecondsToFull } from 'pages/ByteFoundryPage'

// Enough Data Stream Capacity for Storage pool 2 (MB) to be visible — Battery merges are timed off
// that pool's Bandwidth (getComputeMergeDurationSeconds), which is 0 until it's visible.
const POOL_2_VISIBLE_CAPACITY = 8 * 1024 ** 2 * 4

// A fresh cycle's full purchase block, in bits — exactly enough for tickIntroAutoInvest to convert
// every unit of tier01's (Kilobytes') current 8-unit block in one call. Used only as a convenient
// round number for seeding tests below; no longer a named threshold in the engine itself (an
// earlier version gated tickIntroAutoInvest on this exact value — see docs/DESIGN_HISTORY.md).
const FRESH_CYCLE_BLOCK_BITS = DEFAULT_PURCHASE_BLOCK_SIZE * INTRO_BITS_PER_KILOBYTE_CONVERSION

// Settings is a grouped list of collapsed entries (#1143); tests expand every entry so each
// section's controls are reachable exactly as before.
const expandSettingsSections = () => {
  for (const toggle of screen.queryAllByRole('button', { name: / settings$/i, expanded: false })) fireEvent.click(toggle)
}

beforeEach(() => {
  localStorage.clear()
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: query.includes('light') ? false : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
})

afterEach(() => {
  cleanup() // unmount before restoring real timers (see CLAUDE.md Testing)
  vi.useRealTimers()
  vi.restoreAllMocks()
})

// Every test exercising MainPage (the vast majority of this file) needs the Byte Foundry's
// main-game gate already unlocked, or <App /> lands on ByteFoundryPage instead (see App.jsx's page
// routing — `intro.mainGameUnlocked` is the only thing that decides which page a fresh/seeded save
// opens on). `mergeState` backfills the rest of the `intro` shape from
// `createInitialGameState()`'s own defaults regardless (see storage.js), so
// `{ mainGameUnlocked: true }` alone is always sufficient here — no need to spell out
// bits/capacity/etc. by hand. Pass `overrides.intro` to seed a specific (still-gated) intro state
// instead, e.g. for ByteFoundryPage's own tests below.
const derivePurchaseFieldsFromCounts = (owned = {}, purchased = {}, existing = {}) => {
  const nextPurchased = { ...(existing.purchased ?? {}), ...purchased }
  const purchaseLevels = { ...(existing.purchaseLevels ?? {}) }
  const purchaseLevelProgress = { ...(existing.purchaseLevelProgress ?? {}) }
  TIER_DEFINITIONS.forEach(tier => {
    const count = nextPurchased[tier.id] ?? owned[tier.id]
    if (count === undefined || purchaseLevels[tier.id] !== undefined) return
    nextPurchased[tier.id] = count
    const level = Math.floor(count / DEFAULT_PURCHASE_BLOCK_SIZE) + 1
    purchaseLevels[tier.id] = level
    purchaseLevelProgress[tier.id] = count - (level - 1) * DEFAULT_PURCHASE_BLOCK_SIZE
  })
  return { purchased: nextPurchased, purchaseLevels, purchaseLevelProgress }
}

const seedMainGameState = (overrides = {}) => {
  const { owned, purchased, ...rest } = overrides
  const purchaseDerived = (owned || purchased)
    ? derivePurchaseFieldsFromCounts(owned ?? {}, purchased ?? {}, overrides)
    : {}
  const state = applyAutobuyerMilestones({
    intro: { mainGameUnlocked: true },
    ...rest,
    ...(owned ? { owned } : {}),
    ...purchaseDerived,
  })
  localStorage.setItem('tens_game_state', JSON.stringify(state))
}

// Reset lives only under Settings → Danger zone (More → Settings), never on MainPage or in the
// More sheet itself. Tests that click Reset must open Settings first.
const openSettings = async user => {
  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open settings/i }))
  // Settings is a React.lazy chunk: its first import in a test file can exceed the 1 s default
  // under CI load (the cause of intermittent 'Unable to find role="heading"' failures).
  await screen.findByRole('heading', { level: 1, name: /^settings$/i }, { timeout: 10000 })
  expandSettingsSections()
}


// Firmware (AppNav → Firmware) has two icon tabs: Automation and Prestige.
const openPerksTab = async (user, tab) => {
  await user.click(screen.getByRole('button', { name: /^open firmware$/i }))
  await user.click(screen.getByRole('tab', { name: tab }))
}
const openPerksTabSync = tab => {
  fireEvent.click(screen.getByRole('button', { name: /^open firmware$/i }))
  fireEvent.click(screen.getByRole('tab', { name: tab }))
}
const openFactorySync = () => fireEvent.click(screen.getByRole('button', { name: /^open byte factory$/i }))

// A completely empty localStorage (cleared in beforeEach) loads createInitialGameState()'s own
// fresh defaults directly (no migration involved at all — computeInitialGame only calls
// mergeState when loadGameState() finds something saved) — intro.mainGameUnlocked is false
// there, so <App /> lands on ByteFoundryPage. Seeding tens_game_state with an explicit (still-
// gated) `intro` object below reproduces later Byte Foundry states without tapping/combining/
// investing by hand.
const seedIntroState = (introOverrides = {}, otherOverrides = {}) => {
  const intro = {
    bits: 0,
    capacity: INTRO_STARTING_CAPACITY,
    byteCreated: false,
    mainGameUnlocked: false,
    ...introOverrides,
  }
  if (
    intro.computeMergePageUnlocked === undefined &&
    ((intro.computeNodes ?? 0) > 0 ||
      (intro.computeCores ?? 0) >= COMPUTE_CORES_PER_NODE ||
      intro.computeClusters ||
      intro.computeNetworks ||
      intro.computeGrids)
  ) {
    intro.computeMergePageUnlocked = true
  }
  localStorage.setItem('tens_game_state', JSON.stringify({
    intro,
    ...otherOverrides,
  }))
}

describe('Data Stream and upgrade speed details popovers', () => {
  const seedStream = intro => {
    seedMainGameState({ intro: { mainGameUnlocked: true, bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true, ...intro } })
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
  }

  it('opens the Data Stream details from its speed, without tapping the stream, and shows the boosted delivered speed', () => {
    seedStream({ computeBoostType: 'standard', computeBoostTierIndex: 1, computeBoostStacks: 1, computeBoostRemainingSeconds: 600 })
    const speed = screen.getByRole('button', { name: /^data stream bitrate .*show bitrate details$/ })
    expect(speed).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(speed)
    const dialog = screen.getByRole('dialog', { name: 'Data Stream bitrate' })
    for (const label of ['Bitrate now', 'Base Bitrate', 'Compute Boost', 'Fill multiplier', 'Bitrate exponent', 'Buffer', 'Time to full']) {
      expect(within(dialog).getByText(label)).toBeInTheDocument()
    }
    expect(within(dialog).getByText('×5')).toBeInTheDocument()
    expect(screen.queryByLabelText('data stream fill-based bitrate multiplier ping bonus')).not.toBeInTheDocument()
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole('dialog', { name: 'Data Stream bitrate' })).not.toBeInTheDocument()
    // The stretched tile button still taps.
    fireEvent.click(screen.getByRole('button', { name: 'ping to generate a bit' }))
    expect(screen.getByLabelText('data stream fill-based bitrate multiplier ping bonus')).toBeInTheDocument()
  })

  it('does not reopen the upgrade details by itself after the upgrade it was open for finished', () => {
    const game = intro => {
      const base = createInitialGameState()
      return {
        state: { ...base, intro: { ...base.intro, mainGameUnlocked: true, bits: 100, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true, ...intro } },
        actions: new Proxy({}, { get: () => () => {} }),
        dismissOfflineProgress: () => {},
        claimOfflineAdReward: () => {},
        offlineProgress: null,
      }
    }
    const ui = g => <ThemeProvider><ByteFoundryPage game={g} /></ThemeProvider>
    const { rerender } = render(ui(game({ capacityUpgradeQueued: true, capacityUpgradeProgress: 0 })))
    fireEvent.click(screen.getByRole('button', { name: /^upgrade draw bitrate/ }))
    expect(screen.getByRole('dialog', { name: 'Upgrade Capacity draw' })).toBeInTheDocument()
    rerender(ui(game({ capacityUpgradeQueued: false })))
    rerender(ui(game({ speedUpgradeQueued: true, speedUpgradeProgress: 0 })))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('opens the running upgrade\'s draw details from its speed', () => {
    seedStream({ bits: 100, capacityUpgradeQueued: true, capacityUpgradeProgress: 0 })
    fireEvent.click(screen.getByRole('button', { name: /^upgrade draw bitrate .*show bitrate details$/ }))
    const dialog = screen.getByRole('dialog', { name: 'Upgrade Capacity draw' })
    for (const label of ['Draw now', 'Base Bitrate', 'Data Stream delivers', 'Progress', 'Time left', 'Capacity after']) {
      expect(within(dialog).getByText(label)).toBeInTheDocument()
    }
    fireEvent.click(screen.getByRole('button', { name: /^data stream bitrate .*show bitrate details$/ }))
    expect(screen.queryByRole('dialog', { name: 'Upgrade Capacity draw' })).not.toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: 'Data Stream bitrate' })).toBeInTheDocument()
  })
})

describe('pool speed details popover', () => {
  const dialogName = 'KB Pool bandwidth'
  const openPool1SpeedDetails = () => {
    seedMainGameState({ intro: { mainGameUnlocked: true, bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } })
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
    const pool1 = screen.getByRole('region', { name: 'pool 1' })
    const speed = within(pool1).getByRole('button', { name: /^pool 1 bandwidth .*show bandwidth details$/ })
    expect(speed).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(speed)
    return { speed, dialog: screen.getByRole('dialog', { name: dialogName }) }
  }

  it('opens on click with every speed-related figure, without tapping the pool', () => {
    const { speed, dialog } = openPool1SpeedDetails()
    expect(speed).toHaveAttribute('aria-expanded', 'true')
    for (const label of ['Fill bandwidth now', 'Available (before multiplier)', 'Bandwidth (theoretical)', 'Data Stream bitrate', 'Fill multiplier', 'Staging', 'Time to full']) {
      expect(within(dialog).getByText(label)).toBeInTheDocument()
    }
    const deliveredRate = within(dialog).getByText('Fill bandwidth now').nextElementSibling
    expect(deliveredRate).toHaveTextContent(speed.textContent.replace(/^⚡ /, ''))
    expect(screen.queryByLabelText('pool 1 fill-based bandwidth multiplier ping bonus')).not.toBeInTheDocument()
  })

  it('stays open when clicked inside and closes when pressed outside', () => {
    const { dialog } = openPool1SpeedDetails()
    fireEvent.pointerDown(dialog)
    fireEvent.click(dialog)
    expect(screen.getByRole('dialog', { name: dialogName })).toBeInTheDocument()
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole('dialog', { name: dialogName })).not.toBeInTheDocument()
  })

  it('closes when scrolling outside, but not when scrolling inside', () => {
    const { dialog } = openPool1SpeedDetails()
    fireEvent.scroll(dialog)
    fireEvent.wheel(dialog)
    expect(screen.getByRole('dialog', { name: dialogName })).toBeInTheDocument()
    fireEvent.scroll(document)
    expect(screen.queryByRole('dialog', { name: dialogName })).not.toBeInTheDocument()
  })

  it('moves focus into the panel, and closes on Escape (returning focus) or a resize', () => {
    const { speed, dialog } = openPool1SpeedDetails()
    expect(dialog).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: dialogName })).not.toBeInTheDocument()
    expect(speed).toHaveFocus()
    fireEvent.click(speed)
    fireEvent(window, new Event('resize'))
    expect(screen.queryByRole('dialog', { name: dialogName })).not.toBeInTheDocument()
  })

  it('explains a Data Stream limit, the share earlier pools take, and the consumer tap bonus', () => {
    seedMainGameState({ intro: {
      mainGameUnlocked: true, bits: 0, capacity: 32_000_000, speedCapacity: 1024, byteCreated: true,
      dataLakes: { 1: { bandwidthSteps: 4 } },
      poolTapBonusPercents: { 2: FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT },
    } })
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))

    fireEvent.click(screen.getByRole('button', { name: /^pool 1 bandwidth .*show bandwidth details$/ }))
    const pool1Dialog = screen.getByRole('dialog', { name: 'KB Pool bandwidth' })
    expect(within(pool1Dialog).getByText('Limited by the Data Stream\'s own bitrate.')).toBeInTheDocument()
    expect(within(pool1Dialog).queryByText('Taken by earlier pools')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^pool 2 bandwidth .*show bandwidth details$/ }))
    expect(screen.queryByRole('dialog', { name: 'KB Pool bandwidth' })).not.toBeInTheDocument()
    const pool2Dialog = screen.getByRole('dialog', { name: 'MB Pool bandwidth' })
    expect(within(pool2Dialog).getByText('Taken by earlier pools')).toBeInTheDocument()
    expect(within(pool2Dialog).getByText(/earlier pools take their Bandwidth first/)).toBeInTheDocument()
    expect(within(pool2Dialog).getByText(`+${FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT}%`)).toBeInTheDocument()
  })

  it('closes on a wheel or touch-move outside, and toggles closed when the speed is clicked again', () => {
    const { speed } = openPool1SpeedDetails()
    fireEvent.wheel(document.body)
    expect(screen.queryByRole('dialog', { name: dialogName })).not.toBeInTheDocument()
    fireEvent.click(speed)
    fireEvent.touchMove(document.body)
    expect(screen.queryByRole('dialog', { name: dialogName })).not.toBeInTheDocument()
    fireEvent.click(speed)
    fireEvent.click(speed)
    expect(screen.queryByRole('dialog', { name: dialogName })).not.toBeInTheDocument()
  })
})

test('a full pool stays at neutral speed at KB', () => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity },
  })
  render(<App />)

  const speed = within(screen.getByRole('region', { name: 'pool 1' })).getByTitle(/^Available fill bandwidth at/)
  expect(speed).toHaveAttribute('title', `Available fill bandwidth at 100% fill multiplier`)
  expect(speed).toHaveStyle({ color: 'rgb(59, 130, 246)' })
})

test('the pool tap tile stays tappable and grants the bonus while the Data Lake drains a half-full buffer', () => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity / 2 },
    disksBuiltTotal: { [DISK_LADDER_BASE_SIZE_BITS]: 2 },
    disks: { [DISK_LADDER_BASE_SIZE_BITS]: 2 },
    diskCache: { [DISK_LADDER_BASE_SIZE_BITS]: DISK_LADDER_BASE_SIZE_BITS },
  })
  render(<App />)

  const tap = within(screen.getByRole('region', { name: 'pool 1' })).getByRole('button', { name: /ping pool 1 staging/i })
  expect(tap).toBeEnabled()
  fireEvent.click(tap)
  expect(screen.getByRole('progressbar', { name: /pool 1 fill-based bandwidth multiplier ping bonus/i }))
    .toHaveAttribute('aria-valuenow', String(FILL_MULTIPLIER_TAP_BONUS_PERCENT))
})

test('the Data Lake header shows target price, filled amount and fill speed', () => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity },
    disksBuiltTotal: { 8000: DISK_ARRAY_LADDER_CAP, 80_000: DISK_ARRAY_LADDER_CAP, 800_000: DISK_ARRAY_LADDER_CAP },
    dataLakes: { 1: { depositedUnits: 1, fillBits: 2000, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1 } },
  })
  render(<App />)

  const lake = screen.getByLabelText('KB lake')
  // The target price is the lake's Booster control itself (shown once, not duplicated in the header).
  expect(within(lake).getAllByText(/1 KB/).filter(el => el.closest('h4') === null && el.textContent.includes('🏷️'))).toHaveLength(1)
  expect(within(lake).getByTitle('Currently filled')).toHaveTextContent('1.25 KB')
  // Buffer full + pool complete -> the lake fills at the pool's Bandwidth, so the speed is non-zero.
  expect(within(lake).getByTitle('Current fill speed')).not.toHaveTextContent('⚡ 0 B/s')
})

test('a collapsed pool card\'s Data Lake header shows the next Booster\'s affordability percentage instead of the lake balance (#1087)', () => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  // 3 banked disk units + a half-full buffer toward a cost-4 Booster (purchased 3): 3.5 / 4 = 87%.
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity },
    disksBuiltTotal: { 8000: DISK_ARRAY_LADDER_CAP, 80_000: DISK_ARRAY_LADDER_CAP, 800_000: DISK_ARRAY_LADDER_CAP },
    dataLakes: { 1: { depositedUnits: 3, fillBits: 4000, purchased: 3, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1 } },
  })
  render(<App />)

  const collapse = screen.queryByRole('button', { name: 'collapse pool 1' })
  if (collapse) fireEvent.click(collapse)
  const lake = screen.getByLabelText('KB lake')
  expect(within(lake).getByTitle(/Banked toward the next Cell/)).toHaveTextContent('87%')
  expect(within(lake).getByRole('progressbar', { name: 'KB lake fill progress' })).toHaveAttribute('aria-valuenow', '87')
  expect(within(lake).queryByTitle('Currently filled')).toBeNull()
})

test.each([
  ['reads 100% once the next Booster is covered', { depositedUnits: 5, fillBits: 0, purchased: 2 }, '100%', 100],
  ['stays below 100% for a cost the lake can never hold', { depositedUnits: 9, fillBits: 8000, purchased: 10 }, '90%', 90],
  ['reads 0% for an empty lake', { depositedUnits: 0, fillBits: 0, purchased: 5 }, '0%', 0],
])('a collapsed Data Lake header %s (#1087)', (_name, lake, text, valueNow) => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity },
    disksBuiltTotal: { 8000: DISK_ARRAY_LADDER_CAP, 80_000: DISK_ARRAY_LADDER_CAP, 800_000: DISK_ARRAY_LADDER_CAP },
    dataLakes: { 1: { boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1, ...lake } },
  })
  render(<App />)
  const collapse = screen.queryByRole('button', { name: 'collapse pool 1' })
  if (collapse) fireEvent.click(collapse)
  const lakeBlock = screen.getByLabelText('KB lake')
  const progress = within(lakeBlock).getByRole('progressbar', { name: 'KB lake fill progress' })
  expect(progress).toHaveAttribute('aria-valuenow', String(valueNow))
  expect(within(lakeBlock).getByTitle(/Banked toward the next Cell|costs more than this lake can hold/)).toHaveTextContent(text)
})

test('an expanded Data Lake shows its real balance, the 1-unit buffer, the in-flight transfer and the ×1000 disk squares (#1087)', () => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity },
    disksBuiltTotal: { 8000: DISK_ARRAY_LADDER_CAP, 80_000: DISK_ARRAY_LADDER_CAP, 800_000: DISK_ARRAY_LADDER_CAP },
    dataLakes: { 1: { depositedUnits: 1000, fillBits: 4000, lakeTransfer: { target: 10, movedBits: 40_000 }, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 3, resetCount: 2 } },
  })
  render(<App />)
  const lake = screen.getByLabelText('KB lake')
  expect(within(lake).getByRole('progressbar', { name: 'KB lake pool — fills its 1 KB buffer' })).toHaveAttribute('aria-valuenow', '50')
  expect(within(lake).getByRole('progressbar', { name: 'KB lake transfer — building a 10 KB disk' })).toHaveAttribute('aria-valuenow', '50')
  // 1000 banked + 10 in flight + half a unit in the buffer.
  expect(within(lake).getByTitle('Currently filled')).toHaveTextContent(/^1,010(\.5)? KB/)
  expect(within(lake).getByRole('group', { name: 'KB lake 1,000 KB disks' })).toBeTruthy()
  expect(within(lake).getAllByLabelText('full 1,000 KB lake disk')).toHaveLength(1)
  expect(within(lake).getAllByLabelText('empty 1,000 KB lake disk')).toHaveLength(1)
})

test('the Data Lake header shows time until the next Booster is banked, only while it is still short of the cost', () => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  const seedLake = lakeOverrides => seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity },
    disksBuiltTotal: { 8000: DISK_ARRAY_LADDER_CAP, 80_000: DISK_ARRAY_LADDER_CAP, 800_000: DISK_ARRAY_LADDER_CAP },
    dataLakes: { 1: { purchased: 0, boostersUnlocked: true, autoConvertActive: true, capacityLevel: 1, ...lakeOverrides } },
  })

  seedLake({ depositedUnits: 0, fillBits: 2000 })
  const short = render(<App />)
  expect(within(screen.getByLabelText('KB lake')).getByTitle(/Time until the next Cell's cost is banked/)).toHaveTextContent(/⏳ \d+[smhd]/)
  short.unmount()

  localStorage.clear()
  seedLake({ depositedUnits: 1, fillBits: 2000 })
  render(<App />)
  expect(within(screen.getByLabelText('KB lake')).queryByTitle(/Time until the next Cell's cost is banked/)).toBeNull()
})

test('a collapsed pool still shows its Data Lake heading and action row', () => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity },
    disksBuiltTotal: { 8000: 1 },
    dataLakes: { 1: { depositedUnits: 0, fillBits: DISK_LADDER_BASE_SIZE_BITS / 2, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1 } },
  })
  render(<App />)

  const pool1 = screen.getByRole('region', { name: 'pool 1' })
  const toggle = within(pool1).getByRole('button', { name: /(collapse|expand) pool 1/i })
  if (toggle.getAttribute('aria-expanded') === 'true') fireEvent.click(toggle)
  expect(within(pool1).getByRole('button', { name: /expand pool 1/i })).toBeInTheDocument()
  expect(within(pool1).getByText('Lake')).toBeInTheDocument()
  expect(within(pool1).queryByRole('group', { name: /lake .* disks/i })).not.toBeInTheDocument()
  const headerBar = within(pool1).getByRole('progressbar', { name: /KB lake fill progress/i })
  expect(headerBar).toHaveAttribute('aria-valuemin', '0')
  expect(headerBar).toHaveAttribute('aria-valuemax', '100')
  expect(headerBar).toHaveAttribute('aria-valuenow', '50')
  fireEvent.click(within(pool1).getByRole('button', { name: /expand pool 1/i }))
  // Expanded, the lake header keeps its full-width thin bar (#1142).
  expect(within(pool1).getByRole('progressbar', { name: /KB lake fill progress/i })).toBeInTheDocument()
})

test('a collapsed completed Data Lake header bar reads full, not empty', () => {
  const poolCapacity = getPoolBufferCapacity(
    { intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } },
    1,
  )
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolCapacity },
    disksBuiltTotal: { 8000: 1 },
    dataLakes: { 1: { depositedUnits: 10, fillBits: 0, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1 } },
  })
  render(<App />)

  const pool1 = screen.getByRole('region', { name: 'pool 1' })
  const toggle = within(pool1).getByRole('button', { name: /(collapse|expand) pool 1/i })
  if (toggle.getAttribute('aria-expanded') === 'true') fireEvent.click(toggle)
  expect(within(pool1).getByRole('progressbar', { name: /KB lake fill progress/i }))
    .toHaveAttribute('aria-valuenow', '100')
})

test('tapping a pool\'s own Memory buffer shows only that pool\'s tap bonus bar, leaving the Data Stream\'s untouched', () => {
  vi.useFakeTimers()
  seedMainGameState({ intro: { mainGameUnlocked: true, bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } })
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))

  fireEvent.click(screen.getByRole('button', { name: /ping pool 1 staging/i }))

  const bonusBar = screen.getByRole('progressbar', { name: /pool 1 fill-based bandwidth multiplier ping bonus/i })
  expect(bonusBar).toHaveAttribute('aria-valuenow', String(FILL_MULTIPLIER_TAP_BONUS_PERCENT))
  expect(bonusBar).toHaveAttribute('aria-valuetext', `+${FILL_MULTIPLIER_TAP_BONUS_PERCENT}%`)
  expect(screen.getByRole('region', { name: 'pool 1' })).toHaveTextContent(`+${FILL_MULTIPLIER_TAP_BONUS_PERCENT}% 👆`)
  expect(screen.queryByRole('progressbar', { name: /data stream fill-based bitrate multiplier ping bonus/i })).not.toBeInTheDocument()
  vi.useRealTimers()
})

test('the Data Stream tap target disables once its own tap bonus is already at the 100% cap', () => {
  seedMainGameState({
    intro: {
      mainGameUnlocked: true, bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      dataStreamTapBonusPercent: FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT,
    },
  })
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))

  const tapTarget = screen.getByRole('button', { name: /ping to generate a bit/i })
  expect(tapTarget).toBeDisabled()
  // The capped bonus shows on its own bar at 100.
  expect(screen.getByRole('progressbar', { name: /data stream fill-based bitrate multiplier ping bonus/i }))
    .toHaveAttribute('aria-valuenow', String(FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT))
})

test('a pool\'s own Memory tap target stays enabled once that pool\'s own tap bonus is at the 100% cap', () => {
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolTapBonusPercents: { 1: FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT },
  })
  render(<App />)

  const poolTapTarget = screen.getByRole('button', { name: /ping pool 1 staging/i })
  expect(poolTapTarget).toBeEnabled()
  expect(screen.getByRole('progressbar', { name: /pool 1 fill-based bandwidth multiplier ping bonus/i }))
    .toHaveAttribute('aria-valuenow', String(FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT))
})

test('Data Stream tile no longer shows a separate "bits this cycle" transfer-block tracker line', () => {
  seedIntroState({ bits: 4500, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
  render(<App />)

  expect(screen.queryByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.queryByText(/bits this cycle/i)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/byte foundry transfer-block tracker/i)).not.toBeInTheDocument()
})


// --- Byte Foundry Storage (Disks) ---
// The buildable size is an independent ladder starting at 8000 bits ("1 KB", Byte-accurate) that
// walks tier01's own per-unit LEVEL COST sequence expressed in bits (skipping values tier01's own
// costs skip), advancing to the next level's cost once DISK_ARRAY_LADDER_CAP disks have ever been
// built at the current one — decoupled from tier01's own CURRENT level (see getDiskSize in
// engine.js). Disks are a storage MEDIUM, not a one-shot pre-paid item: starting a build spends
// the cost immediately (DISK_BUILD_COST_MULTIPLIER times its own Byte-accurate size — see
// getDiskCost) but only constructs an EMPTY container once a real build TIME finishes (see
// tickProvisionDisk); Memory then keeps each array's Cache full (a timed 5× transfer) and
// auto-fills empty disks from a full read cache on a later tick (see tickDiskAutoFill), smallest
// size first. A FULL disk's pull-eligibility is gated on SOME tier's CURRENT per-unit level cost
// catching up to that disk's size AND that level having zero progress already (see
// isDiskPullEligible/tickDiskPull) — Byte Foundry pulls it into that tier automatically, every
// tick, with no autobuyer needed and nothing for the player to click. Every test here uses fake
// timers (never advanced, unless a test is
// specifically exercising a tick boundary) rather than real userEvent delays — with byteCreated
// true and Memory's own passive production live, a real tick landing between a click and its
// assertions would non-deterministically shift Memory's balance and could trip the Byte Foundry's
// own bulk transfer-budget auto-convert. Storage lives as continuous DiskArrayRow sections on
// ByteFoundryPage once revealed (no second-level Memory | Storage tabs). Every test below that
// needs Foundry open after MainPage may call openFoundry().
describe('Byte Foundry Storage', () => {
  const tier01 = TIER_DEFINITIONS[0]
  const currentBankSize = getTierCost(tier01, 1) * BITS_PER_BYTE // 8000 — the ladder's starting, Byte-accurate size
  const currentBankCost = currentBankSize * DISK_BUILD_COST_MULTIPLIER
  // A larger, not-yet-reached size — used to exercise the "held disk becomes redeemable once
  // some tier's level catches up to it" path independent of what the Provision button currently offers.
  const futureBankSize = getTierCost(tier01, 2) * BITS_PER_BYTE

  const openFoundry = () => {
    // Disk arrays live on Foundry as continuous sections (no Storage tab / top-level Storage AppNav).
    const foundry = screen.queryByRole('button', { name: /open byte foundry/i })
    if (foundry) fireEvent.click(foundry)
  }
  const openStorage = openFoundry
  const openDisks = openFoundry

  test('Provision Disk is visible on ByteFoundryPage once the Byte generator exists', () => {
  // A Data Stream with Capacity at the disk-unlock threshold reveals Storage and Provision Disk.
    seedIntroState({ bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true })
    render(<App />)
    expect(screen.getByRole('button', { name: /provision disk/i })).toBeInTheDocument()
    expect(screen.queryByRole('tab', { name: /open storage/i })).not.toBeInTheDocument()
    // Building the next disk stays on ByteFoundryPage itself — Data Stream + Storage are continuous.
    expect(screen.getByRole('group', { name: /^1 kb disks$/i })).toBeInTheDocument()
    expect(screen.queryByRole('tablist', { name: /foundry view/i })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  })

  test('Provision Disk is startable with an empty pool buffer — clicking arms a buffer-funded build that spends nothing yet', () => {
    seedIntroState({ bits: 0, capacity: currentBankCost, byteCreated: true })
    render(<App />)

    const buildButton = screen.getByRole('button', { name: /provision disk/i })
    expect(buildButton).toHaveTextContent('1 KB')
    expect(buildButton).not.toBeDisabled()
    expect(buildButton).toHaveTextContent(/Ready · /)
    expect(buildButton).not.toHaveTextContent(/Queued|Provisioning/)
    expect(buildButton).toHaveTextContent('Provision 1 KB Disk')
    fireEvent.click(buildButton)
    const savedState = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(savedState.intro.diskBuildQueued).toBe(true)
    expect(buildButton).toHaveTextContent(/⏳.*1 KB Disk…/)
    expect(buildButton).not.toHaveTextContent(/Ready/)
    expect(savedState.intro.disksBuiltTotal?.[currentBankSize] ?? 0).toBe(0) // the build progresses on later ticks
    expect(savedState.intro.poolBuffers?.[1] ?? 0).toBe(0)
  })

  test('a queued Provision Disk reads the speed/time tile with its banked passes, unlike the idle "Provision …" label', () => {
    // 8 built → this is the 9th disk (9 passes); 2 already banked and the queue is armed.
    seedIntroState({
      bits: 0, capacity: currentBankCost, byteCreated: true,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP - 1 },
      diskProvisionPasses: { [currentBankSize]: 2 },
      diskBuildQueued: true,
    })
    render(<App />)

    const buildButton = screen.getByRole('button', { name: /provision disk/i })
    expect(buildButton).toHaveTextContent(/⏳.*1 KB Disk…/)
    expect(buildButton).toHaveTextContent('2/9')
    expect(buildButton).toHaveTextContent(/⚡.*\/s/)
    expect(buildButton).toHaveTextContent('⚡')
    expect(buildButton).toHaveTextContent('22%')
    expect(buildButton).not.toHaveTextContent(/tap to queue|Ready/)
    expect(screen.getByRole('progressbar', { name: /disk build progress/i })).toHaveAttribute('aria-valuenow', '22')
  })

  test('Provision Disk shows its cost in the nearest fitting SI unit (matching the Disk\'s own SI size), not a raw unitless bit count', () => {
    // 8 already built — this is the array's 9th (last, DISK_ARRAY_LADDER_CAP) disk at this size,
    // costing 9x its own face value (getDiskProvisionPassesRequired scales by ordinal — the array's
    // own cache substitutes for what would have been a 10th disk, see docs/DESIGN_HISTORY.md) —
    // chosen so the cost meaningfully differs from the disk's own "1 KB" face size, unlike the
    // array's first disk (which costs just 1x, the same figure as its own size).
    seedIntroState({
      bits: currentBankCost, capacity: currentBankCost, byteCreated: true ,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP - 1 },
    })
    render(<App />)

    // The last disk's cost is 9 * 8,000 bits = 72,000 bits = 9,000 Bytes — "9 KB" in the Disk's own
    // SI scale, shown as "9 KB" rather than Memory's binary scale or a raw bit count — a Disk's
    // build cost is a Disk-denominated amount, so it renders on the same SI scale as the Disk's own
    // size right next to it, not Memory's binary Sacrifice-ladder scale.
    const buildButton = screen.getByRole('button', { name: /provision disk/i })
    expect(buildButton).toHaveTextContent('9 KB')
    expect(buildButton).not.toHaveTextContent('72,000')
  })

  test('Provision Disk shows the pass count up front (0/N) for a multi-pass disk, even before the first pass is collected', () => {
    // 8 already built — this build is the array's 9th (last, DISK_ARRAY_LADDER_CAP) disk, needing 9
    // passes (getDiskProvisionPassesRequired) — before this fix the idle label only showed the
    // total cost, giving no hint that funding it takes multiple passes until after the first click
    // landed one.
    seedIntroState({
      bits: 0, capacity: currentBankCost, byteCreated: true ,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP - 1 },
    })
    render(<App />)

    const buildButton = screen.getByRole('button', { name: /provision disk/i })
    expect(buildButton).toHaveTextContent('0/9')
  })

  test('Provision Disk omits the pass count for a single-pass disk — nothing to clarify', () => {
    // A fresh array's very first disk needs just 1 pass, so its idle label stays the simple
    // "Provision <size> Disk (<cost>)" form rather than a redundant "0/1".
    seedIntroState({ bits: currentBankCost - 1, capacity: currentBankCost, byteCreated: true })
    render(<App />)

    const buildButton = screen.getByRole('button', { name: /provision disk/i })
    expect(buildButton).not.toHaveTextContent('0/1')
  })

  test('Provision Disk clamps a stale, over-required collected-pass count in the DISPLAYED label rather than showing a nonsensical "N/M" with N > M', () => {
    // A save carrying diskProvisionPasses banked under the old flat-10-passes-always system, on a
    // disk whose real ordinal only needs 1 pass now — the raw stored value (5) exceeds what's
    // required (1); the label must clamp what it SHOWS to "1/1", never the literal stored "5/1".
    seedIntroState({
      bits: 0, capacity: currentBankCost, byteCreated: true ,
      diskProvisionPasses: { [currentBankSize]: 5 },
    })
    render(<App />)

    const buildButton = screen.getByRole('button', { name: /provision disk/i })
    expect(buildButton).toHaveTextContent('1/1')
    expect(buildButton).not.toHaveTextContent('5/1')
  })

  test('Provision Disk advances to the next pool after the current pool is fully built', () => {
    // Completing all three pool-1 arrays derives pool 2 and advances the common operation to 1 MB.
    const size10kb = currentBankSize * 10
    const size100kb = currentBankSize * 100
    seedIntroState({
      bits: 0,
      // Above pool 2's own capacity-unlock threshold (1 MiB/8,388,608 bits — getVisibleStoragePoolCount)
      // in addition to INTRO_DISK_UNLOCK_CAPACITY, so pool 2's own card actually renders.
      capacity: 1024 * 1024 * BITS_PER_BYTE,
      byteCreated: true,
      unlockedDiskSteps: 30,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP, [size10kb]: DISK_ARRAY_LADDER_CAP, [size100kb]: DISK_ARRAY_LADDER_CAP },
    })
    render(<App />)

    expect(screen.getByRole('region', { name: 'pool 1' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'pool 2' })).toBeInTheDocument()
    const pool1 = screen.getByRole('region', { name: 'pool 1' })
    const pool2 = screen.getByRole('region', { name: 'pool 2' })
    // Pool titles read "<symbol> Pool" (e.g. "KB Pool") — no index number or tier name.
    expect(pool1).toHaveTextContent(`${TIER_DEFINITIONS[0].symbol}Pool`)
    expect(pool2).toHaveTextContent(`${TIER_DEFINITIONS[1].symbol}Pool`)
    // Bandwidth (bottom-left) and Capacity (bottom-right) render unlabelled, split across the
    // FooterRow's two halves, with the balance itself as its own bigger centered figure above
    // (see FillableStatCard/BalanceText/FooterRow in ByteFoundryPage/index.jsx) rather than a
    // labelled Bandwidth/Capacity/Memory stat row.
    const savedState = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(pool1).toHaveTextContent('/s')
    expect(pool2).toHaveTextContent('/s')
    // Balance and capacity now always share the same fixed pool unit, so formatCombinedBalance
    // always dedupes the balance's own unit suffix, leaving just the bare number.
    expect(pool1.querySelector('p')).toHaveTextContent(/^0(\.0+)? \w+$/)
    expect(pool1).toHaveTextContent(formatDiskSizeInPoolUnit(getPoolBufferCapacity(savedState, 1), 1))
    expect(pool2.querySelector('p')).toHaveTextContent(/^0(\.0+)? \w+$/)
    expect(pool2).toHaveTextContent(formatDiskSizeInPoolUnit(getPoolBufferCapacity(savedState, 2), 2))
    expect(within(pool2).getByRole('button', { name: /collapse pool 2/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.queryByRole('group', { name: /^1 kb disks$/i })).not.toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^1 mb disks$/i })).toBeInTheDocument()
    fireEvent.click(within(pool2).getByRole('button', { name: /collapse pool 2/i }))
    expect(within(pool2).getByRole('button', { name: /expand pool 2/i })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('group', { name: /^1 mb disks$/i })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /expand pool 1/i }))
    expect(screen.getByRole('group', { name: /^1 kb disks$/i })).toBeInTheDocument()
    const provisionButton = screen.getByRole('button', { name: /provision disk/i })
    expect(provisionButton).toHaveTextContent('1 MB')
    expect(provisionButton).not.toHaveTextContent('All Pools Complete')
    // Lives in its own Provision Disk card, independent of the Data Stream card and every pool card.
    expect(screen.getByRole('region', { name: 'Provision Disk' })).toContainElement(provisionButton)
    expect(screen.getByRole('region', { name: 'Data Stream' })).not.toContainElement(provisionButton)
    expect(pool2).not.toContainElement(provisionButton)
    // The Data Stream balance line already reads "<bits> / <capacity>" — no separate "Buffer"
    // line restating the same capacity figure a second time (see ByteFoundryPage/index.jsx).
    expect(screen.getByRole('region', { name: 'Data Stream' })).toHaveTextContent(
      formatBitsInNearestUnit(1024 * 1024 * BITS_PER_BYTE)
    )
  })

  test('Provision Disk stays hidden after Compile until the KB pool unlocks', () => {
    seedIntroState({ bits: 0, byteCreated: true })
    render(<App />)
    expect(screen.queryByRole('button', { name: /provision disk/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('slider', { name: /foundry speed/i })).not.toBeInTheDocument()
  })

  test('Foundry speed previews a choice and saves it at MB', () => {
    seedIntroState({ bits: 0, capacity: 8_388_608, byteCreated: true })
    render(<App />)
    const card = screen.getByRole('region', { name: 'Foundry speed' })
    const slider = within(card).getByRole('slider', { name: /foundry speed/i })
    expect(slider).toHaveAttribute('aria-valuetext', '2× / 0.5×')
    expect(within(card).queryByRole('button', { name: 'Save', exact: true })).not.toBeInTheDocument()
    fireEvent.change(slider, { target: { value: '1.5' } })
    expect(slider).toHaveAttribute('aria-valuetext', '1.5× / 0.667×')
    expect(card).toHaveTextContent('Active 2× / 0.5×')
    expect(card).toHaveTextContent('Pending 1.5× / 0.667×')
    fireEvent.change(slider, { target: { value: '2' } })
    expect(within(card).queryByRole('button', { name: 'Save', exact: true })).not.toBeInTheDocument()
    fireEvent.change(slider, { target: { value: '1.5' } })
    fireEvent.click(within(card).getByRole('button', { name: 'Save', exact: true }))
    expect(card.isConnected).toBe(false)
    const saved = screen.getByRole('region', { name: 'Foundry speed' })
    expect(saved).toHaveTextContent('Active 1.5× / 0.667×')
    expect(within(saved).getByRole('slider')).toBeDisabled()
    expect(within(saved).queryByRole('button')).not.toBeInTheDocument()
    expect(within(saved).queryByRole('progressbar')).not.toBeInTheDocument()
  })

  test('after a Foundry reset the button presents only the newest unlocked size, disabled while smaller sizes rebuild automatically', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 2,
      disks: { [currentBankSize]: 3 },
      disksBuiltTotal: { [currentBankSize]: 3 },
    })
    render(<App />)
    const provisionButton = screen.getByRole('button', { name: /provision disk/i })
    expect(provisionButton).toBeDisabled()
    // Rebuild layout: the time/percent cover the auto-rebuild of every smaller size up to the prior highs.
    expect(provisionButton).toHaveTextContent(/Rebuilding.*1 KB disks/)
    expect(provisionButton).toHaveTextContent(/⏳\s*\d/)  // always a time, from the pool's current speed
    expect(provisionButton).toHaveTextContent('⚡')
    expect(provisionButton).toHaveTextContent('33%')
    expect(screen.getByRole('progressbar', { name: /disk build progress/i })).toHaveAttribute('aria-valuenow', '33')
  })

  test('the rebuild status says it is waiting for an earlier pool while that pool\'s reset rebuild still holds the lock', () => {
    // Pool 1 (ladder steps 1-3) fully built but its lake still flagged rebuilding; pool 2's first size
    // (step 4) is the pending lower-size rebuild below the presented step 5.
    const pool1Sizes = [currentBankSize, currentBankSize * 10, currentBankSize * 100]
    const full = Object.fromEntries(pool1Sizes.map(size => [size, 9]))
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 5,
      disks: full,
      disksBuiltTotal: full,
      dataLakes: { 1: { rebuilding: true } },
    })
    render(<App />)
    expect(screen.getByRole('button', { name: /provision disk/i })).toHaveAttribute('aria-description', expect.stringMatching(/Rebuilding .* first · waiting for earlier pool/))
  })

  test('the rebuild status says it is waiting for staging while the pool buffer cannot fund it, automatic once it can', () => {
    const seed = poolBuffers => seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 2,
      disks: { [currentBankSize]: 3 },
      disksBuiltTotal: { [currentBankSize]: 3 },
      poolBuffers,
    })
    seed({})
    const { unmount } = render(<App />)
    expect(screen.getByRole('button', { name: /provision disk/i })).toHaveAttribute('aria-description', expect.stringMatching(/Rebuilding .* first · waiting for staging/))
    unmount()
    localStorage.clear()
    // Once the read cache is full its claim is 0, so the buffer funds the rebuild.
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 2,
      disks: { [currentBankSize]: 3 },
      disksBuiltTotal: { [currentBankSize]: 3 },
      diskCache: { [currentBankSize]: currentBankSize },
      poolBuffers: { 1: currentBankSize / 2 },
    })
    render(<App />)
    expect(screen.getByRole('button', { name: /provision disk/i })).toHaveAttribute('aria-description', expect.stringMatching(/Rebuilding .* first · automatic/))
  })

  test('a queued Provision Disk waiting behind Disk Fill never claims "now" for its time', () => {
    seedIntroState({
      bits: 0, capacity: currentBankCost * 1024, byteCreated: true,
      disks: { [currentBankSize]: 1 },
      disksBuiltTotal: { [currentBankSize]: 1 },
      poolBuffers: { 1: currentBankSize * 4 },
      diskBuildQueued: true,
    })
    render(<App />)
    const button = screen.getByRole('button', { name: /provision disk/i })
    expect(button).toHaveAttribute('aria-description', expect.stringMatching(/after disk fill/))
    expect(button).not.toHaveTextContent('now')
    expect(button).not.toHaveTextContent('—')
  })

  test('a rebuild whose current size is in a pool that is not live yet still shows ⚡ and ⏳ (projected, labelled)', () => {
    // Every pool-1 size full → the size being rebuilt (1 MB) sits in pool 2, which is not live at this Capacity.
    const pool1Sizes = [currentBankSize, currentBankSize * 10, currentBankSize * 100]
    const full = Object.fromEntries(pool1Sizes.map(size => [size, DISK_ARRAY_LADDER_CAP]))
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 8,
      disksBuiltTotal: full,
      disks: full,
    })
    render(<App />)
    const button = screen.getByRole('button', { name: /provision disk/i })
    expect(button).toHaveTextContent(/Rebuilding/)
    expect(button).toHaveTextContent(/⚡.*\/s/)
    expect(button).toHaveTextContent(/⚡\s*~/) // the projected speed is marked with ~ too
    expect(button).toHaveTextContent(/⏳\s*~\d/) // projected time is marked with ~ (and toned down)
    expect(button.querySelector('[title^="Projected bandwidth"]')).not.toBeNull()
  })

  test('the disk being provisioned is drawn as a radial progressbar; a rebuild is labelled distinctly', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      disksBuiltTotal: { [currentBankSize]: 4 }, disks: { [currentBankSize]: 2 },
      diskBuildQueued: true, diskProvisionPasses: { [currentBankSize]: 2.4 },
    })
    const { unmount } = render(<App />)
    const active = screen.getByRole('progressbar', { name: /provisioning 1 kb disk/i })
    expect(active).toHaveAttribute('aria-valuenow', '48') // 2.4 of 5 passes
    expect(active.getAttribute('style')).toMatch(/conic-gradient/)
    unmount()
  })

  test('the disk being rebuilt after a Foundry reset is labelled and shows its progress', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 2,
      disksBuiltTotal: { [currentBankSize]: 3 }, disks: { [currentBankSize]: 3 },
      lowerRebuild: { size: currentBankSize, progress: 0.5 },
    })
    render(<App />)
    const active = screen.getByRole('progressbar', { name: /rebuilding 1 kb disk/i })
    expect(active).toHaveAttribute('aria-valuenow', '50')
  })

  test('a multi-size rebuild names the size being rebuilt and the largest size it will reach', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 3,
      disks: { [currentBankSize]: 3 },
      disksBuiltTotal: { [currentBankSize]: 3 },
    })
    render(<App />)
    expect(screen.getByRole('button', { name: /provision disk/i })).toHaveTextContent(/Rebuilding.*1 KB → 10 KB/)
  })

  test('a full unlocked Disk array offers a confirm-guarded Foundry reset instead of Provision Disk, which unlocks the next size and raises the exponent', async () => {
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 1,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP },
    })
    render(<App />)
    expect(screen.queryByRole('button', { name: /^provision disk/i })).not.toBeInTheDocument()
    const unlockButton = screen.getByRole('button', { name: /reformat to unlock disk size/i })
    expect(unlockButton).toHaveTextContent('10 KB')

    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)
    fireEvent.click(unlockButton)
    expect(confirmSpy).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: /reformat to unlock disk size/i })).toBeInTheDocument()

    confirmSpy.mockReturnValue(true)
    fireEvent.click(screen.getByRole('button', { name: /reformat to unlock disk size/i }))
    expect(screen.queryByRole('button', { name: /reformat to unlock disk size/i })).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('tens_game_state')).intro.unlockedDiskSteps).toBe(2)
    confirmSpy.mockRestore()
  })

  test('a pool with its disk-build condition met but Capacity below its own threshold stays hidden, with Provision Disk still reachable in the Data Stream card', () => {
    const size10kb = currentBankSize * 10
    const size100kb = currentBankSize * 100
    seedIntroState({
      bits: 0,
      // Pool 1's disk-build condition is met (unlocks pool 2 via getUnlockedStoragePoolCount), but
      // capacity stays below pool 2's own 1 MiB capacity-unlock threshold (getVisibleStoragePoolCount)
      // — pool 2's own card must stay hidden even though the disk ladder has already moved on to it.
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      unlockedDiskSteps: 30,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP, [size10kb]: DISK_ARRAY_LADDER_CAP, [size100kb]: DISK_ARRAY_LADDER_CAP },
    })
    render(<App />)

    expect(screen.getByRole('region', { name: 'pool 1' })).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'pool 2' })).not.toBeInTheDocument()
    // The disk ladder has already advanced to pool 2's first size (1 MB) — Provision Disk lives in
    // the Data Stream card, so it stays reachable before pool 2's own card is visible.
    const provisionButton = screen.getByRole('button', { name: /provision disk/i })
    expect(provisionButton).toHaveTextContent('1 MB')
    expect(screen.getByRole('region', { name: 'pool 1' })).not.toContainElement(provisionButton)
  })

  test('Provision Disk stays visible while the pool its current offer belongs to is rebuilding, and a click queues the build', () => {
    seedIntroState({
      bits: 0, poolBuffers: { 1: currentBankSize }, capacity: currentBankCost, byteCreated: true,
      diskCache: { [currentBankSize]: currentBankSize },
      dataLakes: { 1: { rebuilding: true } },
    })
    render(<App />)

    expect(screen.getByRole('region', { name: 'pool 1' })).toBeInTheDocument()
    const provisionButton = screen.getByRole('button', { name: /provision disk/i })
    fireEvent.click(provisionButton)
    expect(JSON.parse(localStorage.getItem('tens_game_state')).intro.diskBuildQueued).toBe(true)
  })

  test('Provision Disk arms its buffer-funded build on click — the consolidated Upgrade Data Stream is the LOWER-priority action', () => {
    seedIntroState({ bits: 0, capacity: currentBankCost, byteCreated: true })
    render(<App />)

    const buildButton = screen.getByRole('button', { name: /provision disk/i })
    expect(buildButton).not.toBeDisabled()
    expect(buildButton).toHaveTextContent(/🏦.*Ready · /)
    expect(screen.getByRole('region', { name: 'Provision Disk' })).toContainElement(buildButton)
    fireEvent.click(buildButton)
    const savedState = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(savedState.intro.diskBuildQueued).toBe(true)
    // The Data Stream upgrade didn't fire — its Buffer isn't full (it could only be armed).
    expect(savedState.intro.capacity).toBe(currentBankCost)
  })

  test('ByteFoundryPage renders the current size\'s full interactive Disk array detail inline (cache blocks and disk squares), not just a text summary', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      disksBuiltTotal: { [currentBankSize]: 3 }, disks: { [currentBankSize]: 1 },
    })
    render(<App />)

    // Size identity is painted inside each cell; no external header / Cache/Disks titles. Scoped to
    // the disk/cache groups themselves (via `within`) since the pool's own embedded Data Lake row
    // below the arrays can also show a "1 KB" figure (its own Capacity/Next-cost, unrelated here).
    const diskGroup = screen.getByRole('group', { name: /^1 kb disks$/i })
    const cacheGroup = screen.getByRole('group', { name: /^1 kb read cache$/i })
    expect(diskGroup).toBeInTheDocument()
    expect(cacheGroup).toBeInTheDocument()
    expect(within(cacheGroup).getAllByLabelText(/^1 KB cache block \d+$/).length).toBe(DISK_CACHE_BLOCK_COUNT)
    expect(within(diskGroup).getAllByLabelText(/1 KB disk/).length).toBe(DISK_ARRAY_LADDER_CAP)
    expect(screen.queryByText(/^Cache$/)).not.toBeInTheDocument()
    expect(screen.queryByText(/\/10 built/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Tap a full disk/i)).not.toBeInTheDocument()
  })

  test('the current size\'s array preview shows even before anything has ever been built or held, rather than staying hidden', () => {
    seedIntroState({ bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true })
    render(<App />)

    expect(screen.getByRole('group', { name: /^1 kb disks$/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^1 kb read cache$/i })).toBeInTheDocument()
  })

  test('cache and disk rows each state their size once, with its unit, beside an unlabeled strip (#1142)', () => {
    seedIntroState({ bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true })
    render(<App />)

    // currentBankSize is 8000 bits (a real "1 KB" disk) — its 8 cache blocks are 1000 bits each, so
    // the cache row reads "1 Kb" (bit-scale) and the disk row "1 KB" (Byte-scale), once each, in the
    // row label; the cells themselves carry no text.
    const diskGroup = screen.getByRole('group', { name: /^1 kb disks$/i })
    const cacheGroup = screen.getByRole('group', { name: /^1 kb read cache$/i })
    expect(cacheGroup.textContent).toBe('')
    expect(diskGroup.textContent).toBe('')
    expect(cacheGroup.previousElementSibling.textContent).toBe('1 Kb')
    expect(diskGroup.previousElementSibling.textContent).toBe('1 KB')
    // Read cache sits above the disks it feeds.
    expect(cacheGroup.compareDocumentPosition(diskGroup) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  test('Foundry stacks multiple size arrays as continuous sections with per-row size labels and no redeem ActionHint', () => {
    const size10kb = currentBankSize * 10
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      disksBuiltTotal: {
        [currentBankSize]: DISK_ARRAY_LADDER_CAP,
        [size10kb]: 2,
      },
      disks: { [currentBankSize]: 1, [size10kb]: 1 },
      diskCache: { [currentBankSize]: currentBankSize },
    })
    render(<App />)

    expect(screen.getByRole('group', { name: /^1 kb disks$/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^10 kb disks$/i })).toBeInTheDocument()
    expect(screen.getAllByText('1 Kb').length).toBe(1)
    // Only the pool's smallest size (1 KB) ever shows a read cache — 10 KB fills exclusively via
    // write-cache ripple from below (see isDiskReadCacheEligible in engine.js).
    expect(screen.queryByRole('group', { name: /^10 kb read cache$/i })).not.toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^1 kb disks$/i }).previousElementSibling.textContent).toBe('1 KB')
    expect(screen.getByRole('group', { name: /^10 kb disks$/i }).previousElementSibling.textContent).toBe('10 KB')
    expect(screen.queryByText(/^Cache$/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Tap a full disk/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Disks —/)).not.toBeInTheDocument()
  })

  test('Foundry keeps an older built size\'s DiskArrayRow while it is still redeemable, even after the ladder advances past it', () => {
    // 10 built at 1 KB advances the Build offer to 10 KB (not yet matching any tier at level 1),
    // but the 1 KB array still matches Kilobytes — both sizes stay on the continuous Foundry screen.
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      unlockedDiskSteps: 30,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP },
      disks: { [currentBankSize]: 1 },
    })
    render(<App />)

    expect(screen.getByRole('button', { name: /provision disk/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^1 kb disks$/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^10 kb disks$/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/1 kb disk pulling into Kilobytes/i)).toBeInTheDocument()
    // Pull affordance is the green pulsing disk itself — no under-strip ActionHint copy, and
    // nothing here is ever clickable — Byte Foundry pulls it automatically (see engine.js's
    // tickDiskPull).
    expect(screen.queryByText(/Tap a full disk/i)).not.toBeInTheDocument()
  })

  test('Foundry keeps every previously-built Disk size plus the highest offer even when no shown size is redeemable', () => {
    // Factory offers futureBankSize; tier01 is past both FIRST's and level-2's required levels, so neither is redeemable.
    // Previously-built 1 KB and the incomplete 10 KB offer both stay on the continuous Foundry screen.
    seedIntroState(
      {
        bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
        unlockedDiskSteps: 30,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP },
      },
      { purchaseLevels: { [tier01.id]: 3 } }
    )
    render(<App />)

    expect(screen.getByRole('button', { name: /provision disk/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^1 kb disks$/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^10 kb disks$/i })).toBeInTheDocument()
    // 10 KB never gets a read cache, regardless of redeemability — only the pool's smallest size
    // (1 KB) does (see isDiskReadCacheEligible in engine.js).
    expect(screen.queryByRole('group', { name: /^10 kb read cache$/i })).not.toBeInTheDocument()
  })

  test('cache blocks are a pure fill-status display — never clickable, whether or not a full matching disk exists at the same size', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
      disksBuiltTotal: { [currentBankSize]: 1 },
      disks: { [currentBankSize]: 1 },
      diskCache: { [currentBankSize]: currentBankSize },
    })
    render(<App />)

    expect(screen.getByLabelText(/1 kb disk pulling into Kilobytes/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /transfer 1 kb cache block/i })).not.toBeInTheDocument()
    screen.getAllByLabelText(/^1 kb cache block \d+$/i).forEach(block => {
      expect(block.tagName).not.toBe('BUTTON')
    })
  })

  test('starting a build only arms it: nothing is drawn from the pool buffer or built until the next ticks', () => {
    seedIntroState({
      poolBuffers: { 1: currentBankSize },
      capacity: BITS_PER_BYTE * (2 ** 14),
      byteCreated: true,
      diskCache: { [currentBankSize]: currentBankSize },
    })
    const { unmount } = render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /provision disk/i }))

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.diskBuildQueued).toBe(true)
    expect(saved.intro.poolBuffers['1']).toBe(currentBankSize) // the click itself draws nothing
    expect(saved.intro.disksBuiltTotal?.[currentBankSize] ?? 0).toBe(0)
    unmount()
  })

  test('a partly filled read-cache block shows its real fill progress (the cache fills continuously from Staging)', () => {
    const cachedBits = currentBankSize / DISK_CACHE_BLOCK_COUNT / 4
    seedIntroState({
      poolBuffers: { 1: 0 },
      diskCache: { [currentBankSize]: cachedBits },
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      disksBuiltTotal: { [currentBankSize]: 1 },
    })
    render(<App />)
    openStorage()

    expect(screen.getByLabelText(/^1 kb cache block 1$/i)).toHaveAttribute('title', 'Filling from Staging (25%)')
    expect(screen.getByLabelText(/^1 kb cache block 2$/i)).toHaveAttribute('title', 'Filling from Staging')
  })

  test('Memory keeps read cache full then pours into an empty disk on a later tick when tier does not block', () => {
    vi.useFakeTimers()

    // A disk already built (empty) plus enough in its own POOL BUFFER for read cache and one disk
    // pour — cache fill-from-Memory now spends that buffer directly, not the shared Data Stream
    // Buffer (intro.bits), so this seeds poolBuffers directly rather than relying on
    // tickPoolBufferFill's own separate bandwidth-limited top-up (a different mechanism this test
    // isn't exercising). tier01 past level 1 so read cache may flush into the empty disk without an
    // active tier claim at this size. Pool 1's Bandwidth is 2,000 bits/sec (a clean 250 B/s) —
    // deliberately BELOW currentBankSize (8,000), so a full cache fill genuinely takes real time. It
    // comes from the pinned Speed basis below (raw stream rate 256 B/s -> SI-clean 250 B/s), which sits
    // well under pool 1's own Capacity^0.8 ceiling, so the large seeded Capacity doesn't bind it.
    // with intro.bits seeded at 0, tickPoolBufferFill stays inert throughout (nothing to
    // transfer), so it can't perturb the directly-seeded pool buffer either.
    // A cache refill FROM the pool buffer is a timed transfer at 5× the pool's 2,000 bits/s Bandwidth
    // (10,000 bits/s), so the seeded 16,000-bit buffer fills this size's 8,000-bit cache in ~0.8s;
    // flushing one cache block into the empty disk (a DISK filling FROM a cache, at
    // DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER × the pool's capped rate) then takes ~0.25s, after
    // which the cache refills from the remaining buffer over another ~0.8s.
    const bandwidthCapBits = 2000
    // Pool Capacity advances in plain decade-power-of-10 steps (getDecadePowerEquivalentBits):
    // 2**17 bits lands on decade step 10**5 Bytes (800,000 bits), whose Capacity^0.8 ceiling
    // (10,000 B/s) is far above the pinned raw rate, so Bandwidth is the SI-clean raw rate.
    const bandwidthCapCapacityBits = (2 ** 17) * 8
    seedIntroState(
      {
        poolBuffers: { 1: currentBankSize * 2 },
        capacity: bandwidthCapCapacityBits,
        byteCreated: true,
        disksBuiltTotal: { [currentBankSize]: 1 },
        // Production is continuous now (no tickSpeedSeconds/productionMultiplier knobs) — the huge
        // capacity keeps the derived rate far above the pool bandwidth cap, so the pool buffer
        // stays topped up and can't perturb the cache-fill timing being measured. The Speed basis is
        // pinned to 256 B/s raw (1024 B basis) so pool 1 Bandwidth stays a clean 250 B/s (2,000 bits/sec) as this timing was tuned.
        speedCapacity: Math.ceil(256 ** (1 / DATA_STREAM_SPEED_EXPONENT) * 8),
      },
      { purchaseLevels: { [tier01.id]: 2 } }
    )
    const { unmount } = render(<App />)
    openStorage()
    expect(screen.getByLabelText(/empty 1 kb disk/i)).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(1300) })

    // Read cache topped up and flushed into the empty disk once fully staged. At tier level 2 the
    // filled disk is stranded (past its own required level) — assert the fill itself, not a pull
    // affordance. The cache itself is empty again immediately after flushing into the disk — it
    // only refills on the pool's own bandwidth budget from here.
    expect(screen.getByLabelText(/^full 1 kb disk$/i)).toBeInTheDocument()
    let saved = JSON.parse(localStorage.getItem('tens_game_state'))
    // The buffer dropped one cache-fill's worth (currentBankSize) but continuous production keeps
    // tickPoolBufferFill topping it back up within the same window — assert it never dropped
    // below the post-fill remainder rather than an exact balance. Same for the cache: it emptied
    // into the disk on flush, then immediately started bandwidth-limited refilling — assert it
    // flushed (well below full), not that it stays at 0.
    // The cache is only partway through refilling after the flush (a timed transfer, not instant).
    expect(saved.intro.diskCache[currentBankSize] ?? 0).toBeLessThan(currentBankSize)
    expect(saved.intro.disks[currentBankSize]).toBe(1)
    expect(saved.owned.tier01).toBe(0)

    // The same 5× transfer finishes refilling the cache from the remaining balance — about another
    // 0.8s of real ticks — with no further flush this time (the array's only container is already full).
    act(() => { vi.advanceTimersByTime(1000) })

    saved = JSON.parse(localStorage.getItem('tens_game_state'))
    // The cache is full again; the pool buffer keeps its own continuous top-up on top of what was spent.
    expect(saved.intro.diskCache[currentBankSize]).toBe(currentBankSize)
    expect(saved.intro.disks[currentBankSize]).toBe(1)
    expect(saved.owned.tier01).toBe(0)

    unmount()
    vi.useRealTimers()
  })

  test('a full disk pulls automatically on the very next tick — no autobuyer, no click needed', () => {
    vi.useFakeTimers()

    seedIntroState({ bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true, disks: { [currentBankSize]: 1 } })
    const { unmount } = render(<App />)
    openStorage()
    expect(screen.getByLabelText(/1 kb disk pulling into Kilobytes/i)).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

    // Pulled automatically — Byte Foundry never waits on a click or an autobuyer (see
    // tickDiskPull/isDiskPullEligible in engine.js).
    expect(screen.queryByLabelText(/1 kb disk pulling into Kilobytes/i)).not.toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.owned.tier01).toBe(8)
    expect(saved.intro.disks?.[currentBankSize] ?? 0).toBe(0)

    unmount()
    vi.useRealTimers()
  })

  test('a held disk becomes pull-eligible once some tier\'s level cost reaches it, pulling automatically on the next tick and granting a free unit', () => {
    // Disk held at a size ahead of tier01's current level (still 1) — not yet matching, stays held
    // as "not yet built"-adjacent (too early). Capacity is seeded above INTRO_DISK_UNLOCK_CAPACITY
    // (well above futureBankSize too) so the Storage nav button renders at all. Pulling is
    // unaffected by the forced priority order (Disk Fill ranks highest, so it's never itself
    // blocked) — no neutralization needed.
    vi.useFakeTimers()

    seedIntroState(
      { bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true, disks: { [futureBankSize]: 1 } },
    )
    const { unmount } = render(<App />)
    openStorage()

    expect(screen.getByLabelText(/^full 10 kb disk$/i)).toBeInTheDocument()
    unmount()

    // tier01 now at level 2 — exactly the required level for the held disk's own fixed size (10 KB,
    // disk-ladder step 2).
    seedIntroState(
      { bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true, disks: { [futureBankSize]: 1 } },
      { purchaseLevels: { [tier01.id]: 2 } }
    )
    const { unmount: unmountSecond } = render(<App />)
    openStorage()

    expect(screen.getByLabelText(/10 kb disk pulling into Kilobytes/i)).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

    // Still on the mandatory Byte Foundry gate (mainGameUnlocked stays false — pulling doesn't
    // touch it, unlike convertIntroBitsToKilobytes/tickIntroAutoInvest) — assert against saved
    // state directly.
    expect(screen.queryByLabelText(/pulling into/i)).not.toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    // Completes tier01's whole level 2 (DEFAULT_PURCHASE_BLOCK_SIZE, 8) in one pull, not 1 unit.
    expect(saved.owned.tier01).toBe(8)
    expect(saved.intro.disks[futureBankSize]).toBeUndefined()

    unmountSecond()
    vi.useRealTimers()
  })

  test('Data Lake renders bare (no separate "Data Lakes" card) inside its own pool\'s card, below the disk arrays', () => {
    seedIntroState({
      bits: 0,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      dataLakes: { 1: { depositedUnits: 3, fillBits: 0, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1 } },
    })
    render(<App />)
    openStorage()

    // Embedded per-pool now (see ByteFoundryPage/index.jsx) — no separate global "Data Lakes" panel.
    expect(screen.queryByLabelText(/^Data Lakes$/i)).not.toBeInTheDocument()
    const pool1 = screen.getByRole('region', { name: 'pool 1' })
    const lakeBlock = within(pool1).getByLabelText('KB lake')
    expect(within(lakeBlock).getByText('Lake')).toBeInTheDocument()
    expect(within(lakeBlock).getByRole('button', { name: /buy 1 Cells from the KB Data Lake/i })).toBeInTheDocument()
  })

  test('a completed 9/9/9 pool shows an automatic-conversion label instead of a Booster conversion button', () => {
    seedIntroState({
      bits: 0,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      disksBuiltTotal: { 8000: DISK_ARRAY_LADDER_CAP, 80_000: DISK_ARRAY_LADDER_CAP, 800_000: DISK_ARRAY_LADDER_CAP },
      dataLakes: { 1: { depositedUnits: 0, fillBits: 0, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: DATA_LAKE_CAPACITY_MAX_LEVEL } },
    })
    render(<App />)
    openStorage()

    const lakeBlock = within(screen.getByRole('region', { name: 'pool 1' })).getByLabelText('KB lake')
    expect(within(lakeBlock).queryByRole('button', { name: /cells from the kb data lake/i })).not.toBeInTheDocument()
    expect(within(lakeBlock).getByTitle(/automatically buys the next cells/i)).toHaveTextContent(`${COST_ICON}1 KB`)
  })

  test('an old save\'s legacy boostersUnlocked latch keeps Boosters purchasable but the pool-fill tile still reads Locked while its own Storage pool has never built a disk (Devin Review finding)', () => {
    seedIntroState({
      bits: 0,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      // No disksBuiltTotal entry for pool 1 at all — isDataLakePoolReady is false, but the legacy
      // per-lake flag still makes isDataLakeBoosterUnlocked true (old-save compatibility).
      dataLakes: { 1: { depositedUnits: 5, fillBits: 4321, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1 } },
    })
    render(<App />)
    openStorage()

    const pool1 = screen.getByRole('region', { name: 'pool 1' })
    const lakeBlock = within(pool1).getByLabelText('KB lake')
    // The pool-fill tile must show its Locked state, not fabricate progress from fillBits (which
    // the engine can never actually advance while isDataLakePoolReady is false) — see
    // src/components/DataLakePanel/index.jsx's poolReady/unlocked distinction.
    expect(within(lakeBlock).getByText(/^Locked · 0 \/ 1 KB$/)).toBeInTheDocument()
    // Boosters themselves stay purchasable off the legacy latch — the Buy/Auto controls still show.
    expect(within(lakeBlock).getByRole('button', { name: /buy 1 cells from the kb data lake/i })).toBeInTheDocument()
  })

  test('the same legacy boostersUnlocked latch, when not yet affordable, does NOT offer a "start converting" control that could never actually fund anything (regression — the header control must key off isDataLakePoolReady, not the looser latch)', () => {
    seedIntroState({
      bits: 0,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      // No disksBuiltTotal entry for pool 1 — isDataLakePoolReady is false — and not enough
      // deposited to be immediately affordable either, so canBuy is also false: this is exactly
      // the state that used to render a clickable "start converting" button whose click would
      // arm autoConvertActive with no way for it to ever bank anything.
      dataLakes: { 1: { depositedUnits: 0, fillBits: 0, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1 } },
    })
    render(<App />)
    openStorage()

    const pool1 = screen.getByRole('region', { name: 'pool 1' })
    const lakeBlock = within(pool1).getByLabelText('KB lake')
    expect(within(lakeBlock).queryByRole('button', { name: /start converting toward 1 cells from the kb data lake/i })).not.toBeInTheDocument()
    expect(within(lakeBlock).getByTitle('Build a 1 KB disk in Storage to unlock Cells here')).toBeInTheDocument()
  })

  test('a locked MB lake names Batteries, not Cells, as the entity it unlocks (#988 leftover)', () => {
    seedIntroState({
      bits: 0,
      capacity: POOL_2_VISIBLE_CAPACITY,
      byteCreated: true,
      dataLakes: { 2: { depositedUnits: 0, fillBits: 0, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 1 } },
    })
    render(<App />)
    openStorage()

    const pool2 = screen.getByRole('region', { name: 'pool 2' })
    const lakeBlock = within(pool2).getByLabelText('MB lake')
    expect(within(lakeBlock).getByTitle('Build a 1 MB disk in Storage to unlock Batteries here')).toBeInTheDocument()
    expect(within(lakeBlock).queryByTitle(/unlock Cells here/)).not.toBeInTheDocument()
  })

  test('Data Lake capacity can be increased ×10 by clicking its ⚡ Scale Out button', () => {
    // Fake timers + fireEvent (see the Sacrifice tests above for the same hazard/pattern): a real
    // tick landing between render and the click could otherwise change intro.bits or another
    // forced-priority input out from under the click before it's processed.
    vi.useFakeTimers()

    // The pool's own ×1 array (KB) is fully built — the "upgrade available" condition — regardless
    // of how full the lake currently is; draining whatever it holds (here, nothing) funds the
    // advance, not Bits. bits (8000) is included only to prove it never touches it. Provision
    // are set up the same way the Sacrifice tests above neutralize higher-priority actions, but
    // that no longer matters for Upgrade itself: it's no longer part of the forced priority chain
    // at all, so it would render/enable identically even without this seeding.
    seedIntroState({
      bits: 8000,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
            disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP },
      dataLakes: { 1: { depositedUnits: 0, fillBits: 0, purchased: 1, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 0 } },
    })
    const { unmount } = render(<App />)
    openStorage()

    const increaseButton = screen.getByRole('button', { name: /increase the KB Data Lake's capacity ×10/i })
    expect(increaseButton).toBeEnabled()

    fireEvent.click(increaseButton)

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.dataLakes['1'].capacityLevel).toBe(1)
    expect(saved.intro.dataLakes['1'].depositedUnits).toBe(0)
    expect(saved.intro.bits).toBe(8000)

    unmount()
    vi.useRealTimers()
  })

  test('Buy claims the action slot over Upgrade whenever it is actually affordable, even with the array complete — a manually-filled deposit meant for a Booster is never silently redirected into a forced Scale Out', () => {
    // Upgrade is ALSO available here (the KB pool's ×1 array is fully built), but Buy wins the one
    // shared slot since it's genuinely affordable (1 unit banked, first Booster costs 1) — see
    // DataLakePanel's own ternary and docs/DESIGN_HISTORY.md for the bug this prevents.
    seedIntroState({
      bits: 8000,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP },
      dataLakes: { 1: { depositedUnits: 1, fillBits: 0, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 0 } },
    })
    render(<App />)
    openStorage()

    const buyButton = screen.getByRole('button', { name: /buy 1 cells from the kb data lake/i })
    expect(buyButton).toBeEnabled()
    expect(screen.queryByRole('button', { name: /increase the KB Data Lake's capacity ×10/i })).not.toBeInTheDocument()
  })

  test('Upgrade claims the action slot when its own array is complete but Buy is not yet affordable', () => {
    // No units banked at all — Buy could never be affordable, so Upgrade (array complete) takes
    // the one shared slot, same as before this Buy-first reordering.
    seedIntroState({
      bits: 8000,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      disksBuiltTotal: { [currentBankSize]: DISK_ARRAY_LADDER_CAP },
      dataLakes: { 1: { depositedUnits: 0, fillBits: 0, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: 0 } },
    })
    render(<App />)
    openStorage()

    const upgradeButton = screen.getByRole('button', { name: /increase the KB Data Lake's capacity ×10/i })
    expect(upgradeButton).toBeEnabled()
    expect(screen.queryByRole('button', { name: /buy 1 cells from the kb data lake/i })).not.toBeInTheDocument()
  })

  test('Data Lake capacity-increase button disappears once the lake hits its hard cap', () => {
    seedIntroState({
      bits: 0,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      dataLakes: { 1: { depositedUnits: 1, fillBits: 0, purchased: 0, boostersUnlocked: true, autoConvertActive: false, capacityLevel: DATA_LAKE_CAPACITY_MAX_LEVEL } },
    })
    render(<App />)
    openStorage()

    expect(screen.queryByRole('button', { name: /increase the KB Data Lake's capacity ×10/i })).not.toBeInTheDocument()
  })

  test('a full disk above 1 KB pulls automatically — there is no autobuyer gate or storage-specific pause toggle', () => {
    vi.useFakeTimers()

    seedIntroState(
      { bits: 0, capacity: futureBankSize, byteCreated: true,  disks: { [futureBankSize]: 1 } },
      { purchaseLevels: { [tier01.id]: 2 } }
    )
    const { unmount } = render(<App />)

    // setStorageAutoRedeemEnabled/storageAutoRedeemEnabled never existed here either — pulling is
    // fully automatic and unconditional (see engine.js's tickDiskPull), so there is no
    // storage-specific pause toggle to find, and no autobuyer to gate it on.
    expect(screen.queryByRole('button', { name: /pause storage auto-redeem/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /resume storage auto-redeem/i })).not.toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

    // Pulled without a manual click on the disk itself. Completes tier01's whole level 2
    // (DEFAULT_PURCHASE_BLOCK_SIZE, 8) in one pull, not 1 unit.
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.owned.tier01).toBe(8)
    expect(saved.intro.disks?.[futureBankSize] ?? 0).toBe(0)

    unmount()
    vi.useRealTimers()
  })
})

// Compute moved to its own dedicated screen (ComputePage) once revealed — reached from
// ByteFoundryPage's own "⚡ Boosters" nav button, always enabled once revealed (same posture as the
// Storage nav button above). Every test below that lands on a rendered Compute element navigates
// there first via openBoosters(). Every seed here uses bits: 0, so the forced priority order's
// higher-ranked actions (Disk Fill, Bandwidth, Provision Disk) stay naturally
// unavailable and don't need separate neutralizing — see the dedicated priority test below for
// that interaction.
describe('Byte Foundry Compute Boost', () => {
  const openBoosters = () => fireEvent.click(screen.getByRole('button', { name: /open power/i }))

  test('the "open power" nav button appears once revealed, and the Compute Boost buttons appear once navigated there', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 1 })
    render(<App />)

    const openButton = screen.getByRole('button', { name: /open power/i })
    expect(openButton).toBeEnabled()
    openBoosters()

    expect(screen.getByRole('heading', { level: 1, name: /^⚡ power$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate turbo compute boost/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate balanced compute boost/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate eco compute boost/i })).toBeInTheDocument()
  })

  test('every activation button stays disabled below 1 Compute Cell', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 0 })
    render(<App />)
    openBoosters()

    expect(screen.getByRole('button', { name: /activate turbo compute boost/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /activate balanced compute boost/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /activate eco compute boost/i })).toBeDisabled()
  })

  test('activation buttons stay enabled while a Disk Fill is pending — boosts are not arbitrated against Foundry actions', () => {
    // A built, pull-eligible 1 KB disk must not block a held Cell from funding a boost.
    seedIntroState({ bits: INTRO_STARTING_CAPACITY, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 1, disks: { 8000: 1 } })
    render(<App />)
    openBoosters()

    expect(screen.getByRole('button', { name: /activate turbo compute boost/i })).toBeEnabled()
  })

  // Regression test: an unrecognized computeBoostType (e.g. a corrupted/hand-edited save, or a
  // future preset rename leaving stale data behind) used to crash both pages' render by indexing
  // COMPUTE_BOOST_PRESETS[type].multiplier without checking the preset actually exists first.
  test('an unrecognized computeBoostType does not crash either page — the status line just stays hidden', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 1, computeBoostType: 'does_not_exist', computeBoostStacks: 1 })
    const { unmount } = render(<App />)
    openBoosters()
    expect(screen.queryByLabelText(/^active compute boost$/i)).not.toBeInTheDocument()
    unmount()

    seedMainGameState({ intro: { mainGameUnlocked: true, computeBoostType: 'does_not_exist', computeBoostStacks: 1 } })
    render(<App />)
    expect(screen.queryByLabelText(/^active compute boost$/i)).not.toBeInTheDocument()
  })

  test('the armed-tier status line names the spend and covered tiers without repeating the held count (Cells by default, pre-merge-unlock)', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 4 })
    render(<App />)
    openBoosters()

    expect(screen.getByText('Boosts KB')).toBeInTheDocument()
    expect(screen.queryByText(/held/)).not.toBeInTheDocument()
  })

  test('one tier is always selected: Cells on arrival, and clicking outside never clears it', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true, computeCores: 1, computeNodes: 2 })
    render(<App />)
    openBoosters()

    const cells = screen.getByRole('button', { name: /select cells to fund a compute boost/i })
    expect(cells).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('heading', { level: 1, name: /^⚡ power$/i }))
    expect(cells).toHaveAttribute('aria-pressed', 'true')
    expect(within(screen.getByLabelText(/^cells tier$/i)).getByLabelText(/^compute boost$/i)).toBeInTheDocument()
  })

  test('preset buttons drop zero-valued trailing duration units', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 1 })
    render(<App />)
    openBoosters()

    for (const type of ['turbo', 'balanced', 'eco']) {
      const button = screen.getByRole('button', { name: new RegExp(`activate ${type} compute boost`, 'i') })
      expect(button.textContent).not.toMatch(/ 0[ms]\b/)
    }
  })

  test('only the selected tier shows the presets; selecting another moves them, re-clicking keeps them', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true, computeCores: 1, computeNodes: 2 })
    render(<App />)
    openBoosters()

    // Cells (the default) hosts the presets on arrival; no "pick a tier" prompt.
    expect(within(screen.getByLabelText(/^cells tier$/i)).getByLabelText(/^compute boost$/i)).toBeInTheDocument()
    expect(screen.queryByText(/pick a tier/i)).not.toBeInTheDocument()

    const batteries = screen.getByRole('button', { name: /select batteries to fund a compute boost/i })
    fireEvent.click(batteries)
    expect(within(screen.getByLabelText(/^batteries tier$/i)).getByLabelText(/^compute boost$/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/^compute boost$/i)).toHaveLength(1)

    fireEvent.click(batteries)
    expect(within(screen.getByLabelText(/^batteries tier$/i)).getByLabelText(/^compute boost$/i)).toBeInTheDocument()
  })

  test('no Pop control appears while no boost is active', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 1, computeBoostType: null })
    render(<App />)
    openBoosters()

    expect(screen.queryByRole('button', { name: /pop one stack/i })).not.toBeInTheDocument()
  })


  test('Power keeps its h1 (hidden visually) once a boost timer bar takes the top of the screen', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 3 })
    render(<App />)
    openBoosters()
    expect(screen.getByRole('heading', { level: 1, name: /^⚡ power$/i }).tagName).toBe('H1')

    fireEvent.click(screen.getByRole('button', { name: /activate turbo compute boost/i }))

    const heading = screen.getByRole('heading', { level: 1, name: /^⚡ power$/i })
    expect(heading.closest('header')).toBeNull()
  })

  test('activating a boost spends exactly 1 Compute Cell and shows its own timer bar', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 3 })
    render(<App />)
    openBoosters()

    fireEvent.click(screen.getByRole('button', { name: /activate turbo compute boost/i }))

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeCores).toBe(2)
    expect(saved.intro.computeBoosts.burst.queue).toEqual([1])
    expect(screen.getByLabelText(/^active turbo compute boost$/i)).toHaveTextContent(
      new RegExp(`×${COMPUTE_BOOST_PRESETS.burst.multiplier}`)
    )
  })

  test('a different preset runs in parallel with its own bar; the same preset queues; Pop then Forfeit act per lane', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 5 })
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<App />)
    openBoosters()

    fireEvent.click(screen.getByRole('button', { name: /activate turbo compute boost/i }))
    fireEvent.click(screen.getByRole('button', { name: /activate balanced compute boost/i }))
    expect(screen.getByLabelText(/^active turbo compute boost$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^active balanced compute boost$/i)).toBeInTheDocument()
    expect(confirm).not.toHaveBeenCalled()

    // Same multiplier → queue (the preset button becomes a queue button).
    fireEvent.click(screen.getByRole('button', { name: /^queue turbo compute boost$/i }))
    let saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeBoosts.burst.queue).toEqual([1, 1])
    expect(saved.intro.computeCores).toBe(2)
    expect(screen.getByLabelText(/^active turbo compute boost$/i)).toHaveTextContent(/^2x\s*KB.*×20/)

    // Pop refunds the queued one (no confirm); the Balanced lane is untouched and offers Forfeit.
    fireEvent.click(screen.getByRole('button', { name: /pop one queued turbo compute boost/i }))
    saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeCores).toBe(3)
    expect(saved.intro.computeBoosts.burst.queue).toEqual([1])

    fireEvent.click(screen.getByRole('button', { name: /forfeit the turbo compute boost with no refund/i }))
    expect(confirm).toHaveBeenCalledTimes(1)
    saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeBoosts.burst).toBeUndefined()
    expect(saved.intro.computeBoosts.standard.queue).toEqual([1])
    expect(screen.queryByLabelText(/^active turbo compute boost$/i)).toBeNull()
    confirm.mockRestore()
  })

  test('queued boosts funded by a different tier get their own row; Pop sits on the last row, Stack on the first', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true,
      computeBoosts: { burst: { queue: [3, 3, 1], remainingSeconds: 100 } },
    })
    render(<App />)
    openBoosters()

    expect(screen.getByLabelText(/^active turbo compute boost$/i)).toHaveTextContent(/^2x\s*KB–GB.*×20/)
    expect(screen.getByLabelText(/^queued turbo compute boost KB$/i)).toHaveTextContent(/^1x\s*KB\s.*×20/)
    // One Pop (last row), one Stack (first row) for the lane.
    const activeRow = screen.getByLabelText(/^active turbo compute boost$/i).parentElement
    const queuedRow = screen.getByLabelText(/^queued turbo compute boost KB$/i).parentElement
    expect(within(activeRow).getByRole('button', { name: /^stack the turbo compute boost$/i })).toBeInTheDocument()
    expect(within(activeRow).queryByRole('button', { name: /pop one queued/i })).toBeNull()
    expect(within(queuedRow).getByRole('button', { name: /pop one queued turbo compute boost/i })).toBeInTheDocument()
    expect(within(queuedRow).queryByRole('button', { name: /^stack the/i })).toBeNull()
  })

  test('a lane at COMPUTE_BOOST_MAX_STACKS disables its Stack button', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 3,
      computeBoosts: { burst: { queue: Array(COMPUTE_BOOST_MAX_STACKS).fill(1), remainingSeconds: 5 } },
    })
    render(<App />)
    openBoosters()
    expect(screen.getByRole('button', { name: /^stack the turbo compute boost$/i })).toBeDisabled()
  })

  test('an active boost shows no per-element badge; the timer bar names what is boosted', () => {
    seedIntroState(
      { bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, mainGameUnlocked: true, computeBoosts: { standard: { queue: [1], remainingSeconds: 600 } } },
      { owned: { tier01: 1, tier02: 1 }, purchased: { tier01: 1, tier02: 1 } },
    )
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /^open byte foundry$/i }))
    expect(screen.queryByRole('img', { name: /Boosted/ })).toBeNull()

    openFactorySync()
    expect(screen.queryByRole('img', { name: /Boosted/ })).toBeNull()
    expect(screen.getByLabelText(/^active balanced compute boost$/i)).toHaveTextContent(/^1x\s*KB\s.*×5/)
  })

})

describe('ComputePage merge chain', () => {
  const openBoosters = () => fireEvent.click(screen.getByRole('button', { name: /open power/i }))

  test('the merge chain section is hidden on ComputePage until computeMergePageUnlocked', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: false })
    render(<App />)
    openBoosters()

    expect(screen.queryByLabelText(/^compute entities$/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /charge up 8 batteries into 1 pack/i })).not.toBeInTheDocument()
  })

  test('the merge chain section shows once unlocked; AppNav returns to Byte Foundry', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeCores: 2, computeNodes: 9, computeClusters: 3, computeNetworks: 0, computeGrids: 0,
    })
    render(<App />)
    openBoosters()

    expect(screen.getByRole('heading', { level: 1, name: /^⚡ power$/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/^compute entities$/i)).toHaveTextContent(/cells.*2\/10/i)
    expect(screen.getByLabelText(/^compute entities$/i)).toHaveTextContent(/batteries.*9\/10/i)
    expect(screen.getByLabelText(/^compute entities$/i)).toHaveTextContent(/packs.*3\/10/i)

    fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
    expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  })

  test('a merge button stays disabled below a full group of 8 of the input entity', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: 7, computeClusters: 0,
    })
    render(<App />)
    openBoosters()

    // Idle tiers collapse to one line; selecting the tier reveals its merge row.
    fireEvent.click(screen.getByRole('button', { name: /select batteries to fund a compute boost/i }))
    expect(screen.getByRole('button', { name: /charge up 8 batteries into 1 pack/i })).toBeDisabled()
  })

  describe('tier detail row is progressively disclosed', () => {
    const base = { bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true }
    const nodesMerge = () => screen.queryByRole('button', { name: /charge up 8 batteries into 1 pack/i })
    // Before its Charger unlocks, a tier shows its charge progress (#1141 follow-up: first 10 charges build it).
    const nodesAuto = () => screen.queryByRole('img', { name: /^batteries charger unlock/i })

    test('a non-automated unlocked tier always shows its merge/auto buttons (spacious layout)', () => {
      seedIntroState({ ...base, computeCores: 1, computeNodes: 2 })
      render(<App />)
      openBoosters()

      expect(nodesMerge()).toBeInTheDocument()
      expect(nodesAuto()).toBeInTheDocument()
    })

    test('locked tiers (nothing held at or above, predecessor cannot feed) are not rendered', () => {
      seedIntroState({ ...base, computeCores: 1, computeNodes: 0 })
      render(<App />)
      openBoosters()

      expect(screen.queryByRole('button', { name: /select generators to fund a compute boost/i })).not.toBeInTheDocument()
    })

    test('a tier with a possible merge is revealed without selecting it', () => {
      seedIntroState({ ...base, computeNodes: 8, computeClusters: 0 })
      render(<App />)
      openBoosters()

      expect(nodesMerge()).toBeEnabled()
    })

    test('Auto-charge unlock progress (cost tier held > 0) reveals the row', () => {
      seedIntroState({ ...base, computeNodes: 2, computeClusters: 3, chargerUnlockProgress: { autoMergeNodesIntoCluster: 4 } })
      render(<App />)
      openBoosters()
      expect(nodesAuto()).toHaveTextContent('🔓 4/10')
    })

    test('an in-flight reserve merge reveals the row', () => {
      seedIntroState({ ...base, computeNodes: 2, autoMergeNodesIntoCluster: true, computeNodesMergeRemainingSeconds: 30 })
      render(<App />)
      openBoosters()

      expect(screen.getByRole('img', { name: /batteries charger, auto-charge in progress/i })).toBeInTheDocument()
    })

    test('the selected tier is marked via aria-pressed and a single tier is armed at a time', () => {
      seedIntroState({ ...base, computeCores: 1, computeNodes: 2 })
      render(<App />)
      openBoosters()

      const batteries = screen.getByRole('button', { name: /select batteries to fund a compute boost/i })
      fireEvent.click(batteries)
      expect(batteries).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: /select cells to fund a compute boost/i })).toHaveAttribute('aria-pressed', 'false')
    })
  })

  test('before its Charger unlocks, a charge spends 8 of the input into the Charger, not the output', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: 9, computeClusters: 1,
    })
    render(<App />)
    openBoosters()
    const pill = screen.getByRole('button', { name: /charge up 8 batteries into 1 pack/i })
    expect(pill).toHaveTextContent('🔌')
    fireEvent.click(pill)
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeNodes).toBe(1)
    expect(saved.intro.computeClusters).toBe(1)
    expect(saved.intro.chargerUnlockProgress.autoMergeNodesIntoCluster).toBe(1)
    expect(screen.getByRole('img', { name: /^batteries charger unlock, 1\/10 charges$/i })).toBeInTheDocument()
  })

  test('the 10th charge unlocks the Charger automatically, with nothing sacrificed', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: 9, computeClusters: 3, chargerUnlockProgress: { autoMergeNodesIntoCluster: 9 },
    })
    render(<App />)
    openBoosters()
    fireEvent.click(screen.getByRole('button', { name: /charge up 8 batteries into 1 pack/i }))
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.autoMergeNodesIntoCluster).toBe(true)
    expect(saved.intro.computeClusters).toBe(3)
    expect(screen.getByRole('img', { name: /^batteries charger, 0\/8 filled$/i })).toBeInTheDocument()
  })

  test('Cells merges into Batteries exactly like every other boundary (issue #321)', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeCores: 9, computeNodes: 1,
    })
    render(<App />)
    openBoosters()

    const mergeButton = screen.getByRole('button', { name: /charge up 8 cells into 1 battery/i })
    expect(mergeButton).toBeEnabled()
    fireEvent.click(mergeButton)

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeCores).toBe(1)
    expect(saved.intro.chargerUnlockProgress.autoMergeCoresIntoNode).toBe(1)
  })

  test('unlocking the Charger for Cells into Batteries sacrifices 10 Batteries and removes the manual merge button', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: COMPUTE_ENTITY_CAP,
    })
    render(<App />)
    openBoosters()

    fireEvent.click(screen.getByRole('button', { name: /unlock the charger for cells into batteries/i }))

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeNodes).toBe(0)
    expect(saved.intro.autoMergeCoresIntoNode).toBe(true)
    expect(screen.queryByRole('button', { name: /^charge up 8 cells into 1 battery$/i })).not.toBeInTheDocument()
  })

  test('once auto-charge is unlocked, pressing Charge starts a charge (units move down over time; nothing merges yet)', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeCores: 8, autoMergeCoresIntoNode: true,
    })
    render(<App />)
    openBoosters()

    fireEvent.click(screen.getByRole('button', { name: /^charge cells: move units down/i }))

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeChargeSeconds?.[0]).toBeGreaterThanOrEqual(0)
    expect(saved.intro.computeCores).toBe(8)
    expect(saved.intro.computeNodes ?? 0).toBe(0)
    expect(screen.getByRole('button', { name: /^charge cells: move units down/i })).toBeDisabled()
  })

  test('a merge button stays disabled once the output entity is already at COMPUTE_ENTITY_CAP', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeClusters: 24, computeNetworks: 10,
      // Charger progress already complete (legacy flag unset), so a charge would need output room.
      chargerUnlockProgress: { autoMergeClustersIntoNetwork: COMPUTE_ENTITY_CAP },
    })
    render(<App />)
    openBoosters()

    expect(screen.getByRole('button', { name: /charge up 8 packs into 1 bank/i })).toBeDisabled()
  })

  test('the full ten-tier progression renders, Cells through Fusions, once unlocked', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeCores: 1, computeNodes: 2, computeClusters: 3, computeNetworks: 4, computeGrids: 5,
      computeFabrics: 6, computeClouds: 7, computeDatacenters: 8, computeSupercomputers: 9, computeMegacomputers: 1,
    })
    render(<App />)
    openBoosters()

    const counters = screen.getByLabelText(/^compute entities$/i)
    expect(counters).toHaveTextContent(/cells.*1\/10/i)
    expect(counters).toHaveTextContent(/batteries.*2\/10/i)
    expect(counters).toHaveTextContent(/packs.*3\/10/i)
    expect(counters).toHaveTextContent(/banks.*4\/10/i)
    expect(counters).toHaveTextContent(/generators.*5\/10/i)
    expect(counters).toHaveTextContent(/turbines.*6\/10/i)
    expect(counters).toHaveTextContent(/plants.*7\/10/i)
    expect(counters).toHaveTextContent(/grids.*8\/10/i)
    expect(counters).toHaveTextContent(/reactors.*9\/10/i)
    expect(counters).toHaveTextContent(/fusions.*1\/10/i)

    expect(screen.getByRole('button', { name: /charge up 8 batteries into 1 pack/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /charge up 8 packs into 1 bank/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /charge up 8 banks into 1 generator/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /charge up 8 generators into 1 turbine/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /charge up 8 turbines into 1 plant/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /charge up 8 plants into 1 grid/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /charge up 8 grids into 1 reactor/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /charge up 8 reactors into 1 fusion/i })).toBeInTheDocument()
  })

  test('merging at the top of the chain (Reactors into a Fusion) spends 8 for 1, same as every other tier', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeSupercomputers: 9, computeMegacomputers: 1,
    })
    render(<App />)
    openBoosters()

    fireEvent.click(screen.getByRole('button', { name: /charge up 8 reactors into 1 fusion/i }))

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeSupercomputers).toBe(1)
    expect(saved.intro.chargerUnlockProgress.autoMergeSupercomputersIntoMegacomputer).toBe(1)
  })

  test('no entity name in the merge chain UI carries a redundant "Compute" prefix', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: 9, computeClusters: 1,
    })
    render(<App />)
    openBoosters()

    expect(screen.getByLabelText(/^compute entities$/i)).not.toHaveTextContent(/compute cell|compute battery|compute pack/i)
    expect(screen.queryByRole('button', { name: /charge up 8 compute /i })).not.toBeInTheDocument()
  })
})

describe('Compute auto-charge automation', () => {
  const openBoosters = () => fireEvent.click(screen.getByRole('button', { name: /open power/i }))

  test('Charger unlock progress is always shown for Batteries into Packs; the old sacrifice button only for a legacy save holding 10 Packs', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeClusters: 9,
    })
    render(<App />)
    openBoosters()

    expect(screen.getByRole('img', { name: /^batteries charger unlock, 0\/10 charges$/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /unlock the charger for batteries into packs/i })).toBeNull()
  })

  test('enabling auto-charge sacrifices exactly 10 held Packs and replaces the button with an Auto badge', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeClusters: 10,
    })
    render(<App />)
    openBoosters()

    fireEvent.click(screen.getByRole('button', { name: /unlock the charger for batteries into packs/i }))

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeClusters).toBe(0)
    expect(saved.intro.autoMergeNodesIntoCluster).toBe(true)
    expect(screen.queryByRole('button', { name: /unlock the charger for batteries into packs/i })).not.toBeInTheDocument()
  })

  test('enabling auto-charge preserves any Packs held above 10 — regression: this used to zero the whole field, destroying reserve progress the Packs into Bank boundary was already gradually accumulating', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeClusters: 15, autoMergeClustersIntoNetwork: true,
    })
    render(<App />)
    openBoosters()

    fireEvent.click(screen.getByRole('button', { name: /unlock the charger for batteries into packs/i }))

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeClusters).toBe(5) // NOT 0 — the reserve's own 5 units survive
    expect(saved.intro.autoMergeNodesIntoCluster).toBe(true)
  })

  test('once auto-charge is unlocked for a tier, a real tick auto-starts a reserve merge once the input is completely full (the merge itself only completes once its own timed duration elapses — see engine.test.js)', () => {
    vi.useFakeTimers()
    seedIntroState({
      bits: 0, capacity: POOL_2_VISIBLE_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: COMPUTE_ENTITY_AUTO_MERGE_CAP, autoMergeNodesIntoCluster: true,
    })
    const { unmount } = render(<App />)
    act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeClusters).toBe(0)
    expect(saved.intro.computeNodes).toBe(COMPUTE_ENTITY_AUTO_MERGE_CAP - COMPUTE_MERGE_RATIO - 1) // one more token spent on the automatic Boost
    expect(saved.intro.computeNodesMergeRemainingSeconds).toBeGreaterThan(0)

    unmount()
    vi.useRealTimers()
  })

  test('on a selected automated tier, the Charger row renders above the Boost presets', () => {
    seedIntroState({
      bits: 0, capacity: POOL_2_VISIBLE_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeCores: 6, autoMergeCoresIntoNode: true,
    })
    render(<App />)
    openBoosters()

    // Cells is the highest automated tier, so it is pre-selected on arrival.
    const autoRow = screen.getByRole('img', { name: /^cells charger/i })
    const presets = within(screen.getByLabelText(/^cells tier$/i)).getByLabelText(/^compute boost$/i)
    expect(autoRow.compareDocumentPosition(presets) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  test('once auto-charge is enabled for a tier, the instant Merge button is replaced by an explicit Charge button', () => {
    seedIntroState({
      bits: 0, capacity: POOL_2_VISIBLE_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: 8, autoMergeNodesIntoCluster: true,
    })
    render(<App />)
    openBoosters()

    expect(screen.queryByRole('button', { name: /^charge up 8 batteries into 1 pack/i })).not.toBeInTheDocument()
    const charge = screen.getByRole('button', { name: /^charge batteries: move units down/i })
    expect(charge).toBeEnabled()
    expect(charge).toHaveTextContent('⚡ Charge')
  })

  test('while a Charge runs, the Charge button shows ⏳ n/8 progress instead of ⚡ Charge', () => {
    seedIntroState({
      bits: 0, capacity: POOL_2_VISIBLE_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: 13, autoMergeNodesIntoCluster: true, computeChargeSeconds: { 1: 0.5 },
    })
    render(<App />)
    openBoosters()

    expect(screen.getByRole('button', { name: /^charge batteries: move units down/i })).toHaveTextContent(/⏳ \d\/8/)
  })

  test('the Charger row carries no label or merge cue (the Charge button sits to its left)', () => {
    seedIntroState({
      bits: 0, capacity: POOL_2_VISIBLE_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: 7, autoMergeNodesIntoCluster: true,
    })
    render(<App />)
    openBoosters()

    const row = screen.getByRole('img', { name: /^batteries charger/i })
    expect(row).not.toHaveTextContent(/auto-charge/i) // no label on the slot row
    expect(row).not.toHaveTextContent('⬆')
  })

  test('before the Charger unlocks, its badge shows charge progress (the first 10 charges build it)', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: 6, chargerUnlockProgress: { autoMergeCoresIntoNode: 6 },
    })
    render(<App />)
    openBoosters()
    expect(screen.getByRole('img', { name: /^cells charger unlock, 6\/10 charges$/i })).toHaveTextContent('🔓 6/10')
  })

  test('the reserve-slot row shows a partial, gradually-filled count once auto-charge is unlocked, not just empty-or-full', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeMergePageUnlocked: true,
      computeNodes: COMPUTE_ENTITY_CAP + 3, autoMergeNodesIntoCluster: true,
    })
    render(<App />)
    openBoosters()

    expect(screen.getByRole('img', { name: /batteries charger, 3\/8 filled/i })).toBeInTheDocument()
  })

})

// --- The Byte Foundry gate is a permanent, one-time-ever unlock ---
// intro.mainGameUnlocked latches permanently true the first time Storage's own capacity threshold
// is crossed (see engine.js's latchMainGameUnlocked) — a real Prestige no longer sends the player
// back through the intro; App.jsx's own routing derives off mainGameUnlocked, which simply stays
// true from then on. The Byte generator itself (capacity/byteCreated/tickSpeedSeconds/
// productionMultiplier) is likewise PERMANENT — the Data Stream balance (bits) is
// kept too. Scale Up/Overclock remain unaffected (covered at the
// engine.test.js level, not here).

test('a real Prestige from MainPage keeps Data Stream balance and keeps Factory reachable — mainGameUnlocked no longer resets', () => {
  // purge.count: 1 skips the mandatory first-time full-screen prompt (see the test above) in
  // favor of the ordinary top banner, so MainPage's own heading is actually on-screen to assert on.
  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
    intro: { mainGameUnlocked: true, bits: 500, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true },
  })
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i })).toBeInTheDocument()
  // A synchronous click, then an immediate read: a real timer tick can't fire in between. (An
  // awaited userEvent click yields to the event loop, and under CPU load a live tick credits the
  // Data Stream bits before the `bits === 0` assertion below — the old, intermittent failure.)
  fireEvent.click(screen.getByRole('button', { name: /purge \(requires/i }))

  // mainGameUnlocked is now PERMANENT (see latchMainGameUnlocked in engine.js) — a real Prestige
  // never re-gates it, so Factory stays on screen with no navigation to the Byte Foundry.
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { level: 1, name: /byte foundry/i })).not.toBeInTheDocument()

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  // Data Stream balance survives Prestige; the gate itself stays permanently unlocked.
  expect(saved.intro.mainGameUnlocked).toBe(true)
  expect(saved.intro.bits).toBeGreaterThanOrEqual(500)
  // The generator and its upgrades are permanent — carried over from before the Prestige.
  expect(saved.intro.capacity).toBe(INTRO_CAPACITY_CAP_BITS)
  expect(saved.intro.byteCreated).toBe(true)
})

test('completing the Byte Foundry again after a Prestige navigates forward into MainPage with newly re-granted Kilobytes', () => {
  vi.useFakeTimers()

  // Simulates "just purged, now replaying the intro" — purge.count already at 1, resources/
  // owned already at their fresh post-Prestige defaults, intro reset and one tick away from its
  // own auto-invest threshold again.
  seedIntroState(
    {
      bits: FRESH_CYCLE_BLOCK_BITS - 1, capacity: FRESH_CYCLE_BLOCK_BITS, byteCreated: true,
    },
    { purge: { xp: 0, points: 1, count: 1, highestMilestone: 100 } }
  )
  const { unmount } = render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()

  // A few ticks, not just one: the Data Stream Buffer starts one bit shy of full, and the
  // fill-based Speed multiplier (see FILL_MULTIPLIER_* in game/layers) tapers production down
  // toward FILL_MULTIPLIER_MIN_PERCENT (10%) as it approaches capacity, so closing that last bit
  // now takes a couple of ticks rather than exactly one.
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS * 5) })

  expect(screen.queryByRole('heading', { level: 1, name: /byte foundry/i })).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8\b/i)

  unmount()
  vi.useRealTimers()
})

test('a Prestige firing while on the Manual page does not disrupt the page — mainGameUnlocked stays permanently true', async () => {
  vi.useFakeTimers()

  // autoPurgeAttemptBudget seeded at 1 (the fire threshold) so the very next tick's elapsed
  // time pushes it over, firing Auto-Prestige immediately without needing to simulate 1000s of
  // gameplay — same "budget already at threshold" trick as the existing auto-invest test above.
  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
    autoPurge: 1,
    autoPurgeAttemptBudget: 1,
  })
  const { unmount } = render(<App />)

  fireEvent.click(screen.getByRole('button', { name: /open more menu/i }))
  fireEvent.click(screen.getByRole('button', { name: /open manual/i }))
  // Fake timers: findBy* can't poll, so flush the lazy Manual chunk inside act instead.
  await act(async () => { await import('pages/InfoPage') })
  expect(screen.getByRole('heading', { level: 1, name: /tens — manual/i })).toBeInTheDocument()

  // Auto-Prestige fires in the background — the Manual page stays exactly where it was regardless
  // (App.jsx's routing has no sync effect at all), and mainGameUnlocked (now permanent — see
  // latchMainGameUnlocked in engine.js) is untouched by the Prestige, so there's no gate to defer.
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  expect(screen.getByRole('heading', { level: 1, name: /tens — manual/i })).toBeInTheDocument()

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.intro.mainGameUnlocked).toBe(true)

  // Leaving Manual via AppNav's Foundry item reaches the Byte Foundry as a voluntary screen, not a
  // gate — Factory stays reachable directly too (see the dedicated always-interactive test below).
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

// --- The Byte Foundry persists as a voluntarily-revisitable, always-interactive screen ---
// Once intro.mainGameUnlocked is true, the Byte Foundry no longer disappears — AppNav's Foundry
// item reopens it at any time. Unlike the old completed-gated design, nothing here ever goes
// read-only: Tap/Speed stay live indefinitely. Convert stays visible only while still gated or
// before Storage unlocks — this fixture starts with Buffer at the pool end so Storage is revealed and
// the transfer row hides once unlocked. Before mainGameUnlocked, it's still the same mandatory
// gate as always — AppNav omits Factory, so there's no way onto MainPage.

test('AppNav\'s Foundry item navigates to the always-interactive screen; Factory returns to MainPage', async () => {
  // Only setInterval is faked: the live tick loop never fires, while setTimeout stays real so
  // userEvent / Testing Library's async wrappers still resolve.
  vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] })
  const user = userEvent.setup()

  seedMainGameState({
    intro: {
      mainGameUnlocked: true, bits: 0, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true,
    },
    purchaseLevelProgress: { tier01: 3 },
  })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /open byte foundry/i }))

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  // No vi.useFakeTimers() here (this test drives navigation via async userEvent.click) — the real
  // tick can land between render and this assertion, so the exact starting balance isn't a stable
  // invariant to assert on; aria-valuemax is.
  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuemax', String(INTRO_CAPACITY_CAP_BITS))
  // Tap + Upgrade Data Stream stay fully interactive — Sacrifice is gone; nothing here ever
  // goes read-only.
  expect(screen.getByRole('button', { name: /ping to generate a bit/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /sacrifice all bits for 2x capacity/i })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /upgrade data stream capacity/i })).toHaveTextContent('Upgrade Capacity')
  expect(screen.getByRole('button', { name: /provision disk/i })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open byte factory/i }))
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i })).toBeInTheDocument()
})

test('the mandatory Byte Foundry gate (before mainGameUnlocked) blocks Factory but keeps Manual and More reachable', () => {
  render(<App />) // fresh, empty localStorage — lands on the mandatory gate, per the ByteFoundryPage tests above

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /open byte factory/i })).not.toBeInTheDocument()
  // Utilities must not require progress — More (Manual / Milestones / Settings) stays available.
  expect(screen.getByRole('button', { name: /open more menu/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /back to game/i })).not.toBeInTheDocument()
})

test('a Prestige firing while voluntarily viewing the Byte Foundry leaves Factory reachable — no gate re-triggers', () => {
  vi.useFakeTimers()

  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
    autoPurge: 1,
    autoPurgeAttemptBudget: 1,
    intro: {
      mainGameUnlocked: true, bits: 0, capacity: 8000, byteCreated: true,
    },
  })
  const { unmount } = render(<App />)

  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  // Reached voluntarily — Tap was already live before the Prestige, same as after (see test above).
  expect(screen.getByRole('button', { name: /ping to generate a bit/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /open byte factory/i })).toBeInTheDocument()

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // Still on the same screen — no navigation jump — and mainGameUnlocked (now permanent — see
  // latchMainGameUnlocked in engine.js) is untouched: Factory stays reachable, nothing hidden.
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /ping to generate a bit/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /open byte factory/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /open more menu/i })).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.intro.mainGameUnlocked).toBe(true)

  unmount()
  vi.useRealTimers()
})

// --- Chapters (Milestones page) ---
// Chapter rows read intro.mainGameUnlocked, purge.count, computeFlops.pageUnlocked,
// isOverflowModeUnlocked, and era.count — see CLAUDE.md / MAINPAGE_REFERENCE. "The first Kilobyte"
// is always ✅ once this view is reachable; Go Googol varies with purge.count; separate tests cover
// Open Compute / Go DeGoogol / Ascend an Era and the Compute autobuyer category.
test.each([
  { purgeCount: 0, reached: false },
  { purgeCount: 1, reached: true },
  { purgeCount: 5, reached: true },
])('the "Go Googol" chapter reads $reached when purge.count is $purgeCount', async ({ purgeCount, reached }) => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 0, count: purgeCount, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open milestones/i }))

  expect(await screen.findByLabelText(/^milestones category$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^the first kilobyte milestone reached$/i)).toHaveTextContent('The first Kilobyte')
  expect(screen.getByLabelText(reached ? /^go googol milestone reached$/i : /^go googol milestone not yet reached$/i)).toBeInTheDocument()
  // No version numbers on the timeline (#1143).
  expect(screen.getByLabelText(/^milestones category$/i)).not.toHaveTextContent(/v\d\.0/)
})

test('Chapters track Compute, DeGoogol, and Era milestones', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 0, count: 100, highestMilestone: 1, unboundedUnlocked: true },
    computeFlops: { pageUnlocked: true, owned: {}, cumulativeBoost: {} },
    era: { count: 2 },
  })
  render(<App />)
  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open milestones/i }))

  expect(screen.getByLabelText(/^open compute milestone reached$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^degoogoled milestone reached$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^first reboot milestone reached$/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/^coming soon/i)).not.toBeInTheDocument()
})

test('Compute (Flops) buy buttons show their PP cost as text, not "[object Object]"', async () => {
  seedMainGameState({
    computeFlops: { pageUnlocked: true, owned: {}, cumulativeBoost: {} },
    purge: { xp: 0, points: 5000, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await userEvent.setup().click(screen.getByRole('button', { name: /^open compute$/i }))

  const buy = screen.getByRole('button', { name: /^buy Cores \(KFlops\) for/i })
  expect(buy).toHaveTextContent(/^[\d,.e+]+ PP$/)
  expect(buy).not.toHaveTextContent(/object/i)
})

test('Compute autobuyer milestones list Era unlocks once Compute is revealed', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
    computeFlops: { pageUnlocked: true, owned: {}, cumulativeBoost: {} },
    era: { count: 1 },
    computeFlopsAutobuyers: { flop01: 1, flop02: null, flop03: null, flop04: null, flop05: null, flop06: null, flop07: null, flop08: null, flop09: null, flop10: null },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText(/^compute autobuyers category$/i)).toBeInTheDocument()
  expect(within(screen.getByLabelText(/^Cores · KFlops autobuyer$/i)).getByLabelText("Cores (KFlops) autobuyer active")).toBeInTheDocument()
  expect(screen.getByLabelText(/^Chips · MFlops autobuyer$/i)).toHaveTextContent('🔒 R2')
})

test('Settings Reboot confirms, resets Foundry assets, and keeps automation', async () => {
  // Only setInterval is faked: the live tick loop never fires, while setTimeout stays real so
  // userEvent / Testing Library's async wrappers still resolve.
  vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] })
  const user = userEvent.setup()
  const tier0 = TIER_DEFINITIONS[0].id
  const diskSize = INTRO_BITS_PER_KILOBYTE_CONVERSION

  seedMainGameState({
    purge: { xp: 0, points: ERA_ELIGIBILITY_PP, count: 5, highestMilestone: 1 },
    intro: {
      mainGameUnlocked: true,
      byteCreated: true,
      capacity: INTRO_STARTING_CAPACITY * 100,
      disks: { [diskSize]: 2 },
    },
    autobuyers: { [tier0]: 1 },
  })
  render(<App />)
  await openSettings(user)

  expect(await screen.findByLabelText(/^reboot section$/i)).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /reboot — open confirmation/i }))
  await user.click(screen.getByRole('button', { name: /^reboot$/i }))

  expect(screen.getByLabelText(/^reboot section$/i)).toHaveTextContent('1 Kernel')
  expect(screen.getByLabelText(/^reboot section$/i)).toHaveTextContent('Reboots')

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.autobuyers[tier0]).toBe(1)
  expect(saved.intro.capacity).toBe(INTRO_BYTE_COMBINE_COST)
  expect(saved.intro.disks).toEqual({})
  expect(saved.era.count).toBe(1)

  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open milestones/i }))
  expect(screen.getByLabelText(/^first reboot milestone reached$/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open byte foundry/i }))
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
})

test('full Reset clears Era and Eons meta progress', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  seedMainGameState({
    intro: { mainGameUnlocked: true },
    era: { count: 3 },
    eons: { balance: 12 },
    hyperscalerCount: 2,
  })
  render(<App />)
  await openSettings(user)
  await user.click(await screen.findByRole('button', { name: /reset game/i }))

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.era.count).toBe(0)
  expect(saved.eons.balance).toBe(0)
  expect(saved.hyperscalerCount).toBe(0)
})

test('Reformat Byte Foundry preserves Era and Eons', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  seedMainGameState({
    intro: {
      mainGameUnlocked: true,
      byteCreated: true,
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      disks: { 8000: 1 },
    },
    era: { count: 2 },
    eons: { balance: 5 },
    hyperscalerCount: 1,
  })
  render(<App />)
  await openSettings(user)
  await user.click(screen.getByRole('button', { name: /reformat byte foundry/i }))

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.era.count).toBe(2)
  expect(saved.eons.balance).toBe(5)
  expect(saved.hyperscalerCount).toBe(1)
  expect(saved.intro.disks).toEqual({})
})

test('Reboot survives a page reload', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    purge: { xp: 0, points: ERA_ELIGIBILITY_PP, count: 1, highestMilestone: 1 },
    intro: { mainGameUnlocked: true, byteCreated: true },
  })
  const { unmount } = render(<App />)
  await openSettings(user)
  await user.click(screen.getByRole('button', { name: /reboot — open confirmation/i }))
  await user.click(screen.getByRole('button', { name: /^reboot$/i }))
  unmount()

  render(<App />)
  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open settings/i }))
  // Settings is a React.lazy chunk: its first import in a test file can exceed the 1 s default
  // under CI load (the cause of intermittent 'Unable to find role="heading"' failures).
  await screen.findByRole('heading', { level: 1, name: /^settings$/i }, { timeout: 10000 })
  expandSettingsSections()
  expect(screen.getByLabelText(/^reboot section$/i)).toHaveTextContent('1 Kernel')
})

describe('Compute (Flops) screen', () => {
  test('nav stays hidden below 100 PP', () => {
    seedMainGameState({ purge: { xp: 0, points: 99, count: 1, highestMilestone: 1 } })
    render(<App />)
    expect(screen.queryByRole('button', { name: /open compute/i })).not.toBeInTheDocument()
  })

  test('at 100 PP the screen opens with buy disabled below 1,000 PP', () => {
    seedMainGameState({ purge: { xp: 0, points: 100, count: 1, highestMilestone: 1 } })
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /open compute/i }))
    expect(screen.getByRole('heading', { level: 1, name: /compute/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/cumulative flops boost/i)).toHaveTextContent(/0 Flops/i)
    expect(screen.getByRole('button', { name: /buy cores \(kflops\) for 1,000 purge points/i })).toBeDisabled()
  })

  test('buying KFlops at 1,000 PP spends PP and increments owned', () => {
    seedMainGameState({ purge: { xp: 0, points: 1000, count: 1, highestMilestone: 1 } })
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /open compute/i }))
    fireEvent.click(screen.getByRole('button', { name: /buy cores \(kflops\) for 1,000 purge points/i }))
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.purge.points).toBe(0)
    expect(saved.computeFlops.owned.flop01).toBe(1)
  })
})

const openDevMode = async user => {
  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open dev mode/i }))
}

// Dev Mode tests drive many sequential userEvent clicks and sit near Vitest's 5s default under load.
describe('Dev Mode', { timeout: 20000 }, () => {
  // Freeze only the live tick loop (setTimeout stays real for userEvent): several tests below assert
  // exact seeded values (e.g. resources.base) that a real tick on a slow runner would drift (#764).
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] })
  })

  it('is reachable from the More menu (dev build only)', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    expect(await screen.findByRole('heading', { level: 1, name: /^dev mode$/i })).toBeInTheDocument()
    expect(isDevModeActive()).toBe(false)
  })

  it('offers dummy checkout only while active and leaves the real Supporter pack locked', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))
    await openSettings(user)

    expect(screen.queryByRole('button', { name: /redeem supporter unlock code/i })).not.toBeInTheDocument()
    const setItem = Storage.prototype.setItem
    const storage = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (key, value) {
      if (key === 'tens_dev_supporter_unlocked') throw new Error('Storage is full')
      return setItem.call(this, key, value)
    })
    await user.click(screen.getByRole('button', { name: /dummy supporter checkout/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/couldn’t save the test unlock/i)
    storage.mockRestore()

    await user.click(screen.getByRole('button', { name: /dummy supporter checkout/i }))
    expect(screen.getByText('Unlocked for the Dev Mode save.')).toBeInTheDocument()
    expect(screen.queryByText(/couldn’t save the test unlock/i)).not.toBeInTheDocument()

    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))
    await openSettings(user)
    expect(screen.queryByLabelText(/test supporter section/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /redeem supporter unlock code/i })).toBeInTheDocument()
  })

  it('enabling switches to an isolated save and disabling resumes the real one untouched', async () => {
    const user = userEvent.setup()
    seedMainGameState({ resources: { base: 4242 } })
    render(<App />)
    await openDevMode(user)

    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))
    expect(isDevModeActive()).toBe(true)
    // 'dev' is gate-exempt, so toggling stays on the Dev Mode page rather than bouncing to the
    // Foundry gate — but the dev save it's now reading/writing starts out fresh and separate.
    expect(screen.getByRole('heading', { level: 1, name: /^dev mode$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^dev mode$/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))
    expect(isDevModeActive()).toBe(false)
    // Real save's own money is untouched by whatever happened on the dev save.
    expect(JSON.parse(localStorage.getItem('tens_game_state')).resources.base).toBe(4242)
  })

  it('the Variables tree is read straight off game.state and stays editable via setDevState', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))

    // Not a hardcoded field list — expand the auto-generated "resources" group (one leaf per
    // resource id in play, straight off createInitialGameState()'s own resources shape) to reach
    // the input.
    await user.click(screen.getByRole('tab', { name: /show factory variables/i }))
    await user.click(screen.getByText(/^resources \(\d+\)$/))
    const bitsInput = screen.getByLabelText('resources.base')
    await user.clear(bitsInput)
    await user.type(bitsInput, '777')
    await user.click(screen.getByRole('button', { name: /^set resources\.base$/i }))

    expect(screen.getByText(/777 b\b/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('tens_dev_state')).resources.base).toBe(777)
  })

  it('setDevState clamps a Data Lake capacityLevel set past the ladder\'s own bounds via the Variables tree, same as a real save load would', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))

    await user.click(screen.getByText(/^intro \(\d+\)$/))
    await user.click(screen.getByText(/^dataLakes \(\d+\)$/))
    await user.click(screen.getByText(/^1 \(\d+\)$/))
    const levelInput = screen.getByLabelText('intro.dataLakes.1.capacityLevel')
    await user.clear(levelInput)
    await user.type(levelInput, '10') // valid under the old 11-level ladder, out of range on the current 4-level one
    await user.click(screen.getByRole('button', { name: /^set intro\.dataLakes\.1\.capacityLevel$/i }))

    // setDevState (the Variables tree's own write path) bypasses the engine's action reducers
    // entirely, so without routing it through normalizePoolMemoryCapacity this would silently
    // leave capacityLevel at 10 — past DATA_LAKE_CAPACITY_BY_LEVEL's own bounds — breaking every
    // downstream getDataLakeCapacity read for the rest of the Dev Mode session.
    expect(JSON.parse(localStorage.getItem('tens_dev_state')).intro.dataLakes['1'].capacityLevel).toBe(3)
  })

  it('boolean leaves in the Variables tree toggle on click', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))

    await user.click(screen.getByText(/^intro \(\d+\)$/))
    const toggle = screen.getByRole('button', { name: /^intro\.mainGameUnlocked$/ })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    expect(JSON.parse(localStorage.getItem('tens_dev_state')).intro.mainGameUnlocked).toBe(true)
  })

  it('number fields accept scientific / grouped input, step by powers of ten, and reject non-numbers', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))

    // Search reaches any leaf across every area by its path or tier display name.
    await user.type(screen.getByRole('searchbox', { name: /search variables/i }), 'purge.points')
    const input = screen.getByLabelText('purge.points')
    await user.clear(input)
    await user.type(input, '1,000{Enter}')
    expect(JSON.parse(localStorage.getItem('tens_dev_state')).purge.points).toBe(1000)

    await user.click(screen.getByRole('button', { name: 'purge.points ×10' }))
    expect(JSON.parse(localStorage.getItem('tens_dev_state')).purge.points).toBe(10000)
    await user.click(screen.getByRole('button', { name: 'purge.points +1' }))
    expect(JSON.parse(localStorage.getItem('tens_dev_state')).purge.points).toBe(10001)

    // A stepper drops any uncommitted draft so a later Enter can't undo the step.
    await user.clear(input)
    await user.type(input, '5')
    await user.click(screen.getByRole('button', { name: 'purge.points −1' }))
    expect(input).toHaveValue('10000')
    await user.click(screen.getByRole('button', { name: 'purge.points +1' }))
    expect(JSON.parse(localStorage.getItem('tens_dev_state')).purge.points).toBe(10001)

    await user.clear(input)
    await user.type(input, 'abc')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('button', { name: /^set purge\.points$/ })).toBeDisabled()
    await user.type(input, '{Escape}')
    expect(input).toHaveValue('10001')
  })

  it('variable search matches tier display names', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))
    await user.type(screen.getByRole('searchbox', { name: /search variables/i }), 'owned › kilobytes')
    expect(screen.getByLabelText('owned.tier01')).toBeInTheDocument()
  })

  it('applying JSON drops uncommitted Variables drafts so Enter cannot undo the apply', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))
    await user.type(screen.getByRole('searchbox', { name: /search variables/i }), 'purge.points')
    await user.clear(screen.getByLabelText('purge.points'))
    await user.type(screen.getByLabelText('purge.points'), '5')

    fireEvent.change(screen.getByLabelText(/dev save state json/i), { target: { value: JSON.stringify({ purge: { points: 123 } }) } })
    await user.click(screen.getByRole('button', { name: /^apply json to dev save$/i }))

    expect(screen.getByLabelText('purge.points')).toHaveValue('123')
    expect(screen.getByRole('button', { name: /^set purge\.points$/ })).toBeDisabled()
  })

  it('the raw JSON editor blocks Apply on invalid JSON', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))
    fireEvent.change(screen.getByLabelText(/dev save state json/i), { target: { value: '{ nope' } })
    expect(screen.getByRole('button', { name: /^apply json to dev save$/i })).toBeDisabled()
  })

  it('quick-seed presets and the raw JSON editor both stay scoped to the dev save', async () => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))

    await user.click(screen.getByRole('button', { name: /unlock byte factory/i }))
    expect(JSON.parse(localStorage.getItem('tens_dev_state')).intro.mainGameUnlocked).toBe(true)

    const jsonField = screen.getByLabelText(/dev save state json/i)
    fireEvent.change(jsonField, { target: { value: JSON.stringify({ purge: { points: 123 } }) } })
    await user.click(screen.getByRole('button', { name: /^apply json to dev save$/i }))

    expect(await screen.findByText(/applied\./i)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('tens_dev_state')).purge.points).toBe(123)
  })

  // Round-4 adversarial review flagged that only the 'unlock-factory' preset (covered above) had
  // direct coverage — the other six were only traced by reading code. One table covers the rest,
  // each asserting the exact state change its own label promises, per CLAUDE.md's test.each
  // convention for near-identical cases.
  it.each([
    [/^💰 Bits → 99% to Purge$/, state => expect(state.resources.base).toBe(PURGE_THRESHOLD * 0.99)],
    [/^💰 Bits → Purge threshold$/, state => expect(state.resources.base).toBe(PURGE_THRESHOLD)],
    [/^🏆 \+1,000 PP$/, state => expect(state.purge.points).toBe(1000)],
    [/^🏆 PP → Reboot-ready \(1 Googol\)$/, state => expect(state.purge.points).toBe(ERA_ELIGIBILITY_PP)],
    [/^🖥️ Unlock Compute \(Flops\)$/, state => {
      expect(state.purge.points).toBe(COMPUTE_FLOPS_REVEAL_PP)
      expect(state.computeFlops.pageUnlocked).toBe(true)
    }],
    [/^🔧 Unlock Power \(Cells\)$/, state => expect(state.intro.capacity).toBe(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY)],
    [/^🏆 \+1 Purge count$/, state => {
      expect(state.purge.count).toBe(1)
    }],
  ])('quick-seed preset %s applies its documented effect to the dev save', async (buttonName, assertState) => {
    const user = userEvent.setup()
    seedMainGameState()
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))
    await user.click(screen.getByRole('button', { name: buttonName }))
    assertState(JSON.parse(localStorage.getItem('tens_dev_state')))
  })

  it('Settings disables real-slot actions (Play/Clear/Erase all) while Dev Mode is active', async () => {
    const user = userEvent.setup()
    seedMainGameState({ resources: { base: 4242 } })
    render(<App />)
    await openDevMode(user)
    await user.click(screen.getByRole('button', { name: /^dev mode$/i }))

    await openSettings(user)
    // Erase all is the only real-slot action reachable on a free (single-slot) account without a
    // Supporter unlock — Play/Clear only render per-slot once a slot is unlocked. The underlying
    // guard itself (storage.js refusing the write regardless of UI state) is covered directly in
    // storage.test.js's "refuses to touch real player slots while Dev Mode is active" block; this
    // just confirms the disabled affordance so the no-op isn't silent to whoever's using it.
    expect(screen.getByRole('button', { name: /^erase all save progress$/i })).toBeDisabled()
  })
})

test('theme preference in Settings switches mode and persists across remount', async () => {
  vi.setConfig({ testTimeout: 30000 })
  const user = userEvent.setup()
  seedMainGameState()
  const { unmount } = render(<App />)
  await openSettings(user)
  await user.click(screen.getByRole('button', { name: /use light theme/i }))
  expect(localStorage.getItem('tens_theme_preference')).toBe('light')
  expect(screen.getByRole('button', { name: /use light theme/i })).toHaveAttribute('aria-pressed', 'true')
  unmount()
  render(<App />)
  await openSettings(user)
  expect(screen.getByRole('button', { name: /use light theme/i })).toHaveAttribute('aria-pressed', 'true')
  await user.click(screen.getByRole('button', { name: /use system theme/i }))
  expect(localStorage.getItem('tens_theme_preference')).toBe('system')
// Two full <App/> mount/unmount cycles (each with its own tick-timer/effect setup) in one test
// legitimately take longer than Vitest's 5s default under a loaded/sandboxed test environment —
// bumped rather than restructured, since the double-mount itself is the point of the test.
}, 15000)

describe('Buy max mode', () => {
  test('the toggle stays hidden until the first Prestige', () => {
    seedMainGameState({ resources: { base: 1e6 } })
    render(<App />)
    expect(screen.queryByRole('button', { name: /buy max mode/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^open firmware$/i })).not.toBeInTheDocument()
  })

  test('Buy mode defaults to level; Single makes the tier Buy button buy exactly one unit and persists', async () => {
    const user = userEvent.setup()
    const kilobytes = TIER_DEFINITIONS[0]
    seedMainGameState({
      purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
      resources: { base: getTierCost(kilobytes, 1) * 3 },
      // Purge 1 unlocks the Kilobytes autobuyer; pause it so a real-timer tick can't buy between steps.
      autobuyersEnabled: { [kilobytes.id]: false },
    })
    render(<App />)
    await openPerksTab(user, /open prestige/i)
    expect(screen.getByRole('button', { name: /^buy level mode$/i })).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: /^buy single mode$/i }))
    expect(screen.getByRole('button', { name: /^buy single mode$/i })).toHaveAttribute('aria-pressed', 'true')
    expect(localStorage.getItem('tens_buy_unit_mode')).toBe('true')
    await user.click(screen.getByRole('button', { name: /^open byte factory$/i }))

    const panel = screen.getByLabelText(`${kilobytes.name} layer`)
    await user.click(within(panel).getByRole('button', { name: /^Buy for/ }))
    expect(within(panel).getByRole('progressbar', { name: `${kilobytes.name} cost-block progress` }))
      .toHaveAttribute('aria-valuenow', '1')
  })

  test('Single overrides Buy max for the tier Buy button (one unit even with Buy max on and unlocked)', async () => {
    const user = userEvent.setup()
    const kilobytes = TIER_DEFINITIONS[0]
    localStorage.setItem('tens_buy_max_mode', 'true')
    localStorage.setItem('tens_buy_unit_mode', 'true')
    seedMainGameState({
      buyMaxUnlocked: true,
      purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
      resources: { base: getTierCost(kilobytes, 1) * DEFAULT_PURCHASE_BLOCK_SIZE * 3 },
      autobuyersEnabled: { [kilobytes.id]: false },
    })
    render(<App />)
    const panel = screen.getByLabelText(`${kilobytes.name} layer`)
    await user.click(within(panel).getByRole('button', { name: /^Buy for/ }))
    expect(within(panel).getByRole('progressbar', { name: `${kilobytes.name} cost-block progress` }))
      .toHaveAttribute('aria-valuenow', '1')
  })

  test('once unlocked, toggling it on makes the tier Buy button buy every affordable full level', async () => {
    const user = userEvent.setup()
    const kilobytes = TIER_DEFINITIONS[0]
    const blockCost = level => getTierCost(kilobytes, level) * DEFAULT_PURCHASE_BLOCK_SIZE
    seedMainGameState({
      buyMaxUnlocked: true,
      purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
      resources: { base: blockCost(1) + blockCost(2) },
    })
    render(<App />)

    // The toggle lives only on Firmware → Prestige, not on the Factory screen.
    expect(screen.queryByRole('button', { name: /buy max mode/i })).not.toBeInTheDocument()
    await openPerksTab(user, /open prestige/i)
    const toggle = screen.getByRole('button', { name: /buy max mode/i })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(localStorage.getItem('tens_buy_max_mode')).toBe('true')
    await user.click(screen.getByRole('button', { name: /^open byte factory$/i }))

    const buyMaxButton = screen.getByRole('button', { name: /^Buy 2 full levels/ })
    // Icon slot (aria-hidden): 🛒 + completed levels (0) with Buy max's +n suffixed straight on.
    expect(buyMaxButton.querySelector('[aria-hidden="true"]')).toHaveTextContent(/^🛒 0\+2$/)
    await user.click(buyMaxButton)
    const kilobytesPanel = screen.getByLabelText(`${kilobytes.name} layer`)
    expect(within(kilobytesPanel).getByRole('progressbar', { name: `${kilobytes.name} cost-block progress` }))
      .toHaveAttribute('aria-valuenow', '0')
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.purchaseLevels[kilobytes.id]).toBe(3)
  })
})

test('a running Capacity upgrade shows percent on the first line, from → to capacity and time left', () => {
  vi.useFakeTimers()
  seedIntroState({ capacity: 1000, bits: 400, byteCreated: true, mainGameUnlocked: true })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
  fireEvent.click(screen.getByRole('button', { name: /upgrade data stream capacity/i }))

  const running = screen.getByRole('region', { name: /^upgrade capacity$/i })
  expect(running).toHaveTextContent(/⏫Upgrading…/)
  expect(running).toHaveTextContent(/→/)
  expect(running).toHaveTextContent(/⏳ \d+[smhd]/)
  // The draw rate (base Speed, constant 1x) shows at the right, like the other speed readouts.
  expect(running).toHaveTextContent(/⚡ [\d.]+ \w+\/s/)
  expect(running.querySelector('[title^="Upgrade draw at a constant 1x"]')).not.toBeNull()
  // Empty-bar ETA is linear: cost / base Speed (constant 1x, no fill multiplier).
  const emptyBarSeconds = 1000 / getIntroProductionRate({ capacity: 1000, byteCreated: true })
  const expectedTimeText = formatOfflineDuration(Math.max(1, Math.ceil(emptyBarSeconds)))
  expect(running).toHaveTextContent(`⏳ ${expectedTimeText}`)

  unmount()
  vi.useRealTimers()
})

describe('getBufferSecondsToFull (tile time-to-full)', () => {
  it('integrates the 1000% → 10% fill multiplier curve', () => {
    const expected = fill => 100 * (10 - 10 ** (2 * fill - 1)) / (2 * Math.LN10)
    expect(getBufferSecondsToFull(0, 1000, 10, 10)).toBeCloseTo(expected(0))
    expect(getBufferSecondsToFull(500, 1000, 10, 10)).toBeCloseTo(expected(0.5))
    expect(getBufferSecondsToFull(900, 1000, 10, 10)).toBeCloseTo(expected(0.9))
  })

  it('is not the old linear 150% → 50% integral', () => {
    const geometric = getBufferSecondsToFull(0, 1000, 10, 10)
    const oldLinear = 100 * Math.log(1.5 / 0.5)
    expect(geometric).not.toBeCloseTo(oldLinear, 1)
  })

  it('is null when full, over-full, or not filling', () => {
    expect(getBufferSecondsToFull(1000, 1000, 10)).toBeNull()
    expect(getBufferSecondsToFull(0, 1000, 0)).toBeNull()
    expect(getBufferSecondsToFull(0, 0, 10)).toBeNull()
  })
})

test('the Data Stream tile shows time to full under its speed, replaced by the tap bonus when one is active', () => {
  seedIntroState({ capacity: 1048576, bits: 5000, byteCreated: true, mainGameUnlocked: true })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
  const withoutBonus = screen.getAllByTitle(/Estimated time until this buffer is full/)
  expect(withoutBonus[0]).toHaveTextContent(/⏳ \d+[smhd]/)
  unmount()

  localStorage.clear()
  seedIntroState({ capacity: 1048576, bits: 5000, byteCreated: true, mainGameUnlocked: true, dataStreamTapBonusPercent: 40 })
  const bonus = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
  // The Data Stream's slot now shows its tap bonus instead (other tiles, e.g. pools, keep their time).
  expect(screen.queryAllByTitle(/Estimated time until this buffer is full/)).toHaveLength(withoutBonus.length - 1)
  bonus.unmount()
})

describe('formatBitsTransition (running-upgrade from → to)', () => {
  const KIB = 8 * 1024
  it('shows the unit once, on the right, with at most 3 significant digits', () => {
    expect(formatBitsTransition(1.41421 * KIB, 2 * KIB, '/s')).toBe('1.41 → 2 KiB/s')
    expect(formatBitsTransition(128 * KIB, 256 * KIB)).toBe('128 → 256 KiB')
  })

  it('re-expresses a from-value that would have read in a smaller unit in the target unit', () => {
    expect(formatBitsTransition(512 * 8, 1 * KIB, '/s')).toBe('512 → 1,024 B/s')
    expect(formatBitsTransition(512 * KIB, 1024 * KIB)).toBe('512 → 1,024 KiB')
  })
})

// DiskArrayRow's one click: expediting an empty write-cache-size disk.
const EXPEDITE_FIRST_DISK_SIZE = getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE
const EXPEDITE_SECOND_DISK_SIZE = EXPEDITE_FIRST_DISK_SIZE * 10

const withExpediteDisks = intro => {
  const state = createInitialGameState()
  return { ...state, intro: { ...state.intro, ...intro } }
}

const renderDiskArrayRow = (state, size, actions = {}) => render(
  <ThemeProvider>
    <DiskArrayRow actions={actions} size={size} state={state} />
  </ThemeProvider>,
)

describe('DiskArrayRow expedite click', () => {
  it('clicking an empty disk of a write-cache size queues it via actions.expediteDiskFill', async () => {
    const expedite = vi.fn()
    const state = withExpediteDisks({ disksBuiltTotal: { [EXPEDITE_SECOND_DISK_SIZE]: 2 }, disks: { [EXPEDITE_SECOND_DISK_SIZE]: 1 } })
    renderDiskArrayRow(state, EXPEDITE_SECOND_DISK_SIZE, { expediteDiskFill: expedite })
    await userEvent.click(screen.getByRole('button', { name: /empty 10 kb disk/i }))
    expect(expedite).toHaveBeenCalledWith(EXPEDITE_SECOND_DISK_SIZE)
  })

  it('shows an expedited disk as queued and no longer clickable', () => {
    const base = withExpediteDisks({ disksBuiltTotal: { [EXPEDITE_SECOND_DISK_SIZE]: 1 }, disks: {} })
    renderDiskArrayRow(expediteDiskFill(EXPEDITE_SECOND_DISK_SIZE)(base), EXPEDITE_SECOND_DISK_SIZE, { expediteDiskFill: vi.fn() })
    expect(screen.getByLabelText(/empty 10 kb disk queued for filling/i)).toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('never makes the pool\'s smallest (read-cache) size clickable', () => {
    const state = withExpediteDisks({ disksBuiltTotal: { [EXPEDITE_FIRST_DISK_SIZE]: 2 }, disks: { [EXPEDITE_FIRST_DISK_SIZE]: 1 } })
    renderDiskArrayRow(state, EXPEDITE_FIRST_DISK_SIZE, { expediteDiskFill: vi.fn() })
    expect(screen.queryByRole('button')).toBeNull()
  })
})
