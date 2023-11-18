export default function Square({children,isSelecteed,updateBoard,index}){

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