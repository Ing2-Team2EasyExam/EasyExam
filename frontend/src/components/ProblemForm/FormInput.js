import React from "react";
import { Form, Col, Row } from "react-bootstrap";

class FormInput extends React.Component {
  /**
   * Component of the inputs of the problem form
   */
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Group controlId={this.props.controlId}>
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control
            name={this.props.name}
            type="text"
            placeholder={this.props.placeholder}
            onChange={this.props.handleChange}
            value={this.props.value}
          />
        </Form.Group>
      </>
    );
  }
}
export default FormInput;
