import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import DestinationsModel from "./model/destinations.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
import {UpdateType} from "./const.js";

const AUTHORIZATION = `Basic kagfjwonchia4961vj`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const tripMainContainer = document.querySelector(`.trip-main`);
const tripMenuContainer = tripMainContainer.querySelector(`.trip-main__trip-controls`);

const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();

const pointsModel = new PointsModel();
api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

const destinationsModel = new DestinationsModel();
api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.INIT_DESTINATIONS, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.INIT_DESTINATIONS, []);
  });

const offersModel = new OffersModel();
api.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.INIT_OFFERS, offers);
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.INIT_OFFERS, []);
  });

const tripPresenter = new TripPresenter(tripMainContainer, pointsModel, filterModel, destinationsModel, offersModel, api);
const filterPresenter = new FilterPresenter(tripMenuContainer, filterModel, pointsModel, offersModel, destinationsModel);

filterPresenter.init();
tripPresenter.init();
