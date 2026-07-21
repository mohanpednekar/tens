// Simulates full playthroughs of Tens (a fresh game to reaching 1 Googol Money / prestige) using
// the real, pure functions in src/game/engine.js and src/game/layers.js — not a reimplementation —
// so results always reflect the actual current game rules.
//
// Bot strategy (approximates an attentive, always-online player, held constant across runs so the
// only thing varying between rows is the starting Prestige Point balance):
//   - Every tick, "click Buy" on every unlocked tier (buyTierQuantity, same 10-unit batch the real
//     Buy button uses).
//   - Every tick, "click Unlock" on any tier whose autobuyer isn't active yet, the instant it's
//     affordable (buyAutobuyerUnlock, null -> unlocked).
//   - Autobuyer levels are never manually Upgraded past 1, and no PP is ever spent on Auto-upgrade
//     automation or Smart — this isolates the effect of the passive +1%-per-point production-speed
//     bonus (getPrestigeProductionMultiplier) on run length, holding every other lever fixed.
//   - Every tick, the instant enough unspent PP is banked (>= PRESTIGE_SPEED_BONUS_UNLOCK_COST),
//     "click Unlock" on the passive speed bonus (buyPrestigeSpeedBonus) — the one PP lever this
//     bot doesn't hold back, since without it a run's starting PP balance is otherwise inert
//     (the bot never actually prestiges mid-run, so points never grow beyond the starting value —
//     see startingPP below). Only starting balances at/above the unlock cost ever afford this.
//   - Every tick, the instant the last tier reaches that cycle's requirement
//     (getSpeedUpRequirement(speedUpCount): 10 lifetime purchases for the first activation, 20 for
//     the second, 30 for the third, …), "click Speed Up" (speedUpGame) immediately. Unlike
//     Auto-upgrade automation/Smart above, this isn't an optional PP-gated lever being
//     deliberately held fixed — it's a core, always-on mechanic with no PP cost, so always
//     accepting it the moment it's available is the natural "attentive player" behavior this bot
//     otherwise already models for autobuyer unlocks.
//
// Usage:
//   node run-simulation.mjs                      # default PP balances
//   node run-simulation.mjs 0 100 1000 10000      # custom PP balances (space-separated integers)

import {
  buyAutobuyerUnlock,
  buyPrestigeSpeedBonus,
  buyTierQuantity,
  createInitialGameState,
  formatCurrency,
  getSpeedUpRequirement,
  getTierPurchasedCount,
  isProductionFrozen,
  speedUpGame,
  tickGame,
} from '../../../src/game/engine.js'
import { MONEY_ID, TIER_DEFINITIONS } from '../../../src/game/layers.js'

const BUY_QUANTITY = 10 // matches useIncrementalGame's fixed autobuyer/manual-buy batch size
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
    for (const tier of TIER_DEFINITIONS) {
      if (state.autobuyers[tier.id] === null) {
        state = buyAutobuyerUnlock(tier.id)(state)
      }
    }
    if (!state.prestigeSpeedBonusUnlocked) {
      state = buyPrestigeSpeedBonus(state)
    }
    if (getTierPurchasedCount(state, lastTier.id) >= getSpeedUpRequirement(state.speedUpCount ?? 0)) {
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
