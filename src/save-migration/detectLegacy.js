import { SAVE_SCHEMA_VERSION } from './constants'

const LEGACY_TIER_IDS = new Set([
  'Tens', 'Thousands', 'Millions', 'Billions', 'Trillions', 'Quadrillions', 'Pentillions',
  'Hexillions', 'Septillions', 'Octillions', 'Nonillions', 'Decillions',
])

const TIER_MAP_FIELDS = [
  'resources', 'owned', 'purchased', 'purchaseLevels', 'purchaseLevelProgress', 'autobuyers',
  'autobuyersEnabled', 'tickspeedLevels', 'autobuyerAttemptBudgets', 'tierProductionAccumulators',
  'smartAutobuyer', 'tierTickspeedAutobuyer', 'tierTickspeedAutobuyerEnabled', 'everUnlockedTierIds',
]

const mapHasLegacyTierId = map =>
  map && typeof map === 'object' && Object.keys(map).some(k => LEGACY_TIER_IDS.has(k))

/**
 * Returns a short reason code when a parsed save payload still needs a migration step this folder
 * does not implement yet — null when already at SAVE_SCHEMA_VERSION or an unstamped partial save
 * that matches the current shape.
 */
export const getSaveIncompatibilityReason = saved => {
  if (!saved || typeof saved !== 'object') return null
  if (saved.saveSchemaVersion === SAVE_SCHEMA_VERSION) return null

  if (saved.resources?.Ones !== undefined) return 'legacy_money_id'

  const intro = saved.intro
  if (intro === undefined) {
    const hasTierProgress = TIER_MAP_FIELDS.some(field => {
      const map = saved[field]
      return map && typeof map === 'object' && Object.keys(map).length > 0
    })
    if (hasTierProgress) return 'missing_intro'
  } else {
    if (intro.completed !== undefined && intro.mainGameUnlocked === undefined) return 'legacy_intro_gate'
    if (
      intro.storageBanks !== undefined ||
      intro.storageBanksBuiltTotal !== undefined ||
      intro.storageAutoRedeemedSizes !== undefined
    ) return 'legacy_storage_fields'
  }

  if (saved.prestige?.pp !== undefined && saved.prestige?.xp === undefined) return 'legacy_prestige_xp'
  if (saved.prestige?.level !== undefined && saved.prestige?.count === undefined) return 'legacy_prestige_count'

  if (saved.autobuyers && Object.values(saved.autobuyers).some(v => v === true || v === false)) {
    return 'legacy_boolean_autobuyers'
  }
  if (saved.autoPrestige === true || saved.autoPrestige === false) return 'legacy_boolean_auto_prestige'

  if (TIER_MAP_FIELDS.some(field => mapHasLegacyTierId(saved[field]))) return 'legacy_tier_ids'

  return null
}
