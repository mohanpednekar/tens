import { createInitialGameState } from './engine'

const STORAGE_KEY = 'tens_game_state'
const LAST_SAVE_TIMESTAMP_KEY = 'tens_last_save_timestamp'

// Legacy name-based tier ids (pre-tier0N rename) mapped to their new naming-agnostic id.
// Nonillions/Decillions have no new id — they were dropped when the tier count went 12 → 10,
// so their old data is discarded rather than remapped (see LEGACY_REMOVED_TIER_IDS below).
const LEGACY_TIER_ID_MAP = {
  Tens: 'tier01',
  Thousands: 'tier02',
  Millions: 'tier03',
  Billions: 'tier04',
  Trillions: 'tier05',
  Quadrillions: 'tier06',
  Pentillions: 'tier07',
  Hexillions: 'tier08',
  Septillions: 'tier09',
  Octillions: 'tier10',
}
const LEGACY_REMOVED_TIER_IDS = new Set(['Nonillions', 'Decillions'])

// Remaps an old-schema per-tier map (resources/owned/purchased/autobuyers) from legacy
// name-based keys to the new tier0N keys, dropping data under removed legacy tier ids;
// keys already in the new scheme (or unrelated, like MONEY_ID) pass through unchanged.
const migrateTierKeys = map =>
  Object.fromEntries(
    Object.entries(map ?? {})
      .filter(([k]) => !LEGACY_REMOVED_TIER_IDS.has(k))
      .map(([k, v]) => [LEGACY_TIER_ID_MAP[k] ?? k, v])
  )

// Merge a saved state with a fresh one so new fields are always present
// and old save files remain playable after schema changes.
const migrateState = saved => {
  const fresh = createInitialGameState()
  // Convert legacy boolean autobuyers to level numbers (true → 1, false → null for locked).
  // Numeric values pass through unchanged — they must NOT be remapped to null here, or an
  // in-progress autobuyer would silently relock on the very next load, since a legitimate
  // numeric level would otherwise be indistinguishable from the legacy boolean `false`. A
  // pre-existing save's old level 0 ("unlocked but idle" under a since-removed schema) is left
  // as-is rather than migrated to 1 — tickGame already treats any non-null level as an active
  // autobuyer at the flat baseline purchase rate, so it degrades gracefully without
  // special-casing. A save from before autobuyer unlock became PP-funded (see engine.js's
  // buyAutobuyerUnlock) already has whatever level its autobuyer reached under the old
  // Money-funded activation/Upgrade or PP-funded automation — that level carries forward
  // unchanged; an already-unlocked tier is never punished or relocked by this schema change.
  const rawAutobuyers = migrateTierKeys(saved.autobuyers)
  const migratedAutobuyers = Object.fromEntries(
    Object.entries(rawAutobuyers).map(([k, v]) => [k, v === true ? 1 : v === false ? null : v])
  )
  // autoPrestige was originally a plain boolean (bought/not bought) before becoming a levelled
  // upgrade like autobuyers above — migrate the same way: true → level 1, false → null (not yet
  // bought). A numeric value (current schema) passes through unchanged.
  const rawAutoPrestige = saved.autoPrestige
  const migratedAutoPrestige = rawAutoPrestige === true ? 1 : rawAutoPrestige === false ? null : rawAutoPrestige
  // Carry forward legacy prestige.pp (renamed to prestige.xp) so old saves don't lose points
  const rawPrestige = saved.prestige ?? {}
  const { pp: legacyPP, level: legacyLevel, ...migratedPrestige } = rawPrestige
  if (migratedPrestige.xp === undefined && legacyPP !== undefined) {
    migratedPrestige.xp = legacyPP
  }
  // Legacy `level` (used to double production directly) is renamed `count` (times prestiged)
  // now that prestige awards spendable Prestige Points instead — an old save's prestige count
  // carries forward unchanged under the new field name. `points` (the new PP balance) has no
  // legacy equivalent — a save that predates it merges in fresh's 0 default below.
  if (migratedPrestige.count === undefined && legacyLevel !== undefined) {
    migratedPrestige.count = legacyLevel
  }
  return {
    ...fresh,
    ...saved,
    resources: { ...fresh.resources, ...migrateTierKeys(saved.resources) },
    owned:     { ...fresh.owned,     ...migrateTierKeys(saved.owned) },
    purchased: { ...fresh.purchased, ...migrateTierKeys(saved.purchased ?? saved.owned ?? {}) },
    autobuyers: { ...fresh.autobuyers, ...migratedAutobuyers },
    autobuyerAttemptBudgets: { ...fresh.autobuyerAttemptBudgets, ...migrateTierKeys(saved.autobuyerAttemptBudgets) },
    tierProductionAccumulators: { ...fresh.tierProductionAccumulators, ...migrateTierKeys(saved.tierProductionAccumulators) },
    smartAutobuyer: { ...fresh.smartAutobuyer, ...migrateTierKeys(saved.smartAutobuyer) },
    tierTickspeedAutobuyer: { ...fresh.tierTickspeedAutobuyer, ...migrateTierKeys(saved.tierTickspeedAutobuyer) },
    autoPrestige: migratedAutoPrestige === undefined ? fresh.autoPrestige : migratedAutoPrestige,
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
