import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createTripMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" data-menu-item="${MenuItem.TABLE}" href="#">Table</a>
      <a class="trip-tabs__btn" data-menu-item="${MenuItem.STATS}" href="#">Stats</a>
    </nav>
  `;
};

export default class TripMenu extends AbstractView {
  constructor() {
    super();
    this._activeItem = MenuItem.TABLE;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createTripMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (this._activeItem === evt.target.dataset.menuItem) {
      return;
    }
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  getActiveMenuItem() {
    return this._activeItem;
  }

  setMenuItem(menuItem) {
    if (this._activeItem === menuItem) {
      return;
    }
    this._activeItem = menuItem;
    const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);

    if (item !== null) {
      const allItems = this.getElement().querySelectorAll(`.trip-tabs__btn`);
      allItems.forEach((element) => element.classList.remove(`trip-tabs__btn--active`));
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
