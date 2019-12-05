/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import WifiIcon from "@material-ui/icons/Wifi";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleToggle, checked, qid, questionText } = this.props;

    return (
      <ListItem>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary={questionText} />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle(qid)}
            checked={checked}
            inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

Question.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  qid: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired
};

export default Question;
