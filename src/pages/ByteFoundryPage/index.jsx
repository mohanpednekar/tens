import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getIntroTransferBudget, getStorageBankCost, getStorageBankSize, isIntroConversionUnlocked, isStorageBankRedeemable } from 'game/engine'
import { BITS_PER_BYTE, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_COMBINE_COST, TIER_DEFINITIONS } from 'game/layers'
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

// A stronger-contrast variant of StatusText for the Memory tile's transfer-block tracker
// specifically — it's live progress toward this cycle's transfer budget, not secondary/incidental
// text like the production-rate readout beside it, so it's given full-strength text color and a
// bolder weight to actually stand out rather than blending into the same muted tone as everything
// else on the tile.
const TrackerText = styled(StatusText)`
  color: ${props => props.theme.color.text};
  font-weight: 600;
`

const SectionLabel = styled.p`
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
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
// than introducing a second, differently-styled meter convention.
const FillableStatCard = styled(StatCard)`
  flex: 1 1 160px;
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

const TransferBlocksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

// One block per this cycle's whole transfer budget (see getIntroTransferBudget) — always all
// `blockCount` of them, for the whole cycle; blocks never disappear once transferred. Three
// visual states, read together as one continuous progress bar: $consumed (already transferred —
// solid muted fill, permanently disabled), $active (the sole clickable one — accent border, partial
// progressFill gradient toward its own 1000-bit threshold), and plain/upcoming (neither prop set —
// empty outline, disabled placeholder). Only the active block is ever passed a $progress value —
// progressFill returns null without one, so the plain `background` rule below (transparent, or
// surfaceSunken once $consumed) applies instead.
const TransferBlock = styled.button`
  flex: 1 1 2.5rem;
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

const StorageChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

// A compact, wrapping chip per held bank denomination — same Button component (and its `variant`
// success/neutral semantics) as the rest of the page, just shrunk from a full-width block down to
// an inline chip via `flex: 0 0 auto` and tighter padding.
const StorageChip = styled(Button)`
  flex: 0 0 auto;
  width: auto;
  padding: ${props => props.theme.space.xs} ${props => props.theme.space.sm};
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

const formatMemoryAmount = (bits, unit) =>
  unit ? `${formatAmount(bits / unit.divisor)} ${unit.symbol}` : `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`

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

  // The transfer budget (how many 1000-bit blocks this cycle allows in total) is dynamic — tied to
  // the Kilobyte tier's own current purchase block size (see getIntroTransferBudget), same as the
  // main game's own Buy button, not a fixed number.
  const transferBudget = getIntroTransferBudget(state)
  const blockCount = transferBudget / INTRO_BITS_PER_KILOBYTE_CONVERSION
  const blocksTransferred = Math.floor(intro.bitsTransferredThisCycle / INTRO_BITS_PER_KILOBYTE_CONVERSION)
  const blocksRemaining = Math.max(0, blockCount - blocksTransferred)
  const remainingTransferBudget = Math.max(0, transferBudget - intro.bitsTransferredThisCycle)
  const canTransferBlock = intro.bits >= INTRO_BITS_PER_KILOBYTE_CONVERSION && remainingTransferBudget >= INTRO_BITS_PER_KILOBYTE_CONVERSION

  const combineProgress = clampPercent((intro.bits / INTRO_BYTE_COMBINE_COST) * 100)
  const fullProgress = clampPercent((intro.bits / intro.capacity) * 100)
  const investProgress = clampPercent((intro.bits / investCost) * 100)
  const activeBlockProgress = clampPercent((intro.bits / INTRO_BITS_PER_KILOBYTE_CONVERSION) * 100)

  // Storage: bank blocks sized to tier01's (Kilobytes') own current per-unit level cost — build
  // now (10x the size, from Memory); already redeemable at that same price, and stays redeemable
  // even after tier01 levels up further, since its level cost only ever grows within a cycle.
  const storageBankSize = getStorageBankSize(state)
  const storageBankCost = getStorageBankCost(storageBankSize)
  const canBuildStorageBank = intro.bits >= storageBankCost
  const storageBuildProgress = clampPercent((intro.bits / storageBankCost) * 100)
  const heldStorageBankSizes = Object.keys(intro.storageBanks ?? {})
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
          : remainingTransferBudget > 0
            ? `Main game unlocked — ${formatAmount(remainingTransferBudget)} bits left to transfer this cycle.`
            : 'Transfer budget is fully spent — resets next Prestige.'}
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
            <TrackerText aria-label="byte foundry transfer-block tracker">
              {formatAmount(intro.bits % transferBudget)} / {formatAmount(transferBudget)} bits this cycle
            </TrackerText>
          )}
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
            title={`Costs ${formatAmount(storageBankCost)} bits (10x the block's own size) — banks a ${formatStorageSize(storageBankSize)} block at Kilobytes' current level cost, redeemable right away`}
            type="button"
            variant={canBuildStorageBank ? 'info' : 'neutral'}
            $progress={storageBuildProgress}
          >
            <ButtonContent>{`🏦 Build ${formatStorageSize(storageBankSize)} Storage Bank (${formatAmount(storageBankCost)} bits)`}</ButtonContent>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry storage build progress"
              aria-valuenow={intro.bits}
              aria-valuemin={0}
              aria-valuemax={storageBankCost}
            />
          </Button>

          {heldStorageBankSizes.length > 0 && (
            <StorageChipsRow role="group" aria-label="byte foundry storage banks">
              {heldStorageBankSizes.map(size => {
                const count = intro.storageBanks[size]
                const redeemable = isStorageBankRedeemable(state, size)
                return (
                  <StorageChip
                    key={size}
                    aria-label={`redeem ${formatStorageSize(size)} storage bank`}
                    disabled={!redeemable}
                    onClick={() => actions.redeemStorageBank(size)}
                    title={
                      redeemable
                        ? `Redeems 1 ${formatStorageSize(size)} bank for 1 free Kilobyte`
                        : `Redeemable once Kilobytes' level cost reaches ${formatStorageSize(size)}`
                    }
                    type="button"
                    variant={redeemable ? 'success' : 'neutral'}
                  >
                    {`${formatStorageSize(size)} ×${count}`}
                  </StorageChip>
                )
              })}
            </StorageChipsRow>
          )}

          {heldStorageBankSizes.length > 0 && (
            <Button
              aria-label={intro.storageAutoRedeemEnabled ? 'pause storage auto-redeem' : 'resume storage auto-redeem'}
              onClick={() => actions.setStorageAutoRedeemEnabled(!intro.storageAutoRedeemEnabled)}
              title="Automatically redeems a matching bank the instant Kilobytes' level cost reaches it, no click needed"
              type="button"
              variant="neutral"
            >
              <ButtonContent>
                {intro.storageAutoRedeemEnabled ? '⏸ Pause Storage Auto-Redeem' : '▶ Resume Storage Auto-Redeem'}
              </ButtonContent>
            </Button>
          )}
        </StorageSection>
      )}

      {revealed && (<>
        <SectionLabel>Transfer to Kilobytes ({blocksRemaining} left)</SectionLabel>
        <TransferBlocksRow role="group" aria-label="byte foundry kilobyte transfer blocks">
          {Array.from({ length: blockCount }, (_, index) => {
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
