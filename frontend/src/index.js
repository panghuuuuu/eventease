import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { Router, Route, Routes } from "react-router-dom";

// redux
import store from "./store";
import { Provider } from "react-redux";
// actions

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
