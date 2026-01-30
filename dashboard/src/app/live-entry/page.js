"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Smartphone, RefreshCw } from "lucide-react";

export default function LiveEntryPage() {
  const [latestScan, setLatestScan] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- POLLING FUNCTION (Auto-Updates every 3s) ---
  async function fetchLiveUpdates() {
    try {
      const res = await fetch("/api/data");
      const { data } = await res.json();

      if (data && data.length > 0) {
        // Filter only people who have actually checked in
        const checkedInUsers = data.filter(u => u.status === "Checked In" || u.status === "Invalid" || u.status === "Duplicate");
        
        // Sort by time (assuming new rows are added at the bottom, or you can sort by a date string if available)
        // For simplicity with Sheet rows, we take the last ones.
        const reversedData = [...checkedInUsers].reverse();

        setLatestScan(reversedData[0]); // The very last person scanned
        setRecentLogs(reversedData.slice(1, 10)); // The previous 9 people
      }
    } catch (error) {
      console.error("Polling error", error);
    } finally {
      setLoading(false);
    }
  }

  // Setup the Timer
  useEffect(() => {
    fetchLiveUpdates(); // Initial fetch
    const interval = setInterval(fetchLiveUpdates, 3000); // Poll every 3 seconds
    return () => clearInterval(interval); // Cleanup on exit
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      
      {/* LEFT: THE "JUST SCANNED" MONITOR */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Pulse Animation */}
        <div className="absolute inset-0 bg-slate-50/50 z-0"></div>
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 z-10">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider">Listening to App</span>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-full max-w-md text-center">
          
          {loading ? (
             <div className="animate-pulse flex flex-col items-center">
               <div className="w-32 h-32 bg-slate-100 rounded-full mb-4"></div>
               <div className="h-6 w-48 bg-slate-100 rounded mb-2"></div>
               <div className="h-4 w-32 bg-slate-100 rounded"></div>
             </div>
          ) : latestScan ? (
            <>
              {/* Status Icon */}
              <div className="mb-6 flex justify-center">
                 {latestScan.status === "Checked In" ? (
                   <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-inner">
                     <CheckCircle size={64} className="text-emerald-500" />
                   </div>
                 ) : (
                   <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100 shadow-inner">
                     <XCircle size={64} className="text-red-500" />
                   </div>
                 )}
              </div>

              {/* User Details */}
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{latestScan.name}</h2>
              <p className="text-slate-500 font-mono text-lg mb-6">{latestScan.ticketId}</p>

              {/* Big Status Badge */}
              <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-xl border-2 text-lg font-bold uppercase tracking-widest ${
                latestScan.status === "Checked In" 
                  ? "border-emerald-100 bg-emerald-50 text-emerald-600" 
                  : "border-red-100 bg-red-50 text-red-600"
              }`}>
                {latestScan.status}
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm font-medium">
                <Clock size={16} />
                <span>Scanned at {latestScan.time}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                 <Smartphone size={40} className="text-slate-300" />
               </div>
               <h3 className="text-xl font-bold text-slate-700">Waiting for Scans...</h3>
               <p className="text-slate-400 mt-2">Use the mobile app to scan a ticket.</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: HISTORY & MANUAL */}
      <div className="flex flex-col gap-6">
        
        {/* Manual Backup (Always useful) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Manual Override</h3>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="EF-2023..." 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-red-500 transition-all placeholder:text-slate-400"
            />
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 rounded-lg font-medium transition shadow-lg shadow-slate-200">
              Check In
            </button>
          </div>
        </div>

        {/* History Feed */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-slate-900">Previous Scans</h3>
             <button onClick={fetchLiveUpdates} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition">
               <RefreshCw size={16} />
             </button>
          </div>
          
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {recentLogs.map((log, i) => (
              <LogItem key={i} name={log.name} time={log.time} status={log.status} />
            ))}
            {recentLogs.length === 0 && <p className="text-slate-400 text-sm text-center py-4">History is empty.</p>}
          </div>
        </div>
      </div>

    </div>
  );
}

function LogItem({ name, time, status }) {
  const isSuccess = status === "Checked In";
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all opacity-75 hover:opacity-100">
      <div>
        <p className="text-slate-700 font-bold text-sm">{name}</p>
        <p className="text-slate-400 text-xs font-mono">{time}</p>
      </div>
      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${
        isSuccess 
          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
          : "bg-red-50 text-red-600 border-red-100"
      }`}>
        {status}
      </span>
    </div>
  );
}