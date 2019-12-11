/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Assign spinner data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generateSpinner = (submission, questionID) => {
  const randomSpinner = getRandomNumber(0, 250).toString();
  assign(submission, [questionID, "answer"], randomSpinner);
};
