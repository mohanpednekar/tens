# Tens

Tens is a React incremental game built entirely around the theme of 10. Every mechanic — costs, production, prestige bonuses — uses powers of ten, multiples of ten, or 10% increments.

## Scripts

- `yarn start` / `yarn dev` - start the Vite development server on `127.0.0.1`.
- `yarn build` - create a production build.
- `yarn test` - run the Vitest test suite once.
- `yarn test:watch` - run Vitest in watch mode on `127.0.0.1`.
- `yarn audit` - run a recursive dependency audit.

## Game design

### Core economy

The base resource is Money ($). The player starts with $10.

### Production layers

Each layer produces 1 unit/sec of the layer below it and is bought with units of the layer below it.

| Layer     | Produces  | Cost currency | Base cost |
|-----------|-----------|---------------|-----------|
| Ones      | Money     | Money         | $10       |
| Tens      | Ones      | Ones          | 100 Ones  |
| Hundreds  | Tens      | Tens          | 1,000 Tens|
| Thousands | Hundreds  | Hundreds      | 10,000    |

Costs increase **linearly by 10% of the base cost** per purchase:
- Ones: $10, $11, $12, $13 …
- Tens: 100, 110, 120, 130 …
- Hundreds: 1,000, 1,100, 1,200 …

Layers above Ones unlock once you own at least one unit of the layer below.

### Prestige

Players earn **1 Power Point (PP)** each time Money crosses a new power-of-ten milestone ($100, $1,000, $10,000 …).

Players may Prestige at any time:
- Costs **10 PP** and grants **1 Prestige Level**.
- Resets all resources and owned counts.
- Each Prestige Level **doubles production** at every layer (×2^level).

## Game architecture

- `src/game/layers.js` — tier definitions, resource names/symbols, and constants.
- `src/game/engine.js` — pure state helpers: `createInitialGameState`, `tickGame`, `buyTier`, `prestigeGame`, `getTierCost`, `isTierUnlocked`, `productionMultiplier`.
- `src/game/useIncrementalGame.js` — connects the pure engine to React state; owns timer cleanup.
- `src/pages/MainPage/index.jsx` — renders every tier and the prestige panel data-driven from `TIER_DEFINITIONS`, so adding a new tier requires only a new entry in `layers.js`.

## Security notes

- Development and test-watch servers bind to `127.0.0.1` by default.
- Purchases and prestige are validated in the engine before state changes, not only through disabled UI buttons.
- Timer effects clean themselves up on unmount.
