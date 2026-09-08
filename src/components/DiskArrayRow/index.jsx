import {
  formatCacheSize,
  formatDiskSize,
  getDiskReadCacheFlush,
  getDiskReadCacheFlushFill,
  getDiskRedeemTierName,
  getDiskWriteCacheFlushFill,
  getDiskWriteCacheMerge,
  getDiskWriteCacheSegmentFill,
  isDiskPullEligible,
  isDiskReadCacheEligible,
  isDiskReadCacheFlushPaused,
  isDiskStrandedByAdvancedTier,
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

const pullPulse = keyframes`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
`

// A single discrete, all-or-nothing disk container — never partially filled, matching the
// mechanic itself. Flexible width (like CacheBlock below), so the row of DISK_ARRAY_LADDER_CAP
// circles always stretches to fill the full row rather than staying small and centered with
// leftover space around it. Fully round (border-radius: 50%) — deliberately distinct from
// CacheBlock's square, chip-like shape below, so the two rows read apart at a glance (a physical
// disk is round; a cache/memory block is square). Purely a status display — Byte Foundry pulls a
// full, matching, clean-slate disk automatically (see isDiskPullEligible/tickDiskPull in
// engine.js), nothing here is ever clickable. $full takes priority over $empty over the plain
// not-yet-built placeholder. Among full disks: $pullEligible (good/green + pulse — about to be
// auto-pulled this tick) vs merely full-and-waiting (blocked by partial tier progress, "too
// early," or stranded past its tier's current level).
const DiskSquare = styled.div`
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
      ? (props.$pullEligible
        ? props.theme.color.good
        : props.theme.color.surfaceRaised)
      : props.$empty
        ? props.theme.color.surfaceSunken
        : 'transparent'};
  animation: ${props => (props.$pullEligible ? pullPulse : 'none')} 1.4s ease-in-out infinite;
`

// The array's own always-full cache row — DISK_CACHE_BLOCK_COUNT blocks, each worth
// size / DISK_CACHE_BLOCK_COUNT bits (shown in the bit-scale Kb/Mb/… unit via formatCacheSize, not
// formatDiskSize's Byte-scale one — see CLAUDE.md's "Economy model"). Steady state is full; Memory
// refills whole blocks when the size was just unlocked/built, a read-cache flush just drained one,
// or (this size's own tier sitting at level 1) tickDiskLevelOneCachePull just spent some of it —
// a pure status display, never clickable (see "Economy model"'s Disks section — the cache-release-
// to-Bits mechanic this row used to expose was retired in favor of the automatic level-1 pull).
const CacheBlocksRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  width: 100%;
`

const CacheBlock = styled.div`
  flex: 1 1 1.2rem;
  min-width: 0;
  aspect-ratio: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: ${props => props.theme.radius.sm};
  border: 1.5px solid ${props =>
    props.$flushing ? props.theme.color.info : props.theme.color.surfaceSunken};
  background: ${props =>
    props.$full
      ? (props.$flushing ? props.theme.color.info : props.theme.color.surfaceRaised)
      : 'transparent'};
  overflow: hidden;
  position: relative;
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
  /* The single full-width flush bar ($flushBar) spans roughly DISK_ARRAY_LADDER_CAP collecting
     segments' combined width — aspect-ratio: 1 there would square that whole width into a giant
     block instead of a thin bar, so it uses that same ratio instead to land back near one
     segment's own height. */
  aspect-ratio: ${props => (props.$flushBar ? DISK_ARRAY_LADDER_CAP : 1)};
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

// One Disk array's full status detail for a single `size` — used by ByteFoundryPage (every size
// from getDiskSizesToShow, ascending continuous sections) and the thin StoragePage wrapper. See
// CLAUDE.md's "Byte Foundry"/"Economy model" sections. Purely a display: Byte Foundry funds tier
// levels automatically via tickDiskPull/tickDiskLevelOneCachePull (see engine.js) — there is
// nothing here for a player to click. Only this specific size's own array being mid-build (see
// intro.diskBuild) changes what's rendered, swapping the cache strip for a rebuild status line.
const DiskArrayRow = ({ actions: _actions, size, state }) => {
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
  const pullEligible = isDiskPullEligible(state, size)
  const stranded = isDiskStrandedByAdvancedTier(state, size)
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
  // Only the pool's smallest size keeps a read cache at all (see isDiskReadCacheEligible in
  // engine.js) — every larger size fills exclusively via the write-cache ripple below, so there's
  // nothing here to render for it.
  const hasReadCache = isDiskReadCacheEligible(size)

  return (
    <DiskSizeRow>
      {rebuilding ? (
        <RebuildingText>
          {`Rebuilding ${sizeLabel} x ${buildOrdinal} array - Ready in ${rebuildReadySeconds}s`}
        </RebuildingText>
      ) : hasReadCache ? (
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
            return (
              <CacheBlock
                key={index}
                aria-label={
                  readFlushing
                    ? `${sizeLabel} cache block ${index + 1} flushing to disk`
                    : `${sizeLabel} cache block ${index + 1}`
                }
                title={
                  readFlushing
                    ? (readFlushPaused
                      ? 'Flush paused — matching tier claims this size first'
                      : `Flushing read cache to disk (${Math.ceil(readFlush.remainingSeconds)}s)`)
                    : isFull
                      ? `${blockLabel} banked toward ${redeemTierName ?? 'the matching tier'}`
                      : 'Filling from Memory'
                }
                $full={isFull}
                $flushing={readFlushing && (isFull || partialFill > 0)}
              >
                {readFlushing && partialFill > 0 ? (
                  <CacheFlushFill $fill={partialFill} />
                ) : null}
                <CellLabel $emphasis={isFull || readFlushing}>{blockLabel}</CellLabel>
              </CacheBlock>
            )
          })}
        </CacheBlocksRow>
      ) : null}

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
            <WriteCacheSegment $filled $active $flushBar style={{ flex: '1 1 100%' }}>
              <WriteCacheFlushFill $fill={writeFlushFill} />
            </WriteCacheSegment>
          )}
        </WriteCacheRow>
      ) : null}

      <SquaresRow role="group" aria-label={`${sizeLabel} disks`}>
        {Array.from({ length: DISK_ARRAY_LADDER_CAP }, (_, index) => {
          const isFull = index < full
          const isEmpty = !isFull && index < full + emptyCount
          return (
            <DiskSquare
              key={index}
              aria-label={
                isFull
                  ? (pullEligible
                    ? `${sizeLabel} disk pulling into ${redeemTierName}`
                    : `full ${sizeLabel} disk`)
                  : isEmpty
                    ? `empty ${sizeLabel} disk`
                    : `not yet built ${sizeLabel} disk`
              }
              title={
                rebuilding
                  ? 'This array is offline while it rebuilds'
                  : isFull
                    ? (pullEligible
                      ? `Pulling into 1 free ${redeemTierName} — empties it, ready to fill again${hasReadCache ? ' from Memory' : ' from the size below'}`
                      : stranded
                        ? `${redeemTierName ?? 'Its matching tier'} has already moved past this size — can't fund that tier again until the next Prestige, but may still feed the write cache into the next size up`
                        : redeemable
                          ? 'Waiting its turn — the matching tier already has progress toward this level'
                          : `Pulls automatically once ${sizeLabel}'s own fixed corresponding tier reaches its matching level`)
                    : isEmpty
                      ? (hasReadCache ? 'Built, waiting to fill from read cache' : 'Built, waiting to fill from the size below')
                      : 'Not yet built'
              }
              $full={isFull}
              $empty={isEmpty}
              $pullEligible={isFull && pullEligible}
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
