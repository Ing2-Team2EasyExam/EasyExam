import React from 'react';
import Modal from "./Modal";
import { withUserContext } from "./UserState";
import { styles } from "../utils/styles";
import { Button, ButtonToolbar } from "react-bootstrap";
import { FaTimesCircle } from 'react-icons/fa';
import { colors } from "../utils/colors";

class ActionFailedModal extends React.Component {
  onRetry = () => {
    const { onHide, onRetry } = this.props;
    onHide();
    onRetry();
  };

  render() {
    const { locale, onHide, err } = this.props;

    return <Modal {...this.props} title={locale.actionFailed}>
      <FaTimesCircle size={128} color={colors.vermillion}/>
      <p>{locale.actionFailed}</p>

      {<pre>{err && err[0] ? err[0]
          : JSON.stringify(err, null, '\t')}</pre>}

      <ButtonToolbar>
        <Button bsStyle="danger" onClick={onHide}>{locale.close}</Button>
        <Button bsStyle="success" onClick={this.onRetry}>{locale.retry}</Button>
      </ButtonToolbar>
    </Modal>;
  }
}

export default withUserContext(ActionFailedModal);