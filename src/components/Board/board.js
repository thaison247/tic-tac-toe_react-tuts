import React from "react";
import Square from "../Square/square";
import PropTypes from "prop-types";

Board.propTypes = {
  wonLine: PropTypes.array,
  squares: PropTypes.array,
  onClick: PropTypes.func,
};

Board.defaultProps = {
  wonLine: [],
  squares: [],
  onClick: null,
};

function Board(props) {
  const { wonLine, squares, onClick } = { ...props };

  function renderSquare(i) {
    return (
      <Square
        key={i}
        isHighlight={wonLine.includes(i) ? true : false}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  function makeSquares() {
    let rows = Array(3).fill(null);

    return rows.map((element, i) => {
      let row = Array(3).fill(null);
      return (
        <div key={i} className="board-row">
          {row.map((ele, j) => {
            return renderSquare(i * 3 + j);
          })}
        </div>
      );
    });
  }

  return <div>{makeSquares()}</div>;
}

export default Board;
