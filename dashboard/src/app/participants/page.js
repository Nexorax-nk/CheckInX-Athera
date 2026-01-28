"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Download } from "lucide-react";

// Mock Data
const initialParticipants = [
  { id: "EF-9382", name: "Naveen Athera", email: "naveen@example.com", role: "Student", status: "Checked In", time: "10:45 AM" },
  { id: "EF-1029", name: "Priya Sharma", email: "priya@example.com", role: "Speaker", status: "Registered", time: "-" },
  { id: "EF-9301", name: "Arjun Das", email: "arjun@example.com", role: "Student", status: "Checked In", time: "10:40 AM" },
  { id: "EF-9303", name: "Rahul V", email: "rahul@example.com", role: "Volunteer", status: "Checked In", time: "10:38 AM" },
  { id: "EF-9376", name: "Sarah Lee", email: "sarah@example.com", role: "Guest", status: "Registered", time: "-" },
  { id: "EF-4421", name: "Mike Chen", email: "mike@example.com", role: "Student", status: "Invalid", time: "10:30 AM" },
];

export default function ParticipantsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredData = initialParticipants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Participants</h2>
          <p className="text-slate-500 text-sm">Manage event attendees and status</p>
        </div>
        <div className="flex gap-3">
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
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Check-in Time</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition">
                <td className="p-4 text-slate-500 font-mono text-sm font-medium">{user.id}</td>
                <td className="p-4">
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </td>
                <td className="p-4 text-slate-600 text-sm font-medium">{user.role}</td>
                <td className="p-4">
                  <StatusBadge status={user.status} />
                </td>
                <td className="p-4 text-slate-500 text-sm">{user.time}</td>
                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-slate-500">No participants found.</div>
        )}
      </div>
    </div>
  );
}

// Helper Component for Badges
function StatusBadge({ status }) {
  const styles = {
    "Checked In": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Registered": "bg-blue-50 text-blue-700 border-blue-200",
    "Invalid": "bg-red-50 text-red-700 border-red-200",
  };
  
  return (
    <span className={`px-2.5 py-1 rounded text-xs font-bold border uppercase tracking-wide ${styles[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
      {status}
    </span>
  );
}