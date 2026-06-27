import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders the extensible incremental game shell', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: /tens/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/ones layer/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy \$10/i })).toBeEnabled()
})

test('buys a generator without allowing unsafe overspend paths', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.click(screen.getByRole('button', { name: /buy \$10/i }))

  expect(screen.getByText(/owned: 1/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /buy \$12/i })).toBeDisabled()
})
