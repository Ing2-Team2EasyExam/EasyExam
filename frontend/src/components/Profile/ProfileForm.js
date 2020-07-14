import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <Form.Group as={Row} controlId={this.props.controlId}>
          <Form.Label column sm={3}>
            {"Nombre: "}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name={"MyName"}
              type={"text"}
              placeholder={"Ingresa tu nombre"}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId={this.props.controlId}>
          <Form.Label column sm={3}>
            {"Apellido: "}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name={"MyLastname"}
              type={"text"}
              placeholder={"Ingresa tu apellido"}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId={this.props.controlId}>
          <Form.Label column sm={3}>
            {"Se unió el: "}
          </Form.Label>
          <Col sm={9}>
            <Form.Control type={"text"} value={"2020/04/24"} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ offset: 5 }}>
            <Button variant="success" type="submit">
              Guardar
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

export default ProfileForm;
