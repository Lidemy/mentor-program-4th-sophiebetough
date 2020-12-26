import React from "react";
import Square from "./Square";
import styled from "styled-components";

const BoardRow = styled.div`
  margin: 30px auto;
  height: 475px;
  width: 475px;
  background-color: #f0f0f0;
  box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const Row = styled.div``;

export default function Board({ squares, onClick }) {
  return (
    <BoardRow>
      {squares.map((row, yIndex) => (
        <Row key={yIndex}>
          {row.map((color, xIndex) => (
            <Square
              key={xIndex}
              value={color}
              onClick={() => onClick(xIndex, yIndex)}
            />
          ))}
        </Row>
      ))}
    </BoardRow>
  );
}
