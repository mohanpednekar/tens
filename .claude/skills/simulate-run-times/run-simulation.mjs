// Simulates full playthroughs of Tens using the real, pure functions in src/game/engine.js and
// src/game/layers.js — not a reimplementation — so results always reflect the actual current game
// rules.
//
// Bot strategy (ideal attentive player, held constant across runs):
//   Foundry (every tick):
//     - Tap Memory when not full; tap every unlocked pool's own local buffer too (the fill-based
//       multiplier — FILL_MULTIPLIER_* in layers.js — is independent per Data
//       Stream/pool, so an attentive player keeps every one of them boosted, not just the Data
//       Stream tile); Combine into a Byte when affordable.
//     - Byte Foundry funds Byte Factory pull-based and fully automatically now (tickDiskPull /
//       tickDiskLevelOneCachePull, unconditional inside tickGame every tick, no autobuyer gate —
//       issue #571) — there is nothing left for this bot to pause or redeem manually.
//     - While mainGameUnlocked is false: skip Disk Fill/Build, queue the Data Stream upgrade as
//       gated, and convert Memory → Kilobytes until the gate opens. The convert-before-pull ordering that
//       used to matter for avoiding a softlock is now an engine-level fact (tickDiskPull runs at
//       the very end of tickGame's own pipeline), not something this bot influences.
//     - After unlock: Disk Fill → Disk Build → queue the Data Stream upgrade when the Buffer
//       isn't full yet (fires on full Memory) → convert →
//       Data Lake manual Fill (fillDataLakeManually, capped at the next Booster's cost — the only
//       income source for a lake until its own pool's Storage array is entirely complete) →
//       Data Lake Booster buys (buyBooster; funded only from that lake's own banked units — outside
//       the forced priority order entirely, always available the instant affordable) → Boosts.
//       Never enable permanent auto-merge.
//   Main ladder (every tick):
//     - Autobuyers wherever applicable: unlocked tiers (autobuyers[tierId] non-null from
//       applyAutobuyerMilestones / purge.count) are left to tickGame's autobuyer loop with the
//       real BUY_QUANTITY = Number.MAX_SAFE_INTEGER batch — matching useIncrementalGame.js.
//     - Manual buyTierQuantity on any tier with no autobuyer, OR whose autobuyer would stall this
//       tick (affordable > 0 but less than the full cost-block batch the autobuyer waits for).
//     - Buy the Money-funded global tickspeed multiplier and each tier's own tickspeed multiplier
//       whenever affordable; dump run XP into the last tier's XP-funded tickspeed when the min
//       consumption gate allows.
//     - Soft resets: Scale Up first while advancing through the tier ladder. At the final-tier
//       target, defer Scale Up and wait for Overclock so a level-3 reset cannot starve its level-5
//       gate (see actSoftResets below).
//     - Speed bonus: the 1 PP Purge speed bonus is bought as soon as affordable.
//       Other PP automations (Smart / Auto-Scale-Up / Auto-Prestige / tickspeed autobuyer) are NOT
//       bought — those are separate levers; this bot isolates Foundry + ladder + free/Money/XP
//       tickspeed + prestige-count autobuyer milestones.
//   Cycle end: loop exits the instant isProductionFrozen (Money ≥ PURGE_THRESHOLD). Career mode
//   then calls purgeGame (permanent Foundry carry + applyAutobuyerMilestones) and continues.
//
// Usage:
//   node run-simulation.mjs                         # career table (purges 0..10) + PP sweep
//   node run-simulation.mjs --pp 0 100 10000         # PP sweep only (fresh purge.count = 0)
//   node run-simulation.mjs --career 0 5 10          # career cycles at those prestige counts
//   node run-simulation.mjs --capacity-cap           # default early-stop floor/hard cap/unlimited sweep
//   node run-simulation.mjs --capacity-cap 4194304 8388608 unlimited
//   node run-simulation.mjs --career 0 5 --achievements   # also pursue timing-dependent achievements (achievements.mjs)
//   node run-simulation.mjs --strategy-out /tmp/run.md
//   node run-simulation.mjs --pp 0 --strategy-out ./runs/2026-03-21T120000Z-abc1234.md

import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { formatCurrency, getAchievementStars, purgeGame } from '../../../src/game/engine.js'
import { simulateCycleWithAchievements } from './achievements.mjs'
import {
  DEFAULT_CAPACITY_CAPS_BITS,
  MAX_TICKS,
  formatCapacityLabel,
  seedState,
  simulateCycle,
} from './bot.mjs'

function formatDuration(totalSeconds) {
  if (totalSeconds < 0) return `-${formatDuration(-totalSeconds)}`
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
  let achievements = false
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
    if (arg === '--achievements') {
      achievements = true
      mode = null
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
  return { pp, career, capacityCaps, runCapacitySweep, strategyOut, achievements }
}

const defaultPPValues = [0, 10, 25, 50, 100, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000]
const defaultCareerPurges = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const {
  pp: cliPP,
  career: cliCareer,
  capacityCaps: cliCapacityCaps,
  runCapacitySweep,
  strategyOut,
  achievements: pursueAchievements,
} = parseArgs(process.argv.slice(2))

// Capacity-cap mode is exclusive of the default career+PP tables unless those flags are also set.
const onlyCapacity = runCapacitySweep && cliPP.length === 0 && cliCareer.length === 0
const runPP = !onlyCapacity && (cliPP.length > 0 || (cliPP.length === 0 && cliCareer.length === 0 && !runCapacitySweep))
const runCareer = !onlyCapacity && (cliCareer.length > 0 || (cliPP.length === 0 && cliCareer.length === 0 && !runCapacitySweep))
const ppValues = cliPP.length > 0 ? cliPP : defaultPPValues
const careerTargets = cliCareer.length > 0 ? cliCareer : defaultCareerPurges
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
    `| ${labelCols.join(' | ')} | ${foundryCell} | ${mainCell} | ${durationCell} | ${result.autobuyers} | ${result.scaleUps} | ${result.overclock} | ${moneyCell} |`,
  )
}

let freshTotal = null
let freshFoundry = null
let capacityWinner = null

if (runCapacitySweep || onlyCapacity) {
  emit('## Memory capacity-cap sweep (Storage vs Compute)')
  emit('')
  emit(
    'Freeze Data Stream capacity growth once Memory capacity reaches each listed bit value (climb normally until then).',
  )
  emit(
    'Higher caps unlock larger Disk arrays → more Data Lake deposits → more Booster purchases',
  )
  emit(
    '(Cores/Nodes/…). Early stop is Storage-poor under Data Lakes. `unlimited` matches the hard-cap baseline.',
  )
  emit('')
  emit(
    '| Capacity cap | End capacity | Foundry | Main → Googol | Total | Cores ever | Disks built | Scale Ups | Overclock Δ | Money at Googol |',
  )
  emit('|---|---|---|---|---|---|---|---|---|---|')

  let bestTicks = Infinity
  for (const cap of capacityCapValues) {
    const result = simulateCycle(seedState({ purgeCount: 0, startingPP: 0 }), {
      capacityCapBits: cap,
    })
    const durationCell = result.reached
      ? formatDuration(result.ticks)
      : `${formatDuration(result.ticks)} (capped)`
    emit(
      `| ${formatCapacityLabel(cap)} | ${formatCapacityLabel(result.capacity)} | ${formatDuration(result.foundryTicks)} | ${formatDuration(result.mainTicks)} | ${durationCell} | ${result.coresEver} | ${result.disksBuilt} | ${result.scaleUps} | ${result.overclock} | ${result.reached ? formatCurrency(result.finalMoney) : 'not reached'} |`,
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
    '| After purges | Starting PP (banked) | Foundry | Main → Googol | Total cycle | Autobuyers | Scale Ups | Overclock Δ | Money at Googol |',
  )
  emit('|---|---|---|---|---|---|---|---|---|')

  let state = seedState({ purgeCount: 0, startingPP: 0 })
  let nextTargetIndex = 0
  const achievementRows = []
  const targets = [...new Set(careerTargets)].sort((a, b) => a - b)

  while (nextTargetIndex < targets.length) {
    const countAtStart = state.purge.count
    const ppAtStart = state.purge.points
    const result = pursueAchievements ? simulateCycleWithAchievements(state) : simulateCycle(state)
    if (pursueAchievements) {
      achievementRows.push({
        purges: countAtStart,
        extra: result.extraTicks,
        baseline: result.baselineTicks,
        pursued: result.pursued.map(p => `${p.id} (+${formatDuration(p.cost)})`),
        deferred: result.deferred,
        earned: result.newlyEarned,
        stars: getAchievementStars(result.state),
      })
    }

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
      emit(`Stopped early: cycle at purge.count=${countAtStart} hit the ${MAX_TICKS.toLocaleString()}-tick cap.`)
      break
    }

    if (nextTargetIndex >= targets.length) break

    state = purgeGame(result.state)
    if (state.purge.count <= countAtStart) {
      emit('')
      emit('Stopped early: purgeGame did not increment purge.count.')
      break
    }
  }
  emit('')

  if (pursueAchievements) {
    emit('## Achievement pursuit (cost measured by replaying each cycle with and without the attempt)')
    emit('')
    emit('| Purge cycle | Baseline | Extra time paid | Pursued (marginal cost) | Deferred | Earned this cycle | Stars after |')
    emit('|---|---|---|---|---|---|---|')
    for (const row of achievementRows) {
      emit(
        `| ${row.purges} | ${formatDuration(row.baseline)} | ${formatDuration(row.extra)} | ${row.pursued.join(', ') || '—'} | ${row.deferred.join(', ') || '—'} | ${row.earned.join(', ') || '—'} | ${row.stars} |`,
      )
    }
    emit('')
  }
}

if (runPP) {
  emit('## PP sweep (fresh purge.count = 0 — no tier autobuyers; manual buys unstall)')
  emit('')
  emit(
    '| PP balance | Speed bonus | Foundry | Main → Googol | Total | Autobuyers | Scale Ups | Overclock Δ | Money at Googol |',
  )
  emit('|---|---|---|---|---|---|---|---|---|')
  for (const pp of ppValues) {
    const result = simulateCycle(seedState({ purgeCount: 0, startingPP: pp }))
    const remainingPP = result.state.purge.points
    const bonusCell = result.speedBonusUnlocked
      ? `×1.1 then 1+log10(n) bonus, ${remainingPP} PP left`
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

1. **Foundry gate:** Tap / Combine; convert Memory → Kilobytes until the gate opens. Byte Foundry pulls a matching permanent Disk into tier01 automatically and unconditionally, every tick (\`tickDiskPull\`) — nothing to pause or redeem by hand.
2. **After unlock:** Disk Fill → Disk Build → **queue the Data Stream upgrade** when the Buffer isn't full yet → convert → **Data Lake manual Fill** (\`fillDataLakeManually\`, capped at the next Booster's cost — a lake's only income until its own pool's Storage array is entirely complete) → **Data Lake Booster buys** (\`buyBooster\`; funded only from that lake's own banked units — outside the forced priority order entirely, always available the instant affordable) → Boosts. Never enable permanent auto-merge. Under \`--capacity-cap\`, stop growing capacity once the listed Memory capacity is reached.
3. **Factory:** Autobuyers when unlocked; manual \`buyTierQuantity\` when an autobuyer would stall on a full cost-block.
4. **Tickspeed:** Buy global + per-tier tickspeed whenever affordable; dump run XP into last-tier XP tickspeed.
5. **Soft resets:** Scale Up first while advancing through the tier ladder (flat level 3); at the final-tier target, skip Scale Up and keep climbing until Overclock fires so its level-5 gate is reachable.
6. **PP:** buy the 1 PP Purge speed bonus first; do not buy Smart / Auto-Scale-Up / Auto-Prestige in this baseline.

## Simulation results

${resultsBody}
`

  writeFileSync(strategyOut, strategyDoc, 'utf8')
  console.error(`Wrote strategy doc → ${strategyOut}`)
}
