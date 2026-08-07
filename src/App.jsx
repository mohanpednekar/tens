import InfoPage from 'pages/InfoPage'
import MainPage from 'pages/MainPage'
import { GlobalStyle, ThemeProvider } from 'theme'
import { useState } from 'react'

function App() {
  // Which top-level page is showing — a local toggle, not real routing (this stays a single-page
  // app, see CLAUDE.md); MainPage is the game itself, InfoPage is all the static "how it works"
  // prose that used to live inline on MainPage (see CLAUDE.md's Architecture section).
  const [page, setPage] = useState('game')

  return (
    <ThemeProvider>
      <GlobalStyle />
      {page === 'info'
        ? <InfoPage onBack={() => setPage('game')} />
        : <MainPage onOpenInfo={() => setPage('info')} />}
    </ThemeProvider>
  )
}

export default App
