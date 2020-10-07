import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import ReactGA from "react-ga";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    color: #333;
    margin: 0;
    padding: 2em 4em;
    line-height: 1.8em;
    font-size: 18px;
    font-family: "Helvetica Neue Cyr";
  }

  ::selection {
    background-color: #ffffd0;
  }

  @font-face {
    font-family: "Helvetica Neue Cyr";
    font-style: normal;
    font-display: block;
    src: local("Helvetica Neue Cyr"), url(/HelveticaNeueCyrRoman.woff2) format("woff2");
    unicode-range: U+000-5FF; /* Latin glyphs */
  }
`;

ReactGA.initialize("UA-2324643-1");

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
