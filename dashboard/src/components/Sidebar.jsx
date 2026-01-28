"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ScanLine, BarChart3, Settings } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Participants", path: "/participants", icon: <Users size={20} /> },
    { name: "Live Entry", path: "/live-entry", icon: <ScanLine size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    // UPDATED: bg-slate-950 (Dark) instead of bg-white, border-slate-800
    <aside className="w-64 h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 bg-slate-950 text-slate-400">
      
      {/* BRANDING */}
      <div className="p-6">
        {/* UPDATED: text-white */}
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-red-600 rounded-full"></span>
          EntryFlow
        </h1>
        <p className="text-xs text-slate-500 mt-1 pl-4">CheckInX-Athera</p>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-red-600 text-white shadow-md shadow-red-900/20" // UPDATED: Solid Red Active State
                  : "hover:bg-slate-900 hover:text-white" // UPDATED: Dark Hover State
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* USER PROFILE */}
      {/* UPDATED: Darker border and text colors */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
            NA
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Naveen Athera</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;