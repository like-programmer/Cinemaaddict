import {RATING_NUMBER_AMOUNT, COMMENT_REACTION} from "../const.js";
import {setRuntimeFormat} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

import moment from "moment";

const createBtnMarkup = (name, type, isActive = true) => {
  return (`<input type="checkbox" class="film-details__control-input visually-hidden" id="${type}" name="${type}" ${isActive ? `checked` : ``}>
        <label for="${type}" class="film-details__control-label film-details__control-label--${type}">${name}</label>`);
};

const createGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return (`
  <span class="film-details__genre">${genre}</span>
  `);
  }).join(`\n`);
};

const createUserRatingFormMarkup = (numberAmount, userRate) => {
  return new Array(numberAmount).fill(``).map((it, i) => {
    const index = i + 1;
    const isChecked = index === userRate;

    return (`
  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index}" id="rating-${index}" ${isChecked ? `checked` : ``}>
  <label class="film-details__user-rating-label" for="rating-${index}">${index}</label>
  `);
  }).join(`\n`);
};

const createCommentMarkup = (comments) => {
  return comments.map((comment) => {
    const date = moment(comment.date).format(`YYYY/MM/DD HH:mm`);

    return (`
  <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
  `);
  }).join(`\n`);
};

const createEmojiReactionMarkup = (reactions) => {
  return reactions.map((reaction) => {
    return (`
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${reaction}" value="${reaction}">
            <label class="film-details__emoji-label" for="emoji-${reaction}">
              <img src="./images/emoji/${reaction}.png" width="30" height="30" alt="emoji">
            </label>
  `);
  }).join(`\n`);
};

const createUserReactionMarkup = (reaction) => {
  return reaction ? `<img src="images/emoji/${reaction}.png" width="55" height="55" alt="emoji-${reaction}">` : ``;
};

const createDetailsPopupTemplate = (card, options = {}) => {
  const {comments, filmInfo} = card;
  const {isWatched, choosenEmotion} = options;

  const title = filmInfo.title;
  const alternativeTitle = filmInfo.alternativeTitle;

  const rating = filmInfo.totalRating;
  const poster = filmInfo.poster;
  const ageRating = filmInfo.ageRating;
  const director = filmInfo.director;

  const writers = filmInfo.writers.map((writer) => ` ${writer}`);
  const actors = filmInfo.actors.map((actor) => ` ${actor}`);

  const release = moment(filmInfo.release.date).format(`DD MMMM YYYY`);

  const releaseCountry = filmInfo.release.releaseCountry.map((country) => ` ${country}`);

  const runtime = setRuntimeFormat(filmInfo.runtime);

  const genre = filmInfo.genre;
  const genreNumeralEnding = genre.length > 1 ? `Genres` : `Genre`;
  const description = filmInfo.description;

  const personalRating = filmInfo.userDetails.personalRating;

  const commentAmount = comments.length;
  const sortedComments = comments.slice().sort((first, second) => second.date - first.date);

  const watchlistBtn = createBtnMarkup(`Add to watchlist`, `watchlist`, filmInfo.userDetails.watchlist);
  const watchedtBtn = createBtnMarkup(`Already watched`, `watched`, isWatched);
  const favouriteBtn = createBtnMarkup(`Add to favorites`, `favorite`, filmInfo.userDetails.favourite);

  const genreMarkup = createGenresMarkup(genre);
  const userRatingFormMarkup = createUserRatingFormMarkup(RATING_NUMBER_AMOUNT, personalRating);
  const commentMarkup = createCommentMarkup(sortedComments);
  const emojiReactionMarkup = createEmojiReactionMarkup(COMMENT_REACTION);
  const userReactionMarkup = createUserReactionMarkup(choosenEmotion);

  return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
              ${personalRating ? `
              <p class="film-details__user-rating">Your rate ${personalRating}</p>
              ` : ``}
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${release}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreNumeralEnding}</td>
              <td class="film-details__cell">${genreMarkup}</td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        ${watchlistBtn}
        ${watchedtBtn}
        ${favouriteBtn}
      </section>
    </div>
    ${isWatched ? `
    <div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">${userRatingFormMarkup}</div>
          </section>
        </div>
      </section>
    </div>
    ` : ``}
    
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentAmount}</span></h3>

        <ul class="film-details__comments-list">${commentMarkup}</ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">${userReactionMarkup}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">${emojiReactionMarkup}</div>
        </div>
      </section>
    </div>
  </form>
</section>`);
};

export default class DetailsPopup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;

    this._isWatched = !!card.filmInfo.userDetails.alreadyWatched;
    this._choosenEmotion = null;

    this._popupCloseHandler = null;
    this._watchlistBtnClickHandler = null;
    this._watchedBtnClickHandler = null;
    this._favoriteBtnClickHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createDetailsPopupTemplate(this._card, {
      isWatched: this._isWatched,
      choosenEmotion: this._choosenEmotion
    });
  }

  recoveryListeners() {
    this.setPopupCloseHandler(this._popupCloseHandler);
    this.setWatchlistBtnClickHandler(this._watchlistBtnClickHandler);
    this.setWatchedBtnClickHandler(this._watchedBtnClickHandler);
    this.setFavoriteBtnClickHandler(this._favoriteBtnClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const card = this._card;

    this._isWatched = !!card.filmInfo.userDetails.alreadyWatched;
    this._choosenEmotion = null;

    this.rerender();
  }

  setPopupCloseHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

    this._popupCloseHandler = handler;
  }

  setWatchlistBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);

    this._watchlistBtnClickHandler = handler;
  }

  setWatchedBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);

    this._watchedBtnClickHandler = handler;
  }

  setFavoriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);

    this._favoriteBtnClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
      this._isWatched = !this._isWatched;
      this.rerender();
    });

    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this._choosenEmotion = evt.target.value;
      this.rerender();
    });
  }
}
