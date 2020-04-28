const filterNames = [`all movies`, `watchlist`, `history`, `favorites`];

export const generateFilters = () => {
  return filterNames.map((it, i) => {
    return {
      name: it,
      count: i === 0 ? null : Math.floor(Math.random() * 10)
    };
  });
};
