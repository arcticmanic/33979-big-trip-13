import {POINT_TYPES} from "../const.js";

const MINUTES_PER_DAY = 1440;

const getChartLabels = (points) => {
  const counts = calculateCountByPointType(points);
  const labels = [];
  counts.forEach((value, key) => {
    if (value > 0) {
      labels.push(key);
    }
  });

  return labels.sort();
};

const calculateCostByPointType = (points) => {
  const costs = new Map();
  POINT_TYPES.forEach((pointType) => costs.set(pointType, 0));
  points.forEach((point) => {
    costs.set(point.type, costs.get(point.type) + point.price);
  });

  return costs;
};

const calculateCountByPointType = (points) => {
  const counts = new Map();
  POINT_TYPES.forEach((pointType) => counts.set(pointType, 0));
  points.forEach((point) => {
    counts.set(point.type, counts.get(point.type) + 1);
  });

  return counts;
};

const calculateTimeByPointType = (points) => {
  const times = new Map();
  POINT_TYPES.forEach((pointType) => times.set(pointType, 0));
  points.forEach((point) => {
    const durationInMinutes = point.endTime.diff(point.startTime, `minute`);
    times.set(point.type, times.get(point.type) + durationInMinutes);
  });
  const timesInDays = new Map();
  times.forEach((_, key) => timesInDays.set(key, Math.round(times.get(key) / MINUTES_PER_DAY)));
  return timesInDays;
};

export {getChartLabels, calculateCostByPointType, calculateCountByPointType, calculateTimeByPointType};
