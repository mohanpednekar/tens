/**
 * Storage namespacing for the dev build (`yarn build:dev`). It is served from the same origin as
 * production, so both share one `localStorage`; with a prefix every key the dev build reads or
 * writes is `dev:<key>`, making its saves (all slots, meta, timestamps, preferences) completely
 * invisible to the main game and vice versa. Empty prefix (production, dev server, tests) = no-op.
 */
export const createPrefixedStorage = (base, prefix) => {
  const own = () => Array.from({ length: base.length }, (_, i) => base.key(i)).filter(k => k != null && k.startsWith(prefix))
  return {
    get length() { return own().length },
    key: i => { const k = own()[i]; return k == null ? null : k.slice(prefix.length) },
    getItem: k => base.getItem(prefix + k),
    setItem: (k, v) => base.setItem(prefix + k, v),
    removeItem: k => base.removeItem(prefix + k),
    clear: () => own().forEach(k => base.removeItem(k)),
  }
}

export const installStoragePrefix = (prefix = import.meta.env.VITE_TENS_STORAGE_PREFIX) => {
  if (!prefix) return false
  try {
    Object.defineProperty(window, 'localStorage', { configurable: true, value: createPrefixedStorage(window.localStorage, prefix) })
    return true
  } catch {
    return false
  }
}

installStoragePrefix()
