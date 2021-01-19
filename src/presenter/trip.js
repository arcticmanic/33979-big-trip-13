import TripMenuView from "../view/trip-menu.js";
import TripFiltersView from "../view/trip-filters.js";
import TripInfoView from "../view/trip-info.js";
import TripSortView from "../view/trip-sort.js";
import TripListView from "../view/trip-list.js";
import ListEmptyView from "../view/list-empty.js";
import PointPresenter from "./point.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

const tripEventsContainer = document.querySelector(`.trip-events`);
const tripMenuContainer = document.querySelector(`.trip-main__trip-controls`);

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._listEmptyComponent = new ListEmptyView();
    this._tripSortComponent = new TripSortView();
    this._tripListComponent = new TripListView();
    this._changePointHandler = this._changePointHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    this._tripInfoComponent = new TripInfoView(this._tripPoints);
    this._tripMenuComponent = new TripMenuView();
    this._tripFiltersComponent = new TripFiltersView();
    this._renderTrip();
  }

  _renderTripMenu() {
    render(tripMenuContainer, this._tripMenuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    render(tripMenuContainer, this._tripFiltersComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(tripEventsContainer, this._tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderList() {
    render(tripEventsContainer, this._tripListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._changePointHandler, this._modeChangeHandler);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints.forEach((point) => this._renderPoint(point));
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderListEmpty() {
    render(tripEventsContainer, this._listEmptyComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    this._renderTripMenu();

    this._renderFilters();

    if (this._tripPoints.length === 0) {
      this._renderListEmpty();
      return;
    }
    this._renderTripInfo();

    this._renderSort();

    this._renderList();

    this._renderPoints();
  }

  _changePointHandler(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _modeChangeHandler() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
