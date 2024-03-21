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
          <div className="filters_container">
            <h2>Filters</h2>
            <div className="location_filter">
              <p className>By Location</p>
              <select className="dropdown" id="dropdown" name="location">
                <option value="Philippines">Philippines</option>
              </select>
            </div>
            <div className="budget_filter">
              <p className="input_label">By Budget</p>
              <div className="input">
                <input type="float" name="budget" placeholder="PHP" />
              </div>
              <div className="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="250"
                  className="slider"
                  id="myRange"
                />
                <div className="range_text">
                  <p>0 PHP</p>
                  <p>500000+ PHP</p>{" "}
                </div>
              </div>
            </div>
          </div>
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
