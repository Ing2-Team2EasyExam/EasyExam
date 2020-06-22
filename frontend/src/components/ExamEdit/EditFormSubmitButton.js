import React from "react";
import { Form, Col, Button } from "react-bootstrap";
class EditFormSubmitButton extends React.Component {
  /**
   * Button of the form submission
   */
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
export default EditFormSubmitButton;
