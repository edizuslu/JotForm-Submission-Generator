/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit() {
    const { clicked } = this.props;

    const formID = document.getElementById("form_id").value;
    const apiKey = document.getElementById("api_key").value;
    const submissionCount = document.getElementById("submission_count").value;
    clicked({ formID, apiKey, submissionCount });
  }

  render() {
    return (
      <div id="main-registration-container">
        <div id="register">
          <h3>Random Submission Generator</h3>
          <form method="post" name="userRegistrationForm">
            <label>Form ID</label>
            <input
              id="form_id"
              type="text"
              name="form_id"
              onChange={this.handleChange}
            />
            <label>API Key:</label>
            <input
              id="api_key"
              type="text"
              name="api_key"
              onChange={this.handleChange}
            />
            <label>Number Of Submission:</label>
            <input
              id="submission_count"
              type="text"
              name="number_of_submission"
              onChange={this.handleChange}
            />
            <Fab
              variant="extended"
              aria-label="delete"
              className={useStyles.fab}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={this.submit.bind(this)}
            >
              <NavigationIcon className={useStyles.extendedIcon} />
              Generate
            </Fab>
          </form>
        </div>
      </div>
    );
  }
}

StartPage.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default StartPage;
