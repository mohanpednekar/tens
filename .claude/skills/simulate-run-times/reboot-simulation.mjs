// Reboot-loop simulation (#407/#414): plays careers of repeated Purges with a greedy PP-spend policy
// until the Reboot gate (ERA_ELIGIBILITY_PP unspent PP) is reached, a purge/wall-clock cap hits, or
// money can't reach Googol. Uses the real engine via bot.mjs. Reports a table of sampled Purges:
// cycle length, PP awarded, Compression level, PP balance, and total simulated time.
//
//   node reboot-simulation.mjs [--max-purges N] [--max-seconds S] [--no-hold]
//     --max-purges   stop after N Purges (default 1e9)
//     --max-seconds  wall-clock budget (default 240)
//     --no-hold      Purge the tick Googol is reached (baseline; default holds for excess powers)
//
// PP policy (greedy, fixed order): one-offs (speed bonus, Buy max, Cache Warm, Playtime bonus),
// Compression (Double PP, up to level 97 = cost 1e98 so 1e100 stays reachable), automation interval
// upgrades, then Compute (Flops) tiers cheapest-first; nothing priced above 1e90 except Compression.
// Purge timing (once Overflow mode lets production continue past Googol): optimal-stopping rule —
// Purge when the marginal PP gain per second over the last 30 s drops below this cycle's average PP rate.
// Auto Purge is paused so the bot controls timing. NOT an optimal player; it measures compounding.
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
const maxPurges = arg('--max-purges', 1e9)
const maxSeconds = arg('--max-seconds', 240)
const hold = !argv.includes('--no-hold')
const MAX_COMPRESSION_LEVEL = 97
const MAX_SPEND_PP = 1e90

const buyWhilePossible = (state, buy, limit = 500) => {
  let s = state
  for (let i = 0; i < limit; i += 1) {
    const next = buy(s)
    if (next === s) break
    s = next
  }
  return s
}

// Buys while possible, but discards any single purchase costing more than `cap` PP (null = no cap).
const buyCapped = (state, buy, cap, limit = 500) => {
  let s = state
  for (let i = 0; i < limit; i += 1) {
    const next = buy(s)
    if (next === s) break
    if (cap != null && s.purge.points - next.purge.points > cap) break
    s = next
  }
  return s
}

// Compression is the compounding lever (PP per Purge doubles per level once powers-per-PP is 1), so it gets
// priority AND a savings rule: anything else may only spend up to a tenth of Compression's next price, otherwise
// cheap automation/Flops buys keep draining PP and Compression is never reached.
const actSpendPP = state => {
  let s = state
  s = buyWhilePossible(s, engine.buyPrestigeSpeedBonus, 1)
  s = buyWhilePossible(s, buyBuyMaxUnlock, 1)
  s = buyWhilePossible(s, buyCacheWarm, 1)
  s = buyWhilePossible(s, buyPlaytimeBonus, 1)
  const level = s.prestigeDoublePpLevel ?? 0
  if (level < MAX_COMPRESSION_LEVEL) s = buyWhilePossible(s, buyPrestigeDoublePp, 200)
  if (s.purge.points > MAX_SPEND_PP) return s
  const cap = (s.prestigeDoublePpLevel ?? 0) < MAX_COMPRESSION_LEVEL
    ? engine.getPrestigeDoublePpUpgradeCost(s.prestigeDoublePpLevel ?? 0) / 10
    : null
  for (const key of Object.keys(AUTOMATION_INTERVAL_CONFIG)) {
    s = buyCapped(s, buyAutomationIntervalUpgrade(key), cap, 50)
  }
  for (const flop of COMPUTE_FLOPS_TIER_DEFINITIONS) {
    s = buyCapped(s, buyComputeFlopsTier(flop.id), cap, 50)
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
let lastAwarded = 0
const recent = []

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
  if (!purged && state.resources[MONEY_ID] >= PURGE_THRESHOLD) {
    const money = state.resources[MONEY_ID]
    const pp = getPrestigePointsAwarded(money, state.prestigeDoublePpLevel ?? 0, engine.isOverflowModeUnlocked(state))
    recent.push(pp)
    if (recent.length > 31) recent.shift()
    const marginal = recent.length > 1 ? (pp - recent[0]) / (recent.length - 1) : Infinity
    const average = pp / Math.max(1, cycleTicks)
    const overflow = engine.isOverflowModeUnlocked(state)
    if (!hold || !overflow || engine.isProductionFrozen(state) || marginal < average) {
      state = purgeGame(state)
      purged = state.purge.count > countBefore
      if (purged) {
        if (hold) state = engine.setAutoPurgeEnabled(false)(state)
        lastAwarded = pp
        recent.length = 0
      }
    }
  }
  if (purged) {
    purges += 1
    const n = purges
    const mantissa = n / 10 ** Math.floor(Math.log10(n))
    if (mantissa === 1 || mantissa === 2 || mantissa === 5) {
      rows.push({ n, cycleTicks, awarded: lastAwarded, level: state.prestigeDoublePpLevel ?? 0, pp: state.purge.points, totalTicks })
    }
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
