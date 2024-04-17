import React from "react";
import { Link } from "react-router-dom";

import "../stylesheets/eventcard.css";

function EventCard(props) {
  const { event, eventDetails } = props;
  const eventId = eventDetails.id;
  console.log(eventDetails);
  const startDate = new Date(eventDetails.event_start_date);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formattedStartDate = startDate.toLocaleDateString("en-US", options);
  const services = eventDetails.services.map((item) => item.service);
  const uniqueServiceTypes = Array.from(
    new Set(services.map((item) => item.service_type))
  );

  return (
    <div className="event_card">
      <div key={event}></div>
      <h3>{event}</h3>
      <p className="event_type">{eventDetails.event_type}</p>
      <p className="event_date">{formattedStartDate}</p>
      <ul>
        {uniqueServiceTypes.map((service_type, index) => (
          <li key={index}>{service_type}</li>
        ))}
      </ul>
      <Link to={`/eventboard/${eventId}`}>
        {" "}
        <button className="more_btn">
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
        </button>
      </Link>
    </div>
  );
}

export default EventCard;
