import {
  formatCacheSize,
  formatDiskSize,
  getDiskReadCacheFlush,
  getDiskReadCacheFlushFill,
  getDiskRedeemTierName,
  getDiskWriteCacheFlushFill,
  getDiskWriteCacheMerge,
  getDiskWriteCacheSegmentFill,
  isDiskAutoRedeemEligible,
  isDiskCacheBlockAutoReleaseEligible,
  isDiskCacheBlockManualReleaseAvailable,
  isDiskManualRedeemAvailable,
  isDiskReadCacheFlushPaused,
  isDiskWriteCacheCollectPaused,
} from 'game/engine'
import { DISK_ARRAY_LADDER_CAP, DISK_CACHE_BLOCK_COUNT } from 'game/layers'
import styled, { keyframes } from 'styled-components'

// One size's Cache+Disks strip: size identity lives INSIDE each cell (bit-scale on cache
// squares, Byte-scale on disk circles) — no external Cache/Disks titles or array header.
// Built/full counts stay visual. Sizes stack cleanly when Foundry lists every array
// (smallest→largest across sizes is the caller's job).
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
  font-size: 0.65rem;
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
  width: 100%;
  text-align: center;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.accent};
`

// Always one unbroken row of DISK_ARRAY_LADDER_CAP disks — never wraps on mobile. Circles
// flex-shrink together so longer in-cell labels still fit without a second row.
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
// circles always stretches to fill the full row rather than staying small and centered with
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
// tickDiskAutoFill). A full block ($full) can be manually released ($manualRelease — accent border,
// clickable) or auto-released ($autoRelease — info styling) when Smart is on, but ONLY while no
// full redeemable disk of that size exists — disks always take priority. When flushing to disk,
// blocks drain left-to-right over one cache-block production duration.
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
  border: 1.5px solid ${props =>
    props.$flushing
      ? props.theme.color.info
      : props.$manualRelease || props.$autoRelease
        ? props.theme.color.accent
        : props.theme.color.surfaceSunken};
  background: ${props =>
    props.$full
      ? (props.$autoRelease || props.$flushing
        ? props.theme.color.info
        : props.theme.color.surfaceRaised)
      : 'transparent'};
  cursor: ${props => (props.$manualRelease ? 'pointer' : 'default')};
  transition: filter 0.15s ease, transform 0.05s ease, background 0.15s ease;
  overflow: hidden;
  position: relative;

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

const CacheFlushFill = styled.div`
  position: absolute;
  inset: 0;
  background: ${props => props.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${props => props.$fill});
  opacity: 0.85;
  pointer-events: none;
`

// Write cache — per-array upward merge buffer (empty at rest). Collect shows DISK_ARRAY_LADDER_CAP
// segments; once full the same bar renders solid and drains left-to-right during flush.
const WriteCacheRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`

const WriteCacheSegment = styled.div`
  flex: 1 1 1.2rem;
  min-width: 0;
  aspect-ratio: 1;
  border-radius: ${props => props.theme.radius.sm};
  border: 1.5px solid ${props =>
    props.$active ? props.theme.color.accent : props.theme.color.surfaceSunken};
  background: ${props =>
    props.$filled ? props.theme.color.surfaceRaised : 'transparent'};
  overflow: hidden;
  position: relative;
`

const WriteCacheFlushFill = styled.div`
  position: absolute;
  inset: 0;
  background: ${props => props.theme.color.info};
  transform-origin: left center;
  transform: scaleX(${props => props.$fill});
`

// One Disk array's full interactive detail (cache release, redeem) for a single `size` — used by
// ByteFoundryPage (every size from getDiskSizesToShow, ascending continuous sections) and the
// thin StoragePage wrapper. See CLAUDE.md's "Byte Foundry"/"Economy model" sections. Redeeming/
// releasing are both unaffected by the Byte Foundry's forced priority order (Disk Fill ranks
// highest — see isDiskFillAvailable in engine.js), so nothing here is ever disabled by anything
// elsewhere in that chain — only by this specific size's own array being mid-build (see
// intro.diskBuild).
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
  // Nth disk currently under construction (1-indexed); disksBuiltTotal hasn't incremented yet.
  const buildOrdinal = rebuilding
    ? (intro.disksBuiltTotal?.[size] ?? 0) + 1
    : null
  const rebuildReadySeconds = rebuilding
    ? Math.ceil(intro.diskBuild.remainingSeconds)
    : null
  const writeMerge = getDiskWriteCacheMerge(state, size)
  const writeCollectPaused = writeMerge ? isDiskWriteCacheCollectPaused(state, size) : false
  const writeCollectFill = writeMerge ? getDiskWriteCacheSegmentFill(writeMerge) : 0
  const writeFlushFill = writeMerge ? getDiskWriteCacheFlushFill(writeMerge) : 0
  const writeCollecting = writeMerge && writeMerge.segmentsCollected < DISK_ARRAY_LADDER_CAP
  const writeFlushing = writeMerge && writeMerge.segmentsCollected >= DISK_ARRAY_LADDER_CAP
  const readFlush = getDiskReadCacheFlush(state, size)
  const readFlushing = Boolean(readFlush)
  const readFlushPaused = readFlushing && isDiskReadCacheFlushPaused(state, size)
  // Drain left-to-right: remaining fill fraction across all blocks (1 → 0 as flush completes).
  const readFlushRemainingFraction = readFlushing
    ? Math.max(0, 1 - getDiskReadCacheFlushFill(readFlush))
    : 1
  const displayCached = readFlushing
    ? size * readFlushRemainingFraction
    : cached

  return (
    <DiskSizeRow>
      {rebuilding ? (
        <RebuildingText>
          {`Rebuilding ${sizeLabel} x ${buildOrdinal} array - Ready in ${rebuildReadySeconds}s`}
        </RebuildingText>
      ) : (
        <CacheBlocksRow
          role="group"
          aria-label={
            readFlushing
              ? `${sizeLabel} read cache flushing to disk${readFlushPaused ? ' paused for tier match' : ''}`
              : `${sizeLabel} read cache`
          }
        >
          {Array.from({ length: DISK_CACHE_BLOCK_COUNT }, (_, index) => {
            const blockFilledBits = Math.min(blockBits, Math.max(0, displayCached - index * blockBits))
            const isFull = blockFilledBits >= blockBits
            const partialFill = !isFull && blockFilledBits > 0 ? blockFilledBits / blockBits : 0
            const autoRelease = isFull && !readFlushing && isDiskCacheBlockAutoReleaseEligible(state, size)
            const manualRelease = isFull && !readFlushing && isDiskCacheBlockManualReleaseAvailable(state, size)
            return (
              <CacheBlock
                key={index}
                aria-label={
                  readFlushing
                    ? `${sizeLabel} cache block ${index + 1} flushing to disk`
                    : autoRelease
                      ? `auto-release ${sizeLabel} cache block ${index + 1} to Ladder Bits`
                      : manualRelease
                        ? `transfer ${sizeLabel} cache block ${index + 1} to Ladder Bits`
                        : `${sizeLabel} cache block ${index + 1}`
                }
                disabled={!manualRelease}
                onClick={manualRelease ? () => actions.releaseDiskCacheBlock(size) : undefined}
                title={
                  readFlushing
                    ? (readFlushPaused
                      ? 'Flush paused — matching tier claims this size first'
                      : `Flushing read cache to disk (${Math.ceil(readFlush.remainingSeconds)}s)`)
                    : isFull
                      ? (autoRelease
                        ? `Auto-releases this block's ${blockLabel} to Ladder as Bits (toward ${redeemTierName}) — ${redeemTierName} Smart autobuyer is on and no matching disk is available`
                        : manualRelease
                          ? `Transfer this block's ${blockLabel} to Ladder as Bits (toward ${redeemTierName}) — no matching disk available`
                          : `Use the matching ${sizeLabel} disk first — cache is blocked while a full redeemable disk exists`)
                      : 'Filling from Memory'
                }
                type="button"
                $full={isFull}
                $manualRelease={manualRelease}
                $autoRelease={autoRelease}
                $flushing={readFlushing && (isFull || partialFill > 0)}
              >
                {readFlushing && partialFill > 0 ? (
                  <CacheFlushFill $fill={partialFill} />
                ) : null}
                <CellLabel $emphasis={isFull || manualRelease || autoRelease || readFlushing}>{blockLabel}</CellLabel>
              </CacheBlock>
            )
          })}
        </CacheBlocksRow>
      )}

      {writeMerge && !rebuilding ? (
        <WriteCacheRow
          role="progressbar"
          aria-label={
            writeFlushing
              ? `${sizeLabel} write cache flushing to disk`
              : `${sizeLabel} write cache collecting${writeCollectPaused ? ' paused for tier match' : ''}`
          }
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((writeFlushing ? writeFlushFill : writeCollectFill) * 100)}
        >
          {writeCollecting ? (
            Array.from({ length: DISK_ARRAY_LADDER_CAP }, (_, index) => {
              const filledSegments = writeMerge.segmentsCollected
              const partial = getDiskWriteCacheSegmentFill(writeMerge)
              const isFilled = index < filledSegments
              const isActive = index === filledSegments && partial > 0
              return (
                <WriteCacheSegment
                  key={index}
                  $filled={isFilled || isActive}
                  $active={isActive || (index === filledSegments && !writeCollectPaused)}
                  title={
                    writeCollectPaused
                      ? 'Collect paused — matching tier claims disks at the source size first'
                      : isFilled
                        ? 'Collected from source disk'
                        : isActive
                          ? 'Collecting from source disk'
                          : 'Waiting for next source disk'
                  }
                />
              )
            })
          ) : (
            <WriteCacheSegment $filled $active style={{ flex: '1 1 100%' }}>
              <WriteCacheFlushFill $fill={writeFlushFill} />
            </WriteCacheSegment>
          )}
        </WriteCacheRow>
      ) : null}

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
                      ? 'Built, waiting to fill from read cache or the size below'
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
