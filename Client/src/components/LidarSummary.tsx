import { getLidarSummary } from "./lidar";

type Props = {
  lidar: number[];
};

const LidarSummary = ({ lidar }: Props) => {
  const summary = getLidarSummary(lidar);

  const items = [
    { label: "Closest Object", value: summary.closest },
    { label: "Furthest Reading", value: summary.furthest },
    { label: "Average Range", value: summary.average },
    { label: "Scan Points", value: summary.scanPoints },
    { label: "Front", value: summary.front },
    { label: "Right", value: summary.right },
    { label: "Back", value: summary.back },
    { label: "Left", value: summary.left },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-4 text-lg font-semibold">LiDAR Summary</h3>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-slate-950 p-3">
            <p className="text-xs text-slate-400">{item.label}</p>
            <p className="mt-1 text-xl font-bold text-cyan-300">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LidarSummary;
