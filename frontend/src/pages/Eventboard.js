import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axiosApi.js";

import Navbar from "../components/Navbar.js";
import EventBoardCard from "../components/EventBoardCard.js";

import "../stylesheets/eventboard.css";

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
              {services.filter((service) => service.service_type === "VENUES")
                .length === 0 ? (
                <p>
                  Aw. You haven’t found any venues yet.{" "}
                  <Link to="/browse">
                    <span className="browse-link">Click here to browse</span>.
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
              {services.filter((service) => service.service_type === "CATERERS")
                .length === 0 ? (
                <p>
                  Aw. You haven’t found any caterers yet.{" "}
                  <Link to="/browse">
                    <span className="browse-link">Click here to browse</span>.
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
              {services.filter((service) => service.service_type === "HOSTS")
                .length === 0 ? (
                <p>
                  Aw. You haven’t found any hosts yet.{" "}
                  <Link to="/browse">
                    <span className="browse-link">Click here to browse</span>.{" "}
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
                    <span className="browse-link">Click here to browse</span>.{" "}
                  </Link>
                </p>
              ) : (
                services
                  .filter((service) => service.service_type === "PHOTOGRAPHERS")
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
                    <span className="browse-link">Click here to browse</span>.
                  </Link>
                </p>
              ) : (
                services
                  .filter((service) => service.service_type === "ENTERTAINERS")
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
                    <span className="browse-link">Click here to browse</span>.{" "}
                  </Link>
                </p>
              ) : (
                services
                  .filter((service) => service.service_type === "FORMAL ATTIRE")
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
        {/* EVENTBOARD FRAME */}
      </div>{" "}
      {/* MAIN FRAME */}
      <div className="FOOTER">
        <div className="footer__left">
          <div className="footer__logo">
            <svg
              className="footer-logo"
              xmlns="http://www.w3.org/2000/svg"
              width="164"
              height="41"
              viewBox="0 0 164 41"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8064 3.72202C20.9912 2.90816 24.7641 3.50164 26.9929 6.83837C28.9176 9.71999 28.834 13.3541 27.5693 16.4459C26.2811 19.5954 23.679 22.5015 19.9716 24.3549C17.1419 25.7695 13.5809 25.8737 10.3215 24.7954C10.0339 26.8417 10.5237 27.5676 10.9059 28.1926C11.9738 29.9385 13.5345 30.7591 15.5469 30.8731C17.6883 30.9943 20.4643 30.7408 23.1826 29.1975C28.7237 26.0516 31.5648 21.337 33.5919 15.6042L41.1524 19.768C38.5774 27.3285 33.4523 32.9166 26.6889 36.2586C22.6464 38.2561 18.3499 38.3374 14.6459 38.1277C10.8129 37.9106 6.5824 34.7309 5.10318 31.5533C3.93775 29.0498 3.67028 24.6699 4.42176 21.0845C4.42416 21.0731 4.42657 21.0616 4.429 21.0501C2.29808 18.7841 1.11444 15.4338 0.775081 11.4953L4.2266 10.1804C4.77446 12.7006 5.59625 14.5633 6.5824 15.1112C7.18505 13.4676 8.32519 11.3636 9.15735 10.1804C11.5131 6.50977 14.6582 4.52649 17.8064 3.72202ZM11.8291 18.584C13.8501 19.4041 15.9017 19.2845 17.1298 18.6705C19.5281 17.4716 21.0099 15.6956 21.6872 14.0399C22.3881 12.3264 22.1515 11.032 21.7082 10.3683C21.4228 9.94107 20.8267 9.50959 19.3798 9.87934C17.8961 10.2585 16.0553 11.4478 14.6459 13.4518C13.4792 15.1106 12.5351 16.8628 11.8291 18.584Z"
                fill="white"
              />
              <path
                d="M158.32 29.0207C157.047 29.0207 155.951 28.7629 155.033 28.2473C154.12 27.7263 153.416 26.9904 152.922 26.0397C152.428 25.0837 152.181 23.953 152.181 22.6478C152.181 21.3749 152.428 20.2577 152.922 19.2962C153.416 18.3348 154.112 17.5855 155.009 17.0484C155.911 16.5113 156.969 16.2427 158.183 16.2427C158.999 16.2427 159.759 16.3743 160.463 16.6375C161.172 16.8953 161.79 17.2847 162.316 17.8057C162.848 18.3267 163.261 18.982 163.557 19.7716C163.852 20.5558 164 21.4742 164 22.527V23.4696H153.55V21.3426H160.769C160.769 20.8485 160.662 20.4108 160.447 20.0294C160.232 19.648 159.934 19.3499 159.553 19.1351C159.177 18.9149 158.739 18.8048 158.239 18.8048C157.718 18.8048 157.256 18.9256 156.854 19.1673C156.456 19.4037 156.145 19.7232 155.919 20.1261C155.693 20.5235 155.578 20.9667 155.573 21.4554V23.4777C155.573 24.09 155.685 24.619 155.911 25.0649C156.142 25.5107 156.467 25.8544 156.886 26.0961C157.305 26.3378 157.802 26.4587 158.376 26.4587C158.758 26.4587 159.107 26.405 159.424 26.2975C159.741 26.1901 160.012 26.029 160.237 25.8141C160.463 25.5993 160.635 25.3361 160.753 25.0246L163.927 25.234C163.766 25.9967 163.436 26.6628 162.936 27.2321C162.442 27.7961 161.803 28.2365 161.019 28.5534C160.24 28.8649 159.34 29.0207 158.32 29.0207Z"
                fill="white"
              />
              <path
                d="M150.237 19.9327L147.095 20.1261C147.041 19.8575 146.926 19.6158 146.748 19.401C146.571 19.1808 146.337 19.0062 146.047 18.8773C145.763 18.743 145.422 18.6759 145.024 18.6759C144.492 18.6759 144.044 18.7887 143.679 19.0143C143.314 19.2345 143.131 19.5299 143.131 19.9005C143.131 20.1959 143.249 20.4457 143.485 20.6498C143.722 20.8539 144.127 21.0177 144.702 21.1412L146.942 21.5924C148.145 21.8395 149.042 22.2369 149.633 22.7848C150.224 23.3327 150.519 24.0524 150.519 24.944C150.519 25.755 150.28 26.4667 149.802 27.079C149.329 27.6913 148.679 28.1694 147.852 28.5131C147.03 28.8515 146.082 29.0207 145.008 29.0207C143.37 29.0207 142.065 28.6796 141.093 27.9975C140.126 27.31 139.559 26.3754 139.393 25.1938L142.768 25.0165C142.87 25.516 143.117 25.8974 143.51 26.1606C143.902 26.4184 144.404 26.5473 145.016 26.5473C145.618 26.5473 146.101 26.4318 146.466 26.2009C146.837 25.9645 147.025 25.6611 147.03 25.2904C147.025 24.9789 146.893 24.7238 146.636 24.5251C146.378 24.321 145.98 24.1652 145.443 24.0578L143.3 23.6308C142.092 23.3891 141.192 22.9701 140.601 22.3739C140.016 21.7777 139.723 21.0177 139.723 20.0939C139.723 19.2989 139.938 18.6141 140.367 18.0394C140.803 17.4647 141.412 17.0216 142.196 16.71C142.986 16.3985 143.91 16.2427 144.968 16.2427C146.531 16.2427 147.761 16.5731 148.658 17.2337C149.56 17.8944 150.087 18.794 150.237 19.9327Z"
                fill="white"
              />
              <path
                d="M130.309 29.0127C129.519 29.0127 128.815 28.8757 128.198 28.6018C127.58 28.3225 127.091 27.9116 126.731 27.3691C126.377 26.8212 126.2 26.1391 126.2 25.3227C126.2 24.6352 126.326 24.0578 126.578 23.5905C126.831 23.1232 127.175 22.7472 127.61 22.4625C128.045 22.1779 128.539 21.963 129.092 21.818C129.651 21.673 130.236 21.5709 130.848 21.5118C131.568 21.4366 132.148 21.3668 132.589 21.3024C133.029 21.2325 133.349 21.1305 133.547 20.9962C133.746 20.8619 133.846 20.6632 133.846 20.4V20.3517C133.846 19.8414 133.684 19.4466 133.362 19.1673C133.045 18.888 132.594 18.7484 132.009 18.7484C131.391 18.7484 130.899 18.8853 130.534 19.1593C130.169 19.4278 129.927 19.7662 129.809 20.1744L126.635 19.9166C126.796 19.1646 127.113 18.5147 127.585 17.9669C128.058 17.4136 128.668 16.9893 129.414 16.6939C130.166 16.3931 131.036 16.2427 132.025 16.2427C132.712 16.2427 133.37 16.3233 133.999 16.4844C134.632 16.6456 135.194 16.8953 135.682 17.2337C136.177 17.5721 136.566 18.0072 136.851 18.5389C137.135 19.0653 137.278 19.6964 137.278 20.4322V28.779H134.023V27.0629H133.926C133.727 27.4496 133.462 27.7907 133.128 28.0861C132.795 28.3762 132.395 28.6044 131.928 28.7709C131.461 28.9321 130.921 29.0127 130.309 29.0127ZM131.292 26.644C131.796 26.644 132.242 26.5446 132.629 26.3459C133.016 26.1418 133.319 25.8678 133.539 25.5241C133.76 25.1803 133.87 24.7909 133.87 24.3559V23.0426C133.762 23.1124 133.615 23.1769 133.427 23.236C133.244 23.2897 133.037 23.3407 132.806 23.3891C132.575 23.432 132.344 23.4723 132.113 23.5099C131.882 23.5421 131.673 23.5717 131.485 23.5985C131.082 23.6576 130.73 23.7516 130.429 23.8805C130.129 24.0094 129.895 24.184 129.729 24.4042C129.562 24.619 129.479 24.8876 129.479 25.2099C129.479 25.6772 129.648 26.0343 129.986 26.2814C130.33 26.5231 130.765 26.644 131.292 26.644Z"
                fill="white"
              />
              <path
                d="M112.953 28.779V12.2788H124.071V15.1551H116.441V19.0867H123.499V21.963H116.441V25.9027H124.103V28.779H112.953Z"
                fill="white"
              />
              <path
                d="M110.387 16.4038V18.982H102.934V16.4038H110.387ZM104.626 13.439H108.058V24.9762C108.058 25.2931 108.107 25.5402 108.203 25.7174C108.3 25.8893 108.434 26.0101 108.606 26.08C108.783 26.1498 108.987 26.1847 109.218 26.1847C109.379 26.1847 109.541 26.1713 109.702 26.1444C109.863 26.1122 109.986 26.088 110.072 26.0719L110.612 28.6259C110.44 28.6796 110.199 28.7414 109.887 28.8112C109.576 28.8864 109.197 28.9321 108.751 28.9482C107.924 28.9804 107.199 28.8703 106.576 28.6178C105.958 28.3654 105.477 27.9733 105.134 27.4416C104.79 26.9098 104.621 26.2384 104.626 25.4274V13.439Z"
                fill="white"
              />
              <path
                d="M93.1231 21.6246V28.779H89.6909V16.4039H92.962V18.5872H93.107C93.3809 17.8675 93.8401 17.2982 94.4847 16.8792C95.1292 16.4549 95.9107 16.2427 96.8292 16.2427C97.6886 16.2427 98.4378 16.4307 99.077 16.8067C99.7162 17.1827 100.213 17.7198 100.568 18.4181C100.922 19.1109 101.099 19.9381 101.099 20.8995V28.779H97.6671V21.5118C97.6725 20.7545 97.4791 20.1637 97.087 19.7394C96.6949 19.3097 96.1551 19.0948 95.4676 19.0948C95.0057 19.0948 94.5975 19.1942 94.243 19.3929C93.8938 19.5916 93.6199 19.8817 93.4212 20.263C93.2278 20.639 93.1285 21.0929 93.1231 21.6246Z"
                fill="white"
              />
              <path
                d="M81.7711 29.0207C80.4981 29.0207 79.4024 28.7629 78.4839 28.2473C77.5708 27.7263 76.8672 26.9904 76.3731 26.0397C75.8789 25.0837 75.6318 23.953 75.6318 22.6478C75.6318 21.3749 75.8789 20.2577 76.3731 19.2962C76.8672 18.3348 77.5628 17.5855 78.4598 17.0484C79.3621 16.5113 80.4202 16.2427 81.6341 16.2427C82.4505 16.2427 83.2105 16.3743 83.9142 16.6375C84.6231 16.8953 85.2408 17.2847 85.7672 17.8057C86.2989 18.3267 86.7125 18.982 87.0079 19.7716C87.3033 20.5558 87.4511 21.4742 87.4511 22.527V23.4696H77.0015V21.3426H84.2203C84.2203 20.8485 84.1129 20.4108 83.898 20.0294C83.6832 19.648 83.3851 19.3499 83.0037 19.1351C82.6278 18.9149 82.19 18.8048 81.6905 18.8048C81.1695 18.8048 80.7076 18.9256 80.3047 19.1673C79.9073 19.4037 79.5957 19.7232 79.3702 20.1261C79.1446 20.5235 79.0291 20.9667 79.0237 21.4554V23.4777C79.0237 24.09 79.1365 24.619 79.3621 25.0649C79.5931 25.5107 79.918 25.8544 80.337 26.0961C80.7559 26.3378 81.2527 26.4587 81.8275 26.4587C82.2088 26.4587 82.5579 26.405 82.8748 26.2975C83.1917 26.1901 83.463 26.029 83.6886 25.8141C83.9142 25.5993 84.086 25.3361 84.2042 25.0246L87.3785 25.234C87.2174 25.9967 86.8871 26.6628 86.3876 27.2321C85.8934 27.7961 85.2543 28.2365 84.4701 28.5534C83.6912 28.8649 82.7916 29.0207 81.7711 29.0207Z"
                fill="white"
              />
              <path
                d="M74.7736 16.4039L70.4471 28.779H66.5799L62.2534 16.4039H65.8789L68.449 25.2582H68.578L71.14 16.4039H74.7736Z"
                fill="white"
              />
              <path
                d="M49.4092 28.7789V12.2787H60.5275V15.155H52.8977V19.0867H59.9554V21.9629H52.8977V25.9027H60.5597V28.7789H49.4092Z"
                fill="white"
              />
            </svg>
          </div>
          <svg
            className="separator"
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="85"
            viewBox="0 0 2 85"
            fill="none"
          >
            <path d="M1 0.809814V84.1951" stroke="white" />
          </svg>
          <button className="footer__about-us">
            <p>About Us</p>
            <svg
              className="about-us__logo"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M17 12.6342L16.9887 1.33092C16.9887 0.542839 16.4712 0.00244141 15.6612 0.00244141H4.35407C3.58901 0.00244141 3.06023 0.576614 3.06023 1.25211C3.06023 1.91635 3.63402 2.468 4.32032 2.468H8.35936L13.1297 2.31039L11.0821 4.11171L0.40503 14.8071C0.146261 15.0773 0 15.3925 0 15.7077C0 16.372 0.607545 17.0024 1.29385 17.0024C1.60887 17.0024 1.92389 16.8673 2.19391 16.6084L12.8822 5.91304L14.7048 3.86403L14.5136 8.43489V12.668C14.5136 13.366 15.0649 13.9514 15.7512 13.9514C16.4262 13.9514 17 13.3773 17 12.6342Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        <div className="footer__right">
          <div className="socmed-logos">
            <svg
              lcxmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M28 14.3594C28 6.8762 21.732 0.809814 14 0.809814C6.26802 0.809814 0 6.8762 0 14.3594C0 20.7139 4.52004 26.0458 10.6179 27.51V18.5H7.73102V14.3594H10.6179V12.5753C10.6179 7.96342 12.7744 5.82583 17.4526 5.82583C18.3396 5.82583 19.87 5.99412 20.4961 6.16246V9.91592C20.1656 9.88226 19.5917 9.86541 18.8787 9.86541C16.5831 9.86541 15.6961 10.707 15.6961 12.8951V14.3594H20.269L19.4834 18.5H15.6961V27.8098C22.6281 26.9995 28 21.287 28 14.3594Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M28 14.3594C28 6.8762 21.732 0.809814 14 0.809814C6.26802 0.809814 0 6.8762 0 14.3594C0 20.7139 4.52004 26.0458 10.6179 27.51V18.5H7.73102V14.3594H10.6179V12.5753C10.6179 7.96342 12.7744 5.82583 17.4526 5.82583C18.3396 5.82583 19.87 5.99412 20.4961 6.16246V9.91592C20.1656 9.88226 19.5917 9.86541 18.8787 9.86541C16.5831 9.86541 15.6961 10.707 15.6961 12.8951V14.3594H20.269L19.4834 18.5H15.6961V27.8098C22.6281 26.9995 28 21.287 28 14.3594Z"
                fill="white"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.6926 28.1951C21.2549 28.1951 27.3853 22.0647 27.3853 14.5024C27.3853 6.94021 21.2549 0.809814 13.6926 0.809814C6.1304 0.809814 0 6.94021 0 14.5024C0 22.0647 6.1304 28.1951 13.6926 28.1951ZM20.6831 7.44866H18.2663L14.2364 11.9568L10.7951 7.44866H5.80902L11.746 15.1532L6.12426 21.5562H8.5411L12.9019 16.6212L16.7111 21.5562H21.5763L15.3766 13.4353L20.6831 7.44866ZM18.7601 20.1507H17.4204L8.65144 8.80215H10.091L18.7601 20.1507Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="madeby">
            <p>Made by Jongks Baddies</p>
            <p>2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventboard;
