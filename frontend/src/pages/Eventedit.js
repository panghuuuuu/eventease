import React, {useEffect} from "react";
import "../stylesheets/eventedit.css";
import SaveEdits from "../assets/SaveEdits.png";
export const Eventedit = () => {
  useEffect(() => {
    document.querySelectorAll('.service_btn').forEach(button => {
      button.addEventListener('click', () => {
        button.classList.add('clicked');
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
        <div className="eventedit__event_details">
        <div className="input">
              <p className="input_label">
                When do you want to celebrate?<span>*</span>
              </p>
              <input type="date" name="from" />
            </div>
            <p className="to"> TO </p>
        <div className="input">
          <p className="input_label">
            <span>*</span>
          </p>
          <input type="date" name="to" />
        </div>
        </div>
        <div className="eventedit__event_details">
        <div className="input">
              <p className="input_label">
                What services are you looking for?<span>*</span>
              </p>
              <div className="buttons">
                <p className="service_btn">Venues</p>
                <p className="service_btn">Caterers</p>
                <p className="service_btn">Party Suppliers</p>
                <p className="service_btn">Hosts</p>
                <p className="service_btn">Entertainers</p>
                <p className="service_btn">Photographers</p>
                <p className="service_btn">Formal Attire</p>
                <p className="service_btn">Costumes</p>
                <p className="service_btn">Makeup Artists</p>
              </div>
             
            </div>
        </div>
        <div className="eventedit__event_details">
          <div className="input">
                <p className="input_label">
                  How much is your budget?<span>*</span>
                </p>
                <input type="float" name="budget" />
              </div>
          <div className="slidecontainer">
          <p className="range_text">0 PHP</p>
            <input type="range" min="1" max="250" className="slider" id="myRange"/>
            <p className="range_text">500000+ PHP</p>          </div>
        </div>
        <div className="eventedit__event_details">
        <div className="input">
          <p className="input_label"> How many attendees?<span>*</span></p>
          <input type="integer" name="pax" />
          </div>
          <div className="slidecontainer">
          <p className="range_text">0 PAX</p>
            <input type="range" min="1" max="250" className="slider" id="myRange"/>
            <p className="range_text">250+ PAX</p>
          </div>
        
        </div>
        
        <div className="eventedit__event_details">
          <div className="buttons">
            <p className="cancel_btn">Cancel</p>
            <p className="save_btn">
              <img src={SaveEdits} alt="SaveEdits"></img>
              Save Edits</p>
          </div>
            
        </div>
        </div>
      </div>
    </div>
  );
};

export default Eventedit;
