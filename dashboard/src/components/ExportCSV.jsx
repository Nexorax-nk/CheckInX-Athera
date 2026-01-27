import React from "react";
import { exportToCSV } from "../utils/csvExport";

function ExportCSV({ data }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => exportToCSV(data)}
        style={{
          padding: "10px 16px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Export Attendance CSV
      </button>
    </div>
  );
}

export default ExportCSV;
