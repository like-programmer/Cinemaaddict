const createFilterMarkup = (name, count) => {
  return (`
  <a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
  `);
};

export const createSiteMenuTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it.name, it.count)).join(`\n`);

  return (`
    <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      
      ${filterMarkup}
      
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
    `);
};
