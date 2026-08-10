import Button, { ButtonContent, VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import { formatAmount, isIntroConversionUnlocked } from 'game/engine'
import { BITS_PER_BYTE, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_BASE_RATE, INTRO_BYTE_COMBINE_COST } from 'game/layers'
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

const BalanceText = styled.p`
  margin: 0;
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.lg.size};
  font-weight: 700;
  text-align: center;
`

const TapArea = styled.button`
  width: 100%;
  aspect-ratio: 5 / 3;
  border: 1.5px solid ${props => props.theme.color.accent};
  border-radius: ${props => props.theme.radius.lg};
  background: ${props => props.theme.color.surfaceRaised};
  color: ${props => props.theme.color.accent};
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

// Numbers read in Bytes once the Byte generator exists — every capacity value in the ladder
// (8, 80, 800, 8000, …) is evenly divisible by BITS_PER_BYTE, so this always yields clean whole
// numbers. Before the Byte exists there's nothing to denominate in yet, so raw bits read better
// during that initial tap-to-8 bootstrap. See CLAUDE.md's Byte Foundry section.
const formatBitBalance = (bits, byteCreated) =>
  byteCreated ? `${formatAmount(Math.floor(bits / BITS_PER_BYTE))} B` : `${formatAmount(bits)} bit${bits === 1 ? '' : 's'}`

const ByteFoundryPage = ({ game }) => {
  const { actions, state } = game
  const { intro } = state

  const isFull = intro.bits >= intro.capacity
  const canCombine = !intro.byteCreated && intro.bits >= INTRO_BYTE_COMBINE_COST
  const revealed = isIntroConversionUnlocked(state)
  const canConvert = revealed && intro.bits >= INTRO_BITS_PER_KILOBYTE_CONVERSION
  const productionRate = INTRO_BYTE_BASE_RATE * intro.productionMultiplier

  return (
    <RootDiv>
      <Title>⚙️ Byte Foundry</Title>
      <StatusText>
        Tap to generate bits. Combine 8 bits into a Byte to start producing more automatically.
      </StatusText>

      <StatCard aria-label="byte foundry balance">
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
        {intro.byteCreated && (
          <StatusText>+{formatAmount(productionRate)} bit{productionRate === 1 ? '' : 's'}/sec</StatusText>
        )}
      </StatCard>

      <TapArea
        aria-label="tap to generate a bit"
        disabled={isFull}
        onClick={actions.tapIntroBit}
        type="button"
      >
        👆 Tap
      </TapArea>

      <ActionsRow>
        {canCombine && (
          <Button
            aria-label="combine 8 bits into a Byte"
            onClick={actions.combineIntroByte}
            type="button"
            variant="primary"
          >
            <ButtonContent>🔗 Combine into a Byte</ButtonContent>
          </Button>
        )}

        {intro.byteCreated && (<>
          <Button
            aria-label="sacrifice all bits for 10x capacity"
            disabled={!isFull}
            onClick={actions.pickIntroCapacityMilestone}
            title="Empties your bit balance in exchange for 10x capacity"
            type="button"
            variant={isFull ? 'prestige' : 'neutral'}
          >
            <ButtonContent>💥 Sacrifice for 10x Capacity</ButtonContent>
          </Button>

          <Button
            aria-label="invest bits for double production"
            disabled={!isFull}
            onClick={actions.pickIntroProductionMilestone}
            title="Spends your current capacity's worth of bits to double your Byte's production rate"
            type="button"
            variant={isFull ? 'info' : 'neutral'}
          >
            <ButtonContent>⚡ Invest for Double Production</ButtonContent>
          </Button>
        </>)}

        {canConvert && (
          <Button
            aria-label="convert 1000 bits into 1 Kilobyte"
            onClick={actions.convertIntroBitsToKilobytes}
            title="Spends 1000 bits to grant 1 Kilobyte in the main game"
            type="button"
            variant="success"
          >
            <ButtonContent>💾 Convert to a Kilobyte</ButtonContent>
          </Button>
        )}
      </ActionsRow>

      {revealed && (
        <StatusText aria-label="next phase indicator">
          ✨ The main game is close — once you fill this capacity, everything auto-invests into
          Kilobytes.
        </StatusText>
      )}
    </RootDiv>
  )
}

export default ByteFoundryPage
