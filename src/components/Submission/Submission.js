/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { grey } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import CopyIcon from "@material-ui/icons/FileCopy";
import Fab from "@material-ui/core/Fab";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "33.3%",
    maxHeight: "100%",
    display: "table"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: grey[500]
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: "350px"
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  resize: {
    fontSize: 9,
    color: "black"
  }
}));

const GreenCheckbox = withStyles({
  root: {
    color: grey[400],
    "&$checked": {
      color: grey[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

function copyStringToClipboard(str) {
  toast("Copied to clipboard!");
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export default function Submission(props) {
  Submission.propTypes = {
    submission: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    handleChangeCheckBox: PropTypes.func.isRequired,
    submissionNumber: PropTypes.number.isRequired
  };
  const classes = useStyles();
  const {
    submission,
    selected,
    id,
    submissionNumber,
    handleChangeCheckBox
  } = props;
  const [values, setValues] = React.useState({
    submission
  });

  const handleChange = submissionName => event => {
    setValues({ ...values, [submissionName]: event.target.value });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <div>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={selected}
                  onChange={() => handleChangeCheckBox(id)}
                  value="checkedG"
                />
              }
              label={submissionNumber}
            />
          </div>
        }
        action={
          <div>
            <Fab
              enabled={1}
              aria-label="copy"
              className={classes.fab}
              size="small"
              onClick={() => copyStringToClipboard(submission)}
            >
              <CopyIcon />
            </Fab>
            <ToastContainer> </ToastContainer>
          </div>
        }
      />

      <CardContent>
        <TextField
          display="block"
          id="filled-multiline-flexible"
          multiline
          rowsMax="20"
          onChange={handleChange("submission")}
          value={values.submission}
          className={classes.textField}
          InputProps={{
            readOnly: false,
            classes: {
              input: classes.resize
            }
          }}
          margin="normal"
          spellCheck="false"
        />
      </CardContent>
    </Card>
  );
}
