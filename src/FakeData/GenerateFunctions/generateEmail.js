/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import faker from "faker";
import { assign } from "../FakeData";

/**
 * Assign email data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generateEmail = (submission, questionID) => {
  const randomEmail = faker.internet.email();
  assign(submission, [questionID, "answer"], randomEmail);
};
