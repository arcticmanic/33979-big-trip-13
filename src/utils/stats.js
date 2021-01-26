
import {POINT_TYPES} from "../const.js";

const getChartLabels = (points) => {
  const counts = calculateCountByPointType(points);
  let labels = [];
  counts.forEach((value, key) => {
    if (value > 0) {
      labels.push(key);
    }
  });
  return labels.sort();
};

const calculateCostByPointType = (points) => {
  let costs = new Map();
  POINT_TYPES.forEach((pointType) => costs.set(pointType, 0));
  points.forEach((point) => {
    costs.set(point.type, costs.get(point.type) + point.price);
  });
  return costs;
};

const calculateCountByPointType = (points) => {
  let counts = new Map();
  POINT_TYPES.forEach((pointType) => counts.set(pointType, 0));
  points.forEach((point) => {
    counts.set(point.type, counts.get(point.type) + 1);
  });
  return counts;
};

const calculateTimeByPointType = (points) => {
  let times = new Map();
  POINT_TYPES.forEach((pointType) => times.set(pointType, 0));
  points.forEach((point) => {
    const durationInMinutes = point.endTime.diff(point.startTime, `minute`);
    times.set(point.type, times.get(point.type) + durationInMinutes);
  });
  return times;
};

export {getChartLabels, calculateCostByPointType, calculateCountByPointType, calculateTimeByPointType};
