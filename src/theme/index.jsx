import GlobalStyle from './GlobalStyle'
import { buildTheme, DEFAULT_MODE, MODES, themes } from './tokens'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

// App-level theme provider. For now `mode` is a plain prop defaulting to dark — the
// system-preference detection + persisted user toggle is deliberately deferred to the light-mode
// activation sub-issue (#140), which will drive this same `mode` prop. Keeping it a prop here is
// the clearly-marked seam that later work plugs into; nothing else needs to change to switch
// themes once a real mode source exists.
export const ThemeProvider = ({ mode = DEFAULT_MODE, children }) => (
  <StyledThemeProvider theme={themes[mode] ?? themes[DEFAULT_MODE]}>
    {children}
  </StyledThemeProvider>
)

export { GlobalStyle, buildTheme, themes, MODES, DEFAULT_MODE }
