"use client";

import { useState } from "react";
import { QrCode, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export default function LiveEntryPage() {
  const [scanStatus, setScanStatus] = useState("idle"); // idle, success, error

  const handleSimulateScan = (type) => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus(type);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      
      {/* LEFT: SCANNER INTERFACE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Animated Scanner Effect (Red Pulse) */}
        {scanStatus === "scanning" && (
          <div className="absolute inset-0 bg-red-500/5 animate-pulse z-0"></div>
        )}

        <div className="relative z-10 text-center">
          <div className={`w-48 h-48 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
            scanStatus === "success" ? "bg-emerald-50 border-2 border-emerald-500" :
            scanStatus === "error" ? "bg-red-50 border-2 border-red-500" :
            "bg-slate-50 border-2 border-dashed border-slate-300"
          }`}>
            {scanStatus === "success" ? <CheckCircle size={64} className="text-emerald-500" /> :
             scanStatus === "error" ? <XCircle size={64} className="text-red-500" /> :
             <QrCode size={64} className="text-slate-400" />
            }
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {scanStatus === "idle" && "Ready to Scan"}
            {scanStatus === "scanning" && "Scanning..."}
            {scanStatus === "success" && "Access Granted"}
            {scanStatus === "error" && "Access Denied"}
          </h3>
          <p className="text-slate-500 mb-8 font-medium">
            {scanStatus === "idle" ? "Point camera at QR code" : 
             scanStatus === "success" ? "Naveen Athera (Student)" : 
             scanStatus === "error" ? "Ticket Already Used" : "Verifying..."}
          </p>

          {/* Simulation Buttons */}
          <div className="flex gap-3 justify-center">
            <button onClick={() => handleSimulateScan("success")} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium shadow-sm shadow-emerald-200">
              Simulate Success
            </button>
            <button onClick={() => handleSimulateScan("error")} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-sm shadow-red-200">
              Simulate Error
            </button>
            <button onClick={() => setScanStatus("idle")} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 border border-slate-200">
              <RefreshCw size={20}/>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: MANUAL & LOGS */}
      <div className="flex flex-col gap-6">
        
        {/* Manual Lookup */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Manual Entry</h3>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Enter Ticket ID (e.g. EF-2023)..." 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-slate-400"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-lg font-medium transition shadow-md shadow-red-200">
              Verify
            </button>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-slate-900">Recent Scans</h3>
             <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Feed</span>
          </div>
          
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            <LogItem name="Naveen Athera" time="10:45 AM" status="Allowed" />
            <LogItem name="Unknown User" time="10:44 AM" status="Invalid" />
            <LogItem name="Priya Sharma" time="10:42 AM" status="Duplicate" />
            <LogItem name="Arjun Das" time="10:40 AM" status="Allowed" />
            <LogItem name="Rahul V" time="10:38 AM" status="Allowed" />
          </div>
        </div>
      </div>

    </div>
  );
}

function LogItem({ name, time, status }) {
  const isAllowed = status === "Allowed";
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all">
      <div>
        <p className="text-slate-800 font-bold text-sm">{name}</p>
        <p className="text-slate-500 text-xs font-mono">{time}</p>
      </div>
      <span className={`text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider border ${
        isAllowed 
          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
          : "bg-red-50 text-red-600 border-red-100"
      }`}>
        {status}
      </span>
    </div>
  );
}