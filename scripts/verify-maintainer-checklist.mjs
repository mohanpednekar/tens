// Verifies the GitHub-API-checkable items on issue #62 (the maintainer action-item checklist) and
// strikes through any that now pass (#63). Read-only checks; the only write is editing #62's body.
// Never touches the "Tracked separately" section, and never checks `Workflows: write` (only a real
// push outcome proves it — a settings read has been wrong before; see docs/AUTOMATION.md).
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const CHECKLIST_ISSUE = 62;
const MANUAL_SECTION_HEADING = '## Tracked separately';

// `match` is a substring identifying the item's line in #62; `check` returns true/false, or null when the
// check couldn't run (API error) — null leaves the line untouched.
export const CHECKS = [
  { key: 'secret', match: '`GH_AUTOMATION_PAT` repo secret exists' },
  { key: 'autoMerge', match: '"Allow auto-merge" is enabled' },
  { key: 'branchProtectionTest', match: 'Branch protection on `main` requires the `test` check' },
  { key: 'codeOwners', match: 'Enable **"Require review from Code Owners"**' },
  { key: 'discussions', match: 'Enable **Discussions**' },
  { key: 'projectsScope', match: '**"Projects: read and write"**' },
];

const UNCHECKED = /^- \[ \] (.*)$/;
const CHECKED_NO_STRIKE = /^- \[x\] (?!~~)(.*)$/;

/** Pure: apply `results` ({key: boolean|null}) to #62's body. Returns { body, newlyChecked, normalised }. */
export function applyChecks(body, results) {
  const manualAt = body.indexOf(MANUAL_SECTION_HEADING);
  const head = manualAt === -1 ? body : body.slice(0, manualAt);
  const tail = manualAt === -1 ? '' : body.slice(manualAt);
  const newlyChecked = [];
  let normalised = 0;
  const lines = head.split('\n').map((line) => {
    const un = UNCHECKED.exec(line);
    if (un) {
      const check = CHECKS.find((c) => un[1].includes(c.match));
      if (check && results[check.key] === true) {
        newlyChecked.push(check.key);
        return `- [x] ~~${un[1]}~~`;
      }
      return line;
    }
    const ck = CHECKED_NO_STRIKE.exec(line);
    if (ck) {
      normalised += 1;
      return `- [x] ~~${ck[1]}~~`;
    }
    return line;
  });
  return { body: lines.join('\n') + tail, newlyChecked, normalised };
}

/** Pure: true when no unchecked verifiable item remains in the head of the body. */
export function allVerifiableChecked(body) {
  const manualAt = body.indexOf(MANUAL_SECTION_HEADING);
  const head = manualAt === -1 ? body : body.slice(0, manualAt);
  return !head.split('\n').some((l) => {
    const un = UNCHECKED.exec(l);
    return un && CHECKS.some((c) => un[1].includes(c.match));
  });
}

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function tryJson(args) {
  try {
    return JSON.parse(gh(args));
  } catch {
    return null;
  }
}

function runChecks(repo) {
  const secrets = tryJson(['api', `repos/${repo}/actions/secrets`]);
  const repoInfo = tryJson(['api', `repos/${repo}`]);
  const protection = tryJson(['api', `repos/${repo}/branches/main/protection`]);
  let projectsScope = null;
  try {
    gh(['project', 'list', '--owner', repo.split('/')[0], '--limit', '1']);
    projectsScope = true;
  } catch {
    projectsScope = false;
  }
  const contexts = protection?.required_status_checks
    ? [
        ...(protection.required_status_checks.contexts ?? []),
        ...(protection.required_status_checks.checks ?? []).map((c) => c.context),
      ]
    : null;
  return {
    secret: secrets ? secrets.secrets.some((s) => s.name === 'GH_AUTOMATION_PAT') : null,
    autoMerge: repoInfo ? repoInfo.allow_auto_merge === true : null,
    branchProtectionTest: protection ? (contexts ?? []).includes('test') : null,
    codeOwners: protection
      ? protection.required_pull_request_reviews?.require_code_owner_reviews === true
      : null,
    discussions: repoInfo ? repoInfo.has_discussions === true : null,
    projectsScope,
  };
}

function main() {
  const repo = process.env.GITHUB_REPOSITORY ?? 'mohanpednekar/tens';
  const issue = JSON.parse(gh(['issue', 'view', String(CHECKLIST_ISSUE), '--repo', repo, '--json', 'body']));
  const results = runChecks(repo);
  console.log('Checklist verification results:', JSON.stringify(results));
  const { body, newlyChecked, normalised } = applyChecks(issue.body, results);
  if (body === issue.body) {
    console.log('#62: nothing to update.');
    return;
  }
  gh(['issue', 'edit', String(CHECKLIST_ISSUE), '--repo', repo, '--body', body]);
  console.log(`#62 updated: checked ${newlyChecked.join(', ') || 'none'}; normalised ${normalised} line(s).`);
  if (newlyChecked.length > 0 && allVerifiableChecked(body)) {
    gh([
      'issue', 'comment', String(CHECKLIST_ISSUE), '--repo', repo, '--body',
      'Every GitHub-API-verifiable item on this checklist is now done. The manual-only items remain; leaving open as a living document.',
    ]);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  try {
    main();
  } catch (err) {
    console.log(`::warning::verify-maintainer-checklist failed: ${err.message}`);
  }
}
