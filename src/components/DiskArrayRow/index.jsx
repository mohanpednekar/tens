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

// One size's Cache+Disks strip: size identity lives INSIDE each cell (bit-scale on cache
// squares, Byte-scale on disk circles) — no external Cache/Disks titles or array header.
// Built/full counts stay visual. Sizes stack cleanly when Foundry Disks / StoragePage lists
// every array. (smallest→largest across sizes is the caller's job.)
const DiskSizeRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

// Size text painted inside each square/circle. No text-transform: uppercase — would collapse
// Cache's lowercase "b" (bits) into Disks' uppercase "B" (Bytes).
const CellLabel = styled.span`
  pointer-events: none;
  font-family: ${props => props.theme.font.display};
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1;
  color: ${props => (props.$emphasis ? props.theme.color.text : props.theme.color.textMuted)};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: clip;
`

// Shown in place of the cache strip while this size's array is mid-build (see intro.diskBuild
// in engine.js) — every IO operation against it is disallowed for the build's duration, so the
// interactive cache row is replaced by a plain status line rather than rendered disabled-but-visible.
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
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
  cursor: ${props => (props.$full && props.$manualRedeem ? 'pointer' : 'default')};
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

// The array's own always-full cache row — DISK_CACHE_BLOCK_COUNT blocks, each worth
// size / DISK_CACHE_BLOCK_COUNT bits (shown in the bit-scale Kb/Mb/… unit via formatCacheSize, not
// formatDiskSize's Byte-scale one — see CLAUDE.md's "Economy model"). Steady state is full; Memory
// refills whole blocks when a block was just released or the size was just unlocked (see
// tickDiskAutoFill). A full block ($full) can be manually released ($releasable — accent border,
// clickable) only while some tier's current per-unit cost matches this array's size, crediting
// that block's bits straight into resources.base (the shared Bits currency on Tiers) — never
// auto-transferred; Cache → Tiers is always a manual tap. Cache does not pour into disks.
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
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
// ByteFoundryPage (matching sizes + always the highest shown size, ascending) and StoragePage
// (every size ever reached), so the detail reads and behaves identically wherever it's shown. See
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
  const sizeLabel = formatDiskSize(size)
  const blockLabel = formatCacheSize(blockBits)

  return (
    <DiskSizeRow>
      {rebuilding ? (
        <RebuildingText>
          {`Rebuilding ${sizeLabel} — ${Math.ceil(intro.diskBuild.remainingSeconds)}s`}
        </RebuildingText>
      ) : (
        <CacheBlocksRow role="group" aria-label={`${sizeLabel} disk array cache`}>
          {Array.from({ length: DISK_CACHE_BLOCK_COUNT }, (_, index) => {
            const blockFilledBits = Math.min(blockBits, Math.max(0, cached - index * blockBits))
            const isFull = blockFilledBits >= blockBits
            const releasable = isFull && isDiskCacheBlockReleasable(state, size)
            return (
              <CacheBlock
                key={index}
                aria-label={
                  releasable
                    ? `transfer ${sizeLabel} cache block ${index + 1} to Tiers Bits`
                    : `${sizeLabel} cache block ${index + 1}`
                }
                disabled={!releasable}
                onClick={releasable ? () => actions.releaseDiskCacheBlock(size) : undefined}
                title={
                  isFull
                    ? (releasable
                      ? `Transfer this block's ${blockLabel} to Tiers as Bits (toward ${redeemTierName}) — manual only; cache never auto-transfers`
                      : `Transferable to Tiers only once some tier's level cost matches ${sizeLabel}`)
                    : 'Filling from Memory'
                }
                type="button"
                $full={isFull}
                $releasable={releasable}
              >
                <CellLabel $emphasis={isFull || releasable}>{blockLabel}</CellLabel>
              </CacheBlock>
            )
          })}
        </CacheBlocksRow>
      )}

      <SquaresRow role="group" aria-label={`${sizeLabel} disks`}>
        {Array.from({ length: DISK_ARRAY_LADDER_CAP }, (_, index) => {
          const isFull = index < full
          const isEmpty = !isFull && index < full + emptyCount
          // Auto-eligible disks wait for tickDiskAutoRedeem — not clickable, so a tap cannot
          // bypass the once-per-cycle auto mark or confuse "will auto" with a manual redeem.
          const clickable = isFull && manualRedeem && !rebuilding
          return (
            <DiskSquare
              key={index}
              aria-label={
                isFull
                  ? (autoRedeem
                    ? `auto-redeem ${sizeLabel} disk for ${redeemTierName}`
                    : manualRedeem
                      ? `redeem ${sizeLabel} disk for ${redeemTierName}`
                      : `redeem ${sizeLabel} disk`)
                  : isEmpty
                    ? `empty ${sizeLabel} disk`
                    : `not yet built ${sizeLabel} disk`
              }
              disabled={!clickable}
              onClick={clickable ? () => actions.redeemDisk(size) : undefined}
              title={
                rebuilding
                  ? 'This array is offline while it rebuilds'
                  : isFull
                    ? (autoRedeem
                      ? `Auto-redeems for 1 free ${redeemTierName} — ${redeemTierName} autobuyer is on`
                      : manualRedeem
                        ? `Tap to redeem 1 ${sizeLabel} disk for 1 free ${redeemTierName} — empties it, ready for Memory to fill it again`
                        : redeemable
                          ? `Redeems 1 ${sizeLabel} disk for 1 free ${redeemTierName} — empties it, ready for Memory to fill it again`
                          : `Redeemable once some tier's level cost matches ${sizeLabel}`)
                    : isEmpty
                      ? 'Built, waiting for Memory to fill it'
                      : 'Not yet built'
              }
              type="button"
              $full={isFull}
              $empty={isEmpty}
              $autoRedeem={isFull && autoRedeem}
              $manualRedeem={isFull && manualRedeem}
            >
              <CellLabel $emphasis={isFull || isEmpty}>{sizeLabel}</CellLabel>
            </DiskSquare>
          )
        })}
      </SquaresRow>
    </DiskSizeRow>
  )
}

export default DiskArrayRow
