import Button from 'components/Button'
import StatCard from 'components/StatCard'
import { useEffect, useId, useRef } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.82);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: calc(1.5rem + env(safe-area-inset-top)) calc(1rem + env(safe-area-inset-right))
    calc(1.5rem + env(safe-area-inset-bottom)) calc(1rem + env(safe-area-inset-left));
  position: fixed;
  right: 0;
  top: 0;
  z-index: 960;
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

const Body = styled.p`
  color: ${props => props.theme.color.textMuted};
  margin: 0;
  text-align: left;
`

/** Blocking notice after an older save was cleared on load — single acknowledge action only. */
const IncompatibleSaveNotice = ({ onDismiss }) => {
  const confirmRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    confirmRef.current?.focus()
  }, [])

  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby={titleId} aria-label="Save incompatible">
      <Card $raised>
        <Title id={titleId}>Save not compatible</Title>
        <Body>
          This save was written by an older version of Tens and can no longer be loaded. It has been
          cleared so you can start fresh from the Byte Foundry.
        </Body>
        <Button
          ref={confirmRef}
          type="button"
          variant="prestige"
          aria-label="Start fresh with a new save"
          onClick={onDismiss}
        >
          Start fresh
        </Button>
      </Card>
    </Overlay>
  )
}

export default IncompatibleSaveNotice
