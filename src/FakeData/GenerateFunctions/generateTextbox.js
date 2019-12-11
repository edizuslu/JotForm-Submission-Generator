/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import faker from "faker";
import { assign } from "../FakeData";

/**
 * Assign textbox data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generateTextbox = (submission, questionID) => {
  const randomText = faker.lorem.sentence();
  assign(submission, [questionID, "answer"], randomText);
};
