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

test('Bulk toggle defaults to ×10 and persists a switch to ×1 across reload', async () => {
  const user = userEvent.setup()

  const { unmount } = render(<App />)

  expect(screen.getByRole('button', { name: '×10' })).toHaveAttribute('aria-pressed', 'true')

  await user.click(screen.getByRole('button', { name: '×1' }))
  expect(screen.getByRole('button', { name: '×1' })).toHaveAttribute('aria-pressed', 'true')
  expect(localStorage.getItem('tens_bulk_quantity')).toBe('1')

  // Simulate a page reload: unmount and render a fresh instance against the same localStorage
  unmount()
  render(<App />)

  expect(screen.getByRole('button', { name: '×1' })).toHaveAttribute('aria-pressed', 'true')
})

test('reset game does not reset the Bulk toggle preference', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button', { name: '×1' }))
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(screen.getByRole('button', { name: '×1' })).toHaveAttribute('aria-pressed', 'true')
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

test('an Upgrade level shows its autobuyer purchase-yield bonus without changing the displayed production rate', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 10 },
    owned: { tier01: 5 },
    autobuyers: { tier01: 1 },
  }))

  render(<App />)

  // Production reflects owned count only — the Upgrade level boosts autobuyer purchase yield,
  // not the passive per-unit production rate, so this stays owned(5) × $1/sec.
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('+$5/sec')
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('Lv.1')
  expect(screen.getByLabelText(/^tens layer$/i)).toHaveTextContent('×2/buy')
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

test('the ×1/×10 bulk toggle affects the manual Buy button', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 100 },
  }))

  render(<App />)

  // Default bulk mode is ×10 — Buy grabs the full affordable block.
  expect(screen.getByRole('button', { name: /buy ×10 for \$100\b/i })).toBeEnabled()

  // Switching to ×1 limits manual Buy to a single unit.
  await user.click(screen.getByRole('button', { name: '×1' }))

  expect(screen.getByRole('button', { name: /buy for \$10\b/i })).toBeEnabled()
})

test('the quantity toggle marks the active option with aria-pressed', async () => {
  const user = userEvent.setup()

  render(<App />)

  // Default bulk mode is ×10.
  expect(screen.getByRole('button', { name: '×10' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: '×1' })).toHaveAttribute('aria-pressed', 'false')

  await user.click(screen.getByRole('button', { name: '×1' }))

  expect(screen.getByRole('button', { name: '×10' })).toHaveAttribute('aria-pressed', 'false')
  expect(screen.getByRole('button', { name: '×1' })).toHaveAttribute('aria-pressed', 'true')
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

test('prestige becomes available once money reaches a googol and resets progress', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1e100 },
  }))

  render(<App />)

  const prestigeButton = screen.getByRole('button', { name: /prestige \(requires/i })
  expect(prestigeButton).toBeEnabled()

  await user.click(prestigeButton)

  expect(screen.getByText(/level 1/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for \$10\b/i })).toBeEnabled()
})
