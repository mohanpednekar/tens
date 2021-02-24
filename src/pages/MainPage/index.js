import Button from 'components/Button'
import Money from 'components/Money'
import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'

const RootDiv = styled.div`
  width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
const MainPage = React.memo(() => {
  console.log('MainPage')
  const [ gameState, setGameState ] = useState({
    money:10,
    dim1:0,
  })

  const addOne = () => {
    setGameState(gs=>({money:gs.money-10,dim1:gs.dim1+1}))
  }
  const gameTick = () => {
    setGameState(gs => ({money:gs.money+gs.dim1,dim1:gs.dim1}))
  }
  useEffect(() => {setInterval(gameTick, 1000)}, [])
  return (
    <RootDiv>
      <Money>${gameState.money}</Money>
      <StyledDiv>
        <Button color={'white'}>{gameState.dim1}</Button>
        <Button color={gameState.money >= 10 ? 'white' : 'darkgrey'} disabled={gameState.money < 10} onClick={addOne}>+1</Button>
      </StyledDiv>
    </RootDiv>
  )
})
export default MainPage
