import {USER_RANKS} from "../const.js";
import {getUserRank} from "../utils.js";

export const createUserRankTemplate = (filmsAmount) => {
  const userRank = getUserRank(USER_RANKS, filmsAmount);

  return (`
    <section class="header__profile profile">
    <p class="profile__rating">${userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
    `);
};
