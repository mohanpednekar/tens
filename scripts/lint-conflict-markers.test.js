import { findConflictMarkers, isScannable } from './lint-conflict-markers.mjs';

const L = '<'.repeat(7);
const E = '='.repeat(7);
const R = '>'.repeat(7);

describe('findConflictMarkers', () => {
  it('returns nothing for clean text', () => {
    expect(findConflictMarkers('const a = 1;\n// ======== heading\n<<< not\n')).toEqual([]);
  });
  it('reports 1-based line numbers of all three marker kinds', () => {
    const text = `a\n${L} HEAD\nb\n${E}\nc\n${R} branch\n`;
    expect(findConflictMarkers(text)).toEqual([2, 4, 6]);
  });
  it('catches a bare separator with CRLF but not a bare opener', () => {
    expect(findConflictMarkers(`${E}\r\n`)).toEqual([1]);
    expect(findConflictMarkers(`${L}\n`)).toEqual([]);
  });
});

describe('isScannable', () => {
  it('skips graphify-out, lockfile and binaries', () => {
    expect(isScannable('graphify-out/graph.json')).toBe(false);
    expect(isScannable('yarn.lock')).toBe(false);
    expect(isScannable('public/pwa-192x192.png')).toBe(false);
    expect(isScannable('src/game/engine.js')).toBe(true);
  });
});
