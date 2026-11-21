import { act, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'theme'
import AchievementToasts from 'components/AchievementToasts'

const mk = ids => ({ achievements: { earned: Object.fromEntries(ids.map(id => [id, true])), counters: {} } })
const ui = (state, baseline = {}) => (
  <ThemeProvider mode="dark"><AchievementToasts baselineEarned={baseline} state={state} /></ThemeProvider>
)

describe('AchievementToasts', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('staggers simultaneous toasts 250 ms apart and shows each for 5 s', () => {
    const { rerender, unmount } = render(ui(mk([])))
    rerender(ui(mk(['helloWorld', 'itCompiles'])))
    expect(screen.queryAllByRole('status')).toHaveLength(0)
    act(() => { vi.advanceTimersByTime(1) })
    expect(screen.getAllByRole('status')).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(250) })
    expect(screen.getAllByRole('status')).toHaveLength(2)
    act(() => { vi.advanceTimersByTime(4800) })
    expect(screen.getAllByRole('status')).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(300) })
    expect(screen.queryAllByRole('status')).toHaveLength(0)
    unmount()
  })

  it('announces achievements earned offline versus the pre-catch-up baseline', () => {
    const { unmount } = render(ui(mk(['helloWorld']), {}))
    act(() => { vi.advanceTimersByTime(1) })
    expect(screen.getAllByRole('status')).toHaveLength(1)
    unmount()
  })

  it('rebaselines silently when the earned set shrinks', () => {
    const { rerender, unmount } = render(ui(mk(['helloWorld']), { helloWorld: true }))
    rerender(ui(mk([])))
    rerender(ui(mk(['itCompiles'])))
    act(() => { vi.advanceTimersByTime(1) })
    expect(screen.getAllByRole('status')).toHaveLength(1)
    unmount()
  })
})
