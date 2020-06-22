import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import SearchComponent from "./SearchComponent";
import AllProblems from "./AllProblems";
import { Link } from "react-router-dom";
import MyProblems from "./MyProblems";
import { Tabs, Tab } from "react-bootstrap";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const addProblem = (
      <Link to="/problems/create">
        <Button
          variant="primary"
          size="lg"
          block
          style={{ marginTop: "15px", marginBottom: "15px" }}
        >
          Agregar Nueva Pregunta
        </Button>
      </Link>
    );

    return (
      <Container>
        <Tabs
          defaultActiveKey="preguntas"
          id="tabs-problems"
          style={{ marginTop: "20px" }}
        >
          <Tab eventKey="preguntas" title="Preguntas">
            <h4 style={{ textAlign: "center" }}>Preguntas</h4>
            <SearchComponent />
            <AllProblems />
          </Tab>
          <Tab eventKey="misPreguntas" title="Mis Preguntas">
            <h4 style={{ textAlign: "center" }}>Mis Preguntas</h4>
            <MyProblems />
          </Tab>
        </Tabs>
        {addProblem}
      </Container>
    );
  }
}

export default ProblemList;
