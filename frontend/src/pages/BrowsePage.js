import React, { useState, useEffect } from "react";
import "../stylesheets/browse.css";
import axios from "../axiosApi.js";
import ServiceCard from "../components/ServiceCard.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BrowsePage = () => {
  const [services, setServices] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [activeFilterIndex, setActiveFilterIndex] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        let url = "/services";
        if (selectedFilter) {
          url += `?service_type=${selectedFilter}`;
        }
        const response = await axios.get(url);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [selectedFilter]);

  const handleFilterClick = (filter, index) => {
    if (activeFilterIndex === index) {
      clearFilter();
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filter);
      setActiveFilterIndex(index);
    }
  };

  const clearFilter = () => {
    setSelectedFilter(null);
    setActiveFilterIndex(null);
  };

  return (
    <>
      <section id="browse" className="section_container">
        <Navbar />
        <h1>Browse</h1>
        <div className="container browse_container">
          <div className="filter_panel">
            <h2>
              What are you
              <br />
              looking for?
            </h2>
            <ul>
              {[
                "VENUES",
                "CATERER",
                "PARTY SUPPLIES",
                "HOSTS",
                "PHOTOGRAPHERS",
                "ENTERTAINERS",
                "FORMAL ATTIRE",
                "COSTUMES",
                "MAKEUP ARTISTS",
              ].map((filter, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterClick(filter, index)}
                  className={activeFilterIndex === index ? "active" : ""}
                >
                  {filter.charAt(0).toUpperCase() +
                    filter.slice(1).toLowerCase()}
                </li>
              ))}
            </ul>
            {selectedFilter && (
              <button onClick={clearFilter} className="clear_filter">
                Clear Filter
              </button>
            )}
          </div>
          <div className="browse_panel">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service.service_name}
                serviceDetails={service}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BrowsePage;
