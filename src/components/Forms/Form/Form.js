/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
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
      toggleSendSubmission,
      setSelectedQuestions,
      sendSubmission,
      submissionCountChange,
      submissionCountInvalid
    } = this.props;
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
            {toggleSendSubmission ? (
              <Modal.Header>Submissions</Modal.Header>
            ) : (
              <Modal.Header>Filter Questions</Modal.Header>
            )}

            <Modal.Content image>
              <Modal.Description>
                {form.questions !== undefined &&
                form.selectedItems !== undefined ? (
                  <QuestionFilter
                    formID={form.id}
                    questions={form.questions}
                    selectedItems={form.selectedItems}
                    setSelectedQuestions={setSelectedQuestions}
                  />
                ) : null}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              {toggleSendSubmission ? (
                <Button onClick={() => this.sendSubmission2(form.id)} primary>
                  Send
                  <Icon name="right chevron" />
                </Button>
              ) : (
                <>
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
                      onClick={() => sendSubmission(form)}
                      primary
                    >
                      Next
                      <Icon name="right chevron" />
                    </Button>
                  ) : (
                    <Link to="/send-submission" style={{ color: "aliceblue" }}>
                      <Button
                        disabled={submissionCountInvalid}
                        onClick={() => sendSubmission(form)}
                        primary
                      >
                        Next
                        <Icon name="right chevron" />
                      </Button>
                    </Link>
                  )}
                </>
              )}
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
  toggleSendSubmission: PropTypes.bool.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  submissionCountChange: PropTypes.func.isRequired,
  submissionCountInvalid: PropTypes.bool.isRequired
};

export default Form;
