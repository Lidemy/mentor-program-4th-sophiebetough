import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import Background from "./boats.jpg";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    min-height: 100vh;  
    background: url(${Background}) repeat center / cover;
    text-align: center;
    font-family: 微軟正黑體;
  }
`;

ReactDom.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
