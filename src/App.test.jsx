import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders the game title and the Ones tier', () => {
  render(<App />)

  expect(screen.getByRole('heading', { level: 1, name: /tens/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/ones layer/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy \$10/i })).toBeEnabled()
})

test('buying Ones deducts cost and increases owned count', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy \$10/i }))

  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()
  // After spending $10 on the first Ones (cost=$10), money=$0. Next cost=$11 — button disabled.
  expect(screen.getByRole('button', { name: /buy \$11/i })).toBeDisabled()
})
