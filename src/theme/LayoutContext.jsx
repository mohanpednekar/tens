import { createContext, useContext, useEffect, useState } from 'react'
import { getLayoutClass } from './layout'

const FALLBACK = { layoutClass: 'compact', width: 0, height: 0 }

const readViewport = () => {
  if (typeof window === 'undefined') return null
  const vv = window.visualViewport
  const width = Math.round(window.innerWidth || vv?.width || 0)
  const height = Math.round(window.innerHeight || vv?.height || 0)
  return width > 0 && height > 0 ? { width, height } : null
}

const compute = () => {
  const vp = readViewport()
  return vp ? { ...vp, layoutClass: getLayoutClass(vp) } : FALLBACK
}

// Subscribes to resize / orientationchange / visualViewport resize (rAF-throttled).
export const useViewportLayout = () => {
  const [layout, setLayout] = useState(compute)
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    let frame = null
    const raf = window.requestAnimationFrame ?? (cb => setTimeout(cb, 16))
    const caf = window.cancelAnimationFrame ?? clearTimeout
    const update = () => {
      frame = null
      const next = compute()
      setLayout(prev =>
        prev.width === next.width && prev.height === next.height && prev.layoutClass === next.layoutClass
          ? prev
          : next
      )
    }
    const schedule = () => {
      if (frame === null) frame = raf(update)
    }
    window.addEventListener('resize', schedule)
    window.addEventListener('orientationchange', schedule)
    const vv = window.visualViewport
    vv?.addEventListener('resize', schedule)
    schedule()
    return () => {
      window.removeEventListener('resize', schedule)
      window.removeEventListener('orientationchange', schedule)
      vv?.removeEventListener('resize', schedule)
      if (frame !== null) caf(frame)
    }
  }, [])
  return layout
}

const LayoutContext = createContext(FALLBACK)

export const LayoutProvider = ({ children }) => (
  <LayoutContext.Provider value={useViewportLayout()}>{children}</LayoutContext.Provider>
)

// Context read; defaults to `compact` outside a provider so existing component tests are unaffected.
export const useLayoutClass = () => useContext(LayoutContext)
