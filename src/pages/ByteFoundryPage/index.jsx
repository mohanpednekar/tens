import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import ConfirmDialog from 'components/ConfirmDialog'
import DiskArrayRow from 'components/DiskArrayRow'
import DataLakePanel from 'components/DataLakePanel'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, formatBitsInNearestUnit, formatDiskSize, formatMemoryAmount, getComputeBandwidthSacrificeField, getComputeBandwidthSacrificeLabel, getDiskCost, getDiskRedeemTierName, getDiskSize, getDiskSizesToShow, getIntroKilobyteConversionCost, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getMemoryUnit, getPurchaseBlockSize, isBandwidthAvailable, isBandwidthTurnAvailable, isComputeCoreConversionUnlocked, isComputeFundedBandwidthAvailable, isDiskBuildTurnAvailable, isDiskLadderExhaustedForActivePools, isIntroConversionUnlocked, isMemoryCapacityAtCap, isMemoryCapacityUpgradeAvailable, isStorageUnlocked } from 'game/engine'
import { BITS_PER_BYTE, COMPUTE_ENTITY_CAP, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_DOUBLING_STEP, TIER_DEFINITIONS } from 'game/layers'
import { useState } from 'react'
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

// Sacrifice and Invest are two independent, frequently-compared milestone actions — placing them
// side by side (each taking an equal share via `flex: 1`) reads as one paired choice rather than a
// stacked list, unlike Combine above (a one-time, mutually-exclusive action with nothing to pair
// against). `min-width: 0` lets each button's own label ellipsis-truncate (see ButtonLabel in
// components/Button) instead of forcing the row wider than its container at narrow viewports.
const MilestonesRow = styled.div`
  display: flex;
  gap: ${props => props.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`

// Sacrifice/Invest's own two-line content: the symbol/label/multiplier on top, its cost — what
// each one actually spends — on its own line below, in smaller/muted text, rather than crammed
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

// A row wrapper for the Memory tile — kept as a row container (rather than flattening Memory
// straight into RootDiv's own column flex) so FillableStatCard's `flex: 1 1 160px` still behaves
// as a row item (grow to fill available width) instead of a column item (which would instead try
// to grow the tile's height).
const TilesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

// Reuses Button's own progressFill gradient (see components/Button) so Memory's tile fills toward
// its capacity the same visual way every actionable control on this page already does, rather
// than introducing a second, differently-styled meter convention. `align-items: center` (StatCard's
// own default is `stretch`) centers RateBlocksRow horizontally — its own `max-width` keeps it
// narrower than the tile, so without this it would sit flush against the left edge instead of
// centered under the balance text above it.
// Once intro.mainGameUnlocked, this renders as a real <button> (via the `as` prop below) instead
// of a plain <section> — Memory itself becomes the tap target, replacing the standalone TapArea
// button below (which only renders pre-unlock). `$tappable` adds the same hover/active/disabled
// affordance TapArea itself already has, scoped to this prop so the pre-unlock (non-interactive)
// rendering keeps its plain, unclickable look.
const FillableStatCard = styled(StatCard)`
  flex: 1 1 160px;
  align-items: center;
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
// here is read-only. Memory and Storage are continuous sections on this one screen (no
// second-level tabs). Forced priority: Disk Fill > Bandwidth > Disk Build > Compute > Memory.
// focusNonce is accepted for App.jsx parity with MainPage; Foundry no longer has a tab to reset.
const ByteFoundryPage = ({ game, focusNonce: _focusNonce = 0 }) => {
  const { actions, dismissOfflineProgress, offlineProgress, state } = game
  const { intro } = state
  const [sacrificeConfirmOpen, setSacrificeConfirmOpen] = useState(false)

  const isFull = intro.bits >= intro.capacity
  const canCombine = !intro.byteCreated && intro.bits >= INTRO_BYTE_COMBINE_COST
  // Sacrifice is offered only once Memory is full AND no other currently-possible action ranked
  // above it in the forced priority order (Disk Fill, Bandwidth, Disk Build,
  // Compute) is left to take first — see isMemoryCapacityUpgradeAvailable in engine.js.
  const canSacrifice = isMemoryCapacityUpgradeAvailable(state)
  const revealed = isIntroConversionUnlocked(state)
  const storageRevealed = isStorageUnlocked(state)
  const computeCoreRevealed = isComputeCoreConversionUnlocked(state)
  const productionRate = getIntroProductionRate(intro)
  // Every size ever reached (plus the ladder's current offer) — continuous Storage section on
  // this same screen, ascending via getDiskSizesToShow.
  const diskSizesToShow = storageRevealed ? getDiskSizesToShow(state) : []

  // Sacrifice is permanent and irreversible (drains Memory to 0). Once Compute is unlocked, it also
  // wipes all held Compute tokens and rolls back Compute-funded Bandwidth progress — that warning
  // only belongs in the confirm once Compute actually exists. Uses the in-game ConfirmDialog, not
  // window.confirm, so the prompt matches the rest of the UI.
  const nextSacrificeCapacity = intro.capacity * INTRO_CAPACITY_DOUBLING_STEP
  const atCapacityCap = isMemoryCapacityAtCap(state)
  const handleSacrificeClick = () => {
    if (!canSacrifice) return
    setSacrificeConfirmOpen(true)
  }
  const confirmSacrifice = () => {
    setSacrificeConfirmOpen(false)
    actions.pickIntroCapacityMilestone()
  }
  const cancelSacrifice = () => setSacrificeConfirmOpen(false)
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
  // third in the forced priority order — see isDiskBuildTurnAvailable. Every shown size's
  // DiskArrayRow (Cache then Disks per size, ascending) renders below as continuous sections.
  const diskSize = getDiskSize(state)
  const diskCost = getDiskCost(diskSize)
  const diskLadderExhausted = isDiskLadderExhaustedForActivePools(state)
  const canStartDiskBuild = isDiskBuildTurnAvailable(state)
  const diskBuildInProgress = intro.diskBuild
  const diskBuildBlockedByPriority = !diskLadderExhausted && intro.bits >= diskCost && !canStartDiskBuild && !diskBuildInProgress
  const diskBuildProgress = diskBuildInProgress
    ? clampPercent(100 - (diskBuildInProgress.remainingSeconds / diskBuildInProgress.totalSeconds) * 100)
    : diskLadderExhausted
      ? 100
      : clampPercent((intro.bits / diskCost) * 100)
  const diskRedeemTierName = getDiskRedeemTierName(state, diskSize)

  // tier01's (Kilobytes') own live purchase-block progress — advances identically whether units come
  // from the main game's Buy button/autobuyer, redeemDisk (once a disk currently matches tier01's
  // size), or convertIntroBitsToKilobytes/
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
  // reveal threshold (capacity, grown via repeated Sacrifice) is independent of ever having
  // transferred at all, so a player could in principle reach it without ever unlocking the main
  // game — redeemDisk never flips mainGameUnlocked, only this section's own convert action does
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

  const sacrificeButton = (
    <Button
      aria-label="sacrifice all bits for 2x capacity"
      disabled={!canSacrifice}
      onClick={handleSacrificeClick}
      title={
        atCapacityCap
          ? 'This pool’s Memory Capacity is already at its cap'
          : isFull && !canSacrifice
            ? 'Take every higher-priority upgrade first (Disk Fill, Bandwidth, Disk Build, or Compute)'
            : 'Empty Memory for 2x capacity'
      }
      type="button"
      variant={canSacrifice ? 'prestige' : 'neutral'}
      $progress={fullProgress}
    >
      <MilestoneButtonContent>
        <span>💥 Memory ×2</span>
        <MilestoneCostLine>{formatBitsInNearestUnit(intro.capacity)}</MilestoneCostLine>
      </MilestoneButtonContent>
      <VisuallyHidden
        role="progressbar"
        aria-label="byte foundry sacrifice progress"
        aria-valuenow={intro.bits}
        aria-valuemin={0}
        aria-valuemax={intro.capacity}
      />
    </Button>
  )

  return (
    <RootDiv>
      <OfflineProgressNotice offlineProgress={offlineProgress} dismissOfflineProgress={dismissOfflineProgress} />
      <Header>
        <Title>🔥 Byte Foundry</Title>
      </Header>

      <TilesRow>
        <FillableStatCard
          as={intro.mainGameUnlocked ? 'button' : 'section'}
          type={intro.mainGameUnlocked ? 'button' : undefined}
          onClick={intro.mainGameUnlocked ? actions.tapIntroBit : undefined}
          disabled={intro.mainGameUnlocked ? isFull : undefined}
          aria-label={intro.mainGameUnlocked ? 'tap to generate a bit' : 'byte foundry balance'}
          $progress={fullProgress}
          $tappable={intro.mainGameUnlocked}
        >
          <SectionLabel>Memory</SectionLabel>
          <BalanceText>{formatMemoryBalance(intro.bits, intro.capacity, intro.byteCreated)}</BalanceText>
          <VisuallyHidden
            role="progressbar"
            aria-label="byte foundry bit balance"
            aria-valuenow={intro.bits}
            aria-valuemin={0}
            aria-valuemax={intro.capacity}
          />
          {intro.byteCreated && (
            productionRate < BITS_PER_BYTE ? (
              <>
                <StatusText>+{formatAmount(productionRate)} bit{productionRate === 1 ? '' : 's'}/sec</StatusText>
                <RateBlocksRow role="progressbar" aria-label="byte foundry production rate" aria-valuenow={productionRate} aria-valuemin={0} aria-valuemax={BITS_PER_BYTE}>
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
      </TilesRow>

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
            {sacrificeButton}

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
                      ? `Bit cost exceeds Memory — sacrifice ${COMPUTE_ENTITY_CAP} ${computeBandwidthLabel} for ×2 production`
                      : 'Doubles production rate'
              }
              type="button"
              variant={canInvest ? 'info' : 'neutral'}
              $progress={investProgress}
            >
              <MilestoneButtonContent>
                <span>⚡ Bandwidth ×2</span>
                <MilestoneCostLine>{investCostDisplay}</MilestoneCostLine>
              </MilestoneButtonContent>
              <VisuallyHidden
                role="progressbar"
                aria-label="byte foundry invest progress"
                aria-valuenow={
                  computeFundedInvest && computeBandwidthField
                    ? (intro[computeBandwidthField] ?? 0)
                    : intro.bits
                }
                aria-valuemin={0}
                aria-valuemax={computeFundedInvest ? COMPUTE_ENTITY_CAP : investCost}
              />
            </Button>
          </MilestonesRow>
        )}

      </ActionsRow>

      {storageRevealed && (
        <>
          <Button
            aria-label={diskBuildInProgress ? 'disk array rebuilding' : diskLadderExhausted ? 'disk ladder complete for this pool' : 'build disk'}
            disabled={!canStartDiskBuild || !!diskBuildInProgress}
            onClick={actions.startDiskBuild}
            title={
              diskBuildInProgress
                ? `Rebuilding ${formatDiskSize(diskBuildInProgress.size)} — ${Math.ceil(diskBuildInProgress.remainingSeconds)}s (array offline)`
                : diskLadderExhausted
                  ? `Every Disk size this pool can fund (up to ${formatDiskSize(diskSize)}) is fully built — more storage pools are coming in a future update`
                  : diskBuildBlockedByPriority
                    ? 'Take Bandwidth (or redeem a full Disk) first'
                    : diskRedeemTierName
                      ? `Costs ${formatDiskSize(diskCost)} and takes time to build — builds an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, redeemable right away for a free ${diskRedeemTierName} once full`
                      : `Costs ${formatDiskSize(diskCost)} and takes time to build — builds an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, but it won't be redeemable until some tier's level cost matches it`
            }
            type="button"
            variant={canStartDiskBuild ? 'info' : 'neutral'}
            $progress={diskBuildProgress}
          >
            <ButtonContent>
              {diskBuildInProgress
                ? `🏦 Building ${formatDiskSize(diskBuildInProgress.size)} Disk — ${Math.ceil(diskBuildInProgress.remainingSeconds)}s`
                : diskLadderExhausted
                  ? `🏦 Pool complete (${formatDiskSize(diskSize)})`
                  : `🏦 Build ${formatDiskSize(diskSize)} Disk (${formatDiskSize(diskCost)})`}
            </ButtonContent>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry disk build progress"
              aria-valuenow={Math.round(diskBuildProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Button>

          {diskSizesToShow.map(size => (
            <DiskArrayRow key={size} actions={actions} size={size} state={state} />
          ))}

          <DataLakePanel state={state} />
        </>
      )}

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
                      ? (canTransferBlock ? `${formatBitsInNearestUnit(transferBlockCost)} → 1 Kilobyte` : `Fill Memory to ${formatBitsInNearestUnit(transferBlockCost)} first`)
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

      <ConfirmDialog
        open={sacrificeConfirmOpen}
        title="Sacrifice Memory?"
        confirmLabel="Sacrifice"
        cancelLabel="Cancel"
        confirmVariant="prestige"
        onConfirm={confirmSacrifice}
        onCancel={cancelSacrifice}
      >
        <p>
          Empty Memory to multiply capacity ×2, from{' '}
          {formatBitsInNearestUnit(intro.capacity)} to{' '}
          {formatBitsInNearestUnit(nextSacrificeCapacity)}. This is permanent.
        </p>
        {computeCoreRevealed && (
          <p>
            This also wipes all held Compute tokens and rolls back Bandwidth upgrades bought with
            Compute tokens.
          </p>
        )}
      </ConfirmDialog>
    </RootDiv>
  )
}

export default ByteFoundryPage
