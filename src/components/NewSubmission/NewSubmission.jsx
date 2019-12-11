/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import { Button, Modal, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import QuestionFilter from "../QuestionFilter/QuestionFilter";

/**
 * Check submission count input validation
 * @param {string} submissionCount
 * @returns {object}
 */
const getDisabledData = submissionCount => {
  const disabledLink = submissionCount === "" ? "none" : "";
  const disabledButton = submissionCount === "";
  return { disabledLink, disabledButton };
};

/* New submission button styles */
const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "#444",
    "&:hover": {
      backgroundColor: green[600]
    }
  }
}));

/* New submission button functional component */
export default function NewSubmission(props) {
  /* Prop types */
  NewSubmission.propTypes = {
    widgets: PropTypes.array.isRequired,
    selectedWidgets: PropTypes.array.isRequired,
    setCurrentForm: PropTypes.func.isRequired
  };

  const classes = useStyles();

  const { widgets, selectedWidgets, setCurrentForm } = props;

  /* State initialization. Default submission count : 1 */
  const [selecteds, setSelecteds] = React.useState(selectedWidgets);
  const [submissionCount, setSubmissionCount] = React.useState(1);

  const { disabledLink, disabledButton } = getDisabledData(submissionCount);

  return (
    <Modal
      trigger={
        <Fab aria-label="Add" className={classes.fab} color="primary">
          <AddIcon />
        </Fab>
      }
      closeIcon
    >
      <Modal.Header>Filter Questions</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <QuestionFilter
            form={{ newSubmission: true }}
            questions={widgets}
            selectedQuestions={selecteds}
            setSelectedQuestions={setSelecteds}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Input
          label={{ basic: true, content: "Number of Submission" }}
          labelPosition="right"
          style={{ float: "left" }}
          type="number"
          value={submissionCount}
          onChange={e => setSubmissionCount(e.target.value)}
          placeholder="Submission count..."
        />
        <Link to="/submissions" style={{ pointerEvents: disabledLink }}>
          <Button
            disabled={disabledButton}
            onClick={() =>
              setCurrentForm({
                id: "new_submission",
                selectedQuestions: selecteds.filter(widget => widget !== false),
                submissionCount
              })
            }
            inverted
            color="green"
          >
            Next
          </Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
}
