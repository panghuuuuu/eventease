import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosApi";
import "../stylesheets/eventedit.css";
import SaveEdits from "../assets/SaveEdits.png";

export const Eventedit = () => {
  const [formData, setFormData] = useState({
    event_name: "",
    event_type: "",
    event_start_date: "",
    event_end_date: "",
    budget: "",
    pax: "",
    services: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "event_type") {
      formattedValue = value.toUpperCase();
      console.log(formattedValue);
    } else if (name === "budget" || name === "pax") {
      formattedValue = parseInt(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const submitForm = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token: ", token);
      console.log(formData);
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const response = await axiosInstance.post("event/add-event", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log("Response: ", response);

      navigate("/myevents");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="eventedit_container">
      <div className="eventedit__left_container">
        <p className="eventedit_header">Create your dream event</p>
        <h1 className="eventedit_title">What event are you planning?</h1>
        <p className="eventedit_text">* Required fields</p>
        <p className="eventedit_text">
          <i>Unsure?</i> Responses can be edited later.
        </p>
      </div>
      <div className="eventedit__right_container">
        <div className="eventedit_fields">
          <div className="eventedit__event_details">
            <div className="input">
              <p className="input_label">
                Event Name<span>*</span>
              </p>
              <input
                type="text"
                name="event_name"
                value={formData.event_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input">
              <p className="input_label">
                Event Type<span>*</span>
              </p>
              <select
                className="dropdown"
                id="dropdown"
                name="event_type"
                value={formData.event_type}
                onChange={handleInputChange}
              >
                <option value="">Select Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Prom">Prom</option>
                <option value="Corporate Meeting">Corporate Meeting</option>
                <option value="Party">Party</option>
              </select>
            </div>
          </div>

          <div className="dates_container">
            <p className="input_label">
              When do you want to celebrate?<span>*</span>
            </p>
            <div className="eventedit__event_details">
              <div className="input">
                <input
                  type="date"
                  name="event_start_date"
                  value={formData.event_start_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="to">
                {" "}
                <p>TO</p>{" "}
              </div>
              <div className="input">
                <input
                  type="date"
                  name="event_end_date"
                  value={formData.event_end_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="eventedit__event_details">
            <div className="input">
              <p className="input_label">
                What services are you looking for?<span>*</span>
              </p>
              <div className="services_buttons">
                <div className="service_btn">Venues</div>
                <div className="service_btn">Caterers</div>
                <div className="service_btn">Party Suppliers</div>
                <div className="service_btn">Hosts</div>
                <div className="service_btn">Entertainers</div>
                <div className="service_btn">Photographers</div>
                <div className="service_btn">Formal Attire</div>
                <div className="service_btn">Costumes</div>
                <div className="service_btn">Makeup Artists</div>
              </div>
            </div>
          </div>

          <div className="eventedit__event_details">
            <div className="range_container">
              <div className="input">
                <p className="input_label">
                  How much is your budget?<span>*</span>
                </p>
                <input
                  type="float"
                  name="budget"
                  placeholder="PHP"
                  value={formData.budget}
                  onChange={handleInputChange}
                />
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

          <div className="eventedit__event_details">
            <div className="range_container">
              <div className="input">
                <p className="input_label">
                  How big is your event?<span>*</span>
                </p>
                <input
                  type="float"
                  name="pax"
                  placeholder="PAX"
                  value={formData.pax}
                  onChange={handleInputChange}
                />
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
                  <p>0 PAX</p>
                  <p>250+ PAX</p>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="eventedit__event_details">
            <div className="eventedit_buttons">
              <div className="cancel_btn">Cancel</div>
              <div className="save_btn" onClick={submitForm}>
                <img src={SaveEdits} alt="SaveEdits"></img>
                Save Edits
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventedit;
