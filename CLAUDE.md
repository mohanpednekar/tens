# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
It documents **current behavior only** — signatures, constants, state shape, conventions. For the
*why* behind a design (superseded formulas, incident write-ups, empirical simulation results, UI
decision trade-offs), see `docs/DESIGN_HISTORY.md`. Check that file before changing a formula,
workflow, or mechanic a past iteration may already have tried and rejected for a specific reason.

## Project

**Tens** — a React incremental game. Every mechanic (costs, production, prestige) is themed around
powers of ten. No routing library, no backend — state lives in React and is persisted to `localStorage`.
The app switches between top-level screens via a plain `useState` toggle in `App.jsx` plus a shared
bottom `AppNav` (Foundry → Boosters → Compute → Factory → Guide → More) — not a router (see
"Architecture"): `ByteFoundryPage` (tap-to-earn bootstrap; a one-time-ever mandatory gate on a save's
very first cycle, until Storage's own capacity threshold is reached — never again after that,
permanently revisitable), `MainPage` (tier ladder + PP Upgrades), `InfoPage` (Guide),
`ComputePage`/`ComputeFlopsPage` (Boosters once Foundry Compute unlocks; PP Flops Compute at 100 PP).
`StoragePage` is not an AppNav destination — disk arrays live under Foundry as continuous Memory +
Storage sections on the same screen (no second-level tabs). Guide and More (Milestones / Settings) are
always available, including during the Byte Foundry gate; only Factory stays progress-gated. A third
More entry, **Dev Mode** (`DevModePage`), renders only in a dev build (`import.meta.env.DEV`) — see "Dev
Mode".

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
working, printing a `✅`/`‼️` pass/fail summary for each step — so work begins from a confirmed baseline.
It also prints a third, informational-only staleness note for AI-instruction file cost hygiene (see "AI-
instruction file cost hygiene" below). It always exits 0 regardless of outcome (visibility, not
blocking) and is idempotent/non-interactive. This is interactive-session-only setup — the autonomous
workflow (`autonomous-maintenance.yml`) does equivalent setup via its own `Enable Corepack`/`Set up
Node` steps. `.claude/settings.json`/`.claude/hooks/` are otherwise a protected path for unattended runs
— the `claude-code-action` harness `autonomous-maintenance.yml` runs under refuses any `Write`/`Edit`
under `.claude/` as a sensitive path, independent of that workflow's own `settings.permissions.deny`
list (see `docs/DESIGN_HISTORY.md`) — so this hook could only be added from an interactive session.

> **Critical:** Vite 8 uses OXC, which infers JSX from the file extension. Any file containing JSX **must**
> be named `.jsx`, not `.js`, or the build/tests will fail. Plain styled-components definitions (no JSX)
> stay `.js` (see `src/components/*/index.js`).

There is no configured lint script (`yarn lint` does not exist) and no CI job for linting — CI only runs
`yarn test`. `.github/workflows/deploy.yml` runs `yarn build` and publishes `dist/` to GitHub Pages on
push to `main`. Automated Copilot review on PRs is configured through GitHub's repository settings, not
an explicit workflow file.

## Pull requests

Always create a pull request after pushing changes to a branch — do not ask the user whether to create
one first. This applies to every change made in this repo, not just specific tasks.

PRs are opened as drafts by default, but stay draft only while real, known work is still pending (a
queued commit, a fix in progress, unrun tests). Mark it ready the moment it reflects genuinely finished
work (local checks pass, nothing further planned) — a draft isn't reviewed or auto-merge-eligible, so
leaving a finished one draft just stalls it. This applies to every PR, autonomous or interactive.

**Verification effort scales with how public the PR is**: minimal testing (one `yarn test` after a
coherent batch of changes, not after every edit) while nothing's been opened yet; one full local check at
draft creation; multiple rounds of adversarial review (Claude plus any other reviewer — bots, humans)
once marked ready, looping until nothing new turns up. This does not slow down any of
`pr-auto-merge.yml`'s three enabled paths (below, and in "Automation workflows") — a qualifying human
GitHub approval, a low-risk diff on green checks, or an adversarial `APPROVE` on a low-risk diff — all of
which stay immediate by design. The 10-minute quiet period only applies on the rare occasion none of
those three paths fires and a session is merging a PR directly itself (e.g. `gh pr merge`): wait for CI
green plus 10 minutes with no further review activity first. Full detail: `docs/AUTOMATION.md`'s "PR
review & testing cadence".

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

Once anything is pushed to an open PR, stay on it: check CI status and review comments (human and bot —
Copilot, Codex, etc.), and address every actionable item — fix it directly if small and confident, or
ask first if ambiguous or architecturally significant. After pushing a fix, check again, since new
pushes can draw new comments — repeat check → address → push until status quo (no new actionable
comments and CI green, or only pre-existing/out-of-scope failures left), not just one round.

**Explicitly mark each review thread resolved once you've handled it** — reply with what you did (fixed,
or why no action is needed for an informational finding), then call `resolve_review_thread` (or the
equivalent UI action) on that same thread. This applies to every thread, including a bot's purely
informational/confirmatory comment: it still needs an acknowledging reply and an explicit resolve. This
repo's branch protection requires every conversation resolved before merge — one unresolved thread
blocks the merge indefinitely regardless of green CI or approvals. Treat "reply and resolve" as a
mandatory pair for every thread you touch, and periodically sweep the PR's full thread list (not just
threads a fresh notification surfaced) before considering a PR finished.

Keep PRs green through genuine fixes only — never `--no-verify`, never disable or delete a failing
test to make it pass, never weaken a check just to get past it. If a check itself is wrong, flaky, or
needs updating, fix the workflow/check definition instead of routing around it.

Once auto-merge is enabled on a PR (by anyone — human approval or `pr-auto-merge.yml`'s low-risk path,
see "Automation workflows"), it silently sits inert if the PR falls out of sync with its base branch —
GitHub won't merge a conflicted PR however green its checks. Treat mergeable state as something to
actively check: whenever there's reason to look at a PR with auto-merge on (a "merge conflict" notice, a
push to the base branch, or a routine check-in), fetch its `mergeable_state` and, if conflicted, resolve
it immediately — merge (or rebase, matching repo convention) the base branch into the PR branch, resolve
the conflicts for real (never blindly take one side wholesale on a file with actual logic), rerun `yarn
test` locally, and push. Prefer a merge over a rebase when the PR already has review comments/approvals
tied to specific commits (rebasing rewrites SHAs and can orphan that context). This applies whether the
conflict is trivial (two unrelated doc/changelog bullets, `graphify-out/`'s generated files — safe to
take the incoming side and regenerate) or substantive (overlapping logic in one function) — the latter
still needs a real read of both sides, not just `git checkout --theirs`.

Before merging any PR that touches `TIER_DEFINITIONS` or other economy constants/formulas in
`src/game/layers.js` (autonomous or interactive), run the `economy-change-review` skill
(`.claude/skills/economy-change-review/SKILL.md`): a narrow, mechanical cross-check of the diff against
the originating issue's approved spec table and Explicit Authorizations section — catching drift (a
wrong `baseCost` exponent, a mis-chained `producesResourceId`, a migration missing an old tier id, an
unauthorized economy change) that general review doesn't look for. It supplements, not replaces, the
ordinary review flow above.

For general review depth, the reviewer subagent at `.claude/agents/code-reviewer.md` does a
comprehensive, adversarial, evidence-based, read-only review of a PR or working diff — every finding
verified against the checked-out code and cited by `file:line` with a CONFIRMED/PLAUSIBLE label, an
explicit merge verdict (APPROVE / NEEDS CHANGES / BLOCK), a checked-and-clean invariants list, and an
honest statement of anything it didn't cover. Use it (spawn via the Agent tool) before merging any
non-trivial change, or whenever asked to review a branch/PR; on economy diffs it folds in the
`economy-change-review` cross-check as a required step rather than replacing it.

When filing a new `claude-task` issue for the backlog below, or splitting a large feature into a
sequence of them, use the `file-task-issue` skill (`.claude/skills/file-task-issue/SKILL.md`): the
full issue-template guidance, size/priority labeling, the conflict-avoidance `Blocked by #N` sequencing
heuristic, the `blocked` label's two distinct meanings, epic/sub-issue grouping, the narrow cases where
an issue needs no PR, and the "specs go stale" lesson from issues like #45/#138 whose bodies described
UI since rebuilt out from under them. Also useful when tightening an existing issue's spec.

## Issue tracking for interactive sessions

**Maintainer checklist (#62).** Issue #62 ("Maintainer Action Items") is pinned at the top of the Issues
tab via GitHub's native pinned-issues feature and deliberately carries **no labels** — it is not a
`claude-task` work item, only a standing manual setup checklist that #63 keeps auto-verified. Do not add
`claude-task` to it or unpin it without understanding why.

Every session that does non-trivial work — interactive sessions, not only `autonomous-maintenance.yml`
runs — files a GitHub issue to track that work and keeps it updated, giving interactive work the same
at-a-glance visibility the `claude-task` backlog has. File it as soon as the scope is clear (before or
alongside the first commit); the `file-task-issue` skill's (`.claude/skills/file-task-issue/SKILL.md`)
template conventions (Goal/Context/Spec) make a good body even for a non-backlog issue. **Don't** apply
the `claude-task` label to it — that label is reserved for items meant for `autonomous-maintenance.yml`'s
Phase A backlog, and a live interactive tracking issue labeled that way would be picked up as unclaimed
work. For the same reason, don't file it from the `claude-task.yml` issue template (its frontmatter
auto-applies the label) — file a blank issue and borrow the template's section structure by hand.
Comment at meaningful status changes (PR opened, a review round landed, work blocked/descoped) and close
it once the PR merges or the task otherwise concludes.

For work that naturally splits into multiple pieces, file a parent "epic" issue and attach each piece as
a GitHub sub-issue — the same convention as the `file-task-issue` skill's "Epics and sub-issues" section
(see #87–#92, #132) — so the effort collapses to one row. A trivial, one-off change (a typo fix,
answering a question with no code change, a tiny doc-only tweak) doesn't need a tracking issue — use
judgment; the point is visibility into real work, not process overhead.

For work large enough to benefit — roughly the `file-task-issue` skill's `size:M`/`size:L` threshold; a
`size:S`-shaped change stays one tracking issue — split the epic's sub-issues along **coding / testing /
documentation** phase lines rather than only by feature-slice, so the coding sub-issue can land without
waiting on the other two, while the deferred ones stay tracked with the epic's context:

- **Coding** — the core implementation. Its PR is not exempt from the repo's hard requirements: `yarn
  test` must stay green, the core logic needs tests, a behavior change gets its `CHANGELOG.md` entry,
  and — if it touches anything `CLAUDE.md` documents (signatures, constants, state shape, conventions)
  — `CLAUDE.md` is updated in the *same commit*, per "Documentation" below. That same-commit rule is a
  hard invariant and does not relax under this split; only work never required to land with the code
  gets deferred.
- **Testing** — coverage beyond what the coding sub-issue needed for green CI: additional scenarios,
  edge cases, regression tests, e2e specs. Can lag behind the coding sub-issue's merge.
- **Documentation** — narrative/rationale writing not required to keep `CLAUDE.md` accurate:
  `docs/DESIGN_HISTORY.md` write-ups, README updates, deep-dive `docs/*_REFERENCE.md` sections.
  Deferrable.

Link each phase sub-issue back to the parent epic (and each other where relevant) so a later session
has the coding sub-issue's context — what shipped, what was deferred and why — without re-deriving it
from the diff.

### GitHub Milestones (release grouping)

GitHub Milestones group player-facing work toward a named release target; they complement (do not
replace) the Project's `Track` field from #53 (a `Track` answers "what's related to what" across
releases; a Milestone answers "what's targeted for this release", with a native due-date and X/Y-closed
progress). Interactive sessions and Planning (#53) should assign player-facing feature/economy issues to
the next release's milestone; process and infrastructure `claude-task` issues typically stay off a
versioned milestone. `v0.6.0` (UI-revamp chain #138/#139/#140) has fully shipped; the current
next-release milestone is `v0.7.0`, targeting Era ascension (`#407` / `#411–#414`, in progress).
`scripts/sync-release-milestones.sh` keeps milestones and assignments idempotent, running on every
`autonomous-maintenance.yml` invocation.

## Automation workflows

Claude-side and GitHub workflows under `.github/workflows/` run unattended — opening, fixing up, and
merging PRs with no human in the loop, except a narrow class of low-risk bot-authored PRs that merge on
green checks alone. All authenticate via the `GH_AUTOMATION_PAT` secret, not `GITHUB_TOKEN` (whose
pushes/merges can't trigger other workflows). The PAT includes `Workflows: write`, so autonomous runs
may push `.github/workflows/**` changes when a task authorizes it; `.github/CODEOWNERS` review still
applies once branch protection requires it (issue #62; `docs/AUTOMATION.md`'s "Auto-merge" prerequisites).

**Shared helpers** (`docs/AUTOMATION.md` "Shared workflow helpers"): `.github/actions/setup-node-yarn`
(trusted refs only — PR-follow-up workflows keep setup inline because their checkout is untrusted PR
code), `scripts/pr-head-guard.sh` (fork + branch-prefix check from a sparse **main** checkout before the
pinned-SHA checkout), `scripts/claude-deny-settings.sh` (claude-code-action `settings` deny JSON; base
list always protects `ci.yml`/`deploy.yml`/`release.yml`/`automation-self-heal.yml`).

**Orchestration model.** The maintainer orchestrates; the scheduled workflow develops. `claude-task`
issues (`.github/ISSUE_TEMPLATE/claude-task.yml`) are the backlog for `autonomous-maintenance.yml`
(twice daily, 9:00am/9:00pm IST), one unit of work per run: Phase 0 (CI/CD failures + unaddressed
critical/high Dependabot alerts) > Phase A (backlog: `priority:high` → normal/FIFO → `priority:low`) >
Phase B (maintenance menu: tests, dependency/security incl. medium/low alerts, code quality, doc sync,
workflow self-improvement, gap analysis). A run that notices a genuine out-of-scope bug files a
`claude-task` + `bug` issue (explicit **Impact** line) instead of fixing it mid-run; guard-step
code/secret-scanning alerts not already tracked get the same (Dependabot alerts stay with Phase
0(c)/B). Phase A may weigh Impact to reorder *within* a priority tier (`priority:high` still jumps
outright), saying so when it deviates from lowest-number order.

- `devin-autonomous-maintenance.yml` — Devin-CLI counterpart, every 4h (UTC :17), opens `devin/auto-*`
  PRs; agent auth via `DEVIN_CLI_CREDENTIALS`, git/`gh` via `GH_AUTOMATION_PAT`. 5-open-PR ceiling counts
  `devin/auto-*` + `claude/auto-*` together. No file-scope restriction (may edit workflows incl. its own
  file); every change still lands via PR + human review (`pr-auto-merge.yml` excludes
  `.github/workflows/**` from green-checks auto-merge). Applies the Pull-requests convention to its own
  PRs; post-run feedback stays `autonomous-pr-followup.yml`'s job.
- `devin-workflow-health.yml` — daily 00:00 UTC; files an `automation-failure` issue if the workflow
  doesn't parse, hasn't started in 26h, or its latest run failed.
- `pr-conflict-sweep.yml` — on every push to `main`, flags newly conflicted open PRs; on
  `claude/auto-*`/`devin/auto-*` the comment triggers the follow-up agent to merge-and-resolve.
- `release.yml` — deterministic: on a `package.json` push to `main`, tags `v<x.y.z>` if absent and
  creates the GitHub Release from that version's `CHANGELOG.md` section (see "Changelog convention").
- `autonomous-pr-followup.yml` — review comments/CI failures on `claude/auto-*`/`devin/auto-*` PRs.
  `dependabot-pr-followup.yml` — failing checks on `dependabot/*` PRs when the bump broke call sites
  (Phase 0 still owns `@dependabot rebase` for merely-behind branches).
- `pr-auto-merge.yml` — native auto-merge on human approval (any PR) or green checks alone for
  `claude/*`/`devin/auto-*` when the diff meets the conservative low-risk bar.
- `automation-self-heal.yml` — watches the orchestration workflows for failed runs; opens a draft
  `claude/self-heal-*` fix or an `automation-failure` issue; never edits `ci.yml`/`deploy.yml`/itself.

Guard-step context feeds are bounded: any new feed passes an explicit `--limit` and display-cap with a
"+N more" note; list feeds render number + title + labels only, never bodies (`docs/AUTOMATION.md`, #81).

**Budget discipline applies to every session, not just automation.** Self-estimate the remaining
rolling 5-hour Claude usage window and keep a session at or under roughly **50%** of a full window,
recalculated each time — soft target, modest overshoot is not a failure. If a task looks too large even
after buffering, land the largest coherent, test-covered slice first (`Part of #N` instead of `Closes
#N`, plus a comment on what remains) rather than risk a runaway session — see `docs/AUTOMATION.md`'s
"Budget discipline" / Cost implications (~15-20% held back for test/commit/push/PR-open).

For full phase-by-phase logic (guard-step details, `blocked`-label mechanics, the 5-PR ceiling,
auto-merge's exact low-risk bar, manual prerequisites), see `docs/AUTOMATION.md` — read it before
touching any `.github/workflows/*.yml` file or reasoning in detail about the unattended pipeline.

## Documentation

Always update this file (`CLAUDE.md`) in the same change/commit as any code change it describes —
don't leave it as a follow-up. If a change touches function signatures, constants, state shape,
economy/game-rule behavior, file layout, or test counts documented below, update the corresponding
section here before considering the change done. A code change and a stale doc describing the old
behavior should never ship together. If a change is significant enough to need a rationale trail
(a superseded formula, a rejected alternative, an incident write-up), add it to
`docs/DESIGN_HISTORY.md` in the same commit rather than folding narrative into this file.

**Keep additions here terse; put the detail in the matching `docs/*_REFERENCE.md` file.** `CLAUDE.md`
is loaded into every session's context (interactive and every autonomous run), so its size is a
recurring cost, and duplicated facts drift when only one copy is updated. This file needed a dedicated
trim in 2026-09 (see `docs/DESIGN_HISTORY.md`'s "CLAUDE.md Economy model duplication trim" entry, and
issue #537) because feature PRs kept adding formula-/UI-rendering-level prose here instead of to the
reference doc for that area (`docs/ECONOMY_REFERENCE.md` for economy/engine mechanics,
`docs/MAINPAGE_REFERENCE.md` for MainPage/ByteFoundryPage/ComputePage field layout,
`docs/COMPONENTS_REFERENCE.md` for component prop contracts, `docs/THEMING_REFERENCE.md`/
`docs/PWA_REFERENCE.md`/`docs/AUTOMATION.md` for their own areas). Default to one or two orientation
sentences (what changed, the function/constant name to grep for) plus a pointer to the reference doc —
write the full detail there, not here. Only put something in full here if no reference doc exists yet
for that area (then consider whether the change warrants creating one).

**`AGENTS.md`** (repo root) is a condensed mirror of this file for non-Claude AI tools (Codex, Cursor,
etc. — Claude Code itself only reads `CLAUDE.md`). It declares itself non-authoritative and says to fix
drift in the same change — whenever a change here touches something `AGENTS.md` also states (page
count/names, field names, mechanic summaries, architecture description), update `AGENTS.md`'s condensed
version in the same commit. It once drifted significantly (stale page count, a renamed field, a
long-superseded Byte Foundry mechanic) before being resynced; don't let that recur.

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
diff like any other change (never a direct commit to `main`). Once that PR merges,
`release.yml` (push-to-`main`, `paths: ['package.json']`, deterministic — no agent) pushes the
annotated `v<x.y.z>` tag and creates the GitHub Release from that version's changelog section;
see `docs/AUTOMATION.md`'s "Release" entry.

## AI-instruction file cost hygiene

`CLAUDE.md`/`.claude/CLAUDE.md` load into every session unconditionally, `AGENTS.md`/
`.claude/agents/*.md`/`.claude/skills/*/SKILL.md` whenever a non-Claude tool or that agent/skill runs —
so their size is a recurring cost. `.claude/skills/optimize-ai-files/SKILL.md` defines a
content-independent, meaning-preserving trimming process (it re-derives what's redundant each run, so
it doesn't go stale). An interactive session gets a non-blocking staleness note from
`.claude/hooks/session-start.sh`; a monthly Claude Code Remote Routine also runs it end-to-end, PR
included. Full detail: `docs/AUTOMATION.md`'s "AI-instruction file cost hygiene" / "PR review & testing
cadence".

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
    optimize-ai-files/        ← content-independent, meaning-preserving token-reduction pass over
                               CLAUDE.md/AGENTS.md/agent+skill files (see "AI-instruction file cost
                               hygiene" below)
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
                               last-save timestamp for offline progress (slot 0 keeps legacy
                               `tens_game_state` keys). Also owns Dev Mode's isolated `'dev'` slot
                               (`isDevModeActive`/`setDevModeActive`/`clearDevGameState`/
                               `applyDevGameStateJson`) — see "Dev Mode"; separate from the numbered
                               player-slot system.
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
    DiskArrayRow/index.jsx  ← one Disk array's full STATUS detail for a single size, a pure display with
                               nothing clickable (read cache blocks — only on the pool's smallest size,
                               see `isDiskReadCacheEligible` — and disk squares; tier funding is
                               automatic via `tickDiskPull`/`tickDiskLevelOneCachePull`, Data Lake
                               feeding too), taking `{ actions, size, state }` (`actions` unused, kept
                               for a uniform call-site shape); shared by ByteFoundryPage and StoragePage
                               — see `docs/DESIGN_HISTORY.md` for why it's standalone. Full contract:
                               `docs/COMPONENTS_REFERENCE.md`
    DataLakePanel/index.jsx ← one Data Lake's self-contained block (title row, disk-square fill display,
                               Buy/auto-buy/Upgrade-Capacity action row), taking `{ actions, state, bare,
                               tierIndex }` — embedded per-pool (`bare`, `tierIndex={poolIndex}`) inside
                               each `ByteFoundryPage` pool card. Full contract (incl. the
                               omitted-`tierIndex` every-lake fallback mode, still unused by any current
                               caller): `docs/COMPONENTS_REFERENCE.md`. See "Economy model" for the
                               mechanic.
    Money/index.js          ← styled money/amount display, `theme.color.text` + tabular-nums.
                               Full contract: `docs/COMPONENTS_REFERENCE.md`
    ConfirmDialog/index.jsx ← in-game confirm overlay (StatCard + Cancel/Confirm); used by
                               SettingsPage's Era ascension action. Full
                               contract: `docs/COMPONENTS_REFERENCE.md`
    OfflineProgressNotice/index.jsx ← the "Welcome back!" offline-progress notice (`.jsx` — needs
                               JSX), shared by both MainPage and ByteFoundryPage — see
                               `docs/DESIGN_HISTORY.md` for the extraction rationale. Full contract:
                               `docs/COMPONENTS_REFERENCE.md`
    IncompatibleSaveNotice/index.jsx ← blocking overlay when an on-disk save was cleared on load
                               because it predates the current schema; single **Start fresh**
                               acknowledge action. Rendered by `App.jsx` when
                               `useIncrementalGame`'s `incompatibleSaveReason` is set.
    StatCard/index.js       ← styled card container used for every panel, fully token-driven.
                               Full contract: `docs/COMPONENTS_REFERENCE.md`
  pages/
    ByteFoundryPage/index.jsx ← the "Byte Foundry" tap screen (see "Architecture" 4 and "Economy
                               model"). Takes `{ game, focusNonce }` — navigation lives in App.jsx's
                               AppNav. Data Stream + every DiskArrayRow as continuous sections (no
                               second-level tabs); a single "Upgrade Data Stream" action sits in the
                               Data Stream section; pool Memory values derive from the shared Data
                               Stream's Capacity, which keeps doubling up to the FINAL pool's end bound
                               (`isMemoryCapacityAtCap`), not any one pool's — see "Pool liveness is
                               Capacity-only"
    StoragePage/index.jsx   ← thin reusable every-size DiskArrayRow list. Full detail: Architecture
                               item 4a below
    ComputePage/index.jsx   ← Foundry Boosters screen (merge chain + Boost). Full detail: Architecture
                               item 4b below
    ComputeFlopsPage/index.jsx ← PP Compute (Flops) screen; page id `'compute'`. Takes `{ game }`.
                               See Architecture 4c / Economy model below for the full mechanic.
    MainPage/index.jsx      ← the tier ladder (see "Architecture" below). Takes `{ game, focusNonce }`.
                               Second-level tabs: Factory | Upgrades (after first Prestige). Full
                               field-by-field reference: `docs/MAINPAGE_REFERENCE.md`
    InfoPage/index.jsx      ← the Guide page (see "Architecture" below), including Byte
                               Foundry/Storage/Compute sections. Reached via AppNav's Guide item;
                               takes no navigation props (AppNav is the exit)
    MilestonesPage/index.jsx ← Chapters / tier-autobuyer / tickspeed-autobuyer / Compute-autobuyer
                               status. Full detail: Architecture item 6 below.
    SettingsPage/index.jsx  ← Supporter pack, save slots, Prestige museum, Era ascension, Appearance,
                               Ops dashboard, Danger zone. Full detail: Architecture item 7 below.
    DevModePage/index.jsx   ← dev-only sandbox — isolated-save toggle, quick-seed presets, a Variables
                               tree auto-generated by walking live game.state (see stateFields.js), a
                               raw state-JSON editor. Reached via AppNav → More's Dev Mode entry
                               (rendered only when `import.meta.env.DEV`); see "Dev Mode". Takes `{ game }`
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
  App.jsx                   ← root component; owns the single `useIncrementalGame()` call (lifted up
                               from MainPage so ByteFoundryPage shares the save/tick loop) and wraps
                               <ThemeProvider><GlobalStyle/>, switching between <ByteFoundryPage/>/
                               <MainPage/>/<InfoPage/>/<ComputePage/>/<ComputeFlopsPage/>/
                               <MilestonesPage/>/<SettingsPage/>/<DevModePage/> via a local `page`
                               useState (`'game'`/`'info'`/`'foundry'`/`'boosters'`/`'compute'`/
                               `'milestones'`/`'settings'`/`'dev'`, default `'game'`) — not a routing
                               library (same convention as MainPage's Factory | Upgrades tabs) — plus a
                               shared fixed bottom `AppNav` (Foundry → Boosters → Compute → Factory →
                               Guide → More) and `AppMenu` (More sheet → Milestones / Settings / Dev
                               Mode in dev builds). Legacy `page === 'storage'` rewrites to `'foundry'`
                               (Disks live on Foundry). Which screen renders is a derived
                               `showingFoundry = !GATE_EXEMPT_PAGES.has(page) &&
                               (!intro.mainGameUnlocked || page === 'foundry')` check (`GATE_EXEMPT_PAGES`
                               = `'info'`/`'boosters'`/`'compute'`/`'milestones'`/`'settings'`/`'dev'`),
                               not `page` directly: ByteFoundryPage is both a *mandatory gate* (whenever
                               `intro.mainGameUnlocked` is false — see "Economy model") and, once
                               unlocked, a *permanent, revisitable screen* via AppNav's Foundry item
                               (`page = 'foundry'`). Gate-exempt pages stay reachable during the gate so
                               Guide / Boosters (once capacity reveals it) / Compute (once 100 PP) / More
                               are never yanked away. `intro.mainGameUnlocked` is PERMANENT (see
                               `latchMainGameUnlocked` in `engine.js`) — never reset by a real Prestige
                               or Era ascension — so `!intro.mainGameUnlocked` can only be true on a
                               save's very first cycle; afterward the gate check is a no-op. Since
                               `page` is independent of `intro.mainGameUnlocked`, no syncing effect is
                               needed: the gate resolving just reveals whatever `page` already was
                               (typically `'game'`)
  index.jsx                 ← ReactDOM.createRoot entry point; calls reportWebVitals() after render
  reportWebVitals.js         ← optional web-vitals (CLS/INP/FCP/LCP/TTFB) reporter; no-ops unless passed
                               a callback — currently called with none, so a no-op in practice
capacitor.config.json        ← Capacitor app id/name + `webDir: dist` (foundation for #70; no
                               android/ios platforms checked in yet)
vite.config.js               ← thin wrapper: `defineConfig(createViteConfig({ srcPath }))`
viteConfigFactory.js          ← the real Vite config — path aliases, dev/test server, and the VitePWA
                               plugin (skipped when `CAPACITOR=1`, along with the GitHub Pages `/tens/`
                               base). Extracted from `vite.config.js` so `capacitorConfig.test.js` can
                               pin the CAPACITOR=1 behavior (`import.meta.url` isn't a `file:` URL under
                               Vitest). Full PWA reference: `docs/PWA_REFERENCE.md`
playwright.config.js         ← Playwright end-to-end suite config (see "End-to-end testing" under
                               "Testing") — separate from vite.config.js's own `test` block, which only
                               configures Vitest
e2e/
  golden-path.e2e.js          ← buying Kilobytes via the real Buy button; Owned/money-balance updates
  autobuyer-reload.e2e.js     ← an already-unlocked tier autobuyer survives a real page reload
  prestige.e2e.js             ← prestiging from the first-time overlay resets resources, awards PP
  meta-prestige.e2e.js        ← Settings Era ascension from 1 Googol PP seed; era/Eons + Foundry gate
  data-lake.e2e.js            ← a seeded KB Data Lake renders its disk-square breakdown on Foundry, then a
                               manual Buy Booster click grants a Core (verified on the Boosters page)
scripts/
  bump-version.mjs (+ `.test.js`) ← `yarn bump-version`: cut CHANGELOG ## [Unreleased] into a
                               dated ## [x.y.z] section and bump package.json (minor if
                               Added/Removed entries, else patch; no-op if empty) — #52;
                               `release.yml` handles the post-merge tag + GitHub Release
  generate-pwa-icons.mjs     ← one-off script (`yarn gen-pwa-icons`) rasterizing an inline "byte grid"
                               SVG (see `docs/PWA_REFERENCE.md`) with `sharp` into public/pwa-*.png +
                               apple-touch-icon.png, and hand-assembling public/favicon.ico (minimal ICO
                               of PNG frames, no extra dependency); not part of the build — re-run only
                               if the icon design/palette changes
  adversarialReviewMarker.js (+ `.test.js`) ← pure helpers for the `<!-- adversarial-review sha=…
                               verdict=… -->` marker (see "Pull requests" above)
  pr-low-risk-eligible.sh (+ `.test.js`) ← shared low-risk-auto-merge eligibility bar, used by
                               `enable-auto-merge-if-eligible.sh` and `pr-auto-merge.yml`
  enable-auto-merge-if-eligible.sh ← marks a PR ready + enables GitHub auto-merge once it's
                               adversarial-APPROVEd and low-risk (see "Pull requests" above)
  resolve-pr-threads.sh      ← lists/resolves PR review threads by ID for automation-owned PRs
                               (`claude/*`/`devin/*`, repo-owner/bot-authored only); `list` is
                               read-only, `resolve` only accepts explicit caller-selected IDs, never a
                               bulk "resolve all" — used by `autonomous-maintenance.yml` and
                               `autonomous-pr-followup.yml` (see "Pull requests")
  backlog-issue-hygiene.sh, epic-407-issue-hygiene.sh ← idempotent GitHub issue-hygiene sweeps
                               (close shipped/stray issues, unblock/label ready work) run on every
                               `autonomous-maintenance.yml` invocation — see docs/AUTOMATION.md
  sync-release-milestones.sh ← idempotent GitHub Milestone create/assign for player-facing tracks
                               (see "GitHub Milestones" below)
public/
  pwa-192x192.png, pwa-512x512.png, pwa-maskable-512x512.png, apple-touch-icon.png
                               ← generated PWA icon assets (see `docs/PWA_REFERENCE.md`); the old
                               create-react-app-era `index.html`/`manifest.json`/`logo192.png`/
                               `logo512.png` files that used to live in this directory were removed
                               — see `docs/DESIGN_HISTORY.md` for why
  favicon.ico, robots.txt     ← unchanged, still served as-is from this directory
```

## Architecture

Strict three-layer separation:

1. **`engine.js`** — all game logic is pure functions of `(args) => state => newState`, with no React
   and no side effects. Every mutation returns a new state object; invalid actions (can't afford, tier
   locked) return the *same* state reference unchanged, which callers use as a no-op signal (see
   `tickGame`'s autobuyer loop, which breaks as soon as `buyTierQuantity` returns the same object
   back — `buyTier` itself is only invoked one level down, inside `buyTierQuantity`'s own loop).
2. **`useIncrementalGame.js`** — the only place holding React state. Called once, in `App.jsx` (lifted
   up from MainPage so `ByteFoundryPage` shares the save/tick loop). Owns the `setInterval` tick timer
   and the localStorage persistence effect, and exposes `{ state, actions, resetGame,
   resetByteFoundry, offlineProgress, dismissOfflineProgress, incompatibleSaveReason,
   dismissIncompatibleSaveNotice, savesMeta, saveSlots, switchSaveSlot, renameSaveSlot,
   redeemUnlockCode, purchaseSupporterDummy, opsSamples, clearSlot, eraseAllSaveProgress,
   devModeActive, toggleDevMode, setDevState, applyDevStateJson, resetDevState }` — the last five back
   Dev Mode (see "Dev Mode"); always present on the return value (not gated by `import.meta.env.DEV`)
   but consumed only by `DevModePage`, whose rendering *is* dev-build-gated, so unreachable from any
   shipped UI. Every purchase — manual Buy and autobuyer ticks alike — always batches up to the current
   level's cost-block boundary (see docs/ECONOMY_REFERENCE.md), via a `BUY_QUANTITY` constant
   (`Number.MAX_SAFE_INTEGER` — a "buy as many as fit" sentinel, not a literal batch size, since the
   cap is applied dynamically in the engine against the current, possibly-grown block size;
   deliberately not `Infinity`, which `clampNonNegative` treats as invalid and silently clamps to 0 —
   see `docs/DESIGN_HISTORY.md` for the incident) passed into `tickGame` as `autobuyerBatchSize` and
   into `actions.buyTierQuantity` (this replaced a removed player-facing ×1/×10 "Bulk" toggle — no
   persisted preference). On mount, a one-time `computeInitialGame` helper calls
   `discardIncompatibleActiveSaveIfNeeded()` (clears the active slot when its payload fails
   `getSaveIncompatibilityReason`), loads any saved state, and folds in offline progress
   (`applyOfflineProgress`) before first render whenever elapsed real time (`loadLastSaveTimestamp()`
   vs. now) warrants it, surfacing an `offlineProgress` summary (dismissed via
   `dismissOfflineProgress`/`resetGame`) for the "Welcome back!" notice only past
   `OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS` (10 minutes). Since mount only covers time the app
   was fully torn down (a backgrounded/suspended tab or PWA never remounts), the live tick loop also
   tracks its own last firing's wall-clock time and replays any gap past
   `BACKGROUND_TICK_GAP_THRESHOLD_SECONDS` (2s) through the same `applyOfflineProgress` path — so
   `offlineProgress` is **not** a mount-time-only, one-shot value. Full detection/threshold detail:
   `docs/ECONOMY_REFERENCE.md`'s "Offline progress" section.
3. **`MainPage/index.jsx`** — a pure renderer driven by `TIER_DEFINITIONS` and the hook's `state`
   (a `game` prop from `App.jsx`, not its own `useIncrementalGame()` call). Renders each unlocked tier
   as one compact grid row. Purely game — live controls, numbers, status text; top-level destinations
   live in `App.jsx`'s shared `AppNav` (Byte Factory is this page), so MainPage carries no page-to-page
   open-* links. Full layout: `docs/MAINPAGE_REFERENCE.md`.
4. **`ByteFoundryPage/index.jsx`** — the tap screen (see "Economy model"), a pure renderer taking
   `{ game, focusNonce }`. How a save's first Prestige cycle earns its first Kilobytes — see
   `docs/DESIGN_HISTORY.md`'s "Why Bytes was pulled out of the tier ladder in favor of the Byte Foundry
   intro" for why this replaced the old self-producing Bytes tier. A mandatory gate whenever
   `intro.mainGameUnlocked` is false (AppNav omits Factory during the gate; Guide and More stay),
   permanently latched true the instant Storage's capacity threshold is crossed
   (`latchMainGameUnlocked`/`isStorageUnlocked` in `engine.js`) — the SAME "1 KiB" threshold that
   reveals pool 1's card and switches the tap into fill-multiplier-bonus mode. The latch is one-time-ever
   and never resets (not on a real Prestige, not on an Era ascension) — see `App.jsx`'s repo-layout
   entry for what that means once latched. Once `intro.mainGameUnlocked`, the standalone Tap button is
   removed and the Data Stream tile itself becomes the tap target (`as="button"` on the same
   `FillableStatCard`, calling `actions.tapIntroBit`) — see "Fill-based Speed/Bandwidth multiplier" for
   what a tap does pre/post Storage reveal. Compute lives on its own screen (4b), reached via AppNav;
   Storage's every-size detail (4a) is continuous sections on this Foundry screen (and the reusable
   `StoragePage` wrapper), not a separate AppNav item or tab. Data Stream owns the shared
   Combine/Speed/Capacity actions and the common Provision Disk control; Storage pools 1–10 are derived
   views over the one Data Stream, each with its own Bandwidth (`getStoragePoolBandwidth`, hard-capped at
   the square root of that pool's Capacity converted to Bytes) and local buffer
   (`intro.poolBuffers[poolIndex]`, `getPoolBufferBits`/`getPoolBufferCapacity`) that every bit-costing
   Storage action for that pool — Provision Disk's build cost, the read-cache fill — spends from
   exclusively (`tickPoolBufferFill` tops it up from `intro.bits`, pool 1 first, after tier01's
   bootstrap conversion and Queued Capacity each tick; `getPoolBufferCapacity` equals the pool's
   Capacity, so a full buffer can always fund one `provisionDisk` pass of even that pool's largest
   disk). One `PoolCard` renders per VISIBLE pool (`getVisibleStoragePoolCount` — PURE Capacity-based:
   `intro.capacity` reaching a pool's `getPoolCapacityUnlockThresholdBits`, pool 1 always counted, NO
   disk-build dependency — deliberately independent of `isStoragePoolUnlocked`/
   `getUnlockedStoragePoolCount`, which stay disk-build-only and drive the disk ladder's progression);
   see "Pool liveness is Capacity-only" and `docs/DESIGN_HISTORY.md`'s "Pool cards gated on a capacity
   threshold too" entry for why folding the two into one primitive was tried and reverted. Only the
   largest card is expanded by default. `components/DataLakePanel` (`bare`, `tierIndex={poolIndex}`) is
   embedded per pool below that pool's `components/DiskArrayRow`s (cache above disks) in the same
   disclosure — see `docs/DESIGN_HISTORY.md`'s "Pool titles simplified to `<symbol>` Pool; each pool's
   Data Lake moved inside its own card" entry. Disk Fill is fully automatic every tick (`DiskArrayRow`
   is a pure status display, not a click target). Provision Disk is a single shared control (one disk
   ladder spans every pool) rendered inside the ONE `PoolCard` the ladder's current offer
   (`getDiskSize`) belongs to (`getPoolIndexForDiskSize`), plus a fallback copy (`provisionDiskButton`)
   after the Data Stream card for when that card isn't visible yet — see `docs/DESIGN_HISTORY.md`'s
   "Provision Disk moved back inside its pool card" entry. Each disk array shows every size from
   `getDiskSizesToShow`, all `DISK_ARRAY_LADDER_CAP` (9) slots in one row. The "queue next build"
   pin-icon toggle was removed from the UI, but the auto-arming queue it drove stays wired and live (see
   "Disks"; `docs/MAINPAGE_REFERENCE.md`'s Provision Disk button section for the progress fill);
   `queueDiskBuild`/`clearDiskBuildQueue` remain implemented/tested but unexposed (unlike Capacity's
   `queueIntroCapacityUpgrade`, which the Upgrade Data Stream button drives). Every action here or on
   either dedicated screen is gated by the forced priority order (see "Economy model") — Data Lake
   Booster purchases, its capacity Upgrade, and Upgrade Data Stream are the three exceptions, each
   arbitrated on its own eligibility. Full UI layout: `docs/MAINPAGE_REFERENCE.md`; mechanic/formula
   detail (Bandwidth cap, buffer capacity, fill multiplier, disk ladder/build-pass): 
   `docs/ECONOMY_REFERENCE.md`; component contracts (`DiskArrayRow`, `DataLakePanel`):
   `docs/COMPONENTS_REFERENCE.md`.
4a. **`StoragePage/index.jsx`** — thin reusable every-size DiskArrayRow list (ascending, via
   `getDiskSizesToShow`) — NOT the Provision Disk button, which stays on ByteFoundryPage. Takes
   `{ game }`. Primary UI path is Foundry's continuous sections; this file remains for reuse/tests. A
   pure renderer ("engine re-validates, UI just mirrors it", like every page here).
4b. **`ComputePage/index.jsx`** — Foundry **Boosters** screen (page id `'boosters'`), taking `{ game }`.
   Reached via AppNav once `isComputeCoreConversionUnlocked`. Also where the nine-boundary merge chain
   (Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter → Supercomputer →
   Megacomputer — see "Economy model" and issues #280/#316/#321) lives, behind its own later, one-time
   `intro.computeMergePageUnlocked` reveal. "Compute" names the page/feature only — entities drop the
   word (`Core`/`Node`/…) in every player-visible label. Deliberately terse — icon-only controls, full
   sentence in `title`/`aria-label`; mechanic prose lives in the Guide (`InfoPage`). Render order (issue
   #326): an active Boost's status at the top, then the Boost EFFECTS section (`ArmedStatusText`, the 3
   Burst/Standard/Sustain presets, and — while a boost is active — a Stack + Reclaim-or-Forfeit row,
   mutually exclusive by `computeBoostStacks`; `canReclaimComputeBoost`/`canForfeitComputeBoost` enforce
   this in the engine too), THEN each of the nine merge-boundary tiers' two rows (issues
   #321/#326/#363): row 1 is the `COMPUTE_ENTITY_CAP` (10) normal-slot squares (never above 10/10, even
   once auto-merge is unlocked and the entity has grown into its reserve) plus a `TierSelectButton` that
   arms the Boost presets at that tier's scaled power; row 2 is, before auto-merge unlocks, Merge
   (`COMPUTE_MERGE_RATIO`, 8) + Unlock Auto-merge `TierActionButton`s (the latter with a live progress
   fill toward its `COMPUTE_ENTITY_CAP`-unit cost), or, once unlocked, the `COMPUTE_MERGE_RESERVE_CAP`
   (8) reserve-slot squares (gradually filled, `getComputeReserveHeld`) as the manual-start trigger —
   Megacomputer has no row 2. Cores come from buying Boosters from the matching Data Lake on Foundry's
   `DataLakePanel`, not minted from Memory. Full button/gate/aria-label detail:
   `docs/MAINPAGE_REFERENCE.md`; render-order and Stack/Reclaim/Forfeit rationale:
   `docs/DESIGN_HISTORY.md`.
4c. **`ComputeFlopsPage/index.jsx`** — PP **Compute (Flops)** screen (page id `'compute'`), taking
   `{ game }`. Reached via AppNav once `isComputeFlopsPageRevealed` (spendable PP ≥ 100, latched in
   `computeFlops.pageUnlocked`). Ten tiers KFlops→QFlops (`COMPUTE_FLOPS_TIER_DEFINITIONS`), PP-funded
   on the same 10³ base ladder as Factory tiers, priced per-unit via `getCostEpochExponent` (not
   Factory's 8-buy blocks). Owned counts permanent across Prestige; per-cycle boost resets on
   Prestige. Pure renderer — full tier/cost/production/persistence spec:
   `docs/ECONOMY_REFERENCE.md`'s "PP Compute (Flops)" section.
5. **`InfoPage/index.jsx`** — a static Guide page holding every mechanic's evergreen explanation in
   short bullets/sub-headings (what used to be MainPage's click-to-expand `InfoDetails` disclosures —
   Overview, Byte Foundry, Storage, Boosters, Compute (Flops), Latency, Scale Up, Overclock, Tier
   Autobuyers, Milestones, Prestige, Era ascension). Numbers come from the same `engine.js`/`layers.js`
   constants the game uses, so they can't drift. Reads no `useIncrementalGame` state — only pure
   constants/formulas. Header shows the app version (`v{version}` from `package.json` via build-time
   import) — the **only** in-app version surface. Reached via AppNav's Guide item.
6. **`MilestonesPage/index.jsx`** — Chapters / tier-autobuyer / tickspeed-autobuyer /
   Compute-autobuyer / Era ascension status screen. Chapters: the first KiloByte, Go Googol, Open
   Compute, Go Unbounded, Ascend an Era. Reached via AppNav → More (`page = 'milestones'`); always
   reachable, including during the Foundry gate. Takes `{ game }`. Pure renderer.
7. **`SettingsPage/index.jsx`** — always-reachable utilities via AppNav → More (`page = 'settings'`):
    Supporter pack (unlock code / dummy checkout), multi-slot saves, Prestige museum, Era ascension
    (Eras/Eons display + confirm-guarded `actions.eraAscend()`), Appearance (theme preference), Ops
    dashboard, and Danger zone — Reset (full save wipe) and **Reset Byte Foundry** (Capacity /
    Storage / Compute + upgrades wipe to scratch; Combine / Upgrade Data Stream / Provision Disk
    convenience-auto up to prior highs; Factory + Prestige kept). Takes `{ game, onReset,
    onResetByteFoundry, themePreference = 'system', onThemePreferenceChange }` (`onReset`/
    `onResetByteFoundry` are the confirm-guarded callbacks owned by `App.jsx`). Pure renderer
    aside from local form state.
8. **`DevModePage/index.jsx`** — dev-build-only sandbox, see "Dev Mode" below for the full
   mechanism. Reached via AppNav → More (`page = 'dev'`), gate-exempt like Settings/Milestones.
   Takes `{ game }`.

## Dev Mode

A local testing sandbox for seeding/experimenting with game state — **not** a player-facing feature:
its entry point (`AppMenu`'s "Dev Mode" button) and page route both render only when
`import.meta.env.DEV` is true, so `yarn build`'s production bundle contains neither (verified by
grepping `dist/assets/*.js` for page-specific strings — see this feature's own PR). `yarn dev`/`yarn
test` (Vitest defaults `import.meta.env.DEV` to true) both expose it.

Enabling Dev Mode (`game.toggleDevMode()`) does **not** touch any real player save. `game/storage.js`
resolves every save read/write through `getActiveSlotId()`, which — while `isDevModeActive()` is true —
returns a dedicated `'dev'` slot id (its own storage keys, `tens_dev_state`/`tens_dev_timestamp`,
distinct from any of the `FREE_SLOT_COUNT`/`SUPPORTER_SLOT_COUNT` player slots and never counted or
listed by `listSaveSlots`), so every existing save/load helper (`loadGameState`, `saveGameState`,
`clearGameState`, …) is transparently redirected. Toggling off resumes the real save where it was left;
toggling on for the first time starts from a fresh `createInitialGameState()`.
`isDevModeActive`/`setDevModeActive` persist the flag itself (`tens_dev_mode_active`) separately from
`tens_saves_meta`, so flipping it never touches player slot bookkeeping.

`DevModePage` offers three ways to seed/experiment, all going through `useIncrementalGame`'s
`setDevState`/`applyDevStateJson` (both no-op outside Dev Mode as a defense-in-depth guard, though the UI
only renders them while active):
- **Quick seed** — one-click presets (`PRESETS` in `DevModePage`) applying a small delta onto the live
  state via `game.setDevState(updater)`, e.g. unlocking the Byte Factory gate or setting Bits to the
  Prestige threshold. They reference the same `layers.js` constants
  (`PRESTIGE_THRESHOLD`/`ERA_ELIGIBILITY_PP`/etc.) the real game gates on, so they can't drift.
- **Variables** — not a hand-maintained field list: `DevModePage`'s `FieldNode` recursively walks
  `game.state` and renders one row per scalar leaf (number/string get a text input + Set; booleans
  toggle on click), nested under a collapsible `<details>` per object ancestor (so
  `intro.dataLakes.1.purchased` renders under `intro` → `dataLakes` → `1`, mirroring the state shape).
  `stateFields.js`'s `prettifySegment` relabels a key that is a known tier id (e.g. `owned.tier01`)
  with that tier's display name via a `TIER_DEFINITIONS`/`COMPUTE_FLOPS_TIER_DEFINITIONS` lookup — the
  only place this page references tier data, purely cosmetic. A new state key shows up automatically
  with zero changes here — the "always in sync with the game code" property this section exists for.
  `null`/`undefined` leaves (structural "not yet built" sentinels, e.g. `intro.diskBuild`) and arrays
  (e.g. `prestigeMuseum.history`) are skipped; only the raw JSON editor can touch them.
  `setValueAtPath` sets one leaf immutably by its full path array, at any depth, without disturbing
  siblings.
- **Raw state JSON** — a textarea pre-filled with `JSON.stringify(game.state, null, 2)`; Apply calls
  `game.applyDevStateJson(text)` → `storage.js`'s `applyDevGameStateJson(jsonText, currentState)`.
  A caller only specifies the fields they're changing (e.g. `{ "resources": { "base": 1e50 } }`) —
  `mergeStateForDevWrite` one-level-deep merges the parsed object onto `currentState` before writing,
  so untouched top-level fields (and untouched siblings inside an edited object, e.g.
  `resources.bytes`) survive. The merge is required, not cosmetic: a bare `{ "resources": {...} }`
  would omit `intro`, which `save-migration/detectLegacy.js`'s `getSaveIncompatibilityReason` treats as
  a legacy save (`'missing_intro'`) and rejects. The merged payload is then re-read through the same
  `adaptSaveForCurrentSchema` + `mergeState` pipeline a real load uses, filling any remaining gap from
  `createInitialGameState()`.

`resetDevState` (Settings-style confirm in the UI) wipes the dev save back to fresh via
`clearDevGameState` (bypasses `clearSaveSlot`'s numbered-slot validation — `'dev'` is never one of
the numbered player slots it checks against).

**Real-slot isolation is enforced at the storage layer, not just by hiding UI.** `setActiveSaveSlot`,
`clearSaveSlot`, `clearAllSaveProgress` (all in `storage.js`, reachable from `SettingsPage`) target an
explicit numbered slot or iterate every real slot, bypassing `getActiveSlotId`'s dev-mode redirect
(which only helps `loadGameState`/`saveGameState`/`clearGameState`). All three now refuse to run
(`{ ok: false, reason: 'dev_mode_active' }`) whenever `isDevModeActive()` is true, so Settings'
"Play"/"Clear"/"Erase all save progress" can never destroy or repoint a real save while Dev Mode shows
the dev save — a real bug this feature's adversarial review caught before merge.
`useIncrementalGame`'s `eraseAllSaveProgress`/`clearSlot`/`switchSaveSlot` check that `ok` flag before
touching React state. `SettingsPage` additionally disables those buttons
(`title="Disable Dev Mode first"`) while `game.devModeActive`, written as
`import.meta.env.DEV && Boolean(game.devModeActive)` so Terser/Rollup fold the branch (and its "Dev
Mode" copy) out of a production build — `SettingsPage` isn't itself dev-gated. `clearGameState` (used
by `resetGame`) routes to `clearDevGameState` instead of the now-guarded
`clearSaveSlot(getActiveSlotId())` while Dev Mode is active, so "Reset active save" still wipes the dev
save rather than no-op-ing against a refused call.

## Economy model

### Pool-local resets

Each Storage pool has an independent end-of-progression reset, offered only at 9/9/9 disks, with a
completely full Data Lake, when the next Booster costs more than that lake can hold. It empties only
that pool's disks, buffer, and lake; Booster state and prior reset rewards remain. Each reset
permanently adds 1,000 units of lake-only capacity. The first reset fixes lake overflow speed at 50%;
the second and later resets also advance the pool through the existing bandwidth steps, with
non-final reward growth limited dynamically by half the following pool's bandwidth.

After reset the pool provisions its disks automatically and for free, one at a time in normal
smallest-first order, waiting for the current disk to fill before provisioning the next. While the
pool is rebuilding, later pools cannot start new provisioning (already-active work may finish).
Whenever all 9/9/9 disks are provisioned (including before the first reset), the lake's Booster
control becomes a non-clickable cost label and the lake automatically buys every affordable Booster
until slots fill or the next cost exceeds capacity; filling the lake at that wall enables the next
reset. Pools never transfer or share resources through this loop.

There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Kilobytes` through `Quettabytes`. Every tier is bought directly with the base currency
(`MONEY_ID = 'base'`, display name "Bits") and, once owned, produces the tier immediately below it,
cascading down the ladder; `tier01` (Kilobytes) is the special case where cost is still Bits but
production credits the separate Factory Bytes pool (`BYTES_ID = 'bytes'`, displayed as whole `B`) and
mirrors the same amount × `BITS_PER_BYTE` into Bits so MoneyHero / Prestige / tier Buys keep moving
(see `docs/DESIGN_HISTORY.md` for the #430 incident this mirror fixed). **Latency** (the global
tickspeed multiplier on MainPage, formerly "Tickspeed"/"Clock Speed") is funded from that Bytes pool —
initial activation costs **10 Bytes** — not Bits. It unlocks once level 1 of tier01 is purchased; there
are no milestone bonus levels — every level compounds the same Overclock-scaled 1% step.
Reaching Money ≥ `PRESTIGE_THRESHOLD` (`GOOGOL * BITS_PER_BYTE` = 8e100 — "1 Googol Bytes," in Bits
since a Byte is 8 Bits) freezes the economy except for Prestige — unless `isUnboundedPrestigeUnlocked(state)`
is true (permanent `prestige.unboundedUnlocked` latch set the first time `prestige.count` reaches
`PRESTIGE_UNBOUNDED_MIN_COUNT` (100), or carried through Era ascension), in which case production
continues and Prestige is optional (see `isProductionFrozen`). **Era ascension** (`eraGame`) is a
separate voluntary meta-prestige at **1 Googol unspent PP** (`ERA_ELIGIBILITY_PP`): it awards **Eons**
(+1 base, +1 per Eon Amplifier level — shop deferred to #414), increments `era.count`, resets the full
Foundry (generator upgrades, Disks, Data Lakes, compute ladder entities, Memory/gate) plus the ordinary
Factory cycle (`prestige.points`/`count`/`prestigeDoublePpLevel` → 0, `computeFlops.owned` → 0,
`cumulativeBoost` fresh), while keeping automation unlocks/pause flags (except Double PP level),
tier/tickspeed autobuyer milestone objects, `prestige.unboundedUnlocked`, museum, hyperscalers, Eon
upgrade levels, Flops autobuyer unlock flags, and page latches. Era *N* free-unlocks the *N*th Flops
tier's autobuyer (KFlops at Era 1, …). Hyperscalers (bought with Eons in #414) add permanent +0.01%/s
each to every Factory tier's Flops multiplier via `getHyperscalerFlopsBoostRate` — the engine/hook
action (`buyHyperscaler`) is wired, but no page renders a purchase control yet, so it isn't
player-reachable (deferred to #414, blocked pending maintainer-approved spend design). Prestige Points
are awarded by `getPrestigePointsAwarded`: 1 base PP at 1 Googol Bytes, then 1 PP per
`PRESTIGE_POWERS_PER_PP_BASE` (64) additional money-exponent powers beyond Googol's own 10^100
exponent, scaled by permanent Double PP upgrades (`prestigeDoublePpLevel` — each halves powers-per-PP
until 1, then doubles PP-per-power; cost `100^(level+1)` PP). `GOOGOL` (1e100) is still exported and
used by the exponent-based formulas (`getMoneyExponent`/`getPrestigeProgressPercent`) — only the live
freeze/Prestige trigger moved to `PRESTIGE_THRESHOLD`; see `docs/DESIGN_HISTORY.md` for why.
MainPage's headline balance (`MoneyHero`) switches from Bits to whole Bytes once the balance reaches
8000 Bits (`formatMoneyBalance`, `MONEY_BYTES_DISPLAY_THRESHOLD`) — every other `formatCurrency` call
(costs, production, the Prestige-threshold overlay) keeps reading in Bits.

Bytes are no longer a purchasable tier — they're produced entirely by the **Byte Foundry**
(`ByteFoundryPage`, see "Architecture"), a tap-to-earn screen every fresh save must pass through once
before the main game (`tier01`/Kilobytes onward) is reachable — a ONE-TIME-EVER gate (see
`latchMainGameUnlocked`/`intro.mainGameUnlocked`): once Storage's capacity threshold is reached, the
gate is permanently gone, across every future real Prestige and Era ascension. Tapping accumulates
bits into the **Data Stream** (a Buffer-capped balance) that combines into a permanent, passively
producing Byte generator. Combine creates the generator without snapping Capacity; save load via
`normalizePoolMemoryCapacity` preserves current Capacity and only clamps when necessary. Era ascension
keeps the generator (`byteCreated`) and the `mainGameUnlocked` latch but resets Capacity to
`INTRO_STARTING_CAPACITY` with the rest of the Foundry (`buildEraIntroReset`) — Capacity is rebuilt
each Era, Factory access never goes away again once earned.
Production and storage grow via a single **Upgrade Data Stream** action: it requires a full Buffer,
drains it (cost = current capacity), and doubles `intro.capacity` — Capacity is the only purchased
progression variable. The button is clickable at any fill (`isMemoryCapacityUpgradeArmable`): a click
below 100% arms it (`intro.capacityUpgradeQueued`) and pauses every Data Stream outflow
(`isDataStreamOutflowPaused` — `tickPoolBufferFill`/Data Lake overflow, `tickIntroAutoInvest`) until
`tickQueuedCapacityUpgrade` fires it, so continuous pool/lake draw can't hold the Buffer below full
indefinitely. The arm survives load and Prestige. While armed the button is hidden, the Data Stream
tile shows the upgrade status, and a "Cancel upgrade" control disarms it
(`clearIntroCapacityUpgradeQueue`). Displayed Speed is purely *derived* from Capacity
(`getDataStreamSpeedBytesPerSecond`): at even powers of 2 it's `sqrt(capacityBytes)` B/s, at odd powers
the arithmetic mean of the neighbouring even-exponent speeds — alternating ×1.5 and ×4/3 growth,
exactly ×2 per two upgrades. Later, Disks (`StoragePage`) and Compute Cores/Nodes/Compute Boost
(`ComputePage`, nav **Boosters**) unlock; a separate **PP Compute (Flops)** screen (`ComputeFlopsPage`,
nav **Compute**) unlocks at 100 PP — see Architecture 4c. Recurring "upgrade" actions are ranked in a
fixed **forced priority order** — Disk Fill > Provision Disk > Compute Boost — so a lower-ranked action
is disabled (in the UI and in the engine reducer) whenever a higher one is available. **Upgrade Data
Stream itself sits OUTSIDE this order** (`isMemoryCapacityUpgradeAvailable`) — its growth never waits on
Storage or Compute; a deliberate reversal of an earlier version that ranked it lowest — see
`docs/DESIGN_HISTORY.md`. An always-on auto-convert (`convertIntroBitsToKilobytes`/
`tickIntroAutoInvest`) turns Data Stream bits into free `tier01` units at tier01's current per-unit
cost every tick, with no manual trigger and no per-cycle cap; neither function touches
`mainGameUnlocked` (see `latchMainGameUnlocked`). `ByteFoundryPage` no longer renders a manual
transfer-block row (removed — see `docs/DESIGN_HISTORY.md`): once Storage Pool cards appear, Disk pulls
(below) are the automatic path to tier units; before that (a save's first, still-gated cycle),
auto-convert alone carries the player through the gate. `convertIntroBitsToKilobytes` is unchanged and
still exported/tested — only its one UI caller was removed.
The generator, Disks, Data Lakes (`depositedUnits`/`fillBits` / purchased Boosters / `autoConvertActive`
/ `capacityLevel`), and every compute-ladder entity — Core, Node, Cluster, Network, Grid, Fabric,
Cloud, Datacenter, Supercomputer, Megacomputer (every tier past Node mergeable manually, 8:1 per tier,
once unlocked — "Compute" names the page/feature only, not any entity) — are all permanent across every
real Prestige, as is the main-game-unlock gate once latched; only Data Stream balance and tier01's
purchase-block progress reset each cycle. Nothing here ever fully freezes — every action stays live
indefinitely, every cycle.

**Fill-based Speed/Bandwidth multiplier** (`FILL_MULTIPLIER_*` in `layers.js`; `getFillMultiplierPercent`/
`getDataStreamEffectMultiplier`/`getPoolEffectMultiplier`/`tickFillMultiplierDecay`/`tapPoolBuffer` in
`engine.js`) — the displayed Speed/Bandwidth never change; a separate fill-dependent multiplier (150%
empty → 100% at 50% full → 50% at full buffer) scales only the real per-tick amount delivered into the
buffer, boosted temporarily by tapping (+5%, decaying 1%/sec, hard-capped at 200% total).
`ByteFoundryPage` shows it via a `MultiplierBar` (grows/shrinks from the middle; blue normal bar, yellow
tap-bonus bar, `NN% 👆` suffix; renders nothing when its reading is exactly 0). For a pool, once its
buffer is full AND its Data Lake can receive AUTOMATIC overflow (`isDataLakePoolReady` AND
`isStoragePoolFullyBuilt`), or whenever `isDataLakePoolDrainAvailable`, the bar switches `mode="lake"`
to show the lake's overflow RATE (the tile's tap is disabled; `DataLakePanel`'s `LakePoolTile` tracks
the lake's fill LEVEL instead). Title row (Speed/Bandwidth top-right, no disk counts, centered `balance /
capacity-unit` line), tap-bonus headroom clamping, lake-mode handoff: `docs/ECONOMY_REFERENCE.md`,
`docs/MAINPAGE_REFERENCE.md`.

**Data Stream Buffer / pool Memory Capacity** — **standing rule: non-binary (SI-clean or decade-power)
transforms are for storage-pool-scoped values only; `intro.capacity` itself keeps doubling plainly in
binary** (IEC `KiB`/`MiB`/…, step 1024), since it's also the Data Stream tile's own balance figure —
two earlier attempts shared one raw value between both displays and got this wrong (see
`docs/DESIGN_HISTORY.md`). Each pool derives its OWN Capacity (`getStoragePoolCapacity`) from the same
doubling count via a DECADE-POWER-OF-10 ladder (1 KB, 10 KB, 100 KB, …, `getDecadePowerEquivalentBits`)
that holds flat within a decade and clamps to that pool's own bound; each decade step is sized to
exactly fund that step's own disk-build cost. Bandwidth follows a finer SI-clean switchover sequence
(`getSiCleanEquivalentBits` — 125 instead of 128 past 64 B/s, repeating every decade). The Data Lake
capacity ladder uses the same decade-power shape independently. `INTRO_COMPUTE_CORE_UNLOCK_CAPACITY`
sits at half of pool 1's end bound. Full formulas and constants: `docs/ECONOMY_REFERENCE.md`. Timed
compute merges (`getComputeMergeDurationSeconds`) take 8 fills of the input tier's own pool's smallest
disk at that pool's Bandwidth; there is no merge-duration upgrade.

**Pool liveness is Capacity-only, independent of disk-build progress.** A pool becomes live — visible,
with an active buffer/Bandwidth and usable read cache — the instant `intro.capacity` reaches its
`getPoolCapacityUnlockThresholdBits` (1024^N Bytes), via `getVisibleStoragePoolCount`, regardless of
earlier pools' build state. This is entirely separate from `isStoragePoolUnlocked`/
`getUnlockedStoragePoolCount` (disk-build-only — pool 1 always reachable, pool N+1 only once pool N's
three ladder sizes are ALL fully built), which still drives the disk ladder's progression (which size
Provision Disk offers): "to provision a disk, all possible disks of all smaller sizes must already be
provisioned — the disk prerequisites are pool to pool; the pool prerequisite is just the Data Stream
Capacity threshold." Folding the two into one shared primitive was tried once already and reverted
(a much wider blast radius than intended); see `docs/DESIGN_HISTORY.md`.

**Disks** (`intro.disks`/`disksBuiltTotal`/`diskCache`/`diskWriteCache`/`diskBuild`/
`diskProvisionPasses`/`diskBuildQueued`,
`getDiskSize`/`getDiskCost`/`getDiskProvisionPassesCollected`/`provisionDisk`/`tickDiskAutoFill`/
`isDiskPullEligible`/`tickDiskPull`/`tickDiskLevelOneCachePull` in `engine.js`) are a real storage
medium, not tier01-only: a size's ladder (1 KB → 10 KB → 100 KB, …, `DISK_LADDER_SIZE_MULTIPLIER`)
advances every `DISK_ARRAY_LADDER_CAP` (9 — the array's always-full cache substitutes for a 10th disk)
disks built at that size, up to the highest size any unlocked pool can fund. `provisionDisk` collects
the cost in `getDiskProvisionPassesCollected`/`getDiskProvisionPassesRequired` passes of the disk's own
face-value size — N for the array's Nth disk (1 for the first, up to 9; `DISK_BUILD_COST_MULTIPLIER`'s
10 is no longer reached) — so a pool's buffer only ever needs to hold one pass at a time, and completes the instant the
final pass lands, with no separate build-time delay (gathering passes already takes that real time;
see `docs/DESIGN_HISTORY.md`). `diskBuild`/`tickProvisionDisk` and every "IO blocked mid-build" guard
remain solely to finish a countdown an older save may still carry — a build `provisionDisk` starts
never creates one. A manual click that doesn't finish the build in one call auto-arms the **queue**
(`diskBuildQueued`/`queueDiskBuild`/`tickQueuedDiskBuild`, unconditionally wired into `tickGame`) so
every remaining pass fires as the buffer refills; only starting a NEW disk's build needs a click.
`queueDiskBuild` also arms the queue directly from that click when the first pass isn't affordable yet
(or a higher-priority action outranks it) — the button's `disabled` prop requires only that no build is
in flight and the ladder isn't exhausted; see `docs/DESIGN_HISTORY.md` for the gap this closed. The
smallest size per pool has an always-full **read cache** (8 blocks) that always gets first claim on
that pool's buffer over Provision Disk funding (`getPoolCacheReservationBits`, used by both
`isProvisionDiskAvailable` and `provisionDisk`), so it keeps filling while a build is queued — see
`docs/DESIGN_HISTORY.md`; every larger size fills via **write cache** — both feed disks at their own
bandwidth-multiplier rates. Byte Foundry funds Byte Factory **pull-based**: it has no proactive
knowledge of tier state — every tick, `tickDiskPull` pulls one FULL, clean-slate (zero
purchase-level progress) disk into its fixed (tier, level) correspondence (`getDataLakeTierIndex`
grouping) whenever that tier sits at exactly the disk's required level, completing the tier's whole
current purchase block in one shot; `tickDiskLevelOneCachePull` then covers every tier still at its
own level 1 with no fresh disk pull this tick, spending its pool's smallest-size read cache directly
(bulk units, capped at the level's remaining requirement) — never past level 1, never atop a level
with existing progress. Both are fully automatic, every tick, with no player click and no
autobuyer-unlock gate; the manual Redeem button and the old cache-release-to-Bits control are gone
(see `docs/DESIGN_HISTORY.md`). Disks, caches, and build state are all PERMANENT across every real
Prestige. Full cost/timing formulas and the pull-eligibility rule: `docs/ECONOMY_REFERENCE.md`.

**Data Lakes** (`intro.dataLakes`, `DATA_LAKE_*` in `layers.js`, `fillDataLakeDisks`/`buyBooster`/
`tickDataLakeAutoConvert` in `engine.js`) — ten permanent lakes (KB…QB), decoupled from Disk builds. A
lake is gated on its pool having built at least one real disk (`isDataLakePoolReady`); before that,
`DataLakePanel`'s fill tile reads a static "Locked". Its **Booster-conversion control fills MANUALLY,
capped at just enough for its next Booster, until its matching pool is entirely COMPLETE
(`isStoragePoolFullyBuilt` — all three ladder sizes fully built); only then does full-buffer OVERFLOW
also fill it AUTOMATICALLY** from that pool's buffer (`tickPoolBufferFill`'s overflow branch, also
gated on `isStoragePoolFullyBuilt`). Separately, the lake draws directly from its pool's buffer at the
pool's Bandwidth (`tickDataLakePoolDrain`, right after `tickPoolBufferFill`) under a fixed pool-buffer
priority: disk filling > provisioning in progress > lake filling — only while every BUILT disk is full
and no build is in progress in that pool, the lake has room, and the buffer holds more than the read
cache's reservation (`isDataLakePoolDrainAvailable`; while it applies, full-buffer overflow yields to
it so a tick isn't credited twice; unprovisioned slots don't block it, even before the pool is
complete). It's independent of the Data Stream, so lakes keep filling while an armed Upgrade Data
Stream pauses Data Stream outflow. Manual fill (`fillDataLakeManually`/`isDataLakeManualFillAvailable`)
spends directly from that pool's buffer up to what the next Booster still needs; outside the forced
priority order, same as Buy. It's not a standalone UI action: `DataLakePanel` has a single
"🎯 `<cost>`" control that either buys immediately (already affordable) or arms
`intro.dataLakes[tier].autoConvertActive`; `tickDataLakeAutoConvert` then drives `fillDataLakeManually`
one step per tick until affordable, buys exactly 1, and clears the flag — "one click, one full
fill-then-buy conversion, then stop," never a persistent auto-buy loop (see `docs/DESIGN_HISTORY.md`
for the reversal this replaces). While converting, the control is an inert label; starting is refused
(`isDataLakeAutoConvertStartAvailable`) once the matching compute-ladder entity is at its cap. Overflow
fills the lake's ×1/×10/×100 disks smallest-first, one disk at a time, at the plain available rate —
no artificial slowdown, the same "no taper" posture as Storage provisioning (an earlier tapered
version was removed, see `docs/DESIGN_HISTORY.md`). Each sub-size is capped at
`DATA_LAKE_SUB_SIZE_DISK_CAPS` (9/9/9, not 10/10/10 — mirroring `DISK_ARRAY_LADDER_CAP`'s 9), one unit
short of each level's capacity (1/10/100/1,000); the level's last unit fills through the lake's
retained fill buffer, like a Storage array's cache standing in for its 10th disk
(`getDataLakeNextFillSubSize`/`getDataLakeSlotRepresentableUnits`); a mixed-radix decomposition
(`decomposeDataLakeUnits`) keeps the disk-square breakdown exact with no leftover. Capacity is a
purchasable decade-power ladder (1/10/100/1,000 units, capped at level 3), advancing only once the
CORRESPONDING Storage array size is fully built. **Buying Boosters** (`buyBooster`) spends only banked
lake units — outside the forced priority order, available the instant affordable — at a `purchased + 1`
cost (capped once capacity-maxed) and instantly grants 1 compute-ladder entity, up to that entity's
effective cap (`COMPUTE_ENTITY_CAP`, 10 — or `COMPUTE_ENTITY_AUTO_MERGE_CAP`, 18, once that tier's
outbound merge boundary has auto-merge unlocked, see Architecture 4b); a same-reference no-op at cap.
**Stranded disks are never destroyed, and they DO still feed the write cache — even when the target is
stranded too.** A disk whose tier already moved past its required level sits full and un-pullable for
the rest of the cycle; nothing sweeps it into Bits (an earlier "idle disk liquidation" mechanic was
removed per the maintainer's explicit instruction). `tickDiskWriteCache`/`canStartDiskWriteCacheMerge`/
`isDiskWriteCacheCollectPaused` never gate on stranded status, source or target — folding it into the
next size up is its one remaining productive use (`disks`/`disksBuiltTotal`/`diskWriteCache` are
Prestige-permanent, so nothing is wasted). **Pool isolation:** no pool ever consumes anything from
another — a merge never crosses a pool boundary (`canStartDiskWriteCacheMerge` compares
`getPoolIndexForDiskSize`; `canDiskSizeFeedWriteCache(size)` is false for each pool's largest size and
gates `DiskArrayRow`'s stranded-disk tooltip; `tickDiskWriteCache` cancels a legacy in-flight cross-pool
merge still collecting, returning collected disks to the source array and any excess as clamped bits to
the source pool's buffer; one already flushing completes), so each pool's largest size ends its chain
and the next pool's smallest size fills only via its own read cache. The only thing that still pauses a
merge is an ACTIVE tier claim on the source (Factory gets first crack at a disk it could pull this
exact tick); see `docs/DESIGN_HISTORY.md` for the two rounds of over-restriction this reverts. A
stranded disk otherwise waits for the next real Prestige to reopen its pull window. Full
overflow-segment math, the disk-breakdown mixed-radix proof, and every gating predicate:
`docs/ECONOMY_REFERENCE.md`.

**Display conventions.** A Disk's in-square size label is a bare number with no unit suffix
(`formatDiskSizeBare`; aria-labels/tooltips keep the unit-suffixed `formatDiskSize`). A pool's or Data
Lake's CAPACITY (and a lake's balance) always renders in its own fixed unit (`formatDiskSizeInPoolUnit`),
never auto-converting up — a maxed KB lake reads "1000 KB", never "1 MB". A pool's buffer BALANCE
(`PoolBalanceText`) instead self-sizes below that unit (`formatPoolBalance`/`formatPoolBalanceStable`,
e.g. "398.375 KB / 1 MB", not raw bits). Details: `docs/ECONOMY_REFERENCE.md`.

**The above is a summary only.** The full mechanic reference — the complete tap/combine/Speed
loop, auto-convert conversion mechanics, Storage's build/auto-fill/redeem lifecycle, Compute
Cores/Nodes/Boost, every forced-priority-order predicate, cost/production formulas, the (configurable,
growing) purchase block size and level system, Prestige Points and every PP-funded automation, the
per-tier and global tickspeed multipliers, the last tier's XP-funded tickspeed, Scale Up, Overclock,
Reset, the complete game state shape, and the engine function/constants tables — lives in
`docs/ECONOMY_REFERENCE.md`. Read it before touching `src/game/engine.js`, `src/game/layers.js`,
`TIER_DEFINITIONS`, `ByteFoundryPage`/`StoragePage`/`ComputePage`, or any economy/prestige/tickspeed
constant or formula — and check `docs/DESIGN_HISTORY.md` first if you're about to change a
formula/gate a past iteration may already have tried and rejected (e.g. the `<=` vs. `===`
bank-redeemability check, the flat vs. dynamic transfer cost).

Scale Up uses persisted, run-scoped `scaleUpTierCounts`: each claim doubles the current target and all
earlier tiers, while the newly recorded successor begins at ×1. Requirements are based on the target
tier's **completed levels** (`purchaseLevels − 1`): each of the first ten Scale Ups requires 3 completed
levels on the last unlocked tier; repeated final-tier claims then require 6, 9, 12, …. This is separate
from the re-reveal mechanic: after a reset, a tier already unlocked by a previous Scale Up within the
same Overclock re-reveals when its predecessor reaches 2 completed levels (`purchaseLevels` 3).
Overclock keys off the **final** tier's completed levels: first available at 5, then dynamically at (the
completed-level count the previous Overclock was taken at) + 3 — `overclockLastClaimCompletedLevels`,
not a fixed 5/8/11/14 ladder (Latency's Overclock-scaled 1% step is under "Economy model" above).

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
`src/theme/X`, `save-migration/X` → `src/save-migration/X`. Use these bare aliases in imports, not
relative paths like `../../game/engine`. Directory imports resolve to that directory's
`index.jsx`/`index.js` (e.g. `import { ThemeProvider } from 'theme'` → `src/theme/index.jsx`).

## Theming

All component styling resolves to **semantic design tokens** defined once in `src/theme/tokens.js`
(`buildTheme(mode)` + `themes.dark`/`themes.light`), so the two themes — an evolved **dark** (default)
and a **light** theme — fall out of swapping palette values rather than forking components on mode. This
was the foundation for the now-complete UI-revamp epic (#132, all 8 sub-issues shipped, including light
mode's activation in #140). Fonts (`font.display` = Space Grotesk, `font.body` = Inter) are locally
bundled via `theme/fonts.js` — no runtime CDN fetch. Settings → Appearance drives `<ThemeProvider
mode>` from `tens_theme_preference` (`system` default, or `light`/`dark`); System follows
`prefers-color-scheme`. Reset / `clearGameState` do not clear the theme preference.

The full per-file token/font/GlobalStyle/ThemeProvider breakdown lives in `docs/THEMING_REFERENCE.md`.
Read it before touching `src/theme/*`.

## PWA support

The app is installable as a PWA on Android Chrome and iOS Safari — home-screen icon, standalone display,
offline-capable after a first visit — via `vite-plugin-pwa` (`generateSW` strategy, no custom runtime
caching), without any app-store presence. A deliberate choice over Capacitor/native app-store publishing
or a React Native rewrite; see `docs/DESIGN_HISTORY.md` for the trade-off reasoning. Manifest/icons/
meta-tag details, and why `localStorage` save data is unaffected by the service worker's precache, are in
`docs/PWA_REFERENCE.md`. Read it before touching `vite.config.js`'s `VitePWA` block, the manifest
fields, or `public/pwa-*`/`scripts/generate-pwa-icons.mjs`.

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

`.github/FUNDING.yml` declares GitHub Sponsors for `mohanpednekar`, so the repo shows a native "Sponsor"
button. The file alone doesn't enroll the account — Sponsors enrollment (`github.com/sponsors`) is a
separate, maintainer-only step tracked in issue #62's checklist; until then the button won't
display/function.

## License

`LICENSE` (repo root) is an explicit all-rights-reserved notice — the maintainer's deliberate choice over
an OSS license (MIT/Apache 2.0/etc.). Code stays publicly visible but isn't legally reusable without
written permission; this states what default copyright already implies, for clarity given the repo's
public-visibility surface (GitHub Sponsors, Releases, the PWA). A `CODE_OF_CONDUCT`/`CONTRIBUTING` guide
is deliberately not present — a solo, AI-driven hobby project not soliciting external contributions;
`README.md`, `.github/ISSUE_TEMPLATE/` (`claude-task.yml` + `config.yml`), and
`.github/pull_request_template.md` already cover the useful Community Standards items.

## Testing

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`,
  `save-migration/index.test.js`, `navAttention.test.js`, `App.test.jsx`.
- Environment: jsdom, globals enabled (`describe`/`it`/`expect` without imports), setup file
  `src/setupTests.js` (imports `@testing-library/jest-dom/vitest`).
- Component tests use Testing Library (`render`, `screen`, `userEvent`) and query by role/label text
  rather than test IDs; `StatCard` panels carry `aria-label="<tier name> layer"` for this purpose, and
  each tier row's Buy button nests a visually-hidden `role="progressbar"` (via `VisuallyHidden`) with
  `aria-label="<tier name> cost-block progress"` plus `aria-valuenow`/`aria-valuemin`/`aria-valuemax` —
  the Buy/tickspeed-multiplier/Unlock/Smart/Prestige buttons also carry an explicit `aria-label` with the
  full descriptive sentence (independent of their compact icon-based visible text), so
  `getByRole('button', { name: … })` still matches despite the nested labeled node.
- Tests that seed `localStorage` directly must clear it in `beforeEach` (see `App.test.jsx`). Tests for
  the Reset (Settings → Danger zone) `window.confirm` guard mock it via `vi.spyOn(window, 'confirm')` and
  restore it in `afterEach`. If a test ever needs to observe behavior across real tick boundaries (none
  currently does), use `vi.useFakeTimers()` + `act(() => vi.advanceTimersByTime(TICK_RATE_MS))` **once
  per tick** (not one large jump per assertion — more than one tick fires the live `setInterval` several
  times synchronously, which React 18 batches into a single render), and **unmount the rendered
  component before calling `vi.useRealTimers()`**, not after — see `docs/DESIGN_HISTORY.md` for the real
  regression this ordering avoids.
- Where several near-identical automations/buttons exercise the same generic UI behavior (a
  pause/resume toggle beside a status badge; a purchase button disabled below its own PP cost), prefer a
  single `test.each` table over hand-copied tests — same coverage (each row reports as its own test),
  far less duplicated setup. See `App.test.jsx`'s pause-toggle and disabled-without-enough-PP tables.
- A starter set of `engine.js`'s core economy formulas (`getTierCost`, `getPrestigePointsAwarded`,
  `buyTierQuantity`'s cost-resource spend) also carry property-based tests via `fast-check`
  (devDependency), alongside — not replacing — their example-based tests: `describe('<fn>
  (property-based)', …)` blocks right after that function's example-based `describe` in
  `engine.test.js`, asserting invariants (monotonicity in level/money-exponent, resource balances never
  negative) across generated inputs. `fc.assert(fc.property(...), { numRuns: 200 })` bounds generated
  cases so this stays fast in CI.
- `yarn test` is green (1876 tests). The four core test files (`engine.test.js`, `layers.test.js`,
  `storage.test.js`, `App.test.jsx`) assert against the current tier/resource id scheme (`MONEY_ID =
  'base'`, display name "Bits", symbol `b`; Factory Bytes pool `BYTES_ID = 'bytes'`, symbol `B`; tier ids
  `tier01`/`tier02`/… with display names `Kilobytes`/`Megabytes`/…) — don't reintroduce an older scheme
  (`'Ones'`, `'money'`, `'hundreds'`, or a purchasable Bytes tier) left behind by prior renames/removals
  (see `docs/DESIGN_HISTORY.md`). Saves must use the current schema (`resources.base`,
  `resources.bytes`, `intro.mainGameUnlocked`, tier ids `tier01`–`tier10`);
  `save-migration/adaptSaveForCurrentSchema` runs on every load; `storage.js`'s `mergeState` only fills
  in missing fields from `createInitialGameState()`. Legacy payloads with no migration step yet are
  discarded and surfaced via `IncompatibleSaveNotice`. Current saves stamp `saveSchemaVersion: 2` on
  every write (v1 saves forward-fill via `mergeState`). `src/theme/contrast.js` (a standalone WCAG
  contrast-ratio utility) plus `contrast.test.js` and `tokens.contrast.test.js` add two more files — the
  latter audits the design tokens' plain (unblended) text/UI-component color pairs for AA compliance in
  both themes, see `docs/THEMING_REFERENCE.md`. `engine.computeFlops.test.js` covers the PP Compute
  (Flops) screen; `capacitorConfig.test.js` pins the Capacitor Vite `createViteConfig` path;
  `pages/DevModePage/stateFields.test.js` covers Dev Mode's Variables-tree helpers
  (`prettifySegment`/`isEditableScalar`/`setValueAtPath`). With `save-migration/index.test.js`/
  `navAttention.test.js` that's 11 of the 14 files; the other three are
  `scripts/adversarialReviewMarker.test.js`, `scripts/pr-low-risk-eligible.test.js`, and
  `scripts/bump-version.test.js` — Vitest's default glob picks these up since `vite.config.js`'s `test`
  block sets no custom `include`.

### End-to-end testing

`yarn test:e2e` (Playwright, config at `playwright.config.js`) is a separate, real-browser suite —
distinct from, and not a replacement for, `yarn test`'s Vitest/jsdom suite. It drives the actual app in
headless Chromium against a real `yarn dev` server (Playwright's `webServer` starts and waits on it;
`reuseExistingServer` is enabled outside CI so a session's already-running `yarn dev` is reused). Bound
to `127.0.0.1` (never `0.0.0.0`), matching the dev/test server convention, and targets the real `/tens/`
base path.

- **One-time setup**: `npx playwright install --with-deps chromium` (or `yarn playwright install
  chromium` if the sandbox can't install system package dependencies) — the browser binary isn't bundled
  with `@playwright/test` and isn't pre-installed on the GitHub Actions `ubuntu-latest` runner.
  Chromium-only; no cross-browser coverage needed.
- Specs live under `e2e/` (a sibling of `src/`), named `*.e2e.js` — deliberately not
  `*.test.js`/`*.spec.js`, so Vitest's default glob never picks them up; `yarn test`'s test count is
  unaffected by anything under `e2e/`.
- Specs seed `localStorage`'s `tens_game_state` key directly (via `page.evaluate`, after an initial
  `page.goto` to establish the origin, then `page.reload()`) rather than playing through the early game
  — the same convention `App.test.jsx` uses. A seeded object only needs the fields a test cares about;
  `storage.js`'s `mergeState` fills in the rest from `createInitialGameState()` — including
  `intro: { mainGameUnlocked: true }`, needed by every spec that seeds state to land directly on MainPage
  rather than the Byte Foundry intro screen.
- Current specs: `e2e/golden-path.e2e.js` (main game already unlocked; buying Kilobytes via the real Buy
  button, Owned count and money balance updating including across a real production tick),
  `e2e/autobuyer-reload.e2e.js` (an already-unlocked tier autobuyer survives a real reload),
  `e2e/prestige.e2e.js` (seeding Money ≥ `PRESTIGE_THRESHOLD`, prestiging from the first-time
  `FullScreenOverlay`, confirming resources reset and Prestige Points are awarded),
  `e2e/meta-prestige.e2e.js` (seed at 1 Googol PP → Settings Era ascension → assert `era.count`, Eons
  award, and the permanent `intro.mainGameUnlocked` latch carrying forward), and
  `e2e/data-lake.e2e.js` (a seeded KB Data Lake renders its disk-square breakdown on Foundry; a manual
  Buy Booster click grants a Core, verified on Boosters).
- **Not wired into `ci.yml`** — deliberately. Wiring it in (installing Playwright's browser on the
  runner, adding a job/step) means editing `ci.yml`, which is off-limits to `autonomous-maintenance.yml`
  (see docs/AUTOMATION.md) — a human needs to do that directly. `yarn test:e2e` is a local/manual suite
  for now.

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

`graph.json`/`graph.html`/`GRAPH_REPORT.md`/`.graphify_labels.json` (+ `.sig`) are committed so every
session starts from the same map. Everything else under `graphify-out/` is gitignored (see `.gitignore`)
as machine-local or regenerable state: `cost.json` (local API-cost tracking), the machine-local staging
files `.graphify_python`/`.graphify_root` (regenerated on demand), the dated `graphify-out/YYYY-MM-DD/`
rollback folder `graphify update` creates before overwriting curated files, `graphify-out/cache/` (the
incremental AST/semantic cache, namespaced by graphify's installed version so it conflicted across
sessions) and `manifest.json` (per-file mtime/hash cache, non-deterministic across machines) — both
regenerable via `graphify update .` — and `.graphify_analysis.json` plus its intermediate siblings
(`.graphify_detect.json`/`.graphify_extract.json`/`.graphify_ast.json`/`.graphify_semantic.json`/etc.),
scratch state deleted (`rm -f`) at the end of a normal run. The initial build (`graphify extract .
--code-only`) covered code only; a later `graphify update .` added this repo's markdown docs
(structural parsing — headings/links — 0 token cost), so the graph spans source and docs.

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
