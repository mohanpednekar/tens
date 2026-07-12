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
  expect(saved.owned.Tens).toBe(0)
})

test('Thousands tier appears and is purchasable once 10 Tens are owned', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1000 },
    owned: { Tens: 10 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/^thousands layer$/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for \$1,000\b/i })).toBeEnabled()
})

test('buying a higher tier does not deduct the tier below\'s owned count', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 1000 },
    owned: { Tens: 10 },
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

test('the ×10 toggle bulk-buys up to 10 units at the same flat cost', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { Ones: 100 },
  }))

  render(<App />)

  await user.click(screen.getByRole('button', { name: '×10' }))
  await user.click(screen.getByRole('button', { name: /buy ×10 for \$100\b/i }))

  expect(screen.getByText(/owned: 10/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^money display$/i)).toHaveTextContent('$0')
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
