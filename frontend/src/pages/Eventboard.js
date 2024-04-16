import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axiosApi.js";

import Navbar from "../components/Navbar.js";
import EventBoardCard from "../components/EventBoardCard.js";

import "../stylesheets/eventboard.css";
import Footer from "../components/Footer.js";

export const Eventboard = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }
        const response = await axios.get(`/event/${eventId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [eventId]);
  if (!event) {
    return <div>Loading...</div>;
  }
  const startDate = new Date(event.event_start_date);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formattedStartDate = startDate.toLocaleDateString("en-US", options);
  const services = event.services;
  return (
    <>
      <section id="eventboard" className="section_container">
        <div className="eventboard__container">
          <Navbar />
          <div className="eventboard_mainframe">
            {/* BACK BUTTON */}
            <Link to="/myevents">
              <div className="eventboard__back">
                <div className="back-button">
                  <svg
                    className="button-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="31"
                    viewBox="0 0 19 31"
                    fill="none"
                  >
                    <path
                      d="M17 29L2 15.5L17 2"
                      stroke="#A460ED"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="button-text"> Your Events </p>
                </div>
              </div>
            </Link>
            {/* EVENT HEADER */}
            <div className="event__header">
              <div className="event__title">
                <h1>{event.event_name}</h1>
                <p>{event.event_type}</p>
              </div>
              <div className="header__buttons">
                <div className="button-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                  >
                    <path
                      d="M19.896 3.25374L20.6842 2.42293C21.0836 2.00227 21.1151 1.42385 20.7158 1.02422L20.4425 0.740277C20.0851 0.382714 19.4861 0.435297 19.0972 0.82441L18.2774 1.62367L19.896 3.25374ZM7.45179 14.4434L9.60639 13.539L19.1287 4.01093L17.5101 2.4019L7.98781 11.9404L7.04189 14.0227C6.93678 14.2646 7.21005 14.538 7.45179 14.4434ZM3.45788 21.5H15.7024C17.7203 21.5 18.908 20.3221 18.908 18.0716V6.96609L16.8059 9.05889V17.8823C16.8059 18.8919 16.2699 19.3967 15.5657 19.3967H3.59451C2.62757 19.3967 2.10206 18.8919 2.10206 17.8823V6.19838C2.10206 5.18879 2.62757 4.68399 3.59451 4.68399H12.5177L14.6093 2.58068H3.45788C1.18766 2.58068 0 3.75853 0 6.00908V18.0716C0 20.3221 1.18766 21.5 3.45788 21.5Z"
                      fill="#474747"
                    />
                  </svg>
                  <p>Edit Event</p>
                </div>

                <div className="button-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                  >
                    <path
                      d="M5.35425 23.5H14.6559C16.2146 23.5 17.2166 22.5531 17.2976 20.9852L17.9757 6.32382H19.0891C19.6053 6.32382 20 5.91656 20 5.40748C20 4.89841 19.5951 4.51151 19.0891 4.51151H14.5951V2.98429C14.5951 1.41633 13.6032 0.5 11.913 0.5H8.0668C6.37652 0.5 5.38462 1.41633 5.38462 2.98429V4.51151H0.910931C0.404858 4.51151 0 4.90859 0 5.40748C0 5.92674 0.404858 6.32382 0.910931 6.32382H2.02429L2.70243 20.9852C2.7834 22.5633 3.7753 23.5 5.35425 23.5ZM7.27733 3.07592C7.27733 2.55666 7.6417 2.22067 8.19838 2.22067H11.7814C12.3381 2.22067 12.7024 2.55666 12.7024 3.07592V4.51151H7.27733V3.07592ZM5.55668 21.6775C5 21.6775 4.59514 21.2601 4.56478 20.6594L3.88664 6.32382H16.083L15.4251 20.6594C15.4049 21.2703 15.0101 21.6775 14.4332 21.6775H5.55668ZM7.01417 20.0383C7.44939 20.0383 7.72267 19.7634 7.71255 19.3561L7.40891 8.70629C7.39879 8.29903 7.11538 8.03431 6.7004 8.03431C6.2753 8.03431 6.00202 8.30921 6.01215 8.71647L6.31579 19.3663C6.32591 19.7736 6.60931 20.0383 7.01417 20.0383ZM10 20.0383C10.4251 20.0383 10.7186 19.7736 10.7186 19.3663V8.71647C10.7186 8.30921 10.4251 8.03431 10 8.03431C9.5749 8.03431 9.2915 8.30921 9.2915 8.71647V19.3663C9.2915 19.7736 9.5749 20.0383 10 20.0383ZM12.9858 20.0485C13.3907 20.0485 13.6741 19.7736 13.6842 19.3663L13.9879 8.71647C13.998 8.30921 13.7247 8.04449 13.2996 8.04449C12.8846 8.04449 12.6012 8.30921 12.5911 8.71647L12.2874 19.3663C12.2773 19.7634 12.5506 20.0485 12.9858 20.0485Z"
                      fill="#474747"
                    />
                  </svg>
                  <p>Delete Event</p>
                </div>
              </div>
            </div>
            {/* EVENT BOARD FRAME */}
            <div className="eventboard__frame">
              {/* EVENT DETAILS */}
              <div className="eventboard__details">
                <h1>EVENT DETAILS</h1>

                <div className="details_frame">
                  <p className="details_head">DATE</p>
                  <p> {formattedStartDate}</p>
                </div>
                <div className="details_frame">
                  <p className="details_head">BUDGET</p>
                  <p>{event.budget}</p>
                </div>
                <div className="details_frame">
                  <p className="details_head">PAX</p>
                  <p>{event.pax} PAX</p>
                </div>
                <div className="details_frame">
                  <p className="details_head">REQUIREMENTS</p>
                  <ul>
                    {services.map((service, index) => (
                      <li key={index}>{service.service_type}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* EVENT PINS */}
              <div className="eventboard__pins">
                <h1 className="pin-name">VENUES</h1>
                <div className="pin_section">
                  {services.filter(
                    (service) => service.service_type === "VENUES"
                  ).length === 0 ? (
                    <p>
                      Aw. You haven’t found any venues yet.{" "}
                      <Link to="/browse">
                        <span className="browse-link">
                          Click here to browse
                        </span>
                        .
                      </Link>
                    </p>
                  ) : (
                    services
                      .filter((service) => service.service_type === "VENUES")
                      .map((service, index) => (
                        <EventBoardCard
                          key={index}
                          service={service.service_name}
                          serviceDetails={service}
                        />
                      ))
                  )}
                </div>
                <h1 className="pin-name">CATERERS</h1>
                <div className="pin_section">
                  {services.filter(
                    (service) => service.service_type === "CATERERS"
                  ).length === 0 ? (
                    <p>
                      Aw. You haven’t found any caterers yet.{" "}
                      <Link to="/browse">
                        <span className="browse-link">
                          Click here to browse
                        </span>
                        .
                      </Link>
                    </p>
                  ) : (
                    services
                      .filter((service) => service.service_type === "CATERERS")
                      .map((service, index) => (
                        <EventBoardCard
                          key={index}
                          service={service.service_name}
                          serviceDetails={service}
                        />
                      ))
                  )}
                </div>

                <h1 className="pin-name">HOSTS</h1>
                <div className="pin_section">
                  {services.filter(
                    (service) => service.service_type === "HOSTS"
                  ).length === 0 ? (
                    <p>
                      Aw. You haven’t found any hosts yet.{" "}
                      <Link to="/browse">
                        <span className="browse-link">
                          Click here to browse
                        </span>
                        .{" "}
                      </Link>
                    </p>
                  ) : (
                    services
                      .filter((service) => service.service_type === "HOSTS")
                      .map((service, index) => (
                        <EventBoardCard
                          key={index}
                          service={service.service_name}
                          serviceDetails={service}
                        />
                      ))
                  )}
                </div>

                <h1 className="pin-name">PHOTOGRAPHERS</h1>
                <div className="pin_section">
                  {services.filter(
                    (service) => service.service_type === "PHOTOGRAPHERS"
                  ).length === 0 ? (
                    <p>
                      Aw. You haven’t found any photographers yet.{" "}
                      <Link to="/browse">
                        <span className="browse-link">
                          Click here to browse
                        </span>
                        .{" "}
                      </Link>
                    </p>
                  ) : (
                    services
                      .filter(
                        (service) => service.service_type === "PHOTOGRAPHERS"
                      )
                      .map((service, index) => (
                        <EventBoardCard
                          key={index}
                          service={service.service_name}
                          serviceDetails={service}
                        />
                      ))
                  )}
                </div>

                <h1 className="pin-name">ENTERTAINERS</h1>
                <div className="pin_section">
                  {services.filter(
                    (service) => service.service_type === "ENTERTAINERS"
                  ).length === 0 ? (
                    <p>
                      Aw. You haven’t found any entertainers yet.{" "}
                      <Link to="/browse">
                        <span className="browse-link">
                          Click here to browse
                        </span>
                        .
                      </Link>
                    </p>
                  ) : (
                    services
                      .filter(
                        (service) => service.service_type === "ENTERTAINERS"
                      )
                      .map((service, index) => (
                        <EventBoardCard
                          key={index}
                          service={service.service_name}
                          serviceDetails={service}
                        />
                      ))
                  )}
                </div>

                <h1 className="pin-name">GOWNS OR SUITS</h1>
                <div className="pin_section">
                  {services.filter(
                    (service) => service.service_type === "FORMAL ATTIRE"
                  ).length === 0 ? (
                    <p>
                      Aw. You haven’t found any formal attire yet.{" "}
                      <Link to="/browse">
                        <span className="browse-link">
                          Click here to browse
                        </span>
                        .{" "}
                      </Link>
                    </p>
                  ) : (
                    services
                      .filter(
                        (service) => service.service_type === "FORMAL ATTIRE"
                      )
                      .map((service, index) => (
                        <EventBoardCard
                          key={index}
                          service={service.service_name}
                          serviceDetails={service}
                        />
                      ))
                  )}
                </div>
              </div>

              {/* EVENT BUDGET */}
              <div className="eventboard__budget">
                <h1>BUDGET</h1>
                <p className="budget_interact">
                  Interact with the check boxes to see your total cost.
                </p>
                <p className="budget_php">PHP</p>
                <div className="budget_receipt">
                  <h2>Venue</h2>
                  <div className="receipt_frame">
                    <p>Midlands Verdana</p>
                    <p>160,000</p>
                  </div>

                  <h2>Caterer</h2>
                  <div className="receipt_frame">
                    <p>Hizon's Catering</p>
                    <p>110,000</p>
                  </div>

                  <div className="receipt_frame">
                    <p>Total</p>
                    <p>270,000</p>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Eventboard;
