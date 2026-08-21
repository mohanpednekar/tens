---
name: simulate-run-times
description: Simulates full playthroughs of Tens (fresh state through Byte Foundry unlock and on to 1 Googol Money / prestige) using the real engine functions in src/game/engine.js, to show ideal Foundry + prestige cycle lengths, how starting Prestige Point balance / prestige-count autobuyer milestones affect them, and Memory capacity-cap tradeoffs (Storage vs Compute). Use when asked about run times, time-to-prestige, Foundry duration, pacing/balance, ideal Memory capacity, Storage vs Compute, or how PP / autobuyers affect game speed. Also run (and publish) after any code change that can significantly affect those timings — see "When to re-run" below.
---

Runs `node simulate.mjs [args...]` (in this skill's own directory) and reports the printed
markdown tables back to the user, verbatim or lightly summarized — do not recompute the numbers by
hand or estimate them yourself; the script drives the actual game engine so its output is
authoritative.

## When to re-run

**Always** run this skill (then publish — see below) when:

1. Someone asks about run times, time-to-prestige, Foundry duration, pacing/balance, ideal Memory
   capacity / Storage vs Compute, or how PP / autobuyers affect speed; **or**
2. You make a change that can **significantly affect** ideal Foundry / prestige timings — including
   (non-exhaustive) edits to `src/game/engine.js` / `src/game/layers.js` economy formulas or
   constants, Byte Foundry / Disk / Compute / Capacity / tickspeed / autobuyer / prestige rules,
   `BUY_QUANTITY` / purchase-block behavior, or this skill's own bot strategy in
   `run-simulation.mjs`.

Skip only for clearly unrelated work (pure UI chrome, docs that don't change rules, CI-only, etc.).
If unsure whether a change is significant, re-run and publish.

## What it does

For each requested scenario it plays from `createInitialGameState()` (or a post-`prestigeGame`
carry in career mode) to the instant `isProductionFrozen` becomes true (Money reaches
`PRESTIGE_THRESHOLD` = 1 Googol Bytes in Bits), counting simulated ticks (each tick = 1 real second
at the game's fixed `TICK_RATE_MS`). It uses the actual, current `src/game/engine.js`/
`src/game/layers.js` source — not a reimplementation — so results automatically reflect any
balance changes made to the engine.

Reports **Foundry** time (ticks until `intro.mainGameUnlocked`) and **Main → Googol** time
(remaining ticks to the Prestige freeze) separately, plus total cycle length.

**Bot strategy** (ideal attentive player, fixed across every row):

- **Foundry every tick:** Tap Memory when not full; Combine into a Byte when affordable. While
  `mainGameUnlocked` is false, pause every unlocked tier autobuyer (so `tickDiskAutoRedeem` cannot
  advance tier01's cost), skip Disk Fill/Build, and convert Memory → Kilobytes until the gate
  opens — redeeming permanent full Disks before that convert advances purchase levels without
  flipping `mainGameUnlocked` and can softlock the gate once conversion cost exceeds capacity.
  After unlock: restore autobuyers, Disk Fill → Invest → Disk Build → **queue Capacity** when
  Invest can't take the next spend (or while climbing to conversion unlock) →
  `tickQueuedCapacityUpgrade` (fires on full Memory, **erases all Compute tokens**, then Sacrifices)
  → convert → Boosts → **Core claim last** (skipped while Capacity is queued). Does **not** enable
  permanent auto-claim / auto-merge.
- **Memory capacity cap (`--capacity-cap`):** climb Capacity normally until Memory reaches the
  listed bit value, then **stop Sacrificing / queueing Capacity**. Higher caps unlock larger Disk
  sizes (faster early-tier redemption) but each Compute Core costs a full Memory fill, so Core
  farming and Boost uptime get worse. Default sweep: 1 MB / 10 MB / 100 MB / 1 GB /
  `unlimited` (grow-forever baseline). Reports end capacity, cores ever earned, and disks built
  alongside Foundry / Main / total times.
- **Autobuyers wherever applicable:** tiers whose `autobuyers[tierId]` is non-null (from
  `applyAutobuyerMilestones` keyed on `prestige.count` — 1 prestige for tier01, …, 10 for tier10)
  are left to `tickGame`'s autobuyer loop with the real `BUY_QUANTITY = Number.MAX_SAFE_INTEGER`
  batch (same sentinel `useIncrementalGame.js` uses — not a literal 10).
- **Manual clicks where waiting would stall:** `buyTierQuantity` on any tier with no autobuyer yet,
  OR whose autobuyer would stall this tick (some units affordable, but fewer than the full
  cost-block batch the autobuyer waits for — the classic level-1 / Smart-missing stall). Manual
  buys purchase whatever is affordable up to the block boundary.
- **Tickspeed (Money / XP):** buy the global tickspeed multiplier and each tier's own tickspeed
  multiplier whenever affordable; dump run XP into the last tier's XP-funded tickspeed when the
  min-consumption gate allows.
- **Soft resets:** Overclock first when eligible (`getOverclockRequirement`), then Speed Up
  (`getSpeedUpRequirement` = `speedUpCount + 6`). Overclock-first is empirically faster to Googol
  than Speed-Up-first or either alone.
- **PP lever kept active:** unlock the passive +1%-per-unspent-point production-speed bonus
  (`buyPrestigeSpeedBonus`) the instant `PRESTIGE_SPEED_BONUS_UNLOCK_COST` (10000) is banked —
  note that unlock **spends** those 10000 PP, so a starting balance of exactly 10000 leaves 0
  unspent and grants no ongoing bonus (same run length as 0 PP). Balances above 10000 keep the
  remainder. Other PP automations (Smart, Auto-Speed-Up, Auto-Prestige, tickspeed autobuyer) are
  **not** bought — those are separate levers; say so rather than silently enabling them if the
  user asks about those specifically.
- Career mode calls `prestigeGame` between cycles so permanent Foundry upgrades and
  prestige-count autobuyer milestones carry forward for real.

## Usage

```
node .claude/skills/simulate-run-times/simulate.mjs                  # career 0..10 + default PP sweep
node .claude/skills/simulate-run-times/simulate.mjs --career 0 1 5 10
node .claude/skills/simulate-run-times/simulate.mjs --pp 0 100 10000
node .claude/skills/simulate-run-times/simulate.mjs --pp 0 --career 0 1
node .claude/skills/simulate-run-times/simulate.mjs 0 100 10000      # bare numbers = PP sweep (legacy)
node .claude/skills/simulate-run-times/simulate.mjs --capacity-cap   # 1MB/10MB/100MB/1GB/unlimited
node .claude/skills/simulate-run-times/simulate.mjs --capacity-cap 8000000 80000000 unlimited
node .claude/skills/simulate-run-times/simulate.mjs --strategy-out /tmp/run.md
```

Prints markdown tables to stdout. A run capped by the script's `MAX_TICKS` safety net (5,000,000
simulated seconds) is marked `(capped)` in the duration column — call that out to the user rather
than presenting it as a finished run.

## Strategy snapshots (orphan branch) — required after every run

Ideal-run strategy lives **only** on the stable orphan branch `ideal-run-strategy`
(**no** agent/session suffix — do not rename to `cursor/…-NNNN`). Layout:

- `README.md` — index of runs
- `runs/<UTC-stamp>-<engine-sha>.md` — **one file per run** (never overwrite an older run)

It is intentionally **not** on `main`. Do not merge that branch into `main`.

**After every skill run (and after every significant-pacing code change), publish a new run file:**

```
.claude/skills/simulate-run-times/publish-strategy.sh
# optional: forward sim args, e.g.
.claude/skills/simulate-run-times/publish-strategy.sh --career 0 1 10 --pp 0 25000 50000
.claude/skills/simulate-run-times/publish-strategy.sh --capacity-cap
```

That script runs the simulator with `--strategy-out`, writes a new
`runs/<UTC-stamp>-<sha>.md`, refreshes `README.md`, and pushes the orphan branch via a temporary
git worktree. If you cannot push, still run the sim with `--strategy-out` and report the tables;
note that the orphan branch still needs publishing.

Retired name: `cursor/ideal-run-strategy-4551` (single living `IDEAL_STRATEGY.md`) — superseded by
`ideal-run-strategy` + per-run files under `runs/`.

## When editing the simulation

If the user asks to change the bot strategy, the PP / career / capacity-cap range, or add a new
dimension (e.g. buying Smart / Auto-Speed-Up too), edit `run-simulation.mjs` directly — it's a
plain, readable script. Keep importing the real `src/game/engine.js`/`layers.js` (via the relative
paths already in the file) rather than inlining copies of the game logic, so the simulation can
never silently drift out of sync with the actual game rules. `ext-loader.mjs` and the `register()`
call in `simulate.mjs` exist only to let plain Node resolve `engine.js`'s Vite-style extensionless
imports — leave them alone unless that resolution itself breaks.

**Do not** reintroduce the old `BUY_QUANTITY = 10` hardcode or a Foundry-skipping bot: both are
wrong against the current game (real Buy batches to the cost-block boundary;
`mainGameUnlocked` starts false and only flips via Foundry conversion). Also keep
`getSpeedUpRequirement` as `speedUpCount + 6` (not the long-superseded level-2/3/4 sequence).
