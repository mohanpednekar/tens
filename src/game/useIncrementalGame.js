import { useCallback, useEffect, useMemo, useState } from 'react'
import { buyAutobuyer, buyTierQuantity, createInitialGameState, prestigeGame, tickGame } from './engine'
import { TICK_RATE_MS } from './layers'
import { clearGameState, loadGameState, loadQuantityPreference, saveGameState, saveQuantityPreference } from './storage'

export const useIncrementalGame = () => {
  const [state, setState] = useState(() => loadGameState() ?? createInitialGameState())
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
  }, [])

  return { actions, resetGame, state, quantity, setQuantity }
}
