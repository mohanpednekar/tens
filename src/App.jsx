import MainPage from 'pages/MainPage'
import { GlobalStyle, ThemeProvider } from 'theme'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <MainPage />
    </ThemeProvider>
  )
}

export default App
