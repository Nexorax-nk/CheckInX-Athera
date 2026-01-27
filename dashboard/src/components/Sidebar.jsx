"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
<aside className="w-64 bg-black min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8 text-white">
  CHECKINX-ATHERA
</h2>


      <nav className="space-y-4">
        <p
          onClick={() => router.push("/")}
          className="text-white font-medium cursor-pointer"
        >
          Dashboard
        </p>

        <p
          onClick={() => router.push("/attendance")}
          className="text-gray-400 hover:text-white cursor-pointer">
          Attendance
        </p>

        <p
          onClick={() =>
            document.getElementById("export-btn")?.click()
          }
          className="text-slate-400 hover:text-white cursor-pointer"
        >
          Export
        </p>
      </nav>
    </aside>
  );
}
