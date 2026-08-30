import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import DiskArrayRow from 'components/DiskArrayRow'
import DataLakePanel from 'components/DataLakePanel'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, formatBitsInNearestUnit, formatDiskSize, formatMemoryAmount, getComputeBandwidthSacrificeField, getComputeBandwidthSacrificeLabel, getDiskCost, getDiskRedeemTierName, getDiskSize, getDiskSizesToShow, getIntroKilobyteConversionCost, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getMemoryUnit, getPoolIndexForDiskSize, getPurchaseBlockSize, getStoragePoolBandwidth, getStoragePoolCapacity, getStoragePoolCount, getUnlockedStoragePoolCount, isBandwidthAvailable, isBandwidthTurnAvailable, isComputeFundedBandwidthAvailable, isDiskLadderExhaustedForActivePools, isIntroConversionUnlocked, isMemoryCapacityUpgradeAvailable, isProvisionDiskTurnAvailable, isStorageUnlocked } from 'game/engine'
import { BITS_PER_BYTE, COMPUTE_ENTITY_CAP, DISK_ARRAY_LADDER_CAP, INTRO_BYTE_COMBINE_COST, TIER_DEFINITIONS } from 'game/layers'
import { useEffect, useState } from 'react'
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

const Title = styled.h1`
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  margin: 0;
`

// Page title only — top-level navigation lives in App.jsx's shared AppNav once the main game is
// unlocked (and there is deliberately no exit during the mandatory gate).
const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`

const StatusText = styled.p`
  margin: 0;
  color: ${props => props.theme.color.textMuted};
  text-align: center;
`

const SectionLabel = styled.p`
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

const BalanceText = styled.p`
  margin: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.lg.size};
  font-weight: 700;
  text-align: center;
`

// Tapping stays a fully live action forever (never freezes, never goes read-only — see
// "Byte Foundry" in CLAUDE.md); while the Byte generator exists but the main game isn't unlocked
// yet, it's a secondary/backup action behind passive production, which is why it renders last on
// the page instead of up top — while staying just as clickable (same disabled={isFull} gating
// either way) and always full width, the same width every other action button on this page uses.
// No progress fill here — Memory's own tile already shows the same bits/capacity fill, so a
// duplicate meter on the tap button itself would be redundant. Once intro.mainGameUnlocked, this
// button is removed entirely — Memory's own tile (FillableStatCard below) becomes the tap target
// instead, calling the identical actions.tapIntroBit.
const TapArea = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 2;
  border: 1.5px solid ${props => props.theme.color.accent};
  border-radius: ${props => props.theme.radius.lg};
  background: ${props => props.theme.color.surfaceSunken};
  color: ${props => (props.disabled ? props.theme.color.disabled : props.theme.color.accent)};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

// Speed ×2 is the recurring rate milestone — placing it in MilestonesRow keeps the same flex
// layout the old Sacrifice+Invest pair used. `min-width: 0` lets each button's own label
// ellipsis-truncate (see ButtonLabel in components/Button) instead of forcing the row wider than
// its container at narrow viewports.
const MilestonesRow = styled.div`
  display: flex;
  gap: ${props => props.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`

// Speed ×2's two-line content: the symbol/label/multiplier on top, its cost — what it actually
// spends — on its own line below, in smaller/muted text, rather than crammed
// inline in parentheses. A plain column flex wrapper (not components/Button's own `ButtonContent`,
// which only ever lays out a single icon+label row) so `Button`'s own `display: flex; align-items:
// center; justify-content: center` still centers this whole block as one flex child.
const MilestoneButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`

const MilestoneCostLine = styled.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// Data Stream has one shared control surface; each unlocked storage pool gets its own compact
// derived Bandwidth/Capacity card with its three disk-array rows below it.
const PoolCard = styled(StatCard)`
  width: 100%;
  gap: ${props => props.theme.space.md};
`

const DataStreamCard = styled(StatCard)`
  width: 100%;
  gap: ${props => props.theme.space.md};
`

const PoolSummaryButton = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: center;
  cursor: pointer;
  padding: ${props => props.theme.space.sm};
`

// A thin visual break between the Data Stream controls and its common Provision Disk operation.
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${props => props.theme.color.border};
  margin: 0;
`

// Reuses Button's own progressFill gradient (see components/Button) so Memory's tile fills toward
// its capacity the same visual way every actionable control on this page already does, rather
// than introducing a second, differently-styled meter convention. `align-items: center` centers
// RateBlocksRow horizontally — its own `max-width` keeps it narrower than the tile, so without
// this it would sit flush against the left edge instead of centered under the balance text above
// it. Deliberately a plain div, not `styled(StatCard)` — it renders inside DataStreamCard, which
// supplies the outer border/shadow/background.
// Once intro.mainGameUnlocked, this renders as a real <button> (via the `as` prop below) instead
// of a plain <section> — Memory itself becomes the tap target, replacing the standalone TapArea
// button below (which only renders pre-unlock). `$tappable` adds the same hover/active/disabled
// affordance TapArea itself already has, scoped to this prop so the pre-unlock (non-interactive)
// rendering keeps its plain, unclickable look.
const FillableStatCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  ${progressFill}

  ${props => props.$tappable && `
    cursor: pointer;
    transition: filter 0.15s ease, transform 0.05s ease;

    &:hover:not(:disabled) {
      filter: brightness(1.2);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid ${props.theme.color.accent};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
    }
  `}
`

// Segmented, 8-block visual for the production rate while it's still below 1 Byte/sec (8
// bits/sec) — one block per whole bit/sec, filled left to right. A real (visible, not hidden)
// role="progressbar", since the blocks themselves are the primary at-a-glance info here, unlike
// the plain-text balance bar above (which pairs a hidden progressbar with numbers that already
// convey the same thing accessibly on their own).
const RateBlocksRow = styled.div`
  display: flex;
  gap: 3px;
  width: 100%;
  max-width: 220px;
`

const RateBlock = styled.span`
  flex: 1;
  height: 0.55rem;
  border-radius: 2px;
  background: ${props => (props.$filled ? props.theme.color.good : props.theme.color.surfaceSunken)};
`

// `flex-wrap: nowrap` is deliberate — with `wrap`, once `blockCount` blocks (each `flex: 1 1
// 2.5rem`, growable) no longer fit on one line at a narrow (mobile) width, the leftover blocks
// spill onto a second row where they grow to fill ITS leftover space instead, ending up far wider
// than the blocks on the row above — a visibly broken, misaligned grid. `nowrap` keeps every
// block on one row and lets `flex-shrink` (already implied by `flex: 1 1 2.5rem`) narrow them
// together instead, so the row always reads as one evenly-sized strip regardless of viewport
// width or how large `blockCount` has grown.
const TransferBlocksRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

// One block per unit of tier01's (Kilobytes') own current purchase block size (getPurchaseBlockSize)
// — this row is just a live mirror of purchaseLevelProgress[tier01], the same value the "Kilobytes'
// current block" tracker above already shows, so it rolls over to a fresh, empty row the instant a
// level completes rather than ever running out. Three visual states, read together as one continuous
// progress bar: $consumed (already transferred this level — solid muted fill, permanently disabled),
// $active (the sole clickable one — accent border, partial progressFill gradient toward its own
// 1000-bit threshold), and plain/upcoming (neither prop set — empty outline, disabled placeholder).
// Only the active block is ever passed a $progress value — progressFill returns null without one, so
// the plain `background` rule below (transparent, or surfaceSunken once $consumed) applies instead.
const TransferBlock = styled.button`
  flex: 1 1 2.5rem;
  min-width: 0;
  aspect-ratio: 1;
  border: 1.5px solid ${props => (props.$active ? props.theme.color.accent : props.theme.color.surfaceSunken)};
  border-radius: ${props => props.theme.radius.sm};
  background: ${props => (props.$consumed ? props.theme.color.surfaceSunken : 'transparent')};
  color: ${props => (props.disabled ? props.theme.color.disabled : props.theme.color.accent)};
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease;
  ${progressFill}

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

// Renders "<bits> / <capacity>", both in the same unit (picked off capacity — see getMemoryUnit in
// game/engine).
const formatMemoryBalance = (bits, capacityBits, byteCreated) => {
  const unit = getMemoryUnit(capacityBits, byteCreated)
  return `${formatMemoryAmount(bits, unit)} / ${formatMemoryAmount(capacityBits, unit)}`
}

const clampPercent = value => Math.min(100, Math.max(0, value))

// Before intro.mainGameUnlocked this page is a mandatory gate with no way out via Tiers (AppNav
// still shows Guide/More). Once unlocked, AppNav's Foundry item reopens it at any time — nothing
// here is read-only. Data Stream + per-pool Memory/Storage are continuous sections on this one
// screen (no second-level tabs). Forced priority: Disk Fill > Speed > Provision Disk > Compute.
// focusNonce is accepted for App.jsx parity with MainPage; Foundry no longer has a tab to reset.
const ByteFoundryPage = ({ game, focusNonce: _focusNonce = 0 }) => {
  const { actions, dismissOfflineProgress, offlineProgress, state } = game
  const { intro } = state

  const isFull = intro.bits >= intro.capacity
  const canCombine = !intro.byteCreated && intro.bits >= INTRO_BYTE_COMBINE_COST
  const revealed = isIntroConversionUnlocked(state)
  const storageRevealed = isStorageUnlocked(state)
  const unlockedPoolCount = getUnlockedStoragePoolCount(state)
  // Null follows the largest unlocked pool by default; 0 is an explicit "all collapsed" choice.
  const [expandedPoolIndex, setExpandedPoolIndex] = useState(null)
  useEffect(() => {
    setExpandedPoolIndex(null)
  }, [unlockedPoolCount])
  const visibleExpandedPool = expandedPoolIndex === 0 ? null : expandedPoolIndex ?? unlockedPoolCount
  const productionRate = getIntroProductionRate(intro)
  // Every size ever reached (plus the ladder's current offer) — continuous Storage section on
  // this same screen, ascending via getDiskSizesToShow.
  const diskSizesToShow = storageRevealed ? getDiskSizesToShow(state) : []

  const investCost = getIntroProductionMilestoneCost(intro.productionMilestoneTier)
  const computeBandwidthLabel = getComputeBandwidthSacrificeLabel(state)
  const computeFundedInvest = isComputeFundedBandwidthAvailable(state)
  const investCostDisplay = computeFundedInvest
    ? `${COMPUTE_ENTITY_CAP} ${computeBandwidthLabel}`
    : formatBitsInNearestUnit(investCost)
  const investMaxClaims = getIntroProductionMilestoneMaxClaims(intro.productionMilestoneTier)
  const investClaimsUsedUp = intro.productionMilestoneTierClaims >= investMaxClaims
  // Ranked below Disk Fill in the forced priority order — see isBandwidthTurnAvailable.
  const canInvest = isBandwidthTurnAvailable(state)
  const investBlockedByPriority = isBandwidthAvailable(state) && !canInvest

  // Starting the next disk's build stays on this page (the Byte Foundry's own core loop). Ranked
  // third in the forced priority order — see isProvisionDiskTurnAvailable. Every shown size's
  // DiskArrayRow (Cache then Disks per size, ascending) renders below as continuous sections.
  const diskSize = getDiskSize(state)
  const diskCost = getDiskCost(diskSize)
  const diskLadderExhausted = isDiskLadderExhaustedForActivePools(state)
  const canStartDiskBuild = isProvisionDiskTurnAvailable(state)
  const diskBuildInProgress = intro.diskBuild
  const diskBuildBlockedByPriority = !diskLadderExhausted && intro.bits >= diskCost && !canStartDiskBuild && !diskBuildInProgress
  const diskBuildProgress = diskBuildInProgress
    ? clampPercent(100 - (diskBuildInProgress.remainingSeconds / diskBuildInProgress.totalSeconds) * 100)
    : diskLadderExhausted
      ? 100
      : clampPercent((intro.bits / diskCost) * 100)
  const diskRedeemTierName = getDiskRedeemTierName(state, diskSize)
  const capacityUpgradeAvailable = isMemoryCapacityUpgradeAvailable(state)
  const capacityUpgradeCost = intro.capacity

  // tier01's (Kilobytes') own live purchase-block progress — advances identically whether units come
  // from the main game's Buy button/autobuyer, redeemDisk (once tier01 is at one of its own fixed
  // disk sizes' required level), or convertIntroBitsToKilobytes/
  // tickIntroAutoInvest here, since every path updates purchaseLevelProgress via the same bookkeeping
  // (see grantTierUnits/buyTier). Conversion itself is unlimited — no per-cycle cap — so this row is
  // just a continuous mirror of that progress, rolling over to a fresh row the instant a level
  // completes rather than ever running dry.
  const purchaseBlockSize = getPurchaseBlockSize(state)
  const tier01PurchaseProgress = state.purchaseLevelProgress?.[TIER_DEFINITIONS[0].id] ?? 0
  const blocksTransferred = tier01PurchaseProgress
  const blocksRemaining = purchaseBlockSize - tier01PurchaseProgress
  // tier01's own CURRENT per-unit cost — what one transfer block actually costs right now, not a
  // fixed rate (see getIntroKilobyteConversionCost in engine.js).
  const transferBlockCost = getIntroKilobyteConversionCost(state)
  const canTransferBlock = intro.bits >= transferBlockCost

  // Once Storage unlocks, Disk redemption offers an alternative path to tier units, making this
  // block-row redundant for a player who's already past the mandatory gate — hidden from then on.
  // The `|| !intro.mainGameUnlocked` fallback exists only for a narrow edge case: Storage's own
  // reveal threshold (Buffer / pool Memory Capacity) is independent of ever having transferred at
  // all, so a player could in principle reach it without ever unlocking the main game —
  // redeemDisk never flips mainGameUnlocked, only this section's own convert action does
  // (see convertIntroBitsToKilobytes/tickIntroAutoInvest in engine.js), so this stays visible
  // through the mandatory gate regardless of Storage's own reveal state.
  const showTransferSection = revealed && (!storageRevealed || !intro.mainGameUnlocked)

  const combineProgress = clampPercent((intro.bits / INTRO_BYTE_COMBINE_COST) * 100)
  const fullProgress = clampPercent((intro.bits / intro.capacity) * 100)
  const computeBandwidthField = getComputeBandwidthSacrificeField(state)
  const investProgress = computeFundedInvest && computeBandwidthField
    ? clampPercent(((intro[computeBandwidthField] ?? 0) / COMPUTE_ENTITY_CAP) * 100)
    : clampPercent((intro.bits / investCost) * 100)
  const activeBlockProgress = clampPercent((intro.bits / transferBlockCost) * 100)



  return (
    <RootDiv>
      <OfflineProgressNotice offlineProgress={offlineProgress} dismissOfflineProgress={dismissOfflineProgress} />
      <Header>
        <Title>🔥 Byte Foundry</Title>
      </Header>

      <DataStreamCard aria-label="Data Stream">
        <FillableStatCard
          as={intro.mainGameUnlocked ? 'button' : 'section'}
          type={intro.mainGameUnlocked ? 'button' : undefined}
          onClick={intro.mainGameUnlocked ? actions.tapIntroBit : undefined}
          disabled={intro.mainGameUnlocked ? isFull : undefined}
          aria-label={intro.mainGameUnlocked ? 'tap to generate a bit' : 'data stream balance'}
          $progress={fullProgress}
          $tappable={intro.mainGameUnlocked}
        >
          <SectionLabel>Data Stream</SectionLabel>
          <BalanceText>{formatMemoryBalance(intro.bits, intro.capacity, intro.byteCreated)}</BalanceText>
          <StatusText>Buffer {formatBitsInNearestUnit(intro.capacity)}</StatusText>
          <VisuallyHidden
            role="progressbar"
            aria-label="data stream bit balance"
            aria-valuenow={intro.bits}
            aria-valuemin={0}
            aria-valuemax={intro.capacity}
          />
          {intro.byteCreated && (
            productionRate < BITS_PER_BYTE ? (
              <>
                <StatusText>+{formatAmount(productionRate)} bit{productionRate === 1 ? '' : 's'}/sec</StatusText>
                <RateBlocksRow role="progressbar" aria-label="data stream production rate" aria-valuenow={productionRate} aria-valuemin={0} aria-valuemax={BITS_PER_BYTE}>
                  {Array.from({ length: BITS_PER_BYTE }, (_, index) => (
                    <RateBlock key={index} $filled={index < productionRate} />
                  ))}
                </RateBlocksRow>
              </>
            ) : (
              <StatusText>
                +{formatAmount(productionRate / BITS_PER_BYTE)} Byte{productionRate / BITS_PER_BYTE === 1 ? '' : 's'}/sec
              </StatusText>
            )
          )}
        </FillableStatCard>

        <ActionsRow>
          {canCombine && (
            <Button
              aria-label="combine 8 bits into a Byte"
              onClick={actions.combineIntroByte}
              type="button"
              variant="primary"
              $progress={combineProgress}
            >
              <ButtonContent>🔗 Combine into a Byte</ButtonContent>
              <VisuallyHidden
                role="progressbar"
                aria-label="byte foundry combine progress"
                aria-valuenow={intro.bits}
                aria-valuemin={0}
                aria-valuemax={INTRO_BYTE_COMBINE_COST}
              />
            </Button>
          )}

          {intro.byteCreated && (
            <MilestonesRow>
              <Button
                aria-label={
                  computeFundedInvest
                    ? `sacrifice ${COMPUTE_ENTITY_CAP} ${computeBandwidthLabel} for double production`
                    : 'invest bits for double production'
                }
                disabled={!canInvest}
                onClick={actions.pickIntroProductionMilestone}
                title={
                  investClaimsUsedUp
                    ? 'Already claimed at this tier'
                    : investBlockedByPriority
                      ? 'Redeem a full Disk first'
                      : computeFundedInvest
                        ? `Bit cost exceeds Buffer — sacrifice ${COMPUTE_ENTITY_CAP} ${computeBandwidthLabel} for ×2 Speed`
                        : 'Doubles pool Memory Speed'
                }
                type="button"
                variant={canInvest ? 'info' : 'neutral'}
                $progress={investProgress}
              >
                <MilestoneButtonContent>
                  <span>⚡ Speed ×2</span>
                  <MilestoneCostLine>{investCostDisplay}</MilestoneCostLine>
                </MilestoneButtonContent>
                <VisuallyHidden
                  role="progressbar"
                  aria-label="byte foundry speed progress"
                  aria-valuenow={
                    computeFundedInvest && computeBandwidthField
                      ? (intro[computeBandwidthField] ?? 0)
                      : intro.bits
                  }
                  aria-valuemin={0}
                  aria-valuemax={computeFundedInvest ? COMPUTE_ENTITY_CAP : investCost}
                />
              </Button>
              <Button
                aria-label="double Memory Capacity"
                disabled={!capacityUpgradeAvailable}
                onClick={actions.pickIntroCapacityMilestone}
                title={
                  capacityUpgradeAvailable
                    ? 'The Data Stream Buffer is full; drain it to double Capacity'
                    : intro.bits < intro.capacity
                      ? 'Fill the Data Stream Buffer completely before doubling Capacity'
                      : 'Resolve higher-priority actions before doubling Capacity'
                }
                type="button"
                variant={capacityUpgradeAvailable ? 'prestige' : 'neutral'}
              >
                <MilestoneButtonContent>
                  <span>🧠 Capacity ×2</span>
                  <MilestoneCostLine>{formatBitsInNearestUnit(capacityUpgradeCost)}</MilestoneCostLine>
                </MilestoneButtonContent>
              </Button>
            </MilestonesRow>
          )}

        </ActionsRow>

        {storageRevealed && (
          <>
            <Divider />
            <Button
              aria-label={diskBuildInProgress ? 'disk array rebuilding' : diskLadderExhausted ? 'disk ladder complete' : 'provision disk'}
              disabled={!canStartDiskBuild || !!diskBuildInProgress}
              onClick={actions.provisionDisk}
              title={
                diskBuildInProgress
                  ? `Provisioning ${formatDiskSize(diskBuildInProgress.size)} — ${Math.ceil(diskBuildInProgress.remainingSeconds)}s (array offline)`
                  : diskLadderExhausted
                    ? `All ${getStoragePoolCount()} storage pools are complete through ${formatDiskSize(diskSize)}`
                    : diskBuildBlockedByPriority
                      ? 'Take Speed (or redeem a full Disk) first'
                      : diskRedeemTierName
                        ? `Costs ${formatDiskSize(diskCost)} and takes time to provision — creates an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, redeemable right away for a free ${diskRedeemTierName} once full`
                        : `Costs ${formatDiskSize(diskCost)} and takes time to provision — creates an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, but it won't be redeemable until its own fixed corresponding tier reaches its matching level`
              }
              type="button"
              variant={canStartDiskBuild ? 'info' : 'neutral'}
              $progress={diskBuildProgress}
            >
              <ButtonContent>
                {diskBuildInProgress
                  ? `🏦 Provisioning ${formatDiskSize(diskBuildInProgress.size)} Disk — ${Math.ceil(diskBuildInProgress.remainingSeconds)}s`
                  : diskLadderExhausted
                    ? `🏦 All Pools Complete (${formatDiskSize(diskSize)})`
                    : `🏦 Provision ${formatDiskSize(diskSize)} Disk (${formatDiskSize(diskCost)})`}
              </ButtonContent>
              <VisuallyHidden
                role="progressbar"
                aria-label="byte foundry disk build progress"
                aria-valuenow={Math.round(diskBuildProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </Button>

          </>
        )}
      </DataStreamCard>

      {storageRevealed && Array.from({ length: unlockedPoolCount }, (_, offset) => {
        const poolIndex = offset + 1
        const poolBandwidth = getStoragePoolBandwidth(state, poolIndex)
        const poolCapacity = getStoragePoolCapacity(state, poolIndex)
        const poolSizes = diskSizesToShow.filter(size => getPoolIndexForDiskSize(size) === poolIndex)
        const isExpanded = visibleExpandedPool === poolIndex
        const arraysComplete = poolSizes.length > 0 && poolSizes.every(size =>
          (intro.disksBuiltTotal?.[size] ?? 0) >= DISK_ARRAY_LADDER_CAP
        )
        return (
          <PoolCard key={poolIndex} aria-label={`pool ${poolIndex}`}>
            <PoolSummaryButton
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'collapse' : 'expand'} pool ${poolIndex}`}
              onClick={() => setExpandedPoolIndex(isExpanded ? 0 : poolIndex)}
              type="button"
            >
              Pool {poolIndex} · {TIER_DEFINITIONS[poolIndex - 1]?.name ?? `Tier ${poolIndex}`} ·{' '}
              {arraysComplete ? 'Arrays complete' : 'Arrays in progress'} ·{' '}
              Bandwidth {formatBitsInNearestUnit(poolBandwidth)}/sec · Capacity {formatBitsInNearestUnit(poolCapacity)}
            </PoolSummaryButton>
            {isExpanded && (
              <>
                {poolSizes.map(size => (
                  <DiskArrayRow key={size} actions={actions} size={size} state={state} />
                ))}
              </>
            )}
          </PoolCard>
        )
      })}

      {storageRevealed && <DataLakePanel actions={actions} state={state} />}

      {showTransferSection && (<>
        <SectionLabel>Transfer to Main Game ({blocksRemaining} left)</SectionLabel>
        <TransferBlocksRow role="group" aria-label="byte foundry kilobyte transfer blocks">
          {Array.from({ length: purchaseBlockSize }, (_, index) => {
            const isConsumed = index < blocksTransferred
            const isActive = index === blocksTransferred
            return (
              <TransferBlock
                key={index}
                aria-label={
                  isConsumed
                    ? `transferred block ${index + 1}`
                    : isActive
                      ? `convert ${formatBitsInNearestUnit(transferBlockCost)} into 1 Kilobyte`
                      : `locked transfer block ${index + 1}`
                }
                disabled={isConsumed || !isActive || !canTransferBlock}
                onClick={isActive ? actions.convertIntroBitsToKilobytes : undefined}
                title={
                  isConsumed
                    ? 'Already transferred'
                    : isActive
                      ? (canTransferBlock ? `${formatBitsInNearestUnit(transferBlockCost)} → 1 Kilobyte` : `Fill Data Stream to ${formatBitsInNearestUnit(transferBlockCost)} first`)
                      : 'Transfer the block to your left first'
                }
                type="button"
                $active={isActive}
                $consumed={isConsumed}
                $progress={isActive ? activeBlockProgress : undefined}
              >
                {isActive && (
                  <VisuallyHidden
                    role="progressbar"
                    aria-label="byte foundry convert progress"
                    aria-valuenow={intro.bits}
                    aria-valuemin={0}
                    aria-valuemax={transferBlockCost}
                  />
                )}
              </TransferBlock>
            )
          })}
        </TransferBlocksRow>
      </>)}

      {!intro.mainGameUnlocked && (
        <TapArea
          aria-label="tap to generate a bit"
          disabled={isFull}
          onClick={actions.tapIntroBit}
          type="button"
        >
          👆 Tap
        </TapArea>
      )}
    </RootDiv>
  )
}

export default ByteFoundryPage
