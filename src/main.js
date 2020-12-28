import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripMenuTemplate} from "./view/trip-menu.js";
import {createTripFiltersTemplate} from "./view/trip-filters.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createTripListTemplate} from "./view/trip-list.js";
import {createEditPointTemplate} from "./view/trip-edit-point.js";
import {createNewPointTemplate} from "./view/trip-new-point.js";
import {createTripPointTemplate} from "./view/trip-point.js";
import {generatePoint} from "./mock/point.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const tripMainContainer = document.querySelector(`.trip-main`);
const tripControlsContainer = tripMainContainer.querySelector(`.trip-main__trip-controls`);
const tripEventsSection = document.querySelector(`.trip-events`);

render(tripMainContainer, createTripInfoTemplate(), `afterbegin`);
render(tripControlsContainer, createTripMenuTemplate(), `afterbegin`);
render(tripControlsContainer, createTripFiltersTemplate(), `beforeend`);
render(tripEventsSection, createTripSortTemplate(), `afterbegin`);
render(tripEventsSection, createTripListTemplate(), `beforeend`);

const tripList = tripEventsSection.querySelector(`.trip-events__list`);

render(tripList, createEditPointTemplate(points[0]), `afterbegin`);
render(tripList, createNewPointTemplate(), `beforeend`);

for (let i = 1; i < POINT_COUNT; i++) {
  render(tripList, createTripPointTemplate(points[i]), `beforeend`);
}
