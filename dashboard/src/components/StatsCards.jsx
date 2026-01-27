"use client";

export default function StatsCards({ total, attended, remaining }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card title="Total Registered" value={total} />
      <Card title="Checked In" value={attended} />
      <Card title="Remaining" value={remaining} />
    </div>
  );
}

function Card({ title, value }) {
  return (
<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
     <p className="text-gray-500 text-sm mb-2">{title}</p>
<h1 className="text-3xl font-bold text-gray-900">{value}</h1>

    </div>
  );
}
