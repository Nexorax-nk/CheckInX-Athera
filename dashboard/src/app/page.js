"use client";

import { useState, useEffect } from "react";
import { Users, CheckCircle, Clock, AlertTriangle, RefreshCw } from "lucide-react"; 

export default function Dashboard() {
  // 1. Setup State to hold the Real Data
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [stats, setStats] = useState({ total: 0, checkedIn: 0, pending: 0, issues: 0 });

  // 2. The Function to Fetch Data from your API
  async function refreshData() {
    setLoading(true);
    try {
      // Calls the /api/data route
      const res = await fetch("/api/data");
      const json = await res.json();
      
      // Safety check: ensure 'data' is an array
      const data = Array.isArray(json.data) ? json.data : [];

      // Calculate Stats Automatically based on "Status" column
      // Note: Make sure these strings match exactly what is in your Google Sheet
      const checkedInCount = data.filter(u => u.status === "Checked In").length;
      const invalidCount = data.filter(u => u.status === "Invalid" || u.status === "Duplicate").length;

      setStats({
        total: data.length,
        checkedIn: checkedInCount,
        pending: data.length - checkedInCount - invalidCount,
        issues: invalidCount
      });

      // Filter recent check-ins for the feed (users with a time)
      const recent = data
        .filter(u => u.time && u.time !== "-") // Only show people with a timestamp
        .slice(-5) // Get last 5
        .reverse(); // Newest first
      
      setFeed(recent);

    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  }

  // 3. Fetch immediately when page loads
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Organizer Dashboard</h2>
          <p className="text-slate-500 mt-1">College Workshop 2026 Overview</p>
        </div>
        
        {/* Refresh Button & Status */}
        <div className="flex gap-3">
          <button 
            onClick={refreshData} 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition shadow-sm font-medium"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? "Syncing..." : "Refresh"}
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-xs font-bold text-red-600 tracking-wide">LIVE FEED</span>
          </div>
        </div>
      </div>

      {/* Stats Grid (Connected to State) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          label="Total Registered" 
          value={stats.total} 
          icon={<Users size={22} />} 
          color="text-slate-600 bg-slate-100 border-slate-200" 
        />
        <Card 
          label="Checked In" 
          value={stats.checkedIn} 
          icon={<CheckCircle size={22} />} 
          trend={`${stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0}%`}
          color="text-red-600 bg-red-50 border-red-100" 
          highlight
        />
        <Card 
          label="Remaining" 
          value={stats.pending} 
          icon={<Clock size={22} />} 
          color="text-slate-400 bg-slate-50 border-slate-100" 
        />
        <Card 
          label="Invalid Scans" 
          value={stats.issues} 
          icon={<AlertTriangle size={22} />} 
          color="text-red-500 bg-transparent border-red-100" 
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Live Feed (Dynamic) */}
        <div className="col-span-2 card-premium p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Live Entry Feed</h3>
            <button className="text-xs text-red-600 hover:text-red-700 transition uppercase tracking-wider font-bold">View Full Log</button>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <p className="text-center text-slate-400 py-4">Loading data...</p>
            ) : feed.length > 0 ? (
              feed.map((user, i) => (
                <FeedItem 
                  key={i} 
                  time={user.time} 
                  name={user.name} 
                  status={user.status} 
                  isError={user.status === "Invalid" || user.status === "Duplicate"}
                />
              ))
            ) : (
              <p className="text-center text-slate-400 py-4">No check-ins yet.</p>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="col-span-1 card-premium p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Manual Lookup</h3>
          <p className="text-sm text-slate-500 mb-6">Verify ticket ID if QR scan fails.</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 ml-1 mb-1 block uppercase tracking-wider">Ticket ID</label>
              <input 
                type="text" 
                placeholder="EF-2026-..." 
                className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-slate-400"
              />
            </div>
            
            <button className="w-full btn-primary py-3 rounded-lg uppercase tracking-wide text-sm">
              Verify Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Internal Components (Light/Red Style)
// ----------------------------------------------------------------------

function Card({ label, value, icon, color, trend, highlight }) {
  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
      highlight 
        ? "bg-white border-red-200 shadow-lg shadow-red-100/50" 
        : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
    }`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{label}</span>
        <div className={`p-2 rounded-lg border ${color} transition-transform group-hover:scale-110`}>
          {icon}
        </div>
      </div>
      <div>
        <span className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</span>
        {trend && <span className={`text-xs ml-2 font-bold ${highlight ? 'text-red-600' : 'text-slate-400'}`}>{trend}</span>}
      </div>
    </div>
  );
}

function FeedItem({ time, name, status, isError }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-4">
        <span className="text-slate-400 text-xs font-mono font-medium">{time}</span>
        <span className="text-slate-700 font-bold group-hover:text-slate-900 transition-colors">{name}</span>
      </div>
      
      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider border ${
        isError 
          ? "bg-red-50 text-red-600 border-red-100" 
          : "bg-white text-slate-600 border-slate-200"
      }`}>
        {status}
      </span>
    </div>
  );
}