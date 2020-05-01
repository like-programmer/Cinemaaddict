import {createSearchTemplate} from "./components/search.js";
import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createBoardTemplate} from "./components/board.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createLoadMoreBtnTemplate} from "./components/load-more-btn.js";
import {createMoviesCountTemplate} from "./components/movies-count.js";
import {createDetailsPopupTemplate} from "./components/details-popup.js";

import {generateFilters} from "./mock/filter.js";
import {generateFilmCards} from "./mock/film-card.js";


const CARD_COUNT = 22;
const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_EXTRA_CARD_COUNT = 2;

const filmCards = generateFilmCards(CARD_COUNT);
const filters = generateFilters(filmCards);

const filmsWatchedAmount = filters.filter((filter) => filter.name === `history`).map((filter) => filter.count);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createSearchTemplate(), `beforeend`);
render(siteHeaderElement, createUserRankTemplate(filmsWatchedAmount), `beforeend`);

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

for (let i = 0; i < SHOWING_EXTRA_CARD_COUNT; i++) {
  render(cardsListElement[1], createFilmCardTemplate(filmCards[i]), `beforeend`);
  render(cardsListElement[2], createFilmCardTemplate(filmCards[i]), `beforeend`);
}


const siteFooter = document.querySelector(`.footer`);
const siteFooterStatistics = siteFooter.querySelector(`.footer__statistics`);

render(siteFooterStatistics, createMoviesCountTemplate(filmCards.length), `beforeend`);

render(siteFooter, createDetailsPopupTemplate(filmCards[0]), `beforeend`);
