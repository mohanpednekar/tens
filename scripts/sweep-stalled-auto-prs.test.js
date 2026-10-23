import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const script = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'sweep-stalled-auto-prs.sh',
);
const MARKER = '<!-- stalled-pr-sweep-v1 -->';
const OLD = '2020-01-01T00:00:00Z';

// Stub `gh`: `pr list` prints the fixture; every other call is logged and
// `issue list` returns nothing (no existing escalation issue).
function sweep(prs) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sweep-'));
  fs.writeFileSync(path.join(dir, 'prs.json'), JSON.stringify(prs));
  fs.writeFileSync(
    path.join(dir, 'gh'),
    `#!/usr/bin/env bash
if [ "$1 $2" = "pr list" ]; then cat "${dir}/prs.json"; exit 0; fi
if [ "$1 $2" = "issue list" ]; then exit 0; fi
echo "$*" >> "${dir}/calls.log"
`,
    { mode: 0o755 },
  );
  const result = spawnSync('bash', [script], {
    encoding: 'utf8',
    env: { ...process.env, PATH: `${dir}:${process.env.PATH}` },
  });
  const calls = fs.existsSync(path.join(dir, 'calls.log'))
    ? fs.readFileSync(path.join(dir, 'calls.log'), 'utf8')
    : '';
  return { status: result.status, calls };
}

const pr = (over) => ({
  number: 1,
  headRefName: 'claude/auto-x',
  updatedAt: OLD,
  mergeable: 'MERGEABLE',
  statusCheckRollup: [],
  comments: [],
  ...over,
});

describe('sweep-stalled-auto-prs.sh', () => {
  it('comments on a stale PR with a failing check', () => {
    const r = sweep([pr({ statusCheckRollup: [{ conclusion: 'FAILURE' }] })]);
    expect(r.status).toBe(0);
    expect(r.calls).toMatch(/pr comment 1 .*retrying after an apparent stall/s);
  });

  it('comments on a stale conflicted PR even with green checks', () => {
    const r = sweep([
      pr({ mergeable: 'CONFLICTING', statusCheckRollup: [{ conclusion: 'SUCCESS' }] }),
    ]);
    expect(r.calls).toMatch(/pr comment 1 .*merge conflict/s);
  });

  it('ignores recently active, healthy, and non-claude/auto PRs', () => {
    const failing = [{ conclusion: 'FAILURE' }];
    const r = sweep([
      pr({ number: 1, updatedAt: new Date().toISOString(), statusCheckRollup: failing }),
      pr({ number: 2 }),
      pr({ number: 3, headRefName: 'dependabot/x', statusCheckRollup: failing }),
    ]);
    expect(r.calls).toBe('');
  });

  it('escalates to an automation-retro issue after 3 sweep comments', () => {
    const r = sweep([
      pr({
        mergeable: 'CONFLICTING',
        comments: [{ body: MARKER }, { body: MARKER }, { body: MARKER }],
      }),
    ]);
    expect(r.calls).toMatch(/issue create .*automation-retro/);
    expect(r.calls).not.toMatch(/pr comment/);
  });
});
