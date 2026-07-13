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
together to open, fix up, and merge PRs with no human in the loop until an approval is needed. All
three authenticate git/GitHub operations with a `GH_AUTOMATION_PAT` repo secret (a personal access
token) instead of the default `GITHUB_TOKEN`. This isn't optional: GitHub does not let commits, pushes,
or merges authored by the default `GITHUB_TOKEN` trigger other workflows (an anti-recursion
safeguard) — with the default token, `ci.yml` would silently stop re-running on the bot's own pushed
fixes, and `deploy.yml` would silently stop firing when the bot's PRs get merged to `main`. Using a PAT
for these specific operations avoids that gap without any workaround.

### Scheduled maintenance (`autonomous-maintenance.yml`)

Runs every 5 hours (cron `0 */5 * * *`, plus manual `workflow_dispatch`) via
`anthropics/claude-code-action@v1`. Each run picks the single most valuable applicable task from:

1. Test coverage gaps
2. Dependency & security maintenance (`yarn audit` + safe patch/minor bumps)
3. Code quality / simplification
4. CLAUDE.md documentation sync
5. Workflow self-improvement — refine this task menu or the workflow file itself; scoped to editing
   `autonomous-maintenance.yml` only, and may not weaken the duplicate-PR guard, the turn/budget cap,
   the never-self-merge rule, or the requirement to always open a PR

Adding new tiers to `TIER_DEFINITIONS` stays excluded from the menu — a human decision. `--max-turns`
is capped (currently 25) as a best-effort approximation of "no more than roughly 5% of weekly Claude
usage quota per run" — Claude Code has no hard programmatic budget cutoff, so this is a turn-count
proxy, not a guarantee; watch actual usage against your plan's weekly quota and tighten the cap
further if a run is consistently using too much. If no task applies, or a PR from a previous
autonomous run (branch prefix `claude/auto-`) is still open, the run makes no changes and opens no
PR. `ci.yml`, `deploy.yml`, `dependabot-lockfile.yml`, `autonomous-pr-followup.yml`, and
`pr-auto-merge.yml` are all explicitly denied to Claude's Edit/Write tools, even during the
self-improvement task — only `autonomous-maintenance.yml` may edit itself.

### PR follow-up (`autonomous-pr-followup.yml`)

Since no human (or live Claude Code session) is watching between scheduled runs, this workflow closes
the loop on PRs the maintenance workflow opens. It fires on new PR reviews, new PR comments, and
failing check suites, filters to PRs on `claude/auto-*` branches only, and re-invokes Claude
(`--max-turns 20`) to read the actual feedback/CI failure and push a genuine fix to the *existing*
branch — it never opens a new PR and never merges or approves. Same hard constraints as the main
workflow (no `--no-verify`, no faking a check green, no touching other workflow files).

### Auto-merge on approval (`pr-auto-merge.yml`)

Fires on `pull_request_review: submitted`. If the review is an approval from the repo owner or a
collaborator/member, it runs `gh pr merge --auto --squash`, which enables GitHub's native auto-merge —
the PR merges by itself as soon as its required status checks pass, with no human needing to come back
and click merge. This applies repo-wide, not just to autonomous PRs.

**Two one-time manual prerequisites**, since neither is settable through the tools available to a
Claude Code session:
- Add the `GH_AUTOMATION_PAT` repo secret described above (fine-grained PAT scoped to this repo,
  Contents: read/write, Pull requests: read/write), alongside the existing `CLAUDE_CODE_OAUTH_TOKEN`.
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
    storage.js              ← localStorage save/load/clear + save-schema migration
  components/
    Button/index.js        ← styled button; accepts a `color` prop, disabled styling
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
   localStorage persistence effect, the `quantity` (×1/×10) toggle state, and exposes
   `{ state, actions, resetGame, quantity, setQuantity }`. `quantity` is passed into `tickGame` on every tick
   as `autobuyerBatchSize`; it is UI-only preference state, not persisted to `localStorage`.
3. **`MainPage/index.jsx`** — a pure renderer driven entirely by `TIER_DEFINITIONS` and the hook's `state`;
   renders each unlocked tier as a single compact row rather than separate cards, showing `Owned` (current
   amount, drives production) and `Purchased` (lifetime buy count, drives cost) as two separate figures.
   Money is displayed once, at the top, via `formatCurrency` (comma-grouped `$` format below 1,000,000,
   exponential above). The manual "Buy" button on each row always buys as many units as are currently
   affordable, capped at the 10-unit cost-block boundary (via `getTierAffordableQuantity`/`buyTierQuantity`)
   — never just 1. The global ×1/×10 toggle ("Autobuyer:") is unrelated to this: it only controls how
   autobuyers batch their purchases during a tick (see `tickGame` below), and never affects the manual button.
   Each tier row is a CSS Grid with fixed `grid-template-areas`/`grid-template-columns` (one set above the
   `40rem` breakpoint, a stacked set below it) rather than flexbox content-based sizing, so a field's
   on-screen position depends only on viewport width, never on how many digits its value has; grid cells use
   a shared `gridCell` mixin (`min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`)
   as a safety net against content forcing a column wider than its track. `RootDiv` sets
   `font-variant-numeric: tabular-nums` so digits render at a uniform width.

### Economy model

There are 12 tiers, `Tens` through `Decillions` (`TIER_DEFINITIONS` in `src/game/layers.js`). **Every tier
is bought directly with `Ones` (money)** — `costResourceId` is `MONEY_ID` for all of them. Once owned, a
tier produces the tier immediately below it (`producesResourceId`), cascading production down to `Ones`.
`Tens` is the special case where `costResourceId === producesResourceId === MONEY_ID`: it's the entry-level
generator, bought with money to produce more money.

A tier unlocks once you own **≥ 10** of the tier below it (`isTierUnlocked`); already-owned tiers stay
unlocked even if the rule changes later, so old saves stay playable.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js` — needs `id`, `name`, `symbol`, `baseCost`,
`costResourceId: MONEY_ID`, and `producesResourceId` set to the previous tier's `id`. No other file should
need changing — the page and engine are meant to be fully data-driven from that array.

### Game state shape

```js
{
  resources:  { Ones: 10, Tens: 0, … },       // amount owned per resource id (keyed by costResourceId/MONEY_ID)
  owned:      { Tens: 0, Thousands: 0, … },    // generator count per tier id (drives production)
  purchased:  { Tens: 0, Thousands: 0, … },    // lifetime purchase count per tier id (drives cost scaling)
  autobuyers: { Tens: null, Thousands: null, … }, // null = locked; number = active level (0 = unlocked but idle)
  prestige:   { xp: 0, level: 0, highestMilestone: 1 }, // xp only funds autobuyer unlocks — prestige itself
                                                          // is gated on Money ≥ GOOGOL, not xp
}
```

`owned[tierId]` and `resources[tierId]` for the same tier id always move together — buying a tier, producing
it via the tier above's tick, and spending it on that tier's own autobuyer upgrade all update both by the
same amount. They represent "how many generators you have" and "how much of that tier's resource you can
spend" respectively, which happen to be the same number by design. `purchased` is separate: it only ever
increases and is what `getTierCost` scales against, so passively-produced `owned` growth never discounts cost.

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
| `tickGame` | `(elapsedSeconds, autobuyerBatchSize = 1) → state → state` | Runs autobuyers highest-tier-first (every tier costs the same resource, Money, so autobuyers compete for one shared pool — the higher tier gets first claim on limited funds), then produces resources for every unlocked tier, then checks milestones. Each active autobuyer attempts up to `level` purchases; at `autobuyerBatchSize` 1 (default) each attempt buys 1 unit as soon as affordable (unchanged legacy behavior); above 1 (the ×10 toggle) each attempt only buys once the tier can afford the *entire* current cost block up to that size — it holds and waits rather than buying a partial batch |
| `buyTier` | `(tierId) → state → state` | Validates unlock + affordability, deducts cost, increments `owned`/`purchased` by 1; used internally by `buyTierQuantity` and `tickGame`'s autobuyer loop, not called directly by the UI |
| `buyTierQuantity` | `(tierId, quantity) → state → state` | Buys up to `quantity` units (capped at the cost-block boundary), stopping early if a unit becomes unaffordable; the manual "Buy" button always calls this with `quantity: 10` (the block size) to grab as many units as it can currently afford, and `tickGame`'s autobuyer batching also uses it |
| `buyAutobuyer` | `(tierId) → state → state` | First call unlocks (spends XP, level → 0); subsequent calls upgrade the level (spends the tier's own resource) |
| `prestigeGame` | `state → state` | Requires Money ≥ `GOOGOL`; resets resources/owned/purchased, keeps autobuyer *unlock* status (levels reset to 0), leaves XP untouched, increments prestige level |
| `isTierUnlocked` | `state → tier → bool` | First tier always unlocked; later tiers need `owned[prevTier] >= 10` (or already unlocked, so old saves stay playable) |
| `getMoneyExponent` | `money → number` | `floor(log10(money))`, floored to 0 below 1 — money's order of magnitude, also what `checkMilestones` tracks as XP milestones |
| `getPrestigeProgressPercent` | `money → number` | `getMoneyExponent(money) / log10(GOOGOL) * 100`, rounded and clamped to `[0, 100]` — GOOGOL is exponent 100, so this reads as a whole percent equal to the money exponent itself |
| `productionMultiplier` | `prestigeLevel → number` | `2 ** prestigeLevel` |
| `getAutobuyerUnlockXPCost` | `tierIndex → number` | `AUTOBUYER_XP_COST_BASE * 2^tierIndex` |
| `getAutobuyerCost` | `currentLevel → number` | `10 ** (currentLevel + 1)` |
| `formatAmount` | `value → string` | Locale-formatted integer below `EXPONENTIAL_NOTATION_THRESHOLD` (1,000,000); scientific notation at/above (e.g. `6.5E13`) — used for non-money amounts (owned/purchased counts, and per-tier production rates, except a tier producing Money which uses `formatCurrency` instead so the row stays consistent with every other Money display) |
| `formatCurrency` | `value → string` | Full comma-grouped `$`-prefixed string below `EXPONENTIAL_NOTATION_THRESHOLD`, floored (never rounds up); exponential notation (e.g. `$6.5E13`) at/above the same threshold — used for all Money amounts, wherever they appear |
| `RESOURCE_SYMBOL` (`layers.js`) | `resourceId → string` | Returns the matching tier's `symbol`, `'$'` fallback for `MONEY_ID`/unknown ids |

### Constants (`src/game/layers.js`)

- `MONEY_ID = 'Ones'` — id of the base/root resource
- `MONEY_STARTING_AMOUNT = 10`
- `GOOGOL = 1e100` — money balance required to prestige
- `TICK_RATE_MS = 1000`
- `AUTOBUYER_XP_COST_BASE = 1` (doubles per tier index)

### Path aliases (`vite.config.js`)

`components/X` → `src/components/X`, `game/X` → `src/game/X`, `pages/X` → `src/pages/X`. Use these bare
aliases in imports (as the existing code does), not relative paths like `../../game/engine`.

## Testing

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`, `App.test.jsx`.
- Environment: jsdom, globals enabled (`describe`/`it`/`expect` without imports), setup file
  `src/setupTests.js` (imports `@testing-library/jest-dom/vitest`).
- Component tests use Testing Library (`render`, `screen`, `userEvent`) and query by role/label text rather
  than test IDs; `StatCard` panels carry `aria-label="<tier name> layer"` for this purpose.
- Tests that seed `localStorage` directly must clear it in `beforeEach` (see `App.test.jsx`).
- `yarn test` is green (147 tests). All four test files assert against the current tier/resource id scheme
  (`MONEY_ID = 'Ones'`, tiers `Tens`/`Thousands`/…) — don't reintroduce the older lowercase scheme
  (`'money'`, `'ones'`, `'hundreds'`) that a previous, unfinished rename left behind in the tests; that
  mismatch has been reconciled in favor of the current `layers.js`/`engine.js` source.

## Security notes

- Dev and test-watch servers bind to `127.0.0.1` explicitly (`--host 127.0.0.1`) — do not change to `0.0.0.0`.
- All purchases, autobuyer upgrades, and prestige are validated inside `engine.js`, not just via disabled UI
  buttons — the engine re-checks affordability/unlock state on every call.
- `saveGameState`/`loadGameState`/`clearGameState` wrap `localStorage` access in try/catch and fail silently
  (quota errors, private-browsing restrictions).
- Timer effects (`useIncrementalGame`'s `setInterval`) are cleaned up on unmount.
