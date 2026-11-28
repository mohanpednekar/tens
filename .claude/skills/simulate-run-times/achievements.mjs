// Achievement-aware cycle planning for the simulation bot.
//
// Most achievements fall out of normal play (the bot just earns them). A few can only be earned by playing a
// cycle *differently* from the speed-optimal line — sit on an Overclock, skip Accelerate, never click a Buy, leave
// a finished Purge unclaimed. Those have a real cost in simulated seconds, so the question is WHEN to pay it.
//
// The engine is pure, so the planner just measures: before each cycle it replays the cycle from the same state
// with a candidate policy (bounded by a tick cap), keeps the policy only if the achievement really was earned and
// its marginal cost is within budget, and otherwise defers the attempt to a later cycle where the same measurement
// may come out cheaper (a fixed 60 s wait is a smaller share of a long cycle; a held Overclock costs less once
// later claims are close together). Nothing here guesses a cost or an earn condition: both come from the engine.
//
// Not covered (no timing choice to make, or outside the Purge-cycle loop this bot runs): Reclamation (Flush pools),
// Spent QB, the Reboot-layer set (Kernel panic, rm -rf, Popcorn) and the PP-purchase ones (Compression, Auto-Purge).
import {
  ACHIEVEMENT_DEFINITIONS,
  OVERFLOW_OVERCLOCK_ACHIEVEMENT_LEVEL,
  PATIENT_OVERCLOCK_ACHIEVEMENT_LEVEL,
  REMIND_ME_LATER_SECONDS,
  TIER_DEFINITIONS,
} from '../../../src/game/layers.js'
import { isAchievementEarned, isOverflowModeUnlocked } from '../../../src/game/engine.js'
import {
  NO_POLICY,
  countUnlockedAutobuyers,
  simulateCycle,
} from './bot.mjs'

// Share of the baseline (no-attempt) cycle length an attempt may add. Goals that pay a permanent production
// reward (Overclock step −1 each) are worth a bigger detour than cosmetic ones.
export const DEFAULT_BUDGET = Object.freeze({ reward: 0.25, cosmetic: 0.05 })

// Order matters: Overclock steps first (their rewards speed up everything after), the rest cheapest-first.
// `ready` filters attempts that cannot possibly work yet so they cost no trial; `apply` extends the policy.
export const ACHIEVEMENT_GOALS = [
  {
    id: 'overclockStep1',
    reward: true,
    ready: () => true,
    apply: policy => ({ ...policy, overclockFirstMin: PATIENT_OVERCLOCK_ACHIEVEMENT_LEVEL }),
  },
  {
    id: 'overclockStep2',
    reward: true,
    ready: () => true,
    apply: policy => ({ ...policy, noAccelerate: true }),
  },
  {
    id: 'overclockStep3',
    reward: true,
    ready: state => isOverflowModeUnlocked(state) && isAchievementEarned(state, 'overclockStep2'),
    apply: policy => ({ ...policy, overclockDeepMin: OVERFLOW_OVERCLOCK_ACHIEVEMENT_LEVEL }),
  },
  {
    id: 'remindMeLater',
    reward: false,
    ready: () => true,
    apply: policy => ({ ...policy, holdPurgeSeconds: REMIND_ME_LATER_SECONDS }),
  },
  {
    id: 'noHands',
    reward: false,
    // Every tier needs its autobuyer to carry the cycle alone; before that a hands-free cycle cannot finish.
    ready: state => countUnlockedAutobuyers(state) === TIER_DEFINITIONS.length,
    apply: policy => ({ ...policy, handsFree: true }),
  },
]

const earnedIds = state => new Set(ACHIEVEMENT_DEFINITIONS.filter(d => isAchievementEarned(state, d.id)).map(d => d.id))

// Plans and plays one cycle. `simulate` is injectable for tests. Returns the cycle result plus
// { policy, pursued, deferred, baselineTicks, extraTicks, newlyEarned }.
export function simulateCycleWithAchievements(state, options = {}) {
  const { budget = DEFAULT_BUDGET, simulate = simulateCycle, goals = ACHIEVEMENT_GOALS, ...cycleOptions } = options
  const baseline = simulate(state, { ...cycleOptions, policy: NO_POLICY })
  const before = earnedIds(state)
  let policy = NO_POLICY
  let current = baseline
  const pursued = []
  const deferred = []

  if (baseline.reached) {
    for (const goal of goals) {
      if (isAchievementEarned(state, goal.id) || !goal.ready(state)) continue
      const allowance = Math.ceil((goal.reward ? budget.reward : budget.cosmetic) * baseline.ticks)
      const candidate = goal.apply(policy)
      // Bounded replay: an attempt that would blow the budget aborts at the cap instead of running to Googol.
      const trial = simulate(state, { ...cycleOptions, policy: candidate, maxTicks: current.ticks + allowance })
      const cost = trial.ticks - current.ticks
      if (trial.reached && isAchievementEarned(trial.state, goal.id) && cost <= allowance) {
        policy = candidate
        current = trial
        pursued.push({ id: goal.id, cost })
      } else {
        deferred.push(goal.id)
      }
    }
  }

  const after = earnedIds(current.state)
  return {
    ...current,
    policy,
    pursued,
    deferred,
    baselineTicks: baseline.ticks,
    extraTicks: current.ticks - baseline.ticks,
    newlyEarned: [...after].filter(id => !before.has(id)),
  }
}
