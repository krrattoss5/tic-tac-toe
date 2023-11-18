import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import Square from './Square'
import { TURNS } from './constants'
import { checkWinner,checkEndGame } from './logic/board'
import { updateStorage,getStorage, clearStorage } from './logic/storage'

function App() {
  const [board, setBoard] = useState(()=>{
  const getBoardFromLocalStorage = getStorage('board')
  return getBoardFromLocalStorage ? JSON.parse(getBoardFromLocalStorage):
  Array(9).fill(null)})
  const [turn,setTurn] = useState(()=>{
    const getTurnsFromStorage = getStorage('turn')
    return getTurnsFromStorage ?? TURNS.X
  })
  const [winner,setWinner] = useState(null)

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    clearStorage('board')
    clearStorage('turn')
  }

  const updateBoard = (index)=>{

    if (board[index] || winner) return

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(newTurn)
    updateStorage(newBoard,newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setWinner(false)
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
