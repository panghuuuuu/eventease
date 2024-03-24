import React, { useState } from "react";
import axiosInstance from "../axiosApi";
import "../stylesheets/myevents.css";
import Navbar from "../components/Navbar";
import MyEventsCard from "../components/MyEventsCard";



export const MyEvents = () => {
  const [formData, setFormData] = useState({
    // Your state initialization goes here
  });

  return (
    <section id="myevents">
        <Navbar />
        <h1>Your Events</h1>
        <div className="myevents_container">
            <button className="addevent">+ Add Your Dream Event</button>
        </div>
        <div className="myevents_panel">
          {Object.entries(MyEvents).map(
            ([eventName, eventDetails], index) => (
              <MyEventsCard
                key={index}
                event={eventName}
                eventDetails={eventDetails}
              />
            )
          )}{" "}
        </div>
        <h4>That's all your events!</h4>
    </section>
  );
};

export default MyEvents;
