import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({children,isSelecteed,updateBoard,index})=>{
  const className = `square ${isSelecteed ? 'is-selected' : ''}`

  const handlerClick = ()=>{
    updateBoard(index)
  }

  return (
    <div className={className} onClick={handlerClick}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn,setTurn] = useState(TURNS.X)
  const [winner,setWinner] = useState(null)

  const updateBoard = (index)=>{

    if (board[index]) return

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
          {
            board.map((_,index)=>{
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >{board[index]}</Square>
              )
            })
          }
      </section>
      <section className="turn">
        <Square isSelecteed={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelecteed={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
