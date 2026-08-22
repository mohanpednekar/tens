import { SAVE_SCHEMA_VERSION } from './constants'
import { getSaveIncompatibilityReason } from './detectLegacy'

const stripSaveEnvelope = saved => {
  const { saveSchemaVersion: _version, ...gameState } = saved
  return gameState
}

/**
 * Runs on every game load before `storage.js` merges defaults. Applies an explicit version chain
 * (add `steps/migrateVnToVnPlus1.js` modules here as schemas evolve). Returns current-schema game
 * state without the envelope, or `{ ok: false, reason }` when no step can reach SAVE_SCHEMA_VERSION.
 */
export const migrateSavePayload = raw => {
  if (!raw || typeof raw !== 'object') return { ok: false, reason: 'invalid_payload' }

  if (raw.saveSchemaVersion === SAVE_SCHEMA_VERSION) {
    return { ok: true, payload: stripSaveEnvelope(raw) }
  }

  const legacyReason = getSaveIncompatibilityReason(raw)
  if (legacyReason) {
    // Future: compose migrateV0ToV1, migrateV1ToV2, … until SAVE_SCHEMA_VERSION or give up.
    return { ok: false, reason: legacyReason }
  }

  // Unstamped save that already matches the current shape — pass through to mergeState.
  return { ok: true, payload: raw }
}

export { SAVE_SCHEMA_VERSION } from './constants'
export { getSaveIncompatibilityReason } from './detectLegacy'
