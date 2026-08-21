import Button from 'components/Button'
import StatCard from 'components/StatCard'
import { useEffect, useId, useRef } from 'react'
import styled from 'styled-components'

// Modal overlay matching OfflineProgressNotice / Prestige FullScreenOverlay — in-game chrome,
// not a native window.confirm. Dims and blocks the page until the player confirms or cancels.
const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.72);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: calc(1.5rem + env(safe-area-inset-top)) calc(1rem + env(safe-area-inset-right))
    calc(1.5rem + env(safe-area-inset-bottom)) calc(1rem + env(safe-area-inset-left));
  position: fixed;
  right: 0;
  top: 0;
  z-index: 950;
`

const Card = styled(StatCard)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.md};
  max-width: 26rem;
  text-align: center;
  width: 100%;
`

const Title = styled.h2`
  color: ${props => props.theme.color.text};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.lg.size};
  margin: 0;
`

const Body = styled.div`
  color: ${props => props.theme.color.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  margin: 0;
  text-align: left;

  p {
    margin: 0;
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.sm};
  justify-content: center;
  width: 100%;

  > button {
    flex: 1 1 8rem;
    min-width: 0;
  }
`

/**
 * In-game confirm dialog (theme StatCard + Buttons). Replaces native `window.confirm` for
 * irreversible Foundry actions so the prompt matches the rest of the UI.
 */
const ConfirmDialog = ({
  open,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'prestige',
  onConfirm,
  onCancel,
  ariaLabel,
}) => {
  const cancelRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined
    cancelRef.current?.focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCancel()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={ariaLabel ?? title}
      onClick={event => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <Card $raised>
        <Title id={titleId}>{title}</Title>
        <Body>{children}</Body>
        <Actions>
          <Button
            ref={cancelRef}
            type="button"
            variant="neutral"
            aria-label={cancelLabel}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            aria-label={confirmLabel}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Actions>
      </Card>
    </Overlay>
  )
}

export default ConfirmDialog
