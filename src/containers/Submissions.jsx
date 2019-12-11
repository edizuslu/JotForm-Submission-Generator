/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from "react";
import "jsoneditor-react/es/editor.min.css";
import PropTypes from "prop-types";
import JotFormAPI from "jotform";
import { Button, Card, Checkbox, Popup } from "semantic-ui-react";
import { Redirect } from "react-router";
import Submission from "../components/Submission/Submission";
import { setSubmissionID, generateAnswer } from "../FakeData/FakeData";
import AppHeader from "../components/AppHeader/AppHeader";

/* Styles of footer, checkbox and scard group elements */
const footerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "5px",
  marginRight: "15px"
};

const checkBoxStyle = {
  marginBottom: "8px",
  marginLeft: "8px"
};

const cardGroupStyle = {
  marginLeft: "5px",
  marginRight: "5px",
  marginTop: "0px",
  marginBottom: "5px"
};

/* Container of submission components */
class Submissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      selectedSubmissions: []
    };
  }

  /* Submission generating when component mounts */
  componentDidMount() {
    const self = this;
    const { form, user } = this.props;
    const { submissions, selectedSubmissions } = this.generateSubmissions(
      form,
      user
    );
    self.setState({ submissions });
    self.setState({ selectedSubmissions });
  }

  /**
   * Generate submissions
   * @param {object} form
   * @param {object} user
   * @returns {object}
   */
  generateSubmissions = (form, user) => {
    const { selectedQuestions, submissionCount } = form;
    const submissionQuestions = this.getSubmissionQuestion(selectedQuestions);
    const subCount = this.parseSubCount(submissionCount);
    const submissions = [];
    for (let i = 1; i <= subCount; i += 1) {
      const submission = this.createSubmission(submissionQuestions, form, user);
      submissions.push(submission);
    }
    const selectedSubmissions = this.initializeSelectedSubmissions(subCount);
    return { submissions, selectedSubmissions };
  };

  /**
   * Get submission questions
   * @param {array} selectedQuestions
   * @returns {array}
   */
  getSubmissionQuestion = selectedQuestions => {
    return selectedQuestions !== undefined
      ? selectedQuestions.filter(question => question !== false)
      : [];
  };

  /**
   * Parse submission count
   * @param {string} submissionCount
   * @returns {number}
   */
  parseSubCount = submissionCount => {
    return parseInt(submissionCount, 10) || 0;
  };

  /**
   * Create submission
   * @param {array} submissionQuestions
   * @param {object} form
   * @param {object} user
   * @returns {object}
   */
  createSubmission = (submissionQuestions, form, user) => {
    const submission = {};
    const keys = Object.keys(submissionQuestions);
    for (const key of keys) {
      const questions = this.getQuestions(submissionQuestions, key);
      setSubmissionID(submission, questions);
      generateAnswer(submission, questions, form, user);
    }
    return submission;
  };

  /**
   * Get questions object
   * @param {array} submissionQuestions
   * @param {string} key
   * @returns {object}
   */
  getQuestions = (submissionQuestions, key) => {
    const questionID = key;
    return submissionQuestions[questionID];
  };

  /**
   * Initialize selected submission array as empty (by filling all elements with false)
   * @param {string} submissionCount
   * @returns {number}
   */
  initializeSelectedSubmissions = submissionCount => {
    return new Array(submissionCount).fill(false);
  };

  /**
   * Counts number of selected submissions
   * @returns {number}
   */
  countSelectedSubmissions = () => {
    const { selectedSubmissions } = this.state;
    const numberOfSelecteds = selectedSubmissions.filter(
      question => question === true
    );
    return numberOfSelecteds.length;
  };

  /* Select all submissions  */
  selectAll = () => {
    const { selectedSubmissions } = this.state;
    const selectedCount = this.countSelectedSubmissions();
    const numberOfSubmission = selectedSubmissions.length;
    const selectedAll = selectedCount === numberOfSubmission;
    const newSelecteds = new Array(numberOfSubmission).fill(!selectedAll);
    this.setState({
      selectedSubmissions: newSelecteds
    });
  };

  /* Copy selected submissions to clipboard */
  copyToClipboard = () => {
    const { submissions, selectedSubmissions } = this.state;
    const copyString = this.getCopiedSubText(selectedSubmissions, submissions);
    const el = document.createElement("textarea");
    el.value = `{${copyString}}`;
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  /**
   * Get copied submissions text
   * @param {array} selectedSubmissions
   * @param {array} submissions
   * @returns {string}
   */
  getCopiedSubText = (selectedSubmissions, submissions) => {
    let copyString = "";
    for (let index = 0; index < selectedSubmissions.length; index += 1) {
      if (this.isSelectedSubmission(selectedSubmissions, index)) {
        copyString += this.formatSubmissionText(index, submissions);
      }
    }
    return `${copyString.substring(0, copyString.length - 3)}\n}`;
  };

  /**
   * Submission text format
   * @param {number} index
   * @param {array} submissions
   * @returns {string}
   */
  formatSubmissionText = (index, submissions) => {
    return `"${index + 1}":\n${JSON.stringify(submissions[index], null, 2)},\n`;
  };

  /**
   * Handles submission' checkbox select or deselect actions
   * @param {number} index
   */
  handleChangeCheckBox = index => {
    const { selectedSubmissions } = this.state;
    const newSelecteds = [...selectedSubmissions];
    newSelecteds[index] = !newSelecteds[index];
    this.setState({
      selectedSubmissions: newSelecteds
    });
  };

  /**
   * Handles edit submission
   * @param {object} edit
   * @param {number} index
   */
  handleEditSubmission = (edit, index) => {
    const { submissions } = this.state;
    const updatedSubmissions = [...submissions];
    updatedSubmissions[index] = edit.updated_src;
    this.setState({
      submissions: updatedSubmissions
    });
  };

  /**
   * Send submission using JotForm API
   */
  sendSubmissions = () => {
    const { submissions, selectedSubmissions } = this.state;
    const { form } = this.props;
    for (let index = 0; index < selectedSubmissions.length; index += 1) {
      if (this.isSelectedSubmission(selectedSubmissions, index)) {
        const fields = submissions[index];
        const submission = {};
        Object.keys(fields).forEach(function addAnswer(field) {
          if (Object.prototype.hasOwnProperty.call(fields[field], "answer")) {
            submission[`submission[${field}]`] = fields[field].answer;
          }
        });
        JotFormAPI.createFormSubmission(form.id, submission);
      }
    }
  };

  /**
   * Check submission if seleced
   * @param {object} selectedSubmissions
   * @param {number} index
   */
  isSelectedSubmission = (selectedSubmissions, index) => {
    return selectedSubmissions[index];
  };

  /* Renders container of submission components */
  render() {
    const { submissions, selectedSubmissions } = this.state;
    const { authorized, setAuthFalse, user, form } = this.props;
    const numberOfSelecteds = this.countSelectedSubmissions();
    const selectedAll = numberOfSelecteds === selectedSubmissions.length;
    const anySelected = numberOfSelecteds > 0;
    const buttonBackground = anySelected ? "" : "transparent";
    const submissionKeys = Object.keys(submissions);

    /* Redirects unauthorized user to login page */
    if (!authorized) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <AppHeader
          authorized={authorized}
          setAuthFalse={setAuthFalse}
          user={user}
        />

        <footer style={footerStyle}>
          <span>
            <>
              <Popup
                content="Copied to clipboard!"
                on="click"
                pinned
                position="bottom right"
                trigger={
                  <Button
                    style={{
                      background: buttonBackground
                    }}
                    onClick={() => this.copyToClipboard()}
                    color="orange"
                  >
                    Copy
                  </Button>
                }
              />
              <Popup
                content="Sent successfully!"
                on="click"
                pinned
                position="bottom center"
                trigger={
                  <Button
                    disabled={form.id === "new_submission"}
                    style={{
                      background: buttonBackground
                    }}
                    onClick={() => this.sendSubmissions()}
                    color="orange"
                  >
                    Send
                  </Button>
                }
              />
            </>
          </span>
        </footer>

        <Checkbox
          style={checkBoxStyle}
          checked={selectedAll}
          onClick={() => this.selectAll()}
          label={<label>Select All</label>}
        />
        <Card.Group style={cardGroupStyle} doubling itemsPerRow={3} stackable>
          {submissions.map((submission, index) => (
            <Card key={submissionKeys[index]}>
              <Card.Content>
                <Submission
                  key={index}
                  id={index}
                  submission={JSON.stringify(submission, null, 2)}
                  submissionNumber={index + 1}
                  selected={selectedSubmissions[index]}
                  handleChangeCheckBox={this.handleChangeCheckBox}
                  handleEditSubmission={this.handleEditSubmission}
                />
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </>
    );
  }
}

/* Prop types */
Submissions.propTypes = {
  form: PropTypes.object.isRequired,
  authorized: PropTypes.bool.isRequired,
  setAuthFalse: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Submissions;
