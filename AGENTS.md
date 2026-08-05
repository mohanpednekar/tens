# AGENTS.md

Context for AI agents working on this repository. This is a condensed pointer, not a second source
of truth — `CLAUDE.md` (plus its `docs/*.md` references) is authoritative for current behavior. If
anything below ever conflicts with `CLAUDE.md`, `CLAUDE.md` wins; fix this file to match in the same
change rather than letting the two drift (a stale mirror here is worse than no mirror at all).

## Project

**Tens** — a React incremental game. Every mechanic uses powers of ten. Single page; no routing; no
backend — state lives in React and persists to `localStorage`.

## Tech stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 19 | JSX transform enabled |
| Vite | 8 | OXC-based; JSX files **must** use the `.jsx` extension |
| Vitest | 4 | Runs via `yarn test` |
| Playwright | 1 | Real-browser e2e suite, `yarn test:e2e`, chromium only |
| styled-components | 6 | All component styling |
| Yarn | 1 (Classic) | `yarn@1.22.22` via Corepack; lockfile is v1 format |

## Commands

```sh
yarn install --frozen-lockfile   # CI does this; use plain `yarn install` locally after lockfile changes
yarn dev          # dev server → http://127.0.0.1:<port>/tens/
yarn build        # production build
yarn test         # run all tests once (Vitest)
yarn test:watch   # watch mode
yarn test:e2e     # Playwright end-to-end suite (real chromium, against yarn dev)
yarn audit        # dependency audit
yarn gen-pwa-icons # regenerate public/pwa-*.png + apple-touch-icon.png
```

> **Critical:** Vite 8 uses OXC, which infers JSX from the file extension. Any file containing JSX
> **must** be `.jsx`, not `.js`, or the build/tests will fail.

## Repo layout

```
CLAUDE.md                ← authoritative current-behavior reference (start here)
docs/
  DESIGN_HISTORY.md       ← the "why": superseded formulas, incident write-ups, rejected alternatives —
                            check before changing a formula/workflow a past iteration may have tried
  AUTOMATION.md           ← full autonomous-workflow phase-by-phase reference
  ECONOMY_REFERENCE.md    ← full economy/prestige/tickspeed mechanic + engine function/constants reference
  MAINPAGE_REFERENCE.md   ← full MainPage UI field-by-field reference
  COMPONENTS_REFERENCE.md ← full Button/Money/StatCard prop/styling reference
  THEMING_REFERENCE.md    ← full design-token/font/ThemeProvider reference
  PWA_REFERENCE.md        ← full installable-PWA (manifest/icons/service-worker) reference
src/
  game/
    layers.js             ← TIER_DEFINITIONS array + all constants (single source of truth)
    engine.js              ← pure state functions (no React, no side effects)
    useIncrementalGame.js  ← React hook; wires the engine to useState + localStorage
    storage.js             ← localStorage save/load/clear + migration logic
  components/
    Button/, Money/, StatCard/  ← shared styled components; see docs/COMPONENTS_REFERENCE.md
  pages/
    MainPage/index.jsx     ← single page; renders all tiers data-driven from TIER_DEFINITIONS
  theme/                   ← design tokens (dark+light) + ThemeProvider + GlobalStyle
  App.jsx                  ← root component
  index.jsx                ← ReactDOM.createRoot entry
vite.config.js             ← path aliases (below) + dev/test server config + VitePWA plugin
```

## Architecture

**All game logic is pure** (`src/game/engine.js`) — functions of `(args) => state => newState`, no
React, no side effects. `useIncrementalGame.js` is the only place holding React state (tick timer,
localStorage persistence). `MainPage/index.jsx` is a pure renderer driven entirely by
`TIER_DEFINITIONS` and hook state.

There are 10 tiers, ids `tier01`–`tier10` (display names `Bytes`–`Ronnabytes`, a byte-scale theme).
Every tier is bought with the base currency (`MONEY_ID = 'base'`, display "Bits") and produces the
tier below it; `tier01` is the special case where cost and production resource are both the base
currency. **Do not guess at cost/production formulas, the purchase-level system, prestige, or
tickspeed mechanics here** — they're intricate and have changed shape multiple times (see
`docs/DESIGN_HISTORY.md`). Read `docs/ECONOMY_REFERENCE.md` (or the matching section of `CLAUDE.md`)
before touching `src/game/engine.js`, `src/game/layers.js`, or any economy constant.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js` (naming-agnostic `id` next in the
`tier0N`/`tierNN` sequence, `name`, `symbol`, `baseCost`, `costResourceId: MONEY_ID`,
`producesResourceId` set to the previous tier's `id`, `baseTickSpeedSeconds` set to the next integer
in the sequence). No other file needs changing.

### Path aliases (`vite.config.js`)

`components/X` → `src/components/X`, `game/X` → `src/game/X`, `pages/X` → `src/pages/X`,
`theme/X` → `src/theme/X`. Use these aliases in imports, not relative paths. Directory imports
resolve to that dir's `index.jsx`/`index.js`.

## Testing

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`,
  `App.test.jsx`. Environment: jsdom, globals enabled. Setup file: `src/setupTests.js`.
- `yarn test` is green — see `CLAUDE.md`'s Testing section for the current test count (the
  authoritative number; don't restate it here, to avoid the two drifting apart).

## Changelog convention

`CHANGELOG.md` (repo root, Keep a Changelog format) tracks user-facing/behaviorally-relevant changes
from `v0.5.0` onward — add an entry under `## [Unreleased]`'s matching subheading for any such PR;
skip it for docs-only/internal CI changes. `package.json`'s `"version"` mirrors this file's released
sections.

## Issue tracking conventions

- `claude-task`-labeled issues are the work backlog for the scheduled automation (see `CLAUDE.md`'s
  Orchestration model / `docs/AUTOMATION.md`). Order: `priority:high` first, then normal (unlabeled)
  issues by lowest issue number, then `priority:low` last (only picked once nothing higher-tier is
  eligible — not an absolute ban, a maintainer/interactive session can still ask for one directly).
- Whoever files a `claude-task` issue should also apply a `size:S`/`size:M`/`size:L` label (S = a
  single small focused change; M = a normal run-sized task; L = large, likely needs a partial
  `Part of #N` slice) — Phase A weighs this against its own remaining budget when picking a task.
- Milestones and the Project's `Track` field are complementary: a Milestone targets one planned
  release; `Track` groups issues by theme/dependency chain and can span multiple releases.

## Budget discipline

Applies to every session, not just automation — self-estimate remaining 5-hour Claude usage window
and target roughly half of it per session. See `CLAUDE.md`'s "Budget discipline" paragraph (under
Automation workflows) for the full soft-target/overshoot/partial-slice policy — not restated here to
avoid drift between the two copies.

## Reliability: cron dormancy

GitHub Actions disables a workflow's `schedule` (cron) trigger after 60 days with no repository
activity. `autonomous-maintenance.yml`'s primary mitigation is its own regular activity (merged PRs
reset the dormancy clock) plus Phase B gap analysis keeping the backlog non-empty; the actual backstop
is an external, out-of-band periodic check that re-triggers the workflow via `workflow_dispatch` if
it's gone quiet longer than expected.

## Reliability: concurrent runs

`autonomous-maintenance.yml` carries a top-level `concurrency: { group: autonomous-maintenance,
cancel-in-progress: false }` block so a manual `workflow_dispatch` can never race an in-progress
scheduled run — it queues instead, since cancelling mid-task would orphan a `claude/auto-task-*`
branch.

## Code review tooling

- `.claude/agents/code-reviewer.md` — a comprehensive, adversarial reviewer subagent for any PR or
  working diff: verified `file:line`-cited findings with confidence labels, a merge verdict, and an
  explicit coverage report. Read-only. Use before merging any non-trivial change.
- `.claude/skills/economy-change-review/SKILL.md` — a narrow, mechanical spec-vs-implementation
  cross-check for diffs touching `TIER_DEFINITIONS`/economy constants in `src/game/layers.js`; the
  code-reviewer agent invokes its checklist as a required step on economy-touching diffs.

## Issue-authoring tooling

- `.claude/skills/file-task-issue/SKILL.md` — full `claude-task` issue-template guidance,
  size/priority labeling, conflict-avoidance `Blocked by #N` sequencing, the `blocked` label's two
  meanings, epic/sub-issue grouping, and when an issue needs no PR. Use when filing a new backlog
  issue, splitting a feature into a sequence, or tightening an existing issue's spec.

## Automation design principles

Three conventions guide this repo's automation design (see `CLAUDE.md` / `docs/AUTOMATION.md` for the
full rationale and examples):

1. **Determinism-first** — prefer a plain deterministic script over a Claude invocation whenever no
   genuine judgment is needed (e.g. `pr-auto-merge.yml`'s auto-merge path is a plain script).
2. **Judgment-call transparency** — when a genuine judgment call is made on something the spec didn't
   pin down, state the reasoning explicitly (e.g. in a PR description or issue comment) rather than
   deciding silently.
3. **Conflict-avoidance sequencing** — when splitting large work into a sequence of issues, chain them
   with `Blocked by #N` whenever two issues would edit the same lines/files, even without a strict
   functional dependency, purely to avoid concurrent-edit conflicts.

## Funding

`.github/FUNDING.yml` declares GitHub Sponsors for `mohanpednekar` (native repo "Sponsor" button).
Enrollment on `github.com/sponsors` is a separate maintainer-only step tracked in issue #62.

## License

`LICENSE` (repo root) is an explicit all-rights-reserved notice, not an OSS license — code stays
publicly visible but isn't legally reusable without written permission. No `CODE_OF_CONDUCT`/
`CONTRIBUTING` — deliberately omitted for this solo, AI-driven hobby project.

## Security notes

- Dev and test servers bind to `127.0.0.1` — do not change to `0.0.0.0`.
- All purchases, autobuyer upgrades, and prestige are validated in `engine.js`, not just via disabled
  UI buttons — every action is re-checked server-side-equivalent (there is no server, but the engine
  is the single point of truth regardless of which UI control triggered it).
- Timer effects are cleaned up on unmount.
- Save/load wraps `localStorage` access in try/catch and fails silently on quota/private-browsing
  errors.
- `.github/workflows/**` changes require the repo owner's review, enforced two ways:
  `pr-auto-merge.yml`'s script-level exclusion, and (once branch protection enables "Require review
  from Code Owners") `.github/CODEOWNERS`.
