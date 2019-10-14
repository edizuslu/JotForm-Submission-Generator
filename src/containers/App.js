/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import "./App.css";
import StartPage from "../components/StartPage/StartPage";
import SubmissionGenerator from "./SubmissionGenerator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStartPage: true,
      formID: "",
      apiKey: "",
      submissionCount: 0
    };
  }

  setFormState = props => {
    this.setState({ formID: props.formID });
    this.setState({ apiKey: props.apiKey });
    this.setState({
      submissionCount: parseInt(props.submissionCount, 10)
    });
    this.setState({ toggleStartPage: false });
  };

  render() {
    const { toggleStartPage, apiKey, formID, submissionCount } = this.state;
    if (toggleStartPage) {
      return (
        <div className="App">
          <StartPage clicked={this.setFormState} />
        </div>
      );
    }
    return (
      <SubmissionGenerator
        apiKey={apiKey}
        formID={formID}
        submissionCount={submissionCount}
      />
    );
  }
}

export default App;
