import Button from 'components/Button'
import Money from 'components/Money'
import StatCard from 'components/StatCard'
import { formatAmount, getGeneratorCost, getLayerProduction, isLayerUnlocked } from 'game/engine'
import { LAYER_DEFINITIONS } from 'game/layers'
import { useIncrementalGame } from 'game/useIncrementalGame'
import styled from 'styled-components'

const RootDiv = styled.main`
  width: min(960px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 0;
`

const Header = styled.header`
  color: white;
  text-align: center;
`

const LayerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`

const GeneratorRow = styled.div`
  align-items: center;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr auto;
`

const MutedText = styled.p`
  color: #a3a3a3;
  margin: 0;
`

const MainPage = () => {
  const { actions, resetGame, state } = useIncrementalGame()

  return (
    <RootDiv>
      <Header>
        <h1>Tens</h1>
        <MutedText>Build generators, unlock layers, and keep the game rules data-driven.</MutedText>
      </Header>

      <LayerGrid>
        {LAYER_DEFINITIONS.map(layer => {
          const layerState = state.layers[layer.id]
          const unlocked = isLayerUnlocked(state)(layer)
          const production = unlocked ? getLayerProduction(layerState)(layer) : 0

          return (
            <StatCard key={layer.id} aria-label={`${layer.name} layer`}>
              <div>
                <h2>{layer.name}</h2>
                <MutedText>{layer.description}</MutedText>
              </div>

              {unlocked ? (
                <>
                  <Money>
                    {layer.resourceSymbol}{formatAmount(layerState.amount)} {layer.resourceName}
                  </Money>
                  <MutedText>
                    +{formatAmount(production)} {layer.resourceName}/sec
                  </MutedText>

                  {layer.generators.map(generator => {
                    const owned = layerState.generators[generator.id] ?? 0
                    const cost = getGeneratorCost(generator, owned)
                    const canAfford = layerState.amount >= cost

                    return (
                      <GeneratorRow key={generator.id}>
                        <div>
                          <strong>{generator.name}</strong>
                          <MutedText>
                            Owned: {owned} · +{formatAmount(generator.producesPerSecond)} /sec
                          </MutedText>
                          <MutedText>{generator.description}</MutedText>
                        </div>
                        <Button
                          color={canAfford ? 'white' : 'darkgrey'}
                          disabled={!canAfford}
                          onClick={() => actions.buyGenerator(layer.id, generator.id)}
                        >
                          Buy {layer.resourceSymbol}{formatAmount(cost)}
                        </Button>
                      </GeneratorRow>
                    )
                  })}
                </>
              ) : (
                <MutedText>
                  Unlocks at {formatAmount(layer.unlockAt.amount)} {LAYER_DEFINITIONS.find(candidate => candidate.id === layer.unlockAt.layerId)?.resourceName ?? 'resources'}.
                </MutedText>
              )}
            </StatCard>
          )
        })}
      </LayerGrid>

      <Button type="button" onClick={resetGame}>Reset prototype</Button>
    </RootDiv>
  )
}

export default MainPage
