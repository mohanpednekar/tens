import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  analyzeGraphifyFreshness,
  collectGraphifySourceFiles,
  externalSourceNames,
  findUncoveredGraphifyFiles,
  isExternalModuleRef,
} from './check-graphify-freshness.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const tmpRoots = [];

function makeFixtureRoot({ files = [], deps = {}, nodes = [], links = [] } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'graphify-freshness-'));
  tmpRoots.push(root);
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

afterEach(() => {
  while (tmpRoots.length > 0) {
    fs.rmSync(tmpRoots.pop(), { recursive: true, force: true });
  }
});

describe('check-graphify-freshness', () => {
  it('committed graphify-out/graph.json is fresh in both directions', () => {
    const { stale, uncovered } = analyzeGraphifyFreshness(REPO_ROOT);
    expect(
      { stale, uncovered },
      'stale/uncovered graphify refs — run `graphify update .` and commit the regenerated graphify-out/',
    ).toEqual({ stale: [], uncovered: [] });
  });

  it('collectGraphifySourceFiles counts node, link, and hyperedge source_file refs', () => {
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

  it('flags refs to files that no longer exist, exempting external modules', () => {
    const root = makeFixtureRoot({
      files: ['src/kept.js'],
      deps: { 'some-dep': '^1.0.0', '@capacitor/core': '^7.0.0' },
      nodes: [
        { source_file: 'src/kept.js' },
        { source_file: 'src/deleted.js' },
        { source_file: 'docs/GONE.md' },
        { source_file: 'deleted-root.js' },
        { source_file: 'some-dep' },
        { source_file: 'some-dep/subpath.js' },
        { source_file: '@capacitor/core' },
        { source_file: '@capacitor/core/sub.js' },
        { source_file: 'node:path' },
        { source_file: 'fs/promises' },
      ],
    });
    const { stale } = analyzeGraphifyFreshness(root, { listFiles: () => [] });
    expect(stale).toEqual([
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
    const { stale } = analyzeGraphifyFreshness(root, { listFiles: () => [] });
    expect(stale).toEqual([{ sourceFile: 'src/gone.js', refs: 3 }]);
  });

  it('flags tracked, indexed files the graph never references (take-one-side merges)', () => {
    const referenced = new Set(['src/kept.js']);
    const tracked = [
      'src/kept.js',
      'src/added-on-main.js',
      'docs/added-on-main.md',
      '.github/workflows/ci.yml',
      'package.json',
      'graphify-out/GRAPH_REPORT.md',
    ];
    expect(findUncoveredGraphifyFiles(referenced, tracked)).toEqual([
      'docs/added-on-main.md',
      'src/added-on-main.js',
    ]);
  });

  it('isExternalModuleRef matches deps exactly or by subpath, never by loose prefix', () => {
    const names = ['react', '@capacitor/core', 'fs', 'node:path'];
    expect(isExternalModuleRef('react', names)).toBe(true);
    expect(isExternalModuleRef('@capacitor/core/sub.js', names)).toBe(true);
    expect(isExternalModuleRef('fs/promises', names)).toBe(true);
    expect(isExternalModuleRef('reactive/x.js', names)).toBe(false);
    expect(isExternalModuleRef('src/react-like.js', names)).toBe(false);
  });

  it('externalSourceNames includes package.json deps and Node builtins', () => {
    const names = externalSourceNames(REPO_ROOT);
    expect(names.has('web-vitals')).toBe(true);
    expect(names.has('fs')).toBe(true);
    expect(names.has('node:fs')).toBe(true);
    expect(names.has('not-a-real-package')).toBe(false);
  });
});
