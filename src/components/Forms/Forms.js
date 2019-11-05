/* eslint-disable react/jsx-filename-extension */
import _ from "lodash";
import jf from "jotform";
import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import FakeDataClass from "../../FakeData";
import Widgets from "../../Widgets";
import Form from "./Form/Form";
import NewSubmission from "./NewSubmission";

const FakeData = new FakeDataClass();

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      submissionCountInvalid: true,
      forms: undefined,
      widgets: [],
      selectedWidgets: [],
      submissionCount: 0,
      toggleSendSubmission: false,
      setCurrentForm: props.setCurrentForm
    };
  }

  componentDidMount() {
    const forms = [];
    const self = this;

    jf.getForms().then(function successForms(responseForms) {
      const formsResponse = responseForms;
      for (let index = 0; index < formsResponse.length; index += 1) {
        forms.push({
          id: formsResponse[index].id,
          header: formsResponse[index].title,
          avatar: "https://www.jotform.com/resources/assets/podo/podo_4.png",
          created_at: formsResponse[index].created_at,
          last_submission:
            formsResponse[index].last_submission === null
              ? "No Submission"
              : formsResponse[index].last_submission
        });
      }

      self.setState({ forms });
    });

    this.setState({ loading: true });

    if (forms !== undefined) {
      setTimeout(() => {
        for (let i = 0; i < forms.length; i += 1) {
          jf.getFormQuestions(forms[i].id).then(function functionSuccess(
            response
          ) {
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
            const newForms = forms;
            FakeData.assign(newForms[i], ["questions"], inputQuestions);
            FakeData.assign(
              newForms[i],
              ["selectedItems"],
              new Array(inputQuestions.length).fill(false)
            );
            self.setState({ newForms });
          });
        }
        this.getAllWidgets();
        this.setState({ loading: false });
      }, 1500);
    }
  }

  getAllWidgets = () => {
    const formElements = Widgets.FormElements;
    const widgetKeys = ["Basic", "Payments", "Widgets"];
    const inputQuestions = [];

    let qid = 0;
    for (let index = 0; index < widgetKeys.length; index += 1) {
      const keys = Object.keys(formElements[widgetKeys[index]]);
      const elements = formElements[widgetKeys[index]];
      for (let i = 0; i < keys.length; i += 1) {
        inputQuestions.push({
          id: qid.toString(),
          label: elements[keys[i]],
          type: keys[i]
        });
        qid += 1;
      }
    }
    this.setState({ widgets: inputQuestions });
    this.setState({
      selectedWidgets: new Array(inputQuestions.length).fill(false)
    });
  };

  setSelectedWidgets = selectedItems => {
    this.setState({ selectedWidgets: selectedItems });
  };

  backToForms = () => {
    this.setState({ toggleSendSubmission: false });
  };

  setSelectedQuestions = (selectedItems, formID) => {
    const { forms } = this.state;
    for (let index = 0; index < forms.length; index += 1) {
      if (forms[index].id === formID) {
        const newForms = forms;
        newForms[index].selectedItems = selectedItems;
        this.setState({ forms: newForms });
        break;
      }
    }
  };

  sendSubmission = form => {
    const { setCurrentForm, submissionCount } = this.state;
    const currentForm = form;
    currentForm.submissionCount = submissionCount;
    setCurrentForm(form);
  };

  submissionCountChange = e => {
    const submissionCount = e.target.value;
    const regex = /^[0-9]+$/g;
    const isNumeric = submissionCount.match(regex) !== null;

    if (isNumeric) {
      this.setState({ submissionCountInvalid: false });
      this.setState({ submissionCount: e.target.value });
    } else {
      this.setState({ submissionCountInvalid: true });
    }
  };

  render() {
    const { authorized } = this.props;
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href =
      "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

    const {
      loading,
      forms,
      widgets,
      selectedWidgets,
      toggleSendSubmission,
      submissionCountInvalid
    } = this.state;

    if (!authorized) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <Container style={{ margin: 20 }}>
          <>
            <Card.Group doubling stackable style={{ position: "absolute" }}>
              {_.map(forms, form => (
                <Form
                  key={form.id}
                  form={form}
                  loading={loading}
                  submissionCountInvalid={submissionCountInvalid}
                  toggleSendSubmission={toggleSendSubmission}
                  setSelectedQuestions={this.setSelectedQuestions}
                  sendSubmission={this.sendSubmission}
                  submissionCountChange={this.submissionCountChange}
                />
              ))}
            </Card.Group>
          </>
        </Container>
        <NewSubmission
          widgets={widgets}
          selectedWidgets={selectedWidgets}
          setSelectedWidgets={this.setSelectedWidgets}
          sendSubmission={this.sendSubmission}
          submissionCountInvalid={submissionCountInvalid}
          submissionCountChange={this.submissionCountChange}
        />
      </>
    );
  }
}

Forms.propTypes = {
  authorized: PropTypes.bool.isRequired,
  setCurrentForm: PropTypes.func.isRequired
};

export default Forms;
