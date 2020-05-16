import AbstractComponent from "./abstract-component";

const createMoviesCountTemplate = (filmAmount) => {
  return (`<p>${filmAmount} movies inside</p>`);
};

export default class MoviesCount extends AbstractComponent {
  constructor(filmAmount) {
    super();
    this._filmAmount = filmAmount;
  }

  getTemplate() {
    return createMoviesCountTemplate(this._filmAmount);
  }
}
