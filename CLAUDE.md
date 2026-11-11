# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in this repository. It documents **current behavior only** —
signatures, constants, state shape, conventions. For the *why* (superseded formulas, incident
write-ups, empirical simulation results, UI trade-offs), see `docs/DESIGN_HISTORY.md`; check it before
changing a formula, workflow, or mechanic a past iteration may already have tried and rejected.

## Project

**Tens** — a React incremental game; every mechanic (costs, production, prestige) is themed around
powers of ten. No routing library, no backend — state lives in React and persists to `localStorage`.
`App.jsx` switches top-level screens via a plain `useState` toggle plus a shared bottom `AppNav`
(Foundry → Power → Compute → Factory → Firmware → More) — not a router (see "Architecture"):
`ByteFoundryPage` (tap-to-earn bootstrap; a one-time-ever mandatory gate on a save's very first cycle,
until Storage's own capacity threshold is reached — never again after that, permanently revisitable),
`MainPage` (tier ladder), `PerksPage` (after first Prestige: 🤖 Automation / ✦ Prestige icon
tabs — one row per automation spanning unlock → pause → speed; Compression, Overflow mode, Buy max), `InfoPage` (Manual), `ComputePage`/`ComputeFlopsPage` (Power
once Foundry Compute unlocks; PP Flops Compute at 100 PP). `StoragePage` is not an AppNav destination —
disk arrays live under Foundry as continuous Data Stream + Storage sections on the same screen (no
second-level tabs). More (Manual / Releases / Settings) is always available, including during the
Byte Foundry gate; only Factory stays progress-gated. A third More entry, **Dev Mode**
(`DevModePage`), renders only in a dev build (`import.meta.env.DEV`) — see "Dev Mode".

## Tech stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 19 | JSX transform enabled |
| Vite | 8 | OXC-based; JSX files **must** use the `.jsx` extension |
| Vitest | 5 | jsdom environment, globals enabled |
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
yarn build:dev    # dev build (Dev Mode enabled, base /tens/dev/, no SW) → dist/dev/; deploy.yml publishes it beside prod
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

Single test file or name: `yarn test src/game/engine.test.js` (vitest run <path>); `yarn test -t "buyTier"`.

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
commit, a fix in progress, unrun tests). Always mark ready the moment it reflects genuinely finished work
(local checks pass, nothing further planned — maintainer standing rule) — a draft isn't reviewed or auto-merge-eligible, so
leaving a finished one draft just stalls it. Applies to every PR, autonomous or interactive.

**Verification effort scales with how public the PR is**: minimal testing (one `yarn test` after a
coherent batch of changes, not after every edit) before anything is opened; one full local check at
draft creation; multiple rounds of adversarial review (Claude plus any bots/humans) once marked ready,
looping until nothing new turns up. None of this slows `pr-auto-merge.yml`'s three immediate paths
(below and "Automation workflows": qualifying human approval; low-risk diff on green checks; adversarial `APPROVE` on a low-risk diff)
nor the agent-enabled auto-merge on any non-workflow `APPROVE` (below). The 10-minute quiet period
applies only when none of those fires and a session merges directly (e.g. `gh pr merge`): wait for CI
green plus 10 minutes with no further review activity. Detail: `docs/AUTOMATION.md`'s "PR review &
testing cadence".

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
  auto-merge on `APPROVE`d PRs (this bullet and the next) only; it is not permission to force-merge, push to `main`, approve
  the PR as a GitHub review, or bypass CODEOWNERS on `.github/workflows/**`.
- **`APPROVE` but not low-risk, diff touches no `.github/workflows/**` file**: mark ready and enable
  GitHub auto-merge (`gh pr ready <pr>` then `gh pr merge <pr> --auto --merge`) — maintainer standing
  rule. The `main` ruleset currently requires no human approval, so this merges on green required
  checks with no human review; the adversarial `APPROVE` is the gate.
- **`APPROVE` but diff touches `.github/workflows/**`**: mark ready for the maintainer's review; never
  enable auto-merge (CODEOWNERS isn't enforced by the ruleset yet, so this exclusion is the only gate).
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

Auto-merge silently sits inert once a PR (any auto-merge source) falls out of sync with its base — GitHub
won't merge a conflicted PR however green its checks. Check `mergeable_state` whenever there's reason to
look (a "merge conflict" notice, a push to base, a routine check-in) and, if conflicted, resolve
immediately: merge (or rebase, matching repo convention) the base into the PR branch, resolve for real
(never blindly take one side wholesale on a file with actual logic), rerun `yarn test`, push. Prefer merge
over rebase when review comments/approvals are tied to specific commits (rebasing orphans them). This applies to trivial
conflicts (unrelated doc/changelog bullets; `graphify-out/` generated files — safe to take incoming, then
regenerate) and substantive ones (overlapping logic) alike; the latter needs a real read of both sides,
not `git checkout --theirs`.

Before merging any PR that touches `TIER_DEFINITIONS` or other economy constants/formulas in
`src/game/layers.js` (autonomous or interactive), run the `economy-change-review` skill
(`.claude/skills/economy-change-review/SKILL.md`): a narrow, mechanical cross-check of the diff against
the originating issue's approved spec table and Explicit Authorizations section — catching drift (a
wrong `baseCost` exponent, a mis-chained `producesResourceId`, a migration missing an old tier id, an
unauthorized economy change) that general review doesn't look for. It supplements, not replaces, the
ordinary review flow.

**Aesthetic review on every UI change.** Any change to what a player sees (layout, spacing, font size, alignment, colors, new/removed elements) needs a visual check before the PR is marked ready: render the real screen (Playwright at ~430px wide, both themes; seed `localStorage` as in "End-to-end testing"; throwaway scripts, not committed), look at the screenshot, and fix anything misaligned, cramped, off-center, inconsistent with neighbouring components (same font sizes/bar styles for the same kind of value), or that changes a component's size unintentionally. Share the screenshots with the user. Passing tests don't cover this.

The `code-reviewer` subagent (`.claude/agents/code-reviewer.md`) does an adversarial, evidence-based,
read-only review (every finding verified against the checked-out code, file:line-cited, CONFIRMED/PLAUSIBLE findings, explicit verdict, checked-clean list,
stated coverage gaps). Spawn it via the Agent tool before merging any non-trivial change or when asked
to review a branch/PR; on economy diffs it folds in the `economy-change-review` cross-check as a
required step rather than replacing it.

To file a `claude-task` backlog issue, split a large feature into a sequence of them, or tighten an
existing spec, use the `file-task-issue` skill (`.claude/skills/file-task-issue/SKILL.md`): template,
size/priority labels, the `Blocked by #N` conflict-avoidance heuristic, the `blocked` label's two
meanings, epics/sub-issues, the narrow no-PR cases, and the "specs go stale" lesson (#45/#138).

## Issue tracking for interactive sessions

**Maintainer checklist (#62).** Issue #62 ("Maintainer Action Items") is pinned at the top of the Issues
tab via GitHub's native pinned-issues feature and deliberately carries **no labels** — it is not a
`claude-task` work item, only a standing manual setup checklist that #63 keeps auto-verified. Do not add
`claude-task` to it or unpin it without understanding why.

Every session that does non-trivial work — interactive, not only `autonomous-maintenance.yml` — files a
GitHub issue tracking it and keeps it updated. File it once scope is clear (before or alongside the first
commit); the `file-task-issue` skill's Goal/Context/Spec structure makes a good body. **Don't** apply the
`claude-task` label (reserved for `autonomous-maintenance.yml`'s Phase A backlog; a live tracking issue
so labeled would be picked up as unclaimed work), and don't file it from the `claude-task.yml` template
(its frontmatter auto-applies the label) — file a blank issue and borrow the sections by hand. Comment at
meaningful status changes (PR opened, review round landed, work blocked/descoped); close it when the PR
merges or the task concludes.

For work that naturally splits into multiple pieces, file a parent "epic" issue and attach each piece as
a GitHub sub-issue — the `file-task-issue` skill's "Epics and sub-issues" convention (see #87–#92,
#132) — so the effort collapses to one row. A trivial, one-off change (a typo fix, answering a question
with no code change, a tiny doc-only tweak) doesn't need a tracking issue — use judgment; the point is
visibility into real work, not process overhead.

For work roughly the `file-task-issue` skill's `size:M`/`size:L` threshold (a `size:S`-shaped change
stays one tracking issue), split the epic's sub-issues along **coding / testing / documentation** phase
lines rather than only by feature-slice, so the coding sub-issue can land without waiting on the other
two, while the deferred ones stay tracked with the epic's context:

- **Coding** — the core implementation. Its PR keeps the hard requirements: `yarn test` green, tests for
  the core logic, a `CHANGELOG.md` entry for behavior changes, and — if it touches anything `CLAUDE.md`
  documents (signatures, constants, state shape, conventions) — `CLAUDE.md` updated in the *same commit*
  ("Documentation" below). That same-commit rule is a hard invariant, not relaxed by this split; only work
  never required to land with the code gets deferred.
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
milestone is `v0.7.0`, targeting Era ascension / Reboot (`#407` / `#411–#414`, in progress).
`scripts/sync-release-milestones.sh` keeps milestones and assignments idempotent, running on every
`autonomous-maintenance.yml` invocation.

## Automation workflows

The Claude-side and GitHub automation workflows under `.github/workflows/` run unattended — opening
and fixing up PRs, and merging them only past an approval boundary: only a low-risk diff on an allowlisted
bot-authored branch (`scripts/pr-low-risk-eligible.sh`) merges without human approval — on green checks
alone, or via an adversarial `APPROVE` marker on that same eligible diff. Sessions (interactive and autonomous) also enable
auto-merge on any adversarially-`APPROVE`d PR not touching `.github/workflows/**` (see "Pull requests");
every other PR waits for human approval. Their git/GitHub write operations authenticate via the
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

- `devin-autonomous-maintenance.yml` — Devin-CLI counterpart, every 4h (UTC :17), opens `devin/auto-*` PRs
  (auth `DEVIN_CLI_CREDENTIALS`; git/`gh` via `GH_AUTOMATION_PAT`). The 5-open-PR ceiling counts `devin/auto-*` +
  `claude/auto-*` together. May edit workflows incl. its own, but workflow-file changes stay human-gated
  (`pr-auto-merge.yml` excludes `.github/workflows/**` from green-checks auto-merge). Every change still lands via PR. Follows the Pull-requests
  convention; post-run feedback is `autonomous-pr-followup.yml`'s job.
- `devin-workflow-health.yml` — daily 00:00 UTC; files an `automation-failure` issue if the Devin workflow doesn't
  parse, hasn't started in 26h, or its latest completed run wasn't `success`.
- `pr-conflict-sweep.yml` — on every push to `main`, flags newly conflicted open PRs (on `claude/auto-*`/`devin/auto-*`
  the comment triggers the follow-up agent to merge-and-resolve).
- `release.yml` — deterministic: on a `package.json` push to `main`, tags `v<x.y.z>` if absent and creates the GitHub
  Release from that version's `CHANGELOG.md` section ("Changelog convention").
- `revert-deploy.yml` — manual only (#594): given a known-good `target_sha`, opens a PR restoring `main`'s tree to it
  (never pushes to `main`).
- `autonomous-pr-followup.yml` (review comments/CI failures on `claude/auto-*`/`devin/auto-*`),
  `dependabot-pr-followup.yml` (failing checks on `dependabot/*` PRs when the bump broke call sites; Phase 0 owns
  `@dependabot rebase`), `pr-auto-merge.yml` (native auto-merge on human approval, or green checks alone for
  `claude/*`/`devin/auto-*` meeting the low-risk bar), `automation-self-heal.yml` (draft `claude/self-heal-*` fix or
  `automation-failure` issue for failed orchestration runs; never edits `ci.yml`/`deploy.yml`/itself).

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
economy/game-rule behavior, or file layout documented below, update the corresponding
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
contracts, `docs/THEMING_REFERENCE.md`/`docs/PWA_REFERENCE.md`/`docs/NATIVE_APPS_REFERENCE.md`/`docs/AUTOMATION.md` for their own
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
  CLAUDE.md, settings.json   ← graphify pointer; SessionStart hook ("Interactive session startup") + graphify
                               PreToolUse hooks (the autonomous workflow reads neither; it has its own inline settings)
  hooks/session-start.sh     ← yarn install --frozen-lockfile + yarn test at session start; always exits 0
  agents/                    ← code-reviewer (read-only review, "Pull requests"); dev-team roles: designer (opus,
                               spec), programmer (sonnet, implement), qa (haiku, verify)
  skills/                    ← dev-team (designer → programmer → qa → code-reviewer), economy-change-review,
                               file-task-issue, simulate-run-times, optimize-ai-files, graphify (third-party,
                               tool-generated — not hand-edited)
docs/                        ← DESIGN_HISTORY.md (the "why": superseded formulas, incidents, rejected alternatives
                               — check before changing a formula/workflow/mechanic a past iteration may have tried),
                               AUTOMATION.md, ECONOMY_REFERENCE.md, FOUNDRY_MECHANICS_REFERENCE.md (Byte Foundry/
                               Storage/Disks/Data Lakes/Power; read before touching ByteFoundryPage/ComputePage/disk+
                               lake engine code), MAINPAGE_REFERENCE.md (incl. ComputePage), COMPONENTS_REFERENCE.md
                               (component props/styling), THEMING_REFERENCE.md, PWA_REFERENCE.md,
                               NATIVE_APPS_REFERENCE.md, DEVMODE_REFERENCE.md, RELEASE_ANDROID/IOS.md, STORE_LISTING.md
src/
  game/
    layers.js             ← TIER_DEFINITIONS + all game constants (single source of truth)
    engine.js             ← pure state functions (no React, no side effects)
    navAttention.js       ← pure predicates for AppNav attention dots (high/normal; Storage cues fold into Foundry;
                            Compute Flops affordability → `compute`)
    useIncrementalGame.js ← React hook: engine ↔ useState + localStorage + tick timer
    storage.js            ← localStorage read/write; every load goes through save-migration/, then forward field
                            merge (`mergeState`); multi-slot saves + Supporter entitlement (unlock code / dummy
                            checkout), clearSaveSlot / clearAllSaveProgress (never revokes unlock), separately keyed
                            last-save timestamp for offline progress (slot 0 keeps legacy `tens_game_state` keys).
                            Owns Dev Mode's isolated `'dev'` slot ("Dev Mode").
    save-migration/       ← `adaptSaveForCurrentSchema(raw)` → current-compatible state or failure; runs on every
                            load (DESIGN_HISTORY.md "Save persistence")
  components/             ← prop contracts/styling: docs/COMPONENTS_REFERENCE.md (Button, Money, StatCard, ...)
    AppNav                ← fixed bottom bar Foundry → Power → Compute → Factory → Firmware → More; Factory omitted
                            during the Foundry gate; attention dots via navAttention.js
    AppMenu               ← More sheet — Manual / Releases / Settings (always reachable; Reset / Reformat Byte
                            Foundry only in Settings → Danger zone)
    Button (`.jsx`)       ← semantic `variant` prop → theme tokens; deprecated raw `color` still supported
    DiskArrayRow          ← one Disk array's status `{ actions, size, state }`; only click = empty write-cache-size
                            disk → `actions.expediteDiskFill(size)`; shared by ByteFoundryPage and StoragePage (why standalone:
                            DESIGN_HISTORY.md)
    DataLakePanel         ← one Data Lake block `{ actions, state, bare, tierIndex }`, embedded per pool card
    icons.js              ← shared glyphs (`COST_ICON` 🏷️ marks every cost)
    BoostBadge, BoostTimerBar, SpeedDetailsPopover, LeadIcon, Switch, Money, BuyMaxToggle (renders nothing until
    `isBuyMaxUnlocked`), ConfirmDialog, OfflineProgressNotice, StatCard — see COMPONENTS_REFERENCE
    IncompatibleSaveNotice ← blocking overlay when a load cleared a pre-schema save; single **Start fresh** action;
                            rendered by `App.jsx` when `incompatibleSaveReason` is set
  pages/                  ← ByteFoundryPage, StoragePage, ComputePage, ComputeFlopsPage, MainPage, PerksPage,
                            InfoPage, MilestonesPage, SettingsPage, DevModePage (+ `stateFields.js`: pure
                            Variables-tree helpers) — roles in "Architecture"; layout in MAINPAGE_REFERENCE.
                            Page ids: `'foundry'` (also holds Storage), `'boosters'` (Power), `'compute'` (Flops),
                            `'game'` (Factory), `'perks'` (Firmware), `'milestones'`, `'info'`, `'settings'`, `'dev'`
  theme/                  ← tokens.js (design-token source of truth: per-mode color/shadow/tier-accent +
                            mode-independent space/radius/motion/font/type; `buildTheme(mode)`, `themes.{dark,light}`),
                            fonts.js (locally bundled Space Grotesk/Inter), contrast.js (WCAG utility), GlobalStyle.js,
                            index.jsx (`<ThemeProvider mode>`) — THEMING_REFERENCE
  services/               ← config.js (feature flags, AdMob/RevenueCat ids, `IAP_PRODUCTS`, policy URLs),
                            `IS_NATIVE_BUILD`; monetization/ (`MonetizationService`: `init`/`showRewarded`/`purchase`/`restore`/
                            `getEntitlements`; `noop.js` for web/flags off, `admobAdapter` + `rewardedAdCache` — one video
                            preloaded at init and after each show, refreshed past 55 min — `revenueCatAdapter`; composed by
                            `getMonetizationService()`), cloudSave/ (Firebase Auth email/password + Firestore `saves/{uid}`,
                            `deleteAccountAndData`: reauth → data → user), nativeShell.js (hide splash, init monetization)
  App.jsx                 ← root; owns the single `useIncrementalGame()` call, wraps <ThemeProvider><GlobalStyle/>,
                            switches pages via local `page` useState (default `'game'`; legacy `'storage'` →
                            `'foundry'`) — not a router — plus shared `AppNav` and `AppMenu`.
                            `showingFoundry = !GATE_EXEMPT_PAGES.has(page) && (!intro.mainGameUnlocked ||
                            page === 'foundry')`; `intro.mainGameUnlocked` is a permanent latch, so the gate exists
                            only on a save's very first cycle. Detail: MAINPAGE_REFERENCE "App.jsx routing and the Foundry gate"
  index.jsx, reportWebVitals.js ← ReactDOM entry; optional web-vitals reporter (no-op, no callback)
capacitor.config.js, android/, ios/ ← Capacitor wrap ("Native apps")
vite.config.js            ← thin wrapper over `viteConfigFactory.js` (aliases, dev/test server, VitePWA — skipped when
                            `CAPACITOR=1`, along with the `/tens/` base; split out so `capacitorConfig.test.js` can pin that path —
                            `import.meta.url` isn't a `file:` URL under Vitest)
firestore.rules           ← owner-only `saves/{uid}` rules; stryker.config.json ← Stryker mutation testing of `engine.js`
                            (weekly non-blocking `mutation-testing.yml`; `yarn stryker run`)
playwright.config.js, e2e/ ← real-browser suite, specs in "End-to-end testing"
scripts/                  ← bump-version.mjs ("Changelog convention"); generate-pwa-icons.mjs (`yarn gen-pwa-icons`, not
                            in the build; re-run only if the icon design changes); adversarialReviewMarker.js
                            ("Pull requests"); pr-low-risk-eligible.sh, enable-auto-merge-if-eligible.sh,
                            resolve-pr-threads.sh (`list` read-only; `resolve` takes explicit IDs, never bulk; only repo-owner/
                            bot-authored `claude/*`/`devin/*` PRs; used by `autonomous-maintenance.yml` and
                            `autonomous-pr-followup.yml`), backlog-issue-hygiene.sh, epic-407-issue-hygiene.sh,
                            sweep-stalled-auto-prs.sh (#60), sync-release-milestones.sh, configure-ios-plist.mjs,
                            android-boot-smoke.sh, lint-workflow-shell.mjs, verify-maintainer-checklist.mjs —
                            roles in docs/AUTOMATION.md (except resolve-pr-threads/generate-pwa-icons/configure-ios-plist, above and
                            in their own headers); most have a sibling `*.test.js`
public/                   ← generated PWA icons, favicon.ico, robots.txt (old CRA `index.html`/`manifest.json`/`logo*.png`
                            removed — DESIGN_HISTORY.md)
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
   `dismissOfflineProgress`/`resetGame`) for the "Resumed from sleep" notice only past
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
   is false (AppNav omits Factory; More stays), permanently latched true the instant Storage's
   capacity threshold ("1 KiB") is crossed (`latchMainGameUnlocked`/`isStorageUnlocked`) — one-time-ever,
   never resets. Once latched, the Data Stream tile itself is the tap target (`actions.tapIntroBit`).
   Shows Data Stream (shared Compile/Bitrate/Capacity + Provision Disk in its own card) then one `PoolCard`
   per VISIBLE pool (`getVisibleStoragePoolCount`: PURE Capacity-based, independent of
   `isStoragePoolUnlocked`/`getUnlockedStoragePoolCount`, which stay disk-build-only — see "Pool liveness"
   below); each pool embeds its `DiskArrayRow`s and `DataLakePanel` (`bare`, `tierIndex={poolIndex}`).
   Disk Fill is automatic. Every action is gated by the forced priority order — Data Lake Booster
   purchases, its capacity Upgrade, and Upgrade Capacity / Bitrate are the three exceptions. Pool/staging/
   Bandwidth/Provision Disk/queue detail: **`docs/FOUNDRY_MECHANICS_REFERENCE.md`**; UI layout:
   `docs/MAINPAGE_REFERENCE.md`; formulas: `docs/ECONOMY_REFERENCE.md`; component contracts:
   `docs/COMPONENTS_REFERENCE.md`.
4a. **`StoragePage/index.jsx`** — thin reusable every-size DiskArrayRow list (ascending, via
   `getDiskSizesToShow`) — NOT the Provision Disk button, which stays on ByteFoundryPage. Takes
   `{ game }`. Primary UI path is Foundry's continuous sections; this file remains for reuse/tests. A
   pure renderer ("engine re-validates, UI just mirrors it", like every page here).
4b. **`ComputePage/index.jsx`** — Foundry **Power** screen (page id `'boosters'`; player label only), `{ game }`; reached
   via AppNav once `isComputeCoreConversionUnlocked`. Hosts the nine-boundary merge chain (Cell → Battery → … → Fusion,
   "Charge up"/"Auto-charge"; ⚡ Charge button = 1 unit/s top→bottom row then instant 8→1, `startComputeCharge`/`tickComputeCharges`) behind a later one-time `intro.computeMergePageUnlocked` reveal. "Compute" names the
   page/feature only — entities drop the word in every player-visible label. Deliberately terse (icon-only controls,
   full sentence in `title`/`aria-label`; mechanic prose lives in the Manual). Top card = active Boost timer bar
   (Pop-or-Forfeit left by `getUnusedComputeBoostStacks`, Stack right, enforced in the engine too) (Auto Boost is automatic: one token per automated charge start, `autoBoostFromTier`; its Switch + preset, like Auto-charge's pause Switch `computeAutoChargeEnabled`, live on Firmware → Automation → Power Automation);
   then per-tier rows — the ONE selected tier shows the 3 Boost presets inline. Constants: `COMPUTE_ENTITY_CAP` 10,
   `COMPUTE_MERGE_RATIO` 8, `COMPUTE_MERGE_RESERVE_CAP` 8. Cells (`computeCores`) are bought from the matching Data Lake,
   not minted from Capacity. Detail: `docs/FOUNDRY_MECHANICS_REFERENCE.md`, `docs/MAINPAGE_REFERENCE.md`, `docs/DESIGN_HISTORY.md`.
4c. **`ComputeFlopsPage/index.jsx`** — PP **Compute (Flops)** screen (page id `'compute'`), `{ game }`; AppNav once
   `isComputeFlopsPageRevealed` (spendable PP ≥ 100, latched in `computeFlops.pageUnlocked`). Ten tiers Cores→Superclouds,
   outputs KFlops→QFlops (`COMPUTE_FLOPS_TIER_DEFINITIONS`; page keeps "Compute" + 🖥), PP-funded on the same 10³ ladder as Factory tiers, priced
   per-unit via `getCostEpochExponent` (not 8-buy blocks). Owned counts permanent across Prestige; per-cycle boost resets.
   Pure renderer — spec: `docs/ECONOMY_REFERENCE.md` "PP Compute (Flops)".
5. **`InfoPage/index.jsx`** — a static Manual page holding every mechanic's evergreen explanation in
   short bullets/sub-headings (what used to be MainPage's click-to-expand `InfoDetails` disclosures —
   Overview, Byte Foundry, Storage, Power, Compute (Flops), Clock Speed, Scale Up, Overclock, Tier
   Autobuyers, Releases, Prestige, Sleep mode, Reboot). Numbers come from the same `engine.js`/`layers.js`
   constants the game uses, so they can't drift. Reads no `useIncrementalGame` state — only pure
   constants/formulas. Header shows the app version (`v{version}` from `package.json` via build-time
   import) — the **only** in-app version surface. Reached via AppNav → More → Manual.
6. **`MilestonesPage/index.jsx`** — Releases / Reboot status screen (autobuyer unlock
   milestones live once, on Firmware → Automation — not repeated here). Releases: v1.0 The first Kilobyte, v2.0 Go Googol, v3.0 Open
   Compute, v4.0 DeGoogoled, v5.0 First Reboot. Reached via AppNav → More (`page = 'milestones'`); always
   reachable, including during the Foundry gate. Takes `{ game }`. Pure renderer.
7. **`SettingsPage/index.jsx`** — always-reachable utilities via AppNav → More (`page = 'settings'`):
    Supporter pack (unlock code / dummy checkout), Cloud save (`CloudSaveSection.jsx`, only when
    `CLOUD_SAVE_ENABLED`: sign-in, upload/download, Delete account and data), Backup / Restore
    (`ManualSaveSection.jsx`, always: copy/download/paste/file → `applyCloudSave`), Store
    (`StoreSection.jsx`, only when IAP is on), multi-slot saves, System log, Reboot
    (Reboots/Kernels display + confirm-guarded `actions.eraAscend()`), Appearance (theme preference), Task
    Manager, Legal (`LegalSection.jsx`: Privacy Policy / Terms links), and Danger zone — Reset (full save wipe) and **Reformat Byte Foundry** (Capacity /
    Storage / Compute + upgrades wipe to scratch; Compile / Upgrade Capacity / Upgrade Bitrate
    convenience-auto up to prior highs; smaller Disk sizes re-provision with no provisioning cost (one buffer fill per disk); Factory + Prestige kept). Takes `{ game, onReset,
    onResetByteFoundry, themePreference = 'system', onThemePreferenceChange }` (`onReset`/
    `onResetByteFoundry` are the confirm-guarded callbacks owned by `App.jsx`). Pure renderer
    aside from local form state.
8. **`DevModePage/index.jsx`** — dev-build-only sandbox, see "Dev Mode". Reached via AppNav → More
   (`page = 'dev'`), gate-exempt like Settings/Releases. Takes `{ game }`.

## Dev Mode

A dev-build-only testing sandbox (`DevModePage`, reached via AppNav → More; entry and route render only
when `import.meta.env.DEV`, so production bundles contain neither; `yarn build:dev` forces it on and is
deployed at `/tens/dev/`). Toggling it first saves the loaded
state to the active slot, then redirects every save read/write to an isolated `'dev'` slot in
`game/storage.js` (`getActiveSlotId`/`isDevModeActive`), so dev edits never touch real progress. **Always: real-slot isolation is enforced at the storage layer** —
`setActiveSaveSlot`/`clearSaveSlot`/`clearAllSaveProgress` refuse (`{ ok: false, reason:
'dev_mode_active' }`) while Dev Mode is active. Quick-seed presets, the auto-generated Variables tree
(AppNav-style area tabs + search; Switch / power-of-ten number inputs), the raw state-JSON editor (`mergeStateForDevWrite`), and `SettingsPage`'s dev-gating:
`docs/DEVMODE_REFERENCE.md`.

## Economy model

### Pool-local flushes

Each Storage pool has an independent end-of-progression **flush** (`flushStoragePool`; formerly "reset"), offered only at 9/9/9 disks, with a
completely full Data Lake, when the next Booster costs more than the lake can hold. It empties only that
pool's disks, buffer, and lake (Booster state and prior reset rewards remain) and permanently adds 1,000
units of lake-only capacity. Lake speed is 10% of its pool's base Bandwidth, +10% additive per flush (`getDataLakeSpeedMultiplier`; 70% after 6); flushes no longer change pool Bandwidth. After a flush the pool provisions its disks automatically and for
free, one at a time smallest-first, waiting for each disk to fill; while it rebuilds, later pools cannot
start new provisioning (already-active work may finish). Whenever all 9/9/9 disks are provisioned
(including before the first reset) — a status latched per lake (`boosterAuto`) for the whole Reboot cycle, surviving pool resets, Reformat Byte Foundry and Prestige — the lake's Booster control becomes a non-clickable cost label and
the lake automatically buys every affordable Booster until slots fill or the next cost exceeds capacity;
filling the lake at that wall enables the next reset. Pools never transfer or share resources through
this loop. Full detail: `docs/ECONOMY_REFERENCE.md`'s "Pool-local reset loop" (now the flush loop).

### Tiers, Prestige, Reboot (Era ascension)

**Player label ↔ code (issue #988; code identifiers never renamed):** Power = page id `'boosters'`; Cell → Fusion = `computeCores` → `computeMegacomputers` (merge verbs "Charge up"/"Auto-charge"); Cores → Superclouds = `flop01`–`flop10` (outputs KFlops → QFlops); Clock Speed = `globalTickspeed*`/`speedUp`; Charger = a tier's 8-slot reserve row (bottom row, `getComputeReserveHeld`); Turbo/Balanced/Eco = presets `burst`/`standard`/`sustain`; Bitrate = Data Stream Speed; Bandwidth = pool speed; Staging = pool buffer; Compile = Combine; Ping = tap; Flush Pool = pool reset; Disk full = Purge-threshold overlay headline; Overflow mode = `isOverflowModeUnlocked`; Firmware = page id `'perks'`/`PerksPage`; Compression = `prestigeDoublePpLevel`; Reboot = `era`/`eraGame` (Era ascension); Kernels = `eons`; Kernel Amplifier = `eonAmplifier*`; Reformat (Byte Foundry) = `resetByteFoundry`; Releases = page id `'milestones'`; System log = `prestigeMuseum`; Task Manager = Ops dashboard (`opsSamples`); Backup / Restore = import/export save; Sleep mode = offline progress; Manual = page id `'info'`.

**Terminology:** "Prestige" is the umbrella term for every reset-for-rewards (Purge, Reboot,
Reformat Byte Foundry, pool resets); the Factory reset at 1 Googol Bytes is **Purge** (formerly the name Reboot, now the Era-ascension layer) and
PP reads **Purge Points**; the global tickspeed track is **Clock Speed** (formerly Speed Up/Latency). The Purge
rename is carried through the code too (#987): `state.purge`, `purgeGame`,
`PURGE_THRESHOLD`, `autoPurge`, automation keys `'speedUp'`/`'purge'` — while Prestige-Point,
Compression, speed-bonus, `prestigeMuseum` and `metaPrestige` identifiers keep `prestige`. Pre-rename
save keys (`prestige`/`reboot` → `purge`, etc.) are renamed on load by `save-migration/migrateToV3`.

There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Kilobytes` through `Quettabytes`. Every tier is bought directly with the base currency
(`MONEY_ID = 'base'`, display name "Bits") and, once owned, produces the tier immediately below it,
cascading down the ladder; `tier01` (Kilobytes) is the special case where cost is still Bits but
production is a whole-Byte amount (`BYTES_ID = 'bytes'`, displayed as `B`) credited to Bits at
`BITS_PER_BYTE` (8) per Byte. **Bytes and Bits are ONE pool** (`resources.base`) — there is no separate
Bytes balance; 8 Bits = 1 Byte everywhere (see `docs/DESIGN_HISTORY.md`). **Clock Speed** (the global
tickspeed multiplier on MainPage, formerly "Latency"/"Tickspeed"/"Clock Speed"; code: `globalTickspeed*`, automation key `speedUp`) is paid from that Bits balance —
initial activation costs **10 Bytes (80 Bits)**. It unlocks once level 1 of tier01 is purchased; there
are no milestone bonus levels — every level compounds the same Overclock-scaled 1% step.
Reaching Money ≥ `PURGE_THRESHOLD` (`GOOGOL * BITS_PER_BYTE` = 8e100 — "1 Googol Bytes," in Bits
since a Byte is 8 Bits) freezes the economy except for Prestige — unless `isOverflowModeUnlocked(state)`
is true (permanent `purge.unboundedUnlocked` latch; unlocked once Auto-Prestige's interval is upgraded to
`OVERFLOW_MODE_MAX_INTERVAL_SECONDS` (1 s) or less, carried through Reboot), in which case production
continues and Prestige is optional (see `isProductionFrozen`). **Reboot** (`eraGame`) is a separate voluntary meta-prestige at **1 Googol unspent PP**
(`ERA_ELIGIBILITY_PP`): it awards **Kernels** (+1 base, +1 per Kernel Amplifier level — shop deferred to #414),
increments `era.count`, resets the full Foundry (generator upgrades, Disks, Data Lakes, compute ladder
entities, Memory/gate) plus the ordinary Factory cycle (`purge.points`/`count`/`prestigeDoublePpLevel`
→ 0, `computeFlops.owned` → 0, `cumulativeBoost` fresh), while keeping automation unlocks/pause flags
(except Compression level), tier/tickspeed autobuyer milestone objects, `purge.unboundedUnlocked`,
System log, hyperscalers, Kernel upgrade levels, Flops autobuyer unlock flags, and page latches. Reboot *N*
free-unlocks the *N*th Flops tier's autobuyer (Cores (KFlops) at Reboot 1, …). Hyperscalers (bought with Kernels in
#414) add permanent +0.01%/s each to every Factory tier's Flops multiplier via
`getHyperscalerFlopsBoostRate` — the engine/hook action (`buyHyperscaler`) is wired, but no page renders
a purchase control yet (deferred to #414, blocked pending maintainer-approved spend design). Full detail:
`docs/ECONOMY_REFERENCE.md`'s "Reboot and Kernels". Prestige (Purge) Points are awarded by
`getPrestigePointsAwarded`: 1 base PP at 1 Googol Bytes, then 1 PP per `PRESTIGE_POWERS_PER_PP_BASE` (64)
additional money-exponent powers beyond Googol's own 10^100 exponent, scaled by permanent Compression
upgrades (`prestigeDoublePpLevel` — each halves powers-per-PP until 1, then doubles PP-per-power; cost
`100^(level+1)` PP). Production speed bonus (`getPrestigeProductionMultiplier`) is automatic at 10
Purges: ×`log10(count)` (else ×1) — no PP cost; see `docs/ECONOMY_REFERENCE.md`. `GOOGOL` (1e100) is still exported and used by the exponent-based formulas
(`getMoneyExponent`/`getPurgePercent`) — only the live freeze/Prestige trigger moved to
`PURGE_THRESHOLD`; see `docs/DESIGN_HISTORY.md` for why. MainPage's headline balance (`MoneyHero`) switches from Bits to whole Bytes once the balance reaches
8000 Bits (`formatMoneyBalance`, `MONEY_BYTES_DISPLAY_THRESHOLD`); a small Bits subline then shows
the exact `formatCurrency` amount (absolutely positioned in the existing gap — adds no height; hidden while `balancesCompressed`). Every other `formatCurrency` call
(costs, production, the Prestige-threshold overlay) keeps reading in Bits.

### Byte Foundry

Bytes are produced entirely by the **Byte Foundry** (`ByteFoundryPage`), a tap-to-earn screen every fresh
save passes through once before the main game — a ONE-TIME-EVER gate (`latchMainGameUnlocked`/
`intro.mainGameUnlocked`) gone permanently across every Prestige and Reboot once Storage's
capacity threshold is reached. Pinging fills the **Data Stream** (Buffer-capped) which Compile turns into
a permanent Byte generator; **Upgrade Capacity** / **Upgrade Bitrate** grow it one at a time
(`queueIntroSpeedUpgrade`, `tickCapacityUpgradeDrain`; sit OUTSIDE the forced priority order). Displayed
Speed is derived (`getDataStreamSpeedBytesPerSecond`, exponent `getDataStreamSpeedExponent`); extra Disk
sizes need a Reformat (`unlockNextDiskSizeByFoundryReset`). Reboot keeps the generator and
gate latch but resets Capacity (`buildEraIntroReset`). Recurring actions follow a **forced priority
order** Disk Fill > Provision Disk > Compute Boost (a lower one is disabled, in UI and engine, while a
higher one is available; Provision Disk outranks Compute only while ARMED — `isProvisionDiskInProgress`). An always-on auto-convert (`convertIntroBitsToKilobytes`/`tickIntroAutoInvest`)
turns Data Stream bits into free `tier01` units. Generator, Disks, Data Lakes, and every compute-ladder
entity (Cell → … → Fusion) are PERMANENT across real Prestige; only Data Stream balance and
tier01's purchase-block progress reset per cycle. Nothing here ever fully freezes.

**Hard rules (full text and the rest of the Foundry mechanics: `docs/FOUNDRY_MECHANICS_REFERENCE.md`):**
- **Fill multiplier** (`FILL_MULTIPLIER_*`, `getFillMultiplierPercent`): displayed Speed/Bandwidth never
  change; a fill-dependent multiplier (1000% empty → 100% at 50% → 10% full (log-linear)) scales only the
  real per-tick amount delivered (`getFillCurveDelta` integrates the curve so a 1s offline tick matches live 0.1s ticks).
  **Tap bonuses never scale a fill** (the curve already reaches 10×); they speed CONSUMERS ×(1 + bonus%),
  decaying 1%/s: Data Stream ping → Upgrade Capacity/Bitrate drains (`getDataStreamTapMultiplier`); pool ping →
  Provision Disk draw, read-cache flush, write-cache merges, lower-size rebuild, Data Lake drain (`getPoolTapMultiplier`).
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
  The pool's smallest size's read cache fills from its pool buffer as a timed 5× transfer (`CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER`). Every size above its pool's smallest fills via its write cache FROM THE POOL BUFFER by default (pool fill
  order: read cache, then write caches smallest size first); clicking an empty disk expedites it
  (`expediteDiskFill`) — it jumps ahead of the other write caches for the pool buffer, consumes the smaller full
  disks of its pool it needs in parallel alongside that buffer, and flushes at 5× (`docs/ECONOMY_REFERENCE.md`).
  Stranded disks are never destroyed or swept into Bits; merges never cross a pool boundary.
- **Data Lakes** (`intro.dataLakes`): Booster control is "one click, one full fill-then-buy conversion,
  then stop" until the pool's era-long `boosterAuto` latch is set (then it auto-buys); `buyBooster` spends only banked lake units, outside the
  forced priority order; sub-sizes capped 9/9/9 (`DATA_LAKE_SUB_SIZE_DISK_CAPS`).
- **Display**: Disk labels bare numbers; pool/lake CAPACITY in its fixed unit
  (`formatDiskSizeInPoolUnit`); buffer BALANCE self-sizes (`formatPoolBalance`).

**The above is a summary only.** The full mechanic reference — the complete tap/combine/Speed
loop, auto-convert conversion mechanics, Storage's build/auto-fill/redeem lifecycle, Power
Cells/Batteries/Boost, every forced-priority-order predicate, cost/production formulas, the (configurable,
growing) purchase block size and level system, Prestige Points and every PP-funded automation, the
per-tier and global tickspeed multipliers, the last tier's XP-funded tickspeed, Scale Up, Overclock,
Reset, the complete game state shape, and the engine function/constants tables — lives in
`docs/ECONOMY_REFERENCE.md`. Read it (and `docs/FOUNDRY_MECHANICS_REFERENCE.md` for Foundry/Storage/Lake/Power) before touching `src/game/engine.js`, `src/game/layers.js`,
`TIER_DEFINITIONS`, `ByteFoundryPage`/`StoragePage`/`ComputePage`, or any economy/prestige/tickspeed
constant or formula — and check `docs/DESIGN_HISTORY.md` first if you're about to change a
formula/gate a past iteration may already have tried and rejected (e.g. the `<=` vs. `===`
bank-redeemability check, the flat vs. dynamic transfer cost).

**Buy max mode** (unlocked after the first Prestige, `isBuyMaxUnlocked`; toggled on Firmware → Prestige) — a per-device toggle
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
completed-level count the previous Overclock was taken at) + 3 — `overclockLastClaimCompletedLevels`
(the single Overclock level; each claim replaces it, nothing is banked; Clock Speed's step is ×1.1 per level),
not a fixed 5/8/11/14 ladder (Clock Speed's Overclock-scaled 1% step is under "Tiers, Prestige, Reboot" above).

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

**Expand/collapse convention:** only a disclosure's name/label (pool title, tier label, Clock Speed/Overclock
heading, money balance) toggles it — never the surrounding card/row, a chevron strip, or revealed content.
**No link styling:** it's a game — never underline (solid, dotted or on hover) just because something is
clickable; use `cursor: pointer` and a `:focus-visible` outline instead.
**Segmented choices** (pick-one controls like the Boost preset): full width, equal-width buttons with a text label beside the icon — never tiny icon-only squares (`docs/COMPONENTS_REFERENCE.md`).

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

Android/iOS apps wrap the web build via Capacitor 8 (app id `com.mohanpednekar.tens`, `webDir: dist`;
`capacitor.config.js`). Key commands: `yarn build:capacitor` (`CAPACITOR=1`: relative base, no PWA plugin),
`yarn cap:sync`, `yarn cap:android`/`cap:ios`. `android/` and `ios/` are committed — regenerate only via
`npx cap add`, never by hand. Min OS is Android 14 / iOS 18 (maintainer policy). Ads/IAP/cloud-save are
off by default and never bundled in web builds (`virtual:tens-features`). Saves are per-WebView
`localStorage`, separate from the browser/PWA. **Read `docs/NATIVE_APPS_REFERENCE.md`** (release signing,
SDK targets, feature flags, mobile-build.yml, rewarded-ad placement) before touching `capacitor.config.js`,
`android/`, `ios/`, `services/*` or `viteConfigFactory.js`'s feature flags; release steps:
`docs/RELEASE_ANDROID.md`, `docs/RELEASE_IOS.md`, `docs/STORE_LISTING.md`.

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
  the Buy/tickspeed-multiplier/Unlock/Prestige buttons also carry an explicit `aria-label` with the
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
- `yarn test` is green (run it for the current count — counts are deliberately not recorded here: every PR bumped them, so they went stale and made CLAUDE.md the top merge-conflict hot-spot). The four core test files (`engine.test.js`, `layers.test.js`,
  `storage.test.js`, `App.test.jsx`) assert against the current tier/resource id scheme (`MONEY_ID =
  'base'`, display name "Bits", symbol `b`; Bytes unit marker `BYTES_ID = 'bytes'` (no stored pool — Bits only), symbol `B`; tier ids
  `tier01`/`tier02`/… with display names `Kilobytes`/`Megabytes`/…) — don't reintroduce an older scheme
  (`'Ones'`, `'money'`, `'hundreds'`, or a purchasable Bytes tier) left behind by prior renames/removals
  (see `docs/DESIGN_HISTORY.md`). Saves must use the current schema (`resources.base`,
  `resources.bytes`, `intro.mainGameUnlocked`, tier ids `tier01`–`tier10`);
  `save-migration/adaptSaveForCurrentSchema` runs on every load; `storage.js`'s `mergeState` only fills
  in missing fields from `createInitialGameState()`. Legacy payloads with no migration step yet are
  discarded and surfaced via `IncompatibleSaveNotice`. Current saves stamp `saveSchemaVersion: 3` on
  every write (v1/v2 saves run `migrateToV3` then forward-fill via `mergeState`). `src/theme/contrast.js` (standalone WCAG utility) has `contrast.test.js`, and `tokens.contrast.test.js` audits the
  design tokens' plain text/UI color pairs for AA in both themes (`docs/THEMING_REFERENCE.md`). All other tests sit beside
  their source (`engine.computeFlops.test.js` = PP Compute screen; `capacitorConfig.test.js` = Capacitor Vite path;
  `pages/DevModePage/stateFields.test.js` = Dev Mode helpers; components, services, `save-migration/`, `scripts/*.test.js`)
  and are all picked up by Vitest's default glob (`vite.config.js`'s `test` block sets no custom `include`).

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
- Current specs: `golden-path` (buy Kilobytes via the real Buy button; Owned/balance update), `autobuyer-reload`
  (an unlocked autobuyer survives a real reload), `purge` (seeding Money ≥ `PURGE_THRESHOLD`; first-time `FullScreenOverlay`), `reboot`
  (seed at 1 Googol PP → Settings Reboot → assert `era.count`, Kernels award, and the permanent
  `intro.mainGameUnlocked` latch carrying forward), `data-lake` (seeded KB Data Lake renders its disk-square breakdown; manual Buy Cell grants a Cell, verified on Power), and `visual-regression` (Linux-only
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

[Graphify](https://github.com/Graphify-Labs/graphify) is a project-scoped Claude Code skill
(`.claude/skills/graphify/SKILL.md`; CLI `graphifyy` on PyPI, Python 3.10+; installed via `graphify install --project --platform claude`) that builds a queryable knowledge graph of
code + markdown docs (`graphify-out/`), parsed locally via tree-sitter with no LLM. A dev aid only — nothing in
`graphify-out/` is imported by `src/`.

- Committed: `graph.json`, `graph.html`, `GRAPH_REPORT.md`, `.graphify_labels.json` (+ `.sig`). Everything else under
  `graphify-out/` is gitignored machine-local/regenerable state (`cost.json`, `cache/`, `manifest.json`, dated rollback
  folders, `.graphify_*` scratch).
- For codebase questions prefer `graphify query "<question>"` over grepping; `graphify path "<A>" "<B>"` for
  relationships, `graphify explain "<concept>"` for a concept.
- After modifying code run `graphify update .` (AST-only, no API cost) in the same session/commit so the committed graph
  doesn't drift from `GRAPH_REPORT.md`'s "Built from commit" pointer.
- `.claude/settings.json` `PreToolUse` hooks (`graphify hook-guard`) nudge toward the graph before raw reads; they no-op
  if the CLI or graph is absent. Full command reference: `.claude/skills/graphify/SKILL.md`.
