import styled from 'styled-components'

// Persistent top-level page switcher — one chrome for Tiers / Foundry / Storage / Compute / Guide
// so players don't have to discover nested Back buttons or page-local open-* links. Rendered by
// App.jsx only once intro.mainGameUnlocked (the mandatory Byte Foundry gate has no escape hatch).
// Storage/Compute items appear only after each mechanic's own reveal predicate flips true.
// The MainPage destination is labeled "Tiers" (not "Game") so it doesn't collide with MainPage's
// own Game/Upgrades/Milestones view tabs, and so it reads as a place name like the other items.
// Accessible names (`open tiers`, `open byte foundry`, `open guide`, `open storage`,
// `open compute`) are stable for tests and assistive tech; visible labels stay short for the bar.

const NAV_HEIGHT = '3.25rem'

const Bar = styled.nav`
  background: ${props => props.theme.color.surfaceRaised};
  border-top: 1px solid ${props => props.theme.color.border};
  bottom: 0;
  display: flex;
  gap: 0.15rem;
  justify-content: space-around;
  left: 0;
  padding: 0.35rem 0.4rem calc(0.35rem + env(safe-area-inset-bottom));
  position: fixed;
  right: 0;
  z-index: 40;
`

const NavItem = styled.button`
  align-items: center;
  background: ${props => (props.$active ? props.theme.color.surfaceSunken : 'transparent')};
  border: 1px solid ${props => (props.$active ? props.theme.color.borderStrong : 'transparent')};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => (props.$active ? props.theme.color.accent : props.theme.color.textMuted)};
  cursor: pointer;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  font-family: ${props => props.theme.font.body};
  font-size: 0.65rem;
  font-weight: ${props => (props.$active ? 600 : 500)};
  gap: 0.15rem;
  justify-content: center;
  letter-spacing: 0.01em;
  max-width: 5.5rem;
  min-width: 0;
  padding: 0.35rem 0.25rem;
  transition:
    color ${props => props.theme.motion.duration.base} ${props => props.theme.motion.easing.standard},
    background ${props => props.theme.motion.duration.base} ${props => props.theme.motion.easing.standard},
    border-color ${props => props.theme.motion.duration.base} ${props => props.theme.motion.easing.standard};

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Icon = styled.span`
  font-size: 1.05rem;
  line-height: 1;
`

const Label = styled.span`
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`

const AppNav = ({
  currentPage,
  onNavigate,
  showTiers = true,
  showStorage = false,
  showCompute = false,
  showGuide = true,
}) => {
  const items = [
    showTiers && { id: 'game', ariaLabel: 'open tiers', icon: '📶', label: 'Tiers', title: 'Tier ladder — buy and produce' },
    { id: 'foundry', ariaLabel: 'open byte foundry', icon: '⚙️', label: 'Foundry', title: 'Byte Foundry' },
    showStorage && { id: 'storage', ariaLabel: 'open storage', icon: '🏦', label: 'Storage', title: 'Storage' },
    showCompute && { id: 'compute', ariaLabel: 'open compute', icon: '⚡', label: 'Compute', title: 'Compute' },
    showGuide && { id: 'info', ariaLabel: 'open guide', icon: 'ℹ️', label: 'Guide', title: 'How this game works' },
  ].filter(Boolean)

  return (
    <Bar aria-label="main navigation" style={{ '--app-nav-height': NAV_HEIGHT }}>
      {items.map(item => {
        const active = currentPage === item.id
        return (
          <NavItem
            key={item.id}
            aria-current={active ? 'page' : undefined}
            aria-label={item.ariaLabel}
            $active={active}
            onClick={() => onNavigate(item.id)}
            title={item.title}
            type="button"
          >
            <Icon aria-hidden="true">{item.icon}</Icon>
            <Label>{item.label}</Label>
          </NavItem>
        )
      })}
    </Bar>
  )
}

// Exported so page roots can reserve the same bottom clearance the fixed bar occupies
// (bar content + safe-area inset), without hardcoding a second magic number.
export const APP_NAV_BOTTOM_PAD = `calc(${NAV_HEIGHT} + env(safe-area-inset-bottom))`

export default AppNav
