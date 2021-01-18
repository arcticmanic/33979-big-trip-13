const sortByDate = (a, b) => {
  if (a.startTime.isBefore(b.startTime)) {
    return -1;
  }
  if (a.startTime.isAfter(b.startTime)) {
    return 1;
  }
  return 0;
};

const sortByTime = (a, b) => {
  const durationA = a.endTime.diff(a.startTime, `minute`);
  const durationB = b.endTime.diff(b.startTime, `minute`);
  return durationB - durationA;
};

const getTotalPrice = (point) => {
  let cost = 0;
  cost += point.price;
  point.offers.forEach((offer) => {
    cost += offer.price;
  });
  return cost;
};

const sortByPrice = (a, b) => {
  return getTotalPrice(b) - getTotalPrice(a);
};

export {sortByDate, sortByTime, sortByPrice};
