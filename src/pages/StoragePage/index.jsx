import Button, { ButtonContent } from 'components/Button'
import DiskArrayRow from 'components/DiskArrayRow'
import { getDiskSizesToShow } from 'game/engine'
import styled from 'styled-components'

const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.space.lg};
  max-width: 480px;
  margin: 0 auto;
  padding: ${props => props.theme.space.xl} ${props => props.theme.space.md};
  color: ${props => props.theme.color.text};
`

// Title plus the "← Back to Byte Foundry" exit share one row, the same title/nav-link placement
// convention ByteFoundryPage's own <Header> already uses.
const Header = styled.header`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.space.sm};
  justify-content: space-between;
  width: 100%;
`

const Title = styled.h1`
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  margin: 0;
`

// Storage's own dedicated screen — split out of ByteFoundryPage (see "Byte Foundry" in CLAUDE.md)
// once revealed (isStorageUnlocked), reached via that page's "🏦 Storage" nav button. Renders one
// DiskArrayRow (see components/DiskArrayRow) per size ever reached (ascending — smallest first,
// via getDiskSizesToShow) — every size's full square-by-square detail, not just the single
// currently-active/buildable one ByteFoundryPage itself now also renders inline. Starting the next
// disk's build stays on ByteFoundryPage itself (its own core loop) — this page is purely for
// reviewing/acting on every array's own history. `onBack` always returns to the Byte Foundry.
const StoragePage = ({ game, onBack }) => {
  const { actions, state } = game
  const diskSizesToShow = getDiskSizesToShow(state)

  return (
    <RootDiv>
      <Header>
        <Title>🏦 Storage</Title>
        <Button aria-label="Back to Byte Foundry" onClick={onBack} title="Back to Byte Foundry" type="button" variant="neutral">
          <ButtonContent>← Back</ButtonContent>
        </Button>
      </Header>

      {diskSizesToShow.map(size => (
        <DiskArrayRow key={size} actions={actions} size={size} state={state} />
      ))}
    </RootDiv>
  )
}

export default StoragePage
