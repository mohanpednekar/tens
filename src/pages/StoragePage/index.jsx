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

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`

const Title = styled.h1`
  font-family: ${props => props.theme.font.display};
  font-size: ${props => props.theme.type.scale.xl.size};
  margin: 0;
`

// Storage's dedicated screen — reached via AppNav once isStorageUnlocked. Renders one
// DiskArrayRow per size ever reached (ascending via getDiskSizesToShow). Starting the next
// disk's build stays on ByteFoundryPage; this page is for reviewing/acting on every array.
const StoragePage = ({ game }) => {
  const { actions, state } = game
  const diskSizesToShow = getDiskSizesToShow(state)

  return (
    <RootDiv>
      <Header>
        <Title>🏦 Storage</Title>
      </Header>

      {diskSizesToShow.map(size => (
        <DiskArrayRow key={size} actions={actions} size={size} state={state} />
      ))}
    </RootDiv>
  )
}

export default StoragePage
