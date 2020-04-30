const generateFilmCard = () => {
  return {
    title: `The Godfather`,
    originalTitle: `The Godfather`,
    poster: `./images/posters/the-man-with-the-golden-arm.jpg`,
    description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback.`,
    rating: `8.1`,
    userRate: `7.6`,
    releaseDate: new Date(),
    duration: `1h 18m`,
    genres: `Drama`,
    director: `Anthony Mann`,
    writers: `Heinz Herald, Richard Weil`,
    actors: `Mary Beth Hughes, Richard Weil`,
    country: `USA`,
    ageLimit: 0,
    commentsAmount: 2,

    isInWatchlist: true,
    isWatched: false,
    isFavourite: true,
  };
};

const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
