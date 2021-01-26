import TripEditPointView from "../view/trip-edit-point.js";
import {generateId} from "../mock/point.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class NewPoint {
  constructor(tripListContainer, changeData) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new TripEditPointView(null);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteBtnClickHandler(this._handleCancelClick);

    render(this._tripListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MAJOR,
        // Пока у нас нет сервера, который бы после сохранения
        // выдывал честный id точки, нам нужно позаботиться об этом самим
        Object.assign({id: generateId()}, point)
    );
    this.destroy();
  }

  _handleCancelClick() {
    this._changeData(
        UserAction.CANCEL_ADD_POINT,
        UpdateType.MAJOR,
        null
    );
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._changeData(
          UserAction.CANCEL_ADD_POINT,
          UpdateType.MAJOR,
          null
      );
      this.destroy();
    }
  }
}
