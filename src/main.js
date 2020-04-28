import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createBoardTemplate} from "./components/board.js";
import {createFilmCard} from "./components/film-card.js";
import {createLoadBtnTemplate} from "./components/load-btn.js";
import {createMoviesCountTemplate} from "./components/movies-count.js";
// import {createDetailsPopupTemplate} from "./components/details-popup.js";


const SORTING_CARD_COUNT = 5;
const CATEGORY_CARD_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createUserRankTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createSiteMenuTemplate(), `beforeend`);

render(siteMainElement, createSortingTemplate(), `beforeend`);

render(siteMainElement, createBoardTemplate(), `beforeend`);

const cardsListElement = siteMainElement.querySelectorAll(`.films-list__container`);

new Array(SORTING_CARD_COUNT).fill(``).forEach(() => {
  render(cardsListElement[0], createFilmCard(), `beforeend`);
});

render(cardsListElement[0], createLoadBtnTemplate(), `afterend`);

new Array(CATEGORY_CARD_COUNT).fill(``).forEach(() => {
  render(cardsListElement[1], createFilmCard(), `beforeend`);
  render(cardsListElement[2], createFilmCard(), `beforeend`);
});


const siteFooter = document.querySelector(`.footer`);
const siteFooterStatistics = siteFooter.querySelector(`.footer__statistics`);

render(siteFooterStatistics, createMoviesCountTemplate(), `beforeend`);
// render(siteFooter, createDetailsPopupTemplate(), `beforeend`);
