import React from "react";
import { Navbar } from "react-bootstrap";

class LoggedOutNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="info" variant="dark" expand="lg">
        <Navbar.Brand href="/">EasyExam</Navbar.Brand>
      </Navbar>
    );
  }
}

export default LoggedOutNavbar;
