import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

function Square(props) {
  return (
    <button
      className={`square ${props.isHighlight && "highlight"}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        isHighlight={this.props.wonLine.includes(i) ? true : false}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  makeSquares() {
    let rows = Array(3).fill(null);

    return rows.map((element, i) => {
      let row = Array(3).fill(null);
      return (
        <div key={i} className="board-row">
          {row.map((ele, j) => {
            return this.renderSquare(i * 3 + j);
          })}
        </div>
      );
    });
  }

  render() {
    return <div>{this.makeSquares()}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: null,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      movesOrder: true, //ascending
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: i,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  sortTheMoves() {
    this.setState({
      movesOrder: !this.state.movesOrder,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);

    let moves_tmp = history.map((step, move) => {
      let locationX = step.location % 3;
      let locationY = Math.floor(step.location / 3);
      const desc = move
        ? "Go to move #" + move + `(${locationX}, ${locationY})`
        : "Go to game start";
      return (
        <li key={move}>
          <button
            className={move === this.state.stepNumber ? "bold" : ""}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    const moves = this.state.movesOrder ? moves_tmp : moves_tmp.reverse();

    let status;
    if (result) {
      status = "Winner: " + result.winner;
    } else if (!current.squares.includes(null)) {
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            wonLine={result ? result.line : []}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="btn__sort" onClick={() => this.sortTheMoves()}>
            Sort
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
