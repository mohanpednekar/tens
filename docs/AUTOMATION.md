# Automation workflows

Referenced from `CLAUDE.md`'s "Automation workflows" section. Read this before touching any
file under `.github/workflows/`, or whenever reasoning in detail about how the unattended
PR-opening/fix-up/auto-merge pipeline behaves. `CLAUDE.md` keeps only a short summary and this
pointer so the full phase-by-phase logic below isn't loaded into every session's context by
default.

Five Claude-side workflows under `.github/workflows/` run Claude Code and GitHub automation
unattended, working together to open, fix up, and merge PRs with no human in the loop until an
approval is needed — except for a narrow, conservative class of low-risk bot-authored PRs that
merge on green checks alone (see Auto-merge below). All five authenticate git/GitHub operations
with a `GH_AUTOMATION_PAT` repo secret instead of the default `GITHUB_TOKEN`, because
commits/pushes/merges authored by the default token can't trigger other workflows (see
`docs/DESIGN_HISTORY.md` for why this matters concretely).
`autonomous-maintenance.yml`/`autonomous-pr-followup.yml`/`dependabot-pr-followup.yml`/
`automation-self-heal.yml` additionally need `id-token: write` (OIDC token for
`claude_code_oauth_token` auth) and `autonomous-maintenance.yml` needs `issues: write` (so its
guard step's `gh issue list --label claude-task` doesn't silently return empty) and
`security-events: read` (so its guard step's default-`GITHUB_TOKEN` call to the Dependabot alerts
REST API, used by Phase 0(c)/Phase B item 2 below, doesn't come back empty or 403 — GitHub enables
Dependabot alerts by default for public repos, so no separate manual step is needed for this one).
`automation-self-heal.yml` also needs `issues: write` so it can file `automation-failure` triage
issues when a config-level fix isn't confident.

**Cost implications:** this repo is public, so GitHub Actions minutes on standard runners are free and
unlimited. The real constraint is agent usage quota:

- **Claude** (`CLAUDE_CODE_OAUTH_TOKEN`, subscription-based): `autonomous-maintenance.yml` has no
  fixed `--max-turns` cap — its prompt instead has Claude self-estimate, at the start of every run,
  how much of the rolling 5-hour usage window is likely still available and aim to keep that run's
  work at or under roughly **50%** of a full window's worth of effort, recalculated fresh every
  invocation rather than tuned by hand after failures. 50% is a soft target, not a hard limit: it's
  a self-estimated heuristic (Claude Code has no API to query metered window consumption), with no
  visibility into concurrent usage from `autonomous-pr-followup.yml` or interactive sessions, so a
  modest overshoot is expected and not treated as a failure. See `docs/DESIGN_HISTORY.md` for why
  the earlier fixed-cap approach — and its `25→40→50` retuning history, now historical — was
  replaced. `autonomous-pr-followup.yml` keeps its own fixed `--max-turns 30` cap, unaffected by
  this change.

The engine is naturally self-limited further by the PR-dedup guard (below), which caps
concurrently-open autonomous PRs.

### Orchestration model

The maintainer orchestrates; the scheduled workflow develops. Interactive Claude Code sessions are
primarily for strategy discussion and turning that strategy into a backlog of well-defined, run-sized
`claude-task`-labeled GitHub issues (via `.github/ISSUE_TEMPLATE/claude-task.yml`: Goal / Context /
Spec & acceptance criteria / Files likely touched / Out of scope / Verification / Explicit
authorizations / Dependencies). The scheduled maintenance workflow implements those tasks unattended,
one per run; the follow-up + auto-merge workflows carry each PR to merge.

In an interactive session, when the user is discussing features, strategy, or a body of work, the
default deliverable is well-specified `claude-task` issues, not direct implementation — implement live
only when the user explicitly asks for that. Write each issue so it's small enough for a single
unattended run to complete without asking questions — roughly at or under half of a 5-hour usage
window's worth of work (see "Cost implications" above). Split anything bigger into a sequence of
issues ordered with "Blocked by #N" lines. An issue's "Explicit authorizations" section is the
maintainer's written sign-off for changes the workflow otherwise hard-bans; security constraints (no `--no-verify`, no
editing other workflow files, never push to main, never self-merge) can never be authorized away.
Issues labeled `priority:high` jump the queue; otherwise lowest-number-first. Whoever files a
`claude-task` issue should assign a `size:S`/`size:M`/`size:L` label; Phase A weighs this against its
own remaining budget when picking. See `docs/DESIGN_HISTORY.md` for the Milestones-vs-Track
distinction and the three automation design principles (determinism-first, judgment-call
transparency, conflict-avoidance sequencing) that have guided this model.

### Scheduled maintenance (`autonomous-maintenance.yml`)

Runs twice daily at **9:00am and 9:00pm IST** (cron `30 3,15 * * *` UTC — IST is UTC+5:30;
plus manual `workflow_dispatch`) via `anthropics/claude-code-action@v1`. Each run does exactly
one unit of work, chosen in three phases —
Phase 0 always outranks Phase A, which always outranks Phase B. Two follow-up steps reconcile the
job's exit status with what the run actually did (see `docs/DESIGN_HISTORY.md` for the incidents that
motivated this): a `blocked`-labeled task issue is excluded from Phase A picks, and a transient
Claude-side failure — HTTP 429 ("session limit") or a 5xx server overload (429/500/502/503/529,
e.g. "Overloaded") — is downgraded to a warning (job stays green) since it made no changes and the
next scheduled run retries automatically. Confirmed live on 2026-07-29: a run exhausted the SDK's own
10-attempt retry budget against a 529 and hard-failed under the classifier's original 429-only check
— broadened to the current 5xx-inclusive check so a purely transient Anthropic-side overload doesn't
read as a real break to the next run's Phase 0 CI check.

**Prompt assembly is a dedicated step, not inline in the action step.** A `Compose prompt` step (id
`compose-prompt`) runs before `claude-code-action` and builds the full instructional prompt — the same
Phase 0/A/B text described below — into a file via a quoted bash heredoc, substitutes the handful of
dynamic values (open PR/task/gap-issue/automation-retro lists, CI status, failing PRs, Dependabot alerts/PRs) using
bash's own `${var//pattern/replacement}` parameter expansion, and exposes the result as a single step
output. The `claude-code-action` step's `with.prompt:` is then just `${{ steps.compose-prompt.outputs.
prompt }}` — a lone expression with no literal text mixed in. This exists because GitHub Actions caps a
YAML scalar that mixes literal text and `${{ }}` expressions at 21,000 combined characters once
compiled, and this prompt's literal instructional text alone crossed that threshold on 2026-08-10,
taking the workflow down entirely (every run failed at parse time, before any job was even scheduled)
until fixed. See `docs/DESIGN_HISTORY.md` for the full incident. Anyone extending the prompt text (e.g.
via Phase B item 5's self-improvement task) edits the heredoc inside the `Compose prompt` step, not a
`with.prompt:` block — and should keep new dynamic values passed the same way (a step output
substituted via bash parameter expansion), not as an inline `${{ }}` back in the `with:` block.

**Guard-step list feeds are explicitly `--limit`-ed and, for the task backlog, capped/sorted for
display.** `gh issue list`/`gh pr list` default to `--limit 30`, newest-first — a silent truncation,
not an error, on any repo with more open items than that. This repo hit it for real: with 30+ open
`claude-task` issues, the guard step's unlimited `gh issue list` call silently dropped every issue
below the cutoff, including several `priority:high` ones (#45-49) that should have outranked what
Phase A was actually shown (see #45/#81's comment history). Every `gh issue list`/`gh pr list` call in
the guard step now passes an explicit `--limit` (200 for the task backlog, 100 elsewhere) well above
this solo project's realistic backlog size, so the CLI itself never silently drops an item. The task
backlog is additionally capped for *display* at 30 entries — sorted `priority:high` first, then
normal, then `priority:low`, each tier by ascending issue number (mirroring Phase A's own walk order)
— with a one-line "+N more, see the tracker directly" note appended if the real count exceeds the
cap, so a priority:high issue can never be silently pushed out of what the prompt shows, and the
feed's per-run token cost stays bounded rather than growing unboundedly with backlog size. This is a
narrower, already-landed slice of what #81 originally scoped (which assumed a larger set of guard-step
context feeds — Project summary, checklist status, Discussions ideas, etc. — that turned out not to
exist yet; see #81's Dependencies for why that fuller chain is still blocked).

That capping is also a **standing constraint on any future guard-step feed**, not just a description
of today's set — the part of #81 that can land ahead of its still-blocked audit. Whenever a later
issue adds a context feed (the Project summary #53, bug/security-alert lists #55, checklist status
#63, Discussions ideas #66, or anything else), it must arrive bounded: an
explicit `--limit` on the underlying `gh` call and a hard display cap with a "+N more, see the
tracker directly" note. *List-type* feeds render items as number + title + labels only (never full
bodies); status feeds bounded by design instead (Project field values, checklist state) keep to a
compact fixed-shape summary — either way the guard step's fixed per-run context cost stays bounded as
tracking surfaces accumulate. The rule applies to both engines' guard steps;
`devin-autonomous-maintenance.yml` `--limit`s and summarises its feeds but its backlog feed still
lacks the "+N more" overflow note — a known gap for the future audit to close, not a compliant
example.

`blocked` covers two distinct situations, not just one: an environment/permission restriction of the
unattended session itself (the original use case), and — per Phase A's comment-history check below —
a task issue where a second consecutive run independently reached the same "infeasible as written"
conclusion with nothing new in between (no maintainer reply, no issue edit, no relevant code change).
The latter exists because without it, a stale-spec issue that keeps winning FIFO order re-derives the
identical dead-end analysis every single run indefinitely — issue #101 did this 6 runs in a row before
being closed manually — instead of self-locking after the second occurrence the way an
environment/permission blocker already did from the first.

**Automation-retro reporting (#57)** is the third filing channel, for when the automation *itself*
misfires — a budget/turn overrun despite the self-estimated 50% target, an auto-merge that shouldn't
have fired, the duplicate-PR guard failing to prevent overlap, a tag/Project/release step erroring —
as opposed to a bug in the game (the `bug` pipeline, #55) or a missing repo capability
(`gap-analysis`, Phase B item 6). The prompt instructs any run, in any phase, that observes such a
misfire to file a `claude-task` + `automation-retro` issue describing what happened, what should have
happened, and a suggested process fix — linking the Actions run/job URL as evidence rather than
dumping logs, and checking the guard step's open-`automation-retro` feed first so a new report extends
an existing one instead of duplicating it. Quota-wall hits are classified distinctly: a lone
transient Claude-side 429/5xx needs no retro at all (the tolerated-failure classifier already
downgrades it to a warning and the next scheduled run retries); a *recurring* pattern of those
downgrades is the signal a retro exists to capture. Retros only propose — any workflow-file fix one
leads to is still bound by Phase B item 5's restrictions unless the issue's own Explicit
Authorizations says otherwise.

**Deploy-failure detection (`deploy.yml`, GitHub Pages) is a deterministic step, not part of the
Claude prompt** (see #256). The guard step's `main_deploy_broken`/`main_deploy_run_url` outputs
mirror `main_ci_broken` (`gh run list --workflow=deploy.yml --branch=main --status=completed
--limit=1`), but a separate `Surface a broken deploy.yml run` step — plain bash, no Claude
invocation — acts on it directly: per this repo's determinism-first automation-design principle (see
`AGENTS.md`), a broken deploy needs no judgment call, only a comment/issue post, so a script suffices.
This step runs unconditionally, independent of the guard step's `skip` output and of whether the
Claude step itself runs or is tolerated-skipped — a check folded into the Claude prompt instead would
silently never fire on a run that hit the 5-PR ceiling or a transient Claude-side failure, exactly the
"never remains invisible" guarantee this exists to provide. It comments on the most recently *merged*
PR (ordered by `mergedAt`, not `gh pr list`'s default ordering) linking the failed run, or opens a
small issue if no merged PR exists; either way it dedupes against a prior run's post for that exact
run URL before posting again. `deploy.yml` itself is never touched — it's on the protected/denied
file list below — so surfacing the failure to a human is the full extent of what this step does.

**Backlog/milestone hygiene is also deterministic and unconditional.** Two more plain-bash steps —
`Backlog issue hygiene` (`scripts/backlog-issue-hygiene.sh`, which also runs
`scripts/epic-407-issue-hygiene.sh`) and `Sync release milestones`
(`scripts/sync-release-milestones.sh`) — run every invocation, independent of the guard step's
`skip` output, the same posture as the deploy-failure step above: no judgment call is needed for
closing shipped issues, unblocking ready work, or keeping milestone assignments in sync, so a
script suffices and it shouldn't silently stop just because the 5-PR ceiling skipped that run's
Claude task. Both authenticate with `GH_AUTOMATION_PAT` and are idempotent, so running them twice
daily (rather than on a separate housekeeping-only schedule) is harmless.

**Concurrency.** A top-level `concurrency: { group: autonomous-maintenance, cancel-in-progress: false
}` block ensures no two runs of this workflow ever execute at once — a second trigger (e.g. a manual
`workflow_dispatch` from the dormancy watchdog firing while a scheduled cron run is still in progress)
queues behind the first rather than racing it. `cancel-in-progress` is deliberately `false`, not `true`:
cancelling an in-progress run mid-task would itself produce an orphaned `claude/auto-task-*` branch —
exactly the failure mode the orphaned-branch-recovery mechanism exists to clean up after — so queuing
avoids causing that unnecessarily rather than trading one race for another failure mode.

**Budget discipline.** Wall-clock time is not a constraint (one task per scheduled run is fine), but
agent usage quota is:

- **Claude** (`autonomous-maintenance.yml`): no fixed `--max-turns` cap (see "Cost implications"
  above). Before starting whatever task it picks, Claude self-estimates how much of the current
  rolling 5-hour usage window is likely still available and roughly sizes the task against a soft
  ~50% target, using elapsed turns/time during the run as the practical signal once underway, and
  reserving ~15-20% of that self-estimated budget for test + commit + push + PR-open overhead.

If a task looks too large even after buffering, the run scopes down rather than risking a runaway:
a Phase A task lands its largest coherent, test-covered *slice* first (PR body says
`Part of #<number>` instead of `Closes #<number>`, plus a `gh issue comment` recording what
remains); a Phase B menu task scopes to one coherent sub-area and leaves the rest for a future run.
Either way, the agent opens the PR as soon as there's a meaningful, test-passing first commit and
pushes each subsequent commit as it lands. A task issue's `size:S`/`size:M`/`size:L` label is
advisory context, not a gate. Skipping a task this way is noted in reasoning/PR description, not
silent.

**Reliability: cron dormancy.** GitHub Actions disables a workflow's cron trigger after 60 days with no
repository activity. Unlikely in practice since merged automation PRs count as activity and Phase B's
gap-analysis item keeps proposing new work — but the actual backstop is external: a periodic check on
separate infrastructure re-kicks the workflow via `workflow_dispatch` if it's gone quiet longer than
expected. See `docs/DESIGN_HISTORY.md` for detail.

**Phase 0 — CI/CD failures and unaddressed critical/high Dependabot alerts (top priority).** The
guard step checks whether the latest completed `ci.yml` run on `main` failed, and separately lists
any open PR (excluding `claude/auto-*` and fork PRs) with a failing check. Either condition outranks
Phase A/B and is the one case allowed to bypass the 5-PR ceiling below. If `main` is broken, Claude
reads the failing run's logs, fixes the regression on a branch named `claude/heal-main-<short-slug>`,
confirms `yarn test`/`yarn build` are green, and opens a PR (this branch prefix is already recognized
by `pr-auto-merge.yml`'s low-risk path). Otherwise, for a stale Dependabot PR confirmed behind `main`
(failing only because its branch predates a source change, not the dependency bump), Claude comments
`@dependabot rebase` — checking existing comments first, and never pushing its own commits to a
`dependabot/*` branch. Any other failure without an obviously safe fix is left for a human.

Otherwise — 0(c) — the guard step also fetches every open Dependabot *security alert* (not just PRs)
via the REST API, sorted severity-first (critical → high → medium → low), the same way Phase A sorts
`priority:high`/normal/`priority:low` task issues. A critical or high severity alert with no matching
open Dependabot PR already in flight (cross-checked by package name) outranks the Phase A backlog:
Claude reads the alert's vulnerable/patched version range and, if the fix is a safe patch/minor bump,
applies it directly (branch `claude/auto-dep-alert-<number>-<short-slug>`, PR body noting `Addresses
Dependabot alert #<number>` — merging removes the vulnerable version, which is what actually closes
the alert; Claude never calls the API to dismiss one directly). A fix needing a major/breaking bump,
or a package it can't safely resolve with confidence, gets a `claude-task` issue filed instead
(labeled `claude-task`, `priority:high`, `security`) so it jumps to the front of Phase A rather than
being attempted half-way. Medium/low severity alerts are left for Phase B item 2 below rather than
elevated here. If none of (a)/(b)/(c) apply, falls through to Phase A.

**Phase A — task backlog next.** Claude walks the open `claude-task` backlog in order —
`priority:high` first, then normal (unlabeled) issues by lowest issue number, then `priority:low`
issues last (only picked once no `priority:high` or normal-priority eligible issue remains open —
this governs default autonomous ordering, not an absolute ban: a maintainer or interactive session
can still ask for a `priority:low` issue directly, and it's also picked early if it's genuinely the
only eligible candidate left) — skipping tasks already covered by an open autonomous
PR and tasks with an open "Blocked by #N" dependency — and implements the first candidate that's
actually implementable, rather than stopping at the first one it tries. For each candidate in turn:
checks the issue's own comment history for a prior automated investigation before diving in (see
below); if it clears that, reads the full spec. If the candidate proves infeasible for reasons other
than size, Claude comments on the issue explaining what's blocking, makes no changes, and **moves on to
the next eligible candidate** instead of ending the run there — comment-only on a given issue's first
such occurrence, but if that issue's history already shows a prior comment reaching the same
"infeasible as written" conclusion with nothing new since, Claude also applies the `blocked` label on
this run instead of leaving it comment-only again, so the same dead-end analysis isn't repeated a third
time. A running budget check bounds the walk itself: once further skips risk leaving too little of the
run's self-estimated budget to actually implement whatever comes next, Claude stops the walk and ends
the run without a PR rather than forcing a rushed implementation. Once it lands on an implementable
candidate, it proceeds as normal — implements it on `claude/auto-task-<number>-<short-slug>`, PR body
includes `Closes #<number>` unless it's a partial slice (see Budget discipline). If every eligible
candidate in the backlog is exhausted without finding one that's implementable, the run ends without a
PR — the comments (and any new `blocked` labels) left along the way are still real, durable progress.

**Phase B — maintenance menu fallback.** Only when no eligible task issue exists, the run picks the
single most valuable applicable task from: (1) test coverage gaps, (2) dependency & security
maintenance (`yarn audit` + safe patch/minor bumps, plus the medium/low-severity Dependabot alerts
Phase 0(c) leaves for this item — critical/high alerts are Phase 0(c)'s job, not this one's), (3) code
quality / simplification, (4) CLAUDE.md documentation sync, (5) workflow self-improvement (scoped to
`autonomous-maintenance.yml` only — may not weaken the duplicate-PR guard, the budget cap, the
never-self-merge rule, the always-open-a-PR requirement, or Phase A's priority), (6) gap analysis —
survey the repo for a gap not already covered by an open issue/PR and file exactly one well-specified
`claude-task` issue proposing a solution (never opens a PR itself; new proposals get both
`claude-task` and `gap-analysis` labels).

Adding new tiers to `TIER_DEFINITIONS` (and economy changes generally) is banned during Phase B, and
allowed in Phase A only when the task issue's "Explicit authorizations" section explicitly permits that
specific change. PRs are minimised for *similar* work but not capped to one at a time — Claude skips
opening a PR that duplicates an already-open one's purpose, while still opening a separate PR for a
genuinely independent task. A hard ceiling of 5 concurrently-open autonomous PRs is a safety net
(bypassed only by Phase 0's main-is-broken case). `ci.yml`, `deploy.yml`, `release.yml`,
`autonomous-pr-followup.yml`, and `pr-auto-merge.yml` are all explicitly denied to Claude's Edit/Write
tools, even during the self-improvement task — only `autonomous-maintenance.yml` may edit itself.

### PR conflict sweep (`pr-conflict-sweep.yml`)

Deterministic (no agent). On every push to `main` — i.e. every merge — it lists all open PRs and
checks each one's `mergeable` state. A PR that is `CONFLICTING` gets a comment with a per-head-SHA
dedupe marker (`<!-- pr-conflict-sweep sha=... -->`, so a PR left conflicted across several merges
isn't re-spammed, but a new head resets it). For `claude/auto-*`/`devin/auto-*` branches — exactly
the patterns `autonomous-pr-followup.yml` accepts — the comment doubles
as its trigger, and the follow-up performs the actual merge-and-resolve;
human-authored PRs just get an author notification. Runs on `GH_AUTOMATION_PAT` because comments
from the default `GITHUB_TOKEN` can't trigger other workflows.

### Devin autonomous maintenance (`devin-autonomous-maintenance.yml`)

The Devin-CLI counterpart to `autonomous-maintenance.yml`, running every 4 hours at :17 UTC.
Each run installs the Devin CLI (credentials from the `DEVIN_CLI_CREDENTIALS` repo secret — a
`credentials.toml` copied from a machine where `devin auth login` was run), then invokes
`devin -p --prompt-file <file> --model swe --permission-mode dangerous
--respect-workspace-trust false` with a composed prompt mirroring Phase 0 → Phase A: fix a red
`main` CI first, else pick the top eligible `claude-task` issue and implement it on a
`devin/auto-<issue>-<slug>` branch with a PR into `main`. The guard step counts `devin/auto-*`
and `claude/auto-*` open PRs together toward the shared 5-PR ceiling (a red main bypasses it)
and sorts the backlog `priority:high` → normal → `priority:low` with `blocked` excluded.

Unlike the Claude counterpart, the Devin agent runs under `--permission-mode dangerous` rather
than a settings deny-list, and its prompt places **no file-scope restriction**: it may modify
anything in the repo — including `.github/workflows/` (its own file included) and
deploy/release config — when a task calls for it. The hard rails that remain are never push to
`main`, never merge its own PR, and always land changes via PR + human review
(`pr-auto-merge.yml` still excludes `.github/workflows/**` PRs from green-checks auto-merge, so
workflow edits stay human-gated).

**Health check (`devin-workflow-health.yml`).** A daily midnight-UTC watchdog with no agent:
parses the workflow file as YAML, confirms a run started within the last 26h (catches a
disabled/dormant schedule — a breakage producing no run at all is invisible to
`automation-self-heal.yml`'s `workflow_run` trigger), and checks the latest completed run's
conclusion. On failure it files — or comments on an existing — `automation-failure`-labeled
issue and exits red. Per-run failures are additionally watched directly by
`automation-self-heal.yml` (Devin autonomous maintenance is in its watched list), which can
open a `claude/self-heal-devin-autonomous-maintenance-*` fix PR.

### Shared workflow helpers

To keep the workflows DRY and single-responsibility, three pieces are extracted instead of
copied per-workflow:

- `.github/actions/setup-node-yarn` — composite action: `corepack enable` →
  `actions/setup-node@v7` (Node 22, yarn cache) → `yarn install --frozen-lockfile`
  (`install: "false"` skips the install for agent-driven jobs that run yarn themselves).
  **Trusted refs only** — never `uses:` it in a job whose checkout is an untrusted PR SHA;
  a composite's steps execute with the workflow's privileges, so a hostile branch could
  replace them. The PR-follow-up workflows keep Node setup inline for exactly that reason.
- `scripts/pr-head-guard.sh <pr> <glob...>` — resolves a PR's head branch/SHA from the API,
  refuses fork heads, and enforces the branch prefix. Prints `branch<TAB>sha`. The
  follow-up workflows fetch it via a sparse `ref: main` checkout *before* checking out the
  pinned PR SHA, so the guard can't be weakened by the branch it authorizes.
- `scripts/claude-deny-settings.sh [extra-file...]` — emits the `settings` JSON for
  `anthropics/claude-code-action` from a shared base deny-list (`ci.yml`, `deploy.yml`,
  `release.yml`, `automation-self-heal.yml` — never editable by an unattended Claude agent) plus
  caller-supplied
  extras (follow-up workflows pass every other workflow file since their prompts forbid
  all workflow edits). Run it from the same trusted main checkout as the guard.

### PR follow-up (`autonomous-pr-followup.yml`)

Since no human (or live Claude Code session) is watching between scheduled runs, this workflow closes
the loop on PRs the maintenance workflow opens. It fires on new PR reviews, new PR comments, and
failing check suites, filters to PRs on `claude/auto-*` branches only, and re-invokes Claude
(`--max-turns 30`) to read the actual feedback/CI failure and push a genuine fix to the *existing*
branch — it never opens a new PR and never merges or approves. Same hard constraints as the main
workflow (no `--no-verify`, no faking a check green, no touching other workflow files). It resolves
the target branch via `gh pr view --json headRefName,isCrossRepository` (refusing fork PRs), passes
untrusted event fields through `env:` (not shell interpolation), gates on the triggering commenter
having write access via a native workflow `if:`, and checks out the exact commit SHA rather than the
branch name before running `git checkout -B <branch>` to un-detach HEAD. See
`docs/DESIGN_HISTORY.md` for the security reasoning behind each of these.

### Dependabot PR follow-up (`dependabot-pr-followup.yml`)

Companion to `autonomous-pr-followup.yml` for Dependabot dependency-bump PRs. Phase 0 of
`autonomous-maintenance.yml` already covers the "branch is simply behind `main`" case by commenting
`@dependabot rebase` (and never pushes its own commits to a `dependabot/*` branch). What this
workflow covers is the residual gap: a *real* breaking-change CI failure caused by the bumped
dependency itself.

It triggers only on `check_suite: [completed]`, skips unless conclusion is `failure`, an open
same-repo PR exists for the branch, and the branch starts with `dependabot/`. Untrusted event
fields go through `env:` (never shell-spliced). Checkout is pinned to the `headRefOid` resolved at
guard time (same TOCTOU rationale as the autonomous follow-up). It re-invokes Claude
(`--max-turns 30`) with instructions to keep the bumped version (never downgrade to dodge the
failure), push a genuine call-site/config fix to the *existing* Dependabot branch, or leave exactly
one explanatory `gh pr comment` if it cannot confidently fix — never open a new PR, never
force-push, never merge or approve. `settings.permissions.deny` blocks Edit/Write on `ci.yml`,
`deploy.yml`, `release.yml`, `autonomous-maintenance.yml`, `autonomous-pr-followup.yml`,
`pr-auto-merge.yml`, and its own file. Merging a fixed Dependabot PR still goes through the existing `pr-auto-merge.yml`
paths (human approval, or green-checks low-risk for patch/minor bumps) — unchanged.

### Automation self-heal (`automation-self-heal.yml`)

When an automation-orchestration workflow fails a run, this companion diagnoses the failure from
the failed run's logs and either opens a **draft** config-level fix PR on a `claude/self-heal-*`
branch, or files/updates a GitHub issue labeled `automation-failure` for human triage — so a
failure doesn't sit unnoticed until someone checks the Actions tab. It does **not** cover `ci.yml`
or `deploy.yml` (product-facing; broken-`main` CI is Phase 0 / issue #37; broken deploys are
surfaced by the deterministic deploy-failure step above). It also never edits its own file
(runaway self-modification ban).

**Watched workflows** (by `name:`): Autonomous maintenance, Devin autonomous maintenance,
Autonomous PR follow-up, Auto-merge on
approval, Dependabot PR follow-up. Trigger is
`workflow_run: [completed]`, filtered in-job to `conclusion == 'failure'`.

**Guard:** skips when a `claude/self-heal-<workflow-slug>-*` PR is already open for the same
failing workflow, and hard-caps at 3 concurrently-open `claude/self-heal-*` PRs total. Failed-run
logs are fetched with `gh run view --log-failed` and capped (~80 KiB / ~1200 lines) before being
passed to the agent.

**Agent:** `anthropics/claude-code-action@v1` with `CLAUDE_CODE_OAUTH_TOKEN` +
`GH_AUTOMATION_PAT`, `--max-turns 25`, no `yarn` tools (workflow-config only).
`settings.permissions.deny` blocks Edit/Write on `ci.yml`, `deploy.yml`, `release.yml`, and
`automation-self-heal.yml` itself — and deliberately **omits** the watched automation workflow
files so a confident config fix can land (issue #36's deny-list-narrowing authorization). Choose
exactly one path: (1) confident config fix → draft PR on
`claude/self-heal-<slug>-<short-desc>`; (2) residual transient/infra (GitHub API 5xx,
runner/network) → no-op (Claude-side 429/5xx on autonomous-maintenance already stay green
upstream); (3) not confidently fixable → `automation-failure` issue (deduped). Never weakens
never-self-merge / always-open-a-PR / PAT+OIDC auth / `ci.yml`/`deploy.yml` deny entries /
duplicate-PR or budget guards; never `gh run rerun`s the failed run.

### Auto-merge (`pr-auto-merge.yml`)

Three independent paths, any of which calls `gh pr merge --auto --merge` to enable GitHub's native
auto-merge (merge commit — must match the Main ruleset's `allowed_merge_methods`, which is
`merge` + `rebase` only; `--squash` is rejected and makes every PR look unmergeable to anything
that defaults to squash — see issue #343):

1. **On human approval** (`pull_request_review: submitted`) — if the review is an approval from the
   repo owner or a collaborator/member, auto-merge is enabled unconditionally, any PR, any size.
   Repo-wide, not just autonomous PRs.
2. **On green checks, without waiting for approval** (`check_suite: completed`, conclusion `success`)
   — for PRs on our own automation's branches only (`claude/auto-*`, `claude/self-heal-*`,
   `claude/heal-main-*`, `dependabot/*`; never a fork),
   auto-merge is enabled immediately once the diff meets a conservative "low risk" bar (shared
   implementation: `scripts/pr-low-risk-eligible.sh` / `scripts/enable-auto-merge-if-eligible.sh`):
   the whole diff touches only `CLAUDE.md`/`*.test.js`/`*.test.jsx` (docs/tests-only), OR total
   changed lines ≤50, OR it's a Dependabot PR with a patch/minor semver bump (major bumps wait for
   approval). A PR touching anything under `.github/workflows/` is **always** excluded from this
   path regardless of size or content. This path does **not** mark drafts ready (a still-draft PR
   is skipped so WIP work with green CI is not promoted). Plain shell / shared scripts — no Claude
   invocation — for speed and determinism.
3. **On adversarial APPROVE after the final commit** (`issue_comment: created` containing
   `<!-- adversarial-review sha=<headOid> verdict=APPROVE -->`) — when that marker matches the PR's
   **current** head SHA and the PR also meets the same low-risk bar, auto-merge is **always**
   enabled and a draft is marked ready. Only comments from `OWNER` / `COLLABORATOR` / `MEMBER`
   trigger this path (same public-repo pwn-request gate as the PR-followup workflows); the
   *triggering* comment must itself carry the HEAD-matching marker. This is the automation half of
   CLAUDE.md's "After the final commit" ritual: agents run `.claude/agents/code-reviewer.md`, post
   the marker (via `scripts/adversarialReviewMarker.js`'s formatter), then run
   `scripts/enable-auto-merge-if-eligible.sh <pr> --require-adversarial-approve` (or rely on this
   path firing from the comment). `NEEDS_CHANGES` / `BLOCK` markers never enable auto-merge.
   Non-low-risk APPROVEs still need a human via Path 1. The enable script checks low-risk
   eligibility **before** marking a draft ready, so an ineligible PR is never promoted.

**After final commit (agent duty).** For every finished autonomous or interactive PR: run the
adversarial reviewer on the final head → post the marker comment → on APPROVE+low-risk always
enable auto-merge (script above). Enabling auto-merge here is an explicit standing exception to
"never self-merge"; force-merging, pushing to `main`, and GitHub-approving your own PR remain
forbidden. Workflow-file PRs remain human-gated via CODEOWNERS + Path 2/3 exclusions.

**Three one-time manual prerequisites** (not settable through tools available to a Claude Code
session):
- The `GH_AUTOMATION_PAT` repo secret (fine-grained PAT scoped to this repo, Contents: read/write,
  Pull requests: read/write, Issues: read/write, Workflows: write), alongside
  `CLAUDE_CODE_OAUTH_TOKEN`.
- "Allow auto-merge" enabled in repo Settings → General, and branch protection on `main` requiring
  the `test` check from `ci.yml`.
- "Require review from Code Owners" in that same branch-protection rule, so the `.github/CODEOWNERS`
  entry mapping `.github/workflows/**` to the repo owner actually takes effect (tracked in issue #62's
  checklist until confirmed done).

### Release (`release.yml`)

Deterministic (no agent) — the post-merge half of #52, complementing the pre-merge
`yarn bump-version` script (`scripts/bump-version.mjs`). Fires on `push` to `main` filtered to
`paths: ['package.json']`, so it only runs when a merged PR touched the version file. Each run
operates on its own pushed SHA (no concurrency queue — a dropped middle run could otherwise skip
a version's tag entirely), reads `package.json`'s `"version"` there, and exits silently when the
push didn't actually change `"version"` (dependency bumps and other non-version `package.json`
edits — guarding against tagging the current version at a non-release commit, which would also
preempt #51's historical tag placement) or when both the tag and its GitHub Release already
exist. An existing tag is always verified to point at the pushed SHA first — a tag (with or
without a Release) pointing anywhere else means a manual/historical tag and fails loudly rather
than being silently accepted. A backward/sideways version move fails loudly. Otherwise it extracts that version's
`## [x.y.z]` section from `CHANGELOG.md` — reusing `bump-version.mjs`'s
`extractVersionSection`, one parser for both the tag message and the Release body — pushes an
annotated `v<version>` tag at that pushed SHA, and creates a GitHub Release (`v<version>`
title, notes = the same changelog section). Both writes go through `GH_AUTOMATION_PAT`; the
workflow makes **no commits and no PRs**, so "never push to main" stays intact — the version bump
itself still lands inside the PR diff via `yarn bump-version` before merge. If `package.json`'s
version has no matching changelog section (or one with no bullet entries) the run fails loudly
rather than tagging a noteless release — that state means the bump step was skipped or
hand-edited and needs a human. The job is resumable: a tag that already exists without a Release
(e.g. a prior run died between the tag push and `gh release create`) is first verified to point
at the pushed SHA — a mismatch means a manual/historical tag and fails loudly — then the run
finishes just the Release. It is on
the shared deny-list's protected base (`scripts/claude-deny-settings.sh`), so no unattended
*Claude* agent can edit it; the Devin engine runs without a deny list and is covered by the
always-open-a-PR + CODEOWNERS human-review gate instead. Failures are not watched by
`automation-self-heal.yml` (a red run is visible on the Actions tab / commit status like any
other main-branch workflow).

### PR review & testing cadence

Applies to every PR (interactive or autonomous), on top of the general "Pull requests" rules in
`CLAUDE.md`. The verification effort deliberately scales with how public the PR's state is —
cheap while work is still private to the session, heavier once other reviewers can see it:

1. **Mid-session, before a PR exists.** Follow the standard budget-discipline default: run
   `yarn test` (or a targeted `yarn test -t "…"` / single-file run for fast iteration) once after
   completing a coherent set of related changes, not after every individual edit. Don't re-run a
   full suite that hasn't been invalidated by a subsequent change.
2. **At PR creation (draft).** Run one full local check before opening it — `yarn test`, plus
   `yarn build` when the change could plausibly affect the build — so the draft starts from a
   confirmed-green baseline rather than surfacing a break to reviewers first.
3. **Once marked ready for review.** This is where review effort goes up, not down: run the
   adversarial `code-reviewer` subagent, and expect/incorporate findings from other reviewers too
   (human, Copilot, other bots) — per `CLAUDE.md`'s existing "keep repeating check → address → push
   until status quo" loop. Don't stop after the first round just because it was addressed; a
   finding that recurs after a fix means dig for the root cause, not declare done.
4. **Quiet-period merge trigger (only for a direct merge outside all three `pr-auto-merge.yml`
   paths).** All three paths in the "Auto-merge" section above stay immediate by design and this
   cadence step never delays or gates any of them: Path 1 fires unconditionally on any qualifying
   human GitHub approval regardless of size/risk, and Paths 2/3 fire immediately once a diff is
   low-risk-eligible (with or without the adversarial marker). Between the three, essentially every
   normal case is already covered the instant its trigger condition is met — there is no "human
   approval on a non-low-risk PR" gap the quiet period needs to fill, since Path 1 already handles
   that immediately. This step is only for the narrow remaining case: a session about to merge a PR
   **directly itself** (e.g. `gh pr merge`, bypassing `pr-auto-merge.yml` entirely) because none of
   the three paths applies — most plausibly, a sign-off that doesn't take the form of a qualifying
   GitHub review approval. There, once the PR is ready for review and CI is green, wait until **10
   minutes pass with no new review activity** (no new comment, review, or push) before merging
   directly, rather than merging the instant the sign-off lands. A session actively driving such a
   PR should use `send_later` (or an equivalent short check-in) to re-check after the quiet window.
   The point is to give a concurrently-posting reviewer a moment to land one more comment before the
   PR locks in. This never overrides the existing rule that a PR touching `.github/workflows/**` stays
   human-gated via CODEOWNERS.

### AI-instruction file cost hygiene

The repo's AI-instruction files (`CLAUDE.md`, `.claude/CLAUDE.md`, `AGENTS.md`,
`.claude/agents/*.md`, `.claude/skills/*/SKILL.md`) are loaded into session context on every run —
`CLAUDE.md`/`.claude/CLAUDE.md` unconditionally, the rest whenever that agent/skill fires — so their
size is a direct, recurring cost multiplied across every future session, autonomous and
interactive alike. `.claude/skills/optimize-ai-files/SKILL.md` defines a content-independent,
meaning-preserving compaction process for these files: it doesn't hardcode what to cut (that would
go stale the moment the files change), it defines *how* to find genuine redundancy/verbosity and
verify nothing behavior-relevant was lost before keeping an edit.

Two ways this runs — running it at least once per interactive session that notices staleness is
enough, but a fully automated recurring routine needs nobody to notice at all, so that's preferred
where available:

- **Interactive sessions.** `.claude/hooks/session-start.sh` prints a non-blocking staleness note
  (based on the most recent commit carrying an `AI-File-Cost-Pass: <timestamp>` trailer, searched
  within `main`'s own ancestry — not every ref — so a stray trailer on an unmerged/abandoned branch
  can't under-report staleness) — informational only, matching that hook's existing "visibility, not
  blocking" philosophy. A session seeing a stale/missing pass can invoke the skill directly; this is
  a nudge, not a gate.
- **Scheduled routine.** A recurring Claude Code Remote trigger (Routine) fires a fresh session
  monthly to run the skill end-to-end: clone the repo, follow the skill's process, and open a PR
  through the normal PR workflow above (draft while pending, adversarial review before merge,
  same auto-merge policy as any other PR — this pass gets no special exemption from review). The
  routine's cadence and prompt are managed via `update_trigger`/`list_triggers`, not by editing a
  file in this repo.

This pass is scoped to the AI-instruction files themselves — it never touches source code,
`TIER_DEFINITIONS`, or workflow YAML behavior, and it must preserve every documented fact, safety
rule, and `docs/DESIGN_HISTORY.md` pointer even while shortening the prose around them.

