import { useCallback, useEffect, useMemo, useState } from 'react'
import { applyOfflineProgress, buyAutobuyerUnlock, buyAutoPrestige, buyAutoSpeedUp, buyGlobalTickspeedMultiplier, buyPrestigeSpeedBonus, buySmartAutobuyer, buyTickspeedAutobuyer, buyTickspeedMultiplier, buyTierQuantity, buyTierTickspeedAutobuyer, consumeXpForLastTierTickspeed, createInitialGameState, getOfflineEffectiveSeconds, prestigeGame, speedUpGame, tickGame } from './engine'
import { TICK_RATE_MS } from './layers'
import { clearGameState, loadGameState, loadLastSaveTimestamp, saveGameState } from './storage'

// Every purchase — manual Buy and autobuyer ticks alike — always batches up to the current
// level's cost-block boundary. The actual cap is applied dynamically inside the engine (see
// getTierBulkQuantity/getPurchaseBlockSize in engine.js), since the block size itself can grow
// over the course of a run — so this is deliberately a "buy as many as fit" request, not a fixed
// batch-size constant. Number.MAX_SAFE_INTEGER (not Infinity) specifically: engine.js's
// clampNonNegative treats any non-finite value (including Infinity) as invalid input and clamps it
// to 0 — a real bug this exact constant tripped during development, silently turning every
// purchase into a no-op — so this must stay a finite (if enormous) sentinel. This used to be a
// player-facing ×1/×10 "Bulk" toggle; it's now a fixed engine behavior (the toggle's former
// default), so there's nothing left to persist.
const BUY_QUANTITY = Number.MAX_SAFE_INTEGER

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
    buyTickspeedMultiplier: tierId => setState(buyTickspeedMultiplier(tierId)),
    buyAutobuyerUnlock: tierId => setState(buyAutobuyerUnlock(tierId)),
    buySmartAutobuyer: tierId => setState(buySmartAutobuyer(tierId)),
    buyTierTickspeedAutobuyer: tierId => setState(buyTierTickspeedAutobuyer(tierId)),
    buyAutoPrestige: () => setState(buyAutoPrestige),
    buyGlobalTickspeedMultiplier: () => setState(buyGlobalTickspeedMultiplier),
    buyPrestigeSpeedBonus: () => setState(buyPrestigeSpeedBonus),
    prestige: () => setState(prestigeGame),
    speedUp: () => setState(speedUpGame),
    buyAutoSpeedUp: () => setState(buyAutoSpeedUp),
    buyTickspeedAutobuyer: () => setState(buyTickspeedAutobuyer),
    consumeXpForLastTierTickspeed: amount => setState(consumeXpForLastTierTickspeed(amount)),
  }), [])

  const resetGame = useCallback(() => {
    clearGameState()
    setState(createInitialGameState())
    setOfflineProgress(null)
  }, [])

  const dismissOfflineProgress = useCallback(() => setOfflineProgress(null), [])

  return { actions, dismissOfflineProgress, offlineProgress, resetGame, state }
}
