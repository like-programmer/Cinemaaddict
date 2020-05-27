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
  return cards.map((card) => {
    const movieController = new MovieController(cardsListElement);
    movieController.render(card);
    return movieController;
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
    this._cards = [];
    this._showedMovieControllers = [];
    this._showingCardCount = SHOWING_CARD_COUNT_ON_START;
    this._cardsComponent = new CardsComponent();
    this._noCardsComponent = new NoCardsComponent();
    this._loadMoreBtnComponent = new LoadMoreBtnComponent();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render(cards) {
    this._cards = cards;

    const pageListSectionElement = this._container.getElement().querySelector(`.films-list`);
    const pageExtraListSectionElements = this._container.getElement().querySelectorAll(`.films-list--extra`);

    if (this._cards.length === 0) {
      pageListSectionElement.querySelector(`h2`).remove();
      pageExtraListSectionElements.forEach((element) => element.remove());
      render(pageListSectionElement, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(pageListSectionElement, this._cardsComponent, RenderPosition.BEFOREEND);

    pageExtraListSectionElements.forEach((element) => {
      render(element, new CardsComponent(), RenderPosition.BEFOREEND);
    });

    const cardsListElements = this._container.getElement().querySelectorAll(`.films-list__container`);

    const newCards = renderCards(cardsListElements[0], this._cards.slice(0, this._showingCardCount));
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

    const extraCards = [
      getSortedCards(this._cards, `rating`, 0, SHOWING_EXTRA_CARD_COUNT),
      getSortedCards(this._cards, `comments`, 0, SHOWING_EXTRA_CARD_COUNT)
    ];

    extraCards.forEach((array, i) => {
      if (array.length > 0) {
        renderCards(cardsListElements[i + 1], array);
      } else {
        pageExtraListSectionElements[i].remove();
      }
    });

    this._renderLoadMoreBtn();
  }

  _renderLoadMoreBtn() {
    if (this._showingCardCount >= this._cards.length) {
      return;
    }

    const pageListSectionElement = this._container.getElement().querySelector(`.films-list`);

    render(pageListSectionElement, this._loadMoreBtnComponent, RenderPosition.BEFOREEND);

    this._loadMoreBtnComponent.setClickHandler(() => {
      const prevCardsCount = this._showingCardCount;
      const cardsListElement = this._container.getElement().querySelector(`.films-list__container`);
      this._showingCardCount = this._showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;

      const sortedCards = getSortedCards(this._cards, this._sortComponent.getSortType(), prevCardsCount, this._showingCardCount);

      const newCards = renderCards(cardsListElement, sortedCards.slice(0, this._showingCardCount));
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

      if (this._showingCardCount >= this._cards.length) {
        remove(this._loadMoreBtnComponent);
      }
    });
  }

  _sortTypeChangeHandler(sortType) {
    this._showingCardCount = SHOWING_CARD_COUNT_ON_START;
    const sortedCards = getSortedCards(this._cards, sortType, 0, this._showingCardCount);
    const cardsListElement = this._cardsComponent.getElement();
    cardsListElement.innerHTML = ``;
    const newCards = renderCards(cardsListElement, sortedCards);
    this._showedMovieControllers = newCards;
    this._renderLoadMoreBtn();
  }
}
