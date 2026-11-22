import { act, render, screen, within } from '@testing-library/react'
import { StrictMode } from 'react'
import { ThemeProvider } from 'theme'
import AchievementToasts from 'components/AchievementToasts'

const mk = ids => ({ achievements: { earned: Object.fromEntries(ids.map(id => [id, true])), counters: {} } })
const ui = (state, baseline = { epoch: 0, earned: {} }) => (
  <ThemeProvider mode="dark"><AchievementToasts baseline={baseline} state={state} /></ThemeProvider>
)
const toasts = () => within(screen.getByRole('status', { name: 'achievement notifications' })).queryAllByText('Achievement unlocked')

describe('AchievementToasts', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('staggers simultaneous toasts 250 ms apart and shows each for 5 s', () => {
    const { rerender, unmount } = render(ui(mk([])))
    rerender(ui(mk(['helloWorld', 'itCompiles'])))
    expect(toasts()).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(249) })
    expect(toasts()).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(1) })
    expect(toasts()).toHaveLength(2)
    act(() => { vi.advanceTimersByTime(4750) })
    expect(toasts()).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(250) })
    expect(toasts()).toHaveLength(0)
    unmount()
  })

  it('announces achievements earned offline versus the pre-catch-up baseline', () => {
    const { unmount } = render(ui(mk(['helloWorld'])))
    act(() => { vi.advanceTimersByTime(1) })
    expect(toasts()).toHaveLength(1)
    unmount()
  })

  it('does not toast the baseline itself', () => {
    const { unmount } = render(ui(mk(['helloWorld']), { epoch: 0, earned: { helloWorld: true } }))
    act(() => { vi.advanceTimersByTime(10) })
    expect(toasts()).toHaveLength(0)
    unmount()
  })

  it('a new epoch rebaselines: switching back to a larger slot does not replay old toasts', () => {
    const old = { helloWorld: true, itCompiles: true }
    const { rerender, unmount } = render(ui(mk(['helloWorld', 'itCompiles']), { epoch: 0, earned: old }))
    rerender(ui(mk([]), { epoch: 1, earned: {} }))
    rerender(ui(mk(['helloWorld', 'itCompiles']), { epoch: 2, earned: old }))
    act(() => { vi.advanceTimersByTime(10) })
    expect(toasts()).toHaveLength(0)
    unmount()
  })

  it('announces unlocks from a switched slot\'s own catch-up', () => {
    const { rerender, unmount } = render(ui(mk([]), { epoch: 0, earned: {} }))
    rerender(ui(mk(['helloWorld']), { epoch: 1, earned: {} }))
    act(() => { vi.advanceTimersByTime(1) })
    expect(toasts()).toHaveLength(1)
    unmount()
  })

  it('drops queued toasts when the epoch moves on', () => {
    const { rerender, unmount } = render(ui(mk([]), { epoch: 0, earned: {} }))
    rerender(ui(mk(['helloWorld', 'itCompiles']), { epoch: 0, earned: {} }))
    rerender(ui(mk([]), { epoch: 1, earned: {} }))
    act(() => { vi.advanceTimersByTime(1000) })
    expect(toasts()).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(5000) })
    expect(toasts()).toHaveLength(0)
    unmount()
  })

  it('shows the reward only for achievements that have one', () => {
    const { rerender, unmount } = render(ui(mk([])))
    rerender(ui(mk(['helloWorld', 'levelPower1'])))
    act(() => { vi.advanceTimersByTime(300) })
    const text = screen.getByRole('status', { name: 'achievement notifications' }).textContent
    expect(text).toContain('+0.05 per-level multiplier')
    expect(text).not.toContain('⭐')
    unmount()
  })

  it('shows no reward line for an achievement without a bonus', () => {
    const { rerender, unmount } = render(ui(mk([])))
    rerender(ui(mk(['helloWorld'])))
    act(() => { vi.advanceTimersByTime(300) })
    expect(screen.getByRole('status', { name: 'achievement notifications' }).textContent).toBe('Achievement unlockedHello, World')
    unmount()
  })

  it('still shows offline toasts under StrictMode', () => {
    const { unmount } = render(<StrictMode>{ui(mk(['helloWorld']))}</StrictMode>)
    act(() => { vi.advanceTimersByTime(1) })
    expect(toasts()).toHaveLength(1)
    unmount()
  })

  it('caps simultaneous toasts and still delivers every overflow toast', () => {
    const ids = ['helloWorld', 'itCompiles', 'pingOfDeath', 'kibiNotKilo', 'tier01Bought', 'tier02Bought', 'tier03Bought']
    const { rerender, unmount } = render(ui(mk([])))
    rerender(ui(mk(ids)))
    const shown = new Set()
    let maxAtOnce = 0
    for (let t = 0; t < 12000; t += 250) {
      const region = screen.getByRole('status', { name: 'achievement notifications' })
      maxAtOnce = Math.max(maxAtOnce, toasts().length)
      Array.from(region.children).forEach(el => shown.add(el.textContent))
      act(() => { vi.advanceTimersByTime(250) })
    }
    expect(maxAtOnce).toBe(5)
    expect(shown.size).toBe(7)
    expect(toasts()).toHaveLength(0)
    unmount()
  })

  it('holds toasts while the tab is hidden and shows them on return', () => {
    const spy = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden')
    const { rerender, unmount } = render(ui(mk([])))
    rerender(ui(mk(['helloWorld'])))
    act(() => { vi.advanceTimersByTime(20000) })
    expect(toasts()).toHaveLength(0)
    spy.mockReturnValue('visible')
    act(() => { document.dispatchEvent(new Event('visibilitychange')) })
    expect(toasts()).toHaveLength(1)
    spy.mockRestore()
    unmount()
  })

  it('cancels every timer on unmount', () => {
    const { rerender, unmount } = render(ui(mk([])))
    rerender(ui(mk(['helloWorld', 'itCompiles'])))
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
