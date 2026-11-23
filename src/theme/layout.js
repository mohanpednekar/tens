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

// styled-components helpers, exact complements of each other and consistent with getLayoutClass
// (height < 500 is always compact): atLeast('medium') → width ≥ 600 and height ≥ 500;
// below('medium') → width < 600 or height < 500. atLeast('compact') matches everything;
// below('compact') is meaningless and throws, as does an unknown class.
const minWidth = cls => {
  if (!(cls in MIN_WIDTH)) throw new Error(`Unknown layout class: ${cls}`)
  return MIN_WIDTH[cls]
}

export const media = {
  atLeast: cls =>
    minWidth(cls) === 0
      ? '@media all'
      : `@media (min-width: ${minWidth(cls)}px) and (min-height: ${breakpoints.minHeight}px)`,
  below: cls => {
    if (minWidth(cls) === 0) throw new Error('No layout class is below compact')
    return `@media (max-width: ${MIN_WIDTH[cls] - 0.02}px), (max-height: ${breakpoints.minHeight - 0.02}px)`
  },
}
