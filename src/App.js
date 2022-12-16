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
  
  /*
  function changeColor(id) {
    setSquares(prevBoard => prevBoard.map(
      square => square.id === id ? {...square, color: darkenColor(square.color)} : square
    ))
    console.log(`Changed color of Square ${id}`)
  }
  */
  function changeColor(row, col) {
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
    ))
    //console.log(`Changed color of Square ${id}`)
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

/*
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          What a wonderful day!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/