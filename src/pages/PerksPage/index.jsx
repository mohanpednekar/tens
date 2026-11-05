import BuyMaxToggle from 'components/BuyMaxToggle'
import Button, { ButtonIcon, ButtonLabel, VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import Switch from 'components/Switch'
import {
  formatAmount,
  getAutobuyerIntervalMaxLevel,
  getAutobuyerSpeedUpgradeMaxLevel,
  getAutobuyerBulkLevels,
  getAutomationIntervalMaxLevel,
  getAutomationIntervalSeconds,
  getAutomationIntervalUpgradeCost,
  getTierTickspeedIntervalMaxLevel,
  getTierTickspeedIntervalSeconds,
  getTierTickspeedIntervalUpgradeCost,
  isAutomationIntervalChainUnlocked,
  getAutobuyerIntervalSeconds,
  getAutobuyerIntervalUpgradeCost,
  getAutobuyerUnlockMilestone,
  getAutomationUnlockCost,
  getFlopsAutobuyerUnlockEra,
  getPrestigeDoublePpUpgradeCost,
  getPrestigePowersPerPp,
  getPrestigePpPerPower,
  getTierTickspeedAutobuyerMilestone,
  isBuyMaxUnlocked,
  isComputeCoreConversionUnlocked,
  isProductionFrozen,
  isOverflowModeUnlocked,
} from 'game/engine'
import {
  COMPUTE_AUTO_BOOST_UNLOCK_COST,
  COMPUTE_FLOPS_TIER_DEFINITIONS,
  PRESTIGE_SPEED_BONUS_UNLOCK_COST,
  OVERFLOW_MODE_MAX_INTERVAL_SECONDS,
  TIER_DEFINITIONS,
  XP_TICKSPEED_AUTOBUYER_UNLOCK_COST,
} from 'game/layers'
import { hasAffordableAutomationPerk, hasAffordablePrestigePerk } from 'game/navAttention'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'

// Firmware (formerly Perks) — its own AppNav destination (page id 'perks', revealed by isPerksPageRevealed), grouped by
// feature rather than by purchase kind, in two icon tabs:
// - 🤖 Automation: ONE row per automation covering its whole lifecycle — locked (🔒 milestone badge
//   or 🔓 PP unlock button) → owned (pause/resume Switch in the lead cell, `every <interval>` subtext,
//   ⏫ speed upgrade button). Global automations, tier autobuyers, tier tickspeed autobuyers, Auto
//   Boost, and Reboot-unlocked Compute autobuyers. Each milestone is shown exactly once, here.
// - ✦ Prestige: non-automation perks that stand on their own — Compression (leveled), Production
//   speed bonus (one-time), DeGoogol (milestone), and the Buy max purchasing toggle.

const RootDiv = styled.main`
  width: min(880px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
  font-variant-numeric: tabular-nums;
`

const Header = styled.header`
  color: ${props => props.theme.color.text};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${props => props.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`

// Spendable balance, shown where it's spent (mirrors MainPage's sticky PP card label).
const PpBalance = styled.p`
  color: ${props => props.theme.color.textMuted};
  margin: 0.2rem 0 0;
`

const TabBar = styled.div`
  display: flex;
  gap: 0.5rem;
`

const TabButton = styled(Button)`
  flex: 1;
  font-size: 1.15rem;
  position: relative;
`

// Affordability cue on the Automation/Prestige tabs — same green as AppNav attention dots.
const NavDot = styled.span`
  background: ${props => props.theme.color.good};
  border-radius: 50%;
  height: 0.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.3rem;
  width: 0.5rem;
`

// Each tab groups its rows into a handful of labeled categories — one StatCard per category with
// lean, unboxed rows separated by a thin divider, so N rows cost one card's worth of chrome.
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`

const Category = styled(StatCard)`
  gap: 0.4rem;
`

const CategoryHeading = styled.h2`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

// Every Prestige row is a CSS grid (label | action) so columns line up row-to-row regardless of
// content width. Fits a 320px phone.
const Row = styled.div`
  align-items: center;
  column-gap: 0.6rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  min-height: 2.75rem;
  padding: 0.35rem 0;

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }

  & > :last-child {
    justify-self: end;
  }
`

// Automation categories lay their entries out as a grid of compact cells, optimised for the end
// state: a capped (maxed) automation is just "label + Switch" on one line — Flops cells go
// three-up on a phone, global cells one per row (tiers use TierPair below). Before the cap a terse interval sits inline in
// the head and the cell grows one line for its full-width upgrade/unlock button — an accepted trade-off.
const CellGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 0.4rem;
  /* $narrow: tier/Flops cells show only the symbol (KB, MF…), so three fit a 320px phone; named
     (global) cells need a full row on a phone and go two-up on wider screens. */
  grid-template-columns: repeat(auto-fill, minmax(${props => (props.$narrow ? '4.75rem' : '15rem')}, 1fr));
`

// A tier's compact label: visible symbol, full name for assistive tech and the tooltip.
const TierSymbol = ({ tier }) => (
  <span title={tier.name} style={{ flexShrink: 0 }}>
    <VisuallyHidden>{tier.name}</VisuallyHidden>
    <span aria-hidden="true">{tier.symbol}</span>
  </span>
)

const Cell = styled.div`
  background: ${props => (props.$bare ? 'transparent' : props.theme.color.surfaceSunken)};
  border: ${props => (props.$bare ? 'none' : `1px solid ${props.theme.color.border}`)};
  border-radius: ${props => props.theme.radius.sm};
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
  font-size: ${props => (props.$narrow ? '0.88em' : '1em')};

  /* Narrow (symbol-only) cells: a slightly smaller Switch so even "MB" + Switch fit three-up at 320px. */
  ${props => props.$narrow && `
    & button[aria-pressed] {
      flex-shrink: 0;
      zoom: 0.85;
    }
  `}
  padding: ${props => (props.$bare ? '0' : '0.35rem 0.3rem 0.35rem 0.4rem')};
`

// One tier's two autobuyers, laid out like that tier's Factory row: symbol, then the ⚙ tickspeed
// autobuyer on the left half (the row's tickspeed button sits bottom-left) and the 🤖 autobuyer on the
// right half (the Buy button sits bottom-right). Same accent stripe as the Factory row. With both
// capped a tier is one line.
const TierPair = styled.div`
  align-items: start;
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => props.theme.color.border};
  border-left: 3px solid ${props => props.$accent};
  border-radius: ${props => props.theme.radius.sm};
  column-gap: 0.45rem;
  display: grid;
  grid-template-columns: 1.9rem minmax(0, 1fr) minmax(0, 1fr);
  padding: 0.35rem 0.35rem 0.35rem 0.45rem;

  & > :first-child {
    align-items: center;
    display: flex;
    font-size: 0.88em;
    font-weight: 600;
    min-height: 1.9rem;
  }
`

const TierPairList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const CellHead = styled.div`
  align-items: center;
  display: flex;
  /* $wrap (inline-action cells): when a long cost won't fit, the button drops to its own line
     instead of the name collapsing to an ellipsis — one line whenever it fits. */
  flex-wrap: ${props => (props.$wrap ? 'wrap' : 'nowrap')};
  gap: 0.25rem;
  row-gap: 0.3rem;
  justify-content: space-between;
  min-height: 1.9rem;

  & > span:first-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

// Current interval (or bulk) inline in a cell's head, between label and Switch — never its own line.
const InlineMeta = styled.span`
  color: ${props => props.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.8em;
  font-weight: 400;
  margin-left: auto;
  white-space: nowrap;
`

// Wide (global) cells keep their upgrade/unlock button on the head line itself, right-aligned.
const InlineAction = styled.span`
  flex-shrink: 0;
  margin-left: auto;

  & > button {
    min-width: 3.75rem;
    padding: 0.35em 0.5em;
  }

  /* Glyph dropped inline (colour already says upgrade vs unlock) so the name keeps its width. */
  & > button > :first-child {
    display: none;
  }
`

// Full-width action under a cell's head (upgrade or unlock button). Narrow cells drop the button's
// leading glyph (its colour already says upgrade vs unlock) so the PP cost keeps the whole width.
const CellAction = styled.div`
  & > button {
    min-width: 0;
    padding-left: 0.4em;
    padding-right: 0.4em;
    width: 100%;
  }

  ${props => props.$narrow && `
    & > button > :first-child {
      display: none;
    }

    /* Long costs (1.6e15 PP) wrap rather than ellipsize, so the price is never hidden. */
    & > button > span {
      overflow: visible;
      overflow-wrap: anywhere;
      white-space: normal;
    }
  `}
`

const RowLabel = styled.span`
  font-weight: 600;
  min-width: 0;
`

// Leading icon in a fixed-width, centered cell so every row's name starts at the same x, whether
// the glyph is a wide emoji or a narrow text symbol (✦, ♾, ⚙).
const RowIcon = styled.span.attrs({ 'aria-hidden': true })`
  display: inline-block;
  margin-right: 0.45rem;
  text-align: center;
  width: 1.5em;
`

// The automation's icon doubling as its live status ("<name> active|paused"), dimmed while paused.
const StatusIcon = styled.span`
  display: inline-block;
  margin-right: 0.45rem;
  opacity: ${props => (props.$dimmed ? 0.55 : 1)};
  text-align: center;
  width: 1.5em;
`

const RowLabelStack = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`

const RowControls = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`

// Indented past the label's RowIcon cell (1.5em of the label's font + its margin) so it lines up
// with the name above it.
const SubText = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.82em;
  font-weight: 400;
  padding-left: calc(1.5em / 0.82 + 0.45rem);
`

const PpButton = styled(Button)`
  font-size: 0.85em;
  gap: 0.35rem;
  min-width: 5.5rem;
  padding: 0.45em 0.7em;
  white-space: nowrap;
`

// $dimmed is the "paused"/"locked" signal — icon-only content, state spelled out in aria-label/title.
const Badge = styled.span`
  align-items: center;
  color: ${props => props.$color};
  display: inline-flex;
  font-size: 0.92em;
  font-variant-numeric: tabular-nums;
  gap: 0.3rem;
  opacity: ${props => (props.$dimmed ? 0.55 : 1)};
  white-space: nowrap;
`

const progressPercent = (numerator, denominator) => Math.min(100, Math.round((numerator / denominator) * 100))

// A free milestone unlock (prestige- or era-count based) not reached yet: 🔒 + target with a hidden
// progressbar (aria-label "<subject> unlocks at <unit> N"). Once reached, the row shows its Switch.
const MilestoneBadge = ({ icon, subject, unit, milestone, current, progressLabel }) => {
  const theme = useTheme()
  return (
    <RowControls>
      <Badge
        $color={theme.color.disabled}
        $dimmed
        aria-label={`${subject} unlocks at ${unit} ${milestone}`}
        title={`${subject} — unlocks at ${unit} ${milestone} (you're at ${unit} ${current})`}
      >
        {icon && `${icon} `}🔒 {milestone}
      </Badge>
      <VisuallyHidden
        role="progressbar"
        aria-label={progressLabel}
        aria-valuenow={Math.min(current, milestone)}
        aria-valuemin={0}
        aria-valuemax={milestone}
      />
    </RowControls>
  )
}

// Static "already owned" marker for a one-time unlock with nothing further to control here.
const UnlockedBadge = ({ name, icon, title }) => {
  const theme = useTheme()
  return (
    <Badge $color={theme.color.good} aria-label={`${name} unlocked`} title={title ?? `${name} unlocked`}>
      {icon} ✓
    </Badge>
  )
}

// PP-costed purchase button with the shared live progress fill + hidden progressbar.
const PpPurchaseButton = ({ ariaLabel, color, cost, points, disabled, onClick, title, icon, label, progressLabel }) => (
  <PpButton
    aria-label={ariaLabel}
    color={disabled ? 'darkgrey' : color}
    disabled={disabled}
    onClick={onClick}
    title={title}
    type="button"
    $progress={progressPercent(points, cost)}
    $progressColor={color}
  >
    <ButtonIcon>{icon}</ButtonIcon>
    <ButtonLabel>{label}</ButtonLabel>
    <VisuallyHidden
      role="progressbar"
      aria-label={progressLabel}
      aria-valuenow={Math.min(points, cost)}
      aria-valuemin={0}
      aria-valuemax={cost}
    />
  </PpButton>
)

// One automation's whole lifecycle in a single compact cell (see CellGrid).
// Head: label + (Switch once owned and pausable | `ownedBadge` | 🔒 `lockedBadge` milestone).
// `subText` (compact interval, e.g. `2.9s` / `×8`) sits inline in the head. Below the head, only while
// there's something left to buy: the full-width `ownedAction` (⏫ speed upgrade) or `lockedAction`
// (🔓 PP unlock) — or, with `inlineAction` (wide global cells), the same button at the end of the head
// line — one line whenever it fits (the head wraps rather than ellipsizing the name). Capped → head only.
const AutomationRow = ({ ariaLabel, narrow = false, bare = false, inlineAction = false, icon, name, label = name, owned, enabled = true, onToggle, toggleLabel, statusTitle, title, subText, lockedBadge, lockedAction, ownedBadge, ownedAction }) => {
  const status = `${name} ${enabled ? 'active' : 'paused'}`
  const action = owned ? ownedAction : lockedAction
  return (
    <Cell $bare={bare} $narrow={narrow} aria-label={ariaLabel} title={title}>
      <CellHead $wrap={inlineAction}>
        <RowLabel>
          {/* Icon-less cells (tier/Flops lists, whose category heading names the kind) keep the
              status for assistive tech only — the Switch already shows it visually. */}
          {owned && onToggle && !icon && (
            <VisuallyHidden role="img" aria-label={status}>{enabled ? 'active ' : 'paused '}</VisuallyHidden>
          )}
          {icon && (owned && onToggle ? (
            <StatusIcon $dimmed={!enabled} role="img" aria-label={status} title={statusTitle}>{icon}</StatusIcon>
          ) : (
            <RowIcon>{icon}</RowIcon>
          ))}
          {label}
        </RowLabel>
        {owned && subText && <InlineMeta>{subText}</InlineMeta>}
        {owned && onToggle && (
          <Switch
            $on={enabled}
            aria-label={toggleLabel}
            aria-pressed={enabled}
            onClick={onToggle}
            title={`${enabled ? 'Pause' : 'Resume'} ${toggleLabel}`}
          />
        )}
        {owned && !onToggle && ownedBadge}
        {!owned && lockedBadge}
        {inlineAction && action && <InlineAction>{action}</InlineAction>}
      </CellHead>
      {!inlineAction && action && <CellAction $narrow={narrow}>{action}</CellAction>}
    </Cell>
  )
}

export const PERKS_TABS = [
  { id: 'automation', icon: '🤖', ariaLabel: 'open automation', title: 'Automation — unlock, pause/resume and speed up every automation' },
  { id: 'prestige', icon: '✦', ariaLabel: 'open prestige', title: 'Prestige — Compression, production speed bonus, Overflow mode and Buy max' },
]

const formatInterval = ms => (ms >= 1000 ? `${Math.round(ms) / 1000} s` : `${Math.round(ms * 10) / 10} ms`)
// Terse inline form for cell heads: `64s`, `2.9s`, `212ms`.
const formatIntervalShort = ms => (ms >= 1000 ? `${Number((ms / 1000).toFixed(ms >= 10000 ? 0 : 1))}s` : `${Math.round(ms)}ms`)

const GLOBAL_AUTOMATIONS = [
  { key: 'speedUp', name: 'Auto Clock Speed', icon: '🌐', owned: s => s.autoGlobalTickspeed ?? false, enabled: s => s.autoGlobalTickspeedEnabled ?? true, setEnabled: 'setAutoGlobalTickspeedEnabled', buy: 'buyTickspeedAutobuyer', canBuy: () => true, unlockTitle: 'Spend Purge Points so the global tickspeed multiplier upgrades itself automatically, forever, whenever affordable' },
  { key: 'restage', name: 'Auto Restage', icon: '🧬', owned: s => s.autoXpTickspeed ?? false, enabled: s => s.autoXpTickspeedEnabled ?? true, setEnabled: 'setAutoXpTickspeedEnabled', buy: 'buyXpTickspeedAutobuyer', canBuy: s => Boolean(s.autoGlobalTickspeed), cost: XP_TICKSPEED_AUTOBUYER_UNLOCK_COST, unlockTitle: 'Spend Purge Points so XP is automatically consumed for Restage whenever possible (each consumption resets every other tier\'s owned quantity and Bits)' },
  { key: 'scaleUp', name: 'Auto Scale Up', icon: '⏩', owned: s => s.autoScaleUp ?? false, enabled: s => s.autoScaleUpEnabled ?? true, setEnabled: 'setAutoScaleUpEnabled', buy: 'buyAutoScaleUp', canBuy: s => Boolean(s.autoGlobalTickspeed), unlockTitle: 'Spend Purge Points so eligible Scale Ups happen automatically until the final tier, where they stay manual for Overclock', statusTitle: enabled => (enabled ? "Scale Up triggers automatically the instant it's eligible" : 'Auto Scale Up is paused — it will not trigger until resumed') },
  { key: 'overclock', name: 'Auto Overclock', icon: '🚀', owned: s => s.autoOverclock ?? false, enabled: s => s.autoOverclockEnabled ?? true, setEnabled: 'setAutoOverclockEnabled', buy: 'buyAutoOverclock', canBuy: s => Boolean(s.autoScaleUp) && Boolean(s.autoXpTickspeed), unlockTitle: 'Spend Purge Points so Overclock is claimed automatically whenever it is eligible' },
  { key: 'purge', name: 'Auto Purge', icon: '✦', owned: s => (s.autoPurge ?? null) !== null, enabled: s => s.autoPurgeEnabled ?? true, setEnabled: 'setAutoPurgeEnabled', buy: 'buyAutoPurge', canBuy: s => Boolean(s.autoOverclock), allowFirstRun: true, unlockTitle: 'Spend Purge Points so Purge happens automatically once your balance reaches 1 Googol Bytes' },
]

const PerksPage = ({ game, focusNonce = 0 }) => {
  const { state, actions } = game
  const theme = useTheme()
  const { purge } = state
  const points = purge.points ?? 0
  const purgeCount = purge.count ?? 0
  const eraCount = state.era?.count ?? 0
  const isFirstRun = purgeCount === 0
  const isFrozen = isProductionFrozen(state)

  const [tab, setTab] = useState('automation')
  useEffect(() => {
    setTab('automation')
  }, [focusNonce])

  const doublePpLevel = state.prestigeDoublePpLevel ?? 0
  const doublePpCost = getPrestigeDoublePpUpgradeCost(doublePpLevel)
  const powersPerPp = getPrestigePowersPerPp(doublePpLevel)
  const ppPerPower = getPrestigePpPerPower(doublePpLevel)
  const canBuyDoublePp = !isFirstRun && points >= doublePpCost
  const doublePpUpgradeSummary = ppPerPower > 1
    ? `${formatAmount(ppPerPower)} PP per power`
    : `1 PP per ${formatAmount(powersPerPp)} power${powersPerPp === 1 ? '' : 's'}`
  const canBuySpeedBonus = !isFrozen && !state.prestigeSpeedBonusUnlocked && points >= PRESTIGE_SPEED_BONUS_UNLOCK_COST

  const isComputeAutoBoostActive = state.computeAutoBoostUnlocked ?? false
  // Stays listed once bought, even after Reboot / Reformat Byte Foundry drops Capacity back below the Boosters threshold.
  const showComputeAutoBoost = isComputeAutoBoostActive || isComputeCoreConversionUnlocked(state)
  const canBuyComputeAutoBoost = !isFrozen && !isComputeAutoBoostActive && points >= COMPUTE_AUTO_BOOST_UNLOCK_COST

  const tabDots = {
    automation: hasAffordableAutomationPerk(state) && 'automation perk available',
    prestige: hasAffordablePrestigePerk(state) && 'prestige perk available',
  }

  // ⏫ speed-upgrade button shared by every owned automation's row (hidden once maxed).
  const speedUpgradeButton = ({ maxed, cost, ariaLabel, label, onClick, progressLabel, title }) => (maxed ? null : (
    <PpPurchaseButton
      ariaLabel={ariaLabel}
      color="#34d399"
      cost={cost}
      disabled={isFrozen || points < cost}
      icon="⏫"
      label={label ?? `${formatAmount(cost)} PP`}
      onClick={onClick}
      points={points}
      progressLabel={progressLabel}
      title={title}
    />
  ))

  const unlockButton = ({ name, cost, canBuy, onClick, title }) => (
    <PpPurchaseButton
      ariaLabel={`Enable ${name} for ${cost} Purge Points`}
      color="#38bdf8"
      cost={cost}
      disabled={!canBuy}
      icon="🔓"
      label={`${formatAmount(cost)} PP`}
      onClick={onClick}
      points={points}
      progressLabel={`${name} PP progress`}
      title={title}
    />
  )

  const renderAutomation = () => (
    <List aria-label="automation firmware page">
      <Category aria-label="global automation category">
        <CategoryHeading>Global Automation</CategoryHeading>
        <CellGrid>
        {/* Every row always listed, in prerequisite order; the engine re-checks every gate. */}
        {GLOBAL_AUTOMATIONS.map(auto => {
          const owned = auto.owned(state)
          const enabled = auto.enabled(state)
          const unlockCost = auto.cost ?? getAutomationUnlockCost(auto.key)
          const chainUnlocked = isAutomationIntervalChainUnlocked(state, auto.key)
          const level = state.automationIntervalLevels?.[auto.key] ?? 0
          const maxed = level >= getAutomationIntervalMaxLevel(auto.key)
          const cost = getAutomationIntervalUpgradeCost(auto.key, level)
          return (
            <AutomationRow
              key={auto.key}
              ariaLabel={`${auto.name.toLowerCase()} row`}
              enabled={enabled}
              icon={auto.icon}
              inlineAction
              // The category heading already says "Automation", so the visible name drops "Auto";
              // every accessible name (status, Switch, buttons) keeps the full "Auto <feature>".
              label={auto.name.replace(/^Auto /, '')}
              lockedAction={unlockButton({
                name: auto.name,
                cost: unlockCost,
                canBuy: !isFrozen && (auto.allowFirstRun || !isFirstRun) && auto.canBuy(state) && points >= unlockCost,
                onClick: actions[auto.buy],
                title: auto.unlockTitle,
              })}
              name={auto.name}
              onToggle={() => actions[auto.setEnabled](!enabled)}
              owned={owned}
              ownedAction={chainUnlocked ? speedUpgradeButton({
                maxed,
                cost,
                ariaLabel: `Upgrade ${auto.name} speed to level ${level + 1} for ${formatAmount(cost)} Purge Points — interval ×0.9`,
                onClick: () => actions.buyAutomationIntervalUpgrade(auto.key),
                progressLabel: `${auto.name} speed PP progress`,
                title: "Spend Purge Points to shorten this automation's interval by 10% (floor 10 ms); cost doubles each level",
              }) : null}
              statusTitle={auto.statusTitle?.(enabled)}
              subText={chainUnlocked && !maxed ? formatIntervalShort(getAutomationIntervalSeconds(state, auto.key) * 1000) : null}
              title={chainUnlocked && maxed ? `${auto.name}: every ${formatInterval(getAutomationIntervalSeconds(state, auto.key) * 1000)} (max)` : undefined}
              toggleLabel={`${auto.name} automation`}
            />
          )
        })}
        </CellGrid>
      </Category>

      <Category aria-label="tier autobuyers category">
        <CategoryHeading>Tier Autobuyers</CategoryHeading>
        <TierPairList>
        {/* All ten tiers stay listed (owned ones included) so unlock history is never lost. */}
        {TIER_DEFINITIONS.map((tier, tierIndex) => {
          const owned = (state.autobuyers[tier.id] ?? null) !== null
          const enabled = state.autobuyersEnabled?.[tier.id] ?? true
          const milestone = getAutobuyerUnlockMilestone(tier.id)
          const level = state.autobuyerIntervalLevels?.[tier.id] ?? 0
          const maxed = level >= getAutobuyerSpeedUpgradeMaxLevel(tier.id)
          const atFloor = level >= getAutobuyerIntervalMaxLevel(tier.id)
          const bulkLevels = owned ? getAutobuyerBulkLevels(state, tier.id) : 1
          const cost = getAutobuyerIntervalUpgradeCost(level)

          const tickOwned = state.tierTickspeedAutobuyer?.[tier.id] ?? false
          const tickEnabled = state.tierTickspeedAutobuyerEnabled?.[tier.id] ?? true
          const tickLevel = state.tierTickspeedIntervalLevels?.[tier.id] ?? 0
          const tickMaxed = tickLevel >= getTierTickspeedIntervalMaxLevel()
          const tickCost = getTierTickspeedIntervalUpgradeCost(tickLevel)
          return (
            <TierPair key={tier.id} $accent={theme.tierAccents[tierIndex % theme.tierAccents.length]} aria-label={`${tier.name} automation`}>
                <TierSymbol tier={tier} />
                <AutomationRow
                  ariaLabel={`${tier.name} tickspeed autobuyer`}
                  enabled={tickEnabled}
                  bare
                  icon="⚙"
                  label=""
                  narrow
                  lockedBadge={(
                    <MilestoneBadge
                      current={purgeCount}
                      milestone={getTierTickspeedAutobuyerMilestone(tier.id)}
                      progressLabel={`${tier.name} tickspeed autobuyer milestone progress`}
                      subject={`${tier.name}'s tickspeed autobuyer`}
                      unit="Purge"
                    />
                  )}
                  name={`${tier.name}'s tickspeed autobuyer`}
                  onToggle={() => actions.setTierTickspeedAutobuyerEnabled(tier.id, !tickEnabled)}
                  owned={tickOwned}
                  ownedAction={speedUpgradeButton({
                    maxed: tickMaxed,
                    cost: tickCost,
                    ariaLabel: `Upgrade ${tier.name}'s tickspeed autobuyer speed to level ${tickLevel + 1} for ${formatAmount(tickCost)} Purge Points — interval ×0.9`,
                    onClick: () => actions.buyTierTickspeedIntervalUpgrade(tier.id),
                    progressLabel: `${tier.name} tickspeed autobuyer speed PP progress`,
                    title: "Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level",
                  })}
                  subText={tickOwned && !tickMaxed ? formatIntervalShort(getTierTickspeedIntervalSeconds(state, tier.id) * 1000) : null}
                  title={tickOwned && tickMaxed ? `${tier.name} tickspeed autobuyer: every ${formatInterval(getTierTickspeedIntervalSeconds(state, tier.id) * 1000)} (max)` : undefined}
                  toggleLabel={`${tier.name}'s tickspeed autobuyer`}
                />
                <AutomationRow
                  ariaLabel={`${tier.name} autobuyer`}
                  enabled={enabled}
                  bare
                  icon="🤖"
                  label=""
                  narrow
                  lockedBadge={(
                    <MilestoneBadge
                      current={purgeCount}
                      milestone={milestone}
                      progressLabel={`${tier.name} autobuyer unlock milestone progress`}
                      subject={`${tier.name}'s autobuyer`}
                      unit="Purge"
                    />
                  )}
                  name={`${tier.name}'s autobuyer`}
                  onToggle={() => actions.setAutobuyerEnabled(tier.id, !enabled)}
                  owned={owned}
                  ownedAction={speedUpgradeButton({
                    maxed,
                    cost,
                    ariaLabel: atFloor
                      ? `Upgrade ${tier.name}'s autobuyer to level ${level + 1} for ${formatAmount(cost)} Purge Points — doubles levels bought per attempt to up to ${bulkLevels * 2}`
                      : `Upgrade ${tier.name}'s autobuyer speed to level ${level + 1} for ${formatAmount(cost)} Purge Points — interval ×0.9`,
                    // Narrow cell: cost only — the subtext already shows the current N/buy, and the
                    // aria-label/title spell out the doubling.
                    label: undefined,
                    onClick: () => actions.buyAutobuyerIntervalUpgrade(tier.id),
                    progressLabel: `${tier.name} autobuyer speed PP progress`,
                    title: atFloor
                      ? 'At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising'
                      : "Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt",
                  })}
                  // At the 10 ms floor the interval never changes, so only the bulk (×N) is worth the space.
                  subText={owned && !maxed ? (bulkLevels > 1 ? `×${bulkLevels}` : formatIntervalShort(getAutobuyerIntervalSeconds(state, tier.id) * 1000)) : null}
                  title={owned && maxed ? `${tier.name} autobuyer: every ${formatInterval(getAutobuyerIntervalSeconds(state, tier.id) * 1000)} · ${bulkLevels}/buy (max)` : undefined}
                  toggleLabel={`${tier.name}'s autobuyer`}
                />
            </TierPair>
          )
        })}
        </TierPairList>
      </Category>

      {showComputeAutoBoost && (
        <Category aria-label="power automation category">
          <CategoryHeading>Power Automation</CategoryHeading>
          <CellGrid>
          {/* No pause Switch: the Auto Boost preset picker on Power (incl. its off choice) is its control. */}
          <AutomationRow
            ariaLabel="auto boost row"
            icon="🤖"
            lockedAction={unlockButton({
              name: 'Auto Boost',
              cost: COMPUTE_AUTO_BOOST_UNLOCK_COST,
              canBuy: canBuyComputeAutoBoost,
              onClick: actions.buyComputeAutoBoost,
              title: 'Spend Purge Points so a full tier waiting on its own in-flight charge automatically activates your preferred Boost preset (choose it on Power)',
            })}
            name="Auto Boost"
            label="Boost"
            inlineAction
            owned={isComputeAutoBoostActive}
            ownedBadge={<UnlockedBadge icon="🤖" name="Auto Boost" title="Auto Boost unlocked — choose its preset on Power" />}
          />
          </CellGrid>
        </Category>
      )}

      {state.computeFlops?.pageUnlocked && (
        <Category aria-label="compute autobuyers category">
          <CategoryHeading>Compute Autobuyers</CategoryHeading>
          <CellGrid $narrow>
          {COMPUTE_FLOPS_TIER_DEFINITIONS.map(flopTier => {
            const owned = (state.computeFlopsAutobuyers?.[flopTier.id] ?? null) !== null
            const enabled = state.computeFlopsAutobuyersEnabled?.[flopTier.id] ?? true
            return (
              <AutomationRow
                key={flopTier.id}
                ariaLabel={`${flopTier.name} · ${flopTier.outputLabel} autobuyer`}
                enabled={enabled}
                label={<TierSymbol tier={flopTier} />}
                narrow
                lockedBadge={(
                  <MilestoneBadge
                    current={eraCount}
                    milestone={getFlopsAutobuyerUnlockEra(flopTier.id)}
                    progressLabel={`${flopTier.name} (${flopTier.outputLabel}) autobuyer unlock milestone progress`}
                    subject={`${flopTier.name} (${flopTier.outputLabel}) autobuyer`}
                    unit="Reboot"
                  />
                )}
                name={`${flopTier.name} (${flopTier.outputLabel}) autobuyer`}
                onToggle={() => actions.setComputeFlopsAutobuyerEnabled(flopTier.id, !enabled)}
                owned={owned}
                toggleLabel={`${flopTier.name} (${flopTier.outputLabel}) autobuyer`}
              />
            )
          })}
          </CellGrid>
        </Category>
      )}
    </List>
  )

  const renderPrestige = () => (
    <List aria-label="prestige firmware page">
      <Category aria-label="purge points category">
        <CategoryHeading>Purge Points</CategoryHeading>
        <Row aria-label="compression upgrade">
          <RowLabelStack>
            <RowLabel>
              <RowIcon>✦</RowIcon>Compression
            </RowLabel>
            <SubText>{doublePpUpgradeSummary}</SubText>
          </RowLabelStack>
          <PpPurchaseButton
            ariaLabel={`Buy Compression level ${doublePpLevel + 1} for ${formatAmount(doublePpCost)} Purge Points — ${doublePpLevel < 6 ? 'halves powers needed per PP' : 'doubles PP per power'}`}
            color="#fbbf24"
            cost={doublePpCost}
            disabled={!canBuyDoublePp}
            icon="⏫"
            label={`${formatAmount(doublePpCost)} PP`}
            onClick={actions.buyPrestigeDoublePp}
            points={points}
            progressLabel="Compression upgrade PP progress"
            title={doublePpLevel < 6
              ? 'Halves how many money-exponent powers are needed per Purge Point (claimable once you reach 1 Googol Bytes)'
              : 'Doubles how many Purge Points each power earns (claimable once you reach 1 Googol Bytes)'}
          />
        </Row>
        <Row aria-label="production speed bonus upgrade">
          <RowLabel title="+1% production speed per unspent Purge Point"><RowIcon>📈</RowIcon>Production speed bonus</RowLabel>
          {state.prestigeSpeedBonusUnlocked ? (
            <UnlockedBadge icon="📈" name="Production speed bonus" />
          ) : (
            <PpPurchaseButton
              ariaLabel={`Unlock Purge Point production speed bonus for ${PRESTIGE_SPEED_BONUS_UNLOCK_COST} Purge Points`}
              color="#38bdf8"
              cost={PRESTIGE_SPEED_BONUS_UNLOCK_COST}
              disabled={!canBuySpeedBonus}
              icon="🔓"
              label={`${formatAmount(PRESTIGE_SPEED_BONUS_UNLOCK_COST)} PP`}
              onClick={actions.buyPrestigeSpeedBonus}
              points={points}
              progressLabel="Speed bonus unlock PP progress"
              title="Spend Purge Points once to enable +1% production speed per unspent Purge Point"
            />
          )}
        </Row>
        <Row aria-label="overflow mode unlock">
          <RowLabelStack>
            <RowLabel title="Earn past 1 Googol Bytes without freezing; Purge voluntarily to claim PP"><RowIcon>♾</RowIcon>Overflow mode</RowLabel>
            {!isOverflowModeUnlocked(state) && (
              <SubText>
                Auto Purge ≤ {OVERFLOW_MODE_MAX_INTERVAL_SECONDS} s
              </SubText>
            )}
          </RowLabelStack>
          {isOverflowModeUnlocked(state) ? (
            <UnlockedBadge icon="♾" name="Overflow mode" />
          ) : (
            <Badge $color={theme.color.disabled} $dimmed aria-label="Overflow mode locked" title="Unlocks when Auto Purge's interval reaches 1 s or less">
              ♾ 🔒
            </Badge>
          )}
        </Row>
      </Category>
      {isBuyMaxUnlocked(state) && (
        <Category aria-label="purchasing category">
          <CategoryHeading>Purchasing</CategoryHeading>
          <Row aria-label="buy max toggle">
            <RowLabel title="Each purchase buys as many levels as you can afford (Factory tiers buy full levels only)"><RowIcon>⏭</RowIcon>Buy max</RowLabel>
            <BuyMaxToggle game={game} />
          </Row>
        </Category>
      )}
    </List>
  )

  return (
    <RootDiv>
      <Header>
        <h1>Firmware</h1>
        <PpBalance aria-label="purge points display">✦ {formatAmount(points)} PP</PpBalance>
      </Header>
      <TabBar role="tablist" aria-label="firmware view">
        {PERKS_TABS.map(item => (
          <TabButton
            key={item.id}
            aria-label={item.ariaLabel}
            aria-selected={tab === item.id}
            color={tab === item.id ? theme.color.text : theme.color.textMuted}
            onClick={() => setTab(item.id)}
            role="tab"
            title={item.title}
            type="button"
          >
            <span aria-hidden="true">{item.icon}</span>
            {tabDots[item.id] && <NavDot aria-label={tabDots[item.id]} />}
          </TabButton>
        ))}
      </TabBar>
      {tab === 'automation' && renderAutomation()}
      {tab === 'prestige' && renderPrestige()}
    </RootDiv>
  )
}

export default PerksPage
