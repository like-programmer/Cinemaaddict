import {CARD_DESCRIPTION_MAX_LENGTH} from "../const.js";
import {setRuntimeFormat} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createBtnMarkup = (name, type, isActive = true) => {
  return (`<button class="film-card__controls-item button film-card__controls-item--${type} ${isActive ? `film-card__controls-item--active` : ``}">${name}</button>`);
};

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

  const watchlistBtn = createBtnMarkup(`Add to watchlist`, `add-to-watchlist`, filmInfo.userDetails.watchlist);
  const watchedtBtn = createBtnMarkup(`Mark as watched`, `mark-as-watched`, filmInfo.userDetails.alreadyWatched);
  const favouriteBtn = createBtnMarkup(`Mark as favourite`, `favorite`, filmInfo.userDetails.favourite);

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
           ${watchlistBtn}
           ${watchedtBtn}
           ${favouriteBtn}
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

  setClickHandler(handler) {
    const triggerElements = [
      this.getElement().querySelector(`.film-card__title`),
      this.getElement().querySelector(`.film-card__poster`),
      this.getElement().querySelector(`.film-card__comments`)
    ];

    triggerElements.forEach((element) => {
      element.addEventListener(`click`, handler);
    });
  }

  setWatchlistBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setWatchedBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
