/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Assign number data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generateNumber = (submission, questionID) => {
  const randomNumber = getRandomNumber(0, 5000).toString();
  assign(submission, [questionID, "answer"], randomNumber);
};
