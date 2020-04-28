const createFilterMarkup = (name, count) => {
  return (`
  <a href="#watchlist" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
  `);
};

export const createSiteMenuTemplate = () => {
  const filterMarkup = createFilterMarkup(`Wishlist`, 34);
  return (`
    <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      
      ${filterMarkup}
      ${filterMarkup}
      ${filterMarkup}
      
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
    `);
};
