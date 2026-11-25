// The simulation bot: an ideal attentive player driving the real engine (src/game/engine.js), one
// action pass + one 1 s tick at a time. Side-effect free so other tools can replay real play —
// run-simulation.mjs (this skill's CLI) and scripts/store-assets/seeds.mjs (store screenshots).
// Bot strategy is described in SKILL.md; changing it means re-running and publishing the skill.
import {
  activateComputeBoost,
  applyAutobuyerMilestones,
  buyBooster,
  buyGlobalTickspeedMultiplier,
  buyTierQuantity,
  buyTickspeedMultiplier,
  canActivateComputeBoost,
  combineIntroByte,
  consumeXpForLastTierTickspeed,
  convertIntroBitsToKilobytes,
  createInitialGameState,
  fillDataLakeManually,
  formatCurrency,
  getEffectiveLastTier,
  getLastTierXpTickspeedMinConsumption,
  getOverclockLevel,
  getPurchaseBlockSize,
  isAchievementEarned,
  isOverflowModeUnlocked,
  withManualPurchaseMark,
  getTierAffordableQuantity,
  getTierBulkQuantity,
  getTierSpendableAmount,
  getVisibleStoragePoolCount,
  isBoosterPurchaseAvailable,
  isDataLakeManualFillAvailable,
  isProductionFrozen,
  isTierUnlocked,
  overclockGame,
  purgeGame,
  queueIntroCapacityUpgrade,
  upgradePoolCapacity,
  scaleUpGame,
  provisionDisk,
  tapIntroBit,
  tapPoolBuffer,
  tickGame,
  buyPrestigeSpeedBonus,
} from '../../../src/game/engine.js'
import {
  COMPUTE_BOOST_TIER_FIELDS,
  DATA_LAKE_TIER_COUNT,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  MONEY_ID,
  TIER_DEFINITIONS,
  getStoragePoolMemoryBounds,
} from '../../../src/game/layers.js'

// Matches useIncrementalGame.js — "buy as many as fit the current cost-block".
export const BUY_QUANTITY = Number.MAX_SAFE_INTEGER
export const MAX_TICKS = 5_000_000

// Memory display uses BITS_PER_BYTE × 1000^n (B/KB/MB/…) — same as formatBitsInNearestUnit.
// The TRUE structural ceiling on Capacity growth is the FINAL pool's own end bound
// (isMemoryCapacityAtCap in engine.js consults getStoragePoolCount() — DATA_LAKE_TIER_COUNT here —
// unconditionally, never any earlier pool's own bound). This is astronomically large (~8e32 bits at
// 10 pools) — real Sacrifice can in principle grow all the way to it, but never gets remotely close
// within any realistic run (or even this script's own MAX_TICKS ceiling below), so a sweep point AT
// this true hard cap behaves identically to `unlimited` in practice. NOT INTRO_CAPACITY_CAP_BITS
// (pool 1's own, far smaller bound) — that used to double as a meaningful "real hard cap" before
// Capacity growth was decoupled from disk-build progress, but is now just an arbitrary earlier
// artificial stop this sweep's own `capacityCapBits` option imposes, no longer equivalent to
// unlimited growth (see docs/DESIGN_HISTORY.md). Under Data Lakes, higher capacity unlocks larger
// Disk arrays → more lake deposits → more Booster purchases; early stop at the Compute-unlock floor
// is Storage-poor (fewer disks/cores), not "Compute-favoring".
export const TRUE_HARD_CAP_BITS = getStoragePoolMemoryBounds(DATA_LAKE_TIER_COUNT).endBits
export const DEFAULT_CAPACITY_CAPS_BITS = [
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, // stop early at the Compute-unlock floor (Storage-poor)
  TRUE_HARD_CAP_BITS, // grow to the final pool's own true structural cap (Storage-rich, == unlimited)
  null, // unlimited — same result as the true hard cap under real Sacrifice
]

export function formatCapacityLabel(capacityBits) {
  if (capacityBits == null) return 'unlimited'
  const bytes = capacityBits / 8
  // toPrecision(6) + parseFloat strips the floating-point noise a raw division can produce at very
  // large magnitudes (e.g. the final pool's own ~8e32-bit true hard cap) — plain `bytes / 1e9` can
  // print as "1.0000000000000001e+23" instead of a clean "1e+23".
  const round = value => parseFloat(value.toPrecision(6))
  if (bytes >= 1e9) return `${round(bytes / 1e9)} GB (${capacityBits} bits)`
  if (bytes >= 1e6) return `${round(bytes / 1e6)} MB (${capacityBits} bits)`
  if (bytes >= 1e3) return `${round(bytes / 1e3)} KB (${capacityBits} bits)`
  return `${capacityBits} bits`
}

export function totalDisksBuilt(intro) {
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

export function actFoundry(state, { capacityCapBits = null } = {}) {
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

// `policy` (achievements.mjs, default none) lets a cycle deliberately deviate from the speed-optimal play to earn
// an achievement; see ACHIEVEMENT_GOALS there. Every field defaults to "play normally".
export const NO_POLICY = Object.freeze({})

export function actMainBuys(state, policy = NO_POLICY) {
  // 'Look ma, no hands': a hands-free cycle never clicks a tier Buy; the autobuyers must carry it alone.
  if (policy.handsFree) return state
  let s = state
  for (const tier of [...TIER_DEFINITIONS].reverse()) {
    const hasAutobuyer = (s.autobuyers?.[tier.id] ?? null) !== null && (s.autobuyersEnabled?.[tier.id] ?? true)
    if (!hasAutobuyer || wouldAutobuyerStall(s, tier)) {
      // A real click goes through the hook's withManualPurchaseMark; mirror it so the bot's own cycles are
      // not credited as hands-free when they were not.
      s = withManualPurchaseMark(buyTierQuantity(tier.id, BUY_QUANTITY))(s)
    }
  }
  return s
}

export function actTickspeed(state, policy = NO_POLICY) {
  let s = state
  // 'Overclock fast' needs two Overclocks in one Purge without a single Accelerate bought.
  const holdAccelerate = policy.noAccelerate && !isAchievementEarned(s, 'overclockStep2')
  for (let i = 0; i < 200 && !holdAccelerate; i += 1) {
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

// True while the bot should sit on an available Overclock to claim it deeper (Patient Overclock: the first claim
// of a Purge at policy.overclockFirstMin+ completed levels; Beyond Googol: a claim at policy.overclockDeepMin+).
export function isOverclockHeld(state, policy = NO_POLICY) {
  const completed = Math.max(0, (state.purchaseLevels?.[getEffectiveLastTier(state).id] ?? 1) - 1)
  let min = 0
  if (policy.overclockFirstMin && getOverclockLevel(state) === null && !isAchievementEarned(state, 'overclockStep1')) {
    min = policy.overclockFirstMin
  }
  if (
    policy.overclockDeepMin &&
    isOverflowModeUnlocked(state) &&
    isAchievementEarned(state, 'overclockStep2') &&
    !isAchievementEarned(state, 'overclockStep3')
  ) {
    min = Math.max(min, policy.overclockDeepMin)
  }
  return completed < min
}

export function actSoftResets(state, policy = NO_POLICY) {
  // Scale-Up-first preserves ladder progress before the final target. Once the target reaches the
  // last tier, a further Scale Up claim would reset that tier before Overclock's completed-level
  // requirement can be reached. Mirror Auto Scale Up's final-tier pause by deferring Scale Up
  // there and letting the simulation continue climbing until Overclock fires.
  const scaled = (state.scaleUpTargetTierIndex ?? 0) >= TIER_DEFINITIONS.length - 1 ? state : scaleUpGame(state)
  return isOverclockHeld(scaled, policy) ? scaled : overclockGame(scaled)
}

// The Purge speed bonus is a one-time 1 PP purchase (×1.1 at 1 Purge, then 1 + log10(n)); buy it as soon as affordable.
export function actSpeedBonus(state) {
  return buyPrestigeSpeedBonus(state)
}

export function actPlayer(state, options = {}) {
  const policy = options.policy ?? NO_POLICY
  return actSoftResets(actSpeedBonus(actTickspeed(actMainBuys(actFoundry(state, options), policy), policy)), policy)
}

export function countUnlockedAutobuyers(state) {
  return TIER_DEFINITIONS.filter(t => (state.autobuyers?.[t.id] ?? null) !== null).length
}

export function simulateCycle(startingState, { maxTicks = MAX_TICKS, capacityCapBits = null, policy = NO_POLICY } = {}) {
  let state = startingState
  let ticks = 0
  let foundryTicks = null
  let scaleUpsAtStart = state.scaleUpCount ?? 0
  const options = { capacityCapBits, policy }

  const startedUnlocked = Boolean(state.intro?.mainGameUnlocked)

  while (!isProductionFrozen(state)) {
    if (ticks >= maxTicks) {
      return {
        ticks,
        foundryTicks: foundryTicks ?? (startedUnlocked ? 0 : ticks),
        mainTicks: foundryTicks == null ? (startedUnlocked ? ticks : 0) : ticks - foundryTicks,
        reached: false,
        finalMoney: state.resources[MONEY_ID],
        scaleUps: (state.scaleUpCount ?? 0) - scaleUpsAtStart,
        overclock: state.overclockLastClaimCompletedLevels ?? 0, // Overclock level reached (not banked)
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

  // 'Remind me later': leave the finished Purge unclaimed (idle ticks, nothing else to do) for the wait.
  for (let held = 0; held < (policy.holdPurgeSeconds ?? 0); held += 1) {
    state = tickGame(1, BUY_QUANTITY)(state)
    ticks += 1
  }

  const foundry = foundryTicks ?? (startedUnlocked ? 0 : ticks)
  return {
    ticks,
    foundryTicks: foundry,
    mainTicks: Math.max(0, ticks - foundry),
    reached: true,
    finalMoney: state.resources[MONEY_ID],
    scaleUps: (state.scaleUpCount ?? 0) - scaleUpsAtStart,
    overclock: state.overclockLastClaimCompletedLevels ?? 0, // Overclock level reached (not banked)
    speedBonusUnlocked: Boolean(state.prestigeSpeedBonusUnlocked),
    autobuyers: countUnlockedAutobuyers(state),
    capacity: state.intro?.capacity ?? 0,
    coresEver: state.intro?.computeCoresEverEarned ?? 0,
    disksBuilt: totalDisksBuilt(state.intro),
    state,
  }
}

export function seedState({ purgeCount = 0, startingPP = 0 } = {}) {
  let state = createInitialGameState()
  state = {
    ...state,
    purge: {
      ...state.purge,
      count: purgeCount,
      points: startingPP,
    },
  }
  return applyAutobuyerMilestones(state)
}

