import { ACHIEVEMENT_BY_ID, ACHIEVEMENTS_FEATURE } from 'game/layers'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

// UI chrome timings (not economy constants): each toast is visible 5 s; consecutive toasts start 0.25 s apart.
export const ACHIEVEMENT_TOAST_VISIBLE_MS = 5000
export const ACHIEVEMENT_TOAST_STAGGER_MS = 250
// Cap on simultaneously shown toasts (fits a short phone viewport); the rest wait pending until a slot frees.
export const ACHIEVEMENT_TOAST_MAX_VISIBLE = 5

const Stack = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  left: 0;
  padding: calc(0.75rem + env(safe-area-inset-top)) 1rem 0;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1010;
`

const Toast = styled.div`
  background: ${props => props.theme.color.surfaceRaised};
  border: 1px solid ${props => props.theme.color.warn};
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadow.md};
  color: ${props => props.theme.color.text};
  max-width: 26rem;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.lg};
  text-align: center;
  width: 100%;
`

const ToastTitle = styled.div`
  color: ${props => props.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const getEarnedIds = state => Object.keys(state.achievements?.earned ?? {}).filter(id => state.achievements.earned[id])

const isTabHidden = () => typeof document !== 'undefined' && document.visibilityState === 'hidden'

// Plain scheduler (no React): a pending queue feeds the visible list. A toast starts when (a) the tab is
// visible, (b) fewer than MAX_VISIBLE are shown and (c) >= STAGGER ms passed since the previous start; its 5 s
// lifetime begins only when it starts. unmount() cancels every timer; mount() re-arms hide timers of toasts
// still showing, so StrictMode's simulated unmount/remount loses nothing.
const createScheduler = onChange => {
  let queue = []
  let visible = []
  let lastStartAt = 0
  let seq = 0
  let pumpTimer = null
  let mounted = false
  const timers = new Set()

  const publish = () => onChange(visible)
  const armHide = entry => {
    const t = setTimeout(() => {
      timers.delete(t)
      visible = visible.filter(e => e.key !== entry.key)
      publish()
      pump()
    }, Math.max(0, entry.hideAt - Date.now()))
    timers.add(t)
  }
  function pump() {
    if (!mounted) return
    clearTimeout(pumpTimer)
    pumpTimer = null
    if (queue.length === 0 || isTabHidden() || visible.length >= ACHIEVEMENT_TOAST_MAX_VISIBLE) return
    const wait = lastStartAt + ACHIEVEMENT_TOAST_STAGGER_MS - Date.now()
    if (wait > 0) {
      pumpTimer = setTimeout(pump, wait)
      return
    }
    const id = queue.shift()
    const now = Date.now()
    seq += 1
    const entry = { key: `${id}-${seq}`, id, hideAt: now + ACHIEVEMENT_TOAST_VISIBLE_MS }
    visible = [...visible, entry]
    lastStartAt = now
    publish()
    armHide(entry)
    pump()
  }
  const onVisibility = () => { if (!isTabHidden()) pump() }

  return {
    mount() {
      mounted = true
      visible.forEach(armHide)
      document.addEventListener('visibilitychange', onVisibility)
      pump()
    },
    unmount() {
      mounted = false
      timers.forEach(clearTimeout)
      timers.clear()
      clearTimeout(pumpTimer)
      pumpTimer = null
      document.removeEventListener('visibilitychange', onVisibility)
    },
    enqueue(ids) {
      queue.push(...ids)
      pump()
    },
    clearQueue() {
      queue = []
    },
  }
}

// Toasts every newly earned achievement. `baseline` = { epoch, earned }: the earned map of the loaded save
// BEFORE its offline catch-up, so away-time unlocks are announced; a new `epoch` (slot switch, import,
// reset, Dev Mode) rebaselines explicitly and drops still-queued toasts of the older save.
function AchievementToasts({ state, baseline }) {
  const [visible, setVisible] = useState([])
  const seen = useRef(null)
  const seenEpoch = useRef(null)
  const scheduler = useRef(null)
  if (scheduler.current === null) scheduler.current = createScheduler(setVisible)

  useEffect(() => {
    scheduler.current.mount()
    return () => scheduler.current.unmount()
  }, [])

  const earnedIds = ACHIEVEMENTS_FEATURE.enabled ? getEarnedIds(state) : []
  const earnedKey = earnedIds.join(',')

  useEffect(() => {
    const current = new Set(earnedIds)
    if (seen.current === null || seenEpoch.current !== baseline.epoch) {
      if (seen.current !== null) scheduler.current.clearQueue()
      seenEpoch.current = baseline.epoch
      seen.current = new Set(Object.keys(baseline.earned ?? {}).filter(id => baseline.earned[id]))
    }
    const fresh = earnedIds.filter(id => !seen.current.has(id) && ACHIEVEMENT_BY_ID[id])
    seen.current = current
    scheduler.current.enqueue(fresh)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earnedKey, baseline.epoch])

  // One persistent live region (announces reliably); toasts are appended inside it, announced one by one.
  return (
    <Stack aria-atomic="false" aria-label="achievement notifications" aria-live="polite" aria-relevant="additions" role="status">
      {visible.map(({ key, id }) => (
        <Toast key={key}>
          <ToastTitle>Achievement unlocked</ToastTitle>
          {ACHIEVEMENT_BY_ID[id].name}
        </Toast>
      ))}
    </Stack>
  )
}

export default AchievementToasts
