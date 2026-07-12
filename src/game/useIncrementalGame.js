import { useCallback, useEffect, useMemo, useState } from 'react'
import { buyAutobuyer, buyTier, buyTierQuantity, createInitialGameState, prestigeGame, tickGame } from './engine'
import { TICK_RATE_MS } from './layers'
import { clearGameState, loadGameState, saveGameState } from './storage'

export const useIncrementalGame = () => {
  const [state, setState] = useState(() => loadGameState() ?? createInitialGameState())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setState(tickGame(TICK_RATE_MS / 1000))
    }, TICK_RATE_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveGameState(state)
  }, [state])

  const actions = useMemo(() => ({
    buyTier: tierId => setState(buyTier(tierId)),
    buyTierQuantity: (tierId, quantity) => setState(buyTierQuantity(tierId, quantity)),
    buyAutobuyer: tierId => setState(buyAutobuyer(tierId)),
    prestige: () => setState(prestigeGame),
  }), [])

  const resetGame = useCallback(() => {
    clearGameState()
    setState(createInitialGameState())
  }, [])

  return { actions, resetGame, state }
}
