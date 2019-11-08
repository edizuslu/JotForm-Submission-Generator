/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "./style.css";
import PropTypes from "prop-types";

class QuestionFilter extends Component {
  constructor(props) {
    super(props);
    this.handleChangeQuestionCheckbox = this.handleChangeQuestionCheckbox.bind(
      this
    );
    this.state = {};
  }

  handleChangeQuestionCheckbox(selectedQuestions) {
    const { setSelectedQuestions, form } = this.props;
    setSelectedQuestions(selectedQuestions, form.key);
  }

  render() {
    const { questions, selectedQuestions } = this.props;
    return (
      <MultiSelect
        showSelectedItemsSearch={false}
        showSelectedItems={false}
        items={questions}
        selectedItems={selectedQuestions}
        onChange={this.handleChangeQuestionCheckbox}
      />
    );
  }
}

QuestionFilter.propTypes = {
  questions: PropTypes.array.isRequired,
  selectedQuestions: PropTypes.array.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
};

export default QuestionFilter;
