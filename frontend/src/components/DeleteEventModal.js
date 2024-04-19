import React, { useState, useEffect } from "react";
import axios from "../axiosApi.js";
import { useNavigate } from "react-router-dom";

import "../stylesheets/modal.css";

function Modal({ closeModal, eventId }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }
      const response = await axios.delete(`event/delete-event/${eventId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      navigate("/myevents");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="overlay_container">
      <div className="modal_container">
        <p>Are you sure you want to delete this event?</p>
        <div className="eventedit_buttons">
          <div className="cancel_btn" onClick={closeModal}>
            Cancel
          </div>
          <div className="save_btn" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
            >
              <path
                d="M5.35425 23.5H14.6559C16.2146 23.5 17.2166 22.5531 17.2976 20.9852L17.9757 6.32382H19.0891C19.6053 6.32382 20 5.91656 20 5.40748C20 4.89841 19.5951 4.51151 19.0891 4.51151H14.5951V2.98428C14.5951 1.41633 13.6032 0.5 11.913 0.5H8.0668C6.37652 0.5 5.38462 1.41633 5.38462 2.98428V4.51151H0.910931C0.404858 4.51151 0 4.90859 0 5.40748C0 5.92674 0.404858 6.32382 0.910931 6.32382H2.02429L2.70243 20.9852C2.7834 22.5633 3.7753 23.5 5.35425 23.5ZM7.27733 3.07592C7.27733 2.55666 7.6417 2.22067 8.19838 2.22067H11.7814C12.3381 2.22067 12.7024 2.55666 12.7024 3.07592V4.51151H7.27733V3.07592ZM5.55668 21.6775C5 21.6775 4.59514 21.2601 4.56478 20.6594L3.88664 6.32382H16.083L15.4251 20.6594C15.4049 21.2703 15.0101 21.6775 14.4332 21.6775H5.55668ZM7.01417 20.0383C7.44939 20.0383 7.72267 19.7634 7.71255 19.3561L7.40891 8.70629C7.39879 8.29903 7.11538 8.03431 6.7004 8.03431C6.2753 8.03431 6.00202 8.30921 6.01215 8.71647L6.31579 19.3663C6.32591 19.7736 6.60931 20.0383 7.01417 20.0383ZM10 20.0383C10.4251 20.0383 10.7186 19.7736 10.7186 19.3663V8.71647C10.7186 8.30921 10.4251 8.03431 10 8.03431C9.5749 8.03431 9.2915 8.30921 9.2915 8.71647V19.3663C9.2915 19.7736 9.5749 20.0383 10 20.0383ZM12.9858 20.0485C13.3907 20.0485 13.6741 19.7736 13.6842 19.3663L13.9879 8.71647C13.998 8.30921 13.7247 8.04449 13.2996 8.04449C12.8846 8.04449 12.6012 8.30921 12.5911 8.71647L12.2874 19.3663C12.2773 19.7634 12.5506 20.0485 12.9858 20.0485Z"
                fill="white"
              />
            </svg>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
