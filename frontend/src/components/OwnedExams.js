import React from 'react';
import { styles } from "../utils/styles";
import { withUserContext } from "./UserState";
import LoadingAnimation from "./LoadingAnimation";
import { FaTimesCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { colors, palette } from "../utils/colors";
import PdfPreview from "./PdfPreview";
import { NoExam, uriToBackend } from "./DownloadExam";
import { get } from "../utils/api";

let NoExams = class extends React.Component {
  render() {
    const { locale } = this.props;

    return <div style={styles.centerContent}>
      <FaTimesCircle size={128} color={palette.error}/>
      {locale.noExams}
    </div>;
  }
};
NoExams = withUserContext(NoExams);

let ExamByUuid = class extends React.Component {
  state = {
    exam: 'loading',
    err: null,
  };

  async componentDidMount() {
    await this.refreshExam();
  }

  refreshExam = async () => {
    const { uuid, token } = this.props;

    this.setState({ exam: 'loading' });
    await get(`exams/${uuid}`, {
      token
    }).then(exam => {
      exam.pdf_normal = uriToBackend(exam.pdf_normal);
      exam.pdf_solution = uriToBackend(exam.pdf_solution);
      this.setState({ exam });
    }).catch(err => this.setState({ exam: 'error', err }));
  };

  renderExam() {
    const { exam } = this.state;
    const { locale, uuid } = this.props;

    if (exam === 'loading') {
      return <LoadingAnimation text={locale.loadingExam}/>;
    }

    if (exam == null || exam === 'error') {
      return <NoExam/>;
    }

    return <div>
      <div style={styles.rowCenter}>
        <strong style={{
          display: 'flex',
          flex: 1
        }}>{exam.name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{exam.course}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{exam.date}</strong>
        <div style={{ flex: 0 }}>
          <a href={`/downloadExam/${uuid}`}>
            <FaExternalLinkAlt size={24}/>
          </a>
        </div>
      </div>
      <PdfPreview url={exam.pdf_normal}/>
    </div>;
  }

  render() {
    return <div
      style={{
        width: 480,
        borderColor: colors.neutralGray,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 16,
        padding: 16,
        backgroundColor: 'white',
        margin: 8,
      }}>
      {this.renderExam()}
    </div>;
  }
};
ExamByUuid = withUserContext(ExamByUuid);

class OwnedExams extends React.Component {
  state = {
    exams: 'loading',
    err: null,
  };

  async componentDidMount() {
    await this.refreshExams();
  }

  refreshExams = async () => {
    const { token } = this.props;

    this.setState({ exams: 'loading' });
    await get('exams/owned/', {
      token
    }).then(exams => this.setState({ exams }))
      .catch(err => this.setState({ exams: 'error', err }))
  };

  renderExams = () => {
    const { exams } = this.state;
    const { locale } = this.props;

    if (exams === 'loading') {
      return <LoadingAnimation text={locale.loadingExams}/>;
    }

    if (exams == null || exams === 'error') {
      return <NoExams/>;
    }

    return <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%',
      }}
    >
      {exams.map(exam => <ExamByUuid uuid={exam.uuid}/>)}
    </div>;
  };

  render() {
    const { locale } = this.props;

    return <div style={styles.centerContent}>
      <h2>{locale.myExams}</h2>
      {this.renderExams()}
    </div>;
  }
}

export default withUserContext(OwnedExams);