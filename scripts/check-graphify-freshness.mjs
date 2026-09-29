/**
 * Graphify freshness check (Part of #761).
 *
 * Asserts that the committed `graphify-out/graph.json` carries no `source_file`
 * references to files that no longer exist in the working tree — the stale-graph
 * shape produced when merging `main` into a long-lived feature branch three-way
 * merges the generated graph artifacts (or conflict-resolves them by taking one
 * side) instead of regenerating via `graphify update .`.
 *
 * `yarn test` runs this via `check-graphify-freshness.test.js`, so it fires
 * automatically on every PR in CI rather than needing a review round to notice.
 *
 * A `source_file` containing a path separator is always a repo path and must
 * exist. A bare name (no separator) may instead be graphify's way of recording
 * an external module import (e.g. the `web-vitals` dependency node) — those are
 * accepted only when they name a `package.json` dependency or a Node.js
 * builtin; any other missing bare name is stale.
 *
 * Usage: node scripts/check-graphify-freshness.mjs
 *   exit 0 when clean; exit 1 and list the stale refs otherwise.
 */

import fs from 'node:fs';
import { builtinModules } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

/** Names a bare `source_file` may legitimately refer to without existing on disk. */
export function externalSourceNames(rootDir) {
  const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  const names = new Set(builtinModules.flatMap((m) => [m, `node:${m}`]));
  for (const key of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
    for (const name of Object.keys(pkg[key] ?? {})) names.add(name);
  }
  return names;
}

export function isRepoPath(sourceFile) {
  return sourceFile.includes('/') || sourceFile.includes('\\');
}

/**
 * @returns {{ sourceFile: string, refs: number }[]} stale refs, sorted by path.
 */
export function findStaleGraphifySourceRefs(rootDir) {
  const graphPath = path.join(rootDir, 'graphify-out', 'graph.json');
  const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
  const externals = externalSourceNames(rootDir);
  const stale = [];
  for (const [sourceFile, refs] of collectGraphifySourceFiles(graph)) {
    if (fs.existsSync(path.join(rootDir, sourceFile))) continue;
    if (!isRepoPath(sourceFile) && externals.has(sourceFile)) continue;
    stale.push({ sourceFile, refs });
  }
  return stale.sort((a, b) => a.sourceFile.localeCompare(b.sourceFile));
}

function isMainModule() {
  const thisFile = path.resolve(fileURLToPath(import.meta.url));
  const invoked = process.argv[1] && path.resolve(process.argv[1]);
  return invoked === thisFile;
}

function main() {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  try {
    const stale = findStaleGraphifySourceRefs(rootDir);
    if (stale.length === 0) {
      console.log('check-graphify-freshness: every graph.json source_file resolves to an existing file.');
      process.exitCode = 0;
      return;
    }
    console.error('check-graphify-freshness: stale graphify source_file references:');
    for (const { sourceFile, refs } of stale) {
      console.error(`  ${sourceFile} (${refs} ref${refs === 1 ? '' : 's'})`);
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
