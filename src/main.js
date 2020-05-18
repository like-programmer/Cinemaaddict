import SearchComponent from "./components/search.js";
import UserRankComponent from "./components/user-rank.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import PageComponent from "./components/page.js";
import PageController from "./controllers/page.js";
import MoviesCountComponent from "./components/movies-count.js";

import {generateFilters} from "./mock/filter.js";
import {generateFilmCards} from "./mock/film-card.js";

import {RenderPosition, render} from "./utils/render.js";


const CARD_COUNT = 22;

const filmCards = generateFilmCards(CARD_COUNT);
const filters = generateFilters(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new SearchComponent(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new UserRankComponent(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

const pageComponent = new PageComponent();
const pageController = new PageController(pageComponent);
render(siteMainElement, pageComponent, RenderPosition.BEFOREEND);
pageController.render(filmCards);
// renderPage(pageComponent, filmCards, extraCards);

const siteFooter = document.querySelector(`.footer`);
const siteFooterStatistics = siteFooter.querySelector(`.footer__statistics`);

render(siteFooterStatistics, new MoviesCountComponent(filmCards.length), RenderPosition.BEFOREEND);
