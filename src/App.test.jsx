import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, vi } from 'vitest'
import { version } from '../package.json'
import { getTierCost } from 'game/engine'
import {
  AUTO_PRESTIGE_AUTOBUYER_COST,
  BITS_PER_BYTE,
  COMPUTE_BOOST_MAX_STACKS,
  COMPUTE_BOOST_PRESETS,
  DEFAULT_PURCHASE_BLOCK_SIZE,
  INTRO_BITS_PER_KILOBYTE_CONVERSION,
  INTRO_BYTE_COMBINE_COST,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  INTRO_CONVERSION_UNLOCK_CAPACITY,
  INTRO_MIN_TICK_SPEED_SECONDS,
  INTRO_STARTING_CAPACITY,
  INTRO_STARTING_TICK_SPEED_SECONDS,
  INTRO_STORAGE_UNLOCK_CAPACITY,
  PRESTIGE_THRESHOLD,
  STORAGE_BUILD_COST_MULTIPLIER,
  TICK_RATE_MS,
  TIER_DEFINITIONS,
} from 'game/layers'
import App from './App'

// A fresh cycle's full purchase block, in bits — exactly enough for tickIntroAutoInvest to convert
// every unit of tier01's (Kilobytes') current 8-unit block in one call. Used only as a convenient
// round number for seeding tests below; no longer a named threshold in the engine itself (an
// earlier version gated tickIntroAutoInvest on this exact value — see docs/DESIGN_HISTORY.md).
const FRESH_CYCLE_BLOCK_BITS = DEFAULT_PURCHASE_BLOCK_SIZE * INTRO_BITS_PER_KILOBYTE_CONVERSION

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// Every test exercising MainPage (the vast majority of this file) needs the Byte Foundry's
// main-game gate already unlocked, or <App /> lands on ByteFoundryPage instead (see App.jsx's page
// routing — `intro.mainGameUnlocked` is the only thing that decides which page a fresh/seeded save
// opens on). `migrateState` backfills the rest of the `intro` shape from
// `createInitialGameState()`'s own defaults regardless (see storage.js), so
// `{ mainGameUnlocked: true }` alone is always sufficient here — no need to spell out
// bits/capacity/etc. by hand. Pass `overrides.intro` to seed a specific (still-gated) intro state
// instead, e.g. for ByteFoundryPage's own tests below.
const seedMainGameState = (overrides = {}) =>
  localStorage.setItem('tens_game_state', JSON.stringify({ intro: { mainGameUnlocked: true }, ...overrides }))

test('renders the game title and the Kilobytes tier', () => {
  seedMainGameState()
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /tens/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toBeInTheDocument()
  // Money=1 (MONEY_STARTING_AMOUNT) — Kilobytes' per-unit cost is 1,000, so nothing is affordable yet.
  expect(screen.getByRole('button', { name: /buy for 1,000 b\b/i })).toBeDisabled()
})

test('renders the current app version beside the title', () => {
  seedMainGameState()
  render(<App />)

  expect(screen.getByText(`v${version}`)).toBeInTheDocument()
})

test('the Guide link navigates to the Info page and Back to game returns, preserving game state', async () => {
  const user = userEvent.setup()

  // Kilobytes now costs 1,000/unit (baseCost) — seed enough Money for exactly 1 unit.
  seedMainGameState({ resources: { Ones: 1000 } })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  await user.click(screen.getByText('ℹ️ Guide'))
  expect(screen.getByRole('heading', { level: 1, name: /tens — guide/i })).toBeInTheDocument()
  expect(screen.queryByLabelText(/^kilobytes layer$/i)).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /back to game/i }))
  expect(screen.getByRole('heading', { level: 1, name: /^tens$/i })).toBeInTheDocument()
  // Navigating away and back doesn't touch game state — the previous purchase is still there.
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
})

test('buying Kilobytes deducts cost and increases owned count', async () => {
  const user = userEvent.setup()

  // Money=1,000, per-unit cost 1,000 — manual Buy grabs as many as affordable, which is just 1 unit.
  seedMainGameState({ resources: { Ones: 1000 } })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
  // Money=0 left; still at level 1 (1 of 8 purchased), unaffordable — button disabled.
  expect(screen.getByRole('button', { name: /buy for 1,000 b \(level 1, 1 of 8 purchased\)/i })).toBeDisabled()
})

test('the Reset button is always rendered, not gated behind a dev-only build check', () => {
  seedMainGameState()
  render(<App />)

  expect(screen.getByRole('button', { name: /reset game/i })).toBeInTheDocument()
})

test('reset game restores starting state once the confirm dialog is accepted', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  seedMainGameState({ resources: { Ones: 1000 } })
  render(<App />)

  // Buy Kilobytes to dirty the state — money=1,000, per-unit cost 1,000, so a single click buys 1 unit.
  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  // Reset
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

  seedMainGameState({ resources: { Ones: 1000 } })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))

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

  seedMainGameState({ resources: { Ones: 1000 } })
  render(<App />)

  // Buy Kilobytes to dirty the state — money=1,000, per-unit cost 1,000, so a single click buys 1 unit.
  await user.click(screen.getByRole('button', { name: /buy for 1,000 b\b/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBe(1)
})

test('Megabytes tier appears and is purchasable once Kilobytes has fully purchased two levels (16 owned)', () => {
  seedMainGameState({
    resources: { Ones: 8_000_000 },
    owned: { tier01: 16 },
  })
  render(<App />)

  const megabytesLayer = screen.getByLabelText(/^megabytes layer$/i)
  expect(megabytesLayer).toBeInTheDocument()
  // Megabytes' baseCost is 1E6 — level 1, blockSize 8: per-unit cost 1,000,000, full block
  // 8,000,000 — both at/above the 1,000,000 exponential-notation threshold, so they render as "1e6"/"8e6".
  // Scoped to the Megabytes row: Kilobytes' own level-3 buy button happens to render the same
  // "8e6" text (its per-unit cost coincidentally matches Megabytes' level-1 cost at this balance).
  expect(within(megabytesLayer).getByRole('button', { name: /buy ×8 for 8e6 b\b/i })).toBeEnabled()
})

test('buying a higher tier does not deduct the tier below\'s owned count', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 8_000_000 },
    owned: { tier01: 16 },
  })
  render(<App />)

  const megabytesLayer = screen.getByLabelText(/^megabytes layer$/i)
  await user.click(within(megabytesLayer).getByRole('button', { name: /buy ×8 for 8e6 b\b/i }))

  expect(megabytesLayer).toHaveTextContent(/owned: 8/i)
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 16/i)
})

test('money balance is shown once at the top in full currency format, centered, with no per-second yield', () => {
  seedMainGameState()
  render(<App />)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  expect(screen.getByLabelText(/^money display$/i)).not.toHaveTextContent('/sec')
  expect(screen.queryAllByLabelText(/^money display$/i)).toHaveLength(1)
})

test('a money-producing tier shows its per-tick production amount with the currency format, not a per-second rate', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent('+5 b')
  expect(screen.getByLabelText(/^kilobytes layer$/i)).not.toHaveTextContent('/sec')
})

test('a tickspeed multiplier level speeds up delivery frequency, not the amount per delivery or autobuyer purchase frequency', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 5 },
    tickspeedLevels: { tier01: 3 },
  })
  render(<App />)

  // The displayed production figure is the raw per-delivery amount (owned) — level 3's ×1.21
  // speed bonus shortens how often a delivery lands, it no longer inflates the amount, so this
  // still reads +5 b, not +6 b.
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent('+5 b')
  // The cumulative speed bonus no longer shows as a badge on the row itself (see "the
  // automation icon and percentage badge are removed from the tier row" below) — it's still
  // available in the tickspeed button's own title tooltip and the row's Details disclosure.
  expect(screen.getByTitle(/tickspeed multiplier level 3 \(\+21% faster ticks\)/i)).toBeInTheDocument()
})

test('the tier tickspeed multiplier button is buyable even when that tier\'s autobuyer has never been unlocked', async () => {
  const user = userEvent.setup()

  // The last tier (Quettabytes) has the cheapest tickspeed base cost (10^1), so level 1 → 2 costs
  // a testable 10 of its own resource — matching engine.test.js's convention for this ladder.
  seedMainGameState({
    resources: { Ones: 10, tier10: 11 },
    owned: { tier09: 10, tier10: 1 },
    // autobuyers.tier10 is left at its default (null, locked) — the tickspeed multiplier is
    // enabled by default regardless.
  })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /tickspeed multiplier \(\+10% faster ticks\) for 10 QB/i })
  expect(upgradeButton).toBeEnabled()

  await user.click(upgradeButton)

  expect(screen.getByTitle(/tickspeed multiplier level 2 \(\+10% faster ticks\)/i)).toBeInTheDocument()
})

test('reaching 8 lifetime purchases of a tier doubles its displayed production amount', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 8 },
  })
  render(<App />)

  // Crossing the 8-purchase milestone doubles production: owned(5) × 1 b/tick × 2 = 10 b per tick.
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent('+10 b')
})

test('a tier shows its full per-tick production amount, not a reduced rate', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier01: 10, tier02: 4 },
  })
  render(<App />)

  // The displayed amount is the raw per-tick credit (owned(4) × 1, no bonus/milestone) delivered
  // each time the tier's own tickspeed period completes — not divided by tickspeed, since it's
  // not shown as an averaged "/sec" rate. Megabytes PRODUCES Kilobytes (producesResourceId:
  // 'tier01'), so the amount reads in Kilobytes' own symbol (KB), not Megabytes' own (MB).
  expect(screen.getByLabelText(/^megabytes layer$/i)).toHaveTextContent('+4 KB')
})

test('a tier row has no separate "Details" label — clicking its name reveals base/effective tickspeed', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
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

test('a tier row\'s "Effective tickspeed" breakdown shows Overclock as its own separate factor, not folded into the global multiplier', async () => {
  // Regression test for a real bug the underlying formula change reintroduces the shape of: a
  // standalone Overclock factor inside getEffectiveTierTickSpeedSeconds must be reflected as its
  // OWN parenthetical entry here, distinct from "global ×N" — the two figures must agree with the
  // actual three-factor computation by construction, not silently drop the third factor.
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 10, tier02: 4 }, // unlocks Kilobytes (base tickspeed 1s)
    globalTickspeedMultiplier: 9, // 9 regular levels, no milestone yet (first is level 10)
    overclockCount: 10, // a standalone ×1.001^10 ≈ ×1.01 factor, unrelated to the global multiplier
  }))

  render(<App />)

  const kilobytesLayer = screen.getByLabelText(/^kilobytes layer$/i)
  await user.click(within(kilobytesLayer).getByRole('button', { name: /kilobytes/i }))

  // global stays at the unboosted 1.01^9 ≈ 1.09 (Overclock no longer touches this track's step);
  // overclock is its own ×1.001^10 ≈ 1.01 factor; effective period = 1s / (1.09 * 1.01) ≈ 0.91s.
  expect(kilobytesLayer).toHaveTextContent(/effective tickspeed: every 0\.91s \(tier ×1, global ×1\.09, overclock ×1\.01\)/i)
})

test('clicking anywhere else on a tier row\'s tile (not a button) also expands its details', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier01: 10, tier02: 4 },
  })
  render(<App />)

  const megabytesLayer = screen.getByLabelText(/^megabytes layer$/i)
  const trigger = within(megabytesLayer).getByRole('button', { name: /megabytes/i })
  expect(trigger).toHaveAttribute('aria-expanded', 'false')

  // Click the row's own container, not the name trigger and not a button.
  await user.click(megabytesLayer)

  expect(trigger).toHaveAttribute('aria-expanded', 'true')

  // Clicking the tile again collapses it back.
  await user.click(megabytesLayer)
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
})

test('clicking a tier row\'s Buy/tickspeed buttons does not also toggle its details disclosure', async () => {
  const user = userEvent.setup()

  // Enough Money to make the Buy button genuinely clickable (Megabytes costs 1,000,000/unit) —
  // an actually-disabled button would swallow the click entirely, making this assertion trivial.
  seedMainGameState({
    resources: { Ones: 2_000_000 },
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
    resources: { Ones: 10_000 },
    purchased: { tier01: 4 },
  })
  render(<App />)

  const progressBar = screen.getByRole('progressbar', { name: /kilobytes cost-block progress/i })
  expect(progressBar).toHaveAttribute('aria-valuenow', '4')
  expect(progressBar).toHaveAttribute('aria-valuemax', '8')
  // The tier's level (lifetime purchase count) lives on the Buy button itself, not a separate cell.
  // 4 of 8 already done — 4 remain in the block; per-unit cost is 1,000, so 4 units cost $4,000 total.
  const buyButton = screen.getByRole('button', { name: /buy ×4 for 4,000 b \(level 1, 4 of 8 purchased\)/i })
  expect(buyButton).toBeInTheDocument()
  expect(screen.queryByText(/^level: /i)).not.toBeInTheDocument()
  // Regression check for the Button component's `variant` prop: it's consumed internally to
  // resolve a theme color and must never leak onto the rendered DOM node as a raw attribute.
  expect(buyButton).not.toHaveAttribute('variant')
})

test('manual Buy clicks buy as many units as are currently affordable, not just 1', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 100_000 },
  })
  render(<App />)

  // Per-unit cost 1,000: $100,000 affords far more than the 8-unit block, so the full block
  // (capped there, not by funds) is what's bought — $8,000 total.
  const buyButton = screen.getByRole('button', { name: /buy ×8 for 8,000 b\b/i })
  expect(buyButton).toBeEnabled()

  await user.click(buyButton)

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8\b/i)
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('92,000 b')
})

test('manual Buy partially fills when funds only cover part of the cost block', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 3000 }, // affords 3 at $1,000/unit, not the full block of 8
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

test('applies offline progress at 50% speed based on elapsed time since the last save', () => {
  seedMainGameState({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  })
  // 100 real seconds ago → 50 simulated seconds at 50% speed → Kilobytes delivers every 1s, so 50
  // deliveries land in that window → 5 Kilobytes × 50 deliveries = +250 money
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  render(<App />)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('250 b')
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()
})

test('dismissing the offline progress notice hides it', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  render(<App />)
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /dismiss offline progress notice/i }))

  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()
})

test('the offline progress notice shows a countdown on its Dismiss button and fades/auto-dismisses after 10 seconds', () => {
  vi.useFakeTimers()
  seedMainGameState({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

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
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  const { unmount } = render(<App />)

  act(() => { vi.advanceTimersByTime(2_000) })
  fireEvent.click(screen.getByRole('button', { name: /dismiss offline progress notice/i }))

  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('shows no offline progress notice when there is no recorded last-save timestamp', () => {
  seedMainGameState({
    resources: { Ones: 10 },
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
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  })
  // No gap at mount — whatever notice appears below must come from the live tick loop, not
  // computeInitialGame's own check.
  localStorage.setItem('tens_last_save_timestamp', String(Date.now()))

  const { unmount } = render(<App />)
  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()

  // Jumps the clock forward 100 real seconds without advancing any pending timer (unlike
  // vi.advanceTimersByTime, which would fire every intermediate 100ms tick along the way, exactly
  // as an actively foregrounded tab would) — simulating the OS suspending the tab/app's timers
  // while real time keeps passing in the background.
  vi.setSystemTime(Date.now() + 100_000)
  // The tick interval's own next firing sees a ~100s gap since its previous one and treats it as
  // offline progress instead of an ordinary tick.
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // 100s real -> 50s simulated at 50% speed; Kilobytes' 1s tickspeed fits 50 deliveries into that
  // window -> 5 Kilobytes x 50 deliveries = +250 money.
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('250 b')
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('catches up a real-world gap as soon as the page becomes visible again, even before the tick interval next fires', () => {
  vi.useFakeTimers()
  seedMainGameState({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now()))

  const { unmount } = render(<App />)
  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()

  vi.setSystemTime(Date.now() + 100_000)
  Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true })
  act(() => { document.dispatchEvent(new Event('visibilitychange')) })

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('250 b')
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('the first time money reaches a googol, a mandatory full-screen prompt offers Prestige', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
  })
  render(<App />)

  expect(screen.getByRole('dialog', { name: /prestige required/i })).toBeInTheDocument()
  const prestigeButton = screen.getByRole('button', { name: /prestige now/i })
  expect(prestigeButton).toBeEnabled()

  await user.click(prestigeButton)

  expect(screen.queryByRole('dialog', { name: /prestige required/i })).not.toBeInTheDocument()
  // A real Prestige now resets the Byte Foundry intro too (see engine.js's prestigeGame), so the
  // app navigates back there instead of straight to MainPage — see the dedicated Byte-Foundry/
  // Prestige interaction tests further down for the full reset assertions.
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
})

test('from the 2nd prestige onward, reaching a googol shows a top banner instead of the full-screen prompt', () => {
  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  expect(screen.queryByRole('dialog', { name: /prestige required/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige available banner$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /prestige \(requires/i })).toBeEnabled()
})

test('the sticky PP display doubles as a Prestige button once Prestige is available', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /^prestige points display$/i }))

  expect(screen.queryByLabelText(/^prestige available banner$/i)).not.toBeInTheDocument()
})

test('the sticky PP display is not a clickable button before Prestige is available', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 5, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^prestige points display$/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /^prestige points display$/i })).not.toBeInTheDocument()
})

test('production and every other control freeze once money reaches a googol', () => {
  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
    owned: { tier01: 5 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /^buy/i })).toBeDisabled()
  expect(screen.getByRole('button', { name: /reset game/i })).toBeDisabled()
})

test('the Speed Up panel stays hidden before the last tier unlocks', () => {
  seedMainGameState({
    resources: { Ones: 10 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^speed up panel$/i)).not.toBeInTheDocument()
})

test('the Speed Up panel appears once the last tier unlocks, with the button disabled below the required level', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 1 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^speed up panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /speed up \(requires quettabytes level 5/i })).toBeDisabled()
})

test('the Speed Up button is enabled once the last tier reaches the required level', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 6 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /speed up \(requires quettabytes level 5/i })).toBeEnabled()
})

test('the second Speed Up requires one more level than the first, not the same level 5', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 6 },
    speedUpCount: 1,
  })
  render(<App />)

  const button = screen.getByRole('button', { name: /speed up \(requires quettabytes level 6/i })
  expect(button).toBeDisabled()
  expect(screen.queryByRole('button', { name: /speed up \(requires quettabytes level 5\b/i })).not.toBeInTheDocument()
})

test('the Speed Up button shows the next multiplier and requirement progress on itself', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 2 },
    speedUpCount: 2,
  })
  render(<App />)

  // Third activation requires the last tier to reach level 7 (Lv.1/7) and would raise the
  // permanent multiplier to ×8 — both shown on the button itself, with no separate status text line.
  expect(screen.getByRole('button', {
    name: /speed up \(requires quettabytes level 7\) — doubles production speed to ×8/i,
  })).toBeInTheDocument()
  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent('⏩ ×8 · Lv.1/7')
})

test('the speed up and overclock panels render below the tier list, not above it', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3 },
  })
  render(<App />)

  const regions = screen.getAllByRole('region').map(region => region.getAttribute('aria-label'))
  expect(regions.indexOf('speed up panel')).toBeGreaterThan(regions.indexOf('Kilobytes layer'))
  expect(regions.indexOf('overclock panel')).toBeGreaterThan(regions.indexOf('Kilobytes layer'))
})

test('once the last tier is full, its row shows the XP-consume tickspeed button, distinct from the top Speed Up panel button', () => {
  seedMainGameState({
    resources: { Ones: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purchaseLevels: { tier09: 3, tier10: 2 },
    prestige: { xp: 37, points: 0, count: 0, highestMilestone: 0 },
  })
  render(<App />)

  const quettabytesLayer = screen.getByLabelText(/^quettabytes layer$/i)
  const rowXpButton = within(quettabytesLayer).getByRole('button', {
    name: /consume 37 xp for .* quettabytes tickspeed/i,
  })
  expect(rowXpButton).toHaveTextContent('🧬')

  // The top panel's own Speed Up button is a separate element doing something else entirely
  // (resets the run) from the row's XP-consume button (boosts this tier's own tickspeed).
  const panelSpeedUpButton = screen.getByRole('button', { name: /^speed up \(requires quettabytes level 5/i })
  expect(panelSpeedUpButton).not.toBe(rowXpButton)
})

test('clicking Speed Up once eligible resets resources but keeps the panel visible (disabled) rather than hiding it again', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purchaseLevels: { tier09: 3, tier10: 6 },
  })
  render(<App />)

  const speedUpButton = screen.getByRole('button', { name: /speed up \(requires quettabytes level 5/i })
  expect(speedUpButton).toBeEnabled()

  await user.click(speedUpButton)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  // Speed Up resets owned counts too, so the last tier is no longer unlocked — but since the
  // panel was already revealed once, it stays visible (in a disabled state) rather than
  // disappearing again until the player climbs back up to it. The next cycle now requires level 6
  // (speedUpCount incremented to 1 — see getSpeedUpRequirement).
  expect(screen.getByLabelText(/^speed up panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /speed up \(requires quettabytes level 6/i })).toBeDisabled()
})

test('Speed Up resets the global tickspeed multiplier level back to not-yet-bought', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 12345 },
    owned: { tier02: 1, tier09: 10, tier10: 25 },
    purchaseLevels: { tier09: 3, tier10: 6 },
    globalTickspeedMultiplier: 2,
  })
  render(<App />)

  // The cumulative level/bonus only shows in the expanded description, not the button itself —
  // the description stays in the DOM (and toHaveTextContent-visible) even while collapsed.
  expect(screen.getByLabelText(/^global tickspeed panel$/i)).toHaveTextContent(/lv\.2/i)

  await user.click(screen.getByRole('button', { name: /speed up \(requires quettabytes level 5/i }))

  // Speed Up also resets tier02's owned count to 0, so the card's initial-unlock condition
  // (owning tier02) is no longer met either — with the level reset too, the card reverts all the
  // way back to its pre-activation "Enable" state rather than staying at Lv.2.
  expect(screen.getByRole('button', { name: /enable global tickspeed multiplier for 10 b/i })).toBeInTheDocument()
})

test('the Speed Up button is disabled once production freezes at a googol', () => {
  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 2 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /speed up \(requires quettabytes level 5/i })).toBeDisabled()
})

test('no Auto Speed Up control appears during the first run, even with the last tier unlocked', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
  })
  render(<App />)

  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
  expect(screen.queryByText(/auto speed up active/i)).not.toBeInTheDocument()
})

test('the Overclock panel stays hidden before the last tier unlocks', () => {
  seedMainGameState({
    resources: { Ones: 10 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^overclock panel$/i)).not.toBeInTheDocument()
})

test('the Overclock panel appears once the last tier unlocks, with the button disabled below the required level', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 3 },
    overclockCount: 3,
  })
  render(<App />)

  expect(screen.getByLabelText(/^overclock panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /overclock \(requires quettabytes level 4/i })).toBeDisabled()
})

test('the Overclock button is enabled once the last tier reaches the required level', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 4 },
    overclockCount: 3,
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /overclock \(requires quettabytes level 4/i })).toBeEnabled()
})

test('the second Overclock requires one more level than the first, not the same level', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 1 },
    overclockCount: 1,
  })
  render(<App />)

  const button = screen.getByRole('button', { name: /overclock \(requires quettabytes level 2/i })
  expect(button).toBeDisabled()
  expect(screen.queryByRole('button', { name: /overclock \(requires quettabytes level 1\b/i })).not.toBeInTheDocument()
})

test('the Overclock button shows the next multiplier and requirement progress on itself, using the raw (non-offset) tier level', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 8 },
    overclockCount: 5,
  })
  render(<App />)

  // Next claim requires the last tier to reach raw level 6 (Lv.8/6, not a "completed blocks"
  // display offset — see getOverclockRequirement in engine.js) but a claim right now would jump
  // straight to level 8 (the last tier's own current level, ahead of the bare minimum), raising
  // the standalone Overclock multiplier to ×1.01 (1.001^8) — both shown on the button itself, no
  // separate status text line.
  expect(screen.getByRole('button', {
    name: /overclock \(requires quettabytes level 6\) — resets speed up's bonus and raises the standalone overclock multiplier to ×1\.01/i,
  })).toBeInTheDocument()
  expect(screen.getByLabelText(/^overclock panel$/i)).toHaveTextContent('⚡ ×1.01 · Lv.8/6')
})

test('the Overclock card\'s disclosure states the current standalone multiplier once claimed', () => {
  // The disclosure's live-state line stays in the DOM (queryable via toHaveTextContent) even
  // while collapsed by default — same convention every other live-state disclosure on this page
  // follows — so no expand click is needed here.
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 12 },
    overclockCount: 10,
  })

  render(<App />)

  const panel = screen.getByLabelText(/^overclock panel$/i)
  expect(panel).toHaveTextContent(/×1\.01 faster ticks on every tier from level 10\./i)
})

test('the Overclock card\'s disclosure shows no multiplier line before the first claim', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 1 },
  })

  render(<App />)

  const panel = screen.getByLabelText(/^overclock panel$/i)
  expect(panel).not.toHaveTextContent(/faster ticks/i)
})

test('clicking Overclock once eligible jumps overclockCount straight to the last tier\'s current level (catch-up), wipes the Speed Up bonus, and keeps the panel visible (disabled) rather than hiding it again', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purchaseLevels: { tier10: 8 },
    speedUpCount: 5,
  })
  render(<App />)

  // speedUpCount 5 → next activation would raise the multiplier to ×64 (getSpeedUpMultiplier(6)).
  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent('⏩ ×64')

  const overclockButton = screen.getByRole('button', { name: /overclock \(requires quettabytes level 1\b/i })
  expect(overclockButton).toBeEnabled()

  await user.click(overclockButton)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  // Overclock resets owned counts too, so the last tier is no longer unlocked — but since both
  // panels were already revealed once, they stay visible (in a disabled state) rather than
  // disappearing again. The claim jumped overclockCount straight to 8 (the last tier's level at
  // claim time), not just to 1, so the next cycle now requires level 9 — and Speed Up's own
  // stacking bonus is wiped back to ×2 (speedUpCount reset to 0, so the *next* activation would
  // only reach ×2 again).
  expect(screen.getByLabelText(/^overclock panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /overclock \(requires quettabytes level 9/i })).toBeDisabled()
  expect(screen.getByLabelText(/^overclock panel$/i)).toHaveTextContent(/from level 8\./i)
  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent('⏩ ×2')
})

test('the Overclock button is disabled once production freezes at a googol', () => {
  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /overclock \(requires quettabytes level 1\b/i })).toBeDisabled()
})

test('the PP Upgrades page groups purchases into labeled categories', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^tier autobuyers category$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^tier autobuyers category$/i)).toHaveTextContent(/tier autobuyers/i)
  expect(screen.getByLabelText(/^global automation category$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^global automation category$/i)).toHaveTextContent(/global automation/i)
  // No separate reveal gate — Production Bonuses shows as soon as the page itself is reachable.
  expect(screen.getByLabelText(/^production bonuses category$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^production bonuses category$/i)).toHaveTextContent(/production speed bonus/i)
})

test('the Production Bonuses category disappears once the speed bonus is bought (nothing left to show)', async () => {
  seedMainGameState({
    resources: { Ones: 10 },
    prestigeSpeedBonusUnlocked: true,
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^production bonuses category$/i)).not.toBeInTheDocument()
})

test('an Enable Auto Speed Up button appears on the PP Upgrades page after the first prestige, and spends 20 PP to enable it', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    prestige: { xp: 0, points: 20, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const autoSpeedUpButton = screen.getByRole('button', { name: /enable auto speed up for 20 prestige points/i })
  expect(autoSpeedUpButton).toBeEnabled()

  await user.click(autoSpeedUpButton)

  expect(screen.getByLabelText('Auto Speed Up active')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the global tickspeed panel renders above the tier list, not below it', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier02: 1 },
  })
  render(<App />)

  const regions = screen.getAllByRole('region').map(region => region.getAttribute('aria-label'))
  expect(regions.indexOf('global tickspeed panel')).toBeLessThan(regions.indexOf('Kilobytes layer'))
})

test('an Enable Tickspeed Autobuyer button appears on the PP Upgrades page after the first prestige, and spends 10 PP to enable it', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    prestige: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const tickspeedAutobuyerButton = screen.getByRole('button', { name: /enable tickspeed autobuyer for 10 prestige points/i })
  expect(tickspeedAutobuyerButton).toBeEnabled()

  await user.click(tickspeedAutobuyerButton)

  expect(screen.getByLabelText('Tickspeed Autobuyer active')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable tickspeed autobuyer/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('a static "Active" badge shows on the PP Upgrades page once Auto Speed Up has been bought', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    autoSpeedUp: true,
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText('Auto Speed Up active')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
})

test('pausing Auto Speed Up via its toggle stops it from firing automatically, even once eligible; resuming fires it again', () => {
  vi.useFakeTimers()

  seedMainGameState({
    resources: { Ones: 12345 },
    owned: { tier09: 10 },
    purchaseLevels: { tier09: 3, tier10: 6 },
    autoSpeedUp: true,
    autoSpeedUpEnabled: false,
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  const { unmount } = render(<App />)

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  // Still eligible (purchaseLevels.tier10 untouched) since Auto Speed Up starts paused.
  expect(screen.getByRole('button', { name: /speed up \(requires quettabytes level 5/i })).toBeEnabled()

  // The pause toggle lives on the PP Upgrades page; the tick timer itself keeps running
  // regardless of which view is currently rendered.
  fireEvent.click(screen.getByRole('tab', { name: /upgrades/i }))
  fireEvent.click(screen.getByRole('button', { name: /resume auto speed up automation/i }))
  fireEvent.click(screen.getByRole('tab', { name: /game/i }))
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // Speed Up fired automatically once resumed — resources reset and the next cycle requires level 6.
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  expect(screen.getByRole('button', { name: /speed up \(requires quettabytes level 6/i })).toBeDisabled()

  unmount()
  vi.useRealTimers()
})

test('no Global Tickspeed Multiplier panel appears before the second tier has ever been owned', () => {
  seedMainGameState({
    resources: { Ones: 10 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^global tickspeed panel$/i)).not.toBeInTheDocument()
})

test('an Enable Global Tickspeed Multiplier button appears once the second tier is owned (even during the first run), and spends 10 Money to activate level 1', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier02: 1 },
  })
  render(<App />)

  const globalTickspeedButton = screen.getByRole('button', { name: /enable global tickspeed multiplier for 10 b/i })
  expect(globalTickspeedButton).toBeEnabled()

  await user.click(globalTickspeedButton)

  const upgradeButton = screen.getByRole('button', { name: /upgrade global tickspeed multiplier for 100 b/i })
  expect(upgradeButton).toBeInTheDocument()
  // The cumulative level/bonus shows only in the expanded description, never on the button
  // itself or the heading — both stay compact regardless of level.
  expect(upgradeButton).not.toHaveTextContent(/lv\.1/i)
  expect(screen.getByRole('heading', { level: 2, name: 'Tickspeed' })).not.toHaveTextContent(/lv\.1|\+1%/i)
  const panel = screen.getByLabelText(/^global tickspeed panel$/i)
  expect(panel).toHaveTextContent(/lv\.1/i)
  // Level 1 is a regular (non-milestone) level, compounding the usual 1%.
  expect(panel).toHaveTextContent(/\+1%/i)
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('0 b')
})

test('the Tickspeed panel\'s Lv./bonus line is collapsed until the heading is clicked, and clicking the revealed line collapses it again', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 999 },
    globalTickspeedMultiplier: 1,
  })
  render(<App />)

  const heading = screen.getByRole('heading', { level: 2, name: 'Tickspeed' })
  const statusLine = screen.getByText(/lv\.1 —/i)
  expect(statusLine).not.toBeVisible()

  await user.click(heading)
  expect(statusLine).toBeVisible()

  // Clicking the revealed line itself (not the heading) also collapses it.
  await user.click(statusLine)
  expect(statusLine).not.toBeVisible()

  await user.click(heading)
  expect(statusLine).toBeVisible()
  // Clicking the heading again (native <summary> toggle) still works too.
  await user.click(heading)
  expect(statusLine).not.toBeVisible()
})

test('the Enable Global Tickspeed Multiplier button stays disabled without enough Money', () => {
  seedMainGameState({
    resources: { Ones: 9 },
    owned: { tier02: 1 },
  })
  render(<App />)

  expect(screen.getByRole('button', { name: /enable global tickspeed multiplier for 10 b/i })).toBeDisabled()
})

test('the Global Tickspeed Multiplier Upgrade button costs another power of ten each level, and shows the compounding bonus with decimal precision below 100%', () => {
  seedMainGameState({
    resources: { Ones: 999 },
    globalTickspeedMultiplier: 2,
  })
  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade global tickspeed multiplier for 1,000 b/i })
  expect(upgradeButton).toBeDisabled()
  // The cumulative level/bonus shows only in the expanded description, not on the button itself.
  expect(upgradeButton).not.toHaveTextContent(/lv\.2/i)
  const panel = screen.getByLabelText(/^global tickspeed panel$/i)
  expect(panel).toHaveTextContent(/lv\.2/i)
  // Level 2 is still below the first 10-level milestone — two regular 1% levels compounded
  // (1.01^2 ≈ ×1.0201) land on a fractional percentage, shown to 2 decimal places.
  expect(panel).toHaveTextContent(/\+2\.01%/i)
})

test('the global tickspeed bonus jumps at the first 10-level milestone, compounding the 10% milestone step on top of the regular 1% levels before it', () => {
  seedMainGameState({
    resources: { Ones: 1e15 },
    globalTickspeedMultiplier: 10,
  })
  render(<App />)

  // 9 regular 1% levels compounded, then the level-10 milestone at 10% instead of 1%:
  // 1.01^9 * 1.10 ≈ ×1.2031.
  expect(screen.getByLabelText(/^global tickspeed panel$/i)).toHaveTextContent(/\+20\.31%/i)
})

test('the global tickspeed bonus still shows fractional percent precision one level before a milestone pushes it past 100%', () => {
  seedMainGameState({
    resources: { Ones: 1e15 },
    globalTickspeedMultiplier: 39,
  })
  render(<App />)

  // Level 39 (no milestone yet — next one is at 40) is still under 100%, so it shows 2 decimals.
  expect(screen.getByLabelText(/^global tickspeed panel$/i)).toHaveTextContent(/\+90\.44%/i)
})

test('the global tickspeed bonus switches to an "Nx" multiplier once it crosses +100% at a milestone', () => {
  seedMainGameState({
    resources: { Ones: 1e15 },
    globalTickspeedMultiplier: 40,
  })
  render(<App />)

  // Level 40 is a milestone (every 10th level up to 100) — the resulting jump crosses +100%
  // (×2.0948), so it's shown as a "2.09x" multiplier (formatBonusOrMultiplier) instead of a
  // percentage.
  const panel = screen.getByLabelText(/^global tickspeed panel$/i)
  expect(panel).toHaveTextContent(/2\.09x/i)
  expect(panel).not.toHaveTextContent(/109%/i)
})

const ALL_TIER_IDS = ['tier01', 'tier02', 'tier03', 'tier04', 'tier05', 'tier06', 'tier07', 'tier08', 'tier09', 'tier10']
// Every tier smart AND tickspeed-automated (both require every tier's autobuyer already
// unlocked) is what unlocks the Auto-Prestige option in the UI at all — see MainPage's
// allTiersFullyAutomated gate.
const allTiersSmartSeed = () => ({
  owned: Object.fromEntries(ALL_TIER_IDS.slice(0, 9).map(id => [id, 10])),
  autobuyers: Object.fromEntries(ALL_TIER_IDS.map(id => [id, 1])),
  smartAutobuyer: Object.fromEntries(ALL_TIER_IDS.map(id => [id, true])),
  tierTickspeedAutobuyer: Object.fromEntries(ALL_TIER_IDS.map(id => [id, true])),
})

// Every PP-spending button independently gates on its own cost vs. prestige.points — one seed
// short of each button's own cost below, table-driven since the shape (seed state, find button by
// name, assert disabled) is identical across all of them and only the seed/cost/button name differ.
test.each([
  {
    name: 'Enable Tickspeed Autobuyer',
    seed: { owned: { tier09: 10 }, prestige: { xp: 0, points: 9, count: 1, highestMilestone: 1 } },
    buttonName: /enable tickspeed autobuyer for 10 prestige points/i,
  },
  {
    name: 'Enable Auto Speed Up',
    seed: { owned: { tier09: 10 }, prestige: { xp: 0, points: 19, count: 1, highestMilestone: 1 } },
    buttonName: /enable auto speed up for 20 prestige points/i,
  },
  {
    name: 'Auto-Prestige',
    seed: { ...allTiersSmartSeed(), prestige: { xp: 0, points: 999, count: 1, highestMilestone: 1 } },
    buttonName: /enable auto-prestige for 1000 prestige points/i,
  },
  {
    name: 'Auto-Prestige Autobuyer',
    seed: {
      ...allTiersSmartSeed(),
      autoPrestige: 1,
      prestige: { xp: 0, points: AUTO_PRESTIGE_AUTOBUYER_COST - 1, count: 1, highestMilestone: 1 },
    },
    buttonName: new RegExp(`enable auto-prestige autobuyer for ${AUTO_PRESTIGE_AUTOBUYER_COST} prestige points`, 'i'),
  },
  {
    name: 'Unlock Speed Bonus',
    seed: { prestige: { xp: 0, points: 9999, count: 1, highestMilestone: 1 } },
    buttonName: /unlock prestige point production speed bonus for 10000 prestige points/i,
  },
  {
    name: "Kilobytes's Smart",
    seed: { autobuyers: { tier01: 1 }, prestige: { xp: 0, points: 9, count: 1, highestMilestone: 1 } },
    buttonName: /make kilobytes's autobuyer smart .* for 10 prestige points/i,
  },
])('the $name button stays disabled without enough Prestige Points', async ({ seed, buttonName }) => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    ...seed,
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByRole('button', { name: buttonName })).toBeDisabled()
})

// Every automation's pause/resume toggle follows the same shape (bought → badge + pause button →
// pause flips the badge/aria-pressed → resume flips them back) — table-driven since only the seed
// state and aria-label/name strings differ per automation.
test.each([
  {
    name: 'Tickspeed Autobuyer',
    seed: { owned: { tier09: 10 }, autoGlobalTickspeed: true },
    pauseName: /pause tickspeed autobuyer automation/i,
    resumeName: /resume tickspeed autobuyer automation/i,
  },
  {
    name: 'Auto Speed Up',
    seed: { owned: { tier09: 10 }, autoSpeedUp: true },
    pauseName: /pause auto speed up automation/i,
    resumeName: /resume auto speed up automation/i,
  },
  {
    name: 'Auto-Prestige',
    seed: { ...allTiersSmartSeed(), autoPrestige: 1 },
    pauseName: /pause auto-prestige automation/i,
    resumeName: /resume auto-prestige automation/i,
  },
  {
    name: 'Auto-Prestige Autobuyer',
    seed: { ...allTiersSmartSeed(), autoPrestige: 1, autoPrestigeAutobuyer: true },
    pauseName: /pause auto-prestige autobuyer automation/i,
    resumeName: /resume auto-prestige autobuyer automation/i,
  },
  {
    name: "Kilobytes's tickspeed autobuyer",
    seed: { autobuyers: { tier01: 1 }, tierTickspeedAutobuyer: { tier01: true } },
    pauseName: /pause kilobytes's tickspeed autobuyer/i,
    resumeName: /resume kilobytes's tickspeed autobuyer/i,
  },
])('a pause toggle appears beside the $name badge once bought, and pausing/resuming updates it', async ({ seed, pauseName, resumeName, name }) => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
    ...seed,
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

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

test('the Auto-Prestige option stays hidden until every tier is upgraded to Smart', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByRole('button', { name: /auto-prestige/i })).not.toBeInTheDocument()
  expect(screen.queryByText(/auto-prestige/i)).not.toBeInTheDocument()
})

test('an Auto-Prestige button appears on the PP Upgrades page once every tier is Smart, and spends 1000 PP to activate level 1', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const autoPrestigeButton = screen.getByRole('button', { name: /enable auto-prestige for 1000 prestige points/i })
  expect(autoPrestigeButton).toBeEnabled()

  await user.click(autoPrestigeButton)

  expect(screen.getByLabelText(/^auto-prestige upgrade$/i)).toHaveTextContent(/lv\.1/i)
  expect(screen.getByRole('button', { name: /upgrade auto-prestige for 2000 prestige points/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('no pause toggle appears for Auto-Prestige before it has ever been activated', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByRole('button', { name: /pause auto-prestige automation/i })).not.toBeInTheDocument()
})

test('the Auto-Prestige Upgrade button costs double the previous level, and stays disabled without enough points', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    autoPrestige: 1,
    prestige: { xp: 0, points: 1999, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^auto-prestige upgrade$/i)).toHaveTextContent(/lv\.1/i)
  expect(screen.getByRole('button', { name: /upgrade auto-prestige for 2000 prestige points/i })).toBeDisabled()
})

test('the Auto-Prestige Autobuyer row stays hidden until Auto-Prestige has been activated', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByText(/auto-prestige autobuyer/i)).not.toBeInTheDocument()
})

test(`an Auto-Prestige Autobuyer button appears once Auto-Prestige is active, and spends ${AUTO_PRESTIGE_AUTOBUYER_COST} PP to unlock it`, async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    autoPrestige: 1,
    prestige: { xp: 0, points: AUTO_PRESTIGE_AUTOBUYER_COST, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const unlockButton = screen.getByRole('button', { name: new RegExp(`enable auto-prestige autobuyer for ${AUTO_PRESTIGE_AUTOBUYER_COST} prestige points`, 'i') })
  expect(unlockButton).toBeEnabled()

  await user.click(unlockButton)

  expect(screen.getByLabelText('Auto-Prestige Autobuyer active')).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('prestige points and the production speed bonus are shown once the bonus is unlocked', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    prestigeSpeedBonusUnlocked: true,
    prestige: { xp: 0, points: 50, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('50 PP')
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('+50% production speed')
})

test('the production speed bonus reads as locked, and an unlock button is offered on the PP Upgrades page, before it has been bought', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 10500, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('10,500 PP')
  // The compact sticky balance bar stays terse and omits the "locked" caveat entirely.
  expect(screen.getByLabelText(/^prestige points display$/i)).not.toHaveTextContent(/production speed bonus locked/i)

  await user.click(screen.getByRole('tab', { name: /upgrades/i }))
  const unlockButton = screen.getByRole('button', { name: /unlock prestige point production speed bonus for 10000 prestige points/i })
  expect(unlockButton).toBeEnabled()

  await user.click(unlockButton)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('500 PP')
  // 500 unspent PP → ×6 production speed (1 + 0.01×500) — at/above +100%, this shows as a "6x"
  // multiplier (formatBonusOrMultiplier) rather than a percentage.
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('6x production speed')
  expect(screen.queryByRole('button', { name: /unlock prestige point production speed bonus/i })).not.toBeInTheDocument()
})

test('PP-spending buttons report how much of their cost the current balance covers, like the tier buttons', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  // tier01's autobuyer unlocked automatically at Prestige 1 (count 1 here) — Smart costs 10 PP,
  // and 10 PP fully covers it (valuenow caps at the cost).
  const smartProgress = screen.getByRole('progressbar', { name: /kilobytes smart autobuyer prestige point progress/i })
  expect(smartProgress).toHaveAttribute('aria-valuenow', '10')
  expect(smartProgress).toHaveAttribute('aria-valuemax', '10')

  // Auto Speed Up costs 20 PP — 10 PP covers half.
  const autoSpeedUpProgress = screen.getByRole('progressbar', { name: /auto speed up prestige point progress/i })
  expect(autoSpeedUpProgress).toHaveAttribute('aria-valuenow', '10')
  expect(autoSpeedUpProgress).toHaveAttribute('aria-valuemax', '20')
})

test('a locked badge appears on the PP Upgrades page for a tier whose autobuyer milestone has not been reached yet', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    // tier01's autobuyer unlocks automatically at Prestige 1, so it's already unlocked the moment
    // the PP Upgrades page itself is reachable (!isFirstRun) — there's no PP cost, no button, and
    // no locked state to observe for it. tier02's own milestone (Prestige 2) isn't met yet at
    // count 1, so it's the one that stays locked here.
    owned: { tier01: 16 }, // fully purchases two levels, unlocking Megabytes
    prestige: { xp: 0, points: 100, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^megabytes's autobuyer unlocks at prestige 2$/i)).toBeInTheDocument()
  // Smart isn't purchasable yet — it requires the autobuyer already be unlocked, regardless of PP held.
  expect(screen.queryByRole('button', { name: /make megabytes's autobuyer smart/i })).not.toBeInTheDocument()
})

test('a tier\'s autobuyer auto-unlocks (no PP spent) once its prestige milestone is reached, revealing Smart in its place', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier01: 16 },
    prestige: { xp: 0, points: 20, count: 2, highestMilestone: 1 }, // meets megabytes' milestone (2)
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^megabytes's autobuyer unlocks at prestige/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText("Megabytes's autobuyer active")).toBeInTheDocument()
  // Megabytes' Smart cost is 20 PP (SMART_AUTOBUYER_COST_MULTIPLIER × its 2 PP-equivalent benchmark).
  expect(screen.getByRole('button', { name: /make megabytes's autobuyer smart/i })).toBeEnabled()
  // Confirms no PP was spent to reach this state — the milestone unlock is free.
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('20 PP')
})

test('no PP Upgrades tab or PP-based controls appear before the player has ever prestiged, even with an active autobuyer and unspent PP — but Game/Milestones stay reachable', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 5, count: 0, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^prestige points display$/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('tab', { name: /upgrades/i })).not.toBeInTheDocument()
  // Unlike Upgrades, Game and Milestones are always reachable — MainPage itself is only ever
  // rendered once the Byte Foundry intro is complete, and Chapters (inside Milestones) needs to be
  // visible before a first Prestige so "Go Googol" can be seen locked, not permanently pre-checked.
  expect(screen.getByRole('tab', { name: /^game$/i })).toBeInTheDocument()
  expect(screen.getByRole('tab', { name: /milestones/i })).toBeInTheDocument()
})

test('a Smart button appears on the PP Upgrades page once a tier\'s autobuyer is unlocked (not before), and spends 10x the unlock cost', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const smartButton = screen.getByRole('button', { name: /make kilobytes's autobuyer smart .* for 10 prestige points/i })
  expect(smartButton).toBeEnabled()
  // The Unlock control is already gone — the autobuyer is unlocked, Smart has taken its place.
  expect(screen.queryByRole('button', { name: /unlock kilobytes's autobuyer/i })).not.toBeInTheDocument()

  await user.click(smartButton)

  // Smart is bought, but the row stays — the tier tickspeed autobuyer purchase is independent
  // and still pending, so there's still something left to buy for this tier.
  expect(screen.queryByRole('button', { name: /make kilobytes's autobuyer smart/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes pp upgrades$/i)).toHaveTextContent(/smart/i)
  expect(screen.queryByLabelText(/^full smart autobuyer notice$/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('a tier\'s tickspeed autobuyer shows a locked badge until its own (later) prestige milestone is reached, independent of the unit-buying autobuyer', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 }, // the unit-buying autobuyer is already unlocked
    prestige: { xp: 0, points: 10, count: 11, highestMilestone: 1 }, // one short of Kilobytes's tickspeed milestone (12)
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^kilobytes's tickspeed autobuyer unlocks at prestige 12$/i)).toBeInTheDocument()
  // Smart is independent of the tickspeed autobuyer and already purchasable (autobuyer unlocked, 10 PP held).
  expect(screen.getByRole('button', { name: /make kilobytes's autobuyer smart/i })).toBeEnabled()
})

test('a tier\'s tickspeed autobuyer auto-unlocks (no PP spent) once its own prestige milestone is reached', async () => {
  seedMainGameState({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 10, count: 12, highestMilestone: 1 }, // meets Kilobytes's tickspeed milestone (12)
  })
  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^kilobytes's tickspeed autobuyer unlocks at prestige/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText("Kilobytes's tickspeed autobuyer active")).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('10 PP')
})

test('a tier\'s row disappears only once both Smart and its tier tickspeed autobuyer are bought', async () => {
  seedMainGameState({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    smartAutobuyer: { tier01: true },
    tierTickspeedAutobuyer: { tier01: true },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^kilobytes pp upgrades$/i)).not.toBeInTheDocument()
})

test('a tier\'s row on the PP Upgrades page does not appear before that tier itself is reachable, regardless of prestige count', async () => {
  seedMainGameState({
    resources: { Ones: 10 },
    // tier02 isn't unlocked yet: tier01 is owned below the 8-unit unlock threshold.
    owned: { tier01: 3 },
    // A high enough prestige count to have already met every milestone up through tier02 — still
    // shouldn't matter, since the row itself is gated on the tier being reachable this run, not on
    // milestones already met.
    prestige: { xp: 0, points: 100, count: 30, highestMilestone: 1 },
  })
  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^megabytes pp upgrades$/i)).not.toBeInTheDocument()
})

test('the PP Upgrades tab NavDot lights up when a tier\'s Smart purchase is affordable, even though autobuyer unlock/tier tickspeed autobuyer no longer cost PP at all', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.getByLabelText(/^pp upgrade available$/i)).toBeInTheDocument()
})

test('the PP Upgrades tab NavDot stays dark when only a locked (milestone-gated) tier autobuyer/tier tickspeed autobuyer is pending, since neither costs PP', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    // tier01's autobuyer is already unlocked (milestone 1, met by count 1) but there's no PP to
    // spend on anything — not Smart, not any of the global automations — so nothing here is
    // "affordable" despite later tiers' autobuyer/tickspeed-autobuyer rows still showing locked.
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^pp upgrade available$/i)).not.toBeInTheDocument()
})

test('the PP Upgrades tab NavDot goes dark once a tier is fully done and nothing else is affordable', () => {
  seedMainGameState({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    smartAutobuyer: { tier01: true },
    tierTickspeedAutobuyer: { tier01: true },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  expect(screen.queryByLabelText(/^pp upgrade available$/i)).not.toBeInTheDocument()
})

test('the Milestones tab is reachable both before and after the first prestige (unlike Upgrades)', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 0, highestMilestone: 1 },
  })
  render(<App />)

  // Reachable pre-prestige — the fix that lets Chapters' "Go Googol" row actually be observed
  // locked, rather than the Milestones view being unreachable until after it's already true.
  expect(screen.getByRole('tab', { name: /milestones/i })).toBeInTheDocument()
  expect(screen.queryByRole('tab', { name: /upgrades/i })).not.toBeInTheDocument()

  await user.click(screen.getByRole('tab', { name: /milestones/i }))
  expect(screen.getByLabelText(/^milestones page$/i)).toBeInTheDocument()
})

test('the Milestones page lists every tier\'s autobuyer/tier-tickspeed-autobuyer unlock milestone, reflecting what\'s already unlocked', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 3, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /milestones/i }))

  expect(screen.getByLabelText(/^milestones page$/i)).toBeInTheDocument()

  // Prestige count 3 meets Kilobytes/Megabytes/Gigabytes' autobuyer-unlock milestones (1/2/3) but not
  // Terabytes' (4) — each already-met tier shows as unlocked, the next one as still locked.
  expect(screen.getByLabelText(/^kilobytes's autobuyer unlocked at prestige 1$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^megabytes's autobuyer unlocked at prestige 2$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^gigabytes's autobuyer unlocked at prestige 3$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^terabytes's autobuyer unlocks at prestige 4, currently at prestige 3$/i)).toBeInTheDocument()

  // None of the tier tickspeed autobuyer milestones (12+) are anywhere close yet.
  expect(screen.getByLabelText(/^kilobytes's tickspeed autobuyer unlocks at prestige 12, currently at prestige 3$/i)).toBeInTheDocument()
  const tickspeedProgress = screen.getByRole('progressbar', { name: /^kilobytes tickspeed autobuyer milestone progress$/i })
  expect(tickspeedProgress).toHaveAttribute('aria-valuenow', '3')
  expect(tickspeedProgress).toHaveAttribute('aria-valuemax', '12')
})

test('an autobuyer active/paused badge appears on the PP Upgrades page once its autobuyer is unlocked, toggled by its own pause button', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText("Kilobytes's autobuyer active")).toBeInTheDocument()
  const pauseButton = screen.getByRole('button', { name: /pause kilobytes's autobuyer/i })
  expect(pauseButton).toHaveAttribute('aria-pressed', 'true')

  await user.click(pauseButton)
  expect(screen.getByLabelText("Kilobytes's autobuyer paused")).toBeInTheDocument()
  const resumeButton = screen.getByRole('button', { name: /resume kilobytes's autobuyer/i })
  expect(resumeButton).toHaveAttribute('aria-pressed', 'false')

  await user.click(resumeButton)
  expect(screen.getByLabelText("Kilobytes's autobuyer active")).toBeInTheDocument()
})

test('no autobuyer pause button appears on the PP Upgrades page before its autobuyer is unlocked', async () => {
  const user = userEvent.setup()

  // Megabytes' autobuyer unlocks at Prestige 2 (getAutobuyerUnlockMilestone) — Prestige 1 is
  // enough to leave isFirstRun and reach the Upgrades tab, but not enough to unlock it, unlike
  // Kilobytes (milestone 1) which would already be unlocked at this same count.
  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier02: 1 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByRole('button', { name: /pause megabytes's autobuyer/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText("Megabytes's autobuyer unlocks at Prestige 2")).toBeInTheDocument()
})

test('pausing a tier\'s autobuyer via its PP Upgrades toggle stops it from buying automatically; resuming resumes it', () => {
  vi.useFakeTimers()

  seedMainGameState({
    resources: { Ones: 10000 },
    autobuyers: { tier01: 1 },
    autobuyersEnabled: { tier01: false },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('tab', { name: /upgrades/i }))

  // The autobuyer attempt budget accumulates at a flat rate of 1 per real second, so a single
  // 100ms tick isn't enough to trigger a purchase attempt either way — advance a full second
  // (10 ticks) so a paused autobuyer's lack of purchases is a meaningful assertion, not just "not
  // enough time has passed yet".
  act(() => { vi.advanceTimersByTime(1000) })
  fireEvent.click(screen.getByRole('tab', { name: /game/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 0\b/i)

  fireEvent.click(screen.getByRole('tab', { name: /upgrades/i }))
  fireEvent.click(screen.getByRole('button', { name: /resume kilobytes's autobuyer/i }))
  act(() => { vi.advanceTimersByTime(1000) })

  fireEvent.click(screen.getByRole('tab', { name: /game/i }))
  expect(screen.getByLabelText(/^kilobytes layer$/i)).not.toHaveTextContent(/owned: 0\b/i)

  unmount()
  vi.useRealTimers()
})

test('pausing a tier\'s tickspeed autobuyer via its PP Upgrades toggle stops it from upgrading automatically; resuming resumes it', () => {
  vi.useFakeTimers()

  // tier09 (Ronnabytes, tierIndex 8) has a much cheaper tickspeed multiplier base cost (100) than
  // an earlier tier, keeping the seeded resource amount small; owned > 0 already satisfies
  // isTierUnlocked for this tier directly, with no dependency on any other tier's state.
  seedMainGameState({
    resources: { Ones: 10, tier09: 101 },
    owned: { tier09: 101 },
    tierTickspeedAutobuyer: { tier09: true },
    tierTickspeedAutobuyerEnabled: { tier09: false },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('tab', { name: /upgrades/i }))

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  expect(screen.getByRole('button', { name: /resume ronnabytes's tickspeed autobuyer/i })).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /resume ronnabytes's tickspeed autobuyer/i }))
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  expect(screen.getByRole('button', { name: /pause ronnabytes's tickspeed autobuyer/i })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('tab', { name: /game/i }))
  expect(screen.getByTitle(/tickspeed multiplier level 2 \(\+10% faster ticks\)/i)).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('once every tier is smart and tickspeed-automated, a single notice replaces every per-tier row', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^full smart autobuyer notice$/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /make .*'s autobuyer smart/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /unlock .*'s autobuyer/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /make .*'s tickspeed multiplier upgrade itself automatically/i })).not.toBeInTheDocument()
})

test('a tier fully Smart but not yet tickspeed-automated does not trigger the "every tier" notice', async () => {
  seedMainGameState({
    resources: { Ones: 10 },
    owned: Object.fromEntries(ALL_TIER_IDS.slice(0, 9).map(id => [id, 10])),
    autobuyers: Object.fromEntries(ALL_TIER_IDS.map(id => [id, 1])),
    smartAutobuyer: Object.fromEntries(ALL_TIER_IDS.map(id => [id, true])),
    // tierTickspeedAutobuyer deliberately left unbought for every tier.
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^full smart autobuyer notice$/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes pp upgrades$/i)).toBeInTheDocument()
})

test('clicking the money balance expands a breakdown of every global production multiplier currently in effect, and collapses again on a second click', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier02: 1, tier10: 10 },
    prestigeSpeedBonusUnlocked: true,
    speedUpCount: 2,
    globalTickspeedMultiplier: 1,
    prestige: { xp: 0, points: 50, count: 1, highestMilestone: 1 },
  })
  render(<App />)

  const moneyDisplay = screen.getByRole('button', { name: /^money display$/i })
  expect(moneyDisplay).toHaveAttribute('aria-expanded', 'false')
  expect(screen.queryByLabelText(/^global production multipliers$/i)).not.toBeInTheDocument()

  await user.click(moneyDisplay)

  expect(moneyDisplay).toHaveAttribute('aria-expanded', 'true')
  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).toHaveTextContent(/prestige speed bonus: \+50% production speed from 50 unspent pp/i)
  expect(breakdown).toHaveTextContent(/speed up: ×4 production speed from 2 activations/i)
  expect(breakdown).toHaveTextContent(/tickspeed: \+[\d.]+% faster ticks on every tier \(lv\.1\)/i)

  await user.click(moneyDisplay)

  expect(moneyDisplay).toHaveAttribute('aria-expanded', 'false')
  expect(screen.queryByLabelText(/^global production multipliers$/i)).not.toBeInTheDocument()
})

test('the money balance breakdown reports a not-yet-unlocked/not-yet-activated status for each global multiplier before it becomes active', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier02: 1, tier10: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('button', { name: /^money display$/i }))

  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).toHaveTextContent(/prestige speed bonus: not yet unlocked \(10,000 pp on the upgrades page\)/i)
  expect(breakdown).toHaveTextContent(/speed up: not yet activated \(reach level 5 on quettabytes\)/i)
  expect(breakdown).toHaveTextContent(/tickspeed: not yet active/i)
})

test('the money balance breakdown omits the Prestige speed bonus line before the first prestige, but still shows Speed Up/Global Tickspeed status once those are revealed', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier02: 1, tier10: 10 },
  })
  render(<App />)
  await user.click(screen.getByRole('button', { name: /^money display$/i }))

  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).not.toHaveTextContent(/prestige speed bonus/i)
  expect(breakdown).toHaveTextContent(/speed up: not yet activated/i)
  expect(breakdown).toHaveTextContent(/tickspeed: not yet active/i)
})

test('the money balance breakdown\'s Overclock line reports its own standalone multiplier, not the Tickspeed upgrade\'s rate', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    owned: { tier02: 1, tier10: 10 },
    overclockCount: 2,
  })

  render(<App />)
  await user.click(screen.getByRole('button', { name: /^money display$/i }))

  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).toHaveTextContent(
    /overclock: \+0\.2% faster ticks on every tier \(lv\.2\)/i
  )
})

// --- ByteFoundryPage (the pre-game intro) ---
// A completely empty localStorage (cleared in beforeEach) loads createInitialGameState()'s own
// fresh defaults directly (no migration involved at all — computeInitialGame only calls
// migrateState when loadGameState() finds something saved) — intro.mainGameUnlocked is false
// there, so <App /> lands on ByteFoundryPage. Seeding tens_game_state with an explicit (still-
// gated) `intro` object below reproduces later Byte Foundry states without tapping/combining/
// investing by hand.
const seedIntroState = (introOverrides = {}, otherOverrides = {}) =>
  localStorage.setItem('tens_game_state', JSON.stringify({
    intro: {
      bits: 0,
      productionAccumulator: 0,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: false,
      productionMultiplier: 1,
      mainGameUnlocked: false,
      ...introOverrides,
    },
    ...otherOverrides,
  }))

test('tapping increments the bit balance and stops once capacity is reached', async () => {
  const user = userEvent.setup()

  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  const tapButton = screen.getByRole('button', { name: /tap to generate a bit/i })
  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
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

test('combining 8 bits into a Byte resets the balance and starts passive production', async () => {
  const user = userEvent.setup()

  seedIntroState({ bits: INTRO_BYTE_COMBINE_COST })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', String(INTRO_BYTE_COMBINE_COST))
  const combineButton = screen.getByRole('button', { name: /combine 8 bits into a Byte/i })

  await user.click(combineButton)

  // The combine action is one-time — its own button is gone once byteCreated flips true.
  expect(screen.queryByRole('button', { name: /combine 8 bits into a Byte/i })).not.toBeInTheDocument()
  // Consumes the full cost (8), leaving the balance at 0, and reveals the passive-production status line.
  expect(balanceBar).toHaveAttribute('aria-valuenow', '0')
  expect(screen.getByText(/\+1 bit\/sec/i)).toBeInTheDocument()
})

test('the milestone offers stay disabled while the bit balance is below capacity', () => {
  seedIntroState({ bits: 5, capacity: INTRO_STARTING_CAPACITY, byteCreated: true })
  render(<App />)

  expect(screen.getByRole('button', { name: /sacrifice all bits for 10x capacity/i })).toBeDisabled()
  expect(screen.getByRole('button', { name: /invest bits for double production/i })).toBeDisabled()
})

// The single most important behavioral regression to cover per the milestone-offer asymmetry
// correction (see docs/DESIGN_HISTORY.md): "Invest for Double Production" is an ordinary
// cost-gated purchase (requires bits >= capacity), unaffected by clicking "Sacrifice for 10x
// Capacity" itself (which alone requires a full balance and drains it to 0) — the coupling between
// the two now runs only the other way: Sacrifice is gated on Invest's current tier already being
// claimed (see isMemoryCapacityUpgradeAvailable in engine.js), not the reverse.
test('Invest for Double Production does not trigger Sacrifice\'s own full-drain/×10-capacity effect as a side effect', async () => {
  const user = userEvent.setup()

  // Invest's own current-tier claim is deliberately left unused here — Sacrifice requires every
  // OTHER currently-possible action (including this one) to be already taken first, so with an
  // unclaimed Invest tier still affordable at this same full balance, Sacrifice starts disabled.
  seedIntroState({ bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY, byteCreated: true, productionMilestoneTierClaims: 0 })
  render(<App />)

  const sacrificeButton = screen.getByRole('button', { name: /sacrifice all bits for 10x capacity/i })
  const investButton = screen.getByRole('button', { name: /invest bits for double production/i })
  expect(sacrificeButton).toBeDisabled()
  expect(investButton).toBeEnabled()

  await user.click(investButton)

  // Capacity is untouched by Invest — the balance bar's own max stays at the starting capacity,
  // proving Sacrifice's 10x-capacity effect was never triggered as a side effect of claiming Invest.
  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuemax', String(INTRO_STARTING_CAPACITY))
  // Invest deducted its own cost (bits == capacity at this tier), so the balance is no longer full —
  // Sacrifice (which requires bits === capacity) is still disabled, now simply because the balance
  // isn't full, rather than because of the unclaimed-Invest gate above (which claiming just cleared).
  expect(balanceBar).toHaveAttribute('aria-valuenow', '0')
  expect(sacrificeButton).toBeDisabled()
  // The production rate doubled (1 × 2 = 2 bits/sec), confirming Invest's own effect landed.
  expect(screen.getByText(/\+2 bits\/sec/i)).toBeInTheDocument()
})

test('Sacrifice for 10x Capacity shows what it will drain — the current capacity — on its own line below the label', () => {
  seedIntroState({ bits: 0, capacity: INTRO_STARTING_CAPACITY * 100, byteCreated: true })
  render(<App />)

  // INTRO_STARTING_CAPACITY * 100 = 800 bits = 100 Bytes, in the nearest fitting unit.
  const sacrificeButton = screen.getByRole('button', { name: /sacrifice all bits for 10x capacity/i })
  expect(sacrificeButton).toHaveTextContent('💥 Memory ×10')
  expect(sacrificeButton).toHaveTextContent('100 B')
})

test('Sacrifice for 10x Capacity requires a full balance, drains it entirely, and leaves production untouched, once the confirm dialog is accepted', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  // Invest's current-tier claims must already be used up — tier 0 grants 2, not 1 — Sacrifice is
  // only offered once every other currently-possible action (Combine, Invest, a Storage bank
  // build) is no longer possible.
  seedIntroState({ bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY, byteCreated: true, productionMilestoneTierClaims: 2 })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /sacrifice all bits for 10x capacity/i }))

  expect(window.confirm).toHaveBeenCalled()
  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', '0')
  expect(balanceBar).toHaveAttribute('aria-valuemax', String(INTRO_STARTING_CAPACITY * 10))
  // productionMultiplier is untouched by Sacrifice — still the base 1x rate.
  expect(screen.getByText(/\+1 bit\/sec/i)).toBeInTheDocument()
})

test('cancelling the Sacrifice confirm dialog leaves Memory and capacity untouched', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(false)

  seedIntroState({ bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY, byteCreated: true, productionMilestoneTierClaims: 2 })
  render(<App />)

  await user.click(screen.getByRole('button', { name: /sacrifice all bits for 10x capacity/i }))

  expect(window.confirm).toHaveBeenCalled()
  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', String(INTRO_STARTING_CAPACITY))
  expect(balanceBar).toHaveAttribute('aria-valuemax', String(INTRO_STARTING_CAPACITY))
})

test('the manual convert button appears once capacity reaches the conversion-unlock threshold, and clicking it unlocks the main game', async () => {
  const user = userEvent.setup()

  seedIntroState({
    bits: INTRO_CONVERSION_UNLOCK_CAPACITY,
    capacity: INTRO_CONVERSION_UNLOCK_CAPACITY,
    byteCreated: true,
  })
  render(<App />)

  const convertButton = screen.getByRole('button', { name: /convert 1 KB into 1 Kilobyte/i })
  expect(convertButton).toBeEnabled()

  await user.click(convertButton)

  // Grants 1 free Kilobyte unit in the main game's save data, from the separate intro bit pool,
  // and — unlike the old design — this first conversion alone unlocks the main game, so <App />
  // navigates straight to MainPage instead of staying on the Byte Foundry.
  expect(screen.getByRole('heading', { level: 1, name: /^tens$/i })).toBeInTheDocument()
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBe(1)
  expect(saved.intro.mainGameUnlocked).toBe(true)
})

test('the convert button stays hidden below the conversion-unlock capacity', () => {
  seedIntroState({ capacity: INTRO_CONVERSION_UNLOCK_CAPACITY / 10, byteCreated: true })
  render(<App />)

  expect(screen.queryByRole('button', { name: /convert 1 KB into 1 Kilobyte/i })).not.toBeInTheDocument()
})

test('the transfer block\'s own cost scales with tier01\'s CURRENT per-unit level cost, not a flat rate', () => {
  seedMainGameState({
    intro: { mainGameUnlocked: true, bits: 0, capacity: 100000, byteCreated: true },
    purchaseLevels: { [TIER_DEFINITIONS[0].id]: 2 },
  })
  render(<App />)
  fireEvent.click(screen.getByText('⚙️ Byte Foundry'))

  // tier01 is at level 2 — its own current per-unit cost is 10,000 bits; the transfer block
  // spends BITS_PER_BYTE × that (80,000 bits, "10 KB" in Memory's own Byte-based scale), not the
  // level-1 rate (8,000 bits/"1 KB") it used to be pinned to forever.
  const activeBlock = screen.getByRole('button', { name: /convert 10 KB into 1 Kilobyte/i })
  expect(activeBlock).toBeDisabled()
  const progressbar = within(activeBlock).getByRole('progressbar', { name: /byte foundry convert progress/i })
  expect(progressbar).toHaveAttribute('aria-valuemax', '80000')
})

test('shows one transfer block per remaining unit of the Kilobyte tier\'s (default 8) current purchase block, only the leftmost clickable, and clicking it reveals the next as active', () => {
  // Fake timers (not userEvent's real ones) so the live tick loop can't fire — and, now that
  // tickIntroAutoInvest converts a unit the instant one is affordable (see docs/DESIGN_HISTORY.md),
  // silently drain the pre-seeded balance — between mount and this test's own manual clicks below.
  vi.useFakeTimers()

  // mainGameUnlocked seeded true (and reached via the voluntary nav link, like the "always-
  // interactive" tests above) so a click here doesn't also navigate away to MainPage — isolating
  // the block-sequencing behavior itself from the separate first-transfer-unlocks-the-game behavior
  // already covered by the "manual convert button... unlocks the main game" test above.
  // 2000 bits banked — exactly enough for two 1000-bit transfers — so clicking through the first
  // block leaves 1000 bits behind, revealing the next block as already-active from that carried-
  // over surplus rather than needing to wait for more production.
  seedMainGameState({
    intro: {
      mainGameUnlocked: true,
      bits: INTRO_BITS_PER_KILOBYTE_CONVERSION * 2,
      capacity: FRESH_CYCLE_BLOCK_BITS,
      byteCreated: true,
    },
  })
  const { unmount } = render(<App />)
  fireEvent.click(screen.getByText('⚙️ Byte Foundry'))

  const transferGroup = screen.getByRole('group', { name: /byte foundry kilobyte transfer blocks/i })
  const activeBlock = screen.getByRole('button', { name: /convert 1 KB into 1 Kilobyte/i })
  const lockedBlocks = screen.getAllByRole('button', { name: /^locked transfer block/i })
  expect(activeBlock).toBeEnabled()
  expect(lockedBlocks).toHaveLength(7)
  lockedBlocks.forEach(block => expect(block).toBeDisabled())
  // All 8 blocks render for the whole cycle — none consumed yet.
  expect(within(transferGroup).getAllByRole('button')).toHaveLength(8)
  expect(screen.queryAllByRole('button', { name: /^transferred block/i })).toHaveLength(0)

  fireEvent.click(activeBlock)

  // The block that was locked #2 is now the sole active block — already enabled from the 1000-bit
  // surplus left over after the first transfer — and only 6 locked blocks remain. The block just
  // spent stays on screen too, greyed out as consumed, instead of disappearing — the group still
  // holds all 8 blocks total.
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /convert 1 KB into 1 Kilobyte/i })).toBeEnabled()
  expect(screen.getAllByRole('button', { name: /^locked transfer block/i })).toHaveLength(6)
  expect(screen.getAllByRole('button', { name: /^transferred block/i })).toHaveLength(1)
  expect(within(transferGroup).getAllByRole('button')).toHaveLength(8)
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBe(1)
  expect(saved.purchaseLevelProgress.tier01).toBe(1)

  unmount()
  vi.useRealTimers()
})

test('auto-transfers a full block once the threshold is reached, then rolls the row over to a fresh block for the next tier01 level rather than staying consumed', () => {
  vi.useFakeTimers()

  // A big jump — passive production or a large offline-progress catch-up — that skips straight
  // past every individual block boundary in one go, rather than the player clicking through them.
  seedIntroState({
    bits: FRESH_CYCLE_BLOCK_BITS - 1,
    capacity: FRESH_CYCLE_BLOCK_BITS,
    byteCreated: true,
    tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS,
    productionMultiplier: 1,
  })
  const { unmount } = render(<App />)

  expect(screen.getAllByRole('button', { name: /transfer block|convert 1 KB/i }).length).toBeGreaterThan(0)

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // Transitioned to MainPage (mainGameUnlocked flips on the bulk auto-invest) with all 8 Kilobytes
  // granted at once, completing tier01's first level.
  expect(screen.getByRole('heading', { level: 1, name: /^tens$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8\b/i)

  // Navigating back to the Byte Foundry shows a fresh, empty row for the next level rather than the
  // blocks staying permanently "consumed" — there is no per-cycle transfer cap any more, so the row
  // just keeps mirroring tier01's own live purchase-block progress, which reset to 0 once the level
  // completed. tier01 is now at level 2, so each block's own cost has stepped up to 10 KB
  // (getIntroKilobyteConversionCost), not the level-1 1 KB rate.
  fireEvent.click(screen.getByText('⚙️ Byte Foundry'))
  expect(screen.queryAllByRole('button', { name: /^transferred block/i })).toHaveLength(0)
  expect(screen.getAllByRole('button', { name: /^locked transfer block/i })).toHaveLength(7)
  expect(screen.getByRole('button', { name: /convert 10 KB into 1 Kilobyte/i })).toBeDisabled()

  unmount()
  vi.useRealTimers()
})

test('tapping still increments Memory (still tappable) after the Byte generator exists', async () => {
  const user = userEvent.setup()

  seedIntroState({ bits: 0, capacity: 1000, byteCreated: true })
  render(<App />)

  const tapButton = screen.getByRole('button', { name: /tap to generate a bit/i })
  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', '0')

  await user.click(tapButton)

  expect(balanceBar).toHaveAttribute('aria-valuenow', '1')
})

test('shows the offline-progress notice on the Byte Foundry screen too, not just MainPage', () => {
  // Regression test: applyOfflineProgress already replays tickIntroProduction/tickIntroAutoInvest
  // during offline catch-up (tickGame runs them unconditionally, every tick, regardless of
  // mainGameUnlocked) — the gap was that the notice itself only ever rendered inside MainPage, so a
  // player who lands on (or is still gated to) ByteFoundryPage after being away saw no
  // acknowledgment of it. mainGameUnlocked stays false here (bits stay far below capacity), so <App
  // /> gates onto ByteFoundryPage — the notice should show there too.
  seedIntroState({ bits: 0, capacity: 10000, byteCreated: true, tickSpeedSeconds: 1, productionMultiplier: 1 })
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()
})

test('the "Memory" label is shown on the balance card', () => {
  render(<App />)
  expect(screen.getByText('Memory')).toBeInTheDocument()
})

test('the production rate shows a segmented block bar below 1 Byte/sec, and switches to a Byte/sec label at/above it', () => {
  seedIntroState({ bits: 0, capacity: 10000, byteCreated: true, tickSpeedSeconds: 0.25, productionMultiplier: 1 })
  const { unmount } = render(<App />)

  const rateBar = screen.getByRole('progressbar', { name: /byte foundry production rate/i })
  expect(rateBar).toHaveAttribute('aria-valuenow', '4')
  expect(rateBar).toHaveAttribute('aria-valuemax', '8')
  expect(screen.getByText(/\+4 bits\/sec/i)).toBeInTheDocument()
  unmount()

  seedIntroState({ bits: 0, capacity: 10000, byteCreated: true, tickSpeedSeconds: 0.125, productionMultiplier: 1 })
  render(<App />)
  expect(screen.queryByRole('progressbar', { name: /byte foundry production rate/i })).not.toBeInTheDocument()
  expect(screen.getByText(/\+1 Byte\/sec/i)).toBeInTheDocument()
})

test('Invest for Double Production shows its cost on its own line below the label, with no stray comma', () => {
  // Regression coverage for a past ButtonContent bug: mixing literal text with an embedded
  // {expression} in one children array used to render a stray comma at each JSX child boundary
  // (Array.prototype.toString()'s bare-comma join). This button no longer uses ButtonContent at
  // all (its label and cost render as two separate lines instead — see MilestoneButtonContent),
  // but the comma check stays as a general safety net.
  seedIntroState({ bits: INTRO_STARTING_CAPACITY, byteCreated: true })
  render(<App />)

  const investButton = screen.getByRole('button', { name: /invest bits for double production/i })
  expect(investButton).toHaveTextContent('⚡ Bandwidth ×2')
  expect(investButton).toHaveTextContent('1 B')
  expect(investButton.textContent).not.toContain(',')
})

test('Invest for Double Production shows its cost in the nearest fitting unit once it grows past 1000 Bytes', () => {
  // Tier 3's cost is 8000 bits = 1000 Bytes — Memory's own B/KB/MB/… scale rolls that over to
  // "1 KB" once a cost reaches the next unit boundary, rather than a fixed-unit "1,000 B".
  seedIntroState({ productionMilestoneTier: 3, bits: 0, byteCreated: true })
  render(<App />)

  const investButton = screen.getByRole('button', { name: /invest bits for double production/i })
  expect(investButton).toHaveTextContent('⚡ Bandwidth ×2')
  expect(investButton).toHaveTextContent('1 KB')
})

test('Invest for Double Production grants 2 claims at tier 0\'s cost before advancing to the 10x-higher tier-1 cost — independent of capacity', async () => {
  const user = userEvent.setup()

  // capacity is deliberately way above tier 0's cost (INTRO_STARTING_CAPACITY) — Invest's own
  // ladder is decoupled from it, so the claims below don't require the balance to be full.
  seedIntroState({ bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY * 100, byteCreated: true })
  let mounted = render(<App />)

  const investButton = screen.getByRole('button', { name: /invest bits for double production/i })
  expect(investButton).toBeEnabled()
  await user.click(investButton)

  // The first claim at tier 0's cost stays at tier 0 (tier 0 grants 2 claims, not 1) — Invest is
  // disabled again only because the balance was spent to 0, not because the tier advanced.
  let saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.intro.productionMilestoneTier).toBe(0)
  expect(saved.intro.productionMilestoneTierClaims).toBe(1)
  expect(screen.getByRole('button', { name: /invest bits for double production/i })).toBeDisabled()

  // Refilling to the SAME tier-0 cost re-enables it for the second claim.
  saved.intro.bits = INTRO_STARTING_CAPACITY
  localStorage.setItem('tens_game_state', JSON.stringify(saved))
  mounted.unmount()
  mounted = render(<App />)
  expect(screen.getByRole('button', { name: /invest bits for double production/i })).toBeEnabled()

  await user.click(screen.getByRole('button', { name: /invest bits for double production/i }))

  // The second claim at tier 0 uses up its last claim and advances to tier 1, whose cost (10x
  // higher) the current balance can't cover yet, so Invest is disabled again.
  saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.intro.productionMilestoneTier).toBe(1)
  expect(saved.intro.productionMilestoneTierClaims).toBe(0)
  expect(screen.getByRole('button', { name: /invest bits for double production/i })).toBeDisabled()

  // Seeding enough bits to cover tier 1's (10x) cost re-enables it.
  saved.intro.bits = INTRO_STARTING_CAPACITY * 10
  localStorage.setItem('tens_game_state', JSON.stringify(saved))
  mounted.unmount()
  render(<App />)
  expect(screen.getByRole('button', { name: /invest bits for double production/i })).toBeEnabled()
})

test('action buttons show fill progress toward their own threshold, matching the main game\'s button convention', () => {
  seedIntroState({ bits: 4, capacity: 8, byteCreated: true })
  render(<App />)

  const sacrificeProgress = screen.getByRole('progressbar', { name: /byte foundry sacrifice progress/i })
  expect(sacrificeProgress).toHaveAttribute('aria-valuenow', '4')
  expect(sacrificeProgress).toHaveAttribute('aria-valuemax', '8')

  const investProgress = screen.getByRole('progressbar', { name: /byte foundry invest progress/i })
  expect(investProgress).toHaveAttribute('aria-valuenow', '4')
  expect(investProgress).toHaveAttribute('aria-valuemax', '8')

  // The Tap button deliberately carries no progress fill/hidden progressbar of its own — Memory's
  // own tile already shows the same bits/capacity fill, so a second meter on the tap button itself
  // would be redundant.
  expect(screen.queryByRole('progressbar', { name: /byte foundry tap progress/i })).not.toBeInTheDocument()
})

test('the Combine button shows fill progress toward INTRO_BYTE_COMBINE_COST', () => {
  // The Combine button only ever renders once bits >= INTRO_BYTE_COMBINE_COST (its own condition
  // for appearing at all) — since capacity starts exactly equal to that cost, it's only ever
  // observable at a full 8/8, not partway; this still confirms the progressbar reports the right
  // raw values rather than e.g. a stale/mismatched max.
  seedIntroState({ bits: INTRO_BYTE_COMBINE_COST })
  render(<App />)

  const combineProgress = screen.getByRole('progressbar', { name: /byte foundry combine progress/i })
  expect(combineProgress).toHaveAttribute('aria-valuenow', String(INTRO_BYTE_COMBINE_COST))
  expect(combineProgress).toHaveAttribute('aria-valuemax', String(INTRO_BYTE_COMBINE_COST))
})

test('the Convert button shows fill progress toward INTRO_BITS_PER_KILOBYTE_CONVERSION', () => {
  // Same "only observable at 100%" constraint as the Combine button above — canConvert requires
  // bits >= INTRO_BITS_PER_KILOBYTE_CONVERSION for the button to render at all.
  seedIntroState({ bits: INTRO_CONVERSION_UNLOCK_CAPACITY, capacity: INTRO_CONVERSION_UNLOCK_CAPACITY, byteCreated: true })
  render(<App />)

  const convertProgress = screen.getByRole('progressbar', { name: /byte foundry convert progress/i })
  expect(convertProgress).toHaveAttribute('aria-valuenow', String(INTRO_CONVERSION_UNLOCK_CAPACITY))
  expect(convertProgress).toHaveAttribute('aria-valuemax', String(INTRO_CONVERSION_UNLOCK_CAPACITY))
})

test('the intro auto-transitions into the main game once the bit balance crosses the auto-invest threshold', () => {
  vi.useFakeTimers()

  // One tick (0.1s) at the tick loop's own fastest resolution (tickSpeedSeconds ==
  // INTRO_MIN_TICK_SPEED_SECONDS) delivers exactly one batch of 1 bit — enough to cross from one
  // below the threshold to the threshold itself.
  seedIntroState({
    bits: FRESH_CYCLE_BLOCK_BITS - 1,
    capacity: FRESH_CYCLE_BLOCK_BITS,
    byteCreated: true,
    tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS,
    productionMultiplier: 1,
  })
  const { unmount } = render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // Transitioned to MainPage — the Byte Foundry heading is gone, replaced by the game itself, with
  // the auto-invest-granted Kilobytes already owned.
  expect(screen.queryByRole('heading', { level: 1, name: /byte foundry/i })).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1, name: /^tens$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8\b/i)

  unmount()
  vi.useRealTimers()
})

test('Memory still renders raw bits (not a fractional Byte) before the Byte generator exists', () => {
  // Before byteCreated, capacity is always exactly INTRO_STARTING_CAPACITY (8 bits/1 Byte) — with
  // nothing yet to meaningfully denominate in, this should read "5 bits / 8 bits", not "0.625 B / 1 B".
  seedIntroState({ bits: 5, capacity: INTRO_STARTING_CAPACITY, byteCreated: false })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar.closest('section')).toHaveTextContent('5 bits / 8 bits')
  expect(balanceBar.closest('section')).not.toHaveTextContent(/\bB\b/)
})

test('Memory renders bits/capacity scaled into the same appropriate unit (KB), not raw bits, once capacity grows past the Byte range', () => {
  // capacity 8000 bits = 1000 Bytes = 1 KB; bits 4000 = 500 Bytes = 0.5 KB — both share the unit
  // picked off capacity (getMemoryUnit), never a mismatched pairing like "500 B / 1 KB".
  seedIntroState({ bits: 4000, capacity: 8000, byteCreated: true })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar.closest('section')).toHaveTextContent('0.5 KB / 1 KB')
})

test('Memory balance floors the Bytes-unit conversion instead of rounding, so it never reads complete early', () => {
  // 7999/8000 bits *rounds* to "1 KB" at formatAmount's default 3-decimal precision but should
  // *floor* to "0.999 KB" — the same never-overstate rationale as formatCurrency in engine.js,
  // applied to the Byte Foundry's own Bytes-unit display.
  seedIntroState({ bits: 7999, capacity: 8000, byteCreated: true })
  render(<App />)

  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar.closest('section')).toHaveTextContent('0.999 KB / 1 KB')
  expect(balanceBar.closest('section')).not.toHaveTextContent('1 KB / 1 KB')
})

test('Memory tile no longer shows a separate "bits this cycle" transfer-block tracker line', () => {
  seedIntroState({ bits: 4500, capacity: 8000, byteCreated: true })
  render(<App />)

  expect(screen.queryByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.queryByText(/bits this cycle/i)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/byte foundry transfer-block tracker/i)).not.toBeInTheDocument()
})


// --- Byte Foundry Storage (bank blocks) ---
// The buildable size is an independent ladder starting at 1000 bits ("1 KB") that walks tier01's
// own per-unit LEVEL COST sequence (skipping values tier01's own costs skip), advancing to the
// next level's cost once STORAGE_BANK_LADDER_CAP banks have ever been built at the current one —
// decoupled from tier01's own CURRENT level (see getStorageBankSize in engine.js). Banks are a
// storage MEDIUM, not a one-shot pre-paid item: building one only constructs an EMPTY container
// (paying STORAGE_BUILD_COST_MULTIPLIER × BITS_PER_BYTE times its size, in bytes — see
// getStorageBankCost); Memory then auto-fills any empty container on a later tick (see
// tickStorageAutoFill), smallest size first. A FULL bank's redeemability is separately gated on
// tier01's (Kilobytes') CURRENT per-unit level cost catching up to that bank's size. Every test
// here uses fake timers (never advanced, unless a test is specifically exercising a tick boundary)
// rather than real userEvent delays — with byteCreated true and Memory's own passive production
// live, a real tick landing between a click and its assertions would non-deterministically shift
// Memory's balance and could trip the Byte Foundry's own bulk transfer-budget auto-convert.
describe('Byte Foundry Storage', () => {
  const tier01 = TIER_DEFINITIONS[0]
  const currentBankSize = 1000 // the ladder's starting size
  const currentBankCost = currentBankSize * STORAGE_BUILD_COST_MULTIPLIER * BITS_PER_BYTE
  // A larger, not-yet-reached size — used to exercise the "held bank becomes redeemable once
  // tier01's level catches up to it" path independent of what the Build button currently offers.
  const futureBankSize = getTierCost(tier01, 2)

  test('the Storage section stays hidden until Memory capacity reaches 10 KB (INTRO_STORAGE_UNLOCK_CAPACITY), even with the Byte generator built', () => {
    seedIntroState({ bits: 0, capacity: INTRO_STORAGE_UNLOCK_CAPACITY - 1, byteCreated: true })
    const { unmount } = render(<App />)
    expect(screen.queryByRole('region', { name: /byte foundry storage/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /build storage bank/i })).not.toBeInTheDocument()
    unmount()

    seedIntroState({ bits: 0, capacity: INTRO_STORAGE_UNLOCK_CAPACITY, byteCreated: true })
    render(<App />)
    expect(screen.getByRole('region', { name: /byte foundry storage/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /build storage bank/i })).toBeInTheDocument()
  })

  test('Build Storage Bank is disabled below its cost and enabled once affordable, starting at 1 KB', () => {
    seedIntroState({ bits: currentBankCost - 1, capacity: currentBankCost, byteCreated: true })
    render(<App />)

    const buildButton = screen.getByRole('button', { name: /build storage bank/i })
    expect(buildButton).toHaveTextContent('1 KB')
    expect(buildButton).toBeDisabled()
  })

  test('Build Storage Bank shows its cost in the nearest fitting unit, not a raw unitless bit count', () => {
    seedIntroState({ bits: currentBankCost, capacity: currentBankCost, byteCreated: true })
    render(<App />)

    // currentBankCost is 80,000 bits = 10,000 Bytes = 10 KB in Memory's own B/KB/MB/… scale — shown
    // as "10 KB", not the raw "80,000" bit count with no unit at all.
    const buildButton = screen.getByRole('button', { name: /build storage bank/i })
    expect(buildButton).toHaveTextContent('10 KB')
    expect(buildButton).not.toHaveTextContent('80,000')
  })

  test('building a bank spends the build cost from Memory and constructs an EMPTY bank, not an already-redeemable one', () => {
    vi.useFakeTimers() // never advanced — isolates the build click itself from any auto-fill tick

    seedIntroState({ bits: currentBankCost, capacity: currentBankCost, byteCreated: true })
    const { unmount } = render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /build storage bank/i }))

    // Building spends the build cost — separate from, and not the same as, filling the bank.
    const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
    expect(balanceBar).toHaveAttribute('aria-valuenow', '0')
    // The bank exists (built) but starts empty — no "redeem" square for it yet.
    expect(screen.queryByRole('button', { name: /redeem 1 kb storage bank/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /empty 1 kb bank/i })).toBeInTheDocument()

    unmount()
    vi.useRealTimers()
  })

  test('Memory auto-fills an empty bank on a later tick — the fill and the build are separate steps', () => {
    vi.useFakeTimers()

    // A bank already built (empty) plus enough Memory to fill exactly one of it. Capacity must
    // also clear INTRO_STORAGE_UNLOCK_CAPACITY for the Storage section to even render.
    seedIntroState({
      bits: currentBankSize,
      capacity: INTRO_STORAGE_UNLOCK_CAPACITY,
      byteCreated: true,
      storageBanksBuiltTotal: { [currentBankSize]: 1 },
    })
    const { unmount } = render(<App />)
    expect(screen.getByRole('button', { name: /empty 1 kb bank/i })).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

    // Filled and immediately auto-redeemed in the same tick (1 KB is exempt from the auto-redeem
    // toggle) — the bank ends up empty again, ready to be refilled, with 1 free Kilobyte granted.
    const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
    expect(balanceBar).toHaveAttribute('aria-valuenow', '0')
    expect(screen.getByRole('button', { name: /empty 1 kb bank/i })).toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.owned.tier01).toBe(1)

    unmount()
    vi.useRealTimers()
  })

  test('a 1 KB bank auto-redeems on the very next tick even with the auto-redeem toggle off', () => {
    vi.useFakeTimers()

    seedIntroState({ bits: 0, capacity: INTRO_STORAGE_UNLOCK_CAPACITY, byteCreated: true, storageBanks: { [currentBankSize]: 1 } })
    const { unmount } = render(<App />)
    expect(screen.getByRole('button', { name: /redeem 1 kb storage bank/i })).toBeEnabled()

    act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

    expect(screen.queryByRole('button', { name: /redeem 1 kb storage bank/i })).not.toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.owned.tier01).toBe(1)
    expect(saved.intro.storageAutoRedeemedSizes['1000']).toBe(true)

    unmount()
    vi.useRealTimers()
  })

  test('a held bank becomes clickable once tier01\'s level cost reaches it, and redeeming grants a free Kilobyte', () => {
    // Bank held at a size ahead of tier01's current level (still 1) — not yet redeemable. Capacity
    // is seeded above INTRO_STORAGE_UNLOCK_CAPACITY (well above futureBankSize too) so the Storage
    // section renders at all.
    seedIntroState(
      { bits: 0, capacity: INTRO_STORAGE_UNLOCK_CAPACITY, byteCreated: true, storageBanks: { [futureBankSize]: 1 } },
    )
    const { unmount } = render(<App />)

    expect(screen.getByRole('button', { name: /redeem 10 kb storage bank/i })).toBeDisabled()
    unmount()

    // tier01 now at level 2 — its current per-unit cost (10,000) matches the held bank.
    seedIntroState(
      { bits: 0, capacity: INTRO_STORAGE_UNLOCK_CAPACITY, byteCreated: true, storageBanks: { [futureBankSize]: 1 } },
      { purchaseLevels: { [tier01.id]: 2 } }
    )
    render(<App />)

    const redeemButton = screen.getByRole('button', { name: /redeem 10 kb storage bank/i })
    expect(redeemButton).toBeEnabled()

    fireEvent.click(redeemButton)

    // Still on the mandatory Byte Foundry gate (mainGameUnlocked stays false — redeeming doesn't
    // touch it, unlike convertIntroBitsToKilobytes) — assert against saved state directly, same
    // convention as "the manual convert button appears..." above.
    expect(screen.queryByRole('button', { name: /redeem 10 kb storage bank/i })).not.toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.owned.tier01).toBe(1)
    expect(saved.intro.storageBanks[futureBankSize]).toBeUndefined()

    // Redeeming advances tier01's purchase-block progress the same way a manual Buy would —
    // visible here via the transfer-block row (a live mirror of the same progress), not just the
    // hidden MainPage one.
    expect(screen.getAllByRole('button', { name: /^transferred block/i })).toHaveLength(1)
  })

  test('a bank above 1 KB auto-redeems by default, with no manual click needed and no pause toggle currently shown', () => {
    vi.useFakeTimers()

    seedIntroState(
      { bits: 0, capacity: futureBankSize, byteCreated: true, tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS, storageBanks: { [futureBankSize]: 1 } },
      { purchaseLevels: { [tier01.id]: 2 } }
    )
    const { unmount } = render(<App />)

    // storageAutoRedeemEnabled defaults true (see createInitialGameState) — no toggle click
    // needed, and there's currently no in-UI pause toggle to click even if one wanted to (planned
    // for later — see engine.js's storageAutoRedeemEnabled comment).
    expect(screen.queryByRole('button', { name: /pause storage auto-redeem/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /resume storage auto-redeem/i })).not.toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

    // Auto-redeemed without a manual click on the bank button itself.
    expect(screen.queryByRole('button', { name: /redeem 10 kb storage bank/i })).not.toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.owned.tier01).toBe(1)

    unmount()
    vi.useRealTimers()
  })
})

describe('Byte Foundry Compute Boost', () => {
  test('the Compute Boost buttons appear once the Compute section is revealed', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 1 })
    render(<App />)

    expect(screen.getByRole('button', { name: /activate burst compute boost/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate standard compute boost/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate sustain compute boost/i })).toBeInTheDocument()
  })

  test('every activation button stays disabled below 1 Compute Core', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 0 })
    render(<App />)

    expect(screen.getByRole('button', { name: /activate burst compute boost/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /activate standard compute boost/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /activate sustain compute boost/i })).toBeDisabled()
  })

  test('activating a boost spends exactly 1 Compute Core and shows the active status line', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 3 })
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /activate burst compute boost/i }))

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeCores).toBe(2)
    expect(saved.intro.computeBoostType).toBe('burst')
    expect(screen.getByLabelText(/^active compute boost$/i)).toHaveTextContent(
      new RegExp(`burst active.*×${COMPUTE_BOOST_PRESETS.burst.multiplier}`, 'i')
    )
  })

  test('a different preset type stays disabled while another is active, but the SAME type can restack', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 3,
      computeBoostType: 'burst', computeBoostStacks: 1, computeBoostRemainingSeconds: 5,
    })
    render(<App />)

    expect(screen.getByRole('button', { name: /activate standard compute boost/i })).toBeDisabled()
    const burstButton = screen.getByRole('button', { name: /activate burst compute boost/i })
    expect(burstButton).toBeEnabled()

    fireEvent.click(burstButton)

    const saved = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(saved.intro.computeBoostStacks).toBe(2)
    expect(saved.intro.computeBoostRemainingSeconds).toBe(5 + COMPUTE_BOOST_PRESETS.burst.durationSeconds)
  })

  test('a preset already at COMPUTE_BOOST_MAX_STACKS can no longer be activated', () => {
    seedIntroState({
      bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 1,
      computeBoostType: 'burst', computeBoostStacks: COMPUTE_BOOST_MAX_STACKS, computeBoostRemainingSeconds: 5,
    })
    render(<App />)

    expect(screen.getByRole('button', { name: /activate burst compute boost/i })).toBeDisabled()
  })

  test('MainPage shows a read-only active-boost status line while one is running, and hides it once inactive', () => {
    seedMainGameState({ intro: { mainGameUnlocked: true, computeBoostType: 'standard', computeBoostStacks: 1, computeBoostRemainingSeconds: 30 } })
    const { unmount } = render(<App />)
    expect(screen.getByLabelText(/^active compute boost$/i)).toHaveTextContent(
      new RegExp(`standard.*×${COMPUTE_BOOST_PRESETS.standard.multiplier}`, 'i')
    )
    unmount()

    seedMainGameState({ intro: { mainGameUnlocked: true, computeBoostType: null } })
    render(<App />)
    expect(screen.queryByLabelText(/^active compute boost$/i)).not.toBeInTheDocument()
  })

  // Regression test: an unrecognized computeBoostType (e.g. a corrupted/hand-edited save, or a
  // future preset rename leaving stale data behind) used to crash both pages' render by indexing
  // COMPUTE_BOOST_PRESETS[type].multiplier without checking the preset actually exists first.
  test('an unrecognized computeBoostType does not crash either page — the status line just stays hidden', () => {
    seedIntroState({ bits: 0, capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, byteCreated: true, computeCores: 1, computeBoostType: 'does_not_exist', computeBoostStacks: 1 })
    const { unmount } = render(<App />)
    expect(screen.queryByLabelText(/^active compute boost$/i)).not.toBeInTheDocument()
    unmount()

    seedMainGameState({ intro: { mainGameUnlocked: true, computeBoostType: 'does_not_exist', computeBoostStacks: 1 } })
    render(<App />)
    expect(screen.queryByLabelText(/^active compute boost$/i)).not.toBeInTheDocument()
  })
})

// --- The Byte Foundry resets and reappears after every real Prestige ---
// A real Prestige now sends the player back through the intro every cycle (see engine.js's
// prestigeGame and App.jsx's bidirectional page-sync effect) — it's no longer a one-time-ever gate.
// But the Byte generator itself (capacity/byteCreated/tickSpeedSeconds/productionMultiplier) is
// PERMANENT — only Memory (bits/productionAccumulator) and the completion gate reset. Speed
// Up/Overclock remain unaffected (covered at the engine.test.js level, not here).

test('a real Prestige from MainPage navigates back to the Byte Foundry, resetting Memory but keeping the generator permanent', async () => {
  const user = userEvent.setup()

  // prestige.count: 1 skips the mandatory first-time full-screen prompt (see the test above) in
  // favor of the ordinary top banner, so MainPage's own heading is actually on-screen to assert on.
  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
    intro: { mainGameUnlocked: true, bits: 500, capacity: 8000, byteCreated: true, tickSpeedSeconds: 0.125, productionMultiplier: 4 },
  })
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /^tens$/i })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /prestige \(requires/i }))

  expect(screen.queryByRole('heading', { level: 1, name: /^tens$/i })).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  // Memory + the gate reset to fresh.
  expect(saved.intro.mainGameUnlocked).toBe(false)
  expect(saved.intro.bits).toBe(0)
  // The generator and its upgrades are permanent — carried over from before the Prestige.
  expect(saved.intro.capacity).toBe(8000)
  expect(saved.intro.byteCreated).toBe(true)
  expect(saved.intro.tickSpeedSeconds).toBe(0.125)
  expect(saved.intro.productionMultiplier).toBe(4)
})

test('completing the Byte Foundry again after a Prestige navigates forward into MainPage with newly re-granted Kilobytes', () => {
  vi.useFakeTimers()

  // Simulates "just prestiged, now replaying the intro" — prestige.count already at 1, resources/
  // owned already at their fresh post-Prestige defaults, intro reset and one tick away from its
  // own auto-invest threshold again.
  seedIntroState(
    {
      bits: FRESH_CYCLE_BLOCK_BITS - 1, capacity: FRESH_CYCLE_BLOCK_BITS, byteCreated: true,
      tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS, productionMultiplier: 1,
    },
    { prestige: { xp: 0, points: 1, count: 1, highestMilestone: 100 } }
  )
  const { unmount } = render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  expect(screen.queryByRole('heading', { level: 1, name: /byte foundry/i })).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1, name: /^tens$/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8\b/i)

  unmount()
  vi.useRealTimers()
})

test('a Prestige firing while on the Guide page defers navigation to the Byte Foundry until the player backs out', () => {
  vi.useFakeTimers()

  // autoPrestigeAttemptBudget seeded at 1 (the fire threshold) so the very next tick's elapsed
  // time pushes it over, firing Auto-Prestige immediately without needing to simulate 1000s of
  // gameplay — same "budget already at threshold" trick as the existing auto-invest test above.
  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
    autoPrestige: 1,
    autoPrestigeAttemptBudget: 1,
  })
  const { unmount } = render(<App />)

  fireEvent.click(screen.getByText('ℹ️ Guide'))
  expect(screen.getByRole('heading', { level: 1, name: /tens — guide/i })).toBeInTheDocument()

  // Auto-Prestige fires in the background and resets intro.mainGameUnlocked to false, but the
  // Guide page stays exactly where it was — App.jsx's sync effect is a no-op while page === 'info'.
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  expect(screen.getByRole('heading', { level: 1, name: /tens — guide/i })).toBeInTheDocument()

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.intro.mainGameUnlocked).toBe(false)

  // Backing out lands on the Byte Foundry, not MainPage, the instant intro.mainGameUnlocked is false.
  fireEvent.click(screen.getByRole('button', { name: /back to game/i }))
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

// --- The Byte Foundry persists as a voluntarily-revisitable, always-interactive screen ---
// Once intro.mainGameUnlocked is true, the Byte Foundry no longer disappears — MainPage's own
// "⚙️ Byte Foundry" link reopens it at any time, with its own "← Back to game" exit. Unlike the
// old completed-gated design, nothing here ever goes read-only: Tap/Sacrifice/Invest stay live
// indefinitely, and Convert stays live too as long as this cycle's shared transfer budget isn't
// exhausted. Before mainGameUnlocked, it's still the same mandatory gate as always — no Back
// button, no way to reach MainPage/InfoPage around it.

test('MainPage\'s Byte Foundry link navigates to the always-interactive screen, with a Back to game exit', async () => {
  const user = userEvent.setup()

  seedMainGameState({
    intro: {
      mainGameUnlocked: true, bits: 0, productionAccumulator: 0, capacity: 8000, byteCreated: true,
      productionMultiplier: 4,
    },
    purchaseLevelProgress: { tier01: 3 },
  })
  render(<App />)

  await user.click(screen.getByText('⚙️ Byte Foundry'))

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  const balanceBar = screen.getByRole('progressbar', { name: /byte foundry bit balance/i })
  expect(balanceBar).toHaveAttribute('aria-valuenow', '0')
  expect(balanceBar).toHaveAttribute('aria-valuemax', '8000')
  // Tap/Sacrifice/Invest all stay fully interactive — nothing here ever goes read-only.
  expect(screen.getByRole('button', { name: /tap to generate a bit/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /sacrifice all bits for 10x capacity/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /invest bits for double production/i })).toBeInTheDocument()
  // The transfer row mirrors tier01's own live purchase-block progress — no per-cycle cap, so it
  // keeps offering an active (if currently unaffordable) block rather than ever going fully consumed.
  expect(screen.getAllByRole('button', { name: /^transferred block/i })).toHaveLength(3)
  expect(screen.getByRole('button', { name: /convert 1 KB into 1 Kilobyte/i })).toBeDisabled()
  expect(screen.getAllByRole('button', { name: /^locked transfer block/i })).toHaveLength(4)

  await user.click(screen.getByRole('button', { name: /back to game/i }))
  expect(screen.getByRole('heading', { level: 1, name: /^tens$/i })).toBeInTheDocument()
})

test('the mandatory Byte Foundry gate (before mainGameUnlocked) has no Back to game exit', () => {
  render(<App />) // fresh, empty localStorage — lands on the mandatory gate, per the ByteFoundryPage tests above

  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /back to game/i })).not.toBeInTheDocument()
})

test('a Prestige firing while voluntarily viewing the Byte Foundry turns it into the mandatory gate in place, dropping the Back button', () => {
  vi.useFakeTimers()

  seedMainGameState({
    resources: { Ones: PRESTIGE_THRESHOLD },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
    autoPrestige: 1,
    autoPrestigeAttemptBudget: 1,
    intro: {
      mainGameUnlocked: true, bits: 0, productionAccumulator: 0, capacity: 8000, byteCreated: true,
      productionMultiplier: 4,
    },
  })
  const { unmount } = render(<App />)

  fireEvent.click(screen.getByText('⚙️ Byte Foundry'))
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  // Reached voluntarily — Tap was already live before the Prestige, same as after (see test above).
  expect(screen.getByRole('button', { name: /tap to generate a bit/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /back to game/i })).toBeInTheDocument()

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // Still on the same screen — no navigation jump — but now it's the mandatory gate: the Back
  // button is gone, since mainGameUnlocked just flipped false.
  expect(screen.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /tap to generate a bit/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /back to game/i })).not.toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

// --- Chapters (inside the Milestones view) ---
// Every chapter row is a plain boolean read of state.intro.mainGameUnlocked / state.prestige.count
// — see CLAUDE.md's Chapters section. "The first KiloByte" is always ✅ the instant this view is
// reachable at all (MainPage only ever renders once intro.mainGameUnlocked is true), so it isn't varied
// here — the meaningful coverage is "Go Googol" tracking prestige.count, and that Chapters itself
// is reachable before a first Prestige at all (see the "reachable both before and after" test above).
test.each([
  { prestigeCount: 0, reached: false },
  { prestigeCount: 1, reached: true },
  { prestigeCount: 5, reached: true },
])('the "Go Googol" chapter reads $reached when prestige.count is $prestigeCount', async ({ prestigeCount, reached }) => {
  const user = userEvent.setup()

  seedMainGameState({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: prestigeCount, highestMilestone: 1 },
  })
  render(<App />)
  await user.click(screen.getByRole('tab', { name: /milestones/i }))

  expect(screen.getByLabelText(/^chapters category$/i)).toBeInTheDocument()
  const firstKilobyteRow = screen.getByLabelText(/^the first kilobyte chapter$/i)
  expect(firstKilobyteRow).toHaveTextContent('✅')

  const goGoogolRow = screen.getByLabelText(/^go googol chapter$/i)
  expect(goGoogolRow).toHaveTextContent(reached ? '✅' : '🔒')

  const comingSoonRow = screen.getByLabelText(/^coming soon… chapter$/i)
  expect(comingSoonRow).toHaveTextContent('🔒')
})
