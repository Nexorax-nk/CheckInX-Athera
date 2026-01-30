import { NextResponse } from "next/server";
import { getSheetData } from "@/lib/sheets";

export async function GET() {
  // 1. Fetch data from the sheet
  const data = await getSheetData();
  
  // 2. Send it to the frontend
  return NextResponse.json({ 
    status: "success", 
    data: data 
  });
}