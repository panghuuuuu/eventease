import React, { useState } from "react";
import axiosInstance from "../axiosApi";
import signupHeader from "../assets/logo_header.png";
import "../stylesheets/signup.css";
export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async () => {
    console.log(formData);
    try {
      await axiosInstance.post("/api/login/", formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup_container">
      <div className="left_container"></div>
      <div className="right_container">
        <div className="signup_header">
          <img src={signupHeader} alt="EventEase Header" />
        </div>
        <div className="signup_fields">
          <h3>Login</h3>

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
              Password<span>*</span>
            </p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="bottom_links">
            <div className="bottom_text">
              <p className="login_btn">Don’t have an account yet?</p>
            </div>
            <div className="signup_btn" onClick={submitForm}>
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
