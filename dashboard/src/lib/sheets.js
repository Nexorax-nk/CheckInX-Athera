import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const getSheetData = async () => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0]; 
    const rows = await sheet.getRows();

    // MAP YOUR EXACT HEADERS HERE
    return rows.map((row) => ({
      ticketId: row.get('TicketID'),    // Matches "TicketID" column
      name: row.get('Name'),            // Matches "Name" column
      status: row.get('Status') || "Registered", // Matches "Status" column
      time: row.get('CheckInTime') || "-",       // Matches "CheckInTime" column
      email: row.get('Email')           // Matches "Email" column
    }));

  } catch (error) {
    console.error('Sheet Error:', error);
    return [];
  }
};