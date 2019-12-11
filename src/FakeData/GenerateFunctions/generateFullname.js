/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */

import faker from "faker";
import { assign } from "../FakeData";

/**
 * Assign fullname data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generateFullname = (submission, questionID) => {
  const first = faker.name.firstName();
  const last = faker.name.lastName();
  assign(submission, [questionID, "answer"], { first, last });
};
