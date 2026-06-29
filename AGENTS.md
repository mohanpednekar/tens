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
| Yarn | 2 (Berry) | PnP **disabled** (`nodeLinker: node-modules` in `.yarnrc.yml`); `.pnp.*`/`.pnp/` in `.gitignore` are precautionary |

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
  App.jsx               ← root component
  index.jsx             ← ReactDOM.createRoot entry
vite.config.js          ← aliases: components/, game/, pages/ → src/* equivalents
```

## Architecture

**All game logic is pure** (`engine.js`). The hook (`useIncrementalGame.js`)
owns all React state and side-effects (timer, localStorage). The page
(`MainPage/index.jsx`) is a pure renderer.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js`. No other file
needs changing — the page and engine are fully data-driven from that array.

### Game state shape

```js
{
  resources: { money: 10, ones: 0, tens: 0, … },   // all resource IDs from layers.js
  owned:     { ones: 0, tens: 0, … },               // count per tier id
  autobuyers:{ ones: false, tens: false, … },       // permanent, survive prestige
  prestige: { pp: 0, level: 0, highestMilestone: 1 }
}
```

### Key engine functions

| Function | Signature | Purpose |
|----------|-----------|---------|
| `getTierCost` | `(tier, owned) → number` | Scaled cost with epoch doubling every 10 |
| `tickGame` | `(elapsedSecs) → state → state` | Produce resources + run autobuyers |
| `buyTier` | `(tierId) → state → state` | Validates & deducts cost |
| `buyAutobuyer` | `(tierId) → state → state` | Spends PP for permanent autobuyer |
| `prestigeGame` | `state → state` | Resets progress, keeps autobuyers, increments level |
| `isTierUnlocked` | `(state) → tier → bool` | Tier 0 always unlocked; others need 1 of tier below |
| `productionMultiplier` | `(level) → number` | `2^level` |
| `formatAmount` | `(value) → string` | 2 decimals below 100, integer above |

### Constants (all in `src/game/layers.js`)

- `PRESTIGE_PP_COST = 10`
- `TICK_RATE_MS = 1000`
- `MONEY_STARTING_AMOUNT = 10`
- `AUTOBUYER_PP_COST_BASE = 1` (doubles per layer index: layer 0 → 1 PP, layer 1 → 2 PP …)

### Path aliases (vite.config.js)

`components/X` → `src/components/X`, `game/X` → `src/game/X`,
`pages/X` → `src/pages/X`. Use these aliases in imports, not relative paths.

## Testing

- Test files live next to source files: `engine.test.js`, `layers.test.js`,
  `storage.test.js`, `App.test.jsx`.
- Test environment: jsdom (configured in `vite.config.js`).
- Setup file: `src/setupTests.js` (imports `@testing-library/jest-dom`).
- Globals are enabled (`describe`, `it`, `expect`, etc. without imports).

## Security notes

- Dev and test servers bind to `127.0.0.1` — do not change to `0.0.0.0`.
- All purchases and prestige are validated in the engine, not just via disabled
  UI buttons.
- Timer effects are cleaned up on unmount.
- Save/load wraps localStorage in try/catch to handle quota errors silently.
