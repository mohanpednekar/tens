import { useState } from 'react'
import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency } from 'game/engine'
import {
  COMPUTE_FLOPS_REVEAL_PP,
  ERA_ELIGIBILITY_PP,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  PRESTIGE_THRESHOLD,
} from 'game/layers'
import { isEditableScalar, prettifySegment, setValueAtPath } from './stateFields'
import styled from 'styled-components'

// Dev-only sandbox (see CLAUDE.md → "Dev Mode"). Reached only through App.jsx/AppMenu entry
// points gated behind `import.meta.env.DEV`, so this page's own code is unreachable — and, once
// minified/tree-shaken by `yarn build`, absent — from a production bundle. Everything here
// operates on a save entirely separate from any real player slot (see game/storage.js's
// DEV_SLOT_ID); toggling Dev Mode off always resumes the real save untouched.
//
// The "Variables" section below is not a hand-maintained field list: it's a recursive walk of the
// live `game.state` object itself (see FieldNode) — the same object engine.js/storage.js produce
// for the real game — so every field the game code defines is automatically editable here, and a
// new field added to createInitialGameState() shows up with zero changes to this file.

const RootDiv = styled.main`
  width: min(560px, calc(100vw - 2rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: calc(1.25rem + env(safe-area-inset-top)) 0 calc(1.25rem + env(safe-area-inset-bottom));
`

const Header = styled.header`
  color: ${props => props.theme.color.text};
  text-align: center;

  h1 {
    margin: 0 0 0.25rem;
    font-family: ${props => props.theme.font.display};
    font-size: 1.5rem;
    font-weight: 700;
  }
`

const Section = styled(StatCard)`
  gap: 0.5rem;

  h2 {
    font-size: ${props => props.theme.type.scale.md.size};
    margin: 0;
  }

  p {
    color: ${props => props.theme.color.textMuted};
    margin: 0;
  }
`

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`

const FieldRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.15rem 0;
`

const FieldLabel = styled.span`
  color: ${props => props.theme.color.textMuted};
  flex: 0 0 auto;
  font-size: 0.85rem;
  min-width: 8rem;
`

const NumberInput = styled.input`
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  flex: 1;
  font-family: ${props => props.theme.font.body};
  font-size: 0.9rem;
  min-width: 6rem;
  padding: 0.4rem 0.55rem;
`

const Details = styled.details`
  border-left: 2px solid ${props => props.theme.color.border};
  padding-left: 0.6rem;
`

const Summary = styled.summary`
  color: ${props => props.theme.color.text};
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.2rem 0;
`

const JsonTextarea = styled.textarea`
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  font-family: monospace;
  font-size: 0.8rem;
  min-height: 16rem;
  padding: 0.6rem;
  resize: vertical;
  width: 100%;
`

const StatusText = styled.p`
  color: ${props => (props.$error ? props.theme.color.danger : props.theme.color.good)} !important;
  font-size: 0.8rem;
`

const toNumber = value => {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

const coerceDraft = (draft, valueType) => (valueType === 'number' ? toNumber(draft) : draft)

// One row per scalar leaf, or a nested collapsible <details> per object — recurses over
// whatever shape `value` actually is, so it never needs updating when the state shape changes.
// Skips null/undefined (structural "not yet built" sentinels, e.g. intro.diskBuild) and arrays
// (e.g. prestigeMuseum.history) — those aren't simple scalar variables; edit them via the raw
// JSON editor below instead.
const FieldNode = ({ path, value, drafts, onDraftChange, onSetLeaf, onToggleLeaf }) => {
  const key = path[path.length - 1]
  const label = prettifySegment(key)
  const id = path.join('.')

  if (typeof value === 'boolean') {
    return (
      <FieldRow>
        <FieldLabel>{label}</FieldLabel>
        <Button
          aria-label={id}
          onClick={() => onToggleLeaf(path, !value)}
          type="button"
          variant={value ? 'success' : 'neutral'}
        >
          <ButtonContent>{value ? '✓ true' : '✕ false'}</ButtonContent>
        </Button>
      </FieldRow>
    )
  }

  if (isEditableScalar(value)) {
    return (
      <FieldRow>
        <FieldLabel>{label}</FieldLabel>
        <NumberInput
          aria-label={id}
          onChange={event => onDraftChange(id, event.target.value)}
          placeholder={String(value)}
          type="text"
          value={drafts[id] ?? ''}
        />
        <Button
          aria-label={`set ${id}`}
          onClick={() => onSetLeaf(path, drafts[id], typeof value)}
          type="button"
          variant="neutral"
        >
          <ButtonContent>Set</ButtonContent>
        </Button>
      </FieldRow>
    )
  }

  if (value === null || value === undefined || Array.isArray(value)) return null

  const entries = Object.entries(value)
  if (entries.length === 0) return null

  return (
    <Details>
      <Summary>{label} ({entries.length})</Summary>
      {entries.map(([childKey, childValue]) => (
        <FieldNode
          drafts={drafts}
          key={childKey}
          onDraftChange={onDraftChange}
          onSetLeaf={onSetLeaf}
          onToggleLeaf={onToggleLeaf}
          path={[...path, childKey]}
          value={childValue}
        />
      ))}
    </Details>
  )
}

// Quick-seed presets — each a small, self-explanatory delta on top of whatever state the dev save
// currently holds, applied via game.setDevState (a direct state-updater escape hatch, not the
// engine's action reducers — the point of Dev Mode is unvalidated experimentation). Reference the
// same layers.js constants the real game reads, so they never drift from what actually gates each
// milestone.
const PRESETS = [
  {
    id: 'unlock-factory',
    label: '🏭 Unlock Ladder',
    apply: state => ({ ...state, intro: { ...state.intro, mainGameUnlocked: true } }),
  },
  {
    id: 'near-prestige',
    label: '💰 Bits → 99% to Prestige',
    apply: state => ({
      ...state,
      resources: { ...state.resources, base: PRESTIGE_THRESHOLD * 0.99 },
    }),
  },
  {
    id: 'prestige-ready',
    label: '💰 Bits → Prestige threshold',
    apply: state => ({ ...state, resources: { ...state.resources, base: PRESTIGE_THRESHOLD } }),
  },
  {
    id: 'grant-1000-pp',
    label: '🏆 +1,000 PP',
    apply: state => ({
      ...state,
      prestige: { ...state.prestige, points: (state.prestige?.points ?? 0) + 1000 },
    }),
  },
  {
    id: 'era-ready',
    label: '🏆 PP → Era-ready (1 Googol)',
    apply: state => ({ ...state, prestige: { ...state.prestige, points: ERA_ELIGIBILITY_PP } }),
  },
  {
    id: 'unlock-flops',
    label: '🖥️ Unlock Compute (Flops)',
    apply: state => ({
      ...state,
      prestige: { ...state.prestige, points: Math.max(state.prestige?.points ?? 0, COMPUTE_FLOPS_REVEAL_PP) },
      computeFlops: { ...state.computeFlops, pageUnlocked: true },
    }),
  },
  {
    id: 'unlock-boosters',
    label: '🔧 Unlock Boosters (Core)',
    apply: state => ({
      ...state,
      intro: {
        ...state.intro,
        capacity: Math.max(state.intro?.capacity ?? 0, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY),
      },
    }),
  },
]

const DevModePage = ({ game }) => {
  const [fieldDrafts, setFieldDrafts] = useState({})
  const [jsonDraft, setJsonDraft] = useState(() => JSON.stringify(game.state, null, 2))
  const [jsonStatus, setJsonStatus] = useState(null)

  const active = game.devModeActive

  const handleToggle = () => {
    game.toggleDevMode()
    setJsonStatus(null)
  }

  const handleReset = () => {
    if (!window.confirm('Wipe the dev save back to a fresh state?')) return
    game.resetDevState()
    setJsonStatus(null)
  }

  const handleApplyPreset = preset => {
    game.setDevState(preset.apply)
  }

  const handleDraftChange = (id, value) => {
    setFieldDrafts(prev => ({ ...prev, [id]: value }))
  }

  const handleSetLeaf = (path, draft, valueType) => {
    if (draft === undefined || draft === '') return
    game.setDevState(state => setValueAtPath(state, path, coerceDraft(draft, valueType)))
  }

  const handleToggleLeaf = (path, nextValue) => {
    game.setDevState(state => setValueAtPath(state, path, nextValue))
  }

  const handleRefreshJson = () => {
    setJsonDraft(JSON.stringify(game.state, null, 2))
    setJsonStatus(null)
  }

  const handleApplyJson = () => {
    const result = game.applyDevStateJson(jsonDraft)
    if (result.ok) {
      setJsonStatus({ error: false, text: 'Applied.' })
      setJsonDraft(JSON.stringify(result.state, null, 2))
      setFieldDrafts({})
    } else {
      setJsonStatus({ error: true, text: `Could not apply (${result.reason}).` })
    }
  }

  return (
    <RootDiv>
      <Header>
        <h1>Dev Mode</h1>
      </Header>

      <Section aria-label="dev save section">
        <h2>Dev save</h2>
        <p>
          A separate save, isolated from every player slot — enabling it never touches your real
          progress, and disabling it resumes your real save exactly where you left it. Only
          reachable in a dev build; stripped out of <code>yarn build</code>.
        </p>
        <ButtonGrid>
          <Button
            aria-label={active ? 'disable dev mode' : 'enable dev mode'}
            onClick={handleToggle}
            type="button"
            variant={active ? 'danger' : 'primary'}
          >
            <ButtonContent>{active ? '⏻ Disable Dev Mode' : '⏻ Enable Dev Mode'}</ButtonContent>
          </Button>
          {active && (
            <Button aria-label="reset dev save" onClick={handleReset} type="button" variant="neutral">
              <ButtonContent>↺ Reset dev save</ButtonContent>
            </Button>
          )}
        </ButtonGrid>
      </Section>

      {active && (
        <>
          <Section aria-label="quick seed section">
            <h2>Quick seed</h2>
            <p>One-click presets for common test states — applied on top of the current dev save.</p>
            <ButtonGrid>
              {PRESETS.map(preset => (
                <Button
                  aria-label={preset.label}
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  type="button"
                  variant="neutral"
                >
                  <ButtonContent>{preset.label}</ButtonContent>
                </Button>
              ))}
            </ButtonGrid>
          </Section>

          <Section aria-label="variables section">
            <h2>Variables</h2>
            <p>
              Every field of the live save, read straight off <code>game.state</code> — this list
              always matches whatever <code>createInitialGameState()</code> currently defines, with
              nothing hand-maintained here. Booleans toggle on click; numbers/strings need a value
              and Set. Current: {formatCurrency(game.state.resources?.base ?? 0)} · {formatAmount(game.state.prestige?.points ?? 0)} PP.
            </p>
            {Object.entries(game.state).map(([key, value]) => (
              <FieldNode
                drafts={fieldDrafts}
                key={key}
                onDraftChange={handleDraftChange}
                onSetLeaf={handleSetLeaf}
                onToggleLeaf={handleToggleLeaf}
                path={[key]}
                value={value}
              />
            ))}
          </Section>

          <Section aria-label="raw state json section">
            <h2>Raw state (JSON)</h2>
            <p>
              Edit any field directly, then Apply — missing fields are filled in from a fresh
              state the same way an older save loads, so a small partial object (e.g.{' '}
              <code>{'{ "resources": { "base": 1e50 } }'}</code>) is enough to seed just what you
              need. Also the only way to edit structural fields the Variables list above skips
              (null-valued fields, arrays).
            </p>
            <JsonTextarea
              aria-label="dev save state json"
              onChange={event => setJsonDraft(event.target.value)}
              spellCheck={false}
              value={jsonDraft}
            />
            <ButtonGrid>
              <Button aria-label="apply json to dev save" onClick={handleApplyJson} type="button" variant="primary">
                <ButtonContent>Apply</ButtonContent>
              </Button>
              <Button aria-label="refresh json from live state" onClick={handleRefreshJson} type="button" variant="neutral">
                <ButtonContent>↻ Refresh from live state</ButtonContent>
              </Button>
            </ButtonGrid>
            {jsonStatus && <StatusText $error={jsonStatus.error}>{jsonStatus.text}</StatusText>}
          </Section>
        </>
      )}
    </RootDiv>
  )
}

export default DevModePage
