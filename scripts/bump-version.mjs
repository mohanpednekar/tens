/**
 * Semver bump from CHANGELOG.md's ## [Unreleased] section (Part of #52).
 *
 * Rules:
 * - No bullet entries under Unreleased → no-op (exit 0).
 * - ### Added or ### Removed has ≥1 entry → minor bump.
 * - Otherwise (only Changed/Fixed/Security/Deprecated/…) → patch bump.
 * - Major is never auto-selected.
 *
 * Usage: yarn bump-version
 * Pure helpers are exported for unit tests and for the future release.yml
 * CHANGELOG extraction (tag message / GitHub Release body).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const UNRELEASED_HEADER = '## [Unreleased]';

/** Empty Unreleased block restored after a successful bump (Keep a Changelog). */
export const EMPTY_UNRELEASED = `## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security
`;

/** Body under ## [Unreleased] after a successful bump (no trailing newline). */
export const EMPTY_UNRELEASED_BODY = [
  '### Added',
  '',
  '### Changed',
  '',
  '### Deprecated',
  '',
  '### Removed',
  '',
  '### Fixed',
  '',
  '### Security',
  '',
].join('\n');

const SUBHEADING_RE = /^### (.+)\s*$/;
const BULLET_RE = /^\s*-\s+\S/;

/** Subheadings that trigger a minor (not patch) bump when they have entries. */
const MINOR_BUMP_SUBHEADINGS = new Set(['Added', 'Removed']);

/**
 * @param {string} version
 * @returns {{ major: number, minor: number, patch: number }}
 */
export function parseSemver(version) {
  if (typeof version !== 'string' || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`invalid semver version: ${version}`);
  }
  const [major, minor, patch] = version.split('.').map(Number);
  return { major, minor, patch };
}

/**
 * @param {string} version
 * @param {'minor' | 'patch'} bumpType
 * @returns {string}
 */
export function bumpSemver(version, bumpType) {
  const { major, minor, patch } = parseSemver(version);
  if (bumpType === 'minor') return `${major}.${minor + 1}.0`;
  if (bumpType === 'patch') return `${major}.${minor}.${patch + 1}`;
  throw new Error(`invalid bump type: ${bumpType}`);
}

/**
 * Split CHANGELOG.md into preamble (title/blurb before first ##) and ordered
 * version sections. Each section: { id, date, rawHeader, body }.
 * `id` is `Unreleased` or `x.y.z`.
 *
 * @param {string} changelogText
 */
export function splitChangelog(changelogText) {
  if (typeof changelogText !== 'string') {
    throw new Error('changelogText must be a string');
  }
  const lines = changelogText.split('\n');
  const sections = [];
  let preambleLines = [];
  let current = null;

  const flush = () => {
    if (!current) return;
    // Trim a single trailing newline from body accumulation, keep internal ones.
    current.body = current.bodyLines.join('\n').replace(/^\n/, '').replace(/\n$/, '');
    delete current.bodyLines;
    sections.push(current);
    current = null;
  };

  for (const line of lines) {
    const match = line.match(/^## \[([^\]]+)\](?:\s+-\s+(\d{4}-\d{2}-\d{2}))?\s*$/);
    if (match) {
      flush();
      current = {
        id: match[1],
        date: match[2] || null,
        rawHeader: line,
        bodyLines: [],
      };
      continue;
    }
    if (current) {
      current.bodyLines.push(line);
    } else {
      preambleLines.push(line);
    }
  }
  flush();

  return {
    preamble: preambleLines.join('\n').replace(/\n$/, ''),
    sections,
  };
}

/**
 * @param {string} changelogText
 * @param {string} versionId  e.g. 'Unreleased' or '0.5.0'
 * @returns {{ id: string, date: string | null, rawHeader: string, body: string } | null}
 */
export function extractVersionSection(changelogText, versionId) {
  const { sections } = splitChangelog(changelogText);
  return sections.find((s) => s.id === versionId) || null;
}

/**
 * Parse ### subheadings inside a version section body.
 * @param {string} body
 * @returns {Array<{ name: string, lines: string[] }>}
 */
export function parseSubheadings(body) {
  const lines = body.split('\n');
  const result = [];
  let current = null;

  const flush = () => {
    if (!current) return;
    // Drop leading/trailing blank lines inside the subsection for easier checks.
    while (current.lines.length && current.lines[0].trim() === '') current.lines.shift();
    while (current.lines.length && current.lines[current.lines.length - 1].trim() === '') {
      current.lines.pop();
    }
    result.push(current);
    current = null;
  };

  for (const line of lines) {
    const match = line.match(SUBHEADING_RE);
    if (match) {
      flush();
      current = { name: match[1].trim(), lines: [] };
      continue;
    }
    if (current) current.lines.push(line);
  }
  flush();
  return result;
}

/**
 * True when a subsection body has at least one markdown bullet entry.
 * @param {string[]} lines
 */
export function subsectionHasEntries(lines) {
  return lines.some((line) => BULLET_RE.test(line));
}

/**
 * @param {string} unreleasedBody
 * @returns {boolean}
 */
export function unreleasedHasEntries(unreleasedBody) {
  return parseSubheadings(unreleasedBody).some((s) => subsectionHasEntries(s.lines));
}

/**
 * @param {string} unreleasedBody
 * @returns {'minor' | 'patch' | null}  null when nothing to bump
 */
export function determineBumpType(unreleasedBody) {
  const subs = parseSubheadings(unreleasedBody);
  const withEntries = subs.filter((s) => subsectionHasEntries(s.lines));
  if (withEntries.length === 0) return null;
  if (withEntries.some((s) => MINOR_BUMP_SUBHEADINGS.has(s.name))) return 'minor';
  return 'patch';
}

/**
 * Build a released-section body from Unreleased, omitting empty subheadings.
 * @param {string} unreleasedBody
 * @returns {string}
 */
export function buildReleasedBody(unreleasedBody) {
  const kept = parseSubheadings(unreleasedBody).filter((s) =>
    subsectionHasEntries(s.lines),
  );
  if (kept.length === 0) return '';
  return kept
    .map((s) => `### ${s.name}\n${s.lines.join('\n')}`)
    .join('\n\n');
}

/**
 * Format YYYY-MM-DD from a Date (local calendar).
 * @param {Date} date
 */
export function formatChangelogDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Apply a bump to changelog text: move Unreleased → ## [next] - date, reset Unreleased.
 * @returns {{ nextText: string, bumpType: 'minor' | 'patch', nextVersion: string } | { noop: true }}
 */
export function planChangelogBump(changelogText, currentVersion, date = new Date()) {
  const unreleased = extractVersionSection(changelogText, 'Unreleased');
  if (!unreleased) {
    throw new Error('CHANGELOG.md has no ## [Unreleased] section');
  }
  const bumpType = determineBumpType(unreleased.body);
  if (!bumpType) return { noop: true };

  const nextVersion = bumpSemver(currentVersion, bumpType);
  const dateStr = typeof date === 'string' ? date : formatChangelogDate(date);
  const releasedBody = buildReleasedBody(unreleased.body);
  const { preamble, sections } = splitChangelog(changelogText);

  const rest = sections.filter((s) => s.id !== 'Unreleased');
  const newUnreleased = {
    id: 'Unreleased',
    date: null,
    rawHeader: UNRELEASED_HEADER,
    body: EMPTY_UNRELEASED_BODY,
  };

  const newReleased = {
    id: nextVersion,
    date: dateStr,
    rawHeader: `## [${nextVersion}] - ${dateStr}`,
    body: releasedBody,
  };

  const nextText = joinChangelog(preamble, [newUnreleased, newReleased, ...rest]);
  return { nextText, bumpType, nextVersion, dateStr };
}

/**
 * @param {string} preamble
 * @param {Array<{ rawHeader: string, body: string }>} sections
 */
export function joinChangelog(preamble, sections) {
  const parts = [];
  if (preamble) parts.push(preamble.replace(/\n$/, ''));
  for (const s of sections) {
    const body = s.body ? `${s.rawHeader}\n\n${s.body}` : s.rawHeader;
    parts.push(body);
  }
  return `${parts.join('\n\n')}\n`;
}

/**
 * Run the bump against paths. Returns a result object; does not process.exit.
 *
 * @param {{ rootDir?: string, changelogPath?: string, packagePath?: string, date?: Date | string, dryRun?: boolean }} [opts]
 */
export function runBumpVersion(opts = {}) {
  const rootDir = opts.rootDir || process.cwd();
  const changelogPath = opts.changelogPath || path.join(rootDir, 'CHANGELOG.md');
  const packagePath = opts.packagePath || path.join(rootDir, 'package.json');
  const date = opts.date ?? new Date();
  const dryRun = Boolean(opts.dryRun);

  const pkgRaw = fs.readFileSync(packagePath, 'utf8');
  const pkg = JSON.parse(pkgRaw);
  const currentVersion = pkg.version;
  if (typeof currentVersion !== 'string') {
    throw new Error('package.json has no string "version" field');
  }

  const changelogText = fs.readFileSync(changelogPath, 'utf8');
  const plan = planChangelogBump(changelogText, currentVersion, date);
  if (plan.noop) {
    return { noop: true, currentVersion };
  }

  const nextPkg = { ...pkg, version: plan.nextVersion };
  // Preserve trailing newline style of the original package.json.
  const pkgOut = `${JSON.stringify(nextPkg, null, 2)}\n`;

  if (!dryRun) {
    fs.writeFileSync(changelogPath, plan.nextText, 'utf8');
    fs.writeFileSync(packagePath, pkgOut, 'utf8');
  }

  return {
    noop: false,
    bumpType: plan.bumpType,
    currentVersion,
    nextVersion: plan.nextVersion,
    dateStr: plan.dateStr,
    dryRun,
  };
}

function isMainModule() {
  const thisFile = path.resolve(fileURLToPath(import.meta.url));
  const invoked = process.argv[1] && path.resolve(process.argv[1]);
  return invoked === thisFile;
}

function main() {
  const dryRun = process.argv.includes('--dry-run');
  try {
    const result = runBumpVersion({ dryRun });
    if (result.noop) {
      console.log(`bump-version: nothing to do (Unreleased is empty; still at ${result.currentVersion})`);
      process.exitCode = 0;
      return;
    }
    const verb = dryRun ? 'would bump' : 'bumped';
    console.log(
      `bump-version: ${verb} ${result.currentVersion} → ${result.nextVersion} (${result.bumpType}) for ${result.dateStr}`,
    );
    process.exitCode = 0;
  } catch (err) {
    console.error(`bump-version: ${err instanceof Error ? err.message : err}`);
    process.exitCode = 1;
  }
}

if (isMainModule()) {
  main();
}
