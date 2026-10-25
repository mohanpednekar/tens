import { useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import Button, { ButtonContent } from 'components/Button'
import ConfirmDialog from 'components/ConfirmDialog'
import { SAVE_SCHEMA_VERSION } from 'game/storage'
import { CLOUD_SAVE_ENABLED } from 'services/config'
import { describeCloudError, loadCloudSave } from 'services/cloudSave'
import { CodeForm, CodeInput, Row, Section, StatusText } from './styles'

const errorStatus = error => ({ error: true, text: describeCloudError(error?.code) })

const DELETE_STEP_MESSAGES = {
  reauthenticate: 'Password is incorrect — nothing was deleted.',
  delete_data: 'Could not delete your cloud save — your account was kept so you can retry.',
  delete_user: 'Your cloud save was deleted, but the account could not be removed. Please try again.',
}

/**
 * Cross-device cloud save (Firebase Auth email/password + Firestore) and the store-required
 * "Delete account and data" flow. Renders nothing unless a Firebase config was supplied at build
 * time (CLOUD_SAVE_ENABLED); `enabled`/`loadBackend` exist for tests.
 */
const CloudSaveSection = ({ game, enabled = CLOUD_SAVE_ENABLED, loadBackend = loadCloudSave }) => {
  const [backend, setBackend] = useState(null)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  useEffect(() => {
    if (!enabled) return undefined
    let unsubscribe = () => {}
    let live = true
    loadBackend().then(loaded => {
      if (!live || !loaded) return
      setBackend(loaded)
      unsubscribe = loaded.onUserChange(setUser)
    }).catch(() => {
      if (live) setStatus({ error: true, text: 'Cloud save is unavailable right now.' })
    })
    return () => {
      live = false
      unsubscribe()
    }
  }, [enabled, loadBackend])

  if (!enabled) return null

  const run = async (action, successText) => {
    setBusy(true)
    setStatus(null)
    try {
      const text = await action()
      setStatus({ error: false, text: text ?? successText })
    } catch (error) {
      setStatus(errorStatus(error))
    } finally {
      setBusy(false)
    }
  }

  const handleSignIn = event => {
    event.preventDefault()
    run(() => backend.signIn(email.trim(), password).then(() => setPassword('')), 'Signed in.')
  }

  const handleUpload = () => run(() => backend.uploadSave({
    payload: game.exportSaveJson(),
    schemaVersion: SAVE_SCHEMA_VERSION,
    platform: Capacitor.getPlatform(),
  }), 'This save was uploaded to the cloud.')

  // Confirm before the fetch: a blocking prompt after the await would stall the tick loop's clock
  // while the downloaded state is still uncommitted (see applyCloudSave in useIncrementalGame).
  const handleDownload = () => {
    if (!window.confirm('Replace the current save slot with your cloud save? Unsaved local progress in this slot will be lost.')) return
    run(async () => {
      const remote = await backend.downloadSave()
      if (!remote) return 'No cloud save yet — upload one first.'
      const result = game.applyCloudSave(remote.payload)
      if (!result.ok) throw Object.assign(new Error('bad payload'), { code: 'cloud/incompatible-save' })
      return 'Cloud save loaded into this slot.'
    })
  }

  const confirmDelete = async () => {
    if (busy) return
    setBusy(true)
    setStatus(null)
    const result = await backend.deleteAccount(deletePassword)
    setBusy(false)
    setDeletePassword('')
    setDeleteOpen(false)
    setStatus(result.ok
      ? { error: false, text: 'Your account and cloud save were deleted. Saves on this device were not touched.' }
      : { error: true, text: DELETE_STEP_MESSAGES[result.step] ?? describeCloudError(result.code) })
  }

  return (
    <Section aria-label="cloud save section">
      <h2>Cloud save</h2>
      {!backend && !status && <p>Connecting…</p>}
      {backend && !user && (
        <>
          <p>Sign in to keep a copy of your save in the cloud and continue on another device.</p>
          <CodeForm onSubmit={handleSignIn}>
            <CodeInput
              aria-label="cloud save email"
              autoComplete="email"
              inputMode="email"
              onChange={event => setEmail(event.target.value)}
              placeholder="Email"
              type="email"
              value={email}
            />
            <CodeInput
              aria-label="cloud save password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              value={password}
            />
            <Row>
              <Button aria-label="sign in to cloud save" disabled={busy} type="submit" variant="primary">
                <ButtonContent>Sign in</ButtonContent>
              </Button>
              <Button
                aria-label="create cloud save account"
                disabled={busy}
                onClick={() => run(() => backend.signUp(email.trim(), password).then(() => setPassword('')), 'Account created — you are signed in.')}
                type="button"
                variant="neutral"
              >
                <ButtonContent>Create account</ButtonContent>
              </Button>
              <Button
                aria-label="reset cloud save password"
                disabled={busy || !email.trim()}
                onClick={() => run(() => backend.resetPassword(email.trim()), 'Password reset email sent.')}
                type="button"
                variant="ghost"
              >
                <ButtonContent>Forgot password</ButtonContent>
              </Button>
            </Row>
          </CodeForm>
        </>
      )}
      {backend && user && (
        <>
          <p>Signed in as {user.email}.</p>
          <Row>
            <Button aria-label="upload save to cloud" disabled={busy} onClick={handleUpload} type="button" variant="primary">
              <ButtonContent>Upload this save</ButtonContent>
            </Button>
            <Button aria-label="download cloud save" disabled={busy} onClick={handleDownload} type="button" variant="neutral">
              <ButtonContent>Download cloud save</ButtonContent>
            </Button>
            <Button aria-label="sign out of cloud save" disabled={busy} onClick={() => run(() => backend.signOutUser(), 'Signed out.')} type="button" variant="ghost">
              <ButtonContent>Sign out</ButtonContent>
            </Button>
          </Row>
          <Button aria-label="delete account and data" disabled={busy} onClick={() => setDeleteOpen(true)} type="button" variant="danger">
            <ButtonContent>Delete account and data…</ButtonContent>
          </Button>
        </>
      )}
      {status && <StatusText $error={status.error}>{status.text}</StatusText>}

      <ConfirmDialog
        cancelLabel="Cancel"
        confirmDisabled={busy}
        confirmLabel="Delete forever"
        confirmVariant="danger"
        onCancel={() => { setDeleteOpen(false); setDeletePassword('') }}
        onConfirm={confirmDelete}
        open={deleteOpen}
        title="Delete account and data?"
      >
        <p>
          Permanently deletes your cloud save account ({user?.email}) and the save stored with it.
          This cannot be undone. Saves on this device stay until you erase them in the Danger zone.
        </p>
        <CodeInput
          aria-label="confirm password to delete account"
          autoComplete="current-password"
          onChange={event => setDeletePassword(event.target.value)}
          placeholder="Password"
          type="password"
          value={deletePassword}
        />
      </ConfirmDialog>
    </Section>
  )
}

export default CloudSaveSection
