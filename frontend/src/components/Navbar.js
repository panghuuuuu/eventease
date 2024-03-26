import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../stylesheets/navbar.css";
import logo from "../assets/logo_header.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkLoggedIn();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar_container">
      <div className="nav_left">
        <Link to="/">
          <img className="eventease_logo" src={logo} alt="EventEase logo" />
        </Link>
      </div>
      <div className="searchbar">
        <svg
          width="14"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41699 13.8745C8.81445 13.8745 10.124 13.4526 11.2139 12.7319L15.0635 16.5903C15.3184 16.8364 15.6436 16.9595 15.9951 16.9595C16.7246 16.9595 17.2607 16.3882 17.2607 15.6675C17.2607 15.3335 17.1465 15.0083 16.9004 14.7622L13.0771 10.9214C13.8682 9.79639 14.334 8.43408 14.334 6.95752C14.334 3.15186 11.2227 0.0405273 7.41699 0.0405273C3.62012 0.0405273 0.5 3.15186 0.5 6.95752C0.5 10.7632 3.61133 13.8745 7.41699 13.8745ZM7.41699 12.0288C4.63086 12.0288 2.3457 9.74365 2.3457 6.95752C2.3457 4.17139 4.63086 1.88623 7.41699 1.88623C10.2031 1.88623 12.4883 4.17139 12.4883 6.95752C12.4883 9.74365 10.2031 12.0288 7.41699 12.0288Z"
            fill="#474747"
          />
        </svg>
        <input type="text" name="search"></input>
      </div>
      <div className="nav_right">
        <button className="browse_btn">
          <Link to="/browse">Browse</Link>
        </button>
        {isLoggedIn ? (
          <>
            <button className="myevents_btn">
              <Link to="/myevents">My Events</Link>{" "}
            </button>
            <button className="logout_btn" onClick={handleLogout}>
              Logout
            </button>
            <svg
              className="acct_icon"
              xmlns="http://www.w3.org/2000/svg"
              width="auto"
              height="42"
              viewBox="0 0 64 65"
              fill="none"
            >
              <g clip-path="url(#clip0_122_368)">
                <rect
                  y="0.233032"
                  width="64"
                  height="64"
                  fill="url(#paint0_linear_122_368)"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M37.991 33.6329C41.5828 31.5593 44 27.6785 44 23.233C44 16.6056 38.6274 11.233 32 11.233C25.3726 11.233 20 16.6056 20 23.233C20 27.6785 22.4172 31.5593 26.009 33.6329C19.1849 38.737 15 46.8345 15 55.6176V64.2328H49V55.6176C49 46.8345 44.8151 38.737 37.991 33.6329Z"
                  fill="white"
                />
              </g>
              <rect
                x="0.5"
                y="0.733032"
                width="63"
                height="63"
                rx="31.5"
                stroke="#1E1E1E"
                stroke-opacity="0.3"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_122_368"
                  x1="8"
                  y1="-11.267"
                  x2="50.5"
                  y2="72.733"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0354981" stop-color="#9FC9F3" />
                  <stop offset="1" stop-color="#A460ED" />
                </linearGradient>
                <clipPath id="clip0_122_368">
                  <rect
                    y="0.233032"
                    width="64"
                    height="64"
                    rx="32"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </>
        ) : (
          <>
            <button className="login_btn">
              <Link to="/login">Log In</Link>
            </button>
            <button className="register_btn">
              <Link to="/register">Register</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
