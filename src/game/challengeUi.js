import { BITS_PER_BYTE, CLOCK_DRIFT_INTERVAL_SECONDS, DUTY_CYCLE_WINDOW_SECONDS, HARD_REFRESH_INTERVAL_SECONDS, MONEY_ID, PURGE_THRESHOLD } from './layers'
import { formatCurrency, getActiveChallenge, getAutobuyerUnlockMilestone, getBitRotCorruption, getTierTickspeedAutobuyerMilestone } from './engine'

// Player-facing helpers for challenge mode (epic #1037); pure, shared by Firmware and the Factory banner.
const GLOBAL_AUTOMATION_NAMES = {
  speedUp: 'Auto Clock Speed',
  scaleUp: 'Auto Scale Up',
  restage: 'Auto Restage',
  overclock: 'Auto Overclock',
  purge: 'Auto Purge',
}

export const formatChallengeTime = totalSeconds => {
  const seconds = Math.max(0, Math.floor(Number.isFinite(totalSeconds) ? totalSeconds : 0))
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

export const formatChallengeGoal = goalBits =>
  goalBits === PURGE_THRESHOLD ? '1 Googol Bytes' : `10^${Math.round(Math.log10(goalBits / BITS_PER_BYTE))} Bytes`

export const getChallengeUnlockCondition = def => {
  const { kind, key } = def.automation
  if (kind === 'tierAutobuyer') return `Unlocks at Purge ${getAutobuyerUnlockMilestone(key)}`
  if (kind === 'tierTickspeed') return `Unlocks at Purge ${getTierTickspeedAutobuyerMilestone(key)}`
  return `Unlocks when you buy ${GLOBAL_AUTOMATION_NAMES[key] ?? key}`
}

export const getChallengeTitle = def => `${def.id} · ${def.target} · ${def.codename}`

const secondsToNext = (elapsed, interval) => interval - (elapsed % interval)

// Rule-specific banner readouts (F2 halt, F5 refresh, F9 corruption, F15 drift, F19 phase): text lines only.
export const getChallengeReadouts = state => {
  const challenge = getActiveChallenge(state)
  if (!challenge) return []
  const elapsed = state.challenges.activeSeconds ?? 0
  const run = state.challenges.run ?? {}
  switch (challenge.effect) {
    case 'writeLock':
      return [(run.haltSeconds ?? 0) > 0 ? `Production halted: ${formatChallengeTime(Math.ceil(run.haltSeconds))} left` : 'Production running']
    case 'hardRefresh':
      return [`Next refresh in ${formatChallengeTime(secondsToNext(elapsed, HARD_REFRESH_INTERVAL_SECONDS))} · ${run.refreshes ?? 0} survived`]
    case 'clockDrift':
      return [`Next tickspeed loss in ${formatChallengeTime(secondsToNext(elapsed, CLOCK_DRIFT_INTERVAL_SECONDS))}`]
    case 'dutyCycle': {
      const on = Math.floor(elapsed / DUTY_CYCLE_WINDOW_SECONDS) % 2 === 0
      return [`Tickspeed bonus ${on ? 'ON' : 'OFF'} for ${formatChallengeTime(Math.ceil(secondsToNext(elapsed, DUTY_CYCLE_WINDOW_SECONDS)))}`]
    }
    case 'bitRot':
      return [`Corruption ${formatCurrency(getBitRotCorruption(state))} vs ${formatCurrency(state.resources[MONEY_ID] ?? 0)} · ${state.challenges.bitRotLosses ?? 0} cycles lost`]
    default:
      return []
  }
}
