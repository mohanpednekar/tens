import { useCallback, useEffect, useMemo, useState } from 'react'
import { buyAutobuyer, buyTier, createInitialGameState, prestigeGame, tickGame } from './engine'
import { TICK_RATE_MS } from './layers'

export const useIncrementalGame = () => {
  const [state, setState] = useState(createInitialGameState)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setState(tickGame(TICK_RATE_MS / 1000))
    }, TICK_RATE_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  const actions = useMemo(() => ({
    buyTier: tierId => setState(buyTier(tierId)),
    buyAutobuyer: tierId => setState(buyAutobuyer(tierId)),
    prestige: () => setState(prestigeGame),
  }), [])

  const resetGame = useCallback(() => setState(createInitialGameState()), [])

  return { actions, resetGame, state }
}
