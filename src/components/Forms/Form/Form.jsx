/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Image,
  Placeholder,
  Modal,
  Icon,
  Input
} from "semantic-ui-react";
import QuestionFilter from "../../QuestionFilter/QuestionFilter";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      form,
      loading,
      setSelectedQuestions,
      setCurrentForm,
      submissionCountChange
    } = this.props;

    const disabledLink = form.submissionCount === "" ? "none" : "";

    const disabledButton = form.submissionCount === "";

    return (
      <Card key={form.header}>
        {loading ? (
          <Placeholder>
            <Placeholder.Image square />
          </Placeholder>
        ) : (
          <Image src="https://www.jotform.com/resources/assets/podo/podo_4.png" />
        )}

        <Card.Content>
          {loading ? (
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line length="very short" />
                <Placeholder.Line length="medium" />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          ) : (
            <>
              <Card.Header>{form.header}</Card.Header>
              <Card.Meta>{`Created At: ${form.created_at}`}</Card.Meta>
              <Card.Description>
                {`Last Submission:${form.last_submission}`}
              </Card.Description>
            </>
          )}
        </Card.Content>

        <Card.Content extra>
          <Modal trigger={<Button>Filter Questions</Button>} closeIcon>
            <Modal.Header>Filter Questions</Modal.Header>

            <Modal.Content image>
              <Modal.Description>
                <QuestionFilter
                  form={form}
                  questions={form.questions}
                  selectedQuestions={form.selectedQuestions}
                  setSelectedQuestions={setSelectedQuestions}
                />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <>
                <Input
                  label={{ basic: true, content: "Number of Submission" }}
                  labelPosition="right"
                  style={{ float: "left" }}
                  type="number"
                  value={form.submissionCount}
                  onChange={e => submissionCountChange(e, form.key)}
                  placeholder="Submission count..."
                />
                <Link to="/submissions" style={{ pointerEvents: disabledLink }}>
                  <Button
                    disabled={disabledButton}
                    onClick={() => setCurrentForm(form)}
                    primary
                  >
                    Next
                    <Icon name="right chevron" />
                  </Button>
                </Link>
              </>
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </Card>
    );
  }
}

Form.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  setCurrentForm: PropTypes.func.isRequired,
  submissionCountChange: PropTypes.func.isRequired
};

export default Form;
