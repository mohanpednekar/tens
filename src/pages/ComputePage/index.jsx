import Button, { ButtonContent } from 'components/Button'
import { canActivateComputeBoost, canForfeitComputeBoost, canReclaimComputeBoost, canStartBoosterTransfer, formatAmount, formatOfflineDuration, getBoosterPurchaseCost, getComputeBoostTierDurationSeconds, getComputeBoostTierMultiplier, getComputeMergeDurationSeconds, getDataLakeAvailableUnits, getDataLakeTier, getDataLakeTierLabel, getDataLakeTransferCapacity, getNextComputeMergeDurationUpgradeIndex, isBandwidthAvailable, isComputeBoostTurnAvailable, isDiskFillAvailable, isProductionFrozen, isProvisionDiskAvailable, isStackComputeBoostTurnAvailable, isUpgradeComputeMergeDurationAvailable } from 'game/engine'
import { COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED } from 'game/layers'
import { useState } from 'react'
import styled from 'styled-components'

const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: ${props => props.theme.space.xl} ${props => props.theme.space.md};
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
  gap: 4px;
  width: 100%;
  padding: 0.3rem 0.6rem;
  border-radius: ${props => props.theme.radius.md};
  background: ${props => props.theme.color.surface};
  border: 1px solid ${props => props.theme.color.border};
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
// tier row arms the 3 Compute Boost presets above (the effects section renders before the tier
// rows — see ComputePage below), scaled to that tier's own power (duration stays at the base
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
  background: ${props => (props.$selected ? props.theme.color.surfaceRaised : 'none')};
  outline: ${props => (props.$selected ? `1.5px solid ${props.theme.color.warn}` : 'none')};
  padding: 2px 4px;
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
  font-size: 0.9em;
  white-space: nowrap;
`

const TierSymbol = styled.span`
  flex: 0 0 auto;
  font-size: 1em;
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
  width: 0.85rem;
  height: 0.85rem;
  border-radius: ${props => props.theme.radius.sm};
  border: 1.2px solid ${props => (props.$filled ? props.theme.color.accent : props.theme.color.surfaceSunken)};
  background: ${props => (props.$filled ? props.theme.color.surfaceRaised : 'transparent')};
`

// Row 2: pre-unlock, an instant Merge button + an Unlock Auto-merge button; post-unlock, the 8
// reserve slots themselves, clickable as the manual-start trigger — "2nd row has merge button and
// unlock automerge button (in place of the reserved slots before unlocking them)" (issue #321).
const TierMergeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

const CompactButton = styled(Button)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`

const IconButton = styled(CompactButton)`
  width: 1.9em;
  padding: 0.3em;
`

const ReserveSlotsRow = styled.button`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  min-width: 0;
  border: none;
  background: none;
  padding: 0;
  cursor: ${props => (props.$clickable ? 'pointer' : 'default')};

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

// A reserve-pool slot (one of COMPUTE_MERGE_RESERVE_CAP, 8) — always either entirely empty (idle,
// nothing committed) or entirely filled (a merge in flight, timing down to completion) since the
// reserve only ever fills atomically, never partially — see engine.js's startComputeMergeReserve.
const ReserveSlot = styled.span`
  flex: 0 0 auto;
  width: 0.85rem;
  height: 0.85rem;
  border-radius: ${props => props.theme.radius.sm};
  border: 1.2px solid ${props => (props.$merging ? props.theme.color.warn : props.theme.color.surfaceSunken)};
  background: ${props => (props.$merging ? props.theme.color.warn : 'transparent')};
`

const MergeCountdown = styled.span`
  flex: 0 0 auto;
  font-size: 0.78em;
  font-family: ${props => props.theme.font.display};
  color: ${props => props.theme.color.warn};
`

// In-flight Data Lake Booster transfer count + soonest completion (see
// startBoosterTransfer/tickDataLakeTransfers in engine.js) — same compact treatment as
// MergeCountdown above, next to the Booster IconButton rather than a reserve-slots row since a
// lake's transfer concurrency (DATA_LAKE_TRANSFER_CAPACITY_MAX, up to 3) has no slot squares of
// its own to render into.
const TransferStatus = styled.span`
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
    flex: 1 1 auto;
    min-width: 0;
  }
`

// Issue #326: "Stack and reclaim buttons shall be shown on the next row" — rendered only while a
// boost is active, right below the 3 preset buttons above (Reclaim moved down here from its
// former spot in ActiveBoostRow, so it's not duplicated in two places).
const StackReclaimRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

const DurationUpgradeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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

// The active-boost status line (effect + countdown + stack count) plus its optional Reclaim
// button, side by side — a plain row rather than a <p> (StatusText), since it now sometimes needs
// to host an inline <button>. Rendered at the TOP of the page (right after the header) so an
// active boost stays visible regardless of what else is happening lower down.
const ActiveBoostRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.sm};
  color: ${props => props.theme.color.textMuted};
  text-align: center;
`

// A small leading icon + display label for COMPUTE_BOOST_PRESETS' own keys (layers.js) — the
// preset objects themselves are keyed by a plain lowercase identifier with no display-ready name
// or icon of their own. The icon alone is what renders on-screen (see the Boost row below); the
// label is reserved for the active-boost status line and tooltips, where a bare icon would be
// ambiguous about which preset is running.
const COMPUTE_BOOST_DISPLAY = {
  burst: { icon: '💥', label: 'Burst' },
  standard: { icon: '⏱️', label: 'Standard' },
  sustain: { icon: '🔋', label: 'Sustain' },
}

// The full ten-tier progression this page walks top to bottom. Every row past Cores through
// Supercomputers shares the exact same shape: a merge boundary into the tier above it, which —
// once that boundary's auto-merge is unlocked (see intro.autoMergeCoresIntoNode/
// autoMergeNodesIntoCluster/… in engine.js) — transitions from an instant manual click to
// engine.js's timed reserve-pool system (see issue #321). Core → Node is included as an ordinary
// boundary here, same as every other one. Cores themselves are obtained by starting Boosters from
// the matching Data Lake (startBoosterTransfer — deposited Disk stock spent instantly, any
// remaining cost live-transferred off the raw Disk inventory over time), not minted from Memory —
// the earlier "Claim Core"/auto-claim mechanic was removed once Data Lakes superseded it.
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
// now — same "at least one full group, and room under the cap" shape the engine's own
// mergeComputeEntities enforces — this is only a UI mirror of that gate, not a replacement for it;
// the engine re-validates on every call regardless (see "Security notes" in CLAUDE.md).
const canMerge = (input, output) => input >= COMPUTE_MERGE_RATIO && output < COMPUTE_ENTITY_CAP

// Compute's own dedicated screen — split out of ByteFoundryPage (see "Byte Foundry" in CLAUDE.md)
// once revealed (isComputeCoreConversionUnlocked), reached via AppNav. Activation is still gated
// by the Byte Foundry's forced priority order — Disk Fill > Speed > Provision Disk > Compute —
// so a preset can show disabled here even while mechanically activatable
// (canActivateComputeBoost), if something ranked above Compute (which lives back on
// ByteFoundryPage/StoragePage) currently outranks it. The ten-tier merge chain (Core → Node →
// Cluster → Network → Grid → Fabric → Cloud → Datacenter → Supercomputer → Megacomputer, see
// issues #280/#321) lives here too, alongside Boost — one page for everything Compute, rather
// than a second dedicated screen. Render order top to bottom: the active-boost status (if any),
// then the Boost effects section itself (armed-tier status line, 3 preset buttons, Stack/Reclaim
// row — issue #326), THEN the tier rows below it, since clicking a tier row is what arms the
// effects section above it. Each tier renders two rows (see ENTITY_ROWS/TierBlock above): row 1
// is COMPUTE_ENTITY_CAP (10) normal slots plus the tier's name/symbol; row 2 is, pre-unlock, an
// instant Merge button + an Unlock Auto-merge button, or, post-unlock, the
// COMPUTE_MERGE_RESERVE_CAP (8) reserve slots themselves — clicking that row is what manually
// starts a new reserve merge once isCompute*MergeStartAvailable allows it ("the button is
// enabled only when there are at least 8 tokens available across all the 18 slots"). Merging
// only ever fires automatically once the player has separately unlocked auto-merge for that
// specific boundary; either way, once unlocked, a start (auto or manual) commits
// COMPUTE_MERGE_RATIO (8) tokens to the reserve and counts down that boundary's live duration
// (Core earn time ×10 chain, or ×5 after a duration upgrade — see getComputeMergeDurationSeconds)
// before granting 1 of the output entity.
// "Compute" names the page/feature only — individual entities drop the word (Core, Node,
// Cluster, … not "Compute Core"/"Compute Node"/…). The merge section itself only renders once
// `intro.computeMergePageUnlocked` — the page reveals as soon as Compute is unlocked
// (isComputeCoreConversionUnlocked, well before 8 Cores are possible), but the merge chain stays
// hidden behind its own later, one-time latch until the player has actually earned enough Cores to
// use it (see engine.js's latchComputeMergePageIfNeeded for where that latch flips).
// ENTITY_ROWS' own labels are always plural ("Cores", "Nodes", …) — strip the trailing "s" for a
// cost/spend sentence naming exactly 1 of a tier (e.g. "spend 1 Core", not "spend 1 Cores").
const singularize = label => label.replace(/s$/, '')

const ComputePage = ({ game }) => {
  const { actions, state } = game
  const { intro } = state
  // Issue #326: which compute-ladder tier is armed to fund the next Boost activation — purely
  // local UI state (free to change, no cost), reset on navigating away/reloading. Before the merge
  // chain unlocks, Cores (tier 1) is the only tier that can ever hold a balance at all, so it's
  // armed implicitly without needing a clickable row.
  const [selectedBoostTierIndex, setSelectedBoostTierIndex] = useState(null)

  const blockedByPriority = isDiskFillAvailable(state) || isBandwidthAvailable(state) || isProvisionDiskAvailable(state)
  const boostActive = Boolean(intro.computeBoostType)
  // Once a boost is active, its own funding tier is what Stack/Reclaim and the preset buttons'
  // preview all act on, regardless of which row a player might click next (issue #326 — Stack
  // always extends the currently active boost, never a freshly-selected tier).
  const armedTierIndex = boostActive
    // `?? 1` defensively falls back to Core for a save from before issue #326 existed.
    ? (intro.computeBoostTierIndex ?? 1)
    : (intro.computeMergePageUnlocked ? selectedBoostTierIndex : 1)
  const armedRow = armedTierIndex ? ENTITY_ROWS[armedTierIndex - 1] : null
  const armedHeld = armedRow ? (intro[armedRow.countField] ?? 0) : 0

  return (
    <RootDiv>
      <Header>
        <Title>⚡ Boosters</Title>
      </Header>

      {boostActive && COMPUTE_BOOST_PRESETS[intro.computeBoostType] && (
        <ActiveBoostRow aria-label="active compute boost">
          <span
            title={`${COMPUTE_BOOST_DISPLAY[intro.computeBoostType]?.label ?? intro.computeBoostType} (${armedRow?.label ?? ''}) active: ×${getComputeBoostTierMultiplier(intro.computeBoostType, armedTierIndex)} production, ${formatOfflineDuration(intro.computeBoostRemainingSeconds)} left, ${intro.computeBoostStacks}x stacked`}
          >
            {`${COMPUTE_BOOST_DISPLAY[intro.computeBoostType]?.icon ?? '⚡'} ×${getComputeBoostTierMultiplier(intro.computeBoostType, armedTierIndex)} · ${formatOfflineDuration(intro.computeBoostRemainingSeconds)} · ${intro.computeBoostStacks}×`}
          </span>
        </ActiveBoostRow>
      )}

      <ArmedStatusText>
        {armedRow
          ? `Armed: ${armedRow.symbol} ${armedRow.label} (${formatAmount(armedHeld)} held)`
          : 'Click a tier below to arm the Boost presets'}
      </ArmedStatusText>
      <BoostRow role="group" aria-label="compute boost">
        {Object.entries(COMPUTE_BOOST_PRESETS).map(([boostType, preset]) => {
          const multiplier = armedTierIndex ? getComputeBoostTierMultiplier(boostType, armedTierIndex) : preset.multiplier
          const durationSeconds = armedTierIndex ? getComputeBoostTierDurationSeconds(boostType, armedTierIndex) : preset.durationSeconds
          const needsForfeit = boostActive
          const sameAsActive = needsForfeit
            && intro.computeBoostType === boostType
            && (intro.computeBoostTierIndex ?? 1) === armedTierIndex
          // Fresh start, or a different preset/tier that would forfeit (confirm happens on click).
          const turnAvailable = armedTierIndex !== null
            && !sameAsActive
            && (
              isComputeBoostTurnAvailable(state, boostType, armedTierIndex, false)
              || isComputeBoostTurnAvailable(state, boostType, armedTierIndex, true)
            )

          return (
            <CompactButton
              key={boostType}
              aria-label={needsForfeit && !sameAsActive
                ? `forfeit active boost and activate ${boostType} compute boost`
                : `activate ${boostType} compute boost`}
              disabled={!turnAvailable}
              onClick={() => {
                if (armedTierIndex === null) return
                if (needsForfeit) {
                  const activeLabel = COMPUTE_BOOST_DISPLAY[intro.computeBoostType]?.label ?? intro.computeBoostType
                  const nextLabel = COMPUTE_BOOST_DISPLAY[boostType].label
                  if (!window.confirm(
                    `Forfeit the active ${activeLabel} boost with no refund, and start ${nextLabel}?`,
                  )) return
                  actions.activateComputeBoost(boostType, armedTierIndex, true)
                  return
                }
                actions.activateComputeBoost(boostType, armedTierIndex, false)
              }}
              title={
                armedTierIndex === null
                  ? 'Select a tier below first'
                  : sameAsActive
                    ? 'This boost is already active — use Stack to extend it'
                    : canActivateComputeBoost(state, boostType, armedTierIndex, needsForfeit) && blockedByPriority
                      ? 'Take a higher-priority upgrade first (Disk Fill, Speed, or Provision Disk)'
                      : needsForfeit
                        ? `Forfeit active boost (no refund) and start ${COMPUTE_BOOST_DISPLAY[boostType].label}: spend 1 ${singularize(armedRow?.label ?? 'Core')} for ×${multiplier} production, ${formatOfflineDuration(durationSeconds)} — asks for confirmation`
                        : `${COMPUTE_BOOST_DISPLAY[boostType].label}: spend 1 ${singularize(armedRow?.label ?? 'Core')} for ×${multiplier} production, ${formatOfflineDuration(durationSeconds)}`
              }
              type="button"
              variant="prestige"
            >
              <ButtonContent>{`${COMPUTE_BOOST_DISPLAY[boostType].icon}×${multiplier}`}</ButtonContent>
            </CompactButton>
          )
        })}
      </BoostRow>

      {boostActive && (
        <StackReclaimRow role="group" aria-label="stack, reclaim, or forfeit the active compute boost">
          <CompactButton
            aria-label="stack the active compute boost"
            disabled={!isStackComputeBoostTurnAvailable(state)}
            onClick={actions.stackComputeBoost}
            title={`Stack: spend 1 more ${singularize(armedRow?.label ?? 'Core')} to extend the active boost by its own duration again — up to ${COMPUTE_BOOST_MAX_STACKS}x`}
            type="button"
            variant="prestige"
          >
            <ButtonContent>+ Stack</ButtonContent>
          </CompactButton>
          <CompactButton
            aria-label="reclaim one stack of the active compute boost"
            disabled={!canReclaimComputeBoost(state)}
            onClick={actions.reclaimComputeBoost}
            title={`Reclaim the most recent unused stack: refunds 1 ${singularize(armedRow?.label ?? 'Core')} and its duration — one at a time`}
            type="button"
            variant="neutral"
          >
            <ButtonContent>↩ Reclaim</ButtonContent>
          </CompactButton>
          <CompactButton
            aria-label="forfeit the active compute boost with no refund"
            disabled={!canForfeitComputeBoost(state)}
            onClick={() => {
              if (!window.confirm('Forfeit the active boost with no refund?')) return
              actions.forfeitComputeBoost()
            }}
            title="Forfeit: cancel the active boost immediately with no token refund — asks for confirmation"
            type="button"
            variant="danger"
          >
            <ButtonContent>✕ Forfeit</ButtonContent>
          </CompactButton>
        </StackReclaimRow>
      )}

      <AutoBoostRow aria-label="compute auto boost">
        {state.computeAutoBoostUnlocked ? (
          <>
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
          </>
        ) : (
          <CompactButton
            aria-label={`unlock compute auto boost for ${COMPUTE_AUTO_BOOST_UNLOCK_COST} Prestige Points`}
            disabled={isProductionFrozen(state) || (state.prestige?.points ?? 0) < COMPUTE_AUTO_BOOST_UNLOCK_COST}
            onClick={actions.buyComputeAutoBoost}
            title={`Unlock Auto-Boost: while a tier is full and waiting on its own in-flight merge, automatically activate your preferred preset from the biggest such tier (default Standard). Costs ${COMPUTE_AUTO_BOOST_UNLOCK_COST} PP.`}
            type="button"
            variant="prestige"
          >
            <ButtonContent>{`🤖 Auto-Boost · ${COMPUTE_AUTO_BOOST_UNLOCK_COST} PP`}</ButtonContent>
          </CompactButton>
        )}
      </AutoBoostRow>

      {intro.computeMergePageUnlocked
        ? (
          <TierBlocksGroup aria-label="compute entities">
            {(() => {
              const nextUpgradeIndex = getNextComputeMergeDurationUpgradeIndex(state)
              if (nextUpgradeIndex === null) return null
              const nextRow = ENTITY_ROWS[nextUpgradeIndex]
              const currentDuration = getComputeMergeDurationSeconds(state, nextUpgradeIndex)
              const afterDuration = getComputeMergeDurationSeconds(
                { intro: { ...intro, computeMergeDurationUpgrades: nextUpgradeIndex + 1 } },
                nextUpgradeIndex,
              )
              const canUpgrade = isUpgradeComputeMergeDurationAvailable(state)
              return (
                <DurationUpgradeRow>
                  <CompactButton
                    aria-label={`upgrade ${nextRow.label} merge duration step to ×${COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED}`}
                    disabled={!canUpgrade}
                    onClick={actions.upgradeComputeMergeDuration}
                    title={
                      canUpgrade
                        ? `Sacrifice all ${COMPUTE_ENTITY_CAP} ${nextRow.label}: this merge becomes ×${COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED} (not ×${COMPUTE_MERGE_STEP_MULTIPLIER}) the previous layer (${formatOfflineDuration(currentDuration)} → ${formatOfflineDuration(afterDuration)}; later layers rescale too)`
                        : `Next duration upgrade: ${nextRow.label} → ${nextRow.mergeOutputLabel}. Needs auto-merge unlocked and ${COMPUTE_ENTITY_CAP} held ${nextRow.label}`
                    }
                    type="button"
                    variant="info"
                  >
                    <ButtonContent>{`×${COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED} ${nextRow.symbol}`}</ButtonContent>
                  </CompactButton>
                </DurationUpgradeRow>
              )
            })()}
            {ENTITY_ROWS.map((row, rowIndex) => {
              const tierIndex = rowIndex + 1
              const count = intro[row.countField] ?? 0
              const hasMergeRow = Boolean(row.autoFlagField)
              const autoEnabled = hasMergeRow ? Boolean(intro[row.autoFlagField]) : false
              const autoCostHeld = row.autoCostField ? (intro[row.autoCostField] ?? 0) : 0
              const canEnableAuto = hasMergeRow && !autoEnabled && autoCostHeld >= COMPUTE_ENTITY_CAP
              const remainingSeconds = row.timerField ? (intro[row.timerField] ?? 0) : 0
              const merging = remainingSeconds > 0
              const startAvailable = autoEnabled && !merging && count >= COMPUTE_MERGE_RATIO && (intro[row.mergeOutputField] ?? 0) < COMPUTE_ENTITY_CAP

              const canStartTransfer = canStartBoosterTransfer(state, tierIndex)
              const buyCost = getBoosterPurchaseCost(tierIndex)(state)
              const lakeLabel = getDataLakeTierLabel(tierIndex)
              const lakeDeposited = getDataLakeAvailableUnits(tierIndex)(state)
              const lakeTransfers = getDataLakeTier(state, tierIndex)?.transfers ?? []
              const lakeTransferCapacity = getDataLakeTransferCapacity(state, tierIndex)
              const soonestTransferSeconds = lakeTransfers.length > 0
                ? Math.min(...lakeTransfers.map(transfer => transfer.remainingSeconds ?? 0))
                : 0

              return (
                <TierBlock key={row.key} aria-label={`${row.label} tier`}>
                  <TierHeaderRow>
                    <TierSelectButton
                      type="button"
                      onClick={() => setSelectedBoostTierIndex(prev => (prev === tierIndex ? null : tierIndex))}
                      aria-pressed={selectedBoostTierIndex === tierIndex}
                      aria-label={`select ${row.label} to fund a compute boost`}
                      title={`Select ${row.label} to arm the Boost presets above at this tier's own power`}
                      $selected={selectedBoostTierIndex === tierIndex}
                    >
                      <TierSymbol aria-hidden="true">{row.symbol}</TierSymbol>
                      <TierLabel>{`${row.label} ${formatAmount(count)}/${COMPUTE_ENTITY_CAP}`}</TierLabel>
                      <SlotsRow role="group" aria-label={`${row.label} slots`}>
                        {Array.from({ length: COMPUTE_ENTITY_CAP }, (_, index) => (
                          <NormalSlot key={index} $filled={index < count} aria-hidden="true" />
                        ))}
                      </SlotsRow>
                    </TierSelectButton>
                  </TierHeaderRow>

                  <TierMergeRow>
                    <IconButton
                      aria-label={`start 1 ${row.label.toLowerCase().slice(0, -1) || row.label.toLowerCase()} from the ${lakeLabel} Data Lake`}
                      disabled={!canStartTransfer}
                      onClick={() => actions.startBoosterTransfer(tierIndex)}
                      title={
                        canStartTransfer
                          ? `Start 1 ${singularize(row.label)} for ${formatAmount(buyCost)} ${lakeLabel} — spent from ${formatAmount(lakeDeposited)} ${lakeLabel} deposited first, any remainder live-transferred from built Disks (${formatAmount(lakeTransferCapacity - lakeTransfers.length)}/${formatAmount(lakeTransferCapacity)} transfer slots free)`
                          : `Needs ${formatAmount(buyCost)} ${lakeLabel} worth of deposited + built Disks, and a free transfer slot — deposit or build Disks on Foundry`
                      }
                      type="button"
                      variant="success"
                    >
                      <ButtonContent>{`+ ${formatAmount(buyCost)}${lakeLabel}`}</ButtonContent>
                    </IconButton>
                    {lakeTransfers.length > 0 && (
                      <TransferStatus title={`${formatAmount(lakeTransfers.length)}/${formatAmount(lakeTransferCapacity)} ${lakeLabel} transfers in flight — soonest completes in ${formatOfflineDuration(soonestTransferSeconds)}`}>
                        {`⇄${formatAmount(lakeTransfers.length)} ${formatOfflineDuration(soonestTransferSeconds)}`}
                      </TransferStatus>
                    )}

                    {hasMergeRow && (
                      autoEnabled ? (
                        <ReserveSlotsRow
                          aria-label={
                            merging
                              ? `${row.label} reserve merge in progress, ${formatOfflineDuration(remainingSeconds)} left`
                              : `start merging ${COMPUTE_MERGE_RATIO} ${row.label.toLowerCase()} into 1 ${row.mergeOutputLabel.toLowerCase()}`
                          }
                          disabled={!startAvailable}
                          onClick={startAvailable ? () => actions[row.startAction]() : undefined}
                          $clickable={startAvailable}
                          title={
                            merging
                              ? `Merging: ${formatOfflineDuration(remainingSeconds)} left`
                              : startAvailable
                                ? `Merge: move ${COMPUTE_MERGE_RATIO} ${row.label} into the reserve and start a timed merge into 1 ${row.mergeOutputLabel}`
                                : `Needs at least ${COMPUTE_MERGE_RATIO} ${row.label} across the normal and reserve slots`
                          }
                          type="button"
                        >
                          {merging && <MergeCountdown>{formatOfflineDuration(remainingSeconds)}</MergeCountdown>}
                          {Array.from({ length: COMPUTE_MERGE_RESERVE_CAP }, (_, index) => (
                            <ReserveSlot key={index} $merging={merging} aria-hidden="true" />
                          ))}
                        </ReserveSlotsRow>
                      ) : (
                        <>
                          <IconButton
                            aria-label={`merge ${COMPUTE_MERGE_RATIO} ${row.label.toLowerCase()} into 1 ${row.mergeOutputLabel.toLowerCase()}`}
                            disabled={!canMerge(count, intro[row.mergeOutputField] ?? 0)}
                            onClick={() => actions[row.mergeAction]()}
                            title={
                              (intro[row.mergeOutputField] ?? 0) >= COMPUTE_ENTITY_CAP
                                ? `${row.mergeOutputLabel} is already at the max of ${COMPUTE_ENTITY_CAP}`
                                : `Merge: spend ${COMPUTE_MERGE_RATIO} ${row.label} for 1 ${row.mergeOutputLabel}`
                            }
                            type="button"
                            variant="prestige"
                          >
                            <ButtonContent>⬆</ButtonContent>
                          </IconButton>
                          <IconButton
                            aria-label={row.autoAriaLabel}
                            disabled={!canEnableAuto}
                            onClick={() => actions[row.enableAutoAction]()}
                            title={`Auto: sacrifice all ${COMPUTE_ENTITY_CAP} ${row.autoCostLabel} (have ${formatAmount(autoCostHeld)}) to permanently automate this step whenever ${row.label} is full, via a timed reserve merge`}
                            type="button"
                            variant="info"
                          >
                            <ButtonContent>🤖</ButtonContent>
                          </IconButton>
                        </>
                      )
                    )}
                  </TierMergeRow>
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
