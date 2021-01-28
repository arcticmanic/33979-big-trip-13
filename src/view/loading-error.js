import AbstractView from "./abstract.js";

const createLoadingTemplate = () => {
  return `<p class="trip-events__msg">Something went wrong :(</p>`;
};

export default class LoadingError extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
