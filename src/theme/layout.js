import { breakpoints } from './tokens'

// Layout classes (epic #1152 §1). Pure, size-only — never platform/UA/touch based, so desktop web,
// the PWA and native apps agree at the same viewport size.
export const LAYOUT_CLASSES = ['compact', 'medium', 'expanded', 'wide']

export const getLayoutClass = ({ width, height }) => {
  if (!(height >= breakpoints.minHeight)) return 'compact'
  if (!(width >= breakpoints.medium)) return 'compact'
  if (width < breakpoints.expanded) return 'medium'
  if (width < breakpoints.wide) return 'expanded'
  return 'wide'
}

// Two-page (Split) eligibility: expanded/wide, or ≥ 784px wide and near-square/landscape (≥ 0.8).
export const isSplitEligible = ({ width, height }) => {
  const cls = getLayoutClass({ width, height })
  if (cls === 'expanded' || cls === 'wide') return true
  return width >= breakpoints.splitMinWidth && height > 0 && width / height >= breakpoints.splitMinAspect
}

const MIN_WIDTH = {
  compact: 0,
  medium: breakpoints.medium,
  expanded: breakpoints.expanded,
  wide: breakpoints.wide,
}

// styled-components helpers: media.atLeast('medium') → `@media (min-width: 600px) and (min-height: 500px)`
// (mirrors getLayoutClass's height rule); media.below('medium') → `@media (max-width: 599.98px)`.
export const media = {
  atLeast: cls =>
    `@media (min-width: ${MIN_WIDTH[cls]}px) and (min-height: ${breakpoints.minHeight}px)`,
  below: cls => `@media (max-width: ${MIN_WIDTH[cls] - 0.02}px)`,
}
