import { applyAutobuyerMilestones, createInitialGameState } from './engine'
import { DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_AUTO_INVEST_THRESHOLD } from './layers'

const STORAGE_KEY = 'tens_game_state'
const LAST_SAVE_TIMESTAMP_KEY = 'tens_last_save_timestamp'

// Legacy name-based tier ids (pre-tier0N rename) mapped to their new naming-agnostic id.
// Nonillions/Decillions have no new id — they were dropped when the tier count went 12 → 10,
// so their old data is discarded rather than remapped (see LEGACY_REMOVED_TIER_IDS below).
const LEGACY_TIER_ID_MAP = {
  Tens: 'tier01',
  Thousands: 'tier02',
  Millions: 'tier03',
  Billions: 'tier04',
  Trillions: 'tier05',
  Quadrillions: 'tier06',
  Pentillions: 'tier07',
  Hexillions: 'tier08',
  Septillions: 'tier09',
  Octillions: 'tier10',
}
const LEGACY_REMOVED_TIER_IDS = new Set(['Nonillions', 'Decillions'])

// Remaps an old-schema per-tier map (resources/owned/purchased/autobuyers) from legacy
// name-based keys to the new tier0N keys, dropping data under removed legacy tier ids;
// keys already in the new scheme (or unrelated, like MONEY_ID) pass through unchanged.
const migrateTierKeys = map =>
  Object.fromEntries(
    Object.entries(map ?? {})
      .filter(([k]) => !LEGACY_REMOVED_TIER_IDS.has(k))
      .map(([k, v]) => [LEGACY_TIER_ID_MAP[k] ?? k, v])
  )

// The tier ladder shifted, not just shrank: old tier01 (Bytes) was pulled out of TIER_DEFINITIONS
// entirely in favor of the Byte Foundry intro (see layers.js/engine.js), and every tier from old
// tier02 (Kilobytes) through old tier10 (Ronnabytes) shifted DOWN one slot to fill new
// tier01-tier09 — new tier10 (Quettabytes) is brand new, with no old-save data to inherit. So an
// old save's per-tier data under the literal key 'tierNN' can't just pass through unchanged (old
// tier02's Kilobytes data would otherwise collide with — and be mistaken for — new tier02's own
// Megabytes data, since both share that key): old tierNN's data must move to new tier(NN-1) for
// every NN from 02 through 10, and old tier01's data has nowhere to go (dropped). Composed with
// migrateTierKeys so both migration hops (legacy name → tier0N, then this shift) happen in one
// pass; every per-tier map merge in migrateState below uses this instead of migrateTierKeys
// directly. Keys outside the tierNN pattern (e.g. MONEY_ID's 'base') pass through unchanged.
const shiftTierIdDown = id => {
  const match = /^tier(\d\d)$/.exec(id)
  if (!match) return id
  const oldIndex = Number(match[1])
  return oldIndex === 1 ? null : `tier${String(oldIndex - 1).padStart(2, '0')}`
}
// The shift itself must NOT be idempotent-unsafe: migrateState runs on every load, and a save
// already on the current (post-shift) tier scheme has no marker distinguishing its 'tier01' (real
// Kilobytes) from an old save's 'tier01' (Bytes, meant to be dropped) — reapplying the shift to an
// already-current save would silently drop its real tier01 data on every subsequent load. Gated on
// `shouldShift` (see migrateState's isPreByteFoundrySave below), which reuses the same one-time
// `saved.intro === undefined` signal that already distinguishes "this save predates the Byte
// Foundry feature entirely" (and therefore predates this exact tier-ladder shift, since both
// landed together) from "this save is already on the current schema." legacy name-based
// remapping (migrateTierKeys) still always runs regardless — those old names have no ambiguity
// problem, since a current-schema save could never contain them.
const shiftOldTierIds = (map, shouldShift) => {
  const remapped = migrateTierKeys(map)
  if (!shouldShift) return remapped
  return Object.fromEntries(
    Object.entries(remapped)
      .map(([k, v]) => [shiftTierIdDown(k), v])
      .filter(([k]) => k !== null)
  )
}

// Merge a saved state with a fresh one so new fields are always present
// and old save files remain playable after schema changes.
const migrateState = saved => {
  const fresh = createInitialGameState()
  // Computed once, reused by every shiftOldTierIds call below (see its own comment) — true only
  // for a save that predates the `intro` field entirely, i.e. one made before the Byte Foundry
  // feature (and the tier-ladder shift that shipped alongside it) existed at all.
  const isPreByteFoundrySave = saved.intro === undefined
  // lastTierTickspeedXpUnlocked was a stored latch flag, since removed in favor of a live
  // owned[lastTierId] >= 10 check (see engine.js's isLastTierTickspeedXpUnlocked) — strip it from
  // an old save rather than carrying it forward forever as unread dead data.
  const { lastTierTickspeedXpUnlocked: _unusedLastTierTickspeedXpUnlocked, ...savedWithoutRemovedFields } = saved
  // Convert legacy boolean autobuyers to level numbers (true → 1, false → null for locked).
  // Numeric values pass through unchanged — they must NOT be remapped to null here, or an
  // in-progress autobuyer would silently relock on the very next load, since a legitimate
  // numeric level would otherwise be indistinguishable from the legacy boolean `false`. A
  // pre-existing save's old level 0 ("unlocked but idle" under a since-removed schema) is left
  // as-is rather than migrated to 1 — tickGame already treats any non-null level as an active
  // autobuyer at the flat baseline purchase rate, so it degrades gracefully without
  // special-casing. A save from before autobuyer unlock became PP-funded (see engine.js's
  // buyAutobuyerUnlock) already has whatever level its autobuyer reached under the old
  // Money-funded activation/Upgrade or PP-funded automation — that level carries forward
  // unchanged; an already-unlocked tier is never punished or relocked by this schema change.
  const rawAutobuyers = shiftOldTierIds(saved.autobuyers, isPreByteFoundrySave)
  const migratedAutobuyers = Object.fromEntries(
    Object.entries(rawAutobuyers).map(([k, v]) => [k, v === true ? 1 : v === false ? null : v])
  )
  // tickspeedLevels is a new field (see engine.js) — before this schema change, a tier's Money-
  // funded tickspeed level was stored directly in autobuyers[tierId] instead (autobuyer unlock
  // and the tickspeed level were the same field). Recover that old level for any tier where the
  // raw saved autobuyers value is a genuine number above the baseline (the legacy true/false
  // booleans never encoded a level, so those are excluded) — otherwise a pre-migration save would
  // silently lose that tier's tickspeed progress back down to level 1 the first time it loads
  // under the new schema. A save already on the new schema (its own tickspeedLevels field) wins.
  const legacyTickspeedLevels = Object.fromEntries(
    Object.entries(rawAutobuyers).filter(([, v]) => typeof v === 'number' && v > 1)
  )
  // autoPrestige was originally a plain boolean (bought/not bought) before becoming a levelled
  // upgrade like autobuyers above — migrate the same way: true → level 1, false → null (not yet
  // bought). A numeric value (current schema) passes through unchanged.
  const rawAutoPrestige = saved.autoPrestige
  const migratedAutoPrestige = rawAutoPrestige === true ? 1 : rawAutoPrestige === false ? null : rawAutoPrestige
  // Carry forward legacy prestige.pp (renamed to prestige.xp) so old saves don't lose points
  const rawPrestige = saved.prestige ?? {}
  const { pp: legacyPP, level: legacyLevel, ...migratedPrestige } = rawPrestige
  if (migratedPrestige.xp === undefined && legacyPP !== undefined) {
    migratedPrestige.xp = legacyPP
  }
  // Legacy `level` (used to double production directly) is renamed `count` (times prestiged)
  // now that prestige awards spendable Prestige Points instead — an old save's prestige count
  // carries forward unchanged under the new field name. `points` (the new PP balance) has no
  // legacy equivalent — a save that predates it merges in fresh's 0 default below.
  if (migratedPrestige.count === undefined && legacyLevel !== undefined) {
    migratedPrestige.count = legacyLevel
  }
  // MONEY_ID was renamed from 'Ones' to 'base' (see layers.js) — forward a legacy
  // resources.Ones balance to resources.base so an old save doesn't lose its money on load, same
  // shape as the prestige.pp → prestige.xp forwarding above.
  const { Ones: legacyOnes, ...migratedResourcesRaw } = saved.resources ?? {}
  if (migratedResourcesRaw.base === undefined && legacyOnes !== undefined) {
    migratedResourcesRaw.base = legacyOnes
  }
  // purchaseLevels/purchaseLevelProgress are new fields (see engine.js) replacing a fixed
  // PURCHASE_BLOCK_SIZE constant that used to define what a tier "level" was (see
  // docs/DESIGN_HISTORY.md) — an old save predating them only has a lifetime `purchased` count,
  // with no notion of "level" or "progress within a level" at all. For any tier missing its own
  // purchaseLevels/purchaseLevelProgress entry, derive an equivalent level/progress from that
  // legacy purchased count using DEFAULT_PURCHASE_BLOCK_SIZE (the only block size that could ever
  // have applied to a save from before block size became variable) — a one-time interpretation of
  // old data on load, not an ongoing engine mechanism (the running game never derives a tier's
  // level from its purchased count via division any more).
  const migratedPurchased = shiftOldTierIds(saved.purchased ?? saved.owned ?? {}, isPreByteFoundrySave)
  const savedPurchaseLevels = shiftOldTierIds(saved.purchaseLevels, isPreByteFoundrySave)
  const savedPurchaseLevelProgress = shiftOldTierIds(saved.purchaseLevelProgress, isPreByteFoundrySave)
  const derivedPurchaseLevels = {}
  const derivedPurchaseLevelProgress = {}
  Object.keys(fresh.purchaseLevels).forEach(tierId => {
    if (savedPurchaseLevels[tierId] !== undefined) return
    const legacyPurchased = migratedPurchased[tierId] ?? 0
    const level = Math.floor(legacyPurchased / DEFAULT_PURCHASE_BLOCK_SIZE) + 1
    derivedPurchaseLevels[tierId] = level
    derivedPurchaseLevelProgress[tierId] = legacyPurchased - (level - 1) * DEFAULT_PURCHASE_BLOCK_SIZE
  })
  // A save from before the Byte Foundry intro existed has no `intro` field at all — such a player
  // already has real main-game progress (owned tiers, PP, etc.), so backfill mainGameUnlocked:
  // true (and a fully-spent bitsTransferredThisCycle, matching what "already past this cycle's
  // transfer budget" implies) and send them straight to MainPage rather than making them play the
  // intro from scratch; every other intro field is irrelevant once mainGameUnlocked is true but
  // kept whole via fresh's defaults regardless. A truly fresh browser (loadGameState returns null,
  // this function never runs at all) still gets createInitialGameState's real
  // intro.mainGameUnlocked: false default and sees the intro.
  //
  // A save that already has its own `intro` (this feature already existed for it) merges
  // normally — EXCEPT one further backward-compat case: a save from between the Byte Foundry's
  // original release and this mainGameUnlocked/bitsTransferredThisCycle split has an old boolean
  // `completed` field but no `mainGameUnlocked` key at all. Naively merging such a save would
  // silently default mainGameUnlocked to fresh's `false`, sending an already-unlocked player back
  // through the mandatory gate — so that case is backfilled explicitly from the old `completed`
  // value instead. The stale `completed` key itself is left in place afterward (harmless once
  // nothing reads it, same as any other superseded field elsewhere in this file). A save that
  // already has `mainGameUnlocked` (post-this-change) needs no such backfill and merges normally.
  const introPredatesMainGameUnlocked = saved.intro !== undefined && saved.intro.mainGameUnlocked === undefined
  const migratedIntro = isPreByteFoundrySave
    ? { ...fresh.intro, mainGameUnlocked: true, bitsTransferredThisCycle: INTRO_AUTO_INVEST_THRESHOLD }
    : {
      ...fresh.intro,
      ...saved.intro,
      ...(introPredatesMainGameUnlocked ? {
        mainGameUnlocked: saved.intro.completed === true,
        bitsTransferredThisCycle: saved.intro.completed === true ? INTRO_AUTO_INVEST_THRESHOLD : 0,
      } : {}),
    }

  // applyAutobuyerMilestones (see engine.js) retroactively unlocks any tier autobuyer/tier-
  // tickspeed-autobuyer a save's prestige.count already qualifies for under the new
  // milestone-based unlock — a player who prestiged several times before this feature existed
  // shouldn't have to prestige again just to receive what they've already earned. Never revokes
  // anything already unlocked (e.g. via the old PP-cost purchase), only adds.
  return applyAutobuyerMilestones({
    ...fresh,
    ...savedWithoutRemovedFields,
    resources: { ...fresh.resources, ...shiftOldTierIds(migratedResourcesRaw, isPreByteFoundrySave) },
    owned:     { ...fresh.owned,     ...shiftOldTierIds(saved.owned, isPreByteFoundrySave) },
    // Reuses the migratedPurchased computed above instead of recomputing shiftOldTierIds again.
    purchased: { ...fresh.purchased, ...migratedPurchased },
    purchaseLevels: { ...fresh.purchaseLevels, ...derivedPurchaseLevels, ...savedPurchaseLevels },
    purchaseLevelProgress: { ...fresh.purchaseLevelProgress, ...derivedPurchaseLevelProgress, ...savedPurchaseLevelProgress },
    autobuyers: { ...fresh.autobuyers, ...migratedAutobuyers },
    // New fields (see engine.js) — a save predating them has no autobuyersEnabled/
    // tierTickspeedAutobuyerEnabled key at all, so merging fresh's all-true defaults underneath
    // backfills every tier to true, matching every already-permanent automation the player had
    // running before this pause/resume feature existed.
    autobuyersEnabled: { ...fresh.autobuyersEnabled, ...shiftOldTierIds(saved.autobuyersEnabled, isPreByteFoundrySave) },
    tickspeedLevels: { ...fresh.tickspeedLevels, ...legacyTickspeedLevels, ...shiftOldTierIds(saved.tickspeedLevels, isPreByteFoundrySave) },
    autobuyerAttemptBudgets: { ...fresh.autobuyerAttemptBudgets, ...shiftOldTierIds(saved.autobuyerAttemptBudgets, isPreByteFoundrySave) },
    tierProductionAccumulators: { ...fresh.tierProductionAccumulators, ...shiftOldTierIds(saved.tierProductionAccumulators, isPreByteFoundrySave) },
    smartAutobuyer: { ...fresh.smartAutobuyer, ...shiftOldTierIds(saved.smartAutobuyer, isPreByteFoundrySave) },
    tierTickspeedAutobuyer: { ...fresh.tierTickspeedAutobuyer, ...shiftOldTierIds(saved.tierTickspeedAutobuyer, isPreByteFoundrySave) },
    tierTickspeedAutobuyerEnabled: { ...fresh.tierTickspeedAutobuyerEnabled, ...shiftOldTierIds(saved.tierTickspeedAutobuyerEnabled, isPreByteFoundrySave) },
    everUnlockedTierIds: { ...fresh.everUnlockedTierIds, ...shiftOldTierIds(saved.everUnlockedTierIds, isPreByteFoundrySave) },
    autoPrestige: migratedAutoPrestige === undefined ? fresh.autoPrestige : migratedAutoPrestige,
    prestige:  { ...fresh.prestige,  ...migratedPrestige },
    intro: migratedIntro,
  })
}

// Stamps a separate "last save" timestamp on every save (its own key, like the timestamp isn't
// part of the game-state shape itself) — read back by loadLastSaveTimestamp on the next load to
// figure out how long the game was closed for, to drive offline progress.
export const saveGameState = state => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    localStorage.setItem(LAST_SAVE_TIMESTAMP_KEY, String(Date.now()))
  } catch {
    // Silently ignore (storage quota exceeded, private-browsing restrictions, etc.)
  }
}

export const loadGameState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return migrateState(JSON.parse(raw))
  } catch {
    return null
  }
}

// Milliseconds since epoch as of the most recent saveGameState call, or null if there's no
// record of one (never saved, or an older save predating this feature). Used to compute how
// long the game was closed for offline progress; a missing/invalid value means "unknown", not
// "just now" — callers should skip offline progress rather than guess.
export const loadLastSaveTimestamp = () => {
  try {
    const raw = localStorage.getItem(LAST_SAVE_TIMESTAMP_KEY)
    if (!raw) return null
    const parsed = Number(raw)
    return Number.isFinite(parsed) ? parsed : null
  } catch {
    return null
  }
}

export const clearGameState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LAST_SAVE_TIMESTAMP_KEY)
  } catch {
    // Silently ignore
  }
}
