import AppMenu from 'components/AppMenu'
import AppNav, { APP_NAV_BOTTOM_PAD } from 'components/AppNav'
import IncompatibleSaveNotice from 'components/IncompatibleSaveNotice'
import ByteFoundryPage from 'pages/ByteFoundryPage'
import ComputeFlopsPage from 'pages/ComputeFlopsPage'
import ComputePage from 'pages/ComputePage'
import DevModePage from 'pages/DevModePage'
import InfoPage from 'pages/InfoPage'
import MainPage from 'pages/MainPage'
import MilestonesPage from 'pages/MilestonesPage'
import SettingsPage from 'pages/SettingsPage'
import { isComputeCoreConversionUnlocked, isComputeFlopsPageRevealed, isProductionFrozen } from 'game/engine'
import { getNavAttention } from 'game/navAttention'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { buildResetActiveSlotConfirmMessage, buildResetByteFoundryConfirmMessage, loadThemePreference, saveThemePreference } from 'game/storage'
import { GlobalStyle, ThemeProvider, resolveThemeMode } from 'theme'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const resolveInitialThemeMode = () => resolveThemeMode(loadThemePreference())

// Utilities stay reachable during the Byte Foundry gate. Storage is no longer a top-level page —
// it lives under Foundry as continuous sections — so it is not gate-exempt on its own. 'dev' is
// exempt for the same reason Settings/Milestones are — Dev Mode has to be reachable precisely
// when you want to seed past the gate, and it's a dev-build-only destination regardless (see
// AppMenu's `import.meta.env.DEV` guard).
const GATE_EXEMPT_PAGES = new Set(['info', 'boosters', 'compute', 'milestones', 'settings', 'dev'])

const PageShell = styled.div`
  padding-bottom: ${APP_NAV_BOTTOM_PAD};
`

function App() {
  const game = useIncrementalGame()
  const [themePreference, setThemePreference] = useState(loadThemePreference)
  const [themeMode, setThemeMode] = useState(resolveInitialThemeMode)

  // Local page toggle — not a router. Defaults to 'game'; the gate override below forces Foundry
  // whenever mainGameUnlocked is false and the player isn't on a gate-exempt utility page.
  const [page, setPage] = useState('game')
  const [menuOpen, setMenuOpen] = useState(false)
  // Bumped when AppNav selects Factory so MainPage resets to the Data tab (not Upgrades).
  const [tiersFocusNonce, setTiersFocusNonce] = useState(0)
  // Bumped on legacy `storage` navigations (and available for future Foundry focus resets).
  // ByteFoundryPage no longer has Memory | Storage tabs; focusNonce is accepted for API parity.
  const [foundryFocusNonce, setFoundryFocusNonce] = useState(0)

  const mainGameUnlocked = game.state.intro.mainGameUnlocked
  const showingFoundry = !GATE_EXEMPT_PAGES.has(page) &&
    (!mainGameUnlocked || page === 'foundry')

  const currentNavPage = showingFoundry ? 'foundry' : page

  const showBoosters = isComputeCoreConversionUnlocked(game.state)
  const showComputeFlops = isComputeFlopsPageRevealed(game.state)
  // Factory is the only progress-gated primary destination — utilities (Guide / More) stay available
  // from the first launch, including during the mandatory gate.
  const showTiers = mainGameUnlocked

  const navigate = nextPage => {
    if (nextPage === 'boosters' && !showBoosters) return
    if (nextPage === 'compute' && !showComputeFlops) return
    if (nextPage === 'game' && !mainGameUnlocked) return
    // Legacy 'storage' deep-links → Foundry (Disks are continuous Foundry sections now).
    if (nextPage === 'storage') {
      setMenuOpen(false)
      setFoundryFocusNonce(n => n + 1)
      setPage('foundry')
      return
    }
    setMenuOpen(false)
    if (nextPage === 'game') setTiersFocusNonce(n => n + 1)
    if (nextPage === 'foundry') setFoundryFocusNonce(n => n + 1)
    setPage(nextPage)
  }

  const handleReset = () => {
    if (isProductionFrozen(game.state)) return
    if (!window.confirm(buildResetActiveSlotConfirmMessage())) return
    game.resetGame()
    setPage('game')
    setMenuOpen(false)
  }

  const handleResetByteFoundry = () => {
    if (isProductionFrozen(game.state)) return
    if (!window.confirm(buildResetByteFoundryConfirmMessage())) return
    game.resetByteFoundry()
    // Flops Compute reveal is PP-based — Byte Foundry reset does not hide it.
    if (page === 'boosters') setPage('foundry')
  }

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = event => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Follow OS theme changes while preference is System (default).
  useEffect(() => {
    if (themePreference !== 'system') return undefined
    if (typeof window.matchMedia !== 'function') return undefined
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => setThemeMode(resolveThemeMode('system'))
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [themePreference])

  const handleThemePreferenceChange = preference => {
    saveThemePreference(preference)
    setThemePreference(preference)
    setThemeMode(resolveThemeMode(preference))
  }

  let content
  if (showingFoundry) {
    content = <ByteFoundryPage focusNonce={foundryFocusNonce} game={game} />
  } else if (page === 'info') {
    content = <InfoPage />
  } else if (page === 'boosters') {
    content = <ComputePage game={game} />
  } else if (page === 'compute') {
    content = <ComputeFlopsPage game={game} />
  } else if (page === 'milestones') {
    content = <MilestonesPage game={game} />
  } else if (page === 'dev') {
    content = import.meta.env.DEV ? <DevModePage game={game} /> : <MainPage focusNonce={tiersFocusNonce} game={game} />
  } else if (page === 'settings') {
    content = <SettingsPage game={game} onReset={handleReset} onResetByteFoundry={handleResetByteFoundry} onThemePreferenceChange={handleThemePreferenceChange} themePreference={themePreference} />
  } else {
    content = <MainPage focusNonce={tiersFocusNonce} game={game} />
  }

  const navAttention = getNavAttention(game.state)

  return (
    <ThemeProvider mode={themeMode}>
      <GlobalStyle />
      <PageShell>
        {content}
      </PageShell>
      <AppNav
        attention={navAttention}
        currentPage={currentNavPage}
        moreOpen={menuOpen}
        onNavigate={navigate}
        onOpenMore={() => setMenuOpen(open => !open)}
        showBoosters={showBoosters}
        showComputeFlops={showComputeFlops}
        showTiers={showTiers}
      />
      <AppMenu
        onClose={() => setMenuOpen(false)}
        onNavigate={navigate}
        open={menuOpen}
      />
      {game.incompatibleSaveReason ? (
        <IncompatibleSaveNotice onDismiss={game.dismissIncompatibleSaveNotice} />
      ) : null}
    </ThemeProvider>
  )
}

export default App
