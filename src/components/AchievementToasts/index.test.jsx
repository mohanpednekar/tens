import { act, render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import { ThemeProvider } from 'theme'
import AchievementToasts from 'components/AchievementToasts'

const mk = ids => ({ achievements: { earned: Object.fromEntries(ids.map(id => [id, true])), counters: {} } })
const ui = (state, baseline = { epoch: 0, earned: {} }) => (
  <ThemeProvider mode="dark"><AchievementToasts baseline={baseline} state={state} /></ThemeProvider>
)
const toasts = () => screen.queryAllByText('Achievement unlocked')

describe('AchievementToasts', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('staggers simultaneous toasts 250 ms apart and shows each for 5 s', () => {
    const { rerender, unmount } = render(ui(mk([])))
    rerender(ui(mk(['helloWorld', 'itCompiles'])))
    expect(toasts()).toHaveLength(0)
    act(() => { vi.advanceTimersByTime(1) })
    expect(toasts()).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(250) })
    expect(toasts()).toHaveLength(2)
    act(() => { vi.advanceTimersByTime(4800) })
    expect(toasts()).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(300) })
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

  it('still shows offline toasts under StrictMode', () => {
    const { unmount } = render(<StrictMode>{ui(mk(['helloWorld']))}</StrictMode>)
    act(() => { vi.advanceTimersByTime(1) })
    expect(toasts()).toHaveLength(1)
    unmount()
  })
})
