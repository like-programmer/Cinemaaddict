import SearchComponent from "./components/search.js";
import UserRankComponent from "./components/user-rank.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import BoardComponent from "./components/board.js";
import CardsComponent from "./components/cards.js";
import FilmCardComponent from "./components/film-card.js";
import LoadMoreBtnComponent from "./components/load-more-btn.js";
import MoviesCountComponent from "./components/movies-count.js";
import DetailsPopupComponent from "./components/details-popup.js";

import {generateFilters} from "./mock/filter.js";
import {generateFilmCards} from "./mock/film-card.js";
import {getExtraRatedCards, getExtraCommentedCards, RenderPosition, render} from "./utils.js";


const CARD_COUNT = 22;
const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_EXTRA_CARD_COUNT = 2;

const filmCards = generateFilmCards(CARD_COUNT);
const filters = generateFilters(filmCards);
const extraRatedCards = getExtraRatedCards(filmCards, SHOWING_EXTRA_CARD_COUNT);
const extraCommentedCards = getExtraCommentedCards(filmCards, SHOWING_EXTRA_CARD_COUNT);

const renderCard = (cardsListElement, card) => {
  const filmCardClickHandler = () => {
    render(document.body, detailsPopupComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const detailsPopupClickHandler = () => {
    detailsPopupComponent.getElement().remove();
  };

  const cardComponent = new FilmCardComponent(card);
  const filmTitle = cardComponent.getElement().querySelector(`.film-card__title`);
  const filmPoster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCommentAmount = cardComponent.getElement().querySelector(`.film-card__comments`);

  filmTitle.addEventListener(`click`, filmCardClickHandler);
  filmPoster.addEventListener(`click`, filmCardClickHandler);
  filmCommentAmount.addEventListener(`click`, filmCardClickHandler);

  const detailsPopupComponent = new DetailsPopupComponent(card);
  const closePopupBtn = detailsPopupComponent.getElement().querySelector(`.film-details__close-btn`);

  closePopupBtn.addEventListener(`click`, detailsPopupClickHandler);

  render(cardsListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, cards, ratedCards, commentedCards) => {
  const boardSectionElement = boardComponent.getElement().querySelector(`.films-list`);
  const boardExtraSectionElements = boardComponent.getElement().querySelectorAll(`.films-list--extra`);

  render(boardSectionElement, new CardsComponent().getElement(), RenderPosition.BEFOREEND);

  boardExtraSectionElements.forEach((element) => {
    render(element, new CardsComponent().getElement(), RenderPosition.BEFOREEND);
  });

  const cardsListElements = boardComponent.getElement().querySelectorAll(`.films-list__container`);

  let showingCardCount = SHOWING_CARD_COUNT_ON_START;

  cards.slice(0, showingCardCount).forEach((card) => {
    renderCard(cardsListElements[0], card);
  });

  if (ratedCards) {
    ratedCards.forEach((card) => renderCard(cardsListElements[1], card));
  } else if (!ratedCards) {
    boardExtraSectionElements[0].remove();
  }

  if (commentedCards) {
    commentedCards.forEach((card) => renderCard(cardsListElements[2], card));
  } else if (!commentedCards) {
    boardExtraSectionElements[1].remove();
  }

  const loadMoreBtnComponent = new LoadMoreBtnComponent();
  render(boardSectionElement, loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreBtnComponent.getElement().addEventListener(`click`, () => {
    const prevCardsCount = showingCardCount;

    showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;

    cards.slice(prevCardsCount, showingCardCount).forEach((card) => {
      renderCard(cardsListElements[0], card);
    });

    if (showingCardCount >= cards.length) {
      loadMoreBtnComponent.getElement().remove();
      loadMoreBtnComponent.removeElement();
    }
  });
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new SearchComponent().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new UserRankComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, filmCards, extraRatedCards, extraCommentedCards);

const siteFooter = document.querySelector(`.footer`);
const siteFooterStatistics = siteFooter.querySelector(`.footer__statistics`);

render(siteFooterStatistics, new MoviesCountComponent(filmCards.length).getElement(), RenderPosition.BEFOREEND);
