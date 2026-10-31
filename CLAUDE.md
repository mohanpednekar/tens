# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in this repository. It documents **current behavior only** —
signatures, constants, state shape, conventions. For the *why* (superseded formulas, incident
write-ups, empirical simulation results, UI trade-offs), see `docs/DESIGN_HISTORY.md`; check it before
changing a formula, workflow, or mechanic a past iteration may already have tried and rejected.

## Project

**Tens** — a React incremental game; every mechanic (costs, production, prestige) is themed around
powers of ten. No routing library, no backend — state lives in React and persists to `localStorage`.
`App.jsx` switches top-level screens via a plain `useState` toggle plus a shared bottom `AppNav`
(Foundry → Boosters → Compute → Factory → Perks → Guide → More) — not a router (see "Architecture"):
`ByteFoundryPage` (tap-to-earn bootstrap; a one-time-ever mandatory gate on a save's very first cycle,
until Storage's own capacity threshold is reached — never again after that, permanently revisitable),
`MainPage` (tier ladder), `PerksPage` (after first Prestige: 🔓 Unlocks / ⏫ Upgrades / 🎛 Toggles icon
tabs — PP purchases, autobuyer milestones, Buy max + automation pause toggles), `InfoPage` (Guide), `ComputePage`/`ComputeFlopsPage` (Boosters
once Foundry Compute unlocks; PP Flops Compute at 100 PP). `StoragePage` is not an AppNav destination —
disk arrays live under Foundry as continuous Memory + Storage sections on the same screen (no
second-level tabs). Guide and More (Milestones / Settings) are always available, including during the
Byte Foundry gate; only Factory stays progress-gated. A third More entry, **Dev Mode**
(`DevModePage`), renders only in a dev build (`import.meta.env.DEV`) — see "Dev Mode".

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
yarn cap:sync     # cap sync (copies dist/ into the android/ + ios/ native projects — #70)
yarn cap:android  # build:capacitor + cap sync android + open Android Studio (`yarn cap:ios` → Xcode)
yarn android:aab  # signed + R8-minified release AAB (bundleRelease; `android:apk:release` → APK) — docs/RELEASE_ANDROID.md
yarn ios:configure # write Info.plist ad keys from the ads flag (scripts/configure-ios-plist.mjs; run by cap:ios)
yarn test         # run all tests once (Vitest)
yarn test:watch   # watch mode, host 127.0.0.1
yarn test:e2e     # run the Playwright end-to-end suite (real chromium, against yarn dev) — see "Testing"
yarn audit        # yarn audit (Yarn Classic v1's built-in audit — no --all/--recursive flags; it
                  # already covers dependencies/devDependencies/optionalDependencies by default)
yarn lint:workflows # bash -n every `run:` block in .github/workflows/*.yml + .github/actions/** (#738)
yarn bump-version # move CHANGELOG ## [Unreleased] → dated ## [x.y.z] + bump package.json
                  # (minor if Added/Removed entries, else patch; no-op if Unreleased empty)
yarn gen-pwa-icons # regenerate public/pwa-*.png + apple-touch-icon.png + favicon.ico from scripts/generate-pwa-icons.mjs
```

Single test file or name: `yarn test src/game/engine.js.test.js` (vitest run <path>); `yarn test -t "buyTier"`.

## Interactive session startup

`.claude/settings.json` registers a `SessionStart` hook (`.claude/hooks/session-start.sh`) that runs
`yarn install --frozen-lockfile` then `yarn test` synchronously before an interactive session starts,
printing a `✅`/`‼️` pass/fail summary per step (the install retries once with `--ignore-engines` and a warning if a container's Node is
a patch behind a dependency's engines floor — #771) so work begins from a confirmed baseline, plus a third,
informational-only staleness note for AI-instruction file cost hygiene (below). It always exits 0
(visibility, not blocking) and is idempotent/non-interactive. Interactive-only: the autonomous workflow
(`autonomous-maintenance.yml`) does equivalent setup via its own `Enable Corepack`/`Set up Node` steps.
`.claude/settings.json`/`.claude/hooks/` are otherwise a protected path for unattended runs — the
`claude-code-action` harness refuses any `Write`/`Edit` under `.claude/` as a sensitive path,
independent of that workflow's own `settings.permissions.deny` list (see `docs/DESIGN_HISTORY.md`) — so
this hook could only be added from an interactive session.

> **Critical:** Vite 8 uses OXC, which infers JSX from the file extension. Any file containing JSX **must**
> be named `.jsx`, not `.js`, or the build/tests will fail. Plain styled-components definitions (no JSX)
> stay `.js` (see `src/components/*/index.js`).

There is no general code lint (`yarn lint` does not exist). CI's required `test` job runs `yarn
lint:workflows` (`scripts/lint-workflow-shell.mjs` — `bash -n` over every workflow/action `run:` block,
#738) and then `yarn test`. `.github/workflows/deploy.yml` runs `yarn build` and publishes `dist/` to GitHub Pages on
push to `main`. Automated Copilot review on PRs is configured through GitHub's repository settings, not
an explicit workflow file.

## Pull requests

Always create a pull request after pushing changes to a branch — do not ask the user whether to create
one first. This applies to every change made in this repo.

PRs are opened as drafts by default, but stay draft only while real, known work is pending (a queued
commit, a fix in progress, unrun tests). Mark ready the moment it reflects genuinely finished work
(local checks pass, nothing further planned) — a draft isn't reviewed or auto-merge-eligible, so
leaving a finished one draft just stalls it. Applies to every PR, autonomous or interactive.

**Verification effort scales with how public the PR is**: minimal testing (one `yarn test` after a
coherent batch of changes, not after every edit) while nothing's been opened yet; one full local check
at draft creation; multiple rounds of adversarial review (Claude plus any other reviewer — bots,
humans) once marked ready, looping until nothing new turns up. This does not slow down any of
`pr-auto-merge.yml`'s three enabled paths (below, and in "Automation workflows") — a qualifying human
GitHub approval, a low-risk diff on green checks, or an adversarial `APPROVE` on a low-risk diff — all
of which stay immediate by design. The 10-minute quiet period only applies on the rare occasion none of
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
ask first if ambiguous or architecturally significant. After pushing a fix, check again (new pushes can
draw new comments) — repeat check → address → push until status quo (no new actionable comments and CI
green, or only pre-existing/out-of-scope failures left), not just one round.

**Explicitly mark each review thread resolved once you've handled it** — reply with what you did (fixed,
or why no action is needed for an informational finding), then call `resolve_review_thread` (or the
equivalent UI action) on that same thread. This applies to every thread, including a bot's purely
informational/confirmatory comment. Branch protection requires every conversation resolved before
merge — one unresolved thread blocks the merge indefinitely regardless of green CI or approvals. Treat
"reply and resolve" as a mandatory pair for every thread you touch, and periodically sweep the PR's
full thread list (not just threads a fresh notification surfaced) before considering a PR finished.

Keep PRs green through genuine fixes only — never `--no-verify`, never disable or delete a failing
test to make it pass, never weaken a check just to get past it. If a check itself is wrong, flaky, or
needs updating, fix the workflow/check definition instead of routing around it.

Once auto-merge is enabled on a PR (by anyone — human approval or `pr-auto-merge.yml`'s low-risk path),
it silently sits inert if the PR falls out of sync with its base branch — GitHub won't merge a
conflicted PR however green its checks. Actively check mergeable state whenever there's reason to look
at such a PR (a "merge conflict" notice, a push to the base branch, a routine check-in): fetch its
`mergeable_state` and, if conflicted, resolve immediately — merge (or rebase, matching repo convention)
the base branch into the PR branch, resolve the conflicts for real (never blindly take one side
wholesale on a file with actual logic), rerun `yarn test` locally, and push. Prefer a merge over a
rebase when the PR already has review comments/approvals tied to specific commits (rebasing rewrites
SHAs and can orphan that context). This applies whether the conflict is trivial (two unrelated
doc/changelog bullets, `graphify-out/`'s generated files — safe to take the incoming side and
regenerate) or substantive (overlapping logic in one function) — the latter still needs a real read of
both sides, not just `git checkout --theirs`.

Before merging any PR that touches `TIER_DEFINITIONS` or other economy constants/formulas in
`src/game/layers.js` (autonomous or interactive), run the `economy-change-review` skill
(`.claude/skills/economy-change-review/SKILL.md`): a narrow, mechanical cross-check of the diff against
the originating issue's approved spec table and Explicit Authorizations section — catching drift (a
wrong `baseCost` exponent, a mis-chained `producesResourceId`, a migration missing an old tier id, an
unauthorized economy change) that general review doesn't look for. It supplements, not replaces, the
ordinary review flow.

The reviewer subagent `.claude/agents/code-reviewer.md` does a comprehensive, adversarial,
evidence-based, read-only review of a PR or working diff — every finding verified against the
checked-out code and cited by `file:line` with a CONFIRMED/PLAUSIBLE label, an explicit merge verdict
(APPROVE / NEEDS CHANGES / BLOCK), a checked-and-clean invariants list, and a statement of anything it
didn't cover. Use it (spawn via the Agent tool) before merging any non-trivial change, or whenever
asked to review a branch/PR; on economy diffs it folds in the `economy-change-review` cross-check as a
required step rather than replacing it.

When filing a new `claude-task` issue for the backlog below, or splitting a large feature into a
sequence of them, use the `file-task-issue` skill (`.claude/skills/file-task-issue/SKILL.md`): issue-template
guidance, size/priority labeling, the conflict-avoidance `Blocked by #N` sequencing heuristic, the
`blocked` label's two distinct meanings, epic/sub-issue grouping, the narrow cases where an issue needs
no PR, and the "specs go stale" lesson from issues like #45/#138 whose bodies described UI since
rebuilt out from under them. Also useful when tightening an existing issue's spec.

## Issue tracking for interactive sessions

**Maintainer checklist (#62).** Issue #62 ("Maintainer Action Items") is pinned at the top of the Issues
tab via GitHub's native pinned-issues feature and deliberately carries **no labels** — it is not a
`claude-task` work item, only a standing manual setup checklist that #63 keeps auto-verified. Do not add
`claude-task` to it or unpin it without understanding why.

Every session that does non-trivial work — interactive sessions, not only `autonomous-maintenance.yml`
runs — files a GitHub issue to track that work and keeps it updated, giving interactive work the same
at-a-glance visibility the `claude-task` backlog has. File it as soon as the scope is clear (before or
alongside the first commit); the `file-task-issue` skill's template conventions (Goal/Context/Spec) make
a good body even for a non-backlog issue. **Don't** apply the `claude-task` label to it — that label is
reserved for items meant for `autonomous-maintenance.yml`'s Phase A backlog, and a live interactive
tracking issue labeled that way would be picked up as unclaimed work. For the same reason, don't file
it from the `claude-task.yml` issue template (its frontmatter auto-applies the label) — file a blank
issue and borrow the template's section structure by hand. Comment at meaningful status changes (PR
opened, a review round landed, work blocked/descoped) and close it once the PR merges or the task
otherwise concludes.

For work that naturally splits into multiple pieces, file a parent "epic" issue and attach each piece as
a GitHub sub-issue — the `file-task-issue` skill's "Epics and sub-issues" convention (see #87–#92,
#132) — so the effort collapses to one row. A trivial, one-off change (a typo fix, answering a question
with no code change, a tiny doc-only tweak) doesn't need a tracking issue — use judgment; the point is
visibility into real work, not process overhead.

For work roughly the `file-task-issue` skill's `size:M`/`size:L` threshold (a `size:S`-shaped change
stays one tracking issue), split the epic's sub-issues along **coding / testing / documentation** phase
lines rather than only by feature-slice, so the coding sub-issue can land without waiting on the other
two, while the deferred ones stay tracked with the epic's context:

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

Milestones group player-facing work toward a named release target; they complement (do not replace) the
Project's `Track` field from #53 (a `Track` answers "what's related to what" across releases; a
Milestone answers "what's targeted for this release", with a native due-date and X/Y-closed progress).
Interactive sessions and Planning (#53) should assign player-facing feature/economy issues to the next
release's milestone; process and infrastructure `claude-task` issues typically stay off a versioned
milestone. `v0.6.0` (UI-revamp chain #138/#139/#140) has fully shipped; the current next-release
milestone is `v0.7.0`, targeting Era ascension (`#407` / `#411–#414`, in progress).
`scripts/sync-release-milestones.sh` keeps milestones and assignments idempotent, running on every
`autonomous-maintenance.yml` invocation.

## Automation workflows

The Claude-side and GitHub automation workflows under `.github/workflows/` run unattended — opening
and fixing up PRs, and merging them only past an approval boundary: only a low-risk diff on an allowlisted
bot-authored branch (`scripts/pr-low-risk-eligible.sh`) merges without human approval — on green checks
alone, or via an adversarial `APPROVE` marker on that same eligible diff; every other PR waits for human
approval. Their git/GitHub write operations authenticate via the
`GH_AUTOMATION_PAT` secret, not `GITHUB_TOKEN` (whose pushes/merges can't trigger other workflows;
read-only guard steps, `autonomous-maintenance.yml`'s "Surface a broken deploy.yml run" alert comment/issue, and
some workflows, e.g. `devin-workflow-health.yml`/`deploy.yml`, use `GITHUB_TOKEN`). The PAT includes `Workflows: write`, so autonomous runs
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
  PRs (auth `DEVIN_CLI_CREDENTIALS`; git/`gh` via `GH_AUTOMATION_PAT`). 5-open-PR ceiling counts
  `devin/auto-*` + `claude/auto-*` together. No file-scope restriction (may edit workflows incl. its own);
  every change still lands via PR, and workflow-file changes stay human-gated (`pr-auto-merge.yml` excludes `.github/workflows/**` from green-checks auto-merge).
  Follows the Pull-requests convention; post-run feedback stays `autonomous-pr-followup.yml`'s job.
- `devin-workflow-health.yml` — daily 00:00 UTC; files an `automation-failure` issue if the Devin workflow
  doesn't parse, hasn't started in 26h, or its latest completed run wasn't `success`.
- `pr-conflict-sweep.yml` — on every push to `main`, flags newly conflicted open PRs; on
  `claude/auto-*`/`devin/auto-*` the comment triggers the follow-up agent to merge-and-resolve.
- `release.yml` — deterministic: on a `package.json` push to `main`, tags `v<x.y.z>` if absent and
  creates the GitHub Release from that version's `CHANGELOG.md` section (see "Changelog convention").
- `autonomous-pr-followup.yml` — review comments/CI failures on `claude/auto-*`/`devin/auto-*` PRs;
  `dependabot-pr-followup.yml` — failing checks on `dependabot/*` PRs when the bump broke call sites
  (Phase 0 owns `@dependabot rebase` for merely-behind branches).
- `pr-auto-merge.yml` — native auto-merge on human approval (any PR) or green checks alone for
  `claude/*`/`devin/auto-*` when the diff meets the conservative low-risk bar.
- `automation-self-heal.yml` — opens a draft `claude/self-heal-*` fix or an `automation-failure` issue
  for failed orchestration runs; never edits `ci.yml`/`deploy.yml`/itself.

**Maintainer checklist (#62) verification (#63).** `scripts/verify-maintainer-checklist.mjs` runs each
`autonomous-maintenance.yml` invocation and strikes through API-verifiable #62 items that now pass.
Convention: a new `claude-task` issue that adds a manual-only prerequisite must add a line to #62
(what to check, why); extend the script's `CHECKS` if it's API-checkable. Detail: `docs/AUTOMATION.md`.

Guard-step context feeds are bounded: any new feed passes an explicit `--limit` and display-cap with a
"+N more" note; list feeds render number + title + labels only, never bodies (`docs/AUTOMATION.md`, #81).
`autonomous-maintenance.yml` also feeds unpromoted GitHub Discussions "Ideas" (#66); Phase B item 6 may
promote a substantial one to a `claude-task` issue linking the discussion URL (propose-only).

**Budget discipline applies to every Claude Code session — interactive and automated.** Self-estimate
the remaining rolling 5-hour Claude usage window and keep a session at or under roughly **50%** of a full window,
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
behavior should never ship together. If a change needs a rationale trail (a superseded formula, a
rejected alternative, an incident write-up), add it to `docs/DESIGN_HISTORY.md` in the same commit
rather than folding narrative into this file.

**Keep additions here terse; put the detail in the matching `docs/*_REFERENCE.md` file.** `CLAUDE.md`
loads into every session's context (interactive and every autonomous run), so its size is a recurring
cost, and duplicated facts drift when only one copy is updated. It needed a dedicated trim in 2026-09
(see `docs/DESIGN_HISTORY.md`'s "CLAUDE.md Economy model duplication trim" entry, and issue #537)
because feature PRs kept adding formula-/UI-rendering-level prose here instead of to the reference doc
for that area (`docs/ECONOMY_REFERENCE.md` for economy/engine mechanics, `docs/MAINPAGE_REFERENCE.md`
for MainPage/ByteFoundryPage/ComputePage field layout, `docs/COMPONENTS_REFERENCE.md` for component prop
contracts, `docs/THEMING_REFERENCE.md`/`docs/PWA_REFERENCE.md`/`docs/AUTOMATION.md` for their own
areas). Default to one or two orientation sentences (what changed, the function/constant name to grep
for) plus a pointer to the reference doc — write the full detail there, not here. Only put something in
full here if no reference doc exists yet for that area (then consider whether the change warrants
creating one).

**`AGENTS.md`** (repo root) is a condensed mirror of this file for non-Claude AI tools (Codex, Cursor,
etc. — Claude Code itself only reads `CLAUDE.md`). It declares itself non-authoritative and says to fix
drift in the same change — whenever a change here touches something `AGENTS.md` also states (page
count/names, field names, mechanic summaries, architecture description), update `AGENTS.md`'s condensed
version in the same commit. It once drifted significantly (stale page count, a renamed field, a
long-superseded Byte Foundry mechanic) before being resynced; don't let that recur.

### Changelog convention

`CHANGELOG.md` (repo root, [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format) tracks
user-facing and behaviorally-relevant changes going forward from `v0.5.0`. Every PR that changes such
behavior adds an entry to `## [Unreleased]` at the top, under the matching subheading — `### Added`
for new features, `### Changed` for behavior changes, `### Fixed` for bug fixes (`### Removed`/
`### Security`/`### Deprecated` as needed). Purely internal changes (docs-only, CI/workflow tweaks with
no user-visible effect) don't need an entry. `package.json`'s `"version"` field (currently `0.5.0`) and
future git tags (`v0.1.0`–`v0.5.0` retroactively, then onward) mirror this file's version sections —
see `docs/DESIGN_HISTORY.md` for why versioning/tagging started here rather than at project inception.

**Version bump before release:** when a PR is ready to cut the accumulated `## [Unreleased]` entries
into a dated release section, run `yarn bump-version` (`scripts/bump-version.mjs`) as a final step on
that PR's own branch — it reads Unreleased, chooses **minor** if `### Added` or `### Removed` has
entries (otherwise **patch**; major is never auto-selected), writes the new `package.json` version,
moves Unreleased into `## [x.y.z] - YYYY-MM-DD`, and resets Unreleased to empty subheadings. No-op
(exit 0) when Unreleased has no bullet entries. The bump lands in the PR diff like any other change
(never a direct commit to `main`). Once that PR merges, `release.yml` (push-to-`main`,
`paths: ['package.json']`, deterministic — no agent) pushes the annotated `v<x.y.z>` tag and creates
the GitHub Release from that version's changelog section; see `docs/AUTOMATION.md`'s "Release" entry.

## Model delegation

When spawning subagents (Agent tool), hand work to the cheapest model that fits, always via the
`haiku`/`sonnet`/`opus` aliases (they resolve to the latest release — never pin a dated/old model ID):
**haiku** for mechanical, well-specified work (QA/test runs, searches, doc sync, formatting);
**sonnet** for implementation (code edits, tests, refactors); **opus** for judgment-heavy work
(design/economy specs, adversarial review, architecture, ambiguous debugging).
`.claude/agents/*.md` carry a `model:` frontmatter field following this split.

## AI-instruction file cost hygiene

`CLAUDE.md`/`.claude/CLAUDE.md` load into every session unconditionally, `AGENTS.md`/
`.claude/agents/*.md`/`.claude/skills/*/SKILL.md` whenever a non-Claude tool or that agent/skill runs —
so their size is a recurring cost. `.claude/skills/optimize-ai-files/SKILL.md` (which also re-checks "Model delegation") defines a
content-independent, meaning-preserving trimming process (it re-derives what's redundant each run, so
it doesn't go stale). An interactive session gets a non-blocking staleness note from
`.claude/hooks/session-start.sh`; a monthly Claude Code Remote Routine also runs it end-to-end, PR
included. Full detail: `docs/AUTOMATION.md`'s "AI-instruction file cost hygiene" / "PR review & testing
cadence".

## Repo layout

```
.claude/
  CLAUDE.md                   ← nested memory file (auto-loaded alongside the root one) pointing at the
                               graphify skill — tool-generated, see "graphify"
  settings.json              ← registers the SessionStart hook (see "Interactive session startup") and
                               the graphify PreToolUse hooks (see "graphify") — neither is read by the
                               autonomous workflow, which invokes claude-code-action with its own inline
                               `settings:`/`claude_args:`
  hooks/session-start.sh      ← yarn install --frozen-lockfile + yarn test at session start; always exits 0
  agents/code-reviewer.md     ← read-only PR/diff review subagent (see "Pull requests")
  skills/
    economy-change-review/    ← cross-checks a TIER_DEFINITIONS/economy diff against its issue's spec
    file-task-issue/          ← authors a well-formed claude-task backlog issue; also reused for
                               interactive-session tracking issues (see "Issue tracking")
    simulate-run-times/       ← simulates playthroughs to show how starting PP affects time-to-prestige
                               (see "Economy model")
    optimize-ai-files/        ← meaning-preserving token-reduction pass over CLAUDE.md/AGENTS.md/agent+
                               skill files (see "AI-instruction file cost hygiene")
    graphify/                 ← third-party skill (see "graphify"), tool-generated — not hand-edited
docs/
  DESIGN_HISTORY.md            ← the "why": superseded formulas, incident write-ups, rejected
                               alternatives — check before changing a formula/workflow/mechanic a past
                               iteration may already have tried
  AUTOMATION.md                ← full Automation workflows reference
  ECONOMY_REFERENCE.md         ← full Economy model reference
  FOUNDRY_MECHANICS_REFERENCE.md ← full Byte Foundry / Storage / Disks / Data Lakes / Boosters prose
                               (moved out of CLAUDE.md; read before touching ByteFoundryPage/ComputePage/disk+lake engine code)
  MAINPAGE_REFERENCE.md        ← full MainPage reference, including ComputePage
  COMPONENTS_REFERENCE.md      ← full Button/Money/StatCard prop/styling reference
  THEMING_REFERENCE.md         ← full design-token/font/ThemeProvider reference
  PWA_REFERENCE.md             ← full installable-PWA reference
  DEVMODE_REFERENCE.md         ← full Dev Mode mechanism reference
src/
  game/
    layers.js             ← TIER_DEFINITIONS array + all game constants (single source of truth)
    engine.js              ← pure state functions (no React, no side effects)
    navAttention.js         ← pure predicates for AppNav attention dots (high/normal levels; Storage cues
                               fold into Foundry; Compute Flops affordability → `compute`)
    useIncrementalGame.js  ← React hook; wires the engine to useState + localStorage + the tick timer
    storage.js              ← localStorage read/write; offloads every load to save-migration/, then
                               forward field merge (`mergeState`); multi-slot saves + Supporter
                               entitlement (unlock code / dummy checkout), clearSaveSlot /
                               clearAllSaveProgress (never revokes unlock), plus the separately keyed
                               last-save timestamp for offline progress (slot 0 keeps legacy
                               `tens_game_state` keys). Also owns Dev Mode's isolated `'dev'` slot
                               (`isDevModeActive`/`setDevModeActive`/`clearDevGameState`/
                               `applyDevGameStateJson`) — see "Dev Mode"; separate from numbered slots.
    save-migration/         ← save-schema assistant only — `adaptSaveForCurrentSchema(raw)` returns
                               current-compatible game state (or failure); runs on every load; see
                               DESIGN_HISTORY.md "Save persistence".
  components/
    AppNav/index.jsx        ← fixed bottom bar, progression order Foundry → Boosters → Compute → Factory →
                               Perks → Guide → More; Factory omits during the Foundry gate (Guide/More stay);
                               green attention dots via game/navAttention.js
    AppMenu/index.jsx       ← More sheet — Milestones / Settings (always reachable; Reset / Reset Byte
                               Foundry are Settings → Danger zone only)
    Button/index.jsx        ← styled button (`.jsx` — needs JSX for `ButtonContent`); semantic `variant`
                               prop resolved against theme color tokens, deprecated raw `color` prop
                               still supported. Full contract: `docs/COMPONENTS_REFERENCE.md`
    DiskArrayRow/index.jsx  ← one Disk array's STATUS display (nothing clickable), `{ actions, size, state }`
                               (`actions` unused); shared by ByteFoundryPage and StoragePage (why standalone: `docs/DESIGN_HISTORY.md`)
    DataLakePanel/index.jsx ← one Data Lake's block, `{ actions, state, bare, tierIndex }`, embedded per pool
                               card (unused omitted-`tierIndex` mode in the reference); mechanic: "Economy model"
    icons.js                ← shared glyphs (`COST_ICON` 🏷️ marks every cost: Data Lake Booster, Upgrade Data Stream,
                               Provision Disk status line)
    BoostBadge/index.jsx    ← Compute-Boosted glow helpers: `boostGlow` card css + `isDataStreamBoosted`/
                               `isFactoryTierBoosted` (ByteFoundryPage Data Stream, MainPage tier rows)
    SpeedDetailsPopover/index.jsx ← non-modal portal panel behind every Foundry ⚡ speed (Data Stream, running upgrade, each pool)
    LeadIcon/index.js       ← a line's leading emoji in a fixed-size, aria-hidden box (Foundry tile rows)
    Switch/index.js         ← accessible on/off switch (`$on` + `aria-pressed`): Perks → Toggles, Buy max
    Money/index.js          ← styled money/amount display, `theme.color.text` + tabular-nums
    BuyMaxToggle/index.jsx  ← Buy max mode toggle (Perks → Toggles only); renders nothing until
                               `isBuyMaxUnlocked` (first Prestige). See "Buy max mode" below
    ConfirmDialog/index.jsx ← in-game confirm overlay (StatCard + Cancel/Confirm); SettingsPage's Era ascension
    OfflineProgressNotice/index.jsx ← the "Welcome back!" notice (`.jsx`), shared by MainPage and
                               ByteFoundryPage (extraction rationale: `docs/DESIGN_HISTORY.md`)
    IncompatibleSaveNotice/index.jsx ← blocking overlay when an on-disk save was cleared on load
                               because it predates the current schema; single **Start fresh**
                               acknowledge action. Rendered by `App.jsx` when `useIncrementalGame`'s
                               `incompatibleSaveReason` is set.
    StatCard/index.js       ← styled card container used for every panel, fully token-driven
                               (every component's full prop/styling contract: `docs/COMPONENTS_REFERENCE.md`)
  pages/
    ByteFoundryPage/index.jsx ← the "Byte Foundry" tap screen (Architecture 4). Takes `{ game, focusNonce }`.
                               Pool Memory derives from the shared Data Stream Capacity, which doubles up to
                               the FINAL pool's end bound (`isMemoryCapacityAtCap`) — see "Pool liveness is Capacity-only"
    StoragePage/index.jsx   ← thin reusable every-size DiskArrayRow list (Architecture 4a)
    ComputePage/index.jsx   ← Foundry Boosters screen: merge chain + Boost (Architecture 4b)
    ComputeFlopsPage/index.jsx ← PP Compute (Flops) screen; page id `'compute'`. Takes `{ game }` (Architecture 4c)
    MainPage/index.jsx      ← the tier ladder (see "Architecture"). Takes `{ game }`.
                               No second-level tabs. Full reference: `docs/MAINPAGE_REFERENCE.md`
    PerksPage/index.jsx     ← page id `'perks'`, AppNav item once `isPerksPageRevealed` (first Prestige/
                               Era). Takes `{ game, focusNonce }`. Icon tabs 🔓 Unlocks / ⏫ Upgrades / 🎛
                               Toggles — detail + tab dots: `docs/MAINPAGE_REFERENCE.md`
    InfoPage/index.jsx      ← the Guide page (Architecture 5); takes no navigation props (AppNav is the exit)
    MilestonesPage/index.jsx ← Chapters / Era ascension status (Architecture 6)
    SettingsPage/index.jsx  ← Supporter pack, save slots, Prestige museum, Era ascension, Appearance,
                               Ops dashboard, Danger zone (Architecture 7)
    DevModePage/index.jsx   ← dev-only sandbox (see "Dev Mode"); reached via AppNav → More, rendered only
                               when `import.meta.env.DEV`. Takes `{ game }`
      stateFields.js         ← pure helpers backing the Variables tree: prettifySegment (tier-id →
                               display-name label lookup), isEditableScalar, setValueAtPath (immutable
                               set-by-path at any depth)
  theme/
    tokens.js               ← design-token single source of truth: per-mode (dark/light) color, shadow &
                               tier-accent sets + mode-independent space/radius/motion/font/type scales;
                               exports buildTheme(mode) + themes.{dark,light}. Full reference:
                               `docs/THEMING_REFERENCE.md`
    fonts.js                 ← locally bundles the `font.display`/`font.body` faces (Space Grotesk /
                               Inter, via @fontsource) as side-effect CSS imports — no runtime CDN
                               fetch. Full reference: `docs/THEMING_REFERENCE.md`
    contrast.js              ← standalone WCAG relative-luminance contrast-ratio utility (see "Testing")
    GlobalStyle.js          ← createGlobalStyle: box-sizing reset, base font/smoothing, form `font: inherit`,
                               and the token-driven page background/text (absorbs the removed index.css/App.css)
    index.jsx               ← <ThemeProvider mode> wrapper (styled-components ThemeProvider) + re-exports;
                               imports `./fonts` as a side effect; `mode` defaults to dark, driven from
                               system pref + Settings → Appearance toggle (#140)
  services/
    config.js               ← feature flags (`ADS_ENABLED`/`IAP_ENABLED`/`CLOUD_SAVE_ENABLED`/
                               `IS_NATIVE_BUILD`, re-exported from `virtual:tens-features`), AdMob test/real
                               unit ids, RevenueCat keys, `IAP_PRODUCTS`, policy URLs
    monetization/           ← MonetizationService (`init`/`showRewarded`/`purchase`/`restore`/
                               `getEntitlements`): `noop.js` (web / flags off), `admobAdapter.js` (+ `rewardedAdCache.js`: one
                               video preloaded at init and after each show, refreshed past 55 min),
                               `revenueCatAdapter.js`, composed by `index.js` `getMonetizationService()`
    cloudSave/              ← Firebase Auth (email/password) + Firestore `saves/{uid}` backend
                               (`firebaseBackend.js`, lazy) and `deleteAccountAndData` (reauth → data → user)
    nativeShell.js          ← native start-up: hide splash, init monetization (no-op on web)
  App.jsx                   ← root component; owns the single `useIncrementalGame()` call, wraps
                               <ThemeProvider><GlobalStyle/>, and switches pages via a local `page`
                               useState (`'game'`/`'info'`/`'foundry'`/`'boosters'`/`'compute'`/`'perks'`/
                               `'milestones'`/`'settings'`/`'dev'`, default `'game'`; legacy `'storage'`
                               → `'foundry'`) — not a router — plus the shared bottom `AppNav` and
                               `AppMenu` (More sheet). Rendered screen is derived: `showingFoundry =
                               !GATE_EXEMPT_PAGES.has(page) && (!intro.mainGameUnlocked || page ===
                               'foundry')`; `intro.mainGameUnlocked` is a permanent latch, so the gate
                               exists only on a save's very first cycle. Full routing/gate detail:
                               `docs/MAINPAGE_REFERENCE.md`'s "App.jsx routing and the Foundry gate"
  index.jsx                 ← ReactDOM.createRoot entry point; calls reportWebVitals() after render
  reportWebVitals.js         ← optional web-vitals (CLS/INP/FCP/LCP/TTFB) reporter; no-ops unless passed
                               a callback — currently called with none, so a no-op in practice
capacitor.config.js          ← Capacitor app id/name + `webDir: dist`, SystemBars/SplashScreen config, and
                               `includePlugins` derived from the ad/IAP flags (#70; see "Native apps")
firestore.rules              ← owner-only `saves/{uid}` rules for cloud save
android/, ios/               ← committed Capacitor native projects (generated by `cap add`; build
                               output ignored by their own `.gitignore`s) — see "Native apps" below
vite.config.js               ← thin wrapper: `defineConfig(createViteConfig({ srcPath }))`
viteConfigFactory.js          ← the real Vite config — path aliases, dev/test server, and the VitePWA
                               plugin (skipped when `CAPACITOR=1`, along with the GitHub Pages `/tens/`
                               base). Extracted from `vite.config.js` so `capacitorConfig.test.js` can
                               pin the CAPACITOR=1 behavior (`import.meta.url` isn't a `file:` URL under
                               Vitest). Full PWA reference: `docs/PWA_REFERENCE.md`
playwright.config.js         ← Playwright e2e config (see "End-to-end testing") — separate from
                               vite.config.js's own `test` block, which only configures Vitest
e2e/
  golden-path.e2e.js          ← buying Kilobytes via the real Buy button; Owned/money-balance updates
  autobuyer-reload.e2e.js     ← an already-unlocked tier autobuyer survives a real page reload
  prestige.e2e.js             ← prestiging from the first-time overlay resets resources, awards PP
  meta-prestige.e2e.js        ← Settings Era ascension from 1 Googol PP seed; era/Eons + Foundry gate
  data-lake.e2e.js            ← a seeded KB Data Lake renders its disk-square breakdown on Foundry, then a
                               manual Buy Booster click grants a Core (verified on the Boosters page)
  visual-regression.e2e.js    ← Linux-only full-page screenshot baselines (Byte Foundry / Byte Factory, both
                               themes) in `visual-regression.e2e.js-snapshots/`; update process: `e2e/README.md`
scripts/
  bump-version.mjs (+ `.test.js`) ← `yarn bump-version` (see "Changelog convention") — #52
  generate-pwa-icons.mjs     ← one-off script (`yarn gen-pwa-icons`) rasterizing an inline "byte grid"
                               SVG (see `docs/PWA_REFERENCE.md`) with `sharp` into public/pwa-*.png +
                               apple-touch-icon.png, and hand-assembling public/favicon.ico (minimal ICO
                               of PNG frames, no extra dependency); not part of the build — re-run only
                               if the icon design/palette changes
  adversarialReviewMarker.js (+ `.test.js`) ← pure helpers for the `<!-- adversarial-review sha=…
                               verdict=… -->` marker (see "Pull requests")
  pr-low-risk-eligible.sh (+ `.test.js`) ← shared low-risk-auto-merge eligibility bar, used by
                               `enable-auto-merge-if-eligible.sh` and `pr-auto-merge.yml`
  enable-auto-merge-if-eligible.sh ← marks a PR ready + enables GitHub auto-merge once it's
                               adversarial-APPROVEd and low-risk (see "Pull requests")
  resolve-pr-threads.sh      ← lists/resolves PR review threads by ID for automation-owned PRs
                               (`claude/*`/`devin/*`, repo-owner/bot-authored only); `list` is
                               read-only, `resolve` only accepts explicit caller-selected IDs, never a
                               bulk "resolve all" — used by `autonomous-maintenance.yml` and
                               `autonomous-pr-followup.yml` (see "Pull requests")
  backlog-issue-hygiene.sh, epic-407-issue-hygiene.sh ← idempotent GitHub issue-hygiene sweeps
                               (close shipped/stray issues, unblock/label ready work) run on every
                               `autonomous-maintenance.yml` invocation — see docs/AUTOMATION.md
  configure-ios-plist.mjs (+ `.test.js`) ← manages Info.plist's GADApplicationIdentifier /
                               NSUserTrackingUsageDescription / SKAdNetworkItems from the ads flag
  android-boot-smoke.sh      ← installs + launches an APK on an emulator, fails on crash / no UI
                               (mobile-build.yml's minified-release boot check)
  sync-release-milestones.sh ← idempotent GitHub Milestone create/assign (see "GitHub Milestones")
  sweep-stalled-auto-prs.sh (+ `.test.js`) ← comments on `claude/auto-*` PRs idle 24h+ with a failing
                               check or merge conflict to re-fire follow-up; 3 retries, then `automation-retro` (#60)
public/
  pwa-192x192.png, pwa-512x512.png, pwa-maskable-512x512.png, apple-touch-icon.png
                               ← generated PWA icon assets (see `docs/PWA_REFERENCE.md`); the old
                               create-react-app-era `index.html`/`manifest.json`/`logo192.png`/
                               `logo512.png` files that used to live here were removed — see
                               `docs/DESIGN_HISTORY.md` for why
  favicon.ico, robots.txt     ← unchanged, still served as-is from this directory
```

## Architecture

Strict three-layer separation:

1. **`engine.js`** — all game logic is pure functions of `(args) => state => newState`, with no React
   and no side effects. Every mutation returns a new state object; invalid actions (can't afford, tier
   locked) return the *same* state reference unchanged, which callers use as a no-op signal (see
   `tickGame`'s autobuyer loop, which breaks as soon as `buyTierQuantity` returns the same object
   back).
2. **`useIncrementalGame.js`** — the only place holding React state. Called once, in `App.jsx` (lifted
   up from MainPage so `ByteFoundryPage` shares the save/tick loop). Owns the `setInterval` tick timer
   and the localStorage persistence effect, and exposes `{ state, actions, resetGame,
   resetByteFoundry, offlineProgress, dismissOfflineProgress, incompatibleSaveReason,
   dismissIncompatibleSaveNotice, buyMaxMode, setBuyMaxMode, savesMeta, saveSlots, switchSaveSlot, renameSaveSlot,
   redeemUnlockCode, purchaseSupporterDummy, opsSamples, clearSlot, eraseAllSaveProgress,
   exportSaveJson, applyCloudSave, claimOfflineAdReward, devModeActive, toggleDevMode, setDevState, applyDevStateJson, resetDevState }` — the last five back
   Dev Mode; always present on the return value (not gated by `import.meta.env.DEV`) but consumed only
   by `DevModePage`, whose rendering *is* dev-build-gated, so unreachable from any shipped UI. Every
   purchase — manual Buy and autobuyer ticks alike — always batches up to the current level's
   cost-block boundary (see docs/ECONOMY_REFERENCE.md), via a `BUY_QUANTITY` constant
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
   `OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS` (10 minutes). Mount only covers time the app was
   fully torn down (a backgrounded/suspended tab or PWA never remounts), so the live tick loop also
   tracks its own last firing's wall-clock time and replays any gap past
   `BACKGROUND_TICK_GAP_THRESHOLD_SECONDS` (2s) through the same `applyOfflineProgress` path — so
   `offlineProgress` is **not** a mount-time-only, one-shot value. Full detail:
   `docs/ECONOMY_REFERENCE.md`'s "Offline progress" section.
3. **`MainPage/index.jsx`** — a pure renderer driven by `TIER_DEFINITIONS` and the hook's `state`
   (a `game` prop from `App.jsx`, not its own `useIncrementalGame()` call). Renders each unlocked tier
   as one compact grid row. Purely game — live controls, numbers, status text; top-level destinations
   live in `App.jsx`'s shared `AppNav` (Byte Factory is this page), so MainPage carries no page-to-page
   open-* links. Full layout: `docs/MAINPAGE_REFERENCE.md`.
4. **`ByteFoundryPage/index.jsx`** — the tap screen, a pure renderer taking `{ game, focusNonce }`; how a
   save's first Prestige cycle earns its first Kilobytes. A mandatory gate while `intro.mainGameUnlocked`
   is false (AppNav omits Factory; Guide/More stay), permanently latched true the instant Storage's
   capacity threshold ("1 KiB") is crossed (`latchMainGameUnlocked`/`isStorageUnlocked`) — one-time-ever,
   never resets. Once latched, the Data Stream tile itself is the tap target (`actions.tapIntroBit`).
   Shows Data Stream (shared Combine/Speed/Capacity + Provision Disk in its own card) then one `PoolCard`
   per VISIBLE pool (`getVisibleStoragePoolCount`: PURE Capacity-based, independent of
   `isStoragePoolUnlocked`/`getUnlockedStoragePoolCount`, which stay disk-build-only — see "Pool liveness"
   below); each pool embeds its `DiskArrayRow`s and `DataLakePanel` (`bare`, `tierIndex={poolIndex}`).
   Disk Fill is automatic. Every action is gated by the forced priority order — Data Lake Booster
   purchases, its capacity Upgrade, and Upgrade Capacity / Speed are the three exceptions. Pool/buffer/
   Bandwidth/Provision Disk/queue detail: **`docs/FOUNDRY_MECHANICS_REFERENCE.md`**; UI layout:
   `docs/MAINPAGE_REFERENCE.md`; formulas: `docs/ECONOMY_REFERENCE.md`; component contracts:
   `docs/COMPONENTS_REFERENCE.md`.
4a. **`StoragePage/index.jsx`** — thin reusable every-size DiskArrayRow list (ascending, via
   `getDiskSizesToShow`) — NOT the Provision Disk button, which stays on ByteFoundryPage. Takes
   `{ game }`. Primary UI path is Foundry's continuous sections; this file remains for reuse/tests. A
   pure renderer ("engine re-validates, UI just mirrors it", like every page here).
4b. **`ComputePage/index.jsx`** — Foundry **Boosters** screen (page id `'boosters'`), taking `{ game }`;
   reached via AppNav once `isComputeCoreConversionUnlocked`. Hosts the nine-boundary merge chain (Core →
   Node → … → Megacomputer) behind a later one-time `intro.computeMergePageUnlocked` reveal. "Compute"
   names the page/feature only — entities drop the word in every player-visible label. Deliberately terse
   (icon-only controls, full sentence in `title`/`aria-label`; mechanic prose lives in the Guide). Order:
   top card = active Boost timer bar (Pop-or-Forfeit left by `getUnusedComputeBoostStacks`, Stack right,
   enforced in the engine too; or "No boost running") + Auto-Boost pref; then per-tier rows — the ONE
   selected tier (pre-selected to the active boost's tier on arrival) shows the 3 Boost presets inline (`COMPUTE_ENTITY_CAP` 10 slots,
   Merge ratio `COMPUTE_MERGE_RATIO` 8, Unlock Auto-merge, `COMPUTE_MERGE_RESERVE_CAP` 8 reserve). Cores
   come from buying Boosters from the matching Data Lake, not minted from Memory. Full detail:
   **`docs/FOUNDRY_MECHANICS_REFERENCE.md`**, `docs/MAINPAGE_REFERENCE.md`, `docs/DESIGN_HISTORY.md`.
4c. **`ComputeFlopsPage/index.jsx`** — PP **Compute (Flops)** screen (page id `'compute'`), taking
   `{ game }`. Reached via AppNav once `isComputeFlopsPageRevealed` (spendable PP ≥ 100, latched in
   `computeFlops.pageUnlocked`). Ten tiers KFlops→QFlops (`COMPUTE_FLOPS_TIER_DEFINITIONS`), PP-funded
   on the same 10³ base ladder as Factory tiers, priced per-unit via `getCostEpochExponent` (not
   Factory's 8-buy blocks). Owned counts permanent across Prestige; per-cycle boost resets on
   Prestige. Pure renderer — full spec: `docs/ECONOMY_REFERENCE.md`'s "PP Compute (Flops)" section.
5. **`InfoPage/index.jsx`** — a static Guide page holding every mechanic's evergreen explanation in
   short bullets/sub-headings (what used to be MainPage's click-to-expand `InfoDetails` disclosures —
   Overview, Byte Foundry, Storage, Boosters, Compute (Flops), Latency, Scale Up, Overclock, Tier
   Autobuyers, Milestones, Prestige, Era ascension). Numbers come from the same `engine.js`/`layers.js`
   constants the game uses, so they can't drift. Reads no `useIncrementalGame` state — only pure
   constants/formulas. Header shows the app version (`v{version}` from `package.json` via build-time
   import) — the **only** in-app version surface. Reached via AppNav's Guide item.
6. **`MilestonesPage/index.jsx`** — Chapters / Era ascension status screen (autobuyer unlock
   milestones live once, on Perks → Unlocks — not repeated here). Chapters: the first KiloByte, Go Googol, Open
   Compute, Go Unbounded, Ascend an Era. Reached via AppNav → More (`page = 'milestones'`); always
   reachable, including during the Foundry gate. Takes `{ game }`. Pure renderer.
7. **`SettingsPage/index.jsx`** — always-reachable utilities via AppNav → More (`page = 'settings'`):
    Supporter pack (unlock code / dummy checkout), Cloud save (`CloudSaveSection.jsx`, only when
    `CLOUD_SAVE_ENABLED`: sign-in, upload/download, Delete account and data), Store
    (`StoreSection.jsx`, only when IAP is on), multi-slot saves, Prestige museum, Era ascension
    (Eras/Eons display + confirm-guarded `actions.eraAscend()`), Appearance (theme preference), Ops
    dashboard, Legal (`LegalSection.jsx`: Privacy Policy / Terms links), and Danger zone — Reset (full save wipe) and **Reset Byte Foundry** (Capacity /
    Storage / Compute + upgrades wipe to scratch; Combine / Upgrade Capacity / Upgrade Speed
    convenience-auto up to prior highs; smaller Disk sizes re-provision for free; Factory + Prestige kept). Takes `{ game, onReset,
    onResetByteFoundry, themePreference = 'system', onThemePreferenceChange }` (`onReset`/
    `onResetByteFoundry` are the confirm-guarded callbacks owned by `App.jsx`). Pure renderer
    aside from local form state.
8. **`DevModePage/index.jsx`** — dev-build-only sandbox, see "Dev Mode". Reached via AppNav → More
   (`page = 'dev'`), gate-exempt like Settings/Milestones. Takes `{ game }`.

## Dev Mode

A dev-build-only testing sandbox (`DevModePage`, reached via AppNav → More; entry and route render only
when `import.meta.env.DEV`, so production bundles contain neither). Toggling it first saves the loaded
state to the active slot, then redirects every save read/write to an isolated `'dev'` slot in
`game/storage.js` (`getActiveSlotId`/`isDevModeActive`), so dev edits never touch real progress. **Always: real-slot isolation is enforced at the storage layer** —
`setActiveSaveSlot`/`clearSaveSlot`/`clearAllSaveProgress` refuse (`{ ok: false, reason:
'dev_mode_active' }`) while Dev Mode is active. Quick-seed presets, the auto-generated Variables tree,
the raw state-JSON editor (`mergeStateForDevWrite`), and `SettingsPage`'s dev-gating:
`docs/DEVMODE_REFERENCE.md`.

## Economy model

### Pool-local resets

Each Storage pool has an independent end-of-progression reset, offered only at 9/9/9 disks, with a
completely full Data Lake, when the next Booster costs more than the lake can hold. It empties only that
pool's disks, buffer, and lake (Booster state and prior reset rewards remain) and permanently adds 1,000
units of lake-only capacity. The first reset fixes lake overflow speed at 50%; the second and later also
advance the pool through the existing bandwidth steps, non-final reward growth limited dynamically by
half the following pool's bandwidth. After reset the pool provisions its disks automatically and for
free, one at a time smallest-first, waiting for each disk to fill; while it rebuilds, later pools cannot
start new provisioning (already-active work may finish). Whenever all 9/9/9 disks are provisioned
(including before the first reset) — a status latched per lake (`boosterAuto`) for the whole Era, surviving pool resets, Reset Byte Foundry and Prestige — the lake's Booster control becomes a non-clickable cost label and
the lake automatically buys every affordable Booster until slots fill or the next cost exceeds capacity;
filling the lake at that wall enables the next reset. Pools never transfer or share resources through
this loop. Full detail: `docs/ECONOMY_REFERENCE.md`'s "Pool-local reset loop".

### Tiers, Prestige, Era ascension

There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Kilobytes` through `Quettabytes`. Every tier is bought directly with the base currency
(`MONEY_ID = 'base'`, display name "Bits") and, once owned, produces the tier immediately below it,
cascading down the ladder; `tier01` (Kilobytes) is the special case where cost is still Bits but
production is a whole-Byte amount (`BYTES_ID = 'bytes'`, displayed as `B`) credited to Bits at
`BITS_PER_BYTE` (8) per Byte. **Bytes and Bits are ONE pool** (`resources.base`) — there is no separate
Bytes balance; 8 Bits = 1 Byte everywhere (see `docs/DESIGN_HISTORY.md`). **Latency** (the global
tickspeed multiplier on MainPage, formerly "Tickspeed"/"Clock Speed") is paid from that Bits balance —
initial activation costs **10 Bytes (80 Bits)**. It unlocks once level 1 of tier01 is purchased; there
are no milestone bonus levels — every level compounds the same Overclock-scaled 1% step.
Reaching Money ≥ `PRESTIGE_THRESHOLD` (`GOOGOL * BITS_PER_BYTE` = 8e100 — "1 Googol Bytes," in Bits
since a Byte is 8 Bits) freezes the economy except for Prestige — unless `isUnboundedPrestigeUnlocked(state)`
is true (permanent `prestige.unboundedUnlocked` latch set the first time `prestige.count` reaches
`PRESTIGE_UNBOUNDED_MIN_COUNT` (100), or carried through Era ascension), in which case production
continues and Prestige is optional (see `isProductionFrozen`). **Era ascension** (`eraGame`) is a separate voluntary meta-prestige at **1 Googol unspent PP**
(`ERA_ELIGIBILITY_PP`): it awards **Eons** (+1 base, +1 per Eon Amplifier level — shop deferred to #414),
increments `era.count`, resets the full Foundry (generator upgrades, Disks, Data Lakes, compute ladder
entities, Memory/gate) plus the ordinary Factory cycle (`prestige.points`/`count`/`prestigeDoublePpLevel`
→ 0, `computeFlops.owned` → 0, `cumulativeBoost` fresh), while keeping automation unlocks/pause flags
(except Double PP level), tier/tickspeed autobuyer milestone objects, `prestige.unboundedUnlocked`,
museum, hyperscalers, Eon upgrade levels, Flops autobuyer unlock flags, and page latches. Era *N*
free-unlocks the *N*th Flops tier's autobuyer (KFlops at Era 1, …). Hyperscalers (bought with Eons in
#414) add permanent +0.01%/s each to every Factory tier's Flops multiplier via
`getHyperscalerFlopsBoostRate` — the engine/hook action (`buyHyperscaler`) is wired, but no page renders
a purchase control yet (deferred to #414, blocked pending maintainer-approved spend design). Full detail:
`docs/ECONOMY_REFERENCE.md`'s "Era ascension and Eons". Prestige Points are awarded by
`getPrestigePointsAwarded`: 1 base PP at 1 Googol Bytes, then 1 PP per `PRESTIGE_POWERS_PER_PP_BASE` (64)
additional money-exponent powers beyond Googol's own 10^100 exponent, scaled by permanent Double PP
upgrades (`prestigeDoublePpLevel` — each halves powers-per-PP until 1, then doubles PP-per-power; cost
`100^(level+1)` PP). `GOOGOL` (1e100) is still exported and used by the exponent-based formulas
(`getMoneyExponent`/`getPrestigeProgressPercent`) — only the live freeze/Prestige trigger moved to
`PRESTIGE_THRESHOLD`; see `docs/DESIGN_HISTORY.md` for why. MainPage's headline balance (`MoneyHero`) switches from Bits to whole Bytes once the balance reaches
8000 Bits (`formatMoneyBalance`, `MONEY_BYTES_DISPLAY_THRESHOLD`) — every other `formatCurrency` call
(costs, production, the Prestige-threshold overlay) keeps reading in Bits.

### Byte Foundry

Bytes are produced entirely by the **Byte Foundry** (`ByteFoundryPage`), a tap-to-earn screen every fresh
save passes through once before the main game — a ONE-TIME-EVER gate (`latchMainGameUnlocked`/
`intro.mainGameUnlocked`) gone permanently across every Prestige and Era ascension once Storage's
capacity threshold is reached. Tapping fills the **Data Stream** (Buffer-capped) which Combine turns into
a permanent Byte generator; **Upgrade Capacity** / **Upgrade Speed** grow it one at a time
(`queueIntroSpeedUpgrade`, `tickCapacityUpgradeDrain`; sit OUTSIDE the forced priority order). Displayed
Speed is derived (`getDataStreamSpeedBytesPerSecond`, exponent `getDataStreamSpeedExponent`); extra Disk
sizes need a Foundry reset (`unlockNextDiskSizeByFoundryReset`). Era ascension keeps the generator and
gate latch but resets Capacity (`buildEraIntroReset`). Recurring actions follow a **forced priority
order** Disk Fill > Provision Disk > Compute Boost (a lower one is disabled, in UI and engine, while a
higher one is available). An always-on auto-convert (`convertIntroBitsToKilobytes`/`tickIntroAutoInvest`)
turns Data Stream bits into free `tier01` units. Generator, Disks, Data Lakes, and every compute-ladder
entity (Core → … → Megacomputer) are PERMANENT across real Prestige; only Data Stream balance and
tier01's purchase-block progress reset per cycle. Nothing here ever fully freezes.

**Hard rules (full text and the rest of the Foundry mechanics: `docs/FOUNDRY_MECHANICS_REFERENCE.md`):**
- **Fill multiplier** (`FILL_MULTIPLIER_*`, `getFillMultiplierPercent`): displayed Speed/Bandwidth never
  change; a fill-dependent multiplier (1000% empty → 100% at 50% → 10% full (log-linear), ×(1 + tap bonus%) decaying
  1%/s, capped 2000%) scales only the real per-tick amount delivered (`getFillCurveDelta` integrates the curve so a 1s offline tick matches live 0.1s ticks).
- **Standing rule — `intro.capacity` keeps doubling plainly in binary** (IEC `KiB`/`MiB`, step 1024);
  non-binary (SI-clean/decade-power) transforms are for storage-pool-scoped values only
  (`getStoragePoolCapacity`, `getDecadePowerEquivalentBits`, `getSiCleanEquivalentBits`) — two earlier
  attempts shared one raw value between both displays and got this wrong (`docs/DESIGN_HISTORY.md`).
- **Pool liveness is Capacity-only**: a pool is live (visible, buffer/Bandwidth, read cache) once
  `intro.capacity` reaches `getPoolCapacityUnlockThresholdBits`, independent of disk builds
  (`getVisibleStoragePoolCount`). `isStoragePoolUnlocked`/`getUnlockedStoragePoolCount` stay
  disk-build-only and drive the disk ladder. Folding them into one primitive was tried and reverted.
- **Disks** (`provisionDisk`, `tickDiskAutoFill`, `tickDiskPull`, `tickDiskLevelOneCachePull`): ladder
  advances every `DISK_ARRAY_LADDER_CAP` (9) disks; Factory is funded **pull-based** from full disks,
  fully automatic (no click, no autobuyer gate). Disks/caches/builds are PERMANENT across Prestige.
  Stranded disks are never destroyed or swept into Bits; merges never cross a pool boundary.
- **Data Lakes** (`intro.dataLakes`): Booster control is "one click, one full fill-then-buy conversion,
  then stop" until the pool's era-long `boosterAuto` latch is set (then it auto-buys); `buyBooster` spends only banked lake units, outside the
  forced priority order; sub-sizes capped 9/9/9 (`DATA_LAKE_SUB_SIZE_DISK_CAPS`).
- **Display**: Disk labels bare numbers; pool/lake CAPACITY in its fixed unit
  (`formatDiskSizeInPoolUnit`); buffer BALANCE self-sizes (`formatPoolBalance`).

**The above is a summary only.** The full mechanic reference — the complete tap/combine/Speed
loop, auto-convert conversion mechanics, Storage's build/auto-fill/redeem lifecycle, Compute
Cores/Nodes/Boost, every forced-priority-order predicate, cost/production formulas, the (configurable,
growing) purchase block size and level system, Prestige Points and every PP-funded automation, the
per-tier and global tickspeed multipliers, the last tier's XP-funded tickspeed, Scale Up, Overclock,
Reset, the complete game state shape, and the engine function/constants tables — lives in
`docs/ECONOMY_REFERENCE.md`. Read it (and `docs/FOUNDRY_MECHANICS_REFERENCE.md` for Foundry/Storage/Lake/Boosters) before touching `src/game/engine.js`, `src/game/layers.js`,
`TIER_DEFINITIONS`, `ByteFoundryPage`/`StoragePage`/`ComputePage`, or any economy/prestige/tickspeed
constant or formula — and check `docs/DESIGN_HISTORY.md` first if you're about to change a
formula/gate a past iteration may already have tried and rejected (e.g. the `<=` vs. `===`
bank-redeemability check, the flat vs. dynamic transfer cost).

**Buy max mode** (unlocked after the first Prestige, `isBuyMaxUnlocked`; toggled on Perks → Toggles) — a per-device toggle
(`tens_buy_max_mode`, not game state) making each manual leveled purchase buy every affordable level:
`buyTierMaxLevels` for Factory tiers (FULL levels only; partial progress or an unaffordable full level
falls back to the ordinary single-level click) and `repeatPurchaseMax` for single-level ladders.
Detail: `docs/ECONOMY_REFERENCE.md`'s "Buy max mode".

Scale Up uses persisted, run-scoped `scaleUpTierCounts`: each claim doubles the current target and all
earlier tiers, while the newly recorded successor begins at ×1. Requirements are based on the target
tier's **completed levels** (`purchaseLevels − 1`): each of the first ten Scale Ups requires 3 completed
levels on the last unlocked tier; repeated final-tier claims then require 6, 9, 12, …. This is separate
from the re-reveal mechanic: after a reset, a tier already unlocked by a previous Scale Up within the
same Overclock re-reveals when its predecessor reaches 2 completed levels (`purchaseLevels` 3).
Overclock keys off the **final** tier's completed levels: first available at 5, then dynamically at (the
completed-level count the previous Overclock was taken at) + 3 — `overclockLastClaimCompletedLevels`,
not a fixed 5/8/11/14 ladder (Latency's Overclock-scaled 1% step is under "Tiers, Prestige, Era
ascension" above).

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

**Expand/collapse convention:** only a disclosure's name/label (pool title, tier label, Latency/Overclock
heading, money balance) toggles it — never the surrounding card/row, a chevron strip, or revealed content.
**No link styling:** it's a game — never underline (solid, dotted or on hover) just because something is
clickable; use `cursor: pointer` and a `:focus-visible` outline instead.

## Path aliases

`components/X` → `src/components/X`, `game/X` → `src/game/X`, `pages/X` → `src/pages/X`, `theme/X` →
`src/theme/X`, `save-migration/X` → `src/save-migration/X`, `services/X` → `src/services/X`. Use these bare aliases in imports, not
relative paths like `../../game/engine`. Directory imports resolve to that directory's
`index.jsx`/`index.js` (e.g. `import { ThemeProvider } from 'theme'` → `src/theme/index.jsx`).

## Theming

All component styling resolves to **semantic design tokens** defined once in `src/theme/tokens.js`
(`buildTheme(mode)` + `themes.dark`/`themes.light`), so the two themes — an evolved **dark** (default)
and a **light** theme — fall out of swapping palette values rather than forking components on mode.
This was the foundation for the now-complete UI-revamp epic (#132, all 8 sub-issues shipped, including
light mode's activation in #140). Fonts (`font.display` = Space Grotesk, `font.body` = Inter) are
locally bundled via `theme/fonts.js` — no runtime CDN fetch. Settings → Appearance drives
`<ThemeProvider mode>` from `tens_theme_preference` (`system` default, or `light`/`dark`); System
follows `prefers-color-scheme`. Reset / `clearGameState` do not clear the theme preference. Full
per-file breakdown: `docs/THEMING_REFERENCE.md` — read it before touching `src/theme/*`.

## PWA support

The app is installable as a PWA on Android Chrome and iOS Safari — home-screen icon, standalone display,
offline-capable after a first visit — via `vite-plugin-pwa` (`generateSW` strategy, no custom runtime
caching), without any app-store presence. A deliberate choice over Capacitor/native app-store publishing
or a React Native rewrite; see `docs/DESIGN_HISTORY.md` for the trade-off reasoning. Manifest/icons/
meta-tag details, and why `localStorage` save data is unaffected by the service worker's precache, are in
`docs/PWA_REFERENCE.md`. Read it before touching `vite.config.js`'s `VitePWA` block, the manifest
fields, or `public/pwa-*`/`scripts/generate-pwa-icons.mjs`.

### Native apps (Capacitor — #70)

Android and iOS apps wrap the same web build via Capacitor 8 (not yet store-signed):

- `@capacitor/core`/`android`/`ios` + `@capacitor/cli`; `capacitor.config.js` names the app **Tens**
  (`appId: com.mohanpednekar.tens`, `webDir: dist`). It is ESM loaded by the CLI via `require(esm)`
  (`export { config as 'module.exports' }`); `includePlugins` syncs `@capacitor/splash-screen` always
  and AdMob / RevenueCat only when `VITE_TENS_ADS_ENABLED` / `VITE_TENS_IAP_ENABLED` are `true` in
  the shell env, so flags-off binaries carry no ad/billing SDK or permission. `android/` (Gradle) and `ios/` (Xcode project,
  Swift Package Manager — no CocoaPods) are committed; regenerate only via `npx cap add`, never by hand.
- Minimum OS = oldest still receiving security updates (maintainer policy; no older OS support):
  Android 14 (`minSdkVersion = 34`, `android/variables.gradle`) and iOS 18
  (`IPHONEOS_DEPLOYMENT_TARGET`, which `cap sync` also writes into `CapApp-SPM/Package.swift`; `.v18`
  needs `experimental.ios.spm.swiftToolsVersion: "6.0"` in `capacitor.config.js`). Raise both as
  vendors drop security support.
- `yarn build:capacitor` sets `CAPACITOR=1` so Vite uses `base: './'` and omits `VitePWA` — a
  Workbox SW under Capacitor's origin is redundant/harmful; `yarn build` for Pages is unchanged.
  Then `cap sync` (or `yarn cap:android`/`yarn cap:ios`) copies `dist/` into both projects.
- Native icons/splash come from `yarn gen-pwa-icons` (see `docs/PWA_REFERENCE.md`). Splash hides on
  React mount (`services/nativeShell.js`); edge-to-edge via `SystemBars.insetsHandling: 'native'` +
  `viewport-fit=cover` + per-page `env(safe-area-inset-*)` padding.
- **Release:** compile/target SDK 36; `android/app/build.gradle` signs release from
  `TENS_UPLOAD_*` Gradle props/env/`android/keystore.properties` (gitignored; release tasks fail if
  unset), runs R8 (`minifyEnabled` + `shrinkResources`), derives versionName/versionCode from
  `package.json`, and fails if Play Billing < 8 resolves. Manifest declares only `INTERNET`.
  Full steps: `docs/RELEASE_ANDROID.md`, `docs/RELEASE_IOS.md`, `docs/STORE_LISTING.md`.
- **Optional features (all off by default):** `viteConfigFactory.js`'s `resolveFeatureFlags` +
  `virtual:tens-features` module export the flags and one loader per feature — `null` when off, so
  ad/IAP/Firebase code is never bundled (web builds can never enable ads/IAP). Cloud save turns on
  when `VITE_FIREBASE_API_KEY`/`_PROJECT_ID`/`_APP_ID` are set. See `docs/DESIGN_HISTORY.md`.
- `.github/workflows/mobile-build.yml` builds an unsigned debug APK, a throwaway-key-signed minified
  release (AAB + emulator boot check via `scripts/android-boot-smoke.sh`) and an iOS Simulator `.app`
  as workflow artifacts (manual dispatch, or native-path changes) — see `docs/AUTOMATION.md`.
- The one rewarded-ad placement is the offline notice's **▶ 100% speed** bonus (`claimOfflineAdReward`,
  `applyOfflineRewardBonus` — see `docs/ECONOMY_REFERENCE.md`'s "Offline progress").
- Saves are `localStorage` inside each app's WebView, separate from the browser/PWA's saves; the
  optional cloud save (`storage.js` `serializeSaveForExport`/`importSaveJson`) bridges devices.

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
  the Buy/tickspeed-multiplier/Unlock/bulk-mode/Prestige buttons also carry an explicit `aria-label` with the
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
- `yarn test` is green (2141 tests). The four core test files (`engine.test.js`, `layers.test.js`,
  `storage.test.js`, `App.test.jsx`) assert against the current tier/resource id scheme (`MONEY_ID =
  'base'`, display name "Bits", symbol `b`; Bytes unit marker `BYTES_ID = 'bytes'` (no stored pool — Bits only), symbol `B`; tier ids
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
  (`prettifySegment`/`isEditableScalar`/`setValueAtPath`). The rest of the 30 test files (`yarn test` total) sit beside their source — `save-migration/`, `navAttention`,
  `components/*` (Button, BoostBadge, OfflineProgressNotice), `services/*` (config, monetization, rewardedAdCache,
  cloudSave/deleteAccount), `game/useIncrementalGame.offlineReward.test.jsx`, `pages/SettingsPage/sections.test.jsx`,
  and `scripts/*.test.js` (maintainer checklist, iOS plist, adversarial marker, low-risk bar, bump-version,
  graphify freshness, failure classifier, workflow-shell lint, stalled-PR sweep, autonomous-maintenance workflow) —
  all picked up by Vitest's default glob since `vite.config.js`'s `test` block sets no custom `include`.

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
- Current specs (see "Repo layout" `e2e/` for one-line descriptions): `golden-path`, `autobuyer-reload`,
  `prestige` (seeding Money ≥ `PRESTIGE_THRESHOLD`; first-time `FullScreenOverlay`), `meta-prestige`
  (seed at 1 Googol PP → Settings Era ascension → assert `era.count`, Eons award, and the permanent
  `intro.mainGameUnlocked` latch carrying forward), `data-lake`, and `visual-regression` (Linux-only
  full-page screenshot baselines of Byte Foundry/Byte Factory in both themes; see `e2e/README.md`).
- **Not wired into `ci.yml`** — deliberately. Wiring it in (installing Playwright's browser on the
  runner, adding a job/step) means editing `ci.yml`, which is off-limits to `autonomous-maintenance.yml`
  (see docs/AUTOMATION.md) — a human needs to do that directly. `yarn test:e2e` is a local/manual suite
  for now.

## Security notes

- Dev and test-watch servers bind to `127.0.0.1` explicitly (`--host 127.0.0.1`) — do not change to `0.0.0.0`.
- All purchases, autobuyer upgrades, and prestige are validated inside `engine.js`, not just via disabled
  UI buttons — the engine re-checks affordability/unlock state on every call.
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
involved. It's a dev-tool aid for Claude Code sessions, not a runtime dependency — nothing under
`graphify-out/` is imported by `src/`.

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
