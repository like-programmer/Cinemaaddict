export const setDateFormat = (date) => {
  return date < 10 ? `0${date}` : String(date);
};

export const getUserRank = (rankList, filmsAmount) => {
  let rankName = ``;
  for (const rank of rankList) {
    if (filmsAmount >= rank.minNumber && filmsAmount <= rank.maxNumber) {
      rankName = rank.name;
    }
  }
  return rankName;
};
