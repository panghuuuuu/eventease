import React, { useState } from "react";
import axiosInstance from "../axiosApi";
import "../stylesheets/myevents.css";
import Navbar from "../components/Navbar";
import MyEventsCard from "../components/MyEventsCard";

export const MyEvents = () => {
  const [formData, setFormData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('event'); 
      const data = await response.json();
      setFormData(response.formData)
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
    }
  };

  return (
    <section id="myevents">
        <Navbar />
        <h1>Your Events</h1>
        <div className="myevents_container">
            <button className="addevent">+ Add Your Dream Event</button>
        </div>
        <div className="myevents_panel">
          <MyEventsCard/>
        </div>
        <h4>That's all your events!</h4>
    </section>
  );
};

export default MyEvents;
