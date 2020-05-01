const filterNames = [`all movies`, `watchlist`, `history`, `favorites`];

const getFilterNumber = (cards) => {
  const inWatchlistCount = (cards.filter((card) => card.isInWatchlist === true)).length;
  const inHistoryCount = (cards.filter((card) => card.isWatched === true)).length;
  const inFavouriteCount = (cards.filter((card) => card.isFavourite === true)).length;
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
