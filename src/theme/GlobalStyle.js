import { createGlobalStyle } from 'styled-components'

// Absorbs the former src/index.css + src/App.css: the box-sizing reset, base font + smoothing,
// the form-control `font: inherit` rule, and the page background — the last two now driven by
// theme tokens so the whole page repaints when the theme mode changes. Rendered once inside the
// app's ThemeProvider (see theme/index.jsx and App.jsx).
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${props => props.theme.font.body};
    font-variant-numeric: ${props => props.theme.type.numeric};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => props.theme.color.page};
    color: ${props => props.theme.color.text};
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }
`

export default GlobalStyle
