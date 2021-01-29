import PointsModel from "./model/points.js";
import DestinationsModel from "./model/destinations.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api/api.js";
import {UpdateType} from "./const.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic vhz0YftSgpDVoqPot`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const STORE_POINTS_NAME = `${STORE_NAME}-points`;
const STORE_DESTINATIONS_NAME = `${STORE_NAME}-destinations`;
const STORE_OFFERS_NAME = `${STORE_NAME}-offers`;

const tripMainContainer = document.querySelector(`.trip-main`);
const tripMenuContainer = tripMainContainer.querySelector(`.trip-main__trip-controls`);

const api = new Api(END_POINT, AUTHORIZATION);

const pointsStore = new Store(STORE_POINTS_NAME, window.localStorage);
const destinationsStore = new Store(STORE_DESTINATIONS_NAME, window.localStorage);
const offersStore = new Store(STORE_OFFERS_NAME, window.localStorage);

const apiWithProvider = new Provider(api, pointsStore, destinationsStore, offersStore);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();

apiWithProvider.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

const destinationsModel = new DestinationsModel();

apiWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.INIT_DESTINATIONS, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.INIT_DESTINATIONS, []);
  });

const offersModel = new OffersModel();

apiWithProvider.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.INIT_OFFERS, offers);
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.INIT_OFFERS, []);
  });

const tripPresenter = new TripPresenter(tripMainContainer, pointsModel, filterModel, destinationsModel, offersModel, apiWithProvider);
const filterPresenter = new FilterPresenter(tripMenuContainer, filterModel, pointsModel, offersModel, destinationsModel);

filterPresenter.init();
tripPresenter.init();

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
