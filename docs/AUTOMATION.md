# Automation workflows

Referenced from `CLAUDE.md`'s "Automation workflows" section. Read this before touching any
file under `.github/workflows/`, or whenever reasoning in detail about how the unattended
PR-opening/fix-up/auto-merge pipeline behaves. `CLAUDE.md` keeps only a short summary and this
pointer so the full phase-by-phase logic below isn't loaded into every session's context by
default.

Three workflows under `.github/workflows/` run Claude Code and GitHub automation unattended, working
together to open, fix up, and merge PRs with no human in the loop until an approval is needed — except
for a narrow, conservative class of low-risk bot-authored PRs that merge on green checks alone (see
Auto-merge below). All three authenticate git/GitHub operations with a `GH_AUTOMATION_PAT` repo secret
instead of the default `GITHUB_TOKEN`, because commits/pushes/merges authored by the default token
can't trigger other workflows (see `docs/DESIGN_HISTORY.md` for why this matters concretely).
`autonomous-maintenance.yml`/`autonomous-pr-followup.yml` additionally need `id-token: write` (OIDC
token for `claude_code_oauth_token` auth) and `autonomous-maintenance.yml` needs `issues: write` (so
its guard step's `gh issue list --label claude-task` doesn't silently return empty) and
`security-events: read` (so its guard step's default-`GITHUB_TOKEN` call to the Dependabot alerts
REST API, used by Phase 0(c)/Phase B item 2 below, doesn't come back empty or 403 — GitHub enables
Dependabot alerts by default for public repos, so no separate manual step is needed for this one).

**Cost implications:** this repo is public, so GitHub Actions minutes on standard runners are free and
unlimited. The real constraint is Claude usage quota (`CLAUDE_CODE_OAUTH_TOKEN` is subscription-based).
`autonomous-maintenance.yml` has no fixed `--max-turns` cap — its prompt instead has Claude
self-estimate, at the start of every run, how much of the rolling 5-hour usage window is likely still
available and aim to keep that run's work at or under roughly **50%** of a full window's worth of
effort, recalculated fresh every invocation rather than tuned by hand after failures. 50% is a soft
target, not a hard limit: it's a self-estimated heuristic (Claude Code has no API to query metered
window consumption), with no visibility into concurrent usage from `autonomous-pr-followup.yml` or
interactive sessions, so a modest overshoot is expected and not treated as a failure. See
`docs/DESIGN_HISTORY.md` for why the earlier fixed-cap approach — and its `25→40→50` retuning
history, now historical — was replaced. `autonomous-pr-followup.yml` keeps its own fixed `--max-turns
30` cap, unaffected by this change. Both workflows are naturally self-limited further by the PR-dedup
guard (below), which caps concurrently-open autonomous PRs.

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

Runs every 5 hours (cron `0 */5 * * *`, plus manual `workflow_dispatch`) via
`anthropics/claude-code-action@v1`. Each run does exactly one unit of work, chosen in three phases —
Phase 0 always outranks Phase A, which always outranks Phase B. Two follow-up steps reconcile the
job's exit status with what the run actually did (see `docs/DESIGN_HISTORY.md` for the incidents that
motivated this): a `blocked`-labeled task issue is excluded from Phase A picks, and a transient
Claude-side failure — HTTP 429 ("session limit") or a 5xx server overload (429/500/502/503/529,
e.g. "Overloaded") — is downgraded to a warning (job stays green) since it made no changes and the
next scheduled run retries automatically. Confirmed live on 2026-07-29: a run exhausted the SDK's own
10-attempt retry budget against a 529 and hard-failed under the classifier's original 429-only check
— broadened to the current 5xx-inclusive check so a purely transient Anthropic-side overload doesn't
read as a real break to the next run's Phase 0 CI check.

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
`blocked` covers two distinct situations, not just one: an environment/permission restriction of the
unattended session itself (the original use case), and — per Phase A's comment-history check below —
a task issue where a second consecutive run independently reached the same "infeasible as written"
conclusion with nothing new in between (no maintainer reply, no issue edit, no relevant code change).
The latter exists because without it, a stale-spec issue that keeps winning FIFO order re-derives the
identical dead-end analysis every single run indefinitely — issue #101 did this 6 runs in a row before
being closed manually — instead of self-locking after the second occurrence the way an
environment/permission blocker already did from the first.

**Concurrency.** A top-level `concurrency: { group: autonomous-maintenance, cancel-in-progress: false
}` block ensures no two runs of this workflow ever execute at once — a second trigger (e.g. a manual
`workflow_dispatch` from the dormancy watchdog firing while a scheduled cron run is still in progress)
queues behind the first rather than racing it. `cancel-in-progress` is deliberately `false`, not `true`:
cancelling an in-progress run mid-task would itself produce an orphaned `claude/auto-task-*` branch —
exactly the failure mode the orphaned-branch-recovery mechanism exists to clean up after — so queuing
avoids causing that unnecessarily rather than trading one race for another failure mode.

**Budget discipline.** Wall-clock time is not a constraint (one task every 5 hours is fine), but Claude
usage quota is. There's no fixed `--max-turns` cap on this workflow (see "Cost implications" above) —
instead, before starting whatever task it picks, Claude self-estimates how much of the current rolling
5-hour usage window is likely still available and roughly sizes the task against a soft ~50% target,
using elapsed turns/time during the run as the practical signal once underway, and reserving ~15-20% of
that self-estimated budget for test + commit + push + PR-open overhead. If a task looks too large even
after buffering, it scopes down rather than risking a runaway run: a Phase A task lands its largest
coherent, test-covered *slice* first (PR body says `Part of #<number>` instead of `Closes #<number>`,
plus a `gh issue comment` recording what remains); a Phase B menu task scopes to one coherent sub-area
and leaves the rest for a future run. Either way, Claude opens the PR as soon as there's a meaningful,
test-passing first commit and pushes each subsequent commit as it lands. A task issue's
`size:S`/`size:M`/`size:L` label is advisory context, not a gate. Skipping a task this way is noted in
reasoning/PR description, not silent.

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
(bypassed only by Phase 0's main-is-broken case). `ci.yml`, `deploy.yml`,
`autonomous-pr-followup.yml`, and `pr-auto-merge.yml` are all explicitly denied to Claude's Edit/Write
tools, even during the self-improvement task — only `autonomous-maintenance.yml` may edit itself.

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

### Auto-merge (`pr-auto-merge.yml`)

Two independent paths, either of which calls `gh pr merge --auto --squash` to enable GitHub's native
auto-merge:

1. **On human approval** (`pull_request_review: submitted`) — if the review is an approval from the
   repo owner or a collaborator/member, auto-merge is enabled unconditionally, any PR, any size.
   Repo-wide, not just autonomous PRs.
2. **On green checks, without waiting for approval** (`check_suite: completed`, conclusion `success`)
   — for PRs on our own automation's branches only (`claude/auto-*`, `claude/self-heal-*`,
   `claude/heal-main-*`, `dependabot/*`; never a fork), auto-merge is enabled immediately once the
   diff meets a conservative "low risk" bar: the whole diff touches only
   `CLAUDE.md`/`*.test.js`/`*.test.jsx` (docs/tests-only), OR total changed lines ≤50, OR it's a
   Dependabot PR with a patch/minor semver bump (major bumps wait for approval). A PR touching
   anything under `.github/workflows/` is **always** excluded from this path regardless of size or
   content. This path is a plain shell script (no Claude invocation) for speed and determinism.

**Three one-time manual prerequisites** (not settable through tools available to a Claude Code
session):
- The `GH_AUTOMATION_PAT` repo secret (fine-grained PAT scoped to this repo, Contents: read/write,
  Pull requests: read/write, Issues: read/write), alongside `CLAUDE_CODE_OAUTH_TOKEN`.
- "Allow auto-merge" enabled in repo Settings → General, and branch protection on `main` requiring
  the `test` check from `ci.yml`.
- "Require review from Code Owners" in that same branch-protection rule, so the `.github/CODEOWNERS`
  entry mapping `.github/workflows/**` to the repo owner actually takes effect (tracked in issue #62's
  checklist until confirmed done).

