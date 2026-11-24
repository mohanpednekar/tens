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
  ])('%s', (text, expected) => {
    expect(classifyProjectsError(text)).toBe(expected);
  });
});

describe('--dry-run write boundary', () => {
  it('never reads or edits issue #62, only performs read-only lookups', () => {
    const dir = mkdtempSync(join(tmpdir(), 'fake-gh-'));
    const log = join(dir, 'calls.log');
    writeFileSync(join(dir, 'gh'), `#!/bin/sh\necho "$@" >> "${log}"\nexit 1\n`);
    chmodSync(join(dir, 'gh'), 0o755);
    try {
      const out = execFileSync(
        process.execPath,
        [join(process.cwd(), 'scripts/verify-maintainer-checklist.mjs'), '--dry-run'],
        { encoding: 'utf8', env: { ...process.env, PATH: `${dir}:${process.env.PATH}` } },
      );
      expect(out).toMatch(/UNKNOWN\s+secret/);
      const calls = readFileSync(log, 'utf8').split('\n').filter(Boolean);
      expect(calls.length).toBeGreaterThan(0);
      expect(calls.some((c) => /^issue\b/.test(c))).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
