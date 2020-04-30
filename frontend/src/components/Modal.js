import React from 'react';
import { styles } from "../utils/styles";
import { Modal as BootstrapModal } from 'react-bootstrap';

class Modal extends React.Component {
  render() {
    const { isVisible, onHide, title, children } = this.props;

    return <BootstrapModal
      show={isVisible}
      onHide={onHide}
      style={{
        marginTop: 64,
      }}
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        <div style={styles.centerContent}>
          {children}
        </div>
      </BootstrapModal.Body>
    </BootstrapModal>;
  }
}
export default Modal;
