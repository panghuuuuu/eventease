import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../axiosApi";
import signupHeader from "../assets/logo_header.png";
import "../stylesheets/signup.css";
export default function Registration() {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
    birthday: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async () => {
    try {
      await axiosInstance.post("/api/register/", formData);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup_container">
      <div className="left_container">
        <div className="popup_container">
          <p>Ready to plan your dream event?</p>
          <Link to="/" className="continue_btn">
            Browse without logging in
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 2L14.5 8.0531M6.5 14L14.5 8.0531M14.5 8.0531H1.5"
                stroke="#F07DEA"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="right_container">
        <Link to="/">
          <div className="signup_header">
            <img src={signupHeader} alt="EventEase Header" />
          </div>
        </Link>
        <div className="signup_fields">
          <h3>Sign Up</h3>
          <div className="input">
            <p className="input_label">
              Given Name<span>*</span>
            </p>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <p className="input_label">
              Last Name<span>*</span>
            </p>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="input">
            <p className="input_label">
              Username<span>*</span>
            </p>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <p className="input_label">
              Email<span>*</span>
            </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <p className="input_label">
              Password<span>*</span>
            </p>
            <input
              type="password"
              name="password1"
              value={formData.password1}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <p className="input_label">
              Confirm Password<span>*</span>
            </p>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <p className="input_label">
              Birthday<span>*</span>
            </p>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
            />
          </div>
          <div className="bottom_links">
            <div className="bottom_text">
              <span>* Required fields</span>
              <Link to="/login" className="login_btn">
                I already have an account.
              </Link>
            </div>
            <div className="signup_btn" onClick={submitForm}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
