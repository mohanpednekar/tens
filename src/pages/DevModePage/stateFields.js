import { COMPUTE_FLOPS_TIER_DEFINITIONS, TIER_DEFINITIONS } from 'game/layers'

// Dev-only: turns any object key that happens to be a known tier id into that tier's display
// name, so a field tree walked straight off live game state (see FieldNode in index.jsx) reads
// as "Kilobytes" rather than a bare "tier01" — without maintaining a separate label table by
// hand. Falls back to the raw key for everything else (there's no exhaustive list to keep in
// sync; unknown keys are just as valid a state shape as known ones).
const TIER_NAME_BY_ID = TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: tier.name }), {})
const FLOPS_TIER_NAME_BY_ID = COMPUTE_FLOPS_TIER_DEFINITIONS.reduce(
  (acc, tier) => ({ ...acc, [tier.id]: tier.name }),
  {},
)

export const prettifySegment = segment => TIER_NAME_BY_ID[segment] ?? FLOPS_TIER_NAME_BY_ID[segment] ?? segment

export const isEditableScalar = value =>
  typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string'

// Immutable set-by-path: rebuilds only the objects along `path`, leaving every sibling key
// (however deep) untouched — the same one-level-deep-per-hop spread mergeStateForDevWrite in
// game/storage.js uses, just applied recursively so it works at any depth (e.g.
// ['intro', 'dataLakes', '1', 'used']). Generic over the actual shape, so it never needs updating
// when engine.js grows a new nested field.
export const setValueAtPath = (obj, path, value) => {
  const [head, ...rest] = path
  if (rest.length === 0) return { ...obj, [head]: value }
  return { ...obj, [head]: setValueAtPath(obj[head] ?? {}, rest, value) }
}
