import './fonts' // side-effect import: registers the bundled @font-face rules (see fonts.js)
import GlobalStyle from './GlobalStyle'
import { buildTheme, DEFAULT_MODE, MODES, themes } from './tokens'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

export const getSystemThemeMode = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return DEFAULT_MODE
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const resolveThemeMode = preference => {
  if (preference === 'light' || preference === 'dark') return preference
  return getSystemThemeMode()
}

// App-level theme provider. `mode` is the resolved light/dark palette; preference (system/light/dark)
// lives in Settings and `tens_theme_preference` (#140).
export const ThemeProvider = ({ mode = DEFAULT_MODE, children }) => (
  <StyledThemeProvider theme={themes[mode] ?? themes[DEFAULT_MODE]}>
    {children}
  </StyledThemeProvider>
)

export { GlobalStyle, buildTheme, themes, MODES, DEFAULT_MODE }
