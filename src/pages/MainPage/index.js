import Button from 'components/Button'
import styled from 'styled-components'
import {useState} from 'react'

const StyledDiv = styled.div`
  width: 600px;
  margin: auto;
  display: grid;
  grid-auto-flow: row;
  justify-content: space-evenly;
  grid-template-columns: repeat(3, 1fr);
`

const MainPage = () => {
  const [ dim1, setDim1 ] = useState(0)
  
  const addOne=()=>{
    setDim1(dim1+1)
  }
  
  return (
    <StyledDiv>
      <Button color={'white'}>{dim1}</Button>
      <Button color={'lightgrey'} onClick={addOne}>+1</Button>
    </StyledDiv>
  )
}
MainPage.propTypes = {}
MainPage.defaultProps = {}
export default MainPage
