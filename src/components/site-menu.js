import AbstractComponent from "./abstract-component.js";

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

export default class SiteMenu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
