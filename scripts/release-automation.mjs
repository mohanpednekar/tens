/**
 * Automatic-versioning helpers for release.yml (versioning is automatic — no one picks a version):
 *
 * - `planMissingTags` — every CHANGELOG version without a git tag gets one: at the first-parent
 *   `main` commit where package.json's version became that version when one exists, otherwise (the
 *   retroactive per-day split of #1236, never in package.json) at the last first-parent commit on or
 *   before its release date in IST (release.yml stamps dates with --date in IST too).
 * - `verifyReleasePr` — a release PR is valid only if its CHANGELOG.md/package.json are exactly what
 *   `yarn bump-version` (or `--major`) produces from the base branch, so it can merge without a review.
 *
 * CLI (git refs only — never the working tree):
 *   node scripts/release-automation.mjs missing-tags   → prints "<version> <sha>" lines
 *   node scripts/release-automation.mjs verify-pr <baseRef> [headRef=HEAD] [--allow-major]  → exit 1 unless pure bump
 *   (--allow-major only while repo variable RELEASE_MAJOR is true)
 * Run verify-pr from a checkout of the BASE branch (e.g. a `git worktree` of origin/main) so the
 * code doing the checking is not the code under review.
 */

import { execFileSync } from 'node:child_process';
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
 * @param {Record<string, string>} [versionCommits]  version → first main commit where package.json had it
 * @returns {Array<{ version: string, tag: string, sha: string }>}  oldest first
 */
export function planMissingTags(changelogText, commits, existingTags, skipVersion, versionCommits = {}) {
  const sorted = [...commits].sort((a, b) => a.time - b.time);
  const released = splitChangelog(changelogText).sections.filter((s) => s.id !== 'Unreleased' && s.date);
  const out = [];
  for (const s of released) {
    parseSemver(s.id);
    const tag = `v${s.id}`;
    if (existingTags.has(tag) || s.id === skipVersion) continue;
    if (versionCommits[s.id]) {
      out.push({ version: s.id, tag, sha: versionCommits[s.id] });
      continue;
    }
    const onOrBefore = sorted.filter((c) => istDate(c.time) <= s.date);
    if (onOrBefore.length === 0) throw new Error(`no main commit on or before ${s.date} for ${tag}`);
    out.push({ version: s.id, tag, sha: onOrBefore[onOrBefore.length - 1].sha });
  }
  return out.reverse();
}

/**
 * @returns {{ ok: true, version: string } | { ok: false, reason: string }}
 */
export function verifyReleasePr({ baseChangelog, basePackage, headChangelog, headPackage, allowMajor = false }) {
  const base = JSON.parse(basePackage);
  const headVersion = JSON.parse(headPackage).version;
  const baseVersion = base.version;
  const { sections } = splitChangelog(headChangelog);
  const released = sections.find((s) => s.id !== 'Unreleased');
  if (!released?.date) return { ok: false, reason: 'head CHANGELOG has no dated release section' };
  const plan = planChangelogBump(baseChangelog, baseVersion, released.date);
  if (plan.noop) return { ok: false, reason: 'base Unreleased is empty — nothing to release' };
  const major = planChangelogBump(baseChangelog, baseVersion, released.date, { forceMajor: true });
  const match = [plan, ...(allowMajor ? [major] : [])].find((p) => p.nextVersion === headVersion);
  if (!match) {
    const alt = allowMajor ? ` (or ${major.nextVersion})` : headVersion === major.nextVersion ? ' (a major bump needs --allow-major, i.e. RELEASE_MAJOR set)' : '';
    return { ok: false, reason: `package.json is ${headVersion}, expected ${plan.nextVersion}${alt}` };
  }
  if (match.nextText !== headChangelog) {
    return { ok: false, reason: 'CHANGELOG.md differs from the yarn bump-version result' };
  }
  // package.json must be byte-identical to what bump-version writes: only "version" may change.
  if (headPackage !== `${JSON.stringify({ ...base, version: headVersion }, null, 2)}\n`) {
    return { ok: false, reason: 'package.json changes more than the "version" field' };
  }
  return { ok: true, version: headVersion };
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });

function main(argv) {
  const allowMajor = argv.includes('--allow-major');
  const [cmd, baseRef, headRef = 'HEAD'] = argv.filter((a) => a !== '--allow-major');
  if (cmd === 'missing-tags') {
    const commits = git('log', '--first-parent', '--format=%H %ct', 'HEAD')
      .trim().split('\n').map((l) => { const [sha, t] = l.split(' '); return { sha, time: Number(t) }; });
    const tags = new Set(git('tag', '--list', 'v*').split('\n').filter(Boolean));
    const versionCommits = {};
    for (const sha of git('log', '--first-parent', '--reverse', '--format=%H', 'HEAD', '--', 'package.json').trim().split('\n').filter(Boolean)) {
      try {
        const v = JSON.parse(git('show', `${sha}:package.json`)).version;
        if (!versionCommits[v]) versionCommits[v] = sha;
      } catch { /* unparsable historical package.json — fall back to the date rule */ }
    }
    // No skip for HEAD's version: tag-and-release (PAT, triggers store-release) runs first, so the
    // current version is only still untagged here if that run was missed — then backfill recovers it.
    for (const t of planMissingTags(git('show', 'HEAD:CHANGELOG.md'), commits, tags, undefined, versionCommits)) {
      console.log(`${t.version} ${t.sha}`);
    }
    return;
  }
  if (cmd === 'verify-pr' && baseRef) {
    const show = (ref, f) => git('show', `${ref}:${f}`);
    const result = verifyReleasePr({
      baseChangelog: show(baseRef, 'CHANGELOG.md'),
      basePackage: show(baseRef, 'package.json'),
      headChangelog: show(headRef, 'CHANGELOG.md'),
      headPackage: show(headRef, 'package.json'),
      allowMajor,
    });
    const changed = git('diff', '--name-only', `${baseRef}...${headRef}`).trim().split('\n').filter(Boolean);
    const extra = changed.filter((f) => f !== 'CHANGELOG.md' && f !== 'package.json');
    if (!result.ok || extra.length) {
      console.error(`release PR invalid: ${result.ok ? `touches ${extra.join(', ')}` : result.reason}`);
      process.exitCode = 1;
      return;
    }
    console.log(`release PR valid: v${result.version}`);
    return;
  }
  console.error('usage: release-automation.mjs missing-tags | verify-pr <baseRef> [headRef] [--allow-major]');
  process.exitCode = 2;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main(process.argv.slice(2));
}
