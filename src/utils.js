export const setDateFormat = (date) => {
  return date < 10 ? `0${date}` : String(date);
};

export const getUserRank = (rankList, filters) => {
  const filmsWatchedAmount = filters.filter((filter) => filter.name === `history`).map((filter) => filter.count);
  let rankName = ``;
  for (const rank of rankList) {
    if (filmsWatchedAmount >= rank.minNumber && filmsWatchedAmount <= rank.maxNumber) {
      rankName = rank.name;
    }
  }
  return rankName;
};
