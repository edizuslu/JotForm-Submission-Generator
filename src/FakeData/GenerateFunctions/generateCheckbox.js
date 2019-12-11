/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Select a checkbox option randomly
 * @param {object} question
 * @returns {array}
 */
const getCheckBoxOption = question => {
  const optionsCheckbox = question.options.split("|");
  const checkBoxArray = [
    optionsCheckbox[getRandomNumber(0, optionsCheckbox.length)]
  ];

  return checkBoxArray;
};

/**
 * Assign checkbox data to submission object
 * @param {object} submission
 * @param {string} questionID
 * @param {string} question
 */
export const generateCheckbox = (submission, questionID, question) => {
  const checkBoxOptions = getCheckBoxOption(question);
  assign(submission, [questionID, "answer"], checkBoxOptions);
};
