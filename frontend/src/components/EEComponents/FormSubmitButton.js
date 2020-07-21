import React from "react";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
class FormSubmitButton extends React.Component {
  /**
   * Button of the form submission
   */
  constructor(props) {
    super(props);
  }
  render() {
    const normal_button = (
      <Button variant="success" type="submit" block>
        {" "}
        Guardar{" "}
      </Button>
    );
    const loading_button = (
      <Button variant="success" disabled block>
        {" "}
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        Guardando...
      </Button>
    );
    const button = this.props.isLoading ? loading_button : normal_button;
    return (
      <>
        <Form.Group as={Row}>
          <Col sm={{ offset: 5 }}>{button}</Col>
        </Form.Group>
      </>
    );
  }
}
export default FormSubmitButton;
