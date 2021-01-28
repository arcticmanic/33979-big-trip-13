import dayjs from "dayjs";
import he from "he";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createDestinationElementTemplate = (element) => {
  return `
    <option value="${element.name}"></option>
  `;
};

const getOfferId = (title) => {
  return title.split(` `).join(`-`);
};

const createOfferItemTemplate = (offer, isChecked) => {
  const checkedAttribute = isChecked ? `checked` : ``;
  const offerId = `${getOfferId(offer.title)}`;
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="${offerId}" type="checkbox" name="event-offer-${offerId}" ${checkedAttribute}>
      <label class="event__offer-label" for="${offerId}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `;
};

const createOffersTemplate = (offers, selectedOffers) => {
  if (offers === null || offers.length === 0) {
    return ``;
  }
  let offersMarkup = offers.map(
      (element) => createOfferItemTemplate(element, selectedOffers.some(
          (selectedOffer) => selectedOffer.title === element.title && selectedOffer.price === element.price)
      )).join(``);
  return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersMarkup}
        </div>
      </section>
  `;
};

const createPhotoTemplate = (pic) => {
  return `
    <img class="event__photo" src="${pic.src}" alt="${pic.description}">
  `;
};

const createDestinationTemplate = (destination) => {
  if (destination === null) {
    return ``;
  }
  if (!destination.description && (destination.pictures === null || destination.pictures.length === 0)) {
    return ``;
  }
  const photosMarkup = destination.pictures.map((element) => createPhotoTemplate(element)).join(``);
  return `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosMarkup}
        </div>
      </div>
    </section>
  `;
};

const createButtonsTemplate = (isNew, destinationSelected = false) => {
  const resetBtnText = isNew ? `Cancel` : `Delete`;
  const rollupBtnClass = isNew ? `visually-hidden` : `event__rollup-btn`;
  return `
    <button class="event__save-btn  btn  btn--blue" type="submit" ${destinationSelected ? `` : `disabled`}>Save</button>
    <button class="event__reset-btn" type="reset">${resetBtnText}</button>
    <button class="${rollupBtnClass}" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;
};

const createEditPointTemplate = (data, destinations, allOffers) => {
  const {type, destination, price, startTime, endTime, offers, isNew} = data;
  const destinationName = destination === null ? `` : destination.name;
  const eventStartTime = startTime === null ? `` : dayjs(startTime).format(`DD/MM/YY HH:mm`);
  const eventEndTime = endTime === null ? `` : dayjs(endTime).format(`DD/MM/YY HH:mm`);
  const destinationsMarkup = destinations.map((element) => createDestinationElementTemplate(element)).join(``);
  const availableOffers = allOffers.find((element) => element.type === type.toLowerCase()).offers;
  const offersSectionMarkup = createOffersTemplate(availableOffers, offers);
  const destinationSectionMarkup = createDestinationTemplate(destination);
  const buttonsMarkup = createButtonsTemplate(isNew, destination !== null);

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
            <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1">
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
            <input class="event__input  event__input--price" id="event-price-1" type="text" pattern="[0-9]+" title="Integer number" name="event-price" value="${he.encode(price.toString())}">
          </div>
          ${buttonsMarkup}
        </header>
        <section class="event__details">
          ${offersSectionMarkup}
          ${destinationSectionMarkup}
        </section>
      </form>
    </li>
  `;
};

export default class TripEditPoint extends SmartView {
  constructor(point, destinations, availableOffers) {
    super();
    this._data = TripEditPoint.parsePointToData(point);
    this._destinations = destinations;
    this._availableOffers = availableOffers;
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._pointTypeToggleHandler = this._pointTypeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersSelectionChangedHandler = this._offersSelectionChangedHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  getTemplate() {
    return createEditPointTemplate(this._data, this._destinations, this._availableOffers);
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
    const rollupBtn = this.getElement().querySelector(`.event__rollup-btn`);
    if (rollupBtn !== null) {
      rollupBtn.addEventListener(`click`, this._rollupBtnClickHandler);
    }
  }

  static parsePointToData(point) {
    if (point === null) {
      return {
        type: `flight`,
        destination: null,
        price: 0,
        startTime: dayjs(),
        endTime: dayjs(),
        offers: [],
        isNew: true
      };
    }
    let data = Object.assign(
        {},
        point,
        {
          isNew: point.type === null
        }
    );
    data.offers = point.offers.slice();
    return data;
  }

  static parseDataToPoint(data) {
    let point = Object.assign({}, data);
    delete point.isNew;
    return point;
  }

  _pointTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: []
    });
  }

  _getDestinationByName(name) {
    return this._destinations.find((element) => element.name === name);
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    let optionFound = false;
    const datalist = evt.target.list;
    for (let j = 0; j < datalist.options.length; j++) {
      if (evt.target.value === datalist.options[j].value) {
        optionFound = true;
        break;
      }
    }
    if (optionFound) {
      evt.target.setCustomValidity(``);
      this.updateData({
        destination: this._getDestinationByName(evt.target.value)
      }, false);
    } else {
      evt.target.setCustomValidity(`Please select a valid value.`);
      this.updateData({
        destination: null
      }, false);
    }
  }

  _getOffersForType(type) {
    return this._availableOffers.find((element) => element.type === type.toLowerCase()).offers;
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    if (!evt.target.validity.valid) {
      this.updateData({
        price: 0
      }, false);
    } else {
      let priceStr = evt.target.value;
      if (priceStr === ``) {
        priceStr = `0`;
      }
      this.updateData({
        price: parseInt(priceStr, 10)
      }, false);
    }
  }

  _offersSelectionChangedHandler(evt) {
    evt.preventDefault();
    if (evt.target.checked) {
      this._data.offers.push(this._getOffersForType(this._data.type).find((o) => getOfferId(o.title) === evt.target.id));
      this.updateData({
        offers: this._data.offers
      }, true);
    } else {
      this.updateData({
        offers: this._data.offers.filter((o) => getOfferId(o.title) !== evt.target.id)
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
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);

    const offersElement = this.getElement().querySelector(`.event__available-offers`);
    if (offersElement !== null) {
      offersElement.addEventListener(`change`, this._offersSelectionChangedHandler);
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupBtnClickHandler(this._callback.editClick);
    this.setDeleteBtnClickHandler(this._callback.deleteClick);
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    if (this._data.isNew) {
      this._callback.deleteClick();
      return;
    }
    this._callback.deleteClick(TripEditPoint.parseDataToPoint(this._data));
  }

  setDeleteBtnClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
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
