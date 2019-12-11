/* eslint-disable import/no-cycle */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-const-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { formElementsMap } from "./formElementsMap";

/**
 * Check if is input type question
 * @param {string} type
 * @returns {boolean}
 */
export const isInputType = type => {
  return formElementsMap.hasOwnProperty(type);
};

/**
 * Generate random submission ID
 * @returns {string}
 */
const getSubmissionID = () => {
  let submissionID = "";
  for (let x = 0; x < 18; x += 1) {
    submissionID += getRandomNumber(1, 9).toString();
  }
  return submissionID;
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

/**
 * Assign attribute function for JSON object
 * @param {object} obj
 * @param {string} keyPath
 * @param {value} value
 */
export const assign = (obj, keyPath, value) => {
  let object = obj;
  const lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; i += 1) {
    const key = keyPath[i];
    if (!(key in object)) {
      object[key] = {};
    }
    object = object[key];
  }
  object[keyPath[lastKeyIndex]] = value;
};

/**
 * Get default question properties data
 * @param {string} type
 * @returns {object}
 */
export const getDefaultQuestionData = type => {
  return formElementsMap[type].defaultData;
};

/**
 * Set submission ID
 * @param {object} submission
 * @param {object} questions
 */
export const setSubmissionID = (submission, questions) => {
  const { id, type } = questions;
  assign(submission, [id, "type"], type);
};

/**
 * Get generate function of form element from formElementMap
 * @param {object} type
 * @returns {function}
 */
const getGenerateFunction = type => {
  return formElementsMap[type].generateFunction;
};

/**
 * Get answer data
 * @param {object} questions
 * @param {object} user
 * @returns {object}
 */
const getAnswerData = (questions, user) => {
  const { id, question, type } = questions;
  const { username } = user;
  const questionID = id;
  const submissionID = getSubmissionID();
  return { questionID, question, submissionID, username, type };
};

/**
 * Generate asnwer
 * @param {object} submission
 * @param {object} questions
 * @param {object} form
 * @param {object} user
 */
export const generateAnswer = (submission, questions, form, user) => {
  const { questionID, question, submissionID, username, type } = getAnswerData(
    questions,
    user
  );
  const generateFunction = getGenerateFunction(type);
  generateFunction(
    submission,
    questionID,
    question,
    form,
    submissionID,
    username
  );
};
