/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Select a dropdown option randomly
 * @param {object} question
 * @returns {array}
 */
const getDropdownOption = question => {
  const optionsDropdown = question.options.split("|");
  return optionsDropdown[getRandomNumber(0, optionsDropdown.length)];
};

/**
 * Assign dropdown data to submission object
 * @param {object} submission
 * @param {string} questionID
 * @param {string} question
 */
export const generateDropdown = (submission, questionID, question) => {
  const dropdownOptions = getDropdownOption(question);
  assign(submission, [questionID, "answer"], dropdownOptions);
};
