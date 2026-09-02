# Tens

[![CI](https://github.com/mohanpednekar/tens/actions/workflows/ci.yml/badge.svg)](https://github.com/mohanpednekar/tens/actions/workflows/ci.yml)
<!-- Latest-release badge: add [![Release](https://img.shields.io/github/v/release/mohanpednekar/tens)](https://github.com/mohanpednekar/tens/releases/latest) once #52 lands and the first tagged Release exists. -->

Setup status: see the pinned [maintainer checklist](https://github.com/mohanpednekar/tens/issues/62).

Tens is a React incremental game built entirely around the theme of 10. Every mechanic — costs, production, prestige bonuses — uses powers of ten, multiples of ten, or 10% increments.

Play it live at [mohanpednekar.github.io/tens](https://mohanpednekar.github.io/tens/).

## Scripts

- `yarn start` / `yarn dev` — start the Vite development server on `127.0.0.1` (app at `/tens/`).
- `yarn build` — create a production build.
- `yarn test` — run the Vitest test suite once.
- `yarn test:watch` — run Vitest in watch mode on `127.0.0.1`.
- `yarn test:e2e` — run the Playwright end-to-end suite (Chromium, against `yarn dev`).
- `yarn audit` — run Yarn Classic’s dependency audit.
- `yarn gen-pwa-icons` — regenerate PWA icon PNGs from `scripts/generate-pwa-icons.mjs`.

## Game design

### Core economy

- Base currency is **Bits** (resource id `base`, symbol `b`).
- Ten tiers — **Kilobytes** through **Quettabytes** — are bought with Bits; each produces the tier below it (Kilobytes both costs and produces Bits).
- Bytes are **not** a purchasable tier. Every fresh save earns its first Kilobytes via the **Byte Foundry** tap screen; once that happens, Factory stays permanently reachable for every future Prestige/Era ascension in that save — no per-cycle re-gate.
- Reaching **1 Googol Bytes** (8×10^100 Bits) freezes production until Prestige.

Full formulas, Prestige Points, Storage, Compute, tickspeed, Speed Up, Overclock, and offline progress: [`docs/ECONOMY_REFERENCE.md`](docs/ECONOMY_REFERENCE.md). Current behavior summary: [`CLAUDE.md`](CLAUDE.md). Design rationale / superseded ideas: [`docs/DESIGN_HISTORY.md`](docs/DESIGN_HISTORY.md).

### Byte Foundry

Tap to fill Memory, combine into a permanent Byte generator, grow via Sacrifice / Invest, then transfer Memory into free Kilobytes. Later: Disks (Storage) and Compute Cores → Megacomputer plus Compute Boost. Generator / Disks / Compute are permanent across Prestige; so is the main-game-unlock gate itself once ever triggered — only Memory (the Data Stream balance) resets each cycle.

### Guide

In-game **ℹ️ Guide** (`InfoPage`) holds evergreen, bullet-oriented explanations of every mechanic. Numbers there are derived from the same `engine.js` / `layers.js` constants the game uses.

## Game architecture

- `src/game/layers.js` — `TIER_DEFINITIONS` and economy constants.
- `src/game/engine.js` — pure state helpers (no React, no side effects).
- `src/game/useIncrementalGame.js` — React hook: state, tick timer, localStorage.
- `src/App.jsx` — owns the single game hook; switches Byte Foundry / Main / Info / Storage / Compute via local `useState` (no router).
- `src/pages/MainPage/index.jsx` — main game UI, data-driven from `TIER_DEFINITIONS`.

## Security notes

- Development and test-watch servers bind to `127.0.0.1` by default.
- Purchases and prestige are validated in the engine before state changes, not only through disabled UI buttons.
- Timer effects clean themselves up on unmount.
