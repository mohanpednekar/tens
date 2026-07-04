// Each tier above Ones spends the immediately lower resource it produces.
export const TIER_DEFINITIONS = [
  // 'tens' intentionally has costResourceId === producesResourceId: it is the
  // entry-level money generator, bought with ones to produce more ones.
  { id: 'Tens',            symbol:'Tens', baseCost: 10,  costResourceId: 'ones', producesResourceId: 'Ones' },
  { id: 'Thousands',       symbol:'Ks', baseCost: 1E3, costResourceId: 'ones', producesResourceId: 'Tens' },
  { id: 'Millions',        symbol:'Ms', baseCost: 1E6, costResourceId: 'ones', producesResourceId: 'Thousands' },
  { id: 'Billions',         symbol:'Bs', baseCost: 1E9,  costResourceId: 'ones',  producesResourceId: 'Millions' },
  { id: 'Trillions',       symbol:'Ts', baseCost: 1E12,costResourceId: 'ones',  producesResourceId: 'Billions' },
  { id: 'Quadrillions',     symbol:'Qs', baseCost: 1E15,  costResourceId: 'ones',  producesResourceId: 'Trillions' },
  { id: 'Pentillions',      symbol:'Ps', baseCost: 1E18,  costResourceId: 'ones',  producesResourceId: 'Quadrillions' },
  { id: 'Hexillions',       symbol:'Hs', baseCost: 1E21,  costResourceId: 'ones',  producesResourceId: 'Pentillions' },
  { id: 'Septillions',       symbol:'Ss', baseCost: 1E24,  costResourceId: 'ones',  producesResourceId: 'Hexillions' },
  { id: 'Octillions',       symbol:'Os', baseCost: 1E27,  costResourceId: 'ones',  producesResourceId: 'Septillions' },
  { id: 'Nonillions',       symbol:'Ns', baseCost: 1E30,  costResourceId: 'ones',  producesResourceId: 'Octillions' },
  { id: 'Decillions',       symbol:'Ds', baseCost: 1E33,  costResourceId: 'ones',  producesResourceId: 'Nonillions' },
]


export const RESOURCE_SYMBOL = tierId => TIER_DEFINITIONS.find(t => t.id = tierId).symbol || '$'
export const MONEY_ID = 'ones'
export const MONEY_STARTING_AMOUNT = 10
export const PRESTIGE_PP_COST = 10
export const TICK_RATE_MS = 1000

// Autobuyer PP cost increases per layer: layer 0 → 1 PP, layer 1 → 2 PP, layer 2 → 4 PP, …
export const AUTOBUYER_PP_COST_BASE = 1
