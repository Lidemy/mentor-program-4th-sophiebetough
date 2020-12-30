import React from "react";
import ReactDOM from "react-dom";
import Game from "./Game";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #f0f0f0;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <Game />
  </>,
  document.getElementById("root")
);
