import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import { formatAmount } from 'game/engine'
import { COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO } from 'game/layers'
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

// Same title/nav-link placement convention ByteFoundryPage's/InfoPage's own <Header> already use.
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

const CountersSection = styled(StatCard)`
  align-items: center;
  width: 100%;
`

const CountersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.space.sm} ${props => props.theme.space.md};
  width: 100%;
`

const CounterTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`

const CounterLabel = styled.span`
  font-size: ${props => props.theme.type.scale.xs.size};
  color: ${props => props.theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

const CounterValue = styled.span`
  font-family: ${props => props.theme.font.display};
  font-weight: 700;
`

const MergeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.sm};
  width: 100%;
`

// Whether merging COMPUTE_MERGE_RATIO of `input` into 1 more of `output` would do anything right
// now — same "at least one full group, and room under the cap" shape the engine's own
// mergeComputeNodesIntoCluster/mergeComputeClustersIntoNetwork/mergeComputeNetworksIntoGrid
// enforce (see engine.js) — this is only a UI mirror of that gate, not a replacement for it; the
// engine re-validates on every call regardless (see "Security notes" in CLAUDE.md).
const canMerge = (input, output) => input >= COMPUTE_MERGE_RATIO && output < COMPUTE_ENTITY_CAP

const MERGE_TIERS = [
  {
    key: 'nodesIntoCluster',
    inputLabel: 'Nodes',
    outputLabel: 'Cluster',
    inputField: 'computeNodes',
    outputField: 'computeClusters',
    action: 'mergeComputeNodesIntoCluster',
  },
  {
    key: 'clustersIntoNetwork',
    inputLabel: 'Clusters',
    outputLabel: 'Network',
    inputField: 'computeClusters',
    outputField: 'computeNetworks',
    action: 'mergeComputeClustersIntoNetwork',
  },
  {
    key: 'networksIntoGrid',
    inputLabel: 'Networks',
    outputLabel: 'Grid',
    inputField: 'computeNetworks',
    outputField: 'computeGrids',
    action: 'mergeComputeNetworksIntoGrid',
  },
]

// Reachable once intro.computeMergePageUnlocked (see App.jsx) via MainPage's own header link,
// alongside "⚙️ Byte Foundry"/"ℹ️ Guide" — Compute Cores/Nodes themselves stay shown on
// ByteFoundryPage's own "Compute" status section (that's Phase 1's scope, see issue #279); this
// page is only for the manual merge chain built on top of them (see issue #280), so
// Clusters/Networks/Grids are shown here and nowhere else, to avoid the two pages duplicating the
// same counters. Cores/Nodes are still shown here too, for context — this page's whole purpose is
// deciding whether to merge a tier upward, which needs the input tier's own count visible right
// next to the merge button that spends it.
const ComputePage = ({ game, onBack }) => {
  const { actions, state } = game
  const { intro } = state

  return (
    <RootDiv>
      <Header>
        <Title>🖥️ Compute</Title>
        <Button aria-label="Back to game" onClick={onBack} title="Back to game" type="button" variant="neutral">
          <ButtonContent>← Back to game</ButtonContent>
        </Button>
      </Header>
      <StatusText>
        {`Merge ${COMPUTE_MERGE_RATIO} of one tier into 1 of the next — your choice, nothing merges automatically. Max ${COMPUTE_ENTITY_CAP} of each.`}
      </StatusText>

      <CountersSection aria-label="compute counters">
        <CountersRow>
          <CounterTile>
            <CounterLabel>Cores</CounterLabel>
            <CounterValue>{`${formatAmount(intro.computeCores ?? 0)}/${COMPUTE_ENTITY_CAP}`}</CounterValue>
          </CounterTile>
          <CounterTile>
            <CounterLabel>Nodes</CounterLabel>
            <CounterValue>{`${formatAmount(intro.computeNodes ?? 0)}/${COMPUTE_ENTITY_CAP}`}</CounterValue>
          </CounterTile>
          <CounterTile>
            <CounterLabel>Clusters</CounterLabel>
            <CounterValue>{`${formatAmount(intro.computeClusters ?? 0)}/${COMPUTE_ENTITY_CAP}`}</CounterValue>
          </CounterTile>
          <CounterTile>
            <CounterLabel>Networks</CounterLabel>
            <CounterValue>{`${formatAmount(intro.computeNetworks ?? 0)}/${COMPUTE_ENTITY_CAP}`}</CounterValue>
          </CounterTile>
          <CounterTile>
            <CounterLabel>Grids</CounterLabel>
            <CounterValue>{`${formatAmount(intro.computeGrids ?? 0)}/${COMPUTE_ENTITY_CAP}`}</CounterValue>
          </CounterTile>
        </CountersRow>
      </CountersSection>

      <MergeRow>
        {MERGE_TIERS.map(({ key, inputLabel, outputLabel, inputField, outputField, action }) => {
          const inputCount = intro[inputField] ?? 0
          const outputCount = intro[outputField] ?? 0
          return (
            <Button
              key={key}
              aria-label={`merge ${COMPUTE_MERGE_RATIO} compute ${inputLabel.toLowerCase()} into 1 compute ${outputLabel.toLowerCase()}`}
              disabled={!canMerge(inputCount, outputCount)}
              onClick={() => actions[action]()}
              title={
                outputCount >= COMPUTE_ENTITY_CAP
                  ? `${outputLabel} is already at the max of ${COMPUTE_ENTITY_CAP}`
                  : `Spend ${COMPUTE_MERGE_RATIO} ${inputLabel} (have ${formatAmount(inputCount)}) for 1 ${outputLabel}`
              }
              type="button"
              variant="prestige"
            >
              <ButtonContent>{`Merge ${COMPUTE_MERGE_RATIO} ${inputLabel} → 1 ${outputLabel}`}</ButtonContent>
            </Button>
          )
        })}
      </MergeRow>
    </RootDiv>
  )
}

export default ComputePage
