import FilmCardComponent from "../components/film-card.js";
import DetailsPopupComponent from "../components/details-popup.js";

import {render, RenderPosition} from "../utils/render.js";

export default class MovieController {
  constructor(container, dataChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._cardComponent = null;
    this._detailsPopupComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  render(card) {
    this._cardComponent = new FilmCardComponent(card);
    this._detailsPopupComponent = new DetailsPopupComponent(card);

    this._cardComponent.setDetailsClickHandler(() => {
      this._openDetailsPopup();
      document.addEventListener(`keydown`, this._escKeyDownHandler);
    });

    this._cardComponent.setWatchlistBtnClickHandler((evt) => {
      evt.preventDefault();
      const newCard = Object.assign({}, card);
      newCard.filmInfo.userDetails.watchlist = !card.filmInfo.userDetails.watchlist;

      this._dataChangeHandler(this, card, Object.assign({}, card, newCard));
    });

    this._cardComponent.setWatchedBtnClickHandler((evt) => {
      evt.preventDefault();
      const newCard = Object.assign({}, card);
      newCard.filmInfo.userDetails.alreadyWatched = !card.filmInfo.userDetails.alreadyWatched;

      this._dataChangeHandler(this, card, Object.assign({}, card, newCard));
    });

    this._cardComponent.setFavoriteBtnClickHandler((evt) => {
      evt.preventDefault();
      const newCard = Object.assign({}, card);
      newCard.filmInfo.userDetails.favourite = !card.filmInfo.userDetails.favourite;

      this._dataChangeHandler(this, card, Object.assign({}, card, newCard));
    });

    this._detailsPopupComponent.setPopupCloseHandler(() => {
      this._closeDetailsPopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    });

    this._detailsPopupComponent.setWatchlistBtnClickHandler(() => {
      const newCard = Object.assign({}, card);
      newCard.filmInfo.userDetails.watchlist = !card.filmInfo.userDetails.watchlist;

      this._dataChangeHandler(this, card, Object.assign({}, card, newCard));
    });

    this._detailsPopupComponent.setWatchedBtnClickHandler(() => {
      const newCard = Object.assign({}, card);
      newCard.filmInfo.userDetails.alreadyWatched = !card.filmInfo.userDetails.alreadyWatched;

      this._dataChangeHandler(this, card, Object.assign({}, card, newCard));
    });

    this._detailsPopupComponent.setFavoriteBtnClickHandler(() => {
      const newCard = Object.assign({}, card);
      newCard.filmInfo.userDetails.favourite = !card.filmInfo.userDetails.favourite;

      this._dataChangeHandler(this, card, Object.assign({}, card, newCard));
    });

    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
  }

  _openDetailsPopup() {
    render(document.body, this._detailsPopupComponent, RenderPosition.BEFOREEND);
  }

  _closeDetailsPopup() {
    this._detailsPopupComponent.getElement().remove();
  }

  _escKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeDetailsPopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }
}
