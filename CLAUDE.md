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
push to `main`. `.github/workflows/copilot-review.yml` triggers an automated Copilot review on non-draft PRs.

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
    MainPage/index.jsx      ← single page; renders every tier data-driven from TIER_DEFINITIONS
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
   localStorage persistence effect, and exposes `{ state, actions, resetGame }`.
3. **`MainPage/index.jsx`** — a pure renderer driven entirely by `TIER_DEFINITIONS` and the hook's `state`.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js`. No other file should need changing — the page
and engine are meant to be fully data-driven from that array.

### Game state shape

```js
{
  resources:  { Ones: 10, Tens: 0, … },       // amount owned per resource id (keyed by costResourceId/MONEY_ID)
  owned:      { Tens: 0, Thousands: 0, … },    // generator count per tier id (drives production)
  purchased:  { Tens: 0, Thousands: 0, … },    // lifetime purchase count per tier id (drives cost scaling)
  autobuyers: { Tens: null, Thousands: null, … }, // null = locked; number = active level (0 = unlocked but idle)
  prestige:   { pp: 0, level: 0, highestMilestone: 1 },
}
```

`owned` vs `purchased`: `owned` is what production math uses (buying a tier can also passively grow another
tier's `owned` count when it produces a resource that is itself a tier); `purchased` only ever increases and
is what `getTierCost` scales against, so selling/gifting owned units (if ever added) wouldn't discount cost.

### Key engine functions (`src/game/engine.js`)

| Function | Signature | Purpose |
|----------|-----------|---------|
| `createInitialGameState` | `() → state` | Fresh state derived from `TIER_DEFINITIONS` |
| `getTierCost` | `(tier, purchasedCount) → number` | `baseCost * 10^epoch * (1 + 0.1*within)`, epoch = `floor(purchased/10)` |
| `tickGame` | `(elapsedSeconds) → state → state` | Runs autobuyers, then produces resources for every unlocked tier, then checks milestones |
| `buyTier` | `(tierId) → state → state` | Validates unlock + affordability, deducts cost, increments `owned`/`purchased` |
| `buyAutobuyer` | `(tierId) → state → state` | First call unlocks (spends PP, level → 0); subsequent calls upgrade the level (spends the tier's own resource) |
| `prestigeGame` | `state → state` | Requires `PRESTIGE_PP_COST` PP; resets resources/owned/purchased, keeps autobuyer *unlock* status (levels reset to 0), increments prestige level |
| `isTierUnlocked` | `state → tier → bool` | First tier always unlocked; later tiers need `owned[prevTier] >= 10` (or already unlocked, so old saves stay playable) |
| `productionMultiplier` | `prestigeLevel → number` | `2 ** prestigeLevel` |
| `getAutobuyerUnlockPPCost` | `tierIndex → number` | `AUTOBUYER_PP_COST_BASE * 2^tierIndex` |
| `getAutobuyerCost` | `currentLevel → number` | `10 ** (currentLevel + 1)` |
| `formatAmount` | `value → string` | Locale-formatted integer below 1,000,000; scientific notation at/above |

### Constants (`src/game/layers.js`)

- `MONEY_ID` — id of the base/root resource (currently `'Ones'`)
- `MONEY_STARTING_AMOUNT = 10`
- `PRESTIGE_PP_COST = 10`
- `TICK_RATE_MS = 1000`
- `AUTOBUYER_PP_COST_BASE = 1` (doubles per tier index)

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

### Known inconsistency

`src/game/layers.js` and `src/game/engine.js` currently use capitalized, tier-name-based resource/tier ids
(`MONEY_ID = 'Ones'`, tiers `Tens`, `Thousands`, `Millions`, …), but `layers.test.js`, `storage.test.js`, and
`App.test.jsx` still assert the older lowercase scheme (`MONEY_ID === 'money'`, tiers `'ones'`, `'tens'`,
`'hundreds'`, …), and `TIER_DEFINITIONS` entries have no `name` field even though `MainPage/index.jsx` reads
`tier.name`. This is a partially-completed rename, not a design choice — `yarn test` currently fails (39 of
106 tests). Before extending the tier/resource system, check whether the migration should be finished or
rolled back rather than building on top of the split; don't assume either file reflects the intended target
state without checking with the user.

## Security notes

- Dev and test-watch servers bind to `127.0.0.1` explicitly (`--host 127.0.0.1`) — do not change to `0.0.0.0`.
- All purchases, autobuyer upgrades, and prestige are validated inside `engine.js`, not just via disabled UI
  buttons — the engine re-checks affordability/unlock state on every call.
- `saveGameState`/`loadGameState`/`clearGameState` wrap `localStorage` access in try/catch and fail silently
  (quota errors, private-browsing restrictions).
- Timer effects (`useIncrementalGame`'s `setInterval`) are cleaned up on unmount.
