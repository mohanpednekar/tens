import 'game/storagePrefix' // must run first: namespaces localStorage in the dev build
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { initNativeShell } from 'services/nativeShell'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

reportWebVitals()
initNativeShell()
