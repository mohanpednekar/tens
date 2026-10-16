import BuyMaxToggle from 'components/BuyMaxToggle'
import Button, { ButtonIcon, ButtonLabel, VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import {
  formatAmount,
  getAutobuyerUnlockMilestone,
  getAutoPrestigeAttemptRate,
  getAutoPrestigeCost,
  getFlopsAutobuyerUnlockEra,
  getPrestigeDoublePpUpgradeCost,
  getPrestigePowersPerPp,
  getPrestigePpPerPower,
  getPurchaseBlockSize,
  getSmartAutobuyerCost,
  getTierTickspeedAutobuyerMilestone,
  isBuyMaxUnlocked,
  isProductionFrozen,
  isTierUnlocked,
  isUnboundedPrestigeUnlocked,
} from 'game/engine'
import {
  AUTO_PRESTIGE_AUTOBUYER_COST,
  AUTO_SCALE_UP_COST,
  COMPUTE_FLOPS_TIER_DEFINITIONS,
  PRESTIGE_SPEED_BONUS_UNLOCK_COST,
  PRESTIGE_UNBOUNDED_MIN_COUNT,
  TICKSPEED_AUTOBUYER_COST,
  TIER_DEFINITIONS,
} from 'game/layers'
import { hasAffordablePpLevelUpgrade, hasAffordablePpUnlock } from 'game/navAttention'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'

// Perks — its own AppNav destination (page id 'perks', revealed by isPerksPageRevealed) holding every
// permanent progression feature in three icon tabs:
// - 🔓 Unlocks: one-time permanent PP purchases AND free milestone unlocks (tier autobuyers, tier
//   tickspeed autobuyers, Compute autobuyers, Unbounded Prestige) — each milestone shown exactly once
//   here, not also on MilestonesPage (which keeps only Chapters / Era ascension).
// - ⏫ Upgrades: repeatable leveled PP purchases (Double PP, Auto-Prestige).
// - 🎛 Toggles: Buy max mode plus every owned automation's pause/resume.

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

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.4rem 0;

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }
`

const RowLabel = styled.span`
  font-weight: 600;
  min-width: 2rem;
`

const RowControls = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`

const MutedText = styled.p`
  color: ${props => props.theme.color.textMuted};
  margin: 0;
`

const PpButton = styled(Button)`
  font-size: 0.82em;
  min-width: 8.5rem;
  padding: 0.4em 0.6em;
`

// $dimmed is the "paused"/"locked" signal — icon-only content, state spelled out in aria-label/title.
const Badge = styled.span`
  color: ${props => props.$color};
  opacity: ${props => (props.$dimmed ? 0.5 : 1)};
`

const PauseToggleButton = styled(Button)`
  font-size: 0.75em;
  min-width: 0;
  padding: 0.3em 0.5em;
`

const progressPercent = (numerator, denominator) => Math.min(100, Math.round((numerator / denominator) * 100))

const TierSymbol = ({ tier }) => (
  <RowLabel title={tier.name}>
    <VisuallyHidden>{tier.name}</VisuallyHidden>
    <span aria-hidden="true">{tier.symbol}</span>
  </RowLabel>
)

// A free milestone unlock (prestige- or era-count based): ✓ once reached, else 🔒 + target with a
// hidden progressbar. `subject` drives the aria-labels ("<subject> unlocked at <unit> N" /
// "<subject> unlocks at <unit> N").
const MilestoneBadge = ({ icon, subject, unit, milestone, current, progressLabel, reached }) => {
  const theme = useTheme()
  if (reached) {
    return (
      <Badge $color={theme.color.good} aria-label={`${subject} unlocked at ${unit} ${milestone}`} title={`${subject} — unlocked at ${unit} ${milestone}`}>
        {icon} ✓
      </Badge>
    )
  }
  return (
    <RowControls>
      <Badge
        $color={theme.color.disabled}
        $dimmed
        aria-label={`${subject} unlocks at ${unit} ${milestone}`}
        title={`${subject} — unlocks at ${unit} ${milestone} (you're at ${unit} ${current})`}
      >
        {icon} 🔒 {milestone}
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

// Static "already bought" marker for a one-time PP unlock — pause/resume lives on Toggles.
const UnlockedBadge = ({ name, icon }) => {
  const theme = useTheme()
  return (
    <Badge $color={theme.color.good} aria-label={`${name} unlocked`} title={`${name} unlocked — pause/resume it on the Toggles tab`}>
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
    <ButtonIcon>{icon} </ButtonIcon>
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

// One pause/resume row control: status badge (green active / dimmed amber paused) + icon toggle.
const AutomationToggle = ({ name, icon, enabled, onToggle, toggleLabel, statusLabel, statusTitle }) => (
  <RowControls>
    <Badge
      $color={enabled ? '#4ade80' : '#facc15'}
      $dimmed={!enabled}
      aria-label={statusLabel ?? `${name} ${enabled ? 'active' : 'paused'}`}
      title={statusTitle}
    >
      {icon}
    </Badge>
    <PauseToggleButton
      aria-pressed={enabled}
      aria-label={toggleLabel}
      onClick={onToggle}
      title={`${enabled ? 'Pause' : 'Resume'} ${toggleLabel}`}
      type="button"
      variant="ghost"
    >
      {enabled ? '⏸' : '▶'}
    </PauseToggleButton>
  </RowControls>
)

export const PERKS_TABS = [
  { id: 'unlocks', icon: '🔓', ariaLabel: 'open unlocks', title: 'Unlocks — one-time permanent unlocks and milestones' },
  { id: 'upgrades', icon: '⏫', ariaLabel: 'open upgrades', title: 'Upgrades — repeatable leveled upgrades' },
  { id: 'toggles', icon: '🎛', ariaLabel: 'open toggles', title: 'Toggles — Buy max and automation pause/resume' },
]

const PerksPage = ({ game, focusNonce = 0 }) => {
  const { state, actions } = game
  const theme = useTheme()
  const { prestige } = state
  const points = prestige.points ?? 0
  const prestigeCount = prestige.count ?? 0
  const eraCount = state.era?.count ?? 0
  const isFirstRun = prestigeCount === 0
  const isFrozen = isProductionFrozen(state)

  const [tab, setTab] = useState('unlocks')
  useEffect(() => {
    setTab('unlocks')
  }, [focusNonce])

  const purchaseBlockSize = getPurchaseBlockSize(state)
  const allTiersFullyAutomated = TIER_DEFINITIONS.every(tier =>
    state.smartAutobuyer?.[tier.id] && state.tierTickspeedAutobuyer?.[tier.id]
  )

  const isAutoScaleUpActive = state.autoScaleUp ?? false
  const canBuyAutoScaleUp = !isFrozen && !isAutoScaleUpActive && !isFirstRun && points >= AUTO_SCALE_UP_COST
  const autoScaleUpEnabled = state.autoScaleUpEnabled ?? true

  const isTickspeedAutobuyerActive = state.autoGlobalTickspeed ?? false
  const canBuyTickspeedAutobuyer = !isFrozen && !isTickspeedAutobuyerActive && !isFirstRun && points >= TICKSPEED_AUTOBUYER_COST
  const tickspeedAutobuyerEnabled = state.autoGlobalTickspeedEnabled ?? true

  const doublePpLevel = state.prestigeDoublePpLevel ?? 0
  const doublePpCost = getPrestigeDoublePpUpgradeCost(doublePpLevel)
  const powersPerPp = getPrestigePowersPerPp(doublePpLevel)
  const ppPerPower = getPrestigePpPerPower(doublePpLevel)
  const canBuyDoublePp = !isFirstRun && points >= doublePpCost
  const doublePpUpgradeSummary = ppPerPower > 1
    ? `${formatAmount(ppPerPower)} PP per power`
    : `1 PP per ${formatAmount(powersPerPp)} power${powersPerPp === 1 ? '' : 's'}`
  const canBuySpeedBonus = !isFrozen && !state.prestigeSpeedBonusUnlocked && points >= PRESTIGE_SPEED_BONUS_UNLOCK_COST

  // Auto-Prestige: leveled (each level fires 10% sooner at double the cost) — see
  // getAutoPrestigeAttemptRate/getAutoPrestigeCost.
  const autoPrestigeLevel = state.autoPrestige ?? null
  const isAutoPrestigeActive = autoPrestigeLevel !== null
  const autoPrestigeCost = getAutoPrestigeCost(autoPrestigeLevel ?? 0)
  const canBuyAutoPrestige = !isFrozen && points >= autoPrestigeCost
  const autoPrestigeIntervalSeconds = isAutoPrestigeActive
    ? Math.round(1 / getAutoPrestigeAttemptRate(autoPrestigeLevel))
    : null
  const autoPrestigeEnabled = state.autoPrestigeEnabled ?? true

  const isAutoPrestigeAutobuyerActive = state.autoPrestigeAutobuyer ?? false
  const canBuyAutoPrestigeAutobuyer = !isFrozen && isAutoPrestigeActive && !isAutoPrestigeAutobuyerActive && points >= AUTO_PRESTIGE_AUTOBUYER_COST
  const autoPrestigeAutobuyerEnabled = state.autoPrestigeAutobuyerEnabled ?? true

  const tabDots = {
    unlocks: hasAffordablePpUnlock(state) && 'PP unlock available',
    upgrades: hasAffordablePpLevelUpgrade(state) && 'PP upgrade available',
  }

  const renderUnlocks = () => (
    <List aria-label="PP unlocks page">
      <Category aria-label="tier autobuyers category">
        <CategoryHeading>Tier Autobuyers</CategoryHeading>
        {/* Every tier's row stays listed (reached milestones included) so unlock history is never lost. */}
        {TIER_DEFINITIONS.map(tier => {
          const isSmart = state.smartAutobuyer?.[tier.id] ?? false
          const isTierTickspeedAutobuyerActive = state.tierTickspeedAutobuyer?.[tier.id] ?? false
          const unlocked = isTierUnlocked(state)(tier)
          const isAutobuyerLocked = (state.autobuyers[tier.id] ?? null) === null
          const autobuyerMilestone = getAutobuyerUnlockMilestone(tier.id)
          const tickspeedMilestone = getTierTickspeedAutobuyerMilestone(tier.id)
          const smartCost = getSmartAutobuyerCost(tier.id)
          const canBuySmart = unlocked && !isFrozen && !isAutobuyerLocked && points >= smartCost
          return (
            <Row key={tier.id} aria-label={`${tier.name} PP unlocks`}>
              <TierSymbol tier={tier} />
              <MilestoneBadge
                current={prestigeCount}
                icon="⚙"
                milestone={tickspeedMilestone}
                progressLabel={`${tier.name} tickspeed autobuyer milestone progress`}
                reached={isTierTickspeedAutobuyerActive}
                subject={`${tier.name}'s tickspeed autobuyer`}
                unit="Prestige"
              />
              <RowControls>
                <MilestoneBadge
                  current={prestigeCount}
                  icon="🤖"
                  milestone={autobuyerMilestone}
                  progressLabel={`${tier.name} autobuyer unlock milestone progress`}
                  reached={!isAutobuyerLocked}
                  subject={`${tier.name}'s autobuyer`}
                  unit="Prestige"
                />
                {/* Owned Smart always shows (history); buying it needs the tier reachable this run. */}
                {!isAutobuyerLocked && (isSmart || unlocked) && (
                  isSmart ? (
                    <Badge $color="#a78bfa" aria-label={`${tier.name}'s autobuyer is smart`}>🧠 ✓</Badge>
                  ) : (
                    <PpPurchaseButton
                      ariaLabel={`Make ${tier.name}'s autobuyer smart (buy singly until ${purchaseBlockSize} purchases, then in blocks of ${purchaseBlockSize}) for ${formatAmount(smartCost)} Prestige Point${smartCost === 1 ? '' : 's'}`}
                      color="#a78bfa"
                      cost={smartCost}
                      disabled={!canBuySmart}
                      icon="🧠"
                      label={`${formatAmount(smartCost)} PP`}
                      onClick={() => actions.buySmartAutobuyer(tier.id)}
                      points={points}
                      progressLabel={`${tier.name} smart autobuyer Prestige Point progress`}
                    />
                  )
                )}
              </RowControls>
            </Row>
          )
        })}
      </Category>

      <Category aria-label="global automation category">
        <CategoryHeading>Global Automation</CategoryHeading>
        <Row aria-label="tickspeed autobuyer upgrade">
          <RowLabel>🌐 Tickspeed Autobuyer</RowLabel>
          {isTickspeedAutobuyerActive ? (
            <UnlockedBadge icon="🌐" name="Tickspeed Autobuyer" />
          ) : (
            <PpPurchaseButton
              ariaLabel={`Enable Tickspeed Autobuyer for ${TICKSPEED_AUTOBUYER_COST} Prestige Points`}
              color="#38bdf8"
              cost={TICKSPEED_AUTOBUYER_COST}
              disabled={!canBuyTickspeedAutobuyer}
              icon="🔓"
              label={`${TICKSPEED_AUTOBUYER_COST} PP`}
              onClick={actions.buyTickspeedAutobuyer}
              points={points}
              progressLabel="Tickspeed Autobuyer Prestige Point progress"
              title="Spend Prestige Points so the global tickspeed multiplier upgrades itself automatically, forever, whenever affordable"
            />
          )}
        </Row>
        <Row aria-label="auto scale up upgrade">
          <RowLabel>⏩ Auto Scale Up</RowLabel>
          {isAutoScaleUpActive ? (
            <UnlockedBadge icon="⏩" name="Auto Scale Up" />
          ) : (
            <PpPurchaseButton
              ariaLabel={`Enable Auto Scale Up for ${AUTO_SCALE_UP_COST} Prestige Points`}
              color="#38bdf8"
              cost={AUTO_SCALE_UP_COST}
              disabled={!canBuyAutoScaleUp}
              icon="🔓"
              label={`${AUTO_SCALE_UP_COST} PP`}
              onClick={actions.buyAutoScaleUp}
              points={points}
              progressLabel="Auto Scale Up Prestige Point progress"
              title="Spend Prestige Points so eligible Scale Ups happen automatically until the final tier, where they stay manual for Overclock"
            />
          )}
        </Row>
        {allTiersFullyAutomated && isAutoPrestigeActive && (
          <Row aria-label="auto-prestige autobuyer upgrade">
            <RowLabel>🔁 Auto-Prestige Autobuyer</RowLabel>
            {isAutoPrestigeAutobuyerActive ? (
              <UnlockedBadge icon="🔁" name="Auto-Prestige Autobuyer" />
            ) : (
              <PpPurchaseButton
                ariaLabel={`Enable Auto-Prestige Autobuyer for ${AUTO_PRESTIGE_AUTOBUYER_COST} Prestige Points`}
                color="#38bdf8"
                cost={AUTO_PRESTIGE_AUTOBUYER_COST}
                disabled={!canBuyAutoPrestigeAutobuyer}
                icon="🔓"
                label={`${AUTO_PRESTIGE_AUTOBUYER_COST} PP`}
                onClick={actions.buyAutoPrestigeAutobuyer}
                points={points}
                progressLabel="Auto-Prestige Autobuyer Prestige Point progress"
                title="Spend Prestige Points so Auto-Prestige keeps re-leveling itself automatically, forever, whenever affordable"
              />
            )}
          </Row>
        )}
      </Category>

      {!state.prestigeSpeedBonusUnlocked && (
        <Category aria-label="production bonuses category">
          <CategoryHeading>Production Bonuses</CategoryHeading>
          <Row aria-label="production speed bonus upgrade">
            <RowLabel>🚀 Production speed bonus</RowLabel>
            <PpPurchaseButton
              ariaLabel={`Unlock Prestige Point production speed bonus for ${PRESTIGE_SPEED_BONUS_UNLOCK_COST} Prestige Points`}
              color="#38bdf8"
              cost={PRESTIGE_SPEED_BONUS_UNLOCK_COST}
              disabled={!canBuySpeedBonus}
              icon="🔓"
              label={`${formatAmount(PRESTIGE_SPEED_BONUS_UNLOCK_COST)} PP`}
              onClick={actions.buyPrestigeSpeedBonus}
              points={points}
              progressLabel="Speed bonus unlock Prestige Point progress"
              title="Spend Prestige Points once to enable +1% production speed per unspent Prestige Point"
            />
          </Row>
        </Category>
      )}

      {state.computeFlops?.pageUnlocked && (
        <Category aria-label="compute autobuyer unlock milestones category">
          <CategoryHeading>Compute Autobuyers</CategoryHeading>
          {COMPUTE_FLOPS_TIER_DEFINITIONS.map(flopTier => {
            const milestone = getFlopsAutobuyerUnlockEra(flopTier.id)
            return (
              <Row key={flopTier.id} aria-label={`${flopTier.name} autobuyer unlock milestone`}>
                <TierSymbol tier={flopTier} />
                <MilestoneBadge
                  current={eraCount}
                  icon="🤖"
                  milestone={milestone}
                  progressLabel={`${flopTier.name} autobuyer unlock milestone progress`}
                  reached={(state.computeFlopsAutobuyers?.[flopTier.id] ?? null) !== null}
                  subject={`${flopTier.name}'s autobuyer`}
                  unit="Era"
                />
              </Row>
            )
          })}
        </Category>
      )}

      <Category aria-label="prestige unlocks category">
        <CategoryHeading>Prestige</CategoryHeading>
        <Row aria-label="unbounded prestige unlock">
          <RowLabel title="Earn past 1 Googol Bytes without freezing; Prestige voluntarily to claim PP">♾ Unbounded Prestige</RowLabel>
          <MilestoneBadge
            current={prestigeCount}
            icon="♾"
            milestone={PRESTIGE_UNBOUNDED_MIN_COUNT}
            progressLabel="Unbounded Prestige milestone progress"
            reached={isUnboundedPrestigeUnlocked(state)}
            subject="Unbounded Prestige"
            unit="Prestige"
          />
        </Row>
      </Category>
    </List>
  )

  const renderUpgrades = () => (
    <List aria-label="PP upgrades page">
      <Category aria-label="prestige upgrades category">
        <CategoryHeading>Prestige</CategoryHeading>
        <Row aria-label="double PP upgrade">
          <RowLabel>
            ✦ Double PP
            {doublePpLevel > 0 && ` (Lv.${doublePpLevel})`}
          </RowLabel>
          <MutedText>{doublePpUpgradeSummary}</MutedText>
          <PpPurchaseButton
            ariaLabel={`Buy Double PP level ${doublePpLevel + 1} for ${formatAmount(doublePpCost)} Prestige Points — ${doublePpLevel < 6 ? 'halves powers needed per PP' : 'doubles PP per power'}`}
            color="#fbbf24"
            cost={doublePpCost}
            disabled={!canBuyDoublePp}
            icon="⏫"
            label={`${formatAmount(doublePpCost)} PP`}
            onClick={actions.buyPrestigeDoublePp}
            points={points}
            progressLabel="Double PP upgrade Prestige Point progress"
            title={doublePpLevel < 6
              ? 'Halves how many money-exponent powers are needed per Prestige Point (claimable once you reach 1 Googol Bytes)'
              : 'Doubles how many Prestige Points each power earns (claimable once you reach 1 Googol Bytes)'}
          />
        </Row>
      </Category>

      {/* Auto-Prestige stays hidden entirely until every tier is fully smart (allTiersFullyAutomated). */}
      {allTiersFullyAutomated && (
        <Category aria-label="automation upgrades category">
          <CategoryHeading>Automation</CategoryHeading>
          <Row aria-label="auto-prestige upgrade">
            <RowLabel>
              ✦ Auto-Prestige
              {isAutoPrestigeActive && (
                <MutedText as="span" title={`Auto-Prestige fires roughly every ${autoPrestigeIntervalSeconds}s once Bits reaches 1 Googol Bytes`}>
                  {' '}Lv.{autoPrestigeLevel} (every ~{autoPrestigeIntervalSeconds}s)
                </MutedText>
              )}
            </RowLabel>
            <PpPurchaseButton
              ariaLabel={isAutoPrestigeActive
                ? `Upgrade Auto-Prestige for ${autoPrestigeCost} Prestige Points`
                : `Enable Auto-Prestige for ${autoPrestigeCost} Prestige Points`}
              color="#38bdf8"
              cost={autoPrestigeCost}
              disabled={!canBuyAutoPrestige}
              icon={isAutoPrestigeActive ? '⏫' : '🔓'}
              label={`${autoPrestigeCost} PP`}
              onClick={actions.buyAutoPrestige}
              points={points}
              progressLabel="Auto-Prestige Prestige Point progress"
              title="Spend Prestige Points so Prestige happens automatically once Bits reaches 1 Googol Bytes — each level makes it fire 10% sooner, at double the cost"
            />
          </Row>
        </Category>
      )}
    </List>
  )

  const renderToggles = () => {
    const tierRows = TIER_DEFINITIONS.map(tier => {
      if (!isTierUnlocked(state)(tier)) return null
      const isAutobuyerLocked = (state.autobuyers[tier.id] ?? null) === null
      const isTierTickspeedAutobuyerActive = state.tierTickspeedAutobuyer?.[tier.id] ?? false
      if (isAutobuyerLocked && !isTierTickspeedAutobuyerActive) return null
      const autobuyerEnabled = state.autobuyersEnabled?.[tier.id] ?? true
      const tierTickspeedAutobuyerEnabled = state.tierTickspeedAutobuyerEnabled?.[tier.id] ?? true
      return (
        <Row key={tier.id} aria-label={`${tier.name} automation toggles`}>
          <TierSymbol tier={tier} />
          {isTierTickspeedAutobuyerActive && (
            <AutomationToggle
              enabled={tierTickspeedAutobuyerEnabled}
              icon="⚙"
              name={`${tier.name}'s tickspeed autobuyer`}
              onToggle={() => actions.setTierTickspeedAutobuyerEnabled(tier.id, !tierTickspeedAutobuyerEnabled)}
              toggleLabel={`${tier.name}'s tickspeed autobuyer`}
            />
          )}
          {!isAutobuyerLocked && (
            <AutomationToggle
              enabled={autobuyerEnabled}
              icon="🤖"
              name={`${tier.name}'s autobuyer`}
              onToggle={() => actions.setAutobuyerEnabled(tier.id, !autobuyerEnabled)}
              toggleLabel={`${tier.name}'s autobuyer`}
            />
          )}
        </Row>
      )
    }).filter(Boolean)
    const globalRows = [
      isTickspeedAutobuyerActive && (
        <Row key="tickspeed" aria-label="tickspeed autobuyer toggle">
          <RowLabel>🌐 Tickspeed Autobuyer</RowLabel>
          <AutomationToggle
            enabled={tickspeedAutobuyerEnabled}
            icon="🌐"
            name="Tickspeed Autobuyer"
            onToggle={() => actions.setAutoGlobalTickspeedEnabled(!tickspeedAutobuyerEnabled)}
            toggleLabel="Tickspeed Autobuyer automation"
          />
        </Row>
      ),
      isAutoScaleUpActive && (
        <Row key="scale-up" aria-label="auto scale up toggle">
          <RowLabel>⏩ Auto Scale Up</RowLabel>
          <AutomationToggle
            enabled={autoScaleUpEnabled}
            icon="⏩"
            name="Auto Scale Up"
            onToggle={() => actions.setAutoScaleUpEnabled(!autoScaleUpEnabled)}
            statusTitle={autoScaleUpEnabled
              ? "Scale Up triggers automatically the instant it's eligible"
              : 'Auto Scale Up is paused — it will not trigger until resumed'}
            toggleLabel="Auto Scale Up automation"
          />
        </Row>
      ),
      isAutoPrestigeActive && (
        <Row key="auto-prestige" aria-label="auto-prestige toggle">
          <RowLabel>✦ Auto-Prestige</RowLabel>
          <AutomationToggle
            enabled={autoPrestigeEnabled}
            icon="✦"
            name="Auto-Prestige"
            onToggle={() => actions.setAutoPrestigeEnabled(!autoPrestigeEnabled)}
            toggleLabel="Auto-Prestige automation"
          />
        </Row>
      ),
      isAutoPrestigeAutobuyerActive && (
        <Row key="auto-prestige-autobuyer" aria-label="auto-prestige autobuyer toggle">
          <RowLabel>🔁 Auto-Prestige Autobuyer</RowLabel>
          <AutomationToggle
            enabled={autoPrestigeAutobuyerEnabled}
            icon="🔁"
            name="Auto-Prestige Autobuyer"
            onToggle={() => actions.setAutoPrestigeAutobuyerEnabled(!autoPrestigeAutobuyerEnabled)}
            toggleLabel="Auto-Prestige Autobuyer automation"
          />
        </Row>
      ),
    ].filter(Boolean)
    const showBuyMax = isBuyMaxUnlocked(state)
    return (
      <List aria-label="automation toggles page">
        {showBuyMax && (
          <Category aria-label="purchase mode toggles category">
            <CategoryHeading>Purchasing</CategoryHeading>
            <Row aria-label="buy max toggle">
              <RowLabel title="Each purchase buys as many levels as you can afford (Factory tiers buy full levels only)">⏭ Buy max</RowLabel>
              <BuyMaxToggle game={game} />
            </Row>
          </Category>
        )}
        {tierRows.length > 0 && (
          <Category aria-label="tier automation toggles category">
            <CategoryHeading>Tier Autobuyers</CategoryHeading>
            {tierRows}
          </Category>
        )}
        {globalRows.length > 0 && (
          <Category aria-label="global automation toggles category">
            <CategoryHeading>Global Automation</CategoryHeading>
            {globalRows}
          </Category>
        )}
        {!showBuyMax && tierRows.length === 0 && globalRows.length === 0 && (
          <StatCard aria-label="no toggles notice">
            <MutedText>Nothing to toggle yet — automations appear here once unlocked.</MutedText>
          </StatCard>
        )}
      </List>
    )
  }

  return (
    <RootDiv>
      <Header>
        <h1>Perks</h1>
        <PpBalance aria-label="prestige points display">✦ {formatAmount(points)} PP</PpBalance>
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
      {tab === 'unlocks' && renderUnlocks()}
      {tab === 'upgrades' && renderUpgrades()}
      {tab === 'toggles' && renderToggles()}
    </RootDiv>
  )
}

export default PerksPage
