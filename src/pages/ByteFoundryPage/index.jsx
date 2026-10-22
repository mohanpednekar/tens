import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import { COST_ICON } from 'components/icons'
import DiskArrayRow from 'components/DiskArrayRow'
import DataLakePanel from 'components/DataLakePanel'
import OfflineProgressNotice from 'components/OfflineProgressNotice'
import StatCard from 'components/StatCard'
import { formatBitsInNearestUnit, formatOfflineDuration, formatDiskSize, formatDiskSizeInPoolUnit, formatMemoryAmount, formatMemoryAmountStable, formatPoolBalance, formatPoolBalanceStable, getDataStreamMultiplierPercent, getDiskCost, getDiskProvisionPassesCollected, getDiskProvisionPassesRequired, getDiskRedeemTierName, getDiskSize, getDiskSizesToShow, getIntroProductionRate, getMemoryUnit, getPoolBufferBits, getPoolBufferCapacity, getPoolCacheReservationBits, getPoolIndexForDiskSize, getPoolMultiplierPercent, getPoolTapBonusPercent, getStoragePoolBandwidth, getStoragePoolCount, getVisibleStoragePoolCount, isDataLakePoolDrainAvailable, isDiskLadderExhaustedForActivePools, isMemoryCapacityUpgradeArmable, isSpeedUpgradeArmable, getSpeedUpgradeCostBits, isProvisionDiskTurnAvailable, isStorageUnlocked, isStoragePoolRebuilding } from 'game/engine'
import { FILL_MULTIPLIER_MAX_PERCENT, FILL_MULTIPLIER_MIN_PERCENT, FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_DOUBLING_STEP, TIER_DEFINITIONS } from 'game/layers'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.md};
  max-width: 480px;
  margin: 0 auto;
  padding: calc(${props => props.theme.space.lg} + env(safe-area-inset-top))
    ${props => props.theme.space.md} ${props => props.theme.space.lg};
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

// The section's own current balance — bigger font, centered (see "Put title on top left, Speed/Bandwidth
// on the top right, the balance in a bigger centered font below that, a center-grow
// multiplier bar (with its own percent readout below it) below the combined balance/capacity line" in CLAUDE.md's UI conventions) — sized a
// step above the rest of the tile's text but below the page's own H1 so a stack of several pool
// cards doesn't read as several competing headlines.
// Sits in the middle of TitleRow (title left, Speed/Bandwidth right). The text-shadow is a halo in
// the card's own surface color so the digits stay legible where the progress-fill edge crosses them.
const BalanceText = styled.p`
  position: absolute;
  left: 50%;
  ${props => (props.$large ? 'top: 50%; transform: translate(-50%, -50%);' : 'top: 0; transform: translateX(-50%);')}
  pointer-events: none;
  margin: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => (props.$large ? props.theme.type.scale.xl.size : props.theme.type.scale.md.size)};
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 0 2px ${props => props.theme.color.surface};
  font-variant-numeric: tabular-nums;
`

// Fixed-slot layout for a formatted amount ("398.3 KB"): the integer part is right-aligned in a
// fixed-width slot, the fraction (".3", ".375", or none) left-aligned in a fixed-width slot, and the
// unit in its own slot — so the decimal point and unit symbol stay put while the value changes
// rapidly (digits are tabular, so equal width). Text content is unchanged.
const AmountInt = styled.span`
  display: inline-block;
  min-width: 5ch;
  text-align: right;
`
const AmountFrac = styled.span`
  display: inline-block;
  min-width: 4ch;
  text-align: left;
`
const AmountUnit = styled.span`
  display: inline-block;
  min-width: 3ch;
  text-align: left;
`
const AMOUNT_TEXT_PATTERN = /^([\d,]+)(\.\d+)?\s+(.+)$/
const AlignedAmount = ({ text }) => {
  const match = AMOUNT_TEXT_PATTERN.exec(text)
  if (!match) return text
  const [, whole, fraction = '', unit] = match
  return (
    <>
      <AmountInt>{whole}</AmountInt>
      <AmountFrac>{fraction}</AmountFrac>{' '}
      <AmountUnit>{unit}</AmountUnit>
    </>
  )
}

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

  &:hover:not(:disabled):not([aria-disabled='true']) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled):not([aria-disabled='true']) {
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

// Contrast hierarchy: cards stand out from the page (stronger edge + shadow) while the tiles and
// buttons inside them sit closer to the card's own surface (softened sunken fill).
const cardEdge = ({ theme }) => css`
  border: 1.5px solid color-mix(in srgb, ${theme.color.borderStrong} 65%, ${theme.color.text});
  box-shadow: ${theme.shadow.md};
`
const softInnerFill = ({ theme }) =>
  `color-mix(in srgb, ${theme.color.surfaceSunken} 45%, ${theme.color.surface})`

const softInnerButtons = props => css`
  button {
    background-color: ${softInnerFill(props)};
    border-width: 1px;
    border-color: color-mix(in srgb, currentColor 45%, transparent);
  }
`

const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  width: 100%;
  padding: ${props => props.theme.space.sm} 0.5rem 0.5rem;

  ${softInnerButtons}
`

// Provision Disk is its own card, independent of the Data Stream card above it.
// Its single button fills the card flush (no card padding, no inner border).
const ProvisionCard = styled(StatCard)`
  width: 100%;
  padding: 0;
  overflow: hidden;
  ${cardEdge}

  button {
    background-color: ${softInnerFill};
    border: 0;
    border-radius: 0;
  }
`

// "Upgrade Data Stream" is the single recurring upgrade — placing it in MilestonesRow keeps the
// same flex layout the old Speed+Capacity pair used. `min-width: 0` lets each button's own label
// ellipsis-truncate (see ButtonLabel in components/Button) instead of forcing the row wider than
// its container at narrow viewports.
// "45s" / "12m 5s" / "3h 20m" / "2d 4h" — remaining time of a running Data Stream upgrade.
const formatUpgradeTimeLeft = totalSeconds => {
  if (!Number.isFinite(totalSeconds)) return '—'
  const seconds = Math.max(1, Math.ceil(totalSeconds))
  const days = Math.floor(seconds / 86400)
  if (days > 0) return `${days}d ${Math.floor((seconds % 86400) / 3600)}h`
  return formatOfflineDuration(seconds)
}

const MilestonesRow = styled.div`
  display: flex;
  gap: ${props => props.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`

// Upgrade Data Stream's two-line content: the label on top, its cost — what it actually
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
// The summary tile sits flush in its card (no card padding); only the expanded disk/lake content
// below it (PoolBody) is padded.
const PoolCard = styled(StatCard)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${cardEdge}
`

// The lake's title/action row, shown on a collapsed pool card (an expanded one renders the full lake).
const PoolLakeHeader = styled.div`
  padding: 0 0.5rem 0.5rem;
  &:empty {
    display: none;
  }
`

const PoolBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  padding: ${props => props.theme.space.sm} 0.5rem 0.5rem;
`

// The Data Stream tile sits flush in its card; the action buttons below it (ActionsRow) are padded.
const DataStreamCard = styled(StatCard)`
  width: 100%;
  gap: 0;
  padding: 0;
  overflow: hidden;
  ${cardEdge}

  > :first-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

// A pool's summary tile: FillableStatCard supplies the fill background, PoolTapButton is a
// transparent "stretched" button covering it (so the tap target is never an ancestor of the title
// button — no nested interactive elements, and a disabled tap can't swallow the title's clicks), and
// PoolTileContent floats the readouts above it with pointer-events off so clicks fall through to the
// tap button; only PoolTitleToggle opts back in.
const PoolTapButton = styled.button`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: transparent;
  cursor: pointer;

  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: color-mix(in srgb, currentColor 10%, transparent);
  }

  &:active:not(:disabled) {
    background: color-mix(in srgb, currentColor 18%, transparent);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

const PoolTileContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  pointer-events: none;
`

// Expand/collapse trigger for a pool card: just the "<symbol> Pool" title.
const PoolTitleToggle = styled.button`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.space.xs};
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  pointer-events: auto;
  border-radius: ${props => props.theme.radius.sm};

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

// Shared top row for both the Data Stream card and every pool's own summary: title top-left, the
// combined balance/capacity line (BalanceText, nowrap, grows) in the middle, and that section's own
// Speed/Bandwidth top-right — a flex row that WRAPS (Speed drops to its own right-aligned line) when a
// long balance leaves no room on a narrow phone, rather than overlapping the neighbours. The multiplier bar(s) render below it — see
// docs/DESIGN_HISTORY.md for the corner-speedometer → center-grow-bar redesign this replaced.
// Positioning context for the absolutely-placed BalanceText: centered on the tile's own title/capacity
// rows (perfectly centered when no tap-bonus bar, top-aligned with the title and Speed when there is).
const TileHeader = styled.div`
  position: relative;
  width: 100%;
`

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 ${props => props.theme.space.sm};
  width: 100%;
`

const SectionTitle = styled.h3`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.space.xs};
  margin: 0;
  min-width: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.sm.size};
  line-height: ${props => props.theme.type.scale.sm.lineHeight};
  font-weight: 700;
  color: ${props => props.theme.color.text};
`

const PoolTitleSymbol = styled.span`
  flex-shrink: 0;
`

const SpeedText = styled.span`
  flex-shrink: 0;
  margin-left: auto;
  ${props => props.$centered ? 'position: absolute; right: 0; top: 50%; transform: translateY(-50%);' : ''}
  font-size: ${props => props.theme.type.scale.sm.size};
  font-weight: 600;
  color: ${props => props.$color ?? props.theme.color.textMuted};
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
// Memory buffer block reuses this component as PoolTile (a plain div filled the same way, with a
// stretched PoolTapButton on top of it — tapPoolBuffer in game/engine) — tapping either boosts that specific Data Stream/pool's own
// fill-based multiplier bonus (see FILL_MULTIPLIER_* in game/layers), it never credits bits
// directly. Everything for that section lives inside this one tile — TitleRow (title and Speed/Bandwidth),
// the big centered balance/capacity line, and the tap-bonus bar — see CLAUDE.md's UI conventions.
const FillableStatCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem 0.75rem;
  border: 0;
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  ${progressFill}
  background-color: ${softInnerFill};

  ${props => props.$tappable && `
    cursor: pointer;
    transition: filter 0.15s ease, transform 0.05s ease;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      filter: brightness(1.2);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid ${props.theme.color.accent};
      outline-offset: 2px;
    }

    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
    }
  `}
`

const PoolTile = styled(FillableStatCard)`
  position: relative;
  ${props => props.$expanded && 'border-bottom-left-radius: 0; border-bottom-right-radius: 0;'}
`

// The balance and Capacity figures use compact formatting (see
// getMemoryUnit in game/engine) — UNLESS that would put the balance below 1 (e.g. "0.234 MiB"
// alongside a "1 MiB" capacity) — in that case the balance self-sizes into its own finer unit
// instead (e.g. "30.031 KiB" alongside "1 MiB"), which still reads as a real magnitude rather than
// falling all the way back to a raw bit count. Only a genuinely sub-Byte balance (no named unit
// finer than a Byte exists) still falls back to raw bits, via formatMemoryAmount's own bottom-rung
// handling — see docs/DESIGN_HISTORY.md. `stable` picks the fixed-3-decimal formatter (the ticking
// default) or the ordinary trimmed one — see useTrimBalanceWhenSettled below for why a caller would
// ever want the trimmed form here.
const formatMemoryBalanceValue = (bits, capacityBits, byteCreated, stable = true) => {
  const capacityUnit = getMemoryUnit(capacityBits, byteCreated)
  const balanceUnit = capacityUnit && bits > 0 && bits < capacityUnit.divisor
    ? getMemoryUnit(bits, byteCreated)
    : capacityUnit
  return stable ? formatMemoryAmountStable(bits, balanceUnit) : formatMemoryAmount(bits, balanceUnit)
}

const formatMemoryCapacityValue = (capacityBits, byteCreated) =>
  formatMemoryAmount(capacityBits, getMemoryUnit(capacityBits, byteCreated))

// A balance's fixed decimal padding (formatMemoryAmountStable/formatDiskSizeStable — see either's
// own doc comment) exists only to stop its displayed WIDTH from jittering tick to tick while the
// value is actually changing. Once the padded text is an integer (all-zero decimals) and has been
// unchanged for SETTLED_BALANCE_TRIM_DELAY_MS of real wall-clock time, the padding is pure noise
// ("8.000 KB" forever), so the balance switches to the ordinary trimmed formatter. Any user action
// (pointer/key press) restarts the wait and restores the padded form. The settled text is stored
// alongside the flag so a text change reads as untrimmed on the very same render (no flash).
const SETTLED_BALANCE_TRIM_DELAY_MS = 5000
const isIntegerValueText = text => /^[\d,]+(\.0+)?(\s|$)/.test(text)
const useTrimBalanceWhenSettled = text => {
  const [settledText, setSettledText] = useState(null)
  const [actionNonce, setActionNonce] = useState(0)
  useEffect(() => {
    const onAction = () => setActionNonce(n => n + 1)
    window.addEventListener('pointerdown', onAction)
    window.addEventListener('keydown', onAction)
    return () => {
      window.removeEventListener('pointerdown', onAction)
      window.removeEventListener('keydown', onAction)
    }
  }, [])
  useEffect(() => {
    setSettledText(null)
    if (!isIntegerValueText(text)) return undefined
    const timer = setTimeout(() => setSettledText(text), SETTLED_BALANCE_TRIM_DELAY_MS)
    return () => clearTimeout(timer)
  }, [text, actionNonce])
  return settledText === text
}

// A pool's own Memory balance, as its own tiny component (rather than inline in the pool-card
// loop below) purely so useTrimBalanceWhenSettled gets its own hook instance per pool — a hook
// can't be called a variable number of times inside a single component's own render.
const PoolBalanceText = ({ bits, poolIndex, large }) => {
  const stableText = formatPoolBalanceStable(bits, poolIndex)
  const trimmed = useTrimBalanceWhenSettled(stableText)
  // The balance self-sizes below this pool's own fixed unit (see formatPoolBalance's own doc
  // comment in engine.js) — capacity itself stays fixed to the pool's own unit (never auto-
  // converting up to the next one), per formatDiskSizeInPoolUnit's own doc comment.
  const balance = trimmed ? formatPoolBalance(bits, poolIndex) : formatPoolBalanceStable(bits, poolIndex)
  return <BalanceText $large={large}><AlignedAmount text={balance} /></BalanceText>
}

const clampPercent = value => Math.min(100, Math.max(0, value))

const BAR_HEIGHT = 8

// Three columns (side text | bar | side text) so the bar is truly centered whatever the side widths.
const SubRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 40% 1fr;
  align-items: center;
  gap: ${props => props.theme.space.sm};
  width: 100%;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
`

const CapacityText = styled.span`
  justify-self: start;
  text-align: left;
  color: ${props => props.theme.color.textMuted};
  white-space: nowrap;
`

const BonusText = styled.span`
  justify-self: end;
  font-weight: 600;
  color: ${props => props.theme.color.warn};
  white-space: nowrap;
`

const BarTrack = styled.div`
  position: relative;
  min-width: 0;
  height: ${BAR_HEIGHT}px;
  border-radius: ${props => props.theme.radius.pill};
  background: transparent;
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

// The tap emoji is yellow, the same hue as the bonus bar it sits on in the dark theme; a thin dark
// outline (the same in both themes — a light halo would glow on the light theme's brown bar) keeps
// it legible there.
const TapIcon = styled.span`
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.85));
`

// Second row under the title row: Capacity under the section name (left), the tap bonus under the
// Speed/Bandwidth figure (right, "+x% 👆"), and between them a narrow bonus bar that only shows
// while a bonus is active (the fill-based multiplier itself is the tinted Speed figure, see
// getSpeedColor/formatSpeedText).
const CapacityBonusRow = ({ capacityText, bonusPercent = 0, ariaLabel }) => {
  const clampedBonus = Math.min(FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT, Math.max(0, bonusPercent))
  const hasBonus = clampedBonus > 0
  return (
    <SubRow>
      <CapacityText>📦 {capacityText}</CapacityText>
      {hasBonus && (
        <BarTrack
          role="progressbar"
          aria-label={`${ariaLabel} tap bonus`}
          aria-valuenow={Math.round(clampedBonus)}
          aria-valuetext={`+${Math.round(clampedBonus)}%`}
          aria-valuemin={0}
          aria-valuemax={FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT}
        >
          <BarFillBonus $widthPercent={(clampedBonus / FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT) * 100} />
        </BarTrack>
      )}
      {hasBonus && <BonusText>+{Math.round(clampedBonus)}% <TapIcon>👆</TapIcon></BonusText>}
    </SubRow>
  )
}

// Red (FILL_MULTIPLIER_MIN_PERCENT) → blue (100%) → green (FILL_MULTIPLIER_MAX_PERCENT and above).
const SPEED_COLOR_STOPS = [
  [FILL_MULTIPLIER_MIN_PERCENT, [229, 72, 77]],
  [100, [59, 130, 246]],
  [FILL_MULTIPLIER_MAX_PERCENT, [48, 164, 108]],
]

const getSpeedColor = percent => {
  const last = SPEED_COLOR_STOPS.length - 1
  if (percent <= SPEED_COLOR_STOPS[0][0]) return `rgb(${SPEED_COLOR_STOPS[0][1].join(',')})`
  if (percent >= SPEED_COLOR_STOPS[last][0]) return `rgb(${SPEED_COLOR_STOPS[last][1].join(',')})`
  const upper = SPEED_COLOR_STOPS.findIndex(([stop]) => percent <= stop)
  const [fromStop, fromRgb] = SPEED_COLOR_STOPS[upper - 1]
  const [toStop, toRgb] = SPEED_COLOR_STOPS[upper]
  const t = (percent - fromStop) / (toStop - fromStop)
  return `rgb(${fromRgb.map((c, i) => Math.round(c + (toRgb[i] - c) * t)).join(',')})`
}

// Truncates (never overstates) the leading number of an already-unit-formatted amount to 3
// significant digits, e.g. "1.2345 KB" -> "1.23 KB".
const formatSpeedText = formatted =>
  formatted.replace(/^[\d,]*\.?\d+/, match => {
    const value = Number(match.replace(/,/g, ''))
    if (value <= 0) return '0'
    const scale = 10 ** (Math.floor(Math.log10(value)) - 2)
    return String(Number((Math.floor(value / scale + 1e-9) * scale).toPrecision(12)))
  })

// Before intro.mainGameUnlocked this page is a mandatory gate with no way out via Tiers (AppNav
// still shows Guide/More). Once unlocked, AppNav's Foundry item reopens it at any time — nothing
// here is read-only. Data Stream + per-pool Memory/Storage are continuous sections on this one
// screen (no second-level tabs). Forced priority: Disk Fill > Speed > Provision Disk > Compute.
// focusNonce is accepted for App.jsx parity with MainPage; Foundry no longer has a tab to reset.
const ByteFoundryPage = ({ game, focusNonce: _focusNonce = 0 }) => {
  const { actions, dismissOfflineProgress, offlineProgress, state } = game
  const { intro } = state

  const isFull = intro.bits >= intro.capacity
  const dataStreamBalanceTrimmed = useTrimBalanceWhenSettled(
    formatMemoryBalanceValue(intro.bits, intro.capacity, intro.byteCreated, true),
  )
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
  // pool's own Bandwidth figure's "/s" convention rather than the
  // longer "bytes/sec" this used to spell out.
  const dataStreamRateText = !intro.byteCreated
    ? null
    : `${formatSpeedText(formatBitsInNearestUnit(productionRate * getDataStreamMultiplierPercent(intro) / 100))}/s`
  // Fill-based multiplier (see FILL_MULTIPLIER_* in game/layers.js): productionRate above stays
  // exactly what applies at 100% of this — the real per-tick delivery scales by this percent
  // instead (see getDataStreamEffectMultiplier in game/engine).
  const dataStreamMultiplierPercent = getDataStreamMultiplierPercent(intro)
  // Matches tapIntroBit's own post-reveal no-op guard (engine.js) — only relevant once Storage
  // pools are revealed (visiblePoolCount >= 1), the same condition that switches the tap itself
  // from a direct bit credit into a multiplier-bonus tap.
  const dataStreamMultiplierCapped = visiblePoolCount >= 1 && (intro.dataStreamTapBonusPercent ?? 0) >= FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT
  // Every size ever reached (plus the ladder's current offer) — continuous Storage section on
  // this same screen, ascending via getDiskSizesToShow.

  // Starting the next disk's build stays on this page (the Byte Foundry's own core loop). Ranked
  // third in the forced priority order — see isProvisionDiskTurnAvailable. Every shown size's
  // DiskArrayRow (Cache then Disks per size, ascending) renders below as continuous sections.
  const diskSize = getDiskSize(state)
  const diskCost = getDiskCost(state, diskSize)
  const diskPassesRequired = getDiskProvisionPassesRequired(state, diskSize)
  const diskPoolIndex = getPoolIndexForDiskSize(diskSize)
  const diskPoolBufferBits = getPoolBufferBits(state, diskPoolIndex)
  // The read cache always gets first claim on the buffer (getPoolCacheReservationBits) — mirror
  // that same reservation here so the UI's own affordability/progress readings never credit bits
  // that isProvisionDiskAvailable/provisionDisk themselves treat as unavailable to spend.
  const diskPoolSpendableBufferBits = Math.max(0, diskPoolBufferBits - getPoolCacheReservationBits(state, diskPoolIndex))
  const diskLadderExhausted = isDiskLadderExhaustedForActivePools(state)
  const diskSizesToShow = storageRevealed ? getDiskSizesToShow(state) : []
  const canStartDiskBuild = isProvisionDiskTurnAvailable(state)
  const diskBuildInProgress = intro.diskBuild
  // The build cost is paid in diskPassesRequired passes of the disk's own face-value size each (N
  // for the array's Nth disk, capped at DISK_BUILD_COST_MULTIPLIER — see provisionDisk/
  // getDiskProvisionPassesRequired in game/engine) — "blocked by priority" now only needs a single
  // pass's worth in the SPENDABLE buffer (cache reservation excluded), not the whole cost, to be a
  // real (if lower-priority) option.
  const diskBuildBlockedByPriority = !diskLadderExhausted && diskPoolSpendableBufferBits >= diskSize && !canStartDiskBuild && !diskBuildInProgress
  // Clamped at diskPassesRequired: a save carrying a diskProvisionPasses value banked under an
  // earlier flat-multiplier version of this ladder (now exceeding a smaller ordinal's own
  // requirement) would otherwise display a nonsensical "N/M" with N > M until the engine's own
  // provisionDisk clamp self-heals it on the next call — this only affects what's SHOWN, not the
  // stored value or the engine's own funding math (see getDiskProvisionPassesRequired in
  // game/engine).
  const diskPassesCollected = Math.min(diskPassesRequired, getDiskProvisionPassesCollected(state, diskSize))
  // The button's own existence already signals eligibility — no need to preview a fill from
  // whatever the pool buffer happens to be holding (accumulated for unrelated reasons, e.g. cache
  // fill) before the player has ever engaged this build. Progress only starts rendering once at
  // least one real pass has been collected or the build has been queued (see
  // handleProvisionDiskClick below) — i.e., the player has actually clicked at least once.
  const diskBuildEngaged = diskPassesCollected > 0 || intro.diskBuildQueued
  const diskBuildProgress = diskBuildInProgress
    ? clampPercent(100 - (diskBuildInProgress.remainingSeconds / diskBuildInProgress.totalSeconds) * 100)
    : diskLadderExhausted
      ? 100
      : !diskBuildEngaged
        ? 0
        // Already-collected passes are permanent progress; whatever's currently sitting in the
        // SPENDABLE buffer (cache reservation excluded — up to one more pass' worth) counts toward
        // the next one, so the bar keeps moving smoothly between clicks rather than jumping only
        // once a whole pass fires, and never advances on bits the next cache-fill tick would
        // actually consume instead.
        : clampPercent(((diskPassesCollected * diskSize + Math.min(diskPoolSpendableBufferBits, diskSize)) / diskCost) * 100)
  const diskRedeemTierName = getDiskRedeemTierName(state, diskSize)
  const capacityUpgradeArmable = isMemoryCapacityUpgradeArmable(state)
  const speedUpgradeArmable = isSpeedUpgradeArmable(state)
  const capacityUpgradeQueued = Boolean(intro.capacityUpgradeQueued)
  const speedUpgradeQueued = Boolean(intro.speedUpgradeQueued)
  const upgradeRunning = capacityUpgradeQueued || speedUpgradeQueued
  const capacityUpgradeCost = intro.capacity
  const speedUpgradeCost = getSpeedUpgradeCostBits(intro)
  // Capacity doubles on its own button; Speed (derived from its own basis, which trails Capacity)
  // alternates ×1.5 and ×4/3 per upgrade (see getDataStreamSpeedBytesPerSecond).
  const nextCapacity = intro.capacity * INTRO_CAPACITY_DOUBLING_STEP
  const nextCapacityText = formatMemoryCapacityValue(nextCapacity, true)
  const nextRate = getIntroProductionRate({ ...intro, speedCapacity: speedUpgradeCost * INTRO_CAPACITY_DOUBLING_STEP })
  const nextRateText = `${formatBitsInNearestUnit(nextRate)}/s`
  const speedGainText = productionRate > 0 ? `×${Number((nextRate / productionRate).toFixed(2))}` : ''

  const combineProgress = clampPercent((intro.bits / INTRO_BYTE_COMBINE_COST) * 100)
  const capacityUpgradeProgress = clampPercent(((intro.capacityUpgradeProgress ?? 0) / capacityUpgradeCost) * 100)
  const speedUpgradeProgress = clampPercent(((intro.speedUpgradeProgress ?? 0) / speedUpgradeCost) * 100)
  const runningProgress = speedUpgradeQueued ? speedUpgradeProgress : capacityUpgradeProgress
  // The bar fills at 100% of base Speed, so time left is the remaining cost over that rate.
  const runningRemainingBits = speedUpgradeQueued
    ? speedUpgradeCost - (intro.speedUpgradeProgress ?? 0)
    : capacityUpgradeCost - (intro.capacityUpgradeProgress ?? 0)
  const runningTimeLeftText = formatUpgradeTimeLeft(productionRate > 0 ? runningRemainingBits / productionRate : Infinity)
  const currentCapacityText = formatMemoryCapacityValue(intro.capacity, true)
  const currentRateText = `${formatBitsInNearestUnit(productionRate)}/s`
  const fullProgress = clampPercent((intro.bits / intro.capacity) * 100)

  // The shared Provision Disk control (one ladder spanning every pool, not per-pool) — rendered
  // in the Data Stream card's own actions, directly below Upgrade Data Stream; hidden only while
  // the pool its current offer belongs to is rebuilding after a pool-local reset.
  // Clicking no longer requires this disk's very FIRST pass to already be banked. Once at least one
  // pass has ever been collected, provisionDisk itself already auto-arms intro.diskBuildQueued so
  // every later pass fires on its own as the buffer refills — but getting that auto-continuation
  // started still required the button's own turn-availability (a full pass banked, nothing
  // outranking it) before it would even accept the FIRST click. queueDiskBuild (implemented for
  // exactly this "queue up before the first pass is even affordable" case — see its own doc
  // comment in engine.js) was never wired to a control. Clicking now calls it whenever the build
  // isn't already turn-available, so the very first pass gets the same "click once, then it just
  // happens" treatment every later pass already has — see docs/DESIGN_HISTORY.md.
  const handleProvisionDiskClick = () => {
    if (canStartDiskBuild) {
      actions.provisionDisk()
    } else {
      actions.queueDiskBuild()
    }
  }
  const diskBuildQueued = intro.diskBuildQueued
  // One explicit status per state, so the button never reads the same while ready, queued, or
  // waiting. Pass count shows whenever it carries information (multi-pass, or any pass banked).
  const diskPassesFraction = `${diskPassesCollected}/${diskPassesRequired}`
  const diskPassesText = diskPassesRequired > 1 || diskPassesCollected > 0 ? ` · ${diskPassesFraction}` : ''
  const diskOfferLabel = `Provision ${formatDiskSize(diskSize)} Disk`
  // A queued build is the only state where provisioning is actually progressing (it fires itself as
  // the buffer allows), so it alone gets the progressive title, the pulse and the hourglass — idle
  // states keep the imperative "Provision …" so the two never read alike.
  const diskProvisioningActive = Boolean(diskBuildQueued) && !diskBuildInProgress && !diskLadderExhausted
  const diskBuildStatus = diskBuildInProgress
    ? { icon: '🏗', label: `Provisioning ${formatDiskSize(diskBuildInProgress.size)} Disk`, status: `${Math.ceil(diskBuildInProgress.remainingSeconds)}s left` }
    : diskLadderExhausted
      ? { icon: '✅', label: `All Pools Complete (${formatDiskSize(diskSize)})`, status: null }
      : diskBuildQueued
        ? {
            icon: '⏳',
            label: `Provisioning ${formatDiskSize(diskSize)} Disk`,
            status: `${diskPassesCollected > 0 ? diskPassesFraction : 'Queued'} · ${canStartDiskBuild ? 'funding' : diskBuildBlockedByPriority ? 'after disk fill' : 'needs buffer'}`,
          }
        : canStartDiskBuild
          ? { icon: '🏦', label: diskOfferLabel, status: `Ready · ${COST_ICON} ${formatDiskSize(diskCost)}${diskPassesText}` }
          : {
              icon: '🏦',
              label: diskOfferLabel,
              status: `${COST_ICON} ${formatDiskSize(diskCost)}${diskPassesText} · tap to queue`,
              reason: diskBuildBlockedByPriority ? 'disk fill comes first' : 'pool buffer too low',
            }
  const provisionDiskButton = (
    <Button
      aria-label={diskBuildInProgress ? 'disk array rebuilding' : diskLadderExhausted ? 'disk ladder complete' : 'provision disk'}
      aria-description={diskBuildStatus.reason ? `${diskBuildStatus.status} (${diskBuildStatus.reason})` : diskBuildStatus.status ?? undefined}
      disabled={!!diskBuildInProgress || diskLadderExhausted}
      onClick={handleProvisionDiskClick}
      title={
        diskBuildInProgress
          ? `Provisioning ${formatDiskSize(diskBuildInProgress.size)} — ${Math.ceil(diskBuildInProgress.remainingSeconds)}s (array offline)`
          : diskLadderExhausted
            ? `All ${getStoragePoolCount()} storage pools are complete through ${formatDiskSize(diskSize)}`
            : diskBuildQueued
              ? `Queued — fires itself the instant ${diskBuildBlockedByPriority ? 'it is your turn' : 'enough is banked'} (${diskPassesCollected}/${diskPassesRequired} passes so far)`
              : canStartDiskBuild
                ? (diskRedeemTierName
                  ? `Costs ${formatDiskSize(diskCost)}, paid in ${diskPassesRequired} pass${diskPassesRequired === 1 ? '' : 'es'} of ${formatDiskSize(diskSize)} each (${diskPassesCollected}/${diskPassesRequired} collected) — creates an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, redeemable right away for a free ${diskRedeemTierName} once full`
                  : `Costs ${formatDiskSize(diskCost)}, paid in ${diskPassesRequired} pass${diskPassesRequired === 1 ? '' : 'es'} of ${formatDiskSize(diskSize)} each (${diskPassesCollected}/${diskPassesRequired} collected) — creates an empty ${formatDiskSize(diskSize)} container; its cache auto-fills it, but it won't be redeemable until its own fixed corresponding tier reaches its matching level`)
                : diskBuildBlockedByPriority
                  ? 'Redeem a full Disk first — click to queue this build so it fires itself the instant it is your turn'
                  : `Not enough banked yet for the next pass (${diskPassesCollected}/${diskPassesRequired} collected) — click to queue this build so it fires itself as the buffer fills`
      }
      type="button"
      variant={diskLadderExhausted ? 'neutral' : diskBuildQueued ? 'smart' : canStartDiskBuild ? 'info' : 'neutral'}
      $progress={diskBuildProgress}
      $pulse={diskProvisioningActive}
    >
      <MilestoneButtonContent>
        <span>{diskBuildStatus.icon} {diskBuildStatus.label}{diskProvisioningActive ? '…' : ''}</span>
        {diskBuildStatus.status && <MilestoneCostLine>{diskBuildStatus.status}</MilestoneCostLine>}
      </MilestoneButtonContent>
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
          title={intro.mainGameUnlocked && !isFull && dataStreamMultiplierCapped ? `Tap bonus already at the ${FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT}% cap` : undefined}
          $progress={fullProgress}
          $tappable={intro.mainGameUnlocked}
        >
          <TileHeader>
          <TitleRow>
            <SectionTitle>Data Stream</SectionTitle>
            <BalanceText $large={!(intro.byteCreated && (intro.dataStreamTapBonusPercent ?? 0) > 0)}>
              <AlignedAmount text={formatMemoryBalanceValue(intro.bits, intro.capacity, intro.byteCreated, !dataStreamBalanceTrimmed)} />
            </BalanceText>
            {dataStreamRateText && (
              <SpeedText $centered={!(intro.dataStreamTapBonusPercent > 0)} $color={getSpeedColor(dataStreamMultiplierPercent)} title={`Speed at ${Math.round(dataStreamMultiplierPercent)}% fill multiplier`}>
                ⚡ {dataStreamRateText}
              </SpeedText>
            )}
          </TitleRow>
          <CapacityBonusRow
            capacityText={formatMemoryCapacityValue(intro.capacity, intro.byteCreated)}
            bonusPercent={intro.dataStreamTapBonusPercent ?? 0}
            ariaLabel="data stream fill-based speed multiplier"
          />
          </TileHeader>
          <VisuallyHidden
            role="progressbar"
            aria-label="data stream bit balance"
            aria-valuenow={intro.bits}
            aria-valuemin={0}
            aria-valuemax={intro.capacity}
          />
        </FillableStatCard>

        {(canCombine || intro.byteCreated) && (
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

          {/* Two upgrade buttons; while either runs they are replaced by one inert status bar (aria-disabled,
              not `disabled`, so it keeps its colors and pulse) filled by the running upgrade's progress.
              No cancel — the buttons return when the upgrade completes. */}
          {intro.byteCreated && (
            <MilestonesRow>
              {upgradeRunning ? (
                <Button
                  aria-label={speedUpgradeQueued ? 'upgrade speed' : 'upgrade capacity'}
                  aria-disabled
                  style={{ pointerEvents: 'none', cursor: 'default' }}
                  title={speedUpgradeQueued
                    ? 'Upgrading Speed — pulling the Data Stream\'s base Speed into the bar'
                    : `Upgrading to ${nextCapacityText} — pulling the Data Stream's base Speed into the bar`}
                  type="button"
                  variant="prestige"
                  $progress={runningProgress}
                  $pulse
                >
                  <MilestoneButtonContent>
                    <span>{speedUpgradeQueued ? '⏫ Upgrading Speed…' : '⏫ Upgrading Capacity…'} ({Math.floor(runningProgress)}%)</span>
                    <MilestoneCostLine>
                      {speedUpgradeQueued
                        ? `⚡ ${currentRateText} → ${nextRateText} · ⏳ ${runningTimeLeftText}`
                        : `📦 ${currentCapacityText} → ${nextCapacityText} · ⏳ ${runningTimeLeftText}`}
                    </MilestoneCostLine>
                  </MilestoneButtonContent>
                  <VisuallyHidden
                    role="progressbar"
                    aria-label="data stream upgrade progress"
                    aria-valuenow={Math.round(runningProgress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </Button>
              ) : (
                <>
                  <Button
                    aria-label="upgrade data stream capacity"
                    disabled={!capacityUpgradeArmable}
                    onClick={actions.pickIntroCapacityMilestone}
                    title={capacityUpgradeArmable
                      ? 'Pull the Data Stream\'s base Speed into the upgrade; its bar filling doubles Capacity'
                      : 'Capacity is already at its maximum'}
                    aria-description={capacityUpgradeArmable ? `Costs ${formatBitsInNearestUnit(capacityUpgradeCost)}; capacity ${nextCapacityText} after upgrading` : undefined}
                    type="button"
                    variant={capacityUpgradeArmable ? 'prestige' : 'neutral'}
                  >
                    <MilestoneButtonContent>
                      <span>Upgrade Capacity</span>
                      <MilestoneCostLine>
                        {capacityUpgradeArmable
                          ? `${COST_ICON} ${formatBitsInNearestUnit(capacityUpgradeCost)} · 📦 ×${INTRO_CAPACITY_DOUBLING_STEP}`
                          : '📦 Max capacity'}
                      </MilestoneCostLine>
                    </MilestoneButtonContent>
                  </Button>
                  <Button
                    aria-label="upgrade data stream speed"
                    disabled={!speedUpgradeArmable}
                    onClick={actions.queueIntroSpeedUpgrade}
                    title={speedUpgradeArmable
                      ? 'Pull the Data Stream\'s base Speed into the upgrade; its bar filling raises Speed'
                      : 'Base Speed cannot exceed the square root of Capacity — upgrade Capacity first'}
                    aria-description={speedUpgradeArmable ? `Costs ${formatBitsInNearestUnit(speedUpgradeCost)}; speed ${nextRateText} after upgrading` : undefined}
                    type="button"
                    variant={speedUpgradeArmable ? 'prestige' : 'neutral'}
                  >
                    <MilestoneButtonContent>
                      <span>Upgrade Speed</span>
                      <MilestoneCostLine>
                        {speedUpgradeArmable
                          ? `${COST_ICON} ${formatBitsInNearestUnit(speedUpgradeCost)} · ⚡ ${speedGainText}`
                          : '⚡ Needs Capacity'}
                      </MilestoneCostLine>
                    </MilestoneButtonContent>
                  </Button>
                </>
              )}
            </MilestonesRow>
          )}

        </ActionsRow>
        )}
      </DataStreamCard>

      {storageRevealed && !isStoragePoolRebuilding(state, diskPoolIndex) && (
        <ProvisionCard aria-label="Provision Disk">{provisionDiskButton}</ProvisionCard>
      )}

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
        // Matches tapPoolBuffer's own no-op guards (engine.js) — the button must be disabled for
        // both, not just a full buffer, or a capped tap silently does nothing with no feedback.
        const poolTapBonusPercent = getPoolTapBonusPercent(state, poolIndex)
        const poolMultiplierCapped = poolTapBonusPercent >= FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT
        // tickDataLakePoolDrain (engine.js) feeds the lake straight from this pool's buffer whenever
        // isDataLakePoolDrainAvailable. A tap can't speed the lake up then (the drain is capped at
        // Bandwidth), so the tile is disabled.
        const lakeDraining = isDataLakePoolDrainAvailable(state, poolIndex)
        const poolSizes = diskSizesToShow.filter(size => getPoolIndexForDiskSize(size) === poolIndex)
        const isExpanded = visibleExpandedPool === poolIndex
        const poolTapDisabled = poolBufferFull || lakeDraining || poolMultiplierCapped
        return (
          <PoolCard key={poolIndex} aria-label={`pool ${poolIndex}`}>
            {/* One tile: a stretched PoolTapButton (tapPoolBuffer/FILL_MULTIPLIER_* in game/engine and
                game/layers) sits behind the readouts, and the "<symbol> Pool" title is its own
                sibling PoolTitleToggle button (expand/collapse) — never nested in the tap button. */}
            <PoolTile $progress={poolBufferPercent} $expanded={isExpanded}>
              <PoolTapButton
                type="button"
                onClick={() => actions.tapPoolBuffer(poolIndex)}
                disabled={poolTapDisabled}
                aria-label={`tap pool ${poolIndex} memory`}
                title={
                  lakeDraining
                    ? 'The Data Lake is draining this buffer — tapping cannot speed it up'
                    : poolBufferFull
                    ? undefined
                    : poolMultiplierCapped
                      ? `Tap bonus already at the ${FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT}% cap`
                      : undefined
                }
              />
              <PoolTileContent>
                <TileHeader>
                <TitleRow>
                  <SectionTitle>
                    <PoolTitleToggle
                      type="button"
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'collapse' : 'expand'} pool ${poolIndex}`}
                      onClick={() => setExpandedPoolIndex(isExpanded ? 0 : poolIndex)}
                    >
                      <PoolTitleSymbol aria-hidden="true">{TIER_DEFINITIONS[poolIndex - 1]?.symbol ?? `#${poolIndex}`}</PoolTitleSymbol>
                      <span>Pool</span>
                    </PoolTitleToggle>
                  </SectionTitle>
                  <PoolBalanceText bits={poolBufferBits} poolIndex={poolIndex} large={poolTapBonusPercent <= 0} />
                  <SpeedText $centered={poolTapBonusPercent <= 0} $color={getSpeedColor(poolMultiplierPercent)} title={`Bandwidth at ${Math.round(poolMultiplierPercent)}% fill multiplier`}>
                    ⚡ {formatSpeedText(formatDiskSize(poolBandwidth * poolMultiplierPercent / 100))}/s
                  </SpeedText>
                </TitleRow>
                <CapacityBonusRow
                  capacityText={formatDiskSizeInPoolUnit(poolBufferCapacity, poolIndex)}
                  bonusPercent={poolTapBonusPercent}
                  ariaLabel={`pool ${poolIndex} fill-based bandwidth multiplier`}
                />
                </TileHeader>
                <VisuallyHidden
                  role="progressbar"
                  aria-label={`pool ${poolIndex} memory buffer`}
                  aria-valuenow={Math.round(poolBufferPercent)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </PoolTileContent>
            </PoolTile>
            {!isExpanded && (
              <PoolLakeHeader>
                <DataLakePanel actions={actions} state={state} bare section="header" tierIndex={poolIndex} />
              </PoolLakeHeader>
            )}
            {isExpanded && (
              <PoolBody>
                {poolSizes.map(size => (
                  <DiskArrayRow key={size} actions={actions} size={size} state={state} />
                ))}
                <DataLakePanel actions={actions} state={state} bare tierIndex={poolIndex} />
              </PoolBody>
            )}
          </PoolCard>
        )
      })}

      {!intro.mainGameUnlocked && (
        <TapArea
          aria-label="tap to generate a bit"
          disabled={isFull || dataStreamMultiplierCapped}
          title={!isFull && dataStreamMultiplierCapped ? `Tap bonus already at the ${FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT}% cap` : undefined}
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
