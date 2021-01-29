import dayjs from "dayjs";
import Observer from "../utils/observer.js";
import {capitalize} from "../utils/common.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error(`Can't update non-existing point`);
    }
    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete non-existing point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          price: point.base_price,
          startTime: point.date_from !== null ? dayjs(new Date(point.date_from)) : point.date_from,
          endTime: point.date_to !== null ? dayjs(new Date(point.date_to)) : point.date_to,
          isFavorite: point.is_favorite,
        }
    );

    adaptedPoint.type = capitalize(adaptedPoint.type);

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "base_price": point.price,
          "date_from": point.startTime instanceof dayjs ? point.startTime.toISOString() : null,
          "date_to": point.endTime instanceof dayjs ? point.endTime.toISOString() : null,
          "is_favorite": point.isFavorite,
        }
    );

    adaptedPoint.type = adaptedPoint.type.toLowerCase();

    delete adaptedPoint.price;
    delete adaptedPoint.startTime;
    delete adaptedPoint.endTime;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
