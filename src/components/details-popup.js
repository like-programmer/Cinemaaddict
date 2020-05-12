import {RATING_NUMBER_AMOUNT, COMMENT_REACTION, MONTH_NAMES} from "../const.js";
import {setDateFormat, setRuntimeFormat, createElement} from "../utils.js";

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
    const date = comment.date.toISOString();
    const formattedDate = `${date.split(`-`)[0]}/${date.split(`-`)[1]}/${date.split(`-`)[2].split(`T`)[0]} ${date.split(`T`)[1].slice(0, 5)}`;

    return (`
  <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${formattedDate}</span>
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

const createDetailsPopupTemplate = (card) => {
  const {comments, filmInfo} = card;

  const title = filmInfo.title;
  const alternativeTitle = filmInfo.alternativeTitle;

  const rating = filmInfo.totalRating;
  const poster = filmInfo.poster;
  const ageRating = filmInfo.ageRating;
  const director = filmInfo.director;

  const writers = filmInfo.writers.map((writer) => ` ${writer}`);
  const actors = filmInfo.actors.map((actor) => ` ${actor}`);

  const release = `${setDateFormat(filmInfo.release.date.getDate())} ${MONTH_NAMES[filmInfo.release.date.getMonth()]} ${filmInfo.release.date.getFullYear()}`;

  const releaseCountry = filmInfo.release.releaseCountry.map((country) => ` ${country}`);

  const runtime = setRuntimeFormat(filmInfo.runtime);

  const genre = filmInfo.genre;
  const genreNumeralEnding = genre.length > 1 ? `Genres` : `Genre`;
  const description = filmInfo.description;

  const personalRating = filmInfo.userDetails.personalRating;

  const commentAmount = comments.length;
  const sortedComments = comments.slice().sort((first, second) => second.date - first.date);

  const watchlistControlCheckedAttr = filmInfo.userDetails.watchlist ? `checked` : ``;
  const watchedControlCheckedAttr = filmInfo.userDetails.alreadyWatched ? `checked` : ``;
  const favouriteControlCheckedAttr = filmInfo.userDetails.favourite ? `checked` : ``;

  const genreMarkup = createGenresMarkup(genre);
  const userRatingFormMarkup = createUserRatingFormMarkup(RATING_NUMBER_AMOUNT, personalRating);
  const commentMarkup = createCommentMarkup(sortedComments);
  const emojiReactionMarkup = createEmojiReactionMarkup(COMMENT_REACTION);

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
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistControlCheckedAttr}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedControlCheckedAttr}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favouriteControlCheckedAttr}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    ${filmInfo.userDetails.alreadyWatched ? `
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
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

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

export default class DetailsPopup {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createDetailsPopupTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
