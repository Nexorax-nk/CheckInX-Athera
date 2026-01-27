import React from "react";

function StatsCards({ total, attended, remaining }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <StatCard title="Total Registered" value={total} />
      <StatCard title="Attended" value={attended} />
      <StatCard title="Remaining" value={remaining} />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f3f4f6",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

export default StatsCards;
