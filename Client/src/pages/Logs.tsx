import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LogsTable from "../components/LogsTable";
import { api } from "../services/api";
import type { AuditEntry, PaginatedAuditResponse } from "../types";
import { ChevronLeft, ChevronRight, Radar } from "lucide-react";
import PageHelmet from "../components/PageHelmet ";

const Logs = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<
    PaginatedAuditResponse["pagination"] | null
  >(null);
  const [limit, setLimit] = useState("10");

  const itemPerPageData = [
    { name: "10 rows", id: "10" },
    { name: "15 rows", id: "15" },
    { name: "20 rows", id: "20" },
    { name: "50 rows", id: "50" },
    { name: "100 rows", id: "100" },
  ];

  const fetchLogs = async () => {
    const result = (await api.getAuditEntries(
      page,
      parseInt(limit),
    )) as PaginatedAuditResponse;
    setLogs(result.data);
    setPagination(result.pagination);
  };

  useEffect(() => {
    fetchLogs();
  }, [page, limit]);

  return (
    <>
    <PageHelmet
        title="Audit Logs | Robot GCS"
        description="Audit logs and robot command history."
      />
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-700">
              <Radar size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
              <p className="text-slate-500">
                View audit trail entries and system events.
              </p>
            </div>
          </div>
        </div>

        <LogsTable logs={logs} />

        <div className="flex items-center justify-between mt-4 w-full">
          <div className="flex items-center gap-3">
            <button
              disabled={!pagination?.hasPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
              <ChevronLeft />
            </button>

            <span className="text-sm text-slate-600">
              Page {pagination?.currentPage || 1} of{" "}
              {pagination?.totalPages || 1}
            </span>

            <button
              disabled={!pagination?.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
              <ChevronRight />
            </button>
          </div>

          <div className="">
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 outline-none cursor-pointer">
              {itemPerPageData.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>
    </div>
    </>

  );
};

export default Logs;
