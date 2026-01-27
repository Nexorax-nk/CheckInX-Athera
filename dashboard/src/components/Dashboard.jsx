import React, { useEffect, useState } from "react";
import StatsCards from "./StatsCards";
import AttendanceTable from "./AttendanceTable";
import ExportCSV from "./ExportCSV";
import readExcel from "../utils/readExcel";

function Dashboard() {
  const [data, setData] = useState([]);

  // Load Excel data
  useEffect(() => {
    loadData();

    // LIVE UPDATE (polling every 3 seconds)
    const interval = setInterval(() => {
      loadData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const excelData = await readExcel();
    setData(excelData);
  };

  // Calculations
  const total = data.length;
  const attended = data.filter((d) => d.Attended === true).length;
  const remaining = total - attended;

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

      {/* Stats Cards */}
      <StatsCards
        total={total}
        attended={attended}
        remaining={remaining}
      />

      {/* Export Button */}
      <ExportCSV data={data} />

      {/* Attendance Table */}
      <AttendanceTable data={data} />
    </div>
  );
}

export default Dashboard;
