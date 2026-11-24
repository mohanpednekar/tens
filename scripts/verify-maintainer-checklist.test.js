import { execFileSync } from 'node:child_process';
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applyChecks, allVerifiableChecked, formatReport, classifyProjectsError, CHECKS } from './verify-maintainer-checklist.mjs';

const BODY = [
  '## Outstanding',
  '- [x] Grant `GH_AUTOMATION_PAT` the **"Dependabot alerts: read"** scope',
  '- [ ] Enable **Discussions** on the repo',
  '- [ ] Enable **"Require review from Code Owners"** in branch protection',
  '- [ ] Enable **GitHub Sponsors**',
  '## Presumed already done',
  '- [ ] "Allow auto-merge" is enabled (Settings)',
  '## Tracked separately — not GitHub-API-verifiable',
  '- [ ] Enable **Discussions** in manual section',
].join('\n');

describe('applyChecks', () => {
  it('strikes through passing items only, leaving failing/unknown/unrelated and the manual section alone', () => {
    const r = applyChecks(BODY, { discussions: true, codeOwners: false, autoMerge: null });
    expect(r.newlyChecked).toEqual(['discussions']);
    expect(r.body).toContain('- [x] ~~Enable **Discussions** on the repo~~');
    expect(r.body).toContain('- [ ] Enable **"Require review from Code Owners"**');
    expect(r.body).toContain('- [ ] "Allow auto-merge" is enabled');
    expect(r.body).toContain('- [ ] Enable **GitHub Sponsors**');
    expect(r.body).toContain('- [ ] Enable **Discussions** in manual section');
  });

  it('normalises checked-without-strikethrough lines', () => {
    const r = applyChecks(BODY, {});
    expect(r.normalised).toBe(1);
    expect(r.body).toContain('- [x] ~~Grant `GH_AUTOMATION_PAT` the **"Dependabot alerts: read"** scope~~');
  });

  it('is idempotent', () => {
    const once = applyChecks(BODY, { discussions: true }).body;
    const twice = applyChecks(once, { discussions: true });
    expect(twice.body).toBe(once);
    expect(twice.newlyChecked).toEqual([]);
  });
});

describe('allVerifiableChecked', () => {
  it('is false while a verifiable item is unchecked, true once all are struck', () => {
    expect(allVerifiableChecked(BODY)).toBe(false);
    const done = applyChecks(BODY, { discussions: true, codeOwners: true, autoMerge: true }).body;
    expect(allVerifiableChecked(done)).toBe(true);
  });
});

describe('formatReport', () => {
  it('prints PASS/FAIL/UNKNOWN for every check', () => {
    const out = formatReport({ secret: true, autoMerge: false, discussions: null });
    const lines = out.split('\n');
    expect(lines).toHaveLength(CHECKS.length + 1);
    expect(out).toMatch(/PASS\s+secret/);
    expect(out).toMatch(/FAIL\s+autoMerge/);
    expect(out).toMatch(/UNKNOWN\s+discussions/);
    expect(out).toMatch(/UNKNOWN\s+codeOwners/);
  });
});

describe('classifyProjectsError', () => {
  it.each([
    ['error: your authentication token is missing required scopes [read:project]', false],
    ['Resource not accessible by integration', false],
    ['HTTP 401: Unauthorized', false],
    ['HTTP 403: Forbidden', false],
    ['dial tcp: lookup api.github.com: no such host', null],
    ['spawnSync gh ENOENT', null],
  ])('%s', (text, expected) => {
    expect(classifyProjectsError(text)).toBe(expected);
  });
});

describe('--dry-run write boundary', () => {
  // `failAll`: every gh call exits 1 (UNKNOWN path); otherwise lookups succeed with canned JSON so a
  // successful dry run still exercises the write-boundary assertion.
  it.each([
    ['all lookups fail', true, /UNKNOWN\s+secret/],
    ['all lookups succeed', false, /PASS\s+secret/],
  ])('never reads/edits #62 or issues a write call (%s)', (_name, failAll, expected) => {
    const dir = mkdtempSync(join(tmpdir(), 'fake-gh-'));
    const log = join(dir, 'calls.log');
    const ok = [
      'case "$*" in',
      '  *actions/secrets*) echo \'{"secrets":[{"name":"GH_AUTOMATION_PAT"}]}\' ;;',
      '  *protection*) echo \'{"required_status_checks":{"contexts":["test"]}}\' ;;',
      '  "project "*) echo "" ;;',
      '  *) echo \'{"allow_auto_merge":true,"has_discussions":true}\' ;;',
      'esac',
      'exit 0',
    ].join('\n');
    writeFileSync(join(dir, 'gh'), `#!/bin/sh\necho "$@" >> "${log}"\n${failAll ? 'exit 1' : ok}\n`);
    chmodSync(join(dir, 'gh'), 0o755);
    try {
      const out = execFileSync(
        process.execPath,
        [join(process.cwd(), 'scripts/verify-maintainer-checklist.mjs'), '--dry-run'],
        { encoding: 'utf8', env: { ...process.env, PATH: `${dir}:${process.env.PATH}` } },
      );
      expect(out).toMatch(expected);
      const calls = readFileSync(log, 'utf8').split('\n').filter(Boolean);
      expect(calls.length).toBeGreaterThan(0);
      expect(calls.some((c) => /^issue\b/.test(c))).toBe(false);
      // Only read-only lookups: no explicit method, request fields/body, or write subcommands.
      // Short flags may carry an attached value (`-XPOST`, `-fname=x`), so match them by prefix.
      expect(calls.some((c) => /(^|\s)(-[XfF]\S*|(--method|--field|--raw-field|--input)(=\S*)?)(\s|$)/.test(c))).toBe(false);
      expect(calls.every((c) => /^(api |project list )/.test(c))).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
