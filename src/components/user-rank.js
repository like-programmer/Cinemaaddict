import {USER_RANKS} from "../const.js";
import {getUserRank} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createUserRankTemplate = (filters) => {
  const userRank = getUserRank(USER_RANKS, filters);

  return (`<section class="header__profile profile">
    <p class="profile__rating">${userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);
};

export default class UserRank extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createUserRankTemplate(this._filters);
  }
}
