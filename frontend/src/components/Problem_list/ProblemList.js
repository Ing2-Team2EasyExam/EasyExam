import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Problem from "./Problem";
import Button from "react-bootstrap/Button";
import SearchComponent from "./SearchComponent";
import AllProblems from "./AllProblems";
import {Link} from "react-router-dom";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const addProblem = (
      <Link to="/problems/create">
      <Button
        href=""
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
      <Container style={{ marginTop: "50px" }}>
        <SearchComponent />
        <AllProblems />
        {addProblem}
      </Container>
    );
  }
}

export default ProblemList;
