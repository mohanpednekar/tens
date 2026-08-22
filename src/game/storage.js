import { createInitialGameState } from './engine'

// Slot 0 keeps the legacy keys so existing tests, e2e specs, and older browsers that only
// ever wrote a single save keep working without a forced rewrite of every consumer.
const STORAGE_KEY = 'tens_game_state'
const LAST_SAVE_TIMESTAMP_KEY = 'tens_last_save_timestamp'
const SAVES_META_KEY = 'tens_saves_meta'

/** Free players get one slot; a redeemed supporter unlock code raises this to SUPPORTER_SLOT_COUNT. */
export const FREE_SLOT_COUNT = 1
/** Total slots available after redeeming the placeholder supporter unlock code (payment later). */
export const SUPPORTER_SLOT_COUNT = 3
/**
 * Placeholder unlock code until real checkout ships. Case-insensitive; hyphens optional.
 * Not a secret — it gates meta QoL only (extra local save slots), not economy power.
 */
export const SUPPORTER_UNLOCK_CODE = 'TENS-SUPPORT'

const slotStateKey = slotId => (slotId === '0' ? STORAGE_KEY : `tens_slot_${slotId}_state`)
const slotTimestampKey = slotId =>
  slotId === '0' ? LAST_SAVE_TIMESTAMP_KEY : `tens_slot_${slotId}_timestamp`

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
    return JSON.parse(raw)
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
  for (let i = 0; i < unlockedSlotCount; i += 1) {
    const id = String(i)
    slots.push(meta.slots?.find(s => s.id === id) ?? { id, name: defaultSlotName(i) })
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

export const getActiveSlotId = () => loadSavesMeta().activeSlotId

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
  for (let i = 0; i < SUPPORTER_SLOT_COUNT; i += 1) {
    const id = String(i)
    const unlocked = i < meta.unlockedSlotCount
    const named = meta.slots.find(s => s.id === id)
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
 * Factory + Prestige progress stay; other slots and Supporter unlock are untouched.
 */
export const buildResetByteFoundryConfirmMessage = () => {
  const name = getActiveSlotDisplayName()
  return (
    `Reset Byte Foundry on "${name}"?\n\n` +
    `Use this if Capacity (or Storage / Compute) went too far.\n\n` +
    `Erased: Memory, Capacity, Combine / Invest / Bandwidth progress, all Disks/Storage, and all Compute. Multipliers restart from scratch.\n\n` +
    `Convenience: Combine, Invest / Bandwidth, and Disk Build auto-press again up to your pre-reset highs as soon as each is affordable — you do not need to click them. Capacity stays manual.\n\n` +
    `Also kept: Factory, Prestige Points / count / upgrades, and (if already unlocked) access to the main game this cycle.\n\n` +
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
  for (let i = 0; i < SUPPORTER_SLOT_COUNT; i += 1) {
    removeSlotStorage(String(i))
  }
  // Touch meta so coerce stays normalized without clearing entitlement.
  const meta = loadSavesMeta()
  return { ok: true, meta }
}

/** Current on-disk save envelope version — stamped by saveGameState on every write. */
export const SAVE_SCHEMA_VERSION = 1

const LEGACY_TIER_IDS = new Set([
  'Tens', 'Thousands', 'Millions', 'Billions', 'Trillions', 'Quadrillions', 'Pentillions',
  'Hexillions', 'Septillions', 'Octillions', 'Nonillions', 'Decillions',
])

const TIER_MAP_FIELDS = [
  'resources', 'owned', 'purchased', 'purchaseLevels', 'purchaseLevelProgress', 'autobuyers',
  'autobuyersEnabled', 'tickspeedLevels', 'autobuyerAttemptBudgets', 'tierProductionAccumulators',
  'smartAutobuyer', 'tierTickspeedAutobuyer', 'tierTickspeedAutobuyerEnabled', 'everUnlockedTierIds',
]

const mapHasLegacyTierId = map =>
  map && typeof map === 'object' && Object.keys(map).some(k => LEGACY_TIER_IDS.has(k))

/**
 * Returns a short reason code when a parsed save payload predates the current schema and cannot
 * be loaded without the removed migration path — null when compatible (including saves already
 * stamped with SAVE_SCHEMA_VERSION).
 */
export const getSaveIncompatibilityReason = saved => {
  if (!saved || typeof saved !== 'object') return null
  if (saved.saveSchemaVersion === SAVE_SCHEMA_VERSION) return null

  if (saved.resources?.Ones !== undefined) return 'legacy_money_id'

  const intro = saved.intro
  if (intro === undefined) {
    const hasTierProgress = TIER_MAP_FIELDS.some(field => {
      const map = saved[field]
      return map && typeof map === 'object' && Object.keys(map).length > 0
    })
    if (hasTierProgress) return 'missing_intro'
  } else {
    if (intro.completed !== undefined && intro.mainGameUnlocked === undefined) return 'legacy_intro_gate'
    if (
      intro.storageBanks !== undefined ||
      intro.storageBanksBuiltTotal !== undefined ||
      intro.storageAutoRedeemedSizes !== undefined
    ) return 'legacy_storage_fields'
  }

  if (saved.prestige?.pp !== undefined && saved.prestige?.xp === undefined) return 'legacy_prestige_xp'
  if (saved.prestige?.level !== undefined && saved.prestige?.count === undefined) return 'legacy_prestige_count'

  if (saved.autobuyers && Object.values(saved.autobuyers).some(v => v === true || v === false)) {
    return 'legacy_boolean_autobuyers'
  }
  if (saved.autoPrestige === true || saved.autoPrestige === false) return 'legacy_boolean_auto_prestige'

  if (TIER_MAP_FIELDS.some(field => mapHasLegacyTierId(saved[field]))) return 'legacy_tier_ids'

  return null
}

const readActiveSavePayload = () => {
  const slotId = getActiveSlotId()
  try {
    const raw = localStorage.getItem(slotStateKey(slotId))
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** Clears the active slot when its on-disk payload is incompatible; returns the reason code or null. */
export const discardIncompatibleActiveSaveIfNeeded = () => {
  const slotId = getActiveSlotId()
  const parsed = readActiveSavePayload()
  if (!parsed) return null
  const reason = getSaveIncompatibilityReason(parsed)
  if (!reason) return null
  removeSlotStorage(slotId)
  return reason
}

const stripSaveEnvelope = saved => {
  const { saveSchemaVersion: _version, ...gameState } = saved
  return gameState
}

const mergeTierMap = (freshMap, savedMap) => ({ ...freshMap, ...(savedMap ?? {}) })

// Merge a saved state with fresh defaults so newly added fields are present on load.
// Legacy save formats are not transformed — only current-schema saves are supported.
const mergeState = saved => {
  const fresh = createInitialGameState()
  const { lastTierTickspeedXpUnlocked: _removed, ...savedClean } = saved

  return {
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
    prestige: { ...fresh.prestige, ...(saved.prestige ?? {}) },
    prestigeMuseum: {
      history: Array.isArray(saved.prestigeMuseum?.history) ? saved.prestigeMuseum.history : fresh.prestigeMuseum.history,
      pinnedIds: Array.isArray(saved.prestigeMuseum?.pinnedIds) ? saved.prestigeMuseum.pinnedIds : fresh.prestigeMuseum.pinnedIds,
    },
    intro: { ...fresh.intro, ...(saved.intro ?? {}) },
  }
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
    if (getSaveIncompatibilityReason(parsed)) return null
    return mergeState(stripSaveEnvelope(parsed))
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

/** Clears only the active save slot's state + timestamp (not other slots or the unlock entitlement). */
export const clearGameState = () => {
  clearSaveSlot(getActiveSlotId())
}
