// v1/v2 (and unstamped) -> v3: the Factory reset's code names were renamed `prestige` (pre-Reboot-era)
// and then `reboot` (v1/v2) -> `purge` (v3, #987). Every legacy spelling maps straight to the current
// name here so storage.js never transforms legacy fields. The destination key wins if both exist.
const RENAMED_TOP_LEVEL_KEYS = [
  ['reboot', 'purge'],
  ['prestige', 'purge'],
  ['autoReboot', 'autoPurge'],
  ['autoPrestige', 'autoPurge'],
  ['autoRebootEnabled', 'autoPurgeEnabled'],
  ['autoPrestigeEnabled', 'autoPurgeEnabled'],
  ['autoRebootAttemptBudget', 'autoPurgeAttemptBudget'],
  ['autoPrestigeAttemptBudget', 'autoPurgeAttemptBudget'],
]
const RENAMED_AUTOMATION_KEYS = [['latency', 'speedUp'], ['reboot', 'purge'], ['prestige', 'purge']]
const RENAMED_MUSEUM_ENTRY_KEYS = [['rebootNumber', 'purgeNumber'], ['prestigeNumber', 'purgeNumber']]

const renameKeys = (obj, pairs) => {
  if (!obj || typeof obj !== 'object') return obj
  const next = { ...obj }
  for (const [from, to] of pairs) {
    if (from in next) {
      if (!(to in next)) next[to] = next[from]
      delete next[from]
    }
  }
  return next
}

export const migrateToV3 = gameState => {
  const next = renameKeys(gameState, RENAMED_TOP_LEVEL_KEYS)
  if (next.automationIntervalLevels) next.automationIntervalLevels = renameKeys(next.automationIntervalLevels, RENAMED_AUTOMATION_KEYS)
  if (next.automationAttemptBudgets) next.automationAttemptBudgets = renameKeys(next.automationAttemptBudgets, RENAMED_AUTOMATION_KEYS)
  if (Array.isArray(next.prestigeMuseum?.history)) {
    next.prestigeMuseum = {
      ...next.prestigeMuseum,
      history: next.prestigeMuseum.history.map(entry => renameKeys(entry, RENAMED_MUSEUM_ENTRY_KEYS)),
    }
  }
  return next
}
