import React from "react";
import { Form } from "react-bootstrap";

class AddImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Group>
          <Form.File id="QuestionImage" label="Insertar Imagen" />
        </Form.Group>
      </>
    );
  }
}

export default AddImage;
