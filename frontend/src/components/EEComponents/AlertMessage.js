import React from "react";
import { Alert } from "react-bootstrap";

class AlertMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event) {
    this.props.closeAlert();
  }

  render() {
    return (
      <Alert
        variant={this.props.variant}
        onClose={this.handleClose}
        dismissible
      >
        <Alert.Heading>{this.props.title}</Alert.Heading>
        <p>{this.props.message}</p>
      </Alert>
    );
  }
}

export default AlertMessage;
