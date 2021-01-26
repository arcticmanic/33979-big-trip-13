import AbstractView from "./abstract.js";

const createNewButtonTemplate = () => {
  return `
    <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>
  `;
};

export default class NewButton extends AbstractView {
  constructor() {
    super();

    this._newButtonClickHandler = this._newButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createNewButtonTemplate();
  }

  _newButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.newButtonClick();
  }

  setNewButtonClickHandler(callback) {
    this._callback.newButtonClick = callback;
    this.getElement().addEventListener(`click`, this._newButtonClickHandler);
  }
}
