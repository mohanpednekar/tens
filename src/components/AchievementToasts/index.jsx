import { ACHIEVEMENT_BY_ID, ACHIEVEMENTS_FEATURE } from 'game/layers'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

// UI chrome timings (not economy constants): each toast is visible 5 s; consecutive toasts start 0.25 s apart.
export const ACHIEVEMENT_TOAST_VISIBLE_MS = 5000
export const ACHIEVEMENT_TOAST_STAGGER_MS = 250

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
  z-index: 950;
`

const Toast = styled.div`
  background: ${props => props.theme.color.surfaceRaised};
  border: 1px solid ${props => props.theme.color.warn};
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadow.md};
  color: ${props => props.theme.color.text};
  max-width: 26rem;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.lg};
  width: 100%;
`

const ToastTitle = styled.div`
  color: ${props => props.theme.color.warn};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const getEarnedIds = state => Object.keys(state.achievements?.earned ?? {}).filter(id => state.achievements.earned[id])

// Toasts every newly earned achievement. `baselineEarned` is the earned map from the save BEFORE
// mount-time offline catch-up, so achievements earned while away are announced too. If the earned set
// shrinks (slot switch / cloud load / reset) it silently rebaselines instead of toasting.
function AchievementToasts({ state, baselineEarned }) {
  const [visible, setVisible] = useState([])
  const seen = useRef(null)
  const nextSlotAt = useRef(0)
  const timers = useRef(new Set())

  useEffect(() => () => {
    timers.current.forEach(clearTimeout)
    timers.current.clear()
  }, [])

  const earnedIds = ACHIEVEMENTS_FEATURE.enabled ? getEarnedIds(state) : []
  const earnedKey = earnedIds.join(',')

  useEffect(() => {
    const current = new Set(earnedIds)
    if (seen.current === null) {
      seen.current = new Set(Object.keys(baselineEarned ?? {}).filter(id => baselineEarned[id]))
    }
    for (const id of seen.current) {
      if (!current.has(id)) {
        seen.current = current
        return
      }
    }
    const fresh = earnedIds.filter(id => !seen.current.has(id) && ACHIEVEMENT_BY_ID[id])
    seen.current = current
    const schedule = (fn, ms) => {
      const t = setTimeout(() => {
        timers.current.delete(t)
        fn()
      }, ms)
      timers.current.add(t)
    }
    for (const id of fresh) {
      const now = Date.now()
      const startAt = Math.max(now, nextSlotAt.current)
      nextSlotAt.current = startAt + ACHIEVEMENT_TOAST_STAGGER_MS
      const key = `${id}-${startAt}`
      schedule(() => {
        setVisible(list => [...list, { key, id }])
        schedule(() => setVisible(list => list.filter(t => t.key !== key)), ACHIEVEMENT_TOAST_VISIBLE_MS)
      }, startAt - now)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earnedKey])

  if (visible.length === 0) return null
  return (
    <Stack aria-label="achievement notifications">
      {visible.map(({ key, id }) => (
        <Toast aria-live="polite" key={key} role="status">
          <ToastTitle>Achievement unlocked</ToastTitle>
          {ACHIEVEMENT_BY_ID[id].name}
        </Toast>
      ))}
    </Stack>
  )
}

export default AchievementToasts
