import {CARD_DESCRIPTION_MAX_LENGTH} from "../const.js";
import {setRuntimeFormat} from "../utils.js";
import AbstractComponent from "./abstract-component";

const createFilmCardTemplate = (card) => {
  const {comments, filmInfo} = card;
  const commentAmount = comments.length;
  const commentsNumeralEnding = commentAmount > 1 ? `comments` : `comment`;

  const title = filmInfo.title;
  const rating = filmInfo.totalRating;
  const poster = filmInfo.poster;

  const year = filmInfo.release.date.getFullYear();

  const runtime = setRuntimeFormat(filmInfo.runtime);

  const genre = filmInfo.genre[0];
  const description = filmInfo.description.length > CARD_DESCRIPTION_MAX_LENGTH ? `${filmInfo.description.slice(0, CARD_DESCRIPTION_MAX_LENGTH - 1)}...` : filmInfo.description;

  const watchlistControlActiveClass = filmInfo.userDetails.watchlist ? `film-card__controls-item--active` : ``;
  const watchedControlActiveClass = filmInfo.userDetails.alreadyWatched ? `film-card__controls-item--active` : ``;
  const favouriteControlActiveClass = filmInfo.userDetails.favourite ? `film-card__controls-item--active` : ``;

  return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentAmount} ${commentsNumeralEnding}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistControlActiveClass}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedControlActiveClass}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favouriteControlActiveClass}">Mark as favorite</button>
          </form>
        </article>`);
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }
}
