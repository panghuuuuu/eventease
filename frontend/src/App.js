import React, { Component } from "react";
import history from "./history";
import "./stylesheets/App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Eventedit from "./pages/Eventedit";
const App = () => (
  <div>
    <Home />
    <Eventedit />
  </div>
);

export default App;
