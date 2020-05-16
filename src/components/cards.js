import AbstractComponent from "./abstract-component";

const createCardsTemplate = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class Cards extends AbstractComponent {
  getTemplate() {
    return createCardsTemplate();
  }
}
