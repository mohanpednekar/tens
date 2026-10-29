import BoostTimerBar, { COMPUTE_BOOST_DISPLAY, describeCoveredTiers, formatPresetDuration } from 'components/BoostTimerBar'
import Button, { ButtonContent, VisuallyHidden } from 'components/Button'
import { canActivateComputeBoost, canStackComputeBoost, getUnusedComputeBoostStacks, formatAmount, formatOfflineDuration, getComputeBoostTierDurationSeconds, getComputeBoostTierMultiplier, getComputeFieldEffectiveCap, getComputeReserveHeld, isComputeBoostTurnAvailable, isComputeMergeStartAvailableAtBoundary, isDiskFillAvailable, isProvisionDiskAvailable, isStackComputeBoostTurnAvailable } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO, COMPUTE_MERGE_RESERVE_CAP } from 'game/layers'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${props => props.theme.space.xl} + env(safe-area-inset-top))
    ${props => props.theme.space.lg} ${props => props.theme.space.xl};
  color: ${props => props.theme.color.text};
`

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`

const Title = styled.h1`
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  margin: 0;
`

const StatusText = styled.p`
  margin: 0;
  color: ${props => props.theme.color.textMuted};
  text-align: center;
`

// One block per compute-ladder entity — two rows apiece (see TierHeaderRow/TierMergeRow below),
// replacing the old single-row-per-tier layout now that a boundary's own reserve-merge slots (see
// issue #321) need a dedicated second row once auto-merge is unlocked for it.
const TierBlocksGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

const TierBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => (props.$spacious ? props.theme.space.sm : '4px')};
  width: 100%;
  padding: ${props => (props.$spacious ? '0.7rem 0.8rem' : '0.2rem 0.6rem')};
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.color.surface};
  border: 1px solid ${props => (props.$selected ? props.theme.color.warn : props.theme.color.border)};
`

// One card for everything that acts on a Boost (status, funding tier, presets, stack/forfeit,
// auto) so the tier list below reads as "pick what powers it".
const BoostCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  width: 100%;
  padding: ${props => props.theme.space.md};
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.color.surface};
  border: 1px solid ${props => props.theme.color.border};
`

// Filled dot = the tier that powers boosts.
const SelectMarker = styled.span`
  flex: 0 0 auto;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  border: 1.5px solid ${props => (props.$selected ? props.theme.color.warn : props.theme.color.textMuted)};
  background: ${props => (props.$selected ? props.theme.color.warn : 'transparent')};
`

// Row 1: tier name/symbol plus a row of COMPUTE_ENTITY_CAP (10) normal slots — "First row shows 10
// slots ... also has Name and symbol of the tier" (issue #321).
const TierHeaderRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

// The symbol/label/slots portion of row 1 is its own clickable button — issue #326: clicking any
// tier row selects it, showing the 3 Compute Boost presets inside that tier's own block (one tier
// at a time — see ComputePage below), scaled to that tier's own power (duration stays at the base
// preset — issue #363). Kept as a SEPARATE element from the auto-claim IconButton that sometimes
// shares this row (Cores only) rather than making the whole TierHeaderRow itself a button, since
// nesting a <button> (auto-claim) inside another <button> is invalid HTML.
const TierSelectButton = styled.button`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: ${props => props.theme.space.xs};
  min-width: 0;
  border: none;
  border-radius: ${props => props.theme.radius.sm};
  background: none;
  padding: 4px;
  cursor: pointer;
  color: inherit;
  font: inherit;
  text-align: left;

  &:hover {
    filter: brightness(1.15);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

const TierLabel = styled.span`
  flex: 0 0 auto;
  font-weight: 600;
  font-size: ${props => (props.$spacious ? '1.05em' : '0.9em')};
  white-space: nowrap;
`

// A fixed width (rather than the symbol's own natural glyph width) keeps every tier's label
// starting at the same horizontal offset — plain-text symbols (⬡, ▦) render noticeably narrower
// than full-color emoji (🔗, 🧩, 🏢, …), which otherwise shifts the label a few px left for those
// tiers and reads as misaligned across the ten rows.
const TierSymbol = styled.span`
  flex: 0 0 auto;
  width: 1.4em;
  font-size: 1em;
  text-align: center;
`

const SlotsRow = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  justify-content: flex-end;
  gap: 2px;
  min-width: 0;
`

// A single discrete normal-capacity slot (one of COMPUTE_ENTITY_CAP) — filled once its index is
// below the current count, matching the same "never partially filled per-square" convention
// StoragePage's own DiskSquare uses, just non-interactive (a plain status square, not a button).
const NormalSlot = styled.span`
  flex: 0 0 auto;
  width: ${props => (props.$spacious ? '1.1rem' : '0.85rem')};
  height: ${props => (props.$spacious ? '1.1rem' : '0.85rem')};
  border-radius: ${props => props.theme.radius.sm};
  border: 1.2px solid ${props => (props.$filled ? props.theme.color.accent : props.theme.color.surfaceSunken)};
  background: ${props => (props.$filled ? props.theme.color.surfaceRaised : 'transparent')};
`

// Row 2: pre-unlock, an instant Merge button + an Unlock Auto-merge button; post-unlock, the 8
// auto-merge slots themselves, clickable as an instant manual merge — "2nd row has merge button and
// unlock automerge button (in place of the reserved slots before unlocking them)" (issue #321).
// The post-unlock ReserveSlotsRow branch stretches itself via flex: 1 1 auto and right-aligns its
// own slots internally, filling the row exactly like MainPage's own tier-row Buy/Upgrade pair;
// justify-content: flex-end keeps that branch's slots pinned right regardless.
const TierMergeRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  flex-wrap: nowrap;
  gap: ${props => (props.$spacious ? props.theme.space.sm : props.theme.space.xs)};
  width: 100%;
`

const CompactButton = styled(Button)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`

// Row 2's pre-unlock Merge/Auto-merge pair — each fills exactly half the row (flex: 1 1 0,
// width: 100%), the same "two equal-width buttons split the row" look MainPage's own tier rows use
// for their Upgrade/Buy pair, rather than small icon-only squares hugging one edge with the rest of
// the row left empty.
const TierActionButton = styled(CompactButton)`
  flex: 1 1 0;
  width: 100%;
  ${props => props.$spacious && 'font-size: 0.9em; padding: 0.7em 0.8em;'}
`

const ReserveSlotsRow = styled.button`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  min-width: 0;
  border: 1px solid ${props => (props.$clickable ? props.theme.color.accent : 'transparent')};
  border-radius: ${props => props.theme.radius.sm};
  background: ${props => (props.$clickable ? props.theme.color.surfaceRaised : 'none')};
  padding: 2px 4px;
  color: inherit;
  font: inherit;
  cursor: ${props => (props.$clickable ? 'pointer' : 'default')};

  &:hover:not(:disabled) {
    filter: brightness(1.15);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

// A reserve-pool slot (one of COMPUTE_MERGE_RESERVE_CAP, 8) — three visual states: empty (idle,
// nothing banked yet), filled (gradually accumulating toward the next automatic merge — see
// engine.js's getComputeReserveHeld, fed by continued Booster purchases/lower-tier merges past the
// primary COMPUTE_ENTITY_CAP slots), or merging (a merge actually in flight, timing down to
// completion — the same "warn" color the countdown text itself uses, distinct from the plain
// accent used for "banked but not yet committed" so the two don't read as the same state).
const ReserveSlot = styled.span`
  flex: 0 0 auto;
  width: 0.85rem;
  height: 0.85rem;
  border-radius: ${props => props.theme.radius.sm};
  border: 1.2px solid ${props => (props.$merging ? props.theme.color.warn : props.$filled ? props.theme.color.accent : props.theme.color.surfaceSunken)};
  background: ${props => (props.$merging ? props.theme.color.warn : props.$filled ? props.theme.color.surfaceRaised : 'transparent')};
`

// Left-edge label naming the row as auto-merge slots ("🤖 Auto-merge"), switching to an accent
// "🤖 ⬆ 8→1 <output>" while an instant manual merge is available, so the row reads as a button.
const MergeCue = styled.span`
  flex: 0 0 auto;
  margin-right: auto;
  font-size: 0.78em;
  font-weight: 600;
  white-space: nowrap;
  color: ${props => (props.$active ? props.theme.color.accent : props.theme.color.textMuted)};
`

const MergeCountdown = styled.span`
  flex: 0 0 auto;
  font-size: 0.78em;
  font-family: ${props => props.theme.font.display};
  color: ${props => props.theme.color.warn};
`

// Issue #326: which compute-ladder tier is currently armed to fund a Boost — a small status line
// above the 3 preset buttons so it's clear what clicking one would spend/grant.
const ArmedStatusText = styled.p`
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
  text-align: center;
`

// The 3 preset buttons row — issue #326: only enabled once a tier row below has been clicked to
// arm them (see ArmedStatusText/TierSelectButton), scaled to that tier's own power (flat duration).
const BoostRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.space.sm};
  width: 100%;

  > button {
    flex: 1 1 0;
    min-width: 0;
  }
`

const AutoBoostRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

const AutoBoostLabel = styled.p`
  margin: 0;
  color: ${props => props.theme.color.textMuted};
  font-size: ${props => props.theme.type.scale.sm.size};
  text-align: center;
`

// The full ten-tier progression this page walks top to bottom. Every row past Cores through
// Supercomputers shares the exact same shape: a merge boundary into the tier above it, which —
// once that boundary's auto-merge is unlocked (see intro.autoMergeCoresIntoNode/
// autoMergeNodesIntoCluster/… in engine.js) — moves to the "🤖 Auto-merge" slot row: tapping it still merges
// instantly, while engine.js's automatic merge uses the timed reserve pool (see issue #321). Core → Node is included as an ordinary
// boundary here, same as every other one. Cores themselves are obtained by buying Boosters from
// the matching Data Lake on Foundry (buyBooster — spent from that lake's own banked units, not
// minted from Memory); the buy/auto-buy control itself lives on Foundry's DataLakePanel, not here
// — the earlier "Claim Core"/auto-claim mechanic was removed once Data Lakes superseded it.
// Megacomputer (the last tier) has no merge row at all — nothing to merge into or automate past it
// (see issue #280's "Out of scope").
const ENTITY_ROWS = [
  {
    key: 'core',
    label: 'Cores',
    symbol: '⬡',
    countField: 'computeCores',
    mergeOutputLabel: 'Node',
    mergeOutputField: 'computeNodes',
    mergeAction: 'mergeComputeCoresIntoNode',
    autoFlagField: 'autoMergeCoresIntoNode',
    autoCostLabel: 'Nodes',
    autoCostField: 'computeNodes',
    enableAutoAction: 'enableAutoMergeCoresIntoNode',
    autoAriaLabel: 'enable auto-merge for Cores into Nodes',
    startAction: 'startComputeCoresMerge',
    timerField: 'computeCoresMergeRemainingSeconds',
  },
  {
    key: 'nodesIntoCluster',
    label: 'Nodes',
    symbol: '🔗',
    countField: 'computeNodes',
    mergeOutputLabel: 'Cluster',
    mergeOutputField: 'computeClusters',
    mergeAction: 'mergeComputeNodesIntoCluster',
    autoFlagField: 'autoMergeNodesIntoCluster',
    autoCostLabel: 'Clusters',
    autoCostField: 'computeClusters',
    enableAutoAction: 'enableAutoMergeNodesIntoCluster',
    autoAriaLabel: 'enable auto-merge for Nodes into Clusters',
    startAction: 'startComputeNodesMerge',
    timerField: 'computeNodesMergeRemainingSeconds',
  },
  {
    key: 'clustersIntoNetwork',
    label: 'Clusters',
    symbol: '🧩',
    countField: 'computeClusters',
    mergeOutputLabel: 'Network',
    mergeOutputField: 'computeNetworks',
    mergeAction: 'mergeComputeClustersIntoNetwork',
    autoFlagField: 'autoMergeClustersIntoNetwork',
    autoCostLabel: 'Networks',
    autoCostField: 'computeNetworks',
    enableAutoAction: 'enableAutoMergeClustersIntoNetwork',
    autoAriaLabel: 'enable auto-merge for Clusters into Networks',
    startAction: 'startComputeClustersMerge',
    timerField: 'computeClustersMergeRemainingSeconds',
  },
  {
    key: 'networksIntoGrid',
    label: 'Networks',
    symbol: '🕸️',
    countField: 'computeNetworks',
    mergeOutputLabel: 'Grid',
    mergeOutputField: 'computeGrids',
    mergeAction: 'mergeComputeNetworksIntoGrid',
    autoFlagField: 'autoMergeNetworksIntoGrid',
    autoCostLabel: 'Grids',
    autoCostField: 'computeGrids',
    enableAutoAction: 'enableAutoMergeNetworksIntoGrid',
    autoAriaLabel: 'enable auto-merge for Networks into Grids',
    startAction: 'startComputeNetworksMerge',
    timerField: 'computeNetworksMergeRemainingSeconds',
  },
  {
    key: 'gridsIntoFabric',
    label: 'Grids',
    symbol: '▦',
    countField: 'computeGrids',
    mergeOutputLabel: 'Fabric',
    mergeOutputField: 'computeFabrics',
    mergeAction: 'mergeComputeGridsIntoFabric',
    autoFlagField: 'autoMergeGridsIntoFabric',
    autoCostLabel: 'Fabrics',
    autoCostField: 'computeFabrics',
    enableAutoAction: 'enableAutoMergeGridsIntoFabric',
    autoAriaLabel: 'enable auto-merge for Grids into Fabrics',
    startAction: 'startComputeGridsMerge',
    timerField: 'computeGridsMergeRemainingSeconds',
  },
  {
    key: 'fabricsIntoCloud',
    label: 'Fabrics',
    symbol: '🧵',
    countField: 'computeFabrics',
    mergeOutputLabel: 'Cloud',
    mergeOutputField: 'computeClouds',
    mergeAction: 'mergeComputeFabricsIntoCloud',
    autoFlagField: 'autoMergeFabricsIntoCloud',
    autoCostLabel: 'Clouds',
    autoCostField: 'computeClouds',
    enableAutoAction: 'enableAutoMergeFabricsIntoCloud',
    autoAriaLabel: 'enable auto-merge for Fabrics into Clouds',
    startAction: 'startComputeFabricsMerge',
    timerField: 'computeFabricsMergeRemainingSeconds',
  },
  {
    key: 'cloudsIntoDatacenter',
    label: 'Clouds',
    symbol: '☁️',
    countField: 'computeClouds',
    mergeOutputLabel: 'Datacenter',
    mergeOutputField: 'computeDatacenters',
    mergeAction: 'mergeComputeCloudsIntoDatacenter',
    autoFlagField: 'autoMergeCloudsIntoDatacenter',
    autoCostLabel: 'Datacenters',
    autoCostField: 'computeDatacenters',
    enableAutoAction: 'enableAutoMergeCloudsIntoDatacenter',
    autoAriaLabel: 'enable auto-merge for Clouds into Datacenters',
    startAction: 'startComputeCloudsMerge',
    timerField: 'computeCloudsMergeRemainingSeconds',
  },
  {
    key: 'datacentersIntoSupercomputer',
    label: 'Datacenters',
    symbol: '🏢',
    countField: 'computeDatacenters',
    mergeOutputLabel: 'Supercomputer',
    mergeOutputField: 'computeSupercomputers',
    mergeAction: 'mergeComputeDatacentersIntoSupercomputer',
    autoFlagField: 'autoMergeDatacentersIntoSupercomputer',
    autoCostLabel: 'Supercomputers',
    autoCostField: 'computeSupercomputers',
    enableAutoAction: 'enableAutoMergeDatacentersIntoSupercomputer',
    autoAriaLabel: 'enable auto-merge for Datacenters into Supercomputers',
    startAction: 'startComputeDatacentersMerge',
    timerField: 'computeDatacentersMergeRemainingSeconds',
  },
  {
    key: 'supercomputersIntoMegacomputer',
    label: 'Supercomputers',
    symbol: '🖥️',
    countField: 'computeSupercomputers',
    mergeOutputLabel: 'Megacomputer',
    mergeOutputField: 'computeMegacomputers',
    mergeAction: 'mergeComputeSupercomputersIntoMegacomputer',
    autoFlagField: 'autoMergeSupercomputersIntoMegacomputer',
    autoCostLabel: 'Megacomputers',
    autoCostField: 'computeMegacomputers',
    enableAutoAction: 'enableAutoMergeSupercomputersIntoMegacomputer',
    autoAriaLabel: 'enable auto-merge for Supercomputers into Megacomputers',
    startAction: 'startComputeSupercomputersMerge',
    timerField: 'computeSupercomputersMergeRemainingSeconds',
  },
  {
    key: 'megacomputer',
    label: 'Megacomputers',
    symbol: '👑',
    countField: 'computeMegacomputers',
    // The top of the chain — no merge/auto row (see issue #280's "Out of scope").
  },
]

// Whether merging COMPUTE_MERGE_RATIO of `input` into 1 more of `output` would do anything right
// now — same "at least one full group, and room under the output's effective cap" shape the
// engine's own mergeComputeEntities enforces — this is only a UI mirror of that gate, not a
// replacement for it; the engine re-validates on every call regardless (see "Security notes" in
// CLAUDE.md).
const canMerge = (input, output, outputCap) => input >= COMPUTE_MERGE_RATIO && output < outputCap

// Compute's own dedicated screen — split out of ByteFoundryPage (see "Byte Foundry" in CLAUDE.md)
// once revealed (isComputeCoreConversionUnlocked), reached via AppNav. Activation is still gated
// by the Byte Foundry's forced priority order — Disk Fill > Speed > Provision Disk > Compute —
// so a preset can show disabled here even while mechanically activatable
// (canActivateComputeBoost), if something ranked above Compute (which lives back on
// ByteFoundryPage/StoragePage) currently outranks it. The ten-tier merge chain (Core → Node →
// Cluster → Network → Grid → Fabric → Cloud → Datacenter → Supercomputer → Megacomputer, see
// issues #280/#321) lives here too, alongside Boost — one page for everything Compute, rather
// than a second dedicated screen. Render order top to bottom: a card with the current boost
// effect, the active boost timer bar (Pop/Forfeit, Stack) and Auto-Boost preference, THEN the tier rows — the one selected
// tier shows the armed status line + 3 preset buttons inside its own block, below its merge row.
// Each tier renders two rows (see ENTITY_ROWS/TierBlock above): row 1 is COMPUTE_ENTITY_CAP (10)
// normal slots plus the tier's name/symbol; row 2 is, pre-unlock, an instant Merge button + an
// Unlock Auto-merge button, or, post-unlock, the "🤖 Auto-merge" row of COMPUTE_MERGE_RESERVE_CAP
// (8) auto-merge slots — clicking it instantly merges 8 → 1 whenever isCompute*MergeStartAvailable
// allows it. Only the automatic merge (at the full extended cap) commits 8 tokens to the reserve
// and counts down that boundary's live duration (see getComputeMergeDurationSeconds in the engine).
// "Compute" names the page/feature only — individual entities drop the word (Core, Node,
// Cluster, … not "Compute Core"/"Compute Node"/…). The merge section itself only renders once
// `intro.computeMergePageUnlocked` — the page reveals as soon as Compute is unlocked
// (isComputeCoreConversionUnlocked, well before 8 Cores are possible), but the merge chain stays
// hidden behind its own later, one-time latch until the player has actually earned enough Cores to
// use it (see engine.js's latchComputeMergePageIfNeeded for where that latch flips).
const ComputePage = ({ game }) => {
  const { actions, state } = game
  const { intro } = state
  // Issue #326: which compute-ladder tier is armed to fund the next Boost activation — purely
  // local UI state (free to change, no cost). Navigating here pre-selects the active boost's own
  // tier, so its presets open on arrival; clicking the selected tier again collapses it. Before the
  // merge chain unlocks, Cores (tier 1) is the only tier that can ever hold a balance at all, so
  // it's armed implicitly without needing a clickable row.
  const [selectedBoostTierIndex, setSelectedBoostTierIndex] = useState(
    () => (intro.computeBoostType ? (intro.computeBoostTierIndex ?? 1) : null),
  )

  // A click anywhere outside every tier block deselects, collapsing the presets. Clicks inside a
  // tier block (its select button, presets, merge row) are left to that block's own handlers.
  // Capture phase + composedPath: decided before React re-renders, so a click that removes its own
  // target (e.g. Unlock Auto-merge swapping in the auto-merge row) still counts as inside.
  useEffect(() => {
    if (selectedBoostTierIndex === null) return undefined
    const deselectOnOutsideClick = event => {
      const insideTier = event.composedPath().some(node => node.dataset?.boostTier !== undefined)
      if (!insideTier) setSelectedBoostTierIndex(null)
    }
    document.addEventListener('click', deselectOnOutsideClick, true)
    return () => document.removeEventListener('click', deselectOnOutsideClick, true)
  }, [selectedBoostTierIndex])

  const blockedByPriority = isDiskFillAvailable(state) || isProvisionDiskAvailable(state)
  const boostActive = Boolean(intro.computeBoostType)
  // Once a boost is active, its own funding tier is what Stack/Pop act on, regardless of which
  // row a player clicks next (issue #326 — Stack always extends the currently active boost).
  // `?? 1` defensively falls back to Core for a save from before issue #326 existed.
  const activeTierIndex = boostActive ? (intro.computeBoostTierIndex ?? 1) : null
  const activeRow = activeTierIndex ? ENTITY_ROWS[activeTierIndex - 1] : null
  // A tier row the player clicks always arms the presets — even mid-boost, where picking a
  // different tier arms a confirmed forfeit-and-switch (canActivateComputeBoost allows it at 1
  // stack).
  const armedTierIndex = intro.computeMergePageUnlocked ? selectedBoostTierIndex : 1
  const armedRow = armedTierIndex ? ENTITY_ROWS[armedTierIndex - 1] : null

  // The armed tier's 3 presets — rendered inside the selected tier block (only one at a time), or
  // in the top card before the merge chain unlocks (Cores armed implicitly, no tier rows yet).
  const boostPresets = armedRow && (
    <>
      <ArmedStatusText title={`Boosts ${describeCoveredTiers(armedTierIndex, 'name')}`}>
        {`Boosts ${describeCoveredTiers(armedTierIndex)}`}
      </ArmedStatusText>
      <BoostRow role="group" aria-label="compute boost">
        {Object.keys(COMPUTE_BOOST_PRESETS).map(boostType => {
          const multiplier = getComputeBoostTierMultiplier(boostType, armedTierIndex)
          const durationSeconds = getComputeBoostTierDurationSeconds(boostType, armedTierIndex)
          const needsForfeit = boostActive
          const sameAsActive = needsForfeit
            && intro.computeBoostType === boostType
            && activeTierIndex === armedTierIndex
          const activeLabel = COMPUTE_BOOST_DISPLAY[intro.computeBoostType]?.label ?? intro.computeBoostType
          const nextLabel = COMPUTE_BOOST_DISPLAY[boostType].label
          const unusedStacks = getUnusedComputeBoostStacks(state)
          // Same preset + tier as the running boost → this button stacks it. A different one →
          // confirmed switch: unused stacks are refunded, the running stack is forfeited.
          const turnAvailable = sameAsActive
            ? isStackComputeBoostTurnAvailable(state)
            : isComputeBoostTurnAvailable(state, boostType, armedTierIndex, needsForfeit)
          const blockedTitle = 'Take a higher-priority upgrade first (Disk Fill or Provision Disk)'
          const spendText = `×${multiplier} production, ${formatPresetDuration(durationSeconds)}`

          return (
            <CompactButton
              key={boostType}
              aria-label={sameAsActive
                ? `stack ${boostType} compute boost`
                : needsForfeit
                  ? `forfeit active boost and activate ${boostType} compute boost`
                  : `activate ${boostType} compute boost`}
              disabled={!turnAvailable}
              onClick={() => {
                if (sameAsActive) {
                  actions.stackComputeBoost()
                  return
                }
                if (needsForfeit) {
                  const refundNote = unusedStacks > 0 ? ` (${unusedStacks} unused stack${unusedStacks === 1 ? '' : 's'} refunded)` : ''
                  if (!window.confirm(
                    `Forfeit the active ${activeLabel} boost${refundNote}, and start ${nextLabel}?`,
                  )) return
                  actions.activateComputeBoost(boostType, armedTierIndex, true)
                  return
                }
                actions.activateComputeBoost(boostType, armedTierIndex, false)
              }}
              title={
                sameAsActive
                  ? (canStackComputeBoost(state) && blockedByPriority ? blockedTitle : `Stack ${nextLabel}: add ${spendText} — up to ${COMPUTE_BOOST_MAX_STACKS}x`)
                  : canActivateComputeBoost(state, boostType, armedTierIndex, needsForfeit) && blockedByPriority
                    ? blockedTitle
                    : needsForfeit
                      ? `Switch to ${nextLabel}: forfeit the running ${activeLabel} stack, refund unused stacks, then ${spendText} — asks for confirmation`
                      : `${nextLabel}: ${spendText}`
              }
              type="button"
              variant="prestige"
            >
              <ButtonContent>{`${sameAsActive ? '+ ' : ''}${COMPUTE_BOOST_DISPLAY[boostType].icon} ×${multiplier} · ${formatPresetDuration(durationSeconds)}`}</ButtonContent>
            </CompactButton>
          )
        })}
      </BoostRow>
    </>
  )

  return (
    <RootDiv>
      <Header>
        <Title>⚡ Boosters</Title>
      </Header>

      {boostActive && <BoostTimerBar actions={actions} state={state} />}
      {!boostActive && (
        <ArmedStatusText>
          {intro.computeMergePageUnlocked && !armedRow ? 'No boost running · pick a tier ↓' : 'No boost running'}
        </ArmedStatusText>
      )}

      {(!intro.computeMergePageUnlocked || state.computeAutoBoostUnlocked) && (
      <BoostCard aria-label="boost">
      {!intro.computeMergePageUnlocked && boostPresets}

      {state.computeAutoBoostUnlocked && (
      <AutoBoostRow aria-label="compute auto boost">
        <AutoBoostLabel>
          Auto from biggest tier waiting on merge — preference:
        </AutoBoostLabel>
        <BoostRow role="group" aria-label="auto boost preference">
          {Object.keys(COMPUTE_BOOST_PRESETS).map(boostType => {
            const selected = (intro.computeAutoBoostType ?? 'standard') === boostType
            return (
              <CompactButton
                key={`auto-${boostType}`}
                aria-label={`set auto boost preference to ${boostType}`}
                aria-pressed={selected}
                onClick={() => actions.setComputeAutoBoostType(boostType)}
                title={`Auto-Boost preference: ${COMPUTE_BOOST_DISPLAY[boostType].label}${selected ? ' (selected)' : ''}`}
                type="button"
                variant={selected ? 'prestige' : 'neutral'}
              >
                <ButtonContent>{`${COMPUTE_BOOST_DISPLAY[boostType].icon}${selected ? ' ✓' : ''}`}</ButtonContent>
              </CompactButton>
            )
          })}
        </BoostRow>
      </AutoBoostRow>
      )}
      </BoostCard>
      )}

      {intro.computeMergePageUnlocked
        ? (
          <TierBlocksGroup aria-label="compute entities">
            {ENTITY_ROWS.map((row, rowIndex) => {
              const tierIndex = rowIndex + 1
              const count = intro[row.countField] ?? 0
              const hasMergeRow = Boolean(row.autoFlagField)
              const autoEnabled = hasMergeRow ? Boolean(intro[row.autoFlagField]) : false
              const autoCostHeld = row.autoCostField ? (intro[row.autoCostField] ?? 0) : 0
              const canEnableAuto = hasMergeRow && !autoEnabled && autoCostHeld >= COMPUTE_ENTITY_CAP
              const autoUnlockProgress = Math.min(100, (autoCostHeld / COMPUTE_ENTITY_CAP) * 100)
              const remainingSeconds = row.timerField ? (intro[row.timerField] ?? 0) : 0
              const merging = remainingSeconds > 0
              const outputCap = hasMergeRow ? getComputeFieldEffectiveCap(state, row.mergeOutputField) : COMPUTE_ENTITY_CAP
              const startAvailable = hasMergeRow && isComputeMergeStartAvailableAtBoundary(state, rowIndex)
              // Once auto-merge is unlocked, `count` can climb past COMPUTE_ENTITY_CAP into the
              // boundary's own gradually-filling reserve (see getComputeReserveHeld) — the primary
              // slot row always reads at most COMPUTE_ENTITY_CAP/COMPUTE_ENTITY_CAP; the "extra"
              // shows up as reserve fill in row 2 instead, never as an overflowing "14/10".
              const primaryHeld = Math.min(count, COMPUTE_ENTITY_CAP)
              const reserveHeld = hasMergeRow ? getComputeReserveHeld(state, tierIndex) : 0

              // Progressive disclosure: the merge/auto row only shows for the selected tier or when
              // there is something to act on or watch, so idle tiers stay a single line.
              const canMergeNow = autoEnabled ? startAvailable : canMerge(count, intro[row.mergeOutputField] ?? 0, outputCap)
              // Spacious layout for tiers not yet automated (always show their merge/auto row);
              // the tight layout is for already-automated tiers.
              const spacious = !autoEnabled
              const showDetail = hasMergeRow && (
                spacious || armedTierIndex === tierIndex || merging || canMergeNow || reserveHeld > 0
              )

              // Only unlocked tiers render: the first, anything held/automated/merging, one whose
              // predecessor can already feed it (or any higher tier is held), or the selected/active
              // boost tier — so the presets never vanish after a boost spends that tier's last unit.
              const prevRow = rowIndex > 0 ? ENTITY_ROWS[rowIndex - 1] : null
              const heldAtOrAbove = ENTITY_ROWS.some((r, i) => i >= rowIndex && (intro[r.countField] ?? 0) > 0)
              const unlocked = rowIndex === 0 || heldAtOrAbove || autoEnabled || merging
                || armedTierIndex === tierIndex || activeTierIndex === tierIndex
                || (prevRow && ((intro[prevRow.countField] ?? 0) >= COMPUTE_MERGE_RATIO || intro[prevRow.autoFlagField]))
              if (!unlocked) return null

              return (
                <TierBlock key={row.key} data-boost-tier aria-label={`${row.label} tier`} $selected={armedTierIndex === tierIndex} $spacious={spacious}>
                  <TierHeaderRow $spacious={spacious}>
                    <TierSelectButton
                      type="button"
                      onClick={() => setSelectedBoostTierIndex(armedTierIndex === tierIndex ? null : tierIndex)}
                      aria-pressed={armedTierIndex === tierIndex}
                      aria-label={`select ${row.label} to fund a compute boost`}
                      title={`Select ${row.label} to show its Boost presets — they'll boost ${describeCoveredTiers(tierIndex, 'name')}`}
                      $selected={armedTierIndex === tierIndex}
                    >
                      <SelectMarker aria-hidden="true" $selected={armedTierIndex === tierIndex} />
                      <TierSymbol aria-hidden="true">{row.symbol}</TierSymbol>
                      <TierLabel $spacious={spacious}>
                        {row.label}
                        <VisuallyHidden>{` ${formatAmount(primaryHeld)}/${COMPUTE_ENTITY_CAP}`}</VisuallyHidden>
                      </TierLabel>
                      <SlotsRow role="group" aria-label={`${row.label} slots`}>
                        {Array.from({ length: COMPUTE_ENTITY_CAP }, (_, index) => (
                          <NormalSlot key={index} $filled={index < primaryHeld} $spacious={spacious} aria-hidden="true" />
                        ))}
                      </SlotsRow>
                    </TierSelectButton>
                  </TierHeaderRow>

                  {showDetail && (
                  <TierMergeRow $spacious={spacious}>
                    {hasMergeRow && (
                      autoEnabled ? (
                        <ReserveSlotsRow
                          aria-label={
                            startAvailable
                              ? `instantly merge ${COMPUTE_MERGE_RATIO} ${row.label.toLowerCase()} into 1 ${row.mergeOutputLabel.toLowerCase()}, ${merging ? `auto-merge in progress, ${formatOfflineDuration(remainingSeconds)} left` : `${reserveHeld}/${COMPUTE_MERGE_RESERVE_CAP} auto-merge slots filled`}`
                              : merging
                                ? `${row.label} auto-merge in progress, ${formatOfflineDuration(remainingSeconds)} left`
                                : `${row.label} auto-merge slots, ${reserveHeld}/${COMPUTE_MERGE_RESERVE_CAP} filled`
                          }
                          disabled={!startAvailable}
                          onClick={startAvailable ? () => actions[row.startAction]() : undefined}
                          $clickable={startAvailable}
                          title={
                            startAvailable
                              ? `Merge now: instantly turn ${COMPUTE_MERGE_RATIO} ${row.label} into 1 ${row.mergeOutputLabel}. Auto-merge slots fill past ${COMPUTE_ENTITY_CAP} and merge on their own when all ${COMPUTE_MERGE_RESERVE_CAP} are full${merging ? ` (auto-merging: ${formatOfflineDuration(remainingSeconds)} left)` : ''}`
                              : merging
                                ? `Auto-merging: ${formatOfflineDuration(remainingSeconds)} left`
                                : (intro[row.mergeOutputField] ?? 0) >= outputCap
                                  ? `${row.mergeOutputLabel} is already at the max of ${outputCap}`
                                  : `Auto-merge slots: ${reserveHeld}/${COMPUTE_MERGE_RESERVE_CAP} — they merge on their own when full; tap to merge instantly once you hold ${COMPUTE_MERGE_RATIO} ${row.label}`
                          }
                          type="button"
                        >
                          <MergeCue aria-hidden="true" $active={startAvailable}>
                            {startAvailable ? `🤖 ⬆ ${COMPUTE_MERGE_RATIO}→1 ${row.mergeOutputLabel}` : '🤖 Auto-merge'}
                          </MergeCue>
                          {merging && <MergeCountdown>{formatOfflineDuration(remainingSeconds)}</MergeCountdown>}
                          {Array.from({ length: COMPUTE_MERGE_RESERVE_CAP }, (_, index) => (
                            <ReserveSlot key={index} $filled={index < reserveHeld} $merging={merging} aria-hidden="true" />
                          ))}
                        </ReserveSlotsRow>
                      ) : (
                        <>
                          <TierActionButton
                            aria-label={`merge ${COMPUTE_MERGE_RATIO} ${row.label.toLowerCase()} into 1 ${row.mergeOutputLabel.toLowerCase()}`}
                            disabled={!canMerge(count, intro[row.mergeOutputField] ?? 0, outputCap)}
                            onClick={() => actions[row.mergeAction]()}
                            title={
                              (intro[row.mergeOutputField] ?? 0) >= outputCap
                                ? `${row.mergeOutputLabel} is already at the max of ${outputCap}`
                                : `Merge: spend ${COMPUTE_MERGE_RATIO} ${row.label} for 1 ${row.mergeOutputLabel}`
                            }
                            type="button"
                            variant="prestige"
                            $spacious
                          >
                            <ButtonContent>{`⬆ ${COMPUTE_MERGE_RATIO}→1 ${row.mergeOutputLabel}`}</ButtonContent>
                          </TierActionButton>
                          <TierActionButton
                            aria-label={row.autoAriaLabel}
                            disabled={!canEnableAuto}
                            onClick={() => actions[row.enableAutoAction]()}
                            title={`Auto: sacrifice ${COMPUTE_ENTITY_CAP} of your ${formatAmount(autoCostHeld)} ${row.autoCostLabel} to permanently automate this step whenever ${row.label} is full, via a timed reserve merge`}
                            type="button"
                            variant="info"
                            $progress={autoUnlockProgress}
                            $spacious
                          >
                            <ButtonContent>{`🤖 ${formatAmount(autoCostHeld)}/${COMPUTE_ENTITY_CAP}`}</ButtonContent>
                          </TierActionButton>
                        </>
                      )
                    )}
                  </TierMergeRow>
                  )}

                  {armedTierIndex === tierIndex && boostPresets}
                </TierBlock>
              )
            })}
          </TierBlocksGroup>
          )
        : (
          <StatusText>
            {`⬡ ${formatAmount(intro.computeCores ?? 0)}/${COMPUTE_ENTITY_CAP} · 🔗 ${formatAmount(intro.computeNodes ?? 0)}/${COMPUTE_ENTITY_CAP}`}
          </StatusText>
          )}
    </RootDiv>
  )
}

export default ComputePage
