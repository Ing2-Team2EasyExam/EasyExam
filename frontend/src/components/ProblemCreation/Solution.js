import React from "react";
import { Form } from "react-bootstrap";
import AddImage from "./AddImage";
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
            rows="3"
            placeholder="Escribe aquí la solución de la pregunta. Puedes usar latex."
          />
        </Form.Group>
        <AddImage />
      </>
    );
  }
}
export default Solution;
