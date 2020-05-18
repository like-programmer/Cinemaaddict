import {remove, render, RenderPosition} from "../utils/render.js";
import FilmCardComponent from "../components/film-card.js";
import DetailsPopupComponent from "../components/details-popup.js";
import NoCardsComponent from "../components/no-cards.js";
import CardsComponent from "../components/cards.js";
import LoadMoreBtnComponent from "../components/load-more-btn.js";
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

const renderPage = (pageComponent, cards) => {
  const pageSectionElement = pageComponent.getElement().querySelector(`.films-list`);
  const pageExtraSectionElements = pageComponent.getElement().querySelectorAll(`.films-list--extra`);

  if (cards.length === 0) {
    pageSectionElement.querySelector(`h2`).remove();
    pageExtraSectionElements[0].remove();
    pageExtraSectionElements[1].remove();
    render(pageSectionElement, new NoCardsComponent(), RenderPosition.BEFOREEND);
    return;
  }

  render(pageSectionElement, new CardsComponent(), RenderPosition.BEFOREEND);

  pageExtraSectionElements.forEach((element) => {
    render(element, new CardsComponent(), RenderPosition.BEFOREEND);
  });

  const cardsListElements = pageComponent.getElement().querySelectorAll(`.films-list__container`);

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
      pageExtraSectionElements[i].remove();
    }
  });

  const loadMoreBtnComponent = new LoadMoreBtnComponent();
  render(pageSectionElement, loadMoreBtnComponent, RenderPosition.BEFOREEND);

  loadMoreBtnComponent.setClickHandler(() => {
    const prevCardsCount = showingCardCount;

    showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;

    cards.slice(prevCardsCount, showingCardCount).forEach((card) => {
      renderCard(cardsListElements[0], card);
    });

    if (showingCardCount >= cards.length) {
      remove(loadMoreBtnComponent);
    }
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(tasks) {
    renderPage(this._container, tasks);
  }
}
