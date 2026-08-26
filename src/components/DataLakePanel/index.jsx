import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import {
  formatAmount,
  formatDiskSize,
  formatOfflineDuration,
  getBoosterPurchaseCost,
  getDataLakeCapacity,
  getDataLakeCapacityDoublingCost,
  getDataLakeDepositedUnits,
  getDataLakeSlotMax,
  getDataLakeTier,
  getDataLakeTierLabel,
  getDataLakeTransferCapacity,
  getDataLakeUnitBits,
  isDataLakeCapacityDoublingTurnAvailable,
} from 'game/engine'
import { COMPUTE_TIER_LABELS, DATA_LAKE_SLOT_MAX, DATA_LAKE_TIER_COUNT } from 'game/layers'
import styled from 'styled-components'

const LakeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

const LakeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${props => props.theme.space.xs};
  font-size: ${props => props.theme.type.scale.sm.size};
`

const LakeName = styled.span`
  font-weight: 600;
  color: ${props => props.theme.color.text};
`

const LakeStats = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
`

// Compact — icon + multiplier only, cost tucked into the title/aria-label rather than a second
// visible line, matching this panel's already-terse per-lake row (one LakeRow per lake, not a
// whole card of its own).
const DoubleCapacityButton = styled(Button)`
  padding: 0.2rem 0.5rem;
  font-size: ${props => props.theme.type.scale.xs.size};
`

// Only rendered in `bare` mode, and only once there's actually a list below it to separate from
// whatever the host card rendered above (Storage's Build button/Disk rows) — mirrors the
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
    // just as worth showing as one with activity — its own slotMax has moved off the base value.
    const capacityGrown = getDataLakeSlotMax(state, tierIndex) > DATA_LAKE_SLOT_MAX
    if (deposited > 0 || (lake?.purchased ?? 0) > 0 || (lake?.transfers?.length ?? 0) > 0 || capacityGrown) {
      tiers.push(tierIndex)
    }
  }
  return tiers
}

// `bare` skips the own StatCard wrapper (background/border/shadow/padding) and renders just the
// LakeList — used when a caller (e.g. ByteFoundryPage's single pool card) already provides that
// chrome and nesting a second card here would double-box the same content. `actions` is only
// needed for the capacity-doubling button below.
const DataLakePanel = ({ actions, state, bare = false }) => {
  const visibleTiers = getVisibleLakeTierIndexes(state)
  if (visibleTiers.length === 0) return null

  const list = (
    <LakeList>
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
        const unitBits = getDataLakeUnitBits(tierIndex)
        const capacity = getDataLakeCapacity(state, tierIndex)
        const doublingCost = getDataLakeCapacityDoublingCost(state, tierIndex)
        const canDouble = isDataLakeCapacityDoublingTurnAvailable(state, tierIndex)
        // Deposited/capacity/next-cost are all abstract unit counts internally, but every figure
        // shown here converts through unitBits into the same Byte-scale currency Disks themselves
        // display (formatDiskSize) — per the explicit "Data lake uses the same currency as disks"
        // requirement, replacing what used to be a bare 9/99/999 unit count.
        const depositedSize = formatDiskSize(deposited * unitBits)
        const capacitySize = formatDiskSize(capacity * unitBits)
        const nextCostSize = formatDiskSize(nextCost * unitBits)

        return (
          <LakeRow key={tierIndex}>
            <LakeName>{`${label} Data Lake → ${boosterLabel}`}</LakeName>
            <LakeStats>
              {`${depositedSize}/${capacitySize} deposited · ${formatAmount(purchased)} bought · next ${nextCostSize}`}
              {transfers.length > 0 && ` · ${formatAmount(transfers.length)}/${formatAmount(transferCapacity)} transferring (${formatOfflineDuration(soonestTransferSeconds)} left)`}
            </LakeStats>
            <DoubleCapacityButton
              aria-label={`double the ${label} Data Lake's capacity`}
              disabled={!canDouble}
              onClick={() => actions.doubleDataLakeCapacity(tierIndex)}
              title={`Spend ${formatDiskSize(doublingCost)} — this lake's own current capacity — to double it to ${formatDiskSize(capacity * 2 * unitBits)}`}
              type="button"
              variant={canDouble ? 'prestige' : 'neutral'}
            >
              <ButtonContent>⚡ ×2 Capacity</ButtonContent>
            </DoubleCapacityButton>
          </LakeRow>
        )
      })}
    </LakeList>
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
