/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-param-reassign */
import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import JotFormAPI from "jotform";
import LoginPage from "./components/LoginPage/LoginPage";
import Forms from "./containers/Forms";
import Widgets from "./JotFormWidgets/Widgets";
import Submissions from "./containers/Submissions";
import { isInputType, getDefaultQuestionData } from "./FakeData/FakeData";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: {},
      authorized: false,
      forms: [],
      user: {},
      jotformWidgets: [],
      selectedWidgets: []
    };
  }

  /* Sets authorized when user logged out */

  setAuthFalse = () => {
    this.setState({ authorized: false });
  };

  /* Sets selected form. */

  setCurrentForm = form => {
    this.setState({ currentForm: form });
  };

  /* Gets all JotForm Widgets from static file which is Widgets.js. */

  getJotFormWidgets = () => {
    const formElements = Widgets.FormElements;
    const widgetKeys = ["Basic", "Payments", "Widgets"];
    const jotformWidgets = [];
    let qid = 0;
    for (let index = 0; index < widgetKeys.length; index += 1) {
      const keys = Object.keys(formElements[widgetKeys[index]]);
      const elements = formElements[widgetKeys[index]];
      for (let i = 0; i < keys.length; i += 1) {
        if (isInputType(keys[i])) {
          jotformWidgets.push({
            id: qid.toString(),
            label: elements[keys[i]],
            type: keys[i],
            question: getDefaultQuestionData(keys[i])
          });
          qid += 1;
        }
      }
    }
    return {
      jotformWidgets,
      selectedWidgets: new Array(jotformWidgets.length).fill(false)
    };
  };

  /* Gets all questions of user forms and sets. */

  getFormsQuestions = forms => {
    forms.forEach(function getQuestion(form) {
      JotFormAPI.getFormQuestions(form.id).then(function getQuestionsSuccess(
        response
      ) {
        const keys = Object.keys(response);
        const inputQuestions = [];
        for (let index = 0; index < keys.length; index += 1) {
          const question = response[keys[index]];
          if (isInputType(question.type)) {
            const { qid, type, text } = question;
            const label = text === "" ? "Unlabeled question" : text;
            inputQuestions.push({
              id: qid,
              type,
              label,
              question
            });
          }
        }
        form.questions = inputQuestions;
        form.selectedQuestions = new Array(inputQuestions.length).fill(false);
        form.submissionCount = 1;
      });
    });
  };

  /* Gets all properties of user forms and sets. */

  getFormsProperties = forms => {
    forms.forEach(function getQuestion(form) {
      JotFormAPI.getFormProperties(form.id).then(function getQuestionsSuccess(
        response
      ) {
        const { pageBackgroundImage, products, taxes, coupons } = response;
        const defaultFormImage = "../podo_13.png";
        form.backGroundImage =
          pageBackgroundImage === undefined || pageBackgroundImage === ""
            ? defaultFormImage
            : pageBackgroundImage;
        form.properties = { products, taxes, coupons };
      });
    });
  };

  /* Gets all forms of user. */

  getUserForms = () => {
    const self = this;
    const forms = [];
    JotFormAPI.getForms().then(function successForms(responseForms) {
      const formsResponse = responseForms;
      for (let index = 0; index < formsResponse.length; index += 1) {
        forms.push({
          id: formsResponse[index].id,
          header: formsResponse[index].title,
          avatar: "https://www.jotform.com/resources/assets/podo/podo_4.png",
          created_at: formsResponse[index].created_at,
          subCount: formsResponse[index].count,
          key: index
        });
      }
      self.getFormsQuestions(forms);
      self.getFormsProperties(forms);
    });
    return { forms };
  };

  /* Gets profile photo, name and created year data of user using JotForm API */

  getUser = () => {
    const user = {};
    JotFormAPI.getUser().then(function successUser(response) {
      user.username = response.username;
      user.avatarUrl = response.avatarUrl;
      user.name = response.name;
      user.year = response.created_at.substring(0, 4);
    });
    return { user };
  };

  /* Gets user data such as forms, questions and widgets using JotForm API */

  getUserData = () => {
    const { jotformWidgets, selectedWidgets } = this.getJotFormWidgets();
    const { forms } = this.getUserForms();
    const { user } = this.getUser();
    this.setState({ jotformWidgets });
    this.setState({ selectedWidgets });
    this.setState({ forms });
    this.setState({ user });
    this.setState({ authorized: true });
  };

  /* Renders Login, Forms and Submissions pages according to routing switch */

  render() {
    const {
      currentForm,
      authorized,
      forms,
      jotformWidgets,
      selectedWidgets,
      user
    } = this.state;

    return (
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <LoginPage authorized={authorized} getUserData={this.getUserData} />
          )}
        />
        <Route
          path="/forms"
          component={() => (
            <Forms
              user={user}
              authorized={authorized}
              setCurrentForm={this.setCurrentForm}
              forms={forms}
              jotformWidgets={jotformWidgets}
              selectedWidgets={selectedWidgets}
              setAuthFalse={this.setAuthFalse}
            />
          )}
        />
        <Route
          path="/submissions"
          component={() => (
            <Submissions
              user={user}
              form={currentForm}
              authorized={authorized}
              setAuthFalse={this.setAuthFalse}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
