import {EMOJI_REACTIONS, MONTH_NAMES} from "../const.js";
import {setDateFormat} from "../utils.js";

const createGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return (`
  <span class="film-details__genre">${genre}</span>
  `);
  }).join(`\n`);
};

const createUserRatingFormMarkup = (userRate) => {
  const ratingMarkup = [];
  for (let i = 1; i < 10; i++) {
    const rateNumber = (i === userRate);

    ratingMarkup.push(`
  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${rateNumber ? `checked` : ``}>
  <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
  `);
  }
  return ratingMarkup.join(`\n`);
};

const createCommentMarkup = (comments) => {
  return comments.map((comment) => {
    return (`
  <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${comment.emoji}" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.name}</span>
                <span class="film-details__comment-day">${comment.date}</span>
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
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${reaction.name}" value="${reaction.name}">
            <label class="film-details__emoji-label" for="emoji-${reaction.name}">
              <img src="${reaction.src}" width="30" height="30" alt="emoji">
            </label>
  `);
  }).join(`\n`);
};

export const createDetailsPopupTemplate = (card) => {
  const {
    title, originalTitle, poster, description, rating, userRate, releaseDate, duration, genres, director, writers, actors, country, ageLimit, comments,
    isInWatchlist, isWatched, isFavourite, isRated} = card;

  const date = `${setDateFormat(releaseDate.getDate())} ${MONTH_NAMES[releaseDate.getMonth()]} ${releaseDate.getFullYear()}`;
  const commentsAmount = comments.length;

  const watchlistControlCheckedAttr = isInWatchlist ? `checked` : ``;
  const watchedControlCheckedAttr = isWatched ? `checked` : ``;
  const favouriteControlCheckedAttr = isFavourite ? `checked` : ``;

  const genresMarkup = createGenresMarkup(genres);
  const userRatingFormMarkup = createUserRatingFormMarkup(userRate);
  const commentMarkup = createCommentMarkup(comments);
  const emojiReactionMarkup = createEmojiReactionMarkup(EMOJI_REACTIONS);

  // film-details--hidden

  return (`
    <section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageLimit}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
              ${isRated ? `<p class="film-details__user-rating">Your rate ${userRate}</p>` : ``}
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
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genresMarkup}</span>
                </td>
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

            <div class="film-details__user-rating-score">
              ${userRatingFormMarkup}
            </div>
          </section>
        </div>
      </section>
    </div>
    ` : ``}

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">
        Comments 
        <span class="film-details__comments-count">${commentsAmount}</span>
        </h3>

        <ul class="film-details__comments-list">
         ${commentMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
${emojiReactionMarkup}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>
    `);
};
