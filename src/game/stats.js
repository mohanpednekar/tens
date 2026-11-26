// Pure selectors for the Stats page (page id 'stats'). Reads state only — no React, no side effects.
// `getStatsOverview(state)` → the hero tiles; `getStatsSections(state)` → the ordered, visible
// sections ({ id, name, icon, tone, stats: [{ id, label, value, progress?, wide? }] }). A section stays
// hidden until its layer has been reached, so the page never spoils content the player hasn't seen.
import {
  formatAmount,
  formatComputeFlopsTotal,
  formatCurrency,
  formatMemoryAmount,
  formatOfflineDuration,
  getAchievementProductionMultiplier,
  getAchievementStars,
  getCompactedPoolCount,
  getLifetimePurges,
  getPurgeGoalBits,
  getComputeFlopsTotal,
  getMaxOfflineSeconds,
  getMemoryUnit,
  getOverclockLevel,
  getPlaytimeProductionMultiplier,
  getPrestigeProductionMultiplier,
  getPurgePercent,
  getStoragePoolCount,
  getVisibleStoragePoolCount,
  isAchievementEarned,
  isOverflowModeUnlocked,
} from './engine'
import { ACHIEVEMENT_DEFINITIONS, COMPUTE_FLOPS_TIER_DEFINITIONS, LIVE_CHALLENGE_IDS, MONEY_ID, TIER_DEFINITIONS } from './layers'

const num = value => (Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0)
const count = value => formatAmount(Math.floor(num(value)))
const ratio = (current, target) => (target > 0 ? Math.min(1, num(current) / target) : 0)
const percent = multiplier => `+${formatAmount(Math.round((num(multiplier) - 1) * 1000) / 10)}%`
const times = multiplier => `×${formatAmount(Math.round(num(multiplier) * 100) / 100)}`

export const getLifetimePurgeCount = state => getLifetimePurges(state)

// Product of the global bonus factors tickGameCore folds into `multiplier` (Purge × playtime × stars) — not
// total production (Accelerate, levels, Scale Up and Flops multiply on top).
export const getProductionBonusFactors = state => {
  const purge = getPrestigeProductionMultiplier(num(state.purge?.count), Boolean(state.prestigeSpeedBonusUnlocked))
  const playtime = getPlaytimeProductionMultiplier(state)
  const stars = getAchievementProductionMultiplier(state)
  return { purge, playtime, stars, total: purge * playtime * stars }
}

const getVisibleAchievements = () => ACHIEVEMENT_DEFINITIONS.filter(def => !def.platformDependent)

const getTierStats = state => {
  const reached = TIER_DEFINITIONS.filter(tier => num(state.owned?.[tier.id]) > 0 || num(state.purchased?.[tier.id]) > 0)
  const completedLevels = TIER_DEFINITIONS.reduce((sum, tier) => sum + Math.max(0, num(state.purchaseLevels?.[tier.id] ?? 1) - 1), 0)
  return { reached, completedLevels }
}

const getDailyStats = state => {
  let wins = 0
  let attempts = 0
  Object.values(state.daily?.results ?? {}).forEach(byFormat => {
    Object.values(byFormat ?? {}).forEach(result => {
      if (result?.won) wins += 1
      attempts += num(result?.attempts)
    })
  })
  return { wins, attempts }
}

export const getStatsOverview = state => [
  { id: 'playTime', icon: '⏱️', label: 'Play time', value: formatOfflineDuration(state.activePlaySeconds) },
  getLifetimePurgeCount(state) > 0
    ? { id: 'purges', icon: '🧹', label: 'Purges', value: count(getLifetimePurgeCount(state)) }
    : { id: 'pings', icon: '📡', label: 'Pings', value: count(state.achievements?.counters?.pings) },
  { id: 'stars', icon: '⭐', label: 'Stars', value: count(getAchievementStars(state)) },
  { id: 'bonus', icon: '🚀', label: 'Bonus', value: times(getProductionBonusFactors(state).total) },
]

export const getStatsSections = state => {
  const purges = getLifetimePurgeCount(state)
  const reboots = num(state.era?.count)
  const counters = state.achievements?.counters ?? {}
  const mainGameUnlocked = Boolean(state.intro?.mainGameUnlocked)
  const sections = []

  sections.push({
    id: 'time', name: 'Time', icon: '⏱️', tone: 'info',
    stats: [
      { id: 'activePlay', label: 'Active play', value: formatOfflineDuration(state.activePlaySeconds) },
      ...(purges > 0 ? [{ id: 'cycle', label: 'This Purge', value: formatOfflineDuration(state.purge?.cycleSeconds) }] : []),
      { id: 'sleepCap', label: 'Sleep mode cap', value: formatOfflineDuration(getMaxOfflineSeconds(state)) },
      ...(state.challenges?.active ? [{ id: 'challengeTime', label: 'Challenge run', value: formatOfflineDuration(state.challenges.activeSeconds) }] : []),
    ],
  })

  if (mainGameUnlocked) {
    const { reached, completedLevels } = getTierStats(state)
    const money = num(state.resources?.[MONEY_ID])
    const highest = reached[reached.length - 1]
    const overclock = getOverclockLevel(state)
    const goalPercent = getPurgePercent(money, getPurgeGoalBits(state))
    sections.push({
      id: 'factory', name: 'Factory', icon: '🏭', tone: 'accent',
      stats: [
        { id: 'balance', label: 'Balance', value: formatCurrency(money) },
        { id: 'googol', label: state.challenges?.active ? 'To goal' : 'To Googol', value: `${formatAmount(goalPercent)}%`, progress: goalPercent / 100 },
        { id: 'tiers', label: 'Tiers reached', value: `${reached.length}/${TIER_DEFINITIONS.length}`, progress: ratio(reached.length, TIER_DEFINITIONS.length) },
        { id: 'highestTier', label: 'Top tier', value: highest ? highest.name : '—' },
        { id: 'levels', label: 'Levels completed', value: count(completedLevels) },
        ...(state.globalTickspeedMultiplier !== null && state.globalTickspeedMultiplier !== undefined ? [{ id: 'accelerate', label: 'Accelerate', value: `Lv ${count(state.globalTickspeedMultiplier)}` }] : []),
        ...(num(state.scaleUpCount) > 0 ? [{ id: 'scaleUps', label: 'Scale Ups', value: count(state.scaleUpCount) }] : []),
        ...(overclock !== null ? [{ id: 'overclock', label: 'Overclock', value: `Lv ${count(overclock)}` }] : []),
      ],
    })
  }

  sections.push({
    id: 'foundry', name: 'Foundry', icon: '🔧', tone: 'good',
    stats: [
      { id: 'pings', label: 'Pings', value: count(counters.pings) },
      { id: 'capacity', label: 'Capacity', value: formatMemoryAmount(num(state.intro?.capacity), getMemoryUnit(num(state.intro?.capacity), Boolean(state.intro?.byteCreated))) },
      { id: 'pools', label: 'Pools live', value: `${getVisibleStoragePoolCount(state)}/${getStoragePoolCount()}`, progress: ratio(getVisibleStoragePoolCount(state), getStoragePoolCount()) },
      { id: 'flushed', label: 'Pools flushed', value: `${getCompactedPoolCount(state)}/${getStoragePoolCount()}`, progress: ratio(getCompactedPoolCount(state), getStoragePoolCount()) },
      { id: 'reformats', label: 'Reformats', value: count(counters.reformats) },
    ],
  })

  if (purges > 0) {
    const last = state.prestigeMuseum?.history?.[0]
    sections.push({
      id: 'purge', name: 'Purge', icon: '🧹', tone: 'warn',
      stats: [
        { id: 'lifetime', label: 'Lifetime Purges', value: count(purges) },
        { id: 'points', label: 'Purge Points', value: `${count(state.purge?.points)} PP` },
        { id: 'best', label: 'Best award', value: `${count(state.purge?.highestAward)} PP` },
        ...(last ? [{ id: 'last', label: 'Last award', value: `${count(last.pointsAwarded)} PP` }] : []),
        { id: 'compression', label: 'Compression', value: `Lv ${count(state.prestigeDoublePpLevel)}` },
        { id: 'overflow', label: 'Overflow mode', value: isOverflowModeUnlocked(state) ? 'On' : 'Locked' },
        ...(num(counters.handsFreePurges) > 0 ? [{ id: 'handsFree', label: 'Hands-free Purges', value: count(counters.handsFreePurges) }] : []),
      ],
    })
  }

  if (state.computeFlops?.pageUnlocked) {
    const owned = COMPUTE_FLOPS_TIER_DEFINITIONS.reduce((sum, tier) => sum + num(state.computeFlops?.owned?.[tier.id]), 0)
    const tiersOwned = COMPUTE_FLOPS_TIER_DEFINITIONS.filter(tier => num(state.computeFlops?.owned?.[tier.id]) > 0).length
    sections.push({
      id: 'compute', name: 'Compute', icon: '🖥️', tone: 'violet',
      stats: [
        { id: 'flops', label: 'Flops boost', value: formatComputeFlopsTotal(getComputeFlopsTotal(state)) },
        { id: 'units', label: 'Units owned', value: count(owned) },
        { id: 'tiers', label: 'Tiers owned', value: `${tiersOwned}/${COMPUTE_FLOPS_TIER_DEFINITIONS.length}`, progress: ratio(tiersOwned, COMPUTE_FLOPS_TIER_DEFINITIONS.length) },
      ],
    })
  }

  if (reboots > 0) {
    sections.push({
      id: 'reboot', name: 'Reboot', icon: '⏻', tone: 'danger',
      stats: [
        { id: 'reboots', label: 'Reboots', value: count(reboots) },
        { id: 'kernels', label: 'Kernels', value: count(state.eons?.balance) },
        { id: 'kernelsEarned', label: 'Kernels earned', value: count(Math.max(num(counters.kernelsEarned), num(state.eons?.balance))) },
        { id: 'hyperscalers', label: 'Hyperscalers', value: count(state.hyperscalerCount) },
      ],
    })
  }

  if (purges > 0) {
    const completed = [...LIVE_CHALLENGE_IDS].filter(id => state.challenges?.completed?.[id]).length
    const daily = getDailyStats(state)
    sections.push({
      id: 'challenges', name: 'Challenges', icon: '🏁', tone: 'info',
      stats: [
        { id: 'completed', label: 'Completed', value: `${completed}/${LIVE_CHALLENGE_IDS.size}`, progress: ratio(completed, LIVE_CHALLENGE_IDS.size) },
        { id: 'entered', label: 'Runs started', value: count(state.challenges?.enteredCount) },
        { id: 'dailyWins', label: 'Daily wins', value: count(daily.wins) },
        { id: 'dailyAttempts', label: 'Daily attempts', value: count(daily.attempts) },
      ],
    })
  }

  const achievements = getVisibleAchievements()
  const earned = achievements.filter(def => isAchievementEarned(state, def.id)).length
  const factors = getProductionBonusFactors(state)
  sections.push({
    id: 'bonuses', name: 'Bonuses', icon: '🚀', tone: 'warn',
    stats: [
      { id: 'achievements', label: 'Achievements', value: `${earned}/${achievements.length}`, progress: ratio(earned, achievements.length) },
      { id: 'stars', label: 'Star bonus', value: percent(factors.stars) },
      ...(state.prestigeSpeedBonusUnlocked ? [{ id: 'purgeBonus', label: 'Purge bonus', value: times(factors.purge) }] : []),
      ...(state.playtimeBonusUnlocked ? [{ id: 'playtimeBonus', label: 'Playtime bonus', value: percent(factors.playtime) }] : []),
      { id: 'total', label: 'Bonus multiplier', value: times(factors.total), wide: true },
    ],
  })

  return sections
}
