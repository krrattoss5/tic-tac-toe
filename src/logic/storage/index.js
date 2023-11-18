export const updateStorage = (newBoard,newTurn)=>{
  window.localStorage.setItem('board',JSON.stringify(newBoard))
  window.localStorage.setItem('turn',newTurn)
}

export const getStorage = (key)=> window.localStorage.getItem(key)

export const clearStorage = (key)=> window.localStorage.removeItem(key)