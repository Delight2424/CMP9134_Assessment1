import type { AuditEntry } from "../types";
import { formatDate, formatTime } from "../utils/utils";

const LogsTable = ({ logs }: { logs: AuditEntry[] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-slate-700">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              S/N
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Action
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              User
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Success
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr
              key={log._id}
              className={
                index % 2 === 0
                  ? "bg-white hover:bg-slate-50"
                  : "bg-slate-50 hover:bg-slate-100"
              }>
              <td className="px-4 py-3 text-slate-600">{index + 1}</td>
              <td className="px-4 py-3 text-slate-800">{log.action}</td>
              <td className="px-4 py-3 text-slate-600">
                {log.userEmail || "Unknown"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    log.success
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                  {log.success ? "Yes" : "No"}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">
                {/* {new Date(log.createdAt).toLocaleString()} */}
                {formatDate(log.createdAt || "")} at{" "}
                {formatTime(log.createdAt || "")}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;
