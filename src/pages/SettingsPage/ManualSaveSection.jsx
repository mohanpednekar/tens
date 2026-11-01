import { useRef, useState } from 'react'
import styled from 'styled-components'
import Button, { ButtonContent } from 'components/Button'
import { Row, Section, StatusText } from './styles'

const SaveText = styled.textarea`
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  font-family: monospace;
  font-size: 0.75rem;
  min-height: 6rem;
  padding: 0.5rem 0.65rem;
  resize: vertical;
  width: 100%;
`

const IMPORT_ERRORS = {
  invalid_json: 'That is not valid save JSON.',
  incompatible_save: 'That save is from an incompatible version.',
  invalid_state: 'That save could not be loaded.',
}

// Offline, account-free save transfer: export copies/downloads the active slot's JSON; import
// replaces the active slot from pasted text or a chosen file — works on-device, no second computer.
const ManualSaveSection = ({ game }) => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState(null)
  const fileRef = useRef(null)

  const doExport = async () => {
    const json = game.exportSaveJson()
    setText(json)
    try {
      await navigator.clipboard.writeText(json)
      setStatus({ text: 'Save copied to clipboard (also shown below).' })
    } catch {
      setStatus({ text: 'Save shown below — copy it manually.' })
    }
  }

  const download = () => {
    const url = URL.createObjectURL(new Blob([game.exportSaveJson()], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'tens-save.json'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const doImport = jsonText => {
    if (!jsonText.trim()) return setStatus({ error: true, text: 'Paste a save or choose a file first.' })
    if (!window.confirm('Replace the active save slot with this save? Current progress in the slot is lost.')) return
    const result = game.applyCloudSave(jsonText)
    setStatus(result.ok ? { text: 'Save imported.' } : { error: true, text: IMPORT_ERRORS[result.reason] ?? 'Import failed.' })
    if (result.ok) setText('')
  }

  const onFile = async event => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) setText(await file.text())
  }

  return (
    <Section aria-label="manual save section">
      <h2>Import / export save</h2>
      <SaveText aria-label="save JSON" onChange={e => setText(e.target.value)} placeholder="Paste save JSON here to import" value={text} />
      <Row>
        <Button onClick={doExport} type="button"><ButtonContent>Copy save</ButtonContent></Button>
        <Button onClick={download} type="button"><ButtonContent>Download file</ButtonContent></Button>
        <Button onClick={() => fileRef.current?.click()} type="button"><ButtonContent>Choose file…</ButtonContent></Button>
        <Button onClick={() => doImport(text)} type="button"><ButtonContent>Import</ButtonContent></Button>
        <input accept="application/json,.json" aria-label="save file" hidden onChange={onFile} ref={fileRef} type="file" />
      </Row>
      {status && <StatusText $error={status.error}>{status.text}</StatusText>}
    </Section>
  )
}

export default ManualSaveSection
