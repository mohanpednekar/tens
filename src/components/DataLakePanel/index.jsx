import StatCard from 'components/StatCard'
import {
  formatAmount,
  formatOfflineDuration,
  getBoosterPurchaseCost,
  getDataLakeDepositedUnits,
  getDataLakeTier,
  getDataLakeTierLabel,
  getDataLakeTransferCapacity,
} from 'game/engine'
import { COMPUTE_TIER_LABELS, DATA_LAKE_CAPACITY, DATA_LAKE_TIER_COUNT } from 'game/layers'
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
    if (deposited > 0 || (lake?.purchased ?? 0) > 0 || (lake?.transfers?.length ?? 0) > 0) {
      tiers.push(tierIndex)
    }
  }
  return tiers
}

// `bare` skips the own StatCard wrapper (background/border/shadow/padding) and renders just the
// LakeList — used when a caller (e.g. ByteFoundryPage's single pool card) already provides that
// chrome and nesting a second card here would double-box the same content.
const DataLakePanel = ({ state, bare = false }) => {
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

        return (
          <LakeRow key={tierIndex}>
            <LakeName>{`${label} Data Lake → ${boosterLabel}`}</LakeName>
            <LakeStats>
              {`${formatAmount(deposited)}/${formatAmount(DATA_LAKE_CAPACITY)} deposited · ${formatAmount(purchased)} bought · next ${formatAmount(nextCost)} ${label}`}
              {transfers.length > 0 && ` · ${formatAmount(transfers.length)}/${formatAmount(transferCapacity)} transferring (${formatOfflineDuration(soonestTransferSeconds)} left)`}
            </LakeStats>
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
