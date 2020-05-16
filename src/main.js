import SearchComponent from "./components/search.js";
import UserRankComponent from "./components/user-rank.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
import PageComponent from "./components/page.js";
import CardsComponent from "./components/cards.js";
import FilmCardComponent from "./components/film-card.js";
import LoadMoreBtnComponent from "./components/load-more-btn.js";
import NoCardsComponent from "./components/no-cards.js";
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
const extraCards = [
  getExtraRatedCards(filmCards, SHOWING_EXTRA_CARD_COUNT),
  getExtraCommentedCards(filmCards, SHOWING_EXTRA_CARD_COUNT)
];

const renderCard = (cardsListElement, card) => {
  const openDetailsPopup = () => {
    render(document.body, detailsPopupComponent.getElement(), RenderPosition.BEFOREEND);
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
  const openPopupTriggerElements = [
    cardComponent.getElement().querySelector(`.film-card__title`),
    cardComponent.getElement().querySelector(`.film-card__poster`),
    cardComponent.getElement().querySelector(`.film-card__comments`)
  ];

  openPopupTriggerElements.forEach((element) => {
    element.addEventListener(`click`, () => {
      openDetailsPopup();
      document.addEventListener(`keydown`, documentEscKeydownHandler);
    });
  });

  const detailsPopupComponent = new DetailsPopupComponent(card);
  const closePopupBtn = detailsPopupComponent.getElement().querySelector(`.film-details__close-btn`);

  closePopupBtn.addEventListener(`click`, () => {
    closeDetailsPopup();
    document.removeEventListener(`keydown`, documentEscKeydownHandler);
  });

  render(cardsListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderPage = (pageComponent, cards, extraCardsArray) => {
  const pageSectionElement = pageComponent.getElement().querySelector(`.films-list`);
  const pageExtraSectionElements = pageComponent.getElement().querySelectorAll(`.films-list--extra`);

  if (cards.length === 0) {
    pageSectionElement.querySelector(`h2`).remove();
    pageExtraSectionElements[0].remove();
    pageExtraSectionElements[1].remove();
    render(pageSectionElement, new NoCardsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(pageSectionElement, new CardsComponent().getElement(), RenderPosition.BEFOREEND);

  pageExtraSectionElements.forEach((element) => {
    render(element, new CardsComponent().getElement(), RenderPosition.BEFOREEND);
  });

  const cardsListElements = pageComponent.getElement().querySelectorAll(`.films-list__container`);

  let showingCardCount = SHOWING_CARD_COUNT_ON_START;

  cards.slice(0, showingCardCount).forEach((card) => {
    renderCard(cardsListElements[0], card);
  });

  extraCardsArray.forEach((array, i) => {
    if (array) {
      array.forEach((card) => renderCard(cardsListElements[i + 1], card));
    } else if (!array) {
      pageExtraSectionElements[i].remove();
    }
  });

  const loadMoreBtnComponent = new LoadMoreBtnComponent();
  render(pageSectionElement, loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

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

const pageComponent = new PageComponent();
render(siteMainElement, pageComponent.getElement(), RenderPosition.BEFOREEND);
renderPage(pageComponent, filmCards, extraCards);

const siteFooter = document.querySelector(`.footer`);
const siteFooterStatistics = siteFooter.querySelector(`.footer__statistics`);

render(siteFooterStatistics, new MoviesCountComponent(filmCards.length).getElement(), RenderPosition.BEFOREEND);
