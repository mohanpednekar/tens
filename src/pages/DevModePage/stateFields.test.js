import { isEditableScalar, prettifySegment, setValueAtPath } from './stateFields'

describe('prettifySegment', () => {
  it('maps ladder and Flops tier ids to their display names', () => {
    expect(prettifySegment('tier01')).toBe('Kilobytes')
    expect(prettifySegment('tier10')).toBe('Quettabytes')
    expect(prettifySegment('flop01')).toBe('KFlops')
    expect(prettifySegment('flop10')).toBe('QFlops')
  })

  it('returns unknown keys unchanged', () => {
    expect(prettifySegment('intro')).toBe('intro')
    expect(prettifySegment('mainGameUnlocked')).toBe('mainGameUnlocked')
    expect(prettifySegment('tier99')).toBe('tier99')
  })
})

describe('isEditableScalar', () => {
  test.each([
    [0, true],
    [1.5, true],
    [true, true],
    [false, true],
    ['', true],
    ['bits', true],
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
  ])('isEditableScalar(%j) → %s', (value, expected) => {
    expect(isEditableScalar(value)).toBe(expected)
  })
})

describe('setValueAtPath', () => {
  it('sets a top-level key without mutating the original', () => {
    const original = { a: 1, b: 2 }
    const next = setValueAtPath(original, ['a'], 9)
    expect(next).toEqual({ a: 9, b: 2 })
    expect(original).toEqual({ a: 1, b: 2 })
    expect(next).not.toBe(original)
  })

  it('sets a nested leaf and preserves siblings at every depth', () => {
    const original = {
      intro: {
        mainGameUnlocked: false,
        dataLakes: { 1: { purchased: 0, deposited: 2 }, 2: { purchased: 1 } },
      },
      prestige: { points: 5 },
    }
    const next = setValueAtPath(original, ['intro', 'dataLakes', '1', 'purchased'], 3)
    expect(next.intro.dataLakes['1']).toEqual({ purchased: 3, deposited: 2 })
    expect(next.intro.dataLakes['2']).toEqual({ purchased: 1 })
    expect(next.intro.mainGameUnlocked).toBe(false)
    expect(next.prestige).toEqual({ points: 5 })
    expect(original.intro.dataLakes['1'].purchased).toBe(0)
  })

  it('creates missing intermediate objects along the path', () => {
    expect(setValueAtPath({}, ['intro', 'dataLakes', '1', 'purchased'], true)).toEqual({
      intro: { dataLakes: { 1: { purchased: true } } },
    })
  })

  it('prevents prototype pollution via __proto__', () => {
    const original = {}
    const next = setValueAtPath(original, ['__proto__', 'polluted'], true)
    expect(next).toEqual(original)
    expect(Object.prototype.polluted).toBeUndefined()
  })

  it('prevents prototype pollution via constructor', () => {
    const original = {}
    const next = setValueAtPath(original, ['constructor', 'prototype', 'polluted'], true)
    expect(next).toEqual(original)
    expect(Object.prototype.polluted).toBeUndefined()
  })
})
