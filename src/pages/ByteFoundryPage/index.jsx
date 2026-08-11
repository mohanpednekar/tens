import Button, { ButtonContent, progressFill, VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import { formatAmount, getIntroProductionRate, isIntroConversionUnlocked } from 'game/engine'
import { BITS_PER_BYTE, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_COMBINE_COST } from 'game/layers'
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
  text-align: center;
`

const StatusText = styled.p`
  margin: 0;
  color: ${props => props.theme.color.textMuted};
  text-align: center;
`

const MemoryLabel = styled.p`
  margin: 0;
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

const BalanceText = styled.p`
  margin: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.lg.size};
  font-weight: 700;
  text-align: center;
`

// Once the Byte generator exists, tapping is a secondary/backup action (passive production is the
// primary loop now) — $compact shrinks the button accordingly, while it stays just as clickable
// (same disabled={isFull} gating either way). $progress reuses Button's own gradient-fill
// convention (see components/Button's exported progressFill) so it indicates fill-toward-capacity
// the same way every other actionable control on this page now does (see the buttons below).
const TapArea = styled.button`
  position: relative;
  width: ${props => (props.$compact ? 'auto' : '100%')};
  min-width: ${props => (props.$compact ? '150px' : 'auto')};
  padding: ${props => (props.$compact ? `${props.theme.space.sm} ${props.theme.space.xl}` : '0')};
  aspect-ratio: ${props => (props.$compact ? 'auto' : '5 / 3')};
  border: 1.5px solid ${props => props.theme.color.accent};
  border-radius: ${props => props.theme.radius.lg};
  color: ${props => (props.disabled ? props.theme.color.disabled : props.theme.color.accent)};
  font-family: ${props => props.theme.font.display};
  font-size: ${props => (props.$compact ? props.theme.type.scale.md.size : props.theme.type.scale.xl.size)};
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease, font-size 0.2s ease;
  ${progressFill}

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
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

// Segmented, 8-block visual for the production rate while it's still below 1 Byte/sec (8
// bits/sec) — one block per whole bit/sec, filled left to right. A real (visible, not hidden)
// role="progressbar", since the blocks themselves are the primary at-a-glance info here, unlike
// the plain-text balance bar above (which pairs a hidden progressbar with numbers that already
// convey the same thing accessibly on their own).
const RateBlocksRow = styled.div`
  display: flex;
  gap: 3px;
  width: 100%;
  max-width: 220px;
`

const RateBlock = styled.span`
  flex: 1;
  height: 0.55rem;
  border-radius: 2px;
  background: ${props => (props.$filled ? props.theme.color.good : props.theme.color.surfaceSunken)};
`

// Numbers read in Bytes once the Byte generator exists — every capacity value in the ladder
// (8, 80, 800, 8000, …) is evenly divisible by BITS_PER_BYTE, so this always yields clean whole
// numbers. Before the Byte exists there's nothing to denominate in yet, so raw bits read better
// during that initial tap-to-8 bootstrap. See CLAUDE.md's Byte Foundry section.
const formatBitBalance = (bits, byteCreated) =>
  byteCreated ? `${formatAmount(Math.floor(bits / BITS_PER_BYTE))} B` : `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`

const clampPercent = value => Math.min(100, Math.max(0, value))

// `onBack` is only passed once intro.completed is true — this page is otherwise a mandatory gate
// with no way out (see App.jsx). When it's set, the player got here voluntarily (via MainPage's
// "⚙️ Byte Foundry" link) to review a completed cycle's stats — every action button is hidden
// rather than shown-but-disabled, since intro.completed makes every one of them a guaranteed
// engine no-op (see tapIntroBit/combineIntroByte/pickIntroCapacityMilestone/
// pickIntroProductionMilestone/convertIntroBitsToKilobytes in engine.js) — nothing left to do here
// until the next Prestige resets Memory and makes this screen the mandatory gate again. The Byte
// generator itself (capacity/byteCreated/tickSpeedSeconds/productionMultiplier) is PERMANENT —
// see prestigeGame in engine.js — so only Memory (the bits balance) was actually spent; the
// generator and its upgrades carry over into the next cycle untouched.
const ByteFoundryPage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  const isFull = intro.bits >= intro.capacity
  const canCombine = !intro.byteCreated && intro.bits >= INTRO_BYTE_COMBINE_COST
  const revealed = isIntroConversionUnlocked(state)
  const canConvert = revealed && intro.bits >= INTRO_BITS_PER_KILOBYTE_CONVERSION
  const productionRate = getIntroProductionRate(intro)
  const alreadyClaimedAtTier = intro.capacity === intro.productionMilestoneClaimedAtCapacity

  const combineProgress = clampPercent((intro.bits / INTRO_BYTE_COMBINE_COST) * 100)
  const fullProgress = clampPercent((intro.bits / intro.capacity) * 100)
  const convertProgress = clampPercent((intro.bits / INTRO_BITS_PER_KILOBYTE_CONVERSION) * 100)

  return (
    <RootDiv>
      <Title>⚙️ Byte Foundry</Title>
      <StatusText>
        {intro.completed
          ? 'This cycle’s Memory is spent — it resets and this screen becomes the gate again after your next Prestige. Your Byte generator and its upgrades (capacity, speed, production) are permanent and carry over.'
          : 'Tap to generate bits into your Memory. Combine 8 bits into a Byte to start producing more automatically.'}
      </StatusText>

      <StatCard aria-label="byte foundry balance">
        <MemoryLabel>Memory</MemoryLabel>
        <BalanceText>
          {formatBitBalance(intro.bits, intro.byteCreated)} / {formatBitBalance(intro.capacity, intro.byteCreated)}
        </BalanceText>
        <VisuallyHidden
          role="progressbar"
          aria-label="byte foundry bit balance"
          aria-valuenow={intro.bits}
          aria-valuemin={0}
          aria-valuemax={intro.capacity}
        />
        {intro.byteCreated && !intro.completed && (
          productionRate < BITS_PER_BYTE ? (
            <>
              <StatusText>+{formatAmount(productionRate)} bit{productionRate === 1 ? '' : 's'}/sec</StatusText>
              <RateBlocksRow role="progressbar" aria-label="byte foundry production rate" aria-valuenow={productionRate} aria-valuemin={0} aria-valuemax={BITS_PER_BYTE}>
                {Array.from({ length: BITS_PER_BYTE }, (_, index) => (
                  <RateBlock key={index} $filled={index < productionRate} />
                ))}
              </RateBlocksRow>
            </>
          ) : (
            <StatusText>
              +{formatAmount(productionRate / BITS_PER_BYTE)} Byte{productionRate / BITS_PER_BYTE === 1 ? '' : 's'}/sec
            </StatusText>
          )
        )}
      </StatCard>

      {!intro.completed && (<>
        <TapArea
          aria-label="tap to generate a bit"
          disabled={isFull}
          onClick={actions.tapIntroBit}
          type="button"
          $compact={intro.byteCreated}
          $progress={fullProgress}
        >
          👆 Tap
          <VisuallyHidden
            role="progressbar"
            aria-label="byte foundry tap progress"
            aria-valuenow={intro.bits}
            aria-valuemin={0}
            aria-valuemax={intro.capacity}
          />
        </TapArea>

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

          {intro.byteCreated && (<>
            <Button
              aria-label="sacrifice all bits for 10x capacity"
              disabled={!isFull}
              onClick={actions.pickIntroCapacityMilestone}
              title="Empties your Memory in exchange for 10x capacity"
              type="button"
              variant={isFull ? 'prestige' : 'neutral'}
              $progress={fullProgress}
            >
              <ButtonContent>💥 Sacrifice for 10x Capacity</ButtonContent>
              <VisuallyHidden
                role="progressbar"
                aria-label="byte foundry sacrifice progress"
                aria-valuenow={intro.bits}
                aria-valuemin={0}
                aria-valuemax={intro.capacity}
              />
            </Button>

            <Button
              aria-label="invest bits for double production"
              disabled={!isFull || alreadyClaimedAtTier}
              onClick={actions.pickIntroProductionMilestone}
              title={
                alreadyClaimedAtTier
                  ? 'Already claimed at this capacity — Sacrifice for 10x Capacity to unlock it again'
                  : 'Spends your current capacity\'s worth of Memory to double your Byte\'s production rate'
              }
              type="button"
              variant={isFull && !alreadyClaimedAtTier ? 'info' : 'neutral'}
              $progress={fullProgress}
            >
              <ButtonContent>⚡ Invest for Double Production</ButtonContent>
              <VisuallyHidden
                role="progressbar"
                aria-label="byte foundry invest progress"
                aria-valuenow={intro.bits}
                aria-valuemin={0}
                aria-valuemax={intro.capacity}
              />
            </Button>
          </>)}

          {canConvert && (
            <Button
              aria-label="convert 1000 bits into 1 Kilobyte"
              onClick={actions.convertIntroBitsToKilobytes}
              title="Spends 1000 bits from your Memory to grant 1 Kilobyte in the main game"
              type="button"
              variant="success"
              $progress={convertProgress}
            >
              <ButtonContent>💾 Convert to a Kilobyte</ButtonContent>
              <VisuallyHidden
                role="progressbar"
                aria-label="byte foundry convert progress"
                aria-valuenow={intro.bits}
                aria-valuemin={0}
                aria-valuemax={INTRO_BITS_PER_KILOBYTE_CONVERSION}
              />
            </Button>
          )}
        </ActionsRow>

        {revealed && (
          <StatusText aria-label="next phase indicator">
            ✨ The main game is close — once you fill this capacity, everything auto-invests into
            Kilobytes.
          </StatusText>
        )}
      </>)}

      {onBack && (
        <Button aria-label="Back to game" onClick={onBack} title="Back to game" type="button" variant="neutral">
          <ButtonContent>← Back to game</ButtonContent>
        </Button>
      )}
    </RootDiv>
  )
}

export default ByteFoundryPage
