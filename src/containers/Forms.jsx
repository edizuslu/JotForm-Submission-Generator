/* eslint-disable react/forbid-prop-types */
import _ from "lodash";
import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Form from "../components/Form/Form";
import NewSubmission from "../components/NewSubmission/NewSubmission";
import AppHeader from "../components/AppHeader/AppHeader";

const styleLinkHref =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";

/* Container of form components */
class Forms extends Component {
  constructor(props) {
    super(props);
    const { forms } = this.props;
    this.state = {
      loading: false,
      forms
    };
  }

  /* Loading animation with placeholders, lazy loading */
  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }

  /**
   * Handle question select actions
   * @param {object} newSelectedQuestions
   * @param {number} formIndex
   */
  setSelectedQuestions = (newSelectedQuestions, formIndex) => {
    const { forms } = this.state;
    const newForm = {
      ...forms[formIndex]
    };
    newForm.selectedQuestions = newSelectedQuestions;
    forms[formIndex] = newForm;
    this.setState({ forms });
  };

  /**
   * Handles submissionCount input's changing
   * @param {number} newSubCount
   * @param {number} formIndex
   */
  submissionCountChange = (newSubCount, formIndex) => {
    const submissionCount = newSubCount.target.value;
    const { forms } = this.state;
    const newForm = {
      ...forms[formIndex]
    };
    newForm.submissionCount = submissionCount;
    forms[formIndex] = newForm;
    this.setState({ forms });
  };

  render() {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = styleLinkHref;
    document.head.appendChild(styleLink);

    const { authorized, setAuthFalse, user } = this.props;
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

/* Prop types */
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
