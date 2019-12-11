/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import faker from "faker";
import { assign } from "../FakeData";

/**
 * Get random file name
 * @param {object} form
 * @param {string} username
 * @param {string} submissionID
 * @returns {array}
 */
const getRandomFile = (form, username, submissionID) => {
  const url = "https://www.jotform.com/uploads/";
  const formID = `${form.id}/`;
  const fileName = faker.system.commonFileName();
  const userName = `${username}/`;
  const submissionId = `${submissionID}/`;
  const fileArray = [url + userName + formID + submissionId + fileName];
  return fileArray;
};

/**
 * Assign file data to submission object
 * @param {object} submission
 * @param {string} questionID
 * @param {string} question
 */
export const generateFileupload = (
  submission,
  questionID,
  question,
  form,
  submissionID,
  username
) => {
  const randomFile = getRandomFile(form, username, submissionID);
  assign(submission, [questionID, "answer"], randomFile);
};
