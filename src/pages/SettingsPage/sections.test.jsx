import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from 'theme'
import CloudSaveSection from './CloudSaveSection'
import LegalSection from './LegalSection'
import StoreSection from './StoreSection'

const renderInTheme = ui => render(<ThemeProvider mode="dark">{ui}</ThemeProvider>)

const fakeBackend = (user = null) => {
  let listener = () => {}
  return {
    onUserChange: vi.fn(next => { listener = next; next(user); return () => {} }),
    emit: next => act(() => listener(next)),
    signIn: vi.fn(async () => {}),
    signUp: vi.fn(async () => {}),
    signOutUser: vi.fn(async () => {}),
    resetPassword: vi.fn(async () => {}),
    uploadSave: vi.fn(async () => {}),
    downloadSave: vi.fn(async () => ({ payload: '{"saved":true}', updatedAt: null })),
    deleteAccount: vi.fn(async () => ({ ok: true })),
  }
}

const fakeGame = () => ({
  exportSaveJson: vi.fn(() => '{"local":true}'),
  applyCloudSave: vi.fn(() => ({ ok: true })),
})

afterEach(() => vi.restoreAllMocks())

describe('LegalSection', () => {
  it('links the hosted Privacy Policy and Terms of Use', () => {
    renderInTheme(<LegalSection />)
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', 'https://mohanpednekar.github.io/tens/privacy.html')
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toHaveAttribute('href', 'https://mohanpednekar.github.io/tens/terms.html')
  })
})

describe('StoreSection', () => {
  it('renders nothing with the default (no-op) monetization service', () => {
    const { container } = renderInTheme(<StoreSection />)
    expect(container).toBeEmptyDOMElement()
  })

  it('offers remove ads, a tip and restore when purchases are available', async () => {
    const service = {
      iapAvailable: true,
      getEntitlements: vi.fn(async () => ({ removeAds: false })),
      purchase: vi.fn(async () => ({ ok: true, entitlements: { removeAds: true } })),
      restore: vi.fn(async () => ({ ok: true, entitlements: { removeAds: true } })),
    }
    renderInTheme(<StoreSection service={service} />)
    await userEvent.click(screen.getByRole('button', { name: 'buy remove ads' }))
    expect(service.purchase).toHaveBeenCalledWith('removeAds')
    expect(await screen.findByText(/Ads removed — rewards/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'buy remove ads' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'restore purchases' }))
    expect(service.restore).toHaveBeenCalled()
  })
})

describe('CloudSaveSection', () => {
  it('renders nothing when cloud save is not configured', () => {
    const { container } = renderInTheme(<CloudSaveSection game={fakeGame()} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('signs in with email and password', async () => {
    const backend = fakeBackend()
    renderInTheme(<CloudSaveSection enabled game={fakeGame()} loadBackend={async () => backend} />)
    await userEvent.type(await screen.findByLabelText('cloud save email'), 'p@example.com')
    await userEvent.type(screen.getByLabelText('cloud save password'), 'hunter22')
    await userEvent.click(screen.getByRole('button', { name: 'sign in to cloud save' }))
    expect(backend.signIn).toHaveBeenCalledWith('p@example.com', 'hunter22')
  })

  it('uploads and downloads the active save', async () => {
    const backend = fakeBackend({ uid: 'u1', email: 'p@example.com' })
    const game = fakeGame()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderInTheme(<CloudSaveSection enabled game={game} loadBackend={async () => backend} />)
    await userEvent.click(await screen.findByRole('button', { name: 'upload save to cloud' }))
    expect(backend.uploadSave).toHaveBeenCalledWith(expect.objectContaining({ payload: '{"local":true}', platform: 'web' }))
    await userEvent.click(screen.getByRole('button', { name: 'download cloud save' }))
    await waitFor(() => expect(game.applyCloudSave).toHaveBeenCalledWith('{"saved":true}'))
  })

  it('deletes the account and its data after password confirmation', async () => {
    const backend = fakeBackend({ uid: 'u1', email: 'p@example.com' })
    renderInTheme(<CloudSaveSection enabled game={fakeGame()} loadBackend={async () => backend} />)
    await userEvent.click(await screen.findByRole('button', { name: 'delete account and data' }))
    await userEvent.type(screen.getByLabelText('confirm password to delete account'), 'hunter22')
    await userEvent.click(screen.getByRole('button', { name: 'Delete forever' }))
    expect(backend.deleteAccount).toHaveBeenCalledWith('hunter22')
    expect(await screen.findByText(/account and cloud save were deleted/)).toBeInTheDocument()
  })

  it('explains a failed delete without claiming success', async () => {
    const backend = fakeBackend({ uid: 'u1', email: 'p@example.com' })
    backend.deleteAccount.mockResolvedValue({ ok: false, step: 'reauthenticate', code: 'auth/invalid-credential' })
    renderInTheme(<CloudSaveSection enabled game={fakeGame()} loadBackend={async () => backend} />)
    await userEvent.click(await screen.findByRole('button', { name: 'delete account and data' }))
    await userEvent.click(screen.getByRole('button', { name: 'Delete forever' }))
    expect(await screen.findByText(/Password is incorrect — nothing was deleted/)).toBeInTheDocument()
  })
})
