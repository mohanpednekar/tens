/**
 * Automatic-versioning helpers for release.yml (versioning is automatic — no one picks a version):
 *
 * - `planMissingTags` — every CHANGELOG version without a git tag gets one, at the last first-parent
 *   `main` commit on or before its release date (IST, the maintainer's timezone; the date
 *   scripts/bump-version.mjs or the retroactive split stamped). Used to backfill historical tags.
 * - `verifyReleasePr` — a release PR is valid only if its CHANGELOG.md/package.json are exactly what
 *   `yarn bump-version` produces from the base branch (so it can merge without a code review).
 *
 * CLI:
 *   node scripts/release-automation.mjs missing-tags   → prints "<version> <sha>" lines (reads git)
 *   node scripts/release-automation.mjs verify-pr <baseRef>  → exit 1 unless the release diff is pure
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSemver, planChangelogBump, splitChangelog } from './bump-version.mjs';

const IST_OFFSET_SECONDS = 5.5 * 3600;

/** IST calendar date (YYYY-MM-DD) of a unix timestamp in seconds. */
export function istDate(unixSeconds) {
  return new Date((unixSeconds + IST_OFFSET_SECONDS) * 1000).toISOString().slice(0, 10);
}

/**
 * @param {string} changelogText
 * @param {Array<{ sha: string, time: number }>} commits  first-parent main commits, any order
 * @param {Set<string>} existingTags  e.g. new Set(['v0.1.0'])
 * @param {string} [skipVersion]  version handled separately (tagged at HEAD by release.yml)
 * @returns {Array<{ version: string, tag: string, sha: string }>}  oldest first
 */
export function planMissingTags(changelogText, commits, existingTags, skipVersion) {
  const sorted = [...commits].sort((a, b) => a.time - b.time);
  const released = splitChangelog(changelogText).sections.filter((s) => s.id !== 'Unreleased' && s.date);
  const out = [];
  for (const s of released) {
    parseSemver(s.id);
    const tag = `v${s.id}`;
    if (existingTags.has(tag) || s.id === skipVersion) continue;
    const onOrBefore = sorted.filter((c) => istDate(c.time) <= s.date);
    if (onOrBefore.length === 0) throw new Error(`no main commit on or before ${s.date} for ${tag}`);
    out.push({ version: s.id, tag, sha: onOrBefore[onOrBefore.length - 1].sha });
  }
  return out.reverse();
}

/**
 * @returns {{ ok: true, version: string } | { ok: false, reason: string }}
 */
export function verifyReleasePr({ baseChangelog, baseVersion, headChangelog, headVersion }) {
  const { sections } = splitChangelog(headChangelog);
  const released = sections.find((s) => s.id !== 'Unreleased');
  if (!released?.date) return { ok: false, reason: 'head CHANGELOG has no dated release section' };
  const plan = planChangelogBump(baseChangelog, baseVersion, released.date);
  if (plan.noop) return { ok: false, reason: 'base Unreleased is empty — nothing to release' };
  if (plan.nextVersion !== headVersion) {
    return { ok: false, reason: `package.json is ${headVersion}, expected ${plan.nextVersion}` };
  }
  if (plan.nextText !== headChangelog) {
    return { ok: false, reason: 'CHANGELOG.md differs from the yarn bump-version result' };
  }
  return { ok: true, version: headVersion };
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });

function main([cmd, baseRef]) {
  if (cmd === 'missing-tags') {
    const commits = git('log', '--first-parent', '--format=%H %ct', 'HEAD')
      .trim().split('\n').map((l) => { const [sha, t] = l.split(' '); return { sha, time: Number(t) }; });
    const tags = new Set(git('tag', '--list', 'v*').split('\n').filter(Boolean));
    const head = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
    for (const t of planMissingTags(fs.readFileSync('CHANGELOG.md', 'utf8'), commits, tags, head)) {
      console.log(`${t.version} ${t.sha}`);
    }
    return;
  }
  if (cmd === 'verify-pr' && baseRef) {
    const show = (f) => git('show', `${baseRef}:${f}`);
    const result = verifyReleasePr({
      baseChangelog: show('CHANGELOG.md'),
      baseVersion: JSON.parse(show('package.json')).version,
      headChangelog: fs.readFileSync('CHANGELOG.md', 'utf8'),
      headVersion: JSON.parse(fs.readFileSync('package.json', 'utf8')).version,
    });
    const changed = git('diff', '--name-only', `${baseRef}...HEAD`).trim().split('\n').filter(Boolean);
    const extra = changed.filter((f) => f !== 'CHANGELOG.md' && f !== 'package.json');
    if (!result.ok || extra.length) {
      console.error(`release PR invalid: ${result.ok ? `touches ${extra.join(', ')}` : result.reason}`);
      process.exitCode = 1;
      return;
    }
    console.log(`release PR valid: v${result.version}`);
    return;
  }
  console.error('usage: release-automation.mjs missing-tags | verify-pr <baseRef>');
  process.exitCode = 2;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main(process.argv.slice(2));
}
