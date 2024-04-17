import React, { useState, useEffect } from "react";
import axios from "../axiosApi.js";
import { useNavigate } from "react-router-dom";

import "../stylesheets/modal.css";

function Modal({ closeModal, service, serviceId }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const { service_name, service_rating, service_address, service_packages } =
    service;
  const navigate = useNavigate();

  console.log(events);
  console.log(selectedEvent);
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
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }
      const selectedEventObj = events.find(
        (event) => event.event_name === selectedEvent
      );
      if (!selectedEventObj) {
        console.error("Selected event not found");
        return;
      }
      const selectedPackageObj = service_packages.find(
        (pkg) => pkg.package_name === selectedPackage
      );

      console.log(selectedPackageObj);

      const response = await axios.post(
        `/event/${selectedEventObj.id}/add-service/`,
        {
          package_number: selectedPackageObj.package_id,
          service_number: serviceId,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate(`/eventboard/${selectedEventObj.id}`);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="overlay_container">
      <div className="modal_container">
        <div className="input">
          <p className="input_label">What event is this for?</p>
          <select
            className="dropdown"
            id="dropdown"
            name="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Select an event</option>
            {events.map((event, index) => (
              <option key={index} value={event.event_name}>
                {event.event_name}
              </option>
            ))}
          </select>
        </div>
        <div className="input">
          <p className="input_label">Which package are you interested in?</p>
          <select
            className="dropdown"
            id="dropdown"
            name="event"
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
          >
            <option value="">Select a package</option>

            {service_packages.map((packageItem, index) => (
              <option key={index} value={packageItem.package_name}>
                {packageItem.package_name}
              </option>
            ))}
          </select>
        </div>
        <div className="eventedit_buttons">
          <div className="cancel_btn" onClick={closeModal}>
            Cancel
          </div>
          <div className="save_btn" onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="25"
              viewBox="0 0 15 25"
              fill="none"
            >
              <path
                d="M1.40457 24.34C1.98356 24.34 2.35883 24.0339 3.27019 23.1264L7.40886 18.9496C7.45175 18.8949 7.54825 18.8949 7.59114 18.9496L11.7405 23.1264C12.6519 24.0339 13.0164 24.34 13.6061 24.34C14.4639 24.34 15 23.7387 15 22.7546V3.66394C15 1.48809 13.8849 0.340027 11.7727 0.340027H3.22731C1.11508 0.340027 0 1.48809 0 3.66394V22.7546C0 23.7387 0.536097 24.34 1.40457 24.34Z"
                fill="white"
              />
            </svg>
            Pin
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
