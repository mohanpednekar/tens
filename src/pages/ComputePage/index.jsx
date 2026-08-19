import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import { canActivateComputeBoost, formatAmount, formatOfflineDuration, isComputeBoostTurnAvailable, isStorageBankBuildAvailable, isStorageBankFillAvailable, isBandwidthAvailable } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO } from 'game/layers'
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

// Title plus the "← Back to Byte Foundry" exit share one row, the same title/nav-link placement
// convention ByteFoundryPage's own <Header> already uses.
const Header = styled.header`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.space.sm};
  justify-content: space-between;
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

const CountersSection = styled(StatCard)`
  align-items: center;
  width: 100%;
`

const CountersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  width: 100%;
`

const CounterTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`

const CounterLabel = styled.span`
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

const CounterValue = styled.span`
  font-family: ${props => props.theme.font.display};
  font-weight: 700;
`

const MergeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

// The 3 boost preset buttons read as one paired choice, matching ByteFoundryPage's own
// MilestonesRow (Sacrifice/Invest) convention — each takes an equal share via `flex: 1`.
const PresetsRow = styled.div`
  display: flex;
  gap: ${props => props.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`

// Display labels for COMPUTE_BOOST_PRESETS' own keys (layers.js) — the preset objects themselves
// are keyed by a plain lowercase identifier, not a display-ready name.
const COMPUTE_BOOST_LABELS = { burst: 'Burst', standard: 'Standard', sustain: 'Sustain' }

// Whether merging COMPUTE_MERGE_RATIO of `input` into 1 more of `output` would do anything right
// now — same "at least one full group, and room under the cap" shape the engine's own
// mergeComputeNodesIntoCluster/mergeComputeClustersIntoNetwork/mergeComputeNetworksIntoGrid
// enforce (see engine.js) — this is only a UI mirror of that gate, not a replacement for it; the
// engine re-validates on every call regardless (see "Security notes" in CLAUDE.md).
const canMerge = (input, output) => input >= COMPUTE_MERGE_RATIO && output < COMPUTE_ENTITY_CAP

// The full ten-tier progression this page's counters row shows, top to bottom: Core is auto-mined
// from Memory (see the StatusText above), every tier from Node onward only ever grows via the
// matching manual merge in MERGE_TIERS below.
const COMPUTE_ENTITIES = [
  { field: 'computeCores', label: 'Cores' },
  { field: 'computeNodes', label: 'Nodes' },
  { field: 'computeClusters', label: 'Clusters' },
  { field: 'computeNetworks', label: 'Networks' },
  { field: 'computeGrids', label: 'Grids' },
  { field: 'computeFabrics', label: 'Fabrics' },
  { field: 'computeClouds', label: 'Clouds' },
  { field: 'computeDatacenters', label: 'Datacenters' },
  { field: 'computeSupercomputers', label: 'Supercomputers' },
  { field: 'computeMegacomputers', label: 'Megacomputers' },
]

const MERGE_TIERS = [
  {
    key: 'nodesIntoCluster',
    inputLabel: 'Nodes',
    outputLabel: 'Cluster',
    inputField: 'computeNodes',
    outputField: 'computeClusters',
    action: 'mergeComputeNodesIntoCluster',
  },
  {
    key: 'clustersIntoNetwork',
    inputLabel: 'Clusters',
    outputLabel: 'Network',
    inputField: 'computeClusters',
    outputField: 'computeNetworks',
    action: 'mergeComputeClustersIntoNetwork',
  },
  {
    key: 'networksIntoGrid',
    inputLabel: 'Networks',
    outputLabel: 'Grid',
    inputField: 'computeNetworks',
    outputField: 'computeGrids',
    action: 'mergeComputeNetworksIntoGrid',
  },
  {
    key: 'gridsIntoFabric',
    inputLabel: 'Grids',
    outputLabel: 'Fabric',
    inputField: 'computeGrids',
    outputField: 'computeFabrics',
    action: 'mergeComputeGridsIntoFabric',
  },
  {
    key: 'fabricsIntoCloud',
    inputLabel: 'Fabrics',
    outputLabel: 'Cloud',
    inputField: 'computeFabrics',
    outputField: 'computeClouds',
    action: 'mergeComputeFabricsIntoCloud',
  },
  {
    key: 'cloudsIntoDatacenter',
    inputLabel: 'Clouds',
    outputLabel: 'Datacenter',
    inputField: 'computeClouds',
    outputField: 'computeDatacenters',
    action: 'mergeComputeCloudsIntoDatacenter',
  },
  {
    key: 'datacentersIntoSupercomputer',
    inputLabel: 'Datacenters',
    outputLabel: 'Supercomputer',
    inputField: 'computeDatacenters',
    outputField: 'computeSupercomputers',
    action: 'mergeComputeDatacentersIntoSupercomputer',
  },
  {
    key: 'supercomputersIntoMegacomputer',
    inputLabel: 'Supercomputers',
    outputLabel: 'Megacomputer',
    inputField: 'computeSupercomputers',
    outputField: 'computeMegacomputers',
    action: 'mergeComputeSupercomputersIntoMegacomputer',
  },
]

// Compute's own dedicated screen — split out of ByteFoundryPage (see "Byte Foundry" in CLAUDE.md)
// once revealed (isComputeCoreConversionUnlocked), reached via that page's "⚡ Compute" nav
// button. Activation is still gated by the Byte Foundry's forced priority order — Storage Bank
// Fill > Bandwidth > Storage Bank Build > Compute > Memory — so a preset can show disabled here
// even while mechanically activatable (canActivateComputeBoost), if something ranked above
// Compute (which lives back on ByteFoundryPage/StoragePage) currently outranks it. The manual
// ten-tier merge chain (Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter →
// Supercomputer → Megacomputer, see issue #280) lives here too, alongside Boost — one page for
// everything Compute, rather than a second dedicated screen; merging is the player's own choice
// and never fires automatically, unlike Core→Node. "Compute" names the page/feature only —
// individual entities drop the word (Core, Node, Cluster, … not "Compute Core"/"Compute Node"/…).
// The merge section itself (every counter past Nodes, plus the 8 merge buttons) only renders once
// `intro.computeMergePageUnlocked` — the page reveals as soon as Compute is unlocked
// (isComputeCoreConversionUnlocked, well before 8 Cores are possible), but the merge chain stays
// hidden behind its own later, one-time latch until the player has actually earned enough Cores to
// use it (see engine.js's tickComputeCoreConversion for where that latch flips).
// `onBack` always returns to the Byte Foundry.
const ComputePage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  const blockedByPriority = isStorageBankFillAvailable(state) || isBandwidthAvailable(state) || isStorageBankBuildAvailable(state)

  return (
    <RootDiv>
      <Header>
        <Title>⚡ Compute</Title>
        <Button aria-label="Back to Byte Foundry" onClick={onBack} title="Back to Byte Foundry" type="button" variant="neutral">
          <ButtonContent>← Back</ButtonContent>
        </Button>
      </Header>
      <StatusText>
        {`Memory auto-converts into 1 Core every time it fills, flushing your current capacity · ${COMPUTE_CORES_PER_NODE} Cores → 1 Node · max ${COMPUTE_ENTITY_CAP} of each`}
      </StatusText>

      {intro.computeMergePageUnlocked
        ? (
          <>
            <StatusText>
              {`Merge ${COMPUTE_MERGE_RATIO} of one tier into 1 of the next — your choice, nothing merges automatically.`}
            </StatusText>

            <CountersSection aria-label="compute counters">
              <CountersRow>
                {COMPUTE_ENTITIES.map(({ field, label }) => (
                  <CounterTile key={field}>
                    <CounterLabel>{label}</CounterLabel>
                    <CounterValue>{`${formatAmount(intro[field] ?? 0)}/${COMPUTE_ENTITY_CAP}`}</CounterValue>
                  </CounterTile>
                ))}
              </CountersRow>
            </CountersSection>

            <MergeRow>
              {MERGE_TIERS.map(({ key, inputLabel, outputLabel, inputField, outputField, action }) => {
                const inputCount = intro[inputField] ?? 0
                const outputCount = intro[outputField] ?? 0
                return (
                  <Button
                    key={key}
                    aria-label={`merge ${COMPUTE_MERGE_RATIO} ${inputLabel.toLowerCase()} into 1 ${outputLabel.toLowerCase()}`}
                    disabled={!canMerge(inputCount, outputCount)}
                    onClick={() => actions[action]()}
                    title={
                      outputCount >= COMPUTE_ENTITY_CAP
                        ? `${outputLabel} is already at the max of ${COMPUTE_ENTITY_CAP}`
                        : `Spend ${COMPUTE_MERGE_RATIO} ${inputLabel} (have ${formatAmount(inputCount)}) for 1 ${outputLabel}`
                    }
                    type="button"
                    variant="prestige"
                  >
                    <ButtonContent>{`Merge ${COMPUTE_MERGE_RATIO} ${inputLabel} → 1 ${outputLabel}`}</ButtonContent>
                  </Button>
                )
              })}
            </MergeRow>
          </>
          )
        : (
          <StatusText>
            {`Cores: ${formatAmount(intro.computeCores ?? 0)}/${COMPUTE_ENTITY_CAP} · Nodes: ${formatAmount(intro.computeNodes ?? 0)}/${COMPUTE_ENTITY_CAP}`}
          </StatusText>
          )}

      <PresetsRow>
        {Object.entries(COMPUTE_BOOST_PRESETS).map(([boostType, preset]) => (
          <Button
            key={boostType}
            aria-label={`activate ${boostType} compute boost`}
            disabled={!isComputeBoostTurnAvailable(state, boostType)}
            onClick={() => actions.activateComputeBoost(boostType)}
            title={
              canActivateComputeBoost(state, boostType) && blockedByPriority
                ? 'Take a higher-priority upgrade first (Storage Bank Fill, Bandwidth, or Storage Bank Build)'
                : `Spend 1 Core: ×${preset.multiplier} production for ${formatOfflineDuration(preset.durationSeconds)} — stacks up to ${COMPUTE_BOOST_MAX_STACKS}x with the same preset`
            }
            type="button"
            variant="prestige"
          >
            <ButtonContent>{`${COMPUTE_BOOST_LABELS[boostType]} ×${preset.multiplier}`}</ButtonContent>
          </Button>
        ))}
      </PresetsRow>
      {intro.computeBoostType && COMPUTE_BOOST_PRESETS[intro.computeBoostType] && (
        <StatusText aria-label="active compute boost">
          {`${COMPUTE_BOOST_LABELS[intro.computeBoostType] ?? intro.computeBoostType} active: ×${COMPUTE_BOOST_PRESETS[intro.computeBoostType].multiplier} production, ${formatOfflineDuration(intro.computeBoostRemainingSeconds)} left (${intro.computeBoostStacks}x stacked)`}
        </StatusText>
      )}
    </RootDiv>
  )
}

export default ComputePage
