/**
 * Automatic-versioning helpers for release.yml (versioning is automatic — no one picks a version):
 *
 * - `planMissingTags` — every untagged CHANGELOG version except the current one: an older live
 *   release at the commit where package.json became it; a version never in package.json (the
 *   retroactive split of #1236) at the last first-parent `main` commit on or before its date (IST).
 *   The current version belongs to release.yml's tag-and-release (PAT → store-release).
 * - `verifyReleasePr` — a release PR is valid only if its CHANGELOG.md/package.json are exactly what
 *   `yarn bump-version` (or `--major`) produces from the base branch, so it can merge without a review.
 *
 * CLI (git refs only — never the working tree):
 *   node scripts/release-automation.mjs missing-tags   → prints "<version> <sha>" lines (older versions)
 *   node scripts/release-automation.mjs version-commit <version>  → release commit of that version
 *   node scripts/release-automation.mjs verify-pr <baseRef> [headRef=HEAD] [--allow-major]  → exit 1 unless pure bump
 *   (--allow-major only while repo variable RELEASE_MAJOR is true)
 * Run verify-pr from a checkout of the BASE branch (e.g. a `git worktree` of origin/main) so the
 * code doing the checking is not the code under review.
 */

import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSemver, planChangelogBump, splitChangelog, versionCodeDayPrefix } from './bump-version.mjs';

const IST_OFFSET_SECONDS = 5.5 * 3600;

/** IST calendar date (YYYY-MM-DD) of a unix timestamp in seconds. */
export function istDate(unixSeconds) {
  return new Date((unixSeconds + IST_OFFSET_SECONDS) * 1000).toISOString().slice(0, 10);
}

/**
 * @param {string} changelogText
 * @param {Array<{ sha: string, time: number }>} commits  first-parent main commits, any order
 * @param {Set<string>} existingTags  e.g. new Set(['v0.1.0'])
 * @param {string} [skipVersion]  the current version (tag-and-release tags it at its release commit)
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
    // Older live releases (were in package.json) go at their release commit. The CURRENT one is
    // skipped by the caller: tag-and-release owns it (PAT → store-release). An older one is only
    // still untagged if its run was missed or overtaken — a newer release has already shipped.
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
  // versionCode (YYDDDHHMM): the release time isn't recorded anywhere else, so accept any valid
  // HHMM on the release section's day, as long as it is above the base code (the floor).
  const versionCode = JSON.parse(headPackage).versionCode;
  const floor = Number.isInteger(base.versionCode) ? base.versionCode : 0;
  const hhmm = Number.isInteger(versionCode) ? versionCode % 10000 : -1;
  const sameDay = Number.isInteger(versionCode)
    && Math.floor(versionCode / 10000) === versionCodeDayPrefix(released.date)
    && Math.floor(hhmm / 100) < 24 && hhmm % 100 < 60;
  // Exactly what computeVersionCode can emit: a valid HHMM that day above the floor, or floor + 1
  // when the floor is already at/after that day's first code (never a code before the release day).
  const dayStart = versionCodeDayPrefix(released.date) * 10000;
  const floorPlusOne = versionCode === floor + 1 && floor + 1 >= dayStart;
  if (!Number.isInteger(versionCode) || versionCode <= floor || (!sameDay && !floorPlusOne)) {
    return { ok: false, reason: `versionCode ${versionCode} is not YYDDDHHMM for ${released.date} above ${floor}` };
  }
  // package.json must be byte-identical to what bump-version writes: only "version" and
  // "versionCode" may change.
  if (headPackage !== `${JSON.stringify({ ...base, version: headVersion, versionCode }, null, 2)}\n`) {
    return { ok: false, reason: 'package.json changes more than the "version"/"versionCode" fields' };
  }
  return { ok: true, version: headVersion };
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });

/**
 * version → first first-parent commit (oldest first) whose package.json has that version (and, when
 * `versionCode` is given, that versionCode too).
 */
function firstVersionCommits(versionCode) {
  const out = {};
  for (const sha of git('log', '--first-parent', '--reverse', '--format=%H', 'HEAD', '--', 'package.json').trim().split('\n').filter(Boolean)) {
    try {
      const p = JSON.parse(git('show', `${sha}:package.json`));
      if (versionCode !== undefined && p.versionCode !== versionCode) continue;
      const v = p.version;
      if (!out[v]) out[v] = sha;
    } catch { /* unparsable historical package.json — fall back to the date rule */ }
  }
  return out;
}

function main(argv) {
  const allowMajor = argv.includes('--allow-major');
  const [cmd, baseRef, headRef = 'HEAD'] = argv.filter((a) => a !== '--allow-major');
  if (cmd === 'missing-tags') {
    const commits = git('log', '--first-parent', '--format=%H %ct', 'HEAD')
      .trim().split('\n').map((l) => { const [sha, t] = l.split(' '); return { sha, time: Number(t) }; });
    const tags = new Set(git('tag', '--list', 'v*').split('\n').filter(Boolean));
    const versionCommits = firstVersionCommits();
    // HEAD's version is skipped: tag-and-release owns it (PAT tag → store-release fires once).
    const head = JSON.parse(git('show', 'HEAD:package.json')).version;
    for (const t of planMissingTags(git('show', 'HEAD:CHANGELOG.md'), commits, tags, head, versionCommits)) {
      console.log(`${t.version} ${t.sha}`);
    }
    return;
  }
  if (cmd === 'version-commit' && baseRef) {
    // The release commit is the first one whose package.json matches HEAD's version AND versionCode,
    // so a rebase-merged release PR (several commits) resolves to the commit with the final code.
    const headPkg = JSON.parse(git('show', 'HEAD:package.json'));
    const sha = headPkg.version === baseRef ? firstVersionCommits(headPkg.versionCode)[baseRef] : firstVersionCommits()[baseRef];
    if (!sha) { console.error(`no main commit has package.json version ${baseRef}`); process.exitCode = 1; return; }
    console.log(sha);
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
