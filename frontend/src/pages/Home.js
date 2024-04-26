import React from "react";
import { Link } from "react-router-dom";

import "../stylesheets/home.css";

import Navbar from "../components/Navbar";
import Eventedit from "./Eventedit";

export const Home = () => {
  const scrollToBottom = () => {
    const element = document.getElementById("home");
    console.log(element.scrollHeight);
    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section id="home">
      <div className="home_container" id="home_container">
        <Navbar />
        <div className="hero">
          <div className="hero_text">
            <h1>Start planning your dream event.</h1>
          </div>
          <div className="hero_details">
            <p>Where do you want to start?</p>
            <div className="home_buttons_container">
              <button onClick={scrollToBottom}>
                <svg
                  width="25"
                  height="27"
                  viewBox="0 0 25 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.70048 15.2685H10.7995V24.7315C10.7995 25.6933 11.5603 26.5 12.5 26.5C13.4397 26.5 14.2005 25.6933 14.2005 24.7315V15.2685H23.2995C24.2243 15.2685 25 14.4773 25 13.5C25 12.5227 24.2243 11.7315 23.2995 11.7315H14.2005V2.2685C14.2005 1.30668 13.4397 0.5 12.5 0.5C11.5603 0.5 10.7995 1.30668 10.7995 2.2685V11.7315H1.70048C0.775656 11.7315 0 12.5227 0 13.5C0 14.4773 0.775656 15.2685 1.70048 15.2685Z"
                    fill="white"
                  />
                </svg>
                Create Your Dream Event
              </button>
              <Link to="/browse">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.90456 20.1239C11.9056 20.1239 13.7808 19.5255 15.3414 18.5031L20.8537 23.9764C21.2187 24.3255 21.6843 24.5 22.1877 24.5C23.2323 24.5 24 23.6896 24 22.6673C24 22.1935 23.8364 21.7322 23.484 21.3831L18.0094 15.9348C19.1421 14.339 19.8091 12.4065 19.8091 10.3119C19.8091 4.91351 15.354 0.5 9.90456 0.5C4.46775 0.5 0 4.91351 0 10.3119C0 15.7104 4.45517 20.1239 9.90456 20.1239ZM9.90456 17.5057C5.91505 17.5057 2.64289 14.2642 2.64289 10.3119C2.64289 6.35974 5.91505 3.11818 9.90456 3.11818C13.8941 3.11818 17.1662 6.35974 17.1662 10.3119C17.1662 14.2642 13.8941 17.5057 9.90456 17.5057Z"
                    fill="white"
                  />
                </svg>
                Browse Suppliers
              </Link>
            </div>
          </div>
          <div className="hero_continue">
            <button onClick={scrollToBottom}>
              <p>Start Planning</p>
              <div className="scroll_icon">
                <svg
                  width="62"
                  height="23"
                  viewBox="0 0 62 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4L31 19L58 4"
                    stroke="#A460ED"
                    stroke-width="7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <Eventedit id="eventEdit" />
    </section>
  );
};

export default Home;
