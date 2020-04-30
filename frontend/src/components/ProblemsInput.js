import React from 'react';
import { withUserContext } from "./UserState";
import PedagogicalGoalsInput from "./PedagogicalGoalsInput";
import { styles } from "../utils/styles";
import { palette } from "../utils/colors";
import ProblemInputModal from "./ProblemInputModal";
import ProblemSummary from "./ProblemSummary";

class ProblemsInput extends React.Component {
  state = {
    isModalVisible: false,
  };

  onChangeProblem = (index, changes) => {
    const { value, onChange } = this.props;
    onChange(value.map((problem, i) =>
      i === index ? { ...problem, ...changes } : problem
    ));
  };

  onAddProblem = () => {
    this.setState({ isModalVisible: true });
  };

  onFinishAddProblem = (problem) => {
    const { value, onChange } = this.props;
    onChange([...value, problem]);
    this.setState({ isModalVisible: false });
  };

  onHideModal = () => {
    this.setState({ isModalVisible: false });
  };

  onRemoveProblem = index => {
    const { value, onChange } = this.props;
    onChange(value.filter((_, i) => i !== index));
  };

  onToggleRandom = (index, event) => {
    this.onChangeProblem(index, {
      isRandom: event.target.checked,
    });
  };

  render() {
    const { isModalVisible } = this.state;
    const { value, style, locale, topics } = this.props;

    return <div style={style}>
      {value.map((problem, index) => <div key={index.toString()}>
        <div style={styles.rowCenter}>
          <div>{locale.formatProblemNumber(index + 1)}</div>

          <ProblemSummary problem={problem}/>

          <button style={{
            ...styles.placeholderButton,
            backgroundColor: palette.dangerousAction
          }}
                  onClick={() => this.onRemoveProblem(index)}>
            {locale.removeProblem}
          </button>
        </div>
      </div>)}
      <button style={styles.placeholderButton}
              onClick={this.onAddProblem}>
        {locale.addProblem}
      </button>

      <ProblemInputModal isVisible={isModalVisible} onHide={this.onHideModal} onFinishAddProblem={this.onFinishAddProblem}
        topics={topics}/>
    </div>;
  }
}

export default withUserContext(ProblemsInput);
