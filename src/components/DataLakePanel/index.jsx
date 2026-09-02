import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
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
import { COMPUTE_TIER_LABELS, DATA_LAKE_CAPACITY_BY_LEVEL, DATA_LAKE_TIER_COUNT } from 'game/layers'
import styled from 'styled-components'

// Stacks multiple lake blocks (list mode — see getVisibleLakeTierIndexes below) with breathing
// room between them; a no-op single-child wrapper in the common tierIndex-scoped mode.
const LakesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${props => props.theme.space.md};
  width: 100%;
`

// One lake's own block — title row, fillable balance tile, action row — deliberately mirroring
// ByteFoundryPage's PoolCard-internal layout (PoolHeaderRow + FillableStatCard) rather than a
// dense label/value grid, so a lake reads the same "big number, few words" way every other panel
// on this page already does.
const LakeBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const LakeHeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: ${props => props.theme.space.sm};
`

const LakeTitle = styled.h4`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.space.xs};
  margin: 0;
  min-width: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.md.size};
  line-height: ${props => props.theme.type.scale.md.lineHeight};
  font-weight: 700;
  color: ${props => props.theme.color.text};
`

const LakeTitleSymbol = styled.span`
  flex-shrink: 0;
`

const StatusText = styled.p`
  margin: 0;
  color: ${props => props.theme.color.textMuted};
  text-align: center;
  font-variant-numeric: tabular-nums;
`

const BalanceText = styled.p`
  margin: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.lg.size};
  font-weight: 700;
  text-align: center;
  font-variant-numeric: tabular-nums;
`

// Same fill-gradient tile every other Byte Foundry balance uses (Data Stream card, pool Memory
// buffer) — reused here (duplicated locally, matching how ByteFoundryPage's own PoolCard/
// DataStreamCard duplicate near-identical StatCard wrappers rather than sharing one) so a lake's
// deposited/capacity figure reads as the same kind of thing at a glance, not a bespoke table cell.
const FillableStatCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  ${progressFill}
`

const LakeActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.sm};
`

// Icon + multiplier only, cost tucked into the title/aria-label rather than a second visible
// line — matches every other milestone-style action button on this page (Speed ×2, Capacity ×2,
// Provision Disk).
const UpgradeButton = styled(Button)`
  padding: 0.1rem 0.5rem;
  font-size: ${props => props.theme.type.scale.sm.size};
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
    // A lake whose capacity was already grown at least once (before ever holding a deposit) is
    // just as worth showing as one with activity — its own level has moved off the starting value.
    const capacityGrown = getDataLakeCapacityLevel(state, tierIndex) > 0
    if (deposited > 0 || (lake?.purchased ?? 0) > 0 || (lake?.transfers?.length ?? 0) > 0 || capacityGrown) {
      tiers.push(tierIndex)
    }
  }
  return tiers
}

const clampPercent = value => Math.min(100, Math.max(0, value))

// `bare` skips the own StatCard wrapper (background/border/shadow/padding) — used when a caller
// (e.g. ByteFoundryPage's own pool cards, via `tierIndex` below) already provides that chrome and
// nesting a second card here would double-box the same content. `actions` is only needed for the
// capacity-upgrade button below.
// `tierIndex`, when set, scopes rendering to exactly that one lake — always shown regardless of
// activity (it's a permanent part of that pool's own card now, not a rarity-filtered global list
// entry) — instead of the default every-lake-with-activity behavior `getVisibleLakeTierIndexes`
// still drives when `tierIndex` is omitted.
const DataLakePanel = ({ actions, state, bare = false, tierIndex }) => {
  const visibleTiers = tierIndex != null ? [tierIndex] : getVisibleLakeTierIndexes(state)
  if (visibleTiers.length === 0) return null

  const list = (
    <LakesList>
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
        const canUpgrade = isDataLakeCapacityDoublingTurnAvailable(state, tierIndex)
        const maxed = isDataLakeCapacityMaxed(state, tierIndex)
        // The ladder is a plain decade-power-of-10 step (1, 10, 100, 1,000 — see layers.js), not a
        // literal ×2, so the next value is read off the ladder directly rather than computed as
        // capacity * 2 (only accurate under the earlier SI-clean sequence's own doubling shape —
        // see docs/DESIGN_HISTORY.md). Only read while !maxed, so level + 1 always stays within
        // DATA_LAKE_CAPACITY_BY_LEVEL's bounds.
        const nextCapacity = !maxed && DATA_LAKE_CAPACITY_BY_LEVEL[getDataLakeCapacityLevel(state, tierIndex) + 1]
        const depositedSize = formatDiskSize(deposited * unitBits)
        const capacitySize = formatDiskSize(capacity * unitBits)
        const nextCostSize = formatDiskSize(nextCost * unitBits)
        const depositedPercent = capacity > 0 ? clampPercent((deposited / capacity) * 100) : 0

        return (
          <LakeBlock aria-label={`${label} lake`} key={tierIndex}>
            <LakeHeaderRow>
              <LakeTitle title={`${label} Data Lake — funds ${boosterLabel}`}>
                <LakeTitleSymbol aria-hidden="true">{label}</LakeTitleSymbol>
                <span>Lake</span>
              </LakeTitle>
              <StatusText>{formatAmount(purchased)}× {boosterLabel}</StatusText>
            </LakeHeaderRow>
            <FillableStatCard role="group" aria-label={`${label} lake deposits`} $progress={depositedPercent}>
              <BalanceText>{depositedSize} / {capacitySize}</BalanceText>
              <VisuallyHidden
                role="progressbar"
                aria-label={`${label} lake deposits`}
                aria-valuenow={Math.round(depositedPercent)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </FillableStatCard>
            <LakeActionsRow>
              {!maxed && (
                <UpgradeButton
                  aria-label={`increase the ${label} Data Lake's capacity ×10`}
                  disabled={!canUpgrade}
                  onClick={() => actions.doubleDataLakeCapacity(tierIndex)}
                  title={`Empties the lake (${formatDiskSize(doublingCost)} deposited) to grow its capacity to ${formatDiskSize(nextCapacity * unitBits)} — needs it completely full first`}
                  type="button"
                  variant={canUpgrade ? 'prestige' : 'neutral'}
                >
                  <ButtonContent>⚡ ×10</ButtonContent>
                </UpgradeButton>
              )}
              <StatusText title={`Next Booster from this lake costs ${nextCostSize}`}>🎯 {nextCostSize}</StatusText>
            </LakeActionsRow>
            {transfers.length > 0 && (
              <StatusText>
                {`${formatAmount(transfers.length)}/${formatAmount(transferCapacity)} transferring · ${formatOfflineDuration(soonestTransferSeconds)} left`}
              </StatusText>
            )}
          </LakeBlock>
        )
      })}
    </LakesList>
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
