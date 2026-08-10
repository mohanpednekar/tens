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

  // Keeps page synced to intro.completed whenever page is 'intro' or 'game' — bidirectional, so it
  // both follows the Byte Foundry's auto-invest transition (intro.completed flipping true, see
  // engine.js's tickIntroAutoInvest) forward into 'game', and follows a real Prestige (which now
  // resets intro.completed back to false every cycle, see engine.js's prestigeGame) backward into
  // 'intro'. 'info' is deliberately excluded from this sync: Auto-Prestige can fire in the
  // background while the player is reading the static Guide page, and force-navigating them off it
  // would be worse UX than deferring — the moment they click back to 'game' via onBack, this same
  // effect immediately corrects the page on the very next render if intro.completed is false.
  useEffect(() => {
    if (page !== 'intro' && page !== 'game') return
    const target = game.state.intro.completed ? 'game' : 'intro'
    if (page !== target) setPage(target)
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
