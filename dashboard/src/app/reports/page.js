"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, UserCheck, AlertCircle, RefreshCw } from "lucide-react";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ 
    total: 0, 
    checkedIn: 0, 
    pending: 0, 
    invalid: 0,
    completionRate: 0 
  });

  // Fetch Real Data from Sheet
  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/data");
      const { data } = await res.json();
      
      if (data) {
        setData(data);
        
        // Calculate Counts
        const total = data.length;
        const checkedIn = data.filter(u => u.status === "Checked In").length;
        const invalid = data.filter(u => u.status === "Invalid" || u.status === "Duplicate").length;
        const pending = total - checkedIn - invalid;
        const rate = total > 0 ? Math.round((checkedIn / total) * 100) : 0;

        setStats({ total, checkedIn, pending, invalid, completionRate: rate });
      }
    } catch (error) {
      console.error("Error fetching reports", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Event Reports</h2>
          <p className="text-slate-500 text-sm">Real-time attendance metrics</p>
        </div>
        <button onClick={fetchData} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition">
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Top Cards (Real Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Completion" 
          value={`${stats.completionRate}%`} 
          icon={<TrendingUp size={20} />} 
          subtext="Seat occupancy"
          color="text-emerald-600 bg-emerald-50 border-emerald-100"
        />
        <StatCard 
          title="Checked In" 
          value={stats.checkedIn} 
          icon={<UserCheck size={20} />} 
          subtext="Arrived guests"
          color="text-blue-600 bg-blue-50 border-blue-100"
        />
        <StatCard 
          title="Remaining" 
          value={stats.pending} 
          icon={<Users size={20} />} 
          subtext="Not yet arrived"
          color="text-slate-600 bg-slate-50 border-slate-200"
        />
        <StatCard 
          title="Issues" 
          value={stats.invalid} 
          icon={<AlertCircle size={20} />} 
          subtext="Invalid/Duplicate"
          color="text-red-600 bg-red-50 border-red-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* VISUAL 1: Room Capacity (Replaces Traffic Graph) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Workshop Capacity</h3>
          <p className="text-sm text-slate-500 mb-8">Live visual of room occupancy</p>
          
          <div className="flex flex-col items-center justify-center py-4">
            {/* Simple CSS Doughnut/Progress Circle */}
            <div className="relative w-48 h-48 rounded-full border-16 border-slate-100 flex items-center justify-center">
              {/* This SVG creates the Red Progress Circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="42" 
                  fill="transparent" 
                  stroke="#dc2626" 
                  strokeWidth="16"
                  strokeDasharray={`${stats.completionRate * 2.64} 264`} 
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="text-center">
                <span className="text-4xl font-extrabold text-slate-900">{stats.checkedIn}</span>
                <span className="text-sm text-slate-400 block font-medium">/ {stats.total} Seats</span>
              </div>
            </div>
            
            <p className="mt-6 text-sm font-medium text-slate-600">
              {stats.pending > 0 
                ? `${stats.pending} guests are still expected.` 
                : "All guests have arrived!"}
            </p>
          </div>
        </div>

        {/* VISUAL 2: Simple Status Breakdown (Replaces Roles) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Status Breakdown</h3>
          <div className="space-y-6">
            <ProgressItem 
              label="Arrived (Checked In)" 
              value={stats.checkedIn} 
              total={stats.total} 
              color="bg-emerald-500" 
            />
            <ProgressItem 
              label="Pending (Not Scanned)" 
              value={stats.pending} 
              total={stats.total} 
              color="bg-slate-300" 
            />
            <ProgressItem 
              label="Issues (Invalid/Dup)" 
              value={stats.invalid} 
              total={stats.total} 
              color="bg-red-500" 
            />
          </div>

          {/* Mini Help Text */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase mb-1">Organizer Note</h4>
            <p className="text-xs text-slate-500">
              If "Pending" guests is high after 10:30 AM, consider sending a reminder email or closing the registration desk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Internal Components
function StatCard({ title, value, icon, subtext, color }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-lg border ${color}`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-extrabold text-slate-900 mb-1">{value}</div>
      <div className="text-xs font-medium text-slate-400">{subtext}</div>
    </div>
  );
}

function ProgressItem({ label, value, total, color }) {
  // Prevent division by zero
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-700 font-bold">{label}</span>
        <span className="text-slate-500 font-mono">{value} users</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}