import { useCallback, useEffect, useMemo, useState } from 'react'
import { buyAutobuyer, buyTier, createInitialGameState, prestigeGame, tickGame } from './engine'
import { TICK_RATE_MS } from './layers'
import { clearGameState, loadGameState, saveGameState } from './storage'

export const useIncrementalGame = () => {
  const [state, setState] = useState(() => loadGameState() ?? createInitialGameState())
  // The ×1/×10 toggle. It no longer affects the manual Buy button (that always buys 1 — see
  // buyTier); it only governs how autobuyers batch their purchases during a tick.
  const [quantity, setQuantity] = useState(1)

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
    buyTier: tierId => setState(buyTier(tierId)),
    buyAutobuyer: tierId => setState(buyAutobuyer(tierId)),
    prestige: () => setState(prestigeGame),
  }), [])

  const resetGame = useCallback(() => {
    clearGameState()
    setState(createInitialGameState())
  }, [])

  return { actions, resetGame, state, quantity, setQuantity }
}
