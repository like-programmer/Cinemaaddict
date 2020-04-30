import {EMOJI_REACTIONS} from "../const.js";

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

const commentTexts = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const commentDayMark = {
  [0]: `Today`,
  [1]: `Yesterday`,
  [2]: `2 days ago`
};

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

const getRandomArray = (array) => {
  const itemsCount = getRandomIntegerNumber(1, 3);
  const createdArray = [];
  for (let i = 0; i < itemsCount; i++) {
    createdArray.push(getRandomArrayItem(array));
  }
  return createdArray;
};

const getRandomString = (array, divider) => {
  const itemsCount = getRandomIntegerNumber(1, 3);
  const createdArray = [];
  for (let i = 0; i < itemsCount; i++) {
    createdArray.push(getRandomArrayItem(array));
  }
  return createdArray.map((it) => {
    return (`${it}`);
  }).join(divider);
};

const getRandomComment = () => {
  const comment = {};
  comment.name = getRandomArrayItem(nameItems);
  comment.text = getRandomArrayItem(commentTexts);
  comment.emoji = getRandomArrayItem(EMOJI_REACTIONS).src;
  const day = getRandomIntegerNumber(0, 2);
  comment.date = commentDayMark[day];
  return comment;
};

const generateComments = (count) => {
  return new Array(count).fill(``).map(getRandomComment);
};

const generateFilmCard = () => {
  const isWatched = Math.random() > 0.5;
  const isRated = isWatched ? Math.random() > 0.5 : null;

  return {
    title: getRandomArrayItem(titleItems),
    originalTitle: getRandomArrayItem(titleItems),
    poster: getRandomArrayItem(posterItems),
    description: getRandomString(descriptionItems, ` `),
    rating: getRandomFloatNumber(9),
    userRate: isRated ? getRandomIntegerNumber(1, 9) : null,
    releaseDate: new Date(),
    duration: `1h ${getRandomIntegerNumber(0, 50)}m`,
    genres: getRandomArray(genreItems),
    director: getRandomArrayItem(nameItems),
    writers: getRandomString(nameItems, `, `),
    actors: getRandomString(nameItems, `, `),
    country: getRandomString(countryItems, `, `),
    ageLimit: getRandomArrayItem(ageLimitItems),
    comments: generateComments(getRandomIntegerNumber(0, 4)),

    isInWatchlist: Math.random() > 0.5,
    isWatched,
    isFavourite: Math.random() > 0.5,
    isRated
  };
};

const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
