import React from 'react';
import RichTextEditor from "react-rte";
import { styles } from "../utils/styles";
import LatexEditor from "./LatexEditor";
import Field from "./Field";
import Form from "./Form";
import { LocalDate } from "js-joda/dist/js-joda";
import { get, post } from "../utils/api";
import { withUserContext } from "./UserState";
import { Set } from 'immutable';
import ActionFailedModal from "./ActionFailedModal";
import ComposeProblem from "./ComposeProblem";

function formatProblemContent({ statement, solution, markingScheme }) {
  return (
    `${statement}

\\begin{solution}
${solution}
\\end{solution}

\\begin{suggestedMarkingScheme}
${markingScheme}
\\end{suggestedMarkingScheme}`
  );
}

class LatexField extends React.Component {
  render() {
    const { label } = this.props;

    return <div style={styles.latexField}>
      <div>
        {label}:<br/>
        <LatexEditor/>
      </div>
      <div>
        Figuras:<br/>
        <input type="file"/>
      </div>
    </div>
  }
}

class SendProblem extends React.Component {
  state = {
    formValues: {
      problemName: '',
      problemAuthor: 'Teaching is Learning',
      statement: '',
      solution: '',
      markingScheme: '',
      learningGoals: new Set(),
    },
    figures: [],
    topics: 'loading',
    problem: null,
    err: null,
  };

  async componentDidMount() {
    const topics = await get('topics/');
    this.setState({ topics });
  }

  onChangeField = ({ fieldKey, value }) => {
    this.setState(prev => ({
      formValues: { ...prev.formValues, [ fieldKey ]: value },
    }))
  };

  onSubmit = async formValues => {
    const { token, history, onSubmitSuccessful } = this.props;
    const { problemName, problemAuthor, learningGoals } = formValues;
    const { figures } = this.state;

    this.setState({ problem: 'loading' });
    await post('problems/', {
      name: problemName,
      author: problemAuthor,
      content: formatProblemContent(formValues),
      topics_data: learningGoals.toArray().map(topic => topic.name),
      figures,
      token,
      multipartFormData: true,
    }).then(problem => {
      problem.topics = problem.topics_data;
      this.setState({ problem });
      if (onSubmitSuccessful) {
        onSubmitSuccessful(problem);
      }
      else {
        history.push('/sendProblem/success');
      }
    }).catch(err => {
      this.setState({ problem: 'error', err });
    });
  };

  onRetry = async () => {
    const { formValues } = this.state;
    this.setState({ problem: null });
    await this.onSubmit(formValues);
  };

  onHideModal = () => {
    this.setState({ problem: null });
  };

  onChangeFigures = figures => {
    this.setState({ figures });
  };

  render() {
    const { formValues, topics, problem, err, figures } = this.state;
    const { locale } = this.props;

    return <div style={styles.centerContent}>
      <Form onSubmit={this.onSubmit} values={formValues} onChangeField={this.onChangeField}
            disabled={problem === 'loading'} style={{ minWidth: "50%", maxWidth: "95%" }}>
        <Form.Field fieldKey='problemName' label={locale.problemName} type='title' tooltip={locale.pNameTooltip}/>
        <Form.Field fieldKey='problemAuthor' label={locale.problemAuthor} type='title'/>
        <Form.Field fieldKey='learningGoals' label={locale.learningGoals} type='learningGoals' options={topics}
                    tooltip={locale.pLearningGoalTooltip}/>
        <ComposeProblem
          onChangeFigures={this.onChangeFigures}
          figures={figures}
        />
        <Form.SubmitButton text={locale.submitProblem}/>
      </Form>

      <ActionFailedModal
        isVisible={problem === 'error'}
        onRetry={this.onRetry}
        onHide={this.onHideModal}
        err={err}
      />
    </div>;
  }
}

export default withUserContext(SendProblem);
