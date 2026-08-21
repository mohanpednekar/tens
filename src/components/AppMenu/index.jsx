import styled from 'styled-components'

// Overflow sheet for always-available utilities (Milestones, Settings) — reachable from every
// screen, including the mandatory Byte Foundry gate, without requiring any progress. Guide stays
// on AppNav itself; this sheet holds everything else that shouldn't consume a nav slot. Reset
// lives only under Settings → Danger zone (not duplicated here). Opened from AppNav's More item;
// closes on backdrop click, Escape, or any action.

const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 50;
`

const Sheet = styled.div`
  background: ${props => props.theme.color.surfaceRaised};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.lg} ${props => props.theme.radius.lg} 0 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  left: 50%;
  max-width: 420px;
  padding: ${props => props.theme.space.lg} ${props => props.theme.space.md}
    calc(${props => props.theme.space.lg} + env(safe-area-inset-bottom));
  position: fixed;
  transform: translateX(-50%);
  width: min(100%, 420px);
  z-index: 51;
`

const SheetTitle = styled.h2`
  color: ${props => props.theme.color.textMuted};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.sm.size};
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 ${props => props.theme.space.xs};
  text-transform: uppercase;
`

const MenuButton = styled.button`
  align-items: center;
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  cursor: pointer;
  display: flex;
  font-family: ${props => props.theme.font.body};
  font-size: 0.95rem;
  font-weight: 500;
  gap: 0.65rem;
  justify-content: flex-start;
  padding: 0.75rem 0.9rem;
  text-align: left;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

const Icon = styled.span`
  font-size: 1.1rem;
  line-height: 1;
  width: 1.4rem;
`

const AppMenu = ({ open, onClose, onNavigate }) => {
  if (!open) return null

  const go = pageId => {
    onNavigate(pageId)
    onClose()
  }

  return (
    <Backdrop
      aria-hidden="false"
      onClick={onClose}
      onKeyDown={event => {
        if (event.key === 'Escape') onClose()
      }}
      role="presentation"
    >
      <Sheet
        aria-label="more menu"
        aria-modal="true"
        onClick={event => event.stopPropagation()}
        role="dialog"
      >
        <SheetTitle>More</SheetTitle>
        <MenuButton aria-label="open milestones" onClick={() => go('milestones')} type="button">
          <Icon aria-hidden="true">🏁</Icon>
          Milestones
        </MenuButton>
        <MenuButton aria-label="open settings" onClick={() => go('settings')} type="button">
          <Icon aria-hidden="true">🎚️</Icon>
          Settings
        </MenuButton>
      </Sheet>
    </Backdrop>
  )
}

export default AppMenu
