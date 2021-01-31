import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const SortItems = [
  {id: `day`, title: `Day`, value: SortType.DEFAULT, isDisabled: false},
  {id: `event`, title: `Event`, value: SortType.EVENT, isDisabled: true},
  {id: `time`, title: `Time`, value: SortType.TIME, isDisabled: false},
  {id: `price`, title: `Price`, value: SortType.PRICE, isDisabled: false},
  {id: `offer`, title: `Offers`, value: SortType.OFFER, isDisabled: true}
];

const createSortItemTemplate = (id, title, sortType, activeSortType, isDisabled) => {
  const isChecked = sortType === activeSortType;
  return `<div class="trip-sort__item  trip-sort__item--${id}">
    <input id="sort-${id}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="${sortType}" ${isDisabled ? `disabled` : ``} ${isChecked ? `checked` : ``}>
    <label class="trip-sort__btn" for="sort-${id}">${title}</label>
  </div>
  `;
};

const createTripSortTemplate = (activeSortType) => {
  const sortItemsMarkup = SortItems.reduce(
      (acc, cur) => acc + createSortItemTemplate(cur.id, cur.title, cur.value, activeSortType, cur.isDisabled),
      ``);
  return `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortItemsMarkup}
    </form>
  `;
};

export default class TripSort extends AbstractView {
  constructor(activeSortType) {
    super();
    this._activeSortType = activeSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripSortTemplate(this._activeSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.matches(`input[type="radio"]`) && !evt.target.disabled) {
      this._callback.sortTypeChange(evt.target.value);
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
