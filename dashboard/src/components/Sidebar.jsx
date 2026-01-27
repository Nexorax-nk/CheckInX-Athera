import React from "react";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#111827",
        color: "#ffffff",
        padding: "20px",
      }}
    >
      {/* App Title */}
      <h2 style={{ marginBottom: "30px" }}>Workshop Admin</h2>

      {/* Menu Items */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={menuStyle}>Dashboard</li>
        <li style={menuStyle}>Attendance</li>
        <li style={menuStyle}>Export</li>
      </ul>
    </div>
  );
}

const menuStyle = {
  padding: "10px 0",
  cursor: "pointer",
  opacity: 0.85,
};

export default Sidebar;
