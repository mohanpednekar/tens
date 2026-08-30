import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import {
  formatAmount,
  formatDiskSize,
  formatOfflineDuration,
  getBoosterPurchaseCost,
  getDataLakeCapacity,
  getDataLakeCapacityDoublingCost,
  getDataLakeCapacityLevel,
  getDataLakeDepositedUnits,
  getDataLakeTier,
  getDataLakeTierLabel,
  getDataLakeTransferCapacity,
  getDataLakeUnitBits,
  isDataLakeCapacityDoublingTurnAvailable,
  isDataLakeCapacityMaxed,
} from 'game/engine'
import { COMPUTE_TIER_LABELS, DATA_LAKE_TIER_COUNT } from 'game/layers'
import styled from 'styled-components'

// A single grid shared across every visible lake row (rather than one flex row per lake) so the
// Deposited/Capacity/Bought/Next columns line up vertically instead of each row wrapping/aligning
// independently — the polish pass this panel needed once it stopped being a one-line-per-lake
// afterthought.
const LakeGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto auto auto;
  column-gap: ${props => props.theme.space.md};
  row-gap: ${props => props.theme.space.xs};
  width: 100%;
  font-size: ${props => props.theme.type.scale.sm.size};
`

const LakeHeaderRow = styled.span`
  font-size: ${props => props.theme.type.scale.xs.size};
  font-weight: 600;
  color: ${props => props.theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: right;
  white-space: nowrap;

  &:first-child {
    text-align: left;
  }
`

// display: contents lets each lake's own cells become direct children of LakeGrid above (so its
// columns actually line up across rows) without this wrapper adding an extra box of its own —
// the same "invisible grouping" a <tbody>/<tr> pair gets for free in a real <table>.
const LakeRow = styled.div`
  display: contents;
`

const LakeName = styled.span`
  font-weight: 600;
  color: ${props => props.theme.color.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LakeStat = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
`

// Stacks the capacity figure over its own doubling control, right-aligned like every other numeric
// column, rather than widening the grid with a separate always-empty header column for it.
const CapacityCell = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
`

// Compact — icon + multiplier only, cost tucked into the title/aria-label rather than a second
// visible line, matching this panel's already-terse per-row layout.
const DoubleCapacityButton = styled(Button)`
  padding: 0.1rem 0.4rem;
  font-size: ${props => props.theme.type.scale.xs.size};
`

const LakeTransferNote = styled.span`
  grid-column: 1 / -1;
  color: ${props => props.theme.color.textMuted};
  font-size: ${props => props.theme.type.scale.xs.size};
  font-variant-numeric: tabular-nums;
`

// Only rendered in `bare` mode, and only once there's actually a list below it to separate from
// whatever the host card rendered above (Storage's Provision Disk button/Disk rows) — mirrors the
// StatCard-wrapped mode, where that same visual break is just the card's own outer border.
const BareDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${props => props.theme.color.border};
  margin: 0;
`

const getVisibleLakeTierIndexes = state => {
  const tiers = []
  for (let tierIndex = 1; tierIndex <= DATA_LAKE_TIER_COUNT; tierIndex += 1) {
    const deposited = getDataLakeDepositedUnits(tierIndex)(state)
    const lake = getDataLakeTier(state, tierIndex)
    // A lake whose capacity was already doubled at least once (before ever holding a deposit) is
    // just as worth showing as one with activity — its own level has moved off the starting value.
    const capacityGrown = getDataLakeCapacityLevel(state, tierIndex) > 0
    if (deposited > 0 || (lake?.purchased ?? 0) > 0 || (lake?.transfers?.length ?? 0) > 0 || capacityGrown) {
      tiers.push(tierIndex)
    }
  }
  return tiers
}

// `bare` skips the own StatCard wrapper (background/border/shadow/padding) and renders just the
// grid — used when a caller (e.g. ByteFoundryPage's single pool card) already provides that chrome
// and nesting a second card here would double-box the same content. `actions` is only needed for
// the capacity-doubling button below.
const DataLakePanel = ({ actions, state, bare = false }) => {
  const visibleTiers = getVisibleLakeTierIndexes(state)
  if (visibleTiers.length === 0) return null

  const list = (
    <LakeGrid>
      <LakeHeaderRow>Lake</LakeHeaderRow>
      <LakeHeaderRow>Deposited</LakeHeaderRow>
      <LakeHeaderRow>Capacity</LakeHeaderRow>
      <LakeHeaderRow>Bought</LakeHeaderRow>
      <LakeHeaderRow>Next</LakeHeaderRow>
      {visibleTiers.map(tierIndex => {
        const label = getDataLakeTierLabel(tierIndex)
        // Deposited stock is a prepaid convenience buffer, spent FIRST (instantly) toward a
        // Booster's cost — any remainder is sourced live from built Disks over a timed transfer
        // instead (see startBoosterTransfer/tickDataLakeTransfers in engine.js); the lake itself
        // never banks a second spendable reserve beyond this deposited amount.
        const deposited = getDataLakeDepositedUnits(tierIndex)(state)
        const lake = getDataLakeTier(state, tierIndex)
        const purchased = lake?.purchased ?? 0
        const nextCost = getBoosterPurchaseCost(tierIndex)(state)
        const transfers = lake?.transfers ?? []
        const transferCapacity = getDataLakeTransferCapacity(state, tierIndex)
        const soonestTransferSeconds = transfers.length > 0
          ? Math.min(...transfers.map(transfer => transfer.remainingSeconds ?? 0))
          : 0
        const boosterLabel = COMPUTE_TIER_LABELS[tierIndex - 1] ?? 'Booster'
        // Deposited/capacity/next-cost are all abstract unit counts internally, but every figure
        // shown here converts through unitBits into the same Byte-scale currency Disks themselves
        // display (formatDiskSize) — per "Data lake uses the same currency as disks" — rather than
        // a bare unit count.
        const unitBits = getDataLakeUnitBits(tierIndex)
        const capacity = getDataLakeCapacity(state, tierIndex)
        const doublingCost = getDataLakeCapacityDoublingCost(state, tierIndex)
        const canDouble = isDataLakeCapacityDoublingTurnAvailable(state, tierIndex)
        const maxed = isDataLakeCapacityMaxed(state, tierIndex)
        const depositedSize = formatDiskSize(deposited * unitBits)
        const capacitySize = formatDiskSize(capacity * unitBits)
        const nextCostSize = formatDiskSize(nextCost * unitBits)

        return (
          <LakeRow key={tierIndex}>
            <LakeName title={`${label} Data Lake → ${boosterLabel}`}>{`${label} → ${boosterLabel}`}</LakeName>
            <LakeStat>{depositedSize}</LakeStat>
            <CapacityCell>
              {capacitySize}
              {!maxed && (
                <DoubleCapacityButton
                  aria-label={`double the ${label} Data Lake's capacity`}
                  disabled={!canDouble}
                  onClick={() => actions.doubleDataLakeCapacity(tierIndex)}
                  title={`Spend ${formatDiskSize(doublingCost)} — this lake's own current capacity — to double it to ${formatDiskSize(capacity * 2 * unitBits)}`}
                  type="button"
                  variant={canDouble ? 'prestige' : 'neutral'}
                >
                  <ButtonContent>⚡ ×2</ButtonContent>
                </DoubleCapacityButton>
              )}
            </CapacityCell>
            <LakeStat>{formatAmount(purchased)}</LakeStat>
            <LakeStat>{nextCostSize}</LakeStat>
            {transfers.length > 0 && (
              <LakeTransferNote>
                {`${formatAmount(transfers.length)}/${formatAmount(transferCapacity)} transferring · ${formatOfflineDuration(soonestTransferSeconds)} left`}
              </LakeTransferNote>
            )}
          </LakeRow>
        )
      })}
    </LakeGrid>
  )

  if (bare) {
    return (
      <>
        <BareDivider />
        {list}
      </>
    )
  }

  return <StatCard aria-label="Data Lakes">{list}</StatCard>
}

export default DataLakePanel
