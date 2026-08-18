import ByteFoundryPage from 'pages/ByteFoundryPage'
import ComputePage from 'pages/ComputePage'
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

  // The Byte Foundry (ByteFoundryPage) is BOTH a mandatory gate (intro.mainGameUnlocked === false
  // blocks the rest of the app entirely — no fresh Kilobytes without tapping through it, see
  // engine.js's convertIntroBitsToKilobytes/tickIntroAutoInvest/prestigeGame) AND, once unlocked, a
  // permanent screen the player can voluntarily revisit at any time via MainPage's "⚙️ Byte
  // Foundry" link (page === 'foundry') to review this cycle's stats — it no longer disappears once
  // passed. Unlike the old intro.completed flag this superseded, mainGameUnlocked flips true early
  // (the first bits ever converted into Kilobytes this cycle) and nothing about the Byte Foundry
  // itself ever freezes afterward — Tap/Sacrifice/Invest and further Convert transfers (up to this
  // cycle's shared budget) all keep working whether reached via the gate or the voluntary link.
  // Excluding 'info' (and, likewise, 'compute') keeps the same courtesy the gate has always had:
  // Auto-Prestige firing in the background while the player is reading the static Guide page, or
  // reviewing the Compute merge chain, doesn't yank them off it — the moment they click back to
  // 'game' via onBack, this same check picks the gate back up on the very next render. In
  // practice intro.computeMergePageUnlocked can't be true before mainGameUnlocked is anyway (it
  // requires far more capacity than the intro gate does), but the exclusion is here for the same
  // reason 'info' has it, not because it's reachable mid-gate today.
  const showingFoundry = page !== 'info' && page !== 'compute' && (!game.state.intro.mainGameUnlocked || page === 'foundry')

  return (
    <ThemeProvider>
      <GlobalStyle />
      {showingFoundry
        ? <ByteFoundryPage game={game} onBack={game.state.intro.mainGameUnlocked ? () => setPage('game') : undefined} />
        : page === 'info'
          ? <InfoPage onBack={() => setPage('game')} />
          : page === 'compute'
            ? <ComputePage game={game} onBack={() => setPage('game')} />
            : <MainPage game={game} onOpenFoundry={() => setPage('foundry')} onOpenInfo={() => setPage('info')} onOpenCompute={() => setPage('compute')} />}
    </ThemeProvider>
  )
}

export default App
