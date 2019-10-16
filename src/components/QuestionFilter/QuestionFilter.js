/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "./style.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

class QuestionFilter extends Component {
  constructor(props) {
    super(props);
    const { questions, selectedItems } = this.props;
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      items: questions,
      selectedItems
    };
  }

  handleChange(selectedItems) {
    const { setSelectedQuestions } = this.props;
    this.setState({ selectedItems });
    setSelectedQuestions(selectedItems);
  }

  render() {
    const { items, selectedItems } = this.state;
    const { generateSubmission } = this.props;
    return (
      <div id="main-registration-container">
        <div id="register">
          <form method="post" name="userRegistrationForm">
            <MultiSelect
              showSelectedItemsSearch={false}
              showSelectedItems={false}
              items={items}
              selectedItems={selectedItems}
              onChange={this.handleChange}
            />
            <Fab
              variant="extended"
              aria-label="delete"
              className={useStyles.fab}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={generateSubmission}
            >
              <NavigationIcon className={useStyles.extendedIcon} />
              Create Submission
            </Fab>
          </form>
        </div>
      </div>
    );
  }
}

QuestionFilter.propTypes = {
  questions: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  generateSubmission: PropTypes.func.isRequired
};

export default QuestionFilter;
