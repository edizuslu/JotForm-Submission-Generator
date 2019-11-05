/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import StartPage from "../components/StartPage/StartPage";
import Forms from "../components/Forms/Forms";
import Menu from "../components/Menu/Menu";
import SubmissionGenerator from "./SubmissionGenerator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentForm: undefined, authorized: false };
  }

  componentDidMount() {}

  setAuthTrue = () => {
    this.setState({ authorized: true });
  };

  setAuthFalse = () => {
    this.setState({ authorized: false });
  };

  setCurrentForm = form => {
    this.setState({ currentForm: form });
  };

  render() {
    const { currentForm, authorized } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <StartPage authorized={authorized} setAuthTrue={this.setAuthTrue} />
          )}
        />
        <Route
          path="/forms"
          component={() => (
            <>
              <Menu authorized={authorized} setAuthFalse={this.setAuthFalse} />
              <Forms
                authorized={authorized}
                setCurrentForm={this.setCurrentForm}
                logout={this.logout}
              />
            </>
          )}
        />
        {currentForm !== undefined && (
          <Route
            path="/send-submission"
            component={() => (
              <>
                <Menu
                  authorized={authorized}
                  setAuthFalse={this.setAuthFalse}
                />
                <SubmissionGenerator
                  form={currentForm}
                  authorized={authorized}
                />
              </>
            )}
          />
        )}
      </Switch>
    );
  }
}

export default App;
