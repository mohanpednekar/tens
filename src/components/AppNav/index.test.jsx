import { render, screen, act } from '@testing-library/react'
import { ThemeProvider } from 'theme'
import AppNav from 'components/AppNav'

const props = { currentPage: 'game', onNavigate: () => {}, onOpenMore: () => {}, showBoosters: true, showComputeFlops: true, showPerks: true, showChallenges: true }
const setWidth = w => { window.innerWidth = w }
const renderNav = p => render(<ThemeProvider mode="dark"><AppNav {...props} {...p} /></ThemeProvider>)

describe('AppNav narrow width', () => {
  const original = window.innerWidth
  afterEach(() => setWidth(original))

  test('7 items at 360px: only the active label shows; aria-labels and titles stay', () => {
    setWidth(360)
    renderNav()
    expect(screen.getByText('Factory')).toBeTruthy()
    expect(screen.queryByText('Foundry')).toBeNull()
    expect(screen.queryByText('More')).toBeNull()
    const foundry = screen.getByRole('button', { name: 'open byte foundry' })
    expect(foundry.getAttribute('title')).toBeTruthy()
  })

  test('7 items at 430px keep all labels', () => {
    setWidth(430)
    renderNav()
    expect(screen.getByText('Foundry')).toBeTruthy()
    expect(screen.getByText('More')).toBeTruthy()
  })

  test('fewer items at 360px keep all labels', () => {
    setWidth(360)
    renderNav({ showChallenges: false })
    expect(screen.getByText('Foundry')).toBeTruthy()
  })

  test('reacts to resize', () => {
    setWidth(430)
    renderNav()
    act(() => { setWidth(360); window.dispatchEvent(new Event('resize')) })
    expect(screen.queryByText('Foundry')).toBeNull()
  })
})
