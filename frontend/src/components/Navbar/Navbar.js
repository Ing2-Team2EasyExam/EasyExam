import React from "react";
import {Navbar, Nav, } from 'react-bootstrap';
class EasyExamNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Navbar bg="info" variant="dark" expand="lg">
          <Navbar.Brand href="#examenes">EasyExam</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#examenes">Examenes</Nav.Link>
              <Nav.Link href="#preguntas">Preguntas</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="#perfil">
                    Perfil
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <nav>
          <p> EasyExam</p>
        </nav>
      );
    }
  }
}

export default EasyExamNavbar;
