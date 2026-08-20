import AppNav, { APP_NAV_BOTTOM_PAD } from 'components/AppNav'
import ByteFoundryPage from 'pages/ByteFoundryPage'
import ComputePage from 'pages/ComputePage'
import InfoPage from 'pages/InfoPage'
import MainPage from 'pages/MainPage'
import StoragePage from 'pages/StoragePage'
import { isComputeCoreConversionUnlocked, isStorageUnlocked } from 'game/engine'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { GlobalStyle, ThemeProvider } from 'theme'
import { useState } from 'react'
import styled from 'styled-components'

// Reserves space under every page so the fixed AppNav never covers the bottom-most controls.
const PageShell = styled.div`
  padding-bottom: ${props => (props.$withNav ? APP_NAV_BOTTOM_PAD : '0')};
`

function App() {
  // Owned here (rather than inside MainPage) so it can also drive ByteFoundryPage — the Byte
  // Foundry screen and the main game share one save/tick loop, just two different views onto it.
  const game = useIncrementalGame()

  // Which top-level page the player has navigated to — a local toggle, not real routing (this
  // stays a single-page app, see CLAUDE.md). Defaults to 'game'; irrelevant while the mandatory
  // Byte Foundry gate below is active, since that overrides whatever `page` is. Storage/Compute
  // are reachable from the shared AppNav once each mechanic is revealed (and still return via
  // that same bar rather than a nested Back button).
  const [page, setPage] = useState('game')

  // The Byte Foundry (ByteFoundryPage) is BOTH a mandatory gate (intro.mainGameUnlocked === false
  // blocks the rest of the app entirely — no fresh Kilobytes without tapping through it, see
  // engine.js's convertIntroBitsToKilobytes/tickIntroAutoInvest/prestigeGame) AND, once unlocked, a
  // permanent screen the player can voluntarily revisit at any time via AppNav's Foundry item
  // (page === 'foundry') to review this cycle's stats — it no longer disappears once passed.
  // Excluding 'info'/'storage'/'compute' keeps the gate courtesy: Auto-Prestige firing while the
  // player is on Guide/Storage/Compute doesn't yank them off mid-read, and Storage/Compute stay
  // reachable during the gate itself (capacity can reveal them before the first transfer ever
  // flips mainGameUnlocked — without this exclusion the override would make them unreachable).
  const mainGameUnlocked = game.state.intro.mainGameUnlocked
  const showingFoundry = page !== 'info' && page !== 'storage' && page !== 'compute' &&
    (!mainGameUnlocked || page === 'foundry')

  const currentNavPage = showingFoundry ? 'foundry' : page

  const showStorage = isStorageUnlocked(game.state)
  const showCompute = isComputeCoreConversionUnlocked(game.state)

  // Full nav once unlocked. During the gate, still show nav when Storage/Compute are revealed
  // (so those screens stay reachable) or when already on a courtesy page (Guide/Storage/Compute)
  // so Prestige can't strand the player without an exit back to Foundry.
  const showNav = mainGameUnlocked ||
    showStorage ||
    showCompute ||
    page === 'info' ||
    page === 'storage' ||
    page === 'compute'

  // Tiers/Guide are main-game destinations — omit them during the mandatory gate so there's no
  // escape hatch. If the player is already on Guide when Prestige flips the gate, keep Guide in
  // the bar (aria-current) and show Foundry as the way out.
  const showTiers = mainGameUnlocked
  const showGuide = mainGameUnlocked || page === 'info'

  const navigate = nextPage => {
    if (nextPage === 'storage' && !showStorage) return
    if (nextPage === 'compute' && !showCompute) return
    if (nextPage === 'game' && !mainGameUnlocked) return
    if (nextPage === 'info' && !showGuide) return
    setPage(nextPage)
  }

  let content
  if (showingFoundry) {
    content = <ByteFoundryPage game={game} />
  } else if (page === 'info') {
    content = <InfoPage />
  } else if (page === 'storage') {
    content = <StoragePage game={game} />
  } else if (page === 'compute') {
    content = <ComputePage game={game} />
  } else {
    content = <MainPage game={game} />
  }

  return (
    <ThemeProvider>
      <GlobalStyle />
      <PageShell $withNav={showNav}>
        {content}
      </PageShell>
      {showNav && (
        <AppNav
          currentPage={currentNavPage}
          onNavigate={navigate}
          showCompute={showCompute}
          showGuide={showGuide}
          showStorage={showStorage}
          showTiers={showTiers}
        />
      )}
    </ThemeProvider>
  )
}

export default App
