import { useState } from 'react'
import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import { formatAmount, formatCurrency } from 'game/engine'
import {
  COMPUTE_FLOPS_REVEAL_PP,
  ERA_ELIGIBILITY_PP,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  PRESTIGE_THRESHOLD,
  TIER_DEFINITIONS,
} from 'game/layers'
import styled from 'styled-components'

// Dev-only sandbox (see CLAUDE.md → "Dev Mode"). Reached only through App.jsx/AppMenu entry
// points gated behind `import.meta.env.DEV`, so this page's own code is unreachable — and, once
// minified/tree-shaken by `yarn build`, absent — from a production bundle. Everything here
// operates on a save entirely separate from any real player slot (see game/storage.js's
// DEV_SLOT_ID); toggling Dev Mode off always resumes the real save untouched.

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
`

const FieldLabel = styled.label`
  color: ${props => props.theme.color.textMuted};
  flex: 0 0 9rem;
  font-size: 0.85rem;
`

const NumberInput = styled.input`
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  flex: 1;
  font-family: ${props => props.theme.font.body};
  font-size: 0.9rem;
  min-width: 8rem;
  padding: 0.45rem 0.6rem;
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

// Quick-seed presets — each a small, self-explanatory delta on top of whatever state the dev save
// currently holds, applied via game.setDevState (a direct state-updater escape hatch, not the
// engine's action reducers — the point of Dev Mode is unvalidated experimentation).
const PRESETS = [
  {
    id: 'unlock-factory',
    label: '🏭 Unlock Factory',
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

const QUICK_FIELDS = [
  { id: 'base', label: 'Bits', get: state => state.resources?.base ?? 0, set: (state, value) => ({ ...state, resources: { ...state.resources, base: value } }) },
  { id: 'bytes', label: 'Bytes', get: state => state.resources?.bytes ?? 0, set: (state, value) => ({ ...state, resources: { ...state.resources, bytes: value } }) },
  { id: 'points', label: 'Prestige Points', get: state => state.prestige?.points ?? 0, set: (state, value) => ({ ...state, prestige: { ...state.prestige, points: value } }) },
  { id: 'count', label: 'Prestige count', get: state => state.prestige?.count ?? 0, set: (state, value) => ({ ...state, prestige: { ...state.prestige, count: value } }) },
  { id: 'eons', label: 'Eons', get: state => state.eons?.balance ?? 0, set: (state, value) => ({ ...state, eons: { ...state.eons, balance: value } }) },
  { id: 'era', label: 'Era count', get: state => state.era?.count ?? 0, set: (state, value) => ({ ...state, era: { ...state.era, count: value } }) },
]

const DevModePage = ({ game }) => {
  const [fieldDrafts, setFieldDrafts] = useState({})
  const [ownedDraft, setOwnedDraft] = useState('10')
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

  const handleSetField = field => {
    const draft = fieldDrafts[field.id]
    if (draft === undefined) return
    game.setDevState(state => field.set(state, toNumber(draft)))
  }

  const handleSetAllOwned = () => {
    const n = Math.max(0, Math.floor(toNumber(ownedDraft)))
    game.setDevState(state => ({
      ...state,
      owned: TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: n }), { ...state.owned }),
      purchased: TIER_DEFINITIONS.reduce((acc, tier) => ({ ...acc, [tier.id]: n }), { ...state.purchased }),
    }))
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

          <Section aria-label="quick edit section">
            <h2>Quick edit</h2>
            <p>Current: {formatCurrency(game.state.resources?.base ?? 0)} · {formatAmount(game.state.prestige?.points ?? 0)} PP</p>
            {QUICK_FIELDS.map(field => (
              <FieldRow key={field.id}>
                <FieldLabel htmlFor={`dev-field-${field.id}`}>{field.label}</FieldLabel>
                <NumberInput
                  id={`dev-field-${field.id}`}
                  onChange={event => setFieldDrafts(prev => ({ ...prev, [field.id]: event.target.value }))}
                  placeholder={String(field.get(game.state))}
                  type="text"
                  value={fieldDrafts[field.id] ?? ''}
                />
                <Button
                  aria-label={`set ${field.label}`}
                  onClick={() => handleSetField(field)}
                  type="button"
                  variant="neutral"
                >
                  <ButtonContent>Set</ButtonContent>
                </Button>
              </FieldRow>
            ))}
            <FieldRow>
              <FieldLabel htmlFor="dev-field-owned">Every tier's Owned</FieldLabel>
              <NumberInput
                id="dev-field-owned"
                onChange={event => setOwnedDraft(event.target.value)}
                type="text"
                value={ownedDraft}
              />
              <Button aria-label="set every tier's owned count" onClick={handleSetAllOwned} type="button" variant="neutral">
                <ButtonContent>Set all</ButtonContent>
              </Button>
            </FieldRow>
          </Section>

          <Section aria-label="raw state json section">
            <h2>Raw state (JSON)</h2>
            <p>
              Edit any field directly, then Apply — missing fields are filled in from a fresh
              state the same way an older save loads, so a small partial object (e.g.{' '}
              <code>{'{ "resources": { "base": 1e50 } }'}</code>) is enough to seed just what you
              need.
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
