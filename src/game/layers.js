// Every tier is bought directly with Ones (Money); production cascades down
// through `producesResourceId` into the tier below's owned/resource count.
// 'Tens' intentionally has costResourceId === producesResourceId: it is the
// entry-level money generator, bought with Ones to produce more Ones.
export const TIER_DEFINITIONS = [
  { id: 'Tens',          name: 'Tens',          symbol: 'Tens', baseCost: 10,   costResourceId: 'Ones', producesResourceId: 'Ones' },
  { id: 'Thousands',     name: 'Thousands',     symbol: 'Ks',   baseCost: 1E3,  costResourceId: 'Ones', producesResourceId: 'Tens' },
  { id: 'Millions',      name: 'Millions',      symbol: 'Ms',   baseCost: 1E6,  costResourceId: 'Ones', producesResourceId: 'Thousands' },
  { id: 'Billions',      name: 'Billions',      symbol: 'Bs',   baseCost: 1E9,  costResourceId: 'Ones', producesResourceId: 'Millions' },
  { id: 'Trillions',     name: 'Trillions',     symbol: 'Ts',   baseCost: 1E12, costResourceId: 'Ones', producesResourceId: 'Billions' },
  { id: 'Quadrillions',  name: 'Quadrillions',  symbol: 'Qs',   baseCost: 1E15, costResourceId: 'Ones', producesResourceId: 'Trillions' },
  { id: 'Pentillions',   name: 'Pentillions',   symbol: 'Ps',   baseCost: 1E18, costResourceId: 'Ones', producesResourceId: 'Quadrillions' },
  { id: 'Hexillions',    name: 'Hexillions',    symbol: 'Hs',   baseCost: 1E21, costResourceId: 'Ones', producesResourceId: 'Pentillions' },
  { id: 'Septillions',   name: 'Septillions',   symbol: 'Ss',   baseCost: 1E24, costResourceId: 'Ones', producesResourceId: 'Hexillions' },
  { id: 'Octillions',    name: 'Octillions',    symbol: 'Os',   baseCost: 1E27, costResourceId: 'Ones', producesResourceId: 'Septillions' },
  { id: 'Nonillions',    name: 'Nonillions',    symbol: 'Ns',   baseCost: 1E30, costResourceId: 'Ones', producesResourceId: 'Octillions' },
  { id: 'Decillions',    name: 'Decillions',    symbol: 'Ds',   baseCost: 1E33, costResourceId: 'Ones', producesResourceId: 'Nonillions' },
]


export const RESOURCE_SYMBOL = tierId => TIER_DEFINITIONS.find(t => t.id === tierId)?.symbol || '$'
export const MONEY_ID = 'Ones'
export const MONEY_STARTING_AMOUNT = 10
export const PRESTIGE_PP_COST = 10
export const TICK_RATE_MS = 1000

// Autobuyer PP cost increases per layer: layer 0 → 1 PP, layer 1 → 2 PP, layer 2 → 4 PP, …
export const AUTOBUYER_PP_COST_BASE = 1
