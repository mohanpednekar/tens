import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import DiskArrayRow from 'components/DiskArrayRow'
import DataLakePanel from 'components/DataLakePanel'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatAmount, formatBitsInNearestUnit, formatDiskSize, formatMemoryAmount, getComputeBandwidthSacrificeField, getComputeBandwidthSacrificeLabel, getDataLakeCurrentDiskFillFraction, getDataLakeOverflowRatePercent, getDataStreamBaseMultiplierPercent, getDataStreamMultiplierPercent, getDiskCost, getDiskRedeemTierName, getDiskSize, getDiskSizesToShow, getIntroProductionMilestoneCost, getIntroProductionMilestoneMaxClaims, getIntroProductionRate, getMemoryUnit, getPoolBaseMultiplierPercent, getPoolBufferBits, getPoolBufferCapacity, getPoolIndexForDiskSize, getPoolMultiplierPercent, getStoragePoolBandwidth, getStoragePoolCount, getVisibleStoragePoolCount, isBandwidthAvailable, isBandwidthTurnAvailable, isComputeFundedBandwidthAvailable, isDataLakePoolReady, isDiskLadderExhaustedForActivePools, isMemoryCapacityUpgradeAvailable, isProvisionDiskTurnAvailable, isStorageUnlocked } from 'game/engine'
import { BITS_PER_BYTE, COMPUTE_ENTITY_CAP, FILL_MULTIPLIER_TAP_CAP_PERCENT, INTRO_BYTE_COMBINE_COST, TIER_DEFINITIONS } from 'game/layers'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'

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

// Groups the Provision Disk button with its small "queue next build" toggle so the toggle sits
// beside it rather than stacking full-width like every other ActionsRow child — the toggle is a
// secondary aid, not a peer action.
const ProvisionDiskRow = styled.div`
  align-items: stretch;
  display: flex;
  gap: ${props => props.theme.space.sm};
  width: 100%;

  > button:first-child {
    flex: 1;
    min-width: 0;
  }
`

// Small secondary control, visually subordinate to the Provision Disk button it sits beside — same
// "plain icon toggle rather than a costed action button" shape MainPage's own autobuyer
// PauseToggleButton uses (see #171).
const QueueToggleButton = styled(Button)`
  font-size: 0.75em;
  min-width: 0;
  padding: 0.3em 0.6em;
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
  // Less on the bottom than the other three sides — PoolCard's own gap already separates this
  // button from the Memory buffer tile right below it, so full padding on all four sides doubled
  // up into a visibly larger gap than the rest of the card's own rhythm.
  padding: ${props => props.theme.space.sm} ${props => props.theme.space.sm} 0.15rem;

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

// A pool's own Data Lake gets its own fill bar — a second, separate FillableStatCard directly below
// the Memory buffer tile — rather than folding it into the buffer's own meter or the gauge above:
// the buffer bar shows what's filling from the Data Stream, this one shows what's accumulating in
// the lake from that buffer's own OVERFLOW once it's full (see tickPoolBufferFill's own overflow
// branch in game/engine). Non-interactive (`as="section"`, no tap action of its own — buying/
// auto-buy live in DataLakePanel once the pool card is expanded); its own fill fraction is the
// SAME current-disk progress the gauge's "lake" mode reads (getDataLakeCurrentDiskFillFraction),
// just shown as a level rather than a rate. Colored `theme.color.info` (via $progressColor) to
// match the gauge's own lake-mode arc color, so the two visually read as the same subsystem.
const LakeOverflowText = styled.p`
  margin: 0;
  font-family: ${props => props.theme.font.body};
  font-size: ${props => props.theme.type.scale.sm.size};
  font-weight: 600;
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
// bar + separate "NN% Speed"/"· NN%" text (and, before that, a corner-badge overlay, and before
// that, a second bottom-half arc for the Data Lake reading — see docs/DESIGN_HISTORY.md for why
// that was dropped in favor of the single dial below). The dial sweeps left (0%) through straight-up
// (100%) to right (FILL_MULTIPLIER_TAP_CAP_PERCENT, 200%) — the same needle-gauge convention as a
// car speedometer. In its default `mode="multiplier"`, the base (fill-based) arc reads in the
// ordinary accent color; when a live tap bonus pushes the total past the base value, a second arc
// segment extends in `theme.color.warn` (the app's existing gold/caution token, the closest
// semantic stand-in for "orange") so the two contributions stay visually distinguishable. The
// needle itself is a separate, neutral `theme.color.text` pointer swept to the current TOTAL (fill
// + tap bonus) reading — not tied to the accent/warn split, so it never mismatches whichever arc
// zone it happens to point into.
//
// For a POOL specifically, once its own Memory buffer is completely full, the SAME dial switches to
// `mode="lake"` and represents a different quantity entirely: that pool's own Data Lake overflow
// rate (DATA_LAKE_OVERFLOW_MAX_PERCENT at an empty currently-filling disk, down toward
// DATA_LAKE_OVERFLOW_MIN_PERCENT as it nears completion — see getDataLakeOverflowRatePercent in
// game/engine, NOT the lake's overall total), drawn as a single `theme.color.info` arc from 0 on the
// SAME 0..FILL_MULTIPLIER_TAP_CAP_PERCENT angle scale the multiplier reading already uses — not a
// separately-scaled arc. This is what makes the transition between the two readings clean rather
// than a jump: FILL_MULTIPLIER_MIN_PERCENT (the fill-based multiplier's own floor, reached exactly
// when the buffer is full) and DATA_LAKE_OVERFLOW_MAX_PERCENT (the lake reading's own ceiling, at
// its highest right as the buffer transitions to full and overflow starts) are numerically the same
// value (50) by design, so the needle doesn't jump position when the dial's meaning switches — it's
// already sitting exactly where the lake reading picks up. Whichever quantity is live, the actual
// accumulation into the lake itself (fed by that overflow) has its own separate bar — see
// FillableStatCard usage below with the 🌊 lake label — this gauge only ever shows a RATE, never a
// level. The Data Stream card has no lake of its own, so it always renders in `mode="multiplier"`.
// Keeps the exact same role="progressbar"/aria-label/aria-valuenow/min/max contract throughout —
// always 0..FILL_MULTIPLIER_TAP_CAP_PERCENT regardless of mode, since both readings share that one
// scale — so existing tests asserting on it are unaffected.
const GAUGE_SIZE = 52
const GAUGE_STROKE_WIDTH = 5
const GAUGE_CENTER = GAUGE_SIZE / 2
const GAUGE_RADIUS = GAUGE_CENTER - GAUGE_STROKE_WIDTH
const GAUGE_NEEDLE_RADIUS = GAUGE_RADIUS - 3
const GAUGE_LABEL_GAP = 11
const GAUGE_HEIGHT = GAUGE_SIZE + GAUGE_LABEL_GAP
// -90deg = left (0%), 0deg = straight up (100%), +90deg = right (FILL_MULTIPLIER_TAP_CAP_PERCENT).
const GAUGE_MIN_ANGLE = -90
const GAUGE_MAX_ANGLE = 90

const clampGaugeValue = value => Math.min(FILL_MULTIPLIER_TAP_CAP_PERCENT, Math.max(0, value))

const percentToGaugeAngle = percent =>
  GAUGE_MIN_ANGLE + (clampGaugeValue(percent) / FILL_MULTIPLIER_TAP_CAP_PERCENT) * (GAUGE_MAX_ANGLE - GAUGE_MIN_ANGLE)

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

// `mode="lake"` renders a single info-colored arc (see the doc comment above) instead of the
// default accent/warn base+bonus split — there is no "bonus" concept for a lake overflow reading.
const MultiplierGauge = ({ basePercent, totalPercent, ariaLabel, mode = 'multiplier' }) => {
  const isLakeMode = mode === 'lake'
  const clampedBase = clampGaugeValue(isLakeMode ? 0 : basePercent)
  const clampedTotal = clampGaugeValue(totalPercent)
  const baseAngle = percentToGaugeAngle(clampedBase)
  const totalAngle = percentToGaugeAngle(clampedTotal)
  const needleTip = gaugePoint(GAUGE_NEEDLE_RADIUS, totalAngle)
  const hasBonus = !isLakeMode && clampedTotal > clampedBase

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
        {isLakeMode
          ? clampedTotal > 0 && <GaugeLakeArc d={gaugeArcPath(GAUGE_RADIUS, GAUGE_MIN_ANGLE, totalAngle)} />
          : (
            <>
              {clampedBase > 0 && <GaugeBaseArc d={gaugeArcPath(GAUGE_RADIUS, GAUGE_MIN_ANGLE, baseAngle)} />}
              {hasBonus && <GaugeBonusArc d={gaugeArcPath(GAUGE_RADIUS, baseAngle, totalAngle)} />}
            </>
          )}
        <GaugeNeedle x1={GAUGE_CENTER} y1={GAUGE_CENTER} x2={needleTip.x} y2={needleTip.y} />
        <GaugeHub cx={GAUGE_CENTER} cy={GAUGE_CENTER} r={2} />
        <GaugeLabel x={GAUGE_CENTER} y={GAUGE_CENTER + GAUGE_LABEL_GAP - 2}>{Math.round(clampedTotal)}%</GaugeLabel>
      </svg>
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
  const theme = useTheme()

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
  // "Queue next build" (see queueDiskBuild/tickQueuedDiskBuild in engine.js) — arms an auto-fire
  // for the NEXT Provision Disk the moment its own pool buffer can afford it and nothing outranks
  // it, so the player doesn't have to click at that exact instant. Nothing to arm once a build is
  // already in flight (it has its own countdown) or the ladder has nothing left to ever build.
  const diskBuildQueued = Boolean(intro.diskBuildQueued)
  // Canceling an already-armed queue should never be blocked — only ARMING it needs the build-in-
  // progress/ladder-exhausted guard (matching queueDiskBuild's own no-op conditions in engine.js).
  const diskBuildQueueDisabled = !diskBuildQueued && (!!diskBuildInProgress || diskLadderExhausted)
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
    <ProvisionDiskRow>
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
      <QueueToggleButton
        aria-pressed={diskBuildQueued}
        aria-label={diskBuildQueued ? 'cancel queued disk build' : 'queue next disk build'}
        disabled={diskBuildQueueDisabled}
        onClick={() => (diskBuildQueued ? actions.clearDiskBuildQueue() : actions.queueDiskBuild())}
        title={
          diskLadderExhausted
            ? 'Nothing left to queue — every active pool is already fully built'
            : diskBuildInProgress
              ? 'Already building — nothing to queue until it finishes'
              : diskBuildQueued
                ? `Queued — will auto-provision the next ${formatDiskSize(diskSize)} disk the moment it's affordable. Click to cancel.`
                : `Auto-provision the next ${formatDiskSize(diskSize)} disk the moment its buffer can afford it, without clicking Provision Disk yourself`
        }
        type="button"
        variant={diskBuildQueued ? 'prestige' : 'ghost'}
      >
        {diskBuildQueued ? '✕' : '📌'}
      </QueueToggleButton>
    </ProvisionDiskRow>
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
        // This pool's own Data Lake CURRENT disk fill progress (poolIndex === that lake's own
        // tierIndex, one lake per pool), not the lake's overall total — feeds both the gauge's
        // `mode="lake"` reading above (once poolBufferFull) and the standalone lake bar below.
        const lakeFillFraction = getDataLakeCurrentDiskFillFraction(state, poolIndex)
        const lakeRatePercent = getDataLakeOverflowRatePercent(state, poolIndex)
        // Same isDataLakePoolReady this pool's own DataLakePanel/LakePoolTile already keys its
        // "Locked" placeholder on (see components/DataLakePanel) — required here too, not just
        // poolBufferFull: tickPoolBufferFill's overflow branch (engine.js) won't credit this lake
        // at all until a real Storage disk has been built for it, so a pool whose buffer fills
        // before that (the common, non-legacy case — pool 1 in particular, visible from the very
        // start) would otherwise switch the gauge to "lake" mode and show a constant nonzero
        // "incoming rate" that can never actually turn into real progress — the exact
        // stalled-tile-shown-as-active misrepresentation Devin Review flagged for LakePoolTile,
        // just on this page's own gauge/bar instead.
        const poolReady = isDataLakePoolReady(state, poolIndex)
        const showLakeMode = poolBufferFull && poolReady
        // Same reasoning as above — a legacy save's own residual fillBits (banked before this
        // pool's isDataLakePoolReady gate existed) would otherwise read as live progress on a
        // lake the engine can no longer advance; the standalone lake bar below reads 0 until ready,
        // matching LakePoolTile's own "Locked" convention rather than showing stale banked state.
        const lakeFillPercent = poolReady ? clampPercent(lakeFillFraction * 100) : 0
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
                  basePercent={showLakeMode ? 0 : poolBaseMultiplierPercent}
                  totalPercent={showLakeMode ? lakeRatePercent : poolMultiplierPercent}
                  ariaLabel={
                    showLakeMode
                      ? `pool ${poolIndex} data lake overflow rate`
                      : `pool ${poolIndex} fill-based bandwidth multiplier`
                  }
                  mode={showLakeMode ? 'lake' : 'multiplier'}
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
            {/* The Data Lake's own bar — see the styled LakeOverflowText comment above — showing
                what's accumulating from the Memory buffer's own overflow, always visible (not
                gated behind isExpanded) so the flow reads at a glance without opening the card. */}
            <FillableStatCard
              as="section"
              aria-label={`pool ${poolIndex} data lake`}
              $progress={lakeFillPercent}
              $progressColor={theme.color.info}
            >
              <LakeOverflowText>
                {TIER_DEFINITIONS[poolIndex - 1]?.symbol ?? `#${poolIndex}`} Lake · {Math.round(lakeFillPercent)}%
              </LakeOverflowText>
              <VisuallyHidden
                role="progressbar"
                aria-label={`pool ${poolIndex} data lake current disk fill`}
                aria-valuenow={Math.round(lakeFillPercent)}
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
