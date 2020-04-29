import React from 'react';
import { styles } from "../utils/styles";
import { colors, palette } from "../utils/colors";
import LoadingAnimation from "./LoadingAnimation";
import { withUserContext } from "./UserState";
import { get } from "../utils/api";
import PayModal from "./PayModal";
import PdfPreview from "./PdfPreview";
import ActionFailedModal from "./ActionFailedModal";
import { FaTimesCircle, FaBan } from 'react-icons/fa';

export function uriToBackend(uri) {
  return process.env.REACT_APP_BACKEND.slice(0, -1) + uri;
}

export let NoExam = class extends React.Component {
  render() {
    const { locale } = this.props;

    return <div style={styles.centerContent}>
      <FaTimesCircle size={128} color={palette.error}/>
      <h4>{locale.noExam}</h4>
    </div>;
  }
};
NoExam = withUserContext(NoExam);

let DeniedExam = class extends React.Component {
  render() {
    const { locale } = this.props;

    return <div style={styles.centerContent}>
      <FaBan size={192} color={palette.error}/>
      <pre>{locale.deniedExam}</pre>
    </div>;
  }
};
DeniedExam = withUserContext(DeniedExam);

class DownloadExam extends React.Component {
  state = {
    exam: 'loading',
    isModalVisible: false,
    isPaid: false,
    err: null,
  };

  async componentDidMount() {
    await this.refreshExam();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      await this.refreshExam();
    }
  }

  refreshExam = async () => {
    const { match, token } = this.props;
    const { examUuid } = match.params;

    this.setState({ exam: 'loading' });
    await get(`exams/${examUuid}/`, {
      token
    }).then(exam => {
      exam.pdf_normal = uriToBackend(exam.pdf_normal);
      exam.pdf_solution = uriToBackend(exam.pdf_solution);
      this.setState({ exam, isPaid: exam.is_paid });
    }).catch(err => {
      err.status === 401 || err.status === 403 ?
        this.setState({ exam: 'denied', err })
        : this.setState({ exam: 'error', err });
    });
  };

  onDownloadWithoutSolution = () => {
    const { exam } = this.state;
    window.open(exam.pdf_normal);
  };

  onDownloadWithSolution = () => {
    const { exam, isPaid } = this.state;
    if (!isPaid) {
      this.setState({ isModalVisible: true });
    }
    else { window.open(exam.pdf_solution); }
  };

  onHideModal = () => {
    this.setState({ isModalVisible: false });
  };

  onHideErrorModal = () => {
    this.setState({ exam: null });
  };

  onConfirmPay = () => {
    this.setState({ isPaid: true });
  };

  renderExam = () => {
    const { exam, isModalVisible, isPaid } = this.state;
    const { locale, username, credits } = this.props;

    if (exam === 'loading') {
      return <LoadingAnimation text={locale.loadingExam}/>;
    }

    if (exam == null || exam === 'error') {
      return <NoExam/>;
    }

    if (exam === 'denied') {
      return <DeniedExam/>;
    }

    const canDownloadSolution = username != null &&
      ((credits !== 'loading' && credits >= exam.cost) ||
        isPaid);
    const formattedCost = locale.formatCredits({ credits: exam.cost });
    const isPaidByUser = isPaid && username != null;

    return <div style={{ ...styles.centerContent, flexDirection: 'row' }}>
      <div style={{ flex: 1, padding: '2em' }}>
        <PdfPreview url={exam.pdf_normal}/>
      </div>
      <div style={{ padding: '4em', paddingLeft: 0, }}>
        <h3>{locale.examTopics}</h3>
        <ul>
          {exam.topics.map(topicName => <li>
            {topicName}
          </li>)}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button style={{ margin: '0.5em', ...styles.placeholderButton }}
                    onClick={this.onDownloadWithoutSolution}
            >
              {locale.downloadWithoutSolution}
            </button>
            <span style={{padding: "10px"}}>{locale.free}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button style={{
              margin: '0.5em',
              ...styles.button({
                disabled: !canDownloadSolution,
                backgroundColor: palette.letsBegin,
              }),
            }}
                    onClick={this.onDownloadWithSolution}
                    disabled={!canDownloadSolution}
            >
              {locale.downloadWithSolution}
            </button>
              <span style={{
                textDecoration: isPaidByUser ? 'line-through' : undefined,
                color: isPaidByUser ? colors.neutralGray : undefined,
                padding: "10px"
              }}>{formattedCost}</span>
              {isPaidByUser ? <span style={{padding: "10px"}}>{locale.paid}</span> : null}
          </div>
        </div>
      </div>

      <PayModal
        isVisible={isModalVisible}
        onHide={this.onHideModal}
        onConfirm={this.onConfirmPay}
        exam={exam}
      />
    </div>;
  };

  render() {
    const { exam, err } = this.state;

    return <div>
      {this.renderExam()}
      <ActionFailedModal
        isVisible={exam === 'error'}
        err={err}
        onHide={this.onHideErrorModal}
        onRetry={this.refreshExam}
      />
    </div>;
  }
}

export default withUserContext(DownloadExam);
