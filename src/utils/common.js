export const getUserRank = (rankList, filters) => {
  const [filmsWatchedAmount] = filters.filter((filter) => filter.name === `history`).map((filter) => filter.count);
  let rankName = ``;
  for (const rank of rankList) {
    if (filmsWatchedAmount >= rank.minNumber && filmsWatchedAmount <= rank.maxNumber) {
      rankName = rank.name;
    }
  }
  return rankName;
};

export const setRuntimeFormat = (value) => {
  const hours = value / 60;
  const minutes = value % 60;
  return hours > 1 ? `${parseInt(hours, 10)}h ${minutes}m` : `${minutes}m`;
};
