---
name: simulate-run-times
description: Simulates full playthroughs of Tens (fresh state to reaching 1 Googol Money / prestige) using the real engine functions in src/game/engine.js, to show how starting Prestige Point balance affects a single run's length. Use when asked about run times, time-to-prestige, pacing/balance simulations, or how PP affects game speed.
---

Runs `node simulate.mjs [ppValues...]` (in this skill's own directory) and reports the printed
markdown table back to the user, verbatim or lightly summarized — do not recompute the numbers by
hand or estimate them yourself; the script drives the actual game engine so its output is
authoritative.

## What it does

For each requested starting Prestige Point (PP) balance, it plays a full run from
`createInitialGameState()` to the instant `isProductionFrozen` becomes true (Money reaches 1
Googol), counting simulated ticks (each tick = 1 real second at the game's fixed `TICK_RATE_MS`).
It uses the actual, current `src/game/engine.js`/`src/game/layers.js` source — not a
reimplementation — so results automatically reflect any balance changes made to the engine.

**Bot strategy** (fixed across every row, so PP balance is the only thing varying):
- Every tick, "clicks Buy" on every unlocked tier (`buyTierQuantity`, the same 10-unit batch the
  real Buy button uses).
- Every tick, "clicks Unlock" on any tier whose autobuyer isn't active yet, the moment it's
  affordable (`buyAutobuyer`'s first call, level `null` → 1).
- Autobuyer levels are never manually Upgraded past 1, and no PP is spent on Auto-upgrade
  automation or Smart — this isolates the effect of the passive +1%-per-point production-speed
  bonus (`getPrestigeProductionMultiplier`) on run length, holding every other lever fixed. If the
  user wants those other levers varied too (e.g. "what if automation is already bought"), that
  needs a different, explicitly-scoped simulation — say so rather than silently changing strategy.
- Every tick, the instant enough unspent PP is banked, "clicks Unlock" on the passive speed bonus
  (`buyPrestigeSpeedBonus`) — the one PP lever this bot doesn't hold back, since without it a run's
  starting PP balance is otherwise inert: the bot never actually prestiges mid-run (the loop exits
  the instant `isProductionFrozen` becomes true, before ever calling `prestigeGame`), so
  `prestige.points` never grows beyond the starting value passed in. Only starting balances at or
  above `PRESTIGE_SPEED_BONUS_UNLOCK_COST` (10000) ever afford this — lower balances leave it
  permanently locked for the whole run, and the output table's "Speed bonus" column reports
  `locked` rather than a fictional `+N%` in that case.
- Every tick, the instant the last tier reaches that cycle's requirement
  (`getSpeedUpRequirement(speedUpCount)`: 10 lifetime purchases for the first activation, 20 for
  the second, 30 for the third, …), "clicks Speed Up" (`speedUpGame`) immediately. Unlike
  Auto-upgrade automation/Smart above, this isn't an optional PP-gated lever being deliberately
  held fixed for isolation — it's a core, always-on, no-cost mechanic, so always accepting it the
  moment it's available is the natural "attentive player" behavior, matching how the bot already
  treats autobuyer unlocks.

## Usage

```
node .claude/skills/simulate-run-times/simulate.mjs                  # default PP balances
node .claude/skills/simulate-run-times/simulate.mjs 0 100 1000 10000 # custom PP balances
```

Prints a markdown table straight to stdout: PP balance, the production-speed bonus it actually
granted (`locked` if the run's starting balance never reached the unlock cost — see the bot
strategy above), ticks elapsed (= simulated seconds), a human-readable duration, the money balance
at the moment Googol was crossed (which can overshoot substantially in the final tick — see
`getPrestigePointsAwarded` in `CLAUDE.md`), and how many times Speed Up fired during the run. The
default PP range (`0` through `50000`) deliberately spans `PRESTIGE_SPEED_BONUS_UNLOCK_COST`
(10000) so both the locked and unlocked cases show up. A run capped by the script's `MAX_TICKS`
safety net (5,000,000 simulated seconds) is marked "(capped)" in the duration column rather than a
real result — call this out to the user if it happens rather than presenting it as a finished run.

## When editing the simulation

If the user asks to change the bot strategy, the PP range, or add a new dimension (e.g. varying
automation/Smart state too), edit `run-simulation.mjs` directly — it's a plain, readable script.
Keep importing the real `src/game/engine.js`/`layers.js` (via the relative paths already in the
file) rather than inlining copies of the game logic, so the simulation can never silently drift
out of sync with the actual game rules. `ext-loader.mjs` and the `register()` call in `simulate.mjs`
exist only to let plain Node resolve `engine.js`'s Vite-style extensionless imports — leave them
alone unless that resolution itself breaks.
