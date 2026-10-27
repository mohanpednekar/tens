import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

// Non-modal details popover anchored under a clicked speed figure. Portaled to <body> with fixed
// positioning so no tile's stacking/pointer-events rules clip it. Closes on any pointer press or
// scroll/wheel/touch-move outside itself, Escape, or a resize; the anchor's own click toggles it, so
// a press on the anchor is not treated as "outside" (a scroll gesture over it is).
const Panel = styled.div`
  position: fixed;
  z-index: 60;
  width: 17rem;
  max-width: calc(100vw - 16px);
  max-height: 60vh;
  overflow-y: auto;
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.color.surface};
  box-shadow: ${props => props.theme.shadow.sm};
  color: ${props => props.theme.color.text};
  font-size: ${props => props.theme.type.scale.sm.size};
  line-height: ${props => props.theme.type.scale.sm.lineHeight};
  text-align: left;

  &:focus {
    outline: none;
  }
`

const Heading = styled.h4`
  margin: 0 0 ${props => props.theme.space.xs};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.sm.size};
`

const Rows = styled.dl`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2px ${props => props.theme.space.sm};
  margin: 0;

  dt {
    color: ${props => props.theme.color.textMuted};
  }

  dd {
    margin: 0;
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }
`

const Note = styled.p`
  margin: ${props => props.theme.space.xs} 0 0;
  color: ${props => props.theme.color.textMuted};
`

const VIEWPORT_GUTTER = 8
const ANCHOR_GAP = 6

const SpeedDetailsPopover = ({ anchorRef, id, onClose, title, rows, note }) => {
  const panelRef = useRef(null)
  const [position, setPosition] = useState(null)

  // Re-measured every render (the page re-renders each tick), so the panel follows an anchor that
  // moves. Below the anchor by default; flips above it when that would overflow the viewport bottom,
  // else clamps inside the viewport.
  useLayoutEffect(() => {
    const rect = anchorRef.current?.getBoundingClientRect()
    if (!rect) return
    const height = panelRef.current?.offsetHeight ?? 0
    const maxTop = window.innerHeight - VIEWPORT_GUTTER - height
    const below = rect.bottom + ANCHOR_GAP
    const above = rect.top - ANCHOR_GAP - height
    const top = below <= maxTop || above < VIEWPORT_GUTTER
      ? Math.max(VIEWPORT_GUTTER, Math.min(below, maxTop))
      : above
    const right = Math.max(VIEWPORT_GUTTER, window.innerWidth - rect.right)
    setPosition(previous => (previous?.top === top && previous?.right === right ? previous : { top, right }))
  })

  // Non-modal, but focus moves into the panel so assistive tech reads it, and returns to the anchor
  // on close if it was still inside (a layout cleanup, so it runs before the panel leaves the DOM).
  useLayoutEffect(() => {
    const panel = panelRef.current
    const anchor = anchorRef.current
    panel?.focus({ preventScroll: true })
    return () => {
      if (panel?.contains(document.activeElement)) anchor?.focus({ preventScroll: true })
    }
  }, [anchorRef])

  useEffect(() => {
    const inPanel = target => panelRef.current?.contains(target)
    // A press on the anchor is left to the anchor's own toggle click.
    const closeOnPress = event => {
      if (!inPanel(event.target) && !anchorRef.current?.contains(event.target)) onClose()
    }
    // Any scroll gesture or scroll event outside the panel (a page scroll targets document).
    const closeOnScroll = event => {
      if (!inPanel(event.target)) onClose()
    }
    const closeOnEscape = event => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', closeOnPress, true)
    document.addEventListener('wheel', closeOnScroll, { capture: true, passive: true })
    document.addEventListener('touchmove', closeOnScroll, { capture: true, passive: true })
    document.addEventListener('scroll', closeOnScroll, true)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', onClose)
    return () => {
      document.removeEventListener('pointerdown', closeOnPress, true)
      document.removeEventListener('wheel', closeOnScroll, { capture: true })
      document.removeEventListener('touchmove', closeOnScroll, { capture: true })
      document.removeEventListener('scroll', closeOnScroll, true)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', onClose)
    }
  }, [anchorRef, onClose])

  return createPortal(
    <Panel
      ref={panelRef}
      id={id}
      role="dialog"
      aria-label={title}
      tabIndex={-1}
      // Unmeasured first frame: transparent rather than visibility:hidden, which can't take focus.
      style={position ?? { top: 0, right: VIEWPORT_GUTTER, opacity: 0 }}
      // React events bubble through portals to the anchor's ancestors (e.g. a tap tile) — keep
      // clicks inside the panel from reaching them.
      onClick={event => event.stopPropagation()}
    >
      <Heading>{title}</Heading>
      <Rows>
        {rows.map(({ label, value }) => (
          <div key={label} style={{ display: 'contents' }}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </Rows>
      {note && <Note>{note}</Note>}
    </Panel>,
    document.body,
  )
}

export default SpeedDetailsPopover
