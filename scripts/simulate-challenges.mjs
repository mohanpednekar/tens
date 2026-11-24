#!/usr/bin/env node
// Challenge-mode balance simulator (issue #1043). Plays Factory challenges (epic #1037) with the real,
// pure engine functions and compares each run to a normal run from the SAME starting save.
//
// Lives under scripts/ (not the simulate-run-times skill) because `.claude/**` is protected for unattended
// runs and the skill's run-simulation.mjs runs on import. The bot below is a trimmed copy of that skill's
// `actPlayer` (attentive player: Foundry upkeep, tier buys, tickspeed, Scale Up/Overclock, speed bonus).
//
// Usage: node scripts/simulate-challenges.mjs [--dt 10] [--ids F1,F21,...] [--out file.md]
//   --dt   seconds per bot step (default 10; the bot acts once per step, tickGame advances dt). Coarser
//          steps run much faster than the skill's 1 s; ratios (challenge ÷ normal) use the same dt.
//
// Starting saves (assumptions): the Foundry (Disks/Lakes/Capacity) is carried from a bot career of
// CAREER_CYCLES cycles; purge.count is then set to the representative Purge (~1.5 × the challenge's unlock
// Purge), PP is left as banked by the career, and automation milestones are re-applied.
// No PP automations are bought; achievement bonuses are NOT disabled (the career earns them, e.g. Level power).
import { register } from 'node:module'
import { writeFileSync } from 'node:fs'

register(
  'data:text/javascript,' +
    encodeURIComponent(`export async function resolve(s, c, n) {
  try { return await n(s, c) } catch (e) {
    if (e.code === 'ERR_MODULE_NOT_FOUND' && (s.startsWith('./') || s.startsWith('../'))) return n(s + '.js', c)
    throw e
  }
}`),
)

const E = await import('../src/game/engine.js')
const L = await import('../src/game/layers.js')
const {
  activateComputeBoost, applyAutobuyerMilestones, buyBooster, buyGlobalTickspeedMultiplier, buyTierQuantity,
  buyTickspeedMultiplier, canActivateComputeBoost, combineIntroByte, consumeXpForLastTierTickspeed,
  convertIntroBitsToKilobytes, createInitialGameState, fillDataLakeManually, formatCurrency,
  getLastTierXpTickspeedMinConsumption, getPurchaseBlockSize, getTierAffordableQuantity, getTierBulkQuantity,
  getTierSpendableAmount, getVisibleStoragePoolCount, isBoosterPurchaseAvailable, isDataLakeManualFillAvailable,
  isTierUnlocked, overclockGame, purgeGame, queueIntroCapacityUpgrade, scaleUpGame, provisionDisk, tapIntroBit,
  tapPoolBuffer, tickGame, buyPrestigeSpeedBonus, enterChallenge, getPurgeGoalBits, getActiveChallenge, isProductionFrozen,
} = E
const { COMPUTE_BOOST_TIER_FIELDS, DATA_LAKE_TIER_COUNT, MONEY_ID, TIER_DEFINITIONS, CHALLENGE_DEFINITIONS, PURGE_THRESHOLD } = L

const BUY_QUANTITY = Number.MAX_SAFE_INTEGER
const CAREER_CYCLES = Number(process.argv[process.argv.indexOf('--career-cycles') + 1]) || 3
const args = process.argv.slice(2)
const argOf = (flag, fallback) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : fallback)
const DT = Number(argOf('--dt', 10))
const IDS = argOf('--ids', null)?.split(',')
const OUT = argOf('--out', null)
const TRACE_DAYS = Number(argOf('--trace', 0)) // >0: log Money exponent / Bit Rot losses every N simulated days of the challenge run
const MAX_DAYS = Number(argOf('--max-days', 400))
const MAX_SECONDS = MAX_DAYS * 86400

function totalDisksBuilt(intro) {
  return Object.values(intro?.disksBuiltTotal ?? {}).reduce((sum, n) => sum + (n ?? 0), 0)
}

// Upgrade Data Stream the way an attentive player uses it now: a click starts it as soon as it is
// armable (the byte is combined, Capacity isn't at its cap, none already running), and from then on
// tickCapacityUpgradeDrain (inside tickGame) pulls from the Buffer at the base Speed ahead of every
// other consumer and doubles Capacity when the bar fills — it pauses nothing and sits outside the
// forced priority order, so there is nothing to time: just restart it every tick it is idle.
function actCapacityUpgrade(s, canGrowCapacity) {
  return canGrowCapacity ? queueIntroCapacityUpgrade(s) : s
}

function actFoundry(state, { capacityCapBits = null } = {}) {
  let s = state

  s = tapIntroBit(s)
  // Fill-based multiplier (FILL_MULTIPLIER_* in layers.js): tapping keeps a
  // Buffer's own multiplier boosted above its natural fill-based value. tapIntroBit above already
  // covers the Data Stream; each pool's own local buffer needs its own tap too, since a pool's own
  // multiplier is entirely independent of the Data Stream's — an attentive player taps every
  // tappable target, not just the Data Stream tile. Only VISIBLE pools (ByteFoundryPage's own
  // getVisibleStoragePoolCount gate — capacity-threshold AND disk-build-unlocked) actually render a
  // Memory tile to tap; getUnlockedStoragePoolCount alone is disk-build-only and can run ahead of
  // what's on screen, so using it here would let the bot tap pools no real player could reach yet.
  for (let poolIndex = 1; poolIndex <= getVisibleStoragePoolCount(s); poolIndex += 1) {
    s = tapPoolBuffer(poolIndex)(s)
  }
  s = combineIntroByte(s)

  const canGrowCapacity =
    capacityCapBits == null || (s.intro?.capacity ?? 0) < capacityCapBits

  // Byte Foundry funds Byte Factory pull-based and fully automatically now (tickDiskPull /
  // tickDiskLevelOneCachePull, run unconditionally inside tickGame every tick — issue #571): a
  // full permanent Disk carried across Prestige, sitting at tier01's fresh level-1 cost with zero
  // purchase-level progress, gets pulled the very next tick regardless of anything this bot does —
  // there is no autobuyer gate left to pause, and no manual redeem call left to make or defer. The
  // convert-before-pull ordering that used to matter for avoiding a Foundry-gate softlock (tier01's
  // level racing ahead of Memory capacity before convertIntroBitsToKilobytes ever flips
  // mainGameUnlocked) is now an engine-level fact (tickDiskPull runs at the very end of tickGame's
  // own pipeline, after tickIntroAutoInvest), not something bot strategy can influence either way.
  if (!s.intro?.mainGameUnlocked) {
    for (let i = 0; i < 64; i += 1) {
      const next = convertIntroBitsToKilobytes(s)
      if (next === s) break
      s = next
    }
    s = actCapacityUpgrade(s, canGrowCapacity)
    for (let i = 0; i < 64; i += 1) {
      const next = convertIntroBitsToKilobytes(s)
      if (next === s) break
      s = next
    }
    return s
  }

  s = provisionDisk(s)

  // Upgrade / queue the Data Stream upgrade (see actCapacityUpgrade). Under a capacity cap, stop
  // once the cap is reached so Disk ladder size (and thus Data Lake deposit throughput) stays fixed
  // for the Storage vs Compute tradeoff sweep.
  s = actCapacityUpgrade(s, canGrowCapacity)

  for (let i = 0; i < 64; i += 1) {
    const next = convertIntroBitsToKilobytes(s)
    if (next === s) break
    s = next
  }


  // Data Lake manual Fill: until a pool's Storage array is entirely complete
  // (isStoragePoolFullyBuilt), its lake fills ONLY manually from that pool's own buffer, capped at
  // just enough for the lake's own next Booster (fillDataLakeManually/isDataLakeManualFillAvailable)
  // — tickPoolBufferFill's automatic overflow branch is gated on that same completion, so an
  // attentive bot that skipped this would silently earn zero lake income (and buy zero Boosters)
  // for that whole phase, understating run times. Outside the forced priority order, same as Buy.
  for (let tierIndex = 1; tierIndex <= DATA_LAKE_TIER_COUNT; tierIndex += 1) {
    for (let i = 0; i < 16; i += 1) {
      if (!isDataLakeManualFillAvailable(s, tierIndex)) break
      const next = fillDataLakeManually(tierIndex)(s)
      if (next === s) break
      s = next
    }
  }

  // Data Lake → Booster buys: once a pool is complete, its lake is fed continuously by that pool's
  // buffer overflow (tickPoolBufferFill, inside tickGame) on top of the manual fills above;
  // buyBooster spends only that lake's own banked units — no other resource involved, so (unlike
  // Disk Fill/Speed/Provision Disk/Compute Boost) it's outside the forced priority order entirely
  // and always available the instant affordable, with nothing else to skip it for. Prefer lower
  // tiers first (Cores) so an instant Core can fund a Boost the same tick.
  for (let i = 0; i < 16; i += 1) {
    let bought = false
    for (let tierIndex = 1; tierIndex <= DATA_LAKE_TIER_COUNT; tierIndex += 1) {
      if (isBoosterPurchaseAvailable(s, tierIndex)) {
        s = buyBooster(tierIndex)(s)
        bought = true
        break
      }
    }
    if (!bought) break
  }

  // Compute Boosts spend held tokens, not Memory. One Turbo lane (the strongest multiplier), queued from the
  // broadest funded tier first; only starts/queues one boost per step.
  for (let tierIndex = COMPUTE_BOOST_TIER_FIELDS.length; tierIndex >= 1; tierIndex -= 1) {
    if (canActivateComputeBoost(s, 'burst', tierIndex)) {
      s = activateComputeBoost('burst', tierIndex)(s)
      break
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
  const effectiveBatchSize = 1
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
  const xp = s.purge?.xp ?? 0
  if (xp > 0) {
    const min = getLastTierXpTickspeedMinConsumption(s.lastTierXpConsumed ?? 0)
    if (xp >= min) s = consumeXpForLastTierTickspeed(xp)(s)
  }
  return s
}

function actSoftResets(state) {
  // Scale-Up-first preserves ladder progress before the final target. Once the target reaches the
  // last tier, a further Scale Up claim would reset that tier before Overclock's completed-level
  // requirement can be reached. Mirror Auto Scale Up's final-tier pause by deferring Scale Up
  // there and letting the simulation continue climbing until Overclock fires.
  if ((state.scaleUpTargetTierIndex ?? 0) >= E.getEffectiveTierCount(state) - 1) {
    return overclockGame(state)
  }
  return overclockGame(scaleUpGame(state))
}

// The Purge speed bonus is a one-time 1 PP purchase (×1.1 at 1 Purge, then 1 + log10(n)); buy it as soon as affordable.
function actSpeedBonus(state) {
  return buyPrestigeSpeedBonus(state)
}

function actPlayer(state, options = {}) {
  return actSoftResets(actSpeedBonus(actTickspeed(actMainBuys(actFoundry(state, options)))))
}

// Play until `done(state)` or MAX_SECONDS; returns seconds and the end state.
// Bit Rot (F9) bot variant: keep a Bits reserve above the corruption the next step can reach (a player who
// stops spending when corruption nears), buying only with the rest. Autobuyers are paused so they cannot spend it.
const RESERVE_MARGIN = Number(argOf('--reserve-margin', 3))
function actPlayerBitRot(state) {
  let s = state
  const off = Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, false]))
  if (TIER_DEFINITIONS.some(t => s.autobuyersEnabled?.[t.id] !== false) || s.autoGlobalTickspeedEnabled !== false) {
    s = { ...s, autobuyersEnabled: off, tierTickspeedAutobuyerEnabled: off, autoGlobalTickspeedEnabled: false, autoScaleUpEnabled: false, autoOverclockEnabled: false }
  }
  const money = s.resources[MONEY_ID] ?? 0
  const secs = s.challenges?.run?.cycleSeconds ?? 0
  const peak = E.getBitRotCorruption({ ...s, challenges: { ...s.challenges, run: { ...s.challenges.run, cycleSeconds: secs + 2 * DT } } })
  const hold = Math.min(money, peak * RESERVE_MARGIN)
  s = { ...s, resources: { ...s.resources, [MONEY_ID]: money - hold } }
  s = actTickspeed(actMainBuys(actFoundry(s)))
  s = { ...s, resources: { ...s.resources, [MONEY_ID]: (s.resources[MONEY_ID] ?? 0) + hold } }
  // A soft reset restarts the Bit Rot grace period (see restartBitRotGrace in engine.js), so it is safe to take.
  return actSoftResets(actSpeedBonus(s))
}

function play(start, done, label = null) {
  let s = start
  let t = 0
  while (!done(s)) {
    if (TRACE_DAYS > 0 && label && t % (TRACE_DAYS * 86400) === 0) {
      process.stderr.write(`${label} day ${t / 86400}: money 1e${Math.log10(Math.max(1, s.resources[MONEY_ID] ?? 0)).toFixed(1)} bits, bitRotLosses ${s.challenges?.bitRotLosses ?? 0}, scaleUps ${s.scaleUpCount ?? 0}\n`)
    }
    if (t >= MAX_SECONDS) return { seconds: t, reached: false, state: s }
    const before = s
    s = tickGame(DT, BUY_QUANTITY)(getActiveChallenge(s)?.effect === 'bitRot' ? actPlayerBitRot(s) : actPlayer(s))
    if (process.env.DEBUG_BITROT && (s.challenges?.bitRotLosses ?? 0) > (before.challenges?.bitRotLosses ?? 0) && (s.challenges.bitRotLosses < 4)) {
      process.stderr.write(`restart at cycle ${before.challenges.run.cycleSeconds}s: money before ${before.resources[MONEY_ID]}, corruption ${E.getBitRotCorruption(before)}\n`)
    }
    t += DT
  }
  return { seconds: t, reached: true, state: s }
}

const goalReached = s => (s.resources[MONEY_ID] ?? 0) >= getPurgeGoalBits(s)
// Normal runs stop at the Googol freeze; a challenge stops at its (possibly raised) goal.
const normalDone = s => isProductionFrozen(s)

const fmt = sec => {
  const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600), m = Math.floor((sec % 3600) / 60)
  return `${d ? d + 'd ' : ''}${h || d ? h + 'h ' : ''}${m}m`
}

// Foundry carry: a bot career of CAREER_CYCLES cycles from a fresh save.
function buildCareerBase() {
  let s = applyAutobuyerMilestones(createInitialGameState())
  for (let i = 0; i < CAREER_CYCLES; i += 1) {
    const r = play(s, normalDone)
    if (!r.reached) throw new Error('career cycle did not finish')
    s = purgeGame(r.state)
    process.stderr.write(`career cycle ${i + 1} done (capacity ${s.intro?.capacity}, disks built ${Object.values(s.intro?.disksBuiltTotal ?? {}).reduce((a, b) => a + (b ?? 0), 0)}, pools unlocked ${E.getUnlockedStoragePoolCount(s)}, sizes ${JSON.stringify(s.intro?.disksBuiltTotal)})\n`)
  }
  return s
}

// Representative Purge for each challenge: ~1.5 × the Purge the challenge unlocks at.
function unlockPurge(def) {
  return E.getChallengeUnlockPurges(def)
}

function seedFor(base, def) {
  const need = unlockPurge(def)
  const target = Math.round(need * 1.5)
  // unlock via milestone at `need`, then set the representative count.
  let s = applyAutobuyerMilestones({ ...base, purge: { ...base.purge, count: Math.max(need, target) } })
  s = { ...s, purge: { ...s.purge, count: target } }
  return { state: s, purgeCount: target }
}

// --foundry-step K: pretend the Foundry's Disk ladder has reached its Kth size (sizes below it built, K unlocked), as a
// player who has unlocked further sizes through Foundry resets would have. The career bot never does, so its ladder stays at the first size.
const FOUNDRY_STEP = Number(argOf('--foundry-step', 0))
const seedFoundryStep = s => {
  if (FOUNDRY_STEP < 2) return s
  const built = { ...(s.intro?.disksBuiltTotal ?? {}) }
  for (let i = 1; i < FOUNDRY_STEP; i += 1) built[L.DISK_LADDER_BASE_SIZE_BITS * L.DISK_LADDER_SIZE_MULTIPLIER ** (i - 1)] = 9
  return { ...s, intro: { ...s.intro, unlockedDiskSteps: FOUNDRY_STEP, disksBuiltTotal: built } }
}
const base = seedFoundryStep(buildCareerBase())
const defs = CHALLENGE_DEFINITIONS.filter(d => (IDS ? IDS.includes(d.id) : ['F1', 'F21', 'F22', 'F23', 'F24', 'F25'].includes(d.id)))
const rows = []
for (const def of defs) {
  const { state, purgeCount } = seedFor(base, def)
  const normal = play(state, normalDone)
  if (args.includes('--levels')) process.stderr.write(`${def.id} normal-run tickspeedLevels: ${JSON.stringify(normal.state.tickspeedLevels)} (cost base ${L.TICKSPEED_MULTIPLIER_BASE_EXPONENT})\n`)
  const entered = enterChallenge(def.id)(state)
  if (entered === state) {
    rows.push(`| ${def.id} ${def.codename} | ${purgeCount} | not enterable from this save | | | |`)
    continue
  }
  let reachedGoogol = null
  const chal = play(entered, s => {
    if (reachedGoogol == null && (s.resources[MONEY_ID] ?? 0) >= PURGE_THRESHOLD) reachedGoogol = s.challenges.activeSeconds
    return goalReached(s)
  }, def.id)
  const ratio = chal.reached && normal.reached ? (chal.seconds / normal.seconds).toFixed(2) : 'n/a'
  const extra = def.id === 'F25' && reachedGoogol != null ? `Googol at ${fmt(reachedGoogol)}; Googol→goal ${fmt(chal.seconds - reachedGoogol)}` : ''
  rows.push(`| ${def.id} ${def.codename} | ${purgeCount} | ${normal.reached ? fmt(normal.seconds) : 'capped'} | ${chal.reached ? fmt(chal.seconds) : 'not completed in ' + fmt(MAX_SECONDS)} | ${ratio} | ${extra} |`)
  process.stderr.write(rows[rows.length - 1] + '\n')
}

const out = [
  '## Challenge runs (#1043)',
  '',
  `Step ${DT}s; Foundry carried from a ${CAREER_CYCLES}-cycle bot career; no PP automations; achievement bonuses the bot earns in its career are NOT disabled; bands: F1–F10 1–2×, F11–F20 2–10×, F21–F25 10–100×.`,
  '',
  '| Challenge | Purge | Normal run | Challenge run | Ratio | Notes |',
  '|---|---|---|---|---|---|',
  ...rows,
].join('\n')
console.log(out)
if (OUT) writeFileSync(OUT, out + '\n', 'utf8')
