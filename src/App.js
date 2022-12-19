import './App.css';
import Square from './components/Square';
import React from 'react';
import darkenColor from './utils';
import Navbar from './components/Navbar';

function App() {
  //console.log("Re-ran App")

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

  const [paintColor, setPaintColor] = React.useState("all")

  // Paint mode while mouse is down
  const [paintMode, setPaintMode] = React.useState(false)

  // Has a new bug!
  // Mousedown -> leave -> return -> Mouseup. Mousedown causes warning symbol.
  // Thereafter, dragging causes painting without Mousedown until click.
  // Perhaps I have to use "event.preventDefault()" somehow...
  function activatePaintMode(on, message) {
    console.log(message)
    setPaintMode(on ? true : false)
    console.log(`Set paintMode to ${on}`)
  }
  
  function changePaintColor(color) {
    if (["all", "cyan", "magenta", "yellow", "white"].includes(color)) {
      setPaintColor(color)
      console.log(`Set paint color to ${color}`)
    } else {
      console.log(`Error: ${color} is not a valid input`)
    }
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
          return {...square, color: darkenColor(square.color, paintColor)}
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

  function handleMouseDown(event) {
    event.preventDefault();
    activatePaintMode(true, "mouseDown")
  }

  function handleMouseUp(event) {
    event.preventDefault();
    activatePaintMode(false, "mouseUp")
  }

  function handleMouseLeave(event) {
    event.preventDefault();
    activatePaintMode(false, "mouseLeave")
  }

/*
onMouseDown={() => activatePaintMode(true, "mouseDown")}
      onMouseUp={() => activatePaintMode(false, "mouseUp")} 
      onMouseLeave={() => activatePaintMode(false, "mouseLeave")}
*/

  return (
    <div className="App">
      <Navbar changePaintColor={changePaintColor}/>
      <div className="square-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      >
        {squareElements}
      </div>
    </div>
  );
}

export default App;