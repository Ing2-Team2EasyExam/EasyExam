import React from "react";
import { Col, Form, Row } from "react-bootstrap";

class ProblemSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      problems: [],
    };
  }

  render() {
    const { problems } = this.state;
    return (
      <>
        <Form.Group as={Row} controlId="problem1">
          <Col sm={9}>
            <Form.Control as="select"></Form.Control>
          </Col>
        </Form.Group>
      </>
    );
  }
}
export default ProblemSelect;
