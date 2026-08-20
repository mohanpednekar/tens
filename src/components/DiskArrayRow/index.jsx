import { formatCacheSize, formatDiskSize, getDiskRedeemTierName, isDiskCacheBlockReleasable } from 'game/engine'
import { DISK_ARRAY_LADDER_CAP, DISK_CACHE_BLOCK_COUNT } from 'game/layers'
import styled from 'styled-components'

// One size's own cache-blocks-plus-disk-squares detail: a "Cache" row (see CacheBlocksRow below)
// followed by a "Disks" row — a fixed DISK_ARRAY_LADDER_CAP-long strip read together as one
// progress bar: currently FULL (leftmost, clickable once redeemable), then built-but-EMPTY —
// constructed, waiting for its cache to pour into it (see tickDiskAutoFill in engine.js) — then
// not-yet-built placeholders (rightmost). Each row carries its own uppercase RowLabel caption, and
// the two shapes deliberately differ (round disks vs. square cache blocks — see DiskSquare/
// CacheBlock below), so which row is which reads at a glance rather than as one undifferentiated
// strip of squares.
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

// A small uppercase caption ("CACHE"/"DISKS") above each row — the two rows otherwise read as one
// undifferentiated strip of squares, with nothing marking where the cache ends and the disks
// begin. Sits flush left (rather than centered, like DiskSizeLabel above) so it reads as a row
// heading, not another centered status line.
const RowLabel = styled.p`
  align-self: flex-start;
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

// Shown in place of the cache/disk rows while this size's array is mid-build (see intro.diskBuild
// in engine.js) — every IO operation against it is disallowed for the build's duration, so the
// interactive rows are replaced by a plain status line rather than rendered disabled-but-visible.
const RebuildingText = styled.p`
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.accent};
`

const SquaresRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`

// A single discrete, all-or-nothing disk container — never partially filled, matching the
// mechanic itself. Flexible width (like CacheBlock below), so the row of DISK_ARRAY_LADDER_CAP
// squares always stretches to fill the full row rather than staying small and centered with
// leftover space around it. Fully round (border-radius: 50%) — deliberately distinct from
// CacheBlock's square, chip-like shape below, so the two rows read apart at a glance (a physical
// disk is round; a cache/memory block is square) rather than as one undifferentiated strip. $full
// (currently holding its cache's poured contents, awaiting redeem — accent border, filled green
// once $redeemable, a duller raised fill otherwise, clickable only when both $full and
// $redeemable) takes priority over $empty (built but not yet poured into by the array's cache — a
// dim muted-bordered fill, distinct from the plain not-yet-built placeholder below it) over the
// plain not-yet-built placeholder (transparent, outline only, disabled).
const DiskSquare = styled.button`
  flex: 1 1 1.2rem;
  min-width: 0;
  aspect-ratio: 1;
  border-radius: 50%;
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

// One Disk array's full interactive detail (cache release, redeem) for a single `size` — shared by
// ByteFoundryPage (the single currently-active/buildable size only) and StoragePage (every size
// ever reached), so the detail reads and behaves identically wherever it's shown rather than
// StoragePage having its own copy and ByteFoundryPage settling for a lifeless text summary. See
// CLAUDE.md's "Byte Foundry"/"Economy model" sections. Redeeming/releasing are both unaffected by
// the Byte Foundry's forced priority order (Disk Fill ranks highest — see isDiskFillAvailable in
// engine.js), so nothing here is ever disabled by anything elsewhere in that chain — only by this
// specific size's own array being mid-build (see intro.diskBuild).
const DiskArrayRow = ({ actions, size, state }) => {
  const { intro } = state
  const full = intro.disks?.[size] ?? 0
  const disksBuiltTotal = intro.disksBuiltTotal ?? {}
  // Falls back to `full` itself for a state whose disksBuiltTotal doesn't (yet) account for every
  // full disk — e.g. a migrated pre-fill-mechanic save — so a full disk is never rendered as if it
  // didn't exist.
  const builtTotal = Math.max(disksBuiltTotal[size] ?? 0, full)
  const emptyCount = Math.max(0, builtTotal - full)
  const redeemTierName = getDiskRedeemTierName(state, size)
  const redeemable = redeemTierName !== null
  const rebuilding = intro.diskBuild?.size === size
  const cached = intro.diskCache?.[size] ?? 0
  const blockBits = size / DISK_CACHE_BLOCK_COUNT
  const builtCapped = Math.min(builtTotal, DISK_ARRAY_LADDER_CAP)
  // Once an array has finished building out (builtCapped reaches DISK_ARRAY_LADDER_CAP), the
  // "X/10 built" clause never changes again — it's permanently "10/10" for every size the ladder
  // has since moved past. Drop it entirely at that point in favor of just "n/10 full", the only
  // number that still moves.
  const isFullyBuilt = builtCapped >= DISK_ARRAY_LADDER_CAP

  return (
    <DiskSizeRow>
      <DiskSizeLabel>
        {isFullyBuilt
          ? `${formatDiskSize(size)} disks (${full}/${DISK_ARRAY_LADDER_CAP} full)`
          : `${formatDiskSize(size)} disks (${full} full, ${builtCapped}/${DISK_ARRAY_LADDER_CAP} built)`}
      </DiskSizeLabel>

      {rebuilding ? (
        <RebuildingText>
          {`Array rebuilding — ${Math.ceil(intro.diskBuild.remainingSeconds)}s left (every disk in this array is offline until it finishes)`}
        </RebuildingText>
      ) : (
        <>
          <RowLabel>Cache</RowLabel>
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
        </>
      )}

      <RowLabel>Disks</RowLabel>

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
}

export default DiskArrayRow
