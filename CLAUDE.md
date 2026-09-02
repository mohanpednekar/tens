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
Foundry gate; only Factory stays progress-gated. A third More entry, **Dev Mode** (`DevModePage`),
renders only in a dev build (`import.meta.env.DEV`) — see "Dev Mode" below.

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
yarn build        # production build → dist/ (GitHub Pages base `/tens/` + PWA service worker)
yarn build:capacitor # CAPACITOR=1 vite build → dist/ with relative base, no PWA plugin (for native wrap)
yarn cap:sync     # npx cap sync (copies web assets; native project update waits until android/ios exist — #70)
yarn test         # run all tests once (Vitest)
yarn test:watch   # watch mode, host 127.0.0.1
yarn test:e2e     # run the Playwright end-to-end suite (real chromium, against yarn dev) — see "Testing"
yarn audit        # yarn audit (Yarn Classic v1's built-in audit — no --all/--recursive flags; it
                  # already covers dependencies/devDependencies/optionalDependencies by default)
yarn bump-version # move CHANGELOG ## [Unreleased] → dated ## [x.y.z] + bump package.json
                  # (minor if Added/Removed entries, else patch; no-op if Unreleased empty)
yarn gen-pwa-icons # regenerate public/pwa-*.png + apple-touch-icon.png + favicon.ico from scripts/generate-pwa-icons.mjs
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
and infrastructure `claude-task` issues typically stay off a versioned milestone. `v0.6.0`
(UI-revamp chain #138/#139/#140) has fully shipped; the current next-release milestone is `v0.7.0`,
targeting Era ascension (`#407` / `#411–#414`, in progress). `scripts/sync-release-milestones.sh`
keeps milestones and assignments idempotent on housekeeping runs.

## Automation workflows

Five Claude-side workflows under `.github/workflows/` run Claude Code and GitHub automation
unattended, opening, fixing up, and merging PRs with no human in the loop — except a narrow,
conservative class of low-risk bot-authored PRs that merge on green checks alone. All five
authenticate via the `GH_AUTOMATION_PAT` repo secret rather than the default `GITHUB_TOKEN`
(whose commits/pushes/merges can't trigger other workflows). That PAT is deliberately
narrowly-scoped and includes `Workflows: write`, so autonomous runs can push commits that touch
`.github/workflows/**` when a task authorizes it (e.g. Phase B self-improvement on
`autonomous-maintenance.yml`, or a new workflow file from a Phase A issue). Owner review via
`.github/CODEOWNERS` still applies once branch protection requires it (see issue #62 and
`docs/AUTOMATION.md`'s "Auto-merge" prerequisites).

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
`dependabot-pr-followup.yml` does the same for failing checks on `dependabot/*` PRs when the bump
itself broke call sites (Phase 0 still owns `@dependabot rebase` for branches merely behind
`main`). `pr-auto-merge.yml` enables GitHub's native auto-merge either on human approval (any PR)
or on green checks alone for our own automation's branches (`claude/*` and `cursor/*`) when the
diff meets a conservative low-risk bar. `automation-self-heal.yml` watches the orchestration
workflows (Claude + Cursor maintenance/follow-up, Dependabot follow-up, auto-merge) for failed
runs and either opens a draft `claude/self-heal-*` config fix or files an `automation-failure`
issue — never edits `ci.yml` / `deploy.yml` / itself (full detail: `docs/AUTOMATION.md`).

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
rather than at project inception.

**Version bump before release:** when a PR is ready to cut the accumulated `## [Unreleased]`
entries into a dated release section, run `yarn bump-version` (`scripts/bump-version.mjs`) as a
final step on that PR's own branch — it reads Unreleased, chooses **minor** if `### Added` or
`### Removed` has entries (otherwise **patch**; major is never auto-selected), writes the new
`package.json` version, moves Unreleased into `## [x.y.z] - YYYY-MM-DD`, and resets Unreleased to
empty subheadings. No-op (exit 0) when Unreleased has no bullet entries. The bump lands in the PR
diff like any other change (never a direct commit to `main`). Post-merge tag push + GitHub Release
creation is the remaining half of #52 (`release.yml`), blocked on historical tags from #51.

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
                               Storage cues fold into Foundry; Compute Flops affordability →
                               `compute`)
    useIncrementalGame.js  ← React hook; wires the engine to useState + localStorage + the tick timer
    storage.js              ← localStorage read/write; offloads every load to save-migration/, then
                               forward field merge (`mergeState`); multi-slot saves + Supporter
                               entitlement (unlock code / dummy checkout), clearSaveSlot /
                               clearAllSaveProgress (never revokes unlock), plus the separately keyed
                               last-save timestamp used to compute offline progress (slot 0 keeps
                               legacy `tens_game_state` keys). Also owns Dev Mode's own isolated
                               `'dev'` slot (`isDevModeActive`/`setDevModeActive`/
                               `clearDevGameState`/`applyDevGameStateJson`) — see "Dev Mode" below;
                               entirely separate from the numbered player-slot system above.
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
    DiskArrayRow/index.jsx  ← one Disk array's full interactive detail (read cache blocks — only on
                               the pool's smallest size, see `isDiskReadCacheEligible` — disk
                               squares, releasing, redeeming; no deposit control, Data Lake feeding
                               is fully automatic) for a single size, taking `{ actions, size,

                               state }`; extracted so both ByteFoundryPage (the single currently-
                               active/buildable size only) and StoragePage (every size ever reached)
                               render identical, fully interactive detail rather than StoragePage
                               alone owning it and ByteFoundryPage settling for a text summary.
                               Full contract: `docs/COMPONENTS_REFERENCE.md`
    DataLakePanel/index.jsx ← one Data Lake's own self-contained block (title row + a
                               FillableStatCard showing deposited/capacity as one big number, mirroring
                               PoolCard's own layout — not a labelled table row; the size unit is part
                               of the visible name, e.g. "KB Lake"), taking `{ actions, state, bare,
                               tierIndex }` — `tierIndex` scopes rendering to that one lake, embedded
                               (`bare`, dropping its own StatCard chrome) inside each `ByteFoundryPage`
                               pool card below that pool's own disk-array rows, always shown regardless
                               of activity; omitting `tierIndex` falls back to the original
                               every-visible-lake list (retained for reuse, unused by any current
                               caller). Full contract: `docs/COMPONENTS_REFERENCE.md`. See "Economy
                               model" below for the Data Lake mechanic.

    Money/index.js          ← styled money/amount display, `theme.color.text` + tabular-nums.
                               Full contract: `docs/COMPONENTS_REFERENCE.md`
    ConfirmDialog/index.jsx ← in-game confirm overlay (StatCard + Cancel/Confirm); used by
                               SettingsPage's Era ascension action. Full
                               contract: `docs/COMPONENTS_REFERENCE.md`
    OfflineProgressNotice/index.jsx ← the "Welcome back!" offline-progress notice (`.jsx` — needs
                               JSX), shared by MainPage and ByteFoundryPage — see
                               `docs/DESIGN_HISTORY.md` for why it was extracted out of MainPage.
                               Full contract: `docs/COMPONENTS_REFERENCE.md`
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
                               same as MainPage; Data Stream + every DiskArrayRow as continuous
                               sections (no second-level tabs). Speed ×2 (Invest) and Capacity ×2
                               sit in the Data Stream section; pool Memory values are derived
                               from the shared Data Stream and its moving Capacity ceiling
    StoragePage/index.jsx   ← thin reusable every-size DiskArrayRow wrapper (primary UI is Foundry);
                               Build stays on Foundry. Not a top-level AppNav destination
    ComputePage/index.jsx   ← Foundry Boosters screen (merge chain + Boost). Reached via AppNav
                               once `isComputeCoreConversionUnlocked`; page id `'boosters'`. Takes `{ game }`
    ComputeFlopsPage/index.jsx ← PP Compute (Flops) screen; page id `'compute'`. Takes `{ game }`.
                               See Architecture 4c / Economy model below for the full mechanic.
    MainPage/index.jsx      ← the tier ladder (see "Architecture" below). Takes `{ game, focusNonce }`
                               — the full `useIncrementalGame()` object, lifted up into App.jsx so
                               ByteFoundryPage and MainPage can share one save/tick loop. Second-
                               level tabs: Factory | Upgrades (after first Prestige). Full
                               field-by-field reference: `docs/MAINPAGE_REFERENCE.md`
    InfoPage/index.jsx      ← the Guide page (see "Architecture" below), including Byte
                               Foundry/Storage/Compute sections. Reached via AppNav's Guide item;
                               takes no navigation props (AppNav is the exit)
    MilestonesPage/index.jsx ← Chapters / tier-autobuyer / tickspeed-autobuyer / Compute-autobuyer
                               status (chapter list: Architecture item 6 below). Reached via
                               AppNav → More; always reachable (including during the Foundry gate);
                               takes `{ game }`
    SettingsPage/index.jsx  ← Supporter pack, save slots, Prestige museum, Era ascension (confirm +
                               Ascend), Appearance, Ops dashboard, and Danger zone (Reset + Reset
                               Byte Foundry — see Architecture item 7 below). Reached via AppNav →
                               More; always reachable; takes `{ game, onReset, onResetByteFoundry,
                               themePreference, onThemePreferenceChange }`
    DevModePage/index.jsx   ← dev-only sandbox — toggle a separate, isolated save; quick-seed
                               presets; a Variables tree auto-generated by recursively walking
                               live game.state (see stateFields.js); a raw state-JSON editor.
                               Reached via AppNav → More's Dev Mode entry, itself rendered only
                               when `import.meta.env.DEV`; see "Dev Mode" below. Takes `{ game }`
      stateFields.js         ← pure helpers backing the Variables tree: prettifySegment (tier-id →
                               display-name label lookup), isEditableScalar, setValueAtPath
                               (immutable set-by-path at any depth)
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
                               imports `./fonts` as a side effect; `mode` defaults to dark, driven from
                               system pref + Settings → Appearance toggle (#140)
  App.jsx                   ← root component; owns the single `useIncrementalGame()` call (see
                               "Architecture" below) and wraps <ThemeProvider><GlobalStyle/>,
                               switching between
                               <ByteFoundryPage/>/<MainPage/>/<InfoPage/>/<ComputePage/>/
                               <ComputeFlopsPage/>/<MilestonesPage/>/<SettingsPage/>/<DevModePage/> via a local `page` useState
                               (`'game'`/`'info'`/`'foundry'`/`'boosters'`/`'compute'`/`'milestones'`/`'settings'`/`'dev'`,
                               default `'game'`) — not a routing library — plus a shared fixed bottom
                               `AppNav` (Foundry → Boosters → Compute → Factory → Guide → More) and `AppMenu`
                               (More sheet → Milestones / Settings / Dev Mode in dev builds). Legacy `page === 'storage'`
                               navigations rewrite to `'foundry'` (Disks live on Foundry, not a
                               top-level page). Same "local toggle, not real routing" convention
                               MainPage's own Factory | Upgrades tabs already use. Which screen actually renders is a derived
                               `showingFoundry = !GATE_EXEMPT_PAGES.has(page) &&
                               (!intro.mainGameUnlocked || page === 'foundry')` check (where
                               `GATE_EXEMPT_PAGES` = `'info'`/`'boosters'`/`'compute'`/`'milestones'`/`'settings'`/`'dev'`),
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
capacitor.config.json        ← Capacitor app id/name + `webDir: dist` (foundation for #70; no
                               android/ios platforms checked in yet)
vite.config.js               ← thin wrapper: `defineConfig(createViteConfig({ srcPath }))`
viteConfigFactory.js          ← the real Vite config — path aliases, dev/test server config, and the
                               VitePWA plugin (skipped when `CAPACITOR=1`, along with the GitHub
                               Pages `/tens/` base — see "Repo layout"'s Capacitor note below);
                               extracted out of `vite.config.js` (see `docs/DESIGN_HISTORY.md` for
                               why). Full PWA reference: `docs/PWA_REFERENCE.md`
playwright.config.js         ← Playwright end-to-end suite config (see "End-to-end testing" under
                               "Testing" below) — separate from vite.config.js's own `test` block, which
                               only configures Vitest
e2e/
  golden-path.e2e.js          ← buying Bytes via the real Buy button; Owned/money-balance updates
  autobuyer-reload.e2e.js     ← an already-unlocked tier autobuyer survives a real page reload
  prestige.e2e.js             ← prestiging from the first-time overlay resets resources, awards PP
  meta-prestige.e2e.js        ← Settings Era ascension from 1 Googol PP seed; era/Eons + Foundry gate
  data-lake.e2e.js            ← a fully-built disk array auto-depositing into its Data Lake (no
                               manual action — see `tickDiskAutoDeposit`), then starting a
                               Core Booster (deposits-funded, instant grant) from that lake on
                               ComputePage
scripts/
  bump-version.mjs (+ `.test.js`) ← `yarn bump-version`: cut CHANGELOG ## [Unreleased] into a
                               dated ## [x.y.z] section and bump package.json (minor if
                               Added/Removed entries, else patch; no-op if empty) — Part of #52;
                               post-merge tag/Release workflow still deferred
  generate-pwa-icons.mjs     ← one-off Node script (run via `yarn gen-pwa-icons`) that rasterizes an
                               inline "byte grid" SVG (see `docs/PWA_REFERENCE.md`) with `sharp` into
                               public/pwa-*.png + apple-touch-icon.png, and hand-assembles
                               public/favicon.ico (a minimal ICO container of PNG frames, no extra
                               dependency); not part of the build — only re-run it if the icon
                               design/palette changes
  adversarialReviewMarker.js (+ `.test.js`) ← pure helpers for the `<!-- adversarial-review sha=…
                               verdict=… -->` marker (see "Pull requests" above)
  pr-low-risk-eligible.sh (+ `.test.js`) ← shared low-risk-auto-merge eligibility bar, used by
                               `enable-auto-merge-if-eligible.sh` and `pr-auto-merge.yml`
  enable-auto-merge-if-eligible.sh ← marks a PR ready + enables GitHub auto-merge once it's
                               adversarial-APPROVEd and low-risk (see "Pull requests" above)
  backlog-issue-hygiene.sh, epic-407-issue-hygiene.sh ← idempotent GitHub issue-hygiene sweeps
                               (close shipped/stray issues, unblock/label ready work) run on
                               housekeeping passes — see docs/AUTOMATION.md
  sync-release-milestones.sh ← idempotent GitHub Milestone create/assign for player-facing tracks
                               (see "GitHub Milestones" below)
public/
  pwa-192x192.png, pwa-512x512.png, pwa-maskable-512x512.png, apple-touch-icon.png
                               ← generated PWA icon assets (see `docs/PWA_REFERENCE.md`); the old
                               create-react-app-era `index.html`/`manifest.json`/`logo192.png`/
                               `logo512.png` files that used to live in this directory were removed
                               (see `docs/DESIGN_HISTORY.md`)
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
   redeemUnlockCode, purchaseSupporterDummy, opsSamples, clearSlot, eraseAllSaveProgress,
   devModeActive, toggleDevMode, setDevState, applyDevStateJson, resetDevState }` — the last five
   back Dev Mode (see "Dev Mode" below); they're always present on the hook's return value (not
   itself gated by `import.meta.env.DEV`) but every consumer of them lives only in `DevModePage`,
   whose own rendering *is* dev-build-gated, so they're unreachable from any shipped UI. Every
   purchase — manual Buy and autobuyer ticks alike — always batches up
   to the current level's cost-block boundary (see docs/ECONOMY_REFERENCE.md), via a `BUY_QUANTITY`
   constant (`Number.MAX_SAFE_INTEGER` — a "buy as many as fit" sentinel, not a literal batch size,
   since the actual cap is applied dynamically inside the engine against the current, possibly-grown
   block size; deliberately not `Infinity`, which `clampNonNegative` treats as invalid and silently
   clamps to 0 — see `docs/DESIGN_HISTORY.md` for the incident this avoids) passed into `tickGame`
   as `autobuyerBatchSize` and into `actions.buyTierQuantity` (this replaced a
   removed player-facing ×1/×10 "Bulk" toggle — no persisted preference to manage). On mount, a
   one-time `computeInitialGame` helper calls `discardIncompatibleActiveSaveIfNeeded()` (clears the
   active slot when its on-disk payload fails `getSaveIncompatibilityReason`), then loads any saved
   state and, if elapsed real time registers at least one simulated second, folds in offline progress
   via `applyOfflineProgress` before the first render. The live tick loop separately re-checks for a
   background/suspended gap on every firing (including a `visibilitychange`-triggered resume check),
   so `offlineProgress` is **not** a mount-only, one-shot value — it can produce a fresh "Welcome
   back!" notice any number of times in one session. See `docs/ECONOMY_REFERENCE.md`'s "Offline
   progress" section for the full detection mechanism, thresholds, and speed multiplier.
3. **`MainPage/index.jsx`** — a pure renderer driven entirely by `TIER_DEFINITIONS` and the hook's
   `state` (received as a `game` prop from `App.jsx`, not its own `useIncrementalGame()` call). Renders
   each unlocked tier as a single compact grid row rather than separate cards. Kept purely game — live
   controls, numbers, and status text only; top-level destinations live in `App.jsx`'s shared `AppNav`
   (Byte Factory is this page), so MainPage itself carries no page-to-page open-* links. See
   docs/MAINPAGE_REFERENCE.md for the full field-by-field layout.
4. **`ByteFoundryPage/index.jsx`** — the tap screen (see "Economy model" below), also a pure renderer
   taking `{ game, focusNonce }` as props. It's the only way any Prestige cycle ever earns its first
   Kilobytes, replacing the old, since-removed self-producing Bytes tier as the game's actual
   bootstrap — a mandatory gate whenever `intro.mainGameUnlocked` is false (AppNav omits Factory during
   the gate; Guide and More stay). Once that cycle's `intro.mainGameUnlocked` flips true (the first
   bits ever converted into Kilobytes this cycle), it stops being a gate and becomes a permanent
   screen the player can voluntarily reopen at any time via AppNav's Foundry item — but it stays just
   as interactive either way, nothing here ever goes read-only. Once `intro.mainGameUnlocked`, the
   standalone Tap button is removed entirely — the Data Stream tile becomes the tap target instead (an
   `as="button"` swap on the same styled `FillableStatCard`, calling the identical
   `actions.tapIntroBit`), rather than two separate controls doing the same thing. Compute lives on
   its own dedicated screen (see 4b below) once revealed, reached via AppNav; Storage's every-size
   detail (see 4a) is continuous sections on this same Foundry screen (and the reusable
   `StoragePage` wrapper), not a separate AppNav item or second-level tab. Data Stream owns the
   shared Combine/Speed/Capacity actions and the common Provision Disk control. Storage pools 1–10
   are derived views over the one Data Stream: each unlocked pool's own Bandwidth is the Data
   Stream's shared production rate, hard-capped at the square root of that pool's OWN Capacity
   converted to Bytes (`getStoragePoolBandwidth`), so a pool with a small Capacity window can lag
   behind the raw rate once production outgrows it. **Storage pools display in SI units for all
   purposes** (`formatDiskSize` — Bandwidth, Capacity, and the Memory buffer meter below), unlike
   Memory Capacity/the Data Stream Buffer itself, which stays binary (see "Economy model" below).
   Each pool also owns a small local **buffer** (`intro.poolBuffers[poolIndex]`, `getPoolBufferBits`/
   `getPoolBufferCapacity`) that every bit-costing Storage action for that pool — Provision Disk's
   build cost, the read-cache fill-from-Memory pass — spends from exclusively; the shared Data
   Stream Buffer no longer funds these directly. `tickPoolBufferFill` tops the buffer up from
   `intro.bits`, ascending pool-by-pool, each pool reserving fill-rate up to its own Bandwidth cap
   off the top of the Data Stream's rate before the next pool sees any. `getPoolBufferCapacity`
   equals the pool's own Capacity exactly, not some smaller fraction — see `docs/DESIGN_HISTORY.md`
   for why. Full formulas: `docs/ECONOMY_REFERENCE.md`'s "Pool buffers" entry. `ByteFoundryPage`'s
   pool summary shows this buffer as a full-width
   `FillableStatCard` block — the same reused component/visual style as the Data Stream card's own
   tile (fill-gradient background, `BalanceText`, a hidden `role="progressbar"` for
   a11y) rather than a bespoke bar — showing just the buffer/capacity fraction (equal to the pool's
   own Capacity — see above), unlabelled.
   Each `PoolCard`'s own title reads "`<symbol>` Pool" (e.g. "KB Pool") — no index number or tier
   name — with the pool's own Bandwidth rendered beside it on the same `PoolHeaderRow` line (a
   `StatusText`, unlabelled) rather than inside the `FillableStatCard` block below, so a pool's
   throughput reads at a glance without expanding to the buffer detail — centered as a pair, since
   the symbol alone already uniquely identifies the pool (`aria-label="pool
   `<n>`"` on the card and `aria-label="expand/collapse pool `<n>`"` on its summary button still carry
   the numeric index for a11y/tests, independent of the visible text). One `PoolCard` renders for each
   VISIBLE pool in ascending order (`getVisibleStoragePoolCount` — the smaller of
   `getUnlockedStoragePoolCount`'s own disk-build-based count and how many pools' own capacity
   threshold `getPoolCapacityUnlockThresholdBits` the Data Stream's raw Capacity (`intro.capacity`)
   has reached: 1 KiB for pool 1, 1 MiB for pool 2, 1 GiB for pool 3, and so on by powers of 1024 —
   both conditions required). This capacity gate is deliberately kept separate from
   `isStoragePoolUnlocked`/`getUnlockedStoragePoolCount` themselves, which stay disk-build-only and
   keep driving the disk ladder's own progression (`getMaxActiveDiskLadderStep`), read-cache
   eligibility, Data Lake idle-disk liquidation, and Booster transfer pacing — folding the capacity
   rule into that shared primitive directly was tried first and reverted for exactly this reason (a
   much wider blast radius than intended) — see `docs/DESIGN_HISTORY.md`. Only the largest unlocked pool is expanded initially, while
   earlier pools remain visible as compact disclosure summaries that reveal their three disk-array
   rows when opened. `components/DataLakePanel` is embedded per pool (`bare` mode, a `tierIndex` prop
   scoping it to that one lake, always shown regardless of activity) directly below that pool's own
   disk-array rows, inside the same expanded disclosure — not a single shared panel listing every
   lake after all the pool cards, as an earlier iteration had it (see `docs/DESIGN_HISTORY.md`).
   Starting the next Disk's
   build (its own core-loop action, alongside Speed) and every shown size's full
   interactive detail — read cache blocks (only on the pool's smallest size — see
   "Economy model" below), disk squares, releasing (Disk Fill's manual-release half →
   Factory Bits only), and redeeming (Disk Fill itself; auto when the matching tier's autobuyer is
   on, else manual) — both stay here, rendered via the shared `components/DiskArrayRow` (see "Repo
   layout" above), ascending smallest→largest with Cache of a row immediately above that row's
   Disks. The Provision Disk button is a single shared control (one disk ladder spans every pool,
   not a per-pool one — see "Economy model" below) but renders INSIDE whichever ONE `PoolCard` the
   disk ladder's current offer (`getDiskSize`) currently belongs to (`getPoolIndexForDiskSize`),
   just below that pool's own buffer block and outside its `isExpanded` disclosure, so it stays
   visible/usable without expanding that pool — previously a single control living in the shared
   Data Stream section above all pool cards; moved per player feedback. Building ahead of every
   tier's current cost is a deliberate strategy, so it always stays visible/usable once Storage is
   revealed regardless of eligibility — including a fallback render right after the Data Stream card
   (`ByteFoundryPage`'s own `provisionDiskButton` variable, reused in both spots) for the rare case
   the disk ladder has advanced to a pool whose own card isn't visible yet (its capacity-unlock
   threshold — see above — not yet reached, even though the ladder itself is purely disk-build-driven
   and independent of capacity); each
   `DiskArrayRow` renders for every size from `getDiskSizesToShow` (every size ever reached plus
   the ladder's current offer). Each disk array always shows all `DISK_ARRAY_LADDER_CAP` (10) disk
   slots in one unbroken row. Speed ×2 and Capacity ×2 sit in the shared Data Stream section. Every
   action — here or on either dedicated screen — stays gated by the forced priority order (see
   "Economy model" below).
4a. **`StoragePage/index.jsx`** — thin reusable every-size DiskArrayRow list (ascending, via
   `getDiskSizesToShow`) — NOT the Provision Disk button, which stays on ByteFoundryPage itself. Takes
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
   a Megacomputer has any use at all. Cores are obtained by starting Boosters from the matching
   Data Lake (row 2 for Cores — see "Economy model" below; deposits spend instantly, any remaining
   cost live-transfers off built Disks over time), not minted from Memory — the earlier "Claim
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
   Compute-autobuyer / Era ascension status screen. Chapters: the first KiloByte, Go Googol, Open Compute,
   Go Unbounded, Ascend an Era. Reached via AppNav → More (`page = 'milestones'`); always reachable,
   including during the Foundry gate. Takes `{ game }`. Pure renderer.
7. **`SettingsPage/index.jsx`** — always-reachable utilities via AppNav → More (`page = 'settings'`):
    Supporter pack (unlock code / dummy checkout), multi-slot saves, Prestige museum, Era ascension
    (Eras/Eons display + confirm-guarded `actions.eraAscend()`), Appearance (theme preference), Ops
    dashboard, and Danger zone — Reset (full save wipe) and **Reset Byte Foundry** (Capacity /
    Storage / Compute + upgrades wipe to scratch; Combine / Invest / Provision Disk
    convenience-auto up to prior highs; Factory + Prestige kept). Takes `{ game, onReset,
    onResetByteFoundry, themePreference = 'system', onThemePreferenceChange }` (`onReset`/
    `onResetByteFoundry` are the confirm-guarded callbacks owned by `App.jsx`). Pure renderer
    aside from local form state.
8. **`DevModePage/index.jsx`** — dev-build-only sandbox, see "Dev Mode" below for the full
   mechanism. Reached via AppNav → More (`page = 'dev'`), gate-exempt like Settings/Milestones.
   Takes `{ game }`.

## Dev Mode

A local testing sandbox for seeding/experimenting with game state — **not** a player-facing
feature: its entry point (`AppMenu`'s "Dev Mode" button) and page route both render only when
`import.meta.env.DEV` is true, so `yarn build`'s production bundle contains neither the button nor
`DevModePage` itself (verified by grepping `dist/assets/*.js` for page-specific strings after a
build — see this feature's own PR). `yarn dev`/`yarn test` (Vitest defaults `import.meta.env.DEV`
to true) both expose it normally.

Enabling Dev Mode (`game.toggleDevMode()`) does **not** touch any real player save. `game/storage.js`
resolves every save read/write through `getActiveSlotId()`, which — while
`isDevModeActive()` is true — returns a dedicated `'dev'` slot id (its own storage keys,
`tens_dev_state`/`tens_dev_timestamp`, distinct from any of the `FREE_SLOT_COUNT`/
`SUPPORTER_SLOT_COUNT` player slots and never counted or listed by `listSaveSlots`) instead of the
real active slot id, so every existing save/load helper (`loadGameState`, `saveGameState`,
`clearGameState`, …) is transparently redirected with no changes of its own. Toggling off resumes
the real save exactly where it was left; toggling on for the first time starts from a fresh
`createInitialGameState()`. `isDevModeActive`/`setDevModeActive` persist the flag itself
(`tens_dev_mode_active`) separately from `tens_saves_meta`, so flipping it never touches player
slot bookkeeping.

`DevModePage` offers three ways to seed/experiment, all ultimately going through
`useIncrementalGame`'s `setDevState`/`applyDevStateJson` (both no-op outside Dev Mode as a defense-
in-depth guard, even though the UI only ever renders them while active):
- **Quick seed** — one-click presets (`PRESETS` in `DevModePage`) applying a small delta directly
  onto the live state via `game.setDevState(updater)`, e.g. unlocking the Byte Factory gate or setting
  Bits to the Prestige threshold. Reference the same `layers.js` constants
  (`PRESTIGE_THRESHOLD`/`ERA_ELIGIBILITY_PP`/etc.) the real game gates on, so a preset can't drift
  out of sync with what actually unlocks each milestone.
- **Variables** — not a hand-maintained field list: `DevModePage`'s `FieldNode` recursively walks
  `game.state` itself (the same object `engine.js`/`storage.js` produce for the real game) and
  renders one row per scalar leaf (number/string get a text input + Set; booleans toggle on
  click), nested under a collapsible `<details>` per object ancestor (so `intro.dataLakes.1.purchased`
  renders under nested `intro` → `dataLakes` → `1` sections, mirroring the state shape exactly).
  `stateFields.js`'s `prettifySegment` relabels a key that happens to be a known tier id (e.g.
  `owned.tier01`) with that tier's display name via a `TIER_DEFINITIONS`/
  `COMPUTE_FLOPS_TIER_DEFINITIONS` lookup — the only place this page references specific tier
  data, purely cosmetic. A field a past session never anticipated (a new top-level state key, a
  new nested object) shows up here automatically, with zero changes to this page — that's the
  "always in sync with the game code" property the whole Variables section exists for. Leaves that
  are `null`/`undefined` (structural "not yet built" sentinels, e.g. `intro.diskBuild`) or arrays
  (e.g. `prestigeMuseum.history`) are skipped — not simple scalar variables, so only the raw JSON
  editor below can touch them. `setValueAtPath` (`stateFields.js`) sets one leaf immutably by its
  full path array, at any depth, without disturbing sibling keys.
- **Raw state JSON** — a textarea pre-filled with `JSON.stringify(game.state, null, 2)`; Apply calls
  `game.applyDevStateJson(text)` → `storage.js`'s `applyDevGameStateJson(jsonText, currentState)`.
  A caller only needs to specify the fields they're changing (e.g.
  `{ "resources": { "base": 1e50 } }`) — `mergeStateForDevWrite` one-level-deep merges the parsed
  object onto `currentState` (the live dev-save state) before writing, so untouched top-level fields
  (and untouched sibling keys inside an edited object field, e.g. `resources.bytes` when only
  `resources.base` was specified) survive intact. This merge-onto-current-state step is required,
  not cosmetic: writing the parsed object alone would omit `intro` entirely for a bare
  `{ "resources": {...} }` payload, which `save-migration/detectLegacy.js`'s
  `getSaveIncompatibilityReason` treats as a legacy save missing a migration step
  (`'missing_intro'`) and rejects outright. The merged payload is then re-read through the exact
  same `adaptSaveForCurrentSchema` + `mergeState` pipeline a real save load uses, so any field still
  missing after the merge is filled in from `createInitialGameState()` the same way an old/partial
  player save would be.

`resetDevState` (Settings-style confirm in the UI) wipes the dev save back to fresh via
`clearDevGameState` (bypasses `clearSaveSlot`'s numbered-slot validation — `'dev'` is never one of
the numbered player slots it checks against).

**Real-slot isolation is enforced at the storage layer, not just by hiding UI.** A caller that
targets an explicit numbered slot id or iterates every real slot directly — `setActiveSaveSlot`,
`clearSaveSlot`, `clearAllSaveProgress` (all in `storage.js`, reachable from `SettingsPage`'s save-
slot management) — bypasses `getActiveSlotId`'s own dev-mode redirect entirely (that redirect only
ever helps callers that go through `getActiveSlotId()` itself, like `loadGameState`/`saveGameState`/
`clearGameState`). All three now explicitly refuse to run (`{ ok: false, reason: 'dev_mode_active' }`)
whenever `isDevModeActive()` is true, so Settings' "Play"/"Clear"/"Erase all save progress" can never
destroy or repoint a real player's save while Dev Mode is showing the (unrelated) dev save on
screen — this was a real bug caught by adversarial review before merge (see this feature's own PR
history), not a hypothetical. `useIncrementalGame`'s `eraseAllSaveProgress`/`clearSlot`/
`switchSaveSlot` all check that `ok` flag before touching React state, so the guard's effect is
visible end-to-end, not just at the storage layer. `SettingsPage` additionally disables the
corresponding buttons (`title="Disable Dev Mode first"`) whenever `game.devModeActive` is true, so
the refusal isn't a silent no-op — that conditional is written as
`import.meta.env.DEV && Boolean(game.devModeActive)` specifically so Terser/Rollup can fold the
whole branch (and its "Dev Mode" copy) out of a production build, even though `devModeActive` can
in practice only ever be true in a dev build already — this closes the same "absent from
`yarn build`" gap DevModePage itself observes, since `SettingsPage` isn't itself dev-gated the way
`DevModePage` is. `clearGameState` (used by `resetGame`) separately routes to `clearDevGameState`
instead of the now-guarded `clearSaveSlot(getActiveSlotId())` while Dev Mode is active, so "Reset
active save" still correctly wipes the dev save rather than silently no-op-ing against a call that
would now be refused.

## Economy model

There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Kilobytes` through `Quettabytes` (a byte-scale/computing theme). Every tier is bought
directly with the base currency (`MONEY_ID = 'base'`, display name "Bits") and, once owned, produces
the tier immediately below it, cascading production down the ladder; `tier01` (Kilobytes) is the special
case where cost is still Bits but production credits the separate Factory Bytes pool (`BYTES_ID = 'bytes'`,
displayed as whole `B`) and mirrors the same amount × `BITS_PER_BYTE` into Bits (`MONEY_ID`) so
MoneyHero / Prestige / tier Buys keep moving (see `docs/DESIGN_HISTORY.md` for the #430 incident
this mirror fixed). **Clock Speed** (the global tickspeed multiplier on MainPage,
formerly "Tickspeed") is funded from that Bytes pool — initial activation costs **10 Bytes** — not Bits.
Reaching Money ≥ `PRESTIGE_THRESHOLD`
(`GOOGOL * BITS_PER_BYTE` = 8e100 — "1 Googol Bytes," expressed in Bits since a Byte is 8 Bits) freezes
the economy except for Prestige — unless `isUnboundedPrestigeUnlocked(state)` is true (permanent
`prestige.unboundedUnlocked` latch set the first time `prestige.count` reaches
`PRESTIGE_UNBOUNDED_MIN_COUNT` (100), or carried through Era ascension), in which case production
continues and Prestige is optional (see `isProductionFrozen`). **Era ascension** (`eraGame`) is a
separate voluntary meta-prestige at **1 Googol unspent PP** (`ERA_ELIGIBILITY_PP`): it awards
**Eons** (+1 base, +1 per Eon Amplifier level — shop deferred to #414), increments `era.count`,
resets the full Foundry (generator upgrades, Disks, Data Lakes, compute ladder entities, Memory/gate) plus the
ordinary Factory cycle (`prestige.points`/`count`/`prestigeDoublePpLevel` → 0,
`computeFlops.owned` → 0, `cumulativeBoost` fresh), while keeping automation unlocks/pause flags
(except Double PP level), tier/tickspeed autobuyer milestone objects, `prestige.unboundedUnlocked`,
museum, hyperscalers, Eon upgrade levels, Flops autobuyer unlock flags, and page latches. Era *N*
free-unlocks the *N*th Flops tier's autobuyer (KFlops at Era 1, …). Hyperscalers (bought with
Eons in #414) add permanent +0.01%/s each to every Factory tier's Flops multiplier via
`getHyperscalerFlopsBoostRate` — the engine/hook action (`buyHyperscaler`) is wired, but no page
renders a purchase control yet, so this isn't reachable by a player in the UI (deferred to #414,
blocked pending maintainer-approved spend design). Prestige Points are
awarded by `getPrestigePointsAwarded`: 1 base PP at 1 Googol
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
onward) is reachable. Tapping accumulates bits into the **Data Stream** (a Buffer-capped balance)
that combines into a permanent, passively-producing Byte generator. Combine creates the generator
without snapping Capacity; save load via `normalizePoolMemoryCapacity` preserves current Capacity
and only clamps it when necessary, and Era ascension keeps the permanent generator (`byteCreated`)
but resets Capacity to `INTRO_STARTING_CAPACITY` with the rest of the Foundry (`buildEraIntroReset`).
Production grows via **Speed ×2** (Invest — own cost ladder stepped ×4 per tier) plus the
restored **Capacity ×2** ladder. Capacity requires a full Buffer, drains it, doubles the shared Data
Stream capacity, and stops at the moving ceiling of the highest unlocked pool. Plus —
once far enough along — Disks
(`StoragePage`) and Compute Cores/Nodes/Compute Boost (`ComputePage`, nav **Boosters**). A separate
**PP Compute (Flops)** screen (`ComputeFlopsPage`, nav **Compute**) unlocks at 100 PP — see
Architecture 4c above for its full tier/cost/persistence spec. Recurring "upgrade"
actions are ranked in a fixed **forced priority order** — Disk Fill > Speed/Invest > Provision Disk >
Compute Boost — so a lower-ranked action is disabled (both in the UI and in the engine
reducer itself) whenever a higher one is currently available. An always-on auto-convert
(`convertIntroBitsToKilobytes`/`tickIntroAutoInvest`) turns Data Stream bits into free `tier01`
units at tier01's own current per-unit cost every tick, with no manual UI trigger and no per-cycle
cap; the first successful conversion unlocks the main game. `ByteFoundryPage` no longer renders a
manual transfer-block row for this at all (removed — see `docs/DESIGN_HISTORY.md`): once Storage
Pool cards start appearing, Disk redemption (below) is the player-facing path to tier units, and
before that, auto-convert alone carries the player through the mandatory gate with no click needed.
`convertIntroBitsToKilobytes` itself is unchanged and still exported/tested — only its one UI caller
was removed.
The generator, Disks, Data Lakes (deposits / purchased Boosters / in-flight transfers /
`capacityLevel`), and every compute-ladder entity — Core, Node, Cluster, Network, Grid, Fabric,
Cloud, Datacenter, Supercomputer, Megacomputer (every tier past Node mergeable manually, 8:1 per
tier, once unlocked — "Compute" names the page/feature only, not any individual entity) — are all
permanent across every real Prestige; only Data Stream balance itself, the main-game-unlock gate,
and tier01's own purchase-block progress reset each cycle. Nothing here ever fully freezes — every
action stays
live indefinitely, every cycle.

**Data Stream Buffer / pool Memory Capacity** (`getMemoryUnit`/`formatBitsInNearestUnit`/
`isMemoryCapacityAtCap`/`normalizePoolMemoryCapacity`/`getStoragePoolMemoryBounds`/
`getStoragePoolCapacity`/`getStoragePoolBandwidth`/`getNextSiDoubledValue` in `engine.js`/
`layers.js`, `INTRO_CAPACITY_CAP_BITS`/`INTRO_BANDWIDTH_COST_MULTIPLIER`/`MEMORY_BINARY_UNIT_STEP`/
`POOL_CAPACITY_SI_STEP`) — **standing rule: non-binary (SI-clean or decade-power) transforms are for
storage-pool-scoped values only; `intro.capacity` itself keeps doubling plainly in binary**, since
it's also the Data Stream tile's own balance/capacity figure. Two earlier attempts got this wrong by
sharing one raw value between both displays (see `docs/DESIGN_HISTORY.md` for both); the current
mechanic decouples them entirely instead:

- `intro.capacity` (the Data Stream card's own balance/Buffer figure, RENDERED in binary — IEC-style
  `B`/`KiB`/`MiB`/`GiB`/…/`QiB`, step 1024 via `MEMORY_BINARY_UNIT_STEP`, so `1 KiB = 1024 Bytes`) is
  a plain `INTRO_STARTING_CAPACITY * INTRO_CAPACITY_DOUBLING_STEP^N` doubling sequence, where N is
  however many times Capacity ×2 has been purchased — `upgradePoolCapacity` no longer clamps this
  raw value to any pool boundary, so it can and does grow past a pool's own SI ceiling once that
  ceiling is reached (further purchases just keep doubling it in the background, unclamped, until a
  higher pool unlocks and needs the growth). It always renders a clean binary figure.
- Each Storage pool derives its OWN Capacity (`getStoragePoolCapacity`) from that same doubling
  count N, but via a plain DECADE-POWER-OF-10 ladder — 1 KB, 10 KB, 100 KB, 1000 KB (= 1 MB, pool
  1's own ceiling), and so on for higher pools — rather than the finer SI-clean switchover sequence
  Bandwidth below still uses. `getDecadePowerEquivalentBits` finds the decade exponent as
  `Math.floor(steps * Math.log10(2))`, reusing the SAME `steps = round(log2(rawBits /
  BITS_PER_BYTE))` doubling count `getSiCleanEquivalentBits` computes (multiplying a modest integer
  by a precise constant stays far more numerically stable at large magnitudes than taking log10 of
  an already-huge float directly), then returns `10 ** decadeExponent` Bytes — a single closed-form
  computation, no iteration. Capacity therefore holds FLAT within a decade (e.g. still exactly
  "1 KB" at 2×, 4×, or 8× the raw doubling count that first crossed into it) and jumps straight to
  the next decade the instant `intro.capacity` crosses it — no intermediate SI-clean steps (2 KB,
  4 KB, …) in between — then clamps to that pool's own `getStoragePoolMemoryBounds` window (pool 1 →
  1 MB, pool 2 → 1 GB, pool 3 → 1 TB, … `endBits = BITS_PER_BYTE * 1000 ** (poolIndex + 1)`), which
  is itself always a power of 10, so clamping never fights the decade-power ladder. Each decade step
  exactly matches the disk-build COST one step behind it (e.g. crossing into "10 KB" Capacity funds
  a 1 KB disk's own 80,000-bit `getDiskCost` — `DISK_BUILD_COST_MULTIPLIER` × size) — deliberate, not
  coincidental, so a pool's buffer is always exactly far enough ahead to afford its own next disk
  the moment `intro.capacity` crosses that threshold; see `docs/DESIGN_HISTORY.md`.
  `getUnlockedStoragePoolCount`/`isMemoryCapacityAtCap` (below)
  both key off this SAME derived value, not the raw `intro.capacity`, so the "moving ceiling"
  purchase gate tracks what the pool actually shows.
- Each pool's Bandwidth (`getStoragePoolBandwidth`) simply follows the raw production rate — the
  SAME rate the Data Stream tile's own `+N Bytes/sec` figure uses — through the finer SI-clean
  switchover transform (`getSiCleanEquivalentBits`, its OWN closed-form helper, distinct from
  Capacity's decade-power one above though both share the same `N = round(log2(rawBits /
  BITS_PER_BYTE))` doubling-step calculation): `SI_CLEAN_LOCAL_SEQUENCE[N % 10] * 1000 ** floor(N /
  10)` — a ROUNDED log2 rather than a discrete doubling search, so floating-point drift from chained
  purchases/Compute Boosts/prestige bonuses can't misclassify a value that's mathematically meant to
  sit exactly on a doubling boundary as one step off. It matches the raw rate up to 64 B/s, then
  diverges (125 instead of 128, repeating every decade) — e.g. a raw 256 B/s rate reads as a clean
  250 B/s — deliberately finer-grained than Capacity's own decade-only steps, since Bandwidth is a
  continuously-read display figure, not a funding threshold meant to hold flat between jumps.
  `sqrt(that pool's own Capacity in Bytes)` is only a GUIDELINE for the lower/upper bounds this
  should land in, not the formula itself — it still acts as the real throughput ceiling once a
  pool's own (now fixed, maxed) Capacity can't keep up with an ever-growing rate, but even then the
  SI-clean transform is applied to that bound, not a raw `sqrt` remainder.
- `isMemoryCapacityAtCap` compares the highest unlocked pool's OWN derived Capacity
  (`getStoragePoolCapacity`) against that pool's `endBits`, not raw `intro.capacity` — this is what
  actually gates `isMemoryCapacityUpgradeAvailable`/`upgradePoolCapacity`, since the raw value no
  longer self-limits. `normalizePoolMemoryCapacity` (save load) no longer clamps `intro.capacity` to
  any pool boundary either — only sanitizes a missing/negative value — for the same reason.
- `INTRO_CAPACITY_CAP_BITS` is retained as the pool-1 alias (unchanged value, 8,000,000 bits/1 MB
  SI) and the active highest pool's end bound is still the authoritative moving ceiling — just
  evaluated against the pool's own derived Capacity now, not the raw one.
- `getCoreEarnTimeSeconds` (Compute merge/boost pacing, see "Compute Cores/Nodes" below)
  deliberately keeps reading the RAW `intro.capacity` — it describes the real Buffer's own refill
  time, not a pool-card display figure. Since `intro.capacity` no longer clamps to a pool ceiling,
  this is an acknowledged, minor Compute merge/boost pacing consequence (~2.4% slower per full
  decade of doublings past a pool boundary, compounding within an Era) rather than a bug — see
  `docs/DESIGN_HISTORY.md`.

The Data Lake capacity ladder (below) is a separate, always-independent ladder — it now uses the
same plain DECADE-POWER-OF-10 shape pool Capacity uses (`DATA_LAKE_CAPACITY_BY_LEVEL`, 1/10/100/1000,
capped at 1,000 units), replacing an earlier finer SI-clean sequence — see "Data Lakes" below and
`docs/DESIGN_HISTORY.md`. A lake's own capacity is never shown via any binary unit, so it never
shared the Data Stream-display conflict pool Capacity itself once had (see above). **Speed ×2** (was Bandwidth/Invest) steps by
`INTRO_BANDWIDTH_COST_MULTIPLIER` (4) per tier; production-doubling effect
(`INTRO_PRODUCTION_MULTIPLIER_STEP`) is unchanged.
`INTRO_COMPUTE_CORE_UNLOCK_CAPACITY` sits at half the end bound (4,000,000 bits / 500 KB SI). This is
the first slice of a larger per-storage-pool generator design — see `docs/DESIGN_HISTORY.md` and
epic #456 / tracking #506.

**Disks** (`intro.disks`/`disksBuiltTotal`/`diskCache`/`diskWriteCache`/`diskBuild` in `createInitialGameState`,
`getDiskSize`/`getDiskCost`/`provisionDisk`/`tickProvisionDisk`/`tickDiskAutoFill`/`tickDiskWriteCache`/
`isDiskCacheBlockReleasable`/`releaseDiskCacheBlock`/`isDiskRedeemable`/`redeemDisk`/
`tickDiskAutoRedeem`/`getDiskRedeemTierName` in `engine.js`) are a real storage medium, not
tier01-only: a size's ladder (every Byte power of ten — `DISK_LADDER_BASE_SIZE_BITS` ×
`DISK_LADDER_SIZE_MULTIPLIER^(n-1)`: 1 KB → 10 KB → **100 KB**, so a "1 KB" disk needs 8000 bits, not
a "kilobit" 1000) advances every `DISK_ARRAY_LADDER_CAP` (10) built at the current size — but only up
to the highest size any currently-unlocked storage pool can fund (`getDiskSize` never
advances through the active ladder using `getMaxActiveDiskLadderStep` as pools unlock; the terminal
limit is pool 10's largest size. Once that last size's array is fully built,
`isDiskLadderExhaustedForActivePools` goes true only once pool 10's largest size is fully built and
`isProvisionDiskAvailable` follows it. Completing a pool derives the next pool; earlier pools remain
as compact summaries while the largest unlocked pool is expanded. Starting a provision
(`provisionDisk`) spends `getDiskCost(size)` (`DISK_BUILD_COST_MULTIPLIER` (10) × size)
immediately and takes real TIME to complete — the array's Nth disk (N = disks already built at that
size, 1-indexed) takes `N ×` that size's own base build time, where the base time is exactly how
long filling that size takes at the current Byte Foundry production rate (snapshotted when provisioning
starts) — at the default starting rate (1
bit/sec) a fresh 1 KB (8000-bit) array's first disk takes 8000 seconds, its 6th disk 48,000 seconds,
and a 10 KB array's first disk 80,000 seconds; all three shrink in lockstep as Invest/Compute Boost
grow the rate. An earlier version used a flat, rate-independent "1 second per real KB of size"
instead — see `docs/DESIGN_HISTORY.md`. During provisioning, every disk already in that size's array is completely offline (no auto-fill, no auto-redeem, no
manual cache-block release, no manual redeem) until `tickProvisionDisk` finishes the countdown. Each
array's smallest size — the one whose `getDataLakeSubSize` sub-slot is ×1, the rung that actually
touches Memory directly — has its own always-full **read cache** (`diskCache[size]`,
`DISK_CACHE_BLOCK_COUNT` (8) blocks of `size / 8` bits each, totaling one disk's worth — e.g. a
1 MB array → 8 × 1 Mb; displayed in the bit-scale `Kb`/`Mb`/…/`Qb` unit via `formatCacheSize`,
lowercase `b` for bits, distinct from a Disk's own Byte-scale `B`/`KB`/… via `formatDiskSize`,
uppercase `B` for Bytes) — see `isDiskReadCacheEligible` in `engine.js`; every larger size in the
same pool fills exclusively via write cache (below), never getting a read cache of its own (running
both was pure redundancy). Steady state is full; Memory refills whole blocks when a block was just
released or the size was just unlocked (so Memory visibly fills between transfers) — this refill
itself is bandwidth-capped at `CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER` (10) times the current
production rate (a CACHE filling FROM Memory), so even a large banked balance sitting behind a
block/tier claim drains into the cache at a real, continuous, bounded rate once unblocked — not
instantly — rather than the fixed rate/tier check alone gating it. `tickDiskAutoFill`'s cache
eligibility (which sizes it tries to fill) is keyed off `getUnlockedStoragePoolCount` — every
currently-unlocked pool's own smallest size — NOT off `disksBuiltTotal` having an entry for that
size: a pool's read cache starts filling from Memory the instant that pool unlocks, so it's already
waiting full (or filling) by the time the player's first disk of that size finishes provisioning,
rather than starting from empty only once a disk has ever been built — see
`docs/DESIGN_HISTORY.md`. Read cache flushes into an empty
disk over the time to fill one cache block at `DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER` (2) times
the current Byte Foundry production rate (a DISK filling FROM a cache) when all 8 blocks are full
and no tier claim blocks that size (pauses while a tier matches). Every size above the pool's
smallest fills exclusively via **write cache** (`diskWriteCache[targetSize]` — empty at rest): when
10 full disks exist at size N and size N+1 has an empty container, `tickDiskWriteCache` collects 10
timed segments (one source disk emptied per segment, each segment's own duration = that source
disk's size ÷ `CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER` (2) × rate — a CACHE filling FROM Disks;
collect pauses while the source size has an active tier match), then flushes for the target's own
size ÷ `DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER` (2) × rate into one disk at N+1 (a DISK filling
FROM a cache — the same rate class the read-cache flush above uses, timed independently of a fresh
disk BUILD's own 1x-bandwidth duration). `tickGame` runs
`tickDiskAutoFill` → `tickDiskWriteCache` → `tickDiskAutoFill` so write-cache ripple refills source
slots same tick. **Disks always take priority over read cache** for matching level costs: while a
full redeemable disk exists, cache is neither clickable nor auto-used. A full block can be released
(`releaseDiskCacheBlock`) only when no full redeemable disk of that size exists — crediting the
block's bits into `resources.base` (Bits). Smart autobuyers also auto-release cache via
`tickDiskAutoReleaseCache` when no matching disk is available. Each disk size has a permanent, fixed
**one-to-one correspondence** to exactly one (tier, level) pair — the tier sharing its Data Lake
grouping (`getDataLakeTierIndex`; steps 1–3/1 KB–100 KB → tier01/Kilobytes, steps 4–6/1 MB–100 MB →
tier02/Megabytes, and so on — the same KB/MB/GB/… naming `TIER_DEFINITIONS` and
`DATA_LAKE_TIER_LABELS` already share) and that size's own position (1st/2nd/3rd) within that
tier's 3-step group as the required LEVEL. A full disk redeems (`redeemDisk`) via
`isDiskRedeemable`/`getDiskRedeemTierName` only while its corresponding tier is CURRENTLY sitting
at exactly that required level — not yet there, or already past it, and it isn't redeemable this
cycle (the "already past it" case is exactly what `tickDiskAutoDeposit` claims into the pool's Data
Lake instead, see below). Redeeming **completes that whole level in one shot** — grants the tier's
entire current purchase block, not a single unit, rolling it straight into the next level — replacing
an earlier design where a disk redeemed into "whichever tier's current per-unit cost happened to
coincidentally match its size," which needed its own tie-break rule and could permanently strand a
disk mid-cycle; see `docs/DESIGN_HISTORY.md`. Auto-redeem (`tickDiskAutoRedeem`) fires
only when the matching tier's own unit-buying autobuyer is currently unlocked and unpaused; otherwise
a full, redeemable disk simply waits for a manual click. `disks`/`disksBuiltTotal`/`diskCache`/
`diskBuild` are all PERMANENT across every real Prestige, like the Byte generator itself; only
`diskAutoRedeemedSizes` (which sizes have already auto-redeemed this cycle) resets each cycle.

**Data Lakes** (`intro.dataLakes` in `createInitialGameState`, `DATA_LAKE_*` constants in `layers.js`,
`depositDiskToDataLake`/`startBoosterTransfer`/`tickDataLakeTransfers`/`getDataLakeDepositedUnits`/
`getDataLakeAvailableUnits`/`getBoosterPurchaseCost`/`getDataLakeTransferCapacity` in `engine.js`) —
ten permanent lakes (KB … QB), one per storage denomination. A lake never itself banks a spendable
reserve beyond its own deposits (below) — past that, it's a throughput pipe onto the live Disk
inventory, not a second stockpile. Disk ladder steps 1–3 map to the KB lake, 4–6 to MB, …, 28–30 to
QB.

*Capacity* — a lake's own deposit capacity (`getDataLakeCapacity(state, tierIndex)`) is a
purchasable ladder: starting at 1 unit (`getDataLakeCapacityLevel` level 0 — "1 KB" for the KB
lake, in that lake's own Byte-scale currency) and climbing by 1 level per
`doubleDataLakeCapacity(tierIndex)` purchase via `DATA_LAKE_CAPACITY_BY_LEVEL` — a plain
DECADE-POWER-OF-10 ladder (1, 10, 100, 1,000), the same coarse shape pool Capacity itself uses
(`getDecadePowerEquivalentBits`), replacing an earlier finer SI-clean sequence (1, 2, 4, …, 64, 125,
250, 500, 1,000 over 11 levels) — see `docs/DESIGN_HISTORY.md` — permanently hard-capped at
`DATA_LAKE_CAPACITY_MAX_LEVEL` (level 3 — 1,000 units, "1000 KB"
for the KB lake) via `isDataLakeCapacityMaxed`. Advancing a level is funded by **draining the lake itself**, not Bits: it requires
the lake to be completely full (`isDataLakeCapacityDoublingAvailable` — deposited units at least the
lake's own current capacity) and empties every deposit back to zero on purchase — the same
"requires a full Buffer, drains it" shape Memory's own Capacity ×2 ladder uses, just paid in the
lake's own banked Disks instead of Data Stream Buffer bits; each level's own cost is therefore
always exactly the level below it (1 unit to reach 10, 10 units to reach 100, 100 units to reach
1,000). The `doubleDataLakeCapacity`/`isDataLakeCapacityDoubling*` function and predicate names
still say "doubling" even though the ladder itself now climbs a decade-power step per level, not a
literal ×2 — a value-only change, not worth renaming every call site for. `normalizePoolMemoryCapacity`
(save load) clamps a saved `capacityLevel` back down to `DATA_LAKE_CAPACITY_MAX_LEVEL` if it's
above it — a save written under the old, longer ladder could otherwise index
`DATA_LAKE_CAPACITY_BY_LEVEL` (now length 4) out of bounds and return `undefined`; it likewise
clamps a saved `intro.poolBuffers` entry down to its pool's current `getPoolBufferCapacity` if the
now-lower decade-power Capacity formula (see above) leaves it above the new ceiling.
`getDataLakeCapacityDoublingCost` is kept only as a display-only helper (that same current-capacity
figure converted into real bits via `getDataLakeUnitBits(tierIndex)`, for the button's own tooltip)
— no code path spends it out of `intro.bits`. Gated by the same forced priority order every other
Byte Foundry milestone action follows (`isDataLakeCapacityDoublingTurnAvailable` — available only
once Disk Fill, Speed, Provision Disk, and Compute are all currently unavailable; sits at the
Capacity rank, not competing with Speed). An earlier version fixed this cap at a value derived from
the Disk arrays themselves with no purchasable lever at all, and a version after that funded
doubling from Bits like Memory's own Capacity ×2 — see `docs/DESIGN_HISTORY.md` for both.

*Deposits* — filled by depositing Disks (`10×1 + 10×10 + 10×100` of that tier's denomination at
full capacity) via `depositDiskToDataLake` — fully automatic, no manual click: `tickDiskAutoDeposit`
(called from `tickGame`'s `tickStorage` right after auto-redeem) deposits the smallest eligible
size each tick, but only once that SIZE's own disk array is completely built (all
`DISK_ARRAY_LADDER_CAP` (10) disks ever built, `disksBuiltTotal[size] >= DISK_ARRAY_LADDER_CAP`,
not merely holding one full disk) **and** the size is not currently redeemable for the main game
(`!isDiskRedeemable`) — the same "disks always take priority for matching level costs" rule the
read cache already follows, so a disk a tier could still redeem stays available for that instead of
being swept into the lake. A sub-slot's own deposit count naturally never exceeds
`DISK_ARRAY_LADDER_CAP` (10, since only 10 disks of a given size can ever be built) — this was never
a separate design cap, just a backstop that keeps the deposits counter from exceeding what's
physically possible; `canDepositDiskToDataLake` enforces it alongside the real, intentional limit
above, the lake's own capacity level, which is far smaller (1,000 max vs. an incidental 1,110-unit
sum if every sub-slot were somehow filled to that backstop) and is what actually gates deposits in
practice. `decomposeDataLakeDeposits` still caps each digit place at that same backstop value
regardless of the current level — deposits stay fungible, not tracked per physical disk, so spending
re-decomposes the remaining total largest-denomination-first. `DataLakePanel` displays
deposited/capacity/next-Booster-cost/doubling-cost figures in Byte-scale (`formatDiskSize`,
KB/MB/GB/…) rather than a bare unit count — each abstract unit converted through the
`getDataLakeUnitBits` helper — since "Data lake uses the same currency as disks" (see
`docs/DESIGN_HISTORY.md`).

*Starting a Booster* (`startBoosterTransfer(tierIndex)`, ComputePage) — the nth Booster ever
started at tier *t* (completed or still in flight) costs *n* units of lake *t*
(`getBoosterPurchaseCost`, which counts in-flight transfers alongside completed ones so starting
several concurrently can't dodge the escalating cost). That cost is spent out of the lake's own
deposits FIRST — instant, since those Disks are already at the lake — and whatever remains is
sourced live from raw, undeposited built Disks and transferred into the lake over time, at
`DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER` (10×) the Byte Foundry's current bits/sec production rate
(`getIntroProductionRate`, no Compute Boost) — `(bits transferred) / (10 × rate)` seconds — only
granting 1 of the matching compute-ladder entity (`COMPUTE_BOOST_TIER_FIELDS`) once that transfer
completes (`tickDataLakeTransfers`, part of `tickGame`). When deposits alone cover the full cost,
there's nothing left to transfer and the Booster grants immediately, same as before this mechanic
existed. A lake can run up to `DATA_LAKE_TRANSFER_CAPACITY_MAX` (3) of these live transfers at
once, one concurrency slot unlocked per completed sub-size Disk array (×1/×10/×100 — the same
staged gate deposits use, see `getDataLakeTransferCapacity`) — this is a throughput cap on live
transfers only, not a lifetime cap on Boosters (deposits + repeated live transfers can fund a lake
indefinitely). No separate inventory cap on the Booster path itself (merge/UI slots still use
`COMPUTE_ENTITY_CAP`). Memory→Core conversion and 8:1 merging remain as alternate paths. Boost
preset multipliers/durations are unchanged.

*Idle disk liquidation* — once a pool's LAST (largest, ×100) disk array is fully built
(`isDiskArrayFullyBuilt` — a REQUIRED, separate check, not implied by the deposit check below: that
check also returns false while the array is still mid-build, for an entirely different reason than
"no room," and conflating the two would liquidate a genuinely reusable disk from an unfinished array
the moment Provision Disk happened to be momentarily unaffordable) AND its Lake genuinely can't
absorb another one of those disks (`!canDepositDiskToDataLake` — NOT just `isDataLakeCapacityMaxed`:
a maxed lake was just DRAINED to reach that level, by `doubleDataLakeCapacity`'s own "requires full,
drains it" shape, so a lake can sit at its hard-cap LEVEL with 1,000 units of totally empty room for
exactly one tick right after that upgrade — checking `canDepositDiskToDataLake` directly is what
correctly lets that deposit happen instead of destroying the disk), a completed pool's LAST disk
array would otherwise just pile up full disks with nowhere to go. `tickIdleDiskLiquidation` (called from `tickStorage`,
after auto-deposit/auto-release-cache) liquidates that idle output straight into Bits — the same
Data Stream currency Provision Disk spends from — automatically funding whatever Provision Disk
needs next (in practice, the next pool's first disk). Gated by the full forced priority order,
including EVERY tier's own Lake Capacity doubling ranked directly above it
(`isIdleDiskLiquidationTurnAvailable`/`isIdleDiskLiquidationAvailable`): it only ever kicks in once
the Foundry would otherwise be completely idle — Disk Fill, Speed, Provision Disk, Compute, and
every lake's own Capacity doubling all unavailable — so it never competes with or bypasses a
higher-ranked action. The lowest rank in the whole forced priority chain.

**The above is a summary only.** The full mechanic reference — the complete tap/combine/Speed
loop, auto-convert conversion mechanics, Storage's build/auto-fill/redeem lifecycle, Compute
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
on mode. This was the foundation for the now-complete UI-revamp epic (#132, all 8 sub-issues shipped,
including light mode's activation in #140); every component consumes these tokens. Fonts
(`font.display` = Space Grotesk, `font.body` = Inter) are locally
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

### Capacitor foundation (in progress — #70)

A Capacitor wrap is scaffolding-only so far (not store-ready; no `android/` / `ios/` trees yet):

- `@capacitor/core` (runtime) + `@capacitor/cli` (dev) are dependencies; `capacitor.config.json`
  names the app **Tens** (`appId: com.mohanpednekar.tens`, `webDir: dist`).
- `yarn build:capacitor` sets `CAPACITOR=1` so Vite uses `base: './'` and omits `VitePWA` — a
  Workbox SW under Capacitor's origin is redundant/harmful; the ordinary `yarn build` path is
  unchanged for GitHub Pages.
- `.gitignore` already excludes native build artifacts for when `npx cap add android|ios` lands.
- Remaining for #70: `@capacitor/android` / `@capacitor/ios`, generated platform projects, and
  `.github/workflows/mobile-build.yml` (debug APK + iOS Simulator artifacts via `workflow_dispatch`).

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
- `yarn test` is green (1634 tests). The four core test files (`engine.test.js`, `layers.test.js`,
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
  `tokens.contrast.test.js` add two more files — the latter audits the design tokens' plain
  (unblended) text/UI-component color pairs for AA compliance in both themes, see `docs/THEMING_REFERENCE.md`.
  `engine.computeFlops.test.js` covers the PP Compute (Flops) screen mechanics;
  `capacitorConfig.test.js` pins the Capacitor Vite `createViteConfig` path;
  `pages/DevModePage/stateFields.test.js` covers Dev Mode's Variables-tree helpers
  (`prettifySegment`/`isEditableScalar`/`setValueAtPath`). Together with
  `save-migration/index.test.js`/`navAttention.test.js` (named above) that's 11 of the 14 files; the
  remaining three are `scripts/adversarialReviewMarker.test.js`,
  `scripts/pr-low-risk-eligible.test.js`, and `scripts/bump-version.test.js` — Vitest's default glob
  picks these up alongside `src/` since `vite.config.js`'s `test` block sets no custom `include`.

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
  try/catch and fail silently (quota errors, private-browsing restrictions). JSON loads use
  `safeJsonParse` (drops `__proto__`/`constructor`) before merge.
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
