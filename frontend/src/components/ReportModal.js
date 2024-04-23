import React, { useState } from "react";
import axios from "../axiosApi.js";
import "../stylesheets/modal.css";

function ReportModal({ closeReportModal, serviceId }) {
  const [reportTitle, setReportTitle] = useState("");
  const [reportBody, setReportBody] = useState("");

  const handleReport = async () => {
    try {
      const reportData = {
        report_title: reportTitle,
        report_body: reportBody,
      };

      const response = await axios.post(
        `/service/${serviceId}/report/`,
        reportData
      );

      console.log("Service reported:", response.data);
    } catch (error) {
      console.error("Error reporting service:", error);
    }
    handleCloseModal();
  };
  const handleCloseModal = () => {
    closeReportModal(); // Call closeReportModal function passed as prop
  };

  return (
    <div className="overlay_container">
      <div className="modal_container">
        <div className="input">
          <p className="input_label">Title/Subject:</p>
          <textarea
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
          />
        </div>

        <div className="input">
          <p className="input_label">Reason:</p>
          <textarea
            value={reportBody}
            onChange={(e) => setReportBody(e.target.value)}
            placeholder="Please provide the reason for reporting..."
          />
        </div>

        <div className="modal_buttons">
          <button className="cancel_btn" onClick={closeReportModal}>
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
