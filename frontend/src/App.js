import React, { Component } from "react";
import history from "./history";
import "./stylesheets/App.css";

import Signup from "./pages/Signup";
import Eventedit from "./pages/Eventedit";
import Eventboard from "./pages/eventboard";

const App = () => (
  <div>
    <Eventboard/>
  </div>
);

export default App;
