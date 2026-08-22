import AppMenu from 'components/AppMenu'
import AppNav, { APP_NAV_BOTTOM_PAD } from 'components/AppNav'
import IncompatibleSaveNotice from 'components/IncompatibleSaveNotice'
import ByteFoundryPage from 'pages/ByteFoundryPage'
import ComputePage from 'pages/ComputePage'
import InfoPage from 'pages/InfoPage'
import MainPage from 'pages/MainPage'
import MilestonesPage from 'pages/MilestonesPage'
import SettingsPage from 'pages/SettingsPage'
import { isComputeCoreConversionUnlocked, isProductionFrozen } from 'game/engine'
import { getNavAttention } from 'game/navAttention'
import { useIncrementalGame } from 'game/useIncrementalGame'
import { buildResetActiveSlotConfirmMessage, buildResetByteFoundryConfirmMessage } from 'game/storage'
import { GlobalStyle, ThemeProvider } from 'theme'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { version } from '../package.json'

// Utilities stay reachable during the Byte Foundry gate. Storage is no longer a top-level page —
// it lives under Foundry as the Disks tab — so it is not gate-exempt on its own.
const GATE_EXEMPT_PAGES = new Set(['info', 'compute', 'milestones', 'settings'])

const PageShell = styled.div`
  padding-bottom: ${APP_NAV_BOTTOM_PAD};
`

// Ambient build label — fixed corner, pointer-events none, no layout reservation.
const VersionBadge = styled.span`
  bottom: calc(${APP_NAV_BOTTOM_PAD} + 0.35rem);
  color: ${props => props.theme.color.textFaint};
  font-family: ${props => props.theme.font.body};
  font-size: 0.65rem;
  letter-spacing: 0.02em;
  left: calc(0.55rem + env(safe-area-inset-left, 0px));
  line-height: 1;
  opacity: 0.75;
  pointer-events: none;
  position: fixed;
  z-index: 30;
`

function App() {
  const game = useIncrementalGame()

  // Local page toggle — not a router. Defaults to 'game'; the gate override below forces Foundry
  // whenever mainGameUnlocked is false and the player isn't on a gate-exempt utility page.
  const [page, setPage] = useState('game')
  const [menuOpen, setMenuOpen] = useState(false)
  // Bumped when AppNav selects Factory so MainPage resets to the Data tab (not Upgrades).
  const [tiersFocusNonce, setTiersFocusNonce] = useState(0)
  // Bumped when AppNav selects Foundry so ByteFoundryPage can reset to Memory (or open Disks when
  // preferredFoundryTab is set from a deep-link style navigate — currently always 'memory').
  const [foundryFocusNonce, setFoundryFocusNonce] = useState(0)

  const mainGameUnlocked = game.state.intro.mainGameUnlocked
  const showingFoundry = !GATE_EXEMPT_PAGES.has(page) &&
    (!mainGameUnlocked || page === 'foundry')

  const currentNavPage = showingFoundry ? 'foundry' : page

  const showCompute = isComputeCoreConversionUnlocked(game.state)
  // Factory is the only progress-gated primary destination — utilities (Guide / More) stay available
  // from the first launch, including during the mandatory gate.
  const showTiers = mainGameUnlocked

  const navigate = nextPage => {
    if (nextPage === 'compute' && !showCompute) return
    if (nextPage === 'game' && !mainGameUnlocked) return
    // Legacy 'storage' deep-links → Foundry (Disks tab is chosen inside ByteFoundryPage when
    // storage attention is the reason; default Memory is fine for a plain Foundry open).
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
    // Compute may no longer be revealed after the wipe — leave Settings (or fall back to Foundry
    // if somehow still on the Compute page).
    if (page === 'compute') setPage('foundry')
  }

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
    content = <ByteFoundryPage focusNonce={foundryFocusNonce} game={game} />
  } else if (page === 'info') {
    content = <InfoPage />
  } else if (page === 'compute') {
    content = <ComputePage game={game} />
  } else if (page === 'milestones') {
    content = <MilestonesPage game={game} />
  } else if (page === 'settings') {
    content = <SettingsPage game={game} onReset={handleReset} onResetByteFoundry={handleResetByteFoundry} />
  } else {
    content = <MainPage focusNonce={tiersFocusNonce} game={game} />
  }

  const navAttention = getNavAttention(game.state)

  return (
    <ThemeProvider>
      <GlobalStyle />
      <PageShell>
        {content}
      </PageShell>
      <VersionBadge aria-hidden="true">v{version}</VersionBadge>
      <AppNav
        attention={navAttention}
        currentPage={currentNavPage}
        moreOpen={menuOpen}
        onNavigate={navigate}
        onOpenMore={() => setMenuOpen(open => !open)}
        showCompute={showCompute}
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
