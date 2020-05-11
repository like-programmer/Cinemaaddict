import {createElement} from "../utils";

const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return (`
  <a href="#${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name}
  ${count === null ? `` : `<span class="main-navigation__item-count">${count}</span>`}
  </a>
  `);
};

const createSiteMenuTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (`<nav class="main-navigation">
    <div class="main-navigation__items">
      
     ${filterMarkup}
      
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`);
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
