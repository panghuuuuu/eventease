import React from "react";
import { Link } from "react-router-dom";

import "../stylesheets/eventcard.css";

function EventCard(props) {
  const { event, eventDetails } = props;
  const eventId = eventDetails.id;
  console.log(eventId);
  const startDate = new Date(eventDetails.event_start_date);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formattedStartDate = startDate.toLocaleDateString("en-US", options);
  return (
    <div className="event_card">
      <div key={event}></div>
      <h3>{event}</h3>
      <p className="event_type">{eventDetails.event_type}</p>
      <p>{formattedStartDate}</p>
      <ul>
        {eventDetails.services.map((service, index) => (
          <li key={index}>{service.service_type}</li>
        ))}
      </ul>
      <Link to={`/eventboard/${eventId}`}>
        {" "}
        <div className="more_details_btn">
          <p>More Details</p>
          <div>
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
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
