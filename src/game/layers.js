export const LAYER_DEFINITIONS = [
  {
    id: 'ones',
    name: 'Ones',
    description: 'The first production layer. Buy generators that create money every second.',
    resourceName: 'Money',
    resourceSymbol: '$',
    startingAmount: 10,
    generators: [
      {
        id: 'single',
        name: 'Single',
        description: 'Adds one money per second.',
        baseCost: 10,
        growthRate: 1.15,
        producesPerSecond: 1,
      },
      {
        id: 'tenner',
        name: 'Tenner',
        description: 'A stronger first-layer generator for longer runs.',
        baseCost: 100,
        growthRate: 1.18,
        producesPerSecond: 12,
      },
    ],
  },
  {
    id: 'tens',
    name: 'Tens',
    description: 'A prestige-ready layer that can later reset Ones for multipliers.',
    resourceName: 'Tens',
    resourceSymbol: 'T',
    startingAmount: 0,
    unlockAt: {
      layerId: 'ones',
      amount: 1000,
    },
    generators: [
      {
        id: 'bundle',
        name: 'Bundle',
        description: 'Creates tens slowly and demonstrates cross-layer expansion.',
        baseCost: 1,
        growthRate: 2,
        producesPerSecond: 0.05,
      },
    ],
  },
]

export const TICK_RATE_MS = 1000
