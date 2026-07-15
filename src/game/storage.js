import { createInitialGameState } from './engine'

const STORAGE_KEY = 'tens_game_state'
const QUANTITY_STORAGE_KEY = 'tens_bulk_quantity'
const LAST_SAVE_TIMESTAMP_KEY = 'tens_last_save_timestamp'

// Merge a saved state with a fresh one so new fields are always present
// and old save files remain playable after schema changes.
const migrateState = saved => {
  const fresh = createInitialGameState()
  // Convert legacy boolean autobuyers to level numbers (true → 1, false/0 → null for locked)
  const rawAutobuyers = saved.autobuyers ?? {}
  const migratedAutobuyers = Object.fromEntries(
    Object.entries(rawAutobuyers).map(([k, v]) => [k, v === true ? 1 : (v === false || v === 0) ? null : v])
  )
  // Carry forward legacy prestige.pp (renamed to prestige.xp) so old saves don't lose points
  const rawPrestige = saved.prestige ?? {}
  const { pp: legacyPP, ...migratedPrestige } = rawPrestige
  if (migratedPrestige.xp === undefined && legacyPP !== undefined) {
    migratedPrestige.xp = legacyPP
  }
  return {
    ...fresh,
    ...saved,
    resources: { ...fresh.resources, ...saved.resources },
    owned:     { ...fresh.owned,     ...saved.owned },
    purchased: { ...fresh.purchased, ...(saved.purchased ?? saved.owned ?? {}) },
    autobuyers: { ...fresh.autobuyers, ...migratedAutobuyers },
    prestige:  { ...fresh.prestige,  ...migratedPrestige },
  }
}

// Stamps a separate "last save" timestamp on every save (its own key, like the timestamp isn't
// part of the game-state shape itself) — read back by loadLastSaveTimestamp on the next load to
// figure out how long the game was closed for, to drive offline progress.
export const saveGameState = state => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    localStorage.setItem(LAST_SAVE_TIMESTAMP_KEY, String(Date.now()))
  } catch {
    // Silently ignore (storage quota exceeded, private-browsing restrictions, etc.)
  }
}

export const loadGameState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return migrateState(JSON.parse(raw))
  } catch {
    return null
  }
}

// Milliseconds since epoch as of the most recent saveGameState call, or null if there's no
// record of one (never saved, or an older save predating this feature). Used to compute how
// long the game was closed for offline progress; a missing/invalid value means "unknown", not
// "just now" — callers should skip offline progress rather than guess.
export const loadLastSaveTimestamp = () => {
  try {
    const raw = localStorage.getItem(LAST_SAVE_TIMESTAMP_KEY)
    if (!raw) return null
    const parsed = Number(raw)
    return Number.isFinite(parsed) ? parsed : null
  } catch {
    return null
  }
}

export const clearGameState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LAST_SAVE_TIMESTAMP_KEY)
  } catch {
    // Silently ignore
  }
}

// The Bulk (×1/×10) toggle is a UI preference, not game progress — stored under its own key so
// it's untouched by save-schema migration and by resetGame/clearGameState.
export const saveQuantityPreference = quantity => {
  try {
    localStorage.setItem(QUANTITY_STORAGE_KEY, String(quantity))
  } catch {
    // Silently ignore
  }
}

export const loadQuantityPreference = () => {
  try {
    const raw = localStorage.getItem(QUANTITY_STORAGE_KEY)
    return raw === '1' ? 1 : 10
  } catch {
    return 10
  }
}
