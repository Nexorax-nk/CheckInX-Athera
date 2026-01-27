import * as XLSX from "xlsx";

const STORAGE_KEY = "attendance-data";

async function readExcel() {
  // 1️⃣ If data already exists in localStorage → use it
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // 2️⃣ Else load from Excel
  const response = await fetch("/registrations.xlsx");
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  // 3️⃣ Save initial data to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  return data;
}

export default readExcel;
