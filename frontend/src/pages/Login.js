import React from "react";
import axiosInstance from "../axiosApi";
export default function Login() {
  const handleApiRequest = async () => {
    try {
      const response = await axiosInstance.get("/api/me");
      console.log(response.data); // Do something with the response
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <h1>Login</h1>

      <button onClick={handleApiRequest}>Click me</button>
    </div>
  );
}
