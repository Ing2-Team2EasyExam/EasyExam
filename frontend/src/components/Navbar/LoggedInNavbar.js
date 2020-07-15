import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class LoggedInNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="info" variant="dark" expand="lg">
        <Navbar.Brand href="/home">EasyExam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Exámenes</Nav.Link>
            <Nav.Link href="/problems">Preguntas</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Perfil" id="basic-nav-dropdown" alignRight>
              <NavDropdown.Item href="/profile">Ver Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as="button" onClick={this.props.doLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LoggedInNavbar;
