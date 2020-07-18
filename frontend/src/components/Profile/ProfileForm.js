import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoading: false,
      first_name: "",
      last_name: "",
      email: "",
    };
  }

  componentDidMount() {
    const url = "/api/users/account/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    console.log(this.state);
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
              value={this.state.first_name}
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
              value={this.state.last_name}
              placeholder={"Ingresa tu apellido"}
            />
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
