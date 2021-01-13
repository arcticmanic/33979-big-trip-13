import AbstractView from "./abstract.js";

const createTripMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  `;
};

export default class TripMenu extends AbstractView {
  getTemplate() {
    return createTripMenuTemplate();
  }
}
