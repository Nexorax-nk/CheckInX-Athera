import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./styles/globals.css";

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
