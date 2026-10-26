import { applyChecks, allVerifiableChecked } from './verify-maintainer-checklist.mjs';

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
