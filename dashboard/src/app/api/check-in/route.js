import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req) {
  try {
    const { ticketId } = await req.json();

    // 1. Auth & Load Sheet
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // 2. Load ALL cells to ensure we have the data map
    // (This prevents the "blind overwrite" issue)
    const rows = await sheet.getRows();
    const targetRow = rows.find((r) => r.get('TicketID') === ticketId);

    if (!targetRow) {
      return NextResponse.json({ status: "error", message: "Invalid Ticket ID" });
    }

    if (targetRow.get('Status') === "Checked In") {
      return NextResponse.json({ status: "error", message: "Already Checked In!" });
    }

    // 3. THE SAFE FIX: Update Specific Cells Only
    // We get the row number (1-based) from the row object
    const rowIndex = targetRow.rowNumber - 1; // Convert to 0-based index

    // Load ONLY the cells we want to change (Columns G and H)
    // G = Status (Index 6), H = CheckInTime (Index 7)
    // We load the specific range for this row to be super efficient and safe
    await sheet.loadCells({
        startRowIndex: rowIndex, 
        endRowIndex: rowIndex + 1, 
        startColumnIndex: 6, // Column G (Status)
        endColumnIndex: 8    // Column H (Time) + 1
    });

    // Get the specific cells
    const statusCell = sheet.getCell(rowIndex, 6); // Column G
    const timeCell = sheet.getCell(rowIndex, 7);   // Column H

    // Update values
    statusCell.value = "Checked In";
    timeCell.value = new Date().toLocaleTimeString();

    // Save ONLY the cells we just touched
    await sheet.saveUpdatedCells();

    return NextResponse.json({ status: "success", name: targetRow.get('Name') });

  } catch (error) {
    console.error("Check-in Error:", error);
    return NextResponse.json({ status: "error", message: "Update Failed" }, { status: 500 });
  }
}