import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, formatBitsInNearestUnit, formatMemoryAmount, formatStorageSize, getIntroKilobyteConversionCost, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getMemoryUnit, getPurchaseBlockSize, getStorageBankCost, getStorageBankSize, getStorageSizesToShow, isBandwidthAvailable, isBandwidthTurnAvailable, isComputeCoreClaimAvailable, isComputeCoreConversionUnlocked, isIntroConversionUnlocked, isMemoryCapacityUpgradeAvailable, isStorageBankBuildTurnAvailable, isStorageBankRedeemable, isStorageUnlocked } from 'game/engine'
import { BITS_PER_BYTE, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_MULTIPLIER, TIER_DEFINITIONS } from 'game/layers'
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

// Title plus the "← Back to game" exit (when present) share one row, the same title/nav-link
// placement convention MainPage's own <Header> and InfoPage's <Header> already use — rather than
// the exit sitting alone at the bottom of the page, disconnected from the rest of the page's own
// navigation.
const Header = styled.header`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.space.sm};
  justify-content: space-between;
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

// A brief, at-a-glance per-size Storage status readout — one small chip per size ever reached,
// reading "<size> <full>/<built>" (e.g. "10 KB 3/8" — 8 blocks of 10 KB ever built, 3 currently
// full). Deliberately not the fuller square-by-square grid StoragePage itself renders — this is
// just enough context to see holdings at a glance without leaving the Byte Foundry; visiting
// StoragePage (via the nav button below) is still how a full bank actually gets redeemed.
const StorageSummaryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

const StorageSummaryChip = styled.span`
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
  background: ${props => props.theme.color.surfaceSunken};
  border-radius: ${props => props.theme.radius.sm};
  padding: 2px 8px;
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

// `onBack` is only passed once intro.mainGameUnlocked is true (see App.jsx) — before that, this
// page is a mandatory gate with no way out. Once set, the player got here voluntarily (via
// MainPage's "⚙️ Byte Foundry" link) to check on this cycle's progress — but nothing here is
// read-only: Tap/Combine/Sacrifice/Invest and further block transfers (uncapped — see
// tickIntroAutoInvest in engine.js) all stay fully live whether reached via the mandatory gate
// or this voluntary link. The Byte generator itself (capacity/byteCreated/tickSpeedSeconds/
// productionMultiplier/productionMilestoneTier/productionMilestoneTierClaims) is PERMANENT — see
// prestigeGame in engine.js — so it carries over exactly as left, cycle to cycle, until the next
// Prestige resets Memory fresh.
//
// Compute moved entirely to its own dedicated screen (ComputePage) once revealed — this page only
// shows a nav button to reach it. Storage split differently: Building the next bank (its own core
// loop action, same as Sacrifice/Invest) and a brief per-size summary chip row both stay here, on
// this page — only the fuller square-by-square detail and redeeming (Storage Bank Fill) live on
// the dedicated StoragePage, reached via its own nav button below. Both nav buttons are always
// enabled once revealed (same "permanent, voluntarily-revisitable screen" posture as MainPage's
// own "⚙️ Byte Foundry" link) so the player can check on built-but-not-yet-affordable progress (a
// held bank, banked Cores) even when nothing there is currently actionable. Every action
// itself — here or on either dedicated screen — stays gated by the Byte Foundry's forced priority
// order (see "Byte Foundry" in CLAUDE.md): Storage Bank Fill > Bandwidth > Storage Bank Build >
// Compute > Memory.
const ByteFoundryPage = ({ game, onBack, onOpenCompute, onOpenStorage }) => {
  const { actions, dismissOfflineProgress, offlineProgress, state } = game
  const { intro } = state

  const isFull = intro.bits >= intro.capacity
  const canCombine = !intro.byteCreated && intro.bits >= INTRO_BYTE_COMBINE_COST
  // Sacrifice is offered only once Memory is full AND no other currently-possible action ranked
  // above it in the forced priority order (Storage Bank Fill, Bandwidth, Storage Bank Build,
  // Compute) is left to take first — see isMemoryCapacityUpgradeAvailable in engine.js.
  const canSacrifice = isMemoryCapacityUpgradeAvailable(state)
  const revealed = isIntroConversionUnlocked(state)
  const storageRevealed = isStorageUnlocked(state)
  const computeCoreRevealed = isComputeCoreConversionUnlocked(state)
  // Once autoClaimCoreEnabled (see engine.js's enableAutoClaimCore, unlockable on ComputePage by
  // sacrificing 10 Nodes), Memory → Core conversion resumes automatically and this manual button
  // is removed entirely, not merely disabled — see "Byte Foundry" in CLAUDE.md.
  const canClaimComputeCore = isComputeCoreClaimAvailable(state)
  const productionRate = getIntroProductionRate(intro)

  // Sacrifice is permanent and irreversible (drains Memory to 0, and every future Core conversion
  // costs more once capacity is higher) — same "no modal component to reuse, use window.confirm"
  // rationale MainPage's own Reset button confirm already documents.
  const handleSacrificeClick = () => {
    const nextCapacity = intro.capacity * INTRO_CAPACITY_MULTIPLIER
    if (window.confirm(
      `Sacrifice all of Memory to multiply capacity ×10, from ${formatBitsInNearestUnit(intro.capacity)} to ${formatBitsInNearestUnit(nextCapacity)}? ` +
      'This is permanent and makes every future Core cost more.'
    )) {
      actions.pickIntroCapacityMilestone()
    }
  }

  const investCost = getIntroProductionMilestoneCost(intro.productionMilestoneTier)
  const investCostDisplay = formatBitsInNearestUnit(investCost)
  const investMaxClaims = getIntroProductionMilestoneMaxClaims(intro.productionMilestoneTier)
  const investClaimsUsedUp = intro.productionMilestoneTierClaims >= investMaxClaims
  // Ranked below Storage Bank Fill in the forced priority order — see isBandwidthTurnAvailable.
  const canInvest = isBandwidthTurnAvailable(state)
  const investBlockedByPriority = isBandwidthAvailable(state) && !canInvest

  // Building the next Storage bank stays on this page (the Byte Foundry's own core loop) even
  // though redeeming lives on the dedicated StoragePage — see "Byte Foundry" in CLAUDE.md. Ranked
  // third in the forced priority order — see isStorageBankBuildTurnAvailable.
  const storageBankSize = getStorageBankSize(state)
  const storageBankCost = getStorageBankCost(storageBankSize)
  const canBuildStorageBank = isStorageBankBuildTurnAvailable(state)
  const storageBuildBlockedByPriority = intro.bits >= storageBankCost && !canBuildStorageBank
  const storageBuildProgress = clampPercent((intro.bits / storageBankCost) * 100)
  const storageBankRedeemableNow = isStorageBankRedeemable(state, storageBankSize)
  const storageBanksBuiltTotal = intro.storageBanksBuiltTotal ?? {}
  // getStorageSizesToShow always includes the currently-offered size even at 0 built (so
  // StoragePage's own fuller detail can preview the goal before the first one is banked) — this
  // brief summary is different: it should only ever report actual history, so a size with nothing
  // built and nothing held is filtered back out here rather than showing a confusing "1 KB 0/0"
  // chip before the player has ever built anything.
  const storageSizesWithHistory = getStorageSizesToShow(state)
    .filter(size => (storageBanksBuiltTotal[size] ?? 0) > 0 || (intro.storageBanks?.[size] ?? 0) > 0)

  // tier01's (Kilobytes') own live purchase-block progress — advances identically whether units come
  // from the main game's Buy button/autobuyer, redeemStorageBank, or convertIntroBitsToKilobytes/
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

  const combineProgress = clampPercent((intro.bits / INTRO_BYTE_COMBINE_COST) * 100)
  const fullProgress = clampPercent((intro.bits / intro.capacity) * 100)
  const investProgress = clampPercent((intro.bits / investCost) * 100)
  const activeBlockProgress = clampPercent((intro.bits / transferBlockCost) * 100)

  return (
    <RootDiv>
      <OfflineProgressNotice offlineProgress={offlineProgress} dismissOfflineProgress={dismissOfflineProgress} />
      <Header>
        <Title>⚙️ Byte Foundry</Title>
        {onBack && (
          <Button aria-label="Back to game" onClick={onBack} title="Back to game" type="button" variant="neutral">
            <ButtonContent>← Back to game</ButtonContent>
          </Button>
        )}
      </Header>
      <StatusText>
        {!intro.mainGameUnlocked
          ? 'Tap to fill Memory. Combine 8 bits into a Byte to auto-produce.'
          : 'Main game unlocked — keep transferring Memory into Kilobytes any time.'}
      </StatusText>

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
            <Button
              aria-label="sacrifice all bits for 10x capacity"
              disabled={!canSacrifice}
              onClick={handleSacrificeClick}
              title={
                isFull && !canSacrifice
                  ? 'Take every higher-priority upgrade first (Storage Bank Fill, Bandwidth, Storage Bank Build, or Compute)'
                  : 'Empty Memory for 10x capacity'
              }
              type="button"
              variant={canSacrifice ? 'prestige' : 'neutral'}
              $progress={fullProgress}
            >
              <MilestoneButtonContent>
                <span>💥 Memory ×10</span>
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

            <Button
              aria-label="invest bits for double production"
              disabled={!canInvest}
              onClick={actions.pickIntroProductionMilestone}
              title={
                investClaimsUsedUp
                  ? 'Already claimed at this tier'
                  : investBlockedByPriority
                    ? 'Redeem a full Storage Bank first'
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
                aria-valuenow={intro.bits}
                aria-valuemin={0}
                aria-valuemax={investCost}
              />
            </Button>
          </MilestonesRow>
        )}

      </ActionsRow>

      {storageRevealed && (
        <>
          <Button
            aria-label="build storage bank"
            disabled={!canBuildStorageBank}
            onClick={actions.buildStorageBank}
            title={
              storageBuildBlockedByPriority
                ? 'Take Bandwidth (or redeem a full Storage Bank) first'
                : storageBankRedeemableNow
                  ? `Costs ${formatBitsInNearestUnit(storageBankCost)} (10x the block's own size, in bytes) — builds an empty ${formatStorageSize(storageBankSize)} container; Memory auto-fills it, redeemable right away once full`
                  : `Costs ${formatBitsInNearestUnit(storageBankCost)} (10x the block's own size, in bytes) — builds an empty ${formatStorageSize(storageBankSize)} container; Memory auto-fills it, but it won't be redeemable until Kilobytes' level cost matches it`
            }
            type="button"
            variant={canBuildStorageBank ? 'info' : 'neutral'}
            $progress={storageBuildProgress}
          >
            <ButtonContent>{`🏦 Build ${formatStorageSize(storageBankSize)} Bank (${formatBitsInNearestUnit(storageBankCost)})`}</ButtonContent>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry storage build progress"
              aria-valuenow={intro.bits}
              aria-valuemin={0}
              aria-valuemax={storageBankCost}
            />
          </Button>

          {storageSizesWithHistory.length > 0 && (
            <StorageSummaryRow role="group" aria-label="storage summary">
              {storageSizesWithHistory.map(size => {
                const full = intro.storageBanks?.[size] ?? 0
                const builtTotal = Math.max(storageBanksBuiltTotal[size] ?? 0, full)
                return (
                  <StorageSummaryChip key={size}>
                    {`${formatStorageSize(size)} ${full}/${builtTotal}`}
                  </StorageSummaryChip>
                )
              })}
            </StorageSummaryRow>
          )}

          <Button
            aria-label="open storage"
            onClick={onOpenStorage}
            title="Review Storage in detail, and redeem full banks (still gated by the forced priority order)"
            type="button"
            variant="info"
          >
            <ButtonContent>🏦 Storage</ButtonContent>
          </Button>
        </>
      )}

      {computeCoreRevealed && (
        <>
          {!intro.autoClaimCoreEnabled && (
            <Button
              aria-label="claim a compute core"
              disabled={!canClaimComputeCore}
              onClick={actions.claimComputeCore}
              title={
                canClaimComputeCore
                  ? `Claim 1 Core, flushing your current capacity (${formatBitsInNearestUnit(intro.capacity)})`
                  : 'Fill Memory to claim a Core — or sacrifice 10 Nodes on the Compute screen to automate this'
              }
              type="button"
              variant={canClaimComputeCore ? 'prestige' : 'neutral'}
              $progress={fullProgress}
            >
              <ButtonContent>🧮 Claim Core</ButtonContent>
            </Button>
          )}
          <Button
            aria-label="open compute"
            onClick={onOpenCompute}
            title="Review Compute — Cores, Nodes, merging, auto-merge, and Boost activation (still gated by the forced priority order)"
            type="button"
            variant="info"
          >
            <ButtonContent>⚡ Compute</ButtonContent>
          </Button>
        </>
      )}

      {revealed && (<>
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
    </RootDiv>
  )
}

export default ByteFoundryPage
