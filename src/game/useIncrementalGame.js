import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { activateComputeBoost, applyOfflineProgress, buyAutoPrestige, buyAutoPrestigeAutobuyer, buyAutoSpeedUp, buyGlobalTickspeedMultiplier, buyPrestigeSpeedBonus, buySmartAutobuyer, buyTickspeedAutobuyer, buyTickspeedMultiplier, buyTierQuantity, claimComputeCore, combineIntroByte, consumeXpForLastTierTickspeed, convertIntroBitsToKilobytes, createInitialGameState, enableAutoClaimCore, enableAutoMergeClustersIntoNetwork, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid, enableAutoMergeNodesIntoCluster, enableAutoMergeSupercomputersIntoMegacomputer, getOfflineEffectiveSeconds, mergeComputeClustersIntoNetwork, mergeComputeCloudsIntoDatacenter, mergeComputeCoresIntoNode, mergeComputeDatacentersIntoSupercomputer, mergeComputeFabricsIntoCloud, mergeComputeGridsIntoFabric, mergeComputeNetworksIntoGrid, mergeComputeNodesIntoCluster, mergeComputeSupercomputersIntoMegacomputer, overclockGame, pickIntroCapacityMilestone, pickIntroProductionMilestone, pinMuseumEntry, prestigeGame, reclaimComputeBoost, redeemDisk, releaseDiskCacheBlock, setAutobuyerEnabled, setAutoGlobalTickspeedEnabled, setAutoPrestigeAutobuyerEnabled, setAutoPrestigeEnabled, setAutoSpeedUpEnabled, setTierTickspeedAutobuyerEnabled, speedUpGame, stackComputeBoost, startComputeCloudsMerge, startComputeClustersMerge, startComputeCoresMerge, startComputeDatacentersMerge, startComputeFabricsMerge, startComputeGridsMerge, startComputeNetworksMerge, startComputeNodesMerge, startComputeSupercomputersMerge, startDiskBuild, tapIntroBit, tickGame, unpinMuseumEntry } from './engine'
import { MONEY_ID, OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS, OPS_SAMPLE_CAP, OPS_SAMPLE_INTERVAL_MS, TICK_RATE_MS } from './layers'
import { clearGameState, completeDummySupporterPurchase, listSaveSlots, loadGameState, loadLastSaveTimestamp, loadSavesMeta, redeemSupporterUnlockCode, renameSaveSlot, saveGameState, setActiveSaveSlot } from './storage'

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

// A real-world gap between two successive live ticks larger than this is treated as the tab/app
// having been backgrounded or suspended by the browser/OS — see the tick-loop effect below —
// rather than ordinary `setInterval` scheduling jitter (which stays within a few tens of ms even
// under load). 20x the live tick rate (TICK_RATE_MS = 100ms) comfortably clears that jitter while
// still catching a real suspension quickly once it resumes.
const BACKGROUND_TICK_GAP_THRESHOLD_SECONDS = 2

// Shared by computeInitialGame (the one-time mount check) and the live tick loop's own gap
// detection below — both need the identical "is this gap big enough to register as offline
// progress, and what does catching it up produce" logic. Returns null if the gap doesn't clear
// even a single simulated second (see getOfflineEffectiveSeconds in engine.js). Progress is always
// applied to `state` once that bar is cleared, but `offlineProgress` (the notice summary) comes
// back null for a gap at or below OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS — that short an
// absence is simulated at full speed, "as if the screen was always on," so there's nothing to
// notify the player about.
const computeOfflineCatchUp = (elapsedRealSeconds, state) => {
  const effectiveSeconds = elapsedRealSeconds > 0 ? getOfflineEffectiveSeconds(elapsedRealSeconds) : 0
  if (effectiveSeconds <= 0) return null

  return {
    state: applyOfflineProgress(elapsedRealSeconds, BUY_QUANTITY)(state),
    offlineProgress: elapsedRealSeconds > OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS
      ? { elapsedRealSeconds, effectiveSeconds }
      : null,
  }
}

// Runs once, at mount, before the regular tick timer starts. Computes the resting game state
// (with offline progress already folded in, if applicable) and a summary of that offline
// progress for the UI to report — or null if there was no prior save, no recorded last-save
// timestamp (an older save, or one that was never actually saved), or the gap was too short to
// register even a single simulated second. This only ever covers time the app was
// fully torn down (a real page load/PWA cold start) — see the tick-loop effect below for the
// separate, more common case of a tab/app merely backgrounded or suspended without a remount.
const computeInitialGame = () => {
  loadSavesMeta()
  const loaded = loadGameState()
  if (!loaded) return { state: createInitialGameState(), offlineProgress: null }

  const lastSaveTimestamp = loadLastSaveTimestamp()
  const elapsedRealSeconds = lastSaveTimestamp ? (Date.now() - lastSaveTimestamp) / 1000 : 0

  return computeOfflineCatchUp(elapsedRealSeconds, loaded) ?? { state: loaded, offlineProgress: null }
}

export const useIncrementalGame = () => {
  // Computed once — the lazy initializer only ever runs on mount — and read into two more
  // useStates below rather than one combined state, since actions.* only ever needs to touch
  // `state`, not the one-shot offlineProgress summary.
  const [initial] = useState(computeInitialGame)
  const [state, setState] = useState(initial.state)
  const [offlineProgress, setOfflineProgress] = useState(initial.offlineProgress)
  const [savesMeta, setSavesMeta] = useState(() => loadSavesMeta())
  const [saveSlots, setSaveSlots] = useState(() => listSaveSlots())
  // In-session Ops dashboard samples — not persisted; meta QoL sparkline only.
  const [opsSamples, setOpsSamples] = useState([])

  // Mirrors `state` for the tick-loop effect below to read without depending on `state` itself —
  // depending on it would tear down and recreate the interval/listener (and, worse, reset the
  // gap-detection clock) on every single tick.
  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])

  const refreshSavesUi = useCallback(() => {
    setSavesMeta(loadSavesMeta())
    setSaveSlots(listSaveSlots())
  }, [])

  useEffect(() => {
    // Real wall-clock time of the most recently processed tick (live or catch-up), used to detect
    // a gap much larger than TICK_RATE_MS between two ticks — mobile browsers/PWA hosts routinely
    // throttle or fully suspend a backgrounded tab's setInterval timer without ever tearing the
    // page down, so the mount-time computeInitialGame check above (a one-shot effect that only
    // ever runs again on a real remount/page reload) silently misses that time entirely: the app
    // just resumes ticking forward from wherever it left off, with no catch-up and no notice. A
    // plain closure variable, not a ref, since it's only ever read/written from inside this same
    // effect's own callbacks.
    let lastTickRealTime = Date.now()

    // Shared by the interval below and the visibilitychange listener. lastTickRealTime is stamped
    // only after the tick/catch-up work below actually finishes, not at entry — a large catch-up
    // replays applyOfflineProgress one simulated second at a time (up to MAX_OFFLINE_SECONDS worth),
    // which can itself take real wall-clock time to compute on a slow device; stamping at entry
    // would let that processing time be mistaken for a further background gap by whichever call
    // runs next, double-counting it. This is safe specifically because JS is single-threaded and
    // this function is fully synchronous — two calls to runTick can never overlap, so the next call
    // (whether from the interval or the visibilitychange listener) only ever starts after this one
    // has fully returned and already restamped lastTickRealTime, never mid-flight.
    const runTick = () => {
      const now = Date.now()
      const gapSeconds = (now - lastTickRealTime) / 1000

      if (gapSeconds > BACKGROUND_TICK_GAP_THRESHOLD_SECONDS) {
        const caughtUp = computeOfflineCatchUp(gapSeconds, stateRef.current)
        if (caughtUp) {
          setState(caughtUp.state)
          setOfflineProgress(caughtUp.offlineProgress)
          lastTickRealTime = Date.now()
          return
        }
      }

      setState(tickGame(TICK_RATE_MS / 1000, BUY_QUANTITY))
      lastTickRealTime = Date.now()
    }

    const intervalId = window.setInterval(runTick, TICK_RATE_MS)

    // Fires immediately on resume (foregrounding the tab/app, unlocking the phone, switching back
    // from another app) rather than waiting for the interval's own next scheduled firing, which a
    // fully suspended timer may never reach on its own until some other event wakes the page.
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') runTick()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveGameState(state)
  }, [state])

  // Ops sparkline sampling — only while Supporter is unlocked (avoids useless work for free).
  useEffect(() => {
    if (!savesMeta.supporterUnlocked) {
      setOpsSamples([])
      return undefined
    }
    const sample = () => {
      const s = stateRef.current
      setOpsSamples(prev => {
        const next = [
          ...prev,
          {
            t: Date.now(),
            money: s.resources?.[MONEY_ID] ?? 0,
            prestigePoints: s.prestige?.points ?? 0,
          },
        ]
        return next.length > OPS_SAMPLE_CAP ? next.slice(next.length - OPS_SAMPLE_CAP) : next
      })
    }
    sample()
    const id = window.setInterval(sample, OPS_SAMPLE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [savesMeta.supporterUnlocked, savesMeta.activeSlotId])

  const actions = useMemo(() => ({
    buyTierQuantity: tierId => setState(buyTierQuantity(tierId, BUY_QUANTITY)),
    buyTickspeedMultiplier: tierId => setState(buyTickspeedMultiplier(tierId)),
    buySmartAutobuyer: tierId => setState(buySmartAutobuyer(tierId)),
    buyAutoPrestige: () => setState(buyAutoPrestige),
    buyAutoPrestigeAutobuyer: () => setState(buyAutoPrestigeAutobuyer),
    buyGlobalTickspeedMultiplier: () => setState(buyGlobalTickspeedMultiplier),
    buyPrestigeSpeedBonus: () => setState(buyPrestigeSpeedBonus),
    prestige: () => setState(prestigeGame),
    speedUp: () => setState(speedUpGame),
    overclock: () => setState(overclockGame),
    buyAutoSpeedUp: () => setState(buyAutoSpeedUp),
    buyTickspeedAutobuyer: () => setState(buyTickspeedAutobuyer),
    consumeXpForLastTierTickspeed: amount => setState(consumeXpForLastTierTickspeed(amount)),
    setAutoSpeedUpEnabled: enabled => setState(setAutoSpeedUpEnabled(enabled)),
    setAutoGlobalTickspeedEnabled: enabled => setState(setAutoGlobalTickspeedEnabled(enabled)),
    setAutoPrestigeEnabled: enabled => setState(setAutoPrestigeEnabled(enabled)),
    setAutoPrestigeAutobuyerEnabled: enabled => setState(setAutoPrestigeAutobuyerEnabled(enabled)),
    setAutobuyerEnabled: (tierId, enabled) => setState(setAutobuyerEnabled(tierId, enabled)),
    setTierTickspeedAutobuyerEnabled: (tierId, enabled) => setState(setTierTickspeedAutobuyerEnabled(tierId, enabled)),
    tapIntroBit: () => setState(tapIntroBit),
    combineIntroByte: () => setState(combineIntroByte),
    pickIntroCapacityMilestone: () => setState(pickIntroCapacityMilestone),
    pickIntroProductionMilestone: () => setState(pickIntroProductionMilestone),
    convertIntroBitsToKilobytes: () => setState(convertIntroBitsToKilobytes),
    startDiskBuild: () => setState(startDiskBuild),
    redeemDisk: capacityBits => setState(redeemDisk(capacityBits)),
    releaseDiskCacheBlock: capacityBits => setState(releaseDiskCacheBlock(capacityBits)),
    activateComputeBoost: (boostType, tierIndex) => setState(activateComputeBoost(boostType, tierIndex)),
    stackComputeBoost: () => setState(stackComputeBoost),
    reclaimComputeBoost: () => setState(reclaimComputeBoost),
    mergeComputeCoresIntoNode: () => setState(mergeComputeCoresIntoNode),
    mergeComputeNodesIntoCluster: () => setState(mergeComputeNodesIntoCluster),
    mergeComputeClustersIntoNetwork: () => setState(mergeComputeClustersIntoNetwork),
    mergeComputeNetworksIntoGrid: () => setState(mergeComputeNetworksIntoGrid),
    mergeComputeGridsIntoFabric: () => setState(mergeComputeGridsIntoFabric),
    mergeComputeFabricsIntoCloud: () => setState(mergeComputeFabricsIntoCloud),
    mergeComputeCloudsIntoDatacenter: () => setState(mergeComputeCloudsIntoDatacenter),
    mergeComputeDatacentersIntoSupercomputer: () => setState(mergeComputeDatacentersIntoSupercomputer),
    mergeComputeSupercomputersIntoMegacomputer: () => setState(mergeComputeSupercomputersIntoMegacomputer),
    claimComputeCore: () => setState(claimComputeCore),
    enableAutoClaimCore: () => setState(enableAutoClaimCore),
    enableAutoMergeCoresIntoNode: () => setState(enableAutoMergeCoresIntoNode),
    enableAutoMergeNodesIntoCluster: () => setState(enableAutoMergeNodesIntoCluster),
    enableAutoMergeClustersIntoNetwork: () => setState(enableAutoMergeClustersIntoNetwork),
    enableAutoMergeNetworksIntoGrid: () => setState(enableAutoMergeNetworksIntoGrid),
    enableAutoMergeGridsIntoFabric: () => setState(enableAutoMergeGridsIntoFabric),
    enableAutoMergeFabricsIntoCloud: () => setState(enableAutoMergeFabricsIntoCloud),
    enableAutoMergeCloudsIntoDatacenter: () => setState(enableAutoMergeCloudsIntoDatacenter),
    enableAutoMergeDatacentersIntoSupercomputer: () => setState(enableAutoMergeDatacentersIntoSupercomputer),
    enableAutoMergeSupercomputersIntoMegacomputer: () => setState(enableAutoMergeSupercomputersIntoMegacomputer),
    startComputeCoresMerge: () => setState(startComputeCoresMerge),
    startComputeNodesMerge: () => setState(startComputeNodesMerge),
    startComputeClustersMerge: () => setState(startComputeClustersMerge),
    startComputeNetworksMerge: () => setState(startComputeNetworksMerge),
    startComputeGridsMerge: () => setState(startComputeGridsMerge),
    startComputeFabricsMerge: () => setState(startComputeFabricsMerge),
    startComputeCloudsMerge: () => setState(startComputeCloudsMerge),
    startComputeDatacentersMerge: () => setState(startComputeDatacentersMerge),
    startComputeSupercomputersMerge: () => setState(startComputeSupercomputersMerge),
    pinMuseumEntry: entryId => setState(pinMuseumEntry(entryId)),
    unpinMuseumEntry: entryId => setState(unpinMuseumEntry(entryId)),
  }), [])

  const resetGame = useCallback(() => {
    clearGameState()
    setState(createInitialGameState())
    setOfflineProgress(null)
    setOpsSamples([])
    refreshSavesUi()
  }, [refreshSavesUi])

  const dismissOfflineProgress = useCallback(() => setOfflineProgress(null), [])

  const switchSaveSlot = useCallback(slotId => {
    saveGameState(stateRef.current)
    const result = setActiveSaveSlot(slotId)
    if (!result.ok) return result
    if (result.already) {
      refreshSavesUi()
      return result
    }
    const loaded = loadGameState()
    const nextState = loaded ?? createInitialGameState()
    const lastSaveTimestamp = loadLastSaveTimestamp()
    const elapsedRealSeconds = lastSaveTimestamp ? (Date.now() - lastSaveTimestamp) / 1000 : 0
    const caughtUp = computeOfflineCatchUp(elapsedRealSeconds, nextState)
    setState(caughtUp?.state ?? nextState)
    setOfflineProgress(caughtUp?.offlineProgress ?? null)
    setOpsSamples([])
    refreshSavesUi()
    return result
  }, [refreshSavesUi])

  const renameActiveSaveSlot = useCallback((slotId, name) => {
    const result = renameSaveSlot(slotId, name)
    if (result.ok) refreshSavesUi()
    return result
  }, [refreshSavesUi])

  const redeemUnlockCode = useCallback(code => {
    const result = redeemSupporterUnlockCode(code)
    if (result.ok) refreshSavesUi()
    return result
  }, [refreshSavesUi])

  const purchaseSupporterDummy = useCallback(() => {
    const result = completeDummySupporterPurchase()
    if (result.ok) refreshSavesUi()
    return result
  }, [refreshSavesUi])

  return {
    actions,
    dismissOfflineProgress,
    offlineProgress,
    opsSamples,
    purchaseSupporterDummy,
    redeemUnlockCode,
    renameSaveSlot: renameActiveSaveSlot,
    resetGame,
    saveSlots,
    savesMeta,
    state,
    switchSaveSlot,
  }
}
