import React from "react";
import "../stylesheets/browse.css";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import { Services } from "../sample_data.js";

const BrowsePage = () => {
  return (
    <section id="browse">
      <Navbar />
      <h1>Browse</h1>
      <div className="container browse_container">
        <div className="filter_panel">
          <h2>What are you looking for?</h2>
          <ul>
            <li>Venues</li>
            <li>Caterers</li>
            <li>Party Supplies</li>
            <li>Hosts</li>
            <li>Photographers</li>
            <li>Entertainers</li>
            <li>Gowns or Suits</li>
            <li>Costumes</li>
            <li>Makeup Artist</li>
          </ul>
          <h2>Filters</h2>
        </div>
        <div className="browse_panel">
          {Object.entries(Services).map(
            ([serviceName, serviceDetails], index) => (
              <EventCard
                key={index}
                service={serviceName}
                serviceDetails={serviceDetails}
              />
            )
          )}{" "}
        </div>
      </div>
    </section>
  );
};

export default BrowsePage;
