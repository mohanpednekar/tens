import { useState } from 'react'
import Button, { ButtonContent, VisuallyHidden } from 'components/Button'
import StatCard from 'components/StatCard'
import { formatCurrency, formatMoneyBalance, isProductionFrozen } from 'game/engine'
import { MUSEUM_PIN_CAP } from 'game/layers'
import { FREE_SLOT_COUNT, SUPPORTER_SLOT_COUNT, SUPPORTER_UNLOCK_CODE as UNLOCK_CODE, buildClearSlotConfirmMessage, buildEraseAllSavesConfirmMessage } from 'game/storage'
import styled from 'styled-components'

// Always-reachable Settings screen (via AppNav → More). Holds app meta, Supporter pack
// (unlock code / dummy checkout), save slots, Prestige museum, Ops dashboard, and Reset —
// utilities that must not depend on unlocking Factory or any other progress gate.

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

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: space-between;
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

const CodeForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  width: 100%;
`

const CodeInput = styled.input`
  background: ${props => props.theme.color.surfaceSunken};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.sm};
  color: ${props => props.theme.color.text};
  flex: 1;
  font-family: ${props => props.theme.font.body};
  font-size: 0.9rem;
  min-width: 10rem;
  padding: 0.5rem 0.65rem;
`

const StatusText = styled.p`
  color: ${props => (props.$error ? props.theme.color.danger : props.theme.color.textMuted)};
  font-size: 0.8rem;
  margin: 0;
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

const SettingsPage = ({ game, onReset, onResetByteFoundry }) => {
  const frozen = isProductionFrozen(game.state)
  const supporter = Boolean(game.savesMeta?.supporterUnlocked)
  const [code, setCode] = useState('')
  const [codeStatus, setCodeStatus] = useState(null)

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
    if (frozen && slot.isActive) return
    if (!window.confirm(buildClearSlotConfirmMessage(slot))) return
    game.clearSlot(slot.id)
  }

  const handleEraseAll = () => {
    if (frozen) return
    if (!window.confirm(buildEraseAllSavesConfirmMessage())) return
    game.eraseAllSaveProgress()
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
          Optional meta extras only — extra save slots, Prestige museum pins, and the Ops
          dashboard. Never changes Bits, PP, Disks, Compute, or unlock order. Real payment comes
          later; for now use a code or the dummy checkout.
        </p>
        {supporter ? (
          <StatusText>
            Unlocked
            {game.savesMeta?.supporterSource === 'dummy_purchase' ? ' (dummy checkout)' : ' (unlock code)'}.
            {' '}{SUPPORTER_SLOT_COUNT} save slots · museum · ops.
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

      <Section aria-label="save slots section">
        <h2>Save slots</h2>
        <p>
          Independent runs on this device. Switching saves the current slot first. Reset / Clear
          wipe progress only — your Supporter unlock is never removed here.
        </p>
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
                    onClick={() => game.switchSaveSlot(slot.id)}
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
                  disabled={frozen && slot.isActive}
                  onClick={() => handleClearSlot(slot)}
                  title={
                    frozen && slot.isActive
                      ? 'Prestige first — production is frozen at 1 Googol Bytes'
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

      <Section aria-label="prestige museum section">
        <h2>Prestige museum</h2>
        {!supporter ? (
          <LockedNote>
            History still records in the background. Unlock Supporter to browse past prestiges and pin up to {MUSEUM_PIN_CAP}.
            {history.length > 0 && ` Latest: Prestige #${history[0].prestigeNumber} (+${history[0].pointsAwarded} PP).`}
          </LockedNote>
        ) : (
          <>
            <p>Pin standout runs — display only, no bonuses. Cap {MUSEUM_PIN_CAP} pins.</p>
            {pinnedEntries.length > 0 && (
              <>
                <LockedNote>Pinned</LockedNote>
                <MuseumList aria-label="pinned prestige entries">
                  {pinnedEntries.map(entry => (
                    <MuseumItem key={`pin-${entry.id}`}>
                      <div>
                        <strong>Prestige #{entry.prestigeNumber}</strong>
                        <div>
                          <span>+{entry.pointsAwarded} PP · {formatMoneyBalance(entry.moneyBits)}</span>
                        </div>
                      </div>
                      <Button
                        aria-label={`unpin prestige ${entry.prestigeNumber}`}
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
              <LockedNote>No prestiges recorded yet.</LockedNote>
            ) : (
              <MuseumList aria-label="prestige museum history">
                {visibleHistory.map(entry => (
                  <MuseumItem key={entry.id}>
                    <div>
                      <strong>Prestige #{entry.prestigeNumber}</strong>
                      <div>
                        <span>+{entry.pointsAwarded} PP · {formatCurrency(entry.moneyBits)}</span>
                      </div>
                    </div>
                    {pinnedSet.has(entry.id) ? (
                      <Button
                        aria-label={`unpin prestige ${entry.prestigeNumber}`}
                        onClick={() => game.actions.unpinMuseumEntry(entry.id)}
                        type="button"
                        variant="neutral"
                      >
                        <ButtonContent>Unpin</ButtonContent>
                      </Button>
                    ) : (
                      <Button
                        aria-label={`pin prestige ${entry.prestigeNumber}`}
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

      <Section aria-label="ops dashboard section">
        <h2>Ops dashboard</h2>
        {!supporter ? (
          <LockedNote>Unlock Supporter for live Bits and Prestige Point sparklines. Information only — no production change.</LockedNote>
        ) : (
          <>
            <p>Live session samples (not persisted). Balance: {formatMoneyBalance(game.state.resources?.base ?? 0)} · PP: {game.state.prestige?.points ?? 0}</p>
            <LockedNote>Bits</LockedNote>
            <SparklineSvg aria-label="bits sparkline" role="img" viewBox="0 0 100 40">
              <path d={moneyPath || 'M0 40'} fill="none" stroke="currentColor" strokeWidth="1.5" />
            </SparklineSvg>
            <LockedNote>Prestige Points</LockedNote>
            <SparklineSvg aria-label="prestige points sparkline" role="img" viewBox="0 0 100 40">
              <path d={ppPath || 'M0 40'} fill="none" stroke="currentColor" strokeWidth="1.5" />
            </SparklineSvg>
          </>
        )}
      </Section>

      <Section aria-label="appearance section">
        <h2>Appearance</h2>
        <p>Dark theme (system preference + light-mode toggle coming later).</p>
      </Section>

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
              ? 'Prestige first — production is frozen at 1 Googol Bytes'
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
          Wipe Capacity, Memory, Disks / Storage, and Compute on the active save — useful if
          Capacity was pushed too far. Combine, Invest / Bandwidth, and Disk Build restart from
          scratch, then auto-press again up to your pre-reset highs (Capacity stays manual). Factory
          progress and Prestige stay.
        </p>
        <Button
          aria-describedby="settings-reset-foundry-description"
          aria-label="Reset Byte Foundry"
          disabled={frozen}
          onClick={onResetByteFoundry}
          title={
            frozen
              ? 'Prestige first — production is frozen at 1 Googol Bytes'
              : 'Resets Foundry to scratch; auto-replays upgrades up to prior highs except Capacity'
          }
          type="button"
          variant="danger"
        >
          <ButtonContent>↺ Reset Byte Foundry…</ButtonContent>
          <VisuallyHidden id="settings-reset-foundry-description">
            Erases Capacity, Storage, and Compute; restarts upgrades from scratch with convenience
            auto-clicks up to pre-reset highs; Factory and Prestige stay
          </VisuallyHidden>
        </Button>
        <p>Wipe every slot’s progress on this device. Does not remove the Supporter unlock.</p>
        <Button
          aria-label="Erase all save progress"
          disabled={frozen}
          onClick={handleEraseAll}
          title={
            frozen
              ? 'Prestige first — production is frozen at 1 Googol Bytes'
              : 'Erases all slots but keeps Supporter unlock (asks for confirmation)'
          }
          type="button"
          variant="danger"
        >
          <ButtonContent>Erase all save progress…</ButtonContent>
        </Button>
      </Section>
    </RootDiv>
  )
}

export default SettingsPage
