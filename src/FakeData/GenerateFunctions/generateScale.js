/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Assign scale data to submission object
 * @param {object} submission
 * @param {string} questionID
 * @param {string} question
 */
export const generateScale = (submission, questionID, question) => {
  const { scaleAmount } = question;
  const randomScale = getRandomNumber(1, scaleAmount).toString();
  assign(submission, [questionID, "answer"], randomScale);
};
