import styled, { css, keyframes } from 'styled-components'

// Semantic variant → theme color-token key. A small, closed vocabulary so callers can express
// *intent* ("this is the primary action", "this is dangerous") rather than picking a raw hex —
// see CLAUDE.md → "Theming"/"components/Button" for the full rationale. `prestige` resolves to
// `warn`, the token whose own palette comment already documents it as "prestige gold / caution".
const VARIANT_TOKEN = {
  primary: 'accent',
  success: 'good',
  prestige: 'warn',
  info: 'info',
  smart: 'violet',
  neutral: 'textMuted',
  ghost: 'textMuted',
  danger: 'danger',
}

// `variant` (theme-driven) takes precedence over the older raw `color` prop, which stays
// supported — and is the only option — for every call site that hasn't migrated to a variant
// yet (see CLAUDE.md's Button entry: `color` is deprecated, not removed).
const resolveColor = ({ variant, color, theme }) => {
  const tokenKey = variant && VARIANT_TOKEN[variant]
  return tokenKey ? theme.color[tokenKey] : color
}

// Named CSS-keyword colors still reaching this component via the legacy `color` prop (e.g.
// `white`) don't parse as hex, so they get a small fallback table; every theme token color is a
// hex string, so resolveColor's output always hits the hexToRgb path below regardless of variant
// or theme mode — this is what makes the glow "work for every variant in both themes" without
// hardcoding a triple per token.
const NAMED_GLOW_RGB = {
  white: '255, 255, 255',
  darkgrey: '169, 169, 169',
}

const hexToRgb = hex => {
  const normalized = hex.replace('#', '')
  const full = normalized.length === 3 ? normalized.split('').map(c => c + c).join('') : normalized
  const value = parseInt(full, 16)
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`
}

const getGlowRgb = color => {
  if (!color) return '255, 255, 255'
  return color.startsWith('#') ? hexToRgb(color) : (NAMED_GLOW_RGB[color] ?? '255, 255, 255')
}

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--glow-rgb), 0); }
  50% { box-shadow: 0 0 8px 2px rgba(var(--glow-rgb), 0.55); }
`

const clampPercent = value => Math.min(100, Math.max(0, value ?? 0))

// Renders $progress/$secondaryProgress as a two-stop gradient fill painted behind the
// button's own text — a live "how close am I" meter on the control itself rather than a
// separate bar. Absent both props this contributes nothing and the button stays flat.
// Disabled buttons always render their text in a muted/disabled color; a full-strength fill
// would drag that text's contrast below WCAG AA (measured ~2.6:1 at the normal alpha), so
// disabled fills use a much lower alpha that keeps disabled text >=4.5:1 against the blended
// background. Defaults (when a caller passes neither prop) fall back to the `good`/`warn`
// tokens — the same semantic pairing the old `#4ade80`/`#fbbf24` hardcoded defaults stood in for.
const progressFill = ({ disabled, $progress, $secondaryProgress, $progressColor, $secondaryProgressColor, theme }) => {
  if ($progress == null && $secondaryProgress == null) return null
  const progressColor = $progressColor ?? theme.color.good
  const secondaryProgressColor = $secondaryProgressColor ?? theme.color.warn
  const start = clampPercent($progress)
  const end = clampPercent(start + ($secondaryProgress ?? 0))
  const primaryAlpha = disabled ? '20' : '61'
  const secondaryAlpha = disabled ? '20' : '52'
  return css`
    background: linear-gradient(
      to right,
      ${progressColor}${primaryAlpha} 0%,
      ${progressColor}${primaryAlpha} ${start}%,
      ${secondaryProgressColor}${secondaryAlpha} ${start}%,
      ${secondaryProgressColor}${secondaryAlpha} ${end}%,
      transparent ${end}%,
      transparent 100%
    ), ${theme.color.surfaceSunken};
  `
}

// Disabled state is signaled by color (every caller pairs `disabled` with a muted/disabled
// `color` or `variant`) and cursor alone, deliberately NOT by dimming overall opacity — group
// opacity blends both the text and its background toward the same backdrop, which compresses
// their contrast ratio no matter how light the text color is (measured: disabled-color text on a
// disabled button already fell to ~3.2:1 at the previous opacity:0.6, below WCAG AA, even with no
// progress fill involved).
const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95em;
  font-weight: 600;
  margin: 0;
  padding: 0.5em 0.9em;
  border-radius: 6px;
  color: ${resolveColor};
  border: 1.5px solid ${resolveColor};
  background: ${props => props.theme.color.surfaceSunken};
  ${progressFill}
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  --glow-rgb: ${props => getGlowRgb(resolveColor(props))};
  animation: ${props => (props.$pulse && !props.disabled ? css`${pulse} 1.8s ease-in-out infinite` : 'none')};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${resolveColor};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// A button's leading icon glyph, pinned to a fixed-width flex slot on the left — paired with
// ButtonLabel (flex: 1, centered) so the icon never drifts with the label's length while the
// label itself still reads as centered in the remaining space, rather than the whole string
// (icon included) sliding left/right together as one block.
export const ButtonIcon = styled.span`
  flex: 0 0 auto;
`

export const ButtonLabel = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// Splits a button's compact visible text ("🛒 Lv.10 $100") into a fixed-position ButtonIcon and
// a centered ButtonLabel at the first space — every such label in this app follows the
// icon-then-word convention (see MainPage), so the first space always lands right after the
// icon glyph. Falls back to a single centered ButtonLabel for icon-less text (e.g. "Dismiss",
// or any string with no space at all) rather than misreading its first word as an icon.
export const ButtonContent = ({ children }) => {
  const text = String(children)
  const spaceIndex = text.indexOf(' ')
  if (spaceIndex === -1) return <ButtonLabel>{text}</ButtonLabel>
  return (
    <>
      <ButtonIcon>{text.slice(0, spaceIndex + 1)}</ButtonIcon>
      <ButtonLabel>{text.slice(spaceIndex + 1)}</ButtonLabel>
    </>
  )
}

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
