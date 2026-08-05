// WCAG 2.x relative-luminance contrast ratio between two sRGB hex colors — see
// https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio. Used by tokens.contrast.test.js to guard the
// design tokens' AA compliance; kept standalone (not test-only) since any future token or
// component work needing a contrast check can reuse it instead of re-deriving the formula.

const srgbChannelToLinear = channel => {
  const c = channel / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

const relativeLuminance = ({ r, g, b }) => {
  const [rLin, gLin, bLin] = [r, g, b].map(srgbChannelToLinear)
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin
}

const hexToRgb = hex => {
  const normalized = hex.replace('#', '')
  const full = normalized.length === 3 ? normalized.split('').map(c => c + c).join('') : normalized
  const value = parseInt(full, 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

export const getContrastRatio = (hexA, hexB) => {
  const lA = relativeLuminance(hexToRgb(hexA))
  const lB = relativeLuminance(hexToRgb(hexB))
  const [lighter, darker] = lA >= lB ? [lA, lB] : [lB, lA]
  return (lighter + 0.05) / (darker + 0.05)
}

// WCAG 2.x AA thresholds: 4.5:1 for normal text, 3:1 for large text (≥24px, or ≥19px bold) and for
// non-text UI component boundaries (WCAG 1.4.11 Non-text Contrast) such as button borders/accent
// stripes.
export const AA_NORMAL_TEXT = 4.5
export const AA_LARGE_TEXT = 3
export const AA_UI_COMPONENT = 3
