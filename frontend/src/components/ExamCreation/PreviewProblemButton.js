import React from "react";
import { Button, Col } from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";

class PreviewProblemButton extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <Button variant="light" onClick={this.props.onClick}>
        <Eye />
      </Button>
    );
  }
}

export default PreviewProblemButton;
