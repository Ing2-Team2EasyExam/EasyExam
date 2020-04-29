import React from 'react';
import { withUserContext } from "./UserState";
import { styles } from "../utils/styles";
import Form from './Form';
import FiguresModal from "./FiguresModal";

class ComposeProblem extends React.Component {
  state = {
    isFiguresModalVisible: false,
  };

  onClickFigures = () => {
    this.setState({ isFiguresModalVisible: true });
  };

  onHideFiguresModal = () => {
    this.setState({ isFiguresModalVisible: false });
  };

  render() {
    const { isFiguresModalVisible } = this.state;
    const { locale, figures, onChangeFigures } = this.props;

    return <div style={styles.blockTopicProblems}>
      <div style={{ ...styles.rowCenter, justifyContent: 'space-between' }}>
        <h3 style={{ marginTop: '0.5em', marginBottom: '0.8em' }}>
          {locale.composeProblem}
        </h3>
        <button style={styles.placeholderButton} onClick={this.onClickFigures}>
          {locale.figures}
        </button>
      </div>
      <Form.Field fieldKey='statement' label={locale.statement} type='latex' tooltip={locale.pStatementTooltip}/>
      <Form.Field fieldKey='solution' label={locale.solution} type='latex' tooltip={locale.pSolutionTooltip}/>
      <Form.Field fieldKey='markingScheme' label={locale.markingScheme} type='latex'
                  tooltip={locale.pMSchemeTooltip}/>

      <FiguresModal
        isVisible={isFiguresModalVisible}
        onHide={this.onHideFiguresModal}
        value={figures}
        onChangeValue={onChangeFigures}
      />
    </div>;
  }
}

export default withUserContext(ComposeProblem);