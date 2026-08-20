import styled from 'styled-components'

// Persistent top-level page switcher. Primary destinations (Tiers / Foundry / Storage / Compute)
// sit alongside always-available Guide + More. More opens AppMenu (Guide / Milestones / Reset /
// Settings) so utilities never require unlocking Tiers or any other progress gate — including
// during the mandatory Byte Foundry gate (Tiers stays hidden then; Guide/More stay).
// Accessible names stay stable for tests: open tiers / open byte foundry / open storage /
// open compute / open guide / open more menu.

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
  onOpenMore,
  showTiers = true,
  showStorage = false,
  showCompute = false,
  moreOpen = false,
}) => {
  const items = [
    showTiers && { id: 'game', ariaLabel: 'open tiers', icon: '📶', label: 'Tiers', title: 'Tier ladder — buy and produce' },
    { id: 'foundry', ariaLabel: 'open byte foundry', icon: '⚙️', label: 'Foundry', title: 'Byte Foundry' },
    showStorage && { id: 'storage', ariaLabel: 'open storage', icon: '🏦', label: 'Storage', title: 'Storage' },
    showCompute && { id: 'compute', ariaLabel: 'open compute', icon: '⚡', label: 'Compute', title: 'Compute' },
    { id: 'info', ariaLabel: 'open guide', icon: 'ℹ️', label: 'Guide', title: 'How this game works' },
  ].filter(Boolean)

  const utilityActive = currentPage === 'milestones' || currentPage === 'settings' || moreOpen

  return (
    <Bar aria-label="main navigation">
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
      <NavItem
        aria-expanded={moreOpen}
        aria-haspopup="dialog"
        aria-label="open more menu"
        $active={utilityActive}
        onClick={onOpenMore}
        title="Guide, Milestones, Settings, Reset"
        type="button"
      >
        <Icon aria-hidden="true">⋯</Icon>
        <Label>More</Label>
      </NavItem>
    </Bar>
  )
}

export const APP_NAV_BOTTOM_PAD = `calc(${NAV_HEIGHT} + env(safe-area-inset-bottom))`

export default AppNav
