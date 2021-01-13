import TripInfoView from "./view/trip-info.js";
import TripMenuView from "./view/trip-menu.js";
import TripFiltersView from "./view/trip-filters.js";
import TripSortView from "./view/trip-sort.js";
import TripListView from "./view/trip-list.js";
import TripEditPointView from "./view/trip-edit-point.js";
import TripNewPointView from "./view/trip-new-point.js";
import TripPointView from "./view/trip-point.js";
import ListEmptyView from "./view/list-empty.js";
import {generatePoint} from "./mock/point.js";
import {render, RenderPosition, replace} from "./utils/render.js";

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

const renderPoint = (pointListElement, point) => {
  const pointComponent = new TripPointView(point);
  const pointEditComponent = new TripEditPointView(point);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceCardToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, pointEditComponent);
  };

  pointComponent.setRollupBtnClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setRollupBtnClickHandler(() => {
    replaceFormToCard();
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

const tripMainContainer = document.querySelector(`.trip-main`);
const tripMenuContainer = tripMainContainer.querySelector(`.trip-main__trip-controls`);

render(tripMenuContainer, new TripMenuView(), RenderPosition.AFTERBEGIN);
render(tripMenuContainer, new TripFiltersView(), RenderPosition.BEFOREEND);

const renderTripBoard = (tripPoints) => {
  const tripEventsSection = document.querySelector(`.trip-events`);

  if (tripPoints.length === 0) {
    render(tripEventsSection, new ListEmptyView(), RenderPosition.AFTERBEGIN);
    return;
  } else {
    render(tripMainContainer, new TripInfoView(tripPoints), RenderPosition.AFTERBEGIN);
    render(tripEventsSection, new TripSortView(), RenderPosition.AFTERBEGIN);

    const tripListComponent = new TripListView();
    render(tripEventsSection, tripListComponent, RenderPosition.BEFOREEND);
    render(tripListComponent, new TripNewPointView(), RenderPosition.BEFOREEND);

    for (let i = 0; i < POINT_COUNT; i++) {
      renderPoint(tripListComponent, tripPoints[i]);
    }
  }
};

renderTripBoard(points);
