"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, Download, RefreshCw } from "lucide-react";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- 1. Fetch Real Data ---
  async function fetchParticipants() {
    setLoading(true);
    try {
      const res = await fetch("/api/data");
      const { data } = await res.json();
      if (data) {
        setParticipants(data);
      }
    } catch (error) {
      console.error("Failed to fetch participants", error);
    } finally {
      setLoading(false);
    }
  }

  // Load on mount
  useEffect(() => {
    fetchParticipants();
  }, []);

  // --- 2. Filter Logic (Search by Name or TicketID) ---
  const filteredData = participants.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    // Safety check: ensure properties exist before calling toLowerCase
    const nameMatch = p.name?.toLowerCase().includes(searchLower);
    const idMatch = p.ticketId?.toLowerCase().includes(searchLower);
    return nameMatch || idMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Participants</h2>
          <p className="text-slate-500 text-sm">Manage event attendees and status</p>
        </div>
        <div className="flex gap-3">
          {/* Added Refresh Button */}
          <button 
            onClick={fetchParticipants}
            className="flex items-center gap-2 px-3 py-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 transition shadow-sm"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition font-medium shadow-sm">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-md shadow-red-200">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by Name or Ticket ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-200 text-slate-900 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-slate-400 shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email / Info</th>
              <th className="p-4">Status</th>
              <th className="p-4">Check-in Time</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">Loading sheet data...</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500">No participants found.</td>
              </tr>
            ) : (
              filteredData.map((user, index) => (
                <tr key={index} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-500 font-mono text-sm font-medium">{user.ticketId}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{user.name}</div>
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    {user.email || "-"}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="p-4 text-slate-500 text-sm font-mono">{user.time}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper Component for Badges
function StatusBadge({ status }) {
  // Normalize string to handle case sensitivity (e.g. "checked in" vs "Checked In")
  const normalized = status ? status.toLowerCase() : "";
  
  let style = "bg-slate-50 text-slate-600 border-slate-200"; // Default
  
  if (normalized.includes("checked in") || normalized.includes("present")) {
    style = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (normalized.includes("registered")) {
    style = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (normalized.includes("invalid") || normalized.includes("duplicate")) {
    style = "bg-red-50 text-red-700 border-red-200";
  }
  
  return (
    <span className={`px-2.5 py-1 rounded text-xs font-bold border uppercase tracking-wide ${style}`}>
      {status}
    </span>
  );
}