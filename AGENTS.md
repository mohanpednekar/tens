# AGENTS.md

Context for AI agents working on this repository. Read this file first to avoid
redundant exploration.

## Project

**Tens** — a React incremental game. Every mechanic uses powers of ten. Single
page; no routing.

## Tech stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 19 | JSX transform enabled |
| Vite | 8 | OXC-based; JSX files **must** use `.jsx` extension |
| Vitest | 4 | Runs via `yarn test` |
| styled-components | 6 | All component styling |
| Yarn | 1 (Classic) | Uses `yarn@1.22.22`; lockfile is v1 format; no `.yarnrc.yml` |

## Commands

```sh
yarn dev          # dev server → http://127.0.0.1:<port>/tens/
yarn build        # production build
yarn test         # run all tests once (Vitest)
yarn test:watch   # watch mode
yarn audit        # dependency audit
```

> **Critical:** Vite 8 uses OXC which infers JSX from extension. Any file
> containing JSX **must** be `.jsx`, not `.js`, or the build/tests will fail.

## Repo layout

```
src/
  game/
    layers.js           ← TIER_DEFINITIONS array + all constants (single source of truth)
    engine.js           ← pure state functions (no React, no side-effects)
    useIncrementalGame.js ← React hook; wires engine to useState + localStorage
    storage.js          ← localStorage save/load/clear + migration logic
  components/
    Button/             ← styled button; accepts color prop
    Money/              ← styled money display
    StatCard/           ← styled card container
  pages/
    MainPage/index.jsx  ← single page; renders all tiers data-driven from TIER_DEFINITIONS
  theme/                ← design tokens (dark+light) + ThemeProvider + GlobalStyle (see below)
  App.jsx               ← root component; wraps <ThemeProvider><GlobalStyle/><MainPage/>
  index.jsx             ← ReactDOM.createRoot entry
vite.config.js          ← aliases: components/, game/, pages/, theme/ → src/* equivalents
```

**Theming:** all styling resolves to semantic tokens in `src/theme/tokens.js`, exposing two themes
(dark default + light) via `themes.{dark,light}` / `buildTheme(mode)`. `theme/index.jsx` provides
`<ThemeProvider mode>` (mode defaults to dark; system-pref + persisted toggle deferred to a later
sub-issue) and `GlobalStyle` (replaces the removed `index.css`/`App.css`). Components migrate onto
these tokens incrementally (UI-revamp epic #132).

## Architecture

**All game logic is pure** (`engine.js`). The hook (`useIncrementalGame.js`)
owns all React state and side-effects (timer, localStorage). The page
(`MainPage/index.jsx`) is a pure renderer.

There are 10 tiers, ids `tier01` → `tier10` (display names `Tens` →
`Octillions`) — `id` is a naming-agnostic key decoupled from `name`/`symbol`.
**Every tier is bought directly with Ones (money)** — `costResourceId` is
`'Ones'` for all of them. Once owned, a tier produces the tier immediately
below it (`producesResourceId`), which cascades production down to Ones.
`tier01` (`Tens`) is the special case: `costResourceId === producesResourceId
=== 'Ones'`, since it's the entry-level generator bought with money to
produce more money.

A tier unlocks once you own **≥ 10** of the tier below it (already-owned
tiers stay unlocked even if the rule changes, so old saves stay playable).

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js` (needs a
naming-agnostic `id` next in the `tier0N`/`tierNN` sequence, `name`, `symbol`,
`baseCost`, `costResourceId: MONEY_ID`, and `producesResourceId` set to the
previous tier's `id`). No other file needs changing — the page and engine are
fully data-driven from that array.

### Game state shape

```js
{
  resources: { Ones: 10, tier01: 0, tier02: 0, … },   // spendable balance per resource id
  owned:     { tier01: 0, tier02: 0, … },              // generator count per tier id
  purchased: { tier01: 0, tier02: 0, … },              // lifetime purchase count per tier id (drives cost scaling)
  autobuyers:{ tier01: null, tier02: null, … },        // null = locked; number = active level, survives prestige unlock
  prestige: { pp: 0, level: 0, highestMilestone: 1 }
}
```

`owned[tierId]` and `resources[tierId]` for the same tier id always move
together (buying, producing, and autobuyer-upgrading a tier update both by
the same amount) — they represent "how many generators you have" and "how
much of that tier's resource you can spend" respectively, which happen to be
the same number by design.

### Key engine functions

| Function | Signature | Purpose |
|----------|-----------|---------|
| `getTierCost` | `(tier, purchasedCount) → number` | Scaled cost: `baseCost * 10^epoch * (1 + 0.1*within)`, epoch = `floor(purchased/10)` |
| `getTierSpendableAmount` | `(state, tier) → number` | Balance of `tier.costResourceId` |
| `getTierPurchasedCount` | `(state, tierId) → number` | Lifetime purchases, used for cost scaling |
| `tickGame` | `(elapsedSecs) → state → state` | Runs autobuyers, then produces resources for unlocked tiers, then checks milestones |
| `buyTier` | `(tierId) → state → state` | Validates unlock + affordability, deducts cost, increments `owned`/`purchased` |
| `buyAutobuyer` | `(tierId) → state → state` | First call unlocks (spends PP); later calls upgrade the level (spends the tier's own resource) |
| `getAutobuyerUnlockPPCost` | `(tierIndex) → number` | `AUTOBUYER_PP_COST_BASE * 2^tierIndex` |
| `getAutobuyerCost` | `(currentLevel) → number` | `10^(currentLevel+1)` |
| `prestigeGame` | `state → state` | Resets progress, keeps autobuyer *unlock* status (levels reset to 0), increments level |
| `isTierUnlocked` | `(state) → tier → bool` | Tier 0 always unlocked; others need ≥10 owned of the tier below (or already owned) |
| `productionMultiplier` | `(level) → number` | `2^level` |
| `formatAmount` | `(value) → string` | Locale integer below 1,000,000; scientific notation at/above |

### Constants (all in `src/game/layers.js`)

- `MONEY_ID = 'Ones'`
- `PRESTIGE_PP_COST = 10`
- `TICK_RATE_MS = 1000`
- `MONEY_STARTING_AMOUNT = 10`
- `AUTOBUYER_PP_COST_BASE = 1` (doubles per layer index: layer 0 → 1 PP, layer 1 → 2 PP …)

### Path aliases (vite.config.js)

`components/X` → `src/components/X`, `game/X` → `src/game/X`,
`pages/X` → `src/pages/X`, `theme/X` → `src/theme/X`. Use these aliases in imports, not relative paths.
Directory imports resolve to that dir's `index.jsx`/`index.js` (e.g. `from 'theme'` → `src/theme/index.jsx`).

## Testing

- Test files live next to source files: `engine.test.js`, `layers.test.js`,
  `storage.test.js`, `App.test.jsx`.
- Test environment: jsdom (configured in `vite.config.js`).
- Setup file: `src/setupTests.js` (imports `@testing-library/jest-dom`).
- Globals are enabled (`describe`, `it`, `expect`, etc. without imports).

## Issue tracking conventions

- `claude-task`-labeled issues are the work backlog for the scheduled automation (see `CLAUDE.md`'s
  Orchestration model). Milestones and the Project's `Track` field are complementary: a Milestone
  targets one planned release (native GitHub due-date + closed/open progress tracking); `Track`
  groups issues by theme/dependency chain and can span multiple releases. Assign a milestone to
  player-facing feature/economy issues when a next release is planned; process/infrastructure issues
  typically don't need one.
- Whoever files a `claude-task` issue should also apply a `size:S`/`size:M`/`size:L` label (S = a
  single small focused change; M = a normal run-sized task; L = large, likely needs a partial
  `Part of #N` slice) — a prior signal Phase A weighs against its own remaining budget when picking
  a task. See `CLAUDE.md`'s Orchestration model / Budget discipline sections for the full picking
  logic.

## Reliability: cron dormancy

GitHub Actions disables a workflow's `schedule` (cron) trigger after 60 days with no repository
activity. `autonomous-maintenance.yml`'s primary mitigation is its own regular activity (merged PRs
reset the dormancy clock) plus Phase B gap analysis keeping the backlog non-empty; the actual backstop
is an external, out-of-band periodic check (outside this repo/issue system) that notices prolonged
silence and re-triggers the workflow via `workflow_dispatch`, which works regardless of whether the
`schedule` trigger is currently disabled. See `CLAUDE.md`'s Scheduled maintenance section for the full
writeup.

## Code review tooling

- `.claude/agents/code-reviewer.md` — a comprehensive, adversarial reviewer subagent for any PR or
  working diff: verified `file:line`-cited findings with confidence labels, a merge verdict, and an
  explicit coverage report. Read-only (never edits code). Use before merging any non-trivial change.
- `.claude/skills/economy-change-review/SKILL.md` — a narrow, mechanical spec-vs-implementation
  cross-check for diffs touching `TIER_DEFINITIONS`/economy constants in `src/game/layers.js`; the
  code-reviewer agent invokes its checklist as a required step on economy-touching diffs.

## Automation design principles

Three conventions guide this repo's automation design (see `CLAUDE.md`'s Orchestration model for the
full rationale and examples):

1. **Determinism-first** — prefer a plain deterministic script over a Claude invocation whenever no
   genuine judgment is needed (e.g. `pr-auto-merge.yml`'s auto-merge path is a plain script).
2. **Judgment-call transparency** — when a genuine judgment call is made on something the spec didn't
   pin down, state the reasoning explicitly (e.g. in a PR description or issue comment) rather than
   deciding silently.
3. **Conflict-avoidance sequencing** — when splitting large work into a sequence of issues, chain them
   with `Blocked by #N` whenever two issues would edit the same lines/files, even without a strict
   functional dependency, purely to avoid concurrent-edit conflicts.

## Security notes

- Dev and test servers bind to `127.0.0.1` — do not change to `0.0.0.0`.
- All purchases and prestige are validated in the engine, not just via disabled
  UI buttons.
- Timer effects are cleaned up on unmount.
- Save/load wraps localStorage in try/catch to handle quota errors silently.
- `.github/workflows/**` changes require the repo owner's review, enforced two ways:
  `pr-auto-merge.yml`'s script-level exclusion, and (once branch protection enables
  "Require review from Code Owners") `.github/CODEOWNERS`.
