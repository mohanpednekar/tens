import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import DiskArrayRow from 'components/DiskArrayRow'
import DataLakePanel from 'components/DataLakePanel'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, formatBitsInNearestUnit, formatDiskSize, formatMemoryAmount, getComputeBandwidthSacrificeField, getComputeBandwidthSacrificeLabel, getDataLakeFillFraction, getDataLakeOverflowRatePercent, getDataStreamBaseMultiplierPercent, getDataStreamMultiplierPercent, getDiskCost, getDiskRedeemTierName, getDiskSize, getDiskSizesToShow, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getMemoryUnit, getPoolBaseMultiplierPercent, getPoolBufferBits, getPoolBufferCapacity, getPoolIndexForDiskSize, getPoolMultiplierPercent, getStoragePoolBandwidth, getStoragePoolCount, getVisibleStoragePoolCount, isBandwidthAvailable, isBandwidthTurnAvailable, isComputeFundedBandwidthAvailable, isDiskLadderExhaustedForActivePools, isMemoryCapacityUpgradeAvailable, isProvisionDiskTurnAvailable, isStorageUnlocked } from 'game/engine'
import { BITS_PER_BYTE, COMPUTE_ENTITY_CAP, DATA_LAKE_OVERFLOW_MAX_PERCENT, DATA_LAKE_OVERFLOW_MIN_PERCENT, FILL_MULTIPLIER_TAP_CAP_PERCENT, INTRO_BYTE_COMBINE_COST, TIER_DEFINITIONS } from 'game/layers'
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

const BalanceText = styled.p`
  margin: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.lg.size};
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
  gap: ${props => props.theme.space.md};
`

const DataStreamCard = styled(StatCard)`
  width: 100%;
  gap: ${props => props.theme.space.md};
`

// Structured header + stats block, replacing the earlier single concatenated text line — matches
// the tier row's own name/stat layout convention elsewhere in the app (see MainPage's TierName/
// OwnedText/ProductionText) rather than staying a plain sentence. Wraps just SectionHeaderRow
// (title/gauge/Bandwidth) — the pool's own Memory buffer block used to render inside this same
// button too, but it's now a separate tappable control of its own (see FillableStatCard below /
// tapPoolBuffer in game/engine), and a <button> can't nest inside another <button>.
const PoolSummaryButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  padding: ${props => props.theme.space.sm};

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

// Shared 3-column header row for both the Data Stream card and every pool's own summary: title
// top-left, the fill-based MultiplierGauge top-middle, and the section's own Speed/Bandwidth
// figure top-right — a CSS grid (not flex space-between) so the middle gauge column stays
// genuinely centered regardless of how wide the title/speed text on either side are. The section's
// own balance (bits/capacity, or a pool's own Memory buffer) always renders as a second line below
// this row, in the tile beneath it.
const SectionHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

const SectionTitle = styled.h3`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.space.xs};
  margin: 0;
  min-width: 0;
  justify-self: start;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.md.size};
  line-height: ${props => props.theme.type.scale.md.lineHeight};
  font-weight: 700;
  color: ${props => props.theme.color.text};
`

const PoolTitleSymbol = styled.span`
  flex-shrink: 0;
`

const SectionRateText = styled.span`
  justify-self: end;
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
// directly. This tile is always exactly the section's own second line — title/gauge/rate live in
// SectionHeaderRow above it instead (see "Put title on top left, speedometer in the top middle and
// speed or bandwidth on the top right" in CLAUDE.md's UI conventions).
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

// Renders "<bits> / <capacity>". Capacity always renders in its own unit (picked off capacity —
// see getMemoryUnit in game/engine). The balance shares that same unit UNLESS doing so would put
// it below 1 (e.g. "0.234 MiB / 1 MiB" territory) — in that case it self-sizes into its own finer
// unit instead (e.g. "30.031 KiB / 1 MiB"), which still reads as a real magnitude rather than
// falling all the way back to a raw bit count. Only a genuinely sub-Byte balance (no named unit
// finer than a Byte exists) still falls back to raw bits, via formatMemoryAmount's own bottom-rung
// handling — see docs/DESIGN_HISTORY.md.
const formatMemoryBalance = (bits, capacityBits, byteCreated) => {
  const capacityUnit = getMemoryUnit(capacityBits, byteCreated)
  const balanceUnit = capacityUnit && bits > 0 && bits < capacityUnit.divisor
    ? getMemoryUnit(bits, byteCreated)
    : capacityUnit
  return `${formatMemoryAmount(bits, balanceUnit)} / ${formatMemoryAmount(capacityBits, capacityUnit)}`
}

const clampPercent = value => Math.min(100, Math.max(0, value))

// Fill-based Speed/Bandwidth multiplier gauge (see FILL_MULTIPLIER_* in game/layers and
// getDataStreamMultiplierPercent/getPoolMultiplierPercent in game/engine) — a compact speedometer
// rendered inline in SectionHeaderRow's own middle column, replacing the earlier full-width linear
// bar + separate "NN% Speed"/"· NN%" text (and, before that, a corner-badge overlay). The TOP half
// dial sweeps left (0%) through straight-up (100%) to right (FILL_MULTIPLIER_TAP_CAP_PERCENT,
// 200%) — the same needle-gauge convention as a car speedometer. The base (fill-based) arc reads in
// the ordinary accent color; when a live tap bonus pushes the total past the base value, a second
// arc segment extends in `theme.color.warn` (the app's existing gold/caution token, the closest
// semantic stand-in for "orange") so the two contributions stay visually distinguishable. The
// needle itself is a separate, neutral `theme.color.text` pointer swept to the current TOTAL (fill
// + tap bonus) reading — not tied to the accent/warn split, so it never mismatches whichever arc
// zone it happens to point into.
//
// For a POOL specifically (see the optional `lake` prop), the SAME dial continues downward into a
// second, BOTTOM half arc — literally the same speedometer, not a separate gauge — showing that
// pool's own Data Lake overflow rate (DATA_LAKE_OVERFLOW_MAX_PERCENT at empty, down to
// DATA_LAKE_OVERFLOW_MIN_PERCENT once full; see getDataLakeOverflowRatePercent/
// getDataLakeFillFraction in game/engine): the arc's own length tracks the lake's fill fraction (a
// sliver near empty, a full bottom semicircle once the lake is full — the same "grows as it fills"
// reading the top arc already uses), in `theme.color.info` to stay visually distinct from both the
// top arc's accent/warn tones. The Data Stream card has no lake of its own, so it always renders
// the plain top-half-only dial. Keeps the exact same role="progressbar"/aria-label/aria-valuenow/
// min/max contract the original bar used for the top reading, plus a second hidden progressbar for
// the lake reading when present, so existing tests asserting on the top contract are unaffected.
const GAUGE_SIZE = 52
const GAUGE_STROKE_WIDTH = 5
const GAUGE_CENTER = GAUGE_SIZE / 2
const GAUGE_RADIUS = GAUGE_CENTER - GAUGE_STROKE_WIDTH
const GAUGE_NEEDLE_RADIUS = GAUGE_RADIUS - 3
const GAUGE_LABEL_GAP = 11
const GAUGE_HEIGHT = GAUGE_SIZE + GAUGE_LABEL_GAP
// -90deg = left (0%), 0deg = straight up (100%), +90deg = right (FILL_MULTIPLIER_TAP_CAP_PERCENT) —
// the top half. 90deg..270deg (through the bottom, 180deg) is the lake-overflow bottom half, for
// pools only.
const GAUGE_MIN_ANGLE = -90
const GAUGE_MAX_ANGLE = 90
const GAUGE_BOTTOM_MIN_ANGLE = 90
const GAUGE_BOTTOM_MAX_ANGLE = 270

const clampGaugeValue = value => Math.min(FILL_MULTIPLIER_TAP_CAP_PERCENT, Math.max(0, value))

const percentToGaugeAngle = percent =>
  GAUGE_MIN_ANGLE + (clampGaugeValue(percent) / FILL_MULTIPLIER_TAP_CAP_PERCENT) * (GAUGE_MAX_ANGLE - GAUGE_MIN_ANGLE)

const fractionToBottomAngle = fraction =>
  GAUGE_BOTTOM_MIN_ANGLE + Math.min(1, Math.max(0, fraction)) * (GAUGE_BOTTOM_MAX_ANGLE - GAUGE_BOTTOM_MIN_ANGLE)

const gaugePoint = (radius, angleDeg) => {
  const angleRad = (angleDeg * Math.PI) / 180
  return { x: GAUGE_CENTER + radius * Math.sin(angleRad), y: GAUGE_CENTER - radius * Math.cos(angleRad) }
}

// A single SVG arc segment (never more than a 180deg sweep here, so largeArcFlag is always 0).
const gaugeArcPath = (radius, startAngle, endAngle) => {
  if (endAngle <= startAngle) return ''
  const start = gaugePoint(radius, startAngle)
  const end = gaugePoint(radius, endAngle)
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`
}

const GaugeWrap = styled.div`
  justify-self: center;
`

const GaugeTrack = styled.path`
  fill: none;
  stroke: ${props => props.theme.color.surfaceSunken};
  stroke-width: ${GAUGE_STROKE_WIDTH};
  stroke-linecap: round;
`

const GaugeBaseArc = styled.path`
  fill: none;
  stroke: ${props => props.theme.color.accent};
  stroke-width: ${GAUGE_STROKE_WIDTH};
  stroke-linecap: round;
`

const GaugeBonusArc = styled.path`
  fill: none;
  stroke: ${props => props.theme.color.warn};
  stroke-width: ${GAUGE_STROKE_WIDTH};
  stroke-linecap: round;
`

const GaugeLakeArc = styled.path`
  fill: none;
  stroke: ${props => props.theme.color.info};
  stroke-width: ${GAUGE_STROKE_WIDTH};
  stroke-linecap: round;
`

const GaugeNeedle = styled.line`
  stroke: ${props => props.theme.color.text};
  stroke-width: 2;
  stroke-linecap: round;
`

const GaugeHub = styled.circle`
  fill: ${props => props.theme.color.text};
`

const GaugeLabel = styled.text`
  font-family: ${props => props.theme.font.body};
  font-size: 8px;
  font-weight: 700;
  fill: ${props => props.theme.color.textMuted};
  text-anchor: middle;
`

const GaugeLakeLabel = styled.text`
  font-family: ${props => props.theme.font.body};
  font-size: 7px;
  font-weight: 600;
  fill: ${props => props.theme.color.info};
  text-anchor: middle;
`

// `lake`, when passed (pools only), is `{ fillFraction, ratePercent, ariaLabel }` — see the doc
// comment above.
const MultiplierGauge = ({ basePercent, totalPercent, ariaLabel, lake }) => {
  const clampedBase = clampGaugeValue(basePercent)
  const clampedTotal = clampGaugeValue(totalPercent)
  const baseAngle = percentToGaugeAngle(clampedBase)
  const totalAngle = percentToGaugeAngle(clampedTotal)
  const needleTip = gaugePoint(GAUGE_NEEDLE_RADIUS, totalAngle)
  const hasBonus = clampedTotal > clampedBase
  const lakeFillAngle = lake ? fractionToBottomAngle(lake.fillFraction) : null

  return (
    <GaugeWrap>
      <svg
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={Math.round(clampedTotal)}
        aria-valuemin={0}
        aria-valuemax={FILL_MULTIPLIER_TAP_CAP_PERCENT}
        width={GAUGE_SIZE}
        height={GAUGE_HEIGHT}
        viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_HEIGHT}`}
      >
        <GaugeTrack d={gaugeArcPath(GAUGE_RADIUS, GAUGE_MIN_ANGLE, GAUGE_MAX_ANGLE)} />
        {clampedBase > 0 && <GaugeBaseArc d={gaugeArcPath(GAUGE_RADIUS, GAUGE_MIN_ANGLE, baseAngle)} />}
        {hasBonus && <GaugeBonusArc d={gaugeArcPath(GAUGE_RADIUS, baseAngle, totalAngle)} />}
        <GaugeNeedle x1={GAUGE_CENTER} y1={GAUGE_CENTER} x2={needleTip.x} y2={needleTip.y} />
        <GaugeHub cx={GAUGE_CENTER} cy={GAUGE_CENTER} r={2} />
        <GaugeLabel x={GAUGE_CENTER} y={GAUGE_CENTER + GAUGE_LABEL_GAP - 2}>{Math.round(clampedTotal)}%</GaugeLabel>
        {lake && (
          <>
            <GaugeTrack d={gaugeArcPath(GAUGE_RADIUS, GAUGE_BOTTOM_MIN_ANGLE, GAUGE_BOTTOM_MAX_ANGLE)} />
            {lakeFillAngle > GAUGE_BOTTOM_MIN_ANGLE && (
              <GaugeLakeArc d={gaugeArcPath(GAUGE_RADIUS, GAUGE_BOTTOM_MIN_ANGLE, lakeFillAngle)} />
            )}
            <GaugeLakeLabel x={GAUGE_CENTER} y={GAUGE_CENTER + GAUGE_RADIUS * 0.62}>
              {`${Math.round(lake.ratePercent)}%`}
            </GaugeLakeLabel>
          </>
        )}
      </svg>
      {lake && (
        <VisuallyHidden
          role="progressbar"
          aria-label={lake.ariaLabel}
          aria-valuenow={Math.round(lake.ratePercent)}
          aria-valuemin={DATA_LAKE_OVERFLOW_MIN_PERCENT}
          aria-valuemax={DATA_LAKE_OVERFLOW_MAX_PERCENT}
        />
      )}
    </GaugeWrap>
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
  // The Data Stream header row's own top-right figure (see "Put title on top left, speedometer in
  // the top middle and speed or bandwidth on the top right" in CLAUDE.md) — plain text, same
  // convention a pool's own Bandwidth figure uses in its header, replacing the earlier segmented
  // sub-Byte rate bar.
  const dataStreamRateText = !intro.byteCreated
    ? null
    : productionRate < BITS_PER_BYTE
      ? `+${formatAmount(productionRate)} bit${productionRate === 1 ? '' : 's'}/sec`
      : `+${formatAmount(productionRate / BITS_PER_BYTE)} Byte${productionRate / BITS_PER_BYTE === 1 ? '' : 's'}/sec`
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
  const diskCost = getDiskCost(diskSize)
  const diskPoolIndex = getPoolIndexForDiskSize(diskSize)
  const diskPoolBufferBits = getPoolBufferBits(state, diskPoolIndex)
  const diskLadderExhausted = isDiskLadderExhaustedForActivePools(state)
  const canStartDiskBuild = isProvisionDiskTurnAvailable(state)
  const diskBuildInProgress = intro.diskBuild
  const diskBuildBlockedByPriority = !diskLadderExhausted && diskPoolBufferBits >= diskCost && !canStartDiskBuild && !diskBuildInProgress
  const diskBuildProgress = diskBuildInProgress
    ? clampPercent(100 - (diskBuildInProgress.remainingSeconds / diskBuildInProgress.totalSeconds) * 100)
    : diskLadderExhausted
      ? 100
      : clampPercent((diskPoolBufferBits / diskCost) * 100)
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
                ? `Costs ${formatDiskSize(diskCost)} and takes time to provision — creates an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, redeemable right away for a free ${diskRedeemTierName} once full`
                : `Costs ${formatDiskSize(diskCost)} and takes time to provision — creates an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, but it won't be redeemable until its own fixed corresponding tier reaches its matching level`
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
        <SectionHeaderRow>
          <SectionTitle>Data Stream</SectionTitle>
          {intro.byteCreated && (
            <MultiplierGauge
              basePercent={dataStreamBaseMultiplierPercent}
              totalPercent={dataStreamMultiplierPercent}
              ariaLabel="data stream fill-based speed multiplier"
            />
          )}
          <SectionRateText>{dataStreamRateText}</SectionRateText>
        </SectionHeaderRow>
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
          <BalanceText>{formatMemoryBalance(intro.bits, intro.capacity, intro.byteCreated)}</BalanceText>
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
                  <span>🧠 Capacity ×2</span>
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
        // The gauge's own bottom half (see MultiplierGauge's `lake` prop) — this pool's own Data
        // Lake overflow rate/fill (poolIndex === that lake's own tierIndex, one lake per pool).
        const lakeFillFraction = getDataLakeFillFraction(state, poolIndex)
        const lakeRatePercent = getDataLakeOverflowRatePercent(state, poolIndex)
        const poolSizes = diskSizesToShow.filter(size => getPoolIndexForDiskSize(size) === poolIndex)
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
            <PoolSummaryButton
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'collapse' : 'expand'} pool ${poolIndex}`}
              onClick={() => setExpandedPoolIndex(isExpanded ? 0 : poolIndex)}
              type="button"
            >
              <SectionHeaderRow>
                <SectionTitle>
                  <PoolTitleSymbol aria-hidden="true">{TIER_DEFINITIONS[poolIndex - 1]?.symbol ?? `#${poolIndex}`}</PoolTitleSymbol>
                  <span>Pool</span>
                </SectionTitle>
                <MultiplierGauge
                  basePercent={poolBaseMultiplierPercent}
                  totalPercent={poolMultiplierPercent}
                  ariaLabel={`pool ${poolIndex} fill-based bandwidth multiplier`}
                  lake={{
                    fillFraction: lakeFillFraction,
                    ratePercent: lakeRatePercent,
                    ariaLabel: `pool ${poolIndex} data lake overflow rate`,
                  }}
                />
                <SectionRateText>{formatDiskSize(poolBandwidth)}/sec</SectionRateText>
              </SectionHeaderRow>
            </PoolSummaryButton>
            {/* A separate control from PoolSummaryButton above (not nested inside it — two
                buttons can't nest) so tapping Memory to boost this pool's own multiplier bonus
                (see tapPoolBuffer/FILL_MULTIPLIER_* in game/engine and game/layers) doesn't also
                toggle the card's expanded state. Same FillableStatCard component Data Stream's own
                tap tile uses — see FillableStatCard above. */}
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
              <BalanceText>{formatDiskSize(poolBufferBits)} / {formatDiskSize(poolBufferCapacity)}</BalanceText>
              <VisuallyHidden
                role="progressbar"
                aria-label={`pool ${poolIndex} memory buffer`}
                aria-valuenow={Math.round(poolBufferPercent)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </FillableStatCard>
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
