import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Provider from "./context";

ReactDOM.render(
  <Provider>
    <App.Index />
  </Provider>,
  document.getElementById("root")
);

