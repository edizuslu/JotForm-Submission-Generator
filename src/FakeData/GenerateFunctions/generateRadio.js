/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Select a radio option randomly
 * @param {object} question
 * @returns {string}
 */
const getRadioOption = question => {
  const optionsRadio = question.options.split("|");
  return optionsRadio[getRandomNumber(0, optionsRadio.length)];
};

/**
 * Assign radio data to submission object
 * @param {object} submission
 * @param {string} questionID
 * @param {string} question
 */
export const generateRadio = (submission, questionID, question) => {
  const optionsRadio = getRadioOption(question);
  assign(submission, [questionID, "answer"], optionsRadio);
};
