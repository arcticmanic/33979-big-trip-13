import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();

    this._notify(updateType);
  }

  getOffers(type) {
    const offersForType = this._offers.find((o) => o.type.toLowerCase() === type.toLowerCase());
    if (offersForType) {
      return offersForType.offers;
    }
    return [];
  }

  getAllOffers() {
    return this._offers;
  }
}
