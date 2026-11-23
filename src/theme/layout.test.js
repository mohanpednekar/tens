import fc from 'fast-check'
import { getLayoutClass, isSplitEligible, media, LAYOUT_CLASSES } from './layout'

const cls = (width, height = 800) => getLayoutClass({ width, height })

describe('getLayoutClass', () => {
  test.each([
    [599, 800, 'compact'],
    [600, 800, 'medium'],
    [899, 800, 'medium'],
    [900, 800, 'expanded'],
    [1359, 800, 'expanded'],
    [1360, 800, 'wide'],
    [1200, 499, 'compact'],
    [1200, 500, 'expanded'],
    [360, 764, 'compact'],
    [928, 1004, 'expanded'],
    [788, 308, 'compact'],
  ])('%ix%i → %s', (width, height, expected) => {
    expect(getLayoutClass({ width, height })).toBe(expected)
  })

  test('total and monotonic in width for tall heights (property-based)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 4000 }), fc.integer({ min: 0, max: 4000 }), fc.integer({ min: 500, max: 3000 }), (a, b, h) => {
        const [lo, hi] = a <= b ? [a, b] : [b, a]
        expect(LAYOUT_CLASSES).toContain(cls(lo, h))
        expect(LAYOUT_CLASSES.indexOf(cls(lo, h))).toBeLessThanOrEqual(LAYOUT_CLASSES.indexOf(cls(hi, h)))
      }),
      { numRuns: 200 }
    )
  })
})

describe('isSplitEligible', () => {
  test.each([
    [820, 1180, false],
    [984, 1016, true],
    [890, 626, true],
    [626, 890, false],
    [466, 678, false],
    [800, 830, true],
    [783, 783, false],
    [784, 784, true],
    [784, 981, false], // ratio 0.799
    [784, 980, true], // ratio 0.8
    [1180, 820, true],
  ])('%ix%i → %s', (width, height, expected) => {
    expect(isSplitEligible({ width, height })).toBe(expected)
  })
})

test('media helpers', () => {
  expect(media.atLeast('medium')).toBe('@media (min-width: 600px) and (min-height: 500px)')
  expect(media.below('medium')).toBe('@media (max-width: 599.98px)')
})
