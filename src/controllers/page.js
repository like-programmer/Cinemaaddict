import NoCardsComponent from "../components/no-cards.js";
import CardsComponent from "../components/cards.js";
import LoadMoreBtnComponent from "../components/load-more-btn.js";
import {SortType} from "../components/sort.js";
import MovieController from "./movie.js";

import {remove, render, RenderPosition} from "../utils/render.js";

const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_EXTRA_CARD_COUNT = 2;

const renderCards = (cardsListElement, cards) => {
  cards.forEach((card) => {
    renderCard(cardsListElement, card);
  });
};

const getSortedCards = (cards, sortType, from, to) => {
  let sortedCards = [];
  const showingCards = cards.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedCards = showingCards.sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
      break;

    case SortType.RATING:
      sortedCards = showingCards.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
      break;

    case `comments`:
      sortedCards = showingCards.sort((a, b) => b.comments.length - a.comments.length);
      break;

    case SortType.DEFAULT:
      sortedCards = showingCards;
      break;
  }

  return sortedCards.slice(from, to);
};

export default class PageController {
  constructor(container, sortComponent) {
    this._container = container;
    this._sortComponent = sortComponent;
    this._noCardsComponent = new NoCardsComponent();
    this._loadMoreBtnComponent = new LoadMoreBtnComponent();
  }

  render(cards) {
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

    renderCards(cardsListElements[0], cards.slice(0, showingCardCount));

    const extraCards = [
      getSortedCards(cards, `rating`, 0, SHOWING_EXTRA_CARD_COUNT),
      getSortedCards(cards, `comments`, 0, SHOWING_EXTRA_CARD_COUNT)
    ];

    extraCards.forEach((array, i) => {
      if (array.length > 0) {
        renderCards(cardsListElements[i + 1], array);
      } else {
        pageExtraListSectionElements[i].remove();
      }
    });

    // renderLoadMoreBtn();
  }

  _renderLoadMoreBtn() {
    if (showingCardCount >= cards.length) {
      return;
    }

    const pageListSectionElement = this._container.getElement().querySelector(`.films-list`);
    const cardsListElement = this._container.getElement().querySelector(`.films-list__container`);

    render(pageListSectionElement, this._loadMoreBtnComponent, RenderPosition.BEFOREEND);

    this._loadMoreBtnComponent.setClickHandler(() => {
      const prevCardsCount = showingCardCount;

      showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;

      const sortedCards = getSortedCards(cards, this._sortComponent.getSortType(), prevCardsCount, showingCardCount);

      renderCards(cardsListElement, sortedCards);

      if (showingCardCount >= cards.length) {
        remove(this._loadMoreBtnComponent);
      }
    });
  }

  _sortTypeChangeHandler(sortType) {
    showingCardCount = SHOWING_CARD_COUNT_ON_START;
    const sortedCards = getSortedCards(cards, sortType, 0, showingCardCount);
    const cardsListElement = this._container.getElement().querySelector(`.films-list__container`);
    cardsListElement.innerHTML = ``;
    renderCards(cardsListElement, sortedCards);
    renderLoadMoreBtn();
  }
}
