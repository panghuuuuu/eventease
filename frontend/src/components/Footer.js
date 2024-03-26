import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../stylesheets/footer.css";
import logo from "../assets/logo_white.png";

function Footer() {
  return (
    <footer className="footer_container">
      <div className="footer_left">
        <img src={logo} alt="EventEase Logo"/>
        <span className="vl"></span>
      </div>
      <div className="footer_right">
      </div>
    </footer>
  );
}

export default Footer;
