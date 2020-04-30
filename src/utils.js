export const setDateFormat = (date) => {
  return date < 10 ? `0${date}` : String(date);
};

