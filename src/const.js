
const SortType = {
  DEFAULT: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
  EVENT: `sort-event`,
  OFFER: `sort-offer`
};

const POINT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`,
  CANCEL_ADD_POINT: `CANCEL_ADD_POINT`
};

const UpdateType = {
  MINOR: `MINOR`,
  MEDIUM: `MEDIUM`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
  INIT_DESTINATIONS: `INIT_DESTINATIONS`,
  INIT_OFFERS: `INIT_OFFERS`
};

const FilterType = {
  EVERYTHING: `everything`,
  PAST: `past`,
  FUTURE: `future`
};

const MenuItem = {
  TABLE: `TABLE`,
  STATS: `STATS`
};

export {POINT_TYPES, SortType, UserAction, UpdateType, FilterType, MenuItem};
