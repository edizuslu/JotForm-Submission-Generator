/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Returns a random hour between 1 and 12
 * @returns {string}
 */
const randomHour = () => {
  const hour = getRandomNumber(1, 12);
  if (hour < 10) {
    return `0${hour.toString()}`;
  }
  return hour.toString();
};

/**
 * Returns a random minute between 1 and 60
 * @returns {string}
 */
const randomMinute = () => {
  const minute = getRandomNumber(1, 60);
  if (minute < 10) {
    return `0${minute.toString()}`;
  }
  return minute.toString();
};

/**
 * Returns am or pm randomly
 * @returns {string}
 */
const randomAmPm = () => {
  let ampm;
  if (getRandomNumber(1, 2) === 1) {
    ampm = "AM";
  } else {
    ampm = "PM";
  }
  return ampm;
};

/**
 * Assign time data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generateTime = (submission, questionID) => {
  const ampm = randomAmPm();
  const hourSelect = randomHour();
  const minuteSelect = randomMinute();

  assign(submission, [questionID, "answer"], {
    ampm,
    hourSelect,
    minuteSelect
  });
};
