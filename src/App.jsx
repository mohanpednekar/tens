import ByteFoundryPage from 'pages/ByteFoundryPage'
import InfoPage from 'pages/InfoPage'
import MainPage from 'pages/MainPage'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { GlobalStyle, ThemeProvider } from 'theme'
import { useState } from 'react'

function App() {
  // Owned here (rather than inside MainPage) so it can also drive ByteFoundryPage — the Byte
  // Foundry screen and the main game share one save/tick loop, just two different views onto it.
  const game = useIncrementalGame()

  // Which top-level page the player has navigated to — a local toggle, not real routing (this
  // stays a single-page app, see CLAUDE.md). Defaults to 'game'; irrelevant while the mandatory
  // Byte Foundry gate below is active, since that overrides whatever `page` is.
  const [page, setPage] = useState('game')

  // The Byte Foundry (ByteFoundryPage) is BOTH a mandatory gate (intro.completed === false blocks
  // the rest of the app entirely — no fresh Kilobytes without tapping through it, see
  // engine.js's tickIntroAutoInvest/prestigeGame) AND, once completed, a permanent screen the
  // player can voluntarily revisit at any time via MainPage's "⚙️ Byte Foundry" link (page ===
  // 'foundry') to review this cycle's stats — it no longer disappears once passed. Excluding
  // 'info' keeps the same courtesy the gate has always had: Auto-Prestige firing in the background
  // while the player is reading the static Guide page doesn't yank them off it — the moment they
  // click back to 'game' via onBack, this same check picks the gate back up on the very next render.
  const showingFoundry = page !== 'info' && (!game.state.intro.completed || page === 'foundry')

  return (
    <ThemeProvider>
      <GlobalStyle />
      {showingFoundry
        ? <ByteFoundryPage game={game} onBack={game.state.intro.completed ? () => setPage('game') : undefined} />
        : page === 'info'
          ? <InfoPage onBack={() => setPage('game')} />
          : <MainPage game={game} onOpenFoundry={() => setPage('foundry')} onOpenInfo={() => setPage('info')} />}
    </ThemeProvider>
  )
}

export default App
