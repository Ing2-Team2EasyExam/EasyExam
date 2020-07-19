import React from "react";
import { Card, Form, Button, Container, Row, Alert } from "react-bootstrap";

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sended: false,
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
    event.preventDefault();
    console.log(Object.values(this.state));
    this.setState({
      sended: true,
    });
  }

  render() {
    let msg = this.state.sended ? (
      <Alert variant="info">
        Se ha enviado un mail con un link para cambiar su contraseña, por favor,
        revisalo antes de 3 dias.
      </Alert>
    ) : (
      ""
    );
    return (
      <>
        <Container style={{ padding: "16px" }}>
          <Row className="justify-content-md-center">{msg}</Row>
        </Container>

        <Container style={{ padding: "16px" }}>
          <Row className="justify-content-md-center">
            <Card className="text-center" style={{ width: "30vw" }}>
              <Card.Body>
                <Card.Title>Recuperar contraseña</Card.Title>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Control
                      name="email"
                      type="email"
                      value={this.state.email}
                      placeholder="Correo Electronico de la Cuenta"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button block type="submit" variant="primary">
                      Reestablecer contraseña
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </>
    );
  }
}

export default ResetPasswordForm;
