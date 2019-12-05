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
import FakeDataClass from "../FakeData/FakeData";
import AppHeader from "../components/AppHeader/AppHeader";

const FakeData = new FakeDataClass();

/* Styles of footer, checkbox and card group elements */

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

class Submissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      selectedSubmissions: []
    };
  }

  /* Submissions are generating when component mounts */

  componentDidMount() {
    const self = this;
    const { form, user } = this.props;
    const { selectedQuestions, submissionCount } = form;

    const numberOfSubmission = parseInt(submissionCount, 10) || 0;
    this.setState({
      selectedSubmissions: new Array(numberOfSubmission).fill(false)
    });

    const submissionQuestions =
      selectedQuestions !== undefined
        ? selectedQuestions.filter(question => question !== false)
        : [];

    const submissionsArray = [];
    for (let i = 1; i <= numberOfSubmission; i += 1) {
      const submissionID = FakeData.getSubmissionID();
      const submission = {};
      const keys = Object.keys(submissionQuestions);
      for (let index = 0; index < keys.length; index += 1) {
        const questionID = keys[index];
        const questionAttributes = submissionQuestions[questionID];
        const { id, question, type } = questionAttributes;
        FakeData.assign(submission, [id, "type"], type);
        FakeData.generateAnswer(
          submission,
          type,
          id,
          question,
          form.id,
          user.username,
          submissionID,
          submissionQuestions,
          form
        );
      }
      submissionsArray.push(submission);
    }
    self.setState({ submissions: submissionsArray });
  }

  /* Counts number of selected submissions */
  countSelecteds = () => {
    const { selectedSubmissions } = this.state;
    const numberOfSelecteds = selectedSubmissions.filter(
      question => question === true
    );
    return numberOfSelecteds.length;
  };

  /* Select all operation via checkbox */

  selectAll = () => {
    const { selectedSubmissions } = this.state;
    const selectedCount = this.countSelecteds();
    const numberOfSubmission = selectedSubmissions.length;
    const selectedAll = selectedCount === numberOfSubmission;
    const newSelecteds = new Array(numberOfSubmission).fill(!selectedAll);
    this.setState({
      selectedSubmissions: newSelecteds
    });
  };

  /* Copy to clipboard operation via copy button */

  copyToClipboard = () => {
    const { submissions, selectedSubmissions } = this.state;
    let copyString = "";
    for (let index = 0; index < selectedSubmissions.length; index += 1) {
      if (selectedSubmissions[index]) {
        copyString += `"${index + 1}":\n${JSON.stringify(
          submissions[index],
          null,
          2
        )},\n`;
        // copyString += index === selectedSubmissions.length - 1 ? "\n" : ",\n";
      }
    }
    copyString = `${copyString.substring(0, copyString.length - 3)}\n}`;
    console.log("Copy string :");
    console.log(copyString);
    const el = document.createElement("textarea");
    el.value = `{${copyString}}`;
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  /* Handles select or deselect operations of submission  */

  handleChangeCheckBox = index => {
    const { selectedSubmissions } = this.state;
    const newSelecteds = [...selectedSubmissions];
    newSelecteds[index] = !newSelecteds[index];
    this.setState({
      selectedSubmissions: newSelecteds
    });
  };

  /* Handles edit submission */

  handleEditSubmission = (edit, index) => {
    const { submissions } = this.state;
    const updatedSubmissions = [...submissions];
    updatedSubmissions[index] = edit.updated_src;
    this.setState({
      submissions: updatedSubmissions
    });
  };

  /* Send submission operation with JotForm API */

  sendSubmissions = () => {
    const { submissions, selectedSubmissions } = this.state;
    const { form } = this.props;
    for (let index = 0; index < selectedSubmissions.length; index += 1) {
      if (selectedSubmissions[index]) {
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

  render() {
    const { submissions, selectedSubmissions } = this.state;
    const { authorized, setAuthFalse, user, form } = this.props;
    const numberOfSelecteds = this.countSelecteds();
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
                      // backgroundColor: "#fa8900"
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
                      // backgroundColor: "#fa8900"
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

Submissions.propTypes = {
  form: PropTypes.object.isRequired,
  authorized: PropTypes.bool.isRequired,
  setAuthFalse: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Submissions;
