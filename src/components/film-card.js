export const createFilmCardTemplate = (card) => {
  const {} = card;

  const title = `The Godfather`;
  const poster = `./images/posters/the-man-with-the-golden-arm.jpg`;
  const rating = `8.1`;
  const year = `1934`;
  const duration = `1h 18m`;
  const genre = `Drama`;
  const descriprion = `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback.`;
  const commentsAmount = 2;

  const isInWatchlist = true;
  const isWatched = false;
  const isFavourite = true;

  const controlActiveClass = `film-card__controls-item--active`;
  const watchlistControlActiveClass = isInWatchlist ? controlActiveClass : ``;
  const watchedControlActiveClass = isWatched ? controlActiveClass : ``;
  const favouriteControlActiveClass = isFavourite ? controlActiveClass : ``;

  return (`
    <article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${descriprion}</p>
          <a class="film-card__comments">${commentsAmount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistControlActiveClass}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedControlActiveClass}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favouriteControlActiveClass}">Mark as favorite</button>
          </form>
        </article>
    `);
};
