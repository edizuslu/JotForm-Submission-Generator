/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import "./App.css";
import "jsoneditor-react/es/editor.min.css";
import PropTypes from "prop-types";
import jf from "jotform";
import { Button, Card, Checkbox, Popup } from "semantic-ui-react";
import _ from "lodash";
import { Redirect } from "react-router";
import Submission from "../components/Submission/Submission";
import FakeDataClass from "../FakeData";

const FakeData = new FakeDataClass();

class SubmissionGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
      formID: undefined,
      selectedSubmissions: [],
      selectedCount: 0
    };
  }

  componentDidMount() {
    const self = this;

    const { form } = this.props;

    const formID = form.id;
    const submissionCount = parseInt(form.submissionCount, 10);
    const { selectedItems } = form;

    this.setState({ formID });
    this.setState({
      selectedSubmissions: new Array(submissionCount).fill(false)
    });

    let username = "";
    jf.getUser().then(function success(response) {
      username = response.username;
      self.setState({ username: response.username });
    });

    if (formID === "new_submission") {
      const submissionsArray = [];
      for (let i = 1; i <= submissionCount; i += 1) {
        const submissionID = FakeData.getSubmissionID();
        const submission = {};
        const keys = Object.keys(selectedItems);
        for (let index = 0; index < keys.length; index += 1) {
          const attributes = selectedItems[keys[index]];
          const answerType = attributes.type;
          FakeData.assign(submission, [keys[index], "type"], attributes.type);
          FakeData.generateAnswer(
            answerType,
            submission,
            keys[index],
            attributes,
            formID,
            username,
            submissionID,
            selectedItems
          );
        }
        submissionsArray.push(submission);
      }
      self.setState({
        submissionCount: new Array(submissionsArray.length).fill(false)
      });
      self.setState({ submissions: submissionsArray });
      self.setState({ data: true });
    } else {
      jf.getFormQuestions(formID).then(function success(response) {
        const submissionsArray = [];
        for (let i = 1; i <= submissionCount; i += 1) {
          const submissionID = FakeData.getSubmissionID();
          const submission = {};
          const keys = Object.keys(response);
          for (let index = 0; index < keys.length; index += 1) {
            const attributes = response[keys[index]];
            const answerType = attributes.type;
            if (FakeData.isSelectedType(selectedItems, answerType)) {
              FakeData.assign(
                submission,
                [keys[index], "type"],
                attributes.type
              );
              FakeData.generateAnswer(
                answerType,
                submission,
                keys[index],
                attributes,
                formID,
                username,
                submissionID,
                selectedItems
              );
            }
          }
          submissionsArray.push(submission);
        }
        self.setState({
          submissionCount: new Array(submissionsArray.length).fill(false)
        });
        self.setState({ submissions: submissionsArray });
        self.setState({ data: true });
      });
    }
  }

  selectAll = () => {
    const { selectedSubmissions, selectedCount } = this.state;
    if (selectedCount !== selectedSubmissions.length) {
      const checkedArray = [];
      for (let index = 0; index < selectedSubmissions.length; index += 1) {
        checkedArray[index] = true;
      }
      this.setState({
        selectedSubmissions: checkedArray
      });
      this.setState({
        selectedCount: checkedArray.length
      });
    } else {
      const checkedArray = [];
      for (let index = 0; index < selectedSubmissions.length; index += 1) {
        checkedArray[index] = false;
      }
      this.setState({
        selectedSubmissions: checkedArray
      });
      this.setState({
        selectedCount: 0
      });
    }
  };

  copyToClipboard = () => {
    const { submissions, selectedSubmissions } = this.state;
    let copyString = "";
    for (let index = 0; index < selectedSubmissions.length; index += 1) {
      if (selectedSubmissions[index]) {
        copyString += `${JSON.stringify(submissions[index], null, 2)}\n`;
      }
    }
    const el = document.createElement("textarea");
    el.value = copyString;
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  sendSubmissions = () => {
    const { submissions, formID, selectedSubmissions } = this.state;
    for (let index = 0; index < selectedSubmissions.length; index += 1) {
      if (selectedSubmissions[index]) {
        const fields = submissions[index];
        const submission = {};
        Object.keys(fields).forEach(function addAnswer(field) {
          if (Object.prototype.hasOwnProperty.call(fields[field], "answer")) {
            submission[`submission[${field}]`] = fields[field].answer;
          }
        });

        jf.createFormSubmission(formID, submission);
      }
    }
  };

  handleChangeCheckBox = index => {
    const { selectedSubmissions, selectedCount } = this.state;
    const checkedArray = [...selectedSubmissions];
    checkedArray[index] = !checkedArray[index];
    if (checkedArray[index]) {
      this.setState({
        selectedCount: selectedCount + 1
      });
    } else {
      this.setState({
        selectedCount: selectedCount - 1
      });
    }
    this.setState({
      selectedSubmissions: checkedArray
    });
  };

  handleChangeSubmission = (edit, index) => {
    const { submissions } = this.state;
    const updatedSubmissions = [...submissions];
    updatedSubmissions[index] = edit.updated_src;
    this.setState({
      submissions: updatedSubmissions
    });
  };

  render() {
    const {
      submissions,
      selectedSubmissions,
      selectedCount,
      formID
    } = this.state;
    const { authorized } = this.props;
    const submissionsComponent = [];
    for (let index = 0; index < submissions.length; index += 1) {
      submissionsComponent.push(
        <Submission
          key={index}
          id={index}
          submission={JSON.stringify(submissions[index], null, 2)}
          submissionNumber={index + 1}
          selected={selectedSubmissions[index]}
          handleChangeCheckBox={this.handleChangeCheckBox}
          handleChangeSubmission={this.handleChangeSubmission}
        />
      );
    }

    const selectedAll = selectedCount === selectedSubmissions.length;

    if (!authorized) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <footer
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "5px"
          }}
        >
          <span>
            {selectedCount > 0 ? (
              <>
                <Popup
                  content="Copied to clipboard!"
                  on="click"
                  pinned
                  position="bottom right"
                  trigger={
                    <Button onClick={() => this.copyToClipboard()} primary>
                      Copy
                    </Button>
                  }
                />
                <Popup
                  content="Sended successfully!"
                  on="click"
                  pinned
                  position="bottom center"
                  trigger={
                    <Button
                      disabled={formID === "new_submission"}
                      onClick={() => this.sendSubmissions()}
                      primary
                    >
                      Send
                    </Button>
                  }
                />
              </>
            ) : (
              <>
                <Button
                  style={{
                    background: "transparent"
                  }}
                  primary
                >
                  Copy
                </Button>
                <Button
                  style={{
                    background: "transparent"
                  }}
                  primary
                >
                  Send
                </Button>
              </>
            )}
          </span>
        </footer>

        <Checkbox
          style={{
            marginBottom: "8px",
            marginLeft: "8px"
          }}
          checked={selectedAll}
          onClick={() => this.selectAll()}
          label={<label>Select All</label>}
        />
        <Card.Group doubling itemsPerRow={3} stackable>
          {_.map(submissionsComponent, submission => (
            <Card key={submission.key}>
              <Card.Content>{submission}</Card.Content>
            </Card>
          ))}
        </Card.Group>
      </>
    );
  }
}

SubmissionGenerator.propTypes = {
  form: PropTypes.object.isRequired,
  authorized: PropTypes.bool.isRequired
};

export default SubmissionGenerator;
