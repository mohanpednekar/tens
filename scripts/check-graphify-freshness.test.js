import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  collectGraphifySourceFiles,
  externalSourceNames,
  findStaleGraphifySourceRefs,
  isRepoPath,
} from './check-graphify-freshness.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const fixtureRoots = [];

afterEach(() => {
  for (const root of fixtureRoots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

function makeFixtureRoot({ files = [], deps = {}, nodes = [], links = [] } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'graphify-freshness-'));
  fixtureRoots.push(root);
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ dependencies: deps }));
  fs.mkdirSync(path.join(root, 'graphify-out'));
  fs.writeFileSync(
    path.join(root, 'graphify-out', 'graph.json'),
    JSON.stringify({ nodes, links }),
  );
  for (const file of files) {
    const abs = path.join(root, file);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, '');
  }
  return root;
}

describe('check-graphify-freshness', () => {
  it('committed graphify-out/graph.json has no stale source_file references', () => {
    const stale = findStaleGraphifySourceRefs(REPO_ROOT);
    expect(
      stale,
      `stale graphify source_file refs — run \`graphify update .\` and commit the regenerated graphify-out/: ${JSON.stringify(stale)}`,
    ).toEqual([]);
  });

  it('collectGraphifySourceFiles counts node and link source_file refs', () => {
    const counts = collectGraphifySourceFiles({
      nodes: [
        { source_file: 'src/a.js' },
        { source_file: 'src/a.js' },
        { source_file: '' },
        {},
      ],
      links: [{ source_file: 'src/b.js' }],
      hyperedges: [{ source_file: 'src/c.js' }],
    });
    expect(counts.get('src/a.js')).toBe(2);
    expect(counts.get('src/b.js')).toBe(1);
    expect(counts.get('src/c.js')).toBe(1);
    expect(counts.size).toBe(3);
  });

  it('flags repo paths and unknown bare names that no longer exist', () => {
    const root = makeFixtureRoot({
      files: ['src/kept.js'],
      deps: { 'some-dep': '^1.0.0', '@scope/pkg': '^1.0.0' },
      nodes: [
        { source_file: '@scope/pkg' },
        { source_file: 'src/kept.js' },
        { source_file: 'src/deleted.js' },
        { source_file: 'docs/GONE.md' },
        { source_file: 'deleted-root.js' },
        { source_file: 'some-dep' },
        { source_file: 'node:path' },
      ],
    });
    expect(findStaleGraphifySourceRefs(root)).toEqual([
      { sourceFile: 'deleted-root.js', refs: 1 },
      { sourceFile: 'docs/GONE.md', refs: 1 },
      { sourceFile: 'src/deleted.js', refs: 1 },
    ]);
  });

  it('counts link-level refs toward a stale entry', () => {
    const root = makeFixtureRoot({
      nodes: [{ source_file: 'src/gone.js' }],
      links: [{ source_file: 'src/gone.js' }, { source_file: 'src/gone.js' }],
    });
    expect(findStaleGraphifySourceRefs(root)).toEqual([
      { sourceFile: 'src/gone.js', refs: 3 },
    ]);
  });

  it('externalSourceNames includes package.json deps and Node builtins', () => {
    const names = externalSourceNames(REPO_ROOT);
    expect(names.has('web-vitals')).toBe(true);
    expect(names.has('fs')).toBe(true);
    expect(names.has('node:fs')).toBe(true);
    expect(names.has('not-a-real-package')).toBe(false);
  });

  it('isRepoPath only accepts names with a path separator', () => {
    expect(isRepoPath('src/game/engine.js')).toBe(true);
    expect(isRepoPath('docs\\win.md')).toBe(true);
    expect(isRepoPath('web-vitals')).toBe(false);
  });
});
