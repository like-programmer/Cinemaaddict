const filterNames = [`all movies`, `watchlist`, `history`, `favorites`];

const getFilterNumber = (cards) => {
  const inWatchlistCount = (cards.filter((card) => card.filmInfo.userDetails.watchlist === true)).length;
  const inHistoryCount = (cards.filter((card) => card.filmInfo.userDetails.alreadyWatched === true)).length;
  const inFavouriteCount = (cards.filter((card) => card.filmInfo.userDetails.favourite === true)).length;
  return [null, inWatchlistCount, inHistoryCount, inFavouriteCount];
};

export const generateFilters = (cards) => {
  const filterNumbers = getFilterNumber(cards);

  return filterNames.map((it, i) => {
    return {
      name: it,
      count: filterNumbers[i]
    };
  });
};
