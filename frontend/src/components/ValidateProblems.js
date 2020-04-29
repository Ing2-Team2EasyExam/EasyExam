import React from 'react';
import { styles } from "../utils/styles";
import { get, post } from "../utils/api";
import { withUserContext } from "./UserState";
import LoadingAnimation from "./LoadingAnimation";
import Latex from 'react-latex';
import { FaSun } from 'react-icons/fa';
import ActionFailedModal from "./ActionFailedModal";
import PdfPreview from "./PdfPreview";
import { uriToBackend } from "./DownloadExam";

let NoChallenges = class extends React.Component {
  render() {
    const { locale } = this.props;
    return <div style={styles.centerContent}>
      <FaSun size={256}/>
      <p>{locale.noChallenges}</p>
    </div>;
  }
};
NoChallenges = withUserContext(NoChallenges);

class ValidateProblems extends React.Component {
  state = {
    challenge: 'loading',
    selectedAnswerKeys: 'loading',
    vote: null,
    err: null,
    success: null,
  };

  async componentDidMount() {
    await this.refreshChallenge();
  }

  refreshChallenge = async () => {
    const { token } = this.props;
    await get('current-challenge/', {
      token
    }).then(challenge => {
      const { criteria } = challenge;
      this.setState({
        challenge,// vote: null,
        selectedAnswerKeys: Array(criteria.length).fill(null),
      });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }).catch(err => this.setState({ challenge: 'error', err }));
  };

  onPressNext = async () => {
    const { selectedAnswerKeys } = this.state;
    const { onRefreshCredits, token, locale } = this.props;

    this.setState({ vote: 'loading' });
    await post('current-challenge/vote/', {
      token,
      answers: selectedAnswerKeys,
    }).then(async vote => {
      console.log("Voted!!!",vote)
      this.setState({ vote , success : locale.challengeDone});
      await this.refreshChallenge();
    }).catch(err => this.setState({ vote: 'error', err }));
    onRefreshCredits();
  };

  onChangeAnswer = (event, index) => {
    const value = event.target.value;
    this.setState(prev => ({
      selectedAnswerKeys: prev.selectedAnswerKeys
        .map((x, i) => i === index ? value : x),
    }));
  };

  onHideModal = () => {
    this.setState(prev => ({
      challenge: prev.challenge === 'error' ? null : prev.challenge,
      vote: prev.vote === 'error' ? null : prev.vote,
    }));
  };

  onRetry = async () => {
    const { challenge } = this.state;
    await challenge === 'error' ?
      this.refreshChallenge()
      : this.onPressNext();
  };

  render() {
    const { challenge, selectedAnswerKeys, vote, err, count } = this.state;
    const { locale } = this.props;
    const { criteria, problem } = challenge || {};
    // Show success message and delete it
    const messageOfSuccess = this.state.vote == null ? this.state.success : this.state.success + " +" + this.state.vote.credits
    if(this.state.success !== null){
      setTimeout(function(){
        this.setState({success :  null, vote: null})
      }.bind(this),4000)
    }

    return <div style={styles.centerContent}>
      {this.state.success !== null ? <div className="alert alert-success" style={{display: 'flex', flexDirection: 'row'}}>{messageOfSuccess}</div> : null}
      {challenge === 'loading' ?
        <LoadingAnimation text={locale.loadingChallenge}/>
        : challenge == null || challenge === 'error' ?
          <NoChallenges/>
          :
          <div style={{display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: '1 1 0%', width: '90%'}}>
            <div style={{width: '100%'}}>
              <div style={{display: "inline-block"}}>
                <h4>{locale.problemNameNoForm}</h4>
                {problem.name}
              </div>
              <div style={{display: "inline-block", marginLeft: "4em"}}>
                <h4>{locale.problemAuthorNoForm}</h4>
                {problem.author}
              </div>
            </div>
            <div style={{width: '100%', position: 'relative'}}>

              <div style={{display: 'inline-block', width: '80%'}}>
                <h4>{locale.problemContent}</h4>
                <div style={{ width: '100%' }}>
                  <PdfPreview url={uriToBackend(problem.pdf)}/>
                </div>
              </div>
              <div style={{display: 'inline-block',position: 'absolute', top: '0'}}>
                {criteria.map((criterion, index) => <div>
                  <h4>{locale.questions[ criterion.question ] ||
                  criterion.question}</h4>
                  <div>
                    {criterion.answer_choices.map(([ answerKey, stringKey ]) => <div
                      style={styles.challengeRadio} key={answerKey}
                    >
                      <input
                        type='radio'
                        value={answerKey}
                        checked={answerKey === selectedAnswerKeys[ index ]}
                        onChange={event => this.onChangeAnswer(event, index)}
                      />
                      <span style={{marginLeft: "1em"}}>{locale.answers[ stringKey ] || stringKey}</span>
                    </div>)}
                  </div>
                </div>)}


                <button
                  style={styles.button({ disabled: vote === 'loading' })}
                  disabled={vote === 'loading'}
                  onClick={this.onPressNext}
                >
                  {locale.next}
                </button>
              </div>
            </div>
          </div>}

      <ActionFailedModal
        isVisible={challenge === 'error' || vote === 'error'}
        err={err}
        onRetry={this.onRetry}
        onHide={this.onHideModal}
      />
    </div>;
  }
}

export default withUserContext(ValidateProblems);
