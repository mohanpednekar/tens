// Each tier above Ones spends the immediately lower resource it produces.
export const TIER_DEFINITIONS = [
  // 'ones' intentionally has costResourceId === producesResourceId: it is the
  // entry-level money generator, bought with money to produce more money.
  { id: 'ones',             name: 'Ones',             baseCost: 10, costResourceId: 'money',           producesResourceId: 'money' },
  { id: 'tens',             name: 'Tens',             baseCost: 10, costResourceId: 'ones',            producesResourceId: 'ones' },
  { id: 'hundreds',         name: 'Hundreds',         baseCost: 10, costResourceId: 'tens',            producesResourceId: 'tens' },
  { id: 'thousands',        name: 'Thousands',        baseCost: 10, costResourceId: 'hundreds',        producesResourceId: 'hundreds' },
  { id: 'ten_thousands',    name: 'Ten-Thousands',    baseCost: 10, costResourceId: 'thousands',       producesResourceId: 'thousands' },
  { id: 'hundred_thousands', name: 'Hundred-Thousands', baseCost: 10, costResourceId: 'ten_thousands',   producesResourceId: 'ten_thousands' },
  { id: 'millions',         name: 'Millions',         baseCost: 10, costResourceId: 'hundred_thousands',producesResourceId: 'hundred_thousands' },
  { id: 'ten_millions',     name: 'Ten-Millions',     baseCost: 10, costResourceId: 'millions',        producesResourceId: 'millions' },
  { id: 'hundred_millions', name: 'Hundred-Millions', baseCost: 10, costResourceId: 'ten_millions',    producesResourceId: 'ten_millions' },
  { id: 'billions',         name: 'Billions',         baseCost: 10, costResourceId: 'hundred_millions',producesResourceId: 'hundred_millions' },
]

export const RESOURCE_NAMES = {
  money:             'Money',
  ones:              'Ones',
  tens:              'Tens',
  hundreds:          'Hundreds',
  thousands:         'Thousands',
  ten_thousands:     'Ten-Thousands',
  hundred_thousands: 'Hundred-Thousands',
  millions:          'Millions',
  ten_millions:      'Ten-Millions',
  hundred_millions:  'Hundred-Millions',
}

export const RESOURCE_SYMBOL = {
  money:             '$',
  ones:              '1s',
  tens:              '10s',
  hundreds:          '100s',
  thousands:         '1Ks',
  ten_thousands:     '10Ks',
  hundred_thousands: '100Ks',
  millions:          '1Ms',
  ten_millions:      '10Ms',
  hundred_millions:  '100Ms',
}

export const MONEY_ID = 'money'
export const MONEY_STARTING_AMOUNT = 10
export const PRESTIGE_PP_COST = 10
export const TICK_RATE_MS = 1000

// Autobuyer PP cost doubles per layer: layer 0 → 1 PP, layer 1 → 2 PP, layer 2 → 4 PP, …
export const AUTOBUYER_PP_COST_BASE = 1
