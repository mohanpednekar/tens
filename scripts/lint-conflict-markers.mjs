/**
 * Fails when a tracked text file contains a git conflict marker (#945).
 *
 * Motivation: #933 merged a leftover marker into engine code and main went red;
 * nothing scanned the tree. A marker is a line starting with 7 `<` or 7 `>`
 * followed by a space, or a line that is exactly 7 `=`.
 *
 * Usage: yarn lint:workflows (chained there so ci.yml needs no edit)
 */

import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const MARKER_RE = new RegExp(`^(?:${'<'.repeat(7)} |${'>'.repeat(7)} |${'='.repeat(7)}\\r?$)`);
const SKIP_RE =
  /^graphify-out\/|(^|\/)yarn\.lock$|\.(png|ico|jpe?g|webp|gif|woff2?|jar|keystore|jks|pdf|zip)$/i;

/** @returns {number[]} 1-based line numbers holding a conflict marker */
export function findConflictMarkers(text) {
  const hits = [];
  text.split('\n').forEach((line, i) => {
    if (MARKER_RE.test(line)) hits.push(i + 1);
  });
  return hits;
}

export function isScannable(file) {
  return !SKIP_RE.test(file);
}

function main() {
  const ls = spawnSync('git', ['ls-files', '-z'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (ls.status !== 0) {
    console.error('git ls-files failed');
    process.exit(1);
  }
  const failures = [];
  for (const file of ls.stdout.split('\0').filter(Boolean)) {
    if (!isScannable(file) || !fs.existsSync(file)) continue;
    const buf = fs.readFileSync(file);
    if (buf.includes(0)) continue; // binary
    for (const line of findConflictMarkers(buf.toString('utf8'))) failures.push(`${file}:${line}`);
  }
  if (failures.length > 0) {
    console.error(`Conflict markers found:\n${failures.join('\n')}`);
    process.exit(1);
  }
  console.log('No conflict markers found.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
