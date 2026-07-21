# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
It documents **current behavior only** — signatures, constants, state shape, conventions. For the
*why* behind a design (superseded formulas, incident write-ups, empirical simulation results, UI
decision trade-offs), see `docs/DESIGN_HISTORY.md`. Check that file before changing a formula,
workflow, or mechanic a past iteration may already have tried and rejected for a specific reason.

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
needs updating, fix the workflow/check definition instead of routing around it.

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

## Automation workflows

Three workflows under `.github/workflows/` run Claude Code and GitHub automation unattended, working
together to open, fix up, and merge PRs with no human in the loop until an approval is needed — except
for a narrow, conservative class of low-risk bot-authored PRs that merge on green checks alone (see
Auto-merge below). All three authenticate git/GitHub operations with a `GH_AUTOMATION_PAT` repo secret
instead of the default `GITHUB_TOKEN`, because commits/pushes/merges authored by the default token
can't trigger other workflows (see `docs/DESIGN_HISTORY.md` for why this matters concretely).
`autonomous-maintenance.yml`/`autonomous-pr-followup.yml` additionally need `id-token: write` (OIDC
token for `claude_code_oauth_token` auth) and `autonomous-maintenance.yml` needs `issues: write` (so
its guard step's `gh issue list --label claude-task` doesn't silently return empty).

**Cost implications:** this repo is public, so GitHub Actions minutes on standard runners are free and
unlimited. The real constraint is Claude usage quota (`CLAUDE_CODE_OAUTH_TOKEN` is subscription-based):
bounded per-run by `--max-turns` (50 for `autonomous-maintenance.yml`, 30 for
`autonomous-pr-followup.yml`), and naturally self-limited further by the PR-dedup guard (below), which
caps concurrently-open autonomous PRs. See `docs/DESIGN_HISTORY.md` for the turn-budget escalation
history if you're considering changing these caps.

### Orchestration model

The maintainer orchestrates; the scheduled workflow develops. Interactive Claude Code sessions are
primarily for strategy discussion and turning that strategy into a backlog of well-defined, run-sized
`claude-task`-labeled GitHub issues (via `.github/ISSUE_TEMPLATE/claude-task.yml`: Goal / Context /
Spec & acceptance criteria / Files likely touched / Out of scope / Verification / Explicit
authorizations / Dependencies). The scheduled maintenance workflow implements those tasks unattended,
one per run; the follow-up + auto-merge workflows carry each PR to merge.

In an interactive session, when the user is discussing features, strategy, or a body of work, the
default deliverable is well-specified `claude-task` issues, not direct implementation — implement live
only when the user explicitly asks for that. Write each issue so an unattended 50-turn run can
complete it without asking questions. Split anything bigger into a sequence of issues ordered with
"Blocked by #N" lines. An issue's "Explicit authorizations" section is the maintainer's written
sign-off for changes the workflow otherwise hard-bans; security constraints (no `--no-verify`, no
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
motivated this): a `blocked`-labeled task issue is excluded from Phase A picks, and a 429
("session limit") failure is downgraded to a warning (job stays green) since it's purely transient.

**Concurrency.** A top-level `concurrency: { group: autonomous-maintenance, cancel-in-progress: false
}` block ensures no two runs of this workflow ever execute at once — a second trigger (e.g. a manual
`workflow_dispatch` from the dormancy watchdog firing while a scheduled cron run is still in progress)
queues behind the first rather than racing it. `cancel-in-progress` is deliberately `false`, not `true`:
cancelling an in-progress run mid-task would itself produce an orphaned `claude/auto-task-*` branch —
exactly the failure mode the orphaned-branch-recovery mechanism exists to clean up after — so queuing
avoids causing that unnecessarily rather than trading one race for another failure mode.

**Budget discipline.** Wall-clock time is not a constraint (one task every 5 hours is fine), but the
per-run turn/token budget is. Before starting whatever task it picks, Claude roughly sizes the work
against remaining turns, reserving ~15-20% for test + commit + push + PR-open overhead. If a task
looks too large even after buffering, it scopes down rather than risking `error_max_turns`: a Phase A
task lands its largest coherent, test-covered *slice* first (PR body says `Part of #<number>` instead
of `Closes #<number>`, plus a `gh issue comment` recording what remains); a Phase B menu task scopes to
one coherent sub-area and leaves the rest for a future run. Either way, Claude opens the PR as soon as
there's a meaningful, test-passing first commit and pushes each subsequent commit as it lands. A task
issue's `size:S`/`size:M`/`size:L` label is advisory context, not a gate. Skipping a task this way is
noted in reasoning/PR description, not silent.

**Reliability: cron dormancy.** GitHub Actions disables a workflow's cron trigger after 60 days with no
repository activity. Unlikely in practice since merged automation PRs count as activity and Phase B's
gap-analysis item keeps proposing new work — but the actual backstop is external: a periodic check on
separate infrastructure re-kicks the workflow via `workflow_dispatch` if it's gone quiet longer than
expected. See `docs/DESIGN_HISTORY.md` for detail.

**Phase 0 — CI/CD failures (top priority).** The guard step checks whether the latest completed
`ci.yml` run on `main` failed, and separately lists any open PR (excluding `claude/auto-*` and fork
PRs) with a failing check. Either condition outranks Phase A/B and is the one case allowed to bypass
the 5-PR ceiling below. If `main` is broken, Claude reads the failing run's logs, fixes the regression
on a branch named `claude/heal-main-<short-slug>`, confirms `yarn test`/`yarn build` are green, and
opens a PR (this branch prefix is already recognized by `pr-auto-merge.yml`'s low-risk path).
Otherwise, for a stale Dependabot PR confirmed behind `main` (failing only because its branch predates
a source change, not the dependency bump), Claude comments `@dependabot rebase` — checking existing
comments first, and never pushing its own commits to a `dependabot/*` branch. Any other failure without
an obviously safe fix is left for a human. If neither condition applies, falls through to Phase A.

**Phase A — task backlog next.** Claude picks the top eligible open `claude-task` issue —
`priority:high` first, then lowest issue number; skipping tasks already covered by an open autonomous
PR and tasks with an open "Blocked by #N" dependency — reads its full spec, and implements it on
`claude/auto-task-<number>-<short-slug>`. The PR body includes `Closes #<number>` unless it's a partial
slice (see Budget discipline). If the chosen task proves infeasible for reasons other than size, Claude
comments on the issue explaining what's blocking and ends without a PR.

**Phase B — maintenance menu fallback.** Only when no eligible task issue exists, the run picks the
single most valuable applicable task from: (1) test coverage gaps, (2) dependency & security
maintenance (`yarn audit` + safe patch/minor bumps), (3) code quality / simplification, (4) CLAUDE.md
documentation sync, (5) workflow self-improvement (scoped to `autonomous-maintenance.yml` only — may
not weaken the duplicate-PR guard, the budget cap, the never-self-merge rule, the always-open-a-PR
requirement, or Phase A's priority), (6) gap analysis — survey the repo for a gap not already covered
by an open issue/PR and file exactly one well-specified `claude-task` issue proposing a solution (never
opens a PR itself; new proposals get both `claude-task` and `gap-analysis` labels).

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

## Documentation

Always update this file (`CLAUDE.md`) in the same change/commit as any code change it describes —
don't leave it as a follow-up. If a change touches function signatures, constants, state shape,
economy/game-rule behavior, file layout, or test counts documented below, update the corresponding
section here before considering the change done. A code change and a stale doc describing the old
behavior should never ship together. If a change is significant enough to need a rationale trail
(a superseded formula, a rejected alternative, an incident write-up), add it to
`docs/DESIGN_HISTORY.md` in the same commit rather than folding narrative into this file.

## Repo layout

```
src/
  game/
    layers.js             ← TIER_DEFINITIONS array + all game constants (single source of truth)
    engine.js              ← pure state functions (no React, no side effects)
    useIncrementalGame.js  ← React hook; wires the engine to useState + localStorage + the tick timer
    storage.js              ← localStorage save/load/clear + save-schema migration, plus the separately
                               keyed last-save timestamp used to compute offline progress
  components/
    Button/index.jsx        ← styled button (`.jsx`, not `.js` — see `ButtonContent` below, which
                               needs JSX); every caller passes `color` explicitly (no defaultProps —
                               React 19 dropped defaultProps support for function components, so it's a
                               silent no-op there), plus optional progress-fill props (`$progress`,
                               `$secondaryProgress`, `$progressColor`, `$secondaryProgressColor`, `$pulse`)
                               rendered as an on-button gradient fill (reduced alpha when `disabled`), a
                               `:focus-visible` outline colored from the button's own `color` prop, no
                               opacity-based disabled dimming (color + cursor signal disabled state
                               instead), and `display: flex` with `align-items`/`justify-content: center`
                               so plain (icon-less) button text still centers normally. Also exports
                               `ButtonIcon` (a `flex: 0 0 auto` span, pinned to a fixed-width slot on the
                               left) and `ButtonLabel` (`flex: 1 1 auto; text-align: center`, filling the
                               remaining space) — together they keep a button's leading icon at a stable
                               left position regardless of the label's length, while the label itself
                               still reads as centered in the space after the icon, rather than the old
                               behavior of the whole icon+label string sliding left/right together as one
                               centered block. `ButtonLabel` also carries its own `overflow: hidden;
                               text-overflow: ellipsis; white-space: nowrap` (needed even when the outer
                               `Button` already clips overflow, since a flex child's own text doesn't
                               inherit an ancestor's ellipsis truncation — without this a label too wide
                               for its shrunk flex share renders as a silent hard cut mid-character
                               instead of a visible `…`). `ButtonContent` is a small helper component that
                               splits a
                               single pre-formatted "🛒 Lv.10 $100"-style string (every such label in this
                               app follows the icon-then-word convention) into `ButtonIcon`/`ButtonLabel`
                               at the first space — used wherever a caller already builds one combined
                               label string; callers that compose their visible text from multiple JSX
                               expressions (interpolated amounts, conditionals) wrap it directly in
                               `<ButtonIcon>`/`<ButtonLabel>` instead, since `ButtonContent` only accepts
                               a single string child. Also exports `VisuallyHidden`, a clip-hidden node
                               used both for a nested `role="progressbar"` and for supplementary
                               `aria-describedby` text
    Money/index.js          ← styled money/amount display
    StatCard/index.js       ← styled card container used for every panel
  pages/
    MainPage/index.jsx      ← single page; compact one-line-per-tier layout, data-driven from TIER_DEFINITIONS
  theme/
    tokens.js               ← design-token single source of truth: per-mode (dark/light) color, shadow &
                               tier-accent sets + mode-independent space/radius/motion/font/type scales;
                               exports buildTheme(mode) + themes.{dark,light} (see "Theming" below)
    GlobalStyle.js          ← createGlobalStyle: box-sizing reset, base font/smoothing, form `font: inherit`,
                               and the token-driven page background/text (absorbs the removed index.css/App.css)
    index.jsx               ← <ThemeProvider mode> wrapper (styled-components ThemeProvider) + re-exports;
                               `mode` defaults to dark and is the seam #140 will drive from system pref + toggle
  App.jsx                   ← root component; wraps <ThemeProvider><GlobalStyle/><MainPage/> 
  index.jsx                 ← ReactDOM.createRoot entry point
vite.config.js               ← path aliases + dev/test server config
```

## Architecture

Strict three-layer separation:

1. **`engine.js`** — all game logic is pure functions of `(args) => state => newState`, with no React
   and no side effects. Every mutation returns a new state object; invalid actions (can't afford, tier
   locked) return the *same* state reference unchanged, which callers use as a no-op signal (see
   `tickGame`'s autobuyer loop, which breaks as soon as `buyTier` returns the same object back).
2. **`useIncrementalGame.js`** — the only place holding React state. Owns the `setInterval` tick timer
   and the localStorage persistence effect, and exposes `{ state, actions, resetGame, offlineProgress,
   dismissOfflineProgress }`. Every purchase — manual Buy and autobuyer ticks alike — always batches up
   to the current 10-unit cost-block boundary, via a fixed module-scoped `BUY_QUANTITY = 10` constant
   passed into `tickGame` as `autobuyerBatchSize` and into `actions.buyTierQuantity` (this replaced a
   removed player-facing ×1/×10 "Bulk" toggle — no persisted preference to manage). On mount, a
   one-time `computeInitialGame` helper loads any saved state, reads `loadLastSaveTimestamp()`, and —
   if elapsed real time registers at least one simulated second — folds in offline progress via
   `applyOfflineProgress` before the first render, recording a one-shot `{ elapsedRealSeconds,
   effectiveSeconds }` summary as `offlineProgress`; `dismissOfflineProgress` (and `resetGame`) clear
   it back to `null`. This happens once, before the tick timer starts.
3. **`MainPage/index.jsx`** — a pure renderer driven entirely by `TIER_DEFINITIONS` and the hook's
   `state`. Renders each unlocked tier as a single compact grid row rather than separate cards. See
   "MainPage reference" below for the full field-by-field layout.

### MainPage reference

- **Owned vs. level.** `Owned` (current amount, drives production) is its own figure. `Purchased`
  (lifetime buy count, drives cost scaling and — every 10 of them — a production doubling via
  `getPurchaseMilestoneMultiplier`) has no separate cell: it shows on the Buy button's visible text
  as `{level}+{quantity}` (e.g. `30+10` — current level plus the quantity this purchase adds, so the
  sum reads as the level the purchase reaches) inside `ButtonIcon` alongside the 🛒 glyph, pinned
  immediately next to the icon rather than centered — this keeps the level digits starting at the
  same x position across every tier row regardless of the cost string's length. The quantity suffix
  is omitted (just the bare level shows) once nothing is affordable. The `aria-label` carries a
  `(level N)` suffix in words instead. State field names (`state.purchased`, `getTierPurchasedCount`,
  `getPurchaseMilestoneMultiplier`) are unchanged; only the player-facing term is "level".
- **Tier name display.** The tier row heading (`TierName`, a `styled.h3`) and the PP Upgrades page's
  per-tier row label both render `tier.symbol` (e.g. `B`, `KB`) as the visible text, not the full
  `tier.name` — a decluttering choice, since the compact symbol already appears throughout the row
  (cost/production strings via `RESOURCE_SYMBOL`) and the full name would be redundant clutter at this
  density. The full name isn't dropped: `TierNameLabel` wraps a `<VisuallyHidden>{tier.name}</VisuallyHidden>`
  ahead of an `aria-hidden="true"` span holding the visible symbol, so the heading's accessible name is
  still the tier's full name (unchanged for screen-reader heading navigation) even though sighted users
  only see the glyph; a `title={tier.name}` on the same element gives sighted mouse users an equivalent
  hover tooltip. Every other `tier.name` usage in this file (row `aria-label`s, button `aria-label`s/
  `title`s, disclosure prose) is unaffected — it's only these two visible-label render sites that switch
  to the symbol.
- **Balances.** Money via `formatCurrency` and (once `!isFirstRun`) the Prestige Point balance are the
  only top-of-page blocks besides `Header` that use a centered `CenteredCard` (`styled(StatCard)`).
  Both are wrapped in a sticky `StickyBalances` container: once scrolled past their normal position
  they pin to the viewport top and compress into a compact side-by-side bar, detected via an
  IntersectionObserver on a zero-height `BalancesSentinel` (falls back to always-expanded when
  IntersectionObserver is unavailable, e.g. jsdom); the stick position drops below `TopPrestigeBar`
  when it's showing, by that bar's own live-measured height (`topPrestigeBarHeight`, see below) rather
  than a guessed constant, to avoid underlap. There is no aggregate `+X/sec` line — each tier row's own
  `+X` figure is the per-tier replacement. In the compressed side-by-side layout, `CenteredCard`'s
  `align-items: center` (needed so its content centers when expanded) would otherwise let a flex-column
  child shrink-wrap to its own full content width instead of the card's allotted half-share — silently
  defeating the `overflow: hidden`/`text-overflow: ellipsis` truncation meant to keep a long balance or
  PP status string from visually spilling into the neighboring card. `Money` and the status `<p>` are
  both given an explicit `width: 100%` in the compressed styles specifically to pin them to the card's
  actual width so that truncation has something to truncate against.
- **Description prose** (Speed Up/Prestige cards' full explanations, the full-smart-autobuyer notice,
  the page's own tagline under the `Header`'s `<h1>`) lives inside an `InfoDetails` (`styled.details`)
  click-to-expand disclosure, with the card's own heading — `<h1>Tens</h1>` for the page header,
  `<h2>` for every card — as the clickable `<summary>`. The Prestige card's status lines (prestiged
  count · unspent PP · speed bonus) live inside the disclosure too — collapsed, the card is nothing
  but its heading and buttons. The disclosure marker is hidden via CSS. `InfoDetails`' `summary` is
  styled `width: fit-content` so the click target hugs just the heading text rather than spanning the
  full row; the page header additionally centers that fit-content `summary` with `margin: 0 auto`
  since it sits in an otherwise `text-align: center` block (a block-level element ignores its
  parent's `text-align`, which only centers inline content).
- **Buy button.** Manual Buy always grabs as many units as are currently affordable up to the 10-unit
  cost-block boundary (`getTierAffordableQuantity`/`buyTierQuantity`) — no player-facing batch-size
  control. Renders its cost-block progress as an on-button gradient fill via `Button`'s
  `$progress`/`$secondaryProgress` props (green = units already bought this cost block, `purchased %
  10`; amber = units affordable now but not yet bought). Prestige gets the same single-tone fill
  treatment (spendable ÷ cost, or `prestigeProgressPercent`), and both pulse (`$pulse`) when
  actionable. Every PP-spending button (per-tier Unlock/Smart, Auto Speed Up, Unlock Speed Bonus,
  Auto-Prestige — all on the PP Upgrades page) carries the same single-tone fill (unspent PP ÷ that
  button's cost, `ppProgressPercent`), each nesting a `VisuallyHidden` `role="progressbar"`
  (`aria-valuenow` = PP balance capped at cost, `aria-valuemax` = cost).
- **Compact labels.** Buy/Prestige/Reset render compact visible text — an icon in place of the action
  word (🛒 Buy, ✦ Prestige, ↺ Reset) plus the cost, and (via `formatCost`) the paying tier's short
  `RESOURCE_SYMBOL` (e.g. `Ks`) instead of its full name — while each button's `aria-label` carries the
  full descriptive sentence (`"Buy ×10 for $100"`, `"Prestige (requires 1 Googol Money)"`, `"Reset
  game"`, …) used by assistive tech and `getByRole('button', { name })` tests. Buy's icon slot also
  carries the level+quantity text (see "Owned vs. level" above) — see there for why it's pinned next
  to the icon rather than folded into the centered cost label.

**Game view vs. PP Upgrades view.** `MainPage` renders one of two views, toggled by a local
`useState('game' | 'upgrades')` — still a single-page app with no router; the toggle is just which JSX
block renders. A `ViewNav` tab pair (`role="tablist"`) only appears once `!isFirstRun`. The PP Upgrades
tab shows a `NavDot` (`aria-label="PP upgrade available"`) whenever `hasAffordablePpUpgrade` is true
(the Money-funded global tickspeed multiplier *itself* doesn't factor into this dot, since it's not a
PP purchase — only its automation toggle, Tickspeed Autobuyer, does). Money/PP balances stay visible
across both views; `GlobalTickspeedCard`, `TierList`, `SpeedUpCard`, `PrestigeCard`, and the Reset
button are Game-view-only; every PP-spending control lives on the Upgrades view.

**Global Tickspeed Multiplier card (Game view).** Unlike every other automation upgrade, this one is
Money-funded (not PP-funded) and lives on the Game view as its own `GlobalTickspeedCard`, rendered at
the very top of the Game view — above `TierList`/tier 1, before anything else — since it's relevant
from the very start of a run, well before Speed Up or Prestige are, or even the tier list itself. See
"The global tickspeed multiplier" below for the underlying `engine.js` mechanics. The heading itself is
plain (`Global Tickspeed Multiplier`, no level/percent readout), inside the card's `InfoDetails`
`<summary>`. The current level and its cumulative speed bonus (`Currently Lv.N — +N% faster ticks on
every tier.`) show **only** inside the expanded description — never on the heading or the button — so
the compact collapsed view never changes shape as the level climbs; the description stays in the DOM
(and reachable by `aria-describedby`/text-content queries) even while the `<details>` itself is
collapsed. The button carries `$progress` (Money ÷ cost) the same way Buy does, reading `🌐 Enable for
{cost}` before the first purchase or `🌐 Upgrade for {cost}` after — its `aria-label` alone still spells
out the current cumulative bonus for assistive tech, independent of the collapsed/expanded visual
state. A `globalTickspeedCardEverRevealed` flag (seeded from/latched to
`isGlobalTickspeedMultiplierUnlocked(state)`) follows the same `everRevealed` pattern as
`SpeedUpCard`/`PrestigeCard` — once tier02 has ever been owned (or the multiplier is already active),
the card stays visible rather than disappearing if tier02's owned count is later reset by a
Prestige/Speed Up; Reset clears the flag alongside `speedUpEverRevealed`/`prestigeCardEverRevealed`. It
needs no `!isFirstRun` gate — unlike the PP Upgrades page, it has nothing to do with Prestige Points, so
it's available (once tier02 is owned) even during a player's very first run. Clicking is optional: once
`buyTickspeedAutobuyer` is bought (PP-funded, see "Prestige Points, autobuyer unlock, and the tickspeed
multiplier" below), `tickGame` calls `buyGlobalTickspeedMultiplier` automatically every tick, so the
level climbs on its own whenever Money allows — the manual button works identically either way.

**Tickspeed multiplier (Game view, per tier).** Every unlocked tier's row carries a Money-funded
`UpgradeButton` in the grid slot the old Upgrade/Unlock button used to occupy — enabled by default from
the moment the tier itself is unlocked, with **no** autobuyer-unlock or PP prerequisite at all (see
"Prestige Points, autobuyer unlock, and the tickspeed multiplier" below). Clicking it spends
`getTickspeedMultiplierCost(tierId, currentLevel + 1)` of the tier's own resource via
`actions.buyTickspeedMultiplier`, raising that tier's tickspeed level by 1 — each level speeds up that
tier's own delivery frequency by another 10% (`getTickspeedProductionMultiplier`, divided into the
tier's effective period rather than multiplied into its production credit — see "Tier production
tickspeed" below); it changes **neither** the amount delivered per batch **nor** autobuyer
purchase-attempt frequency (that rate is flat). Visible text is `⚙ {cost} {symbol}` — a single ⚙
icon (matching the badge below and the tier tickspeed autobuyer's `⚙ Active` badge on the PP
Upgrades page) identifies the button as the tickspeed control; no separate icon marks the marginal
effect, since it's always exactly `TICKSPEED_PRODUCTION_STEP` (every level adds the same fixed 10%
step) and implied by the button itself — `aria-label`/`title` still spell out the full "+10% faster
ticks" sentence for assistive tech. A compact badge beside the tier name (gated on tickspeed level > 1) shows
`⚙ +N%` — the cumulative speed bonus (faster deliveries, and genuinely level-dependent unlike the
button's fixed marginal step), not a production-amount bonus.

**PP Upgrades view.** A `UpgradesList` groups every purchase into a small number of labeled
**categories** rather than one flat list — each category is a single `UpgradeCategory`
(`styled(StatCard)`, one `CategoryHeading` plus its rows) and each row inside it (`UpgradeRow`) is a
lean, unboxed flex row (no border/padding/background of its own — just a thin `border-top` divider
between consecutive rows), rather than the older one-`StatCard`-per-row layout: a category of *N*
purchases costs one card's worth of chrome, not *N*. Three categories, in order:
1. **Tier Autobuyers** — per unlocked tier, up to three independent controls: **Unlock** (blue, 🤖,
   `actions.buyAutobuyerUnlock`, cost `getAutobuyerUnlockCost` — every tier, including `tier01`, unlocks
   identically) shows only while the tier's autobuyer is still locked. Alongside it (shown regardless of
   Unlock's state — see "Prestige Points, autobuyer unlock, and the tickspeed multiplier" below) is the
   **tier tickspeed autobuyer** (⚙, `actions.buyTierTickspeedAutobuyer`, cost
   `getTierTickspeedAutobuyerCost` — 2x the unlock cost — automates that tier's own Money-funded
   tickspeed multiplier, which is itself buyable by default with no PP gate at all). **Smart** (🧠,
   `actions.buySmartAutobuyer`, cost `getSmartAutobuyerCost` — 10x the unlock cost) only appears once
   Unlock is bought, since it specifically optimizes unit-buying autobuyer behavior. Each shows as a
   button until bought, then a persistent badge. The row disappears only once Smart and the tier
   tickspeed autobuyer are *both* bought (which implies Unlock is done too, since Smart requires it).
   Once every tier has bought both (`allTiersFullyAutomated`), the per-tier list inside this category is
   replaced by a single "full smart autobuyer notice".
2. **Global Automation** — rows ordered by ascending PP cost: **Tickspeed Autobuyer** (🌐, automates the
   Money-funded *global* tickspeed multiplier, which itself lives on the Game view, not here — distinct
   from the per-tier tickspeed autobuyer in category 1 above), **Auto Speed Up** (⏩, badge "⏩ Active"
   once bought, otherwise a button), both gated only on `!isFirstRun`, and **Auto-Prestige** (✦, only
   once `allTiersFullyAutomated`; shows its current level inline when active). Each row's icon matches
   the icon of the feature it automates (🌐 Global Tickspeed Multiplier card, ⏩ Speed Up card, ✦
   Prestige card/button) rather than a generic automation glyph, so the three rows stay visually
   distinct from each other and from the per-tier automation icons in category 1 above (🤖 Unlock, ⚙
   tier tickspeed autobuyer, 🧠 Smart).
3. **Production Bonuses** — currently just **Production speed bonus**; the whole category is omitted
   once it's bought, since there's nothing left to show there (unlike Auto Speed Up/Tickspeed
   Autobuyer, it has no persistent "Active" badge — its effect is already visible in the PP balance
   display and `PrestigeCard`).

No item on this page uses the old "reveal one by one, cheapest first" teaser gating anymore — once the
page itself is reachable (`!isFirstRun`), every purchase shows immediately, subject only to a real
prerequisite (Smart requiring that tier's autobuyer already unlocked — the tier tickspeed autobuyer has
no such prerequisite) or a deliberate progression gate (Auto-Prestige's `allTiersFullyAutomated`, an
intentional endgame gate, not a cost-ordering teaser).

The Global Tickspeed Multiplier is *not* one of these PP rows — it's Money-funded and lives on the Game
view instead (see "Global Tickspeed Multiplier card" above / "The global tickspeed multiplier" below);
only its automation toggle (Tickspeed Autobuyer) is PP-funded and lives here.

**Speed Up / Prestige cards stay visible once revealed.** A `speedUpEverRevealed` boolean (seeded from,
and latched permanently true the first time, `lastTierUnlocked`) drives `SpeedUpCard`'s render
condition instead of a live check — once shown, it stays shown, with its button simply going disabled
rather than the card vanishing. `PrestigeCard` gets identical treatment via `prestigeCardEverRevealed`
(seeded from/latched to `!isFirstRun || getTierPurchasedCount(state, lastTier.id) >= 10`). Both flags
reset only on a full Reset (`handleResetClick`), never on an ordinary Speed Up or Prestige.

**Accessibility.** Each PP-spending button nests a `VisuallyHidden` `role="progressbar"` span, so the
explicit `aria-label` on the button itself is required (accessible-name computation would otherwise
recurse into the nested node). Buy/Prestige/Reset carry a `title` tooltip; Prestige and Reset
additionally wire `aria-describedby` to a description (the app's only irreversible actions).

**Tier row visuals.** Each `TierLine` gets a thin `border-left` accent cycled from a fixed palette by
`tierIndex % length` (cosmetic only, kept off text/button colors to avoid colliding with
affordability semantics), and plays a one-shot CSS reveal animation when a tier unlocks *during the
current session* (tracked via a mount-time `Set` snapshot of already-unlocked tier ids, not live mount
timing, since locked tiers render `null` and would otherwise "mount" on every load). Each row is a CSS
Grid with fixed `grid-template-areas`/`grid-template-columns` at every viewport width: name (+ compact
`⚙ +N%` badge), then the production figure and the owned count — in that order, production first — on
the top line, then the tickspeed multiplier button and Buy (each spanning two of four equal-width
tracks) on the middle line, then a third `details`-area line spanning all four tracks. `ProductionText`
sits in the wider (1.3fr) track and `OwnedText` in the narrower (0.7fr) one, matching their typical
content length, with `text-align: right` on whichever one is currently rightmost (`OwnedText`) so it
hugs the row's edge. Below `40rem`, only fonts/spacing shrink. The owned cell's "Owned: " label is a
`VisuallyHidden` span (plus `title="Owned"`) — assert via `toHaveTextContent`, not `getByText`. Grid
cells use a shared `gridCell` mixin (`min-width: 0; overflow: hidden; text-overflow: ellipsis;
white-space: nowrap`). `RootDiv` sets `font-variant-numeric: tabular-nums`.

**Tier row details disclosure.** Unlike `SpeedUpCard`/`PrestigeCard`/`GlobalTickspeedCard`/the page
`Header` (which each show a visible `<summary>` line of their own inside a native `InfoDetails`, see
"Description prose" above), a tier row has **no separate visible trigger at all**: `TierName` itself,
wrapped in `TierNameTrigger` (`grid-area: name`, `role="button"`, `tabIndex={0}`, `aria-expanded`,
`aria-controls`), is the trigger, sitting in its normal spot rather than a redundant "Details" label
elsewhere in the row. This is a **plain React-controlled disclosure**, not native `<details>`/
`<summary>` — a `display: contents`-based version (matching every other `InfoDetails` disclosure) was
tried first, but hit a real Chromium limitation: a `display: contents` ancestor breaks a promoted grid
child's ability to span multiple `grid-template-areas` cells, so the details content collapsed to a
single column's width instead of the full row (confirmed with a minimal repro, independent of whether
the span was expressed via a named area or explicit `grid-column` line numbers). `openTierDetailIds`
(a `Set` of expanded tier ids, in `MainPage`) tracks which rows are expanded;
`TierNameTrigger`'s `onClick` toggles it and calls `event.stopPropagation()`, and its `onKeyDown`
handles Enter/Space so keyboard operability doesn't regress from what native `<summary>` would give
for free. Applying `role="button"` to `TierNameTrigger` doesn't affect `TierName`'s own heading
semantics — ARIA role only overrides an element's *own* implicit role, never a nested descendant's, so
the `<h3>` inside it stays in the heading-navigation outline. The disclosure's content (a small `<ul>`,
see below) is `TierDetailsContent`, a plain `grid-area: details` div rendered *only* while its tier id
is in `openTierDetailIds` — collapsed, nothing renders there at all, so the row's `details` grid line
contributes zero height, an even more compact collapsed footprint than a visible "Details" line would
give, and (being a normal, non-`display: contents`-promoted grid item) correctly spans the full row
width when expanded.

Clicking the tier name isn't the only way in: `TierLine` itself carries an `onClick` that also toggles
`openTierDetailIds` for a click anywhere else on the tile — skipped when the click originated inside a
`<button>` (so Buy/tickspeed clicks never also toggle the disclosure); a click inside
`TierNameTrigger` never reaches this handler at all, since its own `onClick` already stopped
propagation. `TierLine` sets `cursor: pointer` accordingly, inherited by everything in the row except
the two buttons, which override it via their own `disabled`-dependent cursor rule. Expanding it lists,
in the `<ul>`: the tier's base tickspeed (`getTierBaseTickSpeedSeconds`, from `layers.js`) and effective
tickspeed (`getEffectiveTierTickSpeedSeconds`, with the contributing tier/global tickspeed multipliers
named inline), the purchase milestone multiplier and the lifetime purchase count driving it
(`getPurchaseMilestoneMultiplier`), the Speed Up multiplier (only shown once `speedUpCount > 0`), and
the tier's cost/produces resource symbols. This is the only place in `MainPage` that surfaces a tier's
base/effective tickspeed numbers directly — added once per-tier base tickspeed started diverging again
(see "Tier production tickspeed" above) — everywhere else it only shows up indirectly via the `⚙ +N%`
badge and the tickspeed button's own tooltip.

**Offline notice.** When the hook reports a non-null `offlineProgress`, a dismissible
`OfflineNoticeCard` ("Welcome back! …", via `formatOfflineDuration`) renders above the money display;
never reappears once dismissed or state is reset. Self-dismisses via a countdown
(`OFFLINE_NOTICE_AUTO_DISMISS_MS`, 10s) driving the Dismiss button's `$progress` fill, then an opacity
fade (`OFFLINE_NOTICE_FADE_MS`, 400ms) before `dismissOfflineProgress` removes it. Clicking the card
itself (not Dismiss) extends the deadline to `OFFLINE_NOTICE_EXTENDED_DISMISS_MS` (60s) from that
click. Dismiss's click handler calls `event.stopPropagation()`.

Once `isProductionFrozen(state)` is true, every control except Prestige disables — see "Prestige and
the Googol freeze" below.

## Economy model

There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Bytes` through `Ronnabytes` (a byte-scale/computing theme — `Bytes`, `Kilobytes`,
`Megabytes`, `Gigabytes`, `Terabytes`, `Petabytes`, `Exabytes`, `Zettabytes`, `Yottabytes`,
`Ronnabytes`). `id` is a naming-agnostic key, fully decoupled from `name`/`symbol` — a future re-theme
only needs to touch `name`/`symbol`, never state keys, tests, or save data.
**Every tier is bought directly with `Ones` (money)** — `costResourceId` is `MONEY_ID` for all of them.
Once owned, a tier produces the tier immediately below it (`producesResourceId`), cascading production
down to `Ones`. `tier01` (`Bytes`) is the special case where `costResourceId === producesResourceId ===
MONEY_ID`: it's the entry-level generator, bought with money to produce more money.

A tier unlocks once you own **≥ 10** of the tier below it (`isTierUnlocked`); already-owned tiers stay
unlocked even if the rule changes later, so old saves stay playable.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js` — needs a naming-agnostic `id` (next in the
`tier0N`/`tierNN` sequence), `name`, `symbol`, `baseCost`, `costResourceId: MONEY_ID`,
`producesResourceId` set to the previous tier's `id`, and `baseTickSpeedSeconds` set to the next integer
in the sequence (`tierIndex + 1` seconds — a hypothetical 11th tier would be `11`; see "Tier production
tickspeed" below). No other file should need changing.

### Tier production tickspeed

Each tier has its own **independent base tickspeed** — a plain `baseTickSpeedSeconds` field directly on
its `TIER_DEFINITIONS` entry (read via `getTierBaseTickSpeedSeconds` in `layers.js`), not derived from
tier order or a shared formula, though the current values happen to follow one (`tierIndex + 1`). It's
how often, in seconds, that tier delivers a single batch of production rather than continuously every
global tick (the global tick fires every `TICK_RATE_MS` — 100ms/10Hz — much finer than any tier's own
tickspeed). **Each tier's cadence increases by 1s down the list** — tier01=1s (matching the global tick)
up through tier10=10s — so later tiers deliver batches less often by design, offset by the tickspeed
multipliers below rather than by a faster base cadence. This exact 1s–10s ladder was tried once before
the tickspeed-multiplier system existed and reverted to a uniform 1s because nothing could compensate
for the slowdown; see `docs/DESIGN_HISTORY.md` for both that original revert and this reintroduction.
Nothing structurally prevents the per-tier values from diverging from the `tierIndex + 1` pattern in the
future; it's a balance choice, not a constraint the field enforces. `MainPage` doesn't show this as an
averaged `/sec` rate — see "Production figure" below, and shows the base/effective values explicitly in
each tier row's collapsed-by-default Details disclosure — see "MainPage reference" below.

This base period is then shrunk by both tickspeed multipliers — the tier's own
(`getTickspeedProductionMultiplier`, from `tickspeedLevels[tierId]`) and the global one
(`getGlobalTickspeedProductionMultiplier`, from `globalTickspeedMultiplier`) — via
`getEffectiveTierTickSpeedSeconds(state, tierId) = getTierBaseTickSpeedSeconds(tierId) /
(tickspeedMultiplier × globalTickspeedMultiplier)`. **Both multipliers speed up how *often* a tier
delivers a batch, not how much lands in it** — see "Tickspeed multiplier"/"The global tickspeed
multiplier" below for the full mechanics (`docs/DESIGN_HISTORY.md` covers why this replaced an earlier
design that scaled the delivered amount instead).

The mechanism lives entirely in `tickGame` (`engine.js`): `state.tierProductionAccumulators` banks
fractional seconds per tier, incremented by `elapsedSeconds` every tick. Once a tier's accumulator
reaches its own effective tickspeed (`getEffectiveTierTickSpeedSeconds`), `tickGame` delivers `floor(owned
× (whole effective periods elapsed) × getPrestigeProductionMultiplier(points) ×
getPurchaseMilestoneMultiplier(purchased))` — multiplying by the *count* of completed periods, not
elapsed seconds, and with **neither tickspeed multiplier appearing in this credit formula at all** (they
already did their work by shrinking the period, which is what grows the completed-period count) — and
banks any leftover remainder. In the running app, `elapsedSeconds` is `TICK_RATE_MS / 1000` (0.1) per
live tick; during offline-progress replay, `applyOfflineProgress` calls `tickGame(1, …)` once per
simulated second instead. A tier with effective tickspeed *N* accumulates without producing until *N*
seconds' worth of `elapsedSeconds` have banked, then delivers exactly one tick's worth — a slowdown vs.
producing every second at the un-shrunk base value, or a speedup once tickspeed multipliers shrink *N*
below 1s. Because ticks arrive in fractional (0.1s) increments, `tickGame` nudges threshold comparisons
by a `TICK_ACCUMULATION_EPSILON` (`1e-9`) constant to absorb IEEE-754 drift; the same epsilon applies to
the autobuyer and Auto-Prestige attempt-budget threshold checks.

#### Multiplier outcomes are floored

`owned` and `resources` are integer-valued by construction, so a production credit must itself always
be an integer. Of the factors in a tier's production credit (`owned × ticksElapsed × multiplier ×
speedUpMultiplier × getPurchaseMilestoneMultiplier(purchased)`, where `multiplier` is
`getPrestigeProductionMultiplier(points)` once `prestigeSpeedBonusUnlocked` is true, else a flat `1`),
`owned`/`ticksElapsed` are already integers and `getPurchaseMilestoneMultiplier`/`getSpeedUpMultiplier`
are always powers of 2 — the only fractional factor is `getPrestigeProductionMultiplier` (`1 + 0.01 ×
points`). **Neither tickspeed multiplier appears in this formula** — `getTickspeedProductionMultiplier`
(`1.1^(level - 1)`) and `getGlobalTickspeedProductionMultiplier` (`1.1^level`) are instead divided into
the *period* `ticksElapsed` counts against (see `getEffectiveTierTickSpeedSeconds`/"Tier production
tickspeed" above), so their effect on the eventual total is unchanged but arrives via more completed
periods rather than a bigger per-period credit. `tickGame` wraps the whole product in `Math.floor(...)`
before crediting it — never zeroes out production for `owned > 0` since `getPrestigeProductionMultiplier`
is always ≥ 1. `MainPage`'s displayed `+X` production preview mirrors this same `Math.floor(...)`.
Rate-accumulator constants (`getAutoPrestigeAttemptRate`, and cost-scaling values like
`getAutobuyerUnlockCost`/`getSmartAutobuyerCost`/`getAutoPrestigeCost`/`getGlobalTickspeedMultiplierCost`/
`getTickspeedMultiplierCost`) are unaffected — cost values are always already integers, and attempt-rate
multipliers are process bookkeeping (an intentionally-banked fractional budget), not a resource total
shown to the player.

#### Production figure (tick-progress ring removed)

Each tier row's `+X` production figure is the raw per-delivery credit (`owned ×
getPrestigeProductionMultiplier(points) × getPurchaseMilestoneMultiplier(purchased)`, **not** divided by
tickspeed, and **not** multiplied by either tickspeed multiplier — see "Multiplier outcomes are floored"
above) — "how much lands each time the tier's (tickspeed-shrunk) period completes," not a per-second
average. A tier's tickspeed level and the global tickspeed multiplier change how *often* this figure
lands, never its value — the tier row's `⚙ +N%` badge and the Global Tickspeed Multiplier card are where
that speed bonus is actually surfaced (see "Tickspeed multiplier"/"MainPage reference" above).
`getTierProductionProgressPercent`/`getEffectiveTierTickSpeedSeconds` (and the former's
`previousAccumulator`/`elapsedSeconds` "just delivered" detection) remain in `engine.js` with unit tests
as read-only accessors, currently unused by `MainPage` (see `docs/DESIGN_HISTORY.md` for why the ring UI
`getTierProductionProgressPercent` used to drive was removed).

### Offline progress

Time away from the game is simulated at **10% speed** (`OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1`) when
the page is reopened, capped at `MAX_OFFLINE_SECONDS` (24 hours) of real elapsed time before the
multiplier is applied. `getOfflineEffectiveSeconds`/`applyOfflineProgress` (`engine.js`) replay
`tickGame(1, autobuyerBatchSize)` once per *simulated* second — not one lump-sum call — so autobuyers
get the same one-purchase-attempt-per-tick cadence they'd have had live, just at 10% speed. This replay
granularity is independent of `TICK_RATE_MS` — `applyOfflineProgress` always passes `elapsedSeconds = 1`
regardless of live tick rate. `storage.js`'s `saveGameState` stamps a separate
`tens_last_save_timestamp` localStorage key with `Date.now()` on every save; `loadLastSaveTimestamp`
returns `null` if missing (no prior save, or predates this feature) — a `null` timestamp skips offline
progress entirely rather than guessing. `clearGameState` (via `resetGame`) removes this key too.

### Prestige Points, autobuyer unlock, and the tickspeed multiplier

Prestiging awards **Prestige Points (PP)**, a permanent, cumulative currency (`prestige.points`) that
never resets and stacks across every future prestige (see `docs/DESIGN_HISTORY.md` for why this
replaced direct production doubling). `getPrestigePointsAwarded(money) = floor(log10(money) /
log10(GOOGOL))` — always at least 1 (prestiging requires Money ≥ `GOOGOL`), only increasing once a
further full 100 orders of magnitude are reached. `prestigeGame` adds newly-awarded points on top of
any already-unspent balance.

Unspent PP has one passive effect (gated behind a one-time unlock) and seven active uses:

- **Passive (gated):** `getPrestigeProductionMultiplier(points) = 1 + PRESTIGE_POINT_SPEED_BONUS *
  points` (`PRESTIGE_POINT_SPEED_BONUS = 0.01`) — +1% production speed per unspent point, applied
  uniformly to every tier in `tickGame`. A pure formula, not auto-applied — inert (every caller uses a
  flat ×1) until `state.prestigeSpeedBonusUnlocked` is true.
- **Active — unlock the speed bonus:** `buyPrestigeSpeedBonus(state)` permanently spends
  `PRESTIGE_SPEED_BONUS_UNLOCK_COST` PP (`10000` — the priciest of the four global PP automation
  unlocks, since it's passive/always-on) to set `prestigeSpeedBonusUnlocked = true`. No-op if already
  unlocked, insufficient points, or frozen.
- **Active — autobuyer unlock:** `buyAutobuyerUnlock(tierId)` is the **only** way to get a tier's
  autobuyer buying units automatically. Spends `getAutobuyerUnlockCost(tierId)` PP —
  `AUTOBUYER_UNLOCK_BASE_COST * (tierIndex + 1)` (`AUTOBUYER_UNLOCK_BASE_COST = 1`), a flat, small
  per-tier cost from 1 PP (first tier) up through 10 PP (10th/last tier), deliberately independent of
  the much steeper Money-funded tickspeed multiplier ladder — to set `autobuyers[tierId]` from `null`
  to a plain truthy flag. It has no bearing on the tier's own (Money-funded) tickspeed multiplier at
  all — that's buyable by default with no PP prerequisite (see "Tickspeed multiplier" below). No-op if
  already unlocked, tier itself not unlocked, or insufficient points. `autobuyers[tierId]` (once
  non-null) is permanent — never reset by `prestigeGame`/`speedUpGame`.
- **Active — Smart:** `buySmartAutobuyer(tierId)` permanently spends PP to make a tier's autobuyer buy
  singly until 10 lifetime purchases (then revert to normal full-block batching) — **requires the
  autobuyer already unlocked** (enforced in the engine), since it specifically optimizes unit-buying
  behavior. Cost `getSmartAutobuyerCost(tierId) = SMART_AUTOBUYER_COST_MULTIPLIER *
  getAutobuyerUnlockCost(tierId)` (`SMART_AUTOBUYER_COST_MULTIPLIER = 10` — 10 PP through 100 PP across
  the ten tiers). `state.smartAutobuyer[tierId]` is permanent across prestige (unlike `purchased`,
  which resets each run and re-triggers the one-at-a-time bootstrap each time). Independent of the tier
  tickspeed autobuyer below.
- **Active — tier tickspeed autobuyer:** `buyTierTickspeedAutobuyer(tierId)` permanently spends PP to
  make a tier's own (Money-funded) tickspeed multiplier upgrade itself automatically. **Needs no
  autobuyer-unlock prerequisite at all** — the multiplier itself is buyable by default (see "Tickspeed
  multiplier" below), so this purchase is the *only* thing about it that's PP-gated, independent of
  whether that tier's unit-buying autobuyer has ever been unlocked. Cost
  `getTierTickspeedAutobuyerCost(tierId) = TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER *
  getAutobuyerUnlockCost(tierId)` (`TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER = 2` — 2 PP through 20 PP
  across the ten tiers, used purely as a pricing benchmark, cheaper than Smart's 10x since it only
  automates one additional purchase, not the tier's whole buying cadence). `state.tierTickspeedAutobuyer[tierId]`
  is permanent across prestige. Not to be confused with the *global* Tickspeed Autobuyer below, which
  automates the Money-funded *global* tickspeed multiplier instead.
- **Active — Auto Speed Up:** `buyAutoSpeedUp(state)` permanently spends `AUTO_SPEED_UP_COST` PP (`100`
  — cheaper than `PRESTIGE_SPEED_BONUS_UNLOCK_COST`/`AUTO_PRESTIGE_COST` since Speed Up fires far more
  often, but pricier than `TICKSPEED_AUTOBUYER_COST` below, since the global tickspeed multiplier it
  automates is a much smaller, earlier-game upgrade than Speed Up) to set `autoSpeedUp = true`. Once
  bought, `tickGame` calls `speedUpGame` every tick (edge-triggered, re-validating eligibility
  internally). No-op if already bought, insufficient points, or frozen. Permanent — never reset.
- **Active — Tickspeed Autobuyer:** `buyTickspeedAutobuyer(state)` permanently spends
  `TICKSPEED_AUTOBUYER_COST` PP (`20` — the cheapest of all four global PP automation unlocks, since
  the global tickspeed multiplier it automates is a much smaller, earlier-game upgrade — unlocked as
  soon as the second tier is owned — than what any of the other three automate) to set
  `autoGlobalTickspeed = true`. Same one-time-unlock pattern as Auto Speed Up rather than Auto-Prestige's
  leveled one, since there's no cadence to speed up here either: once bought, `tickGame` calls
  `buyGlobalTickspeedMultiplier` every tick (edge-triggered, re-validating its own eligibility
  internally — a no-op unless `isGlobalTickspeedMultiplierUnlocked` and there's enough Money). This only
  automates the *clicking* — it doesn't change what currency the multiplier costs or its unlock
  prerequisite. No-op if already bought, insufficient points, or frozen. Permanent — never reset.
- **Active — Auto-Prestige:** `buyAutoPrestige(state)` activates (`null` → 1) or upgrades (N → N+1) a
  single global track. Cost doubles each level — `getAutoPrestigeCost(currentLevel) = AUTO_PRESTIGE_COST
  * AUTO_PRESTIGE_COST_MULTIPLIER^currentLevel` (`AUTO_PRESTIGE_COST = 1000`,
  `AUTO_PRESTIGE_COST_MULTIPLIER = 2`). Once active, `tickGame` accumulates a global
  `autoPrestigeAttemptBudget` every tick (frozen or not) by `getAutoPrestigeAttemptRate(level) *
  elapsedSeconds` (`getAutoPrestigeAttemptRate(level) = 1.1^(level - 1) /
  AUTO_PRESTIGE_BASE_INTERVAL_SECONDS`, `AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000` — level 1 fires
  roughly every 1000 real seconds, each level 10% sooner, compounding) — but the completed attempt
  (budget ≥ 1) only actually calls `prestigeGame` once Money has *also* reached GOOGOL
  (`isProductionFrozen`); until then it banks past 1 rather than losing the attempt. No-op if PP is
  short or already frozen. `state.autoPrestige` (the level) is permanent; `autoPrestigeAttemptBudget`
  resets to 0 on every prestige (manual or automatic), same as `autobuyerAttemptBudgets`.

The global tickspeed multiplier itself (`buyGlobalTickspeedMultiplier`, see below) is *not* one of
these PP-spent active uses, despite superficially mirroring Auto-Prestige's null/level pattern — it's
Money-funded instead, with its own unlock prerequisite (owning the second tier) unrelated to Prestige
Points at all. Only its *automation toggle*, Tickspeed Autobuyer (`buyTickspeedAutobuyer`, one of the
six bullets above), is PP-funded.

XP (`prestige.xp`) has been removed from the UI — see `docs/DESIGN_HISTORY.md`; the underlying mechanic
is untouched in `engine.js`, just not displayed.

#### Tickspeed multiplier

Not to be confused with "Tier production tickspeed" above (though the two now compose directly — see
there) — the **tickspeed multiplier** is a Money-funded, per-tier level where each level speeds up how
*often* that tier delivers a production batch by another 10%, with no effect on the size of any single
batch and no effect on autobuyer purchase-attempt frequency (see `docs/DESIGN_HISTORY.md` for why
frequency and production were decoupled, and why this factor now shrinks the delivery period instead of
scaling the delivered amount). It's tracked in its own `state.tickspeedLevels[tierId]` field (default 1,
the baseline no-bonus level, for every tier — see "Game state shape" below), buyable by default from the
moment the tier itself unlocks — no autobuyer unlock or PP prerequisite of any kind; only the
*automatic* self-upgrading of this level is PP-gated (see `tierTickspeedAutobuyer` above).

- `getTickspeedMultiplierBaseCost(tierIndex) = 10 ** (TICKSPEED_MULTIPLIER_BASE_EXPONENT - tierIndex)`
  (`TICKSPEED_MULTIPLIER_BASE_EXPONENT = 10`) — 10^10 for tier index 0, down to 10^1 for index 9.
- `getTickspeedMultiplierCost(tierId, targetLevel) = getTickspeedMultiplierBaseCost(tierIndex) **
  (targetLevel - 1)` — the resource cost, in that tier's own resource, to reach `targetLevel`: level 1
  (the free baseline) costs nothing, the first real purchase (level 1 → 2) costs exactly the tier's base
  cost itself, and each level after that multiplies by another factor of the base. Money-funded only —
  `getAutobuyerUnlockCost` (above) no longer reuses this ladder; it has its own much smaller, independent
  PP formula.
- `getTickspeedProductionMultiplier(level) = (1 + TICKSPEED_PRODUCTION_STEP) ** (level - 1)`
  (`TICKSPEED_PRODUCTION_STEP = 0.1`) — level 1 is baseline ×1; `null`/level ≤ 1 also treated as ×1. Despite
  its name, this factor is no longer multiplied directly into a production credit — see
  `getEffectiveTierTickSpeedSeconds` below, which divides it into the tier's base tickspeed instead.
- `buyTickspeedMultiplier(tierId)` spends the tier's own resource to raise `tickspeedLevels[tierId]` by
  1 — requires only that the tier itself be unlocked and `available >= cost + 1` (not just `>= cost`,
  since paying the exact cost would zero out the tier's own generator count). Called both manually and
  — for every tier whose tier tickspeed autobuyer is bought (`tierTickspeedAutobuyer[tier.id]`) —
  automatically by `tickGame`, once per tick, whenever affordable.

#### The global tickspeed multiplier

A **Money-funded** (not PP-funded) global counterpart to the per-tier tickspeed multiplier above —
instead of speeding up one tier's delivery frequency, each level speeds up *every* tier's delivery
frequency by another 1% at once (again with no effect on the size of any single delivery). A single
leveled upgrade track (not per-tier), mirroring Auto-Prestige's `null`/level pattern, and lives on the
Game view as its own `GlobalTickspeedCard` (see "MainPage reference" above) rather than on the PP
Upgrades page or any individual tier row — it has nothing to do with Prestige Points or having ever
prestiged.

- `isGlobalTickspeedMultiplierUnlocked(state) = owned[TIER_DEFINITIONS[1].id] >= 1 ||
  globalTickspeedMultiplier != null` — gates the *initial* activation on owning at least 1 of the
  second tier (so Money can't be spent on this before `tier01`'s own cost/production resource has a
  second income source backing it); once active this stays true even if `tier02`'s owned count is
  later reset to 0 by a Prestige/Speed Up — the check never revokes an already-active level.
- `getGlobalTickspeedMultiplierCost(currentLevel) = 10 ** (currentLevel + 1)` — `currentLevel` is the
  level *before* the purchase (`null`/not-yet-bought treated as 0): 10 Money to activate (level 0 → 1),
  100 Money for the next level, 1000 after that, and so on — spent from the same `Ones` balance as
  buying tiers themselves (`resources[MONEY_ID]`), with no "leave 1 behind" reserve, since Money isn't
  itself an "owned" generator count (same as `buyTier`).
- `getGlobalTickspeedProductionMultiplier(level) = (1 + GLOBAL_TICKSPEED_PRODUCTION_STEP) ** level`
  (`GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01`; `null`/never-bought treated as level 0, i.e. no bonus, ×1).
  Unlike the per-tier tickspeed multiplier — where level 1 is a bonus-free baseline granted by a
  separate PP unlock step — buying this global track directly grants its effect: level 1 (the very
  first purchase) already speeds up every tier's delivery frequency by 1% (×1.01), level 2 by another
  1% on top (×1.0201 total), always compounding multiplicatively across levels, not summed additively.
  Divided directly into `getEffectiveTierTickSpeedSeconds` for every tier alongside that tier's own
  tickspeed multiplier (see "Tier production tickspeed" above) — not multiplied into the production
  credit itself.
- `buyGlobalTickspeedMultiplier(state)` spends Money to raise the level by 1 — a no-op if
  `isProductionFrozen`, if `isGlobalTickspeedMultiplierUnlocked` is false, or if there isn't enough
  Money. `state.globalTickspeedMultiplier` (the level) **resets to `null` (not-yet-bought) on both a
  real Prestige (`prestigeGame`) and Speed Up (`speedUpGame`)** — the same run-scoped reset the
  per-tier `tickspeedLevels` gets, since both are funded from the same Money balance prestige/Speed Up
  already wipe; unlike every other automation toggle/level in this section, which both leave
  untouched; see "Speed Up" below. The `autoGlobalTickspeed` automation toggle itself still carries over
  unchanged, so a Prestige or Speed Up with Tickspeed Autobuyer already bought just starts re-buying
  the level back up from scratch once Money allows.
- Clicking is optional: once `buyTickspeedAutobuyer` is bought (PP-funded, see "Prestige Points,
  autobuyer unlock, and the tickspeed multiplier" above), `tickGame` calls
  `buyGlobalTickspeedMultiplier` automatically every tick, so the level climbs on its own whenever
  Money allows — the manual button still works identically either way, since
  `buyGlobalTickspeedMultiplier` itself doesn't know or care whether it was called by a click or by
  `tickGame`.

### Prestige and the Googol freeze

Reaching Money ≥ `GOOGOL` freezes the entire economy. `isProductionFrozen(state)` (`engine.js`) is the
single source of truth: once true, `tickGame` returns the same state unchanged *unless* Auto-Prestige is
bought, in which case it keeps accumulating `autoPrestigeAttemptBudget` and calls `prestigeGame` the
instant that budget crosses 1. Either way,
`buyTier`/`buyTickspeedMultiplier`/`buyAutobuyerUnlock`/`buySmartAutobuyer`/`buyAutoPrestige`/`buyGlobalTickspeedMultiplier` all no-op
while frozen for manual purchases; `prestigeGame` is the only action able to change state. `MainPage`
reads `isProductionFrozen` to disable every other control while frozen.

How the Prestige control is presented depends on `prestige.count` (times ever prestiged), not
`prestige.points`:

- **First time ever** (`prestige.count === 0`): a mandatory `FullScreenOverlay`
  (`role="dialog" aria-modal="true"`) replaces the entire page, explaining what Prestige does, with a
  single auto-focused Prestige button and no dismiss control.
- **From the 2nd time onward**: a `TopPrestigeBar` (`position: fixed`, with a `TopPrestigeBarSpacer`
  reserving the same height so it never overlaps the `Header` underneath) shows a compact reminder +
  Prestige button over the disabled page. The bar's `flex-wrap: wrap` lets its reminder sentence wrap
  to two lines on narrow viewports, so the spacer's height (and `StickyBalances`' stuck offset when
  scrolled, see "Balances" above) is measured live off the bar's own `offsetHeight` via a
  `ResizeObserver` (`topPrestigeBarHeight` state) rather than assumed as a fixed single-line constant —
  a hardcoded height would silently let a wrapped two-line bar overlap the content below it. Falls back
  to a single-line default (60px, i.e. the old `3.75rem` constant) in environments without
  `ResizeObserver` (e.g. jsdom in tests).

The normal bottom `PrestigeCard` (Game view) only renders when not frozen and once
`prestigeCardEverRevealed` (during the first run, gated on `purchased.tier10 >= 10`; once the player
has prestiged once, always shown when not frozen). Its Prestige button shows `✦ +{award} PP ·
{percent}%` (award = `max(1, getPrestigePointsAwarded(money))`) over a `$progress` fill, with the full
sentence in `aria-label`. Its unspent-PP/production-speed line is gated further on `!isFirstRun` (see
"Prestige info hidden until first prestige" below). Auto-Prestige's control lives on the PP Upgrades
page, gated on `allTiersFullyAutomated` — UI-only, `buyAutoPrestige`/`tickGame` don't check it. Once active, its
row shows "Lv.{level} (every ~{interval}s)", `interval = Math.round(1 / getAutoPrestigeAttemptRate(level))`.

### Speed Up

A more frequent, cheaper soft-reset than real Prestige, available well before Money reaches GOOGOL: once
the last tier (`tier10`) reaches that cycle's requirement — `getSpeedUpRequirement(speedUpCount) = 10 *
(speedUpCount + 1)` — `speedUpGame` (`engine.js`) resets resources/owned/purchased (everything a fresh
`createInitialGameState()` would have) but permanently multiplies production speed by
`SPEED_UP_MULTIPLIER_BASE` (2) raised to `state.speedUpCount`, unconditional (no PP unlock needed), read
via `getSpeedUpMultiplier`. Each activation increments `speedUpCount` by 1, so the multiplier stacks: 1x
→ 2x → 4x → 8x → …, always doubling. See `docs/DESIGN_HISTORY.md` for why this mechanic and its
escalating requirement exist (empirically-confirmed stall + cost-curve dodge otherwise).

`speedUpGame`'s reset pattern mirrors `prestigeGame`'s: an already-unlocked autobuyer stays permanently
active (its flag is untouched) and every tier's `tickspeedLevels` entry resets to the baseline 1, same
as `owned`/`purchased`. `smartAutobuyer`/`tierTickspeedAutobuyer`/`autoPrestige`/
`prestigeSpeedBonusUnlocked`/`autoSpeedUp`/`autoGlobalTickspeed` (the automation toggles) all carry over
unchanged — but **`globalTickspeedMultiplier` (the level itself) resets to `null`**, unlike every other
level/toggle in this list — same as its own behavior across a real Prestige (see "The global tickspeed
multiplier" above) — so neither a repeatedly-Speed-Up'd nor a repeatedly-Prestiged run can keep stacking
it for free. Unlike `prestigeGame`:
`prestige` (`xp`/`points`/`count`/`highestMilestone`) is passed through completely untouched (Speed Up
doesn't award/spend PP), and the gate condition is `getTierPurchasedCount(lastTier) >=
getSpeedUpRequirement(speedUpCount)`, not `Money >= GOOGOL` — also refuses while `isProductionFrozen`.
`speedUpCount` is permanent meta-progression; `prestigeGame` explicitly carries it (and `autoSpeedUp`)
through unchanged too. Can fire without a manual click once Auto Speed Up is bought.

`MainPage` surfaces this as a `SpeedUpCard` (cyan accent; Game view only), rendered after `TierList` and
before `PrestigeCard`. Gated on `speedUpEverRevealed` (see "MainPage reference" above). The button
(`SpeedUpButton`, sized to match the tier rows' own Buy/tickspeed button font size rather than the
larger default `Button` size) shows `⏩ ×{next} · {purchased}/{requirement}` — the tier's actual raw
lifetime-purchase count against `getSpeedUpRequirement(speedUpCount)`, not a percentage, so the player
sees concretely what's still needed; the on-button `$progress` fill still uses the percentage
(`speedUpProgressPercent`) for its own calculation. Enabled once the requirement is met and disabled
while frozen — no `window.confirm` guard, since this is beneficial not destructive. Once `!isFirstRun`
and `autoSpeedUp` bought, a static "⏩ Auto Speed Up active" note shows (the purchase button itself
lives on the PP Upgrades page).

### Prestige info is hidden until first prestige

Prestige Points don't exist as a concept for the player until `isFirstRun` (`prestige.count === 0`) is
false, so `MainPage` keeps every PP-related display/control out of the page during the first run:

- The top-level PP display `StatCard` and the PP Upgrades tab itself don't render until `!isFirstRun`.
- Once that page is reachable, every purchase on it shows immediately — no separate "reveal one by
  one" teaser gate. The only exceptions are real prerequisites: Auto-Prestige (1000 PP) stays behind
  `allTiersFullyAutomated` (a deliberate endgame gate, not a cost-ordering one), and per-tier
  Unlock/Smart/tier-tickspeed-autobuyer rows reveal per tier as each tier itself is reachable.
- The bottom `PrestigeCard`'s unspent-PP/production-speed line only renders once `!isFirstRun`.

The one exception is the first-ever `FullScreenOverlay` (shown the moment Money first reaches GOOGOL),
whose body text does explain what PP are — the introduction of the mechanic at exactly the moment it
becomes relevant. This is a `MainPage`-only presentation choice — `engine.js` computes/stores PP
identically regardless of `prestige.count`.

### Reset

The "↺ Reset" button (`resetGame`, wipes the save and starts a fresh game) is always rendered.
`ResetButton` (`styled(Button)`, smaller) gates the actual `resetGame()` call behind a native
`window.confirm(...)` prompt. Cancelling leaves state untouched. On acceptance, alongside `resetGame()`,
the handler resets `MainPage`'s local view-state to `'game'` and clears the
`speedUpEverRevealed`/`prestigeCardEverRevealed`/`globalTickspeedCardEverRevealed` flags (plain
component state, not part of engine state).

### Game state shape

```js
{
  resources:  { Ones: 10, tier01: 0, … },       // amount owned per resource id (keyed by costResourceId/MONEY_ID)
  owned:      { tier01: 0, tier02: 0, … },       // generator count per tier id (drives production)
  purchased:  { tier01: 0, tier02: 0, … },       // lifetime purchase count per tier id (drives cost scaling
                                                  // AND production doubling — see getPurchaseMilestoneMultiplier)
  autobuyers: { tier01: null, tier02: null, … }, // null = not yet unlocked (see buyAutobuyerUnlock, a
                                                  // permanent PP-funded purchase — there is no Money-funded
                                                  // activation path); once unlocked, a plain truthy flag —
                                                  // its value no longer means anything beyond "unlocked"
                                                  // (see tickspeedLevels below for the actual tickspeed
                                                  // level, tracked independently). An unlocked tier
                                                  // self-buys units automatically every tick; never reset
                                                  // by prestige/Speed Up
  tickspeedLevels: { tier01: 1, tier02: 1, … },  // per-tier level for that tier's own
                                                  // Money-funded tickspeed multiplier (see
                                                  // getTickspeedProductionMultiplier/buyTickspeedMultiplier
                                                  // — speeds up delivery frequency, not the amount
                                                  // delivered) — starts at 1 (baseline, no speed bonus) and
                                                  // is buyable from the moment the tier itself is unlocked,
                                                  // with no PP prerequisite and no bearing from autobuyers
                                                  // above. Resets to 1 for every tier on Prestige and Speed
                                                  // Up, same as owned/purchased
  autobuyerAttemptBudgets: { tier01: 0, tier02: 0, … }, // fractional purchase-attempt budget per tier accumulated
                                                          // each tick at a flat rate of 1 (independent of
                                                          // tickspeed level) and drained
                                                          // by 1 per successful autobuyer purchase — see tickGame
  smartAutobuyer: { tier01: false, tier02: false, … },   // permanent per-tier flag: PP spent to make this
                                                          // tier buy singly until 10 purchases then in blocks
                                                          // of 10 (see buySmartAutobuyer) — never reset by prestige
  tierTickspeedAutobuyer: { tier01: false, tier02: false, … }, // permanent per-tier flag: PP spent to make
                                                          // this tier's own tickspeed multiplier upgrade
                                                          // itself automatically (see
                                                          // buyTierTickspeedAutobuyer/tickGame) — needs no
                                                          // autobuyer-unlock prerequisite, independent of
                                                          // smartAutobuyer above; never reset by prestige
  tierProductionAccumulators: { tier01: 0, tier02: 0, … }, // fractional seconds banked per tier toward its next
                                                          // production batch, incremented every tick by
                                                          // elapsedSeconds and drained once it crosses that
                                                          // tier's getTierBaseTickSpeedSeconds — see "Tier
                                                          // production tickspeed" above. Resets to 0 on every
                                                          // prestige, same as autobuyerAttemptBudgets
  autoPrestige: null,                                    // permanent GLOBAL level (not per-tier — only one to
                                                          // buy/upgrade), null = not yet bought: how many times
                                                          // PP have been spent to make Prestige automatic and
                                                          // faster (see buyAutoPrestige/tickGame) — never reset
  globalTickspeedMultiplier: null,                       // RUN-SCOPED GLOBAL level (not per-tier — only
                                                          // one to buy/upgrade, mirroring autoPrestige
                                                          // above), null = not yet bought: how many times
                                                          // Money (not PP) has been spent on the global
                                                          // tickspeed multiplier, speeding up EVERY tier's
                                                          // delivery frequency by another 1% per level, not
                                                          // the amount delivered (see
                                                          // getGlobalTickspeedProductionMultiplier/
                                                          // buyGlobalTickspeedMultiplier) — reset to null by
                                                          // both a real Prestige and Speed Up (see
                                                          // prestigeGame/speedUpGame/"Speed Up" above), same
                                                          // as tickspeedLevels — unlike every other
                                                          // permanent automation toggle/level in this state
                                                          // shape, which both leave untouched
  autoPrestigeAttemptBudget: 0,                          // fractional Auto-Prestige attempt budget, accumulated
                                                          // every tick (frozen or not) by
                                                          // getAutoPrestigeAttemptRate(autoPrestige) once bought
                                                          // — see tickGame. Resets to 0 on every prestige, same
                                                          // as autobuyerAttemptBudgets
  prestigeSpeedBonusUnlocked: false,                     // permanent GLOBAL flag: whether the passive
                                                          // +1%-per-unspent-point production speed bonus
                                                          // (getPrestigeProductionMultiplier) is active at all —
                                                          // see buyPrestigeSpeedBonus. Never reset by prestige
  speedUpCount: 0,                                       // permanent count of Speed Up activations (see
                                                          // speedUpGame/getSpeedUpMultiplier below) — drives an
                                                          // unconditional, stacking production-speed multiplier
                                                          // (2^speedUpCount) AND how many last-tier purchases the
                                                          // next activation requires (getSpeedUpRequirement).
                                                          // Never reset by Speed Up itself or by a real Prestige
                                                          // — see "Speed Up" below
  autoSpeedUp: false,                                    // permanent GLOBAL flag: PP spent to make Speed Up
                                                          // trigger automatically every tick once eligible (see
                                                          // buyAutoSpeedUp) — never reset by Speed Up or prestige
  autoGlobalTickspeed: false,                            // permanent GLOBAL flag: PP spent to make the
                                                          // (Money-funded) global tickspeed multiplier upgrade
                                                          // itself automatically every tick once affordable (see
                                                          // buyTickspeedAutobuyer) — never reset by Speed Up or
                                                          // prestige
  prestige:   { xp: 0, points: 0, count: 0, highestMilestone: 1 }, // xp is earned via money milestones (see
                                                          // checkMilestones) but doesn't currently fund anything —
                                                          // removed from the UI, kept for a future repurposing;
                                                          // points is the spendable Prestige Point balance
                                                          // (earned via prestigeGame, spent via
                                                          // buyAutobuyerUnlock/buyPrestigeSpeedBonus, also
                                                          // drives production speed once unlocked — see
                                                          // "Prestige Points, autobuyer unlock, and the
                                                          // tickspeed multiplier");
                                                          // count is the number of times ever prestiged (renamed
                                                          // from the old `level` field), driving only the
                                                          // first-run-vs-repeat UI presentation; prestige itself
                                                          // is gated on Money ≥ GOOGOL, not xp or points
}
```

`owned[tierId]` and `resources[tierId]` for the same tier id always move together — buying a tier, producing
it via the tier above's tick, an autobuyer's automatic purchase, and spending it on that tier's own autobuyer
upgrade all update both by the same amount. They represent "how many generators you have" and "how much of
that tier's resource you can spend" respectively, which happen to be the same number by design. `purchased`
is separate: it only ever increases and is what `getTierCost` scales against; it also drives production
directly, doubling every time it crosses another block of 10 (see `getPurchaseMilestoneMultiplier`) — the
same boundary where `getTierCost`'s Fibonacci-driven multiplier steps up (see `getTierCost`),
regardless of whether those purchases were manual or automatic.

### Key engine functions (`src/game/engine.js`)

| Function | Signature | Purpose |
|----------|-----------|---------|
| `createInitialGameState` | `() → state` | Fresh state derived from `TIER_DEFINITIONS`; `resources` is pre-populated with every `costResourceId`/`producesResourceId`, not just money |
| `getTierCost` | `(tier, purchasedCount) → number` | `baseCost * 10^(getCostEpochExponent(epoch) - 1)`, epoch = `floor(purchased/10)` — flat across each block of 10 purchases; each block multiplies `baseCost` by 10 raised to (that epoch's Fibonacci number − 1): 1, 2, 3, 5, 8, … for epochs 0, 1, 2, 3, 4, … See `docs/DESIGN_HISTORY.md` for why this multiplier form was adopted over a literal `baseCost^fib`. Deep epochs still eventually overflow to `Infinity`, which is safe — an infinite cost is simply never affordable |
| `getCostEpochExponent` | `epoch → number` | The Fibonacci number driving a cost epoch's multiplier in `getTierCost`: 1, 2, 3, 5, 8, 13, … for epochs 0, 1, 2, 3, 4, 5, …; a negative epoch is clamped to 0 |
| `getTierBulkQuantity` | `(tier, purchased, requestedQuantity) → number` | Caps a bulk purchase at the current cost-block boundary, so every unit bought is the same price |
| `getTierQuantityCost` | `(tier, purchased, requestedQuantity) → number` | `getTierCost(...) * getTierBulkQuantity(...)` |
| `getTierAffordableQuantity` | `(tier, purchased, spendable, requestedQuantity) → number` | Further caps `getTierBulkQuantity` by what `spendable` can actually pay for — what `buyTierQuantity` will actually purchase |
| `getTierSpendableAmount` | `(state, tier) → number` | Balance of `tier.costResourceId` (always `Ones`) |
| `getTierPurchasedCount` | `(state, tierId) → number` | Lifetime purchases, used for cost scaling |
| `isProductionFrozen` | `state → bool` | `Money >= GOOGOL` — once true, `buyTier`/`buyTickspeedMultiplier`/`buyAutobuyerUnlock`/`buySmartAutobuyer`/`buyAutoPrestige`/`buyGlobalTickspeedMultiplier` all become no-ops (return the same state unchanged); `tickGame` either stays frozen too or calls `prestigeGame` automatically once Auto-Prestige's banked attempt budget crosses 1 (see its own row below). The UI reads this same function to disable every other control (see Architecture) |
| `tickGame` | `(elapsedSeconds, autobuyerBatchSize = 1) → state → state` | If `isProductionFrozen`: when `autoPrestige` isn't bought, short-circuits (returns the same state, unchanged); otherwise accumulates `autoPrestigeAttemptBudget` by `getAutoPrestigeAttemptRate(autoPrestige) * elapsedSeconds` and, once that crosses 1 (with `TICK_ACCUMULATION_EPSILON` tolerance), calls `prestigeGame` immediately (prestigeGame's own reset zeroes the budget back out) — otherwise returns the state with just the updated budget. Otherwise (not frozen) runs autobuyers highest-tier-first (every tier costs the same resource, Money, so autobuyers compete for one shared pool — the higher tier gets first claim on limited funds), then produces resources for every unlocked tier — but only once its `tierProductionAccumulators[tier.id]` (incremented by `elapsedSeconds` this tick) crosses that tier's own `getEffectiveTierTickSpeedSeconds(state, tier.id)` — the tier's base tickspeed shrunk by both tickspeed multipliers (with the same epsilon tolerance); when it does, delivers `floor(owned × (whole effective periods elapsed) × multiplier × speedUpMultiplier × getPurchaseMilestoneMultiplier(purchased))` in one batch — note neither tickspeed multiplier appears in this credit formula, since they already did their work by shrinking the period the "whole effective periods elapsed" count is measured against — where `multiplier` is `getPrestigeProductionMultiplier(prestige.points)` if `prestigeSpeedBonusUnlocked` is true, or a flat `1` otherwise, and `speedUpMultiplier` is `getSpeedUpMultiplier(speedUpCount)` — always ≥ 1, unconditional, no unlock needed — and the result is floored so `owned`/`resources` stay integer-valued — and banks any leftover remainder for the next tick — then checks milestones, then — for every tier whose tier tickspeed autobuyer is bought (`tierTickspeedAutobuyer[tier.id]` — no dependency on `autobuyers[tier.id]` at all) — calls `buyTickspeedMultiplier(tier.id)` once more automatically, no-op if unaffordable (edge-triggered on affordability, not scaled by `elapsedSeconds`), and — if `autoPrestige` is bought — accumulates `autoPrestigeAttemptBudget` here too, scaled by `elapsedSeconds` (the clock runs continuously regardless of frozen state, but can only ever fire from the frozen branch above). `globalTickspeedMultiplier` needs no per-tick accumulation of its own — unlike Auto-Prestige's attempt budget, it's just a permanent level read via `getGlobalTickspeedProductionMultiplier` inside `getEffectiveTierTickSpeedSeconds` each tick, changed only by the player's own `buyGlobalTickspeedMultiplier` clicks or — once `autoGlobalTickspeed` is bought (see `buyTickspeedAutobuyer`) — by `tickGame` calling `buyGlobalTickspeedMultiplier` automatically every tick right after the per-tier tickspeed self-upgrade step above, the same edge-triggered convention, re-validating its own eligibility internally each time. For each non-`null` (unlocked) autobuyer, accumulates a fractional purchase-attempt budget (`autobuyerAttemptBudgets[tier.id] + elapsedSeconds` — a flat rate, independent of tickspeed level) and fires one purchase attempt (via `buyTierQuantity`) per whole unit of budget (with the same epsilon tolerance), carrying any fractional remainder into the next tick. If a purchase can't be afforded, the loop stops *without* spending the already-accumulated attempt — it stays banked. The effective per-iteration batch size is `autobuyerBatchSize`, except for a "smart" tier (`smartAutobuyer[tier.id]`) still in its first cost block (`purchased < 10`), which uses 1 instead — above 1 (always 10 in the running app) each attempt only buys once the tier can afford the *entire* current cost block up to that size. Finally, if `autoSpeedUp` is bought, calls `speedUpGame` once more (edge-triggered, re-validates its own eligibility internally) |
| `buyTier` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`; otherwise validates unlock + affordability, deducts cost, increments `owned`/`purchased` by 1; used internally by `buyTierQuantity`, not called directly by the UI |
| `buyTierQuantity` | `(tierId, quantity) → state → state` | Buys up to `quantity` units (capped at the cost-block boundary), stopping early if a unit becomes unaffordable; used both by the manual "Buy" button (always `quantity` 10, see `useIncrementalGame`) and by `tickGame`'s autobuyer loop — the two purchase paths are identical, a tier's tickspeed multiplier level has no effect on how much a purchase costs or how many units it grants |
| `buyAutobuyerUnlock` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`, if the tier itself isn't unlocked yet (`isTierUnlocked`), if the tier's autobuyer is already unlocked, or if there aren't enough unspent Prestige Points; otherwise spends `getAutobuyerUnlockCost(tierId)` PP from `prestige.points` and permanently sets `autobuyers[tierId]` to a plain truthy flag — the *only* way to get a tier's autobuyer buying units automatically at all, for every tier including the first, with no special-casing between them; has no bearing on the tier's own tickspeed multiplier (see `tickspeedLevels`/`buyTickspeedMultiplier`), which is buyable regardless |
| `buyTickspeedMultiplier` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen` or if the tier itself isn't unlocked yet (`isTierUnlocked`) — no autobuyer-unlock prerequisite at all; otherwise upgrades `tickspeedLevels[tierId]` from N to N+1 — always by spending the tier's own resource via `getTickspeedMultiplierCost(tierId, N + 1)`. Each level speeds up that tier's own delivery frequency by another 10% (via `getTickspeedProductionMultiplier`, divided into `getEffectiveTierTickSpeedSeconds` — see "Tier production tickspeed" in CLAUDE.md), without changing the amount delivered per batch, how often the autobuyer attempts a purchase, how each individual purchase is paid for/batched, or manual Buy. Since `resources[tierId]` and `owned[tierId]` move together, a call requires `available >= cost + 1`, not just `available >= cost` — paying the exact cost would zero out the tier's own generator count (and its production), so the last unit is reserved and the call is a no-op until at least 1 would remain afterward; the MainPage tickspeed button's `disabled` state mirrors this same `+ 1` threshold. Also called automatically by `tickGame` for every tier whose tier tickspeed autobuyer is bought (`tierTickspeedAutobuyer[tier.id]`) |
| `buyPrestigeSpeedBonus` | `state → state` | Returns the same state if `isProductionFrozen`, if `prestigeSpeedBonusUnlocked` is already true, or if there aren't enough unspent Prestige Points; otherwise spends `PRESTIGE_SPEED_BONUS_UNLOCK_COST` PP and permanently sets `prestigeSpeedBonusUnlocked = true`, activating `getPrestigeProductionMultiplier`'s passive bonus in `tickGame` |
| `buySmartAutobuyer` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`, if the tier's autobuyer isn't unlocked yet (`autobuyers[tierId] == null`), if already smart, or if there aren't enough unspent Prestige Points; otherwise spends `getSmartAutobuyerCost(tierId)` PP and permanently sets `smartAutobuyer[tierId] = true` |
| `buyTierTickspeedAutobuyer` | `(tierId) → state → state` | Returns the same state if `isProductionFrozen`, if the tier itself isn't unlocked yet (`isTierUnlocked`), if already bought, or if there aren't enough unspent Prestige Points — no autobuyer-unlock prerequisite; otherwise spends `getTierTickspeedAutobuyerCost(tierId)` PP and permanently sets `tierTickspeedAutobuyer[tierId] = true` — independent of `buySmartAutobuyer` above, which does still require the autobuyer unlocked |
| `buyAutoPrestige` | `state → state` | Returns the same state if `isProductionFrozen` or if there aren't enough unspent Prestige Points for the next level; otherwise activates (`null` → 1) or upgrades (level N → N+1) via `getAutoPrestigeCost(currentLevel)` — a single global upgrade track, not per-tier |
| `isGlobalTickspeedMultiplierUnlocked` | `state → bool` | `owned[TIER_DEFINITIONS[1].id] >= 1 \|\| globalTickspeedMultiplier != null` — gates the global tickspeed multiplier's *initial* activation on owning at least 1 of the second tier; once active it stays true regardless of tier02's current owned count |
| `buyGlobalTickspeedMultiplier` | `state → state` | Returns the same state if `isProductionFrozen`, if `isGlobalTickspeedMultiplierUnlocked` is false, or if there isn't enough Money; otherwise activates (`null` → 1) or upgrades (level N → N+1) via `getGlobalTickspeedMultiplierCost(currentLevel)`, spending `resources[MONEY_ID]` directly (no PP involved) — a single global upgrade track, not per-tier, compounding every tier's production by another 1% per level |
| `buyAutoSpeedUp` | `state → state` | Returns the same state if `isProductionFrozen`, if `autoSpeedUp` is already true, or if there aren't enough unspent Prestige Points; otherwise spends `AUTO_SPEED_UP_COST` PP and permanently sets `autoSpeedUp = true`, making `tickGame` call `speedUpGame` automatically every tick |
| `buyTickspeedAutobuyer` | `state → state` | Returns the same state if `isProductionFrozen`, if `autoGlobalTickspeed` is already true, or if there aren't enough unspent Prestige Points; otherwise spends `TICKSPEED_AUTOBUYER_COST` PP and permanently sets `autoGlobalTickspeed = true`, making `tickGame` call `buyGlobalTickspeedMultiplier` automatically every tick |
| `getPurchaseMilestoneMultiplier` | `purchased → number` | `2 ** floor(purchased/10)` — doubles a tier's own passive production at every block-of-10 purchases, the same boundary where `getTierCost`'s Fibonacci-driven multiplier steps up. Applies uniformly regardless of whether those purchases were manual or via an autobuyer |
| `getSpeedUpMultiplier` | `speedUpCount → number` | `SPEED_UP_MULTIPLIER_BASE ** speedUpCount` (2^speedUpCount) — the unconditional, stacking production-speed multiplier from Speed Up activations; no unlock purchase needed, unlike `getPrestigeProductionMultiplier` |
| `getSpeedUpRequirement` | `speedUpCount → number` | `10 * (speedUpCount + 1)` — how many lifetime purchases of the last tier the *next* Speed Up needs: 10 for the first activation, 20 for the second, 30 for the third, … |
| `getTickspeedMultiplierBaseCost` | `tierIndex → number` | `10 ** (TICKSPEED_MULTIPLIER_BASE_EXPONENT - tierIndex)` — 10^10 for the first tier (index 0), decreasing by a power of ten per subsequent tier, down to 10^1 for the 10th/last tier (index 9); an out-of-range index is clamped into range rather than throwing |
| `getTickspeedMultiplierCost` | `(tierId, targetLevel) → number` | `getTickspeedMultiplierBaseCost(tierIndex) ** (targetLevel - 1)` — the resource cost, in that tier's own resource, to reach `targetLevel`: level 1 costs `base^0 = 1` (the free baseline, never actually charged), level 2 costs exactly the tier's base cost (`base^1`), level 3 costs `base^2`, and so on. Money-funded only — `getAutobuyerUnlockCost` (below) no longer reuses this ladder |
| `getAutobuyerUnlockCost` | `tierId → number` | `AUTOBUYER_UNLOCK_BASE_COST * (tierIndex + 1)` — the PP cost to permanently unlock a tier's autobuyer: 1 PP for the first tier, up through 10 PP for the 10th/last tier; an unrecognized tier id is treated as index 0 |
| `getTickspeedProductionMultiplier` | `level → number` | `1.1 ** (level - 1)` (`TICKSPEED_PRODUCTION_STEP = 0.1`; `null`/never-unlocked and level ≤ 1 all treated as the baseline ×1, no bonus); despite the name, this factor is no longer multiplied into a production credit directly — `getEffectiveTierTickSpeedSeconds` divides it into the tier's base tickspeed instead, so it speeds up delivery frequency rather than delivery size |
| `getSmartAutobuyerCost` | `tierId → number` | `SMART_AUTOBUYER_COST_MULTIPLIER * getAutobuyerUnlockCost(tierId)` — 10x that tier's own unlock cost (10 PP through 100 PP across the ten tiers) |
| `getTierTickspeedAutobuyerCost` | `tierId → number` | `TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER * getAutobuyerUnlockCost(tierId)` — 2x that tier's own unlock cost (2 PP through 20 PP across the ten tiers) |
| `getAutoPrestigeCost` | `currentLevel → number` | `AUTO_PRESTIGE_COST * AUTO_PRESTIGE_COST_MULTIPLIER^currentLevel` — 1000 PP to activate (level 0→1), doubling each level after (2000, 4000, …) |
| `getAutoPrestigeAttemptRate` | `autoPrestigeLevel → number` | `1.1 ** (level - 1) / AUTO_PRESTIGE_BASE_INTERVAL_SECONDS` (`null` treated as level 1 defensively); the per-tick Auto-Prestige attempt-budget increment; level 1 fires roughly every 1000 seconds, each level after that 10% sooner, compounding |
| `getGlobalTickspeedMultiplierCost` | `currentLevel → number` | `10 ** (currentLevel + 1)` — the Money cost to activate (level 0→1, costing 10 Money) or upgrade (level N→N+1) the global tickspeed multiplier; doubles the exponent each level (100, 1000, …) |
| `getGlobalTickspeedProductionMultiplier` | `level → number` | `1.01 ** level` (`GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01`; `null`/never-bought treated as level 0, i.e. no bonus, ×1) — unlike the per-tier tickspeed multiplier, level 1 already grants the first +1% (there's no separate unlock step to have already spent it on); compounds multiplicatively across levels, not summed additively |
| `getPrestigePointsAwarded` | `money → number` | `floor(log10(money) / log10(GOOGOL))` — the log, base GOOGOL, of the money balance; always ≥ 1 (prestiging requires the exponent ≥ 100 already); only increases once a further full 100 orders of magnitude are reached (exponent 200 → 2, 300 → 3, …) |
| `getPrestigeProductionMultiplier` | `points → number` | `1 + PRESTIGE_POINT_SPEED_BONUS * points` — a flat +1% production speed per unspent Prestige Point. A pure formula, not auto-applied — callers must check `prestigeSpeedBonusUnlocked` first; before that's bought, every caller uses a flat `1` instead. Fractional whenever `points` isn't a multiple of 100; `tickGame` floors its production credit to absorb this |
| `prestigeGame` | `state → state` | Requires Money ≥ `GOOGOL`; resets resources/owned/purchased, every tier's `tickspeedLevels` entry back to 1 (the baseline — no speed bonus), and `globalTickspeedMultiplier` back to `null` (not-yet-bought — same reset `speedUpGame` does), keeps autobuyer *unlock* flags and `smartAutobuyer`/`tierTickspeedAutobuyer`/`autoPrestige`/`speedUpCount`/`autoSpeedUp`/`autoGlobalTickspeed` unchanged (all permanent, including the Auto-Prestige *level* and accumulated Speed Up multiplier), resets `autoPrestigeAttemptBudget` to 0 (like `autobuyerAttemptBudgets`), leaves XP untouched, adds `getPrestigePointsAwarded(money)` on top of any already-unspent `prestige.points`, increments `prestige.count` by 1. Called either by the player's manual click or automatically by `tickGame` when Auto-Prestige's attempt budget fires |
| `speedUpGame` | `state → state` | Requires `getTierPurchasedCount(lastTier) >= getSpeedUpRequirement(speedUpCount)` and not `isProductionFrozen`; resets resources/owned/purchased/tierProductionAccumulators/autobuyerAttemptBudgets/autoPrestigeAttemptBudget/tickspeedLevels (every tier back to 1)/`globalTickspeedMultiplier` (back to `null`) exactly like a fresh `createInitialGameState`, keeps autobuyer *unlock* flags and `smartAutobuyer`/`tierTickspeedAutobuyer`/`autoPrestige`/`prestigeSpeedBonusUnlocked`/`autoSpeedUp`/`autoGlobalTickspeed` unchanged (mirrors `prestigeGame`'s reset pattern, including now resetting `globalTickspeedMultiplier` the same way; see "The global tickspeed multiplier" above) — leaves `prestige` (xp/points/count/highestMilestone) completely untouched — unlike `prestigeGame`, it doesn't award or spend Prestige Points — and increments `speedUpCount` by 1. Called either by the player's manual click or automatically by `tickGame` when Auto Speed Up is bought |
| `isTierUnlocked` | `state → tier → bool` | First tier always unlocked; later tiers need `owned[prevTier] >= 10` (or already unlocked, so old saves stay playable) |
| `getMoneyExponent` | `money → number` | `floor(log10(money))`, floored to 0 below 1 — money's order of magnitude, also what `checkMilestones` tracks as XP milestones |
| `getPrestigeProgressPercent` | `money → number` | `getMoneyExponent(money) / log10(GOOGOL) * 100`, rounded and clamped to `[0, 100]` — GOOGOL is exponent 100, so this reads as a whole percent equal to the money exponent itself |
| `getEffectiveTierTickSpeedSeconds` | `(state, tierId) → number` | `getTierBaseTickSpeedSeconds(tierId) / (getTickspeedProductionMultiplier(tickspeedLevels[tierId]) × getGlobalTickspeedProductionMultiplier(globalTickspeedMultiplier))` — a tier's actual production period once both tickspeed multipliers have shrunk it; always `<=` the base value, since both multipliers are always `>= 1`. Used by both `tickGame` and `getTierProductionProgressPercent` so the two never disagree about what "one period" means for a tier |
| `getTierProductionProgressPercent` | `(state, tierId, previousAccumulator?, elapsedSeconds = 1) → number` | `state.tierProductionAccumulators[tierId] / getEffectiveTierTickSpeedSeconds(state, tierId) * 100`, rounded and clamped to `[0, 100]` — how far that tier's accumulator has filled toward its next delivery. If the optional `previousAccumulator` crosses the tier's effective tickspeed once `elapsedSeconds` is added (with the same `TICK_ACCUMULATION_EPSILON` tolerance `tickGame` uses), returns 100 instead. `elapsedSeconds` defaults to `1`. Currently unused by `MainPage` |
| `formatAmount` | `value → string` | Locale-formatted integer below `EXPONENTIAL_NOTATION_THRESHOLD` (1,000,000); scientific notation at/above, exponent marker lowercased to `e` (e.g. `6.5e13` — `Intl.NumberFormat`'s scientific notation always renders an uppercase `E` with no formatting option to override it, so a shared `formatScientific` helper lowercases it after formatting) — used for non-money amounts (owned/purchased counts, and per-tier per-tick production amounts, except a tier producing Money which uses `formatCurrency` instead so the row stays consistent with every other Money display) |
| `formatCurrency` | `value → string` | Full comma-grouped `$`-prefixed string below `EXPONENTIAL_NOTATION_THRESHOLD`, floored (never rounds up); exponential notation at/above the same threshold, same lowercase-`e` exponent marker as `formatAmount` (e.g. `$6.5e13`) — used for all Money amounts, wherever they appear |
| `getOfflineEffectiveSeconds` | `elapsedRealSeconds → number` | Caps `elapsedRealSeconds` at `MAX_OFFLINE_SECONDS`, scales by `OFFLINE_PROGRESS_SPEED_MULTIPLIER` (10%), floors — the number of simulated 1-second ticks `applyOfflineProgress` will replay |
| `applyOfflineProgress` | `(elapsedRealSeconds, autobuyerBatchSize = 1) → state → state` | Replays `tickGame(1, autobuyerBatchSize)` once per simulated second from `getOfflineEffectiveSeconds` |
| `formatOfflineDuration` | `totalSeconds → string` | `"1h 2m"` / `"1m 30s"` / `"45s"` (hours+minutes only above an hour, minutes+seconds only above a minute) — used to summarize the offline-progress notice's elapsed/simulated durations |
| `RESOURCE_SYMBOL` (`layers.js`) | `resourceId → string` | Returns the matching tier's `symbol`, `'$'` fallback for `MONEY_ID`/unknown ids |
| `getTierBaseTickSpeedSeconds` (`layers.js`) | `tierId → number` | Reads that tier's own independent `baseTickSpeedSeconds` field (1s for tier01, increasing by 1s per tier up to 10s for tier10) — how often (in seconds) `tickGame` batches that tier's production instead of delivering it continuously every tick. An unrecognized tier id falls back to 1s |

### Constants (`src/game/layers.js`)

- `MONEY_ID = 'Ones'` — id of the base/root resource
- `MONEY_STARTING_AMOUNT = 10`
- `GOOGOL = 1e100` — money balance required to prestige
- `TICK_RATE_MS = 100` — the global tick fires every 100ms (10Hz); `elapsedSeconds` per live tick is
  `TICK_RATE_MS / 1000 = 0.1`. Every real-world-time-based rate (autobuyer/Auto-Prestige attempt budgets)
  is explicitly scaled by `elapsedSeconds` in `tickGame` so real-world cadence is unaffected by this
  value — changing it only changes update granularity/animation smoothness, not game speed.
  `TICK_ACCUMULATION_EPSILON = 1e-9` (module-scoped in `engine.js`, not exported) is a related tolerance
  constant absorbing floating-point drift from repeatedly summing a fractional `elapsedSeconds`
- `OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1` — offline progress runs at 10% of normal speed
- `MAX_OFFLINE_SECONDS = 86400` (24 hours) — cap on real elapsed time counted toward offline progress
- `PRESTIGE_POINT_SPEED_BONUS = 0.01` — +1% production speed per unspent Prestige Point, once unlocked (see next)
- `PRESTIGE_SPEED_BONUS_UNLOCK_COST = 10000` — one-time PP cost to unlock the passive production speed bonus above (see `buyPrestigeSpeedBonus`) — inert until bought, regardless of PP balance. The priciest of the four global PP automation unlocks (see `AUTO_SPEED_UP_COST`/`TICKSPEED_AUTOBUYER_COST`/`AUTO_PRESTIGE_COST` below), since it's passive and always-on rather than a one-shot action
- `TICKSPEED_MULTIPLIER_BASE_EXPONENT = 10` — exponent driving the (Money-funded) tickspeed multiplier's per-tier base cost (see `getTickspeedMultiplierBaseCost`): 10^10 for the first tier, down to 10^1 for the 10th/last tier
- `TICKSPEED_PRODUCTION_STEP = 0.1` — each tickspeed multiplier level speeds up a tier's delivery frequency by another 10%, not the amount delivered (see `getTickspeedProductionMultiplier`/`getEffectiveTierTickSpeedSeconds`)
- `AUTOBUYER_UNLOCK_BASE_COST = 1` — PP cost per tier index for unlocking a tier's autobuyer (see `getAutobuyerUnlockCost`) — a flat, small per-tier increment: 1 PP for the first tier, up through 10 PP for the 10th/last tier, deliberately independent of the much steeper `TICKSPEED_MULTIPLIER_BASE_EXPONENT` ladder above
- `SMART_AUTOBUYER_COST_MULTIPLIER = 10` — the "smart" autobuyer costs this many times more PP than unlocking that same tier's autobuyer (10 PP through 100 PP across the ten tiers)
- `TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER = 2` — the per-tier tickspeed autobuyer (see `getTierTickspeedAutobuyerCost`/`buyTierTickspeedAutobuyer`) costs this many times more PP than unlocking that same tier's autobuyer (2 PP through 20 PP across the ten tiers) — cheaper than Smart's 10x since it only automates one additional purchase, not the tier's whole buying cadence
- `GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01` — each global tickspeed multiplier level speeds up *every* tier's delivery frequency by another 1% at once, not the amount delivered (see `getGlobalTickspeedProductionMultiplier`) — a separate constant from `TICKSPEED_PRODUCTION_STEP` above (which stays 10% for the per-tier multiplier), since the two upgrades are independent and can be tuned separately. The global tickspeed multiplier's *cost* (`getGlobalTickspeedMultiplierCost`, see the engine functions table above) is Money-funded, not PP-funded — it has no dedicated cost constant here, using an inline `10 ** (level + 1)` formula against `resources[MONEY_ID]` instead
- `AUTO_PRESTIGE_COST = 1000` — PP cost to activate Auto-Prestige (level 1); a single global upgrade track, not per-tier. Priced above `AUTO_SPEED_UP_COST` since Auto-Prestige only ever fires once per run at most, versus Speed Up's much higher activation frequency
- `AUTO_PRESTIGE_COST_MULTIPLIER = 2` — Auto-Prestige's cost doubles with each level purchased
- `AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000` — Auto-Prestige's base check cadence at level 1, in real seconds (independent of `TICK_RATE_MS`); each level speeds this up 10%
- `SPEED_UP_MULTIPLIER_BASE = 2` — per-activation production-speed multiplier base for Speed Up (see `getSpeedUpMultiplier`/`speedUpGame`, "Speed Up" above) — unconditional, no PP unlock needed, unlike `PRESTIGE_POINT_SPEED_BONUS`
- `AUTO_SPEED_UP_COST = 100` — one-time PP cost to permanently automate Speed Up (see `buyAutoSpeedUp`) — cheaper than `PRESTIGE_SPEED_BONUS_UNLOCK_COST`/`AUTO_PRESTIGE_COST` since Speed Up fires far more often, but pricier than `TICKSPEED_AUTOBUYER_COST` below, since the global tickspeed multiplier it automates is a much smaller, earlier-game upgrade than Speed Up
- `TICKSPEED_AUTOBUYER_COST = 20` — one-time PP cost to permanently automate the (Money-funded) global tickspeed multiplier (see `buyTickspeedAutobuyer`) — the cheapest of all four global PP automation unlocks, since the global tickspeed multiplier it automates is a much smaller, earlier-game upgrade (unlocked as soon as the second tier is owned) than what any of the other three automate

### Path aliases (`vite.config.js`)

`components/X` → `src/components/X`, `game/X` → `src/game/X`, `pages/X` → `src/pages/X`, `theme/X` →
`src/theme/X`. Use these bare aliases in imports (as the existing code does), not relative paths like
`../../game/engine`. Directory imports resolve to that directory's `index.jsx`/`index.js` (e.g.
`import { ThemeProvider } from 'theme'` → `src/theme/index.jsx`, same as `pages/MainPage` → its `index.jsx`).

## Theming

All component styling resolves to **semantic design tokens** defined once in `src/theme/tokens.js`, so
the app's two themes — an evolved **dark** (default) and a **light** theme — fall out of swapping palette
values rather than forking any component on mode. This is the foundation for the UI-revamp epic (#132);
components migrate onto these tokens one at a time in later sub-issues.

- **`tokens.js`** exports `buildTheme(mode)` (flattens the right palette for styled-components'
  `ThemeProvider`) and the two pre-built `themes.dark` / `themes.light`. A theme object exposes:
  `color` (per-mode: `page`, `surface`, `surfaceRaised`, `surfaceSunken`, `border`, `borderStrong`,
  `text`, `textMuted`, `textFaint`, `accent` (indigo brand), `good`/`warn`/`info`/`violet`/`danger`
  semantics kept distinct from the accent, `disabled`), `shadow` (`sm`/`md`, per-mode), `tierAccents`
  (per-mode 8-hue cycle for the tier left-edge stripe), plus mode-independent `space`, `radius`,
  `motion` (`duration`/`easing`), `font` (`display`/`body`/`mono`), and `type` (`scale` + `numeric`).
  Font families are system stacks for now — a deliberate seam the typography sub-issue (#136) swaps for
  locally-bundled faces.
- **`GlobalStyle.js`** (`createGlobalStyle`) replaces the removed `src/index.css` + `src/App.css`: the
  `box-sizing` reset, base font/smoothing, the form-control `font: inherit` rule, and the token-driven
  page background + text color (so the whole page repaints on a mode change).
- **`theme/index.jsx`** exports `<ThemeProvider mode>` (wrapping styled-components' `ThemeProvider`) and
  re-exports `GlobalStyle`/`themes`/`buildTheme`/`MODES`/`DEFAULT_MODE`. `App.jsx` renders
  `<ThemeProvider><GlobalStyle/><MainPage/></ThemeProvider>`. **`mode` is a plain prop defaulting to
  `dark`** — the system-preference detection + persisted user toggle that drives it is deferred to the
  light-mode activation sub-issue (#140); until then the app stays dark, now token-driven.

## Funding

`.github/FUNDING.yml` declares GitHub Sponsors for `mohanpednekar`, so the repo shows a native
"Sponsor" button. The file alone doesn't enroll the account — Sponsors enrollment
(`github.com/sponsors`) is a separate, maintainer-only step tracked in issue #62's checklist; until
that's done the Sponsor button simply won't display/function.

## Testing

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`, `App.test.jsx`.
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
  Reset button's `window.confirm` guard mock it via `vi.spyOn(window, 'confirm')` and restore it in
  `afterEach` (see `App.test.jsx`). If a test ever needs to observe behavior across real tick boundaries
  again (none currently does), use `vi.useFakeTimers()` + `act(() => vi.advanceTimersByTime(TICK_RATE_MS))`
  **once per tick** (not one large jump per assertion — jumping by more than one tick fires the live
  `setInterval` several times synchronously within the same call stack, which React 18 batches into a
  single render), and **unmount the rendered component before calling `vi.useRealTimers()`**, not after —
  see `docs/DESIGN_HISTORY.md` for the real regression this ordering avoids.
- `yarn test` is green (435 tests). All four test files assert against the current tier/resource id scheme
  (`MONEY_ID = 'Ones'`, tier ids `tier01`/`tier02`/… with display names `Bytes`/`Kilobytes`/…) — don't
  reintroduce the older lowercase scheme (`'money'`, `'ones'`, `'hundreds'`) left behind by an unfinished
  earlier rename (see `docs/DESIGN_HISTORY.md`).

## Security notes

- Dev and test-watch servers bind to `127.0.0.1` explicitly (`--host 127.0.0.1`) — do not change to `0.0.0.0`.
- All purchases, autobuyer upgrades, and prestige are validated inside `engine.js`, not just via disabled UI
  buttons — the engine re-checks affordability/unlock state on every call.
- `saveGameState`/`loadGameState`/`clearGameState`/`loadLastSaveTimestamp` wrap `localStorage` access in
  try/catch and fail silently (quota errors, private-browsing restrictions).
- Timer effects (`useIncrementalGame`'s `setInterval`) are cleaned up on unmount.
