# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Tens** — a React incremental game. Every mechanic (costs, production, prestige) is themed around powers
of ten. Single page, no routing, no backend — state lives in React and is persisted to `localStorage`.

## Tech stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 19 | JSX transform enabled |
| Vite | 8 | OXC-based; JSX files **must** use the `.jsx` extension |
| Vitest | 4 | jsdom environment, globals enabled |
| styled-components | 6 | All component styling |
| Yarn | 1 (Classic) | `packageManager: yarn@1.22.22` via Corepack; lockfile is v1 format |

A stray `package-lock.json` is committed alongside `yarn.lock` (yarn warns about this on install) — use Yarn
for all dependency work, not npm.

## Commands

```sh
yarn install --frozen-lockfile   # CI does this; use plain `yarn install` locally after lockfile changes
yarn dev          # dev server → http://127.0.0.1:<port>/tens/
yarn build        # production build → dist/
yarn test         # run all tests once (Vitest)
yarn test:watch   # watch mode, host 127.0.0.1
yarn audit        # yarn npm audit --all --recursive
```

Run a single test file or test name with Vitest's own filtering:

```sh
yarn test src/game/engine.js.test.js       # single file (vitest run <path>)
yarn test -t "buyTier"                     # filter by test name
```

> **Critical:** Vite 8 uses OXC, which infers JSX from the file extension. Any file containing JSX **must**
> be named `.jsx`, not `.js`, or the build/tests will fail. Plain styled-components definitions (no JSX)
> stay `.js` (see `src/components/*/index.js`).

There is no configured lint script (`yarn lint` does not exist) and no CI job for linting — CI only runs
`yarn test`. `.github/workflows/deploy.yml` runs `yarn build` and publishes `dist/` to GitHub Pages on
push to `main`. Automated Copilot review on PRs is configured through GitHub's repository settings, not
an explicit workflow file.

## Pull requests

Always create a pull request after pushing changes to a branch — do not ask the user whether to
create one first. This applies to every change made in this repo, not just specific tasks.

Once anything is pushed to an open PR, stay on it: check CI status and review comments (human and
bot — Copilot, Codex, etc.), and address every actionable item — fix it directly if small and
confident, or ask first if ambiguous or architecturally significant. After pushing a fix, check
again, since new pushes can draw new comments. Keep repeating check → address → push until reaching
status quo (a pass with no new actionable comments and CI green, or only pre-existing/out-of-scope
failures left). Don't stop after a single round just because the latest round of comments was
addressed — the loop isn't done until nothing new shows up.

Keep PRs green through genuine fixes only — never `--no-verify`, never disable or delete a failing
test to make it pass, never weaken a check just to get past it. If a check itself is wrong, flaky, or
needs updating, fix the workflow/check definition instead of routing around it. This matters
increasingly as more of the merge process comes to rely on status checks being trustworthy (see
below).

Before merging any PR that touches `TIER_DEFINITIONS` or other economy constants/formulas in
`src/game/layers.js` (autonomous or interactive), run the `economy-change-review` skill
(`.claude/skills/economy-change-review/SKILL.md`): a narrow, mechanical cross-check of the diff
against the originating issue's approved spec table and Explicit Authorizations section — catching
drift (a wrong `baseCost` exponent, a mis-chained `producesResourceId`, a migration missing an old
tier id, an unauthorized economy change) that general code review doesn't specifically look for.
It supplements, not replaces, the ordinary review flow above.

For general review depth beyond that narrow economy check, a dedicated reviewer subagent is
defined at `.claude/agents/code-reviewer.md`: a comprehensive, adversarial, evidence-based review
of a PR or working diff — every finding verified against the checked-out code and cited by
`file:line` with a CONFIRMED/PLAUSIBLE confidence label, an explicit merge verdict
(APPROVE / NEEDS CHANGES / BLOCK), a checked-and-clean list of the invariants it verified, and an
honest statement of anything it didn't cover. It is read-only — it reports findings but never
edits code. Use it (spawn via the Agent tool) before merging any non-trivial change, or whenever
asked to review a branch/PR; when a diff touches economy surfaces it folds the
`economy-change-review` skill's cross-check in as one of its required steps rather than replacing
it.

## Automation workflows

Three workflows under `.github/workflows/` run Claude Code and GitHub automation unattended, working
together to open, fix up, and merge PRs with no human in the loop until an approval is needed — except
for a narrow, conservative class of low-risk bot-authored PRs that merge on green checks alone; see
"Auto-merge" below. All three authenticate git/GitHub operations with a `GH_AUTOMATION_PAT` repo secret
(a personal access token) instead of the default `GITHUB_TOKEN`. This isn't optional: GitHub does not let commits, pushes,
or merges authored by the default `GITHUB_TOKEN` trigger other workflows (an anti-recursion
safeguard) — with the default token, `ci.yml` would silently stop re-running on the bot's own pushed
fixes, and `deploy.yml` would silently stop firing when the bot's PRs get merged to `main`. Using a PAT
for these specific operations avoids that gap without any workaround.

The two Claude-invoking workflows (`autonomous-maintenance.yml`, `autonomous-pr-followup.yml`) also
need `id-token: write` in their `permissions:` block — `claude-code-action`'s `claude_code_oauth_token`
auth path requests a GitHub Actions OIDC token as part of its setup, and without that permission the
step fails immediately with "Could not fetch an OIDC token" before ever reaching the actual task.
`pr-auto-merge.yml` doesn't invoke Claude, so it doesn't need this. `autonomous-maintenance.yml`
additionally needs `issues: write` — an explicit `permissions:` block zeroes out everything unlisted,
and without the issues permission the guard step's `gh issue list --label claude-task` (which runs
with the default `GITHUB_TOKEN`) silently returns an empty backlog, so every run skips Phase A and
falls through to the Phase B menu.

**Cost implications:** this repo is public, so GitHub Actions minutes on standard runners are free and
unlimited — revisit this if the repo ever goes private, since minutes would then be metered. The real
constraint is Claude usage quota (`CLAUDE_CODE_OAUTH_TOKEN` is subscription-based, not pay-per-token
API billing): bounded per-run by `--max-turns` (50 for `autonomous-maintenance.yml`, 30 for
`autonomous-pr-followup.yml` — every tool call counts as a turn, and a real implement-test-PR run
needs 30–50 of them) as a best-effort proxy since there's no hard programmatic budget cutoff,
and naturally self-limited further by the PR-dedup guard (see below), which caps the number of
concurrently-open autonomous PRs. `autonomous-maintenance.yml`'s cap started at 25 and was raised in
two steps after two separate live failures: the first run under the new Phase A/B prompt hit
`error_max_turns` at only 26 turns / ~$0.79 of cost (25→40 — not enough headroom for the fuller
read-CLAUDE.md → choose → implement → test → commit → push → open-PR round trip), and a subsequent
Phase A smoke-test run (task issue #33) failed the same way even at 40 (40→50) — confirming every tool
call, not just each higher-level step, counts against the cap. `autonomous-pr-followup.yml` was raised
20→30 for the same reason. Watch actual usage against your plan's weekly quota and tighten
`--max-turns` (or pin a cheaper model via `claude_args`) further if runs consistently use too much, but
not below what a real task run needs (~30–50 turns), or every run will fail with `error_max_turns`
before finishing. Both Claude-invoking workflows set up Node 22 + Yarn via Corepack with dependency
caching before
invoking Claude (matching `ci.yml`), so `yarn install`/`yarn test` inside the agentic run don't waste
turn budget on toolchain setup.

### Orchestration model

The maintainer orchestrates; the scheduled workflow develops. Interactive Claude Code sessions are
primarily for strategy discussion and for turning that strategy into a backlog of well-defined,
run-sized tasks — GitHub issues labeled `claude-task`, created via the issue-form template at
`.github/ISSUE_TEMPLATE/claude-task.yml` (Goal / Context / Spec & acceptance criteria / Files likely
touched / Out of scope / Verification / Explicit authorizations / Dependencies). The scheduled
maintenance workflow then implements those tasks unattended, one per run, and the follow-up +
auto-merge workflows carry each PR to merge.

In an interactive session, when the user is discussing features, strategy, or a body of work, the
default deliverable is well-specified `claude-task` issues (created through the GitHub tooling), not
direct implementation — implement live only when the user explicitly asks for that. Write each issue
so an unattended 50-turn run can complete it without asking questions: one issue = one PR = one run.
Split anything bigger into a sequence of issues ordered with "Blocked by #N" lines in the Dependencies
section. An issue's optional "Explicit authorizations" section is the maintainer's written sign-off
for changes the workflow otherwise hard-bans (e.g. adding a tier to `TIER_DEFINITIONS`); security
constraints (no `--no-verify`, no editing other workflow files, never push to main, never self-merge)
can never be authorized away. Issues labeled `priority:high` jump the queue; otherwise tasks are
taken lowest-number-first. Whoever files a `claude-task` issue — a human, an interactive session, or
an automation run filing one itself (gap analysis, or bug-filing per #55) — should also assign a
`size:S`/`size:M`/`size:L` label using judgment about how much of the issue's Files/Spec surface it
touches; Phase A weighs this against its own remaining budget when picking (see Budget discipline
below).

**Milestones vs. the Project's `Track` field.** These are complementary grouping axes, not
duplicates. A GitHub Milestone targets a specific planned release and gets GitHub's native due-date
and automatic X/Y-closed progress tracking for free; a `Track` (the Project's grouping field — see
#53) groups issues by theme or dependency chain (e.g. "Byte-scale rename"), and can span multiple
releases. A `Track` can outlive any single Milestone; a Milestone pulls together whichever issues —
possibly from several Tracks — are actually planned for one release. Assign a player-facing
feature/economy issue to the milestone representing its next planned release when one exists; pure
process/infrastructure/automation issues typically don't need a milestone. Milestone creation and
issue assignment are GitHub metadata operations (`gh api repos/<owner>/<repo>/milestones`, `gh issue
edit --milestone`), not file changes.

### Automation design principles

Three conventions have guided this repo's automation design so far, mostly discoverable only by
reading old issues/PRs until now — writing them down here means a future session (interactive or
autonomous) doesn't have to rediscover them from scratch:

1. **Determinism-first.** Prefer a plain deterministic script over a Claude invocation whenever no
   genuine judgment is needed — a script is cheaper, faster, and can't drift in interpretation
   between runs. See `pr-auto-merge.yml`: its low-risk auto-merge path is a plain shell script with
   no Claude invocation at all, precisely because "is this diff small/safe enough to auto-merge" is
   a mechanical check, not a judgment call.
2. **Judgment-call transparency.** When a genuine judgment call is made on something the spec or the
   user didn't pin down, state the reasoning explicitly rather than deciding silently. See the
   Budget discipline section above: a run that scopes down or skips a task because of its own
   turn-budget estimate is required to note that reasoning in the PR description/issue comment, not
   just silently do less than the full spec.
3. **Conflict-avoidance sequencing.** When splitting a large body of work into a sequence of issues,
   chain them with a `Blocked by #N` line whenever two issues would edit the same lines/files — even
   without a strict *functional* dependency between them — purely to avoid two concurrently-open PRs
   conflicting over the same region. See the Orchestration model's "Split anything bigger into a
   sequence of issues ordered with 'Blocked by #N' lines" guidance above, and e.g. issue #69's
   dependency on #49 (both edit the same Phase A selection-logic prose here).

### Scheduled maintenance (`autonomous-maintenance.yml`)

Runs every 5 hours (cron `0 */5 * * *`, plus manual `workflow_dispatch`) via
`anthropics/claude-code-action@v1`. Each run does exactly one unit of work, chosen in three phases —
Phase 0 always outranks Phase A, which always outranks Phase B:

**Job conclusion vs. what the run actually did.** The action step's exit code alone misreports both
directions, so two follow-up steps re-align the job's red/green with reality by inspecting the
action's execution-output JSON (`$RUNNER_TEMP/claude-execution-output.json`):

- *Green that should be red:* the action exits 0 whenever the agent runs to completion — including
  a run that completed by giving up. This happened for real: three consecutive green runs each
  picked task #78, had every `Write` into `.claude/skills/`/`.claude/agents/` refused by the
  harness's unattended-session guardrail (creating new skill/agent files needs an interactive
  approval no one is present to grant), and ended having only left an issue comment — each burning
  a full run's quota, every 5 hours, indefinitely. The "Fail on denied file modifications" step
  now fails the job whenever the final result's `permission_denials` include a `Write`/`Edit`/
  `NotebookEdit` denial (a file the run wanted to change and couldn't); Bash denials stay
  non-fatal since allowlist misses are routine and worked around. To stop the every-5-hours retry
  loop itself, a run that hits an environment/permission blocker on a task issue also labels it
  `blocked` (created idempotently), and the guard step excludes `blocked`-labeled issues from the
  Phase A backlog — a human removes the label after unblocking (e.g. by creating the `.claude/`
  file interactively, where the approval prompt can actually be granted).
- *Red that should be green:* because `CLAUDE_CODE_OAUTH_TOKEN` is subscription-quota-based (see
  Cost implications above), a scheduled run can die on turn 1 with HTTP 429 ("You've hit your
  session limit") whenever the quota happens to be exhausted at fire time — purely transient, no
  work attempted, and the next 5-hourly run retries by itself. The Claude step therefore runs with
  `continue-on-error: true`, and the "Classify Claude step failure" step downgrades a final result
  with `is_error: true` and `api_error_status: 429` to a `::warning::` (job stays green), while
  any other failure — including `error_max_turns`, a real budget signal worth keeping red —
  re-fails the job as before.

**Budget discipline.** This is a side project — wall-clock time is not a constraint (one task every 5
hours is fine), but the per-run turn/token budget is. Before starting whatever task it picks, Claude
roughly sizes the work against its remaining turns, reserving a buffer of roughly the last 15-20% for
test + commit + push + PR-open overhead. If a task looks too large even after buffering, it scopes down
rather than attempting everything and risking `error_max_turns`: a Phase A task lands its largest
coherent, test-covered *slice* first (PR body says `Part of #<number>` instead of `Closes #<number>`,
and a `gh issue comment` on the task issue records what's done/what remains so the issue stays open and
eligible for a future run to continue); a Phase B menu task scopes down to one coherent sub-area (e.g.
one file) and leaves the rest for a future run under the same menu item. Either way, Claude opens the PR
as soon as there's a meaningful, test-passing first commit (not only at the end) and pushes each
subsequent commit as it lands, so a run that does get cut short by the turn budget still leaves real,
discoverable progress on a real PR instead of losing everything with the ephemeral runner. A task
issue's `size:S`/`size:M`/`size:L` label (see Orchestration model above) is a prior signal for this
sizing step — a run may prefer a `size:S`/`size:M` task it can actually finish over a `size:L` one
that's otherwise next in line, if its own estimate suggests a meaningful share of the budget is
already used. The label is advisory context, not a gate: a run isn't blocked from attempting a
`size:L` task anyway. Either way, skipping a task this way should be noted in reasoning/PR
description, not silent — the same transparency expected of impact-based reordering per #55.

**Reliability: cron dormancy.** GitHub Actions automatically disables a workflow's `schedule` (cron)
trigger after 60 days with no repository activity — if the `claude-task` backlog ever fully drained
and nothing filed new work for an extended stretch, `autonomous-maintenance.yml`'s cron trigger could
go dormant with no error or notification anywhere; GitHub just silently stops firing it. In practice
this is unlikely while the backlog stays active, since the automation's own merged PRs already count
as repository activity (resetting the dormancy clock), and Phase B menu item 6 (gap analysis) exists
specifically to keep proposing new work when the backlog thins. The actual backstop is external to
GitHub Actions entirely: a periodic check running on separate infrastructure — not subject to GitHub's
cron-dormancy rule, since manual/API `workflow_dispatch` always works regardless of whether the
`schedule` trigger is currently disabled — that notices if `autonomous-maintenance.yml` has gone quiet
longer than expected and manually re-kicks it via `workflow_dispatch`. This note documents the risk and
the mitigation that's actually in place; it doesn't overstate protection beyond that (the watchdog
mechanism itself lives outside this repo/issue system and isn't something a `claude-task` PR
implements).

**Phase 0 — CI/CD failures (top priority).** The guard step checks whether the latest completed
`ci.yml` run on `main` failed, and separately lists any open PR (excluding `claude/auto-*`, already
owned by the PR follow-up workflow below, and fork PRs) with a failing check. Either condition
outranks Phase A and Phase B outright — a broken `main` blocks every other PR from merging via the
required `test` check, so healing it is treated as more urgent than any feature or maintenance work,
and is the one case allowed to bypass the 5-PR ceiling described below (fixing a red `main` is never
redundant with an already-open PR). If `main` is broken, Claude reads the failing run's logs (`gh run
view --log-failed`), fixes the regression on a branch named `claude/heal-main-<short-slug>`, confirms
`yarn test`/`yarn build` are green again, and opens a PR — this branch prefix is already recognized by
`pr-auto-merge.yml`'s low-risk auto-merge path (see below), so a small fix can merge without waiting on
a human or the next run. Otherwise, if any non-`claude/auto-*` PR has a failing check, Claude picks one
to unblock: for a stale Dependabot PR (failing because its branch predates a source change its own copy
of the tests doesn't know about, not because of the dependency bump itself) that's confirmed behind
`main`, it comments `@dependabot rebase` to request Dependabot rebase its own branch — checking existing
comments first so it never re-requests a pending rebase, and never pushes its own commits to a
`dependabot/*` branch, which Dependabot alone owns. If the failure isn't just staleness, or it's some
other PR without an obviously safe fix, it's left for a human. If neither condition applies, the run
falls through to Phase A.

**Phase A — task backlog next.** The guard step passes the list of open `claude-task` issues
(number + title) into the prompt. If any exist, Claude picks the top eligible one — `priority:high`
label first, then lowest issue number; skipping tasks already covered by an open autonomous PR
(issue number in a `claude/auto-task-<number>-*` branch name or PR title) and tasks whose "Blocked
by #N" dependency is still open — reads its full spec with `gh issue view`, and implements it on a
branch named `claude/auto-task-<number>-<short-slug>`. The PR body includes `Closes #<number>` so
merging auto-closes the task, unless it's a partial slice per the Budget discipline note above. If the
chosen task proves infeasible for reasons other than size (ambiguous spec, can't get tests green),
Claude comments on the issue explaining what's blocking and ends without a PR instead of half-landing
it or falling through to another task.

**Phase B — maintenance menu fallback.** Only when no eligible task issue exists, the run picks the
single most valuable applicable task from:

1. Test coverage gaps
2. Dependency & security maintenance (`yarn audit` + safe patch/minor bumps)
3. Code quality / simplification
4. CLAUDE.md documentation sync
5. Workflow self-improvement — refine this task menu or the workflow file itself; scoped to editing
   `autonomous-maintenance.yml` only, and may not weaken the duplicate-PR guard, the turn/budget cap,
   the never-self-merge rule, the requirement to always open a PR, or Phase A's priority over this
   menu
6. Gap analysis — survey the repo for a gap not already covered by an open issue/PR (missing tests,
   stale docs, an unwatched CI/CD failure mode — Phase 0 above already covers a red `main` and
   stale/failing PRs, so this is for other gaps like `deploy.yml`/CodeQL failures going unwatched —
   an unaddressed dependency/security finding, a thin Phase A backlog) and file exactly one
   well-specified `claude-task` issue proposing a solution,
   matching `.github/ISSUE_TEMPLATE/claude-task.yml`'s structure and sized the same way a
   human-authored task would be. This task only proposes — it never opens a PR. The guard step
   separately surfaces currently-open issues labeled `gap-analysis` so a run can skip re-proposing an
   already-covered gap; new proposals get both the `claude-task` and `gap-analysis` labels (the latter
   created idempotently via `gh label create ... --force` if missing).

Adding new tiers to `TIER_DEFINITIONS` (and game-design/economy changes generally) is banned during
Phase B menu runs, and allowed in Phase A only when the task issue's "Explicit authorizations"
section explicitly permits that specific change — see the Orchestration model above. `--max-turns`
is capped (currently 50, raised in two steps from an initial 25 — see the Cost implications note
above) as a best-effort budget proxy, sized so a full implement-test-PR run fits since every tool call
counts as a turn; Claude Code has no hard programmatic budget cutoff, so watch actual usage against
your plan's weekly quota and tighten the cap if runs consistently use too much, but not below what a
real task run needs (~30–50 turns), or every Phase A run will fail with `error_max_turns` before
opening its PR.

PRs are minimised for *similar* work but not capped to one at a time: the guard step passes the list
of currently-open `claude/auto-*` PRs (branch + title) into the prompt, and Claude is instructed to
skip opening a PR that duplicates an already-open one's purpose, while still opening a separate PR for
a genuinely independent task (e.g. a dependency bump alongside an open docs-sync PR). A hard ceiling
of 5 concurrently-open autonomous PRs (one per task slot) is a safety net against runaway PR count,
skipping the run entirely once hit — except when Phase 0(a) applies (`main` is broken), which bypasses
the ceiling since healing `main` is never redundant with an already-open PR. If nothing remains in any
phase (all either done or already covered by an open PR), the run makes no changes and opens no PR.
`ci.yml`, `deploy.yml`, `autonomous-pr-followup.yml`, and `pr-auto-merge.yml` are all explicitly
denied to Claude's Edit/Write tools, even during the self-improvement task — only
`autonomous-maintenance.yml` may edit itself.

### PR follow-up (`autonomous-pr-followup.yml`)

Since no human (or live Claude Code session) is watching between scheduled runs, this workflow closes
the loop on PRs the maintenance workflow opens. It fires on new PR reviews, new PR comments, and
failing check suites, filters to PRs on `claude/auto-*` branches only, and re-invokes Claude
(`--max-turns 30`) to read the actual feedback/CI failure and push a genuine fix to the *existing*
branch — it never opens a new PR and never merges or approves. Same hard constraints as the main
workflow (no `--no-verify`, no faking a check green, no touching other workflow files).

Because it's triggered by events that can fire on any PR (including one opened from a fork), it
resolves the target branch via `gh pr view --json headRefName,isCrossRepository` rather than trusting
`github.event.*` fields directly, and refuses to check out anything where `isCrossRepository` is true
— a fork branch can be named anything, including something that merely looks like `claude/auto-*`.
All untrusted event fields are passed through `env:` rather than interpolated straight into the shell
script, to avoid script injection via a crafted branch/comment. On top of that, the job itself has a
native `if:` gate requiring the triggering `issue_comment`/`pull_request_review` author to have write
access (`author_association` in `OWNER`/`COLLABORATOR`/`MEMBER`) before checkout ever runs — on a
public repo, anyone can comment on or review a PR without write access, which is the standard "pwn
request" surface for privileged workflows on these trigger types; a runtime bash check alone isn't
visible to CodeQL's static analysis, so this authorization check needs to live in the workflow YAML's
`if:` to actually register as a mitigation. Checkout is pinned to the exact commit SHA
(`headRefOid`) resolved at the same time as the authorization check, not the branch name — the branch
is mutable, so re-resolving "the current tip" at checkout time would reopen a TOCTOU window between
authorization and execution; a SHA is immutable. Since that leaves a detached HEAD, the prompt has
Claude run `git checkout -B <branch>` before committing so it can push back normally.

### Auto-merge (`pr-auto-merge.yml`)

Two independent paths, either of which calls `gh pr merge --auto --squash` to enable GitHub's native
auto-merge (the PR merges by itself once its required status checks pass, with no human needing to come
back and click merge):

1. **On human approval** (`pull_request_review: submitted`) — if the review is an approval from the repo
   owner or a collaborator/member, auto-merge is enabled unconditionally, any PR, any size. This applies
   repo-wide, not just to autonomous PRs, and is unchanged from the original design.
2. **On green checks, without waiting for approval** (`check_suite: completed`, conclusion `success`) —
   for PRs on our own automation's branches only (`claude/auto-*`, `claude/self-heal-*`,
   `claude/heal-main-*`, `dependabot/*`; never a fork, checked via `isCrossRepository`), auto-merge is
   enabled immediately once the diff meets a conservative "low risk" bar: the whole diff touches only
   `CLAUDE.md`/`*.test.js`/`*.test.jsx` (docs/tests-only), OR the total changed lines is ≤50, OR it's a
   Dependabot PR whose title shows a patch/minor semver bump (major-version bumps still wait for
   approval). A PR that touches anything under `.github/workflows/` is **always** excluded from this
   path regardless of size or content — workflow-file changes are the CI/CD trust boundary itself and
   always get a human's eyes, matching how every Claude-invoking workflow already treats those files as
   specially protected. This path is a plain shell script (no Claude invocation) for speed and
   determinism, and is safe even if its heuristics ever mis-fire early: `gh pr merge --auto` doesn't
   merge immediately, it only enables auto-merge, which still waits on the real required `test` check
   from branch protection either way. That exclusion is enforced entirely by this script's own `if`
   logic, so it's backed by a second, structural layer independent of the script staying correct: a
   `.github/CODEOWNERS` entry maps `.github/workflows/**` to the repo owner, and once branch protection
   requires Code Owner review (see the manual prerequisite below), GitHub itself blocks any workflow-file
   PR from merging without that review — defense in depth, not a replacement for the script-level check.

**Three one-time manual prerequisites**, since none is settable through the tools available to a
Claude Code session:
- Add the `GH_AUTOMATION_PAT` repo secret described above (fine-grained PAT scoped to this repo,
  Contents: read/write, Pull requests: read/write, Issues: read/write — the Issues permission is
  what lets the maintenance run's `gh issue view`/`gh issue comment` read a `claude-task` spec and
  report an infeasible task), alongside the existing `CLAUDE_CODE_OAUTH_TOKEN`.
- Enable "Allow auto-merge" in repo Settings → General, and add branch protection on `main` that
  requires the `test` check from `ci.yml` to pass before merging. Without a required check,
  `gh pr merge --auto` has nothing to wait on and may merge immediately rather than "once green" —
  the whole point of this workflow depends on `ci.yml` actually being wired up as a required check.
- Enable "Require review from Code Owners" in that same branch-protection rule on `main`, so the
  `.github/CODEOWNERS` entry above actually takes effect (tracked in issue #62's checklist until
  confirmed done).

## Documentation

Always update this file (`CLAUDE.md`) in the same change/commit as any code change it describes —
don't leave it as a follow-up. If a change touches function signatures, constants, state shape,
economy/game-rule behavior, file layout, or test counts documented below, update the corresponding
section here before considering the change done. A code change and a stale doc describing the old
behavior should never ship together.

## Repo layout

```
src/
  game/
    layers.js             ← TIER_DEFINITIONS array + all game constants (single source of truth)
    engine.js              ← pure state functions (no React, no side effects)
    useIncrementalGame.js  ← React hook; wires the engine to useState + localStorage + the tick timer
    storage.js              ← localStorage save/load/clear + save-schema migration, plus the separately
                               keyed last-save timestamp used to compute offline progress
  components/
    Button/index.js        ← styled button; every caller passes `color` explicitly (no defaultProps —
                               React 19 dropped defaultProps support for function components, so it's a
                               silent no-op there), plus optional progress-fill props (`$progress`,
                               `$secondaryProgress`, `$progressColor`, `$secondaryProgressColor`, `$pulse`)
                               rendered as an on-button gradient fill (reduced alpha when `disabled`, see
                               below), a `:focus-visible` outline colored from the button's own `color`
                               prop, and no opacity-based disabled dimming (color + cursor signal disabled
                               state instead — opacity dimming compresses text/background contrast
                               together, regardless of color choice); also exports `VisuallyHidden`, a
                               clip-hidden node used both for a nested `role="progressbar"` and for
                               supplementary `aria-describedby` text
    Money/index.js          ← styled money/amount display
    StatCard/index.js       ← styled card container used for every panel
  pages/
    MainPage/index.jsx      ← single page; compact one-line-per-tier layout, data-driven from TIER_DEFINITIONS
  theme/
    tokens.js               ← design-token single source of truth: per-mode (dark/light) color, shadow &
                               tier-accent sets + mode-independent space/radius/motion/font/type scales;
                               exports buildTheme(mode) + themes.{dark,light} (see "Theming" below)
    GlobalStyle.js          ← createGlobalStyle: box-sizing reset, base font/smoothing, form `font: inherit`,
                               and the token-driven page background/text (absorbs the removed index.css/App.css)
    index.jsx               ← <ThemeProvider mode> wrapper (styled-components ThemeProvider) + re-exports;
                               `mode` defaults to dark and is the seam #140 will drive from system pref + toggle
  App.jsx                   ← root component; wraps <ThemeProvider><GlobalStyle/><MainPage/> 
  index.jsx                 ← ReactDOM.createRoot entry point
vite.config.js               ← path aliases + dev/test server config
```

## Architecture

Strict three-layer separation:

1. **`engine.js`** — all game logic is pure functions of `(args) => state => newState`, with no React and
   no side effects. Every mutation returns a new state object; invalid actions (can't afford, tier locked)
   return the *same* state reference unchanged, which callers use as a no-op signal (see `tickGame`'s
   autobuyer loop, which breaks as soon as `buyTier` returns the same object back).
2. **`useIncrementalGame.js`** — the only place holding React state. Owns the `setInterval` tick timer and the
   localStorage persistence effect, and exposes
   `{ state, actions, resetGame, offlineProgress, dismissOfflineProgress }`. Every purchase — manual Buy and
   autobuyer ticks alike — always batches up to the current 10-unit cost-block boundary, via a fixed
   module-scoped `BUY_QUANTITY = 10` constant passed into `tickGame` as `autobuyerBatchSize` and into
   `actions.buyTierQuantity`; this used to be a player-facing ×1/×10 "Bulk" toggle (removed from the UI —
   see MainPage below), and `BUY_QUANTITY` simply preserves its former default as the only behavior, with
   no persisted preference left to manage. On mount, a one-time
   `computeInitialGame` helper (module-scoped, not itself a hook) loads any saved state, reads
   `loadLastSaveTimestamp()` (see `storage.js`), and — if the elapsed real time since that timestamp is long
   enough to register at least one simulated second — folds in offline progress via `applyOfflineProgress`
   (see "Offline progress" below) before the first render, and records a one-shot
   `{ elapsedRealSeconds, effectiveSeconds }` summary as `offlineProgress` for the UI to report;
   `dismissOfflineProgress` (and `resetGame`) clear that summary back to `null`. This all happens once, before
   the regular tick timer starts — it is not re-evaluated on every render.
3. **`MainPage/index.jsx`** — a pure renderer driven entirely by `TIER_DEFINITIONS` and the hook's `state`;
   renders each unlocked tier as a single compact row rather than separate cards, showing `Owned` (current
   amount, drives production) as its own figure, while `Purchased` (lifetime buy count, drives both cost
   and — every 10 of them — a production doubling, see `getPurchaseMilestoneMultiplier`) has no separate
   cell: it's shown as a `Lv.N` prefix on the Buy button's own visible text (and a `(level N)` suffix in
   its `aria-label`), since Buy is the action that raises it — the player-facing term is "level" (it only
   ever increases and gates both cost and production milestones), while the underlying state
   field/variable/function names (`state.purchased`, `getTierPurchasedCount`,
   `getPurchaseMilestoneMultiplier`) are unchanged.
   Money is displayed once, at the top, via `formatCurrency` (comma-grouped `$` format below 1,000,000,
   exponential above), in a centered `CenteredCard` (`styled(StatCard)` with `align-items: center;
   text-align: center`) — the Prestige Point balance display shares the same `CenteredCard`, making
   them the only top-of-page blocks besides `Header` that are centered rather than left-aligned.
   Both balance cards are wrapped in a `StickyBalances` (`position: sticky`) container so they stay
   visible at all times: once the page scrolls past their normal position they pin to the viewport
   top and compress into a compact side-by-side bar (smaller font/padding, row layout), detected via
   an IntersectionObserver on a zero-height `BalancesSentinel` rendered just above the pair — CSS
   alone can't detect "currently stuck", and the sentinel's negative margin cancels the extra
   `RootDiv` flex-gap slot it would otherwise add. The observer effect guards for environments
   without IntersectionObserver (jsdom in tests), where the balances simply stay expanded; when the
   fixed `TopPrestigeBar` is showing, the stick position drops below it instead of underlapping it.
   Description prose is kept out of the always-visible page: the Speed Up and Prestige cards' full
   explanations, and the full-smart-autobuyer notice's, live inside an `InfoDetails` (`styled.details`)
   click-to-expand disclosure — the clickable `<summary>` is the card's own `<h2>` heading (or the
   notice's one-line label), so the section reads minimal until clicked. The Prestige card's status
   lines (prestiged count · unspent PP · speed bonus) live inside the disclosure too, not just the
   description — collapsed, the card is nothing but its heading and buttons. The disclosure marker (▸)
   is hidden (`list-style: none` + `::-webkit-details-marker`), deliberately leaving no inherent visual
   clue that the heading expands — players discover it by clicking; screen readers still announce the
   summary's collapsed/expanded state. Native `<details>`/`<summary>`
   needs no JS state, and the collapsed content stays in the DOM, so the Speed Up/Prestige buttons'
   `aria-describedby` references into it (and `toHaveTextContent`-based tests) resolve whether or not
   the section is expanded. It no
   longer shows an aggregate `+X/sec` line beneath the balance (previously summed `owned` across every
   money-producing tier); each tier row's own `+X` production figure (the raw per-delivery batch amount —
   see "Tier production tickspeed" above) is the per-tier replacement for that figure, and there is no
   top-level aggregate anymore. Manual Buy always grabs as many units as are currently affordable up to the 10-unit
   cost-block boundary (via `getTierAffordableQuantity`/`buyTierQuantity`) — there is no player-facing
   batch-size control; a ×1/×10 "Bulk" toggle previously exposed this as a choice, but has been removed
   from the UI (see `useIncrementalGame`'s `BUY_QUANTITY` above), leaving ×10 as the only, fixed behavior.
   The Buy button itself renders its cost-block progress as an on-button gradient fill (green = units
   already bought in the current 10-unit cost block, `purchased % 10`; amber = units affordable right now
   but not yet bought, `getTierAffordableQuantity(tier, purchased, spendable, 10)`) via `Button`'s
   `$progress`/`$secondaryProgress` props, instead of a separate bar below it. The Buy button and
   the Prestige button carry the same
   fill treatment (single-tone: spendable-resource ÷ cost for Buy, `prestigeProgressPercent`
   for Prestige), and both also pulse (`$pulse`) when currently actionable. Every PP-spending
   button (the per-tier Unlock/Smart buttons, Auto Speed Up, Unlock Speed Bonus, and Auto-Prestige —
   all living on the PP Upgrades page, see below) carries the same single-tone fill too — unspent
   PP ÷ that button's cost (`ppProgressPercent` in
   `MainPage`), in the button's own accent color — each nesting the usual `VisuallyHidden`
   `role="progressbar"` (`aria-valuenow` = the PP balance capped at the cost, `aria-valuemax` = the
   cost). Buy/Prestige/
   Reset render compact *visible* text — an icon in place of the action word (🛒 Buy,
   ✦ Prestige, ↺ Reset) plus the cost, and (via `formatCost`) the paying tier's short `RESOURCE_SYMBOL`
   (e.g. `Ks`) instead of its full name (e.g. `Thousands`) — while each button's `aria-label` still carries
   the full descriptive sentence (`"Buy ×10 for $100"`, `"Prestige (requires 1
   Googol Money)"`, `"Reset game"`, …) used by assistive tech and by tests that query `getByRole('button', {
   name })`.

   **Game view vs. PP Upgrades view.** `MainPage` renders one of two views, toggled by a local
   `useState('game' | 'upgrades')` — still a single-page app with no router (see "Tech stack" above);
   the toggle is just which JSX block renders, not a URL change. A `ViewNav` tab pair
   (`role="tablist"`, each tab a native `role="tab"` button) only appears once `!isFirstRun` — there
   is nothing to switch to before the player's first prestige, since every control on the PP
   Upgrades view spends Prestige Points, which don't exist as a concept until then (see "Prestige
   info is hidden until first prestige" below). The PP Upgrades tab shows a small `NavDot` (a
   filled circle, `aria-label="PP upgrade available"`) whenever `hasAffordablePpUpgrade` is true —
   unspent PP can afford at least one purchase over there (any tier's Unlock/Smart, the revealed
   speed-bonus unlock, Auto Speed Up, or a revealed Auto-Prestige) — so the player knows to check
   in without opening the page on spec every time. Money and Prestige Point balances
   (`StickyBalances`) stay visible across both views; `TierList`, `SpeedUpCard`, `PrestigeCard`, and
   the Reset button are Game-view-only, and every PP-spending control lives on the Upgrades view
   instead (see below) — this is the "redistribution" that reclaimed the tier row's old `automate`
   grid column (see the grid layout paragraph below).

   **Tickspeed multiplier (Game view, per tier).** Once a tier's autobuyer has been unlocked via
   Prestige Points (see "Autobuyer unlock and the tickspeed multiplier" below), its tier row gains a
   Money-funded `UpgradeButton` in the same grid slot the old "Upgrade"/"Unlock" button used to
   occupy — nothing renders there at all before unlock, since there's no tickspeed level to buy
   yet. Clicking it spends `getTickspeedMultiplierCost(tierId, currentLevel + 1)` of the tier's own
   resource via `actions.buyTickspeedMultiplier`, raising that tier's tickspeed level by 1 — each
   level compounds the tier's own production by another 10% (see
   `getTickspeedProductionMultiplier`); it has **no effect** on how often the autobuyer attempts a
   purchase (that rate is now flat — see "Autobuyer unlock and the tickspeed multiplier" below for
   why this used to be the opposite). Visible text is `⚙ +10% {cost} {symbol}` (the marginal effect
   of *this* purchase, always +10% since each level always costs another factor of that tier's
   base — see below); `aria-label`/`title` spell out the full sentence ("Tickspeed multiplier (+10%
   production) for …"). A compact badge beside the tier name (`GreenText`, gated on the
   *cumulative* bonus being > 0%, i.e. tickspeed level > 1) shows `⚙ +N%` — the cumulative
   production bonus as a whole percent, e.g. `⚙ +21%` at level 3 — replacing the old `⚙ ×1.1`
   purchase-speed-multiplier badge format; "+N%" was chosen over "×N" specifically because the
   badge no longer represents a purchase-frequency multiplier at all. Both the badge and button's
   `title` spell out the raw tickspeed level number for anyone who wants it, exactly as the old
   Upgrade level did.

   **PP Upgrades view.** Everything Prestige-Point-funded lives here instead of on the tier rows or
   inside `SpeedUpCard`/`PrestigeCard`. A `UpgradesList` of `UpgradeRow`s (one `StatCard`-based row
   per item, name on the left, a single `PpUpgradeButton`/`PpUpgradeBadge` on the right) shows, per
   unlocked (`isTierUnlocked`) tier — skipping already-`isSmart` tiers — either:
   1. **Unlock** (blue, 🤖): spends Prestige Points via `actions.buyAutobuyerUnlock`, cost from
      `getAutobuyerUnlockCost` — see "Autobuyer unlock and the tickspeed multiplier" below. Unlike
      the old Automate button, there is **no special-casing for the first tier** — every tier,
      including `tier01`, unlocks its autobuyer the exact same way, since there's no separate
      Money-funded activation step to bypass anymore.
   2. Once unlocked, the row immediately shows **Smart** (purple, 🧠) instead — spends Prestige
      Points via `actions.buySmartAutobuyer`, cost from `getSmartAutobuyerCost` (10x that tier's
      unlock cost). Smart *requires* the autobuyer already be unlocked (enforced in
      `buySmartAutobuyer` itself, not just the UI) — it's the next purchase in one progression, not
      a parallel one, so a tier's row only ever shows one button at a time: Unlock → Smart → (once
      bought) the row disappears entirely, since there's nothing left to buy for that tier
      specifically.

   Once *every* tier is smart (`allTiersSmart`, `TIER_DEFINITIONS.every(...)`), the per-tier list is
   replaced by a single "full smart autobuyer notice" `StatCard` explaining why, rather than an
   empty list. Below the per-tier section, four global rows always render (each independently
   gated, same conditions as before this restructure): **Production speed bonus** (once
   `speedBonusRevealed`, hidden once bought — see "Prestige info is hidden until first prestige"
   below), **Auto Speed Up** (a `PpUpgradeBadge` reading "🔁 Active" once bought, otherwise a
   button — no longer tied to the last tier being unlocked, since it's just another PP purchase on
   this page now, gated only on `!isFirstRun`), **Global Tickspeed Multiplier** (a leveled upgrade,
   gated only on `!isFirstRun` like Auto Speed Up — see "The global tickspeed multiplier" below),
   and **Auto-Prestige** (only once `allTiersSmart`, showing its current level inline in the row's
   name cell when active, same cost/behavior as before).

   **Speed Up / Prestige cards stay visible once revealed (Game view).** `SpeedUpCard` used to
   disappear again the moment a successful Speed Up reset `owned` and re-locked the last tier —
   CLAUDE.md's "Speed Up" section below documents this as the expected old behavior. It no longer
   does: a `speedUpEverRevealed` boolean (`useState`, seeded from `lastTierUnlocked` at mount,
   latched to `true` forever once `lastTierUnlocked` is ever true via a `useEffect`) drives the
   card's render condition instead of the live `lastTierUnlocked` check — once shown, the card
   stays shown, with its Speed Up button simply going disabled (`canSpeedUp` already accounted for
   this) rather than the whole card vanishing. `PrestigeCard` gets the identical treatment via a
   `prestigeCardEverRevealed` flag seeded from (and latched to) `!isFirstRun ||
   getTierPurchasedCount(state, lastTier.id) >= 10` — relevant only during the first run, since a
   Speed Up can otherwise wipe `tier10`'s purchase count back below 10 before the player's first
   prestige. Both flags reset back to their initial (unrevealed) value only on a full Reset
   (`handleResetClick` explicitly clears them alongside `resetGame()`), never on an ordinary Speed
   Up or Prestige — those are exactly the actions this change is meant to stay visible through.
   Because each PP-spending button also nests a `VisuallyHidden` span carrying the real
   `role="progressbar"`
   (`aria-valuenow`/`aria-valuemax`) for assistive tech, the explicit `aria-label` on the button itself is
   required regardless of the visible/accessible-name split above — without it, the accessible-name
   computation would recurse into the nested node and pick up its label too. Buy/Prestige/
   Reset all carry a `title` tooltip explaining their effect in plain language;
   the Prestige and Reset buttons additionally wire `aria-describedby` to a visible (Prestige) or
   `VisuallyHidden` (Reset) description, since those two are the app's only irreversible actions and their
   most important fact (resources get wiped) previously lived only in a mouse-hover `title` — the other
   `title` usages genuinely just restate what's already visible/in the `aria-label`, so they were left as-is.
   Each `TierLine` also gets a thin `border-left`
   accent color cycled from a fixed palette by `tierIndex % length` — cosmetic scanability only, kept off
   text/button colors so it never collides with the white/green/gold/darkgrey affordability semantics — and
   plays a one-shot CSS "reveal" animation (`$animateReveal`) when a tier unlocks *during the current
   session*, but not for tiers already unlocked before page load: since locked tiers render `null`, every
   unlocked row technically "mounts" on every page load, so a `useState(() => new Set(...))` baseline
   snapshot of which tier ids were already unlocked at mount time (captured once, from whatever
   `loadGameState()` returned) is compared against on each row to decide whether to animate, rather than
   relying on mount timing alone.
   Each tier row is a CSS Grid with fixed `grid-template-areas`/`grid-template-columns` — the same 2-row
   areas at every viewport width: name (+ compact `⚙ +N%` tickspeed badge, now spanning the first
   two tracks to absorb the width the removed `automate` column used to occupy), the owned count,
   and the production figure on the top line, then just the two buttons on the bottom line, the
   tickspeed multiplier button and Buy each spanning two
   of the four tracks whose widths sum to equal halves (col1+col2 = col3+col4), so each button takes
   exactly half the row's width. Below the `40rem` breakpoint only fonts/spacing shrink and the column
   weights shift (still summing to equal halves). The owned cell shows the bare count with no visible
   label at any width — its "Owned: " prefix is a `VisuallyHidden` span (plus a `title="Owned"`
   tooltip), staying in the DOM for assistive tech, so tests assert it via `toHaveTextContent` on the
   layer card rather than `getByText`, which only matches single text nodes. Fixed areas rather than
   flexbox content-based
   sizing means a field's on-screen position depends only on viewport width, never on how many digits its
   value has (or on whether the tickspeed multiplier button currently has anything to render — it
   stays reserved even when empty, same principle the removed `automate` area used to follow).
   `TierName` is a flex pair — the name label never shrinks
   (`flex-shrink: 0`; it's the anchor the row is scanned by) and the badge beside it ellipsizes first
   if the track runs out. Buy sits to
   the right of the tickspeed multiplier button in both layouts — Buy is the button clicked
   constantly, the tickspeed button only
   occasionally, so the more-clicked control gets the rightmost (thumb/cursor-resting) position. Grid cells use
   a shared `gridCell` mixin (`min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`)
   as a safety net against content forcing a column wider than its track. `RootDiv` sets
   `font-variant-numeric: tabular-nums` so digits render at a uniform width. When the hook reports a non-null
   `offlineProgress` (see "Offline progress" below), a dismissible `OfflineNoticeCard` (`styled(StatCard)`,
   "Welcome back! …", formatted via `formatOfflineDuration`) renders above the money display; it never
   reappears once dismissed (or once the state is reset) since it's a one-shot summary of what happened
   between this load and the last, not a recurring status. It also self-dismisses: a countdown starting at
   `OFFLINE_NOTICE_AUTO_DISMISS_MS` (10s, a UI-only timing constant local to `MainPage`, not a game/economy
   value) drives both the Dismiss button's own `$progress` fill (grey, ticking down every
   `OFFLINE_NOTICE_PROGRESS_INTERVAL_MS` via a plain `setInterval` computing `remaining/total` from two
   `Date.now()`-based timestamps in `offlineNoticeTiming` state — not a CSS transition, matching the
   codebase's established on-button-fill convention rather than reintroducing the removed tick-progress
   ring's animation machinery) and, once it reaches zero, an opacity fade (`OFFLINE_NOTICE_FADE_MS`, 400ms)
   before `dismissOfflineProgress` actually removes it. Clicking the notice card itself (not the Dismiss
   button) extends the deadline to `OFFLINE_NOTICE_EXTENDED_DISMISS_MS` (60s) *from that click*, not merely
   +60s on top of whatever remained — `handleOfflineNoticeClick` simply re-seeds `offlineNoticeTiming` with
   a fresh start/end pair, which the countdown interval effect (keyed on that state) picks up immediately.
   The Dismiss button's own click handler calls `event.stopPropagation()` so dismissing doesn't also bubble
   into the card's extend handler on its way out. The countdown interval effect is guarded on
   `offlineProgress` itself (not just the timing state) so it — and its `setInterval` — actually stops the
   instant the notice is dismissed by any path (manual click or the auto-fade), rather than leaking a timer
   that runs forever in the background once the card is gone.
   Once `isProductionFrozen(state)` is true, every control except Prestige disables and the Prestige UI
   itself switches to one of two presentations depending on prestige history — see "Prestige and the
   Googol freeze" below for the full mechanism.

### Economy model

There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Tens` through `Octillions`. `id` is a naming-agnostic key, fully decoupled from `name`/
`symbol` — a future re-theme only needs to touch `name`/`symbol`, never state keys, tests, or save data.
**Every tier is bought directly with `Ones` (money)** — `costResourceId` is `MONEY_ID` for all of them.
Once owned, a tier produces the tier immediately below it (`producesResourceId`), cascading production
down to `Ones`. `tier01` (`Tens`) is the special case where `costResourceId === producesResourceId ===
MONEY_ID`: it's the entry-level generator, bought with money to produce more money.

A tier unlocks once you own **≥ 10** of the tier below it (`isTierUnlocked`); already-owned tiers stay
unlocked even if the rule changes later, so old saves stay playable.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js` — needs a naming-agnostic `id` (next in the
`tier0N`/`tierNN` sequence), `name`, `symbol`, `baseCost`, `costResourceId: MONEY_ID`,
`producesResourceId` set to the previous tier's `id`, and `baseTickSpeedSeconds: 1` (matching every other
tier — see "Tier production tickspeed" below for why every tier shares this value rather than each new
tier getting a slower one). No other file should need changing — the page and engine are meant to be
fully data-driven from that array.

### Tier production tickspeed

Each tier has its own **independent base tickspeed** — a plain `baseTickSpeedSeconds` field directly on
its `TIER_DEFINITIONS` entry in `layers.js` (read via `getTierBaseTickSpeedSeconds`), not a value derived
from tier order or any shared formula — so any single tier's cadence can be tuned directly by editing
that one field, without touching any other tier or a shared formula. It's how often, in seconds, that
tier delivers a single batch of production rather than continuously every global tick (the global tick
itself fires every `TICK_RATE_MS` — 100ms/10Hz, see below — a much finer granularity than any tier's own
tickspeed, so every tier takes multiple ticks to accumulate one delivery). **Every tier is currently set
to the same 1s value**, rather than each subsequent tier getting a slower one (an earlier design had
`tier02` = 2s, `tier03` = 3s, … `tier10` = 10s) — because this is **not** balance-neutral: each completed
tick period delivers exactly one tick's worth of production (`owned × multipliers`), not one second's
worth per elapsed second within it, so a tier's real per-second throughput is divided by its own
tickspeed. Dividing later tiers' throughput by up to 10x, stacked on top of `getTierCost`'s
Fibonacci-driven cost curve (see above), made a full run unable to reach `GOOGOL` within any practical
amount of time — confirmed empirically with the `simulate-run-times` skill, which showed every tested
starting Prestige Point balance (0–5000, i.e. up to +5000% production speed) still hitting the
simulator's safety cap without reaching Googol. Since `baseTickSpeedSeconds` is still a plain explicit
per-tier field rather than a computed one, nothing prevents a future tier (or a future upgrade) from
setting any tier's tickspeed independently of every other tier's — the uniform-1s state is a balance
choice, not a structural constraint the field itself enforces. `MainPage` doesn't show this as an
averaged `/sec` rate — see "Production figure" below for what it shows instead.

The mechanism lives entirely in `tickGame` (`engine.js`): `state.tierProductionAccumulators` banks
fractional seconds per tier (see "Game state shape" below), incremented by `elapsedSeconds` every tick.
Once a tier's accumulator reaches its own `getTierBaseTickSpeedSeconds`, `tickGame` delivers
`floor(owned × (however many whole tickspeed periods have elapsed) × getPrestigeProductionMultiplier(points) ×
getPurchaseMilestoneMultiplier(purchased))` — note this multiplies by the *count* of completed periods, not
the number of seconds they span, and the result is floored (see "Multiplier outcomes are floored" below) —
and keeps any leftover remainder banked for the next tick. In the running app, `elapsedSeconds` is
`TICK_RATE_MS / 1000` (0.1, i.e. 10 ticks/sec — see `TICK_RATE_MS` below) per live tick; during
offline-progress replay `applyOfflineProgress` calls `tickGame(1, …)` once per simulated second instead
(unrelated to `TICK_RATE_MS` — see "Offline progress" below). Either way, a tier with tickspeed *N*
(seconds) simply accumulates without producing until `N` seconds' worth of `elapsedSeconds` have banked,
then delivers exactly one tick's worth (not *N* seconds' worth) — an *N*x reduction in throughput compared
to producing every second. Because ticks now arrive in fractional (0.1s) increments rather than whole
seconds, repeatedly summing `elapsedSeconds` is subject to IEEE-754 floating-point drift (ten additions of
`0.1` land on `0.9999999999999999`, not exactly `1`) — `tickGame` nudges the threshold comparison by a
tiny `TICK_ACCUMULATION_EPSILON` (`1e-9`) constant to absorb this, so a delivery still fires on schedule
instead of being delayed by a stray tick. The same epsilon is applied to the autobuyer and Auto-Prestige
attempt-budget threshold checks below, for the same reason.

#### Multiplier outcomes are floored

`owned` and `resources` are integer-valued by construction: they start at integer values
(`createInitialGameState`) and only ever change by integer purchase/cost amounts or by a production
credit — so a production credit must itself always be an integer to preserve that invariant. Of the
factors that make up a tier's production credit (`owned × ticksElapsed × multiplier ×
speedUpMultiplier × getPurchaseMilestoneMultiplier(purchased) × getTickspeedProductionMultiplier(autobuyers[tier.id]) ×
getGlobalTickspeedProductionMultiplier(globalTickspeedMultiplier)`,
where `multiplier` is
`getPrestigeProductionMultiplier(points)` once `prestigeSpeedBonusUnlocked` is true, or a flat `1`
before then, and `speedUpMultiplier` is `getSpeedUpMultiplier(speedUpCount)` — see "Speed Up"
below), `owned` and `ticksElapsed` are already integers, and `getPurchaseMilestoneMultiplier`/
`getSpeedUpMultiplier` are always powers of 2 — the factors that can be fractional are
`getPrestigeProductionMultiplier` (`1 + 0.01 × points`, non-integer whenever `points` isn't
a multiple of 100), `getTickspeedProductionMultiplier` (`1.1^(level - 1)`, non-integer at any level
above 1), and `getGlobalTickspeedProductionMultiplier` (`1.1^level`, non-integer at any level above
0). `tickGame` wraps the whole product in `Math.floor(...)` before crediting it, so a fractional
Prestige Point bonus (e.g. 50 unspent points → ×1.5) or either tickspeed bonus (e.g. per-tier level 3
→ ×1.21, global level 2 → ×1.21) rounds
*down* to a whole unit rather than crediting
a fraction — since all three multipliers are always ≥ 1, this never zeroes out production for a tier
with `owned > 0`. `MainPage`'s displayed production preview (each tier row's `+X` figure) mirrors this same
`Math.floor(...)`, so the figure shown always matches what will actually land once the tier's tickspeed
period completes, rather than showing a fraction that never materializes. This
"floor the outcome of any multiplier" policy is why the rate-accumulator constants elsewhere
(`getAutoPrestigeAttemptRate`, and the cost-scaling multipliers like
`getAutobuyerUnlockCost`/`getSmartAutobuyerCost`/`getAutoPrestigeCost`/`getGlobalTickspeedMultiplierCost`) are unaffected: the cost
values are always already integers, and the attempt-rate multiplier is process
bookkeeping (a fractional purchase-attempt *budget*, intentionally banked across ticks — see "Tier
production tickspeed" above and "Prestige Points, autobuyer unlock, and the tickspeed multiplier"
below) rather than a resource
total shown to the player, so flooring them would break the banking mechanism itself rather than serve
this invariant.

#### Production figure (tick-progress ring removed)

Each tier row's `+X` production figure is the raw per-delivery credit (`owned ×
getPrestigeProductionMultiplier(points) × getPurchaseMilestoneMultiplier(purchased) ×
getTickspeedProductionMultiplier(autobuyerLevel) × getGlobalTickspeedProductionMultiplier(globalTickspeedMultiplier)`,
**not** divided by
tickspeed) — "how much lands each time the tier's tickspeed period completes," not a per-second average.
A circular per-tier tick-progress ring (`TickProgressRing`, a conic-gradient "watch face" fed by
`getTierProductionProgressPercent` and animated via an `@property`-registered custom property) used to
render beside this figure, visualizing `tierProductionAccumulators` filling toward each delivery — it
was removed from the UI once every tier's tickspeed was unified at 1s: with all ten rings sweeping the
same constant 1-second cycle in unison, the ring carried no per-tier information and was pure motion
noise. `getTierProductionProgressPercent` (and its `previousAccumulator`/`elapsedSeconds` "just
delivered" detection) remains in `engine.js` with its unit tests — it reads state without touching it,
and would be the starting point if any future design re-surfaces the accumulator (it's currently unused
by `MainPage`).

### Offline progress

Time away from the game is simulated at **10% speed** (`OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1` in
`layers.js`) when the page is reopened, capped at `MAX_OFFLINE_SECONDS` (24 hours) of real elapsed time before
the multiplier is applied — a courtesy for short absences, not a way to let the autobuyer loop or production
outrun active play, and a hard bound on how long the catch-up simulation can take on load. The mechanism
(`getOfflineEffectiveSeconds`/`applyOfflineProgress` in `engine.js`) replays `tickGame(1, autobuyerBatchSize)`
once per *simulated* second — not a single call with one large `elapsedSeconds` — so autobuyers get the same
one-purchase-attempt-per-tick cadence they'd have had if the game had stayed open the whole time, just at 10%
speed; a single lump-sum call would let a long-idle autobuyer buy far more per "tick" than it ever could
while the app was actually running. This replay granularity (one simulated second per iteration) is
deliberately independent of the live tick rate (`TICK_RATE_MS`, see "Tier production tickspeed" above) —
`applyOfflineProgress` always passes `elapsedSeconds = 1` regardless of how fast the live game ticks, so
offline catch-up behavior and performance are unaffected by changes to `TICK_RATE_MS`. `storage.js`'s `saveGameState` stamps a separate `tens_last_save_timestamp`
localStorage key with `Date.now()` on every save (every tick, not just on unmount, so it always reflects the
last confirmed moment the app was open); `loadLastSaveTimestamp` reads it back, returning `null` if it's
missing (no prior save, or an older save that predates this feature) — a `null` timestamp means "unknown
elapsed time" and skips offline progress entirely rather than guessing. `clearGameState` (called by
`resetGame`) removes this key too, since it's save-state bookkeeping. See "Architecture" above for how
`useIncrementalGame` wires this into `state`/`offlineProgress` on mount, and how `MainPage` surfaces it.

### Prestige Points, autobuyer unlock, and the tickspeed multiplier

Prestiging no longer doubles production directly — instead it awards **Prestige Points (PP)**, a
permanent, cumulative currency (`prestige.points`) that never resets and stacks across every future
prestige. `getPrestigePointsAwarded(money) = floor(log10(money) / log10(GOOGOL))` computes the award — the
log, base GOOGOL, of the money balance reached before production froze, rounded down — always at least 1
(prestiging requires Money ≥ `GOOGOL`, i.e. an exponent ≥ 100, in the first place), but only increasing
once a further full 100 orders of magnitude are reached (exponent 200 → 2 points, 300 → 3, …). The tick
that crosses `GOOGOL` can overshoot substantially in a single step (see `isProductionFrozen` below), so
waiting for a much higher production rate before prestiging can still pay off in extra points, just at
this much larger scale. `prestigeGame` adds the newly-awarded points on top of any already-unspent balance
rather than resetting it.

Unspent PP has one passive effect (itself gated behind a one-time unlock) and five active uses:

- **Passive (gated):** `getPrestigeProductionMultiplier(points) = 1 + PRESTIGE_POINT_SPEED_BONUS * points`
  (`PRESTIGE_POINT_SPEED_BONUS = 0.01` in `layers.js`) — a flat **+1% production speed per unspent point**,
  applied uniformly to every tier in `tickGame`. This is the direct replacement for the old
  "prestige level doubles production" mechanic. `getPrestigeProductionMultiplier` itself is a pure
  formula — it does **not** apply automatically just from holding points. It's inert (every caller uses
  a flat ×1 instead) until `state.prestigeSpeedBonusUnlocked` is true — see the unlock purchase below.
  Once unlocked, since the multiplier is fractional whenever `points` isn't a multiple
  of 100, the production it scales is floored before being credited (see "Multiplier outcomes are
  floored" below) — so `resources`/`owned` always stay integer-valued.
- **Active — unlock the speed bonus:** `buyPrestigeSpeedBonus(state)` permanently spends
  `PRESTIGE_SPEED_BONUS_UNLOCK_COST` PP (`10000` in `layers.js` — the priciest of the global PP
  automation unlocks that don't scale per-tier, since it's a passive, always-on bonus rather than a
  one-shot action; see `AUTO_SPEED_UP_COST`/`AUTO_PRESTIGE_COST` below) to set
  `state.prestigeSpeedBonusUnlocked`
  to `true` — a one-time purchase (no-op
  if already unlocked, if there aren't enough unspent points, or while frozen). Until this is bought, the
  passive bonus above never applies, no matter how many points are held; once bought, it's permanent
  (never reset by `prestigeGame`) and the existing formula applies to whatever points remain unspent.
- **Active — autobuyer unlock:** `buyAutobuyerUnlock(tierId)` is the **only** way to get a tier's
  autobuyer running at all — there is no Money-funded activation path anymore. It permanently spends
  `getAutobuyerUnlockCost(tierId)` PP (a flat, small per-tier cost — `AUTOBUYER_UNLOCK_BASE_COST *
  (tierIndex + 1)`, i.e. 1 PP for the first tier up through 10 PP for the 10th/last tier — see below;
  deliberately independent of the much steeper Money-funded tickspeed multiplier ladder) to set
  `state.autobuyers[tierId]` from `null` to `1` (the baseline tickspeed level — no
  production bonus yet). An unlocked tier immediately does two things automatically, every tick, with no
  further purchase needed: it buys units of itself whenever affordable (the same purchase-attempt-budget
  loop as before, just now at a flat rate — see below), **and** it self-upgrades its own tickspeed
  multiplier level whenever the next level is affordable (see `buyTickspeedMultiplier` below) — the old
  separate "Auto-upgrade automation" purchase (and its first-tier activation bypass) no longer exists;
  unlocking *is* the whole package now, for every tier including the first, with no special-casing
  between them. A no-op if already unlocked, if the tier itself isn't unlocked yet (`isTierUnlocked`), or
  if there aren't enough unspent points. `state.autobuyers[tierId]` (once non-null) is permanent
  meta-progression like the mechanics below — never reset by `prestigeGame`/`speedUpGame`, just collapsed
  back to tickspeed level 1 (the baseline).
- **Active — Smart:** `buySmartAutobuyer(tierId)` permanently spends PP to make a tier's autobuyer
  "smart" — **but only once its autobuyer is already unlocked**
  (`state.autobuyers[tierId] != null`; a no-op otherwise, enforced in the engine function itself,
  not just the UI). Smart is the next purchase in the same progression as unlocking, not a parallel,
  independent one — see Architecture above for how `MainPage`'s PP Upgrades page reflects this with a
  single control per tier rather than two. Cost is `getSmartAutobuyerCost(tierId) = SMART_AUTOBUYER_COST_MULTIPLIER *
  getAutobuyerUnlockCost(tierId)` (`SMART_AUTOBUYER_COST_MULTIPLIER = 10` in `layers.js`) — 10x whatever
  that tier's own unlock cost is. It fixes a real stall: `tickGame`'s
  autobuyer purchase loop normally requires affording an *entire* `autobuyerBatchSize`-unit block before
  buying anything (see `tickGame` below); a freshly-unlocked tier with 0 owned generators earns $0/tick, so
  at the app's fixed batch size of 10 it can never afford the first 10-unit block on its own and stalls at
  whatever balance it started with, forever, every run. A "smart" tier instead buys **one unit at a time
  until it reaches 10 lifetime purchases** (ignoring `autobuyerBatchSize` for that first block only), then
  **reverts to the normal full-block batching** for every block after — a no-op if already smart or PP is
  short, and `state.smartAutobuyer[tierId]` is likewise permanent across prestige (unlike `purchased`,
  which resets to 0 each run and is what re-triggers the one-at-a-time bootstrap on every subsequent run
  too).
- **Active — Auto Speed Up:** `buyAutoSpeedUp(state)` permanently spends `AUTO_SPEED_UP_COST` PP (`100` in
  `layers.js` — the cheapest of the global PP automation unlocks that don't scale per-tier, since Speed Up
  itself fires far
  more often than either of the other two over a run) to set `state.autoSpeedUp` to `true` — a one-time
  purchase, mirroring the speed-bonus-unlock pattern above rather than Auto-Prestige's leveled-upgrade
  pattern below, since Speed Up has no cadence to speed up (see "Speed Up" below): once bought, `tickGame`
  calls `speedUpGame` every tick, which re-validates eligibility internally (a no-op unless the last tier
  has reached that cycle's `getSpeedUpRequirement(speedUpCount)` and production isn't frozen) — a plain
  edge-triggered call, the same convention the autobuyer-unlock tickspeed self-upgrade above uses, not a
  rate-accumulating budget like
  Auto-Prestige needs below. A no-op if already bought, if there aren't enough unspent points, or while
  frozen. `state.autoSpeedUp` is permanent — never reset by `prestigeGame` or by `speedUpGame` itself.
- **Active — Auto-Prestige:** `buyAutoPrestige(state)` activates (`null` → level 1) or upgrades (level N →
  N+1) a single global upgrade track (not per-tier — there's only one to buy/upgrade), mirroring the tier
  autobuyer null/level pattern rather than being a flat one-time boolean. Cost doubles each level —
  `getAutoPrestigeCost(currentLevel) = AUTO_PRESTIGE_COST * AUTO_PRESTIGE_COST_MULTIPLIER^currentLevel`
  (`AUTO_PRESTIGE_COST = 1000`, `AUTO_PRESTIGE_COST_MULTIPLIER = 2` in `layers.js` — priced above
  `AUTO_SPEED_UP_COST` since Auto-Prestige only ever fires once per run at most, versus Speed Up's much
  higher activation frequency) — 1000 PP to activate, 2000 for the next level, 4000 after that, etc.
  Once active, `tickGame` accumulates a global
  `autoPrestigeAttemptBudget` every tick (frozen or not) by `getAutoPrestigeAttemptRate(level) * elapsedSeconds`
  — `getAutoPrestigeAttemptRate(level) = 1.1^(level - 1) / AUTO_PRESTIGE_BASE_INTERVAL_SECONDS`
  (`AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000` — level 1 fires roughly every 1000 real seconds; each level
  after that speeds this up by another 10%, compounding), scaled by
  `elapsedSeconds` so this real-world cadence stays constant regardless of how often `tickGame` itself is
  called (see `TICK_RATE_MS` above — at 10Hz, `elapsedSeconds` is `0.1` per call, so the rate is scaled down
  to match, rather than accumulating 10x faster in real time) — but the completed attempt (budget ≥ 1) only actually calls
  `prestigeGame` once Money has *also* reached GOOGOL (`isProductionFrozen`); until then it just keeps
  banking past 1 rather than being lost, same "don't spend an attempt that can't succeed yet" philosophy as
  the tier autobuyer loop, so the first Googol reached after enough real time has passed triggers
  Auto-Prestige immediately, with no manual click. `buyAutoPrestige` is a no-op if PP is short for the next
  level, or called while already frozen (buy/upgrade it ahead of the *next* Googol, not to retroactively
  affect the one already in progress). `state.autoPrestige` (the level) is permanent like the other two
  capabilities above, carried forward unchanged by `prestigeGame`; `state.autoPrestigeAttemptBudget`, by
  contrast, resets to 0 on every prestige (manual or automatic) — same as the per-tier
  `autobuyerAttemptBudgets` reset on every run.
- **Active — global tickspeed multiplier:** `buyGlobalTickspeedMultiplier(state)` activates (`null` →
  level 1) or upgrades (level N → N+1) a single global upgrade track (not per-tier — there's only one
  to buy/upgrade, mirroring Auto-Prestige's null/level pattern), permanently compounding *every* tier's
  production by another 10% per level at once — see "The global tickspeed multiplier" below. Unlike
  Auto-Prestige, it has no `allTiersSmart` prerequisite in the UI — it's available as soon as the
  player has prestiged once. A no-op if PP is short for the next level, or while frozen.
  `state.globalTickspeedMultiplier` (the level) is permanent, carried forward unchanged by
  `prestigeGame`/`speedUpGame`.

XP (`prestige.xp`, earned via money milestones — see `checkMilestones`) has been removed from the UI as
part of this change; the underlying mechanic (accumulation, `highestMilestone` tracking) is untouched in
`engine.js`, just no longer displayed, pending being repurposed for something else later.

#### Tickspeed multiplier

Not to be confused with "Tier production tickspeed" above (each tier's own `baseTickSpeedSeconds`
production-batching cadence, unrelated to autobuyers) — the **tickspeed multiplier** is the renamed,
re-purposed replacement for what used to be a tier's autobuyer "Upgrade": a Money-funded, per-tier level
that used to compound purchase-attempt *frequency* by 10% per level. It no longer does that at all —
autobuyer purchase-attempt frequency is now a flat, level-independent rate (see `tickGame` below); instead,
each tickspeed multiplier level compounds that tier's own **production** by another 10%.

- `getTickspeedMultiplierBaseCost(tierIndex) = 10 ** (TICKSPEED_MULTIPLIER_BASE_EXPONENT - tierIndex)`
  (`TICKSPEED_MULTIPLIER_BASE_EXPONENT = 10` in `layers.js`) — 10^10 for the first tier (index 0),
  decreasing by a power of ten per subsequent tier, down to 10^1 for the 10th/last tier (index 9).
- `getTickspeedMultiplierCost(tierId, targetLevel) = getTickspeedMultiplierBaseCost(tierIndex) **
  targetLevel` — the cost, in that tier's own resource, to reach `targetLevel`. E.g. the 2nd tier's
  (index 1, base 10^9) level-4 cost is `(10^9)^4 = 10^36`. This ladder is Money-funded only — the
  separate PP-funded `getAutobuyerUnlockCost` (see "Prestige Points, autobuyer unlock, and the
  tickspeed multiplier" above) uses its own much smaller, independent formula instead of reusing this
  one.
- `getTickspeedProductionMultiplier(level) = (1 + TICKSPEED_PRODUCTION_STEP) ** (level - 1)`
  (`TICKSPEED_PRODUCTION_STEP = 0.1` in `layers.js`) — level 1 (just unlocked, no Money-funded levels
  bought yet) is the baseline ×1 (no bonus); each level after that compounds production by another 10%:
  level 2 = ×1.1, level 3 = ×1.21, … `null` (never unlocked) is treated as level 1, i.e. no bonus, the
  same defensive convention used elsewhere in this file. This multiplier is folded directly into
  `tickGame`'s production formula alongside the Prestige Point and Speed Up multipliers (see "Multiplier
  outcomes are floored" above) — it has no effect on purchase-attempt frequency at all.
- `buyTickspeedMultiplier(tierId)` spends the tier's own resource to raise its level by 1 — requires the
  tier's autobuyer already be unlocked (`state.autobuyers[tierId] != null`; a no-op otherwise, since
  there's no tickspeed level to buy on a locked tier) and, since `resources[tier.id]`/`owned[tier.id]`
  move together, requires at least 1 generator would remain after paying (`available >= cost + 1`, same
  invariant the old Upgrade purchase enforced). Called both by the player's manual click (see
  Architecture above) and automatically by `tickGame` for every unlocked tier, once per tick, whenever
  affordable (see `tickGame` below) — there's no separate "automation" flag gating this anymore; being
  unlocked is what makes it self-upgrade.

#### The global tickspeed multiplier

A single, PP-funded, global counterpart to the per-tier tickspeed multiplier above — instead of
boosting one tier's production, each level compounds *every* tier's production by another 10% at once.
It's a leveled upgrade track (not per-tier — there's only one to buy/upgrade), mirroring Auto-Prestige's
`null`/level pattern rather than a one-time boolean unlock, and lives on the PP Upgrades page (see
Architecture above) rather than on any tier row.

- `getGlobalTickspeedMultiplierCost(currentLevel) = 10 ** (currentLevel + 1)` — `currentLevel` is the
  level *before* the purchase (`null`/not-yet-bought treated as 0): 10 PP to activate (level 0 → 1),
  100 PP for the next level, 1000 PP after that, and so on — the same "powers of ten" theme used
  throughout this economy.
- `getGlobalTickspeedProductionMultiplier(level) = (1 + GLOBAL_TICKSPEED_PRODUCTION_STEP) ** level`
  (`GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.1` in `layers.js`; `null`/never-bought treated as level 0, i.e.
  no bonus, ×1). Unlike the per-tier tickspeed multiplier — where level 1 is a bonus-free baseline
  granted by a separate PP unlock step — buying this global track directly grants its effect: level 1
  (the very first purchase) already compounds every tier's production by 10% (×1.1), level 2 by
  another 10% on top (×1.21 total), and so on, always **compounding multiplicatively across levels**
  (1.1^level), not summed as flat additive percentages. This multiplier is folded directly into
  `tickGame`'s production formula as another multiplied-in factor alongside the Prestige Point, Speed
  Up, and per-tier tickspeed multipliers (see "Multiplier outcomes are floored" above) — the combination
  is a product of all the multipliers, never a sum of their individual bonuses.
- `buyGlobalTickspeedMultiplier(state)` spends Prestige Points to raise the level by 1 — a no-op if
  `isProductionFrozen` or if there aren't enough unspent points. `state.globalTickspeedMultiplier` (the
  level) is permanent, carried forward unchanged by `prestigeGame`/`speedUpGame` (see "Prestige Points,
  autobuyer unlock, and the tickspeed multiplier" above).

### Prestige and the Googol freeze

Reaching Money ≥ `GOOGOL` doesn't just make Prestige *available* — it freezes the entire economy.
`isProductionFrozen(state)` (`engine.js`) is the single source of truth for this: once true, `tickGame`
returns the same state unchanged (no passive production, no autobuyer purchases) *unless* Auto-Prestige is
bought, in which case it keeps accumulating `autoPrestigeAttemptBudget` every tick and calls `prestigeGame`
the instant that budget crosses 1 (see "Prestige Points, autobuyer unlock, and the tickspeed multiplier"
above) — either way
`buyTier`/`buyTickspeedMultiplier`/`buyAutobuyerUnlock`/`buySmartAutobuyer`/`buyAutoPrestige` all still no-op
while frozen for manual purchases; `prestigeGame` is the only action able to change state (whether
triggered by the player's click or by a completed Auto-Prestige attempt). `MainPage` reads
`isProductionFrozen` (rather than re-deriving its own copy) to disable every other control while frozen:
each tier's Buy/tickspeed-multiplier button (`canAfford`/`canUpgradeTickspeed`) and the PP Upgrades page's
Unlock/Smart/global buttons (`canUnlock`/`canBuySmart`/`canBuyAutoPrestige`/etc., same fold) — all fall
back to the same `darkgrey` disabled-color convention as anywhere else in
the app, with a `title` explaining why on Reset. In practice, since the attempt budget already accumulates
during ordinary (non-frozen) play too, a run that takes less real time than Auto-Prestige's current
interval will still show the frozen full-screen prompt/top banner for a while, ticking along until the
budget crosses 1 — Auto-Prestige is a periodic cadence, not an instant skip on every single run.

How the Prestige control itself is presented depends on prestige history, not just the frozen state —
tracked by `prestige.count` (the number of times ever prestiged; renamed from the old `level` field now
that prestiging grants points instead of directly scaling production), not by `prestige.points` (which
fluctuates as PP is earned and spent):

- **The first time ever** (`prestige.count === 0`), `MainPage` returns a mandatory `FullScreenOverlay` in
  place of the entire normal page — `role="dialog" aria-modal="true"`, explaining what Prestige does
  (resets resources/owned/purchased, awards Prestige Points, keeps unlocked autobuyers/PP), with a
  single Prestige button that auto-focuses on mount. There is deliberately no close/dismiss control —
  since everything else is frozen anyway, clicking Prestige is the only meaningful action left, so the
  takeover doesn't hide anything reachable behind it.
- **From the 2nd time onward**, instead of that takeover, a `TopPrestigeBar` (`position: fixed`, pinned to
  the top of the viewport, with a `TopPrestigeBarSpacer` reserving the same height in normal document flow
  so it never overlaps `Header`) shows a compact reminder + Prestige button, while the rest of the
  (disabled) page still renders normally underneath it.

The normal bottom `PrestigeCard` (Game view; prestige count, unspent PP, production-speed multiplier) only
renders
when *not* frozen, and only once `prestigeCardEverRevealed` (see Architecture above) — during the first
run that's gated on `purchased.tier10 >= 10` (10 lifetime purchases of the last tier), a
progressive-disclosure gate so a brand-new player isn't shown the Prestige panel before it's relevant, but
once revealed it stays visible (in a disabled state if not currently relevant) rather than disappearing
again; once the player has prestiged at least once, the card is always shown (whenever not frozen)
regardless of tier10 purchases. Its Prestige button carries the effect and progress on itself, Buy-button
style —
visible text `✦ +{award} PP · {percent}%` (award = `max(1, getPrestigePointsAwarded(money))`, since
below Googol the formula reads 0 but the award on reaching it is always at least 1) over the existing
`$progress` fill, with the full sentence in `aria-label` ("Prestige (requires 1 Googol Money) — awards
+N Prestige Points"); there is no separate progress-toward-Googol text line anymore. The frozen-state
`TopPrestigeBar` button shows the award the same way ("✦ Prestige +N PP").
Its unspent-PP/production-speed line and the PP-spending sentence in its description are
themselves gated further, on `!isFirstRun` — see "Prestige info is hidden until first prestige" below. The
Auto-Prestige control itself lives on the PP Upgrades page (see Architecture above), not this card — but
only once `allTiersSmart` is true (every tier upgraded to Smart, itself requiring every tier's autobuyer
already unlocked first — see "PP Upgrades view" above); before that, the entire row (and any
mention of Auto-Prestige) stays hidden, gating this endgame capability behind having maxed out the
per-tier unlock/Smart ladder first. Once shown, its row reads "🔁 Auto-Prestige for 1000 PP" before it's
ever bought, or "🔁 Upgrade for {nextCost} PP"
once active, always spending `getAutoPrestigeCost(currentLevel)` via `actions.buyAutoPrestige`. Once
active, its row's name cell additionally shows "Lv.{level} (every
~{interval}s)", with `interval` computed as `Math.round(1 / getAutoPrestigeAttemptRate(level))` — see
"Prestige Points, autobuyer unlock, and the tickspeed multiplier" above for what it
does. This `allTiersSmart` gate is UI-only — `buyAutoPrestige`/`tickGame` in `engine.js` don't check it, so
a save with Auto-Prestige already active from before this restriction (or edited directly) keeps working
exactly the same underneath, just without a visible control until every tier catches up to Smart.

### Speed Up

A more frequent, cheaper soft-reset than real Prestige, available well before Money reaches
GOOGOL: once the last tier (`tier10`) reaches that cycle's requirement — `getSpeedUpRequirement(
speedUpCount) = 10 * (speedUpCount + 1)`, i.e. 10 lifetime purchases for the first activation, 20
for the second, 30 for the third, always one more full block of 10 than the last — `speedUpGame`
(`engine.js`) resets resources/owned/purchased — everything a fresh `createInitialGameState()`
would have — but permanently multiplies production speed by `SPEED_UP_MULTIPLIER_BASE` (2,
`layers.js`) raised to `state.speedUpCount`, an unconditional (no PP unlock needed) factor read via
`getSpeedUpMultiplier` and applied in `tickGame` alongside the existing Prestige Point speed
multiplier and `getPurchaseMilestoneMultiplier`. Each activation increments `speedUpCount` by 1, so
the production multiplier stacks: 1x with 0 activations, 2x after the first, 4x after the second,
8x after the third, and so on — always doubling, indefinitely.

This exists to break a real stall: even with the Fibonacci-driven cost curve (see `getTierCost`
above) and every tier sharing a uniform 1s tickspeed (see "Tier production tickspeed" above), a
single unbroken run's cost still eventually outpaces any *constant*-factor production speedup —
confirmed empirically via the `simulate-run-times` skill, where every tested starting Prestige
Point balance still hit the simulator's 5,000,000-tick safety cap without ever reaching Googol.
Because Speed Up restarts the cost curve from block 0 every time while permanently doubling
production, each cycle is faster than the last — the compounding multiplier outruns the
compounding cost, rather than losing to it the way a flat bonus eventually does.

The escalating requirement (`getSpeedUpRequirement`) exists because a flat "always 10 more" trigger
lets the last tier dodge the Fibonacci cost curve entirely, forever: since the requirement is
exactly the epoch-0/epoch-1 boundary (see `getTierCost`), every cycle's 10 units are bought at the
same flat `baseCost`, no matter how many cycles have already happened — the last tier's cost never
actually escalates. Scaling the requirement up by a full block of 10 each cycle means later cycles'
purchases *do* cross into deeper cost epochs, so the mechanic can't be spammed for cost-free
compounding indefinitely — each cycle gets more expensive to trigger, not just more rewarding.
Re-running the `simulate-run-times` bot (updated to always accept Speed Up the instant each cycle's
requirement is met) confirms the run still completes at every tested starting PP balance, just with
far fewer, more consequential cycles: **9 Speed Ups** over **~94,900 simulated ticks** (about 1
simulated day) instead of the flat-requirement version's 333 cycles over ~3,900 ticks (~1 hour) —
slower overall, but the mechanic no longer sidesteps the cost curve that everything else in this
economy is built around.

`speedUpGame`'s reset pattern deliberately mirrors `prestigeGame`'s: an already-active autobuyer
collapses to its level-1 baseline rather than deactivating (the same `resetAutobuyers` idiom), and
`smartAutobuyer`/`autoPrestige`/`prestigeSpeedBonusUnlocked`/`autoSpeedUp`
all carry over unchanged — matching the user's framing for this feature: "similar to starting the
first run but with automations retained and 2x the speed." Two things differ from `prestigeGame`,
though: `prestige` (`xp`/`points`/`count`/`highestMilestone`) is passed through completely
untouched rather than partially reset/incremented, since Speed Up is unrelated to real Prestige or
Prestige Points and doesn't award or spend any; and the gate condition is
`getTierPurchasedCount(lastTier) >= getSpeedUpRequirement(speedUpCount)`, not `Money >= GOOGOL` —
it also refuses while `isProductionFrozen`, since a frozen state is waiting on a real Prestige, not
a Speed Up. Like every other manual action, it's a no-op (returns the same state) when refused.
`speedUpCount` itself is permanent meta-progression, like the flags it preserves — `prestigeGame`
explicitly carries it (and `autoSpeedUp`) through unchanged too (added to the same list of
preserved fields it already had), so a real Prestige never wipes accumulated Speed Up multiplier,
requirement progress, or Auto Speed Up back to their starting values. Speed Up can also fire
without a manual click at all once Auto Speed Up is bought — see "Prestige Points, autobuyer
unlock, and the tickspeed multiplier" above for `buyAutoSpeedUp`.

`MainPage` surfaces this as a `SpeedUpCard` (`styled(StatCard)`, cyan accent; Game view only),
rendered right after
`TierList` and before `PrestigeCard` — tiers first, then the frequent Speed Up loop, then the
end-of-run Prestige card. It's gated on `speedUpEverRevealed` (see Architecture above) — seeded from,
and latched permanently true the first time, the last tier being unlocked at all (`isTierUnlocked`),
the
same progressive-disclosure principle as the Prestige card gate, so it doesn't clutter
the page before `tier10` first exists — but once revealed, it stays visible (in a disabled state when
not currently actionable) rather than disappearing again, unlike the live `lastTierUnlocked` check it
replaced. Like the Prestige button, the Speed Up button carries its
effect and progress on itself — visible text `⚡ ×{next} · {percent}%` (the multiplier the next
activation would set, and requirement progress), with no separate multiplier/activation-count
status line; the full sentence lives in its `aria-label` ("Speed Up (requires N {lastTier}) —
doubles production speed to ×{next}"). It's progress-filled via the same `$progress`
convention as Buy/Prestige, measured against that cycle's own
`getSpeedUpRequirement(speedUpCount)` rather than a flat 10, and enabled once
`getTierPurchasedCount(lastTier) >= getSpeedUpRequirement(speedUpCount)` and disabled while frozen
— like Prestige, there's no `window.confirm` guard, since this is a clearly beneficial action, not
a destructive one like the Reset button. Below that, once `!isFirstRun` and `state.autoSpeedUp` is
bought, a static "🔁 Auto Speed Up active" note shows — the Auto Speed Up *purchase* button itself
now lives on the PP Upgrades page instead (see Architecture above), alongside every other
PP-spending control. Because the reset also wipes `owned`, the last tier — and often
several tiers below it — are no longer unlocked immediately after a successful Speed Up, but the
card no longer disappears along with them (see `speedUpEverRevealed` above) — it stays visible,
its button simply disabled again, until the player climbs back up to eligibility, which is
expected: that's the "start over, but faster" loop the mechanic is built around.

### Prestige info is hidden until first prestige

Prestige Points don't exist as a concept for the player until they've prestiged at least once
(`isFirstRun` = `prestige.count === 0` — the same flag used above to choose the full-screen takeover vs.
the top banner), so `MainPage` keeps every PP-related display and control out of the page entirely during
the first run, rather than showing a premature "0 PP" or a button costing points the player has never
earned:

- The top-level "prestige points display" `StatCard` (unspent PP + production-speed bonus, or a "locked"
  message pre-unlock) doesn't render at all until `!isFirstRun`.
- The PP Upgrades tab itself (see Architecture above) doesn't render until `!isFirstRun` — there is
  nothing to spend PP on before then, so there's no page to switch to.
- PP upgrades additionally reveal one by one, cheapest first (`speedBonusRevealed` in `MainPage`): the
  10000 PP Speed Bonus unlock — its row on the PP Upgrades page, the "production speed bonus locked"
  teaser in both the PP
  display and the `PrestigeCard`, and the description sentence quoting its cost — stays hidden until the
  far cheaper Auto Speed Up (100 PP) has been bought, so a fresh post-prestige page isn't fronting a
  cost that's still thousands of points away (a save that already unlocked the bonus stays revealed
  regardless). Auto-Prestige (1000 PP) was already gated this way behind `allTiersSmart`, and the
  per-tier Unlock/Smart rows (their costs vary per tier — see "Prestige Points, autobuyer unlock, and the
  tickspeed multiplier" above) already reveal per tier as each one is reachable.
- The bottom `PrestigeCard`'s unspent-PP/production-speed line (`{points} PP unspent · ×{rate} production
  speed`, or the locked variant) only renders once `!isFirstRun` (the locked variant needs
  `speedBonusRevealed` too — see above); the Unlock Speed Bonus button itself lives on the PP Upgrades
  page (unreachable pre-first-prestige for the same reason as every other PP control there). The
  description
  sentence about spending points on the PP Upgrades page is likewise omitted
  pre-first-prestige, leaving just the Googol-requirement and reset-warning sentences.
- The Auto-Prestige row on the PP Upgrades page is unaffected by this flag directly, but is already
  unreachable pre-first-
  prestige in practice: it requires `allTiersSmart`, and Unlock/Smart purchases (the only way to spend
  PP at all) are themselves unreachable before then (no PP Upgrades tab at all, see above).

The one deliberate exception is the first-ever `FullScreenOverlay` (`prestige.count === 0`, shown the
moment Money first reaches GOOGOL) — its body text does explain what Prestige Points are and what they'll
be used for. That's the introduction of the mechanic, shown at exactly the moment it becomes relevant
(right before the player's first Prestige click), not premature exposure of numbers they can't act on yet;
every other PP surface in the app stays hidden until after that first click. This is a `MainPage`-only
presentation choice — `engine.js` computes and stores `prestige.points`/PP-gated costs identically
regardless of `prestige.count`; nothing here changes what a save file contains, only what's rendered.

### Reset

The "↺ Reset" button (`actions` via `resetGame`, wipes the save and starts a fresh game) is always
rendered — a player-facing control, not gated behind `import.meta.env.DEV`. (An earlier version of
this feature restricted it to `yarn dev`/`yarn test` builds only, dead-code-eliminated from
production; that gate was removed after a player on the deployed site had no way to reach it.)
`resetGame` itself (`useIncrementalGame.js`) and `clearGameState` (`storage.js`) are unchanged.

`ResetButton` (`styled(Button)`, smaller `font-size`/`padding` than the app's other buttons) renders it
deliberately small, and its click handler (`handleResetClick` in `MainPage`) gates the actual `resetGame()`
call behind a native `window.confirm(...)` prompt — since this is a single, irreversible action with no
existing modal/confirm component elsewhere in the app to reuse, a native confirm dialog is the whole
guard rather than a custom two-step UI. Cancelling the dialog leaves state untouched; the button's
`aria-label` ("Reset game") and disabled-while-frozen behavior are otherwise unchanged from before. On
acceptance, alongside `resetGame()` itself, the handler also resets `MainPage`'s local view-state back to
`'game'` and clears the `speedUpEverRevealed`/`prestigeCardEverRevealed` flags (see Architecture above) —
without this, those flags (and the selected view) would otherwise survive a Reset, since they're plain
component state, not part of the engine state `resetGame` replaces.

### Game state shape

```js
{
  resources:  { Ones: 10, tier01: 0, … },       // amount owned per resource id (keyed by costResourceId/MONEY_ID)
  owned:      { tier01: 0, tier02: 0, … },       // generator count per tier id (drives production)
  purchased:  { tier01: 0, tier02: 0, … },       // lifetime purchase count per tier id (drives cost scaling
                                                  // AND production doubling — see getPurchaseMilestoneMultiplier)
  autobuyers: { tier01: null, tier02: null, … }, // null = not yet unlocked (see buyAutobuyerUnlock, a
                                                  // permanent PP-funded purchase — there is no Money-funded
                                                  // activation path); number = the tickspeed multiplier
                                                  // level (1 = just unlocked, no production bonus yet — see
                                                  // getTickspeedProductionMultiplier). An unlocked tier
                                                  // self-buys units AND self-upgrades this level every tick,
                                                  // automatically — no separate "automation" flag needed
  autobuyerAttemptBudgets: { tier01: 0, tier02: 0, … }, // fractional purchase-attempt budget per tier accumulated
                                                          // each tick at a flat rate of 1 (independent of
                                                          // tickspeed level) and drained
                                                          // by 1 per successful autobuyer purchase — see tickGame
  smartAutobuyer: { tier01: false, tier02: false, … },   // permanent per-tier flag: PP spent to make this
                                                          // tier buy singly until 10 purchases then in blocks
                                                          // of 10 (see buySmartAutobuyer) — never reset by prestige
  tierProductionAccumulators: { tier01: 0, tier02: 0, … }, // fractional seconds banked per tier toward its next
                                                          // production batch, incremented every tick by
                                                          // elapsedSeconds and drained once it crosses that
                                                          // tier's getTierBaseTickSpeedSeconds — see "Tier
                                                          // production tickspeed" above. Resets to 0 on every
                                                          // prestige, same as autobuyerAttemptBudgets
  autoPrestige: null,                                    // permanent GLOBAL level (not per-tier — only one to
                                                          // buy/upgrade), null = not yet bought: how many times
                                                          // PP have been spent to make Prestige automatic and
                                                          // faster (see buyAutoPrestige/tickGame) — never reset
  globalTickspeedMultiplier: null,                       // permanent GLOBAL level (not per-tier — only one to
                                                          // buy/upgrade, mirroring autoPrestige above), null =
                                                          // not yet bought: how many times PP have been spent
                                                          // on the global tickspeed multiplier, compounding
                                                          // EVERY tier's production by another 10% per level
                                                          // (see getGlobalTickspeedProductionMultiplier/
                                                          // buyGlobalTickspeedMultiplier) — never reset
  autoPrestigeAttemptBudget: 0,                          // fractional Auto-Prestige attempt budget, accumulated
                                                          // every tick (frozen or not) by
                                                          // getAutoPrestigeAttemptRate(autoPrestige) once bought
                                                          // — see tickGame. Resets to 0 on every prestige, same
                                                          // as autobuyerAttemptBudgets
  prestigeSpeedBonusUnlocked: false,                     // permanent GLOBAL flag: whether the passive
                                                          // +1%-per-unspent-point production speed bonus
                                                          // (getPrestigeProductionMultiplier) is active at all —
                                                          // see buyPrestigeSpeedBonus. Never reset by prestige
  speedUpCount: 0,                                       // permanent count of Speed Up activations (see
                                                          // speedUpGame/getSpeedUpMultiplier below) — drives an
                                                          // unconditional, stacking production-speed multiplier
                                                          // (2^speedUpCount) AND how many last-tier purchases the
                                                          // next activation requires (getSpeedUpRequirement).
                                                          // Never reset by Speed Up itself or by a real Prestige
                                                          // — see "Speed Up" below
  autoSpeedUp: false,                                    // permanent GLOBAL flag: PP spent to make Speed Up
                                                          // trigger automatically every tick once eligible (see
                                                          // buyAutoSpeedUp) — never reset by Speed Up or prestige
  prestige:   { xp: 0, points: 0, count: 0, highestMilestone: 1 }, // xp is earned via money milestones (see
                                                          // checkMilestones) but doesn't currently fund anything —
                                                          // removed from the UI, kept for a future repurposing;
                                                          // points is the spendable Prestige Point balance
                                                          // (earned via prestigeGame, spent via
                                                          // buyAutobuyerUnlock/buyPrestigeSpeedBonus, also
                                                          // drives production speed once unlocked — see
                                                          // "Prestige Points, autobuyer unlock, and the
                                                          // tickspeed multiplier");
                                                          // count is the number of times ever prestiged (renamed
                                                          // from the old `level` field), driving only the
                                                          // first-run-vs-repeat UI presentation; prestige itself
                                                          // is gated on Money ≥ GOOGOL, not xp or points
}
```

`owned[tierId]` and `resources[tierId]` for the same tier id always move together — buying a tier, producing
it via the tier above's tick, an autobuyer's automatic purchase, and spending it on that tier's own autobuyer
upgrade all update both by the same amount. They represent "how many generators you have" and "how much of
that tier's resource you can spend" respectively, which happen to be the same number by design. `purchased`
is separate: it only ever increases and is what `getTierCost` scales against; it also drives production
directly, doubling every time it crosses another block of 10 (see `getPurchaseMilestoneMultiplier`) — the
same boundary where `getTierCost`'s Fibonacci-driven multiplier steps up (see `getTierCost`),
regardless of whether those purchases were manual or automatic.

### Key engine functions (`src/game/engine.js`)

| Function | Signature | Purpose |
|----------|-----------|---------|
| `createInitialGameState` | `() → state` | Fresh state derived from `TIER_DEFINITIONS`; `resources` is pre-populated with every `costResourceId`/`producesResourceId`, not just money |
| `getTierCost` | `(tier, purchasedCount) → number` | `baseCost * 10^(getCostEpochExponent(epoch) - 1)`, epoch = `floor(purchased/10)` — flat across each block of 10 purchases; each block multiplies `baseCost` by 10 raised to (that epoch's Fibonacci number − 1): 1, 2, 3, 5, 8, … for epochs 0, 1, 2, 3, 4, … — e.g. a baseCost-10 tier's 4th block (purchases 30–39) costs 10^5 per unit, same as a literal `baseCost^fib` reading would give for baseCost 10, but every other tier scales gently relative to its own `baseCost` (a baseCost-1000 tier's blocks cost 1e3, 1e4, 1e5, 1e7, 1e10, …) rather than compounding `baseCost` itself into the exponent — the earlier literal-power formula put high tiers permanently out of reach within a handful of blocks (e.g. Octillions' 4th block cost 10^135, past `GOOGOL`), stalling the whole economy well before a full run could reach Googol even at extreme Prestige-Point speed bonuses; this multiplier form was adopted instead once that was caught. Deep epochs still eventually overflow to `Infinity`, which is safe — an infinite cost is simply never affordable |
| `getCostEpochExponent` | `epoch → number` | The Fibonacci number driving a cost epoch's multiplier in `getTierCost`: 1, 2, 3, 5, 8, 13, … for epochs 0, 1, 2, 3, 4, 5, …; a negative epoch is clamped to 0 |
| `getTierBulkQuantity` | `(tier, purchased, requestedQuantity) → number` | Caps a bulk purchase at the current cost-block boundary, so every unit bought is the same price |
| `getTierQuantityCost` | `(tier, purchased, requestedQuantity) → number` | `getTierCost(...) * getTierBulkQuantity(...)` |
| `getTierAffordableQuantity` | `(tier, purchased, spendable, requestedQuantity) → number` | Further caps `getTierBulkQuantity` by what `spendable` can actually pay for — what `buyTierQuantity` will actually purchase |
| `getTierSpendableAmount` | `(state, tier) → number` | Balance of `tier.costResourceId` (always `Ones`) |
| `getTierPurchasedCount` | `(state, tierId) → number` | Lifetime purchases, used for cost scaling |
| `isProductionFrozen` | `state → bool` | `Money >= GOOGOL` — once true, `buyTier`/`buyTickspeedMultiplier`/`buyAutobuyerUnlock`/`buySmartAutobuyer`/`buyAutoPrestige`/`buyGlobalTickspeedMultiplier` all become no-ops (return the same state unchanged); `tickGame` either stays frozen too or calls `prestigeGame` automatically once Auto-Prestige's banked attempt budget crosses 1 (see its own row below). The UI reads this same function to disable every other control (see Architecture) |
| `tickGame` | `(elapsedSeconds, autobuyerBatchSize = 1) → state → state` | If `isProductionFrozen`: when `autoPrestige` isn't bought, short-circuits (returns the same state, unchanged); otherwise accumulates `autoPrestigeAttemptBudget` by `getAutoPrestigeAttemptRate(autoPrestige) * elapsedSeconds` and, once that crosses 1 (with `TICK_ACCUMULATION_EPSILON` tolerance), calls `prestigeGame` immediately (prestigeGame's own reset zeroes the budget back out) — otherwise returns the state with just the updated budget. Otherwise (not frozen) runs autobuyers highest-tier-first (every tier costs the same resource, Money, so autobuyers compete for one shared pool — the higher tier gets first claim on limited funds), then produces resources for every unlocked tier — but only once its `tierProductionAccumulators[tier.id]` (incremented by `elapsedSeconds` this tick) crosses that tier's own `getTierBaseTickSpeedSeconds(tier.id)` (with the same epsilon tolerance); when it does, delivers `floor(owned × (whole tickspeed periods elapsed) × multiplier × speedUpMultiplier × getPurchaseMilestoneMultiplier(purchased) × getTickspeedProductionMultiplier(autobuyers[tier.id]) × getGlobalTickspeedProductionMultiplier(globalTickspeedMultiplier))` in one batch, where `multiplier` is `getPrestigeProductionMultiplier(prestige.points)` if `prestigeSpeedBonusUnlocked` is true, or a flat `1` otherwise (see "Prestige Points, autobuyer unlock, and the tickspeed multiplier"), and `speedUpMultiplier` is `getSpeedUpMultiplier(speedUpCount)` — always ≥ 1, unconditional, no unlock needed (see "Speed Up" below) — note this is the *count* of completed periods, not the number of seconds they span, so a slower tier's real throughput is divided by its own tickspeed, and the result is floored (see "Multiplier outcomes are floored" above) so `owned`/`resources` stay integer-valued — and banks any leftover remainder for the next tick (see "Tier production tickspeed" above) — then checks milestones, then — for every unlocked tier (`autobuyers[tier.id] != null`) — calls `buyTickspeedMultiplier(tier.id)` once more automatically, no-op if unaffordable (edge-triggered on affordability, not scaled by `elapsedSeconds` — see "Tier production tickspeed" above; there is no separate "automation" flag gating this anymore, unlocking is all it takes — see "Prestige Points, autobuyer unlock, and the tickspeed multiplier"), and — if `autoPrestige` is bought — accumulates `autoPrestigeAttemptBudget` here too, scaled by `elapsedSeconds` (the clock runs continuously regardless of frozen state, but can only ever fire from the frozen branch above). `globalTickspeedMultiplier` needs no per-tick accumulation of its own — unlike Auto-Prestige's attempt budget, it's just a permanent level read directly via `getGlobalTickspeedProductionMultiplier` each tick, changed only by the player's own `buyGlobalTickspeedMultiplier` clicks. For each non-`null` (unlocked) autobuyer, accumulates a fractional purchase-attempt budget (`autobuyerAttemptBudgets[tier.id] + elapsedSeconds` — a flat rate, independent of tickspeed level, scaled so the real-world attempt cadence is unaffected by how often `tickGame` itself is called, see `TICK_RATE_MS`) and fires one purchase attempt (via `buyTierQuantity`) per whole unit of budget (with the same epsilon tolerance), carrying any fractional remainder into the next tick — unlocking alone already accumulates budget at this baseline pace, so unlocking immediately makes an autobuyer active rather than leaving it idle. If a purchase can't be afforded, the loop stops *without* spending the already-accumulated attempt — it stays banked so a stretch of being broke only delays attempts, never loses them. The effective per-iteration batch size is `autobuyerBatchSize`, except for a "smart" tier (`smartAutobuyer[tier.id]`, see `buySmartAutobuyer`) still in its first cost block (`purchased < 10`), which uses 1 instead — at batch size 1 each attempt buys as soon as affordable; above 1 (always 10 in the running app, via `useIncrementalGame`'s `BUY_QUANTITY` — see Architecture) each attempt only buys once the tier can afford the *entire* current cost block up to that size, holding and waiting rather than buying a partial batch — which is why a non-smart tier with 0 owned generators (0 income) can never afford its very first block on its own and stalls forever — finally, if `autoSpeedUp` is bought (see `buyAutoSpeedUp`), calls `speedUpGame` once more, which re-validates its own eligibility internally (a no-op unless the last tier has reached that cycle's `getSpeedUpRequirement(speedUpCount)` and production isn't frozen) — the same edge-triggered convention as the tickspeed self-upgrade step, not a rate-accumulating budget, since Speed Up has no cadence to throttle unlike Auto-Prestige |
| `buyTier` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`; otherwise validates unlock + affordability, deducts cost, increments `owned`/`purchased` by 1; used internally by `buyTierQuantity`, not called directly by the UI |
| `buyTierQuantity` | `(tierId, quantity) → state → state` | Buys up to `quantity` units (capped at the cost-block boundary), stopping early if a unit becomes unaffordable; used both by the manual "Buy" button (always `quantity` 10, see `useIncrementalGame`) and by `tickGame`'s autobuyer loop — the two purchase paths are identical, a tier's tickspeed multiplier level has no effect on how much a purchase costs or how many units it grants |
| `buyAutobuyerUnlock` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`, if the tier itself isn't unlocked yet (`isTierUnlocked`), if the tier's autobuyer is already unlocked, or if there aren't enough unspent Prestige Points; otherwise spends `getAutobuyerUnlockCost(tierId)` PP from `prestige.points` and permanently sets `autobuyers[tierId] = 1` (the baseline tickspeed level) — the *only* way to get a tier's autobuyer running at all, for every tier including the first, with no special-casing between them. See "Prestige Points, autobuyer unlock, and the tickspeed multiplier" |
| `buyTickspeedMultiplier` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen` or if the tier's autobuyer isn't unlocked yet (`autobuyers[tierId] == null`); otherwise upgrades the tier's tickspeed level from N to N+1 — always by spending the tier's own resource via `getTickspeedMultiplierCost(tierId, N + 1)`. Each level compounds that tier's own production by another 10% via `getTickspeedProductionMultiplier`, without changing how often the autobuyer attempts a purchase, how each individual purchase is paid for/batched, or manual Buy. Since `resources[tierId]` and `owned[tierId]` move together, a call requires `available >= cost + 1`, not just `available >= cost` — paying the exact cost would zero out the tier's own generator count (and its production), so the last unit is reserved and the call is a no-op (returns the same state) until at least 1 would remain afterward; the MainPage tickspeed button's `disabled` state mirrors this same `+ 1` threshold so it never looks clickable when the engine would refuse it. Also called automatically by `tickGame` for every unlocked tier (see "Prestige Points, autobuyer unlock, and the tickspeed multiplier") |
| `buyPrestigeSpeedBonus` | `state → state` | Returns the same state if `isProductionFrozen`, if `prestigeSpeedBonusUnlocked` is already true, or if there aren't enough unspent Prestige Points; otherwise spends `PRESTIGE_SPEED_BONUS_UNLOCK_COST` PP and permanently sets `prestigeSpeedBonusUnlocked = true`, activating `getPrestigeProductionMultiplier`'s passive bonus in `tickGame` — see "Prestige Points, autobuyer unlock, and the tickspeed multiplier" |
| `buySmartAutobuyer` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`, if the tier's autobuyer isn't unlocked yet (`autobuyers[tierId] == null`), if already smart, or if there aren't enough unspent Prestige Points; otherwise spends `getSmartAutobuyerCost(tierId)` PP and permanently sets `smartAutobuyer[tierId] = true` — see "Prestige Points, autobuyer unlock, and the tickspeed multiplier" |
| `buyAutoPrestige` | `state → state` | Returns the same state if `isProductionFrozen` or if there aren't enough unspent Prestige Points for the next level; otherwise activates (`null` → 1) or upgrades (level N → N+1) via `getAutoPrestigeCost(currentLevel)` — a single global upgrade track, not per-tier — see "Prestige Points, autobuyer unlock, and the tickspeed multiplier" |
| `buyGlobalTickspeedMultiplier` | `state → state` | Returns the same state if `isProductionFrozen` or if there aren't enough unspent Prestige Points for the next level; otherwise activates (`null` → 1) or upgrades (level N → N+1) via `getGlobalTickspeedMultiplierCost(currentLevel)` — a single global upgrade track, not per-tier, compounding every tier's production by another 10% per level — see "The global tickspeed multiplier" above |
| `buyAutoSpeedUp` | `state → state` | Returns the same state if `isProductionFrozen`, if `autoSpeedUp` is already true, or if there aren't enough unspent Prestige Points; otherwise spends `AUTO_SPEED_UP_COST` PP and permanently sets `autoSpeedUp = true`, making `tickGame` call `speedUpGame` automatically every tick — see "Prestige Points, autobuyer unlock, and the tickspeed multiplier" |
| `getPurchaseMilestoneMultiplier` | `purchased → number` | `2 ** floor(purchased/10)` — doubles a tier's own passive production at every block-of-10 purchases, the same boundary where `getTierCost`'s Fibonacci-driven multiplier steps up. Applies uniformly regardless of whether those purchases were manual or via an autobuyer |
| `getSpeedUpMultiplier` | `speedUpCount → number` | `SPEED_UP_MULTIPLIER_BASE ** speedUpCount` (2^speedUpCount) — the unconditional, stacking production-speed multiplier from Speed Up activations (see "Speed Up" below); no unlock purchase needed, unlike `getPrestigeProductionMultiplier` |
| `getSpeedUpRequirement` | `speedUpCount → number` | `10 * (speedUpCount + 1)` — how many lifetime purchases of the last tier the *next* Speed Up needs: 10 for the first activation, 20 for the second, 30 for the third, … — always one more full block of 10 than the last, so later cycles' last-tier purchases do cross into deeper Fibonacci cost epochs rather than always dodging them at the flat epoch-0/epoch-1 boundary. See "Speed Up" below |
| `getTickspeedMultiplierBaseCost` | `tierIndex → number` | `10 ** (TICKSPEED_MULTIPLIER_BASE_EXPONENT - tierIndex)` — 10^10 for the first tier (index 0), decreasing by a power of ten per subsequent tier, down to 10^1 for the 10th/last tier (index 9); an out-of-range index is clamped into range rather than throwing |
| `getTickspeedMultiplierCost` | `(tierId, targetLevel) → number` | `getTickspeedMultiplierBaseCost(tierIndex) ** targetLevel` — the resource cost, in that tier's own resource, to reach `targetLevel`. Money-funded only — `getAutobuyerUnlockCost` (see below) no longer reuses this ladder |
| `getAutobuyerUnlockCost` | `tierId → number` | `AUTOBUYER_UNLOCK_BASE_COST * (tierIndex + 1)` — the PP cost to permanently unlock a tier's autobuyer: 1 PP for the first tier, up through 10 PP for the 10th/last tier; an unrecognized tier id is treated as index 0 |
| `getTickspeedProductionMultiplier` | `level → number` | `1.1 ** (level - 1)` (`TICKSPEED_PRODUCTION_STEP = 0.1`; `null`/never-unlocked and level ≤ 1 all treated as the baseline ×1, no bonus); the production-speed multiplier a tier's tickspeed level contributes in `tickGame` — level 1 (just unlocked, no Money-funded levels bought yet) is the baseline, no bonus |
| `getSmartAutobuyerCost` | `tierId → number` | `SMART_AUTOBUYER_COST_MULTIPLIER * getAutobuyerUnlockCost(tierId)` — 10x that tier's own unlock cost (10 PP through 100 PP across the ten tiers) |
| `getAutoPrestigeCost` | `currentLevel → number` | `AUTO_PRESTIGE_COST * AUTO_PRESTIGE_COST_MULTIPLIER^currentLevel` — 1000 PP to activate (level 0→1), doubling each level after (2000, 4000, …) |
| `getAutoPrestigeAttemptRate` | `autoPrestigeLevel → number` | `1.1 ** (level - 1) / AUTO_PRESTIGE_BASE_INTERVAL_SECONDS` (`null` treated as level 1 defensively, same defensive convention used elsewhere in this file); the per-tick Auto-Prestige attempt-budget increment; level 1 fires roughly every 1000 seconds, each level after that 10% sooner, compounding |
| `getGlobalTickspeedMultiplierCost` | `currentLevel → number` | `10 ** (currentLevel + 1)` — the PP cost to activate (level 0→1, costing 10 PP) or upgrade (level N→N+1) the global tickspeed multiplier; doubles the exponent each level (100, 1000, …) |
| `getGlobalTickspeedProductionMultiplier` | `level → number` | `1.1 ** level` (`GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.1`; `null`/never-bought treated as level 0, i.e. no bonus, ×1) — unlike the per-tier tickspeed multiplier, level 1 already grants the first +10% (there's no separate unlock step to have already spent it on); compounds multiplicatively across levels, not summed additively |
| `getPrestigePointsAwarded` | `money → number` | `floor(log10(money) / log10(GOOGOL))` — the log, base GOOGOL, of the money balance; always ≥ 1 (prestiging requires the exponent ≥ 100 already); only increases once a further full 100 orders of magnitude are reached (exponent 200 → 2, 300 → 3, …) |
| `getPrestigeProductionMultiplier` | `points → number` | `1 + PRESTIGE_POINT_SPEED_BONUS * points` — a flat +1% production speed per unspent Prestige Point, replacing the old level-based doubling. A pure formula, not auto-applied — callers must check `prestigeSpeedBonusUnlocked` first (see `buyPrestigeSpeedBonus`/`tickGame`); before that's bought, every caller uses a flat `1` instead. Fractional whenever `points` isn't a multiple of 100; `tickGame` floors its production credit to absorb this (see "Multiplier outcomes are floored" above) |
| `prestigeGame` | `state → state` | Requires Money ≥ `GOOGOL`; resets resources/owned/purchased, keeps autobuyer *unlock* status (levels reset to 1, the baseline — no production bonus) and `smartAutobuyer`/`autoPrestige`/`globalTickspeedMultiplier`/`speedUpCount`/`autoSpeedUp` unchanged (all permanent, including the Auto-Prestige/global-tickspeed-multiplier *levels* and accumulated Speed Up multiplier), resets `autoPrestigeAttemptBudget` to 0 (like `autobuyerAttemptBudgets`), leaves XP untouched, adds `getPrestigePointsAwarded(money)` on top of any already-unspent `prestige.points`, increments `prestige.count` by 1. Called either by the player's manual click or automatically by `tickGame` when Auto-Prestige's attempt budget fires |
| `speedUpGame` | `state → state` | Requires `getTierPurchasedCount(lastTier) >= getSpeedUpRequirement(speedUpCount)` and not `isProductionFrozen`; resets resources/owned/purchased/tierProductionAccumulators/autobuyerAttemptBudgets/autoPrestigeAttemptBudget exactly like a fresh `createInitialGameState`, keeps autobuyer *unlock* status (levels reset to 1, the baseline) and `smartAutobuyer`/`autoPrestige`/`globalTickspeedMultiplier`/`prestigeSpeedBonusUnlocked`/`autoSpeedUp` unchanged (mirrors `prestigeGame`'s reset pattern), leaves `prestige` (xp/points/count/highestMilestone) completely untouched — unlike `prestigeGame`, it doesn't award or spend Prestige Points — and increments `speedUpCount` by 1. Called either by the player's manual click or automatically by `tickGame` when Auto Speed Up is bought. See "Speed Up" below |
| `isTierUnlocked` | `state → tier → bool` | First tier always unlocked; later tiers need `owned[prevTier] >= 10` (or already unlocked, so old saves stay playable) |
| `getMoneyExponent` | `money → number` | `floor(log10(money))`, floored to 0 below 1 — money's order of magnitude, also what `checkMilestones` tracks as XP milestones |
| `getPrestigeProgressPercent` | `money → number` | `getMoneyExponent(money) / log10(GOOGOL) * 100`, rounded and clamped to `[0, 100]` — GOOGOL is exponent 100, so this reads as a whole percent equal to the money exponent itself |
| `getTierProductionProgressPercent` | `(state, tierId, previousAccumulator?, elapsedSeconds = 1) → number` | `state.tierProductionAccumulators[tierId] / getTierBaseTickSpeedSeconds(tierId) * 100`, rounded and clamped to `[0, 100]` — how far that tier's accumulator has filled toward its next delivery. If the optional `previousAccumulator` crosses the tier's tickspeed once `elapsedSeconds` is added (with the same `TICK_ACCUMULATION_EPSILON` tolerance `tickGame` uses), returns 100 instead — surfaces the instant a batch delivers, which the post-delivery wrapped remainder alone can't represent. `elapsedSeconds` defaults to `1` (a full real second). Currently unused by `MainPage` — it drove the removed per-tier tick-progress ring (see "Production figure" above) and is kept, with its unit tests, as the read-only accessor a future design would build on |
| `formatAmount` | `value → string` | Locale-formatted integer below `EXPONENTIAL_NOTATION_THRESHOLD` (1,000,000); scientific notation at/above (e.g. `6.5E13`) — used for non-money amounts (owned/purchased counts, and per-tier per-tick production amounts, except a tier producing Money which uses `formatCurrency` instead so the row stays consistent with every other Money display) |
| `formatCurrency` | `value → string` | Full comma-grouped `$`-prefixed string below `EXPONENTIAL_NOTATION_THRESHOLD`, floored (never rounds up); exponential notation (e.g. `$6.5E13`) at/above the same threshold — used for all Money amounts, wherever they appear |
| `getOfflineEffectiveSeconds` | `elapsedRealSeconds → number` | Caps `elapsedRealSeconds` at `MAX_OFFLINE_SECONDS`, scales by `OFFLINE_PROGRESS_SPEED_MULTIPLIER` (10%), floors — the number of simulated 1-second ticks `applyOfflineProgress` will replay |
| `applyOfflineProgress` | `(elapsedRealSeconds, autobuyerBatchSize = 1) → state → state` | Replays `tickGame(1, autobuyerBatchSize)` once per simulated second from `getOfflineEffectiveSeconds` — see "Offline progress" above |
| `formatOfflineDuration` | `totalSeconds → string` | `"1h 2m"` / `"1m 30s"` / `"45s"` (hours+minutes only above an hour, minutes+seconds only above a minute) — used to summarize the offline-progress notice's elapsed/simulated durations |
| `RESOURCE_SYMBOL` (`layers.js`) | `resourceId → string` | Returns the matching tier's `symbol`, `'$'` fallback for `MONEY_ID`/unknown ids |
| `getTierBaseTickSpeedSeconds` (`layers.js`) | `tierId → number` | Reads that tier's own independent `baseTickSpeedSeconds` field (currently 1s for every tier) — how often (in seconds) `tickGame` batches that tier's production instead of delivering it continuously every tick — see "Tier production tickspeed" above. An unrecognized tier id falls back to 1s |

### Constants (`src/game/layers.js`)

- `MONEY_ID = 'Ones'` — id of the base/root resource
- `MONEY_STARTING_AMOUNT = 10`
- `GOOGOL = 1e100` — money balance required to prestige
- `TICK_RATE_MS = 100` — the global tick fires every 100ms (10Hz); `elapsedSeconds` per live tick is
  `TICK_RATE_MS / 1000 = 0.1`. Every real-world-time-based rate (autobuyer/Auto-Prestige attempt budgets)
  is explicitly scaled by `elapsedSeconds` in `tickGame` (see "Tier production tickspeed" above) so
  real-world cadence is unaffected by this value — changing it only changes update granularity/animation
  smoothness, not game speed. `TICK_ACCUMULATION_EPSILON = 1e-9` (module-scoped in `engine.js`, not
  exported) is a related tolerance constant absorbing floating-point drift from repeatedly summing a
  fractional `elapsedSeconds` (see "Multiplier outcomes are floored" above)
- `OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1` — offline progress runs at 10% of normal speed
- `MAX_OFFLINE_SECONDS = 86400` (24 hours) — cap on real elapsed time counted toward offline progress
- `PRESTIGE_POINT_SPEED_BONUS = 0.01` — +1% production speed per unspent Prestige Point, once unlocked (see next)
- `PRESTIGE_SPEED_BONUS_UNLOCK_COST = 10000` — one-time PP cost to unlock the passive production speed bonus above (see `buyPrestigeSpeedBonus`) — inert until bought, regardless of PP balance. The priciest of the three global PP automation unlocks (see `AUTO_SPEED_UP_COST`/`AUTO_PRESTIGE_COST` below), since it's passive and always-on rather than a one-shot action
- `TICKSPEED_MULTIPLIER_BASE_EXPONENT = 10` — exponent driving the (Money-funded) tickspeed multiplier's per-tier base cost (see `getTickspeedMultiplierBaseCost`): 10^10 for the first tier, down to 10^1 for the 10th/last tier
- `TICKSPEED_PRODUCTION_STEP = 0.1` — each tickspeed multiplier level compounds a tier's production by another 10% (see `getTickspeedProductionMultiplier`)
- `AUTOBUYER_UNLOCK_BASE_COST = 1` — PP cost per tier index for unlocking a tier's autobuyer (see `getAutobuyerUnlockCost`) — a flat, small per-tier increment: 1 PP for the first tier, up through 10 PP for the 10th/last tier, deliberately independent of the much steeper `TICKSPEED_MULTIPLIER_BASE_EXPONENT` ladder above
- `SMART_AUTOBUYER_COST_MULTIPLIER = 10` — the "smart" autobuyer costs this many times more PP than unlocking that same tier's autobuyer (10 PP through 100 PP across the ten tiers)
- `GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.1` — each global tickspeed multiplier level compounds *every* tier's production by another 10% at once (see `getGlobalTickspeedProductionMultiplier`) — a separate constant from `TICKSPEED_PRODUCTION_STEP` above even though both currently equal 10%, since the two upgrades are independent and could be tuned separately
- `AUTO_PRESTIGE_COST = 1000` — PP cost to activate Auto-Prestige (level 1); a single global upgrade track, not per-tier. Priced above `AUTO_SPEED_UP_COST` since Auto-Prestige only ever fires once per run at most, versus Speed Up's much higher activation frequency
- `AUTO_PRESTIGE_COST_MULTIPLIER = 2` — Auto-Prestige's cost doubles with each level purchased
- `AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000` — Auto-Prestige's base check cadence at level 1, in real seconds (independent of `TICK_RATE_MS`); each level speeds this up 10%
- `SPEED_UP_MULTIPLIER_BASE = 2` — per-activation production-speed multiplier base for Speed Up (see `getSpeedUpMultiplier`/`speedUpGame`, "Speed Up" above) — unconditional, no PP unlock needed, unlike `PRESTIGE_POINT_SPEED_BONUS`
- `AUTO_SPEED_UP_COST = 100` — one-time PP cost to permanently automate Speed Up (see `buyAutoSpeedUp`) — the cheapest of the global PP automation unlocks that don't scale per-tier, since Speed Up itself fires far more often than either of the other two over a run

### Path aliases (`vite.config.js`)

`components/X` → `src/components/X`, `game/X` → `src/game/X`, `pages/X` → `src/pages/X`, `theme/X` →
`src/theme/X`. Use these bare aliases in imports (as the existing code does), not relative paths like
`../../game/engine`. Directory imports resolve to that directory's `index.jsx`/`index.js` (e.g.
`import { ThemeProvider } from 'theme'` → `src/theme/index.jsx`, same as `pages/MainPage` → its `index.jsx`).

## Theming

All component styling resolves to **semantic design tokens** defined once in `src/theme/tokens.js`, so
the app's two themes — an evolved **dark** (default) and a **light** theme — fall out of swapping palette
values rather than forking any component on mode. This is the foundation for the UI-revamp epic (#132);
components migrate onto these tokens one at a time in later sub-issues.

- **`tokens.js`** exports `buildTheme(mode)` (flattens the right palette for styled-components'
  `ThemeProvider`) and the two pre-built `themes.dark` / `themes.light`. A theme object exposes:
  `color` (per-mode: `page`, `surface`, `surfaceRaised`, `surfaceSunken`, `border`, `borderStrong`,
  `text`, `textMuted`, `textFaint`, `accent` (indigo brand), `good`/`warn`/`info`/`violet`/`danger`
  semantics kept distinct from the accent, `disabled`), `shadow` (`sm`/`md`, per-mode), `tierAccents`
  (per-mode 8-hue cycle for the tier left-edge stripe), plus mode-independent `space`, `radius`,
  `motion` (`duration`/`easing`), `font` (`display`/`body`/`mono`), and `type` (`scale` + `numeric`).
  Font families are system stacks for now — a deliberate seam the typography sub-issue (#136) swaps for
  locally-bundled faces.
- **`GlobalStyle.js`** (`createGlobalStyle`) replaces the removed `src/index.css` + `src/App.css`: the
  `box-sizing` reset, base font/smoothing, the form-control `font: inherit` rule, and the token-driven
  page background + text color (so the whole page repaints on a mode change).
- **`theme/index.jsx`** exports `<ThemeProvider mode>` (wrapping styled-components' `ThemeProvider`) and
  re-exports `GlobalStyle`/`themes`/`buildTheme`/`MODES`/`DEFAULT_MODE`. `App.jsx` renders
  `<ThemeProvider><GlobalStyle/><MainPage/></ThemeProvider>`. **`mode` is a plain prop defaulting to
  `dark`** — the system-preference detection + persisted user toggle that drives it is deferred to the
  light-mode activation sub-issue (#140); until then the app stays dark, now token-driven.

## Testing

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`, `App.test.jsx`.
- Environment: jsdom, globals enabled (`describe`/`it`/`expect` without imports), setup file
  `src/setupTests.js` (imports `@testing-library/jest-dom/vitest`).
- Component tests use Testing Library (`render`, `screen`, `userEvent`) and query by role/label text rather
  than test IDs; `StatCard` panels carry `aria-label="<tier name> layer"` for this purpose, and each tier
  row's Buy button nests a visually-hidden `role="progressbar"` (via `VisuallyHidden`) with
  `aria-label="<tier name> cost-block progress"`
  plus `aria-valuenow`/`aria-valuemin`/`aria-valuemax` — the Buy/tickspeed-multiplier/Unlock/Smart/Prestige
  buttons also carry
  an explicit `aria-label` with the full descriptive
  sentence (independent of their compact icon-based visible text — see Architecture above), so
  `getByRole('button', { name: … })` still matches even though a labeled node is nested inside them.
- Tests that seed `localStorage` directly must clear it in `beforeEach` (see `App.test.jsx`). Tests for the
  Reset button's `window.confirm` guard mock it via `vi.spyOn(window, 'confirm')` and restore it in
  `afterEach` (see `App.test.jsx`). If a test ever needs to observe behavior across real tick boundaries
  again (none currently does — the tick-progress ring tests that did were removed with the ring), use
  `vi.useFakeTimers()` + `act(() => vi.advanceTimersByTime(TICK_RATE_MS))` **once per tick** (not one
  large jump per assertion — jumping by more than one tick fires the live `setInterval` several times
  synchronously within the same call stack, which React 18 batches into a single render), and **unmount
  the rendered component before calling `vi.useRealTimers()`**, not after — unmounting while fake timers
  are still active lets the effect cleanup's `clearInterval` cancel the pending periodic callback against
  the same (fake) timer implementation that scheduled it; unmounting afterward calls the *real*
  `clearInterval` with a stale fake-timer id, which silently fails to cancel it, leaving a live interval
  running that starves subsequent `userEvent`-based tests into timing out (a real regression caught while
  raising `TICK_RATE_MS` to 10Hz, not merely a style preference).
- `yarn test` is green (379 tests). All four test files assert against the current tier/resource id scheme
  (`MONEY_ID = 'Ones'`, tier ids `tier01`/`tier02`/… with display names `Tens`/`Thousands`/…) — don't
  reintroduce the older lowercase scheme (`'money'`, `'ones'`, `'hundreds'`) that a previous, unfinished
  rename left behind in the tests; that mismatch has been reconciled in favor of the current
  `layers.js`/`engine.js` source.

## Security notes

- Dev and test-watch servers bind to `127.0.0.1` explicitly (`--host 127.0.0.1`) — do not change to `0.0.0.0`.
- All purchases, autobuyer upgrades, and prestige are validated inside `engine.js`, not just via disabled UI
  buttons — the engine re-checks affordability/unlock state on every call.
- `saveGameState`/`loadGameState`/`clearGameState`/`loadLastSaveTimestamp` wrap `localStorage` access in
  try/catch and fail silently (quota errors, private-browsing restrictions).
- Timer effects (`useIncrementalGame`'s `setInterval`) are cleaned up on unmount.
