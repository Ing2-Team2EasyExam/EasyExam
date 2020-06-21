import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
class FormSubmitButton extends React.Component {
  /**
   * Button of the form submission
   */
  render() {
    return (
      <>
        <Form.Group as={Row}>
          <Col sm={{ offset: 5 }}>
            <Button variant="success" type="submit">
              Guardar
            </Button>
          </Col>
        </Form.Group>
      </>
    );
  }
}
export default FormSubmitButton;
