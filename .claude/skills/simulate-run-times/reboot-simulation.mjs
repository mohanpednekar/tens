// Reboot-loop simulation (#407/#414): plays careers of repeated Purges with a greedy PP-spend policy
// until the Reboot gate (ERA_ELIGIBILITY_PP unspent PP) is reached, a purge/wall-clock cap hits, or
// money can't reach Googol. Uses the real engine via bot.mjs. Reports a table of sampled Purges:
// cycle length, PP awarded, Compression level, PP balance, and total simulated time.
//
//   node reboot-simulation.mjs [--max-purges N] [--max-seconds S] [--sample K] [--hold]
//     --max-purges   stop after N Purges (default 200)
//     --max-seconds  wall-clock budget (default 240)
//     --sample       print every Kth Purge (default 10)
//     --hold         Purge only after the Googol freeze/threshold (default: Purge the tick it is reached)
//
// PP policy (greedy, fixed order): one-off unlocks (speed bonus, Buy max, Cache Warm, Playtime bonus),
// automation interval upgrades, Compression (Double PP), then Compute (Flops) tiers cheapest-first.
// NOT optimal — it exists to measure how cycle time compounds, not to prescribe play.
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
register('./ext-loader.mjs', pathToFileURL('./'))

const engine = await import('../../../src/game/engine.js')
const layers = await import('../../../src/game/layers.js')
const bot = await import('./bot.mjs')

const {
  buyAutomationIntervalUpgrade, buyBuyMaxUnlock, buyCacheWarm, buyComputeFlopsTier, buyPlaytimeBonus,
  buyPrestigeDoublePp, getPrestigePointsAwarded, isEraEligible, purgeGame, tickGame,
} = engine
const { AUTOMATION_INTERVAL_CONFIG, COMPUTE_FLOPS_TIER_DEFINITIONS, MONEY_ID, PURGE_THRESHOLD } = layers
const { actPlayer, BUY_QUANTITY, seedState } = bot

const argv = process.argv.slice(2)
const arg = (name, fallback) => {
  const i = argv.indexOf(name)
  return i >= 0 ? Number(argv[i + 1]) : fallback
}
const maxPurges = arg('--max-purges', 200)
const maxSeconds = arg('--max-seconds', 240)
const sampleEvery = arg('--sample', 10)
const hold = argv.includes('--hold')

const buyWhilePossible = (state, buy, limit = 500) => {
  let s = state
  for (let i = 0; i < limit; i += 1) {
    const next = buy(s)
    if (next === s) break
    s = next
  }
  return s
}

const actSpendPP = state => {
  let s = state
  s = buyWhilePossible(s, engine.buyPrestigeSpeedBonus, 1)
  s = buyWhilePossible(s, buyBuyMaxUnlock, 1)
  s = buyWhilePossible(s, buyCacheWarm, 1)
  s = buyWhilePossible(s, buyPlaytimeBonus, 1)
  for (const key of Object.keys(AUTOMATION_INTERVAL_CONFIG)) {
    s = buyWhilePossible(s, buyAutomationIntervalUpgrade(key), 50)
  }
  s = buyWhilePossible(s, buyPrestigeDoublePp, 200)
  for (const flop of COMPUTE_FLOPS_TIER_DEFINITIONS) {
    s = buyWhilePossible(s, buyComputeFlopsTier(flop.id), 50)
  }
  return s
}

const formatDuration = ticks => {
  const d = Math.floor(ticks / 86400)
  const h = Math.floor((ticks % 86400) / 3600)
  const m = Math.floor((ticks % 3600) / 60)
  const sec = Math.floor(ticks % 60)
  return [d && `${d}d`, (d || h) && `${h}h`, (d || h || m) && `${m}m`, `${sec}s`].filter(Boolean).join(' ')
}

const started = Date.now()
let state = seedState({ purgeCount: 0, startingPP: 0 })
let totalTicks = 0
let cycleTicks = 0
let purges = 0
const rows = []
let stopReason = 'max purges'

while (purges < maxPurges) {
  if (isEraEligible(state)) { stopReason = 'Reboot eligible'; break }
  if ((Date.now() - started) / 1000 > maxSeconds) { stopReason = 'wall-clock budget'; break }
  if (cycleTicks > 5_000_000) { stopReason = 'cycle tick cap'; break }

  state = actSpendPP(actPlayer(state))
  const countBefore = state.purge.count
  state = tickGame(1, BUY_QUANTITY)(state)
  totalTicks += 1
  cycleTicks += 1

  let purged = state.purge.count > countBefore // Auto Purge fired inside the tick
  if (!purged && state.resources[MONEY_ID] >= PURGE_THRESHOLD && (!hold || engine.isProductionFrozen(state))) {
    const awarded = getPrestigePointsAwarded(state.resources[MONEY_ID], state.prestigeDoublePpLevel ?? 0)
    state = purgeGame(state)
    purged = state.purge.count > countBefore
    if (purged && (state.purge.count % sampleEvery === 0 || state.purge.count === 1)) {
      rows.push({ n: state.purge.count, cycleTicks, awarded, level: state.prestigeDoublePpLevel ?? 0, pp: state.purge.points, totalTicks })
    }
  }
  if (purged) {
    purges += 1
    cycleTicks = 0
  }
}

console.log('## Reboot-loop simulation (greedy PP policy)\n')
console.log('| Purge # | Cycle length | PP awarded | Compression level | PP balance | Elapsed total |')
console.log('|---|---|---|---|---|---|')
for (const r of rows) {
  console.log(`| ${r.n} | ${formatDuration(r.cycleTicks)} | ${r.awarded.toExponential(2)} | ${r.level} | ${r.pp.toExponential(2)} | ${formatDuration(r.totalTicks)} |`)
}
console.log(`\nStopped: **${stopReason}** after ${purges} Purges, ${formatDuration(totalTicks)} simulated, ${((Date.now() - started) / 1000).toFixed(0)} s wall-clock. PP now ${state.purge.points.toExponential(2)} (Reboot needs 1e100).`)
