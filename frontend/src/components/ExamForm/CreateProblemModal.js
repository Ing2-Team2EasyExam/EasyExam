import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import CreateProblem from "../ProblemCreation/CreateProblem";

class CreateProblemModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Modal
          size="lg"
          show={this.props.showModal}
          onHide={this.props.handleCloseModal}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <CreateProblem />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CreateProblemModal;
