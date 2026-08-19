import Button, { ButtonContent } from 'components/Button'
import { canActivateComputeBoost, canReclaimComputeBoost, formatAmount, formatOfflineDuration, isBandwidthAvailable, isComputeBoostTurnAvailable, isDiskBuildAvailable, isDiskFillAvailable } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO, COMPUTE_MERGE_RESERVE_CAP } from 'game/layers'
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

const AutoBadge = styled.span`
  flex: 0 0 auto;
  width: 1.9em;
  text-align: center;
  font-size: 0.85em;
  color: ${props => props.theme.color.good};
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

// The full ten-tier progression this page walks top to bottom. Every row past Cores through
// Supercomputers shares the exact same shape: a merge boundary into the tier above it, which —
// once that boundary's auto-merge is unlocked (see intro.autoMergeCoresIntoNode/
// autoMergeNodesIntoCluster/… in engine.js) — transitions from an instant manual click to
// engine.js's timed reserve-pool system (see issue #321). Core → Node is included as an ordinary
// boundary here, same as every other one — this is unrelated to the separate Memory → Core
// "Claim Core"/auto-claim mechanic, whose manual action lives on ByteFoundryPage and whose
// auto-claim unlock control renders as a small badge on Cores' own header row here (autoClaim*
// fields below), since it doesn't fit the row-2 merge-boundary shape every other control uses.
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
    // The separate, unrelated Memory -> Core auto-claim control (see comment above).
    autoClaimFlagField: 'autoClaimCoreEnabled',
    autoClaimCostLabel: 'Nodes',
    autoClaimCostField: 'computeNodes',
    enableAutoClaimAction: 'enableAutoClaimCore',
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
// once revealed (isComputeCoreConversionUnlocked), reached via that page's "⚡ Compute" nav
// button. Activation is still gated by the Byte Foundry's forced priority order — Disk
// Fill > Bandwidth > Disk Build > Compute > Memory — so a preset can show disabled here
// even while mechanically activatable (canActivateComputeBoost), if something ranked above
// Compute (which lives back on ByteFoundryPage/StoragePage) currently outranks it. The ten-tier
// merge chain (Core → Node → Cluster → Network → Grid → Fabric → Cloud → Datacenter →
// Supercomputer → Megacomputer, see issues #280/#321) lives here too, alongside Boost — one page
// for everything Compute, rather than a second dedicated screen. Each tier renders two rows (see
// ENTITY_ROWS/TierBlock above): row 1 is COMPUTE_ENTITY_CAP (10) normal slots plus the tier's
// name/symbol; row 2 is, pre-unlock, an instant Merge button + an Unlock Auto-merge button, or,
// post-unlock, the COMPUTE_MERGE_RESERVE_CAP (8) reserve slots themselves — clicking that row is
// what manually starts a new reserve merge once isCompute*MergeStartAvailable allows it ("the
// button is enabled only when there are at least 8 tokens available across all the 18 slots").
// Merging only ever fires automatically once the player has separately unlocked auto-merge for
// that specific boundary; either way, once unlocked, a start (auto or manual) commits
// COMPUTE_MERGE_RATIO (8) tokens to the reserve and counts down that boundary's own fixed
// duration (COMPUTE_MERGE_DURATIONS_SECONDS in layers.js) before granting 1 of the output entity.
// "Compute" names the page/feature only — individual entities drop the word (Core, Node,
// Cluster, … not "Compute Core"/"Compute Node"/…). The merge section itself only renders once
// `intro.computeMergePageUnlocked` — the page reveals as soon as Compute is unlocked
// (isComputeCoreConversionUnlocked, well before 8 Cores are possible), but the merge chain stays
// hidden behind its own later, one-time latch until the player has actually earned enough Cores to
// use it (see engine.js's tickComputeCoreConversion for where that latch flips). `onBack` always
// returns to the Byte Foundry.
const ComputePage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  const blockedByPriority = isDiskFillAvailable(state) || isBandwidthAvailable(state) || isDiskBuildAvailable(state)

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
          <TierBlocksGroup aria-label="compute entities">
            {ENTITY_ROWS.map(row => {
              const count = intro[row.countField] ?? 0
              const hasMergeRow = Boolean(row.autoFlagField)
              const autoEnabled = hasMergeRow ? Boolean(intro[row.autoFlagField]) : false
              const autoCostHeld = row.autoCostField ? (intro[row.autoCostField] ?? 0) : 0
              const canEnableAuto = hasMergeRow && !autoEnabled && autoCostHeld >= COMPUTE_ENTITY_CAP
              const remainingSeconds = row.timerField ? (intro[row.timerField] ?? 0) : 0
              const merging = remainingSeconds > 0
              const startAvailable = autoEnabled && !merging && count >= COMPUTE_MERGE_RATIO && (intro[row.mergeOutputField] ?? 0) < COMPUTE_ENTITY_CAP

              const autoClaimEnabled = row.autoClaimFlagField ? Boolean(intro[row.autoClaimFlagField]) : false
              const autoClaimCostHeld = row.autoClaimCostField ? (intro[row.autoClaimCostField] ?? 0) : 0
              const canEnableAutoClaim = Boolean(row.enableAutoClaimAction) && !autoClaimEnabled && autoClaimCostHeld >= COMPUTE_ENTITY_CAP

              return (
                <TierBlock key={row.key} aria-label={`${row.label} tier`}>
                  <TierHeaderRow>
                    <TierSymbol aria-hidden="true">{row.symbol}</TierSymbol>
                    <TierLabel>{`${row.label} ${formatAmount(count)}/${COMPUTE_ENTITY_CAP}`}</TierLabel>
                    <SlotsRow role="group" aria-label={`${row.label} slots`}>
                      {Array.from({ length: COMPUTE_ENTITY_CAP }, (_, index) => (
                        <NormalSlot key={index} $filled={index < count} aria-hidden="true" />
                      ))}
                    </SlotsRow>
                    {row.enableAutoClaimAction && (
                      autoClaimEnabled ? (
                        <AutoBadge title="Auto-claim enabled: Memory automatically converts into a Core whenever full">🤖</AutoBadge>
                      ) : (
                        <IconButton
                          aria-label="enable auto-claim for Cores"
                          disabled={!canEnableAutoClaim}
                          onClick={() => actions[row.enableAutoClaimAction]()}
                          title={`Auto-claim: sacrifice all ${COMPUTE_ENTITY_CAP} ${row.autoClaimCostLabel} (have ${formatAmount(autoClaimCostHeld)}) to permanently automate Memory -> Core conversion whenever full`}
                          type="button"
                          variant="info"
                        >
                          <ButtonContent>🤖</ButtonContent>
                        </IconButton>
                      )
                    )}
                  </TierHeaderRow>

                  {hasMergeRow && (
                    <TierMergeRow>
                      {autoEnabled ? (
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
                      )}
                    </TierMergeRow>
                  )}
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
                ? 'Take a higher-priority upgrade first (Disk Fill, Bandwidth, or Disk Build)'
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
