import styled from 'styled-components'

const ToggleButton = styled.button`
  background: ${props => props.theme.color.surfaceRaised};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  cursor: pointer;
  font-size: ${props => props.theme.type.scale.sm.size};
  line-height: 1;
  padding: 0.4rem 0.55rem;
  position: fixed;
  right: calc(0.75rem + env(safe-area-inset-right));
  top: calc(0.75rem + env(safe-area-inset-top));
  z-index: 45;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ThemeToggle = ({ mode, onToggle }) => {
  const label = mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  return (
    <ToggleButton aria-label={label} onClick={onToggle} title={label} type="button">
      {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </ToggleButton>
  )
}

export default ThemeToggle
