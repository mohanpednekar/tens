import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const read = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n')

describe('CLAUDE.md drift', () => {
  test('hook return list matches useIncrementalGame return object', () => {
    const src = read('src/game/useIncrementalGame.js')
    const idx = src.lastIndexOf('\n  return {')
    const body = src.slice(idx).split('\n  }\n')[0].split('\n').slice(2)
    const actual = new Set(
      body
        .map((l) => l.trim().replace(/,$/, ''))
        .filter(Boolean)
        .map((l) => l.split(':')[0].trim()),
    )
    const doc = read('CLAUDE.md').replace(/\s+/g, ' ')
    const m = doc.match(/exposes `?\{([^}]*)\}/)
    expect(m, 'CLAUDE.md: could not find the "exposes { … }" hook return list').toBeTruthy()
    const documented = new Set(m[1].split(',').map((s) => s.trim()).filter(Boolean))
    const missing = [...actual].filter((k) => !documented.has(k))
    const extra = [...documented].filter((k) => !actual.has(k))
    expect(
      { missing, extra },
      'Fix CLAUDE.md Architecture item 2 (useIncrementalGame return list)',
    ).toEqual({ missing: [], extra: [] })
  })
})
