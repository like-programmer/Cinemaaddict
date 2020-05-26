import FilmCardComponent from "../components/film-card.js";
import DetailsPopupComponent from "../components/details-popup.js";

import {render, RenderPosition} from "../utils/render.js";

export default class MovieController {
  constructor(container) {
    this._container = container;
    this._cardComponent = null;
    this._detailsPopupComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  render(card) {
    this._cardComponent = new FilmCardComponent(card);
    this._detailsPopupComponent = new DetailsPopupComponent(card);

    this._cardComponent.setClickHandler(() => {
      this._openDetailsPopup();
      document.addEventListener(`keydown`, this._escKeyDownHandler);
    });

    this._detailsPopupComponent.setCloseHandler(() => {
      this._closeDetailsPopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
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
