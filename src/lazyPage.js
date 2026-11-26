import { lazy } from 'react'

export const RELOAD_FLAG = 'tens_chunk_reload'

// Wraps a dynamic page import: a deploy can delete an old tab's hashed chunks, so on a failed load
// reload once (sessionStorage-guarded) to pick up the new build. A successful load clears the guard
// so a later deploy in the same tab is also recoverable.
export const loadWithReload = loader =>
  loader().then(
    module => {
      try { sessionStorage.removeItem(RELOAD_FLAG) } catch { /* storage unavailable */ }
      return module
    },
    error => {
      try {
        if (!sessionStorage.getItem(RELOAD_FLAG)) {
          sessionStorage.setItem(RELOAD_FLAG, '1')
          window.location.reload()
          return new Promise(() => {})
        }
      } catch {
        // storage unavailable: surface the error
      }
      throw error
    },
  )

export const lazyPage = loader => lazy(() => loadWithReload(loader))
