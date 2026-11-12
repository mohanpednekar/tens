import { BITS_PER_BYTE, PURGE_THRESHOLD } from './layers'
import { getAutobuyerUnlockMilestone, getTierTickspeedAutobuyerMilestone } from './engine'

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
