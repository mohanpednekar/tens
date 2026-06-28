import { createInitialGameState } from './engine'

const STORAGE_KEY = 'tens_game_state'

// Merge a saved state with a fresh one so new fields are always present
// and old save files remain playable after schema changes.
const migrateState = saved => {
  const fresh = createInitialGameState()
  return {
    ...fresh,
    ...saved,
    resources: { ...fresh.resources, ...saved.resources },
    owned:     { ...fresh.owned,     ...saved.owned },
    autobuyers:{ ...fresh.autobuyers,...(saved.autobuyers ?? {}) },
    prestige:  { ...fresh.prestige,  ...saved.prestige },
  }
}

export const saveGameState = state => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
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

export const clearGameState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silently ignore
  }
}
