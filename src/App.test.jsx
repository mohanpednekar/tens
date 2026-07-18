import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TICK_RATE_MS } from 'game/layers'
import { afterEach, beforeEach, vi } from 'vitest'
import App from './App'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('renders the game title and the Tens tier', () => {
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /tens/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^tens layer$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for \$10\b/i })).toBeEnabled()
})

test('buying Tens deducts cost and increases owned count', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))

  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()
  // After spending $10 on the first Tens, money=$0. Cost stays $10 (flat within the block of 10) — button disabled.
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

  // Buy a Tens generator to dirty the state
  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))
  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()

  // Reset
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  expect(screen.getByText(/owned: 0/i)).toBeInTheDocument()
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

  // Buy a Tens generator to dirty the state
  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))
  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(window.confirm).toHaveBeenCalled()
  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()
  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved.owned.tier01).toBe(1)
})

test('Thousands tier appears and is purchasable once 10 Tens are owned', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1000 },
    owned: { tier01: 10 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^thousands layer$/i)).toBeInTheDocument()
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

  expect(screen.getByLabelText(/^thousands layer$/i)).toHaveTextContent(/owned: 1/i)
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent(/owned: 10/i)
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

  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('+$5')
  expect(screen.getByLabelText(/^tens layer$/i)).not.toHaveTextContent('/sec')
})

test('an Upgrade level speeds up the autobuyer without changing the displayed production amount', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 5 },
    autobuyers: { tier01: 2 },
  }))

  render(<App />)

  // Production depends only on purchased milestones (still under 10), never on autobuyer
  // level: owned(5) × $1/tick × 1 = $5 per tick, unaffected by the Upgrade.
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('+$5')
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('Lv.2')
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('×1.1 speed')
})

test('reaching 10 lifetime purchases of a tier doubles its displayed production amount', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 10 },
  }))

  render(<App />)

  // Crossing the 10-purchase milestone doubles production: owned(5) × $1/tick × 2 = $10 per tick.
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('+$10')
})

test('a tier shows its full per-tick production amount, not a reduced rate', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 10, tier02: 4 },
  }))

  render(<App />)

  // The displayed amount is the raw per-tick credit (owned(4) × 1, no bonus/milestone) delivered
  // once its tick-progress bar fills — not divided by tickspeed, since that's no longer shown as
  // an averaged "/sec" rate.
  expect(screen.getByLabelText(/^thousands layer$/i)).toHaveTextContent('+4 Tens')
})

test('a tier row shows a production tick-progress bar reflecting its banked accumulator', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    // Tens' base tickspeed is 1s, so 0.5 banked seconds is a 50% fill.
    tierProductionAccumulators: { tier01: 0.5 },
  }))

  render(<App />)

  const progressBar = screen.getByRole('progressbar', { name: /tens production tick progress/i })
  expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  expect(progressBar).toHaveAttribute('aria-valuemax', '100')
})

test('a tick-progress ring holds at 100% on the tick a batch delivers, then resets on the next', () => {
  vi.useFakeTimers()
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 100000 },
    owned: { tier01: 10, tier02: 4 },
  }))

  const { unmount } = render(<App />)
  const getRing = () => screen.getByRole('progressbar', { name: /thousands production tick progress/i })
  // Advance exactly one live tick (TICK_RATE_MS) per act() call, rather than jumping by a whole
  // second in one advanceTimersByTime call — jumping by more than one tick fires the interval
  // several times synchronously within the same call stack, which React 18 batches into a single
  // render; the ring's "just delivered" detection (see getTierProductionProgressPercent) compares
  // against the previous *render's* banked accumulator, so it needs one render per tick to stay
  // in sync with reality, exactly like the real interval firing 100ms apart in production does.
  const advanceOneTick = () => act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
  const ticksPerSecond = 1000 / TICK_RATE_MS
  const halfSecond = ticksPerSecond / 2

  // Thousands' tickspeed is 1s (same as every tier) — half a second's worth of ticks banks half
  // of it.
  for (let i = 0; i < halfSecond; i++) advanceOneTick()
  expect(getRing()).toHaveAttribute('aria-valuenow', '50')

  // The rest of that second's ticks cross the threshold and deliver — the ring should read 100%,
  // not the freshly-wrapped 0% remainder that tickGame actually banks internally.
  for (let i = 0; i < halfSecond; i++) advanceOneTick()
  expect(getRing()).toHaveAttribute('aria-valuenow', '100')

  // The following ticks start the next cycle, dropping back down to a partial fill.
  for (let i = 0; i < halfSecond; i++) advanceOneTick()
  expect(getRing()).toHaveAttribute('aria-valuenow', '50')

  // Unmount while fake timers are still active so the live tick interval is cancelled against the
  // same (fake) timer implementation that scheduled it — unmounting after vi.useRealTimers() would
  // leave a real clearInterval call holding a stale fake-timer id, silently failing to cancel it.
  unmount()
  vi.useRealTimers()
})

test('the Buy button shows a cost-block progress bar reflecting purchases so far', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    purchased: { tier01: 4 },
  }))

  render(<App />)

  const progressBar = screen.getByRole('progressbar', { name: /tens cost-block progress/i })
  expect(progressBar).toHaveAttribute('aria-valuenow', '4')
  expect(progressBar).toHaveAttribute('aria-valuemax', '10')
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

  expect(screen.getByText(/owned: 10/i)).toBeInTheDocument()
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

  expect(screen.getByText(/owned: 3/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$5')
})

test('each tier name is rendered as a heading for screen-reader navigation', () => {
  render(<App />)

  expect(screen.getByRole('heading', { level: 3, name: /^tens$/i })).toBeInTheDocument()
})

test('applies offline progress at 10% speed based on elapsed time since the last save', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 0 },
    owned: { tier01: 5 },
  }))
  // 100 real seconds ago → 10 simulated seconds at 10% speed → 5 Tens × 10s = +50 money
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

test('the Speed Up panel shows the current multiplier and activation count', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    speedUpCount: 2,
  }))

  render(<App />)

  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent(/×4 production speed/i)
  expect(screen.getByLabelText(/^speed up panel$/i)).toHaveTextContent(/2 activations/i)
})

test('clicking Speed Up once eligible resets resources and re-hides the panel until the last tier unlocks again', async () => {
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
  // Speed Up resets owned counts too, so the last tier (and its own unlock prerequisite) is no
  // longer unlocked — the panel disappears again until the player climbs back up to it.
  expect(screen.queryByLabelText(/^speed up panel$/i)).not.toBeInTheDocument()
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

test('an Enable Auto Speed Up button appears after the first prestige, and spends 100 PP to enable it', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    prestige: { xp: 0, points: 100, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  const autoSpeedUpButton = screen.getByRole('button', { name: /enable auto speed up for 100 prestige points/i })
  expect(autoSpeedUpButton).toBeEnabled()

  await user.click(autoSpeedUpButton)

  expect(screen.getByText(/auto speed up active/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the Enable Auto Speed Up button stays disabled without enough Prestige Points', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    prestige: { xp: 0, points: 99, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /enable auto speed up for 100 prestige points/i })).toBeDisabled()
})

test('a static "Auto Speed Up active" badge shows once it has been bought', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    autoSpeedUp: true,
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByText(/auto speed up active/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable auto speed up/i })).not.toBeInTheDocument()
})

const ALL_TIER_IDS = ['tier01', 'tier02', 'tier03', 'tier04', 'tier05', 'tier06', 'tier07', 'tier08', 'tier09', 'tier10']
// Every tier smart (which itself requires every tier automated — see buySmartAutobuyer's
// prerequisite) is what unlocks the Auto-Prestige option in the UI at all — see MainPage's
// allTiersSmart gate.
const allTiersSmartSeed = () => ({
  owned: Object.fromEntries(ALL_TIER_IDS.slice(0, 9).map(id => [id, 10])),
  autobuyers: Object.fromEntries(ALL_TIER_IDS.map(id => [id, 1])),
  autobuyerAutomation: Object.fromEntries(ALL_TIER_IDS.map(id => [id, true])),
  smartAutobuyer: Object.fromEntries(ALL_TIER_IDS.map(id => [id, true])),
})

test('the Auto-Prestige option stays hidden until every tier is upgraded to Smart', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.queryByRole('button', { name: /auto-prestige/i })).not.toBeInTheDocument()
  expect(screen.queryByText(/auto-prestige/i)).not.toBeInTheDocument()
})

test('an Auto-Prestige button appears in the Prestige panel once every tier is Smart, and spends 1000 PP to activate level 1', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 1000, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  const autoPrestigeButton = screen.getByRole('button', { name: /enable auto-prestige for 1000 prestige points/i })
  expect(autoPrestigeButton).toBeEnabled()

  await user.click(autoPrestigeButton)

  expect(screen.getByText(/auto-prestige lv\.1/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /upgrade auto-prestige for 2000 prestige points/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the Auto-Prestige button stays disabled without enough Prestige Points', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    prestige: { xp: 0, points: 999, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /enable auto-prestige for 1000 prestige points/i })).toBeDisabled()
})

test('the Auto-Prestige Upgrade button costs double the previous level, and stays disabled without enough points', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    ...allTiersSmartSeed(),
    autoPrestige: 1,
    prestige: { xp: 0, points: 1999, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByText(/auto-prestige lv\.1/i)).toBeInTheDocument()
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

test('the production speed bonus reads as locked, and an unlock button is offered, before it has been bought', async () => {
  const user = userEvent.setup()

  // autoSpeedUp bought: the Speed Bonus unlock only reveals after the cheaper Auto Speed Up.
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autoSpeedUp: true,
    prestige: { xp: 0, points: 10500, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('10,500 PP')
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent(/production speed bonus locked/i)

  const unlockButton = screen.getByRole('button', { name: /unlock prestige point production speed bonus for 10000 prestige points/i })
  expect(unlockButton).toBeEnabled()

  await user.click(unlockButton)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('500 PP')
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('+500% production speed')
  expect(screen.queryByRole('button', { name: /unlock prestige point production speed bonus/i })).not.toBeInTheDocument()
})

test('the Unlock Speed Bonus button stays disabled without enough Prestige Points', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autoSpeedUp: true,
    prestige: { xp: 0, points: 9999, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /unlock prestige point production speed bonus for 10000 prestige points/i })).toBeDisabled()
})

test('PP-spending buttons report how much of their cost the current balance covers, like the tier buttons', () => {
  // owned.tier09 unlocks tier10, so the Speed Up card (holding Auto Speed Up) is shown.
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier09: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 50, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  // Automate tier01 costs 1 PP — 50 PP fully covers it (valuenow caps at the cost).
  const automationProgress = screen.getByRole('progressbar', { name: /tens automation prestige point progress/i })
  expect(automationProgress).toHaveAttribute('aria-valuenow', '1')
  expect(automationProgress).toHaveAttribute('aria-valuemax', '1')

  // Auto Speed Up costs 100 PP — 50 PP covers half.
  const autoSpeedUpProgress = screen.getByRole('progressbar', { name: /auto speed up prestige point progress/i })
  expect(autoSpeedUpProgress).toHaveAttribute('aria-valuenow', '50')
  expect(autoSpeedUpProgress).toHaveAttribute('aria-valuemax', '100')
})

test('the Speed Bonus unlock stays hidden (button and locked teaser alike) until Auto Speed Up is bought', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 10500, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.queryByRole('button', { name: /unlock prestige point production speed bonus/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('10,500 PP')
  expect(screen.getByLabelText(/^prestige points display$/i)).not.toHaveTextContent(/production speed bonus locked/i)
  expect(screen.getByLabelText(/^prestige panel$/i)).not.toHaveTextContent(/production speed bonus locked/i)
  expect(screen.getByLabelText(/^prestige panel$/i)).not.toHaveTextContent(/10000 points/i)
})

test('an Automate button appears once a tier\'s autobuyer is active, and buying it reveals the Smart button in its place', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 1, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  const automateButton = screen.getByRole('button', { name: /automate tens autobuyer upgrades for 1 prestige point/i })
  expect(automateButton).toBeEnabled()
  // Smart isn't purchasable yet — it requires Auto-upgrade automation first.
  expect(screen.queryByRole('button', { name: /make tens's autobuyer smart/i })).not.toBeInTheDocument()

  await user.click(automateButton)

  // Auto-upgrade is bought silently in the background; the slot immediately shows Smart instead
  // of a lingering "Auto-upgrade" badge — the two controls are never shown for the same tier.
  expect(screen.queryByRole('button', { name: /automate tens autobuyer upgrades/i })).not.toBeInTheDocument()
  expect(screen.queryByText(/🤖 auto-upgrade/i)).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /make tens's autobuyer smart/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the Automate button stays disabled without enough Prestige Points', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /automate tens autobuyer upgrades for 1 prestige point/i })).toBeDisabled()
})

test('no Automate control appears before a tier\'s autobuyer is activated', () => {
  render(<App />)

  expect(screen.queryByRole('button', { name: /automate tens autobuyer/i })).not.toBeInTheDocument()
})

test('the first tier\'s Automate button appears (and bypass-activates its autobuyer) even while its autobuyer is still locked, once the player has prestiged', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    // tier01's autobuyer is deliberately absent/locked here.
    prestige: { xp: 0, points: 1, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  const unlockButton = screen.getByRole('button', { name: /unlock and automate tens's autobuyer for 1 prestige point/i })
  expect(unlockButton).toBeEnabled()

  await user.click(unlockButton)

  // Bought silently activates the autobuyer at the baseline level and automates it in one step —
  // the slot goes straight to Smart, same as the already-active path.
  expect(screen.queryByRole('button', { name: /unlock and automate tens's autobuyer/i })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /make tens's autobuyer smart/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('a non-first tier\'s Automate control stays hidden while its autobuyer is locked, even with a prestiged player and enough PP', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 10 }, // unlocks Thousands
    // thousands' autobuyer is deliberately absent/locked here.
    prestige: { xp: 0, points: 5, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.queryByRole('button', { name: /automate thousands autobuyer/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /unlock and automate thousands's autobuyer/i })).not.toBeInTheDocument()
})

test('no PP information or PP-based controls appear before the player has ever prestiged, even with an active autobuyer and unspent PP', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    prestige: { xp: 0, points: 5, count: 0, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.queryByLabelText(/^prestige points display$/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /automate tens autobuyer upgrades/i })).not.toBeInTheDocument()
})

test('the Prestige panel omits unspent-PP info and the automation sentence before the first prestige', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    purchased: { tier10: 10 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige panel$/i)).not.toHaveTextContent(/pp unspent/i)
  expect(screen.getByLabelText(/^prestige panel$/i)).not.toHaveTextContent(/automate autobuyer/i)
})

test('the Prestige panel shows unspent-PP info and the automation sentence after the first prestige', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 5, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige panel$/i)).toHaveTextContent(/pp unspent/i)
  expect(screen.getByLabelText(/^prestige panel$/i)).toHaveTextContent(/automate autobuyer/i)
})

test('a Smart button appears once a tier is automated (not before), and spends 10x the automation cost', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    autobuyerAutomation: { tier01: true },
    prestige: { xp: 0, points: 10, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  const smartButton = screen.getByRole('button', { name: /make tens's autobuyer smart .* for 10 prestige points/i })
  expect(smartButton).toBeEnabled()
  // The Automate control is already gone — Auto-upgrade is bought, Smart has taken its place.
  expect(screen.queryByRole('button', { name: /automate tens autobuyer upgrades/i })).not.toBeInTheDocument()

  await user.click(smartButton)

  expect(screen.getByText(/🧠 smart/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /make tens's autobuyer smart/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the Smart button stays disabled without enough Prestige Points', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    autobuyers: { tier01: 1 },
    autobuyerAutomation: { tier01: true },
    prestige: { xp: 0, points: 9, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /make tens's autobuyer smart .* for 10 prestige points/i })).toBeDisabled()
})

test('once every tier is smart, a single notice replaces every per-tier Smart indicator, with no Automate control left either', () => {
  const tierIds = ['tier01', 'tier02', 'tier03', 'tier04', 'tier05', 'tier06', 'tier07', 'tier08', 'tier09', 'tier10']
  const owned = Object.fromEntries(tierIds.slice(0, 9).map(id => [id, 10]))
  const autobuyers = Object.fromEntries(tierIds.map(id => [id, 1]))
  // Smart requires automation, so every tier being smart implies every tier is also automated.
  const autobuyerAutomation = Object.fromEntries(tierIds.map(id => [id, true]))
  const smartAutobuyer = Object.fromEntries(tierIds.map(id => [id, true]))

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned,
    autobuyers,
    autobuyerAutomation,
    smartAutobuyer,
    prestige: { xp: 0, points: 0, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^full smart autobuyer notice$/i)).toBeInTheDocument()
  expect(screen.queryByText(/🧠 smart/i)).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /make .*'s autobuyer smart/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /automate/i })).not.toBeInTheDocument()
})
