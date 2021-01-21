import dayjs from "dayjs";
import AbstractView from "./abstract.js";

const MAX_POINTS_COUNT = 3;

const createTripInfoTemplate = (points) => {
  let title = ``;
  let dates = ``;
  let cost = 0;

  if (points.length <= MAX_POINTS_COUNT) {
    points.forEach((element) => {
      title += `${element.destination.name} &mdash; `;
    });
    title = title.replace(new RegExp(`&mdash; ` + `$`), ``);
  } else {
    title = `${points[0].destination.name} &mdash; &hellip; &mdash; ${points[points.length - 1].destination.name}`;
  }

  dates = `${dayjs(points[0].startTime).format(`MMM D`)}&nbsp;&mdash;&nbsp;${dayjs(points[points.length - 1].endTime).format(`MMM D`)}`;

  points.forEach((element) => {
    cost += element.price;
    element.offers.forEach((offer) => {
      cost += offer.price;
    });
  });

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        <p class="trip-info__dates">${dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>
  `;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}
