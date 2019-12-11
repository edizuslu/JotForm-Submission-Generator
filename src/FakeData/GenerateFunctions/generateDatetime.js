/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Returns a random month between 1 and 12
 * @returns {string}
 */
const randomMonth = () => {
  const month = getRandomNumber(1, 12);
  if (month < 10) {
    return `0${month.toString()}`;
  }
  return month.toString();
};

/**
 * Returns a random day between 1 and 30
 * @returns {string}
 */
const randomDay = () => {
  const day = getRandomNumber(1, 30);
  if (day < 10) {
    return `0${day.toString()}`;
  }
  return day.toString();
};

/**
 * Returns a random year between 2000 and 2050
 */
const getRandomYear = () => {
  const min = 2000;
  const max = 2050;
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Assign datetime data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generateDatetime = (submission, questionID) => {
  const month = randomMonth();
  const day = randomDay();
  const year = getRandomYear();
  assign(submission, [questionID, "answer"], { month, day, year });
};
