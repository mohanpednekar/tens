import BoostTimerBar, { COMPUTE_BOOST_DISPLAY, describeCoveredTiers, formatPresetDuration } from 'components/BoostTimerBar'
import Button, { ButtonContent, VisuallyHidden } from 'components/Button'
import { formatAmount, formatOfflineDuration, getComputeBoostLane, getComputeBoostLanes, getComputeBoostTierDurationSeconds, getComputeBoostTierMultiplier, getComputeFieldEffectiveCap, getChargerUnlockProgress, getComputeReserveHeld, isComputeBoostTurnAvailable, isComputeChargeAvailable, isComputeCharging, isComputeMergeStartAvailableAtBoundary } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO, COMPUTE_MERGE_RESERVE_CAP } from 'game/layers'
import { Fragment, useState } from 'react'
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

// One node per compute-ladder entity (see TierHeaderRow below), joined by Connectors.
// The merge chain (#1141): tier nodes stacked top-to-bottom, joined by a dashed connector that
// carries that boundary's 8→1 Charge up / ⚡ Charge button, so a merge reads as flowing down the chain.
const TierBlocksGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`

const Connector = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 1.9rem;
  position: relative;
  width: 100%;

  &::before {
    border-left: 2px dashed ${props => props.theme.color.borderStrong};
    bottom: 0;
    content: '';
    left: 50%;
    position: absolute;
    top: 0;
  }

  > * {
    position: relative;
  }
`

const ConnectorGap = styled.div`
  height: 0.6rem;
`

// The Charger (or its 🔓 unlock) sits on the node's own header line, right side.
const NodeSide = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  margin-left: auto;
  gap: 4px;
`

const BoostsHint = styled.span`
  color: ${props => props.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.78em;
  font-weight: 400;
  white-space: nowrap;
`

const TierBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: ${props => props.theme.radius.lg};
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

// Row 1: tier name/symbol plus a row of COMPUTE_ENTITY_CAP (10) normal slots — "First row shows 10
// slots ... also has Name and symbol of the tier" (issue #321).
// Wraps only when the node's Charger can't fit beside the dots (~320px phones): the Charger then
// drops to its own right-aligned line instead of overlapping them.
const TierHeaderRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px ${props => props.theme.space.xs};
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
  gap: 0.5rem;
  min-width: fit-content;
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
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
`

// Label + boosted-tier hint over the held-count dots (two short lines inside the select button).
const NodeText = styled.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
`

const NodeTitle = styled.span`
  align-items: baseline;
  display: flex;
  gap: 0.35rem;
  min-width: 0;
`

// A fixed width (rather than the symbol's own natural glyph width) keeps every tier's label
// starting at the same horizontal offset — plain-text symbols (⬡, ▦) render noticeably narrower
// than full-color emoji (🔗, 🧩, 🏢, …), which otherwise shifts the label a few px left for those
// tiers and reads as misaligned across the ten rows.
const TierSymbol = styled.span`
  flex: 0 0 auto;
  width: 1.6rem;
  font-size: 1.15rem;
  text-align: center;
`

const SlotsRow = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 3px;
`

// A single discrete normal-capacity slot (one of COMPUTE_ENTITY_CAP) — filled once its index is
// below the current count, matching the same "never partially filled per-square" convention
// StoragePage's own DiskSquare uses, just non-interactive (a plain status square, not a button).
const NormalSlot = styled.span`
  flex: 0 0 auto;
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  border: 1.2px solid ${props => (props.$filled ? props.theme.color.good : props.theme.color.borderStrong)};
  background: ${props => (props.$filled ? props.theme.color.good : 'transparent')};
`

const CompactButton = styled(Button)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
  flex: 0 0 auto;
`

// The connector's merge / ⚡ Charge button: a small, quiet pill centred on the dashed line (it lights
// up only when it can act — Button's variant colour; disabled reads muted).
const TierActionButton = styled(CompactButton)`
  border-radius: 999px;
  font-size: 0.72rem;
  min-height: 1.45rem;
  min-width: 4.5rem;
  padding: 0.1em 0.75em;
`

// The node's Charger as one compact badge ("🔌 n/8", a progress fill for the partial reserve, or
// "⏳ <countdown>" while an auto-charge runs) — display-only, same accessible name as the old slot row.
const ChargerBadge = styled(CompactButton)`
  min-height: 1.9rem;
  min-width: 3.9rem;
`

// The node's Charger status (not a control): reserve n/8 or unlock progress n/10 as a proportional fill,
// gold while an auto-charge runs. Explicit colours — a disabled Button would grey every state alike.
const ChargerStatus = styled.span`
  align-items: center;
  background: ${props => {
    const tint = props.$running ? props.theme.color.warn : props.theme.color.accent
    const pct = props.$running ? 100 : Math.round(props.$fill * 100)
    return `linear-gradient(90deg, color-mix(in srgb, ${tint} 28%, ${props.theme.color.surfaceSunken}) ${pct}%, ${props.theme.color.surfaceSunken} ${pct}%)`
  }};
  border: 1px solid ${props => (props.$running ? props.theme.color.warn : props.theme.color.borderStrong)};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => (props.$running ? props.theme.color.warn : props.theme.color.text)};
  display: inline-flex;
  font-size: 0.78em;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  justify-content: center;
  min-height: 1.9rem;
  min-width: 3.9rem;
  padding: 0 0.6em;
  white-space: nowrap;
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

// The full ten-tier progression this page walks top to bottom. Every row past Cores through
// Supercomputers shares the exact same shape: a merge boundary into the tier above it, which —
// once that boundary's auto-charge is unlocked (see intro.autoMergeCoresIntoNode/
// autoMergeNodesIntoCluster/… in engine.js) — moves to the "🤖 Auto-charge" slot row: tapping it still merges
// instantly, while engine.js's automatic merge uses the timed reserve pool (see issue #321). Core → Node is included as an ordinary
// boundary here, same as every other one. Cells themselves are obtained by buying them from
// the matching Data Lake on Foundry (buyBooster — spent from that lake's own banked units, not
// minted from Memory); the buy/auto-buy control itself lives on Foundry's DataLakePanel, not here
// — the earlier "Claim Core"/auto-claim mechanic was removed once Data Lakes superseded it.
// Megacomputer (the last tier) has no merge row at all — nothing to merge into or automate past it
// (see issue #280's "Out of scope").
const ENTITY_ROWS = [
  {
    key: 'core',
    label: 'Cells',
    symbol: '⬡',
    countField: 'computeCores',
    mergeOutputLabel: 'Battery',
    mergeOutputField: 'computeNodes',
    mergeAction: 'mergeComputeCoresIntoNode',
    autoFlagField: 'autoMergeCoresIntoNode',
    autoCostLabel: 'Batteries',
    autoCostField: 'computeNodes',
    enableAutoAction: 'enableAutoMergeCoresIntoNode',
    autoAriaLabel: 'unlock the Charger for Cells into Batteries',
    startAction: 'startComputeCoresMerge',
    timerField: 'computeCoresMergeRemainingSeconds',
  },
  {
    key: 'nodesIntoCluster',
    label: 'Batteries',
    symbol: '🔗',
    countField: 'computeNodes',
    mergeOutputLabel: 'Pack',
    mergeOutputField: 'computeClusters',
    mergeAction: 'mergeComputeNodesIntoCluster',
    autoFlagField: 'autoMergeNodesIntoCluster',
    autoCostLabel: 'Packs',
    autoCostField: 'computeClusters',
    enableAutoAction: 'enableAutoMergeNodesIntoCluster',
    autoAriaLabel: 'unlock the Charger for Batteries into Packs',
    startAction: 'startComputeNodesMerge',
    timerField: 'computeNodesMergeRemainingSeconds',
  },
  {
    key: 'clustersIntoNetwork',
    label: 'Packs',
    symbol: '🧩',
    countField: 'computeClusters',
    mergeOutputLabel: 'Bank',
    mergeOutputField: 'computeNetworks',
    mergeAction: 'mergeComputeClustersIntoNetwork',
    autoFlagField: 'autoMergeClustersIntoNetwork',
    autoCostLabel: 'Banks',
    autoCostField: 'computeNetworks',
    enableAutoAction: 'enableAutoMergeClustersIntoNetwork',
    autoAriaLabel: 'unlock the Charger for Packs into Banks',
    startAction: 'startComputeClustersMerge',
    timerField: 'computeClustersMergeRemainingSeconds',
  },
  {
    key: 'networksIntoGrid',
    label: 'Banks',
    symbol: '🕸️',
    countField: 'computeNetworks',
    mergeOutputLabel: 'Generator',
    mergeOutputField: 'computeGrids',
    mergeAction: 'mergeComputeNetworksIntoGrid',
    autoFlagField: 'autoMergeNetworksIntoGrid',
    autoCostLabel: 'Generators',
    autoCostField: 'computeGrids',
    enableAutoAction: 'enableAutoMergeNetworksIntoGrid',
    autoAriaLabel: 'unlock the Charger for Banks into Generators',
    startAction: 'startComputeNetworksMerge',
    timerField: 'computeNetworksMergeRemainingSeconds',
  },
  {
    key: 'gridsIntoFabric',
    label: 'Generators',
    symbol: '▦',
    countField: 'computeGrids',
    mergeOutputLabel: 'Turbine',
    mergeOutputField: 'computeFabrics',
    mergeAction: 'mergeComputeGridsIntoFabric',
    autoFlagField: 'autoMergeGridsIntoFabric',
    autoCostLabel: 'Turbines',
    autoCostField: 'computeFabrics',
    enableAutoAction: 'enableAutoMergeGridsIntoFabric',
    autoAriaLabel: 'unlock the Charger for Generators into Turbines',
    startAction: 'startComputeGridsMerge',
    timerField: 'computeGridsMergeRemainingSeconds',
  },
  {
    key: 'fabricsIntoCloud',
    label: 'Turbines',
    symbol: '🧵',
    countField: 'computeFabrics',
    mergeOutputLabel: 'Plant',
    mergeOutputField: 'computeClouds',
    mergeAction: 'mergeComputeFabricsIntoCloud',
    autoFlagField: 'autoMergeFabricsIntoCloud',
    autoCostLabel: 'Plants',
    autoCostField: 'computeClouds',
    enableAutoAction: 'enableAutoMergeFabricsIntoCloud',
    autoAriaLabel: 'unlock the Charger for Turbines into Plants',
    startAction: 'startComputeFabricsMerge',
    timerField: 'computeFabricsMergeRemainingSeconds',
  },
  {
    key: 'cloudsIntoDatacenter',
    label: 'Plants',
    symbol: '☁️',
    countField: 'computeClouds',
    mergeOutputLabel: 'Grid',
    mergeOutputField: 'computeDatacenters',
    mergeAction: 'mergeComputeCloudsIntoDatacenter',
    autoFlagField: 'autoMergeCloudsIntoDatacenter',
    autoCostLabel: 'Grids',
    autoCostField: 'computeDatacenters',
    enableAutoAction: 'enableAutoMergeCloudsIntoDatacenter',
    autoAriaLabel: 'unlock the Charger for Plants into Grids',
    startAction: 'startComputeCloudsMerge',
    timerField: 'computeCloudsMergeRemainingSeconds',
  },
  {
    key: 'datacentersIntoSupercomputer',
    label: 'Grids',
    symbol: '🏢',
    countField: 'computeDatacenters',
    mergeOutputLabel: 'Reactor',
    mergeOutputField: 'computeSupercomputers',
    mergeAction: 'mergeComputeDatacentersIntoSupercomputer',
    autoFlagField: 'autoMergeDatacentersIntoSupercomputer',
    autoCostLabel: 'Reactors',
    autoCostField: 'computeSupercomputers',
    enableAutoAction: 'enableAutoMergeDatacentersIntoSupercomputer',
    autoAriaLabel: 'unlock the Charger for Grids into Reactors',
    startAction: 'startComputeDatacentersMerge',
    timerField: 'computeDatacentersMergeRemainingSeconds',
  },
  {
    key: 'supercomputersIntoMegacomputer',
    label: 'Reactors',
    symbol: '🖥️',
    countField: 'computeSupercomputers',
    mergeOutputLabel: 'Fusion',
    mergeOutputField: 'computeMegacomputers',
    mergeAction: 'mergeComputeSupercomputersIntoMegacomputer',
    autoFlagField: 'autoMergeSupercomputersIntoMegacomputer',
    autoCostLabel: 'Fusions',
    autoCostField: 'computeMegacomputers',
    enableAutoAction: 'enableAutoMergeSupercomputersIntoMegacomputer',
    autoAriaLabel: 'unlock the Charger for Reactors into Fusions',
    startAction: 'startComputeSupercomputersMerge',
    timerField: 'computeSupercomputersMergeRemainingSeconds',
  },
  {
    key: 'megacomputer',
    label: 'Fusions',
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
// once revealed (isComputeCoreConversionUnlocked), reached via AppNav. Boost activation only needs a held
// token — it is not arbitrated against Disk Fill / Provision Disk. The ten-tier merge chain (Core → Node →
// Cluster → Network → Grid → Fabric → Cloud → Datacenter → Supercomputer → Megacomputer, see
// issues #280/#321) lives here too, alongside Boost — one page for everything Compute, rather
// than a second dedicated screen. Render order top to bottom: a card with the current boost
// effect, the active boost timer bar (Pop/Forfeit, Stack) and Auto Boost preference, THEN the tier rows — the one selected
// tier shows the armed status line + 3 preset buttons inside its own block, below its merge row.
// Each tier is one chain node (see ENTITY_ROWS/TierBlock above): COMPUTE_ENTITY_CAP (10) held-count dots
// plus the tier's name/symbol and its Charger status (🔓 n/10 while its first 10 charges build it, then
// 🔌 n/8 / ⏳); the link to the next tier carries the 8→1 Charge up or ⚡ Charge pill. Only the automatic merge (at the full extended cap) commits 8 tokens to the reserve
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
  // local UI state (free to change, no cost). One tier is ALWAYS selected (it can be switched, never cleared):
  // on arrival, the highest tier whose charge is automated, else the active boost's own tier, else Cells.
  // Before the merge chain unlocks, Cores (tier 1) is the only tier that can ever hold a balance at all, so
  // it's armed implicitly without needing a clickable row.
  const [selectedBoostTierIndex, setSelectedBoostTierIndex] = useState(() => {
    const highestAutomated = ENTITY_ROWS.reduce((best, row, index) => (row.autoFlagField && intro[row.autoFlagField] ? index + 1 : best), 0)
    if (highestAutomated > 0) return highestAutomated
    return getComputeBoostLanes(intro)[0]?.queue[0] ?? 1
  })

  const boostLanes = getComputeBoostLanes(intro)
  const boostActive = boostLanes.length > 0
  const activeBoostTierIndexes = boostLanes.map(lane => lane.queue[0])
  // Progressive reveal: rows up to the highest tier ever held or automated, plus the next one to charge
  // into; the rest of the chain stays hidden.
  const lastHeldRowIndex = ENTITY_ROWS.reduce(
    (last, row, index) => {
      if ((intro[row.countField] ?? 0) > 0) return index
      // A boundary that was ever charged across (Charger progress, or Auto-charge) reveals its output row,
      // so spending that output on a Boost never hides it again.
      if (row.autoFlagField && (intro[row.autoFlagField] || getChargerUnlockProgress(state, row.autoFlagField) > 0)) return Math.max(last, index + 1)
      return last
    },
    0,
  )
  const visibleEntityRowCount = Math.min(ENTITY_ROWS.length, lastHeldRowIndex + 2)
  // A tier row the player clicks always arms the presets — even mid-boost (the new boost queues or runs in parallel).
  const armedTierIndex = intro.computeMergePageUnlocked ? selectedBoostTierIndex : 1
  const armedRow = armedTierIndex ? ENTITY_ROWS[armedTierIndex - 1] : null

  // The armed tier's 3 presets — rendered inside the selected tier block (only one at a time), or
  // in the top card before the merge chain unlocks (Cores armed implicitly, no tier rows yet).
  const boostPresets = armedRow && (
    <>
      {/* In the chain each node's header already reads "→ <tiers>", so only the pre-chain card repeats it. */}
      {!intro.computeMergePageUnlocked && (
        <ArmedStatusText title={`Boosts ${describeCoveredTiers(armedTierIndex, 'name')}`}>
          {`Boosts ${describeCoveredTiers(armedTierIndex)}`}
        </ArmedStatusText>
      )}
      <BoostRow role="group" aria-label="compute boost">
        {Object.keys(COMPUTE_BOOST_PRESETS).map(boostType => {
          const multiplier = getComputeBoostTierMultiplier(boostType, armedTierIndex)
          const durationSeconds = getComputeBoostTierDurationSeconds(boostType, armedTierIndex)
          const nextLabel = COMPUTE_BOOST_DISPLAY[boostType].label
          // A preset whose multiplier is already running queues behind it (strongest first); a different
          // multiplier runs in parallel and adds up.
          const lane = getComputeBoostLane(intro, boostType)
          const queues = Boolean(lane)
          const spendText = `×${multiplier} production, ${formatPresetDuration(durationSeconds)}`

          return (
            <CompactButton
              key={boostType}
              aria-label={queues
                ? `queue ${nextLabel.toLowerCase()} compute boost`
                : `activate ${nextLabel.toLowerCase()} compute boost`}
              disabled={!isComputeBoostTurnAvailable(state, boostType, armedTierIndex)}
              onClick={() => actions.activateComputeBoost(boostType, armedTierIndex)}
              title={
                queues
                  ? `Queue ${nextLabel}: runs after the current one, ${spendText} — up to ${COMPUTE_BOOST_MAX_STACKS}x`
                  : `${nextLabel}: ${spendText} — runs alongside other boosts and adds up`
              }
              type="button"
              variant="prestige"
            >
              <ButtonContent>{`${COMPUTE_BOOST_DISPLAY[boostType].icon} ×${multiplier} · ${formatPresetDuration(durationSeconds)}`}</ButtonContent>
            </CompactButton>
          )
        })}
      </BoostRow>
    </>
  )

  return (
    <RootDiv>
      {/* Title yields to the boost timer bar at the top (kept as a hidden heading for screen readers). */}
      {boostActive ? (
        <VisuallyHidden as="h1">⚡ Power</VisuallyHidden>
      ) : (
        <Header>
          <Title>⚡ Power</Title>
        </Header>
      )}

      {boostActive && <BoostTimerBar actions={actions} state={state} />}
      {!boostActive && (
        <ArmedStatusText>
          No boost running
        </ArmedStatusText>
      )}

      {!intro.computeMergePageUnlocked && (
      <BoostCard aria-label="boost">
      {boostPresets}

      </BoostCard>
      )}

      {intro.computeMergePageUnlocked
        ? (
          <TierBlocksGroup aria-label="compute entities">
            {ENTITY_ROWS.slice(0, visibleEntityRowCount).map((row, rowIndex) => {
              const tierIndex = rowIndex + 1
              const count = intro[row.countField] ?? 0
              const hasMergeRow = Boolean(row.autoFlagField)
              const autoEnabled = hasMergeRow ? Boolean(intro[row.autoFlagField]) : false
              const autoCostHeld = row.autoCostField ? (intro[row.autoCostField] ?? 0) : 0
              // Legacy route only: a save already holding 10 of the output may still sacrifice them.
              const canEnableAuto = hasMergeRow && !autoEnabled && autoCostHeld >= COMPUTE_ENTITY_CAP
              // New route: the boundary's first 10 charges build its Charger (getChargerUnlockProgress).
              const chargerProgress = hasMergeRow ? getChargerUnlockProgress(state, row.autoFlagField) : 0
              const chargingCharger = hasMergeRow && !autoEnabled && chargerProgress < COMPUTE_ENTITY_CAP
              const autoUnlockProgress = Math.min(100, (autoCostHeld / COMPUTE_ENTITY_CAP) * 100)
              const remainingSeconds = row.timerField ? (intro[row.timerField] ?? 0) : 0
              const merging = remainingSeconds > 0
              const outputCap = hasMergeRow ? getComputeFieldEffectiveCap(state, row.mergeOutputField) : COMPUTE_ENTITY_CAP
              const startAvailable = hasMergeRow && isComputeMergeStartAvailableAtBoundary(state, rowIndex)
              // Once auto-charge is unlocked, `count` can climb past COMPUTE_ENTITY_CAP into the
              // boundary's own gradually-filling reserve (see getComputeReserveHeld) — the primary
              // slot row always reads at most COMPUTE_ENTITY_CAP/COMPUTE_ENTITY_CAP; the "extra"
              // shows up as the Charger's reserve fill instead, never as an overflowing "14/10".
              const reserveHeld = hasMergeRow ? getComputeReserveHeld(state, tierIndex) : 0
              // A manual Charge moves units from the top row down into the bottom row one per second.
              const charging = hasMergeRow && isComputeCharging(state, rowIndex)
              const chargeAvailable = hasMergeRow && isComputeChargeAvailable(state, rowIndex)
              const primaryHeld = charging ? Math.min(COMPUTE_ENTITY_CAP, Math.max(0, count - reserveHeld)) : Math.min(count, COMPUTE_ENTITY_CAP)

              // Progressive disclosure: the merge/auto row only shows for the selected tier or when
              // there is something to act on or watch, so idle tiers stay a single line.
              const canMergeNow = autoEnabled ? startAvailable : canMerge(count, intro[row.mergeOutputField] ?? 0, outputCap)
              // Tiers not yet automated always show their connector (merge + unlock path); automated
              // tiers show it only while there is something to act on or watch.
              const showDetail = hasMergeRow && (
                !autoEnabled || armedTierIndex === tierIndex || merging || charging || canMergeNow || reserveHeld > 0
              )

              // Only unlocked tiers render: the first, anything held/automated/merging, one whose
              // predecessor can already feed it (or any higher tier is held), or the selected/active
              // boost tier — so the presets never vanish after a boost spends that tier's last unit.
              const prevRow = rowIndex > 0 ? ENTITY_ROWS[rowIndex - 1] : null
              const heldAtOrAbove = ENTITY_ROWS.some((r, i) => i >= rowIndex && (intro[r.countField] ?? 0) > 0)
              const unlocked = rowIndex === 0 || heldAtOrAbove || autoEnabled || merging
                || armedTierIndex === tierIndex || activeBoostTierIndexes.includes(tierIndex)
                || (prevRow && ((intro[prevRow.countField] ?? 0) >= COMPUTE_MERGE_RATIO || intro[prevRow.autoFlagField]))
              if (!unlocked) return null

              const nextSymbol = ENTITY_ROWS[rowIndex + 1]?.symbol ?? '⬆'
              // Pre-unlock merge (instant 8→1) or post-unlock ⚡ Charge — on the connector to the next tier.
              const connectorButton = hasMergeRow && (autoEnabled ? (
                <TierActionButton
                  aria-label={`charge ${row.label.toLowerCase()}: move units down one per second, then merge ${COMPUTE_MERGE_RATIO} into 1 ${row.mergeOutputLabel.toLowerCase()}`}
                  disabled={!chargeAvailable}
                  onClick={() => actions.startComputeCharge(rowIndex)}
                  title={
                    charging
                      ? 'Charging — one unit moves into the Charger each second, then it merges'
                      : (intro[row.mergeOutputField] ?? 0) >= outputCap
                        ? `${row.mergeOutputLabel} is already at the max of ${outputCap}`
                        : `Charge: move units from the top row into the Charger one per second, then merge ${COMPUTE_MERGE_RATIO} into 1 ${row.mergeOutputLabel} (needs ${COMPUTE_MERGE_RATIO} ${row.label} held)`
                  }
                  type="button"
                  variant="success"
                >
                  <ButtonContent>{charging ? `⏳ ${reserveHeld}/${COMPUTE_MERGE_RESERVE_CAP}` : '⚡ Charge'}</ButtonContent>
                </TierActionButton>
              ) : (
                <TierActionButton
                  aria-label={`charge up ${COMPUTE_MERGE_RATIO} ${row.label.toLowerCase()} into 1 ${row.mergeOutputLabel.toLowerCase()}`}
                  disabled={chargingCharger ? count < COMPUTE_MERGE_RATIO : !canMerge(count, intro[row.mergeOutputField] ?? 0, outputCap)}
                  onClick={() => actions[row.mergeAction]()}
                  title={
                    chargingCharger
                      ? `Charge up: spend ${COMPUTE_MERGE_RATIO} ${row.label} into this tier's Charger (${chargerProgress}/${COMPUTE_ENTITY_CAP}) — the first ${COMPUTE_ENTITY_CAP} charges unlock Auto-charge, then charges make ${row.mergeOutputLabel}`
                      : (intro[row.mergeOutputField] ?? 0) >= outputCap
                        ? `${row.mergeOutputLabel} is already at the max of ${outputCap}`
                        : `Charge up: spend ${COMPUTE_MERGE_RATIO} ${row.label} for 1 ${row.mergeOutputLabel}`
                  }
                  type="button"
                  variant="success"
                >
                  <ButtonContent>{`${row.symbol} ${COMPUTE_MERGE_RATIO}→1 ${chargingCharger ? '🔌' : nextSymbol}`}</ButtonContent>
                </TierActionButton>
              ))
              // The node's own Charger (8 reserve slots) once unlocked, else its 🔓 unlock.
              const nodeSide = hasMergeRow && (autoEnabled ? (
                <ChargerStatus
                  $fill={reserveHeld / COMPUTE_MERGE_RESERVE_CAP}
                  $running={merging}
                  aria-label={
                    merging
                      ? `${row.label} charger, auto-charge in progress, ${formatOfflineDuration(remainingSeconds)} left`
                      : `${row.label} charger, ${reserveHeld}/${COMPUTE_MERGE_RESERVE_CAP} filled`
                  }
                  role="img"
                  title={
                    merging
                      ? `Auto-charging: ${formatOfflineDuration(remainingSeconds)} left`
                      : `Charger: ${reserveHeld}/${COMPUTE_MERGE_RESERVE_CAP} — fills past ${COMPUTE_ENTITY_CAP} held and charges on its own when full, or press Charge to move units into it one per second`
                  }
                >
                  {merging ? `⏳ ${formatOfflineDuration(remainingSeconds)}` : `🔌 ${reserveHeld}/${COMPUTE_MERGE_RESERVE_CAP}`}
                </ChargerStatus>
              ) : canEnableAuto ? (
                // Legacy save already holding 10 of the output: the old sacrifice unlock stays available.
                <ChargerBadge
                  aria-label={row.autoAriaLabel}
                  onClick={() => actions[row.enableAutoAction]()}
                  title={`Unlock this tier's Charger now: sacrifice ${COMPUTE_ENTITY_CAP} of your ${formatAmount(autoCostHeld)} ${row.autoCostLabel}`}
                  type="button"
                  variant="info"
                  $progress={autoUnlockProgress}
                >
                  <ButtonContent>{`🔓 ${COMPUTE_ENTITY_CAP}/${COMPUTE_ENTITY_CAP}`}</ButtonContent>
                </ChargerBadge>
              ) : (
                <ChargerStatus
                  $fill={chargerProgress / COMPUTE_ENTITY_CAP}
                  aria-label={`${row.label} charger unlock, ${chargerProgress}/${COMPUTE_ENTITY_CAP} charges`}
                  role="img"
                  title={`Charger: ${chargerProgress}/${COMPUTE_ENTITY_CAP} — this tier's first ${COMPUTE_ENTITY_CAP} charges build it, then it charges on its own whenever ${row.label} is completely full`}
                >
                  {`🔓 ${chargerProgress}/${COMPUTE_ENTITY_CAP}`}
                </ChargerStatus>
              ))
              // The connector shows whenever its merge matters (same progressive rule as before);
              // otherwise a small gap keeps the chain readable.
              const showConnector = hasMergeRow && showDetail

              return (
                <Fragment key={row.key}>
                <TierBlock data-boost-tier aria-label={`${row.label} tier`} $selected={armedTierIndex === tierIndex}>
                  <TierHeaderRow>
                    <TierSelectButton
                      type="button"
                      onClick={() => setSelectedBoostTierIndex(tierIndex)}
                      aria-pressed={armedTierIndex === tierIndex}
                      aria-label={`select ${row.label} to fund a compute boost`}
                      title={`Select ${row.label} to show its Boost presets — they'll boost ${describeCoveredTiers(tierIndex, 'name')}`}
                      $selected={armedTierIndex === tierIndex}
                    >
                      <TierSymbol aria-hidden="true">{row.symbol}</TierSymbol>
                      <NodeText>
                        <NodeTitle>
                          <TierLabel>
                            {row.label}
                            <VisuallyHidden>{` ${formatAmount(primaryHeld)}/${COMPUTE_ENTITY_CAP}`}</VisuallyHidden>
                          </TierLabel>
                          <BoostsHint aria-hidden="true">→ {describeCoveredTiers(tierIndex)}</BoostsHint>
                        </NodeTitle>
                        <SlotsRow role="group" aria-label={`${row.label} slots`}>
                          {Array.from({ length: COMPUTE_ENTITY_CAP }, (_, index) => (
                            <NormalSlot key={index} $filled={index < primaryHeld} aria-hidden="true" />
                          ))}
                        </SlotsRow>
                      </NodeText>
                    </TierSelectButton>
                    {nodeSide && <NodeSide>{nodeSide}</NodeSide>}
                  </TierHeaderRow>

                  {armedTierIndex === tierIndex && boostPresets}
                </TierBlock>
                {showConnector ? <Connector>{connectorButton}</Connector> : <ConnectorGap />}
                </Fragment>
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
