//import logo from './logo.svg';
import './App.css';
import Square from './components/Square';
import React from 'react';
import darkenColor from './utils';

function App() {

  const rows = 20
  const cols = 20

  const [squares, setSquares] = React.useState(newBoard())

  const squareElements = squares.map(square => (
    <Square
      key={square.id}
      row={square.row}
      col={square.col}
      value={square.id}
      color={square.color}
      changeColor={() => changeColor(square.row, square.col)}
    />)
  )

  // Monitor p key to activate painting
  const paintPress = useKeyPress("p")

  // Key press hook
  function useKeyPress(targetKey) {
    const [keyPressed, setKeyPressed] = React.useState(false)

    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    function upHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    }

    React.useEffect(() => {
      window.addEventListener("keydown", downHandler)
      window.addEventListener("keyup", upHandler)
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler)
        window.removeEventListener("keyup", upHandler)
      }
    }, []) // only run on mount and unmount

    return keyPressed
  }
  
  function changeColor(row, col) {
    if (paintPress) {
      setSquares(prevBoard => prevBoard.map(
      square => {
        // Fill center, top, bottom, left, right squares
        const inAdjRow = [row - 1, row + 1].includes(square.row)
        const inAdjCol = [col - 1, col + 1].includes(square.col)
        const inRow = (square.row === row)
        const inCol = (square.col === col)
        if ( ((inAdjRow && inCol) || (inAdjCol && inRow)) || (inRow && inCol) ) {
          return {...square, color: darkenColor(square.color)}
        } else {
          return square
        }
      }
    ))}
  }

  function newBoard() {
    const newBoard = []
    for (let i = 0; i < rows*cols; i++) {
      newBoard.push({
        id: i,
        row: Math.floor(i/rows),
        col: i % cols,
        color: "#FFFFFF"
      })
    }
    return newBoard
  }

  return (
    <div className="App">
      <div className="square-container">
        {squareElements}
      </div>
    </div>
  );
}

export default App;