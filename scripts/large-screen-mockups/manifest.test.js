import { createInitialGameState } from '../../src/game/engine.js'
import { COMPOSERS, MOCKUPS, SEEDS, STATUS_LABELS, composeFrame, galleryMarkdown, paneRects } from './manifest.mjs'

describe('large-screen mockup manifest', () => {
  test('mockup ids and pane names are unique', () => {
    const ids = MOCKUPS.map(m => m.id)
    expect(new Set(ids).size).toBe(ids.length)
    const panes = MOCKUPS.flatMap(m => m.panes.map(p => p.name))
    expect(new Set(panes).size).toBe(panes.length)
  })

  test.each(MOCKUPS.map(m => [m.id, m]))('%s is well-formed', (_, mockup) => {
    expect(Object.keys(STATUS_LABELS)).toContain(mockup.status)
    expect(Object.keys(COMPOSERS)).toContain(mockup.layout.kind)
    expect(mockup.issues.length).toBeGreaterThan(0)
    for (const pane of mockup.panes) {
      expect(Object.keys(SEEDS)).toContain(pane.seed)
      expect(pane.width).toBeLessThanOrEqual(mockup.width)
      expect(pane.height).toBeLessThanOrEqual(mockup.height)
    }
    const html = composeFrame(mockup)
    for (const pane of mockup.panes) expect(html).toContain(`${pane.name}.png`)
  })

  // Approved Split mockups must honour the epic's hard rules: max 2 full panes, each ≥ 360 px.
  test.each(MOCKUPS.filter(m => m.status === 'approved' && m.layout.kind === 'panes').map(m => [m.id, m]))(
    '%s keeps at most 2 panes of at least 360 px', (_, mockup) => {
      expect(mockup.panes.length).toBeLessThanOrEqual(2)
      for (const pane of mockup.panes) expect(pane.width).toBeGreaterThanOrEqual(360)
    })

  // A capture drawn at a different width would be stretched; keep manifest widths in sync.
  test.each(MOCKUPS.filter(m => m.layout.kind === 'panes').map(m => [m.id, m]))('%s captures panes at their drawn width', (_, mockup) => {
    paneRects(mockup).forEach(({ width }, index) => expect(mockup.panes[index].width).toBe(width))
  })

  test('hinge mockups put the divider at the window centre', () => {
    for (const mockup of MOCKUPS.filter(m => m.layout.fold)) {
      expect(mockup.layout.dividers[0]).toBe(Math.floor(mockup.width / 2))
    }
  })

  test('seeds produce schema-v3 saves', () => {
    for (const build of Object.values(SEEDS)) expect(build().saveSchemaVersion).toBe(3)
  })

  // Seeds go through mergeState on load; a field with the wrong shape (e.g. an array where the
  // schema keeps a tier map) would merge into junk keys, so every seeded tier map must keep the
  // fresh state's keys and value types.
  test.each(Object.keys(SEEDS))('seed %s keeps the fresh state\'s tier-map shapes', name => {
    const fresh = createInitialGameState()
    const seed = SEEDS[name]()
    for (const field of ['owned', 'purchased', 'purchaseLevels', 'everUnlockedTierIds']) {
      expect(Array.isArray(seed[field])).toBe(false)
      expect(Object.keys(seed[field]).sort()).toEqual(Object.keys(fresh[field]).sort())
      for (const id of Object.keys(fresh[field])) expect(typeof seed[field][id]).toBe(typeof fresh[field][id])
    }
  })

  test('gallery lists every mockup image', () => {
    const md = galleryMarkdown(MOCKUPS, 'jpg')
    for (const mockup of MOCKUPS) expect(md).toContain(`./${mockup.id}.jpg`)
  })
})
