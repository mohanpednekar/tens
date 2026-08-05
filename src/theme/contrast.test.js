import { getContrastRatio } from './contrast'

describe('getContrastRatio', () => {
  it('returns 21:1 for black on white (the WCAG maximum)', () => {
    expect(getContrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1)
  })

  it('returns 1:1 for identical colors', () => {
    expect(getContrastRatio('#7c9bff', '#7c9bff')).toBeCloseTo(1, 5)
  })

  it('is symmetric regardless of argument order', () => {
    expect(getContrastRatio('#eef1f7', '#16181f')).toBeCloseTo(
      getContrastRatio('#16181f', '#eef1f7'),
      10
    )
  })

  it('accepts 3-digit shorthand hex', () => {
    expect(getContrastRatio('#000', '#fff')).toBeCloseTo(21, 1)
  })

  it('matches a known WCAG reference pair (#767676 on white ≈ 4.54:1)', () => {
    expect(getContrastRatio('#767676', '#ffffff')).toBeCloseTo(4.54, 1)
  })
})
