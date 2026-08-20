import Button, { ButtonContent } from 'components/Button'
import { formatCacheSize, formatDiskSize, getDiskRedeemTierName, getDiskSizesToShow, isDiskCacheBlockReleasable } from 'game/engine'
import { DISK_ARRAY_LADDER_CAP, DISK_CACHE_BLOCK_COUNT } from 'game/layers'
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

// One row per disk size ever reached (ascending — smallest first): a cache row (see CacheBlocksRow
// below) followed by a fixed DISK_ARRAY_LADDER_CAP-long strip of squares read together as one
// progress bar: currently FULL (leftmost, clickable once redeemable), then built-but-EMPTY —
// constructed, waiting for its cache to pour into it (see tickDiskAutoFill in engine.js) — then
// not-yet-built placeholders (rightmost). A row only appears once its size has ever been built (or
// is the size currently offered), so rows themselves read top-to-bottom smallest-to-largest too.
const DiskSizeRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

const DiskSizeLabel = styled.p`
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
`

// Shown in place of the cache/disk rows while that size's array is mid-build (see intro.diskBuild
// in engine.js) — every IO operation against it is disallowed for the build's duration, so the
// interactive rows are replaced by a plain status line rather than rendered disabled-but-visible.
const RebuildingText = styled.p`
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.accent};
`

const SquaresRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3px;
  width: 100%;
  max-width: 260px;
`

// A single discrete, all-or-nothing disk container — never partially filled, matching the
// mechanic itself. $full (currently holding its cache's poured contents, awaiting redeem — accent
// border, filled green once $redeemable, a duller raised fill otherwise, clickable only when both
// $full and $redeemable) takes priority over $empty (built but not yet poured into by the array's
// cache — a dim muted-bordered fill, distinct from the plain not-yet-built placeholder below it)
// over the plain not-yet-built placeholder (transparent, outline only, disabled).
const DiskSquare = styled.button`
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

// The array's own small staging-cache row — DISK_CACHE_BLOCK_COUNT blocks, each worth
// size / DISK_CACHE_BLOCK_COUNT bits (shown in the bit-scale Kb/Mb/… unit via formatCacheSize, not
// formatDiskSize's Byte-scale one — see CLAUDE.md's "Economy model"), filling left to right as
// Memory tops the cache up (see tickDiskAutoFill in engine.js) before any of it pours into an empty
// disk container below. A full block ($full) can be manually released ($releasable — accent
// border, clickable) only while some tier's current per-unit cost matches this array's size,
// crediting that block's bits straight into resources.base (the shared Bits currency) rather than
// generic Memory.
const CacheBlocksRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
  max-width: 260px;
`

const CacheBlock = styled.button`
  flex: 1 1 1.2rem;
  min-width: 0;
  aspect-ratio: 1;
  border-radius: ${props => props.theme.radius.sm};
  border: 1.5px solid ${props => (props.$releasable ? props.theme.color.accent : props.theme.color.surfaceSunken)};
  background: ${props => (props.$full ? props.theme.color.surfaceRaised : 'transparent')};
  cursor: ${props => (props.$releasable ? 'pointer' : 'default')};
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
// the cache/redeem grid per size (Disk Fill) — starting the next disk's build stays on
// ByteFoundryPage itself (its own core loop), alongside a brief per-size summary; this page is for
// the fuller, square-by-square detail and the two actions that live only here: releasing a cache
// block and redeeming a full disk. Redeeming is unaffected by the forced priority order (Disk Fill
// ranks highest — see isDiskFillAvailable in engine.js), so nothing on this page is ever disabled
// by anything elsewhere in the priority chain — only by that specific size's own array being
// mid-build (see intro.diskBuild). `onBack` always returns to the Byte Foundry.
const StoragePage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  const disksBuiltTotal = intro.disksBuiltTotal ?? {}
  const diskSizesToShow = getDiskSizesToShow(state)

  return (
    <RootDiv>
      <Header>
        <Title>🏦 Storage</Title>
        <Button aria-label="Back to Byte Foundry" onClick={onBack} title="Back to Byte Foundry" type="button" variant="neutral">
          <ButtonContent>← Back</ButtonContent>
        </Button>
      </Header>

      {diskSizesToShow.map(size => {
        const full = intro.disks?.[size] ?? 0
        // Falls back to `full` itself for a state whose disksBuiltTotal doesn't (yet) account for
        // every full disk — e.g. a migrated pre-fill-mechanic save — so a full disk is never
        // rendered as if it didn't exist.
        const builtTotal = Math.max(disksBuiltTotal[size] ?? 0, full)
        const emptyCount = Math.max(0, builtTotal - full)
        const redeemTierName = getDiskRedeemTierName(state, size)
        const redeemable = redeemTierName !== null
        const rebuilding = intro.diskBuild?.size === size
        const cached = intro.diskCache?.[size] ?? 0
        const blockBits = size / DISK_CACHE_BLOCK_COUNT

        return (
          <DiskSizeRow key={size}>
            <DiskSizeLabel>{`${formatDiskSize(size)} disks (${full} full, ${Math.min(builtTotal, DISK_ARRAY_LADDER_CAP)}/${DISK_ARRAY_LADDER_CAP} built)`}</DiskSizeLabel>

            {rebuilding ? (
              <RebuildingText>
                {`Array rebuilding — ${Math.ceil(intro.diskBuild.remainingSeconds)}s left (every disk in this array is offline until it finishes)`}
              </RebuildingText>
            ) : (
              <CacheBlocksRow role="group" aria-label={`${formatDiskSize(size)} disk array cache`}>
                {Array.from({ length: DISK_CACHE_BLOCK_COUNT }, (_, index) => {
                  const blockFilledBits = Math.min(blockBits, Math.max(0, cached - index * blockBits))
                  const isFull = blockFilledBits >= blockBits
                  const releasable = isFull && isDiskCacheBlockReleasable(state, size)
                  return (
                    <CacheBlock
                      key={index}
                      aria-label={
                        releasable
                          ? `release ${formatDiskSize(size)} cache block ${index + 1} into Bits`
                          : `${formatDiskSize(size)} cache block ${index + 1}`
                      }
                      disabled={!releasable}
                      onClick={releasable ? () => actions.releaseDiskCacheBlock(size) : undefined}
                      title={
                        isFull
                          ? (releasable
                            ? `Release this block's ${formatCacheSize(blockBits)} into your Bits balance (credits toward ${redeemTierName})`
                            : `Redeemable only once some tier's level cost matches ${formatDiskSize(size)}`)
                          : 'Filling from Memory'
                      }
                      type="button"
                      $full={isFull}
                      $releasable={releasable}
                    />
                  )
                })}
              </CacheBlocksRow>
            )}

            <SquaresRow role="group" aria-label={`${formatDiskSize(size)} disks`}>
              {Array.from({ length: DISK_ARRAY_LADDER_CAP }, (_, index) => {
                const isFull = index < full
                const isEmpty = !isFull && index < full + emptyCount
                const clickable = isFull && redeemable && !rebuilding
                return (
                  <DiskSquare
                    key={index}
                    aria-label={
                      isFull
                        ? `redeem ${formatDiskSize(size)} disk`
                        : isEmpty
                          ? `empty ${formatDiskSize(size)} disk`
                          : `not yet built ${formatDiskSize(size)} disk`
                    }
                    disabled={!clickable}
                    onClick={clickable ? () => actions.redeemDisk(size) : undefined}
                    title={
                      rebuilding
                        ? 'This array is offline while it rebuilds'
                        : isFull
                          ? (redeemable
                            ? `Redeems 1 ${formatDiskSize(size)} disk for 1 free ${redeemTierName} — empties it, ready for its cache to fill again`
                            : `Redeemable once some tier's level cost matches ${formatDiskSize(size)}`)
                          : isEmpty
                            ? "Built, waiting for this array's cache to pour into it"
                            : 'Not yet built'
                    }
                    type="button"
                    $full={isFull}
                    $empty={isEmpty}
                    $redeemable={redeemable}
                  />
                )
              })}
            </SquaresRow>
          </DiskSizeRow>
        )
      })}
    </RootDiv>
  )
}

export default StoragePage
