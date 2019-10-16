/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-restricted-syntax */
import React, { Component } from "react";
import "./App.css";
import "jsoneditor-react/es/editor.min.css";
import PropTypes from "prop-types";
import Menu from "../components/Menu/Menu";
import Submission from "../components/Submission/Submission";
import "react-toastify/dist/ReactToastify.css";
import FakeDataClass from "../FakeData";

const FakeData = new FakeDataClass();

class SubmissionGenerator extends Component {
  constructor(props) {
    super(props);
    const { submissionCount, formID, JF } = this.props;

    this.state = {
      submissions: [],
      JF,
      formID,
      submissionCount,
      selectedSubmissions: new Array(submissionCount).fill(false)
    };
  }

  componentDidMount() {
    const self = this;
    const { JF, formID, submissionCount } = this.state;
    const { selectedItems } = this.props;

    let username = "";
    JF.getUser().then(function success(r) {
      username = r.username;
      self.setState({ username: r.username });
    });

    JF.getFormQuestions(formID).then(function success(response) {
      const submissionsArray = [];
      for (let i = 1; i <= submissionCount; i += 1) {
        const submissionID = FakeData.getSubmissionID();
        const submission = {};
        const keys = Object.keys(response);
        for (let index = 0; index < keys.length; index += 1) {
          const attributes = response[keys[index]];
          const answerType = attributes.type;
          if (FakeData.isSelectedType(selectedItems, answerType)) {
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
        }
        submissionsArray.push(submission);
      }

      self.setState({ submissions: submissionsArray });
      self.setState({ data: true });
    });
  }

  selectAll = () => {
    const { submissionCount } = this.state;
    this.setState({
      selectedSubmissions: new Array(submissionCount).fill(true)
    });
  };

  sendSubmissions = () => {
    const {
      submissionCount,
      submissions,
      formID,
      JF,
      selectedSubmissions
    } = this.state;
    for (let index = 0; index < submissionCount; index += 1) {
      if (selectedSubmissions[index]) {
        const fields = submissions[index];
        const submission = {};
        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields[field], "answer")) {
            submission[`submission[${field}]`] = fields[field].answer;
          }
        }
        JF.createFormSubmission(formID, submission);
      }
    }
  };

  handleChangeCheckBox = index => {
    const { selectedSubmissions } = this.state;
    const checkedArray = [...selectedSubmissions];
    checkedArray[index] = !checkedArray[index];
    this.setState({
      selectedSubmissions: checkedArray
    });
  };

  render() {
    const { submissions, selectedSubmissions } = this.state;
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
        />
      );
    }
    return (
      <div>
        <Menu
          submissions={submissions}
          selectAll={this.selectAll}
          sendSubmissions={this.sendSubmissions}
        />
        <div
          id="main-registration-container"
          style={{
            display: "-webkit-box",
            overflowY: "auto",
            height: "-webkit-fill-available"
          }}
        >
          {submissionsComponent.map(item => item)}
        </div>
      </div>
    );
  }
}

SubmissionGenerator.propTypes = {
  JF: PropTypes.object.isRequired,
  formID: PropTypes.string.isRequired,
  submissionCount: PropTypes.number.isRequired,
  selectedItems: PropTypes.array.isRequired
};

export default SubmissionGenerator;
