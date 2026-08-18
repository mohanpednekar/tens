import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import { formatAmount, formatBitsInNearestUnit, getStorageBankCost, getStorageBankSize, isStorageBankBuildTurnAvailable, isStorageBankRedeemable } from 'game/engine'
import { STORAGE_BANK_LADDER_CAP, TIER_DEFINITIONS } from 'game/layers'
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

// Title plus the "← Back to Byte Foundry" exit share one row, the same title/nav-link placement
// convention ByteFoundryPage's own <Header> already uses.
const Header = styled.header`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.space.sm};
  justify-content: space-between;
  width: 100%;
`

const Title = styled.h1`
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  margin: 0;
`

const StatusText = styled.p`
  margin: 0;
  color: ${props => props.theme.color.textMuted};
  text-align: center;
`

// One row per bank size ever reached (ascending — smallest first), each a fixed
// STORAGE_BANK_LADDER_CAP-long strip of squares read together as one progress bar: currently FULL
// (leftmost, clickable once redeemable), then built-but-EMPTY — constructed, waiting for Memory to
// auto-fill them (see tickStorageAutoFill in engine.js) — then not-yet-built placeholders
// (rightmost). A row only appears once its size has ever been built (or is the size currently
// offered), so rows themselves read top-to-bottom smallest-to-largest too.
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

const BuildButton = styled(Button)`
  width: 100%;
  ${progressFill}
`

const clampPercent = value => Math.min(100, Math.max(0, value))

// Storage bank sizes AND the Byte Foundry's transfer block's own dynamic cost
// (getIntroKilobyteConversionCost in engine.js) are both tier01's own per-unit level costs (see
// getStorageBankSize in engine.js), so they share this one formatting scale — a completely
// separate scale from Memory's Byte-based one (see formatBitsInNearestUnit): 1000 bits is "1 KB"
// here ("KiloBits", not 1000 Bytes/8000 bits). Reuses TIER_DEFINITIONS' KB..QB symbols for the
// same "byte-scale themed" reason Memory's own ladder does. Every value passed in is already an
// exact power of ten by construction (getTierCost), so this always lands on a clean, whole-number
// label. Only StoragePage renders bank sizes, so this stays local rather than living in engine.js.
const STORAGE_UNIT_SYMBOLS = TIER_DEFINITIONS.map(tier => tier.symbol)
const formatStorageSize = bits => {
  if (bits < 1000) return `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`
  let value = bits / 1000
  let unitIndex = 0
  while (value >= 1000 && unitIndex < STORAGE_UNIT_SYMBOLS.length - 1) {
    value /= 1000
    unitIndex += 1
  }
  return `${formatAmount(value)} ${STORAGE_UNIT_SYMBOLS[unitIndex]}`
}

// Storage's own dedicated screen — split out of ByteFoundryPage (see "Byte Foundry" in CLAUDE.md)
// once revealed (isStorageUnlocked), reached via that page's "🏦 Storage" nav button. Both actions
// here (Storage Bank Fill/redeem, Storage Bank Build) are still gated by the Byte Foundry's forced
// priority order — Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory — so
// Build can show disabled here even while its own cost is affordable, if Bandwidth (which lives
// back on ByteFoundryPage) currently outranks it. `onBack` always returns to the Byte Foundry.
const StoragePage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  const storageBankSize = getStorageBankSize(state)
  const storageBankCost = getStorageBankCost(storageBankSize)
  const canBuildStorageBank = isStorageBankBuildTurnAvailable(state)
  const storageBuildBlockedByPriority = intro.bits >= storageBankCost && !canBuildStorageBank
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

  return (
    <RootDiv>
      <Header>
        <Title>🏦 Storage</Title>
        <Button aria-label="Back to Byte Foundry" onClick={onBack} title="Back to Byte Foundry" type="button" variant="neutral">
          <ButtonContent>← Back</ButtonContent>
        </Button>
      </Header>
      <StatusText>{`Memory: ${formatBitsInNearestUnit(intro.bits)}`}</StatusText>

      <BuildButton
        aria-label="build storage bank"
        disabled={!canBuildStorageBank}
        onClick={actions.buildStorageBank}
        title={
          storageBuildBlockedByPriority
            ? 'Take Bandwidth (or redeem a full Storage Bank) first'
            : storageBankRedeemableNow
              ? `Costs ${formatBitsInNearestUnit(storageBankCost)} (10x the block's own size, in bytes) — builds an empty ${formatStorageSize(storageBankSize)} container; Memory auto-fills it, redeemable right away once full`
              : `Costs ${formatBitsInNearestUnit(storageBankCost)} (10x the block's own size, in bytes) — builds an empty ${formatStorageSize(storageBankSize)} container; Memory auto-fills it, but it won't be redeemable until Kilobytes' level cost reaches it`
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
      </BuildButton>

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
    </RootDiv>
  )
}

export default StoragePage
