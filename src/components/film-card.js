export const createFilmCardTemplate = (card) => {
  const {title, poster, description, rating, releaseDate, duration, genres, comments,
    isInWatchlist, isWatched, isFavourite} = card;

  const year = `${releaseDate.getFullYear()}`;
  const commentsAmount = comments.length;

  const watchlistControlActiveClass = isInWatchlist ? `film-card__controls-item--active` : ``;
  const watchedControlActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favouriteControlActiveClass = isFavourite ? `film-card__controls-item--active` : ``;

  return (`
    <article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsAmount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistControlActiveClass}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedControlActiveClass}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favouriteControlActiveClass}">Mark as favorite</button>
          </form>
        </article>
    `);
};
