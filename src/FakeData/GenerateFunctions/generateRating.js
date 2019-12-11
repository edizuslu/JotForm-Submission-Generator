/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Assign rating data to submission object
 * @param {object} submission
 * @param {string} questionID
 * @param {string} question
 */
export const generateRating = (submission, questionID, question) => {
  const { stars } = question;
  const randomRating = getRandomNumber(1, stars).toString();
  assign(submission, [questionID, "answer"], randomRating);
};
