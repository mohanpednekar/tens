import styled, { css, keyframes } from 'styled-components'
import { ATTENTION_HIGH } from 'game/navAttention'

// Bottom bar order follows play progression: Foundry → Boosters → Compute → Data, then Guide / More.
// Storage is folded into Foundry as a Memory | Disks second-level tab (same Memory pool +
// DiskArrayRow). Data stays progress-gated; Guide/More stay available during the Foundry gate.
// Accessible names: open byte foundry / open boosters / open compute / open data / open guide / open more menu.
// Attention: 'high' = larger pulsing dot; 'normal' = smaller cue (game/navAttention.js).

const NAV_HEIGHT = '3.25rem'

const pulseHigh = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.85; }
`

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
  position: relative;
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

const AttentionDot = styled.span`
  background: ${props => props.theme.color.good};
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.22rem;
  top: 0.18rem;

  ${props => props.$emphasis === ATTENTION_HIGH ? css`
    box-shadow: 0 0 0 2px ${props.theme.color.surfaceRaised};
    height: 0.7rem;
    width: 0.7rem;
    animation: ${pulseHigh} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  ` : css`
    height: 0.4rem;
    width: 0.4rem;
  `}
`

const AppNav = ({
  currentPage,
  onNavigate,
  onOpenMore,
  showTiers = true,
  showBoosters = false,
  showComputeFlops = false,
  moreOpen = false,
  attention = {},
}) => {
  // Progression order: Foundry family → Boosters → Compute (Flops) → Data → utilities.
  const items = [
    { id: 'foundry', ariaLabel: 'open byte foundry', icon: '⚙️', label: 'Foundry', title: 'Byte Foundry — Memory and Disks' },
    showBoosters && { id: 'boosters', ariaLabel: 'open boosters', icon: '⚡', label: 'Boosters', title: 'Boosters — Cores, merge chain, Compute Boost' },
    showComputeFlops && { id: 'compute', ariaLabel: 'open compute', icon: '🖥', label: 'Compute', title: 'Compute — PP Flops tiers boost Data production' },
    showTiers && { id: 'game', ariaLabel: 'open data', icon: '📶', label: 'Data', title: 'Data — buy and produce tiers' },
    { id: 'info', ariaLabel: 'open guide', icon: 'ℹ️', label: 'Guide', title: 'How this game works' },
  ].filter(Boolean)

  const utilityActive = currentPage === 'milestones' || currentPage === 'settings' || moreOpen

  return (
    <Bar aria-label="main navigation">
      {items.map(item => {
        const active = currentPage === item.id
        const level = attention[item.id] || false
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
            {level && (
              <AttentionDot
                $emphasis={level}
                aria-label={level === ATTENTION_HIGH ? 'important action available' : 'action available'}
              />
            )}
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
        title="Milestones, Settings"
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
