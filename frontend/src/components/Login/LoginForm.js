import React from "react";
import { Card, Form, Button, Container, Row } from "react-bootstrap";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <Container style={{ padding: "16px" }}>
        <Row className="justify-content-md-center">
          <Card className="text-center" style={{ width: "30%" }}>
            <Card.Body>
              <Card.Title>Iniciar Sesión</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Control
                    name="email"
                    type="email"
                    value={this.state.email}
                    placeholder="Correo Electrónico"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name="password"
                    type="password"
                    value={this.state.password}
                    placeholder="Contraseña"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Button block type="submit" variant="primary">
                    Ingresar
                  </Button>
                </Form.Group>
              </Form>
              <Card.Link href="#recuperar_contraseña">
                ¿Olvidó su contraseña?
              </Card.Link>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
