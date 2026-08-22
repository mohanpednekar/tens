import './fonts' // side-effect import: registers the bundled @font-face rules (see fonts.js)
import GlobalStyle from './GlobalStyle'
import { buildTheme, DEFAULT_MODE, MODES, themes } from './tokens'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

// App-level theme provider. `mode` is driven by App.jsx: persisted `tens_theme_preference` when
// set, otherwise `prefers-color-scheme`, defaulting to dark when unknown (#140).
export const ThemeProvider = ({ mode = DEFAULT_MODE, children }) => (
  <StyledThemeProvider theme={themes[mode] ?? themes[DEFAULT_MODE]}>
    {children}
  </StyledThemeProvider>
)

export { GlobalStyle, buildTheme, themes, MODES, DEFAULT_MODE }
