import React from "react";

function AttendanceTable({ data }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "10px" }}>Attendance List</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#ffffff",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#e5e7eb" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" style={emptyStyle}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.Name}</td>
                <td style={tdStyle}>{item.Email}</td>
                <td style={tdStyle}>{item.Token}</td>
                <td style={tdStyle}>
                  {item.Attended ? (
                    <span style={attendedStyle}>Attended</span>
                  ) : (
                    <span style={pendingStyle}>Pending</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #d1d5db",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

const attendedStyle = {
  color: "green",
  fontWeight: "bold",
};

const pendingStyle = {
  color: "orange",
  fontWeight: "bold",
};

const emptyStyle = {
  textAlign: "center",
  padding: "20px",
  color: "#6b7280",
};

export default AttendanceTable;
