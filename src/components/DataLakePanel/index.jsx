import Button, { ButtonContent, VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import {
  formatAmount,
  formatDiskSize,
  getBoosterPurchaseCost,
  getDataLakeCapacity,
  getDataLakeCapacityDoublingCost,
  getDataLakeCapacityLevel,
  getDataLakeCurrentFillSubSize,
  getDataLakeDepositedUnits,
  getDataLakeDiskCounts,
  getDataLakeDiskSlotCounts,
  getDataLakeFillBits,
  getDataLakeTier,
  getDataLakeTierLabel,
  getDataLakeUnitBits,
  isBoosterPurchaseAvailable,
  isDataLakeAutoBuyEnabled,
  isDataLakeBoosterUnlocked,
  isDataLakeCapacityDoublingAvailable,
  isDataLakeCapacityDoublingTurnAvailable,
  isDataLakeCapacityMaxed,
} from 'game/engine'
import { COMPUTE_TIER_LABELS, DATA_LAKE_CAPACITY_BY_LEVEL, DATA_LAKE_SUB_SIZES, DATA_LAKE_TIER_COUNT } from 'game/layers'
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

// One lake's own block — title row, disk-array fill display, action row — deliberately mirroring
// ByteFoundryPage's PoolCard-internal layout (PoolHeaderRow + disk rows) rather than a dense
// label/value grid, so a lake reads the same "big number, few words" way every other panel on this
// page already does.
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

// One row of disk squares per sub-size (×1/×10/×100 — see DATA_LAKE_SUB_SIZE_DISK_CAPS in
// layers.js), smallest first — the same "one unbroken row per size" shape Storage's own
// DiskArrayRow uses, just without the cache/redeem interactivity a lake disk doesn't have.
const LakeSizeRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`

const LakeSquare = styled.div`
  position: relative;
  flex: 1 1 1.2rem;
  min-width: 0;
  max-width: 2.5rem;
  aspect-ratio: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  border: 1.5px solid ${props => (props.$full ? props.theme.color.accent : props.theme.color.surfaceSunken)};
  background: ${props => (props.$full ? props.theme.color.surfaceRaised : 'transparent')};
`

// The one slot currently filling (see getDataLakeCurrentFillSubSize/getDataLakeFillBits in
// engine.js) shows its own live progress as a left-to-right fill, same visual language
// DiskArrayRow's own cache-flush fills use.
const LakeSquareFill = styled.div`
  position: absolute;
  inset: 0;
  background: ${props => props.theme.color.accent};
  opacity: 0.8;
  transform-origin: left center;
  transform: scaleX(${props => props.$fill});
`

const LakeSquareLabel = styled.span`
  position: relative;
  pointer-events: none;
  font-family: ${props => props.theme.font.display};
  font-size: 0.6rem;
  font-weight: 600;
  color: ${props => props.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
`

// A dedicated fillable tile — same visual language as the per-square LakeSquareFill overlay above,
// just surfaced as its own explicit element inside the Data Lake section rather than only as a
// sliver on one small square. Purely additive: shows the exact SAME data
// (getDataLakeCurrentDiskFillFraction/getDataLakeFillBits) the square overlay already reads, no
// change to how filling actually works. Represents progress toward the smallest currently-unfilled
// disk in the lake — the instant it reaches full, that disk completes (see fillDataLakeDisks).
const LakePoolTile = styled.div`
  position: relative;
  width: 100%;
  min-height: 1.8rem;
  border-radius: ${props => props.theme.radius.md};
  overflow: hidden;
  background: ${props => props.theme.color.surfaceSunken};
  display: flex;
  align-items: center;
  justify-content: center;
`

const LakePoolFill = styled.div`
  position: absolute;
  inset: 0;
  background: ${props => props.theme.color.accent};
  opacity: 0.35;
  transform-origin: left center;
  transform: scaleX(${props => props.$fill});
`

const LakePoolLabel = styled.span`
  position: relative;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.sm.size};
  font-weight: 600;
  color: ${props => props.theme.color.text};
  font-variant-numeric: tabular-nums;
`

const LakeActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.space.sm};
`

// Icon + amount only, cost/state tucked into the title/aria-label rather than a second visible
// line — matches every other milestone-style action button on this page (Speed ×2, Capacity ×2,
// Provision Disk).
const ActionButton = styled(Button)`
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
    if (deposited > 0 || (lake?.purchased ?? 0) > 0 || (lake?.boostersUnlocked ?? false) || capacityGrown) {
      tiers.push(tierIndex)
    }
  }
  return tiers
}

const clampFraction = value => Math.min(1, Math.max(0, value))

// `bare` skips the own StatCard wrapper (background/border/shadow/padding) — used when a caller
// (e.g. ByteFoundryPage's own pool cards, via `tierIndex` below) already provides that chrome and
// nesting a second card here would double-box the same content. `actions` is only needed for the
// buy/auto-buy/capacity-upgrade buttons below.
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
        const lake = getDataLakeTier(state, tierIndex)
        const purchased = lake?.purchased ?? 0
        const nextCost = getBoosterPurchaseCost(tierIndex)(state)
        const boosterLabel = COMPUTE_TIER_LABELS[tierIndex - 1] ?? 'Booster'
        // Deposited/capacity/next-cost are all abstract unit counts internally, but every figure
        // shown here converts through unitBits into the same Byte-scale currency Disks themselves
        // display (formatDiskSize) — per "Data lake uses the same currency as disks" — rather than
        // a bare unit count.
        const unitBits = getDataLakeUnitBits(tierIndex)
        const capacity = getDataLakeCapacity(state, tierIndex)
        const maxed = isDataLakeCapacityMaxed(state, tierIndex)
        // The ladder is a plain decade-power-of-10 step (1, 10, 100, 1,000 — see layers.js), not a
        // literal ×2, so the next value is read off the ladder directly rather than computed as
        // capacity * 2 (only accurate under the earlier SI-clean sequence's own doubling shape —
        // see docs/DESIGN_HISTORY.md). Only read while !maxed, so level + 1 always stays within
        // DATA_LAKE_CAPACITY_BY_LEVEL's bounds.
        const nextCapacity = !maxed && DATA_LAKE_CAPACITY_BY_LEVEL[getDataLakeCapacityLevel(state, tierIndex) + 1]
        const capacitySize = formatDiskSize(capacity * unitBits)
        const nextCostSize = formatDiskSize(nextCost * unitBits)

        const slotCounts = getDataLakeDiskSlotCounts(state, tierIndex)
        const diskCounts = getDataLakeDiskCounts(state, tierIndex)
        const currentFillSubSize = getDataLakeCurrentFillSubSize(state, tierIndex)
        const fillBits = getDataLakeFillBits(state, tierIndex)

        // No longer mutually exclusive by construction (see isDataLakeCapacityDoublingAvailable in
        // engine.js, tied to real Storage array completion now, not the lake's own escalating
        // Booster cost) — a lake CAN simultaneously afford its next Booster and have its next array
        // already complete. The same button slot still repurposes between the two, preferring
        // Upgrade when both are true (see the ternary below).
        const upgradeAvailable = isDataLakeCapacityDoublingAvailable(state, tierIndex)
        const canUpgrade = isDataLakeCapacityDoublingTurnAvailable(state, tierIndex)
        const doublingCost = getDataLakeCapacityDoublingCost(state, tierIndex)
        const unlocked = isDataLakeBoosterUnlocked(state, tierIndex)
        const canBuy = isBoosterPurchaseAvailable(state, tierIndex)
        const autoBuyEnabled = isDataLakeAutoBuyEnabled(state, tierIndex)

        return (
          <LakeBlock aria-label={`${label} lake`} key={tierIndex}>
            <LakeHeaderRow>
              <LakeTitle title={`${label} Data Lake — funds ${boosterLabel}`}>
                <LakeTitleSymbol aria-hidden="true">{label}</LakeTitleSymbol>
                <span>Lake</span>
              </LakeTitle>
              <StatusText>{formatAmount(purchased)}× {boosterLabel}</StatusText>
            </LakeHeaderRow>

            {currentFillSubSize !== null && (() => {
              // Always visible, even before this lake is unlocked (isDataLakePoolReady) — showing a
              // static "0 / size" the whole time it's waiting, rather than the tile only appearing
              // out of nowhere once real progress starts. Silently absent feedback before that point
              // read as "no idea what it did in between" once the tile DID eventually show up already
              // mid-fill.
              const openSlotSizeBits = unitBits * currentFillSubSize
              const openSlotFraction = unlocked && openSlotSizeBits > 0 ? clampFraction(fillBits / openSlotSizeBits) : 0
              const openSlotSizeLabel = formatDiskSize(openSlotSizeBits)
              return (
                <LakePoolTile
                  role="progressbar"
                  aria-label={`${label} lake pool — fills the next ${openSlotSizeLabel} disk`}
                  aria-valuenow={Math.round(openSlotFraction * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  title={
                    unlocked
                      ? `${label} Lake pool — fills toward the next ${openSlotSizeLabel} disk; completing it deposits instantly`
                      : `${label} Lake pool — waiting on a ${formatDiskSize(unitBits)} disk to be built in Storage before this can start filling`
                  }
                >
                  <LakePoolFill $fill={openSlotFraction} />
                  <LakePoolLabel>{unlocked ? `${formatDiskSize(fillBits)} / ${openSlotSizeLabel}` : `Locked · 0 / ${openSlotSizeLabel}`}</LakePoolLabel>
                </LakePoolTile>
              )
            })()}

            {DATA_LAKE_SUB_SIZES.filter(subSize => (slotCounts[subSize] ?? 0) > 0).map(subSize => {
              const full = diskCounts[subSize] ?? 0
              const totalSlots = slotCounts[subSize]
              const isFillingThisSize = currentFillSubSize === subSize
              const slotSizeBits = unitBits * subSize
              const fillFraction = isFillingThisSize && slotSizeBits > 0 ? clampFraction(fillBits / slotSizeBits) : 0
              const sizeLabel = formatDiskSize(slotSizeBits)
              return (
                <LakeSizeRow key={subSize} role="group" aria-label={`${label} lake ${sizeLabel} disks`}>
                  {Array.from({ length: totalSlots }, (_, index) => {
                    const isFull = index < full
                    const isFilling = !isFull && index === full && isFillingThisSize
                    return (
                      <LakeSquare
                        key={index}
                        $full={isFull}
                        aria-label={
                          isFull
                            ? `full ${sizeLabel} lake disk`
                            : isFilling
                              ? `filling ${sizeLabel} lake disk, ${Math.round(fillFraction * 100)}%`
                              : `empty ${sizeLabel} lake disk`
                        }
                      >
                        {isFilling && <LakeSquareFill $fill={fillFraction} />}
                        <LakeSquareLabel>{sizeLabel}</LakeSquareLabel>
                      </LakeSquare>
                    )
                  })}
                </LakeSizeRow>
              )
            })}
            <VisuallyHidden
              role="progressbar"
              aria-label={`${label} lake deposits`}
              aria-valuenow={Math.round((capacity > 0 ? getDataLakeDepositedUnits(tierIndex)(state) / capacity : 0) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            />

            <LakeActionsRow>
              {upgradeAvailable ? (
                <ActionButton
                  aria-label={`increase the ${label} Data Lake's capacity ×10`}
                  disabled={!canUpgrade}
                  onClick={() => actions.doubleDataLakeCapacity(tierIndex)}
                  title={`Empties the lake (${formatDiskSize(doublingCost)} banked) to grow its capacity from ${capacitySize} to ${formatDiskSize(nextCapacity * unitBits)} — unlocked by completing that array in Storage`}
                  type="button"
                  variant={canUpgrade ? 'prestige' : 'neutral'}
                >
                  <ButtonContent>⚡ Upgrade</ButtonContent>
                </ActionButton>
              ) : unlocked ? (
                <ActionButton
                  aria-label={`buy 1 ${boosterLabel} from the ${label} Data Lake`}
                  disabled={!canBuy}
                  onClick={() => actions.buyBooster(tierIndex)}
                  title={canBuy ? `Buy 1 ${boosterLabel} for ${nextCostSize}` : `Needs ${nextCostSize} banked`}
                  type="button"
                  variant={canBuy ? 'success' : 'neutral'}
                >
                  <ButtonContent>{`🎯 ${nextCostSize}`}</ButtonContent>
                </ActionButton>
              ) : (
                <StatusText title={`Build a ${formatDiskSize(unitBits)} disk in Storage to unlock Boosters here`}>
                  {`🎯 ${nextCostSize}`}
                </StatusText>
              )}
              {unlocked && (
                <ActionButton
                  aria-label={`${autoBuyEnabled ? 'disable' : 'enable'} auto-buy for the ${label} Data Lake`}
                  onClick={() => actions.toggleDataLakeAutoBuy(tierIndex)}
                  title={
                    autoBuyEnabled
                      ? 'Auto-buy is on — the next Booster buys itself the instant it is affordable'
                      : 'Auto-buy is off — buy manually'
                  }
                  type="button"
                  variant={autoBuyEnabled ? 'info' : 'neutral'}
                >
                  <ButtonContent>{autoBuyEnabled ? '🔁 Auto' : '🔁 Manual'}</ButtonContent>
                </ActionButton>
              )}
            </LakeActionsRow>
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
