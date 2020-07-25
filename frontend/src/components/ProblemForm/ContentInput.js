import React from "react";
import { Form } from "react-bootstrap";
class ContentInput extends React.Component {
  /*
   * Component for Statement and Solution inputs
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
            onChange={this.props.handleChange}
            name={this.props.name}
            type="text"
            as="textarea"
            placeholder={this.props.placeholder}
            rows="5"
            value={this.props.value}
          />
        </Form.Group>
      </>
    );
  }
}
export default ContentInput;
