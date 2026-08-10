import ByteFoundryPage from 'pages/ByteFoundryPage'
import InfoPage from 'pages/InfoPage'
import MainPage from 'pages/MainPage'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { GlobalStyle, ThemeProvider } from 'theme'
import { useEffect, useState } from 'react'

function App() {
  // Owned here (rather than inside MainPage) so it can also drive ByteFoundryPage — the Byte
  // Foundry intro and the main game share one save/tick loop, just two different views onto it.
  const game = useIncrementalGame()

  // Which top-level page is showing — a local toggle, not real routing (this stays a single-page
  // app, see CLAUDE.md); ByteFoundryPage is the pre-game tap-to-earn intro, MainPage is the game
  // itself, InfoPage is all the static "how it works" prose that used to live inline on MainPage
  // (see CLAUDE.md's Architecture section). Computed once from the freshly-loaded state's own
  // intro.completed flag, mirroring useIncrementalGame's own one-time-at-mount
  // computeInitialGame pattern — a returning player never sees the intro again.
  const [page, setPage] = useState(() => (game.state.intro.completed ? 'game' : 'intro'))

  // Follows the Byte Foundry's one-time auto-invest transition (intro.completed flipping true
  // mid-session, see engine.js's tickIntroAutoInvest) into 'game' automatically — no manual
  // "continue" click, and no going back to 'intro' afterward (intro.completed is never reset by
  // prestigeGame/speedUpGame/overclockGame, only by a full Reset).
  useEffect(() => {
    if (game.state.intro.completed && page === 'intro') setPage('game')
  }, [game.state.intro.completed, page])

  return (
    <ThemeProvider>
      <GlobalStyle />
      {page === 'intro'
        ? <ByteFoundryPage game={game} />
        : page === 'info'
          ? <InfoPage onBack={() => setPage('game')} />
          : <MainPage game={game} onOpenInfo={() => setPage('info')} />}
    </ThemeProvider>
  )
}

export default App
