import { useEffect, useMemo, useState } from 'react'
import Button, { ButtonContent } from 'components/Button'
import StatCard from 'components/StatCard'
import Switch from 'components/Switch'
import { applyAutobuyerMilestones, formatAmount, formatBitsInNearestUnit, formatCurrency } from 'game/engine'
import {
  COMPUTE_FLOPS_REVEAL_PP,
  ERA_ELIGIBILITY_PP,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  PURGE_THRESHOLD,
} from 'game/layers'
import {
  VARIABLE_AREAS,
  collectLeaves,
  describePath,
  getVariableAreaId,
  isEditableScalar,
  leafMatchesQuery,
  parseNumberDraft,
  prettifySegment,
  setValueAtPath,
} from './stateFields'
import styled from 'styled-components'

// Dev-only sandbox (see CLAUDE.md → "Dev Mode", docs/DEVMODE_REFERENCE.md). Reached only through
// App.jsx/AppMenu entry points gated behind `import.meta.env.DEV`, so this page's own code is
// unreachable — and, once tree-shaken by `yarn build`, absent — from a production bundle. Everything
// here operates on a save separate from every real player slot (game/storage.js's DEV_SLOT_ID).
//
// Layout mirrors the real game: a header balance strip like MainPage/Perks, quick-seed presets and
// Variables grouped by the same AppNav destinations (Foundry / Compute / Factory / Perks / …) with
// Perks-style icon tabs, Perks-style Switches for booleans. The Variables tree is not a
// hand-maintained field list: it's a recursive walk of the live `game.state` (FieldNode), so a new
// field added to createInitialGameState() shows up with zero changes here.

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
  gap: 0.55rem;

  h2 {
    font-size: ${props => props.theme.type.scale.md.size};
    margin: 0;
  }

  h3 {
    color: ${props => props.theme.color.textMuted};
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    margin: 0.2rem 0 0;
    text-transform: uppercase;
  }

  p {
    color: ${props => props.theme.color.textMuted};
    font-size: 0.85rem;
    margin: 0;
  }
`

const ToggleRow = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
`

const ToggleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    color: ${props => props.theme.color.text};
  }
`

const Readouts = styled.dl`
  display: grid;
  gap: 0.4rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
  margin: 0;
`

const Readout = styled.div`
  background: ${props => props.theme.color.surfaceSunken};
  border-radius: ${props => props.theme.radius.sm};
  padding: 0.35rem 0.55rem;

  dt {
    color: ${props => props.theme.color.textMuted};
    font-size: 0.7rem;
  }

  dd {
    color: ${props => props.theme.color.text};
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    margin: 0;
    overflow-wrap: anywhere;
  }
`

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`

const TabBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`

const TabButton = styled(Button)`
  flex: 1 1 4.5rem;
  font-size: 0.8rem;
`

const TextInput = styled.input`
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => (props['aria-invalid'] ? props.theme.color.danger : props.theme.color.border)};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  font-family: ${props => props.theme.font.body};
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
  min-width: 0;
  padding: 0.4rem 0.55rem;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

const FieldRow = styled.div`
  align-items: center;
  border-top: 1px solid ${props => props.theme.color.border};
  display: grid;
  gap: 0.3rem 0.5rem;
  grid-template-columns: minmax(6rem, 2fr) minmax(0, 3fr);
  padding: 0.35rem 0;

  &:first-of-type {
    border-top: none;
  }
`

const FieldLabel = styled.span`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.82rem;
  overflow-wrap: anywhere;
`

const FieldControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`

const InputLine = styled.div`
  display: flex;
  gap: 0.3rem;
`

const StepLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`

const StepButton = styled(Button)`
  font-size: 0.75rem;
  min-width: 2.4rem;
  padding: 0.2rem 0.4rem;
`

const Hint = styled.span`
  color: ${props => (props.$error ? props.theme.color.danger : props.theme.color.textMuted)};
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
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
  padding: 0.25rem 0;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
    border-radius: ${props => props.theme.radius.sm};
  }
`

const JsonTextarea = styled.textarea`
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => (props['aria-invalid'] ? props.theme.color.danger : props.theme.color.border)};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  font-family: monospace;
  font-size: 0.8rem;
  min-height: 16rem;
  padding: 0.6rem;
  resize: vertical;
  width: 100%;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: 2px;
  }
`

const StatusText = styled.p`
  color: ${props => (props.$error ? props.theme.color.danger : props.theme.color.good)} !important;
  font-size: 0.8rem;
`

// A readable echo of a number — the game's own formatter, so "1e+100" reads as the HUD shows it.
const describeNumber = value => (Number.isInteger(value) && Math.abs(value) < 1e4 ? null : formatAmount(value))

// Powers-of-ten steppers (the game's own unit of progress) plus ±1 for small whole counts
// (levels, prestige count, owned…). Integer fields stay integers.
const getSteps = value => {
  const isWhole = Number.isInteger(value)
  const steps = [
    { id: 'div10', label: '÷10', apply: v => (isWhole ? Math.floor(v / 10) : v / 10) },
    { id: 'mul10', label: '×10', apply: v => (v === 0 ? 10 : v * 10) },
  ]
  if (isWhole && Math.abs(value) < Number.MAX_SAFE_INTEGER) {
    steps.unshift({ id: 'minus1', label: '−1', apply: v => Math.max(0, v - 1) })
    steps.push({ id: 'plus1', label: '+1', apply: v => v + 1 })
  }
  return steps
}

// Number/string leaf: the input shows the live value until edited; Enter or ✓ commits, Escape
// reverts. Numbers accept scientific / grouped / 10^N input (parseNumberDraft) and flag anything
// else invalid instead of silently writing 0.
const ScalarField = ({ path, value, label, onCommit }) => {
  const [draft, setDraft] = useState(null)
  const id = path.join('.')
  const isNumber = typeof value === 'number'
  const parsed = isNumber && draft !== null ? parseNumberDraft(draft) : null
  const invalid = isNumber && draft !== null && parsed === null
  const dirty = draft !== null && !invalid

  const commit = () => {
    if (!dirty) return
    onCommit(path, isNumber ? parsed : draft)
    setDraft(null)
  }

  const echo = isNumber ? (invalid ? 'Not a number (try 1e100, 1,000 or 10^6)' : describeNumber(parsed ?? value)) : null

  return (
    <FieldRow>
      <FieldLabel title={id}>{label}</FieldLabel>
      <FieldControls>
        <InputLine>
          <TextInput
            aria-invalid={invalid || undefined}
            aria-label={id}
            autoComplete="off"
            enterKeyHint="done"
            inputMode={isNumber ? 'decimal' : 'text'}
            onBlur={() => draft !== null && draft === String(value) && setDraft(null)}
            onChange={event => setDraft(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') commit()
              if (event.key === 'Escape') setDraft(null)
            }}
            spellCheck={false}
            type="text"
            value={draft ?? String(value)}
          />
          <StepButton
            aria-label={`set ${id}`}
            disabled={!dirty}
            onClick={commit}
            title="Set (Enter) — Escape reverts"
            type="button"
            variant={dirty ? 'primary' : 'neutral'}
          >
            <ButtonContent>✓</ButtonContent>
          </StepButton>
        </InputLine>
        {isNumber && (
          <StepLine>
            {getSteps(value).map(step => {
              const next = step.apply(value)
              return (
              <StepButton
                aria-label={`${id} ${step.label}`}
                disabled={!Number.isFinite(next)}
                key={step.id}
                onClick={() => {
                  // A step acts on the live value, so drop any uncommitted draft — otherwise a
                  // later Enter would silently overwrite the stepped value with the stale draft.
                  setDraft(null)
                  onCommit(path, next)
                }}
                type="button"
                variant="neutral"
              >
                <ButtonContent>{step.label}</ButtonContent>
              </StepButton>
              )
            })}
          </StepLine>
        )}
        {echo && <Hint $error={invalid}>{invalid ? echo : `= ${echo}`}</Hint>}
      </FieldControls>
    </FieldRow>
  )
}

const LeafField = ({ path, value, label, onCommit }) => {
  const id = path.join('.')

  if (typeof value === 'boolean') {
    return (
      <FieldRow>
        <FieldLabel title={id}>{label}</FieldLabel>
        <FieldControls>
          <InputLine>
            <Switch $on={value} aria-label={id} aria-pressed={value} onClick={() => onCommit(path, !value)} />
            <Hint>{value ? 'On' : 'Off'}</Hint>
          </InputLine>
        </FieldControls>
      </FieldRow>
    )
  }

  if (isEditableScalar(value)) return <ScalarField label={label} onCommit={onCommit} path={path} value={value} />

  // null ("not unlocked yet" / "not built yet" sentinels) and arrays aren't single scalars —
  // shown read-only so they're still discoverable, editable via the JSON editor.
  return (
    <FieldRow>
      <FieldLabel title={id}>{label}</FieldLabel>
      <Hint>
        {Array.isArray(value) ? `[${value.length} item${value.length === 1 ? '' : 's'}]` : 'not set'} · edit in raw JSON
      </Hint>
    </FieldRow>
  )
}

// One row per leaf, or a nested collapsible <details> per object — recurses over whatever shape
// `value` actually is, so it never needs updating when the state shape changes.
const FieldNode = ({ path, value, onCommit }) => {
  const label = prettifySegment(path[path.length - 1])
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return <LeafField label={label} onCommit={onCommit} path={path} value={value} />
  }
  const entries = Object.entries(value)
  if (entries.length === 0) return null
  return (
    <Details>
      <Summary>{label} ({entries.length})</Summary>
      {entries.map(([childKey, childValue]) => (
        <FieldNode key={childKey} onCommit={onCommit} path={[...path, childKey]} value={childValue} />
      ))}
    </Details>
  )
}

// Quick-seed presets — each a small delta on the current dev save, applied via game.setDevState (a
// direct state-updater escape hatch, not the engine's validated actions). Grouped by the AppNav
// area they unlock/affect, and built from the same layers.js constants the real game gates on.
const PRESET_GROUPS = [
  {
    id: 'foundry',
    label: '🔥 Foundry',
    presets: [
      {
        id: 'unlock-factory',
        label: '🏭 Unlock Byte Factory',
        apply: state => ({ ...state, intro: { ...state.intro, mainGameUnlocked: true } }),
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
    ],
  },
  {
    id: 'factory',
    label: '📶 Factory',
    presets: [
      {
        id: 'near-prestige',
        label: '💰 Bits → 99% to Purge',
        apply: state => ({ ...state, resources: { ...state.resources, base: PURGE_THRESHOLD * 0.99 } }),
      },
      {
        id: 'prestige-ready',
        label: '💰 Bits → Purge threshold',
        apply: state => ({ ...state, resources: { ...state.resources, base: PURGE_THRESHOLD } }),
      },
    ],
  },
  {
    id: 'purge',
    label: '🏆 Purge',
    presets: [
      {
        id: 'grant-1000-pp',
        label: '🏆 +1,000 PP',
        apply: state => ({
          ...state,
          purge: { ...state.purge, points: (state.purge?.points ?? 0) + 1000 },
        }),
      },
      {
        id: 'add-prestige',
        label: '🏆 +1 Purge count',
        // Same milestone unlocks a real Prestige applies (purgeGame), so the count-gated
        // autobuyers this preset exists to test actually unlock.
        apply: state => applyAutobuyerMilestones({
          ...state,
          purge: { ...state.purge, count: (state.purge?.count ?? 0) + 1 },
        }),
      },
      {
        id: 'unlock-flops',
        label: '🖥️ Unlock Compute (Flops)',
        apply: state => ({
          ...state,
          purge: { ...state.purge, points: Math.max(state.purge?.points ?? 0, COMPUTE_FLOPS_REVEAL_PP) },
          computeFlops: { ...state.computeFlops, pageUnlocked: true },
        }),
      },
    ],
  },
  {
    id: 'era',
    label: '🌌 Era',
    presets: [
      {
        id: 'era-ready',
        label: '🏆 PP → Era-ready (1 Googol)',
        apply: state => ({ ...state, purge: { ...state.purge, points: ERA_ELIGIBILITY_PP } }),
      },
    ],
  },
]

// Tabs follow AppNav's left-to-right order; VARIABLE_AREAS' own order is match priority.
const VARIABLE_AREA_TABS = ['foundry', 'compute', 'factory', 'perks', 'purge', 'era']
  .map(id => VARIABLE_AREAS.find(area => area.id === id))

const safeStringify = state => JSON.stringify(state, null, 2)

const getJsonError = text => {
  try {
    const parsed = JSON.parse(text)
    return parsed !== null && Object.prototype.toString.call(parsed) === '[object Object]' && (Object.getPrototypeOf(parsed) === null || Object.getPrototypeOf(parsed) === Object.prototype) ? null : 'Must be a JSON object'
  } catch (error) {
    return error.message
  }
}

const DevModePage = ({ game }) => {
  const active = game.devModeActive
  const [area, setArea] = useState(VARIABLE_AREA_TABS[0].id)
  const [query, setQuery] = useState('')
  const [jsonDraft, setJsonDraft] = useState(() => safeStringify(game.state))
  const [jsonStatus, setJsonStatus] = useState(null)
  // Bumped when the save is changed from outside the fields (JSON apply, reset, quick seed) to remount the Variables fields,
  // dropping their uncommitted drafts so a later Enter can't overwrite the new value with a stale one.
  const [fieldsEpoch, setFieldsEpoch] = useState(0)

  // The JSON editor follows the save it describes: toggling Dev Mode swaps saves, so reload it.
  useEffect(() => {
    setJsonDraft(safeStringify(game.state))
    setJsonStatus(null)
    // Only on a save swap — not every tick, which would clobber an in-progress edit.
  }, [active])

  const jsonError = useMemo(() => getJsonError(jsonDraft), [jsonDraft])

  const areaKeys = useMemo(
    () => Object.keys(game.state).filter(key => getVariableAreaId(key) === area),
    [game.state, area],
  )

  const searchResults = useMemo(() => {
    if (query.trim() === '') return null
    return collectLeaves(game.state).filter(leaf => leafMatchesQuery(leaf.path, query))
  }, [game.state, query])

  const handleReset = () => {
    if (!window.confirm('Wipe the dev save back to a fresh state?')) return
    game.resetDevState()
    setJsonStatus(null)
    setFieldsEpoch(epoch => epoch + 1)
  }

  const handleCommit = (path, value) => {
    game.setDevState(state => setValueAtPath(state, path, value))
  }

  const handleApplyJson = () => {
    const result = game.applyDevStateJson(jsonDraft)
    if (result.ok) {
      setJsonStatus({ error: false, text: 'Applied.' })
      setJsonDraft(safeStringify(result.state))
      setFieldsEpoch(epoch => epoch + 1)
    } else {
      setJsonStatus({ error: true, text: `Could not apply (${result.reason}).` })
    }
  }

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(safeStringify(game.state))
      setJsonStatus({ error: false, text: 'Copied live state.' })
    } catch {
      setJsonStatus({ error: true, text: 'Clipboard unavailable.' })
    }
  }

  const { state } = game
  const readouts = [
    ['Bits', formatCurrency(state.resources?.base ?? 0)],
    ['Purge Points', `✦ ${formatAmount(state.purge?.points ?? 0)}`],
    ['Purges', formatAmount(state.purge?.count ?? 0)],
    ['Era · Eons', `${formatAmount(state.era?.count ?? 0)} · ${formatAmount(state.eons?.balance ?? 0)}`],
    ['Capacity', formatBitsInNearestUnit(state.intro?.capacity ?? 0)],
  ]

  return (
    <RootDiv>
      <Header>
        <h1>Dev Mode</h1>
      </Header>

      <Section aria-label="dev save section">
        <ToggleRow>
          <ToggleText>
            <strong>{active ? 'Playing the dev save' : 'Playing your real save'}</strong>
            <p>
              A separate sandbox save — enabling never touches real progress; disabling resumes it
              exactly where you left it.
            </p>
          </ToggleText>
          <Switch $on={active} aria-label="dev mode" aria-pressed={active} onClick={game.toggleDevMode} />
        </ToggleRow>
        {active && (
          <>
            <Readouts aria-label="dev save readouts" role="group">
              {readouts.map(([term, value]) => (
                <Readout key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </Readout>
              ))}
            </Readouts>
            <ButtonGrid>
              <Button aria-label="reset dev save" onClick={handleReset} type="button" variant="danger">
                <ButtonContent>↺ Reset dev save</ButtonContent>
              </Button>
            </ButtonGrid>
          </>
        )}
      </Section>

      {active && (
        <>
          <Section aria-label="quick seed section">
            <h2>Quick seed</h2>
            <p>Jump straight to a milestone — applied on top of the current dev save.</p>
            {PRESET_GROUPS.map(group => (
              <div key={group.id}>
                <h3>{group.label}</h3>
                <ButtonGrid>
                  {group.presets.map(preset => (
                    <Button
                      aria-label={preset.label}
                      key={preset.id}
                      onClick={() => {
                        game.setDevState(preset.apply)
                        setFieldsEpoch(epoch => epoch + 1)
                      }}
                      type="button"
                      variant="neutral"
                    >
                      <ButtonContent>{preset.label}</ButtonContent>
                    </Button>
                  ))}
                </ButtonGrid>
              </div>
            ))}
          </Section>

          <Section aria-label="variables section">
            <h2>Variables</h2>
            <p>
              Every field of the live save, grouped like the game's own screens. Switches apply
              instantly; numbers take <code>1e100</code>, <code>1,000</code> or <code>10^6</code> —
              press Enter or ✓ to set, or step by powers of ten.
            </p>
            <TextInput
              aria-label="search variables"
              autoComplete="off"
              onChange={event => setQuery(event.target.value)}
              placeholder="🔍 Search every field (e.g. Kilobytes, capacity)"
              spellCheck={false}
              type="search"
              value={query}
            />
            {searchResults ? (
              <div aria-label="variable search results" key={fieldsEpoch} role="region">
                {searchResults.length === 0 && <Hint>No field matches “{query.trim()}”.</Hint>}
                {searchResults.slice(0, 60).map(leaf => (
                  <LeafField
                    key={leaf.path.join('.')}
                    label={describePath(leaf.path)}
                    onCommit={handleCommit}
                    path={leaf.path}
                    value={leaf.value}
                  />
                ))}
                {searchResults.length > 60 && <Hint>+{searchResults.length - 60} more — refine the search.</Hint>}
              </div>
            ) : (
              <>
                <TabBar role="tablist" aria-label="variable areas">
                  {VARIABLE_AREA_TABS.map(item => (
                    <TabButton
                      aria-controls="dev-variables-panel"
                      aria-label={`show ${item.label} variables`}
                      aria-selected={area === item.id}
                      key={item.id}
                      onClick={() => setArea(item.id)}
                      role="tab"
                      type="button"
                      variant={area === item.id ? 'primary' : 'neutral'}
                    >
                      <ButtonContent>
                        <span aria-hidden="true">{item.icon}</span> {item.label}
                      </ButtonContent>
                    </TabButton>
                  ))}
                </TabBar>
                <div aria-label={`${area} variables`} id="dev-variables-panel" key={fieldsEpoch} role="tabpanel">
                  {areaKeys.map(key => (
                    <FieldNode key={key} onCommit={handleCommit} path={[key]} value={state[key]} />
                  ))}
                </div>
              </>
            )}
          </Section>

          <Section aria-label="raw state json section">
            <Details>
              <Summary>Advanced: raw state (JSON)</Summary>
              <p>
                Paste a partial object (e.g. <code>{'{ "resources": { "base": 1e50 } }'}</code>) —
                missing fields keep their current values. The only way to edit null fields and arrays.
              </p>
              <JsonTextarea
                aria-invalid={Boolean(jsonError) || undefined}
                aria-label="dev save state json"
                onChange={event => {
                  setJsonDraft(event.target.value)
                  setJsonStatus(null)
                }}
                spellCheck={false}
                value={jsonDraft}
              />
              {jsonError && <StatusText $error>✕ {jsonError}</StatusText>}
              <ButtonGrid>
                <Button
                  aria-label="apply json to dev save"
                  disabled={Boolean(jsonError)}
                  onClick={handleApplyJson}
                  type="button"
                  variant="primary"
                >
                  <ButtonContent>Apply</ButtonContent>
                </Button>
                <Button
                  aria-label="refresh json from live state"
                  onClick={() => {
                    setJsonDraft(safeStringify(game.state))
                    setJsonStatus(null)
                  }}
                  type="button"
                  variant="neutral"
                >
                  <ButtonContent>↻ Load live state</ButtonContent>
                </Button>
                <Button aria-label="copy live state json" onClick={handleCopyJson} type="button" variant="neutral">
                  <ButtonContent>⧉ Copy</ButtonContent>
                </Button>
              </ButtonGrid>
              {jsonStatus && <StatusText $error={jsonStatus.error}>{jsonStatus.text}</StatusText>}
            </Details>
          </Section>
        </>
      )}
    </RootDiv>
  )
}

export default DevModePage
