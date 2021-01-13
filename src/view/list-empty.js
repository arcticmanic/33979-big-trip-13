import AbstractView from "./abstract.js";

const createListEmptyTemplate = () => {
  return `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
};

export default class ListEmpty extends AbstractView {
  getTemplate() {
    return createListEmptyTemplate();
  }
}
