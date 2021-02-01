import TripEditPointView from "../view/trip-edit-point.js";
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

  init(destinationsModel, offersModel) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._pointEditComponent = new TripEditPointView(null, this._destinationsModel.getDestinations(), this._offersModel.getAllOffers());
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteBtnClickHandler(this._handleCancelClick);

    render(this._tripListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }
    this._changeData(
        UserAction.CANCEL_ADD_POINT,
        UpdateType.MEDIUM,
        null
    );
    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MEDIUM,
        point
    );
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
