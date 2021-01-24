import dayjs from "dayjs";
import {DESTINATIONS, OFFERS} from "../mock/point.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createDestinationElementTemplate = (element) => {
  return `
    <option value="${element.name}"></option>
  `;
};

const createOfferTemplate = (offer, isChecked) => {
  const checkedAttribute = isChecked ? `checked` : ``;
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${checkedAttribute}>
      <label class="event__offer-label" for="${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `;
};

const createPhotoTemplate = (imgPath) => {
  return `
    <img class="event__photo" src="${imgPath}" alt="Event photo">
  `;
};

const createDestinationTemplate = (destination) => {
  if (!destination.description && (destination.photos === null || destination.photos.length === 0)) {
    return ``;
  }
  const photosMarkup = destination.photos.map((element) => createPhotoTemplate(element)).join(``);
  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosMarkup}
        </div>
      </div>
    </section>
  `;
};

const createEditPointTemplate = (data) => {
  const {type, destination, price, startTime, endTime, offers} = data;

  const eventStartTime = dayjs(startTime).format(`DD/MM/YY HH:mm`);
  const eventEndTime = dayjs(endTime).format(`DD/MM/YY HH:mm`);

  const destinationsMarkup = DESTINATIONS.map((element) => createDestinationElementTemplate(element)).join(``);
  const availableOffers = OFFERS.filter((offer) => offer.type.toLowerCase() === data.type.toLowerCase());
  const offersMarkup = availableOffers.map((element) => createOfferTemplate(element, offers.includes(element))).join(``);
  const destinationSectionMarkup = createDestinationTemplate(destination);

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon" />
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox" value="${type}" />
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="taxi" />
                  <label class="event__type-label event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="bus" />
                  <label class="event__type-label event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="train" />
                  <label class="event__type-label event__type-label--train" for="event-type-train-1">Train</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="ship" />
                  <label class="event__type-label event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="transport" />
                  <label class="event__type-label event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="drive" />
                  <label class="event__type-label event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="flight">
                  <label class="event__type-label event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="check-in" />
                  <label class="event__type-label event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="sightseeing" />
                  <label class="event__type-label event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="restaurant" />
                  <label class="event__type-label event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationsMarkup}
            </datalist>
          </div>
          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartTime}" />
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndTime}" />
          </div>
          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value="${price}" />
          </div>
          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersMarkup}
            </div>
          </section>
          ${destinationSectionMarkup}
        </section>
      </form>
    </li>
  `;
};

export default class TripEditPoint extends SmartView {
  constructor(point) {
    super();
    this._data = TripEditPoint.parsePointToData(point);
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._pointTypeToggleHandler = this._pointTypeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._offersSelectionChangedHandler = this._offersSelectionChangedHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  getTemplate() {
    return createEditPointTemplate(this._data);
  }

  reset(point) {
    this.updateData(
        TripEditPoint.parsePointToData(point)
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripEditPoint.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setRollupBtnClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupBtnClickHandler);
  }

  static parsePointToData(point) {
    let data = Object.assign({}, point);
    data.offers = point.offers.slice();

    return data;
  }

  static parseDataToPoint(data) {
    let point = Object.assign({}, data);

    return point;
  }

  _pointTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  _getDestinationByName(name) {
    return DESTINATIONS.find((element) => element.name === name);
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: this._getDestinationByName(evt.target.value)
    }, false);
  }

  _offersSelectionChangedHandler(evt) {
    evt.preventDefault();
    if (evt.target.checked) {
      this._data.offers.push(OFFERS.find((o) => o.id === evt.target.id));
      this.updateData({
        offers: this._data.offers
      }, true);
    } else {
      this.updateData({
        offers: this._data.offers.filter((o) => o.id !== evt.target.id)
      }, true);
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._pointTypeToggleHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationToggleHandler);
    this.getElement()
      .querySelector(`.event__available-offers`)
      .addEventListener(`change`, this._offersSelectionChangedHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupBtnClickHandler(this._callback.editClick);
  }

  _setDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          default: `today`,
          onChange: this._startTimeChangeHandler
        }
    );
    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          default: `today`,
          minDate: this._data.startTime.toDate(),
          onChange: this._endTimeChangeHandler
        }
    );
  }

  _startTimeChangeHandler([userDate]) {
    let newDate = dayjs(userDate);
    if (newDate.isAfter(this._data.endTime)) {
      this._data.endTime = newDate;
    }
    this.updateData({
      startTime: dayjs(userDate)
    });
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      endTime: dayjs(userDate)
    });
  }
}
