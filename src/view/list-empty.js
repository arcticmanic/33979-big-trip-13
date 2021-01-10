import {createElement} from "../utils.js";

const createListEmptyTemplate = () => {
  return `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
};

export default class ListEmpty {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createListEmptyTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
