/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import "./App.css";
import jf from "jotform";
import StartPage from "../components/StartPage/StartPage";
import SubmissionGenerator from "./SubmissionGenerator";
import QuestionFilter from "../components/QuestionFilter/QuestionFilter";
import FakeDataClass from "../FakeData";

const FakeData = new FakeDataClass();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStartPage: true,
      formID: "",
      apiKey: "",
      submissionCount: 0,
      toggleQuestionFilter: false,
      JF: null,
      questions: null,
      SubmissionGeneratorPage: false,
      selectedItems: []
    };
  }

  setFormState = userInfo => {
    this.setState({ formID: userInfo.formID });
    this.setState({ apiKey: userInfo.apiKey });
    this.setState({
      submissionCount: parseInt(userInfo.submissionCount, 10)
    });
    this.setState({ toggleStartPage: false });
    this.setState({ toggleQuestionFilter: true });
    jf.options({
      debug: true,
      apiKey: userInfo.apiKey
    });
    this.setState({ JF: jf });
    const self = this;
    jf.getFormQuestions(userInfo.formID).then(function success(response) {
      const keys = Object.keys(response);
      const inputQuestions = [];
      for (let index = 0; index < keys.length; index += 1) {
        const questionType = response[keys[index]].type;
        if (FakeData.isInputType(questionType)) {
          if (
            response[keys[index]].text === "" ||
            response[keys[index]].text === undefined
          ) {
            inputQuestions.push({
              id: response[keys[index]].qid,
              label: "Unlabeled question",
              type: response[keys[index]].type
            });
          } else {
            inputQuestions.push({
              id: response[keys[index]].qid,
              label: response[keys[index]].text,
              type: response[keys[index]].type
            });
          }
        }
      }
      self.setState({ questions: inputQuestions });
      self.setState({
        checkedQuestions: new Array(inputQuestions.length).fill(false)
      });
    });
  };

  handleToggle = index => () => {
    const { checkedQuestions } = this.state;
    const newCheckedList = checkedQuestions;
    newCheckedList[index] = !newCheckedList[index];
    this.setState({ checkedQuestions: newCheckedList });
  };

  setSelectedQuestions = selectedItems => {
    this.setState({ selectedItems });
  };

  generateSubmission = () => {
    this.setState({ toggleQuestionFilter: false });
    this.setState({ SubmissionGeneratorPage: true });
  };

  render() {
    const {
      toggleStartPage,
      apiKey,
      formID,
      submissionCount,
      toggleQuestionFilter,
      JF,
      questions,
      SubmissionGeneratorPage,
      selectedItems
    } = this.state;
    if (toggleStartPage) {
      return (
        <div className="App">
          <StartPage clicked={this.setFormState} />
        </div>
      );
    }
    if (toggleQuestionFilter && questions !== null && selectedItems !== null) {
      return (
        <QuestionFilter
          questions={questions}
          selectedItems={selectedItems}
          setSelectedQuestions={this.setSelectedQuestions}
          generateSubmission={this.generateSubmission}
        />
      );
    }
    if (SubmissionGeneratorPage) {
      return (
        <SubmissionGenerator
          apiKey={apiKey}
          formID={formID}
          submissionCount={submissionCount}
          JF={JF}
          questions={questions}
          selectedItems={selectedItems}
        />
      );
    }
    return null;
  }
}

export default App;
