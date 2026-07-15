import { useCallback, useEffect, useMemo, useState } from 'react'
import { applyOfflineProgress, buyAutobuyer, buyTierQuantity, createInitialGameState, getOfflineEffectiveSeconds, prestigeGame, tickGame } from './engine'
import { TICK_RATE_MS } from './layers'
import { clearGameState, loadGameState, loadLastSaveTimestamp, loadQuantityPreference, saveGameState, saveQuantityPreference } from './storage'

// Runs once, at mount, before the regular tick timer starts. Computes the resting game state
// (with offline progress already folded in, if applicable) and a summary of that offline
// progress for the UI to report — or null if there was no prior save, no recorded last-save
// timestamp (an older save, or one that was never actually saved), or the gap was too short to
// register even a single simulated second at 10% speed.
const computeInitialGame = () => {
  const loaded = loadGameState()
  if (!loaded) return { state: createInitialGameState(), offlineProgress: null }

  const lastSaveTimestamp = loadLastSaveTimestamp()
  const elapsedRealSeconds = lastSaveTimestamp ? (Date.now() - lastSaveTimestamp) / 1000 : 0
  const effectiveSeconds = elapsedRealSeconds > 0 ? getOfflineEffectiveSeconds(elapsedRealSeconds) : 0

  if (effectiveSeconds <= 0) return { state: loaded, offlineProgress: null }

  return {
    state: applyOfflineProgress(elapsedRealSeconds, loadQuantityPreference())(loaded),
    offlineProgress: { elapsedRealSeconds, effectiveSeconds },
  }
}

export const useIncrementalGame = () => {
  // Computed once — the lazy initializer only ever runs on mount — and read into two more
  // useStates below rather than one combined state, since actions.* only ever needs to touch
  // `state`, not the one-shot offlineProgress summary.
  const [initial] = useState(computeInitialGame)
  const [state, setState] = useState(initial.state)
  const [offlineProgress, setOfflineProgress] = useState(initial.offlineProgress)
  // The ×1/×10 "Bulk" toggle. Governs the batch size for both the manual Buy button and how
  // autobuyers batch their purchases during a tick. Defaults to ×10 (buy until the current
  // cost-block boundary) rather than one unit at a time. Persisted separately from game state
  // (its own localStorage key) since it's a UI preference, not progress — resetGame must not
  // touch it.
  const [quantity, setQuantity] = useState(() => loadQuantityPreference())

  useEffect(() => {
    saveQuantityPreference(quantity)
  }, [quantity])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setState(tickGame(TICK_RATE_MS / 1000, quantity))
    }, TICK_RATE_MS)

    return () => window.clearInterval(intervalId)
  }, [quantity])

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveGameState(state)
  }, [state])

  const actions = useMemo(() => ({
    buyTierQuantity: (tierId, quantity) => setState(buyTierQuantity(tierId, quantity)),
    buyAutobuyer: tierId => setState(buyAutobuyer(tierId)),
    prestige: () => setState(prestigeGame),
  }), [])

  const resetGame = useCallback(() => {
    clearGameState()
    setState(createInitialGameState())
    setOfflineProgress(null)
  }, [])

  const dismissOfflineProgress = useCallback(() => setOfflineProgress(null), [])

  return { actions, dismissOfflineProgress, offlineProgress, resetGame, state, quantity, setQuantity }
}
