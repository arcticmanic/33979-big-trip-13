import {FilterType} from "../const.js";
import {isDateInFuture, isDateInPast} from "./common";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateInFuture(point.startTime)),
  [FilterType.PAST]: (points) => points.filter((point) => isDateInPast(point.endTime))
};
