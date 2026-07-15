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
taken lowest-number-first.

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

### Scheduled maintenance (`autonomous-maintenance.yml`)

Runs every 5 hours (cron `0 */5 * * *`, plus manual `workflow_dispatch`) via
`anthropics/claude-code-action@v1`. Each run does exactly one unit of work, chosen in three phases —
Phase 0 always outranks Phase A, which always outranks Phase B:

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
discoverable progress on a real PR instead of losing everything with the ephemeral runner.

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
`ci.yml`, `deploy.yml`,
`dependabot-lockfile.yml`, `autonomous-pr-followup.yml`, and `pr-auto-merge.yml` are all explicitly
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
   from branch protection either way.

**Two one-time manual prerequisites**, since neither is settable through the tools available to a
Claude Code session:
- Add the `GH_AUTOMATION_PAT` repo secret described above (fine-grained PAT scoped to this repo,
  Contents: read/write, Pull requests: read/write, Issues: read/write — the Issues permission is
  what lets the maintenance run's `gh issue view`/`gh issue comment` read a `claude-task` spec and
  report an infeasible task), alongside the existing `CLAUDE_CODE_OAUTH_TOKEN`.
- Enable "Allow auto-merge" in repo Settings → General, and add branch protection on `main` that
  requires the `test` check from `ci.yml` to pass before merging. Without a required check,
  `gh pr merge --auto` has nothing to wait on and may merge immediately rather than "once green" —
  the whole point of this workflow depends on `ci.yml` actually being wired up as a required check.

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
                               keyed Bulk-toggle preference save/load and the separately keyed last-save
                               timestamp used to compute offline progress
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
  App.jsx                   ← root component, renders MainPage
  index.jsx                 ← ReactDOM.createRoot entry point
vite.config.js               ← path aliases + dev/test server config
```

## Architecture

Strict three-layer separation:

1. **`engine.js`** — all game logic is pure functions of `(args) => state => newState`, with no React and
   no side effects. Every mutation returns a new state object; invalid actions (can't afford, tier locked)
   return the *same* state reference unchanged, which callers use as a no-op signal (see `tickGame`'s
   autobuyer loop, which breaks as soon as `buyTier` returns the same object back).
2. **`useIncrementalGame.js`** — the only place holding React state. Owns the `setInterval` tick timer, the
   localStorage persistence effect, the `quantity` (×1/×10 "Bulk") toggle state, and exposes
   `{ state, actions, resetGame, quantity, setQuantity, offlineProgress, dismissOfflineProgress }`. `quantity`
   defaults to `10` (bulk-by-default) and is passed into `tickGame` on every tick as `autobuyerBatchSize`; it
   also caps how many units the manual Buy button requests (see below). It is UI preference state, persisted
   to `localStorage` under its own `tens_bulk_quantity` key (separate from the game-state save blob, via
   `saveQuantityPreference`/`loadQuantityPreference` in `storage.js`) so it survives reloads without
   participating in save-schema migration or being cleared by `resetGame`. On mount, a one-time
   `computeInitialGame` helper (module-scoped, not itself a hook) loads any saved state, reads
   `loadLastSaveTimestamp()` (see `storage.js`), and — if the elapsed real time since that timestamp is long
   enough to register at least one simulated second — folds in offline progress via `applyOfflineProgress`
   (see "Offline progress" below) before the first render, and records a one-shot
   `{ elapsedRealSeconds, effectiveSeconds }` summary as `offlineProgress` for the UI to report;
   `dismissOfflineProgress` (and `resetGame`) clear that summary back to `null`. This all happens once, before
   the regular tick timer starts — it is not re-evaluated on every render.
3. **`MainPage/index.jsx`** — a pure renderer driven entirely by `TIER_DEFINITIONS` and the hook's `state`;
   renders each unlocked tier as a single compact row rather than separate cards, showing `Owned` (current
   amount, drives production) and `Purchased` (lifetime buy count, drives both cost and — every 10 of
   them — a production doubling, see `getPurchaseMilestoneMultiplier`) as two separate figures.
   Money is displayed once, at the top, via `formatCurrency` (comma-grouped `$` format below 1,000,000,
   exponential above). The global ×1/×10 toggle (labeled "Bulk:") governs the batch size for *both* the
   manual "Buy" button and autobuyer ticks (see `tickGame` below) — at ×10 (the default) Buy grabs as many
   units as are currently affordable up to the 10-unit cost-block boundary (via
   `getTierAffordableQuantity`/`buyTierQuantity`); at ×1 it buys a single unit at a time. The Buy button
   itself renders its cost-block progress as an on-button gradient fill (green = units already bought in
   the current 10-unit cost block, `purchased % 10`; amber = units affordable right now but not yet
   bought, `getTierAffordableQuantity(tier, purchased, spendable, 10)`) via `Button`'s `$progress`/
   `$secondaryProgress` props, instead of a separate bar below it — this preview always reflects the full
   10-unit block regardless of the Bulk toggle, since it's showing runway to the next 10x cost jump, not
   how much a single click will buy. The Upgrade/Unlock button and the Prestige button carry the same
   fill treatment (single-tone: spendable-resource-or-XP ÷ cost for Upgrade/Unlock, `prestigeProgressPercent`
   for Prestige), and all three also pulse (`$pulse`) when currently actionable. Buy/Upgrade/Unlock/Prestige/
   Reset render compact *visible* text — an icon in place of the action word (🛒 Buy, 🔓 Unlock, ⚙ Upgrade,
   ✦ Prestige, ↺ Reset) plus the cost, and (via `formatCost`) the paying tier's short `RESOURCE_SYMBOL`
   (e.g. `Ks`) instead of its full name (e.g. `Thousands`) — while each button's `aria-label` still carries
   the full descriptive sentence (`"Buy ×10 for $100"`, `"Unlock for 4 XP"`, `"Prestige (requires 1 Googol
   Money)"`, `"Reset game"`, …) used by assistive tech and by tests that query `getByRole('button', { name })`.
   The Upgrade state (autobuyer already unlocked) additionally prefixes its visible text with `+10%` (e.g.
   `⚙ +10% 100 Ks`) and its `aria-label` with `"(+10% purchase speed)"`, so the speed-up is visible on the
   button itself rather than only in its `title` tooltip.
   Because each of these buttons also nests a `VisuallyHidden` span carrying the real `role="progressbar"`
   (`aria-valuenow`/`aria-valuemax`) for assistive tech, the explicit `aria-label` on the button itself is
   required regardless of the visible/accessible-name split above — without it, the accessible-name
   computation would recurse into the nested node and pick up its label too. Buy/Upgrade/Unlock/Prestige/
   Bulk/Reset and the autobuyer badge all carry a `title` tooltip explaining their effect in plain language;
   the Prestige and Reset buttons additionally wire `aria-describedby` to a visible (Prestige) or
   `VisuallyHidden` (Reset) description, since those two are the app's only irreversible actions and their
   most important fact (resources get wiped) previously lived only in a mouse-hover `title` — the other four
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
   Each tier row is a CSS Grid with fixed `grid-template-areas`/`grid-template-columns` (one set above the
   `40rem` breakpoint, a denser 3-row set below it — name full-width, then owned/purchased/production
   sharing one row, then upgrade/buy side by side — rather than flexbox content-based sizing, so a field's
   on-screen position depends only on viewport width, never on how many digits its value has. Buy sits to
   the right of Upgrade/Unlock in both layouts — Buy is the button clicked constantly, Upgrade/Unlock only
   occasionally, so the more-clicked control gets the rightmost (thumb/cursor-resting) position. Grid cells use
   a shared `gridCell` mixin (`min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`)
   as a safety net against content forcing a column wider than its track. `RootDiv` sets
   `font-variant-numeric: tabular-nums` so digits render at a uniform width. When the hook reports a non-null
   `offlineProgress` (see "Offline progress" below), a dismissible `StatCard` ("Welcome back! …", formatted via
   `formatOfflineDuration`) renders above the money display, with a Dismiss button wired to
   `dismissOfflineProgress`; it never reappears once dismissed (or once the state is reset) since it's a
   one-shot summary of what happened between this load and the last, not a recurring status.

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
`tier0N`/`tierNN` sequence), `name`, `symbol`, `baseCost`, `costResourceId: MONEY_ID`, and
`producesResourceId` set to the previous tier's `id`. No other file should need changing — the page and
engine are meant to be fully data-driven from that array.

### Offline progress

Time away from the game is simulated at **10% speed** (`OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1` in
`layers.js`) when the page is reopened, capped at `MAX_OFFLINE_SECONDS` (24 hours) of real elapsed time before
the multiplier is applied — a courtesy for short absences, not a way to let the autobuyer loop or production
outrun active play, and a hard bound on how long the catch-up simulation can take on load. The mechanism
(`getOfflineEffectiveSeconds`/`applyOfflineProgress` in `engine.js`) replays `tickGame(1, autobuyerBatchSize)`
once per *simulated* second — not a single call with one large `elapsedSeconds` — so autobuyers get the same
one-purchase-attempt-per-tick cadence they'd have had if the game had stayed open the whole time, just at 10%
speed; a single lump-sum call would let a long-idle autobuyer buy far more per "tick" than it ever could
while the app was actually running. `storage.js`'s `saveGameState` stamps a separate `tens_last_save_timestamp`
localStorage key with `Date.now()` on every save (every tick, not just on unmount, so it always reflects the
last confirmed moment the app was open); `loadLastSaveTimestamp` reads it back, returning `null` if it's
missing (no prior save, or an older save that predates this feature) — a `null` timestamp means "unknown
elapsed time" and skips offline progress entirely rather than guessing. `clearGameState` (called by
`resetGame`) removes this key too, since it's save-state bookkeeping, not a durable UI preference like the
Bulk toggle. See "Architecture" above for how `useIncrementalGame` wires this into `state`/`offlineProgress`
on mount, and how `MainPage` surfaces it.

### Game state shape

```js
{
  resources:  { Ones: 10, tier01: 0, … },       // amount owned per resource id (keyed by costResourceId/MONEY_ID)
  owned:      { tier01: 0, tier02: 0, … },       // generator count per tier id (drives production)
  purchased:  { tier01: 0, tier02: 0, … },       // lifetime purchase count per tier id (drives cost scaling
                                                  // AND production doubling — see getPurchaseMilestoneMultiplier)
  autobuyers: { tier01: null, tier02: null, … }, // null = locked; number = active level (0 = unlocked, already active)
  autobuyerAttemptBudgets: { tier01: 0, tier02: 0, … }, // fractional purchase-attempt budget per tier accumulated
                                                          // each tick by getAutobuyerAttemptRate(level) and drained
                                                          // by 1 per successful autobuyer purchase — see tickGame
  prestige:   { xp: 0, level: 0, highestMilestone: 1 }, // xp only funds autobuyer unlocks — prestige itself
                                                          // is gated on Money ≥ GOOGOL, not xp
}
```

`owned[tierId]` and `resources[tierId]` for the same tier id always move together — buying a tier, producing
it via the tier above's tick, an autobuyer's automatic purchase, and spending it on that tier's own autobuyer
upgrade all update both by the same amount. They represent "how many generators you have" and "how much of
that tier's resource you can spend" respectively, which happen to be the same number by design. `purchased`
is separate: it only ever increases and is what `getTierCost` scales against; it also drives production
directly, doubling every time it crosses another block of 10 (see `getPurchaseMilestoneMultiplier`) — the
same boundary where cost jumps 10x, regardless of whether those purchases were manual or automatic.

### Key engine functions (`src/game/engine.js`)

| Function | Signature | Purpose |
|----------|-----------|---------|
| `createInitialGameState` | `() → state` | Fresh state derived from `TIER_DEFINITIONS`; `resources` is pre-populated with every `costResourceId`/`producesResourceId`, not just money |
| `getTierCost` | `(tier, purchasedCount) → number` | `baseCost * 10^epoch`, epoch = `floor(purchased/10)` — flat across each block of 10 purchases, jumps 10x at each block boundary |
| `getTierBulkQuantity` | `(tier, purchased, requestedQuantity) → number` | Caps a bulk purchase at the current cost-block boundary, so every unit bought is the same price |
| `getTierQuantityCost` | `(tier, purchased, requestedQuantity) → number` | `getTierCost(...) * getTierBulkQuantity(...)` |
| `getTierAffordableQuantity` | `(tier, purchased, spendable, requestedQuantity) → number` | Further caps `getTierBulkQuantity` by what `spendable` can actually pay for — what `buyTierQuantity` will actually purchase |
| `getTierSpendableAmount` | `(state, tier) → number` | Balance of `tier.costResourceId` (always `Ones`) |
| `getTierPurchasedCount` | `(state, tierId) → number` | Lifetime purchases, used for cost scaling |
| `tickGame` | `(elapsedSeconds, autobuyerBatchSize = 1) → state → state` | Runs autobuyers highest-tier-first (every tier costs the same resource, Money, so autobuyers compete for one shared pool — the higher tier gets first claim on limited funds), then produces resources for every unlocked tier (`owned × elapsedSeconds × productionMultiplier × getPurchaseMilestoneMultiplier(purchased)`), then checks milestones. For each non-`null` (unlocked) autobuyer, accumulates a fractional purchase-attempt budget (`autobuyerAttemptBudgets[tier.id] + getAutobuyerAttemptRate(level)`) and fires one purchase attempt (via `buyTierQuantity`) per whole unit of budget, carrying any fractional remainder into the next tick — unlocking alone (level 0, rate 1x) already accumulates at the baseline pace, so paying the XP to unlock immediately makes an autobuyer active rather than leaving it idle until the first Upgrade. If a purchase can't be afforded, the loop stops *without* spending the already-accumulated attempt — it stays banked so a stretch of being broke only delays attempts, never loses them. At `autobuyerBatchSize` 1 each attempt buys as soon as affordable (unchanged legacy behavior); above 1 (the ×10 "Bulk" toggle, the UI default) each attempt only buys once the tier can afford the *entire* current cost block up to that size — it holds and waits rather than buying a partial batch |
| `buyTier` | `(tierId) → state → state` | Validates unlock + affordability, deducts cost, increments `owned`/`purchased` by 1; used internally by `buyTierQuantity`, not called directly by the UI |
| `buyTierQuantity` | `(tierId, quantity) → state → state` | Buys up to `quantity` units (capped at the cost-block boundary), stopping early if a unit becomes unaffordable; used both by the manual "Buy" button (with the Bulk toggle's `quantity`, 1 or 10) and by `tickGame`'s autobuyer loop — the two purchase paths are identical, an autobuyer's Upgrade level has no effect on how much a purchase costs or how many units it grants |
| `buyAutobuyer` | `(tierId) → state → state` | First call unlocks (spends XP, level → 0 — already active for purchasing, see `tickGame`); subsequent calls upgrade the level (spends the tier's own resource) — each level purchased compounds that autobuyer's purchase-attempt rate by another 10% via `getAutobuyerAttemptRate`, without changing production (see `getPurchaseMilestoneMultiplier`), how each individual purchase is paid for/batched, or manual Buy. Since `resources[tierId]` and `owned[tierId]` move together, an upgrade requires `available >= cost + 1`, not just `available >= cost` — paying the exact cost would zero out the tier's own generator count (and its production), so the last unit is reserved and the call is a no-op (returns the same state) until at least 1 would remain afterward; the MainPage Upgrade button's `disabled` state mirrors this same `+ 1` threshold so it never looks clickable when the engine would refuse it |
| `getPurchaseMilestoneMultiplier` | `purchased → number` | `2 ** floor(purchased/10)` — doubles a tier's own passive production at every block-of-10 purchases, the same boundary where `getTierCost` scales cost 10x. Applies uniformly regardless of whether those purchases were manual or via an autobuyer |
| `getAutobuyerAttemptRate` | `autobuyerLevel → number` | `1.1 ** level` (`null`/locked treated as level 0 → rate 1); the average purchase-attempt rate an autobuyer accumulates per tick in `tickGame` — level 0 (just unlocked, not yet upgraded) is the 1x baseline rate |
| `prestigeGame` | `state → state` | Requires Money ≥ `GOOGOL`; resets resources/owned/purchased, keeps autobuyer *unlock* status (levels reset to 0), leaves XP untouched, increments prestige level |
| `isTierUnlocked` | `state → tier → bool` | First tier always unlocked; later tiers need `owned[prevTier] >= 10` (or already unlocked, so old saves stay playable) |
| `getMoneyExponent` | `money → number` | `floor(log10(money))`, floored to 0 below 1 — money's order of magnitude, also what `checkMilestones` tracks as XP milestones |
| `getPrestigeProgressPercent` | `money → number` | `getMoneyExponent(money) / log10(GOOGOL) * 100`, rounded and clamped to `[0, 100]` — GOOGOL is exponent 100, so this reads as a whole percent equal to the money exponent itself |
| `productionMultiplier` | `prestigeLevel → number` | `2 ** prestigeLevel` |
| `getAutobuyerUnlockXPCost` | `tierIndex → number` | `AUTOBUYER_XP_COST_BASE * 2^tierIndex` |
| `getAutobuyerCost` | `currentLevel → number` | `10 ** (currentLevel + 1)` |
| `formatAmount` | `value → string` | Locale-formatted integer below `EXPONENTIAL_NOTATION_THRESHOLD` (1,000,000); scientific notation at/above (e.g. `6.5E13`) — used for non-money amounts (owned/purchased counts, and per-tier production rates, except a tier producing Money which uses `formatCurrency` instead so the row stays consistent with every other Money display) |
| `formatCurrency` | `value → string` | Full comma-grouped `$`-prefixed string below `EXPONENTIAL_NOTATION_THRESHOLD`, floored (never rounds up); exponential notation (e.g. `$6.5E13`) at/above the same threshold — used for all Money amounts, wherever they appear |
| `getOfflineEffectiveSeconds` | `elapsedRealSeconds → number` | Caps `elapsedRealSeconds` at `MAX_OFFLINE_SECONDS`, scales by `OFFLINE_PROGRESS_SPEED_MULTIPLIER` (10%), floors — the number of simulated 1-second ticks `applyOfflineProgress` will replay |
| `applyOfflineProgress` | `(elapsedRealSeconds, autobuyerBatchSize = 1) → state → state` | Replays `tickGame(1, autobuyerBatchSize)` once per simulated second from `getOfflineEffectiveSeconds` — see "Offline progress" above |
| `formatOfflineDuration` | `totalSeconds → string` | `"1h 2m"` / `"1m 30s"` / `"45s"` (hours+minutes only above an hour, minutes+seconds only above a minute) — used to summarize the offline-progress notice's elapsed/simulated durations |
| `RESOURCE_SYMBOL` (`layers.js`) | `resourceId → string` | Returns the matching tier's `symbol`, `'$'` fallback for `MONEY_ID`/unknown ids |

### Constants (`src/game/layers.js`)

- `MONEY_ID = 'Ones'` — id of the base/root resource
- `MONEY_STARTING_AMOUNT = 10`
- `GOOGOL = 1e100` — money balance required to prestige
- `TICK_RATE_MS = 1000`
- `AUTOBUYER_XP_COST_BASE = 1` (doubles per tier index)
- `OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1` — offline progress runs at 10% of normal speed
- `MAX_OFFLINE_SECONDS = 86400` (24 hours) — cap on real elapsed time counted toward offline progress

### Path aliases (`vite.config.js`)

`components/X` → `src/components/X`, `game/X` → `src/game/X`, `pages/X` → `src/pages/X`. Use these bare
aliases in imports (as the existing code does), not relative paths like `../../game/engine`.

## Testing

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`, `App.test.jsx`.
- Environment: jsdom, globals enabled (`describe`/`it`/`expect` without imports), setup file
  `src/setupTests.js` (imports `@testing-library/jest-dom/vitest`).
- Component tests use Testing Library (`render`, `screen`, `userEvent`) and query by role/label text rather
  than test IDs; `StatCard` panels carry `aria-label="<tier name> layer"` for this purpose, and each tier
  row's Buy button nests a visually-hidden `role="progressbar"` (via `VisuallyHidden`) with
  `aria-label="<tier name> cost-block progress"` plus `aria-valuenow`/`aria-valuemin`/`aria-valuemax` —
  the Buy/Upgrade/Unlock/Prestige buttons also carry an explicit `aria-label` with the full descriptive
  sentence (independent of their compact icon-based visible text — see Architecture above), so
  `getByRole('button', { name: … })` still matches even though a labeled node is nested inside them.
- Tests that seed `localStorage` directly must clear it in `beforeEach` (see `App.test.jsx`).
- `yarn test` is green (191 tests). All four test files assert against the current tier/resource id scheme
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
