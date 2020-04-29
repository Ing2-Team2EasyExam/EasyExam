import React from 'react';
import { styles } from "../utils/styles";
import Form from "./Form";
import PedagogicalGoalsInput from "./PedagogicalGoalsInput";
import { palette } from "../utils/colors";
import { get, post } from "../utils/api";
import { LocalDate } from 'js-joda';
import { withUserContext } from "./UserState";
import { Set } from 'immutable';
import ActionFailedModal from "./ActionFailedModal";

class CreateControl extends React.Component {
  state = {
    nextRoute: null,
    formValues: {
      examName: 'Control 1',
      examDate: LocalDate.now().toString(),
      examStartTime: '14:30',
      examEndTime: '16:00',
      teacherName: 'Jérémy Barbay',
      courseName: 'Algoritmos y Estructuras de Datos',
      courseCode: 'CC3001',
      universityName: 'Teaching is Learning',
      examLanguage: 'english',
      examStyle: 'compact',
      examLearningGoals: new Set(),
      problems: [],
    },
    topics: 'loading',
    exam: null,
    error: null,
  };
  onChangeField = ({ fieldKey, value }) => {
    this.setState(prev => ({
      formValues: { ...prev.formValues, [ fieldKey ]: value },
    }))
  };
  onSubmit = async ({ examName, examDate, examStartTime, examEndTime, teacherName, courseName, courseCode, universityName, examLanguage, examStyle, examLearningGoals, problems }) => {
    const { history, token, locale } = this.props;

    // Check time consistency
    const stime = Number(examStartTime.substring(0,2))*60 + Number(examStartTime.substring(3))
    const etime = Number(examEndTime.substring(0,2))*60 + Number(examEndTime.substring(3))
    if(etime - stime <= 0){
      this.setState({ error: locale.createExamTimeError})
      return ;
    }

    this.setState({ exam: 'loading' });
    post('exams/', {
      name: examName,
      university: universityName,
      teacher: teacherName,
      course: courseName,
      course_code: courseCode,
      date: examDate,
      start_time: examStartTime,
      end_time: examEndTime,
      problems: problems.map(problem => problem.uuid),
      token,
    }).then(exam => {
      this.setState({ exam });
      history.push(`/createControl/downloadExam/${exam.uuid}`);
    }).catch(err => {
      this.setState({ exam: 'error', err });
    });
  };

  async componentDidMount() {
    const topics = await get('topics/');
    this.setState({ topics });
  }

  onRetry = async () => {
    const { formValues } = this.state;
    await this.onSubmit(formValues);
  };

  onHideModal = () => {
    this.setState({ exam: null });
  };

  render() {
    const { formValues, topics, exam, err } = this.state;
    const { locale } = this.props;

    const languageOptions = [
      { value: 'spanish', label: locale.spanish },
      { value: 'english', label: locale.english },
    ];

    const examStyleOptions = [
      { value: 'compact', label: locale.compact },
    ];

    if(this.state.error !== null){
      setTimeout(function(){
        this.setState({error : null})
      }.bind(this),5000)
    }

    return <div style={styles.centerContent}>
      {this.state.error !== null ? <div className="alert alert-warning"> {this.state.error} </div> : null}
      <Form onSubmit={this.onSubmit} values={formValues} onChangeField={this.onChangeField} style={styles.bigForm}
        disabled={exam === 'loading'}
      >
        <div style={styles.fieldColumns}>
          <div style={styles.fieldColumn}>
            <Form.Field fieldKey='examName' label={locale.examName} type='title' tooltip={locale.examNameTooltip}/>
        <Form.Field fieldKey='examDate' label={locale.examDate} type='date'tooltip={locale.examDateTooltip}/>
        <Form.Field fieldKey='examStartTime' label={locale.examStartTime} type='time'/>
        <Form.Field fieldKey='examEndTime' label={locale.examEndTime} type='time'/>
        <Form.Field fieldKey='teacherName' label={locale.teacherName} type='title'/>
        <Form.Field fieldKey='courseName' label={locale.courseName} type='title' tooltip={locale.courseNameTooltip}/>
        <Form.Field fieldKey='courseCode' label={locale.courseCode} type='title' tooltip={locale.courseCodeTooltip}/>
        <Form.Field fieldKey='universityName' label={locale.universityName} type='title' tooltip={locale.universityNameTooltip}/>
          </div>

          <div style={styles.fieldColumn}>
            <Form.Field fieldKey='examLanguage' label={locale.examLanguage} type='select' options={languageOptions} tooltip={locale.examLanguageTooltip}/>
        <Form.Field fieldKey='examStyle' label={locale.examStyle} type='select' options={examStyleOptions} tooltip={locale.examStyleTooltip} />
        <div style={styles.blockTopicProblems}>
    <Form.Field fieldKey='examLearningGoals' label={locale.examLearningGoals} type='learningGoals'
                    options={topics} tooltip={locale.learningGoalsTooltip}/>
    <Form.Field fieldKey='problems' label={locale.problems} type='problems' topics={formValues.examLearningGoals.toArray()} tooltip={locale.nProblemsTooltip}/>
        </div>
    {locale.estimatedValue} {formValues.problems.map(problem => problem.cost).reduce((a, b) => a + b, 0)}
        <Form.SubmitButton text={locale.submitCreateExam}/>
          </div>
        </div>
      </Form>

      <ActionFailedModal
        isVisible={exam === 'error'}
        err={err}
        onRetry={this.onRetry}
        onHide={this.onHideModal}
      />
    </div>;
  }
}

export default withUserContext(CreateControl);
