import React from 'react';
import { withUserContext } from "./UserState";
import { Modal } from "react-bootstrap";
import { styles } from "../utils/styles";
import Form from "./Form";
import SendProblem from "./SendProblem";
import { get, post } from "../utils/api";

class ProblemInputModal extends React.Component {
  state = {
    formValues: {
      problemType: 'random',
    },
    isAdding: false,
  };

  onChangeField = ({ fieldKey, value }) => {
    this.setState(prev => ({
      formValues: { ...prev.formValues, [ fieldKey ]: value },
    }))
  };

  onSendSuccessful = (problem) => {
    const problemType = this.state.formValues.problemType;
    const { onFinishAddProblem } = this.props;
    onFinishAddProblem({ ...problem, type: problemType });
  };

  onRequestRandomProblem = async () => {
    const { topics, onFinishAddProblem, token } = this.props;
    this.setState({ isAdding: true });
    const problem = await post('problems/random/', {
      topics: topics.map(topic => topic.pk),
      token,
    });
    onFinishAddProblem({ ...problem, type: 'random' });
    this.setState({ isAdding: false });
  };

  render() {
    const { formValues, problem } = this.state;
    const { locale, isVisible, onHide, username } = this.props;
    const { problemType } = formValues;
    const problemTypeOptions = [
      { value: 'random', label: locale.random },
      { value: 'manual', label: locale.manual },
    ];

    return <Modal show={isVisible} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{locale.addProblem}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={styles.centerContent}>
          <Form onSubmit={this.onRequestRandomProblem} values={formValues} onChangeField={this.onChangeField}
                disabled={problemType === 'manual' && problem == null}>
            <Form.Field fieldKey='problemType' label={locale.problemType} type='select' options={problemTypeOptions}/>

            {problemType === 'manual' && username != null ?
              <SendProblem onSubmitSuccessful={this.onSendSuccessful}
              /> : problemType === 'manual' && username == null ?
                <div>{locale.manualProblemRequiresLogin}</div> : null}

            {problemType === 'random' ?
              <Form.SubmitButton text={locale.addProblem}/>
              : null}
          </Form>
        </div>
      </Modal.Body>
    </Modal>;
  }
}

export default withUserContext(ProblemInputModal);