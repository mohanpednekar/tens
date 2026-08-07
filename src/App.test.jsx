import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, vi } from 'vitest'
import { version } from '../package.json'
import { AUTO_PRESTIGE_AUTOBUYER_COST, TICK_RATE_MS } from 'game/layers'
import App from './App'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('renders the game title and the Bytes tier', () => {
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /tens/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^bytes layer$/i)).toBeInTheDocument()
  // Money=1 (MONEY_STARTING_AMOUNT), per-unit cost 8/8=1 — only 1 unit is affordable.
  expect(screen.getByRole('button', { name: /buy for 1 b\b/i })).toBeEnabled()
})

test('renders the current app version beside the title', () => {
  render(<App />)

  expect(screen.getByText(`v${version}`)).toBeInTheDocument()
})

test('buying Bytes deducts cost and increases owned count', async () => {
  const user = userEvent.setup()

  render(<App />)

  // Money=1, per-unit cost 8/8=1 — manual Buy grabs as many as affordable, which is just 1 unit.
  await user.click(screen.getByRole('button', { name: /buy for 1 b\b/i }))

  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
  // Money=0 left; still at level 1 (1 of 8 purchased), unaffordable — button disabled.
  expect(screen.getByRole('button', { name: /buy for 1 b \(level 1, 1 of 8 purchased\)/i })).toBeDisabled()
})

test('the Reset button is always rendered, not gated behind a dev-only build check', () => {
  render(<App />)

  expect(screen.getByRole('button', { name: /reset game/i })).toBeInTheDocument()
})

test('reset game restores starting state once the confirm dialog is accepted', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  render(<App />)

  // Buy Bytes to dirty the state — money=1, per-unit cost 8/8=1, so a single click buys 1 unit.
  await user.click(screen.getByRole('button', { name: /buy for 1 b\b/i }))
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  // Reset
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 0\b/i)
  expect(screen.getByRole('button', { name: /buy for 1 b\b/i })).toBeEnabled()
})

test('reset clears localStorage once the confirm dialog is accepted', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for 1 b\b/i }))

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

  render(<App />)

  // Buy Bytes to dirty the state — money=1, per-unit cost 8/8=1, so a single click buys 1 unit.
  await user.click(screen.getByRole('button', { name: /buy for 1 b\b/i }))
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBe(1)
})

test('Kilobytes tier appears and is purchasable once 10 Bytes are owned', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 8000 },
    owned: { tier01: 10 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toBeInTheDocument()
  // Kilobytes (baseCost 8000) level 1, blockSize 8: per-unit cost 8000/8=1000, full block $8,000
  // (level total is unchanged from before this cost-model change — only the per-unit split is new).
  expect(screen.getByRole('button', { name: /buy ×8 for 8,000 b\b/i })).toBeEnabled()
})

test('buying a higher tier does not deduct the tier below\'s owned count', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 8000 },
    owned: { tier01: 10 },
  }))

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy ×8 for 8,000 b\b/i }))

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 8/i)
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 10/i)
})

test('money balance is shown once at the top in full currency format, centered, with no per-second yield', () => {
  render(<App />)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  expect(screen.getByLabelText(/^money display$/i)).not.toHaveTextContent('/sec')
  expect(screen.queryAllByLabelText(/^money display$/i)).toHaveLength(1)
})

test('a money-producing tier shows its per-tick production amount with the currency format, not a per-second rate', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent('+5 b')
  expect(screen.getByLabelText(/^bytes layer$/i)).not.toHaveTextContent('/sec')
})

test('a tickspeed multiplier level speeds up delivery frequency, not the amount per delivery or autobuyer purchase frequency', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 5 },
    tickspeedLevels: { tier01: 3 },
  }))

  render(<App />)

  // The displayed production figure is the raw per-delivery amount (owned) — level 3's ×1.21
  // speed bonus shortens how often a delivery lands, it no longer inflates the amount, so this
  // still reads +5 b, not +6 b.
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent('+5 b')
  // The badge shows the cumulative speed bonus as "+N%" (not the old "×N" purchase-speed
  // figure) — no "Lv." (that wording belongs to the Buy button's purchase level); the
  // tickspeed level itself lives in the title tooltip.
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent('⚙ +21%')
  expect(screen.getByTitle(/tickspeed multiplier level 3 — \+21% faster ticks/i)).toBeInTheDocument()
})

test('the tier tickspeed multiplier button is buyable even when that tier\'s autobuyer has never been unlocked', async () => {
  const user = userEvent.setup()

  // The last tier (Ronnabytes) has the cheapest tickspeed base cost (10^1), so level 1 → 2 costs
  // a testable 10 of its own resource — matching engine.test.js's convention for this ladder.
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10, tier10: 11 },
    owned: { tier09: 10, tier10: 1 },
    // autobuyers.tier10 is left at its default (null, locked) — the tickspeed multiplier is
    // enabled by default regardless.
  }))

  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /tickspeed multiplier \(\+10% faster ticks\) for 10 RB/i })
  expect(upgradeButton).toBeEnabled()

  await user.click(upgradeButton)

  expect(screen.getByTitle(/tickspeed multiplier level 2 — \+10% faster ticks/i)).toBeInTheDocument()
})

test('reaching 8 lifetime purchases of a tier doubles its displayed production amount', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 8 },
  }))

  render(<App />)

  // Crossing the 8-purchase milestone doubles production: owned(5) × 1 b/tick × 2 = 10 b per tick.
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent('+10 b')
})

test('a tier shows its full per-tick production amount, not a reduced rate', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 10, tier02: 4 },
  }))

  render(<App />)

  // The displayed amount is the raw per-tick credit (owned(4) × 1, no bonus/milestone) delivered
  // each time the tier's own tickspeed period completes — not divided by tickspeed, since it's
  // not shown as an averaged "/sec" rate.
  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent('+4 B')
})

test('a tier row has no separate "Details" label — clicking its name reveals base/effective tickspeed', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 10, tier02: 4 }, // unlocks Kilobytes (base tickspeed 2s)
  }))

  render(<App />)

  const kilobytesLayer = screen.getByLabelText(/^kilobytes layer$/i)
  expect(within(kilobytesLayer).queryByText(/^details$/i)).not.toBeInTheDocument()

  // The tier's own name (wrapping TierNameTrigger, exposed as a named button) is the
  // disclosure's trigger now, not a separate label — its content isn't in the DOM at all until
  // expanded.
  const trigger = within(kilobytesLayer).getByRole('button', { name: /kilobytes/i })
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(within(kilobytesLayer).queryByText(/base tickspeed/i)).not.toBeInTheDocument()

  await user.click(trigger)

  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(kilobytesLayer).toHaveTextContent(/base tickspeed: delivers every 2s/i)
  expect(kilobytesLayer).toHaveTextContent(/effective tickspeed: every 2s/i)
})

test('clicking anywhere else on a tier row\'s tile (not a button) also expands its details', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 10, tier02: 4 },
  }))

  render(<App />)

  const kilobytesLayer = screen.getByLabelText(/^kilobytes layer$/i)
  const trigger = within(kilobytesLayer).getByRole('button', { name: /kilobytes/i })
  expect(trigger).toHaveAttribute('aria-expanded', 'false')

  // Click the row's own container, not the name trigger and not a button.
  await user.click(kilobytesLayer)

  expect(trigger).toHaveAttribute('aria-expanded', 'true')

  // Clicking the tile again collapses it back.
  await user.click(kilobytesLayer)
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
})

test('clicking a tier row\'s Buy/tickspeed buttons does not also toggle its details disclosure', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1000 },
    owned: { tier01: 10, tier02: 4 },
  }))

  render(<App />)

  const kilobytesLayer = screen.getByLabelText(/^kilobytes layer$/i)
  const trigger = within(kilobytesLayer).getByRole('button', { name: /kilobytes/i })
  const buyButton = within(kilobytesLayer).getByRole('button', { name: /^buy/i })

  await user.click(buyButton)

  expect(trigger).toHaveAttribute('aria-expanded', 'false')
})

test('the Buy button shows a cost-block progress bar reflecting purchases so far', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    purchased: { tier01: 4 },
  }))

  render(<App />)

  const progressBar = screen.getByRole('progressbar', { name: /bytes cost-block progress/i })
  expect(progressBar).toHaveAttribute('aria-valuenow', '4')
  expect(progressBar).toHaveAttribute('aria-valuemax', '8')
  // The tier's level (lifetime purchase count) lives on the Buy button itself, not a separate cell.
  // 4 of 8 already done — 4 remain in the block; per-unit cost 8/8=1, so 4 units cost $4 total.
  const buyButton = screen.getByRole('button', { name: /buy ×4 for 4 b \(level 1, 4 of 8 purchased\)/i })
  expect(buyButton).toBeInTheDocument()
  expect(screen.queryByText(/^level: /i)).not.toBeInTheDocument()
  // Regression check for the Button component's `variant` prop: it's consumed internally to
  // resolve a theme color and must never leak onto the rendered DOM node as a raw attribute.
  expect(buyButton).not.toHaveAttribute('variant')
})

test('manual Buy clicks buy as many units as are currently affordable, not just 1', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 100 },
  }))

  render(<App />)

  // Per-unit cost 8/8=1: $100 affords far more than the 8-unit block, so the full block (capped
  // there, not by funds) is what's bought — $8 total.
  const buyButton = screen.getByRole('button', { name: /buy ×8 for 8 b\b/i })
  expect(buyButton).toBeEnabled()

  await user.click(buyButton)

  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 8\b/i)
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('92 b')
})

test('manual Buy partially fills when funds only cover part of the cost block', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 3 }, // affords 3 at $1/unit (8/8), not the full block of 8
  }))

  render(<App />)

  const buyButton = screen.getByRole('button', { name: /buy ×3 for 3 b\b/i })
  expect(buyButton).toBeEnabled()

  await user.click(buyButton)

  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 3\b/i)
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('0 b')
})

test('each tier name is rendered as a heading for screen-reader navigation', () => {
  render(<App />)

  expect(screen.getByRole('heading', { level: 3, name: /^bytes$/i })).toBeInTheDocument()
})

test('applies offline progress at 10% speed based on elapsed time since the last save', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  }))
  // 100 real seconds ago → 10 simulated seconds at 10% speed → 5 Bytes × 10s = +50 money
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  render(<App />)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('50 b')
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()
})

test('dismissing the offline progress notice hides it', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  }))
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  render(<App />)
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /dismiss offline progress notice/i }))

  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()
})

test('the offline progress notice shows a countdown on its Dismiss button and fades/auto-dismisses after 10 seconds', () => {
  vi.useFakeTimers()
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  }))
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
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  }))
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  const { unmount } = render(<App />)

  act(() => { vi.advanceTimersByTime(2_000) })
  fireEvent.click(screen.getByRole('button', { name: /dismiss offline progress notice/i }))

  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()

  unmount()
  vi.useRealTimers()
})

test('shows no offline progress notice when there is no recorded last-save timestamp', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^offline progress notice$/i)).not.toBeInTheDocument()
})

test('the first time money reaches a googol, a mandatory full-screen prompt offers Prestige', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e100 },
  }))

  render(<App />)

  expect(screen.getByRole('dialog', { name: /prestige required/i })).toBeInTheDocument()
  const prestigeButton = screen.getByRole('button', { name: /prestige now/i })
  expect(prestigeButton).toBeEnabled()

  await user.click(prestigeButton)

  expect(screen.queryByRole('dialog', { name: /prestige required/i })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for 1 b\b/i })).toBeEnabled()
})

test('from the 2nd prestige onward, reaching a googol shows a top banner instead of the full-screen prompt', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e100 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  }))

  render(<App />)

  expect(screen.queryByRole('dialog', { name: /prestige required/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige available banner$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /prestige \(requires/i })).toBeEnabled()
})

test('the sticky PP display doubles as a Prestige button once Prestige is available', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e100 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  }))

  render(<App />)

  await user.click(screen.getByRole('button', { name: /^prestige points display$/i }))

  expect(screen.queryByLabelText(/^prestige available banner$/i)).not.toBeInTheDocument()
})

test('the sticky PP display is not a clickable button before Prestige is available', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 5, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige points display$/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /^prestige points display$/i })).not.toBeInTheDocument()
})

test('production and every other control freeze once money reaches a googol', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e100 },
    owned: { tier01: 5 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /^buy/i })).toBeDisabled()
  expect(screen.getByRole('button', { name: /reset game/i })).toBeDisabled()
})

test('the Speed Up panel stays hidden before the last tier unlocks', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^speed up panel$/i)).not.toBeInTheDocument()
})

test('the Speed Up panel appears once the last tier unlocks, with the button disabled below the required level', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^speed up panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /speed up \(requires ronnabytes level 1/i })).toBeDisabled()
})

test('the Speed Up button is enabled once the last tier reaches the required level', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 2 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /speed up \(requires ronnabytes level 1/i })).toBeEnabled()
})

test('the second Speed Up requires one more level than the first, not the same level 1', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 2 },
    speedUpCount: 1,
  }))

  render(<App />)

  const button = screen.getByRole('button', { name: /speed up \(requires ronnabytes level 2/i })
  expect(button).toBeDisabled()
  expect(screen.queryByRole('button', { name: /speed up \(requires ronnabytes level 1\b/i })).not.toBeInTheDocument()
})

test('the Speed Up button shows the next multiplier and requirement progress on itself', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 2 },
    speedUpCount: 2,
  }))

  render(<App />)

  // Third activation requires the last tier to reach level 3 (Lv.1/3) and would raise the
  // permanent multiplier to ×8 — both shown on the button itself, with no separate status text line.
  expect(screen.getByRole('button', {
    name: /speed up \(requires ronnabytes level 3\) — doubles production speed to ×8/i,
  })).toBeInTheDocument()
  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent('⏩ ×8 · Lv.1/3')
})

test('the speed up panel renders above the tier list, not below it', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
  }))

  render(<App />)

  const regions = screen.getAllByRole('region').map(region => region.getAttribute('aria-label'))
  expect(regions.indexOf('speed up panel')).toBeLessThan(regions.indexOf('Bytes layer'))
})

test('once the last tier is full, its row shows the XP-consume tickspeed button, distinct from the top Speed Up panel button', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purchaseLevels: { tier10: 2 },
    prestige: { xp: 37, points: 0, count: 0, highestMilestone: 0 },
  }))

  render(<App />)

  const ronnabytesLayer = screen.getByLabelText(/^ronnabytes layer$/i)
  const rowXpButton = within(ronnabytesLayer).getByRole('button', {
    name: /consume 37 xp for .* ronnabytes tickspeed/i,
  })
  expect(rowXpButton).toHaveTextContent('🧬')

  // The top panel's own Speed Up button is a separate element doing something else entirely
  // (resets the run) from the row's XP-consume button (boosts this tier's own tickspeed).
  const panelSpeedUpButton = screen.getByRole('button', { name: /^speed up \(requires ronnabytes level 1/i })
  expect(panelSpeedUpButton).not.toBe(rowXpButton)
})

test('clicking Speed Up once eligible resets resources but keeps the panel visible (disabled) rather than hiding it again', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purchaseLevels: { tier10: 2 },
  }))

  render(<App />)

  const speedUpButton = screen.getByRole('button', { name: /speed up \(requires ronnabytes level 1/i })
  expect(speedUpButton).toBeEnabled()

  await user.click(speedUpButton)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  // Speed Up resets owned counts too, so the last tier is no longer unlocked — but since the
  // panel was already revealed once, it stays visible (in a disabled state) rather than
  // disappearing again until the player climbs back up to it. The next cycle now requires level 2
  // (speedUpCount incremented to 1 — see getSpeedUpRequirement).
  expect(screen.getByLabelText(/^speed up panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /speed up \(requires ronnabytes level 2/i })).toBeDisabled()
})

test('Speed Up resets the global tickspeed multiplier level back to not-yet-bought', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 12345 },
    owned: { tier02: 1, tier09: 10, tier10: 25 },
    purchaseLevels: { tier10: 2 },
    globalTickspeedMultiplier: 2,
  }))

  render(<App />)

  // The cumulative level/bonus only shows in the expanded description, not the button itself —
  // the description stays in the DOM (and toHaveTextContent-visible) even while collapsed.
  expect(screen.getByLabelText(/^global tickspeed panel$/i)).toHaveTextContent(/lv\.2/i)

  await user.click(screen.getByRole('button', { name: /speed up \(requires ronnabytes level 1/i }))

  // Speed Up also resets tier02's owned count to 0, so the card's initial-unlock condition
  // (owning tier02) is no longer met either — with the level reset too, the card reverts all the
  // way back to its pre-activation "Enable" state rather than staying at Lv.2.
  expect(screen.getByRole('button', { name: /enable global tickspeed multiplier for 10 b/i })).toBeInTheDocument()
})

test('the Speed Up button is disabled once production freezes at a googol', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e100 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 2 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /speed up \(requires ronnabytes level 1/i })).toBeDisabled()
})

test('no Auto Speed Up control appears during the first run, even with the last tier unlocked', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
  }))

  render(<App />)

  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
  expect(screen.queryByText(/auto speed up active/i)).not.toBeInTheDocument()
})

test('the Overclock panel stays hidden before the last tier unlocks', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^overclock panel$/i)).not.toBeInTheDocument()
})

test('the Overclock panel appears once the last tier unlocks, with the button disabled below the required level', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 9 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^overclock panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /overclock \(requires ronnabytes level 10/i })).toBeDisabled()
})

test('the Overclock button is enabled once the last tier reaches the required level', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 10 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /overclock \(requires ronnabytes level 10/i })).toBeEnabled()
})

test('the second Overclock requires 10 more levels than the first, not the same level 10', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 15 },
    overclockCount: 1,
  }))

  render(<App />)

  const button = screen.getByRole('button', { name: /overclock \(requires ronnabytes level 20/i })
  expect(button).toBeDisabled()
  expect(screen.queryByRole('button', { name: /overclock \(requires ronnabytes level 10\b/i })).not.toBeInTheDocument()
})

test('the Overclock button shows the next tickspeed bonus and requirement progress on itself, using the raw (non-offset) tier level', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 12 },
    overclockCount: 1,
  }))

  render(<App />)

  // Second activation requires the last tier to reach raw level 20 (Lv.12/20, not Lv.11/19 —
  // Overclock's requirement is deliberately not given Speed Up's -1 "completed blocks" display
  // offset, see getOverclockRequirement in engine.js) and would raise the permanent tickspeed
  // bonus to +0.2% — both shown on the button itself, no separate status text line.
  expect(screen.getByRole('button', {
    name: /overclock \(requires ronnabytes level 20\) — resets speed up's bonus and speeds up every tier's ticks to \+0\.2%/i,
  })).toBeInTheDocument()
  expect(screen.getByLabelText(/^overclock panel$/i)).toHaveTextContent('⚡ +0.2% · Lv.12/20')
})

test('clicking Overclock once eligible resets resources, wipes the Speed Up bonus, and keeps the panel visible (disabled) rather than hiding it again', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purchaseLevels: { tier10: 10 },
    speedUpCount: 5,
  }))

  render(<App />)

  // speedUpCount 5 → next activation would raise the multiplier to ×64 (getSpeedUpMultiplier(6)).
  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent('⏩ ×64')

  const overclockButton = screen.getByRole('button', { name: /overclock \(requires ronnabytes level 10/i })
  expect(overclockButton).toBeEnabled()

  await user.click(overclockButton)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  // Overclock resets owned counts too, so the last tier is no longer unlocked — but since both
  // panels were already revealed once, they stay visible (in a disabled state) rather than
  // disappearing again. Overclock's own next cycle now requires level 20 (overclockCount
  // incremented to 1 — see getOverclockRequirement), and Speed Up's own stacking bonus is wiped
  // back to ×2 (speedUpCount reset to 0, so the *next* activation would only reach ×2 again).
  expect(screen.getByLabelText(/^overclock panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /overclock \(requires ronnabytes level 20/i })).toBeDisabled()
  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent('⏩ ×2')
})

test('the Overclock button is disabled once production freezes at a googol', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e100 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /overclock \(requires ronnabytes level 10/i })).toBeDisabled()
})

test('the PP Upgrades page groups purchases into labeled categories', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

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
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestigeSpeedBonusUnlocked: true,
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^production bonuses category$/i)).not.toBeInTheDocument()
})

test('an Enable Auto Speed Up button appears on the PP Upgrades page after the first prestige, and spends 100 PP to enable it', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    prestige: { xp: 0, points: 100, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const autoSpeedUpButton = screen.getByRole('button', { name: /enable auto speed up for 100 prestige points/i })
  expect(autoSpeedUpButton).toBeEnabled()

  await user.click(autoSpeedUpButton)

  expect(screen.getByLabelText('Auto Speed Up active')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the global tickspeed panel renders above the tier list, not below it', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier02: 1 },
  }))

  render(<App />)

  const regions = screen.getAllByRole('region').map(region => region.getAttribute('aria-label'))
  expect(regions.indexOf('global tickspeed panel')).toBeLessThan(regions.indexOf('Bytes layer'))
})

test('an Enable Tickspeed Autobuyer button appears on the PP Upgrades page after the first prestige, and spends 20 PP to enable it', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    prestige: { xp: 0, points: 20, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const tickspeedAutobuyerButton = screen.getByRole('button', { name: /enable tickspeed autobuyer for 20 prestige points/i })
  expect(tickspeedAutobuyerButton).toBeEnabled()

  await user.click(tickspeedAutobuyerButton)

  expect(screen.getByLabelText('Tickspeed Autobuyer active')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable tickspeed autobuyer/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('a static "Active" badge shows on the PP Upgrades page once Auto Speed Up has been bought', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    autoSpeedUp: true,
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText('Auto Speed Up active')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
})

test('pausing Auto Speed Up via its toggle stops it from firing automatically, even once eligible; resuming fires it again', () => {
  vi.useFakeTimers()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 12345 },
    owned: { tier09: 10 },
    purchaseLevels: { tier10: 2 },
    autoSpeedUp: true,
    autoSpeedUpEnabled: false,
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  const { unmount } = render(<App />)

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  // Still eligible (purchaseLevels.tier10 untouched) since Auto Speed Up starts paused.
  expect(screen.getByRole('button', { name: /speed up \(requires ronnabytes level 1/i })).toBeEnabled()

  // The pause toggle lives on the PP Upgrades page; the tick timer itself keeps running
  // regardless of which view is currently rendered.
  fireEvent.click(screen.getByRole('tab', { name: /upgrades/i }))
  fireEvent.click(screen.getByRole('button', { name: /resume auto speed up automation/i }))
  fireEvent.click(screen.getByRole('tab', { name: /game/i }))
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  // Speed Up fired automatically once resumed — resources reset and the next cycle requires level 2.
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('1 b')
  expect(screen.getByRole('button', { name: /speed up \(requires ronnabytes level 2/i })).toBeDisabled()

  unmount()
  vi.useRealTimers()
})

test('no Global Tickspeed Multiplier panel appears before the second tier has ever been owned', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^global tickspeed panel$/i)).not.toBeInTheDocument()
})

test('an Enable Global Tickspeed Multiplier button appears once the second tier is owned (even during the first run), and spends 10 Money to activate level 1', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier02: 1 },
  }))

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

test('the Enable Global Tickspeed Multiplier button stays disabled without enough Money', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 9 },
    owned: { tier02: 1 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /enable global tickspeed multiplier for 10 b/i })).toBeDisabled()
})

test('the Global Tickspeed Multiplier Upgrade button costs another power of ten each level, and shows the compounding bonus with decimal precision below 100%', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 999 },
    globalTickspeedMultiplier: 2,
  }))

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
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e15 },
    globalTickspeedMultiplier: 10,
  }))

  render(<App />)

  // 9 regular 1% levels compounded, then the level-10 milestone at 10% instead of 1%:
  // 1.01^9 * 1.10 ≈ ×1.2031.
  expect(screen.getByLabelText(/^global tickspeed panel$/i)).toHaveTextContent(/\+20\.31%/i)
})

test('the global tickspeed bonus still shows fractional percent precision one level before a milestone pushes it past 100%', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e15 },
    globalTickspeedMultiplier: 39,
  }))

  render(<App />)

  // Level 39 (no milestone yet — next one is at 40) is still under 100%, so it shows 2 decimals.
  expect(screen.getByLabelText(/^global tickspeed panel$/i)).toHaveTextContent(/\+90\.44%/i)
})

test('the global tickspeed bonus switches to an "Nx" multiplier once it crosses +100% at a milestone', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e15 },
    globalTickspeedMultiplier: 40,
  }))

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
    seed: { owned: { tier09: 10 }, prestige: { xp: 0, points: 19, count: 1, highestMilestone: 1 } },
    buttonName: /enable tickspeed autobuyer for 20 prestige points/i,
  },
  {
    name: 'Enable Auto Speed Up',
    seed: { owned: { tier09: 10 }, prestige: { xp: 0, points: 99, count: 1, highestMilestone: 1 } },
    buttonName: /enable auto speed up for 100 prestige points/i,
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
    name: "Bytes's Smart",
    seed: { autobuyers: { tier01: 1 }, prestige: { xp: 0, points: 9, count: 1, highestMilestone: 1 } },
    buttonName: /make bytes's autobuyer smart .* for 10 prestige points/i,
  },
])('the $name button stays disabled without enough Prestige Points', async ({ seed, buttonName }) => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...seed,
  }))

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
    name: "Bytes's tickspeed autobuyer",
    seed: { autobuyers: { tier01: 1 }, tierTickspeedAutobuyer: { tier01: true } },
    pauseName: /pause bytes's tickspeed autobuyer/i,
    resumeName: /resume bytes's tickspeed autobuyer/i,
  },
])('a pause toggle appears beside the $name badge once bought, and pausing/resuming updates it', async ({ seed, pauseName, resumeName, name }) => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
    ...seed,
  }))

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

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByRole('button', { name: /auto-prestige/i })).not.toBeInTheDocument()
  expect(screen.queryByText(/auto-prestige/i)).not.toBeInTheDocument()
})

test('an Auto-Prestige button appears on the PP Upgrades page once every tier is Smart, and spends 1000 PP to activate level 1', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  }))

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

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByRole('button', { name: /pause auto-prestige automation/i })).not.toBeInTheDocument()
})

test('the Auto-Prestige Upgrade button costs double the previous level, and stays disabled without enough points', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    autoPrestige: 1,
    prestige: { xp: 0, points: 1999, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^auto-prestige upgrade$/i)).toHaveTextContent(/lv\.1/i)
  expect(screen.getByRole('button', { name: /upgrade auto-prestige for 2000 prestige points/i })).toBeDisabled()
})

test('the Auto-Prestige Autobuyer row stays hidden until Auto-Prestige has been activated', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByText(/auto-prestige autobuyer/i)).not.toBeInTheDocument()
})

test(`an Auto-Prestige Autobuyer button appears once Auto-Prestige is active, and spends ${AUTO_PRESTIGE_AUTOBUYER_COST} PP to unlock it`, async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    autoPrestige: 1,
    prestige: { xp: 0, points: AUTO_PRESTIGE_AUTOBUYER_COST, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const unlockButton = screen.getByRole('button', { name: new RegExp(`enable auto-prestige autobuyer for ${AUTO_PRESTIGE_AUTOBUYER_COST} prestige points`, 'i') })
  expect(unlockButton).toBeEnabled()

  await user.click(unlockButton)

  expect(screen.getByLabelText('Auto-Prestige Autobuyer active')).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('prestige points and the production speed bonus are shown once the bonus is unlocked', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestigeSpeedBonusUnlocked: true,
    prestige: { xp: 0, points: 50, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('50 PP')
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('+50% production speed')
})

test('the production speed bonus reads as locked, and an unlock button is offered on the PP Upgrades page, before it has been bought', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 10500, count: 1, highestMilestone: 1 },
  }))

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

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 50, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  // tier01's autobuyer unlocked automatically at Prestige 1 (count 1 here) — Smart costs 10 PP,
  // and 50 PP fully covers it (valuenow caps at the cost).
  const smartProgress = screen.getByRole('progressbar', { name: /bytes smart autobuyer prestige point progress/i })
  expect(smartProgress).toHaveAttribute('aria-valuenow', '10')
  expect(smartProgress).toHaveAttribute('aria-valuemax', '10')

  // Auto Speed Up costs 100 PP — 50 PP covers half.
  const autoSpeedUpProgress = screen.getByRole('progressbar', { name: /auto speed up prestige point progress/i })
  expect(autoSpeedUpProgress).toHaveAttribute('aria-valuenow', '50')
  expect(autoSpeedUpProgress).toHaveAttribute('aria-valuemax', '100')
})

test('a locked badge appears on the PP Upgrades page for a tier whose autobuyer milestone has not been reached yet', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    // tier01's autobuyer unlocks automatically at Prestige 1, so it's already unlocked the moment
    // the PP Upgrades page itself is reachable (!isFirstRun) — there's no PP cost, no button, and
    // no locked state to observe for it. tier02's own milestone (Prestige 2) isn't met yet at
    // count 1, so it's the one that stays locked here.
    owned: { tier01: 10 }, // unlocks Kilobytes
    prestige: { xp: 0, points: 100, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^kilobytes's autobuyer unlocks at prestige 2$/i)).toBeInTheDocument()
  // Smart isn't purchasable yet — it requires the autobuyer already be unlocked, regardless of PP held.
  expect(screen.queryByRole('button', { name: /make kilobytes's autobuyer smart/i })).not.toBeInTheDocument()
})

test('a tier\'s autobuyer auto-unlocks (no PP spent) once its prestige milestone is reached, revealing Smart in its place', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 10 },
    prestige: { xp: 0, points: 20, count: 2, highestMilestone: 1 }, // meets kilobytes' milestone (2)
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^kilobytes's autobuyer unlocks at prestige/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText("Kilobytes's autobuyer active")).toBeInTheDocument()
  // Kilobytes' Smart cost is 20 PP (SMART_AUTOBUYER_COST_MULTIPLIER × its 2 PP-equivalent benchmark).
  expect(screen.getByRole('button', { name: /make kilobytes's autobuyer smart/i })).toBeEnabled()
  // Confirms no PP was spent to reach this state — the milestone unlock is free.
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('20 PP')
})

test('no PP Upgrades tab or PP-based controls appear before the player has ever prestiged, even with an active autobuyer and unspent PP', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 5, count: 0, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^prestige points display$/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('tab', { name: /upgrades/i })).not.toBeInTheDocument()
})

test('a Smart button appears on the PP Upgrades page once a tier\'s autobuyer is unlocked (not before), and spends 10x the unlock cost', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  const smartButton = screen.getByRole('button', { name: /make bytes's autobuyer smart .* for 10 prestige points/i })
  expect(smartButton).toBeEnabled()
  // The Unlock control is already gone — the autobuyer is unlocked, Smart has taken its place.
  expect(screen.queryByRole('button', { name: /unlock bytes's autobuyer/i })).not.toBeInTheDocument()

  await user.click(smartButton)

  // Smart is bought, but the row stays — the tier tickspeed autobuyer purchase is independent
  // and still pending, so there's still something left to buy for this tier.
  expect(screen.queryByRole('button', { name: /make bytes's autobuyer smart/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^bytes pp upgrades$/i)).toHaveTextContent(/smart/i)
  expect(screen.queryByLabelText(/^full smart autobuyer notice$/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('a tier\'s tickspeed autobuyer shows a locked badge until its own (later) prestige milestone is reached, independent of the unit-buying autobuyer', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 }, // the unit-buying autobuyer is already unlocked
    prestige: { xp: 0, points: 10, count: 11, highestMilestone: 1 }, // one short of Bytes's tickspeed milestone (12)
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^bytes's tickspeed autobuyer unlocks at prestige 12$/i)).toBeInTheDocument()
  // Smart is independent of the tickspeed autobuyer and already purchasable (autobuyer unlocked, 10 PP held).
  expect(screen.getByRole('button', { name: /make bytes's autobuyer smart/i })).toBeEnabled()
})

test('a tier\'s tickspeed autobuyer auto-unlocks (no PP spent) once its own prestige milestone is reached', async () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 10, count: 12, highestMilestone: 1 }, // meets Bytes's tickspeed milestone (12)
  }))

  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^bytes's tickspeed autobuyer unlocks at prestige/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText("Bytes's tickspeed autobuyer active")).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('10 PP')
})

test('a tier\'s row disappears only once both Smart and its tier tickspeed autobuyer are bought', async () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    smartAutobuyer: { tier01: true },
    tierTickspeedAutobuyer: { tier01: true },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^bytes pp upgrades$/i)).not.toBeInTheDocument()
})

test('a tier\'s row on the PP Upgrades page does not appear before that tier itself is reachable, regardless of prestige count', async () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    // tier02 isn't unlocked yet: tier01 is owned below the 8-unit unlock threshold.
    owned: { tier01: 3 },
    // A high enough prestige count to have already met every milestone up through tier02 — still
    // shouldn't matter, since the row itself is gated on the tier being reachable this run, not on
    // milestones already met.
    prestige: { xp: 0, points: 100, count: 30, highestMilestone: 1 },
  }))

  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^kilobytes pp upgrades$/i)).not.toBeInTheDocument()
})

test('the PP Upgrades tab NavDot lights up when a tier\'s Smart purchase is affordable, even though autobuyer unlock/tier tickspeed autobuyer no longer cost PP at all', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^pp upgrade available$/i)).toBeInTheDocument()
})

test('the PP Upgrades tab NavDot stays dark when only a locked (milestone-gated) tier autobuyer/tier tickspeed autobuyer is pending, since neither costs PP', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    // tier01's autobuyer is already unlocked (milestone 1, met by count 1) but there's no PP to
    // spend on anything — not Smart, not any of the global automations — so nothing here is
    // "affordable" despite later tiers' autobuyer/tickspeed-autobuyer rows still showing locked.
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^pp upgrade available$/i)).not.toBeInTheDocument()
})

test('the PP Upgrades tab NavDot goes dark once a tier is fully done and nothing else is affordable', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    smartAutobuyer: { tier01: true },
    tierTickspeedAutobuyer: { tier01: true },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^pp upgrade available$/i)).not.toBeInTheDocument()
})

test('the Milestones tab is hidden before the first prestige, and shown after', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
  }))

  render(<App />)

  expect(screen.queryByRole('tab', { name: /milestones/i })).not.toBeInTheDocument()
})

test('the Milestones page lists every tier\'s autobuyer/tier-tickspeed-autobuyer unlock milestone, reflecting what\'s already unlocked', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 3, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /milestones/i }))

  expect(screen.getByLabelText(/^milestones page$/i)).toBeInTheDocument()

  // Prestige count 3 meets Bytes/Kilobytes/Megabytes' autobuyer-unlock milestones (1/2/3) but not
  // Gigabytes' (4) — each already-met tier shows as unlocked, the next one as still locked.
  expect(screen.getByLabelText(/^bytes's autobuyer unlocked at prestige 1$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^kilobytes's autobuyer unlocked at prestige 2$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^megabytes's autobuyer unlocked at prestige 3$/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^gigabytes's autobuyer unlocks at prestige 4, currently at prestige 3$/i)).toBeInTheDocument()

  // None of the tier tickspeed autobuyer milestones (12+) are anywhere close yet.
  expect(screen.getByLabelText(/^bytes's tickspeed autobuyer unlocks at prestige 12, currently at prestige 3$/i)).toBeInTheDocument()
  const tickspeedProgress = screen.getByRole('progressbar', { name: /^bytes tickspeed autobuyer milestone progress$/i })
  expect(tickspeedProgress).toHaveAttribute('aria-valuenow', '3')
  expect(tickspeedProgress).toHaveAttribute('aria-valuemax', '12')
})

test('an autobuyer on/paused indicator appears on the tier row once its autobuyer is unlocked, toggled from the PP Upgrades page', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText("Bytes's autobuyer active")).toBeInTheDocument()

  await user.click(screen.getByRole('tab', { name: /upgrades/i }))
  const pauseButton = screen.getByRole('button', { name: /pause bytes's autobuyer/i })
  expect(pauseButton).toHaveAttribute('aria-pressed', 'true')

  await user.click(pauseButton)
  const resumeButton = screen.getByRole('button', { name: /resume bytes's autobuyer/i })
  expect(resumeButton).toHaveAttribute('aria-pressed', 'false')

  await user.click(screen.getByRole('tab', { name: /game/i }))
  expect(screen.getByLabelText("Bytes's autobuyer paused")).toBeInTheDocument()

  await user.click(screen.getByRole('tab', { name: /upgrades/i }))
  await user.click(screen.getByRole('button', { name: /resume bytes's autobuyer/i }))
  await user.click(screen.getByRole('tab', { name: /game/i }))
  expect(screen.getByLabelText("Bytes's autobuyer active")).toBeInTheDocument()
})

test('no autobuyer on/paused indicator appears on a tier row before its autobuyer is unlocked', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
  }))

  render(<App />)

  expect(screen.queryByRole('button', { name: /pause bytes's autobuyer/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^bytes layer$/i)).not.toHaveTextContent(/paused/i)
})

test('pausing a tier\'s autobuyer via its PP Upgrades toggle stops it from buying automatically; resuming resumes it', () => {
  vi.useFakeTimers()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10000 },
    autobuyers: { tier01: 1 },
    autobuyersEnabled: { tier01: false },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('tab', { name: /upgrades/i }))

  // The autobuyer attempt budget accumulates at a flat rate of 1 per real second, so a single
  // 100ms tick isn't enough to trigger a purchase attempt either way — advance a full second
  // (10 ticks) so a paused autobuyer's lack of purchases is a meaningful assertion, not just "not
  // enough time has passed yet".
  act(() => { vi.advanceTimersByTime(1000) })
  fireEvent.click(screen.getByRole('tab', { name: /game/i }))
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 0\b/i)

  fireEvent.click(screen.getByRole('tab', { name: /upgrades/i }))
  fireEvent.click(screen.getByRole('button', { name: /resume bytes's autobuyer/i }))
  act(() => { vi.advanceTimersByTime(1000) })

  fireEvent.click(screen.getByRole('tab', { name: /game/i }))
  expect(screen.getByLabelText(/^bytes layer$/i)).not.toHaveTextContent(/owned: 0\b/i)

  unmount()
  vi.useRealTimers()
})

test('pausing a tier\'s tickspeed autobuyer via its PP Upgrades toggle stops it from upgrading automatically; resuming resumes it', () => {
  vi.useFakeTimers()

  // tier09 (Yottabytes, tierIndex 8) has a much cheaper tickspeed multiplier base cost (100) than
  // an earlier tier, keeping the seeded resource amount small; owned > 0 already satisfies
  // isTierUnlocked for this tier directly, with no dependency on any other tier's state.
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10, tier09: 101 },
    owned: { tier09: 101 },
    tierTickspeedAutobuyer: { tier09: true },
    tierTickspeedAutobuyerEnabled: { tier09: false },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  const { unmount } = render(<App />)
  fireEvent.click(screen.getByRole('tab', { name: /upgrades/i }))

  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  expect(screen.getByRole('button', { name: /resume yottabytes's tickspeed autobuyer/i })).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /resume yottabytes's tickspeed autobuyer/i }))
  act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })

  expect(screen.getByRole('button', { name: /pause yottabytes's tickspeed autobuyer/i })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('tab', { name: /game/i }))
  expect(screen.getByLabelText(/^yottabytes layer$/i)).toHaveTextContent(/⚙ \+10%/)

  unmount()
  vi.useRealTimers()
})

test('once every tier is smart and tickspeed-automated, a single notice replaces every per-tier row', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.getByLabelText(/^full smart autobuyer notice$/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /make .*'s autobuyer smart/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /unlock .*'s autobuyer/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /make .*'s tickspeed multiplier upgrade itself automatically/i })).not.toBeInTheDocument()
})

test('a tier fully Smart but not yet tickspeed-automated does not trigger the "every tier" notice', async () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: Object.fromEntries(ALL_TIER_IDS.slice(0, 9).map(id => [id, 10])),
    autobuyers: Object.fromEntries(ALL_TIER_IDS.map(id => [id, 1])),
    smartAutobuyer: Object.fromEntries(ALL_TIER_IDS.map(id => [id, true])),
    // tierTickspeedAutobuyer deliberately left unbought for every tier.
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /upgrades/i }))

  expect(screen.queryByLabelText(/^full smart autobuyer notice$/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^bytes pp upgrades$/i)).toBeInTheDocument()
})

test('clicking the money balance expands a breakdown of every global production multiplier currently in effect, and collapses again on a second click', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier02: 1, tier10: 10 },
    prestigeSpeedBonusUnlocked: true,
    speedUpCount: 2,
    globalTickspeedMultiplier: 1,
    prestige: { xp: 0, points: 50, count: 1, highestMilestone: 1 },
  }))

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

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier02: 1, tier10: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('button', { name: /^money display$/i }))

  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).toHaveTextContent(/prestige speed bonus: not yet unlocked \(10,000 pp on the upgrades page\)/i)
  expect(breakdown).toHaveTextContent(/speed up: not yet activated \(reach level 1 on ronnabytes\)/i)
  expect(breakdown).toHaveTextContent(/tickspeed: not yet active/i)
})

test('the money balance breakdown omits the Prestige speed bonus line before the first prestige, but still shows Speed Up/Global Tickspeed status once those are revealed', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier02: 1, tier10: 10 },
  }))

  render(<App />)
  await user.click(screen.getByRole('button', { name: /^money display$/i }))

  const breakdown = screen.getByLabelText(/^global production multipliers$/i)
  expect(breakdown).not.toHaveTextContent(/prestige speed bonus/i)
  expect(breakdown).toHaveTextContent(/speed up: not yet activated/i)
  expect(breakdown).toHaveTextContent(/tickspeed: not yet active/i)
})
