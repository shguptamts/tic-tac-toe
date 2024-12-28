import { useState } from "react";

function Square({ value, onSquareclick }) {
  return (
    <button className="square" onClick={onSquareclick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(index) {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; ++i) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
      return null;
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareclick={() => {
            handleClick(0);
          }}
        />
        <Square
          value={squares[1]}
          onSquareclick={() => {
            handleClick(1);
          }}
        />
        <Square value={squares[2]} onSquareclick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareclick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareclick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareclick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareclick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareclick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareclick={() => handleClick(8)} />
      </div>
    </>
  );
}
