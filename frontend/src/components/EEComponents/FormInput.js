import React from "react";
import { Form, Col, Row } from "react-bootstrap";

class FormInput extends React.Component {
  /**
   * Component of the inputs of the exam form
   */
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Group as={Row} controlId={this.props.controlId}>
          <Form.Label column sm={3}>
            {this.props.label}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name={this.props.name}
              type={this.props.input_type}
              placeholder={this.props.placeholder}
              onChange={this.props.handleChange}
              value={this.props.value}
            />
          </Col>
        </Form.Group>
      </>
    );
  }
}
export default FormInput;
