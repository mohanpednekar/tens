import { applyFlopsAutobuyerMilestones, createEmptyDataLakes, createInitialGameState, normalizePoolMemoryCapacity } from './engine'
import { COMPUTE_FLOPS_REVEAL_PP, PRESTIGE_UNBOUNDED_MIN_COUNT } from './layers'
import { adaptSaveForCurrentSchema, SAVE_SCHEMA_VERSION } from 'save-migration'

// Drop __proto__/constructor at parse time so localStorage/Dev JSON cannot pollute merges.
const safeJsonParse = jsonString =>
  JSON.parse(jsonString, (key, value) => {
    if (key === '__proto__' || key === 'constructor') return undefined
    return value
  })

// Slot 0 keeps the legacy keys so existing tests, e2e specs, and older browsers that only
// ever wrote a single save keep working without a forced rewrite of every consumer.
const STORAGE_KEY = 'tens_game_state'
const LAST_SAVE_TIMESTAMP_KEY = 'tens_last_save_timestamp'
const SAVES_META_KEY = 'tens_saves_meta'

// Dev Mode (see pages/DevModePage) — a save entirely separate from the player-facing slot system
// above (FREE_SLOT_COUNT/SUPPORTER_SLOT_COUNT/tens_saves_meta): its own storage keys, no slot
// index, not counted against or listed by listSaveSlots. The dev-mode-active flag is itself a
// tiny piece of persisted state (so the toggle survives a reload) but is deliberately NOT part of
// tens_saves_meta — flipping it must never touch a real player's slot bookkeeping.
const DEV_MODE_ACTIVE_KEY = 'tens_dev_mode_active'
const DEV_SLOT_ID = 'dev'
const DEV_STATE_KEY = 'tens_dev_state'
const DEV_TIMESTAMP_KEY = 'tens_dev_timestamp'

/** Free players get one slot; a redeemed supporter unlock code raises this to SUPPORTER_SLOT_COUNT. */
export const FREE_SLOT_COUNT = 1
/** Total slots available after redeeming the placeholder supporter unlock code (payment later). */
export const SUPPORTER_SLOT_COUNT = 3
/**
 * Placeholder unlock code until real checkout ships. Case-insensitive; hyphens optional.
 * Not a secret — it gates meta QoL only (extra local save slots), not economy power.
 */
export const SUPPORTER_UNLOCK_CODE = 'TENS-SUPPORT'

const slotStateKey = slotId => {
  if (slotId === DEV_SLOT_ID) return DEV_STATE_KEY
  return slotId === '0' ? STORAGE_KEY : `tens_slot_${slotId}_state`
}
const slotTimestampKey = slotId => {
  if (slotId === DEV_SLOT_ID) return DEV_TIMESTAMP_KEY
  return slotId === '0' ? LAST_SAVE_TIMESTAMP_KEY : `tens_slot_${slotId}_timestamp`
}

const defaultSlotName = index => `Save ${index + 1}`

const buildDefaultMeta = () => ({
  activeSlotId: '0',
  unlockedSlotCount: FREE_SLOT_COUNT,
  supporterUnlocked: false,
  supporterSource: null,
  slots: [{ id: '0', name: defaultSlotName(0) }],
})

const normalizeUnlockCode = code =>
  String(code ?? '')
    .trim()
    .toUpperCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')

const readRawMeta = () => {
  try {
    const raw = localStorage.getItem(SAVES_META_KEY)
    if (!raw) return null
    return safeJsonParse(raw)
  } catch {
    return null
  }
}

const writeMeta = meta => {
  try {
    localStorage.setItem(SAVES_META_KEY, JSON.stringify(meta))
  } catch {
    // Silently ignore (quota / private browsing)
  }
}

const withSupporterSlots = meta => {
  const unlockedSlotCount = meta.supporterUnlocked ? SUPPORTER_SLOT_COUNT : FREE_SLOT_COUNT
  const slots = []
  const slotMap = new Map()
  if (meta.slots) {
    for (const s of meta.slots) {
      slotMap.set(s.id, s)
    }
  }
  for (let i = 0; i < unlockedSlotCount; i += 1) {
    const id = String(i)
    slots.push(slotMap.get(id) ?? { id, name: defaultSlotName(i) })
  }
  const activeSlotId = slots.some(s => s.id === meta.activeSlotId) ? meta.activeSlotId : '0'
  return {
    ...meta,
    unlockedSlotCount,
    activeSlotId,
    slots,
    supporterUnlocked: Boolean(meta.supporterUnlocked),
    supporterSource: meta.supporterSource ?? null,
  }
}

const coerceMeta = raw => {
  const base = buildDefaultMeta()
  if (!raw || typeof raw !== 'object') return base
  const supporterUnlocked = Boolean(raw.supporterUnlocked)
  const slotsById = new Map()
  if (Array.isArray(raw.slots)) {
    for (const entry of raw.slots) {
      if (!entry || typeof entry !== 'object') continue
      const id = String(entry.id ?? '')
      if (!/^\d+$/.test(id)) continue
      const index = Number(id)
      if (index < 0 || index >= SUPPORTER_SLOT_COUNT) continue
      slotsById.set(id, {
        id,
        name: typeof entry.name === 'string' && entry.name.trim() ? entry.name.trim() : defaultSlotName(index),
      })
    }
  }
  return withSupporterSlots({
    ...base,
    supporterUnlocked,
    supporterSource: raw.supporterSource === 'code' || raw.supporterSource === 'dummy_purchase'
      ? raw.supporterSource
      : supporterUnlocked
        ? 'code'
        : null,
    activeSlotId: String(raw.activeSlotId ?? '0'),
    slots: Array.from(slotsById.values()),
  })
}

/** Ensures meta exists and returns it. */
export const loadSavesMeta = () => {
  const coerced = coerceMeta(readRawMeta())
  writeMeta(coerced)
  return coerced
}

/**
 * Whether Dev Mode (a separate, isolated save — see pages/DevModePage) is currently active.
 * Read fresh from localStorage on every call (like loadSavesMeta) rather than cached, since
 * getActiveSlotId below must reflect a toggle immediately without a plumbed-through re-render.
 */
export const isDevModeActive = () => {
  try {
    return localStorage.getItem(DEV_MODE_ACTIVE_KEY) === '1'
  } catch {
    return false
  }
}

/** Flips the Dev Mode flag. Does not touch game state itself — callers must reload after. */
export const setDevModeActive = active => {
  try {
    if (active) localStorage.setItem(DEV_MODE_ACTIVE_KEY, '1')
    else localStorage.removeItem(DEV_MODE_ACTIVE_KEY)
  } catch {
    // Silently ignore (quota / private browsing)
  }
}

// Every save/load/clear helper below (loadGameState, saveGameState, clearGameState, ...) reads
// the active slot id through this one function, so redirecting it to DEV_SLOT_ID while Dev Mode
// is active transparently isolates every read/write to the dev save without those helpers having
// to know Dev Mode exists — a real player's slots (0..SUPPORTER_SLOT_COUNT-1) are never touched
// while it's on, and switching it off resumes exactly where the real save left off.
export const getActiveSlotId = () => (isDevModeActive() ? DEV_SLOT_ID : loadSavesMeta().activeSlotId)

export const isSupporterUnlocked = () => Boolean(loadSavesMeta().supporterUnlocked)

/** Permanently unlocks the Supporter pack (slots + museum + ops). Idempotent. */
export const grantSupporterUnlock = (source = 'code') => {
  const meta = loadSavesMeta()
  if (meta.supporterUnlocked) {
    return { ok: true, already: true, meta }
  }
  const next = withSupporterSlots({
    ...meta,
    supporterUnlocked: true,
    supporterSource: source === 'dummy_purchase' ? 'dummy_purchase' : 'code',
  })
  writeMeta(next)
  return { ok: true, meta: next }
}

const hasStoredStateForSlot = slotId => {
  try {
    return localStorage.getItem(slotStateKey(slotId)) != null
  } catch {
    return false
  }
}

/**
 * Player-facing slot list: always SUPPORTER_SLOT_COUNT rows so locked extras are visible,
 * with `unlocked` false beyond unlockedSlotCount.
 */
export const listSaveSlots = () => {
  const meta = loadSavesMeta()
  const rows = []
  const slotsById = new Map()
  for (const slot of meta.slots) {
    slotsById.set(slot.id, slot)
  }
  for (let i = 0; i < SUPPORTER_SLOT_COUNT; i += 1) {
    const id = String(i)
    const unlocked = i < meta.unlockedSlotCount
    const named = slotsById.get(id)
    rows.push({
      id,
      name: named?.name ?? defaultSlotName(i),
      unlocked,
      isActive: meta.activeSlotId === id,
      isEmpty: unlocked ? !hasStoredStateForSlot(id) : true,
    })
  }
  return rows
}

/**
 * Points save/load/clear at a different slot. Does not load state itself — callers
 * (useIncrementalGame) must load after switching. Rejects locked / unknown ids.
 */
export const setActiveSaveSlot = slotId => {
  // Refuses to move the REAL active-slot pointer while Dev Mode is active — this bypasses
  // getActiveSlotId's own dev-mode redirect (it targets an explicit numbered slot id, not "the
  // active slot"), so without this guard, switching slots from Settings while parked in Dev Mode
  // would silently repoint a real player's active save with no visible effect on screen (the dev
  // save keeps rendering) until Dev Mode is later turned off. See CLAUDE.md's "Dev Mode" section.
  if (isDevModeActive()) return { ok: false, reason: 'dev_mode_active' }
  const id = String(slotId)
  const meta = loadSavesMeta()
  const index = Number(id)
  if (!Number.isInteger(index) || index < 0 || index >= meta.unlockedSlotCount) {
    return { ok: false, reason: 'locked' }
  }
  if (meta.activeSlotId === id) return { ok: true, already: true, meta }
  const next = { ...meta, activeSlotId: id }
  writeMeta(next)
  return { ok: true, meta: next }
}

export const renameSaveSlot = (slotId, name) => {
  const id = String(slotId)
  const meta = loadSavesMeta()
  const trimmed = String(name ?? '').trim()
  if (!trimmed) return { ok: false, reason: 'empty' }
  const index = meta.slots.findIndex(s => s.id === id)
  if (index < 0) return { ok: false, reason: 'missing' }
  const slots = meta.slots.map((s, i) => (i === index ? { ...s, name: trimmed.slice(0, 40) } : s))
  const next = { ...meta, slots }
  writeMeta(next)
  return { ok: true, meta: next }
}

/**
 * Redeems the placeholder supporter unlock code. Unlocks the full Supporter pack
 * (extra save slots, Prestige museum, Ops dashboard). Real payment replaces this later.
 */
export const redeemSupporterUnlockCode = code => {
  if (normalizeUnlockCode(code) !== SUPPORTER_UNLOCK_CODE) {
    return { ok: false, reason: 'invalid' }
  }
  return grantSupporterUnlock('code')
}

/**
 * Dummy checkout stand-in until real payment ships. Always "succeeds" and grants the same
 * entitlement as a valid unlock code — no money moves, no network call.
 */
export const completeDummySupporterPurchase = () => grantSupporterUnlock('dummy_purchase')

export const getActiveSlotDisplayName = () => {
  const meta = loadSavesMeta()
  return meta.slots.find(s => s.id === meta.activeSlotId)?.name ?? defaultSlotName(0)
}

/**
 * Confirm copy for wiping the active slot. Never implies other slots or Supporter unlock are lost.
 */
export const buildResetActiveSlotConfirmMessage = () => {
  const meta = loadSavesMeta()
  const name = getActiveSlotDisplayName()
  const survivors = []
  if (meta.unlockedSlotCount > 1) survivors.push('other save slots')
  if (meta.supporterUnlocked) survivors.push('your Supporter unlock')
  const survivorLine = survivors.length
    ? `\n\nKept: ${survivors.join(' and ')}.`
    : ''
  return `Erase "${name}" (active save) and start over from the Byte Foundry?${survivorLine}\n\nThis cannot be undone.`
}

/**
 * Confirm copy for wiping only Byte Foundry / Storage / Compute on the active save.
 * Ladder + Prestige progress stay; other slots and Supporter unlock are untouched.
 */
export const buildResetByteFoundryConfirmMessage = () => {
  const name = getActiveSlotDisplayName()
  return (
    `Reset Byte Foundry on "${name}"?\n\n` +
    `Use this if Capacity (or Storage / Compute) went too far.\n\n` +
    `Erased: Data Stream Buffer, pool Memory Capacity, Combine / Speed (Invest) progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\n` +
    `Convenience: Combine, Speed (Invest), and Disk Build all auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Combine snaps Buffer to the pool Memory end bound.\n\n` +
    `Also kept: Ladder, Prestige Points / count / upgrades, and (if already unlocked) access to the main game this cycle.\n\n` +
    `Other save slots and your Supporter unlock (if any) stay.\n\n` +
    `This cannot be undone.`
  )
}

export const buildClearSlotConfirmMessage = slot => {
  const label = slot?.name ?? 'this save'
  const activeNote = slot?.isActive ? ' (currently active — you will restart at the Byte Foundry)' : ''
  return `Clear "${label}"${activeNote}?\n\nOther slots and your Supporter unlock (if any) stay.\n\nThis cannot be undone.`
}

export const buildEraseAllSavesConfirmMessage = () => {
  const meta = loadSavesMeta()
  const unlockNote = meta.supporterUnlocked
    ? 'Your Supporter unlock and slot names stay.'
    : 'Slot names stay.'
  return `Erase ALL save progress on this device?\n\n${unlockNote}\n\nThis cannot be undone.`
}

const removeSlotStorage = slotId => {
  try {
    localStorage.removeItem(slotStateKey(slotId))
    localStorage.removeItem(slotTimestampKey(slotId))
  } catch {
    // Silently ignore
  }
}

/**
 * Clears one unlocked slot's game data. Does not change active slot id or Supporter entitlement.
 * Returns { ok, clearedActive } so the hook can reload fresh state when the active slot was wiped.
 */
export const clearSaveSlot = slotId => {
  // Refuses to wipe a REAL numbered slot while Dev Mode is active — this targets an explicit
  // slot id, not "the active slot" (getActiveSlotId's own dev-mode redirect never enters into
  // it), so without this guard, clicking "Clear" on a real slot from Settings while parked in
  // Dev Mode would permanently erase real player data even though the screen is showing the dev
  // save the whole time. See CLAUDE.md's "Dev Mode" section / clearGameState below for the
  // dev-mode-safe equivalent.
  if (isDevModeActive()) return { ok: false, reason: 'dev_mode_active' }
  const id = String(slotId)
  const meta = loadSavesMeta()
  const index = Number(id)
  if (!Number.isInteger(index) || index < 0 || index >= meta.unlockedSlotCount) {
    return { ok: false, reason: 'locked' }
  }
  removeSlotStorage(id)
  return { ok: true, clearedActive: meta.activeSlotId === id, meta }
}

/**
 * Wipes every slot's game state + timestamps. Keeps tens_saves_meta (supporter unlock, names,
 * active slot id). Never revokes supporterUnlocked.
 */
export const clearAllSaveProgress = () => {
  // Same reasoning as clearSaveSlot above — this iterates every REAL numbered slot id directly,
  // bypassing getActiveSlotId's dev-mode redirect entirely, so it must refuse to run at all while
  // Dev Mode is active rather than silently destroying real save data behind the dev save's back.
  if (isDevModeActive()) return { ok: false, reason: 'dev_mode_active' }
  for (let i = 0; i < SUPPORTER_SLOT_COUNT; i += 1) {
    removeSlotStorage(String(i))
  }
  // Touch meta so coerce stays normalized without clearing entitlement.
  const meta = loadSavesMeta()
  return { ok: true, meta }
}

/** Re-exported for callers/tests — canonical definitions live in save-migration/. */
export { SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason } from 'save-migration'

const readActiveSavePayload = () => {
  const slotId = getActiveSlotId()
  try {
    const raw = localStorage.getItem(slotStateKey(slotId))
    if (!raw) return null
    return safeJsonParse(raw)
  } catch {
    return null
  }
}

/** Clears the active slot when save-migration cannot return a current-compatible payload. */
export const discardIncompatibleActiveSaveIfNeeded = () => {
  const slotId = getActiveSlotId()
  const parsed = readActiveSavePayload()
  if (!parsed) return null
  const result = adaptSaveForCurrentSchema(parsed)
  if (result.ok) return null
  removeSlotStorage(slotId)
  return result.reason
}

const mergeTierMap = (freshMap, savedMap) => ({ ...freshMap, ...(savedMap ?? {}) })

const mergeDataLakes = (fresh, saved) => {
  const merged = createEmptyDataLakes()
  for (const tier of Object.keys(merged)) {
    const f = merged[tier]
    const s = saved?.[tier]
    merged[tier] = {
      ...f,
      ...(s ?? {}),
      deposits: { ...f.deposits, ...(s?.deposits ?? {}) },
    }
  }
  return merged
}

// Merge a saved state with fresh defaults so newly added fields are present on load.
// Schema transforms run in save-migration/ on every load before this runs.
const mergeState = saved => {
  const fresh = createInitialGameState()
  const { lastTierTickspeedXpUnlocked: _removed, ...savedClean } = saved

  return normalizePoolMemoryCapacity(applyFlopsAutobuyerMilestones({
    ...fresh,
    ...savedClean,
    resources: mergeTierMap(fresh.resources, saved.resources),
    owned: mergeTierMap(fresh.owned, saved.owned),
    purchased: mergeTierMap(fresh.purchased, saved.purchased),
    purchaseLevels: mergeTierMap(fresh.purchaseLevels, saved.purchaseLevels),
    purchaseLevelProgress: mergeTierMap(fresh.purchaseLevelProgress, saved.purchaseLevelProgress),
    autobuyers: mergeTierMap(fresh.autobuyers, saved.autobuyers),
    autobuyersEnabled: mergeTierMap(fresh.autobuyersEnabled, saved.autobuyersEnabled),
    tickspeedLevels: mergeTierMap(fresh.tickspeedLevels, saved.tickspeedLevels),
    autobuyerAttemptBudgets: mergeTierMap(fresh.autobuyerAttemptBudgets, saved.autobuyerAttemptBudgets),
    tierProductionAccumulators: mergeTierMap(fresh.tierProductionAccumulators, saved.tierProductionAccumulators),
    smartAutobuyer: mergeTierMap(fresh.smartAutobuyer, saved.smartAutobuyer),
    tierTickspeedAutobuyer: mergeTierMap(fresh.tierTickspeedAutobuyer, saved.tierTickspeedAutobuyer),
    tierTickspeedAutobuyerEnabled: mergeTierMap(fresh.tierTickspeedAutobuyerEnabled, saved.tierTickspeedAutobuyerEnabled),
    everUnlockedTierIds: mergeTierMap(fresh.everUnlockedTierIds, saved.everUnlockedTierIds),
    prestige: {
      ...fresh.prestige,
      ...(saved.prestige ?? {}),
      unboundedUnlocked: Boolean(saved.prestige?.unboundedUnlocked)
        || Math.max(0, Number(saved.prestige?.count) || 0) >= PRESTIGE_UNBOUNDED_MIN_COUNT,
    },
    era: { ...fresh.era, ...(saved.era ?? {}) },
    eons: { ...fresh.eons, ...(saved.eons ?? {}) },
    hyperscalerCount: saved.hyperscalerCount ?? fresh.hyperscalerCount,
    eonsUpgrades: { ...fresh.eonsUpgrades, ...(saved.eonsUpgrades ?? {}) },
    computeFlopsAutobuyers: mergeTierMap(fresh.computeFlopsAutobuyers, saved.computeFlopsAutobuyers),
    computeFlopsAutobuyersEnabled: mergeTierMap(fresh.computeFlopsAutobuyersEnabled, saved.computeFlopsAutobuyersEnabled),
    computeFlopsAutobuyerAttemptBudgets: mergeTierMap(
      fresh.computeFlopsAutobuyerAttemptBudgets,
      saved.computeFlopsAutobuyerAttemptBudgets,
    ),
    prestigeMuseum: {
      history: Array.isArray(saved.prestigeMuseum?.history) ? saved.prestigeMuseum.history : fresh.prestigeMuseum.history,
      pinnedIds: Array.isArray(saved.prestigeMuseum?.pinnedIds) ? saved.prestigeMuseum.pinnedIds : fresh.prestigeMuseum.pinnedIds,
    },
    intro: {
      ...fresh.intro,
      ...(saved.intro ?? {}),
      dataLakes: mergeDataLakes(fresh.intro.dataLakes, saved.intro?.dataLakes),
    },
    computeFlops: {
      pageUnlocked: Boolean(saved.computeFlops?.pageUnlocked)
        || Math.max(0, Number(saved.prestige?.points) || 0) >= COMPUTE_FLOPS_REVEAL_PP,
      owned: { ...fresh.computeFlops.owned, ...(saved.computeFlops?.owned ?? {}) },
      cumulativeBoost: { ...fresh.computeFlops.cumulativeBoost, ...(saved.computeFlops?.cumulativeBoost ?? {}) },
    },
  }))
}

// Stamps a separate "last save" timestamp on every save (its own key, like the timestamp isn't
// part of the game-state shape itself) — read back by loadLastSaveTimestamp on the next load to
// figure out how long the game was closed for, to drive offline progress. Always targets the
// currently active save slot (slot 0 uses the legacy key names).
export const saveGameState = state => {
  const slotId = getActiveSlotId()
  try {
    localStorage.setItem(slotStateKey(slotId), JSON.stringify({
      saveSchemaVersion: SAVE_SCHEMA_VERSION,
      ...state,
    }))
    localStorage.setItem(slotTimestampKey(slotId), String(Date.now()))
  } catch {
    // Silently ignore (storage quota exceeded, private-browsing restrictions, etc.)
  }
}

export const loadGameState = () => {
  try {
    const parsed = readActiveSavePayload()
    if (!parsed) return null
    const result = adaptSaveForCurrentSchema(parsed)
    if (!result.ok) return null
    return mergeState(result.payload)
  } catch {
    return null
  }
}

// Milliseconds since epoch as of the most recent saveGameState call for the active slot, or
// null if there's no record of one (never saved, or an older save predating this feature). Used
// to compute how long the game was closed for offline progress; a missing/invalid value means
// "unknown", not "just now" — callers should skip offline progress rather than guess.
export const loadLastSaveTimestamp = () => {
  const slotId = getActiveSlotId()
  try {
    const raw = localStorage.getItem(slotTimestampKey(slotId))
    if (!raw) return null
    const parsed = Number(raw)
    return Number.isFinite(parsed) ? parsed : null
  } catch {
    return null
  }
}

/**
 * Clears only the active save slot's state + timestamp (not other slots or the unlock
 * entitlement). Routes to clearDevGameState while Dev Mode is active rather than
 * clearSaveSlot(getActiveSlotId()) — getActiveSlotId returns 'dev' in that case, and
 * clearSaveSlot now explicitly refuses to run at all while Dev Mode is active (see above), so
 * this branch is required for resetGame() to actually wipe the dev save it's showing, not
 * silently no-op.
 */
export const clearGameState = () => {
  if (isDevModeActive()) {
    clearDevGameState()
    return
  }
  clearSaveSlot(getActiveSlotId())
}

/**
 * Wipes the dev save back to empty (the next loadGameState() call while Dev Mode is active then
 * falls through to a fresh createInitialGameState()). Bypasses clearSaveSlot's unlockedSlotCount
 * check — DEV_SLOT_ID is never one of the numbered player slots it validates against.
 */
export const clearDevGameState = () => {
  removeSlotStorage(DEV_SLOT_ID)
  return { ok: true }
}

const isPlainObject = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value)

// Recursive deep merge of `parsed` onto `base`, at any depth: an object-valued field (resources,
// prestige, intro, intro.dataLakes, intro.dataLakes['1'], ...) is merged key-by-key rather than
// replaced wholesale, so a caller specifying only `{ resources: { base: 1e50 } }` doesn't silently
// drop `resources.bytes` (or, more importantly, an entirely untouched top-level field like
// `intro`) out of the written payload — and, at any deeper level, editing one nested container
// (e.g. `intro.dataLakes.1`) doesn't wipe its untouched siblings (`intro.dataLakes.2`, `.3`, …)
// back to fresh defaults. An earlier one-level-deep version of this function got exactly that
// deeper case wrong — confirmed by adversarial review reproducing real data loss when seeding one
// Data Lake tier via the raw JSON editor silently reset every other tier's deposits/purchased
// counts to 0, since mergeState (see below) then read those now-absent keys as "never set" and
// filled them from createInitialGameState() rather than the prior dev-save state. Recursing fixes
// this at every depth the state shape happens to have, with no hardcoded knowledge of how deep
// `intro.dataLakes` or any other nested field actually goes. This also keeps every write shaped
// like a real save (every top-level field present), which matters beyond tidiness:
// getSaveIncompatibilityReason (save-migration/detectLegacy.js) treats a payload with tier-map
// data but no `intro` field at all as a legacy save missing a migration step ('missing_intro') and
// refuses it outright — a bare `{ resources: {...} }` written as-is would trip that exact check
// and always fail. Array-valued fields (prestigeMuseum.history, .pinnedIds) are still replaced
// wholesale, not merged element-by-element — isPlainObject excludes arrays from the merge branch,
// same as before.
const mergeStateForDevWrite = (base, parsed) =>
  Object.keys(parsed).reduce((acc, key) => {
    if (key === '__proto__' || key === 'constructor') return acc
    const parsedValue = parsed[key]
    const baseValue = base[key]
    acc[key] = isPlainObject(parsedValue) && isPlainObject(baseValue)
      ? mergeStateForDevWrite(baseValue, parsedValue)
      : parsedValue
    return acc
  }, { ...base })

/**
 * Seeds the dev save from a JSON string (see pages/DevModePage's raw state editor). `currentState`
 * is the live dev-save state the editor was populated from (typically pre-filled with its full
 * JSON, but a caller only needs to provide the fields they're changing, e.g.
 * `{ "resources": { "base": 1e50 } }` — see mergeStateForDevWrite above for why the write is
 * merged onto currentState rather than the parsed object alone). The merged payload is then
 * re-read through the exact same adaptSaveForCurrentSchema + mergeState pipeline a real save load
 * uses, so any field still missing after that merge is filled in from createInitialGameState() the
 * same way an old/partial player save would be. Only ever touches the dev slot: refuses to run
 * unless Dev Mode is currently active, so a stray call can never overwrite a real player's save.
 */
export const applyDevGameStateJson = (jsonText, currentState) => {
  if (!isDevModeActive()) return { ok: false, reason: 'dev_mode_inactive' }
  let parsed
  try {
    parsed = safeJsonParse(jsonText)
  } catch {
    return { ok: false, reason: 'invalid_json' }
  }
  if (!isPlainObject(parsed)) {
    return { ok: false, reason: 'invalid_json' }
  }
  const merged = isPlainObject(currentState) ? mergeStateForDevWrite(currentState, parsed) : parsed
  // Stamped the same way saveGameState stamps every real write — without this, the payload sits
  // unstamped until the next ordinary tick's save effect re-saves it (harmless in practice, since
  // adaptSaveForCurrentSchema treats an unstamped-but-current-shaped payload as pass-through
  // rather than legacy, but stamping here keeps every dev-slot write consistent with every other
  // save write rather than relying on that fallback).
  const toWrite = { saveSchemaVersion: SAVE_SCHEMA_VERSION, ...merged }
  try {
    localStorage.setItem(DEV_STATE_KEY, JSON.stringify(toWrite))
  } catch {
    return { ok: false, reason: 'storage_error' }
  }
  const loaded = loadGameState()
  if (!loaded) return { ok: false, reason: 'invalid_state' }
  return { ok: true, state: loaded }
}

/** UI theme preference — separate from game save data; survives reset/clearGameState. */
export const THEME_PREFERENCE_KEY = 'tens_theme_preference'

export const loadThemePreference = () => {
  try {
    const raw = localStorage.getItem(THEME_PREFERENCE_KEY)
    if (raw === 'dark' || raw === 'light' || raw === 'system') return raw
    return 'system'
  } catch {
    return 'system'
  }
}

export const saveThemePreference = mode => {
  try {
    if (mode === 'dark' || mode === 'light' || mode === 'system') {
      localStorage.setItem(THEME_PREFERENCE_KEY, mode)
    }
  } catch {
    // Silently ignore (quota / private browsing)
  }
}
