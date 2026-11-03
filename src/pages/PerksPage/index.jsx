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
  isUnboundedRebootUnlocked,
} from 'game/engine'
import {
  COMPUTE_AUTO_BOOST_UNLOCK_COST,
  COMPUTE_FLOPS_TIER_DEFINITIONS,
  PRESTIGE_SPEED_BONUS_UNLOCK_COST,
  UNBOUNDED_REBOOT_MAX_INTERVAL_SECONDS,
  TIER_DEFINITIONS,
  XP_TICKSPEED_AUTOBUYER_UNLOCK_COST,
} from 'game/layers'
import { hasAffordableAutomationPerk, hasAffordablePrestigePerk } from 'game/navAttention'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'

// Perks — its own AppNav destination (page id 'perks', revealed by isPerksPageRevealed), grouped by
// feature rather than by purchase kind, in two icon tabs:
// - 🤖 Automation: ONE row per automation covering its whole lifecycle — locked (🔒 milestone badge
//   or 🔓 PP unlock button) → owned (pause/resume Switch in the lead cell, `every <interval>` subtext,
//   ⏫ speed upgrade button). Global automations, tier autobuyers, tier tickspeed autobuyers, Auto
//   Boost, and Era-unlocked Compute autobuyers. Each milestone is shown exactly once, here.
// - ✦ Prestige: non-automation perks that stand on their own — Double PP (leveled), Production
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

// Affordability cue on the Unlocks/Upgrades tabs — same green as AppNav attention dots.
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

// Every row is a CSS grid so columns line up row-to-row regardless of content width. Default:
// label | action. `$lead` (automation rows): fixed Switch cell | label | action, so every switch and
// every name start at the same x whether or not the automation is owned yet. Fits a 320px phone.
const Row = styled.div`
  align-items: center;
  column-gap: 0.6rem;
  display: grid;
  grid-template-columns: ${props => (props.$lead ? '2.75rem minmax(0, 1fr) auto' : 'minmax(0, 1fr) auto')};
  min-height: 2.75rem;
  padding: 0.35rem 0;

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }

  & > :last-child {
    justify-self: end;
  }
`

// Lead cell of an automation row — holds the Switch once owned, empty while locked.
const LeadCell = styled.span`
  display: flex;
  justify-content: center;
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
  padding-left: ${props => (props.$flush ? '0' : 'calc(1.5em / 0.82 + 0.45rem)')};
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

// One automation's whole lifecycle in a single row. Locked: empty lead cell + `lockedAction` (a
// 🔒 milestone badge or a 🔓 PP unlock button). Owned: pause/resume Switch in the lead cell (when
// `onToggle` is given), the icon becomes the "<name> active|paused" status, `subText` shows its
// current interval, and `ownedAction` holds its ⏫ speed upgrade (or nothing once maxed).
const AutomationRow = ({ ariaLabel, icon, name, label = name, owned, enabled = true, onToggle, toggleLabel, statusTitle, subText, lockedAction, ownedAction }) => (
  <Row $lead aria-label={ariaLabel}>
    <LeadCell>
      {owned && onToggle && (
        <Switch
          $on={enabled}
          aria-label={toggleLabel}
          aria-pressed={enabled}
          onClick={onToggle}
          title={`${enabled ? 'Pause' : 'Resume'} ${toggleLabel}`}
        />
      )}
    </LeadCell>
    <RowLabelStack>
      <RowLabel>
        {/* Icon-less rows (tier/Flops lists, whose category heading names the kind) keep the
            status for assistive tech only — the Switch already shows it visually. */}
        {owned && onToggle && !icon && (
          <VisuallyHidden aria-label={`${name} ${enabled ? 'active' : 'paused'}`}>{enabled ? 'active' : 'paused'}</VisuallyHidden>
        )}
        {icon && (owned && onToggle ? (
          <StatusIcon $dimmed={!enabled} aria-label={`${name} ${enabled ? 'active' : 'paused'}`} title={statusTitle}>{icon}</StatusIcon>
        ) : (
          <RowIcon>{icon}</RowIcon>
        ))}
        {label}
      </RowLabel>
      {owned && subText && <SubText $flush={!icon}>{subText}</SubText>}
    </RowLabelStack>
    {owned ? (ownedAction ?? <span />) : lockedAction}
  </Row>
)

export const PERKS_TABS = [
  { id: 'automation', icon: '🤖', ariaLabel: 'open automation', title: 'Automation — unlock, pause/resume and speed up every automation' },
  { id: 'prestige', icon: '✦', ariaLabel: 'open prestige', title: 'Prestige — Double PP, production speed bonus, DeGoogol and Buy max' },
]

const formatInterval = ms => (ms >= 1000 ? `${Math.round(ms) / 1000} s` : `${Math.round(ms * 10) / 10} ms`)

const GLOBAL_AUTOMATIONS = [
  { key: 'speedUp', name: 'Auto Speed Up', icon: '🌐', owned: s => s.autoGlobalTickspeed ?? false, enabled: s => s.autoGlobalTickspeedEnabled ?? true, setEnabled: 'setAutoGlobalTickspeedEnabled', buy: 'buyTickspeedAutobuyer', canBuy: () => true, unlockTitle: 'Spend Purge Points so the global tickspeed multiplier upgrades itself automatically, forever, whenever affordable' },
  { key: 'restage', name: 'Auto Restage', icon: '🧬', owned: s => s.autoXpTickspeed ?? false, enabled: s => s.autoXpTickspeedEnabled ?? true, setEnabled: 'setAutoXpTickspeedEnabled', buy: 'buyXpTickspeedAutobuyer', canBuy: s => Boolean(s.autoGlobalTickspeed), cost: XP_TICKSPEED_AUTOBUYER_UNLOCK_COST, unlockTitle: 'Spend Purge Points so XP is automatically consumed for Restage whenever possible (each consumption resets every other tier\'s owned quantity and Bits)' },
  { key: 'scaleUp', name: 'Auto Scale Up', icon: '⏩', owned: s => s.autoScaleUp ?? false, enabled: s => s.autoScaleUpEnabled ?? true, setEnabled: 'setAutoScaleUpEnabled', buy: 'buyAutoScaleUp', canBuy: s => Boolean(s.autoGlobalTickspeed), unlockTitle: 'Spend Purge Points so eligible Scale Ups happen automatically until the final tier, where they stay manual for Overclock', statusTitle: enabled => (enabled ? "Scale Up triggers automatically the instant it's eligible" : 'Auto Scale Up is paused — it will not trigger until resumed') },
  { key: 'overclock', name: 'Auto Overclock', icon: '🚀', owned: s => s.autoOverclock ?? false, enabled: s => s.autoOverclockEnabled ?? true, setEnabled: 'setAutoOverclockEnabled', buy: 'buyAutoOverclock', canBuy: s => Boolean(s.autoScaleUp) && Boolean(s.autoXpTickspeed), unlockTitle: 'Spend Purge Points so Overclock is claimed automatically whenever it is eligible' },
  { key: 'reboot', name: 'Auto Purge', icon: '✦', owned: s => (s.autoReboot ?? null) !== null, enabled: s => s.autoRebootEnabled ?? true, setEnabled: 'setAutoRebootEnabled', buy: 'buyAutoReboot', canBuy: s => Boolean(s.autoOverclock), allowFirstRun: true, unlockTitle: 'Spend Purge Points so Purge happens automatically once your balance reaches 1 Googol Bytes' },
]

const PerksPage = ({ game, focusNonce = 0 }) => {
  const { state, actions } = game
  const theme = useTheme()
  const { reboot } = state
  const points = reboot.points ?? 0
  const rebootCount = reboot.count ?? 0
  const eraCount = state.era?.count ?? 0
  const isFirstRun = rebootCount === 0
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
  // Stays listed once bought, even after Era ascension / Reset Byte Foundry drops Capacity back below the Boosters threshold.
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
    <List aria-label="automation perks page">
      <Category aria-label="global automation category">
        <CategoryHeading>Global Automation</CategoryHeading>
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
              subText={chainUnlocked ? `${level > 0 ? `Lv.${level} · ` : ''}every ${formatInterval(getAutomationIntervalSeconds(state, auto.key) * 1000)}${maxed ? ' (max)' : ''}` : null}
              toggleLabel={`${auto.name} automation`}
            />
          )
        })}
      </Category>

      <Category aria-label="tier autobuyers category">
        <CategoryHeading>Tier Autobuyers</CategoryHeading>
        {/* All ten tiers stay listed (owned ones included) so unlock history is never lost. */}
        {TIER_DEFINITIONS.map(tier => {
          const owned = (state.autobuyers[tier.id] ?? null) !== null
          const enabled = state.autobuyersEnabled?.[tier.id] ?? true
          const milestone = getAutobuyerUnlockMilestone(tier.id)
          const level = state.autobuyerIntervalLevels?.[tier.id] ?? 0
          const maxed = level >= getAutobuyerSpeedUpgradeMaxLevel(tier.id)
          const atFloor = level >= getAutobuyerIntervalMaxLevel(tier.id)
          const bulkLevels = owned ? getAutobuyerBulkLevels(state, tier.id) : 1
          const cost = getAutobuyerIntervalUpgradeCost(level)
          return (
            <AutomationRow
              key={tier.id}
              ariaLabel={`${tier.name} autobuyer`}
              enabled={enabled}
              label={tier.name}
              lockedAction={(
                <MilestoneBadge
                  current={rebootCount}
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
                label: atFloor ? `${bulkLevels * 2}/buy · ${formatAmount(cost)} PP` : undefined,
                onClick: () => actions.buyAutobuyerIntervalUpgrade(tier.id),
                progressLabel: `${tier.name} autobuyer speed PP progress`,
                title: atFloor
                  ? 'At the 10 ms floor, each further level doubles how many full levels one autobuyer attempt can buy (as many as are affordable, at least one); cost keeps rising'
                  : "Spend Purge Points to shorten this autobuyer's purchase interval by 10% (floor 10 ms); past the floor, levels double how many levels it buys per attempt",
              })}
              subText={owned ? `${level > 0 ? `Lv.${level} · ` : ''}every ${formatInterval(getAutobuyerIntervalSeconds(state, tier.id) * 1000)}${bulkLevels > 1 ? ` · ${bulkLevels}/buy` : ''}${maxed ? ' (max)' : ''}` : null}
              toggleLabel={`${tier.name}'s autobuyer`}
            />
          )
        })}
      </Category>

      <Category aria-label="tier tickspeed autobuyers category">
        <CategoryHeading>Tier Tickspeed Autobuyers</CategoryHeading>
        {TIER_DEFINITIONS.map(tier => {
          const owned = state.tierTickspeedAutobuyer?.[tier.id] ?? false
          const enabled = state.tierTickspeedAutobuyerEnabled?.[tier.id] ?? true
          const level = state.tierTickspeedIntervalLevels?.[tier.id] ?? 0
          const maxed = level >= getTierTickspeedIntervalMaxLevel()
          const cost = getTierTickspeedIntervalUpgradeCost(level)
          return (
            <AutomationRow
              key={tier.id}
              ariaLabel={`${tier.name} tickspeed autobuyer`}
              enabled={enabled}
              label={tier.name}
              lockedAction={(
                <MilestoneBadge
                  current={rebootCount}
                  milestone={getTierTickspeedAutobuyerMilestone(tier.id)}
                  progressLabel={`${tier.name} tickspeed autobuyer milestone progress`}
                  subject={`${tier.name}'s tickspeed autobuyer`}
                  unit="Purge"
                />
              )}
              name={`${tier.name}'s tickspeed autobuyer`}
              onToggle={() => actions.setTierTickspeedAutobuyerEnabled(tier.id, !enabled)}
              owned={owned}
              ownedAction={speedUpgradeButton({
                maxed,
                cost,
                ariaLabel: `Upgrade ${tier.name}'s tickspeed autobuyer speed to level ${level + 1} for ${formatAmount(cost)} Purge Points — interval ×0.9`,
                onClick: () => actions.buyTierTickspeedIntervalUpgrade(tier.id),
                progressLabel: `${tier.name} tickspeed autobuyer speed PP progress`,
                title: "Spend Purge Points to shorten this tier's tickspeed autobuyer interval by 10% (floor 10 ms); cost doubles each level",
              })}
              subText={owned ? `${level > 0 ? `Lv.${level} · ` : ''}every ${formatInterval(getTierTickspeedIntervalSeconds(state, tier.id) * 1000)}${maxed ? ' (max)' : ''}` : null}
              toggleLabel={`${tier.name}'s tickspeed autobuyer`}
            />
          )
        })}
      </Category>

      {showComputeAutoBoost && (
        <Category aria-label="booster automation category">
          <CategoryHeading>Booster Automation</CategoryHeading>
          {/* No pause Switch: the Auto Boost preset picker on Boosters (incl. its off choice) is its control. */}
          <AutomationRow
            ariaLabel="auto boost row"
            icon="🤖"
            lockedAction={unlockButton({
              name: 'Auto Boost',
              cost: COMPUTE_AUTO_BOOST_UNLOCK_COST,
              canBuy: canBuyComputeAutoBoost,
              onClick: actions.buyComputeAutoBoost,
              title: 'Spend Purge Points so a full tier waiting on its own in-flight merge automatically activates your preferred Boost preset (choose it on Boosters)',
            })}
            name="Auto Boost"
            owned={isComputeAutoBoostActive}
            ownedAction={<UnlockedBadge icon="🤖" name="Auto Boost" title="Auto Boost unlocked — choose its preset on Boosters" />}
          />
        </Category>
      )}

      {state.computeFlops?.pageUnlocked && (
        <Category aria-label="compute autobuyers category">
          <CategoryHeading>Compute Autobuyers</CategoryHeading>
          {COMPUTE_FLOPS_TIER_DEFINITIONS.map(flopTier => {
            const owned = (state.computeFlopsAutobuyers?.[flopTier.id] ?? null) !== null
            const enabled = state.computeFlopsAutobuyersEnabled?.[flopTier.id] ?? true
            return (
              <AutomationRow
                key={flopTier.id}
                ariaLabel={`${flopTier.name} autobuyer`}
                enabled={enabled}
                label={flopTier.name}
                lockedAction={(
                  <MilestoneBadge
                    current={eraCount}
                    milestone={getFlopsAutobuyerUnlockEra(flopTier.id)}
                    progressLabel={`${flopTier.name} autobuyer unlock milestone progress`}
                      subject={`${flopTier.name}'s autobuyer`}
                    unit="Era"
                  />
                )}
                name={`${flopTier.name}'s autobuyer`}
                onToggle={() => actions.setComputeFlopsAutobuyerEnabled(flopTier.id, !enabled)}
                owned={owned}
                toggleLabel={`${flopTier.name}'s autobuyer`}
              />
            )
          })}
        </Category>
      )}
    </List>
  )

  const renderPrestige = () => (
    <List aria-label="prestige perks page">
      <Category aria-label="purge points category">
        <CategoryHeading>Purge Points</CategoryHeading>
        <Row aria-label="double PP upgrade">
          <RowLabelStack>
            <RowLabel>
              <RowIcon>✦</RowIcon>Double PP
              {doublePpLevel > 0 && ` (Lv.${doublePpLevel})`}
            </RowLabel>
            <SubText>{doublePpUpgradeSummary}</SubText>
          </RowLabelStack>
          <PpPurchaseButton
            ariaLabel={`Buy Double PP level ${doublePpLevel + 1} for ${formatAmount(doublePpCost)} Purge Points — ${doublePpLevel < 6 ? 'halves powers needed per PP' : 'doubles PP per power'}`}
            color="#fbbf24"
            cost={doublePpCost}
            disabled={!canBuyDoublePp}
            icon="⏫"
            label={`${formatAmount(doublePpCost)} PP`}
            onClick={actions.buyPrestigeDoublePp}
            points={points}
            progressLabel="Double PP upgrade PP progress"
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
        <Row aria-label="degoogol unlock">
          <RowLabelStack>
            <RowLabel title="Earn past 1 Googol Bytes without freezing; Purge voluntarily to claim PP"><RowIcon>♾</RowIcon>DeGoogol</RowLabel>
            {!isUnboundedRebootUnlocked(state) && (
              <SubText>
                Auto Purge ≤ {UNBOUNDED_REBOOT_MAX_INTERVAL_SECONDS} s
              </SubText>
            )}
          </RowLabelStack>
          {isUnboundedRebootUnlocked(state) ? (
            <UnlockedBadge icon="♾" name="DeGoogol" />
          ) : (
            <Badge $color={theme.color.disabled} $dimmed aria-label="DeGoogol locked" title="Unlocks when Auto Purge's interval reaches 1 s or less">
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
        <h1>Perks</h1>
        <PpBalance aria-label="purge points display">✦ {formatAmount(points)} PP</PpBalance>
      </Header>
      <TabBar role="tablist" aria-label="perks view">
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
