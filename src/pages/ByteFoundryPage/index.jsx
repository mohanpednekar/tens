import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getPurchaseBlockSize, getStorageBankCost, getStorageBankSize, isIntroConversionUnlocked, isStorageBankRedeemable } from 'game/engine'
import { BITS_PER_BYTE, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_COMBINE_COST, STORAGE_BANK_LADDER_CAP, TIER_DEFINITIONS } from 'game/layers'
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
  text-align: center;
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

// Once the Byte generator exists, tapping is a secondary/backup action (passive production is the
// primary loop now) — $compact shrinks the button accordingly, while it stays just as clickable
// (same disabled={isFull} gating either way). No progress fill here — Memory's own tile already
// shows the same bits/capacity fill, so a duplicate meter on the tap button itself would be
// redundant.
const TapArea = styled.button`
  position: relative;
  width: ${props => (props.$compact ? '50%' : '100%')};
  aspect-ratio: 5 / 3;
  border: 1.5px solid ${props => props.theme.color.accent};
  border-radius: ${props => props.theme.radius.lg};
  background: ${props => props.theme.color.surfaceSunken};
  color: ${props => (props.disabled ? props.theme.color.disabled : props.theme.color.accent)};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => (props.$compact ? props.theme.type.scale.lg.size : props.theme.type.scale.xl.size)};
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease, width 0.2s ease, font-size 0.2s ease;

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
const FillableStatCard = styled(StatCard)`
  flex: 1 1 160px;
  align-items: center;
  ${progressFill}
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

// Groups the whole Storage mechanic (Build/held banks/auto-redeem) into its own labeled, visually
// contained section instead of interleaving it flat into ActionsRow alongside Sacrifice/Invest —
// as more bank denominations accumulate over a long run, a shared container with a compact chip
// row (below) scales far better than one more full-width button per size.
const StorageSection = styled(StatCard)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  width: 100%;
  align-items: stretch;
`

// One row per bank size ever reached (ascending — smallest first), each a fixed
// STORAGE_BANK_LADDER_CAP-long strip of squares read together as one progress bar: currently FULL
// (leftmost, clickable once redeemable), then built-but-EMPTY — constructed, waiting for Memory to
// auto-fill them (see tickStorageAutoFill) — then not-yet-built placeholders (rightmost). A row
// only appears once its size has ever been built (or is the size currently offered), so rows
// themselves read top-to-bottom smallest-to-largest too.
const StorageSizeRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

const StorageSizeLabel = styled.p`
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
`

const StorageBankSquaresRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3px;
  width: 100%;
  max-width: 260px;
`

// A single discrete, all-or-nothing bank container — never partially filled, matching the
// mechanic itself. $full (currently holding Memory's bits, awaiting redeem — accent border,
// filled green once $redeemable, a duller raised fill otherwise, clickable only when both $full
// and $redeemable) takes priority over $empty (built but not yet auto-filled by Memory — a dim
// muted-bordered fill, distinct from the plain not-yet-built placeholder below it) over the plain
// not-yet-built placeholder (transparent, outline only, disabled).
const StorageBankSquare = styled.button`
  flex: 0 0 auto;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: ${props => props.theme.radius.sm};
  border: 1.5px solid ${props =>
    props.$full ? props.theme.color.accent : props.$empty ? props.theme.color.textMuted : props.theme.color.surfaceSunken};
  background: ${props =>
    props.$full
      ? (props.$redeemable ? props.theme.color.good : props.theme.color.surfaceRaised)
      : props.$empty
        ? props.theme.color.surfaceSunken
        : 'transparent'};
  cursor: ${props => (props.$full && props.$redeemable ? 'pointer' : 'default')};
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.9);
  }

  &:disabled {
    cursor: not-allowed;
  }
`

// Memory's unit ladder: raw bits below 1 Byte, then B/KB/MB/… scaling by 1000 each step — reusing
// TIER_DEFINITIONS' own KB..QB symbols (see layers.js) since Memory is byte-scale themed
// identically to the main game's tiers. Every capacity value in the Sacrifice ladder (8, 80, 800,
// 8000, …) is evenly divisible by BITS_PER_BYTE, so scaling from bits never loses precision at the
// Byte boundary.
const MEMORY_UNIT_SYMBOLS = ['B', ...TIER_DEFINITIONS.map(tier => tier.symbol)]
const MEMORY_UNIT_SCALE = 1000

// The single unit a bits/capacity pair should both render in, sized off `capacityBits` (always the
// larger of the two) so a balance never shows in a coarser unit than its own capacity — e.g. never
// "512 B / 1 KB". `byteCreated` gates whether there's anything to denominate in yet at all: before
// the Byte generator exists, capacity is always exactly INTRO_STARTING_CAPACITY (8 bits = 1 Byte —
// capacity can only grow via Sacrifice, itself only reachable once byteCreated), so a
// capacity-magnitude check alone can never catch this phase (capacity is never below a whole
// Byte). Without this gate, tapping through that very first 0-8 bit range would render as
// fractional Bytes ("0.125 B", "0.25 B", …) — technically a unit, but a less readable one than the
// raw bit count for a range this small; raw bits are the more "appropriate unit" here.
const getMemoryUnit = (capacityBits, byteCreated) => {
  if (!byteCreated) return null // nothing to denominate in yet — render as raw bits
  let divisor = BITS_PER_BYTE
  let unitIndex = 0
  while (capacityBits / divisor >= MEMORY_UNIT_SCALE && unitIndex < MEMORY_UNIT_SYMBOLS.length - 1) {
    divisor *= MEMORY_UNIT_SCALE
    unitIndex += 1
  }
  return { symbol: MEMORY_UNIT_SYMBOLS[unitIndex], divisor }
}

// Floors rather than rounds, same "never overstate" rationale as formatCurrency in engine.js — an
// Intl-rounded 999.9/1000 bits would otherwise read as "1 KB / 1 KB" one tick before it's actually
// full. 3 decimal places matches formatAmount's own default max-fraction-digits, so this only
// changes the rounding direction, not the displayed precision.
const floorToDecimals = (value, decimals) => Math.floor(value * 10 ** decimals) / 10 ** decimals

const formatMemoryAmount = (bits, unit) =>
  unit
    ? `${formatAmount(floorToDecimals(bits / unit.divisor, 3))} ${unit.symbol}`
    : `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`

// Renders "<bits> / <capacity>", both in the same unit (picked off capacity — see getMemoryUnit).
const formatMemoryBalance = (bits, capacityBits, byteCreated) => {
  const unit = getMemoryUnit(capacityBits, byteCreated)
  return `${formatMemoryAmount(bits, unit)} / ${formatMemoryAmount(capacityBits, unit)}`
}

// Storage bank sizes are tier01's own per-unit level costs (see getStorageBankSize in
// engine.js) — a completely separate scale from Memory's Byte-based one above: 1000 bits is
// "1 KB" here, matching INTRO_BITS_PER_KILOBYTE_CONVERSION and the Convert button's own
// "KiloBits" naming (1000 bits, not 1000 Bytes/8000 bits). Reuses TIER_DEFINITIONS' KB..QB
// symbols for the same "byte-scale themed" reason Memory's own ladder does. Every bank size is
// already an exact power of ten by construction (getTierCost), so this always lands on a clean,
// whole-number label.
const STORAGE_UNIT_SYMBOLS = TIER_DEFINITIONS.map(tier => tier.symbol)
const formatStorageSize = bits => {
  if (bits < INTRO_BITS_PER_KILOBYTE_CONVERSION) return `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`
  let value = bits / INTRO_BITS_PER_KILOBYTE_CONVERSION
  let unitIndex = 0
  while (value >= MEMORY_UNIT_SCALE && unitIndex < STORAGE_UNIT_SYMBOLS.length - 1) {
    value /= MEMORY_UNIT_SCALE
    unitIndex += 1
  }
  return `${formatAmount(value)} ${STORAGE_UNIT_SYMBOLS[unitIndex]}`
}

const clampPercent = value => Math.min(100, Math.max(0, value))

// `onBack` is only passed once intro.mainGameUnlocked is true (see App.jsx) — before that, this
// page is a mandatory gate with no way out. Once set, the player got here voluntarily (via
// MainPage's "⚙️ Byte Foundry" link) to check on this cycle's progress — but nothing here is
// read-only: Tap/Combine/Sacrifice/Invest and further block transfers (up to this cycle's shared,
// dynamic transfer budget, see remainingTransferBudget below) all stay fully live whether reached
// via the mandatory gate or this voluntary link. The Byte generator itself (capacity/byteCreated/
// tickSpeedSeconds/productionMultiplier/productionMilestoneTier/productionMilestoneTierClaims) is
// PERMANENT — see prestigeGame in engine.js — so it carries over exactly as left, cycle to cycle,
// until the next Prestige resets Memory (and the transfer budget) fresh.
const ByteFoundryPage = ({ game, onBack }) => {
  const { actions, dismissOfflineProgress, offlineProgress, state } = game
  const { intro } = state

  const isFull = intro.bits >= intro.capacity
  const canCombine = !intro.byteCreated && intro.bits >= INTRO_BYTE_COMBINE_COST
  const revealed = isIntroConversionUnlocked(state)
  const productionRate = getIntroProductionRate(intro)

  const investCost = getIntroProductionMilestoneCost(intro.productionMilestoneTier)
  const investCostBytes = investCost / BITS_PER_BYTE
  const investMaxClaims = getIntroProductionMilestoneMaxClaims(intro.productionMilestoneTier)
  const investClaimsUsedUp = intro.productionMilestoneTierClaims >= investMaxClaims
  const canInvest = intro.bits >= investCost && !investClaimsUsedUp

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
  const canTransferBlock = intro.bits >= INTRO_BITS_PER_KILOBYTE_CONVERSION

  const combineProgress = clampPercent((intro.bits / INTRO_BYTE_COMBINE_COST) * 100)
  const fullProgress = clampPercent((intro.bits / intro.capacity) * 100)
  const investProgress = clampPercent((intro.bits / investCost) * 100)
  const activeBlockProgress = clampPercent((intro.bits / INTRO_BITS_PER_KILOBYTE_CONVERSION) * 100)

  // Storage: an independent build ladder (1 KB, then 10 KB, … — see getStorageBankSize) offers one
  // buildable size at a time, STORAGE_BANK_LADDER_CAP banks per size before advancing; a built
  // bank's own redeemability is separately gated on tier01's (Kilobytes') current per-unit level
  // cost catching up to it (isStorageBankRedeemable below).
  const storageBankSize = getStorageBankSize(state)
  const storageBankCost = getStorageBankCost(storageBankSize)
  const canBuildStorageBank = intro.bits >= storageBankCost
  const storageBuildProgress = clampPercent((intro.bits / storageBankCost) * 100)
  const storageBankRedeemableNow = isStorageBankRedeemable(state, storageBankSize)
  const storageBanksBuiltTotal = intro.storageBanksBuiltTotal ?? {}
  // Every size ever built, any size still held (a save/seed could hold banks without a matching
  // storageBanksBuiltTotal entry — e.g. a migrated pre-ladder save), plus whatever's currently
  // offered (even at 0 built, so its row/goal is visible before the first one is banked) —
  // ascending, so rows read smallest-to-largest.
  const storageSizesToShow = [
    ...new Set([
      ...Object.keys(storageBanksBuiltTotal).map(Number),
      ...Object.keys(intro.storageBanks ?? {}).map(Number),
      storageBankSize,
    ]),
  ]
    .filter(size => (storageBanksBuiltTotal[size] ?? 0) > 0 || (intro.storageBanks?.[size] ?? 0) > 0 || size === storageBankSize)
    .sort((a, b) => a - b)
  const fullStorageBankSizes = Object.keys(intro.storageBanks ?? {})
    .map(Number)
    .filter(size => intro.storageBanks[size] > 0)
    .sort((a, b) => a - b)

  return (
    <RootDiv>
      <OfflineProgressNotice offlineProgress={offlineProgress} dismissOfflineProgress={dismissOfflineProgress} />
      <Title>⚙️ Byte Foundry</Title>
      <StatusText>
        {!intro.mainGameUnlocked
          ? 'Tap to fill Memory. Combine 8 bits into a Byte to auto-produce.'
          : 'Main game unlocked — keep transferring Memory into Kilobytes any time.'}
      </StatusText>

      <TilesRow>
        <FillableStatCard aria-label="byte foundry balance" $progress={fullProgress}>
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

      <TapArea
        aria-label="tap to generate a bit"
        disabled={isFull}
        onClick={actions.tapIntroBit}
        type="button"
        $compact={intro.byteCreated}
      >
        👆 Tap
      </TapArea>

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

        {intro.byteCreated && (<>
          <Button
            aria-label="sacrifice all bits for 10x capacity"
            disabled={!isFull}
            onClick={actions.pickIntroCapacityMilestone}
            title="Empty Memory for 10x capacity"
            type="button"
            variant={isFull ? 'prestige' : 'neutral'}
            $progress={fullProgress}
          >
            <ButtonContent>💥 Sacrifice for 10x Capacity</ButtonContent>
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
                ? `Already claimed ${investMaxClaims}/${investMaxClaims} at this tier`
                : `${formatAmount(investCostBytes)} B — claim ${intro.productionMilestoneTierClaims + 1}/${investMaxClaims}`
            }
            type="button"
            variant={canInvest ? 'info' : 'neutral'}
            $progress={investProgress}
          >
            <ButtonContent>⚡ Invest for Double Production ({formatAmount(investCostBytes)} B)</ButtonContent>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry invest progress"
              aria-valuenow={intro.bits}
              aria-valuemin={0}
              aria-valuemax={investCost}
            />
          </Button>

        </>)}

      </ActionsRow>

      {intro.byteCreated && (
        <StorageSection aria-label="byte foundry storage">
          <SectionLabel>Storage</SectionLabel>
          <Button
            aria-label="build storage bank"
            disabled={!canBuildStorageBank}
            onClick={actions.buildStorageBank}
            title={
              storageBankRedeemableNow
                ? `Costs ${formatAmount(storageBankCost)} bits (10x the block's own size, in bytes) — builds an empty ${formatStorageSize(storageBankSize)} container; Memory auto-fills it, redeemable right away once full`
                : `Costs ${formatAmount(storageBankCost)} bits (10x the block's own size, in bytes) — builds an empty ${formatStorageSize(storageBankSize)} container; Memory auto-fills it, but it won't be redeemable until Kilobytes' level cost reaches it`
            }
            type="button"
            variant={canBuildStorageBank ? 'info' : 'neutral'}
            $progress={storageBuildProgress}
          >
            <ButtonContent>{`🏦 Build ${formatStorageSize(storageBankSize)} Bank (${formatAmount(storageBankCost)})`}</ButtonContent>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry storage build progress"
              aria-valuenow={intro.bits}
              aria-valuemin={0}
              aria-valuemax={storageBankCost}
            />
          </Button>

          {storageSizesToShow.map(size => {
            const full = intro.storageBanks?.[size] ?? 0
            // Falls back to `full` itself for a state whose storageBanksBuiltTotal doesn't (yet)
            // account for every full bank — e.g. a migrated pre-fill-mechanic save — so a full
            // bank is never rendered as if it didn't exist.
            const builtTotal = Math.max(storageBanksBuiltTotal[size] ?? 0, full)
            const emptyCount = Math.max(0, builtTotal - full)
            const redeemable = isStorageBankRedeemable(state, size)
            return (
              <StorageSizeRow key={size}>
                <StorageSizeLabel>{`${formatStorageSize(size)} banks (${full} full, ${Math.min(builtTotal, STORAGE_BANK_LADDER_CAP)}/${STORAGE_BANK_LADDER_CAP} built)`}</StorageSizeLabel>
                <StorageBankSquaresRow role="group" aria-label={`${formatStorageSize(size)} storage banks`}>
                  {Array.from({ length: STORAGE_BANK_LADDER_CAP }, (_, index) => {
                    const isFull = index < full
                    const isEmpty = !isFull && index < full + emptyCount
                    return (
                      <StorageBankSquare
                        key={index}
                        aria-label={
                          isFull
                            ? `redeem ${formatStorageSize(size)} storage bank`
                            : isEmpty
                              ? `empty ${formatStorageSize(size)} bank`
                              : `not yet built ${formatStorageSize(size)} bank`
                        }
                        disabled={!isFull || !redeemable}
                        onClick={isFull && redeemable ? () => actions.redeemStorageBank(size) : undefined}
                        title={
                          isFull
                            ? (redeemable
                              ? `Redeems 1 ${formatStorageSize(size)} bank for 1 free Kilobyte — empties it, ready to be auto-filled again`
                              : `Redeemable once Kilobytes' level cost reaches ${formatStorageSize(size)}`)
                            : isEmpty
                              ? 'Built, waiting for Memory to auto-fill it'
                              : 'Not yet built'
                        }
                        type="button"
                        $full={isFull}
                        $empty={isEmpty}
                        $redeemable={redeemable}
                      />
                    )
                  })}
                </StorageBankSquaresRow>
              </StorageSizeRow>
            )
          })}

          {fullStorageBankSizes.length > 0 && (
            <Button
              aria-label={intro.storageAutoRedeemEnabled ? 'pause storage auto-redeem' : 'resume storage auto-redeem'}
              onClick={() => actions.setStorageAutoRedeemEnabled(!intro.storageAutoRedeemEnabled)}
              title="Automatically redeems a matching bank the instant Kilobytes' level cost reaches it, no click needed (1 KB banks always auto-redeem once per cycle regardless of this toggle)"
              type="button"
              variant="neutral"
            >
              <ButtonContent>
                {intro.storageAutoRedeemEnabled ? '⏸ Pause Auto-Redeem' : '▶ Resume Auto-Redeem'}
              </ButtonContent>
            </Button>
          )}

          <SectionLabel>{`Kilobytes' current block (${tier01PurchaseProgress}/${purchaseBlockSize})`}</SectionLabel>
          <RateBlocksRow
            role="progressbar"
            aria-label="kilobytes purchase block progress"
            aria-valuenow={tier01PurchaseProgress}
            aria-valuemin={0}
            aria-valuemax={purchaseBlockSize}
          >
            {Array.from({ length: purchaseBlockSize }, (_, index) => (
              <RateBlock key={index} $filled={index < tier01PurchaseProgress} />
            ))}
          </RateBlocksRow>
        </StorageSection>
      )}

      {revealed && (<>
        <SectionLabel>Transfer to Kilobytes ({blocksRemaining} left)</SectionLabel>
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
                      ? 'convert 1000 bits into 1 Kilobyte'
                      : `locked transfer block ${index + 1}`
                }
                disabled={isConsumed || !isActive || !canTransferBlock}
                onClick={isActive ? actions.convertIntroBitsToKilobytes : undefined}
                title={
                  isConsumed
                    ? 'Already transferred'
                    : isActive
                      ? (canTransferBlock ? '1000 bits → 1 Kilobyte' : 'Fill Memory to 1000 bits first')
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
                    aria-valuemax={INTRO_BITS_PER_KILOBYTE_CONVERSION}
                  />
                )}
              </TransferBlock>
            )
          })}
        </TransferBlocksRow>
      </>)}

      {onBack && (
        <Button aria-label="Back to game" onClick={onBack} title="Back to game" type="button" variant="neutral">
          <ButtonContent>← Back to game</ButtonContent>
        </Button>
      )}
    </RootDiv>
  )
}

export default ByteFoundryPage
