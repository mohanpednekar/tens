import StatCard from 'components/StatCard'
import {
  formatAmount,
  getBoosterPurchaseCost,
  getDataLakeAvailableUnits,
  getDataLakeDepositedUnits,
  getDataLakeTier,
  getDataLakeTierLabel,
  getMaxBoosterPurchasesForCapacity,
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

const getVisibleLakeTierIndexes = state => {
  const tiers = []
  for (let tierIndex = 1; tierIndex <= DATA_LAKE_TIER_COUNT; tierIndex += 1) {
    const deposited = getDataLakeDepositedUnits(tierIndex)(state)
    const lake = getDataLakeTier(state, tierIndex)
    if (deposited > 0 || (lake?.purchased ?? 0) > 0) {
      tiers.push(tierIndex)
    }
  }
  return tiers
}

const DataLakePanel = ({ state }) => {
  const visibleTiers = getVisibleLakeTierIndexes(state)
  if (visibleTiers.length === 0) return null

  return (
    <StatCard aria-label="Data Lakes">
      <LakeList>
        {visibleTiers.map(tierIndex => {
          const label = getDataLakeTierLabel(tierIndex)
          const deposited = getDataLakeDepositedUnits(tierIndex)(state)
          const available = getDataLakeAvailableUnits(tierIndex)(state)
          const lake = getDataLakeTier(state, tierIndex)
          const purchased = lake?.purchased ?? 0
          const nextCost = getBoosterPurchaseCost(tierIndex)(state)
          const maxPurchasable = getMaxBoosterPurchasesForCapacity(deposited)
          const boosterLabel = COMPUTE_TIER_LABELS[tierIndex - 1] ?? 'Booster'

          return (
            <LakeRow key={tierIndex}>
              <LakeName>{`${label} Data Lake → ${boosterLabel}`}</LakeName>
              <LakeStats>
                {`${formatAmount(available)}/${formatAmount(deposited)} free · ${formatAmount(purchased)} bought · next ${formatAmount(nextCost)} ${label} · max ${formatAmount(maxPurchasable)} (${formatAmount(DATA_LAKE_CAPACITY)} cap)`}
              </LakeStats>
            </LakeRow>
          )
        })}
      </LakeList>
    </StatCard>
  )
}

export default DataLakePanel
