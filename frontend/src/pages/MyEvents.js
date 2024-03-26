import React, { useState, useEffect } from "react";
import "../stylesheets/myevents.css";
import axios from "../axiosApi.js";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard.js";
import Footer from "../components/Footer.js";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }
        const response = await axios.get("/events", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, []);

  return (
    <section id="myevents">
      <Navbar />
      <h1>Your Events</h1>
      <div className="myevents_container">
        <button className="addevent">
        <svg width="14" height="14" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.29236 11.3604H8.20764V18.6396C8.20764 19.3795 8.7858 20 9.5 20C10.2142 20 10.7924 19.3795 10.7924 18.6396V11.3604H17.7076C18.4105 11.3604 19 10.7518 19 10C19 9.24821 18.4105 8.63962 17.7076 8.63962H10.7924V1.36038C10.7924 0.620525 10.2142 0 9.5 0C8.7858 0 8.20764 0.620525 8.20764 1.36038V8.63962H1.29236C0.589499 8.63962 0 9.24821 0 10C0 10.7518 0.589499 11.3604 1.29236 11.3604Z" fill="#A460ED"/>
        </svg>
          Add Your Dream Event
        </button>
        <div className="myevents_panel">
          {events.map((event, index) => (
            <EventCard
              key={event}
              event={event.event_name}
              eventDetails={event}
            />
          ))}
        </div>
        <p class="myevents_end">That's all your events!</p>
      </div>
      <Footer />
    </section>
  );
};

export default MyEvents;
