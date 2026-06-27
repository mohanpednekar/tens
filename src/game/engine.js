import { LAYER_DEFINITIONS } from './layers'

const clampNonNegative = value => Math.max(0, Number.isFinite(value) ? value : 0)

export const createInitialGameState = () => ({
  layers: LAYER_DEFINITIONS.reduce((layers, layer) => ({
    ...layers,
    [layer.id]: {
      amount: layer.startingAmount,
      generators: layer.generators.reduce((generators, generator) => ({
        ...generators,
        [generator.id]: 0,
      }), {}),
    },
  }), {}),
})

export const formatAmount = value => {
  const safeValue = clampNonNegative(value)

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: safeValue < 100 ? 2 : 0,
  }).format(safeValue)
}

export const getGeneratorCost = (generator, owned) => Math.ceil(
  generator.baseCost * generator.growthRate ** clampNonNegative(owned),
)

export const getLayerProduction = layerState => layerDefinition => (
  layerDefinition.generators.reduce((total, generator) => {
    const owned = layerState.generators[generator.id] ?? 0

    return total + owned * generator.producesPerSecond
  }, 0)
)

export const isLayerUnlocked = state => layer => {
  if (!layer.unlockAt) {
    return true
  }

  return (state.layers[layer.unlockAt.layerId]?.amount ?? 0) >= layer.unlockAt.amount
}

export const tickGame = elapsedSeconds => state => ({
  layers: LAYER_DEFINITIONS.reduce((layers, layer) => {
    const layerState = state.layers[layer.id]
    const production = isLayerUnlocked(state)(layer)
      ? getLayerProduction(layerState)(layer) * elapsedSeconds
      : 0

    return {
      ...layers,
      [layer.id]: {
        ...layerState,
        amount: clampNonNegative(layerState.amount + production),
      },
    }
  }, {}),
})

export const buyGenerator = (layerId, generatorId) => state => {
  const layer = LAYER_DEFINITIONS.find(candidate => candidate.id === layerId)
  const generator = layer?.generators.find(candidate => candidate.id === generatorId)
  const layerState = state.layers[layerId]

  if (!layer || !generator || !layerState || !isLayerUnlocked(state)(layer)) {
    return state
  }

  const owned = layerState.generators[generatorId] ?? 0
  const cost = getGeneratorCost(generator, owned)

  if (layerState.amount < cost) {
    return state
  }

  return {
    ...state,
    layers: {
      ...state.layers,
      [layerId]: {
        ...layerState,
        amount: clampNonNegative(layerState.amount - cost),
        generators: {
          ...layerState.generators,
          [generatorId]: owned + 1,
        },
      },
    },
  }
}
