import TripMenuView from "../view/trip-menu.js";
import TripInfoView from "../view/trip-info.js";
import TripSortView from "../view/trip-sort.js";
import TripListView from "../view/trip-list.js";
import ListEmptyView from "../view/list-empty.js";
import NewButtonView from "../view/new-button.js";
import StatisticsView from "../view/statistics.js";
import LoadingView from "../view/loading.js";
import LoadingErrorView from "../view/loading-error.js";
import PointPresenter from "./point.js";
import NewPointPresenter from "./new-point.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {FilterType, SortType, UpdateType, UserAction, MenuItem} from "../const.js";
import {sortByDate, sortByTime, sortByPrice} from "../utils/sort.js";
import {filter} from "../utils/filter.js";

const tripEventsContainer = document.querySelector(`.trip-events`);
const tripMenuContainer = document.querySelector(`.trip-main__trip-controls`);

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, destinationsModel, offersModel, api) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isPointsLoading = true;
    this._isDestinationsLoading = true;
    this._isOffersLoading = true;
    this._api = api;
    this._listEmptyComponent = new ListEmptyView();
    this._tripSortComponent = new TripSortView();
    this._tripListComponent = new TripListView();
    this._newButtonComponent = new NewButtonView();
    this._loadingComponent = new LoadingView();
    this._loadingErrorComponent = new LoadingErrorView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._handleNewButtonClick = this._handleNewButtonClick.bind(this);
    this._handleTripMenuClick = this._handleTripMenuClick.bind(this);

    this._newPointPresenter = new NewPointPresenter(this._tripListComponent, this._handleViewAction);
  }

  init() {
    this._tripInfoComponent = new TripInfoView(this._getPoints());
    this._tripMenuComponent = new TripMenuView();
    this._statsComponent = new StatisticsView(this._pointsModel.getPoints());
    this._newButtonComponent.setNewButtonClickHandler(this._handleNewButtonClick);
    this._tripMenuComponent.setMenuClickHandler(this._handleTripMenuClick);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._newPointPresenter.destroy();
    this._clearPointsList();
    remove(this._tripSortComponent);
    this._currentSortType = SortType.DEFAULT;

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._destinationsModel.removeObserver(this._handleModelEvent);
    this._offersModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortByDate);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  _renderTripMenu() {
    render(tripMenuContainer, this._tripMenuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNewButton() {
    render(this._tripContainer, this._newButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    if (this._tripInfoComponent !== null) {
      this._tripInfoComponent = null;
    }

    this._tripInfoComponent = new TripInfoView(this._getPoints());
    render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._tripSortComponent !== null) {
      this._tripSortComponent = null;
    }

    this._tripSortComponent = new TripSortView();
    this._tripSortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    render(tripEventsContainer, this._tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderList() {
    render(tripEventsContainer, this._tripListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleViewAction, this._modeChangeHandler);
    pointPresenter.init(point, this._destinationsModel, this._offersModel);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _renderLoading() {
    render(tripEventsContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadingError() {
    render(tripEventsContainer, this._loadingErrorComponent, RenderPosition.AFTERBEGIN);
  }

  _renderListEmpty() {
    render(tripEventsContainer, this._listEmptyComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._isPointsLoading || this._isOffersLoading || this._isDestinationsLoading) {
      this._renderLoading();
      return;
    }

    remove(this._loadingComponent);

    if (this._destinationsModel.getDestinations().length === 0 ||
        this._offersModel.getAllOffers().length === 0) {
      this._renderLoadingError();
      return;
    }

    this._renderTripMenu();
    this._renderNewButton();

    if (this._getPoints().length === 0) {
      this._renderListEmpty();
      this._renderList();
      return;
    }
    this._renderTripInfo();

    this._renderSort();

    this._renderList();

    this._renderPoints();
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearTrip() {
    this._newPointPresenter.destroy();
    this._clearPointsList();
    remove(this._tripMenuComponent);
    remove(this._tripInfoComponent);
    remove(this._tripSortComponent);
    remove(this._tripListComponent);
    this._currentSortType = SortType.DEFAULT;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          });
        break;
      case UserAction.ADD_POINT:
        this._newButtonComponent.getElement().disabled = false;
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
      case UserAction.CANCEL_ADD_POINT:
        this._newButtonComponent.getElement().disabled = false;
        if (this._pointsModel.getPoints().length === 0) {
          this._renderListEmpty();
        }
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data, this._destinationsModel, this._offersModel);
        break;
      case UpdateType.MINOR:
        this._clearPointsList();
        this._renderPoints();
        break;
      case UpdateType.MAJOR:
        this._clearTrip();
        this.destroy();
        this.init();
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isPointsLoading = false;
        this._renderTrip();
        break;
      case UpdateType.INIT_DESTINATIONS:
        this._isDestinationsLoading = false;
        this._renderTrip();
        break;
      case UpdateType.INIT_OFFERS:
        this._isOffersLoading = false;
        this._renderTrip();
    }
  }

  _modeChangeHandler() {
    this._newPointPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearPointsList();
    this._renderPoints();
  }

  _handleNewButtonClick() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (this._tripMenuComponent.getActiveMenuItem() === MenuItem.STATS) {
      this._handleTripMenuClick(MenuItem.TABLE);
    }
    this._newButtonComponent.getElement().disabled = true;
    remove(this._listEmptyComponent);
    this._newPointPresenter.init(this._destinationsModel, this._offersModel);
  }

  _handleTripMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.TABLE:
        remove(this._statsComponent);
        this._tripMenuComponent.setMenuItem(MenuItem.TABLE);
        this._clearTrip();
        this.init();
        this._renderTrip();
        break;
      case MenuItem.STATS:
        this._tripMenuComponent.setMenuItem(MenuItem.STATS);
        this.destroy();
        this._statsComponent = new StatisticsView(this._pointsModel.getPoints());
        render(tripEventsContainer, this._statsComponent, RenderPosition.BEFOREEND);
        break;
    }
  }
}
