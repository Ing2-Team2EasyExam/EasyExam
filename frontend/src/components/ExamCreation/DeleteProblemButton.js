import React from "react";
import { Button, Col } from "react-bootstrap";
import { XSquare } from "react-bootstrap-icons";

class DeleteProblemButton extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <Button variant="light" onClick={this.props.onClick}>
        <XSquare />
      </Button>
    );
  }
}

export default DeleteProblemButton;
