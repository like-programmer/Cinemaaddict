import AbstractComponent from "./abstract-component";

const createLoadMoreBtnTemplate = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class LoadMoreBtn extends AbstractComponent {
  getTemplate() {
    return createLoadMoreBtnTemplate();
  }
}
