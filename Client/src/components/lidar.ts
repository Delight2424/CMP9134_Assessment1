export const getLidarSummary = (lidar: number[]) => {
  if (!lidar.length) {
    return {
      closest: 0,
      furthest: 0,
      average: 0,
      scanPoints: 0,
      front: 0,
      right: 0,
      back: 0,
      left: 0,
    };
  }

  const closest = Math.min(...lidar);
  const furthest = Math.max(...lidar);
  const average = lidar.reduce((sum, value) => sum + value, 0) / lidar.length;

  return {
    closest,
    furthest,
    average: Number(average.toFixed(2)),
    scanPoints: lidar.length,
    front: lidar[0] ?? 0,
    right: lidar[90] ?? 0,
    back: lidar[180] ?? 0,
    left: lidar[270] ?? 0,
  };
};
