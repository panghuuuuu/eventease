import axios from "../axiosApi.js";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import Navbar from "../components/Navbar.js";
import Modal from "../components/PinModal.js";
import ReportModal from "../components/ReportModal.js"; // for_report
import "../stylesheets/serviceprovider.css";

const ServiceProvider = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState();
  const [reviews, setReviews] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleReload = () => {
    window.location.reload();
  };
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // for_report

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // FOR HANDLING SUBMITTING THE REVIEW FORM
  const [reviewData, setReviewData] = useState({
    review_rating: "",
    review_body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleReviewSubmit = (e) => {
    const token = localStorage.getItem("token");
    console.log("The submit botton was clicked!");
    console.log("Trying to submit: ", reviewData);
    // e.preventDefault();
    try {
      const response = axios.post(
        `/service/${serviceId}/add-review`,
        reviewData
      );
      handleReload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  // END REVIEW FORM METHODS

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const openReportModal = () => {
    // for_report
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    // for_report
    setIsReportModalOpen(false);
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`/service/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.log("Error fetching service data: ", error);
      }
    };
    fetchServiceData();

    const fetchReviewData = async () => {
      try {
        const response = await axios.get(`/service/${serviceId}/get-reviews`);
        setReviews(response.data);
      } catch (error) {
        console.log("Error fetching service review data: " + error);
      }
    };
    fetchReviewData();
  }, [serviceId]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <section id="service_provider" className="section_container">
      <Navbar />
      <div className="sp_container">
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            service={service}
            serviceId={serviceId}
          />
        )}

        {isReportModalOpen && ( // Render the report modal conditionally
          <ReportModal
            closeReportModal={closeReportModal}
            serviceId={serviceId}
          />
        )}

        <div className="section_header">
          <img className=""></img>
        </div>
        <Link to={`/browse`}>
          <div className="back-button">
            {" "}
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
            <p className="button-text">Browse</p>
          </div>
        </Link>
        <h1 className="service_name">{service.service_name}</h1>
        <div className="section_content">
          <div className="left_panel">
            <p className="service_rating">
              {" "}
              <StarRating rating={service.service_rating} />
              {service.service_rating}
            </p>
            <p className="service_location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M1.19531 17.9595C1.48535 17.9595 1.74902 17.8628 2.10059 17.6606L6.37207 15.3579L11.0303 17.9683C11.3994 18.1704 11.7861 18.2671 12.1641 18.2671C12.5332 18.2671 12.8936 18.1792 13.2188 17.9858L17.5869 15.5249C18.1934 15.1821 18.457 14.6987 18.457 14.0308V2.22705C18.457 1.47998 18.0088 1.03174 17.2705 1.03174C16.9805 1.03174 16.7168 1.146 16.3564 1.33936L11.9268 3.80029L7.32129 1.02295C6.9873 0.82959 6.62695 0.73291 6.25781 0.73291C5.89746 0.73291 5.53711 0.820801 5.2207 1.00537L0.878906 3.4751C0.272461 3.81787 0 4.28369 0 4.95166V16.7729C0 17.52 0.448242 17.9595 1.19531 17.9595ZM5.58105 13.7847L1.96875 15.771C1.90723 15.7974 1.85449 15.8237 1.81055 15.8237C1.70508 15.8237 1.65234 15.7446 1.65234 15.6216V5.40869C1.65234 5.1626 1.74023 5.00439 1.96875 4.87256L5.29102 2.94775C5.3877 2.88623 5.47559 2.84229 5.58105 2.78955V13.7847ZM7.25098 13.8286V3.00049C7.33887 3.04443 7.43555 3.09717 7.52344 3.1499L11.2061 5.37354V16.0435C11.0918 15.9819 10.9775 15.9204 10.8545 15.8501L7.25098 13.8286ZM12.8848 16.1665V5.20654L16.4971 3.23779C16.541 3.21143 16.5938 3.19385 16.6377 3.19385C16.7432 3.19385 16.8135 3.27295 16.8135 3.38721V13.5474C16.8135 13.8022 16.7256 13.9604 16.4883 14.0923L13.2891 15.9468C13.1572 16.0259 13.0166 16.105 12.8848 16.1665Z"
                  fill="#474747"
                />
              </svg>
              {service.service_address}
            </p>
            <div className="packages">
              <div className="section_tag">
                <p>Packages</p>
              </div>
              <ul className="package_items">
                {service.service_packages.map((packageItem, index) => (
                  <div className="service_package" key={index}>
                    <p className="package_name">{packageItem.package_name}</p>
                    <div className="package_price">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 19 19"
                        fill="none"
                      >
                        <path
                          d="M9.08789 18.5879C14.0713 18.5879 18.1846 14.4746 18.1846 9.5C18.1846 4.52539 14.0625 0.412109 9.0791 0.412109C4.10449 0.412109 0 4.52539 0 9.5C0 14.4746 4.11328 18.5879 9.08789 18.5879ZM9.08789 16.7773C5.05371 16.7773 1.82812 13.5342 1.82812 9.5C1.82812 5.46582 5.05371 2.23145 9.0791 2.23145C13.1133 2.23145 16.3564 5.46582 16.3652 9.5C16.374 13.5342 13.1221 16.7773 9.08789 16.7773ZM5.84473 9.06055C5.84473 9.29785 6.01172 9.47363 6.25781 9.47363H6.75V13.1211C6.75 13.5518 7.04883 13.8154 7.44434 13.8154C7.83105 13.8154 8.1123 13.5518 8.1123 13.1211V11.1963H9.52734C10.7666 11.1963 11.6982 10.5195 12.0762 9.47363H12.6299C12.876 9.47363 13.0342 9.29785 13.0342 9.06055C13.0342 8.81445 12.876 8.64746 12.6299 8.64746H12.2432C12.2607 8.56836 12.2607 8.48047 12.2607 8.39258C12.2607 8.30469 12.2607 8.22559 12.252 8.12891H12.6299C12.876 8.12891 13.0342 7.94434 13.0342 7.71582C13.0342 7.46094 12.876 7.29395 12.6299 7.29395H12.0674C11.6982 6.27441 10.7842 5.59766 9.5625 5.59766H7.44434C7.01367 5.59766 6.75 5.86133 6.75 6.30078V7.29395H6.25781C6.01172 7.29395 5.84473 7.46094 5.84473 7.71582C5.84473 7.94434 6.01172 8.12891 6.25781 8.12891H6.75V8.64746H6.25781C6.01172 8.64746 5.84473 8.81445 5.84473 9.06055ZM8.12109 7.29395V6.75781H9.30762C9.87012 6.75781 10.3008 6.95117 10.5732 7.29395H8.12109ZM8.12109 8.64746V8.12891H10.8984C10.9072 8.20801 10.916 8.28711 10.916 8.39258C10.916 8.48047 10.9072 8.56836 10.8984 8.64746H8.12109ZM8.12109 10.0361V9.47363H10.582C10.3184 9.83398 9.87012 10.0361 9.30762 10.0361H8.12109Z"
                          fill="#474747"
                        />
                      </svg>
                      PHP {packageItem.package_price}
                    </div>
                  </div>
                ))}
              </ul>{" "}
            </div>
            <hr class="divider" />
            <div className="reviews_header_container">
              <h2 className="reviews_header">Reviews ({reviews.length})</h2>
              <button className="write-review" onClick={scrollToBottom}>
                <svg
                  width="24"
                  height="auto"
                  viewBox="0 0 34 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.8022 3.48992L33.6651 2.59269C34.0966 2.13286 34.1187 1.5048 33.6873 1.0674L33.3996 0.764587C33.0124 0.372048 32.3707 0.428125 31.9503 0.85431L31.0764 1.72911L32.8022 3.48992ZM20.1792 14.9296L22.5135 13.909L31.9946 4.30865L30.2577 2.57026L20.7876 12.1706L19.7366 14.4698C19.626 14.739 19.9247 15.0418 20.1792 14.9296ZM3.25256 22.5H26.3413C28.4323 22.5 29.5939 21.3448 29.5939 19.2363V9.62474L27.3591 11.8902V19.0344C27.3591 19.9092 26.8724 20.4027 25.9984 20.4027H3.58446C2.72153 20.4027 2.23475 19.9092 2.23475 19.0344V9.69203C2.23475 8.80602 2.72153 8.32376 3.58446 8.32376H21.7169L23.7747 6.23769H3.25256C1.16163 6.23769 0 7.38166 0 9.49016V19.2363C0 21.3448 1.16163 22.5 3.25256 22.5ZM6.32811 16.0399C7.23529 16.0399 7.96546 15.2885 7.96546 14.3688C7.96546 13.438 7.23529 12.6978 6.32811 12.6978C5.40987 12.6978 4.66864 13.438 4.66864 14.3688C4.66864 15.2885 5.40987 16.0399 6.32811 16.0399ZM11.218 16.0399C12.1252 16.0399 12.8664 15.2885 12.8664 14.3688C12.8664 13.438 12.1252 12.6978 11.218 12.6978C10.2998 12.6978 9.56961 13.438 9.56961 14.3688C9.56961 15.2885 10.2998 16.0399 11.218 16.0399ZM16.1079 16.0399C17.0151 16.0399 17.7563 15.2885 17.7563 14.3688C17.7563 13.438 17.0151 12.6978 16.1079 12.6978C15.2008 12.6978 14.4595 13.438 14.4595 14.3688C14.4595 15.2885 15.2008 16.0399 16.1079 16.0399Z"
                    fill="white"
                  />
                </svg>
                Write a Review
              </button>
            </div>
            <div className="review_list_container">
              {/* TO-DO! Style this and note that a User is not yet connected to the Review */}
              {reviews.map((reviewItem, index) => (
                <div className="review">
                  <div className="review_left">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_68_174)">
                        <rect
                          width="50"
                          height="50"
                          fill="url(#paint0_linear_68_174)"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M29.6804 26.0936C32.4865 24.4736 34.375 21.4417 34.375 17.9688C34.375 12.7911 30.1777 8.59375 25 8.59375C19.8223 8.59375 15.625 12.7911 15.625 17.9688C15.625 21.4417 17.5135 24.4736 20.3196 26.0936C14.9882 30.0812 11.7188 36.4074 11.7188 43.2692V49.9998H38.2812V43.2692C38.2812 36.4074 35.0118 30.0812 29.6804 26.0936Z"
                          fill="white"
                        />
                      </g>
                      <rect
                        x="0.5"
                        y="0.5"
                        width="49"
                        height="49"
                        rx="24.5"
                        stroke="#1E1E1E"
                        stroke-opacity="0.3"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_68_174"
                          x1="6.25"
                          y1="-8.98438"
                          x2="39.4531"
                          y2="56.6406"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.0354981" stop-color="#9FC9F3" />
                          <stop offset="1" stop-color="#A460ED" />
                        </linearGradient>
                        <clipPath id="clip0_68_174">
                          <rect width="50" height="50" rx="25" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="review_right">
                    <div className="name_date_container">
                      <p className="username">Some User</p>
                      <p className="datetime">{reviewItem.review_datetime}</p>
                    </div>
                    <div className="rating">
                      <StarRating rating={reviewItem.review_rating} />
                      {reviewItem.review_rating}
                    </div>
                    {reviewItem.review_body}
                  </div>
                </div>
              ))}
            </div>
            <hr class="divider" />
            <div className="add_review">
              <form className="review_form" onSubmit={handleReviewSubmit}>
                <h3 className="review_form_header">Write a Review</h3>
                <div className="review_field">
                  <label for="review_rating">Overall Rating:</label>
                  <input
                    type="number"
                    onChange={handleChange}
                    id="review_rating"
                    name="review_rating"
                    step="0.1"
                    min="0"
                    max="5"
                    required
                  />
                </div>
                <div className="review_field">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="review_body"
                    name="review_body"
                    maxLength="10000"
                    required
                  />
                </div>
                <button className="submit_review_button" type="submit">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
          <div className="right_panel">
            <p>Do you like this?</p>
            <div className="pin_button" onClick={openModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
              >
                <path
                  d="M1.90457 24C2.48356 24 2.85883 23.6939 3.77019 22.7863L7.90886 18.6096C7.95175 18.5549 8.04825 18.5549 8.09114 18.6096L12.2405 22.7863C13.1519 23.6939 13.5164 24 14.1061 24C14.9639 24 15.5 23.3986 15.5 22.4146V3.32392C15.5 1.14806 14.3849 0 12.2727 0H3.72731C1.61508 0 0.5 1.14806 0.5 3.32392V22.4146C0.5 23.3986 1.0361 24 1.90457 24Z"
                  fill="#A460ED"
                />
              </svg>
              Pin to Your Event Board{" "}
            </div>

            <p>Report this service?</p>
            <div className="report_button" onClick={openReportModal}>
              Report!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProvider;
