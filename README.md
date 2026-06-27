# Tens

Tens is a small React incremental-game prototype. It is structured so the game rules live in data files and pure engine helpers, while React components focus on rendering and user interaction.

## Scripts

- `yarn start` / `yarn dev` - start the Vite development server on `127.0.0.1`.
- `yarn build` - create a production build.
- `yarn test` - run the Vitest test suite once.
- `yarn test:watch` - run Vitest in watch mode on `127.0.0.1`.
- `yarn audit` - run a recursive dependency audit.

## Game architecture

- `src/game/layers.js` defines layers, resources, generators, costs, and unlock requirements.
- `src/game/engine.js` contains pure state helpers for initialization, ticking, affordability, and purchases.
- `src/game/useIncrementalGame.js` connects the pure game engine to React state and owns timer cleanup.
- `src/pages/MainPage/index.js` renders every configured layer, so adding a layer generally starts in `layers.js` instead of requiring a new page component.

## Security notes

- The development and test-watch servers bind to `127.0.0.1` by default.
- Purchases are validated in the engine before state changes, not only through disabled UI buttons.
- Timer effects clean themselves up on unmount.
