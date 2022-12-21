import './App.css';
import Square from './components/Square';
import React from 'react';
import darkenColor from './utils';
import Navbar from './components/Navbar';
import './components/Button.css';
import Footer from './components/Footer'


function App() {

  // If you change these, make sure to also change the App.css
  const rows = 15
  const cols = 20

  const [squares, setSquares] = React.useState(
    JSON.parse(localStorage.getItem("squares")) || newBoard()
  )

  const [showGridlines, setShowGridlines] = React.useState(true)

  const squareElements = squares.map(square => (
    <Square
      key={square.id}
      row={square.row}
      col={square.col}
      value={square.id}
      color={square.color}
      showGridlines={showGridlines}
      changeColorHover={() => changeColor(square.row, square.col)}
      changeColorClick={() => changeColor(square.row, square.col, true)}
    />)
  )

  const [paintColor, setPaintColor] = React.useState("grey")

  // Paint mode while mouse is down
  const [paintMode, setPaintMode] = React.useState(false)

  function activatePaintMode(on) {
    setPaintMode(on ? true : false)
  }
  
  function changePaintColor(color) {
    setPaintColor(color)
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

  function handleGridlinesButtonClick() {
    setShowGridlines(prevState => !prevState)
  }

  // Button-pressed will override and keep it looking pressed
  const gridlineButtonClasses = `button-52 ${showGridlines ? "button-pressed" : ""}`

  const gridlinesButtonElement = (
    <button
    className={gridlineButtonClasses}
    id="button--gridlines"
    onClick={handleGridlinesButtonClick}>
      {showGridlines ? "Hide gridlines" : "Show gridlines"}
    </button>
  )

  return (
    <div
    className="App"
    onMouseLeave={handleMouseLeave}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}>
      <Navbar
      changePaintColor={changePaintColor}
      resetBoard={resetBoard}
      currentColor={paintColor}/>
      <div className="square-container">
        {squareElements}
      </div>
      {gridlinesButtonElement}
      <button className="button-52" id="button--reset" onClick={resetBoard}>Reset board</button>
      <Footer />
    </div>
  );
}

export default App;