"use client";

import { useEffect, useState } from "react";
import AttendanceTable from "../../src/components/AttendanceTable";
import readExcel from "../../src/utils/readExcel";

export default function AttendancePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const excelData = await readExcel();
    setData(excelData);
  };

  // Toggle attendance (Attended <-> Not Attended)
  const handleToggle = (token) => {
    const updated = data.map((item) =>
      item.Token === token
        ? { ...item, Attended: !item.Attended }
        : item
    );

    setData(updated);

    // persist changes
    localStorage.setItem("attendance-data", JSON.stringify(updated));
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        On-Spot Attendance
      </h1>
      <p className="text-gray-500 mb-6">
        Click to mark or unmark attendance
      </p>

      <AttendanceTable data={data} onToggle={handleToggle} />
    </div>
  );
}
