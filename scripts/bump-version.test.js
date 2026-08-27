import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  bumpSemver,
  determineBumpType,
  extractVersionSection,
  planChangelogBump,
  runBumpVersion,
  unreleasedHasEntries,
} from './bump-version.mjs';

const PREAMBLE = `# Changelog

All notable changes to this project are documented in this file.
`;

function makeChangelog(unreleasedBody, older = '## [0.5.0] - 2026-07-14\n\n### Fixed\n- old fix.\n') {
  return `${PREAMBLE}
## [Unreleased]

${unreleasedBody}

${older}`;
}

describe('bump-version', () => {
  it('bumpSemver applies minor and patch correctly', () => {
    expect(bumpSemver('0.5.0', 'minor')).toBe('0.6.0');
    expect(bumpSemver('0.5.0', 'patch')).toBe('0.5.1');
    expect(bumpSemver('1.2.3', 'minor')).toBe('1.3.0');
  });

  it('no-ops when Unreleased has no bullet entries', () => {
    const text = makeChangelog(`### Added

### Fixed
`);
    expect(unreleasedHasEntries(extractVersionSection(text, 'Unreleased').body)).toBe(
      false,
    );
    expect(determineBumpType(extractVersionSection(text, 'Unreleased').body)).toBe(
      null,
    );
    expect(planChangelogBump(text, '0.5.0', '2026-08-26')).toEqual({ noop: true });
  });

  it('chooses minor when ### Added has entries', () => {
    const text = makeChangelog(`### Added
- New feature.

### Fixed
- A fix.
`);
    expect(determineBumpType(extractVersionSection(text, 'Unreleased').body)).toBe(
      'minor',
    );
    const plan = planChangelogBump(text, '0.5.0', '2026-08-26');
    expect(plan.noop).toBeUndefined();
    expect(plan.bumpType).toBe('minor');
    expect(plan.nextVersion).toBe('0.6.0');
    expect(plan.nextText).toContain('## [0.6.0] - 2026-08-26');
    expect(plan.nextText).toContain('- New feature.');
    expect(plan.nextText).toContain('- A fix.');
    // Unreleased reset to empty subheadings
    const unreleased = extractVersionSection(plan.nextText, 'Unreleased');
    expect(unreleased).not.toBeNull();
    expect(unreleasedHasEntries(unreleased.body)).toBe(false);
    // Prior release preserved
    expect(plan.nextText).toContain('## [0.5.0] - 2026-07-14');
  });

  it('chooses minor when ### Removed has entries (even without Added)', () => {
    const text = makeChangelog(`### Removed
- Old button.

### Changed
- Tweaked copy.
`);
    expect(determineBumpType(extractVersionSection(text, 'Unreleased').body)).toBe(
      'minor',
    );
  });

  it('chooses patch when only Fixed/Changed/Security have entries', () => {
    const text = makeChangelog(`### Fixed
- Bug fix.

### Changed
- Behavior tweak.

### Security
- Hardened parse.
`);
    expect(determineBumpType(extractVersionSection(text, 'Unreleased').body)).toBe(
      'patch',
    );
    const plan = planChangelogBump(text, '0.5.0', '2026-08-26');
    expect(plan.bumpType).toBe('patch');
    expect(plan.nextVersion).toBe('0.5.1');
    // Empty subheadings omitted from the dated section
    const released = extractVersionSection(plan.nextText, '0.5.1');
    expect(released.body).not.toMatch(/### Added/);
    expect(released.body).toContain('### Fixed');
    expect(released.body).toContain('### Changed');
    expect(released.body).toContain('### Security');
  });

  it('runBumpVersion writes package.json + CHANGELOG.md (and supports dry-run)', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bump-version-'));
    const changelogPath = path.join(dir, 'CHANGELOG.md');
    const packagePath = path.join(dir, 'package.json');
    const changelog = makeChangelog(`### Fixed
- Only a fix.
`);
    fs.writeFileSync(changelogPath, changelog, 'utf8');
    fs.writeFileSync(
      packagePath,
      `${JSON.stringify({ name: 'tens', version: '0.5.0' }, null, 2)}\n`,
      'utf8',
    );

    const dry = runBumpVersion({
      rootDir: dir,
      date: '2026-08-26',
      dryRun: true,
    });
    expect(dry).toMatchObject({
      noop: false,
      bumpType: 'patch',
      currentVersion: '0.5.0',
      nextVersion: '0.5.1',
      dryRun: true,
    });
    expect(JSON.parse(fs.readFileSync(packagePath, 'utf8')).version).toBe('0.5.0');

    const written = runBumpVersion({ rootDir: dir, date: '2026-08-26' });
    expect(written.nextVersion).toBe('0.5.1');
    expect(JSON.parse(fs.readFileSync(packagePath, 'utf8')).version).toBe('0.5.1');
    const nextChangelog = fs.readFileSync(changelogPath, 'utf8');
    expect(nextChangelog).toContain('## [0.5.1] - 2026-08-26');
    expect(unreleasedHasEntries(extractVersionSection(nextChangelog, 'Unreleased').body)).toBe(
      false,
    );

    // Second run is a no-op
    expect(runBumpVersion({ rootDir: dir, date: '2026-08-26' })).toEqual({
      noop: true,
      currentVersion: '0.5.1',
    });
  });

  it('refuses to create a duplicate ## [version] section', () => {
    // package at 0.4.0 + existing 0.5.0 section + Added → would bump to 0.5.0 again
    const text = makeChangelog(
      `### Added
- Feature.
`,
      '## [0.5.0] - 2026-07-14\n\n### Fixed\n- old fix.\n',
    );
    expect(() => planChangelogBump(text, '0.4.0', '2026-08-26')).toThrow(/already has/);
  });

  it('rejects Unreleased text before the first ### subheading', () => {
    const text = makeChangelog(`IMPORTANT note

### Added
- Feature.
`);
    expect(() => planChangelogBump(text, '0.5.0', '2026-08-26')).toThrow(
      /before the first ###/,
    );
  });

  it('throws on noop when CHANGELOG latest release disagrees with package.json', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bump-version-desync-'));
    // Simulate interrupted bump: changelog already cut to 0.5.1, package still 0.5.0
    const changelog = `${PREAMBLE}
## [Unreleased]

### Added

### Fixed

## [0.5.1] - 2026-08-26

### Fixed
- Only a fix.
`;
    fs.writeFileSync(path.join(dir, 'CHANGELOG.md'), changelog, 'utf8');
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      `${JSON.stringify({ name: 'tens', version: '0.5.0' }, null, 2)}\n`,
      'utf8',
    );
    expect(() => runBumpVersion({ rootDir: dir })).toThrow(/interrupted bump|set package\.json/);
  });
});
