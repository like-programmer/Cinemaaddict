import {createSearchTemplate} from "./components/search.js";
import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createBoardTemplate} from "./components/board.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createLoadBtnTemplate} from "./components/load-btn.js";
import {createMoviesCountTemplate} from "./components/movies-count.js";
import {createDetailsPopupTemplate} from "./components/details-popup.js";

import {generateFilters} from "./mock/filter.js";
import {generateFilmCards} from "./mock/film-card.js";


const LIST_CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const filters = generateFilters();
const filmCards = generateFilmCards(LIST_CARD_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createSearchTemplate(), `beforeend`);
render(siteHeaderElement, createUserRankTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);

render(siteMainElement, createSortingTemplate(), `beforeend`);

render(siteMainElement, createBoardTemplate(), `beforeend`);

const cardsListElement = siteMainElement.querySelectorAll(`.films-list__container`);

for (let i = 0; i < LIST_CARD_COUNT; i++) {
  render(cardsListElement[0], createFilmCardTemplate(filmCards[i]), `beforeend`);
}

render(cardsListElement[0], createLoadBtnTemplate(), `afterend`);

for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(cardsListElement[1], createFilmCardTemplate(filmCards[i]), `beforeend`);
  render(cardsListElement[2], createFilmCardTemplate(filmCards[i]), `beforeend`);
}


const siteFooter = document.querySelector(`.footer`);
const siteFooterStatistics = siteFooter.querySelector(`.footer__statistics`);

render(siteFooterStatistics, createMoviesCountTemplate(), `beforeend`);

render(siteFooter, createDetailsPopupTemplate(filmCards[0]), `beforeend`);
