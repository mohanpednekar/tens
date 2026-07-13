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
// Disabled buttons always render their text in `darkgrey`; a full-strength fill would drag
// that text's contrast below WCAG AA (measured ~2.6:1 at the normal alpha), so disabled fills
// use a much lower alpha that keeps darkgrey text >=4.5:1 against the blended background.
const progressFill = ({ disabled, $progress, $secondaryProgress, $progressColor = '#4ade80', $secondaryProgressColor = '#fbbf24' }) => {
  if ($progress == null && $secondaryProgress == null) return null
  const start = clampPercent($progress)
  const end = clampPercent(start + ($secondaryProgress ?? 0))
  const primaryAlpha = disabled ? '20' : '61'
  const secondaryAlpha = disabled ? '20' : '52'
  return css`
    background: linear-gradient(
      to right,
      ${$progressColor}${primaryAlpha} 0%,
      ${$progressColor}${primaryAlpha} ${start}%,
      ${$secondaryProgressColor}${secondaryAlpha} ${start}%,
      ${$secondaryProgressColor}${secondaryAlpha} ${end}%,
      transparent ${end}%,
      transparent 100%
    ), #262626;
  `
}

// Disabled state is signaled by color (every caller pairs `disabled` with a darkgrey `color`)
// and cursor alone, deliberately NOT by dimming overall opacity — group opacity blends both the
// text and its background toward the same backdrop, which compresses their contrast ratio no
// matter how light the text color is (measured: darkgrey text on a disabled button already fell
// to ~3.2:1 at the previous opacity:0.6, below WCAG AA, even with no progress fill involved).
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
  --glow-rgb: ${props => GLOW_RGB[props.color] ?? '255, 255, 255'};
  animation: ${props => (props.$pulse && !props.disabled ? css`${pulse} 1.8s ease-in-out infinite` : 'none')};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.color};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// Visually hidden (clip-rect, not display/visibility) so an element can carry real
// accessibility semantics (a role="progressbar", or supplementary descriptive text via
// aria-describedby) without a second, separately-positioned visible node.
export const VisuallyHidden = styled.span`
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
