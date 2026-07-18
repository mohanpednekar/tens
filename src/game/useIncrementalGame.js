import { useCallback, useEffect, useMemo, useState } from 'react'
import { applyOfflineProgress, buyAutobuyer, buyAutobuyerAutomation, buyAutoPrestige, buyPrestigeSpeedBonus, buySmartAutobuyer, buyTierQuantity, createInitialGameState, getOfflineEffectiveSeconds, prestigeGame, speedUpGame, tickGame } from './engine'
import { TICK_RATE_MS } from './layers'
import { clearGameState, loadGameState, loadLastSaveTimestamp, saveGameState } from './storage'

// Every purchase — manual Buy and autobuyer ticks alike — always batches up to the current
// 10-unit cost-block boundary. This used to be a player-facing ×1/×10 "Bulk" toggle; it's now a
// fixed engine behavior (the toggle's former default), so there's nothing left to persist.
const BUY_QUANTITY = 10

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
    state: applyOfflineProgress(elapsedRealSeconds, BUY_QUANTITY)(loaded),
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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setState(tickGame(TICK_RATE_MS / 1000, BUY_QUANTITY))
    }, TICK_RATE_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveGameState(state)
  }, [state])

  const actions = useMemo(() => ({
    buyTierQuantity: tierId => setState(buyTierQuantity(tierId, BUY_QUANTITY)),
    buyAutobuyer: tierId => setState(buyAutobuyer(tierId)),
    buyAutobuyerAutomation: tierId => setState(buyAutobuyerAutomation(tierId)),
    buySmartAutobuyer: tierId => setState(buySmartAutobuyer(tierId)),
    buyAutoPrestige: () => setState(buyAutoPrestige),
    buyPrestigeSpeedBonus: () => setState(buyPrestigeSpeedBonus),
    prestige: () => setState(prestigeGame),
    speedUp: () => setState(speedUpGame),
  }), [])

  const resetGame = useCallback(() => {
    clearGameState()
    setState(createInitialGameState())
    setOfflineProgress(null)
  }, [])

  const dismissOfflineProgress = useCallback(() => setOfflineProgress(null), [])

  return { actions, dismissOfflineProgress, offlineProgress, resetGame, state }
}
