import React, { useState } from "react";
import axios from "axios"; // Import axios if not already imported
import "../stylesheets/modal.css";

function ReportModal({ closeModal, serviceId }) {
  const [reason, setReason] = useState("");

  const handleReport = async () => {
    try {
        // Make a POST request to report the service
        const response = await axios.post(`/report/service/${serviceId}`, {
          reason: reason,
        });
    
        // Log the response data if needed
        console.log("Service reported:", response.data);
    
        // Close the report modal
        closeModal();
      } catch (error) {
        // Log an error message if there's an error during the request
        console.error("Error reporting service:", error);
      }
  };

  return (
    <div className="overlay_container">
      <div className="modal_container">
        
        <h2>Report Service</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please provide the reason for reporting..."
        />
        <div className="modal_buttons"> 
          <button className="cancel_btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="report_btn" onClick={handleReport}>
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportModal;
