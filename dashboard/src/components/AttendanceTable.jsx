"use client";

export default function AttendanceTable({ data, onToggle }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Token</th>
            <th className="px-4 py-3 text-left">Attendance</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 text-gray-900">{item.Name}</td>
              <td className="px-4 py-3 text-gray-700">{item.Email}</td>
              <td className="px-4 py-3 text-gray-700">{item.Token}</td>

              <td className="px-4 py-3">
                <button
                  onClick={() => onToggle(item.Token)}
                  className={`px-4 py-1 rounded-full text-xs font-medium transition
                    ${
                      item.Attended
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }
                  `}
                >
                  {item.Attended ? "Attended" : "Not Attended"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
