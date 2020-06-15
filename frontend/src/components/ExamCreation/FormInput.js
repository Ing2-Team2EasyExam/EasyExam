import React from "react";
import { Form } from "react-bootstrap";

class FormInput extends React.Component {
  render() {
    return (
      <>
        <Form.Group controlId={this.props.controlId}>
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control
            name={this.props.name}
            type={this.props.input_type}
            placeholder={this.props.placeholder}
            onChange={this.props.handleChange}
          />
        </Form.Group>
      </>
    );
  }
}
export default FormInput;
