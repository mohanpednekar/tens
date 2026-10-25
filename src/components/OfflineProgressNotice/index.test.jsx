import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import { ThemeProvider } from 'theme'

const summary = { elapsedRealSeconds: 2 * 3600, effectiveSeconds: 3600 }
const WATCH = 'Watch a video to simulate your time away at 100% speed'

const renderNotice = props => render(
  <ThemeProvider mode="dark">
    <OfflineProgressNotice dismissOfflineProgress={() => {}} offlineProgress={summary} {...props} />
  </ThemeProvider>,
)

const adsService = showRewarded => ({ adsAvailable: true, showRewarded: vi.fn(showRewarded) })

describe('OfflineProgressNotice rewarded bonus', () => {
  it('offers no video when ads are off (default no-op service)', () => {
    renderNotice({ claimOfflineAdReward: vi.fn() })
    expect(screen.queryByRole('button', { name: WATCH })).toBeNull()
  })

  it('claims the 100% speed bonus for the summary shown once the video rewards', async () => {
    const claim = vi.fn()
    const monetization = adsService(async () => ({ shown: true, rewarded: true }))
    renderNotice({ claimOfflineAdReward: claim, monetization })
    await userEvent.click(screen.getByRole('button', { name: WATCH }))
    expect(monetization.showRewarded).toHaveBeenCalledWith('offline_full_speed')
    await waitFor(() => expect(claim).toHaveBeenCalledWith(summary))
  })

  it('grants nothing when the video is closed early', async () => {
    const claim = vi.fn()
    renderNotice({ claimOfflineAdReward: claim, monetization: adsService(async () => ({ shown: true, rewarded: false })) })
    await userEvent.click(screen.getByRole('button', { name: WATCH }))
    await waitFor(() => expect(screen.getByRole('button', { name: WATCH })).toBeEnabled())
    expect(claim).not.toHaveBeenCalled()
  })

  it('hides the offer once claimed or when the absence already ran at full speed', () => {
    const monetization = adsService(async () => ({ rewarded: true }))
    const { unmount } = renderNotice({
      claimOfflineAdReward: vi.fn(),
      monetization,
      offlineProgress: { ...summary, effectiveSeconds: 7200, rewardClaimed: true },
    })
    expect(screen.queryByRole('button', { name: WATCH })).toBeNull()
    expect(screen.getByText(/100% speed \(video bonus\)/)).toBeInTheDocument()
    unmount()
    renderNotice({ claimOfflineAdReward: vi.fn(), monetization, offlineProgress: { elapsedRealSeconds: 300, effectiveSeconds: 300 } })
    expect(screen.queryByRole('button', { name: WATCH })).toBeNull()
  })
})
