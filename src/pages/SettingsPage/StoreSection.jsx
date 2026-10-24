import { useEffect, useState } from 'react'
import Button, { ButtonContent } from 'components/Button'
import { getMonetizationService } from 'services/monetization'
import { Row, Section, StatusText } from './styles'

const PURCHASE_MESSAGES = {
  removeAds: 'Ads removed — rewards are now granted instantly. Thank you!',
  supportTip: 'Thank you for supporting Tens!',
}

// Optional purchases (IAP_ENABLED native builds only — the no-op service hides this section).
// Nothing here unlocks game content: remove-ads only skips the opt-in rewarded videos.
const StoreSection = ({ service = getMonetizationService() }) => {
  const [entitlements, setEntitlements] = useState({ removeAds: false })
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!service.iapAvailable) return undefined
    let live = true
    service.getEntitlements().then(next => { if (live) setEntitlements(next) })
    return () => { live = false }
  }, [service])

  if (!service.iapAvailable) return null

  const run = async (action, successText) => {
    setBusy(true)
    setStatus(null)
    const result = await action()
    setBusy(false)
    if (result.entitlements) setEntitlements(result.entitlements)
    if (result.ok) setStatus({ error: false, text: successText })
    else if (!result.cancelled) setStatus({ error: true, text: 'The store could not complete that. Please try again.' })
  }

  return (
    <Section aria-label="store section">
      <h2>Store</h2>
      <p>Optional extras. Every part of the game stays free to play.</p>
      <Row>
        <Button
          aria-label="buy remove ads"
          disabled={busy || entitlements.removeAds}
          onClick={() => run(() => service.purchase('removeAds'), PURCHASE_MESSAGES.removeAds)}
          type="button"
          variant="primary"
        >
          <ButtonContent>{entitlements.removeAds ? 'Ads removed' : 'Remove ads'}</ButtonContent>
        </Button>
        <Button
          aria-label="buy support tip"
          disabled={busy}
          onClick={() => run(() => service.purchase('supportTip'), PURCHASE_MESSAGES.supportTip)}
          type="button"
          variant="neutral"
        >
          <ButtonContent>Leave a tip</ButtonContent>
        </Button>
        <Button
          aria-label="restore purchases"
          disabled={busy}
          onClick={() => run(() => service.restore(), 'Purchases restored.')}
          type="button"
          variant="ghost"
        >
          <ButtonContent>Restore purchases</ButtonContent>
        </Button>
      </Row>
      {status && <StatusText $error={status.error}>{status.text}</StatusText>}
    </Section>
  )
}

export default StoreSection
