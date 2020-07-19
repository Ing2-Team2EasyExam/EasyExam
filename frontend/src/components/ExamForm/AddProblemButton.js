import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import CreateProblemButton from "./CreateProblemButton";

class AddProblemButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Group as={Row}>
          <Col sm={{ offset: 2 }}>
            <Button variant="primary" onClick={this.props.addProblem}>
              <Plus /> Añadir otra pregunta
            </Button>
            <CreateProblemButton />
          </Col>
        </Form.Group>
      </>
    );
  }
}

export default AddProblemButton;
