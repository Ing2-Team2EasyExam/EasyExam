import React from "react";
import { Form, Col, Button } from "react-bootstrap";
class FormSubmitButton extends React.Component {
  render() {
    return (
      <>
        <Form.Row style={{ paddingBottom: "1%" }}>
          <Col></Col>
          <Col>
            <Button variant="success" type="submit">
              Guardar
            </Button>
          </Col>
        </Form.Row>
      </>
    );
  }
}
export default FormSubmitButton;
