import { useState } from 'react'
import Button, { ButtonContent, VisuallyHidden } from 'components/Button'
import ConfirmDialog from 'components/ConfirmDialog'
import { formatAmount, formatCurrency, formatMoneyBalance, getEonsAwarded, isEraEligible, isProductionFrozen } from 'game/engine'
import { MUSEUM_PIN_CAP } from 'game/layers'
import { FREE_SLOT_COUNT, SUPPORTER_SLOT_COUNT, SUPPORTER_UNLOCK_CODE as UNLOCK_CODE, buildClearSlotConfirmMessage, buildEraseAllSavesConfirmMessage } from 'game/storage'
import styled from 'styled-components'
import CloudSaveSection from './CloudSaveSection'
import ManualSaveSection from './ManualSaveSection'
import LegalSection from './LegalSection'
import StoreSection from './StoreSection'
import { CodeForm, CodeInput, Row, Section, StatusText } from './styles'

// Always-reachable Settings screen (via AppNav → More). Holds Supporter pack
// (unlock code / dummy checkout), save slots, System log, Task Manager, and Reset —
// utilities that must not depend on unlocking Byte Factory or any other progress gate.

const RootDiv = styled.main`
  width: min(520px, calc(100vw - 2rem));
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

const SlotRow = styled(Row)`
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  padding: 0.55rem 0.65rem;
  background: ${props => (props.$active ? props.theme.color.surfaceSunken : 'transparent')};
`

const SlotLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  flex: 1;

  strong {
    color: ${props => props.theme.color.text};
    font-size: 0.95rem;
  }

  span {
    color: ${props => props.theme.color.textMuted};
    font-size: 0.75rem;
  }
`

const MuseumList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const MuseumItem = styled.li`
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
  padding: 0.5rem 0.6rem;

  strong {
    color: ${props => props.theme.color.text};
  }

  span {
    color: ${props => props.theme.color.textMuted};
    font-size: 0.8rem;
  }
`

const SparklineSvg = styled.svg`
  display: block;
  height: 64px;
  width: 100%;
`

const LockedNote = styled.p`
  color: ${props => props.theme.color.textMuted};
  font-size: 0.85rem;
  margin: 0;
`

const ThemeOptionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`

const buildSparklinePath = (samples, key) => {
  if (!samples.length) return ''
  const values = samples.map(s => Math.max(0, Number(s[key]) || 0))
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = Math.max(max - min, 1)
  const w = 100
  const h = 40
  return values
    .map((v, i) => {
      const x = values.length === 1 ? 0 : (i / (values.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

const SettingsPage = ({ game, onReset, onResetByteFoundry, themePreference = 'system', onThemePreferenceChange }) => {
  const frozen = isProductionFrozen(game.state)
  // game.devModeActive can only ever be true in a dev build (Dev Mode's own toggle is itself
  // gated behind import.meta.env.DEV — see DevModePage/AppMenu), so this condition is always
  // false in production regardless of the extra `import.meta.env.DEV &&` check — but including it
  // here too lets Terser/Rollup fold this whole branch (and its "Dev Mode" copy/title strings) away
  // at build time instead of leaving inert-but-textually-present strings in the shipped bundle, the
  // same "absent from yarn build" guarantee the rest of Dev Mode gets. See CLAUDE.md's "Dev Mode".
  const devModeActive = import.meta.env.DEV && Boolean(game.devModeActive)
  const supporter = Boolean(game.savesMeta?.supporterUnlocked)
  const [code, setCode] = useState('')
  const [codeStatus, setCodeStatus] = useState(null)
  const [eraConfirmOpen, setEraConfirmOpen] = useState(false)

  const eraCount = game.state.era?.count ?? 0
  const eonsBalance = game.state.eons?.balance ?? 0
  const eraEligible = isEraEligible(game.state)
  const eonsAwarded = getEonsAwarded(game.state)
  const unspentPp = game.state.purge?.points ?? 0
  const eonWord = count => (count === 1 ? 'Kernel' : 'Kernels')

  const museum = game.state.prestigeMuseum ?? { history: [], pinnedIds: [] }
  const pinnedSet = new Set(museum.pinnedIds ?? [])
  const history = museum.history ?? []
  const pinnedEntries = history.filter(entry => pinnedSet.has(entry.id))
  const visibleHistory = supporter ? history : history.slice(0, 1)

  const handleRedeem = event => {
    event.preventDefault()
    const result = game.redeemUnlockCode(code)
    if (!result.ok) {
      setCodeStatus({ error: true, text: 'That code is not valid.' })
      return
    }
    setCode('')
    setCodeStatus({
      error: false,
      text: result.already ? 'Supporter pack already unlocked.' : 'Supporter pack unlocked.',
    })
  }

  const handleDummyPurchase = () => {
    const result = game.purchaseSupporterDummy()
    setCodeStatus({
      error: false,
      text: result.already
        ? 'Supporter pack already unlocked.'
        : 'Dummy checkout complete — Supporter pack unlocked (no real charge).',
    })
  }

  const handleRename = slot => {
    const next = window.prompt('Rename save slot', slot.name)
    if (next == null) return
    game.renameSaveSlot(slot.id, next)
  }

  const handleClearSlot = slot => {
    if (devModeActive || (frozen && slot.isActive)) return
    if (!window.confirm(buildClearSlotConfirmMessage(slot))) return
    game.clearSlot(slot.id)
  }

  const handleEraseAll = () => {
    if (frozen || devModeActive) return
    if (!window.confirm(buildEraseAllSavesConfirmMessage())) return
    game.eraseAllSaveProgress()
  }

  const confirmEraAscend = () => {
    if (!isEraEligible(game.state)) return
    game.actions.eraAscend()
    setEraConfirmOpen(false)
  }

  const moneyPath = buildSparklinePath(game.opsSamples ?? [], 'money')
  const ppPath = buildSparklinePath(game.opsSamples ?? [], 'prestigePoints')

  return (
    <RootDiv>
      <Header>
        <h1>Settings</h1>
      </Header>

      <Section aria-label="about section">
        <h2>About</h2>
        <p>Tens — an incremental game themed around powers of ten.</p>
      </Section>

      <Section aria-label="supporter pack section">
        <h2>Supporter pack</h2>
        <p>
          Optional meta extras only — extra save slots, System log pins, and the Task
          Manager. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes
          later; for now use a code or the dummy checkout.
        </p>
        {supporter ? (
          <StatusText>
            Unlocked
            {game.savesMeta?.supporterSource === 'dummy_purchase' ? ' (dummy checkout)' : ' (unlock code)'}.
            {' '}{SUPPORTER_SLOT_COUNT} save slots · System log · Task Manager.
          </StatusText>
        ) : (
          <>
            <LockedNote>
              Free: {FREE_SLOT_COUNT} save slot. Unlock code (placeholder): <code>{UNLOCK_CODE}</code>
            </LockedNote>
            <CodeForm onSubmit={handleRedeem}>
              <CodeInput
                aria-label="supporter unlock code"
                autoComplete="off"
                onChange={event => setCode(event.target.value)}
                placeholder="Enter unlock code"
                value={code}
              />
              <Button aria-label="redeem supporter unlock code" type="submit" variant="primary">
                <ButtonContent>Redeem code</ButtonContent>
              </Button>
            </CodeForm>
            <Button
              aria-label="dummy supporter checkout"
              onClick={handleDummyPurchase}
              type="button"
              variant="neutral"
            >
              <ButtonContent>Dummy checkout (free)</ButtonContent>
            </Button>
          </>
        )}
        {codeStatus && <StatusText $error={codeStatus.error}>{codeStatus.text}</StatusText>}
      </Section>

      <CloudSaveSection game={game} />

      <ManualSaveSection game={game} />

      <StoreSection />

      <Section aria-label="save slots section">
        <h2>Save slots</h2>
        <p>
          Independent runs on this device. Switching saves the current slot first. Reset / Clear
          wipe progress only — your Supporter unlock is never removed here.
        </p>
        {devModeActive && (
          <LockedNote>
            Dev Mode is active — Play/Clear are disabled here so a dev-only session can't touch a
            real save. Disable Dev Mode first.
          </LockedNote>
        )}
        {(game.saveSlots ?? []).map(slot => (
          <SlotRow $active={slot.isActive} key={slot.id}>
            <SlotLabel>
              <strong>{slot.name}{slot.isActive ? ' · active' : ''}</strong>
              <span>
                {!slot.unlocked
                  ? 'Locked — unlock Supporter pack'
                  : slot.isEmpty
                    ? 'Empty (starts at Byte Foundry)'
                    : 'Has saved progress'}
              </span>
            </SlotLabel>
            {slot.unlocked && (
              <Row>
                {!slot.isActive && (
                  <Button
                    aria-label={`switch to ${slot.name}`}
                    disabled={devModeActive}
                    onClick={() => game.switchSaveSlot(slot.id)}
                    title={devModeActive ? 'Disable Dev Mode first' : undefined}
                    type="button"
                    variant="primary"
                  >
                    <ButtonContent>Play</ButtonContent>
                  </Button>
                )}
                <Button
                  aria-label={`rename ${slot.name}`}
                  onClick={() => handleRename(slot)}
                  type="button"
                  variant="neutral"
                >
                  <ButtonContent>Rename</ButtonContent>
                </Button>
                <Button
                  aria-label={`clear ${slot.name}`}
                  disabled={devModeActive || (frozen && slot.isActive)}
                  onClick={() => handleClearSlot(slot)}
                  title={
                    devModeActive
                      ? 'Disable Dev Mode first'
                      : frozen && slot.isActive
                        ? 'Purge first — production is frozen at 1 Googol Bytes'
                        : 'Erase this slot only (asks for confirmation)'
                  }
                  type="button"
                  variant="danger"
                >
                  <ButtonContent>Clear…</ButtonContent>
                </Button>
              </Row>
            )}
          </SlotRow>
        ))}
      </Section>

      <Section aria-label="system log section">
        <h2>System log</h2>
        {!supporter ? (
          <LockedNote>
            History still records in the background. Unlock Supporter to browse past purges and pin up to {MUSEUM_PIN_CAP}.
            {history.length > 0 && ` Latest: Purge #${history[0].purgeNumber} (+${history[0].pointsAwarded} PP).`}
          </LockedNote>
        ) : (
          <>
            <p>Pin standout runs — display only, no bonuses. Cap {MUSEUM_PIN_CAP} pins.</p>
            {pinnedEntries.length > 0 && (
              <>
                <LockedNote>Pinned</LockedNote>
                <MuseumList aria-label="pinned purge entries">
                  {pinnedEntries.map(entry => (
                    <MuseumItem key={`pin-${entry.id}`}>
                      <div>
                        <strong>Purge #{entry.purgeNumber}</strong>
                        <div>
                          <span>+{entry.pointsAwarded} PP · {formatMoneyBalance(entry.moneyBits)}</span>
                        </div>
                      </div>
                      <Button
                        aria-label={`unpin purge ${entry.purgeNumber}`}
                        onClick={() => game.actions.unpinMuseumEntry(entry.id)}
                        type="button"
                        variant="neutral"
                      >
                        <ButtonContent>Unpin</ButtonContent>
                      </Button>
                    </MuseumItem>
                  ))}
                </MuseumList>
              </>
            )}
            <LockedNote>Recent history</LockedNote>
            {visibleHistory.length === 0 ? (
              <LockedNote>No purges recorded yet.</LockedNote>
            ) : (
              <MuseumList aria-label="system log history">
                {visibleHistory.map(entry => (
                  <MuseumItem key={entry.id}>
                    <div>
                      <strong>Purge #{entry.purgeNumber}</strong>
                      <div>
                        <span>+{entry.pointsAwarded} PP · {formatCurrency(entry.moneyBits)}</span>
                      </div>
                    </div>
                    {pinnedSet.has(entry.id) ? (
                      <Button
                        aria-label={`unpin purge ${entry.purgeNumber}`}
                        onClick={() => game.actions.unpinMuseumEntry(entry.id)}
                        type="button"
                        variant="neutral"
                      >
                        <ButtonContent>Unpin</ButtonContent>
                      </Button>
                    ) : (
                      <Button
                        aria-label={`pin purge ${entry.purgeNumber}`}
                        disabled={pinnedSet.size >= MUSEUM_PIN_CAP}
                        onClick={() => game.actions.pinMuseumEntry(entry.id)}
                        type="button"
                        variant="neutral"
                      >
                        <ButtonContent>Pin</ButtonContent>
                      </Button>
                    )}
                  </MuseumItem>
                ))}
              </MuseumList>
            )}
          </>
        )}
      </Section>

      <Section aria-label="reboot section">
        <h2>Reboot</h2>
        <p>
          Voluntary meta-prestige when you hold enough unspent Purge Points — no production
          freeze. Awards Kernels for future upgrades.
        </p>
        <Row>
          <span>Reboots</span>
          <strong>{eraCount}</strong>
        </Row>
        <Row>
          <span>Kernels</span>
          <strong>{eonsBalance} {eonWord(eonsBalance)}</strong>
        </Row>
        <p>
          {eraEligible
            ? `Ready — next Reboot awards ${eonsAwarded} ${eonWord(eonsAwarded)}.`
            : `Requires 1 Googol PP unspent (you have ${formatAmount(unspentPp)} PP).`}
        </p>
        <Button
          aria-label={
            eraEligible
              ? 'Reboot — open confirmation'
              : 'Reboot — requires 1 Googol unspent Purge Points'
          }
          disabled={!eraEligible}
          onClick={() => setEraConfirmOpen(true)}
          type="button"
          variant="prestige"
        >
          <ButtonContent>⏻ Reboot…</ButtonContent>
        </Button>
      </Section>

      <Section aria-label="task manager section">
        <h2>Task Manager</h2>
        {!supporter ? (
          <LockedNote>Unlock Supporter for live Bits and Purge Point sparklines. Information only — no production change.</LockedNote>
        ) : (
          <>
            <p>Live session samples (not persisted). Balance: {formatMoneyBalance(game.state.resources?.base ?? 0)} · PP: {game.state.purge?.points ?? 0}</p>
            <LockedNote>Bits</LockedNote>
            <SparklineSvg aria-label="bits sparkline" role="img" viewBox="0 0 100 40">
              <path d={moneyPath || 'M0 40'} fill="none" stroke="currentColor" strokeWidth="1.5" />
            </SparklineSvg>
            <LockedNote>Purge Points</LockedNote>
            <SparklineSvg aria-label="purge points sparkline" role="img" viewBox="0 0 100 40">
              <path d={ppPath || 'M0 40'} fill="none" stroke="currentColor" strokeWidth="1.5" />
            </SparklineSvg>
          </>
        )}
      </Section>

      <Section aria-label="appearance section">
        <h2>Appearance</h2>
        <p>Choose light or dark mode, or match your device (System).</p>
        <ThemeOptionRow role="group" aria-label="theme preference">
          {[
            { id: 'system', label: 'System' },
            { id: 'light', label: 'Light' },
            { id: 'dark', label: 'Dark' },
          ].map(({ id, label }) => (
            <Button
              key={id}
              aria-label={`use ${label.toLowerCase()} theme`}
              aria-pressed={themePreference === id}
              onClick={() => onThemePreferenceChange?.(id)}
              type="button"
              variant={themePreference === id ? 'primary' : 'neutral'}
            >
              <ButtonContent>{label}</ButtonContent>
            </Button>
          ))}
        </ThemeOptionRow>
      </Section>

      <LegalSection />

      <Section aria-label="danger zone">
        <h2>Danger zone</h2>
        <p>
          Erase the <strong>active</strong> save (“{game.saveSlots?.find(s => s.isActive)?.name ?? 'Save 1'}”)
          and start from the Byte Foundry. Other slots and your Supporter unlock stay.
        </p>
        <Button
          aria-describedby="settings-reset-description"
          aria-label="Reset game"
          disabled={frozen}
          onClick={onReset}
          title={
            frozen
              ? 'Purge first — production is frozen at 1 Googol Bytes'
              : 'Erases the active save slot and starts over (asks for confirmation)'
          }
          type="button"
          variant="danger"
        >
          <ButtonContent>↺ Reset active save…</ButtonContent>
          <VisuallyHidden id="settings-reset-description">
            Erases the active save slot and starts over; other slots and Supporter unlock stay
          </VisuallyHidden>
        </Button>
        <p>
          Restart the Byte Foundry on the active save — Data Stream Capacity, Disks, Data Lakes and
          Compute entities. Compile, Upgrade Capacity, Upgrade Bitrate, Provision Disk and Data Lake
          upgrades/Cells then replay automatically up to your pre-reset highs.
          Byte Factory and Purge progress stay.
        </p>
        <Button
          aria-describedby="settings-reset-foundry-description"
          aria-label="Reformat Byte Foundry"
          disabled={frozen}
          onClick={onResetByteFoundry}
          title={
            frozen
              ? 'Purge first — production is frozen at 1 Googol Bytes'
              : 'Restarts the Foundry; Compile, Data Stream upgrades, Disks and Data Lakes replay automatically up to prior highs'
          }
          type="button"
          variant="danger"
        >
          <ButtonContent>↺ Reformat Byte Foundry…</ButtonContent>
          <VisuallyHidden id="settings-reset-foundry-description">
            Restarts Capacity, Storage, Data Lakes and Compute from scratch, then replays upgrades,
            Disks and Data Lakes automatically up to pre-reset highs; Byte Factory and Purge progress stay
          </VisuallyHidden>
        </Button>
        <p>Wipe every slot’s progress on this device. Does not remove the Supporter unlock.</p>
        <Button
          aria-label="Erase all save progress"
          disabled={frozen || devModeActive}
          onClick={handleEraseAll}
          title={
            devModeActive
              ? 'Disable Dev Mode first'
              : frozen
                ? 'Purge first — production is frozen at 1 Googol Bytes'
                : 'Erases all slots but keeps Supporter unlock (asks for confirmation)'
          }
          type="button"
          variant="danger"
        >
          <ButtonContent>Erase all save progress…</ButtonContent>
        </Button>
      </Section>

      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Reboot"
        confirmVariant="prestige"
        onCancel={() => setEraConfirmOpen(false)}
        onConfirm={confirmEraAscend}
        open={eraConfirmOpen}
        title="Reboot?"
      >
        <p>
          Awards {eonsAwarded} {eonWord(eonsAwarded)} and resets the Byte Foundry for a deep reset —
          Factory itself stays permanently reachable, no gate to tap back through.
        </p>
        <p>
          <strong>Resets:</strong> Foundry generator upgrades, Data Stream Capacity, Disks, Compute entities,
          Byte Factory tiers and resources, unspent PP and Purge count, Compression level, and Compute
          owned units.
        </p>
        <p>
          <strong>Keeps:</strong> automation unlocks and pause flags, Overflow mode latch,
          System log, Compute page reveal, Flops autobuyer unlocks, Kernels (+ award), and hyperscalers.
        </p>
      </ConfirmDialog>
    </RootDiv>
  )
}

export default SettingsPage
