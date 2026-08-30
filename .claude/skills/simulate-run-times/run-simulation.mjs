// Simulates full playthroughs of Tens using the real, pure functions in src/game/engine.js and
// src/game/layers.js — not a reimplementation — so results always reflect the actual current game
// rules.
//
// Bot strategy (ideal attentive player, held constant across runs):
//   Foundry (every tick):
//     - Tap Memory when not full; Combine into a Byte when affordable.
//     - While mainGameUnlocked is false: pause every unlocked tier autobuyer (so
//       tickDiskAutoRedeem cannot advance tier01's cost), skip Disk Fill/Build, Invest/Sacrifice
//       as gated, and convert Memory → Kilobytes until the gate opens. Redeeming permanent full
//       Disks before that convert advances purchase levels without flipping mainGameUnlocked and
//       softlocks once conversion cost exceeds capacity.
//     - After unlock: restore autobuyers; Disk Fill → Invest → Disk Build → queue Capacity when
//       Invest can't take the next spend (fires on full Memory, erases Compute tokens, then
//       Sacrifices) → convert → redeem again if convert unlocked a waiting disk → Data Lake
//       Booster buys (startBoosterTransfer; deposits via tickDiskAutoDeposit; skipped while Disk
//       Fill is available) → Boosts. Never enable permanent auto-merge.
//   Main ladder (every tick):
//     - Autobuyers wherever applicable: unlocked tiers (autobuyers[tierId] non-null from
//       applyAutobuyerMilestones / prestige.count) are left to tickGame's autobuyer loop with the
//       real BUY_QUANTITY = Number.MAX_SAFE_INTEGER batch — matching useIncrementalGame.js.
//     - Manual buyTierQuantity on any tier with no autobuyer, OR whose autobuyer would stall this
//       tick (affordable > 0 but less than the full cost-block batch the autobuyer waits for).
//     - Buy the Money-funded global tickspeed multiplier and each tier's own tickspeed multiplier
//       whenever affordable; dump run XP into the last tier's XP-funded tickspeed when the min
//       consumption gate allows.
//     - Soft resets: Overclock first when eligible, then Speed Up (empirically faster to Googol
//       than Speed-Up-first or either alone — Overclock permanently boosts global tickspeed's
//       per-level step; Speed Up still rebuilds its 2^n multiplier afterward).
//     - Unlock the passive PP speed bonus the instant PRESTIGE_SPEED_BONUS_UNLOCK_COST is banked.
//       Other PP automations (Smart / Auto-Speed-Up / Auto-Prestige / tickspeed autobuyer) are NOT
//       bought — those are separate levers; this bot isolates Foundry + ladder + free/Money/XP
//       tickspeed + prestige-count autobuyer milestones.
//   Cycle end: loop exits the instant isProductionFrozen (Money ≥ PRESTIGE_THRESHOLD). Career mode
//   then calls prestigeGame (permanent Foundry carry + applyAutobuyerMilestones) and continues.
//
// Usage:
//   node run-simulation.mjs                         # career table (prestiges 0..10) + PP sweep
//   node run-simulation.mjs --pp 0 100 10000         # PP sweep only (fresh prestige.count = 0)
//   node run-simulation.mjs --career 0 5 10          # career cycles at those prestige counts
//   node run-simulation.mjs --capacity-cap           # default early-stop floor/hard cap/unlimited sweep
//   node run-simulation.mjs --capacity-cap 4194304 8388608 unlimited
//   node run-simulation.mjs --strategy-out /tmp/run.md
//   node run-simulation.mjs --pp 0 --strategy-out ./runs/2026-03-21T120000Z-abc1234.md

import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import {
  activateComputeBoost,
  applyAutobuyerMilestones,
  buyGlobalTickspeedMultiplier,
  buyPrestigeSpeedBonus,
  buyTierQuantity,
  buyTickspeedMultiplier,
  canActivateComputeBoost,
  canStartBoosterTransfer,
  combineIntroByte,
  consumeXpForLastTierTickspeed,
  convertIntroBitsToKilobytes,
  createInitialGameState,
  formatCurrency,
  getLastTierXpTickspeedMinConsumption,
  getOverclockRequirement,
  getPurchaseBlockSize,
  getSpeedUpRequirement,
  getTierAffordableQuantity,
  getTierBulkQuantity,
  getTierSpendableAmount,
  isBandwidthAvailable,
  isDiskFillAvailable,
  isDiskRedeemable,
  isProductionFrozen,
  isTierUnlocked,
  overclockGame,
  pickIntroCapacityMilestone,
  pickIntroProductionMilestone,
  prestigeGame,
  queueIntroCapacityUpgrade,
  redeemDisk,
  setAutobuyerEnabled,
  speedUpGame,
  stackComputeBoost,
  startBoosterTransfer,
  provisionDisk,
  tapIntroBit,
  tickGame,
  tickQueuedCapacityUpgrade,
} from '../../../src/game/engine.js'
import {
  COMPUTE_BOOST_PRESETS,
  COMPUTE_BOOST_TIER_FIELDS,
  DATA_LAKE_TIER_COUNT,
  INTRO_CAPACITY_CAP_BITS,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  INTRO_CONVERSION_UNLOCK_CAPACITY,
  MONEY_ID,
  PRESTIGE_SPEED_BONUS_UNLOCK_COST,
  TIER_DEFINITIONS,
} from '../../../src/game/layers.js'

// Matches useIncrementalGame.js — "buy as many as fit the current cost-block".
const BUY_QUANTITY = Number.MAX_SAFE_INTEGER
const MAX_TICKS = 5_000_000
const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]

// Memory display uses BITS_PER_BYTE × 1000^n (B/KB/MB/…) — same as formatBitsInNearestUnit.
// Default capacity-cap sweep: freeze Sacrifice at these bit values (plus unlimited growth). Pool 1's
// generator has a hard ceiling (INTRO_CAPACITY_CAP_BITS) that real Sacrifice can never grow past —
// so a sweep point at or above that hard cap behaves identically to `unlimited`. Under Data Lakes,
// higher capacity unlocks larger Disk arrays → more lake deposits → more Booster purchases; early
// stop at the Compute-unlock floor is Storage-poor (fewer disks/cores), not "Compute-favoring".
const DEFAULT_CAPACITY_CAPS_BITS = [
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, // stop early at the Compute-unlock floor (Storage-poor)
  INTRO_CAPACITY_CAP_BITS, // grow to pool 1's hard cap (Storage-rich, == unlimited)
  null, // unlimited — same result as the hard cap under real Sacrifice
]

function formatCapacityLabel(capacityBits) {
  if (capacityBits == null) return 'unlimited'
  const bytes = capacityBits / 8
  if (bytes >= 1e9) return `${bytes / 1e9} GB (${capacityBits} bits)`
  if (bytes >= 1e6) return `${bytes / 1e6} MB (${capacityBits} bits)`
  if (bytes >= 1e3) return `${bytes / 1e3} KB (${capacityBits} bits)`
  return `${capacityBits} bits`
}

function totalDisksBuilt(intro) {
  return Object.values(intro?.disksBuiltTotal ?? {}).reduce((sum, n) => sum + (n ?? 0), 0)
}

function actFoundry(state, { capacityCapBits = null } = {}) {
  let s = state

  s = tapIntroBit(s)
  s = combineIntroByte(s)

  const canGrowCapacity =
    capacityCapBits == null || (s.intro?.capacity ?? 0) < capacityCapBits

  // Convert FIRST while the gate is still closed. Full permanent Disks carried across Prestige are
  // redeemable immediately at tier01's fresh level-1 cost — redeeming them (manual Disk Fill or
  // tickDiskAutoRedeem once that tier's autobuyer is live) advances purchase levels / conversion
  // cost without ever flipping mainGameUnlocked (only convertIntroBitsToKilobytes does). Once
  // cost exceeds Memory capacity, the gate softlocks. Pause every unlocked autobuyer during the
  // gate so auto-redeem can't fire, unlock via Memory transfer, then re-enable.
  if (!s.intro?.mainGameUnlocked) {
    for (const tier of TIER_DEFINITIONS) {
      if ((s.autobuyers?.[tier.id] ?? null) !== null) {
        s = setAutobuyerEnabled(tier.id, false)(s)
      }
    }
    for (let i = 0; i < 64; i += 1) {
      const next = convertIntroBitsToKilobytes(s)
      if (next === s) break
      s = next
    }
    s = pickIntroProductionMilestone(s)
    if (
      canGrowCapacity &&
      !(s.intro.capacityUpgradeQueued ?? false) &&
      s.intro.bits < s.intro.capacity &&
      (!isBandwidthAvailable(s) || s.intro.capacity < INTRO_CONVERSION_UNLOCK_CAPACITY)
    ) {
      s = queueIntroCapacityUpgrade(s)
    }
    s = tickQueuedCapacityUpgrade(s)
    if (canGrowCapacity && !(s.intro.capacityUpgradeQueued ?? false)) {
      s = pickIntroCapacityMilestone(s)
    }
    for (let i = 0; i < 64; i += 1) {
      const next = convertIntroBitsToKilobytes(s)
      if (next === s) break
      s = next
    }
    return s
  }

  // Gate just opened (or already open): restore autobuyers the gate pause may have disabled.
  for (const tier of TIER_DEFINITIONS) {
    if ((s.autobuyers?.[tier.id] ?? null) !== null && !(s.autobuyersEnabled?.[tier.id] ?? true)) {
      s = setAutobuyerEnabled(tier.id, true)(s)
    }
  }

  for (const size of Object.keys(s.intro?.disks ?? {}).map(Number)) {
    if ((s.intro.disks[size] ?? 0) > 0 && isDiskRedeemable(s, size)) {
      s = redeemDisk(size)(s)
    }
  }

  s = pickIntroProductionMilestone(s)
  s = provisionDisk(s)

  // Queue Capacity before the bar is full when Invest can't take the next Memory spend (or while
  // still climbing to the conversion unlock) — tickQueuedCapacityUpgrade / tickGame then fires it
  // on full Memory, erasing all Compute tokens as the queued-Sacrifice penalty.
  // Under a capacity cap, stop queueing/Sacrificing once the cap is reached so Disk ladder size
  // (and thus Data Lake deposit throughput) stays fixed for the Storage vs Compute tradeoff sweep.
  if (
    canGrowCapacity &&
    !(s.intro.capacityUpgradeQueued ?? false) &&
    s.intro.bits < s.intro.capacity &&
    (!isBandwidthAvailable(s) || s.intro.capacity < INTRO_CONVERSION_UNLOCK_CAPACITY)
  ) {
    s = queueIntroCapacityUpgrade(s)
  }
  s = tickQueuedCapacityUpgrade(s)

  for (let i = 0; i < 64; i += 1) {
    const next = convertIntroBitsToKilobytes(s)
    if (next === s) break
    s = next
  }

  // Convert can advance tier01 onto a waiting disk's required level — redeem again before
  // any Booster buy so Disk Fill keeps priority over live lake funding (planLiveDiskFunding
  // does not skip redeemable sizes the way tickDiskAutoDeposit does).
  for (const size of Object.keys(s.intro?.disks ?? {}).map(Number)) {
    if ((s.intro.disks[size] ?? 0) > 0 && isDiskRedeemable(s, size)) {
      s = redeemDisk(size)(s)
    }
  }

  // Optional manual Capacity only when not relying on a queue (queue path already handled above).
  if (canGrowCapacity && !(s.intro.capacityUpgradeQueued ?? false)) {
    s = pickIntroCapacityMilestone(s)
  }

  // Data Lake → Booster buys (replaces the removed Memory→Core claim). Deposits land via
  // tickDiskAutoDeposit inside tickGame; buy before activating Boosts so an instant
  // deposit-funded Core can fund a Boost the same tick. Prefer lower tiers first (Cores).
  // Skip while Disk Fill is available — same Fill-over-Compute priority the old Core-claim
  // path enforced (live transfers can otherwise empty a just-redeemable disk).
  for (let i = 0; i < 16; i += 1) {
    if (isDiskFillAvailable(s)) break
    let bought = false
    for (let tierIndex = 1; tierIndex <= DATA_LAKE_TIER_COUNT; tierIndex += 1) {
      if (canStartBoosterTransfer(s, tierIndex)) {
        const next = startBoosterTransfer(tierIndex)(s)
        if (next !== s) {
          s = next
          bought = true
          break
        }
      }
    }
    if (!bought) break
  }

  // Compute Boosts spend held tokens, not Memory.
  if ((s.intro.computeBoostType ?? null) !== null) {
    s = stackComputeBoost(s)
  } else {
    for (let tierIndex = COMPUTE_BOOST_TIER_FIELDS.length; tierIndex >= 1; tierIndex -= 1) {
      if (canActivateComputeBoost(s, 'burst', tierIndex)) {
        s = activateComputeBoost('burst', tierIndex)(s)
        break
      }
    }
    if ((s.intro.computeBoostType ?? null) === null) {
      for (const boostType of Object.keys(COMPUTE_BOOST_PRESETS)) {
        for (let tierIndex = COMPUTE_BOOST_TIER_FIELDS.length; tierIndex >= 1; tierIndex -= 1) {
          if (canActivateComputeBoost(s, boostType, tierIndex)) {
            s = activateComputeBoost(boostType, tierIndex)(s)
            break
          }
        }
        if ((s.intro.computeBoostType ?? null) !== null) break
      }
    }
  }

  return s
}

function wouldAutobuyerStall(state, tier) {
  const level = state.autobuyers?.[tier.id] ?? null
  if (level === null) return false
  if (!(state.autobuyersEnabled?.[tier.id] ?? true)) return true
  if (!isTierUnlocked(state)(tier)) return false

  const tierLevel = state.purchaseLevels?.[tier.id] ?? 1
  const levelProgress = state.purchaseLevelProgress?.[tier.id] ?? 0
  const blockSize = getPurchaseBlockSize(state)
  const effectiveBatchSize = state.smartAutobuyer?.[tier.id] && tierLevel === 1 ? 1 : BUY_QUANTITY
  const blockMax = getTierBulkQuantity(blockSize, levelProgress, effectiveBatchSize)
  if (blockMax <= 0) return false
  const affordable = getTierAffordableQuantity(
    tier,
    tierLevel,
    blockSize,
    levelProgress,
    getTierSpendableAmount(state, tier),
    effectiveBatchSize,
  )
  return affordable > 0 && affordable < blockMax
}

function actMainBuys(state) {
  let s = state
  for (const tier of [...TIER_DEFINITIONS].reverse()) {
    const hasAutobuyer = (s.autobuyers?.[tier.id] ?? null) !== null && (s.autobuyersEnabled?.[tier.id] ?? true)
    if (!hasAutobuyer || wouldAutobuyerStall(s, tier)) {
      s = buyTierQuantity(tier.id, BUY_QUANTITY)(s)
    }
  }
  return s
}

function actTickspeed(state) {
  let s = state
  for (let i = 0; i < 200; i += 1) {
    const next = buyGlobalTickspeedMultiplier(s)
    if (next === s) break
    s = next
  }
  for (const tier of TIER_DEFINITIONS) {
    for (let i = 0; i < 50; i += 1) {
      const next = buyTickspeedMultiplier(tier.id)(s)
      if (next === s) break
      s = next
    }
  }
  const xp = s.prestige?.xp ?? 0
  if (xp > 0) {
    const min = getLastTierXpTickspeedMinConsumption(s.lastTierXpConsumed ?? 0)
    if (xp >= min) s = consumeXpForLastTierTickspeed(xp)(s)
  }
  return s
}

function actSoftResets(state) {
  let s = state
  // Overclock-first empirically reaches Googol faster than Speed-Up-first (see skill header).
  if ((s.purchaseLevels?.[lastTier.id] ?? 1) >= getOverclockRequirement(s.overclockCount ?? 0)) {
    s = overclockGame(s)
  }
  if ((s.purchaseLevels?.[lastTier.id] ?? 1) >= getSpeedUpRequirement(s.speedUpCount ?? 0)) {
    s = speedUpGame(s)
  }
  return s
}

function actSpeedBonus(state) {
  if (!state.prestigeSpeedBonusUnlocked && (state.prestige?.points ?? 0) >= PRESTIGE_SPEED_BONUS_UNLOCK_COST) {
    return buyPrestigeSpeedBonus(state)
  }
  return state
}

function actPlayer(state, options = {}) {
  return actSoftResets(actSpeedBonus(actTickspeed(actMainBuys(actFoundry(state, options)))))
}

function countUnlockedAutobuyers(state) {
  return TIER_DEFINITIONS.filter(t => (state.autobuyers?.[t.id] ?? null) !== null).length
}

function simulateCycle(startingState, { maxTicks = MAX_TICKS, capacityCapBits = null } = {}) {
  let state = startingState
  let ticks = 0
  let foundryTicks = null
  let speedUpsAtStart = state.speedUpCount ?? 0
  let overclocksAtStart = state.overclockCount ?? 0
  const options = { capacityCapBits }

  const startedUnlocked = Boolean(state.intro?.mainGameUnlocked)

  while (!isProductionFrozen(state)) {
    if (ticks >= maxTicks) {
      return {
        ticks,
        foundryTicks: foundryTicks ?? (startedUnlocked ? 0 : ticks),
        mainTicks: foundryTicks == null ? (startedUnlocked ? ticks : 0) : ticks - foundryTicks,
        reached: false,
        finalMoney: state.resources[MONEY_ID],
        speedUps: (state.speedUpCount ?? 0) - speedUpsAtStart,
        overclock: (state.overclockCount ?? 0) - overclocksAtStart,
        speedBonusUnlocked: Boolean(state.prestigeSpeedBonusUnlocked),
        autobuyers: countUnlockedAutobuyers(state),
        capacity: state.intro?.capacity ?? 0,
        coresEver: state.intro?.computeCoresEverEarned ?? 0,
        disksBuilt: totalDisksBuilt(state.intro),
        state,
      }
    }

    state = actPlayer(state, options)
    if (!startedUnlocked && foundryTicks == null && state.intro?.mainGameUnlocked) {
      foundryTicks = ticks + 1
    }

    state = tickGame(1, BUY_QUANTITY)(state)
    ticks += 1

    if (!startedUnlocked && foundryTicks == null && state.intro?.mainGameUnlocked) {
      foundryTicks = ticks
    }
  }

  const foundry = foundryTicks ?? (startedUnlocked ? 0 : ticks)
  return {
    ticks,
    foundryTicks: foundry,
    mainTicks: Math.max(0, ticks - foundry),
    reached: true,
    finalMoney: state.resources[MONEY_ID],
    speedUps: (state.speedUpCount ?? 0) - speedUpsAtStart,
    overclock: (state.overclockCount ?? 0) - overclocksAtStart,
    speedBonusUnlocked: Boolean(state.prestigeSpeedBonusUnlocked),
    autobuyers: countUnlockedAutobuyers(state),
    capacity: state.intro?.capacity ?? 0,
    coresEver: state.intro?.computeCoresEverEarned ?? 0,
    disksBuilt: totalDisksBuilt(state.intro),
    state,
  }
}

function seedState({ prestigeCount = 0, startingPP = 0 } = {}) {
  let state = createInitialGameState()
  state = {
    ...state,
    prestige: {
      ...state.prestige,
      count: prestigeCount,
      points: startingPP,
    },
  }
  return applyAutobuyerMilestones(state)
}

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

function parseArgs(argv) {
  const pp = []
  const career = []
  const capacityCaps = []
  let strategyOut = null
  let mode = null
  let runCapacitySweep = false
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--pp') {
      mode = 'pp'
      continue
    }
    if (arg === '--career') {
      mode = 'career'
      continue
    }
    if (arg === '--capacity-cap' || arg === '--capacity-caps') {
      mode = 'capacity'
      runCapacitySweep = true
      continue
    }
    if (arg === '--strategy-out') {
      strategyOut = argv[i + 1] ?? null
      i += 1
      mode = null
      continue
    }
    if (mode === 'capacity') {
      if (arg === 'unlimited' || arg === 'grow' || arg === 'null') {
        capacityCaps.push(null)
        continue
      }
      const n = Number(arg)
      if (Number.isFinite(n) && n > 0) capacityCaps.push(n)
      continue
    }
    const n = Number(arg)
    if (!Number.isFinite(n) || n < 0) continue
    if (mode === 'career') career.push(Math.floor(n))
    else if (mode === 'pp') pp.push(n)
    else pp.push(n)
  }
  return { pp, career, capacityCaps, runCapacitySweep, strategyOut }
}

const defaultPPValues = [0, 10, 25, 50, 100, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000]
const defaultCareerPrestiges = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const {
  pp: cliPP,
  career: cliCareer,
  capacityCaps: cliCapacityCaps,
  runCapacitySweep,
  strategyOut,
} = parseArgs(process.argv.slice(2))

// Capacity-cap mode is exclusive of the default career+PP tables unless those flags are also set.
const onlyCapacity = runCapacitySweep && cliPP.length === 0 && cliCareer.length === 0
const runPP = !onlyCapacity && (cliPP.length > 0 || (cliPP.length === 0 && cliCareer.length === 0 && !runCapacitySweep))
const runCareer = !onlyCapacity && (cliCareer.length > 0 || (cliPP.length === 0 && cliCareer.length === 0 && !runCapacitySweep))
const ppValues = cliPP.length > 0 ? cliPP : defaultPPValues
const careerTargets = cliCareer.length > 0 ? cliCareer : defaultCareerPrestiges
const capacityCapValues = cliCapacityCaps.length > 0 ? cliCapacityCaps : DEFAULT_CAPACITY_CAPS_BITS

const outputLines = []
function emit(line = '') {
  outputLines.push(line)
  console.log(line)
}

function printCycleRow(labelCols, result) {
  const durationCell = result.reached ? formatDuration(result.ticks) : `${formatDuration(result.ticks)} (capped)`
  const foundryCell = formatDuration(result.foundryTicks)
  const mainCell = result.reached || result.mainTicks > 0 ? formatDuration(result.mainTicks) : '—'
  const moneyCell = result.reached ? formatCurrency(result.finalMoney) : 'not reached'
  emit(
    `| ${labelCols.join(' | ')} | ${foundryCell} | ${mainCell} | ${durationCell} | ${result.autobuyers} | ${result.speedUps} | ${result.overclock} | ${moneyCell} |`,
  )
}

let freshTotal = null
let freshFoundry = null
let capacityWinner = null

if (runCapacitySweep || onlyCapacity) {
  emit('## Memory capacity-cap sweep (Storage vs Compute)')
  emit('')
  emit(
    'Freeze Sacrifice once Memory capacity reaches each listed bit value (climb normally until then).',
  )
  emit(
    'Higher caps unlock larger Disk arrays → more Data Lake deposits → more Booster purchases',
  )
  emit(
    '(Cores/Nodes/…). Early stop is Storage-poor under Data Lakes. `unlimited` matches the hard-cap baseline.',
  )
  emit('')
  emit(
    '| Capacity cap | End capacity | Foundry | Main → Googol | Total | Cores ever | Disks built | Speed Ups | Overclock Δ | Money at Googol |',
  )
  emit('|---|---|---|---|---|---|---|---|---|---|')

  let bestTicks = Infinity
  for (const cap of capacityCapValues) {
    const result = simulateCycle(seedState({ prestigeCount: 0, startingPP: 0 }), {
      capacityCapBits: cap,
    })
    const durationCell = result.reached
      ? formatDuration(result.ticks)
      : `${formatDuration(result.ticks)} (capped)`
    emit(
      `| ${formatCapacityLabel(cap)} | ${formatCapacityLabel(result.capacity)} | ${formatDuration(result.foundryTicks)} | ${formatDuration(result.mainTicks)} | ${durationCell} | ${result.coresEver} | ${result.disksBuilt} | ${result.speedUps} | ${result.overclock} | ${result.reached ? formatCurrency(result.finalMoney) : 'not reached'} |`,
    )
    if (result.reached && result.ticks < bestTicks) {
      bestTicks = result.ticks
      capacityWinner = formatCapacityLabel(cap)
    }
  }
  if (capacityWinner) {
    emit('')
    emit(`Fastest to Googol in this sweep: **${capacityWinner}**.`)
  }
  emit('')
}

if (runCareer) {
  emit('## Career cycles (fresh start → prestige N, permanent Foundry carry)')
  emit('')
  emit(
    '| After prestiges | Starting PP (banked) | Foundry | Main → Googol | Total cycle | Autobuyers | Speed Ups | Overclock Δ | Money at Googol |',
  )
  emit('|---|---|---|---|---|---|---|---|---|')

  let state = seedState({ prestigeCount: 0, startingPP: 0 })
  let nextTargetIndex = 0
  const targets = [...new Set(careerTargets)].sort((a, b) => a - b)

  while (nextTargetIndex < targets.length) {
    const countAtStart = state.prestige.count
    const ppAtStart = state.prestige.points
    const result = simulateCycle(state)

    if (countAtStart === 0) {
      freshTotal = result.reached ? formatDuration(result.ticks) : `${formatDuration(result.ticks)} (capped)`
      freshFoundry = formatDuration(result.foundryTicks)
    }

    while (nextTargetIndex < targets.length && targets[nextTargetIndex] === countAtStart) {
      printCycleRow([String(countAtStart), String(ppAtStart)], result)
      nextTargetIndex += 1
    }

    if (!result.reached) {
      emit('')
      emit(`Stopped early: cycle at prestige.count=${countAtStart} hit the ${MAX_TICKS.toLocaleString()}-tick cap.`)
      break
    }

    if (nextTargetIndex >= targets.length) break

    state = prestigeGame(result.state)
    if (state.prestige.count <= countAtStart) {
      emit('')
      emit('Stopped early: prestigeGame did not increment prestige.count.')
      break
    }
  }
  emit('')
}

if (runPP) {
  emit('## PP sweep (fresh prestige.count = 0 — no tier autobuyers; manual buys unstall)')
  emit('')
  emit(
    '| PP balance | Speed bonus | Foundry | Main → Googol | Total | Autobuyers | Speed Ups | Overclock Δ | Money at Googol |',
  )
  emit('|---|---|---|---|---|---|---|---|---|')
  for (const pp of ppValues) {
    const result = simulateCycle(seedState({ prestigeCount: 0, startingPP: pp }))
    const remainingPP = result.state.prestige.points
    const bonusCell = result.speedBonusUnlocked
      ? `+${remainingPP}% (spent ${PRESTIGE_SPEED_BONUS_UNLOCK_COST} to unlock)`
      : 'locked'
    printCycleRow([String(pp), bonusCell], result)
  }
}

if (strategyOut) {
  let engineSha = 'unknown'
  try {
    engineSha = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch {
    /* non-git context */
  }
  const now = new Date().toISOString()
  const resultsBody = outputLines.join('\n')
  const headline = capacityWinner
    ? `Capacity-cap sweep fastest: **${capacityWinner}**.${freshTotal ? ` Fresh unlimited cycle: **${freshTotal}** (Foundry **${freshFoundry}**).` : ''}`
    : freshTotal
      ? `Fresh ideal prestige cycle: **${freshTotal}** (Foundry **${freshFoundry}**).`
      : 'See tables below.'

  // Each publish is a standalone snapshot (one file per run on orphan branch
  // `ideal-run-strategy`). No append / run-log — history is the runs/ directory.
  const strategyDoc = `# Tens ideal run strategy

Snapshot on orphan branch \`ideal-run-strategy\` (\`runs/<UTC-stamp>-<sha>.md\`).
Published by \`publish-strategy.sh\` — **do not merge** that branch into \`main\`.

- Run at (UTC): ${now}
- Engine / skill commit: \`${engineSha}\`
- ${headline}

## Winning bot strategy

Ideal attentive player (authoritative detail: \`.claude/skills/simulate-run-times/SKILL.md\` on the code branches):

1. **Foundry gate:** Tap / Combine; pause tier autobuyers while gated; convert Memory → Kilobytes before redeeming permanent Disks (avoids softlock).
2. **After unlock:** Disk Fill → Invest → Disk Build → **queue Capacity** when Invest cannot take the next spend (or while climbing to conversion unlock) → queued fire erases Compute tokens then Sacrifices → convert → redeem again if convert unlocked a waiting disk → **Data Lake Booster buys** (\`startBoosterTransfer\`; deposits via \`tickDiskAutoDeposit\` in \`tickGame\`; skipped while Disk Fill is available) → Boosts. Never enable permanent auto-merge. Under \`--capacity-cap\`, stop Sacrificing once the listed Memory capacity is reached.
3. **Ladder:** Autobuyers when unlocked; manual \`buyTierQuantity\` when an autobuyer would stall on a full cost-block.
4. **Tickspeed:** Buy global + per-tier tickspeed whenever affordable; dump run XP into last-tier XP tickspeed.
5. **Soft resets:** Overclock first, then Speed Up (\`speedUpCount + 6\` requirement).
6. **PP:** Unlock prestige speed bonus at 10000 PP (spends 10000); do not buy Smart / Auto-Speed-Up / Auto-Prestige in this baseline.

## Simulation results

${resultsBody}
`

  writeFileSync(strategyOut, strategyDoc, 'utf8')
  console.error(`Wrote strategy doc → ${strategyOut}`)
}
