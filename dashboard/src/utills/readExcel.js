import * as XLSX from "xlsx";
import registrations from "../data/registrations.xlsx";

async function readExcel() {
  try {
    // Fetch the Excel file
    const response = await fetch(registrations);
    const arrayBuffer = await response.arrayBuffer();

    // Read workbook
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
}

export default readExcel;
