import React from "react";
import { Navbar, Nav } from "react-bootstrap";

class LoggedInNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="info" variant="dark" expand="lg">
        <Navbar.Brand href="/home">EasyExam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Examenes</Nav.Link>
            <Nav.Link href="/problems">Preguntas</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#perfil">Perfil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LoggedInNavbar;
