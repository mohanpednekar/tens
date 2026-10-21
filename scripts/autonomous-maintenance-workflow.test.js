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
