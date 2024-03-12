import React, { useEffect } from "react";
import "../stylesheets/eventedit.css";
import SaveEdits from "../assets/SaveEdits.png";
export const Eventedit = () => {
  useEffect(() => {
    document.querySelectorAll(".service_btn").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add("clicked");
      });
    });
  }, []);

  return (
    <div className="eventedit_container">
      <div className="eventedit__left_container">
        <p className="eventedit_header">Create your dream event</p>
        <h1 className="eventedit_title">What event are you planning?</h1>
        <p className="eventedit_text">* Required fields</p>
        <p className="eventedit_text">Unsure? Responses can be edited later.</p>
      </div>
      <div className="eventedit__right_container">
        <div className="eventedit_fields">
          <div className="eventedit__event_details">
            <div className="input">
              <p className="input_label">
                Event Name<span>*</span>
              </p>
              <input type="text" name="event_name" />
            </div>
            <div className="input">
              <p className="input_label">
                Event Type<span>*</span>
              </p>
              <input type="text" name="event_type" />
            </div>
          </div>

          <div className="dates_container">
            <p className="input_label">
              When do you want to celebrate?<span>*</span>
            </p>
            <div className="eventedit__event_details">
              <div className="input">
                <input type="date" name="from" />
              </div>
              <div className="to">
                {" "}
                <p>TO</p>{" "}
              </div>
              <div className="input">
                <input type="date" name="to" />
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

          <div className="eventedit__event_details">
            <div className="range_container">
              <div className="input">
                <p className="input_label">
                  How big is your event?<span>*</span>
                </p>
                <input type="float" name="attendees" placeholder="PAX" />
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
              <div className="save_btn">
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
