/* eslint-disable react/forbid-prop-types */
import _ from "lodash";
import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Form from "./Form/Form";
import NewSubmission from "../Submission/NewSubmission/NewSubmission";
import AppHeader from "../AppHeader/AppHeader";

const styleLinkHref =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";

class Forms extends Component {
  constructor(props) {
    super(props);
    const { forms } = this.props;
    this.state = {
      loading: false,
      forms
    };
  }

  /* Loading animation */

  componentDidMount() {
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }

  /* Handles select or deselect question */

  setSelectedQuestions = (selectedQuestions, formIndex) => {
    const { forms } = this.state;
    const form = {
      ...forms[formIndex]
    };
    form.selectedQuestions = selectedQuestions;
    forms[formIndex] = form;
    this.setState({ forms });
  };

  /* Handles submissionCount input's changing */

  submissionCountChange = (newSubCount, formIndex) => {
    const submissionCount = newSubCount.target.value;
    const { forms } = this.state;
    const form = {
      ...forms[formIndex]
    };
    form.submissionCount = submissionCount;
    forms[formIndex] = form;
    this.setState({ forms });
  };

  render() {
    const { authorized, setAuthFalse, user } = this.props;
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = styleLinkHref;
    document.head.appendChild(styleLink);
    const { loading, forms } = this.state;
    const { jotformWidgets, setCurrentForm, selectedWidgets } = this.props;

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
        <Container style={{ margin: 20 }}>
          <>
            <Card.Group doubling stackable style={{ position: "absolute" }}>
              {_.map(forms, form => (
                <Form
                  key={form.key}
                  form={form}
                  loading={loading}
                  setSelectedQuestions={this.setSelectedQuestions}
                  setCurrentForm={setCurrentForm}
                  submissionCountChange={this.submissionCountChange}
                />
              ))}
            </Card.Group>
          </>
        </Container>
        <NewSubmission
          widgets={jotformWidgets}
          selectedWidgets={selectedWidgets}
          setSelectedWidgets={this.setSelectedWidgets}
          setCurrentForm={setCurrentForm}
          submissionCountInvalid={false}
          submissionCountChange={this.submissionCountChange}
          submissionCount={0}
        />
      </>
    );
  }
}

Forms.propTypes = {
  authorized: PropTypes.bool.isRequired,
  setCurrentForm: PropTypes.func.isRequired,
  forms: PropTypes.array.isRequired,
  jotformWidgets: PropTypes.array.isRequired,
  selectedWidgets: PropTypes.array.isRequired,
  setAuthFalse: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Forms;
