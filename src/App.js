import './App.css';
import Square from './components/Square';
import React from 'react';
import darkenColor from './utils';

function App() {

  // If you change these, make sure to also change the App.css
  const rows = 15
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

  // If the grid-container is clicked on, change to paint mode
  const [paintMode, setPaintMode] = React.useState(false)

  function activatePaintMode(on) {
    setPaintMode(on ? true : false)
  }
  
  function changeColor(row, col) {
    if (paintMode) {
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
      <div className="square-container"
      onMouseDown={() => activatePaintMode(true)}
      onMouseUp={() => activatePaintMode(false)} 
      onMouseLeave={() => activatePaintMode(false)}>
        {squareElements}
      </div>
    </div>
  );
}

export default App;