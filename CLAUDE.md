# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in this repository. It documents **current behavior only** —
signatures, constants, state shape, conventions. For the *why* (superseded formulas, incident
write-ups, empirical simulation results, UI trade-offs), see `docs/DESIGN_HISTORY.md`; check it before
changing a formula, workflow, or mechanic a past iteration may already have tried and rejected.

## Project

**Tens** — a React incremental game; every mechanic (costs, production, prestige) is themed around
powers of ten. No routing library, no backend — state lives in React and persists to `localStorage`.
`App.jsx` switches top-level screens via a plain `useState` toggle plus a shared bottom `AppNav`
(Foundry → Power → Compute → Factory → Firmware → Challenges → More) — not a router (see "Architecture"):
`ByteFoundryPage` (tap-to-earn bootstrap; a one-time-ever mandatory gate on a save's very first cycle,
until Storage's own capacity threshold is reached — never again after that, permanently revisitable),
`MainPage` (tier ladder), `PerksPage` (Firmware, after first Prestige or once Buy max is unlocked: 🤖 Automation / ✦ Prestige icon
tabs — one row per automation spanning unlock → pause → speed; Prestige: Speed bonus, Sleep mode cap, Compression, Cache Warm, Playtime bonus, Overflow mode; Purchasing: Buy max), `InfoPage` (Manual), `ComputePage`/`ComputeFlopsPage` (Power
once Foundry Compute unlocks; PP Flops Compute at 100 PP). `StoragePage` is not an AppNav destination —
disk arrays live under Foundry as continuous Data Stream + Storage sections on the same screen (no
second-level tabs). More (Manual / Milestones / Stats / Achievements / Settings) is always available, including during the
Byte Foundry gate; only Factory stays progress-gated. A further More entry, **Dev Mode**
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
yarn store:assets # store screenshots/feature graphic → fastlane/ (gitignored); store:notes → release notes from CHANGELOG;
                  # on demand in CI: dispatch store-assets.yml (artifact, no secrets)
yarn test         # run all tests once (Vitest)
yarn test:watch   # watch mode, host 127.0.0.1
yarn test:e2e     # run the Playwright end-to-end suite (real chromium, against yarn dev) — see "Testing"
yarn audit        # yarn audit (Yarn Classic v1's built-in audit — no --all/--recursive flags; it
                  # already covers dependencies/devDependencies/optionalDependencies by default)
yarn lint:workflows # bash -n every `run:` block in .github/workflows/*.yml + .github/actions/** (#738),
                  # then fail on any git conflict marker in a tracked text file (#945)
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
lint:workflows` (`scripts/lint-workflow-shell.mjs` — `bash -n` over every workflow/action `run:` block —
then `scripts/lint-conflict-markers.mjs`, #945,
#738) and then `yarn test`. `.github/workflows/deploy.yml` runs `yarn build` and publishes `dist/` to GitHub Pages on
push to `main`. Automated Copilot review on PRs is configured through GitHub's repository settings, not
an explicit workflow file.

## Pull requests

Always create a pull request after pushing changes to a branch — do not ask the user whether to create
one first. This applies to every change made in this repo.

PRs are opened as drafts by default, but stay draft only while real, known work is pending (a queued
commit, a fix in progress, unrun tests). Always mark ready the moment it reflects genuinely finished work
(local checks pass, nothing further planned — maintainer standing rule) — a draft isn't reviewed or merged, so
leaving a finished one draft just stalls it. Applies to every PR, autonomous or interactive.

**Verification effort scales with how public the PR is**: minimal testing (one `yarn test` after a
coherent batch of changes, not after every edit) before anything is opened; one full local check at
draft creation; multiple rounds of adversarial review (Claude plus any bots/humans) once marked ready,
looping until nothing new turns up. No GitHub workflow reviews, fixes or merges PRs — that is the
daily **PR babysitter** scheduled routine's job (Claude Code Remote, not a workflow; don't add one).
Detail: `docs/AUTOMATION.md`'s "PR babysitter" / "PR review & testing cadence".

**After the final commit** on a finished PR (nothing further planned; local checks green), always
run the adversarial `code-reviewer` subagent (`.claude/agents/code-reviewer.md`) against that head
SHA before considering the session done. Post its machine-readable marker as a PR issue comment:

```
<!-- adversarial-review sha=<headOid> verdict=APPROVE|NEEDS_CHANGES|BLOCK -->
```

Then: **`APPROVE`** → mark ready; **`NEEDS CHANGES` / `BLOCK`** → fix (or stop) and re-run the reviewer
after the next final commit so the marker matches the new HEAD. **Never enable GitHub auto-merge** (it
would merge out of PR-number order): merging is done only by the PR babysitter routine, in ascending
PR-number order, or by a maintainer-driven interactive session (below). Never force-merge, push to
`main`, or GitHub-approve your own PR.

**Direct merge (maintainer standing rule):** in
maintainer-driven interactive sessions and the PR babysitter routine, for every PR in this repo: once the PR is
green — mergeable (no conflicts; bring a "behind" branch up to date first, then re-run the reviewer for the new head), every required check complete
and passing, nothing still running, no unresolved review threads, and an adversarial `APPROVE` marker for
the **current head SHA** — merge it directly (`gh pr merge --merge` / `merge_pull_request`) instead of
waiting for GitHub. Never for workflow-control diffs (`.github/workflows/**`, `.github/actions/**`, `.github/CODEOWNERS`, scripts workflows
run with the automation token, `.claude/agents/code-reviewer.md`) — no workflow may update workflows, directly or indirectly,
without human approval; the babysitter routine may merge one only when it is positively attributable to a human or interactive
session (fails closed; `docs/AUTOMATION.md` "PR babysitter") — never for `revert-deploy/*` PRs,
never over a failing/pending check. Autonomous workflow runs (`autonomous-maintenance.yml`, Devin, dev-team
roles) keep their never-self-merge rule. The babysitter merges in ascending PR-number order.

**Merge-when-met rule (maintainer standing rule):** whenever the requested behavior is delivered and the green-and-`APPROVE` conditions above hold, proceed to merge rather than holding for further polish — anything left over becomes a follow-up PR, not a reason to wait.

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

GitHub won't merge a PR that has fallen out of sync with its base, however green its checks. Check `mergeable_state` whenever there's reason to
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

**Aesthetic review on every UI change.** Any change to what a player sees (layout, spacing, font size, alignment, colors, new/removed elements) needs a visual check before the PR is marked ready: render the real screen (Playwright at ~430px wide, both themes; seed `localStorage` as in `docs/TESTING_REFERENCE.md`'s "End-to-end testing"; throwaway scripts, not committed), look at the screenshot, and fix anything misaligned, cramped, off-center, inconsistent with neighbouring components (same font sizes/bar styles for the same kind of value), or that changes a component's size unintentionally. Share the screenshots with the user. Passing tests don't cover this.

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
two — exact split and what each phase owns: the `file-task-issue` skill's "Epics and sub-issues". The
coding PR keeps every hard requirement (`yarn test` green, core-logic tests, `CHANGELOG.md` entry, and the
same-commit `CLAUDE.md` update — a hard invariant this split never relaxes); only work never required to
land with the code is deferred.

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

Claude/GitHub automation under `.github/workflows/` runs unattended and opens PRs, but no workflow follows up
on, refreshes or merges PRs (the PR babysitter routine does; "Pull requests"), and nothing enables GitHub
auto-merge (it would break PR-number merge order). Git/GitHub
writes authenticate via the `GH_AUTOMATION_PAT` secret, not `GITHUB_TOKEN` (its pushes/merges can't trigger other
workflows; read-only guard steps, the deploy-failure alert, and `devin-workflow-health.yml`/`deploy.yml` use
`GITHUB_TOKEN`). The PAT has `Workflows: write`, so autonomous runs may push `.github/workflows/**` changes when a
task authorizes it; `.github/CODEOWNERS` review still applies once branch protection requires it (#62).

**Orchestration model.** The maintainer orchestrates; `autonomous-maintenance.yml` develops. `claude-task` issues
(`.github/ISSUE_TEMPLATE/claude-task.yml`) are its backlog — four slots daily (4am/10am/4pm/10pm IST), each mapped
to a task kind + model, one unit of work per run: Phase 0 (CI/CD failures + unaddressed critical/high Dependabot
alerts) > Phase A (backlog: `priority:high` → normal/FIFO → `priority:low`) > Phase B (maintenance menu). A run that
notices a genuine out-of-scope bug files a `claude-task` + `bug` issue (explicit **Impact** line) rather than fixing
it mid-run; untracked guard-step code/secret-scanning alerts get the same (Dependabot alerts stay with Phase 0(c)/B).
Phase A may weigh Impact to reorder *within* a priority tier (`priority:high` still jumps), saying so when it
deviates from lowest-number order.

Shared helpers (`.github/actions/setup-node-yarn` — trusted refs only; `scripts/claude-deny-settings.sh`), the PR
babysitter routine, every other workflow (`devin-*`, `release`, `main-ci-heal`, `revert-deploy`,
`automation-self-heal`, `codeql`, `mutation-testing`, `mobile-build`), the slot schedule, the #62 maintainer checklist verification (#63; a new manual-only prerequisite
adds a line to #62 and, if API-checkable, to `scripts/verify-maintainer-checklist.mjs`'s `CHECKS`), the `## RUN SUMMARY`
job-summary step (#74), the Ideas-discussion feed (#66), and guard-feed bounds (any new feed passes an explicit
`--limit` + display cap with a "+N more" note, titles/labels only, never bodies — #81) are in
**`docs/AUTOMATION.md`** — read it before touching any `.github/workflows/*.yml` or reasoning about the pipeline.

**Budget discipline applies to every Claude Code session, interactive and automated.** Self-estimate the remaining
rolling 5-hour usage window and stay at or under roughly **50%** of a full window, recalculated each time (soft
target). If a task looks too large, land the largest coherent test-covered slice first (`Part of #N`, plus a comment
on what remains) rather than risk a runaway session — `docs/AUTOMATION.md` "Budget discipline" (~15-20% held back for
test/commit/push/PR-open).

## Documentation

Always update this file (`CLAUDE.md`, or `src/CLAUDE.md` for the sections it holds) in the same change/commit as any code change it describes —
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
contracts, `docs/TESTING_REFERENCE.md`/`docs/THEMING_REFERENCE.md`/`docs/PWA_REFERENCE.md`/`docs/NATIVE_APPS_REFERENCE.md`/
`docs/AUTOMATION.md` for their own areas). Default to one or two orientation sentences (what changed, the function/constant name to grep
for) plus a pointer to the reference doc — write the full detail there, not here. Only put something in
full here if no reference doc exists yet for that area (then consider whether the change warrants
creating one).

**Never read a large reference doc whole.** `docs/DESIGN_HISTORY.md` (~200k tokens) and
`docs/ECONOMY_REFERENCE.md` (~90k) cost more than everything else in a session combined, and
`MAINPAGE_REFERENCE.md`/`AUTOMATION.md` are ~15-30k each. "Read it before touching X" below always
means: `grep -n '^##' <doc>` (or grep the identifier you are changing), then Read only the matching
sections with `offset`/`limit`. State a fact from these docs only after reading that section — never
from memory of an earlier session or from this file's summary alone.

**`AGENTS.md`** (repo root) is a condensed mirror of this file for non-Claude AI tools (Codex, Cursor,
etc. — Claude Code itself only reads `CLAUDE.md`). It declares itself non-authoritative and says to fix
drift in the same change — whenever a change here touches something `AGENTS.md` also states (page
count/names, field names, mechanic summaries, architecture description), update `AGENTS.md`'s condensed
version in the same commit. It once drifted significantly (stale page count, a renamed field, a
long-superseded Byte Foundry mechanic) before being resynced; don't let that recur.
`.github/copilot-instructions.md` (Copilot's PR conventions) is a third, much shorter copy of the
"Pull requests" rules — keep it consistent when those change.

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
                               spec), programmer (sonnet, implement), qa (haiku, verify); store-compliance (sonnet,
                               read-only listing/privacy/policy check before store uploads)
  skills/                    ← dev-team (designer → programmer → qa → code-reviewer), economy-change-review,
                               file-task-issue, simulate-run-times (bot.mjs = reusable bot), store-release,
                               optimize-ai-files, graphify (third-party,
                               tool-generated — not hand-edited)
docs/                        ← DESIGN_HISTORY.md (the "why": superseded formulas, incidents, rejected alternatives
                               — check before changing a formula/workflow/mechanic a past iteration may have tried),
                               AUTOMATION.md, ECONOMY_REFERENCE.md, FOUNDRY_MECHANICS_REFERENCE.md (Byte Foundry/
                               Storage/Disks/Data Lakes/Power; read before touching ByteFoundryPage/ComputePage/disk+
                               lake engine code), MAINPAGE_REFERENCE.md (incl. ComputePage), COMPONENTS_REFERENCE.md
                               (component props/styling), TESTING_REFERENCE.md, THEMING_REFERENCE.md, PWA_REFERENCE.md,
                               NATIVE_APPS_REFERENCE.md, DEVMODE_REFERENCE.md, RELEASE_ANDROID/IOS.md, STORE_LISTING.md,
                               STORE_RELEASE.md (automated store pipeline)
src/
  game/
    layers.js             ← TIER_DEFINITIONS + all game constants (single source of truth)
    engine.js             ← pure state functions (no React, no side effects)
    navAttention.js       ← pure predicates for AppNav attention dots (high/normal; Factory cues muted while their automation is enabled and <1 s; Storage cues fold into Foundry;
                            Compute Flops affordability → `compute`)
    dailyChallenges.js    ← Daily-challenge logic ("Daily challenges")
    stats.js              ← Stats page selectors (`getStatsOverview`/`getStatsSections`/`getProductionBonusFactors`), pure
    challengeUi.js        ← pure player-facing helpers for Factory challenge mode (goal/readout formatting), shared
                            by Firmware and the Factory banner
    useIncrementalGame.js ← React hook: engine ↔ useState + localStorage + tick timer
    storage.js            ← localStorage read/write; every load goes through save-migration/, then forward field
                            merge (`mergeState`); multi-slot saves + Supporter entitlement (unlock code / dummy
                            checkout), clearSaveSlot / clearAllSaveProgress (never revokes unlock), separately keyed
                            last-save timestamp for offline progress (slot 0 keeps legacy `tens_game_state` keys).
                            Owns Dev Mode's isolated `'dev'` slot ("Dev Mode").
    storagePrefix.js      ← `createPrefixedStorage`: `dev:` key namespace so the dev build's saves never mix with
                            production's on the shared origin (no-op prefix elsewhere)
    save-migration/       ← `adaptSaveForCurrentSchema(raw)` → current-compatible state or failure; runs on every
                            load (DESIGN_HISTORY.md "Save persistence")
  components/             ← prop contracts/styling: docs/COMPONENTS_REFERENCE.md (Button, Money, StatCard, ...)
    AppNav                ← fixed bottom bar Foundry → Power → Compute → Factory → Firmware → Challenges → More; Factory omitted
                            during the Foundry gate; attention dots via navAttention.js
    AppMenu               ← More sheet — Manual / Milestones / Stats / Achievements / Settings (always reachable; Reset / Reformat Byte
                            Foundry only in Settings → Danger zone)
    Button (`.jsx`)       ← semantic `variant` prop → theme tokens; deprecated raw `color` still supported
    DiskArrayRow          ← one Disk array's status `{ actions, size, state }`; only click = empty write-cache-size
                            disk → `actions.expediteDiskFill(size)`; shared by ByteFoundryPage and StoragePage (why standalone:
                            DESIGN_HISTORY.md)
    DataLakePanel         ← one Data Lake block `{ actions, state, bare, tierIndex }`, embedded per pool card
    AutoBoostPresetPicker ← full-width segmented Turbo / Balanced / Eco choice (Firmware → Power Automation)
    icons.js              ← shared glyphs (`COST_ICON` 🏷️ marks every cost)
    BoostBadge, BoostTimerBar, SpeedDetailsPopover, LeadIcon, Switch, Money, BuyMaxToggle (renders nothing until
    `isBuyMaxUnlocked`), ConfirmDialog, OfflineProgressNotice, StatCard, ChallengeBanner, ChallengeExitButton — see
    COMPONENTS_REFERENCE
    IncompatibleSaveNotice ← blocking overlay when a load cleared a pre-schema save; single **Start fresh** action;
                            rendered by `App.jsx` when `incompatibleSaveReason` is set
  pages/                  ← StatsPage (`'stats'`, More entry), ChallengesPage (page id `'challenges'`; top tabs 🏁 Factory / 📅 Daily; shown with Firmware), AchievementsPage (`'achievements'`, More entry), ByteFoundryPage, StoragePage, ComputePage, ComputeFlopsPage, MainPage, PerksPage,
                            InfoPage, MilestonesPage, SettingsPage, DevModePage (+ `stateFields.js`: pure
                            Variables-tree helpers) — roles in `src/CLAUDE.md`; layout in MAINPAGE_REFERENCE.
                            Page ids: `'foundry'` (also holds Storage), `'boosters'` (Power), `'compute'` (Flops),
                            `'game'` (Factory), `'perks'` (Firmware), `'milestones'`, `'stats'`, `'info'`, `'settings'`, `'dev'`
  theme/                  ← tokens.js (design-token source of truth: per-mode color/shadow/tier-accent +
                            mode-independent space/radius/motion/breakpoints/font/type; `buildTheme(mode)`, `themes.{dark,light}`),
                            layout.js (pure layout classes + `media`), LayoutContext.jsx (`LayoutProvider`/`useLayoutClass`),
                            fonts.js (locally bundled Space Grotesk/Inter), contrast.js (WCAG utility), GlobalStyle.js,
                            index.jsx (`<ThemeProvider mode>`) — THEMING_REFERENCE
  services/               ← config.js (feature flags, AdMob/RevenueCat ids, `IAP_PRODUCTS`, policy URLs),
                            `IS_NATIVE_BUILD`; monetization/ (`MonetizationService`: `init`/`showRewarded`/`purchase`/`restore`/
                            `getEntitlements`; `noop.js` for web/flags off, `admobAdapter` + `rewardedAdCache` — one video
                            preloaded at init and after each show, refreshed past 55 min — `revenueCatAdapter`; composed by
                            `getMonetizationService()`), cloudSave/ (Firebase Auth email/password + Firestore `saves/{uid}`,
                            `deleteAccountAndData`: reauth → data → user), nativeShell.js (hide splash, init monetization)
  App.jsx                 ← root; owns the single `useIncrementalGame()` call, wraps <ThemeProvider><GlobalStyle/>,
                            switches pages via local `page` useState (Manual/Settings/Milestones/Stats/Achievements/Dev are `React.lazy` chunks under one `Suspense`; default `'game'`; legacy `'storage'` →
                            `'foundry'`) — not a router — plus shared `AppNav` and `AppMenu`.
                            `showingFoundry = !GATE_EXEMPT_PAGES.has(page) && (!intro.mainGameUnlocked ||
                            page === 'foundry')`; `intro.mainGameUnlocked` is a permanent latch, so the gate exists
                            only on a save's very first cycle. Detail: MAINPAGE_REFERENCE "App.jsx routing and the Foundry gate"
  index.jsx, reportWebVitals.js ← ReactDOM entry; optional web-vitals reporter (no-op, no callback)
capacitor.config.js, android/, ios/ ← Capacitor wrap ("Native apps")
fastlane/, Gemfile        ← store upload lanes + committed listing text (docs/STORE_RELEASE.md)
vite.config.js            ← thin wrapper over `viteConfigFactory.js` (aliases, dev/test server, VitePWA — skipped when
                            `CAPACITOR=1`, along with the `/tens/` base; split out so `capacitorConfig.test.js` can pin that path —
                            `import.meta.url` isn't a `file:` URL under Vitest)
firestore.rules           ← owner-only `saves/{uid}` rules; stryker.config.json ← Stryker mutation testing of `engine.js`
                            (weekly non-blocking `mutation-testing.yml`; `yarn stryker run`)
playwright.config.js, e2e/ ← real-browser suite, specs in docs/TESTING_REFERENCE.md
scripts/                  ← automation, release, lint and simulation helpers (`ls scripts/`; most have a sibling `*.test.js`;
                            roles in docs/AUTOMATION.md or each script's header). Named elsewhere here: bump-version.mjs,
                            adversarialReviewMarker.js,
                            lint-workflow-shell.mjs, lint-conflict-markers.mjs, simulate-challenges.mjs,
                            simulate-daily-challenges.mjs, verify-maintainer-checklist.mjs, sync-release-milestones.sh.
                            resolve-pr-threads.sh: `list` read-only; `resolve` takes explicit IDs, never bulk.
                            generate-pwa-icons.mjs is not in the build — re-run only if the icon design changes.
                            large-screen-mockups/ (`yarn mockups:large-screens`): regenerates epic #1152's design mockups into
                            docs/design/large-screens/ from real app captures (`PW_CHROMIUM_PATH` as for e2e) — the one committed
                            exception to throwaway aesthetic-review scripts. store-assets/ (`yarn store:assets`): store
                            screenshots + feature graphic; lib/capture.mjs: dev-server/navigation helpers both share.
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
   dismissIncompatibleSaveNotice, achievementBaseline, buyMaxMode, setBuyMaxMode, savesMeta, saveSlots, switchSaveSlot, renameSaveSlot,
   redeemUnlockCode, purchaseSupporterDummy, opsSamples, clearSlot, eraseAllSaveProgress,
   exportSaveJson, applyCloudSave, claimOfflineAdReward, devModeActive, toggleDevMode, setDevState, applyDevStateJson, resetDevState }` — the last five back
   Dev Mode; always present on the return value (not gated by `import.meta.env.DEV`) but consumed only
   by `DevModePage`, whose rendering *is* dev-build-gated, so unreachable from any shipped UI. Every
   purchase — manual Buy and autobuyer ticks alike — batches up to the current level's cost-block
   boundary (docs/ECONOMY_REFERENCE.md) via `BUY_QUANTITY` (`Number.MAX_SAFE_INTEGER` — a "buy as many
   as fit" sentinel, not a batch size; deliberately not `Infinity`, which `clampNonNegative` silently
   clamps to 0 — incident in `docs/DESIGN_HISTORY.md`), passed into `tickGame` as `autobuyerBatchSize`
   and into `actions.buyTierQuantity` (no persisted bulk preference). On mount, a one-time
   `computeInitialGame` helper calls `discardIncompatibleActiveSaveIfNeeded()` (clears the active slot
   when its payload fails `getSaveIncompatibilityReason`), loads any saved state, and folds in offline
   progress (`applyOfflineProgress`, elapsed since `loadLastSaveTimestamp()`) before first render; the
   `offlineProgress` summary (dismissed via `dismissOfflineProgress`/`resetGame`) drives the "Resumed
   from sleep" notice only past `OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS` (10 minutes). A
   suspended tab/PWA never remounts, so the live tick loop also replays any wall-clock gap past
   `BACKGROUND_TICK_GAP_THRESHOLD_SECONDS` (2s) through the same path — `offlineProgress` is **not** a
   mount-time-only, one-shot value. Detail: `docs/ECONOMY_REFERENCE.md`'s "Offline progress".
3–8. **Page renderers** (`MainPage`, `ByteFoundryPage`, `StoragePage`, `ComputePage`, `ComputeFlopsPage`,
   `InfoPage`, `MilestonesPage`, `SettingsPage`, `DevModePage`) — pure renderers of the hook's state (mostly
   `{ game }`; engine re-validates, UI mirrors it). Roles, props and gates: **`src/CLAUDE.md`** "Architecture — page renderers".

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

Moved to **`src/CLAUDE.md`** (auto-loads when a session reads any file under `src/`): terminology and the
player-label ↔ code map, tiers/Prestige/Purge/Reboot, Challenge mode, Daily challenges, Achievements, Byte
Foundry hard rules, pool-local flushes, Buy max, Scale Up/Overclock, and the UI conventions (expand/collapse,
no link styling, minimal UI text, segmented choices), Cache Warm and the Sleep mode cap. **Read it before any game-logic, economy, balance or UI
work — including spec/issue/doc work that never opens a `src/` file.** Full formulas: `docs/ECONOMY_REFERENCE.md`;
Foundry/Storage/Lake/Power: `docs/FOUNDRY_MECHANICS_REFERENCE.md`; check `docs/DESIGN_HISTORY.md` before changing
a formula/gate a past iteration may have tried.

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

**Layout classes (#1153, epic #1152):** `theme/layout.js` — pure `getLayoutClass({width,height})` (`compact`/`medium`/`expanded`/`wide`; height < 500 → compact) and `isSplitEligible`, thresholds in `tokens.js` `breakpoints` (also on `theme.breakpoints`), `media.atLeast/below` helpers; `LayoutContext.jsx` — `LayoutProvider` (mounted in `App.jsx`) + `useLayoutClass()` (defaults to `compact` outside a provider). Size-only, never platform-based.

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
`docs/RELEASE_ANDROID.md`, `docs/RELEASE_IOS.md`, `docs/STORE_LISTING.md`. Store uploads are automated
with fastlane (`fastlane/` listing text is the source of truth; `Gemfile`) via `store-release.yml` —
**read `docs/STORE_RELEASE.md`** before touching either; agents follow the `store-release` skill.

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

Rules every session needs; full detail (aria-label query contracts, per-file coverage map, e2e setup and
spec list): **`docs/TESTING_REFERENCE.md`** — read it before writing or restructuring tests.

- Tests sit beside their source (`*.test.js`/`*.test.jsx`), Vitest's default glob, jsdom, globals enabled, setup
  file `src/setupTests.js`. Component tests use Testing Library and query by role/label text, never test IDs
  (buttons/panels carry explicit `aria-label`s for this).
- Tests that seed `localStorage` must clear it in `beforeEach`; a mocked `window.confirm`
  (`vi.spyOn`) is restored in `afterEach`.
- Fake timers: advance `TICK_RATE_MS` **once per tick** inside `act`, and **unmount before
  `vi.useRealTimers()`** — the regression this avoids is in `docs/DESIGN_HISTORY.md`.
- Several near-identical automations/buttons → one `test.each` table, not hand-copied tests.
- Core economy formulas also carry `fast-check` property tests (`describe('<fn> (property-based)', …)`,
  `{ numRuns: 200 }`) alongside — not replacing — their example-based tests.
- Test counts are deliberately not recorded here (they went stale every PR) — run `yarn test`.
- Assert against the current id scheme only: `MONEY_ID = 'base'` ("Bits", `b`), `BYTES_ID = 'bytes'` (unit
  marker, no stored pool, `B`), tier ids `tier01`–`tier10` (`Kilobytes`…). Never reintroduce an older scheme
  (`'Ones'`, `'money'`, `'hundreds'`, a purchasable Bytes tier — `docs/DESIGN_HISTORY.md`). Saves use the current
  schema (`resources.base`, `resources.bytes`, `intro.mainGameUnlocked`) and stamp `saveSchemaVersion: 3`;
  every load runs `save-migration/adaptSaveForCurrentSchema` (v1/v2 → `migrateToV3`), then `mergeState`
  fills missing fields; a legacy payload with no migration step is discarded and surfaced via
  `IncompatibleSaveNotice`.
- **End-to-end** (`yarn test:e2e`, Playwright, chromium only, `e2e/*.e2e.js` — named so Vitest never picks
  them up): a separate real-browser suite against `yarn dev` on `127.0.0.1` and the `/tens/` base. Specs seed
  `localStorage`'s `tens_game_state` (after a first `page.goto`, then `page.reload()`), including
  `intro: { mainGameUnlocked: true }` to land on MainPage. **Not wired into `ci.yml`** — deliberately; that
  edit is off-limits to `autonomous-maintenance.yml` and needs a human.

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
