import dayjs from "dayjs";
import AbstractView from "./abstract.js";
import {toFormattedString} from "../utils.js";

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;

const getEventDuration = (startTime, endTime) => {
  const durationInMinutes = endTime.diff(startTime, `minute`);
  if (durationInMinutes < MINUTES_PER_HOUR) {
    return `${toFormattedString(durationInMinutes, 2)}M`;
  } else if (durationInMinutes < MINUTES_PER_DAY) {
    const hours = Math.floor(durationInMinutes / MINUTES_PER_HOUR);
    const minutes = durationInMinutes % MINUTES_PER_HOUR;
    return `${toFormattedString(hours, 2)}H ${toFormattedString(minutes, 2)}M`;
  } else {
    const days = Math.floor(durationInMinutes / MINUTES_PER_DAY);
    const hours = Math.floor((durationInMinutes - days * MINUTES_PER_DAY) / MINUTES_PER_HOUR);
    const minutes = durationInMinutes - days * MINUTES_PER_DAY - hours * MINUTES_PER_HOUR;
    return `${toFormattedString(days, 2)}D ${toFormattedString(hours, 2)}H ${toFormattedString(minutes, 2)}M`;
  }
};

const createOfferTemplate = (offer) => {
  return `
  <li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&nbsp;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`;
};

const createTripPointTemplate = (point) => {
  const {type, destination, price, startTime, endTime, offers, isFavorite} = point;

  const date = dayjs(startTime).format(`MMM D YYYY`);
  const eventStartTime = dayjs(startTime).format(`HH:mm`);
  const eventEndTime = dayjs(endTime).format(`HH:mm`);

  const favoriteBtnClass = isFavorite ?
    `event__favorite-btn event__favorite-btn--active` :
    `event__favorite-btn`;

  const createOffersTemplate = () => offers.map((element) => createOfferTemplate(element)).join(``);

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startTime.toISOString()}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTime.toISOString()}">${eventStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTime.toISOString()}">${eventEndTime}</time>
          </p>
          <p class="event__duration">${getEventDuration(startTime, endTime)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate()}
        </ul>
        <button class="${favoriteBtnClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class TripPoint extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._favoriteBtnClickHandler = this._favoriteBtnClickHandler.bind(this);
  }

  getTemplate() {
    return createTripPointTemplate(this._point);
  }

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setRollupBtnClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupBtnClickHandler);
  }

  _favoriteBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteBtnClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteBtnClickHandler);
  }
}
