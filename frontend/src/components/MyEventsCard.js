import React, { useState, useEffect } from "react";
import "../stylesheets/card.css";
import axios from "../axiosApi.js";

const EventCard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        console.log("Token: " + token);
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <div className="myeventcard">
      <div>
        <div className="myevent_details">
          <h3></h3>
          <p> type</p>
          <p> Services:</p>
          <p> date</p>
          // when arrow is clicked, should be led to eventboard page, aka what
          ross is doing
          <h4>
            More Details{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="31"
              viewBox="0 0 20 31"
              fill="none"
            >
              <path
                d="M2.33325 29L17.3333 15.5L2.33325 2"
                stroke="#A460ED"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
