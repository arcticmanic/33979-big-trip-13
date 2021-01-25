import dayjs from "dayjs";

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, `D`);
};

const isDateInFuture = (date) => {
  return dayjs(date).isSame(dayjs(), `minute`) || dayjs(date).isAfter(dayjs());
};

const isDateInPast = (date) => {
  return dayjs(date).isBefore(dayjs());
};

export {getRandomInt, isDatesEqual, isDateInFuture, isDateInPast};
