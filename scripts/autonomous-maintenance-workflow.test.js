import fs from 'node:fs';
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
    expect(workflow.on.schedule).toEqual([{ cron: '30 22,4,10,16 * * *' }]);
  });

  it('resolves a model per kind and passes it to the Claude step', () => {
    expect(slot.run).toContain('implement|perf|release|tech-debt) model=sonnet');
    expect(slot.run).toContain('housekeeping|docs-sync)           model=haiku');
    expect(slot.run).toContain('triage)                           model=haiku');
    expect(slot.run).toContain('qa-review|qa-deep|security|research) model=opus');
    expect(claude.with.claude_args).toContain('--model ${{ steps.slot.outputs.model }}');
  });

  it('lets issue-only slots bypass the open-PR ceiling', () => {
    const guard = steps.find((step) => step.id === 'guard');
    expect(guard.env.SLOT_PR_FREE).toBe('${{ steps.slot.outputs.pr_free }}');
    expect(guard.run).toContain('"$SLOT_PR_FREE" != "true"');
  });
});
