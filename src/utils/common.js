import dayjs from "dayjs";

const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, `D`);
};

const isDateInFuture = (date) => {
  return dayjs(date).isSame(dayjs(), `minute`) || dayjs(date).isAfter(dayjs());
};

const isDateInPast = (date) => {
  return dayjs(date).isBefore(dayjs());
};

const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
};

export {isDatesEqual, isDateInFuture, isDateInPast, capitalize};
