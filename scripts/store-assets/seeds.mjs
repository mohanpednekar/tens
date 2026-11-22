// Realistic store-screenshot saves: every seed is a real playthrough by the simulate-run-times bot
// (an attentive player driving the actual engine, one 1 s tick at a time) — nothing is hand-set
// except, for the achievements scene, un-earning one achievement whose condition still holds so the
// game itself raises its unlock toast on the first tick after load.
import { BUY_QUANTITY, actPlayer, seedState } from '../../.claude/skills/simulate-run-times/bot.mjs'
import { isAchievementConditionMet, isProductionFrozen, purgeGame, tickGame } from '../../src/game/engine.js'
import { ACHIEVEMENT_DEFINITIONS } from '../../src/game/layers.js'

// ~50 minutes into a brand-new save: past the one-time Foundry gate, first pool and disks running.
export const FOUNDRY_SNAPSHOT_SECONDS = 3000
// A few days in: several Purges done, Firmware and automation unlocked.
export const CAREER_PURGES = 5

const step = state => tickGame(1, BUY_QUANTITY)(actPlayer(state))
const earnedIds = state => Object.keys(state.achievements?.earned ?? {}).filter(id => state.achievements.earned[id])
const tiersOwned = state => Object.values(state.owned).filter(count => count > 0).length
const withSchema = state => ({ saveSchemaVersion: 3, ...state })

export const playFreshSave = seconds => {
  let state = seedState()
  for (let tick = 0; tick < seconds; tick++) state = step(state)
  return withSchema(state)
}

// Plays from a fresh save through `purges` Purges, checkpointing the following cycle every
// CHECKPOINT_SECONDS. Scale Up / Overclock reset the ladder many times per cycle, so a fixed time
// often lands on a near-empty Factory; instead pick the real checkpoint with the most tiers on
// screen that is still well clear of the Googol freeze (latest such one). Also returns the
// achievement ids in the order they were earned.
const CHECKPOINT_SECONDS = 600
const FREEZE_MARGIN_BITS = 1e95

export const playCareer = (purges = CAREER_PURGES) => {
  let state = seedState()
  const earnedOrder = []
  const seen = new Set(earnedIds(state))
  const checkpoints = []
  for (;;) {
    state = step(state)
    for (const id of earnedIds(state)) if (!seen.has(id)) { seen.add(id); earnedOrder.push(id) }
    if (isProductionFrozen(state)) {
      if (state.purge.count >= purges) break
      state = purgeGame(state)
      continue
    }
    if (state.purge.count === purges) {
      checkpoints.tick = (checkpoints.tick ?? 0) + 1
      if (checkpoints.tick % CHECKPOINT_SECONDS === 0) checkpoints.push(state)
    }
  }
  const chosen = checkpoints
    .filter(checkpoint => checkpoint.resources.base < FREEZE_MARGIN_BITS)
    .reduce((best, checkpoint) => (!best || tiersOwned(checkpoint) >= tiersOwned(best) ? checkpoint : best), null)
  return { state: withSchema(chosen), earnedOrder: earnedOrder.filter(id => chosen.achievements?.earned?.[id]) }
}

// The most recently earned achievement that the saved state still qualifies for, un-earned: the
// app re-detects it on its first tick and shows the real unlock toast.
export const withPendingAchievement = ({ state, earnedOrder }) => {
  const byId = Object.fromEntries(ACHIEVEMENT_DEFINITIONS.map(def => [def.id, def]))
  const id = [...earnedOrder].reverse().find(candidate => byId[candidate] && isAchievementConditionMet(state, byId[candidate].condition))
  if (!id) return state
  const earned = { ...state.achievements.earned }
  delete earned[id]
  return { ...state, achievements: { ...state.achievements, earned } }
}

export const buildSeeds = () => {
  const career = playCareer()
  return {
    foundry: playFreshSave(FOUNDRY_SNAPSHOT_SECONDS),
    career: career.state,
    achievementUnlock: withPendingAchievement(career),
  }
}
