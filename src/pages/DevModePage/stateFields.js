import { COMPUTE_FLOPS_TIER_DEFINITIONS, TIER_DEFINITIONS } from 'game/layers'

// Dev-only: turns any object key that happens to be a known tier id into that tier's display
// name, so a field tree walked straight off live game state (see FieldNode in index.jsx) reads
// as "Kilobytes" rather than a bare "tier01" — without maintaining a separate label table by
// hand. Falls back to the raw key for everything else (there's no exhaustive list to keep in
// sync; unknown keys are just as valid a state shape as known ones).
const TIER_NAME_BY_ID = TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: tier.name }), {})
const FLOPS_TIER_NAME_BY_ID = COMPUTE_FLOPS_TIER_DEFINITIONS.reduce(
  (acc, tier) => ({ ...acc, [tier.id]: `${tier.name} · ${tier.outputLabel}` }),
  {},
)

export const prettifySegment = segment => TIER_NAME_BY_ID[segment] ?? FLOPS_TIER_NAME_BY_ID[segment] ?? segment

export const isEditableScalar = value =>
  typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string'

// Immutable set-by-path: rebuilds only the objects along `path`, leaving every sibling key
// (however deep) untouched — the same per-hop spread `mergeStateForDevWrite` in game/storage.js
// uses for its own recursive deep merge, just walking a single explicit path array instead of an
// arbitrary parsed object (e.g. ['intro', 'dataLakes', '1', 'purchased']). Generic over the actual
// shape, so it never needs updating when engine.js grows a new nested field.
export const setValueAtPath = (obj, path, value) => {
  const [head, ...rest] = path
  if (head === '__proto__' || head === 'constructor' || head === 'prototype') return obj
  if (rest.length === 0) return { ...obj, [head]: value }
  return { ...obj, [head]: setValueAtPath(obj[head] ?? {}, rest, value) }
}

// Variables-tree areas, mirroring AppNav's own destinations so a dev finds a field where the
// real game shows it. Rule-based (by top-level key pattern), not a key list: first match wins,
// and an unmatched new key falls through to the 'factory' catch-all — still rendered, never dropped.
export const VARIABLE_AREAS = [
  { id: 'foundry', icon: '🔥', label: 'Foundry', match: key => /^intro$|^computeAutoBoost/.test(key) },
  { id: 'compute', icon: '🖥', label: 'Compute', match: key => /^computeFlops/.test(key) },
  { id: 'era', icon: '🌌', label: 'Era', match: key => /^(era|eons|eonsUpgrades|hyperscaler)/i.test(key) },
  { id: 'purge', icon: '🏆', label: 'Prestige', match: key => /^purge|^autoPurge|^prestige/.test(key) },
  {
    id: 'perks',
    icon: '✨',
    label: 'Perks',
    match: key => /autobuyer|^auto|IntervalLevels$|AttemptBudgets?$|BonusUnlocked$/i.test(key),
  },
  { id: 'factory', icon: '📶', label: 'Factory', match: () => true },
]

export const getVariableAreaId = key => VARIABLE_AREAS.find(area => area.match(key)).id

// Parses a number field's typed draft. Accepts what a dev naturally types for this game's
// powers-of-ten values: plain/decimal, scientific (`1e100`, `8E6`), digit-group separators
// (`1,000`, `1_000`, `1 000`), and a bare `10^N` power. Returns null for anything not a finite
// number, so the caller can mark the input invalid instead of silently writing 0.
export const parseNumberDraft = draft => {
  if (typeof draft !== 'string') return null
  const text = draft.trim().replace(/[,_\s]/g, '')
  if (text === '') return null
  const power = /^10\^(-?\d+(?:\.\d+)?)$/.exec(text)
  // Decimal only — Number() would also accept 0x/0b/0o literals.
  if (!power && !/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(text)) return null
  const n = power ? 10 ** Number(power[1]) : Number(text)
  return Number.isFinite(n) ? n : null
}

// Every scalar/null/array leaf under `value`, as `{ path, value }` — the flat list the Variables
// search filters across all areas at once.
export const collectLeaves = (value, path = []) => {
  if (value !== null && Object.prototype.toString.call(value) === '[object Object]' && (Object.getPrototypeOf(value) === null || Object.getPrototypeOf(value) === Object.prototype)) {
    return Object.entries(value).flatMap(([key, child]) => collectLeaves(child, [...path, key]))
  }
  return path.length === 0 ? [] : [{ path, value }]
}

// Human-readable path ("intro › dataLakes › 1 › capacityLevel", tier ids → display names) that
// the search matches against, so typing either "Kilobytes" or "tier01" finds owned.tier01.
export const describePath = path => path.map(prettifySegment).join(' › ')

export const leafMatchesQuery = (path, query) => {
  const q = query.trim().toLowerCase()
  if (q === '') return true
  return path.join('.').toLowerCase().includes(q) || describePath(path).toLowerCase().includes(q)
}
