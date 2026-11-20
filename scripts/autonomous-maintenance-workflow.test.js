import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const workflowPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../.github/workflows/autonomous-maintenance.yml',
);
const workflow = parse(fs.readFileSync(workflowPath, 'utf8'));
const steps = workflow.jobs.maintenance.steps;

describe('autonomous-maintenance.yml workflow-file push auth', () => {
  it('checks out with GH_AUTOMATION_PAT so git push is not the job GITHUB_TOKEN', () => {
    const checkout = steps.find((step) => String(step.uses || '').startsWith('actions/checkout@'));
    expect(checkout.with.token).toBe('${{ secrets.GH_AUTOMATION_PAT }}');
    expect(checkout.with['fetch-depth']).toBe(0);
  });

  it('keeps the Claude step on the same PAT for gh and the action token', () => {
    const claude = steps.find((step) => step.id === 'claude');
    expect(claude.env.GH_TOKEN).toBe('${{ secrets.GH_AUTOMATION_PAT }}');
    expect(claude.with.github_token).toBe('${{ secrets.GH_AUTOMATION_PAT }}');
  });
});

describe('autonomous-maintenance.yml empty-run signal', () => {
  const step = steps.find((item) => item.name === 'Surface a run that opens no pull request');

  it('warns and writes a job summary without failing the job', () => {
    expect(step).toBeTruthy();
    expect(step.if).toContain('always()');
    expect(step.run).toContain('::warning::');
    expect(step.run).toContain('GITHUB_STEP_SUMMARY');
    expect(step.run).toMatch(/exit 0\s*$/);
    expect(step.run).not.toContain('exit 1');
  });
});

describe('autonomous-maintenance.yml prompt gh rule', () => {
  const compose = steps.find((step) => step.id === 'compose-prompt');

  it('forbids a shell loop around gh issue view', () => {
    expect(compose.run).toContain('for n in …; do gh issue view $n');
    expect(compose.run).toContain('one `gh` invocation per command');
    expect(compose.run).toContain('No shell loops over variables');
  });
});

describe('autonomous-maintenance.yml slot schedule', () => {
  const slot = steps.find((step) => step.id === 'slot');
  const claude = steps.find((step) => step.id === 'claude');

  it('fires at 4am/10am/4pm/10pm IST (UTC 22:30, 04:30, 10:30, 16:30)', () => {
    expect(workflow.on.schedule).toEqual([
      { cron: '30 22 * * *' },
      { cron: '30 4 * * *' },
      { cron: '30 10 * * *' },
      { cron: '30 16 * * *' },
    ]);
  });

  it('resolves a scheduled firing from its own cron entry, not the clock', () => {
    expect(slot.env.EVENT_SCHEDULE).toBe('${{ github.event.schedule }}');
    for (const { cron } of workflow.on.schedule) {
      expect(slot.run).toContain(`"${cron}")`);
    }
    expect(slot.run).toContain('"30 22 * * *") clock=04');
    expect(slot.run).toContain('"30 4 * * *")  clock=10');
    expect(slot.run).toContain('"30 10 * * *") clock=16');
    expect(slot.run).toContain('"30 16 * * *") clock=22');
  });

  // Executes the step's real bash with `date` pinned to a fixed "now" (GNU date has no fake-clock flag), so the
  // intended-time / weekday arithmetic — not just the case strings — is covered.
  const runSlot = (schedule, nowIso) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'slot-'));
    const output = path.join(dir, 'out');
    const shim = `date() {
  local args=() has_d=false a
  for a in "$@"; do
    case "$a" in
      "today "*) a="$(command date -u -d "@$FAKE_NOW" +%F) \${a#today }" ;;
    esac
    case "$a" in -d|-d*) has_d=true ;; esac
    args+=("$a")
  done
  if [ "$has_d" = false ]; then args=(-d "@$FAKE_NOW" "\${args[@]}"); fi
  command date "\${args[@]}"
}
`;
    try {
      execFileSync('bash', ['-e', '-c', shim + slot.run], {
        env: {
          PATH: process.env.PATH,
          EVENT_SCHEDULE: schedule,
          INPUT_SLOT: '',
          INPUT_MODEL: '',
          FAKE_NOW: String(Math.floor(Date.parse(nowIso) / 1000)),
          GITHUB_OUTPUT: output,
          GITHUB_STEP_SUMMARY: path.join(dir, 'summary'),
          RUNNER_TEMP: dir,
        },
        stdio: 'pipe',
      });
      return Object.fromEntries(
        fs.readFileSync(output, 'utf8').split('\n').filter((line) => /^\w+=/.test(line))
          .map((line) => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1)]),
      );
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  };

  it.each([
    // [cron, firing time (UTC), expected kind, why]
    ['30 16 * * *', '2026-11-13T16:30:00Z', 'retro', 'Friday 22:00 IST on time'],
    ['30 16 * * *', '2026-11-13T22:04:00Z', 'retro', 'Friday 22:00 IST 5.5 h late is still Friday'],
    ['30 22 * * *', '2026-11-14T02:36:00Z', 'tech-debt', 'Saturday 04:00 IST (fired Fri 22:30 UTC), 4 h late'],
    ['30 22 * * *', '2026-11-13T22:30:00Z', 'tech-debt', 'exactly on time does not roll back a day'],
    ['30 4 * * *', '2026-11-16T09:30:00Z', 'planning', 'Monday 10:00 IST, 5 h late'],
    ['30 10 * * *', '2026-11-19T15:00:00Z', 'perf', 'Thursday 16:00 IST, 4.5 h late'],
    ['30 10 * * *', '2026-11-18T13:19:45Z', 'implement', 'Wednesday 16:00 IST has no weekly override'],
  ])('resolves %s fired at %s to %s (%s)', (cron, nowIso, kind) => {
    expect(runSlot(cron, nowIso).kind).toBe(kind);
  });

  it('tells the agent to finish the adversarial review before the headless run ends', () => {
    const compose = steps.find((step) => step.id === 'compose-prompt');
    expect(compose.run).toContain('Run that reviewer in the FOREGROUND');
  });

  it('resolves a model per kind and passes it to the Claude step', () => {
    expect(slot.run).toContain('implement|qa-review|qa-deep|retro|economy|perf|release|tech-debt) model=sonnet');
    expect(slot.run).toContain('housekeeping|docs-sync)           model=haiku');
    expect(slot.run).toContain('triage)                           model=haiku');
    expect(slot.run).toContain('triage|planning|architecture|retro|economy|qa-review) pr_free=true');
    expect(slot.run).toContain('planning|architecture|security|research) model=opus');
    expect(claude.with.claude_args).toContain('--model ${{ steps.slot.outputs.model }}');
  });

  it('lets issue-only slots bypass the open-PR ceiling', () => {
    const guard = steps.find((step) => step.id === 'guard');
    expect(guard.env.SLOT_PR_FREE).toBe('${{ steps.slot.outputs.pr_free }}');
    expect(guard.run).toContain('"$SLOT_PR_FREE" != "true"');
  });
});
