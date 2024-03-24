import React from "react";
import "../stylesheets/card.css";

function EventCard(props) {
  const { event, eventDetails } = props;

  return (
    <div className="myeventcard">
      <div key={event}>
        <div className="myevent_details">
          <h3>{event}</h3>
          <p> {eventDetails.event_type}
          </p>
          <p>
              Services: {eventDetails.services}
          </p>
          <p>
              {eventDetails.event_start_date} to {eventDetails.event_end_date}
          </p>
          // when arrow is clicked, should be led to eventboard page, aka what ross is doing
          <h4>
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
          </h4>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
