import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach } from 'vitest'
import App from './App'

beforeEach(() => {
  localStorage.clear()
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

test('reset game restores starting state', async () => {
  const user = userEvent.setup()

  render(<App />)

  // Buy a Tens generator to dirty the state
  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))
  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()

  // Reset
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(screen.getByText(/owned: 0/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for \$10\b/i })).toBeEnabled()
})

test('reset clears localStorage', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for \$10\b/i }))

  // After reset the save-effect fires with fresh state, so money should be back to 10
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved).not.toBeNull()
  expect(saved.resources.Ones).toBe(10)
  expect(saved.owned.tier01).toBe(0)
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

test('money balance is shown once at the top in full currency format', () => {
  render(<App />)

  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$10')
  expect(screen.queryAllByLabelText(/^money display$/i)).toHaveLength(1)
})

test('a money-producing tier shows its production rate with a $ prefix, consistent with money elsewhere', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('+$5/sec')
  expect(screen.getByLabelText(/^tens layer$/i)).not.toHaveTextContent('$/sec')
})

test('an Upgrade level speeds up the autobuyer without changing the displayed production rate', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 5 },
    autobuyers: { tier01: 2 },
  }))

  render(<App />)

  // Production depends only on purchased milestones (still under 10), never on autobuyer
  // level: owned(5) × $1/sec × 1 = $5/sec, unaffected by the Upgrade.
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('+$5/sec')
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('Lv.2')
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('×1.1 speed')
})

test('reaching 10 lifetime purchases of a tier doubles its displayed production rate', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    purchased: { tier01: 10 },
  }))

  render(<App />)

  // Crossing the 10-purchase milestone doubles production: owned(5) × $1/sec × 2 = $10/sec.
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('+$10/sec')
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

test('an Auto-Prestige button appears in the Prestige panel, and spends 100 PP to enable it', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 100, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  const autoPrestigeButton = screen.getByRole('button', { name: /enable auto-prestige for 100 prestige points/i })
  expect(autoPrestigeButton).toBeEnabled()

  await user.click(autoPrestigeButton)

  expect(screen.getByText(/auto-prestige enabled/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /enable auto-prestige/i })).not.toBeInTheDocument()
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('0 PP')
})

test('the Auto-Prestige button stays disabled without enough Prestige Points', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 99, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByRole('button', { name: /enable auto-prestige for 100 prestige points/i })).toBeDisabled()
})

test('prestige points and the production speed bonus are shown', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    prestige: { xp: 0, points: 50, count: 1, highestMilestone: 1 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('50 PP')
  expect(screen.getByLabelText(/^prestige points display$/i)).toHaveTextContent('+50% production speed')
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
