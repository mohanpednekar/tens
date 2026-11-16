import Button from 'components/Button'
import ConfirmDialog from 'components/ConfirmDialog'
import { useState } from 'react'

// Exit button for the active challenge with its confirm dialog — shared by the Factory banner (revealed by tapping the
// banner title) and the Challenges → Factory tab's active row, so both behave identically.
const ChallengeExitButton = ({ challenge, onExit }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  return (
    <>
      <Button
        aria-label={`Exit challenge ${challenge.id} ${challenge.codename}`}
        onClick={() => setConfirmOpen(true)}
        title="Abandon this challenge and restart the Factory cycle with no reward"
        type="button"
        variant="prestige"
      >
        Exit
      </Button>
      <ConfirmDialog
        confirmLabel="Exit challenge"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          onExit()
        }}
        open={confirmOpen}
        title={`Exit ${challenge.id}?`}
      >
        <p>Exiting restarts the current Factory cycle with no reward (no PP, no Purge count). Your progress in this run is lost.</p>
      </ConfirmDialog>
    </>
  )
}

export default ChallengeExitButton
