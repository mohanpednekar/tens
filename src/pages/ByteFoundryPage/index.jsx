import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import { formatAmount, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getNextStorageBankSize, getStorageBankCost, isIntroConversionUnlocked, isStorageBankRedeemable } from 'game/engine'
import { BITS_PER_BYTE, INTRO_AUTO_INVEST_THRESHOLD, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_COMBINE_COST, TIER_DEFINITIONS } from 'game/layers'
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

const MemoryLabel = styled.p`
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
// (same disabled={isFull} gating either way). $progress reuses Button's own gradient-fill
// convention (see components/Button's exported progressFill) so it indicates fill-toward-capacity
// the same way every other actionable control on this page now does (see the buttons below).
const TapArea = styled.button`
  position: relative;
  width: ${props => (props.$compact ? '50%' : '100%')};
  aspect-ratio: 5 / 3;
  border: 1.5px solid ${props => props.theme.color.accent};
  border-radius: ${props => props.theme.radius.lg};
  color: ${props => (props.disabled ? props.theme.color.disabled : props.theme.color.accent)};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => (props.$compact ? props.theme.type.scale.lg.size : props.theme.type.scale.xl.size)};
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease, width 0.2s ease, font-size 0.2s ease;
  ${progressFill}

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

// Memory and Cache sit side by side rather than stacked — wraps to a single column on narrow
// viewports since RootDiv itself caps at 480px.
const TilesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

// Reuses Button's own progressFill gradient (see components/Button) so Memory/Cache fill toward
// their capacity the same visual way every actionable control on this page already does, rather
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

// Memory's unit ladder: raw bits below 1 Byte, then B/KB/MB/… scaling by 1000 each step — reusing
// TIER_DEFINITIONS' own KB..QB symbols (see layers.js) since Memory is byte-scale themed
// identically to the main game's tiers. Every capacity value in the Sacrifice ladder (8, 80, 800,
// 8000, …) is evenly divisible by BITS_PER_BYTE, so scaling from bits never loses precision at the
// Byte boundary.
const MEMORY_UNIT_SYMBOLS = ['B', ...TIER_DEFINITIONS.map(tier => tier.symbol)]
const MEMORY_UNIT_SCALE = 1000

// The single unit a bits/capacity pair should both render in, sized off `capacityBits` (always the
// larger of the two) so a balance never shows in a coarser unit than its own capacity — e.g. never
// "512 B / 1 KB".
const getMemoryUnit = capacityBits => {
  if (capacityBits < BITS_PER_BYTE) return null // too small to denominate — render as raw bits
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
const formatMemoryBalance = (bits, capacityBits) => {
  const unit = getMemoryUnit(capacityBits)
  return `${formatMemoryAmount(bits, unit)} / ${formatMemoryAmount(capacityBits, unit)}`
}

// Storage bank sizes are tier01's own per-unit level costs (see getNextStorageBankSize in
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
// read-only: Tap/Combine/Sacrifice/Invest and further Convert transfers (up to this cycle's shared
// transfer budget, see remainingTransferBudget below) all stay fully live whether reached via the
// mandatory gate or this voluntary link. The Byte generator itself (capacity/byteCreated/
// tickSpeedSeconds/productionMultiplier/productionMilestoneTier/productionMilestoneTierClaims) is
// PERMANENT — see prestigeGame in engine.js — so it carries over exactly as left, cycle to cycle,
// until the next Prestige resets Memory (and the transfer budget) fresh.
const ByteFoundryPage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  const isFull = intro.bits >= intro.capacity
  const canCombine = !intro.byteCreated && intro.bits >= INTRO_BYTE_COMBINE_COST
  const revealed = isIntroConversionUnlocked(state)
  const productionRate = getIntroProductionRate(intro)

  const investCost = getIntroProductionMilestoneCost(intro.productionMilestoneTier)
  const investMaxClaims = getIntroProductionMilestoneMaxClaims(intro.productionMilestoneTier)
  const investClaimsUsedUp = intro.productionMilestoneTierClaims >= investMaxClaims
  const canInvest = intro.bits >= investCost && !investClaimsUsedUp

  const remainingTransferBudget = Math.max(0, INTRO_AUTO_INVEST_THRESHOLD - intro.bitsTransferredThisCycle)
  const canConvert = intro.bits >= INTRO_BITS_PER_KILOBYTE_CONVERSION && remainingTransferBudget >= INTRO_BITS_PER_KILOBYTE_CONVERSION

  const combineProgress = clampPercent((intro.bits / INTRO_BYTE_COMBINE_COST) * 100)
  const fullProgress = clampPercent((intro.bits / intro.capacity) * 100)
  const investProgress = clampPercent((intro.bits / investCost) * 100)
  const convertProgress = clampPercent((intro.bits / INTRO_BITS_PER_KILOBYTE_CONVERSION) * 100)

  // Cache is Memory's small rolling counterpart: the current progress toward the next convertible
  // 1000-bit (1 KiloBits) chunk, wrapping back to 0 every time that chunk is spent — unlike Memory
  // (fullProgress above), which tracks the whole balance against its much larger capacity. Only
  // meaningful once conversion itself is revealed (see `revealed` above).
  const cacheBits = intro.bits % INTRO_BITS_PER_KILOBYTE_CONVERSION
  const cacheProgress = clampPercent((cacheBits / INTRO_BITS_PER_KILOBYTE_CONVERSION) * 100)

  // Storage: bank blocks sized to tier01's (Kilobytes') own future per-unit level costs — build
  // now (10x the size, from Memory), redeem later once tier01's level actually reaches that cost.
  const nextStorageBankSize = getNextStorageBankSize(state)
  const storageBankCost = getStorageBankCost(nextStorageBankSize)
  const canBuildStorageBank = intro.bits >= storageBankCost
  const storageBuildProgress = clampPercent((intro.bits / storageBankCost) * 100)
  const heldStorageBankSizes = Object.keys(intro.storageBanks ?? {})
    .map(Number)
    .filter(size => intro.storageBanks[size] > 0)
    .sort((a, b) => a - b)

  return (
    <RootDiv>
      <Title>⚙️ Byte Foundry</Title>
      <StatusText>
        {!intro.mainGameUnlocked
          ? 'Tap to generate bits into your Memory. Combine 8 bits into a Byte to start producing more automatically.'
          : remainingTransferBudget > 0
            ? `Main game unlocked! Your Byte generator keeps running here — convert more 1000-bit sets into Kilobytes any time, up to ${formatAmount(remainingTransferBudget)} bits left this cycle.`
            : 'This cycle’s 8000-bit transfer budget is fully spent. Your Byte generator and its upgrades keep running — a fresh budget opens after your next Prestige.'}
      </StatusText>

      <TilesRow>
        <FillableStatCard aria-label="byte foundry balance" $progress={fullProgress}>
          <MemoryLabel>Memory</MemoryLabel>
          <BalanceText>{formatMemoryBalance(intro.bits, intro.capacity)}</BalanceText>
          <VisuallyHidden
            role="progressbar"
            aria-label="byte foundry bit balance"
            aria-valuenow={intro.bits}
            aria-valuemin={0}
            aria-valuemax={intro.capacity}
          />
          {intro.byteCreated && (
            <StatusText aria-label="byte foundry 8000-bit tracker">
              {formatAmount(intro.bits % INTRO_AUTO_INVEST_THRESHOLD)} bit{(intro.bits % INTRO_AUTO_INVEST_THRESHOLD) === 1 ? '' : 's'} of this cycle's 8000
            </StatusText>
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

        {revealed && (
          <FillableStatCard aria-label="byte foundry cache" $progress={cacheProgress}>
            <MemoryLabel>Cache 1KB</MemoryLabel>
            <BalanceText>
              {formatAmount(cacheBits)} / {formatAmount(INTRO_BITS_PER_KILOBYTE_CONVERSION)} bits
            </BalanceText>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry cache progress"
              aria-valuenow={cacheBits}
              aria-valuemin={0}
              aria-valuemax={INTRO_BITS_PER_KILOBYTE_CONVERSION}
            />
          </FillableStatCard>
        )}
      </TilesRow>

      <TapArea
        aria-label="tap to generate a bit"
        disabled={isFull}
        onClick={actions.tapIntroBit}
        type="button"
        $compact={intro.byteCreated}
        $progress={fullProgress}
      >
        👆 Tap
        <VisuallyHidden
          role="progressbar"
          aria-label="byte foundry tap progress"
          aria-valuenow={intro.bits}
          aria-valuemin={0}
          aria-valuemax={intro.capacity}
        />
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
            title="Empties your Memory in exchange for 10x capacity"
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
                ? `Already claimed ${investMaxClaims} of ${investMaxClaims} at this cost tier`
                : `Costs ${formatAmount(investCost)} bits — claim ${intro.productionMilestoneTierClaims + 1} of ${investMaxClaims} at this cost tier`
            }
            type="button"
            variant={canInvest ? 'info' : 'neutral'}
            $progress={investProgress}
          >
            <ButtonContent>⚡ Invest for Double Production ({formatAmount(investCost)} bits)</ButtonContent>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry invest progress"
              aria-valuenow={intro.bits}
              aria-valuemin={0}
              aria-valuemax={investCost}
            />
          </Button>

          <Button
            aria-label="build storage bank"
            disabled={!canBuildStorageBank}
            onClick={actions.buildStorageBank}
            title={`Costs ${formatAmount(storageBankCost)} bits (10x the block's own size) — banks a ${formatStorageSize(nextStorageBankSize)} block, redeemable once Kilobytes' level cost reaches ${formatStorageSize(nextStorageBankSize)}`}
            type="button"
            variant={canBuildStorageBank ? 'info' : 'neutral'}
            $progress={storageBuildProgress}
          >
            <ButtonContent>{`🏦 Build ${formatStorageSize(nextStorageBankSize)} Storage Bank (${formatAmount(storageBankCost)} bits)`}</ButtonContent>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry storage build progress"
              aria-valuenow={intro.bits}
              aria-valuemin={0}
              aria-valuemax={storageBankCost}
            />
          </Button>

          {heldStorageBankSizes.map(size => {
            const count = intro.storageBanks[size]
            const redeemable = isStorageBankRedeemable(state, size)
            return (
              <Button
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
                <ButtonContent>{`📤 Redeem ${formatStorageSize(size)} Bank (×${count})`}</ButtonContent>
              </Button>
            )
          })}

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
        </>)}

        {revealed && (
          <Button
            aria-label="convert 1000 bits into 1 Kilobyte"
            disabled={!canConvert}
            onClick={actions.convertIntroBitsToKilobytes}
            title={
              remainingTransferBudget < INTRO_BITS_PER_KILOBYTE_CONVERSION
                ? 'This cycle’s 8000-bit transfer budget is already spent — resets on your next Prestige'
                : 'Spends 1000 bits from your Memory to grant 1 Kilobyte in the main game'
            }
            type="button"
            variant={canConvert ? 'success' : 'neutral'}
            $progress={convertProgress}
          >
            <ButtonContent>💾 Transfer 1 KiloBits</ButtonContent>
            <VisuallyHidden
              role="progressbar"
              aria-label="byte foundry convert progress"
              aria-valuenow={intro.bits}
              aria-valuemin={0}
              aria-valuemax={INTRO_BITS_PER_KILOBYTE_CONVERSION}
            />
          </Button>
        )}
      </ActionsRow>

      {onBack && (
        <Button aria-label="Back to game" onClick={onBack} title="Back to game" type="button" variant="neutral">
          <ButtonContent>← Back to game</ButtonContent>
        </Button>
      )}
    </RootDiv>
  )
}

export default ByteFoundryPage
