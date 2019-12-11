/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "./style.css";
import PropTypes from "prop-types";

/* Question filter class component */
class QuestionFilter extends Component {
  constructor(props) {
    super(props);
    this.questionCheckBoxChange = this.questionCheckBoxChange.bind(this);
    this.state = {};
  }

  /**
   * Handles question's  checkbox clicking
   * @param {array} selectedQuestions
   */
  questionCheckBoxChange(selectedQuestions) {
    const { setSelectedQuestions, form } = this.props;
    setSelectedQuestions(selectedQuestions, form.key);
  }

  render() {
    const { questions, selectedQuestions } = this.props;

    /* Render question filter component */
    return (
      <MultiSelect
        showSelectedItemsSearch={false}
        showSelectedItems={false}
        items={questions}
        selectedItems={selectedQuestions}
        onChange={this.questionCheckBoxChange}
      />
    );
  }
}

/* Prop types */
QuestionFilter.propTypes = {
  questions: PropTypes.array.isRequired,
  selectedQuestions: PropTypes.array.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
};

export default QuestionFilter;
