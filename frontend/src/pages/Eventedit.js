import React from "react";
import "../stylesheets/eventedit.css";
export const Eventedit = () => {
  return (
    <div className="eventedit_container">
      <div className="eventedit__left_container">
        <p className="eventedit_header">Create your dream event</p>
        <h1>What event are you planning?</h1>
      </div>
      <div className="eventedit__right_container">
        <div className="eventedit__event_details">
          <div className="input">
            <p className="input_label">
              Event Name<span>*</span>
            </p>
            <input type="text" name="first_name" />
          </div>
          <div className="input">
            <p className="input_label">
              Type<span>*</span>
            </p>
            <input type="text" name="last_name" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventedit;
