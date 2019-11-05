/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "./style.css";
import PropTypes from "prop-types";

class QuestionFilter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // items: questions,
      // selectedItems
    };
  }

  handleChange(selectedItems) {
    const { setSelectedQuestions, formID } = this.props;
    // this.setState({ selectedItems });
    setSelectedQuestions(selectedItems, formID);
  }

  render() {
    // const { selectedItems } = this.state;
    const { questions, selectedItems } = this.props;

    // const { generateSubmission } = this.props;

    return (
      <MultiSelect
        showSelectedItemsSearch={false}
        showSelectedItems={false}
        items={questions}
        selectedItems={selectedItems}
        onChange={this.handleChange}
      />
    );
  }
}

QuestionFilter.propTypes = {
  questions: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  formID: PropTypes.string.isRequired
};

export default QuestionFilter;
