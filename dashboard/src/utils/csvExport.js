export function exportToCSV(data) {
  if (!data || data.length === 0) {
    alert("No attendance data to export");
    return;
  }

  // CSV headers
  const headers = ["Name", "Email", "Token", "Attended"];

  // Convert data to rows
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

  // Create downloadable file
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "attendance.csv");
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}
