import dayjs from "dayjs";
import {POINT_TYPES} from "../const.js";
import {getRandomInt} from "../utils.js";

const MIN_OFFERS_COUNT = 0;
const MAX_OFFERS_COUNT = 5;
const MIN_PRICE = 10;
const MAX_PRICE = 10000;
const OFFER_TITLES = [`Add luggage`, `Switch to comfort`, `Add meal`, `Choose seats`, `Travel by train`, `Rent a car`, `Order Uber`, `Add breakfast`];
const OFFER_PRICES = [20, 30, 40, 50, 10];
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const DESTINATIONS = [
  `London`,
  `Sydney`,
  `Munich`,
  `Oslo`,
  `Reykjavík`,
  `Lisboa`,
  `New York`,
  `Dublin`,
  `Calais`,
  `Tokio`,
  `Amsterdam`,
  `Kopenhagen`
];

const getRandomArrayElement = (arr) => {
  const randomIndex = getRandomInt(0, arr.length - 1);
  return arr[randomIndex];
};

const getRandomDate = () => {
  const minYear = 2019;
  const maxYear = 2021;
  const year = getRandomInt(minYear, maxYear);
  const month = getRandomInt(0, 11);
  const day = getRandomInt(1, 28);
  const hour = getRandomInt(0, 23);
  const minute = getRandomInt(0, 59);
  const date = new Date(year, month, day, hour, minute);
  return dayjs(date);
};

const generateOffers = (count) => {
  const offers = [];
  for (let i = 0; i < count; i++) {
    offers.push({
      type: getRandomArrayElement(POINT_TYPES),
      title: OFFER_TITLES[getRandomInt(0, OFFER_TITLES.length - 1)],
      price: OFFER_PRICES[getRandomInt(0, OFFER_PRICES.length - 1)]
    });
  }
  return offers;
};

const generatePoint = () => {
  const startTime = getRandomDate();
  const endTime = startTime
    .add(getRandomInt(1, 12), `hour`)
    .add(getRandomInt(0, 59), `minute`)
    .add(getRandomInt(0, 59), `second`);

  return {
    type: getRandomArrayElement(POINT_TYPES),
    destination: getRandomArrayElement(DESTINATIONS),
    offers: generateOffers(getRandomInt(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
    info: {
      description: getRandomArrayElement(DESCRIPTIONS),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
    startTime,
    endTime,
    isFavorite: Boolean(getRandomInt(0, 1))
  };
};

export {generatePoint};
