import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./stylesheets/App.css";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUsPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Browse from "./pages/BrowsePage";
import MyEvents from "./pages/MyEvents";
import Eventboard from "./pages/Eventboard";
import Eventedit from "./pages/Eventedit";
import ServiceProvider from "./pages/ServiceProvider";
const App = () => (
  <Router>
    <Routes>
      <Route path="/create" element={<Eventedit />} />
      <Route path="/event/edit/:eventId" element={<Eventedit />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/myevents" element={<MyEvents />} />
      <Route path="/eventboard/:eventId" element={<Eventboard />} />{" "}
      <Route path="/service/:serviceId" element={<ServiceProvider />} />{" "}
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default App;
