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

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn,setTurn] = useState(TURNS.X)
  const [winner,setWinner] = useState(null)

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkWinner = (boardToCheck)=>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo

      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const updateBoard = (index)=>{

    if (board[index] || winner) return

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }
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

      {
        winner !== null && <section className="winner">
          <div className="text">
            <h2>
              {
                winner === false
                ? 'Empate'
                : `El ganador es:`
              }
            </h2>

            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      }

    </main>
  )
}

export default App
