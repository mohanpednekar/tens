/**
 * Graphify freshness check (Part of #761).
 *
 * Asserts that the committed `graphify-out/graph.json` stays in sync with the
 * working tree in both directions — the stale-graph shapes produced when
 * merging `main` into a long-lived feature branch three-way merges the
 * generated graph artifacts (or conflict-resolves them by taking one side)
 * instead of regenerating via `graphify update .`:
 *
 * 1. Dangling refs — every node/link `source_file` in the graph must name a
 *    file that still exists, or an external module reference (a `package.json`
 *    dependency — including scoped names like `@capacitor/core` and subpath
 *    imports like `pkg/subpath` — or a Node.js builtin such as `fs/promises`).
 *    Graphify records external imports (e.g. the `web-vitals` dependency node)
 *    as bare module names in `source_file`.
 * 2. Uncovered files — every tracked file with a graphify-indexed extension
 *    (`GRAPHIFY_INDEXED_EXTENSIONS`, outside `graphify-out/` itself) must have
 *    at least one `source_file` reference, catching a take-one-side resolution
 *    that leaves `main`'s newly-added files absent from the committed graph.
 *
 * Content drift inside still-existing files isn't detectable without
 * regenerating the graph itself — that direction stays covered by the
 * `built_at_commit` pointer plus the same-commit `graphify update .`
 * convention documented in CLAUDE.md.
 *
 * `yarn test` runs this via `check-graphify-freshness.test.js`, so it fires
 * automatically on every PR in CI rather than needing a review round to notice.
 *
 * Usage: node scripts/check-graphify-freshness.mjs
 *   exit 0 when clean; exit 1 and list the stale/uncovered refs otherwise.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { builtinModules } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Extensions graphify demonstrably indexes into `source_file` nodes/links —
 * verified: every tracked file of these types (outside `graphify-out/`) has at
 * least one graph reference. `.json`/`.yml`/assets are deliberately excluded:
 * graphify indexes only select configs (e.g. `package.json`), so asserting
 * coverage there would false-positive.
 */
export const GRAPHIFY_INDEXED_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.cjs', '.md', '.sh']);

/** source_file → reference count, across nodes, links, and hyperedges. */
export function collectGraphifySourceFiles(graph) {
  const counts = new Map();
  const add = (entry) => {
    if (typeof entry?.source_file !== 'string' || entry.source_file === '') return;
    counts.set(entry.source_file, (counts.get(entry.source_file) ?? 0) + 1);
  };
  for (const node of graph.nodes ?? []) add(node);
  for (const link of graph.links ?? graph.edges ?? []) add(link);
  for (const edge of graph.hyperedges ?? []) add(edge);
  return counts;
}

/** Names a `source_file` may legitimately refer to without existing on disk. */
export function externalSourceNames(rootDir) {
  const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  const names = new Set(builtinModules.flatMap((m) => [m, `node:${m}`]));
  for (const key of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
    for (const name of Object.keys(pkg[key] ?? {})) names.add(name);
  }
  return names;
}

/**
 * True when `sourceFile` names an external module — an exact dependency/builtin
 * name (`web-vitals`, `@capacitor/core`, `node:fs`) or a subpath beneath one
 * (`fs/promises`, `@fontsource/inter/latin-400.css`). The trailing `/` keeps
 * the boundary exact, so `reactive/x` never matches a `react` dependency.
 */
export function isExternalModuleRef(sourceFile, externalNames) {
  for (const name of externalNames) {
    if (sourceFile === name || sourceFile.startsWith(`${name}/`)) return true;
  }
  return false;
}

/** Tracked repo files, via `git ls-files` (untracked scratch files never count). */
export function listTrackedFiles(rootDir) {
  return execFileSync('git', ['ls-files', '-z'], { cwd: rootDir, encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
}

/**
 * Tracked, graphify-indexed files with zero references in the graph — the
 * "take one side of a merge" stale shape, where `main` added files the kept
 * side's graph never saw.
 */
export function findUncoveredGraphifyFiles(referencedFiles, trackedFiles) {
  return trackedFiles
    .filter(
      (f) =>
        GRAPHIFY_INDEXED_EXTENSIONS.has(path.posix.extname(f)) &&
        !f.startsWith('graphify-out/') &&
        !referencedFiles.has(f),
    )
    .sort();
}

/**
 * @returns {{ stale: { sourceFile: string, refs: number }[], uncovered: string[] }}
 */
export function analyzeGraphifyFreshness(rootDir, { listFiles = listTrackedFiles } = {}) {
  const graphPath = path.join(rootDir, 'graphify-out', 'graph.json');
  const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
  const externals = [...externalSourceNames(rootDir)];
  const referenced = collectGraphifySourceFiles(graph);
  const stale = [];
  for (const [sourceFile, refs] of referenced) {
    if (fs.existsSync(path.join(rootDir, sourceFile))) continue;
    if (isExternalModuleRef(sourceFile, externals)) continue;
    stale.push({ sourceFile, refs });
  }
  stale.sort((a, b) => a.sourceFile.localeCompare(b.sourceFile));
  const uncovered = findUncoveredGraphifyFiles(new Set(referenced.keys()), listFiles(rootDir));
  return { stale, uncovered };
}

function isMainModule() {
  const thisFile = path.resolve(fileURLToPath(import.meta.url));
  const invoked = process.argv[1] && path.resolve(process.argv[1]);
  return invoked === thisFile;
}

function main() {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  try {
    const { stale, uncovered } = analyzeGraphifyFreshness(rootDir);
    if (stale.length === 0 && uncovered.length === 0) {
      console.log(
        'check-graphify-freshness: every graph.json source_file resolves, and every indexed file is referenced.',
      );
      process.exitCode = 0;
      return;
    }
    if (stale.length > 0) {
      console.error('check-graphify-freshness: graph.json references files that no longer exist:');
      for (const { sourceFile, refs } of stale) {
        console.error(`  ${sourceFile} (${refs} ref${refs === 1 ? '' : 's'})`);
      }
    }
    if (uncovered.length > 0) {
      console.error('check-graphify-freshness: indexed files missing from graph.json entirely:');
      for (const file of uncovered) console.error(`  ${file}`);
    }
    console.error('Fix: run `graphify update .` and commit the regenerated graphify-out/ files.');
    process.exitCode = 1;
  } catch (err) {
    console.error(`check-graphify-freshness: ${err instanceof Error ? err.message : err}`);
    process.exitCode = 1;
  }
}

if (isMainModule()) {
  main();
}
