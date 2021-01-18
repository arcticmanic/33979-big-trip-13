import {generatePoint} from "./mock/point.js";
import TripPresenter from "./presenter/trip.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
points.sort((a, b) => {
  if (a.startTime.isBefore(b.startTime)) {
    return -1;
  }
  if (a.startTime.isAfter(b.startTime)) {
    return 1;
  }
  return 0;
});

const tripMainContainer = document.querySelector(`.trip-main`);
const tripPresenter = new TripPresenter(tripMainContainer);
tripPresenter.init(points);
