// Simulates full playthroughs of Tens (a fresh game to reaching 1 Googol Money / prestige) using
// the real, pure functions in src/game/engine.js and src/game/layers.js — not a reimplementation —
// so results always reflect the actual current game rules.
//
// Bot strategy (approximates an attentive, always-online player, held constant across runs so the
// only thing varying between rows is the starting Prestige Point balance):
//   - Every tick, "click Buy" on every unlocked tier (buyTierQuantity, same 10-unit batch the real
//     Buy button uses).
//   - Tier autobuyers are never unlocked during a run: unlocking is no longer a PP purchase (the
//     old buyAutobuyerUnlock is gone) — it's a free, automatic unlock keyed to lifetime prestige
//     count (applyAutobuyerMilestones, gated on state.prestige.count starting at
//     getAutobuyerUnlockMilestone(tier.id), 1 prestige for tier01). Every simulated run starts a
//     fresh state (prestige.count = 0) and never calls prestigeGame mid-run (the loop exits the
//     instant isProductionFrozen becomes true), so under the current rules no tier's autobuyer can
//     ever reach its milestone within a single simulated run — this bot models manual-Buy-only tier
//     purchases throughout.
//   - Autobuyer levels are never manually Upgraded past 1, and no PP is ever spent on Auto-upgrade
//     automation or Smart — this isolates the effect of the passive +1%-per-point production-speed
//     bonus (getPrestigeProductionMultiplier) on run length, holding every other lever fixed.
//   - Every tick, the instant enough unspent PP is banked (>= PRESTIGE_SPEED_BONUS_UNLOCK_COST),
//     "click Unlock" on the passive speed bonus (buyPrestigeSpeedBonus) — the one PP lever this
//     bot doesn't hold back, since without it a run's starting PP balance is otherwise inert
//     (the bot never actually prestiges mid-run, so points never grow beyond the starting value —
//     see startingPP below). Only starting balances at/above the unlock cost ever afford this.
//   - Every tick, the instant the last tier's current LEVEL reaches that cycle's requirement
//     (state.purchaseLevels[lastTier.id] >= getSpeedUpRequirement(speedUpCount): level 2 for the
//     first activation, level 3 for the second, level 4 for the third, …), "click Speed Up"
//     (speedUpGame) immediately. Unlike Auto-upgrade automation/Smart above, this isn't an
//     optional PP-gated lever being deliberately held fixed — it's a core, always-on mechanic with
//     no PP cost, so always accepting it the moment it's available is the natural "attentive
//     player" behavior this bot otherwise already models for autobuyer unlocks.
//
// Usage:
//   node run-simulation.mjs                      # default PP balances
//   node run-simulation.mjs 0 100 1000 10000      # custom PP balances (space-separated integers)

import {
  buyPrestigeSpeedBonus,
  buyTierQuantity,
  createInitialGameState,
  formatCurrency,
  getSpeedUpRequirement,
  isProductionFrozen,
  speedUpGame,
  tickGame,
} from '../../../src/game/engine.js'
import { MONEY_ID, TIER_DEFINITIONS } from '../../../src/game/layers.js'

// A fixed 10-unit-per-tick cap chosen for this simulation's bot strategy — not a claim that it
// matches the real Buy button, which batches up to the current cost-block boundary (a value that
// can grow past 10 over a run; see docs/ECONOMY_REFERENCE.md's purchase-block-size section).
const BUY_QUANTITY = 10
const MAX_TICKS = 5_000_000 // safety cap (~58 simulated days) so a pathological input can't hang
const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]

function simulateRun(startingPP) {
  let state = createInitialGameState()
  state = { ...state, prestige: { ...state.prestige, points: startingPP } }

  let ticks = 0
  let speedUps = 0
  while (!isProductionFrozen(state)) {
    if (ticks >= MAX_TICKS) {
      return { ticks, reached: false, finalMoney: state.resources[MONEY_ID], speedUps, speedBonusUnlocked: state.prestigeSpeedBonusUnlocked }
    }

    for (const tier of TIER_DEFINITIONS) {
      state = buyTierQuantity(tier.id, BUY_QUANTITY)(state)
    }
    if (!state.prestigeSpeedBonusUnlocked) {
      state = buyPrestigeSpeedBonus(state)
    }
    if (state.purchaseLevels[lastTier.id] >= getSpeedUpRequirement(state.speedUpCount ?? 0)) {
      const next = speedUpGame(state)
      if (next !== state) speedUps += 1
      state = next
    }
    state = tickGame(1, BUY_QUANTITY)(state)
    ticks += 1
  }

  return { ticks, reached: true, finalMoney: state.resources[MONEY_ID], speedUps, speedBonusUnlocked: state.prestigeSpeedBonusUnlocked }
}

// Not formatOfflineDuration (engine.js) — that formatter is explicitly scoped to durations up to
// MAX_OFFLINE_SECONDS (24h) and omits days. A slow/low-PP run can span multiple simulated days.
function formatDuration(totalSeconds) {
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0 || days > 0) parts.push(`${hours}h`)
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`)
  parts.push(`${seconds}s`)
  return parts.join(' ')
}

// Extends past PRESTIGE_SPEED_BONUS_UNLOCK_COST (10000) so the highest rows actually afford and
// exercise the passive-bonus unlock above — the bot never prestiges mid-run, so points never grow
// beyond the starting value, and every value below the unlock cost leaves it permanently locked.
const defaultPPValues = [0, 10, 25, 50, 100, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000]
const cliValues = process.argv.slice(2).map(Number).filter(n => Number.isFinite(n) && n >= 0)
const ppValues = cliValues.length > 0 ? cliValues : defaultPPValues

console.log('| PP balance | Speed bonus | Ticks (sim. seconds) | Run duration | Money at Googol | Speed Ups |')
console.log('|---|---|---|---|---|---|')
for (const pp of ppValues) {
  const { ticks, reached, finalMoney, speedUps, speedBonusUnlocked } = simulateRun(pp)
  const durationCell = reached ? formatDuration(ticks) : `${formatDuration(ticks)} (capped)`
  const moneyCell = reached ? formatCurrency(finalMoney) : 'not reached'
  const bonusCell = speedBonusUnlocked ? `+${pp}%` : 'locked'
  console.log(`| ${pp} | ${bonusCell} | ${ticks.toLocaleString()} | ${durationCell} | ${moneyCell} | ${speedUps} |`)
}
