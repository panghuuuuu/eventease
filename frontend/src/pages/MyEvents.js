import React, { useState, useEffect } from "react";
import "../stylesheets/myevents.css";
import axios from "../axiosApi.js";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard.js";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }
        const response = await axios.get("/events", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Response:", response.data);
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
        <button className="addevent">+ Add Your Dream Event</button>
        <div className="myevents_panel">
          {events.map((event, index) => (
            <EventCard
              key={event}
              event={event.event_name}
              eventDetails={event}
            />
          ))}
        </div>
        <h4>That's all your events!</h4>
      </div>
    </section>
  );
};

export default MyEvents;
