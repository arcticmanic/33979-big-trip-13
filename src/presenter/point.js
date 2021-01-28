import TripPointView from "../view/trip-point.js";
import TripEditPointView from "../view/trip-edit-point.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {isDatesEqual} from "../utils/common.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._arrowUpClickHandler = this._arrowUpClickHandler.bind(this);
    this._arrowDownClickHandler = this._arrowDownClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);
  }

  init(point, destinationsModel, offersModel) {
    this._point = point;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new TripPointView(point);
    this._pointEditComponent = new TripEditPointView(point, this._destinationsModel.getDestinations(), this._offersModel.getAllOffers());

    this._pointComponent.setRollupBtnClickHandler(this._arrowDownClickHandler);
    this._pointEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._pointEditComponent.setRollupBtnClickHandler(this._arrowUpClickHandler);
    this._pointComponent.setFavoriteBtnClickHandler(this._favoriteClickHandler);
    this._pointEditComponent.setDeleteBtnClickHandler(this._handleDeleteBtnClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToCard();
    }
  }

  _arrowDownClickHandler() {
    this._replaceCardToForm();
  }

  _isOffersEqual(offers1, offers2) {
    if (offers1 === null && offers2 === null) {
      return true;
    }
    if (offers1.length !== offers2.length) {
      return false;
    }
    for (let i = 0; i < offers1.length; i++) {
      let isInOffers2 = false;
      for (let j = 0; j < offers2.length; j++) {
        if (offers1[i].title === offers2[j].title && offers1[i].price === offers2[j].price) {
          isInOffers2 = true;
          break;
        }
      }
      if (!isInOffers2) {
        return false;
      }
    }
    return true;
  }

  _formSubmitHandler(update) {
    const isMajorUpdate =
      !isDatesEqual(this._point.startTime, update.startTime) ||
      this._point.price !== update.price ||
      this._point.destination.name !== update.destination.name ||
      !this._isOffersEqual(this._point.offers, update.offers);
    this._changeData(
        UserAction.UPDATE_POINT,
        isMajorUpdate ? UpdateType.MAJOR : UpdateType.PATCH,
        update
    );
    this._replaceFormToCard();
  }

  _handleDeleteBtnClick(point) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MAJOR,
        point
    );
  }

  _arrowUpClickHandler() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormToCard();
  }

  _favoriteClickHandler() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }
}
