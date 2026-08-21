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

// One size's own cache-blocks-plus-disk-squares detail: a clear array-size header (Byte-scale),
// then a Cache row and a Disks row of the same size — Cache first, Disks right after
// (smallest→largest across sizes is the caller's job). A fixed DISK_ARRAY_LADDER_CAP-long strip
// reads as one progress bar: FULL (leftmost, clickable once redeemable), then built-but-EMPTY,
// then not-yet-built placeholders. Built/full counts stay visual-only (the squares already show
// them) — captions carry size identity, not status tallies. Shapes differ on purpose (round disks
// vs. square cache blocks) so the two rows read apart at a glance.
const DiskSizeRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${props => props.theme.space.xs};
  width: 100%;
`

// Array identity — the Disk face value in Byte-scale (KB/MB/…). One prominent size for the whole
// Cache+Disks pair. No text-transform: uppercase — would collapse Cache's lowercase "b" (bits) if
// it ever appeared here, and would shout the size harder than the rest of Foundry's labels.
const ArraySize = styled.span`
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.md.size};
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${props => props.theme.color.text};
  font-variant-numeric: tabular-nums;
`

// Sub-row caption: short name ("Cache" / "Disks"); Cache also shows bit-scale block size on the
// right (not readable from the squares alone). Built/full tallies and instructions live in the
// strip / title / aria / ActionHint — not crammed into this line.
const RowHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

const RowName = styled.span`
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
`

const RowMeta = styled.span`
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  opacity: 0.85;
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
      <ArraySize>{sizeLabel}</ArraySize>

      {rebuilding ? (
        <RebuildingText>
          {`Array rebuilding — ${Math.ceil(intro.diskBuild.remainingSeconds)}s left (every disk in this array is offline until it finishes)`}
        </RebuildingText>
      ) : (
        <>
          <RowHeader>
            <RowName>Cache</RowName>
            <RowMeta>{`${blockLabel} each`}</RowMeta>
          </RowHeader>
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
                />
              )
            })}
          </CacheBlocksRow>
        </>
      )}

      <RowHeader>
        <RowName>Disks</RowName>
      </RowHeader>

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
