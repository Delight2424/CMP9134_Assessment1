import type { User } from "../types";
import { formatDate, formatTime } from "../utils/utils";

type Props = {
  users: User[];
  onRoleChange: (id: string, role: "COMMANDER" | "VIEWER") => void;
};

export function UsersTable({ users, onRoleChange }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-slate-700">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              S/N
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Forename
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Email
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Date & Time Created
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={
                index % 2 === 0
                  ? "bg-white hover:bg-slate-50"
                  : "bg-slate-50 hover:bg-slate-100"
              }>
              <td className="px-4 py-3 text-slate-600">{index + 1}</td>
              <td className="px-4 py-3 text-slate-800">{user.forename}</td>
              <td className="px-4 py-3 text-slate-600">{user.email}</td>
              <td className="px-4 py-3 text-slate-600">
                {formatDate(user.createdAt || "")} at{" "}
                {formatTime(user.createdAt || "")}{" "}
              </td>

              <td className="px-4 py-3">
                <select
                  value={user.role}
                  onChange={(e) =>
                    onRoleChange(
                      user._id,
                      e.target.value as "COMMANDER" | "VIEWER",
                    )
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                  <option value="COMMANDER">Commander</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
