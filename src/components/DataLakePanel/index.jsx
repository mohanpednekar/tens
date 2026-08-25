import StatCard from 'components/StatCard'
import {
  formatAmount,
  getBoosterPurchaseCost,
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
    if (deposited > 0 || (lake?.purchased ?? 0) > 0) {
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
        // A Booster purchase spends real deposited capacity — there's no separate "available vs.
        // deposited" distinction any more (see getDataLakeAvailableUnits in engine.js); spent
        // capacity only returns once more Disks get deposited to replace it.
        const deposited = getDataLakeDepositedUnits(tierIndex)(state)
        const lake = getDataLakeTier(state, tierIndex)
        const purchased = lake?.purchased ?? 0
        const nextCost = getBoosterPurchaseCost(tierIndex)(state)
        // How many MORE purchases the currently-deposited stock alone can fund in a row, before
        // needing fresh deposits — NOT the tier's lifetime cap (that's DATA_LAKE_CAPACITY itself,
        // 999, shown against `purchased` below — a patient player redepositing between purchases
        // can reach it even though no single deposit-load can burst past ~44).
        const maxPurchasable = getMaxBoosterPurchasesForCapacity(deposited)
        const boosterLabel = COMPUTE_TIER_LABELS[tierIndex - 1] ?? 'Booster'

        return (
          <LakeRow key={tierIndex}>
            <LakeName>{`${label} Data Lake → ${boosterLabel}`}</LakeName>
            <LakeStats>
              {`${formatAmount(deposited)} deposited · ${formatAmount(purchased)}/${formatAmount(DATA_LAKE_CAPACITY)} bought · next ${formatAmount(nextCost)} ${label} · ${formatAmount(maxPurchasable)} more before next deposit`}
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
