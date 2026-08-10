# Tens

[![CI](https://github.com/mohanpednekar/tens/actions/workflows/ci.yml/badge.svg)](https://github.com/mohanpednekar/tens/actions/workflows/ci.yml)
<!-- Latest-release badge: add [![Release](https://img.shields.io/github/v/release/mohanpednekar/tens)](https://github.com/mohanpednekar/tens/releases/latest) once #52 lands and the first tagged Release exists. -->

Setup status: see the pinned [maintainer checklist](https://github.com/mohanpednekar/tens/issues/62).

Tens is a React incremental game built entirely around the theme of 10. Every mechanic — costs, production, prestige bonuses — uses powers of ten, multiples of ten, or 10% increments.

Play it live at [mohanpednekar.github.io/tens](https://mohanpednekar.github.io/tens/).

## Scripts

- `yarn start` / `yarn dev` - start the Vite development server on `127.0.0.1`.
- `yarn build` - create a production build.
- `yarn test` - run the Vitest test suite once.
- `yarn test:watch` - run Vitest in watch mode on `127.0.0.1`.
- `yarn audit` - run a recursive dependency audit.

## Game design

### Core economy

The base resource is Money ($, resource id `Ones`). The player starts with $10.

### Production layers

Before the main game, a separate **Byte Foundry** pre-game screen has you tap to earn bits, combine
your first 8 into a Byte generator, and grow capacity/production until you can convert into the main
game's starting Kilobytes — see `docs/ECONOMY_REFERENCE.md`'s "Byte Foundry" section for the full
mechanic.

There are 10 tiers, from Kilobytes up to Quettabytes (a byte-scale/computing theme). **Every tier is
bought directly with Money** and, once owned, produces the tier immediately below it (which cascades
down to Money). The first tier, Kilobytes, both costs and produces Money — it's the entry-level
generator.

| Tier | Symbol | Base cost | Produces |
|------|--------|-----------|----------|
| Kilobytes | KB | $1e3 | Money |
| Megabytes | MB | $1e6 | Kilobytes |
| Gigabytes | GB | $1e9 | Megabytes |
| Terabytes | TB | $1e12 | Gigabytes |
| Petabytes | PB | $1e15 | Terabytes |
| Exabytes | EB | $1e18 | Petabytes |
| Zettabytes | ZB | $1e21 | Exabytes |
| Yottabytes | YB | $1e24 | Zettabytes |
| Ronnabytes | RB | $1e27 | Yottabytes |
| Quettabytes | QB | $1e30 | Ronnabytes |

Costs scale in Fibonacci-driven jumps every block of 10 purchases (see `getTierCost` in `engine.js`).

A tier unlocks once you own **10 or more** of the tier below it (already-owned tiers stay unlocked even if
the rule changes later, so old saves remain playable).

### Autobuyers

Each tier has its own autobuyer, unlocked and upgraded with Prestige Points:
- **Unlocking** costs PP and doubles per tier layer (1, 2, 4, 8 PP, …).
- **Upgrading** a level spends the tier's own resource in powers of ten (10, 100, 1,000, … per level).
- Each autobuyer level buys 1 generator of its tier per tick, as long as funds allow.

### Prestige

Players earn **1 Power Point (PP)** each time Money crosses a new power-of-ten milestone ($100, $1,000, $10,000 …).

Players may Prestige at any time:
- Costs **10 PP** and grants **1 Prestige Level**.
- Resets all resources, owned counts, and active autobuyer levels (unlocked autobuyers stay unlocked).
- Each Prestige Level **doubles production** at every layer (×2^level).

## Game architecture

- `src/game/layers.js` — tier definitions (`TIER_DEFINITIONS`), resource symbols (`RESOURCE_SYMBOL`), and constants.
- `src/game/engine.js` — pure state helpers: `createInitialGameState`, `tickGame`, `buyTier`, `buyAutobuyer`, `prestigeGame`, `getTierCost`, `getAutobuyerCost`, `getAutobuyerUnlockPPCost`, `isTierUnlocked`, `productionMultiplier`.
- `src/game/useIncrementalGame.js` — connects the pure engine to React state; owns timer cleanup.
- `src/pages/MainPage/index.jsx` — renders every tier and the prestige panel data-driven from `TIER_DEFINITIONS`, so adding a new tier requires only a new entry in `layers.js`.

## Security notes

- Development and test-watch servers bind to `127.0.0.1` by default.
- Purchases and prestige are validated in the engine before state changes, not only through disabled UI buttons.
- Timer effects clean themselves up on unmount.
