import {COMMENT_REACTION} from "../const.js";

const titleItems = [
  `Casablanca`,
  `Singin' in the Rain`,
  `Gone with the Wind`,
  `Schindler's List`,
  `City Lights`,
  `The Searchers`,
  `Sunset Blvd.`,
  `On the Waterfront`,
  `It's a Wonderful Life`,
  `The Grapes of Wrath`,
  `To Kill a Mockingbird`,
  `Bonnie and Clyde`,
  `Some Like It Hot`,
  `Gentlemen Prefer Blondes`
];

const posterItems = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`, `
  ./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const descriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const genreItems = [
  `Western`,
  `Drama`,
  `Horror`,
  `Film-Noir`,
  `Detective`,
  `Melodrama`,
  `Historical`,
  `Comedy`,
  `Adventure`,
  `Musical`
];

const nameItems = [
  `Robert De Niro`,
  `Paul Newman`,
  `Marlon Brando`,
  `Charles Chaplin`,
  `Humphrey Bogart`,
  `Spencer Tracy`,
  `Steve McQueen`,
  `Audrey Hepburn`,
  `Meryl Streep`,
  `Ingrid Bergman`,
  `Sophia Loren`,
  `Vivien Leigh`,
  `Judy Garland`,
  `Marilyn Monroe`,
];

const countryItems = [
  `USA`,
  `Australia`,
  `Bahamas`,
  `Canada`,
  `Egypt`,
  `France`,
  `Finland`,
  `Germany`,
  `Greece`,
  `Iceland`,
  `New Zealand`,
];

const ageLimitItems = [0, 6, 12, 16, 18];

const getRandomIntegerNumber = (min, max) => {
  return (min + Math.floor(Math.random() * (max - min)));
};

const getRandomFloatNumber = (max) => {
  return (Math.random() * max).toFixed(1);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomString = (array) => {
  const itemsCount = getRandomIntegerNumber(1, 3);
  return new Array(itemsCount).fill(``).map(() => {
    return getRandomArrayItem(array);
  }).join(` `);
};

const getRandomArray = (array) => {
  const itemsCount = getRandomIntegerNumber(1, 3);
  return new Array(itemsCount).fill(``).map(() => {
    return getRandomArrayItem(array);
  });
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = (-1) * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const getRandomComment = () => {
  return {
    author: getRandomArrayItem(nameItems),
    comment: getRandomArrayItem(descriptionItems),
    date: getRandomDate(),
    emotion: getRandomArrayItem(COMMENT_REACTION),
  };
};

const generateComments = (count) => {
  return new Array(count).fill(``).map(getRandomComment);
};

const getPersonalRating = () => {
  return Math.random() > 0.5 ? getRandomIntegerNumber(1, 9) : null;
};

const generateFilmCard = () => {
  const alreadyWatched = Math.random() > 0.5;
  const personalRating = alreadyWatched ? getPersonalRating() : null;

  return {
    comments: generateComments(getRandomIntegerNumber(0, 4)),
    filmInfo: {
      title: getRandomArrayItem(titleItems),
      alternativeTitle: getRandomArrayItem(titleItems),
      totalRating: getRandomFloatNumber(9),
      poster: getRandomArrayItem(posterItems),
      ageRating: getRandomArrayItem(ageLimitItems),
      director: getRandomArrayItem(nameItems),
      writers: getRandomArray(nameItems),
      actors: getRandomArray(nameItems),
      release: {
        date: new Date(),
        releaseCountry: getRandomArray(countryItems)
      },
      runtime: getRandomIntegerNumber(30, 120),
      genre: getRandomArray(genreItems),
      description: getRandomString(descriptionItems),
      userDetails: {
        personalRating,
        watchlist: Math.random() > 0.5,
        alreadyWatched,
        watchingDate: `2019-05-11T16:12:32.554Z`,
        favourite: Math.random() > 0.5
      }
    }
  };
};

const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
