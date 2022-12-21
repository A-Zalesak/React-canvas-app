import './App.css';
import Square from './components/Square';
import React from 'react';
import darkenColor from './utils';
import Navbar from './components/Navbar';
import './components/Button.css'

// New functionality to add:
// When mouse leaves while down, continue painting when it re-enters

function App() {
  //console.log("Re-ran App")

  // If you change these, make sure to also change the App.css
  const rows = 15
  const cols = 20

  const [squares, setSquares] = React.useState(
    JSON.parse(localStorage.getItem("squares")) || newBoard()
  )

  const squareElements = squares.map(square => (
    <Square
      key={square.id}
      row={square.row}
      col={square.col}
      value={square.id}
      color={square.color}
      changeColorHover={() => changeColor(square.row, square.col)}
      changeColorClick={() => changeColor(square.row, square.col, true)}
    />)
  )

  const [paintColor, setPaintColor] = React.useState("grey")

  // Paint mode while mouse is down
  const [paintMode, setPaintMode] = React.useState(false)

  function activatePaintMode(on) {
    setPaintMode(on ? true : false)
    //console.log(`Set paintMode to ${on}`)
  }
  
  function changePaintColor(color) {
    if (["grey", "cyan", "magenta", "yellow", "white"].includes(color)) {
      setPaintColor(color)
      //console.log(`Set paint color to ${color}`)
    } else {
      //console.log(`Error: ${color} is not a valid input`)
    }
  }

  function changeColor(row, col, isFromClick=false) {
    if (paintMode || isFromClick) {
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

  function resetBoard() {
    setSquares(newBoard())
  }

  // Save notes
  React.useEffect(() => {
    localStorage.setItem("squares", JSON.stringify(squares))
  }, [squares])

  function handleMouseDown(event) {
    event.preventDefault();
    activatePaintMode(true)
  }

  function handleMouseUp(event) {
    event.preventDefault();
    activatePaintMode(false)
  }

  function handleMouseLeave(event) {
    event.preventDefault();
    activatePaintMode(false)
  }

  return (
    <div className="App">
      <Navbar
      changePaintColor={changePaintColor}
      resetBoard={resetBoard}
      currentColor={paintColor}/>
      <div className="square-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      >
        {squareElements}
      </div>
      <button className="button-52" id="button--reset" onClick={resetBoard}>Reset board</button>
    </div>
  );
}

export default App;