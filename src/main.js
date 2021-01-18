import {generatePoint} from "./mock/point.js";
import TripPresenter from "./presenter/trip.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const tripMainContainer = document.querySelector(`.trip-main`);
const tripPresenter = new TripPresenter(tripMainContainer);
tripPresenter.init(points);
