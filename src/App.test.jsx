import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, vi } from 'vitest'
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
  expect(screen.getByRole('button', { name: /buy for \$10\b/i })).toBeEnabled()
})

test('buying Bytes deducts cost and increases owned count', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))

  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
  // After spending $10 on the first Bytes, money=$0. Cost stays $10 (flat within the block of 10) — button disabled.
  expect(screen.getByRole('button', { name: /buy for \$10\b/i })).toBeDisabled()
})

test('the Reset button is always rendered, not gated behind a dev-only build check', () => {
  render(<App />)

  expect(screen.getByRole('button', { name: /reset game/i })).toBeInTheDocument()
})

test('reset game restores starting state once the confirm dialog is accepted', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  render(<App />)

  // Buy a Bytes generator to dirty the state
  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  // Reset
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 0\b/i)
  expect(screen.getByRole('button', { name: /buy for \$10\b/i })).toBeEnabled()
})

test('reset clears localStorage once the confirm dialog is accepted', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(true)

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))

  // After reset the save-effect fires with fresh state, so money should be back to 10
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved).not.toBeNull()
  expect(saved.resources.Ones).toBe(10)
  expect(saved.owned.tier01).toBe(0)
})

test('cancelling the reset confirm dialog leaves the game state untouched', async () => {
  const user = userEvent.setup()
  vi.spyOn(window, 'confirm').mockReturnValue(false)

  render(<App />)

  // Buy a Bytes generator to dirty the state
  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 1\b/i)

  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 1\b/i)
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBe(1)
})

test('Kilobytes tier appears and is purchasable once 10 Bytes are owned', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1000 },
    owned: { tier01: 10 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for \$1,000\b/i })).toBeEnabled()
})

test('buying a higher tier does not deduct the tier below\'s owned count', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1000 },
    owned: { tier01: 10 },
  }))

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for \$1,000\b/i }))

  expect(screen.getByLabelText(/^kilobytes layer$/i)).toHaveTextContent(/owned: 1/i)
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 10/i)
})

test('money balance is shown once at the top in full currency format, centered, with no per-second yield', () => {
  render(<App />)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$10')
  expect(screen.getByLabelText(/^money display$/i)).not.toHaveTextContent('/sec')
  expect(screen.queryAllByLabelText(/^money display$/i)).toHaveLength(1)
})

test('a money-producing tier shows its per-tick production amount with a $ prefix, not a per-second rate', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent('+$5')
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
  // still reads +$5, not +$6.
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent('+$5')
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

test('reaching 10 lifetime purchases of a tier doubles its displayed production amount', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 10 },
  }))

  render(<App />)

  // Crossing the 10-purchase milestone doubles production: owned(5) × $1/tick × 2 = $10 per tick.
  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent('+$10')
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
  expect(progressBar).toHaveAttribute('aria-valuemax', '10')
  // The tier's level (lifetime purchase count) lives on the Buy button itself, not a separate cell.
  expect(screen.getByRole('button', { name: /buy for \$10 \(level 4\)/i })).toBeInTheDocument()
  expect(screen.queryByText(/^level: /i)).not.toBeInTheDocument()
})

test('manual Buy clicks buy as many units as are currently affordable, not just 1', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 100 },
  }))

  render(<App />)

  const buyButton = screen.getByRole('button', { name: /buy ×10 for \$100\b/i })
  expect(buyButton).toBeEnabled()

  await user.click(buyButton)

  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 10\b/i)
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$0')
})

test('manual Buy partially fills when funds only cover part of the cost block', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 35 }, // affords 3 at $10/unit, not the full 10
  }))

  render(<App />)

  const buyButton = screen.getByRole('button', { name: /buy ×3 for \$30\b/i })
  expect(buyButton).toBeEnabled()

  await user.click(buyButton)

  expect(screen.getByLabelText(/^bytes layer$/i)).toHaveTextContent(/owned: 3\b/i)
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$5')
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

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$50')
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

test('clicking the offline progress notice extends its auto-dismiss to a minute from the click', () => {
  vi.useFakeTimers()
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  }))
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - 100_000))

  const { unmount } = render(<App />)
  const notice = screen.getByLabelText(/^offline progress notice$/i)

  // Click well before the original 10s deadline would have fired.
  act(() => { vi.advanceTimersByTime(9_000) })
  fireEvent.click(notice)

  // 1.5s later (10.5s since mount) — past the original 10s deadline plus its 400ms fade, proving
  // the click reset the countdown rather than merely letting the original one finish.
  act(() => { vi.advanceTimersByTime(1_500) })
  expect(screen.getByLabelText(/^offline progress notice$/i)).toBeInTheDocument()

  // Advance to (not past) the extended 60s-from-click deadline in its own act() call, then the
  // 400ms fade in a separate one — the fade's setTimeout is only registered once React flushes
  // the fading-state update *after* an act() call returns, so folding both into a single larger
  // advance would register that timeout too late for the same call to also fire it (the same
  // chained-timer pitfall CLAUDE.md documents for the old tick-progress ring tests).
  act(() => { vi.advanceTimersByTime(58_500) })
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
  expect(screen.getByText(/prestiged 1 time/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for \$10\b/i })).toBeEnabled()
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

test('during the first run, the Prestige panel stays hidden until 10 of the last tier are bought', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    purchased: { tier10: 9 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^prestige panel$/i)).not.toBeInTheDocument()
})

test('during the first run, the Prestige panel appears once 10 of the last tier are bought', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    purchased: { tier10: 10 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige panel$/i)).toBeInTheDocument()
})

test('after the first prestige, the Prestige panel is shown regardless of last-tier purchases', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    purchased: { tier10: 0 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige panel$/i)).toBeInTheDocument()
})

test('the Speed Up panel stays hidden before the last tier unlocks', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^speed up panel$/i)).not.toBeInTheDocument()
})

test('the Speed Up panel appears once the last tier unlocks, with the button disabled below 10 purchases', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchased: { tier10: 9 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^speed up panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /speed up \(requires 10/i })).toBeDisabled()
})

test('the Speed Up button is enabled once the last tier reaches 10 purchases', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchased: { tier10: 10 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /speed up \(requires 10/i })).toBeEnabled()
})

test('the second Speed Up requires a full block of 10 more than the first, not the same flat 10', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchased: { tier10: 10 },
    speedUpCount: 1,
  }))

  render(<App />)

  const button = screen.getByRole('button', { name: /speed up \(requires 20/i })
  expect(button).toBeDisabled()
  expect(screen.queryByRole('button', { name: /speed up \(requires 10/i })).not.toBeInTheDocument()
})

test('the Speed Up button shows the next multiplier and requirement progress on itself', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    purchased: { tier10: 15 },
    speedUpCount: 2,
  }))

  render(<App />)

  // Third activation requires 30 tier10 purchases (15/30 = 50%) and would raise the permanent
  // multiplier to ×8 — both shown on the button itself, with no separate status text line.
  expect(screen.getByRole('button', {
    name: /speed up \(requires 30 ronnabytes\) — doubles production speed to ×8/i,
  })).toBeInTheDocument()
  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent('⏩ ×8 · 15/30')
})

test('clicking Speed Up once eligible resets resources but keeps the panel visible (disabled) rather than hiding it again', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 12345 },
    owned: { tier09: 10, tier10: 25 },
    purchased: { tier10: 10 },
  }))

  render(<App />)

  const speedUpButton = screen.getByRole('button', { name: /speed up \(requires 10/i })
  expect(speedUpButton).toBeEnabled()

  await user.click(speedUpButton)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$10')
  // Speed Up resets owned counts too, so the last tier is no longer unlocked — but since the
  // panel was already revealed once, it stays visible (in a disabled state) rather than
  // disappearing again until the player climbs back up to it. The next cycle now requires 20
  // (speedUpCount incremented to 1 — see getSpeedUpRequirement).
  expect(screen.getByLabelText(/^speed up panel$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /speed up \(requires 20/i })).toBeDisabled()
})

test('Speed Up resets the global tickspeed multiplier level back to not-yet-bought', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 12345 },
    owned: { tier02: 1, tier09: 10, tier10: 25 },
    purchased: { tier10: 10 },
    globalTickspeedMultiplier: 2,
  }))

  render(<App />)

  // The cumulative level/bonus only shows in the expanded description, not the button itself —
  // the description stays in the DOM (and toHaveTextContent-visible) even while collapsed.
  expect(screen.getByLabelText(/^global tickspeed panel$/i)).toHaveTextContent(/lv\.2/i)

  await user.click(screen.getByRole('button', { name: /speed up \(requires 10/i }))

  // Speed Up also resets tier02's owned count to 0, so the card's initial-unlock condition
  // (owning tier02) is no longer met either — with the level reset too, the card reverts all the
  // way back to its pre-activation "Enable" state rather than staying at Lv.2.
  expect(screen.getByRole('button', { name: /enable global tickspeed multiplier for \$10/i })).toBeInTheDocument()
})

test('the Speed Up button is disabled once production freezes at a googol', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e100 },
    owned: { tier09: 10 },
    purchased: { tier10: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 100 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /speed up \(requires 10/i })).toBeDisabled()
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

test('the PP Upgrades page groups purchases into labeled categories', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

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
  await userEvent.setup().click(screen.getByRole('tab', { name: /pp upgrades/i }))

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
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  const autoSpeedUpButton = screen.getByRole('button', { name: /enable auto speed up for 100 prestige points/i })
  expect(autoSpeedUpButton).toBeEnabled()

  await user.click(autoSpeedUpButton)

  expect(screen.getByLabelText(/^auto speed up upgrade$/i)).toHaveTextContent(/active/i)
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
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  const tickspeedAutobuyerButton = screen.getByRole('button', { name: /enable tickspeed autobuyer for 20 prestige points/i })
  expect(tickspeedAutobuyerButton).toBeEnabled()

  await user.click(tickspeedAutobuyerButton)

  expect(screen.getByLabelText(/^tickspeed autobuyer upgrade$/i)).toHaveTextContent(/active/i)
  expect(screen.queryByRole('button', { name: /enable tickspeed autobuyer/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the Enable Tickspeed Autobuyer button stays disabled without enough Prestige Points', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    prestige: { xp: 0, points: 19, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByRole('button', { name: /enable tickspeed autobuyer for 20 prestige points/i })).toBeDisabled()
})

test('the Enable Auto Speed Up button stays disabled without enough Prestige Points', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    prestige: { xp: 0, points: 99, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByRole('button', { name: /enable auto speed up for 100 prestige points/i })).toBeDisabled()
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
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByLabelText(/^auto speed up upgrade$/i)).toHaveTextContent(/active/i)
  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
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

  const globalTickspeedButton = screen.getByRole('button', { name: /enable global tickspeed multiplier for \$10/i })
  expect(globalTickspeedButton).toBeEnabled()

  await user.click(globalTickspeedButton)

  const upgradeButton = screen.getByRole('button', { name: /upgrade global tickspeed multiplier for \$100/i })
  expect(upgradeButton).toBeInTheDocument()
  // The cumulative level/bonus shows only in the expanded description, never on the button
  // itself or the heading — both stay compact regardless of level.
  expect(upgradeButton).not.toHaveTextContent(/lv\.1/i)
  expect(screen.getByRole('heading', { level: 2, name: 'Global Tickspeed Multiplier' })).not.toHaveTextContent(/lv\.1|\+1%/i)
  const panel = screen.getByLabelText(/^global tickspeed panel$/i)
  expect(panel).toHaveTextContent(/lv\.1/i)
  expect(panel).toHaveTextContent(/\+1%/i)
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$0')
})

test('the Enable Global Tickspeed Multiplier button stays disabled without enough Money', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 9 },
    owned: { tier02: 1 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /enable global tickspeed multiplier for \$10/i })).toBeDisabled()
})

test('the Global Tickspeed Multiplier Upgrade button costs another power of ten each level, and shows the cumulative bonus', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 999 },
    globalTickspeedMultiplier: 2,
  }))

  render(<App />)

  const upgradeButton = screen.getByRole('button', { name: /upgrade global tickspeed multiplier for \$1,000/i })
  expect(upgradeButton).toBeDisabled()
  // The cumulative level/bonus shows only in the expanded description, not on the button itself.
  expect(upgradeButton).not.toHaveTextContent(/lv\.2/i)
  expect(screen.getByLabelText(/^global tickspeed panel$/i)).toHaveTextContent(/lv\.2/i)
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

test('the Auto-Prestige option stays hidden until every tier is upgraded to Smart', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

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
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  const autoPrestigeButton = screen.getByRole('button', { name: /enable auto-prestige for 1000 prestige points/i })
  expect(autoPrestigeButton).toBeEnabled()

  await user.click(autoPrestigeButton)

  expect(screen.getByLabelText(/^auto-prestige upgrade$/i)).toHaveTextContent(/lv\.1/i)
  expect(screen.getByRole('button', { name: /upgrade auto-prestige for 2000 prestige points/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the Auto-Prestige button stays disabled without enough Prestige Points', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 999, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByRole('button', { name: /enable auto-prestige for 1000 prestige points/i })).toBeDisabled()
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
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByLabelText(/^auto-prestige upgrade$/i)).toHaveTextContent(/lv\.1/i)
  expect(screen.getByRole('button', { name: /upgrade auto-prestige for 2000 prestige points/i })).toBeDisabled()
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
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent(/production speed bonus locked/i)

  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))
  const unlockButton = screen.getByRole('button', { name: /unlock prestige point production speed bonus for 10000 prestige points/i })
  expect(unlockButton).toBeEnabled()

  await user.click(unlockButton)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('500 PP')
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('+500% production speed')
  expect(screen.queryByRole('button', { name: /unlock prestige point production speed bonus/i })).not.toBeInTheDocument()
})

test('the Unlock Speed Bonus button stays disabled without enough Prestige Points', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 9999, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByRole('button', { name: /unlock prestige point production speed bonus for 10000 prestige points/i })).toBeDisabled()
})

test('PP-spending buttons report how much of their cost the current balance covers, like the tier buttons', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 50, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  // Unlocking tier01's autobuyer costs 1 PP — 50 PP fully covers it (valuenow caps at the cost).
  const unlockProgress = screen.getByRole('progressbar', { name: /bytes autobuyer unlock prestige point progress/i })
  expect(unlockProgress).toHaveAttribute('aria-valuenow', '1')
  expect(unlockProgress).toHaveAttribute('aria-valuemax', '1')

  // Auto Speed Up costs 100 PP — 50 PP covers half.
  const autoSpeedUpProgress = screen.getByRole('progressbar', { name: /auto speed up prestige point progress/i })
  expect(autoSpeedUpProgress).toHaveAttribute('aria-valuenow', '50')
  expect(autoSpeedUpProgress).toHaveAttribute('aria-valuemax', '100')
})

test('the Speed Bonus unlock is offered as soon as the PP Upgrades page itself is reachable, with no separate reveal gate (e.g. Auto Speed Up need not be bought first)', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 10500, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('10,500 PP')
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent(/production speed bonus locked/i)

  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))
  expect(screen.getByRole('button', { name: /unlock prestige point production speed bonus for 10000 prestige points/i })).toBeEnabled()
})

test('an Unlock button appears on the PP Upgrades page for a tier whose autobuyer isn\'t unlocked yet, and buying it reveals the Smart button in its place', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    // tier01's autobuyer is deliberately absent/locked here — there's no Money-activation
    // prerequisite anymore, every tier unlocks the same way via PP.
    prestige: { xp: 0, points: 1, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  const unlockButton = screen.getByRole('button', { name: /unlock bytes's autobuyer for 1 prestige point\b/i })
  expect(unlockButton).toBeEnabled()
  // Smart isn't purchasable yet — it requires the autobuyer already be unlocked.
  expect(screen.queryByRole('button', { name: /make bytes's autobuyer smart/i })).not.toBeInTheDocument()

  await user.click(unlockButton)

  // Unlock is bought silently in the background; the row immediately shows Smart instead of a
  // lingering "Unlock" button — the two controls are never shown for the same tier.
  expect(screen.queryByRole('button', { name: /unlock bytes's autobuyer/i })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /make bytes's autobuyer smart/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the Unlock button stays disabled without enough Prestige Points', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByRole('button', { name: /unlock bytes's autobuyer for 1 prestige point\b/i })).toBeDisabled()
})

test('a non-first tier\'s Unlock button appears the same way as the first tier\'s, with no special-casing between them', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 10 }, // unlocks Kilobytes
    // kilobytes' autobuyer is deliberately absent/locked here.
    prestige: { xp: 0, points: 2, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByRole('button', { name: /unlock kilobytes's autobuyer for 2 prestige points/i })).toBeEnabled()
})

test('no PP Upgrades tab or PP-based controls appear before the player has ever prestiged, even with an active autobuyer and unspent PP', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 5, count: 0, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^prestige points display$/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('tab', { name: /pp upgrades/i })).not.toBeInTheDocument()
})

test('the Prestige panel omits unspent-PP info and the PP Upgrades sentence before the first prestige', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    purchased: { tier10: 10 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige panel$/i)).not.toHaveTextContent(/pp unspent/i)
  expect(screen.getByLabelText(/^prestige panel$/i)).not.toHaveTextContent(/pp upgrades page/i)
})

test('the Prestige panel shows unspent-PP info and the PP Upgrades sentence after the first prestige', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 5, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige panel$/i)).toHaveTextContent(/pp unspent/i)
  expect(screen.getByLabelText(/^prestige panel$/i)).toHaveTextContent(/pp upgrades page/i)
})

test('a Smart button appears on the PP Upgrades page once a tier\'s autobuyer is unlocked (not before), and spends 10x the unlock cost', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

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

test('a tier tickspeed autobuyer button appears alongside Smart once a tier is unlocked, costs 2x the unlock cost, and is independent of Smart', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 2, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  // Both controls show at once — Smart isn't affordable (10 PP needed, only 2 held), but the
  // tier tickspeed autobuyer (2 PP, 2x the 1 PP unlock cost) is.
  const tickspeedAutoButton = screen.getByRole('button', { name: /make bytes's tickspeed multiplier upgrade itself automatically for 2 prestige points/i })
  expect(tickspeedAutoButton).toBeEnabled()
  expect(screen.getByRole('button', { name: /make bytes's autobuyer smart/i })).toBeDisabled()

  await user.click(tickspeedAutoButton)

  // Bought: badge replaces the button, Smart's own button is still there (independent, still
  // pending), and the row itself hasn't disappeared.
  expect(screen.queryByRole('button', { name: /make bytes's tickspeed multiplier upgrade itself automatically/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^bytes pp upgrades$/i)).toHaveTextContent(/active/i)
  expect(screen.getByRole('button', { name: /make bytes's autobuyer smart/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the tier tickspeed autobuyer button is buyable on the PP Upgrades page even before that tier\'s autobuyer is unlocked, alongside the still-pending Unlock button', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    // autobuyers.tier01 is left at its default (null, locked).
    prestige: { xp: 0, points: 2, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  // Unlock is still offered (needed for Smart), and the tier tickspeed autobuyer is offered
  // independently, at the same time — no autobuyer-unlock prerequisite for the latter.
  expect(screen.getByRole('button', { name: /unlock bytes's autobuyer/i })).toBeInTheDocument()
  // Smart never shows before Unlock — it still genuinely requires the autobuyer unlocked first.
  expect(screen.queryByRole('button', { name: /make bytes's autobuyer smart/i })).not.toBeInTheDocument()

  const tickspeedAutoButton = screen.getByRole('button', { name: /make bytes's tickspeed multiplier upgrade itself automatically for 2 prestige points/i })
  expect(tickspeedAutoButton).toBeEnabled()

  await user.click(tickspeedAutoButton)

  expect(screen.queryByRole('button', { name: /make bytes's tickspeed multiplier upgrade itself automatically/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^bytes pp upgrades$/i)).toHaveTextContent(/active/i)
  // Unlock is still there, untouched by the tickspeed-autobuyer purchase.
  expect(screen.getByRole('button', { name: /unlock bytes's autobuyer/i })).toBeInTheDocument()
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
  await userEvent.setup().click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.queryByLabelText(/^bytes pp upgrades$/i)).not.toBeInTheDocument()
})

test('the PP Upgrades tab NavDot lights up when only the tier tickspeed autobuyer (not Smart) is affordable', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    // 2 PP covers tier01's tickspeed autobuyer (2 PP) but nothing else (Smart needs 10 PP).
    prestige: { xp: 0, points: 2, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^pp upgrade available$/i)).toBeInTheDocument()
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

test('the Smart button stays disabled without enough Prestige Points', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 9, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByRole('button', { name: /make bytes's autobuyer smart .* for 10 prestige points/i })).toBeDisabled()
})

test('once every tier is smart and tickspeed-automated, a single notice replaces every per-tier row', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await user.click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.getByLabelText(/^full smart autobuyer notice$/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /make .*'s autobuyer smart/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /unlock .*'s autobuyer/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /make .*'s tickspeed multiplier upgrade itself automatically/i })).not.toBeInTheDocument()
})

test('a tier fully Smart but not yet tickspeed-automated does not trigger the "every tier" notice', async () => {
  const tierIds = ['tier01', 'tier02', 'tier03', 'tier04', 'tier05', 'tier06', 'tier07', 'tier08', 'tier09', 'tier10']

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: Object.fromEntries(tierIds.slice(0, 9).map(id => [id, 10])),
    autobuyers: Object.fromEntries(tierIds.map(id => [id, 1])),
    smartAutobuyer: Object.fromEntries(tierIds.map(id => [id, true])),
    // tierTickspeedAutobuyer deliberately left unbought for every tier.
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)
  await userEvent.setup().click(screen.getByRole('tab', { name: /pp upgrades/i }))

  expect(screen.queryByLabelText(/^full smart autobuyer notice$/i)).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^bytes pp upgrades$/i)).toBeInTheDocument()
})
