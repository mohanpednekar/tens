import Button, { ButtonContent } from 'components/Button'
import { canActivateComputeBoost, formatAmount, formatOfflineDuration, isComputeBoostTurnAvailable, isStorageBankBuildAvailable, isStorageBankFillAvailable, isBandwidthAvailable } from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_CAP } from 'game/layers'
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

// Title plus the "← Back to Byte Foundry" exit share one row, the same title/nav-link placement
// convention ByteFoundryPage's own <Header> already uses.
const Header = styled.header`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.space.sm};
  justify-content: space-between;
  width: 100%;
`

const Title = styled.h1`
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  margin: 0;
`

const StatusText = styled.p`
  margin: 0;
  color: ${props => props.theme.color.textMuted};
  text-align: center;
`

// The 3 boost preset buttons read as one paired choice, matching ByteFoundryPage's own
// MilestonesRow (Sacrifice/Invest) convention — each takes an equal share via `flex: 1`.
const PresetsRow = styled.div`
  display: flex;
  gap: ${props => props.theme.space.sm};
  width: 100%;

  > button {
    flex: 1;
    min-width: 0;
  }
`

// Display labels for COMPUTE_BOOST_PRESETS' own keys (layers.js) — the preset objects themselves
// are keyed by a plain lowercase identifier, not a display-ready name.
const COMPUTE_BOOST_LABELS = { burst: 'Burst', standard: 'Standard', sustain: 'Sustain' }

// Compute's own dedicated screen — split out of ByteFoundryPage (see "Byte Foundry" in CLAUDE.md)
// once revealed (isComputeCoreConversionUnlocked), reached via that page's "⚡ Compute" nav
// button. Activation is still gated by the Byte Foundry's forced priority order — Storage Bank
// Fill > Bandwidth > Storage Bank Build > Compute > Memory — so a preset can show disabled here
// even while mechanically activatable (canActivateComputeBoost), if something ranked above
// Compute (which lives back on ByteFoundryPage/StoragePage) currently outranks it.
// `onBack` always returns to the Byte Foundry.
const ComputePage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  const blockedByPriority = isStorageBankFillAvailable(state) || isBandwidthAvailable(state) || isStorageBankBuildAvailable(state)

  return (
    <RootDiv>
      <Header>
        <Title>⚡ Compute</Title>
        <Button aria-label="Back to Byte Foundry" onClick={onBack} title="Back to Byte Foundry" type="button" variant="neutral">
          <ButtonContent>← Back</ButtonContent>
        </Button>
      </Header>
      <StatusText>
        {`Compute Cores: ${formatAmount(intro.computeCores ?? 0)}/${COMPUTE_ENTITY_CAP} · Compute Nodes: ${formatAmount(intro.computeNodes ?? 0)}/${COMPUTE_ENTITY_CAP}`}
      </StatusText>
      <StatusText>
        {`Memory auto-converts into 1 Compute Core every time it fills, flushing your current capacity · ${COMPUTE_CORES_PER_NODE} Cores → 1 Node · max ${COMPUTE_ENTITY_CAP} of each`}
      </StatusText>

      <PresetsRow>
        {Object.entries(COMPUTE_BOOST_PRESETS).map(([boostType, preset]) => (
          <Button
            key={boostType}
            aria-label={`activate ${boostType} compute boost`}
            disabled={!isComputeBoostTurnAvailable(state, boostType)}
            onClick={() => actions.activateComputeBoost(boostType)}
            title={
              canActivateComputeBoost(state, boostType) && blockedByPriority
                ? 'Take a higher-priority upgrade first (Storage Bank Fill, Bandwidth, or Storage Bank Build)'
                : `Spend 1 Compute Core: ×${preset.multiplier} production for ${formatOfflineDuration(preset.durationSeconds)} — stacks up to ${COMPUTE_BOOST_MAX_STACKS}x with the same preset`
            }
            type="button"
            variant="prestige"
          >
            <ButtonContent>{`${COMPUTE_BOOST_LABELS[boostType]} ×${preset.multiplier}`}</ButtonContent>
          </Button>
        ))}
      </PresetsRow>
      {intro.computeBoostType && COMPUTE_BOOST_PRESETS[intro.computeBoostType] && (
        <StatusText aria-label="active compute boost">
          {`${COMPUTE_BOOST_LABELS[intro.computeBoostType] ?? intro.computeBoostType} active: ×${COMPUTE_BOOST_PRESETS[intro.computeBoostType].multiplier} production, ${formatOfflineDuration(intro.computeBoostRemainingSeconds)} left (${intro.computeBoostStacks}x stacked)`}
        </StatusText>
      )}
    </RootDiv>
  )
}

export default ComputePage
