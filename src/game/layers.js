export const TIER_DEFINITIONS = [
  {
    id: 'ones',
    name: 'Ones',
    baseCost: 10,
    costResourceId: 'money',
    producesResourceId: 'money',
  },
  {
    id: 'tens',
    name: 'Tens',
    baseCost: 100,
    costResourceId: 'ones',
    producesResourceId: 'ones',
  },
  {
    id: 'hundreds',
    name: 'Hundreds',
    baseCost: 1000,
    costResourceId: 'tens',
    producesResourceId: 'tens',
  },
  {
    id: 'thousands',
    name: 'Thousands',
    baseCost: 10000,
    costResourceId: 'hundreds',
    producesResourceId: 'hundreds',
  },
]

export const RESOURCE_NAMES = {
  money: 'Money',
  ones: 'Ones',
  tens: 'Tens',
  hundreds: 'Hundreds',
  thousands: 'Thousands',
}

export const RESOURCE_SYMBOL = {
  money: '$',
  ones: '1s',
  tens: '10s',
  hundreds: '100s',
  thousands: '1Ks',
}

export const MONEY_ID = 'money'
export const MONEY_STARTING_AMOUNT = 10
export const PRESTIGE_PP_COST = 10
export const TICK_RATE_MS = 1000
