import { SAVE_SCHEMA_VERSION } from './constants'
import { getSaveIncompatibilityReason } from './detectLegacy'

const stripSaveEnvelope = saved => {
  const { saveSchemaVersion: _version, ...gameState } = saved
  return gameState
}

/**
 * Save migration assistant — the only module that understands older on-disk shapes.
 *
 * Contract: the game offloads a raw parsed localStorage payload here on every load and receives
 * either `{ ok: true, payload }` where `payload` is game state compatible with the current schema
 * (no envelope), or `{ ok: false, reason }` when no version-chain step can reach SAVE_SCHEMA_VERSION.
 *
 * `storage.js` never transforms legacy fields — it only persists, calls this, then mergeState.
 */
export const adaptSaveForCurrentSchema = raw => {
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
