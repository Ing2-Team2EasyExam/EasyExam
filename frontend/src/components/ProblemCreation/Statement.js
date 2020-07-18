import React from "react";
import { Form } from "react-bootstrap";
import AddImage from "./AddImage";
//TODO: generalize this component to be used in solution
class Statement extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Group controlId="statement">
          <Form.Label>Enunciado:</Form.Label>
          <Form.Control
            onChange={this.props.handleChange}
            name="statement_content"
            type="text"
            as="textarea"
            placeholder="Escribe aquí el enunciado de la pregunta. Puedes usar latex."
            rows="3"
          />
        </Form.Group>
        <AddImage handleImage={this.props.handleImageChange} />
      </>
    );
  }
}
export default Statement;
