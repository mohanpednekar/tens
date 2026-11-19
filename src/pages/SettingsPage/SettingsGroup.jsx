import { useState } from 'react'
import styled, { css } from 'styled-components'

// Settings as a grouped list (#1143): small uppercase captions over inset groups of one-line
// entries — icon tile · name · key value · chevron. Tapping an entry's row expands its existing
// section content in place (the section's own heading is kept for assistive tech only). An entry
// may instead carry an inline control (`inline`) and never expand.

const Caption = styled.h2`
  color: ${props => (props.$danger ? props.theme.color.danger : props.theme.color.textMuted)};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0.9rem 0.2rem 0.35rem;
  text-transform: uppercase;
`

const Group = styled.div`
  background: ${props => props.theme.color.surface};
  border: 1px solid ${props => props.theme.color.border};
  border-radius: ${props => props.theme.radius.lg};
  overflow: hidden;
`

export const SettingsGroup = ({ label, danger = false, children }) => (
  <div>
    <Caption $danger={danger}>{label}</Caption>
    <Group>{children}</Group>
  </div>
)

const Item = styled.div`
  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }
`

const headRow = css`
  align-items: center;
  background: none;
  border: 0;
  color: ${props => (props.$danger ? props.theme.color.danger : props.theme.color.text)};
  display: flex;
  font: inherit;
  gap: 0.65rem;
  min-height: 2.9rem;
  padding: 0.45rem 0.75rem;
  text-align: left;
  width: 100%;
`

const HeadButton = styled.button`
  ${headRow}
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.color.accent};
    outline-offset: -2px;
  }
`

const HeadStatic = styled.div`
  ${headRow}
`

const IconTile = styled.span`
  align-items: center;
  background: ${props => props.theme.color.surfaceSunken};
  border-radius: ${props => props.theme.radius.sm};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.9rem;
  height: 1.65rem;
  justify-content: center;
  width: 1.65rem;
`

const Name = styled.span`
  flex: 1 1 auto;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Value = styled.span`
  color: ${props => props.theme.color.textMuted};
  flex-shrink: 0;
  font-size: 0.85rem;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Chevron = styled.span`
  color: ${props => props.theme.color.textFaint};
  flex-shrink: 0;
  transform: rotate(${props => (props.$open ? '90deg' : '0deg')});
  transition: transform 120ms ease;
`

// The expanded section renders flat inside the group (no nested card chrome); its own h2 stays in
// the accessibility tree but is visually hidden since the row above already names it.
const Body = styled.div`
  border-top: 1px solid ${props => props.theme.color.border};
  padding: 0.6rem 0.75rem 0.75rem;

  & > section {
    background: transparent;
    border: 0;
    box-shadow: none;
    padding: 0;
  }

  & > section > h2 {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`

export const SettingsItem = ({ icon, label, value, danger = false, inline, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen)
  if (inline) {
    return (
      <Item>
        <HeadStatic $danger={danger}>
          <IconTile aria-hidden="true">{icon}</IconTile>
          <Name>{label}</Name>
          {inline}
        </HeadStatic>
      </Item>
    )
  }
  return (
    <Item>
      <HeadButton
        $danger={danger}
        aria-expanded={open}
        aria-label={`${label} settings`}
        onClick={() => setOpen(prev => !prev)}
        type="button"
      >
        <IconTile aria-hidden="true">{icon}</IconTile>
        <Name>{label}</Name>
        {value != null && value !== '' && <Value>{value}</Value>}
        <Chevron $open={open} aria-hidden="true">›</Chevron>
      </HeadButton>
      {open && <Body>{children}</Body>}
    </Item>
  )
}
