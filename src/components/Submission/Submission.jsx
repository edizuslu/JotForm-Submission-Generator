/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

/* Submission's check box element style */
const SubmissionCheckBox = withStyles({
  root: {
    color: grey[400],
    "&$checked": {
      color: grey[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

/* Submission functional component */
export default function Submission(props) {
  /* Prop types */
  Submission.propTypes = {
    submission: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    handleChangeCheckBox: PropTypes.func.isRequired,
    handleEditSubmission: PropTypes.func.isRequired
  };

  const {
    submission,
    selected,
    id,
    handleChangeCheckBox,
    handleEditSubmission
  } = props;

  /* Renders submission component */
  return (
    <>
      <SubmissionCheckBox
        checked={selected}
        onChange={() => handleChangeCheckBox(id)}
        value="checkedG"
      />
      <ReactJson
        onEdit={edit => {
          handleEditSubmission(edit, id);
        }}
        src={JSON.parse(submission)}
      />
    </>
  );
}
