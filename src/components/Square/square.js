import React from "react";
import PropTypes from "prop-types";

Square.propTypes = {
  value: PropTypes.string,
  isHighlight: PropTypes.bool,
  onClick: PropTypes.func,
};

Square.defaultProps = {
  value: "",
  isHighlight: false,
  onClick: null,
};

function Square(props) {
  const { value, isHighlight, onClick } = { ...props };

  return (
    <button
      className={`square ${isHighlight && "highlight"}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
