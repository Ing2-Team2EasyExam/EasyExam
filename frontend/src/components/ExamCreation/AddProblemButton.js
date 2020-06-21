import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

class AddProblemButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Group as={Row}>
          <Col sm={{ offset: 3 }}>
            <Button variant="light">
              <Plus /> Añadir otra pregunta
            </Button>
          </Col>
        </Form.Group>
      </>
    );
  }
}

export default AddProblemButton;
