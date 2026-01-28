import { TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Analytics & Reports</h2>
        <p className="text-slate-500 text-sm">Post-event analysis and live metrics</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Check-in Rate" value="82%" icon={<TrendingUp size={20} />} trend="+12%" positive={true} />
        <StatCard title="Peak Traffic" value="10:30 AM" icon={<Clock size={20} />} trend="45 scans/min" positive={true} />
        <StatCard title="Total Guests" value="142" icon={<Users size={20} />} trend="Registered" positive={true} />
        <StatCard title="Issues" value="5" icon={<AlertTriangle size={20} />} trend="Requires Attention" positive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Simple CSS Bar Chart: Peak Times */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Entry Traffic (Last 4 Hours)</h3>
          <div className="flex items-end justify-between h-48 gap-4 px-2">
            <Bar label="9 AM" height="30%" />
            {/* Active Bar is RED now */}
            <Bar label="10 AM" height="85%" active />
            <Bar label="11 AM" height="50%" />
            <Bar label="12 PM" height="20%" />
          </div>
        </div>

        {/* CSS Progress List: Role Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Attendee Distribution</h3>
          <div className="space-y-6">
            <ProgressItem label="Students" value={65} color="bg-red-600" count="92" />
            <ProgressItem label="Faculty" value={15} color="bg-slate-600" count="21" />
            <ProgressItem label="Guests" value={12} color="bg-slate-400" count="17" />
            <ProgressItem label="Volunteers" value={8} color="bg-slate-300" count="12" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Components
function StatCard({ title, value, icon, trend, positive }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</span>
        <span className="text-slate-600 bg-slate-100 p-2 rounded-lg border border-slate-200">{icon}</span>
      </div>
      <div className="text-2xl font-extrabold text-slate-900 mb-1">{value}</div>
      <div className={`text-xs font-bold ${positive ? "text-emerald-600" : "text-red-600"}`}>
        {trend}
      </div>
    </div>
  );
}

function Bar({ label, height, active }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 group">
      <div className="w-full relative h-full flex items-end">
        <div 
          className={`w-full rounded-t-sm transition-all duration-500 ${
            active 
              ? "bg-red-600 shadow-md shadow-red-100" // Active = Red
              : "bg-slate-200 group-hover:bg-slate-300" // Inactive = Gray
          }`} 
          style={{ height }}
        ></div>
      </div>
      <span className={`text-xs font-medium ${active ? "text-red-600" : "text-slate-400"}`}>{label}</span>
    </div>
  );
}

function ProgressItem({ label, value, color, count }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-700 font-medium">{label}</span>
        <span className="text-slate-500 font-mono">{count} users</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}