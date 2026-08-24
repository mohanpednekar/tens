# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
It documents **current behavior only** — signatures, constants, state shape, conventions. For the
*why* behind a design (superseded formulas, incident write-ups, empirical simulation results, UI
decision trade-offs), see `docs/DESIGN_HISTORY.md`. Check that file before changing a formula,
workflow, or mechanic a past iteration may already have tried and rejected for a specific reason.

## Project

**Tens** — a React incremental game. Every mechanic (costs, production, prestige) is themed around powers
of ten. No routing library, no backend — state lives in React and is persisted to `localStorage`. The
app switches between top-level screens via a plain `useState` toggle in `App.jsx` plus a shared bottom
`AppNav` (Foundry → Boosters → Compute → Factory → Guide → More) — not a router (see "Architecture" below):
`ByteFoundryPage` (tap-to-earn bootstrap; mandatory gate until the first Kilobyte transfer each cycle,
then voluntarily revisitable), `MainPage` (tier ladder + PP Upgrades), `InfoPage` (Guide),
`ComputePage`/`ComputeFlopsPage` (Boosters once Foundry Compute unlocks; PP Flops Compute at 100 PP),
`StoragePage` is not an AppNav destination — disk arrays live under Foundry as continuous Memory +
Storage sections on the same screen (no second-level tabs).
Guide and More (Milestones / Settings) are always available, including during the mandatory Byte
Foundry gate; only Factory stays progress-gated.

## Tech stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 19 | JSX transform enabled |
| Vite | 8 | OXC-based; JSX files **must** use the `.jsx` extension |
| Vitest | 4 | jsdom environment, globals enabled |
| Playwright | 1 | Real-browser end-to-end suite (`yarn test:e2e`), chromium only — see "Testing" below |
| styled-components | 6 | All component styling |
| @fontsource/inter, @fontsource/space-grotesk | 5 | Locally-bundled font faces (see `theme/fonts.js`, "Theming" below) — no runtime CDN fetch |
| Yarn | 1 (Classic) | `packageManager: yarn@1.22.22` via Corepack; lockfile is v1 format |

Use Yarn for all dependency work, not npm. `package-lock.json` is gitignored so an accidental
`npm install` cannot reintroduce a second lockfile alongside `yarn.lock`.

## Commands

```sh
yarn install --frozen-lockfile   # CI does this; use plain `yarn install` locally after lockfile changes
yarn dev          # dev server → http://127.0.0.1:<port>/tens/
yarn build        # production build → dist/
yarn test         # run all tests once (Vitest)
yarn test:watch   # watch mode, host 127.0.0.1
yarn test:e2e     # run the Playwright end-to-end suite (real chromium, against yarn dev) — see "Testing"
yarn audit        # yarn audit (Yarn Classic v1's built-in audit — no --all/--recursive flags; it
                  # already covers dependencies/devDependencies/optionalDependencies by default)
yarn gen-pwa-icons # regenerate public/pwa-*.png + apple-touch-icon.png from scripts/generate-pwa-icons.mjs
```

Run a single test file or test name with Vitest's own filtering:

```sh
yarn test src/game/engine.js.test.js       # single file (vitest run <path>)
yarn test -t "buyTier"                     # filter by test name
```

## Interactive session startup

`.claude/settings.json` registers a `SessionStart` hook (`.claude/hooks/session-start.sh`) that runs
`yarn install --frozen-lockfile` then `yarn test` synchronously before an interactive session starts
working, printing a `✅`/`‼️` pass/fail summary for each step — so work begins from a confirmed baseline
instead of discovering broken state mid-task. It always exits 0 regardless of outcome (the point is
visibility, not blocking session start) and is idempotent/non-interactive. This is interactive-session-only
setup — the autonomous workflow (`autonomous-maintenance.yml`) already does equivalent setup via its own
`Enable Corepack`/`Set up Node` steps before invoking Claude, so there's no duplication to reconcile.
`.claude/settings.json`/`.claude/hooks/` are otherwise a protected path for unattended runs — the
`claude-code-action` harness `autonomous-maintenance.yml` runs under refuses any `Write`/`Edit` under
`.claude/` as a sensitive path, independent of that workflow's own `settings.permissions.deny` list (see
`docs/DESIGN_HISTORY.md`) — so this hook could only be added from an interactive session, not that
workflow.

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

PRs are opened as drafts by default, but a draft should only stay a draft while there's real,
known work still pending on it — a queued follow-up commit, a fix still being written, tests that
haven't been run yet. The moment a PR reflects genuinely finished work (its own local checks pass
and nothing further is planned), mark it ready for review — don't leave it sitting in draft once
there's nothing left to do. A draft doesn't get reviewed and isn't eligible for auto-merge, so an
indefinitely-draft PR after the work is actually done just stalls it for no reason. This applies to
every PR in this repo, autonomous or interactive.

**After the final commit** on a finished PR (nothing further planned; local checks green), always
run the adversarial `code-reviewer` subagent (`.claude/agents/code-reviewer.md`) against that head
SHA before considering the session done. Post its machine-readable marker as a PR issue comment:

```
<!-- adversarial-review sha=<headOid> verdict=APPROVE|NEEDS_CHANGES|BLOCK -->
```

Then:

- **`APPROVE` + meets the low-risk bar** (`scripts/pr-low-risk-eligible.sh` / `docs/AUTOMATION.md`):
  **always** enable GitHub auto-merge — run
  `scripts/enable-auto-merge-if-eligible.sh <pr> --require-adversarial-approve` (marks ready if
  still draft, then `gh pr merge --auto --merge`). This is a standing authorization to *enable*
  auto-merge on qualifying PRs only; it is not permission to force-merge, push to `main`, approve
  the PR as a GitHub review, or bypass CODEOWNERS on `.github/workflows/**`.
- **`APPROVE` but not low-risk**: mark ready for human review; do not enable auto-merge.
- **`NEEDS CHANGES` / `BLOCK`**: fix (or stop); do not enable auto-merge; re-run the reviewer after
  the next final commit so the marker matches the new HEAD.

`pr-auto-merge.yml` Path 3 also reacts to that APPROVE marker on its own (belt-and-suspenders with
the script). Path 2 (green checks, no review marker) still auto-merges low-risk bot/Dependabot PRs
as before — it does not mark drafts ready.

Once anything is pushed to an open PR, stay on it: check CI status and review comments (human and
bot — Copilot, Codex, etc.), and address every actionable item — fix it directly if small and
confident, or ask first if ambiguous or architecturally significant. After pushing a fix, check
again, since new pushes can draw new comments. Keep repeating check → address → push until reaching
status quo (a pass with no new actionable comments and CI green, or only pre-existing/out-of-scope
failures left). Don't stop after a single round just because the latest round of comments was
addressed — the loop isn't done until nothing new shows up.

Keep PRs green through genuine fixes only — never `--no-verify`, never disable or delete a failing
test to make it pass, never weaken a check just to get past it. If a check itself is wrong, flaky, or
needs updating, fix the workflow/check definition instead of routing around it.

Once auto-merge is enabled on a PR (by anyone — human approval or `pr-auto-merge.yml`'s own
low-risk path, see "Automation workflows" below), it silently sits inert if the PR falls out of
sync with its base branch — GitHub won't merge a conflicted PR no matter how green its checks are,
and won't say so loudly. Treat that mergeable state as something to actively check, not just wait
on: whenever there's reason to look at a PR with auto-merge on (a "merge conflict" state notice, a
push to the base branch, or just a routine check-in), fetch its current `mergeable_state` and, if
it's conflicted, resolve it immediately rather than leaving it stalled — merge (or rebase, matching
this repo's convention) the base branch into the PR branch, resolve the conflicts for real (never
blindly take one side wholesale on a file with actual logic in it), rerun `yarn test` locally, and
push. Prefer a merge over a rebase when the PR already has review comments/approvals tied to
specific commits, since rebasing rewrites SHAs and can orphan that context. This applies whether the
conflict is trivial (two unrelated doc/changelog bullets, `graphify-out/`'s generated files — safe
to take the incoming side and regenerate) or substantive (overlapping logic in the same function) —
the latter still needs a real read of both sides, not just `git checkout --theirs`.

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
honest statement of anything it didn't cover. It is read-only. Use it (spawn via the Agent tool)
before merging any non-trivial change, or whenever asked to review a branch/PR; when a diff touches
economy surfaces it folds the `economy-change-review` skill's cross-check in as one of its required
steps rather than replacing it.

When filing a new `claude-task` issue for the backlog below, or splitting a large feature into a
sequence of them, use the `file-task-issue` skill (`.claude/skills/file-task-issue/SKILL.md`): the
full issue-template section-by-section guidance, size/priority labeling, the conflict-avoidance
`Blocked by #N` sequencing heuristic, the `blocked` label's two distinct meanings, epic/sub-issue
grouping, the narrow cases where an issue needs no PR, and the "specs go stale" lesson learned from
issues like #45/#138 whose bodies described UI that had since been rebuilt out from under them. Also
useful when reviewing/tightening an existing issue's spec before it's picked back up.

## Issue tracking for interactive sessions

### Cursor Cloud GitHub access

Interactive **Cursor Cloud Agent** VMs authenticate `gh` via a GitHub App integration that
returns **403** on issue comments, labels, and closes. Unattended workflows use
`GH_AUTOMATION_PAT` and are unaffected.

**Fix:** add a fine-grained PAT (Issues read/write; same scopes as `GH_AUTOMATION_PAT` when
the agent also pushes) to **Cursor Dashboard → Cloud Agents → Secrets** as **`GH_TOKEN`**.
`gh` picks it up automatically. Without it, issue hygiene must run via GHA (see
`scripts/backlog-issue-hygiene.sh` on housekeeping runs in
`cursor-autonomous-maintenance.yml`) or a maintainer's local session.

**Maintainer checklist (#62).** Issue #62 ("Maintainer Action Items") is pinned at the top of the
Issues tab via GitHub's native pinned-issues feature and deliberately carries **no labels** — it is
not a `claude-task` work item for the automation to implement, only a standing manual setup checklist
that #63 keeps auto-verified. Do not add `claude-task` to it or unpin it without understanding why.

Every session that does non-trivial work — interactive sessions, not only `autonomous-maintenance.yml`
runs — files a GitHub issue to track that work and keeps it updated as the session progresses, giving
interactive work the same at-a-glance visibility the automation's `claude-task` backlog already has.
File it as soon as the scope is clear (before or alongside the first commit); the `file-task-issue`
skill's (`.claude/skills/file-task-issue/SKILL.md`) template conventions (Goal/Context/Spec sections)
make a good tracking-issue body even when the issue isn't a backlog item. **Don't** apply the
`claude-task` label to it — that label is reserved for items meant for `autonomous-maintenance.yml`'s
Phase A backlog, and labeling a live interactive tracking issue that way would make the automation try
to pick it up as unclaimed work. For that reason, don't file it from the `claude-task.yml` issue
template either — its frontmatter auto-applies the `claude-task` label — file a blank issue and borrow
the template's section structure by hand instead. Comment on the issue at meaningful status changes
(PR opened, a review round landed, work blocked/descoped) and close it once the PR merges or the task
otherwise concludes.

For work that naturally splits into multiple pieces, file a parent "epic" issue and attach each piece
as a GitHub sub-issue of it — the same convention as the `file-task-issue` skill's "Epics and
sub-issues" section (see #87–#92, #132) — so the whole effort collapses to one row and its status is
legible without opening every sub-issue. A trivial, one-off change (a typo fix, answering a question
with no code change, a tiny doc-only tweak) doesn't need a tracking issue — use judgment; the point is
visibility into real work, not process overhead on everything.

For work large enough to benefit from it — roughly the existing `size:M`/`size:L` threshold from the
`file-task-issue` skill; a `size:S`-shaped change just stays one tracking issue — split the epic's
sub-issues along **coding / testing / documentation** phase lines rather than only by feature-slice,
so the coding sub-issue can land and merge without waiting on the other two, while the deferred ones
stay tracked with the epic's context instead of getting silently dropped:

- **Coding** — the core implementation. This sub-issue's PR is not exempt from the repo's existing
  hard requirements: `yarn test` must stay green, the change's core logic needs tests, a behavior
  change gets its `CHANGELOG.md` entry, and — if it touches anything `CLAUDE.md` documents
  (signatures, constants, state shape, conventions) — `CLAUDE.md` is updated in the *same commit*,
  per "Documentation" below. That same-commit rule is a hard invariant and does not relax under this
  split; only work that was never required to land with the code gets deferred.
- **Testing** — coverage beyond what the coding sub-issue already needed for green CI: additional
  scenarios, edge cases, regression tests, e2e specs. Tracked separately and can lag behind the
  coding sub-issue's merge.
- **Documentation** — narrative/rationale writing that isn't required to keep `CLAUDE.md` itself
  accurate: `docs/DESIGN_HISTORY.md` write-ups, README updates, deep-dive `docs/*_REFERENCE.md`
  sections. Also trackable separately and deferrable.

Link each phase sub-issue back to the parent epic (and to each other where relevant) so a later
session picking up "testing" or "documentation" has the coding sub-issue's context — what shipped,
what was deliberately deferred and why — without re-deriving it from the diff alone.

### GitHub Milestones (release grouping)

GitHub Milestones group player-facing work toward a named release target; they complement (do not
replace) the Project's `Track` field from #53. A `Track` answers "what's related to what" across
possibly multiple releases; a Milestone answers "what's targeted for this release" and gives a
native due-date plus automatic X/Y-closed progress. Interactive sessions and Planning (#53) should
assign player-facing feature/economy issues to a milestone for the next planned release; process
and infrastructure `claude-task` issues typically stay off a versioned milestone. The current
next-release milestone is `v0.6.0` (UI-revamp chain #138/#139/#140); Era ascension
(`#407` / `#411–#414`) targets `v0.7.0`. `scripts/sync-release-milestones.sh`
keeps both milestones and assignments idempotent on housekeeping runs.

## Automation workflows

Three workflows under `.github/workflows/` run Claude Code and GitHub automation unattended, opening,
fixing up, and merging PRs with no human in the loop — except a narrow, conservative class of low-risk
bot-authored PRs that merge on green checks alone. All three authenticate via the `GH_AUTOMATION_PAT`
repo secret rather than the default `GITHUB_TOKEN` (whose commits/pushes/merges can't trigger other
workflows). That PAT is deliberately narrowly-scoped and includes `Workflows: write`, so autonomous
runs can push commits that touch `.github/workflows/**` when a task authorizes it (e.g. Phase B
self-improvement on `autonomous-maintenance.yml`, or a new workflow file from a Phase A issue).
Owner review via `.github/CODEOWNERS` still applies once branch protection requires it (see issue
#62 and `docs/AUTOMATION.md`'s "Auto-merge" prerequisites).

**Orchestration model.** The maintainer orchestrates; the scheduled workflow develops. `claude-task`-
labeled GitHub issues (via `.github/ISSUE_TEMPLATE/claude-task.yml`) are the work backlog for
`autonomous-maintenance.yml`, which runs twice daily (9:00am and 9:00pm IST) and does exactly one unit of work per run,
picked in three phases — Phase 0 (CI/CD failures, plus any unaddressed critical/high-severity
Dependabot security alert, severity-sorted the same way Phase A sorts priority labels) always
outranks Phase A (task backlog, ordered `priority:high` → normal/FIFO → `priority:low`), which
always outranks Phase B (a maintenance menu: test coverage, dependency/security — including any
medium/low-severity Dependabot alerts Phase 0 didn't need to handle — code quality, doc sync,
workflow self-improvement, gap analysis).
`autonomous-pr-followup.yml` closes the loop on review comments/CI failures on `claude/auto-*` PRs.
`pr-auto-merge.yml` enables GitHub's native auto-merge either on human approval (any PR) or on green
checks alone for our own automation's branches (`claude/*` and `cursor/*`) when the diff meets a
conservative low-risk bar.

**Cursor-powered successor engine (coexists now, replaces Claude later).** Two additional workflows —
`cursor-autonomous-maintenance.yml` and `cursor-pr-followup.yml` — mirror the two Claude-driven ones
above but run the **Cursor CLI** (`cursor-agent -p`) instead of `anthropics/claude-code-action`. The
plan is for Cursor to eventually replace the Claude engine, but not immediately: for now both coexist,
and the Claude workflows remain the active default. The Cursor twins share the same `claude-task`
backlog, the same `CLAUDE.md`/`docs/AUTOMATION.md` spec, and the same `GH_AUTOMATION_PAT`, but open
their work on `cursor/*` branches (never `claude/*`) and authenticate the agent with a `CURSOR_API_KEY`
repo secret. Every agent step is gated on that secret existing, so the files are **inert until a
maintainer adds `CURSOR_API_KEY`** — merging them spends nothing and changes no behavior until then.
While both engines are live, the maintenance twin's guard step counts both `claude/auto-*` and
`cursor/auto-*` PRs toward the shared 5-PR ceiling and treats a task covered by either as in flight, so
the two never double-pick; its schedule is five IST wall-clock slots (four development + one
dedicated 1:30am IST housekeeping/planning run for security / CI failures / conflicted PRs /
spec-vs-implementation checks / backlog planning / process improvement, plus the same
housekeeping sweep on every push to `main`), offset from the Claude
twice-daily cron. See `docs/AUTOMATION.md`'s
"Cursor-powered successor engine" section for the full design, the `CURSOR_API_KEY`/`CURSOR_MODEL`
setup, and the staged cutover (coexist → add the secret and verify a few Cursor runs → retire the
Claude workflows).

**Budget discipline applies to every session, not just automation.**

- **Claude Code:** self-estimate how much of the rolling 5-hour Claude usage window is likely still
  available and aim to keep that session's work at or under roughly **50%** of a full window,
  recalculated fresh each time. Soft target, not a hard limit (a modest overshoot from estimation
  inaccuracy or unknown concurrent usage is expected, not a failure).
- **Cursor (Pro quota):** soft guidance is roughly **~1% of Cursor Pro quota per session** for
  every Cursor session (interactive, development automation, and housekeeping alike — not
  planning-only). Prefer one small coherent unit; file non-trivial findings instead of
  half-implementing. Not a hard limit.

If a task looks too large even after buffering, land the largest coherent, test-covered slice first
(`Part of #N` instead of `Closes #N`, plus a comment on what remains) rather than risking a runaway
session — see `docs/AUTOMATION.md`'s "Budget discipline" / Cost implications for the
overhead-reservation detail (~15-20% held back for test/commit/push/PR-open).

For the full phase-by-phase logic (guard-step details, the `blocked`-label mechanics, the 5-PR
ceiling, auto-merge's exact low-risk bar, the one-time manual prerequisites), see
`docs/AUTOMATION.md` — read it before touching any `.github/workflows/*.yml` file or reasoning in
detail about the unattended pipeline's behavior.

## Documentation

Always update this file (`CLAUDE.md`) in the same change/commit as any code change it describes —
don't leave it as a follow-up. If a change touches function signatures, constants, state shape,
economy/game-rule behavior, file layout, or test counts documented below, update the corresponding
section here before considering the change done. A code change and a stale doc describing the old
behavior should never ship together. If a change is significant enough to need a rationale trail
(a superseded formula, a rejected alternative, an incident write-up), add it to
`docs/DESIGN_HISTORY.md` in the same commit rather than folding narrative into this file.

**`AGENTS.md`** (repo root) is a condensed mirror of this file for non-Claude AI tools (Codex,
Cursor, etc. — Claude Code itself only reads `CLAUDE.md`). It explicitly declares itself non-
authoritative and says to fix drift in the same change rather than let the two diverge — whenever a
change to this file touches something `AGENTS.md` also states (page count/names, field names,
mechanic summaries, architecture description), update `AGENTS.md`'s condensed version too, in the
same commit. It had drifted significantly (stale page count, a renamed field, a long-superseded Byte
Foundry mechanic) before being resynced; don't let that recur.

### Changelog convention

`CHANGELOG.md` (repo root, [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format) tracks
user-facing and behaviorally-relevant changes going forward from `v0.5.0`. Every PR that changes
such behavior adds an entry to the `## [Unreleased]` section at the top, under the matching
subheading — `### Added` for new features, `### Changed` for behavior changes, `### Fixed` for bug
fixes (`### Removed`/`### Security`/`### Deprecated` as needed). Purely internal changes (docs-only,
CI/workflow tweaks with no user-visible effect) don't need an entry. `package.json`'s `"version"`
field (currently `0.5.0`) and future git tags (`v0.1.0`–`v0.5.0` retroactively, then onward) mirror
this file's version sections — see `docs/DESIGN_HISTORY.md` for why versioning/tagging started here
rather than at project inception. Bumping the version and pushing/tagging a release is handled by
separate follow-up tooling, not by every individual PR.

## Repo layout

```
.claude/
  CLAUDE.md                   ← nested memory file (Claude Code auto-loads it alongside the root one)
                               pointing at the graphify skill below — tool-generated, see "graphify" below
  settings.json              ← registers the SessionStart hook below (see "Interactive session
                               startup" above) and the graphify PreToolUse hooks (see "graphify" below)
                               — neither is read by the autonomous workflow, which invokes
                               claude-code-action with its own inline `settings:`/`claude_args:`
  hooks/
    session-start.sh          ← runs yarn install --frozen-lockfile + yarn test at interactive
                               session start, printing a pass/fail summary; always exits 0
  agents/
    code-reviewer.md          ← comprehensive read-only PR/diff review subagent (see "Pull requests" above)
  skills/
    economy-change-review/    ← cross-checks a TIER_DEFINITIONS/economy diff against its issue's spec
    file-task-issue/          ← authors a well-formed claude-task backlog issue (see "Pull requests"
                               above), also reused for interactive-session tracking issues (see "Issue
                               tracking for interactive sessions" above)
    simulate-run-times/       ← simulates playthroughs to show how starting PP affects time-to-prestige
                               (see "Economy model" below)
    graphify/                 ← third-party skill (see "graphify" below), tool-generated — not hand-edited
docs/
  DESIGN_HISTORY.md            ← the "why" behind superseded formulas, incident write-ups, rejected
                               alternatives — check before changing a formula/workflow/mechanic a
                               past iteration may already have tried
  AUTOMATION.md                ← full Automation workflows reference (see above)
  ECONOMY_REFERENCE.md         ← full Economy model reference (see below)
  MAINPAGE_REFERENCE.md        ← full MainPage reference, including ComputePage — see Architecture below
  COMPONENTS_REFERENCE.md      ← full Button/Money/StatCard prop/styling reference (see below)
  THEMING_REFERENCE.md         ← full design-token/font/ThemeProvider reference (see Theming below)
  PWA_REFERENCE.md             ← full installable-PWA reference (see PWA support below)
src/
  game/
    layers.js             ← TIER_DEFINITIONS array + all game constants (single source of truth)
    engine.js              ← pure state functions (no React, no side effects)
    navAttention.js         ← pure predicates for AppNav attention dots (high/normal levels;
                               Storage cues fold into Foundry)
    useIncrementalGame.js  ← React hook; wires the engine to useState + localStorage + the tick timer
    storage.js              ← localStorage read/write; offloads every load to save-migration/, then
                               forward field merge (`mergeState`); multi-slot saves + Supporter
                               entitlement (unlock code / dummy checkout), clearSaveSlot /
                               clearAllSaveProgress (never revokes unlock), plus the separately keyed
                               last-save timestamp used to compute offline progress (slot 0 keeps
                               legacy `tens_game_state` keys).
    save-migration/         ← save-schema assistant only — `adaptSaveForCurrentSchema(raw)` returns
                               current-compatible game state (or failure); runs on every load; see
                               DESIGN_HISTORY.md "Save persistence".
  components/
    AppNav/index.jsx        ← fixed bottom bar: Foundry → Boosters → Compute → Factory → Guide → More
                               (progression order); Factory omits during the Foundry gate
                               (Guide/More stay); green attention dots via game/navAttention.js
    AppMenu/index.jsx       ← More sheet — Milestones / Settings (always reachable; Reset / Reset
                               Byte Foundry are Settings → Danger zone only)
    Button/index.jsx        ← styled button (`.jsx` — needs JSX for `ButtonContent`); semantic
                               `variant` prop resolved against theme color tokens, deprecated raw
                               `color` prop still supported. Full contract: `docs/COMPONENTS_REFERENCE.md`
    DiskArrayRow/index.jsx  ← one Disk array's full interactive detail (cache blocks, disk squares,
                               releasing, redeeming) for a single size, taking `{ actions, size,
                               state }`; extracted so both ByteFoundryPage (the single currently-
                               active/buildable size only) and StoragePage (every size ever reached)
                               render identical, fully interactive detail rather than StoragePage
                               alone owning it and ByteFoundryPage settling for a text summary.
                               Full contract: `docs/COMPONENTS_REFERENCE.md`
    Money/index.js          ← styled money/amount display, `theme.color.text` + tabular-nums.
                               Full contract: `docs/COMPONENTS_REFERENCE.md`
    ConfirmDialog/index.jsx ← in-game confirm overlay (StatCard + Cancel/Confirm); replaces
                               native `window.confirm` for Sacrifice on ByteFoundryPage. Full
                               contract: `docs/COMPONENTS_REFERENCE.md`
    OfflineProgressNotice/index.jsx ← the "Welcome back!" offline-progress notice (`.jsx` — needs
                               JSX), extracted so both MainPage and ByteFoundryPage can render it —
                               offline progress already applies to the Byte Foundry mechanically
                               regardless of page, this just makes the notice itself page-agnostic
                               too. Full contract: `docs/COMPONENTS_REFERENCE.md`
    IncompatibleSaveNotice/index.jsx ← blocking overlay when an on-disk save was cleared on load
                               because it predates the current schema; single **Start fresh**
                               acknowledge action. Rendered by `App.jsx` when
                               `useIncrementalGame`'s `incompatibleSaveReason` is set.
    StatCard/index.js       ← styled card container used for every panel, fully token-driven.
                               Full contract: `docs/COMPONENTS_REFERENCE.md`
  pages/
    ByteFoundryPage/index.jsx ← the "Byte Foundry" tap screen (see "Architecture" 4 and "Economy
                               model" below). Takes `{ game, focusNonce }` — top-level navigation
                               lives in App.jsx's shared AppNav. Receives the full `game` object
                               (`{ state, actions, ... }` from `useIncrementalGame`) as a prop,
                               same as MainPage; Memory + every DiskArrayRow as continuous sections
                               (no second-level tabs). Memory ×10 (Sacrifice) always sits in the
                               milestones row beside Bandwidth
    StoragePage/index.jsx   ← thin reusable every-size DiskArrayRow wrapper (primary UI is Foundry);
                               Build stays on Foundry. Not a top-level AppNav destination
    ComputePage/index.jsx   ← Foundry Boosters screen (merge chain + Boost). Reached via AppNav
                               once `isComputeCoreConversionUnlocked`; page id `'boosters'`. Takes `{ game }`
    ComputeFlopsPage/index.jsx ← PP Compute (Flops) screen — KFlops→QFlops tiers bought with PP,
                               boosting matching Factory tiers. Reached via AppNav once
                               `isComputeFlopsPageRevealed` (100 PP); page id `'compute'`. Takes `{ game }`
    MainPage/index.jsx      ← the tier ladder (see "Architecture" below). Takes `{ game, focusNonce }`
                               — the full `useIncrementalGame()` object, lifted up into App.jsx so
                               ByteFoundryPage and MainPage can share one save/tick loop. Second-
                               level tabs: Data | Upgrades (after first Prestige). Full
                               field-by-field reference: `docs/MAINPAGE_REFERENCE.md`
    InfoPage/index.jsx      ← the Guide page (see "Architecture" below), including Byte
                               Foundry/Storage/Compute sections. Reached via AppNav's Guide item;
                               takes no navigation props (AppNav is the exit)
    MilestonesPage/index.jsx ← Chapters / tier-autobuyer / tickspeed-autobuyer / Compute-autobuyer
                               status. Chapters: first Kilobyte, Go Googol, Open Compute, Go Unbounded,
                               Ascend an Era. Reached via AppNav → More; always reachable (including
                               during the Foundry gate); takes `{ game }`
    SettingsPage/index.jsx  ← Supporter pack, save slots, Prestige museum, Era ascension (confirm +
                               Ascend), Ops dashboard, and Reset (Danger zone only). Reached via
                               AppNav → More; always reachable; takes `{ game, onReset }`
  theme/
    tokens.js               ← design-token single source of truth: per-mode (dark/light) color, shadow &
                               tier-accent sets + mode-independent space/radius/motion/font/type scales;
                               exports buildTheme(mode) + themes.{dark,light}. Full reference:
                               `docs/THEMING_REFERENCE.md`
    fonts.js                 ← locally bundles the `font.display`/`font.body` faces (Space Grotesk /
                               Inter, via @fontsource) as side-effect CSS imports — no runtime CDN
                               fetch. Full reference: `docs/THEMING_REFERENCE.md`
    contrast.js              ← standalone WCAG relative-luminance contrast-ratio utility (see "Testing" below)
    GlobalStyle.js          ← createGlobalStyle: box-sizing reset, base font/smoothing, form `font: inherit`,
                               and the token-driven page background/text (absorbs the removed index.css/App.css)
    index.jsx               ← <ThemeProvider mode> wrapper (styled-components ThemeProvider) + re-exports;
                               imports `./fonts` as a side effect; `mode` defaults to dark and is the
                               seam #140 will drive from system pref + toggle
  App.jsx                   ← root component; owns the single `useIncrementalGame()` call (lifted up
                               from MainPage so ByteFoundryPage can share the same save/tick loop) and
                               wraps <ThemeProvider><GlobalStyle/>, switching between
                               <ByteFoundryPage/>/<MainPage/>/<InfoPage/>/<ComputePage/>/
                               <ComputeFlopsPage/>/<MilestonesPage/>/<SettingsPage/> via a local `page` useState
                               (`'game'`/`'info'`/`'foundry'`/`'boosters'`/`'compute'`/`'milestones'`/`'settings'`,
                               default `'game'`) — not a routing library — plus a shared fixed bottom
                               `AppNav` (Foundry → Boosters → Compute → Factory → Guide → More) and `AppMenu`
                               (More sheet → Milestones / Settings). Legacy `page === 'storage'`
                               navigations rewrite to `'foundry'` (Disks live on Foundry, not a
                               top-level page). Same "local toggle, not real routing" convention
                               MainPage's own Data | Upgrades tabs already use. Which screen actually renders is a derived
                               `showingFoundry = !GATE_EXEMPT_PAGES.has(page) &&
                               (!intro.mainGameUnlocked || page === 'foundry')` check (where
                               `GATE_EXEMPT_PAGES` = `'info'`/`'boosters'`/`'compute'`/`'milestones'`/`'settings'`),
                               not `page` directly: ByteFoundryPage is both a *mandatory gate*
                               (whenever `intro.mainGameUnlocked` is false — no fresh Kilobytes
                               without tapping through it, see "Economy model" below) and, once
                               unlocked, a *permanent, voluntarily-revisitable screen* reachable at
                               any time via AppNav's Foundry item (`page = 'foundry'`) to review the
                               current cycle's stats — it no longer disappears once passed.
                               Gate-exempt pages stay reachable during the gate so Guide / Boosters
                               (once capacity reveals it) / Compute (once 100 PP) / More utilities are never yanked away; the
                               gate picks back up the instant the player navigates to `'game'`
                               (Factory). Since `page` is independent of `intro.mainGameUnlocked`, no
                               syncing effect is needed at all: the gate resolving just reveals
                               whatever `page` already was (typically `'game'`)
  index.jsx                 ← ReactDOM.createRoot entry point; calls reportWebVitals() after render
  reportWebVitals.js         ← optional web-vitals (CLS/INP/FCP/LCP/TTFB) reporter; no-ops unless
                               passed a callback function — currently called with no argument, so it
                               is a no-op in practice today
vite.config.js               ← path aliases + dev/test server config + the VitePWA plugin. Full PWA
                               reference: `docs/PWA_REFERENCE.md`
playwright.config.js         ← Playwright end-to-end suite config (see "End-to-end testing" under
                               "Testing" below) — separate from vite.config.js's own `test` block, which
                               only configures Vitest
e2e/
  golden-path.e2e.js          ← buying Bytes via the real Buy button; Owned/money-balance updates
  autobuyer-reload.e2e.js     ← an already-unlocked tier autobuyer survives a real page reload
  prestige.e2e.js             ← prestiging from the first-time overlay resets resources, awards PP
  meta-prestige.e2e.js        ← Settings Era ascension from 1 Googol PP seed; era/Eons + Foundry gate
scripts/
  generate-pwa-icons.mjs     ← one-off Node script (run via `yarn gen-pwa-icons`) that rasterizes the
                               PWA icon SVGs with `sharp` into public/pwa-*.png + apple-touch-icon.png;
                               not part of the build — only re-run it if the icon design/palette changes
public/
  pwa-192x192.png, pwa-512x512.png, pwa-maskable-512x512.png, apple-touch-icon.png
                               ← generated PWA icon assets (see `docs/PWA_REFERENCE.md`); the old
                               create-react-app-era `index.html`/`manifest.json`/`logo192.png`/
                               `logo512.png` in this directory were unused dead weight (this is a Vite
                               app — Vite's own root `index.html` is what's actually served) and were
                               removed rather than left to confuse the new PWA manifest
  favicon.ico, robots.txt     ← unchanged, still served as-is from this directory
```

## Architecture

Strict three-layer separation:

1. **`engine.js`** — all game logic is pure functions of `(args) => state => newState`, with no React
   and no side effects. Every mutation returns a new state object; invalid actions (can't afford, tier
   locked) return the *same* state reference unchanged, which callers use as a no-op signal (see
   `tickGame`'s autobuyer loop, which breaks as soon as `buyTierQuantity` returns the same object
   back — `buyTier` itself is only invoked one level down, inside `buyTierQuantity`'s own loop).
2. **`useIncrementalGame.js`** — the only place holding React state. Called once, in `App.jsx` (not in
   MainPage — lifted up so `ByteFoundryPage` can share the same save/tick loop). Owns the `setInterval`
   tick timer and the localStorage persistence effect, and exposes `{ state, actions, resetGame,
   resetByteFoundry, offlineProgress, dismissOfflineProgress, incompatibleSaveReason,
   dismissIncompatibleSaveNotice, savesMeta, saveSlots, switchSaveSlot, renameSaveSlot,
   redeemUnlockCode, purchaseSupporterDummy, opsSamples, clearSlot, eraseAllSaveProgress }`. Every purchase — manual Buy and autobuyer ticks alike — always batches up
   to the current level's cost-block boundary (see docs/ECONOMY_REFERENCE.md), via a `BUY_QUANTITY`
   constant (`Number.MAX_SAFE_INTEGER` — a "buy as many as fit" sentinel, not a literal batch size,
   since the actual cap is applied dynamically inside the engine against the current, possibly-grown
   block size; deliberately not `Infinity` — `engine.js`'s `clampNonNegative` treats any non-finite
   value as invalid and clamps it to 0, which silently turned every purchase into a no-op during this
   feature's development) passed into `tickGame` as `autobuyerBatchSize` and into `actions.buyTierQuantity` (this replaced a
   removed player-facing ×1/×10 "Bulk" toggle — no persisted preference to manage). On mount, a
   one-time `computeInitialGame` helper calls `discardIncompatibleActiveSaveIfNeeded()` (clears the
   active slot when its on-disk payload fails `getSaveIncompatibilityReason`), then loads any saved
   state, reads `loadLastSaveTimestamp()`, and —
   if elapsed real time registers at least one simulated second — folds in offline progress via
   `applyOfflineProgress` before the first render, always applied to `state` at whichever speed
   applies (100% at or below `OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS` — 10 minutes — 50% beyond
   it). Only past that same threshold does it also record a `{ elapsedRealSeconds, effectiveSeconds }`
   summary as `offlineProgress` for the "Welcome back!" notice to render — a short absence updates the
   game silently, with `offlineProgress` staying `null`; `dismissOfflineProgress` (and `resetGame`)
   clear it back to `null` too. This mount-time check only ever covers time the app was fully torn down
   (a real page load/PWA cold start) — it runs once, before the tick timer starts, and never again for
   the life of that mount. Since a backgrounded/suspended tab or PWA (the far more common case on
   mobile — the OS routinely throttles or fully pauses a background page's `setInterval` without ever
   tearing the page down) never remounts, `offlineProgress` is **not** a one-shot value: the live tick
   loop itself also tracks the real wall-clock time of its own most recent firing and, on any firing
   (from `setInterval` or from a `visibilitychange` listener that fires the same check immediately on
   resume) whose gap since the previous one exceeds `BACKGROUND_TICK_GAP_THRESHOLD_SECONDS` (2s — far
   past ordinary `setInterval` jitter), replays that gap through the identical `applyOfflineProgress`
   path instead of an ordinary tick, producing a fresh `offlineProgress` object mid-session (subject to
   the same full-speed-threshold notice suppression as the mount-time check). See
   `docs/ECONOMY_REFERENCE.md`'s "Offline progress" section for the full detection/threshold detail.
3. **`MainPage/index.jsx`** — a pure renderer driven entirely by `TIER_DEFINITIONS` and the hook's
   `state` (received as a `game` prop from `App.jsx`, not its own `useIncrementalGame()` call). Renders
   each unlocked tier as a single compact grid row rather than separate cards. Kept purely game — live
   controls, numbers, and status text only; top-level destinations live in `App.jsx`'s shared `AppNav`
   (Factory / Byte Factory is this page), so MainPage itself carries no page-to-page open-* links. See
   docs/MAINPAGE_REFERENCE.md for the full field-by-field layout.
4. **`ByteFoundryPage/index.jsx`** — the tap screen (see "Economy model" below), also a pure renderer
   taking `{ game, focusNonce }` as props. It's the only way any Prestige cycle ever earns its first
   Kilobytes, replacing the old, since-removed self-producing Bytes tier as the game's actual
   bootstrap — a mandatory gate whenever `intro.mainGameUnlocked` is false (AppNav omits Factory during
   the gate; Guide and More stay). Once that cycle's `intro.mainGameUnlocked` flips true (the first
   bits ever converted into Kilobytes this cycle), it stops being a gate and becomes a permanent
   screen the player can voluntarily reopen at any time via AppNav's Foundry item — but it stays just
   as interactive either way, nothing here ever goes read-only. Once `intro.mainGameUnlocked`, the
   standalone Tap button is removed entirely — Memory's own tile becomes the tap target instead (an
   `as="button"` swap on the same styled `FillableStatCard`, calling the identical
   `actions.tapIntroBit`), rather than two separate controls doing the same thing. Compute lives on
   its own dedicated screen (see 4b below) once revealed, reached via AppNav; Storage's every-size
   detail (see 4a) is continuous sections on this same Foundry screen (and the reusable
   `StoragePage` wrapper), not a separate AppNav item or second-level tab. Starting the next Disk's
   build (its own core-loop action, alongside Sacrifice/Invest) and every shown size's full
   interactive detail — cache blocks, disk squares, releasing (Disk Fill's manual-release half →
   Factory Bits only), and redeeming (Disk Fill itself; auto when the matching tier's autobuyer is
   on, else manual) — both stay here, rendered via the shared `components/DiskArrayRow` (see "Repo
   layout" above), ascending smallest→largest with Cache of a row immediately above that row's
   Disks. The Build button always stays visible/usable regardless of eligibility (building ahead of
   every tier's current cost is a deliberate strategy — see "Economy model" below); each
   `DiskArrayRow` renders for every size from `getDiskSizesToShow` (every size ever reached plus
   the ladder's current offer). Each disk array always shows all `DISK_ARRAY_LADDER_CAP` (10) disk
   slots in one unbroken row. Memory ×10 (Sacrifice) always sits in the milestones row beside
   Bandwidth. Every action — here or on either dedicated screen — stays gated by the forced
   priority order (see "Economy model" below).
4a. **`StoragePage/index.jsx`** — thin reusable every-size DiskArrayRow list (ascending, via
   `getDiskSizesToShow`) — NOT the Build button, which stays on ByteFoundryPage itself. Takes
   `{ game }`. Primary UI path is Foundry's continuous sections; this file remains for reuse/tests.
   A pure renderer, same "engine re-validates, UI just mirrors it" posture as every other page here.
4b. **`ComputePage/index.jsx`** — Foundry **Boosters** screen (page id `'boosters'`), taking `{ game }`.
   Reached via AppNav once `isComputeCoreConversionUnlocked`. Same posture as StoragePage above. Also where
   the nine-boundary merge chain (Core → Node → Cluster → Network → Grid → Fabric → Cloud →
   Datacenter → Supercomputer → Megacomputer — see "Economy model" below and issues #280/#316/#321)
   lives, behind its own later, one-time `intro.computeMergePageUnlocked` reveal nested inside this
   same page — not a separate page/nav link. "Compute" names the page/feature only — individual
   entities drop the word (`Core`/`Node`/…, never "Compute Core"/"Compute Node"/…) in every
   player-visible label.
   Deliberately terse: every control is icon-only (no or single-word visible labels), the full
   sentence living in `title`/`aria-label` instead — and the prose explanation of each mechanic
   lives in the Guide (`InfoPage`), not here. Render order top to bottom: an active Compute
   Boost's status (effect, countdown, current stack count) renders at the TOP of the page, right
   after the header, so it stays visible regardless of what else is on screen; right below that is
   the Boost EFFECTS section itself (issue #326 — "the effects section is at the top of the
   Compute page, not at the bottom"): an `ArmedStatusText` line naming the currently armed tier and
   how many tokens it holds, then the 3 small icon preset buttons (Burst/Standard/Sustain, base 1
   minute/10 minutes/1 hour at tier 1/Core; higher tiers scale power ×4 per step with no duration
   enhancement — see "Economy model" below), disabled
   until a tier is armed. While a boost is active, activating any NEW boost is blocked entirely
   (any type/tier) — a Stack + Reclaim row appears right below the presets instead:
   `stackComputeBoost` (`isStackComputeBoostTurnAvailable`'s own gate) extends the ACTIVE boost by
   spending another token of ITS OWN funding tier (never whatever tier a player might have since
   selected), and `reclaimComputeBoost` (`canReclaimComputeBoost`'s own gate) reclaims the most
   recently added, still-unused stack of an active boost, one at a time, refunding 1 token into
   that same funding tier. THEN, below the whole Boost effects section, each of the nine
   merge-boundary tiers (Core through Supercomputer) renders TWO rows (issues #321/#326): row 1 is
   the tier's name/symbol plus its `COMPUTE_ENTITY_CAP` (10) normal-slot squares — ALSO, per issue
   #326, its own clickable `TierSelectButton` (wrapping just the symbol/label/slots, kept separate
   from Cores' own sibling auto-claim button to avoid nesting a `<button>` inside a `<button>`)
   that arms the 3 Boost preset buttons ABOVE it at that tier's own scaled power (duration stays
   at the base preset — issue #363) ("click any tier row" — the effects section renders first
   specifically so it's visible without scrolling once a tier below it is clicked), highlighted
   while selected; row 2 is, before that boundary's auto-merge is unlocked, an instant Merge button
   (disabled below `COMPUTE_MERGE_RATIO` held) plus an Unlock Auto-merge button (disabled below
   `COMPUTE_ENTITY_CAP` of the produced tier held) — or, once unlocked, the `COMPUTE_MERGE_RESERVE_CAP`
   (8) reserve-slot squares themselves, clickable as the manual-start trigger with no separate
   button ("slots are the button"), showing a countdown while a merge is in flight. Megacomputer
   (the bottom of the chain) has no row 2, but its row 1 is still Boost-selectable — the only place
   a Megacomputer has any use at all. Cores are obtained by buying Boosters from the matching Data
   Lake (row 2 for Cores — see "Economy model" below), not minted from Memory — the earlier "Claim
   Core"/auto-claim mechanic was removed once Data Lakes superseded it.
4c. **`ComputeFlopsPage/index.jsx`** — PP **Compute (Flops)** screen (page id `'compute'`), taking
   `{ game }`. Reached via AppNav once `isComputeFlopsPageRevealed` (spendable PP ≥ 100, latched in
   `computeFlops.pageUnlocked`). Ten tiers KFlops→QFlops (`COMPUTE_FLOPS_TIER_DEFINITIONS`), each bought
   with PP on the same 10³ base ladder as Factory tiers (1,000 – 10³⁰ PP). Per-unit price scales on
   every purchase via `getCostEpochExponent` (not Factory's 8-buy blocks). First tier's first buy
   costs 1,000 PP so the screen is visible but unusable until then. Each owned unit adds 0.01%/s
   matching Factory tier's cumulative boost; hero displays weighted total **E = k + 10M + 100G + … +
   10⁹Q**. Owned counts permanent across Prestige; per-cycle boost resets on Prestige. Pure renderer — see `docs/ECONOMY_REFERENCE.md`
   "PP Compute (Flops)".
5. **`InfoPage/index.jsx`** — a separate, static Guide page holding every mechanic's evergreen
   explanation in short bullets/sub-headings (what used to be MainPage's click-to-expand
   `InfoDetails` disclosures — Overview, Byte Foundry, Storage, Boosters, Compute (Flops), Clock Speed, Speed Up,
   Overclock, Tier Autobuyers, Milestones, Prestige, Era ascension). Numbers come from the same
   `engine.js`/`layers.js` constants the game uses, so they can't drift when those change.
   Reads no `useIncrementalGame` state at all — only pure constants/formulas — so nothing here
   can drift out of sync with a live run. Header shows the app version (`v{version}` from
   `package.json` via build-time import) — the **only** in-app version surface. Reached via AppNav's
   Guide item; `App.jsx` toggles between these pages locally; there is still no routing library or
   backend involved.
6. **`MilestonesPage/index.jsx`** — standalone Chapters / tier-autobuyer / tickspeed-autobuyer /
   Compute-autobuyer / Era ascension status screen. Chapters: first Kilobyte, Go Googol, Open Compute,
   Go Unbounded, Ascend an Era. Reached via AppNav → More (`page = 'milestones'`); always reachable,
   including during the Foundry gate. Takes `{ game }`. Pure renderer.
7. **`SettingsPage/index.jsx`** — always-reachable utilities via AppNav → More (`page = 'settings'`):
    Supporter pack (unlock code / dummy checkout), multi-slot saves, Prestige museum, Era ascension
    (Eras/Eons display + confirm-guarded `actions.eraAscend()`), Ops dashboard, and Reset under
    Danger zone only. Takes `{ game, onReset }` (`onReset` is the confirm-guarded callback owned
    by `App.jsx`). Pure renderer aside from local form state.

## Economy model

There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Kilobytes` through `Quettabytes` (a byte-scale/computing theme). Every tier is bought
directly with the base currency (`MONEY_ID = 'base'`, display name "Bits") and, once owned, produces
the tier immediately below it, cascading production down the ladder; `tier01` (Kilobytes) is the special
case where cost is still Bits but production credits the separate Factory Bytes pool (`BYTES_ID = 'bytes'`,
displayed as whole `B`) and mirrors the same amount × `BITS_PER_BYTE` into Bits (`MONEY_ID`) so
MoneyHero / Prestige / tier Buys keep moving — without that mirror, Factory production after #430
left the headline balance frozen. **Clock Speed** (the global tickspeed multiplier on MainPage,
formerly "Tickspeed") is funded from that Bytes pool — initial activation costs **10 Bytes** — not Bits.
Reaching Money ≥ `PRESTIGE_THRESHOLD`
(`GOOGOL * BITS_PER_BYTE` = 8e100 — "1 Googol Bytes," expressed in Bits since a Byte is 8 Bits) freezes
the economy except for Prestige — unless `isUnboundedPrestigeUnlocked(state)` is true (permanent
`prestige.unboundedUnlocked` latch set the first time `prestige.count` reaches
`PRESTIGE_UNBOUNDED_MIN_COUNT` (100), or carried through Era ascension), in which case production
continues and Prestige is optional (see `isProductionFrozen`). **Era ascension** (`eraGame`) is a
separate voluntary meta-prestige at **1 Googol unspent PP** (`ERA_ELIGIBILITY_PP`): it awards
**Eons** (+1 base, +1 per Eon Amplifier level — shop deferred to #414), increments `era.count`,
resets the full Foundry (generator upgrades, Disks, compute ladder entities, Memory/gate) plus the
ordinary Factory cycle (`prestige.points`/`count`/`prestigeDoublePpLevel` → 0,
`computeFlops.owned` → 0, `cumulativeBoost` fresh), while keeping automation unlocks/pause flags
(except Double PP level), tier/tickspeed autobuyer milestone objects, `prestige.unboundedUnlocked`,
museum, hyperscalers, Eon upgrade levels, Flops autobuyer unlock flags, and page latches. Era *N*
free-unlocks the *N*th Flops tier's autobuyer (KFlops at Era 1, …). Hyperscalers (bought with
Eons in #414) add permanent +0.01%/s each to every Factory tier's Flops multiplier via
`getHyperscalerFlopsBoostRate`. Prestige Points are awarded by `getPrestigePointsAwarded`: 1 base PP at 1 Googol
Bytes, then 1 PP per `PRESTIGE_POWERS_PER_PP_BASE` (64) additional money-exponent powers beyond
Googol's own 10^100 exponent, scaled by permanent Double PP upgrades (`prestigeDoublePpLevel` — each
halves powers-per-PP until 1, then doubles PP-per-power; cost `100^(level+1)` PP). `GOOGOL` (1e100)
itself is still exported and used as-is by the exponent-based formulas (`getMoneyExponent`/
`getPrestigeProgressPercent`) — only the live freeze/Prestige trigger moved to the messier
`PRESTIGE_THRESHOLD` value; see `docs/DESIGN_HISTORY.md` for why. MainPage's own headline balance display (`MoneyHero`) switches
from Bits to whole Bytes once the balance reaches 8000 Bits (`formatMoneyBalance` in `engine.js`,
`MONEY_BYTES_DISPLAY_THRESHOLD`) — every other `formatCurrency` call (costs, production numbers, the
Prestige-threshold overlay) keeps reading in Bits, its actual priced/spent denomination.

Bytes are no longer a purchasable tier — they're produced entirely by the **Byte Foundry**
(`ByteFoundryPage`, see "Architecture" above), a separate tap-to-earn screen every fresh save — and
every real Prestige cycle after that — must pass through before the main game (`tier01`/Kilobytes
onward) is reachable. Tapping accumulates bits into "Memory" (a capacity-capped balance) that combines
into a permanent, passively-producing Byte generator, then grows via Sacrifice (10x capacity) and
Invest (double production) on independent cost ladders, plus — once far enough along — Disks
(`StoragePage`) and Compute Cores/Nodes/Compute Boost (`ComputePage`, nav **Boosters**). A separate
**PP Compute (Flops)** screen (`ComputeFlopsPage`, nav **Compute**) unlocks at 100 PP — ten tiers
KFlops→QFlops costing 1,000–10³⁰ PP, each adding 0.01%/s per owned unit to the matching Factory tier;
owned counts persist across Prestige, cumulative boost resets each cycle. Five recurring "upgrade"
actions are ranked in a fixed **forced priority order** — Disk Fill > Bandwidth/Invest > Disk Build >
Compute > Memory/Sacrifice — so a lower-ranked action is disabled (both in the UI and in the engine
reducer itself) whenever a higher one is currently available. Manual transfer blocks (plus an
always-on auto-convert) turn Memory into free `tier01` units at tier01's own current per-unit cost;
the first successful transfer unlocks the main game, and there's no per-cycle cap on further ones.
ByteFoundryPage's own manual transfer-block ROW hides once Storage unlocks and the main game is
already unlocked (`isStorageUnlocked(state) && intro.mainGameUnlocked`) — at that point Disk
redemption offers an alternative path to tier units, making the manual row redundant; the
always-on auto-convert keeps running regardless of whether the row is shown. It stays visible
through the mandatory pre-unlock gate even past Storage's own reveal threshold, since capacity
alone (grown via repeated Sacrifice) can reach that threshold without the main game ever having
been unlocked — `redeemDisk` never flips `mainGameUnlocked`, only a transfer does, so this row is
never hidden while it's still the only way out of the gate.
The generator, Disks, and every compute-ladder entity — Core, Node, Cluster, Network, Grid, Fabric,
Cloud, Datacenter, Supercomputer, Megacomputer (every tier past Node mergeable manually, 8:1 per
tier, once unlocked — "Compute" names the page/feature only, not any individual entity) — are all
permanent across every real Prestige; only Memory itself, the main-game-unlock gate, and tier01's
own purchase-block progress reset each cycle. Nothing here ever fully freezes — every action stays
live indefinitely, every cycle.

**Disks** (`intro.disks`/`disksBuiltTotal`/`diskCache`/`diskWriteCache`/`diskBuild` in `createInitialGameState`,
`getDiskSize`/`getDiskCost`/`startDiskBuild`/`tickDiskBuild`/`tickDiskAutoFill`/`tickDiskWriteCache`/
`isDiskCacheBlockReleasable`/`releaseDiskCacheBlock`/`isDiskRedeemable`/`redeemDisk`/
`tickDiskAutoRedeem`/`getDiskRedeemTierName` in `engine.js`) are a real storage medium, not
tier01-only: a size's ladder (every Byte power of ten — `DISK_LADDER_BASE_SIZE_BITS` ×
`DISK_LADDER_SIZE_MULTIPLIER^(n-1)`: 1 KB → 10 KB → 100 KB → **1 MB** → 10 MB → …, so a "1 KB"
disk needs 8000 bits, not a "kilobit" 1000) advances every `DISK_ARRAY_LADDER_CAP` (10) built at the
current size. Starting
a build (`startDiskBuild`) spends `getDiskCost(size)` (`DISK_BUILD_COST_MULTIPLIER` (10) × size)
immediately and takes real TIME to complete — the array's Nth disk (N = disks already built at that
size, 1-indexed) takes `N × (size ÷ 8000)` seconds (1s per real "KB" of size for the first disk,
scaling with position — a 1 KB array's 6th disk takes 6s, a 10 KB array's 1st disk takes 10s) — during
which every disk already in that size's array is completely offline (no auto-fill, no auto-redeem, no
manual cache-block release, no manual redeem) until `tickDiskBuild` finishes the countdown. Each
array has its own always-full **read cache** (`diskCache[size]`, `DISK_CACHE_BLOCK_COUNT` (8) blocks of
`size / 8` bits each, totaling one disk's worth — e.g. a 1 MB array → 8 × 1 Mb; displayed in the
bit-scale `Kb`/`Mb`/…/`Qb` unit via `formatCacheSize`, lowercase `b` for bits, distinct from a
Disk's own Byte-scale `B`/`KB`/… via `formatDiskSize`, uppercase `B` for Bytes). Steady state is
full; Memory refills whole blocks when a block was just released or the size was just unlocked
(so Memory visibly fills between transfers). Read cache flushes into an empty disk over the time to
fill one cache block at the current Byte Foundry production rate when all 8 blocks are full and no
tier claim blocks that size (pauses while a tier matches). Disks above the smallest built size also fill
via **write cache** (`diskWriteCache[targetSize]` — empty at rest): when 10 full disks exist at size
N and size N+1 has an empty container, `tickDiskWriteCache` collects 10 timed segments (one source
disk emptied per segment; collect pauses while the source size has an active tier match), then
flushes for one target build duration into one disk at N+1. `tickGame` runs
`tickDiskAutoFill` → `tickDiskWriteCache` → `tickDiskAutoFill` so write-cache ripple refills source
slots same tick. **Disks always take priority over read cache** for matching level costs: while a
full redeemable disk exists, cache is neither clickable nor auto-used. A full block can be released
(`releaseDiskCacheBlock`) only when no full redeemable disk of that size exists — crediting the
block's bits into `resources.base` (Bits). Smart autobuyers also auto-release cache via
`tickDiskAutoReleaseCache` when no matching disk is available. A full disk redeems
(`redeemDisk`) into whichever tier's CURRENT per-unit cost exactly matches its size right now —
**any** tier, not just tier01 — via `isDiskRedeemable`/`getDiskRedeemTierName`; if more than one
tier's cost happens to coincide, the tie always breaks toward whichever tier appears earlier in
`TIER_DEFINITIONS` itself (read live, not a hardcoded index — a future reordering of that array
changes the tie-break automatically, with no code change). Auto-redeem (`tickDiskAutoRedeem`) fires
only when the matching tier's own unit-buying autobuyer is currently unlocked and unpaused; otherwise
a full, redeemable disk simply waits for a manual click. `disks`/`disksBuiltTotal`/`diskCache`/
`diskBuild` are all PERMANENT across every real Prestige, like the Byte generator itself; only
`diskAutoRedeemedSizes` (which sizes have already auto-redeemed this cycle) resets each cycle.

**Data Lakes** (`intro.dataLakes` in `createInitialGameState`, `DATA_LAKE_*` constants in `layers.js`,
`depositDiskToDataLake`/`purchaseBoosterFromDataLake`/`getDataLakeDepositedUnits`/
`getDataLakeAvailableUnits`/`getBoosterPurchaseCost`/`getMaxBoosterPurchasesForCapacity` in
`engine.js`) — ten permanent lakes (KB … QB), one per storage denomination, each holding up to
`DATA_LAKE_CAPACITY` (999) units deposited from Disks (`9×1 + 9×10 + 9×100` of that tier's
denomination). Disk ladder steps 1–3 map to the KB lake, 4–6 to MB, …, 28–30 to QB. A full disk
deposits via `depositDiskToDataLake` (Foundry disk rows) — but only once that SIZE's own disk array
is completely built (all `DISK_ARRAY_LADDER_CAP` (10) disks ever built, `disksBuiltTotal[size] >=
DISK_ARRAY_LADDER_CAP`), not merely holding one full disk. Since a lake's 3 sub-slots map to 3
successive disk sizes, this naturally stages the lake's effective capacity: **9** once only the
smallest (×1) size's array is complete, **99** once the ×10 size's array is also complete, the full
**999** once the ×100 size's array is complete too — no separate staged-capacity field, the existing
sub-slot structure already encodes it (see `isDiskArrayFullyBuilt` in `engine.js`). Booster purchases on ComputePage spend
units genuinely OUT of the lake's own current deposits (no separate "used" ledger) — the nth
purchase at tier *t* costs *n* units of lake *t* and grants 1 of the matching compute-ladder entity
(`COMPUTE_BOOST_TIER_FIELDS`). Spent capacity only returns the same way it arrived — depositing more
Disks, once that array rebuilds a replacement through the ordinary build/fill pipeline — so a full,
undepleted lake can fund 44 purchases in one uninterrupted burst (triangular total `n×(n+1)/2` ≤
999) before needing fresh deposits, but a patient player redepositing between purchases can reach
the true lifetime cap of exactly `DATA_LAKE_CAPACITY` (999) Boosters per tier — the 1,000th would
cost 1,000 units, impossible regardless of how much gets redeposited. No separate inventory cap on
the purchase path itself (merge/UI slots still use `COMPUTE_ENTITY_CAP`). Memory→Core conversion and
8:1 merging remain as alternate paths. Boost preset multipliers/durations are unchanged.

**The above is a summary only.** The full mechanic reference — the complete tap/combine/Sacrifice/
Invest loop, transfer-block conversion mechanics, Storage's build/auto-fill/redeem lifecycle, Compute
Cores/Nodes/Boost, every forced-priority-order predicate, cost/production formulas, the (configurable,
growing) purchase block size and level system, Prestige Points and every PP-funded automation, the
per-tier and global tickspeed multipliers, the last tier's XP-funded tickspeed, Speed Up, Overclock,
Reset, the complete game state shape, and the engine function/constants tables — lives in
`docs/ECONOMY_REFERENCE.md`. Read it before touching `src/game/engine.js`, `src/game/layers.js`,
`TIER_DEFINITIONS`, `ByteFoundryPage`/`StoragePage`/`ComputePage`, or any economy/prestige/tickspeed
constant or formula — and check `docs/DESIGN_HISTORY.md` first if you're about to change a
formula/gate a past iteration may already have tried and rejected (e.g. the `<=` vs. `===`
bank-redeemability check, the flat vs. dynamic transfer cost).

For questions about run times, time-to-prestige, or pacing/balance (e.g. how starting Prestige Points
affect a single run's length), use the `simulate-run-times` skill
(`.claude/skills/simulate-run-times/SKILL.md`): it plays out full runs with the real engine functions
rather than reasoning about the formulas by hand. **Also re-run and publish** that skill whenever
making a change that can significantly affect ideal Foundry / prestige timings (economy constants
or formulas in `engine.js`/`layers.js`, Foundry/Disk/Compute/Capacity/tickspeed/autobuyer/
prestige rules, purchase-batch behavior, or the skill's own bot strategy). Publishing writes **one
new file per run** onto the stable orphan branch `ideal-run-strategy` via
`publish-strategy.sh` (`runs/<UTC-stamp>-<sha>.md` + `README.md` index) — never merge that branch
into `main`, and do not rename it with an agent/session suffix.

## Path aliases

`components/X` → `src/components/X`, `game/X` → `src/game/X`, `pages/X` → `src/pages/X`, `theme/X` →
`src/theme/X`, `save-migration/X` → `src/save-migration/X`. Use these bare aliases in imports (as the existing code does), not relative paths like
`../../game/engine`. Directory imports resolve to that directory's `index.jsx`/`index.js` (e.g.
`import { ThemeProvider } from 'theme'` → `src/theme/index.jsx`, same as `pages/MainPage` → its `index.jsx`).

## Theming

All component styling resolves to **semantic design tokens** defined once in `src/theme/tokens.js`
(`buildTheme(mode)` + `themes.dark`/`themes.light`), so the app's two themes — an evolved **dark**
(default) and a **light** theme — fall out of swapping palette values rather than forking any component
on mode. This is the foundation for the UI-revamp epic (#132); components migrate onto these tokens one
at a time in later sub-issues. Fonts (`font.display` = Space Grotesk, `font.body` = Inter) are locally
bundled via `theme/fonts.js` — no runtime CDN fetch. Settings → Appearance drives
`<ThemeProvider mode>` from `tens_theme_preference` (`system` default, or `light`/`dark`); System
follows `prefers-color-scheme`. Reset / `clearGameState` do not clear the theme preference.

The full per-file token/font/GlobalStyle/ThemeProvider breakdown lives in `docs/THEMING_REFERENCE.md`.
Read it before touching `src/theme/*`.

## PWA support

The app is installable as a Progressive Web App on both Android Chrome and iOS Safari — home-screen
icon, standalone display with no browser chrome, offline-capable after a first visit — via
`vite-plugin-pwa` (`generateSW` strategy, no custom runtime caching), without any app-store presence.
This was a deliberate choice over Capacitor/native app-store publishing or a React Native rewrite; see
`docs/DESIGN_HISTORY.md` for the trade-off reasoning. Manifest/icons/meta-tag details, and why save data
in `localStorage` is unaffected by the service worker's precache, are in `docs/PWA_REFERENCE.md`. Read
it before touching `vite.config.js`'s `VitePWA` block, the manifest fields, or `public/pwa-*`/
`scripts/generate-pwa-icons.mjs`.

## Funding

`.github/FUNDING.yml` declares GitHub Sponsors for `mohanpednekar`, so the repo shows a native
"Sponsor" button. The file alone doesn't enroll the account — Sponsors enrollment
(`github.com/sponsors`) is a separate, maintainer-only step tracked in issue #62's checklist; until
that's done the Sponsor button simply won't display/function.

## License

`LICENSE` (repo root) is an explicit all-rights-reserved notice — the maintainer's deliberate choice
over an OSS license (MIT/Apache 2.0/etc.). Code stays publicly visible on GitHub but isn't legally
reusable by others without written permission. This is an explicit statement of what default
copyright already implies by omission, added for clarity given the repo's growing public-visibility
surface (GitHub Sponsors, Releases, the PWA). A `CODE_OF_CONDUCT`/`CONTRIBUTING` guide is deliberately
not present — this is a solo, AI-driven hobby project not soliciting external contributions, so those
would only pad out GitHub's Community Standards checklist without adding real value; `README.md`,
`.github/ISSUE_TEMPLATE/` (`claude-task.yml` + `config.yml`), and `.github/pull_request_template.md`
already cover the genuinely useful items on that checklist.

## Testing

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`,
  `save-migration/index.test.js`, `navAttention.test.js`, `App.test.jsx`.
- Environment: jsdom, globals enabled (`describe`/`it`/`expect` without imports), setup file
  `src/setupTests.js` (imports `@testing-library/jest-dom/vitest`).
- Component tests use Testing Library (`render`, `screen`, `userEvent`) and query by role/label text rather
  than test IDs; `StatCard` panels carry `aria-label="<tier name> layer"` for this purpose, and each tier
  row's Buy button nests a visually-hidden `role="progressbar"` (via `VisuallyHidden`) with
  `aria-label="<tier name> cost-block progress"`
  plus `aria-valuenow`/`aria-valuemin`/`aria-valuemax` — the Buy/tickspeed-multiplier/Unlock/Smart/Prestige
  buttons also carry an explicit `aria-label` with the full descriptive sentence (independent of their
  compact icon-based visible text), so `getByRole('button', { name: … })` still matches even though a
  labeled node is nested inside them.
- Tests that seed `localStorage` directly must clear it in `beforeEach` (see `App.test.jsx`). Tests for the
  Reset (Settings → Danger zone) `window.confirm` guard mock it via `vi.spyOn(window, 'confirm')` and restore it in
  `afterEach` (see `App.test.jsx`). If a test ever needs to observe behavior across real tick boundaries
  again (none currently does), use `vi.useFakeTimers()` + `act(() => vi.advanceTimersByTime(TICK_RATE_MS))`
  **once per tick** (not one large jump per assertion — jumping by more than one tick fires the live
  `setInterval` several times synchronously within the same call stack, which React 18 batches into a
  single render), and **unmount the rendered component before calling `vi.useRealTimers()`**, not after —
  see `docs/DESIGN_HISTORY.md` for the real regression this ordering avoids.
- Where several near-identical automations/buttons exercise the exact same generic UI behavior (a
  pause/resume toggle beside a status badge; a purchase button disabled below its own PP cost), prefer a
  single `test.each` table over one hand-copied test per instance — same coverage (each row still runs
  and reports as its own test case), far less duplicated setup/assertion code to keep in sync when the
  shared behavior changes. See `App.test.jsx`'s pause-toggle and disabled-without-enough-PP tables for the
  convention.
- `yarn test` is green (1480 tests). The four core test files (`engine.test.js`, `layers.test.js`,
  `storage.test.js`, `App.test.jsx`) assert against the current tier/resource id scheme
  (`MONEY_ID = 'base'`, display name "Bits", symbol `b`; Factory Bytes pool `BYTES_ID = 'bytes'`, symbol `B`;
  tier ids `tier01`/`tier02`/… with display names
  `Kilobytes`/`Megabytes`/…) — don't reintroduce an older scheme (`'Ones'`, `'money'`, `'hundreds'`, or a
  purchasable Bytes tier) left behind by prior renames/removals (see `docs/DESIGN_HISTORY.md`). Saves
  must use the current schema (`resources.base`, `resources.bytes`, `intro.mainGameUnlocked`, tier ids `tier01`–`tier10`);
  `save-migration/adaptSaveForCurrentSchema` runs on every load; `storage.js`'s `mergeState` only fills in
  missing fields from `createInitialGameState()`. Legacy payloads with no migration step yet are
  discarded and surfaced via `IncompatibleSaveNotice`. Current saves stamp `saveSchemaVersion: 2`
  on every write (v1 saves forward-fill via `mergeState`). `src/theme/contrast.js` (a
  standalone WCAG relative-luminance contrast-ratio utility) plus `contrast.test.js` and
  `tokens.contrast.test.js` add the other two files — the latter audits the design tokens' plain
  (unblended) text/UI-component color pairs for AA compliance in both themes, see `docs/THEMING_REFERENCE.md`.
  `engine.computeFlops.test.js` covers the PP Compute (Flops) screen mechanics.

### End-to-end testing

`yarn test:e2e` (Playwright, config at `playwright.config.js`) is a separate, real-browser suite —
distinct from `yarn test`'s Vitest/jsdom suite above, and not a replacement for it. It drives the actual
app in headless Chromium against a real `yarn dev` server (Playwright's `webServer` option starts and
waits on it automatically; `reuseExistingServer` is enabled outside CI so a session's own already-running
`yarn dev` is reused instead of a second instance). Bound to `127.0.0.1` (never `0.0.0.0`), matching the
existing dev/test server convention, and targets the app's real `/tens/` base path.

- **One-time setup**: `npx playwright install --with-deps chromium` (or `yarn playwright install chromium`
  if the sandboxed environment can't install system package dependencies) — the browser binary isn't
  bundled with the `@playwright/test` devDependency and isn't pre-installed on the GitHub Actions
  `ubuntu-latest` runner. Chromium-only; this repo doesn't need cross-browser coverage.
- Specs live under `e2e/` (a sibling of `src/`, not inside it), named `*.e2e.js` — deliberately not
  `*.test.js`/`*.spec.js`, so Vitest's default glob never picks them up; `yarn test`'s reported test count
  (see "Testing" above for the current count) is unaffected by anything under `e2e/`.
- Specs seed `localStorage`'s `tens_game_state` key directly (via `page.evaluate`, after an initial
  `page.goto` to establish the origin, then `page.reload()`) rather than playing through the early game
  manually — the same state-seeding convention `App.test.jsx` already uses for the Vitest suite. A seeded
  object only needs the fields a given test cares about; `storage.js`'s `mergeState` fills in the rest
  from `createInitialGameState()` on load — including `intro: { mainGameUnlocked: true }`, needed by every spec
  that seeds state to land directly on MainPage rather than the Byte Foundry intro screen.
- Current specs: `e2e/golden-path.e2e.js` (fresh state with the main game already unlocked, buying Kilobytes via
  the real Buy button, Owned count and money balance updating including across a real production tick),
  `e2e/autobuyer-reload.e2e.js` (a save with a tier's autobuyer already unlocked survives a real reload
  without being silently relocked), `e2e/prestige.e2e.js` (seeding Money ≥ `PRESTIGE_THRESHOLD`,
  prestiging from the first-time `FullScreenOverlay`, and confirming resources reset and Prestige Points
  are awarded), and `e2e/meta-prestige.e2e.js` (seed at 1 Googol PP → Settings Era ascension → assert
  `era.count`, Eons award, and Foundry gate reset).
- **Not wired into `ci.yml`** — deliberately. Wiring this suite into CI (installing Playwright's browser on
  the runner, adding a job/step) is real follow-up work, but it means editing `ci.yml`, which is off-limits
  to `autonomous-maintenance.yml` (see docs/AUTOMATION.md) — a human needs to do that wiring
  directly. `yarn test:e2e` is a local/manual suite for now.

## Security notes

- Dev and test-watch servers bind to `127.0.0.1` explicitly (`--host 127.0.0.1`) — do not change to `0.0.0.0`.
- All purchases, autobuyer upgrades, and prestige are validated inside `engine.js`, not just via disabled UI
  buttons — the engine re-checks affordability/unlock state on every call.
- `saveGameState`/`loadGameState`/`clearGameState`/`loadLastSaveTimestamp` wrap `localStorage` access in
  try/catch and fail silently (quota errors, private-browsing restrictions).
- Timer effects (`useIncrementalGame`'s `setInterval`) are cleaned up on unmount.

## graphify

[Graphify](https://github.com/Graphify-Labs/graphify) is registered as a project-scoped Claude Code skill
(`.claude/skills/graphify/SKILL.md`, installed via `graphify install --project --platform claude`) — a
CLI (`graphifyy` on PyPI, requires Python 3.10+; install with `uv tool install graphifyy` or
`pipx`/`pip install graphifyy`) that turns a codebase into a queryable knowledge graph (`graphify-out/`:
`graph.json` + `graph.html` + `GRAPH_REPORT.md`), parsed locally via tree-sitter AST with no LLM
involved. It's a dev-tool aid for Claude Code sessions working in this repo, not a runtime dependency of
the shipped app — nothing under `graphify-out/` is imported by `src/`.

The graph has been built and `graph.json`/`graph.html`/`GRAPH_REPORT.md`/`.graphify_labels.json`
(+ `.sig`) are committed so every session starts from the same map. Everything else under
`graphify-out/` is gitignored (see `.gitignore`) as machine-local or purely-regenerable state, not
project content: `cost.json` (local API-cost tracking) and the two machine-local staging files
`.graphify_python`/`.graphify_root` (an absolute path to this session's Python interpreter and scan
root — every graphify subcommand regenerates them on demand if missing); the dated
`graphify-out/YYYY-MM-DD/` folder `graphify update` auto-backs up "curated" files into immediately
before it would overwrite them (a local rollback safety net, not a project artifact); and, as of
this note, `graphify-out/cache/` (the incremental-rebuild AST/semantic cache, namespaced by
graphify's own installed version — `cache/ast/vX.Y.Z/` — so it differed, and conflicted, across
nearly every session that touched it) and `manifest.json` (a raw per-file mtime/hash cache for
incremental change-detection, non-deterministic across machines) — both fully regenerable via
`graphify update .` and not needed to "start from the same map," which `graph.json` alone already
provides. `.graphify_analysis.json` and its intermediate siblings (`.graphify_detect.json`/
`.graphify_extract.json`/`.graphify_ast.json`/`.graphify_semantic.json`/etc.) are also gitignored —
graphify's own pipeline treats them as scratch state, deleted (`rm -f`) at the end of a normal run.
The initial build (`graphify extract . --code-only`) covered code only; a subsequent
`graphify update .` picked up this repo's markdown docs too (structural parsing — headings/links —
not LLM semantic extraction, so still 0 token cost either way), so the graph now spans both source
and docs.

Now that `graphify-out/graph.json` exists:
- For codebase questions, prefer `graphify query "<question>"` over grepping — it returns a scoped
  subgraph instead of raw file contents. Use `graphify path "<A>" "<B>"` for relationships and
  `graphify explain "<concept>"` for a focused concept.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost) —
  do this in the same session/commit as any non-trivial code change, so the committed graph doesn't
  drift stale against `graph.json`'s own "Built from commit" pointer in `GRAPH_REPORT.md`.
- `.claude/settings.json`'s `PreToolUse` hooks (`graphify hook-guard search`/`read`, on
  `Bash`/`Grep`/`Read`/`Glob`) nudge toward the graph before a raw file read; they no-op if the
  `graphify` CLI isn't on `PATH` or no graph exists yet, so a machine without it installed is unaffected.

See `.claude/skills/graphify/SKILL.md` for the full command reference (query/path/explain, `--wiki`/
`--obsidian`/`--graphml` export, `graphify hook install` for auto-rebuild on commit, etc.).
