/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import { Button, Modal, Icon, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import QuestionFilter from "../QuestionFilter/QuestionFilter";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "#444"
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600]
    }
  }
}));

export default function NewSubmission(props) {
  NewSubmission.propTypes = {
    widgets: PropTypes.array.isRequired,
    selectedWidgets: PropTypes.array.isRequired,
    setSelectedWidgets: PropTypes.func.isRequired,
    submissionCountInvalid: PropTypes.bool.isRequired,
    sendSubmission: PropTypes.func.isRequired,
    submissionCountChange: PropTypes.func.isRequired
  };

  const classes = useStyles();

  const {
    widgets,
    selectedWidgets,
    setSelectedWidgets,
    submissionCountInvalid,
    sendSubmission,
    submissionCountChange
  } = props;

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
            formID="0"
            questions={widgets}
            selectedItems={selectedWidgets}
            setSelectedQuestions={setSelectedWidgets}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Input
          label={{ basic: true, content: "Number of Submission" }}
          labelPosition="right"
          style={{ float: "left" }}
          onChange={submissionCountChange}
          placeholder="Submission count..."
        />
        {submissionCountInvalid ? (
          <Button
            disabled={submissionCountInvalid}
            onClick={() =>
              sendSubmission({
                id: "new_submission",
                selectedItems: selectedWidgets.filter(
                  widget => widget !== false
                )
              })
            }
            primary
          >
            Next
            <Icon name="right chevron" />
          </Button>
        ) : (
          <Link to="/send-submission" style={{ color: "aliceblue" }}>
            <Button
              disabled={submissionCountInvalid}
              onClick={() =>
                sendSubmission({
                  id: "new_submission",
                  selectedItems: selectedWidgets.filter(
                    widget => widget !== false
                  )
                })
              }
              primary
            >
              Next
              <Icon name="right chevron" />
            </Button>
          </Link>
        )}
      </Modal.Actions>
    </Modal>
  );
}
