import React from "react";
import styled from "styled-components";

const Button = styled.div`
  display: table;
  float: left;
  margin: 0;
  width: 25px;
  height: 25px;
  border: 0.1px solid #d1d1d1;
  cursor: pointer;
  &:active {
    transform: scale(0.98, 0.98);
  }
`;

const Black = styled.div`
  content: "";
  background-color: #000000;
  width: 20px;
  height: 20px;
  border: 0;
  margin: 2px auto 0;
  border-radius: 50%;
  justify-content: center;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

const White = styled.div`
  content: "";
  background-color: #fcfcfc;
  width: 20px;
  height: 20px;
  border: 0;
  margin: 2px auto 0;
  border-radius: 50%;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

const Square = ({ value, onClick }) => {
  let button = null;
  if (value) {
    value === "black" ? (button = <Black />) : (button = <White />);
  }
  return <Button onClick={onClick}>{button}</Button>;
};

export default Square;
