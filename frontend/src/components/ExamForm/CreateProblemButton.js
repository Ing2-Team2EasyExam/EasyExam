import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import CreateProblem from "../ProblemCreation/CreateProblem";

class CreateProblemButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({
      show: true,
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <>
        <Button variant="secondary" onClick={this.handleShow} block>
          <Plus /> Crear una pregunta
        </Button>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <CreateProblem />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CreateProblemButton;
