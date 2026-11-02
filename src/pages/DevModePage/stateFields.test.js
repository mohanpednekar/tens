import { createInitialGameState } from 'game/engine'
import {
  VARIABLE_AREAS,
  collectLeaves,
  describePath,
  getVariableAreaId,
  isEditableScalar,
  leafMatchesQuery,
  parseNumberDraft,
  prettifySegment,
  setValueAtPath,
} from './stateFields'

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

  it('prevents prototype pollution via prototype', () => {
    function Foo() {}
    const next = setValueAtPath(Foo, ['prototype', 'polluted'], true)
    expect(next).toEqual(Foo)
    expect(Foo.prototype.polluted).toBeUndefined()
  })
})

describe('parseNumberDraft', () => {
  it.each([
    ['777', 777],
    ['1e100', 1e100],
    ['8E6', 8e6],
    ['1,000', 1000],
    ['1_000_000', 1e6],
    [' 2.5 ', 2.5],
    ['10^6', 1e6],
    ['-3', -3],
  ])('parses %j → %d', (draft, expected) => {
    expect(parseNumberDraft(draft)).toBe(expected)
  })

  it.each(['', '   ', 'abc', '1e999', 'NaN', '1.2.3', undefined])('rejects %j', draft => {
    expect(parseNumberDraft(draft)).toBeNull()
  })
})

describe('getVariableAreaId', () => {
  it.each([
    ['intro', 'foundry'],
    ['computeAutoBoostUnlocked', 'foundry'],
    ['computeFlops', 'compute'],
    ['computeFlopsAutobuyers', 'compute'],
    ['era', 'era'],
    ['eonsUpgrades', 'era'],
    ['hyperscalerCount', 'era'],
    ['prestige', 'prestige'],
    ['autoPrestige', 'prestige'],
    ['autobuyers', 'perks'],
    ['autoOverclock', 'perks'],
    ['tierTickspeedIntervalLevels', 'perks'],
    ['resources', 'factory'],
    ['owned', 'factory'],
    ['someBrandNewField', 'factory'],
  ])('%s → %s', (key, area) => {
    expect(getVariableAreaId(key)).toBe(area)
  })

  it('places every top-level key of a fresh state in exactly one known area', () => {
    const ids = new Set(VARIABLE_AREAS.map(area => area.id))
    Object.keys(createInitialGameState()).forEach(key => expect(ids.has(getVariableAreaId(key))).toBe(true))
  })
})

describe('collectLeaves / leafMatchesQuery', () => {
  it('flattens nested objects, keeping null and array leaves', () => {
    expect(collectLeaves({ a: 1, b: { c: true, d: null, e: [1] } })).toEqual([
      { path: ['a'], value: 1 },
      { path: ['b', 'c'], value: true },
      { path: ['b', 'd'], value: null },
      { path: ['b', 'e'], value: [1] },
    ])
  })

  it('matches raw dotted paths and prettified tier names, case-insensitively', () => {
    expect(leafMatchesQuery(['owned', 'tier01'], 'owned.tier01')).toBe(true)
    expect(leafMatchesQuery(['owned', 'tier01'], 'KILOBYTES')).toBe(true)
    expect(leafMatchesQuery(['owned', 'tier01'], 'megabytes')).toBe(false)
    expect(leafMatchesQuery(['owned', 'tier01'], '  ')).toBe(true)
    expect(describePath(['owned', 'tier01'])).toBe('owned › Kilobytes')
  })
})
