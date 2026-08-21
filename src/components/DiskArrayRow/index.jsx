import {
  formatCacheSize,
  formatDiskSize,
  getDiskRedeemTierName,
  isDiskAutoRedeemEligible,
  isDiskCacheBlockReleasable,
  isDiskManualRedeemAvailable,
} from 'game/engine'
import { DISK_ARRAY_LADDER_CAP, DISK_CACHE_BLOCK_COUNT } from 'game/layers'
import styled, { keyframes } from 'styled-components'

// One size's own cache-blocks-plus-disk-squares detail: a "Cache" row (see CacheBlocksRow below)
// followed immediately by a "Disks" row of the same size — Cache first, Disks of that row right
// after (smallest→largest across sizes is the caller's job). A fixed DISK_ARRAY_LADDER_CAP-long
// strip read together as one progress bar: currently FULL (leftmost, clickable once redeemable),
// then built-but-EMPTY — constructed, waiting for its cache to pour into it (see tickDiskAutoFill
// in engine.js) — then not-yet-built placeholders (rightmost). Each row carries its own RowLabel
// caption naming its own per-item size, in its own correct unit scale (see RowLabel below), and
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

// A small caption above each row — "Cache — <block size, bit-scale> each"/"Disks — <disk size,
// Byte-scale> each (...)" — the two rows otherwise read as one undifferentiated strip of squares,
// with nothing marking where the cache ends and the disks begin, or which unit scale either one is
// even in. Sits flush left (rather than centered) so it reads as a row heading, not another
// centered status line.
// Deliberately NOT text-transform: uppercase — that would visually collapse the size text's own
// lowercase "b" (bits) into uppercase "B" (Bytes), destroying the exact distinction this caption
// exists to show (see formatCacheSize/formatDiskSize in engine.js and CLAUDE.md's "Economy model").
const RowLabel = styled.p`
  align-self: flex-start;
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
`

// Short status under the Disks row when a full disk is actionable — makes auto vs manual redeem
// obvious without relying on square color alone (Cache never auto-transfers; only Disks do).
const ActionHint = styled.p`
  align-self: flex-start;
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => (props.$auto ? props.theme.color.info : props.theme.color.good)};
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

const manualPulse = keyframes`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`

// A single discrete, all-or-nothing disk container — never partially filled, matching the
// mechanic itself. Flexible width (like CacheBlock below), so the row of DISK_ARRAY_LADDER_CAP
// squares always stretches to fill the full row rather than staying small and centered with
// leftover space around it. Fully round (border-radius: 50%) — deliberately distinct from
// CacheBlock's square, chip-like shape below, so the two rows read apart at a glance (a physical
// disk is round; a cache/memory block is square). $full takes priority over $empty over the plain
// not-yet-built placeholder. Among full disks: $autoRedeem (info/blue — matching tier autobuyer
// will take it) vs $manualRedeem (good/green + pulse — player must tap) vs merely redeemable-
// looking but not yet full.
const DiskSquare = styled.button`
  flex: 1 1 1.2rem;
  min-width: 0;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1.5px solid ${props =>
    props.$full
      ? props.theme.color.accent
      : props.$empty
        ? props.theme.color.textMuted
        : props.theme.color.surfaceSunken};
  background: ${props =>
    props.$full
      ? (props.$manualRedeem
        ? props.theme.color.good
        : props.$autoRedeem
          ? props.theme.color.info
          : props.theme.color.surfaceRaised)
      : props.$empty
        ? props.theme.color.surfaceSunken
        : 'transparent'};
  cursor: ${props => (props.$full && (props.$manualRedeem || props.$autoRedeem) ? 'pointer' : 'default')};
  transition: filter 0.15s ease, transform 0.05s ease;
  animation: ${props => (props.$manualRedeem ? manualPulse : 'none')} 1.4s ease-in-out infinite;

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.9);
  }

  &:disabled {
    cursor: not-allowed;
    animation: none;
  }
`

// The array's own small staging-cache row — DISK_CACHE_BLOCK_COUNT blocks, each worth
// size / DISK_CACHE_BLOCK_COUNT bits (shown in the bit-scale Kb/Mb/… unit via formatCacheSize, not
// formatDiskSize's Byte-scale one — see CLAUDE.md's "Economy model"), filling left to right as
// Memory tops the cache up (see tickDiskAutoFill in engine.js) before any of it pours into an empty
// disk container below. A full block ($full) can be manually released ($releasable — accent
// border, clickable) only while some tier's current per-unit cost matches this array's size,
// crediting that block's bits straight into resources.base (the shared Bits currency on Tiers) —
// never auto-transferred; Cache → Tiers is always a manual tap.
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
// ByteFoundryPage (every currently-relevant/redeemable size, ascending) and StoragePage (every
// size ever reached), so the detail reads and behaves identically wherever it's shown. See
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
  const autoRedeem = isDiskAutoRedeemEligible(state, size)
  const manualRedeem = isDiskManualRedeemAvailable(state, size)
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
      {rebuilding ? (
        <RebuildingText>
          {`Array rebuilding — ${Math.ceil(intro.diskBuild.remainingSeconds)}s left (every disk in this array is offline until it finishes)`}
        </RebuildingText>
      ) : (
        <>
          <RowLabel>{`Cache — ${formatCacheSize(blockBits)} each (tap full → Tiers Bits)`}</RowLabel>
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
                      ? `transfer ${formatDiskSize(size)} cache block ${index + 1} to Tiers Bits`
                      : `${formatDiskSize(size)} cache block ${index + 1}`
                  }
                  disabled={!releasable}
                  onClick={releasable ? () => actions.releaseDiskCacheBlock(size) : undefined}
                  title={
                    isFull
                      ? (releasable
                        ? `Transfer this block's ${formatCacheSize(blockBits)} to Tiers as Bits (toward ${redeemTierName}) — manual only; cache never auto-transfers`
                        : `Transferable to Tiers only once some tier's level cost matches ${formatDiskSize(size)}`)
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

      <RowLabel>
        {isFullyBuilt
          ? `Disks — ${formatDiskSize(size)} each (${full}/${DISK_ARRAY_LADDER_CAP} full)`
          : `Disks — ${formatDiskSize(size)} each (${full} full, ${builtCapped}/${DISK_ARRAY_LADDER_CAP} built)`}
      </RowLabel>

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
                  ? (autoRedeem
                    ? `auto-redeem ${formatDiskSize(size)} disk for ${redeemTierName}`
                    : manualRedeem
                      ? `redeem ${formatDiskSize(size)} disk for ${redeemTierName}`
                      : `redeem ${formatDiskSize(size)} disk`)
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
                    ? (autoRedeem
                      ? `Auto-redeems for 1 free ${redeemTierName} — ${redeemTierName} autobuyer is on (you can still tap)`
                      : manualRedeem
                        ? `Tap to redeem 1 ${formatDiskSize(size)} disk for 1 free ${redeemTierName} — empties it, ready for its cache to fill again`
                        : redeemable
                          ? `Redeems 1 ${formatDiskSize(size)} disk for 1 free ${redeemTierName} — empties it, ready for its cache to fill again`
                          : `Redeemable once some tier's level cost matches ${formatDiskSize(size)}`)
                    : isEmpty
                      ? "Built, waiting for this array's cache to pour into it"
                      : 'Not yet built'
              }
              type="button"
              $full={isFull}
              $empty={isEmpty}
              $autoRedeem={isFull && autoRedeem}
              $manualRedeem={isFull && manualRedeem}
            />
          )
        })}
      </SquaresRow>

      {!rebuilding && autoRedeem && (
        <ActionHint $auto>
          {`Auto-redeem → ${redeemTierName} (autobuyer on)`}
        </ActionHint>
      )}
      {!rebuilding && manualRedeem && (
        <ActionHint>
          {`Tap a full disk → 1 free ${redeemTierName}`}
        </ActionHint>
      )}
    </DiskSizeRow>
  )
}

export default DiskArrayRow
