import FilmCardComponent from "../components/film-card.js";
import DetailsPopupComponent from "../components/details-popup.js";
import NoCardsComponent from "../components/no-cards.js";
import CardsComponent from "../components/cards.js";
import LoadMoreBtnComponent from "../components/load-more-btn.js";

import {remove, render, RenderPosition} from "../utils/render.js";
import {getExtraCommentedCards, getExtraRatedCards} from "../utils/common.js";

const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_EXTRA_CARD_COUNT = 2;


const renderCard = (cardsListElement, card) => {
  const openDetailsPopup = () => {
    render(document.body, detailsPopupComponent, RenderPosition.BEFOREEND);
  };

  const closeDetailsPopup = () => {
    detailsPopupComponent.getElement().remove();
  };

  const documentEscKeydownHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeDetailsPopup();
      document.removeEventListener(`keydown`, documentEscKeydownHandler);
    }
  };

  const cardComponent = new FilmCardComponent(card);
  cardComponent.setClickHandler(() => {
    openDetailsPopup();
    document.addEventListener(`keydown`, documentEscKeydownHandler);
  });

  const detailsPopupComponent = new DetailsPopupComponent(card);
  detailsPopupComponent.setCloseHandler(() => {
    closeDetailsPopup();
    document.removeEventListener(`keydown`, documentEscKeydownHandler);
  });

  render(cardsListElement, cardComponent, RenderPosition.BEFOREEND);
};

export default class PageController {
  constructor(container, sortComponent) {
    this._container = container;
    this._sortComponent = sortComponent;
    this._noCardsComponent = new NoCardsComponent();
    this._loadMoreBtnComponent = new LoadMoreBtnComponent();
  }

  render(cards) {
    const renderLoadMoreBtn = () => {
      if (showingCardCount >= cards.length) {
        return;
      }

      render(pageListSectionElement, this._loadMoreBtnComponent, RenderPosition.BEFOREEND);

      this._loadMoreBtnComponent.setClickHandler(() => {
        const prevCardsCount = showingCardCount;

        showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;

        cards.slice(prevCardsCount, showingCardCount).forEach((card) => {
          renderCard(cardsListElements[0], card);
        });

        if (showingCardCount >= cards.length) {
          remove(this._loadMoreBtnComponent);
        }
      });
    };

    const pageListSectionElement = this._container.getElement().querySelector(`.films-list`);
    const pageExtraListSectionElements = this._container.getElement().querySelectorAll(`.films-list--extra`);

    if (cards.length === 0) {
      pageListSectionElement.querySelector(`h2`).remove();
      pageExtraListSectionElements.forEach((element) => element.remove());
      render(pageListSectionElement, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(pageListSectionElement, new CardsComponent(), RenderPosition.BEFOREEND);

    pageExtraListSectionElements.forEach((element) => {
      render(element, new CardsComponent(), RenderPosition.BEFOREEND);
    });

    const cardsListElements = this._container.getElement().querySelectorAll(`.films-list__container`);

    let showingCardCount = SHOWING_CARD_COUNT_ON_START;

    cards.slice(0, showingCardCount).forEach((card) => {
      renderCard(cardsListElements[0], card);
    });

    const extraCards = [
      getExtraRatedCards(cards, SHOWING_EXTRA_CARD_COUNT),
      getExtraCommentedCards(cards, SHOWING_EXTRA_CARD_COUNT)
    ];

    extraCards.forEach((array, i) => {
      if (array) {
        array.forEach((card) => renderCard(cardsListElements[i + 1], card));
      } else if (!array) {
        pageExtraListSectionElements[i].remove();
      }
    });

    renderLoadMoreBtn();

    this._sortComponent.setSortTypeChangeHandler(() => {
    });
  }
}
