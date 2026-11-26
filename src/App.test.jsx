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
  FILL_MULTIPLIER_MAX_PERCENT,
  FILL_MULTIPLIER_MIN_PERCENT,
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
// Settings is a grouped list of collapsed entries (#1143); tests expand every entry so each
// section's controls are reachable exactly as before.
const expandSettingsSections = () => {
  for (const toggle of screen.queryAllByRole('button', { name: / settings$/i, expanded: false })) fireEvent.click(toggle)
}

const openSettings = async user => {
  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open settings/i }))
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

test('renders the game title and the Kilobytes tier', () => {
  seedMainGameState()
  render(<App />)

  const heading = screen.getByRole('heading', { level: 1, name: /^byte factory$/i })
  expect(heading).toBeInTheDocument()
  expect(heading.closest('header')).not.toBeNull()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toBeInTheDocument()
  // Money=1 (MONEY_STARTING_AMOUNT) — Kilobytes' per-unit cost is 1,000, so nothing is affordable yet.
  expect(screen.getByRole('button', { name: /buy for 1,000 b\b/i })).toBeDisabled()
})

test('Factory keeps its h1 (hidden visually) once a boost timer bar takes the top of the screen', () => {
  seedMainGameState({
    intro: { mainGameUnlocked: true, computeBoosts: { burst: { queue: [1], remainingSeconds: 30 } } },
  })
  render(<App />)

  const heading = screen.getByRole('heading', { level: 1, name: /^byte factory$/i })
  expect(heading.tagName).toBe('H1')
  expect(heading.closest('header')).toBeNull()
  expect(screen.getByLabelText(/^active turbo compute boost$/i)).toBeInTheDocument()
})

test('Factory keeps its h1 (hidden visually) once a challenge banner takes the top of the screen', () => {
  seedMainGameState({ challenges: { active: 'F1' } })
  render(<App />)

  expect(screen.getByLabelText(/^active challenge banner$/i)).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i }).closest('header')).toBeNull()
})

test('shows the app version only on the Manual page', async () => {
  const user = userEvent.setup()
  seedMainGameState()
  render(<App />)

  expect(screen.queryByText(`v${version}`)).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open manual/i }))
  expect(screen.getByText(`v${version}`)).toBeInTheDocument()

  await openSettings(user)
  expect(screen.queryByText(`v${version}`)).not.toBeInTheDocument()
})

test('shows a blocking notice and starts fresh when an incompatible save is detected on load', async () => {
  const user = userEvent.setup()
  localStorage.setItem('tens_game_state', JSON.stringify({ resources: { Ones: 100 } }))

  render(<App />)

  expect(screen.getByRole('dialog', { name: /save not compatible/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /save not compatible/i })).toBeInTheDocument()
  const persisted = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(persisted.resources.Ones).toBeUndefined()
  expect(persisted.saveSchemaVersion).toBe(3)

  await user.click(screen.getByRole('button', { name: /start fresh with a new save/i }))

  expect(screen.queryByRole('dialog', { name: /save not compatible/i })).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
})

// Regression: AppNav exposes Foundry/Manual (and later Storage/Compute) as accessibly-labeled
// buttons once the main game is unlocked — this only asserts the accessible surface
// (role + aria-label), since jsdom doesn't render CSS for a visual check.
test('AppNav exposes accessibly-labeled Foundry, Manual, and More once unlocked', () => {
  seedMainGameState()
  render(<App />)

  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()

  const foundryButton = screen.getByRole('button', { name: /open byte foundry/i })
  expect(foundryButton).toHaveTextContent(/foundry/i)
  expect(foundryButton).toHaveAttribute('title', 'Byte Foundry — Data Stream and Storage')

  const tiersButton = screen.getByRole('button', { name: /open byte factory/i })
  expect(tiersButton).toHaveTextContent(/factory/i)

  // Progression order: Foundry before Factory in the bar.
  const nav = screen.getByRole('navigation', { name: /main navigation/i })
  const navButtons = within(nav).getAllByRole('button')
  const foundryIndex = navButtons.findIndex(b => /open byte foundry/i.test(b.getAttribute('aria-label') || ''))
  const tiersIndex = navButtons.findIndex(b => /open byte factory/i.test(b.getAttribute('aria-label') || ''))
  expect(foundryIndex).toBeGreaterThanOrEqual(0)
  expect(tiersIndex).toBeGreaterThan(foundryIndex)

  // Storage is folded into Foundry → Disks — not a top-level AppNav item.
  expect(screen.queryByRole('button', { name: /open storage/i })).not.toBeInTheDocument()

  // Manual lives in the More sheet, not on the bottom bar.
  expect(within(screen.getByRole('navigation', { name: /main navigation/i })).queryByRole('button', { name: /open manual/i })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /open more menu/i }))
  expect(screen.getByRole('button', { name: /open manual/i })).toHaveTextContent(/manual/i)
  fireEvent.click(screen.getByRole('button', { name: /open more menu/i }))

  expect(screen.getByRole('button', { name: /open more menu/i })).toBeInTheDocument()
})

test('More menu reaches Milestones and Settings from any screen without progress gates', async () => {
  const user = userEvent.setup()
  render(<App />) // fresh gate — no mainGameUnlocked yet

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /open byte factory/i })).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  expect(screen.getByRole('dialog', { name: /more menu/i })).toBeInTheDocument()
  // Reset is not duplicated in the More sheet — only under Settings → Danger zone.
  expect(screen.queryByRole('button', { name: /reset game/i })).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open milestones/i }))
  expect(screen.getByRole('heading', { level: 1, name: /^milestones$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/milestones category/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open settings/i }))
  expandSettingsSections()
  expect(screen.getByRole('heading', { level: 1, name: /^settings$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/danger zone/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /reset game/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/supporter pack section/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/save slots section/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/system log section/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/task manager section/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /dummy supporter checkout/i })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open manual/i }))
  expect(screen.getByRole('heading', { level: 1, name: /tens — manual/i })).toBeInTheDocument()
})

// Attention dots on AppNav — Data Stream full on Foundry; affordable full purchase level on Tiers.
test('AppNav Foundry attention dot lights when Data Stream is full while on Factory', () => {
  // Seed bits at the cap so the stream is actually full; load normalization preserves the
  // doubling-ladder Capacity rather than force-raising a lower value.
  seedMainGameState({
    intro: {
      mainGameUnlocked: true,
      bits: INTRO_CAPACITY_CAP_BITS,
      capacity: INTRO_CAPACITY_CAP_BITS,
      byteCreated: true,
    },
  })
  render(<App />)

  const foundryButton = screen.getByRole('button', { name: /open byte foundry/i })
  expect(within(foundryButton).getByLabelText(/important action available/i)).toBeInTheDocument()
})

test('AppNav Factory attention dot lights when a full purchase level is affordable', () => {
  // Kilobytes costs 1,000/unit; a fresh block is 8 units → 8,000 Bits buys a full level.
  seedMainGameState({ resources: { base: DEFAULT_PURCHASE_BLOCK_SIZE * 1000 } })
  render(<App />)

  const tiersButton = screen.getByRole('button', { name: /open byte factory/i })
  expect(within(tiersButton).getByLabelText(/important action available/i)).toBeInTheDocument()
  // Firmware (Automation / Prestige) only appears after prestige.
  expect(screen.queryByRole('button', { name: /^open firmware$/i })).not.toBeInTheDocument()
})

test('the Byte Factory screen has no second-level tabs; Firmware is its own AppNav page with two icon tabs', async () => {
  seedMainGameState({ purge: { xp: 0, points: 10, count: 1, highestMilestone: 1 } })
  render(<App />)

  expect(screen.queryByRole('tablist', { name: /factory view/i })).not.toBeInTheDocument()
  await userEvent.setup().click(screen.getByRole('button', { name: /^open firmware$/i }))
  expect(screen.getByRole('heading', { level: 1, name: /firmware/i })).toBeInTheDocument()
  const tablist = screen.getByRole('tablist', { name: /firmware view/i })
  for (const name of [/open automation/i, /open prestige/i]) {
    const tab = within(tablist).getByRole('tab', { name })
    // Icon-only: visible text carries no words.
    expect(tab.textContent).not.toMatch(/[a-z]/i)
  }
  expect(within(tablist).getByRole('tab', { name: /open automation/i })).toHaveAttribute('aria-selected', 'true')
})
test('Firmware → Kernels tab is hidden before a Reboot and lets you buy a hyperscaler after one', async () => {
  seedMainGameState({ purge: { xp: 0, points: 10, count: 1, highestMilestone: 1 } })
  const { unmount } = render(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: /^open firmware$/i }))
  expect(screen.queryByRole('tab', { name: /open kernels/i })).not.toBeInTheDocument()
  unmount()
  localStorage.clear()

  seedMainGameState({
    purge: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
    era: { count: 1 },
    eons: { balance: 11 },
  })
  render(<App />)
  await user.click(screen.getByRole('button', { name: /^open firmware$/i }))
  await user.click(screen.getByRole('tab', { name: /open kernels/i }))
  await user.click(screen.getByRole('button', { name: /buy hyperscaler for 1 kernels/i }))
  expect(screen.getByLabelText('Hyperscaler value')).toHaveTextContent('1 owned')
  expect(screen.getByRole('button', { name: /buy hyperscaler for 10 kernels/i })).toBeEnabled()
  expect(screen.getByRole('button', { name: /unlock auto hyperscaler/i })).toBeDisabled()
})

test('Firmware → Automation shows Auto Purge conditions once Auto Purge is owned and steps them', async () => {
  seedMainGameState({ purge: { xp: 0, points: 10, count: 1, highestMilestone: 1 }, autoPurge: 0 })
  render(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: /^open firmware$/i }))
  expect(screen.getByLabelText('Minimum time value')).toHaveTextContent('Off')
  await user.click(screen.getByRole('button', { name: /increase minimum time/i }))
  expect(screen.getByLabelText('Minimum time value')).toHaveTextContent('10 s')
  await user.click(screen.getByRole('button', { name: /increase purge at pp/i }))
  expect(screen.getByLabelText('Purge at PP value')).toHaveTextContent('10^1 PP')
  await user.click(screen.getByRole('button', { name: /increase best pp multiple/i }))
  expect(screen.getByLabelText('Best PP multiple value')).toHaveTextContent('×1.5')
})

test('after a Reboot (prestige count 0, era 1) Firmware stays reachable with every owned automation\'s toggle', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    autobuyers: { tier01: 1 },
    autoScaleUp: true,
    buyMaxUnlocked: true,
    era: { count: 1 },
    purge: { xp: 0, points: 0, count: 0, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByRole('button', { name: /^Kilobytes's autobuyer$/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /^Auto Scale Up automation$/i })).toBeInTheDocument()
  await user.click(screen.getByRole('tab', { name: /open prestige/i }))
  expect(screen.getByRole('button', { name: /buy max mode/i })).toBeInTheDocument()
})

test('a Reboot-unlocked Compute (Flops) autobuyer gets its own pause toggle on Firmware → Automation', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    era: { count: 1 },
    computeFlops: { pageUnlocked: true, owned: {}, cumulativeBoost: {} },
    computeFlopsAutobuyers: { flop01: 1, flop02: null, flop03: null, flop04: null, flop05: null, flop06: null, flop07: null, flop08: null, flop09: null, flop10: null },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.queryByRole('button', { name: /^Chips \(MFlops\) autobuyer$/i })).not.toBeInTheDocument()
  const toggle = screen.getByRole('button', { name: /^Cores \(KFlops\) autobuyer$/i })
  expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await user.click(toggle)
  expect(screen.getByLabelText("Cores (KFlops) autobuyer paused")).toBeInTheDocument()
  expect(JSON.parse(localStorage.getItem('tens_game_state')).computeFlopsAutobuyersEnabled.flop01).toBe(false)
})

test('a fully-automated tier keeps its pause toggles on Firmware → Automation', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    autobuyers: { tier01: 1 },
    tierTickspeedAutobuyer: { tier01: true },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByRole('button', { name: /^Kilobytes's autobuyer$/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /^Kilobytes's tickspeed autobuyer$/i })).toBeInTheDocument()
})

test('the Manual nav item opens the Info page and Factory returns, preserving game state', async () => {
  const user = userEvent.setup()

  // Kilobytes now costs 1,000/unit (baseCost) — seed enough Money for exactly 1 unit.
  seedMainGameState({ resources: { base: 1000 } })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open manual/i }))
  expect(screen.getByRole('heading', { level: 1, name: /tens — manual/i })).toBeInTheDocument()
  // Manual sections covering the Byte Foundry pre-game (Data Stream/tapping/Speed, Storage,
  // and Compute — including the full merge chain) render alongside the pre-existing main-game
  // sections (Tickspeed, Scale Up, …) plus Prestige.
  expect(screen.getByRole('heading', { level: 2, name: /^byte foundry$/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /^storage$/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /^power$/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /^compute$/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /^purge$/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /^prestige ladder$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/prestige ladder section/i)).not.toHaveTextContent(
    /the Production speed bonus/i,
  )
  expect(screen.getByLabelText(/byte foundry section/i)).toHaveTextContent(/forced priority/i)
  expect(screen.getByLabelText(/storage section/i)).toHaveTextContent(/clean-slate disk/i)
  expect(screen.getByLabelText(/power section/i)).toHaveTextContent(/queue/i)
  expect(screen.getByLabelText(/compute flops section/i)).toHaveTextContent(/kflops/i)
  expect(screen.queryByLabelText(/^kilobytes layer$/i)).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open byte factory/i }))
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i })).toBeInTheDocument()
  // Navigating away and back doesn't touch game state — the previous purchase is still there.
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
})

test('buying Kilobytes deducts cost and increases owned count', async () => {
  const user = userEvent.setup()

  // Money=1,000, per-unit cost 1,000 — manual Buy grabs as many as affordable, which is just 1 unit.
  seedMainGameState({ resources: { base: 1000 } })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
  // Money=0 left; still at level 1 (1 of 8 purchased), unaffordable — button disabled.
  expect(screen.getByRole('button', { name: /buy for 1,000 b \(0 completed levels, 1 of 8 purchased toward the next\)/i })).toBeDisabled()
})

test('Reset appears only in Settings → Danger zone, not on the Byte Factory screen or in More', async () => {
  const user = userEvent.setup()
  seedMainGameState()
  render(<App />)

  expect(screen.queryByRole('button', { name: /reset game/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /reformat byte foundry/i })).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  expect(screen.queryByRole('button', { name: /reset game/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /reformat byte foundry/i })).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /open settings/i }))
  expandSettingsSections()

  expect(screen.getByLabelText(/danger zone/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /reset game/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /reformat byte foundry/i })).toBeInTheDocument()
})

test('reset game restores starting state once the confirm dialog is accepted', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  seedMainGameState({ resources: { base: 1000 } })
  render(<App />)

  // Buy Kilobytes to dirty the state — money=1,000, per-unit cost 1,000, so a single click buys 1 unit.
  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  await openSettings(user)
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  // A full Reset produces createInitialGameState()'s fresh intro.mainGameUnlocked: false, and the
  // app's bidirectional page sync (see App.jsx) follows it back to the Byte Foundry, same as a
  // real Prestige — a Reset is at least as much "a new run" as a Prestige is.
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBe(0)
  expect(saved.resources.base).toBe(1)
})

test('reset clears localStorage once the confirm dialog is accepted', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  seedMainGameState({ resources: { base: 1000 } })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))

  await openSettings(user)
  // After reset the save-effect fires with fresh state, so money should be back to 1
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved).not.toBeNull()
  expect(saved.resources.base).toBe(1)
  expect(saved.owned.tier01).toBe(0)
})

test('cancelling the reset confirm dialog leaves the game state untouched', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(false)

  seedMainGameState({ resources: { base: 1000 } })
  render(<App />)

  // Buy Kilobytes to dirty the state — money=1,000, per-unit cost 1,000, so a single click buys 1 unit.
  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  await openSettings(user)
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  // Still on Settings — cancel must not navigate away or wipe progress.
  expect(screen.getByRole('heading', { level: 1, name: /^settings$/i })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /open byte factory/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBe(1)
})

test('Reformat Byte Foundry wipes upgrades to scratch and stores convenience caps', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  seedMainGameState({
    resources: { base: 25_000 },
    owned: { tier01: 5 },
    // count ≥ 1 unlocks the Kilobytes autobuyer on load — pause it so live ticks cannot
    // spend Bits into extra owned while this test clicks through Settings.
    purge: { xp: 0, points: 7, count: 2, highestMilestone: 1 },
    autobuyersEnabled: { tier01: false },
    intro: {
      mainGameUnlocked: true,
      bits: 0,
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      byteCreated: true,
      disks: { 8000: 2 },
      disksBuiltTotal: { 8000: 4 },
      computeCores: 6,
      computeCoresEverEarned: 12,
      computeMergePageUnlocked: true,
    },
  })
  render(<App />)

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 5\b/i)

  await openSettings(user)
  const resetFoundry = screen.getByRole('button', { name: /reformat byte foundry/i })
  expect(resetFoundry.title).toMatch(/data stream/i)
  expect(resetFoundry.title).not.toMatch(/including Capacity/)
  await user.click(resetFoundry)

  expect(window.confirm).toHaveBeenCalled()
  expect(window.confirm.mock.calls[0][0]).toMatch(/byte foundry/i)
  expect(window.confirm.mock.calls[0][0]).toMatch(/capacity/i)
  expect(window.confirm.mock.calls[0][0]).toMatch(/convenience|auto/i)
  expect(window.confirm.mock.calls[0][0]).toMatch(/data stream/i)

  expect(screen.getByRole('heading', { level: 1, name: /^settings$/i })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /open byte factory/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toBeInTheDocument()

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBeGreaterThanOrEqual(5)
  expect(saved.purge.points).toBe(7)
  expect(saved.purge.count).toBe(2)
  expect(saved.intro.mainGameUnlocked).toBe(true)
  // Upgrades restart from scratch…
  expect(saved.intro.byteCreated).toBe(false)
  expect(saved.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
  expect(saved.intro.disks).toEqual({})
  expect(saved.intro.disksBuiltTotal).toEqual({})
  expect(saved.intro.computeCores).toBe(0)
  // …but caps remember prior highs for convenience auto-clicks.
  expect(saved.intro.foundryResetCaps.byteCreated).toBe(true)
  expect(saved.intro.foundryResetCaps.capacity).toBe(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY)
  expect(saved.intro.foundryResetCaps.disksBuiltTotal['8000']).toBe(4)
  expect(screen.queryByRole('button', { name: /open power/i })).not.toBeInTheDocument()
})

test('cancelling Reformat Byte Foundry leaves Foundry progress untouched', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(false)

  seedMainGameState({
    intro: {
      mainGameUnlocked: true,
      byteCreated: true,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      disks: { 8000: 1 },
      computeCores: 3,
    },
    // tier01 well past the 8000-bit disk's own required level (1) — stranded, so it's never
    // pull-eligible and stays untouched by ordinary automatic gameplay regardless of real ticks
    // firing during this test's async userEvent interactions, isolating the assertion to Reset
    // Byte Foundry's own cancellation rather than an unrelated automatic pull.
    purchaseLevels: { tier01: 5 },
  })
  render(<App />)

  await openSettings(user)
  await user.click(screen.getByRole('button', { name: /reformat byte foundry/i }))

  expect(window.confirm).toHaveBeenCalled()
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.intro.byteCreated).toBe(true)
  // Save/load preserves the doubling-ladder Capacity; it does not snap to the pool ceiling.
  expect(saved.intro.capacity).toBe(INTRO_DISK_UNLOCK_CAPACITY)
  expect(saved.intro.disks).toEqual({ 8000: 1 })
  expect(saved.intro.computeCores).toBe(3)
})

test('a recorded Megabytes tier reappears and is purchasable once Kilobytes reaches level 2', () => {
  seedMainGameState({
    resources: { base: 8_000_000 },
    owned: { tier01: 16 },
    everUnlockedTierIds: { tier01: true, tier02: true },
  })
  render(<App />)

  const megabytesLayer = screen.getByLabelText(/^megabytes layer$/i)
  expect(megabytesLayer).toBeInTheDocument()
  // Megabytes' baseCost is 1E6 — level 1, blockSize 8: per-unit cost 1,000,000, full block
  // 8,000,000 bits — at/above the 1,000,000 exponential-notation threshold, so it renders as "1e6";
  // the full block (8,000,000, an exact whole-Byte multiple of 8) renders converted to Bytes as
  // "1e6 B" rather than "8e6 b" (see formatCurrency in engine.js/docs/DESIGN_HISTORY.md).
  // Scoped to the Megabytes row: Kilobytes' own level-3 buy button happens to render the same
  // "1e6 B" text (its per-unit cost coincidentally matches Megabytes' level-1 cost at this balance).
  expect(within(megabytesLayer).getByRole('button', { name: /buy ×8 for 1e6 B\b/i })).toBeEnabled()
})

test('buying a higher tier does not deduct the tier below\'s owned count', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 8_000_000 },
    owned: { tier01: 16 },
    everUnlockedTierIds: { tier01: true, tier02: true },
  })
  render(<App />)

  const megabytesLayer = screen.getByLabelText(/^megabytes layer$/i)
  await user.click(within(megabytesLayer).getByRole('button', { name: /buy ×8 for 1e6 B\b/i }))

  expect(megabytesLayer).toHaveTextContent(/owned: 8/i)
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 16/i)
})

test('money balance is shown once at the top in full currency format, centered, with no per-second yield', () => {
  seedMainGameState()
  render(<App />)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  expect(screen.getByLabelText(/^money display$/i)).not.toHaveTextContent('/sec')
  expect(screen.queryAllByLabelText(/^money display$/i)).toHaveLength(1)
  // Below the Bytes-headline threshold the Bits subline would duplicate the hero, so it stays hidden.
  expect(screen.queryByLabelText(/balance in bits/i)).not.toBeInTheDocument()
})

test('once the hero switches to Bytes, a small Bits line shows the exact bit balance', () => {
  seedMainGameState({ resources: { base: 8000 } })
  render(<App />)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1,000 B')
  const bitsLine = screen.getByLabelText(/balance in bits/i)
  expect(bitsLine).toHaveTextContent('8,000 b')
  // Not a live region — Bits change every tick and role=status would spam assistive tech.
  expect(bitsLine).not.toHaveAttribute('role', 'status')
})

// Production moved off the collapsed row into its details disclosure (the tier symbol toggles it).
const expandTierDetails = async (user, tierName) => {
  const layer = screen.getByLabelText(new RegExp(`^${tierName} layer$`, 'i'))
  await user.click(within(layer).getByRole('button', { name: new RegExp(tierName, 'i') }))
  return layer
}

test('a byte-producing tier shows its per-tick production amount with the currency format, not a per-second rate', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 5 },
  })
  render(<App />)

  // The collapsed row shows only the owned count; production is in the details.
  expect(screen.getByLabelText(/^kilobytes layer$/i)).not.toHaveTextContent('+5 B')
  const layer = await expandTierDetails(user, 'kilobytes')
  expect(layer).toHaveTextContent('Production: +5 B per delivery')
  expect(layer).not.toHaveTextContent('/sec')
})

test('the Buy button shows the tier\'s completed-level count beside the cart icon', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 10 },
    purchaseLevels: { tier01: 4 }, // 3 completed levels
  })
  render(<App />)

  const buy = within(screen.getByLabelText(/^kilobytes layer$/i)).getByRole('button', { name: /^buy/i })
  // The icon slot (aria-hidden; the accessible name carries the full sentence) holds 🛒 + level.
  expect(buy.querySelector('[aria-hidden="true"]')).toHaveTextContent(/^🛒 3$/)
})

test('a tickspeed multiplier level speeds up delivery frequency, not the amount per delivery or autobuyer purchase frequency', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 5 },
    tickspeedLevels: { tier01: 3 },
  })
  render(<App />)

  // The displayed production figure is the raw per-delivery amount (owned) — level 3's ×1.21
  // speed bonus (10% per level) shortens how often a delivery lands, it never inflates the
  // amount, so this still reads +5 B.
  expect(await expandTierDetails(user, 'kilobytes')).toHaveTextContent('Production: +5 B')
  // The cumulative speed bonus no longer shows as a badge on the row itself (see "the
  // automation icon and percentage badge are removed from the tier row" below) — it's still
  // available in the tickspeed button's own title tooltip and the row's Details disclosure.
  expect(screen.getByTitle(/tickspeed multiplier level 3 \(\+21% faster ticks\)/i)).toBeInTheDocument()
})

test('the tier tickspeed multiplier button is buyable even when that tier\'s autobuyer has never been unlocked', async () => {
  const user = userEvent.setup()

  // The last tier (Quettabytes) has the cheapest tickspeed base cost (10^1), so level 1 → 2
  // requires 10 of its own resource (it may spend the last unit) and spends the full 10.
  seedMainGameState({
    resources: { base: 10, tier10: 10 },
    owned: { tier09: 10, tier10: 10 },
    // autobuyers.tier10 is left at its default (null, locked) — the tickspeed multiplier is
    // enabled by default regardless.
  })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /tickspeed multiplier \(\+10% faster ticks\) for 10 QB/i })
  expect(upgradeButton).toBeEnabled()

  await user.click(upgradeButton)

  expect(screen.getByTitle(/tickspeed multiplier level 2 \(\+10% faster ticks\)/i)).toBeInTheDocument()
})

test('reaching 8 lifetime purchases of a tier multiplies its displayed production by the level multiplier (×1.25 with five Level power achievements)', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    achievements: { earned: Object.fromEntries([1, 2, 3, 4, 5].map(n => [`levelPower${n}`, true])), counters: { pings: 0 } },
    resources: { base: 10 },
    owned: { tier01: 10 },
    purchased: { tier01: 8 },
    purchaseLevels: { tier01: 2 }, // level 1 completed
  })
  render(<App />)

  // Crossing the 8-purchase milestone completes level 1: owned(10) × 1 B/tick × 1.25 = 12.5 B/tick
  // × 1.05 for the five earned achievements' stars (+1% each) = 13.1 B/tick (the displayed amount floors to match tickGame's own floored credit).
  expect(await expandTierDetails(user, 'kilobytes')).toHaveTextContent('Production: +13 B')
})

test('a tier shows its full per-tick production amount, not a reduced rate', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 10, tier02: 4 },
  })
  render(<App />)

  // The displayed amount is the raw per-tick credit (owned(4) × 1, no bonus/milestone) delivered
  // each time the tier's own tickspeed period completes — not divided by tickspeed, since it's
  // not shown as an averaged "/sec" rate. Megabytes PRODUCES Kilobytes (producesResourceId:
  // 'tier01'), so the amount reads in Kilobytes' own symbol (KB), not Megabytes' own (MB).
  expect(await expandTierDetails(user, 'megabytes')).toHaveTextContent('Production: +4 KB')
})

test('a tier row has no separate "Details" label — clicking its name reveals base/effective tickspeed', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 10, tier02: 4 }, // unlocks Megabytes (base tickspeed 2s)
  })
  render(<App />)

  const megabytesLayer = screen.getByLabelText(/^megabytes layer$/i)
  expect(within(megabytesLayer).queryByText(/^details$/i)).not.toBeInTheDocument()

  // The tier's own name (wrapping TierNameTrigger, exposed as a named button) is the
  // disclosure's trigger now, not a separate label — its content isn't in the DOM at all until
  // expanded.
  const trigger = within(megabytesLayer).getByRole('button', { name: /megabytes/i })
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(within(megabytesLayer).queryByText(/base tickspeed/i)).not.toBeInTheDocument()

  await user.click(trigger)

  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(megabytesLayer).toHaveTextContent(/base tickspeed: delivers every 2s/i)
  expect(megabytesLayer).toHaveTextContent(/effective tickspeed: every 2s/i)
})

test('a tier row\'s "Effective tickspeed" breakdown reflects Overclock\'s boost to the global multiplier, not a hidden separate factor', async () => {
  // Regression test for a real bug: an earlier version applied Overclock as its own third
  // multiplier inside getEffectiveTierTickSpeedSeconds, but this breakdown line's "global ×N"
  // parenthetical only ever showed two factors — silently disagreeing with the actual computed
  // effective tickspeed once the Overclock level > 0. Overclock's effect is folded directly into
  // the global tickspeed multiplier itself, so both figures below must agree by construction.
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 10, tier02: 4 }, // unlocks Kilobytes (base tickspeed 1s)
    globalTickspeedMultiplier: 9, // 9 regular levels, no milestone yet (first is level 10)
    overclockLastClaimCompletedLevels: 1, // boosts the regular step from 1% to 1.1% per level
  })

  render(<App />)

  const kilobytesLayer = screen.getByLabelText(/^kilobytes layer$/i)
  await user.click(within(kilobytesLayer).getByRole('button', { name: /kilobytes/i }))

  // 1.011^9 ≈ 1.1035 — the global figure must reflect the BOOSTED step (1.1%), not the
  // pre-Overclock baseline (1.01^9 ≈ 1.0937) — the effective period below (base 1s / 1.1035)
  // only matches the boosted value.
  expect(kilobytesLayer).toHaveTextContent(/effective tickspeed: every 0\.91s \(tier ×1, global ×1\.1\)/i)
})

test('tier details show that tier\'s own boost total (only covering lanes), and no boost line without a boost', async () => {
  const user = userEvent.setup()
  const lanes = { burst: { queue: [1], remainingSeconds: 100 }, sustain: { queue: [2, 1], remainingSeconds: 100 } }
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 10, tier02: 4 },
    intro: { mainGameUnlocked: true, computeBoosts: lanes },
  })
  render(<App />)

  const open = async name => {
    const layer = screen.getByLabelText(name)
    await user.click(within(layer).getByRole('button', { name: /(kilo|mega)bytes/i }))
    return layer
  }
  const kb = await open(/^kilobytes layer$/i)
  expect(kb).toHaveTextContent(`Boosted ×${COMPUTE_BOOST_PRESETS.burst.multiplier + COMPUTE_BOOST_PRESETS.sustain.multiplier}`)
  expect(kb).toHaveTextContent('1 queued')
  const mb = await open(/^megabytes layer$/i)
  expect(mb).toHaveTextContent(`Boosted ×${COMPUTE_BOOST_PRESETS.sustain.multiplier} production`)
  expect(mb).not.toHaveTextContent('Turbo')
})

test('tier details carry no boost line while no boost runs', async () => {
  const user = userEvent.setup()
  seedMainGameState({ resources: { base: 10 }, owned: { tier01: 10 } })
  render(<App />)
  const layer = screen.getByLabelText(/^kilobytes layer$/i)
  await user.click(within(layer).getByRole('button', { name: /kilobytes/i }))
  expect(layer).not.toHaveTextContent(/Boosted ×/)
})

test('clicking elsewhere on a tier row\'s tile (not the name) does not toggle its details', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 10, tier02: 4 },
  })
  render(<App />)

  const megabytesLayer = screen.getByLabelText(/^megabytes layer$/i)
  const trigger = within(megabytesLayer).getByRole('button', { name: /megabytes/i })
  expect(trigger).toHaveAttribute('aria-expanded', 'false')

  // Only the name toggles — clicking the row's own container does nothing.
  await user.click(megabytesLayer)
  expect(trigger).toHaveAttribute('aria-expanded', 'false')

  await user.click(trigger)
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
})

test('clicking a tier row\'s Buy/tickspeed buttons does not also toggle its details disclosure', async () => {
  const user = userEvent.setup()

  // Enough Money to make the Buy button genuinely clickable (Megabytes costs 1,000,000/unit) —
  // an actually-disabled button would swallow the click entirely, making this assertion trivial.
  seedMainGameState({
    resources: { base: 2_000_000 },
    owned: { tier01: 10, tier02: 4 },
  })
  render(<App />)

  const megabytesLayer = screen.getByLabelText(/^megabytes layer$/i)
  const trigger = within(megabytesLayer).getByRole('button', { name: /megabytes/i })
  const buyButton = within(megabytesLayer).getByRole('button', { name: /^buy/i })

  await user.click(buyButton)

  expect(trigger).toHaveAttribute('aria-expanded', 'false')
})

test('the Buy button shows a cost-block progress bar reflecting purchases so far', () => {
  seedMainGameState({
    resources: { base: 10_000 },
    purchased: { tier01: 4 },
  })
  render(<App />)

  const progressBar = screen.getByRole('progressbar', { name: /kilobytes cost-block progress/i })
  expect(progressBar).toHaveAttribute('aria-valuenow', '4')
  expect(progressBar).toHaveAttribute('aria-valuemax', '8')
  // The tier's level (lifetime purchase count) lives on the Buy button itself, not a separate cell.
  // 4 of 8 already done — 4 remain in the block; per-unit cost is 1,000, so 4 units cost $4,000 total.
  const buyButton = screen.getByRole('button', { name: /buy ×4 for 4,000 b \(0 completed levels, 4 of 8 purchased toward the next\)/i })
  expect(buyButton).toBeInTheDocument()
  expect(buyButton).toHaveTextContent('4,000 b')
  expect(buyButton).not.toHaveTextContent('+4/8')
  expect(buyButton).not.toHaveTextContent('+4')
  expect(screen.queryByText(/^level: /i)).not.toBeInTheDocument()
  // Regression check for the Button component's `variant` prop: it's consumed internally to
  // resolve a theme color and must never leak onto the rendered DOM node as a raw attribute.
  expect(buyButton).not.toHaveAttribute('variant')
})

test('manual Buy clicks buy as many units as are currently affordable, not just 1', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 100_000 },
  })
  render(<App />)

  // Per-unit cost 1,000: $100,000 affords far more than the 8-unit block, so the full block
  // (capped there, not by funds) is what's bought — $8,000 total.
  const buyButton = screen.getByRole('button', { name: /buy ×8 for 8,000 b\b/i })
  expect(buyButton).toBeEnabled()

  await user.click(buyButton)

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8\b/i)
  // MoneyHero (the "money display") switches to whole Bytes once the balance reaches 8000 Bits
  // (see engine.js's formatMoneyBalance) — 92,000 Bits = 11,500 Bytes.
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1.15e4 B')
  expect(screen.getByLabelText(/balance in bits/i)).toHaveTextContent('9.2e4 b')
})

test('manual Buy partially fills when funds only cover part of the cost block', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 3000 }, // affords 3 at $1,000/unit, not the full block of 8
  })
  render(<App />)

  const buyButton = screen.getByRole('button', { name: /buy ×3 for 3,000 b\b/i })
  expect(buyButton).toBeEnabled()

  await user.click(buyButton)

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 3\b/i)
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('0 b')
})

test('each tier name is rendered as a heading for screen-reader navigation', () => {
  seedMainGameState()
  render(<App />)

  expect(screen.getByRole('heading', { level: 3, name: /^kilobytes$/i })).toBeInTheDocument()
})

test('applies offline progress at 100% speed and shows no notice for an absence under the full-speed threshold', () => {
  seedMainGameState({
    resources: { base: 0 },
    owned: { tier01: 5, tier02: 1 },
    purchaseLevels: { tier01: 2 }, // level 1 purchased → Accelerate unlocked
  })
  // 100 real seconds ago, well under the 10-minute full-speed threshold → 100 simulated seconds at
  // 100% speed → Kilobytes delivers every 1s, so 100 deliveries land in that window → 500 Bytes,
  // with no notice shown.
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  render(<App />)

  expect(screen.getByRole('button', { name: /enable accelerate for 10 b/i })).toBeEnabled()
  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()
})

test('applies offline progress at 50% speed and shows a notice for an absence past the full-speed threshold', () => {
  seedMainGameState({
    resources: { base: 0 },
    owned: { tier01: 5, tier02: 1 },
    purchaseLevels: { tier01: 2 },
  })
  // 1000 real seconds ago, past the 10-minute full-speed threshold → 500 simulated seconds at 50%
  // speed → Kilobytes delivers every 1s, so 500 deliveries land in that window → 2,500 Bytes
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 1_000_000))

  render(<App />)

  expect(screen.getByRole('button', { name: /enable accelerate for 10 b/i })).toBeEnabled()
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()
})

test('dismissing the offline progress notice hides it', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 0 },
    owned: { tier01: 5 },
  })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 1_000_000))

  render(<App />)
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /dismiss offline progress notice/i }))

  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()
})

test('the offline progress notice shows a countdown on its Dismiss button and fades/auto-dismisses after 10 seconds', () => {
  vi.useFakeTimers()
  seedMainGameState({
    resources: { base: 0 },
    owned: { tier01: 5 },
  })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 1_000_000))

  const { unmount } = render(<App />)

  const progressBar = screen.getByRole('progressbar', { name: /time until this notice auto-dismisses/i })
  expect(progressBar).toHaveAttribute('aria-valuenow', '100')

  act(() => { vi.advanceTimersByTime(5_000) })
  const midway = Number(progressBar.getAttribute('aria-valuenow'))
  expect(midway).toBeLessThan(100)
  expect(midway).toBeGreaterThan(0)
  // Still present mid-countdown.
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  // Reaching the 10s deadline starts the fade; the notice is only actually removed once the
  // separate fade transition (400ms) also completes.
  act(() => { vi.advanceTimersByTime(5_000) })
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()
  act(() => { vi.advanceTimersByTime(400) })
  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('clicking Dismiss removes the offline progress notice immediately, without waiting for the fade', () => {
  vi.useFakeTimers()
  seedMainGameState({
    resources: { base: 0 },
    owned: { tier01: 5 },
  })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 1_000_000))

  const { unmount } = render(<App />)

  act(() => { vi.advanceTimersByTime(2_000) })
  fireEvent.click(screen.getByRole('button', { name: /dismiss offline progress notice/i }))

  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('shows no offline progress notice when there is no recorded last-save timestamp', () => {
  seedMainGameState({
    resources: { base: 10 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()
})

test('catches up a real-world gap detected mid-session by the live tick loop, without a page reload', () => {
  // Regression test: a tab/app merely backgrounded or suspended (never actually torn down) never
  // remounts <App/>, so computeInitialGame's one-shot mount check alone would silently skip this
  // gap entirely — the live tick loop must detect and catch it up on its own (see
  // BACKGROUND_TICK_GAP_THRESHOLD_SECONDS in useIncrementalGame.js).
  vi.useFakeTimers()
  seedMainGameState({
    resources: { base: 0 },
    owned: { tier01: 5, tier02: 1 },
    purchaseLevels: { tier01: 2 },
  })
  // No gap at mount — whatever notice appears below must come from the live tick loop, not
  // computeInitialGame's own check.
  localStorage.setItem('tens_last_save_timestamp', String(Date.now()))

  const { unmount } = render(<App />)
  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()

  // Jumps the clock forward 1000 real seconds (past the 10-minute full-speed threshold) without
  // advancing any pending timer (unlike vi.advanceTimersByTime, which would fire every
  // intermediate 100ms tick along the way, exactly as an actively foregrounded tab would) —
  // simulating the OS suspending the tab/app's timers while real time keeps passing in the
  // background.
  vi.setSystemTime(Date.now() + 1_000_000)
  // The tick interval's own next firing sees a ~1000s gap since its previous one and treats it as
  // offline progress instead of an ordinary tick.
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // 1000s real -> 500s simulated at 50% speed; Kilobytes' 1s tickspeed fits 500 deliveries into
  // that window -> 5 generators x 500 deliveries = 2,500 Bytes.
  expect(screen.getByRole('button', { name: /enable accelerate for 10 b/i })).toBeEnabled()
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('catches up a real-world gap as soon as the page becomes visible again, even before the tick interval next fires', () => {
  vi.useFakeTimers()
  seedMainGameState({
    resources: { base: 0 },
    owned: { tier01: 5, tier02: 1 },
    purchaseLevels: { tier01: 2 },
  })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now()))

  const { unmount } = render(<App />)
  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()

  vi.setSystemTime(Date.now() + 1_000_000)
  Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true })
  act(() => { document.dispatchEvent(new Event('visibilitychange')) })

  expect(screen.getByRole('button', { name: /enable accelerate for 10 b/i })).toBeEnabled()
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('the first time money reaches a googol, a mandatory full-screen prompt offers Prestige', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
  })
  render(<App />)

  const overlay = screen.getByRole('dialog', { name: /purge required/i })
  expect(within(overlay).getByRole('heading', { name: /disk full/i })).toBeInTheDocument()
  expect(within(overlay).getByLabelText(/^purge reward$/i)).toHaveTextContent(/\+1\s*Purge Point · spend in Firmware/)
  const purgeButton = screen.getByRole('button', { name: /purge now/i })
  expect(purgeButton).toBeEnabled()

  await user.click(purgeButton)

  expect(screen.queryByRole('dialog', { name: /purge required/i })).not.toBeInTheDocument()
  // mainGameUnlocked is now PERMANENT (see latchMainGameUnlocked in engine.js) — a real Prestige
  // keeps the Byte Foundry's Data Stream balance and never re-gates it, so the app stays on
  // Factory rather than navigating back to the Byte Foundry — see the dedicated Byte-Foundry/
  // Prestige interaction tests further down for the full assertions.
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i })).toBeInTheDocument()
})

test('from the 2nd prestige onward, reaching a googol shows a top banner instead of the full-screen prompt', () => {
  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  expect(screen.queryByRole('dialog', { name: /purge required/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^purge available banner$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /purge \(requires/i })).toBeEnabled()
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i }).closest('header')).toBeNull()
})

test('the sticky PP display doubles as a Prestige button once Prestige is available', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /^purge points display$/i }))

  expect(screen.queryByLabelText(/^purge available banner$/i)).not.toBeInTheDocument()
})

test('the sticky PP display is not a clickable button before Prestige is available', () => {
  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 5, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^purge points display$/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /^purge points display$/i })).not.toBeInTheDocument()
})

test('production and every other control freeze once money reaches a googol', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
    owned: { tier01: 5 },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /^buy/i })).toBeDisabled()
  await openSettings(user)
  expect(screen.getByRole('button', { name: /reset game/i })).toBeDisabled()
})

test('the Scale Up panel is always shown, unlike the Overclock panel which stays hidden before the last tier unlocks', () => {
  seedMainGameState({
    resources: { base: 10 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^scale up panel$/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/^overclock panel$/i)).not.toBeInTheDocument()
})

test('the Scale Up button is disabled below the first tier\'s required completed-level count (3)', () => {
  seedMainGameState({
    resources: { base: 10 },
    purchaseLevels: { tier01: 3 }, // 2 completed levels — one short of the 3 required
  })
  render(<App />)

  expect(screen.getByLabelText(/^scale up panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /scale up \(requires 3 completed kilobytes levels/i })).toBeDisabled()
})

test('the Scale Up button is enabled once the first tier completes 3 levels', () => {
  seedMainGameState({
    resources: { base: 10 },
    purchaseLevels: { tier01: 4 }, // 3 completed levels — meets the first Scale Up's requirement
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /scale up \(requires 3 completed kilobytes levels/i })).toBeEnabled()
})

test('the second Scale Up targets the next tier and still requires 3 completed levels', () => {
  seedMainGameState({
    resources: { base: 10 },
    purchaseLevels: { tier01: 4, tier02: 3 }, // Megabytes at 2 completed — still short of 3
    scaleUpTargetTierIndex: 1,
    scaleUpCount: 1,
  })
  render(<App />)

  const button = screen.getByRole('button', { name: /scale up \(requires 3 completed megabytes levels/i })
  expect(button).toBeDisabled()
  expect(screen.queryByRole('button', { name: /scale up \(requires .*kilobytes/i })).not.toBeInTheDocument()
})

test('after the tenth Scale Up claims the final tier, the next requirement advances to 6 completed levels', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3, tier10: 7 }, // 6 completed — meets the second claim's requirement
    scaleUpTargetTierIndex: 10,
    scaleUpCount: 10,
  })
  render(<App />)

  const button = screen.getByRole('button', { name: /scale up \(requires 6 completed quettabytes levels/i })
  expect(button).toBeEnabled()
})

test('a Scale Up that will reveal TB says so explicitly — "🔓 TB" beside the card name', () => {
  // Target = Gigabytes (index 2) → its successor is Terabytes (TB).
  seedMainGameState({
    resources: { base: 10 },
    purchaseLevels: { tier03: 4 },
    scaleUpTargetTierIndex: 2,
    everUnlockedTierIds: { tier03: true },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /scale up \(requires 3 completed gigabytes levels\) — doubles production for tiers unlocked so far and unlocks tb/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^scale up panel$/i)).toHaveTextContent('🏭 ×2 · 🔓 TB')
})

test('the Scale Up card shows its ×2 effect beside the name, and its button only the tier and completed-level progress', () => {
  seedMainGameState({
    resources: { base: 10 },
    purchaseLevels: { tier01: 2 }, // 1 completed of the 3 the third Scale Up requires
    scaleUpCount: 2,
  })
  render(<App />)

  // The action always doubles currently unlocked tiers, regardless of prior activation count;
  // the requirement is named in COMPLETED levels of the current target tier — still the flat 3
  // every one of the first ten claims uses (see getScaleUpRequirement).
  expect(screen.getByRole('button', {
    name: /scale up \(requires 3 completed kilobytes levels\) — doubles production for tiers unlocked so far/i,
  })).toBeInTheDocument()
  expect(screen.getByLabelText(/^scale up panel$/i)).toHaveTextContent('Scale Up🏭 ×2')
  expect(screen.getByRole('button', { name: /^scale up \(requires/i })).toHaveTextContent('⏩ KB 1/3')
})

test('the Scale Up card\'s details line is collapsed until the heading is clicked', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: 10 },
    purchaseLevels: { tier01: 2 },
  })
  render(<App />)

  const line = screen.getByText(/resets tiers and doubles production of every tier unlocked so far/i)
  expect(line).not.toBeVisible()

  await user.click(screen.getByRole('heading', { level: 2, name: 'Scale Up' }))
  expect(line).toBeVisible()
})

test('the scale up and overclock panels render below the tier list, not above it', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3 },
  })
  render(<App />)

  const regions = screen.getAllByRole('region').map(region => region.getAttribute('aria-label'))
  expect(regions.indexOf('scale up panel')).toBeGreaterThan(regions.indexOf('Kilobytes layer'))
  expect(regions.indexOf('overclock panel')).toBeGreaterThan(regions.indexOf('Kilobytes layer'))
})

test('once the last tier has been a Scale Up target, a separate Restage panel appears beside Accelerate above the tier list, and the last tier keeps its own tickspeed button', () => {
  seedMainGameState({
    resources: { base: 12345, tier10: 25 },
    owned: { tier09: 10, tier10: 25 },
    purchaseLevels: { tier01: 2, tier09: 3, tier10: 2 },
    scaleUpTierCounts: { tier10: 1 },
    scaleUpTargetTierIndex: 9,
    purge: { xp: 37, points: 0, count: 0, highestMilestone: 0 },
  })
  render(<App />)

  const regions = screen.getAllByRole('region').map(region => region.getAttribute('aria-label'))
  expect(regions).toContain('global accelerate panel')
  expect(regions.indexOf('global accelerate panel')).toBeLessThan(regions.indexOf('Kilobytes layer'))
  // Restage pairs with Accelerate above the tier list (#1137); Scale Up pairs with Overclock below it.
  expect(regions.indexOf('restage panel')).toBeGreaterThan(regions.indexOf('global accelerate panel'))
  expect(regions.indexOf('restage panel')).toBeLessThan(regions.indexOf('Kilobytes layer'))
  expect(regions.indexOf('scale up panel')).toBeGreaterThan(regions.indexOf('Kilobytes layer'))

  const xpPanel = screen.getByLabelText(/^restage panel$/i)
  expect(xpPanel).toHaveTextContent('QB +1%/XP')
  const xpButton = within(xpPanel).getByRole('button', { name: /consume 37 xp for .* quettabytes tickspeed/i })
  expect(xpButton).toHaveTextContent('🧬')
  expect(xpButton).toBeEnabled()

  const quettabytesLayer = screen.getByLabelText(/^quettabytes layer$/i)
  expect(within(quettabytesLayer).queryByRole('button', { name: /consume .* xp/i })).toBeNull()
  expect(within(quettabytesLayer).getByRole('button', { name: /tickspeed multiplier \(\+10% faster ticks\) for 10 QB/i })).toBeEnabled()
})

test('the Restage panel is hidden before the last tier has been a Scale Up target', () => {
  seedMainGameState({
    resources: { base: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purge: { xp: 37, points: 0, count: 0, highestMilestone: 0 },
  })
  render(<App />)
  expect(screen.queryByLabelText(/^restage panel$/i)).toBeNull()
})

test('the Restage button stays clickable at 0 owned last-tier units and warns before Restaging', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)
  seedMainGameState({
    resources: { base: 12345 },
    owned: { tier09: 10, tier10: 0 },
    purchaseLevels: { tier09: 3, tier10: 2 },
    scaleUpTierCounts: { tier10: 1 },
    purge: { xp: 37, points: 0, count: 0, highestMilestone: 0 },
  })
  render(<App />)

  const xpPanel = screen.getByLabelText(/^restage panel$/i)
  const restage = within(xpPanel).getByRole('button', { name: /consume 37 xp for .* quettabytes tickspeed/i })
  expect(restage).toBeEnabled()
  await user.click(restage)
  expect(window.confirm).toHaveBeenCalledWith(expect.stringMatching(/you own no quettabytes, so nothing will be left producing/i))
  expect(within(xpPanel).getByRole('button', { name: /consume 0 xp/i })).toBeDisabled()
})

test('clicking Scale Up once eligible resets resources but advances the target to the next tier', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 12345 },
    purchaseLevels: { tier01: 4 }, // 3 completed levels — meets the first requirement
  })
  render(<App />)

  const scaleUpButton = screen.getByRole('button', { name: /scale up \(requires 3 completed kilobytes levels/i })
  expect(scaleUpButton).toBeEnabled()

  await user.click(scaleUpButton)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  // Scale Up resets owned/purchaseLevels for every tier and advances the target to the next tier
  // (Megabytes), whose first-claim requirement remains 3 completed levels.
  expect(screen.getByLabelText(/^scale up panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /scale up \(requires 3 completed megabytes levels/i })).toBeDisabled()
})

test('Scale Up resets the global tickspeed multiplier level back to not-yet-bought', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 12345 },
    owned: { tier02: 1, tier09: 10, tier10: 25 },
    // Accelerate is unlocked by tier01's own completed level 1 (purchaseLevels 2) — which a Scale
    // Up also resets, so the card drops back to its not-yet-revealed state entirely.
    purchaseLevels: { tier01: 4, tier09: 3, tier10: 6 },
    globalTickspeedMultiplier: 2,
  })
  render(<App />)

  // The cumulative bonus only shows in the expanded description, not the button itself — the
  // description stays in the DOM (and toHaveTextContent-visible) even while collapsed.
  expect(screen.getByLabelText(/^global accelerate panel$/i)).toHaveTextContent(/faster ticks on every tier/i)

  await user.click(screen.getByRole('button', { name: /scale up \(requires 3 completed kilobytes levels/i }))

  // tier01 resets to 0 completed levels and the multiplier level resets to null — the card
  // itself stays on screen (progressive-disclosure latch: once revealed it never disappears
  // again) but drops back to its not-yet-active "Enable" state, same as a save that never
  // bought it.
  expect(screen.getByLabelText(/^global accelerate panel$/i)).not.toHaveTextContent(/faster ticks on every tier/i)
  expect(screen.getByRole('button', { name: /enable accelerate for 10 b/i })).toBeDisabled()
})

test('the Scale Up button is disabled once production freezes at a googol', () => {
  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3, tier10: 2 },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /scale up \(requires 3 completed kilobytes levels/i })).toBeDisabled()
})

test('no Auto Scale Up control appears during the first run, even with the last tier unlocked', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
  })
  render(<App />)

  expect(screen.queryByRole('button', { name: /enable auto scale up/i })).not.toBeInTheDocument()
  expect(screen.queryByText(/auto scale up active/i)).not.toBeInTheDocument()
})

test('the Overclock panel stays hidden before the last tier unlocks', () => {
  seedMainGameState({
    resources: { base: 10 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^overclock panel$/i)).not.toBeInTheDocument()
})

test('the Overclock panel appears once the last tier unlocks, with the button disabled below the required completed-level count', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    // Last claim was taken at 3 completed levels -> this one's requirement is 7 (3 + 4).
    purchaseLevels: { tier09: 3, tier10: 3 }, // 2 completed — short
    overclockLastClaimCompletedLevels: 3,
  })
  render(<App />)

  expect(screen.getByLabelText(/^overclock panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /overclock \(requires 7 completed quettabytes levels/i })).toBeDisabled()
  expect(screen.getByRole('progressbar', { name: /overclock progress/i })).toHaveAttribute('aria-valuenow', '29')
})

test('the Overclock button is enabled once the last tier reaches the required completed-level count', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3, tier10: 8 }, // 7 completed — meets lastClaim(3) + 4
    overclockLastClaimCompletedLevels: 3,
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /overclock \(requires 7 completed quettabytes levels/i })).toBeEnabled()
})

test('the first Overclock claim of a cycle is never free — a completely untouched last tier (0 completed levels) is not enough', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /overclock \(requires 5 completed quettabytes levels/i })).toBeDisabled()
})

test('the next Overclock requires four more completed levels than the count the previous claim was taken at', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    // Claimed at 7 completed before -> next requirement is 11: at 9 completed it's still off.
    purchaseLevels: { tier09: 3, tier10: 10 },
    overclockLastClaimCompletedLevels: 7,
  })
  render(<App />)

  const button = screen.getByRole('button', { name: /overclock \(requires 11 completed quettabytes levels/i })
  expect(button).toBeDisabled()
})

test('the Overclock button shows the per-level Overclock effect and completed-level progress on itself', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    // Previous claim at 4 completed -> requirement 8; the last tier is already at exactly 8.
    purchaseLevels: { tier09: 3, tier10: 9 },
    overclockLastClaimCompletedLevels: 4,
  })
  render(<App />)

  // The button shows the fixed per-level effect (×1.1) and completed/required last-tier levels — no
  // computed total rate.
  expect(screen.getByRole('button', {
    name: /overclock \(requires 8 completed quettabytes levels\) — resets scale up's bonus; each completed quettabytes level \(8 now\) multiplies the per-level speed bonus by ×1\.1/i,
  })).toBeInTheDocument()
  expect(screen.getByLabelText(/^overclock panel$/i)).toHaveTextContent('🌐 +10%/lvl')
  expect(screen.getByRole('button', { name: /^overclock \(requires/i })).toHaveTextContent('⚡ QB 8/8')
})

test('Accelerate shows the actual live per-level effect beside the name (Overclock-scaled), and the plain 1% before any Overclock', () => {
  seedMainGameState({
    resources: { base: 999 },
    globalTickspeedMultiplier: 1,
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3, tier10: 8 },
    overclockLastClaimCompletedLevels: 4,
  })
  render(<App />)

  const panel = screen.getByLabelText(/^global accelerate panel$/i)
  // Overclock level 4 → 1% × 1.1^4 ≈ 1.46% per level.
  expect(panel).toHaveTextContent('🏭 +1.46%/lvl')
  expect(panel).not.toHaveTextContent('+1%/lvl')
})

test('the Overclock card\'s disclosure states the current per-level Tickspeed rate once claimed', () => {
  // The disclosure's live-state line stays in the DOM (queryable via toHaveTextContent) even
  // while collapsed by default — same convention every other live-state disclosure on this page
  // follows — so no expand click is needed here.
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3, tier10: 12 },
    overclockLastClaimCompletedLevels: 10,
  })

  render(<App />)

  const panel = screen.getByLabelText(/^overclock panel$/i)
  expect(panel).toHaveTextContent(/the per-level speed bonus is now 2\.59% \(was 1%\)\./i)
})

test('the Overclock card\'s "(was …)" baseline ignores a legacy overclockCount', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3, tier10: 12 },
    overclockCount: 10,
  })
  render(<App />)
  expect(screen.getByLabelText(/^overclock panel$/i)).toHaveTextContent(/\(was 1%\)/i)
})

test('the Overclock card\'s disclosure explains it is unclaimed (no current-rate line) before the first claim', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3, tier10: 1 },
  })

  render(<App />)

  const panel = screen.getByLabelText(/^overclock panel$/i)
  expect(panel).not.toHaveTextContent(/rate is now/i)
  expect(panel).toHaveTextContent(/not claimed yet — reach 5 completed quettabytes levels/i)
})

test('clicking Overclock once eligible records the last tier\'s whole completed-level count, wipes the Scale Up bonus, and keeps the panel visible (disabled) rather than hiding it again', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purchaseLevels: { tier10: 8 }, // 7 completed — the player kept climbing past the 5 minimum
    scaleUpCount: 5,
  })
  render(<App />)

  // Each Scale Up action advertises the ×2 applied to eligible tiers.
  expect(screen.getByLabelText(/^scale up panel$/i)).toHaveTextContent('🏭 ×2')

  const overclockButton = screen.getByRole('button', { name: /overclock \(requires 5 completed quettabytes levels\b/i })
  expect(overclockButton).toBeEnabled()

  await user.click(overclockButton)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  // Overclock resets owned counts too, so the last tier is no longer unlocked — but since both
  // panels were already revealed once, they stay visible (in a disabled state) rather than
  // disappearing again. The claim recorded all 7 completed levels (not just the 5 minimum), so the
  // next cycle requires 10 (the actual claim count + 3) — and Scale Up's own stacking bonus is
  // wiped back to ×2 (scaleUpCount reset to 0, so the *next* activation would only reach ×2
  // again).
  expect(screen.getByLabelText(/^overclock panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /overclock \(requires 10 completed quettabytes levels/i })).toBeDisabled()
  expect(screen.getByLabelText(/^overclock panel$/i)).toHaveTextContent(/speed bonus is now 1\.95% \(was 1%\)\./i)
  expect(screen.getByLabelText(/^scale up panel$/i)).toHaveTextContent('🏭 ×2')
})

test('the Overclock button is disabled once production freezes at a googol', () => {
  seedMainGameState({
    resources: { base: PURGE_THRESHOLD },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    purchaseLevels: { tier09: 3, tier10: 10 },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /overclock \(requires 5 completed quettabytes levels/i })).toBeDisabled()
})

test('Firmware groups by feature: Automation holds every automation, Prestige the standalone perks', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText(/^global automation category$/i)).toHaveTextContent(/global automation/i)
  expect(screen.getByLabelText(/^tier autobuyers category$/i)).toHaveTextContent(/tier autobuyers/i)
  // Each tier's two autobuyers share one card, in the Factory row's positions: ⚙ tickspeed left, 🤖 buy right.
  expect(screen.queryByLabelText(/^tier tickspeed autobuyers category$/i)).not.toBeInTheDocument()
  const kbCard = screen.getByLabelText(/^kilobytes automation$/i)
  const halves = within(kbCard).getAllByLabelText(/^kilobytes (tickspeed )?autobuyer$/i).map(el => el.getAttribute('aria-label'))
  expect(halves).toEqual(['Kilobytes tickspeed autobuyer', 'Kilobytes autobuyer'])
  expect(screen.queryByLabelText(/^purge points category$/i)).not.toBeInTheDocument()

  await user.click(screen.getByRole('tab', { name: /open prestige/i }))
  expect(screen.getByLabelText(/^purge points category$/i)).toHaveTextContent(/compression/i)
  expect(screen.getByLabelText(/^purchasing category$/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/^global automation category$/i)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/^production speed bonus upgrade$/i)).not.toBeInTheDocument()
  expect(screen.getByRole('tab', { name: /open prestige/i })).toHaveAttribute(
    'title',
    'Prestige — Speed bonus, Sleep mode, Compression, playtime bonus, Overflow mode and Buy max',
  )
})

test.each([
  { name: 'Auto Accelerate', milestone: 8 },
  { name: 'Auto Restage', milestone: 32 },
  { name: 'Auto Scale Up', milestone: 16 },
  { name: 'Auto Overclock', milestone: 64 },
  { name: 'Auto Purge', milestone: 128 },
])('$name unlocks at Purge $milestone with no PP cost: locked badge before, active row after', async ({ name, milestone }) => {
  const user = userEvent.setup()
  const rowName = new RegExp(`^${name} unlocks at purge ${milestone}$`, 'i')

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 1000, count: milestone - 1, highestMilestone: 1 },
  })
  const { unmount } = render(<App />)
  await openPerksTab(user, /open automation/i)
  expect(screen.getByLabelText(rowName)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: new RegExp(`enable ${name}`, 'i') })).not.toBeInTheDocument()
  unmount()
  cleanup()
  localStorage.clear()

  const flag = { 'Auto Accelerate': 'autoGlobalTickspeed', 'Auto Restage': 'autoXpTickspeed', 'Auto Scale Up': 'autoScaleUp', 'Auto Overclock': 'autoOverclock', 'Auto Purge': 'autoPurge' }[name]
  seedMainGameState({
    resources: { base: 10 },
    [flag]: true,
    ...(name === 'Auto Purge' ? { autoPurge: 1 } : {}),
    purge: { xp: 0, points: 1000, count: milestone, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)
  expect(screen.getByLabelText(`${name} active`)).toBeInTheDocument()
  expect(screen.queryByLabelText(rowName)).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^purge points display$/i)).toHaveTextContent('1,000 PP')
})

test('Power pre-selects the highest automated tier on arrival', () => {
  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeMergePageUnlocked: true, autoMergeCoresIntoNode: true, autoMergeNodesIntoCluster: true },
  })
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open power/i }))
  expect(within(screen.getByLabelText(/^batteries tier$/i)).getByLabelText(/^compute boost$/i)).toBeInTheDocument()
  expect(within(screen.getByLabelText(/^cells tier$/i)).queryByLabelText(/^compute boost$/i)).not.toBeInTheDocument()
})

test('Auto Boost needs no purchase: its preset preference appears on Firmware (not Power) once any charge is automated', () => {
  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY },
  })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open power/i }))
  expect(screen.queryByRole('group', { name: /auto boost preference/i })).not.toBeInTheDocument()
  unmount()
  cleanup()
  localStorage.clear()

  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeMergePageUnlocked: true, autoMergeCoresIntoNode: true },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  // The Auto Boost switch and preset live on Firmware, never on Power.
  openPerksTabSync(/open automation/i)
  expect(screen.getByRole('group', { name: /auto boost preference/i })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /open power/i }))
  expect(screen.queryByRole('group', { name: /auto boost preference/i })).not.toBeInTheDocument()
})

test('Auto-charge is bought per tier on Power, but its single pause switch lives on Firmware → Automation', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeMergePageUnlocked: true, autoMergeCoresIntoNode: true },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  await openPerksTab(user, /open automation/i)
  const toggle = screen.getByRole('button', { name: /^auto-charge$/i })
  expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await user.click(toggle)
  expect(screen.getByRole('button', { name: /^auto-charge$/i })).toHaveAttribute('aria-pressed', 'false')
  expect(JSON.parse(localStorage.getItem('tens_game_state')).computeAutoChargeEnabled).toBe(false)
})

test('Auto Boost has its on/off Switch on Firmware → Automation (not on Power)', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeMergePageUnlocked: true, autoMergeCoresIntoNode: true },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  fireEvent.click(screen.getByRole('button', { name: /open power/i }))
  expect(screen.queryByRole('button', { name: /^auto boost$/i })).not.toBeInTheDocument()

  await openPerksTab(user, /open automation/i)
  const toggle = screen.getByRole('button', { name: /^auto boost$/i })
  expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await user.click(toggle)
  expect(screen.getByRole('button', { name: /^auto boost$/i })).toHaveAttribute('aria-pressed', 'false')
  expect(JSON.parse(localStorage.getItem('tens_game_state')).intro.computeAutoBoostEnabled).toBe(false)
})

test('buying Auto-charge before the first Prestige reveals Firmware, where the switches and preset live (Power has none)', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeMergePageUnlocked: true },
  })
  const { unmount } = render(<App />)
  expect(screen.queryByRole('button', { name: /^open firmware$/i })).not.toBeInTheDocument()
  unmount()
  cleanup()
  localStorage.clear()

  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeMergePageUnlocked: true, autoMergeCoresIntoNode: true },
  })
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open power/i }))
  expect(screen.queryByRole('button', { name: /^auto-charge$/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('group', { name: /auto boost preference/i })).not.toBeInTheDocument()

  await openPerksTab(user, /open automation/i)
  expect(screen.getByRole('button', { name: /^auto-charge$/i })).toHaveAttribute('aria-pressed', 'true')
  await user.click(screen.getByRole('button', { name: /set auto boost preference to eco/i }))
  expect(JSON.parse(localStorage.getItem('tens_game_state')).intro.computeAutoBoostType).toBe('sustain')
})

test('the Firmware Auto-charge switch is absent until a Power boundary has Auto-charge unlocked', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeMergePageUnlocked: true },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  await openPerksTab(user, /open automation/i)
  expect(screen.queryByRole('button', { name: /^auto-charge$/i })).not.toBeInTheDocument()
})

test('Upgrade Capacity and the selected Auto Boost preset render with the prestige (warn) variant', () => {
  const warn = themes.dark.color.warn
  seedIntroState({ bits: 5, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
  const { unmount } = render(<App />)
  expect(screen.getByRole('button', { name: /upgrade data stream capacity/i })).toHaveStyle({ color: warn })
  unmount()
  cleanup()
  localStorage.clear()
  seedIntroState({ capacity: 512, speedCapacity: 256, bits: 0, byteCreated: true })
  render(<App />)
  expect(screen.getByRole('button', { name: /upgrade data stream bitrate/i })).toHaveStyle({ color: warn })
  cleanup()
  localStorage.clear()

  seedMainGameState({
    intro: { mainGameUnlocked: true, byteCreated: true, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeMergePageUnlocked: true, autoMergeCoresIntoNode: true },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  openPerksTabSync(/open automation/i)
  const selected = within(screen.getByRole('group', { name: /auto boost preference/i }))
    .getAllByRole('button').find(b => b.getAttribute('aria-pressed') === 'true')
  expect(selected).toHaveStyle({ color: warn })
})

test('the global latency panel renders above the tier list, not below it', () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier02: 1 },
  })
  render(<App />)

  const regions = screen.getAllByRole('region').map(region => region.getAttribute('aria-label'))
  expect(regions.indexOf('global accelerate panel')).toBeLessThan(regions.indexOf('Kilobytes layer'))
})

test('a static "unlocked" badge shows on Firmware → Automation once Auto Scale Up has been bought', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    autoScaleUp: true,
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText('Auto Scale Up active')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable auto scale up/i })).not.toBeInTheDocument()
})

test('Auto Scale Up remains active at the final tier', async () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier09: 10 },
    everUnlockedTierIds: { tier01: true, tier10: true },
    autoScaleUp: true,
    scaleUpTargetTierIndex: TIER_DEFINITIONS.length - 1,
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^scale up panel$/i)).not.toHaveTextContent(/auto|paused/i)

  await openPerksTab(userEvent.setup(), /open automation/i)
  expect(screen.getByLabelText('Auto Scale Up active')).toBeInTheDocument()
  expect(screen.queryByLabelText('Auto Scale Up suspended at final tier')).not.toBeInTheDocument()
})

test('pausing Auto Scale Up via its toggle stops it from firing automatically, even once eligible; resuming fires it again', () => {
  vi.useFakeTimers()

  seedMainGameState({
    resources: { base: 12345 },
    purchaseLevels: { tier01: 4 }, // 3 completed levels — meets the first Scale Up's requirement
    autoScaleUp: true,
    autoScaleUpEnabled: false,
    automationAttemptBudgets: { scaleUp: 1 }, // interval timer already elapsed
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  const { unmount } = render(<App />)

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  // Still eligible (purchaseLevels.tier01 untouched) since Auto Scale Up starts paused.
  expect(screen.getByRole('button', { name: /scale up \(requires 3 completed kilobytes levels/i })).toBeEnabled()

  // The pause toggle lives on Firmware → Automation; the tick timer itself keeps running
  // regardless of which view is currently rendered.
  openPerksTabSync(/open automation/i)
  fireEvent.click(screen.getByRole('button', { name: /^Auto Scale Up automation$/i }))
  openFactorySync()
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // Scale Up fired automatically once resumed — resources reset and the target tier advances to
  // Megabytes, whose requirement is the same flat 3 completed levels every one of the first ten
  // claims uses (see getScaleUpRequirement).
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  expect(screen.getByRole('button', { name: /scale up \(requires 3 completed megabytes levels/i })).toBeDisabled()

  unmount()
  vi.useRealTimers()
})

test('no Global Accelerate panel appears before the second tier has ever been owned', () => {
  seedMainGameState({
    resources: { base: 10 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^global accelerate panel$/i)).not.toBeInTheDocument()
})

test('an Enable Accelerate button appears once level 1 of the first tier completes (even during the first run), and spends 10 Bytes to activate level 1', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 80 },
    purchaseLevels: { tier01: 2 },
  })
  render(<App />)

  const globalTickspeedButton = screen.getByRole('button', { name: /enable accelerate for 10 b/i })
  expect(globalTickspeedButton).toBeEnabled()

  await user.click(globalTickspeedButton)

  const upgradeButton = screen.getByRole('button', { name: /upgrade accelerate for 100 b/i })
  expect(upgradeButton).toBeInTheDocument()
  // The cumulative level/bonus shows only in the expanded description, never on the button
  // itself or the heading — both stay compact regardless of level.
  expect(upgradeButton).not.toHaveTextContent(/\+1%/i)
  expect(screen.getByRole('heading', { level: 2, name: 'Accelerate' })).not.toHaveTextContent(/\+1%/i)
  const panel = screen.getByLabelText(/^global accelerate panel$/i)
  // No level numbers anywhere — only the effect.
  expect(panel).not.toHaveTextContent(/lv\./i)
  // Level 1 is a regular (non-milestone) level, compounding the usual 1%.
  expect(panel).toHaveTextContent(/\+1%/i)
  // Accelerate spends Bits (10 B = 80 b) from the one shared balance.
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('0 b')
})

test('the Accelerate panel\'s bonus line is collapsed until the heading is clicked, and clicking the revealed line does not collapse it', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 999 },
    globalTickspeedMultiplier: 1,
  })
  render(<App />)

  const heading = screen.getByRole('heading', { level: 2, name: 'Accelerate' })
  const statusLine = screen.getByText(/faster ticks on every tier\./i)
  expect(statusLine).not.toBeVisible()

  await user.click(heading)
  expect(statusLine).toBeVisible()

  // Only the heading toggles — clicking the revealed line itself does nothing.
  await user.click(statusLine)
  expect(statusLine).toBeVisible()

  await user.click(heading)
  expect(statusLine).not.toBeVisible()
})

test('the Enable Accelerate button stays disabled without enough Bits', () => {
  seedMainGameState({
    resources: { base: 79 },
    purchaseLevels: { tier01: 2 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /enable accelerate for 10 b/i })).toBeDisabled()
})

test('the Accelerate Upgrade button costs another power of ten each level, and shows the compounding bonus with decimal precision below 100%', () => {
  seedMainGameState({
    resources: { base: 999 },
    globalTickspeedMultiplier: 2,
  })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade accelerate for 1,000 b/i })
  expect(upgradeButton).toBeDisabled()
  // The cumulative level/bonus shows only in the expanded description, not on the button itself.
  expect(upgradeButton).not.toHaveTextContent(/2\.01%/i)
  const panel = screen.getByLabelText(/^global accelerate panel$/i)
  // Level 2 is still below the first 10-level milestone — two regular 1% levels compounded
  // (1.01^2 ≈ ×1.0201) land on a fractional percentage, shown to 2 decimal places.
  expect(panel).toHaveTextContent(/\+2\.01%/i)
})

test('Accelerate level 10 stays on the same uniform compounded step as every other level — no separate milestone bonus', () => {
  seedMainGameState({
    resources: { base: 1e15 },
    globalTickspeedMultiplier: 10,
  })
  render(<App />)

  expect(screen.getByLabelText(/^global accelerate panel$/i)).toHaveTextContent(/\+10\.46%/i)
})

test('the global tickspeed bonus keeps fractional percent precision between milestones', () => {
  seedMainGameState({
    resources: { base: 1e15 },
    globalTickspeedMultiplier: 39,
  })
  render(<App />)

  expect(screen.getByLabelText(/^global accelerate panel$/i)).toHaveTextContent(/\+47\.41%/i)
})

test('the global tickspeed bonus switches to an "Nx" multiplier once uniform compounding crosses +100%', () => {
  seedMainGameState({
    resources: { base: 1e15 },
    globalTickspeedMultiplier: 70,
  })
  render(<App />)

  const panel = screen.getByLabelText(/^global accelerate panel$/i)
  expect(panel).toHaveTextContent(/2\.01x/i)
})

const ALL_TIER_IDS = ['tier01', 'tier02', 'tier03', 'tier04', 'tier05', 'tier06', 'tier07', 'tier08', 'tier09', 'tier10']
// Every tier smart AND tickspeed-automated (both require every tier's autobuyer already
// unlocked) is what unlocks the Auto-Prestige option in the UI at all — see MainPage's
// allTiersFullyAutomated gate.
const allTiersSmartSeed = () => ({
  owned: Object.fromEntries(ALL_TIER_IDS.slice(0, 9).map(id => [id, 10])),
  autobuyers: Object.fromEntries(ALL_TIER_IDS.map(id => [id, 1])),
  tierTickspeedAutobuyer: Object.fromEntries(ALL_TIER_IDS.map(id => [id, true])),
})

// Every automation's pause/resume toggle follows the same shape (bought → badge + pause button →
// pause flips the badge/aria-pressed → resume flips them back) — table-driven since only the seed
// state and aria-label/name strings differ per automation.
test.each([
  {
    name: 'Auto Accelerate',
    seed: { owned: { tier09: 10 }, autoGlobalTickspeed: true },
    pauseName: /^Auto Accelerate automation$/i,
    resumeName: /^Auto Accelerate automation$/i,
  },
  {
    name: 'Auto Scale Up',
    seed: { owned: { tier09: 10 }, autoScaleUp: true },
    pauseName: /^Auto Scale Up automation$/i,
    resumeName: /^Auto Scale Up automation$/i,
  },
  {
    name: 'Auto Restage',
    seed: { owned: { tier09: 10 }, autoXpTickspeed: true },
    pauseName: /^Auto Restage automation$/i,
    resumeName: /^Auto Restage automation$/i,
  },
  {
    name: 'Auto Purge',
    seed: { ...allTiersSmartSeed(), autoPurge: 1 },
    pauseName: /^Auto Purge automation$/i,
    resumeName: /^Auto Purge automation$/i,
  },
  {
    name: "Kilobytes's tickspeed autobuyer",
    seed: { autobuyers: { tier01: 1 }, tierTickspeedAutobuyer: { tier01: true } },
    pauseName: /^Kilobytes's tickspeed autobuyer$/i,
    resumeName: /^Kilobytes's tickspeed autobuyer$/i,
  },
])('a pause toggle appears beside the $name badge once bought on Firmware → Automation, and pausing/resuming updates it', async ({ seed, pauseName, resumeName, name }) => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
    ...seed,
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  const pauseButton = screen.getByRole('button', { name: pauseName })
  expect(pauseButton).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByLabelText(`${name} active`)).toBeInTheDocument()

  await user.click(pauseButton)

  expect(screen.getByLabelText(`${name} paused`)).toBeInTheDocument()
  const resumeButton = screen.getByRole('button', { name: resumeName })
  expect(resumeButton).toHaveAttribute('aria-pressed', 'false')

  await user.click(resumeButton)

  expect(screen.queryByLabelText(`${name} paused`)).not.toBeInTheDocument()
  expect(screen.getByLabelText(`${name} active`)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: pauseName })).toHaveAttribute('aria-pressed', 'true')
})

test('Global Automation lists every step with its Purge milestone while locked', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  for (const [name, milestone] of [['Auto Accelerate', 8], ['Auto Scale Up', 16], ['Auto Restage', 32], ['Auto Overclock', 64], ['Auto Purge', 128]]) {
    expect(screen.getByLabelText(`${name} unlocks at Purge ${milestone}`)).toBeInTheDocument()
  }
})

test('Firmware lists global automations in one order: Auto Accelerate → Scale Up → Restage → Overclock → Purge', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
    autoGlobalTickspeed: true,
    autoScaleUp: true,
    autoOverclock: true,
    autoPurge: 1,
    autoXpTickspeed: true,
  })
  render(<App />)
  const order = ['auto accelerate', 'auto scale up', 'auto restage', 'auto overclock', 'auto purge']
  await openPerksTab(user, /open automation/i)
  const rows = within(screen.getByLabelText('global automation category')).getAllByLabelText(/ row$/)
  expect(rows.map(row => row.getAttribute('aria-label'))).toEqual(order.map(name => `${name} row`))
  // Visible labels drop the redundant "Auto" (the category heading says it); accessible names keep it.
  expect(rows.map(row => row.textContent)).toEqual(['Accelerate', 'Scale Up', 'Restage', 'Overclock', 'Purge'].map(n => expect.stringContaining(n)))
  rows.forEach(row => expect(row).not.toHaveTextContent(/auto/i))
  expect(screen.getByRole('button', { name: /^Auto Accelerate automation$/i })).toBeInTheDocument()
})

test('Auto Purge offers no speed upgrade or interval until it is bought', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.queryByRole('button', { name: /upgrade auto purge speed/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^auto purge row$/i)).not.toHaveTextContent(/1024s/)
})

test('Auto-Prestige is active from Purge 128 and its row carries the interval and the speed upgrade', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    ...allTiersSmartSeed(),
    challenges: { completed: { F25: true } },
    autoOverclock: true,
    autoPurge: 1,
    purge: { xp: 0, points: 64, count: 128, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText(/^auto purge row$/i)).toHaveTextContent('1024s')
  expect(screen.getByRole('button', { name: /upgrade auto purge speed to level 1 for 64 purge points/i })).toBeInTheDocument()
})

test('no pause toggle appears for Auto-Prestige before it has ever been activated', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    ...allTiersSmartSeed(),
    purge: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.queryByRole('button', { name: /^auto purge automation$/i })).not.toBeInTheDocument()
})

test('the Auto-Prestige speed upgrade starts at 64 PP, and stays disabled without enough points', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    ...allTiersSmartSeed(),
    challenges: { completed: { F25: true } },
    autoPurge: 1,
    purge: { xp: 0, points: 63, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText(/^auto purge row$/i)).toHaveTextContent('1024s')
  expect(screen.getByRole('button', { name: /upgrade auto purge speed to level 1 for 64 purge points/i })).toBeDisabled()
})

test('purge points and the production speed bonus are shown once the first Purge is done', () => {
  seedMainGameState({
    resources: { base: 10 },
    prestigeSpeedBonusUnlocked: true,
    purge: { xp: 0, points: 50, count: 100, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^purge points display$/i)).toHaveTextContent('50 PP')
  expect(screen.getByLabelText(/^purge points display$/i)).toHaveTextContent('3x production speed')
})

test('Firmware → Prestige teaches PP with a tutorial: the first 1 PP buys the permanent speed bonus', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 1, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open prestige/i)

  expect(screen.getByLabelText(/^purge points tutorial$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^speed bonus value$/i)).toHaveTextContent('Production ×1 → ×1.1')
  await user.click(screen.getByRole('button', { name: /unlock speed bonus for 1 purge points/i }))

  expect(screen.queryByLabelText(/^purge points tutorial$/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^purge points display$/i)).toHaveTextContent('0 PP')
  expect(screen.getByLabelText(/^speed bonus value$/i)).toHaveTextContent(/^Production ×1\.1$/)
})

test('Firmware → Prestige upgrade names expand their description; values show now → after', async () => {
  const user = userEvent.setup()
  seedMainGameState({ resources: { base: 10 }, purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 }, buyMaxUnlocked: false })
  render(<App />)
  await openPerksTab(user, /open prestige/i)

  expect(screen.getByLabelText(/^sleep mode value$/i)).toHaveTextContent('Time away: up to 4h → 8h')
  expect(screen.getByLabelText(/^cache warm value$/i)).toHaveTextContent('Start runs with KB level 1 done')
  expect(screen.getByLabelText(/^buy max value$/i)).toHaveTextContent('Buy every affordable level in one tap')
  expect(screen.queryByLabelText(/^sleep mode description$/i)).not.toBeInTheDocument()
  const toggle = screen.getByRole('button', { name: /^sleep mode details$/i })
  await user.click(toggle)
  expect(toggle).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByLabelText(/^sleep mode description$/i)).toHaveTextContent('4 / 40 / 400 / 4,000 / 4e4 PP')
  await user.click(toggle)
  expect(screen.queryByLabelText(/^sleep mode description$/i)).not.toBeInTheDocument()
})

test.each([
  ['Buy max', /unlock buy max for 2 purge points/i, 2, /buy max mode toggle|buy max/i],
  ['Cache Warm', /unlock cache warm for 20 purge points/i, 20, /cache warm unlocked/i],
])('%s is bought with PP on Firmware → Prestige', async (_name, button, cost, ownedLabel) => {
  const user = userEvent.setup()
  seedMainGameState({ resources: { base: 10 }, purge: { xp: 0, points: cost, count: 1, highestMilestone: 1 }, buyMaxUnlocked: false })
  render(<App />)
  await openPerksTab(user, /open prestige/i)
  await user.click(screen.getByRole('button', { name: button }))
  expect(screen.getByLabelText(/^purge points display$/i)).toHaveTextContent('0 PP')
  expect(screen.queryByRole('button', { name: button })).not.toBeInTheDocument()
  expect(screen.getAllByLabelText(ownedLabel).length).toBeGreaterThan(0)
})

test('Sleep mode levels are bought with PP until the 24h maximum', async () => {
  const user = userEvent.setup()
  seedMainGameState({ resources: { base: 10 }, purge: { xp: 0, points: 40000, count: 1, highestMilestone: 1 }, sleepModeCapLevel: 4 })
  render(<App />)
  await openPerksTab(user, /open prestige/i)
  expect(screen.getByLabelText(/^sleep mode value$/i)).toHaveTextContent('Time away: up to 20h → 24h')
  await user.click(screen.getByRole('button', { name: /buy sleep mode level 5 for 4e4 purge points/i }))
  expect(screen.getByLabelText(/^sleep mode value$/i)).toHaveTextContent(/^Time away: up to 24h$/)
  expect(screen.getByLabelText(/^sleep mode unlocked$/i)).toBeInTheDocument()
})

test('the playtime bonus is unlocked for 100 PP on Firmware → Prestige', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 150, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open prestige/i)

  await user.click(screen.getByRole('button', { name: /unlock playtime bonus for 100 purge points/i }))

  expect(screen.getByLabelText('Playtime bonus unlocked')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /unlock playtime bonus/i })).not.toBeInTheDocument()
})

test('locked global automations report Purge progress toward their milestone', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 10, count: 10, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  const progress = screen.getByRole('progressbar', { name: /auto scale up unlock milestone progress/i })
  expect(progress).toHaveAttribute('aria-valuenow', '10')
  expect(progress).toHaveAttribute('aria-valuemax', '16')
})

test('a locked badge appears on Firmware → Automation for a tier whose autobuyer milestone has not been reached yet', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    // tier01's autobuyer unlocks at Purge 1; tier02's milestone (Purge 2) isn't met yet at count 1.
    owned: { tier01: 16 }, // fully purchases two levels, unlocking Megabytes
    everUnlockedTierIds: { tier01: true, tier02: true },
    purge: { xp: 0, points: 100, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText(/^megabytes's autobuyer unlocks at purge 2$/i)).toBeInTheDocument()
})

test('a tier\'s autobuyer auto-unlocks (no PP spent) once its prestige milestone is reached', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier01: 16 },
    everUnlockedTierIds: { tier01: true, tier02: true },
    purge: { xp: 0, points: 2000, count: 2, highestMilestone: 1 }, // meets megabytes' milestone (2)
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.queryByLabelText(/^megabytes's autobuyer unlocks at purge/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText("Megabytes's autobuyer active")).toBeInTheDocument()
  // Confirms no PP was spent to reach this state — the milestone unlock is free.
  expect(screen.getByLabelText(/^purge points display$/i)).toHaveTextContent(/2,?000 PP/)
})

test('no PP tabs or PP-based controls appear before the player has ever purged, even with an active autobuyer and unspent PP — Milestones stays via More', async () => {
  const user = userEvent.setup()
  seedMainGameState({
    resources: { base: 10 },
    autobuyers: { tier01: 1 },
    purge: { xp: 0, points: 5, count: 0, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^purge points display$/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /^open firmware$/i })).not.toBeInTheDocument()
  // Chapters (Milestones) stays reachable pre-prestige via AppNav → More.
  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open milestones/i }))
  expect(screen.getByLabelText(/^milestones page$/i)).toBeInTheDocument()
})

test('a tier\'s tickspeed autobuyer shows a locked badge until its own (later) prestige milestone is reached, independent of the unit-buying autobuyer', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    autobuyers: { tier01: 1 }, // the unit-buying autobuyer is already unlocked
    purge: { xp: 0, points: 1000, count: 10, highestMilestone: 1 }, // one short of Kilobytes's tickspeed milestone (11)
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText(/^kilobytes's tickspeed autobuyer unlocks at purge 11$/i)).toBeInTheDocument()
})

test('a tier\'s tickspeed autobuyer auto-unlocks (no PP spent) once its own prestige milestone is reached', async () => {
  seedMainGameState({
    resources: { base: 10 },
    autobuyers: { tier01: 1 },
    purge: { xp: 0, points: 10, count: 11, highestMilestone: 1 }, // meets Kilobytes's tickspeed milestone (11)
  })
  render(<App />)
  await openPerksTab(userEvent.setup(), /open automation/i)

  expect(screen.queryByLabelText(/^kilobytes's tickspeed autobuyer unlocks at purge/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText("Kilobytes's tickspeed autobuyer active")).toBeInTheDocument()
  expect(screen.getByLabelText(/^purge points display$/i)).toHaveTextContent('10 PP')
})

test('a tier\'s automation rows stay listed once unlocked', async () => {
  seedMainGameState({
    resources: { base: 10 },
    autobuyers: { tier01: 1 },
    tierTickspeedAutobuyer: { tier01: true },
    purge: { xp: 0, points: 0, count: 11, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(userEvent.setup(), /open automation/i)

  expect(within(screen.getByLabelText(/^kilobytes autobuyer$/i)).getByLabelText("Kilobytes's autobuyer active")).toBeInTheDocument()
  expect(within(screen.getByLabelText(/^kilobytes tickspeed autobuyer$/i)).getByLabelText("Kilobytes's tickspeed autobuyer active")).toBeInTheDocument()
})
test('a tier\'s automation row shows its unlocked autobuyer (no Smart) before that tier itself is reachable', async () => {
  seedMainGameState({
    resources: { base: 10 },
    // tier02 isn't unlocked yet: tier01 is owned below the 8-unit unlock threshold.
    owned: { tier01: 3 },
    // A high enough prestige count to have already met tier02's milestones — its row still shows
    // them, but Smart needs the tier itself reachable this run.
    purge: { xp: 0, points: 100, count: 30, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(userEvent.setup(), /open automation/i)

  const row = screen.getByLabelText(/^megabytes autobuyer$/i)
  expect(within(row).getByLabelText("Megabytes's autobuyer active")).toBeInTheDocument()
  expect(within(row).queryByRole('button', { name: /make megabytes's autobuyer smart/i })).not.toBeInTheDocument()
})

test('a tier autobuyer\'s speed upgrade continues past the 10 ms floor, showing N/buy and the doubling button', async () => {
  const user = userEvent.setup()
  const maxLevel = getAutobuyerIntervalMaxLevel('tier01')
  seedMainGameState({
    resources: { base: 10 },
    autobuyers: { tier01: 1 },
    autobuyerIntervalLevels: { tier01: maxLevel },
    purge: { xp: 0, points: 1e30, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  const row = screen.getByLabelText(/^kilobytes autobuyer$/i)
  expect(row).toHaveTextContent('10ms')
  const button = within(row).getByRole('button', { name: new RegExp(`upgrade kilobytes's autobuyer to level ${maxLevel + 1} for .* purge points — doubles levels bought per attempt to up to 2`, 'i') })
  // Narrow cell: the button shows only the cost; the doubling lives in its accessible name.
  expect(button).toHaveTextContent(/ PP$/)
  expect(button).not.toHaveTextContent(/\/buy/)
  await user.click(button)

  const after = screen.getByLabelText(/^kilobytes autobuyer$/i)
  // At the floor only the bulk is shown, inline: ×2.
  expect(after).toHaveTextContent('×2')
  expect(after).not.toHaveTextContent('10ms')
  expect(within(after).getByRole('button', { name: new RegExp(`upgrade kilobytes's autobuyer to level ${maxLevel + 2} for .* up to 4`, 'i') })).toHaveTextContent(/ PP$/)
})

// Capped (maxed) automations collapse to label + Switch — no interval line, no upgrade button;
// the interval moves to the cell's title.
test.each([
  {
    name: 'a global automation (Auto Accelerate)',
    seed: () => ({ autoGlobalTickspeed: true, automationIntervalLevels: { speedUp: getAutomationIntervalMaxLevel('speedUp') } }),
    cell: /^auto accelerate row$/i,
    toggle: /^Auto Accelerate automation$/i,
  },
  {
    name: 'a tier autobuyer',
    seed: () => ({ autobuyers: { tier01: 1 }, autobuyerIntervalLevels: { tier01: getAutobuyerSpeedUpgradeMaxLevel('tier01') } }),
    cell: /^kilobytes autobuyer$/i,
    toggle: /^Kilobytes's autobuyer$/i,
  },
  {
    name: 'a tier tickspeed autobuyer',
    seed: () => ({ tierTickspeedAutobuyer: { tier01: true }, tierTickspeedIntervalLevels: { tier01: getTierTickspeedIntervalMaxLevel() } }),
    cell: /^kilobytes tickspeed autobuyer$/i,
    toggle: /^Kilobytes's tickspeed autobuyer$/i,
  },
])('$name at its cap shows only its label and Switch', async ({ seed, cell, toggle }) => {
  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 1e30, count: 1, highestMilestone: 1 },
    ...seed(),
  })
  render(<App />)
  await openPerksTab(userEvent.setup(), /open automation/i)

  const capped = screen.getByLabelText(cell)
  expect(within(capped).getByRole('button', { name: toggle })).toBeInTheDocument()
  expect(within(capped).getAllByRole('button')).toHaveLength(1)
  expect(capped).not.toHaveTextContent(/\d+m?s\b|×\d/)
  expect(capped).toHaveAttribute('title', expect.stringMatching(/every .* \(max\)$/))
})

test('the Firmware Prestige tab NavDot lights up when a leveled Double PP purchase is affordable', async () => {
  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 100, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await userEvent.setup().click(screen.getByRole('button', { name: /^open firmware$/i }))

  expect(screen.getByLabelText(/^prestige perk available$/i)).toBeInTheDocument()
})

test('the Firmware tab NavDots stay dark when only a locked (milestone-gated) tier autobuyer/tier tickspeed autobuyer is pending, since neither costs PP', async () => {
  seedMainGameState({
    resources: { base: 10 },
    // tier01's autobuyer is already unlocked (milestone 1, met by count 1) but there's no PP to
    // spend on anything — not Smart, not any of the global automations — so nothing here is
    // "affordable" despite later tiers' autobuyer/tickspeed-autobuyer rows still showing locked.
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  const perksButton = screen.getByRole('button', { name: /^open firmware$/i })
  expect(within(perksButton).queryByLabelText(/action available$/i)).not.toBeInTheDocument()
  await userEvent.setup().click(perksButton)
  expect(screen.queryByLabelText(/perk available$/i)).not.toBeInTheDocument()
})

test('the Firmware tab NavDots go dark once a tier is fully done and nothing else is affordable', async () => {
  seedMainGameState({
    resources: { base: 10 },
    autobuyers: { tier01: 1 },
    smartAutobuyer: { tier01: true },
    tierTickspeedAutobuyer: { tier01: true },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  const perksButton = screen.getByRole('button', { name: /^open firmware$/i })
  expect(within(perksButton).queryByLabelText(/action available$/i)).not.toBeInTheDocument()
  await userEvent.setup().click(perksButton)
  expect(screen.queryByLabelText(/perk available$/i)).not.toBeInTheDocument()
})

test('Milestones is reachable via More both before and after the first prestige (unlike Firmware)', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 0, count: 0, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.queryByRole('tab', { name: /open automation/i })).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open milestones/i }))
  expect(screen.getByLabelText(/^milestones page$/i)).toBeInTheDocument()
})

test('Firmware → Automation lists every tier\'s autobuyer/tier-tickspeed-autobuyer unlock milestone once, reflecting what\'s already unlocked', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    purge: { xp: 0, points: 0, count: 3, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  // Purge count 3 meets Kilobytes/Megabytes/Gigabytes' autobuyer-unlock milestones (1/2/3) but not
  // Terabytes' (4) — each already-met tier shows as unlocked, the next one as still locked.
  expect(screen.getByLabelText(/^kilobytes's autobuyer active$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^megabytes's autobuyer active$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^gigabytes's autobuyer active$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^terabytes's autobuyer unlocks at purge 4$/i)).toBeInTheDocument()

  // None of the tier tickspeed autobuyer milestones (11+) are reached yet.
  expect(screen.getByLabelText(/^kilobytes's tickspeed autobuyer unlocks at purge 11$/i)).toBeInTheDocument()
  const tickspeedProgress = screen.getByRole('progressbar', { name: /^kilobytes tickspeed autobuyer milestone progress$/i })
  expect(tickspeedProgress).toHaveAttribute('aria-valuenow', '3')
  expect(tickspeedProgress).toHaveAttribute('aria-valuemax', '11')

  // Milestones no longer repeats these — it keeps only Chapters / Reboot.
  await user.click(screen.getByRole('button', { name: /open more menu/i }))
  await user.click(screen.getByRole('button', { name: /open milestones/i }))
  expect(screen.queryByLabelText(/autobuyer unlock milestones category$/i)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/^tier tickspeed autobuyer milestones category$/i)).not.toBeInTheDocument()
})

test('an autobuyer active/paused badge appears on Firmware → Automation once its autobuyer is unlocked, toggled by its own pause button', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    autobuyers: { tier01: 1 },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText("Kilobytes's autobuyer active")).toBeInTheDocument()
  const pauseButton = screen.getByRole('button', { name: /^Kilobytes's autobuyer$/i })
  expect(pauseButton).toHaveAttribute('aria-pressed', 'true')

  await user.click(pauseButton)
  expect(screen.getByLabelText("Kilobytes's autobuyer paused")).toBeInTheDocument()
  const resumeButton = screen.getByRole('button', { name: /^Kilobytes's autobuyer$/i })
  expect(resumeButton).toHaveAttribute('aria-pressed', 'false')

  await user.click(resumeButton)
  expect(screen.getByLabelText("Kilobytes's autobuyer active")).toBeInTheDocument()
})

test('no autobuyer pause button appears on Firmware → Automation before its autobuyer is unlocked', async () => {
  const user = userEvent.setup()

  // Megabytes' autobuyer unlocks at Purge 2 (getAutobuyerUnlockMilestone) — Purge 1 is enough to
  // have unlocked Kilobytes (milestone 1) but not Megabytes.
  seedMainGameState({
    resources: { base: 10 },
    owned: { tier02: 1 },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  expect(screen.getByLabelText("Megabytes's autobuyer unlocks at Purge 2")).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /^Megabytes's autobuyer$/i })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /^Kilobytes's autobuyer$/i })).toBeInTheDocument()
})

test('pausing a tier\'s autobuyer via its Firmware toggle stops it from buying automatically; resuming resumes it', () => {
  vi.useFakeTimers()

  seedMainGameState({
    resources: { base: 10000 },
    autobuyers: { tier01: 1 },
    autobuyersEnabled: { tier01: false },
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  const { unmount } = render(<App />)
  openPerksTabSync(/open automation/i)

  // The autobuyer attempt budget accumulates at a flat rate of 1 per real second, so a single
  // 100ms tick isn't enough to trigger a purchase attempt either way — advance a full second
  // (10 ticks) so a paused autobuyer's lack of purchases is a meaningful assertion, not just "not
  // enough time has passed yet".
  act(() => { vi.advanceTimersByTime(1000) })
  openFactorySync()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 0\b/i)

  openPerksTabSync(/open automation/i)
  fireEvent.click(screen.getByRole('button', { name: /^Kilobytes's autobuyer$/i }))
  act(() => { vi.advanceTimersByTime(1000) })

  openFactorySync()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).not.toHaveTextContent(/owned: 0\b/i)

  unmount()
  vi.useRealTimers()
})

test('pausing a tier\'s tickspeed autobuyer via its Firmware toggle stops it from upgrading automatically; resuming resumes it', () => {
  vi.useFakeTimers()

  // tier09 (Ronnabytes, tierIndex 8) has a much cheaper tickspeed multiplier base cost (100) than
  // an earlier tier, keeping the seeded resource amount small; owned > 0 already satisfies
  // isTierUnlocked for this tier directly, with no dependency on any other tier's state.
  seedMainGameState({
    resources: { base: 10, tier09: 101 },
    owned: { tier09: 101 },
    tierTickspeedAutobuyer: { tier09: true },
    tierTickspeedAutobuyerEnabled: { tier09: false },
    tierTickspeedAttemptBudgets: { tier09: 1 }, // interval timer already elapsed
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  const { unmount } = render(<App />)
  openPerksTabSync(/open automation/i)

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  expect(screen.getByRole('button', { name: /^Ronnabytes's tickspeed autobuyer$/i })).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /^Ronnabytes's tickspeed autobuyer$/i }))
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  expect(screen.getByRole('button', { name: /^Ronnabytes's tickspeed autobuyer$/i })).toBeInTheDocument()
  openFactorySync()
  expect(screen.getByTitle(/tickspeed multiplier level 2 \(\+10% faster ticks\)/i)).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('once every tier autobuyer is unlocked and tickspeed-automated, every tier row still shows its reached milestones and no purchase remains', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    ...allTiersSmartSeed(),
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(user, /open automation/i)

  for (const tier of TIER_DEFINITIONS) {
    expect(screen.getByLabelText(`${tier.name} autobuyer`)).toBeInTheDocument()
    expect(screen.getByLabelText(`${tier.name} tickspeed autobuyer`)).toBeInTheDocument()
  }
})
test('a tier whose autobuyer is unlocked but not yet tickspeed-automated still offers its tickspeed-autobuyer milestone', async () => {
  seedMainGameState({
    resources: { base: 10 },
    owned: Object.fromEntries(ALL_TIER_IDS.slice(0, 9).map(id => [id, 10])),
    autobuyers: Object.fromEntries(ALL_TIER_IDS.map(id => [id, 1])),
      // tierTickspeedAutobuyer deliberately left unbought for every tier.
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await openPerksTab(userEvent.setup(), /open automation/i)

  expect(screen.getByLabelText(/^kilobytes's tickspeed autobuyer unlocks at purge 11$/i)).toBeInTheDocument()
})

test('clicking the money balance expands a breakdown of every global production multiplier currently in effect, and collapses again on a second click', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier02: 1, tier10: 10 },
    scaleUpCount: 2,
    globalTickspeedMultiplier: 1,
    prestigeSpeedBonusUnlocked: true,
    purge: { xp: 0, points: 50, count: 100, highestMilestone: 1 },
  })
  render(<App />)

  const moneyDisplay = screen.getByRole('button', { name: /^money display$/i })
  expect(moneyDisplay).toHaveAttribute('aria-expanded', 'false')
  expect(screen.queryByLabelText(/^global production multipliers$/i)).not.toBeInTheDocument()

  await user.click(moneyDisplay)

  expect(moneyDisplay).toHaveAttribute('aria-expanded', 'true')
  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).toHaveTextContent(/prestige speed bonus: 3x production speed from 100 purges/i)
  expect(breakdown).toHaveTextContent(/scale up: 2 activations; multiplier varies by tier/i)
  expect(breakdown).toHaveTextContent(/accelerate: \+[\d.]+% faster ticks on every tier(?! \(lv)/i)

  await user.click(moneyDisplay)

  expect(moneyDisplay).toHaveAttribute('aria-expanded', 'false')
  expect(screen.queryByLabelText(/^global production multipliers$/i)).not.toBeInTheDocument()
})

test('the money balance breakdown reports a not-yet-activated status for each global multiplier before it becomes active', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier02: 1, tier10: 10 },
    purchaseLevels: { tier01: 2 }, // Accelerate revealed (tier01 level 1 purchased) but not yet active
    purge: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('button', { name: /^money display$/i }))

  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).toHaveTextContent(/prestige speed bonus: not yet unlocked \(1 PP on firmware → prestige\)/i)
  expect(breakdown).toHaveTextContent(/scale up: not yet activated \(reach 3 completed levels on kilobytes\)/i)
  expect(breakdown).toHaveTextContent(/accelerate: not yet active/i)
})

test('the money balance breakdown omits the Prestige speed bonus line before the first prestige, but still shows Scale Up/Global Tickspeed status once those are revealed', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier02: 1, tier10: 10 },
    purchaseLevels: { tier01: 2 },
  })
  render(<App />)
  await user.click(screen.getByRole('button', { name: /^money display$/i }))

  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).not.toHaveTextContent(/prestige speed bonus/i)
  expect(breakdown).toHaveTextContent(/scale up: not yet activated/i)
  expect(breakdown).toHaveTextContent(/accelerate: not yet active/i)
})

test('the money balance breakdown\'s Overclock line reports the boosted per-level Accelerate rate once active, not a standalone bonus percentage', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { base: 10 },
    owned: { tier02: 1, tier10: 10 },
    overclockLastClaimCompletedLevels: 2,
  })

  render(<App />)
  await user.click(screen.getByRole('button', { name: /^money display$/i }))

  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).toHaveTextContent(
    /overclock: the per-level speed bonus is now 1\.21% \(was 1%\)/i
  )
})

// --- ByteFoundryPage (the pre-game intro) ---
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

test('tapping increments the bit balance and stops once capacity is reached', async () => {
  const user = userEvent.setup()

  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  const tapButton = screen.getByRole('button', { name: /ping to generate a bit/i })
  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', '0')
  expect(balanceBar).toHaveAttribute('aria-valuemax', String(INTRO_STARTING_CAPACITY))

  for (let i = 0; i < INTRO_STARTING_CAPACITY; i++) {
    await user.click(tapButton)
  }

  expect(balanceBar).toHaveAttribute('aria-valuenow', String(INTRO_STARTING_CAPACITY))
  expect(tapButton).toBeDisabled()

  // A disabled button swallows the click entirely — the balance stays capped, not overshooting.
  await user.click(tapButton)
  expect(balanceBar).toHaveAttribute('aria-valuenow', String(INTRO_STARTING_CAPACITY))
})

test('once mainGameUnlocked, the standalone Tap button is gone and Data Stream itself is the tap target', async () => {
  // Only setInterval is faked: the live tick loop never fires, while setTimeout stays real so
  // userEvent / Testing Library's async wrappers still resolve.
  vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] })
  const user = userEvent.setup()

  // Capacity stays well under INTRO_DISK_UNLOCK_CAPACITY (8,192) — this test uses real timers, so
  // a real tick landing between mount and the assertion could otherwise let tickPoolBufferFill
  // siphon a fractional bit out of intro.bits into pool 1's own (irrelevant here) buffer.
  seedMainGameState({ intro: { mainGameUnlocked: true, bits: 0, capacity: 1000, byteCreated: true } })
  render(<App />)
  await user.click(screen.getByRole('button', { name: /open byte foundry/i }))

  // There is exactly one "ping to generate a bit" control — Data Stream's own tile, not a separate button.
  const tapTarget = screen.getByRole('button', { name: /ping to generate a bit/i })
  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })

  await user.click(tapTarget)

  // Below the Storage-pools reveal threshold a tap credits the floor of the derived rate — at
  // 1000 bits of capacity (125 B) that's 11.18 B/s = 89 bits, on top of whatever the
  // continuous production delivered during the real-time click.
  expect(Number(balanceBar.getAttribute('aria-valuenow'))).toBeGreaterThanOrEqual(89)
})

test('the Data Stream tile stays tappable on a full Buffer (the bonus speeds consumers) without crediting bits', () => {
  // Fake timers so auto-convert can't drain a full Buffer between mount and the assertion.
  vi.useFakeTimers()

  seedMainGameState({ intro: { mainGameUnlocked: true, bits: INTRO_CAPACITY_CAP_BITS, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true } })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))

  const tapTarget = screen.getByRole('button', { name: /ping to generate a bit/i })
  expect(tapTarget).not.toBeDisabled()

  fireEvent.click(tapTarget)
  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', String(INTRO_CAPACITY_CAP_BITS))

  unmount()
  vi.useRealTimers()
})

test('before mainGameUnlocked, Data Stream\'s tile is not itself a tap target — the standalone Tap button is the only one', () => {
  seedIntroState({ bits: 0, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true, mainGameUnlocked: false })
  render(<App />)

  expect(screen.getAllByRole('button', { name: /ping to generate a bit/i })).toHaveLength(1)
  expect(screen.getByLabelText(/^data stream balance$/i)).toBeInTheDocument()
})

test('combining 8 bits into a Byte resets the balance and starts passive production on the Capacity ladder', async () => {
  const user = userEvent.setup()

  seedIntroState({ bits: INTRO_BYTE_COMBINE_COST })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', String(INTRO_BYTE_COMBINE_COST))
  const combineButton = screen.getByRole('button', { name: /compile 8 bits into a Byte/i })

  await user.click(combineButton)

  // The combine action is one-time — its own button is gone once byteCreated flips true.
  expect(screen.queryByRole('button', { name: /compile 8 bits into a Byte/i })).not.toBeInTheDocument()
  // Consumes the full cost (8); production now delivers CONTINUOUSLY (1 B/s at the starting
  // capacity), so a real-time test can only assert the balance restarted near 0 rather than
  // exactly 0.
  expect(Number(balanceBar.getAttribute('aria-valuenow'))).toBeLessThan(INTRO_BYTE_COMBINE_COST)
  expect(balanceBar).toHaveAttribute('aria-valuemax', String(INTRO_BYTE_COMBINE_COST))
  expect(screen.getByText(/10 b\/s$/i)).toBeInTheDocument() // 1 B/s base x 1000% (empty buffer)
})

test("the Upgrade Data Stream button stays clickable (to arm) while the Buffer isn't full", () => {
  // The single consolidated upgrade costs the CURRENT capacity — below a full Buffer a click arms it
  // (pausing Data Stream outflow) rather than upgrading immediately.
  seedIntroState({ bits: 5, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toBeEnabled()
  expect(upgradeButton).toHaveTextContent('Upgrade Capacity')
  expect(upgradeButton).toHaveTextContent('97.65 KiB') // its cost = current capacity
})

// Upgrade Data Stream spends the full Buffer (cost = current capacity) and doubles Capacity —
// Speed follows the new capacity automatically rather than being upgraded independently.
test('Upgrade Data Stream fills its bar from the stream and doubles Capacity', () => {
  // Fake timers so a real production tick can't race the exact post-upgrade balance assertion.
  vi.useFakeTimers()

  seedIntroState({ bits: 8, byteCreated: true })
  const { unmount } = render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toBeEnabled()

  fireEvent.click(upgradeButton)
  // Upgrade bar draws at constant 1× base Speed; 2.5s is enough for the 1 B cost.
  act(() => { vi.advanceTimersByTime(2_500) })

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuemax', '16')
  // The new capacity (2 B) derives the new speed — e=log2(2B) is odd, so the mean of the
  // neighbouring even-exponent sqrts: (1 + 2)/2 = 1.5 B/s.
  const dataStream = screen.getByRole('region', { name: 'Data Stream' })
  expect(within(dataStream).getByText(/^⚡ .*\/s$/)).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('Upgrade Data Stream remains visible after Combine and is uncapped by any pool ceiling', () => {
  seedIntroState({ bits: INTRO_CAPACITY_CAP_BITS, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
  render(<App />)

  expect(screen.getByRole('button', { name: /upgrade data stream capacity/i })).toBeInTheDocument()
  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuemax', String(INTRO_CAPACITY_CAP_BITS))
})

test('the manual transfer-block row is gone — the always-on auto-convert is now the only path through the gate, regardless of Buffer/Storage state', () => {
  // Covers every state the removed manual row used to render in (fresh/pre-Combine, past the
  // conversion-unlock threshold, past Storage's own reveal threshold, and post-unlock) — none of
  // them should ever show a "convert" button or the transfer-blocks group any more.
  seedIntroState({ bits: 0, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
  const { unmount } = render(<App />)
  expect(screen.queryByRole('group', { name: /byte foundry kilobyte transfer blocks/i })).not.toBeInTheDocument()
  expect(screen.queryByText(/transfer to main game/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /^convert /i })).not.toBeInTheDocument()
  unmount()

  seedMainGameState({
    intro: { mainGameUnlocked: true, bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true },
  })
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
  expect(screen.queryByRole('group', { name: /byte foundry kilobyte transfer blocks/i })).not.toBeInTheDocument()
})

test('auto-converts a full block once the threshold is reached — the sole remaining path through the gate now the manual row is gone', () => {
  vi.useFakeTimers()

  // A big jump — passive production or a large offline-progress catch-up — that skips straight
  // past every individual block boundary in one go, rather than the player clicking through them.
  seedIntroState({
    bits: FRESH_CYCLE_BLOCK_BITS - 1,
    capacity: INTRO_CAPACITY_CAP_BITS,
    byteCreated: true,
  })
  const { unmount } = render(<App />)

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // Transitioned to MainPage (mainGameUnlocked flips on the bulk auto-invest) with all 8 Kilobytes
  // granted at once, completing tier01's first level — with no manual click at all.
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8\b/i)

  // Navigating back to the Byte Foundry: Storage is revealed (this fixture has Buffer at pool end)
  // and the main game is unlocked — Disk redemption is the path from here on.
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))
  expect(screen.getByRole('button', { name: /provision disk/i })).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('tapping still increments Data Stream (still tappable) after the Byte generator exists', () => {
  // Fake timers so the live tick loop can't fire between mount and the click below — pool 1's
  // cache-fill (tickDiskAutoFill) now starts draining bits into its own buffer/cache the instant
  // it's unlocked (see ByteFoundryPage's Pool cache-fill change), not just once a disk has been
  // built for it, so a real tick landing here could otherwise siphon a fractional bit out of
  // intro.bits before this test's own assertion reads it.
  vi.useFakeTimers()

  seedIntroState({ bits: 0, capacity: 1000, byteCreated: true })
  const { unmount } = render(<App />)

  const tapButton = screen.getByRole('button', { name: /ping to generate a bit/i })
  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', '0')

  fireEvent.click(tapButton)

  // Same derived-rate credit as above (capacity 1000 bits = 125 B -> 125^0.5 = 11.18 B/s -> 89 bits per tap (floored)).
  expect(balanceBar).toHaveAttribute('aria-valuenow', '89')

  unmount()
  vi.useRealTimers()
})

test('shows the offline-progress notice on the Byte Foundry screen too, not just MainPage', () => {
  // Regression test: applyOfflineProgress already replays tickIntroProduction/tickIntroAutoInvest
  // during offline catch-up (tickGame runs them unconditionally, every tick, regardless of
  // mainGameUnlocked) — the gap was that the notice itself only ever rendered inside MainPage, so a
  // player who lands on (or is still gated to) ByteFoundryPage after being away saw no
  // acknowledgment of it. Capacity stays below INTRO_DISK_UNLOCK_CAPACITY (8,192 bits) so
  // mainGameUnlocked (now latched purely off that threshold — see latchMainGameUnlocked in
  // engine.js) stays false even after the offline catch-up below, and <App /> gates onto
  // ByteFoundryPage — the notice should show there too.
  seedIntroState({ bits: 0, capacity: 4000, byteCreated: true })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 1_000_000))

  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()
})

test('the "Data Stream" label is shown on the balance card', () => {
  render(<App />)
  expect(screen.getByText('Data Stream')).toBeInTheDocument()
})

test('the Data Stream header shows the basis-derived rate — (basis in Bytes)^DATA_STREAM_SPEED_EXPONENT', () => {
  // Scoped to the Data Stream region — pool 1's own Bandwidth can coincidentally render the same
  // "N B/s" text at these rates. Capacity is in BITS: 800,000 bits = 100,000 B -> 100,000^0.5 =
  // 316 B/s, shown at the empty-buffer 1000% multiplier: about 3.08 KiB/s.
  seedIntroState({ bits: 0, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
  const { unmount } = render(<App />)
  expect(within(screen.getByRole('region', { name: 'Data Stream' })).getByText(/3\.08 KiB\/s$/i)).toBeInTheDocument()
  unmount()

  // Starting capacity (8 bits = 1 B) -> 1^0.5 = 1 B/s.
  seedIntroState({ bits: 0, byteCreated: true })
  render(<App />)
  expect(within(screen.getByRole('region', { name: 'Data Stream' })).getByText(/10 B\/s$/i)).toBeInTheDocument()
})

test('Upgrade Data Stream shows its cost on its own line below the label, with no stray comma', () => {
  // Regression coverage for a past ButtonContent bug: mixing literal text with an embedded
  // {expression} in one children array used to render a stray comma at each JSX child boundary
  // (Array.prototype.toString()'s bare-comma join). The button's label and cost render as two
  // separate lines (see MilestoneButtonContent); the comma check stays as a general safety net.
  seedIntroState({ bits: INTRO_STARTING_CAPACITY, byteCreated: true })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toHaveTextContent('Upgrade Capacity')
  expect(upgradeButton).toHaveTextContent('1 B') // cost = current capacity (8 bits)
  expect(upgradeButton.textContent).not.toContain(',')
})

test('Upgrade Data Stream shows its cost in the nearest fitting binary unit', () => {
  // A 512-bit (64 B) capacity doubles that as its cost — below the 1024-Byte KiB threshold, so
  // it still renders in raw Bytes under Data Stream's binary-unit scale.
  seedIntroState({ capacity: 512, bits: 0, byteCreated: true })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toHaveTextContent('Upgrade Capacity')
  expect(upgradeButton).toHaveTextContent('64 B')
})

test('Upgrade Data Stream previews the Capacity and Speed after upgrading', () => {
  // 512 bits (64 B) doubles to 128 B.
  seedIntroState({ capacity: 512, bits: 0, byteCreated: true })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toHaveTextContent(`${COST_ICON} 64 B · 📦 ×2`)
  expect(upgradeButton).toHaveAccessibleDescription('Costs 64 B; capacity 128 B after upgrading')
  // Speed trails Capacity (basis 32 B -> 5.66 B/s, cost 32 B): 5.66 B/s -> 64^0.5 = 8 B/s on its own button.
  cleanup()
  seedIntroState({ capacity: 512, speedCapacity: 256, bits: 0, byteCreated: true })
  render(<App />)
  const speedButton = screen.getByRole('button', { name: /upgrade data stream bitrate/i })
  expect(speedButton).toHaveTextContent(`${COST_ICON} 32 B · ⚡ ×1.41`)
  expect(speedButton).toHaveAccessibleDescription('Costs 32 B; bitrate 8 B/s after upgrading')
})

test('Reclamation V merges Upgrade Capacity and Upgrade Bitrate into one Upgrade button', () => {
  seedIntroState({
    capacity: 512, bits: 0, byteCreated: true,
    poolExponentBonuses: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 1, 1])),
  })
  render(<App />)

  expect(screen.queryByRole('button', { name: /upgrade data stream bitrate/i })).not.toBeInTheDocument()
  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toHaveTextContent('Upgrade')
  expect(upgradeButton).not.toHaveTextContent('Upgrade Capacity')
  expect(upgradeButton).toHaveTextContent(`${COST_ICON} 64 B · 📦 ×2 · ⚡ ×1.41`)
  expect(upgradeButton).toHaveAccessibleDescription('Costs 64 B; capacity 128 B and bitrate 11.31 B/s after upgrading')
})

test('Upgrade Data Stream at maximum Capacity is disabled and reads "Max capacity" without a preview', () => {
  seedIntroState({ capacity: 1.298074214633707e33, bits: 0, byteCreated: true })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toBeDisabled()
  expect(upgradeButton).toHaveTextContent('Max capacity')
  expect(upgradeButton).not.toHaveTextContent('→')
  expect(upgradeButton).not.toHaveTextContent(COST_ICON)
})

test('each Upgrade Data Stream press doubles Capacity, and the next cost always equals the new capacity', () => {
  // Fake timers so a real production tick can't race the exact balance assertions below.
  vi.useFakeTimers()

  // 16 bits of Buffer at 8-bit capacity: a full Buffer's first press pays 8, leaving 8 in the
  // (now-16-bit) Buffer — the button's new cost line immediately reads the doubled capacity.
  seedIntroState({ bits: 8, byteCreated: true })
  const { unmount } = render(<App />)

  let upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toBeEnabled()
  fireEvent.click(upgradeButton)
  act(() => { vi.advanceTimersByTime(2_500) })

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuemax', '16')
  upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toHaveTextContent('2 B') // cost = the new capacity
  expect(upgradeButton).toBeEnabled()
  expect(upgradeButton).toHaveTextContent('Upgrade Capacity')

  unmount()
  vi.useRealTimers()
})

test("Upgrade Data Stream shows fill progress toward a full Buffer, matching the main game's button convention", () => {
  seedIntroState({ bits: 4, byteCreated: true })
  render(<App />)

  // 4 of 8 bits banked — the button's own fill reflects the same bits/capacity progress the tile
  // shows (the cost is the whole capacity, payable only when the Buffer is full; a click before
  // then arms it).
  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toBeEnabled()
})

test('starting Upgrade Data Stream turns the same button into an inert progress bar; there is no cancel', () => {
  vi.useFakeTimers()
  seedIntroState({ capacity: 1000, bits: 400, byteCreated: true, mainGameUnlocked: true })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))

  const upgradeButton = screen.getByRole('button', { name: /upgrade data stream capacity/i })
  expect(upgradeButton).toBeEnabled()
  fireEvent.click(upgradeButton)

  // Both buttons are replaced by an inert status bar; no Cancel control and no tile status line.
  expect(screen.queryByRole('button', { name: /upgrade data stream (capacity|speed)/i })).not.toBeInTheDocument()
  const running = screen.getByRole('region', { name: /^upgrade capacity$/i })
  expect(running).toHaveTextContent(/Upgrading/)
  expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: /data stream upgrade progress/i })).toHaveAttribute('aria-valuenow', '0')
  expect(JSON.parse(localStorage.getItem('tens_game_state')).intro.capacityUpgradeQueued).toBe(true)

  unmount()
  vi.useRealTimers()
})

test('the Combine button shows fill progress toward INTRO_BYTE_COMBINE_COST', () => {
  // The Combine button only ever renders once bits >= INTRO_BYTE_COMBINE_COST (its own condition
  // for appearing at all) — since capacity starts exactly equal to that cost, it's only ever
  // observable at a full 8/8, not partway; this still confirms the progressbar reports the right
  // raw values rather than e.g. a stale/mismatched max.
  seedIntroState({ bits: INTRO_BYTE_COMBINE_COST })
  render(<App />)

  const combineProgress = screen.getByRole('progressbar', { name: /byte foundry compile progress/i })
  expect(combineProgress).toHaveAttribute('aria-valuenow', String(INTRO_BYTE_COMBINE_COST))
  expect(combineProgress).toHaveAttribute('aria-valuemax', String(INTRO_BYTE_COMBINE_COST))
})

test('the intro auto-transitions into the main game once the bit balance crosses the auto-invest threshold', () => {
  vi.useFakeTimers()

  // Starts one bit below the threshold. Production delivers continuously now — the fill-based
  // multiplier (see FILL_MULTIPLIER_* in game/layers) tapers it toward FILL_MULTIPLIER_MIN_PERCENT
  // (10%) this close to a full Buffer, so a few ticks close that last bit.
  seedIntroState({
    bits: FRESH_CYCLE_BLOCK_BITS - 1,
    capacity: FRESH_CYCLE_BLOCK_BITS,
    byteCreated: true,
  })
  const { unmount } = render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS * 5) })

  // Transitioned to MainPage — the Byte Foundry heading is gone, replaced by the game itself, with
  // the auto-invest-granted Kilobytes already owned.
  expect(screen.queryByRole('heading', { level: 1, name: /byte foundry/i })).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1, name: /^byte factory$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8\b/i)

  unmount()
  vi.useRealTimers()
})

test('Data Stream still renders raw bits (not a fractional Byte) before the Byte generator exists', () => {
  // Before byteCreated, Buffer is always exactly INTRO_STARTING_CAPACITY (8 bits/1 Byte) — with
  // nothing yet to meaningfully denominate in, the balance (bigger, centered) and Capacity (bottom
  // right half) should each read whole bits ("5 bits", "8 bits"), not a fractional Byte ("0.625
  // B", "1 B").
  seedIntroState({ bits: 5, capacity: INTRO_STARTING_CAPACITY, byteCreated: false })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  const section = balanceBar.closest('section')
  expect(section.querySelector('p')).toHaveTextContent('5 bits')
  expect(section).toHaveTextContent('8 bits')
  expect(section).not.toHaveTextContent(/\d+(?:\.\d+)? B\b/)
})

test('Data Stream renders bits/Buffer scaled into the same appropriate binary unit at real pool capacity', () => {
  // Pool 1's real Capacity end bound (INTRO_CAPACITY_CAP_BITS) is now a clean SI 100 KB
  // (800,000 bits), not a clean binary KiB power — see POOL_CAPACITY_SI_STEP in layers.js. The
  // Data Stream card's own balance/Buffer display stays binary regardless, so this real value
  // renders as a plain (non-round) KiB figure rather than a whole MiB — this test pins that
  // actual rendering rather than a synthetic round number, so a future change to either the SI
  // Capacity bound or the binary display logic can't silently drift the two apart.
  seedIntroState({ bits: INTRO_CAPACITY_CAP_BITS / 2, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  const section = balanceBar.closest('section')
  expect(section.querySelector('p')).toHaveTextContent('48.82 KiB')
  expect(section).toHaveTextContent('97.65 KiB')
})

test('Data Stream balance floors the binary-unit conversion instead of rounding, so it never reads complete early', () => {
  // A 1-bit deficit (as the original binary-1-MiB-capacity version of this test used) is now
  // below this display's own decimal resolution at the real pool-1 Capacity's new KiB-range
  // magnitude (97.656 KiB, not a round MiB — see the comment on the previous test): both the
  // full capacity and a balance just 1 bit short floor to the identical "97.656 KiB" text at 3
  // decimal places, since the capacity itself is no longer an exact multiple of the KiB divisor
  // the way the old round-MiB cap was. A meaningfully larger (but still small) deficit still
  // demonstrably floors below the full reading, which is what this test actually verifies.
  const bits = INTRO_CAPACITY_CAP_BITS - 8_000
  seedIntroState({ bits, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  const section = balanceBar.closest('section')
  expect(section).toHaveTextContent('97.65 KiB') // the Capacity footer figure, in full
  expect(balanceBar.closest('[aria-label="data stream bit balance"]') || balanceBar).toHaveAttribute('aria-valuenow', String(bits))
  // Flooring: the balance itself must not also read "97.656 KiB" (which would mean it rounded up
  // to match the full capacity reading).
  expect(section.querySelector('p')).toHaveTextContent('96.67 KiB')
})

test('Data Stream balance self-sizes into its own finer unit rather than falling back to raw bits when it would floor below 1 in the capacity-shared unit', () => {
  // A balance that's a small fraction of a much larger capacity (e.g. right after a Capacity ×2
  // purchase) would floor to "0.234 MiB" — a bare fraction the "never 0.xyz" rule forbids. Instead
  // of dropping all the way to a raw bit count ("246,016 bits" alongside a "1 MiB" capacity), the
  // balance now self-sizes into its own finer named unit (KiB), keeping both figures real named
  // magnitudes.
  const capacity = 1024 * 1024 * BITS_PER_BYTE // 1 MiB
  const bits = 246_016 // 30.031 KiB
  seedIntroState({ bits, capacity, byteCreated: true })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  const section = balanceBar.closest('section')
  expect(section.querySelector('p')).toHaveTextContent('30.03 KiB')
  expect(section).toHaveTextContent('1 MiB')
})

test('Data Stream balance still falls back to raw bits when genuinely below 1 Byte — no named unit exists that small', () => {
  const capacity = 1024 * 1024 * BITS_PER_BYTE // 1 MiB
  seedIntroState({ bits: 4, capacity, byteCreated: true })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  const section = balanceBar.closest('section')
  expect(section.querySelector('p')).toHaveTextContent('4 bits')
  expect(section).toHaveTextContent('1 MiB')
})

test('Data Stream balance shows a stable, non-trimmed decimal digit count — a round-fraction reading still shows all 3 places', () => {
  // 46,976,205 bits floors to exactly 5.6 MiB — formatMemoryAmount (used elsewhere on this same
  // page, e.g. Capacity) would trim this to "5.6 MiB" via Intl.NumberFormat's default fraction-digit
  // handling; the balance specifically renders via formatMemoryAmountStable so a fast-changing
  // reading doesn't visibly change width tick to tick purely because a digit lands on zero.
  const capacity = 100 * 1024 * 1024 * BITS_PER_BYTE // 100 MiB
  seedIntroState({ bits: 46_976_205, capacity, byteCreated: true })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  expect(balanceBar.closest('section').querySelector('p')).toHaveTextContent('5.600 MiB')
})

test('a pool\'s own Memory buffer balance also shows a stable, non-trimmed decimal digit count', () => {
  // 44,800 bits is exactly 5.6 KB — formatDiskSize (used elsewhere on this same tile, e.g.
  // Bandwidth/Capacity) would trim this to "5.6 KB"; the balance specifically renders via
  // formatDiskSizeStable instead.
  seedIntroState({
    bits: 0, capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true,
    poolBuffers: { 1: 44_800 },
  })
  render(<App />)

  const pool1 = screen.getByRole('region', { name: 'pool 1' })
  expect(pool1.querySelector('p')).toHaveTextContent('5.600 KB')
})

test('Data Stream balance drops its padded trailing zeros once it has been unchanged for 5 seconds', () => {
  vi.useFakeTimers()
  // Below INTRO_CONVERSION_UNLOCK_CAPACITY (8000 bits) so tickIntroAutoInvest can never afford even
  // one tier01 unit from intro.bits — the balance genuinely sits still at capacity instead of being
  // drained back down the instant it tops up, which a bigger, conversion-eligible capacity would be.
  // 4000 bits is exactly 500 B (below MEMORY_BINARY_UNIT_STEP's own 1 KiB rung), a round balance so
  // the stable/trimmed forms visibly differ ("500.00 B" vs "500 B").
  const capacity = 4000
  seedIntroState({ bits: capacity, capacity, byteCreated: true })
  const { unmount } = render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /data stream bit balance/i })
  const balanceText = () => balanceBar.closest('section').querySelector('p')
  // Immediately full, but not YET trimmed — the delay hasn't elapsed.
  expect(balanceText()).toHaveTextContent('500.0 B')

  act(() => { vi.advanceTimersByTime(4900) })
  expect(balanceText()).toHaveTextContent('500.0 B')
  act(() => { vi.advanceTimersByTime(200) })
  expect(balanceText()).toHaveTextContent('500 B')
  fireEvent.pointerDown(document.body)
  expect(balanceText()).toHaveTextContent('500.0 B')

  unmount()
  vi.useRealTimers()
})

test('a pool\'s own Memory buffer balance also drops its padded trailing zeros once it has been unchanged for 5 seconds', async () => {
  vi.useFakeTimers()
  const firstDiskSize = getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE // 8000 — pool 1's own smallest (read-cache-eligible) size
  const poolBufferCapacity = getPoolBufferCapacity({ intro: { capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true } }, 1)
  seedIntroState({
    bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true,
    poolBuffers: { 1: poolBufferCapacity },
    // Pre-filled to full so pool 1's own eager read-cache pre-fill (tickDiskAutoFill) has nothing
    // left to draw from the buffer — otherwise it would siphon this buffer back down every tick
    // (no disk of this size exists yet to flush the cache into, so it would take far longer than
    // 1 second to fill on its own), making poolBufferFull flicker instead of staying continuously
    // true.
    diskCache: { [firstDiskSize]: firstDiskSize },
    // Already latched, and explicitly navigated to Foundry below, so ByteFoundryPage doesn't get
    // yanked out from under this test the instant intro.capacity's own storage-unlock threshold
    // (which this test's capacity already sits at) would otherwise latch this mid-test and switch
    // the app over to MainPage (see latchMainGameUnlocked/App.jsx's showingFoundry).
    mainGameUnlocked: true,
  }, {
    // tier01 past level 1 so the now-full cache above isn't immediately drained right back out by
    // tickDiskLevelOneCachePull's own level-1 fallback (which would otherwise spend the whole cache
    // to grant a free purchase block, emptying it and restarting the same siphon-from-buffer cycle
    // this seed is trying to avoid).
    purchaseLevels: { [TIER_DEFINITIONS[0].id]: 2 },
  })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /open byte foundry/i }))

  const pool1 = screen.getByRole('region', { name: 'pool 1' })
  const balanceText = () => pool1.querySelector('p')
  expect(balanceText()).toHaveTextContent('1.000 KB')

  await act(async () => { await vi.advanceTimersByTimeAsync(5100) })
  expect(balanceText()).toHaveTextContent('1 KB')

  unmount()
  vi.useRealTimers()
})

test('Speed and Bandwidth render at the top-right, with disk status removed entirely', () => {
  seedIntroState({
    bits: 0,
    capacity: 1024 * 1024 * BITS_PER_BYTE, // big enough for pool 2's own card to render once unlocked below
    byteCreated: true,
    // 8,000/80,000/800,000 bits (1/10/100 KB) are pool 1's own three sizes; 8,000,000 bits (1 MB) is
    // pool 2's smallest — a distinct pool included specifically so this test can tell a correctly
    // pool-scoped count apart from one that wrongly summed every size on the page.
    disks: { 8_000: 3, 80_000: 2, 8_000_000: 4 },
    // Unlocks pool 2's own card (isStoragePoolUnlocked requires all of pool 1's three sizes fully
    // built) — unrelated to the `disks` (currently-full) counts above, which drive the figure itself.
    disksBuiltTotal: { 8_000: DISK_ARRAY_LADDER_CAP, 80_000: DISK_ARRAY_LADDER_CAP, 800_000: DISK_ARRAY_LADDER_CAP },
  })
  render(<App />)

  const dataStreamSection = screen.getByRole('progressbar', { name: /data stream bit balance/i }).closest('section')
  expect(within(dataStreamSection).getByText(/^⚡ .*\/s$/)).toBeInTheDocument()

  const pool1 = screen.getByRole('region', { name: 'pool 1' })
  expect(within(pool1).getByTitle(/^Available fill bandwidth at/)).toBeInTheDocument()

  const pool2 = screen.getByRole('region', { name: 'pool 2' })
  expect(within(pool2).getByTitle(/^Available fill bandwidth at/)).toBeInTheDocument()
  expect(screen.queryByLabelText(/full disks/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/💾/)).not.toBeInTheDocument()
})

test('Pool balance and Capacity share one precisely centered line', () => {
  seedIntroState({ bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true })
  render(<App />)

  const pool1 = screen.getByRole('region', { name: 'pool 1' })
  const savedState = JSON.parse(localStorage.getItem('tens_game_state'))
  const balance = pool1.querySelector('p')
  // Balance and capacity now always share the same fixed pool unit, so formatCombinedBalance
  // always dedupes the balance's own unit suffix, leaving just the bare number.
  expect(balance).toHaveTextContent(/^0(\.0+)? \w+$/)
  expect(balance).toHaveStyle({ textAlign: 'center' })
})

test('Data Stream and pool speeds show the fill-multiplied value, with no multiplier bar', () => {
  seedIntroState({ bits: 0, capacity: INTRO_DISK_UNLOCK_CAPACITY, byteCreated: true })
  render(<App />)

  expect(screen.queryByRole('progressbar', { name: /fill-based/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('progressbar', { name: /data lake overflow rate/i })).not.toBeInTheDocument()
  const savedState = JSON.parse(localStorage.getItem('tens_game_state'))
  const pool1 = screen.getByRole('region', { name: 'pool 1' })
  // Empty buffer -> FILL_MULTIPLIER_MAX_PERCENT (1000%) of the pool's available fill rate, to 3 significant digits.
  const expected = formatDiskSize(getPoolAvailableFillRate(savedState, 1) * FILL_MULTIPLIER_MAX_PERCENT / 100)
  const speed = within(pool1).getByTitle(/^Available fill bandwidth at/)
  expect(speed).toHaveAttribute('title', `Available fill bandwidth at ${FILL_MULTIPLIER_MAX_PERCENT}% fill multiplier`)
  expect(speed.textContent.replace(/^⚡ /, '').replace(/\/s$/, '').split(' ')[1]).toBe(expected.split(' ')[1])
  expect(Math.abs(Number(speed.textContent.match(/[\d.]+/)[0]) - parseFloat(expected))).toBeLessThanOrEqual(1)
})

test('a pool\'s speed shows the fill speed actually available, not its higher theoretical Bandwidth', () => {
  seedIntroState({
    bits: 0, capacity: 32_000_000, speedCapacity: 1024, byteCreated: true,
    dataLakes: { 1: { bandwidthSteps: 4 } },
  })
  render(<App />)

  const savedState = JSON.parse(localStorage.getItem('tens_game_state'))
  const available = getPoolAvailableFillRate(savedState, 1)
  expect(available).toBeLessThan(getStoragePoolBandwidth(savedState, 1))
  const speed = within(screen.getByRole('region', { name: 'pool 1' })).getByTitle(/^Available fill bandwidth at/)
  const expected = formatDiskSize(available * FILL_MULTIPLIER_MAX_PERCENT / 100)
  expect(speed.textContent.replace(/^⚡ /, '').replace(/\/s$/, '').split(' ')[1]).toBe(expected.split(' ')[1])
  expect(Math.abs(Number(speed.textContent.match(/[\d.]+/)[0]) - parseFloat(expected))).toBeLessThanOrEqual(1)
})

