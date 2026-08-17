import Button, { VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import { formatOfflineDuration } from 'game/engine'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

// Offline-progress notice auto-dismiss timing (UI chrome only — not a game/economy constant, so
// it lives here rather than in layers.js).
const OFFLINE_NOTICE_AUTO_DISMISS_MS = 10_000
const OFFLINE_NOTICE_FADE_MS = 400
const OFFLINE_NOTICE_PROGRESS_INTERVAL_MS = 100

// Centers the offline notice as a fixed overlay in the middle of the screen, above the page
// content, rather than an inline card pushed into the normal document flow. `pointer-events: none`
// on the overlay (re-enabled on the card itself, below) keeps the rest of the page clickable
// through the overlay's own padding/whitespace.
const OfflineNoticeOverlay = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: calc(1.5rem + env(safe-area-inset-top)) calc(1rem + env(safe-area-inset-right))
    calc(1.5rem + env(safe-area-inset-bottom)) calc(1rem + env(safe-area-inset-left));
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 900;
`

// Fades out (rather than disappearing abruptly) once the auto-dismiss countdown reaches zero.
// $fading drives the opacity transition, not a remount, so the fade is visible before the notice
// is actually removed from the DOM by dismissOfflineProgress.
const OfflineNoticeCard = styled(StatCard)`
  align-items: center;
  max-width: 26rem;
  opacity: ${props => (props.$fading ? 0 : 1)};
  pointer-events: auto;
  text-align: center;
  transition: opacity ${OFFLINE_NOTICE_FADE_MS}ms ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const NoticeText = styled.p`
  color: ${props => props.theme.color.textMuted};
  margin: 0;
`

// Shown on whichever page happens to be active when the player returns (MainPage or
// ByteFoundryPage) — offline progress is computed in useIncrementalGame regardless of which page
// the player lands on, so this notice needs to be page-agnostic too. `offlineProgress` is no
// longer strictly one-shot: besides the original mount-time check, useIncrementalGame's tick loop
// also catches up a real-world gap detected between two live ticks (the tab/app having been
// backgrounded or suspended without a remount) any time during the session, each producing a
// fresh `offlineProgress` object — so the countdown/fade timing below is (re)armed by an effect
// keyed on the `offlineProgress` reference itself, rather than computed once via a lazy
// initializer, so a later mid-session event restarts the countdown instead of inheriting the
// first one's already-elapsed (or already dismissed) timing.
const OfflineProgressNotice = ({ offlineProgress, dismissOfflineProgress }) => {
  const [offlineNoticeTiming, setOfflineNoticeTiming] = useState(null)
  const [offlineNoticeFading, setOfflineNoticeFading] = useState(false)
  const [offlineNoticeRemainingPercent, setOfflineNoticeRemainingPercent] = useState(100)

  useEffect(() => {
    if (!offlineProgress) return
    const now = Date.now()
    setOfflineNoticeTiming({ start: now, end: now + OFFLINE_NOTICE_AUTO_DISMISS_MS })
    setOfflineNoticeFading(false)
    setOfflineNoticeRemainingPercent(100)
  }, [offlineProgress])

  useEffect(() => {
    // Guarded on offlineProgress (not just offlineNoticeTiming) so this effect re-runs — and its
    // interval cleanup fires — the instant the notice is dismissed (manually or via the fade
    // below), rather than leaving a 100ms interval running forever in the background.
    if (!offlineProgress || !offlineNoticeTiming || offlineNoticeFading) return undefined
    const { start, end } = offlineNoticeTiming
    const total = end - start
    const tick = () => {
      const remaining = end - Date.now()
      if (remaining <= 0) {
        setOfflineNoticeRemainingPercent(0)
        setOfflineNoticeFading(true)
        return
      }
      setOfflineNoticeRemainingPercent(Math.round((remaining / total) * 100))
    }
    tick()
    const interval = setInterval(tick, OFFLINE_NOTICE_PROGRESS_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [offlineProgress, offlineNoticeTiming, offlineNoticeFading])

  useEffect(() => {
    if (!offlineNoticeFading) return undefined
    const timeout = setTimeout(dismissOfflineProgress, OFFLINE_NOTICE_FADE_MS)
    return () => clearTimeout(timeout)
  }, [offlineNoticeFading, dismissOfflineProgress])

  if (!offlineProgress) return null

  return (
    <OfflineNoticeOverlay>
      <OfflineNoticeCard aria-label="offline progress notice" $fading={offlineNoticeFading}>
        <NoticeText>
          Welcome back! You were away for {formatOfflineDuration(offlineProgress.elapsedRealSeconds)}
          {' — simulated '}{formatOfflineDuration(offlineProgress.effectiveSeconds)} of progress at 50% speed.
        </NoticeText>
        <Button
          aria-label="Dismiss offline progress notice"
          variant="neutral"
          onClick={dismissOfflineProgress}
          title="Dismiss this notice"
          type="button"
          $progress={offlineNoticeRemainingPercent}
          $progressColor="#525252"
        >
          Dismiss
          <VisuallyHidden
            role="progressbar"
            aria-label="Time until this notice auto-dismisses"
            aria-valuenow={offlineNoticeRemainingPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </Button>
      </OfflineNoticeCard>
    </OfflineNoticeOverlay>
  )
}

export default OfflineProgressNotice
