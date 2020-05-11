import Search from "./components/search.js";
import UserRank from "./components/user-rank.js";
import SiteMenu from "./components/site-menu.js";
import Sort from "./components/sort.js";
import Board from "./components/board.js";
import FilmCard from "./components/film-card.js";
import LoadMoreBtn from "./components/load-more-btn.js";
import MoviesCount from "./components/movies-count.js";
import DetailsPopup from "./components/details-popup.js";

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

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createSearchTemplate(), `beforeend`);
render(siteHeaderElement, createUserRankTemplate(filters), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);

render(siteMainElement, createSortingTemplate(), `beforeend`);

render(siteMainElement, createBoardTemplate(), `beforeend`);

const cardsListElement = siteMainElement.querySelectorAll(`.films-list__container`);

let showingCardCount = SHOWING_CARD_COUNT_ON_START;

for (let i = 0; i < showingCardCount; i++) {
  render(cardsListElement[0], createFilmCardTemplate(filmCards[i]), `beforeend`);
}

render(cardsListElement[0], createLoadMoreBtnTemplate(), `afterend`);

const loadMoreBtn = siteMainElement.querySelector(`.films-list__show-more`);

loadMoreBtn.addEventListener(`click`, () => {
  const prevCardCount = showingCardCount;
  showingCardCount = showingCardCount + SHOWING_CARD_COUNT_BY_BUTTON;

  filmCards.slice(prevCardCount, showingCardCount).forEach((card) => {
    render(cardsListElement[0], createFilmCardTemplate(card), `beforeend`);
  });

  if (showingCardCount >= filmCards.length) {
    loadMoreBtn.remove();
  }
});

if (extraRatedCards) {
  extraRatedCards.forEach((card) => render(cardsListElement[1], createFilmCardTemplate(card), `beforeend`));
} else if (!extraRatedCards) {
  siteMainElement.querySelector(`.films-list--extra:nth-last-of-type(2)`).remove();
}

if (extraCommentedCards) {
  extraCommentedCards.forEach((card) => render(cardsListElement[2], createFilmCardTemplate(card), `beforeend`));
} else if (!extraCommentedCards) {
  siteMainElement.querySelector(`.films-list--extra:nth-last-of-type(1)`).remove();
}


const siteFooter = document.querySelector(`.footer`);
const siteFooterStatistics = siteFooter.querySelector(`.footer__statistics`);

render(siteFooterStatistics, createMoviesCountTemplate(filmCards.length), `beforeend`);

render(siteFooter, createDetailsPopupTemplate(filmCards[0]), `beforeend`);
