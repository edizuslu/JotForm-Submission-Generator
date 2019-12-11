/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import faker from "faker";
import { assign } from "../FakeData";

/**
 * Generate random address data
 * @returns {object}
 */
const getAddressData = () => {
  const addr_line1 = faker.address.streetAddress();
  const addr_line2 = faker.address.secondaryAddress();
  const city = faker.address.city();
  const country = faker.address.country();
  const postal = faker.address.zipCode();
  const state = faker.address.state();
  return { addr_line1, addr_line2, city, country, postal, state };
};

/**
 * Assign address data to submission object
 * @param {object} submission
 * @param {string} questionID
 */
export const generateAddress = (submission, questionID) => {
  const randomAddress = getAddressData();
  assign(submission, [questionID, "answer"], randomAddress);
};
