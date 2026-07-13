import styled, { css, keyframes } from 'styled-components'

// Fixed r,g,b triples for the small, closed set of semantic colors this app's buttons ever
// use — avoids parsing arbitrary CSS color keywords in JS just to build a glow rgba().
const GLOW_RGB = {
  white: '255, 255, 255',
  '#4ade80': '74, 222, 128',
  '#fbbf24': '251, 191, 36',
}

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`

const clampPercent = value => Math.min(100, Math.max(0, value ?? 0))

// Renders $progress/$secondaryProgress as a two-stop gradient fill painted behind the
// button's own text — a live "how close am I" meter on the control itself rather than a
// separate bar. Absent both props this contributes nothing and the button stays flat.
const progressFill = ({ $progress, $secondaryProgress, $progressColor = '#4ade80', $secondaryProgressColor = '#fbbf24' }) => {
  if ($progress == null && $secondaryProgress == null) return null
  const start = clampPercent($progress)
  const end = clampPercent(start + ($secondaryProgress ?? 0))
  return css`
    background: linear-gradient(
      to right,
      ${$progressColor}61 0%,
      ${$progressColor}61 ${start}%,
      ${$secondaryProgressColor}52 ${start}%,
      ${$secondaryProgressColor}52 ${end}%,
      transparent ${end}%,
      transparent 100%
    ), #262626;
  `
}

const Button = styled.button`
  position: relative;
  font-size: 0.95em;
  font-weight: 600;
  margin: 0;
  padding: 0.5em 0.9em;
  border-radius: 6px;
  color: ${props => props.color};
  border: 1.5px solid ${props => props.color};
  background: #262626;
  ${progressFill}
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  --glow-rgb: ${props => GLOW_RGB[props.color] ?? '255, 255, 255'};
  animation: ${props => (props.$pulse && !props.disabled ? css`${pulse} 1.8s ease-in-out infinite` : 'none')};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
Button.defaultProps = {
  color: 'grey',
}

// Visually hidden (clip-rect, not display/visibility) so a button can carry real
// role="progressbar" semantics for assistive tech without a second, separately-positioned bar.
export const VisuallyHiddenProgress = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export default Button
