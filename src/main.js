import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createBoardTemplate} from "./components/board.js";
import {createFilmCard} from "./components/film-card.js";
import {createLoadBtnTemplate} from "./components/load-btn.js";
import {createMoviesCountTemplate} from "./components/movies-count.js";
import {createDetailsPopupTemplate} from "./components/details-popup.js";


const SORTING_CARD_COUNT = 5;
const CATEGORY_CARD_COUNT = 2;

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template)
};

const siteHeader = document.querySelector(".header");

render(siteHeader, createUserRankTemplate(), `beforeend`);

const siteMain = document.querySelector(".main");

render(siteMain, createSiteMenuTemplate(), `beforeend`);

render(siteMain, createBoardTemplate(), `beforeend`);

const cardsContainer = siteMain.querySelectorAll(".films-list__container");

new Array(SORTING_CARD_COUNT).fill(``).forEach(() => {
    render(cardsContainer[0], createFilmCard(), `beforeend`);
});

render(cardsContainer[0], createLoadBtnTemplate(), `afterend`);

new Array(CATEGORY_CARD_COUNT).fill(``).forEach(() => {
    render(cardsContainer[1], createFilmCard(), `beforeend`);
    render(cardsContainer[2], createFilmCard(), `beforeend`);
});


const siteFooter = document.querySelector(".footer");
const siteFooterStatistics = siteFooter.querySelector(".footer__statistics");

render(siteFooterStatistics, createMoviesCountTemplate(), `beforeend`);
render(siteFooter, createDetailsPopupTemplate(), `beforeend`);
