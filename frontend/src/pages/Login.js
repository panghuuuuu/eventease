import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosApi";
import signupHeader from "../assets/logo_header.png";
import "../stylesheets/signup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in when component mounts
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/myevents");
      }
    };
    checkLoggedIn();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/api/login/", formData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token in local storage
        navigate("/myevents");
      }
    } catch (error) {
      setError("Invalid username or password.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
          {error && <p className="error">{error}</p>}
          <div className="bottom_links">
            <div className="bottom_text">
              <Link to="/register" className="login_btn">
                Don’t have an account yet?
              </Link>
            </div>
            <div className="signup_btn" onClick={submitForm}>
              {loading ? "Loading..." : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
