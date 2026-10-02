import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const script = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'classify-claude-failure.sh',
);

// Writes the given execution JSON into a temp file and runs the classifier
// against it. RUNNER_TEMP is pointed at the same fresh temp dir so the
// script's missing-arg fallback can't accidentally pick up a real file.
function run(executionJson) {
  const dir = mkdtempSync(path.join(tmpdir(), 'classify-claude-failure-'));
  const file = path.join(dir, 'exec.json');
  if (executionJson !== undefined) writeFileSync(file, executionJson);
  const result = spawnSync(script, [file], {
    encoding: 'utf8',
    env: { ...process.env, RUNNER_TEMP: dir },
  });
  return {
    status: result.status,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
  };
}

function resultEntry(overrides = {}) {
  return {
    type: 'result',
    subtype: 'success',
    is_error: true,
    duration_ms: 60_000,
    num_turns: 12,
    total_cost_usd: 0.31,
    modelUsage: { 'claude-sonnet-4-5': { inputTokens: 100, outputTokens: 50 } },
    ...overrides,
  };
}

const zeroWork = { num_turns: 1, total_cost_usd: 0, modelUsage: {} };

describe('classify-claude-failure.sh', () => {
  it('downgrades an HTTP 429 quota error to a warning', () => {
    const r = run(
      JSON.stringify([resultEntry({ ...zeroWork, api_error_status: 429 })]),
    );
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/::warning::/);
    expect(r.stdout).toMatch(/429/);
  });

  it('downgrades a 5xx API overload to a warning', () => {
    const r = run(
      JSON.stringify([resultEntry({ ...zeroWork, api_error_status: 529 })]),
    );
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/::warning::/);
    expect(r.stdout).toMatch(/529/);
  });

  it('accepts a bare (non-array) result object', () => {
    const r = run(
      JSON.stringify(resultEntry({ ...zeroWork, api_error_status: 503 })),
    );
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/503/);
  });

  it('fails red when an API error hit after real work', () => {
    // api_error_status alone is not enough — a 429 mid-run after billed
    // turns leaves partial work on the PR and must stay red.
    const r = run(JSON.stringify([resultEntry({ api_error_status: 429 })]));
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/::error::/);
  });

  it('downgrades the dead-before-work shape (no api_error_status)', () => {
    // Exact shape captured from autonomous-pr-followup.yml runs
    // 36286193578 / 36286282545 on 2026-09-27 (#752).
    const r = run(
      JSON.stringify([
        {
          type: 'result',
          subtype: 'success',
          is_error: true,
          duration_ms: 369,
          num_turns: 1,
          total_cost_usd: 0,
          modelUsage: {},
        },
      ]),
    );
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/::warning::/);
    expect(r.stdout).toMatch(/died before doing any work/);
  });

  it('fails red on a real error after real work', () => {
    const r = run(JSON.stringify([resultEntry()]));
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/::error::/);
  });

  it('fails red on an unrecognized api_error_status', () => {
    const r = run(
      JSON.stringify([resultEntry({ ...zeroWork, api_error_status: 400 })]),
    );
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/::error::/);
  });

  it('does not treat a partial dead-before-work shape as transient', () => {
    // num_turns low but real work was done and billed.
    const r = run(
      JSON.stringify([resultEntry({ num_turns: 1, total_cost_usd: 0.05 })]),
    );
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/::error::/);
  });

  it('fails red on a zero-work error with an unrecognized subtype', () => {
    // Same dead-before-work fields but a non-"success" subtype — e.g. a
    // persistent CLI/action startup regression — must not downgrade.
    const r = run(
      JSON.stringify([
        {
          type: 'result',
          subtype: 'error_during_execution',
          is_error: true,
          duration_ms: 200,
          num_turns: 0,
          total_cost_usd: 0,
          modelUsage: {},
        },
      ]),
    );
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/::error::/);
  });

  it('fails red when the run succeeded but the step still failed', () => {
    const r = run(JSON.stringify([resultEntry({ is_error: false })]));
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/::error::/);
  });

  it('fails red when the execution file is missing', () => {
    const r = run(undefined);
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/::error::/);
  });

  it('fails red on unparseable execution output', () => {
    const r = run('not json {');
    expect(r.status).toBe(1);
    expect(r.stdout).toMatch(/::error::/);
  });

  it('classifies only the LAST result entry', () => {
    const entries = [
      resultEntry({ ...zeroWork, api_error_status: 429 }),
      { type: 'summary', text: 'noise' },
      resultEntry({ ...zeroWork, api_error_status: 500 }),
    ];
    const r = run(JSON.stringify(entries));
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/500/);
  });
});
