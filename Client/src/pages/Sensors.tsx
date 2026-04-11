import { useMemo } from "react";
import {
  Compass,
  Radar,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";

import { getLidarSummary } from "../components/lidar";
import type { TelemetryData } from "../types";
import PageHelmet from "../components/PageHelmet ";

interface SensorsProps {
  telemetry: TelemetryData | null;
  socketError: string;
  isLoading: boolean;
}
const Sensors: React.FC<SensorsProps> = ({
  telemetry,
  socketError,
  isLoading,
}) => {
  const lidarSummary = useMemo(() => {
    return getLidarSummary(telemetry?.sensors?.lidar || []);
  }, [telemetry]);

  const keyAngles = [
    { label: "0° Front", value: telemetry?.sensors?.lidar?.[0] ?? "--" },
    { label: "45°", value: telemetry?.sensors?.lidar?.[45] ?? "--" },
    { label: "90° Right", value: telemetry?.sensors?.lidar?.[90] ?? "--" },
    { label: "135°", value: telemetry?.sensors?.lidar?.[135] ?? "--" },
    { label: "180° Back", value: telemetry?.sensors?.lidar?.[180] ?? "--" },
    { label: "225°", value: telemetry?.sensors?.lidar?.[225] ?? "--" },
    { label: "270° Left", value: telemetry?.sensors?.lidar?.[270] ?? "--" },
    { label: "315°", value: telemetry?.sensors?.lidar?.[315] ?? "--" },
  ];

  return (
    <>
    <PageHelmet
        title="Lidar & Sensor | Robot GCS"
        description="View Lidar sensor data and summary statistics."
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
              <h1 className="text-2xl font-bold text-slate-900">
                Sensors & LiDAR
              </h1>
              <p className="text-slate-500">
                View directional sensor readings and LiDAR scan summary.
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-500">Loading sensors...</p>
          </div>
        ) : socketError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-red-600">{socketError}</p>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-slate-700">
                  <ArrowUp size={18} />
                  <span className="font-medium">North</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {telemetry?.sensors?.N ?? "--"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-slate-700">
                  <ArrowDown size={18} />
                  <span className="font-medium">South</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {telemetry?.sensors?.S ?? "--"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-slate-700">
                  <ArrowRight size={18} />
                  <span className="font-medium">East</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {telemetry?.sensors?.E ?? "--"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-slate-700">
                  <ArrowLeft size={18} />
                  <span className="font-medium">West</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {telemetry?.sensors?.W ?? "--"}
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-violet-100 p-3 text-violet-700">
                    <Compass size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      LiDAR Summary
                    </h2>
                    <p className="text-sm text-slate-500">
                      Key distance readings from the 360° LiDAR scan
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Closest Object</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {lidarSummary.closest}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Furthest Reading</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {lidarSummary.furthest}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Average Range</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {lidarSummary.average}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Scan Points</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {lidarSummary.scanPoints}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Front</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {lidarSummary.front}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Right</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {lidarSummary.right}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Back</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {lidarSummary.back}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Left</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {lidarSummary.left}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Key Angle Readings
                </h2>

                <div className="space-y-3">
                  {keyAngles.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-slate-600">
                        {item.label}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Raw LiDAR Sample
              </h2>
              <div className="overflow-x-auto rounded-xl bg-slate-50 p-4">
                <pre className="text-xs text-slate-700">
                  {JSON.stringify(
                    (telemetry?.sensors?.lidar || []).slice(0, 60),
                    null,
                    2,
                  )}
                </pre>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
    </>

  );
};

export default Sensors;
