import React from "react";
import { Form } from "react-bootstrap";
class Solution extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Group controlId="solution">
          <Form.Label>Solución:</Form.Label>
          <Form.Control
            onChange={this.props.handleChange}
            name="solution_content"
            type="text"
            as="textarea"
            placeholder="Escribe aquí la solución de la pregunta. Puedes usar latex."
            rows="5"
            value={this.props.value}
          />
        </Form.Group>
      </>
    );
  }
}
export default Solution;
