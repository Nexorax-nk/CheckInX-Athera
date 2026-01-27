"use client";

import { useEffect, useRef, useState } from "react";
import StatsCards from "./StatsCards";
import AttendanceTable from "./AttendanceTable";
import ExportCSV from "./ExportCSV";
import readExcel from "../utils/readExcel";

function Dashboard({ attendanceRef, onExportRef }) {
  const [data, setData] = useState([]);

  // Load Excel data + live refresh
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const excelData = await readExcel();
    setData(excelData);
  };

  // Live feed (last 5 attended)
  const liveEntries = [...data]
    .filter((d) => d.Attended === true)
    .slice(-5)
    .reverse();

  // Stats
  const total = data.length;
  const attended = data.filter((d) => d.Attended === true).length;
  const remaining = total - attended;

  return (
    <div>
     <h1 className="text-3xl font-bold text-gray-900 mb-1">
  Organizer Dashboard
</h1>
<p className="text-gray-500 mb-8">
  College Workshop 2026 Overview
</p>

      {/* Stats */}
      <StatsCards
        total={total}
        attended={attended}
        remaining={remaining}
      />

      {/* Export */}
      <ExportCSV data={data} onExportRef={onExportRef} />

      {/* LIVE ATTENDANCE FEED */}
      <div id="attendance-section">
  <AttendanceTable data={liveEntries} />
</div>

    </div>
  );
}

export default Dashboard;
