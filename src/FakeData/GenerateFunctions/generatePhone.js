/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import faker from "faker";
import { assign } from "../FakeData";

/**
 * Assign phone number data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generatePhone = (submission, questionID) => {
  const area = faker.random.number();
  const phone = faker.phone.phoneNumber();
  assign(submission, [questionID, "answer"], { area, phone });
};
