"use client";

import { useEffect } from "react";
import { exportToCSV } from "../utils/csvExport";

function ExportCSV({ data, onExportRef }) {
  useEffect(() => {
    if (onExportRef) {
      onExportRef.current = () => exportToCSV(data);
    }
  }, [data, onExportRef]);

  return (
    <button
  id="export-btn"
  onClick={() => exportToCSV(data)}
   className="mb-6 px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition shadow"
>
  Export Attendance CSV
</button>

  );
}

export default ExportCSV;
