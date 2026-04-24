import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Activity,
  BatteryCharging,
  MapPinned,
  MoveRight,
  Radar,
} from "lucide-react";
import Navbar from "../components/Navbar";
import RobotMapView from "../components/RobotMap";
import { api } from "../services/api";
import type { RobotMap, RobotStatus, TelemetryData } from "../types";
import { getApiErrorMessage } from "../services/apiError";
import { toast } from "react-toastify";
import { getUser } from "../utils/auth";
import { formatTime } from "../utils/utils";
import PageHelmet from "../components/PageHelmet ";

interface DashboardProps {
  telemetry: TelemetryData | null;
  connected: boolean;
  socketError: string;
  lastUpdated: Date | null;
}
const Dashboard: React.FC<DashboardProps> = ({
  telemetry,
  connected,
  socketError,
  lastUpdated,
}) => {
  const [status, setStatus] = useState<RobotStatus | null>(null);
  const [map, setMap] = useState<RobotMap | null>(null);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [isLoadingMove, setIsLoadingMove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = getUser();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "LOW_BATTERY":
        return "text-red-500 animate-pulse";
      case "STUCK":
        return "text-red-500";
      default:
        return "text-black";
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        setMessage("");

        const [statusResult, mapResult] = await Promise.all([
          api.getRobotStatus(),
          api.getRobotMap(),
        ]);

        if (!isMounted) return;

        setStatus(statusResult.data);
        setMap(mapResult.data);
      } catch (err) {
        if (!isMounted) return;
        setMessage(getApiErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshDashboard = async () => {
    try {
      const [statusResult, mapResult] = await Promise.all([
        api.getRobotStatus(),
        api.getRobotMap(),
      ]);

      setStatus(statusResult.data);
      setMap(mapResult.data);
    } catch (err) {
      setMessage(getApiErrorMessage(err));
    }
  };

  const handleMove = async () => {
    if (telemetry?.battery !== undefined && telemetry?.battery < 1) {
      return toast.error('Battery Low: Please Reset Robot')
    }
    setIsLoadingMove(true);
    try {
      await api.moveRobot({ x: Number(x), y: Number(y) });
      toast.success("Robot moved successfully");

      await refreshDashboard();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "❌ Move failed");
    } finally {
      setIsLoadingMove(false);
    }
  };

  const handleReset = async () => {
    setIsLoadingReset(true);
    try {
      await api.resetRobot();
      toast.success("Robot reset successfully");

      await refreshDashboard();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "❌ Reset failed");
    } finally {
      setIsLoadingReset(false);
    }
  };

  const previousStatusRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const currentStatus = telemetry?.status;

    if (!currentStatus) return;
    if (previousStatusRef.current === currentStatus) return;

    previousStatusRef.current = currentStatus;

    if (currentStatus === "MOVING") {
      toast.info("Robot is moving", {
        theme: "colored",
        autoClose: 2000,
      });
    } else if (currentStatus === "IDLE") {
      toast.success("Robot is now idle", {
        theme: "colored",
        autoClose: 2000,
      });
    } else if (currentStatus === "STUCK") {
      toast.error("Robot encountered an error", {
        theme: "colored",
        autoClose: 3000,
      });
    }
  }, [telemetry?.status]);

  return (
    <>
      <PageHelmet
        title="Dashboard | Robot GCS"
        description="Monitor robot position, movement, telemetry, and system status."
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 text-slate-900">
        <Navbar />

        <main className="mx-auto max-w-7xl space-y-8 px-4 py-6">
          <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  <Radar size={16} />
                  Ground Control Station
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Robot Control Dashboard
                </h1>
                <p className="mt-2 text-slate-600">
                  Monitor robot status, control movement, and view the live
                  environment map.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Current Status
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {telemetry?.status?.replace('_', ' ') || "Unavailable"}
                </p>
              </div>
            </div>
          </section>

          <div
            className={`mb-3 p-3 rounded-lg text-sm flex items-center justify-between ${connected
                ? "bg-emerald-100 text-emerald-700"
                : "bg-yellow-900/50 text-yellow-400"
              }`}>
            <div>
              {connected
                ? "Live telemetry connected"
                : `Telemetry disconnected${socketError ? ` - ${socketError}` : ""}`}
            </div>
          </div>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                  <Bot size={22} />
                </div>
                <span className="text-xs font-medium text-blue-600">Robot</span>
              </div>
              <p className="text-sm text-slate-500">Robot ID</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {status?.id || "--"}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                  <Activity size={22} />
                </div>
                <span className="text-xs font-medium text-emerald-600">Live</span>
              </div>
              <p className="text-sm text-slate-500">Status</p>
              <p className={`mt-1 text-2xl font-bold text-slate-900 ${getStatusColor(telemetry?.status ?? '')}`}>
                {telemetry?.status?.replace('_', ' ') || "--"}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
                  <BatteryCharging size={22} />
                </div>
                <span className="text-xs font-medium text-amber-600">Power</span>
              </div>
              <p className="text-sm text-slate-500">Battery</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {telemetry?.battery ?? "--"}%
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-cyan-100 p-3 text-cyan-700">
                  <MapPinned size={22} />
                </div>
                <span className="text-xs font-medium text-cyan-600">Map</span>
              </div>
              <p className="text-sm text-slate-500">Position</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                ({telemetry?.position?.x ?? "--"},{" "}
                {telemetry?.position?.y ?? "--"})
              </p>
            </div>
            {lastUpdated && (
              <div className="text-xs text-gray-500 text-left">
                Updated: {formatTime(lastUpdated.toString() || "")}
              </div>
            )}
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RobotMapView
                map={map}
                telemetry={telemetry}
                isLoading={isLoading}
              />
            </div>

            {user?.role === "COMMANDER" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                    <MoveRight size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Move Robot
                    </h2>
                    <p className="text-sm text-slate-500">
                      Enter destination coordinates.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      X Coordinate
                    </label>
                    <input
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                      placeholder="Enter X value"
                      value={x}
                      onChange={(e) => {
                        if (parseInt(e.target.value) > 20) {
                          toast.error(
                            "❌ Input should be less than or equal to 20",
                          );

                          return;
                        }
                        setX(parseInt(e.target.value) || 0);
                      }}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Y Coordinate
                    </label>
                    <input
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                      placeholder="Enter Y value"
                      value={y}
                      onChange={(e) => {
                        if (parseInt(e.target.value) > 20) {
                          toast.error(
                            "❌ Input should be less than or equal to 20",
                          );

                          return;
                        }
                        setY(parseInt(e.target.value) || 0);
                      }}
                    />
                  </div>

                  <button
                    onClick={handleMove}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700">
                    {isLoadingMove ? (
                      <div className="animate-spin rounded-full h-[1.5rem] w-[1.5rem] border-b-2 border-white" />
                    ) : (
                      "Move Robot"
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    disabled={isLoadingReset}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700">
                    {isLoadingReset ? (
                      <div className="animate-spin rounded-full h-[1.5rem] w-[1.5rem] border-b-2 border-white" />
                    ) : (
                      "Reset Robot"
                    )}
                  </button>
                </div>

                {message && (
                  <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                    {message}
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </>

  );
};

export default Dashboard;
