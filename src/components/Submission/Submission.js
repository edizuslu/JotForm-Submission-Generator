/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

const GreenCheckbox = withStyles({
  root: {
    color: grey[400],
    "&$checked": {
      color: grey[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export default function Submission(props) {
  Submission.propTypes = {
    submission: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    handleChangeCheckBox: PropTypes.func.isRequired,
    handleChangeSubmission: PropTypes.func.isRequired
  };

  const {
    submission,
    selected,
    id,
    handleChangeCheckBox,
    handleChangeSubmission
  } = props;

  function update(edit, index) {
    handleChangeSubmission(edit, index);
  }

  return (
    <>
      <GreenCheckbox
        checked={selected}
        onChange={() => handleChangeCheckBox(id)}
        value="checkedG"
      />
      <ReactJson
        onEdit={edit => {
          update(edit, id);
        }}
        src={JSON.parse(submission)}
      />
    </>
  );
}
