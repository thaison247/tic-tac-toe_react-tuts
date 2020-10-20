import React, { useState } from "react";
import Board from "../Board/board";

Game.propTypes = {};

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      location: null,
    },
  ]);

  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [movesOrder, setMovesOrder] = useState(true);

  function handleClick(i) {
    const copiedHistory = history.slice(0, stepNumber + 1);
    const current = copiedHistory[copiedHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistory(
      copiedHistory.concat([
        {
          squares: squares,
          location: i,
        },
      ])
    );
    setXIsNext(!xIsNext);
    setStepNumber(copiedHistory.length);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);

    // this.setState({
    //   stepNumber: step,
    //   xIsNext: step % 2 === 0,
    // });
  }

  function sortTheMoves() {
    setMovesOrder(!movesOrder);
    // this.setState({
    //   movesOrder: !this.state.movesOrder,
    // });
  }

  const copiedHistory = history;
  const current = copiedHistory[stepNumber];
  const result = calculateWinner(current.squares);

  let moves_tmp = copiedHistory.map((step, move) => {
    let locationX = step.location % 3;
    let locationY = Math.floor(step.location / 3);
    const desc = move
      ? "Go to move #" + move + `(${locationX}, ${locationY})`
      : "Go to game start";
    return (
      <li key={move}>
        <button
          className={move === stepNumber ? "bold" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  const moves = movesOrder ? moves_tmp : moves_tmp.reverse();

  let status;
  if (result) {
    status = "Winner: " + result.winner;
  } else if (!current.squares.includes(null)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          wonLine={result ? result.line : []}
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="btn__sort" onClick={() => sortTheMoves()}>
          Sort
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
      };
    }
  }
  return null;
}

export default Game;
