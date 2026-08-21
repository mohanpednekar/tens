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
- **Cursor** (`CURSOR_API_KEY`, Cursor Pro quota): soft guidance is roughly **~1% of Cursor Pro
  quota per session** (especially housekeeping/planning), not a hard limit — size one small coherent
  unit of work, file non-trivial findings instead of half-implementing, and still reserve overhead
  for test/commit/push/PR. Development slots may run larger Phase A tasks when needed, but should
  still prefer staying near that soft target when a smaller slice is viable.

Both engines are naturally self-limited further by the PR-dedup guard (below), which caps
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
plus manual `workflow_dispatch`) via `anthropics/claude-code-action@v1`. The twice-daily cadence
is deliberately offset from `cursor-autonomous-maintenance.yml`'s IST slots so the two engines
never wake at the same instant. Each run does exactly one unit of work, chosen in three phases —
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
dynamic values (open PR/task/gap-issue lists, CI status, failing PRs, Dependabot alerts/PRs) using
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
`blocked` covers two distinct situations, not just one: an environment/permission restriction of the
unattended session itself (the original use case), and — per Phase A's comment-history check below —
a task issue where a second consecutive run independently reached the same "infeasible as written"
conclusion with nothing new in between (no maintainer reply, no issue edit, no relevant code change).
The latter exists because without it, a stale-spec issue that keeps winning FIFO order re-derives the
identical dead-end analysis every single run indefinitely — issue #101 did this 6 runs in a row before
being closed manually — instead of self-locking after the second occurrence the way an
environment/permission blocker already did from the first.

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
- **Cursor** (`cursor-autonomous-maintenance.yml`, including housekeeping/planning): soft guidance
  of roughly **~1% of Cursor Pro quota per session** (not a hard limit). Prefer one small coherent
  unit; file non-trivial findings instead of half-implementing; still reserve overhead for
  test/commit/push/PR. Development slots may take a larger Phase A slice when needed, but should
  prefer staying near that soft target when a smaller slice is viable.

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

Two independent paths, either of which calls `gh pr merge --auto --merge` to enable GitHub's native
auto-merge (merge commit — must match the Main ruleset's `allowed_merge_methods`, which is
`merge` + `rebase` only; `--squash` is rejected and makes every PR look unmergeable to anything
that defaults to squash, including Cursor's merge UI — see issue #343):

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
  Pull requests: read/write, Issues: read/write, Workflows: write), alongside
  `CLAUDE_CODE_OAUTH_TOKEN`.
- "Allow auto-merge" enabled in repo Settings → General, and branch protection on `main` requiring
  the `test` check from `ci.yml`.
- "Require review from Code Owners" in that same branch-protection rule, so the `.github/CODEOWNERS`
  entry mapping `.github/workflows/**` to the repo owner actually takes effect (tracked in issue #62's
  checklist until confirmed done).

### Cursor-powered successor engine

The three workflows above run the **Claude** engine (`anthropics/claude-code-action` + a
`CLAUDE_CODE_OAUTH_TOKEN`). The plan is for the **Cursor CLI** (`cursor-agent -p`) to eventually
replace that engine — but not immediately. Two additional workflows implement the Cursor side and are
designed to coexist safely with the Claude ones during the transition:

- **`cursor-autonomous-maintenance.yml`** — the Cursor twin of `autonomous-maintenance.yml`. Same
  Phase 0/A/B orchestration, same `claude-task` backlog, same hard constraints — its guard step and
  prompt are deliberately thin, pointing the agent at `CLAUDE.md` and this file as the authoritative
  spec (with a single `claude/` → `cursor/` branch-prefix substitution) rather than restating the whole
  phase machine, so it can't drift out of sync with the Claude copy. Schedule is five IST wall-clock
  slots (GitHub Actions cron is UTC; IST = UTC+5:30), plus `workflow_dispatch` with a `mode` input:
  - **Development** (Phase 0/A/B, same as Claude): 6:30am / 11:30am / 4:30pm / 9:30pm IST
    (`0 1,6,11,16 * * *` UTC).
  - **Housekeeping / planning** (1:30am IST, `0 20 * * *` UTC): meta + pipeline health —
    security first (fix immediately when safe/small), workflow/CI failures, conflicted PRs
    (auto-merge-enabled first), CLAUDE.md/docs vs code consistency (fix trivial drift, file
    non-trivial), backlog plan/replan, and optional process improvement (self-edit of this
    workflow, or filing one gap-analysis issue). Does **not** implement Phase A feature tasks.
    Does **not** skip for the 5-PR ceiling (unblocking is the point of the overnight slot). Soft
    budget guidance: aim for roughly **~1% of Cursor Pro quota** per housekeeping session (not a
    hard limit — see Budget discipline). The two crons must stay separate so
    `github.event.schedule` can select the mode; folding them into one cron would silently drop
    the split. Checklist (one unit of work, priority order):
    1. **Security (immediate)** — critical/high Dependabot alerts (and any other confirmed
       vulnerability): fix when a safe small bump fits the soft budget; else file `priority:high`
       `claude-task` (and a heal PR if a minimal fix is still landable). Prefer an in-flight
       Dependabot PR / `@dependabot rebase` over duplicating work. Never dismiss alerts via the API.
    2. **Workflow / CI failures** — red `ci.yml` on `main`, or failing checks on open non-fork PRs:
       trivial → fix (`cursor/heal-main-*` for broken main); non-trivial → file `claude-task` with
       run URL / notes. Never fake green.
    3. **Conflicted PRs** — auto-merge-enabled first; real conflict resolution; never force-push /
       push to main / merge or approve own PR.
    4. **Spec vs implementation** — CLAUDE.md / overlapping AGENTS.md / `docs/*_REFERENCE.md` vs
       live source (signatures, constants, state shape, test counts, nav/mechanic summaries).
       Trivial drift → fix; larger mismatch → file, don't guess.
    5. **Backlog plan/replan** — stale specs, Blocked-by, size/priority labels, duplicates
       (comments / labels / replacement issues only).
    6. **Process improvement (optional)** — self-edit of `cursor-autonomous-maintenance.yml` only,
       or one gap-analysis + `claude-task` issue.

    Triage: **trivial** = confident fix within the ~1% soft quota; **non-trivial** = file and stop;
    **security** = always immediate (fix or high-priority file in the same run).
- **`cursor-pr-followup.yml`** — the Cursor twin of `autonomous-pr-followup.yml`, with identical event
  handling and security posture (pwn-request actor gating, fork refusal, SHA-pinned checkout), scoped to
  `cursor/auto-*` branches only. The Claude follow-up stays scoped to `claude/auto-*`, so the two never
  act on the same PR.

**Engine differences.** The Cursor CLI has no `--allowedTools` flag; tool permissions come from a
`~/.cursor/cli-config.json` written at the start of each run, whose `deny` list (deny beats `--force`)
protects every workflow file the run must not touch — the maintenance twin may edit only *itself* during
the Phase B self-improvement task; the follow-up twin denies all of `.github/workflows/**`. The agent
runs `cursor-agent -p "<prompt>" --force --output-format text`; `--force` runs non-interactively while
the deny list still blocks the protected paths. Model selection is via the optional `CURSOR_MODEL`
repo/org **variable** (not a secret) — unset means the account default.

**Coexistence (current state).** While both engines are live, the Cursor maintenance guard step counts
both `claude/auto-*` and `cursor/auto-*` open PRs toward the shared 5-PR ceiling and treats a task
covered by either prefix as in flight, so the two engines never double-pick the same `claude-task`.
`pr-auto-merge.yml`'s approval-free low-risk path recognizes `cursor/auto-*` and `cursor/heal-main-*`
alongside the `claude/*` prefixes; its human-approval path was already repo-wide. The Cursor
maintenance twin does **not** duplicate the deterministic "Surface a broken deploy.yml run" step — the
Claude workflow already owns that, and duplicating it would double-post.

**Inert until opted into.** Every agent step in both Cursor workflows is gated on the `CURSOR_API_KEY`
repo secret being present (surfaced into an `if:`-usable boolean via a `secrets.CURSOR_API_KEY != ''`
env expression, since `if:` can't read secrets directly). With no secret set, each run resolves to a
clean skip: merging these workflows spends nothing and changes no behavior until a maintainer opts in.

**One additional one-time prerequisite** (beyond the three above):
- The `CURSOR_API_KEY` repo secret — a Cursor API key (ideally from a **service account**, so the
  automation isn't tied to a personal login), generated from the Cursor dashboard and added via
  `gh secret set CURSOR_API_KEY --repo <owner>/<repo>` or repo Settings → Secrets and variables →
  Actions. Optionally also set a `CURSOR_MODEL` **variable** to pin a model.

**Staged cutover (Cursor replaces Claude).** The intended path, in order:
1. **Coexist (now):** merge the Cursor workflows. They stay inert until `CURSOR_API_KEY` is added; the
   Claude engine remains the active default.
2. **Enable + verify:** add `CURSOR_API_KEY`. Both engines now run; the coordination above keeps them
   from colliding. Watch a few Cursor `workflow_dispatch` runs and their PRs to confirm parity.
3. **Retire Claude:** once satisfied, disable the Claude engine — comment out (or remove) the
   `schedule:` in `autonomous-maintenance.yml` and, when fully confident, delete
   `autonomous-maintenance.yml` + `autonomous-pr-followup.yml`. Editing/removing those files still
   needs owner review via `.github/CODEOWNERS` (once branch protection requires it — see #62); the
   automation PAT itself has `Workflows: write` and can push workflow-touching commits. After Claude
   is gone, the coexistence coordination in the Cursor guard step becomes a harmless no-op (no
   `claude/auto-*` PRs will exist), so it can be simplified out later if desired but doesn't have to
   be.

