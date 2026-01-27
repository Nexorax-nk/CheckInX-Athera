export function exportToCSV(data) {
  if (!data || data.length === 0) {
    alert("No data available to export");
    return;
  }

  // CSV header
  const headers = ["Name", "Email", "Token", "Attended"];

  // Convert rows to CSV format
  const rows = data.map((item) => [
    item.Name,
    item.Email,
    item.Token,
    item.Attended ? "Yes" : "No",
  ]);

  // Combine header + rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create file and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "attendance.csv");
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}
