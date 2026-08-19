import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import { canActivateComputeBoost, canReclaimComputeBoost, formatAmount, formatOfflineDuration, isComputeBoostTurnAvailable, isStorageBankBuildAvailable, isStorageBankFillAvailable, isBandwidthAvailable } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO } from 'game/layers'
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

// One row per compute-ladder entity — count and its own action button(s) together, replacing the
// old separate top counters row + separate merge-buttons section (see issue #316). Follows
// MainPage's own per-tier-row design cue: a StatCard-based flex row, not a full grid, since a
// compute entity's row only ever needs a label, a count, and up to two small action buttons —
// nowhere near MainPage's own tier row's four-track layout.
const EntityRowsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

// `flex-wrap: nowrap` is deliberate — every tier's row must fit on exactly one line (see issue
// #316's own "fit every compute tier in one line" ask); icon-only controls below keep each row
// narrow enough that this holds even at mobile widths, where the old wrapping row + full-word
// buttons would otherwise spill onto a second line.
const EntityRow = styled(StatCard)`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: ${props => props.theme.space.xs};
  width: 100%;
  padding: 0.3rem 0.6rem;
`

const EntityLabel = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 0.9em;
`

const EntityCount = styled.span`
  flex: 0 0 auto;
  font-family: ${props => props.theme.font.display};
  font-weight: 700;
  font-size: 0.85em;
  color: ${props => props.theme.color.textMuted};
`

const EntityActions = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: 4px;
`

// Shared by the per-tier Merge/auto-unlock buttons and the Boost presets below — small and
// icon-only (see IconButton), so a whole row (label + count + up to 2 controls, or 3 boost
// presets + a Core count) reads as one compact line even at narrow widths. The full description
// always lives in `title`/`aria-label` instead of visible text — see issue #316's "clever symbols
// ... intuitive with no or single word labels" ask.
const CompactButton = styled(Button)`
  font-size: 0.78em;
  padding: 0.35em 0.6em;
`

// A fixed-width, icon-only variant of CompactButton for the per-tier Merge/auto-unlock controls —
// square rather than pill-shaped, so a lone glyph reads as a single tappable icon instead of a
// button with empty padding around it.
const IconButton = styled(CompactButton)`
  flex: 0 0 auto;
  width: 1.9em;
  padding: 0.3em;
`

// A plain status badge for a tier whose automation is already permanently unlocked — no click, so
// it's deliberately not a <Button>; the icon alone (colored) reads as "done" rather than another
// action to consider.
const AutoBadge = styled.span`
  flex: 0 0 auto;
  width: 1.9em;
  text-align: center;
  font-size: 0.85em;
  color: ${props => props.theme.color.good};
`

// The Boost row: available Cores (the currency every preset spends) shown in the same row as the
// 3 preset buttons themselves, rather than buried in a separate counters section — see issue #316.
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

const CoresAvailable = styled.span`
  flex: 0 0 auto;
  font-family: ${props => props.theme.font.display};
  font-weight: 700;
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

// The full ten-tier progression this page walks top to bottom. Core is the special first row — no
// merge button of its own (Memory → Core has no merge INPUT in the traditional sense), and its
// manual "Claim Core" action lives on ByteFoundryPage instead (see issue #316) — but its own
// auto-claim unlock control still lives here, alongside every other tier's auto-merge unlock, for
// one consistent "automation control center" rather than splitting that concept across two pages.
// Every other row (Node through Supercomputer) always shows its Merge button once
// intro.computeMergePageUnlocked, enabled at COMPUTE_MERGE_RATIO (8) regardless of auto-merge
// state. Megacomputer (the last tier) has no merge/auto row at all — nothing to merge into or
// automate past it.
const ENTITY_ROWS = [
  {
    key: 'core',
    label: 'Cores',
    countField: 'computeCores',
    autoFlagField: 'autoClaimCoreEnabled',
    autoCostLabel: 'Nodes',
    autoCostField: 'computeNodes',
    enableAutoAction: 'enableAutoClaimCore',
    autoAriaLabel: 'enable auto-claim for Cores',
  },
  {
    key: 'nodesIntoCluster',
    label: 'Nodes',
    countField: 'computeNodes',
    mergeInputLabel: 'Nodes',
    mergeOutputLabel: 'Cluster',
    mergeInputField: 'computeNodes',
    mergeOutputField: 'computeClusters',
    mergeAction: 'mergeComputeNodesIntoCluster',
    autoFlagField: 'autoMergeNodesIntoCluster',
    autoCostLabel: 'Clusters',
    autoCostField: 'computeClusters',
    enableAutoAction: 'enableAutoMergeNodesIntoCluster',
    autoAriaLabel: 'enable auto-merge for Nodes into Clusters',
  },
  {
    key: 'clustersIntoNetwork',
    label: 'Clusters',
    countField: 'computeClusters',
    mergeInputLabel: 'Clusters',
    mergeOutputLabel: 'Network',
    mergeInputField: 'computeClusters',
    mergeOutputField: 'computeNetworks',
    mergeAction: 'mergeComputeClustersIntoNetwork',
    autoFlagField: 'autoMergeClustersIntoNetwork',
    autoCostLabel: 'Networks',
    autoCostField: 'computeNetworks',
    enableAutoAction: 'enableAutoMergeClustersIntoNetwork',
    autoAriaLabel: 'enable auto-merge for Clusters into Networks',
  },
  {
    key: 'networksIntoGrid',
    label: 'Networks',
    countField: 'computeNetworks',
    mergeInputLabel: 'Networks',
    mergeOutputLabel: 'Grid',
    mergeInputField: 'computeNetworks',
    mergeOutputField: 'computeGrids',
    mergeAction: 'mergeComputeNetworksIntoGrid',
    autoFlagField: 'autoMergeNetworksIntoGrid',
    autoCostLabel: 'Grids',
    autoCostField: 'computeGrids',
    enableAutoAction: 'enableAutoMergeNetworksIntoGrid',
    autoAriaLabel: 'enable auto-merge for Networks into Grids',
  },
  {
    key: 'gridsIntoFabric',
    label: 'Grids',
    countField: 'computeGrids',
    mergeInputLabel: 'Grids',
    mergeOutputLabel: 'Fabric',
    mergeInputField: 'computeGrids',
    mergeOutputField: 'computeFabrics',
    mergeAction: 'mergeComputeGridsIntoFabric',
    autoFlagField: 'autoMergeGridsIntoFabric',
    autoCostLabel: 'Fabrics',
    autoCostField: 'computeFabrics',
    enableAutoAction: 'enableAutoMergeGridsIntoFabric',
    autoAriaLabel: 'enable auto-merge for Grids into Fabrics',
  },
  {
    key: 'fabricsIntoCloud',
    label: 'Fabrics',
    countField: 'computeFabrics',
    mergeInputLabel: 'Fabrics',
    mergeOutputLabel: 'Cloud',
    mergeInputField: 'computeFabrics',
    mergeOutputField: 'computeClouds',
    mergeAction: 'mergeComputeFabricsIntoCloud',
    autoFlagField: 'autoMergeFabricsIntoCloud',
    autoCostLabel: 'Clouds',
    autoCostField: 'computeClouds',
    enableAutoAction: 'enableAutoMergeFabricsIntoCloud',
    autoAriaLabel: 'enable auto-merge for Fabrics into Clouds',
  },
  {
    key: 'cloudsIntoDatacenter',
    label: 'Clouds',
    countField: 'computeClouds',
    mergeInputLabel: 'Clouds',
    mergeOutputLabel: 'Datacenter',
    mergeInputField: 'computeClouds',
    mergeOutputField: 'computeDatacenters',
    mergeAction: 'mergeComputeCloudsIntoDatacenter',
    autoFlagField: 'autoMergeCloudsIntoDatacenter',
    autoCostLabel: 'Datacenters',
    autoCostField: 'computeDatacenters',
    enableAutoAction: 'enableAutoMergeCloudsIntoDatacenter',
    autoAriaLabel: 'enable auto-merge for Clouds into Datacenters',
  },
  {
    key: 'datacentersIntoSupercomputer',
    label: 'Datacenters',
    countField: 'computeDatacenters',
    mergeInputLabel: 'Datacenters',
    mergeOutputLabel: 'Supercomputer',
    mergeInputField: 'computeDatacenters',
    mergeOutputField: 'computeSupercomputers',
    mergeAction: 'mergeComputeDatacentersIntoSupercomputer',
    autoFlagField: 'autoMergeDatacentersIntoSupercomputer',
    autoCostLabel: 'Supercomputers',
    autoCostField: 'computeSupercomputers',
    enableAutoAction: 'enableAutoMergeDatacentersIntoSupercomputer',
    autoAriaLabel: 'enable auto-merge for Datacenters into Supercomputers',
  },
  {
    key: 'supercomputersIntoMegacomputer',
    label: 'Supercomputers',
    countField: 'computeSupercomputers',
    mergeInputLabel: 'Supercomputers',
    mergeOutputLabel: 'Megacomputer',
    mergeInputField: 'computeSupercomputers',
    mergeOutputField: 'computeMegacomputers',
    mergeAction: 'mergeComputeSupercomputersIntoMegacomputer',
    autoFlagField: 'autoMergeSupercomputersIntoMegacomputer',
    autoCostLabel: 'Megacomputers',
    autoCostField: 'computeMegacomputers',
    enableAutoAction: 'enableAutoMergeSupercomputersIntoMegacomputer',
    autoAriaLabel: 'enable auto-merge for Supercomputers into Megacomputers',
  },
  {
    key: 'megacomputer',
    label: 'Megacomputers',
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
// once revealed (isComputeCoreConversionUnlocked), reached via that page's "⚡ Compute" nav
// button. Activation is still gated by the Byte Foundry's forced priority order — Storage Bank
// Fill > Bandwidth > Storage Bank Build > Compute > Memory — so a preset can show disabled here
// even while mechanically activatable (canActivateComputeBoost), if something ranked above
// Compute (which lives back on ByteFoundryPage/StoragePage) currently outranks it. The manual
// ten-tier merge chain (Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter →
// Supercomputer → Megacomputer, see issue #280) lives here too, alongside Boost — one page for
// everything Compute, rather than a second dedicated screen; merging is the player's own choice
// and never fires automatically UNLESS the player has separately unlocked auto-merge for that
// specific tier boundary (see issue #316 — each of the 8 manual merges, plus Core's own auto-claim,
// can be permanently automated by sacrificing 10 of the tier above). "Compute" names the page/
// feature only — individual entities drop the word (Core, Node, Cluster, … not "Compute Core"/
// "Compute Node"/…). The merge section itself (every row past Cores, plus each row's own
// button(s)) only renders once `intro.computeMergePageUnlocked` — the page reveals as soon as
// Compute is unlocked (isComputeCoreConversionUnlocked, well before 8 Cores are possible), but the
// merge chain stays hidden behind its own later, one-time latch until the player has actually
// earned enough Cores to use it (see engine.js's tickComputeCoreConversion for where that latch
// flips). `onBack` always returns to the Byte Foundry.
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

      {intro.computeBoostType && COMPUTE_BOOST_PRESETS[intro.computeBoostType] && (
        <ActiveBoostRow aria-label="active compute boost">
          <span
            title={`${COMPUTE_BOOST_DISPLAY[intro.computeBoostType]?.label ?? intro.computeBoostType} active: ×${COMPUTE_BOOST_PRESETS[intro.computeBoostType].multiplier} production, ${formatOfflineDuration(intro.computeBoostRemainingSeconds)} left, ${intro.computeBoostStacks}x stacked`}
          >
            {`${COMPUTE_BOOST_DISPLAY[intro.computeBoostType]?.icon ?? '⚡'} ×${COMPUTE_BOOST_PRESETS[intro.computeBoostType].multiplier} · ${formatOfflineDuration(intro.computeBoostRemainingSeconds)} · ${intro.computeBoostStacks}×`}
          </span>
          {canReclaimComputeBoost(state) && (
            <IconButton
              aria-label="reclaim one stack of the active compute boost"
              onClick={actions.reclaimComputeBoost}
              title="Reclaim the most recent unused stack: refunds 1 Core and its duration — one at a time"
              type="button"
              variant="neutral"
            >
              <ButtonContent>↩</ButtonContent>
            </IconButton>
          )}
        </ActiveBoostRow>
      )}

      {intro.computeMergePageUnlocked
        ? (
          <EntityRowsGroup aria-label="compute entities">
            {ENTITY_ROWS.map(row => {
              const count = intro[row.countField] ?? 0
              const isLastTier = !row.autoFlagField
              const autoEnabled = row.autoFlagField ? Boolean(intro[row.autoFlagField]) : false
              const autoCostHeld = row.autoCostField ? (intro[row.autoCostField] ?? 0) : 0
              const canEnableAuto = !isLastTier && !autoEnabled && autoCostHeld >= COMPUTE_ENTITY_CAP

              return (
                <EntityRow key={row.key} aria-label={`${row.label} row`}>
                  <EntityLabel>{row.label}</EntityLabel>
                  <EntityCount>{`${formatAmount(count)}/${COMPUTE_ENTITY_CAP}`}</EntityCount>
                  {!isLastTier && (
                    <EntityActions>
                      {row.mergeAction && (
                        <IconButton
                          aria-label={`merge ${COMPUTE_MERGE_RATIO} ${row.mergeInputLabel.toLowerCase()} into 1 ${row.mergeOutputLabel.toLowerCase()}`}
                          disabled={!canMerge(intro[row.mergeInputField] ?? 0, intro[row.mergeOutputField] ?? 0)}
                          onClick={() => actions[row.mergeAction]()}
                          title={
                            (intro[row.mergeOutputField] ?? 0) >= COMPUTE_ENTITY_CAP
                              ? `${row.mergeOutputLabel} is already at the max of ${COMPUTE_ENTITY_CAP}`
                              : `Merge: spend ${COMPUTE_MERGE_RATIO} ${row.mergeInputLabel} for 1 ${row.mergeOutputLabel}`
                          }
                          type="button"
                          variant="prestige"
                        >
                          <ButtonContent>⬆</ButtonContent>
                        </IconButton>
                      )}
                      {autoEnabled ? (
                        <AutoBadge title={`Auto-merge enabled: ${row.label} auto-merges into ${row.mergeOutputLabel ?? '1 Node'} whenever full`}>🤖</AutoBadge>
                      ) : (
                        <IconButton
                          aria-label={row.autoAriaLabel}
                          disabled={!canEnableAuto}
                          onClick={() => actions[row.enableAutoAction]()}
                          title={`Auto: sacrifice all ${COMPUTE_ENTITY_CAP} ${row.autoCostLabel} (have ${formatAmount(autoCostHeld)}) to permanently automate this step whenever ${row.label} is full`}
                          type="button"
                          variant="info"
                        >
                          <ButtonContent>🤖</ButtonContent>
                        </IconButton>
                      )}
                    </EntityActions>
                  )}
                </EntityRow>
              )
            })}
          </EntityRowsGroup>
          )
        : (
          <StatusText>
            {`⬡ ${formatAmount(intro.computeCores ?? 0)}/${COMPUTE_ENTITY_CAP} · 🔗 ${formatAmount(intro.computeNodes ?? 0)}/${COMPUTE_ENTITY_CAP}`}
          </StatusText>
          )}

      <BoostRow role="group" aria-label="compute boost">
        <CoresAvailable title={`${formatAmount(intro.computeCores ?? 0)} Core${(intro.computeCores ?? 0) === 1 ? '' : 's'} available`}>
          {`⬡${formatAmount(intro.computeCores ?? 0)}`}
        </CoresAvailable>
        {Object.entries(COMPUTE_BOOST_PRESETS).map(([boostType, preset]) => (
          <CompactButton
            key={boostType}
            aria-label={`activate ${boostType} compute boost`}
            disabled={!isComputeBoostTurnAvailable(state, boostType)}
            onClick={() => actions.activateComputeBoost(boostType)}
            title={
              canActivateComputeBoost(state, boostType) && blockedByPriority
                ? 'Take a higher-priority upgrade first (Storage Bank Fill, Bandwidth, or Storage Bank Build)'
                : `${COMPUTE_BOOST_DISPLAY[boostType].label}: spend 1 Core for ×${preset.multiplier} production, ${formatOfflineDuration(preset.durationSeconds)} — stacks up to ${COMPUTE_BOOST_MAX_STACKS}x`
            }
            type="button"
            variant="prestige"
          >
            <ButtonContent>{`${COMPUTE_BOOST_DISPLAY[boostType].icon}×${preset.multiplier}`}</ButtonContent>
          </CompactButton>
        ))}
      </BoostRow>
    </RootDiv>
  )
}

export default ComputePage
