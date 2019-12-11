/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Get matrix data
 * @param {object} question
 * @returns {object}
 */
const getMatrixData = question => {
  const mcolumns = question.mcolumns.split("|");
  const mrows = question.mrows.split("|");
  const { emojiCount } = question;
  return { mcolumns, mrows, emojiCount };
};

/**
 * Assign matrix data to submission object
 * @param {object} submission
 * @param {string} questionID
 * @param {string} question
 */
export const generateMatrix = (submission, questionID, question) => {
  const { mcolumns, mrows, emojiCount } = getMatrixData(question);
  for (const row of mrows) {
    assign(
      submission,
      [questionID, "answer", row],
      mcolumns[getRandomNumber(0, emojiCount - 1)]
    );
  }
};
