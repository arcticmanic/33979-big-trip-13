import dayjs from "dayjs";
import {POINT_TYPES} from "../const.js";
import {getRandomInt} from "../utils/common.js";

const MIN_OFFERS_COUNT = 0;
const MAX_OFFERS_COUNT = 5;
const MIN_PRICE = 10;
const MAX_PRICE = 10000;
const MIN_PHOTOS_COUNT = 1;
const MAX_PHOTOS_COUNT = 6;
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

const generatePhotos = (count) => {
  const photos = [];
  let photoPath = ``;
  for (let i = 0; i < count; i++) {
    photoPath = `http://picsum.photos/248/152?r=${Math.random()}`;
    photos.push(photoPath);
  }
  return photos;
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

const generateOffers = () => {
  const offers = [];
  POINT_TYPES.forEach((pointType) => {
    const offersCount = getRandomInt(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT);
    for (let i = 0; i < offersCount; i++) {
      offers.push({
        type: pointType,
        title: `${pointType} offer ${i}`,
        price: OFFER_PRICES[getRandomInt(0, OFFER_PRICES.length - 1)]
      });
    }
  });
  return offers;
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generatePoint = () => {
  const startTime = getRandomDate();
  const endTime = startTime
    .add(getRandomInt(1, 12), `hour`)
    .add(getRandomInt(0, 59), `minute`)
    .add(getRandomInt(0, 59), `second`);
  const pointType = getRandomArrayElement(POINT_TYPES);
  const availableOffers = OFFERS.filter((offer) => offer.type === pointType);
  let selectedOffers = [];
  availableOffers.forEach((offer) => {
    const isSelected = Boolean(getRandomInt(0, 1));
    if (isSelected) {
      selectedOffers.push(offer);
    }
  });

  return {
    id: generateId(),
    type: pointType,
    destination: getRandomArrayElement(DESTINATIONS),
    offers: selectedOffers,
    info: {
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: generatePhotos(getRandomInt(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT))
    },
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
    startTime,
    endTime,
    isFavorite: Boolean(getRandomInt(0, 1))
  };
};

let OFFERS = generateOffers();

export {generatePoint, DESTINATIONS, OFFERS};
