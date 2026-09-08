import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import DiskArrayRow from 'components/DiskArrayRow'
import DataLakePanel from 'components/DataLakePanel'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatBitsInNearestUnit, formatDiskSize, formatDiskSizeStable, formatMemoryAmount, formatMemoryAmountStable, getComputeBandwidthSacrificeField, getComputeBandwidthSacrificeLabel, getDataLakeOverflowRatePercent, getDataStreamBaseMultiplierPercent, getDataStreamMultiplierPercent, getDiskCost, getDiskProvisionPassesCollected, getDiskProvisionPassesRequired, getDiskRedeemTierName, getDiskSize, getDiskSizesToShow, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getMemoryUnit, getPoolBaseMultiplierPercent, getPoolBufferBits, getPoolBufferCapacity, getPoolIndexForDiskSize, getPoolMultiplierPercent, getStoragePoolBandwidth, getStoragePoolCount, getVisibleStoragePoolCount, isBandwidthAvailable, isBandwidthTurnAvailable, isComputeFundedBandwidthAvailable, isDataLakePoolReady, isDiskLadderExhaustedForActivePools, isMemoryCapacityUpgradeAvailable, isProvisionDiskTurnAvailable, isStorageUnlocked } from 'game/engine'
import { COMPUTE_ENTITY_CAP, FILL_MULTIPLIER_TAP_CAP_PERCENT, INTRO_BYTE_COMBINE_COST, TIER_DEFINITIONS } from 'game/layers'
import { useEffect, useState } from 'react'
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
`

// Page title only — top-level navigation lives in App.jsx's shared AppNav once the main game is
// unlocked (and there is deliberately no exit during the mandatory gate).
const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`

// The section's own current balance — bigger font, centered (see "Put title on top left, current
// disks status on the top right, the balance in a bigger centered font below that, a center-grow
// multiplier bar (with its own percent readout below it) below the balance, then Speed/Bandwidth
// and Capacity split across the bottom row's two halves" in CLAUDE.md's UI conventions) — sized a
// step above the rest of the tile's text but below the page's own H1 so a stack of several pool
// cards doesn't read as several competing headlines.
const BalanceText = styled.p`
  margin: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  font-weight: 700;
  text-align: center;
`

// Tapping stays a fully live action forever (never freezes, never goes read-only — see
// "Byte Foundry" in CLAUDE.md); while the Byte generator exists but the main game isn't unlocked
// yet, it's a secondary/backup action behind passive production, which is why it renders last on
// the page instead of up top — while staying just as clickable (same disabled={isFull} gating
// either way) and always full width, the same width every other action button on this page uses.
// No progress fill here — Memory's own tile already shows the same bits/capacity fill, so a
// duplicate meter on the tap button itself would be redundant. Once intro.mainGameUnlocked, this
// button is removed entirely — Memory's own tile (FillableStatCard below) becomes the tap target
// instead, calling the identical actions.tapIntroBit.
const TapArea = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 2;
  border: 1.5px solid ${props => props.theme.color.accent};
  border-radius: ${props => props.theme.radius.lg};
  background: ${props => props.theme.color.surfaceSunken};
  color: ${props => (props.disabled ? props.theme.color.disabled : props.theme.color.accent)};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
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

// Speed ×2 is the recurring rate milestone — placing it in MilestonesRow keeps the same flex
// layout the old Sacrifice+Invest pair used. `min-width: 0` lets each button's own label
// ellipsis-truncate (see ButtonLabel in components/Button) instead of forcing the row wider than
// its container at narrow viewports.
const MilestonesRow = styled.div`
  display: flex;
  gap: ${props => props.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`

// Speed ×2's two-line content: the symbol/label/multiplier on top, its cost — what it actually
// spends — on its own line below, in smaller/muted text, rather than crammed
// inline in parentheses. A plain column flex wrapper (not components/Button's own `ButtonContent`,
// which only ever lays out a single icon+label row) so `Button`'s own `display: flex; align-items:
// center; justify-content: center` still centers this whole block as one flex child.
const MilestoneButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
`

const MilestoneCostLine = styled.span`
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.85;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// Data Stream has one shared control surface; each unlocked storage pool gets its own compact
// derived Bandwidth/Capacity card with its three disk-array rows below it.
const PoolCard = styled(StatCard)`
  width: 100%;
  gap: ${props => props.theme.space.sm};
`

const DataStreamCard = styled(StatCard)`
  width: 100%;
  gap: ${props => props.theme.space.md};
`

// Expand/collapse a pool card. Title/bar/Bandwidth now render INSIDE the pool's own tappable
// Memory buffer button (see FillableStatCard below) rather than a separate header button above
// it — a <button> can't nest inside another <button>, so this is a plain sibling: a slim,
// full-width strip right below the merged button, just a centered chevron, rather than a second
// full header row.
const ExpandToggleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: ${props => props.theme.color.textMuted};
  font-size: 0.75em;
  line-height: 1;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: ${props => props.theme.radius.sm};

  &:hover {
    background: ${props => props.theme.color.surfaceSunken};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: -2px;
  }
`

// Shared top row for both the Data Stream card and every pool's own summary: title top-left,
// that section's own current disks status top-right (see MultiplierBar below for what replaced
// the old middle gauge column, and getFullDisksCount for the count itself) — a plain flex row
// (not a grid) since there's no longer a middle column to keep centered between the two ends. The
// balance, multiplier bar, and Speed/Bandwidth + Capacity figures all render as their own rows
// below this one, in the tile beneath it — see docs/DESIGN_HISTORY.md for the corner-speedometer →
// center-grow-bar redesign this replaced.
const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

const SectionTitle = styled.h3`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.space.xs};
  margin: 0;
  min-width: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.md.size};
  line-height: ${props => props.theme.type.scale.md.lineHeight};
  font-weight: 700;
  color: ${props => props.theme.color.text};
`

const PoolTitleSymbol = styled.span`
  flex-shrink: 0;
`

const DiskStatusText = styled.span`
  flex-shrink: 0;
  color: ${props => props.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`

// Speed/Bandwidth (left half) and Capacity (right half) sit below the balance, each centered
// within its own half of the tile — a 2-column grid rather than flex so the halves stay exactly
// even regardless of either figure's own text length.
const FooterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`

const FooterText = styled.span`
  justify-self: center;
  color: ${props => props.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`

// Reuses Button's own progressFill gradient (see components/Button) so Memory's tile fills toward
// its capacity the same visual way every actionable control on this page already does, rather
// than introducing a second, differently-styled meter convention. Deliberately a plain div, not
// `styled(StatCard)` — it renders inside DataStreamCard, which supplies the outer border/shadow/
// background.
// Once intro.mainGameUnlocked, the Data Stream's own tile renders as a real <button> (via the `as`
// prop below) instead of a plain <section> — Memory itself becomes the tap target, replacing the
// standalone TapArea button below (which only renders pre-unlock). `$tappable` adds the same
// hover/active/disabled affordance TapArea itself already has, scoped to this prop so the
// pre-unlock (non-interactive) rendering keeps its plain, unclickable look. Each pool's own local
// Memory buffer block reuses this SAME component, always rendered as a real <button>
// (tapPoolBuffer in game/engine) — tapping either boosts that specific Data Stream/pool's own
// fill-based multiplier bonus (see FILL_MULTIPLIER_* in game/layers), it never credits bits
// directly. Everything for that section lives inside this one tile — TitleRow (title/disks status),
// the big centered BalanceText, the MultiplierBar (with its own percent readout below it), and the
// FooterRow (Speed/Bandwidth left half, Capacity right half) — see CLAUDE.md's UI conventions.
const FillableStatCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  ${progressFill}

  ${props => props.$tappable && `
    cursor: pointer;
    transition: filter 0.15s ease, transform 0.05s ease;

    &:hover:not(:disabled) {
      filter: brightness(1.2);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid ${props.theme.color.accent};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
    }
  `}
`

// The balance (BalanceText) and Capacity (FooterText) figures share ONE unit — capacity's own (see
// getMemoryUnit in game/engine) — UNLESS that would put the balance below 1 (e.g. "0.234 MiB"
// alongside a "1 MiB" capacity) — in that case the balance self-sizes into its own finer unit
// instead (e.g. "30.031 KiB" alongside "1 MiB"), which still reads as a real magnitude rather than
// falling all the way back to a raw bit count. Only a genuinely sub-Byte balance (no named unit
// finer than a Byte exists) still falls back to raw bits, via formatMemoryAmount's own bottom-rung
// handling — see docs/DESIGN_HISTORY.md.
const formatMemoryBalanceValue = (bits, capacityBits, byteCreated) => {
  const capacityUnit = getMemoryUnit(capacityBits, byteCreated)
  const balanceUnit = capacityUnit && bits > 0 && bits < capacityUnit.divisor
    ? getMemoryUnit(bits, byteCreated)
    : capacityUnit
  return formatMemoryAmountStable(bits, balanceUnit)
}

const formatMemoryCapacityValue = (capacityBits, byteCreated) =>
  formatMemoryAmount(capacityBits, getMemoryUnit(capacityBits, byteCreated))

// Top-right "current disks status" figure (see TitleRow above) — a rough at-a-glance count of full
// disks across every size this section covers (the whole Foundry for the Data Stream card, just
// this one pool's own sizes for a pool card), visible without expanding that pool's disclosure.
const getFullDisksCount = (state, sizes) =>
  sizes.reduce((total, size) => total + (state.intro.disks?.[size] ?? 0), 0)

const clampPercent = value => Math.min(100, Math.max(0, value))

// Fill-based Speed/Bandwidth multiplier bar (see FILL_MULTIPLIER_* in game/layers and
// getDataStreamMultiplierPercent/getPoolMultiplierPercent in game/engine) — a compact, full-width
// bar that grows and shrinks from the MIDDLE, replacing the earlier corner needle-speedometer (too
// tall for how little it showed — see docs/DESIGN_HISTORY.md for the swap). The bar is centered in
// its track: FILL_MULTIPLIER_TAP_CAP_PERCENT (200%) fills the FULL track width, 0% is a zero-width
// point at dead center. In its default `mode="multiplier"`, two layers share that same center
// point: an OUTER layer (accent color) sized to the TOTAL (fill + tap bonus) reading, and a
// narrower INNER layer (warn color) sized to just the tap-bonus portion (total − base) nested
// inside it. A live tap bonus therefore reads as a highlighted band right in the bar's own middle,
// pushing the outer (base) edges outward on both sides as it grows and pulling them back toward
// that same center point as the bonus decays.
//
// For a POOL specifically, once its own Memory buffer is completely full, the SAME bar switches to
// `mode="lake"` and represents a different quantity entirely: that pool's own Data Lake overflow
// rate (DATA_LAKE_OVERFLOW_MAX_PERCENT at an empty currently-filling disk, down toward
// DATA_LAKE_OVERFLOW_MIN_PERCENT as it nears completion — see getDataLakeOverflowRatePercent in
// game/engine, NOT the lake's overall total), drawn as a single `theme.color.info` layer on the
// SAME 0..FILL_MULTIPLIER_TAP_CAP_PERCENT scale the multiplier reading already uses — not a
// separately-scaled bar. This is what makes the transition between the two readings clean rather
// than a jump: FILL_MULTIPLIER_MIN_PERCENT (the fill-based multiplier's own floor, reached exactly
// when the buffer is full) and DATA_LAKE_OVERFLOW_MAX_PERCENT (the lake reading's own ceiling, at
// its highest right as the buffer transitions to full and overflow starts) are numerically the same
// value (50) by design, so the bar's width doesn't jump when its meaning switches — it's already
// sitting exactly where the lake reading picks up. Whichever quantity is live, the actual
// accumulation into the lake itself (fed by that overflow) has its own separate bar — see
// FillableStatCard usage below with the 🌊 lake label — this bar only ever shows a RATE, never a
// level. The Data Stream card has no lake of its own, so it always renders in `mode="multiplier"`.
// Keeps the exact same role="progressbar"/aria-label/aria-valuenow/min/max contract as the old
// gauge (always 0..FILL_MULTIPLIER_TAP_CAP_PERCENT regardless of mode) — existing tests asserting
// on it are unaffected by the visual swap.
const BAR_HEIGHT = 8

const clampBarValue = value => Math.min(FILL_MULTIPLIER_TAP_CAP_PERCENT, Math.max(0, value))

// 0% -> 0 width (a point at the track's own center), FILL_MULTIPLIER_TAP_CAP_PERCENT -> full width.
const percentToBarWidthPercent = percent => (clampBarValue(percent) / FILL_MULTIPLIER_TAP_CAP_PERCENT) * 100

const BarRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 100%;
`

const BarTrack = styled.div`
  position: relative;
  width: 100%;
  height: ${BAR_HEIGHT}px;
  border-radius: ${props => props.theme.radius.pill};
  background: ${props => props.theme.color.surfaceSunken};
  overflow: hidden;
`

// Centered via left: 50% + translateX(-50%) — the growth anchor that makes the bar expand and
// contract from the middle rather than from either edge, the way an ordinary progress bar would.
const BarFillBase = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${props => props.$widthPercent}%;
  border-radius: inherit;
  background: ${props => props.theme.color.accent};
`

const BarFillBonus = styled(BarFillBase)`
  background: ${props => props.theme.color.warn};
`

const BarFillLake = styled(BarFillBase)`
  background: ${props => props.theme.color.info};
`

const BarPercentLabel = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.65rem;
  font-variant-numeric: tabular-nums;
`

// `mode="lake"` renders a single info-colored layer (see the doc comment above) instead of the
// default accent/warn base+bonus split — there is no "bonus" concept for a lake overflow reading.
const MultiplierBar = ({ basePercent, totalPercent, ariaLabel, mode = 'multiplier' }) => {
  const isLakeMode = mode === 'lake'
  const clampedBase = clampBarValue(isLakeMode ? 0 : basePercent)
  const clampedTotal = clampBarValue(totalPercent)
  const totalWidthPercent = percentToBarWidthPercent(clampedTotal)
  const bonusWidthPercent = percentToBarWidthPercent(Math.max(0, clampedTotal - clampedBase))
  const hasBonus = !isLakeMode && clampedTotal > clampedBase

  return (
    <BarRow>
      <BarTrack
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={Math.round(clampedTotal)}
        aria-valuemin={0}
        aria-valuemax={FILL_MULTIPLIER_TAP_CAP_PERCENT}
      >
        {isLakeMode
          ? totalWidthPercent > 0 && <BarFillLake $widthPercent={totalWidthPercent} />
          : (
            <>
              {totalWidthPercent > 0 && <BarFillBase $widthPercent={totalWidthPercent} />}
              {hasBonus && <BarFillBonus $widthPercent={bonusWidthPercent} />}
            </>
          )}
      </BarTrack>
      <BarPercentLabel>{Math.round(clampedTotal)}%</BarPercentLabel>
    </BarRow>
  )
}

// Before intro.mainGameUnlocked this page is a mandatory gate with no way out via Tiers (AppNav
// still shows Guide/More). Once unlocked, AppNav's Foundry item reopens it at any time — nothing
// here is read-only. Data Stream + per-pool Memory/Storage are continuous sections on this one
// screen (no second-level tabs). Forced priority: Disk Fill > Speed > Provision Disk > Compute.
// focusNonce is accepted for App.jsx parity with MainPage; Foundry no longer has a tab to reset.
const ByteFoundryPage = ({ game, focusNonce: _focusNonce = 0 }) => {
  const { actions, dismissOfflineProgress, offlineProgress, state } = game
  const { intro } = state

  const isFull = intro.bits >= intro.capacity
  const canCombine = !intro.byteCreated && intro.bits >= INTRO_BYTE_COMBINE_COST
  const storageRevealed = isStorageUnlocked(state)
  const visiblePoolCount = getVisibleStoragePoolCount(state)
  // Null follows the largest unlocked pool by default; 0 is an explicit "all collapsed" choice.
  const [expandedPoolIndex, setExpandedPoolIndex] = useState(null)
  useEffect(() => {
    setExpandedPoolIndex(null)
  }, [visiblePoolCount])
  const visibleExpandedPool = expandedPoolIndex === 0 ? null : expandedPoolIndex ?? visiblePoolCount
  const productionRate = getIntroProductionRate(intro)
  // Bottom-left-half figure (see "Speed/Bandwidth at bottom centre of left half" in CLAUDE.md) —
  // plain text, same convention a pool's own Bandwidth figure uses in its own footer row. Reuses
  // formatBitsInNearestUnit (the same binary B/KiB/MiB/… ladder the balance line above it already
  // renders in) rather than a bespoke bit-vs-Byte branch, so a large rate reads as "2 KiB/s" instead
  // of an unscaled "2048 B/s" — consistent short "B"/"KiB" unit symbols throughout, matching the
  // pool's own Bandwidth figure's "/s" convention (see FooterText usage below) rather than the
  // longer "bytes/sec" this used to spell out.
  const dataStreamRateText = !intro.byteCreated
    ? null
    : `${formatBitsInNearestUnit(productionRate)}/s`
  // Fill-based multiplier (see FILL_MULTIPLIER_* in game/layers.js): productionRate above stays
  // exactly what applies at 100% of this — the real per-tick delivery scales by this percent
  // instead (see getDataStreamEffectMultiplier in game/engine).
  const dataStreamMultiplierPercent = getDataStreamMultiplierPercent(intro)
  const dataStreamBaseMultiplierPercent = getDataStreamBaseMultiplierPercent(intro)
  // Matches tapIntroBit's own post-reveal no-op guard (engine.js) — only relevant once Storage
  // pools are revealed (visiblePoolCount >= 1), the same condition that switches the tap itself
  // from a direct bit credit into a multiplier-bonus tap.
  const dataStreamMultiplierCapped = visiblePoolCount >= 1 && dataStreamMultiplierPercent >= FILL_MULTIPLIER_TAP_CAP_PERCENT
  // Every size ever reached (plus the ladder's current offer) — continuous Storage section on
  // this same screen, ascending via getDiskSizesToShow.
  const diskSizesToShow = storageRevealed ? getDiskSizesToShow(state) : []
  // Top-right of the Data Stream card (see TitleRow) — the whole Foundry's own full-disk count,
  // across every size shown anywhere on the page.
  const dataStreamDisksCount = getFullDisksCount(state, diskSizesToShow)

  const investCost = getIntroProductionMilestoneCost(intro.productionMilestoneTier)
  const computeBandwidthLabel = getComputeBandwidthSacrificeLabel(state)
  const computeFundedInvest = isComputeFundedBandwidthAvailable(state)
  const investCostDisplay = computeFundedInvest
    ? `${COMPUTE_ENTITY_CAP} ${computeBandwidthLabel}`
    : formatBitsInNearestUnit(investCost)
  const investMaxClaims = getIntroProductionMilestoneMaxClaims(intro.productionMilestoneTier)
  const investClaimsUsedUp = intro.productionMilestoneTierClaims >= investMaxClaims
  // Ranked below Disk Fill in the forced priority order — see isBandwidthTurnAvailable.
  const canInvest = isBandwidthTurnAvailable(state)
  const investBlockedByPriority = isBandwidthAvailable(state) && !canInvest

  // Starting the next disk's build stays on this page (the Byte Foundry's own core loop). Ranked
  // third in the forced priority order — see isProvisionDiskTurnAvailable. Every shown size's
  // DiskArrayRow (Cache then Disks per size, ascending) renders below as continuous sections.
  const diskSize = getDiskSize(state)
  const diskCost = getDiskCost(state, diskSize)
  const diskPassesRequired = getDiskProvisionPassesRequired(state, diskSize)
  const diskPoolIndex = getPoolIndexForDiskSize(diskSize)
  const diskPoolBufferBits = getPoolBufferBits(state, diskPoolIndex)
  const diskLadderExhausted = isDiskLadderExhaustedForActivePools(state)
  const canStartDiskBuild = isProvisionDiskTurnAvailable(state)
  const diskBuildInProgress = intro.diskBuild
  // The build cost is paid in diskPassesRequired passes of the disk's own face-value size each (N
  // for the array's Nth disk, capped at DISK_BUILD_COST_MULTIPLIER — see provisionDisk/
  // getDiskProvisionPassesRequired in game/engine) — "blocked by priority" now only needs a single
  // pass's worth in the buffer, not the whole cost, to be a real (if lower-priority) option.
  const diskBuildBlockedByPriority = !diskLadderExhausted && diskPoolBufferBits >= diskSize && !canStartDiskBuild && !diskBuildInProgress
  // Clamped at diskPassesRequired: a save carrying a diskProvisionPasses value banked under an
  // earlier flat-multiplier version of this ladder (now exceeding a smaller ordinal's own
  // requirement) would otherwise display a nonsensical "N/M" with N > M until the engine's own
  // provisionDisk clamp self-heals it on the next call — this only affects what's SHOWN, not the
  // stored value or the engine's own funding math (see getDiskProvisionPassesRequired in
  // game/engine).
  const diskPassesCollected = Math.min(diskPassesRequired, getDiskProvisionPassesCollected(state, diskSize))
  const diskFundingInProgress = diskPassesCollected > 0 && !diskBuildInProgress
  const diskBuildProgress = diskBuildInProgress
    ? clampPercent(100 - (diskBuildInProgress.remainingSeconds / diskBuildInProgress.totalSeconds) * 100)
    : diskLadderExhausted
      ? 100
      // Already-collected passes are permanent progress; whatever's currently sitting in the
      // buffer (up to one more pass' worth) counts toward the next one, so the bar keeps moving
      // smoothly between clicks rather than jumping only once a whole pass fires.
      : clampPercent(((diskPassesCollected * diskSize + Math.min(diskPoolBufferBits, diskSize)) / diskCost) * 100)
  const diskRedeemTierName = getDiskRedeemTierName(state, diskSize)
  const capacityUpgradeAvailable = isMemoryCapacityUpgradeAvailable(state)
  const capacityUpgradeCost = intro.capacity

  const combineProgress = clampPercent((intro.bits / INTRO_BYTE_COMBINE_COST) * 100)
  const fullProgress = clampPercent((intro.bits / intro.capacity) * 100)
  const computeBandwidthField = getComputeBandwidthSacrificeField(state)
  const investProgress = computeFundedInvest && computeBandwidthField
    ? clampPercent(((intro[computeBandwidthField] ?? 0) / COMPUTE_ENTITY_CAP) * 100)
    : clampPercent((intro.bits / investCost) * 100)

  // The shared Provision Disk control (one ladder spanning every pool, not per-pool) — rendered
  // inside whichever pool card diskPoolIndex currently belongs to, with a fallback slot right
  // after the Data Stream card for the rare case that pool's own card isn't visible yet (its
  // capacity-unlock threshold not yet reached, even though the disk ladder itself — purely
  // disk-build-driven, independent of capacity — has already moved past it).
  const provisionDiskButton = (
    <Button
      aria-label={diskBuildInProgress ? 'disk array rebuilding' : diskLadderExhausted ? 'disk ladder complete' : 'provision disk'}
      disabled={!canStartDiskBuild || !!diskBuildInProgress}
      onClick={actions.provisionDisk}
      title={
        diskBuildInProgress
          ? `Provisioning ${formatDiskSize(diskBuildInProgress.size)} — ${Math.ceil(diskBuildInProgress.remainingSeconds)}s (array offline)`
          : diskLadderExhausted
            ? `All ${getStoragePoolCount()} storage pools are complete through ${formatDiskSize(diskSize)}`
            : diskBuildBlockedByPriority
              ? 'Take Speed (or redeem a full Disk) first'
              : diskRedeemTierName
                ? `Costs ${formatDiskSize(diskCost)}, paid in ${diskPassesRequired} pass${diskPassesRequired === 1 ? '' : 'es'} of ${formatDiskSize(diskSize)} each (${diskPassesCollected}/${diskPassesRequired} collected) — creates an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, redeemable right away for a free ${diskRedeemTierName} once full`
                : `Costs ${formatDiskSize(diskCost)}, paid in ${diskPassesRequired} pass${diskPassesRequired === 1 ? '' : 'es'} of ${formatDiskSize(diskSize)} each (${diskPassesCollected}/${diskPassesRequired} collected) — creates an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, but it won't be redeemable until its own fixed corresponding tier reaches its matching level`
      }
      type="button"
      variant={canStartDiskBuild ? 'info' : 'neutral'}
      $progress={diskBuildProgress}
    >
      <ButtonContent>
        {diskBuildInProgress
          ? `🏦 Provisioning ${formatDiskSize(diskBuildInProgress.size)} Disk — ${Math.ceil(diskBuildInProgress.remainingSeconds)}s`
          : diskLadderExhausted
            ? `🏦 All Pools Complete (${formatDiskSize(diskSize)})`
            : diskFundingInProgress
              ? `🏦 Provision ${formatDiskSize(diskSize)} Disk — ${diskPassesCollected}/${diskPassesRequired}`
              : diskPassesRequired > 1
                ? `🏦 Provision ${formatDiskSize(diskSize)} Disk — 0/${diskPassesRequired} (${formatDiskSize(diskCost)})`
                : `🏦 Provision ${formatDiskSize(diskSize)} Disk (${formatDiskSize(diskCost)})`}
      </ButtonContent>
      <VisuallyHidden
        role="progressbar"
        aria-label="byte foundry disk build progress"
        aria-valuenow={Math.round(diskBuildProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </Button>
  )

  return (
    <RootDiv>
      <OfflineProgressNotice offlineProgress={offlineProgress} dismissOfflineProgress={dismissOfflineProgress} />
      <Header>
        <Title>🔥 Byte Foundry</Title>
      </Header>

      <DataStreamCard aria-label="Data Stream">
        <FillableStatCard
          as={intro.mainGameUnlocked ? 'button' : 'section'}
          type={intro.mainGameUnlocked ? 'button' : undefined}
          onClick={intro.mainGameUnlocked ? actions.tapIntroBit : undefined}
          disabled={intro.mainGameUnlocked ? isFull || dataStreamMultiplierCapped : undefined}
          aria-label={intro.mainGameUnlocked ? 'tap to generate a bit' : 'data stream balance'}
          title={intro.mainGameUnlocked && !isFull && dataStreamMultiplierCapped ? `Multiplier already at the ${FILL_MULTIPLIER_TAP_CAP_PERCENT}% cap` : undefined}
          $progress={fullProgress}
          $tappable={intro.mainGameUnlocked}
        >
          <TitleRow>
            <SectionTitle>Data Stream</SectionTitle>
            {storageRevealed && (
              <DiskStatusText aria-label={`${dataStreamDisksCount} full disks`}>
                💾 {dataStreamDisksCount}
              </DiskStatusText>
            )}
          </TitleRow>
          <BalanceText>{formatMemoryBalanceValue(intro.bits, intro.capacity, intro.byteCreated)}</BalanceText>
          {intro.byteCreated && (
            <MultiplierBar
              basePercent={dataStreamBaseMultiplierPercent}
              totalPercent={dataStreamMultiplierPercent}
              ariaLabel="data stream fill-based speed multiplier"
            />
          )}
          <FooterRow>
            <FooterText>{dataStreamRateText && `⚡ ${dataStreamRateText}`}</FooterText>
            <FooterText>🪣 {formatMemoryCapacityValue(intro.capacity, intro.byteCreated)}</FooterText>
          </FooterRow>
          <VisuallyHidden
            role="progressbar"
            aria-label="data stream bit balance"
            aria-valuenow={intro.bits}
            aria-valuemin={0}
            aria-valuemax={intro.capacity}
          />
        </FillableStatCard>

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

          {intro.byteCreated && (
            <MilestonesRow>
              <Button
                aria-label={
                  computeFundedInvest
                    ? `sacrifice ${COMPUTE_ENTITY_CAP} ${computeBandwidthLabel} for double production`
                    : 'invest bits for double production'
                }
                disabled={!canInvest}
                onClick={actions.pickIntroProductionMilestone}
                title={
                  investClaimsUsedUp
                    ? 'Already claimed at this tier'
                    : investBlockedByPriority
                      ? 'Redeem a full Disk first'
                      : computeFundedInvest
                        ? `Bit cost exceeds Buffer — sacrifice ${COMPUTE_ENTITY_CAP} ${computeBandwidthLabel} for ×2 Speed`
                        : 'Doubles pool Memory Speed'
                }
                type="button"
                variant={canInvest ? 'info' : 'neutral'}
                $progress={investProgress}
              >
                <MilestoneButtonContent>
                  <span>⚡ Speed ×2</span>
                  <MilestoneCostLine>{investCostDisplay}</MilestoneCostLine>
                </MilestoneButtonContent>
                <VisuallyHidden
                  role="progressbar"
                  aria-label="byte foundry speed progress"
                  aria-valuenow={
                    computeFundedInvest && computeBandwidthField
                      ? (intro[computeBandwidthField] ?? 0)
                      : intro.bits
                  }
                  aria-valuemin={0}
                  aria-valuemax={computeFundedInvest ? COMPUTE_ENTITY_CAP : investCost}
                />
              </Button>
              <Button
                aria-label="double Memory Capacity"
                disabled={!capacityUpgradeAvailable}
                onClick={actions.pickIntroCapacityMilestone}
                title={
                  capacityUpgradeAvailable
                    ? 'The Data Stream Buffer is full; drain it to double Capacity'
                    : intro.bits < intro.capacity
                      ? 'Fill the Data Stream Buffer completely before doubling Capacity'
                      : 'Resolve higher-priority actions before doubling Capacity'
                }
                type="button"
                variant={capacityUpgradeAvailable ? 'prestige' : 'neutral'}
              >
                <MilestoneButtonContent>
                  <span>🪣 Capacity ×2</span>
                  <MilestoneCostLine>{formatBitsInNearestUnit(capacityUpgradeCost)}</MilestoneCostLine>
                </MilestoneButtonContent>
              </Button>
            </MilestonesRow>
          )}

        </ActionsRow>
      </DataStreamCard>

      {/* Fallback for when the disk ladder has already advanced past the last VISIBLE pool card
          (its own capacity-unlock threshold not yet reached) — keeps the button reachable rather
          than disappearing until that pool's card catches up. */}
      {storageRevealed && diskPoolIndex > visiblePoolCount && provisionDiskButton}

      {storageRevealed && Array.from({ length: visiblePoolCount }, (_, offset) => {
        const poolIndex = offset + 1
        const poolBandwidth = getStoragePoolBandwidth(state, poolIndex)
        const poolBufferBits = getPoolBufferBits(state, poolIndex)
        const poolBufferCapacity = getPoolBufferCapacity(state, poolIndex)
        const poolBufferPercent = poolBufferCapacity > 0 ? clampPercent((poolBufferBits / poolBufferCapacity) * 100) : 0
        const poolBufferFull = poolBufferBits >= poolBufferCapacity
        // Fill-based multiplier (see FILL_MULTIPLIER_* in game/layers.js): poolBandwidth above
        // stays exactly what applies at 100% of this — the real per-tick buffer fill scales by
        // this percent instead (see getPoolEffectMultiplier in game/engine).
        const poolMultiplierPercent = getPoolMultiplierPercent(state, poolIndex)
        const poolBaseMultiplierPercent = getPoolBaseMultiplierPercent(state, poolIndex)
        // Matches tapPoolBuffer's own no-op guards (engine.js) — the button must be disabled for
        // both, not just a full buffer, or a capped tap silently does nothing with no feedback.
        const poolMultiplierCapped = poolMultiplierPercent >= FILL_MULTIPLIER_TAP_CAP_PERCENT
        // This pool's own Data Lake overflow rate — feeds the MultiplierBar's `mode="lake"` reading
        // above (once poolBufferFull). The lake's own current-disk-fill LEVEL renders inside
        // DataLakePanel itself (the "data lake area," see LakePoolTile in components/DataLakePanel)
        // once the pool card is expanded, not as a second standalone bar here.
        const lakeRatePercent = getDataLakeOverflowRatePercent(state, poolIndex)
        // Same isDataLakePoolReady this pool's own DataLakePanel/LakePoolTile already keys its
        // "Locked" placeholder on (see components/DataLakePanel) — required here too, not just
        // poolBufferFull: tickPoolBufferFill's overflow branch (engine.js) won't credit this lake
        // at all until a real Storage disk has been built for it, so a pool whose buffer fills
        // before that (the common, non-legacy case — pool 1 in particular, visible from the very
        // start) would otherwise switch the bar to "lake" mode and show a constant nonzero
        // "incoming rate" that can never actually turn into real progress — the exact
        // stalled-tile-shown-as-active misrepresentation Devin Review flagged for LakePoolTile,
        // just on this page's own bar instead.
        const poolReady = isDataLakePoolReady(state, poolIndex)
        const showLakeMode = poolBufferFull && poolReady
        const poolSizes = diskSizesToShow.filter(size => getPoolIndexForDiskSize(size) === poolIndex)
        // Top-right of this pool's own tile (see TitleRow) — this pool's own full-disk count only.
        const poolDisksCount = getFullDisksCount(state, poolSizes)
        const isExpanded = visibleExpandedPool === poolIndex
        // The shared Provision Disk control always targets whichever size the disk ladder
        // currently offers (getDiskSize) — a single ladder spanning every pool, not a per-pool
        // one — so it renders inside whichever ONE pool card that size currently belongs to,
        // outside the isExpanded disclosure so it stays visible/usable without expanding. See the
        // fallback render below the loop for when that pool's own CARD isn't visible yet (its
        // capacity-unlock threshold not yet reached, even though the disk ladder — a purely
        // disk-build-driven progression, independent of capacity — has already moved past it).
        const isActiveDiskPool = diskPoolIndex === poolIndex
        return (
          <PoolCard key={poolIndex} aria-label={`pool ${poolIndex}`}>
            {/* Title/disks-status/bar/Bandwidth render INSIDE this same tappable button now (not a
                separate header button above it — two buttons can't nest), so one tap both boosts
                this pool's own multiplier bonus (tapPoolBuffer/FILL_MULTIPLIER_* in game/engine and
                game/layers) and shows the full summary in one control. Expand/collapse moves to
                the slim ExpandToggleButton strip below. Same FillableStatCard component Data
                Stream's own tap tile uses — see FillableStatCard above. */}
            <FillableStatCard
              as="button"
              type="button"
              onClick={() => actions.tapPoolBuffer(poolIndex)}
              disabled={poolBufferFull || poolMultiplierCapped}
              aria-label={`tap pool ${poolIndex} memory`}
              title={
                poolBufferFull
                  ? undefined
                  : poolMultiplierCapped
                    ? `Multiplier already at the ${FILL_MULTIPLIER_TAP_CAP_PERCENT}% cap`
                    : undefined
              }
              $progress={poolBufferPercent}
              $tappable
            >
              <TitleRow>
                <SectionTitle>
                  <PoolTitleSymbol aria-hidden="true">{TIER_DEFINITIONS[poolIndex - 1]?.symbol ?? `#${poolIndex}`}</PoolTitleSymbol>
                  <span>Pool</span>
                </SectionTitle>
                <DiskStatusText aria-label={`pool ${poolIndex} ${poolDisksCount} full disks`}>
                  💾 {poolDisksCount}
                </DiskStatusText>
              </TitleRow>
              <BalanceText>{formatDiskSizeStable(poolBufferBits)}</BalanceText>
              <MultiplierBar
                basePercent={showLakeMode ? 0 : poolBaseMultiplierPercent}
                totalPercent={showLakeMode ? lakeRatePercent : poolMultiplierPercent}
                ariaLabel={
                  showLakeMode
                    ? `pool ${poolIndex} data lake overflow rate`
                    : `pool ${poolIndex} fill-based bandwidth multiplier`
                }
                mode={showLakeMode ? 'lake' : 'multiplier'}
              />
              <FooterRow>
                <FooterText>⚡ {formatDiskSize(poolBandwidth)}/s</FooterText>
                <FooterText>🪣 {formatDiskSize(poolBufferCapacity)}</FooterText>
              </FooterRow>
              <VisuallyHidden
                role="progressbar"
                aria-label={`pool ${poolIndex} memory buffer`}
                aria-valuenow={Math.round(poolBufferPercent)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </FillableStatCard>
            <ExpandToggleButton
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'collapse' : 'expand'} pool ${poolIndex}`}
              onClick={() => setExpandedPoolIndex(isExpanded ? 0 : poolIndex)}
              type="button"
            >
              {isExpanded ? '▲' : '▼'}
            </ExpandToggleButton>
            {isActiveDiskPool && provisionDiskButton}
            {isExpanded && (
              <>
                {poolSizes.map(size => (
                  <DiskArrayRow key={size} actions={actions} size={size} state={state} />
                ))}
                <DataLakePanel actions={actions} state={state} bare tierIndex={poolIndex} />
              </>
            )}
          </PoolCard>
        )
      })}

      {!intro.mainGameUnlocked && (
        <TapArea
          aria-label="tap to generate a bit"
          disabled={isFull || dataStreamMultiplierCapped}
          title={!isFull && dataStreamMultiplierCapped ? `Multiplier already at the ${FILL_MULTIPLIER_TAP_CAP_PERCENT}% cap` : undefined}
          onClick={actions.tapIntroBit}
          type="button"
        >
          👆 Tap
        </TapArea>
      )}
    </RootDiv>
  )
}

export default ByteFoundryPage
