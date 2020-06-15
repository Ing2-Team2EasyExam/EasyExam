import React from "react";
import { Form, Col, Button } from "react-bootstrap";
class SaveButton extends React.Component {
  render() {
    return (
      <>
        <Form.Row style={{ paddingBottom: "1%" }}>
          <Col></Col>
          <Col>
            <Button type="submit">
              Guardar Pregunta
            </Button>
          </Col>
        </Form.Row>
      </>
    );
  }
}
export default SaveButton;