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

export const getExtraRatedCards = (cards, cardsCount) => {
  const sortedCards = cards.slice();
  sortedCards.sort((a, b) => b.rating > a.rating ? 1 : -1);

  const isAllZero = sortedCards.every((it) => it.rating === 0);

  if (isAllZero) {
    return null;
  } else {
    return sortedCards.slice(0, cardsCount);
  }
};

export const getExtraCommentedCards = (cards, cardsCount) => {
  const sortedCards = cards.slice();
  sortedCards.sort((a, b) => b.comments.length > a.comments.length ? 1 : -1);

  const isAllZero = sortedCards.every((it) => it.comments.length === 0);

  if (isAllZero) {
    return null;
  } else {
    return sortedCards.slice(0, cardsCount);
  }
};
