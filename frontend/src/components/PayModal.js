import React from 'react';
import { withUserContext } from "./UserState";
import { Modal } from "react-bootstrap";
import { styles } from "../utils/styles";
import { palette } from "../utils/colors";
import { post } from "../utils/api";
import ActionFailedModal from "./ActionFailedModal";

class PayModal extends React.Component {
  state = {
    payment: null,
    err: null,
  };

  onConfirm = async () => {
    const { exam, onHide, onConfirm, onRefreshCredits, token } = this.props;

    this.setState({ payment: 'loading' });
    await post(`exams/${exam.uuid}/pay/`, {
      token
    }).then(payment => {
      this.setState({ payment });
      onRefreshCredits();
      window.open(exam.pdf_solution);
      onConfirm();
      onHide();
    }).catch(err => this.setState({ payment: 'error', err }));
  };

  onHideErrorModal = () => {
    this.setState({ payment: null });
  };

  render() {
    const { payment, err } = this.state;
    const { locale, exam, isVisible, onHide } = this.props;

    return <Modal show={isVisible} onHide={onHide} style={styles.modal}>
      <Modal.Header closeButton>
        <Modal.Title>{locale.confirmPay}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={styles.centerContent}>
          {locale.confirmPayBody({ exam })}
          <button
            style={styles.button({
              backgroundColor: palette.letsBegin,
              disabled: payment === 'loading',
            })}
            disabled={payment === 'loading'}
            onClick={this.onConfirm}
          >
            {locale.downloadWithSolution}
          </button>
        </div>
      </Modal.Body>

      <ActionFailedModal
        isVisible={payment === 'error'}
        onHide={this.onHideErrorModal}
        onRetry={this.onConfirm}
        err={err}
      />
    </Modal>;
  }
}

export default withUserContext(PayModal);
