import Button, { ButtonContent } from 'components/Button'
import { formatStorageSize, getStorageSizesToShow, isStorageBankRedeemable } from 'game/engine'
import { STORAGE_BANK_LADDER_CAP } from 'game/layers'
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

// Storage's own dedicated screen — split out of ByteFoundryPage (see "Byte Foundry" in CLAUDE.md)
// once revealed (isStorageUnlocked), reached via that page's "🏦 Storage" nav button. Holds only
// the redeem grid (Storage Bank Fill) — Building the next bank stays on ByteFoundryPage itself
// (its own core loop), alongside a brief per-size summary; this page is for the fuller,
// square-by-square detail and the one action that lives only here, redeeming. Redeeming is
// unaffected by the forced priority order (Storage Bank Fill ranks highest — see
// isStorageBankFillAvailable in engine.js), so nothing on this page is ever disabled by anything
// elsewhere in the priority chain. `onBack` always returns to the Byte Foundry.
const StoragePage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  const storageBanksBuiltTotal = intro.storageBanksBuiltTotal ?? {}
  const storageSizesToShow = getStorageSizesToShow(state)

  return (
    <RootDiv>
      <Header>
        <Title>🏦 Storage</Title>
        <Button aria-label="Back to Byte Foundry" onClick={onBack} title="Back to Byte Foundry" type="button" variant="neutral">
          <ButtonContent>← Back</ButtonContent>
        </Button>
      </Header>

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
                          : `Redeemable once Kilobytes' level cost matches ${formatStorageSize(size)}`)
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
