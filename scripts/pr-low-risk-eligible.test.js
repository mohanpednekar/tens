import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const script = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'pr-low-risk-eligible.sh',
);

function run(payload) {
  const result = spawnSync(script, ['--from-json'], {
    input: JSON.stringify(payload),
    encoding: 'utf8',
  });
  return {
    status: result.status,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
  };
}

describe('pr-low-risk-eligible.sh', () => {
  it('accepts a small bot-branch diff', () => {
    const r = run({
      branch: 'cursor/auto-example',
      title: 'fix typo',
      isCrossRepository: false,
      additions: 10,
      deletions: 5,
      files: ['src/game/engine.js'],
    });
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/small diff/);
  });

  it('accepts docs/tests-only diffs of any size', () => {
    const r = run({
      branch: 'claude/auto-docs',
      title: 'sync docs',
      isCrossRepository: false,
      additions: 200,
      deletions: 50,
      files: ['CLAUDE.md', 'src/game/engine.test.js'],
    });
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/docs\/tests-only/);
  });

  it('rejects workflow touches even when small', () => {
    const r = run({
      branch: 'cursor/auto-example',
      title: 'tweak ci',
      isCrossRepository: false,
      additions: 1,
      deletions: 0,
      files: ['.github/workflows/ci.yml'],
    });
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/workflows/);
  });

  it('rejects human branches and forks', () => {
    expect(
      run({
        branch: 'feature/human',
        title: 'x',
        isCrossRepository: false,
        additions: 1,
        deletions: 0,
        files: ['CLAUDE.md'],
      }).status,
    ).toBe(1);
    expect(
      run({
        branch: 'cursor/auto-example',
        title: 'x',
        isCrossRepository: true,
        additions: 1,
        deletions: 0,
        files: ['CLAUDE.md'],
      }).status,
    ).toBe(1);
  });

  it('accepts cursor/heal-* housekeeping branches', () => {
    const r = run({
      branch: 'cursor/heal-changelog-save-schema-version',
      title: 'Fix CHANGELOG saveSchemaVersion drift',
      isCrossRepository: false,
      additions: 3,
      deletions: 2,
      files: ['CHANGELOG.md'],
    });
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/small diff|docs\/tests-only/);
  });

  it('accepts Dependabot patch/minor and rejects major', () => {
    const patch = run({
      branch: 'dependabot/npm_and_yarn/foo-1.2.4',
      title: 'Bump foo from 1.2.3 to 1.2.4',
      isCrossRepository: false,
      additions: 80,
      deletions: 20,
      files: ['yarn.lock'],
    });
    expect(patch.status).toBe(0);
    expect(patch.stdout).toMatch(/Dependabot patch\/minor/);

    const major = run({
      branch: 'dependabot/npm_and_yarn/foo-2.0.0',
      title: 'Bump foo from 1.9.0 to 2.0.0',
      isCrossRepository: false,
      additions: 80,
      deletions: 20,
      files: ['yarn.lock'],
    });
    expect(major.status).toBe(1);
  });
});
