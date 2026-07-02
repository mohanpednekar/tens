import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach } from 'vitest'
import App from './App'

beforeEach(() => {
  localStorage.clear()
})

test('renders the game title and the Ones tier', () => {
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /tens/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/ones layer/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for \$10/i })).toBeEnabled()
})

test('buying Ones deducts cost and increases owned count', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for \$10/i }))

  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()
  // After spending $10 on the first Ones (cost=$10), money=$0. Next cost=$11 — button disabled.
  expect(screen.getByRole('button', { name: /buy for \$11/i })).toBeDisabled()
})

test('reset game restores starting state', async () => {
  const user = userEvent.setup()

  render(<App />)

  // Buy an Ones generator to dirty the state
  await user.click(screen.getByRole('button', { name: /buy for \$10/i }))
  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()

  // Reset
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  expect(screen.getByText(/owned: 0/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for \$10/i })).toBeEnabled()
})

test('reset clears localStorage', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy for \$10/i }))

  // After reset the save-effect fires with fresh state, so money should be back to 10
  await user.click(screen.getByRole('button', { name: /reset game/i }))

  const saved = JSON.parse(localStorage.getItem('tens_game_state'))
  expect(saved).not.toBeNull()
  expect(saved.resources.money).toBe(10)
  expect(saved.owned.ones).toBe(0)
})

test('tens layer shows ones as its cost resource when unlocked', () => {
  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { ones: 10 },
    owned: { ones: 10 },
  }))

  render(<App />)

  expect(screen.getByLabelText(/tens layer/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy for 10 1s/i })).toBeEnabled()
})

test('buying hundreds also deducts the spent tens from the previous layer', async () => {
  const user = userEvent.setup()

  localStorage.setItem('tens_game_state', JSON.stringify({
    resources: { tens: 10 },
    owned: { ones: 10, tens: 10 },
  }))

  render(<App />)

  const buyHundreds = screen.getByRole('button', { name: /buy for 10 10s/i })
  expect(buyHundreds).toBeEnabled()

  await user.click(buyHundreds)

  expect(screen.getByLabelText(/hundreds layer/i)).toHaveTextContent(/owned: 1/i)
  expect(screen.getByLabelText(/tens layer/i)).toHaveTextContent(/owned: 0/i)
})
