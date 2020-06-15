import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import SearchComponent from "./SearchComponent";
import AllProblems from "./AllProblems";
import MyProblems from "./MyProblems";
import { Row, Col } from "react-bootstrap";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const addProblem = (
      <Button
        href="#CrearProblema"
        variant="primary"
        size="lg"
        block
        style={{ marginTop: "15px", marginBottom: "15px" }}
      >
        Agregar Nueva Pregunta
      </Button>
    );

    return (
      <Container>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <h4>Preguntas</h4>
            <SearchComponent />
            <AllProblems />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <h4>Mis Preguntas</h4>
            <MyProblems />
            {addProblem}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProblemList;
