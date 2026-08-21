import AppMenu from 'components/AppMenu'
import AppNav, { APP_NAV_BOTTOM_PAD } from 'components/AppNav'
import ByteFoundryPage from 'pages/ByteFoundryPage'
import ComputePage from 'pages/ComputePage'
import InfoPage from 'pages/InfoPage'
import MainPage from 'pages/MainPage'
import MilestonesPage from 'pages/MilestonesPage'
import SettingsPage from 'pages/SettingsPage'
import StoragePage from 'pages/StoragePage'
import { isComputeCoreConversionUnlocked, isProductionFrozen, isStorageUnlocked } from 'game/engine'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { GlobalStyle, ThemeProvider } from 'theme'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

// Pages that must stay reachable even while the Byte Foundry gate is active — utilities and
// progress-revealed sub-screens. Visiting any of these must not yank the player back onto Foundry.
const GATE_EXEMPT_PAGES = new Set(['info', 'storage', 'compute', 'milestones', 'settings'])

const PageShell = styled.div`
  padding-bottom: ${APP_NAV_BOTTOM_PAD};
`

function App() {
  const game = useIncrementalGame()

  // Local page toggle — not a router. Defaults to 'game'; the gate override below forces Foundry
  // whenever mainGameUnlocked is false and the player isn't on a gate-exempt utility page.
  const [page, setPage] = useState('game')
  const [menuOpen, setMenuOpen] = useState(false)

  const mainGameUnlocked = game.state.intro.mainGameUnlocked
  const showingFoundry = !GATE_EXEMPT_PAGES.has(page) &&
    (!mainGameUnlocked || page === 'foundry')

  const currentNavPage = showingFoundry ? 'foundry' : page

  const showStorage = isStorageUnlocked(game.state)
  const showCompute = isComputeCoreConversionUnlocked(game.state)
  // Tiers is the only progress-gated primary destination — utilities (Guide / More → Milestones /
  // Settings / Reset) stay available from the first launch, including during the mandatory gate.
  const showTiers = mainGameUnlocked

  const navigate = nextPage => {
    if (nextPage === 'storage' && !showStorage) return
    if (nextPage === 'compute' && !showCompute) return
    if (nextPage === 'game' && !mainGameUnlocked) return
    setMenuOpen(false)
    setPage(nextPage)
  }

  const handleReset = () => {
    if (isProductionFrozen(game.state)) return
    if (!window.confirm('Erase all progress and start over? This cannot be undone.')) return
    game.resetGame()
    setPage('game')
    setMenuOpen(false)
  }

  // Close the More sheet on Escape from anywhere.
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = event => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  let content
  if (showingFoundry) {
    content = <ByteFoundryPage game={game} />
  } else if (page === 'info') {
    content = <InfoPage />
  } else if (page === 'storage') {
    content = <StoragePage game={game} />
  } else if (page === 'compute') {
    content = <ComputePage game={game} />
  } else if (page === 'milestones') {
    content = <MilestonesPage game={game} />
  } else if (page === 'settings') {
    content = <SettingsPage game={game} onReset={handleReset} />
  } else {
    content = <MainPage game={game} />
  }

  const resetDisabled = isProductionFrozen(game.state)

  return (
    <ThemeProvider>
      <GlobalStyle />
      <PageShell>
        {content}
      </PageShell>
      <AppNav
        currentPage={currentNavPage}
        moreOpen={menuOpen}
        onNavigate={navigate}
        onOpenMore={() => setMenuOpen(open => !open)}
        showCompute={showCompute}
        showStorage={showStorage}
        showTiers={showTiers}
      />
      <AppMenu
        onClose={() => setMenuOpen(false)}
        onNavigate={navigate}
        onReset={handleReset}
        open={menuOpen}
        resetDisabled={resetDisabled}
        resetTitle={
          resetDisabled
            ? 'Prestige first — production is frozen at 1 Googol Bytes'
            : 'Erases all progress and starts over (asks for confirmation)'
        }
      />
    </ThemeProvider>
  )
}

export default App
